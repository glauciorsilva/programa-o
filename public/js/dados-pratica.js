// Practice content: deterministic synthetic data, independent of external APIs.
const c = String.raw;
export const bilingual = (en, pt) => `<span lang="en" class="ds-line">${en}</span><span lang="pt-BR" class="ds-line">${pt}</span>`;
export const FILES = {
  'ds_sales.csv': 'order,category,quantity,price\n1,Books,2,30\n2,Courses,1,120\n3,Books,3,30\n4,Tools,2,50\n5,Courses,1,80\n',
  'ds_dirty.csv': 'id,category,amount\n1,Books,60\n2,Courses,120\n2,Courses,120\n3,Books,\n4,Tools,100\n',
  'ds_clients.csv': 'client_id,name\n1,Ana\n2,Bia\n3,Caio\n',
  'ds_orders.csv': 'order_id,client_id,amount\n1,1,60\n2,1,90\n3,2,120\n',
  'ds_api.json': '[{"id":33,"sigla":"RJ","nome":"Rio de Janeiro","regiao":{"nome":"Sudeste"}},{"id":35,"sigla":"SP","nome":"São Paulo","regiao":{"nome":"Sudeste"}},{"id":26,"sigla":"PE","nome":"Pernambuco","regiao":{"nome":"Nordeste"}}]'
};
const sales = 'import pandas as pd\ndf = pd.read_csv("ds_sales.csv")\n';
export const LABS = [
  { id:'numpy', title:'NumPy', description:bilingual('Explore arrays, masks and summary statistics. Change the numbers and predict the result.', 'Explore arrays, máscaras e estatísticas. Altere os números e antecipe o resultado.'), code:c`import numpy as np
minutes = np.array([30, 45, 20, 60, 40])
print("Mean / Média:", minutes.mean())
print("Above mean / Acima da média:", minutes[minutes > minutes.mean()])` },
  { id:'pandas', title:'Pandas', description:bilingual('Read a sales CSV and calculate revenue by category. Each row is an order; all data is synthetic.', 'Leia um CSV de vendas e calcule a receita por categoria. Cada linha é um pedido; os dados são fictícios.'), code:sales+c`df["revenue"] = df["quantity"] * df["price"]
print(df)
print(df.groupby("category")["revenue"].sum())` },
  { id:'charts', title:'Matplotlib', description:bilingual('Create a chart here. Figures left open at the end appear below the output; do not close them before the run ends.', 'Crie um gráfico aqui. As figuras abertas ao final aparecem abaixo da saída; não as feche antes de terminar.'), code:sales+c`import matplotlib.pyplot as plt
df["revenue"] = df["quantity"] * df["price"]
totals = df.groupby("category")["revenue"].sum()
fig, ax = plt.subplots(figsize=(7, 4))
totals.plot.bar(ax=ax, color="#4f46e5", rot=0)
ax.set_title("Revenue by category / Receita por categoria")
ax.set_ylabel("BRL / R$")
ax.set_xlabel("Category / Categoria")
fig.tight_layout()` },
  { id:'api', title:'API · IBGE', description:bilingual('Collect live IBGE data with pyfetch, the browser-compatible HTTP client. This needs internet and the API must allow browser requests. Requests remains available in the downloadable local project.', 'Colete dados atuais do IBGE com pyfetch, cliente HTTP compatível com o navegador. É necessária internet e a API deve permitir requisições do navegador. Requests continua no projeto local para baixar.'), code:c`from pyodide.http import pyfetch
import pandas as pd
url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
response = await pyfetch(url)
response.raise_for_status()
records = await response.json()
df = pd.json_normalize(records)
print(df[["sigla", "nome", "regiao.nome"]])
print(df.groupby("regiao.nome").size())` }
];

export const EXERCISES = [
  {id:'array', title:'1 · Arrays',
    prompt:['Create a NumPy array named values with 10, 20, 30 and 40. Store its mean in average and print it.', 'Crie um array NumPy chamado values com 10, 20, 30 e 40. Guarde a média em average e imprima.'],
    hint:['Use np.array and .mean(). The expected mean is 25.', 'Use np.array e .mean(). A média esperada é 25.'],
    initial:'import numpy as np\nvalues = ____\naverage = ____\nprint(average)',
    solution:'import numpy as np\nvalues = np.array([10, 20, 30, 40])\naverage = values.mean()\nprint(average)',
    test:c`import numpy as np
assert isinstance(values, np.ndarray), "Use a NumPy array / Use um array NumPy"
assert np.array_equal(values, [10,20,30,40]), "Check the values / Confira os valores"
assert np.isclose(average, 25), "Mean must be 25 / A média deve ser 25"`, expected:'25.0'},
  {id:'mask', title:'2 · Boolean masks / Máscaras booleanas',
    prompt:['Select only values greater than or equal to 40 from minutes. Save a NumPy array named selected.', 'Selecione de minutes apenas os valores maiores ou iguais a 40. Salve um array NumPy chamado selected.'],
    hint:['Index the array with minutes >= 40.', 'Use minutes >= 40 para indexar o array.'],
    initial:'import numpy as np\nminutes = np.array([30,45,20,60,40])\nselected = ____\nprint(selected)',
    solution:'import numpy as np\nminutes = np.array([30,45,20,60,40])\nselected = minutes[minutes >= 40]\nprint(selected)',
    test:c`import numpy as np
assert isinstance(selected, np.ndarray), "Return an array / Retorne um array"
assert np.array_equal(selected, [45,60,40]), "Expected 45,60,40 in order / Esperado 45,60,40 nesta ordem"`, expected:'[45 60 40]'},
  {id:'revenue', title:'3 · Revenue / Receita',
    prompt:['Read ds_sales.csv into df and add revenue = quantity × price. Save the total in total_revenue.', 'Leia ds_sales.csv em df e adicione revenue = quantity × price. Salve o total em total_revenue.'],
    hint:['Multiply columns, then call sum() on revenue.', 'Multiplique as colunas e use sum() em revenue.'],
    initial:sales+'df["revenue"] = ____\ntotal_revenue = ____\nprint(total_revenue)',
    solution:sales+'df["revenue"] = df["quantity"] * df["price"]\ntotal_revenue = df["revenue"].sum()\nprint(total_revenue)',
    test:c`import pandas as pd
expected = pd.read_csv("ds_sales.csv")
assert len(df)==5 and "revenue" in df, "Keep five orders and add revenue / Mantenha cinco pedidos e adicione revenue"
assert df["revenue"].tolist()==[60,120,90,100,80], "Check each order / Confira cada pedido"
assert abs(total_revenue-450)<1e-8, "Total must be 450 / O total deve ser 450"`, expected:'450'},
  {id:'filter', title:'4 · Filter and sort / Filtrar e ordenar',
    prompt:['Add revenue, keep orders with revenue >= 90, and sort by revenue descending. Save a DataFrame named selected.', 'Adicione revenue, mantenha pedidos com revenue >= 90 e ordene a receita de forma decrescente. Salve um DataFrame chamado selected.'],
    hint:['Use loc followed by sort_values with ascending=False.', 'Use loc seguido de sort_values com ascending=False.'],
    initial:sales+'df["revenue"] = df["quantity"] * df["price"]\nselected = ____\nprint(selected[["order","revenue"]])',
    solution:sales+'df["revenue"] = df["quantity"] * df["price"]\nselected = df.loc[df["revenue"] >= 90].sort_values("revenue", ascending=False)\nprint(selected[["order","revenue"]])',
    test:c`import pandas as pd
assert isinstance(selected,pd.DataFrame), "Return a DataFrame / Retorne um DataFrame"
assert selected["order"].tolist()==[2,4,3], "Expected orders 2,4,3 / Esperados pedidos 2,4,3"
assert selected["revenue"].tolist()==[120,100,90], "Check revenue / Confira a receita"`, expected:'order → revenue\n2 → 120\n4 → 100\n3 → 90'},
  {id:'clean', title:'5 · Data quality / Qualidade de dados',
    prompt:['Read ds_dirty.csv. Remove duplicated ids, then rows with missing amount. Save clean with three rows. Do not replace unknown revenue with zero.', 'Leia ds_dirty.csv. Remova ids duplicados e depois linhas com amount ausente. Salve clean com três linhas. Não substitua receita desconhecida por zero.'],
    hint:['Use drop_duplicates(subset="id") and dropna(subset=["amount"]).', 'Use drop_duplicates(subset="id") e dropna(subset=["amount"]).'],
    initial:'import pandas as pd\ndf = pd.read_csv("ds_dirty.csv")\nclean = ____\nprint(clean)',
    solution:'import pandas as pd\ndf = pd.read_csv("ds_dirty.csv")\nclean = df.drop_duplicates(subset="id").dropna(subset=["amount"])\nprint(clean)',
    test:c`assert clean["id"].tolist()==[1,2,4], "Expected ids 1,2,4 / Esperados ids 1,2,4"
assert not clean["amount"].isna().any() and not clean["id"].duplicated().any(), "Check missing values and duplicates / Confira ausências e duplicatas"
assert clean["amount"].sum()==280, "Expected total 280 / Total esperado 280"`, expected:'ids: 1, 2, 4 · amount: 60, 120, 100'},
  {id:'group', title:'6 · Group and aggregate / Agrupar e agregar',
    prompt:['Add revenue to sales and create a Series named totals with total revenue per category, sorted by category.', 'Adicione revenue às vendas e crie uma Series chamada totals com a receita por categoria, ordenada pela categoria.'],
    hint:['Use groupby("category")["revenue"].sum().sort_index().', 'Use groupby("category")["revenue"].sum().sort_index().'],
    initial:sales+'df["revenue"] = df["quantity"] * df["price"]\ntotals = ____\nprint(totals)',
    solution:sales+'df["revenue"] = df["quantity"] * df["price"]\ntotals = df.groupby("category")["revenue"].sum().sort_index()\nprint(totals)',
    test:c`import pandas as pd
assert isinstance(totals,pd.Series), "Return a Series / Retorne uma Series"
assert totals.to_dict()=={"Books":150,"Courses":200,"Tools":100}, "Check category totals / Confira os totais por categoria"
assert totals.index.tolist()==["Books","Courses","Tools"], "Sort the index / Ordene o índice"`, expected:'Books 150 · Courses 200 · Tools 100'},
  {id:'join', title:'7 · Join without inflation / Junção sem inflar totais',
    prompt:['Read ds_orders.csv and ds_clients.csv. Join orders to clients on client_id using a many-to-one validation. Save joined with three orders and customer names.', 'Leia ds_orders.csv e ds_clients.csv. Una pedidos e clientes por client_id com validação many_to_one. Salve joined com três pedidos e nomes dos clientes.'],
    hint:['Use orders.merge(clients, on="client_id", how="left", validate="many_to_one").', 'Use orders.merge(clients, on="client_id", how="left", validate="many_to_one").'],
    initial:'import pandas as pd\norders = pd.read_csv("ds_orders.csv")\nclients = pd.read_csv("ds_clients.csv")\njoined = ____\nprint(joined)',
    solution:'import pandas as pd\norders = pd.read_csv("ds_orders.csv")\nclients = pd.read_csv("ds_clients.csv")\njoined = orders.merge(clients,on="client_id",how="left",validate="many_to_one")\nprint(joined)',
    test:c`assert len(joined)==3 and joined["order_id"].is_unique, "Keep one row per order / Mantenha uma linha por pedido"
assert joined["name"].tolist()==["Ana","Ana","Bia"], "Check client matching / Confira os clientes"
assert joined["amount"].sum()==270, "Revenue must stay 270 / A receita deve permanecer 270"`, expected:'names / nomes: Ana, Ana, Bia · total: 270'},
  {id:'json', title:'8 · API-shaped JSON / JSON no formato de API',
    prompt:['Read the synthetic API response in ds_api.json. Normalize it with Pandas and store the count of units per regiao.nome in counts.', 'Leia a resposta fictícia de API em ds_api.json. Normalize com Pandas e guarde em counts a contagem de unidades por regiao.nome.'],
    hint:['Use json.load, pd.json_normalize and groupby(...).size(). This fixture is not a complete list of Brazilian units.', 'Use json.load, pd.json_normalize e groupby(...).size(). Esta amostra não é a lista completa de unidades brasileiras.'],
    initial:'import json\nimport pandas as pd\nwith open("ds_api.json", encoding="utf-8") as f:\n    records = json.load(f)\ndf = ____\ncounts = ____\nprint(counts)',
    solution:'import json\nimport pandas as pd\nwith open("ds_api.json", encoding="utf-8") as f:\n    records = json.load(f)\ndf = pd.json_normalize(records)\ncounts = df.groupby("regiao.nome").size()\nprint(counts)',
    test:c`assert len(df)==3 and "regiao.nome" in df, "Normalize nested JSON / Normalize o JSON aninhado"
assert counts.to_dict()=={"Nordeste":1,"Sudeste":2}, "Expected Nordeste=1 and Sudeste=2 / Esperado Nordeste=1 e Sudeste=2"`, expected:'Nordeste 1 · Sudeste 2'},
  {id:'stats', title:'9 · Mean and median / Média e mediana',
    prompt:['For values [10, 12, 13, 15, 100], calculate mean_value and median_value with NumPy. Observe how the extreme value affects the mean.', 'Para [10, 12, 13, 15, 100], calcule mean_value e median_value com NumPy. Observe como o valor extremo afeta a média.'],
    hint:['Use np.mean and np.median. An extreme value is not automatically an error.', 'Use np.mean e np.median. Um valor extremo não é automaticamente um erro.'],
    initial:'import numpy as np\nvalues = np.array([10,12,13,15,100])\nmean_value = ____\nmedian_value = ____\nprint(mean_value, median_value)',
    solution:'import numpy as np\nvalues = np.array([10,12,13,15,100])\nmean_value = np.mean(values)\nmedian_value = np.median(values)\nprint(mean_value, median_value)',
    test:c`import numpy as np
assert np.isclose(mean_value,30) and np.isclose(median_value,13), "Expected mean 30 and median 13 / Esperadas média 30 e mediana 13"`, expected:'30.0 13.0'},
  {id:'chart', title:'10 · Build a useful chart / Criar um gráfico útil',
    prompt:['Calculate category revenue and create a vertical bar chart in fig, ax. Use categories in alphabetical order, set the title to Revenue by category, the x label to Category and the y label to BRL.', 'Calcule a receita por categoria e crie um gráfico de barras verticais em fig, ax. Use categorias em ordem alfabética, título Revenue by category, rótulo x Category e rótulo y BRL.'],
    hint:['Use plt.subplots, totals.plot.bar(ax=ax) and ax.set_title/set_xlabel/set_ylabel. Keep the figure open.', 'Use plt.subplots, totals.plot.bar(ax=ax) e ax.set_title/set_xlabel/set_ylabel. Mantenha a figura aberta.'],
    initial:sales+'import matplotlib.pyplot as plt\ndf["revenue"] = ____\ntotals = ____\nfig, ax = plt.subplots(figsize=(7,4))\n# Draw and label the chart / Desenhe e rotule o gráfico\n',
    solution:sales+'import matplotlib.pyplot as plt\ndf["revenue"] = df["quantity"] * df["price"]\ntotals = df.groupby("category")["revenue"].sum().sort_index()\nfig, ax = plt.subplots(figsize=(7,4))\ntotals.plot.bar(ax=ax,rot=0)\nax.set_title("Revenue by category")\nax.set_xlabel("Category")\nax.set_ylabel("BRL")\nfig.tight_layout()',
    test:c`import numpy as np
assert len(ax.patches)==3, "Draw three bars / Desenhe três barras"
assert np.allclose([p.get_height() for p in ax.patches],[150,200,100]), "Check bar heights / Confira as alturas das barras"
assert [t.get_text() for t in ax.get_xticklabels()]==["Books","Courses","Tools"], "Check categories / Confira as categorias"
assert ax.get_title()=="Revenue by category" and ax.get_xlabel()=="Category" and ax.get_ylabel()=="BRL", "Add title and axis labels / Adicione título e rótulos dos eixos"
assert fig is ax.figure, "Use fig and ax from the same figure / Use fig e ax da mesma figura"`, expected:'Books: 150 · Courses: 200 · Tools: 100 (BRL)'}
];

export function practiceCards(progress = {}) {
  const done = EXERCISES.filter(ex => progress['dsx_' + ex.id]).length;
  return `<section class="box" id="ds-practice"><h2>${bilingual('Hands-on data science', 'Ciência de Dados na prática')}</h2>
    <p>${bilingual('Use the labs to experiment freely, then solve the exercises in order. Read the prompt, try, check, use a hint and explain the solution in your own words.', 'Use os laboratórios para experimentar livremente e depois resolva os exercícios em ordem. Leia, tente, verifique, use uma dica e explique a solução com suas palavras.')}</p>
    <p>${bilingual('Synthetic datasets are included. No installation is needed, but internet is required to load Python and packages the first time.', 'Os conjuntos de dados fictícios já estão incluídos. Não é necessário instalar programas, mas é preciso internet para carregar Python e bibliotecas na primeira vez.')}</p>
    <h3>${bilingual('Free sandboxes', 'Caixas de areia livres')}</h3>
    ${LABS.map(l => `<article class="box"><h4>${l.title}</h4><p>${l.description}</p><a class="btn" href="#/dadoslab/lab/${l.id}">${bilingual('Open sandbox', 'Abrir caixa de areia')}</a></article>`).join('')}
    <h3>${bilingual('Ten guided exercises', 'Dez exercícios guiados')}</h3>
    <p>${bilingual(`${done} of ${EXERCISES.length} solved · 25 points per exercise`, `${done} de ${EXERCISES.length} resolvidos · 25 pontos por exercício`)}</p>
    ${EXERCISES.map(ex => `<article class="box"><h4>${ex.title}</h4><p>${bilingual(...ex.prompt)}</p><a class="btn ${progress['dsx_' + ex.id] ? 'success' : 'primary'}" href="#/dadoslab/ex/${ex.id}">${progress['dsx_' + ex.id] ? bilingual('Solved — review', 'Resolvido — revisar') : bilingual('Practice', 'Praticar')}</a></article>`).join('')}</section>`;
}
