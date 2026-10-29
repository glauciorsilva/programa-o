// Nível Iniciante da trilha java: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "rodar seus primeiros programas Java num site gratuito, mostrar mensagens, fazer contas, guardar valores em variáveis e fazer o programa tomar decisões com if.",
  topicos: [
    // ───────────────────────── p1
    {
      titulo: "O que é Java e como rodar (playground online)",
      crianca: `Programar é escrever <b>instruções</b> para o computador, uma por linha, como uma receita. <b>Java</b> é uma linguagem de programação muito usada em bancos, lojas virtuais e aplicativos Android. Ela é um pouco “formal”: pede que o código venha dentro de uma <b>embalagem fixa</b>. Pense numa carta: sempre tem envelope, endereço e só depois a mensagem. Você vai copiar o envelope igualzinho e só mudar a mensagem.`,
      passos: [
        {
          titulo: "Java não roda nesta página: use um playground",
          html: `<p>Java precisa de um programa especial para rodar (o <b>compilador</b>, que traduz o seu texto para a língua do computador). Ele não existe dentro desta página, mas existem sites gratuitos que já têm tudo pronto. Esses sites se chamam <b>playground</b> (“parquinho”, em inglês).</p>
<p>Como fazer: 1) abra <a href="https://onecompiler.com/java" target="_blank" rel="noopener">onecompiler.com/java</a>; 2) apague o código que já vem lá; 3) cole o seu código; 4) clique em <b>Run</b> (rodar). O resultado aparece na área <b>Output</b> (saída). O botão <b>▶ Testar no sandbox</b> deste tópico também leva você ao playground.</p>`,
          pratica: [
            vf("Para rodar Java aqui no curso, você copia o código e cola num playground online, como o OneCompiler.", true, "Java não roda dentro da página. O playground é um site que compila e roda o código para você, de graça."),
            m("No OneCompiler, qual botão faz o programa rodar?", ["Run", "Delete", "Share", "Login"], 0, "`Run` quer dizer “rodar” em inglês. O resultado aparece logo abaixo, na saída (Output).")
          ]
        },
        {
          titulo: "A embalagem: public class Main",
          html: `<p>Todo código Java mora dentro de uma <b>classe</b>, que é como uma caixa com nome. A linha <code>public class Main {</code> quer dizer: “aqui começa uma caixa chamada <b>Main</b> (principal), que todo mundo pode usar (<b>public</b>)”.</p>
<p>A chave <code>{</code> abre a caixa e a chave <code>}</code> fecha. Tudo o que estiver entre elas faz parte da classe. Por enquanto, é só copiar essa linha sempre igual.</p>`,
          codigo: c`public class Main {
    // o programa vai aqui dentro
}`,
          pratica: [
            l("Complete o nome da classe que usamos nos exemplos:", c`public class ____ {
}`, ["Main"], "Nos exemplos e no playground a classe se chama `Main` (com M maiúsculo)."),
            m("Para que servem as chaves `{` e `}`?", ["Abrir e fechar um bloco, como a tampa de uma caixa", "Fazer contas", "Escrever comentários", "Mostrar texto na tela"], 0, "A chave `{` abre um bloco e a `}` fecha. Toda chave que abre precisa de uma que feche.")
          ]
        },
        {
          titulo: "A porta de entrada: o main",
          html: `<p>Dentro da classe vem a linha <code>public static void main(String[] args) {</code>. Parece complicada, mas é só a <b>porta de entrada</b>: quando você clica em Run, o Java procura o <code>main</code> e começa a executar dali.</p>
<p>Você <b>não precisa entender cada palavra agora</b> (vamos aprender aos poucos). Copie essa linha exatamente assim, com as letras maiúsculas e minúsculas certas. Ela também abre uma chave, que precisa ser fechada.</p>`,
          codigo: c`public class Main {
    public static void main(String[] args) {
        // as instruções vão aqui
    }
}`,
          pratica: [
            m("O que o `main` representa no programa?", ["O ponto onde o programa começa a rodar", "O nome do arquivo de imagem", "Uma conta matemática", "O fim do programa"], 0, "O `main` é a porta de entrada: o Java começa a executar as instruções que estão dentro dele."),
            vf("Em Java, tanto faz escrever `Main` ou `main`, `String` ou `string`.", false, "Java diferencia maiúsculas de minúsculas. `String` com S maiúsculo é o certo; `string` dá erro.")
          ]
        },
        {
          titulo: "Mostrando uma mensagem: System.out.println",
          html: `<p>Para mostrar um texto na tela usamos <code>System.out.println("...");</code>. Leia assim: “sistema, na saída, imprima esta linha”. O <b>println</b> mostra o texto e pula para a próxima linha.</p>
<p>Três detalhes: o texto vai <b>entre aspas duplas</b>, dentro dos <b>parênteses</b>, e a linha termina com <b>ponto e vírgula</b> <code>;</code>, que é o “ponto final” do Java.</p>`,
          codigo: c`System.out.println("Bom dia!");`,
          pratica: [
            l("Complete para mostrar uma mensagem na tela:", c`System.out.____("Bem-vindo à padaria");`, ["println"], "O comando é `System.out.println`: imprime o texto e pula linha."),
            m("Qual linha está escrita do jeito certo?", ["System.out.println(\"Oi\");", "System.out.println(Oi);", "System.out.println(\"Oi\")", "system.out.println(\"Oi\");"], 0, "Precisa de aspas no texto, `;` no final e `System` com S maiúsculo.")
          ]
        },
        {
          titulo: "Várias linhas, de cima para baixo",
          html: `<p>O Java executa as instruções <b>na ordem</b>, de cima para baixo. Cada <code>println</code> mostra uma linha nova. Para lembrar de algo sem que o Java execute, escreva um <b>comentário</b>: tudo depois de <code>//</code> é ignorado.</p>`,
          codigo: c`System.out.println("1. Acordar");
System.out.println("2. Tomar café"); // comentário: o Java ignora
System.out.println("3. Estudar Java");`,
          pratica: [
            m("Com o código acima, qual frase aparece por último?", ["3. Estudar Java", "1. Acordar", "2. Tomar café", "comentário: o Java ignora"], 0, "As linhas rodam de cima para baixo, então a última mostrada é `3. Estudar Java`. O comentário não aparece.")
          ]
        }
      ],
      codigo: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Olá, mundo!");
        System.out.println("Estou aprendendo Java");
    }
}`,
      partes: [
        ["public class Main {", "Abre a classe (a “caixa”) chamada Main. Todo código Java mora dentro de uma classe."],
        ["public static void main(String[] args) {", "A porta de entrada: o programa começa aqui. Copie sempre igual."],
        ['System.out.println("Olá, mundo!");', "Mostra o texto entre aspas e pula linha. O `;` encerra a instrução."],
        ["}", "A primeira `}` fecha o main e a última fecha a classe."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b> (ou abra onecompiler.com/java), cole o código, clique em <b>Run</b> e troque as frases pelo que você quiser.",
      trabalho: `Todo sistema Java, do aplicativo do banco ao site de uma loja, começa com essa mesma estrutura: uma classe e um ponto de entrada. As mensagens que você vê, como “Pagamento aprovado”, são parecidas com um <code>println</code>.`,
      entrevista: {
        pergunta: "O que acontece se eu esquecer o ponto e vírgula ou uma chave?",
        resposta: `O programa <b>não roda</b>: o compilador mostra um erro e diz a linha do problema (por exemplo, <code>';' expected</code>, “esperava um ponto e vírgula”). É só conferir se toda instrução termina com <code>;</code> e se toda chave que abriu também fechou.`
      },
      busca: ["java para iniciantes primeiro programa", "onecompiler java", "java system.out.println"]
    },
    // ───────────────────────── p2
    {
      titulo: "Contas e textos",
      crianca: `O computador é uma <b>calculadora muito rápida</b> e também sabe <b>colar pedaços de texto</b>, como quem junta letrinhas de ímã na geladeira. Em Java, a conta vai sem aspas e o texto vai entre aspas.`,
      passos: [
        {
          titulo: "Contas de somar e subtrair",
          html: `<p>Dentro do <code>println</code> você pode colocar uma <b>conta</b>, sem aspas. O Java faz a conta e mostra o resultado. Use <code>+</code> para somar e <code>-</code> para subtrair.</p>`,
          codigo: c`System.out.println(5 + 3);   // 8
System.out.println(10 - 4);  // 6`,
          pratica: [
            m("O que aparece na tela com `System.out.println(7 + 2);`?", ["9", "7 + 2", "72", "Dá erro"], 0, "Sem aspas, o Java faz a conta: 7 + 2 = 9."),
            vf("`System.out.println(\"7 + 2\");` mostra 9 na tela.", false, "Com aspas, é um texto: aparece exatamente `7 + 2`, sem fazer a conta.")
          ]
        },
        {
          titulo: "Multiplicar e dividir",
          html: `<p>No teclado não existe × nem ÷. Em Java, a multiplicação é <code>*</code> (asterisco) e a divisão é <code>/</code> (barra).</p>
<p>Atenção: dividindo <b>números inteiros</b> (sem vírgula), o Java joga fora a parte quebrada: <code>7 / 2</code> dá <b>3</b>. Para ver <b>3.5</b>, escreva um dos números com ponto: <code>7.0 / 2</code>. Em programação, a casa decimal usa <b>ponto</b>, não vírgula.</p>`,
          codigo: c`System.out.println(4 * 3);    // 12
System.out.println(7 / 2);    // 3   (inteiros)
System.out.println(7.0 / 2);  // 3.5 (com decimal)`,
          pratica: [
            l("Complete para calcular o preço de 3 pães de R$ 2:", c`System.out.println(3 ____ 2);`, ["*"], "A multiplicação em Java é o asterisco: `3 * 2` dá 6."),
            m("Quanto mostra `System.out.println(9 / 2);`?", ["4", "4.5", "5", "9 / 2"], 0, "Os dois números são inteiros, então o Java descarta a parte quebrada: 9 / 2 dá 4. Com `9.0 / 2` daria 4.5.")
          ]
        },
        {
          titulo: "Juntando textos com +",
          html: `<p>Entre textos, o <code>+</code> não soma: ele <b>cola</b> um texto no outro. Lembre-se do espaço dentro das aspas, senão as palavras ficam grudadas.</p>`,
          codigo: c`System.out.println("Pão " + "de queijo");   // Pão de queijo
System.out.println("Bom" + "dia");           // Bomdia (sem espaço!)`,
          pratica: [
            m("O que aparece com `System.out.println(\"Ana\" + \"Maria\");`?", ["AnaMaria", "Ana Maria", "Ana + Maria", "Dá erro"], 0, "O `+` cola os textos exatamente como estão. Como não há espaço nas aspas, fica `AnaMaria`."),
            vf("`System.out.println(\"2\" + \"2\");` mostra 22.", true, "Entre aspas, `\"2\"` é texto. O `+` cola os dois textos e o resultado é `22`.")
          ]
        },
        {
          titulo: "Texto junto com conta: use parênteses",
          html: `<p>Quando misturamos texto e número, o <code>+</code> cola tudo como texto, da esquerda para a direita. Por isso <code>"Total: " + 2 + 3</code> mostra <b>Total: 23</b>!</p>
<p>A solução é colocar a conta entre <b>parênteses</b>: o Java faz primeiro o que está dentro deles. <code>"Total: " + (2 + 3)</code> mostra <b>Total: 5</b>.</p>`,
          codigo: c`System.out.println("Total: " + 2 + 3);     // Total: 23
System.out.println("Total: " + (2 + 3));   // Total: 5`,
          pratica: [
            l("Complete para mostrar Itens: 7 (fazendo a conta 4 + 3):", c`System.out.println("Itens: " + ____);`, ["(4 + 3)", "(4+3)", "(3 + 4)", "(3+4)"], "Com parênteses, o Java faz a conta primeiro: `\"Itens: \" + (4 + 3)` mostra `Itens: 7`.")
          ]
        }
      ],
      codigo: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Padaria do Bairro");
        System.out.println("Pães: " + (6 * 1));
        System.out.println("Total: R$ " + (6 * 1 + 4));
        System.out.println("Metade de 10: " + (10 / 2));
    }
}`,
      partes: [
        ['"Padaria do Bairro"', "Texto entre aspas: aparece exatamente como está."],
        ['"Pães: " + (6 * 1)', "Primeiro o Java faz a conta dentro dos parênteses (6) e depois cola no texto."],
        ["(6 * 1 + 4)", "Dentro dos parênteses vale a ordem da matemática: multiplica antes de somar (6 + 4 = 10)."],
        ["(10 / 2)", "Divisão com a barra. Entre inteiros, o resultado também é inteiro (5)."]
      ],
      nota: "Teste no playground: troque os números e veja o resultado mudar. Experimente tirar os parênteses para ver a diferença.",
      trabalho: `Caixas de supermercado e lojas virtuais fazem contas assim o tempo todo: quantidade vezes preço, soma do carrinho, troco. E montam mensagens juntando texto e números, como “Total: R$ 25”.`,
      entrevista: {
        pergunta: "Por que 7 / 2 dá 3 em Java?",
        resposta: `Porque os dois números são <b>inteiros</b> (<code>int</code>), e divisão entre inteiros em Java descarta a parte decimal. Para obter 3.5, pelo menos um dos números precisa ser decimal: <code>7.0 / 2</code>.`
      },
      busca: ["java operadores aritméticos", "java divisão inteira", "java concatenar string"]
    },
    // ───────────────────────── p3
    {
      titulo: "Variáveis e tipos (int, double, String, boolean)",
      crianca: `Uma <b>variável</b> é uma <b>caixinha com etiqueta</b> onde você guarda um valor para usar depois. Em Java, a etiqueta também diz o <b>tipo</b> do que cabe na caixinha: na caixa de ovos só cabem ovos, na caixa de sapatos só cabem sapatos.`,
      passos: [
        {
          titulo: "Criando uma variável",
          html: `<p>Para criar uma variável, escreva: <b>tipo</b>, <b>nome</b>, <code>=</code> e o <b>valor</b>, terminando com <code>;</code>. O <code>=</code> aqui não é “igual” da matemática: ele quer dizer “<b>guarde</b> este valor na caixinha”.</p>
<p>Depois, para usar o valor, basta escrever o nome da variável, <b>sem aspas</b>.</p>`,
          codigo: c`int paes = 6;
System.out.println(paes);              // 6
System.out.println("Pães: " + paes);   // Pães: 6`,
          pratica: [
            m("Na linha `int idade = 30;`, qual é o nome da variável?", ["idade", "int", "30", "="], 0, "O tipo vem primeiro (`int`), depois o nome (`idade`) e depois o valor (`30`)."),
            vf("`System.out.println(\"paes\");` mostra o valor guardado na variável paes.", false, "Com aspas, é só o texto `paes`. Para mostrar o valor, escreva o nome sem aspas: `System.out.println(paes);`.")
          ]
        },
        {
          titulo: "Os 4 tipos mais usados",
          html: `<p><code>int</code>: números <b>inteiros</b> (idade, quantidade). <code>double</code>: números com <b>casas decimais</b> (preço, altura), usando ponto. <code>String</code>: <b>textos</b>, entre aspas duplas, com S maiúsculo. <code>boolean</code>: só <b>true</b> (verdadeiro) ou <b>false</b> (falso), como um interruptor.</p>`,
          codigo: c`int quantidade = 3;
double preco = 4.50;
String produto = "Bolo de cenoura";
boolean temNoEstoque = true;`,
          pratica: [
            l("Complete com o tipo certo para guardar um preço com centavos:", c`____ preco = 12.90;`, ["double"], "Números com casas decimais usam `double`."),
            m("Qual tipo guarda o nome de um cliente?", ["String", "int", "double", "boolean"], 0, "Texto é `String` (com S maiúsculo) e o valor vai entre aspas duplas.")
          ]
        },
        {
          titulo: "O tipo precisa combinar com o valor",
          html: `<p>O Java confere se o valor cabe no tipo <b>antes</b> de rodar. <code>int preco = 4.50;</code> dá erro, porque <code>int</code> não aceita casas decimais. <code>int idade = "30";</code> também dá erro: <code>"30"</code> com aspas é texto.</p>
<p>Isso parece chato, mas é uma ajuda: o erro aparece logo, antes de o programa chegar ao cliente.</p>`,
          codigo: c`int idade = 30;        // certo
// int preco = 4.50;   // ERRO: int não aceita decimal
// int ano = "2024";   // ERRO: "2024" é texto`,
          pratica: [
            vf("`boolean aberto = \"sim\";` funciona, porque sim é verdadeiro.", false, "`boolean` só aceita `true` ou `false`, sem aspas. `\"sim\"` é um texto."),
            m("Qual destas linhas está correta?", ["double altura = 1.75;", "int altura = 1.75;", "String altura = 1.75;", "boolean altura = 1.75;"], 0, "1.75 tem casas decimais, então o tipo é `double`.")
          ]
        },
        {
          titulo: "Mudando o valor e fazendo contas",
          html: `<p>Depois de criada, a variável pode receber um <b>valor novo</b>: escreva só o nome, <code>=</code> e o valor (sem repetir o tipo). O valor antigo é substituído.</p>
<p>Variáveis também entram em contas: <code>preco * quantidade</code> usa o que estiver guardado nelas.</p>`,
          codigo: c`int estoque = 10;
estoque = 7;                 // vendeu 3, agora são 7
double preco = 2.5;
double total = preco * 4;    // 10.0
System.out.println("Estoque: " + estoque + " | Total: " + total);`,
          pratica: [
            l("Complete para mudar o valor de `pontos` para 50 (a variável já existe):", c`int pontos = 10;
____ = 50;`, ["pontos"], "Para trocar o valor, escreva só o nome da variável: `pontos = 50;`. O tipo só aparece na criação."),
            m("Depois de `int a = 4;` e `int b = a * 2;`, quanto vale `b`?", ["8", "6", "42", "a * 2"], 0, "`a` guarda 4, então `a * 2` dá 8, e esse resultado é guardado em `b`.")
          ]
        }
      ],
      codigo: c`public class Main {
    public static void main(String[] args) {
        String produto = "Bolo de cenoura";
        int quantidade = 2;
        double preco = 15.5;
        boolean entrega = true;

        double total = preco * quantidade;

        System.out.println("Produto: " + produto);
        System.out.println("Quantidade: " + quantidade);
        System.out.println("Total: R$ " + total);
        System.out.println("Entrega: " + entrega);
    }
}`,
      partes: [
        ['String produto = "Bolo de cenoura";', "Caixinha de texto chamada produto. O valor vai entre aspas."],
        ["int quantidade = 2;", "Número inteiro: quantos bolos."],
        ["double preco = 15.5;", "Número com decimal: o preço, com ponto no lugar da vírgula."],
        ["boolean entrega = true;", "Sim ou não: a entrega está combinada (true = verdadeiro)."],
        ["double total = preco * quantidade;", "Faz a conta com os valores guardados (15.5 × 2 = 31.0) e guarda o resultado em total."]
      ],
      nota: "No playground, mude a quantidade ou o preço e rode de novo: o total muda sozinho.",
      trabalho: `Cadastros de clientes e produtos são feitos de variáveis assim: nome (<code>String</code>), idade (<code>int</code>), saldo (<code>double</code>), ativo (<code>boolean</code>). No Básico você vai ver que, para dinheiro de verdade, os bancos usam um tipo mais preciso, o <code>BigDecimal</code>.`,
      entrevista: {
        pergunta: "Por que em Java precisamos dizer o tipo da variável?",
        resposta: `Porque Java é uma linguagem de <b>tipagem estática</b>: o tipo de cada variável é conferido antes de o programa rodar. Assim, erros como guardar texto onde deveria ir número são pegos cedo, pelo compilador, e não pelo cliente.`
      },
      busca: ["java variáveis para iniciantes", "java int double string boolean", "java tipos de dados"]
    },
    // ───────────────────────── p4
    {
      titulo: "Decidindo com if",
      crianca: `O <code>if</code> (“se”, em inglês) é como um <b>porteiro</b>: ele olha uma pergunta de sim ou não e decide se você entra. “<b>Se</b> estiver chovendo, leve guarda-chuva; <b>senão</b>, leve boné.” O programa faz o mesmo com os valores das variáveis.`,
      passos: [
        {
          titulo: "Perguntas de sim ou não (comparações)",
          html: `<p>Uma <b>comparação</b> é uma pergunta que responde <code>true</code> (verdadeiro) ou <code>false</code> (falso). Os sinais são: <code>&gt;</code> maior, <code>&lt;</code> menor, <code>&gt;=</code> maior ou igual, <code>&lt;=</code> menor ou igual, <code>==</code> igual e <code>!=</code> diferente.</p>
<p>Repare: para <b>comparar</b> se é igual usamos <b>dois</b> sinais <code>==</code>. Um só <code>=</code> é para guardar valor na variável.</p>`,
          codigo: c`int idade = 20;
System.out.println(idade >= 18);  // true
System.out.println(idade == 15);  // false`,
          pratica: [
            m("Qual sinal pergunta se dois números são iguais?", ["==", "=", "!=", "=>"], 0, "`==` compara. Um `=` sozinho guarda um valor na variável."),
            vf("Se `int nota = 5;`, então `nota > 7` é false.", true, "5 não é maior que 7, então a resposta da comparação é `false`.")
          ]
        },
        {
          titulo: "O if: fazer algo só quando for verdade",
          html: `<p>Escreva <code>if</code>, a comparação entre <b>parênteses</b> e, entre <b>chaves</b>, o que deve acontecer quando a resposta for <code>true</code>. Se for <code>false</code>, o Java pula o bloco.</p>`,
          codigo: c`int estoque = 2;
if (estoque < 5) {
    System.out.println("Atenção: pedir mais pães!");
}`,
          pratica: [
            l("Complete a palavra que inicia a decisão:", c`____ (saldo > 0) {
    System.out.println("Pode comprar");
}`, ["if"], "A decisão começa com `if` (se), seguida da condição entre parênteses."),
            m("Com `int temperatura = 15;`, o que acontece em `if (temperatura > 30) { System.out.println(\"Calor!\"); }`?", ["Nada aparece na tela", "Aparece Calor!", "Dá erro", "Aparece 15"], 0, "15 não é maior que 30, então a condição é falsa e o bloco é pulado.")
          ]
        },
        {
          titulo: "O else: o caminho do “senão”",
          html: `<p>Com <code>else</code> (“senão”) você diz o que fazer quando a condição for <b>falsa</b>. Sempre um dos dois caminhos acontece: ou o bloco do <code>if</code>, ou o bloco do <code>else</code>. Nunca os dois.</p>`,
          codigo: c`double nota = 7.5;
if (nota >= 6) {
    System.out.println("Aprovado");
} else {
    System.out.println("Recuperação");
}`,
          pratica: [
            m("Com `int idade = 15;`, o que este código mostra: `if (idade >= 18) { System.out.println(\"Entra\"); } else { System.out.println(\"Não entra\"); }`?", ["Não entra", "Entra", "Entra e Não entra", "Nada"], 0, "15 não é maior ou igual a 18, então vai para o `else`: `Não entra`."),
            vf("Quando a condição do `if` é verdadeira, o bloco do `else` também roda.", false, "É um ou outro: se a condição for verdadeira roda só o `if`; se for falsa, só o `else`.")
          ]
        },
        {
          titulo: "Várias faixas com else if",
          html: `<p>Para mais de dois caminhos, use <code>else if</code> (“senão, se”). O Java testa de cima para baixo e para no <b>primeiro</b> que for verdadeiro. O <code>else</code> final pega o que sobrou.</p>
<p>Um <code>boolean</code> também pode ir direto no <code>if</code>: <code>if (aberto) { ... }</code>.</p>`,
          codigo: c`int compras = 120;
if (compras >= 200) {
    System.out.println("Frete grátis");
} else if (compras >= 100) {
    System.out.println("Frete com desconto");
} else {
    System.out.println("Frete normal");
}`,
          pratica: [
            l("Complete para criar um caminho do meio:", c`if (nota >= 9) {
    System.out.println("Ótimo");
} ____ (nota >= 6) {
    System.out.println("Bom");
} else {
    System.out.println("Estude mais");
}`, ["else if"], "O caminho do meio é `else if`, seguido da nova condição entre parênteses."),
            m("No exemplo do frete, o que aparece se `compras` for 250?", ["Frete grátis", "Frete com desconto", "As duas mensagens", "Frete normal"], 0, "250 >= 200 é verdadeiro já no primeiro teste. O Java para ali e mostra só `Frete grátis`.")
          ]
        }
      ],
      codigo: c`public class Main {
    public static void main(String[] args) {
        int idade = 16;
        boolean temAutorizacao = true;

        if (idade >= 18) {
            System.out.println("Pode entrar no show");
        } else if (temAutorizacao) {
            System.out.println("Pode entrar com autorização");
        } else {
            System.out.println("Não pode entrar");
        }
    }
}`,
      partes: [
        ["if (idade >= 18) {", "Pergunta: a idade é maior ou igual a 18? Se sim, roda o bloco logo abaixo."],
        ["} else if (temAutorizacao) {", "Senão, testa outra coisa: o boolean temAutorizacao é verdadeiro?"],
        ["} else {", "Se nenhuma das perguntas deu verdadeiro, cai aqui."],
        ['System.out.println("Não pode entrar");', "Só um dos três blocos roda. Com idade 16 e autorização, aparece a segunda mensagem."]
      ],
      nota: "No playground, troque a idade para 20 e depois <code>temAutorizacao</code> para <code>false</code>, e veja cada caminho aparecer. Para comparar <b>textos</b> usamos <code>equals</code>, que você verá no Básico.",
      trabalho: `Sistemas tomam decisões o tempo todo: <b>se</b> o saldo é suficiente, aprova a compra; <b>se</b> a senha está errada, mostra um aviso; <b>se</b> o carrinho passa de R$ 200, dá frete grátis. Tudo isso é <code>if</code> e <code>else</code>.`,
      entrevista: {
        pergunta: "Qual a diferença entre = e == em Java?",
        resposta: `<code>=</code> é <b>atribuição</b>: guarda um valor na variável (<code>idade = 20</code>). <code>==</code> é <b>comparação</b>: pergunta se dois valores são iguais e responde <code>true</code> ou <code>false</code> (<code>idade == 20</code>). Dentro do <code>if</code> usamos comparações.`
      },
      busca: ["java if else para iniciantes", "java operadores de comparação", "java else if exemplo"]
    }
  ],
  fixacao: [
    vf("Java é usado em sistemas de bancos e em aplicativos Android.", true, "Java é uma das linguagens mais usadas em grandes empresas, bancos e no Android."),
    m("Onde você roda os códigos Java deste curso?", ["Num playground online, como o OneCompiler", "No bloco de notas, sem mais nada", "Dentro da calculadora do celular", "Na barra de endereço do navegador"], 0, "Java precisa de compilador. O playground online já tem tudo pronto: é só colar e clicar em Run."),
    l("Complete a linha que abre a classe:", c`public ____ Main {`, ["class"], "A classe é aberta com `public class Main {`."),
    m("Qual sinal encerra cada instrução em Java?", [";", ".", ":", ","], 0, "O ponto e vírgula `;` é o “ponto final” de cada instrução."),
    l("Complete para mostrar Olá na tela:", c`System.out.println(____);`, ['"Olá"'], "Texto vai entre aspas duplas: `System.out.println(\"Olá\");`."),
    m("O que mostra `System.out.println(10 - 3);`?", ["7", "10 - 3", "13", "103"], 0, "Sem aspas, o Java faz a conta: 10 - 3 = 7."),
    vf("Em Java, `5 * 2` é uma multiplicação.", true, "O asterisco `*` é o sinal de multiplicar."),
    m("O que mostra `System.out.println(\"Preço: \" + 3 + 2);`?", ["Preço: 32", "Preço: 5", "Preço: 3 + 2", "Dá erro"], 0, "Depois do texto, o `+` vai colando: primeiro o 3, depois o 2. Para somar antes, use parênteses: `(3 + 2)`."),
    m("Qual tipo guarda verdadeiro ou falso?", ["boolean", "int", "String", "double"], 0, "`boolean` só aceita `true` ou `false`."),
    l("Complete com o tipo para guardar a quantidade de alunos (número inteiro):", c`____ alunos = 32;`, ["int"], "Números inteiros usam `int`."),
    vf("`int preco = 9.99;` funciona normalmente.", false, "`int` não aceita casas decimais. Para 9.99, use `double`."),
    m("Com `int pedidos = 3;`, o que mostra `if (pedidos > 0) { System.out.println(\"Tem pedido\"); } else { System.out.println(\"Vazio\"); }`?", ["Tem pedido", "Vazio", "Nada", "Tem pedido e Vazio"], 0, "3 é maior que 0, então a condição é verdadeira e roda o bloco do `if`.")
  ],
  checkpoints: {
    b1: [
      m("Por onde um programa Java começa a rodar?", ["Pelo método `main`", "Pela última linha do arquivo", "Pelo primeiro comentário", "Por qualquer método aleatório"], 0, "O ponto de entrada é `public static void main(String[] args)`."),
      vf("Em `System.out.printf(\"%d anos\", idade);`, o `%d` é o lugar onde entra um número inteiro.", true, "No `printf`, `%d` é marcador de inteiro, `%s` de texto e `%.2f` de decimal com 2 casas.")
    ],
    b2: [
      m("Para comparar o CONTEÚDO de duas Strings em Java, o certo é usar:", ["`equals`", "`==`", "`=`", "`compare`"], 0, "`==` compara se é o mesmo objeto na memória; `equals` compara o texto em si."),
      l("Complete o for-each que percorre cada nota do array:", c`for (int nota ____ notas) {
    System.out.println(nota);
}`, [":"], "No for-each, os dois-pontos se leem “em”: para cada `nota` em `notas`.")
    ],
    b3: [
      vf("Deixar um atributo `private` impede que outras classes o alterem diretamente.", true, "É o encapsulamento: o dado fica escondido e só muda pelos métodos públicos da classe, como `depositar`."),
      m("O que é o construtor `public ContaBancaria(String titular)`?", ["O método que prepara o objeto quando usamos `new`", "Um método que apaga o objeto", "Um tipo de laço", "Uma variável global"], 0, "O construtor tem o mesmo nome da classe e roda no `new ContaBancaria(\"Ana\")`.")
    ],
    i1: [
      m("Qual coleção NÃO aceita elementos repetidos?", ["Set", "List", "ArrayList", "Array"], 0, "`Set` é o saquinho sem figurinhas repetidas. `List` aceita repetidos e mantém a ordem."),
      vf("Em `vendas.stream().filter(v -> v.valor() > 500)`, o `filter` mantém só as vendas acima de 500.", true, "O `filter` deixa passar apenas os itens que fazem a condição ser verdadeira.")
    ],
    i2: [
      l("Complete para a classe Pix cumprir o contrato da interface:", c`public class Pix ____ MeioPagamento {
}`, ["implements"], "Classes implementam interfaces com `implements`. Para herdar de classe, usa-se `extends`."),
      m("No `Checkout`, por que o método `finalizar` recebe um `MeioPagamento` e não um `Pix`?", ["Para funcionar com qualquer meio de pagamento (polimorfismo)", "Porque Pix não existe em Java", "Para deixar o código mais lento", "Porque interfaces são mais rápidas"], 0, "Recebendo a interface, o checkout aceita Pix, Cartão ou um futuro Boleto sem mudar nada.")
    ],
    i3: [
      vf("`SaldoInsuficienteException` estende `RuntimeException`, então é uma exceção unchecked (o compilador não obriga a tratar).", true, "Quem herda de `RuntimeException` é unchecked. Checked são as que herdam direto de `Exception`, como `IOException`."),
      m("O que faz o bloco `finally`?", ["Roda sempre, tendo dado erro ou não", "Roda só quando dá erro", "Encerra o programa", "Ignora a exceção"], 0, "O `finally` sempre executa, ideal para mensagens finais ou liberar recursos.")
    ],
    a1: [
      m("Qual anotação faz o método responder a um GET HTTP?", ["`@GetMapping`", "`@PostMapping`", "`@Entity`", "`@Id`"], 0, "`@GetMapping` liga o método a requisições GET; `@PostMapping` a POST."),
      vf("No `ProdutoController`, o `ProdutoService` chega pelo construtor porque o Spring faz a injeção de dependência.", true, "O Spring cria o service e o entrega pronto no construtor, sem você dar `new`.")
    ],
    a2: [
      l("Complete a anotação que transforma a classe em tabela do banco:", c`@____
@Table(name = "clientes")
public class Cliente {`, ["Entity"], "`@Entity` diz ao JPA que a classe representa uma tabela."),
      m("O que o Spring Data faz com o método `findByUfOrderByNomeAsc(String uf)`?", ["Gera o SQL automaticamente pelo nome do método", "Apaga clientes da UF", "Nada, precisa escrever o SQL", "Cria uma nova tabela"], 0, "O nome do método vira a consulta: filtra pela UF e ordena por nome.")
    ],
    a3: [
      vf("`AtomicInteger` é um contador seguro para ser usado por várias threads ao mesmo tempo.", true, "Ele incrementa de forma atômica, sem perder contagens como um `int` comum perderia."),
      m("O que é uma race condition?", ["Threads mexendo no mesmo dado ao mesmo tempo e gerando resultado errado", "Um laço infinito", "Um erro de digitação", "Uma thread mais rápida que o processador"], 0, "É a “briga pela panela”: sem coordenação, o resultado depende de quem chega primeiro.")
    ]
  }
};
