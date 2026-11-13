// Atalhos para escrever as lições do "Python de A a Z".
export { m, vf, l } from "../extras/q.js";
export const c = String.raw;

/** Exercício "completar" (lacunas ____). */
export const comp = (titulo, enunciado, dica, inicial, solucao, teste, extra = {}) =>
  ({ tipo: "completar", titulo, enunciado, dica, lang: "python", inicial, solucao, teste, ...extra });

/** Exercício "criar do zero". */
export const criar = (titulo, enunciado, dica, inicial, solucao, teste, extra = {}) =>
  ({ tipo: "criar", titulo, enunciado, dica, lang: "python", inicial, solucao, teste, ...extra });
