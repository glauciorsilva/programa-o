// "SQL de A a Z": guia completo de SQL, do SELECT às views, com exercícios corrigidos
// num banco SQLite que roda no navegador (mesmo motor do "SQL na Prática").
import { SEED_LOJA } from "./banco.js";
import consultas from "./consultas.js";
import estrutura from "./estrutura.js";

export const LICOES_SQLG = [...consultas, ...estrutura];
export const SEEDS_SQLG = { loja: SEED_LOJA };
export const chaveSQLG = (id) => "sqlg_" + id;

export const CURSO_SQLG = {
  id: "sqlg",
  base: "sqlguia",
  titulo: "📘 SQL de A a Z",
  nomeCurto: "SQL de A a Z",
  voltar: { href: "#/bancos", texto: "Bancos de Dados" },
  intro: "Guia completo de SQL em português, na ordem clássica dos tutoriais: do <code>SELECT</code> aos <code>JOIN</code>s, funções, criação de tabelas, restrições, índices, views e segurança. Cada lição tem explicação, exemplos e tarefas corrigidas na hora num banco de dados de verdade (SQLite) rodando no seu navegador. O guia é <b>livre</b>: abra qualquer tópico direto pelo índice.",
  livre: true,
  licoes: LICOES_SQLG,
  seeds: SEEDS_SQLG,
  chave: chaveSQLG
};
