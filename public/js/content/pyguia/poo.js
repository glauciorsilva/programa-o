// Python de A a Z — Parte 6: orientação a objetos e Parte 7: arquivos.
import { m, vf, l, c, comp, criar } from "./util.js";

const S6 = "6. Classes e objetos (POO)";
const S7 = "7. Arquivos";

export default [
  {
    id: "classes", secao: S6, titulo: "Classes, objetos, __init__ e self",
    teoria: `
      <p>Python é orientado a objetos: quase tudo é um <b>objeto</b>, com <b>atributos</b> (dados) e <b>métodos</b> (ações). Uma <b>classe</b> é o “molde” que cria objetos.</p>
      <pre><code>class Produto:
    def __init__(self, nome, preco):   # roda ao criar o objeto
        self.nome = nome               # atributos
        self.preco = preco

    def com_desconto(self, pct):       # método
        return self.preco * (1 - pct / 100)

    def __str__(self):                 # como o objeto aparece no print
        return f"{self.nome} - R$ {self.preco:.2f}"

cafe = Produto("Café", 12.9)           # cria um objeto (instância)
print(cafe.nome, cafe.com_desconto(10))
print(cafe)</code></pre>
      <!--pratica-->
      <ul>
        <li><code>__init__</code> é o <b>construtor</b>: prepara o objeto novo.</li>
        <li><code>self</code> é o <b>próprio objeto</b>; todo método o recebe como primeiro parâmetro (o nome é convenção).</li>
        <li>Para mudar um atributo: <code>cafe.preco = 13.5</code>. Para apagar: <code>del cafe.preco</code>. Para apagar o objeto: <code>del cafe</code>.</li>
        <li>Classe vazia: <code>class Nada: pass</code>.</li>
      </ul>
      <h3>Atributos de classe × de instância</h3>
      <pre><code>class Conta:
    banco = "Banco Exemplo"      # de classe: compartilhado por todas
    def __init__(self, titular):
        self.titular = titular    # de instância: um por objeto</code></pre>`,
    exemplo: c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo
    def depositar(self, valor):
        self.saldo += valor
    def __str__(self):
        return f"{self.titular}: R$ {self.saldo:.2f}"

c1 = Conta("Ana")
c1.depositar(150)
c2 = Conta("Bia", 50)
print(c1)
print(c2)`,
    perguntas: [
      m("O que é `self` dentro de um método?", ["O próprio objeto que chamou o método", "A classe", "Uma palavra reservada obrigatória com esse nome", "O módulo atual"], 0, "`self` é a instância; o nome é só convenção."),
      m("Qual método é chamado automaticamente ao criar um objeto?", ["`__init__`", "`__str__`", "`__new_object__`", "`create`"], 0, "`__init__` é o construtor."),
      l("Complete para criar a classe:", c`____ Cliente:
    pass`, ["class"], "Classes são criadas com `class`.")
    ],
    exercicios: [
      comp("Classe Retângulo", `Complete a classe para guardar <code>largura</code> e <code>altura</code> e calcular a <code>area()</code>.`, `Dentro do <code>__init__</code>, guarde os valores em <code>self</code>.`,
        c`class Retangulo:
    def __init__(self, largura, altura):
        self.largura = ____
        self.altura = ____

    def area(self):
        return ____.largura * self.altura

r = Retangulo(3, 4)
print(r.area())`, c`class Retangulo:
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

r = Retangulo(3, 4)
print(r.area())`, c`
assert Retangulo(3, 4).area() == 12 and Retangulo(5, 2).area() == 10, "area() deveria ser largura * altura"
assert Retangulo(3, 4).largura == 3, "Guarde a largura em self.largura"`),
      criar("Carrinho de compras", `Crie a classe <code>Carrinho</code> com: atributo <code>itens</code> (lista vazia ao criar); método <code>adicionar(nome, preco)</code> que guarda a tupla <code>(nome, preco)</code>; método <code>total()</code> que devolve a soma dos preços; e <code>__str__</code> que devolve <code>"Carrinho com N itens"</code>.`, `No <code>__init__</code>: <code>self.itens = []</code>.`,
        c`class Carrinho:
    pass
`, c`class Carrinho:
    def __init__(self):
        self.itens = []

    def adicionar(self, nome, preco):
        self.itens.append((nome, preco))

    def total(self):
        return sum(preco for _, preco in self.itens)

    def __str__(self):
        return f"Carrinho com {len(self.itens)} itens"`, c`
k = Carrinho()
assert k.itens == [] and k.total() == 0, "Carrinho novo: itens vazio e total 0"
k.adicionar("Café", 12.5)
k.adicionar("Pão", 0.5)
assert k.itens == [("Café", 12.5), ("Pão", 0.5)], f"itens ficou {k.itens}"
assert k.total() == 13.0, f"total() deveria ser 13.0, deu {k.total()}"
assert str(k) == "Carrinho com 2 itens", f"str(k) deu {str(k)!r}"
assert Carrinho().itens == [], "Cada carrinho precisa da própria lista (crie no __init__)"`)
    ]
  },
  {
    id: "heranca", secao: S6, titulo: "Herança",
    teoria: `
      <p><b>Herança</b> cria uma classe nova (filha) a partir de outra (pai), reaproveitando atributos e métodos:</p>
      <pre><code>class Pessoa:
    def __init__(self, nome):
        self.nome = nome
    def apresentar(self):
        return f"Sou {self.nome}"

class Aluno(Pessoa):                  # Aluno herda de Pessoa
    def __init__(self, nome, curso):
        super().__init__(nome)        # chama o __init__ do pai
        self.curso = curso
    def apresentar(self):             # sobrescreve o método
        return f"{super().apresentar()} e estudo {self.curso}"

print(Aluno("Ana", "Python").apresentar())</code></pre>
      <!--pratica-->
      <ul>
        <li><code>super()</code> acessa a classe pai.</li>
        <li>A filha pode <b>acrescentar</b> atributos/métodos e <b>sobrescrever</b> os do pai.</li>
        <li><code>isinstance(obj, Pessoa)</code> é <code>True</code> também para um <code>Aluno</code>; <code>issubclass(Aluno, Pessoa)</code> → <code>True</code>.</li>
      </ul>`,
    exemplo: c`class Funcionario:
    def __init__(self, nome, salario):
        self.nome = nome
        self.salario = salario
    def bonus(self):
        return self.salario * 0.10

class Gerente(Funcionario):
    def bonus(self):
        return self.salario * 0.20

for f in [Funcionario("Ana", 3000), Gerente("Bia", 8000)]:
    print(f.nome, f.bonus())`,
    perguntas: [
      m("Como chamar o `__init__` da classe pai dentro da filha?", ["`super().__init__(...)`", "`parent.__init__(...)`", "`self.__init__(...)`", "`base()`"], 0, "`super()` dá acesso à classe pai."),
      vf("Uma classe filha pode sobrescrever um método da classe pai.", true, "Basta definir um método com o mesmo nome.")
    ],
    exercicios: [
      comp("Animal e Cachorro", `Complete: <code>Cachorro</code> herda de <code>Animal</code> e sobrescreve <code>som()</code> para devolver <code>"Au au"</code>.`, `A classe pai vai entre parênteses.`,
        c`class Animal:
    def __init__(self, nome):
        self.nome = nome
    def som(self):
        return "..."

class Cachorro(____):
    def som(self):
        return ____

rex = Cachorro("Rex")
print(rex.nome, rex.som())`, c`class Animal:
    def __init__(self, nome):
        self.nome = nome
    def som(self):
        return "..."

class Cachorro(Animal):
    def som(self):
        return "Au au"

rex = Cachorro("Rex")
print(rex.nome, rex.som())`, c`
assert issubclass(Cachorro, Animal), "Cachorro deve herdar de Animal"
assert Cachorro("Rex").som() == "Au au" and Cachorro("Rex").nome == "Rex", "Cachorro('Rex').som() deveria ser 'Au au'"`),
      criar("Conta poupança", `Existe a classe <code>Conta</code> (titular, saldo, <code>depositar</code>). Crie <code>Poupanca(Conta)</code> com o atributo extra <code>taxa</code> (recebido no construtor, junto com titular e saldo) e o método <code>render()</code>, que soma <code>saldo * taxa</code> ao saldo. Use <code>super().__init__</code>.`, `<code>def __init__(self, titular, saldo, taxa): super().__init__(titular, saldo); self.taxa = taxa</code>`,
        c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo
    def depositar(self, valor):
        self.saldo += valor

# crie a classe Poupanca
`, c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo
    def depositar(self, valor):
        self.saldo += valor

class Poupanca(Conta):
    def __init__(self, titular, saldo, taxa):
        super().__init__(titular, saldo)
        self.taxa = taxa
    def render(self):
        self.saldo += self.saldo * self.taxa`, c`
p = Poupanca("Ana", 1000, 0.01)
assert isinstance(p, Conta), "Poupanca deve herdar de Conta"
assert p.titular == "Ana" and p.saldo == 1000 and p.taxa == 0.01, "Confira os atributos"
p.render()
assert abs(p.saldo - 1010) < 1e-9, f"Depois de render(), o saldo deveria ser 1010, é {p.saldo}"
p.depositar(90)
assert abs(p.saldo - 1100) < 1e-9, "depositar() herdado deve funcionar"`, { padroes: [[/super\(\)\.__init__/, "Use super().__init__(...)."]] })
    ]
  },
  {
    id: "polimorfismo", secao: S6, titulo: "Polimorfismo e encapsulamento",
    teoria: `
      <h3>Polimorfismo</h3>
      <p>“Muitas formas”: métodos com o <b>mesmo nome</b> em classes diferentes, cada um com o seu comportamento. O código que usa não precisa saber qual é a classe:</p>
      <pre><code>class Pix:
    def pagar(self, valor): return f"Pix de {valor}"
class Cartao:
    def pagar(self, valor): return f"Cartão: {valor} em 1x"

for forma in [Pix(), Cartao()]:
    print(forma.pagar(50))      # cada um responde do seu jeito</code></pre>
      <p>Funções embutidas também são polimórficas: <code>len()</code> funciona com texto, lista, dicionário…</p>
      <!--pratica-->
      <h3>Encapsulamento</h3>
      <p>Esconder os detalhes internos e expor só o necessário. Por convenção, nomes com <code>_</code> são “internos” e com <code>__</code> ficam mais escondidos (<i>name mangling</i>). Com <code>@property</code> você controla leitura e escrita:</p>
      <pre><code>class Conta:
    def __init__(self):
        self.__saldo = 0            # privado
    @property
    def saldo(self):                # leitura: conta.saldo
        return self.__saldo
    def depositar(self, valor):
        if valor &lt;= 0:
            raise ValueError("Valor inválido")
        self.__saldo += valor</code></pre>
      <h3>Classes internas</h3>
      <p>Uma classe pode ser definida dentro de outra (<i>inner class</i>), quando só faz sentido junto dela: <code>class Carro: class Motor: ...</code>.</p>`,
    exemplo: c`class Forma:
    def area(self): return 0
class Quadrado(Forma):
    def __init__(self, lado): self.lado = lado
    def area(self): return self.lado ** 2
class Circulo(Forma):
    def __init__(self, r): self.r = r
    def area(self): return round(3.14159 * self.r ** 2, 2)

for f in [Quadrado(3), Circulo(1)]:
    print(type(f).__name__, f.area())`,
    perguntas: [
      m("Polimorfismo significa…", ["objetos de classes diferentes responderem ao mesmo método, cada um do seu jeito", "uma classe ter vários construtores", "copiar uma classe", "esconder atributos"], 0, "Mesmo nome de método, comportamentos diferentes."),
      m("Para que serve `@property`?", ["Permitir ler um método como se fosse atributo (`obj.saldo`)", "Criar uma classe", "Herdar de outra classe", "Apagar um atributo"], 0, "Com `@property`, `conta.saldo` chama o método sem parênteses.")
    ],
    exercicios: [
      criar("Fretes diferentes", `Crie as classes <code>Correios</code> e <code>Motoboy</code>, cada uma com o método <code>calcular(km)</code>: Correios cobra <code>10 + km * 0.5</code>; Motoboy cobra <code>km * 2</code>. Depois crie <code>mais_barato(opcoes, km)</code>, que recebe uma lista de objetos e devolve o <b>menor</b> valor.`, `Na função, use <code>min(o.calcular(km) for o in opcoes)</code>: polimorfismo!`,
        c``, c`class Correios:
    def calcular(self, km):
        return 10 + km * 0.5

class Motoboy:
    def calcular(self, km):
        return km * 2

def mais_barato(opcoes, km):
    return min(o.calcular(km) for o in opcoes)`, c`
assert Correios().calcular(10) == 15 and Motoboy().calcular(10) == 20, "Confira as fórmulas"
assert mais_barato([Correios(), Motoboy()], 4) == 8, "Com 4 km o motoboy (8) é mais barato que os Correios (12)"
assert mais_barato([Correios(), Motoboy()], 30) == 25, "Com 30 km os Correios (25) ganham"`),
      criar("Saldo protegido", `Crie a classe <code>Cofre</code> com o atributo privado <code>__valor</code> (começa em 0), a propriedade <code>valor</code> (só leitura, com <code>@property</code>) e o método <code>guardar(qtd)</code>, que soma <code>qtd</code> só se for positivo (senão levanta <code>ValueError</code>).`, `Leia a explicação de <code>@property</code> acima.`,
        c`class Cofre:
    pass
`, c`class Cofre:
    def __init__(self):
        self.__valor = 0

    @property
    def valor(self):
        return self.__valor

    def guardar(self, qtd):
        if qtd <= 0:
            raise ValueError("Valor inválido")
        self.__valor += qtd`, c`
k = Cofre()
assert k.valor == 0, "Cofre começa com 0"
k.guardar(50)
assert k.valor == 50, "guardar(50) deveria somar 50"
try:
    k.guardar(-10)
    assert False, "guardar(-10) deveria levantar ValueError"
except ValueError:
    pass
try:
    k.valor = 999
    assert False, "valor deveria ser só leitura (@property sem setter)"
except AttributeError:
    pass
assert not hasattr(k, "valor_publico") and "_Cofre__valor" in vars(k), "Use o atributo privado self.__valor"`)
    ]
  },
  {
    id: "arquivos-ler", secao: S7, titulo: "Abrir e ler arquivos",
    teoria: `
      <p>A função <code>open(nome, modo)</code> abre um arquivo. Os modos:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Modo</th><th>Para</th></tr></thead><tbody>
        <tr><td><code>"r"</code></td><td>ler (padrão); erro se não existir</td></tr>
        <tr><td><code>"a"</code></td><td>acrescentar no fim; cria se não existir</td></tr>
        <tr><td><code>"w"</code></td><td>escrever do zero (apaga o conteúdo!); cria se não existir</td></tr>
        <tr><td><code>"x"</code></td><td>criar; erro se já existir</td></tr>
        <tr><td><code>"t"</code> / <code>"b"</code></td><td>texto (padrão) / binário (imagens)</td></tr>
      </tbody></table>
      <!--pratica-->
      <p>Use <code>with</code>: ele <b>fecha o arquivo sozinho</b>, mesmo se der erro:</p>
      <pre><code>with open("notas.txt", encoding="utf-8") as f:
    tudo = f.read()          # o arquivo inteiro como texto

with open("notas.txt", encoding="utf-8") as f:
    primeira = f.readline()  # uma linha
    for linha in f:          # o resto, linha a linha
        print(linha.strip())</code></pre>
      <p><code>f.read(5)</code> lê só 5 caracteres; <code>f.readlines()</code> devolve uma lista de linhas. Sem <code>with</code>, lembre de <code>f.close()</code>.</p>
      <p>ℹ️ No navegador, os arquivos ficam num disco virtual temporário (some ao recarregar).</p>`,
    exemplo: c`with open("compras.txt", "w", encoding="utf-8") as f:
    f.write("arroz\nfeijão\ncafé\n")

with open("compras.txt", encoding="utf-8") as f:
    for i, linha in enumerate(f, start=1):
        print(i, linha.strip())`,
    perguntas: [
      m("Qual a vantagem de abrir com `with open(...) as f:`?", ["O arquivo é fechado automaticamente", "O arquivo abre mais rápido", "Permite ler e escrever ao mesmo tempo", "Nenhuma"], 0, "O `with` garante o fechamento, mesmo com erro."),
      m("Qual modo **apaga** o conteúdo antes de escrever?", ["`\"w\"`", "`\"a\"`", "`\"r\"`", "`\"x\"`"], 0, "`\"a\"` acrescenta no fim sem apagar.")
    ],
    exercicios: [
      comp("Contando linhas", `O arquivo <code>clientes.txt</code> já foi criado com um nome por linha. Complete para abri-lo para <b>leitura</b> e contar as linhas.`, `Modo de leitura é <code>"r"</code>.`,
        c`with open("clientes.txt", "w", encoding="utf-8") as f:
    f.write("Ana\nBruno\nCarla\n")

with open("clientes.txt", ____, encoding="utf-8") as f:
    linhas = f.____()
print(len(linhas))`, c`with open("clientes.txt", "w", encoding="utf-8") as f:
    f.write("Ana\nBruno\nCarla\n")

with open("clientes.txt", "r", encoding="utf-8") as f:
    linhas = f.readlines()
print(len(linhas))`, c`
assert len(linhas) == 3 and linhas[0].strip() == "Ana", f"linhas deveria ter 3 itens, ficou {linhas}"`),
      criar("Somando o arquivo de vendas", `Crie <code>total_vendas(caminho)</code> que lê um arquivo com um valor por linha (ex.: <code>10.5</code>) e devolve a soma. Ignore linhas vazias.`, `Percorra com <code>for linha in f</code>, use <code>strip()</code> e <code>float()</code>.`,
        c`with open("vendas.txt", "w", encoding="utf-8") as f:
    f.write("10.5\n20\n\n4.5\n")

def total_vendas(caminho):
    pass
`, c`with open("vendas.txt", "w", encoding="utf-8") as f:
    f.write("10.5\n20\n\n4.5\n")

def total_vendas(caminho):
    total = 0
    with open(caminho, encoding="utf-8") as f:
        for linha in f:
            linha = linha.strip()
            if linha:
                total += float(linha)
    return total`, c`
assert total_vendas("vendas.txt") == 35.0, f"total_vendas deveria ser 35.0, deu {total_vendas('vendas.txt')}"
with open("v2.txt", "w") as f:
    f.write("1\n2\n")
assert total_vendas("v2.txt") == 3, "Teste com outro arquivo falhou"`)
    ]
  },
  {
    id: "arquivos-escrever", secao: S7, titulo: "Escrever, criar e apagar arquivos",
    teoria: `
      <pre><code>with open("log.txt", "a", encoding="utf-8") as f:   # acrescenta
    f.write("Login às 10:00\\n")

with open("relatorio.txt", "w", encoding="utf-8") as f:  # sobrescreve
    f.write("Relatório do dia\\n")
    f.writelines(["linha 1\\n", "linha 2\\n"])

open("novo.txt", "x").close()   # cria vazio (erro se já existir)</code></pre>
      <p>⚠️ <code>write()</code> não pula linha sozinho: coloque <code>\\n</code>.</p>
      <!--pratica-->
      <h3>Apagar arquivos e pastas</h3>
      <pre><code>import os
if os.path.exists("relatorio.txt"):
    os.remove("relatorio.txt")
os.mkdir("backup")      # cria pasta
os.rmdir("backup")      # apaga pasta (precisa estar vazia)</code></pre>
      <h3>CSV</h3>
      <p>Para planilhas, o módulo <code>csv</code> cuida das vírgulas e aspas:</p>
      <pre><code>import csv
with open("produtos.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["nome", "preco"])
    w.writerow(["Café", 12.9])</code></pre>`,
    exemplo: c`import os
with open("diario.txt", "w", encoding="utf-8") as f:
    f.write("Dia 1: comecei Python\n")
with open("diario.txt", "a", encoding="utf-8") as f:
    f.write("Dia 2: aprendi arquivos\n")
print(open("diario.txt", encoding="utf-8").read())
os.remove("diario.txt")
print("Existe?", os.path.exists("diario.txt"))`,
    perguntas: [
      vf("`f.write(\"oi\")` já pula para a próxima linha no final.", false, "É preciso escrever `\\n` explicitamente."),
      l("Complete para apagar o arquivo:", c`import os
os.____("antigo.txt")`, ["remove"], "`os.remove()` apaga um arquivo.")
    ],
    exercicios: [
      comp("Registro de acessos", `Complete para <b>acrescentar</b> (sem apagar o que já existe) a linha <code>"bia entrou"</code> no arquivo.`, `O modo que acrescenta no fim é <code>"a"</code>.`,
        c`with open("acessos.txt", "w", encoding="utf-8") as f:
    f.write("ana entrou\n")

with open("acessos.txt", ____, encoding="utf-8") as f:
    f.write("bia entrou\n")

print(open("acessos.txt", encoding="utf-8").read())`, c`with open("acessos.txt", "w", encoding="utf-8") as f:
    f.write("ana entrou\n")

with open("acessos.txt", "a", encoding="utf-8") as f:
    f.write("bia entrou\n")

print(open("acessos.txt", encoding="utf-8").read())`, c`
assert open("acessos.txt", encoding="utf-8").read() == "ana entrou\nbia entrou\n", "O arquivo deveria ter as duas linhas"`),
      criar("Salvando a lista de tarefas", `Crie <code>salvar(tarefas, caminho)</code> que grava cada tarefa da lista numa linha do arquivo (sobrescrevendo) e <code>carregar(caminho)</code> que devolve a lista de volta (sem os <code>\\n</code>). Se o arquivo não existir, <code>carregar</code> devolve <code>[]</code>.`, `Para checar se existe: <code>os.path.exists(caminho)</code>.`,
        c`import os

def salvar(tarefas, caminho):
    pass

def carregar(caminho):
    pass
`, c`import os

def salvar(tarefas, caminho):
    with open(caminho, "w", encoding="utf-8") as f:
        for t in tarefas:
            f.write(t + "\n")

def carregar(caminho):
    if not os.path.exists(caminho):
        return []
    with open(caminho, encoding="utf-8") as f:
        return [linha.rstrip("\n") for linha in f]`, c`
salvar(["comprar pão", "pagar luz"], "tarefas.txt")
assert carregar("tarefas.txt") == ["comprar pão", "pagar luz"], f"carregar deu {carregar('tarefas.txt')}"
salvar(["só uma"], "tarefas.txt")
assert carregar("tarefas.txt") == ["só uma"], "salvar deve sobrescrever o arquivo"
assert carregar("nao_existe.txt") == [], "Arquivo inexistente: []"`)
    ]
  }
];
