// Guias "de A a Z" (Python, AWS…): índice por seções e lição com explicação,
// perguntas "Pare e pratique", exercícios de código e botão de concluir.
// O progresso fica em progress.<curso.id>_<licao> (lição) e progress.ck_<curso.id>_<licao>_<n> (perguntas).
import { renderPratica } from "./pratica.js";
import { $, esc, progressBar } from "./util.js";

const NOTA_PESQUISA = `<p class="search-note">💡 Em caso de ainda haver dúvida, pesquise o termo na internet.</p>`;

export const chaveGuia = (curso, licaoId) => `${curso.id}_${licaoId}`;
export const chavePerguntaGuia = (curso, licaoId, n) => `ck_${curso.id}_${licaoId}_${n}`;

function indice(view, curso, { progresso, codigoFeito }) {
  const L = curso.licoes;
  const feitas = L.filter((l) => progresso[chaveGuia(curso, l.id)]).length;
  const pct = Math.round((feitas / L.length) * 100);
  const totalEx = L.reduce((s, l) => s + (l.exercicios?.length || 0), 0);
  const totalQ = L.reduce((s, l) => s + (l.perguntas?.length || 0), 0);
  const grupos = [];
  for (const l of L) {
    if (!grupos.length || grupos[grupos.length - 1].nome !== l.secao) grupos.push({ nome: l.secao, itens: [] });
    grupos[grupos.length - 1].itens.push(l);
  }
  view.innerHTML = `
    <a class="back" href="${curso.voltar.href}">← ${esc(curso.voltar.texto)}</a>
    <h1>${esc(curso.titulo)}</h1>
    <p class="muted">${curso.intro}</p>
    <div class="stat-row">
      <div class="stat"><small>Lições concluídas</small><strong>${feitas}/${L.length}</strong>${progressBar(pct, true)}</div>
      ${totalEx ? `<div class="stat"><small>Exercícios de código</small><strong>${L.reduce((s, l) => s + (l.exercicios || []).filter((_, k) => codigoFeito(l, k)).length, 0)}/${totalEx}</strong></div>` : ""}
      ${totalQ ? `<div class="stat"><small>Perguntas de fixação</small><strong>${totalQ}</strong><small>⭐ 2 pts por acerto</small></div>` : ""}
      <div class="stat"><small>Pontos por lição</small><strong>⭐ 10</strong><small>ao marcar como concluída</small></div>
    </div>
    ${grupos.map((g) => `
      <h2 class="sqlp-secao">${esc(g.nome)}</h2>
      <ol class="sqlp-indice">${g.itens.map((l) => {
        const feito = !!progresso[chaveGuia(curso, l.id)];
        const nEx = l.exercicios?.length || 0, nQ = l.perguntas?.length || 0;
        const info = [nQ && `${nQ} pergunta${nQ > 1 ? "s" : ""}`, nEx && `${nEx} exercício${nEx > 1 ? "s" : ""}`].filter(Boolean).join(" · ") || "leitura";
        return `<li class="${feito ? "feito" : ""}"><a href="#/${curso.base}/${l.id}">
          <span class="sqlp-ic" aria-hidden="true">${feito ? "✅" : "▶️"}</span>
          <span><small class="muted">${info}</small><strong>${esc(l.titulo)}</strong></span>
          <span class="sr-only">${feito ? "(concluída)" : ""}</span>
        </a></li>`;
      }).join("")}</ol>`).join("")}`;
}

/**
 * Desenha o guia em `view`.
 * opcoes: { curso, licaoId, progresso, idsCodigo(licao) => [id], codigoFeito(licao, k),
 *           ptsCodigo(id), salvarPergunta(chave), alternarLicao(chave) => Promise<bool>, ptsPergunta }
 */
export function renderGuia(view, opcoes) {
  const { curso, licaoId, progresso } = opcoes;
  const i = curso.licoes.findIndex((l) => l.id === licaoId);
  if (i < 0) return indice(view, curso, opcoes);
  const l = curso.licoes[i];
  const ant = curso.licoes[i - 1], prox = curso.licoes[i + 1];
  const chave = chaveGuia(curso, l.id);
  const feito = !!progresso[chave];
  const ids = opcoes.idsCodigo(l);
  const perguntas = l.perguntas || [];
  // As perguntas aparecem em dois blocos: no meio da explicação (marcador <!--pratica-->) e no fim.
  const meio = l.teoria.includes("<!--pratica-->") ? Math.ceil(perguntas.length / 2) : 0;
  const teoria = l.teoria.replace("<!--pratica-->", `<div class="pratica-host" data-grupo="0"></div>`);

  view.innerHTML = `
    <a class="back" href="#/${curso.base}">← ${esc(curso.nomeCurto)}</a>
    <p class="muted small sqlp-onde">${esc(l.secao)} · ${i + 1} de ${curso.licoes.length}</p>
    <h1>${esc(l.titulo)}</h1>
    <section class="box sqlp-teoria guia-teoria">
      ${teoria}
      ${l.exemplo ? `<div class="guia-exemplo">
        <h3>▶ Exemplo para rodar</h3>
        <pre><code>${esc(l.exemplo.trim())}</code></pre>
        <a class="btn tiny" href="#/sandbox/guia/${curso.base}:${l.id}">▶ Testar no sandbox</a>
      </div>` : ""}
      ${NOTA_PESQUISA}
    </section>
    ${perguntas.length > meio ? `<div class="pratica-host" data-grupo="1"></div>` : ""}
    ${ids.length ? `<div class="box codigo-ex">
      <h4>🧩 Exercícios de código <small class="muted">${ids.filter((_, k) => opcoes.codigoFeito(l, k)).length}/${ids.length} resolvidos</small></h4>
      <p class="muted small">Complete o código que falta ou crie do zero. A correção é automática.</p>
      <ol class="cx-lista">${ids.map((id, k) => {
        const ex = l.exercicios[k];
        const ok = opcoes.codigoFeito(l, k);
        return `<li><a href="#/exercicio/${id}" class="${ok ? "ok" : ""}">
          <span class="cx-ok" aria-hidden="true">${ok ? "✅" : "⬜"}</span>
          <span class="cx-tag ${ex.tipo === "completar" ? "completar" : "criar"}">${ex.tipo === "completar" ? "✏️ Completar" : "🛠️ Do zero"}</span>
          <span class="grow">${esc(ex.titulo)}</span>
          <span class="cx-pts">⭐ ${opcoes.ptsCodigo(id)}</span>
          <span class="sr-only">${ok ? "(resolvido)" : ""}</span>
        </a></li>`;
      }).join("")}</ol>
    </div>` : ""}
    <button class="btn ${feito ? "" : "primary"} done-btn" id="guia-concluir" type="button">${feito ? "✓ Concluída (clique para desmarcar)" : "Marcar lição como concluída <small>(+10 pts)</small>"}</button>
    <nav class="sqlp-nav" aria-label="Navegação entre lições">
      ${ant ? `<a class="btn ghost tiny" href="#/${curso.base}/${ant.id}">← ${esc(ant.titulo)}</a>` : "<span></span>"}
      ${prox ? `<a class="btn ghost tiny" href="#/${curso.base}/${prox.id}">${esc(prox.titulo)} →</a>` : `<a class="btn ghost tiny" href="#/${curso.base}">Voltar ao índice</a>`}
    </nav>`;

  const grupos = [perguntas.slice(0, meio), perguntas.slice(meio)];
  view.querySelectorAll(".pratica-host").forEach((host) => {
    const g = +host.dataset.grupo;
    renderPratica(host, {
      questoes: grupos[g], base: g ? meio : 0,
      chave: (n) => chavePerguntaGuia(curso, l.id, n),
      feito: (k) => !!progresso[k],
      ci: !!curso.ignorarCaixa,
      pontos: opcoes.ptsPergunta,
      onAcerto: opcoes.salvarPergunta
    });
  });

  $("#guia-concluir", view).addEventListener("click", async (ev) => {
    const b = ev.currentTarget;
    b.disabled = true;
    const agora = await opcoes.alternarLicao(chave);
    b.disabled = false;
    b.className = `btn ${agora ? "" : "primary"} done-btn`;
    b.innerHTML = agora ? "✓ Concluída (clique para desmarcar)" : "Marcar lição como concluída <small>(+10 pts)</small>";
    if (agora && prox) location.hash = `#/${curso.base}/${prox.id}`;
  });
}
