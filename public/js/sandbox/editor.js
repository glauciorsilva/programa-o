// Editor de código (CodeMirror 5), com textarea simples como plano B se o CDN falhar.
import { carregarScript, carregarCss } from "./executor.js";

const CM = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";
let cmPronto = null;

function carregarCodeMirror() {
  cmPronto ||= (async () => {
    carregarCss(CM + "codemirror.min.css");
    carregarCss(CM + "theme/material-darker.min.css");
    await carregarScript(CM + "codemirror.min.js");
    await Promise.all([
      "mode/xml/xml.min.js", "mode/javascript/javascript.min.js", "mode/css/css.min.js",
      "mode/python/python.min.js", "mode/sql/sql.min.js", "mode/go/go.min.js",
      "mode/clike/clike.min.js", "addon/edit/closebrackets.min.js", "addon/edit/matchbrackets.min.js",
      "addon/comment/comment.min.js"
    ].map((f) => carregarScript(CM + f)));
    await Promise.all(["mode/htmlmixed/htmlmixed.min.js", "mode/jsx/jsx.min.js"].map((f) => carregarScript(CM + f)));
  })();
  return cmPronto;
}

/**
 * Cria um editor dentro de `el`. Retorna { getValue, setValue, refresh, focus, onChange }.
 */
export async function criarEditor(el, { valor = "", modo = "javascript", onExecutar } = {}) {
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
        Tab: (c) => (c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection(c.getOption("indentWithTabs") ? "\t" : " ".repeat(c.getOption("indentUnit")), "end"))
      }
    });
    cm.on("change", () => escutas.forEach((f) => f()));
    return {
      getValue: () => cm.getValue(),
      setValue: (v) => cm.setValue(v),
      refresh: () => cm.refresh(),
      focus: () => cm.focus(),
      onChange: (f) => escutas.push(f)
    };
  } catch {
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
      onChange: (f) => escutas.push(f)
    };
  }
}
