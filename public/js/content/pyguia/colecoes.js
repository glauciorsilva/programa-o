// Python de A a Z — Parte 2: coleções (listas, tuplas, sets, dicionários) e Parte 3: controle de fluxo.
import { m, vf, l, c, comp, criar } from "./util.js";

const S2 = "2. Coleções de dados";
const S3 = "3. Decisões e repetições";

export default [
  {
    id: "listas", secao: S2, titulo: "Listas: criar, acessar, mudar, adicionar e remover",
    teoria: `
      <p>Uma <b>lista</b> guarda vários itens em <b>ordem</b>, numa variável só. Ela é <b>mutável</b> (pode mudar) e aceita itens repetidos e de tipos diferentes.</p>
      <pre><code>frutas = ["maçã", "banana", "uva"]
print(frutas[0])      # maçã (índice começa em 0)
print(frutas[-1])     # uva (último)
print(frutas[1:3])    # ['banana', 'uva'] (fatiamento)
print(len(frutas))    # 3
print("uva" in frutas)  # True</code></pre>
      <h3>Mudar itens</h3>
      <pre><code>frutas[1] = "manga"           # troca um item
frutas[0:2] = ["kiwi", "pera"]  # troca uma faixa</code></pre>
      <!--pratica-->
      <h3>Adicionar</h3>
      <pre><code>frutas.append("limão")        # no fim
frutas.insert(1, "caju")      # na posição 1
frutas.extend(["coco", "figo"])  # junta outra lista (ou qualquer iterável)</code></pre>
      <h3>Remover</h3>
      <pre><code>frutas.remove("caju")   # pelo valor (o primeiro que achar)
frutas.pop(1)           # pelo índice (sem índice: o último) e devolve o item
del frutas[0]           # apaga pelo índice (del frutas apaga a lista toda)
frutas.clear()          # esvazia a lista</code></pre>`,
    exemplo: c`compras = ["arroz", "feijão"]
compras.append("café")
compras.insert(0, "leite")
print(compras)
compras.remove("feijão")
ultimo = compras.pop()
print("Tirei:", ultimo, "| Sobrou:", compras)`,
    perguntas: [
      m("Qual método adiciona um item no **fim** da lista?", ["`append()`", "`insert()`", "`add()`", "`push()`"], 0, "`append()` adiciona no fim. `push()` é do JavaScript; `add()` é de sets."),
      m("Depois de `x = [10, 20, 30]` e `x.pop(0)`, como fica `x`?", ["`[20, 30]`", "`[10, 20]`", "`[10, 30]`", "`[]`"], 0, "`pop(0)` remove o item do índice 0."),
      vf("Listas aceitam itens repetidos.", true, "Sim: `[1, 1, 2]` é uma lista válida.")
    ],
    exercicios: [
      comp("Fila da padaria", `Complete: adicione <code>"Carla"</code> no <b>fim</b> da fila e <code>"Idoso"</code> na <b>frente</b> (posição 0).`, `<code>append</code> e <code>insert</code>.`,
        c`fila = ["Ana", "Bruno"]
fila.____("Carla")
fila.____(0, "Idoso")
print(fila)`, c`fila = ["Ana", "Bruno"]
fila.append("Carla")
fila.insert(0, "Idoso")
print(fila)`, c`
assert fila == ["Idoso", "Ana", "Bruno", "Carla"], f"fila ficou {fila}"`),
      comp("Atualizando o estoque", `Troque o segundo item por <code>"açúcar"</code> e remova <code>"sal"</code> da lista.`, `O segundo item tem índice 1. Para remover pelo valor, use <code>remove</code>.`,
        c`itens = ["arroz", "farinha", "sal", "óleo"]
itens[____] = "açúcar"
itens.____("sal")
print(itens)`, c`itens = ["arroz", "farinha", "sal", "óleo"]
itens[1] = "açúcar"
itens.remove("sal")
print(itens)`, c`
assert itens == ["arroz", "açúcar", "óleo"], f"itens ficou {itens}"`),
      criar("Atender o próximo", `Crie a função <code>atender(fila)</code> que <b>remove e devolve</b> a primeira pessoa da fila. Se a fila estiver vazia, devolve <code>None</code>.`, `<code>fila.pop(0)</code>; teste antes com <code>if not fila</code>.`,
        c`def atender(fila):
    pass
`, c`def atender(fila):
    if not fila:
        return None
    return fila.pop(0)`, c`
f = ["Ana", "Bia"]
assert atender(f) == "Ana" and f == ["Bia"], "Deveria devolver 'Ana' e deixar ['Bia']"
assert atender(f) == "Bia" and f == [], "Deveria devolver 'Bia'"
assert atender(f) is None, "Com a fila vazia, deveria devolver None"`)
    ]
  },
  {
    id: "listas-avancado", secao: S2, titulo: "Listas: laços, compreensão, ordenar, copiar e juntar",
    teoria: `
      <h3>Percorrer</h3>
      <pre><code>for f in frutas:
    print(f)
for i in range(len(frutas)):      # pelos índices
    print(i, frutas[i])
for i, f in enumerate(frutas):    # índice e valor juntos
    print(i, f)</code></pre>
      <h3>Compreensão de lista (list comprehension)</h3>
      <p>Cria uma lista nova a partir de outra, numa linha:</p>
      <pre><code>precos = [10, 25, 40]
com_desconto = [p * 0.9 for p in precos]
caros = [p for p in precos if p &gt; 20]
nomes = [n.upper() for n in ["ana", "bia"]]</code></pre>
      <!--pratica-->
      <h3>Ordenar</h3>
      <pre><code>nums.sort()                  # crescente (altera a lista)
nums.sort(reverse=True)      # decrescente
nomes.sort(key=str.lower)    # ignora maiúsculas
nomes.sort(key=len)          # pelo tamanho
nums.reverse()               # inverte a ordem
nova = sorted(nums)          # devolve uma nova lista ordenada</code></pre>
      <h3>Copiar</h3>
      <p>⚠️ <code>b = a</code> <b>não</b> copia: as duas variáveis apontam para a mesma lista! Use <code>a.copy()</code>, <code>list(a)</code> ou <code>a[:]</code>.</p>
      <h3>Juntar</h3>
      <pre><code>c = a + b      # nova lista
a.extend(b)    # acrescenta b em a</code></pre>
      <h3>Métodos de lista</h3>
      <p><code>append</code>, <code>clear</code>, <code>copy</code>, <code>count</code>, <code>extend</code>, <code>index</code>, <code>insert</code>, <code>pop</code>, <code>remove</code>, <code>reverse</code>, <code>sort</code>.</p>`,
    exemplo: c`notas = [7.5, 9, 4, 6.5, 10]
aprovados = [n for n in notas if n >= 6]
print("Aprovados:", aprovados)
print("Ordenadas:", sorted(notas, reverse=True))
a = [1, 2]
b = a
b.append(3)
print(a)   # a também mudou!
c = a.copy()
c.append(4)
print(a, c)`,
    perguntas: [
      m("O que `[x * 2 for x in [1, 2, 3]]` cria?", ["`[2, 4, 6]`", "`[1, 2, 3, 1, 2, 3]`", "`[1, 4, 9]`", "`6`"], 0, "A compreensão aplica `x * 2` a cada item."),
      vf("Depois de `b = a`, mudar `b` também muda `a`.", true, "`b = a` não copia: as duas apontam para a mesma lista. Use `a.copy()`."),
      m("Qual a diferença entre `lista.sort()` e `sorted(lista)`?", ["`sort()` altera a lista; `sorted()` devolve uma nova", "Nenhuma", "`sorted()` só funciona com números", "`sort()` devolve uma nova lista"], 0, "`sort()` ordena no lugar e devolve `None`.")
    ],
    exercicios: [
      comp("Preços com desconto", `Complete a compreensão de lista para criar <code>com_desconto</code> com cada preço multiplicado por 0.9.`, `<code>[expressão for p in precos]</code>`,
        c`precos = [100, 50, 20]
com_desconto = [____ for p in ____]
print(com_desconto)`, c`precos = [100, 50, 20]
com_desconto = [p * 0.9 for p in precos]
print(com_desconto)`, c`
assert [round(x, 2) for x in com_desconto] == [90.0, 45.0, 18.0], f"com_desconto ficou {com_desconto}"`),
      criar("Ranking de vendas", `Crie a função <code>top3(vendas)</code> que devolve uma <b>nova</b> lista com os 3 maiores valores, do maior para o menor, <b>sem alterar</b> a lista original.`, `<code>sorted(vendas, reverse=True)[:3]</code>`,
        c`def top3(vendas):
    pass
`, c`def top3(vendas):
    return sorted(vendas, reverse=True)[:3]`, c`
v = [300, 1200, 50, 800, 950]
assert top3(v) == [1200, 950, 800], f"top3 deu {top3(v)}"
assert v == [300, 1200, 50, 800, 950], "A lista original não pode ser alterada (use sorted)"
assert top3([5, 1]) == [5, 1], "Com menos de 3 valores, devolva os que existem"`),
      criar("Só os pares", `Crie a função <code>pares(numeros)</code> que devolve uma lista só com os números pares, usando compreensão de lista com <code>if</code>.`, `<code>[n for n in numeros if n % 2 == 0]</code>`,
        c`def pares(numeros):
    pass
`, c`def pares(numeros):
    return [n for n in numeros if n % 2 == 0]`, c`
assert pares([1, 2, 3, 4, 10]) == [2, 4, 10], f"pares deu {pares([1, 2, 3, 4, 10])}"
assert pares([1, 3]) == [], "Sem pares, devolva lista vazia"`, { padroes: [[/\[.*for .* in .*if .*\]/, "Use uma compreensão de lista com if."]] })
    ]
  },
  {
    id: "tuplas", secao: S2, titulo: "Tuplas",
    teoria: `
      <p>Uma <b>tupla</b> é como uma lista, mas <b>imutável</b>: depois de criada, não muda. Usa parênteses:</p>
      <pre><code>ponto = (10, 20)
cores = ("vermelho", "verde", "azul")
uma = ("só um",)     # ⚠️ com um item, precisa da vírgula!
print(cores[0], cores[-1], cores[1:], len(cores))</code></pre>
      <p>Use tuplas para dados que <b>não devem mudar</b>: coordenadas, dias da semana, uma linha vinda do banco de dados.</p>
      <!--pratica-->
      <h3>“Alterar” uma tupla</h3>
      <p>Não dá direto. O truque é converter para lista, mudar e converter de volta: <code>l = list(t); l.append(4); t = tuple(l)</code>. Ou juntar tuplas: <code>t = t + (4,)</code>.</p>
      <h3>Desempacotar</h3>
      <pre><code>nome, idade, cidade = ("Ana", 30, "Natal")
primeiro, *resto = (1, 2, 3, 4)   # primeiro = 1, resto = [2, 3, 4]</code></pre>
      <h3>Laços, juntar e métodos</h3>
      <p>Percorra com <code>for</code> como uma lista. Junte com <code>+</code> e repita com <code>*</code> (<code>(1, 2) * 2</code> → <code>(1, 2, 1, 2)</code>). Só há dois métodos: <code>count()</code> e <code>index()</code>.</p>`,
    exemplo: c`dias = ("seg", "ter", "qua", "qui", "sex")
print(dias[0], len(dias))
latitude, longitude = (-8.05, -34.9)
print("Recife fica em", latitude, longitude)
primeiro, *outros = dias
print(primeiro, outros)
print(dias.index("qua"), (1, 2) * 2)`,
    perguntas: [
      vf("É possível fazer `t[0] = 5` numa tupla.", false, "Tuplas são imutáveis: isso dá `TypeError`."),
      m("Qual destas cria uma tupla com **um** item?", ["`(\"a\",)`", "`(\"a\")`", "`[\"a\"]`", "`{\"a\"}`"], 0, "Sem a vírgula, `(\"a\")` é só um texto entre parênteses.")
    ],
    exercicios: [
      comp("Desempacotando o endereço", `Complete para desempacotar a tupla em <code>rua</code>, <code>numero</code> e <code>cidade</code>.`, `Três nomes separados por vírgula antes do <code>=</code>.`,
        c`endereco = ("Rua das Flores", 120, "Natal")
____ = endereco
print(rua, numero, cidade)`, c`endereco = ("Rua das Flores", 120, "Natal")
rua, numero, cidade = endereco
print(rua, numero, cidade)`, c`
assert (rua, numero, cidade) == ("Rua das Flores", 120, "Natal"), "Os valores não batem"`),
      criar("Adicionando à tupla", `A tupla <code>meses = ("jan", "fev")</code> precisa ganhar <code>"mar"</code>. Crie a função <code>adicionar(t, item)</code> que devolve uma <b>nova tupla</b> com o item no fim.`, `<code>return t + (item,)</code>`,
        c`def adicionar(t, item):
    pass
`, c`def adicionar(t, item):
    return t + (item,)`, c`
r = adicionar(("jan", "fev"), "mar")
assert r == ("jan", "fev", "mar") and isinstance(r, tuple), f"Deveria devolver a tupla ('jan', 'fev', 'mar'), veio {r!r}"`)
    ]
  },
  {
    id: "sets", secao: S2, titulo: "Sets (conjuntos) e frozenset",
    teoria: `
      <p>Um <b>set</b> é uma coleção <b>sem ordem</b> e <b>sem repetições</b>. Usa chaves:</p>
      <pre><code>cores = {"azul", "verde", "azul"}
print(cores)        # {'azul', 'verde'} (o repetido some)
print("azul" in cores)
vazio = set()       # ⚠️ {} cria um dicionário vazio, não um set</code></pre>
      <p>Não há índice (<code>cores[0]</code> dá erro): percorra com <code>for</code> ou teste com <code>in</code>.</p>
      <h3>Adicionar e remover</h3>
      <pre><code>cores.add("roxo")
cores.update(["preto", "branco"])
cores.remove("roxo")    # erro se não existir
cores.discard("rosa")   # sem erro se não existir
cores.pop()             # remove um qualquer</code></pre>
      <!--pratica-->
      <h3>Operações de conjunto</h3>
      <pre><code>a = {1, 2, 3}
b = {3, 4}
a | b    # união: {1, 2, 3, 4}       (a.union(b))
a &amp; b    # interseção: {3}           (a.intersection(b))
a - b    # diferença: {1, 2}         (a.difference(b))
a ^ b    # diferença simétrica: {1, 2, 4}</code></pre>
      <p>Também há <code>issubset()</code>, <code>issuperset()</code> e <code>isdisjoint()</code>.</p>
      <h3>frozenset</h3>
      <p>É um set <b>imutável</b>: <code>frozenset([1, 2])</code>. Pode ser chave de dicionário ou item de outro set.</p>
      <p>💼 Uso real: remover duplicados (<code>list(set(lista))</code>) e comparar grupos (clientes que compraram A <b>e</b> B).</p>`,
    exemplo: c`compraram_cafe = {"Ana", "Bruno", "Carla"}
compraram_pao = {"Bruno", "Diego"}
print("Os dois:", compraram_cafe & compraram_pao)
print("Algum:", compraram_cafe | compraram_pao)
print("Só café:", compraram_cafe - compraram_pao)
print(list(set([3, 1, 3, 2, 1])))`,
    perguntas: [
      m("Qual é o resultado de `len({1, 1, 2, 2, 3})`?", ["3", "5", "2", "Erro"], 0, "Sets não têm repetidos: sobram 1, 2 e 3."),
      m("Como criar um set **vazio**?", ["`set()`", "`{}`", "`[]`", "`()`"], 0, "`{}` cria um dicionário vazio."),
      m("Qual operador dá a **interseção** de dois sets?", ["`&`", "`|`", "`-`", "`+`"], 0, "`&` = elementos que estão nos dois.")
    ],
    exercicios: [
      comp("Alunos nas duas oficinas", `Complete para descobrir quem está nas <b>duas</b> oficinas (<code>ambas</code>) e quem está em <b>pelo menos uma</b> (<code>todos</code>).`, `Interseção é <code>&amp;</code>; união é <code>|</code>.`,
        c`robotica = {"Ana", "Bia", "Caio"}
musica = {"Bia", "Davi"}
ambas = robotica ____ musica
todos = robotica ____ musica
print(ambas, todos)`, c`robotica = {"Ana", "Bia", "Caio"}
musica = {"Bia", "Davi"}
ambas = robotica & musica
todos = robotica | musica
print(ambas, todos)`, c`
assert ambas == {"Bia"}, f"ambas deveria ser {{'Bia'}}, mas é {ambas}"
assert todos == {"Ana", "Bia", "Caio", "Davi"}, f"todos ficou {todos}"`),
      criar("Removendo e-mails repetidos", `Crie a função <code>unicos(emails)</code> que devolve uma lista <b>ordenada</b> com os e-mails sem repetição (ignore maiúsculas: <code>"Ana@x.com"</code> e <code>"ana@x.com"</code> são o mesmo; devolva em minúsculas).`, `Faça um set com <code>e.lower()</code> de cada e-mail e depois <code>sorted()</code>.`,
        c`def unicos(emails):
    pass
`, c`def unicos(emails):
    return sorted({e.lower() for e in emails})`, c`
r = unicos(["ana@x.com", "Bia@x.com", "ANA@x.com", "caio@x.com"])
assert r == ["ana@x.com", "bia@x.com", "caio@x.com"], f"unicos deu {r}"
assert unicos([]) == [], "Lista vazia deve devolver lista vazia"`)
    ]
  },
  {
    id: "dicionarios", secao: S2, titulo: "Dicionários",
    teoria: `
      <p>Um <b>dicionário</b> guarda pares <b>chave: valor</b>. Você busca pelo nome (a chave), não pela posição. É ordenado (mantém a ordem de inserção), mutável e não permite chaves repetidas.</p>
      <pre><code>cliente = {"nome": "Ana", "idade": 30, "cidade": "Natal"}
print(cliente["nome"])            # Ana
print(cliente.get("email"))       # None (sem erro se não existir)
print(cliente.get("email", "-"))  # "-" (valor padrão)
print(len(cliente), "idade" in cliente)</code></pre>
      <h3>Mudar, adicionar e remover</h3>
      <pre><code>cliente["idade"] = 31              # muda
cliente["email"] = "ana@x.com"     # adiciona (chave nova)
cliente.update({"cidade": "Recife", "vip": True})
cliente.pop("vip")                 # remove e devolve
del cliente["email"]
cliente.popitem()                  # remove o último inserido</code></pre>
      <!--pratica-->
      <h3>Percorrer</h3>
      <pre><code>for chave in cliente:                 # chaves
    print(chave, cliente[chave])
for chave, valor in cliente.items():  # pares
    print(chave, valor)
print(list(cliente.keys()), list(cliente.values()))</code></pre>
      <h3>Copiar e aninhar</h3>
      <p>Como nas listas, <code>d2 = d</code> não copia: use <code>d.copy()</code> ou <code>dict(d)</code>. Dicionários podem conter outros dicionários (e listas):</p>
      <pre><code>familia = {
  "filho1": {"nome": "Leo", "ano": 2015},
  "filho2": {"nome": "Mia", "ano": 2018}
}
print(familia["filho2"]["nome"])  # Mia</code></pre>
      <p>Outros métodos: <code>fromkeys()</code>, <code>setdefault()</code>, <code>clear()</code>.</p>`,
    exemplo: c`estoque = {"arroz": 10, "feijão": 4}
estoque["café"] = 7
estoque["feijão"] += 6
for produto, qtd in estoque.items():
    print(f"{produto}: {qtd}")
print(estoque.get("açúcar", 0))`,
    perguntas: [
      m("O que `{\"a\": 1}.get(\"b\", 0)` devolve?", ["0", "None", "Erro", "1"], 0, "`get` devolve o valor padrão (0) quando a chave não existe."),
      m("Qual método percorre chave e valor ao mesmo tempo?", ["`items()`", "`keys()`", "`values()`", "`pairs()`"], 0, "`for k, v in d.items():`"),
      l("Complete para adicionar a chave `\"email\"`:", c`cliente = {"nome": "Ana"}
cliente[____] = "ana@x.com"`, ["\"email\"", "'email'"], "Atribuir a uma chave nova cria o par no dicionário.")
    ],
    exercicios: [
      comp("Cadastro do produto", `Complete: mude o <code>preco</code> para 9.9, adicione a chave <code>"categoria"</code> com <code>"Bebidas"</code> e remova a chave <code>"promocao"</code>.`, `Atribuição com colchetes e <code>pop()</code> (ou <code>del</code>).`,
        c`produto = {"nome": "Chá", "preco": 8.5, "promocao": True}
produto[____] = 9.9
produto[____] = "Bebidas"
produto.____("promocao")
print(produto)`, c`produto = {"nome": "Chá", "preco": 8.5, "promocao": True}
produto["preco"] = 9.9
produto["categoria"] = "Bebidas"
produto.pop("promocao")
print(produto)`, c`
assert produto == {"nome": "Chá", "preco": 9.9, "categoria": "Bebidas"}, f"produto ficou {produto}"`),
      criar("Contando palavras", `Crie a função <code>contar(palavras)</code> que recebe uma lista de palavras e devolve um dicionário com quantas vezes cada uma aparece. Ex.: <code>contar(["pão", "café", "pão"])</code> → <code>{"pão": 2, "café": 1}</code>.`, `Para cada palavra: <code>d[p] = d.get(p, 0) + 1</code>.`,
        c`def contar(palavras):
    pass
`, c`def contar(palavras):
    d = {}
    for p in palavras:
        d[p] = d.get(p, 0) + 1
    return d`, c`
assert contar(["pão", "café", "pão"]) == {"pão": 2, "café": 1}, f"contar deu {contar(['pão', 'café', 'pão'])}"
assert contar([]) == {}, "Lista vazia deve dar dicionário vazio"`),
      criar("Total do pedido", `Dado um pedido como dicionário de dicionários (<code>{"café": {"preco": 12.0, "qtd": 2}, ...}</code>), crie <code>total(pedido)</code> que devolve a soma de <code>preco * qtd</code> de todos os itens.`, `Percorra com <code>for item in pedido.values():</code>.`,
        c`def total(pedido):
    pass
`, c`def total(pedido):
    soma = 0
    for item in pedido.values():
        soma += item["preco"] * item["qtd"]
    return soma`, c`
p = {"café": {"preco": 12.0, "qtd": 2}, "pão": {"preco": 0.5, "qtd": 10}}
assert abs(total(p) - 29.0) < 1e-9, f"total deveria ser 29.0, deu {total(p)}"
assert total({}) == 0, "Pedido vazio deve dar 0"`)
    ]
  },
  {
    id: "if-else", secao: S3, titulo: "if, elif e else",
    teoria: `
      <p><code>if</code> executa um bloco só se a condição for verdadeira. <code>elif</code> (“senão, se”) testa outra condição; <code>else</code> pega todo o resto.</p>
      <pre><code>nota = 7
if nota &gt;= 9:
    print("Excelente")
elif nota &gt;= 6:
    print("Aprovado")
else:
    print("Reprovado")</code></pre>
      <p>Só o <b>primeiro</b> bloco verdadeiro roda. Use <code>and</code>, <code>or</code> e <code>not</code> para combinar condições.</p>
      <!--pratica-->
      <h3>Atalhos</h3>
      <pre><code>if a &gt; b: print("a é maior")              # if numa linha
print("A") if a &gt; b else print("B")      # ternário</code></pre>
      <h3>if aninhado e pass</h3>
      <pre><code>if idade &gt;= 18:
    if tem_cnh:
        print("Pode dirigir")
    else:
        print("Precisa tirar a CNH")

if em_manutencao:
    pass   # “não faça nada por enquanto” (um bloco não pode ficar vazio)</code></pre>`,
    exemplo: c`valor = 250
if valor >= 200:
    frete = 0
elif valor >= 100:
    frete = 10
else:
    frete = 20
print("Frete:", frete)`,
    perguntas: [
      m("Com `x = 5`, o que este código mostra? `if x > 3: print(\"A\")` / `elif x > 1: print(\"B\")`", ["Só A", "A e B", "Só B", "Nada"], 0, "Só o primeiro bloco verdadeiro é executado."),
      m("Para que serve `pass`?", ["Deixar um bloco vazio sem dar erro", "Sair do programa", "Pular para o próximo `elif`", "Repetir o bloco"], 0, "`pass` é uma instrução que não faz nada.")
    ],
    exercicios: [
      comp("Faixa etária", `Complete a função para devolver <code>"criança"</code> (menos de 12), <code>"adolescente"</code> (menos de 18) ou <code>"adulto"</code>.`, `Use <code>elif</code> e <code>else</code>.`,
        c`def faixa(idade):
    if idade < 12:
        return "criança"
    ____ idade < 18:
        return "adolescente"
    ____:
        return "adulto"`, c`def faixa(idade):
    if idade < 12:
        return "criança"
    elif idade < 18:
        return "adolescente"
    else:
        return "adulto"`, c`
assert faixa(5) == "criança" and faixa(15) == "adolescente" and faixa(30) == "adulto", "Confira as faixas"
assert faixa(12) == "adolescente" and faixa(18) == "adulto", "Confira os limites (12 e 18)"`),
      criar("Calculando o frete", `Crie <code>frete(valor, regiao)</code>: grátis (0) se o valor for 200 ou mais; senão, 15 para a região <code>"sudeste"</code> e 30 para as outras.`, `Primeiro teste o valor; depois, num <code>if</code> dentro do <code>else</code> (ou com <code>elif</code>), a região.`,
        c`def frete(valor, regiao):
    pass
`, c`def frete(valor, regiao):
    if valor >= 200:
        return 0
    elif regiao == "sudeste":
        return 15
    else:
        return 30`, c`
assert frete(250, "norte") == 0, "Acima de 200 é grátis"
assert frete(100, "sudeste") == 15, "Sudeste paga 15"
assert frete(100, "nordeste") == 30, "Outras regiões pagam 30"
assert frete(200, "sul") == 0, "200 exatos já é grátis"`),
      criar("Senha forte", `Crie <code>senha_forte(s)</code> que devolve <code>True</code> se a senha tiver <b>pelo menos 8</b> caracteres <b>e</b> pelo menos um número (dica: <code>any(ch.isdigit() for ch in s)</code>).`, `Junte as duas condições com <code>and</code>.`,
        c`def senha_forte(s):
    pass
`, c`def senha_forte(s):
    return len(s) >= 8 and any(ch.isdigit() for ch in s)`, c`
assert senha_forte("abc12345") is True, "abc12345 é forte"
assert senha_forte("abcdefgh") is False, "Sem número não é forte"
assert senha_forte("ab1") is False, "Curta demais"`)
    ]
  },
  {
    id: "match", secao: S3, titulo: "match (casamento de padrões)",
    teoria: `
      <p>Desde o Python 3.10, <code>match</code> compara um valor com vários <code>case</code>, como o <code>switch</code> de outras linguagens:</p>
      <pre><code>dia = 3
match dia:
    case 1:
        print("Segunda")
    case 2 | 3 | 4:          # vários valores
        print("Meio da semana")
    case 6 | 7:
        print("Fim de semana")
    case _:                  # padrão: “qualquer outro”
        print("Sexta")</code></pre>
      <p>Só o primeiro <code>case</code> que casar é executado. O <code>_</code> funciona como o <code>else</code>.</p>
      <!--pratica-->
      <h3>Condições extras (guard)</h3>
      <pre><code>match mes:
    case 12 if dia &gt;= 20:
        print("Férias!")
    case _:
        print("Dia comum")</code></pre>`,
    exemplo: c`def status(codigo):
    match codigo:
        case 200:
            return "OK"
        case 404:
            return "Não encontrado"
        case 500 | 502 | 503:
            return "Erro no servidor"
        case _:
            return "Outro"
print(status(200), status(404), status(503), status(418))`,
    perguntas: [
      m("Qual `case` funciona como o “senão” do `match`?", ["`case _:`", "`case else:`", "`default:`", "`case *:`"], 0, "O curinga `_` casa com qualquer valor."),
      vf("Num `match`, todos os `case` verdadeiros são executados.", false, "Só o primeiro que casar.")
    ],
    exercicios: [
      comp("Forma de pagamento", `Complete o <code>match</code>: <code>"pix"</code> tem 5% de desconto (0.05), <code>"debito"</code> ou <code>"dinheiro"</code> têm 2% (0.02) e qualquer outro, 0.`, `Use <code>|</code> para juntar dois valores e <code>_</code> para o resto.`,
        c`def desconto(forma):
    match forma:
        case "pix":
            return 0.05
        case "debito" ____ "dinheiro":
            return 0.02
        case ____:
            return 0`, c`def desconto(forma):
    match forma:
        case "pix":
            return 0.05
        case "debito" | "dinheiro":
            return 0.02
        case _:
            return 0`, c`
assert desconto("pix") == 0.05 and desconto("debito") == 0.02 and desconto("dinheiro") == 0.02, "Confira pix/debito/dinheiro"
assert desconto("credito") == 0, "Outras formas: 0"`),
      criar("Comandos do robô", `Crie <code>mover(comando)</code> com <code>match</code>: <code>"frente"</code> → <code>(0, 1)</code>, <code>"tras"</code> → <code>(0, -1)</code>, <code>"esquerda"</code> → <code>(-1, 0)</code>, <code>"direita"</code> → <code>(1, 0)</code> e qualquer outro → <code>(0, 0)</code>.`, `Cada <code>case</code> devolve uma tupla.`,
        c`def mover(comando):
    pass
`, c`def mover(comando):
    match comando:
        case "frente":
            return (0, 1)
        case "tras":
            return (0, -1)
        case "esquerda":
            return (-1, 0)
        case "direita":
            return (1, 0)
        case _:
            return (0, 0)`, c`
assert mover("frente") == (0, 1) and mover("tras") == (0, -1), "frente/tras"
assert mover("esquerda") == (-1, 0) and mover("direita") == (1, 0), "esquerda/direita"
assert mover("pular") == (0, 0), "Comando desconhecido: (0, 0)"`, { padroes: [[/match\s+comando/, "Use match comando:"]] })
    ]
  },
  {
    id: "while", secao: S3, titulo: "Laço while",
    teoria: `
      <p><code>while</code> repete um bloco <b>enquanto</b> a condição for verdadeira:</p>
      <pre><code>i = 1
while i &lt;= 5:
    print(i)
    i += 1        # ⚠️ sem isso, o laço nunca termina!</code></pre>
      <h3>break, continue e else</h3>
      <ul>
        <li><code>break</code>: sai do laço na hora;</li>
        <li><code>continue</code>: pula para a próxima repetição;</li>
        <li><code>else</code>: roda uma vez quando a condição ficar falsa (não roda se saiu por <code>break</code>).</li>
      </ul>
      <!--pratica-->
      <pre><code>saldo = 100
while True:
    saque = 30
    if saque &gt; saldo:
        print("Saldo insuficiente")
        break
    saldo -= saque
    print("Sacou 30, saldo:", saldo)</code></pre>`,
    exemplo: c`tentativas = 0
senha_certa = "1234"
digitadas = ["0000", "1111", "1234"]
while tentativas < len(digitadas):
    if digitadas[tentativas] == senha_certa:
        print("Acesso liberado na tentativa", tentativas + 1)
        break
    tentativas += 1
else:
    print("Bloqueado")`,
    perguntas: [
      m("O que `break` faz dentro de um laço?", ["Sai do laço imediatamente", "Pula para a próxima volta", "Para o programa inteiro", "Reinicia o laço"], 0, "`continue` é que pula para a próxima volta."),
      vf("O `else` de um `while` roda mesmo quando o laço termina com `break`.", false, "O `else` só roda quando a condição fica falsa normalmente.")
    ],
    exercicios: [
      comp("Contagem regressiva", `Complete para mostrar 5, 4, 3, 2, 1 e depois <code>Feliz Ano Novo!</code>.`, `A condição é “enquanto n for maior que 0” e, no fim do bloco, diminua 1.`,
        c`n = 5
while n ____ 0:
    print(n)
    n ____ 1
print("Feliz Ano Novo!")`, c`n = 5
while n > 0:
    print(n)
    n -= 1
print("Feliz Ano Novo!")`, c`
assert __saida__.split("\n")[:6] == ["5", "4", "3", "2", "1", "Feliz Ano Novo!"], f"Saída: {__saida__!r}"`),
      criar("Meta de economia", `Crie <code>meses_para_meta(meta, deposito)</code>: começando do zero, a cada mês soma-se <code>deposito</code>. Use <code>while</code> e devolva <b>quantos meses</b> leva até o total alcançar (ou passar) a meta.`, `Contador de meses + total acumulado, enquanto <code>total &lt; meta</code>.`,
        c`def meses_para_meta(meta, deposito):
    pass
`, c`def meses_para_meta(meta, deposito):
    total = 0
    meses = 0
    while total < meta:
        total += deposito
        meses += 1
    return meses`, c`
assert meses_para_meta(1000, 300) == 4, f"1000 com 300/mês: 4 meses, deu {meses_para_meta(1000, 300)}"
assert meses_para_meta(600, 200) == 3, "600 com 200/mês: 3 meses"
assert meses_para_meta(0, 50) == 0, "Meta 0: 0 meses"`, { padroes: [[/while/, "Use um laço while."]] })
    ]
  },
  {
    id: "for", secao: S3, titulo: "Laço for e range()",
    teoria: `
      <p><code>for</code> percorre os itens de uma sequência (lista, tupla, string, dicionário, set, range…):</p>
      <pre><code>for fruta in ["maçã", "uva"]:
    print(fruta)
for letra in "oi":
    print(letra)</code></pre>
      <h3>range()</h3>
      <p><code>range</code> gera uma sequência de números (sem criar a lista inteira na memória):</p>
      <pre><code>range(5)          # 0, 1, 2, 3, 4
range(2, 6)       # 2, 3, 4, 5
range(0, 10, 3)   # 0, 3, 6, 9 (de 3 em 3)
range(5, 0, -1)   # 5, 4, 3, 2, 1
list(range(3))    # [0, 1, 2]</code></pre>
      <!--pratica-->
      <h3>break, continue, else, aninhados e pass</h3>
      <pre><code>for n in range(10):
    if n == 3:
        continue     # pula o 3
    if n == 6:
        break        # para no 6
    print(n)
else:
    print("só roda se não houver break")

for linha in range(1, 3):        # laços aninhados
    for coluna in range(1, 3):
        print(linha, "x", coluna, "=", linha * coluna)

for x in []:
    pass                         # laço vazio</code></pre>`,
    exemplo: c`for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")

total = 0
for preco in [10.5, 3.2, 8.0]:
    total += preco
print("Total:", total)`,
    perguntas: [
      m("Quais números `range(1, 4)` gera?", ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2, 3", "4, 3, 2, 1"], 0, "O fim (4) não entra."),
      m("O que `list(range(0, 10, 5))` devolve?", ["`[0, 5]`", "`[0, 5, 10]`", "`[5, 10]`", "`[0, 10]`"], 0, "Começa em 0, de 5 em 5, até antes de 10."),
      l("Complete para percorrer de 10 até 1 (decrescente):", c`for i in range(10, 0, ____):
    print(i)`, ["-1"], "Passo negativo conta para trás.")
    ],
    exercicios: [
      comp("Tabuada", `Complete para mostrar a tabuada do 9, de <code>9 x 1 = 9</code> até <code>9 x 10 = 90</code>.`, `<code>range(1, 11)</code> gera de 1 a 10.`,
        c`for i in range(____, ____):
    print(f"9 x {i} = {9 * i}")`, c`for i in range(1, 11):
    print(f"9 x {i} = {9 * i}")`, c`
linhas = __saida__.strip().splitlines()
assert len(linhas) == 10 and linhas[0] == "9 x 1 = 9" and linhas[-1] == "9 x 10 = 90", f"Saída: {linhas}"`),
      criar("Soma dos múltiplos", `Crie <code>soma_multiplos(n, limite)</code> que devolve a soma de todos os múltiplos de <code>n</code> de <code>n</code> até <code>limite</code> (inclusive), usando <code>for</code> e <code>range</code> com passo. Ex.: <code>soma_multiplos(3, 10)</code> = 3 + 6 + 9 = 18.`, `<code>range(n, limite + 1, n)</code>`,
        c`def soma_multiplos(n, limite):
    pass
`, c`def soma_multiplos(n, limite):
    total = 0
    for x in range(n, limite + 1, n):
        total += x
    return total`, c`
assert soma_multiplos(3, 10) == 18, f"soma_multiplos(3, 10) deu {soma_multiplos(3, 10)}"
assert soma_multiplos(5, 20) == 50, "5+10+15+20 = 50 (o limite entra)"
assert soma_multiplos(4, 3) == 0, "Sem múltiplos: 0"`),
      criar("Primeiro produto em falta", `Crie <code>primeiro_em_falta(estoque)</code> que recebe um dicionário <code>produto: quantidade</code> e devolve o <b>primeiro</b> produto com quantidade 0 (use <code>for</code> e <code>return</code>/<code>break</code>). Se nenhum estiver em falta, devolva <code>None</code>.`, `<code>for produto, qtd in estoque.items():</code>`,
        c`def primeiro_em_falta(estoque):
    pass
`, c`def primeiro_em_falta(estoque):
    for produto, qtd in estoque.items():
        if qtd == 0:
            return produto
    return None`, c`
assert primeiro_em_falta({"arroz": 5, "café": 0, "sal": 0}) == "café", "Deveria ser 'café'"
assert primeiro_em_falta({"arroz": 5}) is None, "Sem falta: None"`)
    ]
  }
];
