const c = String.raw;

export default {
  id: "cpp",
  nome: "C++",
  icone: "⚙️",
  cor: "#00599c",
  dificuldade: 5,
  resumo: "Linguagem compilada, rápida e próxima do hardware. Está por trás de jogos, navegadores, bancos de dados e sistemas embarcados.",
  mercado: "No Brasil aparece em jogos (Unreal Engine), sistemas embarcados e IoT, automação industrial, finanças de baixa latência e softwares que exigem desempenho (CAD, simulação, telecom). É a linguagem preferida das maratonas de programação e uma ótima base para entender como o computador funciona por dentro.",
  docs: [
    { nome: "cppreference (português)", url: "https://pt.cppreference.com/", desc: "referência da linguagem e da biblioteca padrão" },
    { nome: "cppreference (inglês)", url: "https://en.cppreference.com/w/cpp", desc: "versão mais completa e atualizada" },
    { nome: "LearnCpp.com", url: "https://www.learncpp.com/", desc: "o melhor tutorial gratuito, do zero ao avançado" },
    { nome: "isocpp.org", url: "https://isocpp.org/", desc: "site oficial do padrão C++ e das C++ Core Guidelines" },
    { nome: "cplusplus.com", url: "https://cplusplus.com/reference/", desc: "referência com exemplos curtos" },
    { nome: "Compiler Explorer", url: "https://godbolt.org/", desc: "compile e rode C++ no navegador" }
  ],
  niveis: {
    basico: {
      objetivo: "compilar e rodar programas C++ com variáveis, entrada e saída, decisões, laços e funções.",
      topicos: [
        {
          titulo: "Estrutura, cout/cin e variáveis",
          crianca: `C++ é como uma <b>receita que precisa ir ao forno</b> antes de comer: você escreve o texto (<code>main.cpp</code>), o <b>compilador</b> assa e entrega um programa pronto. O <code>cout</code> é a <b>boca</b> do programa (fala na tela) e o <code>cin</code> é o <b>ouvido</b> (escuta o teclado).`,
          codigo: c`
// Arquivo: main.cpp
// Compile: g++ -std=c++17 -Wall main.cpp -o main   →   rode: ./main
#include <iostream>   // cout e cin
#include <iomanip>    // fixed e setprecision
#include <string>     // std::string
using namespace std;  // ok para estudar; em projetos grandes escreva std::cout

int main() {
    string nome = "Rafael";
    int idade = 35;
    double altura = 1.78;
    bool ativo = true;
    char inicial = 'R';
    const double PRECO_CAFE = 4.50;   // const: não pode mudar
    auto cidade = string("Belo Horizonte");  // auto deduz o tipo

    cout << "Olá, " << nome << " (" << inicial << ")!" << endl;
    cout << nome << " mora em " << cidade << " e tem " << idade << " anos\n";
    cout << boolalpha << "Ativo: " << ativo << '\n';   // imprime true/false
    cout << fixed << setprecision(2) << "Altura: " << altura << " m\n";

    int quantidade = 0;
    cout << "Quantos cafés? ";
    cin >> quantidade;                 // lê um número do teclado
    double total = quantidade * PRECO_CAFE;
    cout << "Total: R$ " << total << '\n';
    return 0;                          // 0 = terminou sem erro
}`,
          nota: "No Windows, instale o MSYS2 (g++) ou o Visual Studio Community; no Linux, o pacote build-essential; no Mac, as Command Line Tools (clang++). Para começar sem instalar nada, use o Compiler Explorer ou o OneCompiler.",
          trabalho: `Programas de linha de comando, ferramentas internas e firmware começam assim. Compilar com <code>-Wall</code> (todos os avisos) é obrigatório em equipes sérias: o compilador aponta variáveis não usadas, conversões perigosas e outros bugs antes de rodar.`,
          entrevista: {
            pergunta: "Qual a diferença entre uma linguagem compilada como C++ e uma interpretada como Python?",
            resposta: `Em C++ o <b>compilador</b> traduz todo o código para <b>código de máquina</b> antes de rodar, gerando um executável próprio para aquele sistema. Isso dá muita velocidade e detecta erros de tipo cedo. Em Python, o interpretador lê e executa o código na hora, o que é mais flexível, porém mais lento. Por isso C++ é escolhido onde cada milissegundo conta.`
          },
          busca: ["c++ cout cin tutorial", "g++ compilar c++ windows", "c++ setprecision fixed"]
        },
        {
          titulo: "Condições e laços",
          crianca: `O <code>if</code> é o <b>porteiro</b>: só deixa passar quem cumpre a regra. O <code>for</code> é a <b>esteira</b> que leva um item de cada vez. O <code>while</code> é a <b>torneira</b> que fica aberta enquanto o balde não enche.`,
          codigo: c`
#include <iostream>
using namespace std;

int main() {
    int notas[] = {8, 5, 10, 3, 7};
    int aprovados = 0;

    for (int nota : notas) {            // for "para cada"
        if (nota >= 7) {
            aprovados++;
        } else if (nota >= 5) {
            cout << "Nota " << nota << ": recuperação\n";
        } else {
            cout << "Nota " << nota << ": reprovado\n";
        }
    }
    cout << "Aprovados: " << aprovados << '\n';

    for (int i = 1; i <= 3; i++) {      // for clássico com contador
        cout << "7 x " << i << " = " << 7 * i << '\n';
    }

    int opcao = 2;
    switch (opcao) {                    // switch: só int, char e enum
        case 1: cout << "Saldo\n"; break;
        case 2: cout << "Extrato\n"; break;   // sem break, "cai" no próximo
        default: cout << "Opção inválida\n";
    }

    int saldo = 100;
    while (saldo >= 30) {               // repete enquanto for verdade
        saldo -= 30;
        cout << "Saque de 30, sobrou " << saldo << '\n';
    }
    return 0;
}`,
          trabalho: `Laços aparecem em tudo: ler sensores a cada ciclo em um sistema embarcado, percorrer pixels de uma imagem, atualizar cada inimigo em cada quadro de um jogo. Em maratonas de programação, saber o custo de laços aninhados (O(n²)) decide se a solução passa no tempo.`,
          entrevista: {
            pergunta: "Qual a diferença entre i++ e ++i?",
            resposta: `Os dois somam 1 em <code>i</code>. <code>i++</code> (pós-incremento) devolve o valor <b>antigo</b> e depois soma; <code>++i</code> (pré-incremento) soma e devolve o valor <b>novo</b>. Em <code>int x = i++;</code> o <code>x</code> recebe o valor antes da soma. Em laços com números não há diferença prática, mas com iteradores de objetos <code>++i</code> pode evitar uma cópia, por isso muitos programadores C++ preferem essa forma.`
          },
          busca: ["c++ range based for", "c++ switch case break", "c++ while do while"]
        },
        {
          titulo: "Funções e referências",
          crianca: `Uma função é uma <b>máquina de suco</b>: entra fruta (parâmetros), sai suco (retorno). Passar por <b>valor</b> é entregar uma <b>fotocópia</b> do documento; passar por <b>referência</b> (<code>&amp;</code>) é entregar o <b>original</b>, então a função consegue alterá-lo.`,
          codigo: c`
#include <iostream>
#include <string>
using namespace std;

// Declaração (protótipo): avisa que a função existe
double aplicarDesconto(double preco, double porcentagem = 10.0);

void dobrarCopia(int x) { x = x * 2; }          // recebe uma cópia
void dobrarOriginal(int& x) { x = x * 2; }      // recebe o original (&)

// const& : lê sem copiar e sem poder alterar (ótimo para string)
void saudar(const string& nome) {
    cout << "Bem-vindo, " << nome << "!\n";
}

// Sobrecarga: mesmo nome, parâmetros diferentes
int somar(int a, int b) { return a + b; }
double somar(double a, double b) { return a + b; }

int main() {
    cout << aplicarDesconto(200.0) << '\n';        // usa o padrão: 180
    cout << aplicarDesconto(200.0, 25.0) << '\n';  // 150

    int n = 5;
    dobrarCopia(n);
    cout << "Depois da cópia: " << n << '\n';      // 5
    dobrarOriginal(n);
    cout << "Depois da referência: " << n << '\n'; // 10

    saudar("Ana");
    cout << somar(2, 3) << " e " << somar(1.5, 2.25) << '\n';
    return 0;
}

// Definição: o corpo da função pode vir depois do main
double aplicarDesconto(double preco, double porcentagem) {
    return preco - preco * porcentagem / 100.0;
}`,
          trabalho: `Em código C++ profissional quase todo parâmetro de objeto é <code>const string&amp;</code>, <code>const vector&lt;T&gt;&amp;</code> e assim por diante: evita copiar dados grandes a cada chamada. Passar um <code>vector</code> de 1 milhão de itens por valor é um erro clássico de desempenho apontado em code review.`,
          entrevista: {
            pergunta: "Quando passar um parâmetro por valor, por referência ou por referência constante?",
            resposta: `Por <b>valor</b> para tipos pequenos e baratos (<code>int</code>, <code>double</code>, <code>char</code>) ou quando a função precisa de uma cópia. Por <b>referência</b> (<code>T&amp;</code>) quando a função deve <b>alterar</b> o argumento. Por <b>referência constante</b> (<code>const T&amp;</code>) para objetos grandes que só serão lidos, como <code>string</code> e <code>vector</code>: não copia e garante que não haverá alteração.`
          },
          busca: ["c++ passagem por referência", "c++ const reference parameter", "c++ sobrecarga de funções"]
        }
      ]
    },
    intermediario: {
      objetivo: "usar vector e string da biblioteca padrão, criar classes bem encapsuladas e entender ponteiros e smart pointers.",
      topicos: [
        {
          titulo: "std::vector e std::string",
          crianca: `O <code>vector</code> é uma <b>fila de cadeiras que cresce sozinha</b>: chegou mais gente, ele puxa mais cadeiras. A <code>string</code> é um <b>colar de letras</b> que você pode cortar, procurar e emendar sem se preocupar com o tamanho.`,
          codigo: c`
#include <iostream>
#include <vector>
#include <string>
#include <sstream>    // stringstream
#include <algorithm>  // sort
using namespace std;

int main() {
    vector<int> pontos = {40, 15, 90};
    pontos.push_back(65);                // adiciona no fim
    sort(pontos.begin(), pontos.end());  // ordena: 15 40 65 90

    cout << "Total de jogadores: " << pontos.size() << '\n';
    for (int p : pontos) cout << p << ' ';
    cout << "\nMaior: " << pontos.back() << ", primeiro: " << pontos[0] << '\n';
    // pontos.at(10) lança erro; pontos[10] é comportamento indefinido!

    string email = "Ana.Souza@Email.com";
    size_t arroba = email.find('@');     // posição do @
    string usuario = email.substr(0, arroba);
    string dominio = email.substr(arroba + 1);
    for (char& ch : dominio) ch = tolower(ch);   // & altera cada letra
    cout << usuario << " | " << dominio << '\n';

    // Quebrar uma linha CSV em partes
    string linha = "Caneta;3;2.50";
    stringstream ss(linha);
    string nome, qtdTexto, precoTexto;
    getline(ss, nome, ';');
    getline(ss, qtdTexto, ';');
    getline(ss, precoTexto, ';');
    int qtd = stoi(qtdTexto);            // texto → int
    double preco = stod(precoTexto);     // texto → double
    cout << nome << ": " << qtd * preco << '\n';

    string resumo = "Itens: " + to_string(qtd);   // número → texto
    cout << resumo << " (" << resumo.size() << " caracteres)\n";
    return 0;
}`,
          trabalho: `<code>vector</code> é a estrutura padrão de 90% dos programas C++: lista de inimigos de um jogo, leituras de um sensor, linhas de um arquivo. Ler CSV e logs com <code>getline</code> e <code>stringstream</code> é tarefa comum em automação e ferramentas internas.`,
          entrevista: {
            pergunta: "Qual a diferença entre size() e capacity() em um vector? Por que usar reserve?",
            resposta: `<code>size()</code> é quantos elementos existem; <code>capacity()</code> é quanto espaço já foi reservado na memória. Quando o vector enche, ele aloca um bloco maior e <b>copia/move tudo</b>, o que custa tempo. Se você sabe que vai inserir 10 mil itens, <code>reserve(10000)</code> aloca uma vez só e evita essas realocações.`
          },
          busca: ["c++ vector push_back size", "c++ string find substr", "c++ stringstream getline split"]
        },
        {
          titulo: "Classes e objetos",
          crianca: `A classe é a <b>planta da casa</b>; cada casa construída é um objeto. O que é <code>private</code> fica <b>dentro de casa</b>, longe de estranhos; o que é <code>public</code> é a <b>campainha e a porta</b>, o jeito certo de interagir.`,
          codigo: c`
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class ContaBancaria {
private:
    string titular;
    double saldo;

public:
    // Construtor com lista de inicialização
    ContaBancaria(const string& nome, double saldoInicial = 0.0)
        : titular(nome), saldo(saldoInicial) {}

    bool depositar(double valor) {
        if (valor <= 0) return false;      // regra protegida pela classe
        saldo += valor;
        return true;
    }

    bool sacar(double valor) {
        if (valor <= 0 || valor > saldo) return false;
        saldo -= valor;
        return true;
    }

    // const: promete que o método não altera o objeto
    double getSaldo() const { return saldo; }
    const string& getTitular() const { return titular; }
};

// struct: igual a class, mas tudo é public por padrão (bom para dados simples)
struct Ponto {
    int x;
    int y;
};

int main() {
    ContaBancaria conta("Ana", 100.0);
    conta.depositar(50.0);
    if (!conta.sacar(500.0)) cout << "Saque recusado\n";
    // conta.saldo = 1000000;   // ERRO de compilação: saldo é private

    cout << fixed << setprecision(2);
    cout << conta.getTitular() << ": R$ " << conta.getSaldo() << '\n';

    Ponto p{3, 4};
    cout << "Ponto (" << p.x << ", " << p.y << ")\n";
    return 0;
}`,
          trabalho: `Em jogos, cada personagem, arma e item é um objeto (na Unreal, classes como <code>AActor</code> e <code>UObject</code>). Em automação, uma classe <code>Sensor</code> esconde os detalhes do hardware e oferece só <code>ler()</code> e <code>calibrar()</code>. Marcar métodos de leitura como <code>const</code> é cobrado em code review.`,
          entrevista: {
            pergunta: "Qual a diferença entre class e struct em C++?",
            resposta: `Tecnicamente só o acesso padrão: em <code>struct</code> os membros são <code>public</code> por padrão; em <code>class</code>, <code>private</code>. Os dois podem ter construtores, métodos e herança. Por convenção, usa-se <code>struct</code> para agrupar dados simples sem regras (como um ponto x/y) e <code>class</code> quando há invariantes a proteger (como um saldo que não pode ficar negativo).`
          },
          busca: ["c++ class constructor initializer list", "c++ const member function", "c++ class vs struct"]
        },
        {
          titulo: "Ponteiros, memória e smart pointers",
          crianca: `Toda variável mora em um <b>endereço</b>, como uma casa na rua. O ponteiro é um <b>papelzinho com o endereço</b> anotado: com ele você chega até a casa. Os <b>smart pointers</b> são papeizinhos espertos que <b>apagam a luz e trancam a porta</b> sozinhos quando ninguém mais precisa da casa.`,
          codigo: c`
#include <iostream>
#include <memory>    // unique_ptr, shared_ptr
#include <string>
using namespace std;

struct Arquivo {
    string nome;
    Arquivo(const string& n) : nome(n) { cout << "Abrindo " << nome << '\n'; }
    ~Arquivo() { cout << "Fechando " << nome << '\n'; }   // destrutor
};

int main() {
    int idade = 30;
    int* ptr = &idade;            // & pega o endereço
    cout << "Valor: " << *ptr << '\n';   // * acessa o que está no endereço
    *ptr = 31;                    // altera idade pelo ponteiro
    cout << "Idade agora: " << idade << '\n';

    int* vazio = nullptr;         // ponteiro que não aponta para nada
    if (vazio == nullptr) cout << "Ponteiro vazio, não use *vazio!\n";

    // Jeito antigo (evite): new exige delete, senão vaza memória
    int* numero = new int(42);
    cout << "Na heap: " << *numero << '\n';
    delete numero;

    // Jeito moderno: unique_ptr libera sozinho (RAII)
    {
        unique_ptr<Arquivo> a = make_unique<Arquivo>("relatorio.txt");
        cout << "Usando " << a->nome << '\n';   // -> acessa membro pelo ponteiro
    }   // fim do bloco: o destrutor roda aqui, automaticamente

    // shared_ptr: vários donos; libera quando o último sair
    shared_ptr<Arquivo> s1 = make_shared<Arquivo>("config.ini");
    {
        shared_ptr<Arquivo> s2 = s1;
        cout << "Donos: " << s1.use_count() << '\n';   // 2
    }
    cout << "Donos: " << s1.use_count() << '\n';       // 1
    return 0;
}   // s1 sai de escopo: "Fechando config.ini"`,
          nota: "Regra moderna: não escreva new/delete no dia a dia. Use objetos normais, vector e make_unique; recorra a shared_ptr só quando houver de fato vários donos.",
          trabalho: `Vazamento de memória e ponteiro pendurado (usar memória já liberada) são as fontes de bug mais caras em C++, inclusive falhas de segurança. Código moderno usa <b>RAII</b> e smart pointers; em sistemas embarcados com pouca memória, entender exatamente onde cada byte está (pilha ou heap) é parte do trabalho.`,
          entrevista: {
            pergunta: "O que é RAII e qual a diferença entre unique_ptr e shared_ptr?",
            resposta: `<b>RAII</b> (Resource Acquisition Is Initialization) é amarrar um recurso (memória, arquivo, conexão, mutex) à vida de um objeto: o construtor adquire e o <b>destrutor libera</b> automaticamente quando o objeto sai de escopo, até se houver exceção. <code>unique_ptr</code> tem <b>um único dono</b>, não pode ser copiado (só movido) e não tem custo extra. <code>shared_ptr</code> permite <b>vários donos</b> com um contador de referências e libera quando o último dono some.`
          },
          busca: ["c++ ponteiros explicação", "c++ unique_ptr make_unique", "c++ raii exemplo"]
        }
      ]
    },
    avancado: {
      objetivo: "dominar os containers e algoritmos da STL, aplicar polimorfismo e templates e organizar projetos com exceções, arquivos e CMake.",
      topicos: [
        {
          titulo: "STL: map, set e algoritmos",
          crianca: `A STL é uma <b>caixa de ferramentas</b> pronta. O <code>map</code> é uma <b>agenda</b>: procura pelo nome e acha o telefone, já em ordem alfabética. O <code>set</code> é um <b>álbum de figurinhas sem repetidas</b>. Os algoritmos (<code>sort</code>, <code>find</code>, <code>count_if</code>) são as <b>ferramentas</b> que funcionam em qualquer caixa.`,
          codigo: c`
#include <iostream>
#include <map>
#include <set>
#include <vector>
#include <string>
#include <algorithm>   // sort, find, count_if
#include <numeric>     // accumulate
using namespace std;

int main() {
    vector<string> palavras = {"pix", "boleto", "pix", "cartao", "pix", "boleto"};

    map<string, int> contagem;            // chave → valor, ordenado pela chave
    for (const string& p : palavras) contagem[p]++;   // [] cria com 0 se não existir
    for (const auto& [chave, qtd] : contagem)          // C++17: structured bindings
        cout << chave << ": " << qtd << '\n';

    if (contagem.count("dinheiro") == 0) cout << "Ninguém pagou em dinheiro\n";

    set<string> unicos(palavras.begin(), palavras.end());   // remove repetidos
    cout << "Formas distintas: " << unicos.size() << '\n';

    vector<int> valores = {120, 45, 300, 80, 15};
    sort(valores.begin(), valores.end(), [](int a, int b) { return a > b; }); // lambda: maior primeiro
    int soma = accumulate(valores.begin(), valores.end(), 0);
    int grandes = count_if(valores.begin(), valores.end(), [](int v) { return v >= 100; });
    cout << "Maior: " << valores.front() << ", soma: " << soma
         << ", acima de 100: " << grandes << '\n';

    auto it = find(valores.begin(), valores.end(), 80);
    if (it != valores.end()) cout << "Achei 80 na posição " << (it - valores.begin()) << '\n';
    return 0;
}`,
          trabalho: `Contar eventos em logs, agrupar pedidos por cliente, eliminar duplicados, ordenar um ranking: tudo em poucas linhas com a STL. Em maratonas de programação, dominar <code>map</code>, <code>set</code>, <code>priority_queue</code> e <code>sort</code> é metade do caminho. Quando a ordem não importa, <code>unordered_map</code> costuma ser mais rápido.`,
          entrevista: {
            pergunta: "Qual a diferença entre map e unordered_map?",
            resposta: `<code>map</code> é uma árvore balanceada: mantém as chaves <b>ordenadas</b> e busca, insere e remove em O(log n). <code>unordered_map</code> é uma tabela hash: <b>não tem ordem</b> definida, mas faz essas operações em O(1) na média (podendo piorar com muitas colisões). Use <code>map</code> quando precisar percorrer em ordem ou buscar faixas; <code>unordered_map</code> quando só precisar de busca rápida.`
          },
          busca: ["c++ map vs unordered_map", "c++ stl algorithms sort lambda", "c++ structured bindings map"]
        },
        {
          titulo: "Herança, polimorfismo e templates",
          crianca: `Quadrado e círculo são <b>formas</b>: as duas sabem dizer sua área, cada uma do seu jeito. Isso é <b>polimorfismo</b>. O <b>template</b> é uma <b>fôrma de gelo</b>: a mesma fôrma faz gelo de água, de suco ou de café, ou seja, o mesmo código para tipos diferentes.`,
          codigo: c`
#include <iostream>
#include <vector>
#include <memory>
#include <string>
using namespace std;

// Classe abstrata: tem pelo menos uma função virtual pura (= 0)
class Forma {
public:
    virtual double area() const = 0;
    virtual string nome() const { return "Forma"; }
    virtual ~Forma() = default;   // destrutor virtual: obrigatório em classe base
};

class Retangulo : public Forma {
    double largura, altura;
public:
    Retangulo(double l, double a) : largura(l), altura(a) {}
    double area() const override { return largura * altura; }
    string nome() const override { return "Retângulo"; }
};

class Circulo : public Forma {
    double raio;
public:
    explicit Circulo(double r) : raio(r) {}
    double area() const override { return 3.14159 * raio * raio; }
    string nome() const override { return "Círculo"; }
};

// Template de função: funciona para qualquer tipo com operador >
template <typename T>
T maior(T a, T b) { return a > b ? a : b; }

// Template de classe
template <typename T>
class Caixa {
    T conteudo;
public:
    explicit Caixa(T valor) : conteudo(valor) {}
    T abrir() const { return conteudo; }
};

int main() {
    vector<unique_ptr<Forma>> formas;
    formas.push_back(make_unique<Retangulo>(3, 4));
    formas.push_back(make_unique<Circulo>(1));

    for (const auto& f : formas)          // polimorfismo: chama a versão certa
        cout << f->nome() << ": " << f->area() << '\n';

    cout << maior(3, 9) << ' ' << maior(2.5, 1.5) << ' '
         << maior(string("ana"), string("bia")) << '\n';

    Caixa<int> c1(42);
    Caixa<string> c2("presente");
    cout << c1.abrir() << " e " << c2.abrir() << '\n';
    return 0;
}`,
          trabalho: `Motores de jogos usam herança e funções virtuais para que o loop principal chame <code>atualizar()</code> em qualquer entidade. A própria STL é feita de templates (<code>vector&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code>). Esquecer o destrutor virtual na classe base é um bug clássico que causa vazamento de memória.`,
          entrevista: {
            pergunta: "Por que a classe base precisa de destrutor virtual?",
            resposta: `Quando você apaga um objeto derivado por meio de um ponteiro para a base (<code>delete ptrBase</code> ou um <code>unique_ptr&lt;Forma&gt;</code>), sem destrutor <code>virtual</code> só o destrutor da <b>base</b> roda: os recursos da classe derivada não são liberados, e o comportamento é indefinido. Com <code>virtual ~Forma()</code>, o C++ chama primeiro o destrutor da derivada e depois o da base.`
          },
          busca: ["c++ virtual override polimorfismo", "c++ pure virtual abstract class", "c++ templates tutorial"]
        },
        {
          titulo: "Exceções, arquivos e organização em .h/.cpp (g++/CMake)",
          crianca: `Uma exceção é o <b>alarme de incêndio</b>: alguém aperta (<code>throw</code>) e quem está preparado (<code>catch</code>) resolve. Arquivos são <b>cadernos</b> que o programa escreve e lê. Separar em <code>.h</code> e <code>.cpp</code> é como um <b>cardápio</b> (o que existe) e a <b>cozinha</b> (como é feito).`,
          codigo: c`
// Versão em um arquivo só, para compilar direto:
//   g++ -std=c++17 -Wall main.cpp -o estoque && ./estoque
// Num projeto real, cada parte abaixo vai para o arquivo indicado.
#include <iostream>
#include <fstream>     // ofstream (escrever) e ifstream (ler)
#include <sstream>
#include <stdexcept>   // runtime_error, invalid_argument
#include <string>
#include <vector>
using namespace std;

// ===== estoque.h  (declarações: o "cardápio") =====
// #pragma once
struct Produto {
    string nome;
    int quantidade;
};

class EstoqueInsuficiente : public runtime_error {
public:
    explicit EstoqueInsuficiente(const string& msg) : runtime_error(msg) {}
};

void retirar(Produto& p, int qtd);
vector<Produto> carregar(const string& caminho);

// ===== estoque.cpp  (implementação: a "cozinha") =====
// #include "estoque.h"
void retirar(Produto& p, int qtd) {
    if (qtd <= 0) throw invalid_argument("Quantidade deve ser positiva");
    if (qtd > p.quantidade)
        throw EstoqueInsuficiente("Só há " + to_string(p.quantidade) + " de " + p.nome);
    p.quantidade -= qtd;
}

vector<Produto> carregar(const string& caminho) {
    ifstream arq(caminho);
    if (!arq) throw runtime_error("Não consegui abrir " + caminho);
    vector<Produto> itens;
    string linha;
    while (getline(arq, linha)) {          // lê linha por linha
        stringstream ss(linha);
        Produto p;
        string qtd;
        getline(ss, p.nome, ';');
        getline(ss, qtd);
        p.quantidade = stoi(qtd);
        itens.push_back(p);
    }
    return itens;                          // arq fecha sozinho (RAII)
}

// ===== main.cpp =====
// #include "estoque.h"
int main() {
    {
        ofstream saida("estoque.txt");     // cria/sobrescreve o arquivo
        saida << "Parafuso;100\n" << "Porca;20\n";
    }                                      // fecha ao sair do bloco

    try {
        vector<Produto> itens = carregar("estoque.txt");
        retirar(itens[0], 30);
        cout << itens[0].nome << ": " << itens[0].quantidade << '\n';
        retirar(itens[1], 50);             // vai lançar exceção
        cout << "Esta linha não roda\n";
    } catch (const EstoqueInsuficiente& e) {   // do mais específico...
        cout << "Estoque: " << e.what() << '\n';
    } catch (const exception& e) {             // ...ao mais genérico
        cout << "Erro: " << e.what() << '\n';
    }
    return 0;
}

/* CMakeLists.txt do projeto separado em estoque.h, estoque.cpp e main.cpp:
cmake_minimum_required(VERSION 3.16)
project(Estoque CXX)
set(CMAKE_CXX_STANDARD 17)
add_executable(estoque main.cpp estoque.cpp)

Compilar:  cmake -S . -B build  &&  cmake --build build
Ou direto: g++ -std=c++17 -Wall main.cpp estoque.cpp -o estoque  */`,
          nota: "O código acima junta os três arquivos em um só para você compilar de uma vez. Ao separar, apague os comentários // antes de #pragma once e #include \"estoque.h\" e coloque cada parte no seu arquivo.",
          trabalho: `Projetos C++ reais têm dezenas ou milhares de arquivos <code>.h</code>/<code>.cpp</code> e usam <b>CMake</b> para compilar em Windows, Linux e Mac. Ler arquivos de configuração e logs, tratar falhas de hardware com exceções e manter a compilação rápida separando declarações de implementações faz parte do dia a dia.`,
          entrevista: {
            pergunta: "Por que separar o código em .h e .cpp? O que faz o #pragma once?",
            resposta: `O <code>.h</code> (header) traz as <b>declarações</b> que outros arquivos precisam conhecer; o <code>.cpp</code> traz as <b>implementações</b>, compiladas uma única vez. Assim, mudar o corpo de uma função só recompila aquele <code>.cpp</code>, e cada arquivo inclui só o que usa. O <code>#pragma once</code> (ou os <i>include guards</i> com <code>#ifndef</code>) impede que o mesmo header seja incluído duas vezes no mesmo arquivo, o que causaria erro de redefinição.`
          },
          busca: ["c++ header e cpp separação", "c++ exceptions try catch runtime_error", "cmake tutorial iniciante c++"]
        }
      ]
    }
  }
};
