import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>JavaScript tem três formas de criar variáveis. <code>const</code> cria uma variável que <b>não pode ser reatribuída</b>; deve ser a escolha padrão. <code>let</code> cria uma variável que pode mudar de valor, usada para contadores e acumuladores. <code>var</code> é a forma antiga, com regras confusas de escopo, e não deve ser usada em código novo.</p>
<p>Os tipos primitivos são: <code>string</code> (texto, entre aspas simples, duplas ou crases), <code>number</code> (inteiros e decimais são o mesmo tipo), <code>boolean</code> (<code>true</code>/<code>false</code>), <code>undefined</code> (variável sem valor), <code>null</code> (vazio de propósito), além de <code>bigint</code> e <code>symbol</code>. Todo o resto (listas, objetos, funções) é <b>objeto</b>. O operador <code>typeof</code> mostra o tipo de um valor.</p>
<p>JavaScript converte tipos automaticamente em algumas operações, o que gera surpresas: <code>"5" + 1</code> dá <code>"51"</code> (junta textos), mas <code>"5" - 1</code> dá <code>4</code>. Por isso, compare sempre com <code>===</code> (igualdade estrita), que verifica valor <b>e</b> tipo. O console do navegador (F12 → Console) é o lugar ideal para testar pequenos trechos.</p>`,
      partes: [
        [c`const nome = "Maria";`, "Constante de texto: não pode receber outro valor depois."],
        [c`let pontos = 10;`, "Variável que pode mudar."],
        [c`let endereco = null;`, "`null`: “sem valor”, definido de propósito pelo programador."],
        [c`let telefone;`, "Declarada sem valor: fica `undefined`."],
        [c`pontos = pontos + 5;`, "Reatribui `pontos` (permitido porque é `let`)."],
        [c`console.log("Olá, " + nome + "! Pontos: " + pontos);`, "Mostra no console um texto montado com `+`."],
        [c`console.log(5 == "5");   // true`, "`==` converte os tipos antes de comparar: perigoso."],
        [c`console.log(5 === "5");  // false`, "`===` compara valor e tipo: o jeito recomendado."],
        [c`console.log(typeof pontos);`, "Mostra o tipo: `\"number\"`."]
      ]
    },
    b2: {
      detalhes: `<p>Funções em JavaScript podem ser criadas de três jeitos: <b>declaração</b> (<code>function nome() {}</code>), <b>expressão</b> (<code>const nome = function () {}</code>) e <b>arrow function</b> (<code>const nome = () =&gt; {}</code>). As arrow functions são curtas e muito usadas em callbacks; quando têm uma única expressão, o <code>return</code> é implícito: <code>(a, b) =&gt; a + b</code>.</p>
<p>Condicionais funcionam como em outras linguagens: <code>if</code>, <code>else if</code>, <code>else</code> e <code>switch</code>. O <b>operador ternário</b> <code>condição ? valorSeVerdadeiro : valorSeFalso</code> escolhe um valor em uma linha. Valores considerados “falsos” (<i>falsy</i>) em condições: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code> e <code>NaN</code>. Todo o resto é “verdadeiro” (<i>truthy</i>).</p>
<p>Dois operadores modernos evitam erros comuns. O <code>??</code> (<i>nullish coalescing</i>) usa um valor padrão só quando o valor é <code>null</code> ou <code>undefined</code>. O <code>?.</code> (<i>optional chaining</i>) acessa propriedades com segurança: <code>cliente?.endereco?.cidade</code> devolve <code>undefined</code> em vez de dar erro se algo no caminho não existir.</p>`,
      partes: [
        [c`function calcularFrete(valorCompra, uf) {`, "Declaração de função com dois parâmetros."],
        [c`if (valorCompra >= 200) return 0;`, "Se a compra for de 200 ou mais, o frete é grátis e a função termina aqui."],
        [c`if (uf === "SP") return 15;`, "Senão, para SP o frete é 15."],
        [c`return 25;`, "Qualquer outro caso: 25."],
        [c`const somar = (a, b) => a + b;`, "Arrow function: devolve `a + b` sem precisar escrever `return`."],
        [c`const status = ehMaior(17) ? "adulto" : "menor";`, "Ternário: como `ehMaior(17)` é falso, `status` recebe `\"menor\"`."],
        [c`function saudar(nome = "visitante") {`, "Parâmetro com valor padrão."],
        [c`const apelido = null ?? "Sem apelido";`, "Como o lado esquerdo é `null`, usa o valor da direita."]
      ]
    },
    b3: {
      detalhes: `<p>Arrays (listas) guardam vários valores em ordem, com índice começando em 0. Além de percorrer com <code>for</code> ou <code>for...of</code>, o JavaScript oferece <b>métodos de array</b> que recebem uma função (callback) e deixam o código mais claro e declarativo.</p>
<ul>
<li><code>map</code>: transforma cada item e devolve um <b>novo array</b> do mesmo tamanho.</li>
<li><code>filter</code>: devolve um novo array só com os itens que passam no teste.</li>
<li><code>reduce</code>: “reduz” o array a um único valor (soma, objeto de contagem etc.).</li>
<li><code>find</code>: devolve o <b>primeiro</b> item que passa no teste (ou <code>undefined</code>).</li>
<li><code>some</code> / <code>every</code>: verificam se algum / todos passam no teste.</li>
<li><code>sort</code>: ordena o próprio array (altera o original!). Para números, sempre passe a função de comparação.</li>
</ul>
<p><code>map</code>, <code>filter</code> e <code>reduce</code> não alteram o array original, o que evita bugs e é exigido em frameworks como React. O operador <i>spread</i> (<code>[...lista]</code>) cria uma cópia antes de usar métodos que alteram, como <code>sort</code>.</p>`,
      partes: [
        [c`const pedidos = [ { id: 1, cliente: "Ana", valor: 120, pago: true }, … ];`, "Array de objetos: formato típico de dados vindos de uma API."],
        [c`pedidos.filter((p) => p.pago)`, "Mantém só os pedidos em que `pago` é verdadeiro."],
        [c`pedidos.map((p) => p.cliente)`, "Transforma cada pedido no nome do cliente: `[\"Ana\", \"Bia\", \"Caio\"]`."],
        [c`pagos.reduce((soma, p) => soma + p.valor, 0)`, "Começa a soma em 0 e adiciona o valor de cada pedido pago."],
        [c`pedidos.find((p) => p.cliente === "Caio")`, "Primeiro pedido do Caio."],
        [c`pedidos.some((p) => !p.pago)`, "`true` se existir pelo menos um pedido não pago."],
        [c`[...pedidos].sort((a, b) => b.valor - a.valor)`, "Copia o array e ordena do maior para o menor valor. Resultado negativo deixa `a` antes de `b`."]
      ]
    },
    i1: {
      detalhes: `<p>O <b>DOM</b> (<i>Document Object Model</i>) é a representação da página HTML como uma árvore de objetos que o JavaScript pode ler e modificar. Para encontrar elementos usamos <code>document.querySelector(seletor)</code> (o primeiro que combina) e <code>querySelectorAll</code> (todos), com os mesmos seletores do CSS.</p>
<p>Com um elemento em mãos, você pode mudar o texto (<code>textContent</code>), as classes (<code>classList.add/remove/toggle</code>), estilos (<code>style</code>), atributos (<code>setAttribute</code>) e o valor de campos (<code>value</code>). Para criar elementos novos, usa-se <code>document.createElement</code> e depois <code>appendChild</code> ou <code>append</code> para colocá-los na página.</p>
<p><b>Eventos</b> são acontecimentos na página: clique (<code>click</code>), digitação (<code>input</code>), envio de formulário (<code>submit</code>), tecla (<code>keydown</code>) etc. O <code>addEventListener(evento, função)</code> registra a função que será chamada quando o evento acontecer. Prefira <code>textContent</code> a <code>innerHTML</code> ao exibir dados digitados pelo usuário, para evitar ataques XSS (injeção de código).</p>`,
      partes: [
        [c`const input = document.querySelector("#tarefa");`, "Pega o campo de texto com `id=\"tarefa\"`."],
        [c`document.querySelector("#add").addEventListener("click", () => {`, "Quando o botão “Adicionar” for clicado, executa a função."],
        [c`const texto = input.value.trim();`, "Lê o que foi digitado e remove espaços das pontas."],
        [c`if (!texto) return alert("Digite algo!");`, "Se estiver vazio, avisa e para."],
        [c`const li = document.createElement("li");`, "Cria um novo item de lista (ainda fora da página)."],
        [c`li.textContent = texto;`, "Coloca o texto no item de forma segura (sem interpretar HTML)."],
        [c`li.addEventListener("click", () => li.classList.toggle("feito"));`, "Clicar no item liga/desliga a classe `feito` (riscado)."],
        [c`lista.appendChild(li);`, "Insere o item na lista: agora ele aparece na tela."],
        [c`input.value = ""; input.focus();`, "Limpa o campo e devolve o cursor para ele."]
      ]
    },
    i2: {
      detalhes: `<p><b>Objetos</b> guardam pares chave: valor entre chaves (<code>{ nome: "João" }</code>). Você acessa com ponto (<code>usuario.nome</code>) ou colchetes (<code>usuario["nome"]</code>), útil quando a chave está em uma variável. Objetos podem ter outros objetos e arrays dentro, e também funções (métodos).</p>
<p>A <b>desestruturação</b> extrai valores de objetos e arrays para variáveis em uma linha: <code>const { nome, email } = usuario</code>. O <b>spread</b> (<code>...</code>) “espalha” as propriedades de um objeto em outro, criando cópias com alterações: <code>{ ...usuario, email: "novo" }</code>. Essa cópia é <b>rasa</b>: objetos internos continuam compartilhados.</p>
<p><b>JSON</b> é o formato de texto usado para trocar dados com APIs e salvar dados. <code>JSON.stringify(objeto)</code> transforma em texto e <code>JSON.parse(texto)</code> faz o caminho inverso. O <code>localStorage</code> só guarda texto, por isso precisa dessas conversões. <code>Object.keys</code>, <code>Object.values</code> e <code>Object.entries</code> permitem percorrer objetos.</p>`,
      partes: [
        [c`const usuario = { nome: "João", email: "…", endereco: { cidade: "Curitiba", uf: "PR" } };`, "Objeto com outro objeto (`endereco`) dentro."],
        [c`const { nome, endereco: { cidade } } = usuario;`, "Desestruturação: cria as variáveis `nome` e `cidade` de uma vez."],
        [c`const [primeiro, segundo] = ["ouro", "prata", "bronze"];`, "Desestruturação de array: pega os dois primeiros itens."],
        [c`const atualizado = { ...usuario, email: "novo@email.com" };`, "Copia todas as propriedades e sobrescreve só o e-mail. O original não muda."],
        [c`const json = JSON.stringify(usuario);`, "Objeto → texto JSON."],
        [c`const obj = JSON.parse(json);`, "Texto JSON → objeto."],
        [c`Object.entries(usuario.endereco).forEach(([chave, valor]) => …)`, "Percorre os pares `[chave, valor]` do objeto."],
        [c`localStorage.setItem("usuario", JSON.stringify(usuario));`, "Salva no navegador (só aceita texto, por isso o `stringify`)."]
      ]
    },
    i3: {
      detalhes: `<p>Algumas operações demoram: buscar dados na internet, ler arquivos, esperar um tempo. Se o JavaScript esperasse parado, a página travaria. Por isso essas operações são <b>assíncronas</b>: começam agora e avisam quando terminarem. Uma <b>Promise</b> representa esse resultado futuro e pode estar <i>pendente</i>, <i>resolvida</i> (deu certo) ou <i>rejeitada</i> (deu erro).</p>
<p>A forma moderna de trabalhar com Promises é <code>async/await</code>. Uma função marcada com <code>async</code> pode usar <code>await</code> para esperar uma Promise sem travar a página, e o código fica com cara de sequencial. Erros são tratados com <code>try/catch</code>. A forma antiga, que ainda aparece bastante, usa <code>.then()</code> e <code>.catch()</code>.</p>
<p>O <code>fetch(url)</code> faz requisições HTTP e devolve uma Promise com a resposta. Atenção: ele só rejeita em falha de rede; respostas 404 ou 500 chegam normalmente, então é preciso checar <code>resp.ok</code>. Para ler o corpo como objeto, use <code>await resp.json()</code>. O <code>Promise.all</code> executa várias Promises em paralelo e espera todas.</p>`,
      partes: [
        [c`async function buscarCep(cep) {`, "Função assíncrona: pode usar `await` e sempre devolve uma Promise."],
        [c`const resp = await fetch("https://viacep.com.br/ws/" + cep + "/json/");`, "Faz a requisição à API do ViaCEP e espera a resposta."],
        [c`if (!resp.ok) throw new Error("HTTP " + resp.status);`, "Se o status não for de sucesso (200–299), lança um erro."],
        [c`const dados = await resp.json();`, "Lê o corpo da resposta e converte de JSON para objeto."],
        [c`if (dados.erro) throw new Error("CEP não encontrado");`, "O ViaCEP responde 200 com `{ erro: true }` quando o CEP não existe."],
        [c`} catch (erro) { … return null; }`, "Qualquer erro do bloco `try` cai aqui; a função devolve `null`."],
        [c`buscarCep("01001000").then((e) => console.log(e?.logradouro));`, "Usa a Promise com `.then`; o `?.` evita erro se vier `null`."],
        [c`const [a, b] = await Promise.all([buscarCep(…), buscarCep(…)]);`, "Faz as duas buscas ao mesmo tempo e espera ambas terminarem."]
      ]
    },
    a1: {
      detalhes: `<p><b>TypeScript</b> é o JavaScript com <b>tipos</b>. Você escreve o código em arquivos <code>.ts</code>, o compilador (<code>tsc</code>) verifica os tipos e gera JavaScript comum, que roda em qualquer lugar. Os tipos existem só durante o desenvolvimento: eles pegam erros <b>antes</b> do código rodar e melhoram muito o autocompletar do editor.</p>
<p>Você indica tipos com dois-pontos: <code>let idade: number</code>, <code>function f(nome: string): boolean</code>. Para objetos, usa-se <code>interface</code> ou <code>type</code>. O <code>?</code> marca uma propriedade como opcional. Os <b>tipos união</b> (<code>"pendente" | "pago"</code>) restringem os valores possíveis, evitando erros de digitação.</p>
<p>Os <b>genéricos</b> (<code>&lt;T&gt;</code>) permitem criar funções e tipos que funcionam com qualquer tipo, mantendo a segurança: <code>primeiro&lt;T&gt;(lista: T[]): T | undefined</code> devolve um número se receber números, um texto se receber textos. Evite <code>any</code>, que desliga a verificação; quando não souber o tipo, prefira <code>unknown</code>.</p>`,
      partes: [
        [c`type Status = "pendente" | "pago" | "cancelado";`, "Tipo união: `Status` só pode ser um desses três textos."],
        [c`interface Pedido {`, "Descreve o formato de um pedido."],
        [c`id: number; cliente: string; valor: number;`, "Propriedades obrigatórias e seus tipos."],
        [c`status: Status;`, "Usa o tipo criado acima."],
        [c`cupom?: string;`, "O `?` torna a propriedade opcional."],
        [c`function totalPago(pedidos: Pedido[]): number {`, "Recebe um array de `Pedido` e devolve um número."],
        [c`function primeiro<T>(lista: T[]): T | undefined {`, "Genérico: funciona com array de qualquer tipo `T` e devolve um item desse tipo (ou `undefined`)."],
        [c`// totalPago([{ id: 1, valor: "50" }]); // ❌`, "O TypeScript acusa o erro no editor: faltam campos e `valor` não é número."]
      ]
    },
    a2: {
      detalhes: `<p>O <b>Node.js</b> é um ambiente que executa JavaScript fora do navegador, no servidor ou no seu computador. Com ele, a mesma linguagem serve para o front-end e o back-end. O <b>npm</b> é o gerenciador de pacotes: <code>npm init -y</code> cria o projeto (arquivo <code>package.json</code>) e <code>npm install express</code> baixa a biblioteca para a pasta <code>node_modules</code>.</p>
<p>O <b>Express</b> é o framework web mais conhecido do Node. Você cria a aplicação, registra <b>rotas</b> (método + caminho + função) e manda o servidor ouvir uma porta. Cada função de rota recebe <code>req</code> (a requisição: parâmetros, corpo, cabeçalhos) e <code>res</code> (a resposta: <code>res.json()</code>, <code>res.status()</code>).</p>
<p><b>Middlewares</b> são funções que rodam antes das rotas, para tarefas comuns: <code>express.json()</code> converte o corpo JSON em objeto, outros fazem log, autenticação e CORS. Configurações secretas (senhas, chaves) ficam em <b>variáveis de ambiente</b> (<code>process.env</code>), nunca escritas no código.</p>`,
      partes: [
        [c`const express = require("express");`, "Importa o Express (no Node, também é possível usar `import`)."],
        [c`const app = express();`, "Cria a aplicação."],
        [c`app.use(express.json());`, "Middleware que lê o corpo das requisições em JSON e coloca em `req.body`."],
        [c`app.get("/tarefas", (req, res) => res.json(tarefas));`, "Rota GET: responde com a lista em formato JSON."],
        [c`app.post("/tarefas", (req, res) => {`, "Rota POST: cria uma tarefa."],
        [c`const { titulo } = req.body;`, "Pega o título enviado no corpo da requisição."],
        [c`if (!titulo) return res.status(400).json({ erro: "…" });`, "Valida: sem título, responde 400 (requisição inválida)."],
        [c`res.status(201).json(nova);`, "Responde 201 (criado) com a tarefa nova."],
        [c`app.listen(3000, () => console.log("API em http://localhost:3000"));`, "Liga o servidor na porta 3000."]
      ]
    },
    a3: {
      detalhes: `<p>Uma <b>closure</b> acontece quando uma função “lembra” as variáveis do lugar onde foi criada, mesmo depois que esse lugar terminou de executar. No exemplo, <code>criarContador</code> termina, mas a função devolvida continua enxergando a variável <code>n</code>, que fica privada: ninguém de fora consegue alterá-la diretamente. Closures são a base de hooks do React, debounce, fábricas de funções e módulos.</p>
<p>O <b>escopo</b> define onde uma variável existe. <code>let</code> e <code>const</code> têm escopo de bloco (vivem entre as chaves onde foram criadas). Uma função enxerga as variáveis dos blocos de fora, mas não o contrário.</p>
<p>O <b>event loop</b> explica a ordem de execução: o JavaScript executa uma coisa por vez. Primeiro roda todo o código síncrono; depois, esvazia a fila de <b>microtarefas</b> (callbacks de Promises); só então pega a próxima <b>macrotarefa</b> (como <code>setTimeout</code>, eventos de clique). Por isso uma Promise resolvida imprime antes de um <code>setTimeout</code> de 0ms, e um laço pesado trava a página inteira.</p>`,
      partes: [
        [c`function criarContador() { let n = 0;`, "Cria a variável `n`, que só existe dentro desta função."],
        [c`return () => ++n;`, "Devolve uma função que incrementa e retorna `n`. Ela “carrega” o `n` consigo (closure)."],
        [c`const contar = criarContador();`, "`contar` é a função devolvida, com seu próprio `n` começando em 0."],
        [c`console.log(contar()); // 3`, "Na terceira chamada, `n` vale 3: o valor foi mantido entre as chamadas."],
        [c`console.log("1");`, "Código síncrono: executa imediatamente."],
        [c`setTimeout(() => console.log("2 - timeout"), 0);`, "Macrotarefa: vai para a fila e só roda depois de tudo."],
        [c`Promise.resolve().then(() => console.log("3 - promise"));`, "Microtarefa: roda logo após o código síncrono, antes dos timers."],
        [c`console.log("4");`, "Síncrono. Ordem final: 1, 4, 3, 2."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual palavra cria uma variável que NÃO pode ser reatribuída?", ["`let`", "`var`", "`const`", "`fixed`"], 2, "`const` deve ser a escolha padrão; use `let` quando o valor precisar mudar."),
      m("Qual o resultado de `\"5\" + 1` em JavaScript?", ["6", "\"51\"", "Erro", "NaN"], 1, "Com um texto envolvido, o `+` junta (concatena) os valores."),
      m("Qual comparação verifica valor E tipo?", ["`==`", "`=`", "`===`", "`!=`"], 2, "`5 === \"5\"` é `false`; `5 == \"5\"` é `true` porque converte os tipos."),
      l("Complete para mostrar uma mensagem no console:", c`console.____("Olá");`, "log", "`console.log` é a ferramenta básica de depuração."),
      m("O que a arrow function `const dobro = (n) => n * 2;` devolve para `dobro(4)`?", ["4", "8", "undefined", "Erro"], 1, "Com uma única expressão, o `return` é implícito."),
      m("Qual o valor de `null ?? \"padrão\"`?", ["`null`", "`\"padrão\"`", "`undefined`", "Erro"], 1, "`??` usa o valor da direita quando o da esquerda é `null` ou `undefined`."),
      m("O que `cliente?.endereco?.cidade` faz se `endereco` não existir?", ["Dá erro", "Devolve `undefined`", "Devolve `\"\"`", "Cria o endereço"], 1, "O optional chaining evita o erro “Cannot read properties of undefined”."),
      m("Qual método cria um NOVO array só com os itens que passam em um teste?", ["`map`", "`filter`", "`find`", "`forEach`"], 1, "`find` devolve só o primeiro item; `map` transforma todos."),
      l("Complete para somar os valores do array:", c`const total = valores.____((soma, v) => soma + v, 0);`, "reduce", "`reduce` acumula os itens em um único valor; o `0` é o valor inicial."),
      vf("`[10, 1, 5].sort()` ordena os números corretamente como 1, 5, 10.", false, "Sem função de comparação, `sort` compara como texto e resulta em `[1, 10, 5]`. Use `sort((a, b) => a - b)`.")
    ],
    intermediario: [
      m("Qual método encontra o primeiro elemento da página que combina com um seletor CSS?", ["`document.find()`", "`document.querySelector()`", "`document.getAll()`", "`document.select()`"], 1, "`querySelectorAll` encontra todos."),
      l("Complete para executar uma função quando o botão for clicado:", c`botao.____("click", () => console.log("clicou"));`, "addEventListener", "`addEventListener(evento, função)` registra um ouvinte de evento."),
      m("Por que preferir `textContent` a `innerHTML` para mostrar texto digitado pelo usuário?", ["É mais bonito", "Evita que HTML/scripts maliciosos sejam interpretados (XSS)", "Funciona só no Chrome", "É obrigatório"], 1, "`textContent` trata tudo como texto puro."),
      m("O que faz `elemento.classList.toggle(\"ativo\")`?", ["Remove o elemento", "Adiciona a classe se não tiver e remove se tiver", "Muda o id", "Esconde a classe"], 1, "Ótimo para abrir/fechar menus e marcar itens."),
      m("Qual sintaxe cria uma cópia de `usuario` trocando só o e-mail?", ["`usuario.email = \"x\"`", "`{ ...usuario, email: \"x\" }`", "`copy(usuario, email)`", "`[...usuario]`"], 1, "O spread copia as propriedades e a última definição de `email` prevalece."),
      l("Complete para transformar um texto JSON em objeto:", c`const obj = JSON.____(texto);`, "parse", "O caminho inverso é `JSON.stringify(obj)`."),
      m("O que `const { nome } = usuario;` faz?", ["Apaga `nome`", "Cria a variável `nome` com o valor de `usuario.nome`", "Cria um objeto novo", "Dá erro"], 1, "É a desestruturação de objetos."),
      m("O `fetch` rejeita a Promise quando a API responde 404?", ["Sim", "Não, é preciso checar `resp.ok`", "Só no Firefox", "Só com POST"], 1, "O `fetch` só rejeita em falha de rede."),
      l("Complete para esperar o resultado de uma Promise dentro de uma função `async`:", c`const resp = ____ fetch(url);`, "await", "`await` pausa a função até a Promise terminar, sem travar a página."),
      m("Para que serve `Promise.all([p1, p2])`?", ["Executa uma depois da outra", "Executa em paralelo e espera todas terminarem", "Cancela as Promises", "Executa só a mais rápida"], 1, "`Promise.race` é a que pega a mais rápida.")
    ],
    avancado: [
      m("O que o TypeScript adiciona ao JavaScript?", ["Mais velocidade na execução", "Tipos verificados antes de rodar o código", "Um banco de dados", "Suporte a CSS"], 1, "O TS é compilado para JS comum; os tipos ajudam a achar erros no editor."),
      l("Complete para que `status` aceite só esses textos:", c`type Status = "pendente" ____ "pago";`, "|", "O `|` cria um tipo união: um ou outro."),
      m("Em uma interface, o que significa `cupom?: string`?", ["Cupom é obrigatório", "Cupom é opcional", "Cupom é um número", "Cupom é privado"], 1, "Propriedades com `?` podem não existir no objeto."),
      m("Qual a diferença entre `any` e `unknown`?", ["São iguais", "`unknown` obriga a verificar o tipo antes de usar; `any` desliga a checagem", "`any` é mais seguro", "`unknown` só vale para números"], 1, "Prefira `unknown` quando não souber o tipo."),
      m("O que é o Node.js?", ["Um framework de CSS", "Um ambiente para executar JavaScript fora do navegador", "Um banco de dados", "Uma versão do Java"], 1, "Permite criar servidores, scripts e ferramentas com JavaScript."),
      m("No Express, para que serve `app.use(express.json())`?", ["Criar rotas", "Converter o corpo JSON das requisições em `req.body`", "Ligar o servidor", "Gerar documentação"], 1, "É um middleware executado antes das rotas."),
      l("Complete para responder com status 404:", c`res.____(404).json({ erro: "Não encontrado" });`, "status", "`res.status(código)` define o código HTTP da resposta."),
      m("O que é uma closure?", ["Um erro de sintaxe", "Uma função que lembra as variáveis do escopo onde foi criada", "Um tipo de loop", "O fechamento do servidor"], 1, "É o que permite variáveis privadas e funções com memória."),
      m("Em que ordem aparecem os logs? `console.log(\"A\"); setTimeout(() => console.log(\"B\"), 0); Promise.resolve().then(() => console.log(\"C\"));`", ["A, B, C", "A, C, B", "C, A, B", "B, C, A"], 1, "Síncrono primeiro (A), depois microtarefas (C) e por último macrotarefas (B)."),
      vf("Senhas e chaves de API devem ser guardadas em variáveis de ambiente, e não escritas no código.", true, "No Node, elas são lidas com `process.env.NOME`.")
    ]
  }
};
