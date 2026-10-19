import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p><b>React</b> é uma biblioteca JavaScript, criada pelo Facebook (Meta), para construir interfaces. A ideia central é dividir a tela em <b>componentes</b>: funções JavaScript que devolvem o que deve aparecer na tela. Componentes podem ser usados dentro de outros, como peças de montar, e cada um cuida da sua própria parte.</p>
<p>O que o componente devolve é escrito em <b>JSX</b>, uma sintaxe parecida com HTML dentro do JavaScript. O JSX é convertido em chamadas JavaScript antes de rodar. Algumas diferenças do HTML: <code>class</code> vira <code>className</code>, <code>for</code> vira <code>htmlFor</code>, todas as tags precisam ser fechadas (<code>&lt;img /&gt;</code>) e o componente deve devolver <b>um único elemento pai</b> (ou um fragmento <code>&lt;&gt;...&lt;/&gt;</code>).</p>
<p>Entre chaves <code>{ }</code> você coloca qualquer expressão JavaScript: variáveis, contas, chamadas de função. Nomes de componentes começam com <b>letra maiúscula</b> (<code>&lt;Cabecalho /&gt;</code>), senão o React acha que é uma tag HTML. Para criar um projeto, a ferramenta mais usada hoje é o <b>Vite</b>.</p>`,
      partes: [
        [c`// npm create vite@latest meu-app -- --template react`, "Comando que cria um projeto React novo com o Vite."],
        [c`function Cabecalho() {`, "Componente: uma função com nome em maiúscula."],
        [c`return ( <header className="topo"> <h1>Minha Loja</h1> </header> );`, "Devolve JSX. Note o `className` no lugar de `class`. Os parênteses permitem escrever em várias linhas."],
        [c`export default function App() {`, "Componente principal, exportado para ser usado no `main.jsx`."],
        [c`const ano = new Date().getFullYear();`, "Código JavaScript comum antes do `return`."],
        [c`<>`, "Fragmento: agrupa vários elementos sem criar uma tag a mais na página."],
        [c`<Cabecalho />`, "Usa o componente criado acima, como se fosse uma tag."],
        [c`{new Date().toLocaleDateString("pt-BR")}`, "Expressão JavaScript dentro do JSX: mostra a data de hoje no formato brasileiro."],
        [c`<footer>© {ano}</footer>`, "Insere o valor da variável `ano`."]
      ]
    },
    b2: {
      detalhes: `<p><b>Props</b> (propriedades) são os dados que um componente pai passa para um componente filho, escritos como atributos: <code>&lt;CardProduto nome="Fone" preco={129.9} /&gt;</code>. Textos vão entre aspas; qualquer outro valor (números, booleanos, objetos, funções) vai entre chaves.</p>
<p>O componente recebe todas as props em um único objeto, que normalmente é <b>desestruturado</b> na assinatura da função: <code>function CardProduto({ nome, preco })</code>. É possível definir valores padrão (<code>emPromocao = false</code>). Uma prop booleana escrita sem valor (<code>emPromocao</code>) vale <code>true</code>.</p>
<p>Props são <b>somente leitura</b>: o filho nunca deve alterá-las. Para mostrar algo apenas sob condição, usamos <code>{condição &amp;&amp; &lt;Elemento /&gt;}</code> ou o ternário <code>{condição ? &lt;A /&gt; : &lt;B /&gt;}</code>. Existe ainda a prop especial <code>children</code>, que é o conteúdo colocado entre a abertura e o fechamento do componente.</p>`,
      partes: [
        [c`function CardProduto({ nome, preco, emPromocao = false }) {`, "Recebe as props já desestruturadas; `emPromocao` é `false` se não for informada."],
        [c`<h3>{nome}</h3>`, "Mostra o nome recebido do componente pai."],
        [c`<p>R$ {preco.toFixed(2)}</p>`, "`toFixed(2)` formata o preço com duas casas decimais."],
        [c`{emPromocao && <span className="tag">Promoção!</span>}`, "Renderização condicional: o selo só aparece se `emPromocao` for verdadeiro."],
        [c`<CardProduto nome="Fone Bluetooth" preco={129.9} emPromocao />`, "Usa o card passando props. `emPromocao` sem valor vale `true`."],
        [c`<CardProduto nome="Carregador" preco={59} />`, "Mesmo componente, outros dados, sem selo de promoção."]
      ]
    },
    b3: {
      detalhes: `<p><b>Estado</b> (<i>state</i>) são os dados que um componente guarda e que podem mudar com o tempo, como a quantidade no carrinho ou se um menu está aberto. O hook <code>useState(valorInicial)</code> devolve um par: o valor atual e uma função para alterá-lo. Quando você chama essa função, o React <b>redesenha</b> o componente com o novo valor.</p>
<p>Nunca altere o estado diretamente (<code>qtd = qtd + 1</code> não funciona): use sempre a função setter. Quando o novo valor depende do anterior, passe uma função: <code>setQtd(q =&gt; q + 1)</code>; assim o React garante que está usando o valor mais recente. Para arrays e objetos, crie uma cópia nova (<code>[...lista, novo]</code>) em vez de modificar a existente.</p>
<p>Eventos no JSX são escritos em camelCase (<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>) e recebem uma <b>função</b>, não o resultado de uma função: <code>onClick={() =&gt; somar()}</code> está certo; <code>onClick={somar()}</code> executaria na hora de desenhar.</p>`,
      partes: [
        [c`import { useState } from "react";`, "Importa o hook de estado."],
        [c`const [qtd, setQtd] = useState(1);`, "Cria o estado `qtd` começando em 1 e a função `setQtd` para mudá-lo."],
        [c`const preco = 49.9;`, "Valor fixo, não é estado (nunca muda)."],
        [c`<button onClick={() => setQtd((q) => Math.max(1, q - 1))}>−</button>`, "Diminui 1, mas nunca abaixo de 1. Usa a forma de função para pegar o valor atual."],
        [c`<button onClick={() => setQtd((q) => q + 1)}>+</button>`, "Aumenta 1."],
        [c`<p>Total: R$ {(qtd * preco).toFixed(2)}</p>`, "Valor derivado: calculado a cada renderização a partir do estado, sem precisar de outro estado."]
      ]
    },
    i1: {
      detalhes: `<p>O hook <code>useEffect</code> executa um <b>efeito colateral</b> depois que o componente aparece na tela: buscar dados em uma API, iniciar um timer, ouvir eventos da janela, mudar o título da aba. Ele recebe uma função e um <b>array de dependências</b> que controla quando o efeito roda de novo.</p>
<ul>
<li>Sem array: roda depois de toda renderização (raramente desejado).</li>
<li><code>[]</code> (vazio): roda só uma vez, quando o componente aparece.</li>
<li><code>[cep]</code>: roda na primeira vez e sempre que <code>cep</code> mudar.</li>
</ul>
<p>A função devolvida pelo efeito é a <b>limpeza</b>: o React a chama antes de rodar o efeito de novo e quando o componente sai da tela. Use-a para cancelar requisições, limpar timers e remover ouvintes. Toda busca de dados deve tratar três situações na tela: <b>carregando</b>, <b>erro</b> e <b>dados</b>.</p>`,
      partes: [
        [c`const [usuarios, setUsuarios] = useState([]);`, "Estado para os dados, começando com lista vazia."],
        [c`const [carregando, setCarregando] = useState(true);`, "Estado de carregamento, verdadeiro no início."],
        [c`const [erro, setErro] = useState(null);`, "Estado para a mensagem de erro."],
        [c`useEffect(() => { … }, []);`, "Efeito que roda uma vez, quando o componente aparece."],
        [c`const controle = new AbortController();`, "Permite cancelar a requisição se o componente sair da tela."],
        [c`fetch(url, { signal: controle.signal }).then((r) => r.json()).then(setUsuarios)`, "Busca os dados, converte de JSON e salva no estado."],
        [c`.catch((e) => e.name !== "AbortError" && setErro(e.message))`, "Guarda o erro, ignorando o cancelamento proposital."],
        [c`.finally(() => setCarregando(false));`, "Com sucesso ou erro, termina o carregamento."],
        [c`return () => controle.abort();`, "Limpeza: cancela a requisição ao sair da tela."],
        [c`if (carregando) return <p>Carregando…</p>;`, "Mostra um aviso enquanto os dados não chegam."],
        [c`usuarios.map((u) => <li key={u.id}>{u.name}</li>)`, "Desenha um item para cada usuário, com `key` única."]
      ]
    },
    i2: {
      detalhes: `<p>Para mostrar listas, usamos <code>map</code> para transformar cada item em um elemento JSX. Cada elemento precisa de uma prop <code>key</code> <b>única e estável</b> (normalmente o id do item). É com ela que o React descobre quais itens foram adicionados, removidos ou reordenados, e atualiza só o necessário.</p>
<p>Em um <b>formulário controlado</b>, o valor do campo fica no estado do React: o <code>value</code> vem do estado e o <code>onChange</code> atualiza o estado a cada tecla. Assim o React é a “única fonte da verdade”, o que facilita validar, limpar e preencher campos.</p>
<p>No envio, o evento <code>onSubmit</code> do formulário recebe um objeto de evento; chamar <code>e.preventDefault()</code> impede que o navegador recarregue a página, que é o comportamento padrão de formulários HTML. Para formulários grandes, o mercado usa bibliotecas como <b>React Hook Form</b> com validação pelo <b>Zod</b>.</p>`,
      partes: [
        [c`const [texto, setTexto] = useState("");`, "Estado do campo de texto."],
        [c`const [tarefas, setTarefas] = useState([]);`, "Estado com a lista de tarefas."],
        [c`function adicionar(e) { e.preventDefault();`, "Função do envio; impede o recarregamento da página."],
        [c`if (!texto.trim()) return;`, "Ignora texto vazio ou só com espaços."],
        [c`setTarefas([...tarefas, { id: crypto.randomUUID(), texto }]);`, "Cria um array novo com a tarefa adicionada e um id único."],
        [c`setTexto("");`, "Limpa o campo."],
        [c`const remover = (id) => setTarefas(tarefas.filter((t) => t.id !== id));`, "Remove criando uma lista nova sem o item."],
        [c`<input value={texto} onChange={(e) => setTexto(e.target.value)} />`, "Campo controlado: mostra o estado e atualiza a cada tecla."],
        [c`<li key={t.id}>`, "A `key` identifica cada item da lista."],
        [c`<button type="button" onClick={() => remover(t.id)}>x</button>`, "`type=\"button\"` evita que este botão envie o formulário."]
      ]
    },
    i3: {
      detalhes: `<p>Uma aplicação React costuma ser uma <b>SPA</b> (<i>Single Page Application</i>): o navegador carrega uma única página HTML e o JavaScript troca o conteúdo conforme a navegação, sem recarregar. O <b>React Router</b> é a biblioteca que liga cada endereço (URL) a um componente.</p>
<p>O <code>&lt;BrowserRouter&gt;</code> envolve a aplicação e usa os endereços reais do navegador. Dentro de <code>&lt;Routes&gt;</code>, cada <code>&lt;Route path="..." element={...} /&gt;</code> diz qual componente mostrar para cada caminho. O caminho <code>*</code> pega qualquer endereço não encontrado (página 404). Para navegar, usamos <code>&lt;Link to="..."&gt;</code> em vez de <code>&lt;a href&gt;</code>, para não recarregar a página.</p>
<p>Partes variáveis do caminho, como <code>/produtos/:id</code>, são lidas com o hook <code>useParams()</code>. Para navegar por código (após um login, por exemplo), existe o <code>useNavigate()</code>. No sandbox usamos <code>MemoryRouter</code>, que guarda a navegação na memória em vez da barra de endereço.</p>`,
      partes: [
        [c`import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";`, "Importa as peças do React Router."],
        [c`const { id } = useParams();`, "Lê a parte variável `:id` do endereço atual."],
        [c`<BrowserRouter>`, "Ativa o roteamento usando a barra de endereço do navegador."],
        [c`<Link to="/produtos/42">Produto 42</Link>`, "Link interno: troca a página sem recarregar."],
        [c`<Routes>`, "Agrupa as rotas; mostra a primeira que combinar com o endereço."],
        [c`<Route path="/" element={<h2>Home</h2>} />`, "Na raiz do site, mostra a Home."],
        [c`<Route path="/produtos/:id" element={<Produto />} />`, "Para `/produtos/qualquer-coisa`, mostra o componente `Produto`."],
        [c`<Route path="*" element={<h2>Página não encontrada</h2>} />`, "Qualquer outro endereço: página 404."]
      ]
    },
    a1: {
      detalhes: `<p>Quando um dado é usado por muitos componentes em níveis diferentes (usuário logado, tema, idioma, carrinho), passar props de pai para filho em vários níveis fica trabalhoso: isso é o <b>prop drilling</b>. A <b>Context API</b> resolve criando um “canal” que qualquer componente dentro dele pode ler.</p>
<p>São três passos: criar o contexto com <code>createContext()</code>; envolver a parte da aplicação com o <code>&lt;Contexto.Provider value={...}&gt;</code>, que fornece os dados; e ler os dados nos componentes com <code>useContext(Contexto)</code>. É comum criar um componente Provider próprio, com o estado dentro, e um hook personalizado (<code>useAuth</code>) para facilitar o uso.</p>
<p>Atenção: quando o <code>value</code> do Provider muda, todos os componentes que usam aquele contexto são redesenhados. Para estados globais grandes ou que mudam com muita frequência, bibliotecas como <b>Zustand</b> e <b>Redux Toolkit</b> são mais eficientes.</p>`,
      partes: [
        [c`const AuthContext = createContext(null);`, "Cria o contexto; `null` é o valor usado fora de um Provider."],
        [c`export function AuthProvider({ children }) {`, "Componente que vai envolver a aplicação; `children` é o que estiver dentro dele."],
        [c`const [usuario, setUsuario] = useState(null);`, "O estado global fica aqui dentro."],
        [c`const entrar = (dados) => setUsuario(dados); const sair = () => setUsuario(null);`, "Funções que mudam o estado, disponibilizadas para toda a aplicação."],
        [c`<AuthContext.Provider value={{ usuario, entrar, sair }}>`, "Fornece o usuário e as funções para todos os componentes dentro dele."],
        [c`export const useAuth = () => useContext(AuthContext);`, "Hook de atalho: qualquer componente chama `useAuth()`."],
        [c`const { usuario, sair } = useAuth();`, "Lê os dados globais sem receber props."]
      ]
    },
    a2: {
      detalhes: `<p>Sempre que o estado ou as props de um componente mudam, ele é <b>re-renderizado</b>, e seus filhos também, por padrão. Na maioria das telas isso é rápido e não causa problema. Em listas grandes ou cálculos pesados, porém, renderizações desnecessárias podem travar a interface.</p>
<ul>
<li><code>React.memo(Componente)</code>: pula a re-renderização se as props forem as mesmas.</li>
<li><code>useMemo(() =&gt; cálculo, [deps])</code>: guarda o resultado de um cálculo e só refaz quando as dependências mudam.</li>
<li><code>useCallback(fn, [deps])</code>: guarda a mesma função entre renderizações, para não “enganar” o <code>memo</code> com uma função nova a cada vez.</li>
</ul>
<p>Essas otimizações também têm custo. A regra é <b>medir antes</b> com o Profiler do React DevTools e otimizar só onde há lentidão. Para listas com milhares de itens, a técnica de <b>virtualização</b> (bibliotecas como <code>react-window</code>) desenha só os itens visíveis na tela.</p>`,
      partes: [
        [c`const Linha = memo(function Linha({ item, onRemover }) { … });`, "Componente memorizado: só redesenha se `item` ou `onRemover` mudarem."],
        [c`const [filtro, setFiltro] = useState("");`, "Texto digitado no filtro."],
        [c`const filtradas = useMemo(() => vendas.filter(…), [vendas, filtro]);`, "Só refaz o filtro quando `vendas` ou `filtro` mudarem."],
        [c`const remover = useCallback((id) => console.log("remover", id), []);`, "A mesma função é reaproveitada em toda renderização, então o `memo` das linhas funciona."],
        [c`<Linha key={v.id} item={v} onRemover={remover} />`, "Cada linha recebe props estáveis e evita redesenhos desnecessários."]
      ]
    },
    a3: {
      detalhes: `<p>Um <b>hook customizado</b> é uma função cujo nome começa com <code>use</code> e que usa outros hooks dentro dela. Serve para extrair lógica repetida dos componentes: buscar dados, controlar um formulário, ler o tamanho da tela, verificar permissões. Cada componente que usa o hook ganha seu <b>próprio</b> estado; o que se compartilha é a lógica, não os dados.</p>
<p>As <b>regras dos hooks</b>: chame hooks só no nível de cima do componente (nunca dentro de <code>if</code>, laços ou funções internas) e só em componentes ou outros hooks. O React identifica cada hook pela <b>ordem</b> das chamadas; mudar essa ordem embaralharia os estados.</p>
<p>Para garantir que tudo continua funcionando após mudanças, escrevemos <b>testes</b>. Com <b>Vitest</b> (ou Jest) e a <b>React Testing Library</b>, o teste desenha o componente, simula ações do usuário (cliques, digitação) e verifica o que aparece na tela, como um usuário faria.</p>`,
      partes: [
        [c`export function useFetch(url) {`, "Hook customizado: começa com `use` e recebe o endereço a buscar."],
        [c`const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });`, "Um único estado com as três situações."],
        [c`let ativo = true;`, "Marca se o componente ainda está esperando esta resposta."],
        [c`if (!r.ok) throw new Error(r.status);`, "Transforma respostas 404/500 em erro."],
        [c`.then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))`, "Só atualiza se a resposta ainda for relevante."],
        [c`return () => { ativo = false; };`, "Limpeza: ignora respostas antigas se a URL mudar ou o componente sair."],
        [c`}, [url]);`, "Refaz a busca sempre que a URL mudar."],
        [c`return estado;`, "Quem usa o hook recebe `{ dados, carregando, erro }`."],
        [c`// await userEvent.click(screen.getByText("+"));`, "Num teste, simula o clique no botão “+”."],
        [c`// expect(screen.getByText(/Total: R\$ 99,80/)).toBeInTheDocument();`, "Verifica se o texto esperado apareceu na tela."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("O que é um componente React?", ["Um arquivo CSS", "Uma função que devolve o que deve aparecer na tela (JSX)", "Um banco de dados", "Uma tag HTML nova do navegador"], 1, "Componentes são as peças da interface e podem ser reutilizados."),
      l("Em JSX, complete o atributo que substitui o `class` do HTML:", c`<div ____="caixa">Olá</div>`, "className", "`class` é palavra reservada do JavaScript, por isso o JSX usa `className`."),
      m("Como mostrar o valor da variável `nome` dentro do JSX?", ["`<p>nome</p>`", "`<p>{nome}</p>`", "`<p>$nome</p>`", "`<p>{{nome}}</p>`"], 1, "Chaves inserem expressões JavaScript no JSX."),
      m("Por que o nome de um componente deve começar com letra maiúscula?", ["É só estética", "Para o React diferenciar componentes de tags HTML", "Para funcionar no celular", "Para ser mais rápido"], 1, "`<cabecalho />` seria tratado como tag HTML desconhecida."),
      m("O que são props?", ["Estilos do componente", "Dados passados do componente pai para o filho", "Variáveis globais", "Eventos do mouse"], 1, "Props são somente leitura para o componente que as recebe."),
      vf("Um componente filho pode alterar diretamente as props que recebeu.", false, "Props são somente leitura. Para mudar algo, o pai precisa fornecer uma função."),
      m("O que `{emPromocao && <span>Promoção</span>}` faz?", ["Sempre mostra o span", "Mostra o span só se `emPromocao` for verdadeiro", "Dá erro", "Esconde a página"], 1, "É a renderização condicional mais comum."),
      l("Complete para criar o estado `qtd` começando em 0:", c`const [qtd, setQtd] = ____(0);`, "useState", "`useState` devolve o valor atual e a função para mudá-lo."),
      m("Qual forma é correta para somar 1 ao estado usando o valor anterior?", ["`qtd = qtd + 1`", "`setQtd(qtd++)`", "`setQtd((q) => q + 1)`", "`useState(qtd + 1)`"], 2, "Alterar o estado diretamente não redesenha o componente."),
      m("Qual escrita de evento está correta no JSX?", ["`onclick=\"somar()\"`", "`onClick={somar()}`", "`onClick={() => somar()}`", "`click={somar}`"], 2, "Passe uma função. `onClick={somar()}` executaria a função na hora de desenhar.")
    ],
    intermediario: [
      m("Quando roda um `useEffect` com array de dependências vazio `[]`?", ["A cada renderização", "Só uma vez, quando o componente aparece", "Nunca", "Só quando há erro"], 1, "Com `[cep]`, rodaria também quando `cep` mudasse."),
      m("Para que serve a função devolvida dentro do `useEffect`?", ["Mostrar dados", "Fazer a limpeza (cancelar requisição, limpar timer)", "Criar estado", "Exportar o componente"], 1, "É chamada antes de o efeito rodar de novo e quando o componente sai da tela."),
      l("Complete o array de dependências para refazer a busca sempre que `cep` mudar:", c`useEffect(() => { buscar(cep); }, [____]);`, "cep", "O efeito roda de novo quando algum valor do array muda."),
      m("Por que cada item de uma lista precisa de `key`?", ["Para estilizar", "Para o React identificar cada item ao atualizar a lista", "Para ordenar", "Para o SEO"], 1, "A `key` deve ser única e estável, como o id do item."),
      vf("Usar o índice do array como `key` é sempre seguro.", false, "Se a lista for reordenada ou tiver itens removidos, o índice muda e o React pode associar o estado ao item errado."),
      m("O que é um campo controlado?", ["Um campo desabilitado", "Um campo cujo valor vem do estado e é atualizado pelo `onChange`", "Um campo com senha", "Um campo obrigatório"], 1, "Assim o React é a única fonte da verdade do valor."),
      l("Complete para impedir que o formulário recarregue a página:", c`function enviar(e) {
  e.____();
}`, ["preventDefault", "preventDefault()"], "O comportamento padrão de um `<form>` é recarregar a página ao enviar."),
      m("Qual componente do React Router cria um link sem recarregar a página?", ["`<a>`", "`<Link>`", "`<Route>`", "`<Go>`"], 1, "`<Link to=\"/caminho\">` troca a tela internamente."),
      m("Como ler o `:id` da rota `/produtos/:id`?", ["`useState()`", "`useParams()`", "`useEffect()`", "`props.url`"], 1, "`const { id } = useParams();`"),
      m("O que significa SPA?", ["Single Page Application: o conteúdo muda sem recarregar a página", "Site Para Apresentação", "Servidor de Páginas Avançado", "Style Page Archive"], 0, "React normalmente gera SPAs; o Next.js adiciona renderização no servidor.")
    ],
    avancado: [
      m("Qual problema a Context API resolve?", ["Lentidão do CSS", "Passar props por muitos níveis (prop drilling)", "Erros de sintaxe", "Falta de internet"], 1, "Componentes leem o contexto diretamente, sem receber props intermediárias."),
      l("Complete para ler um contexto dentro do componente:", c`const auth = ____(AuthContext);`, "useContext", "`useContext` devolve o `value` do Provider mais próximo."),
      m("Qual componente fornece os dados de um contexto aos filhos?", ["`<Context.Consumer>`", "`<Context.Provider>`", "`<Context.Store>`", "`<Context.Root>`"], 1, "Todos os componentes dentro do Provider enxergam o `value`."),
      m("Para que serve `useMemo`?", ["Guardar o resultado de um cálculo e só refazer quando as dependências mudarem", "Criar estado", "Fazer requisições", "Criar rotas"], 0, "Útil para cálculos pesados, como filtrar listas grandes."),
      m("Qual a diferença entre `useMemo` e `useCallback`?", ["Nenhuma", "`useMemo` memoriza um valor; `useCallback` memoriza uma função", "`useCallback` é mais antigo", "`useMemo` só funciona com números"], 1, "`useCallback(fn, deps)` equivale a `useMemo(() => fn, deps)`."),
      vf("Devemos aplicar `memo`, `useMemo` e `useCallback` em todos os componentes por precaução.", false, "Otimizações têm custo. Meça com o Profiler e otimize só onde há lentidão."),
      m("Qual destas é uma regra dos hooks?", ["Hooks podem ser chamados dentro de `if`", "Hooks devem ser chamados sempre no nível de cima do componente", "Hooks só funcionam em classes", "Hooks precisam começar com `get`"], 1, "O React depende da ordem das chamadas para identificar cada hook."),
      l("Complete o início do nome de um hook customizado:", c`function ____Fetch(url) { /* ... */ }`, "use", "Por convenção (e para as ferramentas de lint), hooks começam com `use`."),
      m("Dois componentes usam o mesmo hook customizado `useFetch`. Eles compartilham o mesmo estado?", ["Sim, sempre", "Não, cada um tem o seu próprio estado", "Só se estiverem na mesma página", "Só em produção"], 1, "O hook compartilha a lógica, não os dados. Para dados compartilhados, use Context."),
      m("Qual ferramenta é muito usada para testar componentes como o usuário os vê?", ["React Testing Library", "Photoshop", "MySQL", "Webpack"], 0, "Ela renderiza o componente, simula interações e verifica o que aparece na tela.")
    ]
  }
};
