// Nível Iniciante da trilha cpp: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é compilar, rodar seus primeiros programas C++ num site gratuito, mostrar mensagens com cout, fazer contas, guardar valores em variáveis e tomar decisões com if.",
  topicos: [
    // ───────────────────────── p1
    {
      titulo: "O que é C++ e como rodar (compilar)",
      crianca: `Programar é escrever <b>instruções</b> para o computador, uma por linha, como uma receita de bolo. O problema é que o computador não lê português nem C++: ele só entende uma “língua de máquina”, feita de zeros e uns. <b>Compilar</b> é <b>traduzir a sua receita</b> para essa língua. Quem faz a tradução é um programa chamado <b>compilador</b>. C++ tem fama de difícil, mas aqui vamos com calma: um pedacinho de cada vez, e você só precisa copiar a “moldura” do programa e mudar a mensagem.`,
      passos: [
        {
          titulo: "Compilar: traduzir a receita",
          html: `<p>Você escreve o programa em C++, que é um texto que pessoas conseguem ler. O <b>compilador</b> lê esse texto inteiro e, se estiver tudo certo, cria um <b>programa pronto</b> para o computador rodar. É como entregar uma receita em português a um tradutor, que devolve a receita na língua do cozinheiro.</p>
<p>Se houver um erro de escrita (faltou um sinal, por exemplo), o compilador <b>para e avisa</b> a linha do problema. Isso não é bronca: é uma ajuda para você corrigir antes de rodar.</p>`,
          pratica: [
            m("O que o compilador faz?", ["Traduz o seu código C++ para a língua da máquina", "Desenha a tela do programa", "Apaga os erros sozinho", "Conecta na internet"], 0, "O compilador é o tradutor: transforma o texto que você escreveu em um programa que o computador entende."),
            vf("Se o código tiver um erro de escrita, o compilador avisa e o programa não roda.", true, "O compilador confere o texto inteiro antes. Achou um erro? Ele mostra a linha para você arrumar.")
          ]
        },
        {
          titulo: "Rodando no playground (sem instalar nada)",
          html: `<p>C++ precisa de um compilador, e ele não existe dentro desta página. Mas há sites gratuitos que já têm tudo pronto: eles se chamam <b>playground</b> (“parquinho”, em inglês).</p>
<p>Como fazer: <b>1)</b> abra <a href="https://onecompiler.com/cpp" target="_blank" rel="noopener">onecompiler.com/cpp</a>; <b>2)</b> apague o código que já vem lá; <b>3)</b> cole o seu código; <b>4)</b> clique em <b>Run</b> (“rodar”). O resultado aparece na área <b>Output</b> (“saída”). Aqui no curso, o botão <b>▶ Testar no sandbox</b> de cada tópico também leva você até o playground.</p>`,
          pratica: [
            m("No OneCompiler, qual botão compila e roda o programa?", ["Run", "Delete", "Share", "Login"], 0, "`Run` quer dizer “rodar”. O site compila e mostra o resultado na saída (Output)."),
            vf("O código C++ roda direto aqui nesta página, sem usar outro site.", false, "C++ precisa ser compilado. Por isso copiamos o código e rodamos no playground (o botão ▶ Testar no sandbox leva até lá).")
          ]
        },
        {
          titulo: "#include &lt;iostream&gt;: pegando a ferramenta",
          html: `<p>A primeira linha de quase todo programa é <code>#include &lt;iostream&gt;</code>. Pense numa <b>caixa de ferramentas</b>: o <code>#include</code> diz “traga esta caixa para cá”, e <code>iostream</code> é a caixa que sabe <b>mostrar coisas na tela</b> (e ler o teclado).</p>
<p>Logo abaixo vem <code>using namespace std;</code>. As ferramentas do C++ ficam numa “gaveta” chamada <code>std</code>; essa linha deixa você usar tudo sem escrever <code>std::</code> na frente toda vez. Por enquanto, copie as duas linhas sempre iguais.</p>`,
          codigo: c`#include <iostream>
using namespace std;`,
          pratica: [
            l("Complete o nome da caixa de ferramentas que mostra coisas na tela:", c`#include <____>`, ["iostream"], "A caixa é `iostream` (de input/output stream, “fluxo de entrada e saída”)."),
            m("Para que serve `using namespace std;`?", ["Deixa usar `cout` sem escrever `std::` na frente", "Faz uma conta", "Mostra um texto na tela", "Fecha o programa"], 0, "As ferramentas moram na gaveta `std`. Com essa linha, `std::cout` pode ser escrito só como `cout`.")
          ]
        },
        {
          titulo: "int main(): a porta de entrada",
          html: `<p>Todo programa C++ tem um <code>int main()</code>. É a <b>porta de entrada</b>: quando o programa roda, ele entra por aqui e executa as instruções que estão entre as chaves <code>{</code> e <code>}</code>, de cima para baixo.</p>
<p>A última instrução é <code>return 0;</code>, que quer dizer “terminei, e deu tudo certo”. O <code>0</code> é o recado de “sem problemas” para o computador.</p>`,
          codigo: c`int main() {
    // as instruções vão aqui
    return 0;
}`,
          pratica: [
            m("O que é o `int main()`?", ["O ponto onde o programa começa a rodar", "Uma conta de multiplicar", "O nome do arquivo", "Um comentário"], 0, "O `main` é a porta de entrada: o programa começa pelas instruções que estão dentro dele."),
            l("Complete a última linha, que avisa “terminei sem erro”:", c`int main() {
    ____ 0;
}`, ["return"], "`return 0;` encerra o `main` e avisa que deu tudo certo.")
          ]
        },
        {
          titulo: "cout: a boca do programa (e o ponto e vírgula)",
          html: `<p>O <code>cout</code> (fala-se “si-aut”) é a <b>boca</b> do programa: ele mostra coisas na tela. Use as setinhas <code>&lt;&lt;</code> para “empurrar” o texto até ele. O texto vai entre <b>aspas duplas</b>.</p>
<p>Toda instrução termina com <b>ponto e vírgula</b> <code>;</code>, que é o “ponto final” do C++. Esquecer o <code>;</code> é o erro mais comum de quem começa, e tudo bem: o compilador avisa.</p>`,
          codigo: c`cout << "Bom dia!";`,
          pratica: [
            l("Complete as setinhas que levam o texto até o `cout`:", c`cout ____ "Padaria aberta";`, ["<<"], "As setinhas `<<` empurram o texto para o `cout`, que mostra na tela."),
            m("Qual linha está escrita do jeito certo?", ["cout << \"Oi\";", "cout << Oi;", "cout << \"Oi\"", "cout >> \"Oi\";"], 0, "Texto entre aspas, setinhas `<<` e ponto e vírgula no final.")
          ]
        }
      ],
      codigo: c`#include <iostream>
using namespace std;

int main() {
    cout << "Olá, mundo!" << endl;
    cout << "Estou aprendendo C++" << endl;
    return 0;
}`,
      partes: [
        [c`#include <iostream>`, "Traz a caixa de ferramentas que mostra coisas na tela (`cout`)."],
        [c`using namespace std;`, "Deixa escrever `cout` em vez de `std::cout`."],
        [c`int main() {`, "A porta de entrada: o programa começa aqui. A chave `{` abre o bloco."],
        [c`cout << "Olá, mundo!" << endl;`, "Mostra o texto entre aspas. O `endl` pula para a próxima linha (vamos ver no próximo tópico). O `;` encerra a instrução."],
        [c`return 0;`, "Termina o programa avisando que deu tudo certo."],
        [c`}`, "Fecha o bloco do `main`. Toda chave que abre precisa fechar."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b> (ou abra onecompiler.com/cpp), apague o código que estiver lá, cole o seu, clique em <b>Run</b> e troque as frases pelo que quiser.",
      trabalho: `Jogos, navegadores e o sistema de um caixa eletrônico começam com essa mesma moldura: <code>#include</code>, <code>int main()</code> e instruções dentro das chaves. Mensagens como “Saque realizado” saem de algo parecido com um <code>cout</code>.`,
      entrevista: {
        pergunta: "O que acontece se eu esquecer o ponto e vírgula?",
        resposta: `O compilador <b>não gera o programa</b> e mostra um erro com a linha do problema, algo como <code>expected ';'</code> (“esperava um ponto e vírgula”). É só colocar o <code>;</code> no fim da instrução e rodar de novo. Ler a mensagem de erro com calma é uma habilidade que todo programador treina.`
      },
      busca: ["c++ primeiro programa hello world", "onecompiler c++", "o que é compilador"]
    },
    // ───────────────────────── p2
    {
      titulo: "Contas e textos",
      crianca: `O computador é uma <b>calculadora muito rápida</b>. Em C++ você escreve a conta e o <code>cout</code> mostra o resultado. E as setinhas <code>&lt;&lt;</code> funcionam como um <b>trenzinho</b>: cada vagão (um texto, um número) entra na fila e tudo aparece na tela, um atrás do outro.`,
      passos: [
        {
          titulo: "Somar, subtrair e multiplicar",
          html: `<p>Para mostrar o resultado de uma conta, escreva a conta <b>sem aspas</b>. Use <code>+</code> para somar, <code>-</code> para subtrair e <code>*</code> (asterisco) para multiplicar, já que no teclado não existe “×”.</p>`,
          codigo: c`cout << 5 + 3;    // 8
cout << 10 - 4;   // 6
cout << 3 * 2;    // 6`,
          pratica: [
            m("O que aparece na tela com `cout << 7 + 2;`?", ["9", "7 + 2", "72", "Dá erro"], 0, "Sem aspas, o C++ faz a conta: 7 + 2 = 9."),
            l("Complete para calcular o preço de 4 pães de R$ 2:", c`cout << 4 ____ 2;`, ["*"], "A multiplicação é o asterisco: `4 * 2` dá 8.")
          ]
        },
        {
          titulo: "Dividir: cuidado com os inteiros",
          html: `<p>A divisão é a barra <code>/</code>. Mas atenção: quando os <b>dois números são inteiros</b> (sem ponto), o C++ joga fora a parte quebrada. <code>7 / 2</code> dá <b>3</b>, não 3.5!</p>
<p>Para ver o resultado com vírgula, escreva um dos números com <b>ponto</b>: <code>7.0 / 2</code> dá <b>3.5</b>. Em programação, a casa decimal usa ponto, não vírgula.</p>`,
          codigo: c`cout << 7 / 2;     // 3   (inteiros)
cout << 7.0 / 2;   // 3.5 (com decimal)`,
          pratica: [
            m("Quanto mostra `cout << 9 / 2;`?", ["4", "4.5", "5", "9 / 2"], 0, "Os dois números são inteiros, então a parte quebrada some: 9 / 2 dá 4."),
            l("Complete para que a divisão mostre 2.5 (dividindo 5 por 2):", c`cout << ____ / 2;`, ["5.0", "5."], "Com um número decimal (`5.0`), a divisão mantém as casas: 5.0 / 2 = 2.5.")
          ]
        },
        {
          titulo: "O resto da divisão: %",
          html: `<p>O sinal <code>%</code> dá o <b>resto</b> da divisão (só com inteiros). Pense em 7 balas para 2 crianças: cada uma ganha 3 e <b>sobra 1</b>. Então <code>7 % 2</code> dá <b>1</b>.</p>
<p>Um truque famoso: se <code>numero % 2</code> der 0, o número é <b>par</b>.</p>`,
          codigo: c`cout << 7 % 2;    // 1  (sobra 1)
cout << 10 % 3;   // 1  (10 = 3 x 3 + 1)
cout << 8 % 2;    // 0  (8 é par)`,
          pratica: [
            m("Quanto mostra `cout << 10 % 4;`?", ["2", "2.5", "4", "0"], 0, "10 dividido por 4 dá 2 e sobra 2 (4 x 2 = 8; 10 - 8 = 2). O `%` mostra a sobra."),
            vf("`12 % 2` dá 0, porque 12 é par.", true, "12 dividido por 2 não deixa sobra nenhuma, então o resto é 0.")
          ]
        },
        {
          titulo: "Textos entre aspas e o trenzinho <<",
          html: `<p>Texto vai entre <b>aspas duplas</b>. Com aspas, o C++ mostra exatamente o que está escrito, sem fazer conta: <code>"2 + 3"</code> aparece como <b>2 + 3</b>.</p>
<p>Para mostrar várias coisas juntas, encadeie com <code>&lt;&lt;</code>: <code>cout &lt;&lt; "Total: " &lt;&lt; 2 + 3;</code> mostra <b>Total: 5</b>. Repare no espaço dentro das aspas, depois dos dois-pontos: sem ele, fica tudo grudado.</p>`,
          codigo: c`cout << "2 + 3";                 // 2 + 3
cout << "Total: " << 2 + 3;      // Total: 5
cout << "Pães: " << 6 << " unidades";`,
          pratica: [
            m("O que aparece com `cout << \"5 * 2\";`?", ["5 * 2", "10", "52", "Dá erro"], 0, "Entre aspas é texto: aparece do jeito que está, sem calcular."),
            l("Complete para mostrar Itens: 3 na tela:", c`cout << "Itens: " ____ 3;`, ["<<"], "Cada pedaço do trenzinho entra com `<<`: primeiro o texto, depois o número.")
          ]
        },
        {
          titulo: "endl: pulando de linha",
          html: `<p>O <code>cout</code> <b>não pula de linha sozinho</b>: dois <code>cout</code> seguidos ficam grudados na mesma linha. Para pular, coloque <code>endl</code> (de <i>end line</i>, “fim da linha”) no final do trenzinho.</p>`,
          codigo: c`cout << "Pão" << endl;
cout << "Leite" << endl;
// Na tela:
// Pão
// Leite`,
          pratica: [
            vf("Sem `endl`, `cout << \"A\"; cout << \"B\";` mostra A e B em linhas separadas.", false, "Sem `endl`, tudo fica na mesma linha: aparece `AB`. O `endl` é que pula a linha."),
            m("Para que serve o `endl`?", ["Pular para a próxima linha", "Encerrar o programa", "Apagar a tela", "Somar números"], 0, "`endl` quer dizer “fim da linha”: o próximo texto aparece embaixo.")
          ]
        }
      ],
      codigo: c`#include <iostream>
using namespace std;

int main() {
    cout << "Padaria do Bairro" << endl;
    cout << "6 pães de R$ 2: R$ " << 6 * 2 << endl;
    cout << "Pizza para 3 amigos: " << 8 / 3 << " fatias cada" << endl;
    cout << "Sobram " << 8 % 3 << " fatias" << endl;
    cout << "Metade de 7: " << 7.0 / 2 << endl;
    return 0;
}`,
      partes: [
        [c`cout << "Padaria do Bairro" << endl;`, "Texto entre aspas aparece exatamente como está; o `endl` pula a linha."],
        [c`"6 pães de R$ 2: R$ " << 6 * 2`, "Primeiro o texto, depois o resultado da conta (12), tudo no mesmo trenzinho."],
        [c`8 / 3`, "Divisão entre inteiros: dá 2 (a parte quebrada some)."],
        [c`8 % 3`, "O resto da divisão: 8 fatias para 3 pessoas, sobram 2."],
        [c`7.0 / 2`, "Com um número decimal, a divisão mostra 3.5."]
      ],
      nota: "No playground, troque os números e veja o resultado mudar. Experimente tirar um <code>endl</code> para ver as linhas grudarem.",
      trabalho: `O caixa do supermercado faz exatamente isso: quantidade vezes preço, soma do carrinho, troco. O <code>%</code> aparece em coisas como dividir itens em caixas (quantos sobram?) e descobrir se um número é par.`,
      entrevista: {
        pergunta: "Por que 7 / 2 dá 3 em C++?",
        resposta: `Porque <code>7</code> e <code>2</code> são <b>inteiros</b> (<code>int</code>), e divisão entre inteiros descarta a parte decimal. Para obter 3.5, pelo menos um dos números precisa ser decimal, como <code>7.0 / 2</code>. O que sobrou da divisão inteira pode ser obtido com <code>7 % 2</code>, que dá 1.`
      },
      busca: ["c++ operadores aritméticos", "c++ divisão inteira", "c++ operador resto %"]
    },
    // ───────────────────────── p3
    {
      titulo: "Variáveis e tipos (int, double, string, bool)",
      crianca: `Uma <b>variável</b> é uma <b>caixinha com etiqueta</b> onde você guarda um valor para usar depois. Em C++, a etiqueta também diz o <b>tipo</b> do que cabe na caixinha: na caixa de ovos só cabem ovos, na caixa de sapatos só cabem sapatos. Uma caixinha para números inteiros não aceita texto.`,
      passos: [
        {
          titulo: "Criando uma variável: tipo nome = valor;",
          html: `<p>Para criar uma variável, escreva o <b>tipo</b>, o <b>nome</b>, o sinal <code>=</code> e o <b>valor</b>, terminando com <code>;</code>. O <code>=</code> aqui não é o “igual” da matemática: quer dizer “<b>guarde</b> este valor na caixinha”.</p>
<p>Para usar o valor, escreva o nome da variável <b>sem aspas</b>.</p>`,
          codigo: c`int paes = 6;
cout << paes << endl;               // 6
cout << "Pães: " << paes << endl;   // Pães: 6`,
          pratica: [
            m("Na linha `int idade = 30;`, qual é o nome da variável?", ["idade", "int", "30", "="], 0, "Primeiro vem o tipo (`int`), depois o nome (`idade`) e depois o valor (`30`)."),
            vf("`cout << \"paes\";` mostra o valor guardado na variável paes.", false, "Com aspas, aparece só a palavra `paes`. Para ver o valor, escreva sem aspas: `cout << paes;`.")
          ]
        },
        {
          titulo: "Os 4 tipos mais usados",
          html: `<p><code>int</code>: números <b>inteiros</b> (idade, quantidade). <code>double</code>: números com <b>casas decimais</b> (preço, altura), sempre com ponto. <code>string</code>: <b>textos</b>, entre aspas duplas. <code>bool</code>: só <code>true</code> (verdadeiro) ou <code>false</code> (falso), como um interruptor.</p>
<p>Para usar <code>string</code>, traga mais uma caixa de ferramentas no topo: <code>#include &lt;string&gt;</code>.</p>`,
          codigo: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    int quantidade = 3;
    double preco = 4.50;
    string produto = "Bolo de cenoura";
    bool temNoEstoque = true;
    cout << produto << ": R$ " << preco << endl;
    return 0;
}`,
          pratica: [
            l("Complete com o tipo certo para guardar um preço com centavos:", c`____ preco = 12.90;`, ["double"], "Números com casas decimais usam `double`."),
            l("Complete a caixa de ferramentas necessária para usar textos:", c`#include <____>`, ["string"], "`#include <string>` traz o tipo `string`, usado para textos.")
          ]
        },
        {
          titulo: "Mudando o valor da caixinha",
          html: `<p>Uma variável pode <b>mudar de valor</b> (por isso o nome “variável”). Depois de criada, não repita o tipo: escreva só <code>nome = novoValor;</code>. O valor antigo é jogado fora.</p>
<p>Também dá para usar o próprio valor na conta: <code>estoque = estoque - 2;</code> pega o valor atual, tira 2 e guarda de volta.</p>`,
          codigo: c`int estoque = 10;
estoque = 8;              // agora vale 8
estoque = estoque - 2;    // 8 - 2 = 6
cout << estoque << endl;  // 6`,
          pratica: [
            m("Depois de `int x = 5;` e `x = x + 3;`, quanto vale `x`?", ["8", "5", "3", "53"], 0, "Pega o valor atual (5), soma 3 e guarda de volta: 8."),
            vf("Para mudar o valor de uma variável que já existe, é preciso escrever o tipo de novo: `int estoque = 8;`.", false, "O tipo só aparece quando a variável é criada. Depois, basta `estoque = 8;`. Repetir o tipo dá erro de “variável já declarada”.")
          ]
        },
        {
          titulo: "bool aparece como 1 ou 0 (e o boolalpha)",
          html: `<p>Surpresa do C++: ao mostrar um <code>bool</code> com <code>cout</code>, aparece <b>1</b> para <code>true</code> e <b>0</b> para <code>false</code>.</p>
<p>Para ver as palavras <b>true</b> e <b>false</b>, coloque <code>boolalpha</code> no trenzinho antes. Ele vale dali para frente.</p>`,
          codigo: c`bool aberto = true;
cout << aberto << endl;               // 1
cout << boolalpha << aberto << endl;  // true`,
          pratica: [
            m("O que aparece com `bool pago = false;` e `cout << pago;`?", ["0", "false", "1", "pago"], 0, "Sem `boolalpha`, o `cout` mostra `false` como 0 e `true` como 1."),
            l("Complete para que apareça true (e não 1) na tela:", c`bool ativo = true;
cout << ____ << ativo;`, ["boolalpha"], "O `boolalpha` faz o `bool` aparecer como `true`/`false`.")
          ]
        }
      ],
      codigo: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    string produto = "Café";
    int quantidade = 2;
    double preco = 4.5;
    bool pago = false;

    cout << produto << " x" << quantidade << endl;
    cout << "Total: R$ " << quantidade * preco << endl;
    quantidade = 3;
    cout << "Agora: " << quantidade << endl;
    cout << boolalpha << "Pago: " << pago << endl;
    return 0;
}`,
      partes: [
        [c`#include <string>`, "Traz o tipo `string`, para guardar textos."],
        [c`string produto = "Café";`, "Caixinha de texto: o valor vai entre aspas duplas."],
        [c`int quantidade = 2; double preco = 4.5;`, "Um número inteiro e um número com casas decimais (com ponto)."],
        [c`bool pago = false;`, "Verdadeiro ou falso. Aqui começa como falso."],
        [c`quantidade * preco`, "Usa os valores guardados na conta: 2 * 4.5 = 9."],
        [c`quantidade = 3;`, "Muda o valor sem repetir o tipo."],
        [c`cout << boolalpha << "Pago: " << pago`, "Com `boolalpha`, aparece `false` em vez de 0."]
      ],
      nota: "No playground, mude os valores das variáveis e veja o total mudar. Tire o <code>boolalpha</code> para ver o <code>0</code> aparecer.",
      trabalho: `Todo sistema guarda dados em variáveis: o nome do cliente (<code>string</code>), a quantidade no carrinho (<code>int</code>), o preço (<code>double</code>) e se o pedido foi pago (<code>bool</code>). Escolher o tipo certo evita erros como cobrar R$ 4 em vez de R$ 4.50.`,
      entrevista: {
        pergunta: "Por que o C++ obriga a dizer o tipo da variável?",
        resposta: `Porque C++ é uma linguagem de <b>tipos fixos</b>: o compilador precisa saber quanto espaço reservar e quais operações são permitidas. A vantagem é que erros como guardar um texto onde deveria haver um número aparecem <b>na hora de compilar</b>, antes de o programa chegar ao usuário.`
      },
      busca: ["c++ tipos de variáveis int double", "c++ std::string iniciante", "c++ bool boolalpha"]
    },
    // ───────────────────────── p4
    {
      titulo: "Decidindo com if",
      crianca: `O <code>if</code> (“se”, em inglês) é o <b>porteiro</b> do programa: ele olha uma pergunta de sim ou não e decide se deixa passar. “<b>Se</b> estiver chovendo, leve o guarda-chuva; <b>senão</b>, leve o boné.” O programa faz um caminho ou o outro, nunca os dois.`,
      passos: [
        {
          titulo: "Comparações: perguntas de sim ou não",
          html: `<p>Uma comparação é uma pergunta que responde <b>verdadeiro</b> ou <b>falso</b>. Os sinais são: <code>&gt;</code> (maior), <code>&lt;</code> (menor), <code>&gt;=</code> (maior ou igual), <code>&lt;=</code> (menor ou igual), <code>==</code> (igual) e <code>!=</code> (diferente).</p>`,
          codigo: c`int idade = 20;
cout << (idade >= 18) << endl;   // 1 (verdadeiro)
cout << (idade < 10) << endl;    // 0 (falso)`,
          pratica: [
            m("Com `int nota = 6;`, quanto vale `nota >= 7`?", ["Falso", "Verdadeiro", "6", "7"], 0, "6 não é maior nem igual a 7, então a resposta é falso."),
            m("Qual sinal quer dizer “diferente”?", ["`!=`", "`==`", "`=`", "`<>`"], 0, "`!=` pergunta se os valores são diferentes.")
          ]
        },
        {
          titulo: "== compara, = guarda",
          html: `<p>Cuidado com a diferença: <b>um</b> sinal de igual (<code>=</code>) <b>guarda</b> um valor na variável. <b>Dois</b> sinais (<code>==</code>) <b>perguntam</b> se os valores são iguais.</p>
<p>Escrever <code>if (x = 5)</code> no lugar de <code>if (x == 5)</code> é um erro clássico: o programa guarda 5 em vez de comparar.</p>`,
          codigo: c`int mesa = 4;          // guarda 4
cout << (mesa == 4);   // pergunta: é igual a 4? → 1`,
          pratica: [
            l("Complete para perguntar se a senha é igual a 1234:", c`if (senha ____ 1234) {`, ["=="], "Para comparar, use dois sinais de igual: `==`."),
            vf("`x = 10` e `x == 10` fazem a mesma coisa.", false, "`x = 10` guarda o 10 em `x`; `x == 10` pergunta se `x` vale 10.")
          ]
        },
        {
          titulo: "if: só faz se for verdade",
          html: `<p>O <code>if</code> recebe a pergunta <b>entre parênteses</b>. Se a resposta for verdadeira, ele executa o que está entre as chaves <code>{ }</code>. Se for falsa, pula o bloco inteiro.</p>`,
          codigo: c`int idade = 20;
if (idade >= 18) {
    cout << "Pode dirigir" << endl;
}`,
          pratica: [
            m("Com `int saldo = 50;`, o que o código `if (saldo > 100) { cout << \"Rico\"; }` mostra?", ["Nada", "Rico", "50", "Dá erro"], 0, "50 não é maior que 100, então o `if` pula o bloco e nada aparece."),
            l("Complete a palavra que faz a pergunta:", c`____ (temperatura > 30) {
    cout << "Que calor!" << endl;
}`, ["if"], "O `if` testa a condição entre parênteses.")
          ]
        },
        {
          titulo: "else: o caminho do “senão”",
          html: `<p>O <code>else</code> (“senão”) vem logo depois do bloco do <code>if</code> e roda <b>quando a pergunta é falsa</b>. Assim o programa sempre faz um dos dois caminhos.</p>`,
          codigo: c`int nota = 5;
if (nota >= 7) {
    cout << "Aprovado" << endl;
} else {
    cout << "Estude mais um pouco" << endl;
}`,
          pratica: [
            m("Com `nota = 5`, o código acima mostra o quê?", ["Estude mais um pouco", "Aprovado", "As duas frases", "Nada"], 0, "5 >= 7 é falso, então roda o bloco do `else`."),
            vf("Num `if/else`, os dois blocos podem rodar ao mesmo tempo.", false, "É um ou outro: se a condição for verdadeira, roda o `if`; se for falsa, roda o `else`.")
          ]
        },
        {
          titulo: "else if: mais de dois caminhos",
          html: `<p>Quando há mais opções, use <code>else if</code> (“senão, se”). O C++ testa de <b>cima para baixo</b> e para no <b>primeiro</b> que for verdadeiro. O <code>else</code> do final pega o que sobrou.</p>`,
          codigo: c`int compras = 150;
if (compras >= 200) {
    cout << "Frete grátis" << endl;
} else if (compras >= 100) {
    cout << "Frete pela metade" << endl;
} else {
    cout << "Frete normal" << endl;
}`,
          pratica: [
            m("Com `compras = 150`, qual mensagem aparece?", ["Frete pela metade", "Frete grátis", "Frete normal", "Todas"], 0, "150 não é >= 200, mas é >= 100: entra no `else if` e para ali."),
            m("Com `compras = 250`, quantas mensagens aparecem?", ["1", "2", "3", "Nenhuma"], 0, "250 >= 200 já é verdadeiro no primeiro teste. O C++ mostra “Frete grátis” e pula o resto.")
          ]
        }
      ],
      codigo: c`#include <iostream>
using namespace std;

int main() {
    int idade = 16;
    double compra = 80.0;

    if (idade >= 18) {
        cout << "Pode comprar" << endl;
    } else {
        cout << "Precisa de um responsável" << endl;
    }

    if (compra >= 100) {
        cout << "Ganhou um brinde" << endl;
    } else if (compra >= 50) {
        cout << "Ganhou um cupom" << endl;
    } else {
        cout << "Obrigado pela compra" << endl;
    }
    return 0;
}`,
      partes: [
        [c`if (idade >= 18) {`, "Pergunta: a idade é maior ou igual a 18? Com 16, é falso."],
        [c`} else {`, "Como a pergunta foi falsa, roda este bloco: “Precisa de um responsável”."],
        [c`if (compra >= 100) {`, "80 não é >= 100, então segue para o próximo teste."],
        [c`} else if (compra >= 50) {`, "80 é >= 50: mostra “Ganhou um cupom” e pula o resto."],
        [c`else { cout << "Obrigado pela compra" << endl; }`, "Só rodaria se nenhuma pergunta anterior fosse verdadeira."]
      ],
      nota: "No playground, mude <code>idade</code> e <code>compra</code> e veja outras mensagens aparecerem.",
      trabalho: `Decisões estão em todo lugar: o caixa eletrônico só libera o saque <b>se</b> houver saldo; a loja dá frete grátis <b>se</b> a compra passar de um valor; o jogo mostra “Game over” <b>se</b> as vidas acabarem.`,
      entrevista: {
        pergunta: "Qual a diferença entre = e == em C++?",
        resposta: `<code>=</code> é <b>atribuição</b>: guarda um valor na variável. <code>==</code> é <b>comparação</b>: pergunta se dois valores são iguais e responde verdadeiro ou falso. Trocar um pelo outro dentro do <code>if</code> é um bug clássico; compilar com avisos ligados (<code>-Wall</code>) ajuda o compilador a apontar esse erro.`
      },
      busca: ["c++ if else iniciante", "c++ operadores de comparação", "c++ else if exemplo"]
    }
  ],
  fixacao: [
    m("O que significa compilar um programa?", ["Traduzir o código para a língua da máquina", "Apagar o código", "Desenhar a tela", "Salvar na nuvem"], 0, "O compilador traduz o texto em C++ para um programa que o computador entende."),
    m("Qual linha traz a ferramenta para mostrar textos na tela?", ["`#include <iostream>`", "`#include <tela>`", "`return 0;`", "`int main()`"], 0, "`iostream` é a caixa de ferramentas com o `cout`."),
    vf("Todo programa C++ começa a rodar pelo `int main()`.", true, "O `main` é a porta de entrada do programa."),
    l("Complete o sinal que termina toda instrução:", c`cout << "Oi"____`, [";"], "O ponto e vírgula é o “ponto final” do C++."),
    m("Quanto mostra `cout << 8 / 3;`?", ["2", "2.66", "3", "8 / 3"], 0, "Divisão entre inteiros descarta a parte quebrada: 8 / 3 dá 2."),
    m("Quanto mostra `cout << 8 % 3;`?", ["2", "0", "3", "2.66"], 0, "8 dividido por 3 dá 2 e sobram 2. O `%` mostra a sobra."),
    vf("O `endl` faz o próximo texto aparecer na linha de baixo.", true, "`endl` significa “fim da linha”."),
    l("Complete com o tipo certo para guardar o nome de um cliente:", c`____ cliente = "Joana";`, ["string", "std::string"], "Textos usam o tipo `string` (com `#include <string>`)."),
    m("Qual tipo guarda a quantidade de pães (um número inteiro)?", ["int", "double", "string", "bool"], 0, "Números inteiros usam `int`."),
    m("Sem `boolalpha`, o que `cout << true;` mostra?", ["1", "true", "0", "verdadeiro"], 0, "O `cout` mostra `true` como 1 e `false` como 0, a não ser que você use `boolalpha`."),
    l("Complete para perguntar se a quantidade é igual a zero:", c`if (quantidade ____ 0) {`, ["=="], "Comparar usa `==`; um `=` só guardaria o valor."),
    m("Com `int x = 3;`, o que `if (x > 5) { cout << \"A\"; } else { cout << \"B\"; }` mostra?", ["B", "A", "AB", "Nada"], 0, "3 > 5 é falso, então roda o `else` e aparece B.")
  ],
  checkpoints: {
    b1: [
      m("No tópico, para que serve o `cin`?", ["Ler o que a pessoa digita no teclado", "Mostrar texto na tela", "Compilar o programa", "Criar uma constante"], 0, "O `cout` é a boca (fala na tela) e o `cin` é o ouvido (escuta o teclado)."),
      m("O que acontece se você tentar mudar `PRECO_CAFE`, criada com `const double PRECO_CAFE = 4.50;`?", ["Dá erro de compilação", "O valor muda normalmente", "O programa trava ao rodar", "Vira zero"], 0, "`const` cria um valor que não pode mudar: o compilador recusa qualquer tentativa.")
    ],
    b2: [
      m("Na analogia do tópico, o `while` é como o quê?", ["Uma torneira que fica aberta enquanto o balde não enche", "Um porteiro", "Uma esteira", "Uma calculadora"], 0, "O `while` repete enquanto a condição for verdadeira, como a torneira aberta até o balde encher."),
      vf("No `switch`, se você esquecer o `break`, a execução “cai” no caso seguinte.", true, "Sem `break`, o programa continua executando os próximos `case` (fall-through).")
    ],
    b3: [
      m("Na analogia do tópico, passar por referência (`&`) é como entregar o quê?", ["O documento original, que a função pode alterar", "Uma fotocópia", "Um papel em branco", "Um recibo"], 0, "Por valor a função recebe uma cópia; com `&` recebe o original e pode modificá-lo."),
      m("No código do tópico, quanto vale `n` depois de `dobrarCopia(n)` (com `n = 5`)?", ["5", "10", "0", "25"], 0, "`dobrarCopia` recebe uma cópia: dobra só a cópia e o `n` original continua 5.")
    ],
    i1: [
      l("Complete para adicionar 65 no final do vector:", c`pontos.____(65);`, ["push_back"], "`push_back` acrescenta um item no fim e o vector cresce sozinho."),
      m("No código do tópico, o que `email.substr(0, arroba)` devolve para `Ana.Souza@Email.com`?", ["Ana.Souza", "Email.com", "@", "Ana.Souza@"], 0, "Recorta do início (posição 0) até antes do `@`: o nome de usuário.")
    ],
    i2: [
      vf("O que é `private` numa classe só pode ser acessado de dentro da própria classe.", true, "Por isso `conta.saldo = 1000000;` nem compila: o saldo só muda pelos métodos da classe."),
      m("Qual a diferença entre `class` e `struct` explicada no tópico?", ["Na `struct` tudo é public por padrão", "A `struct` não pode ter métodos", "A `class` não tem construtor", "Nenhuma, são idênticas em tudo"], 0, "A única diferença técnica é o acesso padrão: public na struct e private na class.")
    ],
    i3: [
      m("Na linha `int* ptr = &idade;`, o que o `&` faz?", ["Pega o endereço de `idade`", "Multiplica idade", "Apaga idade", "Cria uma referência constante"], 0, "`&idade` é o endereço da variável; o ponteiro `ptr` guarda esse endereço."),
      vf("O `unique_ptr` libera a memória sozinho quando sai de escopo, sem precisar de `delete`.", true, "Esse é o RAII: o destrutor roda automaticamente no fim do bloco.")
    ],
    a1: [
      m("Na analogia do tópico, o `set` é como o quê?", ["Um álbum de figurinhas sem repetidas", "Uma agenda de telefones", "Uma esteira", "Uma fôrma de gelo"], 0, "O `set` guarda valores únicos (e em ordem): repetidos são descartados."),
      m("No código do tópico, quantas vezes `pix` aparece em `contagem` depois do laço?", ["3", "2", "1", "6"], 0, "A lista tem `pix` três vezes; `contagem[p]++` soma 1 a cada aparição.")
    ],
    a2: [
      vf("Uma classe com uma função `virtual ... = 0` é abstrata e não pode ser instanciada diretamente.", true, "A função virtual pura obriga as classes filhas a implementá-la; `Forma` sozinha não vira objeto."),
      m("No tópico, o template é comparado a quê?", ["Uma fôrma de gelo que serve para vários líquidos", "Um alarme de incêndio", "Uma agenda", "Um porteiro"], 0, "O mesmo código (a fôrma) funciona para tipos diferentes, como `maior(3, 9)` e `maior(2.5, 1.5)`.")
    ],
    a3: [
      m("Na analogia do tópico, o que faz o `throw`?", ["Aperta o alarme (lança a exceção)", "Resolve o problema", "Fecha o arquivo", "Compila o projeto"], 0, "O `throw` dispara o alarme; quem está preparado com `catch` resolve."),
      m("No tópico, o arquivo `.h` é comparado a quê?", ["O cardápio (o que existe)", "A cozinha (como é feito)", "O caderno", "O alarme"], 0, "O `.h` traz as declarações (o cardápio); o `.cpp` traz a implementação (a cozinha).")
    ]
  }
};
