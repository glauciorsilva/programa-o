// "SQL na Prática": trilha interativa com banco SQLite rodando no navegador.
// Cada lição = teoria curta + exercício. As tarefas são corrigidas por "checks"
// (veja public/js/sqlpratica/motor.js).

/* ---------------- Bancos de dados base ---------------- */

const SEED_PIXAR = `
CREATE TABLE filmes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  diretor TEXT,
  ano INTEGER,
  duracao_minutos INTEGER
);
INSERT INTO filmes VALUES
 (1,'Toy Story','John Lasseter',1995,81),
 (2,'Vida de Inseto','John Lasseter',1998,95),
 (3,'Toy Story 2','John Lasseter',1999,93),
 (4,'Monstros S.A.','Pete Docter',2001,92),
 (5,'Procurando Nemo','Andrew Stanton',2003,107),
 (6,'Os Incríveis','Brad Bird',2004,116),
 (7,'Carros','John Lasseter',2006,117),
 (8,'Ratatouille','Brad Bird',2007,115),
 (9,'WALL-E','Andrew Stanton',2008,104),
 (10,'Up: Altas Aventuras','Pete Docter',2009,101),
 (11,'Toy Story 3','Lee Unkrich',2010,103),
 (12,'Carros 2','John Lasseter',2011,120),
 (13,'Valente','Brenda Chapman',2012,102),
 (14,'Universidade Monstros','Dan Scanlon',2013,110);

CREATE TABLE bilheteria (
  filme_id INTEGER,
  nota REAL,
  vendas_domesticas REAL,
  vendas_internacionais REAL
);
INSERT INTO bilheteria VALUES
 (5,8.2,380843261,555900000),
 (14,7.4,268492764,475066843),
 (8,8.0,206445654,417277164),
 (12,6.4,191452396,368400000),
 (3,7.9,245852179,239163000),
 (6,8.0,261441092,370001000),
 (9,8.5,223808164,297503696),
 (11,8.4,415004880,648167031),
 (1,8.3,191796233,170162503),
 (7,7.2,244082982,217900167),
 (10,8.3,293004164,438338580),
 (4,8.1,289916256,272900000),
 (2,7.2,162798565,200600000),
 (13,7.2,237283207,301700000);
`;

const SEED_MISC = `
CREATE TABLE cidades_america_norte (
  cidade TEXT, pais TEXT, populacao INTEGER, latitude REAL, longitude REAL
);
INSERT INTO cidades_america_norte VALUES
 ('Guadalajara','México',1500800,20.659699,-103.349609),
 ('Toronto','Canadá',2795060,43.653226,-79.383184),
 ('Houston','Estados Unidos',2195914,29.760427,-95.369803),
 ('Nova York','Estados Unidos',8405837,40.712784,-74.005941),
 ('Filadélfia','Estados Unidos',1553165,39.952584,-75.165222),
 ('Havana','Cuba',2106146,23.05407,-82.345189),
 ('Cidade do México','México',8555500,19.432608,-99.133208),
 ('Phoenix','Estados Unidos',1513367,33.448377,-112.074037),
 ('Los Angeles','Estados Unidos',3884307,34.052234,-118.243685),
 ('Ecatepec de Morelos','México',1742000,19.601841,-99.050674),
 ('Montreal','Canadá',1717767,45.501689,-73.567256),
 ('Chicago','Estados Unidos',2718782,41.878114,-87.629798);

CREATE TABLE predios (nome_predio TEXT, capacidade INTEGER);
INSERT INTO predios VALUES ('1L',24),('1O',32),('2L',16),('2O',20);

CREATE TABLE funcionarios (cargo TEXT, nome TEXT, predio TEXT, anos_empregado INTEGER);
INSERT INTO funcionarios VALUES
 ('Engenheiro','Becky A.','1L',4),
 ('Engenheiro','Dan B.','1L',2),
 ('Engenheiro','Sharon F.','1L',6),
 ('Engenheiro','Dan M.','1L',4),
 ('Engenheiro','Malcom S.','1L',1),
 ('Artista','Tylar S.','2O',2),
 ('Artista','Sherman D.','2O',8),
 ('Artista','Jakob J.','2O',6),
 ('Artista','Lillia A.','2O',7),
 ('Artista','Brandon J.','2O',7),
 ('Gerente','Scott K.','1L',9),
 ('Gerente','Shirlee M.','1L',3),
 ('Gerente','Daria O.','2O',6);
`;

export const SEEDS = { pixar: SEED_PIXAR, misc: SEED_MISC, completo: SEED_PIXAR + SEED_MISC };

/* ---------------- Atalhos para os checks ---------------- */

const colunas = (...c) => ({ tipo: "colunas", colunas: c });
const valores = { tipo: "valores" };
const ordenado = { tipo: "valores", ordenado: true };
const contagem = (sql, min, max = min, msg) => ({ tipo: "contagem", sql, min, max, msg });

const JOIN_FB = "FROM filmes JOIN bilheteria ON filmes.id = bilheteria.filme_id";

/* ---------------- Lições ---------------- */

export const LICOES = [
  {
    id: "0",
    titulo: "Introdução ao SQL",
    teoria: `
      <p><b>SQL</b> (<i>Structured Query Language</i>, ou Linguagem de Consulta Estruturada) é a linguagem usada para <b>consultar, alterar e transformar dados</b> guardados em bancos de dados <b>relacionais</b>. Ela é usada por programadores, analistas de dados, pessoal de marketing, financeiro… qualquer pessoa que precise tirar respostas de uma grande quantidade de informação.</p>
      <p>Existem vários <b>SGBDs</b> (Sistemas Gerenciadores de Banco de Dados) populares: <b>SQLite</b>, <b>MySQL</b>, <b>PostgreSQL</b>, <b>Oracle</b> e <b>SQL Server</b>. Todos seguem o padrão SQL e cada um acrescenta alguns recursos próprios. O que você aprender aqui serve para todos eles.</p>
      <h3>O que é um banco de dados relacional?</h3>
      <p>É um conjunto de <b>tabelas</b> (pense em planilhas) que se relacionam entre si. Cada tabela tem <b>colunas</b> fixas, que são as características (atributos) daquilo que ela guarda, e quantas <b>linhas</b> forem necessárias, uma para cada registro.</p>
      <p>Exemplo: imagine que o Detran guarda os veículos numa tabela <code>veiculos</code>:</p>
      <table class="sqlp-tabela-teoria">
        <thead><tr><th>id</th><th>marca_modelo</th><th>rodas</th><th>portas</th><th>tipo</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Ford Focus</td><td>4</td><td>4</td><td>Sedã</td></tr>
          <tr><td>2</td><td>Tesla Roadster</td><td>4</td><td>2</td><td>Esportivo</td></tr>
          <tr><td>3</td><td>Kawasaki Ninja</td><td>2</td><td>0</td><td>Motocicleta</td></tr>
          <tr><td>4</td><td>McLaren Formula 1</td><td>4</td><td>0</td><td>Corrida</td></tr>
          <tr><td>5</td><td>Tesla S</td><td>4</td><td>4</td><td>Sedã</td></tr>
        </tbody>
      </table>
      <p>Com SQL conseguimos responder perguntas como <i>“quais veículos têm menos de 4 rodas?”</i> ou <i>“quantos modelos a Tesla fabrica?”</i>, sem precisar olhar linha por linha.</p>
      <h3>Como esta trilha funciona</h3>
      <ul>
        <li>Primeiro você aprende a <b>ler</b> dados (consultas com <code>SELECT</code>), depois a <b>alterar</b> dados e, por fim, a <b>criar e apagar</b> tabelas.</li>
        <li>Cada lição tem uma explicação curta e um <b>exercício interativo</b>: um banco de dados de verdade (SQLite) roda no seu navegador.</li>
        <li>Escreva a consulta no editor e veja o resultado na hora. Quando a consulta atende ao que a tarefa pede, ela ganha um ✔ e a próxima aparece.</li>
        <li>Travou? Cada tarefa tem o link <b>“Ver a solução”</b>. Use sem culpa, mas tente antes!</li>
        <li>A próxima lição é liberada quando você conclui todas as tarefas da atual.</li>
      </ul>`,
    tarefas: []
  },
  {
    id: "1",
    titulo: "SELECT básico",
    banco: "pixar",
    tabelas: ["filmes"],
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Para ler dados de um banco usamos uma <b>consulta</b> (<i>query</i>), que começa com <code>SELECT</code>. Ela diz <b>quais dados</b> queremos, <b>de onde</b> eles vêm e, se quisermos, como transformá-los antes de mostrar.</p>
      <p>Pense numa tabela como um tipo de coisa, por exemplo <i>cachorros</i>. Cada <b>linha</b> é um cachorro específico (um pug, um vira-lata…) e cada <b>coluna</b> é uma característica que todos têm (nome, cor do pelo, idade).</p>
      <pre><code>SELECT coluna, outra_coluna, …
FROM minha_tabela;</code></pre>
      <ul>
        <li><code>SELECT</code>: lista as colunas que você quer ver, separadas por vírgula.</li>
        <li><code>FROM</code>: diz de qual tabela os dados vêm.</li>
        <li>O <code>;</code> marca o fim do comando.</li>
      </ul>
      <p>Para trazer <b>todas</b> as colunas de uma vez, use o asterisco:</p>
      <pre><code>SELECT * FROM minha_tabela;</code></pre>
      <p>No trabalho, o <code>SELECT *</code> é ótimo para “dar uma olhada” numa tabela. Em sistemas de verdade, prefira listar só as colunas que você precisa: a consulta fica mais rápida e mais clara.</p>
      <p>Neste exercício vamos usar a tabela <code>filmes</code>, com os primeiros filmes de um estúdio de animação.</p>`,
    tarefas: [
      { texto: "Encontre o <code>titulo</code> de cada filme", solucao: "SELECT titulo FROM filmes;", checks: [colunas("titulo")] },
      { texto: "Encontre o <code>diretor</code> de cada filme", solucao: "SELECT diretor FROM filmes;", checks: [colunas("diretor")] },
      { texto: "Encontre o <code>titulo</code> e o <code>diretor</code> de cada filme", solucao: "SELECT titulo, diretor FROM filmes;", checks: [colunas("titulo", "diretor")] },
      { texto: "Encontre o <code>titulo</code> e o <code>ano</code> de cada filme", solucao: "SELECT titulo, ano FROM filmes;", checks: [colunas("titulo", "ano")] },
      { texto: "Encontre <b>todas</b> as informações de cada filme", solucao: "SELECT * FROM filmes;", checks: [valores] }
    ]
  },
  {
    id: "2",
    titulo: "Consultas com condições (parte 1)",
    banco: "pixar",
    tabelas: ["filmes"],
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Quase nunca queremos <i>todas</i> as linhas. Para filtrar, usamos <code>WHERE</code>: só as linhas em que a condição for verdadeira aparecem no resultado. Dá para combinar várias condições com <code>AND</code> (todas precisam ser verdadeiras) e <code>OR</code> (basta uma ser verdadeira).</p>
      <pre><code>SELECT coluna, …
FROM minha_tabela
WHERE condicao
  AND/OR outra_condicao …;</code></pre>
      <p>Operadores mais usados com números:</p>
      <table class="sqlp-tabela-teoria">
        <thead><tr><th>Operador</th><th>Condição</th><th>Exemplo</th></tr></thead>
        <tbody>
          <tr><td><code>=, !=, &lt;, &lt;=, &gt;, &gt;=</code></td><td>Comparação</td><td><code>col != 4</code></td></tr>
          <tr><td><code>BETWEEN … AND …</code></td><td>Dentro do intervalo (inclui as pontas)</td><td><code>col BETWEEN 1.5 AND 10.5</code></td></tr>
          <tr><td><code>NOT BETWEEN … AND …</code></td><td>Fora do intervalo</td><td><code>col NOT BETWEEN 1 AND 10</code></td></tr>
          <tr><td><code>IN (…)</code></td><td>Está na lista</td><td><code>col IN (2, 4, 6)</code></td></tr>
          <tr><td><code>NOT IN (…)</code></td><td>Não está na lista</td><td><code>col NOT IN (1, 3, 5)</code></td></tr>
        </tbody>
      </table>
      <p>Exemplo do dia a dia: <code>SELECT * FROM pedidos WHERE valor &gt;= 100 AND status = 'pago';</code> lista os pedidos pagos de 100 reais ou mais.</p>
      <p>💡 <b>Você sabia?</b> As palavras-chave do SQL não diferenciam maiúsculas de minúsculas: <code>select</code> e <code>SELECT</code> funcionam igual. Escrever em MAIÚSCULAS é só um costume para facilitar a leitura.</p>`,
    tarefas: [
      { texto: "Encontre o filme com <code>id</code> igual a 6", solucao: "SELECT titulo FROM filmes WHERE id = 6;", checks: [valores] },
      { texto: "Encontre os filmes lançados entre os anos 2000 e 2010", solucao: "SELECT titulo FROM filmes WHERE ano BETWEEN 2000 AND 2010;", checks: [valores] },
      { texto: "Encontre os filmes <b>não</b> lançados entre os anos 2000 e 2010", solucao: "SELECT titulo FROM filmes WHERE ano < 2000 OR ano > 2010;", checks: [valores] },
      { texto: "Encontre os 5 primeiros filmes do estúdio e o <code>ano</code> de cada um (dica: olhe a coluna ano)", solucao: "SELECT titulo, ano FROM filmes WHERE ano <= 2003;", checks: [valores] }
    ]
  },
  {
    id: "3",
    titulo: "Consultas com condições (parte 2): textos",
    banco: "pixar",
    tabelas: ["filmes"],
    preload: "INSERT INTO filmes VALUES (87,'WALL-G','Brenda Chapman',2042,97);",
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Também dá para filtrar colunas de <b>texto</b>. Os operadores mais comuns:</p>
      <table class="sqlp-tabela-teoria">
        <thead><tr><th>Operador</th><th>Condição</th><th>Exemplo</th></tr></thead>
        <tbody>
          <tr><td><code>=</code></td><td>Igual, exatamente (diferencia maiúsculas)</td><td><code>col = 'abc'</code></td></tr>
          <tr><td><code>!=</code> ou <code>&lt;&gt;</code></td><td>Diferente, exatamente</td><td><code>col != 'abcd'</code></td></tr>
          <tr><td><code>LIKE</code></td><td>Igual, sem diferenciar maiúsculas</td><td><code>col LIKE 'ABC'</code></td></tr>
          <tr><td><code>NOT LIKE</code></td><td>Diferente, sem diferenciar maiúsculas</td><td><code>col NOT LIKE 'ABCD'</code></td></tr>
          <tr><td><code>%</code></td><td>Coringa: zero ou mais caracteres (usado com LIKE)</td><td><code>col LIKE '%AT%'</code></td></tr>
          <tr><td><code>_</code></td><td>Coringa: exatamente um caractere (usado com LIKE)</td><td><code>col LIKE 'AN_'</code></td></tr>
          <tr><td><code>IN (…)</code> / <code>NOT IN (…)</code></td><td>Está / não está na lista</td><td><code>col IN ('A', 'B')</code></td></tr>
        </tbody>
      </table>
      <ul>
        <li>Textos ficam sempre entre <b>aspas simples</b>: <code>'John Lasseter'</code>.</li>
        <li><code>'Toy%'</code> = começa com “Toy”; <code>'%Story'</code> = termina com “Story”; <code>'%oy%'</code> = tem “oy” em qualquer lugar.</li>
        <li>Exemplo real: <code>WHERE email LIKE '%@gmail.com'</code> encontra todos os clientes com e-mail do Gmail.</li>
      </ul>
      <p>Para buscas de texto pesadas (como a busca de um site enorme), as empresas usam ferramentas próprias, como Elasticsearch. Para o dia a dia, <code>LIKE</code> resolve.</p>`,
    tarefas: [
      { texto: "Encontre todos os filmes <i>Toy Story</i>", solucao: "SELECT titulo FROM filmes WHERE titulo LIKE 'Toy Story%';", checks: [valores] },
      { texto: "Encontre todos os filmes dirigidos por John Lasseter", solucao: "SELECT titulo FROM filmes WHERE diretor = 'John Lasseter';", checks: [valores] },
      { texto: "Encontre todos os filmes (e o diretor) <b>não</b> dirigidos por John Lasseter", solucao: "SELECT titulo, diretor FROM filmes WHERE diretor != 'John Lasseter';", checks: [valores] },
      { texto: "Encontre todos os filmes “WALL-*”", solucao: "SELECT titulo FROM filmes WHERE titulo LIKE 'WALL-_';", checks: [valores] }
    ]
  },
  {
    id: "4",
    titulo: "Filtrando e ordenando resultados",
    banco: "pixar",
    tabelas: ["filmes"],
    // Embaralha a ordem física das linhas para que ORDER BY seja necessário.
    preload: `CREATE TABLE f2 (id INTEGER, titulo TEXT, diretor TEXT, ano INTEGER, duracao_minutos INTEGER);
INSERT INTO f2 SELECT * FROM filmes ORDER BY (id * 7) % 15;
DROP TABLE filmes;
ALTER TABLE f2 RENAME TO filmes;`,
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Três ferramentas para organizar o resultado:</p>
      <ul>
        <li><code>DISTINCT</code> remove linhas <b>repetidas</b>. Atenção: ele compara a linha inteira (todas as colunas do SELECT). Para agrupar por uma coluna específica, veremos o <code>GROUP BY</code> mais adiante.</li>
        <li><code>ORDER BY coluna ASC|DESC</code> <b>ordena</b> o resultado: <code>ASC</code> do menor para o maior (A→Z, padrão) e <code>DESC</code> do maior para o menor. Dados reais costumam vir sem nenhuma ordem garantida, então sempre ordene quando a ordem importar.</li>
        <li><code>LIMIT n</code> traz no máximo <i>n</i> linhas, e <code>OFFSET m</code> pula as <i>m</i> primeiras. Juntos, eles são a base da <b>paginação</b> (“página 2 dos resultados”). Eles são aplicados por último, depois de filtrar e ordenar.</li>
      </ul>
      <pre><code>SELECT DISTINCT coluna, …
FROM minha_tabela
WHERE condicao
ORDER BY coluna ASC/DESC
LIMIT n OFFSET m;</code></pre>
      <p>Exemplo real: uma loja mostra 20 produtos por página. A página 3 seria <code>ORDER BY nome LIMIT 20 OFFSET 40</code>.</p>
      <p>Neste exercício as linhas da tabela foram <b>embaralhadas</b>: use <code>ORDER BY</code> para colocá-las na ordem certa.</p>`,
    tarefas: [
      { texto: "Liste todos os diretores em ordem alfabética, sem repetição", solucao: "SELECT DISTINCT diretor FROM filmes ORDER BY diretor ASC;", checks: [ordenado] },
      { texto: "Liste os 4 últimos filmes lançados (do mais recente ao mais antigo)", solucao: "SELECT titulo FROM filmes ORDER BY ano DESC LIMIT 4;", checks: [ordenado] },
      { texto: "Liste os <b>primeiros</b> 5 filmes em ordem alfabética", solucao: "SELECT titulo FROM filmes ORDER BY titulo ASC LIMIT 5;", checks: [ordenado] },
      { texto: "Liste os <b>próximos</b> 5 filmes em ordem alfabética", solucao: "SELECT titulo FROM filmes ORDER BY titulo ASC LIMIT 5 OFFSET 5;", checks: [ordenado] }
    ]
  },
  {
    id: "5",
    titulo: "Revisão: consultas simples",
    banco: "misc",
    tabelas: ["cidades_america_norte"],
    inicial: "SELECT * FROM cidades_america_norte;",
    teoria: `
      <p>Hora de revisar tudo o que vimos até aqui. A estrutura completa de uma consulta simples é:</p>
      <pre><code>SELECT coluna, outra_coluna, …
FROM minha_tabela
WHERE condicao(oes)
ORDER BY coluna ASC/DESC
LIMIT n OFFSET m;</code></pre>
      <p>Agora a tabela é outra: <code>cidades_america_norte</code>, com as cidades mais populosas da América do Norte, seu país, população e localização (latitude e longitude).</p>
      <p>📍 Uma dica de geografia: como todas essas cidades ficam <b>ao norte</b> da linha do Equador e <b>a oeste</b> do meridiano de Greenwich, todas têm <b>latitude positiva</b> e <b>longitude negativa</b>. Quanto maior a latitude, mais ao norte; quanto mais negativa a longitude, mais a oeste.</p>
      <p>Lembre-se de escrever os países exatamente como aparecem na tabela, com acento: <code>'Canadá'</code>, <code>'México'</code>, <code>'Estados Unidos'</code>.</p>`,
    tarefas: [
      { texto: "Liste todas as cidades do Canadá e suas populações", solucao: "SELECT cidade, populacao FROM cidades_america_norte WHERE pais = 'Canadá';", checks: [valores] },
      { texto: "Ordene todas as cidades dos Estados Unidos pela latitude, de norte a sul", solucao: "SELECT cidade FROM cidades_america_norte WHERE pais = 'Estados Unidos' ORDER BY latitude DESC;", checks: [ordenado] },
      { texto: "Liste todas as cidades a oeste de Chicago, ordenadas de oeste para leste", solucao: "SELECT cidade FROM cidades_america_norte WHERE longitude < -87.629798 ORDER BY longitude ASC;", checks: [ordenado] },
      { texto: "Liste as duas maiores cidades do México (em população)", solucao: "SELECT cidade FROM cidades_america_norte WHERE pais = 'México' ORDER BY populacao DESC LIMIT 2;", checks: [ordenado] },
      { texto: "Liste a terceira e a quarta maiores cidades dos Estados Unidos, com suas populações", solucao: "SELECT cidade, populacao FROM cidades_america_norte WHERE pais = 'Estados Unidos' ORDER BY populacao DESC LIMIT 2 OFFSET 2;", checks: [ordenado] }
    ]
  },
  {
    id: "6",
    titulo: "Consultas com várias tabelas (JOIN)",
    banco: "pixar",
    tabelas: ["filmes", "bilheteria"],
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Em bancos reais, as informações de uma mesma coisa costumam ficar espalhadas em <b>várias tabelas</b>. Isso se chama <b>normalização</b>: dividir os dados evita repetição (o nome do cliente não precisa ser copiado em cada pedido) e permite que cada parte cresça de forma independente. O custo é que as consultas ficam um pouco mais elaboradas.</p>
      <ul>
        <li><b>Chave primária</b> (<i>primary key</i>): coluna que identifica cada linha de forma única. Normalmente é um número inteiro que aumenta sozinho (<code>id</code>).</li>
        <li>Outra tabela pode guardar esse <code>id</code> para dizer “esta linha se refere àquela”. Aqui, <code>bilheteria.filme_id</code> aponta para <code>filmes.id</code>.</li>
      </ul>
      <p>O <code>INNER JOIN</code> junta as linhas das duas tabelas que têm a mesma chave, conforme a condição do <code>ON</code>. Escrever só <code>JOIN</code> é a mesma coisa que <code>INNER JOIN</code>.</p>
      <pre><code>SELECT colunas
FROM tabela1
INNER JOIN tabela2
  ON tabela1.id = tabela2.id_referencia
WHERE …
ORDER BY …
LIMIT …;</code></pre>
      <p>Exemplo real: <code>SELECT pedidos.id, clientes.nome FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id;</code> mostra cada pedido com o nome do cliente.</p>
      <p>Quando duas tabelas têm colunas com o mesmo nome, escreva <code>tabela.coluna</code> para dizer de qual delas você está falando.</p>`,
    tarefas: [
      { texto: "Encontre as vendas domésticas e internacionais de cada filme", solucao: `SELECT titulo, vendas_domesticas, vendas_internacionais ${JOIN_FB};`, checks: [valores] },
      { texto: "Mostre os números de vendas de cada filme que foi <b>melhor no exterior</b> do que no mercado doméstico", solucao: `SELECT titulo, vendas_domesticas, vendas_internacionais ${JOIN_FB} WHERE vendas_internacionais > vendas_domesticas;`, checks: [valores, { tipo: "maior_igual", a: "vendas_internacionais", b: "vendas_domesticas" }] },
      { texto: "Liste todos os filmes pela nota, em ordem decrescente", solucao: `SELECT titulo ${JOIN_FB} ORDER BY nota DESC;`, checks: [ordenado] }
    ]
  },
  {
    id: "7",
    titulo: "OUTER JOINs",
    banco: "misc",
    tabelas: ["predios", "funcionarios"],
    inicial: "SELECT * FROM funcionarios;",
    teoria: `
      <p>O <code>INNER JOIN</code> só traz as linhas que têm par <b>nas duas</b> tabelas. Quando as tabelas são “desiguais” (por exemplo, um prédio sem nenhum funcionário), essas linhas somem do resultado. Para não perder dados, usamos os <b>OUTER JOINs</b>:</p>
      <ul>
        <li><code>LEFT JOIN</code>: mantém <b>todas</b> as linhas da tabela da esquerda (a do <code>FROM</code>), mesmo que não tenham par na outra.</li>
        <li><code>RIGHT JOIN</code>: o contrário, mantém todas as linhas da tabela da direita.</li>
        <li><code>FULL JOIN</code>: mantém todas as linhas das duas tabelas.</li>
      </ul>
      <p>Quando uma linha não tem par, as colunas da outra tabela aparecem como <code>NULL</code> (vazio).</p>
      <pre><code>SELECT colunas
FROM tabela1
LEFT JOIN tabela2
  ON tabela1.id = tabela2.id_referencia;</code></pre>
      <p>Você pode ver <code>LEFT OUTER JOIN</code> escrito em códigos antigos: é exatamente igual a <code>LEFT JOIN</code>.</p>
      <p>Exemplo real: listar <b>todos</b> os clientes com a quantidade de pedidos, incluindo quem nunca comprou, precisa de um <code>LEFT JOIN</code>.</p>
      <p>Neste exercício use <code>LEFT JOIN</code>. A tabela <code>predios</code> tem o nome e a capacidade de cada prédio; <code>funcionarios.predio</code> diz onde cada pessoa trabalha.</p>`,
    tarefas: [
      { texto: "Liste todos os prédios que têm funcionários", solucao: "SELECT DISTINCT predio FROM funcionarios;", checks: [valores] },
      { texto: "Liste todos os prédios e suas capacidades", solucao: "SELECT * FROM predios;", checks: [valores] },
      { texto: "Liste todos os prédios e os cargos distintos em cada um (incluindo os prédios vazios)", solucao: "SELECT DISTINCT nome_predio, cargo FROM predios LEFT JOIN funcionarios ON nome_predio = predio;", checks: [valores] }
    ]
  },
  {
    id: "8",
    titulo: "Uma nota sobre NULL",
    banco: "misc",
    tabelas: ["predios", "funcionarios"],
    preload: `INSERT INTO funcionarios (cargo, nome, predio, anos_empregado) VALUES ('Engenheiro','Yancy I.',NULL,0);
INSERT INTO funcionarios (cargo, nome, predio, anos_empregado) VALUES ('Artista','Oliver P.',NULL,0);`,
    inicial: "SELECT * FROM funcionarios;",
    teoria: `
      <p><code>NULL</code> significa “sem valor”: não é zero, não é texto vazio, é a <b>ausência</b> de informação.</p>
      <ul>
        <li>Sempre que fizer sentido, evite <code>NULL</code> usando um valor padrão (0 para números, <code>''</code> para textos).</li>
        <li>Mas às vezes o <code>NULL</code> é o certo: se a nota de um aluno ainda não saiu, colocar 0 estragaria a média da turma.</li>
        <li>Em alguns casos ele aparece sozinho, como no resultado de um <code>LEFT JOIN</code> sem par.</li>
      </ul>
      <p>Para testar se algo é nulo, use <code>IS NULL</code> ou <code>IS NOT NULL</code>. <b>Nunca</b> use <code>= NULL</code>: essa comparação nunca dá verdadeiro.</p>
      <pre><code>SELECT coluna, …
FROM minha_tabela
WHERE coluna IS NULL
  AND/OR outra_coluna IS NOT NULL;</code></pre>
      <p>Exemplo real: <code>SELECT * FROM clientes WHERE telefone IS NULL;</code> encontra quem ainda não cadastrou telefone.</p>
      <p>Neste exercício, dois funcionários novos ainda não têm prédio definido.</p>`,
    tarefas: [
      { texto: "Encontre o nome e o cargo dos funcionários que ainda não foram designados para um prédio", solucao: "SELECT nome, cargo FROM funcionarios WHERE predio IS NULL;", checks: [valores] },
      { texto: "Encontre os nomes dos prédios que não têm nenhum funcionário", solucao: "SELECT DISTINCT nome_predio FROM predios LEFT JOIN funcionarios ON nome_predio = predio WHERE cargo IS NULL;", checks: [valores] }
    ]
  },
  {
    id: "9",
    titulo: "Consultas com expressões",
    banco: "pixar",
    tabelas: ["filmes", "bilheteria"],
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Além de colunas, o <code>SELECT</code> aceita <b>expressões</b>: contas (<code>+ - * / %</code>), funções de texto, de data etc. Por exemplo, <code>preco * 1.1</code> mostra o preço com 10% de aumento, sem alterar a tabela.</p>
      <p>Para o resultado ficar legível, dê um <b>apelido</b> (<i>alias</i>) à expressão com <code>AS</code>. Tabelas também podem ter apelido, o que encurta consultas com JOIN.</p>
      <pre><code>SELECT expressao AS apelido, …
FROM minha_tabela AS t
WHERE expressao;</code></pre>
      <ul>
        <li><code>%</code> é o resto da divisão: <code>ano % 2 = 0</code> significa “ano par”.</li>
        <li>As funções disponíveis mudam de um banco para outro (SQLite, MySQL, PostgreSQL…). Consulte a documentação do banco que você usa.</li>
      </ul>
      <p>Exemplo real: <code>SELECT nome, salario * 12 AS salario_anual FROM funcionarios;</code></p>`,
    tarefas: [
      { texto: "Liste todos os filmes e o total de vendas (doméstica + internacional) em <b>milhões</b> de dólares", solucao: `SELECT titulo, (vendas_domesticas + vendas_internacionais) / 1000000 AS vendas_milhoes ${JOIN_FB};`, checks: [valores] },
      { texto: "Liste todos os filmes e suas notas <b>em porcentagem</b>", solucao: `SELECT titulo, nota * 10 AS nota_percentual ${JOIN_FB};`, checks: [valores] },
      { texto: "Liste todos os filmes lançados em anos <b>pares</b>", solucao: "SELECT titulo FROM filmes WHERE ano % 2 = 0;", checks: [valores] }
    ]
  },
  {
    id: "10",
    titulo: "Agregações (parte 1)",
    banco: "misc",
    tabelas: ["funcionarios"],
    inicial: "SELECT * FROM funcionarios;",
    teoria: `
      <p><b>Funções de agregação</b> resumem várias linhas em um único valor: o total, a média, o maior… São a base de relatórios e painéis.</p>
      <pre><code>SELECT FUNCAO_AGREGADA(coluna) AS descricao, …
FROM minha_tabela
WHERE condicao
GROUP BY coluna;</code></pre>
      <table class="sqlp-tabela-teoria">
        <thead><tr><th>Função</th><th>O que faz</th></tr></thead>
        <tbody>
          <tr><td><code>COUNT(*)</code>, <code>COUNT(coluna)</code></td><td>Conta as linhas (com uma coluna, conta só as que não são NULL)</td></tr>
          <tr><td><code>MIN(coluna)</code></td><td>Menor valor</td></tr>
          <tr><td><code>MAX(coluna)</code></td><td>Maior valor</td></tr>
          <tr><td><code>AVG(coluna)</code></td><td>Média</td></tr>
          <tr><td><code>SUM(coluna)</code></td><td>Soma</td></tr>
        </tbody>
      </table>
      <ul>
        <li>Sem <code>GROUP BY</code>, a função resume <b>todas</b> as linhas em um único resultado.</li>
        <li>Com <code>GROUP BY coluna</code>, as linhas são separadas em grupos (uma para cada valor da coluna) e a função dá <b>um resultado por grupo</b>.</li>
      </ul>
      <p>Exemplo real: <code>SELECT vendedor, SUM(valor) FROM vendas GROUP BY vendedor;</code> mostra quanto cada vendedor vendeu.</p>`,
    tarefas: [
      { texto: "Encontre o maior tempo de casa (em anos) entre todos os funcionários", solucao: "SELECT MAX(anos_empregado) AS max_anos FROM funcionarios;", checks: [valores] },
      { texto: "Para cada cargo, encontre a média de anos de casa dos funcionários", solucao: "SELECT cargo, AVG(anos_empregado) AS media_anos FROM funcionarios GROUP BY cargo;", checks: [valores] },
      { texto: "Encontre o total de anos trabalhados pelos funcionários de cada prédio", solucao: "SELECT predio, SUM(anos_empregado) AS total_anos FROM funcionarios GROUP BY predio;", checks: [valores] }
    ]
  },
  {
    id: "11",
    titulo: "Agregações (parte 2): HAVING",
    banco: "misc",
    tabelas: ["funcionarios"],
    inicial: "SELECT * FROM funcionarios;",
    teoria: `
      <p>E se quisermos filtrar <b>os grupos</b>? Por exemplo: “só os vendedores que venderam mais de 10 mil”. O <code>WHERE</code> não serve, porque ele é aplicado <b>antes</b> do agrupamento, linha por linha. Para filtrar depois do <code>GROUP BY</code>, usamos <code>HAVING</code>, que tem a mesma sintaxe de condição do <code>WHERE</code>.</p>
      <pre><code>SELECT grupo, FUNCAO_AGREGADA(coluna) AS descricao
FROM minha_tabela
WHERE condicao_das_linhas
GROUP BY grupo
HAVING condicao_dos_grupos;</code></pre>
      <ul>
        <li><code>WHERE</code> = filtra <b>linhas</b>, antes de agrupar.</li>
        <li><code>HAVING</code> = filtra <b>grupos</b>, depois de agrupar (pode usar <code>COUNT</code>, <code>SUM</code>…).</li>
        <li>Se a consulta não tem <code>GROUP BY</code>, basta o <code>WHERE</code>.</li>
      </ul>
      <p>Exemplo real: <code>SELECT cliente_id, COUNT(*) FROM pedidos GROUP BY cliente_id HAVING COUNT(*) &gt;= 5;</code> encontra os clientes fiéis, com 5 pedidos ou mais.</p>`,
    tarefas: [
      { texto: "Descubra quantos Artistas há no estúdio (sem usar <code>HAVING</code>)", solucao: "SELECT COUNT(*) AS total_artistas FROM funcionarios WHERE cargo = 'Artista';", checks: [valores] },
      { texto: "Descubra quantos funcionários há em cada cargo", solucao: "SELECT cargo, COUNT(*) AS quantidade FROM funcionarios GROUP BY cargo;", checks: [valores] },
      { texto: "Encontre o total de anos trabalhados por todos os Engenheiros", solucao: "SELECT SUM(anos_empregado) AS total_anos FROM funcionarios GROUP BY cargo HAVING cargo = 'Engenheiro';", checks: [valores] }
    ]
  },
  {
    id: "12",
    titulo: "Ordem de execução de uma consulta",
    banco: "pixar",
    tabelas: ["filmes", "bilheteria"],
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Agora você já conhece todas as partes de uma consulta. Juntas, elas ficam assim:</p>
      <pre><code>SELECT DISTINCT coluna, FUNCAO(coluna_ou_expressao), …
FROM minha_tabela
  JOIN outra_tabela ON minha_tabela.coluna = outra_tabela.coluna
WHERE condicao
GROUP BY coluna
HAVING condicao
ORDER BY coluna ASC/DESC
LIMIT n OFFSET m;</code></pre>
      <p>Mas o banco <b>não executa na ordem em que escrevemos</b>. A ordem real é:</p>
      <ol>
        <li><code>FROM</code> e <code>JOIN</code>s: monta o conjunto de dados.</li>
        <li><code>WHERE</code>: descarta linhas. Os apelidos criados no SELECT ainda não existem aqui.</li>
        <li><code>GROUP BY</code>: forma os grupos.</li>
        <li><code>HAVING</code>: descarta grupos.</li>
        <li><code>SELECT</code>: calcula as colunas e expressões.</li>
        <li><code>DISTINCT</code>: remove as linhas repetidas.</li>
        <li><code>ORDER BY</code>: ordena (aqui já dá para usar os apelidos).</li>
        <li><code>LIMIT</code> / <code>OFFSET</code>: corta o resultado.</li>
      </ol>
      <p>Entender essa ordem explica vários erros comuns, como “a coluna apelido não existe” ao usar um apelido no <code>WHERE</code>. É também uma pergunta frequente em entrevistas de emprego!</p>`,
    tarefas: [
      { texto: "Descubra quantos filmes cada diretor dirigiu", solucao: "SELECT diretor, COUNT(id) AS qtd_filmes FROM filmes GROUP BY diretor;", checks: [valores] },
      { texto: "Descubra o total de vendas (doméstica + internacional) atribuído a cada diretor", solucao: `SELECT diretor, SUM(vendas_domesticas + vendas_internacionais) AS vendas_totais FROM filmes INNER JOIN bilheteria ON filmes.id = bilheteria.filme_id GROUP BY diretor;`, checks: [valores] }
    ]
  },
  {
    id: "13",
    titulo: "Inserindo linhas",
    banco: "pixar",
    tabelas: ["filmes", "bilheteria"],
    preload: "DELETE FROM filmes WHERE id > 3; DELETE FROM bilheteria WHERE filme_id > 3;",
    manual: true,
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Até aqui só lemos dados. A partir de agora vamos <b>alterar</b> o banco. Antes, um conceito: o <b>esquema</b> (<i>schema</i>) define a estrutura de cada tabela, ou seja, quais colunas ela tem e o tipo de cada uma. Ele garante que os dados fiquem consistentes.</p>
      <p>Para adicionar linhas, usamos <code>INSERT</code>:</p>
      <pre><code>-- valores para todas as colunas, na ordem da tabela
INSERT INTO minha_tabela
VALUES (valor1, valor2, …),
       (valor1, valor2, …);

-- só algumas colunas (mais seguro: continua funcionando se a tabela ganhar colunas novas)
INSERT INTO minha_tabela (coluna1, coluna2)
VALUES (valor1, valor2);

-- os valores podem ser expressões
INSERT INTO bilheteria (filme_id, nota, vendas_domesticas)
VALUES (1, 9.9, 283742034 / 1000000);</code></pre>
      <p>Exemplo real: quando você se cadastra num site, ele roda algo como <code>INSERT INTO usuarios (nome, email) VALUES ('Ana', 'ana@email.com');</code></p>
      <p>⚙️ <b>Atenção:</b> a partir desta lição a consulta só roda quando você clica em <b>▶ Executar</b>, e as mudanças <b>ficam salvas</b> no banco do exercício. Errou? Clique em <b>↺ Resetar banco</b> para voltar ao começo.</p>`,
    tarefas: [
      { texto: "Adicione a nova produção do estúdio, <b>Toy Story 4</b>, à tabela <code>filmes</code> (pode usar qualquer diretor)", solucao: "INSERT INTO filmes VALUES (4, 'Toy Story 4', 'Josh Cooley', 2019, 100);", checks: [{ tipo: "linha_existe", tabela: "filmes", coluna: "titulo", valor: "Toy Story 4", ci: true }] },
      { texto: "Toy Story 4 foi aclamado pela crítica! Ele teve nota <b>8.7</b>, vendeu <b>340 milhões</b> no mercado doméstico e <b>270 milhões</b> no internacional. Adicione esses dados à tabela <code>bilheteria</code>", solucao: "INSERT INTO bilheteria VALUES (4, 8.7, 340000000, 270000000);", checks: [contagem("SELECT * FROM bilheteria WHERE filme_id IN (SELECT id FROM filmes WHERE titulo LIKE 'Toy Story 4')", 1, 1, "Ainda não há uma linha da bilheteria ligada ao filme Toy Story 4 (confira o filme_id).")] }
    ]
  },
  {
    id: "14",
    titulo: "Atualizando linhas",
    banco: "pixar",
    tabelas: ["filmes"],
    preload: `UPDATE filmes SET diretor = 'El Directore' WHERE id = 2;
UPDATE filmes SET ano = 1899 WHERE id = 3;
UPDATE filmes SET titulo = 'Toy Story 8', diretor = 'El Directore' WHERE id = 11;`,
    manual: true,
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Para corrigir ou mudar dados que já existem, usamos <code>UPDATE</code>:</p>
      <pre><code>UPDATE minha_tabela
SET coluna = valor,
    outra_coluna = outro_valor
WHERE condicao;</code></pre>
      <ul>
        <li><code>SET</code> diz quais colunas mudam e para qual valor.</li>
        <li><code>WHERE</code> diz <b>quais linhas</b> mudam.</li>
      </ul>
      <p>⚠️ <b>Cuidado:</b> sem <code>WHERE</code>, o <code>UPDATE</code> altera <b>todas as linhas</b> da tabela. Esse é um dos erros mais famosos (e caros) do mundo da tecnologia.</p>
      <p>✅ <b>Boa prática profissional:</b> escreva primeiro o <code>WHERE</code> e teste com um <code>SELECT</code> (<code>SELECT * FROM filmes WHERE id = 2;</code>). Se aparecerem só as linhas certas, troque o <code>SELECT</code> pelo <code>UPDATE</code>.</p>
      <p>Neste exercício, alguém digitou alguns dados errados na tabela <code>filmes</code>. Vamos corrigir!</p>`,
    tarefas: [
      { texto: "O diretor de <i>Vida de Inseto</i> está errado: na verdade foi <b>John Lasseter</b>", solucao: "UPDATE filmes SET diretor = 'John Lasseter' WHERE id = 2;", checks: [contagem("SELECT * FROM filmes WHERE diretor = 'John Lasseter'", 5, 5, "John Lasseter deveria ter exatamente 5 filmes na tabela."), contagem("SELECT * FROM filmes WHERE id = 2 AND diretor = 'John Lasseter'", 1, 1, "O filme de id 2 ainda não está com o diretor John Lasseter.")] },
      { texto: "O ano de lançamento de <i>Toy Story 2</i> está errado: na verdade foi <b>1999</b>", solucao: "UPDATE filmes SET ano = 1999 WHERE id = 3;", checks: [contagem("SELECT * FROM filmes WHERE id = 3 AND ano = 1999", 1, 1, "O filme de id 3 ainda não está com o ano 1999.")] },
      { texto: "O título e o diretor de <i>Toy Story 8</i> estão errados: deveria ser <b>Toy Story 3</b>, dirigido por <b>Lee Unkrich</b>", solucao: "UPDATE filmes SET titulo = 'Toy Story 3', diretor = 'Lee Unkrich' WHERE id = 11;", checks: [contagem("SELECT * FROM filmes WHERE id = 11 AND titulo = 'Toy Story 3' AND diretor = 'Lee Unkrich'", 1, 1, "O filme de id 11 ainda não está como 'Toy Story 3', de 'Lee Unkrich'.")] }
    ]
  },
  {
    id: "15",
    titulo: "Apagando linhas",
    banco: "pixar",
    tabelas: ["filmes"],
    manual: true,
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Para remover linhas, usamos <code>DELETE</code>:</p>
      <pre><code>DELETE FROM minha_tabela
WHERE condicao;</code></pre>
      <p>⚠️ <b>Cuidado redobrado:</b> sem <code>WHERE</code>, o <code>DELETE</code> apaga <b>todas</b> as linhas da tabela. E não existe “desfazer” sem um backup.</p>
      <p>✅ Antes de apagar, teste a condição com um <code>SELECT</code> e confira exatamente quais linhas vão sumir. Em muitas empresas, nem se apaga de verdade: marca-se a linha como inativa (<code>UPDATE … SET ativo = 0</code>), o chamado <i>soft delete</i>.</p>
      <p>Exemplo real: <code>DELETE FROM sessoes WHERE expira_em &lt; '2026-01-01';</code> limpa sessões de login vencidas.</p>`,
    tarefas: [
      { texto: "A tabela está grande demais. Remova todos os filmes lançados <b>antes de 2005</b>", solucao: "DELETE FROM filmes WHERE ano < 2005;", checks: [contagem("SELECT * FROM filmes WHERE ano < 2005", 0, 0, "Ainda há filmes lançados antes de 2005."), contagem("SELECT * FROM filmes WHERE ano >= 2005", 8, 8, "Opa! Filmes de 2005 em diante também foram apagados. Clique em ↺ Resetar banco e tente de novo.")] },
      { texto: "Andrew Stanton saiu do estúdio. Remova todos os filmes dirigidos por ele", solucao: "DELETE FROM filmes WHERE diretor = 'Andrew Stanton';", checks: [contagem("SELECT * FROM filmes WHERE diretor = 'Andrew Stanton'", 0, 0, "Ainda há filmes de Andrew Stanton na tabela."), contagem("SELECT * FROM filmes WHERE diretor != 'Andrew Stanton' AND ano >= 2005", 7, 7, "Opa! Outros filmes também foram apagados. Clique em ↺ Resetar banco e tente de novo.")] }
    ]
  },
  {
    id: "16",
    titulo: "Criando tabelas",
    banco: "misc",
    tabelas: [],
    manual: true,
    inicial: "SELECT * FROM BancoDeDados;",
    teoria: `
      <p>Para guardar um novo tipo de informação, criamos uma tabela com <code>CREATE TABLE</code>, definindo o nome e o tipo de cada coluna:</p>
      <pre><code>CREATE TABLE IF NOT EXISTS minha_tabela (
  coluna TIPO RESTRICAO DEFAULT valor_padrao,
  outra_coluna TIPO RESTRICAO DEFAULT valor_padrao,
  …
);</code></pre>
      <p><code>IF NOT EXISTS</code> evita erro se a tabela já existir. Tipos de dados mais comuns:</p>
      <table class="sqlp-tabela-teoria">
        <thead><tr><th>Tipo</th><th>Uso</th></tr></thead>
        <tbody>
          <tr><td><code>INTEGER</code>, <code>BOOLEAN</code></td><td>Números inteiros (booleano costuma ser 0 ou 1)</td></tr>
          <tr><td><code>FLOAT</code>, <code>DOUBLE</code>, <code>REAL</code></td><td>Números com casas decimais</td></tr>
          <tr><td><code>CHARACTER(n)</code>, <code>VARCHAR(n)</code>, <code>TEXT</code></td><td>Textos (com ou sem limite de tamanho)</td></tr>
          <tr><td><code>DATE</code>, <code>DATETIME</code></td><td>Datas e horários</td></tr>
          <tr><td><code>BLOB</code></td><td>Dados binários (arquivos, imagens)</td></tr>
        </tbody>
      </table>
      <p>Restrições (<i>constraints</i>) protegem a qualidade dos dados:</p>
      <table class="sqlp-tabela-teoria">
        <thead><tr><th>Restrição</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><code>PRIMARY KEY</code></td><td>Identifica cada linha de forma única</td></tr>
          <tr><td><code>AUTOINCREMENT</code></td><td>Preenche inteiros automaticamente (no MySQL é <code>AUTO_INCREMENT</code>)</td></tr>
          <tr><td><code>UNIQUE</code></td><td>Não permite valores repetidos (ex.: e-mail)</td></tr>
          <tr><td><code>NOT NULL</code></td><td>Não permite valor vazio</td></tr>
          <tr><td><code>CHECK (expressao)</code></td><td>Só aceita valores que passam na condição (ex.: <code>CHECK (idade &gt;= 0)</code>)</td></tr>
          <tr><td><code>FOREIGN KEY</code></td><td>O valor precisa existir em outra tabela</td></tr>
        </tbody>
      </table>
      <p>Exemplo: o esquema da tabela <code>filmes</code> usada nas lições:</p>
      <pre><code>CREATE TABLE filmes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  diretor TEXT,
  ano INTEGER,
  duracao_minutos INTEGER
);</code></pre>`,
    tarefas: [
      { texto: "Crie uma tabela chamada <code>BancoDeDados</code> com as colunas: <code>Nome</code> (texto), <code>Versao</code> (número com casas decimais) e <code>Total_downloads</code> (inteiro). Não precisa de restrições", solucao: "CREATE TABLE BancoDeDados (\n  Nome TEXT,\n  Versao FLOAT,\n  Total_downloads INTEGER\n);", checks: [{ tipo: "funciona", sql: "SELECT Nome, Versao, Total_downloads FROM BancoDeDados;", desfazer: "DROP TABLE IF EXISTS BancoDeDados;", msg: "A tabela BancoDeDados ainda não existe com as colunas Nome, Versao e Total_downloads." }] }
    ]
  },
  {
    id: "17",
    titulo: "Alterando tabelas",
    banco: "pixar",
    tabelas: ["filmes"],
    manual: true,
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>As necessidades mudam e as tabelas precisam acompanhar. Com <code>ALTER TABLE</code> dá para adicionar, remover ou renomear colunas, e até renomear a tabela:</p>
      <pre><code>-- adicionar coluna (o DEFAULT vale também para as linhas que já existem)
ALTER TABLE minha_tabela
ADD COLUMN coluna TIPO RESTRICAO DEFAULT valor_padrao;

-- remover coluna (nem todo banco suporta)
ALTER TABLE minha_tabela
DROP COLUMN coluna;

-- renomear a tabela
ALTER TABLE minha_tabela
RENAME TO novo_nome;</code></pre>
      <p>Exemplo real: a loja passou a pedir o CPF no cadastro: <code>ALTER TABLE clientes ADD COLUMN cpf TEXT;</code></p>
      <p>Neste exercício, use <code>ADD COLUMN</code>.</p>`,
    tarefas: [
      { texto: "Adicione uma coluna chamada <code>Proporcao_tela</code>, do tipo <code>FLOAT</code>, para guardar a proporção de tela (<i>aspect ratio</i>) de cada filme", solucao: "ALTER TABLE filmes\n  ADD COLUMN Proporcao_tela FLOAT DEFAULT 2.39;", checks: [{ tipo: "funciona", sql: "SELECT proporcao_tela FROM filmes;", msg: "A coluna Proporcao_tela ainda não existe na tabela filmes." }] },
      { texto: "Adicione outra coluna chamada <code>Idioma</code>, do tipo <code>TEXT</code>, com o valor padrão <code>'Inglês'</code>", solucao: "ALTER TABLE filmes\n  ADD COLUMN Idioma TEXT DEFAULT 'Inglês';", checks: [{ tipo: "funciona", sql: "SELECT idioma FROM filmes;", msg: "A coluna Idioma ainda não existe na tabela filmes." }] }
    ]
  },
  {
    id: "18",
    titulo: "Apagando tabelas",
    banco: "pixar",
    tabelas: ["filmes", "bilheteria"],
    manual: true,
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Quando uma tabela não é mais necessária, ela pode ser apagada por completo com <code>DROP TABLE</code>:</p>
      <pre><code>DROP TABLE IF EXISTS minha_tabela;</code></pre>
      <ul>
        <li>Diferente do <code>DELETE</code> (que apaga linhas e mantém a tabela), o <code>DROP</code> remove os dados <b>e</b> a estrutura.</li>
        <li><code>IF EXISTS</code> evita erro se a tabela já não existir.</li>
        <li>Se outras tabelas dependem dela (por <code>FOREIGN KEY</code>), ajuste ou remova essas dependências antes.</li>
      </ul>
      <p>⚠️ Em produção, <code>DROP TABLE</code> é um comando raro e perigoso: só com backup e muita certeza!</p>`,
    tarefas: [
      { texto: "Chegamos ao fim! Faça a limpeza apagando a tabela <code>filmes</code>", solucao: "DROP TABLE filmes;", checks: [{ tipo: "falha", sql: "SELECT * FROM filmes;", msg: "A tabela filmes ainda existe." }] },
      { texto: "Apague também a tabela <code>bilheteria</code>", solucao: "DROP TABLE bilheteria;", checks: [{ tipo: "falha", sql: "SELECT * FROM bilheteria;", msg: "A tabela bilheteria ainda existe." }] }
    ]
  },
  {
    id: "fim",
    titulo: "Rumo ao infinito!",
    teoria: `
      <p>🎉 <b>Parabéns!</b> Você completou a trilha principal de SQL na Prática. Olha só tudo o que você aprendeu:</p>
      <ul>
        <li><b>Ler dados</b>: <code>SELECT</code>, <code>WHERE</code>, <code>LIKE</code>, <code>DISTINCT</code>, <code>ORDER BY</code>, <code>LIMIT</code>/<code>OFFSET</code>.</li>
        <li><b>Juntar tabelas</b>: <code>INNER JOIN</code>, <code>LEFT JOIN</code> e o cuidado com <code>NULL</code>.</li>
        <li><b>Resumir dados</b>: expressões, <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>GROUP BY</code> e <code>HAVING</code>, além da ordem de execução de uma consulta.</li>
        <li><b>Alterar dados</b>: <code>INSERT</code>, <code>UPDATE</code> e <code>DELETE</code>.</li>
        <li><b>Mudar a estrutura</b>: <code>CREATE TABLE</code>, <code>ALTER TABLE</code> e <code>DROP TABLE</code>.</li>
      </ul>
      <p>Com isso você já consegue resolver a maior parte das tarefas de SQL do dia a dia e das entrevistas para vagas de entrada.</p>
      <h3>Próximos passos</h3>
      <ul>
        <li>Faça os dois <b>tópicos extras</b> a seguir: <b>subconsultas</b> e <b>UNION / INTERSECT / EXCEPT</b>.</li>
        <li>Continue nas trilhas <a href="#/trilha/sql">🧮 SQL</a> e <a href="#/trilha/mysql">🐬 MySQL</a> do ProgrTotal.</li>
        <li>Estude a <b>documentação oficial</b> do banco que você vai usar no trabalho (MySQL, PostgreSQL, SQL Server…): cada um tem recursos próprios.</li>
        <li>Pratique com dados de verdade: exporte uma planilha sua para CSV e importe num banco para fazer perguntas a ela.</li>
      </ul>
      <p>💡 Em caso de ainda haver dúvida, pesquise o termo na internet.</p>`,
    tarefas: []
  },
  {
    id: "a",
    titulo: "Extra A: subconsultas",
    banco: "completo",
    tabelas: ["filmes", "bilheteria", "cidades_america_norte"],
    preload: "INSERT INTO filmes VALUES (15,'Divertida Mente','Pete Docter',2015,95);",
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Uma <b>subconsulta</b> é uma consulta <b>dentro de outra</b>, escrita entre parênteses. Ela pode aparecer no <code>FROM</code>, no <code>WHERE</code>, no <code>HAVING</code> e até no <code>SELECT</code>. É útil quando a resposta depende de um valor que também precisa ser calculado.</p>
      <h3>Subconsulta comum</h3>
      <p>Roda uma única vez e o resultado é usado pela consulta de fora. Exemplo: vendedores que ganham mais do que a média de receita gerada por vendedor:</p>
      <pre><code>SELECT *
FROM vendedores
WHERE salario &gt; (SELECT AVG(receita_gerada) FROM vendedores);</code></pre>
      <h3>Subconsulta correlacionada</h3>
      <p>Usa um valor da consulta de fora, por isso roda <b>uma vez para cada linha</b>. Pode ficar lenta em tabelas grandes. Use apelidos claros para não se confundir:</p>
      <pre><code>SELECT *
FROM funcionarios f
WHERE salario &gt; (
  SELECT AVG(salario)
  FROM funcionarios d
  WHERE d.departamento = f.departamento
);</code></pre>
      <p>Aqui, para cada funcionário <code>f</code>, calculamos a média do <b>departamento dele</b>.</p>
      <h3>Teste de existência</h3>
      <p>Com <code>IN</code> / <code>NOT IN</code> verificamos se um valor aparece no resultado de outra consulta. A subconsulta precisa devolver <b>uma única coluna</b>:</p>
      <pre><code>SELECT * FROM clientes
WHERE id NOT IN (SELECT cliente_id FROM pedidos);</code></pre>
      <p>Neste exercício o banco tem as tabelas de filmes <b>e</b> de cidades. Um filme novo, <i>Divertida Mente</i>, ainda não tem dados de bilheteria.</p>`,
    tarefas: [
      { texto: "Liste os filmes com <b>nota acima da média</b> de todas as notas da bilheteria", solucao: `SELECT titulo ${JOIN_FB} WHERE nota > (SELECT AVG(nota) FROM bilheteria);`, checks: [valores] },
      { texto: "Liste os filmes que ainda <b>não aparecem</b> na tabela <code>bilheteria</code>", solucao: "SELECT titulo FROM filmes WHERE id NOT IN (SELECT filme_id FROM bilheteria);", checks: [valores] },
      { texto: "Liste as cidades (e o país) com população <b>acima da média do próprio país</b>", solucao: "SELECT cidade, pais FROM cidades_america_norte c WHERE populacao > (SELECT AVG(populacao) FROM cidades_america_norte d WHERE d.pais = c.pais);", checks: [valores] }
    ]
  },
  {
    id: "b",
    titulo: "Extra B: UNION, INTERSECT e EXCEPT",
    banco: "completo",
    tabelas: ["filmes", "predios", "funcionarios"],
    inicial: "SELECT * FROM filmes;",
    teoria: `
      <p>Até agora juntamos tabelas “lado a lado” com JOIN. Os operadores de conjunto juntam resultados “<b>um embaixo do outro</b>”:</p>
      <pre><code>SELECT coluna, … FROM tabela1
UNION / UNION ALL / INTERSECT / EXCEPT
SELECT coluna, … FROM tabela2
ORDER BY …
LIMIT …;</code></pre>
      <ul>
        <li>As duas consultas precisam ter o <b>mesmo número de colunas</b>, na mesma ordem e com tipos compatíveis.</li>
        <li><code>UNION</code>: junta os dois resultados e remove as linhas repetidas. <code>UNION ALL</code>: junta e mantém as repetidas (é mais rápido).</li>
        <li><code>INTERSECT</code>: só as linhas que aparecem <b>nos dois</b> resultados.</li>
        <li><code>EXCEPT</code>: as linhas do primeiro resultado que <b>não</b> aparecem no segundo (aqui a ordem das consultas importa!). No Oracle ele se chama <code>MINUS</code>.</li>
        <li>O <code>UNION</code> acontece <b>antes</b> do <code>ORDER BY</code> e do <code>LIMIT</code>, que valem para o resultado final.</li>
      </ul>
      <p>Exemplo real: juntar numa só lista os e-mails de clientes e de fornecedores para uma comunicação: <code>SELECT email FROM clientes UNION SELECT email FROM fornecedores;</code></p>`,
    tarefas: [
      { texto: "Usando <code>INTERSECT</code>, encontre os diretores que lançaram filmes <b>antes de 2000</b> e também <b>depois de 2010</b>", solucao: "SELECT diretor FROM filmes WHERE ano < 2000\nINTERSECT\nSELECT diretor FROM filmes WHERE ano > 2010;", checks: [valores] },
      { texto: "Usando <code>EXCEPT</code>, encontre os prédios que não têm nenhum funcionário", solucao: "SELECT nome_predio FROM predios\nEXCEPT\nSELECT predio FROM funcionarios;", checks: [valores] },
      { texto: "Usando <code>UNION</code>, monte uma lista única com os nomes de todas as pessoas: os diretores dos filmes e os funcionários", solucao: "SELECT diretor AS nome FROM filmes\nUNION\nSELECT nome FROM funcionarios;", checks: [valores] }
    ]
  }
];

export const TOTAL_LICOES_SQLP = LICOES.length;
export const chaveLicao = (id) => "sqlp_" + id;
