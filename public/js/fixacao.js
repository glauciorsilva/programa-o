// Exercícios de fixação: questões rápidas com correção na hora e explicação.
import { $, $$, esc, fmt } from "./util.js";

// Embaralha as opções sempre do mesmo jeito para a mesma pergunta (para a resposta
// certa não ficar sempre na mesma posição). Verdadeiro/Falso mantém a ordem.
function embaralhar(q) {
  if (q.tipo !== "multipla" || q.fixa) return q;
  let h = 2166136261;
  for (const ch of q.pergunta) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const ordem = q.opcoes.map((_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return { ...q, opcoes: ordem.map((i) => q.opcoes[i]), correta: ordem.indexOf(q.correta) };
}

const normalizar = (s, ci) => {
  let v = String(s ?? "").trim().replace(/;+$/, "").replace(/\s+/g, " ");
  return ci ? v.toLowerCase() : v;
};

/**
 * Desenha as questões em `host`.
 * opcoes: { questoes, salvo: () => {melhor,total}|null, ci, onConcluir(acertos,total) }
 */
export function renderFixacao(host, { questoes: originais, salvo, ci, onConcluir }) {
  const questoes = (originais || []).map(embaralhar);
  if (!questoes.length) {
    host.innerHTML = "";
    return;
  }
  const respostas = new Array(questoes.length).fill(null); // true/false por questão
  const melhor = typeof salvo === "function" ? salvo() : salvo;

  host.innerHTML = `
    <section class="fixacao" aria-labelledby="fx-titulo">
      <div class="fx-topo">
        <div>
          <h2 id="fx-titulo">✍️ Exercícios de fixação</h2>
          <p class="muted">${questoes.length} questões rápidas sobre este nível. Responda, veja a explicação e siga em frente.</p>
        </div>
        <div class="fx-placar" aria-live="polite">
          <strong id="fx-acertos">0/${questoes.length}</strong>
          <small id="fx-status">${melhor ? `Seu melhor resultado: ${melhor.melhor}/${melhor.total}` : "Ainda não concluído"}</small>
        </div>
      </div>
      <ol class="fx-lista">
        ${questoes.map((q, i) => `
          <li class="fx-q" data-i="${i}">
            <p class="fx-pergunta">${fmt(q.pergunta)}</p>
            ${q.codigo ? `<pre><code>${esc(q.codigo.trim())}</code></pre>` : ""}
            ${q.tipo === "lacuna"
              ? `<div class="fx-lacuna">
                  <label class="sr-only" for="fx-in-${i}">Sua resposta</label>
                  <input id="fx-in-${i}" class="fx-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="O que vai no lugar de ____ ?">
                  <button class="btn tiny primary fx-responder">Responder</button>
                </div>`
              : `<div class="fx-opcoes">${q.opcoes.map((o, j) =>
                  `<button class="fx-opcao" data-j="${j}">${fmt(o)}</button>`).join("")}</div>`}
            <div class="fx-feedback" hidden></div>
          </li>`).join("")}
      </ol>
      <div class="fx-rodape">
        <p class="muted small">💡 Errou? Leia a explicação e, em caso de ainda haver dúvida, pesquise o termo na internet.</p>
        <button class="btn ghost tiny" id="fx-refazer">↺ Refazer exercícios</button>
      </div>
    </section>`;

  const atualizarPlacar = () => {
    const feitas = respostas.filter((r) => r !== null).length;
    const acertos = respostas.filter((r) => r === true).length;
    $("#fx-acertos", host).textContent = `${acertos}/${questoes.length}`;
    if (feitas === questoes.length) {
      const pct = Math.round((acertos / questoes.length) * 100);
      $("#fx-status", host).textContent = pct >= 70
        ? `Concluído com ${pct}% de acertos. Muito bem! 🎉`
        : `Concluído com ${pct}% de acertos. Revise os tópicos e tente de novo.`;
      onConcluir?.(acertos, questoes.length);
    }
  };

  const mostrar = (li, certo, q, extra = "") => {
    const fb = $(".fx-feedback", li);
    fb.hidden = false;
    fb.className = "fx-feedback " + (certo ? "ok" : "erro");
    fb.innerHTML = `<b>${certo ? "✅ Correto!" : "❌ Não foi dessa vez."}</b> ${extra}${fmt(q.explicacao || "")}`;
  };

  $$(".fx-q", host).forEach((li) => {
    const i = +li.dataset.i;
    const q = questoes[i];
    if (q.tipo === "lacuna") {
      const input = $(".fx-input", li);
      const responder = () => {
        if (respostas[i] !== null || !input.value.trim()) return;
        const qci = q.ci || ci;
        const certo = q.respostas.some((r) => normalizar(r, qci) === normalizar(input.value, qci));
        respostas[i] = certo;
        input.disabled = true;
        $(".fx-responder", li).disabled = true;
        input.classList.add(certo ? "ok" : "erro");
        mostrar(li, certo, q, certo ? "" : `Resposta esperada: <code>${esc(q.respostas[0])}</code>. `);
        atualizarPlacar();
      };
      $(".fx-responder", li).addEventListener("click", responder);
      input.addEventListener("keydown", (e) => e.key === "Enter" && responder());
    } else {
      $$(".fx-opcao", li).forEach((b) => b.addEventListener("click", () => {
        if (respostas[i] !== null) return;
        const j = +b.dataset.j;
        const certo = j === q.correta;
        respostas[i] = certo;
        $$(".fx-opcao", li).forEach((x, k) => {
          x.disabled = true;
          if (k === q.correta) x.classList.add("certa");
          else if (k === j) x.classList.add("errada");
        });
        mostrar(li, certo, q);
        atualizarPlacar();
      }));
    }
  });

  $("#fx-refazer", host).addEventListener("click", () => {
    renderFixacao(host, { questoes: originais, salvo, ci, onConcluir });
    $(".fixacao", host).scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
