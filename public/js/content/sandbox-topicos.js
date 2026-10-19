// Ajustes para abrir os exemplos dos tópicos no sandbox.
// Por padrão, o exemplo abre na linguagem da trilha com o próprio código do tópico.
//   false            → não roda no navegador (motivo explica o porquê)
//   { lang }         → outra linguagem do sandbox (ex.: 'ts', 'web')
//   { html, css }    → HTML/CSS de apoio (exemplos de CSS e de DOM)
//   { codigo }       → versão adaptada do exemplo para rodar no navegador
//   { entrada }      → valores para input() do Python
//   { db: 'vazio' }  → SQL começa com banco vazio
import { TRILHAS } from "./index.js";
import { TRILHA_LANG } from "../sandbox/langs.js";

const c = String.raw;

const SERVIDOR = "Este exemplo sobe um servidor web, e servidores não rodam dentro do navegador. Copie o código e rode no seu computador.";
const ADMIN_MYSQL = "Este exemplo usa recursos de administração do servidor MySQL, que não existem no sandbox. Para praticar, instale o MySQL (ou use Docker) no seu computador.";

export const AJUSTES = {
  /* ---- CSS: HTML de apoio para ver o estilo funcionando ---- */
  css_b1: { html: c`<header id="cabecalho"><h1>Loja da Ana</h1></header>
<p>Produto em destaque:</p>
<button class="botao-comprar">Comprar agora</button>` },
  css_b2: { html: c`<div class="card">
  <h3>Card de exemplo</h3>
  <p>Abra o DevTools (F12) e inspecione as camadas do box model.</p>
</div>` },
  css_b3: { html: c`<div class="container">
  <h1>Título responsivo com clamp()</h1>
  <p>Redimensione a janela: o título cresce e diminui dentro dos limites.</p>
</div>` },
  css_i1: { html: c`<nav class="menu"><strong>Logo</strong><div><a href="#">Início</a> <a href="#">Contato</a></div></nav>
<div class="centro" style="min-height:200px;background:#eef"><p>Centralizado!</p></div>
<div class="cards"><div style="background:#fde">1</div><div style="background:#dfe">2</div><div style="background:#def">3</div></div>` },
  css_i2: { html: c`<div class="galeria">
  <div style="background:#fde;padding:30px">1</div><div style="background:#dfe;padding:30px">2</div>
  <div style="background:#def;padding:30px">3</div><div style="background:#ffd;padding:30px">4</div>
</div>
<div class="pagina" style="min-height:200px;margin-top:16px">
  <nav style="background:#1e293b;color:#fff">menu</nav>
  <header style="background:#e0e7ff">topo</header>
  <main style="background:#f8fafc">conteúdo</main>
</div>` },
  css_i3: { html: c`<div class="colunas">
  <div style="background:#fde;padding:20px">Coluna 1</div>
  <div style="background:#dfe;padding:20px">Coluna 2</div>
  <div style="background:#def;padding:20px">Coluna 3</div>
</div>
<p>Diminua a largura da tela para ver as colunas empilharem.</p>` },
  css_a1: { html: c`<p>Texto com as cores do tema.</p>
<button class="botao" style="color:#fff;border:0;padding:8px 16px">Botão</button>
<button onclick="document.documentElement.dataset.tema = document.documentElement.dataset.tema === 'escuro' ? '' : 'escuro'">Alternar tema</button>` },
  css_a2: { html: c`<div class="card" style="padding:16px;border:1px solid #ddd;border-radius:12px;width:220px">Passe o mouse aqui</div>
<br><div class="carregando"></div>` },
  css_a3: { html: c`<div class="card">
  <h3 class="card__titulo">Título</h3>
  <button class="card__botao card__botao--destaque">Comprar</button>
</div>` },

  /* ---- JavaScript ---- */
  javascript_i1: {
    lang: "web",
    html: c`<input id="tarefa" placeholder="Nova tarefa">
<button id="add">Adicionar</button>
<ul id="lista"></ul>`,
    css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
li { cursor: pointer; }
.feito { text-decoration: line-through; color: #888; }`
  },
  javascript_a1: { lang: "ts" },
  javascript_a2: false,

  /* ---- Python ---- */
  python_b1: { entrada: "21" },
  python_a2: {
    codigo: c`import pandas as pd   # no sandbox o pandas é baixado automaticamente

df = pd.read_csv("vendas.csv")             # arquivo de exemplo do sandbox
print(df.head())
print(df.info())

df["data"] = pd.to_datetime(df["data"])
df["valor"] = pd.to_numeric(df["valor"].astype(str).str.replace(",", "."), errors="coerce")
df = df.dropna(subset=["valor"])           # remove valores inválidos

resumo = (df[df["status"] == "pago"]
          .groupby("cidade")["valor"]
          .agg(["count", "sum", "mean"])
          .sort_values("sum", ascending=False))

print(resumo)`
  },
  python_a3: false,

  /* ---- React ---- */
  react_i3: {
    codigo: c`// No sandbox usamos MemoryRouter (no seu projeto, use BrowserRouter)
import { MemoryRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Produto() {
  const { id } = useParams();
  return <h2>Produto #{id}</h2>;
}

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/">Início</Link> | <Link to="/produtos/42">Produto 42</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/produtos/:id" element={<Produto />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </MemoryRouter>
  );
}`
  },
  react_a1: {
    codigo: c`import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const entrar = (dados) => setUsuario(dados);
  const sair = () => setUsuario(null);
  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

function Topo() {
  const { usuario, entrar, sair } = useAuth();
  return usuario
    ? <button onClick={sair}>Sair ({usuario.nome})</button>
    : <button onClick={() => entrar({ nome: "Ana" })}>Entrar como Ana</button>;
}

function Saudacao() {
  const { usuario } = useAuth();
  return <p>{usuario ? "Bem-vinda, " + usuario.nome + "!" : "Você não está logado."}</p>;
}

export default function App() {
  return (
    <AuthProvider>
      <Topo />
      <Saudacao />
    </AuthProvider>
  );
}`
  },
  react_a2: {
    codigo: c`import { memo, useMemo, useCallback, useState } from "react";

const Linha = memo(function Linha({ item, onRemover }) {
  return <li>{item.nome} <button onClick={() => onRemover(item.id)}>x</button></li>;
});

function Relatorio({ vendas }) {
  const [filtro, setFiltro] = useState("");

  const filtradas = useMemo(
    () => vendas.filter((v) => v.nome.toLowerCase().includes(filtro.toLowerCase())),
    [vendas, filtro]
  );

  const remover = useCallback((id) => console.log("remover", id), []);

  return (
    <>
      <input placeholder="Filtrar" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      <ul>{filtradas.map((v) => <Linha key={v.id} item={v} onRemover={remover} />)}</ul>
    </>
  );
}

const VENDAS = [
  { id: 1, nome: "Ana" }, { id: 2, nome: "Bruno" }, { id: 3, nome: "Carla" }, { id: 4, nome: "Anderson" },
];

export default function App() {
  return <Relatorio vendas={VENDAS} />;
}`
  },
  react_a3: {
    codigo: c`import { useEffect, useState } from "react";

function useFetch(url) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });

  useEffect(() => {
    let ativo = true;
    setEstado((s) => ({ ...s, carregando: true }));
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))
      .catch((erro) => ativo && setEstado({ dados: null, carregando: false, erro }));
    return () => { ativo = false; };
  }, [url]);

  return estado;
}

export default function App() {
  const [id, setId] = useState(1);
  const { dados, carregando, erro } = useFetch("https://jsonplaceholder.typicode.com/users/" + id);
  return (
    <div>
      <button onClick={() => setId((n) => Math.max(1, n - 1))}>◀</button>
      <span> Usuário {id} </span>
      <button onClick={() => setId((n) => n + 1)}>▶</button>
      {carregando && <p>Carregando…</p>}
      {erro && <p>Erro: {String(erro.message)}</p>}
      {dados && <p><b>{dados.name}</b> — {dados.email}</p>}
    </div>
  );
}`
  },

  /* ---- SQL / MySQL ---- */
  sql_i3: { db: "vazio" },
  mysql_b1: { db: "vazio" },
  mysql_b2: { db: "vazio" },
  mysql_i1: false,
  mysql_i3: false,
  mysql_a1: false,
  mysql_a2: false,
  mysql_a3: false
};

const MOTIVOS = {
  javascript_a2: SERVIDOR,
  python_a3: SERVIDOR,
  mysql_i1: ADMIN_MYSQL, mysql_i3: ADMIN_MYSQL, mysql_a1: ADMIN_MYSQL, mysql_a2: ADMIN_MYSQL, mysql_a3: ADMIN_MYSQL
};

/** Monta as opções de sandbox para um tópico, ou { indisponivel } com o motivo. */
export function sandboxDoTopico(topicoId) {
  const trilha = TRILHAS.find((t) => topicoId.startsWith(t.id + "_"));
  if (!trilha) return null;
  let topico = null;
  for (const n of Object.values(trilha.niveis)) topico ||= n.topicos.find((tp) => tp.id === topicoId);
  if (!topico) return null;

  const aj = AJUSTES[topicoId];
  if (aj === false) return { trilha, topico, indisponivel: MOTIVOS[topicoId] || "Este exemplo não roda no navegador." };
  const lang = aj?.lang || TRILHA_LANG[trilha.id];
  const codigo = (aj?.codigo ?? topico.codigo).trim();
  let inicial = codigo;
  if (lang === "web") {
    if (trilha.id === "css") inicial = { html: aj?.html || "", css: aj?.css ?? codigo, js: "" };
    else if (trilha.id === "html") inicial = { html: codigo, css: "body { font-family: system-ui, sans-serif; padding: 16px; }", js: "" };
    else inicial = { html: aj?.html || "", css: aj?.css || "", js: codigo };
  }
  return { trilha, topico, lang, inicial, entrada: aj?.entrada, db: aj?.db };
}
