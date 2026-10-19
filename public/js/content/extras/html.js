import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>Todo arquivo HTML segue a mesma estrutura básica. O navegador lê o arquivo de cima para baixo e monta a página a partir das <b>tags</b>, que são palavras entre os sinais <code>&lt;</code> e <code>&gt;</code>. A maioria das tags tem abertura e fechamento (<code>&lt;p&gt;</code> … <code>&lt;/p&gt;</code>), e o que fica entre elas é o <b>conteúdo</b>. Algumas tags, como <code>&lt;meta&gt;</code> e <code>&lt;img&gt;</code>, não têm fechamento: são chamadas de tags <b>vazias</b>.</p>
<p>As tags podem ter <b>atributos</b>, que são informações extras escritas na tag de abertura, no formato <code>nome="valor"</code>. Exemplo: <code>lang="pt-BR"</code> informa que o texto da página está em português do Brasil, o que ajuda leitores de tela e o Google.</p>
<p>A parte <code>&lt;head&gt;</code> guarda informações <b>sobre</b> a página (título da aba, codificação de caracteres, configurações para celular). A parte <code>&lt;body&gt;</code> guarda o que aparece <b>na tela</b>. Para criar uma página, basta salvar o código em um arquivo com extensão <code>.html</code> e abrir no navegador.</p>`,
      partes: [
        [c`<!doctype html>`, "Declaração do tipo do documento. Diz ao navegador que a página usa HTML5, a versão atual. Sempre vem na primeira linha."],
        [c`<html lang="pt-BR">`, "Abre o documento inteiro. O atributo `lang` informa o idioma do conteúdo."],
        [c`<head>`, "Começa a área de configurações. Nada do que está aqui aparece no corpo da página."],
        [c`<meta charset="utf-8">`, "Define a codificação de caracteres. Sem isso, acentos como “ç” e “ã” podem aparecer como símbolos estranhos."],
        [c`<meta name="viewport" content="width=device-width, initial-scale=1">`, "Faz a página usar a largura real da tela do celular, em vez de mostrar uma versão minúscula de computador."],
        [c`<title>Minha primeira página</title>`, "Texto que aparece na aba do navegador e no resultado do Google."],
        [c`<body>`, "Começa a área visível da página."],
        [c`<h1>Olá, mundo!</h1>`, "Título principal (heading de nível 1). Deve existir um por página."],
        [c`<p>Esta é minha primeira página.</p>`, "Um parágrafo de texto."],
        [c`</body> </html>`, "Fecham o corpo e o documento. Toda tag aberta precisa ser fechada na ordem inversa."]
      ]
    },
    b2: {
      detalhes: `<p>Existem seis níveis de títulos, de <code>&lt;h1&gt;</code> a <code>&lt;h6&gt;</code>. Eles não servem só para deixar o texto grande: indicam a <b>hierarquia</b> do conteúdo, como capítulos e subcapítulos de um livro. Para mudar o tamanho da letra, o certo é usar CSS, e não trocar o nível do título.</p>
<p>O link <code>&lt;a&gt;</code> usa o atributo <code>href</code> para dizer o destino. Ele pode apontar para outro site (<code>https://...</code>), para outra página do mesmo site (<code>contato.html</code>), para um e-mail (<code>mailto:</code>) ou para um telefone (<code>tel:</code>). O atributo <code>target="_blank"</code> abre em nova aba; junto com ele, usamos <code>rel="noopener"</code> por segurança, para a página aberta não conseguir controlar a sua.</p>
<p>A imagem <code>&lt;img&gt;</code> usa <code>src</code> para indicar o arquivo e <code>alt</code> para descrever a imagem em texto. Definir <code>width</code> e <code>height</code> reserva o espaço da imagem antes de ela carregar, evitando que a página “pule”.</p>`,
      partes: [
        [c`<h1>Padaria do Zé</h1>`, "Título principal da página: o nome do negócio."],
        [c`<h2>Nossos pães</h2>`, "Subtítulo de uma seção. Fica “dentro” do assunto do `h1`."],
        [c`<strong>quentinho</strong>`, "Destaca a palavra como importante. Leitores de tela dão ênfase a ela."],
        [c`<a href="https://wa.me/5511999999999"`, "Link para o WhatsApp. O número vai com código do país (55) e DDD, só com dígitos."],
        [c`target="_blank" rel="noopener"`, "Abre o link em nova aba (`_blank`), de forma segura (`noopener`)."],
        [c`Peça pelo WhatsApp </a>`, "O texto clicável do link. Deve dizer para onde ele leva."],
        [c`<img src="pao.jpg"`, "Mostra a imagem do arquivo `pao.jpg`, que precisa estar na mesma pasta do HTML."],
        [c`alt="Cesta com pães franceses"`, "Descrição da imagem para quem usa leitor de tela, para o Google e para quando a imagem não carrega."],
        [c`width="300">`, "Largura da imagem em pixels. Ajuda o navegador a reservar o espaço certo."]
      ]
    },
    b3: {
      detalhes: `<p>Há dois tipos principais de lista. A <code>&lt;ul&gt;</code> (<i>unordered list</i>) é usada quando a ordem não importa e mostra marcadores. A <code>&lt;ol&gt;</code> (<i>ordered list</i>) é usada quando a ordem importa, como um passo a passo, e numera os itens sozinha. Nas duas, cada item fica em um <code>&lt;li&gt;</code> (<i>list item</i>). Listas podem ficar uma dentro da outra para criar subitens.</p>
<p>A tabela <code>&lt;table&gt;</code> organiza dados em linhas e colunas. Ela costuma ser dividida em <code>&lt;thead&gt;</code> (cabeçalho) e <code>&lt;tbody&gt;</code> (corpo). Cada linha é um <code>&lt;tr&gt;</code> (<i>table row</i>). As células de cabeçalho usam <code>&lt;th&gt;</code> e as de dados usam <code>&lt;td&gt;</code>. Os atributos <code>colspan</code> e <code>rowspan</code> fazem uma célula ocupar mais de uma coluna ou linha.</p>`,
      partes: [
        [c`<ol>`, "Abre uma lista numerada: os itens recebem 1, 2, 3… automaticamente."],
        [c`<li>Abrir o sistema</li>`, "Um item da lista."],
        [c`<table>`, "Abre a tabela."],
        [c`<thead>`, "Grupo do cabeçalho: a linha com os nomes das colunas."],
        [c`<tr><th>Produto</th><th>Preço</th></tr>`, "Uma linha (`tr`) com duas células de cabeçalho (`th`). Ficam em negrito e centralizadas por padrão."],
        [c`<tbody>`, "Grupo do corpo da tabela, onde ficam os dados."],
        [c`<tr><td>Café</td><td>R$ 5,00</td></tr>`, "Uma linha de dados com duas células comuns (`td`)."],
        [c`</tbody> </table>`, "Fecham o corpo e a tabela."]
      ]
    },
    i1: {
      detalhes: `<p>O <code>&lt;form&gt;</code> agrupa os campos que serão enviados juntos. O atributo <code>action</code> diz <b>para onde</b> os dados vão (o endereço no servidor) e <code>method</code> diz <b>como</b> vão (<code>get</code> ou <code>post</code>). Cada campo precisa de um atributo <code>name</code>: é esse nome que o servidor usa para ler o valor digitado.</p>
<p>O <code>&lt;input&gt;</code> muda de comportamento conforme o <code>type</code>: <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>date</code>, <code>checkbox</code>, <code>radio</code>, <code>file</code> e outros. O navegador já valida alguns tipos sozinho; por exemplo, <code>type="email"</code> recusa um texto sem “@”. O atributo <code>required</code> impede o envio com o campo vazio.</p>
<p>O <code>&lt;label&gt;</code> é o nome visível do campo. Quando o <code>for</code> do label é igual ao <code>id</code> do campo, clicar no texto coloca o cursor no campo, e leitores de tela anunciam corretamente o que deve ser digitado. Para listas de opções, usamos <code>&lt;select&gt;</code> com <code>&lt;option&gt;</code>; para textos longos, <code>&lt;textarea&gt;</code>.</p>`,
      partes: [
        [c`<form action="/contato" method="post">`, "Abre o formulário. Os dados serão enviados para `/contato` usando o método POST, que não mostra os dados na URL."],
        [c`<label for="nome">Nome</label>`, "Rótulo do campo. O `for=\"nome\"` liga este texto ao campo de `id=\"nome\"`."],
        [c`<input id="nome" name="nome" required>`, "Campo de texto. `id` serve para o label, `name` é o nome do dado enviado e `required` o torna obrigatório."],
        [c`<input id="email" name="email" type="email" required>`, "Campo de e-mail: valida o formato e, no celular, abre o teclado com “@”."],
        [c`<select id="assunto" name="assunto">`, "Lista suspensa de opções."],
        [c`<option>Orçamento</option>`, "Uma opção da lista. Sem atributo `value`, o valor enviado é o próprio texto."],
        [c`<label><input type="checkbox" name="lgpd" required> Aceito…</label>`, "Caixa de marcar obrigatória. Colocar o campo dentro do label também os liga, sem precisar de `for`."],
        [c`<button type="submit">Enviar</button>`, "Botão que envia o formulário. Antes de enviar, o navegador verifica os campos obrigatórios."]
      ]
    },
    i2: {
      detalhes: `<p>Antes do HTML5, quase tudo era feito com <code>&lt;div&gt;</code>, uma caixa genérica sem significado. As tags <b>semânticas</b> fazem o mesmo papel de caixa, mas dizem <b>o que</b> o conteúdo é. Isso não muda a aparência da página (que continua sendo papel do CSS), mas muda como ela é entendida por buscadores, leitores de tela e outros programadores.</p>
<ul>
<li><code>&lt;header&gt;</code>: cabeçalho da página ou de uma seção (logo, título, menu).</li>
<li><code>&lt;nav&gt;</code>: bloco de links de navegação principal.</li>
<li><code>&lt;main&gt;</code>: o conteúdo principal; deve existir só um por página.</li>
<li><code>&lt;article&gt;</code>: conteúdo que faz sentido sozinho (um post, uma notícia, um produto).</li>
<li><code>&lt;section&gt;</code>: uma seção temática, normalmente com um título.</li>
<li><code>&lt;aside&gt;</code>: conteúdo complementar (barra lateral, links relacionados).</li>
<li><code>&lt;footer&gt;</code>: rodapé com informações de contato, direitos autorais etc.</li>
</ul>
<p>Use <code>&lt;div&gt;</code> apenas quando precisar de uma caixa só para estilo ou organização, sem significado especial.</p>`,
      partes: [
        [c`<header>`, "Cabeçalho do site: normalmente guarda o logo e o menu."],
        [c`<nav> <a href="/">Início</a> … </nav>`, "Menu de navegação. Leitores de tela permitem pular direto para ele."],
        [c`<main>`, "Conteúdo principal e único da página. Facilita o atalho “pular para o conteúdo”."],
        [c`<article> <h1>Como economizar…</h1> </article>`, "Um artigo completo, que poderia ser publicado sozinho em outro lugar."],
        [c`<aside>Posts relacionados</aside>`, "Conteúdo de apoio, relacionado mas não essencial."],
        [c`<footer>© 2026 Minha Empresa</footer>`, "Rodapé da página."]
      ]
    },
    i3: {
      detalhes: `<p>Acessibilidade é garantir que <b>qualquer pessoa</b> consiga usar o site: quem é cego e usa leitor de tela, quem enxerga pouco, quem não usa mouse, quem tem daltonismo, quem está com o braço machucado usando só o teclado, ou quem está no sol com a tela difícil de ler. No Brasil, a Lei Brasileira de Inclusão exige acessibilidade em sites de empresas e do governo.</p>
<p>O padrão internacional é a <b>WCAG</b> (Diretrizes de Acessibilidade para Conteúdo Web). Algumas regras básicas: toda imagem informativa tem <code>alt</code>; todo campo tem <code>label</code>; botões e links têm texto que explica a ação; há contraste suficiente entre texto e fundo; tudo pode ser usado pelo teclado (Tab, Enter, Esc); e a ordem dos títulos faz sentido.</p>
<p>Os atributos <b>ARIA</b> (<code>aria-label</code>, <code>role</code>, <code>aria-live</code> etc.) complementam o HTML quando ele não é suficiente. A regra de ouro: primeiro use a tag HTML correta (por exemplo, <code>&lt;button&gt;</code> em vez de <code>&lt;div&gt;</code> clicável); use ARIA só quando não houver alternativa.</p>`,
      partes: [
        [c`<button aria-label="Fechar janela">✕</button>`, "O botão só mostra um “✕”. O `aria-label` dá a ele um nome falado: o leitor de tela diz “Fechar janela, botão”."],
        [c`<img src="enfeite.svg" alt="">`, "Imagem puramente decorativa. O `alt` vazio (mas presente) faz o leitor de tela ignorá-la."],
        [c`<a href="/relatorio.pdf">Baixar relatório anual (PDF, 2 MB)</a>`, "Texto de link descritivo: diz o que é, o formato e o tamanho. Evite links como “clique aqui”."],
        [c`<p role="alert">Preencha o CPF.</p>`, "`role=\"alert\"` faz o leitor de tela anunciar a mensagem imediatamente quando ela aparece."]
      ]
    },
    a1: {
      detalhes: `<p><b>SEO</b> (<i>Search Engine Optimization</i>) é o conjunto de práticas para que a página apareça bem posicionada no Google e em outros buscadores. Parte do SEO depende do conteúdo e de outros sites apontarem para o seu, mas uma parte importante está no próprio HTML.</p>
<p>O <code>&lt;title&gt;</code> e a <code>&lt;meta name="description"&gt;</code> geralmente são o título azul e o resumo cinza que aparecem no resultado da busca. Cada página deve ter um título e uma descrição únicos, com cerca de 50–60 e 150–160 caracteres. A <code>&lt;link rel="canonical"&gt;</code> indica qual é o endereço oficial quando a mesma página pode ser acessada por vários endereços.</p>
<p>As tags <b>Open Graph</b> (<code>og:</code>) controlam a “prévia” que aparece quando alguém compartilha o link no WhatsApp, Facebook ou LinkedIn: título, descrição e imagem. A imagem costuma ter 1200×630 pixels. Além disso, existe o <b>JSON-LD</b>, um bloco de dados estruturados que ajuda o Google a mostrar informações especiais, como estrelas de avaliação, preço ou horário de funcionamento.</p>`,
      partes: [
        [c`<title>Pizzaria Bella | Delivery em Campinas</title>`, "Título com o nome do negócio e o que ele oferece, incluindo a cidade, que é como as pessoas pesquisam."],
        [c`<meta name="description" content="Pizza artesanal…">`, "Resumo exibido pelo Google abaixo do título. Deve convencer a pessoa a clicar."],
        [c`<link rel="canonical" href="https://pizzariabella.com.br/">`, "Endereço oficial da página, para evitar conteúdo duplicado no Google."],
        [c`<meta property="og:title" content="Pizzaria Bella">`, "Título da prévia ao compartilhar o link em redes sociais e mensageiros."],
        [c`<meta property="og:description" content="…">`, "Texto da prévia compartilhada."],
        [c`<meta property="og:image" content="https://…/capa.jpg">`, "Imagem da prévia. Precisa ser um endereço completo (com `https://`)."]
      ]
    },
    a2: {
      detalhes: `<p>A velocidade do site afeta diretamente as vendas e a posição no Google. O Google mede a experiência com as <b>Core Web Vitals</b>: <b>LCP</b> (quanto tempo o maior elemento visível leva para aparecer), <b>INP</b> (quão rápido a página responde a cliques) e <b>CLS</b> (quanto a página “pula” enquanto carrega).</p>
<p>Imagens costumam ser o maior peso da página. Boas práticas: usar formatos modernos (<b>WebP</b> ou <b>AVIF</b>), entregar o tamanho certo para cada tela com <code>&lt;picture&gt;</code> ou <code>srcset</code>, carregar sob demanda as que estão fora da tela com <code>loading="lazy"</code> e sempre informar <code>width</code> e <code>height</code>.</p>
<p>Scripts também atrasam a página: por padrão, quando o navegador encontra um <code>&lt;script&gt;</code>, ele <b>para</b> de montar a página até baixar e executar o arquivo. Os atributos <code>defer</code> e <code>async</code> mudam isso. Para medir, use o <b>Lighthouse</b> (aba do DevTools, F12) ou o site PageSpeed Insights.</p>`,
      partes: [
        [c`<img src="galeria-1.webp" … loading="lazy"`, "Imagem em WebP (mais leve) que só é baixada quando o usuário rola até perto dela."],
        [c`width="800" height="600"`, "Reserva o espaço da imagem antes do download, evitando que o conteúdo pule (CLS)."],
        [c`<picture>`, "Agrupa versões alternativas da mesma imagem."],
        [c`<source media="(max-width: 600px)" srcset="banner-mobile.webp">`, "Em telas de até 600px, usa a versão menor da imagem."],
        [c`<img src="banner-desktop.webp" alt="Promoção de inverno">`, "Versão padrão (desktop) e plano B para navegadores antigos. O `alt` fica sempre no `img`."],
        [c`<script src="app.js" defer></script>`, "Baixa o script em paralelo e só o executa depois que todo o HTML foi lido, sem travar a página."]
      ]
    },
    a3: {
      detalhes: `<p>O HTML moderno traz componentes prontos que antes exigiam JavaScript ou bibliotecas. O <code>&lt;details&gt;</code> cria uma área que abre e fecha; o <code>&lt;summary&gt;</code> é o texto clicável. Ele é acessível por teclado e funciona sem nenhuma linha de JavaScript.</p>
<p>O <code>&lt;dialog&gt;</code> cria janelas (modais). Chamando <code>showModal()</code> pelo JavaScript, ele aparece sobre a página, escurece o fundo, prende o foco do teclado dentro da janela e fecha com a tecla Esc. Um formulário com <code>method="dialog"</code> dentro dele fecha a janela ao ser enviado.</p>
<p>Os atributos <code>data-*</code> guardam informações personalizadas em qualquer elemento, como o ID de um produto. No JavaScript, eles aparecem no objeto <code>dataset</code>, com o nome convertido: <code>data-produto-id</code> vira <code>dataset.produtoId</code>.</p>`,
      partes: [
        [c`<details>`, "Componente que abre e fecha ao clicar no resumo."],
        [c`<summary>Qual o prazo de entrega?</summary>`, "Texto sempre visível e clicável (a pergunta)."],
        [c`<p>Até 5 dias úteis para capitais.</p>`, "Conteúdo escondido até abrir (a resposta)."],
        [c`<dialog id="aviso">`, "Janela modal, escondida por padrão."],
        [c`<form method="dialog"><button>OK</button></form>`, "Clicar em OK fecha a janela, sem precisar de JavaScript."],
        [c`<button onclick="aviso.showModal()">Finalizar</button>`, "Abre o diálogo como modal. Elementos com `id` ficam acessíveis pelo nome no JavaScript."],
        [c`<button data-produto-id="42" data-preco="19.90">`, "Guarda dados no botão. No JS: `botao.dataset.produtoId` vale \"42\" (sempre texto)."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual linha deve ser a primeira de um documento HTML5?", ["`<html>`", "`<!doctype html>`", "`<head>`", "`<meta charset=\"utf-8\">`"], 1, "O `<!doctype html>` vem antes de tudo e avisa ao navegador que a página usa HTML5."),
      m("Onde fica o conteúdo que aparece na tela para o visitante?", ["Dentro de `<head>`", "Dentro de `<title>`", "Dentro de `<body>`", "Dentro de `<meta>`"], 2, "O `<body>` guarda o conteúdo visível. O `<head>` guarda configurações e informações sobre a página."),
      m("Para que serve a tag `<title>`?", ["Criar o maior título da página", "Definir o texto da aba do navegador e do resultado no Google", "Mudar a fonte do texto", "Criar um link"], 1, "O `<title>` fica no `<head>` e não aparece no corpo; o título visível da página é o `<h1>`."),
      l("Complete para criar um link para o Google:", c`<a ____="https://www.google.com">Google</a>`, "href", "O atributo `href` (hypertext reference) indica o destino do link.", true),
      m("Qual atributo descreve uma imagem para quem usa leitor de tela?", ["`src`", "`title`", "`alt`", "`desc`"], 2, "O `alt` é lido por leitores de tela, mostrado quando a imagem não carrega e usado pelo Google."),
      m("Qual lista mostra os itens numerados automaticamente?", ["`<ul>`", "`<ol>`", "`<li>`", "`<dl>`"], 1, "`<ol>` é ordered list (lista ordenada). `<ul>` usa marcadores e `<li>` é cada item."),
      l("Complete para criar uma célula de cabeçalho de tabela:", c`<tr><____>Produto</____></tr>`, "th", "`<th>` é a célula de cabeçalho; `<td>` é a célula de dados comum.", true),
      vf("A tag `<img>` precisa de uma tag de fechamento `</img>`.", false, "`<img>` é uma tag vazia: não tem conteúdo nem fechamento."),
      m("O que faz `target=\"_blank\"` em um link?", ["Deixa o link sem cor", "Abre o link em uma nova aba", "Impede o clique", "Baixa o arquivo"], 1, "Use junto com `rel=\"noopener\"` por segurança."),
      m("Qual destas é a forma correta de aninhar (colocar uma dentro da outra) tags?", ["`<p><strong>texto</p></strong>`", "`<p><strong>texto</strong></p>`", "`<strong><p>texto</strong></p>`", "`<p>texto<strong></p>`"], 1, "A última tag aberta é a primeira a ser fechada, como caixas uma dentro da outra.")
    ],
    intermediario: [
      m("Qual atributo torna um campo de formulário obrigatório?", ["`needed`", "`required`", "`mandatory`", "`validate`"], 1, "Com `required`, o navegador impede o envio se o campo estiver vazio."),
      m("Para que serve o atributo `name` em um `<input>`?", ["Mostrar um texto dentro do campo", "Dar o nome com que o valor será enviado ao servidor", "Ligar o campo ao label", "Mudar a cor do campo"], 1, "O servidor lê os dados pelo `name`. Quem liga ao label é o `id`."),
      l("Complete para ligar o label ao campo de id \"email\":", c`<label ____="email">E-mail</label>
<input id="email" type="email">`, "for", "O atributo `for` do label deve ter o mesmo valor do `id` do campo.", true),
      m("Qual tipo de input abre o teclado numérico/com @ correto no celular para e-mail?", ["`type=\"text\"`", "`type=\"mail\"`", "`type=\"email\"`", "`type=\"at\"`"], 2, "`type=\"email\"` valida o formato e adapta o teclado."),
      m("Qual método de formulário coloca os dados visíveis na URL?", ["POST", "GET", "PUT", "SEND"], 1, "GET coloca os dados na URL (bom para buscas). POST envia no corpo da requisição."),
      m("Qual tag semântica representa o conteúdo principal e único da página?", ["`<section>`", "`<div>`", "`<main>`", "`<article>`"], 2, "Deve haver apenas um `<main>` por página."),
      m("Onde normalmente fica o menu de navegação principal?", ["`<nav>`", "`<aside>`", "`<footer>`", "`<menuitem>`"], 0, "`<nav>` identifica blocos de links de navegação."),
      vf("Trocar `<div>` por tags semânticas muda automaticamente a aparência da página.", false, "Tags semânticas mudam o significado, não a aparência. O visual é definido pelo CSS."),
      m("Como deixar uma imagem decorativa ser ignorada pelo leitor de tela?", ["Remover o atributo alt", "Usar `alt=\"\"` (vazio)", "Usar `alt=\"decoração\"`", "Usar `hidden`"], 1, "O `alt` vazio sinaliza que a imagem não tem informação. Sem o atributo, o leitor pode ler o nome do arquivo."),
      m("Um botão mostra só o ícone “✕”. Como dar a ele um nome acessível?", ["`title=\"x\"`", "`aria-label=\"Fechar\"`", "`alt=\"Fechar\"`", "`name=\"fechar\"`"], 1, "`aria-label` define o nome que o leitor de tela anuncia.")
    ],
    avancado: [
      m("O que as tags Open Graph (`og:`) controlam?", ["A velocidade do site", "A prévia do link ao compartilhar em redes sociais e mensageiros", "As cores do site", "A senha do formulário"], 1, "Título, descrição e imagem que aparecem no WhatsApp, Facebook, LinkedIn etc."),
      l("Complete a meta tag de descrição usada pelo Google:", c`<meta name="____" content="Pizza artesanal em Campinas">`, "description", "A meta description costuma aparecer como resumo no resultado da busca.", true),
      m("Para que serve `<link rel=\"canonical\">`?", ["Carregar uma fonte", "Indicar o endereço oficial da página e evitar conteúdo duplicado", "Criar um link para o topo", "Importar CSS"], 1, "Ajuda o Google quando a mesma página é acessível por endereços diferentes."),
      m("O que faz `loading=\"lazy\"` em uma imagem?", ["Deixa a imagem em baixa qualidade", "Só baixa a imagem quando ela estiver perto de aparecer na tela", "Carrega a imagem antes de tudo", "Impede o cache"], 1, "Economiza dados e acelera o carregamento inicial."),
      m("Qual a diferença de `defer` em um `<script>`?", ["Executa o script imediatamente, travando a página", "Baixa em paralelo e executa depois que o HTML terminou de ser lido, na ordem", "Nunca executa o script", "Executa só no celular"], 1, "`async` também baixa em paralelo, mas executa assim que baixar, sem garantir a ordem."),
      vf("Informar `width` e `height` nas imagens ajuda a evitar que a página “pule” enquanto carrega.", true, "O navegador reserva o espaço certo antes do download, melhorando o CLS."),
      m("Qual elemento cria uma área que abre e fecha sem JavaScript?", ["`<dialog>`", "`<details>` com `<summary>`", "`<toggle>`", "`<section open>`"], 1, "O `<summary>` é o texto clicável; o resto do conteúdo aparece ao abrir."),
      l("Complete o método que abre um `<dialog>` como janela modal:", c`document.querySelector("dialog").____();`, ["showModal", "showModal()"], "`showModal()` abre como modal, escurecendo o fundo e prendendo o foco; `show()` abre sem ser modal."),
      m("Como o JavaScript lê o atributo `data-produto-id` de um botão?", ["`botao.data.produto-id`", "`botao.dataset.produtoId`", "`botao.produtoId`", "`botao.getData(\"id\")`"], 1, "Os atributos `data-*` ficam em `dataset`, com o nome em camelCase."),
      m("Qual formato de imagem moderno é normalmente mais leve que JPG e PNG?", ["BMP", "TIFF", "WebP", "GIF"], 2, "WebP (e AVIF) oferecem boa qualidade com arquivos menores.")
    ]
  }
};
