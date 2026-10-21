// Editor de código (CodeMirror 5), com textarea simples como plano B se o CDN falhar.
import { carregarScript, carregarCss } from "./executor.js";
import { palavrasDoModo, ignoraCaixa } from "./sugestoes.js";

const CM = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";
let cmPronto = null;

function carregarCodeMirror() {
  cmPronto ||= (async () => {
    carregarCss(CM + "codemirror.min.css");
    carregarCss(CM + "theme/material-darker.min.css");
    carregarCss(CM + "addon/hint/show-hint.min.css");
    await carregarScript(CM + "codemirror.min.js");
    await Promise.all([
      "mode/xml/xml.min.js", "mode/javascript/javascript.min.js", "mode/css/css.min.js",
      "mode/python/python.min.js", "mode/sql/sql.min.js", "mode/go/go.min.js",
      "mode/clike/clike.min.js", "addon/edit/closebrackets.min.js", "addon/edit/matchbrackets.min.js",
      "addon/comment/comment.min.js", "addon/hint/show-hint.min.js"
    ].map((f) => carregarScript(CM + f)));
    await Promise.all(["mode/htmlmixed/htmlmixed.min.js", "mode/jsx/jsx.min.js"].map((f) => carregarScript(CM + f)));
  })();
  return cmPronto;
}

/**
 * Cria um editor dentro de `el`. Retorna { getValue, setValue, refresh, focus, selecionar, onChange }.
 * lacunas: true transforma cada "____" do código num campo clicável (exercícios de completar).
 */
export async function criarEditor(el, { valor = "", modo = "javascript", onExecutar, lacunas = false } = {}) {
  const escutas = [];
  try {
    await carregarCodeMirror();
    const escuro = matchMedia("(prefers-color-scheme: dark)").matches;
    const cm = window.CodeMirror(el, {
      value: valor,
      mode: modo,
      theme: escuro ? "material-darker" : "default",
      lineNumbers: true,
      indentUnit: modo === "text/x-go" ? 8 : modo === "python" ? 4 : 2,
      tabSize: 4,
      indentWithTabs: modo === "text/x-go",
      autoCloseBrackets: true,
      matchBrackets: true,
      lineWrapping: false,
      viewportMargin: Infinity,
      inputStyle: "contenteditable",
      extraKeys: {
        "Ctrl-Enter": () => onExecutar?.(),
        "Cmd-Enter": () => onExecutar?.(),
        "Ctrl-/": "toggleComment",
        "Cmd-/": "toggleComment",
        "Ctrl-Space": (c) => sugerir(c, true),
        Tab: (c) => (c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection(c.getOption("indentWithTabs") ? "\t" : " ".repeat(c.getOption("indentUnit")), "end"))
      }
    });
    cm.on("change", () => escutas.forEach((f) => f()));
    cm.on("inputRead", (c, ev) => {
      if (/^[\w$<-]$/.test(ev.text.join(""))) sugerir(c, false);
    });
    const campos = lacunas ? criarLacunas(cm, modo, () => escutas.forEach((f) => f())) : null;
    return {
      getValue: () => (campos ? campos.valor() : cm.getValue()),
      setValue: (v) => {
        cm.setValue(v);
        campos?.marcar();
      },
      refresh: () => cm.refresh(),
      focus: () => cm.focus(),
      // Seleciona um trecho (índices no texto) e foca sem rolar a página.
      selecionar: (de, ate) => {
        cm.setSelection(cm.posFromIndex(de), cm.posFromIndex(ate));
        cm.getInputField().focus({ preventScroll: true });
      },
      onChange: (f) => escutas.push(f)
    };
  } catch (err) {
    console.warn("Editor simples (CodeMirror indisponível):", err);
    // Plano B: textarea
    const ta = document.createElement("textarea");
    ta.className = "sbx-textarea";
    ta.spellcheck = false;
    ta.value = valor;
    ta.addEventListener("input", () => escutas.forEach((f) => f()));
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); onExecutar?.(); }
      if (e.key === "Tab") {
        e.preventDefault();
        ta.setRangeText("    ", ta.selectionStart, ta.selectionEnd, "end");
      }
    });
    el.appendChild(ta);
    return {
      getValue: () => ta.value,
      setValue: (v) => { ta.value = v; },
      refresh: () => {},
      focus: () => ta.focus(),
      selecionar: (de, ate) => {
        ta.focus({ preventScroll: true });
        ta.setSelectionRange(de, ate);
      },
      onChange: (f) => escutas.push(f)
    };
  }
}

/* ---------------- Sugestões (autocompletar) ---------------- */

const PALAVRA = /[\w$-]/;

// Lista as palavras que combinam com o que está sendo digitado e mostra para o aluno escolher.
function sugerir(cm, manual) {
  if (cm.state.completionActive && !manual) return;
  const cur = cm.getCursor();
  const token = cm.getTokenAt(cur);
  if (!manual && /string|comment/.test(token.type || "")) return;
  const linha = cm.getLine(cur.line);
  let ini = cur.ch;
  while (ini > 0 && PALAVRA.test(linha[ini - 1])) ini--;
  const prefixo = linha.slice(ini, cur.ch).replace(/^-+/, "");
  if (!manual && prefixo.length < 2) return;
  const modo = cm.getOption("mode");
  const lista = candidatos(cm, modo, prefixo);
  if (!lista.length) return;
  cm.showHint({
    completeSingle: false,
    hint: () => ({ list: lista, from: { line: cur.line, ch: cur.ch - prefixo.length }, to: cur })
  });
}

function candidatos(cm, modo, prefixo) {
  const ci = ignoraCaixa(modo);
  const p = prefixo.toLowerCase();
  const doc = new Set(cm.getValue().match(/[A-Za-z_$][\w$-]{2,}/g) || []);
  const todas = [...new Set([...palavrasDoModo(modo), ...doc])];
  const minusc = ci && prefixo === prefixo.toLowerCase();
  return todas
    .filter((w) => w.toLowerCase().startsWith(p) && w.toLowerCase() !== p)
    .sort((a, b) => (b.startsWith(prefixo) - a.startsWith(prefixo)) || a.length - b.length || a.localeCompare(b))
    .slice(0, 12)
    .map((w) => (minusc && w === w.toUpperCase() ? w.toLowerCase() : w));
}

/* ---------------- Lacunas clicáveis (exercícios de completar) ---------------- */

let seqLista = 0;

function criarLacunas(cm, modo, avisar) {
  let itens = [];
  const listaId = "lacunas-" + ++seqLista;
  const datalist = document.createElement("datalist");
  datalist.id = listaId;
  document.body.appendChild(datalist);

  function atualizarLista() {
    const doc = new Set(cm.getValue().match(/[A-Za-z_$][\w$-]{2,}/g) || []);
    datalist.replaceChildren(...[...new Set([...palavrasDoModo(modo), ...doc])].map((w) => {
      const o = document.createElement("option");
      o.value = w;
      return o;
    }));
  }

  function ajustar(input) {
    input.style.width = Math.max(6, input.value.length + 3) + "ch";
  }

  function marcar() {
    itens.forEach((i) => i.mark.clear());
    itens = [];
    const texto = cm.getValue();
    const re = /_{4,}/g;
    let m;
    while ((m = re.exec(texto))) {
      const input = document.createElement("input");
      input.className = "lacuna-campo";
      input.setAttribute("list", listaId);
      input.setAttribute("autocomplete", "off");
      input.setAttribute("autocapitalize", "off");
      input.spellcheck = false;
      input.placeholder = "escreva aqui";
      input.setAttribute("aria-label", "Lacuna " + (itens.length + 1) + ": escreva o que falta");
      ajustar(input);
      const caixa = document.createElement("span");
      caixa.className = "lacuna";
      caixa.contentEditable = "false";
      caixa.appendChild(input);
      // O editor não deve tratar o que é digitado dentro do campo.
      ["keydown", "keypress", "keyup", "input", "beforeinput", "compositionstart", "compositionupdate",
        "compositionend", "paste", "cut", "copy", "mousedown", "touchstart", "dragstart"].forEach((t) =>
        caixa.addEventListener(t, (e) => e.stopPropagation()));
      input.addEventListener("input", () => {
        ajustar(input);
        caixa.classList.toggle("preenchida", !!input.value.trim());
        avisar();
      });
      input.addEventListener("focus", atualizarLista);
      input.addEventListener("keydown", (e) => {
        const i = itens.findIndex((x) => x.input === input);
        if (e.key === "Enter" || (e.key === "Tab" && !e.shiftKey)) {
          e.preventDefault();
          (itens[i + 1]?.input || null)?.focus();
          if (!itens[i + 1]) input.blur();
        } else if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
          itens[i - 1]?.input.focus();
        } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
        }
      });
      const de = cm.posFromIndex(m.index), ate = cm.posFromIndex(m.index + m[0].length);
      const mark = cm.markText(de, ate, { replacedWith: caixa, handleMouseEvents: true, atomic: true });
      itens.push({ mark, input });
    }
  }

  // Texto do código com o que foi escrito em cada lacuna (vazia continua "____").
  function valor() {
    let texto = cm.getValue();
    const trechos = itens
      .map((i) => ({ r: i.mark.find(), v: i.input.value }))
      .filter((x) => x.r)
      .map((x) => ({ de: cm.indexFromPos(x.r.from), ate: cm.indexFromPos(x.r.to), v: x.v }))
      .sort((a, b) => b.de - a.de);
    for (const t of trechos) texto = texto.slice(0, t.de) + (t.v || "____") + texto.slice(t.ate);
    return texto;
  }

  marcar();
  return { marcar, valor };
}
