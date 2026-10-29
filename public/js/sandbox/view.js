// Tela do sandbox: modo livre, testar exemplo de um tópico ou resolver exercício.
import { db } from "../firebase.js";
import {
  doc, getDoc, setDoc, serverTimestamp, increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { LANGS } from "./langs.js";
import { executar, precarregar } from "./executor.js";
import { criarEditor } from "./editor.js";
import { $, $$, esc } from "../util.js";

const ABAS_WEB = [
  { id: "html", nome: "HTML", modo: "htmlmixed" },
  { id: "css", nome: "CSS", modo: "css" },
  { id: "js", nome: "JS", modo: "javascript" }
];

const NOTAS = {
  web: "A pré-visualização roda isolada. Use <code>console.log</code> para ver mensagens na saída.",
  js: "Roda no navegador (sem <code>document</code>). Pode usar <code>await</code> direto e <code>fetch</code> para APIs públicas.",
  ts: "Os tipos são removidos e o código roda como JavaScript. Para checar tipos de verdade, use o <code>tsc</code> ou o VS Code.",
  react: "Exporte o componente com <code>export default</code>. Bibliotecas disponíveis: <code>react</code>, <code>react-dom</code> e <code>react-router-dom</code> (use <code>MemoryRouter</code>).",
  python: "Python 3 completo no navegador (Pyodide). Bibliotecas como <code>pandas</code> são baixadas na primeira vez. Arquivos de exemplo: <code>vendas.csv</code> e <code>clientes.csv</code>.",
  sql: "Banco de exemplo recriado a cada execução (motor SQLite com funções do MySQL como <code>NOW()</code>, <code>DATE_FORMAT</code>, <code>TIMESTAMPDIFF</code>). Comandos administrativos (usuários, procedures, triggers) precisam de um MySQL real.",
  go: "Go precisa de compilador: copie o código e rode no playground oficial (abre em outra aba).",
  csharp: "C# precisa do .NET: copie o código e rode em um playground online (abre em outra aba).",
  java: "Java precisa da JVM: copie o código e rode em um playground online (abre em outra aba).",
  cpp: "C++ precisa ser compilado: copie o código e rode em um playground online (abre em outra aba)."
};

const chaveLocal = (uid, chave) => `progrtotal:sbx:${uid}:${chave}`;

function lerLocal(uid, chave) {
  try {
    const v = localStorage.getItem(chaveLocal(uid, chave));
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function gravarLocal(uid, chave, codigo) {
  try {
    localStorage.setItem(chaveLocal(uid, chave), JSON.stringify(codigo));
  } catch { /* sem armazenamento local: ignora */ }
}

/**
 * opcoes: { modo: 'livre'|'topico'|'exercicio', lang, inicial, titulo, subtitulo, voltar:{href,texto},
 *           entrada, db, chave, nuvem (salva no Firestore), exercicio, exId, resolvido,
 *           proximo:{href,texto} (link mostrado ao resolver) }
 * ctx: { uid, onResolvido(exId) }
 * Retorna uma função de limpeza.
 */
export async function renderSandbox(view, opcoes, ctx) {
  const cfg = LANGS[opcoes.lang];
  const ex = opcoes.exercicio;
  const web = cfg.tipo === "web";
  const preview = cfg.tipo === "web" || cfg.tipo === "react";
  const externo = cfg.tipo === "externo";
  // Linguagens que não rodam no navegador só têm "Verificar" quando o exercício traz padrões a conferir
  const verificavel = ex && (!externo || ex.padroes?.length);
  let resolvido = !!opcoes.resolvido;
  const abaInicial = opcoes.aba || "html";
  precarregar(opcoes.lang);

  view.innerHTML = `
    ${opcoes.voltar ? `<a class="back" href="${opcoes.voltar.href}">← ${esc(opcoes.voltar.texto)}</a>` : ""}
    <div class="sbx-head">
      <div>
        <h1>${opcoes.modo === "exercicio" ? "🏋️ " : "🧪 "}${esc(opcoes.titulo)}</h1>
        ${opcoes.subtitulo ? `<p class="muted">${opcoes.subtitulo}</p>` : ""}
      </div>
      ${opcoes.modo === "livre" ? `<label class="sbx-lang">Linguagem
        <select id="sbx-lang">${Object.entries(LANGS).map(([id, l]) =>
          `<option value="${id}" ${id === opcoes.lang ? "selected" : ""}>${l.icone} ${esc(l.nome)}</option>`).join("")}</select>
      </label>` : ""}
    </div>

    ${ex ? `<section class="box sbx-enunciado">
      <div class="sbx-status ${resolvido ? "ok" : ""}" id="sbx-resolvido">${resolvido ? "✅ Resolvido" : "⏳ Não resolvido ainda"}</div>
      <div>${ex.enunciado}</div>
      ${ex.saidaEsperada ? `<h4>Saída esperada</h4><pre class="sbx-esperada">${esc(ex.saidaEsperada)}</pre>` : ""}
      ${ex.nota ? `<p class="muted small">${ex.nota}</p>` : ""}
      <div class="sbx-dica" hidden><b>💡 Dica:</b> ${ex.dica}</div>
    </section>` : ""}

    <div class="sbx">
      <section class="sbx-col">
        ${web ? `<div class="sbx-tabs" role="tablist">${ABAS_WEB.map((a, i) =>
          `<button role="tab" data-aba="${a.id}" class="${a.id === abaInicial ? "active" : ""}">${a.nome}</button>`).join("")}</div>` : ""}
        <div class="sbx-editor" id="sbx-editor"><p class="muted small sbx-carregando">Carregando editor…</p></div>
        ${opcoes.lang === "python" ? `<details class="sbx-entrada" ${opcoes.entrada ? "open" : ""}>
          <summary>⌨️ Entrada para <code>input()</code> (um valor por linha)</summary>
          <textarea id="sbx-entrada" rows="3" spellcheck="false">${esc(opcoes.entrada || "")}</textarea>
        </details>` : ""}
        <div class="sbx-bar">
          ${externo ? `<button class="btn primary" id="sbx-copiar-abrir">📋 Copiar código</button>
            ${cfg.playgrounds.map((p) => `<a class="btn ghost" href="${p.url}" target="_blank" rel="noopener">${esc(p.nome)} ↗</a>`).join("")}`
          : `<button class="btn primary" id="sbx-run" title="Ctrl+Enter">▶ Executar</button>`}
          ${verificavel ? `<button class="btn success" id="sbx-verificar">✅ Verificar</button>` : ""}
          ${ex && !verificavel ? `<button class="btn success" id="sbx-marcar">✅ Marcar como resolvido</button>` : ""}
          ${ex ? `<button class="btn ghost" id="sbx-dica">💡 Dica</button><button class="btn ghost" id="sbx-solucao">👀 Solução</button>` : ""}
          ${!externo ? `<button class="btn ghost" id="sbx-copiar">📋 Copiar</button>` : ""}
          <button class="btn ghost" id="sbx-restaurar" title="Volta ao código inicial">↺ Restaurar</button>
          <span class="sbx-salvo muted small" id="sbx-salvo"></span>
        </div>
      </section>

      <section class="sbx-col">
        <div class="sbx-out-head">
          <strong>${preview ? "Resultado" : "Saída"}</strong>
          <span class="muted small" id="sbx-estado"></span>
          <button class="btn tiny ghost" id="sbx-limpar">Limpar</button>
        </div>
        ${preview ? `<div class="sbx-preview-host" id="sbx-preview"><p class="muted small">Clique em ▶ Executar para ver o resultado.</p></div>` : ""}
        <div class="sbx-console${preview ? " preview" : ""}" id="sbx-console" aria-live="polite">${externo
          ? `<p class="muted">Este código não roda dentro do navegador. Clique em <b>Copiar código</b>, abra um dos playgrounds e cole lá (Ctrl+V). Depois compare com a saída esperada.</p>`
          : preview ? "" : `<p class="muted">Clique em ▶ Executar (ou Ctrl+Enter).</p>`}</div>
        <div id="sbx-resultado"></div>
      </section>
    </div>
    <p class="muted small sbx-nota">ℹ️ ${NOTAS[opcoes.lang]}</p>`;

  /* ---------- estado e salvamento ---------- */
  const chave = opcoes.chave;
  let codigo = opcoes.inicial;
  let salvoNuvem = null;
  if (chave) {
    const local = lerLocal(ctx.uid, chave);
    if (opcoes.nuvem) {
      try {
        const snap = await getDoc(doc(db, "users", ctx.uid, "codigos", chave));
        if (snap.exists()) {
          salvoNuvem = snap.data();
          codigo = salvoNuvem.codigo ?? codigo;
          if (salvoNuvem.ok) resolvido = true;
        } else if (local) codigo = local;
      } catch {
        if (local) codigo = local;
      }
    } else if (local) codigo = local;
  }
  if (web && typeof codigo === "string") codigo = { html: codigo, css: "", js: "" };

  if (!view.isConnected) return () => {};
  if (resolvido) marcarResolvidoUI();

  /* ---------- editores ---------- */
  const host = $("#sbx-editor", view);
  host.replaceChildren();
  const executarAtalho = () => (verificavel ? verificar() : rodar());
  // Exercícios de completar: cada ____ vira um campo clicável no editor
  const completar = ex?.tipo === "completar";
  let editores = {};
  if (web) {
    for (const a of ABAS_WEB) {
      const div = document.createElement("div");
      div.className = "sbx-pane";
      div.dataset.aba = a.id;
      div.hidden = a.id !== abaInicial;
      host.appendChild(div);
      editores[a.id] = await criarEditor(div, { valor: codigo[a.id] || "", modo: a.modo, onExecutar: executarAtalho, lacunas: completar });
    }
  } else {
    editores.main = await criarEditor(host, { valor: codigo, modo: cfg.modo, onExecutar: executarAtalho, lacunas: completar });
  }
  if (!view.isConnected) return () => {};

  const lerCodigo = () => (web
    ? { html: editores.html.getValue(), css: editores.css.getValue(), js: editores.js.getValue() }
    : editores.main.getValue());
  const escreverCodigo = (v) => {
    if (web) ABAS_WEB.forEach((a) => editores[a.id].setValue(v[a.id] || ""));
    else editores.main.setValue(v);
  };

  let timerSalvar = null;
  let pendente = false;
  const salvo = $("#sbx-salvo", view);
  async function salvar(extra = {}) {
    clearTimeout(timerSalvar);
    if (!chave) return;
    const atual = lerCodigo();
    gravarLocal(ctx.uid, chave, atual);
    pendente = false;
    if (!opcoes.nuvem) return;
    try {
      await setDoc(doc(db, "users", ctx.uid, "codigos", chave), {
        lang: opcoes.lang, titulo: opcoes.titulo, codigo: atual, atualizadoEm: serverTimestamp(), ...extra
      }, { merge: true });
      salvo.textContent = "✓ salvo";
    } catch {
      salvo.textContent = "salvo só neste aparelho";
    }
  }
  const agendarSalvar = () => {
    if (!chave) return;
    pendente = true;
    salvo.textContent = "editando…";
    clearTimeout(timerSalvar);
    timerSalvar = setTimeout(salvar, 1500);
  };
  Object.values(editores).forEach((e) => e.onChange(agendarSalvar));

  /* ---------- abas HTML/CSS/JS ---------- */
  $$(".sbx-tabs button", view).forEach((b) => b.addEventListener("click", () => {
    $$(".sbx-tabs button", view).forEach((x) => x.classList.toggle("active", x === b));
    $$(".sbx-pane", view).forEach((p) => (p.hidden = p.dataset.aba !== b.dataset.aba));
    editores[b.dataset.aba].refresh();
    editores[b.dataset.aba].focus();
  }));

  /* ---------- saída ---------- */
  const consoleEl = $("#sbx-console", view);
  const estado = $("#sbx-estado", view);
  const resultadoEl = $("#sbx-resultado", view);
  const limpar = () => {
    consoleEl.replaceChildren();
    resultadoEl.replaceChildren();
  };
  const linha = (tipo, texto) => {
    const p = document.createElement("div");
    p.className = "sbx-linha " + tipo;
    p.textContent = texto;
    consoleEl.appendChild(p);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  };
  const tabelas = (resultados) => {
    for (const r of resultados) {
      const bloco = document.createElement("div");
      bloco.className = "sbx-sql";
      const sqlCurto = r.sql.replace(/\s+/g, " ").slice(0, 90) + (r.sql.length > 90 ? "…" : "");
      if (!r.colunas) {
        bloco.innerHTML = `<div class="sbx-sql-cmd">✔ ${esc(sqlCurto)}${r.afetadas != null ? ` <b>— ${r.afetadas} linha(s) afetada(s)</b>` : ""}</div>`;
      } else {
        const linhas = r.linhas.slice(0, 200);
        bloco.innerHTML = `<div class="sbx-sql-cmd">${esc(sqlCurto)} <b>— ${r.linhas.length} linha(s)</b></div>
          <div class="table-wrap"><table class="table sbx-tabela"><thead><tr>${r.colunas.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>${linhas.map((l) => `<tr>${l.map((v) => `<td>${v === null ? '<span class="muted">NULL</span>' : esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
          ${r.linhas.length > 200 ? `<p class="muted small">Mostrando 200 de ${r.linhas.length} linhas.</p>` : ""}`;
      }
      consoleEl.appendChild(bloco);
    }
  };

  let rodando = false;
  async function rodar(opcoesTeste = {}) {
    if (rodando || externo) return;
    rodando = true;
    limpar();
    estado.textContent = "executando…";
    const botoes = $$("#sbx-run, #sbx-verificar", view);
    botoes.forEach((b) => (b.disabled = true));
    let resultadoTeste = null;
    const t0 = performance.now();
    try {
      await executar({
        lang: opcoes.lang,
        codigo: lerCodigo(),
        entrada: $("#sbx-entrada", view)?.value,
        db: opcoes.db,
        ...opcoesTeste
      }, (ev) => {
        if (ev.tipo === "log" || ev.tipo === "erro" || ev.tipo === "aviso") linha(ev.tipo, ev.texto);
        else if (ev.tipo === "status") estado.textContent = ev.texto;
        else if (ev.tipo === "tabelas") tabelas(ev.resultados);
        else if (ev.tipo === "teste") resultadoTeste = ev;
        else if (ev.tipo === "fim") {
          estado.textContent = ev.cancelado ? "cancelado" : `concluído em ${((performance.now() - t0) / 1000).toFixed(1)}s`;
          if (!consoleEl.childElementCount && !preview) linha("info", "(nenhuma saída — use print/console.log/SELECT para ver resultados)");
        }
      }, $("#sbx-preview", view));
    } finally {
      rodando = false;
      botoes.forEach((b) => (b.disabled = false));
    }
    return resultadoTeste;
  }

  // Confere lacunas "____" e os padrões exigidos pelo exercício, antes de executar.
  function conferirTexto() {
    const v = lerCodigo();
    const texto = typeof v === "string" ? v : [v.html, v.css, v.js].join("\n");
    if (/_{4,}/.test(texto)) return completar
      ? "Ainda há lacunas em branco. Clique em cada retângulo do código e escreva o que falta."
      : "Ainda há lacunas ____ no código. Substitua cada ____ pelo que falta.";
    for (const [re, msg] of ex.padroes || []) {
      if (!re.test(texto)) return msg;
    }
    return null;
  }

  async function verificar() {
    const falta = conferirTexto();
    if (falta) {
      mostrarResultado(false, falta);
      salvar({ tentativas: increment(1) });
      return;
    }
    if (externo || ex.somentePadroes) {
      // Não dá para rodar aqui: os padrões bateram; a conferência final é num ambiente real.
      await salvar({ ok: true, resolvidoEm: serverTimestamp(), tentativas: increment(1) });
      marcarResolvidoUI();
      mostrarResultado(true, "", ex.notaVerificacao || "Para conferir de verdade, copie o código e rode no playground: a saída deve ser igual à saída esperada.");
      ctx.onResolvido?.(opcoes.exId);
      return;
    }
    const r = await rodar({
      teste: ex.teste, solucao: ex.lang === "sql" ? ex.solucao : undefined,
      verificacao: ex.verificacao, ordem: ex.ordem
    });
    if (!r) {
      mostrarResultado(false, "Seu código terminou com erro antes da verificação. Veja a mensagem na saída.");
      salvar({ tentativas: increment(1) });
      return;
    }
    mostrarResultado(r.ok, r.msg);
    if (r.ok) {
      await salvar({ ok: true, resolvidoEm: serverTimestamp(), tentativas: increment(1) });
      marcarResolvidoUI();
      ctx.onResolvido?.(opcoes.exId);
    } else {
      salvar({ tentativas: increment(1) });
    }
  }

  function mostrarResultado(ok, msg, nota) {
    const prox = opcoes.proximo ? ` <a class="btn tiny primary" href="${opcoes.proximo.href}">${esc(opcoes.proximo.texto)} →</a>` : "";
    resultadoEl.innerHTML = ok
      ? `<div class="sbx-teste ok">🎉 <b>Parabéns!</b> Exercício resolvido.${nota ? ` ${esc(nota)}` : ""}${prox}</div>`
      : `<div class="sbx-teste erro">❌ <b>Ainda não.</b> ${esc(msg || "")}</div>`;
    resultadoEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function marcarResolvidoUI() {
    resolvido = true;
    const s = $("#sbx-resolvido", view);
    if (s) {
      s.textContent = "✅ Resolvido";
      s.classList.add("ok");
    }
  }

  /* ---------- botões ---------- */
  $("#sbx-run", view)?.addEventListener("click", () => rodar());
  $("#sbx-verificar", view)?.addEventListener("click", verificar);
  $("#sbx-limpar", view).addEventListener("click", limpar);
  $("#sbx-restaurar", view).addEventListener("click", () => {
    if (!confirm("Voltar ao código inicial? O que você escreveu será substituído.")) return;
    escreverCodigo(web && typeof opcoes.inicial === "string" ? { html: opcoes.inicial } : opcoes.inicial);
  });
  const copiar = async (ev) => {
    const v = lerCodigo();
    const texto = web ? `<!-- HTML -->\n${v.html}\n\n<style>\n${v.css}\n</style>\n\n<script>\n${v.js}\n</script>` : v;
    try {
      await navigator.clipboard.writeText(texto);
      ev.target.textContent = "✓ Copiado!";
    } catch {
      ev.target.textContent = "Selecione e copie (Ctrl+A, Ctrl+C)";
    }
    setTimeout(() => (ev.target.textContent = ev.target.id === "sbx-copiar" ? "📋 Copiar" : "📋 Copiar código"), 2000);
  };
  $("#sbx-copiar", view)?.addEventListener("click", copiar);
  $("#sbx-copiar-abrir", view)?.addEventListener("click", copiar);
  $("#sbx-dica", view)?.addEventListener("click", () => {
    const d = $(".sbx-dica", view);
    d.hidden = !d.hidden;
  });
  $("#sbx-solucao", view)?.addEventListener("click", () => {
    if (!confirm("Ver a solução? Tente mais um pouco antes — errar faz parte do aprendizado! 😉\n\nA solução vai substituir o código do editor.")) return;
    escreverCodigo(ex.solucao);
  });
  $("#sbx-marcar", view)?.addEventListener("click", async () => {
    if (!confirm("Você rodou o código no playground e a saída bateu com a esperada?")) return;
    await salvar({ ok: true, resolvidoEm: serverTimestamp(), tentativas: increment(1) });
    marcarResolvidoUI();
    mostrarResultado(true);
    ctx.onResolvido?.(opcoes.exId);
  });
  $("#sbx-lang", view)?.addEventListener("change", (e) => (location.hash = "#/sandbox/" + e.target.value));

  return () => {
    if (pendente) salvar();
  };
}
