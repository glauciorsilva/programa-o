const c = String.raw;

export default {
  id: "react",
  nome: "React",
  icone: "⚛️",
  cor: "#0ea5c6",
  dificuldade: 3,
  resumo: "Biblioteca JavaScript para construir interfaces com componentes reutilizáveis. Base de Next.js e React Native.",
  mercado: "O framework front-end mais pedido no Brasil e no exterior. Também abre portas para apps mobile com React Native.",
  docs: [
    { nome: "react.dev (oficial)", url: "https://react.dev/learn", desc: "tutorial oficial excelente" },
    { nome: "Vite", url: "https://vitejs.dev/guide/", desc: "crie o projeto com npm create vite@latest" },
    { nome: "React Router", url: "https://reactrouter.com/" },
    { nome: "TanStack Query", url: "https://tanstack.com/query/latest", desc: "buscar dados da API como gente grande" }
  ],
  niveis: {
    basico: {
      objetivo: "criar componentes, passar informações entre eles e reagir a cliques.",
      topicos: [
        {
          titulo: "Componentes e JSX",
          crianca: `Componentes são <b>peças de LEGO</b>. Você cria a peça “Botão”, a peça “Card de Produto”, a peça “Cabeçalho” e monta a página encaixando as peças. JSX é desenhar a peça com algo parecido com HTML, só que dentro do JavaScript.`,
          codigo: c`
// npm create vite@latest meu-app -- --template react
// cd meu-app && npm install && npm run dev

function Cabecalho() {
  return (
    <header className="topo">
      <h1>Minha Loja</h1>
    </header>
  );
}

export default function App() {
  const ano = new Date().getFullYear();
  return (
    <>
      <Cabecalho />
      <main>
        <p>Bem-vindo! Hoje é {new Date().toLocaleDateString("pt-BR")}</p>
      </main>
      <footer>© {ano}</footer>
    </>
  );
}`,
          nota: "No JSX: <code>className</code> em vez de <code>class</code>, chaves <code>{ }</code> para inserir JavaScript e um único elemento pai (ou fragmento <code>&lt;&gt;&lt;/&gt;</code>).",
          trabalho: `Um design system com <code>&lt;Botao&gt;</code>, <code>&lt;Modal&gt;</code> e <code>&lt;Input&gt;</code> reaproveitado em todas as telas. Mudou o botão? Muda em todo o app.`,
          entrevista: {
            pergunta: "O que é o Virtual DOM?",
            resposta: `É uma cópia leve da interface em memória. Quando o estado muda, o React gera uma nova versão, <b>compara</b> com a anterior (reconciliação) e aplica no DOM real só o que mudou, o que é mais eficiente do que redesenhar tudo.`
          },
          busca: ["react jsx regras", "vite react create", "react components tutorial"]
        },
        {
          titulo: "Props: passando informação",
          crianca: `Props são <b>recadinhos que o pai entrega ao filho</b>. A peça “Card” recebe “nome do produto” e “preço” e mostra na tela. O filho lê o recado, mas não pode mudar o que está escrito.`,
          codigo: c`
function CardProduto({ nome, preco, emPromocao = false }) {
  return (
    <div className="card">
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
      {emPromocao && <span className="tag">Promoção!</span>}
    </div>
  );
}

export default function Vitrine() {
  return (
    <section>
      <CardProduto nome="Fone Bluetooth" preco={129.9} emPromocao />
      <CardProduto nome="Carregador" preco={59} />
    </section>
  );
}`,
          trabalho: `O mesmo componente <code>CardProduto</code> serve para a vitrine, o carrinho e a busca, cada vez com props diferentes. A renderização condicional (<code>{cond &amp;&amp; ...}</code>) mostra os selos “Promoção” ou “Esgotado”.`,
          entrevista: {
            pergunta: "Qual a diferença entre props e state?",
            resposta: `<b>Props</b> vêm do componente pai e são somente leitura para o filho. <b>State</b> é a memória interna do componente, que ele mesmo pode alterar (com <code>setState</code>). Quando props ou state mudam, o componente renderiza de novo.`
          },
          busca: ["react props", "react conditional rendering", "props vs state"]
        },
        {
          titulo: "Estado com useState e eventos",
          crianca: `O estado é a <b>memória do brinquedo</b>. O contador lembra quantas vezes você apertou. Quando a memória muda, o React <b>redesenha</b> aquela parte da tela sozinho.`,
          codigo: c`
import { useState } from "react";

export default function Carrinho() {
  const [qtd, setQtd] = useState(1);
  const preco = 49.9;

  return (
    <div>
      <button onClick={() => setQtd((q) => Math.max(1, q - 1))}>−</button>
      <span> {qtd} </span>
      <button onClick={() => setQtd((q) => q + 1)}>+</button>
      <p>Total: R$ {(qtd * preco).toFixed(2)}</p>
    </div>
  );
}`,
          trabalho: `Quantidade no carrinho, abrir e fechar menu, aba selecionada, modal visível. O formato <code>setQtd(q =&gt; q + 1)</code> (função) é o jeito certo quando o novo valor depende do anterior.`,
          entrevista: {
            pergunta: "Por que não posso fazer qtd = qtd + 1 diretamente?",
            resposta: `Porque o React não percebe a mudança e não renderiza de novo. O estado deve ser tratado como <b>imutável</b> e alterado só pelo setter. Em objetos e arrays, crie cópias: <code>setLista([...lista, novo])</code>.`
          },
          busca: ["react useState", "react onClick", "react state immutability"]
        }
      ]
    },
    intermediario: {
      objetivo: "buscar dados de APIs, criar formulários e ter várias páginas no app.",
      topicos: [
        {
          titulo: "useEffect e buscar dados",
          crianca: `O <code>useEffect</code> é um <b>despertador</b>: “quando o brinquedo aparecer na tela, vá buscar os dados” ou “quando o CEP mudar, busque o endereço de novo”.`,
          codigo: c`
import { useEffect, useState } from "react";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controle = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controle.signal })
      .then((r) => r.json())
      .then(setUsuarios)
      .catch((e) => e.name !== "AbortError" && setErro(e.message))
      .finally(() => setCarregando(false));
    return () => controle.abort();   // limpeza ao sair da tela
  }, []);                            // [] = só na primeira vez

  if (carregando) return <p>Carregando…</p>;
  if (erro) return <p>Erro: {erro}</p>;
  return <ul>{usuarios.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
          trabalho: `Toda tela de listagem (clientes, pedidos, produtos) tem os três estados: <b>carregando, erro e dados</b>. Em projetos maiores, o time usa <b>TanStack Query</b> para cache e recarregamento automático, mas o conceito é este.`,
          entrevista: {
            pergunta: "O que significa o array de dependências do useEffect?",
            resposta: `Ele controla <b>quando</b> o efeito roda: sem array, roda a cada render; <code>[]</code>, só na montagem; <code>[cep]</code>, sempre que <code>cep</code> mudar. A função retornada faz a <b>limpeza</b> (cancelar requisição, remover listener, limpar timer).`
          },
          busca: ["react useEffect fetch", "useEffect dependency array", "tanstack query react"]
        },
        {
          titulo: "Listas, keys e formulários controlados",
          crianca: `Em uma fila de crianças, cada uma usa um <b>crachá com nome</b> (a <code>key</code>) para o React saber quem é quem quando a fila muda. No formulário controlado, o React <b>segura a caneta</b>: tudo o que você digita passa por ele.`,
          codigo: c`
import { useState } from "react";

export default function Tarefas() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);

  function adicionar(e) {
    e.preventDefault();
    if (!texto.trim()) return;
    setTarefas([...tarefas, { id: crypto.randomUUID(), texto }]);
    setTexto("");
  }

  const remover = (id) => setTarefas(tarefas.filter((t) => t.id !== id));

  return (
    <form onSubmit={adicionar}>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button>Adicionar</button>
      <ul>
        {tarefas.map((t) => (
          <li key={t.id}>{t.texto} <button type="button" onClick={() => remover(t.id)}>x</button></li>
        ))}
      </ul>
    </form>
  );
}`,
          trabalho: `Cadastro de clientes, filtros de busca, telas de edição. Em formulários grandes, o mercado usa <b>React Hook Form</b> com <b>Zod</b> para validação, e saber o básico controlado ajuda a entender essas bibliotecas.`,
          entrevista: {
            pergunta: "Por que não usar o índice do array como key?",
            resposta: `Se a lista for reordenada, filtrada ou tiver itens removidos, o índice muda e o React associa o estado ao item <b>errado</b> (inputs com valores trocados, por exemplo). Use um ID estável e único.`
          },
          busca: ["react list keys", "react controlled input", "react hook form zod"]
        },
        {
          titulo: "Rotas com React Router",
          crianca: `O app é um <b>prédio com várias salas</b>. O roteador é o <b>elevador</b>: você aperta “/produtos” e ele leva até a sala de produtos, sem precisar sair do prédio (sem recarregar a página).`,
          codigo: c`
// npm install react-router-dom
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Produto() {
  const { id } = useParams();
  return <h2>Produto #{id}</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Início</Link> | <Link to="/produtos/42">Produto 42</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/produtos/:id" element={<Produto />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}`,
          trabalho: `Painel administrativo com páginas de login, dashboard, clientes e detalhes do cliente (<code>/clientes/:id</code>). Rotas protegidas redirecionam para o login quem não está autenticado.`,
          entrevista: {
            pergunta: "O que é uma SPA e qual a desvantagem dela para SEO?",
            resposta: `SPA (Single Page Application) carrega um HTML só e troca o conteúdo com JavaScript. Como o HTML inicial vem quase vazio, alguns buscadores indexam mal. Por isso existe o <b>Next.js</b> (renderização no servidor) para sites públicos.`
          },
          busca: ["react router v6 tutorial", "react protected route", "spa vs ssr next.js"]
        }
      ]
    },
    avancado: {
      objetivo: "compartilhar estado global, otimizar performance e criar seus próprios hooks.",
      topicos: [
        {
          titulo: "Context API e estado global",
          crianca: `Passar recado de pai para filho, para neto, para bisneto… cansa! O <b>Context</b> é um <b>alto-falante da casa</b>: quem precisa da informação (usuário logado, tema) escuta direto, sem passar de mão em mão.`,
          codigo: c`
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const entrar = (dados) => setUsuario(dados);
  const sair = () => setUsuario(null);
  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Em qualquer componente:
function Topo() {
  const { usuario, sair } = useAuth();
  return usuario ? <button onClick={sair}>Sair ({usuario.nome})</button> : null;
}`,
          trabalho: `Usuário logado, carrinho, tema claro ou escuro e idioma são o uso típico de Context. Para estados muito grandes ou que mudam muito, as empresas usam <b>Zustand</b> ou <b>Redux Toolkit</b>.`,
          entrevista: {
            pergunta: "O que é prop drilling e como resolver?",
            resposta: `É passar props por vários níveis de componentes que não usam o dado, só para ele chegar lá embaixo. Resolve-se com Context, gerenciadores de estado (Zustand, Redux) ou reorganizando a composição de componentes (passando <code>children</code>).`
          },
          busca: ["react context api", "prop drilling", "zustand vs redux toolkit"]
        },
        {
          titulo: "Performance: memo, useMemo, useCallback",
          crianca: `Se você já fez a conta “2 + 2” e ninguém mudou os números, não precisa fazer de novo: é só <b>lembrar</b> que dá 4. É isso que o <code>useMemo</code> faz. O <code>memo</code> diz: “se meus recados (props) não mudaram, não precisa me redesenhar”.`,
          codigo: c`
import { memo, useMemo, useCallback, useState } from "react";

const Linha = memo(function Linha({ item, onRemover }) {
  return <li>{item.nome} <button onClick={() => onRemover(item.id)}>x</button></li>;
});

export default function Relatorio({ vendas }) {
  const [filtro, setFiltro] = useState("");

  const filtradas = useMemo(
    () => vendas.filter((v) => v.nome.toLowerCase().includes(filtro.toLowerCase())),
    [vendas, filtro]
  );

  const remover = useCallback((id) => console.log("remover", id), []);

  return (
    <>
      <input value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      <ul>{filtradas.map((v) => <Linha key={v.id} item={v} onRemover={remover} />)}</ul>
    </>
  );
}`,
          trabalho: `“A tabela com 5 mil linhas trava ao digitar no filtro.” Use o <b>React DevTools Profiler</b> para achar o gargalo e aplique <code>useMemo</code>, <code>memo</code> ou virtualização (<code>react-window</code>). Não saia memorizando tudo: meça antes.`,
          entrevista: {
            pergunta: "Qual a diferença entre useMemo e useCallback?",
            resposta: `<code>useMemo</code> memoriza um <b>valor calculado</b>. <code>useCallback</code> memoriza uma <b>função</b> (a mesma referência entre renders), o que é útil ao passá-la para um componente com <code>memo</code>. <code>useCallback(fn, deps)</code> é o mesmo que <code>useMemo(() =&gt; fn, deps)</code>.`
          },
          busca: ["react memo usememo usecallback", "react devtools profiler", "react-window virtualização"]
        },
        {
          titulo: "Hooks customizados e testes",
          crianca: `Se você sempre faz o mesmo truque de mágica, transforma ele em um <b>truque com nome</b>, que qualquer amigo pode usar. Hook customizado é isso: lógica reutilizável que começa com <code>use</code>.`,
          codigo: c`
import { useEffect, useState } from "react";

export function useFetch(url) {
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

// Uso: const { dados, carregando } = useFetch("/api/pedidos");

// Teste com Vitest + Testing Library:
// render(<Carrinho />);
// await userEvent.click(screen.getByText("+"));
// expect(screen.getByText(/Total: R\$ 99,80/)).toBeInTheDocument();`,
          trabalho: `Hooks como <code>useAuth</code>, <code>useDebounce</code> e <code>usePermissao</code> padronizam a lógica do time. Vagas pleno e sênior pedem testes com <b>Jest/Vitest + React Testing Library</b>.`,
          entrevista: {
            pergunta: "Quais são as regras dos Hooks?",
            resposta: `1) Chamar hooks só no <b>nível superior</b> do componente (nunca dentro de if, loop ou função interna). 2) Chamar hooks só em componentes React ou em outros hooks customizados. O React depende da <b>ordem</b> das chamadas para saber qual estado é qual.`
          },
          busca: ["react custom hooks", "rules of hooks", "react testing library vitest"]
        }
      ]
    }
  }
};
