import { db } from "./firebase.js";
import {
  collection, getDocs, doc, getDoc, query, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  $, esc, human, fmtDate, toDate, progressoGeral, progressoPorTrilha, serieDiaria, barChart, progressBar,
  progressoExercicios, resumoFixacao, progressoSQLP, progressoCodigo
} from "./util.js";
import { EXERCICIOS } from "./content/exercicios.js";
import { calcularPontos, patente, fmtPts } from "./pontos.js";
import { TRILHAS, NIVEIS } from "./content/index.js";

let cache = null;

async function carregarAlunos(force = false) {
  if (cache && !force) return cache;
  const snap = await getDocs(collection(db, "users"));
  cache = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
  return cache;
}

export async function renderAdmin(view, uid) {
  view.innerHTML = `<h1>🛡️ Admin / TI</h1><p class="muted">Carregando dados…</p>`;
  try {
    if (uid) await renderAluno(view, uid);
    else await renderLista(view);
  } catch (e) {
    console.error(e);
    view.innerHTML = `<h1>🛡️ Admin / TI</h1>
      <div class="banner warn">Não foi possível ler os dados (${esc(e.code || e.message)}).
      Confira se as regras do Firestore foram publicadas (<code>firebase deploy --only firestore:rules</code>)
      e se o seu e-mail está verificado.</div>`;
  }
}

async function renderLista(view, force = false) {
  const alunos = await carregarAlunos(force);
  const seteDias = Date.now() - 7 * 864e5;
  const ativos = alunos.filter((a) => (toDate(a.lastAccess)?.getTime() || 0) >= seteDias).length;
  const horas = alunos.reduce((s, a) => s + (a.totalSeconds || 0), 0);
  const topicos = alunos.reduce((s, a) => s + progressoGeral(a.progress).feitos, 0);
  const media = alunos.length
    ? Math.round(alunos.reduce((s, a) => s + progressoGeral(a.progress).pct, 0) / alunos.length) : 0;

  view.innerHTML = `
    <div class="admin-head">
      <h1>🛡️ Admin / TI</h1>
      <div class="admin-actions">
        <button class="btn ghost tiny" id="refresh">↻ Atualizar</button>
        <button class="btn ghost tiny" id="csv">⬇ Exportar CSV</button>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat"><small>Alunos cadastrados</small><strong>${alunos.length}</strong></div>
      <div class="stat"><small>Ativos (7 dias)</small><strong>${ativos}</strong></div>
      <div class="stat"><small>Tempo total de estudo</small><strong>${human(horas)}</strong></div>
      <div class="stat"><small>Tópicos concluídos</small><strong>${topicos}</strong><small>média ${media}% por aluno</small></div>
    </div>
    <div class="toolbar">
      <input type="search" id="filtro" placeholder="Buscar por nome ou e-mail…" aria-label="Buscar aluno">
      <select id="ordem" aria-label="Ordenar">
        <option value="lastAccess">Último acesso</option>
        <option value="totalSeconds">Tempo de estudo</option>
        <option value="pontos">Pontuação</option>
        <option value="progress">Progresso</option>
        <option value="createdAt">Data de cadastro</option>
        <option value="name">Nome</option>
      </select>
    </div>
    <div class="table-wrap"><table class="table">
      <thead><tr>
        <th>Aluno</th><th>Pontos</th><th>Cadastro</th><th>Último acesso</th><th>Tempo total</th><th>Sessões</th><th>Exercícios</th><th>Código</th><th>Fixação</th><th>SQL na Prática</th><th>Progresso</th><th></th>
      </tr></thead>
      <tbody id="tbody"></tbody>
    </table></div>`;

  const desenhar = () => {
    const f = $("#filtro").value.trim().toLowerCase();
    const ord = $("#ordem").value;
    const chave = {
      lastAccess: (a) => toDate(a.lastAccess)?.getTime() || 0,
      createdAt: (a) => toDate(a.createdAt)?.getTime() || 0,
      totalSeconds: (a) => a.totalSeconds || 0,
      progress: (a) => progressoGeral(a.progress).feitos,
      pontos: (a) => calcularPontos(a.progress, a.fixacao).total,
      name: (a) => (a.name || "").toLowerCase()
    }[ord];
    const lista = alunos
      .filter((a) => !f || (a.name || "").toLowerCase().includes(f) || (a.email || "").toLowerCase().includes(f))
      .sort((x, y) => ord === "name" ? chave(x).localeCompare(chave(y)) : chave(y) - chave(x));
    $("#tbody").innerHTML = lista.map((a) => {
      const g = progressoGeral(a.progress);
      return `<tr>
        <td data-label="Aluno"><strong>${esc(a.name)}</strong><br><small class="muted">${esc(a.email)}</small></td>
        <td data-label="Pontos"><b>⭐ ${fmtPts(calcularPontos(a.progress, a.fixacao).total)}</b><br><small class="muted">${patente(calcularPontos(a.progress, a.fixacao).total).atual.nome}</small></td>
        <td data-label="Cadastro">${fmtDate(a.createdAt, false)}</td>
        <td data-label="Último acesso">${fmtDate(a.lastAccess)}</td>
        <td data-label="Tempo total">${human(a.totalSeconds)}</td>
        <td data-label="Sessões">${a.sessionsCount || 0}</td>
        <td data-label="Exercícios">${progressoExercicios(a.progress).feitos}/${progressoExercicios(a.progress).total}</td>
        <td data-label="Código">${progressoCodigo(a.progress).feitos}/${progressoCodigo(a.progress).total}</td>
        <td data-label="Fixação">${resumoFixacao(a.fixacao).pct}%</td>
        <td data-label="SQL na Prática">${progressoSQLP(a.progress).feitos}/${progressoSQLP(a.progress).total}</td>
        <td data-label="Progresso"><div class="cell-progress">${progressBar(g.pct, true)}<small>${g.feitos}/${g.total} (${g.pct}%)</small></div></td>
        <td><a class="btn tiny primary" href="#/admin/${a.uid}">Ver evolução</a></td>
      </tr>`;
    }).join("") || `<tr><td colspan="12" class="muted">Nenhum aluno encontrado.</td></tr>`;
  };
  $("#filtro").addEventListener("input", desenhar);
  $("#ordem").addEventListener("change", desenhar);
  $("#refresh").addEventListener("click", () => renderLista(view, true));
  $("#csv").addEventListener("click", () => exportarCSV(alunos));
  desenhar();
}

async function renderAluno(view, uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    view.innerHTML = `<a class="back" href="#/admin">← Voltar</a><p>Aluno não encontrado.</p>`;
    return;
  }
  const a = snap.data();
  const sessSnap = await getDocs(query(collection(db, "users", uid, "sessions"), orderBy("start", "desc"), limit(30)));
  const sessoes = sessSnap.docs.map((d) => d.data());
  const codSnap = await getDocs(collection(db, "users", uid, "codigos"));
  const codigos = Object.fromEntries(codSnap.docs.map((d) => [d.id, d.data()]));
  const ex = progressoExercicios(a.progress);
  const g = progressoGeral(a.progress);

  view.innerHTML = `
    <a class="back" href="#/admin">← Todos os alunos</a>
    <h1>${esc(a.name)}</h1>
    <p class="muted">${esc(a.email)} · cadastrado em ${fmtDate(a.createdAt, false)}</p>
    <div class="stat-row">
      <div class="stat"><small>Progresso geral</small><strong>${g.pct}%</strong>${progressBar(g.pct, true)}</div>
      <div class="stat"><small>Tópicos concluídos</small><strong>${g.feitos}/${g.total}</strong></div>
      <div class="stat"><small>Tempo total</small><strong>${human(a.totalSeconds)}</strong></div>
      <div class="stat"><small>Exercícios resolvidos</small><strong>${ex.feitos}/${ex.total}</strong></div>
      <div class="stat"><small>Pontuação</small><strong>⭐ ${fmtPts(calcularPontos(a.progress, a.fixacao).total)}</strong><small>${patente(calcularPontos(a.progress, a.fixacao).total).atual.icone} ${patente(calcularPontos(a.progress, a.fixacao).total).atual.nome}</small></div>
      <div class="stat"><small>Exercícios de código</small><strong>${progressoCodigo(a.progress).feitos}/${progressoCodigo(a.progress).total}</strong></div>
      <div class="stat"><small>SQL na Prática</small><strong>${progressoSQLP(a.progress).feitos}/${progressoSQLP(a.progress).total} lições</strong></div>
      <div class="stat"><small>Último acesso</small><strong class="smaller">${fmtDate(a.lastAccess)}</strong></div>
    </div>
    <section class="box">
      <h2>Tempo de estudo — últimos 30 dias</h2>
      ${barChart(serieDiaria(a.daily, 30))}
    </section>
    <section class="box">
      <h2>Evolução por trilha</h2>
      <div class="track-progress">
        ${progressoPorTrilha(a.progress).map((p) => `
          <div class="tp-row">
            <span>${p.trilha.icone} ${esc(p.trilha.nome)}</span>
            ${progressBar(p.pct, true)}
            <small>${p.feitos}/${p.total}</small>
          </div>`).join("")}
      </div>
    </section>
    <section class="box">
      <h2>Exercícios de fixação</h2>
      <p class="muted small">Melhor resultado do aluno em cada nível (10 questões por nível).</p>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>Trilha</th>${NIVEIS.map((n) => `<th>${n.nome}</th>`).join("")}</tr></thead>
        <tbody>${TRILHAS.map((t) => `<tr><td data-label="Trilha">${t.icone} ${esc(t.nome)}</td>${NIVEIS.map((n) => {
          const f = a.fixacao?.[`${t.id}_${n.id}`];
          return `<td data-label="${n.nome}">${f ? `${f.melhor}/${f.total}${f.tentativas > 1 ? ` <small class="muted">(${f.tentativas}x)</small>` : ""}` : '<span class="muted">—</span>'}</td>`;
        }).join("")}</tr>`).join("")}</tbody>
      </table></div>
    </section>
    <section class="box">
      <h2>Exercícios práticos</h2>
      <p class="muted small">Clique em um exercício para ver o último código salvo pelo aluno.</p>
      <div class="admin-ex">
        ${TRILHAS.flatMap((t) => NIVEIS.map((n) => {
          const id = `${t.id}_${n.id}`;
          const e = EXERCICIOS[id];
          if (!e) return "";
          const cod = codigos["ex_" + id];
          const ok = !!a.progress?.["ex_" + id] || cod?.ok;
          const status = ok ? "✅ resolvido" : cod ? `✏️ tentando (${cod.tentativas || 0} verificações)` : "— não iniciado";
          return `<details class="admin-ex-item${ok ? " ok" : ""}">
            <summary><span>${t.icone} ${esc(t.nome)} · ${n.nome}: ${esc(e.titulo)}</span><small>${status}</small></summary>
            ${cod ? `<p class="muted small">Atualizado em ${fmtDate(cod.atualizadoEm)}</p><pre><code>${esc(formatarCodigo(cod.codigo))}</code></pre>`
              : `<p class="muted small">Nenhum código salvo.</p>`}
          </details>`;
        })).join("")}
      </div>
    </section>
    <section class="box">
      <h2>Últimas sessões</h2>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>Início</th><th>Última atividade</th><th>Duração</th><th>Dispositivo</th></tr></thead>
        <tbody>
          ${sessoes.map((s) => `<tr>
            <td data-label="Início">${fmtDate(s.start)}</td>
            <td data-label="Última atividade">${fmtDate(s.lastPing)}</td>
            <td data-label="Duração">${human(s.seconds)}</td>
            <td data-label="Dispositivo">${esc(s.device || "—")}</td>
          </tr>`).join("") || `<tr><td colspan="4" class="muted">Sem sessões registradas.</td></tr>`}
        </tbody>
      </table></div>
    </section>`;
}

function formatarCodigo(c) {
  if (c && typeof c === "object") return `<!-- HTML -->\n${c.html || ""}\n\n/* CSS */\n${c.css || ""}\n\n// JS\n${c.js || ""}`;
  return String(c ?? "");
}

function exportarCSV(alunos) {
  const trilhas = progressoPorTrilha({}).map((p) => p.trilha);
  const cab = ["nome", "email", "pontos", "patente", "cadastro", "ultimo_acesso", "tempo_total_min", "sessoes", "exercicios_resolvidos", "fixacao_pct", "exercicios_codigo", "sql_pratica_licoes", "topicos_concluidos", "progresso_pct",
    ...trilhas.map((t) => t.id + "_concluidos")];
  const linhas = alunos.map((a) => {
    const g = progressoGeral(a.progress);
    const pt = progressoPorTrilha(a.progress);
    const pts = calcularPontos(a.progress, a.fixacao).total;
    return [a.name, a.email, pts, patente(pts).atual.nome, fmtDate(a.createdAt, false), fmtDate(a.lastAccess),
      Math.round((a.totalSeconds || 0) / 60), a.sessionsCount || 0, progressoExercicios(a.progress).feitos, resumoFixacao(a.fixacao).pct, progressoCodigo(a.progress).feitos, progressoSQLP(a.progress).feitos, g.feitos, g.pct, ...pt.map((p) => p.feitos)];
  });
  const csv = [cab, ...linhas]
    .map((l) => l.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";"))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `alunos-progrtotal-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
