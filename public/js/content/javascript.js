const c = String.raw;

export default {
  id: "javascript",
  nome: "JavaScript / TypeScript",
  icone: "⚡",
  cor: "#d4a106",
  dificuldade: 3,
  resumo: "A linguagem que dá vida à página: cliques, formulários, chamadas a APIs. Também roda no servidor (Node.js).",
  mercado: "É a linguagem com mais vagas: front-end, full-stack, mobile (React Native) e back-end com Node. TypeScript é exigido na maioria das vagas atuais.",
  docs: [
    { nome: "MDN — JavaScript", url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript", desc: "a bíblia do JS" },
    { nome: "javascript.info", url: "https://javascript.info/", desc: "tutorial moderno completo" },
    { nome: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    { nome: "Node.js docs", url: "https://nodejs.org/docs/latest/api/" }
  ],
  niveis: {
    basico: {
      objetivo: "escrever lógica em JavaScript, manipular listas e objetos e entender o console do navegador.",
      topicos: [
        {
          titulo: "Variáveis (let, const) e tipos",
          crianca: `<code>const</code> é uma caixa <b>lacrada com cola</b>: o que entrou não sai mais. <code>let</code> é uma caixa com <b>tampa</b>: dá para trocar o conteúdo. O <code>var</code> é uma caixa antiga e furada; não use mais.`,
          codigo: c`
const nome = "Maria";      // string
let pontos = 10;           // number
const ativo = true;        // boolean
let endereco = null;       // vazio de propósito
let telefone;              // undefined (nunca recebeu valor)

pontos = pontos + 5;
console.log("Olá, " + nome + "! Pontos: " + pontos);

// Comparação: use SEMPRE ===
console.log(5 == "5");   // true  (converte tipos, perigoso)
console.log(5 === "5");  // false (compara valor E tipo)

console.log(typeof pontos); // "number"`,
          nota: "Teste agora: aperte F12 no navegador, vá na aba Console e digite os comandos.",
          trabalho: `Bugs de <code>==</code> são clássicos: o campo do formulário devolve <code>"0"</code> (texto) e a comparação com <code>0</code> “funciona” até o dia em que não funciona. Nos times profissionais, o <b>ESLint</b> obriga o uso de <code>===</code>.`,
          entrevista: {
            pergunta: "Qual a diferença entre var, let e const?",
            resposta: `<code>var</code> tem escopo de <b>função</b> e sofre hoisting (pode ser usado antes da declaração, valendo undefined). <code>let</code> e <code>const</code> têm escopo de <b>bloco</b> (<code>{ }</code>). <code>const</code> não pode ser reatribuída, mas, se for um objeto, as propriedades internas ainda podem mudar.`
          },
          busca: ["let vs const vs var", "== vs === javascript", "javascript typeof null"]
        },
        {
          titulo: "Funções e condicionais",
          crianca: `Função é um <b>botão de máquina</b>: aperta (chama), ela faz o trabalho e devolve algo. A <b>arrow function</b> <code>=&gt;</code> é só um jeito mais curto de desenhar o mesmo botão.`,
          codigo: c`
function calcularFrete(valorCompra, uf) {
  if (valorCompra >= 200) return 0;
  if (uf === "SP") return 15;
  return 25;
}

const somar = (a, b) => a + b;           // arrow function
const ehMaior = (idade) => idade >= 18;

// Ternário: if de uma linha
const status = ehMaior(17) ? "adulto" : "menor";

// Valor padrão e "??" (se for null/undefined)
function saudar(nome = "visitante") {
  return "Olá, " + nome;
}
const apelido = null ?? "Sem apelido";

console.log(calcularFrete(150, "SP"), somar(2, 3), status, saudar());`,
          trabalho: `Cálculo de frete, validação de CPF no formulário, máscara de telefone, regra de exibir ou não um botão. O operador <code>??</code> e o encadeamento <code>?.</code> (<code>cliente?.endereco?.cidade</code>) evitam o famoso erro <i>“Cannot read properties of undefined”</i>.`,
          entrevista: {
            pergunta: "O que acontece com o this em uma arrow function?",
            resposta: `A arrow function <b>não tem this próprio</b>: ela usa o <code>this</code> do lugar onde foi criada (escopo léxico). Por isso é ótima em callbacks, mas não deve ser usada como método de objeto quando você precisa do <code>this</code> do próprio objeto.`
          },
          busca: ["arrow function javascript", "optional chaining ?.", "nullish coalescing ??"]
        },
        {
          titulo: "Arrays: map, filter, reduce",
          crianca: `Imagine uma <b>cesta de frutas</b>. O <code>filter</code> separa só as maçãs. O <code>map</code> transforma cada fruta em suco. O <code>reduce</code> junta tudo em uma única vitamina. O <code>find</code> procura a primeira banana.`,
          codigo: c`
const pedidos = [
  { id: 1, cliente: "Ana",  valor: 120, pago: true },
  { id: 2, cliente: "Bia",  valor: 80,  pago: false },
  { id: 3, cliente: "Caio", valor: 300, pago: true },
];

const pagos = pedidos.filter((p) => p.pago);
const nomes = pedidos.map((p) => p.cliente);
const total = pagos.reduce((soma, p) => soma + p.valor, 0);
const doCaio = pedidos.find((p) => p.cliente === "Caio");
const temPendente = pedidos.some((p) => !p.pago);

const ordenados = [...pedidos].sort((a, b) => b.valor - a.valor);

console.log(pagos.length, nomes, total, doCaio.id, temPendente);`,
          trabalho: `A API devolve uma lista de pedidos e a tela precisa mostrar só os pagos, o total e a lista ordenada. Isso é <code>filter</code> + <code>reduce</code> + <code>sort</code>. No React, o <code>map</code> é usado para desenhar cada item na tela.`,
          entrevista: {
            pergunta: "Qual a diferença entre map e forEach?",
            resposta: `<code>map</code> <b>retorna um novo array</b> com os resultados transformados. <code>forEach</code> só executa algo para cada item e retorna undefined. Use <code>map</code> para transformar e <code>forEach</code> para efeitos colaterais (como logar ou salvar).`
          },
          busca: ["javascript array methods", "reduce javascript exemplos", "sort numbers javascript"]
        }
      ]
    },
    intermediario: {
      objetivo: "criar páginas interativas, consumir APIs e trabalhar com objetos e JSON.",
      topicos: [
        {
          titulo: "DOM e eventos",
          crianca: `O DOM é a <b>árvore genealógica</b> da página: cada tag é um parente. O JavaScript pode achar qualquer parente, mudar a roupa dele ou criar um novo. Eventos são <b>campainhas</b>: quando alguém clica, o código ouve e responde.`,
          codigo: c`
// HTML: <input id="tarefa"> <button id="add">Adicionar</button> <ul id="lista"></ul>

const input = document.querySelector("#tarefa");
const lista = document.querySelector("#lista");

document.querySelector("#add").addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return alert("Digite algo!");

  const li = document.createElement("li");
  li.textContent = texto;               // textContent evita injeção de HTML
  li.addEventListener("click", () => li.classList.toggle("feito"));
  lista.appendChild(li);

  input.value = "";
  input.focus();
});`,
          trabalho: `Mostrar e esconder senha, abrir menu no celular, validar formulário antes de enviar, contador de caracteres. Prefira <code>textContent</code> a <code>innerHTML</code> com dados do usuário, para evitar ataques <b>XSS</b>.`,
          entrevista: {
            pergunta: "O que é event delegation (delegação de eventos)?",
            resposta: `Em vez de colocar um listener em cada item, você coloca <b>um só no pai</b> e usa <code>event.target</code> para saber quem foi clicado. Funciona porque os eventos “sobem” (bubbling). É mais eficiente e funciona para itens adicionados depois.`
          },
          busca: ["querySelector addEventListener", "event delegation javascript", "textContent vs innerHTML xss"]
        },
        {
          titulo: "Objetos, JSON e desestruturação",
          crianca: `Desestruturar é <b>abrir a lancheira</b> e já tirar o sanduíche e o suco de uma vez, em vez de pegar um por um. O spread <code>...</code> é <b>copiar todos os brinquedos</b> de uma caixa para outra.`,
          codigo: c`
const usuario = {
  nome: "João",
  email: "joao@email.com",
  endereco: { cidade: "Curitiba", uf: "PR" },
};

const { nome, endereco: { cidade } } = usuario;   // desestruturação
const [primeiro, segundo] = ["ouro", "prata", "bronze"];

const atualizado = { ...usuario, email: "novo@email.com" }; // cópia + alteração

const json = JSON.stringify(usuario);   // objeto -> texto (para enviar/salvar)
const obj = JSON.parse(json);           // texto -> objeto

Object.entries(usuario.endereco).forEach(([chave, valor]) =>
  console.log(chave, valor)
);

localStorage.setItem("usuario", JSON.stringify(usuario));`,
          trabalho: `Ao editar o perfil, você copia o usuário com <code>...</code> e troca só o campo alterado (fundamental no React, que exige <b>imutabilidade</b>). Salvar o carrinho no <code>localStorage</code> exige <code>JSON.stringify</code>.`,
          entrevista: {
            pergunta: "O spread faz cópia profunda (deep copy)?",
            resposta: `Não: é uma cópia <b>rasa</b>. Objetos internos continuam sendo a mesma referência. Para cópia profunda, use <code>structuredClone(obj)</code> (moderno) ou uma biblioteca. <code>JSON.parse(JSON.stringify(obj))</code> funciona, mas perde datas e funções.`
          },
          busca: ["destructuring javascript", "spread operator objeto", "structuredClone deep copy"]
        },
        {
          titulo: "Assíncrono: fetch, Promises e async/await",
          crianca: `Você pede uma pizza por telefone. Não fica parado olhando a porta: vai brincar e, quando a pizza chega, a campainha toca. A <b>Promise</b> é a promessa de que a pizza vai chegar (ou de que vão ligar dizendo que deu problema). O <code>await</code> é esperar a campainha.`,
          codigo: c`
async function buscarCep(cep) {
  try {
    const resp = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const dados = await resp.json();
    if (dados.erro) throw new Error("CEP não encontrado");
    return dados;
  } catch (erro) {
    console.error("Falhou:", erro.message);
    return null;
  }
}

buscarCep("01001000").then((e) => console.log(e?.logradouro));

// Várias chamadas ao mesmo tempo
const [a, b] = await Promise.all([buscarCep("01001000"), buscarCep("20040002")]);`,
          trabalho: `Preencher o endereço automaticamente pelo <b>CEP</b> (ViaCEP), carregar produtos de uma API, enviar o formulário sem recarregar a página. Sempre trate o erro e mostre um “carregando…”.`,
          entrevista: {
            pergunta: "O fetch rejeita a Promise quando a API responde 404 ou 500?",
            resposta: `<b>Não!</b> O <code>fetch</code> só rejeita em falha de rede. Para 404/500, a Promise resolve normalmente, e você precisa checar <code>resp.ok</code> ou <code>resp.status</code>. Essa é uma pegadinha clássica.`
          },
          busca: ["fetch api async await", "promise all javascript", "viacep api"]
        }
      ]
    },
    avancado: {
      objetivo: "escrever código tipado com TypeScript, criar APIs com Node e entender o funcionamento interno do JS.",
      topicos: [
        {
          titulo: "TypeScript",
          crianca: `TypeScript é o JavaScript com <b>etiquetas de segurança</b>. Se a caixa diz “só números” e você tenta colocar uma banana, ele avisa <b>antes</b> de o programa rodar, e não depois que o cliente achou o erro.`,
          codigo: c`
type Status = "pendente" | "pago" | "cancelado";

interface Pedido {
  id: number;
  cliente: string;
  valor: number;
  status: Status;
  cupom?: string;          // opcional
}

function totalPago(pedidos: Pedido[]): number {
  return pedidos
    .filter((p) => p.status === "pago")
    .reduce((s, p) => s + p.valor, 0);
}

// Genéricos: funciona com qualquer tipo, mantendo a segurança
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

totalPago([{ id: 1, cliente: "Ana", valor: 50, status: "pago" }]);
// totalPago([{ id: 1, valor: "50" }]); // ❌ erro antes de rodar`,
          trabalho: `Em projetos grandes, renomear um campo da API quebra dezenas de telas. Com TypeScript, o editor mostra <b>todos os lugares</b> afetados na hora. É exigido na maioria das vagas de React, Node e Angular.`,
          entrevista: {
            pergunta: "Qual a diferença entre type e interface? E entre any e unknown?",
            resposta: `<code>interface</code> descreve formatos de objetos e pode ser estendida e mesclada; <code>type</code> também aceita uniões (<code>"a" | "b"</code>) e tipos mais complexos. <code>any</code> desliga a checagem; <code>unknown</code> obriga você a verificar o tipo antes de usar, por isso é mais seguro.`
          },
          busca: ["typescript interface vs type", "typescript generics", "any vs unknown"]
        },
        {
          titulo: "Node.js e APIs com Express",
          crianca: `Até agora o JavaScript morava só no navegador. O Node.js é a <b>casa nova</b> dele, no servidor. Lá ele pode ser o garçom (a API) que recebe pedidos e conversa com o banco de dados.`,
          codigo: c`
// npm init -y && npm install express
const express = require("express");
const app = express();
app.use(express.json());

const tarefas = [{ id: 1, titulo: "Estudar JS", feita: false }];

app.get("/tarefas", (req, res) => res.json(tarefas));

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: "titulo é obrigatório" });
  const nova = { id: tarefas.length + 1, titulo, feita: false };
  tarefas.push(nova);
  res.status(201).json(nova);
});

app.listen(3000, () => console.log("API em http://localhost:3000"));`,
          trabalho: `Criar um <b>webhook</b> que recebe o aviso de pagamento do Mercado Pago ou do Stripe, um back-end para o app React ou uma integração entre dois sistemas. Use variáveis de ambiente (<code>process.env</code>) para senhas e chaves, nunca deixe no código.`,
          entrevista: {
            pergunta: "O que é middleware no Express?",
            resposta: `É uma função <code>(req, res, next)</code> que roda <b>no meio do caminho</b> entre a requisição e a resposta. Serve para log, autenticação (verificar token), parse de JSON e CORS. Ela chama <code>next()</code> para passar adiante ou responde e encerra.`
          },
          busca: ["express js tutorial", "express middleware", "node dotenv variáveis ambiente"]
        },
        {
          titulo: "Closures, escopo e event loop",
          crianca: `<b>Closure</b> é uma mochila: a função leva junto as variáveis do lugar onde nasceu, mesmo depois de sair de lá. O <b>event loop</b> é a fila do pula-pula: só uma criança pula por vez; as que estão esperando (timers, respostas da internet) entram quando o pula-pula fica livre.`,
          codigo: c`
function criarContador() {
  let n = 0;                 // fica "preso" na mochila
  return () => ++n;
}
const contar = criarContador();
contar(); contar();
console.log(contar());       // 3

// Ordem de execução (pergunta clássica!)
console.log("1");
setTimeout(() => console.log("2 - timeout"), 0);
Promise.resolve().then(() => console.log("3 - promise"));
console.log("4");
// Saída: 1, 4, 3 - promise, 2 - timeout`,
          trabalho: `Closures aparecem em <b>debounce</b> (esperar o usuário parar de digitar antes de buscar), em hooks do React e em funções que “lembram” configurações. Entender o event loop explica por que a tela trava em um <code>for</code> pesado.`,
          entrevista: {
            pergunta: "Por que a Promise imprime antes do setTimeout com 0ms?",
            resposta: `Promises vão para a fila de <b>microtasks</b>, e o setTimeout vai para a fila de <b>macrotasks</b>. Depois de terminar o código síncrono, o event loop esvazia <b>todas</b> as microtasks antes de pegar a próxima macrotask.`
          },
          busca: ["javascript closure exemplo", "event loop microtask macrotask", "debounce javascript"]
        }
      ]
    }
  }
};
