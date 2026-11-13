// "Python de A a Z": guia completo de Python, na ordem clássica dos tutoriais,
// com explicações próprias em português, perguntas rápidas e exercícios corrigidos no navegador.
import fundamentos from "./fundamentos.js";
import colecoes from "./colecoes.js";
import funcoes from "./funcoes.js";
import poo from "./poo.js";
import dados from "./dados.js";
import referencia from "./referencia.js";

export const CURSO_PYG = {
  id: "pyg",
  base: "pyguia",
  lang: "python",
  titulo: "🐍 Python de A a Z",
  nomeCurto: "Python de A a Z",
  voltar: { href: "#/linguagens", texto: "Linguagens" },
  intro: "Guia completo de Python em português, do <code>print()</code> a classes, arquivos, gráficos com Matplotlib, uma introdução a Machine Learning e bancos de dados. Cada lição tem explicação com exemplos, perguntas rápidas no meio do texto e exercícios de código corrigidos na hora: o Python roda no seu navegador. Abra qualquer tópico direto pelo índice.",
  licoes: [...fundamentos, ...colecoes, ...funcoes, ...poo, ...dados, ...referencia]
};
