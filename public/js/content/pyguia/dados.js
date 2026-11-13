// Python de A a Z — Partes 8 a 10: gráficos (Matplotlib), Machine Learning e bancos de dados.
import { m, vf, l, c, comp, criar } from "./util.js";

const S8 = "8. Gráficos com Matplotlib";
const S9 = "9. Machine Learning (introdução)";
const S10 = "10. Python e bancos de dados";
const G = { graficos: true };

export default [
  {
    id: "mpl-pyplot", secao: S8, titulo: "Pyplot: linhas, marcadores, rótulos e grade",
    teoria: `
      <p><b>Matplotlib</b> é a biblioteca de gráficos mais usada em Python. Quase tudo fica no submódulo <code>pyplot</code>, importado como <code>plt</code>:</p>
      <pre><code>import matplotlib.pyplot as plt
meses = [1, 2, 3, 4]
vendas = [10, 25, 18, 30]
plt.plot(meses, vendas)     # gráfico de linha (x, y)
plt.show()                  # mostra (aqui no navegador, o gráfico aparece sozinho)</code></pre>
      <p>Para instalar no computador: <code>pip install matplotlib</code>. Ele trabalha muito bem com listas e com arrays do NumPy.</p>
      <!--pratica-->
      <h3>Marcadores, linhas e cores</h3>
      <pre><code>plt.plot(x, y, marker="o")                 # bolinhas nos pontos
plt.plot(x, y, "o:r")                      # atalho: marcador, linha pontilhada, vermelho
plt.plot(x, y, linestyle="--", linewidth=3, color="#4caf50")
plt.plot(x, y, "o")                        # só os pontos, sem linha</code></pre>
      <p>Marcadores: <code>o</code> <code>*</code> <code>.</code> <code>x</code> <code>s</code> (quadrado) <code>^</code>… Linhas: <code>-</code> sólida, <code>:</code> pontilhada, <code>--</code> tracejada, <code>-.</code>. Cores: <code>r</code> <code>g</code> <code>b</code> <code>k</code> (preto) ou hexadecimal.</p>
      <h3>Rótulos, título, legenda e grade</h3>
      <pre><code>plt.plot(meses, vendas, label="2024")
plt.plot(meses, [8, 20, 22, 26], label="2023")
plt.title("Vendas por mês")
plt.xlabel("Mês")
plt.ylabel("Vendas (mil R$)")
plt.legend()
plt.grid(axis="y", linestyle="--")</code></pre>`,
    exemplo: c`import matplotlib.pyplot as plt
meses = ["jan", "fev", "mar", "abr", "mai"]
plt.plot(meses, [12, 18, 15, 22, 30], "o-", label="Loja A")
plt.plot(meses, [10, 11, 19, 20, 24], "s--", label="Loja B")
plt.title("Vendas (mil R$)")
plt.xlabel("Mês")
plt.ylabel("Vendas")
plt.legend()
plt.grid(True)
plt.show()`,
    exemploOpcoes: G,
    perguntas: [
      m("Como se costuma importar o pyplot?", ["`import matplotlib.pyplot as plt`", "`import pyplot`", "`from matplotlib import *`", "`import plt`"], 0, "É a convenção usada em toda a documentação."),
      m("No atalho `\"o:r\"`, o que significa o `:`?", ["linha pontilhada", "linha sólida", "marcador quadrado", "cor vermelha"], 0, "`o` = bolinha, `:` = pontilhada, `r` = vermelho."),
      l("Complete para mostrar a legenda:", c`plt.plot(x, y, label="Vendas")
plt.____()`, ["legend"], "`plt.legend()` mostra os textos de `label`.")
    ],
    exercicios: [
      comp("Temperatura da semana", `Complete para desenhar a linha das temperaturas com marcador <code>"o"</code>, título <code>"Temperatura"</code> e rótulo do eixo Y <code>"°C"</code>.`, `<code>plt.plot(x, y, marker="o")</code>, <code>plt.title</code> e <code>plt.ylabel</code>.`,
        c`import matplotlib.pyplot as plt
dias = ["seg", "ter", "qua", "qui", "sex"]
temp = [28, 30, 27, 31, 29]
plt.____(dias, temp, marker="o")
plt.____("Temperatura")
plt.____("°C")
plt.show()`, c`import matplotlib.pyplot as plt
dias = ["seg", "ter", "qua", "qui", "sex"]
temp = [28, 30, 27, 31, 29]
plt.plot(dias, temp, marker="o")
plt.title("Temperatura")
plt.ylabel("°C")
plt.show()`, c`
import matplotlib.pyplot as _p
ax = _p.gcf().axes[0]
assert len(ax.lines) == 1, "Desenhe uma linha com plt.plot"
assert list(ax.lines[0].get_ydata()) == [28, 30, 27, 31, 29], "Use as temperaturas no eixo Y"
assert ax.lines[0].get_marker() == "o", "Use marker='o'"
assert ax.get_title() == "Temperatura" and ax.get_ylabel() == "°C", "Confira o título e o rótulo do eixo Y"`, G),
      criar("Comparando duas lojas", `Desenhe <b>duas linhas</b> (Loja A: <code>[5, 8, 12]</code>; Loja B: <code>[7, 6, 10]</code>; meses <code>[1, 2, 3]</code>), com <code>label</code> <code>"A"</code> e <code>"B"</code>, mostre a legenda e ligue a grade.`, `Chame <code>plt.plot</code> duas vezes, depois <code>plt.legend()</code> e <code>plt.grid(True)</code>.`,
        c`import matplotlib.pyplot as plt
`, c`import matplotlib.pyplot as plt
meses = [1, 2, 3]
plt.plot(meses, [5, 8, 12], label="A")
plt.plot(meses, [7, 6, 10], label="B")
plt.legend()
plt.grid(True)
plt.show()`, c`
import matplotlib.pyplot as _p
ax = _p.gcf().axes[0]
assert len(ax.lines) == 2, f"Deveria haver 2 linhas, há {len(ax.lines)}"
assert sorted(li.get_label() for li in ax.lines) == ["A", "B"], "Use label='A' e label='B'"
assert ax.get_legend() is not None, "Mostre a legenda com plt.legend()"
assert any(gl.get_visible() for gl in ax.get_xgridlines() + ax.get_ygridlines()), "Ligue a grade com plt.grid(True)"`, G)
    ]
  },
  {
    id: "mpl-subplot", secao: S8, titulo: "Subplots: vários gráficos juntos",
    teoria: `
      <p><code>plt.subplot(linhas, colunas, posição)</code> divide a figura em uma grade e escolhe onde desenhar:</p>
      <pre><code>plt.subplot(1, 2, 1)       # 1 linha, 2 colunas, 1º gráfico
plt.plot([1, 2, 3], [3, 1, 2])
plt.title("Vendas")

plt.subplot(1, 2, 2)       # 2º gráfico
plt.plot([1, 2, 3], [1, 4, 9])
plt.title("Clientes")

plt.suptitle("Painel do mês")   # título geral</code></pre>
      <!--pratica-->
      <p>Forma “orientada a objetos”, muito usada em projetos:</p>
      <pre><code>fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 3))
ax1.bar(["A", "B"], [3, 5])
ax2.plot([1, 2, 3], [2, 4, 3])
ax1.set_title("Barras")</code></pre>`,
    exemplo: c`import matplotlib.pyplot as plt
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 3))
ax1.plot([1, 2, 3, 4], [10, 14, 9, 16], "o-")
ax1.set_title("Vendas")
ax2.bar(["Pix", "Cartão", "Dinheiro"], [55, 35, 10])
ax2.set_title("Pagamentos (%)")
fig.suptitle("Painel da loja")
plt.show()`,
    exemploOpcoes: G,
    perguntas: [
      m("Em `plt.subplot(2, 3, 4)`, quantos gráficos cabem na figura?", ["6", "4", "2", "3"], 0, "2 linhas × 3 colunas = 6 posições; a 4ª está sendo usada."),
      m("Qual função põe um título geral na figura?", ["`plt.suptitle()`", "`plt.title()`", "`plt.header()`", "`plt.label()`"], 0, "`title()` é de cada gráfico; `suptitle()` é da figura toda.")
    ],
    exercicios: [
      criar("Painel com 2 gráficos", `Crie uma figura com <b>2 gráficos lado a lado</b> (1 linha, 2 colunas): à esquerda uma linha com <code>[1, 3, 2]</code> e título <code>"Linha"</code>; à direita, barras com categorias <code>["x", "y"]</code> e valores <code>[4, 6]</code> e título <code>"Barras"</code>.`, `<code>plt.subplot(1, 2, 1)</code> … <code>plt.subplot(1, 2, 2)</code>, ou <code>plt.subplots(1, 2)</code>.`,
        c`import matplotlib.pyplot as plt
`, c`import matplotlib.pyplot as plt
plt.subplot(1, 2, 1)
plt.plot([1, 3, 2])
plt.title("Linha")
plt.subplot(1, 2, 2)
plt.bar(["x", "y"], [4, 6])
plt.title("Barras")
plt.show()`, c`
import matplotlib.pyplot as _p
axs = _p.gcf().axes
assert len(axs) == 2, f"A figura deveria ter 2 gráficos, tem {len(axs)}"
esq, dir = sorted(axs, key=lambda a: a.get_position().x0)
assert esq.get_title() == "Linha" and len(esq.lines) == 1, "À esquerda: uma linha com título 'Linha'"
assert dir.get_title() == "Barras" and len(dir.patches) == 2, "À direita: 2 barras com título 'Barras'"`, G)
    ]
  },
  {
    id: "mpl-tipos", secao: S8, titulo: "Dispersão, barras, histograma e pizza",
    teoria: `
      <pre><code>plt.scatter(x, y)                    # dispersão: pontos soltos
plt.scatter(x, y, c=cores, s=tamanhos, alpha=0.5)

plt.bar(categorias, valores)          # barras verticais
plt.barh(categorias, valores)         # barras horizontais
plt.bar(categorias, valores, color="orange", width=0.5)

plt.hist(dados, bins=10)              # histograma: frequência por faixa

plt.pie(valores, labels=nomes, autopct="%1.0f%%")   # pizza (com %)
plt.pie(valores, labels=nomes, explode=[0.1, 0, 0]) # destaca uma fatia</code></pre>
      <!--pratica-->
      <h3>Quando usar cada um</h3>
      <ul>
        <li><b>Linha</b>: evolução no tempo;</li>
        <li><b>Barras</b>: comparar categorias;</li>
        <li><b>Dispersão</b>: relação entre duas variáveis (ex.: idade × gasto);</li>
        <li><b>Histograma</b>: como os valores se distribuem;</li>
        <li><b>Pizza</b>: partes de um todo (use com poucas fatias).</li>
      </ul>`,
    exemplo: c`import matplotlib.pyplot as plt
import random
random.seed(1)
idades = [random.randint(18, 70) for _ in range(200)]
plt.subplot(1, 2, 1)
plt.hist(idades, bins=8, color="#5c6bc0")
plt.title("Idade dos clientes")
plt.subplot(1, 2, 2)
plt.pie([45, 30, 25], labels=["Pix", "Cartão", "Boleto"], autopct="%1.0f%%")
plt.title("Pagamentos")
plt.show()`,
    exemploOpcoes: G,
    perguntas: [
      m("Qual gráfico mostra a **frequência** de valores por faixa?", ["histograma (`plt.hist`)", "pizza (`plt.pie`)", "dispersão (`plt.scatter`)", "linha (`plt.plot`)"], 0, "O histograma conta quantos valores caem em cada faixa (bin)."),
      m("Qual função faz barras **horizontais**?", ["`plt.barh()`", "`plt.bar(horizontal=True)`", "`plt.hbar()`", "`plt.barras()`"], 0, "O `h` é de horizontal.")
    ],
    exercicios: [
      comp("Vendas por categoria", `Complete para desenhar um gráfico de <b>barras</b> com as categorias e as vendas.`, `<code>plt.bar(categorias, valores)</code>`,
        c`import matplotlib.pyplot as plt
categorias = ["Bebidas", "Doces", "Grãos"]
vendas = [120, 80, 150]
plt.____(categorias, ____)
plt.title("Vendas por categoria")
plt.show()`, c`import matplotlib.pyplot as plt
categorias = ["Bebidas", "Doces", "Grãos"]
vendas = [120, 80, 150]
plt.bar(categorias, vendas)
plt.title("Vendas por categoria")
plt.show()`, c`
import matplotlib.pyplot as _p
ax = _p.gcf().axes[0]
assert [round(b.get_height()) for b in ax.patches] == [120, 80, 150], "Desenhe as 3 barras com as vendas"`, G),
      criar("Pizza do orçamento", `Desenhe uma <b>pizza</b> com os gastos <code>[1500, 600, 400]</code> e os rótulos <code>["Aluguel", "Mercado", "Lazer"]</code>, mostrando a porcentagem (<code>autopct="%1.0f%%"</code>).`, `<code>plt.pie(valores, labels=..., autopct=...)</code>`,
        c`import matplotlib.pyplot as plt
`, c`import matplotlib.pyplot as plt
plt.pie([1500, 600, 400], labels=["Aluguel", "Mercado", "Lazer"], autopct="%1.0f%%")
plt.show()`, c`
import matplotlib.pyplot as _p
ax = _p.gcf().axes[0]
textos = [t.get_text() for t in ax.texts]
assert len(ax.patches) == 3, "A pizza deveria ter 3 fatias"
for r in ["Aluguel", "Mercado", "Lazer"]:
    assert r in textos, f"Falta o rótulo {r}"
assert "60%" in textos, "Mostre a porcentagem com autopct (Aluguel = 60%)"`, G),
      criar("Idade × gasto", `Desenhe um gráfico de <b>dispersão</b> com <code>idades = [22, 35, 41, 29, 55]</code> no eixo X e <code>gastos = [150, 320, 410, 200, 380]</code> no Y. Rotule os eixos como <code>"Idade"</code> e <code>"Gasto"</code>.`, `<code>plt.scatter(x, y)</code>, <code>plt.xlabel</code>, <code>plt.ylabel</code>.`,
        c`import matplotlib.pyplot as plt
`, c`import matplotlib.pyplot as plt
idades = [22, 35, 41, 29, 55]
gastos = [150, 320, 410, 200, 380]
plt.scatter(idades, gastos)
plt.xlabel("Idade")
plt.ylabel("Gasto")
plt.show()`, c`
import matplotlib.pyplot as _p
ax = _p.gcf().axes[0]
assert len(ax.collections) == 1, "Use plt.scatter"
pts = ax.collections[0].get_offsets().tolist()
assert [list(map(round, p)) for p in pts] == [[22, 150], [35, 320], [41, 410], [29, 200], [55, 380]], "Confira os pontos"
assert ax.get_xlabel() == "Idade" and ax.get_ylabel() == "Gasto", "Rotule os eixos"`, G)
    ]
  },
  {
    id: "ml-intro", secao: S9, titulo: "Primeiros passos: média, mediana e moda",
    teoria: `
      <p><b>Machine Learning</b> (aprendizado de máquina) é fazer o computador <b>aprender com dados</b> para prever ou classificar coisas (ex.: prever o preço de um imóvel, detectar fraude, recomendar produtos). Tudo começa entendendo os dados com estatística.</p>
      <h3>Tipos de dados</h3>
      <ul>
        <li><b>Numéricos</b>: <i>discretos</i> (contagens: 3 filhos) ou <i>contínuos</i> (medidas: 1,72 m);</li>
        <li><b>Categóricos</b>: categorias sem número (cor, cidade);</li>
        <li><b>Ordinais</b>: categorias com ordem (P, M, G; notas A, B, C).</li>
      </ul>
      <!--pratica-->
      <h3>Medidas de centro</h3>
      <ul>
        <li><b>Média</b>: soma ÷ quantidade;</li>
        <li><b>Mediana</b>: o valor do meio, com os dados ordenados (não é afetada por valores extremos);</li>
        <li><b>Moda</b>: o valor que mais aparece.</li>
      </ul>
      <pre><code>import statistics
velocidades = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
statistics.mean(velocidades)     # 89.77
statistics.median(velocidades)   # 87
statistics.mode(velocidades)     # 86

import numpy as np                # o mesmo com NumPy
np.mean(velocidades), np.median(velocidades)</code></pre>
      <p>💼 Em salários, a <b>mediana</b> costuma representar melhor “o típico” do que a média, porque poucos salários altíssimos puxam a média para cima.</p>`,
    exemplo: c`import statistics as st
salarios = [2500, 2800, 3000, 3200, 3100, 2900, 45000]
print("Média:", round(st.mean(salarios), 2))
print("Mediana:", st.median(salarios))
tamanhos = ["M", "G", "M", "P", "M", "G"]
print("Moda:", st.mode(tamanhos))`,
    perguntas: [
      m("Qual medida **não** é afetada por um valor muito extremo?", ["mediana", "média", "soma", "nenhuma"], 0, "A mediana só olha o valor do meio."),
      m("A moda de `[3, 5, 5, 7, 5, 3]` é…", ["5", "3", "4.67", "7"], 0, "5 aparece 3 vezes."),
      vf("Tamanho de roupa (P, M, G) é um dado ordinal.", true, "São categorias com uma ordem natural.")
    ],
    exercicios: [
      comp("Resumo das notas", `Complete com as funções do módulo <code>statistics</code> para calcular média, mediana e moda.`, `<code>mean</code>, <code>median</code>, <code>mode</code>.`,
        c`import statistics
notas = [7, 8, 8, 6, 10, 8, 5]
media = statistics.____(notas)
mediana = statistics.____(notas)
moda = statistics.____(notas)
print(media, mediana, moda)`, c`import statistics
notas = [7, 8, 8, 6, 10, 8, 5]
media = statistics.mean(notas)
mediana = statistics.median(notas)
moda = statistics.mode(notas)
print(media, mediana, moda)`, c`
assert abs(media - 7.428571) < 1e-4, f"media deveria ser ~7.43, deu {media}"
assert mediana == 8 and moda == 8, f"mediana e moda deveriam ser 8 (deu {mediana} e {moda})"`),
      criar("Média sem biblioteca", `Sem importar nada, crie <code>media(valores)</code> e <code>mediana(valores)</code>. Na mediana, ordene os valores; se a quantidade for par, a mediana é a média dos dois do meio.`, `<code>s = sorted(valores)</code>; o meio é <code>len(s) // 2</code>.`,
        c`def media(valores):
    pass

def mediana(valores):
    pass
`, c`def media(valores):
    return sum(valores) / len(valores)

def mediana(valores):
    s = sorted(valores)
    n = len(s)
    meio = n // 2
    if n % 2 == 1:
        return s[meio]
    return (s[meio - 1] + s[meio]) / 2`, c`
assert media([2, 4, 6]) == 4, "media([2, 4, 6]) = 4"
assert mediana([5, 1, 3]) == 3, "mediana([5, 1, 3]) = 3"
assert mediana([4, 1, 3, 2]) == 2.5, f"mediana([4, 1, 3, 2]) = 2.5, deu {mediana([4, 1, 3, 2])}"
assert "statistics" not in dir() and "np" not in dir(), "Faça sem importar bibliotecas"`)
    ]
  },
  {
    id: "ml-dispersao", secao: S9, titulo: "Desvio padrão, variância e percentis",
    teoria: `
      <p>Saber o centro não basta: dois grupos com a mesma média podem ser bem diferentes. As medidas de <b>dispersão</b> dizem o quanto os dados se espalham.</p>
      <ul>
        <li><b>Variância</b>: média dos quadrados das distâncias até a média;</li>
        <li><b>Desvio padrão</b>: raiz da variância, na mesma unidade dos dados. Pequeno = valores próximos da média.</li>
      </ul>
      <pre><code>import numpy as np
a = [86, 87, 88, 86, 87, 85, 86]
b = [32, 111, 138, 28, 59, 77, 97]
np.std(a)    # ~0.9  (bem concentrados)
np.std(b)    # ~37.8 (muito espalhados)
np.var(b)    # variância</code></pre>
      <!--pratica-->
      <h3>Percentis</h3>
      <p>O percentil <i>p</i> é o valor abaixo do qual estão <i>p</i>% dos dados. O percentil 50 é a mediana; 25 e 75 são os quartis.</p>
      <pre><code>idades = [5, 31, 43, 48, 50, 41, 7, 11, 15, 39, 80, 82, 32, 2, 8, 6, 25, 36, 27, 61, 31]
np.percentile(idades, 75)   # 43.0 → 75% das pessoas têm 43 anos ou menos</code></pre>
      <p>ℹ️ <code>np.std</code> calcula o desvio da população; <code>statistics.stdev</code> calcula o da amostra (divide por n − 1). Use <code>statistics.pstdev</code> para o da população.</p>`,
    exemplo: c`import numpy as np
entregas_a = [30, 32, 29, 31, 30, 33]
entregas_b = [10, 55, 20, 48, 15, 32]
for nome, t in [("A", entregas_a), ("B", entregas_b)]:
    print(nome, "média:", round(np.mean(t), 1), "desvio:", round(np.std(t), 1))
print("90% das entregas de B em até", np.percentile(entregas_b, 90), "min")`,
    perguntas: [
      m("Um desvio padrão **pequeno** indica que…", ["os valores estão perto da média", "a média é pequena", "há poucos dados", "os dados estão errados"], 0, "Desvio pequeno = dados concentrados."),
      m("O percentil 50 é igual a…", ["mediana", "média", "moda", "desvio padrão"], 0, "Metade dos dados está abaixo dele.")
    ],
    exercicios: [
      comp("Qual vendedor é mais constante?", `Complete com as funções do NumPy para calcular o desvio padrão de cada vendedor.`, `<code>np.std(lista)</code>`,
        c`import numpy as np
ana = [100, 102, 98, 101, 99]
bia = [60, 140, 90, 130, 80]
desvio_ana = np.____(ana)
desvio_bia = np.____(bia)
mais_constante = "Ana" if desvio_ana < desvio_bia else "Bia"
print(mais_constante)`, c`import numpy as np
ana = [100, 102, 98, 101, 99]
bia = [60, 140, 90, 130, 80]
desvio_ana = np.std(ana)
desvio_bia = np.std(bia)
mais_constante = "Ana" if desvio_ana < desvio_bia else "Bia"
print(mais_constante)`, c`
assert abs(desvio_ana - 1.4142) < 1e-3, f"desvio_ana deveria ser ~1.41, deu {desvio_ana}"
assert abs(desvio_bia - 30.33) < 1e-2, f"desvio_bia deveria ser ~30.33, deu {desvio_bia}"
assert mais_constante == "Ana", "Ana é a mais constante"`),
      criar("Desvio padrão na mão", `Sem bibliotecas, crie <code>desvio(valores)</code>: calcule a média, a média dos quadrados das diferenças (variância) e devolva a raiz (<code>** 0.5</code>). Ex.: <code>desvio([2, 4, 4, 4, 5, 5, 7, 9])</code> → 2.0.`, `<code>var = sum((x - m) ** 2 for x in valores) / len(valores)</code>`,
        c`def desvio(valores):
    pass
`, c`def desvio(valores):
    m = sum(valores) / len(valores)
    var = sum((x - m) ** 2 for x in valores) / len(valores)
    return var ** 0.5`, c`
assert abs(desvio([2, 4, 4, 4, 5, 5, 7, 9]) - 2.0) < 1e-9, f"Deu {desvio([2, 4, 4, 4, 5, 5, 7, 9])}"
assert desvio([5, 5, 5]) == 0, "Valores iguais: desvio 0"`),
      criar("Percentil 90 do tempo de resposta", `Com NumPy, crie <code>p90(tempos)</code> que devolve o percentil 90 da lista (é uma métrica muito usada para medir sistemas).`, `<code>np.percentile(tempos, 90)</code>`,
        c`import numpy as np
`, c`import numpy as np

def p90(tempos):
    return np.percentile(tempos, 90)`, c`
assert abs(p90(list(range(1, 11))) - 9.1) < 1e-9, f"p90(1..10) deveria ser 9.1, deu {p90(list(range(1, 11)))}"
assert p90([100] * 5) == 100, "Valores iguais: o próprio valor"`)
    ]
  },
  {
    id: "ml-distribuicao", secao: S9, titulo: "Distribuição de dados, distribuição normal e dispersão",
    teoria: `
      <p>Para testar algoritmos, criamos dados de mentira com o NumPy:</p>
      <pre><code>import numpy as np
uniforme = np.random.uniform(0.0, 5.0, 250)   # 250 valores entre 0 e 5, todos igualmente prováveis
normal = np.random.normal(5.0, 1.0, 100000)   # média 5, desvio 1: a curva “de sino”</code></pre>
      <p>Num <b>histograma</b>, a uniforme fica “retinha” e a normal forma um sino: a maioria dos valores perto da média e poucos nas pontas. Muitas coisas reais seguem a normal (altura, erros de medida).</p>
      <!--pratica-->
      <h3>Regra 68–95–99,7</h3>
      <p>Na distribuição normal, ~68% dos valores ficam a 1 desvio da média, ~95% a 2 desvios e ~99,7% a 3 desvios.</p>
      <h3>Gráfico de dispersão</h3>
      <p>Mostra a relação entre duas variáveis. Ex.: idade do carro × velocidade. Se os pontos formam uma “linha”, há <b>correlação</b>, e aí uma regressão pode prever valores (próxima lição).</p>
      <pre><code>x = np.random.normal(5.0, 1.0, 1000)
y = np.random.normal(10.0, 2.0, 1000)
plt.scatter(x, y)</code></pre>
      <p>💡 <code>np.random.seed(42)</code> faz os números “aleatórios” se repetirem sempre iguais, o que ajuda a reproduzir experimentos.</p>`,
    exemplo: c`import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)
alturas = np.random.normal(170, 8, 5000)
plt.hist(alturas, bins=40)
plt.title("Alturas (cm): distribuição normal")
plt.show()
dentro = np.mean((alturas > 162) & (alturas < 178))
print(f"Dentro de 1 desvio: {dentro:.0%}")`,
    exemploOpcoes: G,
    perguntas: [
      m("Qual função gera dados com distribuição normal?", ["`np.random.normal()`", "`np.random.uniform()`", "`np.random.seed()`", "`np.random.normalize()`"], 0, "`normal(média, desvio, quantidade)`."),
      m("Na distribuição normal, cerca de quantos % dos valores ficam a até 2 desvios da média?", ["95%", "68%", "50%", "100%"], 0, "É a regra 68–95–99,7.")
    ],
    exercicios: [
      comp("Simulando alturas", `Complete para gerar 1000 alturas com média 170 e desvio 10 (com semente 1) e desenhar o histograma com 20 faixas.`, `<code>np.random.normal(média, desvio, quantidade)</code> e <code>plt.hist(dados, bins=20)</code>.`,
        c`import numpy as np
import matplotlib.pyplot as plt
np.random.seed(1)
alturas = np.random.____(170, 10, ____)
plt.hist(alturas, bins=____)
plt.show()`, c`import numpy as np
import matplotlib.pyplot as plt
np.random.seed(1)
alturas = np.random.normal(170, 10, 1000)
plt.hist(alturas, bins=20)
plt.show()`, c`
assert len(alturas) == 1000, "Gere 1000 valores"
assert 168 < alturas.mean() < 172 and 9 < alturas.std() < 11, "Use média 170 e desvio 10"
import matplotlib.pyplot as _p
assert len(_p.gcf().axes[0].patches) == 20, "O histograma deveria ter 20 faixas (bins=20)"`, G),
      criar("Quantos dentro do intervalo?", `Crie <code>fracao_entre(valores, a, b)</code> que devolve a fração (de 0 a 1) dos valores que estão <b>entre a e b</b> (inclusive). Funciona com listas ou arrays do NumPy.`, `Conte com <code>sum(1 for v in valores if a &lt;= v &lt;= b)</code> e divida por <code>len(valores)</code>.`,
        c``, c`def fracao_entre(valores, a, b):
    return sum(1 for v in valores if a <= v <= b) / len(valores)`, c`
assert fracao_entre([1, 2, 3, 4], 2, 3) == 0.5, "2 de 4 valores: 0.5"
import numpy as np
np.random.seed(0)
d = np.random.normal(0, 1, 20000)
assert abs(fracao_entre(d, -1, 1) - 0.68) < 0.02, "Num normal padrão, ~68% ficam entre -1 e 1"`)
    ]
  },
  {
    id: "ml-regressao", secao: S9, titulo: "Regressão linear e polinomial",
    teoria: `
      <p><b>Regressão</b> encontra a relação entre variáveis para <b>prever</b> valores. A <b>regressão linear</b> traça a reta que melhor passa pelos pontos: <code>y = a·x + b</code>.</p>
      <pre><code>import numpy as np
idade_carro = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
velocidade = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
a, b = np.polyfit(idade_carro, velocidade, 1)   # grau 1 = reta
previsao = a * 10 + b                            # velocidade de um carro de 10 anos
r = np.corrcoef(idade_carro, velocidade)[0, 1]   # correlação de -1 a 1</code></pre>
      <p>O <b>coeficiente de correlação r</b> mostra a força da relação: perto de 1 ou −1 = forte; perto de 0 = fraca (a reta não serve para prever).</p>
      <!--pratica-->
      <h3>Regressão polinomial</h3>
      <p>Quando os pontos fazem uma <b>curva</b>, use um polinômio de grau maior:</p>
      <pre><code>modelo = np.poly1d(np.polyfit(x, y, 3))   # grau 3
modelo(17)                                  # previsão para x = 17</code></pre>
      <p>Para medir o quanto o modelo explica os dados, use o <b>R²</b> (de 0 a 1). Na prática profissional, usa-se o <b>scikit-learn</b> (<code>from sklearn.linear_model import LinearRegression</code>) ou o <code>scipy.stats.linregress</code>.</p>`,
    exemplo: c`import numpy as np
import matplotlib.pyplot as plt
metros = [40, 55, 60, 72, 85, 100, 120]
preco = [210, 260, 300, 330, 400, 470, 560]   # mil R$
a, b = np.polyfit(metros, preco, 1)
print(f"preço ≈ {a:.2f} x metros + {b:.1f}")
print("Previsão para 90 m²:", round(a * 90 + b), "mil")
print("Correlação:", round(np.corrcoef(metros, preco)[0, 1], 3))
plt.scatter(metros, preco)
plt.plot(metros, [a * x + b for x in metros], "r")
plt.show()`,
    exemploOpcoes: G,
    perguntas: [
      m("Em `np.polyfit(x, y, 1)`, o `1` significa…", ["grau 1: uma reta", "1 previsão", "1% de erro", "usar só o 1º ponto"], 0, "Grau 1 = reta; grau 2 = parábola; etc."),
      m("Uma correlação `r = 0.02` indica…", ["relação muito fraca", "relação muito forte", "relação negativa forte", "erro no cálculo"], 0, "Perto de zero = quase nenhuma relação linear.")
    ],
    exercicios: [
      comp("Prevendo vendas pela publicidade", `Complete para ajustar uma reta (grau 1) entre o gasto em anúncios e as vendas, e prever as vendas para um gasto de 6.`, `<code>np.polyfit(x, y, 1)</code> devolve <code>a</code> e <code>b</code>.`,
        c`import numpy as np
anuncios = [1, 2, 3, 4, 5]
vendas = [12, 14, 16, 18, 20]
a, b = np.polyfit(anuncios, vendas, ____)
previsao = a * ____ + b
print(round(previsao, 1))`, c`import numpy as np
anuncios = [1, 2, 3, 4, 5]
vendas = [12, 14, 16, 18, 20]
a, b = np.polyfit(anuncios, vendas, 1)
previsao = a * 6 + b
print(round(previsao, 1))`, c`
assert abs(a - 2) < 1e-6 and abs(b - 10) < 1e-6, f"A reta deveria ser 2x + 10 (deu {a:.2f}x + {b:.2f})"
assert abs(previsao - 22) < 1e-6, f"previsao deveria ser 22, deu {previsao}"`),
      criar("Reta na mão (mínimos quadrados)", `Sem NumPy, crie <code>reta(x, y)</code> que devolve <code>(a, b)</code> da reta <code>y = a·x + b</code>: <code>a = Σ((xi − mx)(yi − my)) / Σ((xi − mx)²)</code> e <code>b = my − a·mx</code> (mx e my são as médias).`, `Calcule as médias, depois as duas somas com <code>zip(x, y)</code>.`,
        c`def reta(x, y):
    pass
`, c`def reta(x, y):
    mx = sum(x) / len(x)
    my = sum(y) / len(y)
    num = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y))
    den = sum((xi - mx) ** 2 for xi in x)
    a = num / den
    b = my - a * mx
    return a, b`, c`
a, b = reta([1, 2, 3, 4, 5], [12, 14, 16, 18, 20])
assert abs(a - 2) < 1e-9 and abs(b - 10) < 1e-9, f"Esperava (2, 10), deu ({a}, {b})"
a, b = reta([0, 1, 2], [1, 2, 4])
assert abs(a - 1.5) < 1e-9 and abs(b - 0.8333333) < 1e-6, f"Para (0,1),(1,2),(2,4) esperava (1.5, 0.833), deu ({a}, {b})"`),
      criar("Curva de grau 2", `Os dados <code>x = [0, 1, 2, 3, 4]</code> e <code>y = [1, 2, 5, 10, 17]</code> seguem uma parábola. Use <code>np.poly1d(np.polyfit(x, y, 2))</code> para criar <code>modelo</code> e guarde em <code>previsao</code> o valor para x = 5 (deve ser 26).`, `Grau 2 no polyfit.`,
        c`import numpy as np
x = [0, 1, 2, 3, 4]
y = [1, 2, 5, 10, 17]
`, c`import numpy as np
x = [0, 1, 2, 3, 4]
y = [1, 2, 5, 10, 17]
modelo = np.poly1d(np.polyfit(x, y, 2))
previsao = modelo(5)
print(previsao)`, c`
assert abs(previsao - 26) < 1e-6, f"previsao deveria ser 26, deu {previsao}"
assert modelo.order == 2, "O modelo deveria ser de grau 2"`)
    ]
  },
  {
    id: "ml-modelos", secao: S9, titulo: "Regressão múltipla, escala e treino/teste",
    teoria: `
      <h3>Regressão múltipla</h3>
      <p>Usa <b>várias</b> variáveis para prever uma: o CO₂ de um carro pelo <b>peso</b> e pelo <b>volume do motor</b>. Com scikit-learn:</p>
      <pre><code>from sklearn import linear_model
X = df[["peso", "volume"]]
y = df["co2"]
modelo = linear_model.LinearRegression().fit(X, y)
modelo.predict([[2300, 1300]])
modelo.coef_     # quanto cada variável pesa</code></pre>
      <h3>Escala (padronização)</h3>
      <p>Variáveis em unidades diferentes (kg × litros) atrapalham a comparação. A <b>padronização (z-score)</b> põe todas na mesma escala: <code>z = (x − média) / desvio</code>. No scikit-learn: <code>StandardScaler().fit_transform(X)</code>.</p>
      <!--pratica-->
      <h3>Treino e teste</h3>
      <p>Para saber se o modelo funciona com dados <b>novos</b>, separe os dados: ~80% para <b>treinar</b> e ~20% para <b>testar</b>. Se ele acerta muito no treino e pouco no teste, está <b>decorando</b> (<i>overfitting</i>).</p>
      <pre><code>treino_x, teste_x = x[:80], x[80:]
treino_y, teste_y = y[:80], y[80:]
# ou: from sklearn.model_selection import train_test_split</code></pre>
      <p>Técnicas relacionadas: <b>validação cruzada</b> (treinar e testar várias vezes em partes diferentes), <b>grid search</b> (testar várias configurações e ficar com a melhor) e <b>bootstrap/bagging</b> (treinar vários modelos em amostras sorteadas e combiná-los).</p>`,
    exemplo: c`import numpy as np
np.random.seed(2)
x = np.random.normal(3, 1, 100)
y = 2 * x + np.random.normal(0, 0.5, 100)
treino_x, teste_x = x[:80], x[80:]
treino_y, teste_y = y[:80], y[80:]
a, b = np.polyfit(treino_x, treino_y, 1)
erro = np.mean(np.abs((a * teste_x + b) - teste_y))
print(f"Modelo: y = {a:.2f}x + {b:.2f} | erro médio no teste: {erro:.2f}")`,
    perguntas: [
      m("Por que separar dados de treino e de teste?", ["Para medir o desempenho com dados que o modelo não viu", "Para treinar mais rápido", "Porque o NumPy exige", "Para ter menos dados"], 0, "O teste simula dados novos do mundo real."),
      m("Overfitting é quando o modelo…", ["vai muito bem no treino e mal no teste (decorou)", "vai mal no treino", "usa poucas variáveis", "tem escala diferente"], 0, "Ele aprendeu os detalhes do treino em vez do padrão geral.")
    ],
    exercicios: [
      criar("Padronizando (z-score)", `Crie <code>padronizar(valores)</code> que devolve uma lista com <code>(x − média) / desvio</code> de cada valor (desvio da população, como <code>np.std</code>), arredondado com 2 casas.`, `Calcule média e desvio uma vez, depois uma compreensão de lista.`,
        c`def padronizar(valores):
    pass
`, c`def padronizar(valores):
    m = sum(valores) / len(valores)
    d = (sum((x - m) ** 2 for x in valores) / len(valores)) ** 0.5
    return [round((x - m) / d, 2) for x in valores]`, c`
assert padronizar([2, 4, 4, 4, 5, 5, 7, 9]) == [-1.5, -0.5, -0.5, -0.5, 0.0, 0.0, 1.0, 2.0], f"Deu {padronizar([2, 4, 4, 4, 5, 5, 7, 9])}"`),
      criar("Separando treino e teste", `Crie <code>separar(dados, proporcao=0.8)</code> que devolve <code>(treino, teste)</code>: os primeiros <code>int(len(dados) * proporcao)</code> itens no treino e o resto no teste.`, `Fatiamento: <code>dados[:corte]</code> e <code>dados[corte:]</code>.`,
        c`def separar(dados, proporcao=0.8):
    pass
`, c`def separar(dados, proporcao=0.8):
    corte = int(len(dados) * proporcao)
    return dados[:corte], dados[corte:]`, c`
tr, te = separar(list(range(10)))
assert tr == list(range(8)) and te == [8, 9], f"Deu {tr} e {te}"
tr, te = separar([1, 2, 3, 4], 0.5)
assert tr == [1, 2] and te == [3, 4], "Com 0.5, metade para cada"`)
    ]
  },
  {
    id: "ml-classificacao", secao: S9, titulo: "Classificação: árvore de decisão, KNN, matriz de confusão",
    teoria: `
      <p>Na <b>classificação</b>, o modelo escolhe uma <b>categoria</b> (spam/não spam, aprovado/negado, fraude/ok).</p>
      <ul>
        <li><b>Árvore de decisão</b>: uma sequência de perguntas “sim/não” aprendidas dos dados (“renda &gt; 5000?” → “tem dívidas?” → aprova). Fácil de explicar. <code>sklearn.tree.DecisionTreeClassifier</code>.</li>
        <li><b>Regressão logística</b>: apesar do nome, classifica em duas classes, dando uma <b>probabilidade</b> de 0 a 1.</li>
        <li><b>KNN (k vizinhos mais próximos)</b>: olha os <i>k</i> exemplos mais parecidos e escolhe a classe mais comum entre eles.</li>
      </ul>
      <!--pratica-->
      <h3>Avaliando: matriz de confusão</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th></th><th>Previu positivo</th><th>Previu negativo</th></tr></thead><tbody>
        <tr><th>Era positivo</th><td>VP (verdadeiro positivo)</td><td>FN (falso negativo)</td></tr>
        <tr><th>Era negativo</th><td>FP (falso positivo)</td><td>VN (verdadeiro negativo)</td></tr>
      </tbody></table>
      <ul>
        <li><b>Acurácia</b> = (VP + VN) / total;</li>
        <li><b>Precisão</b> = VP / (VP + FP): dos que eu disse “sim”, quantos eram?</li>
        <li><b>Recall (sensibilidade)</b> = VP / (VP + FN): dos que eram “sim”, quantos eu achei?</li>
      </ul>
      <p>A <b>curva ROC</b> e a <b>AUC</b> avaliam o modelo em todos os limites de decisão (AUC 1 = perfeito; 0,5 = chute).</p>
      <h3>Dados categóricos</h3>
      <p>Modelos só entendem números. Categorias como “cidade” viram colunas 0/1 (<b>one-hot encoding</b>): <code>pd.get_dummies(df["cidade"])</code>.</p>`,
    exemplo: c`reais =    [1, 0, 1, 1, 0, 0, 1, 0, 1, 0]
previstos = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0]
vp = sum(1 for r, p in zip(reais, previstos) if r == 1 and p == 1)
vn = sum(1 for r, p in zip(reais, previstos) if r == 0 and p == 0)
fp = sum(1 for r, p in zip(reais, previstos) if r == 0 and p == 1)
fn = sum(1 for r, p in zip(reais, previstos) if r == 1 and p == 0)
print("VP VN FP FN:", vp, vn, fp, fn)
print("Acurácia:", (vp + vn) / len(reais))`,
    perguntas: [
      m("No KNN com k = 3, como o modelo decide a classe de um ponto novo?", ["Pela classe mais comum entre os 3 vizinhos mais próximos", "Pela média de todos os pontos", "Por sorteio", "Pela primeira linha dos dados"], 0, "Ele vota entre os k vizinhos."),
      m("Um falso negativo num exame médico significa…", ["a pessoa estava doente e o teste disse que não", "a pessoa estava saudável e o teste disse doente", "o teste acertou", "o teste não rodou"], 0, "Era positivo, mas previu negativo."),
      vf("One-hot encoding transforma categorias em colunas de 0 e 1.", true, "Ex.: cidade = Natal vira natal=1, recife=0.")
    ],
    exercicios: [
      criar("Matriz de confusão", `Crie <code>matriz(reais, previstos)</code> que devolve o dicionário <code>{"vp": ..., "vn": ..., "fp": ..., "fn": ...}</code> (1 = positivo, 0 = negativo).`, `Percorra com <code>zip(reais, previstos)</code> e conte cada caso.`,
        c`def matriz(reais, previstos):
    pass
`, c`def matriz(reais, previstos):
    m = {"vp": 0, "vn": 0, "fp": 0, "fn": 0}
    for r, p in zip(reais, previstos):
        if r == 1 and p == 1:
            m["vp"] += 1
        elif r == 0 and p == 0:
            m["vn"] += 1
        elif r == 0 and p == 1:
            m["fp"] += 1
        else:
            m["fn"] += 1
    return m`, c`
r = matriz([1, 0, 1, 1, 0, 0, 1, 0, 1, 0], [1, 0, 0, 1, 0, 1, 1, 0, 1, 0])
assert r == {"vp": 4, "vn": 4, "fp": 1, "fn": 1}, f"Deu {r}"`),
      criar("KNN simples", `Crie <code>knn(pontos, novo, k)</code>: <code>pontos</code> é uma lista de <code>((x, y), classe)</code>. Calcule a distância de cada ponto até <code>novo</code> (<code>((x1−x2)² + (y1−y2)²) ** 0.5</code>), pegue os <code>k</code> mais próximos e devolva a classe mais frequente entre eles.`, `<code>sorted(pontos, key=lambda p: distancia(p[0], novo))[:k]</code> e depois conte as classes (pode usar <code>max(set(c), key=c.count)</code>).`,
        c`def knn(pontos, novo, k):
    pass
`, c`def knn(pontos, novo, k):
    def dist(a, b):
        return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5
    vizinhos = sorted(pontos, key=lambda p: dist(p[0], novo))[:k]
    classes = [classe for _, classe in vizinhos]
    return max(set(classes), key=classes.count)`, c`
dados = [((1, 1), "A"), ((1, 2), "A"), ((2, 1), "A"), ((8, 8), "B"), ((8, 9), "B"), ((9, 8), "B")]
assert knn(dados, (1.5, 1.5), 3) == "A", "(1.5, 1.5) está perto dos A"
assert knn(dados, (7, 7), 3) == "B", "(7, 7) está perto dos B"
assert knn([((0, 0), "A"), ((5, 5), "B"), ((6, 6), "B")], (1, 1), 1) == "A", "Com k = 1, vale o vizinho mais próximo"`)
    ]
  },
  {
    id: "ml-agrupamento", secao: S9, titulo: "Agrupamento: K-means e hierárquico",
    teoria: `
      <p>No <b>agrupamento</b> (clustering), não há resposta certa nos dados: o algoritmo descobre <b>grupos parecidos</b> sozinho (é aprendizado <i>não supervisionado</i>). Ex.: separar clientes por perfil de compra.</p>
      <h3>K-means</h3>
      <ol>
        <li>Escolha <i>k</i> (quantos grupos) e sorteie <i>k</i> centros;</li>
        <li>Coloque cada ponto no grupo do centro mais próximo;</li>
        <li>Mova cada centro para a média dos pontos do seu grupo;</li>
        <li>Repita os passos 2 e 3 até os centros pararem de mudar.</li>
      </ol>
      <p>Para escolher <i>k</i>, usa-se o <b>método do cotovelo</b>: testa vários valores e vê onde o ganho para de compensar.</p>
      <!--pratica-->
      <h3>Agrupamento hierárquico</h3>
      <p>Começa com cada ponto sozinho e vai <b>juntando</b> os grupos mais próximos, formando uma árvore (<b>dendrograma</b>). Não precisa escolher <i>k</i> antes: você “corta” a árvore na altura desejada.</p>
      <pre><code>from sklearn.cluster import KMeans
grupos = KMeans(n_clusters=2, n_init=10).fit_predict(dados)</code></pre>`,
    perguntas: [
      m("K-means é um exemplo de aprendizado…", ["não supervisionado", "supervisionado", "por reforço", "de regressão"], 0, "Não há rótulos: ele descobre os grupos sozinho."),
      m("No K-means, depois de agrupar os pontos, cada centro vai para…", ["a média dos pontos do grupo", "o ponto mais distante", "a origem (0, 0)", "um lugar sorteado de novo"], 0, "É por isso que se chama *k-means* (k médias).")
    ],
    exercicios: [
      criar("Um passo do K-means (1D)", `Crie <code>passo_kmeans(valores, centros)</code> para dados de <b>uma dimensão</b>: coloque cada valor no grupo do centro mais próximo e devolva a lista dos <b>novos centros</b> (a média de cada grupo, na mesma ordem dos centros; grupo vazio mantém o centro antigo).`, `Crie uma lista de grupos <code>[[] for _ in centros]</code>; para cada valor, ache o índice do centro mais próximo com <code>min(range(len(centros)), key=lambda i: abs(v - centros[i]))</code>.`,
        c`def passo_kmeans(valores, centros):
    pass
`, c`def passo_kmeans(valores, centros):
    grupos = [[] for _ in centros]
    for v in valores:
        i = min(range(len(centros)), key=lambda i: abs(v - centros[i]))
        grupos[i].append(v)
    return [sum(g) / len(g) if g else centros[i] for i, g in enumerate(grupos)]`, c`
r = passo_kmeans([1, 2, 3, 10, 11, 12], [0, 8])
assert r == [2.0, 11.0], f"Esperava [2.0, 11.0], deu {r}"
assert passo_kmeans([1, 2], [0, 100]) == [1.5, 100], "Grupo vazio mantém o centro antigo"`)
    ]
  },
  {
    id: "py-sqlite", secao: S10, titulo: "Python + SQL: criar, inserir e consultar",
    teoria: `
      <p>Python conversa com bancos SQL por meio de <b>drivers</b>. Para MySQL: <code>pip install mysql-connector-python</code>. Para PostgreSQL: <code>psycopg</code>. O <b>SQLite</b> já vem com o Python (<code>import sqlite3</code>) e é o que usamos aqui. A forma de usar é praticamente igual em todos:</p>
      <pre><code>import sqlite3
con = sqlite3.connect("loja.db")     # MySQL: mysql.connector.connect(host=..., user=..., password=..., database=...)
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY, nome TEXT, cidade TEXT)")
cur.execute("INSERT INTO clientes (nome, cidade) VALUES (?, ?)", ("Ana", "Natal"))
cur.executemany("INSERT INTO clientes (nome, cidade) VALUES (?, ?)",
                [("Bia", "Recife"), ("Caio", "Natal")])
con.commit()                          # salva as alterações!
print(cur.lastrowid)                  # id da última linha inserida</code></pre>
      <!--pratica-->
      <h3>Consultar</h3>
      <pre><code>cur.execute("SELECT nome FROM clientes WHERE cidade = ? ORDER BY nome LIMIT 5", ("Natal",))
for (nome,) in cur.fetchall():        # fetchall: todas as linhas; fetchone: uma
    print(nome)</code></pre>
      <p>⚠️ <b>Nunca</b> monte o SQL colando texto do usuário (<code>f"... WHERE nome = '{nome}'"</code>): use os marcadores <code>?</code> (SQLite) ou <code>%s</code> (MySQL). Isso evita <b>SQL Injection</b> (veja o guia 📘 SQL de A a Z).</p>`,
    exemplo: c`import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL)")
cur.executemany("INSERT INTO produtos (nome, preco) VALUES (?, ?)",
                [("Café", 12.9), ("Pão", 0.75), ("Queijo", 28.0)])
con.commit()
cur.execute("SELECT nome, preco FROM produtos WHERE preco > ? ORDER BY preco DESC", (5,))
for nome, preco in cur.fetchall():
    print(f"{nome}: R$ {preco:.2f}")`,
    perguntas: [
      m("Depois de um `INSERT`, o que é preciso chamar para salvar de verdade?", ["`con.commit()`", "`cur.save()`", "`con.close()` só", "Nada"], 0, "Sem `commit()`, as alterações se perdem."),
      m("Qual é a forma **segura** de passar um valor para o SQL?", ["`cur.execute(\"... WHERE nome = ?\", (nome,))`", "`cur.execute(f\"... WHERE nome = '{nome}'\")`", "`cur.execute(\"... WHERE nome = \" + nome)`", "Todas são seguras"], 0, "Parâmetros com `?` evitam SQL Injection.")
    ],
    exercicios: [
      comp("Cadastro de clientes", `Complete para criar a tabela, inserir os clientes com parâmetros e salvar.`, `<code>executemany</code> para várias linhas e <code>commit()</code> para salvar.`,
        c`import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT, cidade TEXT)")
cur.____("INSERT INTO clientes (nome, cidade) VALUES (?, ?)",
                [("Ana", "Natal"), ("Bia", "Recife"), ("Caio", "Natal")])
con.____()
cur.execute("SELECT COUNT(*) FROM clientes")
total = cur.fetchone()[0]
print(total)`, c`import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT, cidade TEXT)")
cur.executemany("INSERT INTO clientes (nome, cidade) VALUES (?, ?)",
                [("Ana", "Natal"), ("Bia", "Recife"), ("Caio", "Natal")])
con.commit()
cur.execute("SELECT COUNT(*) FROM clientes")
total = cur.fetchone()[0]
print(total)`, c`
assert total == 3, f"total deveria ser 3, deu {total}"`),
      criar("Busca por cidade", `Crie <code>clientes_da_cidade(con, cidade)</code> que devolve a lista de <b>nomes</b> dos clientes da cidade, em ordem alfabética, usando parâmetro <code>?</code>. A tabela <code>clientes(nome, cidade)</code> já existe na conexão.`, `<code>cur.execute("SELECT nome FROM clientes WHERE cidade = ? ORDER BY nome", (cidade,))</code> e <code>[linha[0] for linha in cur.fetchall()]</code>.`,
        c`import sqlite3

def clientes_da_cidade(con, cidade):
    pass
`, c`import sqlite3

def clientes_da_cidade(con, cidade):
    cur = con.cursor()
    cur.execute("SELECT nome FROM clientes WHERE cidade = ? ORDER BY nome", (cidade,))
    return [linha[0] for linha in cur.fetchall()]`, c`
_c = sqlite3.connect(":memory:")
_c.execute("CREATE TABLE clientes (nome TEXT, cidade TEXT)")
_c.executemany("INSERT INTO clientes VALUES (?, ?)", [("Caio", "Natal"), ("Ana", "Natal"), ("Bia", "Recife")])
assert clientes_da_cidade(_c, "Natal") == ["Ana", "Caio"], f"Deu {clientes_da_cidade(_c, 'Natal')}"
assert clientes_da_cidade(_c, "Lisboa") == [], "Cidade sem clientes: []"
assert clientes_da_cidade(_c, "x' OR '1'='1") == [], "Use parâmetro ? (o texto não pode virar SQL)"`, { padroes: [[/\?/, "Use o marcador ? no SQL."]] })
    ]
  },
  {
    id: "py-sqlite-2", secao: S10, titulo: "Python + SQL: atualizar, apagar e JOIN",
    teoria: `
      <pre><code>cur.execute("UPDATE produtos SET preco = ? WHERE nome = ?", (13.5, "Café"))
print(cur.rowcount, "linha(s) alterada(s)")
cur.execute("DELETE FROM produtos WHERE preco &lt; ?", (1,))
cur.execute("DROP TABLE IF EXISTS temporaria")
con.commit()</code></pre>
      <!--pratica-->
      <h3>JOIN</h3>
      <pre><code>cur.execute("""
  SELECT c.nome, p.total
  FROM pedidos p JOIN clientes c ON c.id = p.cliente_id
  ORDER BY p.total DESC LIMIT 3
""")
for nome, total in cur.fetchall():
    print(nome, total)</code></pre>
      <p>💡 Dica: <code>con.row_factory = sqlite3.Row</code> permite acessar as colunas pelo nome (<code>linha["nome"]</code>). E use <code>with con:</code> para fazer <code>commit</code> (ou <code>rollback</code> em caso de erro) automaticamente.</p>`,
    exemplo: c`import sqlite3
con = sqlite3.connect(":memory:")
con.executescript("""
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT);
CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, total REAL);
INSERT INTO clientes VALUES (1, 'Ana'), (2, 'Bia');
INSERT INTO pedidos (cliente_id, total) VALUES (1, 50), (2, 80), (1, 30);
""")
for nome, soma in con.execute("SELECT c.nome, SUM(p.total) FROM pedidos p JOIN clientes c ON c.id = p.cliente_id GROUP BY c.nome"):
    print(nome, soma)`,
    perguntas: [
      m("Qual atributo do cursor diz quantas linhas um UPDATE alterou?", ["`rowcount`", "`lastrowid`", "`changes`", "`fetchone()`"], 0, "`lastrowid` é o id do último INSERT."),
      vf("`with con:` faz o commit automaticamente se o bloco terminar sem erro.", true, "E faz rollback se der erro.")
    ],
    exercicios: [
      criar("Reajuste de preços", `Crie <code>reajustar(con, categoria, pct)</code> que aumenta em <code>pct</code>% o preço dos produtos da categoria (tabela <code>produtos(nome, categoria, preco)</code>), faz <code>commit</code> e devolve quantas linhas foram alteradas.`, `<code>UPDATE produtos SET preco = preco * ? WHERE categoria = ?</code> com <code>(1 + pct / 100, categoria)</code>; depois <code>cur.rowcount</code>.`,
        c`import sqlite3

def reajustar(con, categoria, pct):
    pass
`, c`import sqlite3

def reajustar(con, categoria, pct):
    cur = con.cursor()
    cur.execute("UPDATE produtos SET preco = preco * ? WHERE categoria = ?", (1 + pct / 100, categoria))
    con.commit()
    return cur.rowcount`, c`
_c = sqlite3.connect(":memory:")
_c.execute("CREATE TABLE produtos (nome TEXT, categoria TEXT, preco REAL)")
_c.executemany("INSERT INTO produtos VALUES (?, ?, ?)", [("Café", "Bebidas", 10), ("Suco", "Bebidas", 20), ("Bolo", "Doces", 30)])
n = reajustar(_c, "Bebidas", 10)
assert n == 2, f"Deveria alterar 2 linhas, alterou {n}"
precos = dict(_c.execute("SELECT nome, round(preco, 2) FROM produtos").fetchall())
assert precos == {"Café": 11.0, "Suco": 22.0, "Bolo": 30.0}, f"Preços ficaram {precos}"`),
      criar("Melhores clientes", `Crie <code>top_clientes(con, n)</code> que devolve uma lista de tuplas <code>(nome, total_gasto)</code> com os <code>n</code> clientes que mais gastaram, do maior para o menor. Tabelas: <code>clientes(id, nome)</code> e <code>pedidos(cliente_id, total)</code>.`, `JOIN + <code>GROUP BY</code> + <code>ORDER BY SUM(total) DESC LIMIT ?</code>.`,
        c`import sqlite3

def top_clientes(con, n):
    pass
`, c`import sqlite3

def top_clientes(con, n):
    cur = con.execute("""
        SELECT c.nome, SUM(p.total) AS gasto
        FROM pedidos p JOIN clientes c ON c.id = p.cliente_id
        GROUP BY c.id, c.nome
        ORDER BY gasto DESC
        LIMIT ?""", (n,))
    return cur.fetchall()`, c`
_c = sqlite3.connect(":memory:")
_c.executescript("""
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT);
CREATE TABLE pedidos (cliente_id INTEGER, total REAL);
INSERT INTO clientes VALUES (1, 'Ana'), (2, 'Bia'), (3, 'Caio');
INSERT INTO pedidos VALUES (1, 50), (2, 80), (1, 40), (3, 10);
""")
assert top_clientes(_c, 2) == [("Ana", 90.0), ("Bia", 80.0)], f"Deu {top_clientes(_c, 2)}"`)
    ]
  },
  {
    id: "py-mongo", secao: S10, titulo: "Python + MongoDB (bancos de documentos)",
    teoria: `
      <p><b>MongoDB</b> é um banco <b>NoSQL</b>: em vez de tabelas com colunas fixas, guarda <b>documentos</b> parecidos com dicionários/JSON, agrupados em <b>coleções</b>. Cada documento pode ter campos diferentes.</p>
      <pre><code># pip install pymongo
import pymongo
cliente = pymongo.MongoClient("mongodb://localhost:27017/")
db = cliente["loja"]                 # banco (criado no 1º insert)
col = db["clientes"]                 # coleção (≈ tabela)

col.insert_one({"nome": "Ana", "cidade": "Natal"})
col.insert_many([{"nome": "Bia", "idade": 25}, {"nome": "Caio"}])
col.find_one()                                   # o primeiro documento
col.find({"cidade": "Natal"})                    # filtro (≈ WHERE)
col.find({"idade": {"$gt": 20}})                 # operadores: $gt, $lt, $in, $regex…
col.find({}, {"_id": 0, "nome": 1})              # só alguns campos
col.find().sort("nome", -1).limit(5)             # ordenar e limitar
col.update_one({"nome": "Ana"}, {"$set": {"cidade": "Recife"}})
col.delete_many({"cidade": "Natal"})
col.drop()                                       # apaga a coleção</code></pre>
      <!--pratica-->
      <p>Cada documento ganha um <code>_id</code> único automaticamente. MongoDB não roda no navegador; nos exercícios abaixo, simulamos uma coleção com uma <b>lista de dicionários</b>, que é exatamente o que o <code>find</code> devolve.</p>
      <p>💼 SQL × NoSQL: use SQL quando os dados têm estrutura fixa e muitas relações (financeiro, estoque); NoSQL quando a estrutura varia muito ou o volume é gigante (logs, catálogos, redes sociais).</p>`,
    perguntas: [
      m("No MongoDB, o equivalente a uma tabela é…", ["uma coleção", "um documento", "um campo", "um índice"], 0, "Coleção = conjunto de documentos."),
      m("Qual filtro busca idade **maior que** 30?", ["`{\"idade\": {\"$gt\": 30}}`", "`{\"idade\": \"> 30\"}`", "`{\"idade > 30\"}`", "`WHERE idade > 30`"], 0, "`$gt` = *greater than*.")
    ],
    exercicios: [
      criar("Simulando o find()", `Crie <code>find(colecao, filtro)</code>: <code>colecao</code> é uma lista de dicionários e <code>filtro</code> um dicionário de igualdade (ex.: <code>{"cidade": "Natal"}</code>). Devolva os documentos em que <b>todos</b> os campos do filtro são iguais. Filtro vazio devolve todos.`, `<code>[d for d in colecao if all(d.get(k) == v for k, v in filtro.items())]</code>`,
        c`def find(colecao, filtro):
    pass
`, c`def find(colecao, filtro):
    return [d for d in colecao if all(d.get(k) == v for k, v in filtro.items())]`, c`
col = [{"nome": "Ana", "cidade": "Natal"}, {"nome": "Bia", "cidade": "Recife"}, {"nome": "Caio", "cidade": "Natal", "vip": True}]
assert [d["nome"] for d in find(col, {"cidade": "Natal"})] == ["Ana", "Caio"], "Filtro por cidade"
assert [d["nome"] for d in find(col, {"cidade": "Natal", "vip": True})] == ["Caio"], "Dois campos no filtro"
assert len(find(col, {})) == 3, "Filtro vazio: todos"`),
      criar("sort e limit", `Crie <code>ordenar_limitar(docs, campo, direcao, n)</code> que devolve os <code>n</code> primeiros documentos ordenados pelo campo (<code>direcao</code> = 1 crescente, −1 decrescente), como <code>col.find().sort(campo, direcao).limit(n)</code>.`, `<code>sorted(docs, key=lambda d: d[campo], reverse=direcao == -1)[:n]</code>`,
        c`def ordenar_limitar(docs, campo, direcao, n):
    pass
`, c`def ordenar_limitar(docs, campo, direcao, n):
    return sorted(docs, key=lambda d: d[campo], reverse=direcao == -1)[:n]`, c`
docs = [{"nome": "Ana", "pontos": 50}, {"nome": "Bia", "pontos": 90}, {"nome": "Caio", "pontos": 70}]
assert [d["nome"] for d in ordenar_limitar(docs, "pontos", -1, 2)] == ["Bia", "Caio"], "Decrescente, 2 primeiros"
assert [d["nome"] for d in ordenar_limitar(docs, "nome", 1, 3)] == ["Ana", "Bia", "Caio"], "Crescente por nome"`)
    ]
  }
];
