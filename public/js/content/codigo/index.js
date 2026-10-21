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
import sql from "./sql.js";
import mysql from "./mysql.js";

const POR_TRILHA = { html, css, python, javascript, react, go, csharp, java, sql, mysql };

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

export const TOTAL_CODIGO = Object.keys(EXERCICIOS_CODIGO).length;
export const chaveCodigo = (id) => "cx_" + id;

// Exercício seguinte do mesmo tópico (ou null)
export function proximoCodigo(id) {
  const ex = EXERCICIOS_CODIGO[id];
  const lista = CODIGO_POR_TOPICO[ex?.topico.id] || [];
  return lista[lista.indexOf(id) + 1] || null;
}
