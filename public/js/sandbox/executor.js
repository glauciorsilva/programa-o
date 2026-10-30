// Executa o código do aluno de forma isolada.
// - JS/TS/Python/SQL: iframe oculto "runner.html" (sandbox, origem opaca) + Web Workers com limite de tempo.
// - HTML/CSS/JS e React: iframe de pré-visualização (sandbox) montado com srcdoc.
import { LANGS, ARQUIVOS_PYTHON, SEED_SQL } from "./langs.js";

const BABEL = "https://cdn.jsdelivr.net/npm/@babel/standalone@7.26.4/babel.min.js";
const IMPORT_MAP = {
  imports: {
    "react": "https://esm.sh/react@18.3.1",
    "react/": "https://esm.sh/react@18.3.1/",
    "react-dom": "https://esm.sh/react-dom@18.3.1",
    "react-dom/": "https://esm.sh/react-dom@18.3.1/",
    "react-router-dom": "https://esm.sh/react-router-dom@6.28.0?deps=react@18.3.1,react-dom@18.3.1"
  }
};

const scripts = {};
export function carregarScript(url) {
  scripts[url] ||= new Promise((ok, falha) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = ok;
    s.onerror = () => { delete scripts[url]; falha(new Error("Falha ao carregar " + url)); };
    document.head.appendChild(s);
  });
  return scripts[url];
}

export function carregarCss(url) {
  if (document.querySelector(`link[href="${url}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = url;
  document.head.appendChild(l);
}

/* ---------- canal de mensagens ---------- */

let seq = 0;
const ouvintes = new Map();
window.addEventListener("message", (ev) => {
  const d = ev.data;
  if (!d || typeof d !== "object") return;
  const id = d.__runner ? d.id : d.__sbx;
  if (id != null && ouvintes.has(id)) ouvintes.get(id)(d);
});

/* ---------- runner (JS/TS/Python/SQL) ---------- */

let runnerPronto = null;
let runnerFrame = null;

function obterRunner() {
  if (runnerPronto) return runnerPronto;
  runnerPronto = new Promise((ok) => {
    const f = document.createElement("iframe");
    f.setAttribute("sandbox", "allow-scripts");
    f.setAttribute("aria-hidden", "true");
    f.tabIndex = -1;
    f.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
    const h = (ev) => {
      if (ev.source === f.contentWindow && ev.data?.tipo === "runner-pronto") {
        window.removeEventListener("message", h);
        ok(f);
      }
    };
    window.addEventListener("message", h);
    f.src = "sandbox/runner.html";
    document.body.appendChild(f);
    runnerFrame = f;
  });
  return runnerPronto;
}

async function transpilarTS(codigo) {
  await carregarScript(BABEL);
  return window.Babel.transform(codigo, { presets: ["typescript"], filename: "main.ts" }).code;
}

/**
 * Executa código. onEvento recebe {tipo: 'log'|'erro'|'aviso'|'status'|'tabelas'|'teste'|'fim', ...}.
 * Retorna uma Promise resolvida no evento 'fim' (ou, na pré-visualização, após o teste/carga).
 */
export async function executar(opts, onEvento, frameHost) {
  const cfg = LANGS[opts.lang];
  if (cfg.tipo === "web" || cfg.tipo === "react") return executarPreview(opts, onEvento, frameHost);

  let codigo = opts.codigo;
  let teste = opts.teste;
  if (opts.lang === "ts") {
    try {
      codigo = await transpilarTS(codigo);
    } catch (e) {
      onEvento({ tipo: "erro", texto: "Erro de sintaxe TypeScript: " + e.message.replace(/^.*?main\.ts: /, "") });
      onEvento({ tipo: "fim", ok: false });
      return;
    }
  }
  const frame = await obterRunner();
  const id = ++seq;
  return new Promise((resolve) => {
    ouvintes.set(id, (d) => {
      onEvento(d);
      if (d.tipo === "fim") {
        ouvintes.delete(id);
        resolve(d);
      }
    });
    frame.contentWindow.postMessage({
      acao: "executar", id, lang: cfg.runner, codigo, teste, entrada: opts.entrada,
      arquivos: cfg.runner === "python" ? { ...ARQUIVOS_PYTHON, ...opts.arquivos } : undefined,
      graficos: !!opts.graficos,
      seed: cfg.runner === "sql" ? SEED_SQL : undefined,
      db: opts.db, solucao: opts.solucao, verificacao: opts.verificacao, ordem: opts.ordem
    }, "*");
  });
}

/* ---------- pré-visualização (HTML/CSS/JS e React) ---------- */

const ponte = (id) => `<script>(function(){
var ID=${id};
function fmt(v){if(typeof v==="string")return v;if(v instanceof Error)return v.name+": "+v.message;if(v===undefined)return "undefined";if(v instanceof Element)return "<"+v.tagName.toLowerCase()+">";try{return JSON.stringify(v)}catch(e){return String(v)}}
function enviar(tipo,args){parent.postMessage({__sbx:ID,tipo:tipo,texto:Array.prototype.map.call(args,fmt).join(" ")},"*")}
["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){enviar(k==="error"?"erro":k==="warn"?"aviso":"log",arguments);o.apply(console,arguments)}});
addEventListener("error",function(e){enviar("erro",[e.message+(e.lineno?" (linha "+e.lineno+")":"")])});
addEventListener("unhandledrejection",function(e){enviar("erro",["Promise rejeitada: "+fmt(e.reason)])});
addEventListener("submit",function(e){if(e.target&&e.target.method==="dialog")return;e.preventDefault();enviar("aviso",["Formulário enviado (no sandbox o envio é simulado)."])},true);
window.__assert=function(c,m){if(!c)throw new Error(m||"verificação falhou")};
window.__esperar=function(ms){return new Promise(function(r){setTimeout(r,ms||50)})};
window.__css=function(sel,prop){var el=document.querySelector(sel);if(!el)throw new Error("Não encontrei o elemento "+sel);return getComputedStyle(el)[prop]};
window.__botao=function(){var t=[].slice.call(arguments);return [].slice.call(document.querySelectorAll("button")).find(function(b){return t.indexOf(b.textContent.trim())>=0})};
window.__digitar=function(el,valor){var p=el.tagName==="TEXTAREA"?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(p,"value").set.call(el,valor);el.dispatchEvent(new Event("input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true}))};
window.__texto=function(){return document.body.innerText};
window.__rodarTeste=async function(fn){try{await fn();parent.postMessage({__sbx:ID,tipo:"teste",ok:true},"*")}catch(e){parent.postMessage({__sbx:ID,tipo:"teste",ok:false,msg:e.message},"*")}};
})();<\/script>`;

const semFimScript = (s) => String(s || "").replace(/<\/script/gi, "<\\/script");

function scriptTeste(teste, atraso) {
  if (!teste) return "";
  return `<script>addEventListener("load",function(){setTimeout(function(){__rodarTeste(async function(){${semFimScript(teste)}\n})},${atraso})});<\/script>`;
}

function montarWeb({ html = "", css = "", js = "" }, id, teste) {
  const cabeca = `${ponte(id)}<style>${css}</style>`;
  const fim = `${js.trim() ? `<script>${semFimScript(js)}\n<\/script>` : ""}${scriptTeste(teste, 150)}`;
  if (/<html[\s>]/i.test(html) || /<head[\s>]/i.test(html)) {
    let doc = html;
    doc = /<head[^>]*>/i.test(doc) ? doc.replace(/<head[^>]*>/i, (m) => m + cabeca) : doc.replace(/<html[^>]*>/i, (m) => m + "<head>" + cabeca + "</head>");
    doc = /<\/body>/i.test(doc) ? doc.replace(/<\/body>/i, fim + "</body>") : doc + fim;
    return doc;
  }
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${cabeca}</head><body>${html}${fim}</body></html>`;
}

// Plugin Babel: troca "export default X" por window.__App = X (para montar o componente).
function pluginExport({ types: t }) {
  const atribuir = (expr) => t.expressionStatement(
    t.assignmentExpression("=", t.memberExpression(t.identifier("window"), t.identifier("__App")), expr));
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        const d = path.node.declaration;
        if ((t.isFunctionDeclaration(d) || t.isClassDeclaration(d)) && d.id) {
          path.replaceWithMultiple([d, atribuir(t.identifier(d.id.name))]);
        } else if (t.isFunctionDeclaration(d)) {
          path.replaceWith(atribuir(t.functionExpression(null, d.params, d.body, d.generator, d.async)));
        } else if (t.isClassDeclaration(d)) {
          path.replaceWith(atribuir(t.classExpression(null, d.superClass, d.body, d.decorators || [])));
        } else {
          path.replaceWith(atribuir(d));
        }
      },
      ExportNamedDeclaration(path) {
        if (path.node.declaration) path.replaceWith(path.node.declaration);
        else path.remove();
      }
    }
  };
}

async function montarReact(codigo, id, teste) {
  await carregarScript(BABEL);
  const compilado = window.Babel.transform(codigo, {
    presets: [["react", { runtime: "automatic" }]],
    plugins: [pluginExport],
    filename: "App.jsx"
  }).code;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<script type="importmap">${JSON.stringify(IMPORT_MAP)}<\/script>
${ponte(id)}
<style>body{font-family:system-ui,sans-serif;padding:12px;line-height:1.5}button{cursor:pointer}</style></head>
<body><div id="root"></div>
<script type="module">
${semFimScript(compilado)}
import { createRoot as __createRoot } from "react-dom/client";
import { jsx as __jsx } from "react/jsx-runtime";
if (window.__App) __createRoot(document.getElementById("root")).render(__jsx(window.__App, {}));
else console.warn("Nenhum componente com 'export default' para mostrar na tela.");
<\/script>
${scriptTeste(teste, 600)}
</body></html>`;
}

let previewAnterior = null;

async function executarPreview(opts, onEvento, frameHost) {
  const id = ++seq;
  let doc;
  try {
    doc = opts.lang === "react"
      ? await montarReact(opts.codigo, id, opts.teste)
      : montarWeb(opts.codigo, id, opts.teste);
  } catch (e) {
    onEvento({ tipo: "erro", texto: "Erro de sintaxe: " + e.message.replace(/^.*?App\.jsx: /, "") });
    onEvento({ tipo: "fim", ok: false });
    return;
  }

  // Um iframe novo a cada execução (zera o estado anterior)
  const frame = document.createElement("iframe");
  frame.setAttribute("sandbox", "allow-scripts allow-modals allow-forms");
  frame.title = "Pré-visualização";
  frame.className = "sbx-preview";
  frameHost.replaceChildren(frame);

  if (previewAnterior) ouvintes.delete(previewAnterior);
  previewAnterior = id;

  return new Promise((resolve) => {
    let encerrado = false;
    const terminar = (ok) => {
      if (encerrado) return;
      encerrado = true;
      onEvento({ tipo: "fim", ok });
      resolve({ ok });
    };
    ouvintes.set(id, (d) => {
      if (d.tipo === "teste") {
        onEvento(d);
        terminar(true);
      } else {
        onEvento(d);
      }
    });
    frame.addEventListener("load", () => {
      if (!opts.teste) setTimeout(() => terminar(true), opts.lang === "react" ? 800 : 100);
    }, { once: true });
    // limite para o teste responder (ex.: a página travou)
    setTimeout(() => {
      if (!encerrado && opts.teste) {
        onEvento({ tipo: "teste", ok: false, msg: "A página demorou demais para responder (loop infinito ou erro de carregamento?)." });
        terminar(false);
      } else terminar(true);
    }, 15000);
    frame.srcdoc = doc;
  });
}

export function precarregar(lang) {
  const cfg = LANGS[lang];
  if (cfg?.tipo === "runner") obterRunner();
  if (lang === "react" || lang === "ts") carregarScript(BABEL).catch(() => {});
}

