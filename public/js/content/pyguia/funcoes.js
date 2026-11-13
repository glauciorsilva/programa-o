// Python de A a Z — Parte 4: funções e Parte 5: módulos e recursos da linguagem.
import { m, vf, l, c, comp, criar } from "./util.js";

const S4 = "4. Funções";
const S5 = "5. Módulos e recursos do dia a dia";

export default [
  {
    id: "funcoes", secao: S4, titulo: "Funções e argumentos",
    teoria: `
      <p>Uma <b>função</b> é um bloco de código com nome, que só roda quando é <b>chamada</b>. Serve para não repetir código e organizar o programa.</p>
      <pre><code>def saudar(nome):            # nome é o parâmetro
    return f"Olá, {nome}!"   # return devolve o resultado

msg = saudar("Ana")          # "Ana" é o argumento
print(msg)</code></pre>
      <ul>
        <li>Sem <code>return</code>, a função devolve <code>None</code>.</li>
        <li>Nomes de funções seguem o mesmo estilo das variáveis: <code>calcular_total</code>.</li>
        <li>Uma função vazia precisa de <code>pass</code>.</li>
      </ul>
      <!--pratica-->
      <h3>Tipos de argumentos</h3>
      <pre><code>def pedido(item, qtd=1, embalagem="simples"):   # valores padrão
    return f"{qtd}x {item} ({embalagem})"

pedido("café")                        # posicional
pedido("pão", 6)                      # posicionais
pedido("bolo", embalagem="presente")  # por nome (keyword)</code></pre>
      <p>Também dá para obrigar só posicionais (<code>def f(a, /)</code>) ou só por nome (<code>def f(*, a)</code>). Listas e dicionários podem ser passados normalmente como argumento.</p>`,
    exemplo: c`def preco_final(preco, desconto=0):
    return round(preco * (1 - desconto), 2)

print(preco_final(100))
print(preco_final(100, 0.15))
print(preco_final(preco=80, desconto=0.5))`,
    perguntas: [
      m("O que uma função sem `return` devolve?", ["`None`", "`0`", "`\"\"`", "Dá erro"], 0, "Sem `return`, o resultado é `None`."),
      m("Em `def f(a, b=2)`, quanto vale `f(5)` se a função faz `return a * b`?", ["10", "5", "7", "Erro"], 0, "`b` usa o valor padrão 2."),
      l("Complete para criar a função:", c`____ dobro(x):
    return x * 2`, ["def"], "Funções são criadas com `def`.")
    ],
    exercicios: [
      comp("IMC", `Complete a função <code>imc(peso, altura)</code> para devolver <code>peso / altura ** 2</code> arredondado com 1 casa.`, `<code>return round(..., 1)</code>`,
        c`def imc(peso, altura):
    ____ round(peso / altura ** 2, ____)

print(imc(70, 1.75))`, c`def imc(peso, altura):
    return round(peso / altura ** 2, 1)

print(imc(70, 1.75))`, c`
assert imc(70, 1.75) == 22.9, f"imc(70, 1.75) deveria ser 22.9, deu {imc(70, 1.75)}"
assert imc(90, 1.8) == 27.8, "imc(90, 1.8) deveria ser 27.8"`),
      criar("Parcelamento", `Crie <code>parcela(valor, vezes=1, juros=0)</code> que devolve o valor de cada parcela: <code>valor * (1 + juros) / vezes</code>, com 2 casas. Ex.: <code>parcela(300, 3)</code> → 100.0; <code>parcela(300, 3, juros=0.1)</code> → 110.0.`, `Parâmetros com valor padrão vêm depois dos obrigatórios.`,
        c`def parcela(valor, vezes=1, juros=0):
    pass
`, c`def parcela(valor, vezes=1, juros=0):
    return round(valor * (1 + juros) / vezes, 2)`, c`
assert parcela(300) == 300.0, "Sem parcelas: o valor inteiro"
assert parcela(300, 3) == 100.0, "parcela(300, 3) = 100.0"
assert parcela(300, 3, juros=0.1) == 110.0, f"parcela(300, 3, juros=0.1) deu {parcela(300, 3, juros=0.1)}"`)
    ]
  },
  {
    id: "args-kwargs", secao: S4, titulo: "*args e **kwargs",
    teoria: `
      <p>Quando você não sabe <b>quantos</b> argumentos virão:</p>
      <ul>
        <li><code>*args</code> recebe os argumentos posicionais extras numa <b>tupla</b>;</li>
        <li><code>**kwargs</code> recebe os argumentos com nome extras num <b>dicionário</b>.</li>
      </ul>
      <pre><code>def somar(*numeros):
    return sum(numeros)
somar(1, 2, 3)       # 6

def ficha(**dados):
    for chave, valor in dados.items():
        print(chave, "=", valor)
ficha(nome="Ana", cidade="Natal")</code></pre>
      <!--pratica-->
      <p>Ordem na definição: <code>def f(normais, *args, com_nome, **kwargs)</code>. E o contrário (desempacotar ao chamar): <code>somar(*[1, 2, 3])</code> e <code>ficha(**{"nome": "Bia"})</code>.</p>`,
    exemplo: c`def media(*notas):
    return sum(notas) / len(notas)

def montar_url(base, **params):
    partes = [f"{k}={v}" for k, v in params.items()]
    return base + "?" + "&".join(partes)

print(media(7, 8, 9.5))
print(montar_url("https://loja.com/busca", q="café", pagina=2))`,
    perguntas: [
      m("Dentro da função, que tipo tem `args` em `def f(*args)`?", ["tupla", "lista", "dicionário", "set"], 0, "`*args` chega como tupla."),
      m("E `kwargs` em `def f(**kwargs)`?", ["dicionário", "tupla", "lista", "texto"], 0, "`**kwargs` chega como dicionário.")
    ],
    exercicios: [
      comp("Maior valor", `Complete para a função aceitar quantos números vierem e devolver o maior.`, `Um asterisco antes do nome do parâmetro.`,
        c`def maior(____numeros):
    return max(numeros)

print(maior(3, 9, 4))`, c`def maior(*numeros):
    return max(numeros)

print(maior(3, 9, 4))`, c`
assert maior(3, 9, 4) == 9 and maior(1) == 1 and maior(-5, -2) == -2, "maior() deveria aceitar qualquer quantidade de números"`),
      criar("Etiqueta flexível", `Crie <code>etiqueta(nome, **extras)</code> que devolve o nome seguido dos extras no formato <code>chave: valor</code>, separados por <code> | </code>. Ex.: <code>etiqueta("Café", preco=12, peso="1kg")</code> → <code>"Café | preco: 12 | peso: 1kg"</code>.`, `Monte uma lista com <code>[nome] + [f"{k}: {v}" for k, v in extras.items()]</code> e junte com <code>" | ".join(...)</code>.`,
        c`def etiqueta(nome, **extras):
    pass
`, c`def etiqueta(nome, **extras):
    partes = [nome] + [f"{k}: {v}" for k, v in extras.items()]
    return " | ".join(partes)`, c`
assert etiqueta("Café", preco=12, peso="1kg") == "Café | preco: 12 | peso: 1kg", f"Deu {etiqueta('Café', preco=12, peso='1kg')!r}"
assert etiqueta("Pão") == "Pão", "Sem extras: só o nome"`)
    ]
  },
  {
    id: "escopo", secao: S4, titulo: "Escopo (local, global, nonlocal)",
    teoria: `
      <p><b>Escopo</b> é a região do código onde uma variável existe.</p>
      <ul>
        <li><b>Local</b>: criada dentro de uma função; só existe lá dentro.</li>
        <li><b>Global</b>: criada fora das funções; pode ser lida em qualquer lugar.</li>
      </ul>
      <pre><code>x = 300          # global
def f():
    x = 200      # local: outra variável, não mexe na global
    print(x)     # 200
f()
print(x)         # 300</code></pre>
      <!--pratica-->
      <p>Para <b>alterar</b> a global dentro da função: <code>global x</code>. Em funções dentro de funções, para alterar a variável da função de fora: <code>nonlocal</code>.</p>
      <pre><code>def contador():
    total = 0
    def somar():
        nonlocal total
        total += 1
        return total
    return somar</code></pre>
      <p>💡 Prefira passar valores por parâmetro e devolver com <code>return</code>; abusar de <code>global</code> deixa o código difícil de entender.</p>`,
    exemplo: c`taxa = 0.1
def calcular(valor):
    imposto = valor * taxa   # lê a global
    return valor + imposto
print(calcular(100))
# print(imposto)  # erro: imposto só existe dentro da função`,
    perguntas: [
      vf("Uma variável criada dentro de uma função pode ser usada fora dela.", false, "Ela é local: só existe dentro da função."),
      m("Qual palavra permite alterar uma variável da função de fora numa função aninhada?", ["`nonlocal`", "`global`", "`outer`", "`self`"], 0, "`global` é para o escopo do módulo; `nonlocal` para a função que envolve.")
    ],
    exercicios: [
      comp("Gerador de senhas de atendimento", `Complete para que cada chamada de <code>proxima()</code> devolva o número seguinte (1, 2, 3…).`, `A função interna precisa declarar que vai alterar a variável da função de fora.`,
        c`def criar_painel():
    numero = 0
    def proxima():
        ____ numero
        numero += 1
        return numero
    return proxima

proxima = criar_painel()
print(proxima(), proxima(), proxima())`, c`def criar_painel():
    numero = 0
    def proxima():
        nonlocal numero
        numero += 1
        return numero
    return proxima

proxima = criar_painel()
print(proxima(), proxima(), proxima())`, c`
p = criar_painel()
assert [p(), p(), p()] == [1, 2, 3], "proxima() deveria devolver 1, 2, 3"`),
      criar("Sem efeito colateral", `A variável global <code>preco = 50</code> não pode mudar. Crie <code>com_aumento(percentual)</code> que <b>devolve</b> o preço com o aumento (ex.: 10 → 55.0), sem alterar <code>preco</code>.`, `Leia a global, calcule numa variável local e devolva.`,
        c`preco = 50
`, c`preco = 50

def com_aumento(percentual):
    novo = preco * (1 + percentual / 100)
    return novo`, c`
assert abs(com_aumento(10) - 55.0) < 1e-9, f"com_aumento(10) deveria ser 55.0, deu {com_aumento(10)}"
assert preco == 50, "A variável global preco não pode ser alterada"`)
    ]
  },
  {
    id: "lambda", secao: S4, titulo: "Funções lambda",
    teoria: `
      <p>Uma <b>lambda</b> é uma função pequena e sem nome, escrita numa linha. Ela pode ter vários argumentos, mas só <b>uma expressão</b> (cujo valor é devolvido).</p>
      <pre><code>dobro = lambda x: x * 2
soma = lambda a, b: a + b
print(dobro(5), soma(2, 3))</code></pre>
      <!--pratica-->
      <p>O uso mais comum é como argumento de outras funções:</p>
      <pre><code>produtos = [("café", 12), ("pão", 0.5), ("queijo", 28)]
produtos.sort(key=lambda p: p[1])                 # ordena pelo preço
caros = list(filter(lambda p: p[1] &gt; 10, produtos))
nomes = list(map(lambda p: p[0].upper(), produtos))</code></pre>
      <p>Também dá para criar funções que fabricam funções: <code>def multiplicador(n): return lambda x: x * n</code>.</p>`,
    exemplo: c`alunos = [("Ana", 8.5), ("Bia", 9.7), ("Caio", 6.0)]
print(sorted(alunos, key=lambda a: a[1], reverse=True))
def multiplicador(n):
    return lambda x: x * n
triplo = multiplicador(3)
print(triplo(7))`,
    perguntas: [
      m("Quanto vale `(lambda x, y: x * y)(3, 4)`?", ["12", "7", "34", "Erro"], 0, "A lambda multiplica os dois argumentos."),
      vf("Uma lambda pode ter várias linhas de código com `if`, `for` e `return`.", false, "Lambda tem só uma expressão. Para mais, use `def`.")
    ],
    exercicios: [
      comp("Ordenar por idade", `Complete o <code>key</code> com uma lambda que pega a idade (segundo item de cada tupla).`, `<code>lambda p: p[1]</code>`,
        c`pessoas = [("Ana", 30), ("Bia", 22), ("Caio", 41)]
pessoas.sort(key=____)
print(pessoas)`, c`pessoas = [("Ana", 30), ("Bia", 22), ("Caio", 41)]
pessoas.sort(key=lambda p: p[1])
print(pessoas)`, c`
assert pessoas == [("Bia", 22), ("Ana", 30), ("Caio", 41)], f"pessoas ficou {pessoas}"`, { padroes: [[/lambda/, "Use uma lambda no key."]] }),
      criar("Filtro de aprovados", `Crie <code>aprovados(notas)</code> que recebe um dicionário <code>nome: nota</code> e devolve a lista de nomes com nota maior ou igual a 6, usando <code>filter</code> com <code>lambda</code>.`, `<code>list(filter(lambda n: notas[n] &gt;= 6, notas))</code>`,
        c`def aprovados(notas):
    pass
`, c`def aprovados(notas):
    return list(filter(lambda n: notas[n] >= 6, notas))`, c`
assert aprovados({"Ana": 7, "Bia": 5.5, "Caio": 6}) == ["Ana", "Caio"], f"Deu {aprovados({'Ana': 7, 'Bia': 5.5, 'Caio': 6})}"`, { padroes: [[/filter\s*\(\s*lambda/, "Use filter(lambda ...)."]] })
    ]
  },
  {
    id: "recursao", secao: S4, titulo: "Recursão",
    teoria: `
      <p><b>Recursão</b> é quando uma função chama <b>a si mesma</b>. Toda função recursiva precisa de:</p>
      <ol>
        <li>um <b>caso base</b>, que para a recursão;</li>
        <li>um <b>passo recursivo</b>, que se aproxima do caso base.</li>
      </ol>
      <pre><code>def fatorial(n):
    if n &lt;= 1:            # caso base
        return 1
    return n * fatorial(n - 1)   # passo recursivo

print(fatorial(5))   # 5 * 4 * 3 * 2 * 1 = 120</code></pre>
      <!--pratica-->
      <p>⚠️ Sem caso base, a função se chama para sempre e dá <code>RecursionError</code> (o Python limita a ~1000 chamadas). Recursão é natural para estruturas em árvore: pastas, menus, categorias, JSON aninhado.</p>`,
    exemplo: c`def contagem(n):
    if n == 0:
        print("Fogo!")
        return
    print(n)
    contagem(n - 1)
contagem(3)

def soma_lista(nums):
    if not nums:
        return 0
    return nums[0] + soma_lista(nums[1:])
print(soma_lista([4, 5, 6]))`,
    perguntas: [
      m("O que acontece numa função recursiva **sem** caso base?", ["Ela se chama sem parar até dar `RecursionError`", "Ela devolve `None`", "Ela roda uma vez só", "O Python adiciona um caso base sozinho"], 0, "Sempre defina quando a recursão para."),
      m("Quanto vale `fatorial(4)` usando a função da explicação?", ["24", "10", "16", "4"], 0, "4 × 3 × 2 × 1 = 24.")
    ],
    exercicios: [
      comp("Fibonacci", `Complete a função recursiva: <code>fib(0) = 0</code>, <code>fib(1) = 1</code> e <code>fib(n) = fib(n-1) + fib(n-2)</code>.`, `O caso base devolve o próprio n; o passo chama fib duas vezes.`,
        c`def fib(n):
    if n < 2:
        return ____
    return fib(n - 1) + fib(____)`, c`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`, c`
assert [fib(i) for i in range(8)] == [0, 1, 1, 2, 3, 5, 8, 13], f"fib deu {[fib(i) for i in range(8)]}"`),
      criar("Somar os dígitos", `Crie a função <b>recursiva</b> <code>soma_digitos(n)</code>: soma os dígitos de um inteiro positivo. Ex.: <code>soma_digitos(472)</code> = 4 + 7 + 2 = 13. Caso base: n menor que 10.`, `<code>n % 10</code> é o último dígito e <code>n // 10</code> é o resto do número.`,
        c`def soma_digitos(n):
    pass
`, c`def soma_digitos(n):
    if n < 10:
        return n
    return n % 10 + soma_digitos(n // 10)`, c`
assert soma_digitos(472) == 13, f"soma_digitos(472) deu {soma_digitos(472)}"
assert soma_digitos(5) == 5 and soma_digitos(1000) == 1, "Confira os casos 5 e 1000"`, { padroes: [[/soma_digitos\s*\([^)]*\/\/\s*10/, "A função deve chamar a si mesma com n // 10."]] })
    ]
  },
  {
    id: "decorators", secao: S4, titulo: "Decorators",
    teoria: `
      <p>Um <b>decorator</b> é uma função que “embrulha” outra para acrescentar um comportamento (log, tempo de execução, verificação de login…) <b>sem mexer</b> no código dela.</p>
      <pre><code>def em_maiusculas(func):
    def embrulho(*args, **kwargs):
        resultado = func(*args, **kwargs)
        return resultado.upper()
    return embrulho

@em_maiusculas          # é o mesmo que: saudar = em_maiusculas(saudar)
def saudar(nome):
    return f"olá, {nome}"

print(saudar("ana"))    # OLÁ, ANA</code></pre>
      <!--pratica-->
      <ul>
        <li>Use <code>*args, **kwargs</code> no embrulho para aceitar qualquer argumento.</li>
        <li>Dá para empilhar vários decorators (o de baixo é aplicado primeiro).</li>
        <li>Decorators com argumento são uma função a mais por fora: <code>@repetir(3)</code>.</li>
        <li><code>functools.wraps(func)</code> preserva o nome e a documentação da função original.</li>
      </ul>
      <p>💼 Você vai ver muito em frameworks: <code>@app.get("/")</code> (FastAPI/Flask), <code>@property</code>, <code>@staticmethod</code>.</p>`,
    exemplo: c`import functools

def registrar(func):
    @functools.wraps(func)
    def embrulho(*args, **kwargs):
        print(f"Chamando {func.__name__} com {args}")
        return func(*args, **kwargs)
    return embrulho

@registrar
def somar(a, b):
    return a + b

print(somar(2, 3))`,
    perguntas: [
      m("`@meu_decorator` em cima de `def f()` equivale a…", ["`f = meu_decorator(f)`", "`meu_decorator = f(meu_decorator)`", "`f()` seguido de `meu_decorator()`", "Nada; é só um comentário"], 0, "O decorator recebe a função e devolve a versão embrulhada."),
      vf("Um decorator precisa alterar o código da função original.", false, "Ele acrescenta comportamento por fora, sem mexer nela.")
    ],
    exercicios: [
      comp("Dobrando o resultado", `Complete o decorator <code>dobrar</code> para que a função decorada devolva o <b>dobro</b> do resultado.`, `O embrulho chama <code>func</code> com os mesmos argumentos.`,
        c`def dobrar(func):
    def embrulho(*args, **kwargs):
        return func(____, ____) * 2
    return ____

@dobrar
def somar(a, b):
    return a + b

print(somar(2, 3))`, c`def dobrar(func):
    def embrulho(*args, **kwargs):
        return func(*args, **kwargs) * 2
    return embrulho

@dobrar
def somar(a, b):
    return a + b

print(somar(2, 3))`, c`
assert somar(2, 3) == 10, f"somar(2, 3) com @dobrar deveria dar 10, deu {somar(2, 3)}"`),
      criar("Só para administradores", `Crie o decorator <code>somente_admin</code>: a função decorada recebe <code>usuario</code> como 1º argumento; se <code>usuario != "admin"</code>, devolve <code>"Acesso negado"</code> sem chamar a função; senão, chama normalmente. Aplique em <code>apagar_tudo(usuario)</code>, que devolve <code>"Tudo apagado"</code>.`, `No embrulho: <code>def embrulho(usuario, *args, **kwargs):</code>`,
        c`# crie o decorator somente_admin

# @somente_admin
def apagar_tudo(usuario):
    return "Tudo apagado"
`, c`def somente_admin(func):
    def embrulho(usuario, *args, **kwargs):
        if usuario != "admin":
            return "Acesso negado"
        return func(usuario, *args, **kwargs)
    return embrulho

@somente_admin
def apagar_tudo(usuario):
    return "Tudo apagado"`, c`
assert apagar_tudo("ana") == "Acesso negado", "Usuário comum deve receber 'Acesso negado'"
assert apagar_tudo("admin") == "Tudo apagado", "admin deve conseguir"`, { padroes: [[/@somente_admin/, "Aplique o decorator com @somente_admin."]] })
    ]
  },
  {
    id: "geradores", secao: S4, titulo: "Geradores (yield)",
    teoria: `
      <p>Um <b>gerador</b> é uma função que entrega valores <b>um de cada vez</b>, com <code>yield</code>, pausando entre eles. Ele não guarda tudo na memória: ótimo para sequências grandes ou infinitas e para ler arquivos enormes linha a linha.</p>
      <pre><code>def contar_ate(n):
    i = 1
    while i &lt;= n:
        yield i      # entrega i e pausa aqui
        i += 1

for x in contar_ate(3):
    print(x)        # 1, 2, 3

g = contar_ate(2)
next(g)   # 1
next(g)   # 2
next(g)   # StopIteration (acabou)</code></pre>
      <!--pratica-->
      <h3>Expressão geradora</h3>
      <p>Como uma compreensão de lista, mas com parênteses: <code>sum(x * x for x in range(1000000))</code> não cria a lista inteira.</p>`,
    exemplo: c`def pares():
    n = 0
    while True:
        yield n
        n += 2

g = pares()
print([next(g) for _ in range(5)])
print(sum(x for x in range(1, 101)))`,
    perguntas: [
      m("Qual palavra transforma uma função em gerador?", ["`yield`", "`return`", "`gen`", "`async`"], 0, "Basta ter `yield` dentro da função."),
      m("Qual exceção indica que o gerador acabou?", ["`StopIteration`", "`EndOfGenerator`", "`IndexError`", "`ValueError`"], 0, "`next()` num gerador terminado levanta `StopIteration`.")
    ],
    exercicios: [
      comp("Quadrados sob demanda", `Complete o gerador para entregar os quadrados de 1 até n (1, 4, 9…).`, `Use <code>yield</code> dentro do <code>for</code>.`,
        c`def quadrados(n):
    for i in range(1, n + 1):
        ____ i * i

print(list(quadrados(4)))`, c`def quadrados(n):
    for i in range(1, n + 1):
        yield i * i

print(list(quadrados(4)))`, c`
import types
assert isinstance(quadrados(3), types.GeneratorType), "quadrados deveria ser um gerador (use yield)"
assert list(quadrados(4)) == [1, 4, 9, 16], f"Deu {list(quadrados(4))}"`),
      criar("Lotes de envio", `Crie o gerador <code>lotes(itens, tamanho)</code> que entrega a lista em pedaços do tamanho dado. Ex.: <code>list(lotes([1, 2, 3, 4, 5], 2))</code> → <code>[[1, 2], [3, 4], [5]]</code>.`, `<code>for i in range(0, len(itens), tamanho): yield itens[i:i + tamanho]</code>`,
        c`def lotes(itens, tamanho):
    pass
`, c`def lotes(itens, tamanho):
    for i in range(0, len(itens), tamanho):
        yield itens[i:i + tamanho]`, c`
import types
assert isinstance(lotes([1], 1), types.GeneratorType), "lotes deveria ser um gerador (use yield)"
assert list(lotes([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]], f"Deu {list(lotes([1, 2, 3, 4, 5], 2))}"
assert list(lotes([], 3)) == [], "Lista vazia: nenhum lote"`)
    ]
  },
  {
    id: "iteradores", secao: S4, titulo: "Iteradores",
    teoria: `
      <p>Um <b>iterável</b> é algo que dá para percorrer (lista, tupla, string, dict, set). Um <b>iterador</b> é o objeto que entrega os itens um a um. <code>iter()</code> cria o iterador e <code>next()</code> pega o próximo:</p>
      <pre><code>it = iter(["a", "b"])
print(next(it))   # a
print(next(it))   # b
# next(it) agora daria StopIteration</code></pre>
      <p>O <code>for</code> faz exatamente isso por baixo dos panos.</p>
      <!--pratica-->
      <h3>Criando um iterador com classe</h3>
      <p>Implemente <code>__iter__()</code> (devolve o próprio objeto) e <code>__next__()</code> (devolve o próximo valor ou levanta <code>StopIteration</code>):</p>
      <pre><code>class Contagem:
    def __init__(self, fim):
        self.atual = 0
        self.fim = fim
    def __iter__(self):
        return self
    def __next__(self):
        if self.atual &gt;= self.fim:
            raise StopIteration
        self.atual += 1
        return self.atual

for n in Contagem(3):
    print(n)   # 1, 2, 3</code></pre>`,
    exemplo: c`frutas = iter(("maçã", "uva"))
print(next(frutas))
print(next(frutas))
for letra in "abc":
    print(letra)`,
    perguntas: [
      m("Qual função pega o próximo item de um iterador?", ["`next()`", "`iter()`", "`get()`", "`step()`"], 0, "`iter()` cria o iterador; `next()` avança."),
      vf("Uma lista é um iterável.", true, "Dá para percorrê-la com `for` e criar um iterador com `iter()`.")
    ],
    exercicios: [
      comp("Senhas do painel", `Complete a classe para que ela seja um iterador que entrega <code>"A1"</code>, <code>"A2"</code>… até <code>"A" + str(limite)</code>.`, `<code>__iter__</code> devolve <code>self</code>; <code>__next__</code> levanta <code>StopIteration</code> no fim.`,
        c`class Senhas:
    def __init__(self, limite):
        self.n = 0
        self.limite = limite
    def __iter__(self):
        return ____
    def __next__(self):
        if self.n >= self.limite:
            raise ____
        self.n += 1
        return "A" + str(self.n)

print(list(Senhas(3)))`, c`class Senhas:
    def __init__(self, limite):
        self.n = 0
        self.limite = limite
    def __iter__(self):
        return self
    def __next__(self):
        if self.n >= self.limite:
            raise StopIteration
        self.n += 1
        return "A" + str(self.n)

print(list(Senhas(3)))`, c`
assert list(Senhas(3)) == ["A1", "A2", "A3"], f"Deu {list(Senhas(3))}"
assert list(Senhas(0)) == [], "Senhas(0) não entrega nada"`),
      criar("Primeiros n itens", `Crie <code>primeiros(iteravel, n)</code> que devolve uma lista com os n primeiros itens, usando <code>iter()</code> e <code>next()</code> (pare antes se o iterável acabar).`, `Use <code>try/except StopIteration</code> ou <code>next(it, None)</code> com um valor-sentinela.`,
        c`def primeiros(iteravel, n):
    pass
`, c`def primeiros(iteravel, n):
    it = iter(iteravel)
    saida = []
    for _ in range(n):
        try:
            saida.append(next(it))
        except StopIteration:
            break
    return saida`, c`
assert primeiros("python", 3) == ["p", "y", "t"], f"Deu {primeiros('python', 3)}"
assert primeiros([1, 2], 5) == [1, 2], "Se acabar antes, devolva o que tiver"`, { padroes: [[/next\s*\(/, "Use next()."], [/iter\s*\(/, "Use iter()."]] })
    ]
  },
  {
    id: "arrays", secao: S5, titulo: "Arrays (listas e o módulo array)",
    teoria: `
      <p>Python <b>não tem</b> um tipo “array” embutido como outras linguagens: no dia a dia, usamos <b>listas</b> no lugar. Tudo que se faz com arrays (acessar por índice, <code>len()</code>, percorrer, adicionar, remover) você já viu nas lições de listas.</p>
      <pre><code>carros = ["Ford", "Volvo", "BMW"]
x = carros[0]
carros[0] = "Toyota"
print(len(carros))
carros.append("Honda")
carros.pop(1)</code></pre>
      <!--pratica-->
      <h3>Quando usar outro tipo</h3>
      <ul>
        <li>O módulo <code>array</code> guarda números de <b>um só tipo</b> de forma compacta: <code>array.array("i", [1, 2, 3])</code> ("i" = inteiro, "d" = decimal);</li>
        <li>Para contas com muitos números (ciência de dados, imagens), use os arrays do <b>NumPy</b>: <code>np.array([1, 2, 3]) * 2</code> → <code>[2, 4, 6]</code>.</li>
      </ul>`,
    exemplo: c`import array
temperaturas = array.array("d", [21.5, 23.0, 19.8])
temperaturas.append(25.1)
print(temperaturas, max(temperaturas))`,
    perguntas: [
      vf("Python tem um tipo array embutido igual ao do C/Java, usado no lugar das listas.", false, "No dia a dia usamos listas; o módulo `array` e o NumPy são opções para casos específicos."),
      m("No módulo `array`, o código `\"d\"` indica…", ["números decimais (double)", "datas", "dicionários", "dígitos de texto"], 0, "`\"i\"` = inteiros, `\"d\"` = decimais.")
    ],
    exercicios: [
      criar("Média do array", `Crie <code>leituras</code> com o módulo <code>array</code> (tipo <code>"d"</code>) contendo 10.0, 12.5 e 15.5, adicione 22.0 com <code>append</code> e guarde a média em <code>media</code> (15.0).`, `<code>import array</code>; <code>sum(leituras) / len(leituras)</code>.`,
        c``, c`import array
leituras = array.array("d", [10.0, 12.5, 15.5])
leituras.append(22.0)
media = sum(leituras) / len(leituras)
print(media)`, c`
import array as _a
assert isinstance(leituras, _a.array) and leituras.typecode == "d", "leituras deveria ser array.array do tipo 'd'"
assert list(leituras) == [10.0, 12.5, 15.5, 22.0], f"leituras ficou {list(leituras)}"
assert media == 15.0, f"media deveria ser 15.0, deu {media}"`)
    ]
  },
  {
    id: "modulos", secao: S5, titulo: "Módulos",
    teoria: `
      <p>Um <b>módulo</b> é um arquivo <code>.py</code> com funções, classes e variáveis que você pode reaproveitar em outros programas.</p>
      <pre><code># arquivo: utilidades.py
def saudar(nome):
    return "Olá, " + nome
pessoa = {"nome": "Ana", "idade": 30}

# arquivo: main.py
import utilidades
print(utilidades.saudar("Bia"))
print(utilidades.pessoa["idade"])</code></pre>
      <!--pratica-->
      <h3>Formas de importar</h3>
      <pre><code>import math                  # use math.sqrt(16)
import datetime as dt        # apelido: dt.date.today()
from math import sqrt, pi    # só o que precisa: sqrt(16)
from random import *         # tudo (evite: confunde a origem dos nomes)</code></pre>
      <p>O Python já vem com dezenas de módulos (a <b>biblioteca padrão</b>): <code>math</code>, <code>random</code>, <code>datetime</code>, <code>json</code>, <code>re</code>, <code>os</code>, <code>csv</code>, <code>statistics</code>… Para listar o que um módulo tem: <code>dir(math)</code>.</p>
      <p>💡 Se o arquivo tiver <code>if __name__ == "__main__":</code>, o bloco só roda quando ele é executado diretamente, não quando é importado.</p>`,
    exemplo: c`import math
from random import choice
import platform as pf
print(math.sqrt(81), math.pi)
print(choice(["cara", "coroa"]))
print(pf.python_version())
print([n for n in dir(math) if n.startswith("f")])`,
    perguntas: [
      m("Depois de `from math import sqrt`, como chamar a raiz quadrada?", ["`sqrt(9)`", "`math.sqrt(9)`", "`math(9)`", "`import sqrt(9)`"], 0, "Com `from ... import`, o nome vem direto."),
      l("Complete para importar o módulo com o apelido `np`:", c`import numpy ____ np`, ["as"], "`as` dá um apelido ao módulo.")
    ],
    exercicios: [
      comp("Importando com apelido", `Complete para importar o módulo <code>statistics</code> com o apelido <code>st</code> e calcular a média das notas.`, `<code>import modulo as apelido</code>`,
        c`import statistics ____ st
notas = [7, 8, 9]
media = st.mean(notas)
print(media)`, c`import statistics as st
notas = [7, 8, 9]
media = st.mean(notas)
print(media)`, c`
assert media == 8, f"media deveria ser 8, deu {media}"
assert st.__name__ == "statistics", "st deveria ser o módulo statistics"`),
      criar("Hipotenusa", `Usando <code>from math import sqrt</code>, crie <code>hipotenusa(a, b)</code> que devolve <code>sqrt(a**2 + b**2)</code>. Ex.: <code>hipotenusa(3, 4)</code> → 5.0.`, `Importe só a função <code>sqrt</code>.`,
        c``, c`from math import sqrt

def hipotenusa(a, b):
    return sqrt(a ** 2 + b ** 2)`, c`
assert hipotenusa(3, 4) == 5.0 and hipotenusa(6, 8) == 10.0, "hipotenusa(3, 4) deveria ser 5.0"`, { padroes: [[/from\s+math\s+import\s+sqrt/, "Use from math import sqrt."]] })
    ]
  },
  {
    id: "datas", secao: S5, titulo: "Datas (datetime)",
    teoria: `
      <p>O módulo <code>datetime</code> trabalha com datas e horas:</p>
      <pre><code>import datetime
agora = datetime.datetime.now()
print(agora.year, agora.month, agora.day)
hoje = datetime.date.today()
natal = datetime.date(2025, 12, 25)   # criar uma data
print((natal - hoje).days, "dias até o Natal")</code></pre>
      <!--pratica-->
      <h3>Formatar com strftime()</h3>
      <pre><code>d = datetime.datetime(2025, 3, 9, 14, 30)
d.strftime("%d/%m/%Y")      # 09/03/2025
d.strftime("%H:%M")         # 14:30
d.strftime("%A, %B")        # Sunday, March (nomes em inglês por padrão)</code></pre>
      <p>Códigos comuns: <code>%d</code> dia, <code>%m</code> mês, <code>%Y</code> ano com 4 dígitos, <code>%y</code> 2 dígitos, <code>%H</code> hora, <code>%M</code> minuto, <code>%S</code> segundo, <code>%A</code> dia da semana, <code>%j</code> dia do ano.</p>
      <h3>Texto → data e somar tempo</h3>
      <pre><code>d = datetime.datetime.strptime("25/12/2025", "%d/%m/%Y")
vencimento = d + datetime.timedelta(days=30)</code></pre>`,
    exemplo: c`import datetime
compra = datetime.date(2025, 1, 15)
vence = compra + datetime.timedelta(days=30)
print("Vence em:", vence.strftime("%d/%m/%Y"))
nasc = datetime.datetime.strptime("03/07/1995", "%d/%m/%Y")
print("Nasceu no dia", nasc.strftime("%j"), "do ano")`,
    perguntas: [
      m("Qual código de formato mostra o ano com 4 dígitos?", ["`%Y`", "`%y`", "`%A`", "`%a`"], 0, "`%y` mostra só 2 dígitos."),
      m("Como somar 7 dias a uma data `d`?", ["`d + datetime.timedelta(days=7)`", "`d + 7`", "`d.add(7)`", "`d.days += 7`"], 0, "Diferenças de tempo são `timedelta`.")
    ],
    exercicios: [
      comp("Data no formato brasileiro", `Complete o formato para que <code>texto</code> seja <code>"09/03/2025"</code>.`, `Dia, mês e ano com 4 dígitos, separados por barra.`,
        c`import datetime
d = datetime.date(2025, 3, 9)
texto = d.strftime("____")
print(texto)`, c`import datetime
d = datetime.date(2025, 3, 9)
texto = d.strftime("%d/%m/%Y")
print(texto)`, c`
assert texto == "09/03/2025", f"texto deveria ser '09/03/2025', deu {texto!r}"`),
      criar("Vencimento do boleto", `Crie <code>vencimento(data_txt, dias)</code>: recebe a data como texto <code>"dd/mm/aaaa"</code> e devolve, também como texto <code>"dd/mm/aaaa"</code>, a data somada de <code>dias</code>. Ex.: <code>vencimento("25/12/2024", 10)</code> → <code>"04/01/2025"</code>.`, `<code>strptime</code> para ler, <code>timedelta(days=dias)</code> para somar e <code>strftime</code> para escrever.`,
        c`import datetime

def vencimento(data_txt, dias):
    pass
`, c`import datetime

def vencimento(data_txt, dias):
    d = datetime.datetime.strptime(data_txt, "%d/%m/%Y")
    return (d + datetime.timedelta(days=dias)).strftime("%d/%m/%Y")`, c`
assert vencimento("25/12/2024", 10) == "04/01/2025", f"Deu {vencimento('25/12/2024', 10)!r}"
assert vencimento("28/02/2024", 1) == "29/02/2024", "2024 é bissexto"`)
    ]
  },
  {
    id: "math", secao: S5, titulo: "Matemática (math)",
    teoria: `
      <p>Funções embutidas, sem importar nada:</p>
      <pre><code>min(5, 10, 25)   # 5
max(5, 10, 25)   # 25
abs(-7.25)       # 7.25
pow(4, 3)        # 64 (= 4 ** 3)
round(3.14159, 2)  # 3.14</code></pre>
      <!--pratica-->
      <p>O módulo <code>math</code> traz o resto:</p>
      <pre><code>import math
math.sqrt(64)     # 8.0  raiz quadrada
math.ceil(1.4)    # 2    arredonda para cima
math.floor(1.6)   # 1    arredonda para baixo
math.pi           # 3.141592653589793
math.factorial(5) # 120
math.gcd(12, 18)  # 6    MDC
math.isclose(0.1 + 0.2, 0.3)  # True  compara floats com tolerância</code></pre>
      <p>Para estatística há o módulo <code>statistics</code> (média, mediana, desvio-padrão) e, para números complexos, o <code>cmath</code>.</p>`,
    exemplo: c`import math
raio = 3
print("Área:", round(math.pi * raio ** 2, 2))
pessoas = 23
por_carro = 5
print("Carros necessários:", math.ceil(pessoas / por_carro))`,
    perguntas: [
      m("Quanto é `math.ceil(4.1)`?", ["5", "4", "4.1", "4.0"], 0, "`ceil` arredonda sempre para cima."),
      m("Qual função embutida devolve o valor absoluto?", ["`abs()`", "`math.abs()`", "`absolute()`", "`mod()`"], 0, "`abs` é embutida; não precisa importar.")
    ],
    exercicios: [
      comp("Caixas para a mudança", `Cada caixa leva 12 livros. Complete para calcular quantas caixas são necessárias para 50 livros (5), arredondando para cima.`, `<code>math.ceil</code>`,
        c`import math
livros = 50
caixas = math.____(livros / 12)
print(caixas)`, c`import math
livros = 50
caixas = math.ceil(livros / 12)
print(caixas)`, c`
assert caixas == 5, f"caixas deveria ser 5, deu {caixas}"`),
      criar("Área do círculo", `Crie <code>area_circulo(raio)</code> que devolve <code>pi * raio²</code> arredondado com 2 casas, usando <code>math.pi</code>. Ex.: <code>area_circulo(3)</code> → 28.27.`, `<code>round(math.pi * raio ** 2, 2)</code>`,
        c`import math
`, c`import math

def area_circulo(raio):
    return round(math.pi * raio ** 2, 2)`, c`
assert area_circulo(3) == 28.27 and area_circulo(1) == 3.14, f"area_circulo(3) deu {area_circulo(3)}"`, { padroes: [[/math\.pi/, "Use math.pi."]] })
    ]
  },
  {
    id: "json", secao: S5, titulo: "JSON",
    teoria: `
      <p><b>JSON</b> é o formato de texto mais usado para trocar dados entre sistemas (APIs, arquivos de configuração). Ele parece muito com dicionários e listas do Python.</p>
      <pre><code>import json
texto = '{"nome": "Ana", "idade": 30, "ativo": true}'
dados = json.loads(texto)      # JSON (texto) → dicionário
print(dados["nome"])

pedido = {"id": 1, "itens": ["café", "pão"], "pago": False}
saida = json.dumps(pedido)     # dicionário → JSON (texto)</code></pre>
      <!--pratica-->
      <h3>Conversões</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Python</th><th>JSON</th></tr></thead><tbody>
        <tr><td><code>dict</code></td><td>object</td></tr><tr><td><code>list</code>, <code>tuple</code></td><td>array</td></tr>
        <tr><td><code>str</code></td><td>string</td></tr><tr><td><code>int</code>, <code>float</code></td><td>number</td></tr>
        <tr><td><code>True</code> / <code>False</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>None</code></td><td><code>null</code></td></tr>
      </tbody></table>
      <h3>Deixar bonito</h3>
      <pre><code>json.dumps(pedido, indent=2, sort_keys=True, ensure_ascii=False)</code></pre>
      <p><code>ensure_ascii=False</code> mantém acentos legíveis. Para arquivos: <code>json.load(arquivo)</code> e <code>json.dump(dados, arquivo)</code>.</p>`,
    exemplo: c`import json
resposta_api = '{"cidade": "Natal", "temperatura": 31.5, "chuva": false, "alertas": null}'
clima = json.loads(resposta_api)
print(clima["cidade"], clima["temperatura"], clima["chuva"], clima["alertas"])
print(json.dumps(clima, indent=2, ensure_ascii=False))`,
    perguntas: [
      m("Qual função converte um texto JSON em dicionário?", ["`json.loads()`", "`json.dumps()`", "`json.parse()`", "`dict()`"], 0, "`loads` = *load string*. `dumps` faz o caminho inverso."),
      m("Como o `None` do Python aparece em JSON?", ["`null`", "`None`", "`nil`", "`undefined`"], 0, "Em JSON é `null`.")
    ],
    exercicios: [
      comp("Lendo a resposta da API", `Complete para converter o texto JSON em dicionário e pegar o <code>status</code> do pedido.`, `<code>json.loads</code>`,
        c`import json
resposta = '{"pedido": 1042, "status": "enviado"}'
dados = json.____(resposta)
status = dados[____]
print(status)`, c`import json
resposta = '{"pedido": 1042, "status": "enviado"}'
dados = json.loads(resposta)
status = dados["status"]
print(status)`, c`
assert dados == {"pedido": 1042, "status": "enviado"}, "dados deveria ser o dicionário convertido"
assert status == "enviado", f"status deveria ser 'enviado', deu {status!r}"`),
      criar("Gerando o JSON do pedido", `Crie <code>para_json(cliente, itens)</code> que devolve o texto JSON de <code>{"cliente": cliente, "itens": itens, "total_itens": len(itens)}</code>, com <code>ensure_ascii=False</code>.`, `<code>json.dumps(dicionario, ensure_ascii=False)</code>`,
        c`import json
`, c`import json

def para_json(cliente, itens):
    return json.dumps({"cliente": cliente, "itens": itens, "total_itens": len(itens)}, ensure_ascii=False)`, c`
r = para_json("Ana", ["café", "pão"])
assert isinstance(r, str), "Deveria devolver um texto"
assert json.loads(r) == {"cliente": "Ana", "itens": ["café", "pão"], "total_itens": 2}, f"JSON gerado: {r}"
assert "café" in r, "Use ensure_ascii=False para manter os acentos"`)
    ]
  },
  {
    id: "regex", secao: S5, titulo: "Expressões regulares (re)",
    teoria: `
      <p>Uma <b>expressão regular</b> (RegEx) é um padrão para buscar ou validar textos: e-mails, CPFs, telefones, datas… O módulo é o <code>re</code>.</p>
      <pre><code>import re
texto = "Ligue (84) 99876-5432 ou (11) 3333-4444"
re.findall(r"\\d{4,5}-\\d{4}", texto)   # ['99876-5432', '3333-4444']
re.search(r"\\(\\d{2}\\)", texto).group()  # '(84)'  primeira ocorrência
re.sub(r"\\d", "*", "senha 1234")         # 'senha ****'
re.split(r"[,;]\\s*", "a, b;c")          # ['a', 'b', 'c']</code></pre>
      <p>Use <code>r"..."</code> (string “crua”) para as barras invertidas não serem interpretadas pelo Python.</p>
      <!--pratica-->
      <h3>Símbolos mais usados</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Símbolo</th><th>Significado</th></tr></thead><tbody>
        <tr><td><code>\\d</code> / <code>\\D</code></td><td>dígito / não dígito</td></tr>
        <tr><td><code>\\w</code></td><td>letra, número ou _</td></tr>
        <tr><td><code>\\s</code></td><td>espaço em branco</td></tr>
        <tr><td><code>.</code></td><td>qualquer caractere</td></tr>
        <tr><td><code>^</code> / <code>$</code></td><td>início / fim do texto</td></tr>
        <tr><td><code>*</code> <code>+</code> <code>?</code></td><td>0 ou mais / 1 ou mais / 0 ou 1</td></tr>
        <tr><td><code>{n}</code>, <code>{n,m}</code></td><td>exatamente n / de n a m vezes</td></tr>
        <tr><td><code>[abc]</code>, <code>[a-z]</code></td><td>um dos caracteres / faixa</td></tr>
        <tr><td><code>( )</code>, <code>|</code></td><td>grupo / “ou”</td></tr>
      </tbody></table>
      <p><code>re.fullmatch(padrao, texto)</code> testa se o texto <b>inteiro</b> segue o padrão (ótimo para validar).</p>`,
    exemplo: c`import re
cpf = "123.456.789-09"
print(bool(re.fullmatch(r"\d{3}\.\d{3}\.\d{3}-\d{2}", cpf)))
print(re.sub(r"\D", "", cpf))
print(re.findall(r"#(\w+)", "Amei o #cafe e o #pao de queijo"))`,
    perguntas: [
      m("O que `\\d` significa numa RegEx?", ["um dígito (0–9)", "uma letra", "um espaço", "o fim do texto"], 0, "`\\d` casa com qualquer dígito."),
      m("Qual função devolve **todas** as ocorrências numa lista?", ["`re.findall()`", "`re.search()`", "`re.match()`", "`re.sub()`"], 0, "`search` devolve só a primeira.")
    ],
    exercicios: [
      comp("Só os números do telefone", `Complete para remover tudo que <b>não</b> é dígito do telefone, deixando <code>"84998765432"</code>.`, `<code>\\D</code> é “não dígito”; troque por texto vazio.`,
        c`import re
telefone = "(84) 99876-5432"
limpo = re.____(r"\D", ____, telefone)
print(limpo)`, c`import re
telefone = "(84) 99876-5432"
limpo = re.sub(r"\D", "", telefone)
print(limpo)`, c`
assert limpo == "84998765432", f"limpo deveria ser '84998765432', deu {limpo!r}"`),
      criar("Validar CEP", `Crie <code>cep_valido(cep)</code> que devolve <code>True</code> se o CEP estiver no formato <code>00000-000</code> (5 dígitos, hífen, 3 dígitos), usando <code>re.fullmatch</code>.`, `<code>bool(re.fullmatch(r"\\d{5}-\\d{3}", cep))</code>`,
        c`import re

def cep_valido(cep):
    pass
`, c`import re

def cep_valido(cep):
    return bool(re.fullmatch(r"\d{5}-\d{3}", cep))`, c`
assert cep_valido("59000-000") is True, "59000-000 é válido"
assert cep_valido("59000000") is False and cep_valido("5900-000") is False and cep_valido("59000-0000") is False, "Formatos errados devem dar False"`),
      criar("Hashtags do post", `Crie <code>hashtags(texto)</code> que devolve a lista das palavras que vêm depois de <code>#</code>, em minúsculas. Ex.: <code>hashtags("Amei o #Cafe e o #pao")</code> → <code>["cafe", "pao"]</code>.`, `<code>re.findall(r"#(\\w+)", texto)</code> devolve só o grupo entre parênteses.`,
        c`import re

def hashtags(texto):
    pass
`, c`import re

def hashtags(texto):
    return [h.lower() for h in re.findall(r"#(\w+)", texto)]`, c`
assert hashtags("Amei o #Cafe e o #pao") == ["cafe", "pao"], f"Deu {hashtags('Amei o #Cafe e o #pao')}"
assert hashtags("sem tags") == [], "Sem hashtags: lista vazia"`)
    ]
  },
  {
    id: "pip", secao: S5, titulo: "PIP e ambientes virtuais (venv)",
    teoria: `
      <p><b>PIP</b> é o gerenciador de pacotes do Python: instala bibliotecas feitas pela comunidade, publicadas no <b>PyPI</b> (pypi.org). Ele já vem com o Python.</p>
      <pre><code>pip --version
pip install requests          # instala
pip install pandas==2.2.0     # uma versão específica
pip list                      # o que está instalado
pip uninstall requests        # remove
pip freeze &gt; requirements.txt # salva a lista de dependências
pip install -r requirements.txt  # instala a partir da lista</code></pre>
      <p>Depois de instalar, é só importar: <code>import requests</code>.</p>
      <!--pratica-->
      <h3>Ambientes virtuais (venv)</h3>
      <p>Cada projeto deve ter suas próprias bibliotecas, para um não quebrar o outro. O <b>venv</b> cria uma “caixinha” isolada:</p>
      <pre><code>python -m venv .venv           # cria
# ativar:
.venv\\Scripts\\activate         # Windows
source .venv/bin/activate      # Mac/Linux
pip install fastapi            # instala só neste projeto
deactivate                     # sai do ambiente</code></pre>
      <p>💼 Em projetos reais, sempre use um ambiente virtual e versione o <code>requirements.txt</code> (ou <code>pyproject.toml</code>), mas <b>não</b> a pasta <code>.venv</code> (coloque-a no <code>.gitignore</code>).</p>
      <p>ℹ️ Aqui no navegador (Pyodide) não há terminal: pacotes como <code>numpy</code>, <code>pandas</code> e <code>matplotlib</code> são carregados automaticamente quando você os importa.</p>`,
    perguntas: [
      m("Qual comando instala a biblioteca `requests`?", ["`pip install requests`", "`python requests`", "`import requests`", "`pip get requests`"], 0, "`import` só funciona depois de instalar."),
      m("Para que serve um ambiente virtual (venv)?", ["Isolar as bibliotecas de cada projeto", "Deixar o Python mais rápido", "Rodar Python no navegador", "Criar máquinas virtuais"], 0, "Cada projeto tem as próprias versões, sem conflito."),
      l("Complete para salvar as dependências num arquivo:", c`pip ____ > requirements.txt`, ["freeze"], "`pip freeze` lista os pacotes com as versões.")
    ],
    exercicios: []
  },
  {
    id: "try-except", secao: S5, titulo: "Tratamento de erros (try / except)",
    teoria: `
      <p>Quando algo dá errado, o Python levanta uma <b>exceção</b> e o programa para. Com <code>try</code>/<code>except</code> você <b>trata</b> o erro e o programa continua:</p>
      <pre><code>try:
    idade = int("vinte")
except ValueError:
    print("Digite a idade só com números")</code></pre>
      <!--pratica-->
      <h3>Partes do bloco</h3>
      <pre><code>try:
    resultado = 10 / divisor
except ZeroDivisionError:
    print("Não dá para dividir por zero")
except (TypeError, ValueError) as erro:   # vários tipos; 'erro' tem a mensagem
    print("Valor inválido:", erro)
else:
    print("Deu certo:", resultado)         # só se não houve erro
finally:
    print("Sempre roda (fechar arquivo, conexão…)")</code></pre>
      <h3>Levantando seus próprios erros</h3>
      <pre><code>def sacar(saldo, valor):
    if valor &gt; saldo:
        raise ValueError("Saldo insuficiente")
    return saldo - valor</code></pre>
      <p>⚠️ Evite <code>except:</code> sozinho (pega tudo, inclusive erros que você não esperava). Trate os tipos que você conhece.</p>`,
    exemplo: c`entradas = ["10", "abc", "0", "4"]
for e in entradas:
    try:
        print(100 / int(e))
    except ValueError:
        print(f"'{e}' não é número")
    except ZeroDivisionError:
        print("Divisão por zero!")
    finally:
        print("---")`,
    perguntas: [
      m("Qual exceção `int(\"abc\")` levanta?", ["`ValueError`", "`TypeError`", "`NameError`", "`KeyError`"], 0, "O tipo está certo (texto), mas o valor não é um número."),
      m("Quando o bloco `finally` roda?", ["Sempre, com ou sem erro", "Só se houver erro", "Só se não houver erro", "Nunca"], 0, "`else` é que roda só sem erro."),
      l("Complete para levantar um erro:", c`if idade < 0:
    ____ ValueError("Idade inválida")`, ["raise"], "`raise` levanta a exceção.")
    ],
    exercicios: [
      comp("Conversão segura", `Complete <code>para_inteiro(texto)</code>: devolve o número convertido ou <code>0</code> se o texto não for um número válido.`, `O erro de conversão é <code>ValueError</code>.`,
        c`def para_inteiro(texto):
    ____:
        return int(texto)
    except ____:
        return 0`, c`def para_inteiro(texto):
    try:
        return int(texto)
    except ValueError:
        return 0`, c`
assert para_inteiro("42") == 42 and para_inteiro("abc") == 0 and para_inteiro("") == 0, "Confira os casos '42', 'abc' e ''"`),
      criar("Saque com validação", `Crie <code>sacar(saldo, valor)</code>: se <code>valor</code> for menor ou igual a 0, levante <code>ValueError("Valor inválido")</code>; se for maior que o saldo, <code>ValueError("Saldo insuficiente")</code>; senão, devolva o novo saldo.`, `Use <code>raise ValueError("...")</code>.`,
        c`def sacar(saldo, valor):
    pass
`, c`def sacar(saldo, valor):
    if valor <= 0:
        raise ValueError("Valor inválido")
    if valor > saldo:
        raise ValueError("Saldo insuficiente")
    return saldo - valor`, c`
assert sacar(100, 30) == 70, "sacar(100, 30) deveria devolver 70"
for args, msg in [((100, 200), "Saldo insuficiente"), ((100, 0), "Valor inválido"), ((100, -5), "Valor inválido")]:
    try:
        sacar(*args)
        assert False, f"sacar{args} deveria levantar ValueError('{msg}')"
    except ValueError as e:
        assert str(e) == msg, f"sacar{args}: a mensagem deveria ser '{msg}', mas foi '{e}'"`),
      criar("Divisão protegida", `Crie <code>dividir(a, b)</code> que devolve <code>a / b</code>; se <code>b</code> for zero, devolve o texto <code>"Erro: divisão por zero"</code> (use <code>try/except ZeroDivisionError</code>, sem <code>if</code>).`, `Coloque a divisão dentro do <code>try</code>.`,
        c`def dividir(a, b):
    pass
`, c`def dividir(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Erro: divisão por zero"`, c`
assert dividir(10, 4) == 2.5, "dividir(10, 4) = 2.5"
assert dividir(1, 0) == "Erro: divisão por zero", "Com b = 0, devolva a mensagem"`, { padroes: [[/except\s+ZeroDivisionError/, "Use except ZeroDivisionError."]] })
    ]
  },
  {
    id: "formatacao", secao: S5, titulo: "Formatação de textos (f-strings e format)",
    teoria: `
      <p>As <b>f-strings</b> (Python 3.6+) são a forma preferida de formatar. Dentro das chaves vai qualquer expressão, e depois de <code>:</code> vem o formato:</p>
      <pre><code>preco = 1234.5
f"{preco:.2f}"      # '1234.50'   2 casas
f"{preco:,.2f}"     # '1,234.50'  separador de milhar
f"{0.256:.1%}"      # '25.6%'     porcentagem
f"{42:05d}"         # '00042'     zeros à esquerda
f"{'oi':&gt;6}"        # '    oi'    alinha à direita em 6
f"{'oi':^6}"        # '  oi  '    centraliza
f"{3 + 4 = }"       # '3 + 4 = 7' (ótimo para depurar)</code></pre>
      <!--pratica-->
      <h3>O método format()</h3>
      <p>Mais antigo, ainda muito visto:</p>
      <pre><code>"Pedido {} de {}".format(42, "Ana")
"{nome} tem {idade} anos".format(nome="Bia", idade=20)
"{0} {1} {0}".format("a", "b")   # 'a b a'</code></pre>
      <p>💡 Para o formato brasileiro de moeda (<code>1.234,50</code>), um truque simples é: <code>f"{v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")</code>.</p>`,
    exemplo: c`itens = [("Café", 2, 12.9), ("Queijo", 1, 28.75)]
for nome, qtd, preco in itens:
    print(f"{nome:<10}{qtd:>3} x {preco:>7.2f} = {qtd * preco:>8.2f}")
print(f"{'TOTAL':<10}{sum(q * p for _, q, p in itens):>23.2f}")
print("Cliente {} - pedido {:05d}".format("Ana", 42))`,
    perguntas: [
      m("O que `f\"{7:03d}\"` produz?", ["`\"007\"`", "`\"7.00\"`", "`\"700\"`", "`\"  7\"`"], 0, "`03d` = inteiro com 3 dígitos, completando com zeros."),
      m("Qual formato mostra `0.5` como `50.0%`?", ["`{x:.1%}`", "`{x:%}`", "`{x*100}`", "`{x:.1f}%`"], 0, "O `%` multiplica por 100 e põe o símbolo.")
    ],
    exercicios: [
      comp("Número do pedido", `Complete para que <code>codigo</code> seja <code>"PED-00042"</code> (número com 5 dígitos, zeros à esquerda).`, `<code>:05d</code>`,
        c`numero = 42
codigo = f"PED-{numero:____}"
print(codigo)`, c`numero = 42
codigo = f"PED-{numero:05d}"
print(codigo)`, c`
assert codigo == "PED-00042", f"codigo deveria ser 'PED-00042', deu {codigo!r}"`),
      criar("Moeda brasileira", `Crie <code>reais(valor)</code> que devolve o valor no formato <code>"R$ 1.234,50"</code> (milhar com ponto e decimal com vírgula, 2 casas).`, `Formate com <code>f"{valor:,.2f}"</code> e troque os separadores com <code>replace</code> (use um caractere temporário).`,
        c`def reais(valor):
    pass
`, c`def reais(valor):
    texto = f"{valor:,.2f}"
    return "R$ " + texto.replace(",", "X").replace(".", ",").replace("X", ".")`, c`
assert reais(1234.5) == "R$ 1.234,50", f"reais(1234.5) deu {reais(1234.5)!r}"
assert reais(9.9) == "R$ 9,90", f"reais(9.9) deu {reais(9.9)!r}"
assert reais(1000000) == "R$ 1.000.000,00", f"reais(1000000) deu {reais(1000000)!r}"`)
    ]
  },
  {
    id: "none", secao: S5, titulo: "None",
    teoria: `
      <p><code>None</code> representa a <b>ausência de valor</b> (“nada”, “vazio”, “não informado”). É o único valor do tipo <code>NoneType</code>.</p>
      <pre><code>telefone = None           # ainda não informado
print(type(telefone))     # &lt;class 'NoneType'&gt;
if telefone is None:
    print("Sem telefone")</code></pre>
      <!--pratica-->
      <ul>
        <li>Compare com <code>is None</code> / <code>is not None</code> (não com <code>==</code>).</li>
        <li><code>None</code> é falso num <code>if</code>, mas não é igual a <code>0</code>, <code>""</code> ou <code>False</code>.</li>
        <li>Funções sem <code>return</code> devolvem <code>None</code>.</li>
        <li>É ótimo como valor padrão “não informado”: <code>def buscar(nome, cidade=None):</code>.</li>
      </ul>`,
    exemplo: c`def buscar_cliente(id):
    clientes = {1: "Ana", 2: "Bia"}
    return clientes.get(id)

for id in [1, 3]:
    nome = buscar_cliente(id)
    print(id, "→", nome if nome is not None else "não encontrado")`,
    perguntas: [
      vf("`None == 0` é `True`.", false, "`None` não é igual a zero; os dois só são “falsos” num `if`."),
      m("Qual é o jeito recomendado de testar se `x` é `None`?", ["`x is None`", "`x == None`", "`not x`", "`x.isNone()`"], 0, "`not x` também seria verdadeiro para 0 ou \"\".")
    ],
    exercicios: [
      criar("Valor padrão", `Crie <code>saudacao(nome=None)</code>: se <code>nome</code> for <code>None</code>, devolva <code>"Olá, visitante!"</code>; senão, <code>"Olá, NOME!"</code>. Atenção: um nome vazio <code>""</code> <b>não</b> é None e deve virar <code>"Olá, !"</code>.`, `Use <code>if nome is None</code>.`,
        c`def saudacao(nome=None):
    pass
`, c`def saudacao(nome=None):
    if nome is None:
        return "Olá, visitante!"
    return f"Olá, {nome}!"`, c`
assert saudacao() == "Olá, visitante!" and saudacao(None) == "Olá, visitante!", "Sem nome: 'Olá, visitante!'"
assert saudacao("Ana") == "Olá, Ana!", "Com nome: 'Olá, Ana!'"
assert saudacao("") == "Olá, !", "Texto vazio não é None: use 'is None'"`)
    ]
  },
  {
    id: "input", secao: S5, titulo: "Entrada do usuário (input)",
    teoria: `
      <p><code>input()</code> para o programa, espera o usuário digitar e devolve o que foi digitado <b>como texto</b>:</p>
      <pre><code>nome = input("Qual é o seu nome? ")
print("Olá,", nome)

idade = int(input("Idade: "))       # converta para número!
altura = float(input("Altura: "))</code></pre>
      <!--pratica-->
      <p>Para pedir até a resposta ser válida, junte com <code>while</code> e <code>try</code>:</p>
      <pre><code>while True:
    try:
        n = int(input("Número: "))
        break
    except ValueError:
        print("Digite só números")</code></pre>
      <p>ℹ️ Aqui no navegador, os valores de <code>input()</code> vêm da caixa <b>“Entrada”</b> do sandbox, um por linha.</p>`,
    exemplo: c`nome = input("Nome: ")
qtd = int(input("Quantos pães? "))
print(f"{nome}, seu pedido de {qtd} pães custa R$ {qtd * 0.75:.2f}")`,
    perguntas: [
      m("Que tipo `input()` devolve?", ["`str` (texto)", "`int`", "Depende do que foi digitado", "`float`"], 0, "Sempre texto; converta com `int()` ou `float()`."),
      l("Complete para ler a idade como número:", c`idade = ____(input("Idade: "))`, ["int"], "Converta o texto com `int()`.")
    ],
    exercicios: [
      comp("Somando dois números", `O programa lê dois números (já preenchidos na Entrada: 7 e 5) e mostra a soma. Complete as conversões.`, `Sem converter, <code>"7" + "5"</code> vira <code>"75"</code>.`,
        c`a = ____(input("Primeiro: "))
b = ____(input("Segundo: "))
print("Soma:", a + b)`, c`a = int(input("Primeiro: "))
b = int(input("Segundo: "))
print("Soma:", a + b)`, c`
assert a + b == 12, f"a + b deveria ser 12, deu {a + b!r}"
assert "Soma: 12" in __saida__, "Deveria mostrar Soma: 12"`, { entrada: "7\n5" }),
      criar("Conta do restaurante", `Leia com <code>input()</code> o valor da conta e o número de pessoas (Entrada: 180 e 4) e mostre <code>Cada um paga R$ 49.50</code>, já com 10% de serviço (180 × 1.1 / 4).`, `<code>float(input())</code> para o valor e <code>int(input())</code> para as pessoas; formate com <code>:.2f</code>.`,
        c``, c`conta = float(input("Valor da conta: "))
pessoas = int(input("Pessoas: "))
cada = conta * 1.1 / pessoas
print(f"Cada um paga R$ {cada:.2f}")`, c`
assert "Cada um paga R$ 49.50" in __saida__, f"Saída esperada: Cada um paga R$ 49.50. Veio: {__saida__!r}"`, { entrada: "180\n4", padroes: [[/input\s*\(/, "Leia os valores com input()."]] })
    ]
  }
];
