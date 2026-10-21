// Exercícios de código da trilha react (completar e criar do zero), por tópico.
const c = String.raw;

export default {
  /* ======================= b1: Componentes e JSX ======================= */
  b1: [
    {
      tipo: "completar",
      titulo: "Cabeçalho da padaria",
      enunciado: c`A Padaria Pão Quente quer um site. O componente <code>Cabecalho</code> já existe, mas falta usá-lo e ajustar o JSX.
        <ul>
          <li>o <code>&lt;header&gt;</code> deve ter a classe CSS <code>topo</code> (lembre que no JSX o atributo é outro);</li>
          <li>o <code>App</code> deve mostrar o componente <code>Cabecalho</code>;</li>
          <li>o parágrafo deve mostrar <b>“Aberto das 7h às 19h”</b> usando a variável <code>horario</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`No JSX, <code>class</code> vira <code>className</code>. Um componente é usado como tag: <code>&lt;Nome /&gt;</code>. Variáveis entram entre chaves.`,
      lang: "react",
      inicial: c`function Cabecalho() {
  return (
    <header ____="topo">
      <h1>Padaria Pão Quente</h1>
    </header>
  );
}

export default function App() {
  const horario = "7h às 19h";
  return (
    <>
      <____ />
      <p>Aberto das {____}</p>
    </>
  );
}
`,
      solucao: c`function Cabecalho() {
  return (
    <header className="topo">
      <h1>Padaria Pão Quente</h1>
    </header>
  );
}

export default function App() {
  const horario = "7h às 19h";
  return (
    <>
      <Cabecalho />
      <p>Aberto das {horario}</p>
    </>
  );
}`,
      teste: c`
var h = document.querySelector("header");
__assert(h, "O <header> do componente Cabecalho não apareceu. Você usou <Cabecalho /> dentro do App?");
__assert(h.className === "topo", 'O <header> deveria ter a classe "topo" (use className), mas tem "' + h.className + '".');
__assert(/Padaria Pão Quente/.test(h.textContent), "O título da padaria deveria aparecer dentro do header.");
__assert(/Aberto das 7h às 19h/.test(__texto()), 'O parágrafo deveria mostrar "Aberto das 7h às 19h".');`,
      padroes: [[/\{\s*horario\s*\}/, "Mostre o horário usando a variável horario entre chaves: {horario}."]]
    },
    {
      tipo: "completar",
      titulo: "Resumo do pedido com expressões",
      enunciado: c`Na tela de resumo do pedido, o JSX precisa calcular valores com JavaScript entre chaves.
        <ul>
          <li>o título deve mostrar o nome do cliente em <b>maiúsculas</b>: <b>“Pedido de MARIANA”</b>;</li>
          <li>o total deve ser <code>preco</code> vezes <code>quantidade</code>, com 2 casas: <b>“Total: R$ 25.50”</b>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Textos têm o método <code>toUpperCase()</code>. Para multiplicar, use as duas variáveis dentro das chaves.`,
      lang: "react",
      inicial: c`export default function App() {
  const cliente = "mariana";
  const preco = 8.5;
  const quantidade = 3;

  return (
    <div>
      <h2>Pedido de {cliente.____()}</h2>
      <p>Quantidade: {quantidade}</p>
      <p>Total: R$ {(preco * ____).toFixed(2)}</p>
    </div>
  );
}
`,
      solucao: c`export default function App() {
  const cliente = "mariana";
  const preco = 8.5;
  const quantidade = 3;

  return (
    <div>
      <h2>Pedido de {cliente.toUpperCase()}</h2>
      <p>Quantidade: {quantidade}</p>
      <p>Total: R$ {(preco * quantidade).toFixed(2)}</p>
    </div>
  );
}`,
      teste: c`
var t = __texto();
__assert(/Pedido de MARIANA/.test(t), 'O título deveria ser "Pedido de MARIANA" (nome em maiúsculas).');
__assert(/Total: R\$ 25\.50/.test(t), 'O total deveria ser "Total: R$ 25.50" (8.5 x 3).');`,
      padroes: [[/preco\s*\*\s*quantidade|quantidade\s*\*\s*preco/, "Calcule o total multiplicando preco por quantidade."]]
    },
    {
      tipo: "completar",
      titulo: "Formulário de agendamento da clínica",
      enunciado: c`A Clínica Bem-Estar tem uma tela de agendamento. Complete o JSX:
        <ul>
          <li>o <code>&lt;label&gt;</code> deve apontar para o campo de id <code>paciente</code> (no HTML seria <code>for</code>);</li>
          <li>o <code>&lt;input&gt;</code> deve ter a classe CSS <code>campo</code>;</li>
          <li>o componente <code>Rodape</code> deve aparecer no fim da página.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`No JSX, <code>for</code> vira <code>htmlFor</code> e <code>class</code> vira <code>className</code>.`,
      lang: "react",
      inicial: c`function Rodape() {
  return <footer>Clínica Bem-Estar - atendimento de segunda a sexta</footer>;
}

export default function App() {
  return (
    <main>
      <h1>Agendamento</h1>
      <label ____="paciente">Nome do paciente</label>
      <input id="paciente" ____="campo" />
      <____ />
    </main>
  );
}
`,
      solucao: c`function Rodape() {
  return <footer>Clínica Bem-Estar - atendimento de segunda a sexta</footer>;
}

export default function App() {
  return (
    <main>
      <h1>Agendamento</h1>
      <label htmlFor="paciente">Nome do paciente</label>
      <input id="paciente" className="campo" />
      <Rodape />
    </main>
  );
}`,
      teste: c`
var lb = document.querySelector("label"), inp = document.querySelector("input");
__assert(lb && inp, "O label e o input precisam aparecer na tela.");
__assert(lb.htmlFor === "paciente", 'O label deveria apontar para "paciente" (use htmlFor).');
__assert(inp.className === "campo", 'O input deveria ter a classe "campo" (use className).');
var f = document.querySelector("footer");
__assert(f && /Clínica Bem-Estar/.test(f.textContent), "O componente Rodape deveria aparecer (use <Rodape />).");`
    },
    {
      tipo: "criar",
      titulo: "Cartão de visita da oficina",
      enunciado: c`Crie o cartão de visita da <b>Oficina do Zé</b> montando a tela com componentes:
        <ul>
          <li>componente <code>Logo</code> que devolve <code>&lt;h1 className="logo"&gt;Oficina do Zé&lt;/h1&gt;</code>;</li>
          <li>componente <code>Contato</code> que devolve um parágrafo <b>“WhatsApp: (11) 99999-0000”</b>;</li>
          <li>o <code>App</code> devolve uma <code>&lt;div&gt;</code> com a classe <code>cartao</code> contendo <code>&lt;Logo /&gt;</code> e <code>&lt;Contato /&gt;</code>, nessa ordem.</li>
        </ul>`,
      dica: c`Cada componente é uma função com nome em <b>maiúscula</b> que dá <code>return</code> em um JSX.`,
      lang: "react",
      inicial: c`// Crie aqui os componentes Logo e Contato

export default function App() {
  // devolva a div "cartao" com <Logo /> e <Contato />
  return <div></div>;
}
`,
      solucao: c`function Logo() {
  return <h1 className="logo">Oficina do Zé</h1>;
}

function Contato() {
  return <p>WhatsApp: (11) 99999-0000</p>;
}

export default function App() {
  return (
    <div className="cartao">
      <Logo />
      <Contato />
    </div>
  );
}`,
      teste: c`
var cart = document.querySelector("div.cartao");
__assert(cart, 'Falta a <div> com className="cartao".');
var h1 = cart.querySelector("h1.logo");
__assert(h1, 'Dentro do cartão deveria haver o <h1 className="logo"> do componente Logo.');
__assert(h1.textContent.trim() === "Oficina do Zé", 'O h1 deveria dizer "Oficina do Zé".');
var p = cart.querySelector("p");
__assert(p && p.textContent.trim() === "WhatsApp: (11) 99999-0000", 'O parágrafo deveria ser "WhatsApp: (11) 99999-0000".');
__assert(cart.firstElementChild === h1, "O Logo deve vir antes do Contato.");`,
      padroes: [
        [/function\s+Logo\s*\(/, "Crie o componente function Logo()."],
        [/function\s+Contato\s*\(/, "Crie o componente function Contato()."],
        [/<Logo\s*\/>/, "Use o componente no App: <Logo />."],
        [/<Contato\s*\/>/, "Use o componente no App: <Contato />."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Etiqueta de balança do mercado",
      enunciado: c`A balança do mercado imprime uma etiqueta. Crie o <code>App</code> com:
        <ul>
          <li>as variáveis <code>const produto = "Queijo minas"</code>, <code>const precoKg = 32</code> e <code>const pesoG = 250</code>;</li>
          <li>um <code>&lt;h2&gt;</code> com <b>“Queijo minas: 250 g”</b> (usando as variáveis);</li>
          <li>um parágrafo <b>“Preço: R$ 8.00”</b>, calculado dentro das chaves como <code>precoKg * pesoG / 1000</code> com <code>toFixed(2)</code>;</li>
          <li>um <code>&lt;footer&gt;</code> com <b>“© ANO”</b>, onde ANO é o ano atual vindo de <code>new Date().getFullYear()</code>.</li>
        </ul>
        Use um fragmento <code>&lt;&gt;...&lt;/&gt;</code> como elemento pai.`,
      dica: c`Dentro do JSX: <code>{(precoKg * pesoG / 1000).toFixed(2)}</code>. Guarde o ano numa variável antes do <code>return</code>.`,
      lang: "react",
      inicial: c`export default function App() {
  // crie as variáveis produto, precoKg e pesoG
  // devolva um fragmento com h2, p e footer
  return null;
}
`,
      solucao: c`export default function App() {
  const produto = "Queijo minas";
  const precoKg = 32;
  const pesoG = 250;
  const ano = new Date().getFullYear();

  return (
    <>
      <h2>{produto}: {pesoG} g</h2>
      <p>Preço: R$ {(precoKg * pesoG / 1000).toFixed(2)}</p>
      <footer>© {ano}</footer>
    </>
  );
}`,
      teste: c`
var h2 = document.querySelector("h2");
__assert(h2 && /Queijo minas:\s*250 g/.test(h2.textContent), 'O h2 deveria mostrar "Queijo minas: 250 g".');
__assert(/Preço: R\$ 8\.00/.test(__texto()), 'O preço deveria aparecer como "Preço: R$ 8.00".');
var f = document.querySelector("footer");
__assert(f && f.textContent.indexOf(String(new Date().getFullYear())) >= 0, "O footer deveria mostrar o ano atual.");`,
      padroes: [
        [/const\s+precoKg\s*=\s*32/, "Crie a variável const precoKg = 32."],
        [/const\s+pesoG\s*=\s*250/, "Crie a variável const pesoG = 250."],
        [/precoKg\s*\*\s*pesoG|pesoG\s*\*\s*precoKg/, "Calcule o preço com precoKg * pesoG / 1000."],
        [/toFixed\(\s*2\s*\)/, "Formate o preço com toFixed(2)."],
        [/getFullYear\(\)/, "Use new Date().getFullYear() para o ano."]
      ]
    }
  ],

  /* ======================= b2: Props ======================= */
  b2: [
    {
      tipo: "completar",
      titulo: "Card de produto com props",
      enunciado: c`O componente <code>CardProduto</code> recebe <code>nome</code> e <code>preco</code> por props. Complete:
        <ul>
          <li>a desestruturação das props na assinatura da função;</li>
          <li>o preço com 2 casas decimais (<b>“R$ 129.90”</b>);</li>
          <li>a prop que falta no segundo card (o Carregador custa 59).</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`As props chegam num objeto: <code>function CardProduto({ nome, preco })</code>. Números vão entre chaves: <code>preco={59}</code>.`,
      lang: "react",
      inicial: c`function CardProduto({ ____, preco }) {
  return (
    <div className="card">
      <h3>{nome}</h3>
      <p>R$ {preco.____(2)}</p>
    </div>
  );
}

export default function App() {
  return (
    <section>
      <CardProduto nome="Fone Bluetooth" preco={129.9} />
      <CardProduto nome="Carregador" ____={59} />
    </section>
  );
}
`,
      solucao: c`function CardProduto({ nome, preco }) {
  return (
    <div className="card">
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
    </div>
  );
}

export default function App() {
  return (
    <section>
      <CardProduto nome="Fone Bluetooth" preco={129.9} />
      <CardProduto nome="Carregador" preco={59} />
    </section>
  );
}`,
      teste: c`
var cards = document.querySelectorAll(".card");
__assert(cards.length === 2, "Deveriam aparecer 2 cards, mas apareceram " + cards.length + ".");
__assert(cards[0].querySelector("h3").textContent === "Fone Bluetooth", "O primeiro card deveria mostrar o nome Fone Bluetooth.");
__assert(/R\$ 129\.90/.test(cards[0].textContent), 'O primeiro card deveria mostrar "R$ 129.90".');
__assert(cards[1].querySelector("h3").textContent === "Carregador", "O segundo card deveria mostrar Carregador.");
__assert(/R\$ 59\.00/.test(cards[1].textContent), 'O segundo card deveria mostrar "R$ 59.00".');`
    },
    {
      tipo: "completar",
      titulo: "Selos de promoção e esgotado",
      enunciado: c`Na vitrine, cada card mostra selos conforme as props:
        <ul>
          <li><code>emPromocao</code> tem valor padrão <code>false</code>; quando for verdadeiro, aparece <code>&lt;span className="tag"&gt;Promoção!&lt;/span&gt;</code>;</li>
          <li>se <code>estoque</code> for 0, aparece <b>“Esgotado”</b>; senão, <b>“Em estoque”</b> (use o ternário).</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Renderização condicional: <code>{cond &amp;&amp; &lt;span&gt;...&lt;/span&gt;}</code> e <code>{cond ? "A" : "B"}</code>.`,
      lang: "react",
      inicial: c`function Card({ nome, estoque, emPromocao = ____ }) {
  return (
    <div className="card">
      <h3>{nome}</h3>
      {emPromocao ____ <span className="tag">Promoção!</span>}
      <p>{estoque === 0 ____ "Esgotado" : "Em estoque"}</p>
    </div>
  );
}

export default function App() {
  return (
    <section>
      <Card nome="Caneca" estoque={5} emPromocao />
      <Card nome="Camiseta" estoque={0} />
      <Card nome="Mochila" estoque={2} />
    </section>
  );
}
`,
      solucao: c`function Card({ nome, estoque, emPromocao = false }) {
  return (
    <div className="card">
      <h3>{nome}</h3>
      {emPromocao && <span className="tag">Promoção!</span>}
      <p>{estoque === 0 ? "Esgotado" : "Em estoque"}</p>
    </div>
  );
}

export default function App() {
  return (
    <section>
      <Card nome="Caneca" estoque={5} emPromocao />
      <Card nome="Camiseta" estoque={0} />
      <Card nome="Mochila" estoque={2} />
    </section>
  );
}`,
      teste: c`
var cards = document.querySelectorAll(".card");
__assert(cards.length === 3, "Deveriam aparecer 3 cards.");
__assert(cards[0].querySelector(".tag"), "A Caneca está em promoção e deveria mostrar o selo Promoção!.");
__assert(!cards[1].querySelector(".tag") && !cards[2].querySelector(".tag"), "Camiseta e Mochila não estão em promoção: não deveriam ter o selo.");
__assert(/Esgotado/.test(cards[1].textContent), "A Camiseta (estoque 0) deveria mostrar Esgotado.");
__assert(/Em estoque/.test(cards[0].textContent) && /Em estoque/.test(cards[2].textContent), "Caneca e Mochila deveriam mostrar Em estoque.");
__assert(!/Esgotado/.test(cards[2].textContent), "A Mochila tem estoque 2 e não pode aparecer como Esgotado.");`
    },
    {
      tipo: "completar",
      titulo: "Painel com children",
      enunciado: c`O componente <code>Painel</code> desenha uma caixa com título e mostra dentro dela o que for colocado entre as tags <code>&lt;Painel&gt;...&lt;/Painel&gt;</code>.
        Complete usando a prop especial que representa esse conteúdo de dentro.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O conteúdo entre as tags chega na prop <code>children</code>.`,
      lang: "react",
      inicial: c`function Painel({ titulo, ____ }) {
  return (
    <section className="painel">
      <h2>{titulo}</h2>
      <div className="conteudo">{____}</div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Painel titulo="Pedidos de hoje">
        <p>12 pedidos recebidos</p>
      </Painel>
      <Painel titulo="Entregas">
        <p>8 entregues</p>
        <p>4 a caminho</p>
      </Painel>
    </>
  );
}
`,
      solucao: c`function Painel({ titulo, children }) {
  return (
    <section className="painel">
      <h2>{titulo}</h2>
      <div className="conteudo">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Painel titulo="Pedidos de hoje">
        <p>12 pedidos recebidos</p>
      </Painel>
      <Painel titulo="Entregas">
        <p>8 entregues</p>
        <p>4 a caminho</p>
      </Painel>
    </>
  );
}`,
      teste: c`
var ps = document.querySelectorAll(".painel");
__assert(ps.length === 2, "Deveriam aparecer 2 painéis.");
__assert(ps[0].querySelector("h2").textContent === "Pedidos de hoje", "O primeiro painel deveria ter o título Pedidos de hoje.");
var c1 = ps[0].querySelectorAll(".conteudo p"), c2 = ps[1].querySelectorAll(".conteudo p");
__assert(c1.length === 1 && /12 pedidos/.test(c1[0].textContent), "O conteúdo de dentro do primeiro Painel deveria aparecer na div .conteudo.");
__assert(c2.length === 2, "O segundo painel deveria mostrar os 2 parágrafos de dentro (children).");`,
      padroes: [[/\{\s*children\s*\}/, "Mostre o conteúdo com {children}."]]
    },
    {
      tipo: "criar",
      titulo: "Ficha do funcionário (RH)",
      enunciado: c`O RH quer uma lista de fichas. Crie o componente <code>FichaFuncionario</code> que recebe as props <code>nome</code>, <code>cargo</code>, <code>salario</code> e <code>ativo</code> e devolve:
        <ul>
          <li>uma <code>&lt;div className="ficha"&gt;</code> com um <code>&lt;h3&gt;</code> com o nome e um <code>&lt;p&gt;</code> com o cargo;</li>
          <li>um <code>&lt;p&gt;</code> <b>“Salário: R$ 4500.00”</b> (2 casas decimais);</li>
          <li>somente se <code>ativo</code> for falso, um <code>&lt;span&gt;Inativo&lt;/span&gt;</code>.</li>
        </ul>
        No <code>App</code>, mostre 3 fichas: Ana (Analista, 4500, ativa), Bruno (Estagiário, 1800.5, inativo) e Carla (Gerente, 9200, ativa).`,
      dica: c`Para mostrar só quando for falso: <code>{!ativo &amp;&amp; &lt;span&gt;Inativo&lt;/span&gt;}</code>. Booleanos vão entre chaves: <code>ativo={false}</code>.`,
      lang: "react",
      inicial: c`// Crie o componente FichaFuncionario({ nome, cargo, salario, ativo })

export default function App() {
  // mostre as 3 fichas aqui
  return <div></div>;
}
`,
      solucao: c`function FichaFuncionario({ nome, cargo, salario, ativo }) {
  return (
    <div className="ficha">
      <h3>{nome}</h3>
      <p>{cargo}</p>
      <p>Salário: R$ {salario.toFixed(2)}</p>
      {!ativo && <span>Inativo</span>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FichaFuncionario nome="Ana" cargo="Analista" salario={4500} ativo={true} />
      <FichaFuncionario nome="Bruno" cargo="Estagiário" salario={1800.5} ativo={false} />
      <FichaFuncionario nome="Carla" cargo="Gerente" salario={9200} ativo={true} />
    </div>
  );
}`,
      teste: c`
var f = document.querySelectorAll(".ficha");
__assert(f.length === 3, 'Deveriam aparecer 3 fichas com className="ficha", mas apareceram ' + f.length + ".");
var nomes = [].map.call(f, function (x) { return x.querySelector("h3") && x.querySelector("h3").textContent.trim(); });
__assert(nomes.join(",") === "Ana,Bruno,Carla", "Os nomes nos h3 deveriam ser Ana, Bruno e Carla (nessa ordem), mas são: " + nomes.join(", "));
__assert(/Estagiário/.test(f[1].textContent), "A ficha do Bruno deveria mostrar o cargo Estagiário.");
__assert(/Salário: R\$ 4500\.00/.test(f[0].textContent), 'A ficha da Ana deveria mostrar "Salário: R$ 4500.00".');
__assert(/Salário: R\$ 1800\.50/.test(f[1].textContent), 'A ficha do Bruno deveria mostrar "Salário: R$ 1800.50".');
__assert(/Inativo/.test(f[1].textContent), "O Bruno está inativo: a ficha dele deveria mostrar Inativo.");
__assert(!/Inativo/.test(f[0].textContent) && !/Inativo/.test(f[2].textContent), "Ana e Carla estão ativas: não deveriam mostrar Inativo.");`,
      padroes: [[/function\s+FichaFuncionario\s*\(\s*\{/, "Crie function FichaFuncionario({ nome, cargo, salario, ativo })."]]
    },
    {
      tipo: "criar",
      titulo: "Botão reutilizável do design system",
      enunciado: c`Crie um componente <code>Botao</code> reutilizável que recebe as props <code>texto</code>, <code>cor</code> (padrão <code>"azul"</code>) e <code>desabilitado</code> (padrão <code>false</code>) e devolve:
        <code>&lt;button className={"botao " + cor} disabled={desabilitado}&gt;</code> com o texto dentro.
        <br>No <code>App</code>, mostre três botões: <b>Salvar</b> (cor <code>"verde"</code>), <b>Cancelar</b> (sem cor, usa o padrão) e <b>Excluir</b> (cor <code>"vermelho"</code> e desabilitado).`,
      dica: c`Valores padrão vão na desestruturação: <code>function Botao({ texto, cor = "azul", desabilitado = false })</code>. Uma prop booleana sem valor (<code>desabilitado</code>) vale <code>true</code>.`,
      lang: "react",
      inicial: c`// Crie o componente Botao({ texto, cor, desabilitado })

export default function App() {
  return <div></div>;
}
`,
      solucao: c`function Botao({ texto, cor = "azul", desabilitado = false }) {
  return (
    <button className={"botao " + cor} disabled={desabilitado}>
      {texto}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Botao texto="Salvar" cor="verde" />
      <Botao texto="Cancelar" />
      <Botao texto="Excluir" cor="vermelho" desabilitado />
    </div>
  );
}`,
      teste: c`
var s = __botao("Salvar"), c2 = __botao("Cancelar"), e = __botao("Excluir");
__assert(s && c2 && e, "Devem aparecer os botões Salvar, Cancelar e Excluir.");
__assert(s.className === "botao verde", 'Salvar deveria ter className "botao verde", mas tem "' + s.className + '".');
__assert(c2.className === "botao azul", 'Cancelar não recebe cor, então deveria usar o padrão: "botao azul" (tem "' + c2.className + '").');
__assert(e.className === "botao vermelho", 'Excluir deveria ter className "botao vermelho".');
__assert(e.disabled, "Excluir deveria estar desabilitado.");
__assert(!s.disabled && !c2.disabled, "Salvar e Cancelar não podem estar desabilitados.");`,
      padroes: [
        [/function\s+Botao\s*\(/, "Crie o componente function Botao(...)."],
        [/(<Botao[\s\S]*){3}/, "Use o componente <Botao> três vezes no App."]
      ]
    }
  ],

  /* ======================= b3: useState e eventos ======================= */
  b3: [
    {
      tipo: "completar",
      titulo: "Curtidas do post",
      enunciado: c`Na rede social da escola, cada clique em <b>Curtir</b> soma 1 curtida. Complete criando o estado <code>curtidas</code> (começando em 0) e atualizando-o com a forma de função.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>useState(0)</code> cria o estado. Para somar a partir do valor anterior: <code>setCurtidas((c) =&gt; c + 1)</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  const [curtidas, setCurtidas] = ____(0);

  return (
    <div>
      <p>Curtidas: {curtidas}</p>
      <button onClick={() => setCurtidas((c) => ____)}>Curtir</button>
    </div>
  );
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
  const [curtidas, setCurtidas] = useState(0);

  return (
    <div>
      <p>Curtidas: {curtidas}</p>
      <button onClick={() => setCurtidas((c) => c + 1)}>Curtir</button>
    </div>
  );
}`,
      teste: c`
__assert(/Curtidas:\s*0\b/.test(__texto()), 'Comece mostrando "Curtidas: 0".');
var b = __botao("Curtir");
__assert(b, "Falta o botão Curtir.");
b.click(); await __esperar(); b.click(); await __esperar(); b.click(); await __esperar();
__assert(/Curtidas:\s*3\b/.test(__texto()), "Depois de 3 cliques deveria mostrar Curtidas: 3. Texto atual: " + __texto());`
    },
    {
      tipo: "completar",
      titulo: "Menu que abre e fecha",
      enunciado: c`O menu do restaurante começa <b>fechado</b>. O botão alterna entre aberto e fechado:
        <ul>
          <li>o estado <code>aberto</code> começa em <code>false</code>;</li>
          <li>o clique inverte o valor;</li>
          <li>a lista <code>&lt;ul&gt;</code> só aparece quando <code>aberto</code> for verdadeiro.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O operador <code>!</code> inverte um booleano. Para mostrar só se for verdadeiro, use <code>&amp;&amp;</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  const [aberto, setAberto] = useState(____);

  return (
    <nav>
      <button onClick={() => setAberto((a) => ____a)}>
        {aberto ? "Fechar menu" : "Abrir menu"}
      </button>
      {aberto ____ (
        <ul>
          <li>Pratos</li>
          <li>Bebidas</li>
          <li>Sobremesas</li>
        </ul>
      )}
    </nav>
  );
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
  const [aberto, setAberto] = useState(false);

  return (
    <nav>
      <button onClick={() => setAberto((a) => !a)}>
        {aberto ? "Fechar menu" : "Abrir menu"}
      </button>
      {aberto && (
        <ul>
          <li>Pratos</li>
          <li>Bebidas</li>
          <li>Sobremesas</li>
        </ul>
      )}
    </nav>
  );
}`,
      teste: c`
__assert(!document.querySelector("ul"), "O menu deve começar fechado (sem a lista na tela).");
var b = __botao("Abrir menu");
__assert(b, 'O botão deveria começar com o texto "Abrir menu".');
b.click(); await __esperar();
__assert(document.querySelectorAll("li").length === 3, "Depois de clicar, a lista com 3 itens deveria aparecer.");
__assert(__botao("Fechar menu"), 'Com o menu aberto, o botão deveria dizer "Fechar menu".');
__botao("Fechar menu").click(); await __esperar();
__assert(!document.querySelector("ul"), "Clicando de novo, o menu deveria fechar.");`
    },
    {
      tipo: "completar",
      titulo: "Total do carrinho",
      enunciado: c`O carrinho mostra a quantidade e o total (preço R$ 49.90 cada):
        <ul>
          <li><b>−</b> diminui 1, mas nunca abaixo de 1;</li>
          <li><b>+</b> soma 1;</li>
          <li>o total é calculado a partir do estado: <b>“Total: R$ 149.70”</b> com 3 unidades.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>Math.max(1, q - 1)</code> devolve o maior entre 1 e <code>q - 1</code>. O total é um valor derivado: <code>qtd * preco</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  const [qtd, setQtd] = useState(1);
  const preco = 49.9;

  return (
    <div>
      <button onClick={() => setQtd((q) => Math.____(1, q - 1))}>−</button>
      <span> {qtd} </span>
      <button onClick={() => setQtd((q) => ____)}>+</button>
      <p>Total: R$ {(____ * preco).toFixed(2)}</p>
    </div>
  );
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
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
      teste: c`
__assert(/Total: R\$ 49\.90/.test(__texto()), 'Com 1 unidade deveria mostrar "Total: R$ 49.90".');
var mais = __botao("+"), menos = __botao("−", "-");
mais.click(); await __esperar(); mais.click(); await __esperar();
__assert(/Total: R\$ 149\.70/.test(__texto()), 'Com 3 unidades deveria mostrar "Total: R$ 149.70". Texto: ' + __texto());
for (var i = 0; i < 5; i++) { menos.click(); await __esperar(); }
__assert(/Total: R\$ 49\.90/.test(__texto()), "A quantidade nunca pode ficar abaixo de 1 (o total mínimo é R$ 49.90).");`
    },
    {
      tipo: "criar",
      titulo: "Senha da fila do banco",
      enunciado: c`Crie o painel de senhas da agência bancária:
        <ul>
          <li>um estado <code>senha</code> que começa em 1;</li>
          <li>um parágrafo <b>“Senha atual: 001”</b>, sempre com 3 dígitos (ex.: 001, 002, 010);</li>
          <li>botão <b>Chamar próxima</b>, que soma 1;</li>
          <li>botão <b>Reiniciar</b>, que volta para 1.</li>
        </ul>`,
      dica: c`Para completar com zeros: <code>String(senha).padStart(3, "0")</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  // crie o estado senha e os dois botões
  return <div></div>;
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
  const [senha, setSenha] = useState(1);

  return (
    <div>
      <p>Senha atual: {String(senha).padStart(3, "0")}</p>
      <button onClick={() => setSenha((s) => s + 1)}>Chamar próxima</button>
      <button onClick={() => setSenha(1)}>Reiniciar</button>
    </div>
  );
}`,
      teste: c`
__assert(/Senha atual: 001\b/.test(__texto()), 'Comece mostrando "Senha atual: 001".');
var prox = __botao("Chamar próxima"), rei = __botao("Reiniciar");
__assert(prox && rei, "Crie os botões Chamar próxima e Reiniciar.");
prox.click(); await __esperar();
__assert(/Senha atual: 002\b/.test(__texto()), "Depois de chamar a próxima, deveria mostrar 002.");
for (var i = 0; i < 9; i++) { prox.click(); await __esperar(20); }
await __esperar();
__assert(/Senha atual: 011\b/.test(__texto()), "Depois de 10 chamadas deveria mostrar 011. Texto: " + __texto());
rei.click(); await __esperar();
__assert(/Senha atual: 001\b/.test(__texto()), "Reiniciar deveria voltar para 001.");`,
      padroes: [[/useState\s*\(\s*1\s*\)/, "Crie o estado com useState(1)."]]
    },
    {
      tipo: "criar",
      titulo: "Abas do perfil do cliente",
      enunciado: c`Crie a tela de perfil com três abas, controladas por um estado <code>aba</code> que começa em <code>"dados"</code>:
        <ul>
          <li>botões <b>Dados</b>, <b>Pedidos</b> e <b>Endereços</b>; o botão da aba atual tem <code>className="ativa"</code> (os outros, sem classe);</li>
          <li>um <code>&lt;p className="conteudo"&gt;</code> que mostra: <b>“Nome: Ana Souza”</b> (dados), <b>“Você tem 3 pedidos.”</b> (pedidos) ou <b>“Rua das Flores, 123”</b> (endereços).</li>
        </ul>`,
      dica: c`<code>className={aba === "dados" ? "ativa" : ""}</code>. Para o conteúdo, pode usar ternários ou um objeto <code>{ dados: "...", pedidos: "..." }[aba]</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  // crie o estado aba e os três botões
  return <div></div>;
}
`,
      solucao: c`import { useState } from "react";

const CONTEUDO = {
  dados: "Nome: Ana Souza",
  pedidos: "Você tem 3 pedidos.",
  enderecos: "Rua das Flores, 123",
};

export default function App() {
  const [aba, setAba] = useState("dados");

  return (
    <div>
      <button className={aba === "dados" ? "ativa" : ""} onClick={() => setAba("dados")}>Dados</button>
      <button className={aba === "pedidos" ? "ativa" : ""} onClick={() => setAba("pedidos")}>Pedidos</button>
      <button className={aba === "enderecos" ? "ativa" : ""} onClick={() => setAba("enderecos")}>Endereços</button>
      <p className="conteudo">{CONTEUDO[aba]}</p>
    </div>
  );
}`,
      teste: c`
var d = __botao("Dados"), p = __botao("Pedidos"), e = __botao("Endereços");
__assert(d && p && e, "Crie os botões Dados, Pedidos e Endereços.");
function conteudo() { var el = document.querySelector("p.conteudo"); return el ? el.textContent.trim() : null; }
__assert(conteudo() === "Nome: Ana Souza", 'Começando na aba dados, o p.conteudo deveria mostrar "Nome: Ana Souza" (mostra: ' + conteudo() + ").");
__assert(d.className === "ativa" && p.className !== "ativa", 'No início, só o botão Dados deveria ter className "ativa".');
p.click(); await __esperar();
__assert(conteudo() === "Você tem 3 pedidos.", 'Na aba Pedidos deveria mostrar "Você tem 3 pedidos."');
__assert(__botao("Pedidos").className === "ativa" && __botao("Dados").className !== "ativa", "Ao trocar de aba, a classe ativa deve passar para o botão Pedidos.");
__botao("Endereços").click(); await __esperar();
__assert(conteudo() === "Rua das Flores, 123", 'Na aba Endereços deveria mostrar "Rua das Flores, 123".');
__botao("Dados").click(); await __esperar();
__assert(conteudo() === "Nome: Ana Souza", "Voltando para Dados deveria mostrar o nome de novo.");`,
      padroes: [[/useState\s*\(\s*["']dados["']\s*\)/, 'Crie o estado com useState("dados").']]
    }
  ],

  /* ======================= i1: useEffect e buscar dados ======================= */
  i1: [
    {
      tipo: "completar",
      titulo: "Lista de clientes carregando",
      enunciado: c`A função <code>buscarClientes()</code> simula uma API: devolve uma Promise que entrega a lista depois de 1,5 segundo.
        Complete o componente para buscar os clientes <b>uma única vez</b>, quando ele aparece na tela, mostrando <b>“Carregando…”</b> enquanto espera.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O efeito é criado com <code>useEffect(função, dependências)</code>. Para rodar só na primeira vez, as dependências são <code>[]</code>.`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

window.chamadas = 0;
function buscarClientes() {
  window.chamadas++;
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, nome: "Ana Souza" },
      { id: 2, nome: "Bruno Lima" },
      { id: 3, nome: "Carla Dias" },
    ]), 1500);
  });
}

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  ____(() => {
    buscarClientes().then((lista) => {
      ____(lista);
      setCarregando(false);
    });
  }, ____);

  if (carregando) return <p>Carregando…</p>;
  return <ul>{clientes.map((c) => <li key={c.id}>{c.nome}</li>)}</ul>;
}
`,
      solucao: c`import { useEffect, useState } from "react";

window.chamadas = 0;
function buscarClientes() {
  window.chamadas++;
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, nome: "Ana Souza" },
      { id: 2, nome: "Bruno Lima" },
      { id: 3, nome: "Carla Dias" },
    ]), 1500);
  });
}

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarClientes().then((lista) => {
      setClientes(lista);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <p>Carregando…</p>;
  return <ul>{clientes.map((c) => <li key={c.id}>{c.nome}</li>)}</ul>;
}`,
      teste: c`
async function ate(cond, ms) { for (var i = 0; i < ms / 50; i++) { if (cond()) return true; await __esperar(50); } return cond(); }
__assert(/Carregando/.test(__texto()), 'Enquanto os dados não chegam, deveria aparecer "Carregando…".');
await ate(function () { return document.querySelectorAll("li").length === 3; }, 4000);
__assert(document.querySelectorAll("li").length === 3, "Depois da busca deveriam aparecer 3 clientes na lista.");
__assert(/Bruno Lima/.test(__texto()), "O nome Bruno Lima deveria aparecer.");
__assert(!/Carregando/.test(__texto()), "Depois de carregar, o aviso Carregando… deveria sumir.");
await __esperar(2000);
__assert(window.chamadas === 1, "buscarClientes deveria ser chamada só 1 vez, mas foi chamada " + window.chamadas + " vezes. Confira o array de dependências.");`
    },
    {
      tipo: "completar",
      titulo: "Pedido com tratamento de erro",
      enunciado: c`A função <code>buscarPedido(id)</code> simula a API de pedidos: o pedido 7 existe; o 99 dá erro.
        O componente <code>Pedido</code> precisa tratar os três estados: <b>carregando</b>, <b>erro</b> e <b>dados</b>.
        <ul>
          <li>no <code>catch</code>, guarde a mensagem do erro no estado <code>erro</code>;</li>
          <li>no <code>finally</code>, termine o carregamento;</li>
          <li>a busca roda de novo sempre que o <code>id</code> mudar.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O erro tem a propriedade <code>message</code>. O <code>finally</code> roda com sucesso ou com erro. Dependências: <code>[id]</code>.`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

function buscarPedido(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 7) resolve({ id: 7, descricao: "2 pizzas", total: 79.8 });
      else reject(new Error("Pedido " + id + " não encontrado"));
    }, 1000);
  });
}

function Pedido({ id }) {
  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarPedido(id)
      .then(setPedido)
      .catch((e) => ____(e.message))
      .finally(() => setCarregando(____));
  }, [____]);

  if (carregando) return <p>Carregando…</p>;
  if (erro) return <p>Erro: {erro}</p>;
  return <p>Pedido #{pedido.id}: {pedido.descricao} - R$ {pedido.total.toFixed(2)}</p>;
}

export default function App() {
  return (
    <div>
      <Pedido id={7} />
      <Pedido id={99} />
    </div>
  );
}
`,
      solucao: c`import { useEffect, useState } from "react";

function buscarPedido(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 7) resolve({ id: 7, descricao: "2 pizzas", total: 79.8 });
      else reject(new Error("Pedido " + id + " não encontrado"));
    }, 1000);
  });
}

function Pedido({ id }) {
  const [pedido, setPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarPedido(id)
      .then(setPedido)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return <p>Carregando…</p>;
  if (erro) return <p>Erro: {erro}</p>;
  return <p>Pedido #{pedido.id}: {pedido.descricao} - R$ {pedido.total.toFixed(2)}</p>;
}

export default function App() {
  return (
    <div>
      <Pedido id={7} />
      <Pedido id={99} />
    </div>
  );
}`,
      teste: c`
async function ate(cond, ms) { for (var i = 0; i < ms / 50; i++) { if (cond()) return true; await __esperar(50); } return cond(); }
__assert(/Carregando/.test(__texto()), "No começo os dois pedidos deveriam mostrar Carregando….");
await ate(function () { return !/Carregando/.test(__texto()); }, 4000);
var t = __texto();
__assert(!/Carregando/.test(t), "O carregamento deveria terminar (com sucesso ou erro). Confira o finally.");
__assert(/Pedido #7: 2 pizzas - R\$ 79\.80/.test(t), 'O pedido 7 deveria mostrar "Pedido #7: 2 pizzas - R$ 79.80".');
__assert(/Erro: Pedido 99 não encontrado/.test(t), 'O pedido 99 deveria mostrar "Erro: Pedido 99 não encontrado".');`
    },
    {
      tipo: "completar",
      titulo: "Busca de CEP com limpeza",
      enunciado: c`Ao digitar um CEP de 8 dígitos, o app busca o endereço com <code>buscarCep(cep)</code> (simulada; alguns CEPs demoram mais que outros).
        Se o usuário trocar o CEP antes da resposta chegar, a resposta antiga deve ser <b>ignorada</b>.
        <ul>
          <li>o efeito deve rodar sempre que <code>cep</code> mudar;</li>
          <li>a limpeza do efeito marca a busca anterior como inativa.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`A função devolvida pelo efeito roda antes do próximo efeito: ali, troque <code>ativo</code> para <code>false</code>.`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

const ENDERECOS = {
  "01001000": { rua: "Praça da Sé", cidade: "São Paulo", demora: 900 },
  "20040020": { rua: "Avenida Rio Branco", cidade: "Rio de Janeiro", demora: 200 },
};

function buscarCep(cep) {
  const e = ENDERECOS[cep];
  return new Promise((resolve) => {
    setTimeout(() => resolve(e ? e.rua + ", " + e.cidade : "CEP não encontrado"), e ? e.demora : 300);
  });
}

export default function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (cep.length !== 8) {
      setEndereco("");
      return;
    }
    let ativo = true;
    setEndereco("Buscando…");
    buscarCep(cep).then((texto) => {
      if (ativo) setEndereco(texto);
    });
    return () => {
      ativo = ____;
    };
  }, [____]);

  return (
    <div>
      <input placeholder="CEP (só números)" value={cep} onChange={(e) => setCep(e.target.value)} />
      <p className="endereco">{endereco}</p>
    </div>
  );
}
`,
      solucao: c`import { useEffect, useState } from "react";

const ENDERECOS = {
  "01001000": { rua: "Praça da Sé", cidade: "São Paulo", demora: 900 },
  "20040020": { rua: "Avenida Rio Branco", cidade: "Rio de Janeiro", demora: 200 },
};

function buscarCep(cep) {
  const e = ENDERECOS[cep];
  return new Promise((resolve) => {
    setTimeout(() => resolve(e ? e.rua + ", " + e.cidade : "CEP não encontrado"), e ? e.demora : 300);
  });
}

export default function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (cep.length !== 8) {
      setEndereco("");
      return;
    }
    let ativo = true;
    setEndereco("Buscando…");
    buscarCep(cep).then((texto) => {
      if (ativo) setEndereco(texto);
    });
    return () => {
      ativo = false;
    };
  }, [cep]);

  return (
    <div>
      <input placeholder="CEP (só números)" value={cep} onChange={(e) => setCep(e.target.value)} />
      <p className="endereco">{endereco}</p>
    </div>
  );
}`,
      teste: c`
async function ate(cond, ms) { for (var i = 0; i < ms / 50; i++) { if (cond()) return true; await __esperar(50); } return cond(); }
function end() { return document.querySelector(".endereco").textContent; }
var inp = document.querySelector("input");
__digitar(inp, "01001000"); await __esperar();
await ate(function () { return /Praça da Sé/.test(end()); }, 2500);
__assert(/Praça da Sé, São Paulo/.test(end()), 'O CEP 01001000 deveria mostrar "Praça da Sé, São Paulo". Mostra: ' + end());
__digitar(inp, "123"); await __esperar();
__assert(end() === "", "Com CEP incompleto, o endereço deveria ficar vazio.");
__digitar(inp, "01001000"); await __esperar(30);
__digitar(inp, "20040020"); await __esperar(1500);
__assert(/Avenida Rio Branco, Rio de Janeiro/.test(end()), "Trocando o CEP rápido, deveria ficar o endereço do ÚLTIMO CEP (Rio de Janeiro). A resposta antiga (São Paulo) deve ser ignorada pela limpeza. Mostra: " + end());`
    },
    {
      tipo: "criar",
      titulo: "Cronômetro de atendimento",
      enunciado: c`Crie um cronômetro para medir o tempo de atendimento no call center:
        <ul>
          <li>estado <code>decimos</code> (começa em 0) e estado <code>rodando</code> (começa em <code>false</code>);</li>
          <li>parágrafo <b>“Tempo: 0.0 s”</b> (mostre <code>(decimos / 10).toFixed(1)</code>);</li>
          <li>um botão que diz <b>Iniciar</b> quando parado e <b>Pausar</b> quando rodando, alternando <code>rodando</code>;</li>
          <li>botão <b>Zerar</b>, que volta <code>decimos</code> para 0;</li>
          <li>com <code>useEffect</code> dependendo de <code>rodando</code>: se estiver rodando, crie um <code>setInterval</code> de <b>100 ms</b> que soma 1 em <code>decimos</code>, e devolva a limpeza com <code>clearInterval</code>.</li>
        </ul>`,
      dica: c`Dentro do efeito: <code>if (!rodando) return;</code> e depois <code>const id = setInterval(() =&gt; setDecimos((d) =&gt; d + 1), 100); return () =&gt; clearInterval(id);</code>`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

export default function App() {
  // estados decimos e rodando
  // useEffect com setInterval e clearInterval
  return <div></div>;
}
`,
      solucao: c`import { useEffect, useState } from "react";

export default function App() {
  const [decimos, setDecimos] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    if (!rodando) return;
    const id = setInterval(() => setDecimos((d) => d + 1), 100);
    return () => clearInterval(id);
  }, [rodando]);

  return (
    <div>
      <p>Tempo: {(decimos / 10).toFixed(1)} s</p>
      <button onClick={() => setRodando((r) => !r)}>{rodando ? "Pausar" : "Iniciar"}</button>
      <button onClick={() => setDecimos(0)}>Zerar</button>
    </div>
  );
}`,
      teste: c`
function tempo() { var m = __texto().match(/Tempo: (\d+\.\d) s/); return m ? parseFloat(m[1]) : null; }
__assert(tempo() === 0, 'Comece mostrando "Tempo: 0.0 s".');
await __esperar(300);
__assert(tempo() === 0, "Parado, o tempo não pode andar.");
var ini = __botao("Iniciar");
__assert(ini, "Falta o botão Iniciar.");
ini.click(); await __esperar(1050);
var t1 = tempo();
__assert(t1 >= 0.7 && t1 <= 1.3, "Depois de ~1 segundo rodando, deveria mostrar perto de 1.0 s, mas mostra " + t1 + " s.");
var pau = __botao("Pausar");
__assert(pau, 'Rodando, o botão deveria dizer "Pausar".');
pau.click(); await __esperar(100);
var t2 = tempo();
await __esperar(600);
__assert(tempo() === t2, "Depois de pausar, o tempo deveria parar (use clearInterval na limpeza do efeito). Foi de " + t2 + " para " + tempo() + ".");
__assert(__botao("Iniciar"), 'Pausado, o botão deveria voltar a dizer "Iniciar".');
__botao("Zerar").click(); await __esperar();
__assert(tempo() === 0, "Zerar deveria voltar para 0.0 s.");`,
      padroes: [
        [/useEffect\s*\(/, "Use useEffect para criar o intervalo."],
        [/setInterval\s*\(/, "Use setInterval."],
        [/clearInterval\s*\(/, "Limpe o intervalo com clearInterval na função de limpeza."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Cardápio e promoções do delivery",
      enunciado: c`As funções <code>buscarCardapio()</code> e <code>buscarPromocoes()</code> simulam a API do delivery (a segunda sempre falha). Crie o <code>App</code> com duas seções:
        <ul>
          <li><code>&lt;h2&gt;Cardápio&lt;/h2&gt;</code>: enquanto carrega, <b>“Carregando…”</b>; depois, uma <code>&lt;ul className="cardapio"&gt;</code> com um <code>&lt;li&gt;</code> por item no formato <b>“X-Burguer - R$ 25.00”</b>;</li>
          <li><code>&lt;h2&gt;Promoções&lt;/h2&gt;</code>: enquanto carrega, <b>“Carregando…”</b>; se der erro, <b>“Erro: MENSAGEM”</b>.</li>
        </ul>
        Cada busca deve ser feita <b>uma única vez</b> (use <code>useEffect</code> com <code>[]</code>). Dica: dá para criar um componente que recebe a função de busca por props e usar duas vezes.`,
      dica: c`Guarde <code>dados</code>, <code>carregando</code> e <code>erro</code> em estados. Use <code>.then</code>, <code>.catch((e) =&gt; setErro(e.message))</code> e <code>.finally</code>.`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

window.chamadas = 0;
function buscarCardapio() {
  window.chamadas++;
  return new Promise((resolve) => setTimeout(() => resolve([
    { id: 1, nome: "X-Burguer", preco: 25 },
    { id: 2, nome: "Batata frita", preco: 12.5 },
    { id: 3, nome: "Refrigerante", preco: 7 },
  ]), 1200));
}

function buscarPromocoes() {
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error("Serviço de promoções indisponível")), 1000));
}

export default function App() {
  // mostre as duas seções com carregando, erro e dados
  return <div></div>;
}
`,
      solucao: c`import { useEffect, useState } from "react";

window.chamadas = 0;
function buscarCardapio() {
  window.chamadas++;
  return new Promise((resolve) => setTimeout(() => resolve([
    { id: 1, nome: "X-Burguer", preco: 25 },
    { id: 2, nome: "Batata frita", preco: 12.5 },
    { id: 3, nome: "Refrigerante", preco: 7 },
  ]), 1200));
}

function buscarPromocoes() {
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error("Serviço de promoções indisponível")), 1000));
}

function Secao({ titulo, buscar, classe }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscar()
      .then(setDados)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <section>
      <h2>{titulo}</h2>
      {carregando && <p>Carregando…</p>}
      {erro && <p>Erro: {erro}</p>}
      {!carregando && !erro && (
        <ul className={classe}>
          {dados.map((i) => <li key={i.id}>{i.nome} - R$ {i.preco.toFixed(2)}</li>)}
        </ul>
      )}
    </section>
  );
}

export default function App() {
  return (
    <div>
      <Secao titulo="Cardápio" buscar={buscarCardapio} classe="cardapio" />
      <Secao titulo="Promoções" buscar={buscarPromocoes} classe="promocoes" />
    </div>
  );
}`,
      teste: c`
async function ate(cond, ms) { for (var i = 0; i < ms / 50; i++) { if (cond()) return true; await __esperar(50); } return cond(); }
var hs = [].map.call(document.querySelectorAll("h2"), function (h) { return h.textContent.trim(); });
__assert(hs.indexOf("Cardápio") >= 0 && hs.indexOf("Promoções") >= 0, "Crie os títulos h2 Cardápio e Promoções.");
__assert((__texto().match(/Carregando/g) || []).length >= 1, "Enquanto as buscas não terminam, deveria aparecer Carregando….");
await ate(function () { return !/Carregando/.test(__texto()); }, 4000);
var lis = document.querySelectorAll("ul.cardapio li");
__assert(lis.length === 3, 'A ul.cardapio deveria ter 3 itens, mas tem ' + lis.length + ".");
__assert(lis[0].textContent.trim() === "X-Burguer - R$ 25.00", 'O primeiro item deveria ser "X-Burguer - R$ 25.00", mas é "' + lis[0].textContent.trim() + '".');
__assert(lis[1].textContent.trim() === "Batata frita - R$ 12.50", 'O segundo item deveria ser "Batata frita - R$ 12.50".');
__assert(/Erro: Serviço de promoções indisponível/.test(__texto()), 'A seção Promoções deveria mostrar "Erro: Serviço de promoções indisponível".');
__assert(!/Carregando/.test(__texto()), "Depois das buscas, nenhum Carregando… deveria sobrar.");
await __esperar(1500);
__assert(window.chamadas === 1, "buscarCardapio deveria ser chamada uma única vez, mas foi chamada " + window.chamadas + " vezes.");`,
      padroes: [[/useEffect\s*\(/, "Use useEffect para fazer as buscas."]]
    }
  ],

  /* ======================= i2: Listas, keys e formulários ======================= */
  i2: [
    {
      tipo: "completar",
      titulo: "Lista de produtos com key",
      enunciado: c`Mostre os produtos do estoque numa lista. Transforme cada produto em um <code>&lt;li&gt;</code> no formato <b>“Arroz 5kg - R$ 27.90”</b> e dê a cada item uma <code>key</code> única e estável (o <code>id</code>).
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Arrays têm o método <code>map</code>, que transforma cada item. A <code>key</code> deve vir do <code>id</code>, não do índice.`,
      lang: "react",
      inicial: c`const PRODUTOS = [
  { id: 101, nome: "Arroz 5kg", preco: 27.9 },
  { id: 102, nome: "Feijão 1kg", preco: 8.49 },
  { id: 103, nome: "Café 500g", preco: 18 },
  { id: 104, nome: "Leite 1L", preco: 5.29 },
];

export default function App() {
  return (
    <ul>
      {PRODUTOS.____((p) => (
        <li ____={p.id}>{p.nome} - R$ {p.preco.toFixed(2)}</li>
      ))}
    </ul>
  );
}
`,
      solucao: c`const PRODUTOS = [
  { id: 101, nome: "Arroz 5kg", preco: 27.9 },
  { id: 102, nome: "Feijão 1kg", preco: 8.49 },
  { id: 103, nome: "Café 500g", preco: 18 },
  { id: 104, nome: "Leite 1L", preco: 5.29 },
];

export default function App() {
  return (
    <ul>
      {PRODUTOS.map((p) => (
        <li key={p.id}>{p.nome} - R$ {p.preco.toFixed(2)}</li>
      ))}
    </ul>
  );
}`,
      teste: c`
var lis = document.querySelectorAll("li");
__assert(lis.length === 4, "Deveriam aparecer 4 itens, mas apareceram " + lis.length + ".");
__assert(lis[0].textContent.trim() === "Arroz 5kg - R$ 27.90", 'O primeiro item deveria ser "Arroz 5kg - R$ 27.90".');
__assert(lis[3].textContent.trim() === "Leite 1L - R$ 5.29", 'O último item deveria ser "Leite 1L - R$ 5.29".');`,
      padroes: [[/key\s*=\s*\{\s*p\.id\s*\}/, "Use key={p.id} (um id estável, não o índice)."]]
    },
    {
      tipo: "completar",
      titulo: "Cadastro de aluno com formulário controlado",
      enunciado: c`Na secretaria da escola, o formulário cadastra o nome do aluno:
        <ul>
          <li>o <code>&lt;input&gt;</code> é controlado: o valor vem do estado <code>nome</code> e cada tecla atualiza o estado;</li>
          <li>o envio do formulário chama <code>enviar</code>, que impede o recarregamento da página, guarda o nome em <code>cadastrado</code> e limpa o campo;</li>
          <li>depois do envio aparece <b>“Cadastrado: NOME”</b>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O texto digitado está em <code>e.target.value</code>. Para não recarregar: <code>e.preventDefault()</code>. O evento do formulário é <code>onSubmit</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  const [nome, setNome] = useState("");
  const [cadastrado, setCadastrado] = useState("");

  function enviar(e) {
    e.____();
    setCadastrado(nome);
    setNome("");
  }

  return (
    <form ____={enviar}>
      <input value={nome} onChange={(e) => setNome(e.target.____)} placeholder="Nome do aluno" />
      <button>Cadastrar</button>
      {cadastrado && <p>Cadastrado: {cadastrado}</p>}
    </form>
  );
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
  const [nome, setNome] = useState("");
  const [cadastrado, setCadastrado] = useState("");

  function enviar(e) {
    e.preventDefault();
    setCadastrado(nome);
    setNome("");
  }

  return (
    <form onSubmit={enviar}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do aluno" />
      <button>Cadastrar</button>
      {cadastrado && <p>Cadastrado: {cadastrado}</p>}
    </form>
  );
}`,
      teste: c`
var inp = document.querySelector("input");
__digitar(inp, "Lucas Martins"); await __esperar();
__assert(document.querySelector("input").value === "Lucas Martins", "O campo deveria mostrar o que foi digitado (campo controlado).");
__botao("Cadastrar").click(); await __esperar(100);
__assert(/Cadastrado: Lucas Martins/.test(__texto()), 'Depois de enviar deveria aparecer "Cadastrado: Lucas Martins".');
__assert(document.querySelector("input").value === "", "O campo deveria ficar vazio depois do envio.");`,
      padroes: [[/e\.preventDefault\(\)/, "Chame e.preventDefault() no envio."]]
    },
    {
      tipo: "completar",
      titulo: "Remover item da lista de compras",
      enunciado: c`A lista de compras da cantina tem um botão <b>x</b> em cada item para removê-lo.
        <ul>
          <li><code>remover</code> cria uma lista <b>nova</b> sem o item do id clicado;</li>
          <li>o botão <b>x</b> não pode enviar formulário (use o tipo certo).</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>filter</code> devolve um array novo só com os itens que passam no teste: mantenha os de id <b>diferente</b> (<code>!==</code>).`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  const [itens, setItens] = useState([
    { id: 1, nome: "Pão de forma" },
    { id: 2, nome: "Suco de laranja" },
    { id: 3, nome: "Queijo" },
  ]);

  const remover = (id) => setItens(itens.____((i) => i.id ____ id));

  return (
    <form>
      <ul>
        {itens.map((i) => (
          <li key={i.id}>
            {i.nome} <button type="____" onClick={() => remover(i.id)}>x</button>
          </li>
        ))}
      </ul>
      <p>{itens.length} item(ns)</p>
    </form>
  );
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
  const [itens, setItens] = useState([
    { id: 1, nome: "Pão de forma" },
    { id: 2, nome: "Suco de laranja" },
    { id: 3, nome: "Queijo" },
  ]);

  const remover = (id) => setItens(itens.filter((i) => i.id !== id));

  return (
    <form>
      <ul>
        {itens.map((i) => (
          <li key={i.id}>
            {i.nome} <button type="button" onClick={() => remover(i.id)}>x</button>
          </li>
        ))}
      </ul>
      <p>{itens.length} item(ns)</p>
    </form>
  );
}`,
      teste: c`
__assert(document.querySelectorAll("li").length === 3, "A lista deveria começar com 3 itens.");
__assert(document.querySelector("li button").type === "button", 'O botão x deveria ter type="button".');
document.querySelectorAll("li button")[1].click(); await __esperar(80);
var nomes = [].map.call(document.querySelectorAll("li"), function (l) { return l.textContent.replace("x", "").trim(); });
__assert(nomes.length === 2, "Depois de remover, deveriam sobrar 2 itens, mas há " + nomes.length + ".");
__assert(nomes.join(",") === "Pão de forma,Queijo", "Clicando no x do Suco, deveriam sobrar Pão de forma e Queijo, mas sobraram: " + nomes.join(", "));
__assert(/2 item\(ns\)/.test(__texto()), 'O contador deveria mostrar "2 item(ns)".');
document.querySelectorAll("li button")[0].click(); await __esperar(80);
__assert(document.querySelectorAll("li").length === 1 && /Queijo/.test(document.querySelector("li").textContent), "Removendo o Pão, deveria sobrar só o Queijo.");`
    },
    {
      tipo: "criar",
      titulo: "Lista de convidados do evento",
      enunciado: c`Crie a lista de convidados de um evento da empresa:
        <ul>
          <li>um <code>&lt;form&gt;</code> com um <code>&lt;input&gt;</code> controlado e um botão <b>Adicionar</b> (o envio usa <code>onSubmit</code> e <code>e.preventDefault()</code>);</li>
          <li>ao enviar, o nome (sem espaços nas pontas, use <code>trim()</code>) vira um <code>&lt;li&gt;</code> e o campo fica vazio;</li>
          <li>nomes vazios <b>não</b> entram; nomes repetidos (ignorando maiúsculas) <b>não</b> entram;</li>
          <li>cada <code>&lt;li&gt;</code> tem o nome e um botão <b>x</b> (<code>type="button"</code>) que remove o convidado;</li>
          <li>um parágrafo <b>“N convidado(s)”</b>;</li>
          <li>use um <code>id</code> único como <code>key</code> (ex.: <code>crypto.randomUUID()</code> ou <code>Date.now() + Math.random()</code>).</li>
        </ul>`,
      dica: c`Para checar repetido: <code>convidados.some((c) =&gt; c.nome.toLowerCase() === nome.toLowerCase())</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

export default function App() {
  // estados: texto do campo e lista de convidados
  return <form></form>;
}
`,
      solucao: c`import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [convidados, setConvidados] = useState([]);

  function adicionar(e) {
    e.preventDefault();
    const nome = texto.trim();
    if (!nome) return;
    if (convidados.some((c) => c.nome.toLowerCase() === nome.toLowerCase())) return;
    setConvidados([...convidados, { id: crypto.randomUUID(), nome }]);
    setTexto("");
  }

  const remover = (id) => setConvidados(convidados.filter((c) => c.id !== id));

  return (
    <form onSubmit={adicionar}>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nome do convidado" />
      <button>Adicionar</button>
      <ul>
        {convidados.map((c) => (
          <li key={c.id}>
            {c.nome} <button type="button" onClick={() => remover(c.id)}>x</button>
          </li>
        ))}
      </ul>
      <p>{convidados.length} convidado(s)</p>
    </form>
  );
}`,
      teste: c`
function inp() { return document.querySelector("input"); }
async function add(v) { __digitar(inp(), v); await __esperar(); __botao("Adicionar").click(); await __esperar(80); }
function nomes() { return [].map.call(document.querySelectorAll("li"), function (l) { return l.textContent.replace(/x\s*$/, "").trim(); }); }
__assert(inp() && __botao("Adicionar"), "Crie o input e o botão Adicionar.");
__assert(/0 convidado\(s\)/.test(__texto()), 'Comece mostrando "0 convidado(s)".');
await add("  Marina Alves  ");
__assert(nomes().join("|") === "Marina Alves", 'Depois de adicionar, deveria haver 1 li com "Marina Alves" (sem espaços nas pontas). Há: ' + nomes().join(", "));
__assert(inp().value === "", "O campo deveria ficar vazio depois de adicionar.");
await add("   ");
__assert(nomes().length === 1, "Nome vazio não pode ser adicionado.");
await add("MARINA ALVES");
__assert(nomes().length === 1, "Nome repetido (mesmo com outras maiúsculas) não pode ser adicionado.");
await add("Pedro Rocha"); await add("Júlia Costa");
__assert(nomes().length === 3 && /3 convidado\(s\)/.test(__texto()), 'Com 3 convidados deveria mostrar "3 convidado(s)".');
var bts = document.querySelectorAll("li button");
__assert(bts.length === 3 && bts[1].type === "button", 'Cada li precisa de um botão x com type="button".');
bts[1].click(); await __esperar(80);
__assert(nomes().join("|") === "Marina Alves|Júlia Costa", "Removendo o Pedro, deveriam sobrar Marina e Júlia. Sobraram: " + nomes().join(", "));
__assert(/2 convidado\(s\)/.test(__texto()), "O contador deveria cair para 2.");`,
      padroes: [
        [/onSubmit\s*=/, "Use onSubmit no <form>."],
        [/preventDefault\(\)/, "Chame e.preventDefault() no envio."],
        [/key\s*=\s*\{/, "Coloque uma key em cada <li>."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Filtro de pedidos por status",
      enunciado: c`O painel da loja tem a lista <code>PEDIDOS</code>. Crie:
        <ul>
          <li>um <code>&lt;select&gt;</code> controlado (estado <code>status</code>, começando em <code>"todos"</code>) com as opções de valor <code>todos</code>, <code>pendente</code> e <code>entregue</code>;</li>
          <li>uma <code>&lt;ul&gt;</code> com um <code>&lt;li&gt;</code> por pedido filtrado, no formato <b>“#1 Ana - R$ 120.00”</b> (com <code>key</code>);</li>
          <li>um parágrafo <b>“Total: R$ X”</b> com a soma dos valores dos pedidos filtrados (2 casas).</li>
        </ul>`,
      dica: c`Filtre: <code>status === "todos" ? PEDIDOS : PEDIDOS.filter((p) =&gt; p.status === status)</code>. Some com <code>reduce</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

const PEDIDOS = [
  { id: 1, cliente: "Ana", valor: 120, status: "entregue" },
  { id: 2, cliente: "Bruno", valor: 45.5, status: "pendente" },
  { id: 3, cliente: "Carla", valor: 89.9, status: "entregue" },
  { id: 4, cliente: "Diego", valor: 30, status: "pendente" },
  { id: 5, cliente: "Eva", valor: 210, status: "pendente" },
];

export default function App() {
  // select controlado + lista filtrada + total
  return <div></div>;
}
`,
      solucao: c`import { useState } from "react";

const PEDIDOS = [
  { id: 1, cliente: "Ana", valor: 120, status: "entregue" },
  { id: 2, cliente: "Bruno", valor: 45.5, status: "pendente" },
  { id: 3, cliente: "Carla", valor: 89.9, status: "entregue" },
  { id: 4, cliente: "Diego", valor: 30, status: "pendente" },
  { id: 5, cliente: "Eva", valor: 210, status: "pendente" },
];

export default function App() {
  const [status, setStatus] = useState("todos");
  const filtrados = status === "todos" ? PEDIDOS : PEDIDOS.filter((p) => p.status === status);
  const total = filtrados.reduce((soma, p) => soma + p.valor, 0);

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todos">Todos</option>
        <option value="pendente">Pendentes</option>
        <option value="entregue">Entregues</option>
      </select>
      <ul>
        {filtrados.map((p) => (
          <li key={p.id}>#{p.id} {p.cliente} - R$ {p.valor.toFixed(2)}</li>
        ))}
      </ul>
      <p>Total: R$ {total.toFixed(2)}</p>
    </div>
  );
}`,
      teste: c`
var sel = document.querySelector("select");
__assert(sel, "Crie o <select>.");
async function escolher(v) { var s = document.querySelector("select"); Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set.call(s, v); s.dispatchEvent(new Event("change", { bubbles: true })); await __esperar(80); }
function lis() { return [].map.call(document.querySelectorAll("li"), function (l) { return l.textContent.trim(); }); }
__assert(sel.value === "todos", 'O select deveria começar em "todos".');
__assert(lis().length === 5, "Com todos, deveriam aparecer os 5 pedidos.");
__assert(lis()[0] === "#1 Ana - R$ 120.00", 'O primeiro item deveria ser "#1 Ana - R$ 120.00", mas é "' + lis()[0] + '".');
__assert(/Total: R\$ 495\.40/.test(__texto()), 'Com todos, o total deveria ser "Total: R$ 495.40".');
await escolher("pendente");
__assert(lis().length === 3, "Filtrando pendentes, deveriam aparecer 3 pedidos (Bruno, Diego, Eva).");
__assert(/Total: R\$ 285\.50/.test(__texto()), 'O total dos pendentes deveria ser "Total: R$ 285.50".');
await escolher("entregue");
__assert(lis().join("|") === "#1 Ana - R$ 120.00|#3 Carla - R$ 89.90", "Filtrando entregues, deveriam aparecer só Ana e Carla. Aparecem: " + lis().join(", "));
__assert(/Total: R\$ 209\.90/.test(__texto()), 'O total dos entregues deveria ser "Total: R$ 209.90".');
await escolher("todos");
__assert(lis().length === 5, "Voltando para todos, os 5 pedidos deveriam reaparecer.");`,
      padroes: [[/value\s*=\s*\{\s*status\s*\}/, "O select deve ser controlado: value={status}."]]
    }
  ],

  /* ======================= i3: Rotas com React Router ======================= */
  i3: [
    {
      tipo: "completar",
      titulo: "Menu do site com Links",
      enunciado: c`O site da escola de idiomas tem as páginas Início e Sobre. Complete:
        <ul>
          <li>o link para <code>/sobre</code> deve trocar de página <b>sem recarregar</b> (use o componente do React Router);</li>
          <li>a rota <code>/sobre</code> deve mostrar <code>&lt;h2&gt;Sobre nós&lt;/h2&gt;</code>.</li>
        </ul>
        No sandbox usamos <code>MemoryRouter</code> (no projeto real seria <code>BrowserRouter</code>). Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Links internos: <code>&lt;Link to="/caminho"&gt;</code>. Cada rota diz o que mostrar na prop <code>element</code>.`,
      lang: "react",
      inicial: c`import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/">Início</Link> | <____ to="/sobre">Sobre</____>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Bem-vindo à Escola Fala Fácil</h2>} />
        <Route path="/sobre" ____={<h2>Sobre nós</h2>} />
      </Routes>
    </MemoryRouter>
  );
}
`,
      solucao: c`import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/">Início</Link> | <Link to="/sobre">Sobre</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Bem-vindo à Escola Fala Fácil</h2>} />
        <Route path="/sobre" element={<h2>Sobre nós</h2>} />
      </Routes>
    </MemoryRouter>
  );
}`,
      teste: c`
function link(t) { return [].slice.call(document.querySelectorAll("a")).find(function (a) { return a.textContent.trim() === t; }); }
function h2() { var h = document.querySelector("h2"); return h ? h.textContent.trim() : ""; }
__assert(h2() === "Bem-vindo à Escola Fala Fácil", "Na rota / deveria aparecer a página inicial.");
__assert(link("Sobre"), 'O "Sobre" deveria ser um link (<Link>, que vira <a>).');
link("Sobre").click(); await __esperar(150);
__assert(h2() === "Sobre nós", 'Clicando em Sobre deveria aparecer "Sobre nós", mas aparece "' + h2() + '".');
link("Início").click(); await __esperar(150);
__assert(h2() === "Bem-vindo à Escola Fala Fácil", "Clicando em Início deveria voltar para a página inicial.");`
    },
    {
      tipo: "completar",
      titulo: "Detalhe do produto com useParams",
      enunciado: c`Na loja, cada produto tem sua página em <code>/produtos/ID</code>. Complete:
        <ul>
          <li>a rota com a parte variável <code>id</code>;</li>
          <li>a leitura do <code>id</code> do endereço dentro de <code>DetalheProduto</code>.</li>
        </ul>
        Clicando em “Mouse”, por exemplo, deve aparecer <b>“Mouse - R$ 89.90”</b>. Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Partes variáveis começam com dois-pontos: <code>/produtos/:id</code>. Leia com <code>const { id } = useParams();</code>.`,
      lang: "react",
      inicial: c`import { MemoryRouter, Routes, Route, Link, useParams } from "react-router-dom";

const PRODUTOS = {
  1: { nome: "Caneca", preco: 35 },
  2: { nome: "Teclado", preco: 149 },
  3: { nome: "Mouse", preco: 89.9 },
};

function DetalheProduto() {
  const { ____ } = ____();
  const p = PRODUTOS[id];
  if (!p) return <h2>Produto não encontrado</h2>;
  return <h2>{p.nome} - R$ {p.preco.toFixed(2)}</h2>;
}

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/produtos/1">Caneca</Link> | <Link to="/produtos/2">Teclado</Link> | <Link to="/produtos/3">Mouse</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Escolha um produto</h2>} />
        <Route path="/produtos/____" element={<DetalheProduto />} />
      </Routes>
    </MemoryRouter>
  );
}
`,
      solucao: c`import { MemoryRouter, Routes, Route, Link, useParams } from "react-router-dom";

const PRODUTOS = {
  1: { nome: "Caneca", preco: 35 },
  2: { nome: "Teclado", preco: 149 },
  3: { nome: "Mouse", preco: 89.9 },
};

function DetalheProduto() {
  const { id } = useParams();
  const p = PRODUTOS[id];
  if (!p) return <h2>Produto não encontrado</h2>;
  return <h2>{p.nome} - R$ {p.preco.toFixed(2)}</h2>;
}

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/produtos/1">Caneca</Link> | <Link to="/produtos/2">Teclado</Link> | <Link to="/produtos/3">Mouse</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Escolha um produto</h2>} />
        <Route path="/produtos/:id" element={<DetalheProduto />} />
      </Routes>
    </MemoryRouter>
  );
}`,
      teste: c`
function link(t) { return [].slice.call(document.querySelectorAll("a")).find(function (a) { return a.textContent.trim() === t; }); }
function h2() { var h = document.querySelector("h2"); return h ? h.textContent.trim() : ""; }
__assert(h2() === "Escolha um produto", "Na rota / deveria aparecer Escolha um produto.");
link("Mouse").click(); await __esperar(150);
__assert(h2() === "Mouse - R$ 89.90", 'Clicando em Mouse deveria aparecer "Mouse - R$ 89.90", mas aparece "' + h2() + '".');
link("Caneca").click(); await __esperar(150);
__assert(h2() === "Caneca - R$ 35.00", 'Clicando em Caneca deveria aparecer "Caneca - R$ 35.00".');
link("Teclado").click(); await __esperar(150);
__assert(h2() === "Teclado - R$ 149.00", 'Clicando em Teclado deveria aparecer "Teclado - R$ 149.00".');`
    },
    {
      tipo: "completar",
      titulo: "Página 404 com botão de voltar",
      enunciado: c`Quem acessar um endereço que não existe deve ver <b>“Página não encontrada”</b> e um botão <b>Voltar para o início</b> que navega por código até <code>/</code>.
        <ul>
          <li>a última rota deve pegar <b>qualquer</b> endereço;</li>
          <li><code>NaoEncontrada</code> obtém a função de navegar com o hook do React Router e a usa no clique.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O caminho <code>"*"</code> combina com tudo. Para navegar por código: <code>const navigate = useNavigate();</code> e <code>navigate("/")</code>.`,
      lang: "react",
      inicial: c`import { MemoryRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function NaoEncontrada() {
  const navigate = ____();
  return (
    <div>
      <h2>Página não encontrada</h2>
      <button onClick={() => navigate("____")}>Voltar para o início</button>
    </div>
  );
}

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/">Início</Link> | <Link to="/cardapio">Cardápio</Link> | <Link to="/promocoes">Promoções</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Pizzaria Bella Massa</h2>} />
        <Route path="/cardapio" element={<h2>Nosso cardápio</h2>} />
        <Route path="____" element={<NaoEncontrada />} />
      </Routes>
    </MemoryRouter>
  );
}
`,
      solucao: c`import { MemoryRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function NaoEncontrada() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Página não encontrada</h2>
      <button onClick={() => navigate("/")}>Voltar para o início</button>
    </div>
  );
}

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/">Início</Link> | <Link to="/cardapio">Cardápio</Link> | <Link to="/promocoes">Promoções</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Pizzaria Bella Massa</h2>} />
        <Route path="/cardapio" element={<h2>Nosso cardápio</h2>} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </MemoryRouter>
  );
}`,
      teste: c`
function link(t) { return [].slice.call(document.querySelectorAll("a")).find(function (a) { return a.textContent.trim() === t; }); }
function h2() { var h = document.querySelector("h2"); return h ? h.textContent.trim() : ""; }
__assert(h2() === "Pizzaria Bella Massa", "Na rota / deveria aparecer Pizzaria Bella Massa.");
link("Cardápio").click(); await __esperar(150);
__assert(h2() === "Nosso cardápio", "O link Cardápio deveria mostrar Nosso cardápio.");
link("Promoções").click(); await __esperar(150);
__assert(h2() === "Página não encontrada", "/promocoes não existe: deveria aparecer Página não encontrada (rota *). Aparece: " + h2());
var b = __botao("Voltar para o início");
__assert(b, "Na página 404 deveria haver o botão Voltar para o início.");
b.click(); await __esperar(150);
__assert(h2() === "Pizzaria Bella Massa", "O botão deveria navegar de volta para /.");`
    },
    {
      tipo: "criar",
      titulo: "Painel da clínica com rotas",
      enunciado: c`Crie o painel da clínica com <code>MemoryRouter</code> (use <code>future={{ v7_startTransition: true, v7_relativeSplatPath: true }}</code>) e a lista <code>PACIENTES</code> já pronta:
        <ul>
          <li>um <code>&lt;nav&gt;</code> com os links <b>Painel</b> (<code>/</code>) e <b>Pacientes</b> (<code>/pacientes</code>);</li>
          <li><code>/</code>: <code>&lt;h2&gt;Painel&lt;/h2&gt;</code>;</li>
          <li><code>/pacientes</code>: <code>&lt;h2&gt;Pacientes&lt;/h2&gt;</code> e uma <code>&lt;ul&gt;</code> com um <code>&lt;Link&gt;</code> para cada paciente (texto = nome, destino <code>/pacientes/ID</code>);</li>
          <li><code>/pacientes/:id</code>: <code>&lt;h2&gt;Paciente: NOME&lt;/h2&gt;</code> e <b>“Idade: N anos”</b>;</li>
          <li>qualquer outro endereço: <code>&lt;h2&gt;Página não encontrada&lt;/h2&gt;</code>.</li>
        </ul>`,
      dica: c`Na página de detalhe: <code>const { id } = useParams();</code> e <code>PACIENTES.find((p) =&gt; p.id === Number(id))</code> (o id do endereço chega como texto).`,
      lang: "react",
      inicial: c`import { MemoryRouter, Routes, Route, Link, useParams } from "react-router-dom";

const PACIENTES = [
  { id: 1, nome: "Helena Prado", idade: 34 },
  { id: 2, nome: "Rafael Nunes", idade: 58 },
  { id: 3, nome: "Sofia Ramos", idade: 7 },
];

export default function App() {
  // MemoryRouter + nav + Routes
  return <div></div>;
}
`,
      solucao: c`import { MemoryRouter, Routes, Route, Link, useParams } from "react-router-dom";

const PACIENTES = [
  { id: 1, nome: "Helena Prado", idade: 34 },
  { id: 2, nome: "Rafael Nunes", idade: 58 },
  { id: 3, nome: "Sofia Ramos", idade: 7 },
];

function ListaPacientes() {
  return (
    <div>
      <h2>Pacientes</h2>
      <ul>
        {PACIENTES.map((p) => (
          <li key={p.id}><Link to={"/pacientes/" + p.id}>{p.nome}</Link></li>
        ))}
      </ul>
    </div>
  );
}

function DetalhePaciente() {
  const { id } = useParams();
  const p = PACIENTES.find((x) => x.id === Number(id));
  if (!p) return <h2>Página não encontrada</h2>;
  return (
    <div>
      <h2>Paciente: {p.nome}</h2>
      <p>Idade: {p.idade} anos</p>
    </div>
  );
}

export default function App() {
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/">Painel</Link> | <Link to="/pacientes">Pacientes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Painel</h2>} />
        <Route path="/pacientes" element={<ListaPacientes />} />
        <Route path="/pacientes/:id" element={<DetalhePaciente />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Routes>
    </MemoryRouter>
  );
}`,
      teste: c`
function link(t) { return [].slice.call(document.querySelectorAll("a")).find(function (a) { return a.textContent.trim() === t; }); }
function h2() { var h = document.querySelector("h2"); return h ? h.textContent.trim() : ""; }
__assert(link("Painel") && link("Pacientes"), "O nav deveria ter os links Painel e Pacientes.");
__assert(h2() === "Painel", "Na rota / deveria aparecer o h2 Painel.");
link("Pacientes").click(); await __esperar(150);
__assert(h2() === "Pacientes", "O link Pacientes deveria mostrar o h2 Pacientes.");
__assert(document.querySelectorAll("ul a").length === 3, "A lista de pacientes deveria ter 3 links.");
link("Rafael Nunes").click(); await __esperar(150);
__assert(h2() === "Paciente: Rafael Nunes", 'Clicando em Rafael Nunes deveria aparecer "Paciente: Rafael Nunes", mas aparece "' + h2() + '".');
__assert(/Idade: 58 anos/.test(__texto()), 'Deveria mostrar "Idade: 58 anos".');
link("Pacientes").click(); await __esperar(150);
link("Sofia Ramos").click(); await __esperar(150);
__assert(h2() === "Paciente: Sofia Ramos" && /Idade: 7 anos/.test(__texto()), "O detalhe da Sofia deveria mostrar o nome e Idade: 7 anos.");
link("Painel").click(); await __esperar(150);
__assert(h2() === "Painel", "O link Painel deveria voltar para a página inicial.");`,
      padroes: [
        [/MemoryRouter/, "Use o MemoryRouter."],
        [/path\s*=\s*["']\/pacientes\/:id["']/, 'Crie a rota path="/pacientes/:id".'],
        [/useParams\s*\(/, "Leia o id com useParams()."],
        [/path\s*=\s*["']\*["']/, 'Crie a rota path="*" para a página não encontrada.']
      ]
    },
    {
      tipo: "criar",
      titulo: "Login com rota protegida",
      enunciado: c`Crie um app com área restrita usando <code>MemoryRouter</code> (com <code>future={{ v7_startTransition: true, v7_relativeSplatPath: true }}</code>):
        <ul>
          <li>o <code>App</code> guarda o estado <code>logado</code> (começa <code>false</code>);</li>
          <li>um <code>&lt;nav&gt;</code> com o link <b>Dashboard</b> (<code>/dashboard</code>);</li>
          <li><code>/login</code>: <code>&lt;h2&gt;Login&lt;/h2&gt;</code> e um botão <b>Entrar</b> que faz <code>logado</code> virar <code>true</code> e navega para <code>/dashboard</code> com <code>useNavigate</code>;</li>
          <li><code>/dashboard</code>: se logado, <code>&lt;h2&gt;Bem-vindo ao dashboard&lt;/h2&gt;</code> e um botão <b>Sair</b> (desloga e navega para <code>/login</code>); se não, redireciona para <code>/login</code> com <code>&lt;Navigate to="/login" /&gt;</code>;</li>
          <li><code>/</code>: <code>&lt;h2&gt;Início&lt;/h2&gt;</code>.</li>
        </ul>`,
      dica: c`Crie componentes <code>Login({ onEntrar })</code> e <code>Dashboard({ logado, onSair })</code> e passe as funções por props. O <code>useNavigate</code> só funciona dentro do <code>MemoryRouter</code>, por isso chame-o nesses componentes.`,
      lang: "react",
      inicial: c`import { useState } from "react";
import { MemoryRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

export default function App() {
  // estado logado + rotas /, /login e /dashboard
  return <div></div>;
}
`,
      solucao: c`import { useState } from "react";
import { MemoryRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

function Login({ onEntrar }) {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => { onEntrar(); navigate("/dashboard"); }}>Entrar</button>
    </div>
  );
}

function Dashboard({ logado, onSair }) {
  const navigate = useNavigate();
  if (!logado) return <Navigate to="/login" />;
  return (
    <div>
      <h2>Bem-vindo ao dashboard</h2>
      <button onClick={() => { onSair(); navigate("/login"); }}>Sair</button>
    </div>
  );
}

export default function App() {
  const [logado, setLogado] = useState(false);
  return (
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Início</h2>} />
        <Route path="/login" element={<Login onEntrar={() => setLogado(true)} />} />
        <Route path="/dashboard" element={<Dashboard logado={logado} onSair={() => setLogado(false)} />} />
      </Routes>
    </MemoryRouter>
  );
}`,
      teste: c`
function link(t) { return [].slice.call(document.querySelectorAll("a")).find(function (a) { return a.textContent.trim() === t; }); }
function h2() { var h = document.querySelector("h2"); return h ? h.textContent.trim() : ""; }
__assert(h2() === "Início", "Na rota / deveria aparecer o h2 Início.");
__assert(link("Dashboard"), "Falta o link Dashboard no nav.");
link("Dashboard").click(); await __esperar(200);
__assert(h2() === "Login", "Sem login, ir para /dashboard deveria redirecionar para a página de Login. Aparece: " + h2());
__assert(__botao("Entrar"), "A página de login deveria ter o botão Entrar.");
__botao("Entrar").click(); await __esperar(200);
__assert(h2() === "Bem-vindo ao dashboard", "Depois de entrar, deveria ir para o dashboard. Aparece: " + h2());
link("Dashboard").click(); await __esperar(200);
__assert(h2() === "Bem-vindo ao dashboard", "Logado, o link Dashboard deveria continuar mostrando o dashboard.");
__botao("Sair").click(); await __esperar(200);
__assert(h2() === "Login", "Sair deveria levar para a página de Login.");
link("Dashboard").click(); await __esperar(200);
__assert(h2() === "Login", "Depois de sair, o dashboard deveria voltar a ser protegido.");`,
      padroes: [
        [/useNavigate\s*\(/, "Use useNavigate() para navegar depois de entrar/sair."],
        [/<Navigate\b/, 'Use <Navigate to="/login" /> para proteger o dashboard.']
      ]
    }
  ],

  /* ======================= a1: Context API ======================= */
  a1: [
    {
      tipo: "completar",
      titulo: "Tema claro e escuro",
      enunciado: c`O app do banco digital tem tema claro e escuro, compartilhado por Context:
        <ul>
          <li>crie o contexto <code>TemaContext</code>;</li>
          <li>o <code>TemaProvider</code> fornece <code>{ tema, alternar }</code> para os filhos;</li>
          <li><code>Pagina</code> e <code>BotaoTema</code> leem o contexto <b>sem receber props</b>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>createContext()</code> cria, <code>&lt;TemaContext.Provider value={...}&gt;</code> fornece e <code>useContext(TemaContext)</code> lê.`,
      lang: "react",
      inicial: c`import { createContext, useContext, useState } from "react";

const TemaContext = ____("claro");

function TemaProvider({ children }) {
  const [tema, setTema] = useState("claro");
  const alternar = () => setTema((t) => (t === "claro" ? "escuro" : "claro"));
  return (
    <TemaContext.____ value={{ tema, alternar }}>
      {children}
    </TemaContext.____>
  );
}

function BotaoTema() {
  const { alternar } = useContext(TemaContext);
  return <button onClick={alternar}>Mudar tema</button>;
}

function Pagina() {
  const { tema } = ____(TemaContext);
  return (
    <div className={"pagina " + tema}>
      <p>Tema atual: {tema}</p>
      <BotaoTema />
    </div>
  );
}

export default function App() {
  return (
    <TemaProvider>
      <Pagina />
    </TemaProvider>
  );
}
`,
      solucao: c`import { createContext, useContext, useState } from "react";

const TemaContext = createContext("claro");

function TemaProvider({ children }) {
  const [tema, setTema] = useState("claro");
  const alternar = () => setTema((t) => (t === "claro" ? "escuro" : "claro"));
  return (
    <TemaContext.Provider value={{ tema, alternar }}>
      {children}
    </TemaContext.Provider>
  );
}

function BotaoTema() {
  const { alternar } = useContext(TemaContext);
  return <button onClick={alternar}>Mudar tema</button>;
}

function Pagina() {
  const { tema } = useContext(TemaContext);
  return (
    <div className={"pagina " + tema}>
      <p>Tema atual: {tema}</p>
      <BotaoTema />
    </div>
  );
}

export default function App() {
  return (
    <TemaProvider>
      <Pagina />
    </TemaProvider>
  );
}`,
      teste: c`
var pg = document.querySelector(".pagina");
__assert(pg, "A div .pagina deveria aparecer.");
__assert(pg.className === "pagina claro" && /Tema atual: claro/.test(__texto()), "O tema deveria começar claro.");
__botao("Mudar tema").click(); await __esperar();
__assert(document.querySelector(".pagina").className === "pagina escuro", 'Depois do clique, a div deveria ter className "pagina escuro".');
__assert(/Tema atual: escuro/.test(__texto()), 'Deveria mostrar "Tema atual: escuro".');
__botao("Mudar tema").click(); await __esperar();
__assert(/Tema atual: claro/.test(__texto()), "Clicando de novo, o tema deveria voltar para claro.");`
    },
    {
      tipo: "completar",
      titulo: "Carrinho global da loja",
      enunciado: c`O ícone do carrinho no topo precisa saber o que foi comprado lá embaixo, na vitrine. Complete o contexto do carrinho:
        <ul>
          <li>o Provider mostra os componentes de dentro dele;</li>
          <li><code>adicionar(produto)</code> cria uma lista <b>nova</b> com o produto no fim;</li>
          <li>o hook <code>useCarrinho</code> é um atalho para ler o contexto.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Os filhos chegam em <code>children</code>. Para criar a lista nova: <code>[...lista, produto]</code>.`,
      lang: "react",
      inicial: c`import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext(null);

function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const adicionar = (produto) => setItens((lista) => [...lista, ____]);
  const total = itens.reduce((s, p) => s + p.preco, 0);
  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, total }}>
      {____}
    </CarrinhoContext.Provider>
  );
}

const useCarrinho = () => ____(CarrinhoContext);

function Topo() {
  const { itens, total } = useCarrinho();
  return <header>Carrinho ({itens.length}) - R$ {total.toFixed(2)}</header>;
}

function Vitrine() {
  const { adicionar } = useCarrinho();
  return (
    <div>
      <button onClick={() => adicionar({ nome: "Caneca", preco: 35 })}>Comprar Caneca</button>
      <button onClick={() => adicionar({ nome: "Camiseta", preco: 59.9 })}>Comprar Camiseta</button>
    </div>
  );
}

export default function App() {
  return (
    <CarrinhoProvider>
      <Topo />
      <Vitrine />
    </CarrinhoProvider>
  );
}
`,
      solucao: c`import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext(null);

function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const adicionar = (produto) => setItens((lista) => [...lista, produto]);
  const total = itens.reduce((s, p) => s + p.preco, 0);
  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, total }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

const useCarrinho = () => useContext(CarrinhoContext);

function Topo() {
  const { itens, total } = useCarrinho();
  return <header>Carrinho ({itens.length}) - R$ {total.toFixed(2)}</header>;
}

function Vitrine() {
  const { adicionar } = useCarrinho();
  return (
    <div>
      <button onClick={() => adicionar({ nome: "Caneca", preco: 35 })}>Comprar Caneca</button>
      <button onClick={() => adicionar({ nome: "Camiseta", preco: 59.9 })}>Comprar Camiseta</button>
    </div>
  );
}

export default function App() {
  return (
    <CarrinhoProvider>
      <Topo />
      <Vitrine />
    </CarrinhoProvider>
  );
}`,
      teste: c`
function topo() { var h = document.querySelector("header"); return h ? h.textContent.trim() : ""; }
__assert(topo() === "Carrinho (0) - R$ 0.00", 'O topo deveria começar com "Carrinho (0) - R$ 0.00". Mostra: ' + topo());
__botao("Comprar Caneca").click(); await __esperar();
__botao("Comprar Camiseta").click(); await __esperar();
__botao("Comprar Caneca").click(); await __esperar();
__assert(topo() === "Carrinho (3) - R$ 129.90", 'Depois de 3 compras deveria mostrar "Carrinho (3) - R$ 129.90". Mostra: ' + topo());`
    },
    {
      tipo: "completar",
      titulo: "Usuário logado com AuthProvider",
      enunciado: c`O sistema de agendamento mostra quem está logado no topo e na saudação, usando o <code>AuthContext</code>.
        <ul>
          <li><code>entrar(dados)</code> guarda o usuário; <code>sair()</code> volta para <code>null</code>;</li>
          <li><code>Saudacao</code> mostra <b>“Bem-vinda, Ana!”</b> quando há usuário e <b>“Você não está logado.”</b> quando não há.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Sem usuário, o valor é <code>null</code>. Ternário: <code>usuario ? "..." : "..."</code>.`,
      lang: "react",
      inicial: c`import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const entrar = (dados) => setUsuario(____);
  const sair = () => setUsuario(____);
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
  return <p>{usuario ____ "Bem-vinda, " + usuario.nome + "!" : "Você não está logado."}</p>;
}

export default function App() {
  return (
    <AuthProvider>
      <Topo />
      <Saudacao />
    </AuthProvider>
  );
}
`,
      solucao: c`import { createContext, useContext, useState } from "react";

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
}`,
      teste: c`
__assert(/Você não está logado\./.test(__texto()), 'Sem usuário, deveria mostrar "Você não está logado."');
__botao("Entrar como Ana").click(); await __esperar();
__assert(/Bem-vinda, Ana!/.test(__texto()), 'Depois de entrar, deveria mostrar "Bem-vinda, Ana!".');
__assert(__botao("Sair (Ana)"), 'O topo deveria mostrar o botão "Sair (Ana)".');
__botao("Sair (Ana)").click(); await __esperar();
__assert(/Você não está logado\./.test(__texto()) && __botao("Entrar como Ana"), "Depois de sair, deveria voltar ao estado deslogado.");`
    },
    {
      tipo: "criar",
      titulo: "Idioma do app (PT e EN)",
      enunciado: c`O e-commerce vai atender clientes de fora. Usando Context, crie:
        <ul>
          <li><code>IdiomaContext</code> e um <code>IdiomaProvider</code> que guarda o estado <code>idioma</code> (começa em <code>"pt"</code>) e fornece <code>{ idioma, setIdioma }</code>;</li>
          <li>componente <code>Titulo()</code> (sem props) que mostra <code>&lt;h1&gt;</code> com <code>TEXTOS[idioma].titulo</code>;</li>
          <li>componente <code>BotaoComprar()</code> (sem props) que mostra um botão com <code>TEXTOS[idioma].comprar</code>;</li>
          <li>componente <code>SeletorIdioma()</code> com os botões <b>PT</b> e <b>EN</b>, que trocam o idioma;</li>
          <li>o <code>App</code> envolve tudo com o <code>IdiomaProvider</code>.</li>
        </ul>`,
      dica: c`Dentro de cada componente: <code>const { idioma } = useContext(IdiomaContext);</code>.`,
      lang: "react",
      inicial: c`import { createContext, useContext, useState } from "react";

const TEXTOS = {
  pt: { titulo: "Bem-vindo à loja", comprar: "Comprar" },
  en: { titulo: "Welcome to the store", comprar: "Buy" },
};

// crie IdiomaContext, IdiomaProvider, Titulo, BotaoComprar e SeletorIdioma

export default function App() {
  return <div></div>;
}
`,
      solucao: c`import { createContext, useContext, useState } from "react";

const TEXTOS = {
  pt: { titulo: "Bem-vindo à loja", comprar: "Comprar" },
  en: { titulo: "Welcome to the store", comprar: "Buy" },
};

const IdiomaContext = createContext(null);

function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState("pt");
  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
}

function Titulo() {
  const { idioma } = useContext(IdiomaContext);
  return <h1>{TEXTOS[idioma].titulo}</h1>;
}

function BotaoComprar() {
  const { idioma } = useContext(IdiomaContext);
  return <button>{TEXTOS[idioma].comprar}</button>;
}

function SeletorIdioma() {
  const { setIdioma } = useContext(IdiomaContext);
  return (
    <div>
      <button onClick={() => setIdioma("pt")}>PT</button>
      <button onClick={() => setIdioma("en")}>EN</button>
    </div>
  );
}

export default function App() {
  return (
    <IdiomaProvider>
      <SeletorIdioma />
      <Titulo />
      <BotaoComprar />
    </IdiomaProvider>
  );
}`,
      teste: c`
function h1() { var h = document.querySelector("h1"); return h ? h.textContent.trim() : ""; }
__assert(h1() === "Bem-vindo à loja", 'Em português, o h1 deveria ser "Bem-vindo à loja". É: ' + h1());
__assert(__botao("Comprar"), "Em português, deveria haver o botão Comprar.");
__assert(__botao("PT") && __botao("EN"), "Crie os botões PT e EN.");
__botao("EN").click(); await __esperar();
__assert(h1() === "Welcome to the store", 'Em inglês, o h1 deveria ser "Welcome to the store".');
__assert(__botao("Buy") && !__botao("Comprar"), "Em inglês, o botão deveria dizer Buy.");
__botao("PT").click(); await __esperar();
__assert(h1() === "Bem-vindo à loja" && __botao("Comprar"), "Voltando para PT, os textos deveriam voltar ao português.");`,
      padroes: [
        [/createContext\s*\(/, "Crie o contexto com createContext()."],
        [/IdiomaContext\.Provider/, "Forneça o idioma com <IdiomaContext.Provider value={...}>."],
        [/function\s+Titulo\s*\(\s*\)/, "Titulo não recebe props: function Titulo() lendo o contexto."],
        [/function\s+BotaoComprar\s*\(\s*\)/, "BotaoComprar não recebe props: function BotaoComprar() lendo o contexto."],
        [/useContext\s*\(\s*IdiomaContext\s*\)/, "Leia o idioma com useContext(IdiomaContext)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Avisos da equipe com contexto",
      enunciado: c`Crie um mural de avisos da equipe usando Context, sem passar props entre os componentes:
        <ul>
          <li><code>AvisosProvider</code> guarda a lista <code>avisos</code> e fornece <code>avisos</code>, <code>adicionar(texto)</code> e <code>limpar()</code>;</li>
          <li>um hook <code>useAvisos()</code> que devolve o valor do contexto;</li>
          <li><code>Sino()</code>: um <code>&lt;span className="sino"&gt;</code> com <b>“Avisos: N”</b>;</li>
          <li><code>NovoAviso()</code>: um <code>&lt;input&gt;</code> controlado e um botão <b>Publicar</b> (não publica texto vazio e limpa o campo);</li>
          <li><code>Mural()</code>: uma <code>&lt;ul&gt;</code> com um <code>&lt;li&gt;</code> por aviso e um botão <b>Limpar tudo</b>.</li>
        </ul>`,
      dica: c`<code>const useAvisos = () =&gt; useContext(AvisosContext);</code>. Cada componente chama <code>useAvisos()</code> e pega só o que precisa.`,
      lang: "react",
      inicial: c`import { createContext, useContext, useState } from "react";

// crie AvisosContext, AvisosProvider, useAvisos, Sino, NovoAviso e Mural

export default function App() {
  return <div></div>;
}
`,
      solucao: c`import { createContext, useContext, useState } from "react";

const AvisosContext = createContext(null);

function AvisosProvider({ children }) {
  const [avisos, setAvisos] = useState([]);
  const adicionar = (texto) => setAvisos((lista) => [...lista, { id: crypto.randomUUID(), texto }]);
  const limpar = () => setAvisos([]);
  return (
    <AvisosContext.Provider value={{ avisos, adicionar, limpar }}>
      {children}
    </AvisosContext.Provider>
  );
}

const useAvisos = () => useContext(AvisosContext);

function Sino() {
  const { avisos } = useAvisos();
  return <span className="sino">Avisos: {avisos.length}</span>;
}

function NovoAviso() {
  const { adicionar } = useAvisos();
  const [texto, setTexto] = useState("");
  function publicar() {
    if (!texto.trim()) return;
    adicionar(texto.trim());
    setTexto("");
  }
  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Novo aviso" />
      <button onClick={publicar}>Publicar</button>
    </div>
  );
}

function Mural() {
  const { avisos, limpar } = useAvisos();
  return (
    <div>
      <ul>{avisos.map((a) => <li key={a.id}>{a.texto}</li>)}</ul>
      <button onClick={limpar}>Limpar tudo</button>
    </div>
  );
}

export default function App() {
  return (
    <AvisosProvider>
      <Sino />
      <NovoAviso />
      <Mural />
    </AvisosProvider>
  );
}`,
      teste: c`
function sino() { var s = document.querySelector(".sino"); return s ? s.textContent.trim() : ""; }
async function publicar(v) { __digitar(document.querySelector("input"), v); await __esperar(); __botao("Publicar").click(); await __esperar(80); }
__assert(sino() === "Avisos: 0", 'O sino deveria começar com "Avisos: 0". Mostra: ' + sino());
await publicar("Reunião às 10h");
await publicar("Inventário na sexta");
__assert(sino() === "Avisos: 2", 'Depois de 2 publicações, o sino deveria mostrar "Avisos: 2". Mostra: ' + sino());
var lis = document.querySelectorAll("li");
__assert(lis.length === 2 && lis[1].textContent.trim() === "Inventário na sexta", "O mural deveria listar os 2 avisos, na ordem.");
__assert(document.querySelector("input").value === "", "O campo deveria ficar vazio depois de publicar.");
await publicar("   ");
__assert(sino() === "Avisos: 2", "Aviso vazio não pode ser publicado.");
__botao("Limpar tudo").click(); await __esperar();
__assert(sino() === "Avisos: 0" && document.querySelectorAll("li").length === 0, "Limpar tudo deveria zerar o sino e o mural.");`,
      padroes: [
        [/createContext\s*\(/, "Crie o contexto com createContext()."],
        [/function\s+useAvisos|const\s+useAvisos\s*=/, "Crie o hook useAvisos()."],
        [/function\s+Sino\s*\(\s*\)/, "Sino não recebe props: function Sino() lendo o contexto."],
        [/function\s+Mural\s*\(\s*\)/, "Mural não recebe props: function Mural() lendo o contexto."]
      ]
    }
  ],

  /* ======================= a2: Performance ======================= */
  a2: [
    {
      tipo: "completar",
      titulo: "Linhas da tabela com memo",
      enunciado: c`A tabela de funcionários é redesenhada inteira toda vez que o contador de visitas muda, mesmo sem nada ter mudado nela.
        Use <code>memo</code> para que cada <code>Linha</code> só redesenhe quando suas props mudarem.
        (O código conta quantas vezes as linhas foram desenhadas em <code>window.desenhos</code>.)
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>memo</code> é importado de <code>"react"</code> e envolve a função do componente: <code>memo(function Linha(...) { ... })</code>.`,
      lang: "react",
      inicial: c`import { ____, useState } from "react";

window.desenhos = 0;

const Linha = ____(function Linha({ nome, cargo }) {
  window.desenhos++;
  return <li>{nome} - {cargo}</li>;
});

const EQUIPE = [
  { id: 1, nome: "Ana", cargo: "Analista" },
  { id: 2, nome: "Bruno", cargo: "Designer" },
  { id: 3, nome: "Carla", cargo: "Gerente" },
];

export default function App() {
  const [visitas, setVisitas] = useState(0);
  return (
    <div>
      <button onClick={() => setVisitas((v) => v + 1)}>+1 visita</button>
      <p>Visitas: {visitas}</p>
      <ul>{EQUIPE.map((f) => <Linha key={f.id} nome={f.nome} cargo={f.cargo} />)}</ul>
    </div>
  );
}
`,
      solucao: c`import { memo, useState } from "react";

window.desenhos = 0;

const Linha = memo(function Linha({ nome, cargo }) {
  window.desenhos++;
  return <li>{nome} - {cargo}</li>;
});

const EQUIPE = [
  { id: 1, nome: "Ana", cargo: "Analista" },
  { id: 2, nome: "Bruno", cargo: "Designer" },
  { id: 3, nome: "Carla", cargo: "Gerente" },
];

export default function App() {
  const [visitas, setVisitas] = useState(0);
  return (
    <div>
      <button onClick={() => setVisitas((v) => v + 1)}>+1 visita</button>
      <p>Visitas: {visitas}</p>
      <ul>{EQUIPE.map((f) => <Linha key={f.id} nome={f.nome} cargo={f.cargo} />)}</ul>
    </div>
  );
}`,
      teste: c`
__assert(document.querySelectorAll("li").length === 3, "A tabela deveria mostrar 3 funcionários.");
__assert(window.desenhos === 3, "No início, as 3 linhas deveriam ser desenhadas uma vez (desenhos = 3), mas desenhos = " + window.desenhos + ".");
var b = __botao("+1 visita");
b.click(); await __esperar(); b.click(); await __esperar(); b.click(); await __esperar();
__assert(/Visitas: 3/.test(__texto()), "O contador de visitas deveria chegar a 3.");
__assert(window.desenhos === 3, "As linhas não mudaram, então não deveriam redesenhar: desenhos deveria continuar 3, mas é " + window.desenhos + ". Use memo.");`
    },
    {
      tipo: "completar",
      titulo: "Total do pedido com useMemo",
      enunciado: c`O cálculo do total do pedido é caro (imagine milhares de itens). Ele não deve ser refeito quando o atendente só digita a observação, mas deve ser refeito quando os itens mudam.
        Use <code>useMemo</code> com a dependência certa. (O código conta os cálculos em <code>window.calculos</code>.)
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>useMemo(() =&gt; cálculo, [dependências])</code>. O total depende só de <code>itens</code>.`,
      lang: "react",
      inicial: c`import { useMemo, useState } from "react";

window.calculos = 0;

export default function App() {
  const [itens, setItens] = useState([
    { id: 1, nome: "Pizza", preco: 49.9 },
    { id: 2, nome: "Refrigerante", preco: 9 },
  ]);
  const [obs, setObs] = useState("");

  const total = ____(() => {
    window.calculos++;
    return itens.reduce((s, i) => s + i.preco, 0);
  }, [____]);

  return (
    <div>
      <input placeholder="Observação" value={obs} onChange={(e) => setObs(e.target.value)} />
      <button onClick={() => setItens([...itens, { id: Date.now(), nome: "Café", preco: 5 }])}>Adicionar café</button>
      <p>Total: R$ {total.toFixed(2)}</p>
    </div>
  );
}
`,
      solucao: c`import { useMemo, useState } from "react";

window.calculos = 0;

export default function App() {
  const [itens, setItens] = useState([
    { id: 1, nome: "Pizza", preco: 49.9 },
    { id: 2, nome: "Refrigerante", preco: 9 },
  ]);
  const [obs, setObs] = useState("");

  const total = useMemo(() => {
    window.calculos++;
    return itens.reduce((s, i) => s + i.preco, 0);
  }, [itens]);

  return (
    <div>
      <input placeholder="Observação" value={obs} onChange={(e) => setObs(e.target.value)} />
      <button onClick={() => setItens([...itens, { id: Date.now(), nome: "Café", preco: 5 }])}>Adicionar café</button>
      <p>Total: R$ {total.toFixed(2)}</p>
    </div>
  );
}`,
      teste: c`
__assert(/Total: R\$ 58\.90/.test(__texto()), 'O total inicial deveria ser "Total: R$ 58.90".');
__assert(window.calculos === 1, "No início, o total deveria ser calculado 1 vez (calculos = " + window.calculos + ").");
var inp = document.querySelector("input");
__digitar(inp, "s"); await __esperar(); __digitar(inp, "se"); await __esperar(); __digitar(inp, "sem cebola"); await __esperar();
__assert(window.calculos === 1, "Digitar a observação não deveria refazer o cálculo, mas calculos = " + window.calculos + ".");
__botao("Adicionar café").click(); await __esperar();
__assert(/Total: R\$ 63\.90/.test(__texto()), 'Depois de adicionar um café, o total deveria ser "Total: R$ 63.90".');
__assert(window.calculos === 2, "Quando os itens mudam, o cálculo deveria ser refeito (calculos = 2), mas calculos = " + window.calculos + ".");`
    },
    {
      tipo: "completar",
      titulo: "Botão memorizado com useCallback",
      enunciado: c`O <code>BotaoSalvar</code> já usa <code>memo</code>, mas continua redesenhando a cada tecla digitada, porque o <code>App</code> cria uma <b>função nova</b> a cada render.
        Use <code>useCallback</code> para manter a mesma função entre renders. (O código conta os desenhos do botão em <code>window.desenhosBotao</code>.)
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`<code>useCallback(fn, [])</code> devolve sempre a mesma função. Dentro dela, use a forma de função do setter: <code>setSalvos((s) =&gt; s + 1)</code>.`,
      lang: "react",
      inicial: c`import { memo, useCallback, useState } from "react";

window.desenhosBotao = 0;

const BotaoSalvar = memo(function BotaoSalvar({ onSalvar }) {
  window.desenhosBotao++;
  return <button onClick={onSalvar}>Salvar</button>;
});

export default function App() {
  const [nota, setNota] = useState("");
  const [salvos, setSalvos] = useState(0);

  const salvar = ____(() => setSalvos((s) => s + 1), ____);

  return (
    <div>
      <textarea value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Anotação do atendimento" />
      <BotaoSalvar onSalvar={salvar} />
      <p>Salvos: {salvos}</p>
    </div>
  );
}
`,
      solucao: c`import { memo, useCallback, useState } from "react";

window.desenhosBotao = 0;

const BotaoSalvar = memo(function BotaoSalvar({ onSalvar }) {
  window.desenhosBotao++;
  return <button onClick={onSalvar}>Salvar</button>;
});

export default function App() {
  const [nota, setNota] = useState("");
  const [salvos, setSalvos] = useState(0);

  const salvar = useCallback(() => setSalvos((s) => s + 1), []);

  return (
    <div>
      <textarea value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Anotação do atendimento" />
      <BotaoSalvar onSalvar={salvar} />
      <p>Salvos: {salvos}</p>
    </div>
  );
}`,
      teste: c`
__assert(window.desenhosBotao === 1, "No início, o botão deveria ser desenhado 1 vez.");
var ta = document.querySelector("textarea");
__digitar(ta, "C"); await __esperar(); __digitar(ta, "Cl"); await __esperar(); __digitar(ta, "Cliente pediu retorno"); await __esperar();
__assert(window.desenhosBotao === 1, "Digitar na anotação não deveria redesenhar o BotaoSalvar, mas ele foi desenhado " + window.desenhosBotao + " vezes. Use useCallback.");
__botao("Salvar").click(); await __esperar(); __botao("Salvar").click(); await __esperar();
__assert(/Salvos: 2/.test(__texto()), 'Depois de 2 cliques deveria mostrar "Salvos: 2". Use a forma de função do setter.');`
    },
    {
      tipo: "criar",
      titulo: "Relatório de vendas filtrado",
      enunciado: c`Crie o relatório de vendas com a lista <code>VENDAS</code> e a função <code>contarCalculo()</code> já prontas:
        <ul>
          <li>um <code>&lt;input&gt;</code> controlado para filtrar pelo nome do vendedor (sem diferenciar maiúsculas);</li>
          <li>com <code>useMemo</code>, calcule a lista filtrada <b>e</b> o total; chame <code>contarCalculo()</code> dentro do <code>useMemo</code>;</li>
          <li>mostre uma <code>&lt;ul&gt;</code> com <b>“Vendedor - R$ 1200.00”</b> para cada venda filtrada e um parágrafo <b>“Total: R$ X”</b>;</li>
          <li>um botão <b>Modo compacto</b> que alterna um estado <code>compacto</code> (pode mudar só a classe da lista). Alternar esse modo <b>não</b> pode refazer o cálculo.</li>
        </ul>`,
      dica: c`<code>useMemo(() =&gt; { contarCalculo(); const lista = ...; return { lista, total }; }, [filtro])</code>.`,
      lang: "react",
      inicial: c`import { useMemo, useState } from "react";

const VENDAS = [
  { id: 1, vendedor: "Marcos", valor: 1200 },
  { id: 2, vendedor: "Patrícia", valor: 850.5 },
  { id: 3, vendedor: "Marcela", valor: 430 },
  { id: 4, vendedor: "Rodrigo", valor: 2100 },
  { id: 5, vendedor: "Patrícia", valor: 300 },
];

window.calculos = 0;
function contarCalculo() { window.calculos++; }

export default function App() {
  // filtro, compacto, useMemo com lista e total
  return <div></div>;
}
`,
      solucao: c`import { useMemo, useState } from "react";

const VENDAS = [
  { id: 1, vendedor: "Marcos", valor: 1200 },
  { id: 2, vendedor: "Patrícia", valor: 850.5 },
  { id: 3, vendedor: "Marcela", valor: 430 },
  { id: 4, vendedor: "Rodrigo", valor: 2100 },
  { id: 5, vendedor: "Patrícia", valor: 300 },
];

window.calculos = 0;
function contarCalculo() { window.calculos++; }

export default function App() {
  const [filtro, setFiltro] = useState("");
  const [compacto, setCompacto] = useState(false);

  const { lista, total } = useMemo(() => {
    contarCalculo();
    const lista = VENDAS.filter((v) => v.vendedor.toLowerCase().includes(filtro.toLowerCase()));
    const total = lista.reduce((s, v) => s + v.valor, 0);
    return { lista, total };
  }, [filtro]);

  return (
    <div>
      <input placeholder="Filtrar vendedor" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      <button onClick={() => setCompacto((c) => !c)}>Modo compacto</button>
      <ul className={compacto ? "compacto" : ""}>
        {lista.map((v) => <li key={v.id}>{v.vendedor} - R$ {v.valor.toFixed(2)}</li>)}
      </ul>
      <p>Total: R$ {total.toFixed(2)}</p>
    </div>
  );
}`,
      teste: c`
function lis() { return [].map.call(document.querySelectorAll("li"), function (l) { return l.textContent.trim(); }); }
__assert(lis().length === 5, "Sem filtro, deveriam aparecer as 5 vendas.");
__assert(lis()[0] === "Marcos - R$ 1200.00", 'A primeira venda deveria aparecer como "Marcos - R$ 1200.00". Aparece: ' + lis()[0]);
__assert(/Total: R\$ 4880\.50/.test(__texto()), 'Sem filtro, o total deveria ser "Total: R$ 4880.50".');
var inp = document.querySelector("input");
__digitar(inp, "MARC"); await __esperar(80);
__assert(lis().length === 2, 'Filtrando "MARC" deveriam aparecer Marcos e Marcela (sem diferenciar maiúsculas).');
__assert(/Total: R\$ 1630\.00/.test(__texto()), 'O total filtrado por "MARC" deveria ser "Total: R$ 1630.00".');
__digitar(inp, "patrícia"); await __esperar(80);
__assert(lis().length === 2 && /Total: R\$ 1150\.50/.test(__texto()), 'Filtrando "patrícia", deveriam aparecer 2 vendas e "Total: R$ 1150.50".');
var antes = window.calculos;
__assert(antes >= 1, "Chame contarCalculo() dentro do useMemo.");
var b = __botao("Modo compacto");
__assert(b, "Falta o botão Modo compacto.");
b.click(); await __esperar(); b.click(); await __esperar(); b.click(); await __esperar();
__assert(window.calculos === antes, "Alternar o modo compacto não deveria refazer o cálculo (foi de " + antes + " para " + window.calculos + "). Confira as dependências do useMemo.");`,
      padroes: [[/useMemo\s*\(/, "Use useMemo para calcular a lista e o total."]]
    },
    {
      tipo: "criar",
      titulo: "Agenda de contatos sem redesenhos",
      enunciado: c`Crie uma agenda com a lista inicial <code>CONTATOS</code> e a função <code>contarDesenho()</code> já prontas:
        <ul>
          <li>um componente <code>Contato</code> com <code>memo</code>, que recebe <code>contato</code> e <code>onRemover</code>, chama <code>contarDesenho()</code> e devolve <code>&lt;li&gt;</code> com o nome e um botão <b>x</b> que chama <code>onRemover(contato.id)</code>;</li>
          <li>no <code>App</code>: estado <code>contatos</code> e um <code>&lt;input&gt;</code> controlado de anotação (estado <code>anotacao</code>);</li>
          <li>a função de remover criada com <code>useCallback</code>, de forma que ela <b>nunca mude</b>.</li>
        </ul>
        Resultado esperado: digitar na anotação não redesenha nenhum contato; remover um contato não redesenha os que ficaram.`,
      dica: c`Com dependências <code>[]</code>, use a forma de função: <code>setContatos((lista) =&gt; lista.filter((c) =&gt; c.id !== id))</code>.`,
      lang: "react",
      inicial: c`import { memo, useCallback, useState } from "react";

const CONTATOS = [
  { id: 1, nome: "Beatriz (fornecedor)" },
  { id: 2, nome: "Caio (contador)" },
  { id: 3, nome: "Denise (RH)" },
  { id: 4, nome: "Elias (TI)" },
];

window.desenhos = 0;
function contarDesenho() { window.desenhos++; }

// crie o componente Contato com memo

export default function App() {
  return <div></div>;
}
`,
      solucao: c`import { memo, useCallback, useState } from "react";

const CONTATOS = [
  { id: 1, nome: "Beatriz (fornecedor)" },
  { id: 2, nome: "Caio (contador)" },
  { id: 3, nome: "Denise (RH)" },
  { id: 4, nome: "Elias (TI)" },
];

window.desenhos = 0;
function contarDesenho() { window.desenhos++; }

const Contato = memo(function Contato({ contato, onRemover }) {
  contarDesenho();
  return (
    <li>
      {contato.nome} <button onClick={() => onRemover(contato.id)}>x</button>
    </li>
  );
});

export default function App() {
  const [contatos, setContatos] = useState(CONTATOS);
  const [anotacao, setAnotacao] = useState("");

  const remover = useCallback((id) => {
    setContatos((lista) => lista.filter((c) => c.id !== id));
  }, []);

  return (
    <div>
      <input placeholder="Anotação" value={anotacao} onChange={(e) => setAnotacao(e.target.value)} />
      <ul>
        {contatos.map((c) => <Contato key={c.id} contato={c} onRemover={remover} />)}
      </ul>
    </div>
  );
}`,
      teste: c`
__assert(document.querySelectorAll("li").length === 4, "Deveriam aparecer os 4 contatos.");
__assert(window.desenhos === 4, "No início, cada contato deveria ser desenhado 1 vez (desenhos = 4), mas desenhos = " + window.desenhos + ". Chame contarDesenho() dentro de Contato.");
var inp = document.querySelector("input");
__assert(inp, "Falta o input de anotação.");
__digitar(inp, "L"); await __esperar(); __digitar(inp, "Ligar"); await __esperar(); __digitar(inp, "Ligar amanhã"); await __esperar();
__assert(window.desenhos === 4, "Digitar a anotação não deveria redesenhar os contatos, mas desenhos = " + window.desenhos + ". Use memo e useCallback.");
document.querySelectorAll("li button")[1].click(); await __esperar(80);
var nomes = [].map.call(document.querySelectorAll("li"), function (l) { return l.textContent.replace(/x\s*$/, "").trim(); });
__assert(nomes.length === 3 && nomes.indexOf("Caio (contador)") < 0, "Clicando no x do Caio, ele deveria sair da lista. Lista: " + nomes.join(", "));
__assert(window.desenhos === 4, "Remover um contato não deveria redesenhar os que ficaram (desenhos foi para " + window.desenhos + "). A função remover não pode mudar: use useCallback com [] e a forma de função do setter.");
document.querySelectorAll("li button")[0].click(); await __esperar(80);
__assert(document.querySelectorAll("li").length === 2, "Remover de novo deveria deixar 2 contatos.");`,
      padroes: [
        [/memo\s*\(/, "Envolva o componente Contato com memo(...)."],
        [/useCallback\s*\(/, "Crie a função de remover com useCallback."]
      ]
    }
  ],

  /* ======================= a3: Hooks customizados e testes ======================= */
  a3: [
    {
      tipo: "completar",
      titulo: "Hook useContador para o estoque",
      enunciado: c`Na padaria, dois contadores (pães e bolos) usam a mesma lógica. Ela foi extraída para o hook customizado <code>useContador</code>, que devolve <code>{ valor, incrementar, zerar }</code>.
        Cada componente que usa o hook tem o <b>seu próprio</b> estado. Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Hooks customizados começam com <code>use</code> e usam outros hooks por dentro, como <code>useState</code>.`,
      lang: "react",
      inicial: c`import { useState } from "react";

function ____(inicial = 0) {
  const [valor, setValor] = ____(inicial);
  const incrementar = () => setValor((v) => v + 1);
  const zerar = () => setValor(inicial);
  return { valor, incrementar, ____ };
}

function Contador({ produto, inicial }) {
  const { valor, incrementar, zerar } = useContador(inicial);
  return (
    <div className="contador">
      <p>{produto}: {valor}</p>
      <button onClick={incrementar}>+ {produto}</button>
      <button onClick={zerar}>Zerar {produto}</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Contador produto="Pães" inicial={10} />
      <Contador produto="Bolos" inicial={0} />
    </div>
  );
}
`,
      solucao: c`import { useState } from "react";

function useContador(inicial = 0) {
  const [valor, setValor] = useState(inicial);
  const incrementar = () => setValor((v) => v + 1);
  const zerar = () => setValor(inicial);
  return { valor, incrementar, zerar };
}

function Contador({ produto, inicial }) {
  const { valor, incrementar, zerar } = useContador(inicial);
  return (
    <div className="contador">
      <p>{produto}: {valor}</p>
      <button onClick={incrementar}>+ {produto}</button>
      <button onClick={zerar}>Zerar {produto}</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Contador produto="Pães" inicial={10} />
      <Contador produto="Bolos" inicial={0} />
    </div>
  );
}`,
      teste: c`
__assert(/Pães: 10/.test(__texto()) && /Bolos: 0/.test(__texto()), "Os contadores deveriam começar em Pães: 10 e Bolos: 0.");
__botao("+ Pães").click(); await __esperar(); __botao("+ Pães").click(); await __esperar();
__botao("+ Bolos").click(); await __esperar();
__assert(/Pães: 12/.test(__texto()), "Depois de 2 cliques, deveria mostrar Pães: 12.");
__assert(/Bolos: 1/.test(__texto()), "Cada contador tem seu próprio estado: Bolos deveria estar em 1.");
__botao("Zerar Pães").click(); await __esperar();
__assert(/Pães: 10/.test(__texto()) && /Bolos: 1/.test(__texto()), "Zerar Pães volta ao valor inicial (10) sem mexer nos Bolos.");`
    },
    {
      tipo: "completar",
      titulo: "Hook useAlternar para detalhes",
      enunciado: c`Vários cards de vaga de emprego têm um botão para mostrar e esconder os detalhes. Complete o hook <code>useAlternar</code>, que devolve um array <code>[ligado, alternar]</code> (como o <code>useState</code>), e use-o no card.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`Para inverter: <code>setLigado((v) =&gt; !v)</code>. A desestruturação de array pega os itens pela posição.`,
      lang: "react",
      inicial: c`import { useState } from "react";

function useAlternar(inicial = false) {
  const [ligado, setLigado] = useState(inicial);
  const alternar = () => setLigado((v) => ____);
  return [ligado, ____];
}

function Vaga({ titulo, detalhes }) {
  const [aberto, ____] = useAlternar();
  return (
    <div className="vaga">
      <h3>{titulo}</h3>
      <button onClick={alternarDetalhes}>{aberto ? "Esconder" : "Ver detalhes"}</button>
      {aberto && <p className="detalhes">{detalhes}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Vaga titulo="Dev Front-end Júnior" detalhes="React, CSS e Git. Remoto." />
      <Vaga titulo="Analista de Dados" detalhes="SQL e Python. Híbrido em Curitiba." />
    </div>
  );
}
`,
      solucao: c`import { useState } from "react";

function useAlternar(inicial = false) {
  const [ligado, setLigado] = useState(inicial);
  const alternar = () => setLigado((v) => !v);
  return [ligado, alternar];
}

function Vaga({ titulo, detalhes }) {
  const [aberto, alternarDetalhes] = useAlternar();
  return (
    <div className="vaga">
      <h3>{titulo}</h3>
      <button onClick={alternarDetalhes}>{aberto ? "Esconder" : "Ver detalhes"}</button>
      {aberto && <p className="detalhes">{detalhes}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Vaga titulo="Dev Front-end Júnior" detalhes="React, CSS e Git. Remoto." />
      <Vaga titulo="Analista de Dados" detalhes="SQL e Python. Híbrido em Curitiba." />
    </div>
  );
}`,
      teste: c`
__assert(document.querySelectorAll(".detalhes").length === 0, "Os detalhes deveriam começar escondidos.");
var vagas = document.querySelectorAll(".vaga");
vagas[1].querySelector("button").click(); await __esperar();
var d = document.querySelectorAll(".detalhes");
__assert(d.length === 1 && /SQL e Python/.test(d[0].textContent), "Clicando na 2ª vaga, só os detalhes dela deveriam aparecer.");
__assert(document.querySelectorAll(".vaga")[1].querySelector("button").textContent === "Esconder", 'Com os detalhes abertos, o botão deveria dizer "Esconder".');
document.querySelectorAll(".vaga")[0].querySelector("button").click(); await __esperar();
__assert(document.querySelectorAll(".detalhes").length === 2, "Abrindo a 1ª vaga também, os dois detalhes deveriam aparecer.");
document.querySelectorAll(".vaga")[1].querySelector("button").click(); await __esperar();
d = document.querySelectorAll(".detalhes");
__assert(d.length === 1 && /React, CSS/.test(d[0].textContent), "Clicando de novo na 2ª vaga, ela deveria fechar e a 1ª continuar aberta.");`
    },
    {
      tipo: "completar",
      titulo: "Hook useBuscar com dados simulados",
      enunciado: c`O hook <code>useBuscar(buscar, id)</code> chama uma função que devolve Promise e entrega <code>{ dados, carregando, erro }</code>, como o <code>useFetch</code> da aula (aqui a “API” de funcionários é simulada).
        <ul>
          <li>no sucesso, guarde os dados e termine o carregamento;</li>
          <li>no erro, guarde o erro e termine o carregamento;</li>
          <li>refaça a busca sempre que o <code>id</code> mudar.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: c`O objeto de estado tem sempre as três chaves. Sucesso: <code>{ dados, carregando: false, erro: null }</code>. Dependências: <code>[id]</code>.`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

const FUNCIONARIOS = { 1: "Ana Souza - Analista", 2: "Bruno Lima - Designer", 3: "Carla Dias - Gerente" };

function buscarFuncionario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (FUNCIONARIOS[id]) resolve(FUNCIONARIOS[id]);
      else reject(new Error("Funcionário " + id + " não encontrado"));
    }, 300);
  });
}

function useBuscar(buscar, id) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });

  useEffect(() => {
    let ativo = true;
    setEstado((s) => ({ ...s, carregando: true }));
    buscar(id)
      .then((dados) => ativo && setEstado({ dados, carregando: ____, erro: null }))
      .catch((erro) => ativo && setEstado({ dados: null, carregando: false, erro: ____ }));
    return () => { ativo = false; };
  }, [____]);

  return estado;
}

export default function App() {
  const [id, setId] = useState(1);
  const { dados, carregando, erro } = useBuscar(buscarFuncionario, id);
  return (
    <div>
      <button onClick={() => setId((n) => Math.max(1, n - 1))}>Anterior</button>
      <span> Funcionário {id} </span>
      <button onClick={() => setId((n) => n + 1)}>Próximo</button>
      {carregando && <p>Carregando…</p>}
      {!carregando && erro && <p className="erro">Erro: {erro.message}</p>}
      {!carregando && dados && <p className="dados">{dados}</p>}
    </div>
  );
}
`,
      solucao: c`import { useEffect, useState } from "react";

const FUNCIONARIOS = { 1: "Ana Souza - Analista", 2: "Bruno Lima - Designer", 3: "Carla Dias - Gerente" };

function buscarFuncionario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (FUNCIONARIOS[id]) resolve(FUNCIONARIOS[id]);
      else reject(new Error("Funcionário " + id + " não encontrado"));
    }, 300);
  });
}

function useBuscar(buscar, id) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });

  useEffect(() => {
    let ativo = true;
    setEstado((s) => ({ ...s, carregando: true }));
    buscar(id)
      .then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))
      .catch((erro) => ativo && setEstado({ dados: null, carregando: false, erro: erro }));
    return () => { ativo = false; };
  }, [id]);

  return estado;
}

export default function App() {
  const [id, setId] = useState(1);
  const { dados, carregando, erro } = useBuscar(buscarFuncionario, id);
  return (
    <div>
      <button onClick={() => setId((n) => Math.max(1, n - 1))}>Anterior</button>
      <span> Funcionário {id} </span>
      <button onClick={() => setId((n) => n + 1)}>Próximo</button>
      {carregando && <p>Carregando…</p>}
      {!carregando && erro && <p className="erro">Erro: {erro.message}</p>}
      {!carregando && dados && <p className="dados">{dados}</p>}
    </div>
  );
}`,
      teste: c`
async function ate(cond, ms) { for (var i = 0; i < ms / 50; i++) { if (cond()) return true; await __esperar(50); } return cond(); }
function dados() { var d = document.querySelector(".dados"); return d ? d.textContent.trim() : ""; }
await ate(function () { return dados() !== ""; }, 2000);
__assert(dados() === "Ana Souza - Analista", 'O funcionário 1 deveria aparecer: "Ana Souza - Analista". Aparece: "' + dados() + '".');
__botao("Próximo").click(); await __esperar(60);
__assert(/Carregando/.test(__texto()), "Ao trocar de funcionário, deveria mostrar Carregando… enquanto busca.");
await ate(function () { return dados() === "Bruno Lima - Designer"; }, 2000);
__assert(dados() === "Bruno Lima - Designer", "Clicando em Próximo deveria buscar o funcionário 2 (Bruno). Confira as dependências do efeito.");
__botao("Próximo").click(); await __esperar(); __botao("Próximo").click(); await __esperar();
await ate(function () { return !!document.querySelector(".erro"); }, 2000);
var e = document.querySelector(".erro");
__assert(e && /Funcionário 4 não encontrado/.test(e.textContent), 'O funcionário 4 não existe: deveria mostrar "Erro: Funcionário 4 não encontrado".');
__assert(!/Carregando/.test(__texto()), "Depois do erro, o carregamento deveria terminar.");`
    },
    {
      tipo: "criar",
      titulo: "Hook useFormulario no agendamento",
      enunciado: c`O salão de beleza tem vários formulários parecidos. Crie o hook <code>useFormulario(valoresIniciais)</code> que devolve <code>{ valores, alterar, limpar }</code>:
        <ul>
          <li><code>valores</code>: objeto com os campos (estado);</li>
          <li><code>alterar(e)</code>: usa <code>e.target.name</code> e <code>e.target.value</code> para atualizar só aquele campo (crie um objeto novo);</li>
          <li><code>limpar()</code>: volta aos valores iniciais.</li>
        </ul>
        No <code>App</code>, use o hook com <code>{ cliente: "", servico: "Corte" }</code>: dois <code>&lt;input&gt;</code> com <code>name="cliente"</code> e <code>name="servico"</code>, um parágrafo <code>&lt;p className="resumo"&gt;</code> com <b>“Agendamento: CLIENTE - SERVIÇO”</b> e um botão <b>Limpar</b>.`,
      dica: c`<code>setValores((v) =&gt; ({ ...v, [e.target.name]: e.target.value }))</code>: os colchetes usam o valor de <code>name</code> como nome da chave.`,
      lang: "react",
      inicial: c`import { useState } from "react";

// crie o hook useFormulario(valoresIniciais)

export default function App() {
  return <form></form>;
}
`,
      solucao: c`import { useState } from "react";

function useFormulario(valoresIniciais) {
  const [valores, setValores] = useState(valoresIniciais);
  const alterar = (e) => {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
  };
  const limpar = () => setValores(valoresIniciais);
  return { valores, alterar, limpar };
}

export default function App() {
  const { valores, alterar, limpar } = useFormulario({ cliente: "", servico: "Corte" });
  return (
    <form>
      <input name="cliente" placeholder="Cliente" value={valores.cliente} onChange={alterar} />
      <input name="servico" placeholder="Serviço" value={valores.servico} onChange={alterar} />
      <p className="resumo">Agendamento: {valores.cliente} - {valores.servico}</p>
      <button type="button" onClick={limpar}>Limpar</button>
    </form>
  );
}`,
      teste: c`
function campo(n) { return document.querySelector('input[name="' + n + '"]'); }
function resumo() { var p = document.querySelector(".resumo"); return p ? p.textContent.trim() : ""; }
__assert(campo("cliente") && campo("servico"), 'Crie os inputs com name="cliente" e name="servico".');
__assert(campo("servico").value === "Corte", 'O serviço deveria começar com "Corte".');
__digitar(campo("cliente"), "Juliana"); await __esperar();
__assert(resumo() === "Agendamento: Juliana - Corte", 'Depois de digitar o cliente, o resumo deveria ser "Agendamento: Juliana - Corte". É: "' + resumo() + '".');
__digitar(campo("servico"), "Escova"); await __esperar();
__assert(resumo() === "Agendamento: Juliana - Escova", "Alterar o serviço não pode apagar o cliente (crie um objeto novo com ...v). Resumo: " + resumo());
__assert(campo("cliente").value === "Juliana", "O campo cliente deveria continuar com Juliana.");
__botao("Limpar").click(); await __esperar();
__assert(campo("cliente").value === "" && campo("servico").value === "Corte", "Limpar deveria voltar aos valores iniciais (cliente vazio, serviço Corte).");`,
      padroes: [
        [/function\s+useFormulario\s*\(|const\s+useFormulario\s*=/, "Crie o hook useFormulario."],
        [/useFormulario\s*\(\s*\{/, "Use o hook no App: useFormulario({ cliente: \"\", servico: \"Corte\" })."],
        [/e\.target\.name|\bname\b\s*[,}]/, "Use e.target.name para saber qual campo mudou."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Hook useDebounce na busca de produtos",
      enunciado: c`A busca do catálogo não deve filtrar a cada tecla, só quando o usuário <b>para de digitar</b>. Crie o hook <code>useDebounce(valor, atraso)</code>:
        <ul>
          <li>guarda um estado com o valor “atrasado”;</li>
          <li>com <code>useEffect</code>, agenda um <code>setTimeout</code> de <code>atraso</code> ms para atualizar esse estado, e na limpeza cancela com <code>clearTimeout</code>;</li>
          <li>devolve o valor atrasado.</li>
        </ul>
        No <code>App</code>: um <code>&lt;input&gt;</code> controlado (estado <code>busca</code>), <code>const termo = useDebounce(busca, 400)</code>, um parágrafo <b>“Buscando por: TERMO”</b> e uma <code>&lt;ul&gt;</code> com os <code>PRODUTOS</code> cujo nome contém <code>termo</code> (sem diferenciar maiúsculas).`,
      dica: c`<code>useEffect(() =&gt; { const t = setTimeout(() =&gt; setAtrasado(valor), atraso); return () =&gt; clearTimeout(t); }, [valor, atraso]);</code>`,
      lang: "react",
      inicial: c`import { useEffect, useState } from "react";

const PRODUTOS = ["Caneca", "Camiseta", "Calça jeans", "Mouse", "Mochila", "Teclado"];

// crie o hook useDebounce(valor, atraso)

export default function App() {
  return <div></div>;
}
`,
      solucao: c`import { useEffect, useState } from "react";

const PRODUTOS = ["Caneca", "Camiseta", "Calça jeans", "Mouse", "Mochila", "Teclado"];

function useDebounce(valor, atraso) {
  const [atrasado, setAtrasado] = useState(valor);
  useEffect(() => {
    const t = setTimeout(() => setAtrasado(valor), atraso);
    return () => clearTimeout(t);
  }, [valor, atraso]);
  return atrasado;
}

export default function App() {
  const [busca, setBusca] = useState("");
  const termo = useDebounce(busca, 400);
  const filtrados = PRODUTOS.filter((p) => p.toLowerCase().includes(termo.toLowerCase()));
  return (
    <div>
      <input placeholder="Buscar produto" value={busca} onChange={(e) => setBusca(e.target.value)} />
      <p>Buscando por: {termo}</p>
      <ul>{filtrados.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
  );
}`,
      teste: c`
function n() { return document.querySelectorAll("li").length; }
var inp = document.querySelector("input");
__assert(inp, "Crie o input de busca.");
__assert(n() === 6, "Sem busca, os 6 produtos deveriam aparecer.");
__digitar(inp, "c"); await __esperar(100);
__digitar(inp, "ca"); await __esperar(100);
__digitar(inp, "cam"); await __esperar(150);
__assert(n() === 6, "Enquanto o usuário digita (menos de 400 ms entre as teclas), a lista ainda não deveria filtrar.");
await __esperar(500);
__assert(/Buscando por: cam/.test(__texto()), 'Depois de parar de digitar, deveria mostrar "Buscando por: cam".');
__assert(n() === 1 && /Camiseta/.test(document.querySelector("ul").textContent), 'Buscando "cam", deveria sobrar só Camiseta.');
__digitar(inp, "MO"); await __esperar(600);
__assert(n() === 2, 'Buscando "MO" (maiúsculo), deveriam aparecer Mouse e Mochila.');`,
      padroes: [
        [/function\s+useDebounce\s*\(|const\s+useDebounce\s*=/, "Crie o hook useDebounce."],
        [/setTimeout\s*\(/, "Use setTimeout dentro do efeito."],
        [/clearTimeout\s*\(/, "Cancele o timer anterior com clearTimeout na limpeza."]
      ]
    }
  ]
};
