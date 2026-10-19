import html from "./html.js";
import css from "./css.js";
import python from "./python.js";
import javascript from "./javascript.js";
import react from "./react.js";
import go from "./go.js";
import csharp from "./csharp.js";
import java from "./java.js";
import sql from "./sql.js";
import mysql from "./mysql.js";
import * as extras from "./extras/index.js";

export const NIVEIS = [
  { id: "basico", nome: "Básico", emoji: "🌱" },
  { id: "intermediario", nome: "Intermediário", emoji: "🌿" },
  { id: "avancado", nome: "Avançado", emoji: "🌳" }
];

// Ordem = da mais fácil de aprender (e de ver resultado) até a mais complexa.
export const LINGUAGENS = [html, css, python, javascript, react, go, csharp, java];
export const BANCOS = [sql, mysql];
export const TRILHAS = [...LINGUAGENS, ...BANCOS];

// IDs estáveis de cada tópico: <trilha>_<b|i|a><n>, ex.: python_b1
// Também junta o conteúdo extra de cada trilha (explicação detalhada,
// código parte por parte e exercícios de fixação), que fica em ./extras/.
for (const t of TRILHAS) {
  const extra = extras[t.id] || {};
  for (const n of NIVEIS) {
    t.niveis[n.id].topicos.forEach((tp, i) => {
      const chave = `${n.id[0]}${i + 1}`;
      tp.id = `${t.id}_${chave}`;
      Object.assign(tp, extra.topicos?.[chave]);
    });
    t.niveis[n.id].fixacao = extra.fixacao?.[n.id] || [];
  }
}
