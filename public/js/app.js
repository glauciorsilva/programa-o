import { LABS, EXERCISES as DATA_EXERCISES, FILES as DATA_FILES, bilingual } from "./dados-pratica.js";
import { renderDataScience } from "./ciencia-dados.js";
import { auth, db, isAdminEmail, isAdminUser } from "./firebase.js";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,
  sendPasswordResetEmail, sendEmailVerification, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp, deleteField
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { LINGUAGENS, BANCOS, TRILHAS, NIVEIS } from "./content/index.js";
import { GUIA_PESQUISA } from "./content/guia.js";
import { StudyTimer } from "./timer.js";
import { renderAdmin } from "./admin.js";
import { EXERCICIOS } from "./content/exercicios.js";
import { EXERCICIOS_CODIGO, CODIGO_POR_TOPICO, chaveCodigo, proximoCodigo } from "./content/codigo/index.js";
import { sandboxDoTopico } from "./content/sandbox-topicos.js";
import { LANGS, EXEMPLOS } from "./sandbox/langs.js";
import { renderSandbox } from "./sandbox/view.js";
import { renderFixacao } from "./fixacao.js";
import { renderPratica } from "./pratica.js";
import { calcularPontos, patente, fmtPts, PTS, REGRAS, PATENTES, ptsCodigo } from "./pontos.js";
import { renderSQLPratica } from "./sqlpratica/view.js";
import { chaveLicao } from "./content/sqlpratica.js";
import {
  $, $$, esc, clock, human, stars, topicosDa, progressoPorTrilha, progressoGeral,
  serieDiaria, barChart, progressBar, progressoExercicios, resumoFixacao, progressoSQLP, progressoCodigo, fmt
} from "./util.js";

const state = { user: null, profile: null, timer: null, isAdmin: false, pendingName: null };

/* =================== Autenticação =================== */

const ERROS = {
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/user-not-found": "Não existe conta com esse e-mail.",
  "auth/email-already-in-use": "Esse e-mail já tem cadastro. Use \"Entrar\".",
  "auth/weak-password": "Senha fraca: use pelo menos 6 caracteres.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos.",
  "auth/network-request-failed": "Sem conexão com a internet."
};
const traduz = (e) => ERROS[e?.code] || "Algo deu errado. Tente novamente.";

function authMsg(text, ok = false) {
  const el = $("#auth-msg");
  el.hidden = !text;
  el.textContent = text || "";
  el.className = "msg" + (ok ? " ok" : "");
}

function showAuthTab(name) {
  $$("[data-auth-tab]").forEach((b) => b.classList.toggle("active", b.dataset.authTab === name));
  $("#login-form").hidden = name !== "login";
  $("#register-form").hidden = name !== "register";
  $("#reset-form").hidden = name !== "reset";
  authMsg("");
}
$$("[data-auth-tab]").forEach((b) => b.addEventListener("click", () => showAuthTab(b.dataset.authTab)));

function busy(form, on) {
  $$("button, input", form).forEach((el) => (el.disabled = on));
}

$("#login-form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const f = ev.target;
  busy(f, true);
  try {
    await signInWithEmailAndPassword(auth, f.email.value.trim(), f.password.value);
  } catch (e) {
    authMsg(traduz(e));
  } finally {
    busy(f, false);
  }
});

$("#register-form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const f = ev.target;
  if (f.password.value !== f.password2.value) return authMsg("As senhas não conferem.");
  busy(f, true);
  state.pendingName = f.name.value.trim();
  try {
    const cred = await createUserWithEmailAndPassword(auth, f.email.value.trim(), f.password.value);
    await updateProfile(cred.user, { displayName: state.pendingName });
    sendEmailVerification(cred.user).catch(() => {});
  } catch (e) {
    state.pendingName = null;
    authMsg(traduz(e));
  } finally {
    busy(f, false);
  }
});

$("#reset-form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const f = ev.target;
  busy(f, true);
  try {
    await sendPasswordResetEmail(auth, f.email.value.trim());
    authMsg("Pronto! Veja sua caixa de entrada (e o spam).", true);
  } catch (e) {
    authMsg(traduz(e));
  } finally {
    busy(f, false);
  }
});

$("#logout-btn").addEventListener("click", async () => {
  if (state.timer) {
    await state.timer.stop();
    state.timer = null;
  }
  await signOut(auth);
});

async function ensureProfile(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  const profile = {
    name: state.pendingName || user.displayName || user.email.split("@")[0],
    email: user.email,
    createdAt: serverTimestamp(),
    lastAccess: serverTimestamp(),
    totalSeconds: 0,
    sessionsCount: 0,
    progress: {},
    daily: {}
  };
  await setDoc(ref, profile);
  state.pendingName = null;
  return { ...profile, createdAt: new Date(), lastAccess: new Date() };
}

onAuthStateChanged(auth, async (user) => {
  if (state.timer) {
    await state.timer.stop();
    state.timer = null;
  }
  state.user = user;
  if (!user) {
    state.profile = null;
    $("#loading").hidden = true;
    $("#app").hidden = true;
    $("#auth-screen").hidden = false;
    showAuthTab("login");
    return;
  }
  try {
    state.profile = await ensureProfile(user);
  } catch (e) {
    console.error(e);
    $("#loading").hidden = true;
    $("#auth-screen").hidden = false;
    authMsg("Não foi possível carregar seu perfil. Verifique as regras do Firestore.");
    return;
  }
  state.isAdmin = isAdminUser(user);

  $("#u-name").textContent = state.profile.name;
  $("#u-email").textContent = user.email;
  $("#u-avatar").textContent = (state.profile.name || "?").trim().charAt(0).toUpperCase();
  $("#nav-admin").hidden = !isAdminEmail(user);
  state.ultimoTotal = null;
  atualizarPontos();

  state.timer = new StudyTimer(user.uid, state.profile.totalSeconds, ({ session, total, paused }) => {
    $("#t-session").textContent = clock(session);
    $("#t-total").textContent = human(total);
    $("#timer").classList.toggle("paused", paused);
  });
  state.timer.start();

  $("#loading").hidden = true;
  $("#auth-screen").hidden = true;
  $("#app").hidden = false;
  render();
});

/* =================== Menu (gaveta no celular, retrátil no computador) =================== */

const telaLarga = () => matchMedia("(min-width: 901px)").matches;

function toggleMenu(open) {
  document.body.classList.toggle("menu-open", open);
  $("#backdrop").hidden = !open;
  if (!telaLarga()) $("#menu-btn").setAttribute("aria-expanded", String(open));
}

function recolherMenu(recolher) {
  document.body.classList.toggle("menu-recolhido", recolher);
  $("#menu-btn").setAttribute("aria-expanded", String(!recolher));
  $("#menu-btn").setAttribute("aria-label", recolher ? "Mostrar menu" : "Recolher menu");
  try {
    localStorage.setItem("progrtotal:menuRecolhido", recolher ? "1" : "");
  } catch { /* sem armazenamento */ }
}

try {
  if (localStorage.getItem("progrtotal:menuRecolhido")) recolherMenu(true);
} catch { /* sem armazenamento */ }

$("#menu-btn").addEventListener("click", () => {
  if (telaLarga()) recolherMenu(!document.body.classList.contains("menu-recolhido"));
  else toggleMenu(!document.body.classList.contains("menu-open"));
});
$("#backdrop").addEventListener("click", () => toggleMenu(false));

/* =================== Rotas =================== */

window.addEventListener("hashchange", () => {
  toggleMenu(false);
  render();
});

let limparTela = null;

function render() {
  if (!state.user) return;
  const [rota = "inicio", a, b] = location.hash.replace(/^#\/?/, "").split("/");
  $$("[data-nav]").forEach((l) => l.classList.toggle("active", l.dataset.nav === rota
    || (rota === "dadoslab" && l.dataset.nav === "dados")
    || (rota === "trilha" && l.dataset.nav === trilhaCategoria(a))
    || (rota === "exercicio" && l.dataset.nav === "sandbox")));
  if (limparTela) {
    limparTela();
    limparTela = null;
  }
  const view = $("#view");
  const telas = {
    inicio: viewInicio,
    linguagens: () => viewCategoria("linguagens"),
    bancos: () => viewCategoria("bancos"),
    trilha: () => viewTrilha(a, b),
    dados: () => {
      const profile = state.profile;
      const uid = state.user.uid;
      limparTela = renderDataScience(view, {
        progress: profile.progress ||= {},
        onToggle: async (key, completed) => {
          await updateDoc(doc(db, "users", uid), {
            ["progress." + key]: completed ? serverTimestamp() : deleteField()
          });
          if (completed) profile.progress[key] = new Date();
          else delete profile.progress[key];
          if (state.profile === profile) atualizarPontos();
        }
      });
    },
    dadoslab: () => viewDataLab(view, a, b),
    pesquisar: viewPesquisar,
    progresso: viewProgresso,
    sandbox: () => viewSandbox(view, a, b),
    exercicio: () => viewExercicio(view, a),
    sqlpratica: () => viewSQLPratica(view, a),
    admin: () => viewAdmin(a)
  };
  (telas[rota] || viewInicio)(view);
  view.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function trilhaCategoria(id) {
  return BANCOS.some((t) => t.id === id) ? "bancos" : "linguagens";
}

/* =================== Telas =================== */

function cardTrilha(t, ordem) {
  const p = progressoPorTrilha(state.profile.progress).find((x) => x.trilha.id === t.id);
  return `<a class="track-card" href="#/trilha/${t.id}" style="--accent:${t.cor}">
    <div class="track-top">
      <span class="order">${ordem}</span>
      <span class="track-icon">${t.icone}</span>
      <div>
        <h3>${esc(t.nome)}</h3>
        <span class="stars" title="Dificuldade ${t.dificuldade} de 5">${stars(t.dificuldade)}</span>
      </div>
    </div>
    <p>${t.resumo}</p>
    ${progressBar(p.pct, true)}
    <small class="muted">${p.feitos}/${p.total} tópicos · ${p.pct}%</small>
  </a>`;
}

function viewInicio(view) {
  const g = progressoGeral(state.profile.progress);
  const nome = esc((state.profile.name || "").split(" ")[0]);
  const verifyBanner = isAdminEmail(state.user) && !state.user.emailVerified ? adminVerifyBanner() : "";
  view.innerHTML = `
    ${verifyBanner}
    <section class="hero">
      <h1>Olá, ${nome}! 👋</h1>
      <p>Este é o seu mapa. Comece pelo topo (mais fácil, resultado rápido) e desça até as linguagens mais complexas. Em cada uma, siga <b>🐣 Iniciante → Básico → Intermediário → Avançado</b>. Nunca programou? Comece pelo <b>Iniciante</b>: é bem devagar, com prática no meio da explicação.</p>
      <div class="stat-row">
        <div class="stat"><small>Progresso geral</small><strong>${g.pct}%</strong>${progressBar(g.pct, true)}</div>
        <div class="stat"><small>Tópicos concluídos</small><strong>${g.feitos}/${g.total}</strong></div>
        <div class="stat"><small>Exercícios resolvidos</small><strong>${progressoExercicios(state.profile.progress).feitos}/${progressoExercicios(state.profile.progress).total}</strong></div>
        <div class="stat"><small>Exercícios de código</small><strong>${progressoCodigo(state.profile.progress).feitos}/${progressoCodigo(state.profile.progress).total}</strong></div>
        <div class="stat"><small>Pontuação</small><strong>⭐ ${fmtPts(calcularPontos(state.profile.progress, state.profile.fixacao).total)}</strong><a class="small" href="#/progresso">ver detalhes</a></div>
        <div class="stat"><small>Tempo total</small><strong id="home-total">${human(state.profile.totalSeconds)}</strong></div>
      </div>
    </section>

    <section class="sobre" aria-labelledby="sobre-titulo">
      <h2 id="sobre-titulo">🚪 Sobre este projeto</h2>
      <p>O objetivo do ProgrTotal é <b>apresentar ao estudante algumas das muitas linguagens de programação</b>, servindo como uma <b>porta de entrada para o universo da tecnologia</b>.</p>
      <p>Ele <b>não apresenta nem ensina, por si só, tudo o que deve ser aprendido</b> sobre cada linguagem. Use-o como ponto de partida: pratique, pesquise, leia a documentação oficial e continue estudando por outros cursos e materiais.</p>
    </section>

    <section class="roadmap">
      <h2>💻 Linguagens <small class="muted">— da mais fácil à mais complexa</small></h2>
      <ol class="road">${LINGUAGENS.map((t, i) => roadItem(t, i + 1)).join("")}</ol>
      <h2>🗄️ Bancos de Dados</h2>
      <ol class="road">${BANCOS.map((t, i) => roadItem(t, i + 1)).join("")}</ol>
    </section>

    <section class="tip">
      <h2>🧭 Como usar este roadmap</h2>
      <ul>
        <li><b>Começando do zero?</b> Abra o nível <b>🐣 Iniciante</b> de cada linguagem: tutoriais curtinhos, passo a passo, com perguntas <b>✋ Pare e pratique</b> no meio da explicação.</li>
        <li><b>⭐ Cada atividade vale pontos:</b> tópico concluído, pergunta acertada, exercício resolvido… Veja sua pontuação e sua patente no topo da tela.</li>
        <li><b>Não precisa decorar tudo.</b> A meta é você saber fazer as tarefas mais comuns e saber <a href="#/pesquisar">procurar</a> o resto.</li>
        <li>Em cada tópico: leia a explicação, veja <b>o código parte por parte</b>, clique em <b>▶ Testar no sandbox</b> para mexer no código, leia o caso real e treine a pergunta de entrevista.</li>
        <li>Cada tópico tem <b>🧩 exercícios de código</b>: alguns para <b>completar</b> o que falta, outros para <b>criar do zero</b>. A correção é automática.</li>
        <li>Ao final de cada nível, faça os <b>✍️ exercícios de fixação</b> (10 questões rápidas com explicação).</li>
        <li>Em caso de ainda haver dúvida, <b>pesquise o termo na internet</b>. Saber pesquisar faz parte do trabalho de quem programa.</li>
        <li>Para treinar SQL de verdade, faça a trilha interativa <a href="#/sqlpratica"><b>🧩 SQL na Prática</b></a>: 18 lições com banco de dados rodando no navegador.</li>
        <li>No fim de cada nível há um <b>🏋️ exercício prático</b> com correção automática. Use o <a href="#/sandbox">🧪 Sandbox</a> para testar suas próprias ideias.</li>
        <li>Marque <b>“Concluí”</b> para acompanhar sua evolução. O cronômetro no topo soma seu tempo de estudo.</li>
        <li>Sugestão de caminho: <b>HTML → CSS → JavaScript → React</b> (front-end) ou <b>Python → SQL → MySQL</b> (dados/back-end).</li>
      </ul>
    </section>`;
  bindVerifyBanner(view);
}

function roadItem(t, ordem) {
  const p = progressoPorTrilha(state.profile.progress).find((x) => x.trilha.id === t.id);
  return `<li style="--accent:${t.cor}">
    <a href="#/trilha/${t.id}">
      <span class="road-dot">${ordem}</span>
      <span class="road-body">
        <strong>${t.icone} ${esc(t.nome)}</strong>
        <span class="stars">${stars(t.dificuldade)}</span>
        <small>${t.mercado}</small>
        ${progressBar(p.pct, true)}
      </span>
    </a>
  </li>`;
}

function viewCategoria(cat) {
  const lista = cat === "linguagens" ? LINGUAGENS : BANCOS;
  const titulo = cat === "linguagens" ? "💻 Linguagens" : "🗄️ Bancos de Dados";
  const sub = cat === "linguagens"
    ? "Ordenadas da mais fácil de aprender (e de ver resultado) até a mais complexa."
    : "SQL é a língua dos bancos de dados. Primeiro aprenda o SQL padrão, depois os detalhes do MySQL.";
  $("#view").innerHTML = `
    <h1>${titulo}</h1>
    <p class="muted">${sub}</p>
    <div class="track-grid">${lista.map((t, i) => cardTrilha(t, i + 1)).join("")}</div>
    ${cat === "bancos" ? cardSQLPratica() : ""}`;
}

function cardSQLPratica() {
  const p = progressoSQLP(state.profile.progress);
  return `<a class="sqlp-card" href="#/sqlpratica">
    <span class="sqlp-card-ic" aria-hidden="true">🧩</span>
    <span class="grow">
      <strong>SQL na Prática</strong>
      <span class="muted small">${p.total} lições interativas: escreva consultas num banco de dados de verdade, no navegador, e veja a correção na hora. Ótimo para treinar depois (ou junto) das trilhas de SQL e MySQL.</span>
      ${progressBar(p.pct, true)}
      <small class="muted">${p.feitos}/${p.total} lições · ${p.pct}%</small>
    </span>
    <span class="btn primary tiny">${p.feitos ? "Continuar" : "Começar"} →</span>
  </a>`;
}

function viewTrilha(id, nivelId = "iniciante") {
  const t = TRILHAS.find((x) => x.id === id);
  if (!t) return viewInicio($("#view"));
  const nivel = NIVEIS.find((n) => n.id === nivelId) || NIVEIS[0];
  const prog = state.profile.progress || {};
  const p = progressoPorTrilha(prog).find((x) => x.trilha.id === t.id);
  const cat = trilhaCategoria(t.id);
  const bloco = t.niveis[nivel.id];
  // Reaproveita os exercícios de fixação já respondidos ao redesenhar a mesma página
  const fxAnterior = $("#fx-host")?.dataset.chave === `${t.id}_${nivel.id}` ? $("#fx-host .fixacao") : null;

  $("#view").innerHTML = `
    <a class="back" href="#/${cat}">← ${cat === "bancos" ? "Bancos de Dados" : "Linguagens"}</a>
    <header class="track-hero" style="--accent:${t.cor}">
      <div class="track-icon big">${t.icone}</div>
      <div class="grow">
        <h1>${esc(t.nome)}</h1>
        <span class="stars">${stars(t.dificuldade)}</span> <small class="muted">dificuldade</small>
        <p>${t.resumo}</p>
        <p class="market">💼 <b>Mercado:</b> ${t.mercado}</p>
        ${progressBar(p.pct)}
        <small class="muted">${p.feitos}/${p.total} tópicos concluídos</small>
      </div>
    </header>

    <div class="level-tabs" role="tablist">
      ${NIVEIS.map((n) => {
        const tops = t.niveis[n.id].topicos;
        const f = tops.filter((tp) => prog[tp.id]).length;
        return `<a role="tab" href="#/trilha/${t.id}/${n.id}" class="${n.id === nivel.id ? "active" : ""}" aria-selected="${n.id === nivel.id}">
          ${n.emoji} ${n.nome} <small>${f}/${tops.length}</small></a>`;
      }).join("")}
    </div>

    <p class="goal">🎯 <b>Ao final deste nível você consegue:</b> ${bloco.objetivo}</p>

    <div class="topics">
      ${bloco.topicos.map((tp, i) => topicoHTML(tp, i + 1, !!prog[tp.id])).join("")}
    </div>

    ${cardExercicio(t, nivel, prog)}

    <div id="fx-host"></div>

    <section class="docs">
      <h2>📚 Onde procurar quando não souber (${esc(t.nome)})</h2>
      <ul>${t.docs.map((d) => `<li><a href="${d.url}" target="_blank" rel="noopener">${esc(d.nome)}</a>${d.desc ? ` — <span class="muted">${d.desc}</span>` : ""}</li>`).join("")}</ul>
    </section>

    <nav class="level-nav">
      ${nivelVizinho(t, nivel, -1)}
      ${nivelVizinho(t, nivel, 1)}
    </nav>`;

  montarFixacao(t, nivel, fxAnterior);
  montarPraticas($("#view"), t);

  $$(".topic").forEach((el) => {
    const tpId = el.dataset.id;
    $(".done-btn", el).addEventListener("click", () => toggleTopico(tpId, el));
    $(".answer-btn", el).addEventListener("click", (ev) => {
      const ans = $(".answer", el);
      ans.hidden = !ans.hidden;
      ev.target.textContent = ans.hidden ? "Ver resposta" : "Esconder resposta";
    });
    $(".copy-btn", el).addEventListener("click", async (ev) => {
      try {
        await navigator.clipboard.writeText($("code", el).textContent);
        ev.target.textContent = "Copiado!";
      } catch {
        ev.target.textContent = "Selecione e copie";
      }
      setTimeout(() => (ev.target.textContent = "Copiar"), 1500);
    });
  });
}

function nivelVizinho(t, nivel, dir) {
  const i = NIVEIS.indexOf(nivel) + dir;
  if (i < 0 || i >= NIVEIS.length) return "<span></span>";
  const n = NIVEIS[i];
  return `<a class="btn ghost" href="#/trilha/${t.id}/${n.id}">${dir < 0 ? "← " : ""}${n.nome}${dir > 0 ? " →" : ""}</a>`;
}

// Exercícios de código do tópico (completar / criar do zero)
function listaCodigo(tp) {
  const ids = CODIGO_POR_TOPICO[tp.id] || [];
  if (!ids.length) return "";
  const prog = state.profile.progress || {};
  const feitos = ids.filter((id) => prog[chaveCodigo(id)]).length;
  return `<div class="box codigo-ex">
    <h4>🧩 Exercícios de código <small class="muted">${feitos}/${ids.length} resolvidos</small></h4>
    <p class="muted small">Complete o código que falta ou crie do zero. A correção é automática.</p>
    <ol class="cx-lista">${ids.map((id) => {
      const ex = EXERCICIOS_CODIGO[id];
      const ok = !!prog[chaveCodigo(id)];
      return `<li><a href="#/exercicio/${id}" class="${ok ? "ok" : ""}">
        <span class="cx-ok" aria-hidden="true">${ok ? "✅" : "⬜"}</span>
        <span class="cx-tag ${ex.tipo === "completar" ? "completar" : "criar"}">${ex.tipo === "completar" ? "✏️ Completar" : "🛠️ Do zero"}</span>
        <span class="grow">${esc(ex.titulo)}</span>
        <span class="cx-pts">⭐ ${ptsCodigo(id)}</span>
        <span class="sr-only">${ok ? "(resolvido)" : ""}</span>
      </a></li>`;
    }).join("")}</ol>
  </div>`;
}

function topicoHTML(tp, num, feito) {
  const sbx = sandboxDoTopico(tp.id);
  const busca = tp.busca.map((q) =>
    `<a class="chip" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(q)}">${esc(q)}</a>`).join("");
  return `<details class="topic${feito ? " done" : ""}" data-id="${tp.id}" ${num === 1 && !feito ? "open" : ""}>
    <summary>
      <span class="num">${feito ? "✓" : num}</span>
      <span class="grow">${esc(tp.titulo)}</span>
    </summary>
    <div class="topic-body">
      <div class="box kid">
        <h4>📖 Entendendo o conceito</h4>
        <p>${tp.crianca}</p>
        ${tp.detalhes || ""}
        <p class="dica-pesquisa">💡 Em caso de ainda haver dúvida, pesquise o termo na internet.</p>
      </div>

      ${tp.passos?.length ? `<div class="box passos">
        <h4>🪜 Tutorial passo a passo</h4>
        <ol class="passos-lista">${tp.passos.map((p, i) => `<li>
          <h5>${esc(p.titulo)}</h5>
          <div class="passo-texto">${p.html}</div>
          ${p.codigo ? `<pre><code>${esc(p.codigo.trim())}</code></pre>` : ""}
          ${hostPratica(tp, i)}
        </li>`).join("")}</ol>
      </div>` : hostPratica(tp, 0)}

      <div class="box code">
        <div class="code-head"><h4>💻 Na prática</h4>
          <div class="code-actions">
            <button class="copy-btn btn tiny">Copiar</button>
            ${sbx && !sbx.indisponivel ? `<a class="btn tiny primary" href="#/sandbox/topico/${tp.id}">▶ Testar no sandbox</a>` : ""}
          </div>
        </div>
        <pre><code>${esc(tp.codigo.trim())}</code></pre>
        ${tp.nota ? `<p class="muted small">${tp.nota}</p>` : ""}
        ${sbx?.indisponivel ? `<p class="muted small">⚠️ ${sbx.indisponivel}</p>` : ""}
      </div>

      ${tp.partes?.length ? `<div class="box partes">
        <h4>🔍 O código, parte por parte</h4>
        <dl>${tp.partes.map(([trecho, expl]) => `<div class="parte"><dt><code>${esc(trecho.trim())}</code></dt><dd>${fmt(expl)}</dd></div>`).join("")}</dl>
      </div>` : ""}

      ${tp.noCss ? `<div class="box nocss">
        <h4>🎨 E no CSS? Configurações deste assunto</h4>
        <div>${tp.noCss.texto}</div>
        ${tp.noCss.codigo ? `<pre><code>${esc(tp.noCss.codigo.trim())}</code></pre>` : ""}
        <p class="muted small">Lembre: o HTML monta a <b>estrutura</b>; a <b>aparência</b> (cores, tamanhos, espaços, posição) é configurada no CSS. Veja a trilha <a href="#/trilha/css">🎨 CSS</a>.</p>
      </div>` : ""}

      ${tp.passos?.length ? "" : hostPratica(tp, 1)}

      ${listaCodigo(tp)}

      <div class="box work"><h4>💼 Caso real no trabalho</h4><p>${tp.trabalho}</p></div>

      <div class="box interview">
        <h4>🎤 Pergunta de entrevista</h4>
        <p class="q">“${esc(tp.entrevista.pergunta)}”</p>
        <button class="answer-btn btn tiny">Ver resposta</button>
        <div class="answer" hidden><p>${tp.entrevista.resposta}</p></div>
      </div>

      <div class="box search"><h4>🔎 Em caso de ainda haver dúvida, pesquise o termo na internet</h4><p class="muted small">Sugestões de busca (abrem o Google em outra aba):</p><div class="chips">${busca}</div></div>

      <button class="done-btn btn ${feito ? "success" : "primary"}">${feito ? "✓ Concluído (desmarcar)" : `Marcar como concluído <small>(+${PTS.topico} pts)</small>`}</button>
    </div>
  </details>`;
}

/* =================== Pontuação =================== */

// Recalcula os pontos e atualiza o topo. Se subiu, mostra "+N pts".
function atualizarPontos() {
  if (!state.profile) return;
  const { total } = calcularPontos(state.profile.progress, state.profile.fixacao);
  const p = patente(total);
  $("#pts").textContent = fmtPts(total);
  $("#pts-patente").textContent = p.atual.icone + " " + p.atual.nome;
  $("#pontos").title = p.prox ? `Faltam ${fmtPts(p.faltam)} pts para ${p.prox.nome}` : "Patente máxima!";
  const antes = state.ultimoTotal;
  state.ultimoTotal = total;
  if (antes == null || total <= antes) return;
  const subiu = patente(antes).atual !== p.atual;
  aviso(`⭐ +${fmtPts(total - antes)} pts${subiu ? ` · Nova patente: ${p.atual.icone} ${p.atual.nome}!` : ""}`);
  const el = $("#pontos");
  el.classList.remove("pulou");
  void el.offsetWidth;
  el.classList.add("pulou");
}

let avisoTimer = null;
function aviso(texto) {
  const t = $("#toast");
  t.textContent = texto;
  t.hidden = false;
  t.classList.add("on");
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => {
    t.classList.remove("on");
    setTimeout(() => (t.hidden = true), 300);
  }, 2600);
}

async function salvarPratica(k) {
  const prog = (state.profile.progress ||= {});
  if (prog[k]) return;
  prog[k] = new Date();
  atualizarPontos();
  try {
    await updateDoc(doc(db, "users", state.user.uid), { ["progress." + k]: serverTimestamp() });
  } catch (e) {
    console.error(e);
  }
}

// Perguntas "pare e pratique" de um tópico, divididas em grupos (cada grupo aparece num ponto da explicação)
function gruposPratica(tp) {
  if (tp.passos?.length) {
    let base = 0;
    return tp.passos.map((p) => {
      const g = { qs: p.pratica || [], base };
      base += g.qs.length;
      return g;
    });
  }
  const qs = tp.pratica || [];
  const meio = Math.ceil(qs.length / 2);
  return [{ qs: qs.slice(0, meio), base: 0 }, { qs: qs.slice(meio), base: meio }];
}

const hostPratica = (tp, g) => `<div class="pratica-host" data-topico="${tp.id}" data-grupo="${g}"></div>`;

function montarPraticas(view, t) {
  const prog = state.profile.progress || {};
  $$(".pratica-host", view).forEach((host) => {
    const tp = TRILHAS.flatMap((tr) => NIVEIS.flatMap((n) => tr.niveis[n.id].topicos)).find((x) => x.id === host.dataset.topico);
    const g = gruposPratica(tp)[+host.dataset.grupo];
    if (!g?.qs.length) return;
    renderPratica(host, {
      questoes: g.qs, base: g.base,
      chave: (n) => `ck_${tp.id}_${n}`,
      feito: (k) => !!prog[k],
      ci: ["html", "css", "sql", "mysql"].includes(t.id),
      pontos: PTS.pratica,
      onAcerto: salvarPratica
    });
  });
}

async function toggleTopico(id, el) {
  const prog = (state.profile.progress ||= {});
  const feito = !!prog[id];
  const btn = $(".done-btn", el);
  btn.disabled = true;
  try {
    await updateDoc(doc(db, "users", state.user.uid), {
      ["progress." + id]: feito ? deleteField() : serverTimestamp()
    });
    if (feito) delete prog[id];
    else prog[id] = new Date();
    atualizarPontos();
    const scrollY = window.scrollY;
    const [, , tid, nid] = location.hash.split("/");
    viewTrilha(tid, nid);
    window.scrollTo(0, scrollY);
    if (!feito) {
      const next = $(`.topic[data-id="${id}"]`)?.nextElementSibling;
      if (next && !next.classList.contains("done")) next.open = true;
    }
  } catch (e) {
    console.error(e);
    alert("Não foi possível salvar. Verifique sua conexão.");
    btn.disabled = false;
  }
}

function viewPesquisar(view) {
  view.innerHTML = `
    <h1>🔎 Como pesquisar quando não souber</h1>
    <p class="muted">Nenhum programador sabe tudo de cabeça. O segredo é saber <b>procurar bem</b>. Isso também é avaliado em entrevistas!</p>
    ${GUIA_PESQUISA.map((s) => `
      <section class="box guide">
        <h2>${s.titulo}</h2>
        ${s.crianca ? `<p class="kid-inline">💡 ${s.crianca}</p>` : ""}
        ${s.html}
      </section>`).join("")}`;
}

function viewProgresso(view) {
  const prog = state.profile.progress || {};
  const g = progressoGeral(prog);
  const porTrilha = progressoPorTrilha(prog);
  const total = state.timer ? state.timer.baseTotal + state.timer.session : state.profile.totalSeconds;
  view.innerHTML = `
    <h1>📈 Meu progresso</h1>
    <div class="stat-row">
      <div class="stat"><small>Progresso geral</small><strong>${g.pct}%</strong>${progressBar(g.pct, true)}</div>
      <div class="stat"><small>Tópicos concluídos</small><strong>${g.feitos}/${g.total}</strong></div>
      <div class="stat"><small>Tempo total de estudo</small><strong>${human(total)}</strong></div>
      <div class="stat"><small>Exercícios resolvidos</small><strong>${progressoExercicios(prog).feitos}/${progressoExercicios(prog).total}</strong></div>
      <div class="stat"><small>Exercícios de código</small><strong>${progressoCodigo(prog).feitos}/${progressoCodigo(prog).total}</strong></div>
      <div class="stat"><small>SQL na Prática</small><strong>${progressoSQLP(prog).feitos}/${progressoSQLP(prog).total}</strong></div>
      <div class="stat"><small>Fixação (acertos)</small><strong>${resumoFixacao(state.profile.fixacao).acertos}/${resumoFixacao(state.profile.fixacao).total}</strong></div>
      <div class="stat"><small>Sessões</small><strong>${(state.profile.sessionsCount || 0) + 1}</strong></div>
    </div>
    ${secaoPontos(prog, state.profile.fixacao)}
    <section class="box">
      <h2>Tempo de estudo — últimos 14 dias</h2>
      ${barChart(serieDiaria(state.profile.daily, 14))}
      <p class="muted small">O gráfico é atualizado a cada 30 segundos de estudo; recarregue para ver o dia de hoje.</p>
    </section>
    <section class="box">
      <h2>Por trilha</h2>
      <div class="track-progress">
        ${porTrilha.map((p) => `
          <a href="#/trilha/${p.trilha.id}" class="tp-row">
            <span>${p.trilha.icone} ${esc(p.trilha.nome)}</span>
            ${progressBar(p.pct, true)}
            <small>${p.feitos}/${p.total}</small>
          </a>`).join("")}
      </div>
    </section>`;
}

function secaoPontos(prog, fixacao) {
  const pts = calcularPontos(prog, fixacao);
  const p = patente(pts.total);
  return `<section class="box">
    <h2>⭐ Pontuação</h2>
    <div class="pts-hero">
      <span class="big" aria-hidden="true">${p.atual.icone}</span>
      <div>
        <strong class="total">${fmtPts(pts.total)} pts</strong>
        <span>Patente: <b>${p.atual.nome}</b>${p.prox ? ` · faltam <b>${fmtPts(p.faltam)} pts</b> para ${p.prox.icone} ${p.prox.nome}` : " · patente máxima! 🏆"}</span>
        ${progressBar(p.pct, true)}
      </div>
    </div>
    <ul class="patentes">${PATENTES.map((x) => `<li class="${pts.total >= x.min ? "ok" : ""}">${x.icone} ${x.nome} · ${fmtPts(x.min)}</li>`).join("")}</ul>
    <div class="table-wrap" style="margin-top:12px"><table class="table">
      <thead><tr><th>Atividade</th><th>Vale</th><th>Feitas</th><th>Pontos</th></tr></thead>
      <tbody>${pts.partes.map((r) => `<tr>
        <td data-label="Atividade">${r.icone} ${r.nome}</td>
        <td data-label="Vale">${r.pts} pts</td>
        <td data-label="Feitas">${fmtPts(r.qtd)}</td>
        <td data-label="Pontos"><b>${fmtPts(r.total)}</b></td>
      </tr>`).join("")}</tbody>
    </table></div>
  </section>`;
}

/* =================== Sandbox e exercícios =================== */

const chaveExercicio = (exId) => "ex_" + exId;

function cardExercicio(t, nivel, prog) {
  const exId = `${t.id}_${nivel.id}`;
  const ex = EXERCICIOS[exId];
  if (!ex) return "";
  const feito = !!prog[chaveExercicio(exId)];
  return `<section class="exercise-card${feito ? " done" : ""}" style="--accent:${t.cor}">
    <div class="grow">
      <small class="muted">🏋️ Exercício prático — ${nivel.nome}</small>
      <h3>${esc(ex.titulo)}</h3>
      <p class="muted small">${feito ? "✅ Você já resolveu este exercício." : `Coloque a mão na massa e verifique sua resposta automaticamente. ⭐ Vale ${PTS.pratico} pts.`}</p>
    </div>
    <a class="btn ${feito ? "ghost" : "primary"}" href="#/exercicio/${exId}">${feito ? "Rever" : "Resolver"} →</a>
  </section>`;
}

function montarFixacao(t, nivel, anterior) {
  const host = $("#fx-host");
  if (!host) return;
  const chave = `${t.id}_${nivel.id}`;
  host.dataset.chave = chave;
  if (anterior) {
    host.replaceChildren(anterior);
    return;
  }
  renderFixacao(host, {
    questoes: t.niveis[nivel.id].fixacao,
    ci: ["html", "css", "sql", "mysql"].includes(t.id),
    pontos: PTS.fixacao,
    salvo: () => state.profile.fixacao?.[chave] || null,
    onConcluir: async (acertos, total) => {
      const atual = (state.profile.fixacao ||= {})[chave];
      const novo = { melhor: Math.max(acertos, atual?.melhor || 0), ultimo: acertos, total, tentativas: (atual?.tentativas || 0) + 1 };
      state.profile.fixacao[chave] = novo;
      atualizarPontos();
      try {
        await updateDoc(doc(db, "users", state.user.uid), { ["fixacao." + chave]: { ...novo, em: serverTimestamp() } });
      } catch (e) {
        console.error(e);
      }
    }
  });
}

const ctxSandbox = () => ({
  uid: state.user.uid,
  onResolvido: async (exId) => {
    const k = EXERCICIOS_CODIGO[exId] ? chaveCodigo(exId) : chaveExercicio(exId);
    const prog = (state.profile.progress ||= {});
    if (prog[k]) return;
    prog[k] = new Date();
    atualizarPontos();
    try {
      await updateDoc(doc(db, "users", state.user.uid), { ["progress." + k]: serverTimestamp() });
    } catch (e) {
      console.error(e);
    }
  }
});

function montar(view, promessa, titulo = "🧪 Sandbox") {
  let cancelado = false;
  let limpeza = null;
  limparTela = () => {
    cancelado = true;
    limpeza?.();
  };
  promessa.then((f) => {
    if (cancelado) f?.();
    else limpeza = f;
  }).catch((e) => {
    console.error(e);
    view.innerHTML = `<h1>${titulo}</h1><div class="banner warn">Não foi possível abrir esta tela: ${esc(e.message)}</div>`;
  });
}

function viewSandbox(view, a, b) {
  if (a === "topico") {
    const s = sandboxDoTopico(b || "");
    if (!s) return viewSandbox(view);
    const nivelId = Object.keys(s.trilha.niveis).find((n) => s.trilha.niveis[n].topicos.includes(s.topico));
    const voltar = { href: `#/trilha/${s.trilha.id}/${nivelId}`, texto: `${s.trilha.nome} — ${s.topico.titulo}` };
    if (s.indisponivel) {
      view.innerHTML = `<a class="back" href="${voltar.href}">← ${esc(voltar.texto)}</a>
        <h1>🧪 Sandbox</h1><div class="banner warn">⚠️ ${s.indisponivel}</div>`;
      return;
    }
    return montar(view, renderSandbox(view, {
      modo: "topico", lang: s.lang, inicial: s.inicial, entrada: s.entrada, db: s.db,
      aba: { css: "css", javascript: "js" }[s.trilha.id],
      titulo: s.topico.titulo,
      subtitulo: `Exemplo de <b>${esc(s.trilha.nome)}</b>. Mude o código à vontade e execute para ver o que acontece.`,
      voltar, chave: "top_" + s.topico.id, nuvem: false
    }, ctxSandbox()));
  }
  let lang = LANGS[a] ? a : null;
  try {
    lang ||= localStorage.getItem("progrtotal:ultimaLang");
  } catch { /* sem armazenamento */ }
  if (!LANGS[lang]) lang = "python";
  try {
    localStorage.setItem("progrtotal:ultimaLang", lang);
  } catch { /* sem armazenamento */ }
  montar(view, renderSandbox(view, {
    modo: "livre", lang, inicial: EXEMPLOS[lang], titulo: "Sandbox",
    subtitulo: "Sua caixa de areia: teste ideias, exemplos e brinque com o código. Ele fica salvo na sua conta.",
    chave: "livre_" + lang, nuvem: true
  }, ctxSandbox()));
}

function viewExercicio(view, exId) {
  if (EXERCICIOS_CODIGO[exId]) return viewExercicioCodigo(view, exId);
  const ex = EXERCICIOS[exId];
  if (!ex) return viewSandbox(view);
  const [trilhaId, nivelId] = exId.split("_");
  const t = TRILHAS.find((x) => x.id === trilhaId);
  const nivel = NIVEIS.find((n) => n.id === nivelId);
  montar(view, renderSandbox(view, {
    modo: "exercicio", lang: ex.lang, inicial: ex.inicial, exercicio: ex, exId,
    aba: trilhaId === "css" ? "css" : undefined,
    titulo: ex.titulo,
    subtitulo: `Exercício de <b>${esc(t.nome)}</b> — nível ${nivel.nome}`,
    voltar: { href: `#/trilha/${t.id}/${nivel.id}`, texto: `${t.nome} — ${nivel.nome}` },
    resolvido: !!state.profile.progress?.[chaveExercicio(exId)],
    chave: chaveExercicio(exId), nuvem: true
  }, ctxSandbox()));
}

function viewExercicioCodigo(view, exId) {
  const ex = EXERCICIOS_CODIGO[exId];
  const { trilha: t, nivel, topico: tp } = ex;
  const total = CODIGO_POR_TOPICO[tp.id].length;
  const prox = proximoCodigo(exId);
  const tipo = ex.tipo === "completar" ? "✏️ Completar o código" : "🛠️ Criar do zero";
  montar(view, renderSandbox(view, {
    modo: "exercicio", lang: ex.lang, inicial: ex.inicial, exercicio: ex, exId,
    aba: ex.aba || (t.id === "css" ? "css" : undefined),
    db: ex.db, entrada: ex.entrada,
    titulo: ex.titulo,
    subtitulo: `${tipo} · <b>${esc(t.nome)}</b> — ${esc(tp.titulo)} · exercício ${ex.n} de ${total}`
      + (ex.tipo === "completar" ? `<br><span class="small">👉 Clique em cada <span class="lacuna-exemplo">retângulo</span> do código e escreva o que falta (Enter vai para o próximo).</span>` : ""),
    voltar: { href: `#/trilha/${t.id}/${nivel.id}`, texto: `${t.nome} — ${tp.titulo}` },
    proximo: prox
      ? { href: `#/exercicio/${prox}`, texto: "Próximo exercício" }
      : { href: `#/trilha/${t.id}/${nivel.id}`, texto: "Voltar ao tópico" },
    resolvido: !!state.profile.progress?.[chaveCodigo(exId)],
    chave: chaveCodigo(exId), nuvem: true
  }, ctxSandbox()));
}

/* =================== SQL na Prática =================== */

function viewSQLPratica(view, licaoId) {
  montar(view, renderSQLPratica(view, {
    licaoId,
    uid: state.user.uid,
    progresso: state.profile.progress || {},
    liberarTudo: state.isAdmin,
    onConcluir: async (id) => {
      const k = chaveLicao(id);
      const prog = (state.profile.progress ||= {});
      if (prog[k]) return;
      prog[k] = new Date();
      atualizarPontos();
      try {
        await updateDoc(doc(db, "users", state.user.uid), { ["progress." + k]: serverTimestamp() });
      } catch (e) {
        console.error(e);
      }
    }
  }), "🧩 SQL na Prática");
}

/* =================== Admin =================== */

function adminVerifyBanner() {
  return `<div class="banner warn">
    <b>Conta de administrador:</b> confirme seu e-mail para liberar o painel Admin/TI.
    <div class="banner-actions">
      <button class="btn tiny" id="resend-verify">Reenviar e-mail</button>
      <button class="btn tiny primary" id="check-verify">Já confirmei</button>
    </div>
  </div>`;
}

function bindVerifyBanner(view) {
  $("#resend-verify", view)?.addEventListener("click", async (ev) => {
    try {
      await sendEmailVerification(state.user);
      ev.target.textContent = "Enviado!";
    } catch (e) {
      ev.target.textContent = traduz(e);
    }
  });
  $("#check-verify", view)?.addEventListener("click", async () => {
    await state.user.reload();
    await state.user.getIdToken(true);
    state.isAdmin = isAdminUser(auth.currentUser);
    if (!state.isAdmin) alert("Ainda não consta como confirmado. Abra o link do e-mail e tente de novo.");
    render();
  });
}

function viewAdmin(uid) {
  const view = $("#view");
  if (!isAdminEmail(state.user)) {
    view.innerHTML = `<h1>Acesso restrito</h1><p>Esta área é exclusiva do administrador.</p>`;
    return;
  }
  if (!state.isAdmin) {
    view.innerHTML = `<h1>🛡️ Admin / TI</h1>${adminVerifyBanner()}`;
    bindVerifyBanner(view);
    return;
  }
  renderAdmin(view, uid);
}



// Data science labs reuse the isolated Python editor, persistence and verifier.
function viewDataLab(view, kind, id) {
  const exercise = kind === "ex" ? DATA_EXERCISES.find(x => x.id === id) : null;
  const lab = kind === "lab" ? LABS.find(x => x.id === id) : null;
  if (!exercise && !lab) {
    view.innerHTML = `<h1>${bilingual("Practice not found", "Prática não encontrada")}</h1><a href="#/dados">${bilingual("Back to Data Science", "Voltar para Ciência de Dados")}</a>`;
    return;
  }
  const uid = state.user.uid;
  const profile = state.profile;
  const index = exercise ? DATA_EXERCISES.indexOf(exercise) : -1;
  const next = DATA_EXERCISES[index + 1];
  const child = document.createElement("div");
  // A dedicated child prevents async editor initialization from affecting a later route.
  view.replaceChildren(child);
  montar(child, renderSandbox(child, {
    modo: exercise ? "exercicio" : "topico", lang: "python",
    titulo: exercise ? exercise.title : lab.title,
    subtitulo: exercise ? bilingual("Solve, check and explain what you learned.", "Resolva, verifique e explique o que aprendeu.") : lab.description,
    inicial: exercise ? exercise.initial : lab.code,
    arquivos: DATA_FILES, graficos: true,
    voltar: { href: "#/dados", texto: "Data Science / Ciência de Dados" },
    chave: "dados_" + kind + "_" + id, nuvem: true,
    exId: exercise?.id,
    resolvido: !!profile.progress?.["dsx_" + id],
    exercicio: exercise ? {
      lang: "python", enunciado: `<p>${bilingual(...exercise.prompt)}</p>`,
      dica: bilingual(...exercise.hint), solucao: exercise.solution,
      teste: exercise.test, saidaEsperada: exercise.expected,
      padroes: exercise.id === "join" ? [[/validate\s*=\s*['"]many_to_one['"]/, 'Use validate="many_to_one" / Use a validação many_to_one']] : undefined
    } : undefined,
    proximo: exercise && next ? { href: "#/dadoslab/ex/" + next.id, texto: "Next / Próximo" } : undefined
  }, {
    uid,
    onResolvido: async (exerciseId) => {
      const key = "dsx_" + exerciseId;
      if (profile.progress?.[key]) return;
      await updateDoc(doc(db, "users", uid), { ["progress." + key]: serverTimestamp() });
      (profile.progress ||= {})[key] = new Date();
      if (state.profile === profile) atualizarPontos();
    }
  }), "Data Science / Ciência de Dados");
}
