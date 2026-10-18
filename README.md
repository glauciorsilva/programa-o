# ProgrTotal — Roadmap de Programação

Sistema web (desktop e celular) com roadmap de estudos, do básico ao avançado, com login, cronômetro de estudo e painel de administração.

## Conteúdo

**Aba Linguagens** (da mais fácil à mais complexa):
1. HTML · 2. CSS · 3. Python · 4. JavaScript/TypeScript · 5. React · 6. Go · 7. C# · 8. Java

**Aba Bancos de Dados:**
1. SQL (fundamentos) · 2. MySQL

Cada trilha tem os níveis **Básico, Intermediário e Avançado** (3 tópicos por nível, 90 no total). Cada tópico traz:
- 🧒 explicação “para uma criança de 5 anos”
- 💻 código pronto para copiar
- 💼 caso real de trabalho
- 🎤 pergunta de entrevista com resposta
- 🔎 termos para pesquisar quando travar

Também há a página **Como pesquisar**, um guia para ler erros, pesquisar e usar a documentação.

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
  js/content/*.js       conteúdo das trilhas (fácil de editar)
firestore.rules         regras de segurança
firebase.json
```

### Dados no Firestore

```
users/{uid}
  name, email, createdAt, lastAccess, totalSeconds, sessionsCount
  progress: { "<topicoId>": timestamp }      ex.: python_b1, sql_a3
  daily:    { "dAAAAMMDD": segundos }
users/{uid}/sessions/{id}
  start, lastPing, seconds, device, userAgent
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
