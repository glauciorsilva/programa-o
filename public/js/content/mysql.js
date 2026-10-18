const c = String.raw;

export default {
  id: "mysql",
  nome: "MySQL",
  icone: "🐬",
  cor: "#00758f",
  dificuldade: 2,
  resumo: "O banco de dados relacional mais popular da web. Usado em WordPress, e-commerces, ERPs e milhares de sistemas.",
  mercado: "Muito presente em empresas de todos os tamanhos, hospedagens, Laravel/PHP, Node e Java. Também é cobrado em vagas de DBA e infraestrutura.",
  docs: [
    { nome: "Manual de referência MySQL 8", url: "https://dev.mysql.com/doc/refman/8.0/en/", desc: "documentação oficial" },
    { nome: "MySQL Workbench", url: "https://dev.mysql.com/downloads/workbench/", desc: "ferramenta visual oficial" },
    { nome: "DBeaver", url: "https://dbeaver.io/", desc: "cliente gratuito para qualquer banco" },
    { nome: "Funções de data e hora", url: "https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html" }
  ],
  niveis: {
    basico: {
      objetivo: "instalar o MySQL, criar bancos e tabelas com os tipos certos e usar as funções mais comuns do dia a dia.",
      topicos: [
        {
          titulo: "Instalar, conectar e criar o banco",
          crianca: `O MySQL é o <b>prédio</b>; cada <b>banco de dados</b> é um andar (um sistema); cada <b>tabela</b> é uma sala com fichários. Primeiro você entra no prédio (conecta), escolhe o andar (<code>USE</code>) e depois mexe nas salas.`,
          codigo: c`
-- Jeito rápido com Docker:
-- docker run --name mysql -e MYSQL_ROOT_PASSWORD=senha -p 3306:3306 -d mysql:8
-- Conectar pelo terminal: mysql -u root -p

CREATE DATABASE loja CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE loja;

SHOW DATABASES;
SHOW TABLES;

CREATE TABLE produtos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

DESCRIBE produtos;            -- mostra as colunas
SHOW CREATE TABLE produtos;   -- mostra o SQL completo da tabela`,
          nota: "Use <b>utf8mb4</b> (e não utf8): só ele guarda emojis e todos os caracteres.",
          trabalho: `Montar o ambiente local para desenvolver, criar o banco de um sistema novo, ou entrar em um servidor e descobrir “que tabelas existem aqui?” com <code>SHOW TABLES</code> e <code>DESCRIBE</code>.`,
          entrevista: {
            pergunta: "Qual a diferença entre os engines InnoDB e MyISAM?",
            resposta: `<b>InnoDB</b> (padrão) suporta transações, chaves estrangeiras, bloqueio por linha e recuperação após falhas. <b>MyISAM</b> é antigo: não tem transações nem FK e bloqueia a tabela inteira. Hoje se usa InnoDB praticamente sempre.`
          },
          busca: ["instalar mysql 8 windows", "mysql docker", "utf8mb4 vs utf8 mysql"]
        },
        {
          titulo: "Tipos de dados do MySQL",
          crianca: `Cada gaveta tem o <b>tamanho certo</b> para o que guarda: gaveta pequena para idade (<code>TINYINT</code>), gaveta de dinheiro com centavos exatos (<code>DECIMAL</code>), gaveta de data (<code>DATE</code>), e uma gaveta com opções fixas, como P, M e G (<code>ENUM</code>).`,
          codigo: c`
CREATE TABLE clientes (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  cpf         CHAR(11) NOT NULL UNIQUE,      -- tamanho fixo
  email       VARCHAR(150),
  nascimento  DATE,
  limite      DECIMAL(12,2) DEFAULT 0.00,    -- dinheiro: NUNCA float
  ativo       TINYINT(1) DEFAULT 1,          -- booleano
  plano       ENUM('free','pro','premium') DEFAULT 'free',
  preferencias JSON,                         -- MySQL 5.7+
  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO clientes (nome, cpf, preferencias)
VALUES ('Lucas', '12345678901', '{"tema": "escuro", "newsletter": true}');

SELECT nome, preferencias->>'$.tema' AS tema FROM clientes;`,
          trabalho: `Escolher o tipo errado custa caro: CPF como <code>INT</code> perde o zero à esquerda; dinheiro em <code>FLOAT</code> gera diferença de centavos; <code>VARCHAR(255)</code> em tudo desperdiça memória nos índices.`,
          entrevista: {
            pergunta: "Qual a diferença entre DATETIME e TIMESTAMP no MySQL?",
            resposta: `<code>TIMESTAMP</code> é guardado em UTC e convertido conforme o fuso da sessão, com faixa de 1970 a 2038. <code>DATETIME</code> guarda o valor “como está”, sem fuso, com faixa de 1000 a 9999. Para auditoria (criado/atualizado) TIMESTAMP é prático; para datas de negócio, DATETIME ou DATE.`
          },
          busca: ["mysql data types", "mysql datetime vs timestamp", "mysql json column"]
        },
        {
          titulo: "Funções úteis do dia a dia",
          crianca: `Funções são <b>ferramentas prontas</b> na caixa: uma junta palavras (<code>CONCAT</code>), outra diz que dia é hoje (<code>NOW</code>), outra troca o “vazio” por algo (<code>IFNULL</code>). Você não precisa construir a ferramenta, só usar.`,
          codigo: c`
SELECT
  CONCAT(nome, ' <', email, '>')            AS contato,
  UPPER(nome)                                AS nome_maiusculo,
  IFNULL(telefone, 'não informado')          AS telefone,
  DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i')   AS cadastro_br,
  TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) AS idade,
  DATEDIFF(CURDATE(), ultimo_pedido)         AS dias_sem_comprar,
  CASE WHEN limite > 5000 THEN 'alto'
       WHEN limite > 1000 THEN 'médio'
       ELSE 'baixo' END                      AS faixa
FROM clientes;

-- Vendas por mês
SELECT DATE_FORMAT(data, '%Y-%m') AS mes, SUM(valor) AS total
FROM pedidos
GROUP BY mes
ORDER BY mes;

-- Aniversariantes do mês
SELECT nome FROM clientes WHERE MONTH(nascimento) = MONTH(CURDATE());`,
          trabalho: `Exportar a planilha de clientes com a data no formato brasileiro, calcular a idade, listar os aniversariantes para o marketing e marcar a faixa de crédito. Tudo direto no SQL, sem Excel.`,
          entrevista: {
            pergunta: "Como você calcularia há quantos dias cada cliente não compra?",
            resposta: `Com <code>DATEDIFF(CURDATE(), MAX(p.data))</code> agrupando os pedidos por cliente: <code>SELECT c.nome, DATEDIFF(CURDATE(), MAX(p.data)) dias FROM clientes c JOIN pedidos p ON p.cliente_id = c.id GROUP BY c.id, c.nome HAVING dias &gt; 90;</code>`
          },
          busca: ["mysql date_format", "mysql timestampdiff", "mysql case when"]
        }
      ]
    },
    intermediario: {
      objetivo: "controlar quem acessa o quê, criar views e automatizar regras com stored procedures.",
      topicos: [
        {
          titulo: "Usuários e permissões",
          crianca: `Nem todo mundo pode ter a <b>chave de todas as salas</b>. O estagiário só pode <b>olhar</b> os fichários; o sistema pode olhar e escrever; só o chefe pode derrubar paredes. <code>GRANT</code> entrega chaves e <code>REVOKE</code> pega de volta.`,
          codigo: c`
-- Usuário da aplicação: só o necessário
CREATE USER 'app_loja'@'%' IDENTIFIED BY 'SenhaForte!2026';
GRANT SELECT, INSERT, UPDATE, DELETE ON loja.* TO 'app_loja'@'%';

-- Usuário de relatórios (BI): somente leitura
CREATE USER 'bi_leitura'@'10.0.0.%' IDENTIFIED BY 'OutraSenha#99';
GRANT SELECT ON loja.* TO 'bi_leitura'@'10.0.0.%';

SHOW GRANTS FOR 'app_loja'@'%';

REVOKE DELETE ON loja.* FROM 'app_loja'@'%';
DROP USER 'usuario_antigo'@'localhost';`,
          trabalho: `Liberar acesso ao Power BI do financeiro <b>somente leitura</b>, criar o usuário da aplicação sem permissão de <code>DROP</code> e remover o acesso de quem saiu da empresa. Auditorias (LGPD, ISO) checam exatamente isso.`,
          entrevista: {
            pergunta: "O que é o princípio do menor privilégio?",
            resposta: `Cada usuário ou sistema recebe <b>apenas as permissões mínimas</b> necessárias para a função. A aplicação nunca deve usar o <code>root</code>. Se a senha vazar, o estrago fica limitado.`
          },
          busca: ["mysql create user grant", "mysql show grants", "menor privilégio banco de dados"]
        },
        {
          titulo: "Views",
          crianca: `Uma view é uma <b>janela</b> que mostra só uma parte da sala. Você monta a consulta complicada uma vez e, depois, todo mundo olha pela janela como se fosse uma tabela simples.`,
          codigo: c`
CREATE OR REPLACE VIEW vw_vendas_por_cliente AS
SELECT c.id,
       c.nome,
       COUNT(p.id)              AS qtd_pedidos,
       COALESCE(SUM(p.valor),0) AS total_gasto,
       MAX(p.data)              AS ultima_compra
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'
GROUP BY c.id, c.nome;

-- Usar como se fosse uma tabela
SELECT * FROM vw_vendas_por_cliente
WHERE total_gasto > 1000
ORDER BY total_gasto DESC;

-- View que ESCONDE dados sensíveis (LGPD)
CREATE VIEW vw_clientes_publico AS
SELECT id, nome, CONCAT(LEFT(cpf, 3), '.***.***-**') AS cpf_mascarado
FROM clientes;`,
          trabalho: `Dar ao time de BI uma view pronta em vez de 50 linhas de SQL. Esconder CPF e salário de quem não precisa ver (<b>LGPD</b>), liberando o acesso só à view.`,
          entrevista: {
            pergunta: "Uma view guarda os dados? Ela deixa a consulta mais rápida?",
            resposta: `Não: a view comum no MySQL guarda só a <b>consulta</b>, e os dados são lidos das tabelas na hora. Ela não acelera nada sozinha (a performance depende dos índices das tabelas). Os ganhos são <b>reuso, simplicidade e segurança</b>. Para resultados pré-calculados, cria-se uma tabela de resumo atualizada periodicamente.`
          },
          busca: ["mysql create view", "mysql view performance", "mascarar cpf sql"]
        },
        {
          titulo: "Stored procedures e functions",
          crianca: `Uma stored procedure é uma <b>receita guardada dentro do banco</b>. Em vez de mandar 5 passos toda vez, você diz: “faça a receita <code>fechar_pedido</code> para o pedido 10” e o banco faz tudo.`,
          codigo: c`
DELIMITER $$

CREATE PROCEDURE fechar_pedido(IN p_pedido INT)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
    UPDATE pedidos SET status = 'pago' WHERE id = p_pedido;

    UPDATE produtos pr
    JOIN itens_pedido i ON i.produto_id = pr.id
    SET pr.estoque = pr.estoque - i.quantidade
    WHERE i.pedido_id = p_pedido;
  COMMIT;
END $$

CREATE FUNCTION idade(nasc DATE) RETURNS INT DETERMINISTIC
  RETURN TIMESTAMPDIFF(YEAR, nasc, CURDATE()) $$

DELIMITER ;

CALL fechar_pedido(10);
SELECT nome, idade(nascimento) FROM clientes;`,
          trabalho: `Sistemas legados e ERPs costumam ter muita regra de negócio em procedures. Você vai precisar <b>ler e corrigir</b> procedures antigas. Em sistemas novos, a tendência é deixar a regra no código da aplicação.`,
          entrevista: {
            pergunta: "Quais as vantagens e desvantagens de usar stored procedures?",
            resposta: `<b>Vantagens</b>: menos idas e vindas pela rede, lógica perto dos dados, reuso entre sistemas e controle de permissão (o usuário só executa a procedure). <b>Desvantagens</b>: mais difícil de versionar, testar e depurar, prende você ao banco e espalha regra de negócio.`
          },
          busca: ["mysql stored procedure exemplo", "mysql delimiter", "mysql function deterministic"]
        }
      ]
    },
    avancado: {
      objetivo: "proteger os dados com backups, automatizar com triggers e eventos e investigar lentidão no servidor.",
      topicos: [
        {
          titulo: "Backup e restauração",
          crianca: `Backup é tirar uma <b>foto do armário inteiro</b>. Se pegar fogo (o servidor quebrar) ou alguém apagar algo sem querer, você monta tudo de novo a partir da foto. E precisa <b>testar</b> se a foto não saiu borrada!`,
          codigo: c`
# Backup completo de um banco (terminal, não dentro do MySQL)
mysqldump -u root -p --single-transaction --routines --triggers loja > loja_2026-10-18.sql

# Só a estrutura (sem dados)
mysqldump -u root -p --no-data loja > estrutura.sql

# Uma tabela específica
mysqldump -u root -p loja clientes > clientes.sql

# Compactado
mysqldump -u root -p --single-transaction loja | gzip > loja.sql.gz

# Restaurar
mysql -u root -p loja < loja_2026-10-18.sql
gunzip < loja.sql.gz | mysql -u root -p loja`,
          nota: "Para bancos grandes, existem ferramentas de backup físico como Percona XtraBackup e MySQL Shell (<code>util.dumpInstance</code>).",
          trabalho: `Agendar o backup diário com <b>cron</b>, enviar para outro servidor ou para a nuvem e, uma vez por mês, <b>restaurar em teste</b> para garantir que funciona. Backup que nunca foi testado não é backup.`,
          entrevista: {
            pergunta: "Para que serve --single-transaction no mysqldump?",
            resposta: `Faz o dump dentro de uma transação consistente (snapshot) em tabelas InnoDB, <b>sem travar</b> as tabelas. Assim o sistema continua funcionando durante o backup e os dados ficam consistentes entre si.`
          },
          busca: ["mysqldump single-transaction", "mysql restore dump", "backup mysql cron"]
        },
        {
          titulo: "Triggers e eventos agendados",
          crianca: `Trigger é uma <b>armadilha automática</b>: “sempre que alguém mudar o preço, anote no caderno quem mudou e quando”. Evento é um <b>despertador do banco</b>: “todo dia às 3 da manhã, limpe as coisas velhas”.`,
          codigo: c`
-- Auditoria de alteração de preço
CREATE TABLE log_precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT, preco_antigo DECIMAL(10,2), preco_novo DECIMAL(10,2),
  alterado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, usuario VARCHAR(100)
);

DELIMITER $$
CREATE TRIGGER trg_produtos_preco
AFTER UPDATE ON produtos
FOR EACH ROW
BEGIN
  IF NEW.preco <> OLD.preco THEN
    INSERT INTO log_precos (produto_id, preco_antigo, preco_novo, usuario)
    VALUES (OLD.id, OLD.preco, NEW.preco, CURRENT_USER());
  END IF;
END $$
DELIMITER ;

-- Evento: limpar sessões expiradas todo dia
SET GLOBAL event_scheduler = ON;
CREATE EVENT ev_limpa_sessoes
ON SCHEDULE EVERY 1 DAY STARTS '2026-10-19 03:00:00'
DO DELETE FROM sessoes WHERE expira_em < NOW();`,
          trabalho: `Auditoria (“quem mudou o preço do produto X?”), manter um campo de total atualizado e limpezas noturnas. Cuidado: triggers são “invisíveis” para quem lê o código da aplicação, então documente-as.`,
          entrevista: {
            pergunta: "O que são OLD e NEW em uma trigger?",
            resposta: `<code>OLD</code> contém os valores da linha <b>antes</b> da alteração (existe em UPDATE e DELETE); <code>NEW</code> contém os valores <b>depois</b> (existe em INSERT e UPDATE). Em triggers <code>BEFORE</code>, você pode alterar o <code>NEW</code> antes de gravar.`
          },
          busca: ["mysql trigger after update", "mysql event scheduler", "mysql audit table trigger"]
        },
        {
          titulo: "Performance e replicação",
          crianca: `Quando o restaurante enche, você <b>descobre qual prato demora</b> (slow log) e melhora a receita (índice). Se ainda assim faltar garçom, contrata <b>cópias da cozinha</b> (réplicas) só para servir quem quer olhar o cardápio (leituras).`,
          codigo: c`
-- 1) Ativar o log de consultas lentas (> 1 segundo)
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SHOW VARIABLES LIKE 'slow_query_log_file';
-- Analise o arquivo com: mysqldumpslow -s t arquivo-slow.log

-- 2) Plano detalhado com tempos reais (MySQL 8.0.18+)
EXPLAIN ANALYZE
SELECT * FROM pedidos WHERE cliente_id = 42 ORDER BY data DESC LIMIT 10;

-- 3) O que está rodando agora? Algo travado?
SHOW FULL PROCESSLIST;
-- KILL 12345;   (encerra uma consulta problemática)

-- 4) Configuração crítica: memória do InnoDB (~60-70% da RAM do servidor)
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';

-- 5) Réplica de leitura (visão geral)
SHOW REPLICA STATUS\G`,
          trabalho: `“O sistema ficou lento às 10h.” Você olha o <code>PROCESSLIST</code>, encontra a consulta travada, analisa o slow log, cria o índice e, se a carga de relatórios for grande, aponta o BI para uma <b>réplica de leitura</b> (comum em AWS RDS e Google Cloud SQL).`,
          entrevista: {
            pergunta: "O que é replicação no MySQL e para que serve?",
            resposta: `É manter cópias do banco principal (source/primário) em outros servidores (réplicas), sincronizadas pelo <b>binary log</b>. Serve para <b>escalar leituras</b>, ter alta disponibilidade (promover a réplica se o principal cair) e fazer backups sem pesar no principal. A replicação é normalmente assíncrona, então pode haver um pequeno atraso (lag).`
          },
          busca: ["mysql slow query log", "mysql explain analyze", "mysql replication setup"]
        }
      ]
    }
  }
};
