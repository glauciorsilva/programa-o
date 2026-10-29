// Nível Iniciante da trilha mysql: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é o MySQL, saber como ele é instalado e aberto, criar seu primeiro banco e tabela e guardar e ver dados com INSERT e SELECT.",
  topicos: [
    {
      titulo: "O que é o MySQL (e a diferença para SQL)",
      crianca: `Pense em um <b>caderno de anotações gigante e muito organizado</b>, que guarda as informações de uma loja: clientes, produtos, vendas. O <b>MySQL</b> é o “bibliotecário” que cuida desse caderno. Para pedir algo a ele, você fala uma língua chamada <b>SQL</b>. Ou seja: <b>SQL é a língua</b>, e <b>MySQL é o programa que entende essa língua</b>.`,
      passos: [
        {
          titulo: "Banco de dados: um lugar para guardar informações",
          html: `<p>Um <b>banco de dados</b> é um lugar no computador onde as informações ficam guardadas de forma organizada, para não se perderem e serem achadas rápido. É como um armário de fichas da padaria: uma ficha para cada cliente.</p>
<p>O programa que cuida desse armário se chama <b>SGBD</b> (Sistema Gerenciador de Banco de Dados). O MySQL é um SGBD: ele guarda, procura e organiza os dados para você.</p>`,
          pratica: [
            m("O que é um banco de dados?", ["Um lugar organizado para guardar informações", "Um banco onde se guarda dinheiro", "Um tipo de computador", "Um jogo de computador"], 0, "Banco de dados é onde as informações ficam guardadas de forma organizada, como um armário de fichas."),
            vf("O MySQL é um SGBD, ou seja, um programa que cuida de bancos de dados.", true, "Isso mesmo: SGBD é o programa que guarda e organiza os dados, e o MySQL é um deles.")
          ]
        },
        {
          titulo: "SQL é a língua, MySQL é o programa",
          html: `<p><b>SQL</b> é uma <b>linguagem</b>: um jeito combinado de escrever pedidos para um banco de dados. O pedido do quadro abaixo, por exemplo, quer dizer “me mostre os nomes dos produtos”.</p>
<p>O <b>MySQL</b> é um <b>programa</b> que lê esse pedido, procura os dados e devolve a resposta. Existem outros programas que também entendem SQL (como PostgreSQL e SQL Server), assim como várias pessoas falam português.</p>`,
          codigo: c`SELECT nome FROM produtos;`,
          pratica: [
            m("Qual frase está certa?", ["SQL é a língua; MySQL é o programa que entende essa língua", "SQL e MySQL são exatamente a mesma coisa", "MySQL é a língua; SQL é o programa", "SQL é um site da internet"], 0, "SQL é a linguagem dos pedidos; o MySQL é o programa que recebe e responde esses pedidos."),
            vf("Só o MySQL entende SQL; nenhum outro programa entende.", false, "Vários programas entendem SQL: PostgreSQL, SQL Server, SQLite, Oracle... O MySQL é só um deles.")
          ]
        },
        {
          titulo: "Servidor e cliente: quem guarda e quem pede",
          html: `<p>O MySQL funciona como um <b>servidor</b>: um programa que fica ligado o tempo todo, guardando os dados e esperando pedidos. É como a <b>cozinha</b> de um restaurante.</p>
<p>Quem faz os pedidos é o <b>cliente</b>: um programa onde você digita o SQL (como o MySQL Workbench) ou o próprio site da loja. É como o <b>garçom</b> que leva o pedido até a cozinha e traz o prato de volta.</p>`,
          pratica: [
            m("No MySQL, quem fica ligado guardando os dados e esperando pedidos?", ["O servidor", "O cliente", "O teclado", "O navegador"], 0, "O servidor é a “cozinha”: guarda os dados e responde aos pedidos que chegam."),
            m("E o que é o cliente?", ["O programa que envia os pedidos ao servidor", "A pessoa que compra na loja", "O lugar onde os dados ficam guardados", "Um tipo de tabela"], 0, "O cliente é o “garçom”: um programa (como o Workbench ou um site) que manda o pedido em SQL e recebe a resposta.")
          ]
        },
        {
          titulo: "Onde o MySQL é usado",
          html: `<p>O MySQL é <b>gratuito</b> e muito popular. Ele está por trás de muitos sites que você usa: o <b>WordPress</b> (que roda blogs e sites de empresas) guarda os posts e usuários no MySQL; <b>lojas virtuais</b> guardam produtos, clientes e pedidos nele; sistemas de escolas, clínicas e padarias também.</p>
<p>Quando você faz login num site e ele “lembra” do seu nome, provavelmente um banco como o MySQL buscou essa informação.</p>`,
          pratica: [
            vf("O WordPress usa o MySQL para guardar posts e usuários.", true, "Isso mesmo: o WordPress guarda tudo (posts, páginas, usuários) num banco MySQL."),
            m("O que uma loja virtual guardaria no MySQL?", ["Produtos, clientes e pedidos", "Só as fotos do logotipo", "A senha do Wi-Fi da loja", "Nada, loja não usa banco"], 0, "Lojas virtuais guardam no banco os produtos, os clientes e os pedidos, para achar tudo rapidinho.")
          ]
        }
      ],
      codigo: c`-- Um pedido em SQL para o MySQL:
-- "me mostre o nome e o preço de cada produto"
SELECT nome, preco FROM produtos;`,
      partes: [
        ["-- Um pedido em SQL", "Linhas que começam com `--` são comentários: anotações para pessoas. O MySQL ignora."],
        ["SELECT nome, preco", "`SELECT` quer dizer “selecione/mostre”. Depois dele vêm as colunas que você quer ver."],
        ["FROM produtos", "`FROM` quer dizer “de onde”: aqui, da tabela `produtos`."],
        [";", "O ponto e vírgula marca o fim do pedido, como o ponto final de uma frase."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b>: aqui no navegador já existe uma loja de exemplo com a tabela <code>produtos</code>. Você não precisa instalar nada para praticar.",
      trabalho: `Em quase toda empresa existe um banco de dados. Um analista pede ao MySQL “quantos pedidos tivemos hoje?”, um site de loja pede “quais produtos estão em promoção?”. Tudo isso é SQL sendo enviado a um servidor MySQL.`,
      entrevista: {
        pergunta: "Qual a diferença entre SQL e MySQL?",
        resposta: `<b>SQL</b> é a linguagem usada para conversar com bancos de dados relacionais. <b>MySQL</b> é um SGBD, um programa (servidor) que guarda os dados e entende SQL. Outros SGBDs, como PostgreSQL e SQL Server, também usam SQL, com pequenas diferenças entre si.`
      },
      busca: ["o que é mysql", "diferença entre sql e mysql", "o que é banco de dados para iniciantes"]
    },
    {
      titulo: "Instalando e abrindo (sem medo)",
      crianca: `Instalar o MySQL é como <b>montar a cozinha</b> do restaurante: você instala o servidor (a cozinha) e um programa para fazer pedidos (o balcão). Para entrar na cozinha, precisa de um <b>usuário e uma senha</b>, como o crachá de um funcionário. E a boa notícia: aqui no site você pode praticar <b>sem instalar nada</b>, porque o sandbox simula um MySQL.`,
      passos: [
        {
          titulo: "Dois jeitos fáceis de instalar",
          html: `<p><b>Jeito 1 — MySQL Installer + MySQL Workbench</b> (oficial): no site <code>dev.mysql.com</code>, baixe o instalador, clique em “Next” nas telas e escolha uma senha. O <b>Workbench</b> é uma janela bonita onde você escreve SQL e vê as tabelas.</p>
<p><b>Jeito 2 — XAMPP</b>: um pacote que instala tudo de uma vez (inclui um banco compatível com o MySQL, chamado MariaDB). Você abre o painel do XAMPP, clica em <b>Start</b> ao lado de “MySQL” e acessa o <b>phpMyAdmin</b> pelo navegador.</p>`,
          pratica: [
            m("Para que serve o MySQL Workbench?", ["É uma janela para escrever SQL e ver as tabelas", "É um antivírus", "É um editor de fotos", "É um navegador de internet"], 0, "O Workbench é um programa cliente: você escreve os pedidos em SQL e vê os resultados em tabelas."),
            vf("No XAMPP, é preciso clicar em Start ao lado de MySQL para ligar o servidor.", true, "Isso: o painel do XAMPP liga e desliga o servidor. Depois é só abrir o phpMyAdmin no navegador.")
          ]
        },
        {
          titulo: "Usuário e senha: o crachá do banco",
          html: `<p>Para entrar no servidor, você precisa de um <b>usuário</b> e uma <b>senha</b>. Na instalação já vem um usuário chamado <b>root</b>: ele é o “dono”, pode fazer tudo.</p>
<p>Guarde bem a senha do root que você escolheu na instalação! (No XAMPP, o root vem <b>sem senha</b>, o que só é aceitável no seu computador de estudos, nunca num servidor de verdade.)</p>`,
          pratica: [
            m("Quem é o usuário `root` no MySQL?", ["O usuário principal, que pode fazer tudo", "Um usuário que só pode ler", "Uma tabela especial", "O nome do servidor"], 0, "O `root` é o administrador: tem todas as permissões. Por isso a senha dele precisa ser bem guardada."),
            vf("Deixar o root sem senha num servidor de verdade, na internet, é uma boa ideia.", false, "Nunca! Sem senha, qualquer pessoa poderia entrar e apagar tudo. Sem senha, só no computador de estudos.")
          ]
        },
        {
          titulo: "Abrindo e se conectando",
          html: `<p>No <b>Workbench</b>, clique na caixinha “Local instance” e digite a senha do root. Pronto: você está <b>conectado</b> (o cliente achou o servidor).</p>
<p>Pelo <b>terminal</b> (a tela preta de comandos), o pedido de conexão é <code>mysql -u root -p</code>: <code>-u</code> diz o usuário e <code>-p</code> faz o MySQL perguntar a senha.</p>`,
          codigo: c`mysql -u root -p`,
          pratica: [
            l("Complete o comando do terminal para entrar com o usuário root:", c`mysql -u ____ -p`, ["root"], "Depois do `-u` vem o nome do usuário: `mysql -u root -p`."),
            m("No comando `mysql -u root -p`, o que faz o `-p`?", ["Faz o MySQL pedir a senha", "Imprime a tela", "Apaga o banco", "Escolhe a porta"], 0, "O `-p` (de password, senha) faz o MySQL perguntar a senha antes de entrar.")
          ]
        },
        {
          titulo: "Primeiro “oi” para o servidor",
          html: `<p>Conectado, faça um pedido simples para ver se tudo funciona. <code>SHOW DATABASES;</code> mostra os bancos do servidor e <code>SHOW TABLES;</code> mostra as tabelas do banco atual.</p>
<p>Aqui no site, o botão <b>▶ Testar no sandbox</b> faz o papel do Workbench: ele simula um servidor com um único banco (por isso o <code>SHOW DATABASES</code> é só ignorado, com um aviso).</p>`,
          codigo: c`SHOW TABLES;`,
          pratica: [
            l("Complete para listar as tabelas do banco:", c`SHOW ____;`, ["TABLES"], "`SHOW TABLES;` mostra todas as tabelas do banco em que você está."),
            vf("Para praticar o MySQL aqui no site, é obrigatório instalar o MySQL antes.", false, "Não precisa: o sandbox do site simula o MySQL no próprio navegador. Instalar é para quando quiser praticar no seu computador.")
          ]
        }
      ],
      codigo: c`-- No terminal (fora do MySQL), para conectar:
-- mysql -u root -p

-- Já conectado, alguns pedidos para se situar:
SHOW DATABASES;
SHOW TABLES;
DESCRIBE produtos;`,
      partes: [
        ["-- mysql -u root -p", "Comando do terminal para entrar no servidor como `root`. Fica como comentário aqui porque não é SQL."],
        ["SHOW DATABASES;", "Lista os bancos do servidor. No sandbox só existe um, então ele é ignorado."],
        ["SHOW TABLES;", "Lista as tabelas do banco atual (no sandbox: a loja de exemplo)."],
        ["DESCRIBE produtos;", "Mostra as colunas da tabela `produtos`: nome, tipo de cada informação etc."]
      ],
      nota: "No Workbench, você escreve o SQL na área de cima e clica no <b>raio</b> (⚡) para executar. O resultado aparece embaixo, numa tabela.",
      trabalho: `No primeiro dia num emprego, você recebe um usuário e uma senha do banco, abre o Workbench (ou o DBeaver), conecta e usa <code>SHOW TABLES</code> e <code>DESCRIBE</code> para descobrir o que existe ali.`,
      entrevista: {
        pergunta: "Por que a aplicação não deve usar o usuário root?",
        resposta: `Porque o <b>root</b> pode fazer tudo, inclusive apagar bancos inteiros. Se a senha vazar ou houver um erro no sistema, o estrago é total. O certo é criar um usuário só com as permissões necessárias (você verá isso no nível Intermediário).`
      },
      busca: ["instalar mysql workbench windows", "xampp phpmyadmin tutorial", "mysql -u root -p"]
    },
    {
      titulo: "Criando seu primeiro banco e tabela",
      crianca: `Um <b>banco de dados</b> é como uma <b>pasta</b> para um assunto (a pasta da padaria). Dentro dela ficam as <b>tabelas</b>, que são como <b>planilhas</b>: cada coluna é um tipo de informação (nome, quantidade) e cada linha é um item (um pão). Primeiro criamos a pasta, entramos nela e depois desenhamos a planilha.`,
      passos: [
        {
          titulo: "Criar o banco: CREATE DATABASE",
          html: `<p><code>CREATE DATABASE</code> quer dizer “crie um banco de dados”. Depois vem o nome que você escolher, sem espaços e sem acentos (use <code>_</code> no lugar do espaço).</p>
<p>No sandbox existe um único banco, então este comando é apenas <b>ignorado</b> (aparece um aviso). Num MySQL de verdade ele cria a “pasta” nova.</p>`,
          codigo: c`CREATE DATABASE padaria;`,
          pratica: [
            l("Complete para criar o banco chamado escola:", c`CREATE ____ escola;`, ["DATABASE", "SCHEMA"], "`CREATE DATABASE escola;` cria um banco novo chamado `escola`."),
            vf("`CREATE DATABASE minha padaria;` (com espaço no nome) funciona normalmente.", false, "Nomes com espaço dão erro. Use `minha_padaria`, com sublinhado.")
          ]
        },
        {
          titulo: "Entrar no banco: USE",
          html: `<p>Criar o banco não basta: é preciso dizer “agora vou trabalhar <b>nesta</b> pasta”. Para isso existe o <code>USE</code>. Tudo o que você criar depois vai para dentro desse banco.</p>
<p>No sandbox, o <code>USE</code> também é ignorado, porque só existe um banco.</p>`,
          codigo: c`USE padaria;`,
          pratica: [
            m("Para que serve `USE padaria;`?", ["Escolhe o banco padaria para trabalhar nele", "Apaga o banco padaria", "Cria a tabela padaria", "Mostra os pães"], 0, "O `USE` escolhe em qual banco os próximos comandos vão valer."),
            l("Complete para começar a trabalhar no banco loja:", c`____ loja;`, ["USE"], "`USE loja;` entra no banco `loja`.")
          ]
        },
        {
          titulo: "Criar a tabela: CREATE TABLE",
          html: `<p><code>CREATE TABLE</code> cria uma tabela. Depois do nome, entre <b>parênteses</b>, você lista as colunas, <b>separadas por vírgula</b>. Cada coluna tem um <b>nome</b> e um <b>tipo</b> (que tipo de informação ela guarda).</p>`,
          codigo: c`CREATE TABLE paes (
  nome VARCHAR(50),
  quantidade INT
);`,
          pratica: [
            m("No código acima, quantas colunas a tabela `paes` tem?", ["2", "1", "3", "50"], 0, "São duas colunas: `nome` e `quantidade`. O 50 é o tamanho máximo do texto do nome."),
            vf("As colunas dentro do CREATE TABLE são separadas por vírgula.", true, "Isso: uma vírgula entre cada coluna. Depois da última, não vai vírgula, só o parêntese que fecha.")
          ]
        },
        {
          titulo: "Os dois tipos mais usados: INT e VARCHAR",
          html: `<p><code>INT</code> (de <i>integer</i>, inteiro) guarda <b>números inteiros</b>: quantidade, idade, número de páginas.</p>
<p><code>VARCHAR(n)</code> guarda <b>texto</b> de até <code>n</code> letras: nome, cidade, telefone. <code>VARCHAR(50)</code> aceita até 50 caracteres.</p>`,
          codigo: c`CREATE TABLE clientes (
  nome VARCHAR(100),
  idade INT
);`,
          pratica: [
            m("Qual tipo é melhor para guardar o NOME de um cliente?", ["VARCHAR(100)", "INT", "Nenhum, nome não se guarda", "SUM"], 0, "Nome é texto, então usamos `VARCHAR`, com um tamanho máximo, como 100."),
            l("Complete o tipo da coluna estoque (um número inteiro):", c`CREATE TABLE produtos (
  nome VARCHAR(80),
  estoque ____
);`, ["INT", "INTEGER"], "Quantidade em estoque é número inteiro: `INT`.")
          ]
        }
      ],
      codigo: c`CREATE DATABASE padaria;
USE padaria;

CREATE TABLE paes (
  nome VARCHAR(50),
  quantidade INT
);

DESCRIBE paes;`,
      partes: [
        ["CREATE DATABASE padaria;", "Cria o banco (a “pasta”) `padaria`. No sandbox é ignorado."],
        ["USE padaria;", "Entra no banco `padaria`. No sandbox também é ignorado."],
        ["CREATE TABLE paes (", "Começa a criar a tabela `paes`. As colunas vêm dentro dos parênteses."],
        ["nome VARCHAR(50),", "Coluna de texto com até 50 letras. A vírgula separa da próxima coluna."],
        ["quantidade INT", "Coluna de número inteiro. É a última, então não leva vírgula."],
        ["DESCRIBE paes;", "Mostra as colunas da tabela recém-criada, para conferir se ficou certo."]
      ],
      sandbox: { db: "vazio" },
      nota: "No sandbox você começa com um banco vazio: a tabela é criada de verdade e o <code>DESCRIBE</code> mostra o resultado.",
      trabalho: `Quando um sistema novo começa (o cadastro de alunos de uma escola, o estoque de uma padaria), alguém cria o banco e desenha as tabelas: quais colunas, de que tipo. É o primeiro passo de qualquer sistema com dados.`,
      entrevista: {
        pergunta: "Qual a diferença entre um banco de dados e uma tabela?",
        resposta: `O <b>banco</b> é o conjunto (a “pasta”) de um sistema; a <b>tabela</b> fica dentro dele e guarda um tipo de coisa (clientes, produtos), em linhas e colunas. Um banco normalmente tem várias tabelas.`
      },
      busca: ["mysql create database", "mysql create table exemplo", "mysql int varchar"]
    },
    {
      titulo: "Colocando e vendo dados: INSERT e SELECT",
      crianca: `A tabela é uma <b>planilha em branco</b>. Com <code>INSERT</code> você <b>escreve uma linha nova</b> nela (como anotar um item na lista de compras). Com <code>SELECT</code> você <b>lê</b> o que está anotado. Escrever e ler: é isso que mais se faz num banco de dados.`,
      passos: [
        {
          titulo: "Colocar uma linha: INSERT INTO ... VALUES",
          html: `<p><code>INSERT INTO</code> quer dizer “insira dentro de”. Depois vem o nome da tabela e, entre parênteses, as colunas que você vai preencher. Em seguida, <code>VALUES</code> (valores) e os valores, <b>na mesma ordem</b> das colunas.</p>`,
          codigo: c`INSERT INTO paes (nome, quantidade) VALUES ('Pão francês', 30);`,
          pratica: [
            l("Complete com a palavra que vem antes dos valores:", c`INSERT INTO paes (nome, quantidade) ____ ('Sonho', 12);`, ["VALUES"], "Depois das colunas vem `VALUES` e, entre parênteses, os valores."),
            m("No exemplo acima, qual valor vai para a coluna `quantidade`?", ["30", "Pão francês", "paes", "nome"], 0, "Os valores seguem a ordem das colunas: `nome` recebe 'Pão francês' e `quantidade` recebe 30.")
          ]
        },
        {
          titulo: "Texto entre aspas, número sem aspas",
          html: `<p>Valores de <b>texto</b> vão entre <b>aspas simples</b>: <code>'Sonho'</code>. <b>Números</b> vão sem aspas: <code>12</code>.</p>
<p>Se esquecer as aspas no texto, o MySQL acha que <code>Sonho</code> é o nome de uma coluna e mostra um erro.</p>`,
          codigo: c`INSERT INTO paes (nome, quantidade) VALUES ('Sonho', 12);`,
          pratica: [
            vf("Em `VALUES ('Sonho', 12)`, o 12 precisa estar entre aspas.", false, "Números vão sem aspas. Só o texto ('Sonho') leva aspas."),
            l("Complete com o texto Broa (lembre das aspas):", c`INSERT INTO paes (nome, quantidade) VALUES (____, 8);`, ["'Broa'", "\"Broa\""], "Texto vai entre aspas simples: `'Broa'`.")
          ]
        },
        {
          titulo: "Várias linhas de uma vez",
          html: `<p>Dá para colocar várias linhas num INSERT só: cada linha fica entre parênteses e elas são separadas por <b>vírgula</b>.</p>`,
          codigo: c`INSERT INTO paes (nome, quantidade) VALUES
  ('Croissant', 10),
  ('Pão de queijo', 40);`,
          pratica: [
            m("Quantas linhas o INSERT acima coloca na tabela?", ["2", "1", "4", "Nenhuma"], 0, "São dois grupos de parênteses: `('Croissant', 10)` e `('Pão de queijo', 40)`, então duas linhas.")
          ]
        },
        {
          titulo: "Ver tudo: SELECT * FROM",
          html: `<p><code>SELECT</code> mostra dados. O <code>*</code> (asterisco) quer dizer “<b>todas as colunas</b>”. Então <code>SELECT * FROM paes;</code> é “mostre tudo da tabela paes”.</p>`,
          codigo: c`SELECT * FROM paes;`,
          pratica: [
            m("O que o `*` significa em `SELECT * FROM paes;`?", ["Todas as colunas", "Multiplicar", "Apagar tudo", "Só a primeira linha"], 0, "No SELECT, o `*` quer dizer “todas as colunas”."),
            l("Complete para ver todos os dados da tabela clientes:", c`SELECT * ____ clientes;`, ["FROM"], "`FROM` diz de qual tabela os dados vêm: `SELECT * FROM clientes;`.")
          ]
        },
        {
          titulo: "Ver só algumas colunas",
          html: `<p>Em vez do <code>*</code>, você pode escrever os nomes das colunas que quer ver, separados por vírgula. Assim a resposta fica mais limpa.</p>`,
          codigo: c`SELECT nome FROM paes;`,
          pratica: [
            vf("`SELECT nome FROM paes;` mostra só a coluna nome de todos os pães.", true, "Isso: só a coluna pedida aparece, uma linha para cada pão."),
            l("Complete para ver só a quantidade dos pães:", c`SELECT ____ FROM paes;`, ["quantidade"], "Escreva o nome da coluna depois do SELECT: `SELECT quantidade FROM paes;`.")
          ]
        }
      ],
      codigo: c`CREATE TABLE paes (
  nome VARCHAR(50),
  quantidade INT
);

INSERT INTO paes (nome, quantidade) VALUES ('Pão francês', 30);
INSERT INTO paes (nome, quantidade) VALUES
  ('Sonho', 12),
  ('Pão de queijo', 40);

SELECT * FROM paes;`,
      partes: [
        ["CREATE TABLE paes (...)", "Cria a tabela que vai receber os dados (como no tópico anterior)."],
        ["INSERT INTO paes (nome, quantidade)", "Diz em qual tabela e em quais colunas os valores vão entrar."],
        ["VALUES ('Pão francês', 30);", "Os valores, na mesma ordem das colunas. Texto com aspas, número sem."],
        ["('Sonho', 12),\n  ('Pão de queijo', 40);", "Duas linhas no mesmo INSERT, separadas por vírgula."],
        ["SELECT * FROM paes;", "Mostra todas as colunas de todas as linhas: os três pães."]
      ],
      sandbox: { db: "vazio" },
      nota: "Teste no sandbox e acrescente seus pães preferidos. Depois troque o <code>*</code> por <code>nome</code> e veja a diferença.",
      trabalho: `Toda vez que alguém se cadastra num site, o sistema faz um <code>INSERT</code>. Toda vez que você abre a lista de produtos de uma loja, o sistema faz um <code>SELECT</code>. São os dois comandos mais usados do dia a dia.`,
      entrevista: {
        pergunta: "Por que é bom listar as colunas no INSERT, em vez de só escrever os valores?",
        resposta: `Porque fica claro qual valor vai para qual coluna e o comando continua funcionando mesmo que alguém acrescente uma coluna nova na tabela. Sem a lista, os valores precisam vir em <b>todas</b> as colunas, na ordem exata da tabela.`
      },
      busca: ["mysql insert into values", "mysql select from", "sql insert várias linhas"]
    }
  ],
  fixacao: [
    m("Qual é a relação entre SQL e MySQL?", ["SQL é a linguagem; MySQL é um programa que entende SQL", "São dois nomes para o mesmo programa", "MySQL é uma linguagem e SQL é um site", "Não têm relação nenhuma"], 0, "SQL é a língua dos pedidos; o MySQL é um dos programas (SGBDs) que falam essa língua."),
    vf("No MySQL, o servidor é quem guarda os dados e responde aos pedidos.", true, "Certo: o servidor fica ligado guardando os dados; o cliente envia os pedidos."),
    m("Qual destes é um programa cliente para conversar com o MySQL?", ["MySQL Workbench", "Microsoft Paint", "Calculadora", "Bloco de notas do celular"], 0, "O Workbench é o cliente oficial: nele você escreve SQL e vê os resultados."),
    vf("O usuário root é o administrador, com permissão para fazer tudo.", true, "Isso: por isso a senha do root deve ser bem guardada."),
    l("Complete para criar o banco loja:", c`CREATE DATABASE ____;`, ["loja"], "O nome do banco vem depois de `CREATE DATABASE`: `CREATE DATABASE loja;`."),
    m("Qual comando escolhe o banco em que você vai trabalhar?", ["USE", "SELECT", "INSERT", "SHOW"], 0, "`USE nome_do_banco;` escolhe o banco. Os próximos comandos valem para ele."),
    m("Qual tipo guarda a IDADE de uma pessoa?", ["INT", "VARCHAR(100)", "TABLE", "VALUES"], 0, "Idade é um número inteiro, então `INT`."),
    l("Complete o tipo da coluna cidade (texto de até 60 letras):", c`CREATE TABLE clientes (
  cidade ____(60)
);`, ["VARCHAR"], "Texto com tamanho máximo é `VARCHAR(60)`."),
    vf("No INSERT, texto vai entre aspas simples e número vai sem aspas.", true, "Isso: `VALUES ('Ana', 25)`."),
    l("Complete o comando que coloca uma linha na tabela:", c`____ INTO produtos (nome, estoque) VALUES ('Caneca', 5);`, ["INSERT"], "`INSERT INTO` insere uma linha nova na tabela."),
    m("O que faz `SELECT * FROM produtos;`?", ["Mostra todas as colunas de todos os produtos", "Apaga todos os produtos", "Cria a tabela produtos", "Conta os produtos"], 0, "`SELECT` mostra, `*` é todas as colunas e `FROM produtos` diz a tabela."),
    vf("Para ver só o nome dos clientes, posso escrever `SELECT nome FROM clientes;`.", true, "Certo: em vez do `*`, você escreve só as colunas que quer ver.")
  ],
  checkpoints: {
    b1: [
      m("Qual comando escolhe o banco `loja` para os próximos comandos?", ["USE loja;", "SHOW loja;", "SELECT loja;", "OPEN loja;"], 0, "`USE loja;` seleciona o banco: o que vier depois vale para ele."),
      vf("`DESCRIBE produtos;` mostra as colunas da tabela produtos.", true, "Isso: o `DESCRIBE` lista as colunas, seus tipos e se aceitam vazio.")
    ],
    b2: [
      m("Qual tipo é o mais indicado para guardar um preço com centavos exatos?", ["DECIMAL(10,2)", "FLOAT", "VARCHAR(10)", "TINYINT"], 0, "Dinheiro usa `DECIMAL`, que é exato. `FLOAT` é aproximado e pode errar centavos."),
      vf("O CPF deve ser guardado como INT, para economizar espaço.", false, "Como número, o CPF perde os zeros à esquerda. O certo é texto, como `CHAR(11)`.")
    ],
    b3: [
      m("Qual função junta textos, como nome e sobrenome?", ["CONCAT", "UPPER", "NOW", "IFNULL"], 0, "`CONCAT(a, b, ...)` junta os textos em um só."),
      l("Complete para trocar o telefone vazio (NULL) por 'não informado':", c`SELECT ____(telefone, 'não informado') FROM clientes;`, ["IFNULL", "COALESCE"], "`IFNULL(valor, substituto)` devolve o substituto quando o valor é NULL.")
    ],
    i1: [
      m("Qual comando DÁ permissões a um usuário?", ["GRANT", "REVOKE", "DROP USER", "SHOW TABLES"], 0, "`GRANT` entrega permissões; `REVOKE` tira."),
      vf("A aplicação deve se conectar ao banco com o usuário root, para não ter problemas de permissão.", false, "Pelo princípio do menor privilégio, a aplicação usa um usuário só com o necessário, nunca o root.")
    ],
    i2: [
      vf("Uma view comum guarda uma cópia dos dados das tabelas.", false, "A view guarda só a consulta. Os dados são lidos das tabelas na hora em que você usa a view."),
      m("Como se consulta uma view chamada `vw_vendas_por_cliente`?", ["SELECT * FROM vw_vendas_por_cliente;", "CALL vw_vendas_por_cliente;", "RUN VIEW vw_vendas_por_cliente;", "USE vw_vendas_por_cliente;"], 0, "Depois de criada, a view é usada como se fosse uma tabela, com SELECT.")
    ],
    i3: [
      m("Qual comando executa a procedure `fechar_pedido` para o pedido 10?", ["CALL fechar_pedido(10);", "SELECT fechar_pedido 10;", "RUN fechar_pedido(10);", "EXEC PROCEDURE 10;"], 0, "Procedures são executadas com `CALL nome(parâmetros);`."),
      vf("O `DELIMITER $$` serve para o `;` dentro da procedure não encerrar o comando antes da hora.", true, "Isso: trocando o delimitador, o MySQL só considera a procedure pronta no `$$`.")
    ],
    a1: [
      m("Onde se roda o `mysqldump`?", ["No terminal, fora do MySQL", "Dentro de um SELECT", "Dentro de uma view", "Dentro de uma trigger"], 0, "O `mysqldump` é um programa do terminal, não um comando SQL."),
      vf("O `--single-transaction` faz o backup de tabelas InnoDB sem travá-las.", true, "Ele tira uma “foto” consistente dentro de uma transação, e o sistema continua funcionando.")
    ],
    a2: [
      m("Numa trigger de UPDATE, o que guarda os valores ANTES da alteração?", ["OLD", "NEW", "BEFORE", "LAST"], 0, "`OLD` tem os valores antigos; `NEW` tem os novos."),
      vf("Um evento (EVENT) é como um despertador: roda um comando em horários agendados.", true, "Isso: por exemplo, limpar sessões expiradas todo dia às 3h.")
    ],
    a3: [
      m("Para que serve o slow query log?", ["Registrar as consultas que demoram mais que o limite", "Fazer backup automático", "Criar usuários", "Apagar consultas antigas"], 0, "Ele anota as consultas lentas, para você descobrir o que precisa melhorar."),
      vf("Réplicas de leitura ajudam a dividir o peso das consultas de relatório.", true, "Isso: o BI lê da réplica e o servidor principal fica livre para as gravações.")
    ]
  }
};
