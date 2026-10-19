# ProgrTotal — Roadmap de Programação

Sistema web (desktop e celular) com roadmap de estudos, do básico ao avançado, com login, cronômetro de estudo e painel de administração.

## Conteúdo

**Aba Linguagens** (da mais fácil à mais complexa):
1. HTML · 2. CSS · 3. Python · 4. JavaScript/TypeScript · 5. React · 6. Go · 7. C# · 8. Java

**Aba Bancos de Dados:**
1. SQL (fundamentos) · 2. MySQL

> **Sobre o projeto:** o ProgrTotal apresenta ao estudante algumas das muitas linguagens de programação, como uma porta de entrada para o universo da tecnologia. Ele não apresenta nem ensina, por si só, tudo o que deve ser aprendido.

Cada trilha tem os níveis **Básico, Intermediário e Avançado** (3 tópicos por nível, 90 no total). Cada tópico traz:
- 📖 explicação do conceito (com analogia e detalhes)
- 💻 código pronto para copiar e testar no sandbox
- 🔍 o código explicado parte por parte (o que cada trecho faz e por que está lá)
- 💼 caso real de trabalho
- 🎤 pergunta de entrevista com resposta
- 🔎 termos para pesquisar na internet em caso de dúvida

Ao final de cada nível há **10 exercícios de fixação** (300 no total): múltipla escolha, verdadeiro/falso e “complete o código”, com correção na hora e explicação de cada resposta.

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
  sandbox/runner.html   ambiente isolado que executa o código do aluno
  sandbox/workers.js    executores de JS, Python (Pyodide) e SQL (sql.js)
firestore.rules         regras de segurança
firebase.json
```

### Dados no Firestore

```
users/{uid}
  name, email, createdAt, lastAccess, totalSeconds, sessionsCount
  progress: { "<topicoId>": timestamp }      ex.: python_b1, sql_a3, ex_python_basico (exercício)
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
