import html from "./html.js";
import css from "./css.js";
import python from "./python.js";
import javascript from "./javascript.js";
import react from "./react.js";
import go from "./go.js";
import csharp from "./csharp.js";
import java from "./java.js";
import cpp from "./cpp.js";
import sql from "./sql.js";
import mysql from "./mysql.js";
import * as extras from "./extras/index.js";
import * as iniciante from "./iniciante/index.js";

// "pre" é a letra usada no id dos tópicos (ex.: python_p1 = Iniciante, tópico 1)
export const NIVEIS = [
  { id: "iniciante", nome: "Iniciante", emoji: "🐣", pre: "p" },
  { id: "basico", nome: "Básico", emoji: "🌱" },
  { id: "intermediario", nome: "Intermediário", emoji: "🌿" },
  { id: "avancado", nome: "Avançado", emoji: "🌳" }
];

// Ordem = da mais fácil de aprender (e de ver resultado) até a mais complexa.
export const LINGUAGENS = [html, css, python, javascript, react, go, csharp, java, cpp];
export const BANCOS = [sql, mysql];
export const TRILHAS = [...LINGUAGENS, ...BANCOS];

// IDs estáveis de cada tópico: <trilha>_<p|b|i|a><n>, ex.: python_b1
// Também junta o conteúdo extra de cada trilha (explicação detalhada,
// código parte por parte e exercícios de fixação), que fica em ./extras/,
// e o nível Iniciante + as paradas para praticar, que ficam em ./iniciante/.
for (const t of TRILHAS) {
  const extra = extras[t.id] || {};
  const ini = iniciante[t.id] || {};
  t.niveis.iniciante = {
    objetivo: ini.objetivo || "dar os primeiros passos, sem pressa.",
    topicos: ini.topicos || []
  };
  for (const n of NIVEIS) {
    t.niveis[n.id].topicos.forEach((tp, i) => {
      const chave = `${n.pre || n.id[0]}${i + 1}`;
      tp.id = `${t.id}_${chave}`;
      Object.assign(tp, extra.topicos?.[chave]);
      // Paradas para praticar no meio da explicação (tópicos dos outros níveis)
      if (ini.checkpoints?.[chave]) tp.pratica = ini.checkpoints[chave];
      // HTML: lembrete das configurações correspondentes no CSS
      if (ini.css?.[chave]) tp.noCss = ini.css[chave];
    });
    t.niveis[n.id].fixacao = n.id === "iniciante" ? ini.fixacao || [] : extra.fixacao?.[n.id] || [];
  }
}
