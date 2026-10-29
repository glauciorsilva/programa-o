// Exercícios de código da trilha csharp (completar e criar do zero), por tópico.
const c = String.raw;

const NOTA_API = "Para testar de verdade: crie o projeto com dotnet new web, cole o código no Program.cs, rode dotnet run e chame as rotas pelo navegador, pelo Swagger, pelo arquivo .http do VS Code/Visual Studio ou com curl. As respostas devem ser iguais às da saída esperada.";
const NOTA_EF = "Para testar de verdade: dotnet new console, depois dotnet add package Microsoft.EntityFrameworkCore.Sqlite, cole o código no Program.cs e rode dotnet run. O banco SQLite é recriado a cada execução (EnsureDeleted/EnsureCreated), então a saída deve ser sempre igual à esperada.";
const NOTA_XUNIT = "Para testar de verdade: dotnet new xunit -n Testes, coloque a classe e os testes no projeto e rode dotnet test. O resumo deve mostrar todos os testes aprovados e nenhuma falha.";

export default {
  b1: [
    {
      tipo: "completar",
      titulo: "Ficha da funcionária",
      enunciado: `O RH quer mostrar a ficha de uma funcionária no console. Complete as declarações:
        <ul>
          <li><code>nome</code> é o texto <code>"Paula"</code>;</li>
          <li><code>idade</code> é do tipo <b>inteiro</b> (escreva o tipo);</li>
          <li><code>ativa</code> é verdadeiro (<code>true</code>).</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Texto vai entre aspas duplas. O tipo de número inteiro é <code>int</code>. Em C#, verdadeiro é <code>true</code> (minúsculo).`,
      lang: "csharp",
      inicial: c`using System;

string nome = ____;
____ idade = 32;
bool ativa = ____;

Console.WriteLine($"Funcionária: {nome}");
Console.WriteLine($"Idade: {idade}");
Console.WriteLine($"Ativa: {ativa}");
`,
      solucao: c`using System;

string nome = "Paula";
int idade = 32;
bool ativa = true;

Console.WriteLine($"Funcionária: {nome}");
Console.WriteLine($"Idade: {idade}");
Console.WriteLine($"Ativa: {ativa}");`,
      saidaEsperada: "Funcionária: Paula\nIdade: 32\nAtiva: True",
      padroes: [
        [/string\s+nome\s*=\s*"Paula"\s*;/, 'nome deve receber o texto "Paula" (entre aspas duplas).'],
        [/\bint\s+idade\s*=\s*32\s*;/, "idade deve ser declarada como int."],
        [/bool\s+ativa\s*=\s*true\s*;/, "ativa deve receber true."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Total da compra com decimal",
      enunciado: `Na padaria, um bolo custa <b>R$ 19,90</b> e o cliente levou 3. Para dinheiro usamos <code>decimal</code>.
        Complete o código: declare o tipo de <code>preco</code>, faça a multiplicação e formate o total com <b>2 casas decimais</b>.
        Substitua cada <code>____</code> pelo que falta. A saída deve ser exatamente:<br><code>Quantidade: 3</code><br><code>Total: R$ 59.70</code>`,
      dica: `O tipo para dinheiro é <code>decimal</code> (o valor tem o sufixo <code>m</code>). O formato de 2 casas é <code>"F2"</code>. <code>CultureInfo.InvariantCulture</code> garante o ponto como separador em qualquer computador.`,
      lang: "csharp",
      inicial: c`using System;
using System.Globalization;

____ preco = 19.90m;
int quantidade = 3;
decimal total = preco ____ quantidade;

Console.WriteLine($"Quantidade: {quantidade}");
Console.WriteLine("Total: R$ " + total.ToString("____", CultureInfo.InvariantCulture));
`,
      solucao: c`using System;
using System.Globalization;

decimal preco = 19.90m;
int quantidade = 3;
decimal total = preco * quantidade;

Console.WriteLine($"Quantidade: {quantidade}");
Console.WriteLine("Total: R$ " + total.ToString("F2", CultureInfo.InvariantCulture));`,
      saidaEsperada: "Quantidade: 3\nTotal: R$ 59.70",
      padroes: [
        [/decimal\s+preco\s*=\s*19\.90m\s*;/i, "preco deve ser do tipo decimal."],
        [/preco\s*\*\s*quantidade|quantidade\s*\*\s*preco/, "O total é preco multiplicado (*) por quantidade."],
        [/ToString\(\s*"F2"\s*,/, 'Use o formato "F2" para mostrar 2 casas decimais.']
      ]
    },
    {
      tipo: "completar",
      titulo: "Idade digitada com TryParse",
      enunciado: `Num cadastro, a idade chega como <b>texto</b> (como se viesse do teclado). Complete o código para converter
        <code>entrada</code> em inteiro com <code>int.TryParse</code>, guardando o resultado na variável <code>idade</code>, e mostrar a idade do ano que vem.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>int.TryParse(texto, out int variavel)</code> devolve <code>true</code> quando consegue converter. A idade do ano que vem é <code>idade + 1</code>.`,
      lang: "csharp",
      inicial: c`using System;

string entrada = "27"; // imagine que veio de Console.ReadLine()

if (int.____(entrada, ____ int idade))
    Console.WriteLine($"Ano que vem você terá {idade ____ 1} anos.");
else
    Console.WriteLine("Idade inválida!");
`,
      solucao: c`using System;

string entrada = "27"; // imagine que veio de Console.ReadLine()

if (int.TryParse(entrada, out int idade))
    Console.WriteLine($"Ano que vem você terá {idade + 1} anos.");
else
    Console.WriteLine("Idade inválida!");`,
      saidaEsperada: "Ano que vem você terá 28 anos.",
      padroes: [
        [/int\.TryParse\s*\(\s*entrada\s*,\s*out\s+int\s+idade\s*\)/, "Use int.TryParse(entrada, out int idade)."],
        [/idade\s*\+\s*1/, "Mostre idade + 1."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Etiqueta de produto",
      enunciado: `Uma loja de presentes precisa imprimir a etiqueta de um produto. Crie as variáveis com os tipos certos:
        <ul>
          <li><code>produto</code> (texto) com <code>"Caneca"</code>;</li>
          <li><code>estoque</code> (inteiro) com <code>40</code>;</li>
          <li><code>preco</code> (dinheiro, <code>decimal</code>) com <code>24.50m</code>;</li>
          <li><code>disponivel</code> (<code>bool</code>) que recebe o resultado de <code>estoque &gt; 0</code>.</li>
        </ul>
        Imprima exatamente:<br><code>Produto: Caneca</code><br><code>Estoque: 40 unidades</code><br><code>Preço: R$ 24.50</code><br><code>Disponível: True</code>`,
      dica: `Para o preço use <code>preco.ToString("F2", CultureInfo.InvariantCulture)</code>. Um <code>bool</code> impresso aparece como <code>True</code> ou <code>False</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Globalization;

// 1) Declare as quatro variáveis pedidas (texto, inteiro, dinheiro e verdadeiro/falso)
// 2) Imprima a etiqueta igual à saída esperada
`,
      solucao: c`using System;
using System.Globalization;

string produto = "Caneca";
int estoque = 40;
decimal preco = 24.50m;
bool disponivel = estoque > 0;

Console.WriteLine($"Produto: {produto}");
Console.WriteLine($"Estoque: {estoque} unidades");
Console.WriteLine("Preço: R$ " + preco.ToString("F2", CultureInfo.InvariantCulture));
Console.WriteLine($"Disponível: {disponivel}");`,
      saidaEsperada: "Produto: Caneca\nEstoque: 40 unidades\nPreço: R$ 24.50\nDisponível: True",
      padroes: [
        [/string\s+produto\s*=\s*"Caneca"/, 'Declare string produto = "Caneca".'],
        [/\bint\s+estoque\s*=\s*40\s*;/, "Declare int estoque = 40."],
        [/decimal\s+preco\s*=\s*24\.50?m/i, "preco deve ser decimal com o sufixo m (24.50m)."],
        [/bool\s+disponivel\s*=\s*estoque\s*>\s*0/, "disponivel deve ser bool e receber estoque > 0."],
        [/ToString\(\s*"F2"/, 'Mostre o preço com ToString("F2", ...).']
      ]
    },
    {
      tipo: "criar",
      titulo: "Pagamento semanal por horas",
      enunciado: `Um freelancer informa as horas trabalhadas na semana como texto: <code>entrada = "37"</code>. O valor da hora é <b>R$ 42,50</b>.
        Converta a entrada com <code>int.TryParse</code> para a variável <code>horas</code>. Se der certo, calcule o total (<code>horas * valorHora</code>) e imprima exatamente:<br>
        <code>Horas: 37</code><br><code>Valor da hora: R$ 42.50</code><br><code>Total da semana: R$ 1572.50</code><br>
        Se a conversão falhar, imprima <code>Entrada inválida</code>.`,
      dica: `Declare <code>decimal valorHora = 42.50m;</code>. Multiplicar <code>int</code> por <code>decimal</code> dá <code>decimal</code>. Formate com <code>ToString("F2", CultureInfo.InvariantCulture)</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Globalization;

string entrada = "37"; // horas da semana, como se viesse do teclado

// 1) Converta a entrada para inteiro com segurança
// 2) Crie o valor da hora como dinheiro
// 3) Calcule e imprima as três linhas (ou "Entrada inválida")
`,
      solucao: c`using System;
using System.Globalization;

string entrada = "37"; // horas da semana, como se viesse do teclado

decimal valorHora = 42.50m;

if (int.TryParse(entrada, out int horas))
{
    decimal total = horas * valorHora;
    Console.WriteLine($"Horas: {horas}");
    Console.WriteLine("Valor da hora: R$ " + valorHora.ToString("F2", CultureInfo.InvariantCulture));
    Console.WriteLine("Total da semana: R$ " + total.ToString("F2", CultureInfo.InvariantCulture));
}
else
{
    Console.WriteLine("Entrada inválida");
}`,
      saidaEsperada: "Horas: 37\nValor da hora: R$ 42.50\nTotal da semana: R$ 1572.50",
      padroes: [
        [/int\.TryParse\s*\(\s*entrada\s*,\s*out\s+int\s+horas\s*\)/, "Use int.TryParse(entrada, out int horas)."],
        [/decimal\s+\w+\s*=\s*42\.50?m/i, "O valor da hora deve ser decimal (42.50m)."],
        [/"Entrada inválida"/, 'Trate o caso de erro imprimindo "Entrada inválida".'],
        [/ToString\(\s*"F2"\s*,\s*CultureInfo\.InvariantCulture\s*\)/, 'Formate os valores com ToString("F2", CultureInfo.InvariantCulture).']
      ]
    }
  ],

  b2: [
    {
      tipo: "completar",
      titulo: "Faixas de frete",
      enunciado: `A loja virtual cobra frete conforme o valor do pedido: a partir de <b>R$ 150</b> é grátis, a partir de <b>R$ 80</b> custa R$ 10 e abaixo disso R$ 20.
        Complete o laço e as condições. Substitua cada <code>____</code> pelo que falta.`,
      dica: `"A partir de" significa maior ou igual: <code>&gt;=</code>. A segunda condição usa <code>else if</code>. O <code>foreach</code> tem a forma <code>foreach (int x in lista)</code>.`,
      lang: "csharp",
      inicial: c`using System;

int[] totais = { 50, 95, 180 };

foreach (int total ____ totais)
{
    if (total ____ 150)
        Console.WriteLine($"Pedido de R$ {total}: frete grátis");
    ____ (total >= 80)
        Console.WriteLine($"Pedido de R$ {total}: frete R$ 10");
    else
        Console.WriteLine($"Pedido de R$ {total}: frete R$ 20");
}
`,
      solucao: c`using System;

int[] totais = { 50, 95, 180 };

foreach (int total in totais)
{
    if (total >= 150)
        Console.WriteLine($"Pedido de R$ {total}: frete grátis");
    else if (total >= 80)
        Console.WriteLine($"Pedido de R$ {total}: frete R$ 10");
    else
        Console.WriteLine($"Pedido de R$ {total}: frete R$ 20");
}`,
      saidaEsperada: "Pedido de R$ 50: frete R$ 20\nPedido de R$ 95: frete R$ 10\nPedido de R$ 180: frete grátis",
      padroes: [
        [/foreach\s*\(\s*int\s+total\s+in\s+totais\s*\)/, "Use foreach (int total in totais)."],
        [/if\s*\(\s*total\s*>=\s*150\s*\)/, "A primeira condição é total >= 150."],
        [/else\s+if\s*\(\s*total\s*>=\s*80\s*\)/, "A segunda condição deve ser else if (total >= 80)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Desconto por tipo de cliente",
      enunciado: `Cada tipo de cliente tem um desconto: <b>vip</b> 15%, <b>funcionario</b> 20% e qualquer outro 0%.
        Complete a <b>switch expression</b> que escolhe o percentual. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Forma geral: <code>valor switch { "a" =&gt; 1, "b" =&gt; 2, _ =&gt; 0 }</code>. O <code>_</code> é o "caso contrário".`,
      lang: "csharp",
      inicial: c`using System;

string[] tipos = { "vip", "comum", "funcionario" };
int preco = 200;

foreach (string tipo in tipos)
{
    int percentual = tipo ____
    {
        "vip" ____ 15,
        "funcionario" => 20,
        ____ => 0
    };
    int final = preco - preco * percentual / 100;
    Console.WriteLine($"{tipo}: {percentual}% - paga R$ {final}");
}
`,
      solucao: c`using System;

string[] tipos = { "vip", "comum", "funcionario" };
int preco = 200;

foreach (string tipo in tipos)
{
    int percentual = tipo switch
    {
        "vip" => 15,
        "funcionario" => 20,
        _ => 0
    };
    int final = preco - preco * percentual / 100;
    Console.WriteLine($"{tipo}: {percentual}% - paga R$ {final}");
}`,
      saidaEsperada: "vip: 15% - paga R$ 170\ncomum: 0% - paga R$ 200\nfuncionario: 20% - paga R$ 160",
      padroes: [
        [/tipo\s+switch\s*\{/, "Use a switch expression: tipo switch { ... }."],
        [/"vip"\s*=>\s*15/, 'O caso "vip" deve dar 15 (use =>).'],
        [/\b_\s*=>\s*0/, "O caso contrário (_) deve dar 0."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Contagem regressiva do forno",
      enunciado: `O forno da padaria mostra uma contagem regressiva de <b>5</b> até <b>1</b> e depois avisa que o pão está pronto.
        Complete o <code>for</code>. Substitua cada <code>____</code> pelo que falta.`,
      dica: `O contador começa em 5 e diminui de 1 em 1: <code>i--</code>.`,
      lang: "csharp",
      inicial: c`using System;

for (int i = ____; i >= 1; i____)
{
    Console.WriteLine($"{i}...");
}
Console.WriteLine("Pão pronto!");
`,
      solucao: c`using System;

for (int i = 5; i >= 1; i--)
{
    Console.WriteLine($"{i}...");
}
Console.WriteLine("Pão pronto!");`,
      saidaEsperada: "5...\n4...\n3...\n2...\n1...\nPão pronto!",
      padroes: [
        [/for\s*\(\s*int\s+i\s*=\s*5\s*;/, "O contador deve começar em 5."],
        [/;\s*i\s*(--|-=\s*1)\s*\)/, "Diminua o contador a cada volta (i--)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Notas da turma com continue",
      enunciado: `Percorra o array <code>notas</code> com <code>foreach</code>. Para cada nota <b>menor que 5</b>, imprima <code>Nota baixa: X</code> e use <code>continue</code> para pular para a próxima.
        Para as outras, imprima <code>Aprovado: X</code> e some 1 em <code>aprovados</code>. No fim, imprima <code>Total de aprovados: N</code>.`,
      dica: `Dentro do laço: <code>if (n &lt; 5) { ...; continue; }</code>. O que vem depois do <code>if</code> só roda para quem não caiu nele.`,
      lang: "csharp",
      inicial: c`using System;

int[] notas = { 8, 4, 10, 6, 3, 7 };
int aprovados = 0;

// percorra as notas aqui

Console.WriteLine($"Total de aprovados: {aprovados}");
`,
      solucao: c`using System;

int[] notas = { 8, 4, 10, 6, 3, 7 };
int aprovados = 0;

foreach (int n in notas)
{
    if (n < 5)
    {
        Console.WriteLine($"Nota baixa: {n}");
        continue;
    }
    Console.WriteLine($"Aprovado: {n}");
    aprovados++;
}

Console.WriteLine($"Total de aprovados: {aprovados}");`,
      saidaEsperada: "Aprovado: 8\nNota baixa: 4\nAprovado: 10\nAprovado: 6\nNota baixa: 3\nAprovado: 7\nTotal de aprovados: 4",
      padroes: [
        [/foreach\s*\(\s*(int|var)\s+\w+\s+in\s+notas\s*\)/, "Percorra as notas com foreach (int n in notas)."],
        [/if\s*\(\s*\w+\s*<\s*5\s*\)/, "Teste se a nota é menor que 5."],
        [/continue\s*;/, "Use continue para pular as notas baixas."],
        [/aprovados\s*(\+\+|\+=\s*1)/, "Some 1 em aprovados para cada aprovado."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Caixa eletrônico com while",
      enunciado: `A conta começa com <code>saldo = 500</code>. Use um laço <code>while</code> com um índice para processar cada valor do array <code>saques</code>:
        <ul>
          <li>se o saque for <b>maior que o saldo</b>, imprima <code>Saque de R$ X negado. Saldo: R$ S</code>;</li>
          <li>senão, desconte do saldo e imprima <code>Saque de R$ X ok. Saldo: R$ S</code>.</li>
        </ul>
        No fim, imprima <code>Saldo final: R$ S</code>.`,
      dica: `<code>int i = 0; while (i &lt; saques.Length) { ...; i++; }</code>. Não esqueça do <code>i++</code>, senão o laço nunca termina.`,
      lang: "csharp",
      inicial: c`using System;

int saldo = 500;
int[] saques = { 100, 250, 300, 50 };

// processe os saques com while

`,
      solucao: c`using System;

int saldo = 500;
int[] saques = { 100, 250, 300, 50 };

int i = 0;
while (i < saques.Length)
{
    int valor = saques[i];
    if (valor > saldo)
    {
        Console.WriteLine($"Saque de R$ {valor} negado. Saldo: R$ {saldo}");
    }
    else
    {
        saldo -= valor;
        Console.WriteLine($"Saque de R$ {valor} ok. Saldo: R$ {saldo}");
    }
    i++;
}

Console.WriteLine($"Saldo final: R$ {saldo}");`,
      saidaEsperada: "Saque de R$ 100 ok. Saldo: R$ 400\nSaque de R$ 250 ok. Saldo: R$ 150\nSaque de R$ 300 negado. Saldo: R$ 150\nSaque de R$ 50 ok. Saldo: R$ 100\nSaldo final: R$ 100",
      padroes: [
        [/while\s*\(/, "Use um laço while."],
        [/saldo\s*-=|saldo\s*=\s*saldo\s*-/, "Desconte o saque do saldo (saldo -= valor)."],
        [/negado/, 'Mostre a mensagem "negado" quando o saldo não for suficiente.'],
        [/Saldo final/, 'Imprima "Saldo final" no fim.']
      ]
    }
  ],

  b3: [
    {
      tipo: "completar",
      titulo: "Classe Produto com propriedades",
      enunciado: `No controle de estoque, cada produto tem <code>Nome</code> e <code>Estoque</code>. Complete as <b>auto-properties</b> e a criação do objeto.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Uma auto-property se escreve <code>{ get; set; }</code>. Objetos são criados com <code>new NomeDaClasse()</code>.`,
      lang: "csharp",
      inicial: c`using System;

var p = new ____();
p.Nome = "Teclado";
p.Estoque = 12;

Console.WriteLine($"{p.Nome}: {p.Estoque} em estoque");

public class Produto
{
    public string Nome { ____; ____; } = "";
    public int Estoque { get; set; }
}
`,
      solucao: c`using System;

var p = new Produto();
p.Nome = "Teclado";
p.Estoque = 12;

Console.WriteLine($"{p.Nome}: {p.Estoque} em estoque");

public class Produto
{
    public string Nome { get; set; } = "";
    public int Estoque { get; set; }
}`,
      saidaEsperada: "Teclado: 12 em estoque",
      padroes: [
        [/new\s+Produto\s*\(\s*\)/, "Crie o objeto com new Produto()."],
        [/public\s+string\s+Nome\s*\{\s*get\s*;\s*set\s*;\s*\}/, "A propriedade Nome precisa de { get; set; }."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Construtor do cliente",
      enunciado: `A clínica cadastra pacientes com nome e e-mail. Complete o <b>construtor</b> da classe <code>Cliente</code>, que recebe os dois dados e guarda nas propriedades.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `O construtor tem o mesmo nome da classe e não tem tipo de retorno: <code>public Cliente(...)</code>. Dentro dele, copie o parâmetro para a propriedade.`,
      lang: "csharp",
      inicial: c`using System;

var cliente = new Cliente("Ana Souza", "ana@email.com");
Console.WriteLine(cliente.Apresentar());

public class Cliente
{
    public string Nome { get; set; }
    public string Email { get; set; }

    public ____(string nome, string email)
    {
        Nome = ____;
        Email = ____;
    }

    public string Apresentar() => $"{Nome} - {Email}";
}
`,
      solucao: c`using System;

var cliente = new Cliente("Ana Souza", "ana@email.com");
Console.WriteLine(cliente.Apresentar());

public class Cliente
{
    public string Nome { get; set; }
    public string Email { get; set; }

    public Cliente(string nome, string email)
    {
        Nome = nome;
        Email = email;
    }

    public string Apresentar() => $"{Nome} - {Email}";
}`,
      saidaEsperada: "Ana Souza - ana@email.com",
      padroes: [
        [/public\s+Cliente\s*\(\s*string\s+nome\s*,\s*string\s+email\s*\)/, "O construtor deve ser public Cliente(string nome, string email)."],
        [/Nome\s*=\s*nome\s*;/, "Guarde o parâmetro nome na propriedade Nome."],
        [/Email\s*=\s*email\s*;/, "Guarde o parâmetro email na propriedade Email."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Preço protegido com private set",
      enunciado: `O preço de um produto só pode mudar pelo método <code>AlterarPreco</code>, que recusa valores zerados ou negativos (devolve <code>false</code>).
        Complete a propriedade e o método. Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>{ get; private set; }</code> deixa todo mundo ler, mas só a própria classe alterar. "Zerado ou negativo" é <code>&lt;= 0</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Globalization;

var p = new Produto("Mouse", 89.90m);
Console.WriteLine("Alterou para 79.90? " + p.AlterarPreco(79.90m));
Console.WriteLine("Alterou para -5? " + p.AlterarPreco(-5m));
Console.WriteLine("Preço atual: " + p.Preco.ToString("F2", CultureInfo.InvariantCulture));

public class Produto
{
    public string Nome { get; }
    public decimal Preco { get; ____ set; }

    public Produto(string nome, decimal preco)
    {
        Nome = nome;
        Preco = preco;
    }

    public bool AlterarPreco(decimal novo)
    {
        if (novo ____ 0) return false;
        Preco = ____;
        return true;
    }
}
`,
      solucao: c`using System;
using System.Globalization;

var p = new Produto("Mouse", 89.90m);
Console.WriteLine("Alterou para 79.90? " + p.AlterarPreco(79.90m));
Console.WriteLine("Alterou para -5? " + p.AlterarPreco(-5m));
Console.WriteLine("Preço atual: " + p.Preco.ToString("F2", CultureInfo.InvariantCulture));

public class Produto
{
    public string Nome { get; }
    public decimal Preco { get; private set; }

    public Produto(string nome, decimal preco)
    {
        Nome = nome;
        Preco = preco;
    }

    public bool AlterarPreco(decimal novo)
    {
        if (novo <= 0) return false;
        Preco = novo;
        return true;
    }
}`,
      saidaEsperada: "Alterou para 79.90? True\nAlterou para -5? False\nPreço atual: 79.90",
      padroes: [
        [/Preco\s*\{\s*get\s*;\s*private\s+set\s*;\s*\}/, "Preco deve ter { get; private set; }."],
        [/if\s*\(\s*novo\s*<=\s*0\s*\)/, "Recuse valores zerados ou negativos: novo <= 0."],
        [/Preco\s*=\s*novo\s*;/, "Atualize o preço com o novo valor."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Conta bancária",
      enunciado: `Crie a classe <code>ContaBancaria</code> com:
        <ul>
          <li>propriedade <code>Titular</code> (texto), preenchida pelo construtor;</li>
          <li>propriedade <code>Saldo</code> (<code>decimal</code>) com <code>private set</code>, começando em 0;</li>
          <li>método <code>void Depositar(decimal valor)</code>;</li>
          <li>método <code>bool Sacar(decimal valor)</code>: se não houver saldo, devolve <code>false</code> sem mexer no saldo; senão desconta e devolve <code>true</code>.</li>
        </ul>
        O código de cima já usa a classe. A saída deve ser a esperada.`,
      dica: `Declare a classe <b>depois</b> das instruções do programa (em C#, as top-level statements vêm primeiro). Em <code>Sacar</code>: <code>if (valor &gt; Saldo) return false;</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Globalization;

var conta = new ContaBancaria("Carlos");
conta.Depositar(1000m);
Console.WriteLine($"Titular: {conta.Titular}");
Console.WriteLine($"Saque de 300: {conta.Sacar(300m)}");
Console.WriteLine($"Saque de 900: {conta.Sacar(900m)}");
Console.WriteLine("Saldo: " + conta.Saldo.ToString("F2", CultureInfo.InvariantCulture));

// declare a classe aqui embaixo
`,
      solucao: c`using System;
using System.Globalization;

var conta = new ContaBancaria("Carlos");
conta.Depositar(1000m);
Console.WriteLine($"Titular: {conta.Titular}");
Console.WriteLine($"Saque de 300: {conta.Sacar(300m)}");
Console.WriteLine($"Saque de 900: {conta.Sacar(900m)}");
Console.WriteLine("Saldo: " + conta.Saldo.ToString("F2", CultureInfo.InvariantCulture));

public class ContaBancaria
{
    public string Titular { get; }
    public decimal Saldo { get; private set; }

    public ContaBancaria(string titular)
    {
        Titular = titular;
    }

    public void Depositar(decimal valor)
    {
        Saldo += valor;
    }

    public bool Sacar(decimal valor)
    {
        if (valor > Saldo) return false;
        Saldo -= valor;
        return true;
    }
}`,
      saidaEsperada: "Titular: Carlos\nSaque de 300: True\nSaque de 900: False\nSaldo: 700.00",
      padroes: [
        [/class\s+ContaBancaria/, "Crie a classe ContaBancaria."],
        [/Saldo\s*\{\s*get\s*;\s*private\s+set\s*;\s*\}/, "Saldo deve ter { get; private set; }."],
        [/void\s+Depositar\s*\(\s*decimal\s+\w+\s*\)/, "Crie o método void Depositar(decimal valor)."],
        [/bool\s+Sacar\s*\(\s*decimal\s+\w+\s*\)/, "Crie o método bool Sacar(decimal valor)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Record de pedido e cópia com with",
      enunciado: `No delivery, o pedido é um dado imutável. Crie o <code>record Pedido(int Numero, string Cliente, string Status)</code>.
        Depois:
        <ul>
          <li>crie <code>p1</code> = pedido 101 da cliente Ana com status <code>"Novo"</code>;</li>
          <li>crie <code>p2</code> como uma <b>cópia</b> de <code>p1</code> com <code>with</code>, mudando só o status para <code>"Enviado"</code>;</li>
          <li>imprima <code>p1</code> e <code>p2</code>;</li>
          <li>imprima <code>Iguais? </code> comparando <code>p1 == p2</code>;</li>
          <li>imprima <code>Mesmo conteúdo? </code> comparando <code>p1</code> com um novo pedido de mesmos dados.</li>
        </ul>`,
      dica: `<code>var p2 = p1 with { Status = "Enviado" };</code>. Records comparam pelo <b>conteúdo</b>, e o <code>ToString</code> deles mostra todas as propriedades.`,
      lang: "csharp",
      inicial: c`using System;

// 1) Crie os pedidos p1 e p2 (cópia alterada)
// 2) Imprima os dois e as comparações
// 3) Declare o record no fim do arquivo
`,
      solucao: c`using System;

var p1 = new Pedido(101, "Ana", "Novo");
var p2 = p1 with { Status = "Enviado" };

Console.WriteLine(p1);
Console.WriteLine(p2);
Console.WriteLine("Iguais? " + (p1 == p2));
Console.WriteLine("Mesmo conteúdo? " + (p1 == new Pedido(101, "Ana", "Novo")));

public record Pedido(int Numero, string Cliente, string Status);`,
      saidaEsperada: "Pedido { Numero = 101, Cliente = Ana, Status = Novo }\nPedido { Numero = 101, Cliente = Ana, Status = Enviado }\nIguais? False\nMesmo conteúdo? True",
      padroes: [
        [/record\s+Pedido\s*\(\s*int\s+Numero\s*,\s*string\s+Cliente\s*,\s*string\s+Status\s*\)/, "Declare record Pedido(int Numero, string Cliente, string Status)."],
        [/\bwith\s*\{\s*Status\s*=\s*"Enviado"\s*\}/, 'Crie a cópia com with { Status = "Enviado" }.'],
        [/==/, "Compare os pedidos com ==."]
      ]
    }
  ],

  i1: [
    {
      tipo: "completar",
      titulo: "Pedidos grandes com Where",
      enunciado: `O financeiro quer só os pedidos <b>acima de 500</b>. Complete a consulta LINQ que filtra e transforma o resultado em lista.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>Where</code> filtra com uma lambda (<code>v =&gt; condição</code>) e <code>ToList()</code> materializa o resultado.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;
using System.Linq;

var pedidos = new List<int> { 1200, 300, 450, 980, 650 };

var grandes = pedidos.____(v => v ____ 500).____();

Console.WriteLine(string.Join(", ", grandes));
Console.WriteLine($"Quantidade: {grandes.Count}");
`,
      solucao: c`using System;
using System.Collections.Generic;
using System.Linq;

var pedidos = new List<int> { 1200, 300, 450, 980, 650 };

var grandes = pedidos.Where(v => v > 500).ToList();

Console.WriteLine(string.Join(", ", grandes));
Console.WriteLine($"Quantidade: {grandes.Count}");`,
      saidaEsperada: "1200, 980, 650\nQuantidade: 3",
      padroes: [
        [/\.Where\s*\(\s*(\w+)\s*=>\s*\1\s*>\s*500\s*\)/, "Filtre com Where(v => v > 500)."],
        [/\.ToList\s*\(\s*\)/, "Transforme o resultado em lista com ToList()."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Total, maior venda e contagem",
      enunciado: `Complete o resumo de vendas do dia usando LINQ: a <b>soma</b> dos valores, a <b>maior</b> venda e <b>quantas</b> passaram de 500.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Os métodos são <code>Sum</code>, <code>Max</code> e <code>Count</code>, todos recebendo <code>v =&gt; v.Valor</code> ou uma condição.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;
using System.Linq;

var vendas = new List<Venda>
{
    new("Ana", 1200m), new("Beto", 300m), new("Ana", 450m), new("Carla", 980m)
};

decimal total = vendas.____(v => v.Valor);
decimal maior = vendas.____(v => v.Valor);
int acima = vendas.Count(v => v.Valor ____ 500);

Console.WriteLine($"Total: {total}");
Console.WriteLine($"Maior venda: {maior}");
Console.WriteLine($"Vendas acima de 500: {acima}");

record Venda(string Vendedor, decimal Valor);
`,
      solucao: c`using System;
using System.Collections.Generic;
using System.Linq;

var vendas = new List<Venda>
{
    new("Ana", 1200m), new("Beto", 300m), new("Ana", 450m), new("Carla", 980m)
};

decimal total = vendas.Sum(v => v.Valor);
decimal maior = vendas.Max(v => v.Valor);
int acima = vendas.Count(v => v.Valor > 500);

Console.WriteLine($"Total: {total}");
Console.WriteLine($"Maior venda: {maior}");
Console.WriteLine($"Vendas acima de 500: {acima}");

record Venda(string Vendedor, decimal Valor);`,
      saidaEsperada: "Total: 2930\nMaior venda: 1200\nVendas acima de 500: 2",
      padroes: [
        [/\.Sum\s*\(\s*(\w+)\s*=>\s*\1\.Valor\s*\)/, "Some os valores com Sum(v => v.Valor)."],
        [/\.Max\s*\(\s*(\w+)\s*=>\s*\1\.Valor\s*\)/, "Pegue a maior venda com Max(v => v.Valor)."],
        [/\.Count\s*\(\s*(\w+)\s*=>\s*\1\.Valor\s*>\s*500\s*\)/, "Conte com Count(v => v.Valor > 500)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Vendas por estado com GroupBy",
      enunciado: `A diretoria quer o total de vendas por <b>UF</b>, do maior para o menor. Complete a consulta.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>GroupBy(v =&gt; v.Uf)</code> agrupa; em cada grupo, <code>g.Key</code> é a UF e <code>g.Sum(...)</code> soma. Ordem decrescente: <code>OrderByDescending</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;
using System.Linq;

var vendas = new List<Venda>
{
    new("SP", 1200m), new("RJ", 300m), new("SP", 450m),
    new("MG", 980m), new("RJ", 200m)
};

var porUf = vendas
    .GroupBy(v => v.____)
    .Select(g => new { Uf = g.Key, Total = g.____(v => v.Valor) })
    .____(x => x.Total);

foreach (var x in porUf)
    Console.WriteLine($"{x.Uf}: {x.Total}");

record Venda(string Uf, decimal Valor);
`,
      solucao: c`using System;
using System.Collections.Generic;
using System.Linq;

var vendas = new List<Venda>
{
    new("SP", 1200m), new("RJ", 300m), new("SP", 450m),
    new("MG", 980m), new("RJ", 200m)
};

var porUf = vendas
    .GroupBy(v => v.Uf)
    .Select(g => new { Uf = g.Key, Total = g.Sum(v => v.Valor) })
    .OrderByDescending(x => x.Total);

foreach (var x in porUf)
    Console.WriteLine($"{x.Uf}: {x.Total}");

record Venda(string Uf, decimal Valor);`,
      saidaEsperada: "SP: 1650\nMG: 980\nRJ: 500",
      padroes: [
        [/\.GroupBy\s*\(\s*(\w+)\s*=>\s*\1\.Uf\s*\)/, "Agrupe com GroupBy(v => v.Uf)."],
        [/g\.Sum\s*\(/, "Some cada grupo com g.Sum(...)."],
        [/\.OrderByDescending\s*\(\s*(\w+)\s*=>\s*\1\.Total\s*\)/, "Ordene do maior para o menor com OrderByDescending(x => x.Total)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Alerta de estoque baixo",
      enunciado: `A papelaria quer saber o que precisa repor. Usando LINQ na lista <code>produtos</code>:
        <ul>
          <li>filtre os produtos com <code>Estoque &lt; 10</code>, ordene do <b>menor</b> estoque para o maior e imprima cada um como <code>Nome: Estoque</code>;</li>
          <li>depois imprima <code>Algum zerado? True/False</code> usando <code>Any</code>.</li>
        </ul>`,
      dica: `Encadeie <code>Where(...)</code> e <code>OrderBy(p =&gt; p.Estoque)</code>. <code>Any(p =&gt; p.Estoque == 0)</code> devolve <code>bool</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;
using System.Linq;

var produtos = new List<Produto>
{
    new("Caneta", 120), new("Caderno", 8), new("Borracha", 3),
    new("Mochila", 15), new("Lápis", 0)
};

// 1) filtre, ordene e imprima os de estoque baixo
// 2) verifique se algum está zerado

record Produto(string Nome, int Estoque);
`,
      solucao: c`using System;
using System.Collections.Generic;
using System.Linq;

var produtos = new List<Produto>
{
    new("Caneta", 120), new("Caderno", 8), new("Borracha", 3),
    new("Mochila", 15), new("Lápis", 0)
};

var baixos = produtos
    .Where(p => p.Estoque < 10)
    .OrderBy(p => p.Estoque);

foreach (var p in baixos)
    Console.WriteLine($"{p.Nome}: {p.Estoque}");

bool algumZerado = produtos.Any(p => p.Estoque == 0);
Console.WriteLine($"Algum zerado? {algumZerado}");

record Produto(string Nome, int Estoque);`,
      saidaEsperada: "Lápis: 0\nBorracha: 3\nCaderno: 8\nAlgum zerado? True",
      padroes: [
        [/\.Where\s*\(\s*(\w+)\s*=>\s*\1\.Estoque\s*<\s*10\s*\)/, "Filtre com Where(p => p.Estoque < 10)."],
        [/\.OrderBy\s*\(\s*(\w+)\s*=>\s*\1\.Estoque\s*\)/, "Ordene com OrderBy(p => p.Estoque)."],
        [/\.Any\s*\(/, "Use Any para saber se algum está zerado."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Busca de cliente com FirstOrDefault",
      enunciado: `No sistema da clínica, crie uma função local <code>void Buscar(int id)</code> que procura o cliente com <code>FirstOrDefault</code>:
        se achar, imprime <code>Encontrado: Nome (Cidade)</code>; se não achar (resultado <code>null</code>), imprime <code>Cliente X não encontrado</code>.
        Chame <code>Buscar(2)</code> e <code>Buscar(9)</code>. Por fim, imprima os nomes em ordem alfabética com <code>OrderBy</code> + <code>Select</code>:
        <code>Clientes: Ana, Bruno, Carla</code>.`,
      dica: `<code>var c = clientes.FirstOrDefault(x =&gt; x.Id == id);</code> e depois <code>if (c is null)</code>. Para juntar nomes: <code>string.Join(", ", ...)</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;
using System.Linq;

var clientes = new List<Cliente>
{
    new(1, "Carla", "Salvador"), new(2, "Bruno", "Recife"), new(3, "Ana", "Curitiba")
};

// 1) crie a função local Buscar e chame com 2 e com 9
// 2) imprima os nomes em ordem alfabética

record Cliente(int Id, string Nome, string Cidade);
`,
      solucao: c`using System;
using System.Collections.Generic;
using System.Linq;

var clientes = new List<Cliente>
{
    new(1, "Carla", "Salvador"), new(2, "Bruno", "Recife"), new(3, "Ana", "Curitiba")
};

void Buscar(int id)
{
    var c = clientes.FirstOrDefault(x => x.Id == id);
    if (c is null)
        Console.WriteLine($"Cliente {id} não encontrado");
    else
        Console.WriteLine($"Encontrado: {c.Nome} ({c.Cidade})");
}

Buscar(2);
Buscar(9);

var nomes = clientes.OrderBy(x => x.Nome).Select(x => x.Nome);
Console.WriteLine("Clientes: " + string.Join(", ", nomes));

record Cliente(int Id, string Nome, string Cidade);`,
      saidaEsperada: "Encontrado: Bruno (Recife)\nCliente 9 não encontrado\nClientes: Ana, Bruno, Carla",
      padroes: [
        [/void\s+Buscar\s*\(\s*int\s+\w+\s*\)/, "Crie a função void Buscar(int id)."],
        [/\.FirstOrDefault\s*\(/, "Procure o cliente com FirstOrDefault."],
        [/is\s+null|==\s*null|is\s+not\s+null|!=\s*null/, "Trate o caso de não encontrar (resultado null)."],
        [/\.OrderBy\s*\([\s\S]*\.Select\s*\(|\.Select\s*\([\s\S]*\.OrderBy\s*\(/, "Use OrderBy e Select para listar os nomes."]
      ]
    }
  ],

  i2: [
    {
      tipo: "completar",
      titulo: "Divisão da conta sem quebrar",
      enunciado: `O app de restaurante divide a conta entre as pessoas da mesa. Se o número de pessoas for 0, a divisão de inteiros lança <code>DivideByZeroException</code>.
        Complete o <code>try/catch/finally</code> para tratar esse erro e sempre avisar que o cálculo terminou. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Estrutura: <code>try { ... } catch (TipoDaExceção ex) { ... } finally { ... }</code>. O <code>finally</code> sempre roda.`,
      lang: "csharp",
      inicial: c`using System;

int conta = 240;
int pessoas = 0;

____
{
    int porPessoa = conta / pessoas;
    Console.WriteLine($"Cada um paga R$ {porPessoa}");
}
catch (____ ex)
{
    Console.WriteLine("Número de pessoas não pode ser zero.");
}
____
{
    Console.WriteLine("Cálculo encerrado.");
}
`,
      solucao: c`using System;

int conta = 240;
int pessoas = 0;

try
{
    int porPessoa = conta / pessoas;
    Console.WriteLine($"Cada um paga R$ {porPessoa}");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Número de pessoas não pode ser zero.");
}
finally
{
    Console.WriteLine("Cálculo encerrado.");
}`,
      saidaEsperada: "Número de pessoas não pode ser zero.\nCálculo encerrado.",
      padroes: [
        [/\btry\s*\{/, "Coloque o cálculo dentro de um bloco try."],
        [/catch\s*\(\s*DivideByZeroException\b/, "Capture a DivideByZeroException."],
        [/\bfinally\s*\{/, "Use finally para a mensagem que sempre aparece."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Validando a idade com throw",
      enunciado: `No cadastro, a função <code>ValidarIdade</code> deve <b>lançar</b> uma <code>ArgumentException</code> com a mensagem <code>"Idade não pode ser negativa"</code> quando a idade for menor que 0.
        O programa captura o erro e mostra a mensagem. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Lançar: <code>throw new ArgumentException("mensagem");</code>. O texto do erro fica em <code>ex.Message</code>.`,
      lang: "csharp",
      inicial: c`using System;

int ValidarIdade(int idade)
{
    if (idade < 0)
        ____ new ArgumentException("Idade não pode ser negativa");
    return idade;
}

try
{
    Console.WriteLine($"Idade válida: {ValidarIdade(30)}");
    Console.WriteLine($"Idade válida: {ValidarIdade(-2)}");
}
catch (____ ex)
{
    Console.WriteLine("Erro: " + ex.____);
}
`,
      solucao: c`using System;

int ValidarIdade(int idade)
{
    if (idade < 0)
        throw new ArgumentException("Idade não pode ser negativa");
    return idade;
}

try
{
    Console.WriteLine($"Idade válida: {ValidarIdade(30)}");
    Console.WriteLine($"Idade válida: {ValidarIdade(-2)}");
}
catch (ArgumentException ex)
{
    Console.WriteLine("Erro: " + ex.Message);
}`,
      saidaEsperada: "Idade válida: 30\nErro: Idade não pode ser negativa",
      padroes: [
        [/throw\s+new\s+ArgumentException\s*\(/, "Lance o erro com throw new ArgumentException(...)."],
        [/catch\s*\(\s*ArgumentException\s+\w+\s*\)/, "Capture com catch (ArgumentException ex)."],
        [/ex\.Message/, "Mostre o texto do erro com ex.Message."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Primeiro async/await",
      enunciado: `O painel da loja busca a quantidade de pedidos do dia num serviço que demora um pouco (simulado com <code>Task.Delay</code>).
        Complete a função assíncrona e a chamada com <code>await</code>. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Uma função assíncrona que devolve inteiro tem a assinatura <code>async Task&lt;int&gt; Nome()</code>. Para esperar uma Task sem travar, use <code>await</code>.`,
      lang: "csharp",
      inicial: c`using System;
using System.Threading.Tasks;

async ____<int> ContarPedidosAsync()
{
    ____ Task.Delay(100); // simula a consulta ao servidor
    return 42;
}

Console.WriteLine("Buscando pedidos...");
int total = ____ ContarPedidosAsync();
Console.WriteLine($"Pedidos de hoje: {total}");
`,
      solucao: c`using System;
using System.Threading.Tasks;

async Task<int> ContarPedidosAsync()
{
    await Task.Delay(100); // simula a consulta ao servidor
    return 42;
}

Console.WriteLine("Buscando pedidos...");
int total = await ContarPedidosAsync();
Console.WriteLine($"Pedidos de hoje: {total}");`,
      saidaEsperada: "Buscando pedidos...\nPedidos de hoje: 42",
      padroes: [
        [/async\s+Task\s*<\s*int\s*>\s+ContarPedidosAsync/, "A função deve ser async Task<int> ContarPedidosAsync()."],
        [/await\s+Task\.Delay\s*\(/, "Espere o Task.Delay com await."],
        [/=\s*await\s+ContarPedidosAsync\s*\(/, "Chame a função com await ContarPedidosAsync()."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Planilha de estoque com valores inválidos",
      enunciado: `As quantidades vieram de uma planilha como texto, e algumas estão erradas. Para cada item de <code>entradas</code>, converta com <code>int.Parse</code> dentro de um <code>try</code>:
        <ul>
          <li>se der certo, some em <code>total</code> e imprima <code>Lido: X</code>;</li>
          <li>se lançar <code>FormatException</code>, imprima <code>Valor inválido: X</code> e continue.</li>
        </ul>
        No fim, imprima <code>Total: N</code>.`,
      dica: `Coloque o <code>try/catch</code> <b>dentro</b> do <code>foreach</code>, assim um valor ruim não interrompe os outros.`,
      lang: "csharp",
      inicial: c`using System;

string[] entradas = { "10", "abc", "7" };
int total = 0;

// percorra as entradas convertendo e tratando os erros

Console.WriteLine($"Total: {total}");
`,
      solucao: c`using System;

string[] entradas = { "10", "abc", "7" };
int total = 0;

foreach (string e in entradas)
{
    try
    {
        int q = int.Parse(e);
        total += q;
        Console.WriteLine($"Lido: {q}");
    }
    catch (FormatException)
    {
        Console.WriteLine($"Valor inválido: {e}");
    }
}

Console.WriteLine($"Total: {total}");`,
      saidaEsperada: "Lido: 10\nValor inválido: abc\nLido: 7\nTotal: 17",
      padroes: [
        [/int\.Parse\s*\(/, "Converta com int.Parse."],
        [/\btry\s*\{/, "Use um bloco try."],
        [/catch\s*\(\s*FormatException\b/, "Capture a FormatException."],
        [/total\s*\+=|total\s*=\s*total\s*\+/, "Some as quantidades válidas em total."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Duas consultas ao mesmo tempo",
      enunciado: `O sistema do mercado consulta o estoque de dois produtos em serviços diferentes. Crie a função
        <code>async Task&lt;int&gt; BuscarEstoqueAsync(int quantidade, int demoraMs)</code> que espera <code>demoraMs</code> com <code>Task.Delay</code> e devolve a quantidade.
        Inicie as duas consultas (Arroz: 30 com 300 ms; Feijão: 18 com 200 ms), espere as duas juntas com <code>Task.WhenAll</code> e imprima:<br>
        <code>Arroz: 30</code><br><code>Feijão: 18</code><br><code>Total: 48</code>`,
      dica: `Guarde as Tasks sem <code>await</code> (<code>var t1 = BuscarEstoqueAsync(30, 300);</code>) e depois <code>int[] r = await Task.WhenAll(t1, t2);</code>. O resultado vem na mesma ordem das Tasks.`,
      lang: "csharp",
      inicial: c`using System;
using System.Threading.Tasks;

// 1) crie a função assíncrona que simula a consulta
// 2) inicie as duas consultas e espere as duas juntas
// 3) imprima os resultados e o total
`,
      solucao: c`using System;
using System.Threading.Tasks;

async Task<int> BuscarEstoqueAsync(int quantidade, int demoraMs)
{
    await Task.Delay(demoraMs);
    return quantidade;
}

var arroz = BuscarEstoqueAsync(30, 300);
var feijao = BuscarEstoqueAsync(18, 200);

int[] resultados = await Task.WhenAll(arroz, feijao);

Console.WriteLine($"Arroz: {resultados[0]}");
Console.WriteLine($"Feijão: {resultados[1]}");
Console.WriteLine($"Total: {resultados[0] + resultados[1]}");`,
      saidaEsperada: "Arroz: 30\nFeijão: 18\nTotal: 48",
      padroes: [
        [/async\s+Task\s*<\s*int\s*>\s+BuscarEstoqueAsync\s*\(/, "Crie async Task<int> BuscarEstoqueAsync(...)."],
        [/await\s+Task\.Delay\s*\(/, "Simule a demora com await Task.Delay(...)."],
        [/await\s+Task\.WhenAll\s*\(/, "Espere as duas consultas juntas com await Task.WhenAll(...)."]
      ]
    }
  ],

  i3: [
    {
      tipo: "completar",
      titulo: "Interface de notificação",
      enunciado: `O sistema de agendamento avisa os pacientes. Complete a <b>interface</b> <code>INotificador</code>, a classe que a implementa e a variável declarada pelo tipo da interface.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Declare com <code>public interface Nome</code>. Uma classe implementa com <code>class Classe : Interface</code>. A variável pode ser do tipo da interface.`,
      lang: "csharp",
      inicial: c`using System;

____ notificador = new EmailNotificador();
notificador.Enviar("Consulta confirmada para amanhã às 9h");

public ____ INotificador
{
    void Enviar(string mensagem);
}

public class EmailNotificador ____ INotificador
{
    public void Enviar(string mensagem) => Console.WriteLine($"E-mail: {mensagem}");
}
`,
      solucao: c`using System;

INotificador notificador = new EmailNotificador();
notificador.Enviar("Consulta confirmada para amanhã às 9h");

public interface INotificador
{
    void Enviar(string mensagem);
}

public class EmailNotificador : INotificador
{
    public void Enviar(string mensagem) => Console.WriteLine($"E-mail: {mensagem}");
}`,
      saidaEsperada: "E-mail: Consulta confirmada para amanhã às 9h",
      padroes: [
        [/interface\s+INotificador/, "Declare public interface INotificador."],
        [/class\s+EmailNotificador\s*:\s*INotificador/, "EmailNotificador deve implementar INotificador (use :)."],
        [/INotificador\s+notificador\s*=\s*new\s+EmailNotificador/, "Declare a variável pelo tipo da interface: INotificador notificador = ..."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Injeção pelo construtor",
      enunciado: `O <code>PedidoService</code> não deve criar o próprio notificador: ele <b>recebe</b> um <code>INotificador</code> pronto no construtor.
        Assim, o mesmo serviço funciona com e-mail ou SMS. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Guarde a dependência num campo <code>private readonly</code> e atribua no construtor: <code>_notificador = notificador;</code>.`,
      lang: "csharp",
      inicial: c`using System;

new PedidoService(new EmailNotificador()).Finalizar(10);
new PedidoService(new SmsNotificador()).Finalizar(11);

public interface INotificador { void Enviar(string mensagem); }

public class EmailNotificador : INotificador
{
    public void Enviar(string mensagem) => Console.WriteLine($"E-mail: {mensagem}");
}

public class SmsNotificador : INotificador
{
    public void Enviar(string mensagem) => Console.WriteLine($"SMS: {mensagem}");
}

public class PedidoService
{
    private ____ INotificador _notificador;

    public PedidoService(____ notificador)
    {
        _notificador = ____;
    }

    public void Finalizar(int numero) => _notificador.Enviar($"Pedido {numero} finalizado");
}
`,
      solucao: c`using System;

new PedidoService(new EmailNotificador()).Finalizar(10);
new PedidoService(new SmsNotificador()).Finalizar(11);

public interface INotificador { void Enviar(string mensagem); }

public class EmailNotificador : INotificador
{
    public void Enviar(string mensagem) => Console.WriteLine($"E-mail: {mensagem}");
}

public class SmsNotificador : INotificador
{
    public void Enviar(string mensagem) => Console.WriteLine($"SMS: {mensagem}");
}

public class PedidoService
{
    private readonly INotificador _notificador;

    public PedidoService(INotificador notificador)
    {
        _notificador = notificador;
    }

    public void Finalizar(int numero) => _notificador.Enviar($"Pedido {numero} finalizado");
}`,
      saidaEsperada: "E-mail: Pedido 10 finalizado\nSMS: Pedido 11 finalizado",
      padroes: [
        [/private\s+readonly\s+INotificador\s+_notificador/, "O campo deve ser private readonly INotificador _notificador."],
        [/PedidoService\s*\(\s*INotificador\s+notificador\s*\)/, "O construtor deve receber (INotificador notificador)."],
        [/_notificador\s*=\s*notificador\s*;/, "Guarde o parâmetro no campo: _notificador = notificador;"]
      ]
    },
    {
      tipo: "completar",
      titulo: "Repositório falso para testar o carrinho",
      enunciado: `A <code>CalculadoraCarrinho</code> depende de <code>IRepositorioPrecos</code>. Para testar sem banco de dados, usamos uma implementação <b>falsa</b> com preços fixos.
        Complete a implementação, o construtor e a chamada ao repositório. Substitua cada <code>____</code> pelo que falta.`,
      dica: `A classe falsa implementa a interface (<code>: IRepositorioPrecos</code>). A calculadora chama <code>_repo.ObterPreco(codigo)</code> para cada item.`,
      lang: "csharp",
      inicial: c`using System;

var calc = new CalculadoraCarrinho(new PrecosFalsos());
string[] carrinho = { "A1", "B2", "A1" };
Console.WriteLine($"Total do carrinho: {calc.Total(carrinho)}");

public interface IRepositorioPrecos { decimal ObterPreco(string codigo); }

public class PrecosFalsos : ____
{
    public decimal ObterPreco(string codigo) => codigo switch
    {
        "A1" => 10m,
        "B2" => 25m,
        _ => 0m
    };
}

public class CalculadoraCarrinho
{
    private readonly IRepositorioPrecos _repo;
    public CalculadoraCarrinho(____ repo) => _repo = repo;

    public decimal Total(string[] codigos)
    {
        decimal total = 0m;
        foreach (var codigo in codigos)
            total += _repo.____(codigo);
        return total;
    }
}
`,
      solucao: c`using System;

var calc = new CalculadoraCarrinho(new PrecosFalsos());
string[] carrinho = { "A1", "B2", "A1" };
Console.WriteLine($"Total do carrinho: {calc.Total(carrinho)}");

public interface IRepositorioPrecos { decimal ObterPreco(string codigo); }

public class PrecosFalsos : IRepositorioPrecos
{
    public decimal ObterPreco(string codigo) => codigo switch
    {
        "A1" => 10m,
        "B2" => 25m,
        _ => 0m
    };
}

public class CalculadoraCarrinho
{
    private readonly IRepositorioPrecos _repo;
    public CalculadoraCarrinho(IRepositorioPrecos repo) => _repo = repo;

    public decimal Total(string[] codigos)
    {
        decimal total = 0m;
        foreach (var codigo in codigos)
            total += _repo.ObterPreco(codigo);
        return total;
    }
}`,
      saidaEsperada: "Total do carrinho: 45",
      padroes: [
        [/class\s+PrecosFalsos\s*:\s*IRepositorioPrecos/, "PrecosFalsos deve implementar IRepositorioPrecos."],
        [/CalculadoraCarrinho\s*\(\s*IRepositorioPrecos\s+repo\s*\)/, "O construtor deve receber (IRepositorioPrecos repo)."],
        [/_repo\.ObterPreco\s*\(\s*codigo\s*\)/, "Busque o preço com _repo.ObterPreco(codigo)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Trocando a forma de pagamento",
      enunciado: `No checkout da loja, crie:
        <ul>
          <li>a interface <code>IPagamento</code> com <code>string Pagar(decimal valor)</code>;</li>
          <li><code>Pix</code>, que devolve <code>"Pix de R$ X aprovado"</code>;</li>
          <li><code>Cartao</code>, que devolve <code>"Cartão de crédito de R$ X aprovado"</code>;</li>
          <li><code>Checkout</code>, que recebe um <code>IPagamento</code> no construtor e tem <code>void Concluir(decimal valor)</code>, que imprime o retorno de <code>Pagar</code>.</li>
        </ul>
        O código de cima já usa as classes.`,
      dica: `O <code>Checkout</code> só conhece a interface, nunca <code>Pix</code> ou <code>Cartao</code> diretamente. Uma forma nova de pagamento não exige mudar o Checkout.`,
      lang: "csharp",
      inicial: c`using System;

new Checkout(new Pix()).Concluir(100m);
new Checkout(new Cartao()).Concluir(250m);

// declare aqui a interface e as três classes
`,
      solucao: c`using System;

new Checkout(new Pix()).Concluir(100m);
new Checkout(new Cartao()).Concluir(250m);

public interface IPagamento
{
    string Pagar(decimal valor);
}

public class Pix : IPagamento
{
    public string Pagar(decimal valor) => $"Pix de R$ {valor} aprovado";
}

public class Cartao : IPagamento
{
    public string Pagar(decimal valor) => $"Cartão de crédito de R$ {valor} aprovado";
}

public class Checkout
{
    private readonly IPagamento _pagamento;

    public Checkout(IPagamento pagamento)
    {
        _pagamento = pagamento;
    }

    public void Concluir(decimal valor) => Console.WriteLine(_pagamento.Pagar(valor));
}`,
      saidaEsperada: "Pix de R$ 100 aprovado\nCartão de crédito de R$ 250 aprovado",
      padroes: [
        [/interface\s+IPagamento/, "Crie a interface IPagamento."],
        [/class\s+Pix\s*:\s*IPagamento/, "Pix deve implementar IPagamento."],
        [/class\s+Cartao\s*:\s*IPagamento/, "Cartao deve implementar IPagamento."],
        [/Checkout\s*\(\s*IPagamento\s+\w+\s*\)/, "O construtor de Checkout deve receber um IPagamento."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Registrando serviços no container",
      enunciado: `Igual ao ASP.NET Core, um app de console também pode usar o container de injeção de dependência (pacote <code>Microsoft.Extensions.DependencyInjection</code>).
        Usando <code>ServiceCollection</code>:
        <ul>
          <li>registre <code>IEmailService</code> → <code>ConsoleEmailService</code> como <b>Singleton</b>;</li>
          <li>registre <code>PedidoService</code> como <b>Transient</b>;</li>
          <li>monte o provider com <code>BuildServiceProvider()</code>, peça um <code>PedidoService</code> com <code>GetRequiredService</code> e chame <code>Finalizar("ana@email.com")</code>;</li>
          <li>imprima <code>Mesmo IEmailService? </code> e <code>Mesmo PedidoService? </code> pedindo cada serviço duas vezes e comparando com <code>ReferenceEquals</code>.</li>
        </ul>`,
      dica: `<code>services.AddSingleton&lt;IEmailService, ConsoleEmailService&gt;();</code> e <code>services.AddTransient&lt;PedidoService&gt;();</code>. Singleton devolve sempre o mesmo objeto; Transient cria um novo a cada pedido.`,
      lang: "csharp",
      inicial: c`using System;
using Microsoft.Extensions.DependencyInjection;

// 1) crie a ServiceCollection e registre os dois serviços
// 2) monte o provider, peça o PedidoService e finalize o pedido
// 3) compare as instâncias de cada serviço

public interface IEmailService { void Enviar(string para, string assunto); }

public class ConsoleEmailService : IEmailService
{
    public void Enviar(string para, string assunto) => Console.WriteLine($"Enviando para {para}: {assunto}");
}

public class PedidoService
{
    private readonly IEmailService _email;
    public PedidoService(IEmailService email) => _email = email;
    public void Finalizar(string cliente) => _email.Enviar(cliente, "Pedido confirmado");
}
`,
      solucao: c`using System;
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddSingleton<IEmailService, ConsoleEmailService>();
services.AddTransient<PedidoService>();

var provider = services.BuildServiceProvider();

var pedidos = provider.GetRequiredService<PedidoService>();
pedidos.Finalizar("ana@email.com");

bool mesmoEmail = ReferenceEquals(provider.GetRequiredService<IEmailService>(), provider.GetRequiredService<IEmailService>());
bool mesmoPedido = ReferenceEquals(provider.GetRequiredService<PedidoService>(), provider.GetRequiredService<PedidoService>());
Console.WriteLine($"Mesmo IEmailService? {mesmoEmail}");
Console.WriteLine($"Mesmo PedidoService? {mesmoPedido}");

public interface IEmailService { void Enviar(string para, string assunto); }

public class ConsoleEmailService : IEmailService
{
    public void Enviar(string para, string assunto) => Console.WriteLine($"Enviando para {para}: {assunto}");
}

public class PedidoService
{
    private readonly IEmailService _email;
    public PedidoService(IEmailService email) => _email = email;
    public void Finalizar(string cliente) => _email.Enviar(cliente, "Pedido confirmado");
}`,
      saidaEsperada: "Enviando para ana@email.com: Pedido confirmado\nMesmo IEmailService? True\nMesmo PedidoService? False",
      padroes: [
        [/AddSingleton\s*<\s*IEmailService\s*,\s*ConsoleEmailService\s*>/, "Registre AddSingleton<IEmailService, ConsoleEmailService>()."],
        [/AddTransient\s*<\s*PedidoService\s*>/, "Registre AddTransient<PedidoService>()."],
        [/BuildServiceProvider\s*\(\s*\)/, "Monte o provider com BuildServiceProvider()."],
        [/GetRequiredService\s*<\s*PedidoService\s*>/, "Peça o serviço com GetRequiredService<PedidoService>()."],
        [/ReferenceEquals\s*\(/, "Compare as instâncias com ReferenceEquals."]
      ],
      notaVerificacao: "Para rodar: dotnet new console, depois dotnet add package Microsoft.Extensions.DependencyInjection, cole o código no Program.cs e rode dotnet run. A saída deve ser igual à esperada."
    }
  ],

  a1: [
    {
      tipo: "completar",
      titulo: "Primeiro endpoint GET",
      enunciado: `Crie a menor API possível com ASP.NET Core: quando alguém fizer <code>GET /ola</code>, a API responde o texto <code>Olá, API!</code>.
        Complete a criação do builder, o mapeamento da rota e a inicialização. Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>WebApplication.CreateBuilder(args)</code> prepara a aplicação; <code>app.MapGet(rota, função)</code> liga uma rota GET; <code>app.Run()</code> sobe o servidor.`,
      lang: "csharp",
      inicial: c`// dotnet new web -n OlaApi
var builder = WebApplication.____(args);
var app = builder.Build();

app.____("/ola", () => "Olá, API!");

app.____();
`,
      solucao: c`// dotnet new web -n OlaApi
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/ola", () => "Olá, API!");

app.Run();`,
      saidaEsperada: "GET /ola → 200 OK\nOlá, API!",
      padroes: [
        [/WebApplication\.CreateBuilder\s*\(\s*args\s*\)/, "Crie o builder com WebApplication.CreateBuilder(args)."],
        [/app\.MapGet\s*\(\s*"\/ola"/, 'Mapeie a rota com app.MapGet("/ola", ...).'],
        [/app\.Run\s*\(\s*\)/, "Suba o servidor com app.Run()."]
      ],
      notaVerificacao: NOTA_API
    },
    {
      tipo: "completar",
      titulo: "Produto por id com Ok e NotFound",
      enunciado: `A API da loja já lista os produtos. Complete a rota <code>GET /produtos/{id}</code>: o id deve ser restrito a <b>inteiro</b>, e a resposta é <b>200</b> com o produto ou <b>404</b> se ele não existir.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Restrição de rota: <code>{id:int}</code>. Respostas prontas: <code>Results.Ok(objeto)</code> e <code>Results.NotFound()</code>.`,
      lang: "csharp",
      inicial: c`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var produtos = new List<Produto>
{
    new(1, "Monitor", 899m),
    new(2, "Teclado", 150m)
};

app.MapGet("/produtos", () => produtos);

app.MapGet("/produtos/{id:____}", (int id) =>
{
    var p = produtos.FirstOrDefault(x => x.Id == id);
    return p is null ? Results.____() : Results.____(p);
});

app.Run();

record Produto(int Id, string Nome, decimal Preco);
`,
      solucao: c`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var produtos = new List<Produto>
{
    new(1, "Monitor", 899m),
    new(2, "Teclado", 150m)
};

app.MapGet("/produtos", () => produtos);

app.MapGet("/produtos/{id:int}", (int id) =>
{
    var p = produtos.FirstOrDefault(x => x.Id == id);
    return p is null ? Results.NotFound() : Results.Ok(p);
});

app.Run();

record Produto(int Id, string Nome, decimal Preco);`,
      saidaEsperada: "GET /produtos → 200 [{\"id\":1,\"nome\":\"Monitor\",\"preco\":899},{\"id\":2,\"nome\":\"Teclado\",\"preco\":150}]\nGET /produtos/2 → 200 {\"id\":2,\"nome\":\"Teclado\",\"preco\":150}\nGET /produtos/9 → 404 Not Found",
      padroes: [
        [/MapGet\s*\(\s*"\/produtos\/\{id:int\}"/, 'A rota deve ser "/produtos/{id:int}".'],
        [/Results\.NotFound\s*\(\s*\)/, "Responda 404 com Results.NotFound()."],
        [/Results\.Ok\s*\(\s*p\s*\)/, "Responda 200 com Results.Ok(p)."]
      ],
      notaVerificacao: NOTA_API
    },
    {
      tipo: "completar",
      titulo: "POST com validação de preço",
      enunciado: `Complete a rota que <b>cadastra</b> produtos. Se o preço for zero ou negativo, responda <b>400</b> com <code>"Preço inválido"</code>; senão, adicione na lista e responda <b>201 Created</b> com o endereço do novo produto.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Cadastro usa o verbo POST: <code>app.MapPost</code>. As respostas são <code>Results.BadRequest(...)</code> e <code>Results.Created(url, objeto)</code>.`,
      lang: "csharp",
      inicial: c`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var produtos = new List<Produto> { new(1, "Monitor", 899m) };

app.MapGet("/produtos", () => produtos);

app.____("/produtos", (Produto p) =>
{
    if (p.Preco <= 0) return Results.____("Preço inválido");
    produtos.Add(p);
    return Results.____($"/produtos/{p.Id}", p);
});

app.Run();

record Produto(int Id, string Nome, decimal Preco);
`,
      solucao: c`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var produtos = new List<Produto> { new(1, "Monitor", 899m) };

app.MapGet("/produtos", () => produtos);

app.MapPost("/produtos", (Produto p) =>
{
    if (p.Preco <= 0) return Results.BadRequest("Preço inválido");
    produtos.Add(p);
    return Results.Created($"/produtos/{p.Id}", p);
});

app.Run();

record Produto(int Id, string Nome, decimal Preco);`,
      saidaEsperada: "POST /produtos {\"id\":3,\"nome\":\"Mouse\",\"preco\":80} → 201 Created (Location: /produtos/3) {\"id\":3,\"nome\":\"Mouse\",\"preco\":80}\nPOST /produtos {\"id\":4,\"nome\":\"Cabo\",\"preco\":0} → 400 Bad Request \"Preço inválido\"",
      padroes: [
        [/app\.MapPost\s*\(\s*"\/produtos"/, 'Use app.MapPost("/produtos", ...).'],
        [/Results\.BadRequest\s*\(/, "Responda 400 com Results.BadRequest(...)."],
        [/Results\.Created\s*\(/, "Responda 201 com Results.Created(...)."]
      ],
      notaVerificacao: NOTA_API
    },
    {
      tipo: "criar",
      titulo: "Controller de clientes",
      enunciado: `Muitas empresas usam <b>controllers</b> em vez de minimal APIs. Crie a classe <code>ClientesController</code> (herda de <code>ControllerBase</code>, com os atributos de API e a rota <code>api/[controller]</code>) com:
        <ul>
          <li><code>[HttpGet]</code> <code>Listar()</code>: devolve <code>Ok</code> com todos os clientes;</li>
          <li><code>[HttpGet("{id}")]</code> <code>Buscar(int id)</code>: <code>Ok</code> com o cliente ou <code>NotFound()</code>.</li>
        </ul>
        No Program, registre os controllers com <code>AddControllers()</code> e ligue as rotas com <code>MapControllers()</code>. Use a lista com Ana (1) e Bruno (2).`,
      dica: `Os atributos da classe são <code>[ApiController]</code> e <code>[Route("api/[controller]")]</code>; o nome da rota vira <code>clientes</code> (o sufixo Controller sai). Precisa de <code>using Microsoft.AspNetCore.Mvc;</code>.`,
      lang: "csharp",
      inicial: c`// dotnet new web -n ClinicaApi
using Microsoft.AspNetCore.Mvc;

// 1) crie o builder, registre os controllers, construa o app, ligue as rotas e rode
// 2) crie a classe do controller de clientes com as duas ações
// 3) declare: record Cliente(int Id, string Nome);
`,
      solucao: c`// dotnet new web -n ClinicaApi
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();
app.Run();

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private static readonly List<Cliente> clientes = new()
    {
        new(1, "Ana"),
        new(2, "Bruno")
    };

    [HttpGet]
    public IActionResult Listar() => Ok(clientes);

    [HttpGet("{id}")]
    public IActionResult Buscar(int id)
    {
        var cliente = clientes.FirstOrDefault(c => c.Id == id);
        if (cliente is null) return NotFound();
        return Ok(cliente);
    }
}

public record Cliente(int Id, string Nome);`,
      saidaEsperada: "GET /api/clientes → 200 [{\"id\":1,\"nome\":\"Ana\"},{\"id\":2,\"nome\":\"Bruno\"}]\nGET /api/clientes/2 → 200 {\"id\":2,\"nome\":\"Bruno\"}\nGET /api/clientes/5 → 404 Not Found",
      padroes: [
        [/\[ApiController\]/, "Marque a classe com [ApiController]."],
        [/class\s+ClientesController\s*:\s*ControllerBase/, "ClientesController deve herdar de ControllerBase."],
        [/\[HttpGet\]/, "A ação de listar deve ter [HttpGet]."],
        [/\[HttpGet\s*\(\s*"\{id(:int)?\}"\s*\)\]/, 'A ação de buscar deve ter [HttpGet("{id}")].'],
        [/AddControllers\s*\(\s*\)[\s\S]*MapControllers\s*\(\s*\)/, "Registre AddControllers() e ligue as rotas com MapControllers()."]
      ],
      notaVerificacao: NOTA_API
    },
    {
      tipo: "criar",
      titulo: "CRUD de tarefas da cozinha",
      enunciado: `Crie uma minimal API para as tarefas da cozinha de um restaurante, com <code>record Tarefa(int Id, string Titulo, bool Feita)</code> e uma lista que começa com a tarefa 1 "Comprar farinha".
        <ul>
          <li><code>GET /tarefas</code>: lista tudo;</li>
          <li><code>POST /tarefas</code>: 400 se o título estiver vazio; senão adiciona e responde 201;</li>
          <li><code>PUT /tarefas/{id:int}</code>: substitui a tarefa (200) ou 404;</li>
          <li><code>DELETE /tarefas/{id:int}</code>: remove e responde <b>204 No Content</b>, ou 404.</li>
        </ul>`,
      dica: `<code>tarefas.FindIndex(x =&gt; x.Id == id)</code> devolve -1 se não achar. Records são imutáveis: no PUT, troque o item da lista inteiro (<code>tarefas[i] = t with { Id = id };</code>). <code>RemoveAll</code> devolve quantos itens removeu.`,
      lang: "csharp",
      inicial: c`// dotnet new web -n CozinhaApi
// 1) crie o builder e o app
// 2) crie a lista de tarefas
// 3) crie as quatro rotas (listar, cadastrar, atualizar e remover)
// 4) rode o app e declare o record Tarefa no fim
`,
      solucao: c`// dotnet new web -n CozinhaApi
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var tarefas = new List<Tarefa> { new(1, "Comprar farinha", false) };

app.MapGet("/tarefas", () => tarefas);

app.MapPost("/tarefas", (Tarefa t) =>
{
    if (string.IsNullOrWhiteSpace(t.Titulo)) return Results.BadRequest("Título obrigatório");
    tarefas.Add(t);
    return Results.Created($"/tarefas/{t.Id}", t);
});

app.MapPut("/tarefas/{id:int}", (int id, Tarefa t) =>
{
    int i = tarefas.FindIndex(x => x.Id == id);
    if (i < 0) return Results.NotFound();
    tarefas[i] = t with { Id = id };
    return Results.Ok(tarefas[i]);
});

app.MapDelete("/tarefas/{id:int}", (int id) =>
{
    int removidas = tarefas.RemoveAll(x => x.Id == id);
    return removidas > 0 ? Results.NoContent() : Results.NotFound();
});

app.Run();

record Tarefa(int Id, string Titulo, bool Feita);`,
      saidaEsperada: "GET /tarefas → 200 [{\"id\":1,\"titulo\":\"Comprar farinha\",\"feita\":false}]\nPOST /tarefas {\"id\":2,\"titulo\":\"Ligar forno\",\"feita\":false} → 201 Created\nPUT /tarefas/1 {\"id\":1,\"titulo\":\"Comprar farinha\",\"feita\":true} → 200 {\"id\":1,\"titulo\":\"Comprar farinha\",\"feita\":true}\nDELETE /tarefas/2 → 204 No Content\nDELETE /tarefas/9 → 404 Not Found",
      padroes: [
        [/MapGet\s*\(\s*"\/tarefas"/, 'Crie a rota app.MapGet("/tarefas", ...).'],
        [/MapPost\s*\(\s*"\/tarefas"/, 'Crie a rota app.MapPost("/tarefas", ...).'],
        [/MapPut\s*\(\s*"\/tarefas\/\{id(:int)?\}"/, 'Crie a rota app.MapPut("/tarefas/{id:int}", ...).'],
        [/MapDelete\s*\(\s*"\/tarefas\/\{id(:int)?\}"/, 'Crie a rota app.MapDelete("/tarefas/{id:int}", ...).'],
        [/Results\.NoContent\s*\(\s*\)/, "Ao remover, responda 204 com Results.NoContent()."]
      ],
      notaVerificacao: NOTA_API
    }
  ],

  a2: [
    {
      tipo: "completar",
      titulo: "DbContext e DbSet de clientes",
      enunciado: `Monte o primeiro banco da loja com EF Core e SQLite. Complete a classe de contexto (herda de <code>DbContext</code>), o <code>DbSet</code> de clientes e o comando que grava as inclusões no banco.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>class LojaContext : DbContext</code>; cada tabela é um <code>DbSet&lt;Entidade&gt;</code>; nada vai para o banco até chamar <code>SaveChanges()</code>.`,
      lang: "csharp",
      inicial: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new LojaContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

db.Clientes.Add(new Cliente { Nome = "Ana", Uf = "SP" });
db.Clientes.Add(new Cliente { Nome = "Bruno", Uf = "RJ" });
db.____();

Console.WriteLine($"Clientes cadastrados: {db.Clientes.Count()}");
var ana = db.Clientes.First(c => c.Nome == "Ana");
Console.WriteLine($"Id da Ana: {ana.Id}");

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string Uf { get; set; } = "";
}

public class LojaContext : ____
{
    public ____<Cliente> Clientes => Set<Cliente>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=loja.db");
}
`,
      solucao: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new LojaContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

db.Clientes.Add(new Cliente { Nome = "Ana", Uf = "SP" });
db.Clientes.Add(new Cliente { Nome = "Bruno", Uf = "RJ" });
db.SaveChanges();

Console.WriteLine($"Clientes cadastrados: {db.Clientes.Count()}");
var ana = db.Clientes.First(c => c.Nome == "Ana");
Console.WriteLine($"Id da Ana: {ana.Id}");

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string Uf { get; set; } = "";
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=loja.db");
}`,
      saidaEsperada: "Clientes cadastrados: 2\nId da Ana: 1",
      padroes: [
        [/class\s+LojaContext\s*:\s*DbContext/, "LojaContext deve herdar de DbContext."],
        [/DbSet\s*<\s*Cliente\s*>\s+Clientes/, "Declare a tabela como DbSet<Cliente> Clientes."],
        [/db\.SaveChanges\s*\(\s*\)/, "Grave as inclusões com db.SaveChanges()."]
      ],
      notaVerificacao: NOTA_EF
    },
    {
      tipo: "completar",
      titulo: "Clientes de SP em ordem alfabética",
      enunciado: `Complete a consulta que busca os clientes de <b>SP</b> em ordem alfabética, sem rastrear as entidades (é só leitura). O EF Core traduz isso para um <code>SELECT ... WHERE ... ORDER BY</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>AsNoTracking()</code> deixa a leitura mais leve; <code>Where</code> filtra; <code>OrderBy</code> ordena; <code>ToList()</code> executa a consulta no banco.`,
      lang: "csharp",
      inicial: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new LojaContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

db.Clientes.AddRange(
    new Cliente { Nome = "Carla", Uf = "SP" },
    new Cliente { Nome = "Bruno", Uf = "RJ" },
    new Cliente { Nome = "Ana", Uf = "SP" },
    new Cliente { Nome = "Diego", Uf = "SP" });
db.SaveChanges();

var paulistas = db.Clientes
    .____()
    .____(c => c.Uf == "SP")
    .____(c => c.Nome)
    .ToList();

foreach (var c in paulistas)
    Console.WriteLine(c.Nome);

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string Uf { get; set; } = "";
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=loja.db");
}
`,
      solucao: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new LojaContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

db.Clientes.AddRange(
    new Cliente { Nome = "Carla", Uf = "SP" },
    new Cliente { Nome = "Bruno", Uf = "RJ" },
    new Cliente { Nome = "Ana", Uf = "SP" },
    new Cliente { Nome = "Diego", Uf = "SP" });
db.SaveChanges();

var paulistas = db.Clientes
    .AsNoTracking()
    .Where(c => c.Uf == "SP")
    .OrderBy(c => c.Nome)
    .ToList();

foreach (var c in paulistas)
    Console.WriteLine(c.Nome);

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string Uf { get; set; } = "";
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=loja.db");
}`,
      saidaEsperada: "Ana\nCarla\nDiego",
      padroes: [
        [/\.AsNoTracking\s*\(\s*\)/, "Use AsNoTracking() na consulta de leitura."],
        [/\.Where\s*\(\s*(\w+)\s*=>\s*\1\.Uf\s*==\s*"SP"\s*\)/, 'Filtre com Where(c => c.Uf == "SP").'],
        [/\.OrderBy\s*\(\s*(\w+)\s*=>\s*\1\.Nome\s*\)/, "Ordene com OrderBy(c => c.Nome)."]
      ],
      notaVerificacao: NOTA_EF
    },
    {
      tipo: "completar",
      titulo: "Pedidos de cada cliente com Include",
      enunciado: `Cada cliente tem uma lista de pedidos (relacionamento 1 para N). Complete a propriedade de navegação, o <code>Include</code> que carrega os pedidos na mesma consulta (evitando o problema N+1) e a soma dos valores.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A navegação é <code>List&lt;Pedido&gt; Pedidos</code>. <code>Include(c =&gt; c.Pedidos)</code> faz o JOIN. Somar em memória: <code>c.Pedidos.Sum(p =&gt; p.Valor)</code>.`,
      lang: "csharp",
      inicial: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new LojaContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

var ana = new Cliente { Nome = "Ana" };
ana.Pedidos.Add(new Pedido { Valor = 100 });
ana.Pedidos.Add(new Pedido { Valor = 250 });
var bruno = new Cliente { Nome = "Bruno" };
bruno.Pedidos.Add(new Pedido { Valor = 80 });
db.Clientes.AddRange(ana, bruno);
db.SaveChanges();
db.ChangeTracker.Clear(); // esquece o que está na memória para ler do banco

var clientes = db.Clientes
    .____(c => c.Pedidos)
    .OrderBy(c => c.Nome)
    .ToList();

foreach (var c in clientes)
    Console.WriteLine($"{c.Nome}: {c.Pedidos.Count} pedido(s), total {c.Pedidos.____(p => p.Valor)}");

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public ____<Pedido> Pedidos { get; set; } = new();
}

public class Pedido
{
    public int Id { get; set; }
    public int Valor { get; set; }
    public int ClienteId { get; set; }
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Pedido> Pedidos => Set<Pedido>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=loja.db");
}
`,
      solucao: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new LojaContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

var ana = new Cliente { Nome = "Ana" };
ana.Pedidos.Add(new Pedido { Valor = 100 });
ana.Pedidos.Add(new Pedido { Valor = 250 });
var bruno = new Cliente { Nome = "Bruno" };
bruno.Pedidos.Add(new Pedido { Valor = 80 });
db.Clientes.AddRange(ana, bruno);
db.SaveChanges();
db.ChangeTracker.Clear(); // esquece o que está na memória para ler do banco

var clientes = db.Clientes
    .Include(c => c.Pedidos)
    .OrderBy(c => c.Nome)
    .ToList();

foreach (var c in clientes)
    Console.WriteLine($"{c.Nome}: {c.Pedidos.Count} pedido(s), total {c.Pedidos.Sum(p => p.Valor)}");

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public List<Pedido> Pedidos { get; set; } = new();
}

public class Pedido
{
    public int Id { get; set; }
    public int Valor { get; set; }
    public int ClienteId { get; set; }
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Pedido> Pedidos => Set<Pedido>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=loja.db");
}`,
      saidaEsperada: "Ana: 2 pedido(s), total 350\nBruno: 1 pedido(s), total 80",
      padroes: [
        [/List\s*<\s*Pedido\s*>\s+Pedidos/, "A navegação deve ser List<Pedido> Pedidos."],
        [/\.Include\s*\(\s*(\w+)\s*=>\s*\1\.Pedidos\s*\)/, "Carregue os pedidos com Include(c => c.Pedidos)."],
        [/Pedidos\.Sum\s*\(/, "Some os valores com c.Pedidos.Sum(p => p.Valor)."]
      ],
      notaVerificacao: NOTA_EF
    },
    {
      tipo: "criar",
      titulo: "CRUD do estoque com EF Core",
      enunciado: `Crie a entidade <code>Produto</code> (<code>Id</code>, <code>Nome</code>, <code>int Estoque</code>) e o contexto <code>EstoqueContext</code> com <code>DbSet&lt;Produto&gt; Produtos</code> usando SQLite (<code>estoque.db</code>). No programa (recriando o banco no início):
        <ol>
          <li>cadastre Caneta (100), Caderno (20) e Borracha (5), grave e imprima <code>Cadastrados: 3</code>;</li>
          <li>busque a Caneta, mude o estoque para 50, grave e imprima <code>Caneta agora tem 50 unidades</code>;</li>
          <li>remova a Borracha e grave;</li>
          <li>imprima <code>Restantes: Caderno (20), Caneta (50)</code> (ordem alfabética).</li>
        </ol>`,
      dica: `Atualizar = buscar a entidade, mudar a propriedade e chamar <code>SaveChanges()</code> (o EF percebe a mudança). Remover = <code>db.Produtos.Remove(entidade)</code> + <code>SaveChanges()</code>.`,
      lang: "csharp",
      inicial: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

// 1) crie o contexto e recrie o banco
// 2) cadastrar, atualizar, remover e listar (gravando a cada passo)
// 3) declare a entidade e o contexto no fim do arquivo
`,
      solucao: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new EstoqueContext();
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

// Create
db.Produtos.AddRange(
    new Produto { Nome = "Caneta", Estoque = 100 },
    new Produto { Nome = "Caderno", Estoque = 20 },
    new Produto { Nome = "Borracha", Estoque = 5 });
db.SaveChanges();
Console.WriteLine($"Cadastrados: {db.Produtos.Count()}");

// Update
var caneta = db.Produtos.First(p => p.Nome == "Caneta");
caneta.Estoque = 50;
db.SaveChanges();
Console.WriteLine($"Caneta agora tem {caneta.Estoque} unidades");

// Delete
var borracha = db.Produtos.First(p => p.Nome == "Borracha");
db.Produtos.Remove(borracha);
db.SaveChanges();

// Read
var restantes = db.Produtos.OrderBy(p => p.Nome).ToList();
Console.WriteLine("Restantes: " + string.Join(", ", restantes.Select(p => p.Nome + " (" + p.Estoque + ")")));

public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public int Estoque { get; set; }
}

public class EstoqueContext : DbContext
{
    public DbSet<Produto> Produtos => Set<Produto>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=estoque.db");
}`,
      saidaEsperada: "Cadastrados: 3\nCaneta agora tem 50 unidades\nRestantes: Caderno (20), Caneta (50)",
      padroes: [
        [/class\s+EstoqueContext\s*:\s*DbContext/, "EstoqueContext deve herdar de DbContext."],
        [/DbSet\s*<\s*Produto\s*>\s+Produtos/, "Declare DbSet<Produto> Produtos."],
        [/\.Find\s*\(|\.First(OrDefault)?\s*\(|\.Single(OrDefault)?\s*\(/, "Busque o produto para atualizar (Find, First ou FirstOrDefault)."],
        [/\.Remove\s*\(/, "Remova a Borracha com Remove(...)."],
        [/SaveChanges\s*\(\s*\)/, "Grave as alterações com SaveChanges()."]
      ],
      notaVerificacao: NOTA_EF
    },
    {
      tipo: "criar",
      titulo: "Ranking de clientes assíncrono com projeção",
      enunciado: `Numa API, o acesso ao banco deve ser <b>assíncrono</b>. Usando as entidades prontas, faça tudo com os métodos <code>...Async</code>:
        <ol>
          <li>recrie o banco (<code>EnsureDeletedAsync</code>/<code>EnsureCreatedAsync</code>);</li>
          <li>cadastre Ana (3 pedidos), Bruno (0) e Carla (2) e grave com <code>SaveChangesAsync</code>;</li>
          <li>com uma única consulta, ordene pela quantidade de pedidos (maior primeiro) e projete com <code>Select</code> para <code>new ResumoCliente(Nome, QtdPedidos)</code>, usando <code>ToListAsync</code>;</li>
          <li>imprima cada linha como <code>Nome: N pedido(s)</code>.</li>
        </ol>`,
      dica: `<code>Select(c =&gt; new ResumoCliente(c.Nome, c.Pedidos.Count))</code> vira um SELECT com COUNT no banco, sem carregar os pedidos. Faça o <code>OrderByDescending(c =&gt; c.Pedidos.Count)</code> antes do <code>Select</code>.`,
      lang: "csharp",
      inicial: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

// escreva aqui o programa assíncrono (passos 1 a 4)

public record ResumoCliente(string Nome, int QtdPedidos);

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public List<Pedido> Pedidos { get; set; } = new();
}

public class Pedido
{
    public int Id { get; set; }
    public int Valor { get; set; }
    public int ClienteId { get; set; }
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Pedido> Pedidos => Set<Pedido>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=ranking.db");
}
`,
      solucao: c`// dotnet add package Microsoft.EntityFrameworkCore.Sqlite
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

await using var db = new LojaContext();
await db.Database.EnsureDeletedAsync();
await db.Database.EnsureCreatedAsync();

var ana = new Cliente { Nome = "Ana" };
ana.Pedidos.Add(new Pedido { Valor = 50 });
ana.Pedidos.Add(new Pedido { Valor = 70 });
ana.Pedidos.Add(new Pedido { Valor = 30 });
var bruno = new Cliente { Nome = "Bruno" };
var carla = new Cliente { Nome = "Carla" };
carla.Pedidos.Add(new Pedido { Valor = 90 });
carla.Pedidos.Add(new Pedido { Valor = 15 });
db.Clientes.AddRange(ana, bruno, carla);
await db.SaveChangesAsync();

var ranking = await db.Clientes
    .OrderByDescending(c => c.Pedidos.Count)
    .Select(c => new ResumoCliente(c.Nome, c.Pedidos.Count))
    .ToListAsync();

foreach (var r in ranking)
    Console.WriteLine($"{r.Nome}: {r.QtdPedidos} pedido(s)");

public record ResumoCliente(string Nome, int QtdPedidos);

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public List<Pedido> Pedidos { get; set; } = new();
}

public class Pedido
{
    public int Id { get; set; }
    public int Valor { get; set; }
    public int ClienteId { get; set; }
}

public class LojaContext : DbContext
{
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Pedido> Pedidos => Set<Pedido>();

    protected override void OnConfiguring(DbContextOptionsBuilder opcoes)
        => opcoes.UseSqlite("Data Source=ranking.db");
}`,
      saidaEsperada: "Ana: 3 pedido(s)\nCarla: 2 pedido(s)\nBruno: 0 pedido(s)",
      padroes: [
        [/await\s+db\.SaveChangesAsync\s*\(/, "Grave com await db.SaveChangesAsync()."],
        [/\.OrderByDescending\s*\(/, "Ordene com OrderByDescending (maior quantidade primeiro)."],
        [/\.Select\s*\(\s*\w+\s*=>\s*new\s+ResumoCliente\s*\(/, "Projete com Select(c => new ResumoCliente(...))."],
        [/await\s+[\s\S]*\.ToListAsync\s*\(\s*\)/, "Execute a consulta com await ... ToListAsync()."]
      ],
      notaVerificacao: NOTA_EF
    }
  ],

  a3: [
    {
      tipo: "completar",
      titulo: "Regras de frete abertas para extensão",
      enunciado: `A transportadora tem várias regras de frete. Cada regra é uma classe que implementa <code>IRegraFrete</code>; para criar uma nova regra, basta uma classe nova (princípio <b>Aberto/Fechado</b>).
        Complete a interface, a implementação que falta e o laço. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Declare com <code>public interface</code>. A classe implementa com <code>:</code>. No laço, a variável pode ser do tipo da interface.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;

int peso = 3;
var regras = new List<IRegraFrete> { new FreteNormal(), new FreteExpresso() };

foreach (____ regra in regras)
    Console.WriteLine($"{regra.GetType().Name}: {regra.Calcular(peso)}");

public ____ IRegraFrete
{
    int Calcular(int peso);
}

public class FreteNormal : IRegraFrete
{
    public int Calcular(int peso) => peso * 5;
}

public class FreteExpresso ____ IRegraFrete
{
    public int Calcular(int peso) => peso * 8 + 10;
}
`,
      solucao: c`using System;
using System.Collections.Generic;

int peso = 3;
var regras = new List<IRegraFrete> { new FreteNormal(), new FreteExpresso() };

foreach (IRegraFrete regra in regras)
    Console.WriteLine($"{regra.GetType().Name}: {regra.Calcular(peso)}");

public interface IRegraFrete
{
    int Calcular(int peso);
}

public class FreteNormal : IRegraFrete
{
    public int Calcular(int peso) => peso * 5;
}

public class FreteExpresso : IRegraFrete
{
    public int Calcular(int peso) => peso * 8 + 10;
}`,
      saidaEsperada: "FreteNormal: 15\nFreteExpresso: 34",
      padroes: [
        [/foreach\s*\(\s*(IRegraFrete|var)\s+regra\s+in\s+regras\s*\)/, "Percorra com foreach (IRegraFrete regra in regras)."],
        [/interface\s+IRegraFrete/, "Declare public interface IRegraFrete."],
        [/class\s+FreteExpresso\s*:\s*IRegraFrete/, "FreteExpresso deve implementar IRegraFrete."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Responsabilidade única no recibo",
      enunciado: `Antes, uma única classe calculava o pedido <b>e</b> montava o recibo. Agora cada classe tem uma só responsabilidade: <code>CalculadoraPedido</code> calcula (R$ 10 de desconto a partir de R$ 100) e <code>ImpressoraRecibo</code> formata o texto.
        Complete as chamadas. Substitua cada <code>____</code> pelo que falta.`,
      dica: `A soma dos itens é <code>itens.Sum()</code>. O programa principal só coordena: pede o total para a calculadora e o texto para a impressora.`,
      lang: "csharp",
      inicial: c`using System;
using System.Linq;

int[] itens = { 30, 45, 25 };
var calculadora = new CalculadoraPedido();
var impressora = new ImpressoraRecibo();

int total = calculadora.____(itens);
Console.WriteLine(impressora.____(itens.Length, total));

public class CalculadoraPedido
{
    public int Calcular(int[] itens)
    {
        int soma = itens.____();
        return soma >= 100 ? soma - 10 : soma;
    }
}

public class ImpressoraRecibo
{
    public string Formatar(int quantidade, int total) => $"{quantidade} itens - Total: R$ {total}";
}
`,
      solucao: c`using System;
using System.Linq;

int[] itens = { 30, 45, 25 };
var calculadora = new CalculadoraPedido();
var impressora = new ImpressoraRecibo();

int total = calculadora.Calcular(itens);
Console.WriteLine(impressora.Formatar(itens.Length, total));

public class CalculadoraPedido
{
    public int Calcular(int[] itens)
    {
        int soma = itens.Sum();
        return soma >= 100 ? soma - 10 : soma;
    }
}

public class ImpressoraRecibo
{
    public string Formatar(int quantidade, int total) => $"{quantidade} itens - Total: R$ {total}";
}`,
      saidaEsperada: "3 itens - Total: R$ 90",
      padroes: [
        [/calculadora\.Calcular\s*\(\s*itens\s*\)/, "Peça o total com calculadora.Calcular(itens)."],
        [/impressora\.Formatar\s*\(/, "Peça o texto com impressora.Formatar(...)."],
        [/itens\.Sum\s*\(\s*\)/, "Some os itens com itens.Sum()."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Primeiro teste com [Fact]",
      enunciado: `Escreva o primeiro teste automatizado com <b>xUnit</b>: ele confere que <code>Calculadora.Somar(2, 3)</code> devolve 5.
        Complete o atributo do teste e a verificação. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Um teste sem parâmetros é marcado com <code>[Fact]</code>. A verificação é <code>Assert.Equal(esperado, obtido)</code>, com o esperado primeiro.`,
      lang: "csharp",
      inicial: c`// dotnet new xunit -n Testes
using Xunit;

public class Calculadora
{
    public int Somar(int a, int b) => a + b;
}

public class CalculadoraTests
{
    [____]
    public void Somar_dois_numeros_devolve_a_soma()
    {
        // Arrange (preparar)
        var calc = new Calculadora();

        // Act (agir)
        int resultado = calc.Somar(2, 3);

        // Assert (conferir)
        Assert.____(5, resultado);
    }
}
`,
      solucao: c`// dotnet new xunit -n Testes
using Xunit;

public class Calculadora
{
    public int Somar(int a, int b) => a + b;
}

public class CalculadoraTests
{
    [Fact]
    public void Somar_dois_numeros_devolve_a_soma()
    {
        // Arrange (preparar)
        var calc = new Calculadora();

        // Act (agir)
        int resultado = calc.Somar(2, 3);

        // Assert (conferir)
        Assert.Equal(5, resultado);
    }
}`,
      saidaEsperada: "dotnet test → Aprovado! Com falha: 0, Aprovado: 1, Ignorado: 0, Total: 1\n(em inglês: Passed! - Failed: 0, Passed: 1, Skipped: 0, Total: 1)",
      padroes: [
        [/\[Fact\]/, "Marque o teste com [Fact]."],
        [/Assert\.Equal\s*\(\s*5\s*,\s*resultado\s*\)/, "Confira com Assert.Equal(5, resultado)."]
      ],
      notaVerificacao: NOTA_XUNIT
    },
    {
      tipo: "criar",
      titulo: "Vários casos com Theory e InlineData",
      enunciado: `A classe <code>Desconto</code> tem o método <code>int Aplicar(int valor, int percentual)</code> (já pronto). Crie a classe de testes <code>DescontoTests</code> com <b>um único</b> método marcado com <code>[Theory]</code>
        e três <code>[InlineData]</code>: (100, 10, 90), (200, 15, 170) e (50, 0, 50). O método recebe <code>valor</code>, <code>percentual</code> e <code>esperado</code> e confere com <code>Assert.Equal</code>.`,
      dica: `<code>[Theory]</code> marca um teste com parâmetros; cada <code>[InlineData(a, b, c)]</code> vira uma execução separada do mesmo teste.`,
      lang: "csharp",
      inicial: c`// dotnet new xunit -n Testes
using Xunit;

public class Desconto
{
    public int Aplicar(int valor, int percentual) => valor - valor * percentual / 100;
}

// crie aqui a classe de testes com um teste parametrizado
`,
      solucao: c`// dotnet new xunit -n Testes
using Xunit;

public class Desconto
{
    public int Aplicar(int valor, int percentual) => valor - valor * percentual / 100;
}

public class DescontoTests
{
    [Theory]
    [InlineData(100, 10, 90)]
    [InlineData(200, 15, 170)]
    [InlineData(50, 0, 50)]
    public void Aplicar_calcula_o_valor_com_desconto(int valor, int percentual, int esperado)
    {
        var desconto = new Desconto();

        int resultado = desconto.Aplicar(valor, percentual);

        Assert.Equal(esperado, resultado);
    }
}`,
      saidaEsperada: "dotnet test → Aprovado! Com falha: 0, Aprovado: 3, Ignorado: 0, Total: 3\n(em inglês: Passed! - Failed: 0, Passed: 3, Skipped: 0, Total: 3)",
      padroes: [
        [/class\s+DescontoTests/, "Crie a classe DescontoTests."],
        [/\[Theory\]/, "Marque o teste com [Theory]."],
        [/(\[InlineData\s*\([^)]*\)\][\s\S]*){3}/, "Use três [InlineData(...)]: um para cada caso."],
        [/\[InlineData\s*\(\s*200\s*,\s*15\s*,\s*170\s*\)\]/, "Inclua o caso [InlineData(200, 15, 170)]."],
        [/Assert\.Equal\s*\(\s*esperado\s*,/, "Confira com Assert.Equal(esperado, resultado)."]
      ],
      notaVerificacao: NOTA_XUNIT
    },
    {
      tipo: "criar",
      titulo: "Cadastro que depende de abstração",
      enunciado: `Aplique a <b>Inversão de Dependência</b> no cadastro de clientes:
        <ul>
          <li>crie a interface <code>IRepositorioClientes</code> com <code>bool EmailExiste(string email)</code>;</li>
          <li>crie <code>RepositorioFalso</code>, que implementa a interface usando uma lista em memória com <code>"ana@email.com"</code>;</li>
          <li>crie <code>CadastroService</code>, que recebe <code>IRepositorioClientes</code> no construtor (guardando num campo <code>private readonly</code>) e tem <code>string Cadastrar(string email)</code>: devolve <code>"E-mail já cadastrado"</code> se existir, senão <code>"Cadastro realizado"</code>.</li>
        </ul>
        O código de cima já usa as classes.`,
      dica: `O <code>CadastroService</code> não sabe se os dados vêm de um banco real ou de uma lista: ele só conhece a interface. Isso permite testá-lo sem banco.`,
      lang: "csharp",
      inicial: c`using System;
using System.Collections.Generic;

var servico = new CadastroService(new RepositorioFalso());
Console.WriteLine("ana@email.com: " + servico.Cadastrar("ana@email.com"));
Console.WriteLine("bia@email.com: " + servico.Cadastrar("bia@email.com"));

// declare aqui a interface, o repositório falso e o serviço
`,
      solucao: c`using System;
using System.Collections.Generic;

var servico = new CadastroService(new RepositorioFalso());
Console.WriteLine("ana@email.com: " + servico.Cadastrar("ana@email.com"));
Console.WriteLine("bia@email.com: " + servico.Cadastrar("bia@email.com"));

public interface IRepositorioClientes
{
    bool EmailExiste(string email);
}

public class RepositorioFalso : IRepositorioClientes
{
    private readonly List<string> _emails = new() { "ana@email.com" };
    public bool EmailExiste(string email) => _emails.Contains(email);
}

public class CadastroService
{
    private readonly IRepositorioClientes _repo;

    public CadastroService(IRepositorioClientes repo)
    {
        _repo = repo;
    }

    public string Cadastrar(string email) =>
        _repo.EmailExiste(email) ? "E-mail já cadastrado" : "Cadastro realizado";
}`,
      saidaEsperada: "ana@email.com: E-mail já cadastrado\nbia@email.com: Cadastro realizado",
      padroes: [
        [/interface\s+IRepositorioClientes/, "Crie a interface IRepositorioClientes."],
        [/class\s+RepositorioFalso\s*:\s*IRepositorioClientes/, "RepositorioFalso deve implementar IRepositorioClientes."],
        [/private\s+readonly\s+IRepositorioClientes\s+\w+/, "Guarde a dependência num campo private readonly IRepositorioClientes."],
        [/CadastroService\s*\(\s*IRepositorioClientes\s+\w+\s*\)/, "O construtor de CadastroService deve receber um IRepositorioClientes."]
      ]
    }
  ],
  // ───────── Nível Iniciante ─────────
  p1: [
    {
      tipo: "completar",
      titulo: "Placa da padaria",
      enunciado: `A padaria Pão Quente quer um programa que mostre a placa da porta. Faltam o nome do comando e o texto da segunda linha.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Padaria Pão Quente</code><br><code>Aberta das 6h às 20h</code>`,
      dica: `O comando que mostra uma linha na tela é <code>Console.WriteLine</code>. Texto vai entre aspas duplas.`,
      lang: "csharp",
      inicial: c`using System;

Console.____("Padaria Pão Quente");
Console.WriteLine(____);
`,
      solucao: c`using System;

Console.WriteLine("Padaria Pão Quente");
Console.WriteLine("Aberta das 6h às 20h");`,
      saidaEsperada: "Padaria Pão Quente\nAberta das 6h às 20h",
      padroes: [
        [/Console\.WriteLine\(\s*"Padaria Pão Quente"\s*\)\s*;/, 'A primeira linha deve ser Console.WriteLine("Padaria Pão Quente");'],
        [/Console\.WriteLine\(\s*"Aberta das 6h às 20h"\s*\)\s*;/, 'Escreva o texto "Aberta das 6h às 20h" entre aspas duplas.']
      ]
    },
    {
      tipo: "completar",
      titulo: "O ponto e vírgula que faltou",
      enunciado: `O entregador escreveu este programa, mas ele não roda: falta o sinal do fim da primeira instrução e o começo da segunda.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Pedido recebido</code><br><code>Saiu para entrega</code>`,
      dica: `Toda instrução em C# termina com <code>;</code>. E o “dono” do <code>WriteLine</code> é o <code>Console</code> (com C maiúsculo).`,
      lang: "csharp",
      inicial: c`using System;

Console.WriteLine("Pedido recebido")____
____.WriteLine("Saiu para entrega");
`,
      solucao: c`using System;

Console.WriteLine("Pedido recebido");
Console.WriteLine("Saiu para entrega");`,
      saidaEsperada: "Pedido recebido\nSaiu para entrega",
      padroes: [
        [/Console\.WriteLine\(\s*"Pedido recebido"\s*\)\s*;/, "Coloque o ; no fim da primeira instrução."],
        [/Console\.WriteLine\(\s*"Saiu para entrega"\s*\)\s*;/, "A segunda linha deve começar com Console (C maiúsculo)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Lista de compras",
      enunciado: `Complete a lista de compras do mercado: falta o nome do “pacote” de ferramentas no <code>using</code> e a última linha, que deve mostrar <code>Café</code>.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Lista de compras:</code><br><code>Arroz</code><br><code>Feijão</code><br><code>Café</code>`,
      dica: `O <code>Console</code> mora em <code>System</code>. No último retângulo escreva a instrução inteira, igual às de cima, mas com o texto <code>"Café"</code>.`,
      lang: "csharp",
      inicial: c`using ____;

Console.WriteLine("Lista de compras:");
Console.WriteLine("Arroz");
Console.WriteLine("Feijão");
____
`,
      solucao: c`using System;

Console.WriteLine("Lista de compras:");
Console.WriteLine("Arroz");
Console.WriteLine("Feijão");
Console.WriteLine("Café");`,
      saidaEsperada: "Lista de compras:\nArroz\nFeijão\nCafé",
      padroes: [
        [/using\s+System\s*;/, "A primeira linha deve ser using System;"],
        [/Console\.WriteLine\(\s*"Café"\s*\)\s*;/, 'Escreva Console.WriteLine("Café"); na última linha.'],
        [/"Feijão"[\s\S]*"Café"/, "Café deve aparecer depois de Feijão."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Cartão de boas-vindas",
      enunciado: `A Loja Bom Preço quer mostrar uma mensagem na tela do caixa. Escreva um programa que mostre exatamente estas três linhas, nesta ordem:<br>
        <code>Bem-vindo à Loja Bom Preço</code><br><code>Hoje tem promoção</code><br><code>Volte sempre!</code>`,
      dica: `Use um <code>Console.WriteLine("...");</code> para cada linha. Não esqueça as aspas e o <code>;</code>.`,
      lang: "csharp",
      inicial: c`using System;

// Mostre as três frases do enunciado, uma por linha
`,
      solucao: c`using System;

Console.WriteLine("Bem-vindo à Loja Bom Preço");
Console.WriteLine("Hoje tem promoção");
Console.WriteLine("Volte sempre!");`,
      saidaEsperada: "Bem-vindo à Loja Bom Preço\nHoje tem promoção\nVolte sempre!",
      padroes: [
        [/Console\.WriteLine\(\s*"Bem-vindo à Loja Bom Preço"\s*\)\s*;/, 'Mostre "Bem-vindo à Loja Bom Preço" com Console.WriteLine (e termine com ;).'],
        [/Console\.WriteLine\(\s*"Hoje tem promoção"\s*\)\s*;/, 'Mostre "Hoje tem promoção" com Console.WriteLine.'],
        [/Console\.WriteLine\(\s*"Volte sempre!"\s*\)\s*;/, 'Mostre "Volte sempre!" com Console.WriteLine.'],
        [/"Bem-vindo à Loja Bom Preço"[\s\S]*"Hoje tem promoção"[\s\S]*"Volte sempre!"/, "As três frases devem estar na ordem do enunciado."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Horário da clínica",
      enunciado: `A recepção da Clínica Sorriso quer mostrar os horários de atendimento. Escreva um programa que mostre exatamente:<br>
        <code>Clínica Sorriso</code><br><code>Segunda a sexta: 8h às 18h</code><br><code>Sábado: 8h às 12h</code><br><code>Domingo: fechado</code>`,
      dica: `Quatro linhas na tela = quatro <code>Console.WriteLine</code>, um embaixo do outro.`,
      lang: "csharp",
      inicial: c`using System;

// Mostre o nome da clínica e os três horários, uma linha cada
`,
      solucao: c`using System;

Console.WriteLine("Clínica Sorriso");
Console.WriteLine("Segunda a sexta: 8h às 18h");
Console.WriteLine("Sábado: 8h às 12h");
Console.WriteLine("Domingo: fechado");`,
      saidaEsperada: "Clínica Sorriso\nSegunda a sexta: 8h às 18h\nSábado: 8h às 12h\nDomingo: fechado",
      padroes: [
        [/Console\.WriteLine\(\s*"Clínica Sorriso"\s*\)\s*;/, 'A primeira linha deve mostrar "Clínica Sorriso".'],
        [/Console\.WriteLine\(\s*"Segunda a sexta: 8h às 18h"\s*\)\s*;/, 'Mostre "Segunda a sexta: 8h às 18h".'],
        [/Console\.WriteLine\(\s*"Sábado: 8h às 12h"\s*\)\s*;/, 'Mostre "Sábado: 8h às 12h".'],
        [/"Clínica Sorriso"[\s\S]*"Segunda a sexta[\s\S]*"Sábado[\s\S]*Console\.WriteLine\(\s*"Domingo: fechado"\s*\)\s*;/, 'Termine com "Domingo: fechado", mantendo a ordem do enunciado.']
      ]
    }
  ],
  p2: [
    {
      tipo: "completar",
      titulo: "Soma das vendas",
      enunciado: `A sorveteria vendeu 120 picolés de manhã e 80 à tarde. Ela também recebeu 6 caixas com 4 potes cada.
        Complete os sinais das contas. Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Total vendido: 200</code><br><code>Potes recebidos: 24</code>`,
      dica: `Somar é <code>+</code> e multiplicar (“vezes”) é <code>*</code>.`,
      lang: "csharp",
      inicial: c`using System;

Console.WriteLine("Total vendido: " + (120 ____ 80));
Console.WriteLine("Potes recebidos: " + (6 ____ 4));
`,
      solucao: c`using System;

Console.WriteLine("Total vendido: " + (120 + 80));
Console.WriteLine("Potes recebidos: " + (6 * 4));`,
      saidaEsperada: "Total vendido: 200\nPotes recebidos: 24",
      padroes: [
        [/\(\s*120\s*\+\s*80\s*\)/, "O total vendido é 120 + 80."],
        [/\(\s*6\s*\*\s*4\s*\)/, "Os potes recebidos são 6 * 4 (use o asterisco para multiplicar)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Dividindo os pães",
      enunciado: `Há 25 pães para dividir igualmente entre 4 pessoas. Mostre quantos pães inteiros cada pessoa leva e quantos sobram.
        Clique em cada retângulo e escreva o sinal que falta. A saída deve ser exatamente:<br><code>Cada pessoa leva: 6</code><br><code>Sobram: 1</code>`,
      dica: `Dividir inteiros com <code>/</code> joga fora o resto; o resto em si sai com <code>%</code>.`,
      lang: "csharp",
      inicial: c`using System;

Console.WriteLine("Cada pessoa leva: " + (25 ____ 4));
Console.WriteLine("Sobram: " + (25 ____ 4));
`,
      solucao: c`using System;

Console.WriteLine("Cada pessoa leva: " + (25 / 4));
Console.WriteLine("Sobram: " + (25 % 4));`,
      saidaEsperada: "Cada pessoa leva: 6\nSobram: 1",
      padroes: [
        [/"Cada pessoa leva: "\s*\+\s*\(\s*25\s*\/\s*4\s*\)/, "Quantos cada um leva: divida com / (25 / 4)."],
        [/"Sobram: "\s*\+\s*\(\s*25\s*%\s*4\s*\)/, "O que sobra é o resto da divisão: use % (25 % 4)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Parênteses no lugar certo",
      enunciado: `Um cliente comprou um lanche de 30 reais e um suco de 15. O programa mostrou <code>Total: 3015</code>, porque juntou os números como texto!
        Coloque parênteses em volta da conta para ela ser feita antes. Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Total: 45</code>`,
      dica: `Um retângulo recebe <code>(</code> e o outro recebe <code>)</code>.`,
      lang: "csharp",
      inicial: c`using System;

Console.WriteLine("Total: " + ____30 + 15____);
`,
      solucao: c`using System;

Console.WriteLine("Total: " + (30 + 15));`,
      saidaEsperada: "Total: 45",
      padroes: [
        [/"Total: "\s*\+\s*\(\s*30\s*\+\s*15\s*\)\s*\)\s*;/, "A conta 30 + 15 deve ficar entre parênteses: (30 + 15)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Conta do almoço",
      enunciado: `Uma família pediu <b>3 pratos de 18 reais</b> e <b>2 sobremesas de 7 reais</b>. Faça o C# calcular (com <code>*</code> e <code>+</code>, sem fazer a conta de cabeça) e mostre exatamente:<br>
        <code>Pratos: 54</code><br><code>Sobremesas: 14</code><br><code>Total: 68</code>`,
      dica: `Junte o texto com a conta entre parênteses, por exemplo <code>"Pratos: " + (... * ...)</code>. No total, some as duas multiplicações.`,
      lang: "csharp",
      inicial: c`using System;

// 1) Mostre o valor dos pratos (quantidade vezes preço)
// 2) Mostre o valor das sobremesas
// 3) Mostre o total da conta
`,
      solucao: c`using System;

Console.WriteLine("Pratos: " + (3 * 18));
Console.WriteLine("Sobremesas: " + (2 * 7));
Console.WriteLine("Total: " + (3 * 18 + 2 * 7));`,
      saidaEsperada: "Pratos: 54\nSobremesas: 14\nTotal: 68",
      padroes: [
        [/3\s*\*\s*18|18\s*\*\s*3/, "Calcule os pratos com 3 * 18."],
        [/2\s*\*\s*7|7\s*\*\s*2/, "Calcule as sobremesas com 2 * 7."],
        [/"Total: "\s*\+\s*\(/, 'No total, coloque a conta entre parênteses depois de "Total: " + .'],
        [/"Total: "\s*\+\s*\([^;]*\+[^;]*\)/, "O total deve somar (+) as duas partes."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Ovos em caixas",
      enunciado: `A granja tem <b>50 ovos</b> e cada caixa leva <b>12</b>. Use <code>/</code> e <code>%</code> para mostrar exatamente:<br>
        <code>Caixas cheias: 4</code><br><code>Ovos soltos: 2</code>`,
      dica: `Caixas cheias é a divisão inteira; os ovos que sobram são o resto.`,
      lang: "csharp",
      inicial: c`using System;

// Mostre quantas caixas ficam cheias e quantos ovos sobram
`,
      solucao: c`using System;

Console.WriteLine("Caixas cheias: " + (50 / 12));
Console.WriteLine("Ovos soltos: " + (50 % 12));`,
      saidaEsperada: "Caixas cheias: 4\nOvos soltos: 2",
      padroes: [
        [/50\s*\/\s*12/, "Calcule as caixas cheias com 50 / 12."],
        [/50\s*%\s*12/, "Calcule os ovos soltos com o resto: 50 % 12."],
        [/"Caixas cheias: "/, 'Mostre o texto "Caixas cheias: " antes do número.'],
        [/"Ovos soltos: "/, 'Mostre o texto "Ovos soltos: " antes do número.']
      ]
    }
  ],
  p3: [
    {
      tipo: "completar",
      titulo: "Ficha do cliente",
      enunciado: `O mercadinho guarda os dados de um cliente em variáveis. Falta o tipo da variável de texto e o valor de <code>vip</code>, que deve ser verdadeiro.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Cliente: Carlos</code><br><code>Idade: 41</code><br><code>VIP: True</code>`,
      dica: `Texto é <code>string</code>. Verdadeiro em C# é <code>true</code>, com letra minúscula (na tela ele aparece como <code>True</code>).`,
      lang: "csharp",
      inicial: c`using System;

____ nome = "Carlos";
int idade = 41;
bool vip = ____;

Console.WriteLine("Cliente: " + nome);
Console.WriteLine("Idade: " + idade);
Console.WriteLine("VIP: " + vip);
`,
      solucao: c`using System;

string nome = "Carlos";
int idade = 41;
bool vip = true;

Console.WriteLine("Cliente: " + nome);
Console.WriteLine("Idade: " + idade);
Console.WriteLine("VIP: " + vip);`,
      saidaEsperada: "Cliente: Carlos\nIdade: 41\nVIP: True",
      padroes: [
        [/string\s+nome\s*=\s*"Carlos"\s*;/, "nome é um texto: o tipo é string."],
        [/bool\s+vip\s*=\s*true\s*;/, "vip deve receber true (minúsculo)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Total do pedido",
      enunciado: `Na lanchonete, um cliente pediu 4 sanduíches de 9 reais. Calcule o total multiplicando as variáveis e mostre a variável <code>total</code>.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Total: 36</code>`,
      dica: `Multiplicar é <code>*</code>. Para mostrar o valor da variável, escreva o nome dela sem aspas.`,
      lang: "csharp",
      inicial: c`using System;

int quantidade = 4;
int preco = 9;
int total = quantidade ____ preco;
Console.WriteLine("Total: " + ____);
`,
      solucao: c`using System;

int quantidade = 4;
int preco = 9;
int total = quantidade * preco;
Console.WriteLine("Total: " + total);`,
      saidaEsperada: "Total: 36",
      padroes: [
        [/int\s+total\s*=\s*(quantidade\s*\*\s*preco|preco\s*\*\s*quantidade)\s*;/, "total deve ser quantidade * preco."],
        [/"Total: "\s*\+\s*total\s*\)/, "Mostre a variável total (sem aspas) depois de \"Total: \" + ."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Estoque atualizado",
      enunciado: `A loja tinha 20 camisetas e, depois das vendas, ficou com 15. Troque o valor da variável <code>estoque</code> (sem criar outra) e mostre o novo valor usando <code>$</code> e chaves.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Antes: 20</code><br><code>Depois: 15</code>`,
      dica: `Para trocar o valor, escreva só o nome da variável, sem repetir o <code>int</code>. Dentro do texto com <code>$</code>, a variável vai entre chaves: <code>{estoque}</code>.`,
      lang: "csharp",
      inicial: c`using System;

int estoque = 20;
Console.WriteLine("Antes: " + estoque);

____ = 15;
Console.WriteLine($"Depois: ____");
`,
      solucao: c`using System;

int estoque = 20;
Console.WriteLine("Antes: " + estoque);

estoque = 15;
Console.WriteLine($"Depois: {estoque}");`,
      saidaEsperada: "Antes: 20\nDepois: 15",
      padroes: [
        [/^\s*estoque\s*=\s*15\s*;/m, "Troque o valor com estoque = 15; (sem repetir o tipo int)."],
        [/\$"Depois: \{\s*estoque\s*\}"/, "Dentro do texto, escreva {estoque} para mostrar o valor."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Cadastro de pet",
      enunciado: `O pet shop quer cadastrar um cachorro. Crie as variáveis com os tipos certos:
        <ul>
          <li><code>nomePet</code> (texto) com <code>"Rex"</code>;</li>
          <li><code>idadePet</code> (inteiro) com <code>3</code>;</li>
          <li><code>peso</code> (número com casas decimais, <code>double</code>) com <code>12.5</code>;</li>
          <li><code>vacinado</code> (verdadeiro ou falso) com <code>true</code>.</li>
        </ul>
        Depois mostre exatamente (o peso não precisa aparecer):<br><code>Pet: Rex</code><br><code>Idade: 3 anos</code><br><code>Vacinado: True</code>`,
      dica: `Os tipos são <code>string</code>, <code>int</code>, <code>double</code> e <code>bool</code>. Para mostrar, junte o texto com a variável usando <code>+</code> ou use <code>$"..."</code> com chaves.`,
      lang: "csharp",
      inicial: c`using System;

// 1) Crie as quatro variáveis do enunciado
// 2) Mostre as três linhas pedidas
`,
      solucao: c`using System;

string nomePet = "Rex";
int idadePet = 3;
double peso = 12.5;
bool vacinado = true;

Console.WriteLine("Pet: " + nomePet);
Console.WriteLine($"Idade: {idadePet} anos");
Console.WriteLine("Vacinado: " + vacinado);`,
      saidaEsperada: "Pet: Rex\nIdade: 3 anos\nVacinado: True",
      padroes: [
        [/string\s+nomePet\s*=\s*"Rex"\s*;/, 'Crie string nomePet = "Rex";'],
        [/int\s+idadePet\s*=\s*3\s*;/, "Crie int idadePet = 3;"],
        [/double\s+peso\s*=\s*12\.5\s*;/, "Crie double peso = 12.5; (com ponto)."],
        [/bool\s+vacinado\s*=\s*true\s*;/, "Crie bool vacinado = true;"],
        [/Console\.WriteLine\([^;]*vacinado/, "Mostre a variável vacinado na última linha."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Mesada da semana",
      enunciado: `A Júlia ganha <b>5 reais por dia</b> de mesada. Crie <code>int mesadaDia = 5;</code> e <code>int dias = 7;</code>, calcule <code>total</code> multiplicando as duas variáveis
        e mostre as linhas usando <code>$</code> e chaves. A saída deve ser exatamente:<br><code>Por dia: 5 reais</code><br><code>Total da semana: 35 reais</code>`,
      dica: `<code>int total = mesadaDia * dias;</code> e depois algo como <code>$"Total da semana: {total} reais"</code>.`,
      lang: "csharp",
      inicial: c`using System;

// 1) Crie as variáveis da mesada por dia e da quantidade de dias
// 2) Calcule o total da semana numa terceira variável
// 3) Mostre as duas linhas pedidas
`,
      solucao: c`using System;

int mesadaDia = 5;
int dias = 7;
int total = mesadaDia * dias;

Console.WriteLine($"Por dia: {mesadaDia} reais");
Console.WriteLine($"Total da semana: {total} reais");`,
      saidaEsperada: "Por dia: 5 reais\nTotal da semana: 35 reais",
      padroes: [
        [/int\s+mesadaDia\s*=\s*5\s*;/, "Crie int mesadaDia = 5;"],
        [/int\s+dias\s*=\s*7\s*;/, "Crie int dias = 7;"],
        [/int\s+total\s*=\s*(mesadaDia\s*\*\s*dias|dias\s*\*\s*mesadaDia)\s*;/, "Calcule int total = mesadaDia * dias;"],
        [/\$"Total da semana: \{\s*total\s*\} reais"/, 'Mostre o total com $"Total da semana: {total} reais".']
      ]
    }
  ],
  p4: [
    {
      tipo: "completar",
      titulo: "Frete grátis",
      enunciado: `A loja virtual dá frete grátis para compras de <b>100 reais ou mais</b>. Senão, o frete custa 15 reais.
        Clique em cada retângulo e escreva o que falta. Com <code>total = 150</code>, a saída deve ser exatamente:<br><code>Frete grátis</code>`,
      dica: `“100 ou mais” é maior ou igual: <code>&gt;=</code>. A palavra do “senão” é <code>else</code>.`,
      lang: "csharp",
      inicial: c`using System;

int total = 150;
if (total ____ 100)
{
    Console.WriteLine("Frete grátis");
}
____
{
    Console.WriteLine("Frete: 15 reais");
}
`,
      solucao: c`using System;

int total = 150;
if (total >= 100)
{
    Console.WriteLine("Frete grátis");
}
else
{
    Console.WriteLine("Frete: 15 reais");
}`,
      saidaEsperada: "Frete grátis",
      padroes: [
        [/if\s*\(\s*total\s*>=\s*100\s*\)/, "A condição deve ser total >= 100."],
        [/\}\s*else\s*\{/, "Use else para o caso contrário."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Senha do cofre",
      enunciado: `O cofre abre quando a senha é igual a 1234. O alarme deve começar desligado (falso).
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:<br><code>Cofre aberto</code><br><code>Tudo tranquilo</code>`,
      dica: `Para comparar se é igual use dois sinais: <code>==</code>. Falso em C# é <code>false</code>.`,
      lang: "csharp",
      inicial: c`using System;

int senha = 1234;
bool alarmeLigado = ____;

if (senha ____ 1234)
{
    Console.WriteLine("Cofre aberto");
}
else
{
    Console.WriteLine("Senha errada");
}

if (alarmeLigado)
{
    Console.WriteLine("Alarme tocando");
}
else
{
    Console.WriteLine("Tudo tranquilo");
}
`,
      solucao: c`using System;

int senha = 1234;
bool alarmeLigado = false;

if (senha == 1234)
{
    Console.WriteLine("Cofre aberto");
}
else
{
    Console.WriteLine("Senha errada");
}

if (alarmeLigado)
{
    Console.WriteLine("Alarme tocando");
}
else
{
    Console.WriteLine("Tudo tranquilo");
}`,
      saidaEsperada: "Cofre aberto\nTudo tranquilo",
      padroes: [
        [/bool\s+alarmeLigado\s*=\s*false\s*;/, "alarmeLigado deve começar com false."],
        [/if\s*\(\s*senha\s*==\s*1234\s*\)/, "Compare a senha com == (dois sinais de igual)."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Faixa de nota",
      enunciado: `Na escola: nota 7 ou mais é <b>Aprovado</b>; de 5 a 6 é <b>Recuperação</b>; abaixo de 5 é <b>Reprovado</b>. Falta a palavra que testa a segunda faixa.
        Clique no retângulo e escreva o que falta. Com <code>nota = 6</code>, a saída deve ser exatamente:<br><code>Recuperação</code>`,
      dica: `Para uma segunda pergunta depois do <code>if</code>, use “senão, se” em inglês: duas palavras.`,
      lang: "csharp",
      inicial: c`using System;

int nota = 6;
if (nota >= 7)
{
    Console.WriteLine("Aprovado");
}
____ (nota >= 5)
{
    Console.WriteLine("Recuperação");
}
else
{
    Console.WriteLine("Reprovado");
}
`,
      solucao: c`using System;

int nota = 6;
if (nota >= 7)
{
    Console.WriteLine("Aprovado");
}
else if (nota >= 5)
{
    Console.WriteLine("Recuperação");
}
else
{
    Console.WriteLine("Reprovado");
}`,
      saidaEsperada: "Recuperação",
      padroes: [
        [/\}\s*else\s+if\s*\(\s*nota\s*>=\s*5\s*\)/, "Escreva else if antes de (nota >= 5)."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Estoque baixo",
      enunciado: `O almoxarifado precisa de um aviso. Crie <code>int estoque = 3;</code>. Se o estoque for <b>menor que 5</b>, mostre <code>Repor estoque</code>; senão, mostre <code>Estoque ok</code>.
        Com o valor 3, a saída deve ser exatamente:<br><code>Repor estoque</code>`,
      dica: `Use <code>if (estoque &lt; 5) { ... }</code> e depois o bloco do “senão”.`,
      lang: "csharp",
      inicial: c`using System;

// 1) Crie a variável do estoque com o valor 3
// 2) Decida qual aviso mostrar (menor que 5: repor; senão: ok)
`,
      solucao: c`using System;

int estoque = 3;
if (estoque < 5)
{
    Console.WriteLine("Repor estoque");
}
else
{
    Console.WriteLine("Estoque ok");
}`,
      saidaEsperada: "Repor estoque",
      padroes: [
        [/int\s+estoque\s*=\s*3\s*;/, "Crie int estoque = 3;"],
        [/if\s*\(\s*estoque\s*(<\s*5|<=\s*4)\s*\)/, "A condição deve ser estoque < 5."],
        [/\belse\b/, "Use else para mostrar Estoque ok no caso contrário."],
        [/"Repor estoque"[\s\S]*"Estoque ok"/, 'Mostre "Repor estoque" no if e "Estoque ok" no else.']
      ]
    },
    {
      tipo: "criar",
      titulo: "Entrada no cinema",
      enunciado: `O cinema tem uma regra para um filme: <b>14 anos ou mais</b> pode entrar; <b>de 10 a 13</b>, só com um adulto; <b>menos de 10</b>, o filme não é recomendado.
        Crie <code>int idade = 12;</code> e use <code>if</code>, <code>else if</code> e <code>else</code> para mostrar uma destas frases: <code>Pode entrar</code>, <code>Só com um adulto</code> ou <code>Filme não recomendado</code>.
        Com 12 anos, a saída deve ser exatamente:<br><code>Só com um adulto</code>`,
      dica: `Teste primeiro a faixa mais alta: <code>idade &gt;= 14</code>, depois <code>idade &gt;= 10</code>. O que sobrar vai para o último bloco.`,
      lang: "csharp",
      inicial: c`using System;

// 1) Crie a variável da idade com o valor 12
// 2) Teste as três faixas, da maior para a menor
`,
      solucao: c`using System;

int idade = 12;
if (idade >= 14)
{
    Console.WriteLine("Pode entrar");
}
else if (idade >= 10)
{
    Console.WriteLine("Só com um adulto");
}
else
{
    Console.WriteLine("Filme não recomendado");
}`,
      saidaEsperada: "Só com um adulto",
      padroes: [
        [/int\s+idade\s*=\s*12\s*;/, "Crie int idade = 12;"],
        [/if\s*\(\s*idade\s*>=\s*14\s*\)/, "A primeira condição deve ser idade >= 14."],
        [/else\s+if\s*\(\s*idade\s*>=\s*10\s*\)/, "Use else if (idade >= 10) para a segunda faixa."],
        [/else\s*\{\s*Console\.WriteLine\(\s*"Filme não recomendado"\s*\)/, 'O else final deve mostrar "Filme não recomendado".']
      ]
    }
  ]
};
