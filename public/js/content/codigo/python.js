// Exercícios de código da trilha python (completar e criar do zero), por tópico.
const c = String.raw;

// Simulador mínimo do FastAPI (o FastAPI de verdade não roda no Pyodide).
const SIM = c`# ---- Simulador do FastAPI (não mexa): permite testar as rotas no navegador ----
class HTTPException(Exception):
    def __init__(self, status_code, detail=None):
        super().__init__(detail)
        self.status_code = status_code
        self.detail = detail

class FastAPI:
    def __init__(self):
        self.rotas = {}

    def _rota(self, metodo, caminho, status_code=200):
        def registrar(funcao):
            self.rotas[(metodo, caminho)] = {"funcao": funcao, "status_code": status_code}
            return funcao
        return registrar

    def get(self, caminho, status_code=200):
        return self._rota("GET", caminho, status_code)

    def post(self, caminho, status_code=200):
        return self._rota("POST", caminho, status_code)

    def put(self, caminho, status_code=200):
        return self._rota("PUT", caminho, status_code)

    def delete(self, caminho, status_code=200):
        return self._rota("DELETE", caminho, status_code)
# ---- No projeto real: from fastapi import FastAPI, HTTPException ----
`;

export default {
  b1: [
    {
      tipo: "completar",
      titulo: "Ficha do cliente",
      enunciado: `Complete o código para guardar os dados de um cliente em variáveis e mostrar a ficha.
        <ul>
          <li><code>nome</code> deve ser o texto <code>"Ana Souza"</code>;</li>
          <li><code>idade</code> deve ser o número inteiro <code>32</code>;</li>
          <li><code>saldo</code> deve ser o número decimal <code>150.75</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo valor certo.`,
      dica: `Texto vai entre aspas; números não. Número decimal usa ponto: <code>150.75</code>.`,
      lang: "python",
      inicial: c`nome = ____
idade = ____
saldo = ____

print("Cliente:", nome)
print("Idade:", idade)
print("Saldo: R$", saldo)
`,
      solucao: c`nome = "Ana Souza"
idade = 32
saldo = 150.75

print("Cliente:", nome)
print("Idade:", idade)
print("Saldo: R$", saldo)`,
      teste: c`
assert nome == "Ana Souza", f'nome deveria ser "Ana Souza", mas é {nome!r}'
assert idade == 32 and isinstance(idade, int), f"idade deveria ser o inteiro 32, mas é {idade!r}"
assert isinstance(saldo, float) and abs(saldo - 150.75) < 1e-9, f"saldo deveria ser o decimal 150.75, mas é {saldo!r}"
assert "Cliente: Ana Souza" in __saida__, "Mantenha os print para mostrar a ficha."`
    },
    {
      tipo: "completar",
      titulo: "Convertendo o que o usuário digitou",
      enunciado: `Tudo o que vem de um formulário chega como <b>texto</b>. Complete o código para converter
        <code>quantidade_txt</code> em número inteiro e <code>preco_txt</code> em número decimal, e calcular o <code>total</code>.`,
      dica: `Use <code>int(...)</code> para inteiros e <code>float(...)</code> para decimais.`,
      lang: "python",
      inicial: c`quantidade_txt = "3"
preco_txt = "19.90"

quantidade = ____(quantidade_txt)
preco = ____(preco_txt)
total = quantidade * preco

print(f"Total: R$ {total:.2f}")
`,
      solucao: c`quantidade_txt = "3"
preco_txt = "19.90"

quantidade = int(quantidade_txt)
preco = float(preco_txt)
total = quantidade * preco

print(f"Total: R$ {total:.2f}")`,
      teste: c`
assert isinstance(quantidade, int), "quantidade precisa ser um número inteiro (int)."
assert isinstance(preco, float), "preco precisa ser um número decimal (float)."
assert abs(total - 59.7) < 0.001, f"total deveria ser 59.70, mas é {total}"
assert "Total: R$ 59.70" in __saida__, 'A saída deveria mostrar "Total: R$ 59.70".'`
    },
    {
      tipo: "completar",
      titulo: "Mensagem de boas-vindas com f-string",
      enunciado: `Complete a f-string para imprimir exatamente:<br><code>Olá, Bruno! Você tem 5 mensagens novas.</code>`,
      dica: `Dentro de uma f-string, coloque a variável entre chaves: <code>f"Olá, {nome}!"</code>.`,
      lang: "python",
      inicial: c`nome = "Bruno"
mensagens = 5

print(f"Olá, ____! Você tem ____ mensagens novas.")
`,
      solucao: c`nome = "Bruno"
mensagens = 5

print(f"Olá, {nome}! Você tem {mensagens} mensagens novas.")`,
      teste: c`
assert "Olá, Bruno! Você tem 5 mensagens novas." in __saida__, 'A saída deveria ser exatamente: Olá, Bruno! Você tem 5 mensagens novas.'`
    },
    {
      tipo: "criar",
      titulo: "Calculadora de desconto",
      enunciado: `Uma loja dá <b>15% de desconto</b>. Crie do zero:
        <ul>
          <li><code>preco</code> com o valor <code>200.0</code>;</li>
          <li><code>desconto</code> com o valor do desconto (15% do preço);</li>
          <li><code>preco_final</code> com o preço já com desconto;</li>
          <li>imprima <code>Preço final: R$ 170.00</code> (com duas casas decimais).</li>
        </ul>`,
      dica: `15% é <code>0.15</code>. Para duas casas: <code>f"{valor:.2f}"</code>.`,
      lang: "python",
      inicial: c`# Crie as variáveis preco, desconto e preco_final
# e imprima o preço final com duas casas decimais
`,
      solucao: c`preco = 200.0
desconto = preco * 0.15
preco_final = preco - desconto

print(f"Preço final: R$ {preco_final:.2f}")`,
      teste: c`
_g = globals()
for _n in ("preco", "desconto", "preco_final"):
    assert _n in _g, f"Crie a variável {_n}."
assert abs(preco - 200) < 1e-9, f"preco deveria ser 200.0, mas é {preco}"
assert abs(desconto - 30) < 1e-9, f"desconto deveria ser 30.0 (15% de 200), mas é {desconto}"
assert abs(preco_final - 170) < 1e-9, f"preco_final deveria ser 170.0, mas é {preco_final}"
assert "Preço final: R$ 170.00" in __saida__, 'Imprima exatamente: Preço final: R$ 170.00'`
    },
    {
      tipo: "criar",
      titulo: "Descobrindo o tipo dos dados",
      enunciado: `Crie do zero quatro variáveis: <code>produto</code> (texto <code>"Teclado"</code>), <code>estoque</code> (inteiro <code>12</code>),
        <code>preco</code> (decimal <code>89.9</code>) e <code>ativo</code> (booleano <code>True</code>).
        Depois, imprima o <b>tipo</b> de cada uma usando <code>type()</code>, uma por linha.`,
      dica: `<code>print(type(produto))</code> mostra <code>&lt;class 'str'&gt;</code>.`,
      lang: "python",
      inicial: c`# Crie produto, estoque, preco e ativo
# e imprima o tipo de cada um com type()
`,
      solucao: c`produto = "Teclado"
estoque = 12
preco = 89.9
ativo = True

print(type(produto))
print(type(estoque))
print(type(preco))
print(type(ativo))`,
      teste: c`
assert produto == "Teclado", 'produto deveria ser "Teclado".'
assert estoque == 12 and type(estoque) is int, "estoque deveria ser o inteiro 12."
assert type(preco) is float and abs(preco - 89.9) < 1e-9, "preco deveria ser o decimal 89.9."
assert ativo is True, "ativo deveria ser True."
for _t in ("<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'bool'>"):
    assert _t in __saida__, f"Imprima o tipo de cada variável com type(). Faltou: {_t}"`
    }
  ],
  b2: [
    {
      tipo: "completar",
      titulo: "Frete grátis acima de R$ 200",
      enunciado: `Uma loja virtual dá <b>frete grátis</b> para compras acima de R$ 200; nas demais, o frete custa R$ 15.
        Complete o código para que <code>frete</code> seja <code>0.0</code> quando <code>total</code> passar de 200 e <code>15.0</code> caso contrário.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Use um operador de comparação (<code>&gt;</code>) no <code>if</code> e a palavra que significa “senão”, seguida de dois-pontos.`,
      lang: "python",
      inicial: c`total = 250.0

if total ____ 200:
    frete = 0.0
____:
    frete = 15.0

print(f"Frete: R$ {frete:.2f}")
`,
      solucao: c`total = 250.0

if total > 200:
    frete = 0.0
else:
    frete = 15.0

print(f"Frete: R$ {frete:.2f}")`,
      padroes: [
        [/if\s+total\s*>=?\s*200\s*:/, "No if, compare total com 200 usando > (maior que)."],
        [/^else\s*:/m, "Use else: para o caso em que a compra não passa de R$ 200."]
      ],
      teste: c`
assert frete == 0, f"Com total 250.0 o frete deveria ser 0.0, mas é {frete}"
assert "Frete: R$ 0.00" in __saida__, 'A saída deveria mostrar "Frete: R$ 0.00".'`
    },
    {
      tipo: "completar",
      titulo: "Conceito do boletim",
      enunciado: `A escola converte a nota em conceito: <b>A</b> (9 ou mais), <b>B</b> (7 ou mais), <b>C</b> (5 ou mais) e <b>Reprovado</b> abaixo de 5.
        Complete a cadeia de condições. Com a nota <code>6.5</code>, <code>conceito</code> deve ser <code>"C"</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `“Senão, se” em Python é <code>elif</code>; “senão” é <code>else</code>. Para “5 ou mais” use <code>&gt;=</code>.`,
      lang: "python",
      inicial: c`nota = 6.5

if nota >= 9:
    conceito = "A"
____ nota >= 7:
    conceito = "B"
elif nota ____ 5:
    conceito = "C"
____:
    conceito = "Reprovado"

print(f"Nota {nota}: conceito {conceito}")
`,
      solucao: c`nota = 6.5

if nota >= 9:
    conceito = "A"
elif nota >= 7:
    conceito = "B"
elif nota >= 5:
    conceito = "C"
else:
    conceito = "Reprovado"

print(f"Nota {nota}: conceito {conceito}")`,
      padroes: [
        [/elif\s+nota\s*>=\s*7\s*:/, "A segunda condição deve ser elif nota >= 7:"],
        [/elif\s+nota\s*>=\s*5\s*:/, "A terceira condição deve ser elif nota >= 5: (5 ou mais)."],
        [/^else\s*:/m, "Use else: para as notas abaixo de 5."]
      ],
      teste: c`
assert conceito == "C", f'Com nota 6.5 o conceito deveria ser "C", mas é {conceito!r}'
assert "Nota 6.5: conceito C" in __saida__, "Mantenha o print do final."`
    },
    {
      tipo: "completar",
      titulo: "Liberar matrícula do curso",
      enunciado: `Um curso de natação libera a matrícula quando o aluno <b>não</b> está inadimplente <b>e</b> tem 18 anos <b>ou</b> autorização dos pais.
        Complete a condição com os operadores lógicos certos. Com os dados do código, <code>situacao</code> deve ser <code>"liberada"</code>.
        Substitua cada <code>____</code> pelo operador que falta.`,
      dica: `Os operadores lógicos do Python são palavras: <code>and</code>, <code>or</code> e <code>not</code>.`,
      lang: "python",
      inicial: c`idade = 16
autorizacao_pais = True
inadimplente = False

if ____ inadimplente and (idade >= 18 ____ autorizacao_pais):
    situacao = "liberada"
else:
    situacao = "pendente"

print("Matrícula", situacao)
`,
      solucao: c`idade = 16
autorizacao_pais = True
inadimplente = False

if not inadimplente and (idade >= 18 or autorizacao_pais):
    situacao = "liberada"
else:
    situacao = "pendente"

print("Matrícula", situacao)`,
      padroes: [
        [/if\s+not\s+inadimplente/, "Comece a condição com not inadimplente (não estar inadimplente)."],
        [/idade\s*>=\s*18\s+or\s+autorizacao_pais/, "Dentro dos parênteses, basta UMA das duas: use or."]
      ],
      teste: c`
assert situacao == "liberada", f'situacao deveria ser "liberada", mas é {situacao!r}'
assert "Matrícula liberada" in __saida__, 'A saída deveria mostrar "Matrícula liberada".'`
    },
    {
      tipo: "criar",
      titulo: "Classificação do IMC na clínica",
      enunciado: `Na triagem da clínica, crie do zero:
        <ul>
          <li><code>peso</code> = <code>82.0</code> e <code>altura</code> = <code>1.75</code>;</li>
          <li><code>imc</code> = peso dividido pela altura ao quadrado;</li>
          <li><code>categoria</code> com <code>if/elif/else</code>: menor que 18.5 → <code>"Abaixo do peso"</code>; menor que 25 → <code>"Normal"</code>;
            menor que 30 → <code>"Sobrepeso"</code>; senão → <code>"Obesidade"</code>;</li>
          <li>imprima <code>IMC: 26.78 - Sobrepeso</code> (IMC com duas casas).</li>
        </ul>`,
      dica: `Altura ao quadrado: <code>altura ** 2</code>. Teste as faixas da menor para a maior com <code>elif</code>.`,
      lang: "python",
      inicial: c`# Crie peso, altura, imc e categoria
# Use if / elif / else para escolher a categoria
# Imprima: IMC: 26.78 - Sobrepeso
`,
      solucao: c`peso = 82.0
altura = 1.75
imc = peso / altura ** 2

if imc < 18.5:
    categoria = "Abaixo do peso"
elif imc < 25:
    categoria = "Normal"
elif imc < 30:
    categoria = "Sobrepeso"
else:
    categoria = "Obesidade"

print(f"IMC: {imc:.2f} - {categoria}")`,
      padroes: [
        [/\belif\b/, "Use elif para testar as faixas intermediárias."],
        [/\belse\s*:/, "Use else: para a última faixa (Obesidade)."]
      ],
      teste: c`
_g = globals()
for _n in ("peso", "altura", "imc", "categoria"):
    assert _n in _g, f"Crie a variável {_n}."
assert abs(imc - 82 / 1.75 ** 2) < 0.01, f"imc deveria ser cerca de 26.78, mas é {imc}"
assert categoria == "Sobrepeso", f'categoria deveria ser "Sobrepeso", mas é {categoria!r}'
assert "IMC: 26.78 - Sobrepeso" in __saida__, "Imprima exatamente: IMC: 26.78 - Sobrepeso"`
    },
    {
      tipo: "criar",
      titulo: "FizzBuzz de um número",
      enunciado: `Pergunta clássica de entrevista. Crie <code>numero = 45</code> e a variável <code>resultado</code>:
        <ul>
          <li><code>"FizzBuzz"</code> se o número for divisível por 3 <b>e</b> por 5;</li>
          <li><code>"Fizz"</code> se for divisível só por 3;</li>
          <li><code>"Buzz"</code> se for divisível só por 5;</li>
          <li>senão, o próprio número como texto (<code>str(numero)</code>).</li>
        </ul>
        Depois imprima <code>resultado</code>.`,
      dica: `“Divisível por 3” é <code>numero % 3 == 0</code>. Atenção à <b>ordem</b>: teste o caso dos dois primeiro.`,
      lang: "python",
      inicial: c`# Crie numero = 45
# Monte resultado com if / elif / else e imprima
`,
      solucao: c`numero = 45

if numero % 3 == 0 and numero % 5 == 0:
    resultado = "FizzBuzz"
elif numero % 3 == 0:
    resultado = "Fizz"
elif numero % 5 == 0:
    resultado = "Buzz"
else:
    resultado = str(numero)

print(resultado)`,
      padroes: [
        [/%/, "Use o operador % (resto da divisão) para testar se é divisível."],
        [/\belif\b/, "Use elif para os outros casos."]
      ],
      teste: c`
assert "numero" in globals() and numero == 45, "Crie numero = 45."
assert "resultado" in globals(), "Crie a variável resultado."
assert resultado == "FizzBuzz", f'45 é divisível por 3 e por 5, então resultado deveria ser "FizzBuzz", mas é {resultado!r}. Teste o caso dos dois primeiro.'
assert "FizzBuzz" in __saida__, "Imprima o resultado."`
    }
  ],
  b3: [
    {
      tipo: "completar",
      titulo: "Somando as vendas do dia",
      enunciado: `A padaria anotou as vendas do dia em uma lista. Complete o laço <code>for</code> para acumular tudo em <code>total</code>.
        Substitua cada <code>____</code> pelo que falta (não use <code>sum()</code> aqui: o objetivo é treinar o laço).`,
      dica: `O <code>for</code> usa a palavra <code>in</code>. Para somar ao acumulador, use <code>+=</code>.`,
      lang: "python",
      inicial: c`vendas = [150.0, 320.5, 89.9, 1200.0]

total = 0
for valor ____ vendas:
    total ____ valor

print("Total do dia:", total)
`,
      solucao: c`vendas = [150.0, 320.5, 89.9, 1200.0]

total = 0
for valor in vendas:
    total += valor

print("Total do dia:", total)`,
      padroes: [
        [/for\s+valor\s+in\s+vendas\s*:/, "O laço deve ser: for valor in vendas:"],
        [/total\s*\+=\s*valor|total\s*=\s*total\s*\+\s*valor/, "Dentro do laço, some valor ao total (total += valor)."]
      ],
      teste: c`
assert abs(total - 1760.4) < 1e-6, f"total deveria ser 1760.4, mas é {total}"
assert "Total do dia:" in __saida__, "Mantenha o print do total."`
    },
    {
      tipo: "completar",
      titulo: "Fila de atendimento da clínica",
      enunciado: `Complete o código da fila da recepção:
        <ul>
          <li>adicione <code>"Diego"</code> no <b>final</b> da fila;</li>
          <li><code>primeiro</code> recebe quem está na primeira posição;</li>
          <li><code>ultimo</code> recebe o último da fila usando <b>índice negativo</b>;</li>
          <li><code>quantidade</code> recebe o tamanho da fila.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Adicionar no fim: <code>.append()</code>. Índices começam em 0, e <code>-1</code> é o último. Tamanho: <code>len()</code>.`,
      lang: "python",
      inicial: c`fila = ["Ana", "Bruno", "Carla"]

fila.____("Diego")
primeiro = fila[____]
ultimo = fila[____]
quantidade = ____(fila)

print("Próximo:", primeiro, "| Último:", ultimo, "| Na fila:", quantidade)
`,
      solucao: c`fila = ["Ana", "Bruno", "Carla"]

fila.append("Diego")
primeiro = fila[0]
ultimo = fila[-1]
quantidade = len(fila)

print("Próximo:", primeiro, "| Último:", ultimo, "| Na fila:", quantidade)`,
      padroes: [
        [/ultimo\s*=\s*fila\[\s*-1\s*\]/, "Pegue o último com índice negativo: fila[-1]."]
      ],
      teste: c`
assert fila == ["Ana", "Bruno", "Carla", "Diego"], f"A fila deveria terminar com Diego, mas é {fila}"
assert primeiro == "Ana", f'primeiro deveria ser "Ana", mas é {primeiro!r}'
assert ultimo == "Diego", f'ultimo deveria ser "Diego", mas é {ultimo!r}'
assert quantidade == 4, f"quantidade deveria ser 4, mas é {quantidade}"`
    },
    {
      tipo: "completar",
      titulo: "Filtrando pedidos grandes",
      enunciado: `O gerente quer só os pedidos <b>acima de R$ 300</b>. Complete a <i>list comprehension</i> para criar a lista <code>grandes</code>.
        Substitua cada <code>____</code> pela palavra que falta.`,
      dica: `O formato é <code>[item for item in lista if condição]</code>.`,
      lang: "python",
      inicial: c`pedidos = [89.9, 450.0, 120.0, 1200.0, 310.5, 75.0]

grandes = [p ____ p ____ pedidos ____ p > 300]

print("Pedidos grandes:", grandes)
print("Quantidade:", len(grandes))
`,
      solucao: c`pedidos = [89.9, 450.0, 120.0, 1200.0, 310.5, 75.0]

grandes = [p for p in pedidos if p > 300]

print("Pedidos grandes:", grandes)
print("Quantidade:", len(grandes))`,
      teste: c`
assert grandes == [450.0, 1200.0, 310.5], f"grandes deveria ser [450.0, 1200.0, 310.5], mas é {grandes}"
assert pedidos == [89.9, 450.0, 120.0, 1200.0, 310.5, 75.0], "Não altere a lista pedidos."
assert "Quantidade: 3" in __saida__, "Mantenha os print do final."`
    },
    {
      tipo: "criar",
      titulo: "Tentativas de senha com while",
      enunciado: `No caixa eletrônico, o cliente digita a senha até acertar. Crie do zero:
        <ul>
          <li><code>senha_correta = "4321"</code> e <code>tentativas = 0</code>;</li>
          <li>um laço <code>while</code> que lê a senha com <code>input("Senha: ")</code>, soma 1 em <code>tentativas</code> a cada leitura e para quando a senha estiver certa;</li>
          <li>no fim, imprima <code>Acesso liberado após 3 tentativas</code> (o número vem da variável).</li>
        </ul>
        As senhas digitadas já estão na caixa <b>Entrada</b>: <code>1234</code>, <code>0000</code> e <code>4321</code>.`,
      dica: `Uma forma: comece com <code>digitada = ""</code> e use <code>while digitada != senha_correta:</code>.`,
      lang: "python",
      entrada: "1234\n0000\n4321",
      inicial: c`# Crie senha_correta e tentativas
# Use while para ler a senha com input("Senha: ") até acertar
# Imprima: Acesso liberado após X tentativas
`,
      solucao: c`senha_correta = "4321"
tentativas = 0
digitada = ""

while digitada != senha_correta:
    digitada = input("Senha: ")
    tentativas += 1

print(f"Acesso liberado após {tentativas} tentativas")`,
      padroes: [
        [/\bwhile\b/, "Use um laço while."],
        [/input\(/, "Leia a senha com input()."]
      ],
      teste: c`
assert "tentativas" in globals(), "Crie a variável tentativas."
assert tentativas == 3, f"tentativas deveria ser 3 (a senha certa foi a terceira), mas é {tentativas}"
assert "Acesso liberado após 3 tentativas" in __saida__, "Imprima exatamente: Acesso liberado após 3 tentativas"`
    },
    {
      tipo: "criar",
      titulo: "Relatório de vendas numerado",
      enunciado: `Com a lista <code>vendas</code> já pronta, crie:
        <ul>
          <li><code>quantidade</code> (número de vendas), <code>maior</code> (maior venda) e <code>media</code> (soma ÷ quantidade);</li>
          <li><code>acima_da_media</code>: lista só com as vendas maiores que a média;</li>
          <li>um <code>for</code> com <code>enumerate</code> que imprime cada venda assim: <code>Venda 1: R$ 150.00</code>, <code>Venda 2: R$ 320.50</code>…</li>
        </ul>`,
      dica: `Use <code>len()</code>, <code>max()</code> e <code>sum()</code>. Para numerar a partir de 1: <code>enumerate(vendas, start=1)</code>.`,
      lang: "python",
      inicial: c`vendas = [150.0, 320.5, 89.9, 1200.0, 450.0]

# Crie quantidade, maior, media e acima_da_media
# Imprima cada venda numerada com enumerate: Venda 1: R$ 150.00
`,
      solucao: c`vendas = [150.0, 320.5, 89.9, 1200.0, 450.0]

quantidade = len(vendas)
maior = max(vendas)
media = sum(vendas) / quantidade
acima_da_media = [v for v in vendas if v > media]

for i, v in enumerate(vendas, start=1):
    print(f"Venda {i}: R$ {v:.2f}")`,
      padroes: [
        [/enumerate\(/, "Use enumerate() para numerar as vendas."]
      ],
      teste: c`
_g = globals()
for _n in ("quantidade", "maior", "media", "acima_da_media"):
    assert _n in _g, f"Crie a variável {_n}."
assert quantidade == 5, f"quantidade deveria ser 5, mas é {quantidade}"
assert maior == 1200.0, f"maior deveria ser 1200.0, mas é {maior}"
assert abs(media - 442.08) < 1e-6, f"media deveria ser 442.08, mas é {media}"
assert acima_da_media == [1200.0, 450.0], f"acima_da_media deveria ser [1200.0, 450.0], mas é {acima_da_media}"
for _l in ("Venda 1: R$ 150.00", "Venda 2: R$ 320.50", "Venda 5: R$ 450.00"):
    assert _l in __saida__, f"Faltou a linha: {_l}"
assert "Venda 0:" not in __saida__, "A numeração deve começar em 1 (start=1)."`
    }
  ],
  i1: [
    {
      tipo: "completar",
      titulo: "Desconto com percentual padrão",
      enunciado: `Complete a função <code>calcular_desconto(valor, percentual)</code> para que o <code>percentual</code> valha <b>10</b> quando não for informado
        e a função <b>devolva</b> o valor com desconto. Ex.: <code>calcular_desconto(200)</code> → <code>180.0</code>; <code>calcular_desconto(200, 25)</code> → <code>150.0</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Valor padrão de parâmetro se escreve <code>nome=valor</code>. Para devolver o resultado, use <code>return</code>.`,
      lang: "python",
      inicial: c`def calcular_desconto(valor, percentual____10):
    """Retorna o valor com desconto aplicado."""
    ____ valor - valor * percentual / 100

print(calcular_desconto(200))
print(calcular_desconto(200, 25))
`,
      solucao: c`def calcular_desconto(valor, percentual=10):
    """Retorna o valor com desconto aplicado."""
    return valor - valor * percentual / 100

print(calcular_desconto(200))
print(calcular_desconto(200, 25))`,
      teste: c`
assert calcular_desconto(200) == 180, f"calcular_desconto(200) deveria ser 180.0, mas é {calcular_desconto(200)}"
assert calcular_desconto(200, 25) == 150, f"calcular_desconto(200, 25) deveria ser 150.0, mas é {calcular_desconto(200, 25)}"
assert calcular_desconto(80, percentual=50) == 40, "calcular_desconto(80, percentual=50) deveria ser 40.0"`
    },
    {
      tipo: "completar",
      titulo: "Validando o formato do CPF",
      enunciado: `O cadastro precisa conferir se o CPF tem o formato certo: depois de tirar pontos e traço, devem sobrar <b>11 caracteres</b>, todos dígitos.
        Complete a função <code>validar_cpf_formato</code>. Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>texto.replace("-", "")</code> remove o traço. O método que diz se um texto só tem dígitos é <code>.isdigit()</code>.`,
      lang: "python",
      inicial: c`def validar_cpf_formato(cpf: str) -> bool:
    numeros = cpf.replace(".", "").____("-", "")
    return len(numeros) == ____ and numeros.____()

print(validar_cpf_formato("123.456.789-00"))
print(validar_cpf_formato("123.456.78a-00"))
`,
      solucao: c`def validar_cpf_formato(cpf: str) -> bool:
    numeros = cpf.replace(".", "").replace("-", "")
    return len(numeros) == 11 and numeros.isdigit()

print(validar_cpf_formato("123.456.789-00"))
print(validar_cpf_formato("123.456.78a-00"))`,
      teste: c`
_casos = {"123.456.789-00": True, "12345678900": True, "123.456.789-0": False, "123.456.78a-00": False, "123.456.789-001": False}
for _cpf, _esperado in _casos.items():
    _r = validar_cpf_formato(_cpf)
    assert _r is _esperado, f"validar_cpf_formato({_cpf!r}) deveria ser {_esperado}, mas foi {_r}"`
    },
    {
      tipo: "completar",
      titulo: "Imposto calculado em um só lugar",
      enunciado: `A função <code>preco_com_imposto</code> já existe. Complete <code>total_pedido(itens, aliquota)</code> para <b>reaproveitá-la</b> em cada item e devolver a soma.
        Na última linha, chame <code>total_pedido</code> com o argumento nomeado <code>aliquota</code> valendo <code>0.12</code> (deve imprimir <code>168.0</code>).
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Dentro do laço, chame a outra função pelo nome. Para devolver o resultado, <code>return</code>. Argumento nomeado: <code>f(x, aliquota=0.12)</code>.`,
      lang: "python",
      inicial: c`def preco_com_imposto(valor, aliquota=0.06):
    return round(valor * (1 + aliquota), 2)

def total_pedido(itens, aliquota=0.06):
    soma = 0
    for preco in itens:
        soma += ____(preco, aliquota)
    ____ round(soma, 2)

carrinho = [100.0, 50.0]
print(total_pedido(carrinho))
print(total_pedido(carrinho, aliquota=____))
`,
      solucao: c`def preco_com_imposto(valor, aliquota=0.06):
    return round(valor * (1 + aliquota), 2)

def total_pedido(itens, aliquota=0.06):
    soma = 0
    for preco in itens:
        soma += preco_com_imposto(preco, aliquota)
    return round(soma, 2)

carrinho = [100.0, 50.0]
print(total_pedido(carrinho))
print(total_pedido(carrinho, aliquota=0.12))`,
      teste: c`
assert total_pedido([100.0, 50.0]) == 159.0, f"total_pedido([100.0, 50.0]) deveria ser 159.0, mas é {total_pedido([100.0, 50.0])}"
assert total_pedido([10.0, 20.0], 0.1) == 33.0, "total_pedido([10.0, 20.0], 0.1) deveria ser 33.0"
assert total_pedido([]) == 0, "Um pedido sem itens deveria ter total 0."
assert "168.0" in __saida__, "A última linha deveria imprimir 168.0 (aliquota=0.12)."`
    },
    {
      tipo: "criar",
      titulo: "Calculando a parcela",
      enunciado: `Crie a função <code>calcular_parcela(total, parcelas=1)</code> para a loja de móveis:
        <ul>
          <li>até <b>3 parcelas</b>: sem juros;</li>
          <li>mais de 3 parcelas: o total recebe acréscimo de <b>5%</b>;</li>
          <li>devolva (<code>return</code>) o valor de cada parcela arredondado com <code>round(..., 2)</code>.</li>
        </ul>
        Exemplos: <code>calcular_parcela(300)</code> → <code>300.0</code>; <code>calcular_parcela(300, 3)</code> → <code>100.0</code>; <code>calcular_parcela(300, 4)</code> → <code>78.75</code>.`,
      dica: `Calcule primeiro o <code>total_final</code> com um <code>if</code> e depois divida por <code>parcelas</code>.`,
      lang: "python",
      inicial: c`# Crie a função calcular_parcela(total, parcelas=1)
# Até 3 parcelas: sem juros. Mais de 3: total + 5%.
# Devolva o valor de cada parcela com round(..., 2)
`,
      solucao: c`def calcular_parcela(total, parcelas=1):
    if parcelas > 3:
        total_final = total * 1.05
    else:
        total_final = total
    return round(total_final / parcelas, 2)

print(calcular_parcela(300, 4))`,
      teste: c`
assert "calcular_parcela" in globals(), "Crie a função calcular_parcela."
_casos = [((300,), 300.0), ((300, 3), 100.0), ((300, 4), 78.75), ((300, 6), 52.5), ((1000, 10), 105.0), ((99.9, 2), 49.95)]
for _args, _esperado in _casos:
    _r = calcular_parcela(*_args)
    assert _r is not None, "A função precisa usar return para devolver o valor."
    assert abs(_r - _esperado) < 1e-9, f"calcular_parcela{_args} deveria ser {_esperado}, mas foi {_r}"`
    },
    {
      tipo: "criar",
      titulo: "Média e situação do aluno",
      enunciado: `Crie duas funções para o sistema da escola:
        <ul>
          <li><code>media(notas)</code>: devolve a média da lista; se a lista estiver vazia, devolve <code>0</code>;</li>
          <li><code>situacao(notas)</code>: <b>usa a função <code>media</code></b> e devolve <code>"Aprovado"</code> (média 7 ou mais), <code>"Recuperação"</code> (5 ou mais) ou <code>"Reprovado"</code>.</li>
        </ul>
        Ex.: <code>situacao([8, 6, 7])</code> → <code>"Aprovado"</code>.`,
      dica: `Lista vazia: <code>if len(notas) == 0: return 0</code>. Em <code>situacao</code>, guarde <code>m = media(notas)</code> e use <code>if/elif/else</code>.`,
      lang: "python",
      inicial: c`# Crie a função media(notas)  -> 0 se a lista estiver vazia
# Crie a função situacao(notas) que usa media()
`,
      solucao: c`def media(notas):
    if len(notas) == 0:
        return 0
    return sum(notas) / len(notas)

def situacao(notas):
    m = media(notas)
    if m >= 7:
        return "Aprovado"
    elif m >= 5:
        return "Recuperação"
    else:
        return "Reprovado"

print(situacao([8, 6, 7]))`,
      padroes: [
        [/def\s+situacao[\s\S]*\bmedia\s*\(/, "A função situacao deve chamar a função media() em vez de repetir o cálculo."]
      ],
      teste: c`
for _f in ("media", "situacao"):
    assert _f in globals(), f"Crie a função {_f}."
assert abs(media([8, 6, 7]) - 7) < 1e-9, f"media([8, 6, 7]) deveria ser 7, mas é {media([8, 6, 7])}"
assert abs(media([10, 5]) - 7.5) < 1e-9, "media([10, 5]) deveria ser 7.5"
assert media([]) == 0, "media([]) deveria devolver 0 (lista vazia)."
_casos = [([8, 6, 7], "Aprovado"), ([5, 5.5], "Recuperação"), ([7, 6.9], "Recuperação"), ([2, 3], "Reprovado"), ([], "Reprovado")]
for _n, _esperado in _casos:
    assert situacao(_n) == _esperado, f"situacao({_n}) deveria ser {_esperado!r}, mas foi {situacao(_n)!r}"`
    }
  ],
  i2: [
    {
      tipo: "completar",
      titulo: "Ficha do cliente no CRM",
      enunciado: `Complete o código que lê e atualiza o cadastro do cliente:
        <ul>
          <li><code>nome</code> recebe o valor da chave <code>"nome"</code>;</li>
          <li><code>email</code> busca a chave <code>"email"</code> <b>sem quebrar</b> se ela não existir (padrão <code>"sem e-mail"</code>);</li>
          <li>o número de <code>"pedidos"</code> aumenta em 1.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Acesso por chave: <code>cliente["chave"]</code>. Sem erro se faltar: <code>.get(chave, padrão)</code>. Somar 1: <code>+=</code>.`,
      lang: "python",
      inicial: c`cliente = {"nome": "Carlos", "cidade": "Recife", "pedidos": 3}

nome = cliente[____]
email = cliente.____("email", "sem e-mail")
cliente["pedidos"] ____ 1
cliente["vip"] = True

print(nome, "-", email, "-", cliente["pedidos"], "pedidos")
`,
      solucao: c`cliente = {"nome": "Carlos", "cidade": "Recife", "pedidos": 3}

nome = cliente["nome"]
email = cliente.get("email", "sem e-mail")
cliente["pedidos"] += 1
cliente["vip"] = True

print(nome, "-", email, "-", cliente["pedidos"], "pedidos")`,
      teste: c`
assert nome == "Carlos", f'nome deveria ser "Carlos", mas é {nome!r}'
assert email == "sem e-mail", f'email deveria ser "sem e-mail", mas é {email!r}'
assert cliente["pedidos"] == 4, f"pedidos deveria ser 4, mas é {cliente['pedidos']}"
assert cliente.get("vip") is True and cliente["cidade"] == "Recife", "Mantenha as demais chaves do cliente."`
    },
    {
      tipo: "completar",
      titulo: "Contando pedidos por estado",
      enunciado: `O time de logística quer saber quantos pedidos foram para cada estado. Complete o padrão de contagem com dicionário e o laço que mostra o resultado.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>contagem.get(uf, 0)</code> devolve 0 quando o estado ainda não apareceu. Para percorrer pares chave/valor, use <code>.items()</code>.`,
      lang: "python",
      inicial: c`ufs = ["SP", "RJ", "SP", "MG", "SP", "PE", "RJ"]

contagem = {}
for uf in ufs:
    contagem[uf] = contagem.____(uf, ____) + 1

for uf, qtd in contagem.____():
    print(uf, qtd)
`,
      solucao: c`ufs = ["SP", "RJ", "SP", "MG", "SP", "PE", "RJ"]

contagem = {}
for uf in ufs:
    contagem[uf] = contagem.get(uf, 0) + 1

for uf, qtd in contagem.items():
    print(uf, qtd)`,
      teste: c`
assert contagem == {"SP": 3, "RJ": 2, "MG": 1, "PE": 1}, f"contagem deveria ser {{'SP': 3, 'RJ': 2, 'MG': 1, 'PE': 1}}, mas é {contagem}"
assert "SP 3" in __saida__ and "PE 1" in __saida__, "Imprima cada estado e sua quantidade (ex.: SP 3)."`
    },
    {
      tipo: "completar",
      titulo: "Payload da nota fiscal em JSON",
      enunciado: `Para emitir a nota fiscal, o sistema precisa enviar os dados como <b>texto JSON</b> e depois ler a resposta de volta como dicionário.
        Complete: <code>texto</code> deve ser o JSON do dicionário <code>nota</code> (mantendo os acentos) e <code>de_volta</code> o dicionário lido desse texto.
        Substitua cada <code>____</code> pela função certa do módulo <code>json</code>.`,
      dica: `Dicionário → texto: <code>json.dumps</code>. Texto → dicionário: <code>json.loads</code> (o “s” é de <i>string</i>).`,
      lang: "python",
      inicial: c`import json

nota = {
    "numero": 1520,
    "cliente": "Padaria Pão Quente",
    "cidade": "São Paulo",
    "itens": [{"produto": "Farinha", "valor": 89.9}]
}

texto = json.____(nota, ensure_ascii=False)
de_volta = json.____(texto)

print(texto)
print(de_volta["itens"][0]["produto"])
`,
      solucao: c`import json

nota = {
    "numero": 1520,
    "cliente": "Padaria Pão Quente",
    "cidade": "São Paulo",
    "itens": [{"produto": "Farinha", "valor": 89.9}]
}

texto = json.dumps(nota, ensure_ascii=False)
de_volta = json.loads(texto)

print(texto)
print(de_volta["itens"][0]["produto"])`,
      teste: c`
assert isinstance(texto, str), "texto deveria ser uma string JSON (use json.dumps)."
assert "São Paulo" in texto, "Mantenha ensure_ascii=False para os acentos aparecerem no JSON."
assert isinstance(de_volta, dict) and de_volta == nota, "de_volta deveria ser o dicionário lido do texto (use json.loads)."
assert "Farinha" in __saida__, "Mantenha os print do final."`
    },
    {
      tipo: "criar",
      titulo: "Total vendido por categoria",
      enunciado: `O mercado tem a lista <code>itens</code> (cada item é um dicionário). Crie do zero:
        <ul>
          <li>um dicionário <code>totais</code> com a soma de <code>valor</code> por <code>categoria</code> (ex.: <code>totais["bebidas"]</code> → <code>20.5</code>);</li>
          <li>um laço com <code>.items()</code> que imprime cada categoria assim: <code>bebidas: R$ 20.50</code>.</li>
        </ul>`,
      dica: `Mesmo padrão da contagem, mas somando o valor: <code>totais[cat] = totais.get(cat, 0) + item["valor"]</code>.`,
      lang: "python",
      inicial: c`itens = [
    {"produto": "Café", "categoria": "bebidas", "valor": 12.9},
    {"produto": "Pão", "categoria": "padaria", "valor": 8.5},
    {"produto": "Suco", "categoria": "bebidas", "valor": 7.6},
    {"produto": "Bolo", "categoria": "padaria", "valor": 25.0},
    {"produto": "Queijo", "categoria": "frios", "valor": 32.0}
]

# Crie o dicionário totais (soma por categoria)
# Imprima cada categoria: bebidas: R$ 20.50
`,
      solucao: c`itens = [
    {"produto": "Café", "categoria": "bebidas", "valor": 12.9},
    {"produto": "Pão", "categoria": "padaria", "valor": 8.5},
    {"produto": "Suco", "categoria": "bebidas", "valor": 7.6},
    {"produto": "Bolo", "categoria": "padaria", "valor": 25.0},
    {"produto": "Queijo", "categoria": "frios", "valor": 32.0}
]

totais = {}
for item in itens:
    categoria = item["categoria"]
    totais[categoria] = totais.get(categoria, 0) + item["valor"]

for categoria, total in totais.items():
    print(f"{categoria}: R$ {total:.2f}")`,
      teste: c`
assert "totais" in globals() and isinstance(totais, dict), "Crie o dicionário totais."
assert set(totais) == {"bebidas", "padaria", "frios"}, f"totais deveria ter as chaves bebidas, padaria e frios, mas tem {sorted(totais)}"
for _cat, _v in {"bebidas": 20.5, "padaria": 33.5, "frios": 32.0}.items():
    assert abs(totais[_cat] - _v) < 1e-6, f"totais[{_cat!r}] deveria ser {_v}, mas é {totais[_cat]}"
for _l in ("bebidas: R$ 20.50", "padaria: R$ 33.50", "frios: R$ 32.00"):
    assert _l in __saida__, f"Faltou imprimir: {_l}"`
    },
    {
      tipo: "criar",
      titulo: "Lendo a resposta da API do CRM",
      enunciado: `A API do CRM devolveu o texto JSON em <code>resposta_api</code>. Crie do zero:
        <ul>
          <li><code>dados</code>: o dicionário obtido do texto;</li>
          <li><code>nome_cliente</code>: o nome que está dentro de <code>"cliente"</code>;</li>
          <li><code>telefone</code>: o telefone do cliente, ou <code>"não informado"</code> se não existir;</li>
          <li><code>total_pedidos</code>: a soma dos <code>valor</code> de todos os pedidos;</li>
          <li><code>resumo_json</code>: o texto JSON (com acentos) do dicionário <code>{"cliente": nome_cliente, "qtd_pedidos": 3, "total": total_pedidos}</code>, montado a partir dos dados.</li>
        </ul>`,
      dica: `Dicionário dentro de dicionário: <code>dados["cliente"]["nome"]</code>. <code>dados["pedidos"]</code> é uma lista de dicionários: percorra com <code>for</code>.`,
      lang: "python",
      inicial: c`import json

resposta_api = '{"cliente": {"nome": "Marina Costa", "email": "marina@email.com"}, "pedidos": [{"id": 1, "valor": 120.5}, {"id": 2, "valor": 79.5}, {"id": 3, "valor": 300.0}]}'

# Crie dados, nome_cliente, telefone, total_pedidos e resumo_json
`,
      solucao: c`import json

resposta_api = '{"cliente": {"nome": "Marina Costa", "email": "marina@email.com"}, "pedidos": [{"id": 1, "valor": 120.5}, {"id": 2, "valor": 79.5}, {"id": 3, "valor": 300.0}]}'

dados = json.loads(resposta_api)
nome_cliente = dados["cliente"]["nome"]
telefone = dados["cliente"].get("telefone", "não informado")

total_pedidos = 0
for pedido in dados["pedidos"]:
    total_pedidos += pedido["valor"]

resumo = {"cliente": nome_cliente, "qtd_pedidos": len(dados["pedidos"]), "total": total_pedidos}
resumo_json = json.dumps(resumo, ensure_ascii=False)
print(resumo_json)`,
      padroes: [
        [/json\.loads\s*\(\s*resposta_api/, "Converta o texto com json.loads(resposta_api)."]
      ],
      teste: c`
import json as _json
_g = globals()
for _n in ("dados", "nome_cliente", "telefone", "total_pedidos", "resumo_json"):
    assert _n in _g, f"Crie a variável {_n}."
assert isinstance(dados, dict), "dados deveria ser um dicionário."
assert nome_cliente == "Marina Costa", f'nome_cliente deveria ser "Marina Costa", mas é {nome_cliente!r}'
assert telefone == "não informado", f'telefone deveria ser "não informado", mas é {telefone!r}'
assert abs(total_pedidos - 500.0) < 1e-6, f"total_pedidos deveria ser 500.0, mas é {total_pedidos}"
assert isinstance(resumo_json, str), "resumo_json deveria ser texto (use json.dumps)."
_r = _json.loads(resumo_json)
assert _r.get("cliente") == "Marina Costa" and _r.get("qtd_pedidos") == 3 and abs(_r.get("total", 0) - 500) < 1e-6, f"resumo_json deveria ter cliente, qtd_pedidos 3 e total 500.0, mas é {resumo_json}"`
    }
  ],
  i3: [
    {
      tipo: "completar",
      titulo: "Somando o CSV do ERP",
      enunciado: `O financeiro exportou o arquivo <code>vendas.csv</code> (ele já existe aqui no sandbox). Algumas linhas têm valores quebrados.
        Complete o código para abrir o arquivo, ler cada linha como dicionário e <b>não parar</b> quando a conversão falhar: guarde o nome do cliente em <code>erros</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Abrir arquivo: <code>open(...)</code>. Ler o CSV como dicionários: <code>csv.DictReader</code>. Erro de conversão de <code>float("abc")</code> é <code>ValueError</code>.`,
      lang: "python",
      inicial: c`import csv

total = 0
erros = []

with ____("vendas.csv", encoding="utf-8") as arquivo:
    for linha in csv.____(arquivo):
        try:
            total += float(linha["valor"].replace(",", "."))
        except ____:
            erros.append(linha["cliente"])

print(f"Total: R$ {total:.2f} | Linhas com erro: {len(erros)}")
`,
      solucao: c`import csv

total = 0
erros = []

with open("vendas.csv", encoding="utf-8") as arquivo:
    for linha in csv.DictReader(arquivo):
        try:
            total += float(linha["valor"].replace(",", "."))
        except ValueError:
            erros.append(linha["cliente"])

print(f"Total: R$ {total:.2f} | Linhas com erro: {len(erros)}")`,
      padroes: [
        [/except\s*\(?\s*ValueError/, "Capture o erro específico: except ValueError."]
      ],
      teste: c`
assert abs(total - 3890.3) < 0.001, f"total deveria ser 3890.30, mas é {total:.2f}"
assert erros == ["Eva Rocha"], f'erros deveria ser ["Eva Rocha"] (o valor "abc"), mas é {erros}'
assert "Total: R$ 3890.30 | Linhas com erro: 1" in __saida__, "Mantenha o print do final."`
    },
    {
      tipo: "completar",
      titulo: "Gravando o arquivo de comissões",
      enunciado: `O RH precisa de um arquivo <code>comissoes.txt</code> com a comissão de 5% de cada vendedor, uma por linha (ex.: <code>Ana: R$ 160.00</code>).
        Complete o código: abra o arquivo no modo de <b>escrita</b> (apagando o que havia antes) e escreva cada linha.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Modos do <code>open</code>: <code>"r"</code> ler, <code>"w"</code> escrever, <code>"a"</code> acrescentar. Para escrever no arquivo: <code>saida.write(texto)</code>.`,
      lang: "python",
      inicial: c`vendedores = {"Ana": 3200.0, "Bruno": 2750.0, "Carla": 4100.0}

with open("comissoes.txt", "____", encoding="utf-8") as saida:
    for nome, total in vendedores.items():
        comissao = total * 0.05
        saida.____(f"{nome}: R$ {comissao:.2f}\n")

with open("comissoes.txt", encoding="utf-8") as arquivo:
    print(arquivo.read())
`,
      solucao: c`vendedores = {"Ana": 3200.0, "Bruno": 2750.0, "Carla": 4100.0}

with open("comissoes.txt", "w", encoding="utf-8") as saida:
    for nome, total in vendedores.items():
        comissao = total * 0.05
        saida.write(f"{nome}: R$ {comissao:.2f}\n")

with open("comissoes.txt", encoding="utf-8") as arquivo:
    print(arquivo.read())`,
      padroes: [
        [/open\(\s*["']comissoes\.txt["']\s*,\s*["']w["']/, 'Abra comissoes.txt no modo de escrita "w".'],
        [/saida\.write\(/, "Escreva cada linha com saida.write(...)."]
      ],
      teste: c`
import os as _os
try:
    assert _os.path.exists("comissoes.txt"), "O arquivo comissoes.txt não foi criado."
    with open("comissoes.txt", encoding="utf-8") as _f:
        _conteudo = _f.read()
    _esperado = "Ana: R$ 160.00\nBruno: R$ 137.50\nCarla: R$ 205.00\n"
    assert _conteudo == _esperado, f"O arquivo deveria conter (uma por linha):\n{_esperado}\nmas contém:\n{_conteudo}"
finally:
    if _os.path.exists("comissoes.txt"):
        _os.remove("comissoes.txt")`
    },
    {
      tipo: "completar",
      titulo: "Quantidade digitada sem quebrar",
      enunciado: `No caixa do delivery, o atendente às vezes digita a quantidade errada (letras ou vazio). Complete a função <code>ler_quantidade(texto)</code>:
        ela tenta converter o texto em inteiro e, se der <code>ValueError</code>, devolve <code>0</code> em vez de quebrar.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A estrutura é <code>try:</code> … <code>except TipoDoErro:</code> …`,
      lang: "python",
      inicial: c`def ler_quantidade(texto):
    ____:
        return int(texto)
    except ____:
        return 0

print(ler_quantidade("5"), ler_quantidade("cinco"), ler_quantidade(""))
`,
      solucao: c`def ler_quantidade(texto):
    try:
        return int(texto)
    except ValueError:
        return 0

print(ler_quantidade("5"), ler_quantidade("cinco"), ler_quantidade(""))`,
      padroes: [
        [/except\s*\(?\s*ValueError/, "Capture o erro específico: except ValueError."]
      ],
      teste: c`
_casos = {"5": 5, "12": 12, "cinco": 0, "": 0, "2.5": 0}
for _t, _esperado in _casos.items():
    _r = ler_quantidade(_t)
    assert _r == _esperado, f"ler_quantidade({_t!r}) deveria ser {_esperado}, mas foi {_r!r}"`
    },
    {
      tipo: "criar",
      titulo: "E-mails dos clientes de Pernambuco",
      enunciado: `O marketing vai fazer uma campanha em Pernambuco. Usando o arquivo <code>clientes.csv</code> (colunas <code>id,nome,cidade,uf,email</code>), crie do zero:
        <ul>
          <li>a lista <code>emails_pe</code> com o e-mail de cada cliente cuja <code>uf</code> é <code>"PE"</code> (na ordem do arquivo);</li>
          <li>o arquivo <code>emails_pe.txt</code> com esses e-mails, <b>um por linha</b>;</li>
          <li>imprima <code>2 e-mails salvos</code> (o número vem do tamanho da lista).</li>
        </ul>
        Use <code>with open(...)</code> para ler e para escrever.`,
      dica: `Leia com <code>csv.DictReader</code> e filtre com <code>if linha["uf"] == "PE"</code>. Ao escrever, adicione <code>"\n"</code> no fim de cada e-mail.`,
      lang: "python",
      inicial: c`import csv

# 1) Leia clientes.csv e monte a lista emails_pe (uf == "PE")
# 2) Grave emails_pe.txt com um e-mail por linha
# 3) Imprima: 2 e-mails salvos
`,
      solucao: c`import csv

emails_pe = []
with open("clientes.csv", encoding="utf-8") as arquivo:
    for linha in csv.DictReader(arquivo):
        if linha["uf"] == "PE":
            emails_pe.append(linha["email"])

with open("emails_pe.txt", "w", encoding="utf-8") as saida:
    for email in emails_pe:
        saida.write(email + "\n")

print(f"{len(emails_pe)} e-mails salvos")`,
      padroes: [
        [/with\s+open\(/, "Use with open(...) para abrir os arquivos."]
      ],
      teste: c`
import os as _os
try:
    assert "emails_pe" in globals(), "Crie a lista emails_pe."
    assert emails_pe == ["ana@email.com", "carla@email.com"], f"emails_pe deveria ser ['ana@email.com', 'carla@email.com'], mas é {emails_pe}"
    assert _os.path.exists("emails_pe.txt"), "O arquivo emails_pe.txt não foi criado."
    with open("emails_pe.txt", encoding="utf-8") as _f:
        _linhas = [l.strip() for l in _f.read().splitlines() if l.strip()]
    assert _linhas == ["ana@email.com", "carla@email.com"], f"emails_pe.txt deveria ter um e-mail por linha, mas tem: {_linhas}"
    assert "2 e-mails salvos" in __saida__, "Imprima: 2 e-mails salvos"
finally:
    if _os.path.exists("emails_pe.txt"):
        _os.remove("emails_pe.txt")`
    },
    {
      tipo: "criar",
      titulo: "Processador de vendas à prova de erros",
      enunciado: `Crie a função <code>processar_vendas(caminho)</code> que lê um CSV no formato de <code>vendas.csv</code> e devolve uma <b>tupla</b> <code>(total, erros)</code>:
        <ul>
          <li><code>total</code>: soma dos valores das linhas com <code>status</code> igual a <code>"pago"</code> (aceite vírgula como decimal, ex.: <code>"89,90"</code>);</li>
          <li><code>erros</code>: lista com o nome do <code>cliente</code> de cada linha cujo valor não pôde ser convertido (o programa continua);</li>
          <li>se o arquivo não existir, devolva <code>(0, [])</code> sem quebrar.</li>
        </ul>
        Com <code>vendas.csv</code> o resultado é <code>(3190.4, ["Eva Rocha"])</code>.`,
      dica: `Coloque o <code>with open</code> dentro de um <code>try</code> com <code>except FileNotFoundError</code>. Dentro do laço, outro <code>try</code> para o <code>float(...)</code>.`,
      lang: "python",
      inicial: c`import csv

# Crie a função processar_vendas(caminho) -> (total, erros)
# - soma só status "pago" (troque "," por ".")
# - valor inválido: guarda o cliente em erros e continua
# - arquivo inexistente: devolve (0, [])
`,
      solucao: c`import csv

def processar_vendas(caminho):
    total = 0
    erros = []
    try:
        with open(caminho, encoding="utf-8") as arquivo:
            for linha in csv.DictReader(arquivo):
                try:
                    valor = float(linha["valor"].replace(",", "."))
                except ValueError:
                    erros.append(linha["cliente"])
                    continue
                if linha["status"] == "pago":
                    total += valor
    except FileNotFoundError:
        return (0, [])
    return (total, erros)

print(processar_vendas("vendas.csv"))`,
      padroes: [
        [/FileNotFoundError/, "Trate o arquivo inexistente com except FileNotFoundError."]
      ],
      teste: c`
import os as _os
assert "processar_vendas" in globals(), "Crie a função processar_vendas."
_r = processar_vendas("vendas.csv")
assert isinstance(_r, tuple) and len(_r) == 2, f"A função deveria devolver uma tupla (total, erros), mas devolveu {_r!r}"
assert abs(_r[0] - 3190.4) < 0.001, f"Com vendas.csv o total pago deveria ser 3190.40, mas é {_r[0]}"
assert list(_r[1]) == ["Eva Rocha"], f'Com vendas.csv os erros deveriam ser ["Eva Rocha"], mas são {_r[1]}'
_r2 = processar_vendas("nao_existe.csv")
assert _r2 == (0, []), f"Para arquivo inexistente deveria devolver (0, []), mas devolveu {_r2!r}"
try:
    with open("_teste_vendas.csv", "w", encoding="utf-8") as _f:
        _f.write("data,cliente,cidade,valor,status\n2026-10-01,Zé,Natal,10,pago\n2026-10-02,Lia,Natal,x,pago\n2026-10-03,Rui,Natal,\"5,5\",pago\n2026-10-04,Bia,Natal,100,cancelado\n")
    _r3 = processar_vendas("_teste_vendas.csv")
    assert abs(_r3[0] - 15.5) < 0.001 and list(_r3[1]) == ["Lia"], f"Com outro arquivo (10 pago, x inválido, 5,5 pago, 100 cancelado) deveria dar (15.5, ['Lia']), mas deu {_r3!r}"
finally:
    if _os.path.exists("_teste_vendas.csv"):
        _os.remove("_teste_vendas.csv")`
    }
  ],
  a1: [
    {
      tipo: "completar",
      titulo: "Classe Produto",
      enunciado: `Complete a classe <code>Produto</code> da loja: o construtor recebe <code>nome</code> e <code>preco</code> e guarda os dois como atributos;
        o método <code>preco_com_desconto(percentual)</code> devolve o preço com desconto. No fim, crie o objeto <code>cafe</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `O construtor é o método especial <code>__init__</code>. Os atributos ficam no próprio objeto, acessado por <code>self</code>. Criar objeto: <code>NomeDaClasse(...)</code>.`,
      lang: "python",
      inicial: c`class Produto:
    def ____(self, nome, preco):
        self.nome = nome
        ____.preco = preco

    def preco_com_desconto(self, percentual):
        return self.preco - self.preco * percentual / 100

cafe = ____("Café", 20.0)
print(cafe.nome, cafe.preco_com_desconto(10))
`,
      solucao: c`class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

    def preco_com_desconto(self, percentual):
        return self.preco - self.preco * percentual / 100

cafe = Produto("Café", 20.0)
print(cafe.nome, cafe.preco_com_desconto(10))`,
      teste: c`
assert isinstance(cafe, Produto), "cafe deveria ser um objeto da classe Produto."
assert cafe.nome == "Café" and cafe.preco == 20.0, "cafe deveria ter nome 'Café' e preco 20.0."
_p = Produto("Bolo", 50.0)
assert _p.preco == 50.0, "O construtor deve guardar o preco em self.preco."
assert _p.preco_com_desconto(20) == 40.0, f"Produto('Bolo', 50.0).preco_com_desconto(20) deveria ser 40.0, mas é {_p.preco_com_desconto(20)}"
assert "Café 18.0" in __saida__, "A saída deveria mostrar: Café 18.0"`
    },
    {
      tipo: "completar",
      titulo: "Conta bancária com regras",
      enunciado: `Complete a classe <code>Conta</code>:
        <ul>
          <li>depositar valor zero ou negativo deve <b>lançar</b> <code>ValueError</code>;</li>
          <li>sacar deve <b>diminuir</b> o saldo interno;</li>
          <li><code>saldo</code> deve ser lido como atributo (<code>conta.saldo</code>, sem parênteses), mas sem permitir alterar direto.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Lançar erro: <code>raise</code>. Diminuir: <code>-=</code>. Método lido como atributo: decorador <code>@property</code>.`,
      lang: "python",
      inicial: c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self._saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            ____ ValueError("Valor deve ser positivo")
        self._saldo += valor

    def sacar(self, valor):
        if valor > self._saldo:
            raise ValueError("Saldo insuficiente")
        self._saldo ____ valor

    @____
    def saldo(self):
        return self._saldo

conta = Conta("Ana", 100)
conta.depositar(50)
conta.sacar(30)
print(conta.titular, conta.saldo)
`,
      solucao: c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self._saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        self._saldo += valor

    def sacar(self, valor):
        if valor > self._saldo:
            raise ValueError("Saldo insuficiente")
        self._saldo -= valor

    @property
    def saldo(self):
        return self._saldo

conta = Conta("Ana", 100)
conta.depositar(50)
conta.sacar(30)
print(conta.titular, conta.saldo)`,
      teste: c`
assert conta.saldo == 120, f"Depois de depositar 50 e sacar 30, o saldo deveria ser 120, mas é {conta.saldo}"
_c = Conta("Teste", 10)
try:
    _c.depositar(-5)
    assert False, "depositar(-5) deveria lançar ValueError."
except ValueError:
    pass
try:
    _c.sacar(50)
    assert False, "sacar(50) com saldo 10 deveria lançar ValueError."
except ValueError:
    pass
assert _c.saldo == 10, "O saldo não deveria mudar quando a operação é recusada."
try:
    _c.saldo = 999
    assert False, "saldo deveria ser somente leitura (@property)."
except AttributeError:
    pass`
    },
    {
      tipo: "completar",
      titulo: "Herança: conta poupança",
      enunciado: `A <code>ContaPoupanca</code> é uma <code>Conta</code> com rendimento. Complete:
        <ul>
          <li>a classe deve <b>herdar</b> de <code>Conta</code>;</li>
          <li>o construtor deve chamar o construtor da classe mãe para guardar titular e saldo;</li>
          <li><code>render()</code> multiplica o saldo por <code>1 + taxa</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Herança: <code>class Filha(Mae):</code>. Chamar o construtor da mãe: <code>super().__init__(...)</code>. Multiplicar e guardar: <code>*=</code>.`,
      lang: "python",
      inicial: c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self._saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        self._saldo += valor

    @property
    def saldo(self):
        return self._saldo


class ContaPoupanca(____):
    def __init__(self, titular, saldo=0, taxa=0.005):
        ____().__init__(titular, saldo)
        self.taxa = taxa

    def render(self):
        self._saldo ____ 1 + self.taxa


poupanca = ContaPoupanca("Bia", 1000)
poupanca.render()
print(round(poupanca.saldo, 2))
`,
      solucao: c`class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self._saldo = saldo

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        self._saldo += valor

    @property
    def saldo(self):
        return self._saldo


class ContaPoupanca(Conta):
    def __init__(self, titular, saldo=0, taxa=0.005):
        super().__init__(titular, saldo)
        self.taxa = taxa

    def render(self):
        self._saldo *= 1 + self.taxa


poupanca = ContaPoupanca("Bia", 1000)
poupanca.render()
print(round(poupanca.saldo, 2))`,
      teste: c`
assert issubclass(ContaPoupanca, Conta), "ContaPoupanca deve herdar de Conta."
assert abs(poupanca.saldo - 1005) < 1e-9, f"Depois de render(), o saldo deveria ser 1005.0, mas é {poupanca.saldo}"
_p = ContaPoupanca("Caio", 2000, taxa=0.01)
assert _p.titular == "Caio", "O titular deveria ser guardado pelo construtor de Conta (super().__init__)."
_p.render()
assert abs(_p.saldo - 2020) < 1e-9, f"Com taxa 0.01, 2000 deveria virar 2020.0, mas virou {_p.saldo}"
_p.depositar(80)
assert abs(_p.saldo - 2100) < 1e-9, "A poupança deveria herdar o método depositar."`
    },
    {
      tipo: "criar",
      titulo: "Carrinho de compras",
      enunciado: `Crie a classe <code>Carrinho</code> para o e-commerce:
        <ul>
          <li>o construtor cria a lista vazia <code>self.itens</code>;</li>
          <li><code>adicionar(nome, preco, quantidade=1)</code> guarda o item; se a <code>quantidade</code> for 0 ou negativa, lança <code>ValueError</code>;</li>
          <li><code>total()</code> devolve a soma de preço × quantidade, arredondada com <code>round(..., 2)</code>;</li>
          <li>a propriedade <code>quantidade_itens</code> (com <code>@property</code>) devolve a soma das quantidades.</li>
        </ul>`,
      dica: `Guarde cada item como dicionário, ex.: <code>{"nome": nome, "preco": preco, "quantidade": quantidade}</code>.`,
      lang: "python",
      inicial: c`# Crie a classe Carrinho com:
# - self.itens (lista vazia no __init__)
# - adicionar(nome, preco, quantidade=1)  -> ValueError se quantidade <= 0
# - total()  -> soma de preco * quantidade, com round(..., 2)
# - @property quantidade_itens  -> soma das quantidades
`,
      solucao: c`class Carrinho:
    def __init__(self):
        self.itens = []

    def adicionar(self, nome, preco, quantidade=1):
        if quantidade <= 0:
            raise ValueError("Quantidade inválida")
        self.itens.append({"nome": nome, "preco": preco, "quantidade": quantidade})

    def total(self):
        soma = 0
        for item in self.itens:
            soma += item["preco"] * item["quantidade"]
        return round(soma, 2)

    @property
    def quantidade_itens(self):
        return sum(item["quantidade"] for item in self.itens)


carrinho = Carrinho()
carrinho.adicionar("Camiseta", 49.9, 2)
carrinho.adicionar("Boné", 35.0)
print(carrinho.total(), carrinho.quantidade_itens)`,
      teste: c`
assert "Carrinho" in globals(), "Crie a classe Carrinho."
_c = Carrinho()
assert _c.itens == [], "Um carrinho novo deveria ter itens = []."
assert _c.total() == 0, "Um carrinho vazio deveria ter total 0."
_c.adicionar("Camiseta", 49.9, 2)
_c.adicionar("Boné", 35.0)
assert len(_c.itens) == 2, f"Depois de 2 adições, itens deveria ter 2 elementos, mas tem {len(_c.itens)}"
assert _c.total() == 134.8, f"total() deveria ser 134.8, mas é {_c.total()}"
assert _c.quantidade_itens == 3, f"quantidade_itens deveria ser 3 (use @property), mas é {_c.quantidade_itens}"
_outro = Carrinho()
assert _outro.itens == [], "Cada carrinho deve ter sua própria lista (crie self.itens dentro do __init__)."
try:
    _c.adicionar("Meia", 10.0, 0)
    assert False, "adicionar com quantidade 0 deveria lançar ValueError."
except ValueError:
    pass`
    },
    {
      tipo: "criar",
      titulo: "Bônus de funcionários e gerentes",
      enunciado: `No sistema de RH, crie:
        <ul>
          <li>a classe <code>Funcionario(nome, salario)</code> com o método <code>bonus()</code> que devolve <b>10%</b> do salário;</li>
          <li>o método especial <code>__str__</code> devolvendo <code>"Ana (R$ 3000.00)"</code> (nome e salário com 2 casas);</li>
          <li>a classe <code>Gerente</code>, que <b>herda</b> de <code>Funcionario</code> e sobrescreve <code>bonus()</code> para <b>20%</b>;</li>
          <li>a função <code>total_bonus(equipe)</code> que soma o <code>bonus()</code> de todos da lista (polimorfismo: cada um calcula o seu).</li>
        </ul>`,
      dica: `Na classe filha, basta redefinir o método com o mesmo nome. Em <code>total_bonus</code>, chame <code>f.bonus()</code> sem perguntar o tipo.`,
      lang: "python",
      inicial: c`# Crie Funcionario(nome, salario) com bonus() = 10% e __str__
# Crie Gerente(Funcionario) com bonus() = 20%
# Crie a função total_bonus(equipe)
`,
      solucao: c`class Funcionario:
    def __init__(self, nome, salario):
        self.nome = nome
        self.salario = salario

    def bonus(self):
        return self.salario * 0.10

    def __str__(self):
        return f"{self.nome} (R$ {self.salario:.2f})"


class Gerente(Funcionario):
    def bonus(self):
        return self.salario * 0.20


def total_bonus(equipe):
    total = 0
    for f in equipe:
        total += f.bonus()
    return total


equipe = [Funcionario("Ana", 3000), Gerente("Bruno", 8000)]
print(total_bonus(equipe))`,
      teste: c`
for _n in ("Funcionario", "Gerente", "total_bonus"):
    assert _n in globals(), f"Crie {_n}."
assert issubclass(Gerente, Funcionario), "Gerente deve herdar de Funcionario."
_a = Funcionario("Ana", 3000)
_b = Gerente("Bruno", 8000)
assert abs(_a.bonus() - 300) < 1e-9, f"O bônus de um Funcionario com salário 3000 deveria ser 300, mas é {_a.bonus()}"
assert abs(_b.bonus() - 1600) < 1e-9, f"O bônus de um Gerente com salário 8000 deveria ser 1600, mas é {_b.bonus()}"
assert str(_a) == "Ana (R$ 3000.00)", f'str(Funcionario("Ana", 3000)) deveria ser "Ana (R$ 3000.00)", mas é {str(_a)!r}'
assert str(_b) == "Bruno (R$ 8000.00)", "Gerente deveria herdar o __str__."
_t = total_bonus([_a, _b, Funcionario("Carla", 2500)])
assert abs(_t - 2150) < 1e-9, f"total_bonus deveria ser 2150 (300 + 1600 + 250), mas é {_t}"
assert total_bonus([]) == 0, "total_bonus([]) deveria ser 0."`
    }
  ],
  a2: [
    {
      tipo: "completar",
      titulo: "Carregando e filtrando as vendas",
      enunciado: `Use o pandas para carregar o arquivo <code>vendas.csv</code> em um DataFrame e criar <code>pagos</code> só com as linhas cujo <code>status</code> é <code>"pago"</code>.
        Substitua cada <code>____</code> pelo que falta. <i>(Na primeira execução o pandas demora alguns segundos para carregar.)</i>`,
      dica: `Ler CSV: <code>pd.read_csv(...)</code>. Filtro: <code>df[df["coluna"] == valor]</code>.`,
      lang: "python",
      inicial: c`import pandas as pd

df = pd.____("vendas.csv")
print(df.head())

pagos = df[df["status"] ____ "pago"]
print("Vendas pagas:", len(pagos))
`,
      solucao: c`import pandas as pd

df = pd.read_csv("vendas.csv")
print(df.head())

pagos = df[df["status"] == "pago"]
print("Vendas pagas:", len(pagos))`,
      teste: c`
import pandas as _pd
assert isinstance(df, _pd.DataFrame) and df.shape == (9, 5), "df deveria ser o DataFrame de vendas.csv (9 linhas, 5 colunas)."
assert isinstance(pagos, _pd.DataFrame), "pagos deveria ser um DataFrame."
assert len(pagos) == 7, f"pagos deveria ter 7 linhas, mas tem {len(pagos)}"
assert set(pagos["status"]) == {"pago"}, "pagos deveria ter só status 'pago'."
assert "Vendas pagas: 7" in __saida__, "Mantenha o print do final."`
    },
    {
      tipo: "completar",
      titulo: "Limpando a coluna de valores",
      enunciado: `A coluna <code>valor</code> veio suja: tem <code>"abc"</code> e <code>"89,90"</code> (com vírgula). Complete a limpeza:
        <ul>
          <li>converta a coluna para número, transformando o que não for número em vazio (<code>NaN</code>);</li>
          <li>conte quantos valores ficaram vazios;</li>
          <li>remova as linhas em que <code>valor</code> está vazio.</li>
        </ul>
        Substitua cada <code>____</code> pela função ou método certo.`,
      dica: `<code>pd.to_numeric(..., errors="coerce")</code> vira <code>NaN</code> quando não consegue converter. Vazios: <code>.isna()</code>. Remover: <code>.dropna(subset=[...])</code>.`,
      lang: "python",
      inicial: c`import pandas as pd

df = pd.read_csv("vendas.csv")
df["valor"] = df["valor"].str.replace(",", ".")
df["valor"] = pd.____(df["valor"], errors="coerce")

print("Valores inválidos:", df["valor"].____().sum())
df = df.____(subset=["valor"])

print("Linhas válidas:", len(df))
print("Total:", round(df["valor"].sum(), 2))
`,
      solucao: c`import pandas as pd

df = pd.read_csv("vendas.csv")
df["valor"] = df["valor"].str.replace(",", ".")
df["valor"] = pd.to_numeric(df["valor"], errors="coerce")

print("Valores inválidos:", df["valor"].isna().sum())
df = df.dropna(subset=["valor"])

print("Linhas válidas:", len(df))
print("Total:", round(df["valor"].sum(), 2))`,
      teste: c`
import pandas as _pd
assert _pd.api.types.is_numeric_dtype(df["valor"]), "A coluna valor deveria ser numérica depois do to_numeric."
assert len(df) == 8, f"Depois de remover o inválido, df deveria ter 8 linhas, mas tem {len(df)}"
assert abs(df["valor"].sum() - 3890.3) < 0.001, f"A soma de valor deveria ser 3890.30, mas é {df['valor'].sum():.2f}"
assert "Valores inválidos: 1" in __saida__, "A saída deveria mostrar: Valores inválidos: 1"`
    },
    {
      tipo: "completar",
      titulo: "Total pago por cidade",
      enunciado: `O gestor quer o <b>total de vendas pagas por cidade</b>, da maior para a menor. Os dados já estão limpos.
        Complete: agrupe por <code>cidade</code>, some a coluna <code>valor</code> e ordene de forma <b>decrescente</b>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>.groupby("coluna")</code> agrupa; <code>.sum()</code> soma; <code>sort_values(ascending=False)</code> ordena do maior para o menor.`,
      lang: "python",
      inicial: c`import pandas as pd

df = pd.read_csv("vendas.csv")
df["valor"] = pd.to_numeric(df["valor"].str.replace(",", "."), errors="coerce")
df = df.dropna(subset=["valor"])

pagos = df[df["status"] == "pago"]
resumo = (pagos.____("cidade")["valor"]
          .____()
          .sort_values(ascending=____))
print(resumo)
`,
      solucao: c`import pandas as pd

df = pd.read_csv("vendas.csv")
df["valor"] = pd.to_numeric(df["valor"].str.replace(",", "."), errors="coerce")
df = df.dropna(subset=["valor"])

pagos = df[df["status"] == "pago"]
resumo = (pagos.groupby("cidade")["valor"]
          .sum()
          .sort_values(ascending=False))
print(resumo)`,
      teste: c`
_ordem = ["Curitiba", "Salvador", "Recife", "São Paulo"]
assert list(resumo.index) == _ordem, f"A ordem deveria ser {_ordem}, mas é {list(resumo.index)}"
for _cid, _v in {"Curitiba": 1200.0, "Salvador": 980.0, "Recife": 600.0, "São Paulo": 410.4}.items():
    assert abs(resumo[_cid] - _v) < 0.001, f"O total de {_cid} deveria ser {_v}, mas é {resumo[_cid]}"`
    },
    {
      tipo: "criar",
      titulo: "Ticket médio por cliente",
      enunciado: `Crie do zero, a partir de <code>vendas.csv</code>, o DataFrame <code>resumo</code> com uma linha por <b>cliente</b> e as colunas
        <code>count</code>, <code>sum</code> e <code>mean</code> do valor, <b>só das vendas pagas</b> e com valor válido, ordenado pela soma (maior primeiro).
        <ul>
          <li>troque a vírgula por ponto e converta <code>valor</code> com <code>pd.to_numeric(..., errors="coerce")</code>;</li>
          <li>remova os valores vazios e filtre <code>status == "pago"</code>;</li>
          <li>use <code>groupby("cliente")["valor"].agg(["count", "sum", "mean"])</code> e <code>sort_values("sum", ascending=False)</code>.</li>
        </ul>`,
      dica: `Siga o fluxo do tópico: carregar → limpar → filtrar → agrupar → ordenar. Pode encadear tudo entre parênteses.`,
      lang: "python",
      inicial: c`import pandas as pd

# 1) Carregue vendas.csv
# 2) Limpe a coluna valor (vírgula -> ponto, to_numeric com errors="coerce", dropna)
# 3) Filtre só status "pago"
# 4) resumo = agrupe por cliente com count, sum e mean, ordenado por sum (maior primeiro)
`,
      solucao: c`import pandas as pd

df = pd.read_csv("vendas.csv")
df["valor"] = pd.to_numeric(df["valor"].str.replace(",", "."), errors="coerce")
df = df.dropna(subset=["valor"])

resumo = (df[df["status"] == "pago"]
          .groupby("cliente")["valor"]
          .agg(["count", "sum", "mean"])
          .sort_values("sum", ascending=False))
print(resumo)`,
      teste: c`
import pandas as _pd
assert "resumo" in globals() and isinstance(resumo, _pd.DataFrame), "Crie o DataFrame resumo."
for _col in ("count", "sum", "mean"):
    assert _col in resumo.columns, f"resumo deveria ter a coluna {_col}."
_ordem = ["Diego Alves", "Gabi Costa", "Ana Souza", "Bruno Lima"]
assert list(resumo.index) == _ordem, f"Os clientes deveriam ser {_ordem} (nessa ordem), mas são {list(resumo.index)}"
assert resumo.loc["Ana Souza", "count"] == 2, "Ana Souza deveria ter 2 vendas pagas."
assert abs(resumo.loc["Ana Souza", "mean"] - 300) < 0.001, "O ticket médio de Ana Souza deveria ser 300.0."
assert abs(resumo.loc["Bruno Lima", "sum"] - 410.4) < 0.001, "Bruno Lima deveria somar 410.40 (o 89,90 precisa virar 89.90)."`
    },
    {
      tipo: "criar",
      titulo: "Diagnóstico de nulos e duplicados",
      enunciado: `O sistema de pedidos exportou dados com problemas. Usando o DataFrame <code>pedidos</code>, crie:
        <ul>
          <li><code>nulos</code>: quantos valores vazios há na coluna <code>desconto</code> (nos dados originais);</li>
          <li><code>duplicados</code>: quantas linhas duplicadas existem (nos dados originais);</li>
          <li><code>limpo</code>: um novo DataFrame sem as duplicadas, com os descontos vazios preenchidos com <code>0</code> e a nova coluna <code>liquido</code> = <code>valor - desconto</code>;</li>
          <li><code>total_liquido</code>: a soma da coluna <code>liquido</code> de <code>limpo</code>.</li>
        </ul>`,
      dica: `<code>.isna().sum()</code>, <code>.duplicated().sum()</code>, <code>.drop_duplicates()</code> e <code>.fillna({"desconto": 0})</code>. Crie coluna nova com <code>limpo["liquido"] = ...</code>.`,
      lang: "python",
      inicial: c`import pandas as pd

pedidos = pd.DataFrame({
    "pedido": [101, 102, 102, 103, 104, 105],
    "cliente": ["Ana", "Bruno", "Bruno", "Carla", "Diego", "Eva"],
    "valor": [120.0, 80.0, 80.0, 200.0, 50.0, 150.0],
    "desconto": [10.0, None, None, 20.0, None, 15.0]
})

# Crie nulos, duplicados, limpo (com a coluna liquido) e total_liquido
`,
      solucao: c`import pandas as pd

pedidos = pd.DataFrame({
    "pedido": [101, 102, 102, 103, 104, 105],
    "cliente": ["Ana", "Bruno", "Bruno", "Carla", "Diego", "Eva"],
    "valor": [120.0, 80.0, 80.0, 200.0, 50.0, 150.0],
    "desconto": [10.0, None, None, 20.0, None, 15.0]
})

nulos = pedidos["desconto"].isna().sum()
duplicados = pedidos.duplicated().sum()

limpo = pedidos.drop_duplicates().fillna({"desconto": 0})
limpo["liquido"] = limpo["valor"] - limpo["desconto"]
total_liquido = limpo["liquido"].sum()

print("Nulos:", nulos, "| Duplicados:", duplicados, "| Total líquido:", total_liquido)`,
      teste: c`
import pandas as _pd
_g = globals()
for _n in ("nulos", "duplicados", "limpo", "total_liquido"):
    assert _n in _g, f"Crie a variável {_n}."
assert nulos == 3, f"nulos deveria ser 3 (descontos vazios nos dados originais), mas é {nulos}"
assert duplicados == 1, f"duplicados deveria ser 1, mas é {duplicados}"
assert len(pedidos) == 6, "Não altere o DataFrame original pedidos: crie limpo a partir dele."
assert isinstance(limpo, _pd.DataFrame) and len(limpo) == 5, f"limpo deveria ter 5 linhas (sem a duplicada), mas tem {len(limpo)}"
assert "liquido" in limpo.columns, "limpo deveria ter a coluna liquido."
assert limpo["desconto"].isna().sum() == 0, "Preencha os descontos vazios de limpo com 0."
assert abs(total_liquido - 555) < 0.001, f"total_liquido deveria ser 555.0, mas é {total_liquido}"`
    }
  ],
  a3: [
    {
      tipo: "completar",
      titulo: "Rota GET com erro 404",
      enunciado: `O FastAPI não roda no navegador, então o início do código traz um <b>simulador</b> com a mesma cara do FastAPI (não mexa nele).
        Complete a rota que busca um produto pelo <code>id</code>:
        <ul>
          <li>ligue a função ao método <b>GET</b> no caminho <code>/produtos/{id}</code>;</li>
          <li>se o <code>id</code> não estiver no dicionário <code>produtos</code>, lance <code>HTTPException</code> com <code>status_code</code> <b>404</b>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `O decorador de busca é <code>@app.get(...)</code>. Teste de pertencimento: <code>id not in dicionario</code>. “Não encontrado” é o código 404.`,
      lang: "python",
      notaVerificacao: "No projeto real, apague o simulador, use from fastapi import FastAPI, HTTPException e rode com uvicorn main:app --reload.",
      inicial: SIM + c`
app = FastAPI()
produtos = {1: {"nome": "Café", "preco": 12.9}, 2: {"nome": "Pão de queijo", "preco": 4.5}}

@app.____("/produtos/{id}")
def buscar(id: int):
    if id not in ____:
        raise ____(status_code=____, detail="Não encontrado")
    return produtos[id]

print(buscar(1))
`,
      solucao: SIM + c`
app = FastAPI()
produtos = {1: {"nome": "Café", "preco": 12.9}, 2: {"nome": "Pão de queijo", "preco": 4.5}}

@app.get("/produtos/{id}")
def buscar(id: int):
    if id not in produtos:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return produtos[id]

print(buscar(1))`,
      teste: c`
assert ("GET", "/produtos/{id}") in app.rotas, 'Ligue a função à rota com @app.get("/produtos/{id}").'
assert buscar(2) == {"nome": "Pão de queijo", "preco": 4.5}, "buscar(2) deveria devolver o Pão de queijo."
try:
    buscar(99)
    assert False, "buscar(99) deveria lançar HTTPException (produto inexistente)."
except HTTPException as _e:
    assert _e.status_code == 404, f"O status_code deveria ser 404, mas é {_e.status_code}"`
    },
    {
      tipo: "completar",
      titulo: "Rota POST que cria produto",
      enunciado: `Complete a rota de criação: ela responde com status <b>201</b> (Criado), gera o próximo <code>id</code> a partir do <b>maior id</b> existente
        e devolve um dicionário com o <code>id</code> e todos os dados recebidos (desempacotando o dicionário).
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Maior chave de um dicionário: <code>max(produtos)</code>. Para copiar todos os pares de um dicionário para outro: <code>{"id": 1, **dados}</code>.`,
      lang: "python",
      notaVerificacao: "No projeto real, o corpo da requisição seria um modelo Pydantic (p: Produto) e você usaria p.model_dump().",
      inicial: SIM + c`
app = FastAPI()
produtos = {1: {"nome": "Café", "preco": 12.9}}

@app.post("/produtos", status_code=____)
def criar(dados: dict):
    novo_id = ____(produtos) + 1
    produtos[novo_id] = dados
    return {"id": novo_id, ____dados}

print(criar({"nome": "Bolo", "preco": 25.0}))
`,
      solucao: SIM + c`
app = FastAPI()
produtos = {1: {"nome": "Café", "preco": 12.9}}

@app.post("/produtos", status_code=201)
def criar(dados: dict):
    novo_id = max(produtos) + 1
    produtos[novo_id] = dados
    return {"id": novo_id, **dados}

print(criar({"nome": "Bolo", "preco": 25.0}))`,
      teste: c`
_rota = app.rotas.get(("POST", "/produtos"))
assert _rota is not None, 'A rota deveria ser @app.post("/produtos", ...).'
assert _rota["status_code"] == 201, f"A rota de criação deveria responder 201, mas responde {_rota['status_code']}"
assert produtos[2] == {"nome": "Bolo", "preco": 25.0}, "O Bolo deveria ter sido salvo com id 2."
produtos[10] = {"nome": "Teste", "preco": 1.0}
_r = criar({"nome": "Suco", "preco": 7.5})
assert _r == {"id": 11, "nome": "Suco", "preco": 7.5}, f"Com o maior id 10, criar deveria devolver id 11 com os dados, mas devolveu {_r}"`
    },
    {
      tipo: "completar",
      titulo: "Validando dados com Pydantic",
      enunciado: `O Pydantic (que o FastAPI usa para validar o corpo das requisições) <b>roda no navegador</b>. Complete o modelo <code>Produto</code>:
        <code>nome</code> é texto, <code>preco</code> é decimal e <code>estoque</code> é inteiro com valor padrão <code>0</code>.
        Depois capture o erro de validação quando o preço vier como <code>"caro"</code> (é o que gera a resposta <b>422</b> no FastAPI).
        Substitua cada <code>____</code> pelo que falta. <i>(A primeira execução baixa o Pydantic e pode demorar um pouco.)</i>`,
      dica: `Tipos: <code>str</code>, <code>float</code>, <code>int</code>. O erro lançado pelo Pydantic é <code>ValidationError</code>.`,
      lang: "python",
      inicial: c`from pydantic import BaseModel, ValidationError

class Produto(BaseModel):
    nome: ____
    preco: ____
    estoque: int = ____

p = Produto(nome="Pão", preco="8.50")   # o texto "8.50" vira 8.5
print(p.preco, p.estoque)
print(p.model_dump())

try:
    Produto(nome="Bolo", preco="caro")
except ____ as e:
    print("Erro 422:", e.error_count(), "erro(s)")
`,
      solucao: c`from pydantic import BaseModel, ValidationError

class Produto(BaseModel):
    nome: str
    preco: float
    estoque: int = 0

p = Produto(nome="Pão", preco="8.50")   # o texto "8.50" vira 8.5
print(p.preco, p.estoque)
print(p.model_dump())

try:
    Produto(nome="Bolo", preco="caro")
except ValidationError as e:
    print("Erro 422:", e.error_count(), "erro(s)")`,
      teste: c`
_f = Produto.model_fields
assert _f["nome"].annotation is str, "nome deveria ser do tipo str."
assert _f["preco"].annotation is float, "preco deveria ser do tipo float."
assert _f["estoque"].annotation is int and _f["estoque"].default == 0, "estoque deveria ser int com padrão 0."
assert p.preco == 8.5 and p.estoque == 0, f"p deveria ter preco 8.5 e estoque 0, mas tem {p.preco} e {p.estoque}"
assert "Erro 422: 1 erro(s)" in __saida__, 'O preço "caro" deveria gerar 1 erro de validação capturado com except ValidationError.'`
    },
    {
      tipo: "criar",
      titulo: "Validando o payload do pedido",
      enunciado: `Antes de salvar um pedido do delivery, a API confere o <b>payload</b> (dicionário recebido). Crie duas funções puras:
        <ul>
          <li><code>validar_pedido(payload)</code>: devolve uma <b>lista de erros</b> (vazia se estiver tudo certo):
            <ul>
              <li><code>"cliente é obrigatório"</code> se a chave <code>"cliente"</code> faltar ou estiver vazia;</li>
              <li><code>"itens não pode ser vazio"</code> se <code>"itens"</code> faltar ou for lista vazia;</li>
              <li><code>"item 1: quantidade inválida"</code> (com a posição começando em 1) para cada item com <code>quantidade</code> ausente ou menor que 1.</li>
            </ul>
          </li>
          <li><code>calcular_total(payload)</code>: soma <code>preco * quantidade</code> dos itens, com <code>round(..., 2)</code>.</li>
        </ul>`,
      dica: `Use <code>payload.get("cliente")</code> para não dar <code>KeyError</code>. Para a posição dos itens: <code>for i, item in enumerate(itens, start=1)</code>.`,
      lang: "python",
      inicial: c`# Crie validar_pedido(payload) -> lista de erros (textos exatos do enunciado)
# Crie calcular_total(payload) -> soma de preco * quantidade com round(..., 2)

exemplo = {
    "cliente": "Marina",
    "itens": [
        {"produto": "Pizza", "preco": 45.9, "quantidade": 2},
        {"produto": "Refrigerante", "preco": 8.0, "quantidade": 1}
    ]
}
`,
      solucao: c`def validar_pedido(payload):
    erros = []
    if not payload.get("cliente"):
        erros.append("cliente é obrigatório")
    itens = payload.get("itens") or []
    if not itens:
        erros.append("itens não pode ser vazio")
    for i, item in enumerate(itens, start=1):
        if item.get("quantidade", 0) < 1:
            erros.append(f"item {i}: quantidade inválida")
    return erros


def calcular_total(payload):
    total = 0
    for item in payload["itens"]:
        total += item["preco"] * item["quantidade"]
    return round(total, 2)


exemplo = {
    "cliente": "Marina",
    "itens": [
        {"produto": "Pizza", "preco": 45.9, "quantidade": 2},
        {"produto": "Refrigerante", "preco": 8.0, "quantidade": 1}
    ]
}
print(validar_pedido(exemplo), calcular_total(exemplo))`,
      teste: c`
for _f in ("validar_pedido", "calcular_total"):
    assert _f in globals(), f"Crie a função {_f}."
assert validar_pedido(exemplo) == [], f"O exemplo é válido; validar_pedido deveria devolver [], mas devolveu {validar_pedido(exemplo)}"
assert calcular_total(exemplo) == 99.8, f"calcular_total(exemplo) deveria ser 99.8, mas é {calcular_total(exemplo)}"
_r = validar_pedido({"itens": []})
assert _r == ["cliente é obrigatório", "itens não pode ser vazio"], f"Para {{'itens': []}} os erros deveriam ser ['cliente é obrigatório', 'itens não pode ser vazio'], mas foram {_r}"
_r = validar_pedido({"cliente": ""})
assert _r == ["cliente é obrigatório", "itens não pode ser vazio"], f"Cliente vazio e sem itens deveria gerar os dois erros, mas gerou {_r}"
_r = validar_pedido({"cliente": "Leo", "itens": [{"preco": 5, "quantidade": 1}, {"preco": 5, "quantidade": 0}, {"preco": 5}]})
assert _r == ["item 2: quantidade inválida", "item 3: quantidade inválida"], f"Os itens 2 (quantidade 0) e 3 (sem quantidade) são inválidos, mas os erros foram {_r}"`
    },
    {
      tipo: "criar",
      titulo: "API de agendamentos da clínica",
      enunciado: `Usando o simulador do FastAPI (já no código), crie duas rotas para os agendamentos da clínica:
        <ul>
          <li><code>@app.get("/agendamentos")</code> com a função <code>listar(medico=None)</code>: devolve a lista inteira ou, se <code>medico</code> for informado, só os agendamentos daquele médico;</li>
          <li><code>@app.delete("/agendamentos/{id}")</code> com a função <code>cancelar(id)</code>: remove o agendamento e devolve <code>{"ok": True, "id": id}</code>;
            se não existir, lança <code>HTTPException</code> com <code>status_code=404</code> e <code>detail="Agendamento não encontrado"</code>.</li>
        </ul>`,
      dica: `Filtro com list comprehension: <code>[a for a in agendamentos if a["medico"] == medico]</code>. Para remover: <code>agendamentos.remove(a)</code> dentro do <code>for</code>, seguido de <code>return</code>.`,
      lang: "python",
      notaVerificacao: "No FastAPI real, medico seria um query parameter: GET /agendamentos?medico=Dra.%20Paula.",
      inicial: SIM + c`
app = FastAPI()
agendamentos = [
    {"id": 1, "paciente": "Ana", "medico": "Dra. Paula", "horario": "09:00"},
    {"id": 2, "paciente": "Bruno", "medico": "Dr. Caio", "horario": "10:00"},
    {"id": 3, "paciente": "Carla", "medico": "Dra. Paula", "horario": "11:00"}
]

# Crie a rota GET /agendamentos -> listar(medico=None)
# Crie a rota DELETE /agendamentos/{id} -> cancelar(id), com 404 se não existir
`,
      solucao: SIM + c`
app = FastAPI()
agendamentos = [
    {"id": 1, "paciente": "Ana", "medico": "Dra. Paula", "horario": "09:00"},
    {"id": 2, "paciente": "Bruno", "medico": "Dr. Caio", "horario": "10:00"},
    {"id": 3, "paciente": "Carla", "medico": "Dra. Paula", "horario": "11:00"}
]

@app.get("/agendamentos")
def listar(medico: str | None = None):
    if medico is None:
        return agendamentos
    return [a for a in agendamentos if a["medico"] == medico]

@app.delete("/agendamentos/{id}")
def cancelar(id: int):
    for a in agendamentos:
        if a["id"] == id:
            agendamentos.remove(a)
            return {"ok": True, "id": id}
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")

print(listar("Dra. Paula"))`,
      teste: c`
assert ("GET", "/agendamentos") in app.rotas, 'Crie a rota com @app.get("/agendamentos").'
assert ("DELETE", "/agendamentos/{id}") in app.rotas, 'Crie a rota com @app.delete("/agendamentos/{id}").'
assert len(listar()) == 3, f"listar() sem filtro deveria devolver os 3 agendamentos, mas devolveu {len(listar())}"
_ids = [a["id"] for a in listar("Dra. Paula")]
assert _ids == [1, 3], f'listar("Dra. Paula") deveria devolver os ids [1, 3], mas devolveu {_ids}'
assert listar("Dr. Ninguém") == [], "Para um médico sem agendamentos, listar deveria devolver []."
assert cancelar(2) == {"ok": True, "id": 2}, 'cancelar(2) deveria devolver {"ok": True, "id": 2}.'
assert [a["id"] for a in agendamentos] == [1, 3], "Depois de cancelar(2), sobram os agendamentos 1 e 3."
try:
    cancelar(99)
    assert False, "cancelar(99) deveria lançar HTTPException."
except HTTPException as _e:
    assert _e.status_code == 404, f"O status_code deveria ser 404, mas é {_e.status_code}"
    assert _e.detail == "Agendamento não encontrado", f'O detail deveria ser "Agendamento não encontrado", mas é {_e.detail!r}'`
    }
  ]  ,
  p1: [
    {
      tipo: "completar",
      titulo: "Boas-vindas da padaria",
      enunciado: `A padaria quer mostrar uma mensagem quando o cliente chega. Clique em cada retângulo e escreva o que falta para o programa mostrar exatamente:<br><code>Bem-vindo à Padaria Pão Quente!</code>`,
      dica: `O comando que mostra algo na tela é o <code>print</code>.`,
      lang: "python",
      inicial: c`____("Bem-vindo à Padaria Pão Quente!")
`,
      solucao: c`print("Bem-vindo à Padaria Pão Quente!")`,
      teste: c`
assert "Bem-vindo à Padaria Pão Quente!" in __saida__, 'A tela deveria mostrar: Bem-vindo à Padaria Pão Quente!'`
    },
    {
      tipo: "completar",
      titulo: "Texto entre aspas",
      enunciado: `Clique em cada retângulo e escreva o que falta para mostrar a mensagem <code>Pedido recebido</code>. Lembre: texto vai entre aspas!`,
      dica: `Escreva o texto com aspas: <code>"Pedido recebido"</code>.`,
      lang: "python",
      inicial: c`print(____)
`,
      solucao: c`print("Pedido recebido")`,
      teste: c`
assert "Pedido recebido" in __saida__, 'A tela deveria mostrar: Pedido recebido'`
    },
    {
      tipo: "completar",
      titulo: "Lista de compras em ordem",
      enunciado: `Mostre a lista de compras, um item por linha, nesta ordem:<br><code>Arroz</code><br><code>Feijão</code><br><code>Leite</code><br>Clique em cada retângulo e escreva o que falta.`,
      dica: `Cada linha é um <code>print</code> com o texto entre aspas. A ordem das linhas é a ordem na tela.`,
      lang: "python",
      inicial: c`print("Arroz")
print(____)
____("Leite")
`,
      solucao: c`print("Arroz")
print("Feijão")
print("Leite")`,
      teste: c`
_l = [x.strip() for x in __saida__.strip().splitlines()]
assert _l == ["Arroz", "Feijão", "Leite"], f"A tela deveria mostrar Arroz, Feijão e Leite, um por linha, nessa ordem. Mostrou: {_l}"`
    },
    {
      tipo: "criar",
      titulo: "Seu cartão de visita",
      enunciado: `Escreva do zero um programa que mostre estas 2 linhas, exatamente assim:<br><code>Nome: Ana Lima</code><br><code>Cargo: Atendente</code>`,
      dica: `Use dois <code>print</code>, um para cada linha, com o texto entre aspas.`,
      lang: "python",
      inicial: c`# Mostre as duas linhas do cartão de visita com print
`,
      solucao: c`print("Nome: Ana Lima")
print("Cargo: Atendente")`,
      teste: c`
_l = [x.strip() for x in __saida__.strip().splitlines()]
assert "Nome: Ana Lima" in _l, 'Falta a linha: Nome: Ana Lima'
assert "Cargo: Atendente" in _l, 'Falta a linha: Cargo: Atendente'
assert _l.index("Nome: Ana Lima") < _l.index("Cargo: Atendente"), "A linha do nome deve vir antes da linha do cargo."`
    },
    {
      tipo: "criar",
      titulo: "Horário da loja",
      enunciado: `Escreva do zero um programa com:
        <ul>
          <li>um <b>comentário</b> (linha começando com <code>#</code>) dizendo o que o programa faz;</li>
          <li>três linhas na tela, nesta ordem: <code>Horário de funcionamento</code>, <code>Segunda a sexta: 8h às 18h</code> e <code>Sábado: 8h às 12h</code>.</li>
        </ul>`,
      dica: `Comentário: <code># meu recado</code>. Depois, um <code>print</code> por linha.`,
      lang: "python",
      inicial: c`# Escreva aqui um comentário seu e os 3 print do horário
`,
      solucao: c`# Mostra o horário da loja
print("Horário de funcionamento")
print("Segunda a sexta: 8h às 18h")
print("Sábado: 8h às 12h")`,
      padroes: [[/^\s*#/m, "Escreva um comentário começando com #."]],
      teste: c`
_l = [x.strip() for x in __saida__.strip().splitlines()]
_e = ["Horário de funcionamento", "Segunda a sexta: 8h às 18h", "Sábado: 8h às 12h"]
assert _l == _e, f"A tela deveria mostrar exatamente estas 3 linhas, nesta ordem: {_e}. Mostrou: {_l}"`
    }
  ],
  p2: [
    {
      tipo: "completar",
      titulo: "Conta dos pães",
      enunciado: `Um cliente levou 4 pães de R$ 2. Clique em cada retângulo e escreva o sinal que falta para o programa mostrar o total, <code>8</code>.`,
      dica: `Em Python, “vezes” é o asterisco.`,
      lang: "python",
      inicial: c`print(4 ____ 2)
`,
      solucao: c`print(4 * 2)`,
      padroes: [[/4\s*\*\s*2/, "Use o sinal de multiplicação entre 4 e 2."]],
      teste: c`
assert __saida__.strip() == "8", f"A tela deveria mostrar 8, mas mostrou {__saida__.strip()!r}"`
    },
    {
      tipo: "completar",
      titulo: "Troco do cliente",
      enunciado: `O cliente pagou com R$ 50 uma compra de R$ 32. Clique em cada retângulo e escreva o que falta para mostrar o troco (<code>18</code>) e depois quanto cada um de 3 amigos paga se dividirem R$ 30 (<code>10.0</code>).`,
      dica: `Subtrair é <code>-</code> e dividir é <code>/</code>.`,
      lang: "python",
      inicial: c`print(50 ____ 32)
print(30 ____ 3)
`,
      solucao: c`print(50 - 32)
print(30 / 3)`,
      padroes: [[/50\s*-\s*32/, "Use a subtração 50 - 32."], [/30\s*\/\s*3/, "Use a divisão 30 / 3."]],
      teste: c`
_l = __saida__.strip().splitlines()
assert _l == ["18", "10.0"], f"A tela deveria mostrar 18 e 10.0, um por linha. Mostrou: {_l}"`
    },
    {
      tipo: "completar",
      titulo: "Parênteses na hora certa",
      enunciado: `Dois cafés de R$ 3 e um suco de R$ 5 foram divididos por 2 pessoas. A conta certa é <code>(2 * 3 + 5) / 2</code>, que dá <code>5.5</code>. Clique em cada retângulo e escreva o que falta (os parênteses).`,
      dica: `Sem parênteses, o Python dividiria só o 5 por 2. Abra o parêntese antes do 2 e feche depois do 5.`,
      lang: "python",
      inicial: c`print(____2 * 3 + 5____ / 2)
`,
      solucao: c`print((2 * 3 + 5) / 2)`,
      teste: c`
assert __saida__.strip() == "5.5", f"A tela deveria mostrar 5.5, mas mostrou {__saida__.strip()!r}. Confira os parênteses."`
    },
    {
      tipo: "criar",
      titulo: "Compra na papelaria",
      enunciado: `Escreva do zero um programa que mostre, com um único <code>print</code>, o total de uma compra de <b>3 cadernos de R$ 12</b> mais <b>1 caneta de R$ 2</b>. O resultado na tela deve ser <code>38</code>. Escreva a conta (não escreva o 38 direto!).`,
      dica: `Multiplique a quantidade de cadernos pelo preço e some a caneta: <code>3 * 12 + ...</code>.`,
      lang: "python",
      inicial: c`# Mostre o total: 3 cadernos de R$ 12 + 1 caneta de R$ 2
`,
      solucao: c`print(3 * 12 + 2)`,
      padroes: [[/\*/, "Use a multiplicação (*) para calcular os cadernos."], [/\+/, "Use a soma (+) para incluir a caneta."]],
      teste: c`
assert __saida__.strip() == "38", f"A tela deveria mostrar 38, mas mostrou {__saida__.strip()!r}"`
    },
    {
      tipo: "criar",
      titulo: "Pizza dividida",
      enunciado: `Uma pizza custou R$ 40 e a entrega R$ 8. Quatro amigos vão dividir tudo igualmente. Escreva do zero <b>um</b> <code>print</code> com a conta que mostra quanto cada um paga. O resultado deve ser <code>12.0</code>.`,
      dica: `Some primeiro (use parênteses) e depois divida por 4.`,
      lang: "python",
      inicial: c`# Mostre quanto cada amigo paga: (pizza + entrega) dividido por 4
`,
      solucao: c`print((40 + 8) / 4)`,
      padroes: [[/\(/, "Use parênteses para somar antes de dividir."], [/\//, "Use a divisão (/)."]],
      teste: c`
assert __saida__.strip() == "12.0", f"A tela deveria mostrar 12.0, mas mostrou {__saida__.strip()!r}. Lembre de somar antes de dividir."`
    }
  ],
  p3: [
    {
      tipo: "completar",
      titulo: "Ficha do produto",
      enunciado: `Guarde os dados de um produto da mercearia em variáveis. Clique em cada retângulo e escreva o que falta:
        <ul>
          <li><code>produto</code> deve guardar o texto <code>"Café"</code>;</li>
          <li><code>preco</code> deve guardar o número <code>15</code>.</li>
        </ul>`,
      dica: `Texto vai entre aspas; número não.`,
      lang: "python",
      inicial: c`produto = ____
preco = ____
print(produto, preco)
`,
      solucao: c`produto = "Café"
preco = 15
print(produto, preco)`,
      teste: c`
assert produto == "Café", f'produto deveria ser "Café", mas é {produto!r}'
assert preco == 15, f"preco deveria ser o número 15, mas é {preco!r}"`
    },
    {
      tipo: "completar",
      titulo: "Mostrando o valor guardado",
      enunciado: `A variável <code>cliente</code> já guarda o nome. Clique em cada retângulo e escreva o que falta para a tela mostrar <code>Cliente: Rita</code> (o valor da variável, e não a palavra “cliente”).`,
      dica: `Para mostrar o valor, use o nome da variável <b>sem aspas</b>.`,
      lang: "python",
      inicial: c`cliente = "Rita"
print("Cliente:", ____)
`,
      solucao: c`cliente = "Rita"
print("Cliente:", cliente)`,
      padroes: [[/print\(\s*"Cliente:"\s*,\s*cliente\s*\)/, "Coloque a variável cliente (sem aspas) depois da vírgula."]],
      teste: c`
assert __saida__.strip() == "Cliente: Rita", f"A tela deveria mostrar Cliente: Rita, mas mostrou {__saida__.strip()!r}"`
    },
    {
      tipo: "completar",
      titulo: "Estoque que diminui",
      enunciado: `O estoque de bolos começa em <code>10</code>. Foram vendidos 3. Clique em cada retângulo e escreva o que falta para a variável <code>estoque</code> ficar com o valor novo (<code>7</code>), usando o valor atual dela.`,
      dica: `Pegue o valor atual e tire 3: <code>estoque = estoque - ...</code>.`,
      lang: "python",
      inicial: c`estoque = 10
estoque = ____ - 3
print("Bolos no estoque:", estoque)
`,
      solucao: c`estoque = 10
estoque = estoque - 3
print("Bolos no estoque:", estoque)`,
      padroes: [[/estoque\s*=\s*estoque\s*-\s*3/, "Use o valor atual: estoque = estoque - 3."]],
      teste: c`
assert estoque == 7, f"estoque deveria ser 7, mas é {estoque!r}"
assert "Bolos no estoque: 7" in __saida__, "A tela deveria mostrar: Bolos no estoque: 7"`
    },
    {
      tipo: "criar",
      titulo: "Total do carrinho",
      enunciado: `Crie do zero:
        <ul>
          <li><code>preco</code> com o valor <code>8</code>;</li>
          <li><code>quantidade</code> com o valor <code>5</code>;</li>
          <li><code>total</code> com a conta <code>preco * quantidade</code> (use as variáveis, não escreva 40);</li>
          <li>mostre na tela: <code>Total: 40</code>.</li>
        </ul>`,
      dica: `<code>print("Total:", total)</code> coloca um espaço entre o texto e o valor.`,
      lang: "python",
      inicial: c`# Crie preco, quantidade e total e mostre o total
`,
      solucao: c`preco = 8
quantidade = 5
total = preco * quantidade
print("Total:", total)`,
      padroes: [[/total\s*=\s*(preco\s*\*\s*quantidade|quantidade\s*\*\s*preco)/, "Calcule o total usando as variáveis: total = preco * quantidade."]],
      teste: c`
_g = globals()
for _n in ("preco", "quantidade", "total"):
    assert _n in _g, f"Crie a variável {_n}."
assert preco == 8, f"preco deveria ser 8, mas é {preco!r}"
assert quantidade == 5, f"quantidade deveria ser 5, mas é {quantidade!r}"
assert total == 40, f"total deveria ser 40, mas é {total!r}"
assert "Total: 40" in __saida__, "A tela deveria mostrar: Total: 40"`
    },
    {
      tipo: "criar",
      titulo: "Pontos do cartão fidelidade",
      enunciado: `Crie do zero a variável <code>pontos</code> começando em <code>0</code>. Depois:
        <ul>
          <li>o cliente ganhou 10 pontos: atualize <code>pontos</code> somando 10 ao valor atual;</li>
          <li>ganhou mais 5: some 5 ao valor atual;</li>
          <li>no fim, mostre na tela: <code>Pontos: 15</code>.</li>
        </ul>`,
      dica: `Use o valor atual para calcular o novo: <code>pontos = pontos + 10</code>.`,
      lang: "python",
      inicial: c`# Crie pontos = 0, some 10, depois some 5 e mostre o resultado
`,
      solucao: c`pontos = 0
pontos = pontos + 10
pontos = pontos + 5
print("Pontos:", pontos)`,
      padroes: [[/pontos\s*=\s*0/, "Comece com pontos = 0."], [/pontos\s*(=\s*pontos\s*\+|\+=)\s*10/, "Some 10 ao valor atual: pontos = pontos + 10."], [/pontos\s*(=\s*pontos\s*\+|\+=)\s*5/, "Some 5 ao valor atual: pontos = pontos + 5."]],
      teste: c`
assert pontos == 15, f"pontos deveria terminar em 15, mas é {pontos!r}"
assert "Pontos: 15" in __saida__, "A tela deveria mostrar: Pontos: 15"`
    }
  ],
  p4: [
    {
      tipo: "completar",
      titulo: "Perguntando o nome",
      enunciado: `O totem da lanchonete pergunta o nome do cliente. Clique em cada retângulo e escreva o que falta para ler o que a pessoa digitar e guardar em <code>nome</code>. (Para o teste, a pessoa digita <code>Lucas</code>.)`,
      dica: `O comando que pergunta e espera a pessoa digitar é o <code>input</code>.`,
      lang: "python",
      entrada: "Lucas",
      inicial: c`nome = ____("Qual é o seu nome? ")
print("Olá,", nome)
`,
      solucao: c`nome = input("Qual é o seu nome? ")
print("Olá,", nome)`,
      teste: c`
assert nome == "Lucas", f'nome deveria guardar o que foi digitado ("Lucas"), mas é {nome!r}'
assert "Olá, Lucas" in __saida__, "A tela deveria mostrar: Olá, Lucas"`
    },
    {
      tipo: "completar",
      titulo: "Convertendo a quantidade",
      enunciado: `O cliente digita quantos salgados quer (no teste, <code>4</code>). Como o <code>input</code> devolve texto, clique em cada retângulo e escreva o que falta para converter a resposta em número inteiro. A tela deve mostrar <code>Total: 20</code> (cada salgado custa R$ 5).`,
      dica: `Use <code>int(...)</code> em volta do <code>input</code>.`,
      lang: "python",
      entrada: "4",
      inicial: c`quantidade = ____(input("Quantos salgados? "))
total = quantidade * 5
print("Total:", total)
`,
      solucao: c`quantidade = int(input("Quantos salgados? "))
total = quantidade * 5
print("Total:", total)`,
      teste: c`
assert isinstance(quantidade, int), f"quantidade precisa ser número inteiro (use int), mas é {type(quantidade).__name__}"
assert total == 20, f"total deveria ser 20, mas é {total!r}"
assert "Total: 20" in __saida__, "A tela deveria mostrar: Total: 20"`
    },
    {
      tipo: "completar",
      titulo: "Somando dois números digitados",
      enunciado: `O programa lê dois números (no teste, <code>3</code> e <code>2</code>) e mostra a soma. Sem converter, aparece <code>32</code>! Clique em cada retângulo e escreva o que falta para a tela mostrar <code>Soma: 5</code>.`,
      dica: `Converta cada texto com <code>int()</code> antes de somar.`,
      lang: "python",
      entrada: "3\n2",
      inicial: c`a = ____(input("Primeiro número: "))
b = ____(input("Segundo número: "))
print("Soma:", a + b)
`,
      solucao: c`a = int(input("Primeiro número: "))
b = int(input("Segundo número: "))
print("Soma:", a + b)`,
      teste: c`
assert a == 3 and b == 2, f"a e b deveriam ser os números 3 e 2, mas são {a!r} e {b!r}"
assert "Soma: 5" in __saida__, "A tela deveria mostrar: Soma: 5"`
    },
    {
      tipo: "criar",
      titulo: "Dobro do número",
      enunciado: `Escreva do zero um programa que:
        <ul>
          <li>pergunte um número com <code>input</code> e guarde, já convertido com <code>int()</code>, na variável <code>numero</code>;</li>
          <li>mostre na tela: <code>Dobro: </code> seguido do dobro do número.</li>
        </ul>
        No teste, a pessoa digita <code>7</code>, então a tela deve mostrar <code>Dobro: 14</code>.`,
      dica: `<code>numero = int(input("Digite um número: "))</code> e depois <code>print("Dobro:", ...)</code>.`,
      lang: "python",
      entrada: "7",
      inicial: c`# Pergunte um número, converta com int() e mostre o dobro
`,
      solucao: c`numero = int(input("Digite um número: "))
print("Dobro:", numero * 2)`,
      padroes: [[/input\s*\(/, "Use input() para perguntar o número."], [/int\s*\(/, "Converta a resposta com int()."]],
      teste: c`
assert numero == 7, f"numero deveria ser o número 7 (convertido com int), mas é {numero!r}"
assert "Dobro: 14" in __saida__, "A tela deveria mostrar: Dobro: 14"`
    },
    {
      tipo: "criar",
      titulo: "Caixa da padaria",
      enunciado: `Escreva do zero o caixa da padaria:
        <ul>
          <li>pergunte o nome do cliente e guarde em <code>nome</code> (texto, sem converter);</li>
          <li>pergunte quantos pães e guarde em <code>paes</code>, convertido com <code>int()</code>;</li>
          <li>calcule <code>total</code> = <code>paes</code> vezes <code>2</code> (cada pão custa R$ 2);</li>
          <li>mostre na tela: <code>Cliente: </code> + nome e, na linha seguinte, <code>Total: </code> + total.</li>
        </ul>
        No teste, a pessoa digita <code>Marta</code> e <code>6</code>: a tela deve mostrar <code>Cliente: Marta</code> e <code>Total: 12</code>.`,
      dica: `Faça na ordem: pergunta (input), conta (total) e resposta (print).`,
      lang: "python",
      entrada: "Marta\n6",
      inicial: c`# 1. Pergunte o nome e a quantidade de pães
# 2. Calcule o total (cada pão custa 2)
# 3. Mostre Cliente: ... e Total: ...
`,
      solucao: c`nome = input("Nome do cliente: ")
paes = int(input("Quantos pães? "))
total = paes * 2
print("Cliente:", nome)
print("Total:", total)`,
      padroes: [[/int\s*\(\s*input/, "Converta a quantidade de pães com int(input(...))."]],
      teste: c`
assert nome == "Marta", f'nome deveria ser "Marta", mas é {nome!r}'
assert paes == 6, f"paes deveria ser o número 6, mas é {paes!r}"
assert total == 12, f"total deveria ser 12, mas é {total!r}"
assert "Cliente: Marta" in __saida__, "A tela deveria mostrar: Cliente: Marta"
assert "Total: 12" in __saida__, "A tela deveria mostrar: Total: 12"`
    }
  ]
};
