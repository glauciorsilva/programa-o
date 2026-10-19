import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>Um banco de dados relacional organiza as informações em <b>tabelas</b>, formadas por <b>colunas</b> (os campos, como nome e e-mail) e <b>linhas</b> (os registros, como cada cliente). <b>SQL</b> (<i>Structured Query Language</i>) é a linguagem para consultar e manipular esses dados. Ela é declarativa: você diz <b>o que</b> quer, e o banco decide como buscar.</p>
<p>A consulta <code>SELECT</code> tem cláusulas em ordem fixa: <code>SELECT</code> (quais colunas), <code>FROM</code> (de qual tabela), <code>WHERE</code> (quais linhas), <code>ORDER BY</code> (em que ordem: <code>ASC</code> crescente ou <code>DESC</code> decrescente) e <code>LIMIT</code> (quantas linhas). Textos e datas vão entre aspas simples (<code>'SP'</code>, <code>'2026-01-01'</code>). Palavras-chave não diferenciam maiúsculas, mas é convenção escrevê-las em maiúsculas.</p>
<p>Operadores do <code>WHERE</code>: comparação (<code>=</code>, <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;=</code>...), lógicos (<code>AND</code>, <code>OR</code>, <code>NOT</code>), faixas (<code>BETWEEN</code>), listas (<code>IN</code>), padrões de texto (<code>LIKE</code>, em que <code>%</code> é “qualquer sequência” e <code>_</code> é “um caractere”) e ausência de valor (<code>IS NULL</code>). Evite <code>SELECT *</code> em sistemas: peça só as colunas necessárias.</p>`,
      partes: [
        [c`SELECT * FROM clientes;`, "Todas as colunas (`*`) de todas as linhas da tabela clientes. Útil só para explorar."],
        [c`SELECT nome, email, cidade`, "Escolhe apenas três colunas."],
        [c`FROM clientes`, "Tabela de onde os dados vêm."],
        [c`WHERE uf = 'SP' AND ativo = 1 AND data_cadastro >= '2026-01-01'`, "Três condições que precisam ser verdadeiras ao mesmo tempo."],
        [c`ORDER BY nome ASC`, "Ordena pelo nome em ordem alfabética."],
        [c`LIMIT 10;`, "Devolve no máximo 10 linhas."],
        [c`WHERE preco BETWEEN 50 AND 100;`, "Preço de 50 a 100, incluindo os limites."],
        [c`WHERE categoria IN ('livros', 'jogos');`, "Categoria igual a qualquer um dos valores da lista."],
        [c`WHERE nome LIKE 'Ana%';`, "Nomes que começam com “Ana”."],
        [c`WHERE telefone IS NULL;`, "Linhas sem telefone. `= NULL` não funciona."]
      ]
    },
    b2: {
      detalhes: `<p>Além de consultar, o SQL altera dados com três comandos (a parte chamada <b>DML</b>). O <code>INSERT INTO tabela (colunas) VALUES (valores)</code> cria novas linhas; é possível inserir várias de uma vez separando os grupos de valores por vírgula. Colunas não informadas recebem o valor padrão (<code>DEFAULT</code>) ou <code>NULL</code>.</p>
<p>O <code>UPDATE tabela SET coluna = valor WHERE condição</code> altera linhas existentes; o novo valor pode usar o antigo (<code>preco = preco * 0.9</code>). O <code>DELETE FROM tabela WHERE condição</code> remove linhas. Nos dois, o <code>WHERE</code> é <b>essencial</b>: sem ele, <b>todas</b> as linhas são afetadas.</p>
<p>Boas práticas: antes de um UPDATE ou DELETE, rode um <code>SELECT</code> com o mesmo <code>WHERE</code> para conferir quais linhas serão afetadas; faça alterações importantes dentro de uma transação; e prefira a <b>exclusão lógica</b> (marcar como inativo) quando o histórico importa, como em clientes e pedidos.</p>`,
      partes: [
        [c`INSERT INTO clientes (nome, email, uf)`, "Tabela e colunas que serão preenchidas."],
        [c`VALUES ('Joana Lima', 'joana@email.com', 'PE');`, "Valores na mesma ordem das colunas."],
        [c`INSERT INTO produtos (nome, preco) VALUES ('Caneca', 29.90), ('Camiseta', 59.90);`, "Insere duas linhas em um único comando."],
        [c`SELECT * FROM produtos WHERE categoria = 'promo';`, "Confere antes quais linhas serão alteradas."],
        [c`UPDATE produtos SET preco = preco * 0.9 WHERE categoria = 'promo';`, "Aplica 10% de desconto só nos produtos da categoria promo."],
        [c`UPDATE clientes SET ativo = 0 WHERE id = 42;`, "Exclusão lógica: o cliente continua no banco, mas marcado como inativo."],
        [c`DELETE FROM sessoes WHERE expira_em < NOW();`, "Remove sessões já expiradas. `NOW()` é a data e hora atual."]
      ]
    },
    b3: {
      detalhes: `<p><b>Funções de agregação</b> resumem várias linhas em um único valor: <code>COUNT</code> (quantidade), <code>SUM</code> (soma), <code>AVG</code> (média), <code>MIN</code> e <code>MAX</code>. <code>COUNT(*)</code> conta linhas; <code>COUNT(coluna)</code> conta só os valores não nulos; <code>COUNT(DISTINCT coluna)</code> conta valores diferentes.</p>
<p>O <code>GROUP BY</code> divide as linhas em grupos (por estado, por mês, por vendedor) e calcula a agregação para cada grupo. Regra importante: no <code>SELECT</code>, toda coluna que não estiver dentro de uma função de agregação precisa estar no <code>GROUP BY</code>. O apelido com <code>AS</code> dá nomes legíveis às colunas calculadas.</p>
<p><code>WHERE</code> e <code>HAVING</code> filtram em momentos diferentes. A ordem lógica de execução é: <code>FROM</code> → <code>WHERE</code> (filtra linhas) → <code>GROUP BY</code> → <code>HAVING</code> (filtra grupos, pode usar agregações) → <code>SELECT</code> → <code>ORDER BY</code> → <code>LIMIT</code>. Entender essa ordem explica muitos erros comuns.</p>`,
      partes: [
        [c`SELECT COUNT(*) AS total_pedidos,`, "Conta as linhas e nomeia a coluna como `total_pedidos`."],
        [c`SUM(valor) AS faturamento, AVG(valor) AS ticket_medio, MAX(valor) AS maior_pedido`, "Soma, média e maior valor da coluna `valor`."],
        [c`FROM pedidos WHERE status = 'pago';`, "Considera só os pedidos pagos."],
        [c`SELECT uf, COUNT(*) AS qtd, SUM(valor) AS total`, "Para cada estado: quantidade e soma."],
        [c`WHERE status = 'pago'`, "Filtra as linhas antes de agrupar."],
        [c`GROUP BY uf`, "Cria um grupo para cada estado."],
        [c`HAVING SUM(valor) > 10000`, "Filtra os grupos depois de calcular: só estados com mais de R$ 10 mil."],
        [c`ORDER BY total DESC;`, "Do maior faturamento para o menor; pode usar o apelido."]
      ]
    },
    i1: {
      detalhes: `<p>Em um banco bem modelado, as informações ficam em tabelas separadas e ligadas por <b>chaves</b>: o pedido guarda só o <code>cliente_id</code>, e os dados do cliente ficam na tabela de clientes. O <b>JOIN</b> junta as tabelas na consulta, combinando as linhas pela condição do <code>ON</code>. Usar <b>apelidos</b> curtos para as tabelas (<code>pedidos p</code>) deixa a consulta legível.</p>
<ul>
<li><code>INNER JOIN</code> (ou só <code>JOIN</code>): só as linhas que têm correspondência nas duas tabelas.</li>
<li><code>LEFT JOIN</code>: todas as linhas da tabela da esquerda; onde não há correspondência, as colunas da direita vêm <code>NULL</code>.</li>
<li><code>RIGHT JOIN</code>: o inverso do LEFT (pouco usado).</li>
<li><code>FULL OUTER JOIN</code>: todas as linhas dos dois lados (não existe no MySQL).</li>
</ul>
<p>O padrão <code>LEFT JOIN ... WHERE direita.id IS NULL</code> encontra registros <b>sem</b> correspondência, como clientes que nunca compraram. É possível encadear vários JOINs para cruzar três ou mais tabelas.</p>`,
      partes: [
        [c`SELECT p.id, c.nome, p.valor, p.data`, "Colunas vindas de duas tabelas, identificadas pelos apelidos."],
        [c`FROM pedidos p`, "Tabela principal, com o apelido `p`."],
        [c`INNER JOIN clientes c ON c.id = p.cliente_id;`, "Junta cada pedido ao seu cliente, onde o id do cliente bate com o `cliente_id` do pedido."],
        [c`FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id`, "Todos os clientes, com ou sem pedidos."],
        [c`COUNT(p.id) AS qtd_pedidos … GROUP BY c.id, c.nome;`, "Conta os pedidos de cada cliente; quem não tem pedido fica com 0."],
        [c`WHERE p.id IS NULL;`, "Mantém só os clientes sem nenhum pedido correspondente."],
        [c`FROM itens_pedido i JOIN pedidos p ON … JOIN clientes c ON … JOIN produtos pr ON …`, "Três JOINs encadeados para ligar itens, pedidos, clientes e produtos."]
      ]
    },
    i2: {
      detalhes: `<p>Uma <b>subconsulta</b> (<i>subquery</i>) é um <code>SELECT</code> dentro de outro, entre parênteses. Ela pode devolver um único valor (usado em comparações, como “maior que a média”), uma lista (usada com <code>IN</code>) ou uma tabela inteira (usada no <code>FROM</code>). O <code>EXISTS</code> testa se a subconsulta encontra pelo menos uma linha, e costuma ser eficiente.</p>
<p>A <b>CTE</b> (<i>Common Table Expression</i>), criada com <code>WITH nome AS (...)</code>, dá nome a uma consulta intermediária, que depois é usada como se fosse uma tabela. É possível ter várias CTEs separadas por vírgula, cada uma usando as anteriores. Isso transforma consultas enormes em etapas fáceis de ler, testar e manter.</p>
<p>O <code>CROSS JOIN</code> combina cada linha de uma tabela com todas as linhas da outra; no exemplo, ele “cola” o valor único da média em todas as linhas. CTEs estão disponíveis no MySQL a partir da versão 8.</p>`,
      partes: [
        [c`WHERE preco > (SELECT AVG(preco) FROM produtos);`, "A subconsulta calcula a média; a consulta de fora usa esse valor para filtrar."],
        [c`WITH vendas_mes AS (`, "Início da CTE `vendas_mes`: uma “tabela temporária” com nome."],
        [c`SELECT cliente_id, SUM(valor) AS total FROM pedidos WHERE data >= '2026-09-01' AND data < '2026-10-01' GROUP BY cliente_id`, "Total vendido por cliente em setembro."],
        [c`), media AS ( SELECT AVG(total) AS media FROM vendas_mes )`, "Segunda CTE, usando a primeira: a média dos totais."],
        [c`FROM vendas_mes v JOIN clientes c ON c.id = v.cliente_id`, "Usa a CTE como se fosse uma tabela."],
        [c`CROSS JOIN media m WHERE v.total > m.media`, "Junta a média (uma linha só) a cada cliente e filtra quem ficou acima."],
        [c`WHERE EXISTS (SELECT 1 FROM pedidos p JOIN itens_pedido i … )`, "Mantém o cliente se existir ao menos um pedido dele com o produto 10."]
      ]
    },
    i3: {
      detalhes: `<p><b>Modelagem</b> é decidir quais tabelas existirão, quais colunas cada uma terá e como elas se relacionam. Cada tabela tem uma <b>chave primária</b> (<code>PRIMARY KEY</code>), que identifica cada linha de forma única. A <b>chave estrangeira</b> (<code>FOREIGN KEY</code>) é uma coluna que aponta para a chave primária de outra tabela, garantindo que não exista, por exemplo, pedido de um cliente inexistente.</p>
<p>Os relacionamentos podem ser: <b>1:1</b> (um para um), <b>1:N</b> (um cliente tem vários pedidos: a chave estrangeira fica no lado “muitos”) e <b>N:N</b> (um pedido tem vários produtos e um produto aparece em vários pedidos: exige uma tabela intermediária, como <code>itens_pedido</code>). <b>Restrições</b> como <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code> e <code>DEFAULT</code> protegem a qualidade dos dados.</p>
<p>A <b>normalização</b> organiza as tabelas para evitar dados repetidos e inconsistências, seguindo formas normais (1FN, 2FN, 3FN). Antes de criar as tabelas, é comum desenhar um <b>diagrama entidade-relacionamento</b> (DER) em ferramentas como dbdiagram.io ou MySQL Workbench.</p>`,
      partes: [
        [c`CREATE TABLE clientes (`, "Cria a tabela de clientes."],
        [c`id INT PRIMARY KEY AUTO_INCREMENT,`, "Chave primária numérica, gerada automaticamente (1, 2, 3...)."],
        [c`nome VARCHAR(100) NOT NULL,`, "Texto de até 100 caracteres, obrigatório."],
        [c`email VARCHAR(150) NOT NULL UNIQUE,`, "Obrigatório e sem repetição entre clientes."],
        [c`criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP`, "Se não for informado, recebe a data e hora atual."],
        [c`valor DECIMAL(10,2) NOT NULL CHECK (valor >= 0),`, "Valor com até 10 dígitos, 2 decimais, nunca negativo."],
        [c`FOREIGN KEY (cliente_id) REFERENCES clientes(id)`, "Garante que `cliente_id` exista na tabela de clientes."],
        [c`PRIMARY KEY (pedido_id, produto_id)`, "Chave primária composta: a combinação pedido + produto não se repete."]
      ]
    },
    a1: {
      detalhes: `<p><b>Window functions</b> (funções de janela) fazem cálculos sobre um conjunto de linhas relacionadas à linha atual, <b>sem agrupar</b> o resultado: cada linha continua aparecendo, mas ganha uma coluna extra, como sua posição no ranking ou o valor do mês anterior. Elas usam a cláusula <code>OVER (...)</code>.</p>
<p>Dentro do <code>OVER</code>: <code>PARTITION BY</code> divide as linhas em grupos independentes (por exemplo, por região) e <code>ORDER BY</code> define a ordem dentro de cada grupo. Funções comuns: <code>ROW_NUMBER()</code> (numeração única), <code>RANK()</code> e <code>DENSE_RANK()</code> (rankings com empate), <code>LAG()</code> e <code>LEAD()</code> (valor da linha anterior ou seguinte) e agregações como <code>SUM() OVER</code> (total acumulado).</p>
<p>Casos clássicos: top N por categoria, comparação com o período anterior, acumulados, médias móveis e remoção de duplicados mantendo o registro mais recente. Como window functions não podem ser usadas no <code>WHERE</code>, o padrão é calculá-las em uma CTE e filtrar na consulta de fora. No MySQL, estão disponíveis a partir da versão 8.</p>`,
      partes: [
        [c`RANK() OVER (PARTITION BY regiao ORDER BY total DESC) AS posicao`, "Ranking dentro de cada região, do maior total para o menor."],
        [c`ROW_NUMBER() OVER (ORDER BY total DESC) AS geral`, "Numeração geral, sem dividir por região."],
        [c`LAG(faturamento) OVER (ORDER BY mes) AS mes_anterior`, "Traz o faturamento da linha anterior (o mês anterior)."],
        [c`faturamento - LAG(faturamento) OVER (ORDER BY mes) AS variacao`, "Diferença em relação ao mês anterior."],
        [c`SUM(valor) OVER (ORDER BY data) AS acumulado`, "Soma acumulada até a data de cada linha."],
        [c`ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY data DESC) AS rn`, "Numera os pedidos de cada cliente, do mais recente (1) para o mais antigo."],
        [c`SELECT * FROM r WHERE rn = 1;`, "Filtra na consulta de fora: só o último pedido de cada cliente."]
      ]
    },
    a2: {
      detalhes: `<p>Sem índice, para encontrar linhas o banco precisa ler a tabela inteira (<b>full table scan</b>), o que fica lento com milhões de registros. Um <b>índice</b> é uma estrutura auxiliar ordenada (normalmente uma árvore B-tree) que permite localizar rapidamente as linhas pelo valor de uma ou mais colunas. Chaves primárias e colunas <code>UNIQUE</code> já têm índice automaticamente.</p>
<p>Em um <b>índice composto</b> (várias colunas), a ordem importa: um índice em <code>(cliente_id, status)</code> ajuda consultas que filtram por <code>cliente_id</code>, ou por <code>cliente_id</code> e <code>status</code>, mas não ajuda quem filtra só por <code>status</code>. Índices têm custo: ocupam espaço e deixam INSERT, UPDATE e DELETE mais lentos, porque também precisam ser atualizados.</p>
<p>O comando <code>EXPLAIN</code> mostra o <b>plano de execução</b>: como o banco pretende executar a consulta e se vai usar algum índice. Alguns hábitos impedem o uso de índices, como aplicar funções na coluna (<code>YEAR(data) = 2026</code>) ou buscar com curinga no início (<code>LIKE '%silva'</code>). Reescrever esses filtros costuma resolver.</p>`,
      partes: [
        [c`EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 42 AND status = 'pago';`, "Mostra como o banco vai executar a consulta, sem executá-la de fato."],
        [c`CREATE INDEX idx_pedidos_cliente_status ON pedidos (cliente_id, status);`, "Cria um índice composto; o nome segue o padrão `idx_tabela_colunas`."],
        [c`WHERE YEAR(data) = 2026;`, "Ruim: a função na coluna impede o uso do índice em `data`."],
        [c`WHERE data >= '2026-01-01' AND data < '2027-01-01';`, "Mesmo resultado, mas com intervalo: o índice pode ser usado."],
        [c`WHERE nome LIKE '%silva';`, "Curinga no início: o índice não ajuda, pois não se sabe por onde começa o texto."]
      ]
    },
    a3: {
      detalhes: `<p>Uma <b>transação</b> agrupa vários comandos em uma unidade: ou <b>todos</b> são confirmados, ou <b>nenhum</b>. Começa com <code>START TRANSACTION</code> (ou <code>BEGIN</code>), e termina com <code>COMMIT</code> (confirma e torna as mudanças permanentes) ou <code>ROLLBACK</code> (desfaz tudo desde o início da transação).</p>
<p>As propriedades <b>ACID</b> descrevem o que um banco transacional garante: <b>Atomicidade</b> (tudo ou nada), <b>Consistência</b> (as regras e restrições são sempre respeitadas), <b>Isolamento</b> (transações simultâneas não enxergam os dados pela metade uma da outra) e <b>Durabilidade</b> (depois do COMMIT, os dados sobrevivem a quedas de energia).</p>
<p>O <b>nível de isolamento</b> controla o que uma transação vê das outras: <code>READ UNCOMMITTED</code>, <code>READ COMMITTED</code>, <code>REPEATABLE READ</code> (padrão do MySQL) e <code>SERIALIZABLE</code>. Quanto maior o isolamento, menos anomalias e menor a concorrência. Mantenha transações curtas, para não travar outras operações.</p>`,
      partes: [
        [c`START TRANSACTION;`, "Inicia a transação: as mudanças a seguir ainda não são definitivas."],
        [c`UPDATE contas SET saldo = saldo - 100 WHERE id = 1;`, "Tira 100 da conta do João."],
        [c`UPDATE contas SET saldo = saldo + 100 WHERE id = 2;`, "Coloca 100 na conta da Maria."],
        [c`COMMIT;`, "Confirma as duas alterações juntas."],
        [c`-- ROLLBACK;`, "Alternativa: desfaz tudo se algo deu errado."],
        [c`SELECT ROW_COUNT();`, "Mostra quantas linhas o último comando alterou, para conferir antes do COMMIT."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual comando SQL busca dados de uma tabela?", ["`GET`", "`SELECT`", "`FIND`", "`SHOW DATA`"], 1, "`SELECT colunas FROM tabela` é a consulta básica."),
      l("Complete para filtrar apenas os clientes de SP:", c`SELECT nome FROM clientes ____ uf = 'SP';`, "WHERE", "O `WHERE` filtra as linhas.", true),
      m("Como ordenar do maior para o menor valor?", ["`ORDER BY valor ASC`", "`ORDER BY valor DESC`", "`SORT valor`", "`ORDER valor DOWN`"], 1, "`ASC` é crescente (padrão) e `DESC` decrescente."),
      m("Qual condição encontra nomes que começam com “Ana”?", ["`nome = 'Ana%'`", "`nome LIKE 'Ana%'`", "`nome LIKE '%Ana'`", "`nome IN 'Ana'`"], 1, "`%` representa qualquer sequência de caracteres."),
      m("Como encontrar clientes sem telefone cadastrado (NULL)?", ["`telefone = NULL`", "`telefone IS NULL`", "`telefone == ''`", "`telefone EMPTY`"], 1, "Comparações com `=` NULL nunca são verdadeiras."),
      m("O que acontece em `DELETE FROM clientes;` sem WHERE?", ["Nada", "Apaga só o primeiro cliente", "Apaga TODOS os clientes", "Dá erro de sintaxe"], 2, "Sempre confira o WHERE antes de UPDATE e DELETE."),
      l("Complete para inserir um novo produto:", c`____ INTO produtos (nome, preco) VALUES ('Caneca', 29.90);`, "INSERT", "`INSERT INTO tabela (colunas) VALUES (valores)`.", true),
      m("Qual função conta as linhas?", ["`SUM(*)`", "`COUNT(*)`", "`TOTAL(*)`", "`NUMBER(*)`"], 1, "`COUNT(coluna)` conta só valores não nulos."),
      m("Qual cláusula filtra GRUPOS depois do GROUP BY?", ["`WHERE`", "`HAVING`", "`FILTER`", "`LIMIT`"], 1, "O `WHERE` filtra linhas antes de agrupar e não aceita agregações."),
      m("Em `SELECT uf, COUNT(*) FROM pedidos GROUP BY uf;`, o que aparece?", ["Um total geral", "Uma linha por estado com a quantidade de pedidos", "Só os nomes dos estados", "Erro"], 1, "Cada valor diferente de `uf` vira um grupo.")
    ],
    intermediario: [
      m("Qual JOIN traz só as linhas que têm correspondência nas duas tabelas?", ["`LEFT JOIN`", "`INNER JOIN`", "`FULL JOIN`", "`CROSS JOIN`"], 1, "O `LEFT JOIN` traz também as linhas da esquerda sem correspondência."),
      l("Complete a condição que liga pedidos aos clientes:", c`SELECT * FROM pedidos p JOIN clientes c ____ c.id = p.cliente_id;`, "ON", "O `ON` diz como as linhas das duas tabelas se combinam.", true),
      m("Como listar clientes que NUNCA fizeram pedido?", ["`INNER JOIN` com `WHERE p.id IS NOT NULL`", "`LEFT JOIN pedidos` com `WHERE p.id IS NULL`", "`RIGHT JOIN` sem WHERE", "`CROSS JOIN`"], 1, "No LEFT JOIN, quem não tem pedido fica com as colunas de pedidos em NULL."),
      m("O que é uma CTE?", ["Um tipo de índice", "Uma consulta nomeada com `WITH`, usada como tabela temporária na consulta", "Um backup", "Uma chave estrangeira"], 1, "Deixa consultas grandes divididas em etapas legíveis."),
      l("Complete a palavra que inicia uma CTE:", c`____ vendas_mes AS (
  SELECT cliente_id, SUM(valor) AS total FROM pedidos GROUP BY cliente_id
)
SELECT * FROM vendas_mes;`, "WITH", "Depois do `WITH` vem o nome e a consulta entre parênteses.", true),
      m("O que `WHERE preco > (SELECT AVG(preco) FROM produtos)` faz?", ["Calcula a média", "Mostra produtos com preço acima da média", "Apaga produtos caros", "Dá erro"], 1, "A subconsulta devolve um único valor, usado na comparação."),
      m("Para que serve a chave primária?", ["Criptografar a tabela", "Identificar cada linha de forma única", "Ordenar os dados", "Ligar ao servidor"], 1, "Não pode se repetir nem ser nula."),
      m("O que uma chave estrangeira garante?", ["Que a coluna seja única", "Que o valor exista na tabela referenciada", "Que a tabela seja rápida", "Que a coluna seja numérica"], 1, "Ex.: não existe pedido com `cliente_id` de um cliente inexistente."),
      m("Como representar a relação N:N entre pedidos e produtos?", ["Uma coluna com vários ids separados por vírgula", "Uma tabela intermediária (ex.: `itens_pedido`)", "Duplicando os pedidos", "Não é possível"], 1, "A tabela intermediária guarda pares pedido + produto."),
      vf("A normalização busca evitar dados repetidos e inconsistentes.", true, "Ex.: o endereço do cliente fica na tabela de clientes, e não repetido em cada pedido.")
    ],
    avancado: [
      m("Qual a principal diferença entre GROUP BY e window functions?", ["Não há diferença", "Window functions calculam sem agrupar: cada linha continua aparecendo", "GROUP BY é mais novo", "Window functions só funcionam com datas"], 1, "As linhas ganham uma coluna extra com o cálculo."),
      l("Complete para numerar os pedidos de cada cliente separadamente:", c`ROW_NUMBER() OVER (____ BY cliente_id ORDER BY data DESC)`, "PARTITION", "`PARTITION BY` reinicia o cálculo para cada grupo.", true),
      m("Com os valores 100, 100, 90, qual o resultado de `DENSE_RANK()`?", ["1, 2, 3", "1, 1, 3", "1, 1, 2", "2, 2, 1"], 2, "`RANK()` daria 1, 1, 3 (pula posições); `ROW_NUMBER()` daria 1, 2, 3."),
      m("Qual função traz o valor da linha anterior?", ["`LEAD()`", "`LAG()`", "`PREV()`", "`BEFORE()`"], 1, "`LEAD()` traz o valor da linha seguinte."),
      m("Qual comando mostra o plano de execução de uma consulta?", ["`SHOW PLAN`", "`EXPLAIN`", "`DESCRIBE INDEX`", "`ANALYZE ALL`"], 1, "Mostra, por exemplo, se a consulta usará algum índice."),
      vf("Criar índices em todas as colunas é sempre a melhor escolha.", false, "Índices ocupam espaço e deixam INSERT, UPDATE e DELETE mais lentos."),
      m("Qual filtro permite usar um índice na coluna `data`?", ["`WHERE YEAR(data) = 2026`", "`WHERE data >= '2026-01-01' AND data < '2027-01-01'`", "`WHERE data LIKE '2026%'`", "`WHERE MONTH(data) > 0`"], 1, "Funções aplicadas à coluna impedem o uso do índice."),
      l("Complete para desfazer as alterações de uma transação:", c`START TRANSACTION;
UPDATE contas SET saldo = 0;
____;`, "ROLLBACK", "`COMMIT` confirma; `ROLLBACK` desfaz.", true),
      m("O que o “A” de ACID significa?", ["Acesso", "Atomicidade: tudo ou nada", "Agilidade", "Autenticação"], 1, "Em uma transferência, débito e crédito acontecem juntos ou não acontecem."),
      m("Depois do COMMIT, as alterações…", ["podem ser desfeitas com ROLLBACK", "são permanentes", "ficam visíveis só para você", "são apagadas ao reiniciar"], 1, "É a Durabilidade do ACID.")
    ]
  }
};
