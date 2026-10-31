// Each explanatory unit is English first, then Brazilian Portuguese.
export const stages = [
  { id: 'python', title: ['1. Python foundations', '1. Fundamentos de Python'],
    why: ['Turn a question into small, repeatable instructions. A function is a reusable recipe; a list stores several ingredients.', 'Transforme uma pergunta em instruções pequenas e repetíveis. Uma função é uma receita reutilizável; uma lista guarda vários ingredientes.'],
    learn: ['Study variables, numbers, strings, lists, dictionaries, conditions, loops, functions, exceptions, files and virtual environments.', 'Estude variáveis, números, textos, listas, dicionários, condições, laços, funções, exceções, arquivos e ambientes virtuais.'],
    tools: ['Use Python 3, VS Code with the Python extension, a terminal and Git. Start in Google Colab if installation gets in your way.', 'Use Python 3, VS Code com a extensão Python, terminal e Git. Comece no Google Colab se a instalação dificultar seu início.'],
    task: ['Write a function that receives expenses, rejects invalid values and returns the total and average. Test an empty list too.', 'Escreva uma função que receba despesas, rejeite valores inválidos e devolva total e média. Teste também uma lista vazia.'],
    ready: ['Move on when you can explain every line and change the function without copying a solution.', 'Avance quando conseguir explicar cada linha e modificar a função sem copiar uma solução.'] },
  { id: 'arrays', title: ['2. NumPy and numerical thinking', '2. NumPy e raciocínio numérico'],
    why: ['An array is an organized block of numbers. Vectorization applies a calculation to the whole block.', 'Um array é um bloco organizado de números. A vetorização aplica um cálculo ao bloco inteiro.'],
    learn: ['Learn arrays, dtype, shape, indexing, Boolean masks, axes, broadcasting, mean, median and standard deviation.', 'Aprenda arrays, dtype, shape, indexação, máscaras booleanas, eixos, broadcasting, média, mediana e desvio padrão.'],
    tools: ['Use NumPy in a notebook; review fractions, percentages, equations and basic linear algebra as needed.', 'Use NumPy em um notebook; revise frações, porcentagens, equações e álgebra linear básica conforme necessário.'],
    task: ['Create seven daily sales values, select values above the mean and calculate a 10% discount without a Python loop.', 'Crie sete valores de vendas diárias, selecione os maiores que a média e calcule um desconto de 10% sem um laço Python.'],
    ready: ['Explain the difference between a Python list and an array, and predict the shape of your result.', 'Explique a diferença entre uma lista Python e um array e antecipe o formato do resultado.'] },
  { id: 'pandas', title: ['3. Pandas and data quality', '3. Pandas e qualidade de dados'],
    why: ['A DataFrame resembles a spreadsheet with named columns. Cleaning makes the table trustworthy before analysis.', 'Um DataFrame lembra uma planilha com colunas nomeadas. A limpeza torna a tabela confiável antes da análise.'],
    learn: ['Practice read_csv, head, info, dtypes, loc, missing values, duplicates, dates, groupby, merge and export. Define what one row represents.', 'Pratique read_csv, head, info, dtypes, loc, ausências, duplicatas, datas, groupby, merge e exportação. Defina o que uma linha representa.'],
    tools: ['Use Pandas and NumPy; use Excel to inspect a small sample and compare totals.', 'Use Pandas e NumPy; use Excel para conferir uma pequena amostra e comparar totais.'],
    task: ['Clean a sales CSV, document each cleaning decision and calculate revenue by category. Check whether a merge duplicates sales.', 'Limpe um CSV de vendas, documente cada decisão e calcule a receita por categoria. Confira se um merge duplica vendas.'],
    ready: ['Show row counts before and after cleaning and justify how you handled missing data.', 'Mostre as contagens de linhas antes e depois da limpeza e justifique como tratou as ausências.'] },
  { id: 'api', title: ['4. APIs and SQL', '4. APIs e SQL'],
    why: ['Requests collects data from an HTTP API; SQL asks precise questions of database tables.', 'Requests coleta dados de uma API HTTP; SQL faz perguntas precisas às tabelas de um banco.'],
    learn: ['Learn URLs, parameters, JSON, status codes, timeouts, pagination and rate limits; then SELECT, WHERE, GROUP BY, JOIN, CTE and window functions.', 'Aprenda URLs, parâmetros, JSON, códigos de status, timeout, paginação e limites; depois SELECT, WHERE, GROUP BY, JOIN, CTE e funções de janela.'],
    tools: ['Use Requests, Python json, SQLite first, then PostgreSQL and DBeaver. Keep API secrets outside Git.', 'Use Requests, json do Python, SQLite primeiro, depois PostgreSQL e DBeaver. Mantenha segredos de API fora do Git.'],
    task: ['Collect the IBGE states endpoint used below, save the response with its collection date, and reproduce the regional counts in SQL.', 'Colete o endpoint de estados do IBGE usado abaixo, salve a resposta com a data de coleta e reproduza as contagens regionais em SQL.'],
    ready: ['Handle a failed request and explain why joining tables at different grains can inflate totals.', 'Trate uma requisição com falha e explique por que unir tabelas com granularidades diferentes pode inflar totais.'] },
  { id: 'visual', title: ['5. Exploration and visual communication', '5. Exploração e comunicação visual'],
    why: ['A chart helps answer a specific question. Start with Matplotlib through Pandas plotting to reduce the first learning steps.', 'Um gráfico ajuda a responder uma pergunta específica. Comece pelo Matplotlib através dos gráficos do Pandas para reduzir os primeiros passos.'],
    learn: ['Use bars for categories, lines for time and histograms for distributions. Add titles, units and sources; distinguish outliers from errors.', 'Use barras para categorias, linhas para tempo e histogramas para distribuições. Adicione títulos, unidades e fontes; diferencie valores extremos de erros.'],
    tools: ['Start with Matplotlib; add Seaborn for statistical plots. Learn Power BI later when a role or project needs it.', 'Comece com Matplotlib; acrescente Seaborn para gráficos estatísticos. Aprenda Power BI depois, conforme a vaga ou o projeto.'],
    task: ['Create two charts and write one supported finding and one limitation for each. Never interpret a count of states as a count of people.', 'Crie dois gráficos e escreva uma conclusão sustentada e uma limitação para cada um. Nunca interprete uma contagem de estados como uma contagem de pessoas.'],
    ready: ['Explain the chart in one minute to someone who does not program.', 'Explique o gráfico em um minuto para alguém que não programa.'] },
  { id: 'stats', title: ['6. Statistics and experiments', '6. Estatística e experimentos'],
    why: ['Statistics separates a pattern in your sample from evidence that may generalize.', 'A estatística separa um padrão na sua amostra de uma evidência que pode se generalizar.'],
    learn: ['Study probability, sampling, bias, variance, confidence intervals, hypothesis tests, correlation versus causation and A/B experiment design.', 'Estude probabilidade, amostragem, viés, variância, intervalos de confiança, testes de hipótese, correlação versus causalidade e desenho de testes A/B.'],
    tools: ['Use NumPy, SciPy and statsmodels. Practice percentages, distributions and basic calculus alongside applications.', 'Use NumPy, SciPy e statsmodels. Pratique porcentagens, distribuições e cálculo básico junto das aplicações.'],
    task: ['Compare two groups, report the effect size and uncertainty, and explain whether the sampling process supports your conclusion.', 'Compare dois grupos, relate o tamanho do efeito e a incerteza e explique se a amostragem sustenta sua conclusão.'],
    ready: ['Explain why a small p-value does not measure the size or business value of an effect.', 'Explique por que um p-valor pequeno não mede o tamanho nem o valor de negócio de um efeito.'] },
  { id: 'ml', title: ['7. Machine learning with evaluation', '7. Aprendizado de máquina com avaliação'],
    why: ['A model learns patterns to predict unseen examples. A simple baseline tells you whether the model adds value.', 'Um modelo aprende padrões para prever exemplos não vistos. Uma referência simples mostra se o modelo agrega valor.'],
    learn: ['Learn regression, classification, preprocessing, train/validation/test splits, cross-validation, leakage, overfitting and class imbalance.', 'Aprenda regressão, classificação, pré-processamento, separação treino/validação/teste, validação cruzada, vazamento, sobreajuste e desbalanceamento.'],
    tools: ['Use scikit-learn Pipelines and Dummy models. Choose MAE for a regression exercise and precision/recall for a classification exercise.', 'Use Pipelines e modelos Dummy do scikit-learn. Escolha MAE em um exercício de regressão e precisão/recall em um de classificação.'],
    task: ['Compare a baseline and two simple models. Fit transformations only on training data; keep the final test set untouched until selection ends.', 'Compare uma referência e dois modelos simples. Ajuste transformações apenas no treino; preserve o teste final até concluir a seleção.'],
    ready: ['Explain your metric, split strategy and model errors; use time-aware splits for forecasting.', 'Explique a métrica, a estratégia de separação e os erros; use separações temporais em previsões de séries.'] },
  { id: 'delivery', title: ['8. Reproducible delivery', '8. Entrega reproduzível'],
    why: ['An analysis becomes useful when another person can run it, inspect it and understand its limits.', 'Uma análise se torna útil quando outra pessoa consegue executá-la, inspecioná-la e entender seus limites.'],
    learn: ['Learn Git commits and PRs, dependency files, data validation, small tests, logging, privacy and basic monitoring of changing data.', 'Aprenda commits e PRs no Git, arquivos de dependências, validação de dados, testes pequenos, logs, privacidade e monitoramento básico de mudanças nos dados.'],
    tools: ['Use GitHub, venv, pip and pytest. Add Streamlit for a first demo; study Docker, cloud and automation when delivery requires them.', 'Use GitHub, venv, pip e pytest. Adicione Streamlit para uma primeira demonstração; estude Docker, nuvem e automação quando a entrega exigir.'],
    task: ['Publish a reproducible analysis with a README, data source, collection date, requirements, chart and clear run instructions. Use n8n later to schedule collection.', 'Publique uma análise reproduzível com README, fonte, data de coleta, dependências, gráfico e instruções claras. Use n8n depois para agendar a coleta.'],
    ready: ['Ask someone to run your project from a fresh environment using only the README.', 'Peça que alguém execute seu projeto em um ambiente novo usando apenas o README.'] },
  { id: 'portfolio', title: ['9. Portfolio and job preparation', '9. Portfólio e preparação profissional'],
    why: ['Evidence of solving a problem is more useful than a list of library names.', 'Evidências de resolução de um problema são mais úteis do que uma lista de bibliotecas.'],
    learn: ['Practice problem framing, business metrics, stakeholder questions, technical English and explaining tradeoffs.', 'Pratique definição de problemas, métricas de negócio, perguntas às pessoas envolvidas, inglês técnico e explicação de escolhas.'],
    tools: ['Use GitHub for three focused projects: an API analysis, a SQL investigation and a model with honest evaluation.', 'Use GitHub para três projetos focados: uma análise via API, uma investigação SQL e um modelo com avaliação honesta.'],
    task: ['Build an anonymized school-attendance analysis or an automation-performance report. Describe the question, method, result and limitations without publishing personal data.', 'Crie uma análise anonimizada de frequência escolar ou um relatório de desempenho de automações. Descreva pergunta, método, resultado e limitações sem publicar dados pessoais.'],
    ready: ['Present a project in three minutes, solve a SQL exercise and explain a model failure before applying for junior roles.', 'Apresente um projeto em três minutos, resolva um exercício SQL e explique uma falha de modelo antes de se candidatar a vagas júnior.'] }
];

export const days = [
  [['Day 1 — Python and NumPy', 'Dia 1 — Python e NumPy'], ['Create an array of seven study durations. Print its shape, mean and values above the mean. Change one value and predict the result before running.', 'Crie um array com sete durações de estudo. Mostre formato, média e valores acima da média. Altere um valor e antecipe o resultado antes de executar.'], 'import numpy as np\nminutes = np.array([30, 45, 20, 60, 40, 35, 50])\nprint(minutes.shape)\nprint(minutes.mean())\nprint(minutes[minutes > minutes.mean()])'],
  [['Day 2 — Tables and cleaning', 'Dia 2 — Tabelas e limpeza'], ['Inspect types and missing values before cleaning. Fill the missing duration with the median and explain why this is only an exercise, not a universal cleaning rule.', 'Confira tipos e ausências antes de limpar. Preencha a duração ausente com a mediana e explique por que isso é apenas um exercício, não uma regra universal de limpeza.'], 'import pandas as pd\ndf = pd.DataFrame({"day": ["Mon", "Tue", "Wed"], "minutes": [30, None, 60]})\nprint(df.dtypes)\nprint(df.isna().sum())\ndf["minutes"] = df["minutes"].fillna(df["minutes"].median())\nprint(df)'],
  [['Day 3 — Collect real IBGE data', 'Dia 3 — Coletar dados reais do IBGE'], ['Run the collection block below in Colab or local Python. Inspect the status, save the raw JSON and identify what each row represents: one federative unit.', 'Execute o bloco de coleta abaixo no Colab ou Python local. Confira o status, salve o JSON original e identifique o que cada linha representa: uma unidade federativa.']],
  [['Day 4 — Select, group and verify', 'Dia 4 — Selecionar, agrupar e conferir'], ['Run the cleaning block. Select names and regions, group by region and verify that grouped counts add up to the number of unique federative units. Investigate errors instead of hiding them.', 'Execute o bloco de limpeza. Selecione nomes e regiões, agrupe por região e confira se as contagens somam o número de unidades federativas únicas. Investigue erros em vez de escondê-los.']],
  [['Day 5 — Plot and explain', 'Dia 5 — Criar o gráfico e explicar'], ['Run the chart block. Write two findings, one limitation and a bilingual README. Deliver the Python file, raw JSON, cleaned CSV and PNG chart in GitHub.', 'Execute o bloco do gráfico. Escreva duas conclusões, uma limitação e um README bilíngue. Entregue o arquivo Python, JSON original, CSV tratado e gráfico PNG no GitHub.']]
];

export const projectCode = `# Collection / Coleta
import json
from datetime import datetime, timezone
from pathlib import Path
import requests
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
response = requests.get(url, timeout=30)
response.raise_for_status()
records = response.json()
if not isinstance(records, list) or not records:
    raise ValueError("Expected a non-empty list / Esperada uma lista não vazia")
out = Path("output")
out.mkdir(exist_ok=True)
stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
(out / f"ibge_raw_{stamp}.json").write_text(
    json.dumps({"source": url, "collected_at_utc": stamp, "data": records},
               ensure_ascii=False, indent=2), encoding="utf-8")

# Cleaning and validation / Limpeza e validação
df = pd.json_normalize(records)
columns = ["id", "sigla", "nome", "regiao.nome"]
if not set(columns).issubset(df.columns):
    raise ValueError("Unexpected schema / Estrutura inesperada")
df = df[columns].rename(columns={"regiao.nome": "region"})
print(df.head())
print(df.dtypes)
print(df.isna().sum())
if df.isna().any().any() or df["id"].duplicated().any() or df["sigla"].duplicated().any():
    raise ValueError("Missing or duplicated data / Dados ausentes ou duplicados")
counts = df.groupby("region").size().sort_values()
assert counts.sum() == len(df)
print(counts)
print("Mean UFs per region / Média de UFs por região:", np.mean(counts.to_numpy()))
df.to_csv(out / "ibge_states.csv", index=False, encoding="utf-8")

# Chart / Gráfico
fig, ax = plt.subplots(figsize=(9, 5))
counts.plot.barh(ax=ax, color="#4f46e5")
ax.set_title("Federative units by region / Unidades federativas por região")
ax.set_xlabel("Count of UFs / Quantidade de UFs")
ax.set_ylabel("Region / Região")
from matplotlib.ticker import MaxNLocator
ax.xaxis.set_major_locator(MaxNLocator(integer=True))
fig.text(0.01, 0.01, "Source / Fonte: IBGE Localidades | " + stamp, fontsize=8)
fig.tight_layout(rect=(0, 0.05, 1, 1))
fig.savefig(out / "ibge_regions.png", dpi=150)
plt.show()
`;

export const resources = [
  ['Python tutorial', 'Tutorial Python', 'https://docs.python.org/3/tutorial/'],
  ['NumPy quickstart', 'Introdução ao NumPy', 'https://numpy.org/doc/stable/user/quickstart.html'],
  ['Pandas tutorials', 'Tutoriais Pandas', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/'],
  ['Requests quickstart', 'Introdução ao Requests', 'https://requests.readthedocs.io/en/latest/user/quickstart/'],
  ['Matplotlib quickstart', 'Introdução ao Matplotlib', 'https://matplotlib.org/stable/users/explain/quick_start.html'],
  ['IBGE Localities API', 'API de Localidades do IBGE', 'https://servicodados.ibge.gov.br/api/docs/localidades'],
  ['scikit-learn getting started', 'Introdução ao scikit-learn', 'https://scikit-learn.org/stable/getting_started.html'],
  ['Google Colab', 'Google Colab', 'https://colab.research.google.com/']
];

const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const pair = ([en, pt]) => `<span class="ds-pair"><span lang="en">${escape(en)}</span><span lang="pt-BR">${escape(pt)}</span></span>`;
const explanation = (text) => `<p>${pair(text)}</p>`;
const code = (text) => `<pre class="ds-code"><code>${escape(text)}</code></pre>`;

export function renderDataScience(view, {progress = {}, onToggle}) {
  const abort = new AbortController();
  const keys = stages.map(s => 'ds_' + s.id);
  const done = () => keys.filter(k => progress[k]).length;
  view.innerHTML = `<div class="ds-page">
    <section class="hero"><h1>${pair(['Data scientist learning path', 'Trilha de Ciência de Dados'])}</h1>
    ${explanation(['Learn to collect real data, clean it, ask useful questions and communicate reliable results.', 'Aprenda a coletar dados reais, tratá-los, fazer perguntas úteis e comunicar resultados confiáveis.'])}
    ${explanation(['Start with the five-day practice below, then deepen each stage. This is a learning route, not a promise of job readiness in one week.', 'Comece pela prática de cinco dias abaixo e depois aprofunde cada etapa. Esta é uma rota de aprendizado, não uma promessa de preparo profissional em uma semana.'])}
    </section>
    <nav class="ds-links" aria-label="Seções de Ciência de Dados">
      <a class="btn" href="#ds-setup">${pair(['Programs', 'Programas'])}</a>
      <a class="btn" href="#ds-roadmap">${pair(['Learning steps', 'Etapas de estudo'])}</a>
      <a class="btn" href="#ds-week">${pair(['Five-day practice', 'Prática de cinco dias'])}</a>
      <a class="btn" href="#ds-project">${pair(['Real-data project', 'Projeto com dados reais'])}</a>
    </nav>
    <section class="box" id="ds-setup"><h2>${pair(['Set up your workspace', 'Prepare seu ambiente'])}</h2>
    ${explanation(['Choose one route: Colab in your browser, or Python 3 and VS Code on your computer. Jupyter notebooks combine code, text and results.', 'Escolha uma rota: Colab no navegador, ou Python 3 e VS Code no computador. Notebooks Jupyter combinam código, texto e resultados.'])}
    ${explanation(['On Windows, run these commands in the project folder. Activation is optional because each command uses the virtual-environment interpreter directly.', 'No Windows, execute estes comandos na pasta do projeto. A ativação é opcional porque cada comando usa diretamente o interpretador do ambiente virtual.'])}
    ${code('py -m venv .venv\n.venv\\Scripts\\python.exe -m pip install numpy pandas requests matplotlib jupyterlab\n.venv\\Scripts\\python.exe -m jupyterlab')}
    ${explanation(['In Colab, create a notebook and run the following installation cell once, then run the Python examples in separate cells.', 'No Colab, crie um notebook e execute a célula de instalação abaixo uma vez; depois execute os exemplos Python em células separadas.'])}
    ${code('%pip install numpy pandas requests matplotlib')}
    ${explanation(['Use Colab or local Python for HTTP requests and charts. The existing app sandbox is useful for basic Python practice; this lesson does not add a chart renderer or Requests support to it.', 'Use Colab ou Python local para requisições HTTP e gráficos. O sandbox do app serve para praticar Python básico; esta aula não adiciona renderização de gráficos nem suporte a Requests nele.'])}
    <a href="#/sandbox/python" class="btn">${pair(['Open Python sandbox', 'Abrir sandbox Python'])}</a>
    <a href="#/sqlpratica" class="btn">${pair(['Practice SQL', 'Praticar SQL'])}</a></section>
    <section class="box" id="ds-roadmap"><h2>${pair(['Roadmap and self-assessment', 'Roteiro e autoavaliação'])}</h2>
    ${explanation(['Read, run an example, change it, explain it aloud and solve a variation without the answer. Mark a stage only after meeting its readiness criterion.', 'Leia, execute um exemplo, modifique, explique em voz alta e resolva uma variação sem a resposta. Marque uma etapa apenas após cumprir o critério de avanço.'])}
    <p id="ds-count" role="status" aria-live="polite"></p>
    <progress id="ds-progress" max="${keys.length}" value="${done()}" aria-label="Progresso de Ciência de Dados"></progress>
    ${stages.map(s => `<details class="box"><summary>${pair(s.title)}</summary>
      ${explanation(s.why)}<h3>${pair(['Knowledge', 'Conhecimentos'])}</h3>${explanation(s.learn)}
      <h3>${pair(['Libraries and programs', 'Bibliotecas e programas'])}</h3>${explanation(s.tools)}
      <h3>${pair(['Practice', 'Prática'])}</h3>${explanation(s.task)}
      <h3>${pair(['Ready to move on?', 'Pode avançar?'])}</h3>${explanation(s.ready)}
      <button type="button" class="btn" data-ds="${s.id}" aria-pressed="${!!progress['ds_' + s.id]}"></button>
      </details>`).join('')}</section>
    <section class="box" id="ds-week"><h2>${pair(['Your first five days', 'Seus primeiros cinco dias'])}</h2>
    ${explanation(['Plan 45–60 minutes daily: 10 to read, 25–35 to code, 10 to explain and 5 to review vocabulary. Repeat a day if you need more practice.', 'Reserve 45–60 minutos por dia: 10 para ler, 25–35 para programar, 10 para explicar e 5 para revisar vocabulário. Repita um dia se precisar praticar mais.'])}
    ${days.map(([title, text, sample]) => `<article class="box"><h3>${pair(title)}</h3>${explanation(text)}${sample ? code(sample) : ''}</article>`).join('')}</section>
    <section class="box" id="ds-project"><h2>${pair(['Guided project: IBGE regions', 'Projeto guiado: regiões do IBGE'])}</h2>
    ${explanation(['Question: how many federative units belong to each Brazilian region? The source includes the Federal District. This is a geographic count, not a population or economic comparison.', 'Pergunta: quantas unidades federativas pertencem a cada região brasileira? A fonte inclui o Distrito Federal. Esta é uma contagem geográfica, não uma comparação populacional ou econômica.'])}
    ${explanation(['Run the blocks in order in the same notebook. get downloads JSON; raise_for_status rejects HTTP errors; json_normalize builds the table; groupby counts units; plot.barh draws the chart.', 'Execute os blocos em ordem no mesmo notebook. get baixa o JSON; raise_for_status rejeita erros HTTP; json_normalize monta a tabela; groupby conta unidades; plot.barh desenha o gráfico.'])}
    ${explanation(['Validation stops on missing fields, empty responses or duplicate units. A timeout, invalid JSON or network failure should be investigated before you continue.', 'A validação interrompe a execução diante de campos ausentes, respostas vazias ou unidades duplicadas. Investigue timeout, JSON inválido ou falha de rede antes de continuar.'])}
    ${code(projectCode)}
    <button type="button" class="btn primary" id="ds-download">${pair(['Download Python project', 'Baixar projeto Python'])}</button>
    ${explanation(['Challenge: filter the Southeast region, list its units and explain why the regional average does not describe population. Add the collection date and source to your README.', 'Desafio: filtre a região Sudeste, liste suas unidades e explique por que a média regional não descreve a população. Inclua data de coleta e fonte no README.'])}
    </section>
    <section class="box" id="ds-reference"><h2><span lang="en">Data analyst desk reference</span><br><span lang="pt-BR">Guia de bolso do analista de dados</span></h2>
    <p class="ds-pair"><span lang="en">Use this as a revision map: identify the question, choose the smallest reliable tool, validate the result and explain its limitation.</span><span lang="pt-BR">Use como mapa de revisão: identifique a pergunta, escolha a menor ferramenta confiável, valide o resultado e explique sua limitação.</span></p>

    <details class="box"><summary><span lang="en">Python operators for analysis</span><br><span lang="pt-BR">Operadores Python para análise</span></summary>
      <p class="ds-pair"><span lang="en">Arithmetic operators calculate measures; comparisons create Boolean filters; and/or/not combine conditions. Prefer clear parentheses in filters.</span><span lang="pt-BR">Operadores aritméticos calculam medidas; comparações criam filtros booleanos; and/or/not combinam condições. Prefira parênteses claros nos filtros.</span></p>
      <pre class="ds-code"><code>growth = (current - previous) / previous
high_sales = df[(df["sales"] &gt; 1000) &amp; (df["region"] == "Sudeste")]</code></pre>
    </details>

    <details class="box"><summary><span lang="en">Pandas: essential 80/20</span><br><span lang="pt-BR">Pandas: o 80/20 essencial</span></summary>
      <p class="ds-pair"><span lang="en">Inspect first, then select, filter, sort, clean missing values, aggregate and join. Do not clean blindly: record what each row and each column mean.</span><span lang="pt-BR">Inspecione primeiro; depois selecione, filtre, ordene, trate ausências, agregue e una tabelas. Não limpe às cegas: registre o que cada linha e cada coluna representam.</span></p>
      <pre class="ds-code"><code>df.head(); df.info(); df.isna().sum()
df.loc[df["salary"] &gt; 4000, ["name", "salary"]]
df.groupby("department")["salary"].agg(["mean", "min", "max"])
pd.merge(left, right, on="id", how="left")</code></pre>
    </details>

    <details class="box"><summary><span lang="en">NumPy and numerical thinking</span><br><span lang="pt-BR">NumPy e raciocínio numérico</span></summary>
      <p class="ds-pair"><span lang="en">Use arrays for numerical columns and vectorized calculations. Check shape, dtype and axis before interpreting a result.</span><span lang="pt-BR">Use arrays para colunas numéricas e cálculos vetorizados. Confira shape, dtype e eixo antes de interpretar um resultado.</span></p>
      <pre class="ds-code"><code>values = np.array([30, 45, 20, 60])
above_mean = values[values &gt; values.mean()]
values * 1.10</code></pre>
    </details>

    <details class="box"><summary><span lang="en">EDA workflow</span><br><span lang="pt-BR">Fluxo de análise exploratória (EDA)</span></summary>
      <p class="ds-pair"><span lang="en">1) import data; 2) inspect shape and types; 3) find missing and duplicates; 4) summarize; 5) examine distributions; 6) analyze relationships and outliers; 7) document insights and next checks.</span><span lang="pt-BR">1) importe os dados; 2) confira formato e tipos; 3) encontre ausências e duplicatas; 4) resuma; 5) analise distribuições; 6) avalie relações e valores extremos; 7) registre achados e próximas verificações.</span></p>
    </details>

    <details class="box"><summary><span lang="en">SQL and Pandas: same question, different syntax</span><br><span lang="pt-BR">SQL e Pandas: mesma pergunta, sintaxe diferente</span></summary>
      <p class="ds-pair"><span lang="en">SELECT maps to column selection; WHERE to Boolean filters; ORDER BY to sort_values; GROUP BY to groupby; JOIN to merge; UNION ALL to concat. Learn both because many analyst roles use SQL daily.</span><span lang="pt-BR">SELECT corresponde à seleção de colunas; WHERE a filtros booleanos; ORDER BY a sort_values; GROUP BY a groupby; JOIN a merge; UNION ALL a concat. Aprenda os dois porque muitas vagas de análise usam SQL diariamente.</span></p>
      <pre class="ds-code"><code>SELECT region, COUNT(*) FROM states GROUP BY region;
df.groupby("region").size()</code></pre>
    </details>

    <details class="box"><summary><span lang="en">Choose the visual</span><br><span lang="pt-BR">Escolha o gráfico</span></summary>
      <p class="ds-pair"><span lang="en">Use bars for category comparisons, lines for time, histograms for distributions, scatter plots for two numeric variables and box plots to compare spread and outliers. Matplotlib is the foundation; Seaborn adds statistical defaults; Plotly adds interactivity.</span><span lang="pt-BR">Use barras para comparar categorias, linhas para tempo, histogramas para distribuições, dispersão para duas variáveis numéricas e box plots para comparar dispersão e valores extremos. Matplotlib é a base; Seaborn facilita gráficos estatísticos; Plotly acrescenta interatividade.</span></p>
    </details>

    <details class="box"><summary><span lang="en">Statistics: test the assumption first</span><br><span lang="pt-BR">Estatística: teste o pressuposto primeiro</span></summary>
      <p class="ds-pair"><span lang="en">Before choosing a parametric or non-parametric test, verify data type, independence, distribution, variance and sample design. Correlation does not establish causation.</span><span lang="pt-BR">Antes de escolher um teste paramétrico ou não paramétrico, verifique tipo de dado, independência, distribuição, variância e desenho da amostra. Correlação não estabelece causalidade.</span></p>
    </details>

    <details class="box"><summary><span lang="en">Machine learning: evaluate, do not memorize</span><br><span lang="pt-BR">Machine learning: avalie, não decore</span></summary>
      <p class="ds-pair"><span lang="en">Start with a baseline, separate train/validation/test correctly, avoid leakage, tune only with training-validation data and select a metric that represents the real error cost. Use accuracy carefully when classes are imbalanced.</span><span lang="pt-BR">Comece com uma referência simples, separe treino/validação/teste corretamente, evite vazamento, ajuste somente com treino-validação e escolha uma métrica que represente o custo real do erro. Use acurácia com cuidado em classes desbalanceadas.</span></p>
    </details>

    <details class="box"><summary><span lang="en">Data pipeline, APIs and delivery</span><br><span lang="pt-BR">Pipeline de dados, APIs e entrega</span></summary>
      <p class="ds-pair"><span lang="en">A practical pipeline collects, validates, cleans, stores, analyzes and communicates. Requests obtains API data; SQLAlchemy connects databases; Streamlit/Dash present apps; Git and a README make the work reproducible. Keep keys and passwords outside Git.</span><span lang="pt-BR">Um pipeline prático coleta, valida, limpa, armazena, analisa e comunica. Requests obtém dados de APIs; SQLAlchemy conecta bancos; Streamlit/Dash apresentam apps; Git e README tornam o trabalho reproduzível. Mantenha chaves e senhas fora do Git.</span></p>
    </details>
    </section>
    <section class="box"><h2>${pair(['Vocabulary and official references', 'Vocabulário e referências oficiais'])}</h2>
    ${explanation(['row · column · missing value · mean · feature · target · training · test · bias', 'linha · coluna · valor ausente · média · variável de entrada · alvo · treinamento · teste · viés'])}
    <ul>${resources.map(([en, pt, href]) => `<li><a href="${href}" target="_blank" rel="noopener noreferrer">${pair([en, pt])}</a></li>`).join('')}</ul>
    </section><p id="ds-feedback" role="status" aria-live="polite"></p></div>`;

  // Keep section navigation inside the hash-based app route.
  view.querySelectorAll('.ds-links a').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    view.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  }, {signal: abort.signal}));
  function refresh() {
    view.querySelector('#ds-count').innerHTML = pair([`${done()} of ${keys.length} stages completed`, `${done()} de ${keys.length} etapas concluídas`]);
    view.querySelector('#ds-progress').value = done();
    view.querySelectorAll('[data-ds]').forEach(btn => {
      const complete = !!progress['ds_' + btn.dataset.ds];
      btn.setAttribute('aria-pressed', String(complete));
      btn.innerHTML = pair(complete ? ['Completed — undo', 'Concluído — desfazer'] : ['Mark as completed', 'Marcar como concluído']);
    });
  }
  refresh();
  view.querySelectorAll('[data-ds]').forEach(btn => btn.addEventListener('click', async () => {
    const key = 'ds_' + btn.dataset.ds;
    const completed = !progress[key];
    btn.disabled = true;
    try {
      await onToggle(key, completed);
      if (completed) progress[key] = true; else delete progress[key];
      if (!abort.signal.aborted) {
        refresh();
        view.querySelector('#ds-feedback').innerHTML = pair(['Progress saved to your account.', 'Progresso salvo na sua conta.']);
      }
    } catch {
      if (!abort.signal.aborted) view.querySelector('#ds-feedback').innerHTML = pair(['Could not save. Check your connection and try again.', 'Não foi possível salvar. Verifique sua conexão e tente novamente.']);
    } finally { btn.disabled = false; }
  }, {signal: abort.signal}));
  view.querySelector('#ds-download').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([projectCode], {type:'text/x-python;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'ibge_data_science.py'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, {signal: abort.signal});
  return () => abort.abort();
}
