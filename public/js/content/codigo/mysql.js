// Exercícios de código da trilha mysql (completar e criar do zero), por tópico.
const c = String.raw;

const REAL = "Teste num MySQL real (ex.: MySQL Workbench ou o terminal mysql).";
const TERMINAL = "Teste num terminal com MySQL instalado (os comandos mysqldump/mysql rodam no terminal, não dentro do MySQL).";

// Estrutura de uma tabela (nome, tipo, NOT NULL, chave), tolerante a espaços e maiúsculas no tipo.
const estrutura = (t) => `SELECT name, UPPER(REPLACE(type, ' ', '')), "notnull", pk FROM pragma_table_info('${t}') ORDER BY cid`;

export default {
  b1: [
    {
      tipo: "completar",
      titulo: "Banco e tabela da padaria",
      enunciado: `A Padaria Pão Quente vai ganhar um sistema. Complete o script que:
        <ul>
          <li>cria o banco <code>padaria</code> com o conjunto de caracteres <code>utf8mb4</code> (aceita acentos e emojis);</li>
          <li>entra no banco <code>padaria</code>;</li>
          <li>cria a tabela <code>paes</code> com <code>id</code> numerado automaticamente e o engine <code>InnoDB</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta. (No sandbox existe um único banco, então o <code>CREATE DATABASE</code> e o <code>USE</code> são apenas ignorados, mas a tabela é criada de verdade.)`,
      dica: `Numeração automática no MySQL é <code>AUTO_INCREMENT</code>; o engine padrão, com transações, é o <code>InnoDB</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE DATABASE padaria CHARACTER SET ____;
USE ____;

CREATE TABLE paes (
  id INT UNSIGNED ____ PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  preco DECIMAL(6,2) NOT NULL
) ENGINE=____;

INSERT INTO paes (nome, preco) VALUES ('Pão francês', 0.80), ('Sonho', 4.50);
SELECT * FROM paes;
`,
      solucao: c`CREATE DATABASE padaria CHARACTER SET utf8mb4;
USE padaria;

CREATE TABLE paes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  preco DECIMAL(6,2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO paes (nome, preco) VALUES ('Pão francês', 0.80), ('Sonho', 4.50);
SELECT * FROM paes;`,
      padroes: [
        [/CREATE\s+DATABASE\s+padaria\s+CHARACTER\s+SET\s+utf8mb4\b/i, "Crie o banco padaria com CHARACTER SET utf8mb4."],
        [/USE\s+padaria\s*;/i, "Use USE padaria; para entrar no banco."],
        [/id\s+INT\s+UNSIGNED\s+AUTO_INCREMENT\s+PRIMARY\s+KEY/i, "O id deve ser INT UNSIGNED AUTO_INCREMENT PRIMARY KEY."],
        [/\)\s*ENGINE\s*=\s*InnoDB/i, "Termine a tabela com ENGINE=InnoDB."]
      ],
      verificacao: c`SELECT id, nome, preco FROM paes ORDER BY id`
    },
    {
      tipo: "completar",
      titulo: "Que tabelas existem aqui?",
      enunciado: `Você acabou de entrar no servidor da loja e precisa se situar. Complete o script para:
        <ol>
          <li>listar todas as tabelas do banco <code>loja</code>;</li>
          <li>mostrar as colunas da tabela <code>pedidos</code>.</li>
        </ol>
        Substitua cada <code>____</code> pelo comando certo.`,
      dica: `Um comando começa com <code>SHOW</code>; o outro “descreve” a tabela.`,
      lang: "sql",
      inicial: c`USE loja;

SHOW ____;
____ pedidos;
`,
      solucao: c`USE loja;

SHOW TABLES;
DESCRIBE pedidos;`,
      padroes: [[/SHOW\s+TABLES/i, "Use SHOW TABLES para listar as tabelas."]]
    },
    {
      tipo: "completar",
      titulo: "Tabela de alunos da escola",
      enunciado: `A secretaria da Escola Saber quer guardar os alunos. Complete a tabela <code>alunos</code>:
        <ul>
          <li><code>id</code>: inteiro <b>sem sinal</b> (nunca negativo), automático e chave primária;</li>
          <li><code>nome</code>: texto de até 100 caracteres, <b>obrigatório</b>;</li>
          <li><code>matriculado_em</code>: data e hora preenchida sozinha com o momento atual.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `“Sem sinal” é <code>UNSIGNED</code>. Obrigatório é <code>NOT NULL</code>. O momento atual como valor padrão é <code>CURRENT_TIMESTAMP</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE alunos (
  id INT ____ AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT ____,
  email VARCHAR(150),
  matriculado_em DATETIME DEFAULT ____
) ENGINE=InnoDB;

DESCRIBE alunos;
`,
      solucao: c`CREATE TABLE alunos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  matriculado_em DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

DESCRIBE alunos;`,
      padroes: [[/id\s+INT\s+UNSIGNED\s+AUTO_INCREMENT/i, "O id deve ser INT UNSIGNED AUTO_INCREMENT."]],
      verificacao: c`SELECT name, UPPER(REPLACE(type, ' ', '')), "notnull", pk, UPPER(dflt_value) FROM pragma_table_info('alunos') ORDER BY cid`
    },
    {
      tipo: "criar",
      titulo: "Cadastro de pacientes da clínica",
      enunciado: `A Clínica Bem-Estar precisa da tabela <code>pacientes</code>, no estilo MySQL. Crie-a com:
        <ul>
          <li><code>id</code> <code>INT UNSIGNED AUTO_INCREMENT PRIMARY KEY</code> (tudo na mesma linha);</li>
          <li><code>nome</code> <code>VARCHAR(120)</code> obrigatório;</li>
          <li><code>telefone</code> <code>VARCHAR(20)</code> (pode ficar vazio);</li>
          <li><code>criado_em</code> <code>DATETIME</code> com padrão <code>CURRENT_TIMESTAMP</code>;</li>
          <li>engine <code>InnoDB</code>.</li>
        </ul>
        Depois cadastre, <b>sem informar o id</b>, a paciente <code>'Maria Silva'</code> com telefone <code>'81999990000'</code> e o paciente <code>'José Santos'</code> sem telefone (<code>NULL</code>).`,
      dica: `No <code>INSERT</code>, liste só as colunas que você vai preencher: <code>INSERT INTO pacientes (nome, telefone) VALUES (...), (...);</code>. O id e a data se preenchem sozinhos.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- Crie a tabela pacientes (estilo MySQL, ENGINE=InnoDB)

-- Cadastre os dois pacientes sem informar o id
`,
      solucao: c`CREATE TABLE pacientes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  telefone VARCHAR(20),
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO pacientes (nome, telefone) VALUES
  ('Maria Silva', '81999990000'),
  ('José Santos', NULL);

SELECT * FROM pacientes;`,
      padroes: [
        [/AUTO_INCREMENT/i, "O id deve ser AUTO_INCREMENT."],
        [/\)\s*ENGINE\s*=\s*InnoDB/i, "Use ENGINE=InnoDB no fim do CREATE TABLE."]
      ],
      verificacao: c`SELECT p.id, p.nome, p.telefone, p.criado_em IS NOT NULL, (SELECT UPPER(REPLACE(type, ' ', '')) || "notnull" FROM pragma_table_info('pacientes') WHERE name = 'nome') FROM pacientes p ORDER BY p.id`
    },
    {
      tipo: "criar",
      titulo: "Banco do delivery com duas tabelas",
      enunciado: `Monte do zero o banco de um app de delivery:
        <ol>
          <li>crie o banco <code>delivery</code> com <code>CHARACTER SET utf8mb4</code> e entre nele com <code>USE</code>;</li>
          <li>crie <code>restaurantes</code>: <code>id</code> (<code>INT UNSIGNED AUTO_INCREMENT PRIMARY KEY</code>), <code>nome</code> <code>VARCHAR(100)</code> obrigatório e <code>cidade</code> <code>VARCHAR(60)</code>;</li>
          <li>crie <code>pratos</code>: <code>id</code> (igual ao de cima), <code>restaurante_id</code> <code>INT UNSIGNED</code> obrigatório, <code>nome</code> <code>VARCHAR(100)</code> obrigatório e <code>preco</code> <code>DECIMAL(8,2)</code> obrigatório, com uma <code>FOREIGN KEY (restaurante_id)</code> apontando para <code>restaurantes(id)</code>;</li>
          <li>as duas tabelas com <code>ENGINE=InnoDB</code>;</li>
          <li>termine com <code>SHOW TABLES;</code>.</li>
        </ol>`,
      dica: `Crie primeiro a tabela “pai” (<code>restaurantes</code>), porque <code>pratos</code> aponta para ela. A FK vai numa linha própria dentro do <code>CREATE TABLE</code>: <code>FOREIGN KEY (coluna) REFERENCES tabela(coluna)</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- 1) Banco delivery (utf8mb4) e USE

-- 2) Tabela restaurantes

-- 3) Tabela pratos, com FOREIGN KEY para restaurantes

-- 4) Liste as tabelas
`,
      solucao: c`CREATE DATABASE delivery CHARACTER SET utf8mb4;
USE delivery;

CREATE TABLE restaurantes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cidade VARCHAR(60)
) ENGINE=InnoDB;

CREATE TABLE pratos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  restaurante_id INT UNSIGNED NOT NULL,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(8,2) NOT NULL,
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
) ENGINE=InnoDB;

SHOW TABLES;`,
      padroes: [
        [/CREATE\s+DATABASE\s+delivery\s+CHARACTER\s+SET\s+utf8mb4/i, "Crie o banco delivery com CHARACTER SET utf8mb4."],
        [/USE\s+delivery\s*;/i, "Entre no banco com USE delivery;"],
        [/FOREIGN\s+KEY\s*\(\s*restaurante_id\s*\)\s*REFERENCES\s+restaurantes\s*\(\s*id\s*\)/i, "Falta a FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)."],
        [/ENGINE\s*=\s*InnoDB[\s\S]*ENGINE\s*=\s*InnoDB/i, "As duas tabelas devem ter ENGINE=InnoDB."],
        [/SHOW\s+TABLES\s*;?\s*$/i, "Termine com SHOW TABLES;"]
      ],
      verificacao: c`SELECT m.name, p.name, UPPER(REPLACE(p.type, ' ', '')), p."notnull", p.pk FROM sqlite_master m JOIN pragma_table_info(m.name) p WHERE m.type = 'table' AND m.name NOT LIKE 'sqlite_%' ORDER BY m.name, p.cid`
    }
  ],

  b2: [
    {
      tipo: "completar",
      titulo: "Tipos certos no cadastro de clientes",
      enunciado: `Escolha o tipo certo para cada coluna da tabela <code>clientes_novos</code>:
        <ul>
          <li><code>cpf</code>: texto de tamanho <b>fixo</b> com 11 caracteres (não pode ser número, senão perde o zero à esquerda);</li>
          <li><code>limite</code>: dinheiro com centavos exatos, 12 dígitos sendo 2 decimais;</li>
          <li><code>ativo</code>: “booleano” do MySQL, um inteiro bem pequeno de tamanho 1;</li>
          <li><code>plano</code>: só pode ser <code>'free'</code>, <code>'pro'</code> ou <code>'premium'</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo tipo.`,
      dica: `Os tipos são, nesta ordem: tamanho fixo, decimal exato, inteiro minúsculo e lista de opções fixas.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE clientes_novos (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome   VARCHAR(100) NOT NULL,
  cpf    ____(11) NOT NULL UNIQUE,
  limite ____(12,2) DEFAULT 0.00,
  ativo  ____(1) DEFAULT 1,
  plano  ____('free','pro','premium') DEFAULT 'free'
);

DESCRIBE clientes_novos;
`,
      solucao: c`CREATE TABLE clientes_novos (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome   VARCHAR(100) NOT NULL,
  cpf    CHAR(11) NOT NULL UNIQUE,
  limite DECIMAL(12,2) DEFAULT 0.00,
  ativo  TINYINT(1) DEFAULT 1,
  plano  ENUM('free','pro','premium') DEFAULT 'free'
);

DESCRIBE clientes_novos;`,
      padroes: [[/plano\s+ENUM\s*\(\s*'free'\s*,\s*'pro'\s*,\s*'premium'\s*\)/i, "plano deve ser ENUM('free','pro','premium')."]],
      verificacao: estrutura("clientes_novos")
    },
    {
      tipo: "completar",
      titulo: "Contas a pagar do financeiro",
      enunciado: `O financeiro quer registrar as contas a pagar. Complete os tipos:
        <ul>
          <li><code>valor</code>: dinheiro, <code>DECIMAL</code> com 10 dígitos e 2 casas (<b>nunca</b> <code>FLOAT</code>);</li>
          <li><code>vencimento</code>: só a data (dia/mês/ano);</li>
          <li><code>pago_em</code>: data <b>e</b> hora do pagamento, sem fuso horário.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Data pura é <code>DATE</code>; data com hora “como está” é <code>DATETIME</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE contas_pagar (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fornecedor VARCHAR(100) NOT NULL,
  valor      ____ NOT NULL,
  vencimento ____ NOT NULL,
  pago_em    ____
);

INSERT INTO contas_pagar (fornecedor, valor, vencimento, pago_em) VALUES
  ('Energia Elétrica', 845.37, '2026-10-10', '2026-10-09 14:32:00'),
  ('Aluguel', 3200.00, '2026-10-05', NULL);

SELECT * FROM contas_pagar;
`,
      solucao: c`CREATE TABLE contas_pagar (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fornecedor VARCHAR(100) NOT NULL,
  valor      DECIMAL(10,2) NOT NULL,
  vencimento DATE NOT NULL,
  pago_em    DATETIME
);

INSERT INTO contas_pagar (fornecedor, valor, vencimento, pago_em) VALUES
  ('Energia Elétrica', 845.37, '2026-10-10', '2026-10-09 14:32:00'),
  ('Aluguel', 3200.00, '2026-10-05', NULL);

SELECT * FROM contas_pagar;`,
      verificacao: estrutura("contas_pagar")
    },
    {
      tipo: "completar",
      titulo: "Preferências em uma coluna JSON",
      enunciado: `O app guarda as preferências de cada usuário em uma coluna <b>JSON</b>. Complete o script para:
        <ul>
          <li>declarar a coluna <code>preferencias</code> com o tipo JSON;</li>
          <li>na consulta, ler o campo <code>idioma</code> do JSON <b>como texto</b> (sem aspas).</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `No MySQL, <code>coluna-&gt;&gt;'$.campo'</code> extrai um campo do JSON já como texto.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL,
  preferencias ____
);

INSERT INTO usuarios (nome, preferencias) VALUES
  ('Lucas', '{"tema": "escuro", "idioma": "pt"}'),
  ('Rita',  '{"tema": "claro", "idioma": "en"}');

SELECT nome, preferencias ____ '$.____' AS idioma FROM usuarios;
`,
      solucao: c`CREATE TABLE usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL,
  preferencias JSON
);

INSERT INTO usuarios (nome, preferencias) VALUES
  ('Lucas', '{"tema": "escuro", "idioma": "pt"}'),
  ('Rita',  '{"tema": "claro", "idioma": "en"}');

SELECT nome, preferencias ->> '$.idioma' AS idioma FROM usuarios;`,
      padroes: [[/preferencias\s+JSON/i, "A coluna preferencias deve ser do tipo JSON."]]
    },
    {
      tipo: "criar",
      titulo: "Tabela de produtos do estoque",
      enunciado: `Crie a tabela <code>produtos_estoque</code> de uma loja de roupas com exatamente estas colunas, nesta ordem:
        <ul>
          <li><code>id</code>: <code>INT UNSIGNED AUTO_INCREMENT PRIMARY KEY</code>;</li>
          <li><code>sku</code>: código de tamanho fixo com 8 caracteres, obrigatório e único;</li>
          <li><code>nome</code>: <code>VARCHAR(120)</code> obrigatório;</li>
          <li><code>preco</code>: dinheiro com 10 dígitos e 2 casas, obrigatório;</li>
          <li><code>quantidade</code>: <code>SMALLINT UNSIGNED</code> com padrão 0;</li>
          <li><code>tamanho</code>: só aceita <code>'P'</code>, <code>'M'</code>, <code>'G'</code> ou <code>'GG'</code>;</li>
          <li><code>cadastrado_em</code>: <code>TIMESTAMP</code> com padrão <code>CURRENT_TIMESTAMP</code>.</li>
        </ul>
        Termine com <code>DESCRIBE produtos_estoque;</code>.`,
      dica: `Tamanho fixo é <code>CHAR(n)</code>; opções fixas são <code>ENUM(...)</code>; dinheiro é <code>DECIMAL(10,2)</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- Crie a tabela produtos_estoque com as 7 colunas pedidas

-- Mostre a estrutura com DESCRIBE
`,
      solucao: c`CREATE TABLE produtos_estoque (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sku           CHAR(8) NOT NULL UNIQUE,
  nome          VARCHAR(120) NOT NULL,
  preco         DECIMAL(10,2) NOT NULL,
  quantidade    SMALLINT UNSIGNED DEFAULT 0,
  tamanho       ENUM('P','M','G','GG'),
  cadastrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE produtos_estoque;`,
      padroes: [
        [/tamanho\s+ENUM\s*\(\s*'P'\s*,\s*'M'\s*,\s*'G'\s*,\s*'GG'\s*\)/i, "tamanho deve ser ENUM('P','M','G','GG')."],
        [/quantidade\s+SMALLINT\s+UNSIGNED/i, "quantidade deve ser SMALLINT UNSIGNED."],
        [/sku\s+CHAR\s*\(\s*8\s*\)[^,\n]*UNIQUE/i, "sku deve ser CHAR(8) NOT NULL UNIQUE."]
      ],
      verificacao: estrutura("produtos_estoque")
    },
    {
      tipo: "criar",
      titulo: "Agenda da clínica",
      enunciado: `Crie a tabela <code>consultas</code> com:
        <ul>
          <li><code>id</code> <code>INT UNSIGNED AUTO_INCREMENT PRIMARY KEY</code>;</li>
          <li><code>paciente</code> <code>VARCHAR(100)</code> obrigatório;</li>
          <li><code>dia</code> (só data) e <code>horario</code> (só hora, tipo <code>TIME</code>), ambos obrigatórios;</li>
          <li><code>status</code>: <code>ENUM('agendada','realizada','cancelada')</code> com padrão <code>'agendada'</code>;</li>
          <li><code>valor</code> <code>DECIMAL(8,2)</code>.</li>
        </ul>
        Cadastre (sem informar id nem status): <code>'Paula Reis'</code> em <code>'2026-11-03'</code> às <code>'09:30:00'</code> por <code>250.00</code>, e <code>'Tiago Moura'</code> em <code>'2026-11-03'</code> às <code>'10:15:00'</code> por <code>180.50</code>. Depois marque a consulta de id 1 como <code>'realizada'</code>.`,
      dica: `Como <code>status</code> tem <code>DEFAULT</code>, não precisa aparecer no <code>INSERT</code>. Para mudar o status use <code>UPDATE ... SET status = ... WHERE id = 1</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- Crie a tabela consultas

-- Cadastre as duas consultas

-- Marque a consulta 1 como realizada
`,
      solucao: c`CREATE TABLE consultas (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  paciente VARCHAR(100) NOT NULL,
  dia      DATE NOT NULL,
  horario  TIME NOT NULL,
  status   ENUM('agendada','realizada','cancelada') DEFAULT 'agendada',
  valor    DECIMAL(8,2)
);

INSERT INTO consultas (paciente, dia, horario, valor) VALUES
  ('Paula Reis', '2026-11-03', '09:30:00', 250.00),
  ('Tiago Moura', '2026-11-03', '10:15:00', 180.50);

UPDATE consultas SET status = 'realizada' WHERE id = 1;

SELECT * FROM consultas;`,
      padroes: [
        [/status\s+ENUM\s*\(\s*'agendada'\s*,\s*'realizada'\s*,\s*'cancelada'\s*\)\s*DEFAULT\s+'agendada'/i, "status deve ser ENUM('agendada','realizada','cancelada') DEFAULT 'agendada'."],
        [/horario\s+TIME\b/i, "horario deve ser do tipo TIME."]
      ],
      verificacao: c`SELECT c.id, c.paciente, c.dia, c.horario, c.status, c.valor, (SELECT group_concat(UPPER(REPLACE(type, ' ', '')), ',') FROM pragma_table_info('consultas')) FROM consultas c ORDER BY c.id`
    }
  ],

  b3: [
    {
      tipo: "completar",
      titulo: "Contato no formato de e-mail",
      enunciado: `O marketing quer a lista de contatos dos clientes de <code>PE</code> no formato <code>Nome &lt;email&gt;</code> e também o nome em letras maiúsculas. Substitua cada <code>____</code> pela função certa.`,
      dica: `Uma função junta textos; a outra deixa tudo maiúsculo.`,
      lang: "sql",
      inicial: c`SELECT ____(nome, ' <', email, '>') AS contato,
       ____(nome) AS nome_maiusculo
FROM clientes
WHERE uf = 'PE';
`,
      solucao: c`SELECT CONCAT(nome, ' <', email, '>') AS contato,
       UPPER(nome) AS nome_maiusculo
FROM clientes
WHERE uf = 'PE';`
    },
    {
      tipo: "completar",
      titulo: "Telefone e data no padrão brasileiro",
      enunciado: `Exporte a lista de clientes (ordenada por <code>id</code>) com:
        <ul>
          <li>o telefone, ou o texto <code>'não informado'</code> quando estiver vazio (<code>NULL</code>);</li>
          <li>a data de cadastro (<code>criado_em</code>) no formato <code>dd/mm/aaaa</code>, ex.: <code>10/03/2025</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>IFNULL(valor, 'substituto')</code> e <code>DATE_FORMAT(data, '%d/%m/%Y')</code>.`,
      lang: "sql",
      ordem: true,
      inicial: c`SELECT nome,
       ____(telefone, 'não informado') AS telefone,
       ____(criado_em, '____') AS cadastro
FROM clientes
ORDER BY id;
`,
      solucao: c`SELECT nome,
       IFNULL(telefone, 'não informado') AS telefone,
       DATE_FORMAT(criado_em, '%d/%m/%Y') AS cadastro
FROM clientes
ORDER BY id;`
    },
    {
      tipo: "completar",
      titulo: "Faixa de crédito com CASE",
      enunciado: `O financeiro quer classificar o limite de cada cliente: acima de 5000 é <code>'alto'</code>, acima de 1000 é <code>'médio'</code> e o resto é <code>'baixo'</code>. Substitua cada <code>____</code> para completar o <code>CASE</code>.`,
      dica: `A estrutura é <code>CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END</code>.`,
      lang: "sql",
      inicial: c`SELECT nome,
       limite,
       CASE WHEN limite > 5000 THEN 'alto'
            ____ limite > 1000 THEN 'médio'
            ____ 'baixo'
       ____ AS faixa
FROM clientes;
`,
      solucao: c`SELECT nome,
       limite,
       CASE WHEN limite > 5000 THEN 'alto'
            WHEN limite > 1000 THEN 'médio'
            ELSE 'baixo'
       END AS faixa
FROM clientes;`
    },
    {
      tipo: "criar",
      titulo: "Vendas pagas por mês",
      enunciado: `Monte o relatório mensal de vendas a partir da tabela <code>pedidos</code>, considerando só os pedidos com <code>status = 'pago'</code>. Mostre 3 colunas:
        <ol>
          <li><code>mes</code>: a data no formato <code>aaaa-mm</code> (ex.: <code>2026-07</code>), usando <code>DATE_FORMAT</code>;</li>
          <li><code>qtd</code>: quantos pedidos;</li>
          <li><code>total</code>: a soma dos valores.</li>
        </ol>
        Ordene do mês mais antigo para o mais novo.`,
      dica: `Agrupe pelo mês formatado: <code>GROUP BY mes</code> e <code>ORDER BY mes</code>. O formato é <code>'%Y-%m'</code>.`,
      lang: "sql",
      ordem: true,
      inicial: c`-- Relatório: mes (aaaa-mm), qtd e total dos pedidos pagos, em ordem de mês
`,
      solucao: c`SELECT DATE_FORMAT(data, '%Y-%m') AS mes,
       COUNT(*) AS qtd,
       SUM(valor) AS total
FROM pedidos
WHERE status = 'pago'
GROUP BY mes
ORDER BY mes;`,
      padroes: [[/DATE_FORMAT\s*\(/i, "Use DATE_FORMAT para formatar o mês."]]
    },
    {
      tipo: "criar",
      titulo: "Clientes sumidos para a campanha",
      enunciado: `O marketing vai mandar um cupom para quem está sumido. Usando a data de referência <code>'2026-10-01'</code>, liste os clientes <b>ativos</b> (<code>ativo = 1</code>) que já compraram (<code>ultimo_pedido</code> não nulo) e estão há <b>mais de 20 dias</b> sem comprar. Mostre:
        <ol>
          <li><code>nome</code>;</li>
          <li><code>idade</code>: anos completos entre <code>nascimento</code> e <code>'2026-10-01'</code> (use <code>TIMESTAMPDIFF</code>);</li>
          <li><code>dias_sem_comprar</code>: dias entre <code>'2026-10-01'</code> e <code>ultimo_pedido</code> (use <code>DATEDIFF</code>).</li>
        </ol>
        Ordene de quem está há mais tempo sem comprar para quem está há menos.`,
      dica: `<code>DATEDIFF(maior, menor)</code> devolve dias; <code>TIMESTAMPDIFF(YEAR, inicio, fim)</code> devolve anos completos. O filtro pode repetir a conta no <code>WHERE</code>.`,
      lang: "sql",
      ordem: true,
      inicial: c`-- nome, idade e dias_sem_comprar dos clientes ativos sumidos há mais de 20 dias
-- data de referência: '2026-10-01'
`,
      solucao: c`SELECT nome,
       TIMESTAMPDIFF(YEAR, nascimento, '2026-10-01') AS idade,
       DATEDIFF('2026-10-01', ultimo_pedido) AS dias_sem_comprar
FROM clientes
WHERE ativo = 1
  AND ultimo_pedido IS NOT NULL
  AND DATEDIFF('2026-10-01', ultimo_pedido) > 20
ORDER BY dias_sem_comprar DESC;`,
      padroes: [
        [/TIMESTAMPDIFF\s*\(\s*YEAR/i, "Calcule a idade com TIMESTAMPDIFF(YEAR, ...)."],
        [/DATEDIFF\s*\(/i, "Calcule os dias com DATEDIFF."]
      ]
    }
  ],

  i1: [
    {
      tipo: "completar",
      titulo: "Usuário da aplicação da loja",
      enunciado: `A aplicação da loja não pode usar o <code>root</code>. Complete o script que cria o usuário <code>app_loja</code> (de qualquer host, <code>'%'</code>) com a senha <code>'SenhaForte!2026'</code> e dá a ele só <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code> e <code>DELETE</code> em todas as tabelas do banco <code>loja</code>. Substitua cada <code>____</code>.`,
      dica: `<code>CREATE USER ... IDENTIFIED BY 'senha'</code> e <code>GRANT ... ON banco.* TO usuario</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`CREATE ____ 'app_loja'@'%' IDENTIFIED ____ 'SenhaForte!2026';

GRANT SELECT, INSERT, UPDATE, DELETE ____ loja.* ____ 'app_loja'@'%';
`,
      solucao: c`CREATE USER 'app_loja'@'%' IDENTIFIED BY 'SenhaForte!2026';

GRANT SELECT, INSERT, UPDATE, DELETE ON loja.* TO 'app_loja'@'%';`,
      padroes: [
        [/CREATE\s+USER\s+'app_loja'@'%'\s+IDENTIFIED\s+BY\s+'SenhaForte!2026'/i, "Crie o usuário com CREATE USER 'app_loja'@'%' IDENTIFIED BY 'SenhaForte!2026'."],
        [/GRANT\s+SELECT\s*,\s*INSERT\s*,\s*UPDATE\s*,\s*DELETE\s+ON\s+loja\.\*\s+TO\s+'app_loja'@'%'/i, "O GRANT deve ser: GRANT SELECT, INSERT, UPDATE, DELETE ON loja.* TO 'app_loja'@'%'."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Acesso somente leitura para o BI",
      enunciado: `O Power BI do financeiro roda na rede <code>10.0.0.%</code> e só pode <b>ler</b> os dados da <code>loja</code>. Complete o script: dê só a permissão de leitura em todas as tabelas do banco <code>loja</code> e, no fim, mostre as permissões do usuário. Substitua cada <code>____</code>.`,
      dica: `Ler é <code>SELECT</code>; “todas as tabelas do banco loja” é <code>loja.*</code>; ver permissões é <code>SHOW GRANTS FOR</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`CREATE USER 'bi_leitura'@'10.0.0.%' IDENTIFIED BY 'OutraSenha#99';

GRANT ____ ON ____ TO 'bi_leitura'@'10.0.0.%';

SHOW ____ FOR 'bi_leitura'@'10.0.0.%';
`,
      solucao: c`CREATE USER 'bi_leitura'@'10.0.0.%' IDENTIFIED BY 'OutraSenha#99';

GRANT SELECT ON loja.* TO 'bi_leitura'@'10.0.0.%';

SHOW GRANTS FOR 'bi_leitura'@'10.0.0.%';`,
      padroes: [
        [/GRANT\s+SELECT\s+ON\s+loja\.\*\s+TO\s+'bi_leitura'@'10\.0\.0\.%'/i, "O BI deve receber apenas SELECT ON loja.* (nada de INSERT/UPDATE/DELETE)."],
        [/SHOW\s+GRANTS\s+FOR\s+'bi_leitura'@'10\.0\.0\.%'/i, "Mostre as permissões com SHOW GRANTS FOR 'bi_leitura'@'10.0.0.%'."]
      ]
    },
    {
      tipo: "completar",
      titulo: "Tirando permissões e removendo ex-funcionário",
      enunciado: `Duas tarefas da auditoria:
        <ol>
          <li>a aplicação <code>app_loja</code> não deve mais apagar dados: retire a permissão <code>DELETE</code> em <code>loja.*</code>;</li>
          <li>o Carlos saiu da empresa: apague o usuário <code>'carlos'@'localhost'</code>.</li>
        </ol>
        Substitua cada <code>____</code>.`,
      dica: `<code>GRANT ... TO</code> dá; <code>REVOKE ... FROM</code> tira. Para apagar o usuário inteiro, o contrário de <code>CREATE USER</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`REVOKE ____ ON loja.* ____ 'app_loja'@'%';

____ USER 'carlos'@'localhost';
`,
      solucao: c`REVOKE DELETE ON loja.* FROM 'app_loja'@'%';

DROP USER 'carlos'@'localhost';`,
      padroes: [
        [/REVOKE\s+DELETE\s+ON\s+loja\.\*\s+FROM\s+'app_loja'@'%'/i, "Use REVOKE DELETE ON loja.* FROM 'app_loja'@'%'."],
        [/DROP\s+USER\s+'carlos'@'localhost'/i, "Apague o usuário com DROP USER 'carlos'@'localhost'."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Usuário do sistema de relatórios",
      enunciado: `O sistema de relatórios roda no próprio servidor do banco. Escreva o script que:
        <ol>
          <li>cria o usuário <code>'relatorio'@'localhost'</code> com uma senha de sua escolha;</li>
          <li>dá a ele <code>SELECT</code> e <code>INSERT</code> em todas as tabelas do banco <code>loja</code> (ele lê os dados e grava o histórico dos relatórios);</li>
          <li>mostra as permissões desse usuário.</li>
        </ol>`,
      dica: `São três comandos: <code>CREATE USER</code>, <code>GRANT</code> (com as permissões separadas por vírgula) e <code>SHOW GRANTS FOR</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- 1) Crie o usuário do sistema de relatórios (somente local)

-- 2) Dê leitura e inserção no banco loja

-- 3) Confira as permissões
`,
      solucao: c`CREATE USER 'relatorio'@'localhost' IDENTIFIED BY 'Relat#2026';

GRANT SELECT, INSERT ON loja.* TO 'relatorio'@'localhost';

SHOW GRANTS FOR 'relatorio'@'localhost';`,
      padroes: [
        [/CREATE\s+USER\s+'relatorio'@'localhost'\s+IDENTIFIED\s+BY\s+'[^']+'/i, "Crie o usuário com CREATE USER 'relatorio'@'localhost' IDENTIFIED BY 'senha'."],
        [/GRANT\s+(SELECT\s*,\s*INSERT|INSERT\s*,\s*SELECT)\s+ON\s+loja\.\*\s+TO\s+'relatorio'@'localhost'/i, "O GRANT deve dar SELECT, INSERT ON loja.* TO 'relatorio'@'localhost' (só essas duas)."],
        [/SHOW\s+GRANTS\s+FOR\s+'relatorio'@'localhost'/i, "Confira com SHOW GRANTS FOR 'relatorio'@'localhost'."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Estagiário que vê só duas tabelas",
      enunciado: `O estagiário de vendas precisa consultar <b>apenas</b> as tabelas <code>produtos</code> e <code>pedidos</code> do banco <code>loja</code>, nada mais. Escreva o script que:
        <ol>
          <li>cria o usuário <code>'estagiario'@'localhost'</code> com uma senha de sua escolha;</li>
          <li>dá <code>SELECT</code> na tabela <code>loja.produtos</code>;</li>
          <li>dá <code>SELECT</code> na tabela <code>loja.pedidos</code>.</li>
        </ol>
        <b>Não</b> use <code>loja.*</code> (isso liberaria clientes, CPFs e salários).`,
      dica: `Em vez de <code>banco.*</code>, o <code>GRANT</code> aceita <code>banco.tabela</code>. Faça um <code>GRANT</code> para cada tabela.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- Crie o usuário do estagiário (somente local)

-- Libere leitura só nas duas tabelas pedidas
`,
      solucao: c`CREATE USER 'estagiario'@'localhost' IDENTIFIED BY 'Estag!2026';

GRANT SELECT ON loja.produtos TO 'estagiario'@'localhost';
GRANT SELECT ON loja.pedidos TO 'estagiario'@'localhost';`,
      padroes: [
        [/CREATE\s+USER\s+'estagiario'@'localhost'\s+IDENTIFIED\s+BY\s+'[^']+'/i, "Crie o usuário com CREATE USER 'estagiario'@'localhost' IDENTIFIED BY 'senha'."],
        [/GRANT\s+SELECT\s+ON\s+loja\.produtos\s+TO\s+'estagiario'@'localhost'/i, "Falta GRANT SELECT ON loja.produtos TO 'estagiario'@'localhost'."],
        [/GRANT\s+SELECT\s+ON\s+loja\.pedidos\s+TO\s+'estagiario'@'localhost'/i, "Falta GRANT SELECT ON loja.pedidos TO 'estagiario'@'localhost'."],
        [/^(?![\s\S]*loja\.\*)/, "Não use loja.*: libere só as tabelas produtos e pedidos."],
        [/^(?![\s\S]*GRANT\s+[^;]*\b(INSERT|UPDATE|DELETE|ALL)\b)/i, "O estagiário só pode ler: use apenas SELECT."]
      ]
    }
  ],

  i2: [
    {
      tipo: "completar",
      titulo: "View de vendas por cliente",
      enunciado: `O time de BI vive pedindo o total gasto por cliente. Complete a view <code>vw_vendas_por_cliente</code> (que pode ser recriada sem erro se já existir) e use-a para listar quem gastou mais de 1000. Substitua cada <code>____</code>.`,
      dica: `Para criar ou substituir: <code>CREATE OR REPLACE VIEW nome AS SELECT ...</code>.`,
      lang: "sql",
      inicial: c`CREATE ____ VIEW vw_vendas_por_cliente ____
SELECT c.id,
       c.nome,
       COUNT(p.id)              AS qtd_pedidos,
       COALESCE(SUM(p.valor),0) AS total_gasto
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'
GROUP BY c.id, c.nome;

SELECT * FROM vw_vendas_por_cliente
WHERE total_gasto > 1000
ORDER BY total_gasto DESC;
`,
      solucao: c`CREATE OR REPLACE VIEW vw_vendas_por_cliente AS
SELECT c.id,
       c.nome,
       COUNT(p.id)              AS qtd_pedidos,
       COALESCE(SUM(p.valor),0) AS total_gasto
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'
GROUP BY c.id, c.nome;

SELECT * FROM vw_vendas_por_cliente
WHERE total_gasto > 1000
ORDER BY total_gasto DESC;`,
      padroes: [[/CREATE\s+OR\s+REPLACE\s+VIEW\s+vw_vendas_por_cliente\s+AS/i, "Use CREATE OR REPLACE VIEW vw_vendas_por_cliente AS ..."]],
      verificacao: c`SELECT * FROM vw_vendas_por_cliente ORDER BY id`
    },
    {
      tipo: "completar",
      titulo: "View que mascara o CPF (LGPD)",
      enunciado: `O atendimento pode ver os clientes, mas não o CPF completo. Complete a view <code>vw_clientes_publico</code> para mostrar o CPF assim: os <b>3 primeiros</b> dígitos, depois <code>.***.***-</code> e os <b>2 últimos</b> dígitos (ex.: <code>123.***.***-01</code>). Substitua cada <code>____</code>.`,
      dica: `<code>LEFT(texto, n)</code> pega os n primeiros caracteres; <code>RIGHT(texto, n)</code>, os n últimos.`,
      lang: "sql",
      inicial: c`CREATE VIEW vw_clientes_publico AS
SELECT id,
       nome,
       CONCAT(____(cpf, 3), '.***.***-', ____(cpf, 2)) AS cpf_mascarado,
       cidade
FROM clientes;

SELECT * FROM vw_clientes_publico;
`,
      solucao: c`CREATE VIEW vw_clientes_publico AS
SELECT id,
       nome,
       CONCAT(LEFT(cpf, 3), '.***.***-', RIGHT(cpf, 2)) AS cpf_mascarado,
       cidade
FROM clientes;

SELECT * FROM vw_clientes_publico;`,
      verificacao: c`SELECT * FROM vw_clientes_publico ORDER BY id`
    },
    {
      tipo: "completar",
      titulo: "Consultando a view de estoque baixo",
      enunciado: `Complete o script: a view <code>vw_estoque_baixo</code> deve mostrar os produtos com estoque <b>menor que 30</b>. Depois, consulte a <b>view</b> (como se fosse tabela) para contar quantos produtos com estoque baixo existem em cada categoria. Substitua cada <code>____</code>.`,
      dica: `Depois de criada, a view é usada no <code>FROM</code> como uma tabela qualquer. Para contar por categoria: <code>COUNT(*)</code> com <code>GROUP BY</code>.`,
      lang: "sql",
      inicial: c`CREATE VIEW vw_estoque_baixo AS
SELECT id, nome, categoria, estoque
FROM produtos
WHERE estoque ____ 30;

SELECT categoria, ____(*) AS qtd
FROM vw_estoque_baixo
GROUP BY ____;
`,
      solucao: c`CREATE VIEW vw_estoque_baixo AS
SELECT id, nome, categoria, estoque
FROM produtos
WHERE estoque < 30;

SELECT categoria, COUNT(*) AS qtd
FROM vw_estoque_baixo
GROUP BY categoria;`,
      padroes: [[/FROM\s+vw_estoque_baixo/i, "A consulta final deve ler da view vw_estoque_baixo."]]
    },
    {
      tipo: "criar",
      titulo: "View de faturamento por produto",
      enunciado: `Crie a view <code>vw_faturamento_produto</code> com 4 colunas, nesta ordem:
        <ol>
          <li><code>id</code> do produto;</li>
          <li><code>nome</code> do produto;</li>
          <li><code>qtd_vendida</code>: soma das quantidades vendidas (<code>itens_pedido.quantidade</code>);</li>
          <li><code>faturamento</code>: soma de <code>quantidade * preco</code>.</li>
        </ol>
        Considere só itens de pedidos com <code>status = 'pago'</code> e só produtos que venderam alguma coisa. No fim, consulte a view ordenando pelo faturamento, do maior para o menor.`,
      dica: `Junte três tabelas: <code>produtos</code> → <code>itens_pedido</code> (por <code>produto_id</code>) → <code>pedidos</code> (por <code>pedido_id</code>). Agrupe por <code>id</code> e <code>nome</code> do produto.`,
      lang: "sql",
      inicial: c`-- Crie a view vw_faturamento_produto (id, nome, qtd_vendida, faturamento)

-- Consulte a view do maior para o menor faturamento
`,
      solucao: c`CREATE VIEW vw_faturamento_produto AS
SELECT pr.id,
       pr.nome,
       SUM(i.quantidade)            AS qtd_vendida,
       SUM(i.quantidade * pr.preco) AS faturamento
FROM produtos pr
JOIN itens_pedido i ON i.produto_id = pr.id
JOIN pedidos p      ON p.id = i.pedido_id
WHERE p.status = 'pago'
GROUP BY pr.id, pr.nome;

SELECT * FROM vw_faturamento_produto ORDER BY faturamento DESC;`,
      padroes: [[/CREATE\s+(OR\s+REPLACE\s+)?VIEW\s+vw_faturamento_produto\s+AS/i, "Crie a view com CREATE VIEW vw_faturamento_produto AS ..."]],
      verificacao: c`SELECT * FROM vw_faturamento_produto ORDER BY id`
    },
    {
      tipo: "criar",
      titulo: "Painel de folha do RH",
      enunciado: `O RH quer um painel sem precisar escrever SQL. Crie a view <code>vw_folha_departamento</code> a partir da tabela <code>funcionarios</code>, com 4 colunas, nesta ordem:
        <ol>
          <li><code>departamento</code>;</li>
          <li><code>pessoas</code>: quantos funcionários;</li>
          <li><code>folha</code>: soma dos salários;</li>
          <li><code>media_salarial</code>: média dos salários arredondada para 2 casas.</li>
        </ol>
        Depois, consulte a view mostrando só os departamentos com folha <b>maior que 20000</b>.`,
      dica: `<code>ROUND(AVG(salario), 2)</code> dá a média arredondada. Na consulta da view, o filtro vai no <code>WHERE</code> (a view já está agrupada).`,
      lang: "sql",
      inicial: c`-- Crie a view vw_folha_departamento

-- Consulte só os departamentos com folha > 20000
`,
      solucao: c`CREATE VIEW vw_folha_departamento AS
SELECT departamento,
       COUNT(*)               AS pessoas,
       SUM(salario)           AS folha,
       ROUND(AVG(salario), 2) AS media_salarial
FROM funcionarios
GROUP BY departamento;

SELECT * FROM vw_folha_departamento WHERE folha > 20000;`,
      padroes: [
        [/CREATE\s+(OR\s+REPLACE\s+)?VIEW\s+vw_folha_departamento\s+AS/i, "Crie a view com CREATE VIEW vw_folha_departamento AS ..."],
        [/FROM\s+vw_folha_departamento\s+WHERE/i, "Consulte a view filtrando com WHERE folha > 20000."]
      ],
      verificacao: c`SELECT * FROM vw_folha_departamento ORDER BY departamento`
    }
  ],

  i3: [
    {
      tipo: "completar",
      titulo: "Procedure que fecha o pedido",
      enunciado: `Complete a stored procedure <code>fechar_pedido</code>, que recebe o número do pedido como <b>parâmetro de entrada</b> e marca o pedido como <code>'pago'</code>. Depois, execute-a para o pedido 10. Substitua cada <code>____</code>.`,
      dica: `Cria-se com <code>CREATE PROCEDURE</code>; parâmetro de entrada é <code>IN</code>; para executar, <code>CALL</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`DELIMITER $$

CREATE ____ fechar_pedido(____ p_pedido INT)
BEGIN
  UPDATE pedidos SET status = 'pago' WHERE id = p_pedido;
END $$

DELIMITER ;

____ fechar_pedido(10);
`,
      solucao: c`DELIMITER $$

CREATE PROCEDURE fechar_pedido(IN p_pedido INT)
BEGIN
  UPDATE pedidos SET status = 'pago' WHERE id = p_pedido;
END $$

DELIMITER ;

CALL fechar_pedido(10);`,
      padroes: [
        [/CREATE\s+PROCEDURE\s+fechar_pedido\s*\(\s*IN\s+p_pedido\s+INT\s*\)/i, "A procedure deve começar com CREATE PROCEDURE fechar_pedido(IN p_pedido INT)."],
        [/CALL\s+fechar_pedido\s*\(\s*10\s*\)/i, "Execute com CALL fechar_pedido(10);"]
      ]
    },
    {
      tipo: "completar",
      titulo: "Function de preço com desconto",
      enunciado: `Complete a function <code>preco_com_desconto</code>: recebe o preço e o percentual de desconto e <b>devolve</b> o preço final como <code>DECIMAL(10,2)</code>. Ela é determinística (mesma entrada, mesma saída). Substitua cada <code>____</code>.`,
      dica: `Na declaração vai <code>RETURNS tipo</code> (com S); no corpo, <code>RETURN valor</code> (sem S).`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`DELIMITER $$

CREATE FUNCTION preco_com_desconto(preco DECIMAL(10,2), pct INT)
____ DECIMAL(10,2)
____
BEGIN
  ____ preco - preco * pct / 100;
END $$

DELIMITER ;

SELECT nome, preco, preco_com_desconto(preco, 10) AS na_promocao FROM produtos;
`,
      solucao: c`DELIMITER $$

CREATE FUNCTION preco_com_desconto(preco DECIMAL(10,2), pct INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN preco - preco * pct / 100;
END $$

DELIMITER ;

SELECT nome, preco, preco_com_desconto(preco, 10) AS na_promocao FROM produtos;`,
      padroes: [
        [/CREATE\s+FUNCTION\s+preco_com_desconto\s*\([\s\S]*?\)\s*RETURNS\s+DECIMAL\s*\(\s*10\s*,\s*2\s*\)/i, "Declare RETURNS DECIMAL(10,2) logo após os parâmetros."],
        [/RETURNS\s+DECIMAL\s*\(\s*10\s*,\s*2\s*\)\s+DETERMINISTIC/i, "Marque a function como DETERMINISTIC."],
        [/BEGIN\s+RETURN\s+preco\s*-\s*preco\s*\*\s*pct\s*\/\s*100\s*;\s*END/i, "No corpo, use RETURN preco - preco * pct / 100;"]
      ]
    },
    {
      tipo: "completar",
      titulo: "Testando o corpo da transferência",
      enunciado: `Antes de virar a procedure <code>transferir</code>, teste o corpo dela aqui (este roda no sandbox!): transfira <b>200</b> da conta 1 para a conta 2 dentro de uma transação e confirme no fim. Substitua cada <code>____</code>.`,
      dica: `A transação começa com <code>START TRANSACTION</code> e é confirmada com <code>COMMIT</code>. Quem recebe tem o saldo <b>somado</b>.`,
      lang: "sql",
      inicial: c`START ____;

UPDATE contas SET saldo = saldo - 200 WHERE id = 1;
UPDATE contas SET saldo = saldo ____ 200 WHERE id = 2;

____;

SELECT * FROM contas;
`,
      solucao: c`START TRANSACTION;

UPDATE contas SET saldo = saldo - 200 WHERE id = 1;
UPDATE contas SET saldo = saldo + 200 WHERE id = 2;

COMMIT;

SELECT * FROM contas;`,
      padroes: [
        [/START\s+TRANSACTION/i, "Comece com START TRANSACTION."],
        [/\bCOMMIT\s*;/i, "Confirme a transação com COMMIT;"]
      ],
      verificacao: c`SELECT id, saldo FROM contas ORDER BY id`
    },
    {
      tipo: "criar",
      titulo: "Procedure de reajuste por categoria",
      enunciado: `Crie a procedure <code>reajustar_categoria</code> com dois parâmetros de entrada: <code>p_categoria VARCHAR(50)</code> e <code>p_percentual DECIMAL(5,2)</code>. Ela deve aumentar o <code>preco</code> dos produtos daquela categoria pelo percentual (ex.: 10 = +10%). Use <code>DELIMITER $$</code>, <code>BEGIN ... END</code> e volte o delimitador para <code>;</code>. No fim, chame a procedure para reajustar a categoria <code>'casa'</code> em <code>10</code>%.`,
      dica: `Aumentar 10% é multiplicar por <code>(1 + 10 / 100)</code>: <code>SET preco = preco * (1 + p_percentual / 100)</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- Troque o delimitador, crie a procedure reajustar_categoria e volte o delimitador

-- Chame a procedure para a categoria casa com 10%
`,
      solucao: c`DELIMITER $$

CREATE PROCEDURE reajustar_categoria(IN p_categoria VARCHAR(50), IN p_percentual DECIMAL(5,2))
BEGIN
  UPDATE produtos
  SET preco = preco * (1 + p_percentual / 100)
  WHERE categoria = p_categoria;
END $$

DELIMITER ;

CALL reajustar_categoria('casa', 10);`,
      padroes: [
        [/DELIMITER\s+\$\$/i, "Troque o delimitador com DELIMITER $$."],
        [/CREATE\s+PROCEDURE\s+reajustar_categoria\s*\(\s*IN\s+p_categoria\s+VARCHAR\s*\(\s*50\s*\)\s*,\s*IN\s+p_percentual\s+DECIMAL\s*\(\s*5\s*,\s*2\s*\)\s*\)/i, "Declare CREATE PROCEDURE reajustar_categoria(IN p_categoria VARCHAR(50), IN p_percentual DECIMAL(5,2))."],
        [/BEGIN[\s\S]*UPDATE\s+produtos\s+SET\s+preco\s*=\s*preco\s*\*\s*\(\s*1\s*\+\s*p_percentual\s*\/\s*100\s*\)[\s\S]*WHERE\s+categoria\s*=\s*p_categoria[\s\S]*END\s*\$\$/i, "No corpo: UPDATE produtos SET preco = preco * (1 + p_percentual / 100) WHERE categoria = p_categoria; e termine com END $$."],
        [/DELIMITER\s*;/i, "Volte o delimitador com DELIMITER ;"],
        [/CALL\s+reajustar_categoria\s*\(\s*'casa'\s*,\s*10\s*\)/i, "Chame com CALL reajustar_categoria('casa', 10);"]
      ]
    },
    {
      tipo: "criar",
      titulo: "Transferência segura com ROLLBACK",
      enunciado: `Crie a procedure <code>transferir(IN p_origem INT, IN p_destino INT, IN p_valor DECIMAL(12,2))</code> para o banco digital. Ela deve:
        <ol>
          <li>declarar um <code>EXIT HANDLER FOR SQLEXCEPTION</code> que faz <code>ROLLBACK</code> e <code>RESIGNAL</code> (desfaz tudo e repassa o erro);</li>
          <li>abrir uma transação com <code>START TRANSACTION</code>;</li>
          <li>tirar <code>p_valor</code> do saldo da conta <code>p_origem</code> e somar na conta <code>p_destino</code> (tabela <code>contas</code>);</li>
          <li>confirmar com <code>COMMIT</code>.</li>
        </ol>
        Use <code>DELIMITER $$</code> e, no fim, transfira 150 da conta 1 para a conta 2.`,
      dica: `O handler vem logo depois do <code>BEGIN</code>: <code>DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- Crie a procedure transferir com tratamento de erro e transação

-- Transfira 150 da conta 1 para a conta 2
`,
      solucao: c`DELIMITER $$

CREATE PROCEDURE transferir(IN p_origem INT, IN p_destino INT, IN p_valor DECIMAL(12,2))
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
    UPDATE contas SET saldo = saldo - p_valor WHERE id = p_origem;
    UPDATE contas SET saldo = saldo + p_valor WHERE id = p_destino;
  COMMIT;
END $$

DELIMITER ;

CALL transferir(1, 2, 150);`,
      padroes: [
        [/CREATE\s+PROCEDURE\s+transferir\s*\(\s*IN\s+p_origem\s+INT\s*,\s*IN\s+p_destino\s+INT\s*,\s*IN\s+p_valor\s+DECIMAL\s*\(\s*12\s*,\s*2\s*\)\s*\)/i, "Declare CREATE PROCEDURE transferir(IN p_origem INT, IN p_destino INT, IN p_valor DECIMAL(12,2))."],
        [/DECLARE\s+EXIT\s+HANDLER\s+FOR\s+SQLEXCEPTION\s+BEGIN\s+ROLLBACK\s*;\s*RESIGNAL\s*;\s*END\s*;/i, "Declare o handler: DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;"],
        [/START\s+TRANSACTION\s*;[\s\S]*saldo\s*=\s*saldo\s*-\s*p_valor\s+WHERE\s+id\s*=\s*p_origem[\s\S]*saldo\s*=\s*saldo\s*\+\s*p_valor\s+WHERE\s+id\s*=\s*p_destino[\s\S]*COMMIT\s*;/i, "Dentro da transação: tire p_valor da origem, some no destino e faça COMMIT."],
        [/CALL\s+transferir\s*\(\s*1\s*,\s*2\s*,\s*150\s*\)/i, "Chame com CALL transferir(1, 2, 150);"]
      ]
    }
  ],

  a1: [
    {
      tipo: "completar",
      titulo: "Backup completo sem travar a loja",
      enunciado: `Complete o comando de terminal que faz o backup do banco <code>loja</code> <b>sem travar as tabelas</b> (snapshot consistente do InnoDB), incluindo procedures/functions e triggers, e grava tudo no arquivo <code>loja_2026-10-18.sql</code>. Substitua cada <code>____</code>.`,
      dica: `A opção que usa uma transação consistente é <code>--single-transaction</code>. Para mandar a saída para um arquivo no terminal, use o redirecionamento <code>&gt;</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: TERMINAL,
      inicial: c`mysqldump -u root -p ____ --routines --triggers loja ____ loja_2026-10-18.sql
`,
      solucao: c`mysqldump -u root -p --single-transaction --routines --triggers loja > loja_2026-10-18.sql`,
      padroes: [
        [/mysqldump\s+-u\s*root\s+-p\s[^\n]*--single-transaction/i, "Use a opção --single-transaction no mysqldump."],
        [/--routines[^\n]*--triggers|--triggers[^\n]*--routines/i, "Mantenha --routines e --triggers."],
        [/\bloja\s*>\s*loja_2026-10-18\.sql/i, "Redirecione a saída: loja > loja_2026-10-18.sql"]
      ]
    },
    {
      tipo: "completar",
      titulo: "Só a estrutura e só uma tabela",
      enunciado: `Dois backups diferentes do banco <code>loja</code>:
        <ol>
          <li>só a <b>estrutura</b> (tabelas, sem nenhum dado) no arquivo <code>estrutura.sql</code>;</li>
          <li>só a tabela <code>clientes</code> (estrutura e dados) no arquivo <code>clientes.sql</code>.</li>
        </ol>
        Substitua cada <code>____</code>.`,
      dica: `“Sem dados” é <code>--no-data</code>. Para uma tabela só, escreva o nome dela logo depois do nome do banco.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: TERMINAL,
      inicial: c`mysqldump -u root -p ____ loja > estrutura.sql

mysqldump -u root -p loja ____ > clientes.sql
`,
      solucao: c`mysqldump -u root -p --no-data loja > estrutura.sql

mysqldump -u root -p loja clientes > clientes.sql`,
      padroes: [
        [/mysqldump\s+-u\s*root\s+-p\s+--no-data\s+loja\s*>\s*estrutura\.sql/i, "O primeiro deve ser: mysqldump -u root -p --no-data loja > estrutura.sql"],
        [/mysqldump\s+-u\s*root\s+-p\s+loja\s+clientes\s*>\s*clientes\.sql/i, "O segundo deve ser: mysqldump -u root -p loja clientes > clientes.sql"]
      ]
    },
    {
      tipo: "completar",
      titulo: "Restaurando o backup",
      enunciado: `O servidor quebrou e você precisa restaurar. Complete os comandos de terminal:
        <ol>
          <li>restaurar o arquivo <code>loja_2026-10-18.sql</code> no banco <code>loja</code>;</li>
          <li>restaurar o backup compactado <code>loja.sql.gz</code>, descompactando e mandando direto para o cliente <code>mysql</code>.</li>
        </ol>
        Substitua cada <code>____</code>.`,
      dica: `Na restauração o arquivo <b>entra</b> no comando (<code>&lt;</code>). O pipe <code>|</code> liga a saída do <code>gunzip</code> à entrada do cliente <code>mysql</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: TERMINAL,
      inicial: c`mysql -u root -p loja ____ loja_2026-10-18.sql

gunzip ____ loja.sql.gz | ____ -u root -p loja
`,
      solucao: c`mysql -u root -p loja < loja_2026-10-18.sql

gunzip < loja.sql.gz | mysql -u root -p loja`,
      padroes: [
        [/mysql\s+-u\s*root\s+-p\s+loja\s*<\s*loja_2026-10-18\.sql/i, "Restaure com: mysql -u root -p loja < loja_2026-10-18.sql"],
        [/gunzip\s*<\s*loja\.sql\.gz\s*\|\s*mysql\s+-u\s*root\s+-p\s+loja/i, "Use: gunzip < loja.sql.gz | mysql -u root -p loja"]
      ]
    },
    {
      tipo: "criar",
      titulo: "Conferindo se o backup voltou inteiro",
      enunciado: `Backup que nunca foi testado não é backup! Você restaurou o banco num servidor de teste e quer conferir se as tabelas voltaram completas. Escreva <b>uma consulta</b> (este exercício roda no sandbox) que mostre 2 colunas, <code>tabela</code> e <code>linhas</code>, com uma linha para cada uma destas tabelas: <code>clientes</code>, <code>produtos</code>, <code>pedidos</code> e <code>itens_pedido</code>.`,
      dica: `Faça um <code>SELECT 'clientes' AS tabela, COUNT(*) AS linhas FROM clientes</code> para cada tabela e junte tudo com <code>UNION ALL</code>.`,
      lang: "sql",
      inicial: c`-- Uma linha por tabela: tabela | linhas
-- (clientes, produtos, pedidos e itens_pedido)
`,
      solucao: c`SELECT 'clientes' AS tabela, COUNT(*) AS linhas FROM clientes
UNION ALL
SELECT 'produtos', COUNT(*) FROM produtos
UNION ALL
SELECT 'pedidos', COUNT(*) FROM pedidos
UNION ALL
SELECT 'itens_pedido', COUNT(*) FROM itens_pedido;`
    },
    {
      tipo: "criar",
      titulo: "Backup automático no cron",
      enunciado: `Automatize o backup da loja e o teste de restauração. Escreva:
        <ol>
          <li>uma linha de <b>crontab</b> que roda <b>todo dia às 3h</b> (<code>0 3 * * *</code>) um <code>mysqldump</code> do banco <code>loja</code> com <code>--single-transaction</code>, <code>--routines</code> e <code>--triggers</code>, compactado com <code>gzip</code> em <code>/backups/loja.sql.gz</code>. Como no cron ninguém digita senha, use <code>--defaults-extra-file=/root/.backup.cnf</code> (arquivo com usuário e senha) como <b>primeira</b> opção, no lugar de <code>-u root -p</code>;</li>
          <li>o comando que restaura esse arquivo no banco de teste <code>loja_teste</code>: descompacte com <code>gunzip &lt;</code> e mande para o <code>mysql</code> (também com <code>--defaults-extra-file=/root/.backup.cnf</code>).</li>
        </ol>`,
      dica: `Crontab: <code>minuto hora dia mês dia-da-semana comando</code>. A compactação usa pipe: <code>mysqldump ... loja | gzip &gt; arquivo.sql.gz</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: TERMINAL,
      inicial: c`# 1) Linha do crontab: backup diário às 3h, compactado

# 2) Teste de restauração no banco loja_teste
`,
      solucao: c`0 3 * * * mysqldump --defaults-extra-file=/root/.backup.cnf --single-transaction --routines --triggers loja | gzip > /backups/loja.sql.gz

gunzip < /backups/loja.sql.gz | mysql --defaults-extra-file=/root/.backup.cnf loja_teste`,
      padroes: [
        [/^\s*0\s+3\s+\*\s+\*\s+\*\s+mysqldump\s+--defaults-extra-file=\/root\/\.backup\.cnf/m, "A linha do cron deve começar com: 0 3 * * * mysqldump --defaults-extra-file=/root/.backup.cnf"],
        [/mysqldump[^\n]*--single-transaction/i, "Use --single-transaction no mysqldump."],
        [/mysqldump[^\n]*--routines[^\n]*\|/i, "Inclua --routines (e --triggers) no mysqldump."],
        [/mysqldump[^\n]*--triggers[^\n]*\bloja\s*\|\s*gzip\s*>\s*\/backups\/loja\.sql\.gz/i, "Inclua --triggers e termine com: loja | gzip > /backups/loja.sql.gz"],
        [/gunzip\s*<\s*\/backups\/loja\.sql\.gz\s*\|\s*mysql\s+--defaults-extra-file=\/root\/\.backup\.cnf\s+loja_teste/i, "Restaure com: gunzip < /backups/loja.sql.gz | mysql --defaults-extra-file=/root/.backup.cnf loja_teste"]
      ]
    }
  ],

  a2: [
    {
      tipo: "completar",
      titulo: "Tabela de auditoria de preços",
      enunciado: `Antes da trigger, crie a tabela que vai guardar o histórico de preços (este exercício roda no sandbox). Complete a <code>log_precos</code>:
        <ul>
          <li><code>id</code> numerado automaticamente;</li>
          <li><code>preco_novo</code> com o mesmo tipo de <code>preco_antigo</code>;</li>
          <li><code>alterado_em</code> preenchido sozinho com o momento atual.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Dinheiro é <code>DECIMAL(10,2)</code>; o momento atual como padrão é <code>CURRENT_TIMESTAMP</code>.`,
      lang: "sql",
      inicial: c`CREATE TABLE log_precos (
  id INT ____ PRIMARY KEY,
  produto_id INT,
  preco_antigo DECIMAL(10,2),
  preco_novo ____(10,2),
  alterado_em TIMESTAMP DEFAULT ____,
  usuario VARCHAR(100)
);

DESCRIBE log_precos;
`,
      solucao: c`CREATE TABLE log_precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT,
  preco_antigo DECIMAL(10,2),
  preco_novo DECIMAL(10,2),
  alterado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario VARCHAR(100)
);

DESCRIBE log_precos;`,
      padroes: [[/id\s+INT\s+AUTO_INCREMENT\s+PRIMARY\s+KEY/i, "O id deve ser INT AUTO_INCREMENT PRIMARY KEY."]],
      verificacao: c`SELECT name, UPPER(REPLACE(type, ' ', '')), pk, UPPER(dflt_value) FROM pragma_table_info('log_precos') ORDER BY cid`
    },
    {
      tipo: "completar",
      titulo: "Trigger que audita a mudança de preço",
      enunciado: `Complete a trigger <code>trg_produtos_preco</code>: <b>depois</b> de cada alteração em <code>produtos</code>, para <b>cada linha</b>, se o preço mudou, grava em <code>log_precos</code> o preço antigo e o novo. Substitua cada <code>____</code>.`,
      dica: `<code>OLD</code> é a linha antes da alteração e <code>NEW</code> é a linha depois. “Depois” é <code>AFTER</code>; “para cada linha” é <code>FOR EACH ROW</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`DELIMITER $$

CREATE TRIGGER trg_produtos_preco
____ UPDATE ON produtos
FOR ____ ROW
BEGIN
  IF NEW.preco <> ____.preco THEN
    INSERT INTO log_precos (produto_id, preco_antigo, preco_novo, usuario)
    VALUES (OLD.id, OLD.preco, ____.preco, CURRENT_USER());
  END IF;
END $$

DELIMITER ;
`,
      solucao: c`DELIMITER $$

CREATE TRIGGER trg_produtos_preco
AFTER UPDATE ON produtos
FOR EACH ROW
BEGIN
  IF NEW.preco <> OLD.preco THEN
    INSERT INTO log_precos (produto_id, preco_antigo, preco_novo, usuario)
    VALUES (OLD.id, OLD.preco, NEW.preco, CURRENT_USER());
  END IF;
END $$

DELIMITER ;`,
      padroes: [
        [/CREATE\s+TRIGGER\s+trg_produtos_preco\s+AFTER\s+UPDATE\s+ON\s+produtos\s+FOR\s+EACH\s+ROW/i, "A trigger deve ser AFTER UPDATE ON produtos FOR EACH ROW."],
        [/IF\s+NEW\.preco\s*<>\s*OLD\.preco\s+THEN/i, "Compare NEW.preco <> OLD.preco."],
        [/VALUES\s*\(\s*OLD\.id\s*,\s*OLD\.preco\s*,\s*NEW\.preco\s*,/i, "Grave OLD.id, OLD.preco e NEW.preco no log."]
      ]
    },
    {
      tipo: "completar",
      titulo: "O comando do evento de limpeza",
      enunciado: `O evento noturno vai rodar um comando que apaga as sessões <b>já expiradas</b>. Teste esse comando aqui primeiro (este roda no sandbox): apague da tabela <code>sessoes</code> as linhas cujo <code>expira_em</code> é <b>anterior</b> ao momento atual. Substitua cada <code>____</code>.`,
      dica: `<code>DELETE FROM tabela WHERE ...</code>. “Anterior a agora” é <code>&lt; NOW()</code>.`,
      lang: "sql",
      inicial: c`DELETE ____ sessoes WHERE expira_em ____ NOW();

SELECT * FROM sessoes;
`,
      solucao: c`DELETE FROM sessoes WHERE expira_em < NOW();

SELECT * FROM sessoes;`,
      padroes: [[/NOW\s*\(\s*\)/i, "Compare com NOW()."]],
      verificacao: c`SELECT id, usuario FROM sessoes ORDER BY id`
    },
    {
      tipo: "criar",
      titulo: "Trigger que baixa o estoque na venda",
      enunciado: `Toda vez que um item é inserido em <code>itens_pedido</code>, o estoque do produto deve baixar sozinho. Crie a trigger <code>trg_baixa_estoque</code>:
        <ul>
          <li><code>AFTER INSERT ON itens_pedido</code>, <code>FOR EACH ROW</code>;</li>
          <li>que faz <code>UPDATE produtos</code> diminuindo <code>estoque</code> pela <code>quantidade</code> do novo item, só no produto <code>produto_id</code> do novo item.</li>
        </ul>
        Use <code>DELIMITER $$</code>, <code>BEGIN ... END $$</code> e volte o delimitador para <code>;</code>.`,
      dica: `Em uma trigger de INSERT só existe <code>NEW</code>: <code>NEW.quantidade</code> e <code>NEW.produto_id</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- Crie a trigger trg_baixa_estoque (depois de inserir em itens_pedido)
`,
      solucao: c`DELIMITER $$

CREATE TRIGGER trg_baixa_estoque
AFTER INSERT ON itens_pedido
FOR EACH ROW
BEGIN
  UPDATE produtos
  SET estoque = estoque - NEW.quantidade
  WHERE id = NEW.produto_id;
END $$

DELIMITER ;`,
      padroes: [
        [/DELIMITER\s+\$\$/i, "Troque o delimitador com DELIMITER $$."],
        [/CREATE\s+TRIGGER\s+trg_baixa_estoque\s+AFTER\s+INSERT\s+ON\s+itens_pedido\s+FOR\s+EACH\s+ROW/i, "Declare: CREATE TRIGGER trg_baixa_estoque AFTER INSERT ON itens_pedido FOR EACH ROW."],
        [/UPDATE\s+produtos\s+SET\s+estoque\s*=\s*estoque\s*-\s*NEW\.quantidade\s+WHERE\s+id\s*=\s*NEW\.produto_id/i, "No corpo: UPDATE produtos SET estoque = estoque - NEW.quantidade WHERE id = NEW.produto_id;"],
        [/END\s*\$\$[\s\S]*DELIMITER\s*;/i, "Feche com END $$ e volte o delimitador com DELIMITER ;"]
      ]
    },
    {
      tipo: "criar",
      titulo: "Evento que limpa sessões de madrugada",
      enunciado: `Agende a limpeza no próprio banco:
        <ol>
          <li>ligue o agendador de eventos do servidor (<code>event_scheduler</code>);</li>
          <li>crie o evento <code>ev_limpa_sessoes</code> que roda <b>a cada 1 dia</b>, começando em <code>'2026-10-21 03:00:00'</code>, e apaga de <code>sessoes</code> as linhas com <code>expira_em</code> anterior a <code>NOW()</code>.</li>
        </ol>`,
      dica: `<code>SET GLOBAL event_scheduler = ON;</code> e <code>CREATE EVENT nome ON SCHEDULE EVERY 1 DAY STARTS '...' DO comando;</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- 1) Ligue o agendador de eventos

-- 2) Crie o evento ev_limpa_sessoes
`,
      solucao: c`SET GLOBAL event_scheduler = ON;

CREATE EVENT ev_limpa_sessoes
ON SCHEDULE EVERY 1 DAY STARTS '2026-10-21 03:00:00'
DO DELETE FROM sessoes WHERE expira_em < NOW();`,
      padroes: [
        [/SET\s+GLOBAL\s+event_scheduler\s*=\s*(ON|1)\b/i, "Ligue o agendador com SET GLOBAL event_scheduler = ON;"],
        [/CREATE\s+EVENT\s+ev_limpa_sessoes\s+ON\s+SCHEDULE\s+EVERY\s+1\s+DAY\s+STARTS\s+'2026-10-21 03:00:00'/i, "Declare: CREATE EVENT ev_limpa_sessoes ON SCHEDULE EVERY 1 DAY STARTS '2026-10-21 03:00:00'"],
        [/\bDO\s+DELETE\s+FROM\s+sessoes\s+WHERE\s+expira_em\s*<\s*NOW\s*\(\s*\)/i, "O evento deve fazer: DO DELETE FROM sessoes WHERE expira_em < NOW();"]
      ]
    }
  ],

  a3: [
    {
      tipo: "completar",
      titulo: "Ligando o log de consultas lentas",
      enunciado: `O sistema fica lento às 10h e ninguém sabe por quê. Complete os comandos para ligar o <b>slow query log</b>, registrar consultas que demorem <b>mais de 1 segundo</b> e descobrir em qual arquivo o log está sendo gravado. Substitua cada <code>____</code>.`,
      dica: `As variáveis são <code>slow_query_log</code>, <code>long_query_time</code> (em segundos) e <code>slow_query_log_file</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`SET GLOBAL ____ = 'ON';
SET GLOBAL long_query_time = ____;

SHOW VARIABLES LIKE '____';
`,
      solucao: c`SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

SHOW VARIABLES LIKE 'slow_query_log_file';`,
      padroes: [
        [/SET\s+GLOBAL\s+slow_query_log\s*=\s*'?(ON|1)'?/i, "Ligue com SET GLOBAL slow_query_log = 'ON';"],
        [/SET\s+GLOBAL\s+long_query_time\s*=\s*1(\.0+)?\s*;/i, "O limite deve ser 1 segundo: SET GLOBAL long_query_time = 1;"],
        [/SHOW\s+VARIABLES\s+LIKE\s+'slow_query_log_file'/i, "Veja o arquivo com SHOW VARIABLES LIKE 'slow_query_log_file';"]
      ]
    },
    {
      tipo: "completar",
      titulo: "Índice para buscar pedidos do cliente",
      enunciado: `A tela “Meus pedidos” busca por <code>cliente_id</code> e está lenta. Complete o script (este roda no sandbox) para criar o índice <code>idx_pedidos_cliente</code> na coluna <code>cliente_id</code> da tabela <code>pedidos</code> e ver o plano da consulta com <code>EXPLAIN</code>. Substitua cada <code>____</code>.`,
      dica: `<code>CREATE INDEX nome ON tabela (coluna)</code>. No plano, procure “USING INDEX” em vez de “SCAN”.`,
      lang: "sql",
      inicial: c`CREATE ____ idx_pedidos_cliente ON pedidos (____);

____ SELECT * FROM pedidos WHERE cliente_id = 4 ORDER BY data DESC;
`,
      solucao: c`CREATE INDEX idx_pedidos_cliente ON pedidos (cliente_id);

EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 4 ORDER BY data DESC;`,
      padroes: [[/EXPLAIN\s+(ANALYZE\s+)?SELECT/i, "Use EXPLAIN antes do SELECT para ver o plano."]]
    },
    {
      tipo: "completar",
      titulo: "Achando a consulta travada",
      enunciado: `Tudo travou! Complete os comandos para:
        <ol>
          <li>ver <b>todas</b> as consultas que estão rodando agora, com o texto completo;</li>
          <li>encerrar a conexão problemática de id <code>12345</code>;</li>
          <li>conferir quanta memória o InnoDB tem para cache (<code>innodb_buffer_pool_size</code>).</li>
        </ol>
        Substitua cada <code>____</code>.`,
      dica: `<code>SHOW FULL PROCESSLIST</code> lista o que está rodando; <code>KILL id</code> encerra; variáveis do servidor se veem com <code>SHOW VARIABLES LIKE</code>.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`SHOW FULL ____;

____ 12345;

SHOW ____ LIKE 'innodb_buffer_pool_size';
`,
      solucao: c`SHOW FULL PROCESSLIST;

KILL 12345;

SHOW VARIABLES LIKE 'innodb_buffer_pool_size';`,
      padroes: [
        [/SHOW\s+FULL\s+PROCESSLIST/i, "Use SHOW FULL PROCESSLIST;"],
        [/\bKILL\s+12345\s*;/i, "Encerre com KILL 12345;"],
        [/SHOW\s+VARIABLES\s+LIKE\s+'innodb_buffer_pool_size'/i, "Use SHOW VARIABLES LIKE 'innodb_buffer_pool_size';"]
      ]
    },
    {
      tipo: "criar",
      titulo: "Índice composto que evita ordenar",
      enunciado: `A consulta abaixo filtra por cliente e ordena por data. Com um índice só em <code>cliente_id</code>, o banco ainda precisa ordenar à parte. Crie o índice composto <code>idx_pedidos_cliente_data</code> em <code>pedidos</code> com as colunas <code>cliente_id</code> e <code>data</code>, <b>nessa ordem</b>, e depois rode o <code>EXPLAIN</code> desta consulta (este exercício roda no sandbox):
        <pre>SELECT id, valor, data FROM pedidos WHERE cliente_id = 4 ORDER BY data DESC LIMIT 10;</pre>`,
      dica: `Índice composto: <code>CREATE INDEX nome ON tabela (coluna1, coluna2)</code>. A coluna do filtro vem primeiro; a da ordenação, depois.`,
      lang: "sql",
      inicial: c`-- 1) Crie o índice composto idx_pedidos_cliente_data

-- 2) EXPLAIN da consulta do enunciado
`,
      solucao: c`CREATE INDEX idx_pedidos_cliente_data ON pedidos (cliente_id, data);

EXPLAIN SELECT id, valor, data FROM pedidos WHERE cliente_id = 4 ORDER BY data DESC LIMIT 10;`,
      padroes: [
        [/CREATE\s+INDEX\s+idx_pedidos_cliente_data\s+ON\s+pedidos\s*\(\s*cliente_id\s*,\s*data\s*\)/i, "Crie: CREATE INDEX idx_pedidos_cliente_data ON pedidos (cliente_id, data);"],
        [/EXPLAIN\s+(ANALYZE\s+)?SELECT/i, "Rode EXPLAIN antes do SELECT."]
      ]
    },
    {
      tipo: "criar",
      titulo: "Usuário e conferência da réplica",
      enunciado: `O BI vai ler de uma <b>réplica</b>. Escreva os comandos:
        <ol>
          <li><b>no servidor principal</b>: crie o usuário <code>'replicador'@'10.0.0.%'</code> com uma senha de sua escolha e dê a ele a permissão <code>REPLICATION SLAVE</code> em <code>*.*</code>;</li>
          <li><b>na réplica</b>: aponte para o principal com <code>CHANGE REPLICATION SOURCE TO</code> usando <code>SOURCE_HOST='10.0.0.10'</code>, <code>SOURCE_USER='replicador'</code>, <code>SOURCE_PASSWORD</code> (a mesma senha) e <code>SOURCE_AUTO_POSITION=1</code>;</li>
          <li>ainda na réplica: inicie com <code>START REPLICA</code> e confira o estado com <code>SHOW REPLICA STATUS</code>.</li>
        </ol>`,
      dica: `A permissão de replicação vale para o servidor todo, por isso <code>ON *.*</code>. As opções do <code>CHANGE REPLICATION SOURCE TO</code> são separadas por vírgula.`,
      lang: "sql",
      somentePadroes: true,
      notaVerificacao: REAL,
      inicial: c`-- No principal: usuário de replicação e permissão

-- Na réplica: apontar para o principal, iniciar e conferir
`,
      solucao: c`-- No principal
CREATE USER 'replicador'@'10.0.0.%' IDENTIFIED BY 'Repl!2026';
GRANT REPLICATION SLAVE ON *.* TO 'replicador'@'10.0.0.%';

-- Na réplica
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = '10.0.0.10',
  SOURCE_USER = 'replicador',
  SOURCE_PASSWORD = 'Repl!2026',
  SOURCE_AUTO_POSITION = 1;

START REPLICA;
SHOW REPLICA STATUS\G`,
      padroes: [
        [/CREATE\s+USER\s+'replicador'@'10\.0\.0\.%'\s+IDENTIFIED\s+BY\s+'[^']+'/i, "Crie o usuário: CREATE USER 'replicador'@'10.0.0.%' IDENTIFIED BY 'senha';"],
        [/GRANT\s+REPLICATION\s+SLAVE\s+ON\s+\*\.\*\s+TO\s+'replicador'@'10\.0\.0\.%'/i, "Dê a permissão: GRANT REPLICATION SLAVE ON *.* TO 'replicador'@'10.0.0.%';"],
        [/CHANGE\s+REPLICATION\s+SOURCE\s+TO[\s\S]*SOURCE_HOST\s*=\s*'10\.0\.0\.10'[\s\S]*SOURCE_USER\s*=\s*'replicador'[\s\S]*SOURCE_PASSWORD\s*=\s*'[^']+'[\s\S]*SOURCE_AUTO_POSITION\s*=\s*1/i, "Use CHANGE REPLICATION SOURCE TO com SOURCE_HOST, SOURCE_USER, SOURCE_PASSWORD e SOURCE_AUTO_POSITION=1 (nessa ordem)."],
        [/START\s+REPLICA\s*;/i, "Inicie a réplica com START REPLICA;"],
        [/SHOW\s+REPLICA\s+STATUS/i, "Confira com SHOW REPLICA STATUS."]
      ]
    }
  ],
  // ===== Nível Iniciante =====
  p1: [
    {
      tipo: "completar",
      titulo: "Pedir os nomes dos produtos",
      enunciado: `A loja de exemplo já tem a tabela <code>produtos</code>. Faça seu primeiro pedido ao MySQL: mostrar a coluna <code>nome</code> de todos os produtos.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Depois do <code>FROM</code> vem o nome da tabela.`,
      lang: "sql",
      inicial: c`SELECT nome FROM ____;`,
      solucao: c`SELECT nome FROM produtos;`
    },
    {
      tipo: "completar",
      titulo: "A palavra que mostra dados",
      enunciado: `O gerente quer ver o <code>nome</code> e o <code>preco</code> de cada produto. Falta a primeira palavra do pedido, aquela que quer dizer “mostre”.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Em inglês, “selecione” é <i>select</i>.`,
      lang: "sql",
      inicial: c`____ nome, preco FROM produtos;`,
      solucao: c`SELECT nome, preco FROM produtos;`
    },
    {
      tipo: "completar",
      titulo: "Todas as colunas dos clientes",
      enunciado: `Mostre <b>todas as colunas</b> da tabela <code>clientes</code>. Use o símbolo que quer dizer “todas as colunas” e o nome da tabela.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `“Todas as colunas” é o asterisco <code>*</code>.`,
      lang: "sql",
      inicial: c`SELECT ____ FROM ____;`,
      solucao: c`SELECT * FROM clientes;`,
      padroes: [[/SELECT\s+\*\s+FROM\s+clientes/i, "Use SELECT * FROM clientes;"]]
    },
    {
      tipo: "criar",
      titulo: "Lista completa de produtos",
      enunciado: `Escreva, do zero, um pedido em SQL que mostre <b>todas as colunas</b> de <b>todos</b> os produtos da tabela <code>produtos</code>. Não esqueça o <code>;</code> no final.`,
      dica: `São só quatro pedacinhos: <code>SELECT</code>, <code>*</code>, <code>FROM</code> e o nome da tabela.`,
      lang: "sql",
      inicial: c`-- Escreva aqui o pedido para mostrar todos os produtos
`,
      solucao: c`SELECT * FROM produtos;`
    },
    {
      tipo: "criar",
      titulo: "Nome e cidade dos clientes",
      enunciado: `O time de entregas quer uma lista só com o <code>nome</code> e a <code>cidade</code> de cada cliente da tabela <code>clientes</code>, nessa ordem de colunas. Escreva o pedido.`,
      dica: `Separe as colunas por vírgula: <code>SELECT coluna1, coluna2 FROM ...</code>`,
      lang: "sql",
      inicial: c`-- Mostre o nome e a cidade dos clientes
`,
      solucao: c`SELECT nome, cidade FROM clientes;`
    }
  ],
  p2: [
    {
      tipo: "completar",
      titulo: "Dizer oi para o servidor",
      enunciado: `Acabou de conectar? Faça o servidor responder um texto para ter certeza de que está tudo funcionando.
        Clique em cada retângulo e escreva o que falta (a palavra que pede para “mostrar”).`,
      dica: `É a mesma palavra que usamos para mostrar colunas de uma tabela.`,
      lang: "sql",
      inicial: c`____ 'Conectei no MySQL!';`,
      solucao: c`SELECT 'Conectei no MySQL!';`
    },
    {
      tipo: "completar",
      titulo: "Que tabelas existem aqui?",
      enunciado: `Primeiro dia no emprego: descubra quais tabelas existem no banco da loja.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `“Mostre as tabelas” em inglês: <i>show tables</i>.`,
      lang: "sql",
      inicial: c`SHOW ____;`,
      solucao: c`SHOW TABLES;`,
      padroes: [[/SHOW\s+TABLES/i, "Use SHOW TABLES; para listar as tabelas."]]
    },
    {
      tipo: "completar",
      titulo: "Conhecer as colunas de produtos",
      enunciado: `Agora veja quais colunas a tabela <code>produtos</code> tem.
        Clique em cada retângulo e escreva o comando que “descreve” a tabela.`,
      dica: `Descrever, em inglês, é <i>describe</i>.`,
      lang: "sql",
      inicial: c`____ produtos;`,
      solucao: c`DESCRIBE produtos;`,
      padroes: [[/\b(DESCRIBE|DESC)\s+produtos/i, "Use DESCRIBE produtos; para ver as colunas."]]
    },
    {
      tipo: "criar",
      titulo: "Mensagem de teste da conexão",
      enunciado: `Escreva um pedido que faça o MySQL mostrar exatamente o texto <code>Servidor funcionando</code> (sem ponto no final).`,
      dica: `Texto vai entre aspas simples, depois do <code>SELECT</code>.`,
      lang: "sql",
      inicial: c`-- Peça para o MySQL mostrar o texto Servidor funcionando
`,
      solucao: c`SELECT 'Servidor funcionando';`
    },
    {
      tipo: "criar",
      titulo: "Explorando o banco da loja",
      enunciado: `Você ganhou acesso ao banco da loja e quer se situar. Escreva dois comandos, nesta ordem:
        <ol>
          <li>liste as tabelas do banco;</li>
          <li>mostre as colunas da tabela <code>clientes</code>.</li>
        </ol>`,
      dica: `Um comando começa com <code>SHOW</code> e o outro com <code>DESCRIBE</code>. Termine cada um com <code>;</code>.`,
      lang: "sql",
      inicial: c`-- 1) Liste as tabelas

-- 2) Mostre as colunas de clientes
`,
      solucao: c`SHOW TABLES;
DESCRIBE clientes;`,
      padroes: [[/SHOW\s+TABLES/i, "Comece listando as tabelas com SHOW TABLES;"]]
    }
  ],
  p3: [
    {
      tipo: "completar",
      titulo: "Banco e tabela da padaria",
      enunciado: `A Padaria Pão Quente quer começar a anotar os pães. Complete o script que cria o banco <code>padaria</code> e a tabela <code>paes</code>.
        Clique em cada retângulo e escreva o que falta. (No sandbox, o <code>CREATE DATABASE</code> e o <code>USE</code> são ignorados, mas a tabela é criada de verdade.)`,
      dica: `As duas lacunas pedem o que está sendo criado: um banco (<i>database</i>) e uma tabela (<i>table</i>).`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE ____ padaria;
USE padaria;

CREATE ____ paes (
  nome VARCHAR(50),
  quantidade INT
);`,
      solucao: c`CREATE DATABASE padaria;
USE padaria;

CREATE TABLE paes (
  nome VARCHAR(50),
  quantidade INT
);`,
      padroes: [[/CREATE\s+(DATABASE|SCHEMA)\s+padaria/i, "A primeira linha deve ser CREATE DATABASE padaria;"]],
      verificacao: estrutura("paes")
    },
    {
      tipo: "completar",
      titulo: "Os tipos das colunas de clientes",
      enunciado: `Na tabela <code>clientes</code>, o <code>nome</code> é um <b>texto</b> de até 100 letras e a <code>idade</code> é um <b>número inteiro</b>. Complete os tipos.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Texto: <code>VARCHAR</code>. Número inteiro: <code>INT</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE clientes (
  nome ____(100),
  idade ____
);`,
      solucao: c`CREATE TABLE clientes (
  nome VARCHAR(100),
  idade INT
);`,
      verificacao: estrutura("clientes")
    },
    {
      tipo: "completar",
      titulo: "Agenda de contatos",
      enunciado: `Crie a agenda: o banco <code>agenda</code> (entre nele) e a tabela <code>contatos</code>.
        Clique em cada retângulo e escreva o que falta: o nome do banco no <code>USE</code> e o nome da tabela.`,
      dica: `Use os mesmos nomes do enunciado: <code>agenda</code> e <code>contatos</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE DATABASE agenda;
USE ____;

CREATE TABLE ____ (
  nome VARCHAR(80),
  telefone VARCHAR(20)
);`,
      solucao: c`CREATE DATABASE agenda;
USE agenda;

CREATE TABLE contatos (
  nome VARCHAR(80),
  telefone VARCHAR(20)
);`,
      padroes: [[/USE\s+agenda\s*;/i, "Entre no banco com USE agenda;"]],
      verificacao: estrutura("contatos")
    },
    {
      tipo: "criar",
      titulo: "Tabela de alunos",
      enunciado: `A Escola Saber quer a tabela <code>alunos</code> com duas colunas, nesta ordem:
        <ul>
          <li><code>nome</code>: texto de até 100 letras (<code>VARCHAR(100)</code>);</li>
          <li><code>idade</code>: número inteiro (<code>INT</code>).</li>
        </ul>`,
      dica: `<code>CREATE TABLE alunos ( coluna tipo, coluna tipo );</code> Vírgula entre as colunas, nenhuma depois da última.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- Crie a tabela alunos com nome e idade
`,
      solucao: c`CREATE TABLE alunos (
  nome VARCHAR(100),
  idade INT
);`,
      verificacao: estrutura("alunos")
    },
    {
      tipo: "criar",
      titulo: "Biblioteca da escola",
      enunciado: `Monte do zero a biblioteca:
        <ol>
          <li>crie o banco <code>biblioteca</code>;</li>
          <li>entre nele com <code>USE</code>;</li>
          <li>crie a tabela <code>livros</code> com <code>titulo</code> (<code>VARCHAR(150)</code>) e <code>paginas</code> (<code>INT</code>), nesta ordem.</li>
        </ol>`,
      dica: `Três comandos, cada um terminando com <code>;</code>: <code>CREATE DATABASE</code>, <code>USE</code> e <code>CREATE TABLE</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- 1) Crie o banco biblioteca

-- 2) Entre no banco

-- 3) Crie a tabela livros
`,
      solucao: c`CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros (
  titulo VARCHAR(150),
  paginas INT
);`,
      padroes: [
        [/CREATE\s+(DATABASE|SCHEMA)\s+biblioteca\s*;/i, "Crie o banco com CREATE DATABASE biblioteca;"],
        [/USE\s+biblioteca\s*;/i, "Entre no banco com USE biblioteca;"]
      ],
      verificacao: estrutura("livros")
    }
  ],
  p4: [
    {
      tipo: "completar",
      titulo: "Anotar uma fruta na feira",
      enunciado: `A barraca de frutas tem a tabela <code>frutas</code>. Coloque nela a fruta <code>'Banana'</code> com quantidade <code>12</code>.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `O comando é <code>INSERT ... tabela (colunas) ... (valores)</code>. Faltam a palavra que vem depois do INSERT e a que vem antes dos valores.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE frutas (
  nome VARCHAR(50),
  quantidade INT
);

INSERT ____ frutas (nome, quantidade) ____ ('Banana', 12);`,
      solucao: c`CREATE TABLE frutas (
  nome VARCHAR(50),
  quantidade INT
);

INSERT INTO frutas (nome, quantidade) VALUES ('Banana', 12);`,
      verificacao: c`SELECT nome, quantidade FROM frutas ORDER BY nome`
    },
    {
      tipo: "completar",
      titulo: "Ver tudo o que foi anotado",
      enunciado: `Os pães já foram cadastrados. Agora mostre <b>todas as colunas</b> da tabela <code>paes</code>.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `“Todas as colunas” é o <code>*</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE paes (
  nome VARCHAR(50),
  quantidade INT
);
INSERT INTO paes (nome, quantidade) VALUES ('Pão francês', 30), ('Sonho', 12);

SELECT ____ FROM paes;`,
      solucao: c`CREATE TABLE paes (
  nome VARCHAR(50),
  quantidade INT
);
INSERT INTO paes (nome, quantidade) VALUES ('Pão francês', 30), ('Sonho', 12);

SELECT * FROM paes;`
    },
    {
      tipo: "completar",
      titulo: "Cliente novo na loja",
      enunciado: `Cadastre a cliente <code>Ana</code>, de <code>Recife</code>. A cidade já está pronta; falta o nome.
        Clique em cada retângulo e escreva o que falta (lembre: texto vai entre aspas).`,
      dica: `Escreva o nome entre aspas simples, igual à cidade: <code>'Recife'</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE clientes (
  nome VARCHAR(100),
  cidade VARCHAR(60)
);

INSERT INTO clientes (nome, cidade) VALUES (____, 'Recife');`,
      solucao: c`CREATE TABLE clientes (
  nome VARCHAR(100),
  cidade VARCHAR(60)
);

INSERT INTO clientes (nome, cidade) VALUES ('Ana', 'Recife');`,
      verificacao: c`SELECT nome, cidade FROM clientes`
    },
    {
      tipo: "criar",
      titulo: "Dois contatos na agenda",
      enunciado: `A tabela <code>contatos</code> já existe. Cadastre os dois contatos abaixo e, no final, mostre tudo com <code>SELECT * FROM contatos;</code>.
        <ul>
          <li><code>'Maria'</code>, telefone <code>'81999990000'</code>;</li>
          <li><code>'João'</code>, telefone <code>'11988887777'</code>.</li>
        </ul>`,
      dica: `<code>INSERT INTO contatos (nome, telefone) VALUES (...), (...);</code> O telefone é texto, então vai entre aspas.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE contatos (
  nome VARCHAR(80),
  telefone VARCHAR(20)
);

-- Cadastre Maria e João

-- Mostre todos os contatos
`,
      solucao: c`CREATE TABLE contatos (
  nome VARCHAR(80),
  telefone VARCHAR(20)
);

INSERT INTO contatos (nome, telefone) VALUES
  ('Maria', '81999990000'),
  ('João', '11988887777');

SELECT * FROM contatos;`,
      padroes: [[/SELECT\s+\*\s+FROM\s+contatos/i, "No final, mostre tudo com SELECT * FROM contatos;"]],
      verificacao: c`SELECT nome, telefone FROM contatos ORDER BY nome`
    },
    {
      tipo: "criar",
      titulo: "Estoque da papelaria do zero",
      enunciado: `Faça tudo sozinho para a papelaria:
        <ol>
          <li>crie a tabela <code>produtos</code> com <code>nome</code> (<code>VARCHAR(80)</code>) e <code>estoque</code> (<code>INT</code>);</li>
          <li>cadastre <code>'Caderno'</code> com 20, <code>'Lápis'</code> com 100 e <code>'Borracha'</code> com 35;</li>
          <li>mostre <b>só a coluna</b> <code>nome</code> de todos os produtos.</li>
        </ol>`,
      dica: `Três partes: <code>CREATE TABLE</code>, <code>INSERT INTO ... VALUES</code> e <code>SELECT nome FROM produtos;</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- 1) Crie a tabela produtos

-- 2) Cadastre os três produtos

-- 3) Mostre só os nomes
`,
      solucao: c`CREATE TABLE produtos (
  nome VARCHAR(80),
  estoque INT
);

INSERT INTO produtos (nome, estoque) VALUES
  ('Caderno', 20),
  ('Lápis', 100),
  ('Borracha', 35);

SELECT nome FROM produtos;`,
      padroes: [[/SELECT\s+nome\s+FROM\s+produtos/i, "No final, mostre só os nomes com SELECT nome FROM produtos;"]],
      verificacao: c`SELECT p.nome, p.estoque, (SELECT GROUP_CONCAT(UPPER(REPLACE(type, ' ', '')), '|') FROM pragma_table_info('produtos')) FROM produtos p ORDER BY p.nome`
    }
  ]
};
