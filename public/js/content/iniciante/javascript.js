// Nível Iniciante da trilha javascript: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "abrir o console do navegador, mostrar mensagens com console.log, fazer contas, juntar textos, guardar valores em variáveis e criar uma página com um botão que responde ao clique.",
  topicos: [
    /* ================= p1 ================= */
    {
      titulo: "O que é JavaScript e o console.log",
      crianca: `Pense numa página da internet como uma <b>loja</b>. O HTML são as paredes e as prateleiras; o CSS é a pintura e a decoração. O <b>JavaScript</b> é o <b>atendente</b>: é ele que responde quando você aperta um botão, soma o carrinho e mostra a mensagem “Pedido feito!”. E o melhor: todo navegador (Chrome, Firefox, Edge, Safari) já sabe falar JavaScript. Você não precisa instalar nada para começar.`,
      passos: [
        {
          titulo: "Onde o JavaScript roda",
          html: `<p>JavaScript é uma <b>linguagem de programação</b>: um jeito de escrever instruções que o computador entende. Ele nasceu para rodar <b>dentro do navegador</b>, deixando as páginas interativas.</p>
<p>Hoje ele também roda fora do navegador (no servidor, com uma ferramenta chamada Node.js), mas isso fica para depois. Por enquanto, o navegador que você já usa é o seu laboratório.</p>`,
          pratica: [
            m("Onde o JavaScript roda na maioria das vezes?", ["Dentro do navegador (Chrome, Firefox...)", "Só em computadores da NASA", "Só dentro do Word", "Na impressora"], 0, "O JavaScript nasceu para rodar no navegador, e todo navegador moderno já vem pronto para ele."),
            vf("Para rodar JavaScript no navegador, é preciso instalar um programa especial antes.", false, "Não precisa instalar nada: o navegador já entende JavaScript.")
          ]
        },
        {
          titulo: "Abrindo o console (F12)",
          html: `<p>O navegador tem uma área escondida para programadores, as <b>Ferramentas do desenvolvedor</b>. Aperte <b>F12</b> (ou <b>Ctrl+Shift+J</b>; no Mac, <b>Cmd+Option+J</b>) e clique na aba <b>Console</b>.</p>
<p>O <b>console</b> é uma janelinha onde você digita JavaScript e vê a resposta na hora. Experimente digitar <code>2 + 3</code> e apertar <b>Enter</b>: aparece <code>5</code>.</p>`,
          codigo: c`2 + 3`,
          pratica: [
            m("Qual tecla abre as ferramentas do desenvolvedor na maioria dos navegadores?", ["F12", "F1", "Esc", "Tab"], 0, "O F12 abre as ferramentas do desenvolvedor. Depois é só clicar na aba Console.")
          ]
        },
        {
          titulo: "console.log mostra uma mensagem",
          html: `<p>Dentro de um programa, usamos <code>console.log(...)</code> para <b>mostrar algo no console</b>. O que você quer mostrar vai dentro dos parênteses.</p>
<p>Um <b>texto</b> vai sempre entre aspas, para o JavaScript saber que é texto e não um comando.</p>`,
          codigo: c`console.log("Olá, mundo!");`,
          pratica: [
            l("Complete para mostrar Bom dia no console:", c`console.____("Bom dia");`, ["log"], "O comando é `console.log`: o `log` vem depois do ponto."),
            m("O que a linha `console.log(\"Padaria aberta\")` faz?", ["Mostra Padaria aberta no console", "Abre uma padaria", "Apaga o console", "Fecha o navegador"], 0, "O `console.log` só mostra no console o que está entre os parênteses.")
          ]
        },
        {
          titulo: "Uma linha de cada vez e comentários",
          html: `<p>O JavaScript lê o código <b>de cima para baixo</b>, uma linha de cada vez. O <code>;</code> (ponto e vírgula) marca o fim de cada instrução, como o ponto final de uma frase.</p>
<p>Tudo o que vem depois de <code>//</code> numa linha é um <b>comentário</b>: um recado para pessoas, que o JavaScript ignora.</p>`,
          codigo: c`// Lista de tarefas da manhã
console.log("1. Abrir a loja");
console.log("2. Ligar o forno");
console.log("3. Atender os clientes");`,
          pratica: [
            m("No código acima, qual mensagem aparece primeiro?", ["1. Abrir a loja", "3. Atender os clientes", "2. Ligar o forno", "Lista de tarefas da manhã"], 0, "As linhas rodam de cima para baixo. A primeira linha é um comentário (ignorado), então a primeira mensagem é `1. Abrir a loja`."),
            vf("O texto depois de `//` aparece no console.", false, "O que vem depois de `//` é comentário: serve só para quem lê o código e não aparece no console.")
          ]
        }
      ],
      codigo: c`// Meu primeiro programa em JavaScript
console.log("Olá, mundo!");
console.log("Estou aprendendo JavaScript");
console.log("Uma linha de cada vez");`,
      partes: [
        ["// Meu primeiro programa em JavaScript", "Comentário: um recado para quem lê. O JavaScript pula essa linha."],
        ["console.log(", "Comando que mostra algo no console. O que estiver nos parênteses aparece lá."],
        ['"Olá, mundo!"', "O texto que vai aparecer. Fica entre aspas porque é texto."],
        [");", "Fecha o parêntese e termina a instrução com ponto e vírgula."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b> e troque as frases. Ou aperte F12 aqui mesmo e digite no Console.",
      trabalho: `Programadores usam <code>console.log</code> o dia inteiro para <b>descobrir o que está acontecendo</b> no código: “o botão foi clicado?”, “qual é o valor do carrinho agora?”. Abrir o F12 e olhar o Console é o primeiro passo para achar um erro numa página.`,
      entrevista: {
        pergunta: "Onde aparece o que eu mostro com console.log?",
        resposta: `No <b>console</b> das ferramentas do desenvolvedor (F12 → Console), e não na página. Quem visita o site normalmente nem vê. Por isso ele é usado para <b>testar e investigar</b> o código, e não para falar com o usuário.`
      },
      busca: ["o que é javascript", "como abrir o console do navegador", "console.log iniciante"]
    },

    /* ================= p2 ================= */
    {
      titulo: "Contas e textos",
      crianca: `O JavaScript é uma <b>calculadora</b> muito rápida e também um <b>escritor de etiquetas</b>. Com números, ele faz contas: quanto custam 10 pães? Com textos, ele junta pedaços: “Pão” + “ de queijo” vira “Pão de queijo”. O mesmo sinal <code>+</code> faz as duas coisas, e o truque é saber quando ele soma e quando ele junta.`,
      passos: [
        {
          titulo: "Números e contas",
          html: `<p>Números são escritos <b>sem aspas</b>. Os sinais das contas são: <code>+</code> (somar), <code>-</code> (subtrair), <code>*</code> (multiplicar, o “vezes”) e <code>/</code> (dividir).</p>
<p>Números com vírgula usam <b>ponto</b>: dois reais e cinquenta é <code>2.5</code>.</p>`,
          codigo: c`console.log(2 + 3);    // 5
console.log(10 - 4);   // 6
console.log(3 * 2.5);  // 7.5
console.log(20 / 4);   // 5`,
          pratica: [
            m("Qual sinal faz multiplicação em JavaScript?", ["*", "x", "#", "%"], 0, "Em programação o “vezes” é o asterisco `*`. A letra x não funciona."),
            m("O que aparece com `console.log(10 * 3)`?", ["30", "13", "103", "7"], 0, "`10 * 3` é dez vezes três: 30.")
          ]
        },
        {
          titulo: "Textos (strings)",
          html: `<p>Um texto em programação se chama <b>string</b>. Ele vai entre aspas duplas <code>"assim"</code> ou simples <code>'assim'</code>.</p>
<p>Atenção: <code>"5"</code> entre aspas é um <b>texto</b> com o desenho do número 5, não um número para fazer conta.</p>`,
          codigo: c`console.log("Padaria do Zé");
console.log('Aberto todos os dias');`,
          pratica: [
            vf("`\"5\"` (entre aspas) é um número.", false, "Com aspas, vira texto (string). O número é escrito sem aspas: `5`."),
            m("Qual destas linhas escreve um texto do jeito certo?", ["console.log(\"Bolo de fubá\")", "console.log(Bolo de fubá)", "console.log(\"Bolo de fubá)", "console.log(Bolo de fubá\")"], 0, "O texto precisa de aspas no começo e no fim.")
          ]
        },
        {
          titulo: "O + que junta textos",
          html: `<p>Quando o <code>+</code> fica entre <b>textos</b>, ele não soma: ele <b>junta</b> (o nome técnico é <i>concatenar</i>).</p>
<p>O JavaScript junta exatamente o que está escrito, então o <b>espaço</b> precisa estar dentro das aspas.</p>`,
          codigo: c`console.log("Pão" + " de queijo");  // Pão de queijo
console.log("Bom" + "dia");         // Bomdia (faltou o espaço!)`,
          pratica: [
            m("O que aparece com `console.log(\"Café\" + \"zinho\")`?", ["Cafézinho", "Café zinho", "Café + zinho", "Dá erro"], 0, "O `+` entre textos cola um no outro, sem colocar espaço sozinho: `Cafézinho`."),
            l("Complete para aparecer Bolo de chocolate:", c`console.log("Bolo" ____ " de chocolate");`, ["+"], "O sinal que junta textos é o `+`.")
          ]
        },
        {
          titulo: "Texto + número vira texto",
          html: `<p>Se de um lado do <code>+</code> houver um <b>texto</b>, o resultado é sempre texto: o número é colado no fim. É assim que montamos mensagens como <code>"Total: 10"</code>.</p>
<p>Por isso <code>5 + 1</code> dá <code>6</code>, mas <code>"5" + 1</code> dá <code>"51"</code>.</p>`,
          codigo: c`console.log("Total: " + 10);  // Total: 10
console.log(5 + 1);           // 6
console.log("5" + 1);         // 51`,
          pratica: [
            m("O que aparece com `console.log(\"2\" + 2)`?", ["22", "4", "2 + 2", "Dá erro"], 0, "Como `\"2\"` é texto, o `+` junta: o resultado é o texto `22`."),
            vf("`console.log(\"Preço: \" + 8)` mostra `Preço: 8`.", true, "Texto + número vira texto: o 8 é colado depois de `Preço: `.")
          ]
        }
      ],
      codigo: c`console.log(2 + 3);                // 5
console.log(4 * 2.5);              // 10
console.log("Pão" + " de queijo"); // Pão de queijo
console.log("Total: R$ " + 12);    // Total: R$ 12
console.log("2" + 2);              // 22 (texto!)`,
      partes: [
        ["console.log(2 + 3);", "Dois números: o `+` soma e mostra 5."],
        ["console.log(4 * 2.5);", "O `*` multiplica. Número com vírgula usa ponto: `2.5`."],
        ['console.log("Pão" + " de queijo");', "Dois textos: o `+` junta. O espaço está dentro das aspas de `\" de queijo\"`."],
        ['console.log("Total: R$ " + 12);', "Texto + número: o número é colado no fim do texto."],
        ['console.log("2" + 2);', "Cuidado: `\"2\"` é texto, então o resultado é `22`, e não 4."]
      ],
      nota: "No sandbox, troque os números e veja o resultado mudar.",
      trabalho: `Toda loja virtual faz isso: multiplica o preço pela quantidade e monta a frase <code>"Total: R$ 25"</code>. O erro do <code>"5" + 1 = "51"</code> é famoso: acontece quando o número chega de um formulário como texto, e o carrinho mostra um total maluco.`,
      entrevista: {
        pergunta: "Por que \"5\" + 1 dá \"51\" e não 6?",
        resposta: `Porque <code>"5"</code> é <b>texto</b>. Quando um dos lados do <code>+</code> é texto, o JavaScript <b>junta</b> em vez de somar. Para somar, os dois lados precisam ser números (por exemplo, convertendo com <code>Number("5")</code>).`
      },
      busca: ["operadores aritméticos javascript", "concatenar strings javascript", "javascript string mais número"]
    },

    /* ================= p3 ================= */
    {
      titulo: "Variáveis com let e const",
      crianca: `Uma <b>variável</b> é uma <b>caixa com etiqueta</b>. Você escreve um nome na etiqueta (por exemplo, <code>paes</code>) e guarda um valor dentro (por exemplo, <code>20</code>). Depois, é só chamar a caixa pelo nome. Algumas caixas têm <b>tampa</b> e você pode trocar o conteúdo (<code>let</code>); outras são <b>lacradas</b> e o conteúdo nunca muda (<code>const</code>).`,
      passos: [
        {
          titulo: "Criando uma caixa com let",
          html: `<p>Para criar uma variável, escreva <code>let</code>, o <b>nome</b>, o sinal <code>=</code> e o <b>valor</b>. O <code>=</code> aqui quer dizer “guarde isto”.</p>
<p>Depois, use o nome (sem aspas) para pegar o valor de volta.</p>`,
          codigo: c`let paes = 20;
console.log(paes);   // 20`,
          pratica: [
            m("Qual linha cria uma variável chamada `ovos` com o valor 12?", ["let ovos = 12;", "let 12 = ovos;", "ovos let 12;", "console.log(ovos = )"], 0, "O formato é `let nome = valor;`: o nome vem antes do `=`."),
            vf("`console.log(paes)` (sem aspas) mostra o valor guardado na variável `paes`.", true, "Sem aspas, o JavaScript entende que `paes` é o nome de uma variável e mostra o que tem dentro.")
          ]
        },
        {
          titulo: "Trocando o valor do let",
          html: `<p>Uma variável <code>let</code> pode receber um <b>valor novo</b>. Para trocar, use só o nome e o <code>=</code>, <b>sem</b> escrever <code>let</code> de novo.</p>
<p>Dá até para usar o valor antigo na conta: <code>paes = paes - 5</code> quer dizer “o novo valor é o antigo menos 5”.</p>`,
          codigo: c`let paes = 20;
paes = paes - 5;    // vendeu 5
console.log(paes);  // 15`,
          pratica: [
            l("Complete para a variável `pontos` ganhar mais 10:", c`let pontos = 50;
pontos = pontos ____ 10;`, ["+"], "Para aumentar, somamos: `pontos = pontos + 10` (o resultado é 60)."),
            m("Depois de `let gatos = 2;` e `gatos = 3;`, quanto vale `gatos`?", ["3", "2", "5", "23"], 0, "O `=` troca o conteúdo da caixa: o 2 sai e entra o 3.")
          ]
        },
        {
          titulo: "const: a caixa lacrada",
          html: `<p>Use <code>const</code> (de “constante”) para valores que <b>não vão mudar</b>, como o nome da loja. Se alguém tentar trocar, o JavaScript mostra um erro.</p>
<p>Regra simples: comece com <code>const</code>; se o valor precisar mudar, use <code>let</code>.</p>`,
          codigo: c`const loja = "Padaria do Zé";
console.log(loja);
// loja = "Outra";  -> erro! const não pode mudar`,
          pratica: [
            vf("Uma variável criada com `const` pode receber outro valor depois.", false, "`const` é a caixa lacrada: tentar trocar o valor dá erro."),
            m("Qual é a melhor escolha para guardar o CPF de um cliente, que nunca muda?", ["const", "let", "console", "log"], 0, "Como o valor não muda, `const` é a escolha certa.")
          ]
        },
        {
          titulo: "Variáveis em contas e mensagens",
          html: `<p>Variáveis funcionam em contas e mensagens como se fossem os próprios valores. Dar bons nomes deixa o código fácil de ler.</p>
<p>Nomes não podem ter espaço. Quando são duas palavras, juntamos e começamos a segunda com maiúscula: <code>precoPao</code>.</p>`,
          codigo: c`const precoPao = 0.5;
let quantidade = 10;
const total = precoPao * quantidade;
console.log("Total: R$ " + total);  // Total: R$ 5`,
          pratica: [
            m("No código acima, quanto vale `total`?", ["5", "10.5", "0.5", "50"], 0, "`precoPao * quantidade` é 0.5 vezes 10, que dá 5."),
            vf("`let preco pao = 3;` é um nome de variável válido.", false, "Nomes de variáveis não podem ter espaço. Use `precoPao`.")
          ]
        }
      ],
      codigo: c`const loja = "Padaria do Zé";
let paes = 20;

paes = paes - 5;   // vendeu 5 pães

console.log(loja);
console.log("Pães no estoque: " + paes);`,
      partes: [
        ['const loja = "Padaria do Zé";', "Caixa lacrada com o nome da loja: o valor nunca muda."],
        ["let paes = 20;", "Caixa com tampa: o estoque começa em 20 e pode mudar."],
        ["paes = paes - 5;", "Troca o valor: pega o antigo (20), tira 5 e guarda 15. Sem escrever `let` de novo."],
        ['console.log("Pães no estoque: " + paes);', "Junta o texto com o valor da variável: mostra `Pães no estoque: 15`."]
      ],
      nota: "No sandbox, tente trocar o valor de <code>loja</code> depois de criada e veja o erro aparecer.",
      trabalho: `Todo sistema guarda informações em variáveis: o nome do cliente, o preço do produto, quantos itens há no carrinho. O carrinho muda (<code>let</code>); a taxa fixa de entrega da loja pode ser <code>const</code>.`,
      entrevista: {
        pergunta: "Quando usar let e quando usar const?",
        resposta: `Use <code>const</code> por padrão, para valores que não serão trocados. Use <code>let</code> só quando o valor <b>precisa mudar</b>, como um contador ou um total que vai somando. (Existe também o <code>var</code>, a forma antiga, que não se usa mais em código novo.)`
      },
      busca: ["let e const javascript", "o que é variável em programação", "javascript nomes de variáveis camelCase"]
    },

    /* ================= p4 ================= */
    {
      titulo: "Um botão que faz algo",
      crianca: `Uma página com botão é como uma <b>campainha</b> na porta da loja. O HTML coloca a campainha na parede. O JavaScript é a pessoa lá dentro que <b>fica escutando</b>: quando alguém aperta, ela responde, por exemplo trocando a placa de “Fechado” para “Aberto” ou dando um aviso.`,
      passos: [
        {
          titulo: "Dois arquivos: index.html e app.js",
          html: `<p>A página fica num arquivo <code>index.html</code>. O JavaScript costuma ficar em <b>outro arquivo</b>, por exemplo <code>app.js</code>, na mesma pasta.</p>
<p>Para ligar os dois, colocamos a tag <code>&lt;script src="app.js"&gt;&lt;/script&gt;</code> no fim do <code>&lt;body&gt;</code>. Quando o navegador chega nessa linha, ele <b>vai buscar o arquivo app.js</b> e roda o código dele. No sandbox, a aba <b>JS</b> faz o papel do <code>app.js</code>.</p>`,
          codigo: c`<!-- arquivo index.html -->
<h1>Padaria do Zé</h1>
<button id="pedir">Pedir pão</button>
<p id="mensagem">Clique no botão.</p>

<script src="app.js"></script>`,
          pratica: [
            m("O que a linha `<script src=\"app.js\"></script>` faz?", ["Manda o navegador buscar o arquivo app.js e rodar o JavaScript dele", "Cria um botão na página", "Apaga o arquivo app.js", "Muda a cor da página"], 0, "O `src` diz qual arquivo buscar. O navegador baixa o `app.js` e executa o código."),
            vf("Com `<script src=\"app.js\">`, o arquivo `app.js` precisa estar na mesma pasta do `index.html`.", true, "Escrito só `app.js`, o navegador procura o arquivo na mesma pasta da página.")
          ]
        },
        {
          titulo: "Encontrando o botão pelo id",
          html: `<p>O <code>id</code> é o <b>nome único</b> de um elemento da página. No JavaScript, <code>document.querySelector("#pedir")</code> encontra o elemento com <code>id="pedir"</code>. O <code>#</code> quer dizer “procure pelo id”.</p>
<p>Guardamos o que foi encontrado numa variável para usar depois.</p>`,
          codigo: c`const botao = document.querySelector("#pedir");`,
          pratica: [
            l("Complete para encontrar o botão que tem `id=\"comprar\"`:", c`const botao = document.querySelector("____");`, ["#comprar"], "Para procurar pelo id, use `#` seguido do nome: `#comprar`."),
            m("No `querySelector`, o que o `#` significa?", ["Procure pelo id", "É um comentário", "Multiplica", "Apaga o elemento"], 0, "O `#` antes do nome quer dizer “procure o elemento com este id”.")
          ]
        },
        {
          titulo: "Escutando o clique",
          html: `<p><code>addEventListener</code> quer dizer “fique escutando”. Dizemos <b>o que</b> escutar (<code>"click"</code>, o clique) e <b>o que fazer</b> quando acontecer: uma <code>function () { ... }</code>, que é um bloco de instruções guardado para rodar depois.</p>
<p>O <code>alert("...")</code> mostra uma janelinha de aviso na tela.</p>`,
          codigo: c`botao.addEventListener("click", function () {
  alert("Obrigado pelo pedido!");
});`,
          pratica: [
            m("Quando o código dentro de `function () { ... }` roda?", ["Quando alguém clica no botão", "Assim que a página abre, sempre", "Nunca", "Quando o navegador fecha"], 0, "A função fica guardada e só roda quando o evento `click` acontece."),
            l("Complete para escutar o clique:", c`botao.addEventListener("____", function () {
  alert("Oi!");
});`, ["click"], "O nome do evento de clique é `click`, em inglês.")
          ]
        },
        {
          titulo: "Trocando um texto da página",
          html: `<p>Em vez de um aviso, podemos <b>trocar o texto</b> de algum elemento. A propriedade <code>textContent</code> é o texto que está dentro dele: se você guardar outro texto ali, a página muda na hora.</p>`,
          codigo: c`const mensagem = document.querySelector("#mensagem");
mensagem.textContent = "Pedido recebido!";`,
          pratica: [
            l("Complete para trocar o texto do parágrafo para Loja aberta:", c`placa.____ = "Loja aberta";`, ["textContent"], "`textContent` é o texto de dentro do elemento. Guardar um texto novo ali troca o que aparece."),
            vf("Trocar o `textContent` muda o texto que aparece na página na mesma hora.", true, "Sim, o navegador atualiza a página assim que o `textContent` muda.")
          ]
        }
      ],
      codigo: c`// arquivo app.js (ligado no index.html com <script src="app.js">)
const botao = document.querySelector("#pedir");
const mensagem = document.querySelector("#mensagem");

botao.addEventListener("click", function () {
  mensagem.textContent = "Pedido recebido! Seu pão sai em 10 minutos.";
  alert("Obrigado pelo pedido!");
});`,
      partes: [
        ['document.querySelector("#pedir")', "Procura na página o elemento com `id=\"pedir\"` (o botão) e guarda em `botao`."],
        ['document.querySelector("#mensagem")', "Procura o parágrafo da mensagem e guarda em `mensagem`."],
        ['botao.addEventListener("click", function () {', "Fica escutando o clique no botão. O que está entre as chaves roda a cada clique."],
        ["mensagem.textContent = ...", "Troca o texto do parágrafo na página."],
        ['alert("Obrigado pelo pedido!");', "Mostra uma janelinha de aviso."]
      ],
      nota: "No sandbox, a aba HTML é o seu <code>index.html</code> e a aba JS é o <code>app.js</code>. Clique em <b>Pedir pão</b> na pré-visualização.",
      sandbox: {
        lang: "web",
        html: c`<!-- No seu computador, isto fica no arquivo index.html
     e o JavaScript fica no app.js, ligado no fim do body com:
     <script src="app.js"></script>
     Aqui no sandbox, a aba JS faz o papel do app.js. -->
<h1>Padaria do Zé</h1>
<button id="pedir">Pedir pão</button>
<p id="mensagem">Clique no botão para fazer seu pedido.</p>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
button { padding: 8px 16px; font-size: 16px; }`
      },
      trabalho: `Quase toda página tem algo assim: o botão “Adicionar ao carrinho” que troca o texto para “Adicionado!”, o botão “Mostrar senha”, o aviso “Copiado!”. Tudo começa com <b>achar o elemento</b>, <b>escutar o clique</b> e <b>mudar alguma coisa</b>.`,
      entrevista: {
        pergunta: "Por que o script costuma ficar no fim do body?",
        resposta: `Porque o navegador lê o HTML de cima para baixo. Se o script rodar antes do botão existir, o <code>querySelector</code> não encontra nada (devolve <code>null</code>) e dá erro. No fim do <code>&lt;body&gt;</code>, todos os elementos já foram criados. (Outra opção é usar <code>&lt;script src="app.js" defer&gt;</code> no <code>&lt;head&gt;</code>.)`
      },
      busca: ["javascript botão click addEventListener", "querySelector id javascript", "script src arquivo js externo"]
    }
  ],

  fixacao: [
    m("Qual comando mostra uma mensagem no console?", ["console.log", "print.tela", "mostrar()", "alert.console"], 0, "Em JavaScript, `console.log(...)` mostra no console o que está nos parênteses."),
    vf("O console fica nas ferramentas do desenvolvedor, que abrem com F12.", true, "Aperte F12 e clique na aba Console."),
    m("Qual é o resultado de `console.log(7 + 3)`?", ["10", "73", "7 + 3", "4"], 0, "São dois números, então o `+` soma: 10."),
    m("Qual é o resultado de `console.log(\"7\" + 3)`?", ["73", "10", "4", "Dá erro"], 0, "Como `\"7\"` é texto, o `+` junta: `73`."),
    l("Complete para dividir 20 por 4:", c`console.log(20 ____ 4);`, ["/"], "A divisão usa a barra `/`. O resultado é 5."),
    vf("`console.log(\"Oi\" + \"Ana\")` mostra `Oi Ana`, com espaço.", false, "O `+` não coloca espaço sozinho: aparece `OiAna`. O espaço precisa estar dentro das aspas, como `\"Oi \"`."),
    m("Para que servem as duas barras `//` no código?", ["Para escrever um comentário que o JavaScript ignora", "Para dividir duas vezes", "Para mostrar algo no console", "Para criar uma variável"], 0, "Tudo depois de `//` na linha é comentário, um recado para quem lê."),
    l("Complete para criar a variável `cidade` que nunca vai mudar:", c`____ cidade = "Recife";`, ["const"], "Valor que não muda vai numa `const`."),
    m("Depois de `let estoque = 10;` e `estoque = estoque - 3;`, quanto vale `estoque`?", ["7", "10", "13", "3"], 0, "O novo valor é o antigo (10) menos 3: 7."),
    vf("Para trocar o valor de uma variável `let`, é preciso escrever `let` de novo.", false, "Para trocar, escreva só o nome e o `=`: `estoque = 7;`. O `let` aparece só na criação."),
    m("Que linha do HTML liga a página ao arquivo de JavaScript `app.js`?", ["<script src=\"app.js\"></script>", "<link app.js>", "<js>app.js</js>", "<p>app.js</p>"], 0, "A tag `<script>` com `src` manda o navegador buscar e rodar o arquivo."),
    m("Qual propriedade troca o texto que aparece dentro de um elemento da página?", ["textContent", "console", "click", "querySelector"], 0, "Guardar um texto em `textContent` troca o que aparece dentro do elemento.")
  ],

  checkpoints: {
    b1: [
      m("Qual palavra usar para criar uma variável que vai mudar de valor depois?", ["let", "const", "typeof", "null"], 0, "`let` é a caixa com tampa: o valor pode ser trocado. `const` não pode."),
      vf("`5 === \"5\"` dá `true`.", false, "O `===` compara valor e tipo. Um é número e o outro é texto, então dá `false`.")
    ],
    b2: [
      m("No exemplo, o que `calcularFrete(250, \"SP\")` devolve?", ["0", "15", "25", "250"], 0, "A primeira regra diz: se a compra for 200 ou mais, o frete é 0. 250 é maior que 200."),
      l("Complete a arrow function que soma dois números:", c`const somar = (a, b) ____ a + b;`, ["=>"], "A arrow function usa a setinha `=>` entre os parâmetros e o resultado.")
    ],
    b3: [
      m("Qual método separa só alguns itens de uma lista, de acordo com uma condição?", ["filter", "map", "reduce", "console.log"], 0, "`filter` filtra: fica só com os itens em que a condição dá verdadeiro."),
      vf("No exemplo, `pedidos.find(...)` devolve uma lista com todos os pedidos do Caio.", false, "O `find` devolve só o primeiro item que combina, e não uma lista.")
    ],
    i1: [
      m("Para que serve `addEventListener(\"click\", ...)`?", ["Para rodar um código quando o elemento for clicado", "Para apagar o elemento", "Para criar um arquivo", "Para mudar a cor do navegador"], 0, "Ele deixa o elemento escutando o clique e roda a função quando o clique acontece."),
      vf("No exemplo, usar `li.textContent = texto` é mais seguro que `innerHTML` para o texto digitado pelo usuário.", true, "`textContent` coloca o texto como texto puro, sem interpretar HTML, o que evita ataques XSS.")
    ],
    i2: [
      m("O que `JSON.stringify(usuario)` faz?", ["Transforma o objeto em texto JSON", "Transforma texto em objeto", "Apaga o usuário", "Copia o usuário para outra variável"], 0, "`stringify` vira texto (para salvar ou enviar). O caminho contrário é `JSON.parse`."),
      l("Complete para copiar `usuario` trocando só o email:", c`const atualizado = { ____usuario, email: "novo@email.com" };`, ["..."], "Os três pontinhos `...` (spread) copiam todas as propriedades de `usuario`.")
    ],
    i3: [
      vf("O `await` espera a Promise terminar antes de seguir para a próxima linha da função.", true, "É como esperar a campainha tocar: a função pausa ali até a resposta chegar."),
      m("Por que o exemplo confere `resp.ok`?", ["Porque o fetch não dá erro sozinho quando a API responde 404 ou 500", "Para deixar o código mais rápido", "Porque o fetch sempre falha", "Para converter o CEP em número"], 0, "O `fetch` só rejeita em falha de rede. Respostas 404/500 precisam ser checadas com `resp.ok`.")
    ],
    a1: [
      m("Qual é a principal vantagem do TypeScript?", ["Avisar erros de tipo antes de o programa rodar", "Deixar a página mais colorida", "Dispensar o navegador", "Apagar o JavaScript"], 0, "O TypeScript confere os tipos enquanto você escreve, antes de rodar."),
      m("No `interface Pedido`, o que o `?` em `cupom?: string` significa?", ["Que o campo é opcional", "Que o campo é obrigatório", "Que o campo é um número", "Que é uma pergunta para o usuário"], 0, "O `?` depois do nome indica que o pedido pode ou não ter cupom.")
    ],
    a2: [
      m("Qual linha faz a API começar a receber pedidos na porta 3000?", ["app.listen(3000, ...)", "app.use(express.json())", "require(\"express\")", "res.json(tarefas)"], 0, "`app.listen` liga o servidor e fica ouvindo a porta indicada."),
      m("No exemplo, se o `titulo` não for enviado no POST, qual status a API responde?", ["400", "201", "200", "500"], 0, "O código faz `res.status(400)`: 400 significa “pedido inválido”.")
    ],
    a3: [
      vf("Uma closure permite que a função lembre as variáveis do lugar onde foi criada.", true, "É a mochila: a função leva junto as variáveis, como o `n` do contador."),
      m("Na ordem do exemplo do event loop, o que aparece logo depois de `1`?", ["4", "2 - timeout", "3 - promise", "Nada"], 0, "Primeiro roda todo o código síncrono (`1` e `4`). Depois vêm a promise e, por último, o timeout.")
    ]
  }
};
