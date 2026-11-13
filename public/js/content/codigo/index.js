// Exercícios de código por tópico: "completar" (preencher as lacunas ____) e "criar" (do zero).
// Cada arquivo de trilha exporta { b1: [ex, ...], i2: [...], ... } com as chaves dos tópicos.
import { TRILHAS, NIVEIS } from "../index.js";
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
import { CURSO_PYG } from "../pyguia/index.js";

const POR_TRILHA = { html, css, python, javascript, react, go, csharp, java, cpp, sql, mysql };

// id do exercício: <topicoId>_<n>, ex.: python_b1_3
export const EXERCICIOS_CODIGO = {};
export const CODIGO_POR_TOPICO = {};

for (const t of TRILHAS) {
  for (const n of NIVEIS) {
    for (const tp of t.niveis[n.id].topicos) {
      const local = tp.id.slice(t.id.length + 1);
      const lista = POR_TRILHA[t.id]?.[local] || [];
      CODIGO_POR_TOPICO[tp.id] = lista.map((ex, i) => {
        const id = `${tp.id}_${i + 1}`;
        EXERCICIOS_CODIGO[id] = { ...ex, id, n: i + 1, trilha: t, nivel: n, topico: tp };
        return id;
      });
    }
  }
}

// Exercícios dos guias "de A a Z": id <curso>_<lição>_<n>, ex.: pyg_strings_2
for (const curso of [CURSO_PYG]) {
  for (const licao of curso.licoes) {
    const topico = { id: `${curso.id}_${licao.id}`, titulo: licao.titulo };
    CODIGO_POR_TOPICO[topico.id] = (licao.exercicios || []).map((ex, i) => {
      const id = `${topico.id}_${i + 1}`;
      EXERCICIOS_CODIGO[id] = { ...ex, id, n: i + 1, topico, guia: { curso, licao } };
      return id;
    });
  }
}

export const TOTAL_CODIGO = Object.keys(EXERCICIOS_CODIGO).length;
export const chaveCodigo = (id) => "cx_" + id;

// Exercício seguinte do mesmo tópico (ou null)
export function proximoCodigo(id) {
  const ex = EXERCICIOS_CODIGO[id];
  const lista = CODIGO_POR_TOPICO[ex?.topico.id] || [];
  return lista[lista.indexOf(id) + 1] || null;
}
