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
import { sandboxDoTopico } from "./content/sandbox-topicos.js";
import { LANGS, EXEMPLOS } from "./sandbox/langs.js";
import { renderSandbox } from "./sandbox/view.js";
import {
  $, $$, esc, clock, human, stars, topicosDa, progressoPorTrilha, progressoGeral,
  serieDiaria, barChart, progressBar, progressoExercicios
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

/* =================== Menu mobile =================== */

function toggleMenu(open) {
  document.body.classList.toggle("menu-open", open);
  $("#backdrop").hidden = !open;
  $("#menu-btn").setAttribute("aria-expanded", String(open));
}
$("#menu-btn").addEventListener("click", () => toggleMenu(!document.body.classList.contains("menu-open")));
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
    pesquisar: viewPesquisar,
    progresso: viewProgresso,
    sandbox: () => viewSandbox(view, a, b),
    exercicio: () => viewExercicio(view, a),
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
      <p>Este é o seu mapa. Comece pelo topo (mais fácil, resultado rápido) e desça até as linguagens mais complexas. Em cada uma, siga <b>Básico → Intermediário → Avançado</b>.</p>
      <div class="stat-row">
        <div class="stat"><small>Progresso geral</small><strong>${g.pct}%</strong>${progressBar(g.pct, true)}</div>
        <div class="stat"><small>Tópicos concluídos</small><strong>${g.feitos}/${g.total}</strong></div>
        <div class="stat"><small>Exercícios resolvidos</small><strong>${progressoExercicios(state.profile.progress).feitos}/${progressoExercicios(state.profile.progress).total}</strong></div>
        <div class="stat"><small>Tempo total</small><strong id="home-total">${human(state.profile.totalSeconds)}</strong></div>
      </div>
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
        <li><b>Não precisa decorar tudo.</b> A meta é você saber fazer as tarefas mais comuns e saber <a href="#/pesquisar">procurar</a> o resto.</li>
        <li>Em cada tópico: leia a explicação simples, clique em <b>▶ Testar no sandbox</b> para mexer no código, leia o caso real e treine a pergunta de entrevista.</li>
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
    <div class="track-grid">${lista.map((t, i) => cardTrilha(t, i + 1)).join("")}</div>`;
}

function viewTrilha(id, nivelId = "basico") {
  const t = TRILHAS.find((x) => x.id === id);
  if (!t) return viewInicio($("#view"));
  const nivel = NIVEIS.find((n) => n.id === nivelId) || NIVEIS[0];
  const prog = state.profile.progress || {};
  const p = progressoPorTrilha(prog).find((x) => x.trilha.id === t.id);
  const cat = trilhaCategoria(t.id);
  const bloco = t.niveis[nivel.id];

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

    <section class="docs">
      <h2>📚 Onde procurar quando não souber (${esc(t.nome)})</h2>
      <ul>${t.docs.map((d) => `<li><a href="${d.url}" target="_blank" rel="noopener">${esc(d.nome)}</a>${d.desc ? ` — <span class="muted">${d.desc}</span>` : ""}</li>`).join("")}</ul>
    </section>

    <nav class="level-nav">
      ${nivelVizinho(t, nivel, -1)}
      ${nivelVizinho(t, nivel, 1)}
    </nav>`;

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
      <div class="box kid"><h4>🧒 Explicando para uma criança de 5 anos</h4><p>${tp.crianca}</p></div>

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

      <div class="box work"><h4>💼 Caso real no trabalho</h4><p>${tp.trabalho}</p></div>

      <div class="box interview">
        <h4>🎤 Pergunta de entrevista</h4>
        <p class="q">“${esc(tp.entrevista.pergunta)}”</p>
        <button class="answer-btn btn tiny">Ver resposta</button>
        <div class="answer" hidden><p>${tp.entrevista.resposta}</p></div>
      </div>

      <div class="box search"><h4>🔎 Se travar, pesquise</h4><div class="chips">${busca}</div></div>

      <button class="done-btn btn ${feito ? "success" : "primary"}">${feito ? "✓ Concluído (desmarcar)" : "Marcar como concluído"}</button>
    </div>
  </details>`;
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
        ${s.crianca ? `<p class="kid-inline">🧒 ${s.crianca}</p>` : ""}
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
      <div class="stat"><small>Sessões</small><strong>${(state.profile.sessionsCount || 0) + 1}</strong></div>
    </div>
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
      <p class="muted small">${feito ? "✅ Você já resolveu este exercício." : "Coloque a mão na massa e verifique sua resposta automaticamente."}</p>
    </div>
    <a class="btn ${feito ? "ghost" : "primary"}" href="#/exercicio/${exId}">${feito ? "Rever" : "Resolver"} →</a>
  </section>`;
}

const ctxSandbox = () => ({
  uid: state.user.uid,
  onResolvido: async (exId) => {
    const k = chaveExercicio(exId);
    const prog = (state.profile.progress ||= {});
    if (prog[k]) return;
    prog[k] = new Date();
    try {
      await updateDoc(doc(db, "users", state.user.uid), { ["progress." + k]: serverTimestamp() });
    } catch (e) {
      console.error(e);
    }
  }
});

function montar(view, promessa) {
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
    view.innerHTML = `<h1>🧪 Sandbox</h1><div class="banner warn">Não foi possível abrir o sandbox: ${esc(e.message)}</div>`;
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
