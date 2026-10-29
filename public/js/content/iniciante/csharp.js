// Nível Iniciante da trilha csharp: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "escrever e rodar seus primeiros programas em C#, mostrar mensagens na tela, fazer contas, guardar valores em variáveis e tomar decisões simples com if.",
  topicos: [
    // ───────────────────────── p1 ─────────────────────────
    {
      titulo: "O que é C# e como rodar (.NET Fiddle)",
      crianca: `Programar é escrever uma <b>lista de instruções</b> para o computador, uma por linha, como uma receita de bolo. O computador é muito obediente, mas não adivinha nada: faz <b>exatamente</b> o que está escrito. <b>C#</b> (lê-se “cê charp”) é uma linguagem para escrever essas instruções, criada pela Microsoft e muito usada em bancos, lojas, sistemas de empresas e até jogos.`,
      passos: [
        {
          titulo: "O que é o C#",
          html: `<p>C# é uma <b>linguagem de programação</b>: um jeito de escrever ordens que o computador entende. Você escreve o texto do programa (chamado de <b>código</b>), e uma ferramenta da Microsoft chamada <b>.NET</b> (lê-se “dot net”) transforma esse texto em algo que o computador consegue executar.</p>
<p>Com C# se fazem sistemas de banco, sites, aplicativos de empresa e jogos (o Unity usa C#).</p>`,
          pratica: [
            m("O que é C#?", ["Uma linguagem de programação", "Um tipo de computador", "Um navegador de internet", "Um antivírus"], 0, "C# é uma linguagem: um jeito de escrever instruções que o computador entende."),
            vf("O computador adivinha o que você quis dizer, mesmo se o código estiver escrito errado.", false, "O computador faz exatamente o que está escrito. Se tiver algo errado, ele mostra um erro em vez de adivinhar.")
          ]
        },
        {
          titulo: "Como rodar: copie e cole no .NET Fiddle",
          html: `<p>C# <b>não roda aqui dentro do navegador</b>, como o JavaScript. Ele precisa do .NET. Para não instalar nada agora, use um <b>playground</b>: um site onde você cola o código e ele roda para você. O mais conhecido é o <b>.NET Fiddle</b>.</p>
<ol>
<li>Copie o código da lição (aqui no site, o botão <b>▶ Testar no sandbox</b> abre o código com um botão <b>Copiar código</b>).</li>
<li>Abra <b>dotnetfiddle.net</b> em outra aba.</li>
<li>Apague o que já estiver escrito lá e cole o seu código (Ctrl+V).</li>
<li>Se houver a opção <b>Compiler</b>, escolha a versão mais nova do .NET (por exemplo, .NET 8).</li>
<li>Clique em <b>Run</b> (rodar). O resultado aparece na parte de baixo da tela.</li>
</ol>`,
          pratica: [
            vf("Os códigos em C# deste site rodam direto na página, sem precisar copiar para outro lugar.", false, "C# precisa do .NET. Por isso copiamos o código e colamos num playground, como o .NET Fiddle."),
            m("No .NET Fiddle, depois de colar o código, qual botão faz o programa rodar?", ["Run", "Delete", "Close", "Print"], 0, "`Run` quer dizer “rodar”. O resultado aparece embaixo, na área de saída.")
          ]
        },
        {
          titulo: "Mostrando um texto: Console.WriteLine",
          html: `<p>A instrução <code>Console.WriteLine</code> <b>mostra um texto na tela</b> e pula para a próxima linha. <i>Console</i> é a tela preta de texto; <i>WriteLine</i> quer dizer “escreva uma linha”.</p>
<p>O texto vai dentro dos parênteses e entre <b>aspas duplas</b>. A primeira linha, <code>using System;</code>, avisa que vamos usar as ferramentas básicas do .NET (o <code>Console</code> mora lá).</p>`,
          codigo: c`using System;

Console.WriteLine("Olá, mundo!");`,
          pratica: [
            m("O que a linha `Console.WriteLine(\"Bom dia\");` faz?", ["Mostra Bom dia na tela", "Apaga a tela", "Pergunta o seu nome", "Desliga o programa"], 0, "`Console.WriteLine` mostra na tela o texto que está entre as aspas."),
            l("Complete para mostrar Padaria aberta na tela:", c`Console.WriteLine(____);`, ['"Padaria aberta"'], "Em C#, texto vai entre aspas duplas: `Console.WriteLine(\"Padaria aberta\");`.")
          ]
        },
        {
          titulo: "O ponto e vírgula e as letras maiúsculas",
          html: `<p>Em C#, cada instrução termina com <b>ponto e vírgula</b> (<code>;</code>). Ele é como o ponto final de uma frase: avisa “esta ordem acabou”. Se esquecer, o programa nem começa e aparece um erro.</p>
<p>O C# também diferencia <b>maiúsculas de minúsculas</b>: <code>Console</code> funciona, mas <code>console</code> dá erro.</p>`,
          codigo: c`using System;

Console.WriteLine("Lista de compras:");
Console.WriteLine("Pão");
Console.WriteLine("Leite");`,
          pratica: [
            m("Qual destas linhas está escrita certinho?", ["Console.WriteLine(\"Oi\");", "Console.WriteLine(\"Oi\")", "console.writeline(\"Oi\");", "Console.WriteLine(Oi);"], 0, "Precisa de `Console` e `WriteLine` com as maiúsculas certas, texto entre aspas e o `;` no final."),
            vf("No código acima, Pão aparece na tela antes de Leite.", true, "As linhas rodam na ordem, de cima para baixo. Cada `WriteLine` mostra uma linha nova.")
          ]
        }
      ],
      codigo: c`using System;

Console.WriteLine("Olá, mundo!");
Console.WriteLine("Estou aprendendo C#");
Console.WriteLine("Uma linha de cada vez");`,
      partes: [
        ["using System;", "Avisa que vamos usar as ferramentas básicas do .NET. É lá que mora o `Console`."],
        ["Console.WriteLine(", "Manda mostrar uma linha de texto na tela (o console)."],
        ['"Olá, mundo!"', "O texto que vai aparecer. Fica entre aspas duplas para o C# saber que é texto."],
        [");", "Fecha o parêntese e termina a instrução com ponto e vírgula."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b>, copie o código, cole no <b>.NET Fiddle</b> e clique em <b>Run</b>. Depois troque as frases pelo que quiser.",
      trabalho: `Todo sistema mostra mensagens: “Pagamento aprovado”, “Senha incorreta”, “Pedido enviado”. Em programas de console feitos em C# (muito comuns em empresas para tarefas automáticas, como gerar relatórios à noite), essas mensagens saem com <code>Console.WriteLine</code>.`,
      entrevista: {
        pergunta: "O que acontece se eu esquecer o ponto e vírgula?",
        resposta: `O C# não roda o programa e mostra um <b>erro de compilação</b>, algo como <code>; expected</code> (“era esperado um ;”), dizendo a linha do problema. É só colocar o <code>;</code> no fim da instrução e rodar de novo.`
      },
      busca: ["c# console writeline iniciante", "dotnet fiddle como usar", "primeiro programa c#"]
    },

    // ───────────────────────── p2 ─────────────────────────
    {
      titulo: "Contas e textos",
      crianca: `O computador é uma <b>calculadora muito rápida</b>. Você pode pedir para ele fazer contas e mostrar o resultado, ou mostrar um texto do jeitinho que está escrito. O segredo é saber a diferença: <b>número</b> o C# calcula; <b>texto entre aspas</b> ele só repete.`,
      passos: [
        {
          titulo: "Fazendo contas",
          html: `<p>Dentro do <code>Console.WriteLine</code> você pode colocar uma <b>conta</b>, sem aspas. O C# calcula e mostra o resultado.</p>
<p>Os sinais são: <code>+</code> (somar), <code>-</code> (subtrair), <code>*</code> (multiplicar, o “vezes”) e <code>/</code> (dividir). Assim como na escola, a multiplicação e a divisão são feitas antes da soma; use parênteses para mudar a ordem.</p>`,
          codigo: c`using System;

Console.WriteLine(2 + 3);      // 5
Console.WriteLine(10 - 4);     // 6
Console.WriteLine(3 * 4);      // 12
Console.WriteLine(2 + 3 * 4);  // 14 (primeiro 3 * 4)`,
          pratica: [
            m("Qual sinal faz multiplicação em C#?", ["*", "x", "#", "%"], 0, "Em C# (e na maioria das linguagens) o “vezes” é o asterisco `*`."),
            m("O que aparece na tela com `Console.WriteLine((2 + 3) * 2);`?", ["10", "8", "(2 + 3) * 2", "7"], 0, "Os parênteses vêm primeiro: 2 + 3 = 5, depois 5 * 2 = 10.")
          ]
        },
        {
          titulo: "Texto é texto: as aspas mudam tudo",
          html: `<p>Se a conta estiver <b>entre aspas</b>, ela vira texto e o C# não calcula nada: mostra exatamente o que você escreveu.</p>
<p>As <code>//</code> no código são <b>comentários</b>: anotações para pessoas. O C# ignora tudo o que vem depois de <code>//</code> na linha.</p>`,
          codigo: c`using System;

Console.WriteLine(2 + 3);     // mostra 5
Console.WriteLine("2 + 3");   // mostra 2 + 3`,
          pratica: [
            vf("`Console.WriteLine(\"5 * 2\");` mostra 10 na tela.", false, "Com aspas é texto. A tela mostra `5 * 2`, do jeito que foi escrito."),
            vf("O C# ignora o que vem depois de `//` na mesma linha.", true, "`//` marca um comentário: é uma anotação para quem lê o código.")
          ]
        },
        {
          titulo: "Divisão de números inteiros",
          html: `<p>Cuidado com uma surpresa: quando você divide dois números <b>inteiros</b> (sem vírgula), o C# entrega só a parte inteira e <b>joga fora o resto</b>. Por isso <code>7 / 2</code> dá <code>3</code>, e não 3,5.</p>
<p>Se quiser saber quanto sobrou, use <code>%</code> (o <b>resto</b> da divisão): <code>7 % 2</code> dá <code>1</code>. Exemplo: 7 pães divididos para 2 pessoas: cada uma leva 3 e sobra 1.</p>`,
          codigo: c`using System;

Console.WriteLine(10 / 2);  // 5
Console.WriteLine(7 / 2);   // 3 (o resto é jogado fora)
Console.WriteLine(7 % 2);   // 1 (o resto)`,
          pratica: [
            m("O que `Console.WriteLine(9 / 2);` mostra?", ["4", "4,5", "4.5", "5"], 0, "9 e 2 são inteiros, então o C# mostra só a parte inteira: 4."),
            l("Complete para mostrar o resto de 10 dividido por 3 (que é 1):", c`Console.WriteLine(10 ____ 3);`, ["%"], "O sinal `%` dá o resto da divisão: 10 % 3 = 1.")
          ]
        },
        {
          titulo: "Juntando texto e número com +",
          html: `<p>Com texto, o <code>+</code> <b>junta</b> (gruda um pedaço no outro). Assim dá para montar frases: <code>"Total: " + 10</code> mostra <code>Total: 10</code>.</p>
<p>Atenção: <code>"Total: " + 2 + 3</code> mostra <code>Total: 23</code>, porque o C# vai juntando da esquerda para a direita (primeiro gruda o 2, depois o 3). Para fazer a conta antes, coloque-a entre parênteses: <code>"Total: " + (2 + 3)</code> mostra <code>Total: 5</code>.</p>`,
          codigo: c`using System;

Console.WriteLine("Bom " + "dia");        // Bom dia
Console.WriteLine("Pães: " + 6);          // Pães: 6
Console.WriteLine("Total: " + (2 + 3));   // Total: 5`,
          pratica: [
            m("O que mostra `Console.WriteLine(\"Itens: \" + (4 + 1));`?", ["Itens: 5", "Itens: 41", "Itens: 4 + 1", "Erro"], 0, "Os parênteses fazem a conta primeiro (4 + 1 = 5) e depois o texto é juntado: `Itens: 5`."),
            m("O que mostra `Console.WriteLine(\"Itens: \" + 4 + 1);`?", ["Itens: 41", "Itens: 5", "Itens: 4 + 1", "5"], 0, "Sem parênteses, o C# junta da esquerda para a direita: primeiro \"Itens: 4\", depois \"Itens: 41\".")
          ]
        }
      ],
      codigo: c`using System;

Console.WriteLine("Padaria do Bairro");
Console.WriteLine("Pães vendidos de manhã: " + 30);
Console.WriteLine("Pães vendidos à tarde: " + 25);
Console.WriteLine("Total do dia: " + (30 + 25));
Console.WriteLine("Pacotes de 6: " + (55 / 6));
Console.WriteLine("Sobraram soltos: " + (55 % 6));`,
      partes: [
        ['Console.WriteLine("Padaria do Bairro");', "Texto entre aspas: aparece exatamente assim."],
        ['"Pães vendidos de manhã: " + 30', "O `+` junta o texto com o número: `Pães vendidos de manhã: 30`."],
        ['"Total do dia: " + (30 + 25)', "Os parênteses fazem a conta primeiro (55) e só depois juntam com o texto."],
        ["(55 / 6)", "Divisão de inteiros: dá 9 (o resto é jogado fora)."],
        ["(55 % 6)", "O resto da divisão: 55 - 54 = 1."]
      ],
      nota: "A saída desse exemplo é: Padaria do Bairro / Pães vendidos de manhã: 30 / Pães vendidos à tarde: 25 / Total do dia: 55 / Pacotes de 6: 9 / Sobraram soltos: 1.",
      trabalho: `Somar o total de uma compra, calcular quantas caixas cabem num caminhão, dividir uma conta entre amigos: quase todo sistema faz contas e mostra o resultado junto de um texto explicando o que é aquele número.`,
      entrevista: {
        pergunta: "Por que 7 / 2 dá 3 em C#?",
        resposta: `Porque 7 e 2 são números <b>inteiros</b> (<code>int</code>), e a divisão entre inteiros devolve outro inteiro, descartando a parte quebrada. Para ter 3,5 é preciso que pelo menos um dos números tenha casa decimal, por exemplo <code>7.0 / 2</code>.`
      },
      busca: ["c# operadores aritméticos", "c# divisão inteira resto", "c# concatenar string e número"]
    },

    // ───────────────────────── p3 ─────────────────────────
    {
      titulo: "Variáveis e tipos (int, double, string, bool)",
      crianca: `Uma <b>variável</b> é uma <b>caixinha com etiqueta</b> onde você guarda um valor para usar depois. Em C#, cada caixinha tem um <b>tipo</b>: a caixa de números inteiros só aceita números inteiros, a de textos só aceita textos. É como um organizador de gaveta: talher no lugar de talher, pano no lugar de pano.`,
      passos: [
        {
          titulo: "Criando uma variável",
          html: `<p>Para criar uma variável você escreve: <b>tipo</b>, <b>nome</b>, <code>=</code> e o <b>valor</b>, terminando com <code>;</code>. O <code>=</code> aqui quer dizer “guarde este valor”.</p>
<p>Depois, para usar o valor, é só escrever o nome da variável (sem aspas!).</p>`,
          codigo: c`using System;

int paes = 6;
Console.WriteLine(paes);           // 6
Console.WriteLine("Pães: " + paes); // Pães: 6`,
          pratica: [
            m("Na linha `int paes = 6;`, qual é o nome da variável?", ["paes", "int", "6", "="], 0, "A ordem é tipo (`int`), nome (`paes`) e valor (`6`)."),
            vf("`Console.WriteLine(\"paes\");` mostra o valor guardado na variável paes.", false, "Com aspas é só o texto `paes`. Para mostrar o valor, escreva o nome sem aspas: `Console.WriteLine(paes);`.")
          ]
        },
        {
          titulo: "Os quatro tipos mais usados",
          html: `<ul>
<li><code>int</code>: número <b>inteiro</b> (quantidade de pães, idade).</li>
<li><code>double</code>: número <b>com casas decimais</b> (peso, altura). No código, a casa decimal é separada por <b>ponto</b>: <code>1.5</code>.</li>
<li><code>string</code>: <b>texto</b>, sempre entre aspas duplas.</li>
<li><code>bool</code>: só pode ser <code>true</code> (verdadeiro) ou <code>false</code> (falso). Na tela aparece como <code>True</code> ou <code>False</code>.</li>
</ul>
<p>Detalhe: ao <b>mostrar</b> um <code>double</code>, o computador pode usar ponto ou vírgula (1.5 ou 1,5), conforme o idioma configurado nele.</p>`,
          codigo: c`using System;

int idade = 25;
double peso = 1.5;
string nome = "Ana";
bool clienteVip = true;`,
          pratica: [
            m("Qual tipo usar para guardar o nome de um cliente?", ["string", "int", "bool", "double"], 0, "Texto é `string`, e o valor vai entre aspas duplas."),
            l("Complete com o tipo certo para guardar se a loja está aberta (sim ou não):", c`____ lojaAberta = true;`, ["bool"], "Verdadeiro ou falso é `bool`.")
          ]
        },
        {
          titulo: "Contas com variáveis",
          html: `<p>Variáveis podem entrar em contas, e o resultado pode ir para <b>outra</b> variável. É como numa lista de compras: preço vezes quantidade dá o total.</p>`,
          codigo: c`using System;

int precoPao = 2;
int quantidade = 5;
int total = precoPao * quantidade;
Console.WriteLine("Total: " + total);  // Total: 10`,
          pratica: [
            m("Com `int a = 4;` e `int b = 3;`, o que mostra `Console.WriteLine(a * b);`?", ["12", "7", "43", "a * b"], 0, "O C# troca `a` por 4 e `b` por 3: 4 * 3 = 12.")
          ]
        },
        {
          titulo: "Mudando o valor e respeitando o tipo",
          html: `<p>Para trocar o valor de uma variável que já existe, escreva só o nome, <code>=</code> e o novo valor, <b>sem repetir o tipo</b>. O valor antigo é substituído.</p>
<p>O tipo não muda: se a caixa é <code>int</code>, tentar guardar um texto nela dá erro antes mesmo de rodar.</p>`,
          codigo: c`using System;

int estoque = 10;
estoque = 7;                   // vendeu 3
Console.WriteLine(estoque);    // 7
// estoque = "sete";           // ERRO: texto não cabe em int`,
          pratica: [
            vf("Depois de `int x = 5;` e `x = 8;`, a variável x vale 8.", true, "A segunda linha troca o valor: o 5 é substituído por 8."),
            m("Qual linha dá erro?", ["int idade = \"vinte\";", "int idade = 20;", "string nome = \"Leo\";", "bool ok = false;"], 0, "`\"vinte\"` é texto e não cabe numa variável `int`.")
          ]
        },
        {
          titulo: "Um jeito prático de montar frases: $ e chaves",
          html: `<p>Em vez de juntar tudo com <code>+</code>, você pode colocar um <code>$</code> antes das aspas e escrever o nome da variável entre <b>chaves</b> <code>{ }</code> dentro do texto. O C# troca <code>{nome}</code> pelo valor. Isso se chama <b>interpolação</b> e é muito usado no nível Básico.</p>`,
          codigo: c`using System;

string cliente = "Bia";
int pedidos = 3;
Console.WriteLine($"{cliente} fez {pedidos} pedidos");  // Bia fez 3 pedidos`,
          pratica: [
            m("Com `string fruta = \"maçã\";`, o que mostra `Console.WriteLine($\"Quero {fruta}\");`?", ["Quero maçã", "Quero {fruta}", "Quero fruta", "$Quero maçã"], 0, "Com o `$` antes das aspas, `{fruta}` é trocado pelo valor da variável."),
            l("Complete para que o texto mostre o valor da variável idade:", c`Console.WriteLine(____"Tenho {idade} anos");`, ["$"], "O `$` antes das aspas liga a interpolação: as chaves viram valores.")
          ]
        }
      ],
      codigo: c`using System;

string produto = "Bolo de cenoura";
int quantidade = 2;
int precoUnidade = 15;
int total = quantidade * precoUnidade;
bool entrega = true;

Console.WriteLine("Produto: " + produto);
Console.WriteLine("Quantidade: " + quantidade);
Console.WriteLine($"Total: {total} reais");
Console.WriteLine("Entrega: " + entrega);`,
      partes: [
        ['string produto = "Bolo de cenoura";', "Caixinha de texto com o nome do produto."],
        ["int quantidade = 2;", "Caixinha de número inteiro."],
        ["int total = quantidade * precoUnidade;", "Faz a conta com as variáveis (2 * 15 = 30) e guarda o resultado em `total`."],
        ["bool entrega = true;", "Verdadeiro ou falso: o pedido tem entrega."],
        ['Console.WriteLine($"Total: {total} reais");', "Interpolação: `{total}` vira 30, mostrando `Total: 30 reais`."],
        ['Console.WriteLine("Entrega: " + entrega);', "Um `bool` aparece na tela como `True` ou `False`: `Entrega: True`."]
      ],
      nota: "No nível Básico você vai conhecer também o <code>decimal</code>, o tipo certo para dinheiro com centavos.",
      trabalho: `Todo cadastro é feito de variáveis: nome do cliente (<code>string</code>), quantidade em estoque (<code>int</code>), peso do pacote (<code>double</code>), se o cliente está ativo (<code>bool</code>). Escolher o tipo certo evita erros e deixa o sistema mais confiável.`,
      entrevista: {
        pergunta: "Por que o C# exige o tipo de cada variável?",
        resposta: `Porque o C# tem <b>tipagem estática</b>: o tipo é definido quando a variável é criada e não muda mais. Assim, erros como guardar texto onde deveria haver número são encontrados <b>antes</b> de o programa rodar, e não na mão do cliente.`
      },
      busca: ["c# variáveis tipos int double string bool", "c# interpolação de string", "c# declarar variável"]
    },

    // ───────────────────────── p4 ─────────────────────────
    {
      titulo: "Decidindo com if",
      crianca: `O <code>if</code> (“se”, em inglês) é como uma <b>placa na estrada</b>: “se estiver chovendo, leve o guarda-chuva”. O programa olha uma pergunta de sim ou não e, dependendo da resposta, faz uma coisa ou outra.`,
      passos: [
        {
          titulo: "if: faça isso só se for verdade",
          html: `<p>O <code>if</code> recebe uma <b>condição</b> entre parênteses: uma pergunta cuja resposta é verdadeiro ou falso. Se for verdadeira, o C# executa o que está entre as <b>chaves</b> <code>{ }</code>. Se for falsa, pula esse pedaço.</p>
<p>Repare: depois do <code>if (...)</code> <b>não</b> vai ponto e vírgula; as instruções dentro das chaves é que têm o seu <code>;</code>.</p>`,
          codigo: c`using System;

int idade = 20;
if (idade >= 18)
{
    Console.WriteLine("Pode tirar a carteira de motorista");
}`,
          pratica: [
            m("Com `int idade = 15;`, o que acontece no código acima?", ["Nada aparece na tela", "Aparece a mensagem", "O programa dá erro", "A idade vira 18"], 0, "15 >= 18 é falso, então o C# pula o que está dentro das chaves."),
            vf("A condição do `if` fica entre parênteses e o que deve acontecer fica entre chaves.", true, "É sempre `if (condição) { ... }`.")
          ]
        },
        {
          titulo: "Comparando valores",
          html: `<p>Para fazer a pergunta do <code>if</code>, usamos comparações:</p>
<ul>
<li><code>&gt;</code> maior, <code>&lt;</code> menor;</li>
<li><code>&gt;=</code> maior ou igual, <code>&lt;=</code> menor ou igual;</li>
<li><code>==</code> igual (<b>dois</b> sinais de igual!), <code>!=</code> diferente.</li>
</ul>
<p>Lembre: um <code>=</code> só serve para <b>guardar</b> valor; <code>==</code> serve para <b>comparar</b>. O resultado de uma comparação é um <code>bool</code> (<code>true</code> ou <code>false</code>).</p>`,
          codigo: c`using System;

int estoque = 0;
Console.WriteLine(estoque == 0);   // True
Console.WriteLine(estoque > 5);    // False`,
          pratica: [
            l("Complete para perguntar se a senha é igual a 1234:", c`if (senha ____ 1234)`, ["=="], "Para comparar se é igual usamos `==` (dois sinais). Um `=` só serviria para guardar valor."),
            m("Qual sinal quer dizer “diferente”?", ["!=", "<>", "=!", "=="], 0, "Em C#, diferente é `!=`.")
          ]
        },
        {
          titulo: "else: senão, faça outra coisa",
          html: `<p>O <code>else</code> (“senão”) vem logo depois das chaves do <code>if</code> e diz o que fazer quando a condição for <b>falsa</b>. Assim, sempre acontece <b>uma</b> das duas coisas, nunca as duas.</p>`,
          codigo: c`using System;

int estoque = 0;
if (estoque > 0)
{
    Console.WriteLine("Produto disponível");
}
else
{
    Console.WriteLine("Produto esgotado");
}`,
          pratica: [
            m("O que o código acima mostra?", ["Produto esgotado", "Produto disponível", "As duas frases", "Nada"], 0, "0 > 0 é falso, então roda o bloco do `else`."),
            vf("Num `if` com `else`, os dois blocos podem rodar ao mesmo tempo.", false, "Roda só um: o do `if` se a condição for verdadeira, ou o do `else` se for falsa.")
          ]
        },
        {
          titulo: "Mais de duas opções: else if",
          html: `<p>Quando há várias faixas, use <code>else if</code> (“senão, se”). O C# testa de cima para baixo e roda <b>só o primeiro</b> bloco cuja condição for verdadeira. O <code>else</code> final pega todo o resto.</p>
<p>Uma variável <code>bool</code> também pode ser a condição direto: <code>if (clienteVip)</code> é o mesmo que perguntar se ela é <code>true</code>.</p>`,
          codigo: c`using System;

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
          pratica: [
            m("Com `int nota = 9;` no código acima, o que aparece?", ["Aprovado", "Recuperação", "Aprovado e Recuperação", "Reprovado"], 0, "9 >= 7 é verdade, então mostra Aprovado e os outros testes nem são feitos."),
            m("Com `int nota = 3;`, o que aparece?", ["Reprovado", "Recuperação", "Aprovado", "Nada"], 0, "3 não é >= 7 nem >= 5, então cai no `else`.")
          ]
        }
      ],
      codigo: c`using System;

int totalCompra = 120;
bool clienteVip = false;

if (totalCompra >= 100)
{
    Console.WriteLine("Frete grátis!");
}
else
{
    Console.WriteLine("Frete: 15 reais");
}

if (clienteVip)
{
    Console.WriteLine("Brinde especial para você");
}
else
{
    Console.WriteLine("Seja VIP e ganhe brindes");
}`,
      partes: [
        ["if (totalCompra >= 100)", "Pergunta: o total é 100 ou mais? Com 120, a resposta é verdadeira."],
        ['Console.WriteLine("Frete grátis!");', "Roda porque a condição foi verdadeira."],
        ["else", "Seria usado se a compra fosse menor que 100."],
        ["if (clienteVip)", "Uma variável `bool` usada direto como condição. Ela é `false`, então vai para o `else`."]
      ],
      nota: "A saída desse exemplo é: Frete grátis! / Seja VIP e ganhe brindes.",
      trabalho: `Sistemas decidem o tempo todo: liberar ou bloquear um login, dar ou não frete grátis, aprovar ou recusar um pagamento. Cada regra de negócio dessas vira um <code>if</code> no código.`,
      entrevista: {
        pergunta: "Qual a diferença entre = e == em C#?",
        resposta: `<code>=</code> é <b>atribuição</b>: guarda um valor na variável (<code>x = 5;</code>). <code>==</code> é <b>comparação</b>: pergunta se dois valores são iguais e devolve <code>true</code> ou <code>false</code> (<code>x == 5</code>). Dentro do <code>if</code> usamos comparação.`
      },
      busca: ["c# if else iniciante", "c# operadores de comparação", "c# else if exemplo"]
    }
  ],

  fixacao: [
    m("Qual comando mostra um texto na tela em C#?", ["Console.WriteLine", "print", "echo", "Show.Text"], 0, "Em C# usamos `Console.WriteLine(\"texto\");`."),
    vf("Em C#, cada instrução termina com ponto e vírgula.", true, "O `;` é o “ponto final” de cada instrução."),
    m("Qual site serve para rodar C# sem instalar nada?", [".NET Fiddle", "Bloco de notas", "Paint", "Calculadora do Windows"], 0, "O .NET Fiddle (dotnetfiddle.net) é um playground: você cola o código e clica em Run."),
    m("O que mostra `Console.WriteLine(10 - 3);`?", ["7", "10 - 3", "13", "103"], 0, "Sem aspas é conta: 10 - 3 = 7."),
    m("O que mostra `Console.WriteLine(\"10 - 3\");`?", ["10 - 3", "7", "Erro", "Nada"], 0, "Entre aspas é texto, e o texto aparece do jeito que foi escrito."),
    m("Quanto é `8 / 3` em C# (dois inteiros)?", ["2", "2,66", "3", "2.67"], 0, "Divisão entre inteiros joga fora a parte quebrada: 8 / 3 = 2."),
    l("Complete para criar uma variável de número inteiro chamada pedidos:", c`____ pedidos = 12;`, ["int"], "Número inteiro é `int`."),
    m("Qual tipo guarda um número com casas decimais, como 1.75?", ["double", "int", "bool", "string"], 0, "`double` guarda números com vírgula (no código, escritos com ponto)."),
    vf("`bool` pode guardar o texto \"talvez\".", false, "`bool` só aceita `true` ou `false`."),
    m("Com `int x = 3;`, o que mostra `Console.WriteLine($\"x vale {x}\");`?", ["x vale 3", "x vale {x}", "x vale x", "3 vale 3"], 0, "Com `$`, o `{x}` é trocado pelo valor 3."),
    l("Complete para mostrar Acesso liberado só quando a idade for 18 ou mais:", c`if (idade ____ 18)
{
    Console.WriteLine("Acesso liberado");
}`, [">="], "“18 ou mais” é maior ou igual: `>=`."),
    m("Qual linha compara se o estoque é igual a zero?", ["if (estoque == 0)", "if (estoque = 0)", "if estoque == 0;", "if (estoque => 0)"], 0, "Comparar é `==`, e a condição vai entre parênteses, sem `;` depois.")
  ],

  checkpoints: {
    b1: [
      m("Qual tipo o tópico recomenda para guardar dinheiro, como um salário?", ["decimal", "double", "int", "bool"], 0, "`decimal` guarda valores exatos, sem sumir centavos. Por isso o valor vem com sufixo `m`: `5250.75m`."),
      vf("`int.TryParse` tenta converter um texto em número e não quebra o programa se o texto for inválido.", true, "Ele devolve `true` se conseguiu converter e `false` se não, sem lançar erro.")
    ],
    b2: [
      m("No `switch`, o que o `_` representa?", ["Qualquer outro caso (o “senão”)", "Uma variável vazia", "Um erro", "O primeiro caso"], 0, "O `_` pega tudo que não combinou com os casos anteriores."),
      m("Dentro de um laço, o que o `continue` faz?", ["Pula para a próxima volta", "Encerra o programa", "Repete a mesma volta", "Para o laço de vez"], 0, "`continue` pula o resto da volta atual e vai para a próxima. Quem para o laço de vez é o `break`.")
    ],
    b3: [
      m("O que é um objeto, na analogia do tópico?", ["A casa construída a partir da planta (classe)", "A planta da casa", "O pedreiro", "O terreno"], 0, "A classe é a planta (o modelo) e o objeto é a casa construída com `new`."),
      vf("Com `{ get; private set; }`, qualquer parte do código pode ler o preço, mas só a própria classe pode alterá-lo.", true, "Isso é encapsulamento: o preço só muda pelo método que valida a regra.")
    ],
    i1: [
      m("Para que serve o `Where` do LINQ?", ["Filtrar os itens que atendem a uma condição", "Ordenar a lista", "Somar os valores", "Apagar a lista"], 0, "`Where` devolve só os itens que passam no filtro, como `v => v.Valor > 500`."),
      vf("`FirstOrDefault` devolve `null` (ou o valor padrão) quando não encontra nenhum item.", true, "Por isso, ao contrário de `First`, ele não lança erro quando nada é encontrado.")
    ],
    i2: [
      m("O bloco `finally` roda quando?", ["Sempre, com erro ou sem erro", "Só quando dá erro", "Só quando não dá erro", "Nunca"], 0, "`finally` sempre executa, ideal para finalizar ou liberar recursos."),
      vf("O `await` espera a tarefa terminar sem travar a thread, deixando o programa fazer outras coisas.", true, "Como a máquina de lavar do tópico: você não fica parado olhando enquanto ela trabalha.")
    ],
    i3: [
      m("Em injeção de dependência, como o `PedidoService` consegue o `IEmailService`?", ["Recebe pronto pelo construtor", "Cria com new dentro de cada método", "Lê de um arquivo", "Não precisa dele"], 0, "A dependência é entregue pelo construtor; a classe não fabrica a própria ferramenta."),
      vf("Como o `PedidoService` depende da interface `IEmailService`, dá para trocar o `SmtpEmailService` por outra implementação sem alterar o `PedidoService`.", true, "Essa é a vantagem de depender de uma interface: troca-se a peça na hora de registrar no container.")
    ],
    a1: [
      m("O que `app.MapGet(\"/produtos\", ...)` faz?", ["Cria uma rota que responde a requisições GET em /produtos", "Apaga os produtos", "Cria a tabela produtos no banco", "Abre o Swagger"], 0, "`MapGet` liga um endereço (rota) a uma função que devolve a resposta."),
      m("O que `Results.NotFound()` devolve para quem chamou a API?", ["Status 404 (não encontrado)", "Status 200 (ok)", "Status 201 (criado)", "Status 500 (erro do servidor)"], 0, "`NotFound` responde 404, indicando que o produto pedido não existe.")
    ],
    a2: [
      vf("O EF Core traduz as consultas escritas em C# (LINQ) para SQL.", true, "Ele é o “tradutor” entre o seu código C# e o banco de dados."),
      m("Para que serve o `Include` numa consulta do EF Core?", ["Trazer junto os dados relacionados (ex.: os pedidos de cada cliente)", "Incluir uma nova tabela no banco", "Apagar registros", "Criar uma migration"], 0, "`Include` carrega os relacionados na mesma consulta, evitando o problema N+1.")
    ],
    a3: [
      m("O “S” de SOLID diz que cada classe deve...", ["Ter uma única responsabilidade", "Ser sempre estática", "Ter só um método", "Ser secreta"], 0, "Responsabilidade única: cada classe cuida de uma coisa só."),
      m("No teste do tópico, o que `Assert.Equal(esperado, regra.Aplicar(entrada))` confere?", ["Se o resultado do método é igual ao valor esperado", "Se o método existe", "Se a classe compila", "Se o banco está ligado"], 0, "O `Assert.Equal` compara o valor esperado com o que o método devolveu; se forem diferentes, o teste falha.")
    ]
  }
};
