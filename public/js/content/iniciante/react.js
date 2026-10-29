// Nível Iniciante da trilha react: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é React, criar seus primeiros componentes, escrever JSX sem medo e mostrar uma lista de itens na tela.",
  topicos: [
    /* ======================= p1 ======================= */
    {
      titulo: "O que é React e por que tanta empresa usa",
      crianca: `Pense numa caixa de <b>peças de LEGO</b>. Você monta uma peça “porta”, uma peça “janela”, e depois usa a mesma peça várias vezes para montar a casa inteira. O <b>React</b> faz isso com sites: você cria pedaços da tela (um botão, um card de produto, um cabeçalho) e encaixa esses pedaços para montar a página.`,
      passos: [
        {
          titulo: "React é uma ferramenta para montar telas",
          html: `<p>O <b>React</b> é uma <b>biblioteca JavaScript</b>. Biblioteca é um pacote de código pronto que alguém já escreveu para você usar. O React foi criado pelo Facebook e serve para montar a <b>parte que o usuário vê</b>: botões, menus, listas, formulários.</p>
<p>Ele não substitui o HTML nem o JavaScript: ele <b>usa os dois juntos</b>. Por isso é bom já ter visto um pouquinho de cada um (e você já viu!).</p>`,
          pratica: [
            m("Para que serve o React?", ["Para montar as telas (a parte que o usuário vê) de sites e apps", "Para guardar dados em um banco de dados", "Para deixar o computador mais rápido", "Para substituir a internet"], 0, "O React cuida da interface: tudo o que aparece na tela e com que o usuário interage."),
            vf("Para usar React é preciso esquecer HTML e JavaScript.", false, "Pelo contrário! O React usa JavaScript e uma escrita muito parecida com HTML. O que você já sabe continua valendo.")
          ]
        },
        {
          titulo: "As peças de LEGO se chamam componentes",
          html: `<p>Cada pedaço da tela feito com React se chama <b>componente</b>. Numa loja on-line, por exemplo, poderíamos ter os componentes <code>Cabecalho</code>, <code>CardProduto</code> e <code>Rodape</code>.</p>
<p>A página inteira é só um monte de componentes encaixados, um dentro do outro, como peças de LEGO.</p>`,
          pratica: [
            vf("Um componente é um pedaço da tela que tem nome e pode ser reutilizado.", true, "Isso mesmo: o componente é uma peça com nome, como `Botao` ou `CardProduto`, que você pode usar quantas vezes quiser."),
            m("Numa loja on-line, qual destes é um bom exemplo de componente para reaproveitar?", ["O card de produto (foto, nome e preço)", "A senha do banco de dados", "O cabo de rede do servidor", "O nome do arquivo do projeto"], 0, "O card de produto se repete muitas vezes na página, só mudando a foto, o nome e o preço. É a peça perfeita para reaproveitar.")
          ]
        },
        {
          titulo: "Escreva uma vez, use muitas vezes",
          html: `<p>Veja o código abaixo. O componente <code>Botao</code> foi escrito <b>uma vez só</b>, mas aparece <b>duas vezes</b> na tela. Para usar um componente, escrevemos o nome dele como se fosse uma tag: <code>&lt;Botao /&gt;</code>.</p>
<p>Não se preocupe em entender cada detalhe ainda: no próximo tópico vamos montar um componente passo a passo.</p>`,
          codigo: c`function Botao() {
  return <button>Comprar</button>;
}

export default function App() {
  return (
    <div>
      <p>Pão francês</p>
      <Botao />
      <p>Bolo de cenoura</p>
      <Botao />
    </div>
  );
}`,
          pratica: [
            m("No código acima, quantos botões “Comprar” aparecem na tela?", ["2", "1", "0", "3"], 0, "O `Botao` foi escrito uma vez, mas `<Botao />` foi usado duas vezes, então aparecem 2 botões.")
          ]
        },
        {
          titulo: "Por que tanta empresa usa React",
          html: `<p>Imagine que o botão aparece em 50 telas e o chefe pede para mudar a cor dele. Sem componentes, você teria que mudar 50 lugares. Com React, você muda <b>só o componente</b> e todas as telas ficam iguais na hora.</p>
<p>Por isso empresas como Facebook, Instagram, Netflix e Airbnb usam React. E como muita empresa usa, há <b>muitas vagas</b> pedindo React.</p>`,
          pratica: [
            vf("Se o time muda o componente `Botao`, o botão muda em todas as telas que usam esse componente.", true, "Essa é a grande vantagem: arrumou em um lugar, arrumou em todos."),
            m("Qual é a principal vantagem de dividir a tela em componentes?", ["Reaproveitar peças e consertar tudo em um lugar só", "Deixar o código mais comprido", "Não precisar de navegador", "Evitar usar JavaScript"], 0, "Componentes deixam o código organizado e reaproveitável: menos repetição e menos trabalho para mudar.")
          ]
        }
      ],
      codigo: c`function Botao() {
  return <button>Comprar</button>;
}

export default function App() {
  return (
    <div>
      <h1>Padaria Pão Quente</h1>
      <p>Pão francês</p>
      <Botao />
      <p>Bolo de cenoura</p>
      <Botao />
    </div>
  );
}`,
      partes: [
        ["function Botao() {", "Cria a peça (componente) chamada Botao."],
        ["return <button>Comprar</button>;", "Diz o que essa peça mostra na tela: um botão escrito Comprar."],
        ["export default function App() {", "É o componente principal: a página inteira que aparece na tela."],
        ["<Botao />", "Encaixa a peça Botao na página. Aparece duas vezes, então são dois botões."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b> e coloque mais um <code>&lt;Botao /&gt;</code> embaixo de outro produto.",
      trabalho: `Nas empresas existe o <b>design system</b>: uma coleção de componentes prontos (botão, campo de texto, janela de aviso) que todo o time usa. Assim o app inteiro fica com a mesma cara e ninguém precisa refazer o mesmo botão.`,
      entrevista: {
        pergunta: "O React é uma linguagem de programação?",
        resposta: `Não. O React é uma <b>biblioteca</b> de JavaScript: um pacote de código pronto para montar interfaces. A linguagem continua sendo o JavaScript.`
      },
      busca: ["o que é react js", "react para iniciantes", "componentes react explicação"]
    },

    /* ======================= p2 ======================= */
    {
      titulo: "Seu primeiro componente",
      crianca: `Um componente é como uma <b>máquina de carimbo</b>: toda vez que você usa, ela carimba o mesmo desenho na tela. No React, essa máquina é uma <b>função</b> do JavaScript que devolve um pedaço de HTML.`,
      passos: [
        {
          titulo: "Componente é uma função",
          html: `<p>Lembra das <b>funções</b> do JavaScript? São blocos de código com um nome. No React, um componente é exatamente isso: uma função. A diferença é que ela <b>devolve um pedaço de tela</b>.</p>`,
          codigo: c`function App() {
  return <h1>Olá</h1>;
}`,
          pratica: [
            m("No código acima, o que o componente `App` mostra na tela?", ["Um título escrito Olá", "Nada", "Um botão", "Uma lista de compras"], 0, "Ele devolve `<h1>Olá</h1>`, que é um título com o texto Olá.")
          ]
        },
        {
          titulo: "O return diz o que aparece",
          html: `<p>A palavra <code>return</code> quer dizer “devolva”. Tudo o que vem depois do <code>return</code> é o que o componente vai mostrar na tela.</p>
<p>Se o que você quer mostrar ocupa várias linhas, coloque entre parênteses: <code>return ( ... );</code></p>`,
          codigo: c`function Aviso() {
  return (
    <p>Hoje tem pão quentinho!</p>
  );
}`,
          pratica: [
            l("Complete para o componente devolver o título:", c`function App() {
  ____ <h1>Bem-vindo</h1>;
}`, ["return"], "É o `return` que entrega o pedaço de tela que o componente vai mostrar."),
            vf("Os parênteses depois do `return` ajudam a escrever o que vai aparecer em várias linhas.", true, "Com `return ( ... )` você pode quebrar o conteúdo em várias linhas sem problema.")
          ]
        },
        {
          titulo: "Nome com letra maiúscula",
          html: `<p>O nome de um componente <b>sempre começa com letra maiúscula</b>: <code>App</code>, <code>Saudacao</code>, <code>CardProduto</code>.</p>
<p>Por quê? Porque, se começar com minúscula, o React pensa que é uma tag comum do HTML (como <code>p</code> ou <code>div</code>) e não acha o seu componente.</p>`,
          pratica: [
            m("Qual destes é um nome correto de componente?", ["Saudacao", "saudacao", "123saudacao", "saudacao!"], 0, "Componentes começam com letra maiúscula, como `Saudacao`."),
            vf("Posso chamar meu componente de `rodape`, tudo minúsculo, sem problema.", false, "Com letra minúscula o React acha que é uma tag HTML. O certo é `Rodape`.")
          ]
        },
        {
          titulo: "export default: o componente principal",
          html: `<p>Antes do <code>function</code> do componente principal colocamos <code>export default</code>. Isso quer dizer: “este é o componente principal deste arquivo, pode usar lá fora”.</p>
<p>No nosso sandbox (e nos projetos criados com o Vite), o principal se chama <code>App</code> e é ele que aparece na tela.</p>`,
          codigo: c`export default function App() {
  return <h1>Olá</h1>;
}`,
          pratica: [
            l("Complete a primeira palavra que marca o componente principal:", c`____ default function App() {
  return <h1>Olá</h1>;
}`, ["export"], "O componente principal começa com `export default function App()`.")
          ]
        },
        {
          titulo: "Um componente dentro do outro",
          html: `<p>Depois de criar um componente, você usa ele dentro de outro escrevendo o nome como tag: <code>&lt;Saudacao /&gt;</code>. A barra antes do <code>&gt;</code> fecha a tag, porque ela não tem nada dentro.</p>`,
          codigo: c`function Saudacao() {
  return <p>Seja bem-vindo!</p>;
}

export default function App() {
  return (
    <div>
      <h1>Minha Loja</h1>
      <Saudacao />
    </div>
  );
}`,
          pratica: [
            l("Complete para mostrar o componente `Rodape` dentro do App:", c`<div>
  <h1>Minha Loja</h1>
  <____ />
</div>`, ["Rodape"], "Usamos um componente escrevendo o nome dele como tag: `<Rodape />`."),
            m("Como se usa o componente `Saudacao` dentro de outro?", ["`<Saudacao />`", "`Saudacao()` solto no meio do texto", "`<saudacao>`", "`#Saudacao`"], 0, "No JSX o componente vira uma tag com o mesmo nome: `<Saudacao />`.")
          ]
        }
      ],
      codigo: c`function Saudacao() {
  return <p>Seja bem-vindo!</p>;
}

export default function App() {
  return (
    <div>
      <h1>Olá</h1>
      <Saudacao />
    </div>
  );
}`,
      partes: [
        ["function Saudacao() {", "Cria um componente. O nome começa com maiúscula."],
        ["return <p>Seja bem-vindo!</p>;", "Devolve o que vai aparecer: um parágrafo."],
        ["export default function App() {", "Componente principal do arquivo, o que aparece na tela."],
        ["return ( ... );", "Os parênteses deixam escrever o conteúdo em várias linhas."],
        ["<Saudacao />", "Usa o componente Saudacao dentro do App."]
      ],
      nota: "No sandbox, troque o texto do <code>&lt;h1&gt;</code> pelo nome da sua loja e clique em executar.",
      trabalho: `Num projeto real, cada componente costuma ficar no seu próprio arquivo: <code>Cabecalho.jsx</code>, <code>Rodape.jsx</code>. O <code>App</code> junta todos eles para formar a página.`,
      entrevista: {
        pergunta: "O que é um componente funcional?",
        resposta: `É um componente escrito como uma <b>função</b> JavaScript que devolve o que deve aparecer na tela (JSX). Hoje é o jeito padrão de escrever componentes em React.`
      },
      busca: ["primeiro componente react", "react function component", "export default react"]
    },

    /* ======================= p3 ======================= */
    {
      titulo: "JSX: HTML dentro do JavaScript",
      crianca: `JSX é como escrever uma <b>carta com espaços para preencher</b>: “Olá, ____!”. O texto fixo parece HTML, e nos espaços você coloca valores do JavaScript, como o nome da pessoa. O React junta tudo e mostra a carta pronta.`,
      passos: [
        {
          titulo: "Parece HTML, mas está no JavaScript",
          html: `<p>Aquilo que vem depois do <code>return</code> se chama <b>JSX</b>. Ele parece HTML (tem <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;div&gt;</code>), mas fica dentro do JavaScript.</p>
<p>Antes de rodar, uma ferramenta transforma o JSX em JavaScript normal. Você não precisa se preocupar com isso: é só escrever.</p>`,
          pratica: [
            vf("JSX é uma forma de escrever algo parecido com HTML dentro do JavaScript.", true, "É isso! O JSX deixa a gente desenhar a tela com tags, dentro do código JavaScript."),
            m("Onde o JSX costuma aparecer em um componente?", ["Depois do `return`", "Dentro do nome do arquivo", "Só nos comentários", "Antes da palavra `function`"], 0, "O JSX é o que o componente devolve, então fica depois do `return`.")
          ]
        },
        {
          titulo: "className em vez de class",
          html: `<p>No HTML, para dar uma classe CSS a um elemento você escreve <code>class</code>. No JSX é diferente: escreva <code>className</code>. Isso acontece porque <code>class</code> já é uma palavra reservada do JavaScript.</p>`,
          codigo: c`<p className="preco">R$ 5,00</p>`,
          pratica: [
            l("Complete para o título ter a classe CSS titulo:", c`<h1 ____="titulo">Padaria</h1>`, ["className"], "No JSX, a classe CSS vai no atributo `className`."),
            vf("No JSX, `<div class=\"caixa\">` é o jeito recomendado de colocar uma classe.", false, "No JSX o certo é `<div className=\"caixa\">`.")
          ]
        },
        {
          titulo: "Chaves { } para mostrar valores",
          html: `<p>Quer mostrar o valor de uma variável na tela? Coloque o nome dela entre <b>chaves</b> <code>{ }</code>. Dentro das chaves vale qualquer coisa do JavaScript: variáveis, contas, textos.</p>`,
          codigo: c`export default function App() {
  const nome = "Ana";
  return <p>Olá, {nome}! Você tem {2 + 3} pontos.</p>;
}`,
          pratica: [
            m("O que aparece na tela com o código acima?", ["Olá, Ana! Você tem 5 pontos.", "Olá, {nome}! Você tem {2 + 3} pontos.", "Olá, nome! Você tem 2 + 3 pontos.", "Nada aparece"], 0, "As chaves trocam `{nome}` por Ana e calculam `{2 + 3}`, que dá 5."),
            l("Complete para mostrar o valor da variável cidade:", c`const cidade = "Recife";
return <p>Moro em ____</p>;`, ["{cidade}", "{ cidade }"], "Para mostrar uma variável no JSX, coloque o nome dela entre chaves: `{cidade}`.")
          ]
        },
        {
          titulo: "Um só elemento pai",
          html: `<p>O <code>return</code> precisa devolver <b>um único elemento por fora</b>, que abraça todos os outros. Se você quiser um título e um parágrafo, coloque os dois dentro de uma <code>&lt;div&gt;</code>.</p>
<p>Se não quiser criar uma <code>div</code> a mais, use o <b>fragmento</b> <code>&lt;&gt; ... &lt;/&gt;</code>: uma “caixa invisível” que só serve para agrupar.</p>`,
          codigo: c`return (
  <>
    <h1>Cardápio</h1>
    <p>Pão, bolo e café</p>
  </>
);`,
          pratica: [
            vf("Um componente pode devolver um `<h1>` e um `<p>` soltos, um do lado do outro, sem nada em volta.", false, "Precisa de um elemento pai em volta, como `<div>...</div>` ou o fragmento `<>...</>`."),
            m("Para que serve o `<>` ... `</>`?", ["Agrupar elementos sem criar uma tag a mais na página", "Fazer um comentário", "Criar um botão", "Deixar o texto em negrito"], 0, "O fragmento é uma caixa invisível: agrupa os elementos e não aparece no HTML final.")
          ]
        }
      ],
      codigo: c`export default function App() {
  const produto = "Bolo de cenoura";
  const preco = 12;
  return (
    <div className="card">
      <h2>{produto}</h2>
      <p>Preço: R$ {preco}</p>
      <p>Duas fatias: R$ {preco * 2}</p>
    </div>
  );
}`,
      partes: [
        ['const produto = "Bolo de cenoura";', "Variável comum do JavaScript, criada antes do return."],
        ['<div className="card">', "Elemento pai que abraça tudo. Usa className para a classe CSS."],
        ["<h2>{produto}</h2>", "As chaves mostram o valor da variável: Bolo de cenoura."],
        ["{preco * 2}", "Dentro das chaves dá para fazer conta: aparece 24."]
      ],
      nota: "No sandbox, mude o valor de <code>preco</code> e veja as duas linhas de preço mudarem sozinhas.",
      trabalho: `Em todo app de verdade, os textos da tela vêm de variáveis: o nome do cliente logado, o preço do produto, a quantidade no carrinho. As chaves do JSX são usadas o tempo todo para isso.`,
      entrevista: {
        pergunta: "Por que no JSX usamos className e não class?",
        resposta: `Porque o JSX vira JavaScript, e <code>class</code> é uma palavra reservada do JavaScript (usada para criar classes). Para não confundir, o React usa <code>className</code>.`
      },
      busca: ["jsx react explicação", "react className", "jsx chaves expressões"]
    },

    /* ======================= p4 ======================= */
    {
      titulo: "Mostrando uma lista simples",
      crianca: `Imagine que você tem uma <b>lista de compras</b> e quer escrever cada item num papelzinho. Em vez de escrever um por um, você pede a um ajudante: “<b>para cada item</b> da lista, faça um papelzinho”. No JavaScript esse ajudante se chama <code>map</code>.`,
      passos: [
        {
          titulo: "Uma lista é um array",
          html: `<p>No JavaScript, uma lista de coisas se chama <b>array</b>. Ela fica entre colchetes <code>[ ]</code> e os itens são separados por vírgula.</p>`,
          codigo: c`const compras = ["Pão", "Leite", "Café"];`,
          pratica: [
            m("Quantos itens tem o array `[\"Pão\", \"Leite\", \"Café\"]`?", ["3", "1", "2", "4"], 0, "São três itens separados por vírgula: Pão, Leite e Café.")
          ]
        },
        {
          titulo: "map: faça algo com cada item",
          html: `<p>O <code>map</code> passa por <b>cada item</b> do array e cria um array novo com o que você mandar fazer. A parte <code>(item) =&gt; ...</code> é uma <b>função curtinha</b> (chamada <i>arrow function</i>) e se lê assim: “para cada <code>item</code>, devolva ...”.</p>`,
          codigo: c`const compras = ["Pão", "Leite", "Café"];
const comPonto = compras.map((item) => item + "!");
// comPonto fica ["Pão!", "Leite!", "Café!"]`,
          pratica: [
            m("O que `[\"a\", \"b\"].map((x) => x + \"1\")` devolve?", ["`[\"a1\", \"b1\"]`", "`[\"a\", \"b\"]`", "`\"a1b1\"`", "`[\"1\"]`"], 0, "O `map` faz a mesma coisa com cada item: junta \"1\" no \"a\" e no \"b\"."),
            vf("O `map` passa por todos os itens do array, um de cada vez.", true, "Isso mesmo: ele visita cada item e devolve um array novo com os resultados.")
          ]
        },
        {
          titulo: "Uma linha da lista para cada item",
          html: `<p>No React, usamos o <code>map</code> dentro das chaves do JSX para transformar cada item em um <code>&lt;li&gt;</code>. Assim a lista na tela é montada sozinha, não importa quantos itens existam.</p>`,
          codigo: c`export default function App() {
  const compras = ["Pão", "Leite", "Café"];
  return (
    <ul>
      {compras.map((item) => <li>{item}</li>)}
    </ul>
  );
}`,
          pratica: [
            l("Complete para cada `<li>` mostrar o nome da fruta:", c`{frutas.map((fruta) => <li>{____}</li>)}`, ["fruta"], "Dentro do `map`, `fruta` é o item da vez. Mostramos ele com `{fruta}`."),
            m("Se o array `compras` tiver 5 itens, quantos `<li>` aparecem?", ["5", "1", "3", "Nenhum"], 0, "O `map` cria um `<li>` para cada item, então são 5.")
          ]
        },
        {
          titulo: "key: o crachá de cada item",
          html: `<p>O React pede que cada item da lista tenha uma <code>key</code> (chave): um <b>crachá</b> com um valor que não se repete. Com ele, o React sabe quem é quem quando a lista muda.</p>
<p>Sem a <code>key</code> a lista até aparece, mas o React mostra um aviso no console. Quando os itens são textos diferentes, o próprio texto pode ser a key.</p>`,
          codigo: c`{compras.map((item) => <li key={item}>{item}</li>)}`,
          pratica: [
            l("Complete o atributo que dá um crachá para cada item:", c`<li ____={item}>{item}</li>`, ["key"], "O atributo especial é `key`, e o valor dele não pode se repetir na lista."),
            vf("Dois itens da mesma lista podem ter a mesma `key`.", false, "A `key` precisa ser única na lista, senão o React confunde os itens.")
          ]
        },
        {
          titulo: "Lista de produtos (objetos)",
          html: `<p>Muitas vezes cada item da lista tem mais de uma informação, como nome e preço. Aí cada item é um <b>objeto</b> (entre chaves), e pegamos cada informação com ponto: <code>produto.nome</code>, <code>produto.preco</code>. O <code>id</code> é ótimo para ser a key.</p>`,
          codigo: c`const produtos = [
  { id: 1, nome: "Pão francês", preco: 1 },
  { id: 2, nome: "Bolo", preco: 12 }
];`,
          pratica: [
            m("Dentro do `map`, como mostrar o nome de cada produto?", ["`{produto.nome}`", "`{nome.produto}`", "`{produto[nome]}`", "`produto.nome` sem chaves"], 0, "Pegamos a informação do objeto com ponto e mostramos entre chaves: `{produto.nome}`.")
          ]
        }
      ],
      codigo: c`export default function App() {
  const produtos = [
    { id: 1, nome: "Pão francês", preco: 1 },
    { id: 2, nome: "Bolo de cenoura", preco: 12 },
    { id: 3, nome: "Café", preco: 5 }
  ];
  return (
    <div>
      <h1>Cardápio da Padaria</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      partes: [
        ["const produtos = [ ... ];", "Array de objetos: cada produto tem id, nome e preço."],
        ["produtos.map((produto) => ( ... ))", "Para cada produto da lista, monta um pedaço de tela."],
        ["<li key={produto.id}>", "Cada item ganha um crachá único: o id do produto."],
        ["{produto.nome} - R$ {produto.preco}", "Mostra o nome e o preço daquele produto."]
      ],
      nota: "No sandbox, acrescente um produto novo no array (com id 4) e veja ele aparecer na lista sem mexer no JSX.",
      trabalho: `Lista de pedidos, de clientes, de mensagens, de produtos: quase toda tela de sistema mostra uma lista que vem de um array. O <code>map</code> com <code>key</code> é usado todos os dias por quem trabalha com React.`,
      entrevista: {
        pergunta: "Para que serve a key em listas no React?",
        resposta: `Ela identifica cada item de forma única. Quando a lista muda (um item entra, sai ou muda de lugar), o React usa a <code>key</code> para atualizar só o que mudou, sem confundir os itens.`
      },
      busca: ["react map lista", "react key prop", "renderizar lista react"]
    }
  ],

  fixacao: [
    m("O React é...", ["Uma biblioteca JavaScript para montar interfaces", "Um banco de dados", "Um navegador", "Uma linguagem que substitui o JavaScript"], 0, "React é uma biblioteca (código pronto) de JavaScript para montar as telas."),
    vf("Componentes são como peças de LEGO: dá para reutilizar a mesma peça várias vezes.", true, "Essa é a ideia central do React: peças reaproveitáveis que se encaixam."),
    m("Um componente React é escrito como...", ["Uma função que devolve o que aparece na tela", "Um arquivo de imagem", "Uma tabela do banco de dados", "Um comentário no código"], 0, "O componente é uma função JavaScript que devolve JSX."),
    l("Complete o componente principal:", c`export ____ function App() {
  return <h1>Olá</h1>;
}`, ["default"], "O componente principal é marcado com `export default`."),
    m("Qual nome de componente está correto?", ["CardProduto", "cardproduto", "card-produto", "card produto"], 0, "Nome de componente começa com letra maiúscula e não tem espaço nem hífen: `CardProduto`."),
    l("Complete para usar o componente Cabecalho:", c`return (
  <div>
    <____ />
  </div>
);`, ["Cabecalho"], "Para usar um componente, escreva o nome dele como tag: `<Cabecalho />`."),
    vf("No JSX usamos `className` no lugar de `class`.", true, "Certo: `class` é palavra reservada do JavaScript, então o JSX usa `className`."),
    m("O que aparece na tela com `const qtd = 4;` e `<p>{qtd} pães</p>`?", ["4 pães", "{qtd} pães", "qtd pães", "Dá erro"], 0, "As chaves trocam `{qtd}` pelo valor da variável: 4."),
    m("O que está errado neste return?", ["Faltou um elemento pai em volta do `<h1>` e do `<p>`", "O `<h1>` não pode ter texto", "Faltou o `className`", "Nada, está certo"], 0, "O return precisa de um único elemento por fora, como `<div>` ou `<>...</>`.", c`return (
  <h1>Oi</h1>
  <p>Tudo bem?</p>
);`),
    l("Complete para criar um `<li>` para cada nome:", c`{nomes.____((nome) => <li key={nome}>{nome}</li>)}`, ["map"], "O `map` passa por cada item do array e devolve um `<li>` para cada um."),
    vf("A `key` de cada item da lista deve ser única, como um id.", true, "Com a key única o React sabe diferenciar cada item da lista."),
    m("Com `const p = { nome: \"Café\", preco: 5 }`, o que `{p.preco}` mostra?", ["5", "Café", "preco", "p.preco"], 0, "O ponto pega a informação `preco` do objeto, que vale 5.")
  ],

  checkpoints: {
    b1: [
      vf("O nome de um componente, como `Cabecalho`, deve começar com letra maiúscula.", true, "Com letra minúscula o React entenderia como tag HTML comum."),
      m("No código, para que serve o `<>` que envolve tudo no App?", ["Agrupar o cabeçalho, o main e o footer sem criar uma tag a mais", "Criar um link", "Comentar o código", "Importar o React"], 0, "É o fragmento: um elemento pai invisível que agrupa os outros.")
    ],
    b2: [
      m("O que são props?", ["Informações que o componente pai passa para o filho", "Estilos CSS do componente", "O nome do arquivo", "Erros do console"], 0, "Props são como recadinhos: o pai entrega, o filho lê e mostra."),
      l("Complete para passar o preço como número (não como texto):", c`<CardProduto nome="Carregador" preco=____ />`, ["{59}", "{ 59 }"], "Textos vão entre aspas; números e outros valores vão entre chaves: `preco={59}`.")
    ],
    b3: [
      m("O que `useState(1)` devolve?", ["Um par: o valor atual e a função para mudá-lo", "Só o número 1", "Um botão pronto", "Uma lista vazia"], 0, "Por isso escrevemos `const [qtd, setQtd] = useState(1)`."),
      vf("No código, o botão + usa `setQtd((q) => q + 1)` para aumentar a quantidade em 1.", true, "Ele chama o setter com o valor anterior mais 1, e o React redesenha a tela.")
    ],
    i1: [
      m("O que o `[]` no final do `useEffect` quer dizer?", ["Rodar o efeito só na primeira vez que o componente aparece", "Rodar a cada segundo", "Nunca rodar", "Apagar o estado"], 0, "Com array vazio de dependências, o efeito roda uma vez, na montagem."),
      vf("No código, `return () => controle.abort()` cancela a busca se o componente sair da tela.", true, "A função devolvida pelo useEffect é a limpeza: aqui ela cancela o fetch.")
    ],
    i2: [
      vf("O ideal é usar como `key` um id único e estável de cada item.", true, "O índice pode mudar quando a lista muda; o id não."),
      l("Complete para o campo mostrar o valor guardado no estado:", c`<input value={____} onChange={(e) => setTexto(e.target.value)} />`, ["texto"], "No formulário controlado, o `value` vem do estado (`texto`) e o `onChange` atualiza esse estado.")
    ],
    i3: [
      m("O que o React Router faz?", ["Mostra uma “página” diferente conforme o endereço, sem recarregar o site", "Conecta ao banco de dados", "Cria estilos CSS", "Envia e-mails"], 0, "Ele é o elevador do prédio: leva para a sala certa sem sair dele."),
      m("Na rota `/produtos/:id`, como o componente `Produto` lê o id?", ["Com `useParams()`", "Com `useState()`", "Com `useEffect()`", "Com `document.id`"], 0, "O `useParams()` devolve os pedaços variáveis da rota, como `id`.")
    ],
    a1: [
      vf("O Context evita passar a mesma prop por vários níveis de componentes.", true, "Quem precisa do dado lê direto do Context, sem prop drilling."),
      m("No código, o que `useAuth()` devolve?", ["O que foi colocado no `value` do Provider: usuario, entrar e sair", "Só o nome do componente", "Um array vazio", "A URL da página"], 0, "`useContext(AuthContext)` devolve o `value` do Provider mais próximo.")
    ],
    a2: [
      m("Para que serve o `useMemo`?", ["Lembrar um valor calculado e só recalcular quando as dependências mudam", "Criar um estado novo", "Buscar dados na API", "Trocar de rota"], 0, "Ele evita refazer contas pesadas a cada renderização."),
      vf("No código, a lista `filtradas` é recalculada quando `vendas` ou `filtro` mudam.", true, "São as dependências `[vendas, filtro]` do useMemo.")
    ],
    a3: [
      vf("O nome de um hook customizado deve começar com `use`.", true, "Assim o React (e o time) sabe que ali dentro valem as regras dos hooks."),
      l("Complete o nome do hook seguindo a regra:", c`export function ____Fetch(url) {`, ["use"], "Hooks customizados começam com `use`: `useFetch`.")
    ]
  }
};
