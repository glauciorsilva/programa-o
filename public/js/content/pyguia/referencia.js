// Python de A a Z — Parte 11: referência (funções embutidas, métodos, palavras-chave,
// exceções, módulos random/statistics/math) e "Como fazer".
import { m, vf, l, c, comp, criar } from "./util.js";

const S = "11. Referência rápida";

const tabela = (linhas) => `<table class="sqlp-tabela-teoria"><thead><tr><th>Nome</th><th>O que faz</th></tr></thead><tbody>
  ${linhas.map(([n, d]) => `<tr><td><code>${n}</code></td><td>${d}</td></tr>`).join("")}
</tbody></table>`;

export default [
  {
    id: "ref-embutidas", secao: S, titulo: "Funções embutidas (built-in)",
    teoria: `
      <p>Funções que já vêm no Python, sem importar nada:</p>
      ${tabela([
        ["abs(x)", "valor absoluto"], ["all(it) / any(it)", "todos / algum item verdadeiro"],
        ["bin(x) / oct(x) / hex(x)", "número em binário / octal / hexadecimal"], ["bool(x)", "converte para booleano"],
        ["chr(n) / ord(c)", "código → caractere / caractere → código"], ["dict() list() set() tuple() frozenset()", "criam coleções"],
        ["dir(obj)", "lista atributos e métodos"], ["divmod(a, b)", "(quociente, resto)"],
        ["enumerate(it)", "pares (índice, item)"], ["eval(txt) / exec(txt)", "executam código em texto (⚠️ perigoso com texto do usuário)"],
        ["filter(f, it) / map(f, it)", "filtra / transforma itens"], ["float() int() str() complex()", "conversões"],
        ["format(v, fmt)", "formata um valor"], ["getattr() setattr() hasattr() delattr()", "mexem em atributos pelo nome"],
        ["globals() / locals() / vars()", "dicionários de nomes"], ["help(obj)", "documentação"],
        ["id(obj)", "identidade (endereço) do objeto"], ["input()", "lê do teclado"],
        ["isinstance() / issubclass()", "testam tipo / herança"], ["iter() / next()", "iteradores"],
        ["len(x)", "tamanho"], ["max() / min() / sum()", "maior / menor / soma"],
        ["open()", "abre arquivo"], ["pow(a, b)", "potência"], ["print()", "mostra na tela"],
        ["range()", "sequência de números"], ["reversed() / sorted()", "inverte / ordena (nova sequência)"],
        ["round(x, n)", "arredonda"], ["slice()", "objeto de fatiamento"], ["super()", "acessa a classe pai"],
        ["type(x)", "tipo do valor"], ["zip(a, b)", "junta sequências par a par"],
        ["bytes() / bytearray() / memoryview()", "dados binários"], ["callable(x)", "pode ser chamado?"], ["ascii(x)", "texto só com ASCII"]
      ])}
      <!--pratica-->`,
    exemplo: c`nomes = ["Ana", "Bia", "Caio"]
notas = [8, 9.5, 7]
for i, (n, x) in enumerate(zip(nomes, notas), start=1):
    print(i, n, x)
print(divmod(17, 5), all(x >= 7 for x in notas), any(x > 9 for x in notas))
print(sorted(nomes, reverse=True), list(map(len, nomes)))
print(ord("A"), chr(66), bin(10), hex(255))`,
    perguntas: [
      m("O que `list(zip([1, 2], [\"a\", \"b\"]))` devolve?", ["`[(1, \"a\"), (2, \"b\")]`", "`[1, 2, \"a\", \"b\"]`", "`[(1, 2), (\"a\", \"b\")]`", "Erro"], 0, "`zip` junta os itens par a par."),
      m("Quanto é `divmod(17, 5)`?", ["`(3, 2)`", "`(2, 3)`", "`3.4`", "`(17, 5)`"], 0, "Quociente 3, resto 2."),
      m("`any([0, \"\", 5])` dá…", ["`True`", "`False`", "`5`", "Erro"], 0, "Basta um item verdadeiro (o 5).")
    ],
    exercicios: [
      criar("Boletim com zip", `Crie <code>boletim(nomes, notas)</code> que devolve uma lista de textos <code>"1. Ana: 8"</code>, <code>"2. Bia: 9.5"</code>… usando <code>enumerate</code> e <code>zip</code>.`, `<code>for i, (n, x) in enumerate(zip(nomes, notas), start=1):</code>`,
        c`def boletim(nomes, notas):
    pass
`, c`def boletim(nomes, notas):
    return [f"{i}. {n}: {x}" for i, (n, x) in enumerate(zip(nomes, notas), start=1)]`, c`
assert boletim(["Ana", "Bia"], [8, 9.5]) == ["1. Ana: 8", "2. Bia: 9.5"], f"Deu {boletim(['Ana', 'Bia'], [8, 9.5])}"`, { padroes: [[/zip\s*\(/, "Use zip()."], [/enumerate\s*\(/, "Use enumerate()."]] }),
      criar("Todos aprovados?", `Crie <code>situacao(notas)</code> que devolve <code>"todos aprovados"</code> se todas as notas forem ≥ 6, <code>"alguns aprovados"</code> se pelo menos uma for, e <code>"ninguém aprovado"</code> caso contrário. Use <code>all()</code> e <code>any()</code>.`, `Teste primeiro o <code>all</code>, depois o <code>any</code>.`,
        c`def situacao(notas):
    pass
`, c`def situacao(notas):
    if all(n >= 6 for n in notas):
        return "todos aprovados"
    if any(n >= 6 for n in notas):
        return "alguns aprovados"
    return "ninguém aprovado"`, c`
assert situacao([7, 8]) == "todos aprovados" and situacao([5, 9]) == "alguns aprovados" and situacao([2, 3]) == "ninguém aprovado", "Confira os três casos"`, { padroes: [[/all\s*\(/, "Use all()."], [/any\s*\(/, "Use any()."]] })
    ]
  },
  {
    id: "ref-strings", secao: S, titulo: "Métodos de string",
    teoria: `
      ${tabela([
        ["capitalize() / title()", "1ª letra maiúscula / de cada palavra"], ["upper() / lower() / casefold() / swapcase()", "maiúsculas / minúsculas / minúsculas agressivo / inverte"],
        ["center(n) / ljust(n) / rjust(n) / zfill(n)", "alinha / completa com zeros"], ["count(sub)", "quantas vezes aparece"],
        ["encode()", "texto → bytes"], ["startswith() / endswith()", "começa / termina com"],
        ["find(sub) / rfind(sub)", "posição (ou −1)"], ["index(sub) / rindex(sub)", "posição (ou erro)"],
        ["format() / format_map()", "formata"], ["isalnum() isalpha() isdigit() isdecimal() isnumeric()", "só letras/números…"],
        ["islower() isupper() istitle() isspace() isprintable() isidentifier() isascii()", "outros testes"],
        ["join(lista)", "junta itens com o texto como separador"], ["strip() / lstrip() / rstrip()", "tira espaços (ou caracteres)"],
        ["replace(a, b)", "troca"], ["split(sep) / rsplit() / splitlines()", "divide em lista"],
        ["partition(sep) / rpartition()", "divide em 3 partes"], ["maketrans() / translate()", "troca vários caracteres de uma vez"],
        ["expandtabs()", "troca tabs por espaços"]
      ])}
      <!--pratica-->`,
    exemplo: c`t = "  Python é Demais  "
print(t.strip().lower(), t.count("e"), t.find("é"))
print("42".zfill(5), "oi".center(8, "*"), "2025-03-09".split("-"))
print("usuario@email.com".partition("@"))
sem_acento = str.maketrans("áéíóúãç", "aeiouac")
print("ação é útil".translate(sem_acento))`,
    perguntas: [
      m("O que `\"banana\".count(\"a\")` devolve?", ["3", "1", "2", "6"], 0, "A letra a aparece 3 vezes."),
      m("Qual método devolve −1 quando não encontra?", ["`find()`", "`index()`", "`count()`", "`search()`"], 0, "`index()` levanta erro em vez de devolver −1.")
    ],
    exercicios: [
      criar("Normalizar para busca", `Crie <code>normalizar(texto)</code> que tira espaços das pontas, passa para minúsculas e remove os acentos de <code>áàâãéêíóôõúç</code> (trocando por <code>aaaaeeiooouc</code>) usando <code>str.maketrans</code> e <code>translate</code>.`, `<code>tabela = str.maketrans("áàâãéêíóôõúç", "aaaaeeiooouc")</code>`,
        c`def normalizar(texto):
    pass
`, c`def normalizar(texto):
    tabela = str.maketrans("áàâãéêíóôõúç", "aaaaeeiooouc")
    return texto.strip().lower().translate(tabela)`, c`
assert normalizar("  Pão de Açúcar ") == "pao de acucar", f"Deu {normalizar('  Pão de Açúcar ')!r}"
assert normalizar("ÁRVORE") == "arvore", "Maiúsculas acentuadas: passe para minúsculas antes de traduzir"`)
    ]
  },
  {
    id: "ref-colecoes", secao: S, titulo: "Métodos de lista, dicionário, tupla e set",
    teoria: `
      <h3>Lista</h3>
      ${tabela([["append(x)", "adiciona no fim"], ["clear()", "esvazia"], ["copy()", "cópia"], ["count(x)", "quantas vezes x aparece"], ["extend(it)", "acrescenta vários"], ["index(x)", "posição de x"], ["insert(i, x)", "insere na posição"], ["pop(i)", "remove e devolve"], ["remove(x)", "remove pelo valor"], ["reverse()", "inverte"], ["sort()", "ordena"]])}
      <h3>Dicionário</h3>
      ${tabela([["clear() / copy()", "esvazia / copia"], ["fromkeys(chaves, v)", "cria dict com as chaves"], ["get(k, padrão)", "valor sem erro"], ["items() / keys() / values()", "pares / chaves / valores"], ["pop(k) / popitem()", "remove"], ["setdefault(k, v)", "devolve o valor; se não existir, cria com v"], ["update(outro)", "junta/atualiza"]])}
      <!--pratica-->
      <h3>Tupla</h3>
      ${tabela([["count(x)", "quantas vezes x aparece"], ["index(x)", "posição de x"]])}
      <h3>Set</h3>
      ${tabela([["add() / update()", "adiciona"], ["remove() / discard() / pop() / clear()", "remove"], ["union() |", "união"], ["intersection() &amp;", "interseção"], ["difference() -", "diferença"], ["symmetric_difference() ^", "diferença simétrica"], ["…_update()", "versões que alteram o próprio set"], ["issubset() &lt;= / issuperset() &gt;= / isdisjoint()", "comparações"], ["copy()", "cópia"]])}`,
    exemplo: c`estoque = dict.fromkeys(["arroz", "feijão"], 0)
estoque.setdefault("café", 5)
estoque.update({"arroz": 10})
print(estoque)
a, b = {1, 2, 3}, {2, 3}
print(b.issubset(a), a.isdisjoint({9}), a.symmetric_difference({3, 4}))`,
    perguntas: [
      m("O que `{\"a\": 1}.setdefault(\"b\", 7)` devolve?", ["7 (e cria a chave b)", "None", "1", "Erro"], 0, "Se a chave não existe, cria com o valor dado e devolve esse valor."),
      vf("`{1, 2}.issubset({1, 2, 3})` é `True`.", true, "Todos os itens do primeiro estão no segundo.")
    ],
    exercicios: [
      criar("Agrupar por cidade", `Crie <code>agrupar(clientes)</code> que recebe uma lista de tuplas <code>(nome, cidade)</code> e devolve um dicionário <code>cidade: [nomes]</code>, usando <code>setdefault</code>.`, `<code>grupos.setdefault(cidade, []).append(nome)</code>`,
        c`def agrupar(clientes):
    pass
`, c`def agrupar(clientes):
    grupos = {}
    for nome, cidade in clientes:
        grupos.setdefault(cidade, []).append(nome)
    return grupos`, c`
r = agrupar([("Ana", "Natal"), ("Bia", "Recife"), ("Caio", "Natal")])
assert r == {"Natal": ["Ana", "Caio"], "Recife": ["Bia"]}, f"Deu {r}"`, { padroes: [[/setdefault/, "Use setdefault."]] })
    ]
  },
  {
    id: "ref-palavras", secao: S, titulo: "Palavras-chave e exceções",
    teoria: `
      <h3>Palavras-chave (não podem ser nomes de variáveis)</h3>
      <p><code>and as assert async await break case class continue def del elif else except False finally for from global if import in is lambda match None nonlocal not or pass raise return True try while with yield</code></p>
      <p>Destaques que ainda não vimos: <code>assert</code> (confere uma condição e levanta <code>AssertionError</code> se for falsa, muito usado em testes) e <code>async</code>/<code>await</code> (código assíncrono, que espera operações lentas, como rede, sem travar).</p>
      <!--pratica-->
      <h3>Exceções mais comuns</h3>
      ${tabela([
        ["ValueError", "valor inválido para a operação (int(\"abc\"))"], ["TypeError", "tipo errado (\"a\" + 1)"],
        ["NameError", "nome não definido"], ["IndexError", "índice fora da lista"], ["KeyError", "chave inexistente no dicionário"],
        ["ZeroDivisionError", "divisão por zero"], ["AttributeError", "atributo/método não existe"],
        ["FileNotFoundError", "arquivo não encontrado (um OSError)"], ["ImportError / ModuleNotFoundError", "módulo não encontrado"],
        ["IndentationError / SyntaxError", "erro de escrita do código"], ["StopIteration", "iterador acabou"],
        ["RecursionError", "recursão profunda demais"], ["AssertionError", "assert falhou"],
        ["KeyboardInterrupt", "usuário apertou Ctrl+C"], ["UnicodeDecodeError", "erro de codificação de texto"],
        ["Exception", "a base de quase todas as exceções"]
      ])}`,
    perguntas: [
      m("Qual exceção `[1, 2][5]` levanta?", ["`IndexError`", "`KeyError`", "`ValueError`", "`TypeError`"], 0, "Índice fora da lista."),
      m("Qual exceção `{\"a\": 1}[\"b\"]` levanta?", ["`KeyError`", "`IndexError`", "`NameError`", "`AttributeError`"], 0, "Chave inexistente."),
      m("Qual exceção `\"a\" + 1` levanta?", ["`TypeError`", "`ValueError`", "`SyntaxError`", "nenhuma"], 0, "Não dá para somar texto com número.")
    ],
    exercicios: [
      criar("Qual é o erro?", `Crie <code>nome_do_erro(funcao)</code> que executa <code>funcao()</code> e devolve o <b>nome</b> da exceção levantada (ex.: <code>"ZeroDivisionError"</code>), ou <code>"nenhum"</code> se não houver erro.`, `<code>except Exception as e: return type(e).__name__</code>`,
        c`def nome_do_erro(funcao):
    pass
`, c`def nome_do_erro(funcao):
    try:
        funcao()
    except Exception as e:
        return type(e).__name__
    return "nenhum"`, c`
assert nome_do_erro(lambda: 1 / 0) == "ZeroDivisionError", "1 / 0"
assert nome_do_erro(lambda: [1][3]) == "IndexError", "[1][3]"
assert nome_do_erro(lambda: {}["x"]) == "KeyError", "{}['x']"
assert nome_do_erro(lambda: int("abc")) == "ValueError", "int('abc')"
assert nome_do_erro(lambda: 2 + 2) == "nenhum", "Sem erro: 'nenhum'"`)
    ]
  },
  {
    id: "ref-modulos", secao: S, titulo: "Módulos random, statistics, math e cmath",
    teoria: `
      <h3>random</h3>
      ${tabela([["seed(n)", "fixa a sequência (resultados repetíveis)"], ["random()", "decimal entre 0 e 1"], ["randint(a, b)", "inteiro de a a b (inclusive)"], ["randrange(a, b, passo)", "inteiro como no range"], ["uniform(a, b)", "decimal entre a e b"], ["choice(seq)", "um item"], ["choices(seq, k=n)", "n itens (com repetição)"], ["sample(seq, n)", "n itens sem repetição"], ["shuffle(lista)", "embaralha a lista"], ["getstate() / setstate() / getrandbits() / triangular()", "outros"]])}
      <h3>statistics</h3>
      ${tabela([["mean() / median() / mode()", "média / mediana / moda"], ["median_low() / median_high() / median_grouped()", "variações da mediana"], ["harmonic_mean()", "média harmônica"], ["stdev() / variance()", "desvio / variância da amostra"], ["pstdev() / pvariance()", "da população"]])}
      <!--pratica-->
      <h3>math (destaques)</h3>
      ${tabela([["sqrt() isqrt() pow() exp() log() log10() log2()", "raízes, potências e logaritmos"], ["ceil() floor() trunc() fabs()", "arredondamentos"], ["factorial() comb() perm() gcd() lcm() prod() fsum()", "combinatória e somas"], ["sin() cos() tan() asin() … degrees() radians() hypot() dist()", "trigonometria e distâncias"], ["isclose() isfinite() isinf() isnan()", "testes"], ["pi e tau inf nan", "constantes"]])}
      <p>O <code>cmath</code> tem as mesmas funções para números complexos (<code>cmath.sqrt(-1)</code> → <code>1j</code>), além de <code>phase()</code>, <code>polar()</code> e <code>rect()</code>.</p>`,
    exemplo: c`import random, statistics, math
random.seed(7)
participantes = ["Ana", "Bia", "Caio", "Davi", "Eva"]
print("Sorteados:", random.sample(participantes, 2))
dados = [random.randint(1, 6) for _ in range(20)]
print(dados, statistics.mean(dados), statistics.pstdev(dados))
print(math.comb(60, 6), "jogos possíveis na Mega-Sena")`,
    perguntas: [
      m("Qual função sorteia **sem repetir**?", ["`random.sample()`", "`random.choices()`", "`random.choice()`", "`random.shuffle()`"], 0, "`choices` pode repetir; `sample` não."),
      m("`math.comb(5, 2)` calcula…", ["combinações de 5 tomados 2 a 2 (10)", "5 elevado a 2", "5 vezes 2", "o fatorial de 5"], 0, "C(5, 2) = 10.")
    ],
    exercicios: [
      criar("Amigo secreto", `Crie <code>sortear(nomes, semente)</code> que fixa <code>random.seed(semente)</code>, faz uma <b>cópia</b> da lista, embaralha com <code>random.shuffle</code> e devolve a cópia embaralhada (a lista original não pode mudar).`, `<code>copia = nomes.copy()</code>`,
        c`import random

def sortear(nomes, semente):
    pass
`, c`import random

def sortear(nomes, semente):
    random.seed(semente)
    copia = nomes.copy()
    random.shuffle(copia)
    return copia`, c`
n = ["Ana", "Bia", "Caio", "Davi"]
r = sortear(n, 1)
assert sorted(r) == sorted(n), "A lista sorteada deve ter os mesmos nomes"
assert n == ["Ana", "Bia", "Caio", "Davi"], "A lista original não pode mudar"
assert sortear(n, 1) == r, "Com a mesma semente, o resultado deve ser igual"
random.seed(1); _e = n.copy(); random.shuffle(_e)
assert r == _e, "Use random.seed(semente) e depois random.shuffle na cópia"`)
    ]
  },
  {
    id: "como-fazer", secao: S, titulo: "Como fazer: duplicados, inverter texto, somar números",
    teoria: `
      <h3>Remover duplicados de uma lista (mantendo a ordem)</h3>
      <pre><code>lista = ["a", "b", "a", "c", "b"]
sem_dup = list(dict.fromkeys(lista))   # ['a', 'b', 'c']
# se a ordem não importa: list(set(lista))</code></pre>
      <h3>Inverter um texto</h3>
      <pre><code>"Olá mundo"[::-1]     # 'odnum álO'</code></pre>
      <!--pratica-->
      <h3>Somar dois números digitados</h3>
      <pre><code>x = input("Primeiro número: ")
y = input("Segundo número: ")
print("Soma:", int(x) + int(y))</code></pre>
      <h3>Próximos passos</h3>
      <ul>
        <li>Pratique nas trilhas 🐍 <a href="#/trilha/python">Python</a> e no 🧪 <a href="#/sandbox">Sandbox</a>;</li>
        <li>Para dados: <b>pandas</b> e a trilha de Ciência de Dados;</li>
        <li>Para web: <b>FastAPI</b>, <b>Flask</b> ou <b>Django</b>;</li>
        <li>Leia a documentação oficial em <b>docs.python.org</b> (existe versão em português).</li>
      </ul>`,
    perguntas: [
      m("Qual destas remove duplicados **mantendo a ordem**?", ["`list(dict.fromkeys(lista))`", "`list(set(lista))`", "`sorted(lista)`", "`lista.unique()`"], 0, "O dicionário mantém a ordem de inserção; o set não garante ordem."),
      l("Complete para inverter o texto:", c`invertido = texto[____]`, ["::-1"], "Passo −1 percorre do fim para o começo.")
    ],
    exercicios: [
      criar("Sem duplicados", `Crie <code>sem_duplicados(itens)</code> que devolve a lista sem repetições, <b>mantendo a ordem</b> da primeira aparição.`, `<code>list(dict.fromkeys(itens))</code>`,
        c`def sem_duplicados(itens):
    pass
`, c`def sem_duplicados(itens):
    return list(dict.fromkeys(itens))`, c`
assert sem_duplicados(["b", "a", "b", "c", "a"]) == ["b", "a", "c"], f"Deu {sem_duplicados(['b', 'a', 'b', 'c', 'a'])}"
assert sem_duplicados([]) == [], "Lista vazia: []"`),
      criar("Palíndromo", `Crie <code>palindromo(texto)</code> que devolve <code>True</code> se o texto for igual de trás para frente, ignorando espaços e maiúsculas. Ex.: <code>"Socorram me subi no onibus em Marrocos"</code> → True.`, `Limpe com <code>texto.replace(" ", "").lower()</code> e compare com o inverso <code>[::-1]</code>.`,
        c`def palindromo(texto):
    pass
`, c`def palindromo(texto):
    t = texto.replace(" ", "").lower()
    return t == t[::-1]`, c`
assert palindromo("Socorram me subi no onibus em Marrocos") is True, "É palíndromo"
assert palindromo("Ana") is True and palindromo("Python") is False, "Confira 'Ana' e 'Python'"`)
    ]
  }
];
