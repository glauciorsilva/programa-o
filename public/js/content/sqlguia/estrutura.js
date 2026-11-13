// SQL de A a Z — Parte 2: banco de dados (CREATE, restrições, índices, views, segurança)
// e Parte 3: referência (tipos de dados, palavras-chave e funções).

const valores = { tipo: "valores" };
const ordenado = { tipo: "valores", ordenado: true };
const contagem = (sql, min, max = min, msg) => ({ tipo: "contagem", sql, min, max, msg });
const funciona = (sql, msg, desfazer) => ({ tipo: "funciona", sql, msg, desfazer });
const falha = (sql, msg) => ({ tipo: "falha", sql, msg });

const BD = "2. Banco de dados (SQL Database)";
const REF = "3. Referência e funções";

const teoriaSo = (id, secao, titulo, teoria) => ({ id, secao, titulo, teoria, tarefas: [] });
const ddl = (id, titulo, tabelas, teoria, tarefas, extra = {}) => ({
  id, secao: BD, titulo, banco: "loja", tabelas, inicial: extra.inicial || "", teoria, tarefas, manual: true, ...extra
});
const ref = (id, titulo, tabelas, teoria, tarefas, extra = {}) => ({
  id, secao: REF, titulo, banco: "loja", tabelas, inicial: `SELECT * FROM ${tabelas[0]};`, teoria, tarefas, ...extra
});

export default [
  teoriaSo("create-db", BD, "CREATE DATABASE", `
      <p>Antes das tabelas vem o <b>banco de dados</b>, que é o “arquivo” ou espaço que guarda todas elas.</p>
      <pre><code>CREATE DATABASE distribuidora;</code></pre>
      <p>Para ver os bancos existentes: <code>SHOW DATABASES;</code> (MySQL) ou consultando <code>sys.databases</code> (SQL Server). Para escolher qual usar: <code>USE distribuidora;</code>.</p>
      <p>⚠️ Criar bancos exige permissão de administrador.</p>
      <h3>E no SQLite?</h3>
      <p>No SQLite, cada banco é <b>um arquivo</b> (ex.: <code>distribuidora.db</code>). Ele é criado na hora em que você abre o arquivo; não existe <code>CREATE DATABASE</code>. Neste guia, o banco é criado automaticamente na memória do seu navegador a cada lição.</p>`),
  teoriaSo("drop-db", BD, "DROP DATABASE", `
      <p><code>DROP DATABASE</code> apaga um banco <b>inteiro</b>, com todas as tabelas e dados.</p>
      <pre><code>DROP DATABASE distribuidora;
DROP DATABASE IF EXISTS distribuidora; -- sem erro se não existir</code></pre>
      <p>⚠️ Não tem “desfazer”. Em empresas, esse comando costuma ser bloqueado para quase todo mundo e só é usado com backup recente.</p>
      <p>No SQLite, “apagar o banco” é apagar o arquivo <code>.db</code>.</p>`),
  teoriaSo("backup-db", BD, "BACKUP DATABASE", `
      <p>Backup é a cópia de segurança do banco. No <b>SQL Server</b>:</p>
      <pre><code>BACKUP DATABASE distribuidora
TO DISK = 'D:\\backups\\distribuidora.bak';

-- backup diferencial: só o que mudou desde o último backup completo
BACKUP DATABASE distribuidora
TO DISK = 'D:\\backups\\distribuidora.bak'
WITH DIFFERENTIAL;</code></pre>
      <p>💡 Guarde o backup em <b>outro disco/servidor</b> que não o do banco.</p>
      <h3>Em outros bancos</h3>
      <ul>
        <li><b>MySQL</b>: ferramenta de linha de comando <code>mysqldump -u usuario -p distribuidora &gt; backup.sql</code>.</li>
        <li><b>PostgreSQL</b>: <code>pg_dump distribuidora &gt; backup.sql</code>.</li>
        <li><b>SQLite</b>: <code>.backup backup.db</code> no terminal <code>sqlite3</code>, ou <code>VACUUM INTO 'backup.db';</code>.</li>
        <li><b>Nuvem</b> (AWS RDS, Azure SQL…): backups automáticos com retenção configurável.</li>
      </ul>`),
  ddl("create-table", "CREATE TABLE", ["clientes"], `
      <p><code>CREATE TABLE</code> cria uma tabela, dizendo o <b>nome</b> e o <b>tipo</b> de cada coluna:</p>
      <pre><code>CREATE TABLE pessoas (
  id INTEGER,
  sobrenome VARCHAR(255),
  nome VARCHAR(255),
  endereco VARCHAR(255),
  cidade VARCHAR(255)
);</code></pre>
      <p>O tipo diz o que a coluna aceita: <code>INTEGER</code> (inteiro), <code>VARCHAR(n)</code>/<code>TEXT</code> (texto), <code>DECIMAL</code>/<code>REAL</code> (decimal), <code>DATE</code> (data)…</p>
      <h3>Criar a partir de outra tabela</h3>
      <pre><code>CREATE TABLE contatos AS
SELECT nome, contato FROM clientes;</code></pre>
      <p>💡 <code>CREATE TABLE IF NOT EXISTS</code> evita erro se a tabela já existir.</p>`, [
      { texto: "Crie a tabela <code>pessoas</code> com as colunas <code>id</code> (inteiro), <code>sobrenome</code>, <code>nome</code>, <code>endereco</code> e <code>cidade</code> (textos)", solucao: "CREATE TABLE pessoas (\n  id INTEGER,\n  sobrenome VARCHAR(255),\n  nome VARCHAR(255),\n  endereco VARCHAR(255),\n  cidade VARCHAR(255)\n);", checks: [funciona("SELECT id, sobrenome, nome, endereco, cidade FROM pessoas", "A tabela pessoas (com as 5 colunas pedidas) ainda não existe.")] },
      { texto: "Crie a tabela <code>contatos</code> a partir de um SELECT com <code>nome</code> e <code>contato</code> de todos os clientes", solucao: "CREATE TABLE contatos AS SELECT nome, contato FROM clientes;", checks: [contagem("SELECT nome, contato FROM contatos", 20, 20, "contatos deveria ter as 20 linhas dos clientes.")] }
    ], { tabelas: ["clientes", "pessoas", "contatos"] }),
  ddl("drop-table", "DROP TABLE e TRUNCATE", ["transportadoras", "categorias"], `
      <p><code>DROP TABLE</code> apaga a tabela inteira (estrutura e dados):</p>
      <pre><code>DROP TABLE transportadoras;
DROP TABLE IF EXISTS transportadoras;</code></pre>
      <p><code>TRUNCATE TABLE</code> apaga <b>só os dados</b> e mantém a tabela (MySQL, SQL Server, PostgreSQL). É mais rápido que <code>DELETE</code> sem WHERE.</p>
      <pre><code>TRUNCATE TABLE categorias;</code></pre>
      <p>⚠️ O SQLite não tem <code>TRUNCATE</code>: use <code>DELETE FROM categorias;</code>.</p>`, [
      { texto: "Apague os <b>dados</b> da tabela <code>categorias</code>, mantendo a tabela (no SQLite: <code>DELETE FROM</code>)", solucao: "DELETE FROM categorias;", checks: [contagem("SELECT * FROM categorias", 0, 0, "categorias ainda tem linhas."), funciona("SELECT * FROM categorias", "A tabela categorias deveria continuar existindo (use DELETE, não DROP).")] },
      { texto: "Apague a tabela <code>transportadoras</code> por completo", solucao: "DROP TABLE transportadoras;", checks: [falha("SELECT * FROM transportadoras", "A tabela transportadoras ainda existe.")] }
    ]),
  ddl("alter-table", "ALTER TABLE", ["clientes"], `
      <p><code>ALTER TABLE</code> muda a estrutura de uma tabela que já existe.</p>
      <pre><code>-- adicionar coluna
ALTER TABLE clientes ADD email VARCHAR(255);

-- apagar coluna
ALTER TABLE clientes DROP COLUMN email;

-- renomear coluna
ALTER TABLE clientes RENAME COLUMN contato TO responsavel;

-- renomear a tabela
ALTER TABLE clientes RENAME TO compradores;</code></pre>
      <h3>Mudar o tipo de uma coluna</h3>
      <ul>
        <li>SQL Server / Access: <code>ALTER TABLE t ALTER COLUMN c tipo;</code></li>
        <li>MySQL / Oracle antigo: <code>ALTER TABLE t MODIFY COLUMN c tipo;</code></li>
        <li>Oracle 10g+: <code>ALTER TABLE t MODIFY c tipo;</code></li>
        <li>SQLite: não muda tipo; recria-se a tabela.</li>
      </ul>`, [
      { texto: "Adicione a coluna <code>email</code> (texto) à tabela <code>clientes</code>", solucao: "ALTER TABLE clientes ADD email VARCHAR(255);", checks: [funciona("SELECT email FROM clientes", "A coluna email ainda não existe em clientes.")] },
      { texto: "Renomeie a coluna <code>contato</code> para <code>responsavel</code>", solucao: "ALTER TABLE clientes RENAME COLUMN contato TO responsavel;", checks: [funciona("SELECT responsavel FROM clientes", "A coluna responsavel ainda não existe."), falha("SELECT contato FROM clientes", "A coluna contato ainda existe.")] },
      { texto: "Apague a coluna <code>email</code> que você criou", solucao: "ALTER TABLE clientes DROP COLUMN email;", checks: [falha("SELECT email FROM clientes", "A coluna email ainda existe.")] }
    ]),
  ddl("restricoes", "Restrições (constraints)", ["clientes"], `
      <p><b>Restrições</b> são regras para os dados de uma coluna ou tabela. Se um comando quebrar a regra, o banco recusa. Elas garantem dados confiáveis.</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Restrição</th><th>Garante que…</th></tr></thead><tbody>
        <tr><td><code>NOT NULL</code></td><td>a coluna não fica vazia</td></tr>
        <tr><td><code>UNIQUE</code></td><td>não há valores repetidos</td></tr>
        <tr><td><code>PRIMARY KEY</code></td><td>NOT NULL + UNIQUE: identifica cada linha</td></tr>
        <tr><td><code>FOREIGN KEY</code></td><td>o valor existe em outra tabela (mantém o vínculo)</td></tr>
        <tr><td><code>CHECK</code></td><td>o valor atende uma condição</td></tr>
        <tr><td><code>DEFAULT</code></td><td>há um valor padrão quando nada é informado</td></tr>
        <tr><td><code>CREATE INDEX</code></td><td>(não é restrição, mas anda junto) buscas rápidas</td></tr>
      </tbody></table>
      <pre><code>CREATE TABLE contas (
  id INTEGER PRIMARY KEY,
  titular TEXT NOT NULL,
  cpf TEXT UNIQUE,
  saldo REAL DEFAULT 0 CHECK (saldo &gt;= 0)
);</code></pre>`, [
      { texto: "Crie a tabela <code>contas</code> exatamente como no exemplo (com <code>PRIMARY KEY</code>, <code>NOT NULL</code>, <code>UNIQUE</code>, <code>DEFAULT</code> e <code>CHECK</code>)", solucao: "CREATE TABLE contas (\n  id INTEGER PRIMARY KEY,\n  titular TEXT NOT NULL,\n  cpf TEXT UNIQUE,\n  saldo REAL DEFAULT 0 CHECK (saldo >= 0)\n);", checks: [funciona("SELECT id, titular, cpf, saldo FROM contas", "A tabela contas ainda não existe."), falha("INSERT INTO contas (titular, saldo) VALUES ('x', -5)", "O CHECK (saldo >= 0) não está funcionando."), falha("INSERT INTO contas (titular) VALUES (NULL)", "titular deveria ser NOT NULL.")] },
      { texto: "Insira a conta de <code>'Ana'</code> sem informar o saldo e confira que ele ficou 0 (DEFAULT)", solucao: "INSERT INTO contas (titular) VALUES ('Ana');\nSELECT * FROM contas;", checks: [contagem("SELECT * FROM contas WHERE titular = 'Ana' AND saldo = 0", 1, 9, "Não encontrei a conta da Ana com saldo 0.")] }
    ], { tabelas: ["contas"] }),
  ddl("not-null", "NOT NULL", ["pessoas"], `
      <p><code>NOT NULL</code> obriga a coluna a ter valor: não dá para inserir nem atualizar deixando-a vazia.</p>
      <pre><code>CREATE TABLE pessoas (
  id INTEGER NOT NULL,
  sobrenome TEXT NOT NULL,
  nome TEXT NOT NULL,
  idade INTEGER
);</code></pre>
      <p>Em tabela que já existe: <code>ALTER TABLE pessoas MODIFY idade INT NOT NULL;</code> (MySQL) ou <code>ALTER COLUMN idade INT NOT NULL</code> (SQL Server).</p>`, [
      { texto: "Crie a tabela <code>pessoas</code> do exemplo (<code>id</code>, <code>sobrenome</code> e <code>nome</code> com NOT NULL; <code>idade</code> opcional)", solucao: "CREATE TABLE pessoas (\n  id INTEGER NOT NULL,\n  sobrenome TEXT NOT NULL,\n  nome TEXT NOT NULL,\n  idade INTEGER\n);", checks: [funciona("SELECT id, sobrenome, nome, idade FROM pessoas", "A tabela pessoas ainda não existe."), falha("INSERT INTO pessoas (id, sobrenome) VALUES (1, 'Silva')", "nome deveria ser NOT NULL."), funciona("INSERT INTO pessoas (id, sobrenome, nome) VALUES (99, 'T', 'T'); DELETE FROM pessoas WHERE id = 99", "Deveria ser possível inserir sem idade.")] },
      { texto: "Tente inserir uma pessoa <b>sem sobrenome</b> e veja o erro. Depois insira <code>(1, 'Silva', 'Ana', 30)</code> corretamente", solucao: "INSERT INTO pessoas VALUES (1, 'Silva', 'Ana', 30);", checks: [contagem("SELECT * FROM pessoas WHERE id = 1 AND nome = 'Ana'", 1, 9, "Não encontrei a Ana (id 1).")] }
    ], { tabelas: ["pessoas"] }),
  ddl("unique", "UNIQUE", ["pessoas"], `
      <p><code>UNIQUE</code> garante que não haja valores repetidos na coluna (mas aceita <code>NULL</code>). Uma tabela pode ter várias colunas UNIQUE, mas só uma PRIMARY KEY.</p>
      <pre><code>CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  login TEXT,
  CONSTRAINT uq_login UNIQUE (login)
);</code></pre>
      <p>Com nome (<code>CONSTRAINT uq_login</code>) fica mais fácil apagar depois: <code>ALTER TABLE usuarios DROP CONSTRAINT uq_login;</code> (SQL Server/Oracle) ou <code>DROP INDEX uq_login</code> (MySQL).</p>
      <p>UNIQUE em várias colunas juntas: <code>UNIQUE (nome, sobrenome)</code>.</p>`, [
      { texto: "Crie a tabela <code>usuarios</code> do exemplo, com <code>email</code> e <code>login</code> únicos", solucao: "CREATE TABLE usuarios (\n  id INTEGER PRIMARY KEY,\n  email TEXT UNIQUE,\n  login TEXT,\n  CONSTRAINT uq_login UNIQUE (login)\n);", checks: [funciona("SELECT id, email, login FROM usuarios", "A tabela usuarios ainda não existe."), falha("INSERT INTO usuarios (email, login) VALUES ('a@x.com', 'a'), ('a@x.com', 'b')", "email deveria ser UNIQUE."), falha("INSERT INTO usuarios (email, login) VALUES ('c@x.com', 'z'), ('d@x.com', 'z')", "login deveria ser UNIQUE.")] },
      { texto: "Insira os usuários <code>'ana@loja.com'</code> (login <code>'ana'</code>) e <code>'bia@loja.com'</code> (login <code>'bia'</code>)", solucao: "INSERT INTO usuarios (email, login) VALUES ('ana@loja.com', 'ana'), ('bia@loja.com', 'bia');", checks: [contagem("SELECT * FROM usuarios WHERE login IN ('ana', 'bia')", 2, 2, "Faltam os usuários ana e bia.")] }
    ], { tabelas: ["usuarios"] }),
  ddl("primary-key", "PRIMARY KEY", ["pessoas"], `
      <p>A <b>chave primária</b> identifica cada linha de forma única: não pode repetir nem ser <code>NULL</code>. Cada tabela tem <b>uma</b> chave primária, que pode ter uma ou mais colunas.</p>
      <pre><code>CREATE TABLE pessoas (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL
);

-- chave composta (duas colunas juntas)
CREATE TABLE matriculas (
  aluno_id INTEGER,
  curso_id INTEGER,
  CONSTRAINT pk_matricula PRIMARY KEY (aluno_id, curso_id)
);</code></pre>
      <p>Em tabela existente: <code>ALTER TABLE pessoas ADD PRIMARY KEY (id);</code> (MySQL/SQL Server).</p>`, [
      { texto: "Crie a tabela <code>pessoas</code> com <code>id</code> INTEGER PRIMARY KEY e <code>nome</code> TEXT NOT NULL", solucao: "CREATE TABLE pessoas (\n  id INTEGER PRIMARY KEY,\n  nome TEXT NOT NULL\n);", checks: [funciona("SELECT id, nome FROM pessoas", "A tabela pessoas ainda não existe."), falha("INSERT INTO pessoas (id, nome) VALUES (500, 'a'), (500, 'b')", "id deveria ser PRIMARY KEY (não pode repetir).")] },
      { texto: "Crie a tabela <code>matriculas</code> com chave primária <b>composta</b> (<code>aluno_id</code>, <code>curso_id</code>)", solucao: "CREATE TABLE matriculas (\n  aluno_id INTEGER,\n  curso_id INTEGER,\n  CONSTRAINT pk_matricula PRIMARY KEY (aluno_id, curso_id)\n);", checks: [funciona("SELECT aluno_id, curso_id FROM matriculas", "A tabela matriculas ainda não existe."), falha("INSERT INTO matriculas VALUES (1, 1), (1, 1)", "A dupla (aluno_id, curso_id) deveria ser a chave primária."), funciona("INSERT INTO matriculas VALUES (7, 1), (7, 2); DELETE FROM matriculas WHERE aluno_id = 7", "Um aluno deveria poder ter vários cursos.")] }
    ], { tabelas: ["pessoas", "matriculas"] }),
  ddl("foreign-key", "FOREIGN KEY", ["clientes"], `
      <p>Uma <b>chave estrangeira</b> é uma coluna que aponta para a chave primária de <b>outra</b> tabela. Ela impede vínculos quebrados (ex.: um pedido de um cliente que não existe).</p>
      <pre><code>CREATE TABLE vendas (
  id INTEGER PRIMARY KEY,
  numero INTEGER NOT NULL,
  cliente_id INTEGER,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);</code></pre>
      <ul>
        <li>A tabela com a chave estrangeira é a <b>filha</b>; a referenciada é a <b>pai</b>.</li>
        <li><code>ON DELETE CASCADE</code>: ao apagar o pai, apaga os filhos junto.</li>
      </ul>
      <p>⚠️ No SQLite, as chaves estrangeiras só são conferidas depois de <code>PRAGMA foreign_keys = ON;</code> (rode esse comando antes dos seus INSERT para ver o banco recusar um cliente que não existe).</p>`, [
      { texto: "Crie a tabela <code>vendas</code> do exemplo, com <code>cliente_id</code> referenciando <code>clientes(id)</code>", solucao: "CREATE TABLE vendas (\n  id INTEGER PRIMARY KEY,\n  numero INTEGER NOT NULL,\n  cliente_id INTEGER,\n  FOREIGN KEY (cliente_id) REFERENCES clientes(id)\n);", checks: [funciona("SELECT id, numero, cliente_id FROM vendas", "A tabela vendas ainda não existe."), falha("PRAGMA foreign_keys = ON; INSERT INTO vendas (numero, cliente_id) VALUES (1, 999)", "A chave estrangeira não está funcionando: cliente 999 não existe e foi aceito.")] },
      { texto: "Insira a venda número <code>5001</code> para o cliente <code>3</code>", solucao: "INSERT INTO vendas (numero, cliente_id) VALUES (5001, 3);", checks: [contagem("SELECT * FROM vendas WHERE numero = 5001 AND cliente_id = 3", 1, 9, "Não encontrei a venda 5001 do cliente 3.")] }
    ], { tabelas: ["vendas"] }),
  ddl("check", "CHECK", ["produtos"], `
      <p><code>CHECK</code> limita os valores aceitos por uma condição.</p>
      <pre><code>CREATE TABLE alunos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  idade INTEGER CHECK (idade &gt;= 18),
  cidade TEXT,
  CONSTRAINT ck_aluno CHECK (idade &lt;= 120 AND cidade &lt;&gt; '')
);</code></pre>
      <p>Em tabela existente (MySQL, SQL Server, PostgreSQL): <code>ALTER TABLE alunos ADD CHECK (idade &gt;= 18);</code>. ⚠️ No SQLite, CHECK só na criação.</p>`, [
      { texto: "Crie a tabela <code>alunos</code> do exemplo (idade de 18 a 120 e cidade não vazia)", solucao: "CREATE TABLE alunos (\n  id INTEGER PRIMARY KEY,\n  nome TEXT NOT NULL,\n  idade INTEGER CHECK (idade >= 18),\n  cidade TEXT,\n  CONSTRAINT ck_aluno CHECK (idade <= 120 AND cidade <> '')\n);", checks: [funciona("SELECT id, nome, idade, cidade FROM alunos", "A tabela alunos ainda não existe."), falha("INSERT INTO alunos (nome, idade, cidade) VALUES ('x', 15, 'Natal')", "Idade 15 deveria ser recusada."), falha("INSERT INTO alunos (nome, idade, cidade) VALUES ('x', 130, 'Natal')", "Idade 130 deveria ser recusada."), falha("INSERT INTO alunos (nome, idade, cidade) VALUES ('x', 30, '')", "Cidade vazia deveria ser recusada.")] },
      { texto: "Insira o aluno <code>'Caio'</code>, 25 anos, de <code>'Natal'</code>", solucao: "INSERT INTO alunos (nome, idade, cidade) VALUES ('Caio', 25, 'Natal');", checks: [contagem("SELECT * FROM alunos WHERE nome = 'Caio'", 1, 9, "O aluno Caio não foi inserido.")] }
    ], { tabelas: ["alunos"] }),
  ddl("default", "DEFAULT", ["pedidos"], `
      <p><code>DEFAULT</code> define o valor usado quando o INSERT não informa a coluna.</p>
      <pre><code>CREATE TABLE tarefas (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  criada_em TEXT DEFAULT CURRENT_TIMESTAMP
);</code></pre>
      <p>Funções como <code>CURRENT_TIMESTAMP</code> (data e hora atual) podem ser o padrão. Em tabela existente: <code>ALTER TABLE t ALTER cidade SET DEFAULT 'Natal';</code> (MySQL).</p>`, [
      { texto: "Crie a tabela <code>tarefas</code> do exemplo, com <code>status</code> padrão <code>'pendente'</code> e <code>criada_em</code> padrão <code>CURRENT_TIMESTAMP</code>", solucao: "CREATE TABLE tarefas (\n  id INTEGER PRIMARY KEY,\n  titulo TEXT NOT NULL,\n  status TEXT DEFAULT 'pendente',\n  criada_em TEXT DEFAULT CURRENT_TIMESTAMP\n);", checks: [funciona("SELECT id, titulo, status, criada_em FROM tarefas", "A tabela tarefas ainda não existe.")] },
      { texto: "Insira a tarefa <code>'Conferir estoque'</code> informando <b>só</b> o título, e confira o status e a data automáticos", solucao: "INSERT INTO tarefas (titulo) VALUES ('Conferir estoque');\nSELECT * FROM tarefas;", checks: [contagem("SELECT * FROM tarefas WHERE titulo = 'Conferir estoque' AND status = 'pendente' AND criada_em IS NOT NULL", 1, 9, "Não encontrei a tarefa com status 'pendente' e data preenchida.")] }
    ], { tabelas: ["tarefas"] }),
  ddl("index", "CREATE INDEX", ["clientes"], `
      <p>Um <b>índice</b> é como o índice de um livro: faz o banco achar linhas <b>muito mais rápido</b>, sem ler a tabela inteira. O usuário não vê o índice; ele só acelera as buscas.</p>
      <pre><code>CREATE INDEX idx_clientes_cidade ON clientes (cidade);
CREATE INDEX idx_clientes_pais_cidade ON clientes (pais, cidade);
CREATE UNIQUE INDEX idx_clientes_nome ON clientes (nome); -- sem repetição

DROP INDEX idx_clientes_cidade;</code></pre>
      <p>⚠️ Índices deixam <code>INSERT</code>/<code>UPDATE</code> um pouco mais lentos (o índice também precisa ser atualizado). Crie para colunas muito usadas em <code>WHERE</code>, <code>JOIN</code> e <code>ORDER BY</code>.</p>
      <p>Para ver se a consulta usa o índice: <code>EXPLAIN QUERY PLAN SELECT * FROM clientes WHERE cidade = 'Natal';</code> (SQLite) ou <code>EXPLAIN</code> (MySQL).</p>`, [
      { texto: "Crie o índice <code>idx_clientes_cidade</code> na coluna <code>cidade</code> de <code>clientes</code>", solucao: "CREATE INDEX idx_clientes_cidade ON clientes (cidade);", checks: [contagem("SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_clientes_cidade'", 1, 1, "O índice idx_clientes_cidade ainda não existe.")] },
      { texto: "Crie o índice <b>único</b> <code>idx_produtos_nome</code> na coluna <code>nome</code> de <code>produtos</code>", solucao: "CREATE UNIQUE INDEX idx_produtos_nome ON produtos (nome);", checks: [contagem("SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_produtos_nome'", 1, 1, "O índice idx_produtos_nome ainda não existe."), falha("INSERT INTO produtos (nome) VALUES ('Picanha')", "O índice deveria ser UNIQUE.")] },
      { texto: "Apague o índice <code>idx_clientes_cidade</code>", solucao: "DROP INDEX idx_clientes_cidade;", checks: [contagem("SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_clientes_cidade'", 0, 0, "O índice idx_clientes_cidade ainda existe.")] }
    ]),
  ddl("autoincrement", "AUTO INCREMENT", ["clientes"], `
      <p>Um campo <b>auto incremento</b> gera um número novo, sozinho, a cada linha inserida. Geralmente é a chave primária.</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Banco</th><th>Sintaxe</th></tr></thead><tbody>
        <tr><td>MySQL</td><td><code>id INT NOT NULL AUTO_INCREMENT PRIMARY KEY</code></td></tr>
        <tr><td>SQL Server</td><td><code>id INT IDENTITY(1,1) PRIMARY KEY</code></td></tr>
        <tr><td>MS Access</td><td><code>id AUTOINCREMENT PRIMARY KEY</code></td></tr>
        <tr><td>Oracle</td><td><code>CREATE SEQUENCE seq...</code> ou <code>GENERATED AS IDENTITY</code></td></tr>
        <tr><td>PostgreSQL</td><td><code>id SERIAL PRIMARY KEY</code> ou <code>GENERATED ALWAYS AS IDENTITY</code></td></tr>
        <tr><td>SQLite</td><td><code>id INTEGER PRIMARY KEY AUTOINCREMENT</code></td></tr>
      </tbody></table>
      <p>No MySQL dá para começar de outro número: <code>ALTER TABLE t AUTO_INCREMENT = 100;</code>.</p>`, [
      { texto: "Crie a tabela <code>chamados</code> com <code>id INTEGER PRIMARY KEY AUTOINCREMENT</code> e <code>assunto TEXT</code>", solucao: "CREATE TABLE chamados (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  assunto TEXT\n);", checks: [funciona("SELECT id, assunto FROM chamados", "A tabela chamados ainda não existe."), contagem("SELECT * FROM sqlite_master WHERE name = 'chamados' AND sql LIKE '%AUTOINCREMENT%'", 1, 1, "Use AUTOINCREMENT no id.")] },
      { texto: "Insira dois chamados (<code>'Impressora'</code> e <code>'Senha'</code>) <b>sem informar o id</b> e confira os ids 1 e 2", solucao: "INSERT INTO chamados (assunto) VALUES ('Impressora'), ('Senha');\nSELECT * FROM chamados;", checks: [contagem("SELECT * FROM chamados WHERE (id = 1 AND assunto = 'Impressora') OR (id = 2 AND assunto = 'Senha')", 2, 2, "Esperava Impressora com id 1 e Senha com id 2. Clique em ↺ Resetar banco e refaça.")] }
    ], { tabelas: ["chamados"] }),
  ref("datas", "Datas no SQL", ["pedidos", "funcionarios"], `
      <p>Trabalhar com datas é fácil se o formato for consistente. O padrão mais seguro é <b>AAAA-MM-DD</b> (ex.: <code>2024-03-09</code>).</p>
      <h3>Tipos de data</h3>
      <ul>
        <li><b>MySQL</b>: <code>DATE</code>, <code>DATETIME</code>, <code>TIMESTAMP</code>, <code>YEAR</code>;</li>
        <li><b>SQL Server</b>: <code>DATE</code>, <code>DATETIME</code>, <code>SMALLDATETIME</code>, <code>TIMESTAMP</code>;</li>
        <li><b>SQLite</b>: guarda como texto (<code>'2024-03-09'</code>) e oferece funções como <code>date()</code>, <code>strftime()</code> e <code>julianday()</code>.</li>
      </ul>
      <pre><code>SELECT * FROM pedidos WHERE data = '2024-03-09';
SELECT * FROM pedidos WHERE strftime('%m', data) = '03';    -- mês de março
SELECT date('2024-03-09', '+30 days');                      -- somar dias
SELECT julianday('2024-12-31') - julianday('2024-01-01');   -- diferença em dias</code></pre>
      <p>⚠️ Se a coluna tiver hora (<code>2024-03-09 14:30:00</code>), <code>data = '2024-03-09'</code> não encontra. Use <code>date(data) = '2024-03-09'</code>.</p>
      <p>No MySQL: <code>YEAR(data)</code>, <code>MONTH(data)</code>, <code>DATE_ADD(data, INTERVAL 30 DAY)</code>, <code>DATEDIFF(a, b)</code>.</p>`, [
      { texto: "Mostre os pedidos do dia <code>'2024-03-09'</code>", solucao: "SELECT * FROM pedidos WHERE data = '2024-03-09';", checks: [valores] },
      { texto: "Mostre os pedidos do <b>mês 04</b> (abril), usando <code>strftime('%m', data)</code>", solucao: "SELECT * FROM pedidos WHERE strftime('%m', data) = '04';", checks: [valores] },
      { texto: "Mostre o <code>id</code>, a <code>data</code> e a data de vencimento (<code>data + 30 dias</code>) de cada pedido", solucao: "SELECT id, data, date(data, '+30 days') FROM pedidos;", checks: [valores] },
      { texto: "Mostre o nome dos funcionários nascidos <b>antes de 1990</b>", solucao: "SELECT nome FROM funcionarios WHERE nascimento < '1990-01-01';", checks: [valores] }
    ], { secao: BD }),
  ddl("views", "Views (visões)", ["clientes"], `
      <p>Uma <b>view</b> é uma <b>tabela virtual</b> definida por um SELECT salvo. Ela não guarda dados: sempre mostra os dados atuais das tabelas de origem. Serve para simplificar consultas repetidas e para mostrar só parte dos dados.</p>
      <pre><code>CREATE VIEW clientes_brasil AS
SELECT nome, contato, cidade FROM clientes
WHERE pais = 'Brasil';

SELECT * FROM clientes_brasil;   -- usa como se fosse tabela</code></pre>
      <ul>
        <li>Alterar: <code>CREATE OR REPLACE VIEW</code> (MySQL/PostgreSQL) ou <code>ALTER VIEW</code> (SQL Server). No SQLite: <code>DROP VIEW</code> e criar de novo.</li>
        <li>Apagar: <code>DROP VIEW clientes_brasil;</code></li>
      </ul>`, [
      { texto: "Crie a view <code>clientes_brasil</code> com <code>nome</code>, <code>contato</code> e <code>cidade</code> dos clientes do Brasil", solucao: "CREATE VIEW clientes_brasil AS\nSELECT nome, contato, cidade FROM clientes\nWHERE pais = 'Brasil';", checks: [contagem("SELECT nome, contato, cidade FROM clientes_brasil", 11, 11, "A view clientes_brasil deveria mostrar os 11 clientes do Brasil.")] },
      { texto: "Crie a view <code>produtos_acima_media</code> com <code>nome</code> e <code>preco</code> dos produtos mais caros que a média", solucao: "CREATE VIEW produtos_acima_media AS\nSELECT nome, preco FROM produtos\nWHERE preco > (SELECT AVG(preco) FROM produtos);", checks: [contagem("SELECT nome, preco FROM produtos_acima_media", 7, 7, "A view deveria mostrar os 7 produtos acima da média.")] },
      { texto: "Apague a view <code>clientes_brasil</code>", solucao: "DROP VIEW clientes_brasil;", checks: [falha("SELECT * FROM clientes_brasil", "A view clientes_brasil ainda existe.")] }
    ], { tabelas: ["clientes", "produtos"] }),
  {
    id: "injection",
    secao: BD,
    titulo: "SQL Injection",
    banco: "loja",
    tabelas: ["usuarios"],
    preload: "CREATE TABLE usuarios (id INTEGER PRIMARY KEY, login TEXT, senha TEXT); INSERT INTO usuarios VALUES (1,'ana','s3nh@'),(2,'bruno','123456'),(3,'admin','Adm!n2024');",
    inicial: "SELECT * FROM usuarios WHERE login = 'ana' AND senha = 'errada';",
    teoria: `
      <p><b>SQL Injection</b> é um dos ataques mais comuns na web: o invasor digita um pedaço de SQL num campo do site (login, busca) e o sistema, mal escrito, executa esse SQL.</p>
      <h3>Como acontece</h3>
      <p>O programa monta o SQL <b>colando</b> o que o usuário digitou:</p>
      <pre><code>// ❌ NUNCA faça assim
sql = "SELECT * FROM usuarios WHERE login = '" + login + "' AND senha = '" + senha + "'";</code></pre>
      <p>Se alguém digitar como senha <code>' OR '1'='1</code>, o SQL vira:</p>
      <pre><code>SELECT * FROM usuarios WHERE login = 'ana' AND senha = '' OR '1'='1';</code></pre>
      <p>Como <code>'1'='1'</code> é sempre verdadeiro (e o <code>AND</code> é avaliado antes do <code>OR</code>), a consulta devolve <b>todos</b> os usuários e o invasor “entra”. Também é possível digitar <code>; DROP TABLE usuarios; --</code> em sistemas que aceitam vários comandos.</p>
      <h3>Como se proteger</h3>
      <ul>
        <li><b>Consultas parametrizadas</b> (próxima lição): o valor nunca vira parte do código SQL;</li>
        <li>Validar a entrada (tipo, tamanho, formato);</li>
        <li>Dar ao usuário do banco só as permissões necessárias;</li>
        <li>Nunca mostrar mensagens de erro do banco para o visitante;</li>
        <li>Guardar senhas com <b>hash</b> (bcrypt, Argon2), nunca em texto puro como nesta tabela de demonstração.</li>
      </ul>`,
    tarefas: [
      { texto: "Veja o login falhar: rode a consulta inicial (senha errada) e confirme que volta 0 linhas. Depois, faça o login <b>correto</b> da Ana (senha <code>'s3nh@'</code>)", solucao: "SELECT * FROM usuarios WHERE login = 'ana' AND senha = 's3nh@';", checks: [valores] },
      { texto: "Simule o ataque: troque a senha por <code>' OR '1'='1</code> no texto da consulta (<code>senha = '' OR '1'='1'</code>) e veja que <b>todos</b> os usuários aparecem", solucao: "SELECT * FROM usuarios WHERE login = 'ana' AND senha = '' OR '1'='1';", checks: [valores] }
    ]
  },
  teoriaSo("parametros", BD, "Parâmetros e prepared statements", `
      <p>A defesa número 1 contra SQL Injection é usar <b>parâmetros</b>: o SQL é escrito com marcadores (<code>?</code>, <code>%s</code>, <code>@nome</code>) e os valores são enviados <b>separados</b>. O banco trata o valor sempre como <b>dado</b>, nunca como código.</p>
      <h3>Python (sqlite3)</h3>
      <pre><code>cur.execute("SELECT * FROM usuarios WHERE login = ? AND senha = ?", (login, senha))</code></pre>
      <h3>Node.js (mysql2)</h3>
      <pre><code>const [linhas] = await db.execute(
  "SELECT * FROM usuarios WHERE login = ? AND senha = ?", [login, senha]);</code></pre>
      <h3>C# (SQL Server)</h3>
      <pre><code>var cmd = new SqlCommand("SELECT * FROM usuarios WHERE login = @login", conexao);
cmd.Parameters.AddWithValue("@login", login);</code></pre>
      <h3>Prepared statement direto no MySQL</h3>
      <pre><code>PREPARE busca FROM 'SELECT * FROM clientes WHERE cidade = ?';
SET @c = 'Lisboa';
EXECUTE busca USING @c;
DEALLOCATE PREPARE busca;</code></pre>
      <p>Vantagens: segurança, e o banco pode reaproveitar o plano da consulta (mais rápido quando ela roda muitas vezes).</p>
      <p>Na trilha 🐍 <b>Python de A a Z</b> há um exercício com <code>sqlite3</code> e parâmetros rodando no navegador.</p>`),
  teoriaSo("hosting", BD, "Hospedagem de bancos SQL", `
      <p>Para um site ou sistema usar um banco, ele precisa estar num <b>servidor</b>. As opções mais comuns:</p>
      <ul>
        <li><b>MySQL / MariaDB</b>: os mais populares em hospedagens compartilhadas (cPanel) e com PHP/WordPress.</li>
        <li><b>PostgreSQL</b>: muito usado em sistemas modernos; disponível em quase toda nuvem.</li>
        <li><b>SQL Server</b>: comum em empresas que usam .NET/Windows.</li>
        <li><b>MS Access</b>: só para uso local/pequeno; não é indicado para sites.</li>
      </ul>
      <h3>Bancos gerenciados na nuvem</h3>
      <p>Em vez de instalar e cuidar do servidor, você contrata o banco pronto: <b>AWS RDS</b>/<b>Aurora</b>, <b>Azure SQL</b>, <b>Google Cloud SQL</b>, <b>Supabase</b>, <b>Neon</b>, <b>PlanetScale</b>… O provedor cuida de backup, atualização e alta disponibilidade. Veja o guia ☁️ <b>AWS de A a Z</b> (lição RDS).</p>
      <p>💡 Ao escolher: veja o preço, a região (latência para seus usuários), backups automáticos e se dá para escalar quando o sistema crescer.</p>`),

  /* ---------------- Parte 3: referência ---------------- */

  teoriaSo("tipos", REF, "Tipos de dados", `
      <p>Cada coluna tem um <b>tipo</b>. Os nomes mudam um pouco entre bancos; os principais:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Categoria</th><th>MySQL</th><th>SQL Server</th><th>SQLite</th></tr></thead><tbody>
        <tr><td>Inteiro</td><td><code>TINYINT</code>, <code>INT</code>, <code>BIGINT</code></td><td><code>TINYINT</code>, <code>INT</code>, <code>BIGINT</code></td><td><code>INTEGER</code></td></tr>
        <tr><td>Decimal exato (dinheiro)</td><td><code>DECIMAL(10,2)</code></td><td><code>DECIMAL(10,2)</code>, <code>MONEY</code></td><td><code>NUMERIC</code></td></tr>
        <tr><td>Decimal aproximado</td><td><code>FLOAT</code>, <code>DOUBLE</code></td><td><code>FLOAT</code>, <code>REAL</code></td><td><code>REAL</code></td></tr>
        <tr><td>Texto curto</td><td><code>CHAR(n)</code>, <code>VARCHAR(n)</code></td><td><code>CHAR</code>, <code>VARCHAR</code>, <code>NVARCHAR</code></td><td><code>TEXT</code></td></tr>
        <tr><td>Texto longo</td><td><code>TEXT</code>, <code>LONGTEXT</code></td><td><code>VARCHAR(MAX)</code></td><td><code>TEXT</code></td></tr>
        <tr><td>Data e hora</td><td><code>DATE</code>, <code>DATETIME</code>, <code>TIMESTAMP</code></td><td><code>DATE</code>, <code>DATETIME2</code></td><td>texto ISO</td></tr>
        <tr><td>Verdadeiro/falso</td><td><code>BOOLEAN</code> (= TINYINT)</td><td><code>BIT</code></td><td>0 / 1</td></tr>
        <tr><td>Binário</td><td><code>BLOB</code></td><td><code>VARBINARY</code></td><td><code>BLOB</code></td></tr>
        <tr><td>Lista fixa</td><td><code>ENUM('a','b')</code></td><td>(use CHECK)</td><td>(use CHECK)</td></tr>
      </tbody></table>
      <p>💡 Para dinheiro, prefira <code>DECIMAL</code>: <code>FLOAT</code> pode gerar erros de arredondamento (0,1 + 0,2 ≠ 0,3).</p>
      <p><code>CHAR(10)</code> ocupa sempre 10 caracteres; <code>VARCHAR(10)</code> ocupa só o necessário, até 10.</p>`),
  teoriaSo("palavras-chave", REF, "Palavras-chave do SQL (resumo)", `
      <p>As palavras-chave mais usadas, em ordem alfabética:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Palavra-chave</th><th>O que faz</th></tr></thead><tbody>
        <tr><td><code>ADD</code> / <code>ADD CONSTRAINT</code></td><td>adiciona coluna / restrição (com ALTER TABLE)</td></tr>
        <tr><td><code>ALL</code> / <code>ANY</code></td><td>compara com todos / algum valor de uma subconsulta</td></tr>
        <tr><td><code>ALTER TABLE</code> / <code>ALTER COLUMN</code> / <code>ALTER VIEW</code></td><td>muda tabela, coluna ou view</td></tr>
        <tr><td><code>AND</code> / <code>OR</code> / <code>NOT</code></td><td>combina e inverte condições</td></tr>
        <tr><td><code>AS</code></td><td>apelido de coluna ou tabela</td></tr>
        <tr><td><code>ASC</code> / <code>DESC</code></td><td>ordem crescente / decrescente</td></tr>
        <tr><td><code>BACKUP DATABASE</code></td><td>cria backup (SQL Server)</td></tr>
        <tr><td><code>BETWEEN</code></td><td>intervalo de valores</td></tr>
        <tr><td><code>CASE</code></td><td>valor condicional</td></tr>
        <tr><td><code>CHECK</code> / <code>CONSTRAINT</code> / <code>DEFAULT</code></td><td>restrições</td></tr>
        <tr><td><code>CREATE DATABASE / TABLE / INDEX / VIEW / PROCEDURE</code></td><td>cria objetos</td></tr>
        <tr><td><code>CREATE OR REPLACE VIEW</code></td><td>cria ou substitui view</td></tr>
        <tr><td><code>CREATE UNIQUE INDEX</code></td><td>índice sem repetições</td></tr>
        <tr><td><code>DELETE</code></td><td>apaga linhas</td></tr>
        <tr><td><code>DISTINCT</code></td><td>remove repetições</td></tr>
        <tr><td><code>DROP</code> (COLUMN, CONSTRAINT, DATABASE, DEFAULT, INDEX, TABLE, VIEW)</td><td>apaga objetos</td></tr>
        <tr><td><code>EXEC</code></td><td>executa procedure (SQL Server)</td></tr>
        <tr><td><code>EXISTS</code></td><td>testa se a subconsulta tem linhas</td></tr>
        <tr><td><code>FOREIGN KEY</code> / <code>PRIMARY KEY</code> / <code>REFERENCES</code></td><td>chaves</td></tr>
        <tr><td><code>FROM</code></td><td>de qual tabela</td></tr>
        <tr><td><code>FULL OUTER JOIN</code> / <code>INNER JOIN</code> / <code>LEFT JOIN</code> / <code>RIGHT JOIN</code> / <code>JOIN</code></td><td>junções</td></tr>
        <tr><td><code>GROUP BY</code> / <code>HAVING</code></td><td>agrupa / filtra grupos</td></tr>
        <tr><td><code>IN</code></td><td>está na lista</td></tr>
        <tr><td><code>INSERT INTO</code> / <code>INSERT INTO SELECT</code> / <code>VALUES</code></td><td>insere linhas</td></tr>
        <tr><td><code>IS NULL</code> / <code>IS NOT NULL</code></td><td>testa vazio</td></tr>
        <tr><td><code>LIKE</code></td><td>busca por padrão</td></tr>
        <tr><td><code>LIMIT</code> / <code>TOP</code> / <code>ROWNUM</code></td><td>limita o número de linhas</td></tr>
        <tr><td><code>ORDER BY</code></td><td>ordena</td></tr>
        <tr><td><code>SELECT</code> / <code>SELECT DISTINCT</code> / <code>SELECT INTO</code> / <code>SELECT TOP</code></td><td>consulta</td></tr>
        <tr><td><code>SET</code></td><td>novos valores no UPDATE</td></tr>
        <tr><td><code>TRUNCATE TABLE</code></td><td>apaga os dados, mantém a tabela</td></tr>
        <tr><td><code>UNION</code> / <code>UNION ALL</code></td><td>junta resultados</td></tr>
        <tr><td><code>UNIQUE</code></td><td>sem repetições</td></tr>
        <tr><td><code>UPDATE</code></td><td>altera linhas</td></tr>
        <tr><td><code>WHERE</code></td><td>filtra linhas</td></tr>
      </tbody></table>`),
  ref("funcoes-texto", "Funções de texto", ["clientes", "produtos"], `
      <table class="sqlp-tabela-teoria"><thead><tr><th>O que faz</th><th>SQLite</th><th>MySQL</th><th>SQL Server</th></tr></thead><tbody>
        <tr><td>Maiúsculas / minúsculas</td><td><code>UPPER</code> / <code>LOWER</code></td><td><code>UPPER</code> / <code>LOWER</code></td><td><code>UPPER</code> / <code>LOWER</code></td></tr>
        <tr><td>Tamanho</td><td><code>LENGTH</code></td><td><code>CHAR_LENGTH</code></td><td><code>LEN</code></td></tr>
        <tr><td>Pedaço</td><td><code>SUBSTR(t, ini, qtd)</code></td><td><code>SUBSTRING</code>, <code>LEFT</code>, <code>RIGHT</code></td><td><code>SUBSTRING</code>, <code>LEFT</code>, <code>RIGHT</code></td></tr>
        <tr><td>Juntar</td><td><code>a || b</code></td><td><code>CONCAT(a, b)</code>, <code>CONCAT_WS</code></td><td><code>a + b</code>, <code>CONCAT</code></td></tr>
        <tr><td>Tirar espaços</td><td><code>TRIM</code>, <code>LTRIM</code>, <code>RTRIM</code></td><td>iguais</td><td>iguais</td></tr>
        <tr><td>Trocar</td><td><code>REPLACE(t, de, para)</code></td><td><code>REPLACE</code></td><td><code>REPLACE</code></td></tr>
        <tr><td>Posição</td><td><code>INSTR(t, busca)</code></td><td><code>INSTR</code>, <code>LOCATE</code></td><td><code>CHARINDEX</code></td></tr>
      </tbody></table>
      <pre><code>SELECT UPPER(nome), LENGTH(nome) FROM clientes;
SELECT SUBSTR(cep, 1, 5) FROM clientes;            -- 5 primeiros caracteres
SELECT REPLACE(unidade, 'pacote', 'pct') FROM produtos;</code></pre>`, [
      { texto: "Mostre o nome dos clientes em <b>MAIÚSCULAS</b>", solucao: "SELECT UPPER(nome) FROM clientes;", checks: [valores] },
      { texto: "Mostre o <code>nome</code> e o <b>tamanho</b> do nome (<code>LENGTH</code>) de cada cliente, do maior para o menor (desempate por nome)", solucao: "SELECT nome, LENGTH(nome) AS tamanho FROM clientes ORDER BY tamanho DESC, nome;", checks: [ordenado] },
      { texto: "Mostre as <b>3 primeiras letras</b> do país de cada cliente (<code>SUBSTR</code>), sem repetir", solucao: "SELECT DISTINCT SUBSTR(pais, 1, 3) FROM clientes;", checks: [valores] },
      { texto: "Mostre a <code>unidade</code> dos produtos trocando <code>'pacote'</code> por <code>'pct'</code>", solucao: "SELECT REPLACE(unidade, 'pacote', 'pct') FROM produtos;", checks: [valores] }
    ]),
  ref("funcoes-numeros", "Funções numéricas", ["produtos", "funcionarios"], `
      <table class="sqlp-tabela-teoria"><thead><tr><th>Função</th><th>O que faz</th><th>Exemplo</th></tr></thead><tbody>
        <tr><td><code>ROUND(x, n)</code></td><td>arredonda com n casas</td><td><code>ROUND(28.756, 1)</code> → 28.8</td></tr>
        <tr><td><code>ABS(x)</code></td><td>valor absoluto</td><td><code>ABS(-5)</code> → 5</td></tr>
        <tr><td><code>CEIL(x)</code> / <code>FLOOR(x)</code></td><td>arredonda para cima / baixo</td><td><code>CEIL(4.2)</code> → 5</td></tr>
        <tr><td><code>x % y</code> / <code>MOD(x, y)</code></td><td>resto da divisão</td><td><code>10 % 3</code> → 1</td></tr>
        <tr><td><code>POWER(x, y)</code>, <code>SQRT(x)</code></td><td>potência, raiz</td><td><code>SQRT(16)</code> → 4</td></tr>
        <tr><td><code>MAX</code>, <code>MIN</code>, <code>SUM</code>, <code>AVG</code>, <code>COUNT</code></td><td>agregações</td><td></td></tr>
        <tr><td><code>RANDOM()</code> / <code>RAND()</code></td><td>número aleatório (SQLite / MySQL)</td><td><code>ORDER BY RANDOM()</code></td></tr>
      </tbody></table>
      <p>💡 <code>CAST(x AS INTEGER)</code> corta as casas decimais; <code>CAST(x AS REAL)</code> transforma em decimal.</p>`, [
      { texto: "Mostre o <code>nome</code> e o <code>preco</code> arredondado para <b>número inteiro</b> (<code>ROUND(preco)</code>)", solucao: "SELECT nome, ROUND(preco) FROM produtos;", checks: [valores] },
      { texto: "Mostre o <b>preço médio</b> dos produtos arredondado com <b>2 casas</b>", solucao: "SELECT ROUND(AVG(preco), 2) FROM produtos;", checks: [valores] },
      { texto: "Mostre o <code>nome</code> e o salário <b>anual</b> (salário × 13) de cada funcionário", solucao: "SELECT nome, salario * 13 FROM funcionarios;", checks: [valores] }
    ]),
  ref("funcoes-datas", "Funções de data", ["pedidos", "funcionarios"], `
      <table class="sqlp-tabela-teoria"><thead><tr><th>O que faz</th><th>SQLite</th><th>MySQL</th><th>SQL Server</th></tr></thead><tbody>
        <tr><td>Hoje / agora</td><td><code>date('now')</code>, <code>datetime('now')</code></td><td><code>CURDATE()</code>, <code>NOW()</code></td><td><code>GETDATE()</code></td></tr>
        <tr><td>Ano / mês / dia</td><td><code>strftime('%Y', d)</code>, <code>'%m'</code>, <code>'%d'</code></td><td><code>YEAR(d)</code>, <code>MONTH(d)</code>, <code>DAY(d)</code></td><td><code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>, <code>DATEPART</code></td></tr>
        <tr><td>Somar tempo</td><td><code>date(d, '+7 days')</code></td><td><code>DATE_ADD(d, INTERVAL 7 DAY)</code></td><td><code>DATEADD(day, 7, d)</code></td></tr>
        <tr><td>Diferença em dias</td><td><code>julianday(a) - julianday(b)</code></td><td><code>DATEDIFF(a, b)</code></td><td><code>DATEDIFF(day, b, a)</code></td></tr>
        <tr><td>Formatar</td><td><code>strftime('%d/%m/%Y', d)</code></td><td><code>DATE_FORMAT(d, '%d/%m/%Y')</code></td><td><code>FORMAT(d, 'dd/MM/yyyy')</code></td></tr>
      </tbody></table>`, [
      { texto: "Mostre o <code>id</code> e a data do pedido no formato brasileiro <code>dd/mm/aaaa</code> (<code>strftime('%d/%m/%Y', data)</code>)", solucao: "SELECT id, strftime('%d/%m/%Y', data) FROM pedidos;", checks: [valores] },
      { texto: "Conte quantos pedidos houve em <b>cada mês</b> (mês com <code>strftime('%m', data)</code> e a contagem)", solucao: "SELECT strftime('%m', data) AS mes, COUNT(*) FROM pedidos GROUP BY mes;", checks: [valores] },
      { texto: "Mostre o <code>nome</code> e o <b>ano de nascimento</b> de cada funcionário", solucao: "SELECT nome, strftime('%Y', nascimento) FROM funcionarios;", checks: [valores] },
      { texto: "Mostre quantos <b>dias</b> se passaram entre o primeiro e o último pedido", solucao: "SELECT julianday(MAX(data)) - julianday(MIN(data)) FROM pedidos;", checks: [valores] }
    ]),
  ref("funcoes-avancadas", "Funções avançadas: CAST, IIF, COALESCE…", ["produtos", "clientes"], `
      <table class="sqlp-tabela-teoria"><thead><tr><th>Função</th><th>O que faz</th></tr></thead><tbody>
        <tr><td><code>CAST(x AS tipo)</code></td><td>converte o tipo (<code>CAST('42' AS INTEGER)</code>)</td></tr>
        <tr><td><code>IIF(cond, se_sim, se_nao)</code></td><td>“se” curtinho (SQL Server, SQLite 3.32+; no MySQL: <code>IF()</code>)</td></tr>
        <tr><td><code>COALESCE(a, b, …)</code></td><td>primeiro valor não nulo</td></tr>
        <tr><td><code>NULLIF(a, b)</code></td><td>devolve NULL se a = b (útil para evitar divisão por zero)</td></tr>
        <tr><td><code>typeof(x)</code> (SQLite)</td><td>tipo do valor</td></tr>
        <tr><td><code>ROW_NUMBER() OVER (ORDER BY …)</code></td><td>numera linhas (função de janela)</td></tr>
        <tr><td><code>RANK() OVER (…)</code></td><td>ranking com empates</td></tr>
      </tbody></table>
      <pre><code>SELECT nome, IIF(preco &gt; 50, 'premium', 'comum') FROM produtos;
SELECT nome, preco, RANK() OVER (ORDER BY preco DESC) AS posicao FROM produtos;</code></pre>`, [
      { texto: "Mostre <code>nome</code> e <code>'premium'</code> ou <code>'comum'</code> (preço maior que 50 é premium), usando <code>IIF</code>", solucao: "SELECT nome, IIF(preco > 50, 'premium', 'comum') FROM produtos;", checks: [valores] },
      { texto: "Mostre <code>nome</code>, <code>preco</code> e a <b>posição no ranking</b> do mais caro para o mais barato (<code>RANK() OVER (ORDER BY preco DESC)</code>), ordenado pela posição", solucao: "SELECT nome, preco, RANK() OVER (ORDER BY preco DESC) AS posicao FROM produtos ORDER BY posicao;", checks: [ordenado] },
      { texto: "Converta o texto <code>'42'</code> em inteiro e some 8 (resultado: 50)", solucao: "SELECT CAST('42' AS INTEGER) + 8;", checks: [valores] }
    ]),
  ref("desafio", "Desafio final: relatórios de verdade", ["clientes", "pedidos", "itens_pedido", "produtos"], `
      <p>Hora de juntar tudo! Estas tarefas são do tipo que aparece em entrevistas e no trabalho com dados. Use JOIN, GROUP BY, HAVING, ORDER BY e LIMIT.</p>
      <p>💡 Dica: monte a consulta aos poucos. Primeiro o JOIN, confira o resultado, depois agrupe, depois ordene.</p>
      <p>Valor de um item = <code>itens_pedido.quantidade * produtos.preco</code>.</p>`, [
      { texto: "Mostre o <b>nome do cliente</b> e o <b>total gasto</b> por cliente, do que mais gastou para o que menos gastou", solucao: "SELECT c.nome, SUM(i.quantidade * p.preco) AS total\nFROM clientes c\nJOIN pedidos pe ON pe.cliente_id = c.id\nJOIN itens_pedido i ON i.pedido_id = pe.id\nJOIN produtos p ON p.id = i.produto_id\nGROUP BY c.id, c.nome\nORDER BY total DESC;", checks: [ordenado] },
      { texto: "Mostre os <b>3 produtos mais vendidos</b> em quantidade (nome e quantidade total)", solucao: "SELECT p.nome, SUM(i.quantidade) AS qtd\nFROM itens_pedido i JOIN produtos p ON p.id = i.produto_id\nGROUP BY p.id, p.nome\nORDER BY qtd DESC\nLIMIT 3;", checks: [ordenado] },
      { texto: "Mostre o <b>faturamento por país</b> do cliente, só dos países que faturaram <b>mais de 1000</b>", solucao: "SELECT c.pais, SUM(i.quantidade * p.preco) AS total\nFROM clientes c\nJOIN pedidos pe ON pe.cliente_id = c.id\nJOIN itens_pedido i ON i.pedido_id = pe.id\nJOIN produtos p ON p.id = i.produto_id\nGROUP BY c.pais\nHAVING total > 1000;", checks: [valores] },
      { texto: "Mostre o <b>nome da categoria</b> e o faturamento de cada categoria, da maior para a menor", solucao: "SELECT ca.nome, SUM(i.quantidade * p.preco) AS total\nFROM itens_pedido i\nJOIN produtos p ON p.id = i.produto_id\nJOIN categorias ca ON ca.id = p.categoria_id\nGROUP BY ca.id, ca.nome\nORDER BY total DESC;", checks: [ordenado] }
    ])
];
