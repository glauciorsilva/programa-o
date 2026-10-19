// Tela da trilha "SQL na Prática": índice de lições e lição com exercício interativo.
import { LICOES, SEEDS, chaveLicao } from "../content/sqlpratica.js";
import { criarEditor } from "../sandbox/editor.js";
import { $, $$, esc, progressBar } from "../util.js";

const NOTA_PESQUISA = `<p class="search-note">💡 Em caso de ainda haver dúvida, pesquise o termo na internet.</p>`;
const LIMITE_ABRIR = 30000; // inclui o download do sql.js na primeira vez
const LIMITE_RODAR = 5000;

/* ---------------- Cliente do worker ---------------- */

function criarCliente() {
  let worker = null, seq = 0;
  const pendentes = new Map();

  function iniciar() {
    worker = new Worker(new URL("./motor.worker.js", import.meta.url));
    worker.onmessage = (e) => {
      const p = pendentes.get(e.data.id);
      if (!p) return;
      pendentes.delete(e.data.id);
      clearTimeout(p.timer);
      e.data.ok ? p.ok(e.data.dados) : p.falha(new Error(e.data.erro));
    };
    worker.onerror = (e) => {
      e.preventDefault();
      for (const p of pendentes.values()) {
        clearTimeout(p.timer);
        p.falha(new Error("Não foi possível carregar o motor SQL. Verifique sua internet e recarregue a página."));
      }
      pendentes.clear();
    };
  }

  function encerrar() {
    worker?.terminate();
    worker = null;
    for (const p of pendentes.values()) clearTimeout(p.timer);
    pendentes.clear();
  }

  iniciar();
  return {
    pedir(acao, dados, limite) {
      if (!worker) iniciar();
      const id = ++seq;
      return new Promise((ok, falha) => {
        const timer = setTimeout(() => {
          pendentes.delete(id);
          encerrar(); // consulta travada: descarta o worker (o banco é recriado no próximo pedido)
          const erro = new Error("tempo");
          erro.tempo = true;
          falha(erro);
        }, limite);
        pendentes.set(id, { ok, falha, timer });
        worker.postMessage({ id, acao, dados });
      });
    },
    encerrar
  };
}

/* ---------------- Progresso das tarefas (neste navegador) ---------------- */

const chaveLocal = (uid) => `progrtotal:sqlp:${uid}`;

function lerTarefas(uid) {
  try {
    return JSON.parse(localStorage.getItem(chaveLocal(uid))) || {};
  } catch {
    return {};
  }
}

function salvarTarefas(uid, licaoId, feitas) {
  try {
    const todas = lerTarefas(uid);
    todas[licaoId] = feitas;
    localStorage.setItem(chaveLocal(uid), JSON.stringify(todas));
  } catch { /* sem armazenamento */ }
}

/* ---------------- Helpers de HTML ---------------- */

const celula = (v) => (v === null ? `<td class="nulo">NULL</td>` : `<td>${esc(v)}</td>`);

function tabelaHTML(r) {
  return `<div class="sqlp-scroll"><table class="sqlp-tabela">
    <thead><tr>${r.colunas.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${r.linhas.map((l) => `<tr>${l.map(celula).join("")}</tr>`).join("") || `<tr><td colspan="${r.colunas.length || 1}" class="vazio">(nenhuma linha)</td></tr>`}</tbody>
  </table></div>`;
}

function tabelasHTML(tabelas) {
  if (!tabelas.length) return "";
  return tabelas.map((t) => `
    <figure class="sqlp-tab">
      <figcaption>Tabela: <code>${esc(t.nome)}</code></figcaption>
      ${t.ausente ? `<p class="muted small">Esta tabela não existe mais.</p>` : tabelaHTML(t)}
    </figure>`).join("");
}

const indice = (id) => LICOES.findIndex((l) => l.id === id);
const rotulo = (l) => (/^\d+$/.test(l.id) ? (l.id === "0" ? "Introdução" : `Lição ${l.id}`) : l.id === "fim" ? "Encerramento" : "Tópico extra");

function liberada(i, progresso, liberarTudo) {
  return liberarTudo || i === 0 || !!progresso[chaveLicao(LICOES[i - 1].id)];
}

/* ---------------- Índice ---------------- */

function renderIndice(view, { progresso, liberarTudo }) {
  const feitas = LICOES.filter((l) => progresso[chaveLicao(l.id)]).length;
  const pct = Math.round((feitas / LICOES.length) * 100);
  view.innerHTML = `
    <a class="back" href="#/bancos">← Bancos de Dados</a>
    <h1>🧩 SQL na Prática</h1>
    <p class="muted">Trilha interativa: cada lição traz uma explicação curta e um exercício com um banco de dados de verdade (SQLite) rodando no seu navegador. Escreva a consulta, veja o resultado na hora e avance quando todas as tarefas estiverem certas.</p>
    <div class="stat-row">
      <div class="stat"><small>Lições concluídas</small><strong>${feitas}/${LICOES.length}</strong>${progressBar(pct, true)}</div>
    </div>
    <ol class="sqlp-indice">
      ${LICOES.map((l, i) => {
        const feito = !!progresso[chaveLicao(l.id)];
        const aberta = liberada(i, progresso, liberarTudo);
        const icone = feito ? "✅" : aberta ? "▶️" : "🔒";
        const corpo = `<span class="sqlp-ic" aria-hidden="true">${icone}</span>
          <span><small class="muted">${rotulo(l)}</small><strong>${esc(l.titulo)}</strong></span>
          <span class="sr-only">${feito ? "(concluída)" : aberta ? "(liberada)" : "(bloqueada)"}</span>`;
        return `<li class="${feito ? "feito" : aberta ? "" : "bloq"}">${aberta
          ? `<a href="#/sqlpratica/${l.id}">${corpo}</a>`
          : `<div title="Conclua a lição anterior para liberar">${corpo}</div>`}</li>`;
      }).join("")}
    </ol>`;
  return () => {};
}

/* ---------------- Lição ---------------- */

/**
 * Desenha a trilha em `view`. Devolve uma função de limpeza.
 * opcoes: { licaoId, uid, progresso, liberarTudo, onConcluir(licaoId) }
 */
export async function renderSQLPratica(view, opcoes) {
  const { licaoId, uid, progresso, liberarTudo, onConcluir } = opcoes;
  const i = indice(licaoId);
  if (i < 0) return renderIndice(view, opcoes);
  const licao = LICOES[i];
  const anterior = LICOES[i - 1], proxima = LICOES[i + 1];
  const cabecalho = `<a class="back" href="#/sqlpratica">← SQL na Prática</a>
    <p class="muted small sqlp-onde">${rotulo(licao)} · ${i + 1} de ${LICOES.length}</p>
    <h1>${esc(licao.titulo)}</h1>`;

  if (!liberada(i, progresso, liberarTudo)) {
    view.innerHTML = `${cabecalho}
      <div class="banner warn">🔒 Esta lição é liberada quando você concluir a anterior:
        <a href="#/sqlpratica/${anterior.id}">${esc(anterior.titulo)}</a>.</div>`;
    return () => {};
  }

  const tarefas = licao.tarefas;
  const jaConcluida = !!progresso[chaveLicao(licao.id)];
  const feitas = tarefas.map((_, k) => jaConcluida || (lerTarefas(uid)[licao.id] || []).includes(k));
  const temExercicio = tarefas.length > 0;
  const textoBotao = licao.id === "0" ? "Começar a Lição 1 →" : !proxima ? "Concluir a trilha 🎉" : temExercicio ? "Concluir e ir para a próxima →" : "Continuar →";

  view.innerHTML = `${cabecalho}
    <section class="box sqlp-teoria">${licao.teoria}${NOTA_PESQUISA}</section>
    ${temExercicio ? `
    <section class="sqlp-exercicio" aria-labelledby="sqlp-ex-titulo">
      <h2 id="sqlp-ex-titulo">✏️ Exercício</h2>
      ${licao.manual ? `<p class="banner info small">⚙️ Aqui as consultas alteram o banco: clique em <b>▶ Executar</b> (ou Ctrl+Enter) para rodar. As mudanças ficam salvas até você clicar em <b>↺ Resetar banco</b>.</p>` : `<p class="muted small">O resultado é atualizado enquanto você digita.</p>`}
      <div class="sqlp-grid">
        <div class="sqlp-main">
          <div class="sqlp-tabelas" id="sqlp-tabelas"><p class="muted small">⏳ Carregando o banco de dados…</p></div>
          <div class="sqlp-editor-box">
            <div class="sqlp-editor" id="sqlp-editor"></div>
            <div class="sqlp-acoes">
              <button class="btn primary tiny" id="sqlp-executar" type="button">▶ Executar</button>
              <button class="btn ghost tiny" id="sqlp-resetar" type="button">↺ Resetar banco</button>
              <span class="muted small" id="sqlp-status" aria-live="polite"></span>
            </div>
          </div>
          <div class="sqlp-resultado" id="sqlp-resultado" aria-live="polite"></div>
        </div>
        <aside class="sqlp-tarefas box" aria-labelledby="sqlp-tarefas-titulo">
          <h3 id="sqlp-tarefas-titulo">Tarefas</h3>
          <ol class="sqlp-lista" id="sqlp-lista">
            ${tarefas.map((t, k) => `
              <li data-k="${k}">
                <span class="sqlp-marca" aria-hidden="true"></span>
                <div class="grow">
                  <p>${t.texto}</p>
                  <details class="sqlp-sol">
                    <summary>Travou? Ver a solução</summary>
                    <pre><code>${esc(t.solucao)}</code></pre>
                    <button class="btn ghost tiny" data-usar="${k}" type="button">Copiar para o editor</button>
                  </details>
                </div>
              </li>`).join("")}
          </ol>
          <p class="sqlp-feedback" id="sqlp-feedback" aria-live="polite"></p>
          <button class="btn primary" id="sqlp-concluir" type="button">${textoBotao}</button>
        </aside>
      </div>
    </section>` : `
    <div class="sqlp-rodape-simples"><button class="btn primary" id="sqlp-concluir" type="button">${textoBotao}</button></div>`}
    <nav class="sqlp-nav" aria-label="Navegação entre lições">
      ${anterior ? `<a class="btn ghost tiny" href="#/sqlpratica/${anterior.id}">← ${esc(anterior.titulo)}</a>` : "<span></span>"}
      ${proxima && (jaConcluida || liberarTudo) ? `<a class="btn ghost tiny" href="#/sqlpratica/${proxima.id}">${esc(proxima.titulo)} →</a>` : ""}
    </nav>`;

  const concluir = $("#sqlp-concluir", view);
  const irParaProxima = async () => {
    concluir.disabled = true;
    await onConcluir?.(licao.id);
    location.hash = proxima ? `#/sqlpratica/${proxima.id}` : "#/sqlpratica";
  };
  concluir.addEventListener("click", irParaProxima);
  if (!temExercicio) return () => {};

  /* ----- exercício ----- */

  const cliente = criarCliente();
  let encerrado = false;
  const els = {
    tabelas: $("#sqlp-tabelas", view),
    resultado: $("#sqlp-resultado", view),
    feedback: $("#sqlp-feedback", view),
    status: $("#sqlp-status", view),
    executar: $("#sqlp-executar", view),
    resetar: $("#sqlp-resetar", view)
  };
  const atualIdx = () => feitas.indexOf(false);

  function pintarTarefas() {
    const atual = atualIdx();
    $$("#sqlp-lista li", view).forEach((li, k) => {
      li.classList.toggle("feita", feitas[k]);
      li.classList.toggle("atual", k === atual);
      li.querySelector(".sqlp-marca").textContent = feitas[k] ? "✔" : k === atual ? "➜" : "";
    });
    const tudo = atual < 0;
    concluir.disabled = !tudo;
    concluir.title = tudo ? "" : "Conclua todas as tarefas para liberar a próxima lição";
    if (tudo && !els.feedback.textContent) els.feedback.innerHTML = `<span class="ok">🎉 Todas as tarefas concluídas!</span>`;
  }

  const dadosAbrir = { seed: SEEDS[licao.banco], preload: licao.preload || "", nomesTabelas: licao.tabelas };
  let banco = null; // promessa do banco aberto no worker

  function abrirBanco() {
    banco = cliente.pedir("abrir", dadosAbrir, LIMITE_ABRIR).then((r) => {
      if (!encerrado) els.tabelas.innerHTML = tabelasHTML(r.tabelas);
      return r;
    });
    return banco;
  }

  let ultimoPedido = 0;
  async function rodar() {
    const pedido = ++ultimoPedido;
    const sql = editor.getValue();
    const k = atualIdx();
    els.status.textContent = "Executando…";
    let r;
    try {
      await banco;
      r = await cliente.pedir("rodar", { sql, manual: !!licao.manual, tarefa: k >= 0 ? tarefas[k] : null, nomesTabelas: licao.tabelas }, LIMITE_RODAR);
    } catch (e) {
      if (encerrado || pedido !== ultimoPedido) return;
      els.status.textContent = "";
      if (e.tempo) {
        els.resultado.innerHTML = `<div class="sqlp-erro">⏱️ A consulta demorou demais e foi interrompida.${licao.manual ? " O banco foi reiniciado." : ""}</div>`;
        abrirBanco().catch(() => {});
      } else {
        els.resultado.innerHTML = `<div class="sqlp-erro">⚠️ ${esc(e.message)}</div>`;
      }
      return;
    }
    if (encerrado || pedido !== ultimoPedido) return;
    els.status.textContent = "";
    if (r.tabelas) els.tabelas.innerHTML = tabelasHTML(r.tabelas);

    if (r.erro) {
      els.resultado.innerHTML = `<div class="sqlp-erro">⚠️ Erro: ${esc(r.erro)}</div>`;
    } else if (r.resultado) {
      const n = r.resultado.linhas.length;
      els.resultado.innerHTML = `<h3 class="sqlp-res-titulo">Resultado <small class="muted">${n} linha${n === 1 ? "" : "s"}</small></h3>${tabelaHTML(r.resultado)}`;
    } else {
      els.resultado.innerHTML = `<div class="sqlp-ok">✅ Comando executado.${r.afetadas ? ` ${r.afetadas} linha(s) afetada(s).` : ""}</div>`;
    }

    if (k < 0 || !r.correcao) return;
    if (r.correcao.ok) {
      feitas[k] = true;
      salvarTarefas(uid, licao.id, feitas.flatMap((f, x) => (f ? [x] : [])));
      const prox = atualIdx();
      els.feedback.innerHTML = prox < 0
        ? `<span class="ok">🎉 Todas as tarefas concluídas! Clique no botão abaixo para continuar.</span>`
        : `<span class="ok">✔ Tarefa ${k + 1} concluída! Vamos para a próxima.</span>`;
      pintarTarefas();
    } else if (!r.erro || licao.manual) {
      els.feedback.innerHTML = `<span class="pendente">Tarefa ${k + 1}: ${esc(r.correcao.msg)}</span>`;
    }
  }

  // Editor
  const editor = await criarEditor($("#sqlp-editor", view), { valor: licao.inicial, modo: "text/x-sqlite", onExecutar: () => rodar() });
  const estrela = licao.inicial.indexOf("*");
  if (estrela >= 0) editor.selecionar?.(estrela, estrela + 1);

  let espera = null;
  if (!licao.manual) {
    editor.onChange(() => {
      clearTimeout(espera);
      espera = setTimeout(rodar, 350);
    });
  }
  els.executar.addEventListener("click", () => rodar());
  els.resetar.addEventListener("click", async () => {
    els.status.textContent = "Recriando o banco…";
    try {
      await banco;
      const r = await cliente.pedir("resetar", { nomesTabelas: licao.tabelas }, LIMITE_RODAR);
      els.tabelas.innerHTML = tabelasHTML(r.tabelas);
      els.resultado.innerHTML = `<div class="sqlp-ok">↺ Banco de dados recriado do zero.</div>`;
    } catch {
      abrirBanco().catch(() => {});
    }
    els.status.textContent = "";
  });
  $$("[data-usar]", view).forEach((b) => b.addEventListener("click", () => {
    editor.setValue(tarefas[+b.dataset.usar].solucao);
    editor.focus();
    if (!licao.manual) rodar();
  }));

  pintarTarefas();
  try {
    await abrirBanco();
    if (!licao.manual && !encerrado) rodar();
  } catch (e) {
    if (!encerrado) els.tabelas.innerHTML = `<div class="sqlp-erro">⚠️ ${esc(e.tempo ? "O banco demorou demais para carregar. Verifique sua internet e recarregue a página." : e.message)}</div>`;
  }

  return () => {
    encerrado = true;
    clearTimeout(espera);
    cliente.encerrar();
  };
}
