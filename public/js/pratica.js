// "Pare e pratique": perguntas rápidas no meio da explicação de cada tópico.
// Cada acerto fica salvo (progress.ck_<topico>_<n>) e vale pontos.
import { $, $$, esc, fmt } from "./util.js";
import { embaralhar, normalizar } from "./fixacao.js";

/**
 * Desenha as perguntas em `host`.
 * opcoes: { questoes, base (índice da 1ª pergunta no tópico), chave(n) => string,
 *           feito(chave) => bool, ci, pontos, onAcerto(chave) }
 */
export function renderPratica(host, { questoes, base = 0, chave, feito, ci, pontos, onAcerto }) {
  if (!questoes?.length) return;
  host.innerHTML = `
    <div class="pratica">
      <h4>✋ Pare e pratique <small class="muted">${questoes.length === 1 ? "1 pergunta rápida" : questoes.length + " perguntas rápidas"} · ⭐ ${pontos} pts cada</small></h4>
      ${questoes.map((q0, i) => {
        const q = embaralhar(q0);
        const k = chave(base + i + 1);
        const ja = feito(k);
        return `<div class="pr-q${ja ? " feita" : ""}" data-i="${i}" data-k="${k}">
          <p class="fx-pergunta">${ja ? "✅ " : ""}${fmt(q.pergunta)}</p>
          ${q.codigo ? `<pre><code>${esc(q.codigo.trim())}</code></pre>` : ""}
          ${q.tipo === "lacuna"
            ? `<div class="fx-lacuna">
                <input class="fx-input" aria-label="Sua resposta" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="O que vai no lugar de ____ ?">
                <button class="btn tiny primary pr-responder" type="button">Responder</button>
              </div>`
            : `<div class="fx-opcoes">${q.opcoes.map((o, j) => `<button class="fx-opcao" type="button" data-j="${j}">${fmt(o)}</button>`).join("")}</div>`}
          <div class="fx-feedback" hidden></div>
        </div>`;
      }).join("")}
    </div>`;

  $$(".pr-q", host).forEach((card) => {
    const i = +card.dataset.i;
    const q = embaralhar(questoes[i]);
    const k = card.dataset.k;
    const fb = $(".fx-feedback", card);
    const mostrar = (certo, extra = "") => {
      fb.hidden = false;
      fb.className = "fx-feedback " + (certo ? "ok" : "erro");
      fb.innerHTML = `<b>${certo ? "✅ Isso mesmo!" : "❌ Ainda não."}</b> ${extra}${fmt(q.explicacao || "")}`
        + (certo ? "" : ` <button class="btn tiny ghost pr-tentar" type="button">Tentar de novo</button>`);
      $(".pr-tentar", fb)?.addEventListener("click", () => reiniciar());
    };
    const acertou = () => {
      card.classList.add("feita");
      if (!feito(k)) onAcerto?.(k);
    };
    const reiniciar = () => {
      fb.hidden = true;
      $$(".fx-opcao", card).forEach((b) => { b.disabled = false; b.classList.remove("certa", "errada"); });
      const inp = $(".fx-input", card);
      if (inp) { inp.disabled = false; inp.classList.remove("ok", "erro"); inp.value = ""; inp.focus(); }
      const r = $(".pr-responder", card);
      if (r) r.disabled = false;
    };
    if (q.tipo === "lacuna") {
      const inp = $(".fx-input", card);
      const responder = () => {
        if (inp.disabled || !inp.value.trim()) return;
        const qci = q.ci || ci;
        const certo = q.respostas.some((r) => normalizar(r, qci) === normalizar(inp.value, qci));
        inp.disabled = true;
        $(".pr-responder", card).disabled = true;
        inp.classList.add(certo ? "ok" : "erro");
        mostrar(certo, certo ? "" : "");
        if (certo) acertou();
      };
      $(".pr-responder", card).addEventListener("click", responder);
      inp.addEventListener("keydown", (e) => e.key === "Enter" && responder());
    } else {
      $$(".fx-opcao", card).forEach((b) => b.addEventListener("click", () => {
        const j = +b.dataset.j;
        const certo = j === q.correta;
        $$(".fx-opcao", card).forEach((x, n) => {
          x.disabled = true;
          if (certo && n === q.correta) x.classList.add("certa");
          else if (n === j) x.classList.add("errada");
        });
        mostrar(certo);
        if (certo) acertou();
      }));
    }
  });
}
