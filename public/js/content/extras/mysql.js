import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>O <b>MySQL</b> é um sistema gerenciador de banco de dados (SGBD) relacional, gratuito e de código aberto, mantido pela Oracle. Ele funciona como um <b>servidor</b>: um programa que fica rodando e recebe conexões de clientes (o terminal <code>mysql</code>, ferramentas visuais como MySQL Workbench e DBeaver, ou a sua aplicação). Um mesmo servidor guarda vários <b>bancos de dados</b> (também chamados de <i>schemas</i>), e cada banco tem suas tabelas.</p>
<p>Para instalar, use o instalador oficial (MySQL Installer no Windows) ou o <b>Docker</b>, que cria um servidor isolado com um único comando. Para se conectar pelo terminal: <code>mysql -u usuario -p</code>. Depois, <code>CREATE DATABASE</code> cria um banco e <code>USE</code> escolhe com qual você vai trabalhar.</p>
<p>O <b>InnoDB</b> é o mecanismo de armazenamento (engine) padrão e o mais indicado: suporta transações e chaves estrangeiras. Use sempre o conjunto de caracteres <code>utf8mb4</code>, que guarda todos os caracteres, inclusive emojis. Comandos como <code>SHOW TABLES</code>, <code>DESCRIBE</code> e <code>SHOW CREATE TABLE</code> ajudam a explorar um banco que você não conhece.</p>`,
      partes: [
        [c`docker run --name mysql -e MYSQL_ROOT_PASSWORD=senha -p 3306:3306 -d mysql:8`, "Sobe um servidor MySQL 8 no Docker, com senha de root definida e porta 3306 liberada."],
        [c`mysql -u root -p`, "Conecta pelo terminal como `root`; o `-p` faz pedir a senha."],
        [c`CREATE DATABASE loja CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`, "Cria o banco `loja` com suporte completo a caracteres; a collation `ai_ci` ignora acentos e maiúsculas nas comparações."],
        [c`USE loja;`, "Seleciona o banco: os próximos comandos valem para ele."],
        [c`SHOW DATABASES; SHOW TABLES;`, "Lista os bancos do servidor e as tabelas do banco atual."],
        [c`id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,`, "Inteiro sem sinal (só positivos), gerado automaticamente, chave primária."],
        [c`criado_em DATETIME DEFAULT CURRENT_TIMESTAMP`, "Data e hora de criação preenchidas automaticamente."],
        [c`) ENGINE=InnoDB;`, "Usa o engine InnoDB (já é o padrão no MySQL 8)."],
        [c`DESCRIBE produtos; SHOW CREATE TABLE produtos;`, "Mostram as colunas e o comando completo de criação da tabela."]
      ]
    },
    b2: {
      detalhes: `<p>Escolher o <b>tipo de dado</b> certo para cada coluna garante dados corretos, economiza espaço e deixa as consultas mais rápidas. Os principais tipos do MySQL:</p>
<ul>
<li><b>Inteiros</b>: <code>TINYINT</code> (até 127, ou 255 sem sinal), <code>INT</code> (até ~2,1 bilhões), <code>BIGINT</code> (números enormes). <code>UNSIGNED</code> aceita só positivos e dobra o limite.</li>
<li><b>Decimais exatos</b>: <code>DECIMAL(p, s)</code>, com <code>p</code> dígitos no total e <code>s</code> casas decimais. É o tipo para dinheiro; <code>FLOAT</code> e <code>DOUBLE</code> são aproximados.</li>
<li><b>Texto</b>: <code>CHAR(n)</code> (tamanho fixo, bom para CPF e UF), <code>VARCHAR(n)</code> (tamanho variável), <code>TEXT</code> (textos longos).</li>
<li><b>Datas</b>: <code>DATE</code>, <code>TIME</code>, <code>DATETIME</code> e <code>TIMESTAMP</code> (guardado em UTC, converte conforme o fuso).</li>
<li><b>Outros</b>: <code>ENUM</code> (lista fixa de opções), <code>BOOLEAN</code> (na verdade um <code>TINYINT(1)</code>) e <code>JSON</code> (documentos JSON validados).</li>
</ul>
<p>Documentos como CPF, CEP e telefone devem ser texto, não número: senão os zeros à esquerda se perdem e não se faz conta com eles. Para ler um campo de um JSON, o MySQL oferece o operador <code>-&gt;&gt;</code> com um caminho como <code>'$.tema'</code>.</p>`,
      partes: [
        [c`cpf CHAR(11) NOT NULL UNIQUE,`, "CPF como texto de 11 caracteres, obrigatório e sem repetição."],
        [c`nascimento DATE,`, "Só a data, sem hora."],
        [c`limite DECIMAL(12,2) DEFAULT 0.00,`, "Valor monetário exato, até 10 dígitos inteiros e 2 decimais."],
        [c`ativo TINYINT(1) DEFAULT 1,`, "Usado como booleano: 1 = verdadeiro, 0 = falso."],
        [c`plano ENUM('free','pro','premium') DEFAULT 'free',`, "Só aceita um dos três valores listados."],
        [c`preferencias JSON,`, "Guarda um documento JSON, validado pelo MySQL."],
        [c`atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`, "Preenchido na criação e atualizado sozinho a cada alteração da linha."],
        [c`SELECT nome, preferencias->>'$.tema' AS tema FROM clientes;`, "Lê o campo `tema` de dentro do JSON, como texto."]
      ]
    },
    b3: {
      detalhes: `<p>O MySQL tem centenas de <b>funções embutidas</b>, que transformam valores dentro da própria consulta, evitando ter que tratar os dados depois em planilhas ou no código. Algumas das mais usadas:</p>
<ul>
<li><b>Texto</b>: <code>CONCAT</code> (junta), <code>UPPER</code>/<code>LOWER</code>, <code>TRIM</code> (remove espaços), <code>LEFT</code>/<code>RIGHT</code>/<code>SUBSTRING</code> (pedaços), <code>REPLACE</code>, <code>LENGTH</code>.</li>
<li><b>Datas</b>: <code>NOW()</code> (data e hora atuais), <code>CURDATE()</code> (data atual), <code>DATE_FORMAT</code> (formata, ex.: <code>'%d/%m/%Y'</code>), <code>DATEDIFF</code> (dias entre datas), <code>TIMESTAMPDIFF</code> (diferença em anos, meses, horas...), <code>DATE_ADD</code>, <code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>.</li>
<li><b>Nulos e condições</b>: <code>IFNULL</code>/<code>COALESCE</code> (troca o nulo por um valor), <code>IF(condição, a, b)</code> e <code>CASE WHEN ... THEN ... ELSE ... END</code> para regras com várias faixas.</li>
<li><b>Números</b>: <code>ROUND</code>, <code>FLOOR</code>, <code>CEIL</code>, <code>ABS</code>.</li>
</ul>
<p>Lembre que funções aplicadas a colunas no <code>WHERE</code> podem impedir o uso de índices. Prefira usá-las no <code>SELECT</code> para apresentar os dados.</p>`,
      partes: [
        [c`CONCAT(nome, ' <', email, '>') AS contato`, "Junta nome e e-mail em um texto só, como `Ana <ana@email.com>`."],
        [c`UPPER(nome) AS nome_maiusculo`, "Converte o nome para letras maiúsculas."],
        [c`IFNULL(telefone, 'não informado') AS telefone`, "Se o telefone for nulo, mostra o texto alternativo."],
        [c`DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i') AS cadastro_br`, "Formata a data no padrão brasileiro com hora e minuto."],
        [c`TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) AS idade`, "Anos completos entre o nascimento e hoje."],
        [c`DATEDIFF(CURDATE(), ultimo_pedido) AS dias_sem_comprar`, "Dias desde o último pedido."],
        [c`CASE WHEN limite > 5000 THEN 'alto' WHEN limite > 1000 THEN 'médio' ELSE 'baixo' END AS faixa`, "Classifica cada cliente em faixas conforme o limite."],
        [c`DATE_FORMAT(data, '%Y-%m') AS mes … GROUP BY mes ORDER BY mes;`, "Agrupa as vendas por mês no formato ano-mês."],
        [c`WHERE MONTH(nascimento) = MONTH(CURDATE());`, "Aniversariantes do mês atual."]
      ]
    },
    i1: {
      detalhes: `<p>No MySQL, cada <b>usuário</b> é identificado pelo nome <b>e</b> pelo host de onde pode se conectar: <code>'app'@'localhost'</code> só conecta da própria máquina; <code>'app'@'%'</code> de qualquer lugar; <code>'bi'@'10.0.0.%'</code> só da rede interna. Usuários são criados com <code>CREATE USER</code> e recebem uma senha forte.</p>
<p>As <b>permissões</b> (privilégios) são dadas com <code>GRANT</code> e retiradas com <code>REVOKE</code>. Elas podem valer para o servidor inteiro (<code>*.*</code>), para um banco (<code>loja.*</code>), para uma tabela (<code>loja.clientes</code>) e até para colunas. Os privilégios mais comuns são <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code> e <code>EXECUTE</code>.</p>
<p>A regra de ouro é o <b>princípio do menor privilégio</b>: cada usuário recebe apenas o necessário. A aplicação nunca deve usar o <code>root</code>; ferramentas de relatório (BI) recebem só leitura. No MySQL 8 também existem <b>roles</b> (papéis), conjuntos de permissões que podem ser atribuídos a vários usuários de uma vez.</p>`,
      partes: [
        [c`CREATE USER 'app_loja'@'%' IDENTIFIED BY 'SenhaForte!2026';`, "Cria o usuário da aplicação, que pode conectar de qualquer host, com senha."],
        [c`GRANT SELECT, INSERT, UPDATE, DELETE ON loja.* TO 'app_loja'@'%';`, "Permite ler e alterar dados em todas as tabelas do banco `loja`, mas não mudar a estrutura."],
        [c`CREATE USER 'bi_leitura'@'10.0.0.%' …;`, "Usuário de BI que só conecta a partir da rede interna 10.0.0.x."],
        [c`GRANT SELECT ON loja.* TO 'bi_leitura'@'10.0.0.%';`, "Somente leitura."],
        [c`SHOW GRANTS FOR 'app_loja'@'%';`, "Lista as permissões do usuário."],
        [c`REVOKE DELETE ON loja.* FROM 'app_loja'@'%';`, "Retira a permissão de apagar."],
        [c`DROP USER 'usuario_antigo'@'localhost';`, "Remove o usuário (por exemplo, de quem saiu da empresa)."]
      ]
    },
    i2: {
      detalhes: `<p>Uma <b>view</b> (visão) é uma consulta salva no banco com um nome. Depois de criada, ela pode ser usada em <code>SELECT</code> como se fosse uma tabela, mas não guarda dados próprios: toda vez que é consultada, o MySQL executa a consulta de origem e busca os dados atuais das tabelas.</p>
<p>Vantagens: <b>simplicidade</b> (o time de BI usa uma view pronta em vez de repetir consultas complexas), <b>padronização</b> (todos calculam o “total gasto” do mesmo jeito) e <b>segurança</b> (você pode dar permissão só na view, escondendo colunas sensíveis como CPF e salário, o que ajuda a cumprir a LGPD).</p>
<p><code>CREATE OR REPLACE VIEW</code> cria a view ou substitui a existente; <code>DROP VIEW</code> remove. Views simples (de uma tabela, sem agregações) podem até aceitar <code>UPDATE</code>, mas o uso principal é a leitura. Uma view não deixa a consulta mais rápida sozinha: o desempenho continua dependendo dos índices das tabelas.</p>`,
      partes: [
        [c`CREATE OR REPLACE VIEW vw_vendas_por_cliente AS`, "Cria (ou atualiza) a view; o prefixo `vw_` é uma convenção para identificar views."],
        [c`SELECT c.id, c.nome, COUNT(p.id) AS qtd_pedidos, COALESCE(SUM(p.valor),0) AS total_gasto, MAX(p.data) AS ultima_compra`, "Colunas calculadas da view; `COALESCE` troca a soma nula por 0."],
        [c`LEFT JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'`, "Junta só os pedidos pagos, mantendo clientes sem compras."],
        [c`GROUP BY c.id, c.nome;`, "Uma linha por cliente."],
        [c`SELECT * FROM vw_vendas_por_cliente WHERE total_gasto > 1000`, "Usa a view como se fosse uma tabela."],
        [c`CONCAT(LEFT(cpf, 3), '.***.***-**') AS cpf_mascarado`, "Mostra só o começo do CPF, escondendo o resto (LGPD)."]
      ]
    },
    i3: {
      detalhes: `<p>Uma <b>stored procedure</b> é um bloco de comandos SQL salvo no próprio banco, executado com <code>CALL nome(parâmetros)</code>. Ela aceita parâmetros de entrada (<code>IN</code>), de saída (<code>OUT</code>) ou ambos (<code>INOUT</code>), e pode usar variáveis (<code>DECLARE</code>), condicionais (<code>IF</code>), laços e transações.</p>
<p>Uma <b>function</b> é parecida, mas sempre devolve <b>um valor</b> (<code>RETURNS</code>) e pode ser usada dentro de consultas, como qualquer função embutida. Funções que sempre devolvem o mesmo resultado para a mesma entrada são marcadas como <code>DETERMINISTIC</code>.</p>
<p>Como o corpo de uma procedure contém vários <code>;</code>, no terminal é preciso trocar temporariamente o delimitador de comandos com <code>DELIMITER $$</code> e voltar com <code>DELIMITER ;</code> ao final. O <code>DECLARE EXIT HANDLER FOR SQLEXCEPTION</code> define o que fazer se algum comando falhar, como desfazer a transação com <code>ROLLBACK</code>.</p>`,
      partes: [
        [c`DELIMITER $$`, "Troca o fim de comando para `$$`, permitindo usar `;` dentro da procedure."],
        [c`CREATE PROCEDURE fechar_pedido(IN p_pedido INT)`, "Cria a procedure com um parâmetro de entrada inteiro."],
        [c`DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;`, "Se qualquer comando falhar: desfaz a transação e repassa o erro para quem chamou."],
        [c`START TRANSACTION;`, "As duas alterações a seguir acontecem juntas ou nenhuma acontece."],
        [c`UPDATE pedidos SET status = 'pago' WHERE id = p_pedido;`, "Marca o pedido como pago."],
        [c`UPDATE produtos pr JOIN itens_pedido i ON … SET pr.estoque = pr.estoque - i.quantidade`, "Baixa do estoque a quantidade de cada item do pedido."],
        [c`CREATE FUNCTION idade(nasc DATE) RETURNS INT DETERMINISTIC`, "Função que recebe uma data e devolve um inteiro."],
        [c`CALL fechar_pedido(10);`, "Executa a procedure para o pedido 10."],
        [c`SELECT nome, idade(nascimento) FROM clientes;`, "Usa a função dentro de uma consulta."]
      ]
    },
    a1: {
      detalhes: `<p><b>Backup</b> é a cópia de segurança dos dados, e é o que salva a empresa em caso de falha de disco, ataque de ransomware ou um <code>DELETE</code> errado. Existem dois tipos: o <b>lógico</b> (um arquivo com comandos SQL que recriam as tabelas e os dados, gerado pelo <code>mysqldump</code>) e o <b>físico</b> (cópia dos arquivos do banco, com ferramentas como Percona XtraBackup), mais rápido para bancos grandes.</p>
<p>O <code>mysqldump</code> roda no terminal do sistema, não dentro do MySQL. A opção <code>--single-transaction</code> faz o backup de tabelas InnoDB de forma consistente sem travar o sistema, e <code>--routines --triggers</code> inclui procedures, functions e triggers. Para restaurar, o arquivo é enviado ao cliente <code>mysql</code>.</p>
<p>Uma boa política de backup segue a regra <b>3-2-1</b>: 3 cópias, em 2 tipos de mídia diferentes, sendo 1 fora da empresa (na nuvem, por exemplo). Agende o backup automático (com <code>cron</code> no Linux ou o Agendador de Tarefas no Windows) e <b>teste a restauração</b> periodicamente: backup que nunca foi restaurado não é garantia de nada.</p>`,
      partes: [
        [c`mysqldump -u root -p --single-transaction --routines --triggers loja > loja_2026-10-18.sql`, "Backup completo do banco `loja`, consistente e sem travar, incluindo procedures e triggers; o `>` grava a saída no arquivo."],
        [c`mysqldump -u root -p --no-data loja > estrutura.sql`, "Só a estrutura (tabelas, colunas), sem os dados."],
        [c`mysqldump -u root -p loja clientes > clientes.sql`, "Backup de uma única tabela."],
        [c`mysqldump … loja | gzip > loja.sql.gz`, "O `|` envia a saída para o `gzip`, que compacta o arquivo."],
        [c`mysql -u root -p loja < loja_2026-10-18.sql`, "Restaura: executa todos os comandos do arquivo no banco `loja`."],
        [c`gunzip < loja.sql.gz | mysql -u root -p loja`, "Descompacta e restaura em um único comando."]
      ]
    },
    a2: {
      detalhes: `<p>Uma <b>trigger</b> (gatilho) é um bloco de código que o MySQL executa <b>automaticamente</b> quando acontece um <code>INSERT</code>, <code>UPDATE</code> ou <code>DELETE</code> em uma tabela, antes (<code>BEFORE</code>) ou depois (<code>AFTER</code>) da operação. <code>FOR EACH ROW</code> significa que ela roda uma vez para cada linha afetada.</p>
<p>Dentro da trigger, <code>OLD</code> contém os valores da linha antes da alteração e <code>NEW</code> os valores depois. Usos comuns: <b>auditoria</b> (registrar quem mudou o quê e quando), manter campos calculados e validar regras. Cuidado: triggers são “invisíveis” para quem lê o código da aplicação e podem deixar operações mais lentas; documente-as bem.</p>
<p>Um <b>evento</b> é uma tarefa agendada dentro do próprio MySQL, como o <code>cron</code>: roda uma vez em um horário (<code>AT</code>) ou periodicamente (<code>EVERY 1 DAY</code>). Exemplos: limpar sessões expiradas, arquivar registros antigos e recalcular tabelas de resumo. Para funcionar, o agendador precisa estar ligado (<code>event_scheduler = ON</code>).</p>`,
      partes: [
        [c`CREATE TABLE log_precos ( … preco_antigo DECIMAL(10,2), preco_novo DECIMAL(10,2), alterado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, usuario VARCHAR(100) );`, "Tabela de auditoria que guardará cada mudança de preço."],
        [c`CREATE TRIGGER trg_produtos_preco AFTER UPDATE ON produtos FOR EACH ROW`, "Trigger que roda depois de cada linha atualizada na tabela produtos."],
        [c`IF NEW.preco <> OLD.preco THEN`, "Só registra se o preço realmente mudou (`<>` = diferente)."],
        [c`INSERT INTO log_precos (…) VALUES (OLD.id, OLD.preco, NEW.preco, CURRENT_USER());`, "Grava o preço antigo, o novo e o usuário do banco que fez a alteração."],
        [c`SET GLOBAL event_scheduler = ON;`, "Liga o agendador de eventos do servidor."],
        [c`CREATE EVENT ev_limpa_sessoes ON SCHEDULE EVERY 1 DAY STARTS '2026-10-19 03:00:00'`, "Evento diário, começando às 3h da manhã."],
        [c`DO DELETE FROM sessoes WHERE expira_em < NOW();`, "O que o evento faz: apaga sessões expiradas."]
      ]
    },
    a3: {
      detalhes: `<p>Quando o sistema fica lento, o primeiro passo é <b>encontrar</b> as consultas problemáticas. O <b>slow query log</b> registra toda consulta que demora mais que um limite (<code>long_query_time</code>); a ferramenta <code>mysqldumpslow</code> resume esse log, mostrando as consultas mais lentas e frequentes. O <code>SHOW FULL PROCESSLIST</code> mostra o que está rodando agora, e o <code>KILL</code> encerra uma consulta travada.</p>
<p>Com a consulta em mãos, o <code>EXPLAIN ANALYZE</code> (MySQL 8.0.18+) executa a consulta e mostra o plano com os tempos reais de cada etapa, indicando se faltam índices. No servidor, o parâmetro mais importante é o <code>innodb_buffer_pool_size</code>: a memória onde o InnoDB guarda dados e índices, normalmente 60–70% da RAM de um servidor dedicado.</p>
<p>A <b>replicação</b> mantém cópias do banco (réplicas) sincronizadas com o servidor principal, por meio do <b>binary log</b>, que registra todas as alterações. Réplicas servem para distribuir leituras (relatórios), ter alta disponibilidade (promover uma réplica se o principal cair) e fazer backups sem pesar no principal. Serviços de nuvem como AWS RDS e Google Cloud SQL criam réplicas com poucos cliques.</p>`,
      partes: [
        [c`SET GLOBAL slow_query_log = 'ON';`, "Liga o registro de consultas lentas."],
        [c`SET GLOBAL long_query_time = 1;`, "Considera lenta qualquer consulta com mais de 1 segundo."],
        [c`SHOW VARIABLES LIKE 'slow_query_log_file';`, "Mostra em qual arquivo o log é gravado."],
        [c`EXPLAIN ANALYZE SELECT * FROM pedidos WHERE cliente_id = 42 ORDER BY data DESC LIMIT 10;`, "Executa e mostra o plano com tempos reais."],
        [c`SHOW FULL PROCESSLIST;`, "Lista as conexões e consultas em execução agora."],
        [c`-- KILL 12345;`, "Encerra a consulta de id 12345 (o id aparece no processlist)."],
        [c`SHOW VARIABLES LIKE 'innodb_buffer_pool_size';`, "Confere quanta memória o InnoDB pode usar como cache."],
        [c`SHOW REPLICA STATUS\G`, "Mostra o estado da replicação; o `\\G` exibe o resultado na vertical, mais legível."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual comando seleciona o banco de dados que será usado?", ["`OPEN loja;`", "`USE loja;`", "`SELECT DATABASE loja;`", "`CONNECT loja;`"], 1, "Depois do `USE`, os comandos valem para aquele banco."),
      l("Complete para listar as tabelas do banco atual:", c`SHOW ____;`, "TABLES", "`SHOW DATABASES;` lista os bancos do servidor.", true),
      m("Qual engine do MySQL suporta transações e chaves estrangeiras?", ["MyISAM", "InnoDB", "Memory", "CSV"], 1, "InnoDB é o padrão e o mais indicado."),
      m("Por que usar `utf8mb4` em vez de `utf8`?", ["É mais rápido", "Guarda todos os caracteres, inclusive emojis", "Ocupa menos espaço", "É obrigatório no Windows"], 1, "O antigo `utf8` do MySQL guarda só até 3 bytes por caractere."),
      m("Qual tipo é o correto para valores em dinheiro?", ["`FLOAT`", "`DOUBLE`", "`DECIMAL(10,2)`", "`INT`"], 2, "`FLOAT` e `DOUBLE` são aproximados e geram erros de centavos."),
      m("Qual tipo é melhor para guardar um CPF?", ["`INT`", "`BIGINT`", "`CHAR(11)`", "`DECIMAL`"], 2, "Como número, o CPF perderia os zeros à esquerda."),
      m("O que `ENUM('free','pro','premium')` faz?", ["Aceita qualquer texto", "Só aceita um dos valores listados", "Cria três colunas", "Ordena os valores"], 1, "É útil para listas fixas de opções."),
      l("Complete a função que devolve a data de hoje (sem hora):", c`SELECT ____();`, "CURDATE", "`NOW()` devolve data e hora.", true),
      m("Qual expressão formata uma data como 25/12/2026?", ["`DATE_FORMAT(data, '%d/%m/%Y')`", "`FORMAT(data, 'dd/mm/yyyy')`", "`TO_CHAR(data)`", "`DATE(data, 'BR')`"], 0, "`%d` dia, `%m` mês, `%Y` ano com 4 dígitos."),
      m("O que faz `IFNULL(telefone, 'não informado')`?", ["Apaga telefones nulos", "Mostra o texto alternativo quando o telefone for nulo", "Conta os nulos", "Dá erro"], 1, "`COALESCE` faz o mesmo e aceita vários valores.")
    ],
    intermediario: [
      m("No MySQL, o que identifica um usuário?", ["Só o nome", "O nome e o host de onde ele conecta", "O e-mail", "A senha"], 1, "`'app'@'localhost'` e `'app'@'%'` são usuários diferentes."),
      l("Complete para dar permissão de leitura no banco loja:", c`____ SELECT ON loja.* TO 'bi'@'%';`, "GRANT", "`REVOKE` retira a permissão.", true),
      m("O que é o princípio do menor privilégio?", ["Dar todas as permissões para evitar erros", "Dar a cada usuário só as permissões necessárias", "Usar o root na aplicação", "Ter poucos usuários"], 1, "Se uma senha vazar, o estrago fica limitado."),
      vf("A aplicação deve se conectar ao banco usando o usuário root.", false, "Crie um usuário próprio, com apenas as permissões de que a aplicação precisa."),
      m("Uma view guarda uma cópia dos dados?", ["Sim, sempre", "Não, ela guarda a consulta e lê os dados atuais das tabelas", "Só views grandes", "Só se tiver índice"], 1, "Por isso ela sempre mostra dados atualizados."),
      m("Qual é uma vantagem de segurança das views?", ["Deixam o banco mais rápido", "Permitem liberar acesso só a algumas colunas (escondendo dados sensíveis)", "Criptografam o banco", "Fazem backup"], 1, "Ajuda a cumprir a LGPD."),
      l("Complete para criar ou substituir uma view:", c`CREATE OR ____ VIEW vw_clientes AS SELECT id, nome FROM clientes;`, "REPLACE", "Se a view já existir, ela é substituída.", true),
      m("Como se executa uma stored procedure?", ["`RUN fechar_pedido(10);`", "`EXEC fechar_pedido(10);`", "`CALL fechar_pedido(10);`", "`SELECT fechar_pedido(10);`"], 2, "`EXEC` é usado no SQL Server; no MySQL é `CALL`."),
      m("Qual a diferença entre function e procedure no MySQL?", ["Nenhuma", "A function devolve um valor e pode ser usada dentro de consultas", "A procedure é mais rápida", "A function não aceita parâmetros"], 1, "Ex.: `SELECT nome, idade(nascimento) FROM clientes`."),
      m("Para que serve `DELIMITER $$` ao criar procedures no terminal?", ["Criptografar o código", "Trocar o fim de comando, para poder usar `;` dentro da procedure", "Comentar o código", "Criar uma variável"], 1, "Ao final, volte ao padrão com `DELIMITER ;`.")
    ],
    avancado: [
      m("Qual ferramenta gera um backup lógico (arquivo .sql) do MySQL?", ["`mysqlbackup.exe`", "`mysqldump`", "`mysql-export`", "`SELECT INTO BACKUP`"], 1, "Ela roda no terminal do sistema, fora do MySQL."),
      m("Para que serve a opção `--single-transaction` no mysqldump?", ["Fazer o backup mais rápido", "Fazer um backup consistente sem travar as tabelas InnoDB", "Apagar os dados após o backup", "Compactar o arquivo"], 1, "O sistema continua funcionando durante o backup."),
      vf("Um backup que nunca foi testado com uma restauração é uma garantia completa.", false, "É preciso restaurar periodicamente em um ambiente de teste para confirmar que funciona."),
      m("O que é uma trigger?", ["Um backup", "Um código executado automaticamente em INSERT, UPDATE ou DELETE", "Um usuário especial", "Um tipo de índice"], 1, "Pode rodar antes (`BEFORE`) ou depois (`AFTER`) da operação."),
      l("Complete: em uma trigger de UPDATE, o valor anterior do preço é…", c`IF NEW.preco <> ____.preco THEN ...`, "OLD", "`OLD` = antes da alteração; `NEW` = depois.", true),
      m("O que é um EVENT no MySQL?", ["Um log de erros", "Uma tarefa agendada que roda dentro do banco", "Um gatilho de login", "Uma notificação por e-mail"], 1, "Precisa do `event_scheduler` ligado."),
      m("O que o slow query log registra?", ["Todas as consultas", "As consultas que demoram mais que o limite definido", "Só os erros", "Os logins"], 1, "O limite é definido por `long_query_time`."),
      l("Complete o comando que mostra o que está rodando no servidor agora:", c`SHOW FULL ____;`, "PROCESSLIST", "Com o id mostrado, é possível encerrar uma consulta com `KILL id`.", true),
      m("O que é replicação no MySQL?", ["Duplicar uma tabela", "Manter cópias do banco sincronizadas com o servidor principal", "Fazer backup diário", "Copiar o banco para o Excel"], 1, "Serve para distribuir leituras e ter alta disponibilidade."),
      m("Qual parâmetro define a memória de cache do InnoDB?", ["`max_connections`", "`innodb_buffer_pool_size`", "`query_cache`", "`memory_limit`"], 1, "Em servidores dedicados, costuma ficar entre 60% e 70% da RAM.")
    ]
  }
};
