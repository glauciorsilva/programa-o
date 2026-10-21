// Exercícios de código da trilha sql (completar e criar do zero), por tópico.
const c = String.raw;

// Verificação comum do tópico de índices: lista os índices criados pelo usuário,
// com a tabela, a posição e o nome de cada coluna e se o índice é UNIQUE.
const VERIF_INDICES = c`SELECT m.name, m.tbl_name, ii.seqno, ii.name,
       (SELECT il."unique" FROM pragma_index_list(m.tbl_name) il WHERE il.name = m.name) AS unico
FROM sqlite_master m, pragma_index_info(m.name) ii
WHERE m.type = 'index' AND m.name NOT LIKE 'sqlite_%'
ORDER BY m.name, ii.seqno`;

export default {
  /* ================= b1: SELECT, WHERE e ORDER BY ================= */
  b1: [
    {
      tipo: "completar",
      titulo: "Vitrine de eletrônicos",
      enunciado: `A loja vai montar a vitrine de <b>eletrônicos</b>. Liste <b>nome</b> e <b>preco</b> dos produtos da categoria <code>'eletronicos'</code>, do <b>mais caro para o mais barato</b>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Texto vai entre aspas simples. Para ordem decrescente, use a palavra que é o contrário de <code>ASC</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: produtos (id, nome, categoria, preco, estoque)
SELECT nome, preco
FROM produtos
WHERE categoria = ____
ORDER BY preco ____;
`,
      solucao: c`SELECT nome, preco
FROM produtos
WHERE categoria = 'eletronicos'
ORDER BY preco DESC;`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Clientes sem telefone",
      enunciado: `O call center quer saber quais clientes estão <b>sem telefone cadastrado</b> (valor nulo). Mostre <b>nome</b> e <b>cidade</b> desses clientes, em ordem alfabética pelo nome.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Comparar com <code>= NULL</code> não funciona. Existe um operador próprio para testar valores nulos.`,
      lang: "sql",
      inicial: c`-- Tabela: clientes (id, nome, email, cidade, uf, telefone, ...)
SELECT nome, cidade
FROM clientes
WHERE telefone ____
ORDER BY ____;
`,
      solucao: c`SELECT nome, cidade
FROM clientes
WHERE telefone IS NULL
ORDER BY nome;`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Presentes entre R$ 50 e R$ 100",
      enunciado: `Um cliente quer um presente que custe <b>de R$ 50 a R$ 100</b> (incluindo os limites). Liste <b>nome</b> e <b>preco</b> desses produtos, do mais barato para o mais caro, usando <code>BETWEEN</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A forma é <code>coluna BETWEEN valor1 AND valor2</code>.`,
      lang: "sql",
      inicial: c`SELECT nome, preco
FROM produtos
WHERE preco ____ 50 ____ 100
ORDER BY preco;
`,
      solucao: c`SELECT nome, preco
FROM produtos
WHERE preco BETWEEN 50 AND 100
ORDER BY preco;`,
      padroes: [[/BETWEEN/i, "Use BETWEEN para a faixa de preços."]],
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Bons clientes de Recife",
      enunciado: `A gerente da filial de <b>Recife</b> quer os clientes da cidade com <b>limite de crédito de pelo menos R$ 1.000</b> (<code>limite &gt;= 1000</code>).
        Mostre as colunas <b>nome</b> e <b>limite</b>, do <b>maior limite para o menor</b>.`,
      dica: `Junte as duas condições com <code>AND</code> no <code>WHERE</code> e ordene com <code>ORDER BY limite DESC</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: clientes (id, nome, cidade, uf, limite, ...)
-- Escreva sua consulta abaixo.
SELECT * FROM clientes LIMIT 3;
`,
      solucao: c`SELECT nome, limite
FROM clientes
WHERE cidade = 'Recife' AND limite >= 1000
ORDER BY limite DESC;`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Maiores vendas pagas de setembro",
      enunciado: `O financeiro quer conferir os pedidos de <b>setembro de 2026</b> (<code>data</code> de <code>'2026-09-01'</code> a <code>'2026-09-30'</code>) com <b>status</b> <code>'pago'</code> e <b>valor acima de R$ 100</b>.
        Mostre as colunas <b>id</b> e <b>valor</b>, do <b>maior valor para o menor</b>.`,
      dica: `São três condições no <code>WHERE</code>, ligadas por <code>AND</code>. Para a data, use <code>BETWEEN</code> ou <code>&gt;=</code> e <code>&lt;=</code>. Datas vão entre aspas simples.`,
      lang: "sql",
      inicial: c`-- Tabela: pedidos (id, cliente_id, valor, status, data, uf)
-- Escreva sua consulta abaixo.
SELECT * FROM pedidos LIMIT 3;
`,
      solucao: c`SELECT id, valor
FROM pedidos
WHERE data BETWEEN '2026-09-01' AND '2026-09-30'
  AND status = 'pago'
  AND valor > 100
ORDER BY valor DESC;`,
      ordem: true
    }
  ],

  /* ================= b2: INSERT, UPDATE e DELETE ================= */
  b2: [
    {
      tipo: "completar",
      titulo: "Cadastrando produtos novos",
      enunciado: `Chegaram dois produtos de papelaria. Cadastre os dois com <b>um único INSERT</b>:
        <ul>
          <li>id <code>11</code>, <code>'Agenda 2027'</code>, categoria <code>'papelaria'</code>, preço <code>34.90</code>, estoque <code>50</code>;</li>
          <li>id <code>12</code>, <code>'Caneta Gel'</code>, categoria <code>'papelaria'</code>, preço <code>6.50</code>, estoque <code>300</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta. A verificação confere a tabela <code>produtos</code> inteira.`,
      dica: `A forma é <code>INSERT INTO tabela (colunas) VALUES (...), (...);</code>`,
      lang: "sql",
      inicial: c`INSERT ____ produtos (id, nome, categoria, preco, estoque)
____
  (11, 'Agenda 2027', 'papelaria', 34.90, 50),
  (12, 'Caneta Gel', 'papelaria', 6.50, 300);

SELECT * FROM produtos;
`,
      solucao: c`INSERT INTO produtos (id, nome, categoria, preco, estoque)
VALUES
  (11, 'Agenda 2027', 'papelaria', 34.90, 50),
  (12, 'Caneta Gel', 'papelaria', 6.50, 300);

SELECT * FROM produtos;`,
      verificacao: c`SELECT * FROM produtos ORDER BY id`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Novo preço da garrafa térmica",
      enunciado: `O fornecedor baixou o preço e a <b>Garrafa Térmica</b> (id <code>9</code>) vai passar a custar <b>R$ 44,90</b>. Atualize <b>só</b> esse produto.
        Substitua cada <code>____</code> pelo que falta. A verificação confere todos os preços.`,
      dica: `<code>UPDATE tabela SET coluna = valor WHERE condição;</code> Sem o <code>WHERE</code>, todos os produtos mudariam de preço!`,
      lang: "sql",
      inicial: c`____ produtos
____ preco = 44.90
____ id = 9;

SELECT id, nome, preco FROM produtos;
`,
      solucao: c`UPDATE produtos
SET preco = 44.90
WHERE id = 9;

SELECT id, nome, preco FROM produtos;`,
      verificacao: c`SELECT id, preco FROM produtos ORDER BY id`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Limpando sessões expiradas",
      enunciado: `O sistema de login acumula sessões vencidas. Apague da tabela <code>sessoes</code> as que expiraram <b>antes de</b> <code>'2026-10-20'</code> (coluna <code>expira_em</code>).
        Substitua cada <code>____</code> pelo que falta. A verificação confere quais sessões sobraram.`,
      dica: `<code>DELETE FROM tabela WHERE condição;</code> Rode antes um <code>SELECT</code> com o mesmo <code>WHERE</code> para ver o que vai sumir.`,
      lang: "sql",
      inicial: c`-- Confira antes o que será apagado:
SELECT * FROM sessoes WHERE expira_em < '2026-10-20';

DELETE ____ sessoes
____ expira_em < '2026-10-20';

SELECT * FROM sessoes;
`,
      solucao: c`SELECT * FROM sessoes WHERE expira_em < '2026-10-20';

DELETE FROM sessoes
WHERE expira_em < '2026-10-20';

SELECT * FROM sessoes;`,
      verificacao: c`SELECT id, usuario FROM sessoes ORDER BY id`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Reajuste da linha casa",
      enunciado: `A diretoria aprovou um reajuste de <b>10%</b> nos produtos da categoria <code>'casa'</code>. Escreva o <code>UPDATE</code> que multiplica o <code>preco</code> desses produtos por <code>1.1</code>. Os outros produtos <b>não</b> podem mudar.
        A verificação confere o preço de todos os produtos.`,
      dica: `Dá para usar a própria coluna no cálculo: <code>SET preco = preco * 1.1</code>. Não esqueça o <code>WHERE</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: produtos (id, nome, categoria, preco, estoque)
-- Escreva o UPDATE abaixo (confira antes com um SELECT).
SELECT * FROM produtos LIMIT 3;
`,
      solucao: c`SELECT * FROM produtos WHERE categoria = 'casa';

UPDATE produtos
SET preco = preco * 1.1
WHERE categoria = 'casa';`,
      verificacao: c`SELECT id, preco FROM produtos ORDER BY id`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Cancelamento e correção de cadastro",
      enunciado: `Duas tarefas do suporte na tabela <code>clientes</code>:
        <ol>
          <li>O cliente <b>Hugo Melo</b> (id <code>8</code>) pediu para encerrar a conta. Faça a <b>exclusão lógica</b>: mude <code>ativo</code> para <code>0</code> (não use DELETE).</li>
          <li>O e-mail da <b>Carla Dias</b> (id <code>3</code>) foi digitado errado. Troque para <code>'carla.dias@email.com'</code>.</li>
        </ol>
        A verificação confere <code>id</code>, <code>email</code> e <code>ativo</code> de todos os clientes.`,
      dica: `São dois <code>UPDATE</code>, cada um com o seu <code>WHERE id = ...</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: clientes (id, nome, email, ativo, ...)
-- Escreva os dois comandos abaixo.
SELECT id, nome, email, ativo FROM clientes LIMIT 3;
`,
      solucao: c`UPDATE clientes SET ativo = 0 WHERE id = 8;
UPDATE clientes SET email = 'carla.dias@email.com' WHERE id = 3;`,
      padroes: [[/UPDATE/i, "Use UPDATE (exclusão lógica, sem DELETE)."]],
      verificacao: c`SELECT id, email, ativo FROM clientes ORDER BY id`,
      ordem: true
    }
  ],

  /* ================= b3: Agregações ================= */
  b3: [
    {
      tipo: "completar",
      titulo: "Resumo dos pedidos pagos",
      enunciado: `O dono da loja quer dois números dos pedidos com status <code>'pago'</code>: a <b>quantidade de pedidos</b> e o <b>faturamento total</b> (soma de <code>valor</code>).
        Substitua cada <code>____</code> pela função de agregação certa.`,
      dica: `Uma função conta linhas, a outra soma valores.`,
      lang: "sql",
      inicial: c`SELECT ____(*) AS qtd_pedidos,
       ____(valor) AS faturamento
FROM pedidos
WHERE status = 'pago';
`,
      solucao: c`SELECT COUNT(*) AS qtd_pedidos,
       SUM(valor) AS faturamento
FROM pedidos
WHERE status = 'pago';`
    },
    {
      tipo: "completar",
      titulo: "Preço médio por categoria",
      enunciado: `Para a reunião de compras, mostre <b>para cada categoria</b>: a <b>categoria</b>, a <b>quantidade de produtos</b> e o <b>preço médio</b>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A média é <code>AVG</code>. Para fazer “um montinho por categoria”, use <code>GROUP BY</code>.`,
      lang: "sql",
      inicial: c`SELECT categoria,
       COUNT(*) AS qtd,
       ____(preco) AS preco_medio
FROM produtos
____ categoria;
`,
      solucao: c`SELECT categoria,
       COUNT(*) AS qtd,
       AVG(preco) AS preco_medio
FROM produtos
GROUP BY categoria;`
    },
    {
      tipo: "completar",
      titulo: "Estados que passaram da meta",
      enunciado: `A meta de cada estado era faturar <b>mais de R$ 2.000</b> em pedidos pagos. Mostre <b>uf</b> e <b>total</b> só dos estados que bateram a meta, do maior total para o menor.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>WHERE</code> filtra linhas antes de agrupar; para filtrar <b>grupos</b> pela soma, existe outra cláusula, que vem depois do <code>GROUP BY</code>.`,
      lang: "sql",
      inicial: c`SELECT uf, SUM(valor) AS total
FROM pedidos
WHERE status = 'pago'
GROUP BY ____
____ SUM(valor) > 2000
ORDER BY total DESC;
`,
      solucao: c`SELECT uf, SUM(valor) AS total
FROM pedidos
WHERE status = 'pago'
GROUP BY uf
HAVING SUM(valor) > 2000
ORDER BY total DESC;`,
      padroes: [[/HAVING/i, "Filtre os grupos com HAVING."]],
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Folha de pagamento por departamento",
      enunciado: `O RH precisa de um resumo da tabela <code>funcionarios</code>: para cada <b>departamento</b>, mostre o <b>departamento</b>, a <b>quantidade de funcionários</b> e o <b>salário médio</b>, do maior salário médio para o menor.`,
      dica: `<code>COUNT(*)</code> e <code>AVG(salario)</code> com <code>GROUP BY departamento</code>. Dá para ordenar pelo apelido da coluna.`,
      lang: "sql",
      inicial: c`-- Tabela: funcionarios (id, nome, cargo, departamento, salario)
-- Escreva sua consulta abaixo.
SELECT * FROM funcionarios LIMIT 3;
`,
      solucao: c`SELECT departamento,
       COUNT(*) AS qtd,
       AVG(salario) AS salario_medio
FROM funcionarios
GROUP BY departamento
ORDER BY salario_medio DESC;`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Clientes que mais gastaram",
      enunciado: `Para um programa de fidelidade, liste os clientes que somam <b>pelo menos R$ 1.000</b> em pedidos <b>pagos</b>. Mostre as colunas <b>cliente_id</b>, <b>quantidade de pedidos pagos</b> e <b>total gasto</b>, do maior total para o menor.
        Use só a tabela <code>pedidos</code>.`,
      dica: `Filtre <code>status = 'pago'</code> no <code>WHERE</code>, agrupe por <code>cliente_id</code> e use <code>HAVING SUM(valor) &gt;= 1000</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: pedidos (id, cliente_id, valor, status, data, uf)
-- Escreva sua consulta abaixo.
SELECT * FROM pedidos LIMIT 3;
`,
      solucao: c`SELECT cliente_id,
       COUNT(*) AS qtd,
       SUM(valor) AS total
FROM pedidos
WHERE status = 'pago'
GROUP BY cliente_id
HAVING SUM(valor) >= 1000
ORDER BY total DESC;`,
      ordem: true
    }
  ],

  /* ================= i1: JOINs ================= */
  i1: [
    {
      tipo: "completar",
      titulo: "Pedidos pendentes com o nome do cliente",
      enunciado: `O financeiro vai ligar para quem tem pedido <b>pendente</b>. Mostre <b>id do pedido</b>, <b>nome do cliente</b> e <b>valor</b> dos pedidos com status <code>'pendente'</code>, ordenados pelo id do pedido.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Queremos só os pedidos que têm cliente correspondente: <code>INNER JOIN ... ON ...</code>.`,
      lang: "sql",
      inicial: c`SELECT p.id, c.nome, p.valor
FROM pedidos p
____ JOIN clientes c ____ c.id = p.cliente_id
WHERE p.status = 'pendente'
ORDER BY p.id;
`,
      solucao: c`SELECT p.id, c.nome, p.valor
FROM pedidos p
INNER JOIN clientes c ON c.id = p.cliente_id
WHERE p.status = 'pendente'
ORDER BY p.id;`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Quantos pedidos cada cliente fez",
      enunciado: `Mostre <b>todos</b> os clientes, inclusive os que nunca compraram, com o <b>nome</b> e a <b>quantidade de pedidos</b> (zero para quem não tem pedido).
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Para manter todos os clientes, use o JOIN “da esquerda”. E conte uma coluna de <code>pedidos</code>: <code>COUNT(*)</code> contaria 1 para quem não tem pedido.`,
      lang: "sql",
      inicial: c`SELECT c.nome, COUNT(____) AS qtd_pedidos
FROM clientes c
____ JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nome;
`,
      solucao: c`SELECT c.nome, COUNT(p.id) AS qtd_pedidos
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nome;`
    },
    {
      tipo: "completar",
      titulo: "Itens do pedido 9",
      enunciado: `A cliente do pedido <b>9</b> pediu a nota detalhada. Mostre o <b>nome do produto</b>, a <b>quantidade</b> e o <b>subtotal</b> (preço × quantidade) de cada item desse pedido.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A tabela <code>itens_pedido</code> liga pedido e produto: a coluna dela que aponta para <code>produtos.id</code> é <code>produto_id</code>.`,
      lang: "sql",
      inicial: c`-- itens_pedido (pedido_id, produto_id, quantidade) / produtos (id, nome, preco, ...)
SELECT pr.nome, i.quantidade, pr.preco * i.quantidade AS subtotal
FROM itens_pedido i
JOIN produtos pr ON pr.id = ____
WHERE i.____ = 9;
`,
      solucao: c`SELECT pr.nome, i.quantidade, pr.preco * i.quantidade AS subtotal
FROM itens_pedido i
JOIN produtos pr ON pr.id = i.produto_id
WHERE i.pedido_id = 9;`
    },
    {
      tipo: "criar",
      titulo: "Produtos encalhados",
      enunciado: `O estoque quer saber quais produtos <b>nunca apareceram em nenhum pedido</b> (não estão na tabela <code>itens_pedido</code>). Mostre <b>nome</b> e <b>estoque</b> desses produtos. Use um <code>LEFT JOIN</code>.`,
      dica: `<code>produtos LEFT JOIN itens_pedido</code> e depois fique só com as linhas em que o lado de <code>itens_pedido</code> veio <code>NULL</code>.`,
      lang: "sql",
      inicial: c`-- Tabelas: produtos (id, nome, categoria, preco, estoque)
--          itens_pedido (pedido_id, produto_id, quantidade)
-- Escreva sua consulta abaixo.
SELECT * FROM produtos LIMIT 3;
`,
      solucao: c`SELECT pr.nome, pr.estoque
FROM produtos pr
LEFT JOIN itens_pedido i ON i.produto_id = pr.id
WHERE i.produto_id IS NULL;`,
      padroes: [[/LEFT\s+(OUTER\s+)?JOIN/i, "Use LEFT JOIN para achar os produtos sem itens."]]
    },
    {
      tipo: "criar",
      titulo: "Unidades vendidas por categoria",
      enunciado: `O time de compras quer saber quantas <b>unidades</b> de cada <b>categoria</b> foram vendidas em pedidos <b>pagos</b>.
        Mostre <b>categoria</b> e <b>unidades</b> (soma de <code>quantidade</code>), da que mais vendeu para a que menos vendeu (em caso de empate, por categoria em ordem alfabética).
        Você vai precisar de três tabelas: <code>itens_pedido</code>, <code>pedidos</code> e <code>produtos</code>.`,
      dica: `Ligue <code>itens_pedido</code> a <code>pedidos</code> (pelo <code>pedido_id</code>) e a <code>produtos</code> (pelo <code>produto_id</code>), filtre <code>status = 'pago'</code> e agrupe por categoria.`,
      lang: "sql",
      inicial: c`-- Tabelas: itens_pedido (pedido_id, produto_id, quantidade)
--          pedidos (id, cliente_id, valor, status, data, uf)
--          produtos (id, nome, categoria, preco, estoque)
-- Escreva sua consulta abaixo.
SELECT * FROM itens_pedido LIMIT 3;
`,
      solucao: c`SELECT pr.categoria, SUM(i.quantidade) AS unidades
FROM itens_pedido i
JOIN pedidos p   ON p.id = i.pedido_id
JOIN produtos pr ON pr.id = i.produto_id
WHERE p.status = 'pago'
GROUP BY pr.categoria
ORDER BY unidades DESC, pr.categoria;`,
      ordem: true
    }
  ],

  /* ================= i2: Subconsultas e CTE ================= */
  i2: [
    {
      tipo: "completar",
      titulo: "Produtos acima da média",
      enunciado: `Liste <b>nome</b> e <b>preco</b> dos produtos que custam <b>mais que o preço médio</b> de todos os produtos, do mais caro para o mais barato.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A subconsulta entre parênteses calcula a média de <code>preco</code>.`,
      lang: "sql",
      inicial: c`SELECT nome, preco
FROM produtos
WHERE preco > (SELECT ____(preco) FROM ____)
ORDER BY preco DESC;
`,
      solucao: c`SELECT nome, preco
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos)
ORDER BY preco DESC;`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "CTE dos clientes VIP",
      enunciado: `Primeiro calcule o total gasto em pedidos pagos por cliente numa CTE chamada <code>gasto</code>; depois mostre <b>nome</b> e <b>total</b> dos clientes com total <b>acima de R$ 2.000</b>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A CTE começa com a palavra que significa “com”, e depois é usada no <code>FROM</code> pelo nome que você deu a ela.`,
      lang: "sql",
      inicial: c`____ gasto AS (
  SELECT cliente_id, SUM(valor) AS total
  FROM pedidos
  WHERE status = 'pago'
  GROUP BY cliente_id
)
SELECT c.nome, g.total
FROM ____ g
JOIN clientes c ON c.id = g.cliente_id
WHERE g.total > 2000;
`,
      solucao: c`WITH gasto AS (
  SELECT cliente_id, SUM(valor) AS total
  FROM pedidos
  WHERE status = 'pago'
  GROUP BY cliente_id
)
SELECT c.nome, g.total
FROM gasto g
JOIN clientes c ON c.id = g.cliente_id
WHERE g.total > 2000;`
    },
    {
      tipo: "completar",
      titulo: "Quem comprou o teclado mecânico",
      enunciado: `O fabricante do <b>Teclado Mecânico</b> (produto id <code>8</code>) anunciou um recall. Liste o <b>nome</b> de cada cliente que comprou esse produto em algum pedido, usando <code>EXISTS</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>EXISTS (subconsulta)</code> é verdadeiro quando a subconsulta devolve pelo menos uma linha. A subconsulta precisa “olhar” para o cliente da consulta de fora: <code>p.cliente_id = c.id</code>.`,
      lang: "sql",
      inicial: c`SELECT c.nome
FROM clientes c
WHERE ____ (
  SELECT 1
  FROM pedidos p
  JOIN itens_pedido i ON i.pedido_id = p.id
  WHERE p.cliente_id = ____ AND i.produto_id = 8
);
`,
      solucao: c`SELECT c.nome
FROM clientes c
WHERE EXISTS (
  SELECT 1
  FROM pedidos p
  JOIN itens_pedido i ON i.pedido_id = p.id
  WHERE p.cliente_id = c.id AND i.produto_id = 8
);`
    },
    {
      tipo: "criar",
      titulo: "Segundo maior salário do TI",
      enunciado: `Pergunta clássica de entrevista: qual é o <b>segundo maior salário</b> do departamento <code>'TI'</code> na tabela <code>funcionarios</code>? Retorne <b>uma linha e uma coluna</b> com esse valor.
        Atenção: queremos o segundo maior valor <b>distinto</b>. Se duas pessoas empatam no maior salário, o segundo é o próximo valor abaixo delas.`,
      dica: `Uma ideia: o <code>MAX(salario)</code> do TI entre os salários <b>menores</b> que o maior salário do TI, calculado numa subconsulta. Cuidado: <code>LIMIT 1 OFFSET 1</code> sem <code>DISTINCT</code> cai no empate.`,
      lang: "sql",
      inicial: c`-- Tabela: funcionarios (id, nome, cargo, departamento, salario)
-- Escreva sua consulta abaixo.
SELECT MAX(salario) FROM funcionarios WHERE departamento = 'TI';
`,
      solucao: c`SELECT MAX(salario) AS segundo_maior
FROM funcionarios
WHERE departamento = 'TI'
  AND salario < (SELECT MAX(salario) FROM funcionarios WHERE departamento = 'TI');`
    },
    {
      tipo: "criar",
      titulo: "Acima da média da categoria",
      enunciado: `O time de compras quer saber quais produtos custam <b>mais que a média da própria categoria</b> (não a média geral da loja). Use uma <b>CTE</b> (<code>WITH</code>) que calcule o preço médio por categoria e depois junte com <code>produtos</code>.
        Mostre <b>nome</b>, <b>categoria</b> e <b>preco</b>.`,
      dica: `<code>WITH medias AS (SELECT categoria, AVG(preco) AS media FROM produtos GROUP BY categoria)</code> e depois um <code>JOIN</code> pela categoria, comparando <code>preco &gt; media</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: produtos (id, nome, categoria, preco, estoque)
-- Escreva sua consulta (com WITH) abaixo.
SELECT * FROM produtos LIMIT 3;
`,
      solucao: c`WITH medias AS (
  SELECT categoria, AVG(preco) AS media
  FROM produtos
  GROUP BY categoria
)
SELECT p.nome, p.categoria, p.preco
FROM produtos p
JOIN medias m ON m.categoria = p.categoria
WHERE p.preco > m.media;`,
      padroes: [[/\bWITH\b/i, "Use uma CTE: comece com WITH nome AS (...)."]]
    }
  ],

  /* ================= i3: Modelagem ================= */
  i3: [
    {
      tipo: "completar",
      titulo: "Tabela de categorias",
      enunciado: `Num banco <b>vazio</b>, crie a tabela <code>categorias</code>: <code>id</code> é a <b>chave primária</b> e <code>nome</code> é obrigatório e <b>não pode se repetir</b>.
        Substitua cada <code>____</code> pelo que falta. A verificação confere a estrutura da tabela.`,
      dica: `Chave primária: <code>PRIMARY KEY</code>. Valor sem repetição: <code>UNIQUE</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE categorias (
  id   INTEGER ____,
  nome TEXT NOT NULL ____
);

DESCRIBE categorias;
`,
      solucao: c`CREATE TABLE categorias (
  id   INTEGER PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE
);

DESCRIBE categorias;`,
      verificacao: c`SELECT t.name, CASE WHEN t.pk > 0 THEN NULL ELSE t."notnull" END AS obrigatorio, t.pk,
       EXISTS (SELECT 1 FROM pragma_index_list('categorias') il, pragma_index_info(il.name) ii
               WHERE il."unique" = 1 AND il.origin = 'u' AND ii.name = t.name) AS unico
FROM pragma_table_info('categorias') t
ORDER BY t.name`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Pedido aponta para o cliente",
      enunciado: `Em vez de repetir os dados do cliente em cada pedido, o pedido guarda só o <code>cliente_id</code>. Complete a tabela <code>pedidos_loja</code> com a <b>chave estrangeira</b> que liga <code>cliente_id</code> a <code>clientes_loja(id)</code>.
        Substitua cada <code>____</code> pelo que falta. A verificação confere as chaves estrangeiras.`,
      dica: `<code>FOREIGN KEY (coluna) REFERENCES outra_tabela(coluna)</code>`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE clientes_loja (
  id   INTEGER PRIMARY KEY,
  nome TEXT NOT NULL
);

CREATE TABLE pedidos_loja (
  id         INTEGER PRIMARY KEY,
  cliente_id INT NOT NULL,
  valor      DECIMAL(10,2) NOT NULL,
  ____ (cliente_id) ____ clientes_loja(id)
);
`,
      solucao: c`CREATE TABLE clientes_loja (
  id   INTEGER PRIMARY KEY,
  nome TEXT NOT NULL
);

CREATE TABLE pedidos_loja (
  id         INTEGER PRIMARY KEY,
  cliente_id INT NOT NULL,
  valor      DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes_loja(id)
);`,
      verificacao: c`SELECT "table", "from", "to" FROM pragma_foreign_key_list('pedidos_loja')`
    },
    {
      tipo: "completar",
      titulo: "Matrículas da escola (N:N)",
      enunciado: `Um aluno faz vários cursos e um curso tem vários alunos. A tabela <code>matriculas</code> resolve essa relação N:N. Complete a <b>chave primária composta</b> pelas colunas <code>aluno_id</code> e <code>curso_id</code> (nessa ordem), para que o mesmo aluno não seja matriculado duas vezes no mesmo curso.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A chave composta é declarada no final: <code>PRIMARY KEY (coluna1, coluna2)</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`CREATE TABLE matriculas (
  aluno_id INT NOT NULL,
  curso_id INT NOT NULL,
  data     DATE,
  ____ (____, ____)
);
`,
      solucao: c`CREATE TABLE matriculas (
  aluno_id INT NOT NULL,
  curso_id INT NOT NULL,
  data     DATE,
  PRIMARY KEY (aluno_id, curso_id)
);`,
      verificacao: c`SELECT name, pk FROM pragma_table_info('matriculas') ORDER BY name`
    },
    {
      tipo: "criar",
      titulo: "Cadastro de pacientes da clínica",
      enunciado: `A clínica vai informatizar a recepção. Num banco <b>vazio</b>, crie a tabela <code>pacientes</code> com as colunas:
        <ul>
          <li><code>id</code>: inteiro, <b>chave primária</b>;</li>
          <li><code>nome</code>: texto, <b>obrigatório</b>;</li>
          <li><code>cpf</code>: texto, <b>obrigatório</b> e <b>único</b> (dois pacientes não podem ter o mesmo CPF);</li>
          <li><code>nascimento</code>: data, opcional.</li>
        </ul>
        A verificação confere as colunas, a chave, o que é obrigatório e o que é único.`,
      dica: `Obrigatório é <code>NOT NULL</code>; único é <code>UNIQUE</code>. Pode juntar os dois na mesma coluna.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- Banco vazio: crie a tabela pacientes aqui.
-- Depois confira com: DESCRIBE pacientes;
`,
      solucao: c`CREATE TABLE pacientes (
  id         INTEGER PRIMARY KEY,
  nome       TEXT NOT NULL,
  cpf        TEXT NOT NULL UNIQUE,
  nascimento DATE
);

DESCRIBE pacientes;`,
      verificacao: c`SELECT t.name, CASE WHEN t.pk > 0 THEN NULL ELSE t."notnull" END AS obrigatorio, t.pk,
       EXISTS (SELECT 1 FROM pragma_index_list('pacientes') il, pragma_index_info(il.name) ii
               WHERE il."unique" = 1 AND il.origin = 'u' AND ii.name = t.name) AS unico
FROM pragma_table_info('pacientes') t
ORDER BY t.name`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Médicos e consultas",
      enunciado: `Antes, a clínica anotava o nome e a especialidade do médico em <b>cada consulta</b> (e às vezes errava). Normalize: num banco <b>vazio</b>, crie duas tabelas:
        <ul>
          <li><code>medicos</code>: <code>id</code> (chave primária), <code>nome</code> (texto, obrigatório), <code>especialidade</code> (texto);</li>
          <li><code>consultas</code>: <code>id</code> (chave primária), <code>medico_id</code> (inteiro, obrigatório, <b>chave estrangeira</b> para <code>medicos(id)</code>), <code>paciente</code> (texto, obrigatório), <code>data</code> (data e hora, obrigatória).</li>
        </ul>
        <b>Não insira dados</b>: a verificação vai inserir um médico e uma consulta de teste e conferir a chave estrangeira.`,
      dica: `Crie primeiro <code>medicos</code> (a tabela referenciada) e depois <code>consultas</code>, terminando com <code>FOREIGN KEY (medico_id) REFERENCES medicos(id)</code>.`,
      lang: "sql",
      db: "vazio",
      inicial: c`-- Banco vazio: crie as tabelas medicos e consultas aqui.
`,
      solucao: c`CREATE TABLE medicos (
  id            INTEGER PRIMARY KEY,
  nome          TEXT NOT NULL,
  especialidade TEXT
);

CREATE TABLE consultas (
  id        INTEGER PRIMARY KEY,
  medico_id INT NOT NULL,
  paciente  TEXT NOT NULL,
  data      DATETIME NOT NULL,
  FOREIGN KEY (medico_id) REFERENCES medicos(id)
);`,
      verificacao: c`INSERT INTO medicos (id, nome, especialidade) VALUES (1, 'Dra. Lia', 'Pediatria');
INSERT INTO consultas (id, medico_id, paciente, data) VALUES (1, 1, 'Caio', '2026-10-21 09:00:00');
SELECT m.nome, m.especialidade, c.paciente, c.data,
       (SELECT COUNT(*) FROM pragma_foreign_key_list('consultas') WHERE "table" = 'medicos' AND "from" = 'medico_id') AS fk,
       (SELECT COUNT(*) FROM pragma_table_info('consultas') WHERE "notnull" = 1 AND name IN ('medico_id', 'paciente', 'data')) AS obrigatorias
FROM consultas c
JOIN medicos m ON m.id = c.medico_id`
    }
  ],

  /* ================= a1: Window functions ================= */
  a1: [
    {
      tipo: "completar",
      titulo: "Ranking de vendedores por região",
      enunciado: `Mostre <b>regiao</b>, <b>vendedor</b>, <b>total</b> e a <b>posição</b> de cada vendedor <b>dentro da sua região</b> (maior total = 1), usando <code>RANK()</code>. Empates ficam com a mesma posição.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>RANK() OVER (PARTITION BY ... ORDER BY ... DESC)</code>: o <code>PARTITION BY</code> separa as “turmas”.`,
      lang: "sql",
      inicial: c`SELECT regiao, vendedor, total,
       ____() OVER (____ regiao ORDER BY total DESC) AS posicao
FROM vendas_vendedor;
`,
      solucao: c`SELECT regiao, vendedor, total,
       RANK() OVER (PARTITION BY regiao ORDER BY total DESC) AS posicao
FROM vendas_vendedor;`
    },
    {
      tipo: "completar",
      titulo: "Faturamento contra o mês anterior",
      enunciado: `Na tabela <code>faturamento_mensal</code>, mostre <b>mes</b>, <b>faturamento</b>, o faturamento do <b>mês anterior</b> e a <b>variação</b> (atual − anterior), em ordem de mês.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>LAG(coluna)</code> pega o valor da linha anterior, na ordem definida dentro do <code>OVER (...)</code>.`,
      lang: "sql",
      inicial: c`SELECT mes, faturamento,
       ____(faturamento) OVER (ORDER BY mes) AS mes_anterior,
       faturamento - LAG(faturamento) ____ (ORDER BY mes) AS variacao
FROM faturamento_mensal
ORDER BY mes;
`,
      solucao: c`SELECT mes, faturamento,
       LAG(faturamento) OVER (ORDER BY mes) AS mes_anterior,
       faturamento - LAG(faturamento) OVER (ORDER BY mes) AS variacao
FROM faturamento_mensal
ORDER BY mes;`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Caixa acumulado de setembro",
      enunciado: `O financeiro quer ver o <b>acumulado</b> do caixa em setembro de 2026: para cada pedido <b>pago</b> do mês, mostre <b>data</b>, <b>valor</b> e o <b>total acumulado</b> até aquela data, em ordem de data.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `<code>SUM(valor) OVER (ORDER BY data)</code> soma da primeira linha até a linha atual.`,
      lang: "sql",
      inicial: c`SELECT data, valor,
       ____(valor) ____ (ORDER BY data) AS acumulado
FROM pedidos
WHERE status = 'pago' AND data BETWEEN '2026-09-01' AND '2026-09-30'
ORDER BY data;
`,
      solucao: c`SELECT data, valor,
       SUM(valor) OVER (ORDER BY data) AS acumulado
FROM pedidos
WHERE status = 'pago' AND data BETWEEN '2026-09-01' AND '2026-09-30'
ORDER BY data;`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Faixas salariais sem pular posição",
      enunciado: `O RH quer numerar as <b>faixas salariais</b>: o maior salário é a faixa 1, o próximo valor diferente é a faixa 2, e assim por diante. Quem ganha igual fica na mesma faixa e <b>nenhuma faixa é pulada</b>.
        Mostre <b>nome</b>, <b>salario</b> e <b>faixa</b> de todos os funcionários, ordenados pela faixa e depois pelo nome.`,
      dica: `<code>RANK</code> pula posições depois de um empate; existe uma variação “densa” que não pula.`,
      lang: "sql",
      inicial: c`-- Tabela: funcionarios (id, nome, cargo, departamento, salario)
-- Escreva sua consulta abaixo.
SELECT nome, salario FROM funcionarios ORDER BY salario DESC;
`,
      solucao: c`SELECT nome, salario,
       DENSE_RANK() OVER (ORDER BY salario DESC) AS faixa
FROM funcionarios
ORDER BY faixa, nome;`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Último pedido de cada cliente",
      enunciado: `Para a campanha de reativação, mostre o <b>pedido mais recente de cada cliente</b>: colunas <b>cliente_id</b>, <b>id</b> do pedido, <b>data</b> e <b>valor</b> (considere todos os status).
        Use <code>ROW_NUMBER()</code> numa CTE e filtre a primeira linha de cada cliente.`,
      dica: `<code>ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY data DESC) AS rn</code> dentro de um <code>WITH</code>, e depois <code>WHERE rn = 1</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: pedidos (id, cliente_id, valor, status, data, uf)
-- Escreva sua consulta abaixo.
SELECT * FROM pedidos ORDER BY cliente_id, data DESC;
`,
      solucao: c`WITH r AS (
  SELECT cliente_id, id, data, valor,
         ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY data DESC) AS rn
  FROM pedidos
)
SELECT cliente_id, id, data, valor
FROM r
WHERE rn = 1;`,
      padroes: [[/ROW_NUMBER\s*\(\s*\)\s*OVER/i, "Use ROW_NUMBER() OVER (...) para numerar os pedidos de cada cliente."]]
    }
  ],

  /* ================= a2: Índices e plano de execução ================= */
  a2: [
    {
      tipo: "completar",
      titulo: "Índice para o filtro de status",
      enunciado: `O painel do financeiro filtra pedidos por <code>status</code> o dia todo. Crie o índice <code>idx_pedidos_status</code> na coluna <code>status</code> da tabela <code>pedidos</code>.
        Substitua cada <code>____</code> pelo que falta. A verificação confere os índices do banco.`,
      dica: `<code>CREATE INDEX nome_do_indice ON tabela (coluna);</code>`,
      lang: "sql",
      inicial: c`CREATE ____ idx_pedidos_status ____ pedidos (status);

EXPLAIN SELECT * FROM pedidos WHERE status = 'pago';
`,
      solucao: c`CREATE INDEX idx_pedidos_status ON pedidos (status);

EXPLAIN SELECT * FROM pedidos WHERE status = 'pago';`,
      verificacao: VERIF_INDICES,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Índice composto do histórico",
      enunciado: `A tela “Meus pedidos” <b>sempre</b> filtra por <code>cliente_id</code> e, às vezes, também por <code>status</code>. Crie o índice composto <code>idx_pedidos_cliente_status</code> com as colunas na ordem certa para servir aos dois casos.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Num índice composto, a coluna que aparece em <b>todas</b> as consultas vem primeiro.`,
      lang: "sql",
      inicial: c`CREATE INDEX idx_pedidos_cliente_status ON pedidos (____, ____);

EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 4;
EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 4 AND status = 'pago';
`,
      solucao: c`CREATE INDEX idx_pedidos_cliente_status ON pedidos (cliente_id, status);

EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 4;
EXPLAIN SELECT * FROM pedidos WHERE cliente_id = 4 AND status = 'pago';`,
      verificacao: VERIF_INDICES,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Filtro de data que usa o índice",
      enunciado: `A consulta antiga usava <code>strftime('%Y-%m', data) = '2026-08'</code>: a função na coluna impede o uso do índice. Reescreva o filtro como <b>intervalo</b> para pegar os pedidos de <b>agosto de 2026</b>: a partir do dia 1º de agosto (inclusive) e antes do dia 1º de setembro.
        Mostre <b>id</b> e <b>valor</b>. Substitua cada <code>____</code> por uma data no formato <code>AAAA-MM-DD</code>.`,
      dica: `Com <code>&gt;=</code> no início e <code>&lt;</code> no fim, o fim do intervalo é o primeiro dia do mês seguinte.`,
      lang: "sql",
      inicial: c`CREATE INDEX idx_pedidos_data ON pedidos (data);

-- Antes (não usa o índice):
-- SELECT id, valor FROM pedidos WHERE strftime('%Y-%m', data) = '2026-08';

SELECT id, valor
FROM pedidos
WHERE data >= '____' AND data < '____';
`,
      solucao: c`CREATE INDEX idx_pedidos_data ON pedidos (data);

SELECT id, valor
FROM pedidos
WHERE data >= '2026-08-01' AND data < '2026-09-01';`,
      padroes: [[/data\s*>=?\s*'/i, "Filtre a coluna data diretamente (data >= '...'), sem função em volta dela."]]
    },
    {
      tipo: "criar",
      titulo: "E-mail único no cadastro",
      enunciado: `O login é feito pelo e-mail, então a busca precisa ser rápida e <b>não pode haver dois clientes com o mesmo e-mail</b>. Crie o índice <b>único</b> <code>idx_clientes_email</code> na coluna <code>email</code> da tabela <code>clientes</code>.
        A verificação confere o nome, a tabela, a coluna e se o índice é único.`,
      dica: `Existe a variação <code>CREATE UNIQUE INDEX ...</code>.`,
      lang: "sql",
      inicial: c`-- Tabela: clientes (id, nome, email, ...)
-- Crie o índice abaixo e confira o plano com EXPLAIN.
SELECT id, nome FROM clientes WHERE email = 'ana@email.com';
`,
      solucao: c`CREATE UNIQUE INDEX idx_clientes_email ON clientes (email);

EXPLAIN SELECT id, nome FROM clientes WHERE email = 'ana@email.com';`,
      verificacao: VERIF_INDICES,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Acelerando o relatório por categoria",
      enunciado: `Este relatório ficou lento quando a loja cresceu:
        <pre>SELECT pr.nome, SUM(i.quantidade)
FROM produtos pr
JOIN itens_pedido i ON i.produto_id = pr.id
WHERE pr.categoria = 'eletronicos'
GROUP BY pr.nome;</pre>
        A chave primária de <code>itens_pedido</code> começa por <code>pedido_id</code>, então não ajuda no JOIN por <code>produto_id</code>. Crie <b>dois índices</b>:
        <ul>
          <li><code>idx_itens_produto</code> em <code>itens_pedido (produto_id)</code>;</li>
          <li><code>idx_produtos_categoria</code> em <code>produtos (categoria)</code>.</li>
        </ul>
        Depois, rode o relatório com <code>EXPLAIN</code> na frente para ver o plano.`,
      dica: `Um <code>CREATE INDEX</code> para cada índice. O <code>EXPLAIN</code> deve mostrar <i>USING INDEX</i> no lugar de <i>SCAN</i>.`,
      lang: "sql",
      inicial: c`-- Crie os dois índices aqui.

SELECT pr.nome, SUM(i.quantidade)
FROM produtos pr
JOIN itens_pedido i ON i.produto_id = pr.id
WHERE pr.categoria = 'eletronicos'
GROUP BY pr.nome;
`,
      solucao: c`CREATE INDEX idx_itens_produto ON itens_pedido (produto_id);
CREATE INDEX idx_produtos_categoria ON produtos (categoria);

EXPLAIN SELECT pr.nome, SUM(i.quantidade)
FROM produtos pr
JOIN itens_pedido i ON i.produto_id = pr.id
WHERE pr.categoria = 'eletronicos'
GROUP BY pr.nome;`,
      verificacao: VERIF_INDICES,
      ordem: true
    }
  ],

  /* ================= a3: Transações e ACID ================= */
  a3: [
    {
      tipo: "completar",
      titulo: "Transferência da Maria para a Ana",
      enunciado: `Transfira <b>R$ 200,00</b> da conta da <b>Maria</b> (id <code>2</code>) para a conta da <b>Ana</b> (id <code>3</code>). Os dois passos precisam acontecer juntos, numa transação confirmada no final.
        Substitua cada <code>____</code> pelo que falta. A verificação confere o saldo de todas as contas.`,
      dica: `Quem envia perde (<code>-</code>), quem recebe ganha (<code>+</code>). A transação termina com o comando que confirma as alterações.`,
      lang: "sql",
      inicial: c`START TRANSACTION;

UPDATE contas SET saldo = saldo ____ 200 WHERE id = 2;  -- Maria
UPDATE contas SET saldo = saldo ____ 200 WHERE id = 3;  -- Ana

____;

SELECT * FROM contas;
`,
      solucao: c`START TRANSACTION;

UPDATE contas SET saldo = saldo - 200 WHERE id = 2;  -- Maria
UPDATE contas SET saldo = saldo + 200 WHERE id = 3;  -- Ana

COMMIT;

SELECT * FROM contas;`,
      verificacao: c`SELECT id, saldo FROM contas ORDER BY id`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Desfazendo o UPDATE sem WHERE",
      enunciado: `Um colega rodou um <code>UPDATE</code> <b>sem WHERE</b> e zerou o estoque de <b>todos</b> os produtos. Por sorte, ele estava dentro de uma transação. Desfaça tudo para o estoque voltar ao que era.
        Substitua cada <code>____</code> pelo que falta. A verificação confere o estoque de todos os produtos.`,
      dica: `O contrário de <code>COMMIT</code> é o comando que desfaz tudo desde o início da transação.`,
      lang: "sql",
      inicial: c`START TRANSACTION;

UPDATE produtos SET estoque = 0;   -- ops, esqueceu o WHERE!
SELECT ROW_COUNT();                -- mudou 10 linhas em vez de 1...

____;

SELECT id, nome, estoque FROM produtos;
`,
      solucao: c`START TRANSACTION;

UPDATE produtos SET estoque = 0;
SELECT ROW_COUNT();

ROLLBACK;

SELECT id, nome, estoque FROM produtos;`,
      verificacao: c`SELECT id, estoque FROM produtos ORDER BY id`,
      ordem: true
    },
    {
      tipo: "completar",
      titulo: "Venda com baixa de estoque",
      enunciado: `A cliente Íris (id <code>9</code>) comprou <b>2 Fones Bluetooth</b> (produto id <code>1</code>). Numa única transação: crie o pedido <code>21</code>, registre o item e <b>baixe o estoque</b> do fone.
        Substitua cada <code>____</code> pelo que falta. A verificação confere o pedido, o item e o estoque.`,
      dica: `O estoque diminui pela quantidade vendida, só no produto vendido. Termine confirmando a transação.`,
      lang: "sql",
      inicial: c`START TRANSACTION;

INSERT INTO pedidos (id, cliente_id, valor, status, data, uf)
VALUES (21, 9, 259.80, 'pago', '2026-10-20', 'SP');

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade)
VALUES (21, 1, 2);

UPDATE produtos SET estoque = estoque - ____ WHERE id = ____;

____;
`,
      solucao: c`START TRANSACTION;

INSERT INTO pedidos (id, cliente_id, valor, status, data, uf)
VALUES (21, 9, 259.80, 'pago', '2026-10-20', 'SP');

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade)
VALUES (21, 1, 2);

UPDATE produtos SET estoque = estoque - 2 WHERE id = 1;

COMMIT;`,
      verificacao: c`SELECT (SELECT COUNT(*) FROM pedidos WHERE id = 21) AS pedido,
       (SELECT quantidade FROM itens_pedido WHERE pedido_id = 21 AND produto_id = 1) AS item,
       (SELECT SUM(estoque) FROM produtos) AS estoque_total,
       (SELECT estoque FROM produtos WHERE id = 1) AS estoque_fone`
    },
    {
      tipo: "criar",
      titulo: "Reajuste do TI com segurança",
      enunciado: `O RH aprovou <b>10% de aumento</b> para todos do departamento <code>'TI'</code>. Faça a alteração do jeito seguro: abra uma <b>transação</b>, rode o <code>UPDATE</code>, confira com um <code>SELECT</code> e <b>confirme</b> com <code>COMMIT</code>.
        A verificação confere o salário de todos os funcionários.`,
      dica: `<code>START TRANSACTION;</code> → <code>UPDATE funcionarios SET salario = salario * 1.1 WHERE ...;</code> → <code>SELECT ...;</code> → <code>COMMIT;</code>`,
      lang: "sql",
      inicial: c`-- Tabela: funcionarios (id, nome, cargo, departamento, salario)
-- Escreva a transação abaixo.
SELECT * FROM funcionarios;
`,
      solucao: c`START TRANSACTION;

UPDATE funcionarios SET salario = salario * 1.1 WHERE departamento = 'TI';
SELECT nome, salario FROM funcionarios WHERE departamento = 'TI';

COMMIT;`,
      padroes: [
        [/(START\s+TRANSACTION|BEGIN)/i, "Abra uma transação com START TRANSACTION."],
        [/COMMIT/i, "Confirme a transação com COMMIT."]
      ],
      verificacao: c`SELECT id, salario FROM funcionarios ORDER BY id`,
      ordem: true
    },
    {
      tipo: "criar",
      titulo: "Compra recusada, compra aprovada",
      enunciado: `A conta da <b>Ana</b> (id <code>3</code>) tem R$ 250,00. Simule duas compras no cartão de débito, cada uma na sua transação:
        <ol>
          <li><b>Compra de R$ 400</b>: abra a transação, debite, confira o saldo com <code>SELECT</code> (ficou negativo!) e <b>desfaça</b> com <code>ROLLBACK</code>.</li>
          <li><b>Compra de R$ 100</b>: abra outra transação, debite e <b>confirme</b> com <code>COMMIT</code>.</li>
        </ol>
        A verificação confere o saldo de todas as contas no final.`,
      dica: `Depois do <code>ROLLBACK</code>, o saldo volta a 250. Só a segunda compra deve ficar gravada.`,
      lang: "sql",
      inicial: c`-- Tabela: contas (id, titular, saldo)
-- Escreva as duas transações abaixo.
SELECT * FROM contas;
`,
      solucao: c`START TRANSACTION;
UPDATE contas SET saldo = saldo - 400 WHERE id = 3;
SELECT saldo FROM contas WHERE id = 3;
ROLLBACK;

START TRANSACTION;
UPDATE contas SET saldo = saldo - 100 WHERE id = 3;
COMMIT;

SELECT * FROM contas;`,
      padroes: [
        [/ROLLBACK/i, "A compra de R$ 400 deve ser desfeita com ROLLBACK."],
        [/COMMIT/i, "A compra de R$ 100 deve ser confirmada com COMMIT."]
      ],
      verificacao: c`SELECT id, saldo FROM contas ORDER BY id`,
      ordem: true
    }
  ]
};
