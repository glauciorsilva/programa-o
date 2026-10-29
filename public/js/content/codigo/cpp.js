// Exercícios de código da trilha cpp (completar e criar do zero), por tópico.
const c = String.raw;

export default {
  // ───────────────────────── b1: Estrutura, cout/cin e variáveis
  b1: [
    {
      tipo: "completar",
      titulo: "Ficha da funcionária",
      enunciado: `O RH precisa guardar os dados de uma funcionária em variáveis com o <b>tipo certo</b>:
        <ul>
          <li><code>nome</code> é um texto;</li>
          <li><code>idade</code> é um número inteiro;</li>
          <li><code>salario</code> é um número decimal;</li>
          <li><code>ativa</code> é verdadeiro ou falso.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta (o tipo de cada variável).`,
      dica: `Os tipos são <code>string</code>, <code>int</code>, <code>double</code> e <code>bool</code>. O <code>boolalpha</code> faz o <code>bool</code> aparecer como <code>true</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    ____ nome = "Carla Mendes";
    ____ idade = 29;
    ____ salario = 3500.5;
    ____ ativa = true;
    char setor = 'F';

    cout << "Funcionária: " << nome << '\n';
    cout << "Idade: " << idade << " anos\n";
    cout << "Salário: " << salario << '\n';
    cout << boolalpha << "Ativa: " << ativa << '\n';
    cout << "Setor: " << setor << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    string nome = "Carla Mendes";
    int idade = 29;
    double salario = 3500.5;
    bool ativa = true;
    char setor = 'F';

    cout << "Funcionária: " << nome << '\n';
    cout << "Idade: " << idade << " anos\n";
    cout << "Salário: " << salario << '\n';
    cout << boolalpha << "Ativa: " << ativa << '\n';
    cout << "Setor: " << setor << '\n';
    return 0;
}
`,
      padroes: [
        [/\b(std::)?string\s+nome\s*=/, "nome é um texto: use o tipo string."],
        [/\bint\s+idade\s*=/, "idade é um número inteiro: use int."],
        [/\bdouble\s+salario\s*=/, "salario tem casas decimais: use double."],
        [/\bbool\s+ativa\s*=/, "ativa é verdadeiro/falso: use bool."]
      ],
      saidaEsperada: "Funcionária: Carla Mendes\nIdade: 29 anos\nSalário: 3500.5\nAtiva: true\nSetor: F"
    },
    {
      tipo: "completar",
      titulo: "Etiqueta de preço com 2 casas",
      enunciado: `Na mercearia, a etiqueta precisa mostrar o preço <b>sempre com duas casas decimais</b>. Para isso, inclua o cabeçalho
        que traz os formatadores e use <code>fixed</code> e <code>setprecision(2)</code>.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Produto: Café 500g
Preço: R$ 18.90
Estoque: 42 unidades</pre>`,
      dica: `<code>fixed</code> e <code>setprecision</code> moram no cabeçalho <code>&lt;iomanip&gt;</code>. Sem eles, o preço sairia como <code>18.9</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <____>
#include <string>
using namespace std;

int main() {
    string produto = "Café 500g";
    double preco = 18.9;
    int estoque = 42;

    cout << "Produto: " << produto << '\n';
    cout << ____ << ____ << "Preço: R$ " << preco << '\n';
    cout << "Estoque: " << estoque << " unidades\n";
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string produto = "Café 500g";
    double preco = 18.9;
    int estoque = 42;

    cout << "Produto: " << produto << '\n';
    cout << fixed << setprecision(2) << "Preço: R$ " << preco << '\n';
    cout << "Estoque: " << estoque << " unidades\n";
    return 0;
}
`,
      padroes: [
        [/#include\s*<iomanip>/, "Inclua o cabeçalho <iomanip>, onde ficam fixed e setprecision."],
        [/\bfixed\b/, "Use fixed para fixar o número de casas decimais."],
        [/setprecision\s*\(\s*2\s*\)/, "Use setprecision(2) para mostrar duas casas."]
      ],
      saidaEsperada: "Produto: Café 500g\nPreço: R$ 18.90\nEstoque: 42 unidades"
    },
    {
      tipo: "completar",
      titulo: "Recibo da cafeteria",
      enunciado: `Na cafeteria, cada café custa R$ 4,50 e esse preço <b>não pode mudar</b> durante o programa. Complete:
        <ul>
          <li>a palavra que torna <code>PRECO_CAFE</code> uma constante;</li>
          <li>o operador que multiplica a quantidade pelo preço;</li>
          <li>o operador que encadeia a variável <code>quantidade</code> no <code>cout</code>.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Cafés: 3
Total: R$ 13.50</pre>`,
      dica: `Constantes usam <code>const</code>. No <code>cout</code>, cada valor é encadeado com <code>&lt;&lt;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    ____ double PRECO_CAFE = 4.50;
    int quantidade = 3;
    double total = quantidade ____ PRECO_CAFE;

    cout << fixed << setprecision(2);
    cout << "Cafés: " ____ quantidade << '\n';
    cout << "Total: R$ " << total << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double PRECO_CAFE = 4.50;
    int quantidade = 3;
    double total = quantidade * PRECO_CAFE;

    cout << fixed << setprecision(2);
    cout << "Cafés: " << quantidade << '\n';
    cout << "Total: R$ " << total << '\n';
    return 0;
}
`,
      padroes: [
        [/const\s+double\s+PRECO_CAFE/, "Declare PRECO_CAFE como const double."],
        [/total\s*=\s*quantidade\s*\*\s*PRECO_CAFE/, "O total é quantidade * PRECO_CAFE."],
        [/"Cafés: "\s*<<\s*quantidade/, "Encadeie a quantidade no cout com <<."]
      ],
      saidaEsperada: "Cafés: 3\nTotal: R$ 13.50"
    },
    {
      tipo: "criar",
      titulo: "Cartão de visita",
      enunciado: `A empresa vai imprimir o cartão de visita de um analista. Dentro do <code>main</code>, crie as variáveis:
        <ul>
          <li><code>nome</code> (<code>string</code>) com <code>"Bruno Lima"</code>;</li>
          <li><code>cargo</code> (<code>string</code>) com <code>"Analista de Suporte"</code>;</li>
          <li><code>ramal</code> (<code>int</code>) com <code>2041</code>;</li>
          <li><code>inicial</code> (<code>char</code>) com <code>'B'</code>.</li>
        </ul>
        Depois, usando <code>cout</code> e as variáveis, imprima exatamente:
        <pre>[B] Bruno Lima
Cargo: Analista de Suporte
Ramal: 2041</pre>`,
      dica: `<code>char</code> usa aspas simples (<code>'B'</code>) e <code>string</code> usa aspas duplas. Os colchetes fazem parte do texto: <code>cout &lt;&lt; "[" &lt;&lt; inicial &lt;&lt; "] " ...</code>`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    // 1) Crie as variáveis nome, cargo, ramal e inicial com os tipos pedidos
    // 2) Imprima as três linhas do cartão usando as variáveis

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    string nome = "Bruno Lima";
    string cargo = "Analista de Suporte";
    int ramal = 2041;
    char inicial = 'B';

    cout << "[" << inicial << "] " << nome << '\n';
    cout << "Cargo: " << cargo << '\n';
    cout << "Ramal: " << ramal << '\n';
    return 0;
}
`,
      padroes: [
        [/string\s+nome\s*=\s*"Bruno Lima"/, 'Crie nome como string com "Bruno Lima".'],
        [/string\s+cargo\s*=\s*"Analista de Suporte"/, 'Crie cargo como string com "Analista de Suporte".'],
        [/int\s+ramal\s*=\s*2041/, "Crie ramal como int com 2041."],
        [/char\s+inicial\s*=\s*'B'/, "Crie inicial como char com 'B' (aspas simples)."],
        [/cout\s*<<[^;]*\binicial\b/, "Use a variável inicial dentro do cout."]
      ],
      saidaEsperada: "[B] Bruno Lima\nCargo: Analista de Suporte\nRamal: 2041"
    },
    {
      tipo: "criar",
      titulo: "Conta do restaurante",
      enunciado: `Um grupo de 4 amigos consumiu R$ 186,00 no restaurante, que cobra 10% de serviço. Escreva o programa que:
        <ul>
          <li>declare <code>const double TAXA = 0.10;</code>, <code>double consumo = 186.0;</code> e <code>int pessoas = 4;</code>;</li>
          <li>calcule o serviço (<code>consumo * TAXA</code>), o total (consumo + serviço) e o valor por pessoa (total dividido por <code>pessoas</code>);</li>
          <li>mostre os valores com duas casas usando <code>fixed</code> e <code>setprecision(2)</code>.</li>
        </ul>
        A saída deve ser exatamente:
        <pre>Consumo: R$ 186.00
Serviço (10%): R$ 18.60
Total: R$ 204.60
Por pessoa: R$ 51.15</pre>`,
      dica: `Inclua <code>&lt;iomanip&gt;</code>. Basta escrever <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2);</code> uma vez: a formatação vale para os próximos números.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    // Declare a taxa (constante), o consumo e o número de pessoas
    // Calcule serviço, total e valor por pessoa
    // Mostre tudo com duas casas decimais

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double TAXA = 0.10;
    double consumo = 186.0;
    int pessoas = 4;

    double servico = consumo * TAXA;
    double total = consumo + servico;
    double porPessoa = total / pessoas;

    cout << fixed << setprecision(2);
    cout << "Consumo: R$ " << consumo << '\n';
    cout << "Serviço (10%): R$ " << servico << '\n';
    cout << "Total: R$ " << total << '\n';
    cout << "Por pessoa: R$ " << porPessoa << '\n';
    return 0;
}
`,
      padroes: [
        [/const\s+double\s+TAXA\s*=\s*0?\.10?\b/, "Declare const double TAXA = 0.10;"],
        [/int\s+pessoas\s*=\s*4/, "Declare int pessoas = 4;"],
        [/\/\s*pessoas/, "Divida o total por pessoas."],
        [/fixed[\s\S]*setprecision\s*\(\s*2\s*\)|setprecision\s*\(\s*2\s*\)[\s\S]*fixed/, "Use fixed e setprecision(2) para as duas casas decimais."]
      ],
      saidaEsperada: "Consumo: R$ 186.00\nServiço (10%): R$ 18.60\nTotal: R$ 204.60\nPor pessoa: R$ 51.15"
    }
  ],

  // ───────────────────────── b2: Condições e laços
  b2: [
    {
      tipo: "completar",
      titulo: "Situação dos alunos",
      enunciado: `A escola quer saber a situação de cada aluno: nota 7 ou mais é aprovado (só conta), de 5 a 6 é recuperação e abaixo de 5 é reprovado.
        Complete o <b>for de intervalo</b>, a comparação e o caso final do <code>if</code>.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Nota 6: recuperação
Nota 4: reprovado
Nota 5: recuperação
Aprovados: 2</pre>`,
      dica: `O for de intervalo usa dois-pontos: <code>for (int nota : notas)</code>. "7 ou mais" é <code>&gt;=</code>. O último caso, sem condição, é o <code>else</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int notas[] = {6, 9, 4, 7, 5};
    int aprovados = 0;

    for (int nota ____ notas) {
        if (nota ____ 7) {
            aprovados++;
        } else if (nota >= 5) {
            cout << "Nota " << nota << ": recuperação\n";
        } ____ {
            cout << "Nota " << nota << ": reprovado\n";
        }
    }
    cout << "Aprovados: " << aprovados << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int notas[] = {6, 9, 4, 7, 5};
    int aprovados = 0;

    for (int nota : notas) {
        if (nota >= 7) {
            aprovados++;
        } else if (nota >= 5) {
            cout << "Nota " << nota << ": recuperação\n";
        } else {
            cout << "Nota " << nota << ": reprovado\n";
        }
    }
    cout << "Aprovados: " << aprovados << '\n';
    return 0;
}
`,
      padroes: [
        [/for\s*\(\s*int\s+nota\s*:\s*notas\s*\)/, "Use o for de intervalo: for (int nota : notas)."],
        [/if\s*\(\s*nota\s*>=\s*7\s*\)/, "Aprovado é nota 7 ou mais: nota >= 7."],
        [/\}\s*else\s*\{/, "O último caso é um else sem condição."]
      ],
      saidaEsperada: "Nota 6: recuperação\nNota 4: reprovado\nNota 5: recuperação\nAprovados: 2"
    },
    {
      tipo: "completar",
      titulo: "Tabuada do 9",
      enunciado: `Um app de reforço escolar mostra a tabuada do 9 de 1 a 5. Complete o <b>for clássico</b>: o início, a condição e o passo.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>9 x 1 = 9
9 x 2 = 18
9 x 3 = 27
9 x 4 = 36
9 x 5 = 45</pre>`,
      dica: `O for tem três partes separadas por <code>;</code>: começa em 1, repete enquanto <code>i &lt;= 5</code> e soma 1 com <code>i++</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    for (int i = ____; i ____ 5; i____) {
        cout << "9 x " << i << " = " << 9 * i << '\n';
    }
    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << "9 x " << i << " = " << 9 * i << '\n';
    }
    return 0;
}
`,
      padroes: [
        [/int\s+i\s*=\s*1\s*;/, "O contador começa em 1: int i = 1."],
        [/i\s*<=\s*5|i\s*<\s*6/, "Repita enquanto i <= 5."],
        [/;\s*(i\s*\+\+|\+\+\s*i|i\s*\+=\s*1)\s*\)/, "Some 1 a cada volta com i++."]
      ],
      saidaEsperada: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45"
    },
    {
      tipo: "completar",
      titulo: "Menu do caixa eletrônico",
      enunciado: `O caixa eletrônico recebe as opções 1, 3 e 9 digitadas por clientes. Complete o <code>switch</code>:
        o valor testado, o <code>break</code> que falta no caso 1, o caso 3 e o caso padrão.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Saldo
Pix
Opção inválida</pre>`,
      dica: `Sem <code>break</code>, o caso 1 "cairia" no caso 2 e imprimiria "Extrato". O caso padrão se escreve <code>default:</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int opcoes[] = {1, 3, 9};

    for (int opcao : opcoes) {
        switch (____) {
            case 1: cout << "Saldo\n"; ____;
            case 2: cout << "Extrato\n"; break;
            ____ 3: cout << "Pix\n"; break;
            ____: cout << "Opção inválida\n";
        }
    }
    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int opcoes[] = {1, 3, 9};

    for (int opcao : opcoes) {
        switch (opcao) {
            case 1: cout << "Saldo\n"; break;
            case 2: cout << "Extrato\n"; break;
            case 3: cout << "Pix\n"; break;
            default: cout << "Opção inválida\n";
        }
    }
    return 0;
}
`,
      padroes: [
        [/switch\s*\(\s*opcao\s*\)/, "O switch testa a variável opcao."],
        [/"Saldo\\n"\s*;\s*break\s*;/, "Coloque break no fim do caso 1, senão ele cai no caso 2."],
        [/case\s+3\s*:/, "Escreva o caso 3 como case 3:"],
        [/default\s*:/, "O caso padrão é default:"]
      ],
      saidaEsperada: "Saldo\nPix\nOpção inválida"
    },
    {
      tipo: "criar",
      titulo: "Saques com while",
      enunciado: `Um cliente tem R$ 200 na conta e vai sacando R$ 70 de cada vez <b>enquanto</b> houver saldo suficiente.
        Crie <code>int saldo = 200;</code> e use um laço <code>while (saldo &gt;= 70)</code> que subtrai 70 e mostra quanto sobrou.
        No fim, mostre o saldo final. A saída deve ser exatamente:
        <pre>Saque de 70, sobrou 130
Saque de 70, sobrou 60
Saldo final: 60</pre>`,
      dica: `<code>saldo -= 70;</code> subtrai e guarda. O <code>while</code> testa a condição antes de cada volta.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    // Comece com saldo 200
    // Enquanto o saldo for 70 ou mais: saque 70 e mostre o que sobrou
    // Mostre o saldo final

    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int saldo = 200;
    while (saldo >= 70) {
        saldo -= 70;
        cout << "Saque de 70, sobrou " << saldo << '\n';
    }
    cout << "Saldo final: " << saldo << '\n';
    return 0;
}
`,
      padroes: [
        [/int\s+saldo\s*=\s*200/, "Crie int saldo = 200;"],
        [/while\s*\(\s*saldo\s*>=\s*70\s*\)/, "Use while (saldo >= 70)."],
        [/saldo\s*-=\s*70|saldo\s*=\s*saldo\s*-\s*70/, "Subtraia 70 do saldo a cada volta."]
      ],
      saidaEsperada: "Saque de 70, sobrou 130\nSaque de 70, sobrou 60\nSaldo final: 60"
    },
    {
      tipo: "criar",
      titulo: "Produtos para repor",
      enunciado: `O almoxarifado guarda a quantidade de 5 produtos no array <code>estoque</code> (já pronto). Usando um <b>for clássico</b>
        com <code>i</code> de 0 a 4:
        <ul>
          <li>se <code>estoque[i] == 0</code>, imprima <code>Produto i: esgotado</code>;</li>
          <li>senão, se <code>estoque[i] &lt; 5</code>, imprima <code>Produto i: repor (quantidade)</code>;</li>
          <li>conte quantos produtos precisam de reposição (esgotados ou abaixo de 5).</li>
        </ul>
        A saída deve ser exatamente:
        <pre>Produto 1: repor (3)
Produto 2: esgotado
Produto 4: repor (1)
Itens para repor: 3</pre>`,
      dica: `Teste primeiro o caso <code>== 0</code> e depois o <code>&lt; 5</code> com <code>else if</code>. O contador começa em 0 e recebe <code>++</code> nos dois casos.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int estoque[] = {12, 3, 0, 8, 1};

    // Percorra as posições 0 a 4 com um for clássico
    // Mostre os esgotados e os que estão abaixo de 5
    // No fim, mostre quantos itens precisam de reposição

    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int estoque[] = {12, 3, 0, 8, 1};
    int repor = 0;

    for (int i = 0; i < 5; i++) {
        if (estoque[i] == 0) {
            cout << "Produto " << i << ": esgotado\n";
            repor++;
        } else if (estoque[i] < 5) {
            cout << "Produto " << i << ": repor (" << estoque[i] << ")\n";
            repor++;
        }
    }
    cout << "Itens para repor: " << repor << '\n';
    return 0;
}
`,
      padroes: [
        [/for\s*\(\s*int\s+i\s*=\s*0\s*;\s*i\s*(<\s*5|<=\s*4)\s*;/, "Use um for clássico: for (int i = 0; i < 5; i++)."],
        [/estoque\s*\[\s*i\s*\]\s*==\s*0/, "Teste se estoque[i] == 0 para os esgotados."],
        [/estoque\s*\[\s*i\s*\]\s*<\s*5/, "Teste se estoque[i] < 5 para os que precisam de reposição."],
        [/else\s+if/, "Use else if para não contar o esgotado duas vezes."]
      ],
      saidaEsperada: "Produto 1: repor (3)\nProduto 2: esgotado\nProduto 4: repor (1)\nItens para repor: 3"
    }
  ],

  // ───────────────────────── b3: Funções e referências
  b3: [
    {
      tipo: "completar",
      titulo: "Desconto com valor padrão",
      enunciado: `A loja dá 10% de desconto quando ninguém informa outra porcentagem. Complete:
        <ul>
          <li>o valor padrão da porcentagem no <b>protótipo</b>;</li>
          <li>o nome do segundo parâmetro na <b>definição</b> (sem repetir o valor padrão);</li>
          <li>a palavra que devolve o resultado.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>180.00
60.00</pre>`,
      dica: `O valor padrão vai só no protótipo: <code>double porcentagem = 10.0</code>. Uma função que devolve valor usa <code>return</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
using namespace std;

double aplicarDesconto(double preco, double porcentagem ____ 10.0);

int main() {
    cout << fixed << setprecision(2);
    cout << aplicarDesconto(200.0) << '\n';        // usa os 10% padrão
    cout << aplicarDesconto(80.0, 25.0) << '\n';   // 25%
    return 0;
}

double aplicarDesconto(double preco, double ____) {
    ____ preco - preco * porcentagem / 100.0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

double aplicarDesconto(double preco, double porcentagem = 10.0);

int main() {
    cout << fixed << setprecision(2);
    cout << aplicarDesconto(200.0) << '\n';        // usa os 10% padrão
    cout << aplicarDesconto(80.0, 25.0) << '\n';   // 25%
    return 0;
}

double aplicarDesconto(double preco, double porcentagem) {
    return preco - preco * porcentagem / 100.0;
}
`,
      padroes: [
        [/double\s+porcentagem\s*=\s*10(\.0*)?\s*\)\s*;/, "No protótipo, dê o valor padrão: double porcentagem = 10.0"],
        [/double\s+aplicarDesconto\s*\(\s*double\s+preco\s*,\s*double\s+porcentagem\s*\)\s*\{/, "Na definição, o parâmetro se chama porcentagem (sem repetir o = 10.0)."],
        [/return\s+preco\s*-/, "Devolva o resultado com return."]
      ],
      saidaEsperada: "180.00\n60.00"
    },
    {
      tipo: "completar",
      titulo: "Reajuste por referência",
      enunciado: `O RH escreveu duas funções de reajuste. A primeira recebe uma <b>cópia</b> e não muda nada; a segunda deve receber o salário
        <b>por referência</b> e aumentá-lo de verdade. Complete o símbolo da referência e o operador que soma e guarda.
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Depois da cópia: 3000.00
Depois da referência: 3300.00</pre>`,
      dica: `Referência é o <code>&amp;</code> depois do tipo: <code>double&amp; salario</code>. O operador <code>+=</code> soma e guarda na mesma variável.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
using namespace std;

void reajustarCopia(double salario, double pct) {
    salario = salario + salario * pct / 100;
}

void reajustar(double____ salario, double pct) {
    salario ____ salario * pct / 100;
}

int main() {
    double salario = 3000.0;
    cout << fixed << setprecision(2);

    reajustarCopia(salario, 10);
    cout << "Depois da cópia: " << salario << '\n';

    reajustar(salario, 10);
    cout << "Depois da referência: " << salario << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

void reajustarCopia(double salario, double pct) {
    salario = salario + salario * pct / 100;
}

void reajustar(double& salario, double pct) {
    salario += salario * pct / 100;
}

int main() {
    double salario = 3000.0;
    cout << fixed << setprecision(2);

    reajustarCopia(salario, 10);
    cout << "Depois da cópia: " << salario << '\n';

    reajustar(salario, 10);
    cout << "Depois da referência: " << salario << '\n';
    return 0;
}
`,
      padroes: [
        [/void\s+reajustar\s*\(\s*double\s*&\s*salario/, "Receba o salário por referência: double& salario."],
        [/void\s+reajustar\s*\([^)]*\)\s*\{\s*salario\s*(\+=\s*salario\s*\*\s*pct|=\s*salario\s*\+\s*salario\s*\*\s*pct)/, "Some o reajuste ao salário com +=."]
      ],
      saidaEsperada: "Depois da cópia: 3000.00\nDepois da referência: 3300.00"
    },
    {
      tipo: "completar",
      titulo: "Saudação e áreas sobrecarregadas",
      enunciado: `O sistema de uma clínica tem uma função que saúda o paciente e duas funções <code>area</code> com o mesmo nome (sobrecarga):
        uma para salas quadradas (<code>int</code>) e outra para salas retangulares (<code>double</code>).
        Complete:
        <ul>
          <li>o parâmetro de <code>saudar</code>: um texto recebido por <b>referência constante</b>, chamado <code>nome</code>;</li>
          <li>o tipo de retorno da segunda <code>area</code>.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Bem-vindo, Clínica Vida!
16
7.5</pre>`,
      dica: `Referência constante para texto: <code>const string&amp; nome</code>. A segunda <code>area</code> multiplica dois <code>double</code>, então devolve <code>double</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
using namespace std;

void saudar(____) {
    cout << "Bem-vindo, " << nome << "!\n";
}

int area(int lado) { return lado * lado; }
____ area(double base, double altura) { return base * altura; }

int main() {
    saudar("Clínica Vida");
    cout << area(4) << '\n';
    cout << area(2.5, 3.0) << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

void saudar(const string& nome) {
    cout << "Bem-vindo, " << nome << "!\n";
}

int area(int lado) { return lado * lado; }
double area(double base, double altura) { return base * altura; }

int main() {
    saudar("Clínica Vida");
    cout << area(4) << '\n';
    cout << area(2.5, 3.0) << '\n';
    return 0;
}
`,
      padroes: [
        [/void\s+saudar\s*\(\s*const\s+(std::)?string\s*&\s*nome\s*\)/, "Receba o nome como const string& nome."],
        [/double\s+area\s*\(\s*double\s+base\s*,\s*double\s+altura\s*\)/, "A segunda area devolve double."]
      ],
      saidaEsperada: "Bem-vindo, Clínica Vida!\n16\n7.5"
    },
    {
      tipo: "criar",
      titulo: "Calculadora de frete",
      enunciado: `A transportadora cobra o frete pelo peso do pacote. Crie a função <code>double calcularFrete(double peso)</code>:
        <ul>
          <li>até 1 kg: R$ 8,00;</li>
          <li>acima de 1 kg e até 5 kg: R$ 15,00;</li>
          <li>acima de 5 kg: R$ 15,00 mais R$ 3,00 por kg que passar de 5.</li>
        </ul>
        No <code>main</code>, calcule o frete de pacotes de 0.5, 3 e 8 kg e mostre com duas casas. A saída deve ser exatamente:
        <pre>Pedido 1: R$ 8.00
Pedido 2: R$ 15.00
Pedido 3: R$ 24.00</pre>`,
      dica: `Use <code>if</code> / <code>else if</code> / <code>else</code> com <code>return</code> em cada caso. Para 8 kg: <code>15 + (8 - 5) * 3</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
using namespace std;

// Crie aqui a função calcularFrete, que recebe o peso e devolve o valor

int main() {
    cout << fixed << setprecision(2);
    // Mostre o frete dos pacotes de 0.5, 3 e 8 kg

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

double calcularFrete(double peso) {
    if (peso <= 1) {
        return 8.0;
    } else if (peso <= 5) {
        return 15.0;
    } else {
        return 15.0 + (peso - 5) * 3.0;
    }
}

int main() {
    cout << fixed << setprecision(2);
    cout << "Pedido 1: R$ " << calcularFrete(0.5) << '\n';
    cout << "Pedido 2: R$ " << calcularFrete(3) << '\n';
    cout << "Pedido 3: R$ " << calcularFrete(8) << '\n';
    return 0;
}
`,
      padroes: [
        [/double\s+calcularFrete\s*\(\s*double\s+peso\s*\)/, "Crie a função double calcularFrete(double peso)."],
        [/if\s*\(\s*peso/, "Use if para decidir o valor pelo peso."],
        [/return\b/, "A função deve devolver o valor com return."],
        [/calcularFrete\s*\(\s*8(\.0*)?\s*\)/, "Calcule o frete do pacote de 8 kg."]
      ],
      saidaEsperada: "Pedido 1: R$ 8.00\nPedido 2: R$ 15.00\nPedido 3: R$ 24.00"
    },
    {
      tipo: "criar",
      titulo: "Registrar vendas no estoque",
      enunciado: `Uma loja de roupas tem 10 camisetas. Crie a função <code>bool registrarVenda(int&amp; estoque, int qtd)</code>:
        se <code>qtd</code> for maior que o estoque, devolve <code>false</code> sem mexer em nada; senão, subtrai do estoque
        (que foi recebido por referência) e devolve <code>true</code>.
        No <code>main</code>, com <code>int estoque = 10;</code>, tente vender 4, depois 7 e depois 6. A saída deve ser exatamente:
        <pre>Venda de 4: ok (restam 6)
Venda de 7: recusada (restam 6)
Venda de 6: ok (restam 0)</pre>`,
      dica: `Com <code>int&amp;</code>, a alteração feita dentro da função aparece no <code>estoque</code> do <code>main</code>. Você pode guardar as vendas num array e usar um for de intervalo.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

// Crie aqui a função registrarVenda (estoque por referência, devolve bool)

int main() {
    // Comece com 10 camisetas e tente vender 4, 7 e 6

    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

bool registrarVenda(int& estoque, int qtd) {
    if (qtd > estoque) {
        return false;
    }
    estoque -= qtd;
    return true;
}

int main() {
    int estoque = 10;
    int vendas[] = {4, 7, 6};
    for (int qtd : vendas) {
        if (registrarVenda(estoque, qtd)) {
            cout << "Venda de " << qtd << ": ok (restam " << estoque << ")\n";
        } else {
            cout << "Venda de " << qtd << ": recusada (restam " << estoque << ")\n";
        }
    }
    return 0;
}
`,
      padroes: [
        [/bool\s+registrarVenda\s*\(\s*int\s*&\s*estoque\s*,\s*int\s+qtd\s*\)/, "Crie bool registrarVenda(int& estoque, int qtd)."],
        [/return\s+false/, "Quando não houver estoque suficiente, devolva false."],
        [/estoque\s*-=\s*qtd|estoque\s*=\s*estoque\s*-\s*qtd/, "Subtraia a quantidade do estoque."]
      ],
      saidaEsperada: "Venda de 4: ok (restam 6)\nVenda de 7: recusada (restam 6)\nVenda de 6: ok (restam 0)"
    }
  ],

  // ───────────────────────── i1: std::vector e std::string
  i1: [
    {
      tipo: "completar",
      titulo: "Tempos de entrega ordenados",
      enunciado: `O app de delivery guarda os tempos de entrega (em minutos) num <code>vector&lt;int&gt;</code>. Complete:
        <ul>
          <li>o método que adiciona <code>27</code> no fim do vector;</li>
          <li>o algoritmo que ordena do menor para o maior;</li>
          <li>o método que devolve a quantidade de elementos.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Entregas: 4
Tempos: 27 35 42 58
Mais rápida: 27, mais lenta: 58</pre>`,
      dica: `Os nomes são <code>push_back</code>, <code>sort</code> (de <code>&lt;algorithm&gt;</code>) e <code>size</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> tempos = {42, 35, 58};
    tempos.____(27);
    ____(tempos.begin(), tempos.end());

    cout << "Entregas: " << tempos.____() << '\n';
    cout << "Tempos:";
    for (int t : tempos) cout << ' ' << t;
    cout << "\nMais rápida: " << tempos[0] << ", mais lenta: " << tempos.back() << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> tempos = {42, 35, 58};
    tempos.push_back(27);
    sort(tempos.begin(), tempos.end());

    cout << "Entregas: " << tempos.size() << '\n';
    cout << "Tempos:";
    for (int t : tempos) cout << ' ' << t;
    cout << "\nMais rápida: " << tempos[0] << ", mais lenta: " << tempos.back() << '\n';
    return 0;
}
`,
      padroes: [
        [/tempos\.push_back\s*\(\s*27\s*\)/, "Adicione 27 com tempos.push_back(27)."],
        [/sort\s*\(\s*tempos\.begin\s*\(\s*\)\s*,\s*tempos\.end\s*\(\s*\)\s*\)/, "Ordene com sort(tempos.begin(), tempos.end())."],
        [/tempos\.size\s*\(\s*\)/, "A quantidade de elementos vem de tempos.size()."]
      ],
      saidaEsperada: "Entregas: 4\nTempos: 27 35 42 58\nMais rápida: 27, mais lenta: 58"
    },
    {
      tipo: "completar",
      titulo: "Usuário e domínio do e-mail",
      enunciado: `O cadastro da clínica separa o e-mail em <b>usuário</b> (antes do <code>@</code>) e <b>domínio</b> (depois do <code>@</code>, em minúsculas). Complete:
        <ul>
          <li>o método que procura a posição do <code>@</code>;</li>
          <li>o método que recorta o usuário;</li>
          <li>o operador que pula o próprio <code>@</code> no domínio;</li>
          <li>o símbolo que permite alterar cada letra dentro do for.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Usuário: Joao.Pereira
Domínio: clinica.com.br</pre>`,
      dica: `<code>find</code> devolve a posição; <code>substr(inicio, tamanho)</code> recorta. Sem o <code>&amp;</code> em <code>char&amp; ch</code>, o for altera só uma cópia da letra.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string email = "Joao.Pereira@Clinica.com.br";
    size_t arroba = email.____('@');
    string usuario = email.____(0, arroba);
    string dominio = email.substr(arroba ____ 1);
    for (char____ ch : dominio) ch = tolower(ch);

    cout << "Usuário: " << usuario << '\n';
    cout << "Domínio: " << dominio << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string email = "Joao.Pereira@Clinica.com.br";
    size_t arroba = email.find('@');
    string usuario = email.substr(0, arroba);
    string dominio = email.substr(arroba + 1);
    for (char& ch : dominio) ch = tolower(ch);

    cout << "Usuário: " << usuario << '\n';
    cout << "Domínio: " << dominio << '\n';
    return 0;
}
`,
      padroes: [
        [/email\.find\s*\(\s*'@'\s*\)/, "Procure a posição com email.find('@')."],
        [/email\.substr\s*\(\s*0\s*,\s*arroba\s*\)/, "Recorte o usuário com email.substr(0, arroba)."],
        [/substr\s*\(\s*arroba\s*\+\s*1\s*\)/, "O domínio começa uma posição depois do @: arroba + 1."],
        [/for\s*\(\s*char\s*&\s*ch\s*:/, "Use char& ch para alterar as letras do próprio texto."]
      ],
      saidaEsperada: "Usuário: Joao.Pereira\nDomínio: clinica.com.br"
    },
    {
      tipo: "completar",
      titulo: "Linha CSV da papelaria",
      enunciado: `A papelaria exporta as vendas em linhas no formato <code>nome;quantidade;preço</code>. Complete:
        <ul>
          <li>o separador usado no primeiro <code>getline</code>;</li>
          <li>a função que converte texto em <code>int</code>;</li>
          <li>a função que converte texto em <code>double</code>;</li>
          <li>a função que converte número em texto.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Caderno: 4 x R$ 12.50 = R$ 50.00
Itens: 4</pre>`,
      dica: `Um caractere vai entre aspas simples: <code>';'</code>. As conversões são <code>stoi</code>, <code>stod</code> e <code>to_string</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string linha = "Caderno;4;12.50";
    stringstream ss(linha);
    string nome, qtdTexto, precoTexto;
    getline(ss, nome, ____);
    getline(ss, qtdTexto, ';');
    getline(ss, precoTexto, ';');

    int qtd = ____(qtdTexto);
    double preco = ____(precoTexto);

    cout << fixed << setprecision(2);
    cout << nome << ": " << qtd << " x R$ " << preco << " = R$ " << qtd * preco << '\n';
    string resumo = "Itens: " + ____(qtd);
    cout << resumo << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string linha = "Caderno;4;12.50";
    stringstream ss(linha);
    string nome, qtdTexto, precoTexto;
    getline(ss, nome, ';');
    getline(ss, qtdTexto, ';');
    getline(ss, precoTexto, ';');

    int qtd = stoi(qtdTexto);
    double preco = stod(precoTexto);

    cout << fixed << setprecision(2);
    cout << nome << ": " << qtd << " x R$ " << preco << " = R$ " << qtd * preco << '\n';
    string resumo = "Itens: " + to_string(qtd);
    cout << resumo << '\n';
    return 0;
}
`,
      padroes: [
        [/getline\s*\(\s*ss\s*,\s*nome\s*,\s*';'\s*\)/, "O separador é o caractere ';' (aspas simples)."],
        [/stoi\s*\(\s*qtdTexto\s*\)/, "Converta a quantidade com stoi(qtdTexto)."],
        [/stod\s*\(\s*precoTexto\s*\)/, "Converta o preço com stod(precoTexto)."],
        [/to_string\s*\(\s*qtd\s*\)/, "Converta o número em texto com to_string(qtd)."]
      ],
      saidaEsperada: "Caderno: 4 x R$ 12.50 = R$ 50.00\nItens: 4"
    },
    {
      tipo: "criar",
      titulo: "Boletim da turma",
      enunciado: `A coordenação tem as notas da turma no <code>vector&lt;double&gt; notas</code> (já pronto). Percorra o vector e calcule:
        <ul>
          <li>a <b>média</b> (soma dividida por <code>notas.size()</code>);</li>
          <li>a <b>maior</b> nota;</li>
          <li>quantas notas ficaram <b>acima da média</b>.</li>
        </ul>
        Mostre os decimais com duas casas. A saída deve ser exatamente:
        <pre>Média: 7.30
Maior: 9.00
Acima da média: 3</pre>`,
      dica: `Primeiro um laço para somar e achar a maior (comece a maior com <code>notas[0]</code>); depois que tiver a média, outro laço para contar.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <vector>
using namespace std;

int main() {
    vector<double> notas = {7.5, 8.0, 6.5, 9.0, 5.5};

    // 1) Some as notas e descubra a maior
    // 2) Calcule a média usando a quantidade de notas do vector
    // 3) Conte quantas notas estão acima da média
    // 4) Mostre os resultados com duas casas decimais

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <vector>
using namespace std;

int main() {
    vector<double> notas = {7.5, 8.0, 6.5, 9.0, 5.5};

    double soma = 0;
    double maior = notas[0];
    for (double n : notas) {
        soma += n;
        if (n > maior) maior = n;
    }
    double media = soma / notas.size();

    int acima = 0;
    for (double n : notas) {
        if (n > media) acima++;
    }

    cout << fixed << setprecision(2);
    cout << "Média: " << media << '\n';
    cout << "Maior: " << maior << '\n';
    cout << "Acima da média: " << acima << '\n';
    return 0;
}
`,
      padroes: [
        [/for\s*\(/, "Percorra o vector com um laço for."],
        [/notas\.size\s*\(\s*\)/, "Use notas.size() para a quantidade de notas."],
        [/setprecision\s*\(\s*2\s*\)/, "Mostre as notas com setprecision(2)."]
      ],
      saidaEsperada: "Média: 7.30\nMaior: 9.00\nAcima da média: 3"
    },
    {
      tipo: "criar",
      titulo: "Lista de compras do mercado",
      enunciado: `O app do mercado recebe a lista de compras num texto só, separado por <code>;</code> (variável <code>lista</code>, já pronta). Escreva o programa que:
        <ul>
          <li>quebre o texto com <code>stringstream</code> e <code>getline</code> e guarde cada item num <code>vector&lt;string&gt; itens</code> com <code>push_back</code>;</li>
          <li>imprima os itens numerados e em <b>MAIÚSCULAS</b> (use <code>toupper</code> em cada letra);</li>
          <li>mostre o total de itens.</li>
        </ul>
        A saída deve ser exatamente:
        <pre>1. ARROZ
2. FEIJAO
3. CAFE
4. LEITE
Total: 4 itens</pre>`,
      dica: `<code>while (getline(ss, item, ';')) itens.push_back(item);</code> lê até acabar o texto. Para numerar, use um for clássico com <code>i + 1</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

int main() {
    string lista = "arroz;feijao;cafe;leite";

    // 1) Quebre a lista no ; e guarde cada parte num vector de textos chamado itens
    // 2) Mostre cada item numerado e em letras maiúsculas
    // 3) Mostre o total de itens

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

int main() {
    string lista = "arroz;feijao;cafe;leite";

    vector<string> itens;
    stringstream ss(lista);
    string item;
    while (getline(ss, item, ';')) {
        itens.push_back(item);
    }

    for (size_t i = 0; i < itens.size(); i++) {
        string nome = itens[i];
        for (char& ch : nome) ch = toupper(ch);
        cout << i + 1 << ". " << nome << '\n';
    }
    cout << "Total: " << itens.size() << " itens\n";
    return 0;
}
`,
      padroes: [
        [/vector\s*<\s*(std::)?string\s*>\s+itens/, "Crie o vector<string> itens."],
        [/getline\s*\(\s*\w+\s*,\s*\w+\s*,\s*';'\s*\)/, "Use getline com o separador ';'."],
        [/itens\.push_back\s*\(/, "Guarde cada parte com itens.push_back(...)."],
        [/toupper\s*\(/, "Use toupper para deixar as letras maiúsculas."]
      ],
      saidaEsperada: "1. ARROZ\n2. FEIJAO\n3. CAFE\n4. LEITE\nTotal: 4 itens"
    }
  ],

  // ───────────────────────── i2: Classes e objetos
  i2: [
    {
      tipo: "completar",
      titulo: "Conta bancária encapsulada",
      enunciado: `O banco quer que o saldo só mude pelos métodos da classe. Complete:
        <ul>
          <li>a seção que esconde <code>titular</code> e <code>saldo</code>;</li>
          <li>a seção que deixa o construtor e os métodos acessíveis;</li>
          <li>o símbolo que inicia a <b>lista de inicialização</b> do construtor;</li>
          <li>o fechamento da classe.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Saque recusado
Marina: R$ 150.00</pre>`,
      dica: `As seções são <code>private:</code> e <code>public:</code>. A lista de inicialização começa com <code>:</code> depois dos parênteses. Toda classe termina com <code>};</code> (com ponto e vírgula).`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class ContaBancaria {
____:
    string titular;
    double saldo;

____:
    ContaBancaria(const string& nome, double saldoInicial)
        ____ titular(nome), saldo(saldoInicial) {}

    bool sacar(double valor) {
        if (valor <= 0 || valor > saldo) return false;
        saldo -= valor;
        return true;
    }

    double getSaldo() const { return saldo; }
    const string& getTitular() const { return titular; }
____

int main() {
    ContaBancaria conta("Marina", 250.0);
    if (!conta.sacar(400.0)) cout << "Saque recusado\n";
    conta.sacar(100.0);

    cout << fixed << setprecision(2);
    cout << conta.getTitular() << ": R$ " << conta.getSaldo() << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class ContaBancaria {
private:
    string titular;
    double saldo;

public:
    ContaBancaria(const string& nome, double saldoInicial)
        : titular(nome), saldo(saldoInicial) {}

    bool sacar(double valor) {
        if (valor <= 0 || valor > saldo) return false;
        saldo -= valor;
        return true;
    }

    double getSaldo() const { return saldo; }
    const string& getTitular() const { return titular; }
};

int main() {
    ContaBancaria conta("Marina", 250.0);
    if (!conta.sacar(400.0)) cout << "Saque recusado\n";
    conta.sacar(100.0);

    cout << fixed << setprecision(2);
    cout << conta.getTitular() << ": R$ " << conta.getSaldo() << '\n';
    return 0;
}
`,
      padroes: [
        [/private\s*:\s*string\s+titular/, "Os dados ficam na seção private:"],
        [/public\s*:\s*ContaBancaria\s*\(/, "O construtor e os métodos ficam na seção public:"],
        [/\)\s*:\s*titular\s*\(\s*nome\s*\)/, "A lista de inicialização começa com : titular(nome), ..."],
        [/^\s*\}\s*;/m, "Feche a classe com }; (não esqueça o ponto e vírgula)."]
      ],
      saidaEsperada: "Saque recusado\nMarina: R$ 150.00"
    },
    {
      tipo: "completar",
      titulo: "Sala retangular da clínica",
      enunciado: `A clínica calcula a área das salas. A posição da sala é um dado simples (um <code>struct</code>) e a sala é uma classe.
        A função <code>relatorio</code> recebe a sala como <code>const Retangulo&amp;</code>, então só pode chamar métodos <code>const</code>. Complete:
        <ul>
          <li>a palavra que cria o tipo de dados simples <code>Ponto</code>;</li>
          <li>a palavra que promete que <code>area()</code> não altera o objeto;</li>
          <li>a inicialização do ponto com x = 2 e y = 3 usando chaves.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Origem: (2, 3)
Área: 24
Perímetro: 20</pre>`,
      dica: `<code>struct</code> é como <code>class</code>, mas tudo é público por padrão. O <code>const</code> vai depois dos parênteses do método. Inicialização com chaves: <code>Ponto p{2, 3};</code>`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

____ Ponto {
    int x;
    int y;
};

class Retangulo {
    Ponto origem;
    int largura, altura;
public:
    Retangulo(Ponto o, int l, int a) : origem(o), largura(l), altura(a) {}
    int area() ____ { return largura * altura; }
    int perimetro() const { return 2 * (largura + altura); }
    Ponto getOrigem() const { return origem; }
};

void relatorio(const Retangulo& r) {
    cout << "Origem: (" << r.getOrigem().x << ", " << r.getOrigem().y << ")\n";
    cout << "Área: " << r.area() << '\n';
    cout << "Perímetro: " << r.perimetro() << '\n';
}

int main() {
    Ponto p____;
    Retangulo sala(p, 6, 4);
    relatorio(sala);
    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

struct Ponto {
    int x;
    int y;
};

class Retangulo {
    Ponto origem;
    int largura, altura;
public:
    Retangulo(Ponto o, int l, int a) : origem(o), largura(l), altura(a) {}
    int area() const { return largura * altura; }
    int perimetro() const { return 2 * (largura + altura); }
    Ponto getOrigem() const { return origem; }
};

void relatorio(const Retangulo& r) {
    cout << "Origem: (" << r.getOrigem().x << ", " << r.getOrigem().y << ")\n";
    cout << "Área: " << r.area() << '\n';
    cout << "Perímetro: " << r.perimetro() << '\n';
}

int main() {
    Ponto p{2, 3};
    Retangulo sala(p, 6, 4);
    relatorio(sala);
    return 0;
}
`,
      padroes: [
        [/struct\s+Ponto\s*\{/, "Ponto é um dado simples: use struct Ponto."],
        [/int\s+area\s*\(\s*\)\s*const\s*\{/, "Marque area() como const."],
        [/Ponto\s+p\s*\{\s*2\s*,\s*3\s*\}/, "Inicialize o ponto com chaves: Ponto p{2, 3};"]
      ],
      saidaEsperada: "Origem: (2, 3)\nÁrea: 24\nPerímetro: 20"
    },
    {
      tipo: "completar",
      titulo: "Desconto protegido no produto",
      enunciado: `A loja não aceita descontos menores ou iguais a 0% nem maiores que 50%. A classe <code>Produto</code> protege essa regra no método
        <code>aplicarDesconto</code>. Complete:
        <ul>
          <li>o operador lógico que junta as duas condições inválidas;</li>
          <li>o valor devolvido quando o desconto é recusado;</li>
          <li>a chamada do método com 15%.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Desconto de 70% recusado
Desconto de 15% aplicado
Fone Bluetooth: R$ 170.00</pre>`,
      dica: `"Ou" em C++ é <code>||</code>. O método devolve <code>bool</code>: <code>true</code> se aplicou, <code>false</code> se recusou.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class Produto {
    string nome;
    double preco;
public:
    Produto(const string& n, double p) : nome(n), preco(p) {}

    bool aplicarDesconto(double pct) {
        if (pct <= 0 ____ pct > 50) return ____;
        preco -= preco * pct / 100;
        return true;
    }

    double getPreco() const { return preco; }
    string getNome() const { return nome; }
};

int main() {
    Produto fone("Fone Bluetooth", 200.0);
    cout << fixed << setprecision(2);

    if (!fone.aplicarDesconto(70)) cout << "Desconto de 70% recusado\n";
    if (fone.____(15)) cout << "Desconto de 15% aplicado\n";
    cout << fone.getNome() << ": R$ " << fone.getPreco() << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class Produto {
    string nome;
    double preco;
public:
    Produto(const string& n, double p) : nome(n), preco(p) {}

    bool aplicarDesconto(double pct) {
        if (pct <= 0 || pct > 50) return false;
        preco -= preco * pct / 100;
        return true;
    }

    double getPreco() const { return preco; }
    string getNome() const { return nome; }
};

int main() {
    Produto fone("Fone Bluetooth", 200.0);
    cout << fixed << setprecision(2);

    if (!fone.aplicarDesconto(70)) cout << "Desconto de 70% recusado\n";
    if (fone.aplicarDesconto(15)) cout << "Desconto de 15% aplicado\n";
    cout << fone.getNome() << ": R$ " << fone.getPreco() << '\n';
    return 0;
}
`,
      padroes: [
        [/pct\s*<=\s*0\s*\|\|\s*pct\s*>\s*50/, "Junte as condições com || (ou)."],
        [/\)\s*return\s+false\s*;/, "Quando o desconto é inválido, devolva false."],
        [/fone\.aplicarDesconto\s*\(\s*15\s*\)/, "Chame fone.aplicarDesconto(15)."]
      ],
      saidaEsperada: "Desconto de 70% recusado\nDesconto de 15% aplicado\nFone Bluetooth: R$ 170.00"
    },
    {
      tipo: "criar",
      titulo: "Classe Estoque do almoxarifado",
      enunciado: `Crie a classe <code>Estoque</code> com:
        <ul>
          <li>em <code>private:</code>, os atributos <code>string produto</code> e <code>int quantidade</code>;</li>
          <li>um construtor <code>Estoque(const string&amp; p, int q)</code> com lista de inicialização;</li>
          <li><code>bool entrada(int qtd)</code>: recusa (devolve <code>false</code>) se <code>qtd &lt;= 0</code>; senão soma;</li>
          <li><code>bool saida(int qtd)</code>: recusa se <code>qtd &lt;= 0</code> ou se for maior que a quantidade; senão subtrai;</li>
          <li><code>int getQuantidade() const</code> e <code>string getProduto() const</code>.</li>
        </ul>
        No <code>main</code>, crie <code>Estoque e("Parafuso", 50);</code>, faça saída de 20, saída de 40 e entrada de 15. A saída deve ser exatamente:
        <pre>Saída de 20: ok
Saída de 40: recusada
Entrada de 15: ok
Parafuso: 45 unidades</pre>`,
      dica: `Use o <code>bool</code> devolvido para escolher a mensagem: <code>cout &lt;&lt; "Saída de 20: " &lt;&lt; (e.saida(20) ? "ok" : "recusada")</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
using namespace std;

// Crie aqui a classe Estoque (dados escondidos, métodos de entrada e saída que validam as regras)

int main() {
    // Crie o estoque de Parafuso com 50 unidades
    // Saída de 20, saída de 40 e entrada de 15, mostrando ok/recusada
    // Mostre a quantidade final

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

class Estoque {
private:
    string produto;
    int quantidade;

public:
    Estoque(const string& p, int q) : produto(p), quantidade(q) {}

    bool entrada(int qtd) {
        if (qtd <= 0) return false;
        quantidade += qtd;
        return true;
    }

    bool saida(int qtd) {
        if (qtd <= 0 || qtd > quantidade) return false;
        quantidade -= qtd;
        return true;
    }

    int getQuantidade() const { return quantidade; }
    string getProduto() const { return produto; }
};

int main() {
    Estoque e("Parafuso", 50);
    cout << "Saída de 20: " << (e.saida(20) ? "ok" : "recusada") << '\n';
    cout << "Saída de 40: " << (e.saida(40) ? "ok" : "recusada") << '\n';
    cout << "Entrada de 15: " << (e.entrada(15) ? "ok" : "recusada") << '\n';
    cout << e.getProduto() << ": " << e.getQuantidade() << " unidades\n";
    return 0;
}
`,
      padroes: [
        [/class\s+Estoque\s*\{/, "Crie a classe Estoque."],
        [/private\s*:/, "Coloque os atributos na seção private:"],
        [/bool\s+saida\s*\(\s*int\s+\w+\s*\)/, "Crie o método bool saida(int qtd)."],
        [/int\s+getQuantidade\s*\(\s*\)\s*const/, "getQuantidade() deve ser um método const."],
        [/Estoque\s+e\s*[({]\s*"Parafuso"\s*,\s*50\s*[)}]/, 'Crie o objeto Estoque e("Parafuso", 50);'],
      ],
      saidaEsperada: "Saída de 20: ok\nSaída de 40: recusada\nEntrada de 15: ok\nParafuso: 45 unidades"
    },
    {
      tipo: "criar",
      titulo: "Pedido do delivery",
      enunciado: `O restaurante quer montar pedidos com vários itens. Crie:
        <ul>
          <li>um <code>struct Item</code> com <code>string nome</code>, <code>int qtd</code> e <code>double preco</code>;</li>
          <li>uma <code>class Pedido</code> com um <code>vector&lt;Item&gt; itens</code> privado e os métodos públicos
            <code>void adicionar(const string&amp; nome, int qtd, double preco)</code>,
            <code>int quantidadeItens() const</code> (soma das quantidades) e <code>double total() const</code> (soma de qtd × preço).</li>
        </ul>
        No <code>main</code>, adicione 2 Pizza a 45.90, 3 Refrigerante a 8.50 e 1 Sobremesa a 15.00. A saída deve ser exatamente:
        <pre>Itens: 6
Total: R$ 132.30</pre>`,
      dica: `Em <code>adicionar</code>, faça <code>itens.push_back({nome, qtd, preco});</code>. Em <code>total</code>, percorra com <code>for (const Item&amp; i : itens)</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
using namespace std;

// Crie o struct com os dados de um item
// Crie a classe do pedido, com a lista de itens escondida e os métodos pedidos

int main() {
    // Adicione os três itens e mostre a quantidade e o total

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
using namespace std;

struct Item {
    string nome;
    int qtd;
    double preco;
};

class Pedido {
    vector<Item> itens;
public:
    void adicionar(const string& nome, int qtd, double preco) {
        itens.push_back({nome, qtd, preco});
    }

    int quantidadeItens() const {
        int soma = 0;
        for (const Item& i : itens) soma += i.qtd;
        return soma;
    }

    double total() const {
        double soma = 0;
        for (const Item& i : itens) soma += i.qtd * i.preco;
        return soma;
    }
};

int main() {
    Pedido pedido;
    pedido.adicionar("Pizza", 2, 45.90);
    pedido.adicionar("Refrigerante", 3, 8.50);
    pedido.adicionar("Sobremesa", 1, 15.00);

    cout << "Itens: " << pedido.quantidadeItens() << '\n';
    cout << fixed << setprecision(2);
    cout << "Total: R$ " << pedido.total() << '\n';
    return 0;
}
`,
      padroes: [
        [/struct\s+Item\s*\{/, "Crie o struct Item."],
        [/class\s+Pedido\s*\{/, "Crie a classe Pedido."],
        [/vector\s*<\s*Item\s*>\s+itens/, "Guarde os itens num vector<Item> itens."],
        [/double\s+total\s*\(\s*\)\s*const/, "total() deve ser um método const."],
        [/int\s+quantidadeItens\s*\(\s*\)\s*const/, "quantidadeItens() deve ser um método const."]
      ],
      saidaEsperada: "Itens: 6\nTotal: R$ 132.30"
    }
  ],

  // ───────────────────────── i3: Ponteiros, memória e smart pointers
  i3: [
    {
      tipo: "completar",
      titulo: "Estoque pelo ponteiro",
      enunciado: `Vamos alterar o estoque de uma loja <b>pelo endereço</b> da variável. Complete:
        <ul>
          <li>o símbolo que declara um ponteiro para <code>int</code>;</li>
          <li>o operador que pega o endereço de <code>estoque</code>;</li>
          <li>o operador que lê o valor guardado no endereço;</li>
          <li>o valor de um ponteiro que não aponta para nada.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Valor pelo ponteiro: 12
Estoque agora: 20
Ponteiro vazio</pre>`,
      dica: `<code>int* ptr</code> declara; <code>&amp;estoque</code> pega o endereço; <code>*ptr</code> acessa o valor; ponteiro vazio é <code>nullptr</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int estoque = 12;
    int____ ptr = ____estoque;

    cout << "Valor pelo ponteiro: " << ____ptr << '\n';
    *ptr = 20;                       // altera estoque pelo endereço
    cout << "Estoque agora: " << estoque << '\n';

    int* vazio = ____;
    if (vazio == nullptr) cout << "Ponteiro vazio\n";
    return 0;
}
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int estoque = 12;
    int* ptr = &estoque;

    cout << "Valor pelo ponteiro: " << *ptr << '\n';
    *ptr = 20;                       // altera estoque pelo endereço
    cout << "Estoque agora: " << estoque << '\n';

    int* vazio = nullptr;
    if (vazio == nullptr) cout << "Ponteiro vazio\n";
    return 0;
}
`,
      padroes: [
        [/int\s*\*\s*ptr\s*=\s*&\s*estoque/, "Declare int* ptr = &estoque;"],
        [/"Valor pelo ponteiro: "\s*<<\s*\*\s*ptr/, "Leia o valor com *ptr."],
        [/int\s*\*\s*vazio\s*=\s*nullptr/, "Um ponteiro vazio recebe nullptr."]
      ],
      saidaEsperada: "Valor pelo ponteiro: 12\nEstoque agora: 20\nPonteiro vazio"
    },
    {
      tipo: "completar",
      titulo: "Conexão que fecha sozinha",
      enunciado: `A conexão com o banco de dados deve ser fechada <b>automaticamente</b> quando sair de uso (RAII). Complete:
        <ul>
          <li>o nome do <b>destrutor</b> da struct <code>Conexao</code>;</li>
          <li>a função que cria o objeto dentro de um <code>unique_ptr</code>;</li>
          <li>o operador que chama um método pelo ponteiro.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Início
Conectando a clientes
Consultando clientes
Desconectando de clientes
Fim</pre>`,
      dica: `O destrutor tem o nome da classe com <code>~</code> na frente. Use <code>make_unique&lt;Conexao&gt;(...)</code> e <code>c-&gt;consultar()</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Conexao {
    string banco;
    Conexao(const string& b) : banco(b) { cout << "Conectando a " << banco << '\n'; }
    ____() { cout << "Desconectando de " << banco << '\n'; }
    void consultar() const { cout << "Consultando " << banco << '\n'; }
};

int main() {
    cout << "Início\n";
    {
        unique_ptr<Conexao> c = ____<Conexao>("clientes");
        c____consultar();
    }   // aqui o unique_ptr libera a conexão
    cout << "Fim\n";
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Conexao {
    string banco;
    Conexao(const string& b) : banco(b) { cout << "Conectando a " << banco << '\n'; }
    ~Conexao() { cout << "Desconectando de " << banco << '\n'; }
    void consultar() const { cout << "Consultando " << banco << '\n'; }
};

int main() {
    cout << "Início\n";
    {
        unique_ptr<Conexao> c = make_unique<Conexao>("clientes");
        c->consultar();
    }   // aqui o unique_ptr libera a conexão
    cout << "Fim\n";
    return 0;
}
`,
      padroes: [
        [/~\s*Conexao\s*\(\s*\)/, "O destrutor se chama ~Conexao()."],
        [/make_unique\s*<\s*Conexao\s*>/, "Crie com make_unique<Conexao>(...)."],
        [/c\s*->\s*consultar\s*\(/, "Chame o método pelo ponteiro com c->consultar()."]
      ],
      saidaEsperada: "Início\nConectando a clientes\nConsultando clientes\nDesconectando de clientes\nFim"
    },
    {
      tipo: "completar",
      titulo: "Configuração compartilhada",
      enunciado: `O painel e o relatório da loja usam a <b>mesma</b> configuração. Com <code>shared_ptr</code>, ela só é liberada quando o último dono sair. Complete:
        <ul>
          <li>a função que cria a configuração num <code>shared_ptr</code>;</li>
          <li>o ponteiro que o <code>relatorio</code> copia para virar o segundo dono;</li>
          <li>o método que conta quantos donos existem.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Carregando loja.ini
Donos: 2
Donos: 1
Liberando loja.ini</pre>`,
      dica: `<code>make_shared&lt;Config&gt;(...)</code> cria; copiar um <code>shared_ptr</code> (<code>= painel</code>) aumenta o contador; <code>use_count()</code> mostra o contador.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Config {
    string arquivo;
    Config(const string& a) : arquivo(a) { cout << "Carregando " << arquivo << '\n'; }
    ~Config() { cout << "Liberando " << arquivo << '\n'; }
};

int main() {
    shared_ptr<Config> painel = ____<Config>("loja.ini");
    {
        shared_ptr<Config> relatorio = ____;
        cout << "Donos: " << painel.____() << '\n';
    }
    cout << "Donos: " << painel.use_count() << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Config {
    string arquivo;
    Config(const string& a) : arquivo(a) { cout << "Carregando " << arquivo << '\n'; }
    ~Config() { cout << "Liberando " << arquivo << '\n'; }
};

int main() {
    shared_ptr<Config> painel = make_shared<Config>("loja.ini");
    {
        shared_ptr<Config> relatorio = painel;
        cout << "Donos: " << painel.use_count() << '\n';
    }
    cout << "Donos: " << painel.use_count() << '\n';
    return 0;
}
`,
      padroes: [
        [/make_shared\s*<\s*Config\s*>/, "Crie com make_shared<Config>(...)."],
        [/shared_ptr\s*<\s*Config\s*>\s+relatorio\s*=\s*painel\s*;/, "O relatorio vira dono copiando o painel: = painel;"],
        [/use_count\s*\(\s*\)[\s\S]*use_count\s*\(\s*\)/, "Mostre o contador com painel.use_count()."]
      ],
      saidaEsperada: "Carregando loja.ini\nDonos: 2\nDonos: 1\nLiberando loja.ini"
    },
    {
      tipo: "criar",
      titulo: "Bônus pelo ponteiro",
      enunciado: `O sistema de RH procura o funcionário e recebe um <b>ponteiro</b> para o salário dele, que pode vir vazio quando ninguém é encontrado.
        Crie <code>void aplicarBonus(double* salario, double valor)</code>:
        <ul>
          <li>se <code>salario</code> for <code>nullptr</code>, imprima <code>Funcionário não encontrado</code> e saia da função;</li>
          <li>senão, some <code>valor</code> ao salário apontado.</li>
        </ul>
        No <code>main</code>, com <code>double ana = 2500.0;</code>, chame <code>aplicarBonus(&amp;ana, 300)</code> e <code>aplicarBonus(nullptr, 300)</code>,
        depois mostre o salário com duas casas. A saída deve ser exatamente:
        <pre>Funcionário não encontrado
Salário da Ana: R$ 2800.00</pre>`,
      dica: `Teste antes de usar: <code>if (salario == nullptr) { ...; return; }</code>. Para alterar o valor apontado: <code>*salario += valor;</code>`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
using namespace std;

// Crie aqui a função aplicarBonus (recebe um ponteiro para o salário e o valor)

int main() {
    // Crie o salário da Ana, aplique o bônus pelo endereço e teste com ponteiro vazio
    // Mostre o salário final com duas casas

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

void aplicarBonus(double* salario, double valor) {
    if (salario == nullptr) {
        cout << "Funcionário não encontrado\n";
        return;
    }
    *salario += valor;
}

int main() {
    double ana = 2500.0;
    aplicarBonus(&ana, 300);
    aplicarBonus(nullptr, 300);

    cout << fixed << setprecision(2);
    cout << "Salário da Ana: R$ " << ana << '\n';
    return 0;
}
`,
      padroes: [
        [/void\s+aplicarBonus\s*\(\s*double\s*\*\s*salario\s*,\s*double\s+valor\s*\)/, "Crie void aplicarBonus(double* salario, double valor)."],
        [/salario\s*==\s*nullptr|nullptr\s*==\s*salario|!\s*salario\b/, "Teste se o ponteiro é nullptr antes de usar."],
        [/\*\s*salario\s*(\+=|=\s*\*\s*salario\s*\+)/, "Some o valor ao salário apontado: *salario += valor;"],
        [/aplicarBonus\s*\(\s*&\s*ana\s*,/, "Passe o endereço da Ana: aplicarBonus(&ana, 300)."]
      ],
      saidaEsperada: "Funcionário não encontrado\nSalário da Ana: R$ 2800.00"
    },
    {
      tipo: "criar",
      titulo: "Impressora da recepção",
      enunciado: `A recepção da clínica liga a impressora no começo do turno e ela precisa ser desligada sozinha no fim (RAII). Crie a struct <code>Impressora</code>:
        <ul>
          <li>atributo <code>string local</code>;</li>
          <li>construtor que recebe o local e imprime <code>Ligando impressora &lt;local&gt;</code>;</li>
          <li>destrutor que imprime <code>Desligando impressora &lt;local&gt;</code>;</li>
          <li>método <code>void imprimir(const string&amp; doc) const</code> que imprime <code>Imprimindo &lt;doc&gt;</code>.</li>
        </ul>
        No <code>main</code>: imprima <code>Turno começou</code>; dentro de um bloco <code>{ }</code>, crie a impressora <code>"Recepção"</code> com <code>make_unique</code>
        e imprima <code>"Receita 1"</code> e <code>"Receita 2"</code>; depois do bloco, imprima <code>Turno acabou</code>. Não use <code>delete</code>. A saída deve ser exatamente:
        <pre>Turno começou
Ligando impressora Recepção
Imprimindo Receita 1
Imprimindo Receita 2
Desligando impressora Recepção
Turno acabou</pre>`,
      dica: `O destrutor <code>~Impressora()</code> roda quando o <code>unique_ptr</code> sai do bloco. Chame os métodos com <code>-&gt;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <memory>
#include <string>
using namespace std;

// Crie aqui a struct Impressora (construtor e destrutor com mensagens, e o método imprimir)

int main() {
    // Mostre o início do turno
    // Num bloco, crie a impressora com um smart pointer e imprima as duas receitas
    // Depois do bloco, mostre o fim do turno

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <memory>
#include <string>
using namespace std;

struct Impressora {
    string local;
    Impressora(const string& l) : local(l) { cout << "Ligando impressora " << local << '\n'; }
    ~Impressora() { cout << "Desligando impressora " << local << '\n'; }
    void imprimir(const string& doc) const { cout << "Imprimindo " << doc << '\n'; }
};

int main() {
    cout << "Turno começou\n";
    {
        unique_ptr<Impressora> p = make_unique<Impressora>("Recepção");
        p->imprimir("Receita 1");
        p->imprimir("Receita 2");
    }
    cout << "Turno acabou\n";
    return 0;
}
`,
      padroes: [
        [/struct\s+Impressora\s*\{/, "Crie a struct Impressora."],
        [/~\s*Impressora\s*\(\s*\)/, "Crie o destrutor ~Impressora()."],
        [/make_unique\s*<\s*Impressora\s*>/, "Crie a impressora com make_unique<Impressora>(...)."],
        [/->\s*imprimir\s*\(/, "Chame imprimir pelo ponteiro com ->."]
      ],
      saidaEsperada: "Turno começou\nLigando impressora Recepção\nImprimindo Receita 1\nImprimindo Receita 2\nDesligando impressora Recepção\nTurno acabou"
    }
  ],

  // ───────────────────────── a1: STL: map, set e algoritmos
  a1: [
    {
      tipo: "completar",
      titulo: "Sabores mais pedidos",
      enunciado: `A pizzaria quer contar quantas vezes cada sabor foi pedido, em ordem alfabética. Complete:
        <ul>
          <li>a chave usada no <code>map</code> para somar 1 a cada pedido;</li>
          <li>o nome da chave no <i>structured binding</i> do segundo for;</li>
          <li>o método que verifica se uma chave existe.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>calabresa: 3
frango: 1
mussarela: 2
Ninguém pediu portuguesa</pre>`,
      dica: `<code>contagem[s]++</code> cria a chave com 0 se não existir e soma 1. O binding é <code>[sabor, qtd]</code>. <code>count</code> devolve 0 ou 1 em um <code>map</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> pedidos = {"calabresa", "mussarela", "calabresa", "frango", "calabresa", "mussarela"};

    map<string, int> contagem;
    for (const string& s : pedidos) contagem[____]++;

    for (const auto& [____, qtd] : contagem)
        cout << sabor << ": " << qtd << '\n';

    if (contagem.____("portuguesa") == 0) cout << "Ninguém pediu portuguesa\n";
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> pedidos = {"calabresa", "mussarela", "calabresa", "frango", "calabresa", "mussarela"};

    map<string, int> contagem;
    for (const string& s : pedidos) contagem[s]++;

    for (const auto& [sabor, qtd] : contagem)
        cout << sabor << ": " << qtd << '\n';

    if (contagem.count("portuguesa") == 0) cout << "Ninguém pediu portuguesa\n";
    return 0;
}
`,
      padroes: [
        [/contagem\s*\[\s*s\s*\]\s*\+\+/, "Some 1 na chave do sabor: contagem[s]++."],
        [/auto\s*&\s*\[\s*sabor\s*,\s*qtd\s*\]/, "Use o binding [sabor, qtd]."],
        [/contagem\.count\s*\(\s*"portuguesa"\s*\)/, 'Verifique com contagem.count("portuguesa").']
      ],
      saidaEsperada: "calabresa: 3\nfrango: 1\nmussarela: 2\nNinguém pediu portuguesa"
    },
    {
      tipo: "completar",
      titulo: "Clientes distintos do salão",
      enunciado: `O salão de beleza registrou as visitas da semana e quer saber quantos clientes <b>diferentes</b> vieram. Complete:
        <ul>
          <li>o container que guarda valores sem repetir (e em ordem);</li>
          <li>o início do intervalo copiado do vector;</li>
          <li>o método que adiciona um novo cliente.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Visitas: 6
Clientes distintos: 3
ana
bruno
carla
diego cadastrado</pre>`,
      dica: `O container é <code>set</code>. Ele pode ser criado a partir de <code>visitas.begin()</code> e <code>visitas.end()</code>. Para adicionar, use <code>insert</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> visitas = {"ana", "bruno", "ana", "carla", "bruno", "ana"};
    ____<string> unicos(visitas.____(), visitas.end());

    cout << "Visitas: " << visitas.size() << '\n';
    cout << "Clientes distintos: " << unicos.size() << '\n';
    for (const string& c : unicos) cout << c << '\n';

    unicos.____("diego");
    if (unicos.count("diego")) cout << "diego cadastrado\n";
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> visitas = {"ana", "bruno", "ana", "carla", "bruno", "ana"};
    set<string> unicos(visitas.begin(), visitas.end());

    cout << "Visitas: " << visitas.size() << '\n';
    cout << "Clientes distintos: " << unicos.size() << '\n';
    for (const string& c : unicos) cout << c << '\n';

    unicos.insert("diego");
    if (unicos.count("diego")) cout << "diego cadastrado\n";
    return 0;
}
`,
      padroes: [
        [/set\s*<\s*string\s*>\s+unicos/, "Crie o set<string> unicos."],
        [/unicos\s*\(\s*visitas\.begin\s*\(\s*\)\s*,/, "Comece o intervalo em visitas.begin()."],
        [/unicos\.insert\s*\(\s*"diego"\s*\)/, 'Adicione com unicos.insert("diego").']
      ],
      saidaEsperada: "Visitas: 6\nClientes distintos: 3\nana\nbruno\ncarla\ndiego cadastrado"
    },
    {
      tipo: "completar",
      titulo: "Relatório de vendas com lambdas",
      enunciado: `O financeiro quer as vendas do dia da maior para a menor, a soma e quantas passaram de R$ 100. Complete:
        <ul>
          <li>o operador da lambda que coloca o <b>maior primeiro</b>;</li>
          <li>o algoritmo que soma tudo (de <code>&lt;numeric&gt;</code>);</li>
          <li>o algoritmo que conta os elementos que cumprem uma condição.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Ordem: 300 120 80 45 15
Soma: 560
Acima de 100: 2</pre>`,
      dica: `Na lambda de comparação, <code>a &gt; b</code> ordena do maior para o menor. Os algoritmos são <code>accumulate</code> e <code>count_if</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> vendas = {120, 45, 300, 80, 15};

    sort(vendas.begin(), vendas.end(), [](int a, int b) { return a ____ b; });
    int soma = ____(vendas.begin(), vendas.end(), 0);
    int grandes = ____(vendas.begin(), vendas.end(), [](int v) { return v >= 100; });

    cout << "Ordem:";
    for (int v : vendas) cout << ' ' << v;
    cout << "\nSoma: " << soma << '\n';
    cout << "Acima de 100: " << grandes << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> vendas = {120, 45, 300, 80, 15};

    sort(vendas.begin(), vendas.end(), [](int a, int b) { return a > b; });
    int soma = accumulate(vendas.begin(), vendas.end(), 0);
    int grandes = count_if(vendas.begin(), vendas.end(), [](int v) { return v >= 100; });

    cout << "Ordem:";
    for (int v : vendas) cout << ' ' << v;
    cout << "\nSoma: " << soma << '\n';
    cout << "Acima de 100: " << grandes << '\n';
    return 0;
}
`,
      padroes: [
        [/return\s+a\s*>\s*b\s*;/, "Para o maior vir primeiro, a lambda devolve a > b."],
        [/accumulate\s*\(\s*vendas\.begin/, "Some com accumulate(vendas.begin(), vendas.end(), 0)."],
        [/count_if\s*\(\s*vendas\.begin/, "Conte com count_if(vendas.begin(), vendas.end(), ...)."]
      ],
      saidaEsperada: "Ordem: 300 120 80 45 15\nSoma: 560\nAcima de 100: 2"
    },
    {
      tipo: "criar",
      titulo: "Total por vendedor",
      enunciado: `A loja registrou as vendas como pares (vendedor, valor) no vector <code>vendas</code> (já pronto). Escreva o programa que:
        <ul>
          <li>some os valores de cada vendedor num <code>map&lt;string, double&gt; total</code>;</li>
          <li>mostre cada vendedor em ordem alfabética com o total em duas casas;</li>
          <li>descubra e mostre o vendedor com o maior total.</li>
        </ul>
        A saída deve ser exatamente:
        <pre>Ana: R$ 200.00
Bruno: R$ 100.00
Carla: R$ 249.50
Melhor vendedor: Carla</pre>`,
      dica: `<code>for (const auto&amp; [nome, valor] : vendas) total[nome] += valor;</code> soma tudo. O <code>map</code> já percorre as chaves em ordem alfabética.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, double>> vendas = {
        {"Carla", 150.0}, {"Bruno", 80.5}, {"Carla", 99.5}, {"Ana", 200.0}, {"Bruno", 19.5}
    };

    // 1) Some o valor de cada vendedor num map
    // 2) Mostre vendedor e total (duas casas), em ordem alfabética
    // 3) Mostre quem vendeu mais

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<pair<string, double>> vendas = {
        {"Carla", 150.0}, {"Bruno", 80.5}, {"Carla", 99.5}, {"Ana", 200.0}, {"Bruno", 19.5}
    };

    map<string, double> total;
    for (const auto& [nome, valor] : vendas) total[nome] += valor;

    cout << fixed << setprecision(2);
    string melhor;
    double maior = -1;
    for (const auto& [nome, soma] : total) {
        cout << nome << ": R$ " << soma << '\n';
        if (soma > maior) {
            maior = soma;
            melhor = nome;
        }
    }
    cout << "Melhor vendedor: " << melhor << '\n';
    return 0;
}
`,
      padroes: [
        [/map\s*<\s*string\s*,\s*double\s*>\s+total/, "Crie o map<string, double> total."],
        [/total\s*\[[^\]]+\]\s*\+=/, "Some os valores com total[nome] += valor."],
        [/setprecision\s*\(\s*2\s*\)/, "Mostre os totais com setprecision(2)."]
      ],
      saidaEsperada: "Ana: R$ 200.00\nBruno: R$ 100.00\nCarla: R$ 249.50\nMelhor vendedor: Carla"
    },
    {
      tipo: "criar",
      titulo: "Ranking do campeonato",
      enunciado: `O campeonato de e-sports guarda os jogadores no <code>vector&lt;Jogador&gt; jogadores</code> (já pronto). Escreva o programa que:
        <ul>
          <li>ordene com <code>sort</code> e uma <b>lambda</b>: mais pontos primeiro; em caso de empate, nome em ordem alfabética;</li>
          <li>mostre o pódio (os 3 primeiros) no formato <code>1º Nome - pontos</code>;</li>
          <li>use <code>find_if</code> para achar, na lista ordenada, o primeiro jogador com menos de 700 pontos.</li>
        </ul>
        A saída deve ser exatamente:
        <pre>1º Bia - 1200
2º Davi - 1200
3º Teo - 950
Primeiro abaixo de 700: Rui</pre>`,
      dica: `Na lambda: <code>if (a.pontos != b.pontos) return a.pontos &gt; b.pontos; return a.nome &lt; b.nome;</code>. O <code>find_if</code> devolve um iterador; use <code>it-&gt;nome</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Jogador {
    string nome;
    int pontos;
};

int main() {
    vector<Jogador> jogadores = {{"Lia", 870}, {"Davi", 1200}, {"Rui", 640}, {"Bia", 1200}, {"Teo", 950}};

    // 1) Ordene: mais pontos primeiro; empate decide pelo nome
    // 2) Mostre os 3 primeiros
    // 3) Ache o primeiro jogador com menos de 700 pontos

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Jogador {
    string nome;
    int pontos;
};

int main() {
    vector<Jogador> jogadores = {{"Lia", 870}, {"Davi", 1200}, {"Rui", 640}, {"Bia", 1200}, {"Teo", 950}};

    sort(jogadores.begin(), jogadores.end(), [](const Jogador& a, const Jogador& b) {
        if (a.pontos != b.pontos) return a.pontos > b.pontos;
        return a.nome < b.nome;
    });

    for (int i = 0; i < 3; i++) {
        cout << i + 1 << "º " << jogadores[i].nome << " - " << jogadores[i].pontos << '\n';
    }

    auto it = find_if(jogadores.begin(), jogadores.end(), [](const Jogador& j) { return j.pontos < 700; });
    if (it != jogadores.end()) cout << "Primeiro abaixo de 700: " << it->nome << '\n';
    return 0;
}
`,
      padroes: [
        [/sort\s*\(\s*jogadores\.begin/, "Ordene com sort(jogadores.begin(), jogadores.end(), ...)."],
        [/sort\s*\([^;]*\[\s*\]\s*\(/, "Passe uma lambda [](...) { ... } para o sort."],
        [/find_if\s*\(\s*jogadores\.begin/, "Use find_if(jogadores.begin(), jogadores.end(), ...)."],
        [/\.nome\s*<\s*\w+\.nome/, "No empate, compare os nomes com <."]
      ],
      saidaEsperada: "1º Bia - 1200\n2º Davi - 1200\n3º Teo - 950\nPrimeiro abaixo de 700: Rui"
    }
  ],

  // ───────────────────────── a2: Herança, polimorfismo e templates
  a2: [
    {
      tipo: "completar",
      titulo: "Formas do arquiteto",
      enunciado: `O app do arquiteto calcula a área de várias formas guardadas num mesmo vector. Complete:
        <ul>
          <li>a palavra que permite que <code>area()</code> seja substituída nas classes filhas;</li>
          <li>o valor que torna <code>area()</code> uma função <b>virtual pura</b> (a classe vira abstrata);</li>
          <li>o tipo de herança de <code>Quadrado</code>;</li>
          <li>a palavra que confirma que <code>area()</code> do <code>Quadrado</code> substitui a da base.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Quadrado: 9
Triângulo: 10</pre>`,
      dica: `Função virtual pura: <code>virtual double area() const = 0;</code>. Herança: <code>class Quadrado : public Forma</code>. Na filha, use <code>override</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;

class Forma {
public:
    ____ double area() const = ____;
    virtual string nome() const { return "Forma"; }
    virtual ~Forma() = default;
};

class Quadrado : ____ Forma {
    double lado;
public:
    explicit Quadrado(double l) : lado(l) {}
    double area() const ____ { return lado * lado; }
    string nome() const override { return "Quadrado"; }
};

class Triangulo : public Forma {
    double base, altura;
public:
    Triangulo(double b, double a) : base(b), altura(a) {}
    double area() const override { return base * altura / 2; }
    string nome() const override { return "Triângulo"; }
};

int main() {
    vector<unique_ptr<Forma>> formas;
    formas.push_back(make_unique<Quadrado>(3));
    formas.push_back(make_unique<Triangulo>(4, 5));

    for (const auto& f : formas)
        cout << f->nome() << ": " << f->area() << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;

class Forma {
public:
    virtual double area() const = 0;
    virtual string nome() const { return "Forma"; }
    virtual ~Forma() = default;
};

class Quadrado : public Forma {
    double lado;
public:
    explicit Quadrado(double l) : lado(l) {}
    double area() const override { return lado * lado; }
    string nome() const override { return "Quadrado"; }
};

class Triangulo : public Forma {
    double base, altura;
public:
    Triangulo(double b, double a) : base(b), altura(a) {}
    double area() const override { return base * altura / 2; }
    string nome() const override { return "Triângulo"; }
};

int main() {
    vector<unique_ptr<Forma>> formas;
    formas.push_back(make_unique<Quadrado>(3));
    formas.push_back(make_unique<Triangulo>(4, 5));

    for (const auto& f : formas)
        cout << f->nome() << ": " << f->area() << '\n';
    return 0;
}
`,
      padroes: [
        [/virtual\s+double\s+area\s*\(\s*\)\s*const\s*=\s*0\s*;/, "Na base: virtual double area() const = 0;"],
        [/class\s+Quadrado\s*:\s*public\s+Forma/, "Quadrado herda com public: class Quadrado : public Forma."],
        [/lado\s*\(\s*l\s*\)\s*\{\s*\}\s*double\s+area\s*\(\s*\)\s*const\s+override/, "Marque a area() do Quadrado com override."]
      ],
      saidaEsperada: "Quadrado: 9\nTriângulo: 10"
    },
    {
      tipo: "completar",
      titulo: "Maior e menor com template",
      enunciado: `Em vez de escrever uma função <code>maior</code> para cada tipo, a equipe usa <b>templates</b>. Complete:
        <ul>
          <li>a palavra que inicia a declaração do template de <code>maior</code>;</li>
          <li>o tipo do primeiro parâmetro de <code>menor</code>;</li>
          <li>o operador que faz <code>menor</code> devolver o menor valor.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>9 7.25 bia
15 2.5</pre>`,
      dica: `Templates começam com <code>template &lt;typename T&gt;</code>. Os dois parâmetros de <code>menor</code> são do tipo <code>T</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
using namespace std;

____ <typename T>
T maior(T a, T b) { return a > b ? a : b; }

template <typename T>
T menor(____ a, T b) { return a ____ b ? a : b; }

int main() {
    cout << maior(3, 9) << ' ' << maior(2.5, 7.25) << ' '
         << maior(string("ana"), string("bia")) << '\n';
    cout << menor(40, 15) << ' ' << menor<double>(3, 2.5) << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

template <typename T>
T maior(T a, T b) { return a > b ? a : b; }

template <typename T>
T menor(T a, T b) { return a < b ? a : b; }

int main() {
    cout << maior(3, 9) << ' ' << maior(2.5, 7.25) << ' '
         << maior(string("ana"), string("bia")) << '\n';
    cout << menor(40, 15) << ' ' << menor<double>(3, 2.5) << '\n';
    return 0;
}
`,
      padroes: [
        [/template\s*<\s*(typename|class)\s+T\s*>\s*T\s+maior/, "Declare template <typename T> antes de maior."],
        [/T\s+menor\s*\(\s*T\s+a\s*,\s*T\s+b\s*\)/, "Os dois parâmetros de menor são do tipo T."],
        [/return\s+a\s*<\s*b\s*\?\s*a\s*:\s*b/, "menor devolve a < b ? a : b."]
      ],
      saidaEsperada: "9 7.25 bia\n15 2.5"
    },
    {
      tipo: "completar",
      titulo: "Histórico do prontuário",
      enunciado: `O prontuário eletrônico guarda históricos de tipos diferentes (temperaturas e status) com a <b>mesma classe template</b>. Complete:
        <ul>
          <li>a palavra que declara o parâmetro de tipo do template;</li>
          <li>o tipo do valor recebido em <code>adicionar</code>;</li>
          <li>o tipo do histórico de temperaturas (números decimais);</li>
          <li>o tipo do histórico de status (textos).</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Temperaturas: 2, última: 37.8
Status: 2, último: alta</pre>`,
      dica: `<code>template &lt;typename T&gt;</code>. Dentro da classe, os valores são do tipo <code>T</code>. Ao usar: <code>Historico&lt;double&gt;</code> e <code>Historico&lt;string&gt;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <____ T>
class Historico {
    vector<T> valores;
public:
    void adicionar(const ____& v) { valores.push_back(v); }
    T ultimo() const { return valores.back(); }
    size_t tamanho() const { return valores.size(); }
};

int main() {
    Historico<____> temperaturas;
    temperaturas.adicionar(36.5);
    temperaturas.adicionar(37.8);

    Historico<____> status;
    status.adicionar("internado");
    status.adicionar("alta");

    cout << "Temperaturas: " << temperaturas.tamanho() << ", última: " << temperaturas.ultimo() << '\n';
    cout << "Status: " << status.tamanho() << ", último: " << status.ultimo() << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <typename T>
class Historico {
    vector<T> valores;
public:
    void adicionar(const T& v) { valores.push_back(v); }
    T ultimo() const { return valores.back(); }
    size_t tamanho() const { return valores.size(); }
};

int main() {
    Historico<double> temperaturas;
    temperaturas.adicionar(36.5);
    temperaturas.adicionar(37.8);

    Historico<string> status;
    status.adicionar("internado");
    status.adicionar("alta");

    cout << "Temperaturas: " << temperaturas.tamanho() << ", última: " << temperaturas.ultimo() << '\n';
    cout << "Status: " << status.tamanho() << ", último: " << status.ultimo() << '\n';
    return 0;
}
`,
      padroes: [
        [/template\s*<\s*(typename|class)\s+T\s*>/, "Declare template <typename T>."],
        [/adicionar\s*\(\s*const\s+T\s*&\s*v\s*\)/, "adicionar recebe const T& v."],
        [/Historico\s*<\s*double\s*>\s+temperaturas/, "Temperaturas são decimais: Historico<double>."],
        [/Historico\s*<\s*(std::)?string\s*>\s+status/, "Status são textos: Historico<string>."]
      ],
      saidaEsperada: "Temperaturas: 2, última: 37.8\nStatus: 2, último: alta"
    },
    {
      tipo: "criar",
      titulo: "Folha de pagamento polimórfica",
      enunciado: `O RH calcula o salário de cada tipo de funcionário de um jeito. Crie:
        <ul>
          <li>a classe base <code>Funcionario</code> com <code>protected: string nome; double base;</code>, construtor,
            <code>virtual double salario() const</code> (devolve <code>base</code>), <code>virtual string cargo() const</code> (devolve <code>"Analista"</code>),
            <code>string getNome() const</code> e destrutor virtual;</li>
          <li><code>Gerente</code> (herda de <code>Funcionario</code>): salário = base + 1500, cargo <code>"Gerente"</code>;</li>
          <li><code>Estagiario</code> (herda de <code>Funcionario</code>): salário = base / 2, cargo <code>"Estagiário"</code>.</li>
        </ul>
        Use <code>override</code> nas filhas. No <code>main</code>, guarde Ana (Funcionario, 3000), Bruno (Gerente, 5000) e Caio (Estagiario, 2000) num
        <code>vector&lt;unique_ptr&lt;Funcionario&gt;&gt;</code>, mostre cada um e a folha total. A saída deve ser exatamente:
        <pre>Ana (Analista): R$ 3000.00
Bruno (Gerente): R$ 6500.00
Caio (Estagiário): R$ 1000.00
Folha total: R$ 10500.00</pre>`,
      dica: `O construtor da filha repassa para o da base: <code>Gerente(const string&amp; n, double b) : Funcionario(n, b) {}</code>. Ou use <code>using Funcionario::Funcionario;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <memory>
#include <string>
#include <vector>
using namespace std;

// Crie a classe base e as duas classes filhas

int main() {
    // Guarde os três funcionários num vector de smart pointers para a base
    // Mostre nome, cargo e salário de cada um e a soma de todos

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <memory>
#include <string>
#include <vector>
using namespace std;

class Funcionario {
protected:
    string nome;
    double base;
public:
    Funcionario(const string& n, double b) : nome(n), base(b) {}
    virtual double salario() const { return base; }
    virtual string cargo() const { return "Analista"; }
    string getNome() const { return nome; }
    virtual ~Funcionario() = default;
};

class Gerente : public Funcionario {
public:
    Gerente(const string& n, double b) : Funcionario(n, b) {}
    double salario() const override { return base + 1500; }
    string cargo() const override { return "Gerente"; }
};

class Estagiario : public Funcionario {
public:
    Estagiario(const string& n, double b) : Funcionario(n, b) {}
    double salario() const override { return base / 2; }
    string cargo() const override { return "Estagiário"; }
};

int main() {
    vector<unique_ptr<Funcionario>> equipe;
    equipe.push_back(make_unique<Funcionario>("Ana", 3000));
    equipe.push_back(make_unique<Gerente>("Bruno", 5000));
    equipe.push_back(make_unique<Estagiario>("Caio", 2000));

    cout << fixed << setprecision(2);
    double folha = 0;
    for (const auto& f : equipe) {
        cout << f->getNome() << " (" << f->cargo() << "): R$ " << f->salario() << '\n';
        folha += f->salario();
    }
    cout << "Folha total: R$ " << folha << '\n';
    return 0;
}
`,
      padroes: [
        [/virtual\s+double\s+salario\s*\(\s*\)\s*const/, "Na base, declare virtual double salario() const."],
        [/class\s+Gerente\s*:\s*public\s+Funcionario/, "Gerente herda de Funcionario: class Gerente : public Funcionario."],
        [/class\s+Estagiario\s*:\s*public\s+Funcionario/, "Estagiario herda de Funcionario: class Estagiario : public Funcionario."],
        [/salario\s*\(\s*\)\s*const\s+override/, "Use override no salario() das filhas."],
        [/virtual\s*~\s*Funcionario\s*\(/, "A classe base precisa de destrutor virtual."]
      ],
      saidaEsperada: "Ana (Analista): R$ 3000.00\nBruno (Gerente): R$ 6500.00\nCaio (Estagiário): R$ 1000.00\nFolha total: R$ 10500.00"
    },
    {
      tipo: "criar",
      titulo: "Somar qualquer coisa",
      enunciado: `O sistema da transportadora precisa somar quantidades de caixas (<code>int</code>), pesos (<code>double</code>) e juntar partes de um código (<code>string</code>).
        Crie <b>um único</b> template de função <code>T somarTodos(const vector&lt;T&gt;&amp; itens)</code> que comece com <code>T total{}</code>
        e some (<code>+=</code>) cada item. No <code>main</code>, use-o nos três vectors já prontos. A saída deve ser exatamente:
        <pre>Caixas: 50
Peso total: 4.5
Código: Pedido-042</pre>`,
      dica: `<code>T total{};</code> cria o "zero" de qualquer tipo: 0 para números e texto vazio para <code>string</code>. Para <code>string</code>, <code>+=</code> emenda os textos.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Crie aqui o template de função somarTodos

int main() {
    vector<int> caixas = {12, 30, 8};
    vector<double> pesos = {1.5, 2.25, 0.75};
    vector<string> partes = {"Pedido", "-", "042"};

    // Mostre a soma das caixas, o peso total e o código montado

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <typename T>
T somarTodos(const vector<T>& itens) {
    T total{};
    for (const T& item : itens) total += item;
    return total;
}

int main() {
    vector<int> caixas = {12, 30, 8};
    vector<double> pesos = {1.5, 2.25, 0.75};
    vector<string> partes = {"Pedido", "-", "042"};

    cout << "Caixas: " << somarTodos(caixas) << '\n';
    cout << "Peso total: " << somarTodos(pesos) << '\n';
    cout << "Código: " << somarTodos(partes) << '\n';
    return 0;
}
`,
      padroes: [
        [/template\s*<\s*(typename|class)\s+T\s*>/, "Declare template <typename T>."],
        [/T\s+somarTodos\s*\(\s*const\s+vector\s*<\s*T\s*>\s*&\s*\w+\s*\)/, "A assinatura é T somarTodos(const vector<T>& itens)."],
        [/T\s+total\s*(\{\s*\}|=\s*T\s*\{\s*\}|=\s*T\s*\(\s*\))/, "Comece com T total{};"],
        [/somarTodos\s*\(\s*partes\s*\)/, "Use somarTodos também com o vector partes."]
      ],
      saidaEsperada: "Caixas: 50\nPeso total: 4.5\nCódigo: Pedido-042"
    }
  ],

  // ───────────────────────── a3: Exceções, arquivos e organização em .h/.cpp
  a3: [
    {
      tipo: "completar",
      titulo: "Parcelamento seguro",
      enunciado: `O caixa da loja calcula o valor de cada parcela. Se alguém digitar 0 parcelas, o programa não pode quebrar. Complete:
        <ul>
          <li>a palavra que lança a exceção;</li>
          <li>o bloco que tenta executar o código arriscado;</li>
          <li>o bloco que captura o <code>invalid_argument</code>;</li>
          <li>o método que devolve a mensagem da exceção.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Parcela: R$ 75.00
Erro: Número de parcelas inválido
Caixa continua funcionando</pre>`,
      dica: `<code>throw</code> lança, <code>try { }</code> tenta, <code>catch (...) { }</code> trata e <code>e.what()</code> devolve a mensagem.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <stdexcept>
using namespace std;

double calcularParcela(double total, int parcelas) {
    if (parcelas <= 0) ____ invalid_argument("Número de parcelas inválido");
    return total / parcelas;
}

int main() {
    cout << fixed << setprecision(2);
    ____ {
        double p1 = calcularParcela(300.0, 4);
        cout << "Parcela: R$ " << p1 << '\n';
        double p2 = calcularParcela(300.0, 0);
        cout << "Parcela: R$ " << p2 << '\n';
    } ____ (const invalid_argument& e) {
        cout << "Erro: " << e.____() << '\n';
    }
    cout << "Caixa continua funcionando\n";
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <stdexcept>
using namespace std;

double calcularParcela(double total, int parcelas) {
    if (parcelas <= 0) throw invalid_argument("Número de parcelas inválido");
    return total / parcelas;
}

int main() {
    cout << fixed << setprecision(2);
    try {
        double p1 = calcularParcela(300.0, 4);
        cout << "Parcela: R$ " << p1 << '\n';
        double p2 = calcularParcela(300.0, 0);
        cout << "Parcela: R$ " << p2 << '\n';
    } catch (const invalid_argument& e) {
        cout << "Erro: " << e.what() << '\n';
    }
    cout << "Caixa continua funcionando\n";
    return 0;
}
`,
      padroes: [
        [/throw\s+invalid_argument\s*\(/, "Lance a exceção com throw invalid_argument(...)."],
        [/try\s*\{/, "Coloque o código arriscado num bloco try { }."],
        [/catch\s*\(\s*const\s+invalid_argument\s*&\s*e\s*\)/, "Capture com catch (const invalid_argument& e)."],
        [/e\.what\s*\(\s*\)/, "A mensagem vem de e.what()."]
      ],
      saidaEsperada: "Parcela: R$ 75.00\nErro: Número de parcelas inválido\nCaixa continua funcionando"
    },
    {
      tipo: "completar",
      titulo: "Agenda gravada em arquivo",
      enunciado: `O consultório grava a agenda do dia num arquivo e depois lê de volta, linha por linha. Complete:
        <ul>
          <li>o tipo de stream que <b>escreve</b> em arquivo;</li>
          <li>o operador que testa se o arquivo <b>não</b> abriu;</li>
          <li>a função que lê uma linha inteira do arquivo.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Ana às 09:00
Bruno às 10:30
Carla às 14:00
Consultas: 3</pre>`,
      dica: `<code>ofstream</code> escreve e <code>ifstream</code> lê (ambos de <code>&lt;fstream&gt;</code>). <code>!entrada</code> é verdadeiro se falhou. <code>while (getline(entrada, linha))</code> repete até o fim do arquivo.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    {
        ____ saida("agenda.txt");
        saida << "09:00;Ana\n" << "10:30;Bruno\n" << "14:00;Carla\n";
    }   // o arquivo fecha aqui

    ifstream entrada("agenda.txt");
    if (____entrada) {
        cout << "Não consegui abrir a agenda\n";
        return 1;
    }

    string linha;
    int total = 0;
    while (____(entrada, linha)) {
        size_t pos = linha.find(';');
        cout << linha.substr(pos + 1) << " às " << linha.substr(0, pos) << '\n';
        total++;
    }
    cout << "Consultas: " << total << '\n';
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    {
        ofstream saida("agenda.txt");
        saida << "09:00;Ana\n" << "10:30;Bruno\n" << "14:00;Carla\n";
    }   // o arquivo fecha aqui

    ifstream entrada("agenda.txt");
    if (!entrada) {
        cout << "Não consegui abrir a agenda\n";
        return 1;
    }

    string linha;
    int total = 0;
    while (getline(entrada, linha)) {
        size_t pos = linha.find(';');
        cout << linha.substr(pos + 1) << " às " << linha.substr(0, pos) << '\n';
        total++;
    }
    cout << "Consultas: " << total << '\n';
    return 0;
}
`,
      padroes: [
        [/ofstream\s+saida\s*\(\s*"agenda\.txt"\s*\)/, 'Para escrever, use ofstream saida("agenda.txt").'],
        [/if\s*\(\s*!\s*entrada\s*\)/, "Teste se o arquivo não abriu com if (!entrada)."],
        [/while\s*\(\s*getline\s*\(\s*entrada\s*,\s*linha\s*\)\s*\)/, "Leia linha por linha com while (getline(entrada, linha))."]
      ],
      saidaEsperada: "Ana às 09:00\nBruno às 10:30\nCarla às 14:00\nConsultas: 3"
    },
    {
      tipo: "completar",
      titulo: "Exceção própria do estoque",
      enunciado: `O almoxarifado tem uma exceção própria, <code>EstoqueInsuficiente</code>, filha de <code>runtime_error</code>. Complete:
        <ul>
          <li>a classe-mãe de <code>EstoqueInsuficiente</code>;</li>
          <li>o construtor da mãe chamado na lista de inicialização;</li>
          <li>a palavra que lança a exceção quando falta estoque;</li>
          <li>o tipo capturado no <b>primeiro</b> <code>catch</code> (o mais específico vem antes do genérico).</li>
        </ul>
        Clique em cada retângulo e escreva o que falta. A saída deve ser exatamente:
        <pre>Retirados 4, restam 6
Erro: Quantidade deve ser positiva
Estoque: Só há 6 unidades
Retirados 6, restam 0</pre>`,
      dica: `A classe começa com <code>class EstoqueInsuficiente : public runtime_error</code> e o construtor repassa a mensagem com <code>: runtime_error(msg)</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

class EstoqueInsuficiente : public ____ {
public:
    explicit EstoqueInsuficiente(const string& msg) : ____(msg) {}
};

void retirar(int& estoque, int qtd) {
    if (qtd <= 0) throw invalid_argument("Quantidade deve ser positiva");
    if (qtd > estoque) ____ EstoqueInsuficiente("Só há " + to_string(estoque) + " unidades");
    estoque -= qtd;
}

int main() {
    int estoque = 10;
    int pedidos[] = {4, 0, 9, 6};

    for (int q : pedidos) {
        try {
            retirar(estoque, q);
            cout << "Retirados " << q << ", restam " << estoque << '\n';
        } catch (const ____& e) {
            cout << "Estoque: " << e.what() << '\n';
        } catch (const exception& e) {
            cout << "Erro: " << e.what() << '\n';
        }
    }
    return 0;
}
`,
      solucao: c`#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

class EstoqueInsuficiente : public runtime_error {
public:
    explicit EstoqueInsuficiente(const string& msg) : runtime_error(msg) {}
};

void retirar(int& estoque, int qtd) {
    if (qtd <= 0) throw invalid_argument("Quantidade deve ser positiva");
    if (qtd > estoque) throw EstoqueInsuficiente("Só há " + to_string(estoque) + " unidades");
    estoque -= qtd;
}

int main() {
    int estoque = 10;
    int pedidos[] = {4, 0, 9, 6};

    for (int q : pedidos) {
        try {
            retirar(estoque, q);
            cout << "Retirados " << q << ", restam " << estoque << '\n';
        } catch (const EstoqueInsuficiente& e) {
            cout << "Estoque: " << e.what() << '\n';
        } catch (const exception& e) {
            cout << "Erro: " << e.what() << '\n';
        }
    }
    return 0;
}
`,
      padroes: [
        [/class\s+EstoqueInsuficiente\s*:\s*public\s+(std::)?runtime_error/, "EstoqueInsuficiente herda de runtime_error."],
        [/:\s*(std::)?runtime_error\s*\(\s*msg\s*\)/, "Repasse a mensagem para a mãe: : runtime_error(msg)."],
        [/throw\s+EstoqueInsuficiente\s*\(/, "Lance com throw EstoqueInsuficiente(...)."],
        [/catch\s*\(\s*const\s+EstoqueInsuficiente\s*&/, "O primeiro catch captura const EstoqueInsuficiente&."]
      ],
      saidaEsperada: "Retirados 4, restam 6\nErro: Quantidade deve ser positiva\nEstoque: Só há 6 unidades\nRetirados 6, restam 0"
    },
    {
      tipo: "criar",
      titulo: "Leituras do sensor de temperatura",
      enunciado: `Uma câmara fria envia as leituras do sensor como texto, e algumas chegam com defeito. Crie <code>double lerTemperatura(const string&amp; texto)</code>:
        <ul>
          <li>converta com <code>stod</code> (se o texto não for número, o próprio <code>stod</code> lança <code>invalid_argument</code>);</li>
          <li>se o valor for menor que -50 ou maior que 150, lance <code>out_of_range("Fora da faixa: " + texto)</code>;</li>
          <li>senão, devolva o valor.</li>
        </ul>
        No <code>main</code>, para cada texto do vector <code>leituras</code> (já pronto), use <code>try</code> e dois <code>catch</code>: um para
        <code>out_of_range</code> (imprime <code>Alerta: </code> + mensagem) e outro para <code>invalid_argument</code> (imprime <code>Inválida: </code> + o texto).
        Mostre as leituras com uma casa decimal. A saída deve ser exatamente:
        <pre>Leitura ok: 23.5
Inválida: abc
Alerta: Fora da faixa: 180
Leitura ok: -4.0</pre>`,
      dica: `Use <code>cout &lt;&lt; fixed &lt;&lt; setprecision(1);</code> uma vez no começo. As duas exceções vêm de <code>&lt;stdexcept&gt;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <iomanip>
#include <stdexcept>
#include <string>
#include <vector>
using namespace std;

// Crie aqui a função lerTemperatura (converte o texto e valida a faixa)

int main() {
    vector<string> leituras = {"23.5", "abc", "180", "-4"};

    // Para cada leitura: tente converter e trate os dois tipos de erro

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <iomanip>
#include <stdexcept>
#include <string>
#include <vector>
using namespace std;

double lerTemperatura(const string& texto) {
    double valor = stod(texto);
    if (valor < -50 || valor > 150) throw out_of_range("Fora da faixa: " + texto);
    return valor;
}

int main() {
    vector<string> leituras = {"23.5", "abc", "180", "-4"};

    cout << fixed << setprecision(1);
    for (const string& l : leituras) {
        try {
            double t = lerTemperatura(l);
            cout << "Leitura ok: " << t << '\n';
        } catch (const out_of_range& e) {
            cout << "Alerta: " << e.what() << '\n';
        } catch (const invalid_argument& e) {
            cout << "Inválida: " << l << '\n';
        }
    }
    return 0;
}
`,
      padroes: [
        [/double\s+lerTemperatura\s*\(\s*const\s+(std::)?string\s*&\s*\w+\s*\)/, "Crie double lerTemperatura(const string& texto)."],
        [/throw\s+(std::)?out_of_range\s*\(/, "Lance out_of_range quando a leitura estiver fora da faixa."],
        [/catch\s*\(\s*const\s+(std::)?out_of_range\s*&/, "Capture const out_of_range&."],
        [/catch\s*\(\s*const\s+(std::)?invalid_argument\s*&/, "Capture const invalid_argument&."]
      ],
      saidaEsperada: "Leitura ok: 23.5\nInválida: abc\nAlerta: Fora da faixa: 180\nLeitura ok: -4.0"
    },
    {
      tipo: "criar",
      titulo: "Log de erros da fábrica",
      enunciado: `O sistema da fábrica grava os eventos num arquivo de log e depois procura os erros. Escreva o programa que:
        <ul>
          <li>grave cada texto do vector <code>eventos</code> (já pronto) numa linha do arquivo <code>log.txt</code>, usando um <code>ofstream</code>;</li>
          <li>abra o arquivo para leitura com um <code>ifstream</code>; se não abrir, lance <code>runtime_error</code> (e trate com <code>try</code>/<code>catch</code> no <code>main</code>);</li>
          <li>leia linha por linha com <code>getline</code>, imprima as linhas que começam com <code>ERRO</code> e conte o total de linhas e de erros.</li>
        </ul>
        A saída deve ser exatamente:
        <pre>ERRO Falha no sensor 2
ERRO Disco cheio
Total de linhas: 5
Erros: 2</pre>`,
      dica: `Para saber se a linha começa com "ERRO": <code>linha.substr(0, 4) == "ERRO"</code>. Feche o arquivo de escrita (saindo de um bloco <code>{ }</code>) antes de abrir para leitura.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> eventos = {
        "INFO Sistema iniciado",
        "ERRO Falha no sensor 2",
        "INFO Leitura ok",
        "ERRO Disco cheio",
        "AVISO Temperatura alta"
    };

    // 1) Grave cada evento numa linha do arquivo log.txt
    // 2) Abra o arquivo para leitura (se falhar, lance uma exceção e trate)
    // 3) Leia linha por linha, mostre os erros e conte linhas e erros

    return 0;
}
`,
      solucao: c`#include <iostream>
#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> eventos = {
        "INFO Sistema iniciado",
        "ERRO Falha no sensor 2",
        "INFO Leitura ok",
        "ERRO Disco cheio",
        "AVISO Temperatura alta"
    };

    {
        ofstream saida("log.txt");
        for (const string& e : eventos) saida << e << '\n';
    }

    try {
        ifstream entrada("log.txt");
        if (!entrada) throw runtime_error("Não consegui abrir log.txt");

        string linha;
        int linhas = 0, erros = 0;
        while (getline(entrada, linha)) {
            linhas++;
            if (linha.substr(0, 4) == "ERRO") {
                cout << linha << '\n';
                erros++;
            }
        }
        cout << "Total de linhas: " << linhas << '\n';
        cout << "Erros: " << erros << '\n';
    } catch (const exception& e) {
        cout << "Erro: " << e.what() << '\n';
    }
    return 0;
}
`,
      padroes: [
        [/ofstream\s+\w+\s*[({]\s*"log\.txt"/, 'Grave com um ofstream aberto em "log.txt".'],
        [/ifstream\s+\w+\s*[({]\s*"log\.txt"/, 'Leia com um ifstream aberto em "log.txt".'],
        [/while\s*\(\s*getline\s*\(/, "Leia linha por linha com while (getline(...))."],
        [/throw\s+(std::)?runtime_error\s*\(/, "Se o arquivo não abrir, lance runtime_error."],
        [/catch\s*\(/, "Trate a exceção com catch."]
      ],
      saidaEsperada: "ERRO Falha no sensor 2\nERRO Disco cheio\nTotal de linhas: 5\nErros: 2"
    }
  ],
  // ───────────────────────── p1: O que é C++ e como rodar (Iniciante)
  p1: [
    {
      tipo: "completar",
      titulo: "Bom dia da padaria",
      enunciado: `A padaria quer que o programa mostre a mensagem <b>Bom dia, padaria!</b> na tela.
        Clique em cada retângulo e escreva o que falta: as setinhas que levam o texto até o <code>cout</code>.`,
      dica: `As setinhas são dois sinais de “menor que” juntos: <code>&lt;&lt;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    cout ____ "Bom dia, padaria!" << endl;
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Bom dia, padaria!" << endl;
    return 0;
}`,
      padroes: [
        [/cout\s*<<\s*"Bom dia, padaria!"/, "Use cout << \"Bom dia, padaria!\" com as setinhas << e o texto entre aspas."],
        [/int\s+main\s*\(\s*\)/, "Mantenha a porta de entrada: int main()."]
      ],
      saidaEsperada: "Bom dia, padaria!"
    },
    {
      tipo: "completar",
      titulo: "A moldura do programa",
      enunciado: `Faltam pedaços da “moldura” do programa. Clique em cada retângulo e escreva o que falta:
        o nome da caixa de ferramentas que tem o <code>cout</code> e a palavra que encerra o <code>main</code> avisando “deu tudo certo”.
        O programa deve mostrar <b>Loja aberta</b>.`,
      dica: `A caixa de ferramentas é a <code>iostream</code>. A última linha do <code>main</code> é <code>... 0;</code>.`,
      lang: "cpp",
      inicial: c`#include <____>
using namespace std;

int main() {
    cout << "Loja aberta" << endl;
    ____ 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Loja aberta" << endl;
    return 0;
}`,
      padroes: [
        [/#include\s*<iostream>/, "A primeira linha deve ser #include <iostream>."],
        [/return\s+0\s*;/, "Termine o main com return 0;."],
        [/cout\s*<<\s*"Loja aberta"/, "Mantenha cout << \"Loja aberta\"."]
      ],
      saidaEsperada: "Loja aberta"
    },
    {
      tipo: "completar",
      titulo: "Aspas e ponto e vírgula",
      enunciado: `A mensagem <b>Pedido recebido</b> está sem as aspas e sem o ponto e vírgula.
        Clique em cada retângulo e escreva o que falta: no primeiro, o texto <b>entre aspas duplas</b>; no segundo, o sinal que encerra a instrução.`,
      dica: `Texto vai entre aspas duplas: <code>"Pedido recebido"</code>. Toda instrução termina com <code>;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    cout << ____ << endl____
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Pedido recebido" << endl;
    return 0;
}`,
      padroes: [
        [/cout\s*<<\s*"Pedido recebido"/, "O texto deve estar entre aspas duplas: \"Pedido recebido\"."],
        [/<<\s*endl\s*;/, "Coloque o ponto e vírgula depois do endl."]
      ],
      saidaEsperada: "Pedido recebido"
    },
    {
      tipo: "criar",
      titulo: "Meu primeiro programa completo",
      enunciado: `Escreva do zero um programa C++ completo que mostre <b>Olá, mundo!</b> na tela.
        Ele precisa ter as quatro partes da moldura: <code>#include &lt;iostream&gt;</code>, <code>using namespace std;</code>,
        <code>int main()</code> com chaves e <code>return 0;</code> no final.`,
      dica: `Copie a moldura dos exemplos do tópico e troque só a mensagem do <code>cout</code>.`,
      lang: "cpp",
      inicial: c`// Escreva aqui o programa completo:
// 1) a caixa de ferramentas
// 2) a linha da gaveta std
// 3) a porta de entrada com a mensagem
// 4) o aviso de que terminou sem erro
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Olá, mundo!" << endl;
    return 0;
}`,
      padroes: [
        [/#include\s*<iostream>/, "Comece com #include <iostream>."],
        [/int\s+main\s*\(\s*\)\s*\{/, "Crie a porta de entrada: int main() {."],
        [/cout\s*<<\s*"Olá, mundo!"/, "Mostre exatamente \"Olá, mundo!\" com cout <<."],
        [/return\s+0\s*;/, "Termine o main com return 0;."]
      ],
      saidaEsperada: "Olá, mundo!"
    },
    {
      tipo: "criar",
      titulo: "Cardápio em três linhas",
      enunciado: `A lanchonete quer um programa que mostre o cardápio, <b>uma palavra por linha</b>, exatamente assim:
        <pre>Cardápio
Café
Pão de queijo</pre>
        Escreva o programa completo, usando um <code>cout</code> para cada linha e <code>endl</code> para pular de linha.`,
      dica: `Três linhas de <code>cout &lt;&lt; "..." &lt;&lt; endl;</code>, uma embaixo da outra, dentro do <code>main</code>.`,
      lang: "cpp",
      inicial: c`// Escreva aqui o programa completo que mostra o cardápio
// (uma linha para o título e uma para cada item).
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Cardápio" << endl;
    cout << "Café" << endl;
    cout << "Pão de queijo" << endl;
    return 0;
}`,
      padroes: [
        [/int\s+main\s*\(\s*\)/, "Crie a porta de entrada: int main()."],
        [/"Cardápio"[\s\S]*"Café"[\s\S]*"Pão de queijo"/, "Mostre \"Cardápio\", \"Café\" e \"Pão de queijo\", nessa ordem."],
        [/(endl[\s\S]*){3}/, "Use endl no fim de cada uma das três linhas."],
        [/return\s+0\s*;/, "Termine o main com return 0;."]
      ],
      saidaEsperada: "Cardápio\nCafé\nPão de queijo"
    }
  ],
  // ───────────────────────── p2: Contas e textos (Iniciante)
  p2: [
    {
      tipo: "completar",
      titulo: "Conta dos pães",
      enunciado: `O cliente levou <b>3 pães de R$ 4</b>. Clique no retângulo e escreva o sinal que faz a multiplicação,
        para a tela mostrar <b>Total: R$ 12</b>.`,
      dica: `No teclado não existe “×”: a multiplicação é o asterisco.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    cout << "Total: R$ " << 3 ____ 4 << endl;
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Total: R$ " << 3 * 4 << endl;
    return 0;
}`,
      padroes: [
        [/3\s*\*\s*4/, "Multiplique com o asterisco: 3 * 4."],
        [/cout\s*<<\s*"Total: R\$ "/, "Mantenha o texto \"Total: R$ \" no começo."]
      ],
      saidaEsperada: "Total: R$ 12"
    },
    {
      tipo: "completar",
      titulo: "Dividindo a conta com centavos",
      enunciado: `Quatro amigos vão dividir uma conta de <b>R$ 10</b>. Com <code>10 / 4</code> o C++ mostra 2 (divisão entre inteiros).
        Clique no retângulo e escreva o 10 de um jeito que a tela mostre <b>Cada um paga: R$ 2.5</b>.`,
      dica: `Escreva o número com ponto e casa decimal: assim a divisão não joga fora a parte quebrada.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    cout << "Cada um paga: R$ " << ____ / 4 << endl;
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Cada um paga: R$ " << 10.0 / 4 << endl;
    return 0;
}`,
      padroes: [
        [/10\.\d*\s*\/\s*4/, "Escreva o 10 com ponto (10.0) para a divisão mostrar 2.5."],
        [/cout\s*<<\s*"Cada um paga: R\$ "/, "Mantenha o texto \"Cada um paga: R$ \"."]
      ],
      saidaEsperada: "Cada um paga: R$ 2.5"
    },
    {
      tipo: "completar",
      titulo: "Ovos que sobram",
      enunciado: `A granja tem <b>17 ovos</b> e coloca <b>5 em cada caixinha</b>. Quantos ovos sobram fora das caixas?
        Clique em cada retângulo e escreva o que falta: o sinal que dá o <b>resto</b> da divisão e a palavra que pula de linha.
        A tela deve mostrar <b>Sobram 2 ovos</b>.`,
      dica: `O resto da divisão é o sinal de porcentagem. Para pular de linha, use <code>endl</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    cout << "Sobram " << 17 ____ 5 << " ovos" << ____;
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Sobram " << 17 % 5 << " ovos" << endl;
    return 0;
}`,
      padroes: [
        [/17\s*%\s*5/, "Use o resto da divisão: 17 % 5."],
        [/<<\s*endl\s*;/, "Termine o trenzinho com << endl;."]
      ],
      saidaEsperada: "Sobram 2 ovos"
    },
    {
      tipo: "criar",
      titulo: "Pizza para três amigos",
      enunciado: `Uma pizza tem <b>8 fatias</b> e vai ser dividida entre <b>3 amigos</b>. Escreva o programa completo que mostre,
        fazendo as contas com <code>/</code> e <code>%</code>:
        <pre>Cada um: 2
Sobram: 2</pre>`,
      dica: `<code>8 / 3</code> (entre inteiros) dá quantas fatias cada um ganha; <code>8 % 3</code> dá quantas sobram.`,
      lang: "cpp",
      inicial: c`// Escreva o programa completo.
// Linha 1: quantas fatias cada amigo ganha (divisão entre inteiros)
// Linha 2: quantas fatias sobram (resto da divisão)
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Cada um: " << 8 / 3 << endl;
    cout << "Sobram: " << 8 % 3 << endl;
    return 0;
}`,
      padroes: [
        [/int\s+main\s*\(\s*\)/, "Crie a porta de entrada: int main()."],
        [/8\s*\/\s*3/, "Calcule as fatias de cada um com 8 / 3."],
        [/8\s*%\s*3/, "Calcule as fatias que sobram com 8 % 3."],
        [/"Cada um: "[\s\S]*"Sobram: "/, "Mostre os textos \"Cada um: \" e \"Sobram: \", nessa ordem."]
      ],
      saidaEsperada: "Cada um: 2\nSobram: 2"
    },
    {
      tipo: "criar",
      titulo: "Cupom da mercearia",
      enunciado: `Monte o cupom de uma compra: <b>3 pães de R$ 2</b> e <b>1 leite de R$ 5</b>. Escreva o programa completo que mostre,
        calculando os valores com contas (não escreva os resultados prontos):
        <pre>Pães: R$ 6
Leite: R$ 5
Total: R$ 11</pre>`,
      dica: `Pães: <code>3 * 2</code>. Total: <code>3 * 2 + 5</code> (a multiplicação é feita antes da soma). Termine cada linha com <code>endl</code>.`,
      lang: "cpp",
      inicial: c`// Escreva o programa completo do cupom.
// Use contas para o valor dos pães e para o total.
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    cout << "Pães: R$ " << 3 * 2 << endl;
    cout << "Leite: R$ " << 5 << endl;
    cout << "Total: R$ " << 3 * 2 + 5 << endl;
    return 0;
}`,
      padroes: [
        [/int\s+main\s*\(\s*\)/, "Crie a porta de entrada: int main()."],
        [/"Pães: R\$ "\s*<<\s*\(?\s*3\s*\*\s*2/, "Calcule os pães com 3 * 2 logo depois do texto \"Pães: R$ \"."],
        [/"Total: R\$ "\s*<<\s*\(?\s*(3\s*\*\s*2\s*\)?\s*\+\s*5|5\s*\+\s*\(?\s*3\s*\*\s*2)/, "Calcule o total com 3 * 2 + 5 logo depois do texto \"Total: R$ \"."],
        [/(endl[\s\S]*){3}/, "Use endl no fim de cada uma das três linhas."]
      ],
      saidaEsperada: "Pães: R$ 6\nLeite: R$ 5\nTotal: R$ 11"
    }
  ],
  // ───────────────────────── p3: Variáveis e tipos (Iniciante)
  p3: [
    {
      tipo: "completar",
      titulo: "Ficha do cliente",
      enunciado: `A loja guarda os dados de um cliente em variáveis. Clique em cada retângulo e escreva o <b>tipo</b> certo:
        <ul>
          <li><code>nome</code> é um texto;</li>
          <li><code>idade</code> é um número inteiro;</li>
          <li><code>saldo</code> é um número com casas decimais.</li>
        </ul>`,
      dica: `Os tipos são <code>string</code>, <code>int</code> e <code>double</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    ____ nome = "Carla";
    ____ idade = 29;
    ____ saldo = 150.75;
    cout << nome << ", " << idade << " anos, saldo R$ " << saldo << endl;
    return 0;
}`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    string nome = "Carla";
    int idade = 29;
    double saldo = 150.75;
    cout << nome << ", " << idade << " anos, saldo R$ " << saldo << endl;
    return 0;
}`,
      padroes: [
        [/string\s+nome\s*=/, "nome é um texto: use o tipo string."],
        [/int\s+idade\s*=/, "idade é um número inteiro: use int."],
        [/double\s+saldo\s*=/, "saldo tem casas decimais: use double."]
      ],
      saidaEsperada: "Carla, 29 anos, saldo R$ 150.75"
    },
    {
      tipo: "completar",
      titulo: "Cliente VIP",
      enunciado: `O programa mostra se o cliente é VIP. Clique em cada retângulo e escreva o que falta:
        a caixa de ferramentas para usar textos e a palavra que faz o <code>bool</code> aparecer como <b>true</b> (e não 1).
        A tela deve mostrar:
        <pre>Cliente: Bruno
VIP: true</pre>`,
      dica: `Para textos: <code>#include &lt;string&gt;</code>. Para ver true/false: <code>boolalpha</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
#include <____>
using namespace std;

int main() {
    string cliente = "Bruno";
    bool vip = true;
    cout << "Cliente: " << cliente << endl;
    cout << ____ << "VIP: " << vip << endl;
    return 0;
}`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    string cliente = "Bruno";
    bool vip = true;
    cout << "Cliente: " << cliente << endl;
    cout << boolalpha << "VIP: " << vip << endl;
    return 0;
}`,
      padroes: [
        [/#include\s*<string>/, "Inclua a caixa de textos: #include <string>."],
        [/boolalpha/, "Use boolalpha para o bool aparecer como true."]
      ],
      saidaEsperada: "Cliente: Bruno\nVIP: true"
    },
    {
      tipo: "completar",
      titulo: "Baixa no estoque",
      enunciado: `O estoque tinha <b>10 bolos</b> e foram vendidos <b>3</b>. Clique em cada retângulo e escreva o que falta para
        <b>atualizar</b> a variável <code>estoque</code> (sem criar outra) e mostrar <b>Estoque: 7</b>.`,
      dica: `Para mudar o valor, não repita o tipo: <code>estoque = estoque ... 3;</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int estoque = 10;
    estoque = ____ - 3;
    cout << "Estoque: " << ____ << endl;
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int estoque = 10;
    estoque = estoque - 3;
    cout << "Estoque: " << estoque << endl;
    return 0;
}`,
      padroes: [
        [/\n\s*estoque\s*=\s*estoque\s*-\s*3\s*;/, "Atualize com estoque = estoque - 3; (sem repetir o tipo int)."],
        [/"Estoque: "\s*<<\s*estoque/, "Mostre a variável estoque (sem aspas) depois do texto."]
      ],
      saidaEsperada: "Estoque: 7"
    },
    {
      tipo: "criar",
      titulo: "Etiqueta do bolo",
      enunciado: `Crie três variáveis: <code>produto</code> (texto <b>Bolo</b>), <code>quantidade</code> (inteiro <b>2</b>) e
        <code>preco</code> (decimal <b>7.5</b>). Depois mostre, usando as variáveis e a conta <code>quantidade * preco</code>:
        <pre>Bolo x2 = R$ 15</pre>`,
      dica: `Não esqueça o <code>#include &lt;string&gt;</code>. O trenzinho fica: <code>produto &lt;&lt; " x" &lt;&lt; quantidade &lt;&lt; " = R$ " &lt;&lt; ...</code>.`,
      lang: "cpp",
      inicial: c`// Escreva o programa completo.
// Crie as variáveis produto, quantidade e preco
// e mostre a etiqueta com o total calculado.
`,
      solucao: c`#include <iostream>
#include <string>
using namespace std;

int main() {
    string produto = "Bolo";
    int quantidade = 2;
    double preco = 7.5;
    cout << produto << " x" << quantidade << " = R$ " << quantidade * preco << endl;
    return 0;
}`,
      padroes: [
        [/string\s+produto\s*=\s*"Bolo"/, "Crie string produto = \"Bolo\";."],
        [/int\s+quantidade\s*=\s*2\s*;/, "Crie int quantidade = 2;."],
        [/double\s+preco\s*=\s*7\.5\s*;/, "Crie double preco = 7.5;."],
        [/quantidade\s*\*\s*preco|preco\s*\*\s*quantidade/, "Calcule o total com quantidade * preco."]
      ],
      saidaEsperada: "Bolo x2 = R$ 15"
    },
    {
      tipo: "criar",
      titulo: "Loja aberta e contador de clientes",
      enunciado: `Crie uma variável <code>bool aberto</code> valendo <code>true</code> e uma <code>int clientes</code> valendo <code>0</code>.
        Depois, <b>some 1</b> em <code>clientes</code> (atualizando a mesma variável) e mostre, com <code>boolalpha</code>:
        <pre>Loja aberta: true
Clientes: 1</pre>`,
      dica: `Para somar 1: <code>clientes = clientes + 1;</code>. Coloque <code>boolalpha</code> no <code>cout</code> antes do <code>aberto</code>.`,
      lang: "cpp",
      inicial: c`// Escreva o programa completo.
// 1) variável bool aberto e variável int clientes
// 2) some 1 aos clientes
// 3) mostre as duas linhas
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    bool aberto = true;
    int clientes = 0;
    clientes = clientes + 1;
    cout << boolalpha << "Loja aberta: " << aberto << endl;
    cout << "Clientes: " << clientes << endl;
    return 0;
}`,
      padroes: [
        [/bool\s+aberto\s*=\s*true\s*;/, "Crie bool aberto = true;."],
        [/int\s+clientes\s*=\s*0\s*;/, "Crie int clientes = 0;."],
        [/clientes\s*=\s*clientes\s*\+\s*1|clientes\s*\+=\s*1|clientes\s*\+\+|\+\+\s*clientes/, "Some 1 com clientes = clientes + 1;."],
        [/boolalpha/, "Use boolalpha para aparecer true em vez de 1."]
      ],
      saidaEsperada: "Loja aberta: true\nClientes: 1"
    }
  ],
  // ───────────────────────── p4: Decidindo com if (Iniciante)
  p4: [
    {
      tipo: "completar",
      titulo: "Pode votar?",
      enunciado: `Quem tem <b>18 anos ou mais</b> pode votar. Clique no retângulo e escreva o sinal de comparação
        “maior ou igual”. Com <code>idade = 20</code>, a tela deve mostrar <b>Pode votar</b>.`,
      dica: `“Maior ou igual” são dois sinais juntos: o de maior e o de igual.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int idade = 20;
    if (idade ____ 18) {
        cout << "Pode votar" << endl;
    }
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int idade = 20;
    if (idade >= 18) {
        cout << "Pode votar" << endl;
    }
    return 0;
}`,
      padroes: [
        [/if\s*\(\s*idade\s*>=\s*18\s*\)/, "A condição deve ser idade >= 18 (maior ou igual)."],
        [/cout\s*<<\s*"Pode votar"/, "Mantenha cout << \"Pode votar\"."]
      ],
      saidaEsperada: "Pode votar"
    },
    {
      tipo: "completar",
      titulo: "Senha do cofre",
      enunciado: `O cofre abre só com a senha <b>1234</b>. Clique em cada retângulo e escreva o que falta:
        o sinal que <b>compara</b> se é igual e a palavra do caminho “senão”.
        Com <code>senha = 1234</code>, a tela deve mostrar <b>Acesso liberado</b>.`,
      dica: `Comparar é com dois sinais de igual. O “senão” é <code>else</code>.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int senha = 1234;
    if (senha ____ 1234) {
        cout << "Acesso liberado" << endl;
    } ____ {
        cout << "Senha errada" << endl;
    }
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int senha = 1234;
    if (senha == 1234) {
        cout << "Acesso liberado" << endl;
    } else {
        cout << "Senha errada" << endl;
    }
    return 0;
}`,
      padroes: [
        [/if\s*\(\s*senha\s*==\s*1234\s*\)/, "Compare com dois sinais de igual: senha == 1234."],
        [/\}\s*else\s*\{/, "Use else para o caminho da senha errada."]
      ],
      saidaEsperada: "Acesso liberado"
    },
    {
      tipo: "completar",
      titulo: "Conceito da prova",
      enunciado: `A escola dá o conceito pela nota: 9 ou mais é <b>Ótimo</b>, 7 ou mais é <b>Bom</b> e abaixo disso é <b>Estude mais</b>.
        Clique no retângulo e escreva as palavras que criam o caminho do meio (“senão, se”).
        Com <code>nota = 8</code>, a tela deve mostrar <b>Bom</b>.`,
      dica: `São duas palavras: a do “senão” seguida da do “se”.`,
      lang: "cpp",
      inicial: c`#include <iostream>
using namespace std;

int main() {
    int nota = 8;
    if (nota >= 9) {
        cout << "Ótimo" << endl;
    } ____ (nota >= 7) {
        cout << "Bom" << endl;
    } else {
        cout << "Estude mais" << endl;
    }
    return 0;
}`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int nota = 8;
    if (nota >= 9) {
        cout << "Ótimo" << endl;
    } else if (nota >= 7) {
        cout << "Bom" << endl;
    } else {
        cout << "Estude mais" << endl;
    }
    return 0;
}`,
      padroes: [
        [/else\s+if\s*\(\s*nota\s*>=\s*7\s*\)/, "Crie o caminho do meio com else if (nota >= 7)."],
        [/\}\s*else\s*\{/, "Mantenha o else final."]
      ],
      saidaEsperada: "Bom"
    },
    {
      tipo: "criar",
      titulo: "Par ou ímpar",
      enunciado: `Crie <code>int numero = 7;</code> e use <code>if/else</code> com o resto da divisão por 2 para mostrar
        <b>Par</b> (se o resto for 0) ou <b>Ímpar</b> (caso contrário). Com 7, a tela deve mostrar <b>Ímpar</b>.`,
      dica: `A pergunta é <code>numero % 2 == 0</code>. Se for verdade, é par; senão, ímpar.`,
      lang: "cpp",
      inicial: c`// Escreva o programa completo.
// Crie a variável numero e decida se é par ou ímpar.
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    int numero = 7;
    if (numero % 2 == 0) {
        cout << "Par" << endl;
    } else {
        cout << "Ímpar" << endl;
    }
    return 0;
}`,
      padroes: [
        [/int\s+numero\s*=\s*7\s*;/, "Crie int numero = 7;."],
        [/if\s*\(\s*numero\s*%\s*2\s*[!=]=\s*[01]\s*\)/, "Use o resto: if (numero % 2 == 0)."],
        [/\belse\b/, "Use else para o outro caminho."],
        [/"Par"[\s\S]*"Ímpar"|"Ímpar"[\s\S]*"Par"/, "Mostre \"Par\" ou \"Ímpar\"."]
      ],
      saidaEsperada: "Ímpar"
    },
    {
      tipo: "criar",
      titulo: "Calculando o frete",
      enunciado: `A loja cobra o frete pelo valor da compra: <b>200 ou mais</b> → <b>Frete grátis</b>; <b>100 ou mais</b> → <b>Frete R$ 10</b>;
        abaixo disso → <b>Frete R$ 20</b>. Crie <code>double compra = 120.0;</code> e use <code>if</code>, <code>else if</code> e <code>else</code>.
        Com 120, a tela deve mostrar <b>Frete R$ 10</b>.`,
      dica: `Teste do maior para o menor: primeiro <code>compra &gt;= 200</code>, depois <code>compra &gt;= 100</code>, e o <code>else</code> pega o resto.`,
      lang: "cpp",
      inicial: c`// Escreva o programa completo.
// Crie a variável compra e escolha a mensagem de frete certa.
`,
      solucao: c`#include <iostream>
using namespace std;

int main() {
    double compra = 120.0;
    if (compra >= 200) {
        cout << "Frete grátis" << endl;
    } else if (compra >= 100) {
        cout << "Frete R$ 10" << endl;
    } else {
        cout << "Frete R$ 20" << endl;
    }
    return 0;
}`,
      padroes: [
        [/double\s+compra\s*=\s*120(\.0*)?\s*;/, "Crie double compra = 120.0;."],
        [/if\s*\(\s*compra\s*>=?\s*200(\.0*)?\s*\)/, "Primeiro teste: if (compra >= 200)."],
        [/else\s+if\s*\(\s*compra\s*>=?\s*100(\.0*)?\s*\)/, "Segundo teste: else if (compra >= 100)."],
        [/\}\s*else\s*\{/, "Termine com else para as compras menores."]
      ],
      saidaEsperada: "Frete R$ 10"
    }
  ],
};
