// Nível Iniciante da trilha sql: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é um banco de dados e escrever suas primeiras consultas em SQL: pedir dados de uma tabela, escolher colunas, filtrar, ordenar e limitar o resultado.",
  topicos: [
    /* ================= p1: O que é um banco de dados ================= */
    {
      titulo: "O que é um banco de dados",
      crianca: `Pense na <b>agenda de contatos</b> do seu celular ou numa <b>planilha</b> do Excel. Cada contato fica numa linha, e cada informação (nome, telefone, cidade) fica numa coluna. Um <b>banco de dados</b> é isso, só que maior e mais organizado: um lugar onde empresas guardam clientes, produtos, pedidos... E o <b>SQL</b> é a língua que usamos para pedir essas informações para ele.`,
      passos: [
        {
          titulo: "Dados e banco de dados",
          html: `<p><b>Dado</b> é qualquer informação: o nome de um cliente, o preço de um pão, a data de um pedido.</p>
<p>Um <b>banco de dados</b> é um lugar no computador feito para <b>guardar muitos dados de forma organizada</b> e encontrá-los rápido. A padaria, a loja online e o banco onde você tem conta usam um.</p>`,
          pratica: [
            m("Qual destes é um exemplo de dado?", ["O preço de um produto: 29,90", "O botão de ligar do computador", "A tela do celular", "O cabo de internet"], 0, "Dado é informação. O preço de um produto é uma informação que fica guardada no banco."),
            vf("Um banco de dados serve para guardar informações de forma organizada.", true, "Isso mesmo! Ele guarda e organiza os dados para encontrar tudo rápido depois.")
          ]
        },
        {
          titulo: "Tabela: parece uma planilha",
          html: `<p>Dentro do banco, os dados ficam em <b>tabelas</b>. Cada tabela guarda um assunto: uma para clientes, outra para produtos, outra para pedidos. Veja um pedacinho da tabela <code>produtos</code>:</p>
<div class="table-wrap"><table class="table">
<thead><tr><th>id</th><th>nome</th><th>categoria</th><th>preco</th></tr></thead>
<tbody>
<tr><td>1</td><td>Fone Bluetooth</td><td>eletronicos</td><td>129.90</td></tr>
<tr><td>2</td><td>Carregador USB-C</td><td>eletronicos</td><td>59.00</td></tr>
<tr><td>3</td><td>Caneca Personalizada</td><td>casa</td><td>29.90</td></tr>
</tbody></table></div>
<p>Repare: o preço usa <b>ponto</b> no lugar da vírgula (<code>29.90</code>), como no inglês.</p>`,
          pratica: [
            m("Na tabela acima, qual é o preço da Caneca Personalizada?", ["129.90", "59.00", "29.90", "3"], 2, "A linha da Caneca Personalizada mostra `29.90` na coluna `preco`."),
            vf("Cada tabela costuma guardar um assunto (clientes, produtos, pedidos...).", true, "Certo! Separar por assunto deixa tudo mais organizado.")
          ]
        },
        {
          titulo: "Linhas e colunas",
          html: `<p>Uma <b>coluna</b> é um <b>tipo de informação</b>: <code>nome</code>, <code>categoria</code>, <code>preco</code>. Ela fica de pé, de cima para baixo.</p>
<p>Uma <b>linha</b> é <b>um item completo</b>: um produto, com todas as suas informações. Ela fica deitada, da esquerda para a direita. Também chamamos a linha de <b>registro</b>.</p>
<p>A coluna <code>id</code> é um número único que identifica cada linha, como o número da senha na fila da padaria.</p>`,
          pratica: [
            m("Na tabela de produtos do passo anterior, quantas linhas de produtos aparecem?", ["1", "3", "4", "10"], 1, "São 3 produtos: Fone, Carregador e Caneca. Cada produto é uma linha."),
            m("O que é uma coluna numa tabela?", ["Um tipo de informação, como nome ou preço", "Um produto inteiro", "O banco de dados todo", "Um erro"], 0, "A coluna guarda o mesmo tipo de informação para todas as linhas.")
          ]
        },
        {
          titulo: "SQL: a língua para conversar com o banco",
          html: `<p><b>SQL</b> (fala-se “ési-quiu-éle” ou “síquel”) é a linguagem para <b>pedir</b> e <b>mexer</b> nos dados do banco. Os comandos parecem frases em inglês.</p>
<p>Aqui no site existe um <b>banco de exemplo</b> pronto, com as tabelas <code>clientes</code>, <code>produtos</code>, <code>pedidos</code> e <code>funcionarios</code>. A linha abaixo pede: “mostre tudo da tabela produtos”. Clique em <b>▶ Testar no sandbox</b> no fim do tópico para ver a tabela inteira!</p>`,
          codigo: c`SELECT * FROM produtos;`,
          pratica: [
            m("Para que serve o SQL?", ["Para conversar com o banco de dados: pedir e alterar dados", "Para desenhar páginas", "Para editar fotos", "Para ligar o computador"], 0, "SQL é a língua dos bancos de dados."),
            vf("No banco de exemplo do site existe uma tabela chamada `clientes`.", true, "Sim! Há também `produtos`, `pedidos`, `funcionarios` e outras.")
          ]
        }
      ],
      codigo: c`-- Linhas que começam com -- são comentários: o banco ignora.
-- Mostre todas as linhas e colunas da tabela produtos:
SELECT * FROM produtos;`,
      partes: [
        ["-- ...", "Comentário: um recado para quem lê. O banco não executa."],
        ["SELECT *", "“Selecione tudo”: todas as colunas."],
        ["FROM produtos", "“Da tabela produtos”."],
        [";", "Fim do comando, como o ponto final de uma frase."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b> e troque <code>produtos</code> por <code>clientes</code> ou <code>pedidos</code> para ver outras tabelas.",
      trabalho: `Quando você entra num app de delivery, ele busca no banco de dados os restaurantes da sua cidade, os pratos e os preços. Cada tela que mostra uma lista de coisas geralmente vem de uma tabela.`,
      entrevista: {
        pergunta: "O que são linhas e colunas numa tabela de banco de dados?",
        resposta: `As <b>colunas</b> são os campos, ou seja, os tipos de informação (nome, e-mail, preço). As <b>linhas</b> (registros) são os itens guardados, cada um com um valor em cada coluna. Ex.: na tabela de clientes, cada cliente é uma linha.`
      },
      busca: ["o que é banco de dados", "tabela linha coluna banco de dados", "o que é SQL para iniciantes"]
    },

    /* ================= p2: SELECT ... FROM ================= */
    {
      titulo: "Pedindo dados: SELECT ... FROM",
      crianca: `Pedir dados ao banco é como fazer um pedido no balcão da padaria: “<b>me dá</b> o pão francês <b>da</b> vitrine da esquerda”. No SQL, o “me dá” é <code>SELECT</code> e o “da” é <code>FROM</code>. Você diz <b>o que quer</b> e <b>de onde</b>.`,
      passos: [
        {
          titulo: "SELECT e FROM: o pedido básico",
          html: `<p>Toda consulta começa assim: <code>SELECT</code> (“selecione”) diz <b>quais colunas</b> você quer, e <code>FROM</code> (“de”) diz <b>de qual tabela</b>.</p>
<p>Consulta é o nome que damos para um pedido de dados ao banco.</p>`,
          codigo: c`SELECT nome FROM clientes;`,
          pratica: [
            m("Em `SELECT nome FROM clientes;`, qual é a tabela?", ["`nome`", "`clientes`", "`SELECT`", "`FROM`"], 1, "Depois do `FROM` vem o nome da tabela: `clientes`."),
            l("Complete para pegar os nomes da tabela produtos:", c`SELECT nome ____ produtos;`, ["FROM"], "O `FROM` indica de qual tabela vêm os dados.")
          ]
        },
        {
          titulo: "O asterisco: todas as colunas",
          html: `<p>O <code>*</code> (asterisco) quer dizer “<b>todas as colunas</b>”. É ótimo para dar uma espiada numa tabela que você ainda não conhece.</p>`,
          codigo: c`SELECT * FROM funcionarios;`,
          pratica: [
            m("O que `SELECT * FROM pedidos;` mostra?", ["Só a primeira coluna de pedidos", "Todas as colunas da tabela pedidos", "Nada", "Apaga os pedidos"], 1, "O `*` pede todas as colunas, e sem filtro vêm todas as linhas.")
          ]
        },
        {
          titulo: "Escolhendo só as colunas que você quer",
          html: `<p>Em vez do <code>*</code>, você pode escrever <b>os nomes das colunas</b>, separados por <b>vírgula</b>. O resultado vem com as colunas nessa mesma ordem.</p>
<p>Na vida real isso é o mais comum: pedir só o que precisa deixa tudo mais leve e fácil de ler.</p>`,
          codigo: c`SELECT nome, preco FROM produtos;`,
          pratica: [
            l("Complete para mostrar nome e cidade dos clientes:", c`SELECT nome____ cidade FROM clientes;`, [","], "Colunas são separadas por vírgula: `nome, cidade`."),
            vf("`SELECT nome, email FROM clientes;` mostra só as colunas nome e email.", true, "Exato! Só vêm as colunas que você escreveu.")
          ]
        },
        {
          titulo: "O ponto e vírgula e as letras maiúsculas",
          html: `<p>O <code>;</code> (ponto e vírgula) marca o <b>fim de um comando</b>, como o ponto final de uma frase. Ele é importante quando você escreve vários comandos seguidos.</p>
<p>As palavras do SQL (<code>SELECT</code>, <code>FROM</code>) funcionam em maiúsculas ou minúsculas, mas o costume é escrevê-las em <b>MAIÚSCULAS</b> para destacar. Você também pode quebrar a consulta em várias linhas.</p>`,
          codigo: c`SELECT nome, cargo
FROM funcionarios;`,
          pratica: [
            m("Para que serve o `;` no fim da consulta?", ["Para marcar o fim do comando", "Para somar valores", "Para separar colunas", "Para comentar a linha"], 0, "O `;` encerra o comando. Para separar colunas usamos a vírgula."),
            vf("`select nome from clientes;` (tudo minúsculo) também funciona.", true, "Funciona! Maiúsculas são só um costume para deixar o código mais fácil de ler.")
          ]
        }
      ],
      codigo: c`-- Todas as colunas dos funcionários
SELECT * FROM funcionarios;

-- Só nome e preço dos produtos
SELECT nome, preco
FROM produtos;`,
      partes: [
        ["SELECT * FROM funcionarios;", "Mostra todas as colunas da tabela funcionarios."],
        ["SELECT nome, preco", "Escolhe só duas colunas, separadas por vírgula."],
        ["FROM produtos;", "A tabela de onde os dados vêm. O `;` fecha o comando."]
      ],
      nota: "No sandbox aparece o resultado da <b>última</b> consulta. Experimente trocar as colunas: <code>nome, categoria, estoque</code>.",
      trabalho: `Um analista recebe o pedido: “me passa o nome e o e-mail de todos os clientes”. Ele escreve <code>SELECT nome, email FROM clientes;</code> e exporta o resultado para uma planilha.`,
      entrevista: {
        pergunta: "Por que evitar o SELECT * em sistemas de verdade?",
        resposta: `Porque ele traz <b>todas</b> as colunas, até as que você não precisa. Isso deixa a consulta mais pesada e pode expor dados sem necessidade. O melhor é pedir só as colunas usadas: <code>SELECT nome, email FROM clientes</code>.`
      },
      busca: ["SQL SELECT FROM iniciante", "SELECT asterisco SQL", "selecionar colunas SQL"]
    },

    /* ================= p3: WHERE ================= */
    {
      titulo: "Filtrando com WHERE",
      crianca: `Imagine que você tem uma caixa com todas as fotos da família e quer <b>só as da praia</b>. Você não joga as outras fora: só separa as que interessam. O <code>WHERE</code> (“onde”) faz isso: ele mostra <b>só as linhas</b> que combinam com a sua condição.`,
      passos: [
        {
          titulo: "WHERE: só as linhas que interessam",
          html: `<p>O <code>WHERE</code> vem <b>depois do FROM</b> e traz uma <b>condição</b>, uma pergunta de sim ou não feita para cada linha. Só as linhas que respondem “sim” aparecem no resultado.</p>`,
          codigo: c`SELECT nome, preco
FROM produtos
WHERE id = 3;`,
          pratica: [
            m("Onde o `WHERE` fica na consulta?", ["Antes do SELECT", "Depois do FROM", "Antes do FROM", "Em qualquer lugar"], 1, "A ordem é `SELECT ... FROM ... WHERE ...`."),
            vf("O `WHERE` apaga do banco as linhas que não combinam com a condição.", false, "Não apaga nada! Ele só escolhe quais linhas aparecem no resultado.")
          ]
        },
        {
          titulo: "Comparando números com =",
          html: `<p>Para números, escrevemos o valor <b>direto</b>, sem aspas. O sinal <code>=</code> pergunta “<b>é igual a?</b>”.</p>
<p>Exemplo: os produtos que têm exatamente <code>40</code> unidades em estoque.</p>`,
          codigo: c`SELECT nome, estoque
FROM produtos
WHERE estoque = 40;`,
          pratica: [
            l("Complete para mostrar o funcionário de id 2:", c`SELECT nome FROM funcionarios WHERE id ____ 2;`, ["="], "O sinal `=` compara: “o id é igual a 2?”.")
          ]
        },
        {
          titulo: "Texto vai entre aspas simples",
          html: `<p>Quando o valor é um <b>texto</b>, ele vai entre <b>aspas simples</b>: <code>'Recife'</code>. Sem as aspas, o banco acha que <code>Recife</code> é o nome de uma coluna e dá erro.</p>
<p>O texto precisa estar escrito igualzinho ao que está guardado na tabela.</p>`,
          codigo: c`SELECT nome, cidade
FROM clientes
WHERE cidade = 'Recife';`,
          pratica: [
            l("Complete para mostrar os produtos da categoria casa:", c`SELECT nome FROM produtos WHERE categoria = ____;`, ["'casa'"], "Texto vai entre aspas simples: `'casa'`."),
            m("Qual destas linhas está certa?", ["`WHERE uf = 'SP'`", "`WHERE uf = SP`", "`WHERE 'uf' = SP`", "`WHERE uf 'SP'`"], 0, "A coluna fica sem aspas e o texto, com aspas simples: `uf = 'SP'`.")
          ]
        },
        {
          titulo: "Maior e menor: > e <",
          html: `<p>Também dá para perguntar “é <b>maior</b>?” e “é <b>menor</b>?”:</p>
<ul>
<li><code>&gt;</code> maior que, e <code>&gt;=</code> maior ou igual;</li>
<li><code>&lt;</code> menor que, e <code>&lt;=</code> menor ou igual.</li>
</ul>
<p>Dica para não confundir: a “boca aberta” do sinal fica virada para o número maior.</p>`,
          codigo: c`-- Produtos que custam menos de 60 reais
SELECT nome, preco
FROM produtos
WHERE preco < 60;`,
          pratica: [
            m("Qual condição mostra os pedidos com valor acima de 1000?", ["`valor < 1000`", "`valor > 1000`", "`valor = 1000`", "`valor <= 1000`"], 1, "O `>` quer dizer “maior que”."),
            vf("`preco <= 50` inclui um produto que custa exatamente 50.", true, "Sim! O `<=` é “menor ou igual”, então o 50 entra.")
          ]
        }
      ],
      codigo: c`-- Clientes de Recife
SELECT nome, cidade
FROM clientes
WHERE cidade = 'Recife';

-- Produtos baratinhos: menos de 60 reais
SELECT nome, preco
FROM produtos
WHERE preco < 60;`,
      partes: [
        ["WHERE cidade = 'Recife'", "Só as linhas em que a cidade é igual a Recife. Texto entre aspas simples."],
        ["WHERE preco < 60", "Só os produtos com preço menor que 60. Número sem aspas."],
        ["SELECT nome, preco FROM produtos", "O começo de sempre: quais colunas e de qual tabela."]
      ],
      nota: "No sandbox, troque <code>'Recife'</code> por <code>'São Paulo'</code> ou o <code>60</code> por <code>100</code> e veja o resultado mudar.",
      trabalho: `O gerente pergunta: “quais pedidos ainda estão pendentes?”. A resposta é <code>SELECT id, valor FROM pedidos WHERE status = 'pendente';</code>. Filtrar é o que mais se faz com SQL no dia a dia.`,
      entrevista: {
        pergunta: "Qual a diferença entre escrever 'SP' e SP no WHERE?",
        resposta: `<code>'SP'</code> com aspas simples é um <b>texto</b>. <code>SP</code> sem aspas o banco entende como <b>nome de coluna</b>; como não existe coluna SP, dá erro. Textos e datas vão entre aspas simples; números, não.`
      },
      busca: ["SQL WHERE iniciante", "SQL aspas simples texto", "operadores de comparação SQL"]
    },

    /* ================= p4: ORDER BY e LIMIT ================= */
    {
      titulo: "Ordenando e limitando: ORDER BY e LIMIT",
      crianca: `Na fila da escola, a professora pede: “em <b>ordem de altura</b>, do mais baixo para o mais alto”. Depois: “só os <b>3 primeiros</b> vêm comigo”. O <code>ORDER BY</code> coloca as linhas em ordem, e o <code>LIMIT</code> diz <b>quantas</b> linhas você quer.`,
      passos: [
        {
          titulo: "ORDER BY: colocando em ordem",
          html: `<p>Sem pedir, o banco não promete ordem nenhuma. O <code>ORDER BY</code> (“ordenar por”) diz <b>por qual coluna</b> organizar.</p>
<p>Por padrão a ordem é <b>crescente</b>: do menor para o maior número, e de A a Z nos textos. Essa ordem se chama <code>ASC</code>.</p>`,
          codigo: c`SELECT nome, preco
FROM produtos
ORDER BY preco;`,
          pratica: [
            m("Com `ORDER BY preco`, qual produto aparece primeiro?", ["O mais caro", "O mais barato", "O último cadastrado", "Um qualquer"], 1, "Sem dizer nada, a ordem é crescente (`ASC`): do menor preço para o maior."),
            l("Complete para listar os clientes em ordem alfabética de nome:", c`SELECT nome FROM clientes ORDER ____ nome;`, ["BY"], "O comando completo é `ORDER BY`.")
          ]
        },
        {
          titulo: "DESC: do maior para o menor",
          html: `<p>Para inverter a ordem, coloque <code>DESC</code> (de “descendente”) depois da coluna: do <b>maior para o menor</b>, ou de Z a A.</p>`,
          codigo: c`SELECT nome, salario
FROM funcionarios
ORDER BY salario DESC;`,
          pratica: [
            l("Complete para mostrar os pedidos do maior valor para o menor:", c`SELECT id, valor FROM pedidos ORDER BY valor ____;`, ["DESC"], "`DESC` é decrescente: do maior para o menor."),
            vf("`ORDER BY nome DESC` mostra os nomes de Z até A.", true, "Isso! Em textos, `DESC` inverte a ordem alfabética.")
          ]
        },
        {
          titulo: "LIMIT: só as primeiras linhas",
          html: `<p>O <code>LIMIT</code> diz o <b>número máximo de linhas</b> do resultado. Junto com o <code>ORDER BY</code>, ele cria os famosos “top 3”, “top 10”.</p>`,
          codigo: c`-- Os 3 produtos mais caros
SELECT nome, preco
FROM produtos
ORDER BY preco DESC
LIMIT 3;`,
          pratica: [
            m("Quantas linhas, no máximo, `LIMIT 5` devolve?", ["1", "5", "10", "Todas"], 1, "O número depois do `LIMIT` é a quantidade máxima de linhas."),
            vf("Para pegar os 3 mais baratos, basta `ORDER BY preco LIMIT 3`.", true, "Certo! A ordem crescente põe os mais baratos primeiro, e o `LIMIT 3` pega só eles.")
          ]
        },
        {
          titulo: "Juntando tudo na ordem certa",
          html: `<p>As partes de uma consulta têm <b>lugar fixo</b>: <code>SELECT</code> → <code>FROM</code> → <code>WHERE</code> → <code>ORDER BY</code> → <code>LIMIT</code>. Nem todas são obrigatórias, mas as que aparecem seguem essa ordem.</p>
<p>Quer treinar mais? Faça a trilha interativa <a href="#/sqlpratica"><b>🧩 SQL na Prática</b></a> (em <code>#/sqlpratica</code>): são lições curtinhas com o banco rodando no navegador e correção na hora.</p>`,
          codigo: c`-- Os 2 pedidos pagos de maior valor
SELECT id, valor
FROM pedidos
WHERE status = 'pago'
ORDER BY valor DESC
LIMIT 2;`,
          pratica: [
            m("Qual é a ordem certa das partes de uma consulta?", ["`SELECT`, `WHERE`, `FROM`, `LIMIT`, `ORDER BY`", "`SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`", "`FROM`, `SELECT`, `ORDER BY`, `WHERE`, `LIMIT`", "`LIMIT`, `ORDER BY`, `WHERE`, `FROM`, `SELECT`"], 1, "A sequência é `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`.")
          ]
        }
      ],
      codigo: c`-- Os 3 produtos mais caros da loja
SELECT nome, preco
FROM produtos
ORDER BY preco DESC
LIMIT 3;`,
      partes: [
        ["SELECT nome, preco", "As colunas que queremos ver."],
        ["FROM produtos", "A tabela de onde os dados vêm."],
        ["ORDER BY preco DESC", "Ordena pelo preço, do maior para o menor."],
        ["LIMIT 3;", "Fica só com as 3 primeiras linhas: o top 3."]
      ],
      nota: "No sandbox, troque <code>DESC</code> por <code>ASC</code> para ver os 3 mais baratos.",
      trabalho: `“Quais foram os 10 clientes que mais compraram?” e “quais os 5 produtos mais vendidos?” são perguntas de toda semana numa empresa. Todas usam <code>ORDER BY ... DESC</code> com <code>LIMIT</code>.`,
      entrevista: {
        pergunta: "Se eu não usar ORDER BY, as linhas vêm em que ordem?",
        resposta: `Em <b>nenhuma ordem garantida</b>. Muitas vezes parecem vir na ordem em que foram cadastradas, mas o banco pode mudar isso. Se a ordem importa, sempre use <code>ORDER BY</code>.`
      },
      busca: ["SQL ORDER BY DESC", "SQL LIMIT top 10", "ordem das cláusulas SQL"]
    }
  ],

  fixacao: [
    m("Num banco de dados, onde os dados ficam guardados?", ["Em tabelas", "Em fotos", "Em vídeos", "No teclado"], 0, "Os dados ficam em tabelas, com linhas e colunas."),
    vf("Numa tabela de clientes, cada cliente costuma ser uma linha.", true, "Isso! Cada linha é um item completo, e as colunas são as informações dele."),
    m("Na tabela `produtos`, `preco` é…", ["uma coluna", "uma linha", "uma tabela", "um banco de dados"], 0, "`preco` é um tipo de informação que todo produto tem: uma coluna."),
    l("Complete para ver todas as colunas da tabela pedidos:", c`SELECT ____ FROM pedidos;`, ["*"], "O `*` significa “todas as colunas”."),
    m("Qual consulta mostra só o nome e o e-mail dos clientes?", ["`SELECT nome, email FROM clientes;`", "`SELECT * FROM clientes;`", "`FROM clientes SELECT nome, email;`", "`SELECT nome email clientes;`"], 0, "As colunas vêm depois do `SELECT`, separadas por vírgula, e a tabela depois do `FROM`."),
    l("Complete a palavra que inicia toda consulta:", c`____ nome FROM produtos;`, ["SELECT"], "Toda consulta começa com `SELECT`."),
    vf("Em SQL, textos como `'Curitiba'` vão entre aspas simples.", true, "Certo! Números ficam sem aspas; textos, com aspas simples."),
    m("Qual consulta mostra os produtos com estoque menor que 20?", ["`SELECT nome FROM produtos WHERE estoque < 20;`", "`SELECT nome FROM produtos WHERE estoque > 20;`", "`SELECT nome FROM produtos ORDER BY 20;`", "`SELECT nome FROM produtos LIMIT 20;`"], 0, "O `<` é “menor que”, e a condição vai no `WHERE`."),
    l("Complete para mostrar só os pedidos cancelados:", c`SELECT id FROM pedidos ____ status = 'cancelado';`, ["WHERE"], "O `WHERE` filtra as linhas."),
    m("O que `ORDER BY preco DESC` faz?", ["Ordena do maior preço para o menor", "Ordena do menor para o maior", "Apaga os preços", "Mostra só um preço"], 0, "`DESC` é decrescente: do maior para o menor."),
    vf("`LIMIT 1` devolve no máximo uma linha.", true, "Isso! O `LIMIT` define a quantidade máxima de linhas."),
    l("Complete para pegar só os 3 primeiros clientes em ordem alfabética:", c`SELECT nome FROM clientes ORDER BY nome ____ 3;`, ["LIMIT"], "O `LIMIT` vem no final e diz quantas linhas você quer.")
  ],

  checkpoints: {
    b1: [
      m("Na consulta `SELECT nome FROM clientes WHERE uf = 'SP' ORDER BY nome;`, o que o `ORDER BY nome` faz?", ["Filtra os clientes de SP", "Coloca os nomes em ordem alfabética", "Conta os clientes", "Apaga os nomes repetidos"], 1, "O `ORDER BY` só ordena; quem filtra é o `WHERE`."),
      vf("Em `WHERE preco BETWEEN 50 AND 100`, um produto de exatamente 100 entra no resultado.", true, "O `BETWEEN` inclui os dois limites: de 50 a 100.")
    ],
    b2: [
      m("Qual comando coloca uma linha nova numa tabela?", ["`INSERT`", "`UPDATE`", "`DELETE`", "`SELECT`"], 0, "`INSERT` cria linhas; `UPDATE` altera; `DELETE` remove."),
      vf("Antes de um `UPDATE` ou `DELETE`, é boa ideia rodar um `SELECT` com o mesmo `WHERE` para conferir as linhas.", true, "Assim você vê exatamente quais linhas serão alteradas ou apagadas.")
    ],
    b3: [
      m("Qual função soma os valores de uma coluna?", ["`COUNT`", "`SUM`", "`MAX`", "`AVG`"], 1, "`SUM` soma; `COUNT` conta; `AVG` faz a média; `MAX` pega o maior."),
      l("Complete para contar os pedidos de cada estado:", c`SELECT uf, COUNT(*) FROM pedidos GROUP ____ uf;`, ["BY"], "O comando é `GROUP BY`: ele faz um grupo para cada estado.")
    ],
    i1: [
      vf("O `LEFT JOIN` de clientes com pedidos mostra também os clientes que nunca fizeram pedido.", true, "O LEFT traz todas as linhas da tabela da esquerda; onde não há pedido, as colunas de pedidos vêm NULL."),
      m("Em `FROM pedidos p JOIN clientes c ON c.id = p.cliente_id`, o que é o `p`?", ["Um apelido curto para a tabela pedidos", "Uma coluna", "Uma função", "Um erro de digitação"], 0, "Apelidos deixam a consulta mais curta: `p.valor` quer dizer a coluna valor de pedidos.")
    ],
    i2: [
      m("Em `WHERE preco > (SELECT AVG(preco) FROM produtos)`, o que roda primeiro?", ["A subconsulta entre parênteses, que calcula a média", "O WHERE de fora", "Nada roda", "Os dois ao mesmo tempo sem ligação"], 0, "A subconsulta devolve a média, e a consulta de fora compara cada preço com esse valor."),
      vf("Uma CTE (`WITH nome AS (...)`) pode ser usada depois como se fosse uma tabela.", true, "É como uma tabela temporária com nome, que existe só durante a consulta.")
    ],
    i3: [
      m("O que a chave primária (`PRIMARY KEY`) garante?", ["Que cada linha tenha um identificador único", "Que a tabela fique em ordem alfabética", "Que a coluna aceite qualquer valor", "Que a tabela seja apagada"], 0, "A chave primária não se repete e identifica cada linha."),
      vf("A coluna `cliente_id` na tabela de pedidos é uma chave estrangeira que aponta para clientes.", true, "Ela liga cada pedido a um cliente que existe na tabela clientes.")
    ],
    a1: [
      vf("Com window functions, as linhas continuam aparecendo uma a uma, cada uma ganhando uma coluna extra.", true, "Diferente do GROUP BY, que junta várias linhas em uma."),
      m("Em `RANK() OVER (PARTITION BY regiao ORDER BY total DESC)`, o que o `PARTITION BY regiao` faz?", ["Faz um ranking separado para cada região", "Apaga as regiões", "Ordena por região em ordem alfabética", "Soma o total"], 0, "O ranking recomeça em 1 dentro de cada região.")
    ],
    a2: [
      m("Para que serve um índice no banco de dados?", ["Para encontrar linhas mais rápido", "Para apagar dados duplicados", "Para fazer backup", "Para criar tabelas"], 0, "Como o índice de um livro, ele aponta onde estão as linhas procuradas."),
      vf("`WHERE nome LIKE '%silva'` (curinga no começo) aproveita bem um índice em `nome`.", false, "Com `%` no começo, o banco não sabe por onde o texto começa e precisa ler tudo.")
    ],
    a3: [
      m("Numa transação, o que o `COMMIT` faz?", ["Confirma as alterações", "Desfaz as alterações", "Apaga a tabela", "Inicia a transação"], 0, "`COMMIT` confirma; `ROLLBACK` desfaz; `START TRANSACTION` inicia."),
      vf("Numa transferência dentro de uma transação, pode acontecer de só o débito ser gravado, sem o crédito.", false, "A atomicidade garante tudo ou nada: os dois passos acontecem juntos ou nenhum acontece.")
    ]
  }
};
