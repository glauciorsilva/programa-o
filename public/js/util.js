import { TRILHAS, NIVEIS } from "./content/index.js";
import { LICOES as LICOES_SQLP, chaveLicao } from "./content/sqlpratica.js";
import { TOTAL_CODIGO } from "./content/codigo/index.js";
import { EXERCICIOS } from "./content/exercicios.js";

export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Texto simples com `crases` → código destacado (usado em exercícios e explicações)
export function fmt(txt) {
  return esc(txt).replace(/`([^`]+)`/g, "<code>$1</code>");
}

const pad = (n) => String(n).padStart(2, "0");

// 3725 -> "01:02:05"
export function clock(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  return `${pad(Math.floor(sec / 3600))}:${pad(Math.floor((sec % 3600) / 60))}:${pad(sec % 60)}`;
}

// 3725 -> "1h 02min"
export function human(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h === 0 && m === 0) return `${sec % 60}s`;
  if (h === 0) return `${m}min`;
  return `${h}h ${pad(m)}min`;
}

export function dayKey(date = new Date()) {
  return `d${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

export function toDate(ts) {
  if (!ts) return null;
  if (ts instanceof Date) return ts;
  if (typeof ts.toDate === "function") return ts.toDate();
  if (typeof ts.seconds === "number") return new Date(ts.seconds * 1000);
  return null;
}

export function fmtDate(ts, withTime = true) {
  const d = toDate(ts);
  if (!d) return "—";
  return d.toLocaleString("pt-BR", withTime
    ? { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
    : { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function stars(n, max = 5) {
  return "★".repeat(n) + "☆".repeat(max - n);
}

export function topicosDa(trilha) {
  return NIVEIS.flatMap((n) => trilha.niveis[n.id].topicos);
}

export const TOTAL_TOPICOS = TRILHAS.reduce((s, t) => s + topicosDa(t).length, 0);

// Progresso de um aluno em cada trilha.
export function progressoPorTrilha(progress = {}) {
  return TRILHAS.map((t) => {
    const lista = topicosDa(t);
    const feitos = lista.filter((tp) => progress[tp.id]).length;
    return { trilha: t, feitos, total: lista.length, pct: Math.round((feitos / lista.length) * 100) };
  });
}

export const TOTAL_EXERCICIOS = Object.keys(EXERCICIOS).length;

export function progressoExercicios(progress = {}) {
  const feitos = Object.keys(progress).filter((k) => k.startsWith("ex_")).length;
  return { feitos, total: TOTAL_EXERCICIOS, pct: Math.round((feitos / TOTAL_EXERCICIOS) * 100) };
}

// Soma do melhor resultado de cada bloco de fixação (10 questões por nível)
export function resumoFixacao(fixacao = {}) {
  const total = TRILHAS.reduce((s, t) => s + NIVEIS.reduce((x, n) => x + t.niveis[n.id].fixacao.length, 0), 0);
  const acertos = Object.values(fixacao || {}).reduce((s, f) => s + (f?.melhor || 0), 0);
  return { acertos, total, pct: total ? Math.round((acertos / total) * 100) : 0 };
}

// Exercícios de código dos tópicos (chaves cx_<id>)
export function progressoCodigo(progress = {}) {
  const feitos = Object.keys(progress).filter((k) => k.startsWith("cx_")).length;
  return { feitos, total: TOTAL_CODIGO, pct: TOTAL_CODIGO ? Math.round((feitos / TOTAL_CODIGO) * 100) : 0 };
}

// Lições concluídas na trilha interativa "SQL na Prática"
export function progressoSQLP(progress = {}) {
  const feitos = LICOES_SQLP.filter((l) => progress[chaveLicao(l.id)]).length;
  return { feitos, total: LICOES_SQLP.length, pct: Math.round((feitos / LICOES_SQLP.length) * 100) };
}

export function progressoGeral(progress = {}) {
  const feitos = Object.keys(progress).filter((k) => TRILHAS.some((t) => k.startsWith(t.id + "_"))).length;
  return { feitos, total: TOTAL_TOPICOS, pct: Math.round((feitos / TOTAL_TOPICOS) * 100) };
}

// Últimos N dias de estudo (segundos por dia), do mais antigo ao mais recente.
export function serieDiaria(daily = {}, dias = 14) {
  const out = [];
  for (let i = dias - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ date: d, seconds: daily[dayKey(d)] || 0 });
  }
  return out;
}

export function barChart(serie) {
  const max = Math.max(60, ...serie.map((s) => s.seconds));
  return `<div class="chart" role="img" aria-label="Tempo de estudo por dia">
    ${serie.map((s) => {
      const label = s.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
      return `<div class="chart-col" title="${label}: ${human(s.seconds)}">
        <div class="chart-bar" style="height:${Math.round((s.seconds / max) * 100)}%"></div>
        <span>${label.slice(0, 2)}</span>
      </div>`;
    }).join("")}
  </div>`;
}

export function progressBar(pct, small = false) {
  return `<div class="progress${small ? " small" : ""}" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
    <div style="width:${pct}%"></div>
  </div>`;
}
