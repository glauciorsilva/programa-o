# ProgrTotal — Roadmap de Programação

Sistema web (desktop e celular) com roadmap de estudos, do básico ao avançado, com login, cronômetro de estudo e painel de administração.

## Conteúdo

**Aba Linguagens** (da mais fácil à mais complexa):
1. HTML · 2. CSS · 3. Python · 4. JavaScript/TypeScript · 5. React · 6. Go · 7. C# · 8. Java · 9. C++

**Aba Bancos de Dados:**
1. SQL (fundamentos) · 2. MySQL

> **Sobre o projeto:** o ProgrTotal apresenta ao estudante algumas das muitas linguagens de programação, como uma porta de entrada para o universo da tecnologia. Ele não apresenta nem ensina, por si só, tudo o que deve ser aprendido.

Cada trilha começa pelo nível **🐣 Iniciante** (4 ou 5 tópicos) e segue com **Básico, Intermediário e Avançado** (3 tópicos por nível). Cada tópico traz:
- 📖 explicação do conceito (com analogia e detalhes)
- 💻 código pronto para copiar e testar no sandbox
- 🔍 o código explicado parte por parte (o que cada trecho faz e por que está lá)
- 💼 caso real de trabalho
- 🎤 pergunta de entrevista com resposta
- 🔎 termos para pesquisar na internet em caso de dúvida

Ao final de cada nível há **exercícios de fixação** (12 no Iniciante e 10 nos demais níveis): múltipla escolha, verdadeiro/falso e “complete o código”, com correção na hora e explicação de cada resposta.

Também há a página **Como pesquisar**, um guia para ler erros, pesquisar e usar a documentação.

## 🧪 Sandbox e exercícios práticos

O aluno programa **dentro do app**, sem instalar nada:

| Linguagem | Como roda |
|---|---|
| HTML + CSS + JS | pré-visualização ao vivo com abas HTML / CSS / JS |
| JavaScript e TypeScript | no navegador (Web Worker); TypeScript é convertido com Babel |
| React | componente com `export default` renderizado ao vivo (React 18 + react-router-dom) |
| Python | Python 3 completo no navegador (Pyodide), com `input()`, arquivos `vendas.csv`/`clientes.csv` e `pandas` |
| SQL / MySQL | banco de exemplo (clientes, pedidos, produtos...) recriado a cada execução; motor SQLite com funções do MySQL (`NOW`, `DATE_FORMAT`, `TIMESTAMPDIFF`, `SHOW TABLES`, `DESCRIBE`...) |
| Go, C#, Java | editor + botão para copiar e abrir no playground oficial (precisam de compilador) |

- **▶ Testar no sandbox** em cada exemplo dos tópicos.
- **🏋️ Exercício prático** no fim de cada nível (30 no total). HTML, CSS, JS/TS, React, Python, SQL e MySQL têm **correção automática**. Go, C# e Java mostram a saída esperada e a solução.
- **Sandbox livre** no menu, para testar ideias. O código fica salvo na conta do aluno.
- **Segurança:** o código do aluno roda em um `iframe` isolado (origem opaca), sem acesso ao login. Loops infinitos são interrompidos depois de 10 a 20 segundos.
- O **Admin/TI** vê, por aluno, quais exercícios foram resolvidos, quantas tentativas e o último código enviado.

## 🐣 Nível Iniciante, "Pare e pratique" e pontuação

- **Nível Iniciante** antes do Básico em todas as trilhas. São tutoriais bem fáceis, divididos em passos pequenos, e cada passo termina com perguntas rápidas. Os ids dos tópicos são `<trilha>_p<n>`, e o conteúdo fica em `js/content/iniciante/<trilha>.js`.
- **✋ Pare e pratique:** perguntas rápidas no meio da explicação dos tópicos dos outros níveis (`checkpoints` no mesmo arquivo).
  - Cada acerto fica salvo em `progress.ck_<topico>_<n>`.
- **🎨 E no CSS?** Os tópicos de HTML lembram as configurações de CSS correspondentes (campo `noCss`).
- **⭐ Pontuação** (`js/pontos.js`): é calculada a partir do progresso salvo.

  | Atividade | Pontos |
  |---|---|
  | Tópico concluído | 10 |
  | Parada para praticar acertada | 2 |
  | Fixação | 3 por acerto (vale o melhor resultado) |
  | Exercício de código "completar" | 10 |
  | Exercício de código "do zero" | 15 |
  | Exercício prático do nível | 25 |
  | Lição do SQL na Prática | 10 |

  - Patentes: Semente, Broto, Aprendiz, Praticante, Desenvolvedor(a), Especialista e Mestre.
  - A pontuação aparece no topo, em Meu progresso, no Admin/TI e no CSV.

## 🧩 Exercícios de código por tópico

Cada um dos 90 tópicos tem **pelo menos 5 exercícios de código** (lista “🧩 Exercícios de código” dentro do tópico):

- **✏️ Completar:** o código vem pronto com lacunas `____` para o aluno preencher.
- **🛠️ Do zero:** o aluno escreve tudo a partir do enunciado.

Eles abrem no sandbox, com Dica, Solução e **✅ Verificar**:

- HTML/CSS/JS/TS/React/Python/SQL/MySQL: o código roda e os testes conferem o resultado.
- Go, C# e Java (e os comandos de MySQL que só rodam num servidor real): a verificação confere no código os trechos pedidos (`padroes`). A saída esperada aparece para comparar no playground.
- O conteúdo fica em `js/content/codigo/<trilha>.js`; o registro, em `js/content/codigo/index.js`.
- Os ids seguem o formato `<topico>_<n>` (ex.: `python_b1_3`). O progresso fica em `progress.cx_<id>`.

## 🧩 SQL na Prática

Trilha interativa de SQL (aba **Bancos de Dados** e menu lateral). São 18 lições, mais a introdução, o encerramento e 2 tópicos extras (subconsultas e UNION/INTERSECT/EXCEPT).

- Cada lição traz uma teoria curta e um exercício com tarefas. Um banco SQLite (sql.js) roda no navegador, dentro de um Web Worker.
- Lições de consulta (1 a 12 e extras): o resultado é atualizado enquanto o aluno digita.
- Lições que alteram dados (13 a 18): o aluno clica em **▶ Executar**. As mudanças ficam no banco até ele clicar em **↺ Resetar banco**.
- A correção é automática. Ela compara o resultado com o da solução oficial (com ou sem ordem) e confere o estado do banco (linhas, colunas, tabelas existentes).
- Cada tarefa tem a opção **“Travou? Ver a solução”**.
- A próxima lição só é liberada quando todas as tarefas da atual estiverem concluídas. O admin vê todas as lições liberadas.
- Conteúdo em `js/content/sqlpratica.js`; motor de correção em `js/sqlpratica/motor.js`.

## Funcionalidades

- Cadastro e login com e-mail pessoal e senha (Firebase Authentication), além de recuperação de senha.
- **Cronômetro** no topo: mostra o tempo da **sessão atual** e o **tempo total de estudo**. Ele pausa quando a aba fica em segundo plano e salva no Firestore a cada 30 segundos.
- Marcação de tópicos concluídos e página **Meu progresso**, com gráfico dos últimos 14 dias.
- **Admin / TI** (somente `rafael.glaucio2@gmail.com`, com e-mail verificado):
  - lista de todos os alunos, com cadastro, último acesso, tempo total, sessões e % de progresso
  - busca e ordenação
  - detalhes de cada aluno: evolução por trilha, gráfico de 30 dias e últimas sessões
  - exportação em CSV

## Estrutura

```
public/                 site estático (Firebase Hosting)
  index.html
  css/style.css
  js/firebase.js        configuração do Firebase (web) e e-mail do admin
  js/app.js             login, rotas, telas
  js/timer.js           cronômetro de estudo
  js/admin.js           painel Admin/TI
  js/content/*.js       conteúdo das trilhas e exercícios práticos
  js/content/extras/    explicações detalhadas, código parte por parte e exercícios de fixação
  js/fixacao.js         tela dos exercícios de fixação
  js/sandbox/*.js       editor, execução e tela do sandbox
  js/content/sqlpratica.js  lições, bancos e tarefas do "SQL na Prática"
  js/content/codigo/    exercícios de código por tópico (completar / criar do zero)
  js/sqlpratica/*.js    motor de correção (Web Worker + sql.js) e tela do "SQL na Prática"
  sandbox/runner.html   ambiente isolado que executa o código do aluno
  sandbox/workers.js    executores de JS, Python (Pyodide) e SQL (sql.js)
firestore.rules         regras de segurança
firebase.json
```

### Dados no Firestore

```
users/{uid}
  name, email, createdAt, lastAccess, totalSeconds, sessionsCount
  progress: { "<topicoId>": timestamp }      ex.: python_b1, sql_a3, ex_python_basico (exercício), cx_python_b1_3 (exercício de código), ck_python_p1_2 (pare e pratique), sqlp_7 (lição do SQL na Prática)
  daily:    { "dAAAAMMDD": segundos }
  fixacao:  { "<trilha>_<nivel>": { melhor, ultimo, total, tentativas, em } }
users/{uid}/sessions/{id}
  start, lastPing, seconds, device, userAgent
users/{uid}/codigos/{id}                     livre_<lang> ou ex_<trilha>_<nivel>
  lang, codigo, ok, tentativas, atualizadoEm, resolvidoEm
```

## Como publicar (passo a passo)

1. No [Console do Firebase](https://console.firebase.google.com/) → projeto **progrtotal**:
   - **Authentication → Método de login → E-mail/senha → Ativar**.
   - **Firestore Database → Criar banco de dados** (modo produção; região `southamerica-east1`, se quiser São Paulo).
2. No seu computador (com Node.js instalado):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy          # publica o site + as regras do Firestore
   ```
   O site fica em `https://progrtotal.web.app`.
3. **Ativar o admin:** cadastre-se no site com `rafael.glaucio2@gmail.com`, abra o link de verificação que chega por e-mail e clique em **“Já confirmei”** (ou saia e entre de novo). O menu **Admin / TI** fica liberado.

> A verificação do e-mail é exigida de propósito: sem ela, qualquer pessoa poderia cadastrar esse e-mail antes e ganhar acesso de administrador.

Para testar localmente: `firebase serve` ou `npx serve public` (o login funciona em `localhost`).

### Adicionar outro administrador
Inclua o e-mail em `ADMIN_EMAILS` (`public/js/firebase.js`) **e** na função `isAdmin()` de `firestore.rules`, e então rode `firebase deploy` de novo.

## Segurança

- O `firebaseConfig` do app web é público por natureza. A proteção vem das regras em `firestore.rules`: cada aluno só lê e escreve os próprios dados, e só o admin verificado lê todos.
- **Nunca** coloque o JSON de *service account* (chave privada do Admin SDK) no repositório nem no site. O `.gitignore` já bloqueia esses arquivos.

## Ciência de Dados / Data Science

Acesse **Data Science / Ciência de Dados** no menu (`#/dados`).

- Explicações em pares: inglês na primeira linha, português logo abaixo.
- Nove etapas: Python, NumPy, Pandas, APIs/SQL, gráficos, estatística, machine learning, entrega e portfólio.
- Plano inicial de cinco dias com prática diária e critérios de avanço.
- Projeto para baixar em Python: API de Localidades do IBGE → validação → Pandas/NumPy → CSV e gráfico Matplotlib.
- Programas e instalação: Colab ou Python/VS Code/Jupyter; exemplos Windows usam o interpretador do venv sem exigir ativação.
- Cada etapa pode ser marcada/desmarcada e salva no campo `progress.ds_<etapa>` da conta Firestore. Conta como tópico na pontuação existente; a seção possui seu próprio indicador de progresso.
- Pratique NumPy, Pandas e Matplotlib no navegador. O laboratório de API usa `pyodide.http.pyfetch`; o projeto para baixar usa Requests no Python local/Colab.
- Conteúdo e interface em `public/js/ciencia-dados.js`; laboratórios e exercícios em `public/js/dados-pratica.js`; estilos em `public/css/ciencia-dados.css`.

O PR deve ter **main** como destino, pois o workflow existente publica o canal `live` ao receber push em `main`. O workflow de PR publica uma prévia no Firebase. Ambos usam o secret já configurado `FIREBASE_SERVICE_ACCOUNT_PROGRTOTAL`. Não é necessário alterar regras do Firestore.


### Caixas de areia de Ciência de Dados

Em **Ciência de Dados → Caixas de areia e exercícios**, há quatro laboratórios independentes, com editor, executar, restaurar e código salvo por conta:

| Laboratório | Prática | Rota |
|---|---|---|
| NumPy | Arrays, máscaras e média | `#/dadoslab/lab/numpy` |
| Pandas | CSV, receita e agrupamento | `#/dadoslab/lab/pandas` |
| Matplotlib | Gráfico de barras exibido no app e download PNG | `#/dadoslab/lab/charts` |
| API IBGE | Coleta HTTP real usando `await pyfetch(...)` | `#/dadoslab/lab/api` |

Os dez exercícios guiados possuem enunciado e dica em inglês/português, código inicial editável, solução, saída esperada, correção por testes Python e navegação para o próximo: arrays, máscaras, receita, filtro/ordenação, limpeza, agrupamento, junção, JSON aninhado, média/mediana e gráfico com título/eixos. Comece em `#/dadoslab/ex/array`.

#### Dados, gráficos e persistência

- `ds_sales.csv`, `ds_dirty.csv`, `ds_orders.csv`, `ds_clients.csv` e `ds_api.json` são **dados fictícios de treinamento**. O JSON simula a estrutura da API, sem representar a lista completa do Brasil. Os arquivos são restaurados a cada execução para permitir repetir os exercícios.
- Os testes não dependem da API estar no ar. Somente o laboratório IBGE usa a API real e exige rede/CORS; falhas aparecem na saída, sem substituir os dados silenciosamente.
- Pyodide baixa Python e bibliotecas na primeira utilização. Matplotlib usa o backend Agg; até cinco figuras abertas ao final da execução são enviadas como PNG para a saída, com limite de 5 MB por figura. Não use `plt.close()` antes do fim se quiser visualizar a figura.
- Código fica em `users/{uid}/codigos/dados_lab_<id>` ou `dados_ex_<id>`, com cópia local por usuário. Tentativas e resolução seguem o modelo existente do sandbox.
- Conclusão dos exercícios: `users/{uid}.progress.dsx_<id>`, 25 pontos por exercício, sem duplicar pontos ao verificar de novo. O indicador da seção mostra as dez práticas; o percentual geral das trilhas de linguagens continua separado.
- A execução permanece em Web Worker dentro do iframe isolado. O limite de 20 segundos de execução Python permanece; download inicial das bibliotecas acontece antes desse cronômetro.
- Nenhuma mudança nas regras Firestore é necessária.

#### Verificação

Com Node.js e Python com `numpy`, `pandas` e `matplotlib` instalados:

```bash
node tests/data-science.mjs
```

O teste executa todas as soluções e os verificadores no Python, rejeita respostas incorretas e confere os três laboratórios locais. A integração visual Pyodide e a coleta HTTP precisam de internet no navegador. O fluxo de publicação permanece: PR → prévia Firebase; merge em `main` → produção.
