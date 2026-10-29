// Pontuação: cada atividade concluída vale pontos. Os pontos são calculados a partir
// do progresso salvo (não há um contador separado que possa ficar fora de sincronia).
import { EXERCICIOS_CODIGO } from "./content/codigo/index.js";

export const REGRAS = [
  { id: "topico", nome: "Tópico concluído", pts: 10, icone: "📖" },
  { id: "pratica", nome: "Parada para praticar acertada", pts: 2, icone: "✋" },
  { id: "fixacao", nome: "Acerto nos exercícios de fixação", pts: 3, icone: "✍️" },
  { id: "completar", nome: "Exercício de código — completar", pts: 10, icone: "✏️" },
  { id: "criar", nome: "Exercício de código — do zero", pts: 15, icone: "🛠️" },
  { id: "pratico", nome: "Exercício prático do nível", pts: 25, icone: "🏋️" },
  { id: "sqlp", nome: "Lição do SQL na Prática", pts: 10, icone: "🧩" }
];
export const PTS = Object.fromEntries(REGRAS.map((r) => [r.id, r.pts]));

export const PATENTES = [
  { min: 0, nome: "Semente", icone: "🌱" },
  { min: 100, nome: "Broto", icone: "🌿" },
  { min: 300, nome: "Aprendiz", icone: "📘" },
  { min: 700, nome: "Praticante", icone: "🛠️" },
  { min: 1500, nome: "Desenvolvedor(a)", icone: "💻" },
  { min: 3000, nome: "Especialista", icone: "🚀" },
  { min: 6000, nome: "Mestre", icone: "🏆" }
];

export const ptsCodigo = (id) => (EXERCICIOS_CODIGO[id]?.tipo === "completar" ? PTS.completar : PTS.criar);

// Conta as atividades de um aluno e soma os pontos.
export function calcularPontos(progress = {}, fixacao = {}) {
  const qtd = Object.fromEntries(REGRAS.map((r) => [r.id, 0]));
  let codigo = 0;
  for (const k of Object.keys(progress || {})) {
    if (k.startsWith("ck_")) qtd.pratica++;
    else if (k.startsWith("cx_")) {
      const id = k.slice(3);
      if (EXERCICIOS_CODIGO[id]?.tipo === "completar") qtd.completar++;
      else qtd.criar++;
    } else if (k.startsWith("ex_")) qtd.pratico++;
    else if (k.startsWith("sqlp_")) qtd.sqlp++;
    else qtd.topico++;
  }
  for (const f of Object.values(fixacao || {})) qtd.fixacao += f?.melhor || 0;
  const partes = REGRAS.map((r) => ({ ...r, qtd: qtd[r.id], total: qtd[r.id] * r.pts }));
  return { total: partes.reduce((s, p) => s + p.total, 0), partes, codigo };
}

export function patente(total) {
  let i = PATENTES.length - 1;
  while (i > 0 && total < PATENTES[i].min) i--;
  const atual = PATENTES[i], prox = PATENTES[i + 1] || null;
  const pct = prox ? Math.round(((total - atual.min) / (prox.min - atual.min)) * 100) : 100;
  return { atual, prox, pct, faltam: prox ? prox.min - total : 0 };
}

export const fmtPts = (n) => Number(n || 0).toLocaleString("pt-BR");
