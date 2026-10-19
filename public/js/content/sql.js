const c = String.raw;

export default {
  id: "sql",
  nome: "SQL (fundamentos)",
  icone: "🗃️",
  cor: "#0f766e",
  dificuldade: 1,
  resumo: "A língua universal dos bancos de dados relacionais. Serve para MySQL, PostgreSQL, SQL Server, Oracle e outros.",
  mercado: "Pedido em quase toda vaga de tecnologia: dados, BI, back-end, suporte, QA e até áreas de negócio. Teste de SQL é um dos mais comuns em entrevista.",
  docs: [
    { nome: "SQLBolt", url: "https://sqlbolt.com/", desc: "exercícios interativos no navegador" },
    { nome: "W3Schools SQL", url: "https://www.w3schools.com/sql/", desc: "consulta rápida de sintaxe" },
    { nome: "DB Fiddle", url: "https://www.db-fiddle.com/", desc: "rode SQL online em MySQL/PostgreSQL" },
    { nome: "Use The Index, Luke", url: "https://use-the-index-luke.com/pt", desc: "índices e performance explicados" }
  ],
  niveis: {
    basico: {
      objetivo: "consultar, filtrar, ordenar, inserir, alterar e resumir dados de uma tabela.",
      topicos: [
        {
          titulo: "SELECT, WHERE e ORDER BY",
          crianca: `O banco de dados é um <b>armário cheio de fichários</b> (tabelas). Cada ficha é uma linha. O <code>SELECT</code> é pedir: “me mostra as fichas”; o <code>WHERE</code> é “só as de quem mora em SP”; o <code>ORDER BY</code> é “em ordem alfabética”.`,
          codigo: c`
-- Todas as colunas (evite em produção)
SELECT * FROM clientes;

-- Só o que precisa, com filtro e ordenação
SELECT nome, email, cidade
FROM clientes
WHERE uf = 'SP'
  AND ativo = 1
  AND data_cadastro >= '2026-01-01'
ORDER BY nome ASC
LIMIT 10;

-- Filtros úteis
SELECT * FROM produtos WHERE preco BETWEEN 50 AND 100;
SELECT * FROM produtos WHERE categoria IN ('livros', 'jogos');
SELECT * FROM clientes WHERE nome LIKE 'Ana%';      -- começa com Ana
SELECT * FROM clientes WHERE telefone IS NULL;      -- nunca use = NULL`,
          trabalho: `O suporte pergunta: “o cliente X está ativo? Qual o e-mail cadastrado?”. O comercial pede: “lista dos clientes de SP cadastrados este ano”. São consultas de 1 minuto quando você sabe SQL, em vez de esperar alguém da TI.`,
          entrevista: {
            pergunta: "Por que WHERE coluna = NULL não funciona?",
            resposta: `NULL significa “valor desconhecido”, então qualquer comparação com ele resulta em desconhecido (nem verdadeiro, nem falso). Para testar, use <code>IS NULL</code> ou <code>IS NOT NULL</code>. Para trocar o nulo por um valor, use <code>COALESCE(coluna, 'padrão')</code>.`
          },
          busca: ["sql select where exemplos", "sql like wildcard", "sql is null coalesce"]
        },
        {
          titulo: "INSERT, UPDATE e DELETE (com cuidado!)",
          crianca: `<code>INSERT</code> é <b>colocar uma ficha nova</b> no fichário. <code>UPDATE</code> é <b>apagar e reescrever</b> parte de uma ficha. <code>DELETE</code> é <b>jogar a ficha fora</b>. Se esquecer o <code>WHERE</code>, você reescreve ou joga fora <b>o fichário inteiro</b>! 😱`,
          codigo: c`
INSERT INTO clientes (nome, email, uf)
VALUES ('Joana Lima', 'joana@email.com', 'PE');

-- Vários de uma vez
INSERT INTO produtos (nome, preco) VALUES
  ('Caneca', 29.90),
  ('Camiseta', 59.90);

-- SEMPRE rode um SELECT com o mesmo WHERE antes!
SELECT * FROM produtos WHERE categoria = 'promo';
UPDATE produtos SET preco = preco * 0.9 WHERE categoria = 'promo';

-- Exclusão lógica (mais segura que DELETE)
UPDATE clientes SET ativo = 0 WHERE id = 42;

DELETE FROM sessoes WHERE expira_em < NOW();`,
          trabalho: `Corrigir o e-mail digitado errado de um cliente, aplicar um reajuste de preços, limpar registros antigos. Em empresas sérias, alterações em produção passam por <b>revisão</b> e são feitas dentro de uma transação (veja o nível avançado).`,
          entrevista: {
            pergunta: "Qual a diferença entre DELETE, TRUNCATE e DROP?",
            resposta: `<code>DELETE</code> remove linhas (pode ter WHERE e, dentro de transação, pode ser desfeito). <code>TRUNCATE</code> esvazia a tabela inteira de forma rápida e reinicia o auto-incremento. <code>DROP</code> <b>apaga a tabela</b> (estrutura + dados).`
          },
          busca: ["sql insert multiple rows", "sql update com where", "delete vs truncate vs drop"]
        },
        {
          titulo: "Agregações: COUNT, SUM, GROUP BY, HAVING",
          crianca: `Agregar é <b>contar e somar figurinhas por time</b>: “quantas do Flamengo? quantas do Palmeiras?”. O <code>GROUP BY</code> faz os montinhos por time, e o <code>HAVING</code> é “só me mostra os montinhos com mais de 10”.`,
          codigo: c`
SELECT COUNT(*) AS total_pedidos,
       SUM(valor) AS faturamento,
       AVG(valor) AS ticket_medio,
       MAX(valor) AS maior_pedido
FROM pedidos
WHERE status = 'pago';

-- Faturamento por estado, só estados com mais de R$ 10 mil
SELECT uf,
       COUNT(*)   AS qtd,
       SUM(valor) AS total
FROM pedidos
WHERE status = 'pago'          -- filtra LINHAS (antes de agrupar)
GROUP BY uf
HAVING SUM(valor) > 10000      -- filtra GRUPOS (depois de agrupar)
ORDER BY total DESC;`,
          trabalho: `“Qual o faturamento por mês?”, “quantos clientes novos por cidade?”, “qual o ticket médio?”. São as perguntas que todo gestor faz e que alimentam os dashboards do Power BI.`,
          entrevista: {
            pergunta: "Qual a diferença entre WHERE e HAVING?",
            resposta: `<code>WHERE</code> filtra as <b>linhas antes</b> do agrupamento e não pode usar funções de agregação. <code>HAVING</code> filtra os <b>grupos depois</b> do <code>GROUP BY</code> e pode usar <code>SUM</code>, <code>COUNT</code> etc. Ordem lógica: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.`
          },
          busca: ["sql group by having", "sql ordem de execução", "count(*) vs count(coluna)"]
        }
      ]
    },
    intermediario: {
      objetivo: "cruzar várias tabelas, montar consultas em etapas e desenhar tabelas bem relacionadas.",
      topicos: [
        {
          titulo: "JOINs: juntando tabelas",
          crianca: `Uma tabela tem os <b>alunos</b> e outra tem as <b>notas</b>. O JOIN é <b>grampear</b> a ficha do aluno na ficha da nota usando o número de matrícula. <code>INNER</code>: só quem tem as duas fichas. <code>LEFT</code>: todos os alunos, mesmo sem nota.`,
          codigo: c`
-- Pedidos com o nome do cliente (só os que combinam)
SELECT p.id, c.nome, p.valor, p.data
FROM pedidos p
INNER JOIN clientes c ON c.id = p.cliente_id;

-- TODOS os clientes, inclusive quem nunca comprou
SELECT c.nome, COUNT(p.id) AS qtd_pedidos
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nome;

-- Clientes que NUNCA compraram (pergunta clássica!)
SELECT c.nome
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
WHERE p.id IS NULL;

-- 3 tabelas
SELECT c.nome, pr.nome AS produto, i.quantidade
FROM itens_pedido i
JOIN pedidos p   ON p.id = i.pedido_id
JOIN clientes c  ON c.id = p.cliente_id
JOIN produtos pr ON pr.id = i.produto_id;`,
          trabalho: `Quase nenhum relatório usa só uma tabela. “Clientes que não compram há 90 dias” para uma campanha de reativação é LEFT JOIN + filtro. É <b>a</b> pergunta mais comum em testes técnicos de SQL.`,
          entrevista: {
            pergunta: "Qual a diferença entre INNER JOIN e LEFT JOIN?",
            resposta: `<b>INNER JOIN</b> retorna só as linhas que têm correspondência nas duas tabelas. <b>LEFT JOIN</b> retorna todas as linhas da tabela da esquerda e preenche com NULL quando não há correspondência na direita. Com LEFT JOIN + <code>WHERE direita.id IS NULL</code>, você encontra “quem não tem”.`
          },
          busca: ["sql joins diagrama", "left join is null", "sql join 3 tabelas"]
        },
        {
          titulo: "Subconsultas e CTE (WITH)",
          crianca: `Às vezes você precisa de uma <b>resposta para fazer outra pergunta</b>: “qual a média da turma?” e depois “quem ficou acima da média?”. A CTE (<code>WITH</code>) é escrever a primeira resposta <b>num papelzinho com nome</b> e usar depois.`,
          codigo: c`
-- Subconsulta: produtos mais caros que a média
SELECT nome, preco
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);

-- CTE: mais legível, em etapas
WITH vendas_mes AS (
  SELECT cliente_id, SUM(valor) AS total
  FROM pedidos
  WHERE data >= '2026-09-01' AND data < '2026-10-01'
  GROUP BY cliente_id
),
media AS (
  SELECT AVG(total) AS media FROM vendas_mes
)
SELECT c.nome, v.total
FROM vendas_mes v
JOIN clientes c ON c.id = v.cliente_id
CROSS JOIN media m
WHERE v.total > m.media
ORDER BY v.total DESC;

-- EXISTS: clientes que compraram o produto 10
SELECT nome FROM clientes c
WHERE EXISTS (SELECT 1 FROM pedidos p JOIN itens_pedido i ON i.pedido_id = p.id
              WHERE p.cliente_id = c.id AND i.produto_id = 10);`,
          trabalho: `Relatórios complexos ficam legíveis com CTEs: cada etapa tem nome (<code>vendas_mes</code>, <code>media</code>). Analistas de dados e engenheiros de BI escrevem CTEs o dia todo.`,
          entrevista: {
            pergunta: "Como encontrar o segundo maior salário da tabela?",
            resposta: `<code>SELECT MAX(salario) FROM funcionarios WHERE salario &lt; (SELECT MAX(salario) FROM funcionarios);</code><br>ou <code>SELECT DISTINCT salario FROM funcionarios ORDER BY salario DESC LIMIT 1 OFFSET 1;</code><br>ou com <code>DENSE_RANK()</code> (veja window functions).`
          },
          busca: ["sql cte with exemplo", "sql subquery exists", "segundo maior salario sql"]
        },
        {
          titulo: "Modelagem: chaves e normalização",
          crianca: `Para não escrever o endereço do cliente em <b>cada pedido</b> (e errar em algum), guardamos o cliente <b>uma vez</b> e no pedido só colocamos o <b>número dele</b> (chave estrangeira). Cada coisa no seu lugar, sem repetir.`,
          codigo: c`
CREATE TABLE clientes (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id  INT NOT NULL,
  valor       DECIMAL(10,2) NOT NULL CHECK (valor >= 0),
  status      VARCHAR(20) NOT NULL DEFAULT 'pendente',
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Relação N:N (pedido tem vários produtos; produto está em vários pedidos)
CREATE TABLE itens_pedido (
  pedido_id   INT,
  produto_id  INT,
  quantidade  INT NOT NULL,
  PRIMARY KEY (pedido_id, produto_id)
);`,
          trabalho: `Antes de criar um sistema novo, você desenha o <b>diagrama ER</b> (dbdiagram.io, draw.io, MySQL Workbench). Um modelo ruim gera dados duplicados e inconsistentes por anos.`,
          entrevista: {
            pergunta: "O que é normalização? Explique a 1FN, a 2FN e a 3FN.",
            resposta: `É organizar as tabelas para evitar redundância. <b>1FN</b>: valores atômicos (nada de “tel1, tel2” na mesma coluna). <b>2FN</b>: 1FN + toda coluna depende da chave <b>inteira</b> (vale para chaves compostas). <b>3FN</b>: 2FN + nenhuma coluna depende de outra coluna que não seja chave (ex.: cidade → UF vai para outra tabela). Às vezes desnormalizamos para ganhar performance em relatórios.`
          },
          busca: ["normalização banco de dados 1fn 2fn 3fn", "chave primaria estrangeira", "dbdiagram.io"]
        }
      ]
    },
    avancado: {
      objetivo: "fazer rankings e comparações com window functions, deixar consultas rápidas e garantir a integridade com transações.",
      topicos: [
        {
          titulo: "Window functions",
          crianca: `Imagine que cada aluno pode <b>espiar pela janela</b> e ver a turma toda sem sair da carteira: “qual minha posição no ranking?”, “quanto eu tirei a mais que o colega anterior?”. A linha continua lá, só ganhou uma informação extra.`,
          codigo: c`
-- Ranking de vendedores por região
SELECT regiao, vendedor, total,
       RANK()       OVER (PARTITION BY regiao ORDER BY total DESC) AS posicao,
       ROW_NUMBER() OVER (ORDER BY total DESC)                     AS geral
FROM vendas_vendedor;

-- Comparar com o mês anterior
SELECT mes, faturamento,
       LAG(faturamento) OVER (ORDER BY mes) AS mes_anterior,
       faturamento - LAG(faturamento) OVER (ORDER BY mes) AS variacao
FROM faturamento_mensal;

-- Total acumulado
SELECT data, valor,
       SUM(valor) OVER (ORDER BY data) AS acumulado
FROM pedidos;

-- Último pedido de cada cliente
WITH r AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY data DESC) AS rn
  FROM pedidos
)
SELECT * FROM r WHERE rn = 1;`,
          trabalho: `Top 3 produtos por categoria, crescimento mês a mês, saldo acumulado, remover duplicados mantendo o mais recente. Vagas de <b>analista e engenheiro de dados</b> testam isso quase sempre.`,
          entrevista: {
            pergunta: "Qual a diferença entre ROW_NUMBER, RANK e DENSE_RANK?",
            resposta: `Com empates (100, 100, 90): <b>ROW_NUMBER</b> → 1, 2, 3 (sempre único); <b>RANK</b> → 1, 1, 3 (pula posições); <b>DENSE_RANK</b> → 1, 1, 2 (não pula). Use DENSE_RANK para “o N-ésimo maior valor”.`
          },
          busca: ["sql window functions tutorial", "rank vs dense_rank vs row_number", "sql lag lead"]
        },
        {
          titulo: "Índices e plano de execução",
          crianca: `Procurar uma palavra num livro de 1.000 páginas lendo tudo demora. O <b>índice no final do livro</b> diz: “dinossauro: página 342”. Índice no banco é isso. Mas cada índice deixa o livro mais grosso e dá mais trabalho na hora de escrever.`,
          codigo: c`
-- Consulta lenta? Veja o plano:
EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 42 AND status = 'pago';

-- Índice composto: a ordem das colunas importa
CREATE INDEX idx_pedidos_cliente_status ON pedidos (cliente_id, status);

-- ❌ Funções na coluna impedem o uso do índice
SELECT * FROM pedidos WHERE YEAR(data) = 2026;
-- ✅ Use intervalo
SELECT * FROM pedidos WHERE data >= '2026-01-01' AND data < '2027-01-01';

-- ❌ Curinga no início não usa índice
SELECT * FROM clientes WHERE nome LIKE '%silva';`,
          trabalho: `“O relatório demora 2 minutos e às vezes derruba o sistema.” Você roda <code>EXPLAIN</code>, vê um <b>full table scan</b> em 10 milhões de linhas, cria o índice certo e a consulta cai para 50 ms. Isso impressiona qualquer gestor.`,
          entrevista: {
            pergunta: "Se índices aceleram consultas, por que não criar índice em todas as colunas?",
            resposta: `Cada índice ocupa <b>espaço</b> e deixa <b>INSERT, UPDATE e DELETE mais lentos</b>, porque todos os índices precisam ser atualizados. Crie índices para as colunas usadas em WHERE, JOIN e ORDER BY das consultas frequentes, e meça com EXPLAIN.`
          },
          busca: ["sql explain plano execução", "índice composto ordem colunas", "sargable query"]
        },
        {
          titulo: "Transações e ACID",
          crianca: `Transferir R$ 100 do João para a Maria tem <b>dois passos</b>: tirar do João e colocar na Maria. A transação garante que os dois acontecem <b>juntos</b> ou <b>nenhum</b> acontece. Nunca o dinheiro some no meio do caminho.`,
          codigo: c`
START TRANSACTION;

UPDATE contas SET saldo = saldo - 100 WHERE id = 1;  -- João
UPDATE contas SET saldo = saldo + 100 WHERE id = 2;  -- Maria

-- Conferiu e está tudo certo?
COMMIT;
-- Deu problema? Desfaz tudo:
-- ROLLBACK;

-- Dica de ouro para alterações manuais em produção:
START TRANSACTION;
UPDATE clientes SET uf = 'SP' WHERE cidade = 'Campinas';
SELECT ROW_COUNT();   -- quantas linhas mudou? Era o esperado?
-- COMMIT;  ou  ROLLBACK;`,
          trabalho: `Pagamentos, estoque (baixar o produto e criar o pedido juntos) e qualquer correção manual em produção. Muitos incidentes graves poderiam ter sido evitados com um simples <code>ROLLBACK</code>.`,
          entrevista: {
            pergunta: "O que significa ACID?",
            resposta: `<b>Atomicidade</b> (tudo ou nada), <b>Consistência</b> (as regras e restrições do banco são sempre respeitadas), <b>Isolamento</b> (transações simultâneas não se atrapalham, conforme o nível de isolamento) e <b>Durabilidade</b> (depois do COMMIT, o dado sobrevive a quedas de energia).`
          },
          busca: ["transações acid banco de dados", "níveis de isolamento sql", "commit rollback exemplo"]
        }
      ]
    }
  }
};
