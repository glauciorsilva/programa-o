// Exercícios de código da trilha javascript (completar e criar do zero), por tópico.
const c = String.raw;

export default {
  /* ============ b1: Variáveis (let, const) e tipos ============ */
  b1: [
    {
      tipo: "completar",
      titulo: "Cadastro do produto",
      enunciado: `Na loja de cafés, cada produto é guardado em variáveis. Complete o código:
        <ul>
          <li><code>nome</code> é uma <b>constante</b> com o texto <code>"Café especial"</code>;</li>
          <li><code>estoque</code> pode mudar, então use <b>let</b> e comece com o número <code>20</code>;</li>
          <li><code>ativo</code> é uma constante com o valor booleano <b>verdadeiro</b>.</li>
        </ul>
        Depois de uma venda de 3 unidades, o código já atualiza o estoque. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Texto vai entre aspas; número e booleano (<code>true</code>/<code>false</code>) não. Quem muda de valor usa <code>let</code>.`,
      lang: "js",
      inicial: c`const nome = ____;
____ estoque = 20;
const ativo = ____;

estoque = estoque - 3;
console.log(nome + " | estoque: " + estoque + " | ativo: " + ativo);
`,
      solucao: c`const nome = "Café especial";
let estoque = 20;
const ativo = true;

estoque = estoque - 3;
console.log(nome + " | estoque: " + estoque + " | ativo: " + ativo);`,
      teste: c`
__assert(nome === "Café especial", 'nome deveria ser "Café especial", mas é ' + JSON.stringify(nome));
__assert(typeof estoque === "number" && estoque === 17, "estoque deveria terminar em 17 (20 - 3), mas é " + JSON.stringify(estoque));
__assert(ativo === true, "ativo deveria ser o booleano true (sem aspas), mas é " + JSON.stringify(ativo));
__assert(__saida.join("\n").indexOf("Café especial | estoque: 17 | ativo: true") >= 0, "Mantenha o console.log que mostra o produto.");`,
      padroes: [[/let\s+estoque\s*=/, "estoque muda de valor: declare com let."]]
    },
    {
      tipo: "completar",
      titulo: "O campo do formulário veio como texto",
      enunciado: `Um formulário devolveu o código <code>"0"</code> como <b>texto</b>. Complete o código:
        <ul>
          <li><code>tipo</code> deve guardar o tipo de <code>codigoDigitado</code> (use o operador que mostra o tipo);</li>
          <li><code>ehZero</code> compara <code>codigoDigitado</code> com o número <code>0</code> usando a comparação <b>estrita</b> (valor e tipo) — o resultado deve ser <code>false</code>;</li>
          <li><code>ehZeroDeVerdade</code> compara o <code>numero</code> (já convertido) com <code>0</code>, também de forma estrita — deve dar <code>true</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>typeof</code> devolve o tipo como texto. A comparação estrita tem três sinais de igual.`,
      lang: "js",
      inicial: c`const codigoDigitado = "0";

const tipo = ____ codigoDigitado;
const ehZero = codigoDigitado ____ 0;

const numero = Number(codigoDigitado);
const ehZeroDeVerdade = numero ____ 0;

console.log(tipo, ehZero, ehZeroDeVerdade);
`,
      solucao: c`const codigoDigitado = "0";

const tipo = typeof codigoDigitado;
const ehZero = codigoDigitado === 0;

const numero = Number(codigoDigitado);
const ehZeroDeVerdade = numero === 0;

console.log(tipo, ehZero, ehZeroDeVerdade);`,
      teste: c`
__assert(tipo === "string", 'tipo deveria ser "string", mas é ' + JSON.stringify(tipo));
__assert(ehZero === false, "ehZero deveria ser false: com === o texto \"0\" não é igual ao número 0. Você usou == ?");
__assert(ehZeroDeVerdade === true, "ehZeroDeVerdade deveria ser true, mas é " + JSON.stringify(ehZeroDeVerdade));`,
      padroes: [[/numero\s*===\s*0/, "Use a comparação estrita === também em ehZeroDeVerdade."]]
    },
    {
      tipo: "completar",
      titulo: "Mensagem de pontos do cliente",
      enunciado: `O programa de fidelidade soma <b>30 pontos</b> a cada compra. Complete o código para que a mensagem fique exatamente:<br>
        <code>Olá, Carla! Você tem 150 pontos.</code><br>
        Substitua cada <code>____</code>.`,
      dica: `O mesmo sinal <code>+</code> soma números e junta (concatena) textos.`,
      lang: "js",
      inicial: c`const nome = "Carla";
let pontos = 120;

pontos = pontos ____ 30;
const mensagem = "Olá, " ____ nome + "! Você tem " + ____ + " pontos.";

console.log(mensagem);
`,
      solucao: c`const nome = "Carla";
let pontos = 120;

pontos = pontos + 30;
const mensagem = "Olá, " + nome + "! Você tem " + pontos + " pontos.";

console.log(mensagem);`,
      teste: c`
__assert(pontos === 150, "pontos deveria ser 150 (120 + 30), mas é " + JSON.stringify(pontos));
__assert(mensagem === "Olá, Carla! Você tem 150 pontos.", 'mensagem deveria ser "Olá, Carla! Você tem 150 pontos.", mas é ' + JSON.stringify(mensagem));
__assert(__saida.indexOf("Olá, Carla! Você tem 150 pontos.") >= 0, "Mostre a mensagem com console.log.");`
    },
    {
      tipo: "criar",
      titulo: "Ficha do paciente",
      enunciado: `Na recepção da clínica, crie as variáveis da ficha de um paciente:
        <ul>
          <li><code>paciente</code>: constante com o texto <code>"Rui Lima"</code>;</li>
          <li><code>idade</code>: <code>let</code> com o número <code>45</code>;</li>
          <li><code>convenio</code>: constante <b>vazia de propósito</b> (o paciente não tem convênio) — use <code>null</code>;</li>
          <li><code>telefone</code>: <code>let</code> declarada <b>sem valor</b> (fica <code>undefined</code>).</li>
        </ul>
        Depois, mostre no console exatamente: <code>Paciente: Rui Lima, 45 anos</code> (use as variáveis).`,
      dica: `Para declarar sem valor, escreva só <code>let telefone;</code>. Junte textos e variáveis com <code>+</code>.`,
      lang: "js",
      inicial: c`// Crie as variáveis paciente, idade, convenio e telefone
// e mostre a ficha com console.log
`,
      solucao: c`const paciente = "Rui Lima";
let idade = 45;
const convenio = null;
let telefone;

console.log("Paciente: " + paciente + ", " + idade + " anos");`,
      teste: c`
__assert(paciente === "Rui Lima", 'paciente deveria ser "Rui Lima".');
__assert(typeof idade === "number" && idade === 45, "idade deveria ser o número 45 (sem aspas).");
__assert(convenio === null, "convenio deveria ser null (vazio de propósito), mas é " + JSON.stringify(convenio));
__assert(telefone === undefined, "telefone deveria ficar undefined (declarada sem valor).");
__assert(__saida.indexOf("Paciente: Rui Lima, 45 anos") >= 0, 'O console deveria mostrar exatamente "Paciente: Rui Lima, 45 anos".');`,
      padroes: [
        [/const\s+paciente\s*=/, "Declare paciente com const."],
        [/let\s+idade\s*=/, "Declare idade com let."],
        [/let\s+telefone\s*;/, "Declare telefone com let e sem valor: let telefone;"]
      ]
    },
    {
      tipo: "criar",
      titulo: "Troco da padaria",
      enunciado: `Na padaria, cada pão francês custa <code>0.75</code>. O cliente levou <code>8</code> pães e pagou com <code>10</code> reais.
        <ul>
          <li>Crie as constantes <code>precoPao</code>, <code>quantidade</code> e <code>pago</code> com esses valores;</li>
          <li>Calcule <code>total</code> (preço × quantidade) e <code>troco</code> (pago − total);</li>
          <li>Mostre duas linhas no console, exatamente: <code>Total: R$ 6.00</code> e <code>Troco: R$ 4.00</code>.</li>
        </ul>`,
      dica: `Multiplicação é <code>*</code>. Para mostrar sempre duas casas decimais, use <code>total.toFixed(2)</code>.`,
      lang: "js",
      inicial: c`// Crie precoPao, quantidade e pago
// Calcule total e troco
// Mostre "Total: R$ 6.00" e "Troco: R$ 4.00"
`,
      solucao: c`const precoPao = 0.75;
const quantidade = 8;
const pago = 10;

const total = precoPao * quantidade;
const troco = pago - total;

console.log("Total: R$ " + total.toFixed(2));
console.log("Troco: R$ " + troco.toFixed(2));`,
      teste: c`
__assert(precoPao === 0.75 && quantidade === 8 && pago === 10, "Confira os valores: precoPao 0.75, quantidade 8, pago 10.");
__assert(total === 6, "total deveria ser 6, mas é " + JSON.stringify(total));
__assert(troco === 4, "troco deveria ser 4, mas é " + JSON.stringify(troco));
__assert(__saida.indexOf("Total: R$ 6.00") >= 0, 'Falta a linha "Total: R$ 6.00" (use toFixed(2)).');
__assert(__saida.indexOf("Troco: R$ 4.00") >= 0, 'Falta a linha "Troco: R$ 4.00".');`
    }
  ],

  /* ============ b2: Funções e condicionais ============ */
  b2: [
    {
      tipo: "completar",
      titulo: "Frete da loja virtual",
      enunciado: `Regras do frete da loja:
        <ul>
          <li>compras a partir de <b>R$ 200</b> (200 ou mais) têm frete grátis (0);</li>
          <li>senão, para o estado <code>"SP"</code> o frete é 15;</li>
          <li>para os outros estados, 25.</li>
        </ul>
        Substitua cada <code>____</code> para a função <code>calcularFrete</code> seguir as regras.`,
      dica: `"A partir de 200" inclui o 200: use <code>&gt;=</code>. Para comparar textos, use <code>===</code>.`,
      lang: "js",
      inicial: c`function calcularFrete(valorCompra, uf) {
  if (valorCompra ____ 200) return 0;
  if (uf ____ "SP") return 15;
  ____ 25;
}

console.log(calcularFrete(150, "SP"), calcularFrete(250, "RJ"), calcularFrete(80, "BA"));
`,
      solucao: c`function calcularFrete(valorCompra, uf) {
  if (valorCompra >= 200) return 0;
  if (uf === "SP") return 15;
  return 25;
}

console.log(calcularFrete(150, "SP"), calcularFrete(250, "RJ"), calcularFrete(80, "BA"));`,
      teste: c`
__assert(calcularFrete(200, "RJ") === 0, "Compra de exatamente 200 deveria ter frete 0, mas deu " + calcularFrete(200, "RJ"));
__assert(calcularFrete(250, "SP") === 0, "Compra de 250 deveria ter frete 0.");
__assert(calcularFrete(150, "SP") === 15, "Compra de 150 para SP deveria ter frete 15, mas deu " + calcularFrete(150, "SP"));
__assert(calcularFrete(80, "BA") === 25, "Compra de 80 para BA deveria ter frete 25, mas deu " + calcularFrete(80, "BA"));`
    },
    {
      tipo: "completar",
      titulo: "Arrow functions e ternário",
      enunciado: `Complete as funções curtas (arrow functions) do caixa:
        <ul>
          <li><code>aplicarDesconto(preco, porcentagem)</code> devolve o preço com o desconto (ex.: 200 com 10% → 180);</li>
          <li><code>ehMaiorDeIdade(idade)</code> devolve <code>true</code> para 18 anos ou mais;</li>
          <li><code>status</code> usa o <b>ternário</b> para ser <code>"adulto"</code> ou <code>"menor"</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Uma arrow function tem a seta <code>=&gt;</code>. O ternário é <code>condicao ? valorSeSim : valorSeNao</code>.`,
      lang: "js",
      inicial: c`const aplicarDesconto = (preco, porcentagem) ____ preco - (preco * porcentagem) / 100;
const ehMaiorDeIdade = (idade) => idade ____ 18;

const status = ehMaiorDeIdade(17) ____ "adulto" : "menor";

console.log(aplicarDesconto(200, 10), ehMaiorDeIdade(20), status);
`,
      solucao: c`const aplicarDesconto = (preco, porcentagem) => preco - (preco * porcentagem) / 100;
const ehMaiorDeIdade = (idade) => idade >= 18;

const status = ehMaiorDeIdade(17) ? "adulto" : "menor";

console.log(aplicarDesconto(200, 10), ehMaiorDeIdade(20), status);`,
      teste: c`
__assert(aplicarDesconto(200, 10) === 180, "aplicarDesconto(200, 10) deveria ser 180, mas é " + aplicarDesconto(200, 10));
__assert(aplicarDesconto(50, 20) === 40, "aplicarDesconto(50, 20) deveria ser 40.");
__assert(ehMaiorDeIdade(18) === true, "ehMaiorDeIdade(18) deveria ser true (18 já é maior de idade).");
__assert(ehMaiorDeIdade(17) === false, "ehMaiorDeIdade(17) deveria ser false.");
__assert(status === "menor", 'status deveria ser "menor", mas é ' + JSON.stringify(status));`
    },
    {
      tipo: "completar",
      titulo: "Valor padrão, ?? e ?.",
      enunciado: `O cadastro do cliente veio incompleto (sem apelido e sem endereço). Complete o código para não dar erro:
        <ul>
          <li><code>saudar()</code> sem argumento deve usar o <b>valor padrão</b> <code>"visitante"</code>;</li>
          <li><code>apelido</code> usa o operador <code>??</code> para virar <code>"Sem apelido"</code> quando for <code>null</code>;</li>
          <li><code>cidade</code> usa o encadeamento opcional <code>?.</code> para ler a cidade sem quebrar (deve ficar <code>undefined</code>).</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Valor padrão de parâmetro: <code>function f(x = "algo")</code>. Encadeamento opcional: <code>obj?.prop</code>.`,
      lang: "js",
      inicial: c`const cliente = { nome: "Léo", apelido: null };

function saudar(nome ____ "visitante") {
  return "Olá, " + nome + "!";
}

const apelido = cliente.apelido ____ "Sem apelido";
const cidade = cliente.endereco____cidade;

console.log(saudar(), saudar(cliente.nome), apelido, cidade);
`,
      solucao: c`const cliente = { nome: "Léo", apelido: null };

function saudar(nome = "visitante") {
  return "Olá, " + nome + "!";
}

const apelido = cliente.apelido ?? "Sem apelido";
const cidade = cliente.endereco?.cidade;

console.log(saudar(), saudar(cliente.nome), apelido, cidade);`,
      teste: c`
__assert(saudar() === "Olá, visitante!", 'saudar() deveria devolver "Olá, visitante!", mas devolveu ' + JSON.stringify(saudar()));
__assert(saudar("Ana") === "Olá, Ana!", 'saudar("Ana") deveria devolver "Olá, Ana!".');
__assert(apelido === "Sem apelido", 'apelido deveria ser "Sem apelido".');
__assert(cidade === undefined, "cidade deveria ser undefined.");`,
      padroes: [
        [/\?\?/, "Use o operador ?? no apelido."],
        [/endereco\?\.cidade/, "Use ?. para ler cliente.endereco?.cidade."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Situação do aluno",
      enunciado: `A escola precisa classificar as notas (de 0 a 10). Crie a função <code>situacao(nota)</code> que devolve:
        <ul>
          <li><code>"nota inválida"</code> se a nota for menor que 0 ou maior que 10;</li>
          <li><code>"aprovado"</code> se a nota for 7 ou mais;</li>
          <li><code>"recuperação"</code> se for 5 ou mais (e menor que 7);</li>
          <li><code>"reprovado"</code> nos outros casos.</li>
        </ul>`,
      dica: `Teste primeiro o caso inválido, depois do maior para o menor: <code>if (nota &gt;= 7) return ...</code>. O operador "ou" é <code>||</code>.`,
      lang: "js",
      inicial: c`// Crie a função situacao(nota)

// console.log(situacao(8), situacao(6), situacao(3), situacao(11));
`,
      solucao: c`function situacao(nota) {
  if (nota < 0 || nota > 10) return "nota inválida";
  if (nota >= 7) return "aprovado";
  if (nota >= 5) return "recuperação";
  return "reprovado";
}

console.log(situacao(8), situacao(6), situacao(3), situacao(11));`,
      teste: c`
__assert(typeof situacao === "function", "Crie a função situacao(nota).");
var casos = [[7, "aprovado"], [10, "aprovado"], [6.9, "recuperação"], [5, "recuperação"], [4.9, "reprovado"], [0, "reprovado"], [-1, "nota inválida"], [10.5, "nota inválida"]];
casos.forEach(function (cs) {
  var r = situacao(cs[0]);
  __assert(r === cs[1], "situacao(" + cs[0] + ") deveria ser " + JSON.stringify(cs[1]) + ", mas foi " + JSON.stringify(r));
});`
    },
    {
      tipo: "criar",
      titulo: "Tarifa do estacionamento",
      enunciado: `Crie a função <code>calcularTarifa(horas, mensalista = false)</code> do estacionamento:
        <ul>
          <li>se <code>mensalista</code> for <code>true</code>, a tarifa é <code>0</code>;</li>
          <li>até 1 hora (inclusive), a tarifa é <code>10</code>;</li>
          <li>acima de 1 hora: <code>10</code> mais <code>5</code> por hora extra (ex.: 3 horas → 10 + 2 × 5 = 20);</li>
          <li>a tarifa máxima do dia é <code>40</code> (nunca passa disso).</li>
        </ul>`,
      dica: `Calcule o valor e, no fim, limite com <code>Math.min(valor, 40)</code>. O parâmetro <code>mensalista</code> tem valor padrão.`,
      lang: "js",
      inicial: c`// Crie a função calcularTarifa(horas, mensalista = false)

// console.log(calcularTarifa(1), calcularTarifa(3), calcularTarifa(12), calcularTarifa(2, true));
`,
      solucao: c`function calcularTarifa(horas, mensalista = false) {
  if (mensalista) return 0;
  if (horas <= 1) return 10;
  const valor = 10 + (horas - 1) * 5;
  return Math.min(valor, 40);
}

console.log(calcularTarifa(1), calcularTarifa(3), calcularTarifa(12), calcularTarifa(2, true));`,
      teste: c`
__assert(typeof calcularTarifa === "function", "Crie a função calcularTarifa.");
__assert(calcularTarifa(0.5) === 10, "Meia hora deveria custar 10, mas deu " + calcularTarifa(0.5));
__assert(calcularTarifa(1) === 10, "1 hora deveria custar 10, mas deu " + calcularTarifa(1));
__assert(calcularTarifa(3) === 20, "3 horas deveriam custar 20, mas deu " + calcularTarifa(3));
__assert(calcularTarifa(7) === 40, "7 horas deveriam custar 40, mas deu " + calcularTarifa(7));
__assert(calcularTarifa(12) === 40, "12 horas deveriam ficar no máximo de 40, mas deu " + calcularTarifa(12));
__assert(calcularTarifa(5, true) === 0, "Mensalista deveria pagar 0.");
__assert(calcularTarifa(2, false) === 15, "2 horas (não mensalista) deveriam custar 15.");`
    }
  ],

  /* ============ b3: Arrays: map, filter, reduce ============ */
  b3: [
    {
      tipo: "completar",
      titulo: "Pedidos pagos e total recebido",
      enunciado: `O painel da loja precisa mostrar só os pedidos <b>pagos</b> e a soma dos valores deles.
        <ul>
          <li><code>pagos</code>: use o método que <b>filtra</b> a lista;</li>
          <li><code>total</code>: use o método que <b>junta tudo em um valor</b>, começando do zero.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>filter</code> separa, <code>reduce</code> junta. O último argumento do <code>reduce</code> é o valor inicial.`,
      lang: "js",
      inicial: c`const pedidos = [
  { id: 1, cliente: "Ana", valor: 120, pago: true },
  { id: 2, cliente: "Bia", valor: 80, pago: false },
  { id: 3, cliente: "Caio", valor: 300, pago: true },
  { id: 4, cliente: "Duda", valor: 45, pago: false },
];

const pagos = pedidos.____((p) => p.pago);
const total = pagos.____((soma, p) => soma + p.valor, ____);

console.log(pagos.length, total);
`,
      solucao: c`const pedidos = [
  { id: 1, cliente: "Ana", valor: 120, pago: true },
  { id: 2, cliente: "Bia", valor: 80, pago: false },
  { id: 3, cliente: "Caio", valor: 300, pago: true },
  { id: 4, cliente: "Duda", valor: 45, pago: false },
];

const pagos = pedidos.filter((p) => p.pago);
const total = pagos.reduce((soma, p) => soma + p.valor, 0);

console.log(pagos.length, total);`,
      teste: c`
__assert(Array.isArray(pagos) && pagos.length === 2, "pagos deveria ter 2 pedidos, mas tem " + (pagos && pagos.length));
__assert(pagos.every(function (p) { return p.pago; }), "pagos deveria ter só pedidos com pago: true.");
__assert(total === 420, "total deveria ser 420 (120 + 300), mas é " + JSON.stringify(total));`
    },
    {
      tipo: "completar",
      titulo: "Nomes, busca e pendências",
      enunciado: `Ainda com a lista de pedidos, complete:
        <ul>
          <li><code>nomes</code>: um array só com o nome de cada cliente (<b>transforma</b> cada item);</li>
          <li><code>doCaio</code>: o <b>primeiro</b> pedido cujo cliente é <code>"Caio"</code> (o objeto, não um array);</li>
          <li><code>temPendente</code>: <code>true</code> se <b>algum</b> pedido não estiver pago.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>map</code> transforma, <code>find</code> acha o primeiro, <code>some</code> responde "algum?".`,
      lang: "js",
      inicial: c`const pedidos = [
  { id: 1, cliente: "Ana", valor: 120, pago: true },
  { id: 2, cliente: "Bia", valor: 80, pago: false },
  { id: 3, cliente: "Caio", valor: 300, pago: true },
];

const nomes = pedidos.____((p) => p.cliente);
const doCaio = pedidos.____((p) => p.cliente === "Caio");
const temPendente = pedidos.____((p) => !p.pago);

console.log(nomes, doCaio.id, temPendente);
`,
      solucao: c`const pedidos = [
  { id: 1, cliente: "Ana", valor: 120, pago: true },
  { id: 2, cliente: "Bia", valor: 80, pago: false },
  { id: 3, cliente: "Caio", valor: 300, pago: true },
];

const nomes = pedidos.map((p) => p.cliente);
const doCaio = pedidos.find((p) => p.cliente === "Caio");
const temPendente = pedidos.some((p) => !p.pago);

console.log(nomes, doCaio.id, temPendente);`,
      teste: c`
__assert(JSON.stringify(nomes) === '["Ana","Bia","Caio"]', 'nomes deveria ser ["Ana","Bia","Caio"], mas é ' + JSON.stringify(nomes));
__assert(doCaio && !Array.isArray(doCaio) && doCaio.id === 3, "doCaio deveria ser o objeto do pedido 3 (não um array).");
__assert(temPendente === true, "temPendente deveria ser true (o pedido da Bia não foi pago).");`
    },
    {
      tipo: "completar",
      titulo: "Ranking de vendedores",
      enunciado: `O gerente quer o <b>top 3</b> de vendedores, do que mais vendeu para o que menos vendeu, <b>sem bagunçar</b> a lista original.
        <ul>
          <li>Complete a comparação do <code>sort</code> para ordenar por <code>vendas</code> de forma <b>decrescente</b>;</li>
          <li>Pegue só os 3 primeiros e transforme em nomes.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `No <code>sort((a, b) =&gt; ...)</code>, <code>b.vendas - a.vendas</code> coloca o maior primeiro. Para pegar um pedaço do array, use <code>slice(inicio, fim)</code>.`,
      lang: "js",
      inicial: c`const vendedores = [
  { nome: "Rita", vendas: 18 },
  { nome: "Paulo", vendas: 42 },
  { nome: "Júlia", vendas: 7 },
  { nome: "Marcos", vendas: 33 },
  { nome: "Tais", vendas: 25 },
];

const ordenados = [...vendedores].sort((a, b) => ____);
const top3 = ordenados.____(0, 3).____((v) => v.nome);

console.log(top3);
`,
      solucao: c`const vendedores = [
  { nome: "Rita", vendas: 18 },
  { nome: "Paulo", vendas: 42 },
  { nome: "Júlia", vendas: 7 },
  { nome: "Marcos", vendas: 33 },
  { nome: "Tais", vendas: 25 },
];

const ordenados = [...vendedores].sort((a, b) => b.vendas - a.vendas);
const top3 = ordenados.slice(0, 3).map((v) => v.nome);

console.log(top3);`,
      teste: c`
__assert(JSON.stringify(top3) === '["Paulo","Marcos","Tais"]', 'top3 deveria ser ["Paulo","Marcos","Tais"], mas é ' + JSON.stringify(top3));
__assert(ordenados[4].nome === "Júlia", "ordenados deveria terminar com Júlia (quem menos vendeu).");
__assert(vendedores[0].nome === "Rita", "A lista original vendedores não deveria mudar de ordem.");`
    },
    {
      tipo: "criar",
      titulo: "Estoque baixo do mercadinho",
      enunciado: `Com a lista <code>produtos</code> já pronta, crie:
        <ul>
          <li><code>emFalta</code>: array com os <b>nomes</b> dos produtos com <code>estoque</code> menor que 5;</li>
          <li><code>valorEstoque</code>: a soma de <code>preco * estoque</code> de todos os produtos.</li>
        </ul>
        Use <code>filter</code>, <code>map</code> e <code>reduce</code>.`,
      dica: `Dá para encadear: <code>produtos.filter(...).map(...)</code>. No <code>reduce</code>, comece a soma em 0.`,
      lang: "js",
      inicial: c`const produtos = [
  { nome: "Arroz 5kg", preco: 28, estoque: 12 },
  { nome: "Feijão 1kg", preco: 9, estoque: 3 },
  { nome: "Café 500g", preco: 18, estoque: 0 },
  { nome: "Açúcar 1kg", preco: 5, estoque: 20 },
  { nome: "Óleo 900ml", preco: 8, estoque: 4 },
];

// Crie emFalta (nomes com estoque < 5)
// Crie valorEstoque (soma de preco * estoque)
`,
      solucao: c`const produtos = [
  { nome: "Arroz 5kg", preco: 28, estoque: 12 },
  { nome: "Feijão 1kg", preco: 9, estoque: 3 },
  { nome: "Café 500g", preco: 18, estoque: 0 },
  { nome: "Açúcar 1kg", preco: 5, estoque: 20 },
  { nome: "Óleo 900ml", preco: 8, estoque: 4 },
];

const emFalta = produtos.filter((p) => p.estoque < 5).map((p) => p.nome);
const valorEstoque = produtos.reduce((soma, p) => soma + p.preco * p.estoque, 0);

console.log(emFalta, valorEstoque);`,
      teste: c`
__assert(JSON.stringify(emFalta) === '["Feijão 1kg","Café 500g","Óleo 900ml"]', 'emFalta deveria ser ["Feijão 1kg","Café 500g","Óleo 900ml"], mas é ' + JSON.stringify(emFalta));
__assert(valorEstoque === 495, "valorEstoque deveria ser 495, mas é " + JSON.stringify(valorEstoque));`,
      padroes: [[/\.filter\s*\(/, "Use filter para achar os produtos em falta."], [/\.reduce\s*\(/, "Use reduce para somar o valor do estoque."]]
    },
    {
      tipo: "criar",
      titulo: "Notas da turma",
      enunciado: `Crie duas funções para o boletim da escola:
        <ul>
          <li><code>mediaDaTurma(notas)</code>: recebe um array de números e devolve a média; se o array estiver vazio, devolve <code>0</code>;</li>
          <li><code>aprovados(alunos)</code>: recebe objetos <code>{ nome, nota }</code> e devolve um array com os <b>nomes</b> de quem tirou 7 ou mais, em <b>ordem alfabética</b>.</li>
        </ul>`,
      dica: `Média = soma (<code>reduce</code>) ÷ quantidade (<code>length</code>). Para ordem alfabética, <code>sort()</code> sem argumentos já ordena textos.`,
      lang: "js",
      inicial: c`// Crie mediaDaTurma(notas) e aprovados(alunos)

// console.log(mediaDaTurma([8, 6, 10]));
// console.log(aprovados([{ nome: "Bruno", nota: 8 }, { nome: "Ana", nota: 9 }, { nome: "Caio", nota: 5 }]));
`,
      solucao: c`function mediaDaTurma(notas) {
  if (notas.length === 0) return 0;
  const soma = notas.reduce((total, n) => total + n, 0);
  return soma / notas.length;
}

function aprovados(alunos) {
  return alunos
    .filter((a) => a.nota >= 7)
    .map((a) => a.nome)
    .sort();
}

console.log(mediaDaTurma([8, 6, 10]));
console.log(aprovados([{ nome: "Bruno", nota: 8 }, { nome: "Ana", nota: 9 }, { nome: "Caio", nota: 5 }]));`,
      teste: c`
__assert(mediaDaTurma([8, 6, 10]) === 8, "mediaDaTurma([8, 6, 10]) deveria ser 8, mas é " + mediaDaTurma([8, 6, 10]));
__assert(mediaDaTurma([5, 6]) === 5.5, "mediaDaTurma([5, 6]) deveria ser 5.5.");
__assert(mediaDaTurma([]) === 0, "mediaDaTurma([]) deveria ser 0, mas é " + mediaDaTurma([]));
var r = aprovados([{ nome: "Bruno", nota: 8 }, { nome: "Ana", nota: 9 }, { nome: "Caio", nota: 5 }, { nome: "Davi", nota: 7 }]);
__assert(JSON.stringify(r) === '["Ana","Bruno","Davi"]', 'aprovados deveria devolver ["Ana","Bruno","Davi"], mas devolveu ' + JSON.stringify(r));
__assert(JSON.stringify(aprovados([{ nome: "Zé", nota: 2 }])) === "[]", "Sem aprovados, devolva um array vazio.");`
    }
  ],

  /* ============ i1: DOM e eventos (web) ============ */
  i1: [
    {
      tipo: "completar",
      titulo: "Botão de curtir",
      enunciado: `No blog da escola, cada clique no botão <b>Curtir</b> deve somar 1 e mostrar o total no <code>&lt;span id="total"&gt;</code>.
        Na aba <b>JS</b>, substitua cada <code>____</code>: selecione o botão pelo id, ouça o evento de <b>clique</b> e troque o <b>texto</b> do span.`,
      dica: `Seletores de id começam com <code>#</code>. O evento de clique se chama <code>"click"</code>. Para trocar o texto, use <code>textContent</code>.`,
      lang: "web",
      aba: "js",
      inicial: {
        html: c`<button id="curtir">Curtir</button>
<p>Curtidas: <span id="total">0</span></p>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
button { padding: 8px 16px; }`,
        js: c`const botao = document.querySelector("____");
let curtidas = 0;

botao.addEventListener("____", () => {
  curtidas++;
  document.querySelector("#total").____ = curtidas;
});
`
      },
      solucao: {
        html: c`<button id="curtir">Curtir</button>
<p>Curtidas: <span id="total">0</span></p>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
button { padding: 8px 16px; }`,
        js: c`const botao = document.querySelector("#curtir");
let curtidas = 0;

botao.addEventListener("click", () => {
  curtidas++;
  document.querySelector("#total").textContent = curtidas;
});`
      },
      teste: c`
var b = document.querySelector("#curtir");
var t = document.querySelector("#total");
__assert(b && t, "Não mexa no HTML: precisa do botão #curtir e do span #total.");
b.click(); b.click(); b.click();
__assert(t.textContent.trim() === "3", "Depois de 3 cliques, o total deveria mostrar 3, mas mostra " + JSON.stringify(t.textContent));`
    },
    {
      tipo: "completar",
      titulo: "Lista de tarefas",
      enunciado: `Complete a lista de tarefas. Ao clicar em <b>Adicionar</b>:
        <ul>
          <li>se o campo estiver vazio, não faça nada;</li>
          <li>senão, <b>crie</b> um <code>&lt;li&gt;</code>, coloque o texto nele (com <code>textContent</code>, para evitar XSS) e <b>adicione</b> na <code>&lt;ul id="lista"&gt;</code>;</li>
          <li>clicar no item alterna a classe <code>feito</code>;</li>
          <li>no fim, limpe o campo.</li>
        </ul>
        Substitua cada <code>____</code> na aba <b>JS</b>.`,
      dica: `<code>document.createElement("li")</code> cria; <code>lista.appendChild(li)</code> adiciona; <code>classList.toggle</code> liga/desliga uma classe.`,
      lang: "web",
      aba: "js",
      inicial: {
        html: c`<input id="tarefa" placeholder="Nova tarefa">
<button id="add">Adicionar</button>
<ul id="lista"></ul>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
.feito { text-decoration: line-through; color: #888; }`,
        js: c`const input = document.querySelector("#tarefa");
const lista = document.querySelector("#lista");

document.querySelector("#add").addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.____("li");
  li.____ = texto;
  li.addEventListener("click", () => li.classList.____("feito"));
  lista.____(li);

  input.value = "";
});
`
      },
      solucao: {
        html: c`<input id="tarefa" placeholder="Nova tarefa">
<button id="add">Adicionar</button>
<ul id="lista"></ul>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
.feito { text-decoration: line-through; color: #888; }`,
        js: c`const input = document.querySelector("#tarefa");
const lista = document.querySelector("#lista");

document.querySelector("#add").addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.textContent = texto;
  li.addEventListener("click", () => li.classList.toggle("feito"));
  lista.appendChild(li);

  input.value = "";
});`
      },
      teste: c`
var inp = document.querySelector("#tarefa");
var add = document.querySelector("#add");
var ul = document.querySelector("#lista");
__digitar(inp, "   ");
add.click();
__assert(ul.querySelectorAll("li").length === 0, "Com o campo vazio, nenhum item deveria ser criado.");
__digitar(inp, "Comprar pão");
add.click();
__digitar(inp, "<b>Pagar boleto</b>");
add.click();
var itens = ul.querySelectorAll("li");
__assert(itens.length === 2, "Depois de adicionar 2 tarefas, a lista deveria ter 2 itens, mas tem " + itens.length);
__assert(itens[0].textContent === "Comprar pão", 'O primeiro item deveria ter o texto "Comprar pão".');
__assert(itens[1].textContent === "<b>Pagar boleto</b>" && !itens[1].querySelector("b"), "Use textContent: o texto digitado não pode virar HTML.");
__assert(inp.value === "", "O campo deveria ser limpo depois de adicionar.");
itens[0].click();
__assert(itens[0].classList.contains("feito"), "Clicar no item deveria colocar a classe feito.");
itens[0].click();
__assert(!itens[0].classList.contains("feito"), "Clicar de novo deveria tirar a classe feito.");`
    },
    {
      tipo: "completar",
      titulo: "Mostrar e esconder a senha",
      enunciado: `Na tela de login, o botão <b>Mostrar</b> deve revelar a senha (trocar o <code>type</code> do campo para <code>"text"</code>) e mudar o próprio texto para <b>Esconder</b>.
        Clicando de novo, volta para <code>"password"</code> e <b>Mostrar</b>. Substitua cada <code>____</code> na aba <b>JS</b>.`,
      dica: `Atributos como <code>type</code> podem ser lidos e trocados direto: <code>campo.type = "text"</code>.`,
      lang: "web",
      aba: "js",
      inicial: {
        html: c`<label for="senha">Senha</label>
<input id="senha" type="password" value="segredo123">
<button id="ver" type="button">Mostrar</button>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }`,
        js: c`const campo = document.querySelector("#senha");
const botao = document.querySelector("#ver");

botao.addEventListener("click", () => {
  if (campo.type ____ "password") {
    campo.type = "____";
    botao.textContent = "Esconder";
  } else {
    campo.type = "password";
    botao.____ = "Mostrar";
  }
});
`
      },
      solucao: {
        html: c`<label for="senha">Senha</label>
<input id="senha" type="password" value="segredo123">
<button id="ver" type="button">Mostrar</button>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }`,
        js: c`const campo = document.querySelector("#senha");
const botao = document.querySelector("#ver");

botao.addEventListener("click", () => {
  if (campo.type === "password") {
    campo.type = "text";
    botao.textContent = "Esconder";
  } else {
    campo.type = "password";
    botao.textContent = "Mostrar";
  }
});`
      },
      teste: c`
var campo = document.querySelector("#senha");
var botao = document.querySelector("#ver");
botao.click();
__assert(campo.type === "text", 'Depois de 1 clique, o campo deveria ter type "text", mas tem ' + JSON.stringify(campo.type));
__assert(botao.textContent.trim() === "Esconder", 'Depois de 1 clique, o botão deveria dizer "Esconder".');
botao.click();
__assert(campo.type === "password", 'Depois de 2 cliques, o campo deveria voltar a type "password".');
__assert(botao.textContent.trim() === "Mostrar", 'Depois de 2 cliques, o botão deveria voltar a dizer "Mostrar".');`
    },
    {
      tipo: "criar",
      titulo: "Contador de caracteres",
      enunciado: `No formulário de recados do restaurante, a mensagem tem limite de 140 caracteres. Na aba <b>JS</b>:
        <ul>
          <li>a cada digitação (evento <code>"input"</code>) na <code>&lt;textarea id="mensagem"&gt;</code>, mostre no <code>&lt;p id="contador"&gt;</code> o texto <code>quantidade/140</code> (ex.: <code>12/140</code>);</li>
          <li>quando passar de 140, adicione a classe <code>limite</code> no contador; quando voltar para 140 ou menos, tire a classe.</li>
        </ul>`,
      dica: `<code>campo.value.length</code> dá a quantidade de caracteres. <code>classList.toggle("limite", condicao)</code> liga ou desliga conforme a condição.`,
      lang: "web",
      aba: "js",
      inicial: {
        html: c`<label for="mensagem">Recado</label><br>
<textarea id="mensagem" rows="4" cols="40"></textarea>
<p id="contador">0/140</p>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
.limite { color: crimson; font-weight: bold; }`,
        js: c`// Selecione a textarea e o contador
// Ouça o evento "input" e atualize o texto "quantidade/140"
// Adicione/remova a classe "limite" quando passar de 140
`
      },
      solucao: {
        html: c`<label for="mensagem">Recado</label><br>
<textarea id="mensagem" rows="4" cols="40"></textarea>
<p id="contador">0/140</p>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
.limite { color: crimson; font-weight: bold; }`,
        js: c`const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");

mensagem.addEventListener("input", () => {
  const qtd = mensagem.value.length;
  contador.textContent = qtd + "/140";
  contador.classList.toggle("limite", qtd > 140);
});`
      },
      teste: c`
var ta = document.querySelector("#mensagem");
var cont = document.querySelector("#contador");
__digitar(ta, "Mesa 4 sem cebola");
__assert(cont.textContent.trim() === "17/140", 'Com 17 caracteres, o contador deveria mostrar "17/140", mas mostra ' + JSON.stringify(cont.textContent));
__assert(!cont.classList.contains("limite"), "Com 17 caracteres, o contador não deveria ter a classe limite.");
__digitar(ta, "x".repeat(141));
__assert(cont.textContent.trim() === "141/140", 'Com 141 caracteres, deveria mostrar "141/140".');
__assert(cont.classList.contains("limite"), "Acima de 140, o contador deveria ganhar a classe limite.");
__digitar(ta, "x".repeat(140));
__assert(!cont.classList.contains("limite"), "Com exatamente 140, a classe limite deveria sair.");`
    },
    {
      tipo: "criar",
      titulo: "Carrinho com delegação de eventos",
      enunciado: `No carrinho da loja, cada item tem um botão <b>Remover</b> (classe <code>remover</code>). Use <b>delegação de eventos</b>:
        <ul>
          <li>coloque <b>um único</b> listener de clique na <code>&lt;ul id="carrinho"&gt;</code> (não um por botão);</li>
          <li>use <code>event.target</code> para saber se o clique foi num botão <code>.remover</code> e, se foi, remova o <code>&lt;li&gt;</code> daquele botão;</li>
          <li>depois de remover, atualize o <code>&lt;span id="qtd"&gt;</code> com a quantidade de itens que sobraram.</li>
        </ul>
        Tem que funcionar também para itens adicionados <b>depois</b> que a página carregou.`,
      dica: `<code>event.target.classList.contains("remover")</code> confere o botão; <code>event.target.closest("li").remove()</code> apaga o item.`,
      lang: "web",
      aba: "js",
      inicial: {
        html: c`<h3>Carrinho (<span id="qtd">3</span> itens)</h3>
<ul id="carrinho">
  <li>Camiseta <button class="remover">Remover</button></li>
  <li>Boné <button class="remover">Remover</button></li>
  <li>Meia <button class="remover">Remover</button></li>
</ul>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
li { margin: 6px 0; }`,
        js: c`// Um único addEventListener na #carrinho
// Use event.target para achar o botão .remover clicado
// Remova o li e atualize o #qtd
`
      },
      solucao: {
        html: c`<h3>Carrinho (<span id="qtd">3</span> itens)</h3>
<ul id="carrinho">
  <li>Camiseta <button class="remover">Remover</button></li>
  <li>Boné <button class="remover">Remover</button></li>
  <li>Meia <button class="remover">Remover</button></li>
</ul>`,
        css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
li { margin: 6px 0; }`,
        js: c`const carrinho = document.querySelector("#carrinho");
const qtd = document.querySelector("#qtd");

carrinho.addEventListener("click", (event) => {
  if (!event.target.classList.contains("remover")) return;
  event.target.closest("li").remove();
  qtd.textContent = carrinho.querySelectorAll("li").length;
});`
      },
      teste: c`
var ul = document.querySelector("#carrinho");
var qtd = document.querySelector("#qtd");
ul.querySelectorAll(".remover")[1].click();
__assert(ul.querySelectorAll("li").length === 2, "Depois de remover o Boné, deveriam sobrar 2 itens.");
__assert(ul.textContent.indexOf("Boné") < 0, "O item Boné deveria ter saído do carrinho.");
__assert(qtd.textContent.trim() === "2", "O #qtd deveria mostrar 2, mas mostra " + JSON.stringify(qtd.textContent));
ul.querySelector("li").click();
__assert(ul.querySelectorAll("li").length === 2, "Clicar no texto do item (fora do botão) não deveria remover nada.");
var novo = document.createElement("li");
novo.innerHTML = 'Tênis <button class="remover">Remover</button>';
ul.appendChild(novo);
novo.querySelector(".remover").click();
__assert(ul.textContent.indexOf("Tênis") < 0, "Um item adicionado depois também deveria ser removido: use um único listener na #carrinho (delegação).");
__assert(qtd.textContent.trim() === "2", "Depois de remover o Tênis, o #qtd deveria mostrar 2.");`,
      padroes: [[/\.target/, "Use event.target para saber qual botão foi clicado."]]
    }
  ],

  /* ============ i2: Objetos, JSON e desestruturação ============ */
  i2: [
    {
      tipo: "completar",
      titulo: "Desestruturando o usuário",
      enunciado: `Use <b>desestruturação</b> para tirar os dados de uma vez:
        <ul>
          <li>de <code>usuario</code>, pegue <code>nome</code> e, de dentro de <code>endereco</code>, a <code>cidade</code>;</li>
          <li>do array <code>podio</code>, pegue <code>primeiro</code> e <code>segundo</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Objetos aninhados: <code>const { endereco: { cidade } } = usuario</code>. Arrays usam colchetes: <code>const [a, b] = lista</code>.`,
      lang: "js",
      inicial: c`const usuario = {
  nome: "João",
  email: "joao@email.com",
  endereco: { cidade: "Curitiba", uf: "PR" },
};
const podio = ["ouro", "prata", "bronze"];

const { ____, endereco: { ____ } } = usuario;
const [primeiro, ____] = podio;

console.log(nome, cidade, primeiro, segundo);
`,
      solucao: c`const usuario = {
  nome: "João",
  email: "joao@email.com",
  endereco: { cidade: "Curitiba", uf: "PR" },
};
const podio = ["ouro", "prata", "bronze"];

const { nome, endereco: { cidade } } = usuario;
const [primeiro, segundo] = podio;

console.log(nome, cidade, primeiro, segundo);`,
      teste: c`
__assert(nome === "João", 'nome deveria ser "João".');
__assert(cidade === "Curitiba", 'cidade deveria ser "Curitiba".');
__assert(primeiro === "ouro" && segundo === "prata", 'primeiro e segundo deveriam ser "ouro" e "prata".');`
    },
    {
      tipo: "completar",
      titulo: "Editar perfil sem mexer no original",
      enunciado: `Ao trocar o e-mail do perfil, crie uma <b>cópia</b> com o spread <code>...</code> e mude só o e-mail (o objeto original não pode mudar).
        Depois, transforme a cópia em <b>texto JSON</b> (para enviar à API) e de volta em <b>objeto</b>. Substitua cada <code>____</code>.`,
      dica: `<code>{ ...obj, campo: novoValor }</code> copia e altera. <code>JSON.stringify</code> vai de objeto para texto; <code>JSON.parse</code> faz o caminho de volta.`,
      lang: "js",
      inicial: c`const usuario = { nome: "João", email: "joao@email.com", plano: "básico" };

const atualizado = { ____usuario, email: "novo@email.com" };

const texto = JSON.____(atualizado);
const deVolta = JSON.____(texto);

console.log(usuario.email, atualizado.email, typeof texto, deVolta.plano);
`,
      solucao: c`const usuario = { nome: "João", email: "joao@email.com", plano: "básico" };

const atualizado = { ...usuario, email: "novo@email.com" };

const texto = JSON.stringify(atualizado);
const deVolta = JSON.parse(texto);

console.log(usuario.email, atualizado.email, typeof texto, deVolta.plano);`,
      teste: c`
__assert(atualizado !== usuario, "atualizado deveria ser um objeto novo (cópia), não o mesmo usuario.");
__assert(usuario.email === "joao@email.com", "O usuario original não pode mudar: o e-mail dele deveria continuar joao@email.com.");
__assert(atualizado.email === "novo@email.com" && atualizado.nome === "João" && atualizado.plano === "básico", "atualizado deveria ter todos os campos do usuario, com o e-mail novo.");
__assert(typeof texto === "string" && texto.indexOf('"email":"novo@email.com"') >= 0, "texto deveria ser o JSON (string) do atualizado.");
__assert(deVolta && typeof deVolta === "object" && deVolta.email === "novo@email.com", "deVolta deveria ser o objeto lido do texto.");`
    },
    {
      tipo: "completar",
      titulo: "Carrinho salvo no navegador",
      enunciado: `O <code>localStorage</code> só guarda <b>texto</b>. Complete as funções do carrinho:
        <ul>
          <li><code>salvarCarrinho(itens)</code> guarda o array como JSON na chave <code>"carrinho"</code>;</li>
          <li><code>carregarCarrinho()</code> devolve o array salvo, ou <code>[]</code> se ainda não houver nada (o <code>getItem</code> devolve <code>null</code>).</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Ao salvar, objeto → texto. Ao carregar, texto → objeto. Compare com <code>null</code> usando <code>===</code>.`,
      lang: "js",
      inicial: c`function salvarCarrinho(itens) {
  localStorage.setItem("carrinho", JSON.____(itens));
}

function carregarCarrinho() {
  const texto = localStorage.getItem("carrinho");
  if (texto ____ null) return [];
  return JSON.____(texto);
}

salvarCarrinho([{ produto: "Caneca", qtd: 2 }]);
console.log(carregarCarrinho());
`,
      solucao: c`function salvarCarrinho(itens) {
  localStorage.setItem("carrinho", JSON.stringify(itens));
}

function carregarCarrinho() {
  const texto = localStorage.getItem("carrinho");
  if (texto === null) return [];
  return JSON.parse(texto);
}

salvarCarrinho([{ produto: "Caneca", qtd: 2 }]);
console.log(carregarCarrinho());`,
      teste: c`
localStorage.removeItem("carrinho");
var vazio = carregarCarrinho();
__assert(Array.isArray(vazio) && vazio.length === 0, "Sem nada salvo, carregarCarrinho() deveria devolver [].");
salvarCarrinho([{ produto: "Livro", qtd: 1 }, { produto: "Caneta", qtd: 3 }]);
__assert(typeof localStorage.getItem("carrinho") === "string" && localStorage.getItem("carrinho").indexOf('"produto":"Livro"') >= 0, "salvarCarrinho deveria guardar o JSON do array.");
var lido = carregarCarrinho();
__assert(Array.isArray(lido) && lido.length === 2 && lido[1].qtd === 3, "carregarCarrinho() deveria devolver o array salvo, com 2 itens.");`
    },
    {
      tipo: "criar",
      titulo: "Relatório do estoque com Object.entries",
      enunciado: `O estoque está num objeto (produto → quantidade). Crie:
        <ul>
          <li><code>listarEstoque(estoque)</code>: devolve um array de textos no formato <code>"produto: quantidade"</code>, na ordem do objeto (ex.: <code>["arroz: 12", ...]</code>);</li>
          <li><code>itensZerados(estoque)</code>: devolve um array com os nomes dos produtos com quantidade <code>0</code>.</li>
        </ul>
        Use <code>Object.entries</code>.`,
      dica: `<code>Object.entries(obj)</code> devolve pares <code>[chave, valor]</code>; dá para desestruturar no <code>map</code>: <code>([nome, qtd]) =&gt; ...</code>.`,
      lang: "js",
      inicial: c`const estoque = { arroz: 12, feijao: 0, cafe: 5, acucar: 0 };

// Crie listarEstoque(estoque) e itensZerados(estoque)
`,
      solucao: c`const estoque = { arroz: 12, feijao: 0, cafe: 5, acucar: 0 };

function listarEstoque(estoque) {
  return Object.entries(estoque).map(([nome, qtd]) => nome + ": " + qtd);
}

function itensZerados(estoque) {
  return Object.entries(estoque)
    .filter(([nome, qtd]) => qtd === 0)
    .map(([nome]) => nome);
}

console.log(listarEstoque(estoque), itensZerados(estoque));`,
      teste: c`
var l = listarEstoque(estoque);
__assert(JSON.stringify(l) === '["arroz: 12","feijao: 0","cafe: 5","acucar: 0"]', 'listarEstoque deveria devolver ["arroz: 12","feijao: 0","cafe: 5","acucar: 0"], mas devolveu ' + JSON.stringify(l));
__assert(JSON.stringify(itensZerados(estoque)) === '["feijao","acucar"]', 'itensZerados deveria devolver ["feijao","acucar"], mas devolveu ' + JSON.stringify(itensZerados(estoque)));
__assert(JSON.stringify(listarEstoque({ leite: 3 })) === '["leite: 3"]', "listarEstoque deveria funcionar com qualquer objeto, ex.: { leite: 3 }.");
__assert(JSON.stringify(itensZerados({ leite: 3 })) === "[]", "Sem itens zerados, devolva [].");`,
      padroes: [[/Object\.entries\s*\(/, "Use Object.entries para percorrer o objeto."]]
    },
    {
      tipo: "criar",
      titulo: "Resumo do pedido de delivery",
      enunciado: `Crie a função <code>resumoPedido(pedido)</code>. O pedido tem o formato
        <code>{ id, cliente: { nome, telefone }, itens: [{ produto, preco, qtd }], cupom }</code> (o <code>cupom</code> pode não existir).
        Ela deve devolver um <b>objeto novo</b>:
        <code>{ id, cliente, total, temCupom }</code>, em que <code>cliente</code> é só o nome, <code>total</code> é a soma de <code>preco * qtd</code> e <code>temCupom</code> é <code>true</code>/<code>false</code>.
        Use <b>desestruturação</b> para tirar os campos do pedido. Não altere o pedido recebido.`,
      dica: `<code>const { id, cliente: { nome }, itens, cupom } = pedido;</code> e, no retorno, <code>{ id, cliente: nome, ... }</code>. Para virar booleano: <code>cupom !== undefined</code>.`,
      lang: "js",
      inicial: c`// Crie resumoPedido(pedido)

// console.log(resumoPedido({
//   id: 10, cliente: { nome: "Bia", telefone: "1199999" },
//   itens: [{ produto: "Pizza", preco: 45, qtd: 1 }, { produto: "Refri", preco: 8, qtd: 2 }],
//   cupom: "PROMO10",
// }));
`,
      solucao: c`function resumoPedido(pedido) {
  const { id, cliente: { nome }, itens, cupom } = pedido;
  const total = itens.reduce((soma, item) => soma + item.preco * item.qtd, 0);
  return { id, cliente: nome, total, temCupom: cupom !== undefined };
}

console.log(resumoPedido({
  id: 10, cliente: { nome: "Bia", telefone: "1199999" },
  itens: [{ produto: "Pizza", preco: 45, qtd: 1 }, { produto: "Refri", preco: 8, qtd: 2 }],
  cupom: "PROMO10",
}));`,
      teste: c`
var p1 = { id: 10, cliente: { nome: "Bia", telefone: "1199999" }, itens: [{ produto: "Pizza", preco: 45, qtd: 1 }, { produto: "Refri", preco: 8, qtd: 2 }], cupom: "PROMO10" };
var copia = JSON.stringify(p1);
var r1 = resumoPedido(p1);
__assert(JSON.stringify(r1) === '{"id":10,"cliente":"Bia","total":61,"temCupom":true}', 'Esperado {"id":10,"cliente":"Bia","total":61,"temCupom":true}, mas veio ' + JSON.stringify(r1));
__assert(JSON.stringify(p1) === copia, "resumoPedido não pode alterar o pedido recebido.");
var r2 = resumoPedido({ id: 11, cliente: { nome: "Gil", telefone: "" }, itens: [{ produto: "Açaí", preco: 15.5, qtd: 2 }] });
__assert(r2.cliente === "Gil" && r2.total === 31 && r2.temCupom === false, "Pedido 11 (sem cupom) deveria dar cliente Gil, total 31 e temCupom false, mas veio " + JSON.stringify(r2));`,
      padroes: [[/(const|let)\s*\{[^}]*cliente\s*:\s*\{|resumoPedido\s*\(\s*\{/, "Use desestruturação para tirar o nome de dentro de cliente (ex.: const { cliente: { nome } } = pedido)."]]
    }
  ],

  /* ============ i3: Assíncrono ============ */
  i3: [
    {
      tipo: "completar",
      titulo: "Esperando o status do pedido",
      enunciado: `A função <code>buscarPedido(id)</code> simula uma API: ela devolve uma <b>Promise</b> que demora um pouco.
        Complete <code>mostrarStatus(id)</code> para ser uma função <b>assíncrona</b> que <b>espera</b> o pedido chegar e devolve o texto <code>"Pedido 7: a caminho"</code>.
        Substitua cada <code>____</code>.`,
      dica: `Só dá para usar <code>await</code> dentro de uma função marcada com <code>async</code>.`,
      lang: "js",
      inicial: c`// Simula uma API lenta (não mexa)
function buscarPedido(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: id, status: "a caminho" }), 100);
  });
}

____ function mostrarStatus(id) {
  const pedido = ____ buscarPedido(id);
  return "Pedido " + pedido.id + ": " + pedido.status;
}

mostrarStatus(7).then((texto) => console.log(texto));
`,
      solucao: c`// Simula uma API lenta (não mexa)
function buscarPedido(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: id, status: "a caminho" }), 100);
  });
}

async function mostrarStatus(id) {
  const pedido = await buscarPedido(id);
  return "Pedido " + pedido.id + ": " + pedido.status;
}

mostrarStatus(7).then((texto) => console.log(texto));`,
      teste: c`
var r = mostrarStatus(7);
__assert(r instanceof Promise, "mostrarStatus deveria ser async (devolver uma Promise).");
var t = await r;
__assert(t === "Pedido 7: a caminho", 'mostrarStatus(7) deveria resultar em "Pedido 7: a caminho", mas deu ' + JSON.stringify(t));
__assert((await mostrarStatus(12)) === "Pedido 12: a caminho", "mostrarStatus(12) deveria usar o id 12.");`
    },
    {
      tipo: "completar",
      titulo: "CEP com fetch e tratamento de erro",
      enunciado: `Aqui o <code>fetchFalso</code> imita o <code>fetch</code> da ViaCEP (sem internet). Complete <code>buscarCep(cep)</code>:
        <ul>
          <li>se a resposta <b>não</b> estiver ok (ex.: 404), lance um erro;</li>
          <li>leia o corpo da resposta como JSON (também é assíncrono);</li>
          <li>qualquer erro deve ser <b>capturado</b> e a função devolve <code>null</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Lembre: o <code>fetch</code> não rejeita em 404, por isso confira <code>resp.ok</code>. O corpo é lido com <code>await resp.json()</code>. O par do <code>try</code> é o <code>catch</code>.`,
      lang: "js",
      inicial: c`// Imita o fetch da ViaCEP (não mexa)
function fetchFalso(url) {
  const base = {
    "01001000": { logradouro: "Praça da Sé", localidade: "São Paulo" },
    "99999999": { erro: true },
  };
  const cep = url.split("/")[4];
  const ok = cep.length === 8;
  return Promise.resolve({
    ok: ok,
    status: ok ? 200 : 400,
    json: () => Promise.resolve(base[cep] || { erro: true }),
  });
}

async function buscarCep(cep) {
  try {
    const resp = await fetchFalso("https://viacep.com.br/ws/" + cep + "/json/");
    if (!resp.____) throw new Error("HTTP " + resp.status);
    const dados = await resp.____();
    if (dados.erro) throw new Error("CEP não encontrado");
    return dados;
  } ____ (erro) {
    console.log("Falhou: " + erro.message);
    return null;
  }
}

buscarCep("01001000").then((e) => console.log(e?.logradouro));
`,
      solucao: c`// Imita o fetch da ViaCEP (não mexa)
function fetchFalso(url) {
  const base = {
    "01001000": { logradouro: "Praça da Sé", localidade: "São Paulo" },
    "99999999": { erro: true },
  };
  const cep = url.split("/")[4];
  const ok = cep.length === 8;
  return Promise.resolve({
    ok: ok,
    status: ok ? 200 : 400,
    json: () => Promise.resolve(base[cep] || { erro: true }),
  });
}

async function buscarCep(cep) {
  try {
    const resp = await fetchFalso("https://viacep.com.br/ws/" + cep + "/json/");
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const dados = await resp.json();
    if (dados.erro) throw new Error("CEP não encontrado");
    return dados;
  } catch (erro) {
    console.log("Falhou: " + erro.message);
    return null;
  }
}

buscarCep("01001000").then((e) => console.log(e?.logradouro));`,
      teste: c`
var e1 = await buscarCep("01001000");
__assert(e1 && e1.logradouro === "Praça da Sé", 'buscarCep("01001000") deveria trazer logradouro "Praça da Sé".');
__assert((await buscarCep("123")) === null, 'Um CEP com resposta não ok (400) deveria devolver null.');
__assert((await buscarCep("99999999")) === null, "Um CEP inexistente (dados.erro) deveria devolver null.");
__assert(__saida.join("\n").indexOf("Falhou: HTTP 400") >= 0, 'Para a resposta não ok, deveria aparecer "Falhou: HTTP 400" (lance o erro quando !resp.ok).');`
    },
    {
      tipo: "completar",
      titulo: "Painel com Promise.all",
      enunciado: `O painel do RH precisa de duas listas que vêm de "APIs" diferentes. Em vez de esperar uma e depois a outra, peça as duas <b>ao mesmo tempo</b> com <code>Promise.all</code>.
        <code>carregarPainel()</code> deve devolver <code>{ qtdFuncionarios, qtdFerias }</code>. Substitua cada <code>____</code>.`,
      dica: `<code>Promise.all([p1, p2])</code> devolve uma Promise com um array de resultados, na mesma ordem. Dá para desestruturar: <code>const [a, b] = await ...</code>.`,
      lang: "js",
      inicial: c`// APIs simuladas (não mexa): cada uma demora 200ms
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
async function buscarFuncionarios() { await esperar(200); return ["Ana", "Beto", "Cris", "Dani"]; }
async function buscarFerias() { await esperar(200); return ["Beto"]; }

async function carregarPainel() {
  const [funcionarios, ferias] = ____ Promise.____([buscarFuncionarios(), buscarFerias()]);
  return { qtdFuncionarios: funcionarios.length, qtdFerias: ____.length };
}

carregarPainel().then((p) => console.log(p));
`,
      solucao: c`// APIs simuladas (não mexa): cada uma demora 200ms
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
async function buscarFuncionarios() { await esperar(200); return ["Ana", "Beto", "Cris", "Dani"]; }
async function buscarFerias() { await esperar(200); return ["Beto"]; }

async function carregarPainel() {
  const [funcionarios, ferias] = await Promise.all([buscarFuncionarios(), buscarFerias()]);
  return { qtdFuncionarios: funcionarios.length, qtdFerias: ferias.length };
}

carregarPainel().then((p) => console.log(p));`,
      teste: c`
var inicio = Date.now();
var p = await carregarPainel();
var tempo = Date.now() - inicio;
__assert(p && p.qtdFuncionarios === 4 && p.qtdFerias === 1, "carregarPainel() deveria devolver { qtdFuncionarios: 4, qtdFerias: 1 }, mas devolveu " + JSON.stringify(p));
__assert(tempo < 350, "As duas buscas deveriam rodar ao mesmo tempo (~200ms), mas levaram " + tempo + "ms.");`
    },
    {
      tipo: "criar",
      titulo: "Contagem regressiva com Promise",
      enunciado: `Para a tela de "seu pedido sai em...", crie:
        <ul>
          <li><code>esperar(ms)</code>: devolve uma <b>Promise</b> que se resolve depois de <code>ms</code> milissegundos (use <code>setTimeout</code>);</li>
          <li><code>contagem()</code>: função <code>async</code> que mostra no console <code>3</code>, <code>2</code>, <code>1</code> e <code>Já!</code> (cada um num <code>console.log</code>), esperando <b>100ms</b> entre cada um, com <code>await esperar(100)</code>.</li>
        </ul>
        Não chame <code>contagem()</code> no seu código: o teste chama.`,
      dica: `<code>new Promise((resolve) =&gt; setTimeout(resolve, ms))</code>. Dentro da função async, um <code>for</code> de 3 até 1 com <code>await</code> funciona bem.`,
      lang: "js",
      inicial: c`// Crie esperar(ms) e a função async contagem()
`,
      solucao: c`function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function contagem() {
  for (let i = 3; i >= 1; i--) {
    console.log(String(i));
    await esperar(100);
  }
  console.log("Já!");
}`,
      teste: c`
__assert(typeof esperar === "function", "Crie a função esperar(ms).");
var pr = esperar(150);
__assert(pr instanceof Promise, "esperar(ms) deveria devolver uma Promise.");
var t0 = Date.now();
await pr;
__assert(Date.now() - t0 >= 120, "esperar(150) deveria demorar uns 150ms.");
var antes = __saida.length;
var t1 = Date.now();
await contagem();
var dur = Date.now() - t1;
var linhas = __saida.slice(antes);
__assert(JSON.stringify(linhas) === '["3","2","1","Já!"]', 'contagem() deveria mostrar 3, 2, 1, Já! (nessa ordem), mas mostrou ' + JSON.stringify(linhas));
__assert(dur >= 250, "contagem() deveria esperar 100ms entre os números (levou só " + dur + "ms). Use await esperar(100).");`
    },
    {
      tipo: "criar",
      titulo: "Tentar de novo quando a API falha",
      enunciado: `A API de pagamentos às vezes falha. Crie <code>comRetentativa(fn, tentativas)</code>, uma função <code>async</code> que:
        <ul>
          <li>chama <code>await fn()</code>; se der certo, devolve o resultado;</li>
          <li>se der erro, tenta de novo, até no máximo <code>tentativas</code> vezes no total;</li>
          <li>se todas falharem, <b>lança</b> (throw) o último erro.</li>
        </ul>
        Use a função pronta <code>criarApiInstavel(falhas)</code> para testar: ela cria uma API que falha as primeiras <code>falhas</code> vezes.`,
      dica: `Um <code>for</code> de 1 até <code>tentativas</code> com <code>try { return await fn(); } catch (e) { ultimoErro = e; }</code> dentro, e um <code>throw ultimoErro</code> depois do laço.`,
      lang: "js",
      inicial: c`// API simulada (não mexa): falha as primeiras "falhas" chamadas
function criarApiInstavel(falhas) {
  const api = async () => {
    api.chamadas++;
    if (api.chamadas <= falhas) throw new Error("Falha na tentativa " + api.chamadas);
    return { pago: true };
  };
  api.chamadas = 0;
  return api;
}

// Crie a função async comRetentativa(fn, tentativas)
`,
      solucao: c`// API simulada (não mexa): falha as primeiras "falhas" chamadas
function criarApiInstavel(falhas) {
  const api = async () => {
    api.chamadas++;
    if (api.chamadas <= falhas) throw new Error("Falha na tentativa " + api.chamadas);
    return { pago: true };
  };
  api.chamadas = 0;
  return api;
}

async function comRetentativa(fn, tentativas) {
  let ultimoErro;
  for (let i = 1; i <= tentativas; i++) {
    try {
      return await fn();
    } catch (erro) {
      ultimoErro = erro;
    }
  }
  throw ultimoErro;
}`,
      teste: c`
var a1 = criarApiInstavel(2);
var r1 = await comRetentativa(a1, 3);
__assert(r1 && r1.pago === true, "Com 2 falhas e 3 tentativas, deveria devolver { pago: true }.");
__assert(a1.chamadas === 3, "Deveria ter chamado a API 3 vezes, mas chamou " + a1.chamadas);
var a2 = criarApiInstavel(0);
await comRetentativa(a2, 5);
__assert(a2.chamadas === 1, "Se a primeira chamada der certo, não chame de novo (chamou " + a2.chamadas + " vezes).");
var a3 = criarApiInstavel(10);
var erro = null;
try { await comRetentativa(a3, 3); } catch (e) { erro = e; }
__assert(erro, "Se todas as tentativas falharem, comRetentativa deveria lançar o erro.");
__assert(a3.chamadas === 3, "Com 3 tentativas, deveria chamar a API só 3 vezes, mas chamou " + a3.chamadas);
__assert(erro.message === "Falha na tentativa 3", 'Deveria lançar o ÚLTIMO erro ("Falha na tentativa 3"), mas lançou ' + JSON.stringify(erro.message));`
    }
  ],

  /* ============ a1: TypeScript ============ */
  a1: [
    {
      tipo: "completar",
      titulo: "Tipando o pedido",
      enunciado: `Complete os tipos do pedido em TypeScript:
        <ul>
          <li><code>Status</code> aceita só <code>"pendente"</code>, <code>"pago"</code> ou <code>"cancelado"</code>;</li>
          <li><code>id</code> é um número; <code>cupom</code> é um texto <b>opcional</b>;</li>
          <li><code>totalPago</code> devolve um <code>number</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `União de textos: <code>"a" | "b"</code>. Campo opcional leva <code>?</code> antes dos dois-pontos: <code>cupom?: string</code>.`,
      lang: "ts",
      inicial: c`type Status = "pendente" | ____ | "cancelado";

interface Pedido {
  id: ____;
  cliente: string;
  valor: number;
  status: Status;
  cupom____: string;
}

function totalPago(pedidos: Pedido[]): ____ {
  return pedidos
    .filter((p) => p.status === "pago")
    .reduce((s, p) => s + p.valor, 0);
}

console.log(totalPago([{ id: 1, cliente: "Ana", valor: 50, status: "pago" }]));
`,
      solucao: c`type Status = "pendente" | "pago" | "cancelado";

interface Pedido {
  id: number;
  cliente: string;
  valor: number;
  status: Status;
  cupom?: string;
}

function totalPago(pedidos: Pedido[]): number {
  return pedidos
    .filter((p) => p.status === "pago")
    .reduce((s, p) => s + p.valor, 0);
}

console.log(totalPago([{ id: 1, cliente: "Ana", valor: 50, status: "pago" }]));`,
      teste: c`
var lista = [
  { id: 1, cliente: "Ana", valor: 50, status: "pago" },
  { id: 2, cliente: "Bia", valor: 30, status: "pendente" },
  { id: 3, cliente: "Caio", valor: 70, status: "pago", cupom: "X" }
];
__assert(totalPago(lista) === 120, "totalPago deveria somar só os pagos (120), mas deu " + totalPago(lista));`,
      padroes: [
        [/"pendente"\s*\|\s*"pago"\s*\|\s*"cancelado"/, 'Status deveria ser "pendente" | "pago" | "cancelado".'],
        [/id\s*:\s*number\s*;/, "id deveria ser do tipo number."],
        [/cupom\s*\?\s*:\s*string/, "cupom deveria ser opcional: cupom?: string."],
        [/\)\s*:\s*number\s*\{/, "totalPago deveria declarar o retorno : number."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Funções genéricas",
      enunciado: `Complete as funções <b>genéricas</b> que servem para listas de qualquer tipo, mantendo o tipo:
        <ul>
          <li><code>primeiro&lt;T&gt;(lista)</code> devolve o primeiro item ou <code>undefined</code> se a lista estiver vazia;</li>
          <li><code>ultimo&lt;T&gt;(lista)</code> devolve o último item (ou <code>undefined</code>).</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `O parâmetro de tipo vem entre <code>&lt; &gt;</code> depois do nome da função. O retorno pode ser <code>T | undefined</code>. O último índice é <code>lista.length - 1</code>.`,
      lang: "ts",
      inicial: c`function primeiro<____>(lista: T[]): T | ____ {
  return lista[0];
}

function ultimo<T>(lista: ____[]): T | undefined {
  return lista[____];
}

const nomes: string[] = ["Ana", "Bia", "Caio"];
console.log(primeiro(nomes), ultimo(nomes), primeiro<number>([]));
`,
      solucao: c`function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

function ultimo<T>(lista: T[]): T | undefined {
  return lista[lista.length - 1];
}

const nomes: string[] = ["Ana", "Bia", "Caio"];
console.log(primeiro(nomes), ultimo(nomes), primeiro<number>([]));`,
      teste: c`
__assert(primeiro(["Ana", "Bia", "Caio"]) === "Ana", 'primeiro(["Ana","Bia","Caio"]) deveria ser "Ana".');
__assert(ultimo(["Ana", "Bia", "Caio"]) === "Caio", 'ultimo(["Ana","Bia","Caio"]) deveria ser "Caio", mas é ' + JSON.stringify(ultimo(["Ana", "Bia", "Caio"])));
__assert(ultimo([10, 20]) === 20, "ultimo([10, 20]) deveria ser 20.");
__assert(primeiro([]) === undefined && ultimo([]) === undefined, "Com a lista vazia, as duas devem devolver undefined.");`,
      padroes: [
        [/function\s+primeiro\s*<\s*T\s*>/, "primeiro deveria ser genérica: function primeiro<T>(...)."],
        [/T\s*\|\s*undefined\s*\{[\s\S]*lista\[0\]/, "O retorno de primeiro deveria ser T | undefined."],
        [/ultimo\s*<\s*T\s*>\s*\(\s*lista\s*:\s*T\[\]/, "ultimo deveria receber lista: T[]."]
      ]
    },
    {
      tipo: "completar",
      titulo: "unknown com checagem de tipo",
      enunciado: `Um campo do formulário pode chegar como número, texto ou outra coisa. Em vez de <code>any</code>, use <code>unknown</code> e <b>verifique o tipo</b> antes de usar.
        <code>paraNumero(valor)</code> deve devolver: o próprio número; o texto convertido (ou <code>0</code> se não for número válido); <code>0</code> para qualquer outra coisa.
        Substitua cada <code>____</code>.`,
      dica: `Com <code>unknown</code>, o TypeScript só deixa usar o valor depois de um <code>typeof valor === "..."</code>.`,
      lang: "ts",
      inicial: c`function paraNumero(valor: ____): number {
  if (typeof valor ____ "number") return valor;
  if (typeof valor === "____") {
    const n = Number(valor);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

console.log(paraNumero(5), paraNumero("12.5"), paraNumero("abc"), paraNumero(null));
`,
      solucao: c`function paraNumero(valor: unknown): number {
  if (typeof valor === "number") return valor;
  if (typeof valor === "string") {
    const n = Number(valor);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

console.log(paraNumero(5), paraNumero("12.5"), paraNumero("abc"), paraNumero(null));`,
      teste: c`
__assert(paraNumero(5) === 5, "paraNumero(5) deveria ser 5.");
__assert(paraNumero("12.5") === 12.5, 'paraNumero("12.5") deveria ser 12.5, mas é ' + JSON.stringify(paraNumero("12.5")));
__assert(paraNumero("abc") === 0, 'paraNumero("abc") deveria ser 0.');
__assert(paraNumero(null) === 0 && paraNumero(true) === 0 && paraNumero({}) === 0, "Para null, booleanos e objetos, devolva 0.");`,
      padroes: [[/valor\s*:\s*unknown/, "Declare o parâmetro como valor: unknown (não use any)."]]
    },
    {
      tipo: "criar",
      titulo: "Agenda tipada da clínica",
      enunciado: `Em TypeScript, crie para a agenda da clínica:
        <ul>
          <li><code>type Especialidade</code> = <code>"clinico" | "pediatria" | "dermato"</code>;</li>
          <li><code>interface Consulta</code> com <code>paciente: string</code>, <code>especialidade: Especialidade</code>, <code>horario: string</code> (ex.: <code>"09:30"</code>) e <code>confirmada: boolean</code>;</li>
          <li><code>function consultasDe(lista: Consulta[], esp: Especialidade): string[]</code> que devolve os nomes dos pacientes <b>confirmados</b> daquela especialidade, ordenados por horário (do mais cedo ao mais tarde).</li>
        </ul>`,
      dica: `Horários no formato "HH:MM" podem ser comparados como texto: <code>a.horario.localeCompare(b.horario)</code>. Filtre, ordene e depois faça o <code>map</code>.`,
      lang: "ts",
      inicial: c`// Crie o type Especialidade, a interface Consulta
// e a função consultasDe(lista, esp)
`,
      solucao: c`type Especialidade = "clinico" | "pediatria" | "dermato";

interface Consulta {
  paciente: string;
  especialidade: Especialidade;
  horario: string;
  confirmada: boolean;
}

function consultasDe(lista: Consulta[], esp: Especialidade): string[] {
  return lista
    .filter((c) => c.especialidade === esp && c.confirmada)
    .sort((a, b) => a.horario.localeCompare(b.horario))
    .map((c) => c.paciente);
}

console.log(consultasDe([{ paciente: "Lia", especialidade: "pediatria", horario: "10:00", confirmada: true }], "pediatria"));`,
      teste: c`
var agenda = [
  { paciente: "Lia", especialidade: "pediatria", horario: "10:00", confirmada: true },
  { paciente: "Rui", especialidade: "clinico", horario: "08:00", confirmada: true },
  { paciente: "Teo", especialidade: "pediatria", horario: "08:30", confirmada: true },
  { paciente: "Ivo", especialidade: "pediatria", horario: "09:00", confirmada: false },
  { paciente: "Gal", especialidade: "pediatria", horario: "14:15", confirmada: true }
];
var r = consultasDe(agenda, "pediatria");
__assert(JSON.stringify(r) === '["Teo","Lia","Gal"]', 'consultasDe(agenda, "pediatria") deveria ser ["Teo","Lia","Gal"], mas é ' + JSON.stringify(r));
__assert(JSON.stringify(consultasDe(agenda, "dermato")) === "[]", "Sem consultas da especialidade, devolva [].");
__assert(agenda[0].paciente === "Lia", "Não altere a ordem da lista original (copie antes de ordenar ou filtre antes).");`,
      padroes: [
        [/type\s+Especialidade\s*=/, "Crie o type Especialidade."],
        [/interface\s+Consulta\s*\{/, "Crie a interface Consulta."],
        [/confirmada\s*:\s*boolean/, "Na interface, confirmada deveria ser boolean."],
        [/consultasDe\s*\(\s*lista\s*:\s*Consulta\[\]\s*,\s*esp\s*:\s*Especialidade\s*\)\s*:\s*string\[\]/, "A assinatura deveria ser consultasDe(lista: Consulta[], esp: Especialidade): string[]."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Resultado de sucesso ou erro",
      enunciado: `No financeiro, em vez de lançar exceções, as funções devolvem um <b>resultado tipado</b>. Crie:
        <ul>
          <li><code>type Resultado&lt;T&gt;</code> = <code>{ ok: true; valor: T }</code> <b>ou</b> <code>{ ok: false; erro: string }</code>;</li>
          <li><code>dividir(a: number, b: number): Resultado&lt;number&gt;</code> — se <code>b</code> for 0, devolve <code>{ ok: false, erro: "divisão por zero" }</code>; senão <code>{ ok: true, valor: a / b }</code>;</li>
          <li><code>mensagem(r: Resultado&lt;number&gt;): string</code> — devolve <code>"Resultado: 5"</code> ou <code>"Erro: divisão por zero"</code>.</li>
        </ul>`,
      dica: `É uma união de dois formatos de objeto. Dentro de <code>if (r.ok)</code>, o TypeScript já sabe que existe <code>r.valor</code>.`,
      lang: "ts",
      inicial: c`// Crie o type Resultado<T>, a função dividir e a função mensagem
`,
      solucao: c`type Resultado<T> = { ok: true; valor: T } | { ok: false; erro: string };

function dividir(a: number, b: number): Resultado<number> {
  if (b === 0) return { ok: false, erro: "divisão por zero" };
  return { ok: true, valor: a / b };
}

function mensagem(r: Resultado<number>): string {
  if (r.ok) return "Resultado: " + r.valor;
  return "Erro: " + r.erro;
}

console.log(mensagem(dividir(10, 2)), mensagem(dividir(1, 0)));`,
      teste: c`
var d1 = dividir(10, 2);
__assert(d1 && d1.ok === true && d1.valor === 5, "dividir(10, 2) deveria ser { ok: true, valor: 5 }, mas é " + JSON.stringify(d1));
var d2 = dividir(1, 0);
__assert(d2 && d2.ok === false && d2.erro === "divisão por zero", 'dividir(1, 0) deveria ser { ok: false, erro: "divisão por zero" }, mas é ' + JSON.stringify(d2));
__assert(mensagem(d1) === "Resultado: 5", 'mensagem(dividir(10, 2)) deveria ser "Resultado: 5".');
__assert(mensagem(d2) === "Erro: divisão por zero", 'mensagem(dividir(1, 0)) deveria ser "Erro: divisão por zero".');
__assert(mensagem(dividir(9, 4)) === "Resultado: 2.25", 'mensagem(dividir(9, 4)) deveria ser "Resultado: 2.25".');`,
      padroes: [
        [/type\s+Resultado\s*<\s*T\s*>\s*=/, "Crie o tipo genérico type Resultado<T> = ..."],
        [/ok\s*:\s*true[\s\S]*\|[\s\S]*ok\s*:\s*false/, "Resultado deveria ser a união { ok: true; ... } | { ok: false; ... }."],
        [/\)\s*:\s*Resultado\s*<\s*number\s*>/, "dividir deveria declarar o retorno : Resultado<number>."]
      ]
    }
  ],

  /* ============ a2: Node.js e APIs com Express ============ */
  a2: [
    {
      tipo: "completar",
      titulo: "Rota GET de produtos",
      enunciado: `O navegador não roda Node, então o início do código traz um <b>simulador do Express</b> (não mexa nele). O resto é igual a um projeto real.
        Complete a API da loja:
        <ul>
          <li>ative o leitor de JSON com <code>app.use(express.json())</code>;</li>
          <li>crie a rota <b>GET</b> <code>/produtos</code> que responde a lista em JSON.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Cada método HTTP tem um método no app: <code>app.get</code>, <code>app.post</code>... Para responder JSON, use <code>res.json(...)</code>.`,
      lang: "js",
      inicial: c`// ---- Simulador do Express (não mexa). No Node: const express = require("express"); ----
function express() {
  const app = { rotas: [], middlewares: [], listen() {} };
  app.use = (m) => app.middlewares.push(m);
  app.get = (caminho, handler) => app.rotas.push({ metodo: "GET", caminho, handler });
  app.post = (caminho, handler) => app.rotas.push({ metodo: "POST", caminho, handler });
  return app;
}
express.json = () => function jsonParser(req, res, next) { next(); };
// ---------------------------------------------------------------------------------

const app = express();
app.use(express.____());

const produtos = [
  { id: 1, nome: "Caneca", preco: 35 },
  { id: 2, nome: "Camiseta", preco: 59.9 },
];

app.____("/produtos", (req, res) => res.____(produtos));

app.listen(3000, () => console.log("API em http://localhost:3000"));
`,
      solucao: c`// ---- Simulador do Express (não mexa). No Node: const express = require("express"); ----
function express() {
  const app = { rotas: [], middlewares: [], listen() {} };
  app.use = (m) => app.middlewares.push(m);
  app.get = (caminho, handler) => app.rotas.push({ metodo: "GET", caminho, handler });
  app.post = (caminho, handler) => app.rotas.push({ metodo: "POST", caminho, handler });
  return app;
}
express.json = () => function jsonParser(req, res, next) { next(); };
// ---------------------------------------------------------------------------------

const app = express();
app.use(express.json());

const produtos = [
  { id: 1, nome: "Caneca", preco: 35 },
  { id: 2, nome: "Camiseta", preco: 59.9 },
];

app.get("/produtos", (req, res) => res.json(produtos));

app.listen(3000, () => console.log("API em http://localhost:3000"));`,
      teste: c`
function criarRes() { var r = { statusCode: 200, corpo: undefined }; r.status = function (c) { r.statusCode = c; return r; }; r.json = function (d) { r.corpo = d; return r; }; r.send = r.json; return r; }
__assert(app.middlewares.some(function (m) { return m && m.name === "jsonParser"; }), "Faltou app.use(express.json()).");
var rota = app.rotas.find(function (r) { return r.metodo === "GET" && r.caminho === "/produtos"; });
__assert(rota, "Não encontrei a rota GET /produtos.");
var res = criarRes();
rota.handler({ params: {}, query: {}, body: {} }, res);
__assert(res.statusCode === 200 && Array.isArray(res.corpo) && res.corpo.length === 2, "GET /produtos deveria responder a lista de 2 produtos em JSON.");`,
      padroes: [
        [/app\.use\(\s*express\.json\(\)\s*\)/, "Use app.use(express.json())."],
        [/app\.get\(\s*["']\/produtos["']/, "Crie a rota com app.get(\"/produtos\", ...)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "POST de tarefa com validação",
      enunciado: `O handler <code>criarTarefa(req, res)</code> é a função que o Express chama em <code>app.post("/tarefas", criarTarefa)</code>. Aqui a testamos sozinha, com <code>req</code> e <code>res</code> falsos.
        <ul>
          <li>tire o <code>titulo</code> do <b>corpo</b> da requisição;</li>
          <li>sem título, responda status <code>400</code> com <code>{ erro: "titulo é obrigatório" }</code>;</li>
          <li>com título, adicione a tarefa e responda status <code>201</code> (criado) com a tarefa nova.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Os dados enviados num POST ficam em <code>req.body</code>. <code>res.status(código).json(dados)</code> define o status e responde.`,
      lang: "js",
      inicial: c`const tarefas = [{ id: 1, titulo: "Estudar JS", feita: false }];

function criarTarefa(req, res) {
  const { titulo } = req.____;
  if (!titulo) return res.status(____).json({ erro: "titulo é obrigatório" });
  const nova = { id: tarefas.length + 1, titulo, feita: false };
  tarefas.push(nova);
  res.status(____).json(nova);
}

// No Node: app.post("/tarefas", criarTarefa);
`,
      solucao: c`const tarefas = [{ id: 1, titulo: "Estudar JS", feita: false }];

function criarTarefa(req, res) {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: "titulo é obrigatório" });
  const nova = { id: tarefas.length + 1, titulo, feita: false };
  tarefas.push(nova);
  res.status(201).json(nova);
}

// No Node: app.post("/tarefas", criarTarefa);`,
      teste: c`
function criarRes() { var r = { statusCode: 200, corpo: undefined }; r.status = function (c) { r.statusCode = c; return r; }; r.json = function (d) { r.corpo = d; return r; }; return r; }
var r1 = criarRes();
criarTarefa({ body: {} }, r1);
__assert(r1.statusCode === 400, "Sem título, o status deveria ser 400, mas foi " + r1.statusCode);
__assert(r1.corpo && r1.corpo.erro === "titulo é obrigatório", 'Sem título, responda { erro: "titulo é obrigatório" }.');
__assert(tarefas.length === 1, "Sem título, nenhuma tarefa deveria ser adicionada.");
var r2 = criarRes();
criarTarefa({ body: { titulo: "Revisar PR" } }, r2);
__assert(r2.statusCode === 201, "Ao criar, o status deveria ser 201, mas foi " + r2.statusCode);
__assert(r2.corpo && r2.corpo.id === 2 && r2.corpo.titulo === "Revisar PR" && r2.corpo.feita === false, "Deveria responder a tarefa nova { id: 2, titulo: \"Revisar PR\", feita: false }.");
__assert(tarefas.length === 2, "A tarefa nova deveria entrar no array tarefas.");`
    },
    {
      tipo: "completar",
      titulo: "Buscar produto pelo id da rota",
      enunciado: `Na rota <code>/produtos/:id</code>, o <code>:id</code> é um <b>parâmetro de rota</b> (ex.: <code>/produtos/2</code>). Complete:
        <ul>
          <li>registre a rota GET com o parâmetro <code>:id</code>;</li>
          <li>leia o id de <code>req.params</code> e converta para número;</li>
          <li>se não achar o produto, responda <code>404</code> com <code>{ erro: "Produto não encontrado" }</code>.</li>
        </ul>
        Substitua cada <code>____</code> (o simulador do Express no topo não deve ser alterado).`,
      dica: `Parâmetros de rota chegam como texto em <code>req.params.id</code>; use <code>Number(...)</code>. "Não encontrado" é o status 404.`,
      lang: "js",
      inicial: c`// ---- Simulador do Express (não mexa). No Node: const express = require("express"); ----
function express() {
  const app = { rotas: [], middlewares: [], listen() {} };
  app.use = (m) => app.middlewares.push(m);
  app.get = (caminho, handler) => app.rotas.push({ metodo: "GET", caminho, handler });
  app.post = (caminho, handler) => app.rotas.push({ metodo: "POST", caminho, handler });
  return app;
}
express.json = () => function jsonParser(req, res, next) { next(); };
// ---------------------------------------------------------------------------------

const app = express();
const produtos = [
  { id: 1, nome: "Caneca", preco: 35 },
  { id: 2, nome: "Camiseta", preco: 59.9 },
];

function buscarProduto(req, res) {
  const id = Number(req.____.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return res.status(____).json({ erro: "Produto não encontrado" });
  res.json(produto);
}

app.get("/produtos/____", buscarProduto);
`,
      solucao: c`// ---- Simulador do Express (não mexa). No Node: const express = require("express"); ----
function express() {
  const app = { rotas: [], middlewares: [], listen() {} };
  app.use = (m) => app.middlewares.push(m);
  app.get = (caminho, handler) => app.rotas.push({ metodo: "GET", caminho, handler });
  app.post = (caminho, handler) => app.rotas.push({ metodo: "POST", caminho, handler });
  return app;
}
express.json = () => function jsonParser(req, res, next) { next(); };
// ---------------------------------------------------------------------------------

const app = express();
const produtos = [
  { id: 1, nome: "Caneca", preco: 35 },
  { id: 2, nome: "Camiseta", preco: 59.9 },
];

function buscarProduto(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
  res.json(produto);
}

app.get("/produtos/:id", buscarProduto);`,
      teste: c`
function criarRes() { var r = { statusCode: 200, corpo: undefined }; r.status = function (c) { r.statusCode = c; return r; }; r.json = function (d) { r.corpo = d; return r; }; return r; }
var rota = app.rotas.find(function (r) { return r.metodo === "GET" && r.caminho === "/produtos/:id"; });
__assert(rota, "Não encontrei a rota GET /produtos/:id.");
var r1 = criarRes();
rota.handler({ params: { id: "2" }, query: {}, body: {} }, r1);
__assert(r1.statusCode === 200 && r1.corpo && r1.corpo.nome === "Camiseta", "GET /produtos/2 deveria responder a Camiseta (lembre de converter o id com Number).");
var r2 = criarRes();
rota.handler({ params: { id: "99" }, query: {}, body: {} }, r2);
__assert(r2.statusCode === 404 && r2.corpo && r2.corpo.erro === "Produto não encontrado", 'GET /produtos/99 deveria responder 404 com { erro: "Produto não encontrado" }.');`,
      padroes: [[/app\.get\(\s*["']\/produtos\/:id["']/, "Registre a rota como app.get(\"/produtos/:id\", ...)."]]
    },
    {
      tipo: "criar",
      titulo: "Middleware de autenticação",
      enunciado: `Crie o middleware <code>exigirToken(req, res, next)</code> que protege as rotas do painel:
        <ul>
          <li>leia o cabeçalho <code>req.headers.authorization</code>;</li>
          <li>se ele for exatamente <code>"Bearer " + TOKEN</code>, chame <code>next()</code> para deixar passar;</li>
          <li>senão, responda status <code>401</code> com <code>{ erro: "não autorizado" }</code> e <b>não</b> chame <code>next()</code>.</li>
        </ul>
        Num projeto real, o token viria de <code>process.env</code>; aqui ele já está na constante <code>TOKEN</code>.`,
      dica: `Cuidado: <code>req.headers</code> pode não ter <code>authorization</code>. Use <code>return res.status(401).json(...)</code> para encerrar ali.`,
      lang: "js",
      inicial: c`// No Node: const TOKEN = process.env.API_TOKEN;
const TOKEN = "segredo123";

// Crie o middleware exigirToken(req, res, next)

// No Node: app.use("/painel", exigirToken);
`,
      solucao: c`// No Node: const TOKEN = process.env.API_TOKEN;
const TOKEN = "segredo123";

function exigirToken(req, res, next) {
  const auth = req.headers.authorization;
  if (auth !== "Bearer " + TOKEN) {
    return res.status(401).json({ erro: "não autorizado" });
  }
  next();
}

// No Node: app.use("/painel", exigirToken);`,
      teste: c`
function criarRes() { var r = { statusCode: 200, corpo: undefined }; r.status = function (c) { r.statusCode = c; return r; }; r.json = function (d) { r.corpo = d; return r; }; return r; }
function rodar(headers) { var res = criarRes(); var passou = 0; exigirToken({ headers: headers }, res, function () { passou++; }); return { res: res, passou: passou }; }
var a = rodar({});
__assert(a.res.statusCode === 401 && a.res.corpo && a.res.corpo.erro === "não autorizado", 'Sem cabeçalho, responda 401 com { erro: "não autorizado" }.');
__assert(a.passou === 0, "Sem cabeçalho, next() não pode ser chamado.");
var b = rodar({ authorization: "Bearer errado" });
__assert(b.res.statusCode === 401 && b.passou === 0, "Com token errado, responda 401 e não chame next().");
var d = rodar({ authorization: "segredo123" });
__assert(d.res.statusCode === 401 && d.passou === 0, 'Sem o prefixo "Bearer ", também é 401.');
var e = rodar({ authorization: "Bearer segredo123" });
__assert(e.passou === 1, "Com o token certo, next() deveria ser chamado uma vez.");
__assert(e.res.statusCode === 200 && e.res.corpo === undefined, "Com o token certo, o middleware não deveria responder nada (só chamar next).");`
    },
    {
      tipo: "criar",
      titulo: "API de agendamentos do salão",
      enunciado: `Usando o simulador do Express do topo (não mexa nele), crie a API de agendamentos do salão de beleza:
        <ul>
          <li><code>app.use(express.json())</code>;</li>
          <li><b>GET</b> <code>/agendamentos</code>: responde a lista <code>agendamentos</code> em JSON;</li>
          <li><b>POST</b> <code>/agendamentos</code>: lê <code>cliente</code> e <code>horario</code> do corpo.
            Se faltar algum, responde <code>400</code> com <code>{ erro: "cliente e horario são obrigatórios" }</code>.
            Se já houver agendamento naquele horário, responde <code>409</code> com <code>{ erro: "horário ocupado" }</code>.
            Senão, cria <code>{ id, cliente, horario }</code> (id = tamanho da lista + 1), guarda na lista e responde <code>201</code> com ele.</li>
        </ul>`,
      dica: `Use <code>agendamentos.some((a) =&gt; a.horario === horario)</code> para ver se o horário está ocupado. Use <code>return</code> ao responder erros.`,
      lang: "js",
      inicial: c`// ---- Simulador do Express (não mexa). No Node: const express = require("express"); ----
function express() {
  const app = { rotas: [], middlewares: [], listen() {} };
  app.use = (m) => app.middlewares.push(m);
  app.get = (caminho, handler) => app.rotas.push({ metodo: "GET", caminho, handler });
  app.post = (caminho, handler) => app.rotas.push({ metodo: "POST", caminho, handler });
  return app;
}
express.json = () => function jsonParser(req, res, next) { next(); };
// ---------------------------------------------------------------------------------

const app = express();
const agendamentos = [{ id: 1, cliente: "Marta", horario: "09:00" }];

// Crie app.use(express.json()), GET /agendamentos e POST /agendamentos

app.listen(3000);
`,
      solucao: c`// ---- Simulador do Express (não mexa). No Node: const express = require("express"); ----
function express() {
  const app = { rotas: [], middlewares: [], listen() {} };
  app.use = (m) => app.middlewares.push(m);
  app.get = (caminho, handler) => app.rotas.push({ metodo: "GET", caminho, handler });
  app.post = (caminho, handler) => app.rotas.push({ metodo: "POST", caminho, handler });
  return app;
}
express.json = () => function jsonParser(req, res, next) { next(); };
// ---------------------------------------------------------------------------------

const app = express();
const agendamentos = [{ id: 1, cliente: "Marta", horario: "09:00" }];

app.use(express.json());

app.get("/agendamentos", (req, res) => res.json(agendamentos));

app.post("/agendamentos", (req, res) => {
  const { cliente, horario } = req.body;
  if (!cliente || !horario) {
    return res.status(400).json({ erro: "cliente e horario são obrigatórios" });
  }
  if (agendamentos.some((a) => a.horario === horario)) {
    return res.status(409).json({ erro: "horário ocupado" });
  }
  const novo = { id: agendamentos.length + 1, cliente, horario };
  agendamentos.push(novo);
  res.status(201).json(novo);
});

app.listen(3000);`,
      teste: c`
function criarRes() { var r = { statusCode: 200, corpo: undefined }; r.status = function (c) { r.statusCode = c; return r; }; r.json = function (d) { r.corpo = d; return r; }; return r; }
function rota(m, c) { var x = app.rotas.find(function (r) { return r.metodo === m && r.caminho === c; }); __assert(x, "Não encontrei a rota " + m + " " + c + "."); return x.handler; }
__assert(app.middlewares.some(function (m) { return m && m.name === "jsonParser"; }), "Faltou app.use(express.json()).");
var get = rota("GET", "/agendamentos");
var post = rota("POST", "/agendamentos");
var r0 = criarRes(); get({ query: {}, params: {}, body: {} }, r0);
__assert(Array.isArray(r0.corpo) && r0.corpo.length === 1, "GET /agendamentos deveria responder a lista (1 item no começo).");
var r1 = criarRes(); post({ body: { cliente: "Nina" } }, r1);
__assert(r1.statusCode === 400 && r1.corpo && r1.corpo.erro === "cliente e horario são obrigatórios", 'Sem horario, responda 400 com { erro: "cliente e horario são obrigatórios" }.');
var r2 = criarRes(); post({ body: { cliente: "Nina", horario: "09:00" } }, r2);
__assert(r2.statusCode === 409 && r2.corpo && r2.corpo.erro === "horário ocupado", 'Horário 09:00 já está ocupado: responda 409 com { erro: "horário ocupado" }.');
var r3 = criarRes(); post({ body: { cliente: "Nina", horario: "10:30" } }, r3);
__assert(r3.statusCode === 201, "Agendamento válido deveria responder 201, mas respondeu " + r3.statusCode);
__assert(JSON.stringify(r3.corpo) === '{"id":2,"cliente":"Nina","horario":"10:30"}', 'Deveria responder {"id":2,"cliente":"Nina","horario":"10:30"}, mas respondeu ' + JSON.stringify(r3.corpo));
var r4 = criarRes(); get({ query: {}, params: {}, body: {} }, r4);
__assert(r4.corpo.length === 2, "Depois do POST, o GET deveria mostrar 2 agendamentos.");
var r5 = criarRes(); post({ body: { cliente: "Rui", horario: "10:30" } }, r5);
__assert(r5.statusCode === 409, "O horário recém-agendado (10:30) também deveria ficar ocupado.");`,
      padroes: [
        [/app\.use\(\s*express\.json\(\)\s*\)/, "Use app.use(express.json())."],
        [/app\.get\(\s*["']\/agendamentos["']/, "Crie app.get(\"/agendamentos\", ...)."],
        [/app\.post\(\s*["']\/agendamentos["']/, "Crie app.post(\"/agendamentos\", ...)."]
      ]
    }
  ],

  /* ============ a3: Closures, escopo e event loop ============ */
  a3: [
    {
      tipo: "completar",
      titulo: "Contador de senhas com closure",
      enunciado: `Na fila do banco, cada guichê tem seu próprio contador de senhas. <code>criarContador()</code> devolve uma função que, a cada chamada, devolve a próxima senha: 1, 2, 3...
        A variável <code>n</code> fica "presa" na closure. Substitua cada <code>____</code>.`,
      dica: `Comece do zero. <code>++n</code> soma antes de devolver; <code>n++</code> devolve o valor antigo.`,
      lang: "js",
      inicial: c`function criarContador() {
  let n = ____;
  return () => ____n;
}

const guiche1 = criarContador();
const guiche2 = criarContador();
guiche1();
guiche1();
console.log(guiche1(), guiche2());
`,
      solucao: c`function criarContador() {
  let n = 0;
  return () => ++n;
}

const guiche1 = criarContador();
const guiche2 = criarContador();
guiche1();
guiche1();
console.log(guiche1(), guiche2());`,
      teste: c`
var g = criarContador();
__assert(g() === 1, "A primeira senha deveria ser 1.");
__assert(g() === 2 && g() === 3, "As próximas senhas deveriam ser 2 e 3.");
var h = criarContador();
__assert(h() === 1, "Cada contador é independente: um novo contador deveria começar em 1.");
__assert(__saida.indexOf("3 1") >= 0, 'O console deveria mostrar "3 1".');`
    },
    {
      tipo: "completar",
      titulo: "Ordem do event loop",
      enunciado: `Pergunta clássica de entrevista! Preencha o array <code>ordemEsperada</code> com os 4 textos na ordem em que <b>realmente</b> aparecem no console.
        O teste compara com o que foi impresso. Substitua cada <code>____</code> por um texto entre aspas.`,
      dica: `Primeiro roda todo o código síncrono. Depois, as microtasks (Promises). Só então as macrotasks (setTimeout), mesmo com 0ms.`,
      lang: "js",
      inicial: c`console.log("1");
setTimeout(() => console.log("2 - timeout"), 0);
Promise.resolve().then(() => console.log("3 - promise"));
console.log("4");

const ordemEsperada = [____, ____, ____, ____];
`,
      solucao: c`console.log("1");
setTimeout(() => console.log("2 - timeout"), 0);
Promise.resolve().then(() => console.log("3 - promise"));
console.log("4");

const ordemEsperada = ["1", "4", "3 - promise", "2 - timeout"];`,
      teste: c`
var reais = __saida.filter(function (l) { return ["1", "2 - timeout", "3 - promise", "4"].indexOf(l) >= 0; });
__assert(reais.length === 4, "Não apague os console.log do código.");
__assert(JSON.stringify(ordemEsperada) === JSON.stringify(reais), "A ordem real foi " + JSON.stringify(reais) + ", mas você escreveu " + JSON.stringify(ordemEsperada));`
    },
    {
      tipo: "completar",
      titulo: "let no laço e fábrica de saudações",
      enunciado: `Dois usos de escopo:
        <ul>
          <li>o laço cria 3 funções que devem lembrar <b>cada uma o seu</b> valor de <code>i</code> (0, 1 e 2). Escolha a palavra certa para declarar <code>i</code> (com <code>var</code> todas veriam 3!);</li>
          <li><code>criarSaudacao(saudacao)</code> devolve uma função que usa a <code>saudacao</code> guardada na closure: <code>criarSaudacao("Bom dia")("Lia")</code> → <code>"Bom dia, Lia!"</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>let</code> tem escopo de bloco: cada volta do <code>for</code> ganha um <code>i</code> novo.`,
      lang: "js",
      inicial: c`const funcoes = [];
for (____ i = 0; i < 3; i++) {
  funcoes.push(() => i);
}

function criarSaudacao(saudacao) {
  return function (nome) {
    return ____ + ", " + nome + "!";
  };
}

const bomDia = criarSaudacao("Bom dia");
console.log(funcoes.map((f) => f()), bomDia("Lia"));
`,
      solucao: c`const funcoes = [];
for (let i = 0; i < 3; i++) {
  funcoes.push(() => i);
}

function criarSaudacao(saudacao) {
  return function (nome) {
    return saudacao + ", " + nome + "!";
  };
}

const bomDia = criarSaudacao("Bom dia");
console.log(funcoes.map((f) => f()), bomDia("Lia"));`,
      teste: c`
var vals = funcoes.map(function (f) { return f(); });
__assert(JSON.stringify(vals) === "[0,1,2]", "As funções deveriam devolver [0,1,2], mas devolvem " + JSON.stringify(vals) + ". Você usou var?");
__assert(criarSaudacao("Bom dia")("Lia") === "Bom dia, Lia!", 'criarSaudacao("Bom dia")("Lia") deveria ser "Bom dia, Lia!".');
__assert(criarSaudacao("Boa noite")("Rui") === "Boa noite, Rui!", 'criarSaudacao("Boa noite")("Rui") deveria ser "Boa noite, Rui!".');`
    },
    {
      tipo: "criar",
      titulo: "Debounce na busca",
      enunciado: `Na busca da loja, não queremos chamar a API a cada letra digitada. Crie <code>debounce(fn, espera)</code>, que devolve uma <b>nova função</b>:
        <ul>
          <li>cada vez que ela é chamada, cancela o agendamento anterior e agenda <code>fn</code> para daqui a <code>espera</code> ms;</li>
          <li>assim, <code>fn</code> só roda quando as chamadas param por <code>espera</code> ms, e recebe os argumentos da <b>última</b> chamada.</li>
        </ul>`,
      dica: `Guarde o id do timer numa variável da closure: <code>let timer;</code>. Use <code>clearTimeout(timer)</code> e depois <code>timer = setTimeout(() =&gt; fn(...args), espera)</code>.`,
      lang: "js",
      inicial: c`// Crie debounce(fn, espera)

// Exemplo de uso:
// const buscar = debounce((termo) => console.log("Buscando: " + termo), 300);
// buscar("c"); buscar("ca"); buscar("cam"); // só "Buscando: cam" aparece
`,
      solucao: c`function debounce(fn, espera) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), espera);
  };
}

const buscar = debounce((termo) => console.log("Buscando: " + termo), 300);
buscar("c"); buscar("ca"); buscar("cam");`,
      teste: c`
var chamadas = [];
var d = debounce(function (t) { chamadas.push(t); }, 100);
__assert(typeof d === "function", "debounce deveria devolver uma função.");
d("c"); d("ca"); d("cam");
__assert(chamadas.length === 0, "fn não deveria rodar na hora (só depois da espera).");
await new Promise(function (r) { setTimeout(r, 60); });
d("cami");
await new Promise(function (r) { setTimeout(r, 60); });
__assert(chamadas.length === 0, "Uma nova chamada deveria reiniciar a espera.");
await new Promise(function (r) { setTimeout(r, 100); });
__assert(JSON.stringify(chamadas) === '["cami"]', 'fn deveria rodar uma vez só, com o último argumento ("cami"), mas rodou com ' + JSON.stringify(chamadas));
d("x");
await new Promise(function (r) { setTimeout(r, 150); });
__assert(JSON.stringify(chamadas) === '["cami","x"]', "Depois da pausa, uma nova chamada deveria rodar fn de novo.");`
    },
    {
      tipo: "criar",
      titulo: "Carrinho com estado privado",
      enunciado: `Crie <code>criarCarrinho()</code>, que guarda os itens numa variável <b>privada</b> (na closure, sem expor o array) e devolve um objeto com:
        <ul>
          <li><code>adicionar(nome, preco)</code>: coloca um item no carrinho;</li>
          <li><code>quantidade()</code>: quantos itens há;</li>
          <li><code>total()</code>: soma dos preços;</li>
          <li><code>limpar()</code>: esvazia o carrinho.</li>
        </ul>
        O objeto devolvido <b>não</b> pode ter uma propriedade <code>itens</code> acessível de fora, e cada carrinho é independente.`,
      dica: `Declare <code>let itens = [];</code> dentro de <code>criarCarrinho</code> e devolva só as funções. Elas enxergam <code>itens</code> pela closure.`,
      lang: "js",
      inicial: c`// Crie criarCarrinho()

// const meu = criarCarrinho();
// meu.adicionar("Caderno", 20);
// console.log(meu.quantidade(), meu.total());
`,
      solucao: c`function criarCarrinho() {
  let itens = [];
  return {
    adicionar(nome, preco) {
      itens.push({ nome, preco });
    },
    quantidade() {
      return itens.length;
    },
    total() {
      return itens.reduce((soma, i) => soma + i.preco, 0);
    },
    limpar() {
      itens = [];
    },
  };
}

const meu = criarCarrinho();
meu.adicionar("Caderno", 20);
console.log(meu.quantidade(), meu.total());`,
      teste: c`
var a = criarCarrinho();
var b = criarCarrinho();
a.adicionar("Caderno", 20);
a.adicionar("Lápis", 2.5);
__assert(a.quantidade() === 2, "O carrinho a deveria ter 2 itens, mas tem " + a.quantidade());
__assert(a.total() === 22.5, "O total de a deveria ser 22.5, mas é " + a.total());
__assert(b.quantidade() === 0 && b.total() === 0, "O carrinho b é independente: deveria estar vazio.");
__assert(a.itens === undefined, "O array de itens deveria ser privado (a.itens não pode existir).");
a.limpar();
__assert(a.quantidade() === 0 && a.total() === 0, "Depois de limpar(), o carrinho deveria ficar vazio.");
a.adicionar("Borracha", 3);
__assert(a.quantidade() === 1 && a.total() === 3, "Depois de limpar, ainda deve dar para adicionar itens.");`
    }
  ]
};
