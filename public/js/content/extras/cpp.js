import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>C++ é uma linguagem <b>compilada</b>: você escreve o código-fonte em um arquivo <code>.cpp</code> e o compilador (<code>g++</code>, <code>clang++</code> ou o MSVC do Visual Studio) o transforma em um <b>executável</b> com código de máquina. O comando <code>g++ -std=c++17 -Wall main.cpp -o main</code> diz: use o padrão C++17, mostre todos os avisos, compile <code>main.cpp</code> e gere o programa <code>main</code>. Todo programa começa pela função <code>int main()</code>, e o <code>return 0;</code> avisa ao sistema que deu tudo certo.</p>
<p>As linhas <code>#include</code> trazem partes da <b>biblioteca padrão</b>: <code>&lt;iostream&gt;</code> para <code>cout</code> e <code>cin</code>, <code>&lt;string&gt;</code> para textos, <code>&lt;iomanip&gt;</code> para formatar números. Tudo da biblioteca padrão mora no <b>namespace</b> <code>std</code>, então o nome completo é <code>std::cout</code>. O <code>using namespace std;</code> poupa digitação enquanto você estuda, mas em projetos grandes e em arquivos <code>.h</code> evita-se, para não haver conflito de nomes; lá se escreve <code>std::</code> sempre.</p>
<p>C++ é <b>fortemente tipado</b>: cada variável tem um tipo fixo, como <code>int</code> (inteiro), <code>double</code> (decimal), <code>bool</code> (verdadeiro/falso), <code>char</code> (um caractere, entre aspas simples) e <code>string</code> (texto, entre aspas duplas). <code>auto</code> deixa o compilador deduzir o tipo e <code>const</code> cria um valor que não pode mudar. <b>Atenção:</b> uma variável local sem valor inicial (<code>int x;</code>) contém lixo de memória; inicialize sempre.</p>
<p>O <code>cout</code> imprime encadeando valores com o operador <code>&lt;&lt;</code>; <code>'\\n'</code> pula linha (e <code>endl</code> pula linha e esvazia o buffer, sendo um pouco mais lento). O <code>cin &gt;&gt; variavel</code> lê do teclado até o próximo espaço; para ler uma linha inteira com espaços, use <code>getline(cin, texto)</code>. <code>fixed &lt;&lt; setprecision(2)</code> mostra os decimais sempre com duas casas.</p>`,
      partes: [
        [c`#include <iostream>`, "Inclui a parte da biblioteca padrão com `cout` (saída) e `cin` (entrada)."],
        [c`using namespace std;`, "Permite escrever `cout` em vez de `std::cout`. Bom para estudar; evite em projetos grandes e em headers."],
        [c`int main() {`, "Função principal: é aqui que o programa começa a rodar."],
        [c`string nome = "Rafael"; int idade = 35; double altura = 1.78;`, "Variáveis com tipo fixo: texto, inteiro e decimal."],
        [c`char inicial = 'R';`, "Um único caractere, entre aspas simples."],
        [c`const double PRECO_CAFE = 4.50;`, "Constante: tentar mudar o valor depois dá erro de compilação."],
        [c`auto cidade = string("Belo Horizonte");`, "`auto` deduz o tipo pelo valor; aqui, `string`."],
        [c`cout << "Olá, " << nome << "!" << endl;`, "Encadeia textos e variáveis com `<<` e pula linha."],
        [c`cout << boolalpha << "Ativo: " << ativo;`, "`boolalpha` faz o `bool` aparecer como `true`/`false` em vez de 1/0."],
        [c`cout << fixed << setprecision(2) << altura;`, "Mostra o número sempre com 2 casas decimais (vem de `<iomanip>`)."],
        [c`cin >> quantidade;`, "Lê um valor digitado e guarda na variável."],
        [c`return 0;`, "Termina o `main` informando sucesso ao sistema operacional."]
      ]
    },
    b2: {
      detalhes: `<p>As decisões usam <code>if (condição) { ... } else if (...) { ... } else { ... }</code>. As condições usam os operadores de comparação <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> e os lógicos <code>&amp;&amp;</code> (e), <code>||</code> (ou) e <code>!</code> (não). Cuidado com o erro clássico <code>if (x = 5)</code>: um só <code>=</code> <b>atribui</b> em vez de comparar, e a condição fica sempre verdadeira. Com <code>-Wall</code>, o compilador avisa.</p>
<p>O <code>switch</code> compara um valor inteiro, <code>char</code> ou <code>enum</code> com vários <code>case</code>. Cada caso precisa terminar com <code>break</code>; sem ele, a execução “cai” no caso seguinte (<i>fall-through</i>). O <code>default</code> trata qualquer outro valor. Para comparar <code>string</code>, use <code>if/else</code>, pois o <code>switch</code> não aceita textos.</p>
<p>Os laços são o <code>for</code> clássico (<code>for (int i = 0; i &lt; n; i++)</code>: início, condição e passo), o <b>for de intervalo</b> (<code>for (int nota : notas)</code>, que percorre cada elemento), o <code>while</code> (testa antes de cada volta) e o <code>do { } while (...)</code> (roda pelo menos uma vez). <code>break</code> sai do laço e <code>continue</code> pula para a próxima volta.</p>
<p>O array <code>int notas[] = {8, 5, 10};</code> é a forma mais simples de guardar vários valores, herdada da linguagem C: tem tamanho fixo e não confere índices. Acessar <code>notas[10]</code> em um array de 3 posições não dá erro na hora: é <b>comportamento indefinido</b> e pode corromper a memória. Por isso, no nível intermediário você vai trocar arrays por <code>std::vector</code>.</p>`,
      partes: [
        [c`int notas[] = {8, 5, 10, 3, 7};`, "Array com 5 inteiros; o tamanho é deduzido pelos valores."],
        [c`for (int nota : notas) {`, "For de intervalo: `nota` recebe cada elemento, um de cada vez."],
        [c`if (nota >= 7) { aprovados++; }`, "Se a nota for 7 ou mais, soma 1 ao contador."],
        [c`} else if (nota >= 5) {`, "Só é testado se o `if` anterior for falso."],
        [c`} else {`, "Executa quando nenhuma condição anterior foi verdadeira."],
        [c`for (int i = 1; i <= 3; i++) {`, "For clássico: começa em 1, repete enquanto `i <= 3` e soma 1 a cada volta."],
        [c`switch (opcao) { case 1: …; break;`, "Compara `opcao` com cada caso; `break` impede de cair no próximo."],
        [c`default: cout << "Opção inválida\n";`, "Executa quando nenhum `case` combina."],
        [c`while (saldo >= 30) { saldo -= 30; }`, "Repete enquanto houver saldo suficiente; `-=` subtrai e guarda."]
      ]
    },
    b3: {
      detalhes: `<p>Uma <b>função</b> tem tipo de retorno, nome, parâmetros e corpo: <code>double aplicarDesconto(double preco, double porcentagem)</code>. Quando não devolve nada, o tipo é <code>void</code>. O compilador lê o arquivo de cima para baixo, então a função precisa ser <b>declarada</b> antes de ser usada. Você pode escrever a função inteira antes do <code>main</code> ou só o <b>protótipo</b> (a assinatura terminada em <code>;</code>) e definir o corpo depois.</p>
<p>Por padrão os argumentos são passados <b>por valor</b>: a função recebe uma cópia e alterações não afetam a variável original. Com <code>&amp;</code> no tipo (<code>int&amp; x</code>), o parâmetro vira uma <b>referência</b>, um apelido para a variável original, e a função pode alterá-la. Com <code>const string&amp;</code>, você ganha o melhor dos dois: não copia o texto e garante que ele não será modificado. Essa é a forma padrão de passar objetos grandes.</p>
<p><b>Parâmetros com valor padrão</b> (<code>double porcentagem = 10.0</code>) podem ser omitidos na chamada; o valor padrão é escrito só na declaração. A <b>sobrecarga</b> permite várias funções com o mesmo nome e parâmetros diferentes: o compilador escolhe a versão pelo tipo dos argumentos, como em <code>somar(2, 3)</code> e <code>somar(1.5, 2.25)</code>.</p>`,
      partes: [
        [c`double aplicarDesconto(double preco, double porcentagem = 10.0);`, "Protótipo: declara a função antes do `main`, com valor padrão para a porcentagem."],
        [c`void dobrarCopia(int x) { x = x * 2; }`, "Por valor: dobra só a cópia; quem chamou não percebe nada."],
        [c`void dobrarOriginal(int& x) { x = x * 2; }`, "Por referência (`&`): altera a variável de quem chamou."],
        [c`void saudar(const string& nome) {`, "Referência constante: não copia o texto e não permite alterá-lo."],
        [c`int somar(int a, int b)  /  double somar(double a, double b)`, "Sobrecarga: o compilador escolhe pela lista de tipos dos argumentos."],
        [c`aplicarDesconto(200.0)`, "Sem o segundo argumento, usa o padrão de 10%: resultado 180."],
        [c`dobrarOriginal(n);`, "Depois desta chamada, `n` passa de 5 para 10."],
        [c`double aplicarDesconto(double preco, double porcentagem) { … }`, "Definição com o corpo. O valor padrão não é repetido aqui."]
      ]
    },
    i1: {
      detalhes: `<p><code>std::vector&lt;T&gt;</code> é um <b>array dinâmico</b>: cresce conforme você adiciona elementos com <code>push_back</code> e libera a memória sozinho. O <code>T</code> entre <code>&lt; &gt;</code> é o tipo dos elementos (<code>vector&lt;int&gt;</code>, <code>vector&lt;string&gt;</code>). <code>size()</code> informa a quantidade, <code>front()</code> e <code>back()</code> dão o primeiro e o último, e <code>empty()</code> diz se está vazio. Ao contrário do array do C, ele sabe o próprio tamanho e pode ser passado e devolvido por funções com facilidade.</p>
<p>O acesso por índice com <code>v[i]</code> é rápido, mas <b>não confere</b> se o índice existe: fora do intervalo é comportamento indefinido. <code>v.at(i)</code> confere e lança a exceção <code>out_of_range</code>. Algoritmos como <code>sort(v.begin(), v.end())</code>, do cabeçalho <code>&lt;algorithm&gt;</code>, trabalham com <b>iteradores</b>: <code>begin()</code> aponta para o primeiro elemento e <code>end()</code> para a posição logo depois do último.</p>
<p><code>std::string</code> guarda texto e cuida da memória sozinho. Junte textos com <code>+</code>, procure com <code>find</code> (que devolve a posição ou <code>string::npos</code> se não achar), recorte com <code>substr(inicio, tamanho)</code> e percorra letra por letra com um for de intervalo; usar <code>char&amp;</code> no laço permite alterar cada letra. Para converter, use <code>stoi</code>/<code>stod</code> (texto para número) e <code>to_string</code> (número para texto).</p>
<p>Para quebrar uma linha em partes, crie um <code>stringstream</code> (de <code>&lt;sstream&gt;</code>) e use <code>getline(ss, parte, ';')</code>, que lê até o separador. É a forma mais simples de ler arquivos CSV e logs sem bibliotecas extras.</p>`,
      partes: [
        [c`vector<int> pontos = {40, 15, 90};`, "Cria um vector de inteiros já com três valores."],
        [c`pontos.push_back(65);`, "Adiciona 65 no final; o vector cresce sozinho."],
        [c`sort(pontos.begin(), pontos.end());`, "Ordena do menor para o maior, do primeiro ao último elemento."],
        [c`pontos.size()  /  pontos.back()  /  pontos[0]`, "Quantidade de itens, último item e item na posição 0."],
        [c`size_t arroba = email.find('@');`, "Posição do `@` no texto (`size_t` é um inteiro sem sinal usado para tamanhos)."],
        [c`string usuario = email.substr(0, arroba);`, "Recorta do início até antes do `@`."],
        [c`for (char& ch : dominio) ch = tolower(ch);`, "Percorre cada letra por referência e a converte para minúscula."],
        [c`stringstream ss(linha); getline(ss, nome, ';');`, "Lê da linha até o primeiro `;`, guardando em `nome`."],
        [c`int qtd = stoi(qtdTexto); double preco = stod(precoTexto);`, "Converte texto em `int` e em `double`."],
        [c`string resumo = "Itens: " + to_string(qtd);`, "Converte o número em texto para poder concatenar."]
      ]
    },
    i2: {
      detalhes: `<p>Uma <b>classe</b> junta dados (atributos) e comportamentos (métodos). Os membros em <code>private</code> só podem ser acessados de dentro da classe; os de <code>public</code>, por qualquer código. Isso é o <b>encapsulamento</b>: o saldo só muda por <code>depositar</code> e <code>sacar</code>, que validam as regras. Tentar escrever <code>conta.saldo = 1000000</code> nem compila. Repare que a definição da classe termina com <code>};</code>, com ponto e vírgula.</p>
<p>O <b>construtor</b> tem o nome da classe e não tem tipo de retorno. A forma recomendada de inicializar atributos é a <b>lista de inicialização</b>: <code>: titular(nome), saldo(saldoInicial)</code>, escrita antes das chaves. Ela inicializa direto, em vez de criar e depois atribuir, e é obrigatória para atributos <code>const</code> e referências. O objeto é criado sem <code>new</code>: <code>ContaBancaria conta("Ana", 100.0);</code> vive na pilha e é destruído sozinho no fim do bloco.</p>
<p>Um método marcado com <code>const</code> no fim (<code>double getSaldo() const</code>) promete não alterar o objeto. Só métodos <code>const</code> podem ser chamados em objetos constantes ou recebidos como <code>const ContaBancaria&amp;</code>, então marque todo método de leitura assim. <code>struct</code> é igual a <code>class</code>, só que com tudo <code>public</code> por padrão; use-a para agrupar dados simples, como <code>Ponto p{3, 4};</code>.</p>`,
      partes: [
        [c`class ContaBancaria {`, "Começa a definição da classe."],
        [c`private: string titular; double saldo;`, "Dados escondidos: só os métodos da classe acessam."],
        [c`ContaBancaria(const string& nome, double saldoInicial = 0.0)`, "Construtor: recebe o titular e um saldo inicial opcional."],
        [c`: titular(nome), saldo(saldoInicial) {}`, "Lista de inicialização: preenche os atributos antes do corpo."],
        [c`if (valor <= 0) return false;`, "A classe protege a regra: não aceita depósito zero ou negativo."],
        [c`double getSaldo() const { return saldo; }`, "Método de leitura `const`: garante que não altera o objeto."],
        [c`};`, "A definição de classe (e de struct) termina com ponto e vírgula."],
        [c`struct Ponto { int x; int y; };`, "Struct: membros públicos por padrão, ideal para dados simples."],
        [c`ContaBancaria conta("Ana", 100.0);`, "Cria o objeto chamando o construtor, sem `new`."],
        [c`Ponto p{3, 4};`, "Inicialização com chaves: x = 3 e y = 4."]
      ]
    },
    i3: {
      detalhes: `<p>A memória do programa tem duas regiões principais. A <b>pilha</b> (stack) guarda as variáveis locais, que somem sozinhas no fim do bloco. O <b>heap</b> guarda o que é criado dinamicamente e vive até ser liberado. Um <b>ponteiro</b> (<code>int* ptr</code>) é uma variável que guarda um <b>endereço</b> de memória: <code>&amp;idade</code> pega o endereço de <code>idade</code> e <code>*ptr</code> acessa o valor que está lá. Um ponteiro que não aponta para nada deve valer <code>nullptr</code>, e nunca se usa <code>*</code> nele.</p>
<p>Com <code>new</code> você cria um objeto no heap e recebe um ponteiro; com <code>delete</code> você o libera. Esquecer o <code>delete</code> causa <b>vazamento de memória</b>; usar o ponteiro depois do <code>delete</code> (ponteiro pendurado) ou liberar duas vezes causa falhas graves e até brechas de segurança. Por isso o C++ moderno quase nunca usa <code>new</code> e <code>delete</code> diretamente.</p>
<p>A alternativa é o <b>RAII</b>: um objeto que adquire o recurso no construtor e o libera no <b>destrutor</b> (<code>~Arquivo()</code>), chamado automaticamente quando o objeto sai de escopo. Os <b>smart pointers</b> de <code>&lt;memory&gt;</code> aplicam isso à memória: <code>unique_ptr</code> (criado com <code>make_unique</code>) tem um único dono e libera sozinho; <code>shared_ptr</code> (com <code>make_shared</code>) pode ser copiado e mantém um contador, liberando quando o último dono desaparece. Com ponteiros e smart pointers, use <code>-&gt;</code> para acessar membros: <code>a-&gt;nome</code> equivale a <code>(*a).nome</code>.</p>
<p>Referência (<code>int&amp;</code>) e ponteiro (<code>int*</code>) parecem parecidos, mas a referência é um apelido que precisa ser ligado a algo na criação e não pode ser trocado nem ser nulo. Prefira referências para parâmetros e ponteiros apenas quando “nenhum objeto” for uma possibilidade válida.</p>`,
      partes: [
        [c`int* ptr = &idade;`, "`ptr` guarda o endereço de `idade`."],
        [c`cout << *ptr;`, "Desreferência: lê o valor guardado no endereço (30)."],
        [c`*ptr = 31;`, "Altera `idade` através do ponteiro."],
        [c`int* vazio = nullptr;`, "Ponteiro nulo: deixa claro que não aponta para nada."],
        [c`int* numero = new int(42); … delete numero;`, "Jeito antigo: cria no heap e precisa liberar à mão."],
        [c`~Arquivo() { cout << "Fechando " << nome << '\n'; }`, "Destrutor: roda sozinho quando o objeto deixa de existir."],
        [c`unique_ptr<Arquivo> a = make_unique<Arquivo>("relatorio.txt");`, "Cria no heap com um único dono, sem precisar de `delete`."],
        [c`a->nome`, "Acessa um membro através do ponteiro."],
        [c`shared_ptr<Arquivo> s2 = s1;`, "Copia o shared_ptr: agora há dois donos do mesmo objeto."],
        [c`s1.use_count()`, "Quantos `shared_ptr` apontam para o objeto neste momento."]
      ]
    },
    a1: {
      detalhes: `<p>A <b>STL</b> (Standard Template Library) é a parte da biblioteca padrão com <b>containers</b> (estruturas de dados), <b>iteradores</b> (o jeito de percorrê-los) e <b>algoritmos</b> (funções que trabalham com qualquer container). Além de <code>vector</code>, os mais usados são <code>map</code>, <code>set</code>, <code>unordered_map</code>, <code>unordered_set</code>, <code>deque</code>, <code>stack</code>, <code>queue</code> e <code>priority_queue</code>.</p>
<p><code>map&lt;chave, valor&gt;</code> guarda pares com chaves únicas e <b>sempre ordenadas</b>. <code>contagem[p]++</code> é um atalho poderoso: se a chave não existe, o <code>[]</code> a cria com valor zero (0 para números) e depois soma. Para apenas consultar sem criar, use <code>count(chave)</code> ou <code>find(chave)</code>. Com C++17, <code>for (const auto&amp; [chave, qtd] : contagem)</code> separa cada par em duas variáveis (<i>structured bindings</i>). <code>set</code> guarda valores únicos e ordenados.</p>
<p>Os algoritmos de <code>&lt;algorithm&gt;</code> e <code>&lt;numeric&gt;</code> recebem um intervalo de iteradores (<code>begin()</code>, <code>end()</code>): <code>sort</code>, <code>find</code>, <code>count_if</code>, <code>accumulate</code>, <code>max_element</code>, <code>reverse</code>, entre outros. Muitos aceitam uma <b>lambda</b>, uma função anônima escrita na hora: <code>[](int a, int b) { return a &gt; b; }</code>. Os colchetes são a captura, por onde a lambda pode usar variáveis de fora (<code>[&amp;]</code> captura tudo por referência).</p>
<p><code>find</code> devolve um iterador; se não encontrar, devolve <code>end()</code>, por isso sempre compare com <code>end()</code> antes de usar o resultado. Quando a ordem não importa, <code>unordered_map</code> e <code>unordered_set</code> usam tabela hash e costumam ser mais rápidos, mas a ordem de percurso é imprevisível.</p>`,
      partes: [
        [c`map<string, int> contagem;`, "Mapa de texto para inteiro, mantido em ordem alfabética das chaves."],
        [c`for (const string& p : palavras) contagem[p]++;`, "Conta cada palavra; `[]` cria a chave com 0 na primeira vez."],
        [c`for (const auto& [chave, qtd] : contagem)`, "C++17: separa cada par do mapa em `chave` e `qtd`."],
        [c`contagem.count("dinheiro") == 0`, "Consulta se a chave existe sem criá-la."],
        [c`set<string> unicos(palavras.begin(), palavras.end());`, "Monta um set a partir do vector, descartando repetidos."],
        [c`sort(valores.begin(), valores.end(), [](int a, int b) { return a > b; });`, "Ordena com uma lambda que coloca o maior primeiro."],
        [c`accumulate(valores.begin(), valores.end(), 0)`, "Soma todos os valores, começando de 0."],
        [c`count_if(…, [](int v) { return v >= 100; })`, "Conta quantos elementos passam no teste da lambda."],
        [c`auto it = find(valores.begin(), valores.end(), 80);`, "Procura 80 e devolve um iterador para ele."],
        [c`if (it != valores.end()) … (it - valores.begin())`, "Confere se achou e calcula a posição pela distância até o início."]
      ]
    },
    a2: {
      detalhes: `<p><b>Herança</b> (<code>class Retangulo : public Forma</code>) faz a classe derivada receber os membros da base. Para que uma função possa ser redefinida e escolhida em tempo de execução, ela precisa ser <code>virtual</code> na base; na derivada, marque a redefinição com <code>override</code>, assim o compilador avisa se a assinatura estiver errada. Uma função <b>virtual pura</b> (<code>= 0</code>) não tem implementação e torna a classe <b>abstrata</b>: não dá para criar um objeto <code>Forma</code> diretamente.</p>
<p><b>Polimorfismo</b> é usar objetos diferentes por meio da base: um <code>vector&lt;unique_ptr&lt;Forma&gt;&gt;</code> guarda retângulos e círculos, e <code>f-&gt;area()</code> chama a versão correta de cada um. Ele só funciona por <b>ponteiro ou referência</b>: copiar um <code>Retangulo</code> para uma variável do tipo <code>Forma</code> “fatia” o objeto (<i>object slicing</i>) e perde a parte derivada. Toda classe base com funções virtuais precisa de <b>destrutor virtual</b>, para que a destruição pela base libere também a parte derivada.</p>
<p><b>Templates</b> permitem escrever código genérico: <code>template &lt;typename T&gt; T maior(T a, T b)</code> funciona para <code>int</code>, <code>double</code>, <code>string</code> ou qualquer tipo com o operador <code>&gt;</code>. O compilador gera uma versão para cada tipo usado, sem custo em tempo de execução. Classes também podem ser templates, como <code>Caixa&lt;int&gt;</code>; aliás, <code>vector</code> e <code>map</code> são exatamente isso. Como o compilador precisa ver o código completo, templates costumam ficar inteiros nos arquivos <code>.h</code>.</p>
<p>O <code>explicit</code> no construtor impede conversões automáticas inesperadas, como passar um número solto onde se esperava um <code>Circulo</code>. É uma boa prática para construtores de um único parâmetro.</p>`,
      partes: [
        [c`virtual double area() const = 0;`, "Função virtual pura: cada forma é obrigada a implementar."],
        [c`virtual ~Forma() = default;`, "Destrutor virtual: garante a destruição correta pela classe base."],
        [c`class Retangulo : public Forma {`, "Retângulo herda publicamente de Forma."],
        [c`double area() const override { return largura * altura; }`, "Redefine a área; `override` faz o compilador conferir a assinatura."],
        [c`explicit Circulo(double r) : raio(r) {}`, "Construtor `explicit`: evita conversões implícitas de `double` para `Circulo`."],
        [c`vector<unique_ptr<Forma>> formas;`, "Lista de ponteiros para a base, que podem apontar para qualquer forma."],
        [c`cout << f->nome() << ": " << f->area();`, "Polimorfismo: cada objeto responde com sua própria versão."],
        [c`template <typename T> T maior(T a, T b)`, "Função genérica: `T` é substituído pelo tipo usado na chamada."],
        [c`template <typename T> class Caixa { T conteudo; … };`, "Classe genérica que guarda um valor de qualquer tipo."],
        [c`Caixa<int> c1(42); Caixa<string> c2("presente");`, "O compilador gera uma Caixa para `int` e outra para `string`."]
      ]
    },
    a3: {
      detalhes: `<p><b>Exceções</b> separam o caminho normal do tratamento de erros. Uma função detecta o problema e faz <code>throw</code> de um objeto, normalmente das classes de <code>&lt;stdexcept&gt;</code> (<code>runtime_error</code>, <code>invalid_argument</code>, <code>out_of_range</code>) ou de uma classe própria derivada delas. O código que chamou envolve a operação em <code>try { }</code> e trata com <code>catch (const Tipo&amp; e)</code>; <code>e.what()</code> devolve a mensagem. Capture sempre por <b>referência constante</b> e na ordem do mais específico para o mais genérico (<code>const exception&amp;</code> pega todas as da biblioteca padrão).</p>
<p>Arquivos ficam em <code>&lt;fstream&gt;</code>: <code>ofstream</code> escreve (com o mesmo <code>&lt;&lt;</code> do <code>cout</code>) e <code>ifstream</code> lê (com <code>&gt;&gt;</code> ou <code>getline</code>). Teste se abriu com <code>if (!arq)</code>. Graças ao RAII, o arquivo é fechado sozinho quando o objeto sai de escopo, inclusive se uma exceção for lançada no meio, então não é preciso chamar <code>close()</code>.</p>
<p>Projetos reais se dividem em <b>headers</b> (<code>.h</code> ou <code>.hpp</code>), com as declarações de classes e funções, e arquivos de <b>implementação</b> (<code>.cpp</code>), com os corpos. Cada <code>.cpp</code> faz <code>#include "estoque.h"</code> (aspas para arquivos do projeto, <code>&lt; &gt;</code> para a biblioteca) e é compilado separadamente; o <b>linker</b> junta tudo no executável. O header começa com <code>#pragma once</code> para não ser incluído duas vezes, e nele não se usa <code>using namespace std;</code>: escreva <code>std::string</code>. Separado, o exemplo fica assim:</p>
<pre><code>// estoque.h
#pragma once
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;stdexcept&gt;
struct Produto { std::string nome; int quantidade; };
class EstoqueInsuficiente : public std::runtime_error {
public:
    explicit EstoqueInsuficiente(const std::string&amp; msg) : std::runtime_error(msg) {}
};
void retirar(Produto&amp; p, int qtd);
std::vector&lt;Produto&gt; carregar(const std::string&amp; caminho);

// estoque.cpp  →  #include "estoque.h" + os corpos de retirar() e carregar()
// main.cpp     →  #include "estoque.h" + int main()</code></pre>
<p>Para compilar vários arquivos, basta listá-los: <code>g++ -std=c++17 -Wall main.cpp estoque.cpp -o estoque</code>. Em projetos maiores usa-se o <b>CMake</b>: um <code>CMakeLists.txt</code> descreve o projeto (<code>project</code>, <code>set(CMAKE_CXX_STANDARD 17)</code>, <code>add_executable</code>), e os comandos <code>cmake -S . -B build</code> e <code>cmake --build build</code> geram e compilam para qualquer sistema e IDE (Visual Studio, CLion, VS Code).</p>`,
      partes: [
        [c`class EstoqueInsuficiente : public runtime_error {`, "Exceção própria, derivada de `runtime_error`."],
        [c`explicit EstoqueInsuficiente(const string& msg) : runtime_error(msg) {}`, "Repassa a mensagem para a classe base, que a devolve em `what()`."],
        [c`if (qtd <= 0) throw invalid_argument("Quantidade deve ser positiva");`, "Lança um erro padrão para argumento inválido."],
        [c`ifstream arq(caminho); if (!arq) throw runtime_error(…);`, "Abre o arquivo para leitura e lança erro se não conseguir."],
        [c`while (getline(arq, linha)) {`, "Lê o arquivo linha por linha até o fim."],
        [c`ofstream saida("estoque.txt"); saida << "Parafuso;100\n";`, "Cria (ou sobrescreve) o arquivo e escreve nele como no `cout`."],
        [c`try { … retirar(itens[1], 50); … }`, "Bloco protegido: ao lançar, pula direto para o `catch` adequado."],
        [c`catch (const EstoqueInsuficiente& e) { cout << e.what(); }`, "Trata primeiro o erro mais específico."],
        [c`catch (const exception& e) {`, "Depois o genérico: pega qualquer exceção da biblioteca padrão."],
        [c`// #pragma once  /  // #include "estoque.h"`, "Linhas que passam a valer quando o código é separado em arquivos."],
        [c`add_executable(estoque main.cpp estoque.cpp)`, "No CMake: gera o executável `estoque` a partir dos dois `.cpp`."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Por onde começa a execução de um programa C++?", ["Pela primeira linha do arquivo", "Pela função `int main()`", "Pelo primeiro `#include`", "Pela função `start()`"], 1, "O sistema operacional chama `main`; o `return 0;` informa sucesso."),
      m("O que o comando `g++ -std=c++17 -Wall main.cpp -o main` faz?", ["Roda o arquivo sem compilar", "Compila `main.cpp` no padrão C++17, mostrando avisos, e gera o executável `main`", "Apaga o arquivo `main`", "Instala o C++17"], 1, "`-Wall` liga os avisos e `-o` define o nome do executável."),
      l("Complete para imprimir na tela:", c`____ << "Olá, mundo!" << '\n';`, ["cout", "std::cout"], "`cout` é a saída padrão; o `<<` envia os valores para ela."),
      l("Complete para ler um número digitado:", c`int idade;
cin ____ idade;`, ">>", "Com `cin` usamos `>>`, a “seta” apontando para a variável que recebe o valor."),
      vf("`using namespace std;` é aceitável para estudar, mas em projetos grandes costuma-se escrever `std::` para evitar conflitos de nomes.", true, "Em arquivos `.h`, então, ele deve ser evitado sempre."),
      m("Qual o valor de uma variável local declarada como `int x;` sem inicializar?", ["Sempre 0", "Sempre -1", "Indefinido (lixo de memória)", "Dá erro de compilação"], 2, "Inicialize sempre: `int x = 0;`."),
      m("Qual a saída de `int i = 5; int x = i++;` para `x` e `i`?", ["x = 5, i = 6", "x = 6, i = 6", "x = 5, i = 5", "x = 6, i = 5"], 0, "O pós-incremento devolve o valor antigo e depois soma."),
      m("O que acontece em um `switch` quando um `case` não termina com `break`?", ["Dá erro de compilação", "A execução continua no próximo `case`", "O programa encerra", "Volta ao início do switch"], 1, "É o chamado fall-through; quase sempre é bug."),
      l("Complete a função que altera a variável original de quem chamou:", c`void dobrar(int____ x) {
    x = x * 2;
}`, "&", "Com `&`, o parâmetro é uma referência à variável original."),
      m("Qual a melhor forma de receber uma `string` que a função só vai ler?", ["`string s`", "`string& s`", "`const string& s`", "`string* s`"], 2, "Referência constante: não copia e não permite alterar.")
    ],
    intermediario: [
      l("Complete para adicionar 65 no final do vector:", c`vector<int> pontos = {40, 15};
pontos.____(65);`, "push_back", "O vector cresce sozinho a cada inserção."),
      m("Qual a diferença entre `v[10]` e `v.at(10)` em um vector com 3 elementos?", ["Nenhuma", "`at` confere o índice e lança `out_of_range`; `[]` não confere (comportamento indefinido)", "`[]` é mais seguro", "`at` aumenta o vector"], 1, "Use `at` quando não tiver certeza do índice."),
      m("O que `email.find('@')` devolve se não houver `@` no texto?", ["-1 como `int`", "`string::npos`", "0", "Lança uma exceção"], 1, "Compare sempre com `string::npos` antes de usar a posição."),
      m("Qual função converte o texto `\"42\"` no inteiro 42?", ["`to_string`", "`stoi`", "`atoi_cpp`", "`int()`"], 1, "Para `double`, use `stod`; para o caminho inverso, `to_string`."),
      m("Qual o acesso padrão dos membros de uma `class` e de uma `struct`?", ["Ambos public", "Ambos private", "class: private; struct: public", "class: public; struct: private"], 2, "É a única diferença técnica entre as duas."),
      m("O que significa o `const` em `double getSaldo() const`?", ["O retorno não pode ser usado", "O método promete não alterar o objeto", "O método é estático", "O saldo é constante para sempre"], 1, "Só métodos `const` podem ser chamados em objetos constantes."),
      vf("A definição de uma classe em C++ termina com `};` (chave e ponto e vírgula).", true, "Esquecer o `;` gera erros confusos nas linhas seguintes."),
      l("Complete para obter o endereço da variável `idade`:", c`int idade = 30;
int* ptr = ____idade;`, "&", "Em uma expressão, `&` pega o endereço; `*ptr` acessa o valor."),
      m("Qual o jeito moderno de criar um objeto no heap com um único dono?", ["`new Arquivo(\"a.txt\")`", "`malloc(sizeof(Arquivo))`", "`make_unique<Arquivo>(\"a.txt\")`", "`Arquivo* a;`"], 2, "O `unique_ptr` libera a memória sozinho, sem `delete`."),
      vf("Um `shared_ptr` libera o objeto assim que qualquer um dos seus donos sai de escopo.", false, "Ele só libera quando o ÚLTIMO dono some; `use_count()` mostra quantos são.")
    ],
    avancado: [
      m("Em que ordem um `map<string, int>` percorre as chaves?", ["Ordem de inserção", "Aleatória", "Ordenadas (alfabética para string)", "Da maior para a menor inserção"], 2, "`map` é uma árvore ordenada; `unordered_map` não garante ordem."),
      m("O que acontece em `contagem[\"pix\"]++` se a chave \"pix\" ainda não existe no map?", ["Lança exceção", "Não faz nada", "Cria a chave com valor 0 e soma 1", "Dá erro de compilação"], 2, "Para só consultar sem criar, use `count` ou `find`."),
      l("Complete para ordenar o vector inteiro:", c`sort(valores.begin(), valores.____());`, "end", "Algoritmos recebem o intervalo [begin, end)."),
      m("O que `find(v.begin(), v.end(), 80)` devolve quando 80 não está no vector?", ["-1", "`nullptr`", "`v.end()`", "0"], 2, "Compare com `end()` antes de usar o iterador."),
      m("O que é `[](int a, int b) { return a > b; }`?", ["Um array de inteiros", "Uma lambda (função anônima) que compara dois números", "Um template", "Um ponteiro"], 1, "Passada para `sort`, coloca os maiores primeiro."),
      m("O que torna uma classe C++ abstrata?", ["A palavra `abstract`", "Ter ao menos uma função virtual pura (`= 0`)", "Não ter construtor", "Ter atributos privados"], 1, "Classes abstratas não podem ser instanciadas diretamente."),
      l("Complete para que o compilador confira que a função redefine uma virtual da base:", c`double area() const ____ { return largura * altura; }`, "override", "Se a assinatura não bater com a da base, dá erro de compilação."),
      vf("Uma classe base com funções virtuais deve ter destrutor virtual.", true, "Sem ele, destruir pela base não libera a parte da classe derivada."),
      m("Qual a ordem correta de blocos `catch`?", ["Do mais genérico (`exception`) para o mais específico", "Do mais específico para o mais genérico", "A ordem não importa", "Só pode haver um `catch`"], 1, "Se `exception` vier primeiro, ele captura tudo e os outros nunca rodam."),
      m("Para que serve `#pragma once` no início de um arquivo `.h`?", ["Compilar mais rápido em paralelo", "Impedir que o header seja incluído duas vezes no mesmo arquivo", "Tornar as funções inline", "Ligar o C++17"], 1, "Faz o mesmo papel dos include guards com `#ifndef`/`#define`.")
    ]
  }
};
