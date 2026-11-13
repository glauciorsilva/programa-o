// Python de A a Z — Parte 1: fundamentos.
import { m, vf, l, c, comp, criar } from "./util.js";

const S = "1. Fundamentos";

export default [
  {
    id: "intro", secao: S, titulo: "O que é Python e primeiros passos",
    teoria: `
      <p><b>Python</b> é uma linguagem de programação criada por Guido van Rossum (lançada em 1991), famosa por ser <b>fácil de ler</b>. Ela é usada em sites e APIs (back-end), automação de tarefas, análise de dados, inteligência artificial, scripts de sistema e até para ensinar programação.</p>
      <h3>Por que Python?</h3>
      <ul>
        <li>Sintaxe simples, parecida com o inglês;</li>
        <li>Roda em Windows, Mac, Linux e até no navegador (como aqui, com o <b>Pyodide</b>);</li>
        <li>É <b>interpretada</b>: o código roda linha por linha, sem compilar antes. Dá para testar ideias rapidinho;</li>
        <li>Funciona com vários estilos: procedural, orientado a objetos e funcional.</li>
      </ul>
      <h3>Instalando no seu computador</h3>
      <p>Baixe em <b>python.org</b> (no Windows, marque “Add Python to PATH”). Para conferir, abra o terminal e digite <code>python --version</code> (ou <code>python3 --version</code>). Para rodar um arquivo: <code>python meu_programa.py</code>.</p>
      <p>Também dá para usar o modo interativo: digite <code>python</code> no terminal e escreva comandos direto. Para sair: <code>exit()</code>.</p>
      <h3>Seu primeiro programa</h3>
      <pre><code>print("Olá, mundo!")</code></pre>
      <!--pratica-->
      <h3>Como este guia funciona</h3>
      <ul>
        <li>Cada lição tem explicação, exemplos, perguntas rápidas (⭐ 2 pts cada) e exercícios de código corrigidos na hora (⭐ 10 ou 15 pts).</li>
        <li>O Python roda <b>dentro do seu navegador</b>: na primeira vez ele leva uns 10 segundos para carregar.</li>
        <li>O guia é livre: pule para qualquer tópico pelo índice.</li>
      </ul>`,
    exemplo: c`print("Olá, mundo!")
print("Estou aprendendo Python")`,
    perguntas: [
      vf("Python é uma linguagem interpretada: o código roda sem precisar de uma etapa de compilação feita por você.", true, "Isso mesmo: o interpretador lê e executa o código diretamente."),
      m("Qual comando mostra um texto na tela?", ["`print()`", "`echo()`", "`console.log()`", "`write()`"], 0, "Em Python usamos `print()`. `console.log()` é do JavaScript.")
    ],
    exercicios: [
      criar("Olá, mundo!", `Escreva um programa que mostre exatamente <code>Olá, mundo!</code> na tela.`, `Use <code>print("...")</code> com o texto entre aspas.`,
        c`# Escreva seu primeiro programa aqui
`, c`print("Olá, mundo!")`, c`
assert "Olá, mundo!" in __saida__, "A saída deveria ter o texto: Olá, mundo!"`),
      criar("Duas linhas", `Mostre duas linhas: <code>Python</code> e, embaixo, <code>é divertido</code>.`, `Cada <code>print</code> imprime uma linha.`,
        c`# Duas linhas na tela
`, c`print("Python")
print("é divertido")`, c`
linhas = [x.strip() for x in __saida__.strip().splitlines()]
assert linhas == ["Python", "é divertido"], f"Esperava as linhas Python e é divertido, mas saiu {linhas}"`)
    ]
  },
  {
    id: "sintaxe", secao: S, titulo: "Sintaxe e indentação",
    teoria: `
      <p>Em Python, a <b>indentação</b> (os espaços no começo da linha) não é enfeite: ela define <b>blocos</b> de código. Outras linguagens usam chaves <code>{ }</code>; Python usa os espaços.</p>
      <pre><code>if 5 &gt; 2:
    print("Cinco é maior que dois!")   # 4 espaços: está dentro do if
print("Fim")                           # sem espaços: fora do if</code></pre>
      <ul>
        <li>O padrão é <b>4 espaços</b>. O importante é usar sempre a mesma quantidade no mesmo bloco.</li>
        <li>Esquecer a indentação dá <code>IndentationError</code>.</li>
        <li>Linhas que abrem bloco (<code>if</code>, <code>for</code>, <code>def</code>…) terminam com <b>dois-pontos</b> <code>:</code>.</li>
      </ul>
      <h3>Instruções (statements)</h3>
      <p>Cada linha costuma ser uma instrução. Dá para pôr duas na mesma linha com <code>;</code> (<code>x = 1; y = 2</code>), mas não é recomendado. Python diferencia <b>maiúsculas de minúsculas</b>: <code>nome</code> e <code>Nome</code> são variáveis diferentes.</p>
      <!--pratica-->`,
    exemplo: c`idade = 20
if idade >= 18:
    print("Maior de idade")
    print("Pode tirar carteira de motorista")
print("Programa encerrado")`,
    perguntas: [
      m("O que define um bloco de código em Python?", ["A indentação (espaços no início da linha)", "Chaves `{ }`", "A palavra `end`", "Ponto e vírgula"], 0, "Python usa a indentação para saber o que está dentro de um `if`, `for`, função etc."),
      vf("`Nome` e `nome` são a mesma variável em Python.", false, "Python diferencia maiúsculas de minúsculas (é *case sensitive*)."),
      l("Complete o que falta no fim da linha do `if`:", c`if 10 > 3____
    print("ok")`, [":"], "Linhas que abrem bloco terminam com dois-pontos.")
    ],
    exercicios: [
      comp("Arrumando o bloco", `O código abaixo deveria mostrar <code>Aprovado</code> quando a nota é maior ou igual a 6. Substitua a lacuna para fechar a linha do <code>if</code> corretamente.`, `Toda linha de <code>if</code> termina com um sinal.`,
        c`nota = 7.5
if nota >= 6____
    print("Aprovado")`, c`nota = 7.5
if nota >= 6:
    print("Aprovado")`, c`
assert "Aprovado" in __saida__, "Deveria mostrar Aprovado"`),
      criar("Dentro e fora do bloco", `Crie a variável <code>estoque = 3</code>. Se o estoque for menor que 5, mostre <code>Repor estoque</code> (dentro do <code>if</code>). Depois, <b>fora</b> do <code>if</code>, mostre sempre <code>Conferência concluída</code>.`, `O segundo <code>print</code> não deve ter espaços no começo.`,
        c`# estoque = ...
`, c`estoque = 3
if estoque < 5:
    print("Repor estoque")
print("Conferência concluída")`, c`
assert estoque == 3, "estoque deveria ser 3"
linhas = [x.strip() for x in __saida__.strip().splitlines()]
assert linhas == ["Repor estoque", "Conferência concluída"], f"Saída esperada: Repor estoque / Conferência concluída. Veio: {linhas}"`)
    ]
  },
  {
    id: "saida", secao: S, titulo: "Saída: print() com textos e números",
    teoria: `
      <p><code>print()</code> mostra valores na tela. Ele aceita textos, números e vários valores separados por vírgula (que saem separados por espaço).</p>
      <pre><code>print("Bom dia")          # texto (entre aspas simples ou duplas)
print(42)                 # número (sem aspas)
print(3 + 5)              # mostra o resultado: 8
print("Total:", 19.9)     # vários valores → Total: 19.9</code></pre>
      <h3>Opções úteis</h3>
      <ul>
        <li><code>sep</code>: o que vai entre os valores: <code>print("a", "b", sep="-")</code> → <code>a-b</code></li>
        <li><code>end</code>: o que vai no fim (o padrão é pular linha): <code>print("Carregando", end="...")</code></li>
      </ul>
      <p>⚠️ <code>print("3 + 5")</code> mostra o <b>texto</b> <code>3 + 5</code>; sem aspas, mostra o <b>resultado</b> 8.</p>
      <!--pratica-->`,
    exemplo: c`print("Pão francês", 0.75)
print("Quantidade:", 10)
print("Total:", 0.75 * 10)
print("10", "05", "2025", sep="/")`,
    perguntas: [
      m("O que `print(2 + 3)` mostra?", ["5", "2 + 3", "23", "Erro"], 0, "Sem aspas, o Python calcula a conta e mostra o resultado."),
      m("O que `print(\"a\", \"b\", sep=\"-\")` mostra?", ["`a-b`", "`a b`", "`ab`", "`a - b`"], 0, "O `sep` define o separador entre os valores.")
    ],
    exercicios: [
      comp("Data com separador", `Complete para que a saída seja <code>25/12/2025</code>.`, `O parâmetro <code>sep</code> define o que fica entre os valores.`,
        c`print("25", "12", "2025", sep=____)`, c`print("25", "12", "2025", sep="/")`, c`
assert "25/12/2025" in __saida__, "A saída deveria ser 25/12/2025"`),
      criar("Cupom simples", `Mostre, em linhas separadas: <code>Produto: Café</code>, <code>Preço: 12.5</code> e <code>Total para 3: 37.5</code>. O total deve ser <b>calculado</b> pelo Python (<code>12.5 * 3</code>), não escrito à mão.`, `<code>print("Total para 3:", 12.5 * 3)</code>`,
        c`# Mostre o cupom
`, c`print("Produto: Café")
print("Preço:", 12.5)
print("Total para 3:", 12.5 * 3)`, c`
assert "Produto: Café" in __saida__, "Falta a linha Produto: Café"
assert "Preço: 12.5" in __saida__, "Falta a linha Preço: 12.5"
assert "Total para 3: 37.5" in __saida__, "Falta a linha Total para 3: 37.5"`, { padroes: [[/12\.5\s*\*\s*3|3\s*\*\s*12\.5/, "Calcule o total com 12.5 * 3."]] })
    ]
  },
  {
    id: "comentarios", secao: S, titulo: "Comentários",
    teoria: `
      <p>Comentários são anotações para <b>pessoas</b>; o Python ignora. Eles começam com <code>#</code>:</p>
      <pre><code># Calcula o desconto da Black Friday
preco = 100
print(preco * 0.8)  # 20% de desconto</code></pre>
      <p>Para várias linhas, use várias <code>#</code>. Também se vê texto entre três aspas (<code>"""..."""</code>): tecnicamente é uma string que não é usada, e serve como comentário longo ou <b>docstring</b> (a descrição de uma função).</p>
      <p>Outro uso: “desligar” uma linha durante testes, colocando <code>#</code> na frente.</p>
      <!--pratica-->`,
    exemplo: c`# Programa: conversor de temperatura
celsius = 30
# fórmula: F = C * 9/5 + 32
print(celsius * 9 / 5 + 32)
# print("esta linha não roda")`,
    perguntas: [
      m("Qual símbolo inicia um comentário de uma linha em Python?", ["`#`", "`//`", "`--`", "`/*`"], 0, "`//` é do JavaScript/C, `--` é do SQL. Em Python é `#`."),
      vf("O Python executa o texto que está depois de `#` na linha.", false, "Tudo depois de `#` é ignorado.")
    ],
    exercicios: [
      comp("Desligando uma linha", `O programa mostra duas mensagens. “Desligue” a segunda transformando-a em comentário, para aparecer só <code>Sistema ligado</code>.`, `Coloque o símbolo de comentário no começo da linha.`,
        c`print("Sistema ligado")
____ print("Modo de teste ativo")`, c`print("Sistema ligado")
# print("Modo de teste ativo")`, c`
assert "Sistema ligado" in __saida__, "A primeira mensagem deve continuar aparecendo"
assert "Modo de teste" not in __saida__, "A segunda mensagem não deveria aparecer"`),
      criar("Código comentado", `Escreva um programa que calcula a área de um retângulo de base 8 e altura 5 e mostra o resultado (40). Inclua <b>pelo menos um comentário</b> explicando o cálculo.`, `Crie <code>base</code>, <code>altura</code> e <code>print(base * altura)</code>.`,
        c``, c`# área do retângulo = base x altura
base = 8
altura = 5
print(base * altura)`, c`
assert "40" in __saida__, "Deveria mostrar 40"`, { padroes: [[/#/, "Inclua pelo menos um comentário com #."]] })
    ]
  },
  {
    id: "variaveis", secao: S, titulo: "Variáveis",
    teoria: `
      <p>Uma <b>variável</b> é um nome que guarda um valor. Em Python, ela é criada quando você atribui um valor com <code>=</code> (não precisa declarar o tipo):</p>
      <pre><code>nome = "Ana"
idade = 30
idade = 31          # pode trocar o valor depois
print(nome, idade)</code></pre>
      <h3>Regras para nomes</h3>
      <ul>
        <li>Começam com letra ou <code>_</code> (nunca com número): <code>total</code>, <code>_temp</code>, <code>preco2</code>;</li>
        <li>Só letras, números e <code>_</code> (sem espaços nem hífen);</li>
        <li>Maiúsculas importam: <code>idade</code> ≠ <code>Idade</code>;</li>
        <li>Não podem ser palavras reservadas (<code>if</code>, <code>for</code>, <code>class</code>…).</li>
      </ul>
      <p>O estilo comum em Python é o <b>snake_case</b>: <code>preco_total</code>, <code>nome_cliente</code>.</p>
      <!--pratica-->
      <h3>Vários valores de uma vez</h3>
      <pre><code>x, y, z = "Laranja", "Banana", "Cereja"   # um valor para cada
a = b = c = 0                               # o mesmo valor para todas
frutas = ["maçã", "uva", "pera"]
f1, f2, f3 = frutas                         # "desempacotar" uma lista</code></pre>
      <h3>Mostrando variáveis</h3>
      <p><code>print(x, y)</code> separa com espaço. Com <code>+</code> você junta textos (<code>"Olá, " + nome</code>), mas texto + número dá erro: use vírgula ou f-string (<code>f"Idade: {idade}"</code>).</p>
      <h3>Variáveis globais</h3>
      <p>Variáveis criadas fora de funções são <b>globais</b> e podem ser lidas dentro delas. Para <b>alterar</b> uma global dentro de uma função, use a palavra <code>global</code>:</p>
      <pre><code>contador = 0
def somar():
    global contador
    contador = contador + 1
somar()
print(contador)  # 1</code></pre>`,
    exemplo: c`produto = "Caderno"
preco = 15.9
quantidade = 3
total = preco * quantidade
print(produto, "x", quantidade, "=", total)

x, y = 10, 20
x, y = y, x      # troca os valores!
print(x, y)`,
    perguntas: [
      m("Qual destes é um nome de variável **válido**?", ["`preco_total`", "`2preco`", "`preco-total`", "`preco total`"], 0, "Nomes não começam com número e não têm hífen nem espaço."),
      m("Depois de `a, b = 1, 2` e `a, b = b, a`, quanto vale `a`?", ["2", "1", "3", "Dá erro"], 0, "A segunda linha troca os valores: `a` recebe o antigo `b` (2)."),
      l("Complete para alterar a variável global dentro da função:", c`total = 0
def adicionar():
    ____ total
    total = total + 5`, ["global"], "A palavra `global` avisa que a função vai alterar a variável de fora.")
    ],
    exercicios: [
      comp("Ficha do aluno", `Complete as variáveis: <code>nome</code> com o texto <code>"Bruno"</code>, <code>idade</code> com o inteiro <code>17</code> e <code>turma</code> com <code>"3A"</code>.`, `Texto vai entre aspas; número inteiro, sem aspas.`,
        c`nome = ____
idade = ____
turma = ____
print(nome, idade, turma)`, c`nome = "Bruno"
idade = 17
turma = "3A"
print(nome, idade, turma)`, c`
assert nome == "Bruno", f"nome deveria ser 'Bruno', mas é {nome!r}"
assert idade == 17 and isinstance(idade, int), f"idade deveria ser o inteiro 17, mas é {idade!r}"
assert turma == "3A", f"turma deveria ser '3A', mas é {turma!r}"`),
      comp("Três de uma vez", `Em <b>uma única linha</b>, crie <code>cidade</code>, <code>estado</code> e <code>pais</code> com <code>"Recife"</code>, <code>"PE"</code> e <code>"Brasil"</code>.`, `Separe os nomes e os valores por vírgula, na mesma ordem.`,
        c`cidade, estado, pais = ____
print(cidade, estado, pais)`, c`cidade, estado, pais = "Recife", "PE", "Brasil"
print(cidade, estado, pais)`, c`
assert (cidade, estado, pais) == ("Recife", "PE", "Brasil"), f"Valores: {cidade!r}, {estado!r}, {pais!r}"`),
      criar("Contador de visitas", `Crie a variável global <code>visitas = 0</code> e a função <code>registrar_visita()</code>, que soma 1 em <code>visitas</code>. Chame a função 3 vezes e mostre <code>visitas</code> (deve dar 3).`, `Dentro da função, use <code>global visitas</code> antes de alterar.`,
        c`visitas = 0

# crie a função registrar_visita()
`, c`visitas = 0

def registrar_visita():
    global visitas
    visitas = visitas + 1

registrar_visita()
registrar_visita()
registrar_visita()
print(visitas)`, c`
assert visitas == 3, f"visitas deveria ser 3, mas é {visitas}"
registrar_visita()
assert visitas == 4, "registrar_visita() deveria somar 1 na variável global visitas"`)
    ]
  },
  {
    id: "tipos", secao: S, titulo: "Tipos de dados",
    teoria: `
      <p>Todo valor tem um <b>tipo</b>. Os principais tipos embutidos:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Categoria</th><th>Tipos</th><th>Exemplo</th></tr></thead><tbody>
        <tr><td>Texto</td><td><code>str</code></td><td><code>"Olá"</code></td></tr>
        <tr><td>Números</td><td><code>int</code>, <code>float</code>, <code>complex</code></td><td><code>10</code>, <code>3.14</code>, <code>2j</code></td></tr>
        <tr><td>Sequências</td><td><code>list</code>, <code>tuple</code>, <code>range</code></td><td><code>[1, 2]</code>, <code>(1, 2)</code>, <code>range(5)</code></td></tr>
        <tr><td>Mapeamento</td><td><code>dict</code></td><td><code>{"nome": "Ana"}</code></td></tr>
        <tr><td>Conjuntos</td><td><code>set</code>, <code>frozenset</code></td><td><code>{1, 2, 3}</code></td></tr>
        <tr><td>Lógico</td><td><code>bool</code></td><td><code>True</code>, <code>False</code></td></tr>
        <tr><td>Binários</td><td><code>bytes</code>, <code>bytearray</code>, <code>memoryview</code></td><td><code>b"oi"</code></td></tr>
        <tr><td>Nenhum valor</td><td><code>NoneType</code></td><td><code>None</code></td></tr>
      </tbody></table>
      <p>Para saber o tipo: <code>type(x)</code>. Para testar: <code>isinstance(x, int)</code>.</p>
      <!--pratica-->
      <p>O tipo é definido pelo valor atribuído. Se quiser forçar um tipo, use o construtor: <code>str(20)</code>, <code>int("5")</code>, <code>float(3)</code>, <code>list((1, 2))</code>…</p>`,
    exemplo: c`print(type("texto"))
print(type(10), type(2.5), type(True))
print(type([1, 2]), type((1, 2)), type({"a": 1}), type({1, 2}))
print(type(None))`,
    perguntas: [
      m("Qual o tipo de `3.0`?", ["`float`", "`int`", "`str`", "`complex`"], 0, "Número com ponto decimal é `float`, mesmo que a parte decimal seja zero."),
      m("Qual o tipo de `{\"a\": 1}`?", ["`dict`", "`set`", "`list`", "`tuple`"], 0, "Chaves com pares `chave: valor` formam um dicionário.")
    ],
    exercicios: [
      comp("Que tipo é esse?", `Complete com os <b>nomes dos tipos</b> para que todos os testes deem <code>True</code>.`, `Os nomes são: <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>, <code>list</code>…`,
        c`print(isinstance(42, ____))
print(isinstance(4.2, ____))
print(isinstance("42", ____))
print(isinstance(False, ____))`, c`print(isinstance(42, int))
print(isinstance(4.2, float))
print(isinstance("42", str))
print(isinstance(False, bool))`, c`
assert __saida__.split() == ["True"] * 4, f"Todos deveriam ser True, mas saiu: {__saida__.split()}"`),
      criar("Cadastro com tipos certos", `Crie as variáveis: <code>produto</code> (texto <code>"Arroz"</code>), <code>estoque</code> (inteiro 40), <code>preco</code> (decimal 27.5), <code>ativo</code> (booleano verdadeiro) e <code>tags</code> (lista com <code>"grãos"</code> e <code>"básico"</code>).`, `Booleano verdadeiro em Python é <code>True</code> (com T maiúsculo).`,
        c``, c`produto = "Arroz"
estoque = 40
preco = 27.5
ativo = True
tags = ["grãos", "básico"]`, c`
assert produto == "Arroz", "produto deveria ser 'Arroz'"
assert type(estoque) is int and estoque == 40, "estoque deveria ser o inteiro 40"
assert type(preco) is float and preco == 27.5, "preco deveria ser o float 27.5"
assert ativo is True, "ativo deveria ser True"
assert tags == ["grãos", "básico"], "tags deveria ser a lista ['grãos', 'básico']"`)
    ]
  },
  {
    id: "numeros", secao: S, titulo: "Números (int, float, complex)",
    teoria: `
      <p>Python tem três tipos numéricos:</p>
      <ul>
        <li><code>int</code>: inteiros, positivos ou negativos, de qualquer tamanho: <code>7</code>, <code>-3</code>, <code>35656222554887711</code>;</li>
        <li><code>float</code>: números com ponto decimal: <code>1.5</code>, <code>-0.25</code>; também em notação científica: <code>35e3</code> (= 35000.0);</li>
        <li><code>complex</code>: números complexos, com <code>j</code> como parte imaginária: <code>3+5j</code> (usado em engenharia e física).</li>
      </ul>
      <p>⚠️ Use <b>ponto</b> como separador decimal: <code>2.5</code>, não <code>2,5</code>.</p>
      <!--pratica-->
      <h3>Conversão e números aleatórios</h3>
      <pre><code>x = int(2.8)     # 2 (corta a parte decimal)
y = float(5)     # 5.0
import random
print(random.randrange(1, 10))   # um inteiro de 1 a 9</code></pre>
      <p>💡 Contas com float podem ter pequenos erros: <code>0.1 + 0.2</code> dá <code>0.30000000000000004</code>. Para dinheiro, arredonde (<code>round(x, 2)</code>) ou use o módulo <code>decimal</code>.</p>`,
    exemplo: c`a = 10
b = 3.5
c = 2 + 3j
print(type(a), type(b), type(c))
print(int(9.99), float(7), 35e3)
print(0.1 + 0.2, round(0.1 + 0.2, 2))`,
    perguntas: [
      m("Quanto vale `int(7.9)`?", ["7", "8", "7.9", "Dá erro"], 0, "`int()` corta a parte decimal; não arredonda."),
      vf("`2,5` é a forma correta de escrever dois e meio em Python.", false, "Python usa ponto: `2.5`. Com vírgula vira uma tupla `(2, 5)`!")
    ],
    exercicios: [
      comp("Peso da encomenda", `Complete: <code>peso</code> deve ser o decimal <code>2.75</code> e <code>caixas</code> o inteiro <code>4</code>. O programa mostra o peso total (11.0).`, `Decimal com ponto.`,
        c`peso = ____
caixas = ____
print(peso * caixas)`, c`peso = 2.75
caixas = 4
print(peso * caixas)`, c`
assert isinstance(peso, float) and peso == 2.75, "peso deveria ser 2.75"
assert isinstance(caixas, int) and caixas == 4, "caixas deveria ser o inteiro 4"
assert "11.0" in __saida__, "Deveria mostrar 11.0"`),
      criar("Sorteio de brinde", `Importe o módulo <code>random</code> e guarde em <code>numero</code> um inteiro sorteado de 1 a 100 (inclusive), com <code>random.randint(1, 100)</code>. Mostre o número.`, `<code>import random</code> na primeira linha.`,
        c``, c`import random
numero = random.randint(1, 100)
print(numero)`, c`
assert isinstance(numero, int) and 1 <= numero <= 100, f"numero deveria ser um inteiro de 1 a 100, mas é {numero!r}"`, { padroes: [[/import\s+random/, "Importe o módulo random."], [/random\.randint\s*\(\s*1\s*,\s*100\s*\)/, "Use random.randint(1, 100)."]] })
    ]
  },
  {
    id: "casting", secao: S, titulo: "Conversão de tipos (casting)",
    teoria: `
      <p><b>Casting</b> é converter um valor de um tipo para outro, com os construtores:</p>
      <ul>
        <li><code>int()</code>: de float (corta) ou de texto com número inteiro: <code>int("15")</code> → 15;</li>
        <li><code>float()</code>: de int ou texto: <code>float("4.2")</code> → 4.2;</li>
        <li><code>str()</code>: de qualquer coisa para texto: <code>str(10)</code> → <code>"10"</code>.</li>
      </ul>
      <p>Isso é essencial porque <b>tudo que vem do usuário</b> (<code>input()</code>, formulários, arquivos CSV) chega como <b>texto</b>.</p>
      <pre><code>idade_txt = "25"
idade = int(idade_txt)
print(idade + 1)            # 26
print("Idade: " + str(idade))</code></pre>
      <!--pratica-->
      <p>⚠️ <code>int("2.5")</code> dá erro (<code>ValueError</code>). Converta primeiro para float: <code>int(float("2.5"))</code>.</p>`,
    exemplo: c`quantidade = "3"
preco = "19.90"
total = int(quantidade) * float(preco)
print("Total: " + str(total))`,
    perguntas: [
      m("O que `\"5\" + \"5\"` dá?", ["`\"55\"`", "`10`", "`\"10\"`", "Erro"], 0, "Somar textos junta (concatena) os textos."),
      m("Como transformar o texto `\"7\"` no número 7?", ["`int(\"7\")`", "`str(\"7\")`", "`num(\"7\")`", "`\"7\".int()`"], 0, "`int()` converte texto com número inteiro.")
    ],
    exercicios: [
      comp("Dados do formulário", `Os valores vieram como texto. Converta <code>quantidade_txt</code> para inteiro e <code>preco_txt</code> para decimal, para calcular o <code>total</code> (59.7).`, `<code>int(...)</code> e <code>float(...)</code>.`,
        c`quantidade_txt = "3"
preco_txt = "19.90"
quantidade = ____(quantidade_txt)
preco = ____(preco_txt)
total = quantidade * preco
print(total)`, c`quantidade_txt = "3"
preco_txt = "19.90"
quantidade = int(quantidade_txt)
preco = float(preco_txt)
total = quantidade * preco
print(total)`, c`
assert quantidade == 3 and isinstance(quantidade, int), "quantidade deveria ser o inteiro 3"
assert isinstance(preco, float) and abs(preco - 19.9) < 1e-9, "preco deveria ser o float 19.9"
assert abs(total - 59.7) < 1e-6, f"total deveria ser 59.7, mas é {total}"`),
      criar("Mensagem com número", `Dada a variável <code>pontos = 120</code>, crie <code>mensagem</code> com o texto <code>"Você fez 120 pontos"</code> usando <code>+</code> e <code>str()</code>. Mostre a mensagem.`, `<code>"Você fez " + str(pontos) + " pontos"</code>`,
        c`pontos = 120
`, c`pontos = 120
mensagem = "Você fez " + str(pontos) + " pontos"
print(mensagem)`, c`
assert mensagem == "Você fez 120 pontos", f"mensagem deveria ser 'Você fez 120 pontos', mas é {mensagem!r}"`, { padroes: [[/str\s*\(\s*pontos\s*\)/, "Use str(pontos) para converter o número."]] })
    ]
  },
  {
    id: "strings", secao: S, titulo: "Strings: criar, acessar e fatiar",
    teoria: `
      <p>Uma <b>string</b> (<code>str</code>) é um texto, entre aspas simples ou duplas: <code>'oi'</code> é igual a <code>"oi"</code>. Para textos de várias linhas, use três aspas: <code>"""..."""</code>.</p>
      <p>Uma string é uma <b>sequência de caracteres</b>, e cada um tem uma posição (índice) começando em <b>0</b>:</p>
      <pre><code>palavra = "Python"
print(palavra[0])     # P
print(palavra[-1])    # n (índice negativo conta do fim)
print(len(palavra))   # 6 (tamanho)
for letra in palavra: # percorre letra por letra
    print(letra)</code></pre>
      <p>Para saber se um trecho está no texto: <code>"py" in "happy"</code> → <code>True</code>; <code>not in</code> faz o contrário.</p>
      <!--pratica-->
      <h3>Fatiamento (slicing)</h3>
      <p><code>texto[inicio:fim]</code> pega do índice <code>inicio</code> até <b>antes</b> de <code>fim</code>:</p>
      <pre><code>t = "Bom dia, Brasil"
print(t[0:3])    # Bom
print(t[:3])     # Bom   (do começo)
print(t[9:])     # Brasil (até o fim)
print(t[-6:])    # Brasil (últimos 6)
print(t[::-1])   # lisarB ,aid moB (de trás pra frente)</code></pre>`,
    exemplo: c`cpf = "123.456.789-09"
print(cpf[:3])        # primeiros 3
print(cpf[-2:])       # dígitos verificadores
print(len(cpf))
print("789" in cpf)`,
    perguntas: [
      m("O que `\"Banana\"[1]` devolve?", ["`\"a\"`", "`\"B\"`", "`\"n\"`", "Erro"], 0, "Os índices começam em 0: `B` é 0, `a` é 1."),
      m("O que `\"Brasil\"[-3:]` devolve?", ["`\"sil\"`", "`\"Bra\"`", "`\"lis\"`", "`\"asi\"`"], 0, "`-3:` pega os 3 últimos caracteres."),
      l("Complete para pegar o tamanho do texto:", c`print(____("Python"))`, ["len"], "`len()` devolve o número de caracteres.")
    ],
    exercicios: [
      comp("Partes do CEP", `Do CEP <code>"01310-100"</code>, guarde em <code>prefixo</code> os 5 primeiros caracteres e em <code>sufixo</code> os 3 últimos.`, `<code>[:5]</code> e <code>[-3:]</code>.`,
        c`cep = "01310-100"
prefixo = cep[____]
sufixo = cep[____]
print(prefixo, sufixo)`, c`cep = "01310-100"
prefixo = cep[:5]
sufixo = cep[-3:]
print(prefixo, sufixo)`, c`
assert prefixo == "01310", f"prefixo deveria ser '01310', mas é {prefixo!r}"
assert sufixo == "100", f"sufixo deveria ser '100', mas é {sufixo!r}"`),
      criar("Iniciais e tamanho", `Crie a função <code>resumo(nome)</code> que devolve um texto com a <b>primeira letra</b>, a <b>última letra</b> e o <b>tamanho</b> do nome, separados por <code>-</code>. Ex.: <code>resumo("Carla")</code> → <code>"C-a-5"</code>.`, `Use <code>nome[0]</code>, <code>nome[-1]</code> e <code>str(len(nome))</code>.`,
        c`def resumo(nome):
    # devolva primeira-última-tamanho
    pass
`, c`def resumo(nome):
    return nome[0] + "-" + nome[-1] + "-" + str(len(nome))`, c`
assert resumo("Carla") == "C-a-5", f"resumo('Carla') deveria ser 'C-a-5', mas deu {resumo('Carla')!r}"
assert resumo("Bruno") == "B-o-5", f"resumo('Bruno') deu {resumo('Bruno')!r}"
assert resumo("Lu") == "L-u-2", f"resumo('Lu') deu {resumo('Lu')!r}"`),
      criar("Palavra ao contrário", `Crie a função <code>inverter(texto)</code> que devolve o texto de trás para frente. Ex.: <code>inverter("amor")</code> → <code>"roma"</code>.`, `O fatiamento <code>[::-1]</code> percorre do fim para o começo.`,
        c`def inverter(texto):
    pass
`, c`def inverter(texto):
    return texto[::-1]`, c`
assert inverter("amor") == "roma", f"inverter('amor') deu {inverter('amor')!r}"
assert inverter("Python") == "nohtyP", "inverter('Python') deveria ser 'nohtyP'"
assert inverter("") == "", "inverter('') deveria ser ''"`)
    ]
  },
  {
    id: "strings-metodos", secao: S, titulo: "Strings: modificar, juntar, formatar e escapar",
    teoria: `
      <p>Strings têm <b>métodos</b> (funções que você chama com ponto). Eles <b>não</b> alteram a string original: devolvem uma nova.</p>
      <pre><code>t = "  Olá, Mundo!  "
t.upper()          # "  OLÁ, MUNDO!  "
t.lower()          # "  olá, mundo!  "
t.strip()          # "Olá, Mundo!"  (tira espaços das pontas)
t.replace("O", "J")# "  Jlá, Mundo!  "
"a,b,c".split(",") # ["a", "b", "c"]
"-".join(["a", "b"])  # "a-b"</code></pre>
      <h3>Juntar (concatenar)</h3>
      <pre><code>nome = "Ana"
saudacao = "Olá, " + nome + "!"</code></pre>
      <!--pratica-->
      <h3>Formatar com f-strings</h3>
      <p>A forma moderna de montar textos com valores é a <b>f-string</b>: coloque <code>f</code> antes das aspas e as variáveis entre <code>{ }</code>:</p>
      <pre><code>preco = 59
print(f"O preço é {preco} reais")
print(f"Com 2 casas: {preco:.2f}")      # 59.00
print(f"Conta: {preco * 2}")             # dá para pôr contas</code></pre>
      <h3>Caracteres de escape</h3>
      <p>Para usar aspas dentro de aspas ou caracteres especiais, use a barra invertida:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Código</th><th>Resultado</th></tr></thead><tbody>
        <tr><td><code>\\"</code> / <code>\\'</code></td><td>aspas dentro do texto</td></tr>
        <tr><td><code>\\n</code></td><td>nova linha</td></tr>
        <tr><td><code>\\t</code></td><td>tabulação</td></tr>
        <tr><td><code>\\\\</code></td><td>uma barra invertida</td></tr>
      </tbody></table>
      <h3>Outros métodos úteis</h3>
      <p><code>capitalize()</code>, <code>title()</code>, <code>count()</code>, <code>find()</code>, <code>startswith()</code>, <code>endswith()</code>, <code>isdigit()</code>, <code>isalpha()</code>, <code>zfill()</code>, <code>center()</code>… (veja a lição de referência de métodos de string).</p>`,
    exemplo: c`email = "  Ana.Souza@Email.COM "
limpo = email.strip().lower()
print(limpo)
usuario, dominio = limpo.split("@")
print(f"Usuário: {usuario} | Domínio: {dominio}")
print("Linha 1\nLinha 2\tcom tab")
print("Ele disse \"oi\"")`,
    perguntas: [
      m("O que `\"Café\".upper()` devolve?", ["`\"CAFÉ\"`", "`\"café\"`", "`\"Café\"`", "Erro"], 0, "`upper()` passa tudo para maiúsculas."),
      m("Qual f-string mostra `Total: 10.50` quando `x = 10.5`?", ["`f\"Total: {x:.2f}\"`", "`f\"Total: x\"`", "`\"Total: {x:.2f}\"`", "`f\"Total: [x]\"`"], 0, "Precisa do `f` antes das aspas e de `{x:.2f}` para 2 casas."),
      vf("`texto.strip()` altera a variável `texto` diretamente.", false, "Strings são imutáveis: o método devolve uma nova string; guarde-a numa variável.")
    ],
    exercicios: [
      comp("Limpando o cadastro", `O nome veio com espaços e letras bagunçadas. Complete para tirar os espaços das pontas e deixar com a primeira letra de cada palavra maiúscula (<code>"Maria Da Silva"</code>).`, `<code>strip()</code> e <code>title()</code>.`,
        c`nome = "   mARIA da sILVA  "
limpo = nome.____().____()
print(limpo)`, c`nome = "   mARIA da sILVA  "
limpo = nome.strip().title()
print(limpo)`, c`
assert limpo == "Maria Da Silva", f"limpo deveria ser 'Maria Da Silva', mas é {limpo!r}"`),
      comp("Etiqueta com f-string", `Complete a f-string para mostrar <code>Produto: Queijo | Preço: R$ 28.75</code> (preço com 2 casas).`, `<code>{preco:.2f}</code>`,
        c`produto = "Queijo"
preco = 28.75
etiqueta = f"Produto: {____} | Preço: R$ {____}"
print(etiqueta)`, c`produto = "Queijo"
preco = 28.75
etiqueta = f"Produto: {produto} | Preço: R$ {preco:.2f}"
print(etiqueta)`, c`
assert etiqueta == "Produto: Queijo | Preço: R$ 28.75", f"etiqueta saiu {etiqueta!r}"`),
      criar("Separando a lista de compras", `Crie a função <code>itens(texto)</code> que recebe itens separados por vírgula (ex.: <code>"arroz, feijão ,café"</code>) e devolve uma <b>lista</b> com cada item sem espaços nas pontas e em minúsculas: <code>["arroz", "feijão", "café"]</code>.`, `Use <code>split(",")</code> e depois <code>strip()</code> e <code>lower()</code> em cada item (um <code>for</code> ou uma compreensão de lista).`,
        c`def itens(texto):
    pass
`, c`def itens(texto):
    return [i.strip().lower() for i in texto.split(",")]`, c`
assert itens("arroz, feijão ,café") == ["arroz", "feijão", "café"], f"itens(...) deu {itens('arroz, feijão ,café')}"
assert itens("Leite") == ["leite"], "itens('Leite') deveria ser ['leite']"
assert itens(" OVOS , Pão") == ["ovos", "pão"], "Tire os espaços e passe para minúsculas"`)
    ]
  },
  {
    id: "booleanos", secao: S, titulo: "Booleanos (True e False)",
    teoria: `
      <p>Um <b>booleano</b> só tem dois valores: <code>True</code> (verdadeiro) ou <code>False</code> (falso). Comparações devolvem booleanos:</p>
      <pre><code>print(10 &gt; 9)    # True
print(10 == 9)   # False
idade = 20
maior = idade &gt;= 18   # True</code></pre>
      <h3>Verdadeiro ou falso?</h3>
      <p><code>bool(x)</code> diz se um valor conta como verdadeiro. Quase tudo é <code>True</code>, exceto valores “vazios”:</p>
      <p><code>False</code>, <code>None</code>, <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, <code>()</code>, <code>{}</code> → todos são <code>False</code>.</p>
      <!--pratica-->
      <p>Isso permite escrever <code>if lista:</code> (“se a lista não estiver vazia”). Funções também podem devolver booleanos, como <code>isinstance(x, int)</code> ou <code>"a".isalpha()</code>.</p>`,
    exemplo: c`print(bool("texto"), bool(""))
print(bool(15), bool(0))
carrinho = []
if carrinho:
    print("Tem itens")
else:
    print("Carrinho vazio")`,
    perguntas: [
      m("Qual destes valores é considerado `False`?", ["`\"\"` (texto vazio)", "`\"0\"`", "`[0]`", "`-1`"], 0, "Texto vazio é falso. `\"0\"` é um texto com um caractere, então é verdadeiro."),
      vf("`5 > 3 == True` faz sentido: comparações devolvem booleanos.", true, "`5 > 3` devolve `True`.")
    ],
    exercicios: [
      comp("Pode comprar?", `Complete para que <code>pode_comprar</code> seja <code>True</code> quando o <code>saldo</code> for maior ou igual ao <code>preco</code>.`, `Use o operador de comparação “maior ou igual”.`,
        c`saldo = 50
preco = 35
pode_comprar = saldo ____ preco
print(pode_comprar)`, c`saldo = 50
preco = 35
pode_comprar = saldo >= preco
print(pode_comprar)`, c`
assert pode_comprar is True, "pode_comprar deveria ser True"`, { padroes: [[/>=/, "Use >= (maior ou igual)."]] }),
      criar("Campo preenchido", `Crie a função <code>preenchido(valor)</code> que devolve <code>True</code> se o valor não for vazio (texto vazio, <code>None</code>, lista vazia, 0) e <code>False</code> caso contrário.`, `<code>bool(valor)</code> faz exatamente isso.`,
        c`def preenchido(valor):
    pass
`, c`def preenchido(valor):
    return bool(valor)`, c`
assert preenchido("Ana") is True, "preenchido('Ana') deveria ser True"
assert preenchido("") is False, "preenchido('') deveria ser False"
assert preenchido(None) is False, "preenchido(None) deveria ser False"
assert preenchido([]) is False and preenchido([1]) is True, "Listas: vazia é False"`)
    ]
  },
  {
    id: "operadores", secao: S, titulo: "Operadores",
    teoria: `
      <h3>Aritméticos</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Op.</th><th>Nome</th><th>Exemplo</th></tr></thead><tbody>
        <tr><td><code>+ - *</code></td><td>soma, subtração, multiplicação</td><td><code>5 * 2</code> → 10</td></tr>
        <tr><td><code>/</code></td><td>divisão (sempre float)</td><td><code>7 / 2</code> → 3.5</td></tr>
        <tr><td><code>//</code></td><td>divisão inteira</td><td><code>7 // 2</code> → 3</td></tr>
        <tr><td><code>%</code></td><td>resto</td><td><code>7 % 2</code> → 1</td></tr>
        <tr><td><code>**</code></td><td>potência</td><td><code>2 ** 3</code> → 8</td></tr>
      </tbody></table>
      <h3>Atribuição</h3>
      <p><code>x += 3</code> é o mesmo que <code>x = x + 3</code>. Existem também <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>//=</code>, <code>%=</code>, <code>**=</code>… e o “operador morsa” <code>:=</code>, que atribui e devolve o valor numa expressão.</p>
      <h3>Comparação</h3>
      <p><code>==</code> igual, <code>!=</code> diferente, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Dá para encadear: <code>1 &lt; x &lt; 10</code>.</p>
      <!--pratica-->
      <h3>Lógicos</h3>
      <p><code>and</code> (os dois verdadeiros), <code>or</code> (pelo menos um), <code>not</code> (inverte).</p>
      <h3>Identidade e pertencimento</h3>
      <ul>
        <li><code>is</code> / <code>is not</code>: é o <b>mesmo objeto</b> na memória (use com <code>None</code>: <code>x is None</code>);</li>
        <li><code>in</code> / <code>not in</code>: está dentro de uma sequência (<code>"a" in "casa"</code>, <code>3 in [1, 2, 3]</code>).</li>
      </ul>
      <h3>Bit a bit</h3>
      <p><code>&amp;</code> E, <code>|</code> OU, <code>^</code> OU exclusivo, <code>~</code> NÃO, <code>&lt;&lt;</code> e <code>&gt;&gt;</code> deslocamentos. Usados em permissões, flags e redes.</p>
      <h3>Operador ternário</h3>
      <pre><code>situacao = "aprovado" if nota &gt;= 6 else "reprovado"</code></pre>
      <h3>Precedência</h3>
      <p>Ordem: <code>()</code> → <code>**</code> → <code>* / // %</code> → <code>+ -</code> → comparações → <code>not</code> → <code>and</code> → <code>or</code>. Na dúvida, use parênteses!</p>`,
    exemplo: c`minutos = 135
print(minutos // 60, "h", minutos % 60, "min")
x = 10
x += 5
print(x)
print(2 + 3 * 4, (2 + 3) * 4)
nota = 7
print("aprovado" if nota >= 6 else "reprovado")
print(5 in [1, 3, 5], None is None)`,
    perguntas: [
      m("Quanto é `17 % 5`?", ["2", "3", "3.4", "12"], 0, "`%` é o resto: 17 = 5 × 3 + **2**."),
      m("Quanto é `2 + 3 * 4`?", ["14", "20", "24", "9"], 0, "A multiplicação vem antes da soma: 3 × 4 = 12; 2 + 12 = 14."),
      l("Complete o operador ternário:", c`status = "maior" ____ idade >= 18 else "menor"`, ["if"], "A forma é: `valor_se_sim if condição else valor_se_não`."),
      m("Qual a forma recomendada de testar se `x` é `None`?", ["`x is None`", "`x == None`", "`x = None`", "`None in x`"], 0, "Para `None`, use o operador de identidade `is`.")
    ],
    exercicios: [
      comp("Horas e minutos", `Converta <code>total_min = 135</code> em horas e minutos: <code>horas</code> deve ser 2 e <code>minutos</code> deve ser 15.`, `Divisão inteira <code>//</code> e resto <code>%</code>.`,
        c`total_min = 135
horas = total_min ____ 60
minutos = total_min ____ 60
print(horas, minutos)`, c`total_min = 135
horas = total_min // 60
minutos = total_min % 60
print(horas, minutos)`, c`
assert horas == 2, f"horas deveria ser 2, mas é {horas}"
assert minutos == 15, f"minutos deveria ser 15, mas é {minutos}"`),
      comp("Frete grátis", `Complete: o frete é grátis (<code>frete_gratis = True</code>) se o <code>total</code> for pelo menos 100 <b>ou</b> se o cliente for <code>vip</code>.`, `Use <code>&gt;=</code> e o operador lógico “ou”.`,
        c`total = 80
vip = True
frete_gratis = total ____ 100 ____ vip
print(frete_gratis)`, c`total = 80
vip = True
frete_gratis = total >= 100 or vip
print(frete_gratis)`, c`
assert frete_gratis is True, "Com vip = True o frete deveria ser grátis"`, { padroes: [[/>=\s*100\s+or\s+vip/, "Use total >= 100 or vip."]] }),
      criar("Par ou ímpar", `Crie a função <code>par_ou_impar(n)</code> que devolve <code>"par"</code> ou <code>"ímpar"</code>, usando <code>%</code> e o operador ternário (uma linha só no <code>return</code>).`, `<code>return "par" if n % 2 == 0 else "ímpar"</code>`,
        c`def par_ou_impar(n):
    pass
`, c`def par_ou_impar(n):
    return "par" if n % 2 == 0 else "ímpar"`, c`
assert par_ou_impar(4) == "par", "4 é par"
assert par_ou_impar(7) == "ímpar", "7 é ímpar"
assert par_ou_impar(0) == "par", "0 é par"`),
      criar("Juros compostos", `Crie a função <code>montante(capital, taxa, meses)</code> que devolve <code>capital * (1 + taxa) ** meses</code>, arredondado com 2 casas (<code>round(..., 2)</code>). Ex.: <code>montante(1000, 0.01, 12)</code> → <code>1126.83</code>.`, `Potência é <code>**</code>.`,
        c`def montante(capital, taxa, meses):
    pass
`, c`def montante(capital, taxa, meses):
    return round(capital * (1 + taxa) ** meses, 2)`, c`
assert montante(1000, 0.01, 12) == 1126.83, f"montante(1000, 0.01, 12) deu {montante(1000, 0.01, 12)}"
assert montante(500, 0.1, 2) == 605.0, f"montante(500, 0.1, 2) deu {montante(500, 0.1, 2)}"`)
    ]
  }
];
