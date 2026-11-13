// SQL de A a Z — Parte 1: consultas (do SELECT ao HAVING).
// Explicações próprias, em português, seguindo a ordem dos tópicos dos tutoriais clássicos de SQL.

const valores = { tipo: "valores" };
const ordenado = { tipo: "valores", ordenado: true };
const colunas = (...c) => ({ tipo: "colunas", colunas: c });

const SECAO = "1. Consultas (SQL Tutorial)";
const lic = (id, titulo, tabelas, teoria, tarefas, extra = {}) => ({
  id, secao: SECAO, titulo, banco: "loja", tabelas, inicial: `SELECT * FROM ${tabelas[0]};`, teoria, tarefas, ...extra
});

export default [
  {
    id: "intro",
    secao: SECAO,
    rotulo: "Introdução",
    titulo: "O que é SQL e como este guia funciona",
    teoria: `
      <p><b>SQL</b> (<i>Structured Query Language</i>) é a linguagem padrão para conversar com bancos de dados <b>relacionais</b>: com ela você <b>consulta</b>, <b>insere</b>, <b>altera</b> e <b>apaga</b> dados, além de <b>criar</b> tabelas, índices e visões.</p>
      <p>Ela é um padrão (ANSI/ISO), mas cada banco tem seu “sotaque”: <b>MySQL</b>, <b>PostgreSQL</b>, <b>SQL Server</b>, <b>Oracle</b>, <b>SQLite</b>… Os comandos principais (<code>SELECT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>INSERT</code>, <code>WHERE</code>) funcionam igual em todos.</p>
      <h3>O que dá para fazer com SQL</h3>
      <ul>
        <li>Buscar dados (“quais clientes são de São Paulo?”);</li>
        <li>Inserir, atualizar e apagar registros;</li>
        <li>Criar bancos, tabelas, índices, <i>views</i> e permissões;</li>
        <li>Resumir dados (totais, médias, rankings).</li>
      </ul>
      <h3>RDBMS: tabelas, linhas e colunas</h3>
      <p>Um banco relacional guarda os dados em <b>tabelas</b>. Cada <b>coluna</b> (campo) é uma informação (nome, cidade, preço) e cada <b>linha</b> (registro) é um item (um cliente, um produto).</p>
      <h3>O banco deste guia</h3>
      <p>Vamos usar uma pequena <b>distribuidora de alimentos</b>, com as tabelas <code>clientes</code>, <code>produtos</code>, <code>categorias</code>, <code>fornecedores</code>, <code>funcionarios</code>, <code>transportadoras</code>, <code>pedidos</code> e <code>itens_pedido</code>. É um banco SQLite de verdade rodando no seu navegador.</p>
      <ul>
        <li>Cada lição tem explicação, exemplos e <b>tarefas corrigidas na hora</b>.</li>
        <li>Este guia é <b>livre</b>: você pode abrir qualquer tópico direto pelo índice, como um material de consulta.</li>
        <li>Concluir uma lição vale ⭐ 10 pontos.</li>
      </ul>`,
    tarefas: []
  },
  lic("sintaxe", "Sintaxe do SQL", ["clientes"], `
      <p>Um comando SQL é formado por <b>palavras-chave</b> (como <code>SELECT</code> e <code>FROM</code>), <b>nomes</b> de tabelas e colunas e, às vezes, <b>valores</b>.</p>
      <pre><code>SELECT * FROM clientes;</code></pre>
      <ul>
        <li>Palavras-chave <b>não diferenciam maiúsculas</b>: <code>select</code> = <code>SELECT</code>. Escrevê-las em maiúsculas é só costume, para ler melhor.</li>
        <li>O <b>ponto e vírgula</b> separa um comando do outro. Muitos bancos exigem quando há vários comandos seguidos; use sempre.</li>
        <li>Textos ficam entre <b>aspas simples</b>: <code>'Brasil'</code>. Números, sem aspas: <code>42</code>.</li>
        <li>Espaços e quebras de linha não importam: dá para escrever um comando em várias linhas.</li>
      </ul>
      <h3>Comandos mais importantes</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Comando</th><th>Para quê</th></tr></thead><tbody>
        <tr><td><code>SELECT</code></td><td>ler dados</td></tr>
        <tr><td><code>INSERT INTO</code></td><td>inserir dados</td></tr>
        <tr><td><code>UPDATE</code></td><td>alterar dados</td></tr>
        <tr><td><code>DELETE</code></td><td>apagar dados</td></tr>
        <tr><td><code>CREATE TABLE</code> / <code>ALTER TABLE</code> / <code>DROP TABLE</code></td><td>criar, mudar e apagar tabelas</td></tr>
        <tr><td><code>CREATE INDEX</code> / <code>DROP INDEX</code></td><td>criar e apagar índices</td></tr>
      </tbody></table>`, [
      { texto: "Mostre <b>todas</b> as colunas e linhas da tabela <code>clientes</code>", solucao: "SELECT * FROM clientes;", checks: [valores] },
      { texto: "Agora escreva o mesmo comando em <b>letras minúsculas</b> (ex.: <code>select * from clientes;</code>) e confira que o resultado é igual", solucao: "select * from clientes;", checks: [valores] }
    ], { inicial: "" }),
  lic("select", "SELECT: escolhendo colunas", ["clientes"], `
      <p><code>SELECT</code> busca dados. Você diz <b>quais colunas</b> quer e <b>de qual tabela</b>:</p>
      <pre><code>SELECT coluna1, coluna2
FROM tabela;</code></pre>
      <p>Para trazer <b>todas</b> as colunas, use <code>*</code>:</p>
      <pre><code>SELECT * FROM clientes;</code></pre>
      <p>Exemplo: só o nome e a cidade de cada cliente:</p>
      <pre><code>SELECT nome, cidade FROM clientes;</code></pre>
      <p>💼 No dia a dia, prefira listar as colunas: a consulta fica mais leve e mais clara para quem lê.</p>`, [
      { texto: "Mostre o <code>nome</code> e a <code>cidade</code> de todos os clientes", solucao: "SELECT nome, cidade FROM clientes;", checks: [colunas("nome", "cidade")] },
      { texto: "Mostre o <code>nome</code>, o <code>contato</code> e o <code>pais</code> de todos os clientes", solucao: "SELECT nome, contato, pais FROM clientes;", checks: [colunas("nome", "contato", "pais")] },
      { texto: "Mostre todas as colunas da tabela <code>produtos</code>", solucao: "SELECT * FROM produtos;", checks: [valores] }
    ]),
  lic("distinct", "SELECT DISTINCT: sem repetições", ["clientes"], `
      <p>Uma coluna costuma ter valores repetidos (vários clientes do mesmo país). <code>SELECT DISTINCT</code> devolve só os <b>valores diferentes</b>:</p>
      <pre><code>SELECT DISTINCT pais FROM clientes;</code></pre>
      <p>Com várias colunas, o <code>DISTINCT</code> considera a <b>combinação</b>: <code>SELECT DISTINCT pais, cidade</code> traz cada par país+cidade uma vez.</p>
      <p>Para <b>contar</b> quantos valores diferentes existem:</p>
      <pre><code>SELECT COUNT(DISTINCT pais) FROM clientes;</code></pre>
      <p>⚠️ O <code>COUNT(DISTINCT …)</code> não existe no Microsoft Access; lá é preciso uma subconsulta.</p>`, [
      { texto: "Liste os <b>países</b> dos clientes, sem repetir", solucao: "SELECT DISTINCT pais FROM clientes;", checks: [valores] },
      { texto: "Liste as <b>cidades</b> dos clientes, sem repetir", solucao: "SELECT DISTINCT cidade FROM clientes;", checks: [valores] },
      { texto: "Mostre <b>quantos países diferentes</b> aparecem na tabela de clientes (um único número)", solucao: "SELECT COUNT(DISTINCT pais) FROM clientes;", checks: [valores] }
    ]),
  lic("where", "WHERE: filtrando linhas", ["clientes", "produtos"], `
      <p><code>WHERE</code> filtra: só voltam as linhas em que a condição é <b>verdadeira</b>.</p>
      <pre><code>SELECT * FROM clientes
WHERE pais = 'Brasil';</code></pre>
      <p>Texto vai entre aspas simples; número, sem aspas: <code>WHERE id = 1</code>.</p>
      <h3>Operadores do WHERE</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Operador</th><th>Significado</th></tr></thead><tbody>
        <tr><td><code>=</code></td><td>igual</td></tr>
        <tr><td><code>&gt;</code> / <code>&lt;</code></td><td>maior / menor</td></tr>
        <tr><td><code>&gt;=</code> / <code>&lt;=</code></td><td>maior ou igual / menor ou igual</td></tr>
        <tr><td><code>&lt;&gt;</code> ou <code>!=</code></td><td>diferente</td></tr>
        <tr><td><code>BETWEEN</code></td><td>dentro de um intervalo</td></tr>
        <tr><td><code>LIKE</code></td><td>parecido com um padrão</td></tr>
        <tr><td><code>IN</code></td><td>está numa lista de valores</td></tr>
      </tbody></table>
      <p>O <code>WHERE</code> também é usado em <code>UPDATE</code> e <code>DELETE</code> (veremos adiante).</p>`, [
      { texto: "Mostre os clientes do país <code>'Espanha'</code>", solucao: "SELECT * FROM clientes WHERE pais = 'Espanha';", checks: [valores] },
      { texto: "Mostre o cliente com <code>id</code> igual a 7", solucao: "SELECT * FROM clientes WHERE id = 7;", checks: [valores] },
      { texto: "Mostre os produtos com <code>preco</code> <b>maior que 30</b>", solucao: "SELECT * FROM produtos WHERE preco > 30;", checks: [valores] },
      { texto: "Mostre os clientes cuja cidade é <b>diferente</b> de <code>'São Paulo'</code>", solucao: "SELECT * FROM clientes WHERE cidade <> 'São Paulo';", checks: [valores] }
    ]),
  lic("order-by", "ORDER BY: ordenando", ["produtos", "clientes"], `
      <p><code>ORDER BY</code> organiza o resultado. O padrão é <b>crescente</b> (<code>ASC</code>); para decrescente use <code>DESC</code>.</p>
      <pre><code>SELECT * FROM produtos
ORDER BY preco;        -- do mais barato ao mais caro

SELECT * FROM produtos
ORDER BY preco DESC;   -- do mais caro ao mais barato</code></pre>
      <p>Em textos, a ordem é alfabética (<code>DESC</code> = de Z para A).</p>
      <h3>Várias colunas</h3>
      <pre><code>SELECT * FROM clientes
ORDER BY pais, nome;          -- por país; empate → por nome

SELECT * FROM clientes
ORDER BY pais ASC, nome DESC; -- país A→Z e, dentro dele, nome Z→A</code></pre>`, [
      { texto: "Liste os produtos do <b>mais barato ao mais caro</b>", solucao: "SELECT * FROM produtos ORDER BY preco;", checks: [ordenado] },
      { texto: "Liste os produtos do <b>mais caro ao mais barato</b>", solucao: "SELECT * FROM produtos ORDER BY preco DESC;", checks: [ordenado] },
      { texto: "Liste os clientes em ordem alfabética de <b>nome</b>, de Z para A", solucao: "SELECT * FROM clientes ORDER BY nome DESC;", checks: [ordenado] },
      { texto: "Liste os clientes ordenados por <code>pais</code> e, dentro do mesmo país, por <code>nome</code> (os dois de A a Z)", solucao: "SELECT * FROM clientes ORDER BY pais, nome;", checks: [ordenado] }
    ]),
  lic("and", "AND: todas as condições", ["clientes"], `
      <p>O <code>AND</code> junta duas ou mais condições no <code>WHERE</code>. Uma linha só aparece se <b>TODAS</b> as condições forem verdadeiras.</p>
      <pre><code>SELECT coluna1, coluna2
FROM tabela
WHERE condicao1 AND condicao2 AND condicao3;</code></pre>
      <p>Exemplo: clientes da Espanha <b>e</b> cujo nome começa com “G”:</p>
      <pre><code>SELECT * FROM clientes
WHERE pais = 'Espanha' AND nome LIKE 'G%';</code></pre>
      <h3>AND × OR</h3>
      <ul>
        <li><code>AND</code>: mostra a linha se <b>todas</b> as condições forem verdadeiras.</li>
        <li><code>OR</code>: mostra a linha se <b>pelo menos uma</b> for verdadeira.</li>
      </ul>
      <h3>Três condições ao mesmo tempo</h3>
      <pre><code>SELECT * FROM clientes
WHERE pais = 'Brasil' AND cidade = 'Rio de Janeiro' AND id &gt; 10;</code></pre>
      <h3>Misturando AND e OR: use parênteses!</h3>
      <p>O <code>AND</code> é avaliado <b>antes</b> do <code>OR</code>. Compare:</p>
      <pre><code>-- Espanha E (nome começa com G OU com R)
SELECT * FROM clientes
WHERE pais = 'Espanha' AND (nome LIKE 'G%' OR nome LIKE 'R%');

-- sem parênteses: (Espanha E começa com G) OU (começa com R, de qualquer país!)
SELECT * FROM clientes
WHERE pais = 'Espanha' AND nome LIKE 'G%' OR nome LIKE 'R%';</code></pre>
      <p>Rode as duas no editor e compare: a segunda traz também o <i>Rancho Grande</i> (México) e a <i>Rotisseria Roma</i> (Itália).</p>`, [
      { texto: "Mostre os clientes da <code>'Espanha'</code> cujo nome começa com <code>G</code>", solucao: "SELECT * FROM clientes WHERE pais = 'Espanha' AND nome LIKE 'G%';", checks: [valores] },
      { texto: "Mostre os clientes do <code>'Brasil'</code>, da cidade <code>'Rio de Janeiro'</code> <b>e</b> com <code>id</code> maior que 10", solucao: "SELECT * FROM clientes WHERE pais = 'Brasil' AND cidade = 'Rio de Janeiro' AND id > 10;", checks: [valores] },
      { texto: "Mostre os clientes da <code>'Espanha'</code> cujo nome começa com <code>G</code> <b>ou</b> com <code>R</code> (use parênteses!)", solucao: "SELECT * FROM clientes WHERE pais = 'Espanha' AND (nome LIKE 'G%' OR nome LIKE 'R%');", checks: [valores] },
      { texto: "Mostre os clientes do <code>'Brasil'</code> que <b>não</b> são de <code>'São Paulo'</code> e que têm <code>cep</code> preenchido (<code>cep IS NOT NULL</code>)", solucao: "SELECT * FROM clientes WHERE pais = 'Brasil' AND cidade <> 'São Paulo' AND cep IS NOT NULL;", checks: [valores] }
    ]),
  lic("or", "OR: pelo menos uma condição", ["clientes"], `
      <p>Com <code>OR</code>, a linha aparece se <b>qualquer uma</b> das condições for verdadeira.</p>
      <pre><code>SELECT * FROM clientes
WHERE pais = 'Portugal' OR pais = 'Espanha';</code></pre>
      <p>Pode haver vários <code>OR</code>: <code>WHERE cidade = 'Lisboa' OR nome LIKE 'G%' OR pais = 'Itália'</code>.</p>
      <p>Misturando com <code>AND</code>, lembre dos <b>parênteses</b>:</p>
      <pre><code>SELECT * FROM clientes
WHERE pais = 'Brasil' AND (cidade = 'Salvador' OR cidade = 'Recife');</code></pre>`, [
      { texto: "Mostre os clientes de <code>'Portugal'</code> <b>ou</b> da <code>'Argentina'</code>", solucao: "SELECT * FROM clientes WHERE pais = 'Portugal' OR pais = 'Argentina';", checks: [valores] },
      { texto: "Mostre os clientes da cidade <code>'Lisboa'</code>, <b>ou</b> cujo nome começa com <code>G</code>, <b>ou</b> do país <code>'Itália'</code>", solucao: "SELECT * FROM clientes WHERE cidade = 'Lisboa' OR nome LIKE 'G%' OR pais = 'Itália';", checks: [valores] },
      { texto: "Mostre os clientes do <code>'Brasil'</code> que são de <code>'Salvador'</code> ou de <code>'Recife'</code>", solucao: "SELECT * FROM clientes WHERE pais = 'Brasil' AND (cidade = 'Salvador' OR cidade = 'Recife');", checks: [valores] }
    ]),
  lic("not", "NOT: invertendo a condição", ["clientes", "produtos"], `
      <p><code>NOT</code> inverte uma condição: mostra as linhas em que ela é <b>falsa</b>.</p>
      <pre><code>SELECT * FROM clientes WHERE NOT pais = 'Brasil';</code></pre>
      <p>Ele combina com outros operadores:</p>
      <ul>
        <li><code>NOT LIKE 'A%'</code>: não começa com A;</li>
        <li><code>NOT BETWEEN 10 AND 20</code>: fora do intervalo;</li>
        <li><code>NOT IN ('Brasil', 'Portugal')</code>: fora da lista;</li>
        <li><code>NOT id &gt; 10</code> é o mesmo que <code>id &lt;= 10</code>.</li>
      </ul>`, [
      { texto: "Mostre os clientes que <b>não</b> são do <code>'Brasil'</code>, usando <code>NOT</code>", solucao: "SELECT * FROM clientes WHERE NOT pais = 'Brasil';", checks: [valores] },
      { texto: "Mostre os clientes cujo nome <b>não</b> começa com <code>C</code>", solucao: "SELECT * FROM clientes WHERE nome NOT LIKE 'C%';", checks: [valores] },
      { texto: "Mostre os produtos com preço <b>fora</b> do intervalo de 10 a 40", solucao: "SELECT * FROM produtos WHERE preco NOT BETWEEN 10 AND 40;", checks: [valores] },
      { texto: "Mostre os clientes que <b>não</b> são de <code>'Brasil'</code>, <code>'Portugal'</code> nem <code>'Espanha'</code>", solucao: "SELECT * FROM clientes WHERE pais NOT IN ('Brasil', 'Portugal', 'Espanha');", checks: [valores] }
    ]),
  lic("insert", "INSERT INTO: inserindo dados", ["clientes"], `
      <p><code>INSERT INTO</code> acrescenta linhas. Há duas formas:</p>
      <pre><code>-- 1) dizendo as colunas (recomendado)
INSERT INTO clientes (nome, contato, cidade, pais)
VALUES ('Padaria Real', 'Sara Lopes', 'Natal', 'Brasil');

-- 2) sem dizer as colunas: valores para TODAS, na ordem da tabela
INSERT INTO clientes
VALUES (22, 'Mercadinho Sol', 'Davi Reis', 'Rua A, 1', 'Natal', '59000-000', 'Brasil');</code></pre>
      <p>Colunas que você não citar ficam <code>NULL</code> (ou com o valor padrão). O <code>id</code>, sendo <code>INTEGER PRIMARY KEY</code>, é gerado automaticamente.</p>
      <h3>Várias linhas de uma vez</h3>
      <pre><code>INSERT INTO clientes (nome, cidade, pais) VALUES
 ('Loja A', 'Natal', 'Brasil'),
 ('Loja B', 'Maceió', 'Brasil');</code></pre>`, [
      { texto: "Insira o cliente <code>'Padaria Real'</code>, contato <code>'Sara Lopes'</code>, cidade <code>'Natal'</code>, país <code>'Brasil'</code>", solucao: "INSERT INTO clientes (nome, contato, cidade, pais) VALUES ('Padaria Real', 'Sara Lopes', 'Natal', 'Brasil');", checks: [{ tipo: "linha_existe", tabela: "clientes", coluna: "nome", valor: "Padaria Real", ci: true }, { tipo: "contagem", sql: "SELECT * FROM clientes WHERE nome = 'Padaria Real' AND cidade = 'Natal' AND pais = 'Brasil' AND contato = 'Sara Lopes'", min: 1, max: 9, msg: "Confira o contato, a cidade e o país." }] },
      { texto: "Insira só o <code>nome</code> <code>'Empório Natal'</code>, a <code>cidade</code> <code>'Natal'</code> e o <code>pais</code> <code>'Brasil'</code> (as outras colunas ficam vazias)", solucao: "INSERT INTO clientes (nome, cidade, pais) VALUES ('Empório Natal', 'Natal', 'Brasil');", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE nome = 'Empório Natal' AND cidade = 'Natal' AND contato IS NULL", min: 1, max: 9, msg: "Não encontrei 'Empório Natal' de Natal com o contato vazio." }] },
      { texto: "Com <b>um único</b> <code>INSERT</code>, insira dois clientes de <code>'Maceió'</code>, <code>'Brasil'</code>: <code>'Loja A'</code> e <code>'Loja B'</code>", solucao: "INSERT INTO clientes (nome, cidade, pais) VALUES ('Loja A', 'Maceió', 'Brasil'), ('Loja B', 'Maceió', 'Brasil');", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE nome IN ('Loja A', 'Loja B') AND cidade = 'Maceió'", min: 2, max: 9, msg: "Ainda faltam 'Loja A' e 'Loja B' de Maceió." }] }
    ], { manual: true }),
  lic("null", "Valores NULL", ["clientes", "fornecedores"], `
      <p><code>NULL</code> significa “<b>sem valor</b>” (campo vazio). Não é zero nem texto vazio.</p>
      <p>⚠️ Não dá para comparar com <code>=</code>: <code>cep = NULL</code> nunca é verdadeiro. Use:</p>
      <pre><code>SELECT nome, cep FROM clientes WHERE cep IS NULL;
SELECT nome, cep FROM clientes WHERE cep IS NOT NULL;</code></pre>
      <p>💼 Exemplo real: achar cadastros incompletos (sem telefone, sem CEP) para a equipe completar.</p>`, [
      { texto: "Mostre o <code>nome</code> dos clientes <b>sem</b> CEP", solucao: "SELECT nome FROM clientes WHERE cep IS NULL;", checks: [valores] },
      { texto: "Mostre o <code>nome</code> e o <code>contato</code> dos clientes que <b>têm</b> contato preenchido", solucao: "SELECT nome, contato FROM clientes WHERE contato IS NOT NULL;", checks: [valores] },
      { texto: "Mostre os fornecedores (tabela <code>fornecedores</code>) sem <code>telefone</code>", solucao: "SELECT * FROM fornecedores WHERE telefone IS NULL;", checks: [valores] }
    ]),
  lic("update", "UPDATE: alterando dados", ["clientes"], `
      <p><code>UPDATE</code> muda valores de linhas que já existem:</p>
      <pre><code>UPDATE clientes
SET contato = 'Ana Paula Souza', cidade = 'Campinas'
WHERE id = 1;</code></pre>
      <p>⚠️ <b>Cuidado com o WHERE!</b> Sem ele, <b>todas</b> as linhas são alteradas:</p>
      <pre><code>UPDATE clientes SET pais = 'Brasil'; -- muda TODOS os clientes!</code></pre>
      <p>💡 Dica de quem trabalha com isso: antes de um <code>UPDATE</code>, rode um <code>SELECT</code> com o mesmo <code>WHERE</code> para ver quais linhas vão mudar.</p>`, [
      { texto: "Mude o <code>contato</code> do cliente de <code>id</code> 1 para <code>'Ana Paula Souza'</code>", solucao: "UPDATE clientes SET contato = 'Ana Paula Souza' WHERE id = 1;", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE id = 1 AND contato = 'Ana Paula Souza'", min: 1, max: 1 }, { tipo: "contagem", sql: "SELECT * FROM clientes WHERE contato = 'Ana Paula Souza'", min: 1, max: 1, msg: "Só o cliente 1 deveria mudar. Clique em ↺ Resetar banco e use WHERE." }] },
      { texto: "Mude a <code>cidade</code> de todos os clientes de <code>'Rio de Janeiro'</code> para <code>'Niterói'</code>", solucao: "UPDATE clientes SET cidade = 'Niterói' WHERE cidade = 'Rio de Janeiro';", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE cidade = 'Niterói'", min: 2, max: 2, msg: "Os 2 clientes do Rio deveriam estar em Niterói (e só eles)." }] },
      { texto: "Preencha o <code>cep</code> de quem está sem CEP com <code>'00000-000'</code>", solucao: "UPDATE clientes SET cep = '00000-000' WHERE cep IS NULL;", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE cep IS NULL", min: 0, max: 0, msg: "Ainda há clientes sem CEP." }, { tipo: "contagem", sql: "SELECT * FROM clientes WHERE cep = '00000-000'", min: 2, max: 2, msg: "Só quem estava sem CEP deveria receber '00000-000'." }] }
    ], { manual: true }),
  lic("delete", "DELETE: apagando dados", ["clientes", "transportadoras"], `
      <p><code>DELETE</code> remove linhas:</p>
      <pre><code>DELETE FROM clientes WHERE nome = 'Quitanda Nova';</code></pre>
      <p>⚠️ Sem <code>WHERE</code>, apaga <b>todas</b> as linhas (a tabela continua existindo, vazia):</p>
      <pre><code>DELETE FROM clientes;</code></pre>
      <p>Para apagar a tabela inteira (estrutura e dados), o comando é outro: <code>DROP TABLE</code>.</p>`, [
      { texto: "Apague o cliente <code>'Quitanda Nova'</code>", solucao: "DELETE FROM clientes WHERE nome = 'Quitanda Nova';", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE nome = 'Quitanda Nova'", min: 0, max: 0, msg: "O cliente 'Quitanda Nova' ainda existe." }, { tipo: "contagem", sql: "SELECT * FROM clientes", min: 19, max: 19, msg: "Só um cliente deveria ser apagado. Clique em ↺ Resetar banco." }] },
      { texto: "Apague os clientes da <code>'Alemanha'</code> e da <code>'Itália'</code>", solucao: "DELETE FROM clientes WHERE pais IN ('Alemanha', 'Itália');", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes WHERE pais IN ('Alemanha', 'Itália')", min: 0, max: 0, msg: "Ainda há clientes da Alemanha ou da Itália." }, { tipo: "contagem", sql: "SELECT * FROM clientes", min: 17, max: 17, msg: "Deveriam sobrar 17 clientes. Clique em ↺ Resetar banco e refaça as tarefas." }] },
      { texto: "Apague <b>todas</b> as linhas da tabela <code>transportadoras</code> (a tabela continua existindo)", solucao: "DELETE FROM transportadoras;", checks: [{ tipo: "contagem", sql: "SELECT * FROM transportadoras", min: 0, max: 0, msg: "A tabela transportadoras ainda tem linhas." }] }
    ], { manual: true }),
  lic("top", "SELECT TOP, LIMIT e FETCH FIRST", ["produtos", "clientes"], `
      <p>Para trazer só <b>algumas</b> linhas, cada banco tem uma sintaxe:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Banco</th><th>Sintaxe</th></tr></thead><tbody>
        <tr><td>SQL Server / MS Access</td><td><code>SELECT TOP 3 * FROM produtos;</code></td></tr>
        <tr><td>MySQL / PostgreSQL / <b>SQLite</b></td><td><code>SELECT * FROM produtos LIMIT 3;</code></td></tr>
        <tr><td>Oracle 12+</td><td><code>SELECT * FROM produtos FETCH FIRST 3 ROWS ONLY;</code></td></tr>
        <tr><td>Oracle antigo</td><td><code>WHERE ROWNUM &lt;= 3</code></td></tr>
      </tbody></table>
      <p>No SQL Server ainda existe <code>TOP 50 PERCENT</code>. Aqui (SQLite) usamos <code>LIMIT</code>, que combina com <code>ORDER BY</code> e <code>OFFSET</code> (pular linhas):</p>
      <pre><code>-- os 3 produtos mais caros
SELECT * FROM produtos ORDER BY preco DESC LIMIT 3;

-- do 4º ao 6º mais caro (paginação)
SELECT * FROM produtos ORDER BY preco DESC LIMIT 3 OFFSET 3;</code></pre>`, [
      { texto: "Mostre os <b>3 primeiros</b> clientes (por <code>id</code>)", solucao: "SELECT * FROM clientes ORDER BY id LIMIT 3;", checks: [ordenado] },
      { texto: "Mostre os <b>5 produtos mais caros</b>, do mais caro para o mais barato", solucao: "SELECT * FROM produtos ORDER BY preco DESC LIMIT 5;", checks: [ordenado] },
      { texto: "Mostre os <b>3 clientes do Brasil</b> com menor <code>id</code>", solucao: "SELECT * FROM clientes WHERE pais = 'Brasil' ORDER BY id LIMIT 3;", checks: [ordenado] },
      { texto: "Paginação: mostre o <b>4º, 5º e 6º</b> produto mais barato", solucao: "SELECT * FROM produtos ORDER BY preco LIMIT 3 OFFSET 3;", checks: [ordenado] }
    ]),
  lic("agregadas", "Funções de agregação", ["produtos"], `
      <p>Uma <b>função de agregação</b> faz um cálculo sobre <b>várias linhas</b> e devolve <b>um valor</b>:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Função</th><th>Devolve</th></tr></thead><tbody>
        <tr><td><code>MIN()</code></td><td>o menor valor</td></tr>
        <tr><td><code>MAX()</code></td><td>o maior valor</td></tr>
        <tr><td><code>COUNT()</code></td><td>quantas linhas</td></tr>
        <tr><td><code>SUM()</code></td><td>a soma</td></tr>
        <tr><td><code>AVG()</code></td><td>a média</td></tr>
      </tbody></table>
      <p>Elas ignoram <code>NULL</code> (exceto <code>COUNT(*)</code>, que conta linhas). Costumam andar com <code>GROUP BY</code>, que separa os dados em grupos (veremos adiante).</p>
      <pre><code>SELECT MIN(preco), MAX(preco), AVG(preco) FROM produtos;</code></pre>`, [
      { texto: "Mostre, numa só consulta, o <b>menor</b> e o <b>maior</b> preço dos produtos", solucao: "SELECT MIN(preco), MAX(preco) FROM produtos;", checks: [valores] },
      { texto: "Mostre <b>quantos produtos</b> existem e a <b>média</b> de preço", solucao: "SELECT COUNT(*), AVG(preco) FROM produtos;", checks: [valores] }
    ]),
  lic("min-max", "MIN() e MAX()", ["produtos", "pedidos"], `
      <p><code>MIN()</code> devolve o menor valor de uma coluna; <code>MAX()</code>, o maior.</p>
      <pre><code>SELECT MIN(preco) FROM produtos;
SELECT MAX(preco) AS mais_caro FROM produtos;</code></pre>
      <p>Com <code>AS</code> você dá um <b>nome</b> à coluna do resultado. Funciona com textos (ordem alfabética) e datas também.</p>
      <p>Com <code>GROUP BY</code>, dá o menor/maior <b>de cada grupo</b>:</p>
      <pre><code>SELECT categoria_id, MIN(preco) FROM produtos GROUP BY categoria_id;</code></pre>`, [
      { texto: "Mostre o <b>menor preço</b> entre os produtos", solucao: "SELECT MIN(preco) FROM produtos;", checks: [valores] },
      { texto: "Mostre o <b>maior preço</b> com o nome de coluna <code>mais_caro</code>", solucao: "SELECT MAX(preco) AS mais_caro FROM produtos;", checks: [colunas("mais_caro"), valores] },
      { texto: "Mostre o maior preço <b>da categoria 4</b> (Laticínios)", solucao: "SELECT MAX(preco) FROM produtos WHERE categoria_id = 4;", checks: [valores] },
      { texto: "Mostre a <b>data do pedido mais antigo</b> da tabela <code>pedidos</code>", solucao: "SELECT MIN(data) FROM pedidos;", checks: [valores] }
    ]),
  lic("count", "COUNT()", ["produtos", "clientes"], `
      <p><code>COUNT()</code> conta linhas.</p>
      <ul>
        <li><code>COUNT(*)</code>: todas as linhas;</li>
        <li><code>COUNT(coluna)</code>: só as linhas em que a coluna <b>não é NULL</b>;</li>
        <li><code>COUNT(DISTINCT coluna)</code>: valores diferentes.</li>
      </ul>
      <pre><code>SELECT COUNT(*) FROM produtos WHERE preco &gt; 20;
SELECT COUNT(cep) FROM clientes;            -- quem tem CEP
SELECT COUNT(*) AS total FROM clientes;</code></pre>`, [
      { texto: "Conte <b>quantos clientes</b> existem", solucao: "SELECT COUNT(*) FROM clientes;", checks: [valores] },
      { texto: "Conte quantos produtos custam <b>mais de 20</b>", solucao: "SELECT COUNT(*) FROM produtos WHERE preco > 20;", checks: [valores] },
      { texto: "Conte quantos clientes <b>têm</b> CEP, usando <code>COUNT(cep)</code>", solucao: "SELECT COUNT(cep) FROM clientes;", checks: [valores] },
      { texto: "Conte quantas <b>cidades diferentes</b> aparecem nos clientes do <code>'Brasil'</code>", solucao: "SELECT COUNT(DISTINCT cidade) FROM clientes WHERE pais = 'Brasil';", checks: [valores] }
    ]),
  lic("sum", "SUM()", ["itens_pedido", "produtos"], `
      <p><code>SUM()</code> soma os valores de uma coluna numérica.</p>
      <pre><code>SELECT SUM(quantidade) FROM itens_pedido;
SELECT SUM(quantidade) FROM itens_pedido WHERE produto_id = 1;</code></pre>
      <p>Dá para somar uma <b>expressão</b>: <code>SUM(quantidade * 10)</code>. Com JOIN, somamos o valor vendido (quantidade × preço):</p>
      <pre><code>SELECT SUM(i.quantidade * p.preco)
FROM itens_pedido i JOIN produtos p ON p.id = i.produto_id;</code></pre>`, [
      { texto: "Some a <code>quantidade</code> de todos os itens vendidos", solucao: "SELECT SUM(quantidade) FROM itens_pedido;", checks: [valores] },
      { texto: "Some a quantidade vendida do produto de <code>id</code> 1 (café em grãos)", solucao: "SELECT SUM(quantidade) FROM itens_pedido WHERE produto_id = 1;", checks: [valores] },
      { texto: "Some a quantidade dos itens do <b>pedido 1001</b>", solucao: "SELECT SUM(quantidade) FROM itens_pedido WHERE pedido_id = 1001;", checks: [valores] },
      { texto: "Calcule o <b>faturamento total</b>: soma de <code>quantidade * preco</code> (junte <code>itens_pedido</code> com <code>produtos</code>)", solucao: "SELECT SUM(i.quantidade * p.preco) FROM itens_pedido i JOIN produtos p ON p.id = i.produto_id;", checks: [valores] }
    ]),
  lic("avg", "AVG()", ["produtos"], `
      <p><code>AVG()</code> calcula a <b>média</b> (ignora <code>NULL</code>).</p>
      <pre><code>SELECT AVG(preco) FROM produtos;
SELECT AVG(preco) FROM produtos WHERE categoria_id = 1;</code></pre>
      <p>Truque útil: produtos <b>acima da média</b>, com uma subconsulta:</p>
      <pre><code>SELECT * FROM produtos
WHERE preco &gt; (SELECT AVG(preco) FROM produtos);</code></pre>`, [
      { texto: "Mostre o <b>preço médio</b> dos produtos", solucao: "SELECT AVG(preco) FROM produtos;", checks: [valores] },
      { texto: "Mostre o preço médio da <b>categoria 1</b> (Bebidas)", solucao: "SELECT AVG(preco) FROM produtos WHERE categoria_id = 1;", checks: [valores] },
      { texto: "Liste os produtos com preço <b>acima da média</b>", solucao: "SELECT * FROM produtos WHERE preco > (SELECT AVG(preco) FROM produtos);", checks: [valores] }
    ]),
  lic("like", "LIKE: buscando por padrão", ["clientes"], `
      <p><code>LIKE</code> procura textos que seguem um <b>padrão</b>, com dois curingas:</p>
      <ul>
        <li><code>%</code>: qualquer quantidade de caracteres (inclusive nenhum);</li>
        <li><code>_</code>: exatamente <b>um</b> caractere.</li>
      </ul>
      <pre><code>WHERE nome LIKE 'B%'      -- começa com B
WHERE nome LIKE '%o'      -- termina com o
WHERE nome LIKE '%Pão%'   -- contém "Pão"
WHERE cidade LIKE 'R_m_'  -- R, 1 letra, m, 1 letra (Roma)
WHERE nome LIKE 'C%l'     -- começa com C e termina com l</code></pre>
      <p>No SQLite e no MySQL, o <code>LIKE</code> normalmente não diferencia maiúsculas de minúsculas (em letras sem acento).</p>`, [
      { texto: "Mostre os clientes cujo nome começa com <code>B</code>", solucao: "SELECT * FROM clientes WHERE nome LIKE 'B%';", checks: [valores] },
      { texto: "Mostre os clientes cujo nome termina com <code>a</code>", solucao: "SELECT * FROM clientes WHERE nome LIKE '%a';", checks: [valores] },
      { texto: "Mostre os clientes cujo nome <b>contém</b> a palavra <code>Mercado</code>", solucao: "SELECT * FROM clientes WHERE nome LIKE '%Mercado%';", checks: [valores] },
      { texto: "Mostre os clientes de cidades com <b>exatamente 4 letras</b> (padrão com quatro <code>_</code> seguidos)", solucao: "SELECT * FROM clientes WHERE cidade LIKE '____';", checks: [valores] }
    ]),
  lic("curingas", "Curingas (wildcards)", ["clientes"], `
      <p>Curingas são caracteres “coringa” usados com <code>LIKE</code>:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Símbolo</th><th>Significado</th><th>Exemplo</th></tr></thead><tbody>
        <tr><td><code>%</code></td><td>zero ou mais caracteres</td><td><code>'bo%'</code> → bolo, bom, bo</td></tr>
        <tr><td><code>_</code></td><td>um caractere</td><td><code>'p_r%'</code> → pera, porta, para</td></tr>
        <tr><td><code>[]</code></td><td>um dos caracteres da lista (SQL Server/Access)</td><td><code>'[bp]%'</code></td></tr>
        <tr><td><code>^</code> ou <code>!</code></td><td>nenhum dos caracteres (SQL Server/Access)</td><td><code>'[^bp]%'</code></td></tr>
        <tr><td><code>-</code></td><td>faixa de caracteres (SQL Server/Access)</td><td><code>'[a-f]%'</code></td></tr>
      </tbody></table>
      <p>No MS Access o <code>*</code> faz o papel de <code>%</code> e o <code>?</code> o de <code>_</code>.</p>
      <p>No SQLite, os colchetes não existem no <code>LIKE</code>, mas o <code>GLOB</code> aceita (e diferencia maiúsculas): <code>WHERE nome GLOB '[BR]*'</code>. Outra saída é combinar <code>LIKE</code> com <code>OR</code>.</p>`, [
      { texto: "Mostre os clientes cuja <b>segunda letra</b> do nome é <code>a</code> (padrão <code>'_a%'</code>)", solucao: "SELECT * FROM clientes WHERE nome LIKE '_a%';", checks: [valores] },
      { texto: "Mostre os clientes cujo nome começa com <code>B</code>, <code>R</code> ou <code>T</code> (use <code>GLOB '[BRT]*'</code> ou três <code>LIKE</code> com <code>OR</code>)", solucao: "SELECT * FROM clientes WHERE nome GLOB '[BRT]*';", checks: [valores] },
      { texto: "Mostre os clientes cujo nome começa com uma letra entre <code>A</code> e <code>D</code> (use <code>GLOB '[A-D]*'</code>)", solucao: "SELECT * FROM clientes WHERE nome GLOB '[A-D]*';", checks: [valores] }
    ]),
  lic("in", "IN: dentro de uma lista", ["clientes"], `
      <p><code>IN</code> é um atalho para vários <code>OR</code>:</p>
      <pre><code>SELECT * FROM clientes
WHERE pais IN ('Portugal', 'Espanha', 'Itália');
-- é o mesmo que pais = 'Portugal' OR pais = 'Espanha' OR pais = 'Itália'</code></pre>
      <p><code>NOT IN</code> faz o contrário. E a lista pode vir de uma <b>subconsulta</b>:</p>
      <pre><code>-- clientes que já fizeram pedido
SELECT * FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos);</code></pre>`, [
      { texto: "Mostre os clientes de <code>'Portugal'</code>, <code>'Espanha'</code> ou <code>'Itália'</code> usando <code>IN</code>", solucao: "SELECT * FROM clientes WHERE pais IN ('Portugal', 'Espanha', 'Itália');", checks: [valores] },
      { texto: "Mostre os clientes que <b>não</b> são de <code>'Brasil'</code> nem de <code>'Espanha'</code>", solucao: "SELECT * FROM clientes WHERE pais NOT IN ('Brasil', 'Espanha');", checks: [valores] },
      { texto: "Mostre os clientes que <b>já fizeram</b> algum pedido (subconsulta em <code>pedidos</code>)", solucao: "SELECT * FROM clientes WHERE id IN (SELECT cliente_id FROM pedidos);", checks: [valores] },
      { texto: "Mostre os clientes que <b>nunca</b> fizeram pedido", solucao: "SELECT * FROM clientes WHERE id NOT IN (SELECT cliente_id FROM pedidos);", checks: [valores] }
    ]),
  lic("between", "BETWEEN: dentro de um intervalo", ["produtos", "pedidos"], `
      <p><code>BETWEEN a AND b</code> seleciona valores no intervalo, <b>incluindo as pontas</b>. Funciona com números, textos e datas.</p>
      <pre><code>SELECT * FROM produtos WHERE preco BETWEEN 10 AND 20;
SELECT * FROM produtos WHERE preco NOT BETWEEN 10 AND 20;
SELECT * FROM produtos WHERE nome BETWEEN 'Arroz' AND 'Doce' ORDER BY nome;
SELECT * FROM pedidos WHERE data BETWEEN '2024-03-01' AND '2024-03-31';</code></pre>
      <p>Pode combinar com outras condições: <code>WHERE preco BETWEEN 10 AND 20 AND categoria_id NOT IN (1, 2)</code>.</p>
      <p>💡 Datas no formato <code>AAAA-MM-DD</code> funcionam bem com <code>BETWEEN</code> porque a ordem do texto é a mesma do calendário.</p>`, [
      { texto: "Mostre os produtos com preço <b>de 10 a 20</b>", solucao: "SELECT * FROM produtos WHERE preco BETWEEN 10 AND 20;", checks: [valores] },
      { texto: "Mostre os produtos com preço de 10 a 20 que <b>não</b> são das categorias 1 e 2", solucao: "SELECT * FROM produtos WHERE preco BETWEEN 10 AND 20 AND categoria_id NOT IN (1, 2);", checks: [valores] },
      { texto: "Mostre os pedidos de <b>março de 2024</b> (de <code>'2024-03-01'</code> a <code>'2024-03-31'</code>)", solucao: "SELECT * FROM pedidos WHERE data BETWEEN '2024-03-01' AND '2024-03-31';", checks: [valores] },
      { texto: "Mostre os produtos cujo nome vai de <code>'Café'</code> a <code>'Doce'</code> em ordem alfabética, ordenados por nome", solucao: "SELECT * FROM produtos WHERE nome BETWEEN 'Café' AND 'Doce' ORDER BY nome;", checks: [ordenado] }
    ]),
  lic("apelidos", "Apelidos (AS)", ["clientes", "pedidos"], `
      <p>Um <b>apelido</b> (<i>alias</i>) dá um nome temporário a uma coluna ou tabela, só durante a consulta.</p>
      <pre><code>SELECT id AS codigo, nome AS cliente FROM clientes;</code></pre>
      <ul>
        <li>O <code>AS</code> é opcional: <code>SELECT id codigo FROM clientes</code> também funciona.</li>
        <li>Apelido com espaço precisa de aspas duplas (ou colchetes no SQL Server): <code>AS "Nome do cliente"</code>.</li>
        <li>Dá para juntar colunas num apelido: <code>endereco || ', ' || cidade AS endereco_completo</code> (no MySQL: <code>CONCAT(...)</code>; no SQL Server: <code>+</code>).</li>
      </ul>
      <h3>Apelido de tabela</h3>
      <p>Encurta consultas com várias tabelas:</p>
      <pre><code>SELECT p.id, c.nome
FROM pedidos AS p, clientes AS c
WHERE c.id = p.cliente_id AND c.nome = 'Armazém Bom Preço';</code></pre>`, [
      { texto: "Mostre <code>id</code> como <code>codigo</code> e <code>nome</code> como <code>cliente</code>", solucao: "SELECT id AS codigo, nome AS cliente FROM clientes;", checks: [colunas("codigo", "cliente")] },
      { texto: "Mostre o <code>nome</code> e uma coluna <code>endereco_completo</code> com <code>endereco || ', ' || cidade</code>", solucao: "SELECT nome, endereco || ', ' || cidade AS endereco_completo FROM clientes;", checks: [colunas("nome", "endereco_completo"), valores] },
      { texto: "Usando os apelidos <code>p</code> (pedidos) e <code>c</code> (clientes), mostre o <code>id</code> dos pedidos do cliente <code>'Armazém Bom Preço'</code>", solucao: "SELECT p.id FROM pedidos AS p, clientes AS c WHERE c.id = p.cliente_id AND c.nome = 'Armazém Bom Preço';", checks: [valores] }
    ]),
  lic("joins", "JOIN: juntando tabelas", ["pedidos", "clientes"], `
      <p>Um <b>JOIN</b> combina linhas de duas ou mais tabelas usando uma coluna em comum. Em <code>pedidos</code>, a coluna <code>cliente_id</code> aponta para o <code>id</code> de <code>clientes</code>:</p>
      <pre><code>SELECT pedidos.id, clientes.nome, pedidos.data
FROM pedidos
INNER JOIN clientes ON pedidos.cliente_id = clientes.id;</code></pre>
      <h3>Tipos de JOIN</h3>
      <ul>
        <li><code>INNER JOIN</code>: só as linhas que <b>combinam</b> nas duas tabelas;</li>
        <li><code>LEFT JOIN</code>: todas da tabela da <b>esquerda</b> + as que combinam da direita;</li>
        <li><code>RIGHT JOIN</code>: todas da <b>direita</b> + as que combinam da esquerda;</li>
        <li><code>FULL OUTER JOIN</code>: todas as linhas das duas, combinando quando dá.</li>
      </ul>`, [
      { texto: "Mostre o <code>id</code> do pedido, o <code>nome</code> do cliente e a <code>data</code> de cada pedido", solucao: "SELECT pedidos.id, clientes.nome, pedidos.data FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id;", checks: [valores] },
      { texto: "Mostre o <code>nome</code> de cada produto e o <code>nome</code> da sua categoria (tabelas <code>produtos</code> e <code>categorias</code>)", solucao: "SELECT produtos.nome, categorias.nome FROM produtos JOIN categorias ON produtos.categoria_id = categorias.id;", checks: [valores] }
    ]),
  lic("inner-join", "INNER JOIN", ["produtos", "categorias", "pedidos"], `
      <p><code>INNER JOIN</code> devolve só as linhas que têm par nas duas tabelas. Escrever só <code>JOIN</code> é a mesma coisa.</p>
      <pre><code>SELECT produtos.nome, categorias.nome AS categoria
FROM produtos
INNER JOIN categorias ON produtos.categoria_id = categorias.id;</code></pre>
      <p>Quando a mesma coluna existe nas duas tabelas (ex.: <code>nome</code>, <code>id</code>), escreva <code>tabela.coluna</code> para não dar ambiguidade.</p>
      <h3>Três tabelas</h3>
      <pre><code>SELECT pe.id, c.nome AS cliente, t.nome AS transportadora
FROM pedidos pe
JOIN clientes c ON c.id = pe.cliente_id
JOIN transportadoras t ON t.id = pe.transportadora_id;</code></pre>`, [
      { texto: "Mostre o nome dos produtos e de suas categorias, apenas da categoria <code>'Doces'</code>", solucao: "SELECT produtos.nome, categorias.nome FROM produtos INNER JOIN categorias ON produtos.categoria_id = categorias.id WHERE categorias.nome = 'Doces';", checks: [valores] },
      { texto: "Mostre o <code>id</code> do pedido, o nome do cliente e o nome da transportadora (3 tabelas)", solucao: "SELECT pe.id, c.nome, t.nome FROM pedidos pe JOIN clientes c ON c.id = pe.cliente_id JOIN transportadoras t ON t.id = pe.transportadora_id;", checks: [valores] },
      { texto: "Mostre o nome do produto e o nome do <b>fornecedor</b> de cada produto, ordenado pelo nome do produto", solucao: "SELECT p.nome, f.nome FROM produtos p JOIN fornecedores f ON f.id = p.fornecedor_id ORDER BY p.nome;", checks: [ordenado] }
    ]),
  lic("left-join", "LEFT JOIN", ["clientes", "pedidos"], `
      <p><code>LEFT JOIN</code> traz <b>todas</b> as linhas da tabela da esquerda, mesmo sem par. Onde não há par, as colunas da direita vêm <code>NULL</code>.</p>
      <pre><code>SELECT clientes.nome, pedidos.id
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id
ORDER BY clientes.nome;</code></pre>
      <p>Clientes que nunca compraram aparecem com <code>pedidos.id</code> nulo. Para listar <b>só</b> esses:</p>
      <pre><code>... WHERE pedidos.id IS NULL;</code></pre>
      <p>Em alguns bancos o nome é <code>LEFT OUTER JOIN</code> (é o mesmo).</p>`, [
      { texto: "Mostre o nome de <b>todos</b> os clientes e o <code>id</code> dos seus pedidos (quem não tem pedido aparece com NULL)", solucao: "SELECT clientes.nome, pedidos.id FROM clientes LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;", checks: [valores] },
      { texto: "Mostre só o nome dos clientes <b>sem nenhum pedido</b> (LEFT JOIN + <code>IS NULL</code>)", solucao: "SELECT clientes.nome FROM clientes LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id WHERE pedidos.id IS NULL;", checks: [valores] },
      { texto: "Mostre o nome de todos os produtos e a soma das quantidades vendidas de cada um (<code>LEFT JOIN</code> com <code>itens_pedido</code> e <code>GROUP BY</code>)", solucao: "SELECT p.nome, SUM(i.quantidade) FROM produtos p LEFT JOIN itens_pedido i ON i.produto_id = p.id GROUP BY p.id, p.nome;", checks: [valores] }
    ]),
  lic("right-join", "RIGHT JOIN", ["pedidos", "funcionarios"], `
      <p><code>RIGHT JOIN</code> é o espelho do LEFT: traz <b>todas</b> as linhas da tabela da <b>direita</b> e as que combinarem da esquerda.</p>
      <pre><code>SELECT pedidos.id, funcionarios.nome
FROM pedidos
RIGHT JOIN funcionarios ON pedidos.funcionario_id = funcionarios.id
ORDER BY pedidos.id;</code></pre>
      <p>Funcionários que não fizeram nenhuma venda aparecem com <code>pedidos.id</code> nulo.</p>
      <p>💡 Todo RIGHT JOIN pode ser escrito como LEFT JOIN trocando a ordem das tabelas, e muita gente prefere assim. O SQLite aceita RIGHT JOIN desde a versão 3.39.</p>`, [
      { texto: "Com <code>RIGHT JOIN</code>, mostre o <code>id</code> dos pedidos e o <code>nome</code> de <b>todos</b> os funcionários", solucao: "SELECT pedidos.id, funcionarios.nome FROM pedidos RIGHT JOIN funcionarios ON pedidos.funcionario_id = funcionarios.id;", checks: [valores] },
      { texto: "Mostre o nome dos funcionários que <b>não</b> têm nenhum pedido", solucao: "SELECT funcionarios.nome FROM pedidos RIGHT JOIN funcionarios ON pedidos.funcionario_id = funcionarios.id WHERE pedidos.id IS NULL;", checks: [valores] }
    ]),
  lic("full-join", "FULL OUTER JOIN", ["clientes", "fornecedores"], `
      <p><code>FULL OUTER JOIN</code> traz <b>todas</b> as linhas das duas tabelas: as que combinam ficam lado a lado e as sem par ganham <code>NULL</code> do outro lado.</p>
      <pre><code>SELECT clientes.nome, pedidos.id
FROM clientes
FULL OUTER JOIN pedidos ON clientes.id = pedidos.cliente_id;</code></pre>
      <p>⚠️ Pode gerar resultados enormes. O MySQL não tem FULL JOIN (usa-se <code>LEFT JOIN ... UNION ... RIGHT JOIN</code>); o SQLite tem desde a 3.39.</p>
      <p>Exemplo: cidades de clientes e de fornecedores lado a lado, para ver onde temos os dois.</p>`, [
      { texto: "Com <code>FULL OUTER JOIN</code>, junte <code>clientes</code> e <code>fornecedores</code> pela <b>cidade</b>, mostrando o nome do cliente e o nome do fornecedor", solucao: "SELECT clientes.nome, fornecedores.nome FROM clientes FULL OUTER JOIN fornecedores ON clientes.cidade = fornecedores.cidade;", checks: [valores] },
      { texto: "Do mesmo FULL JOIN, mostre só as linhas em que <b>existem os dois</b> (cliente e fornecedor na mesma cidade)", solucao: "SELECT clientes.nome, fornecedores.nome FROM clientes FULL OUTER JOIN fornecedores ON clientes.cidade = fornecedores.cidade WHERE clientes.id IS NOT NULL AND fornecedores.id IS NOT NULL;", checks: [valores] }
    ]),
  lic("self-join", "SELF JOIN", ["funcionarios", "clientes"], `
      <p>Um <b>self join</b> é um JOIN de uma tabela <b>com ela mesma</b>. Precisa de apelidos diferentes para cada “cópia”.</p>
      <p>Em <code>funcionarios</code>, <code>chefe_id</code> aponta para outro funcionário. Para ver cada pessoa e seu chefe:</p>
      <pre><code>SELECT f.nome AS funcionario, c.nome AS chefe
FROM funcionarios f
JOIN funcionarios c ON f.chefe_id = c.id;</code></pre>
      <p>Outro uso: pares de clientes da mesma cidade:</p>
      <pre><code>SELECT a.nome, b.nome, a.cidade
FROM clientes a, clientes b
WHERE a.id &lt; b.id AND a.cidade = b.cidade;</code></pre>`, [
      { texto: "Mostre o nome de cada funcionário e o nome do seu chefe", solucao: "SELECT f.nome, c.nome FROM funcionarios f JOIN funcionarios c ON f.chefe_id = c.id;", checks: [valores] },
      { texto: "Mostre os <b>pares de clientes</b> da mesma cidade (nome de um, nome do outro e a cidade), sem repetir pares (<code>a.id &lt; b.id</code>)", solucao: "SELECT a.nome, b.nome, a.cidade FROM clientes a, clientes b WHERE a.id < b.id AND a.cidade = b.cidade;", checks: [valores] },
      { texto: "Mostre o nome dos funcionários cujo chefe é a <code>'Helena'</code>", solucao: "SELECT f.nome FROM funcionarios f JOIN funcionarios c ON f.chefe_id = c.id WHERE c.nome = 'Helena';", checks: [valores] }
    ]),
  lic("union", "UNION", ["clientes", "fornecedores"], `
      <p><code>UNION</code> junta os resultados de dois <code>SELECT</code> <b>um embaixo do outro</b>, removendo repetições.</p>
      <pre><code>SELECT cidade FROM clientes
UNION
SELECT cidade FROM fornecedores
ORDER BY cidade;</code></pre>
      <ul>
        <li>Os dois SELECT precisam ter o <b>mesmo número de colunas</b>, com tipos parecidos e na mesma ordem.</li>
        <li>Os nomes das colunas do resultado vêm do primeiro SELECT.</li>
        <li>Pode ter <code>WHERE</code> em cada parte e uma coluna fixa para identificar a origem:</li>
      </ul>
      <pre><code>SELECT 'Cliente' AS tipo, nome, cidade FROM clientes
UNION
SELECT 'Fornecedor', nome, cidade FROM fornecedores;</code></pre>`, [
      { texto: "Liste as <b>cidades</b> de clientes e de fornecedores, sem repetir, em ordem alfabética", solucao: "SELECT cidade FROM clientes UNION SELECT cidade FROM fornecedores ORDER BY cidade;", checks: [ordenado] },
      { texto: "Liste os <b>países</b> de clientes e fornecedores, sem repetir", solucao: "SELECT pais FROM clientes UNION SELECT pais FROM fornecedores;", checks: [valores] },
      { texto: "Monte uma lista com <code>tipo</code> (<code>'Cliente'</code> ou <code>'Fornecedor'</code>), <code>nome</code> e <code>cidade</code> de todos os clientes e fornecedores do <code>'Brasil'</code>", solucao: "SELECT 'Cliente' AS tipo, nome, cidade FROM clientes WHERE pais = 'Brasil' UNION SELECT 'Fornecedor', nome, cidade FROM fornecedores WHERE pais = 'Brasil';", checks: [valores] }
    ]),
  lic("union-all", "UNION ALL", ["clientes", "fornecedores"], `
      <p><code>UNION ALL</code> faz o mesmo que <code>UNION</code>, mas <b>mantém as repetições</b>. Por não precisar comparar linhas, é mais rápido.</p>
      <pre><code>SELECT cidade FROM clientes
UNION ALL
SELECT cidade FROM fornecedores
ORDER BY cidade;</code></pre>
      <p>Use <code>UNION ALL</code> quando quiser contar ocorrências ou quando sabe que não há duplicados.</p>`, [
      { texto: "Liste as cidades de clientes e fornecedores <b>com</b> repetições, em ordem alfabética", solucao: "SELECT cidade FROM clientes UNION ALL SELECT cidade FROM fornecedores ORDER BY cidade;", checks: [ordenado] },
      { texto: "Liste o <code>pais</code> de clientes e fornecedores com repetições, só do <code>'Brasil'</code> e de <code>'Portugal'</code>", solucao: "SELECT pais FROM clientes WHERE pais IN ('Brasil', 'Portugal') UNION ALL SELECT pais FROM fornecedores WHERE pais IN ('Brasil', 'Portugal');", checks: [valores] }
    ]),
  lic("group-by", "GROUP BY", ["clientes", "pedidos", "transportadoras"], `
      <p><code>GROUP BY</code> junta as linhas com o mesmo valor em <b>grupos</b>, para usar funções de agregação em cada grupo. Ex.: “quantos clientes há em cada país?”</p>
      <pre><code>SELECT pais, COUNT(*) AS qtd
FROM clientes
GROUP BY pais
ORDER BY qtd DESC;</code></pre>
      <p>Regra de ouro: no <code>SELECT</code>, toda coluna que <b>não</b> está numa função de agregação deve estar no <code>GROUP BY</code>.</p>
      <p>Com JOIN: quantos pedidos cada transportadora levou:</p>
      <pre><code>SELECT t.nome, COUNT(p.id)
FROM pedidos p
LEFT JOIN transportadoras t ON t.id = p.transportadora_id
GROUP BY t.nome;</code></pre>`, [
      { texto: "Mostre cada <code>pais</code> e quantos clientes ele tem", solucao: "SELECT pais, COUNT(*) FROM clientes GROUP BY pais;", checks: [valores] },
      { texto: "Mostre cada país e a quantidade de clientes, do país com <b>mais</b> clientes para o com menos (desempate por nome do país)", solucao: "SELECT pais, COUNT(*) AS qtd FROM clientes GROUP BY pais ORDER BY qtd DESC, pais;", checks: [ordenado] },
      { texto: "Mostre o nome de cada transportadora e quantos pedidos ela levou", solucao: "SELECT t.nome, COUNT(p.id) FROM pedidos p JOIN transportadoras t ON t.id = p.transportadora_id GROUP BY t.nome;", checks: [valores] },
      { texto: "Mostre cada <code>categoria_id</code> e o preço médio dos seus produtos", solucao: "SELECT categoria_id, AVG(preco) FROM produtos GROUP BY categoria_id;", checks: [valores] }
    ]),
  lic("having", "HAVING", ["clientes", "pedidos", "funcionarios"], `
      <p><code>WHERE</code> filtra <b>linhas</b> antes de agrupar; <code>HAVING</code> filtra <b>grupos</b> depois, e por isso aceita funções de agregação.</p>
      <pre><code>-- países com mais de 2 clientes
SELECT pais, COUNT(*) FROM clientes
GROUP BY pais
HAVING COUNT(*) &gt; 2;</code></pre>
      <p>Ordem das partes: <code>SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT</code>.</p>
      <pre><code>-- funcionários com mais de 4 pedidos
SELECT f.nome, COUNT(p.id) AS pedidos
FROM pedidos p JOIN funcionarios f ON f.id = p.funcionario_id
GROUP BY f.nome
HAVING COUNT(p.id) &gt; 4;</code></pre>`, [
      { texto: "Mostre os países com <b>mais de 2</b> clientes (país e quantidade)", solucao: "SELECT pais, COUNT(*) FROM clientes GROUP BY pais HAVING COUNT(*) > 2;", checks: [valores] },
      { texto: "Mostre o nome dos funcionários com <b>mais de 4</b> pedidos e quantos pedidos cada um tem", solucao: "SELECT f.nome, COUNT(p.id) FROM pedidos p JOIN funcionarios f ON f.id = p.funcionario_id GROUP BY f.nome HAVING COUNT(p.id) > 4;", checks: [valores] },
      { texto: "Mostre as categorias (<code>categoria_id</code>) cujo preço médio é <b>maior que 30</b>", solucao: "SELECT categoria_id, AVG(preco) FROM produtos GROUP BY categoria_id HAVING AVG(preco) > 30;", checks: [valores] }
    ]),
  lic("exists", "EXISTS", ["fornecedores", "produtos", "clientes"], `
      <p><code>EXISTS</code> testa se uma subconsulta devolve <b>pelo menos uma linha</b>. Verdadeiro se sim.</p>
      <pre><code>-- fornecedores que têm algum produto com preço abaixo de 10
SELECT nome FROM fornecedores f
WHERE EXISTS (
  SELECT 1 FROM produtos p
  WHERE p.fornecedor_id = f.id AND p.preco &lt; 10
);</code></pre>
      <p>A subconsulta é <b>correlacionada</b>: usa <code>f.id</code> da consulta de fora. <code>NOT EXISTS</code> faz o contrário (ótimo para “quem nunca…”).</p>`, [
      { texto: "Mostre o nome dos fornecedores que têm algum produto com preço <b>abaixo de 10</b>", solucao: "SELECT nome FROM fornecedores f WHERE EXISTS (SELECT 1 FROM produtos p WHERE p.fornecedor_id = f.id AND p.preco < 10);", checks: [valores] },
      { texto: "Mostre o nome dos fornecedores que têm algum produto com preço <b>acima de 80</b>", solucao: "SELECT nome FROM fornecedores f WHERE EXISTS (SELECT 1 FROM produtos p WHERE p.fornecedor_id = f.id AND p.preco > 80);", checks: [valores] },
      { texto: "Com <code>NOT EXISTS</code>, mostre o nome dos clientes que nunca fizeram pedido", solucao: "SELECT nome FROM clientes c WHERE NOT EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);", checks: [valores] }
    ]),
  lic("any-all", "ANY e ALL", ["produtos", "itens_pedido"], `
      <p><code>ANY</code> e <code>ALL</code> comparam um valor com <b>uma lista</b> vinda de uma subconsulta:</p>
      <ul>
        <li><code>valor &gt; ANY (subconsulta)</code>: verdadeiro se for maior que <b>algum</b> valor da lista;</li>
        <li><code>valor &gt; ALL (subconsulta)</code>: verdadeiro se for maior que <b>todos</b>.</li>
      </ul>
      <pre><code>-- MySQL / PostgreSQL / SQL Server
SELECT nome FROM produtos
WHERE id = ANY (SELECT produto_id FROM itens_pedido WHERE quantidade = 10);

SELECT nome FROM produtos
WHERE preco &gt; ALL (SELECT preco FROM produtos WHERE categoria_id = 5);</code></pre>
      <h3>No SQLite</h3>
      <p>O SQLite não tem <code>ANY</code>/<code>ALL</code>, mas dá para escrever o mesmo de outro jeito (e essas formas funcionam em qualquer banco):</p>
      <ul>
        <li><code>= ANY (...)</code> → <code>IN (...)</code></li>
        <li><code>&gt; ANY (...)</code> → <code>&gt; (SELECT MIN(...))</code></li>
        <li><code>&gt; ALL (...)</code> → <code>&gt; (SELECT MAX(...))</code></li>
      </ul>`, [
      { texto: "Mostre o nome dos produtos que aparecem em algum item com <code>quantidade = 10</code> (equivalente a <code>= ANY</code>: use <code>IN</code>)", solucao: "SELECT nome FROM produtos WHERE id IN (SELECT produto_id FROM itens_pedido WHERE quantidade = 10);", checks: [valores] },
      { texto: "Mostre os produtos mais caros que <b>todos</b> os da categoria 5 (equivalente a <code>&gt; ALL</code>: use <code>&gt; (SELECT MAX(preco) …)</code>)", solucao: "SELECT nome FROM produtos WHERE preco > (SELECT MAX(preco) FROM produtos WHERE categoria_id = 5);", checks: [valores] },
      { texto: "Mostre os produtos mais caros que <b>algum</b> produto da categoria 6 (equivalente a <code>&gt; ANY</code>)", solucao: "SELECT nome FROM produtos WHERE preco > (SELECT MIN(preco) FROM produtos WHERE categoria_id = 6);", checks: [valores] }
    ]),
  lic("select-into", "SELECT INTO (copiar para nova tabela)", ["clientes"], `
      <p><code>SELECT INTO</code> copia dados para uma <b>tabela nova</b> (SQL Server / Access):</p>
      <pre><code>SELECT * INTO clientes_backup FROM clientes;
SELECT nome, contato INTO clientes_br FROM clientes WHERE pais = 'Brasil';</code></pre>
      <p>Um truque é criar uma tabela vazia com a mesma estrutura: <code>SELECT * INTO nova FROM antiga WHERE 1 = 0;</code></p>
      <h3>MySQL, PostgreSQL, SQLite</h3>
      <p>Nesses bancos o jeito é <code>CREATE TABLE ... AS SELECT</code>:</p>
      <pre><code>CREATE TABLE clientes_backup AS SELECT * FROM clientes;
CREATE TABLE clientes_br AS SELECT nome, contato FROM clientes WHERE pais = 'Brasil';</code></pre>`, [
      { texto: "Crie a tabela <code>clientes_backup</code> com uma cópia de todos os clientes", solucao: "CREATE TABLE clientes_backup AS SELECT * FROM clientes;", checks: [{ tipo: "contagem", sql: "SELECT * FROM clientes_backup", min: 20, max: 20, msg: "clientes_backup deveria ter os 20 clientes." }] },
      { texto: "Crie a tabela <code>clientes_espanha</code> só com <code>nome</code> e <code>cidade</code> dos clientes da <code>'Espanha'</code>", solucao: "CREATE TABLE clientes_espanha AS SELECT nome, cidade FROM clientes WHERE pais = 'Espanha';", checks: [{ tipo: "contagem", sql: "SELECT nome, cidade FROM clientes_espanha", min: 3, max: 3, msg: "clientes_espanha deveria ter os 3 clientes da Espanha." }] }
    ], { manual: true }),
  lic("insert-select", "INSERT INTO SELECT", ["clientes", "fornecedores"], `
      <p><code>INSERT INTO ... SELECT</code> copia dados de uma tabela para outra que <b>já existe</b>. As colunas precisam bater em quantidade e tipo.</p>
      <pre><code>INSERT INTO clientes (nome, cidade, pais)
SELECT nome, cidade, pais FROM fornecedores;</code></pre>
      <p>Com filtro:</p>
      <pre><code>INSERT INTO clientes (nome, cidade, pais)
SELECT nome, cidade, pais FROM fornecedores WHERE pais = 'Portugal';</code></pre>`, [
      { texto: "Copie para <code>clientes</code> (colunas <code>nome</code>, <code>cidade</code>, <code>pais</code>) os fornecedores de <code>'Portugal'</code>", solucao: "INSERT INTO clientes (nome, cidade, pais) SELECT nome, cidade, pais FROM fornecedores WHERE pais = 'Portugal';", checks: [{ tipo: "linha_existe", tabela: "clientes", coluna: "nome", valor: "Quinta do Douro" }, { tipo: "contagem", sql: "SELECT * FROM clientes", min: 21, max: 21, msg: "Só 1 fornecedor é de Portugal: clientes deveria ter 21 linhas. Clique em ↺ Resetar banco." }] },
      { texto: "Agora copie também (nome, cidade, pais) os fornecedores da <code>'Argentina'</code>", solucao: "INSERT INTO clientes (nome, cidade, pais) SELECT nome, cidade, pais FROM fornecedores WHERE pais = 'Argentina';", checks: [{ tipo: "linha_existe", tabela: "clientes", coluna: "nome", valor: "Molinos del Sur" }] }
    ], { manual: true }),
  lic("case", "CASE: se… então…", ["produtos", "itens_pedido", "clientes"], `
      <p><code>CASE</code> funciona como um “se/senão” dentro da consulta: testa as condições em ordem e devolve o valor da primeira verdadeira. Se nenhuma for e não houver <code>ELSE</code>, devolve <code>NULL</code>.</p>
      <pre><code>SELECT nome, preco,
  CASE
    WHEN preco &lt; 10 THEN 'Barato'
    WHEN preco &lt; 40 THEN 'Médio'
    ELSE 'Caro'
  END AS faixa
FROM produtos;</code></pre>
      <p>Também serve no <code>ORDER BY</code>:</p>
      <pre><code>SELECT nome, cidade, pais FROM clientes
ORDER BY (CASE WHEN cidade IS NULL THEN pais ELSE cidade END);</code></pre>`, [
      { texto: "Mostre <code>nome</code>, <code>preco</code> e uma coluna <code>faixa</code>: <code>'Barato'</code> (&lt; 10), <code>'Médio'</code> (&lt; 40) ou <code>'Caro'</code>", solucao: "SELECT nome, preco, CASE WHEN preco < 10 THEN 'Barato' WHEN preco < 40 THEN 'Médio' ELSE 'Caro' END AS faixa FROM produtos;", checks: [valores] },
      { texto: "Na tabela <code>itens_pedido</code>, mostre <code>id</code>, <code>quantidade</code> e um texto: <code>'Acima de 10'</code>, <code>'Igual a 10'</code> ou <code>'Abaixo de 10'</code>", solucao: "SELECT id, quantidade, CASE WHEN quantidade > 10 THEN 'Acima de 10' WHEN quantidade = 10 THEN 'Igual a 10' ELSE 'Abaixo de 10' END FROM itens_pedido;", checks: [valores] },
      { texto: "Conte quantos produtos há em cada faixa (<code>'Barato'</code>, <code>'Médio'</code>, <code>'Caro'</code>), agrupando pelo CASE", solucao: "SELECT CASE WHEN preco < 10 THEN 'Barato' WHEN preco < 40 THEN 'Médio' ELSE 'Caro' END AS faixa, COUNT(*) FROM produtos GROUP BY faixa;", checks: [valores] }
    ]),
  lic("funcoes-null", "Funções para NULL: IFNULL, COALESCE…", ["clientes", "fornecedores"], `
      <p>Contas com <code>NULL</code> dão <code>NULL</code> (ex.: <code>10 + NULL</code> = <code>NULL</code>). Para trocar o vazio por um valor padrão:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Banco</th><th>Função</th></tr></thead><tbody>
        <tr><td>MySQL / SQLite</td><td><code>IFNULL(coluna, 'padrão')</code> ou <code>COALESCE(...)</code></td></tr>
        <tr><td>SQL Server</td><td><code>ISNULL(coluna, 'padrão')</code> ou <code>COALESCE(...)</code></td></tr>
        <tr><td>MS Access</td><td><code>IIF(IsNull(coluna), 0, coluna)</code></td></tr>
        <tr><td>Oracle</td><td><code>NVL(coluna, 'padrão')</code> ou <code>COALESCE(...)</code></td></tr>
      </tbody></table>
      <p><code>COALESCE(a, b, c)</code> devolve o <b>primeiro</b> valor não nulo e funciona em todos os bancos.</p>
      <pre><code>SELECT nome, COALESCE(cep, 'sem CEP') FROM clientes;
SELECT nome, COALESCE(contato, nome) AS falar_com FROM clientes;</code></pre>`, [
      { texto: "Mostre <code>nome</code> e o <code>cep</code>, trocando o CEP vazio por <code>'sem CEP'</code>", solucao: "SELECT nome, COALESCE(cep, 'sem CEP') FROM clientes;", checks: [valores] },
      { texto: "Mostre <code>nome</code> e uma coluna <code>falar_com</code>: o <code>contato</code> ou, se ele for nulo, o próprio <code>nome</code>", solucao: "SELECT nome, COALESCE(contato, nome) AS falar_com FROM clientes;", checks: [colunas("nome", "falar_com"), valores] },
      { texto: "Mostre o nome e o telefone dos fornecedores, com <code>IFNULL</code> trocando telefone vazio por <code>'não informado'</code>", solucao: "SELECT nome, IFNULL(telefone, 'não informado') FROM fornecedores;", checks: [valores] }
    ]),
  {
    id: "procedures",
    secao: SECAO,
    titulo: "Stored procedures (procedimentos armazenados)",
    teoria: `
      <p>Uma <b>stored procedure</b> é um bloco de SQL <b>salvo no banco</b> com um nome, para ser executado sempre que preciso, inclusive com <b>parâmetros</b>. É útil para tarefas repetidas (fechar o caixa, gerar um relatório).</p>
      <h3>SQL Server</h3>
      <pre><code>CREATE PROCEDURE ClientesPorCidade @Cidade nvarchar(30)
AS
SELECT * FROM clientes WHERE cidade = @Cidade
GO;

EXEC ClientesPorCidade @Cidade = 'Lisboa';</code></pre>
      <h3>MySQL</h3>
      <pre><code>DELIMITER //
CREATE PROCEDURE clientes_por_cidade(IN p_cidade VARCHAR(30))
BEGIN
  SELECT * FROM clientes WHERE cidade = p_cidade;
END //
DELIMITER ;

CALL clientes_por_cidade('Lisboa');</code></pre>
      <p>Com vários parâmetros: <code>@Cidade nvarchar(30), @Cep nvarchar(10)</code> e <code>WHERE cidade = @Cidade AND cep = @Cep</code>.</p>
      <p>⚠️ O SQLite (usado neste guia) <b>não</b> tem procedures: nele essa lógica fica no programa (Python, JavaScript…). Na trilha <a href="#/trilha/mysql">🐬 MySQL</a> há exemplos completos de procedures, functions e triggers.</p>`,
    tarefas: []
  },
  lic("comentarios", "Comentários", ["clientes"], `
      <p>Comentários explicam o código e são <b>ignorados</b> pelo banco.</p>
      <pre><code>-- comentário de uma linha
SELECT * FROM clientes; -- também no fim da linha

/* comentário
   de várias linhas */
SELECT nome /*, contato */ FROM clientes;</code></pre>
      <p>Também servem para “desligar” um pedaço da consulta enquanto você testa. ⚠️ O MS Access não aceita comentários.</p>`, [
      { texto: "Escreva uma consulta que mostra o <code>nome</code> dos clientes e tenha um comentário <code>--</code> na linha de cima explicando o que ela faz", solucao: "-- lista o nome dos clientes\nSELECT nome FROM clientes;", checks: [colunas("nome")] },
      { texto: "Escreva <code>SELECT nome, cidade FROM clientes;</code> mas “desligue” a coluna <code>cidade</code> com <code>/* */</code>, para só o nome aparecer", solucao: "SELECT nome /*, cidade */ FROM clientes;", checks: [colunas("nome")] }
    ]),
  lic("operadores", "Operadores do SQL", ["produtos"], `
      <h3>Aritméticos</h3>
      <p><code>+</code> soma, <code>-</code> subtração, <code>*</code> multiplicação, <code>/</code> divisão, <code>%</code> resto.</p>
      <pre><code>SELECT nome, preco, preco * 1.1 AS com_aumento FROM produtos;</code></pre>
      <p>⚠️ No SQLite, <code>7 / 2</code> entre inteiros dá <code>3</code>; use <code>7 / 2.0</code> para obter <code>3.5</code>.</p>
      <h3>Comparação</h3>
      <p><code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, <code>&lt;&gt;</code>.</p>
      <h3>Lógicos</h3>
      <p><code>ALL</code>, <code>AND</code>, <code>ANY</code>, <code>BETWEEN</code>, <code>EXISTS</code>, <code>IN</code>, <code>LIKE</code>, <code>NOT</code>, <code>OR</code>, <code>SOME</code> (igual ao ANY).</p>
      <h3>Bit a bit e compostos</h3>
      <p><code>&amp;</code> (E), <code>|</code> (OU), <code>^</code> (OU exclusivo, no SQL Server/MySQL) e, no SQL Server, operadores compostos como <code>+=</code> e <code>-=</code>.</p>
      <h3>Texto</h3>
      <p>Juntar textos: <code>||</code> (SQLite, PostgreSQL, Oracle), <code>CONCAT()</code> (MySQL) ou <code>+</code> (SQL Server).</p>`, [
      { texto: "Mostre <code>nome</code>, <code>preco</code> e o preço com <b>10% de aumento</b> (<code>preco * 1.1</code>)", solucao: "SELECT nome, preco, preco * 1.1 FROM produtos;", checks: [valores] },
      { texto: "Mostre os produtos cujo <code>id</code> é <b>par</b> (resto da divisão por 2 igual a 0)", solucao: "SELECT * FROM produtos WHERE id % 2 = 0;", checks: [valores] },
      { texto: "Mostre <code>nome</code> e <code>preco</code> dos produtos com preço maior ou igual a 20 <b>e</b> menor ou igual a 30", solucao: "SELECT nome, preco FROM produtos WHERE preco >= 20 AND preco <= 30;", checks: [valores] }
    ])
];
