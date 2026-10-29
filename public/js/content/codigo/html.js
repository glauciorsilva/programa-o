// Exercícios de código da trilha html (completar e criar do zero), por tópico.
const c = String.raw;

export default {
  // ---------------------------------------------------------------- b1: Estrutura de uma página
  b1: [
    {
      tipo: "completar",
      titulo: "Esqueleto da página da padaria",
      enunciado: `A Padaria do Zé quer a primeira página do site. Complete o esqueleto:
        <ul>
          <li>o idioma da página deve ser <code>pt-BR</code>;</li>
          <li>a codificação de caracteres deve ser <code>utf-8</code> (para os acentos aparecerem certinho);</li>
          <li>o texto da aba do navegador deve ser exatamente <code>Padaria do Zé</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo valor certo.`,
      dica: `O idioma vai no atributo <code>lang</code> da tag <code>&lt;html&gt;</code>; a codificação vai em <code>&lt;meta charset="..."&gt;</code>; o texto da aba fica dentro de <code>&lt;title&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="____">
<head>
  <meta charset="____">
  <title>____</title>
</head>
<body>
  <h1>Padaria do Zé</h1>
  <p>Pão quentinho todos os dias.</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Padaria do Zé</title>
</head>
<body>
  <h1>Padaria do Zé</h1>
  <p>Pão quentinho todos os dias.</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(document.documentElement.getAttribute("lang") === "pt-BR", 'O atributo lang da tag <html> deveria ser "pt-BR", mas é "' + document.documentElement.getAttribute("lang") + '".');
var m = document.querySelector("meta[charset]");
__assert(m && m.getAttribute("charset").toLowerCase() === "utf-8", 'Falta <meta charset="utf-8"> no <head>.');
__assert(document.title === "Padaria do Zé", 'O texto da aba (<title>) deveria ser "Padaria do Zé", mas é "' + document.title + '".');`
    },
    {
      tipo: "completar",
      titulo: "Separando head e body",
      enunciado: `A Clínica Sorriso tem uma página com as configurações e o conteúdo misturados. Complete as tags que faltam:
        a área de configurações (com o <code>&lt;title&gt;</code>) e a área visível (com o <code>&lt;h1&gt;</code> e o parágrafo).
        Substitua cada <code>____</code> pelo nome da tag certa.`,
      dica: `Configurações ficam em <code>&lt;head&gt;</code>; o que aparece na tela fica em <code>&lt;body&gt;</code>. A tag de fechamento tem uma barra: <code>&lt;/head&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<____>
  <meta charset="utf-8">
  <title>Clínica Sorriso</title>
</____>
<____>
  <h1>Clínica Sorriso</h1>
  <p>Atendimento de segunda a sexta, das 8h às 18h.</p>
</____>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Clínica Sorriso</title>
</head>
<body>
  <h1>Clínica Sorriso</h1>
  <p>Atendimento de segunda a sexta, das 8h às 18h.</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [
        [/<head>[\s\S]*<title>[\s\S]*<\/head>/i, "O <title> precisa ficar entre <head> e </head>."],
        [/<\/head>\s*<body>[\s\S]*<h1>[\s\S]*<\/body>/i, "Depois de </head> abra o <body>, coloque o conteúdo visível e feche com </body>."]
      ],
      teste: c`
__assert(document.title === "Clínica Sorriso", 'O título da aba deveria ser "Clínica Sorriso".');
var h = document.body.querySelector("h1");
__assert(h && h.textContent.trim() === "Clínica Sorriso", "O <h1> com o nome da clínica precisa estar no <body>.");
__assert(document.body.querySelector("p"), "O parágrafo precisa estar no <body>.");`
    },
    {
      tipo: "completar",
      titulo: "Pronta para o celular",
      enunciado: `A página do Delivery Rápido aparece minúscula no celular e o navegador nem sabe que ela é HTML5. Complete:
        <ul>
          <li>a declaração da primeira linha, que avisa que o documento é HTML5;</li>
          <li>a meta tag <code>viewport</code>, para a página usar a largura real da tela do aparelho.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `A primeira linha é <code>&lt;!doctype html&gt;</code>. A meta tag de celular é <code>name="viewport"</code> com <code>content="width=device-width, initial-scale=1"</code>.`,
      lang: "web",
      inicial: {
        html: c`<!____ html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="____" content="width=____, initial-scale=1">
  <title>Delivery Rápido</title>
</head>
<body>
  <h1>Delivery Rápido</h1>
  <p>Seu lanche em até 30 minutos.</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Delivery Rápido</title>
</head>
<body>
  <h1>Delivery Rápido</h1>
  <p>Seu lanche em até 30 minutos.</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [[/^\s*<!doctype html>/i, "A primeira linha deve ser <!doctype html>."]],
      teste: c`
__assert(document.compatMode === "CSS1Compat", "Falta a declaração <!doctype html> na primeira linha.");
var v = document.querySelector('meta[name="viewport"]');
__assert(v, 'Falta a meta tag com name="viewport".');
__assert(/width=device-width/.test(v.getAttribute("content") || ""), 'O content da viewport deve ter "width=device-width".');`
    },
    {
      tipo: "criar",
      titulo: "Página de boas-vindas da escola",
      enunciado: `Crie do zero a página inicial da Escola Aprender, com a estrutura completa de um documento HTML5:
        <ul>
          <li><code>&lt;!doctype html&gt;</code> na primeira linha e <code>&lt;html lang="pt-BR"&gt;</code>;</li>
          <li>no <code>&lt;head&gt;</code>: <code>&lt;meta charset="utf-8"&gt;</code>, a meta <code>viewport</code> e o título da aba <code>Escola Aprender</code>;</li>
          <li>no <code>&lt;body&gt;</code>: um <code>&lt;h1&gt;</code> com o texto <code>Bem-vindo à Escola Aprender</code> e um parágrafo <code>&lt;p&gt;</code> com <code>Matrículas abertas para 2027.</code></li>
        </ul>`,
      dica: `Comece pelo esqueleto (doctype, html, head, body) e só depois coloque o conteúdo. Feche as tags na ordem inversa em que abriu.`,
      lang: "web",
      inicial: {
        html: c`<!-- Escreva aqui a página completa da Escola Aprender:
     doctype, html, head (charset, viewport, title) e body (h1 e p) -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Escola Aprender</title>
</head>
<body>
  <h1>Bem-vindo à Escola Aprender</h1>
  <p>Matrículas abertas para 2027.</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [
        [/^\s*<!doctype html>/i, "Comece o arquivo com <!doctype html>."],
        [/<html[^>]*\blang="pt-BR"/i, 'Abra o documento com <html lang="pt-BR">.'],
        [/<head>[\s\S]*<meta charset="utf-8"[\s\S]*<\/head>/i, 'Coloque <meta charset="utf-8"> dentro do <head>.'],
        [/<meta[^>]*name="viewport"/i, 'Falta a meta tag name="viewport".']
      ],
      teste: c`
__assert(document.title === "Escola Aprender", 'O título da aba deveria ser "Escola Aprender", mas é "' + document.title + '".');
var h = document.querySelector("body h1");
__assert(h && h.textContent.trim() === "Bem-vindo à Escola Aprender", 'O <h1> deveria ter o texto "Bem-vindo à Escola Aprender".');
var p = document.querySelector("body p");
__assert(p && p.textContent.trim() === "Matrículas abertas para 2027.", 'O parágrafo deveria ser "Matrículas abertas para 2027."');`
    },
    {
      tipo: "criar",
      titulo: "Cardápio do restaurante",
      enunciado: `O Restaurante Sabor Caseiro quer uma página simples com o cardápio do dia. Crie do zero um documento HTML5 completo
        (doctype, <code>&lt;html lang="pt-BR"&gt;</code>, <code>&lt;meta charset="utf-8"&gt;</code>) com:
        <ul>
          <li>título da aba: <code>Cardápio | Sabor Caseiro</code>;</li>
          <li>um <code>&lt;h1&gt;</code> com <code>Cardápio do dia</code>;</li>
          <li>três parágrafos, nesta ordem: <code>Prato do dia: feijoada</code>, <code>Sobremesa: pudim</code> e <code>Horário: 11h às 15h</code>.</li>
        </ul>`,
      dica: `Cada parágrafo é um <code>&lt;p&gt;...&lt;/p&gt;</code> separado. O título da aba fica no <code>&lt;head&gt;</code>, não no <code>&lt;body&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie a página completa do cardápio aqui -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Cardápio | Sabor Caseiro</title>
</head>
<body>
  <h1>Cardápio do dia</h1>
  <p>Prato do dia: feijoada</p>
  <p>Sobremesa: pudim</p>
  <p>Horário: 11h às 15h</p>
</body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [
        [/^\s*<!doctype html>/i, "Comece o arquivo com <!doctype html>."],
        [/<html[^>]*\blang="pt-BR"/i, 'Abra o documento com <html lang="pt-BR">.'],
        [/<meta charset="utf-8"/i, 'Falta <meta charset="utf-8">.']
      ],
      teste: c`
__assert(document.title === "Cardápio | Sabor Caseiro", 'O título da aba deveria ser "Cardápio | Sabor Caseiro".');
var h = document.querySelector("h1");
__assert(h && h.textContent.trim() === "Cardápio do dia", 'O <h1> deveria ser "Cardápio do dia".');
var ps = [].map.call(document.querySelectorAll("body p"), function (p) { return p.textContent.trim(); });
__assert(ps.length === 3, "Deveriam existir 3 parágrafos <p>, mas há " + ps.length + ".");
var esperado = ["Prato do dia: feijoada", "Sobremesa: pudim", "Horário: 11h às 15h"];
esperado.forEach(function (t, i) { __assert(ps[i] === t, "O parágrafo " + (i + 1) + ' deveria ser "' + t + '", mas é "' + ps[i] + '".'); });`
    }
  ],

  // ---------------------------------------------------------------- b2: Textos, links e imagens
  b2: [
    {
      tipo: "completar",
      titulo: "Link do WhatsApp da padaria",
      enunciado: `Complete o link para o WhatsApp da padaria (<code>https://wa.me/5511988887777</code>). Ele deve abrir em uma <b>nova aba</b>, de forma segura.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `O destino vai no atributo <code>href</code>. Para abrir em nova aba, use <code>target="_blank"</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Padaria do Zé</h1>
<p>Faça sua encomenda:</p>
<a ____="https://wa.me/5511988887777" target="____" rel="noopener">Peça pelo WhatsApp</a>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Padaria do Zé</h1>
<p>Faça sua encomenda:</p>
<a href="https://wa.me/5511988887777" target="_blank" rel="noopener">Peça pelo WhatsApp</a>`,
        css: "",
        js: ""
      },
      teste: c`
var a = document.querySelector("a");
__assert(a && a.getAttribute("href") === "https://wa.me/5511988887777", 'O href do link deveria ser "https://wa.me/5511988887777".');
__assert(a.getAttribute("target") === "_blank", 'Para abrir em nova aba, use target="_blank".');
__assert((a.getAttribute("rel") || "").indexOf("noopener") >= 0, 'Mantenha rel="noopener".');`
    },
    {
      tipo: "completar",
      titulo: "Foto do bolo com descrição",
      enunciado: `A confeitaria quer mostrar a foto <code>bolo.jpg</code> com a descrição <code>Bolo de chocolate com cobertura de brigadeiro</code>
        para quem usa leitor de tela. Substitua cada <code>____</code> pelo atributo certo.`,
      dica: `Um atributo diz <b>qual arquivo</b> mostrar; o outro é o <b>texto alternativo</b> que descreve a imagem.`,
      lang: "web",
      inicial: {
        html: c`<h2>Bolo da semana</h2>
<img ____="bolo.jpg" ____="Bolo de chocolate com cobertura de brigadeiro" width="300" height="200">`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Bolo da semana</h2>
<img src="bolo.jpg" alt="Bolo de chocolate com cobertura de brigadeiro" width="300" height="200">`,
        css: "",
        js: ""
      },
      teste: c`
var img = document.querySelector("img");
__assert(img && img.getAttribute("src") === "bolo.jpg", 'A imagem deveria ter src="bolo.jpg".');
__assert(img.getAttribute("alt") === "Bolo de chocolate com cobertura de brigadeiro", "A descrição precisa estar no atributo alt.");
__assert(img.getAttribute("width") === "300" && img.getAttribute("height") === "200", "Mantenha width e height da imagem.");`
    },
    {
      tipo: "completar",
      titulo: "Contatos da clínica",
      enunciado: `Na página da Clínica Vida, o link de e-mail deve abrir o programa de e-mail para <code>contato@clinicavida.com.br</code>
        e o link de telefone deve ligar para <code>+551133334444</code> no celular.
        Substitua cada <code>____</code> pelo prefixo certo do <code>href</code>.`,
      dica: `Links de e-mail começam com <code>mailto:</code> e links de telefone com <code>tel:</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Fale conosco</h2>
<p><a href="____:contato@clinicavida.com.br">Enviar e-mail</a></p>
<p><a href="____:+551133334444">Ligar: (11) 3333-4444</a></p>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Fale conosco</h2>
<p><a href="mailto:contato@clinicavida.com.br">Enviar e-mail</a></p>
<p><a href="tel:+551133334444">Ligar: (11) 3333-4444</a></p>`,
        css: "",
        js: ""
      },
      teste: c`
var links = document.querySelectorAll("a");
__assert(links.length === 2, "Deveriam existir 2 links.");
__assert(links[0].getAttribute("href") === "mailto:contato@clinicavida.com.br", 'O link de e-mail deveria ter href="mailto:contato@clinicavida.com.br".');
__assert(links[1].getAttribute("href") === "tel:+551133334444", 'O link de telefone deveria ter href="tel:+551133334444".');`
    },
    {
      tipo: "criar",
      titulo: "Página de um produto da loja",
      enunciado: `Crie do zero a página do produto de uma loja de esportes:
        <ul>
          <li>um <code>&lt;h1&gt;</code> com <code>Tênis Corrida Pro</code>;</li>
          <li>uma imagem com <code>src="tenis.jpg"</code>, um <code>alt</code> descritivo (pelo menos 10 letras), <code>width="400"</code> e <code>height="300"</code>;</li>
          <li>um <code>&lt;h2&gt;</code> com <code>Descrição</code>;</li>
          <li>um parágrafo que contenha as palavras <code>frete grátis</code> destacadas com <code>&lt;strong&gt;</code>;</li>
          <li>um link com o texto <code>Comprar agora</code> que leve para <code>carrinho.html</code>.</li>
        </ul>`,
      dica: `Dentro do parágrafo: <code>&lt;p&gt;Leve hoje com &lt;strong&gt;...&lt;/strong&gt;!&lt;/p&gt;</code>. Links para outra página do mesmo site usam só o nome do arquivo no <code>href</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie a página do Tênis Corrida Pro aqui -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Tênis Corrida Pro</h1>
<img src="tenis.jpg" alt="Tênis de corrida azul com sola branca" width="400" height="300">
<h2>Descrição</h2>
<p>Leve e confortável para treinos diários. Compre hoje com <strong>frete grátis</strong>!</p>
<a href="carrinho.html">Comprar agora</a>`,
        css: "",
        js: ""
      },
      teste: c`
var h1 = document.querySelector("h1");
__assert(h1 && h1.textContent.trim() === "Tênis Corrida Pro", 'Falta o <h1> "Tênis Corrida Pro".');
var img = document.querySelector('img[src="tenis.jpg"]');
__assert(img, 'Falta a imagem com src="tenis.jpg".');
__assert((img.getAttribute("alt") || "").trim().length >= 10, "O alt da imagem deve descrevê-la (pelo menos 10 letras).");
__assert(img.getAttribute("width") === "400" && img.getAttribute("height") === "300", 'A imagem precisa de width="400" e height="300".');
var h2 = document.querySelector("h2");
__assert(h2 && h2.textContent.trim() === "Descrição", 'Falta o <h2> "Descrição".');
var s = document.querySelector("p strong");
__assert(s && s.textContent.trim().toLowerCase() === "frete grátis", 'Destaque "frete grátis" com <strong> dentro de um parágrafo.');
var a = [].find.call(document.querySelectorAll("a"), function (x) { return x.textContent.trim() === "Comprar agora"; });
__assert(a, 'Falta o link com o texto "Comprar agora".');
__assert(a.getAttribute("href") === "carrinho.html", 'O link "Comprar agora" deveria levar para carrinho.html.');`
    },
    {
      tipo: "criar",
      titulo: "Hierarquia de títulos do blog",
      enunciado: `Crie a estrutura de títulos de um post do blog Finanças em Dia, exatamente nesta ordem:
        <ul>
          <li><code>&lt;h1&gt;</code> <code>Blog Finanças em Dia</code></li>
          <li><code>&lt;h2&gt;</code> <code>Como montar um orçamento</code>, seguido de dois <code>&lt;h3&gt;</code>: <code>Anote os gastos</code> e <code>Defina metas</code></li>
          <li><code>&lt;h2&gt;</code> <code>Como sair das dívidas</code></li>
        </ul>
        No fim, coloque um link com o texto <code>Leia no site do Banco Central</code> para <code>https://www.bcb.gov.br</code>, abrindo em nova aba de forma segura.`,
      dica: `Os níveis dos títulos mostram a hierarquia, como capítulos e subcapítulos. Para nova aba segura: <code>target="_blank" rel="noopener"</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie os títulos (h1, h2, h3) e o link aqui -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Blog Finanças em Dia</h1>
<h2>Como montar um orçamento</h2>
<h3>Anote os gastos</h3>
<h3>Defina metas</h3>
<h2>Como sair das dívidas</h2>
<a href="https://www.bcb.gov.br" target="_blank" rel="noopener">Leia no site do Banco Central</a>`,
        css: "",
        js: ""
      },
      teste: c`
var t = [].map.call(document.querySelectorAll("h1, h2, h3, h4, h5, h6"), function (h) { return h.tagName + ":" + h.textContent.trim(); });
var esperado = ["H1:Blog Finanças em Dia", "H2:Como montar um orçamento", "H3:Anote os gastos", "H3:Defina metas", "H2:Como sair das dívidas"];
__assert(t.length === esperado.length, "Deveriam existir " + esperado.length + " títulos, mas há " + t.length + ".");
esperado.forEach(function (e, i) { __assert(t[i] === e, "O título " + (i + 1) + " deveria ser " + e.replace(":", ' "') + '", mas é ' + t[i].replace(":", ' "') + '".'); });
var a = document.querySelector('a[href^="https://www.bcb.gov.br"]');
__assert(a && a.textContent.trim() === "Leia no site do Banco Central", 'Falta o link "Leia no site do Banco Central" para https://www.bcb.gov.br.');
__assert(a.getAttribute("target") === "_blank" && (a.getAttribute("rel") || "").indexOf("noopener") >= 0, 'O link deve abrir em nova aba com target="_blank" e rel="noopener".');`
    }
  ],

  // ---------------------------------------------------------------- b3: Listas e tabelas
  b3: [
    {
      tipo: "completar",
      titulo: "Lista de compras do mercado",
      enunciado: `Complete a lista de compras do mercado. A ordem dos itens não importa, então use uma lista <b>com marcadores</b>.
        Substitua cada <code>____</code> pela tag certa.`,
      dica: `Lista com marcadores é <code>&lt;ul&gt;</code>; cada item é um <code>&lt;li&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Compras da semana</h2>
<____>
  <li>Arroz</li>
  <li>Feijão</li>
  <____>Café</____>
  <li>Leite</li>
</____>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Compras da semana</h2>
<ul>
  <li>Arroz</li>
  <li>Feijão</li>
  <li>Café</li>
  <li>Leite</li>
</ul>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(!document.querySelector("ol"), "A ordem não importa: use <ul>, não <ol>.");
var itens = document.querySelectorAll("ul > li");
__assert(itens.length === 4, "A lista <ul> deveria ter 4 itens <li>, mas tem " + itens.length + ".");
__assert(itens[2].textContent.trim() === "Café", 'O terceiro item deveria ser "Café".');`
    },
    {
      tipo: "completar",
      titulo: "Passo a passo do cadastro",
      enunciado: `O RH quer um passo a passo para novos funcionários cadastrarem o ponto eletrônico. Aqui a <b>ordem importa</b>,
        então os itens devem ser numerados automaticamente. Substitua cada <code>____</code> pela tag certa.`,
      dica: `Lista numerada é <code>&lt;ol&gt;</code> (<i>ordered list</i>).`,
      lang: "web",
      inicial: {
        html: c`<h2>Como cadastrar seu ponto</h2>
<____>
  <li>Abrir o aplicativo da empresa</li>
  <li>Entrar com seu CPF</li>
  <____>Tirar uma foto do rosto</____>
  <li>Confirmar o cadastro</li>
</____>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Como cadastrar seu ponto</h2>
<ol>
  <li>Abrir o aplicativo da empresa</li>
  <li>Entrar com seu CPF</li>
  <li>Tirar uma foto do rosto</li>
  <li>Confirmar o cadastro</li>
</ol>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(!document.querySelector("ul"), "A ordem importa: use <ol>, não <ul>.");
var itens = document.querySelectorAll("ol > li");
__assert(itens.length === 4, "A lista <ol> deveria ter 4 itens <li>, mas tem " + itens.length + ".");
__assert(itens[2].textContent.trim() === "Tirar uma foto do rosto", 'O terceiro passo deveria ser "Tirar uma foto do rosto".');`
    },
    {
      tipo: "completar",
      titulo: "Tabela de preços da cafeteria",
      enunciado: `Complete a tabela de preços da cafeteria. A primeira linha é o cabeçalho (<code>Produto</code> e <code>Preço</code>)
        e as outras são os dados. Substitua cada <code>____</code> pela tag certa.`,
      dica: `O grupo do cabeçalho é <code>&lt;thead&gt;</code> e o do corpo é <code>&lt;tbody&gt;</code>. Célula de cabeçalho é <code>&lt;th&gt;</code>; de dados, <code>&lt;td&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<table>
  <____>
    <tr><th>Produto</th><____>Preço</____></tr>
  </thead>
  <____>
    <tr><td>Café expresso</td><td>R$ 5,00</td></tr>
    <tr><td>Cappuccino</td><td>R$ 8,50</td></tr>
    <tr><td>Pão de queijo</td><td>R$ 4,00</td></tr>
  </tbody>
</table>`,
        css: c`table { border-collapse: collapse; }
th, td { border: 1px solid #999; padding: 4px 8px; }`,
        js: ""
      },
      solucao: {
        html: c`<table>
  <thead>
    <tr><th>Produto</th><th>Preço</th></tr>
  </thead>
  <tbody>
    <tr><td>Café expresso</td><td>R$ 5,00</td></tr>
    <tr><td>Cappuccino</td><td>R$ 8,50</td></tr>
    <tr><td>Pão de queijo</td><td>R$ 4,00</td></tr>
  </tbody>
</table>`,
        css: c`table { border-collapse: collapse; }
th, td { border: 1px solid #999; padding: 4px 8px; }`,
        js: ""
      },
      padroes: [
        [/<thead>/i, "Abra o cabeçalho da tabela com <thead>."],
        [/<tbody>/i, "Abra o corpo da tabela com <tbody>."]
      ],
      teste: c`
var th = document.querySelectorAll("thead th");
__assert(th.length === 2, "O cabeçalho (thead) deveria ter 2 células <th>, mas tem " + th.length + ".");
__assert(th[1].textContent.trim() === "Preço", 'A segunda célula do cabeçalho deveria ser <th>Preço</th>.');
__assert(document.querySelectorAll("tbody tr").length === 3, "O corpo (tbody) deveria ter 3 linhas.");
__assert(document.querySelectorAll("tbody td").length === 6, "O corpo deveria ter 6 células <td>.");`
    },
    {
      tipo: "criar",
      titulo: "Cardápio com sublistas",
      enunciado: `Crie o cardápio da lanchonete como uma lista com marcadores (<code>&lt;ul&gt;</code>) com duas categorias:
        <code>Bebidas</code> e <code>Lanches</code>. Dentro de cada categoria, coloque uma <b>sublista</b> <code>&lt;ul&gt;</code>:
        <ul>
          <li>Bebidas: <code>Suco de laranja</code>, <code>Refrigerante</code>;</li>
          <li>Lanches: <code>X-burguer</code>, <code>Misto quente</code>, <code>Coxinha</code>.</li>
        </ul>`,
      dica: `A sublista fica <b>dentro</b> do <code>&lt;li&gt;</code> da categoria: <code>&lt;li&gt;Bebidas &lt;ul&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Cardápio</h2>
<!-- Crie a lista com as categorias e as sublistas aqui -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Cardápio</h2>
<ul>
  <li>Bebidas
    <ul>
      <li>Suco de laranja</li>
      <li>Refrigerante</li>
    </ul>
  </li>
  <li>Lanches
    <ul>
      <li>X-burguer</li>
      <li>Misto quente</li>
      <li>Coxinha</li>
    </ul>
  </li>
</ul>`,
        css: "",
        js: ""
      },
      teste: c`
var ext = document.querySelector("ul");
__assert(ext, "Falta a lista <ul>.");
var cats = [].filter.call(ext.children, function (e) { return e.tagName === "LI"; });
__assert(cats.length === 2, "A lista principal deveria ter 2 categorias (<li>), mas tem " + cats.length + ".");
function sub(li) { var u = li.querySelector(":scope > ul"); return u ? [].map.call(u.querySelectorAll(":scope > li"), function (x) { return x.textContent.trim(); }) : null; }
__assert(cats[0].firstChild.textContent.trim() === "Bebidas" && cats[1].firstChild.textContent.trim() === "Lanches", 'As categorias deveriam ser "Bebidas" e "Lanches", nessa ordem.');
var b = sub(cats[0]), l = sub(cats[1]);
__assert(b, "Coloque uma sublista <ul> dentro do <li> de Bebidas.");
__assert(l, "Coloque uma sublista <ul> dentro do <li> de Lanches.");
__assert(b.join("|") === "Suco de laranja|Refrigerante", "A sublista de Bebidas deveria ter: Suco de laranja, Refrigerante.");
__assert(l.join("|") === "X-burguer|Misto quente|Coxinha", "A sublista de Lanches deveria ter: X-burguer, Misto quente, Coxinha.");`
    },
    {
      tipo: "criar",
      titulo: "Relatório de vendas com total",
      enunciado: `Crie a tabela do relatório de vendas do dia de uma loja:
        <ul>
          <li>no <code>&lt;thead&gt;</code>, uma linha com os cabeçalhos <code>Produto</code>, <code>Quantidade</code> e <code>Valor</code>;</li>
          <li>no <code>&lt;tbody&gt;</code>, três linhas: <code>Caneta | 10 | R$ 20,00</code>, <code>Caderno | 3 | R$ 45,00</code> e <code>Mochila | 1 | R$ 30,00</code>;</li>
          <li>uma última linha no <code>&lt;tbody&gt;</code> com uma célula <code>Total</code> que ocupa <b>duas colunas</b> e a célula <code>R$ 95,00</code>.</li>
        </ul>`,
      dica: `Para uma célula ocupar duas colunas, use <code>colspan="2"</code> no <code>&lt;td&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Vendas de hoje</h2>
<!-- Crie a tabela aqui -->
`,
        css: c`table { border-collapse: collapse; }
th, td { border: 1px solid #999; padding: 4px 8px; }`,
        js: ""
      },
      solucao: {
        html: c`<h2>Vendas de hoje</h2>
<table>
  <thead>
    <tr><th>Produto</th><th>Quantidade</th><th>Valor</th></tr>
  </thead>
  <tbody>
    <tr><td>Caneta</td><td>10</td><td>R$ 20,00</td></tr>
    <tr><td>Caderno</td><td>3</td><td>R$ 45,00</td></tr>
    <tr><td>Mochila</td><td>1</td><td>R$ 30,00</td></tr>
    <tr><td colspan="2">Total</td><td>R$ 95,00</td></tr>
  </tbody>
</table>`,
        css: c`table { border-collapse: collapse; }
th, td { border: 1px solid #999; padding: 4px 8px; }`,
        js: ""
      },
      teste: c`
var th = [].map.call(document.querySelectorAll("thead th"), function (x) { return x.textContent.trim(); });
__assert(th.join("|") === "Produto|Quantidade|Valor", "O cabeçalho (thead com th) deveria ser: Produto, Quantidade, Valor.");
var linhas = document.querySelectorAll("tbody tr");
__assert(linhas.length === 4, "O tbody deveria ter 4 linhas (3 produtos + total), mas tem " + linhas.length + ".");
var esperado = [["Caneta", "10", "R$ 20,00"], ["Caderno", "3", "R$ 45,00"], ["Mochila", "1", "R$ 30,00"]];
esperado.forEach(function (e, i) {
  var tds = [].map.call(linhas[i].querySelectorAll("td"), function (x) { return x.textContent.trim(); });
  __assert(tds.join("|") === e.join("|"), "A linha " + (i + 1) + " deveria ser: " + e.join(", ") + ".");
});
var ult = linhas[3].querySelectorAll("td");
__assert(ult.length === 2 && ult[0].textContent.trim() === "Total", 'A última linha deveria ter 2 células: "Total" e "R$ 95,00".');
__assert(ult[0].colSpan === 2, 'A célula "Total" deveria ocupar duas colunas (colspan="2").');
__assert(ult[1].textContent.trim() === "R$ 95,00", 'O total deveria ser "R$ 95,00".');`
    }
  ],

  // ---------------------------------------------------------------- i1: Formulários
  i1: [
    {
      tipo: "completar",
      titulo: "Login do sistema",
      enunciado: `Complete o formulário de login do sistema da empresa:
        <ul>
          <li>o campo <code>email</code> deve validar o formato de e-mail;</li>
          <li>o campo <code>senha</code> deve esconder o que é digitado;</li>
          <li>os dois campos devem ser <b>obrigatórios</b>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Os tipos certos são <code>email</code> e <code>password</code>. O atributo que torna obrigatório não precisa de valor.`,
      lang: "web",
      inicial: {
        html: c`<form action="/login" method="post">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="____" ____>

  <label for="senha">Senha</label>
  <input id="senha" name="senha" type="____" ____>

  <button type="submit">Entrar</button>
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 280px; }`,
        js: ""
      },
      solucao: {
        html: c`<form action="/login" method="post">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required>

  <label for="senha">Senha</label>
  <input id="senha" name="senha" type="password" required>

  <button type="submit">Entrar</button>
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 280px; }`,
        js: ""
      },
      teste: c`
var e = document.getElementById("email"), s = document.getElementById("senha");
__assert(e && e.type === "email", 'O campo email deveria ter type="email".');
__assert(s && s.type === "password", 'O campo senha deveria ter type="password".');
__assert(e.required && s.required, "Os dois campos devem ter o atributo required.");
__digitar(e, "ana");
__assert(!e.checkValidity(), 'O campo de e-mail deveria recusar "ana" (sem @).');`
    },
    {
      tipo: "completar",
      titulo: "Ligando os rótulos aos campos",
      enunciado: `No formulário de cadastro da academia, clicar no texto <code>Nome completo</code> deveria colocar o cursor no campo, mas isso não acontece.
        Ligue cada <code>&lt;label&gt;</code> ao seu campo. Substitua cada <code>____</code> pelo que falta.`,
      dica: `O atributo <code>for</code> do label precisa ter o mesmo valor do <code>id</code> do campo.`,
      lang: "web",
      inicial: {
        html: c`<form>
  <label ____="nome">Nome completo</label>
  <input id="____" name="nome">

  <label for="telefone">Telefone</label>
  <input id="____" name="telefone" type="tel">
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 280px; }`,
        js: ""
      },
      solucao: {
        html: c`<form>
  <label for="nome">Nome completo</label>
  <input id="nome" name="nome">

  <label for="telefone">Telefone</label>
  <input id="telefone" name="telefone" type="tel">
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 280px; }`,
        js: ""
      },
      teste: c`
var n = document.querySelector('input[name="nome"]'), t = document.querySelector('input[name="telefone"]');
__assert(n.labels.length === 1 && n.labels[0].textContent.trim() === "Nome completo", 'O campo nome deveria estar ligado ao label "Nome completo" (for = id).');
__assert(t.labels.length === 1 && t.labels[0].textContent.trim() === "Telefone", 'O campo telefone deveria estar ligado ao label "Telefone".');`
    },
    {
      tipo: "completar",
      titulo: "Agendamento da clínica",
      enunciado: `Complete o formulário de agendamento da clínica:
        <ul>
          <li>os dados devem ser enviados para <code>/agendar</code> pelo método <code>post</code> (sem aparecer na URL);</li>
          <li>o campo <code>data</code> deve abrir um calendário para escolher o dia;</li>
          <li>a especialidade deve ser escolhida numa lista suspensa com 3 opções.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `O tipo de input com calendário é <code>date</code>. A lista suspensa é <code>&lt;select&gt;</code>, e cada opção é um <code>&lt;option&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<form action="/agendar" method="____">
  <label for="data">Data da consulta</label>
  <input id="data" name="data" type="____" required>

  <label for="especialidade">Especialidade</label>
  <____ id="especialidade" name="especialidade">
    <option>Clínico geral</option>
    <option>Pediatria</option>
    <____>Dermatologia</option>
  </select>

  <button type="submit">Agendar</button>
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 280px; }`,
        js: ""
      },
      solucao: {
        html: c`<form action="/agendar" method="post">
  <label for="data">Data da consulta</label>
  <input id="data" name="data" type="date" required>

  <label for="especialidade">Especialidade</label>
  <select id="especialidade" name="especialidade">
    <option>Clínico geral</option>
    <option>Pediatria</option>
    <option>Dermatologia</option>
  </select>

  <button type="submit">Agendar</button>
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 280px; }`,
        js: ""
      },
      teste: c`
var f = document.querySelector("form");
__assert(f.getAttribute("action") === "/agendar", 'O action do formulário deveria ser "/agendar".');
__assert(f.method === "post", 'O method do formulário deveria ser "post".');
var d = document.getElementById("data");
__assert(d && d.type === "date", 'O campo data deveria ter type="date".');
var s = document.querySelector('select[name="especialidade"]');
__assert(s, 'Falta a lista suspensa <select name="especialidade">.');
__assert(s.options.length === 3, "A lista deveria ter 3 opções <option>, mas tem " + s.options.length + ".");
__assert(s.options[2].text === "Dermatologia", 'A terceira opção deveria ser "Dermatologia".');`
    },
    {
      tipo: "criar",
      titulo: "Formulário de contato da loja",
      enunciado: `Crie dentro do <code>&lt;form&gt;</code> o formulário de contato da loja, com um <code>&lt;label&gt;</code> ligado a cada campo:
        <ul>
          <li><code>id="nome"</code>, <code>name="nome"</code>: texto, obrigatório;</li>
          <li><code>id="email"</code>, <code>name="email"</code>: e-mail, obrigatório;</li>
          <li><code>id="assunto"</code>, <code>name="assunto"</code>: lista suspensa com <code>Dúvida</code>, <code>Troca</code> e <code>Elogio</code>;</li>
          <li><code>id="mensagem"</code>, <code>name="mensagem"</code>: texto longo (<code>&lt;textarea&gt;</code>);</li>
          <li><code>id="lgpd"</code>, <code>name="lgpd"</code>: caixa de marcar <b>obrigatória</b> com o texto <code>Aceito a política de privacidade</code>;</li>
          <li>um botão de envio com o texto <code>Enviar</code>.</li>
        </ul>`,
      dica: `A caixa de marcar é <code>&lt;input type="checkbox"&gt;</code>. Lembre: <code>for</code> do label = <code>id</code> do campo; <code>name</code> é o nome enviado ao servidor.`,
      lang: "web",
      inicial: {
        html: c`<h2>Fale com a loja</h2>
<form action="/contato" method="post">
  <!-- Crie os campos aqui -->
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 320px; }`,
        js: ""
      },
      solucao: {
        html: c`<h2>Fale com a loja</h2>
<form action="/contato" method="post">
  <label for="nome">Nome</label>
  <input id="nome" name="nome" required>

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required>

  <label for="assunto">Assunto</label>
  <select id="assunto" name="assunto">
    <option>Dúvida</option>
    <option>Troca</option>
    <option>Elogio</option>
  </select>

  <label for="mensagem">Mensagem</label>
  <textarea id="mensagem" name="mensagem"></textarea>

  <label><input id="lgpd" name="lgpd" type="checkbox" required> Aceito a política de privacidade</label>

  <button type="submit">Enviar</button>
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 320px; }`,
        js: ""
      },
      teste: c`
function campo(id, tag) { var el = document.getElementById(id); __assert(el && el.tagName === tag, "Falta o campo <" + tag.toLowerCase() + ' id="' + id + '">.'); __assert(el.name === id, 'O campo ' + id + ' deveria ter name="' + id + '".'); __assert(el.labels && el.labels.length > 0, "O campo " + id + " precisa de um <label> ligado a ele."); return el; }
var nome = campo("nome", "INPUT"), email = campo("email", "INPUT"), assunto = campo("assunto", "SELECT"), msg = campo("mensagem", "TEXTAREA"), lgpd = campo("lgpd", "INPUT");
__assert(nome.type === "text" && nome.required, "O campo nome deve ser de texto e obrigatório.");
__assert(email.type === "email" && email.required, "O campo email deve ser do tipo email e obrigatório.");
var ops = [].map.call(assunto.options, function (o) { return o.text.trim(); });
__assert(ops.join("|") === "Dúvida|Troca|Elogio", "O assunto deveria ter as opções Dúvida, Troca e Elogio.");
__assert(lgpd.type === "checkbox" && lgpd.required, "A caixa lgpd deve ser um checkbox obrigatório.");
__assert(lgpd.labels[0].textContent.indexOf("Aceito a política de privacidade") >= 0, 'O label da caixa deve dizer "Aceito a política de privacidade".');
var b = __botao("Enviar");
__assert(b && b.type === "submit", 'Falta o botão de envio "Enviar".');
var f = document.querySelector("form");
__assert(!f.checkValidity(), "Com os campos vazios, o formulário não deveria ser válido.");
__digitar(nome, "Ana"); __digitar(email, "ana@email.com"); lgpd.checked = true;
__assert(f.checkValidity(), "Com nome, e-mail e a caixa marcada, o formulário deveria ser válido.");`
    },
    {
      tipo: "criar",
      titulo: "Cadastro de funcionário no RH",
      enunciado: `Crie o formulário de cadastro de funcionários do RH. O <code>&lt;form&gt;</code> deve enviar para <code>/funcionarios</code> com <code>method="post"</code> e ter, cada um com label:
        <ul>
          <li><code>id="nome"</code>, <code>name="nome"</code>: texto, obrigatório;</li>
          <li><code>id="admissao"</code>, <code>name="data_admissao"</code>: data, obrigatória;</li>
          <li><code>id="salario"</code>, <code>name="salario"</code>: número, mínimo <code>0</code>, com <code>step="0.01"</code> (centavos);</li>
          <li>três opções de rádio com <code>name="setor"</code> e valores <code>ti</code>, <code>rh</code> e <code>vendas</code> (só uma pode ser marcada);</li>
          <li>um botão de envio com o texto <code>Cadastrar</code>.</li>
        </ul>`,
      dica: `Rádios com o <b>mesmo</b> <code>name</code> formam um grupo. Você pode colocar cada rádio dentro do seu label: <code>&lt;label&gt;&lt;input type="radio" ...&gt; TI&lt;/label&gt;</code>. Use <code>min</code> e <code>step</code> no campo numérico.`,
      lang: "web",
      inicial: {
        html: c`<h2>Novo funcionário</h2>
<!-- Crie o formulário completo aqui -->
`,
        css: c`form { display: grid; gap: 6px; max-width: 320px; }`,
        js: ""
      },
      solucao: {
        html: c`<h2>Novo funcionário</h2>
<form action="/funcionarios" method="post">
  <label for="nome">Nome</label>
  <input id="nome" name="nome" required>

  <label for="admissao">Data de admissão</label>
  <input id="admissao" name="data_admissao" type="date" required>

  <label for="salario">Salário (R$)</label>
  <input id="salario" name="salario" type="number" min="0" step="0.01">

  <p>Setor:</p>
  <label><input type="radio" name="setor" value="ti"> TI</label>
  <label><input type="radio" name="setor" value="rh"> RH</label>
  <label><input type="radio" name="setor" value="vendas"> Vendas</label>

  <button type="submit">Cadastrar</button>
</form>`,
        css: c`form { display: grid; gap: 6px; max-width: 320px; }`,
        js: ""
      },
      teste: c`
var f = document.querySelector("form");
__assert(f, "Falta o <form>.");
__assert(f.getAttribute("action") === "/funcionarios" && f.method === "post", 'O form deve ter action="/funcionarios" e method="post".');
var n = document.getElementById("nome"), a = document.getElementById("admissao"), s = document.getElementById("salario");
__assert(n && n.name === "nome" && n.type === "text" && n.required, 'Falta o campo de texto obrigatório id="nome" (name="nome").');
__assert(a && a.name === "data_admissao" && a.type === "date" && a.required, 'Falta o campo de data obrigatório id="admissao" com name="data_admissao".');
__assert(s && s.name === "salario" && s.type === "number", 'Falta o campo numérico id="salario" (name="salario").');
__assert(s.getAttribute("min") === "0" && s.getAttribute("step") === "0.01", 'O salário precisa de min="0" e step="0.01".');
[n, a, s].forEach(function (el) { __assert(el.labels.length > 0, "O campo " + el.id + " precisa de um <label> ligado a ele."); });
var r = document.querySelectorAll('input[type="radio"][name="setor"]');
__assert(r.length === 3, 'Deveriam existir 3 rádios com name="setor", mas há ' + r.length + ".");
var v = [].map.call(r, function (x) { return x.value; }).join("|");
__assert(v === "ti|rh|vendas", "Os valores dos rádios deveriam ser ti, rh e vendas.");
[].forEach.call(r, function (x) { __assert(x.labels.length > 0, "Cada rádio precisa de um label (coloque-o dentro de um <label>)."); });
__digitar(s, "-5");
__assert(s.validity.rangeUnderflow, "Um salário negativo deveria ser recusado (min=0).");
var b = __botao("Cadastrar");
__assert(b && b.type === "submit" && f.contains(b), 'Falta o botão de envio "Cadastrar" dentro do form.');`
    }
  ],

  // ---------------------------------------------------------------- i2: HTML semântico
  i2: [
    {
      tipo: "completar",
      titulo: "Cabeçalho e rodapé da padaria",
      enunciado: `Complete a página da padaria com as tags semânticas do <b>cabeçalho</b> (logo e título) e do <b>rodapé</b> (direitos autorais).
        Substitua cada <code>____</code> pela tag certa.`,
      dica: `As tags são <code>&lt;header&gt;</code> e <code>&lt;footer&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<____>
  <h1>Padaria do Zé</h1>
</____>
<main>
  <p>Pão francês, sonhos e bolos caseiros todos os dias.</p>
</main>
<____>
  <p>© 2026 Padaria do Zé</p>
</____>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<header>
  <h1>Padaria do Zé</h1>
</header>
<main>
  <p>Pão francês, sonhos e bolos caseiros todos os dias.</p>
</main>
<footer>
  <p>© 2026 Padaria do Zé</p>
</footer>`,
        css: "",
        js: ""
      },
      teste: c`
var h = document.querySelector("header");
__assert(h && h.querySelector("h1"), "O <h1> deveria estar dentro de um <header>.");
var f = document.querySelector("footer");
__assert(f && f.textContent.indexOf("© 2026") >= 0, "O texto de direitos autorais deveria estar dentro de um <footer>.");
__assert(document.querySelector("main"), "Mantenha o <main>.");`
    },
    {
      tipo: "completar",
      titulo: "Notícia no portal da cidade",
      enunciado: `No portal de notícias, a notícia é um conteúdo que faz sentido sozinho, e o bloco <code>Leia também</code> é complementar.
        Substitua cada <code>____</code> pela tag semântica certa.`,
      dica: `Conteúdo independente é <code>&lt;article&gt;</code>; conteúdo de apoio é <code>&lt;aside&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<main>
  <____>
    <h2>Feira de artesanato volta à praça central</h2>
    <p>A feira acontece todo sábado, das 8h às 14h.</p>
  </____>
  <____>
    <h3>Leia também</h3>
    <p>Novo horário dos ônibus</p>
  </____>
</main>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<main>
  <article>
    <h2>Feira de artesanato volta à praça central</h2>
    <p>A feira acontece todo sábado, das 8h às 14h.</p>
  </article>
  <aside>
    <h3>Leia também</h3>
    <p>Novo horário dos ônibus</p>
  </aside>
</main>`,
        css: "",
        js: ""
      },
      teste: c`
var a = document.querySelector("main > article");
__assert(a && a.querySelector("h2"), "A notícia (h2 + parágrafo) deveria estar dentro de um <article>.");
var s = document.querySelector("main > aside");
__assert(s && s.textContent.indexOf("Leia também") >= 0, 'O bloco "Leia também" deveria estar dentro de um <aside>.');`
    },
    {
      tipo: "completar",
      titulo: "Trocando divs por tags semânticas",
      enunciado: `O site da escola foi feito só com <code>&lt;div&gt;</code>. Substitua cada <code>____</code> pela tag semântica certa:
        o bloco de links é a <b>navegação</b>, o conteúdo central é o <b>principal</b> e o bloco com título <code>Matrículas</code> é uma <b>seção</b> temática.`,
      dica: `Navegação: <code>&lt;nav&gt;</code>. Conteúdo principal: <code>&lt;main&gt;</code>. Seção com título: <code>&lt;section&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<header>
  <h1>Escola Aprender</h1>
  <____>
    <a href="/">Início</a>
    <a href="/cursos">Cursos</a>
    <a href="/contato">Contato</a>
  </____>
</header>
<____>
  <____>
    <h2>Matrículas</h2>
    <p>Abertas até 30 de novembro.</p>
  </section>
</main>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<header>
  <h1>Escola Aprender</h1>
  <nav>
    <a href="/">Início</a>
    <a href="/cursos">Cursos</a>
    <a href="/contato">Contato</a>
  </nav>
</header>
<main>
  <section>
    <h2>Matrículas</h2>
    <p>Abertas até 30 de novembro.</p>
  </section>
</main>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(document.querySelectorAll("header nav a").length === 3, "Os 3 links deveriam estar dentro de um <nav> no cabeçalho.");
__assert(document.querySelectorAll("main").length === 1, "Deveria existir exatamente um <main>.");
var s = document.querySelector("main > section");
__assert(s && s.querySelector("h2").textContent.trim() === "Matrículas", 'A seção "Matrículas" deveria ser um <section> dentro do <main>.');
__assert(!document.querySelector("div"), "Não use <div> aqui: troque pelas tags semânticas.");`
    },
    {
      tipo: "criar",
      titulo: "Página da clínica com seções",
      enunciado: `Crie a estrutura semântica do site da Clínica Vida:
        <ul>
          <li>um <code>&lt;header&gt;</code> com o <code>&lt;h1&gt;</code> <code>Clínica Vida</code> e um <code>&lt;nav&gt;</code> com 3 links: <code>Serviços</code> (<code>#servicos</code>), <code>Contato</code> (<code>#contato</code>) e <code>Agendar</code> (<code>/agendar</code>);</li>
          <li>um único <code>&lt;main&gt;</code> com duas <code>&lt;section&gt;</code>: <code>id="servicos"</code> (título <code>&lt;h2&gt;</code> <code>Serviços</code>) e <code>id="contato"</code> (título <code>&lt;h2&gt;</code> <code>Contato</code>), cada uma com um parágrafo;</li>
          <li>um <code>&lt;footer&gt;</code> com <code>© 2026 Clínica Vida</code>.</li>
        </ul>`,
      dica: `Cada <code>&lt;section&gt;</code> deve ter seu próprio título. Links para uma parte da mesma página usam <code>#</code> + o <code>id</code> da seção.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie header (com nav), main (com 2 sections) e footer -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<header>
  <h1>Clínica Vida</h1>
  <nav>
    <a href="#servicos">Serviços</a>
    <a href="#contato">Contato</a>
    <a href="/agendar">Agendar</a>
  </nav>
</header>
<main>
  <section id="servicos">
    <h2>Serviços</h2>
    <p>Clínico geral, pediatria e exames laboratoriais.</p>
  </section>
  <section id="contato">
    <h2>Contato</h2>
    <p>Telefone: (11) 3333-4444</p>
  </section>
</main>
<footer>
  <p>© 2026 Clínica Vida</p>
</footer>`,
        css: "",
        js: ""
      },
      teste: c`
var h1 = document.querySelector("header h1");
__assert(h1 && h1.textContent.trim() === "Clínica Vida", 'Falta o <h1> "Clínica Vida" dentro do <header>.');
var links = [].map.call(document.querySelectorAll("header nav a"), function (a) { return a.textContent.trim() + ">" + a.getAttribute("href"); });
__assert(links.join("|") === "Serviços>#servicos|Contato>#contato|Agendar>/agendar", "O <nav> do cabeçalho deveria ter os links Serviços (#servicos), Contato (#contato) e Agendar (/agendar).");
__assert(document.querySelectorAll("main").length === 1, "Deveria existir exatamente um <main>.");
["servicos", "contato"].forEach(function (id, i) {
  var s = document.querySelector("main > section#" + id);
  __assert(s, 'Falta a <section id="' + id + '"> dentro do <main>.');
  var t = s.querySelector("h2");
  __assert(t && t.textContent.trim() === ["Serviços", "Contato"][i], 'A seção ' + id + ' deveria ter o <h2> "' + ["Serviços", "Contato"][i] + '".');
  __assert(s.querySelector("p"), "A seção " + id + " deveria ter um parágrafo.");
});
var f = document.querySelector("footer");
__assert(f && f.textContent.indexOf("© 2026 Clínica Vida") >= 0, 'Falta o <footer> com "© 2026 Clínica Vida".');`
    },
    {
      tipo: "criar",
      titulo: "Vitrine de ofertas com article",
      enunciado: `Crie a vitrine de ofertas de uma loja de eletrônicos:
        <ul>
          <li>um <code>&lt;main&gt;</code> com o <code>&lt;h1&gt;</code> <code>Ofertas da semana</code>;</li>
          <li>dentro do <code>&lt;main&gt;</code>, três <code>&lt;article&gt;</code>, um para cada produto, cada um com um <code>&lt;h2&gt;</code> com o nome e um parágrafo com o preço (começando com <code>R$</code>): Fone Bluetooth, Mouse sem fio e Teclado mecânico;</li>
          <li>um <code>&lt;aside&gt;</code> com o título <code>Mais vendidos</code>;</li>
          <li>um <code>&lt;footer&gt;</code> no fim da página.</li>
        </ul>`,
      dica: `Cada produto faz sentido sozinho (poderia ser compartilhado), por isso é um <code>&lt;article&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie a vitrine com main, 3 articles, aside e footer -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<main>
  <h1>Ofertas da semana</h1>
  <article>
    <h2>Fone Bluetooth</h2>
    <p>R$ 129,90</p>
  </article>
  <article>
    <h2>Mouse sem fio</h2>
    <p>R$ 59,90</p>
  </article>
  <article>
    <h2>Teclado mecânico</h2>
    <p>R$ 249,00</p>
  </article>
  <aside>
    <h2>Mais vendidos</h2>
    <p>Carregador turbo</p>
  </aside>
</main>
<footer>
  <p>© 2026 Loja Tech</p>
</footer>`,
        css: "",
        js: ""
      },
      teste: c`
var h1 = document.querySelector("main h1");
__assert(h1 && h1.textContent.trim() === "Ofertas da semana", 'Falta o <h1> "Ofertas da semana" dentro do <main>.');
var arts = document.querySelectorAll("main article");
__assert(arts.length === 3, "Deveriam existir 3 <article> dentro do <main>, mas há " + arts.length + ".");
var nomes = [];
[].forEach.call(arts, function (a, i) {
  var h = a.querySelector("h2");
  __assert(h, "O article " + (i + 1) + " precisa de um <h2> com o nome do produto.");
  nomes.push(h.textContent.trim());
  var p = a.querySelector("p");
  __assert(p && p.textContent.trim().indexOf("R$") === 0, "O article " + (i + 1) + " precisa de um parágrafo com o preço começando com R$.");
});
__assert(nomes.join("|") === "Fone Bluetooth|Mouse sem fio|Teclado mecânico", "Os produtos deveriam ser: Fone Bluetooth, Mouse sem fio e Teclado mecânico.");
var as = document.querySelector("aside");
__assert(as && as.textContent.indexOf("Mais vendidos") >= 0, 'Falta o <aside> com o título "Mais vendidos".');
__assert(document.querySelector("footer"), "Falta o <footer>.");`
    }
  ],

  // ---------------------------------------------------------------- i3: Acessibilidade básica
  i3: [
    {
      tipo: "completar",
      titulo: "Botões só com ícone",
      enunciado: `Na barra do aplicativo de delivery, os botões mostram só ícones. Dê um <b>nome acessível</b> a cada um, para o leitor de tela anunciar
        <code>Buscar</code> e <code>Fechar janela</code>. Substitua cada <code>____</code> pelo atributo certo.`,
      dica: `O atributo ARIA que define o nome falado de um elemento é <code>aria-label</code>.`,
      lang: "web",
      inicial: {
        html: c`<button ____="Buscar">🔍</button>
<button ____="Fechar janela">✕</button>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<button aria-label="Buscar">🔍</button>
<button aria-label="Fechar janela">✕</button>`,
        css: "",
        js: ""
      },
      teste: c`
var b = document.querySelectorAll("button");
__assert(b.length === 2, "Deveriam existir 2 botões.");
__assert(b[0].getAttribute("aria-label") === "Buscar", 'O botão 🔍 deveria ter aria-label="Buscar".');
__assert(b[1].getAttribute("aria-label") === "Fechar janela", 'O botão ✕ deveria ter aria-label="Fechar janela".');`
    },
    {
      tipo: "completar",
      titulo: "Imagem informativa e decorativa",
      enunciado: `Na página da Farmácia Saúde, o logo é uma imagem <b>informativa</b> e deve ser descrito como <code>Logo da Farmácia Saúde</code>.
        Já o enfeite de folhas é <b>decorativo</b> e deve ser ignorado pelo leitor de tela.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Imagem decorativa também tem o atributo <code>alt</code>, mas vazio: <code>alt=""</code>. Sem o atributo, o leitor pode ler o nome do arquivo.`,
      lang: "web",
      inicial: {
        html: c`<header>
  <img src="logo.png" alt="____" width="160" height="60">
  <img src="folhas.svg" ____="" width="40" height="40">
  <h1>Farmácia Saúde</h1>
</header>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<header>
  <img src="logo.png" alt="Logo da Farmácia Saúde" width="160" height="60">
  <img src="folhas.svg" alt="" width="40" height="40">
  <h1>Farmácia Saúde</h1>
</header>`,
        css: "",
        js: ""
      },
      teste: c`
var logo = document.querySelector('img[src="logo.png"]'), enf = document.querySelector('img[src="folhas.svg"]');
__assert(logo.getAttribute("alt") === "Logo da Farmácia Saúde", 'O logo deveria ter alt="Logo da Farmácia Saúde".');
__assert(enf.hasAttribute("alt") && enf.getAttribute("alt") === "", 'A imagem decorativa deveria ter alt="" (vazio, mas presente).');`
    },
    {
      tipo: "completar",
      titulo: "Erro anunciado no formulário",
      enunciado: `No cadastro do banco, quando o CPF está errado aparece uma mensagem que o leitor de tela precisa anunciar <b>imediatamente</b>.
        Além disso, o campo precisa estar ligado ao seu rótulo. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Mensagens urgentes usam <code>role="alert"</code>. O <code>for</code> do label deve ser igual ao <code>id</code> do campo.`,
      lang: "web",
      inicial: {
        html: c`<form>
  <label ____="cpf">CPF</label>
  <input id="cpf" name="cpf" inputmode="numeric">
  <p id="erro-cpf" role="____">CPF inválido. Digite os 11 números.</p>
  <button type="submit">Continuar</button>
</form>`,
        css: c`#erro-cpf { color: #b00020; }`,
        js: ""
      },
      solucao: {
        html: c`<form>
  <label for="cpf">CPF</label>
  <input id="cpf" name="cpf" inputmode="numeric">
  <p id="erro-cpf" role="alert">CPF inválido. Digite os 11 números.</p>
  <button type="submit">Continuar</button>
</form>`,
        css: c`#erro-cpf { color: #b00020; }`,
        js: ""
      },
      teste: c`
var i = document.getElementById("cpf");
__assert(i.labels.length === 1, 'O campo CPF precisa estar ligado ao label (for="cpf").');
__assert(document.getElementById("erro-cpf").getAttribute("role") === "alert", 'A mensagem de erro deveria ter role="alert".');`
    },
    {
      tipo: "criar",
      titulo: "Newsletter acessível",
      enunciado: `Crie o bloco de newsletter da loja de forma acessível:
        <ul>
          <li>um ícone decorativo <code>&lt;img src="envelope.svg"&gt;</code> que o leitor de tela deve ignorar;</li>
          <li>um campo de e-mail <code>id="email-news"</code>, obrigatório, com um <code>&lt;label&gt;</code> visível <code>Seu e-mail</code> ligado a ele;</li>
          <li>um <b>botão de verdade</b> (<code>&lt;button&gt;</code>, não <code>&lt;div&gt;</code>) com o texto <code>Assinar newsletter</code>;</li>
          <li>um parágrafo <code>id="aviso"</code> com <code>role="status"</code>, para anunciar mensagens como “Inscrição feita!”.</li>
        </ul>`,
      dica: `Placeholder não substitui label. <code>role="status"</code> anuncia mensagens sem interromper o usuário.`,
      lang: "web",
      inicial: {
        html: c`<h2>Receba nossas ofertas</h2>
<!-- Crie o ícone, o campo com label, o botão e o aviso aqui -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Receba nossas ofertas</h2>
<form>
  <img src="envelope.svg" alt="" width="32" height="32">
  <label for="email-news">Seu e-mail</label>
  <input id="email-news" name="email" type="email" required>
  <button type="submit">Assinar newsletter</button>
  <p id="aviso" role="status"></p>
</form>`,
        css: "",
        js: ""
      },
      teste: c`
var img = document.querySelector('img[src="envelope.svg"]');
__assert(img, 'Falta o ícone <img src="envelope.svg">.');
__assert(img.getAttribute("alt") === "", 'O ícone é decorativo: use alt="".');
var e = document.getElementById("email-news");
__assert(e && e.type === "email" && e.required, 'Falta o campo de e-mail obrigatório id="email-news".');
__assert(e.labels.length > 0 && e.labels[0].textContent.trim() === "Seu e-mail", 'O campo precisa de um <label> "Seu e-mail" ligado a ele.');
__assert(__botao("Assinar newsletter"), 'Falta o <button> com o texto "Assinar newsletter".');
var a = document.getElementById("aviso");
__assert(a && a.tagName === "P" && a.getAttribute("role") === "status", 'Falta o parágrafo id="aviso" com role="status".');`
    },
    {
      tipo: "criar",
      titulo: "Menu acessível da escola",
      enunciado: `Crie o topo do site da escola pensando em quem usa leitor de tela e teclado:
        <ul>
          <li>um <code>&lt;button&gt;</code> que mostra só <code>☰</code>, com o nome acessível <code>Abrir menu</code>;</li>
          <li>um <code>&lt;nav&gt;</code> com <code>aria-label="Principal"</code> e dois links: <code>Início</code> (<code>/</code>) e <code>Matrículas</code> (<code>/matriculas</code>);</li>
          <li>um <code>&lt;h1&gt;</code> <code>Escola Aprender</code> seguido de um <code>&lt;h2&gt;</code> <code>Calendário</code> (sem pular níveis);</li>
          <li>um link descritivo para <code>calendario.pdf</code> com o texto exato <code>Baixar calendário escolar (PDF, 1 MB)</code> (nada de “clique aqui”);</li>
          <li>a foto <code>fachada.jpg</code> com um <code>alt</code> que a descreva (pelo menos 10 letras).</li>
        </ul>`,
      dica: `Ícones sozinhos precisam de <code>aria-label</code>. O texto do link deve fazer sentido mesmo lido fora do contexto.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie o botão de menu, o nav, os títulos, o link do PDF e a foto -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<header>
  <button aria-label="Abrir menu">☰</button>
  <nav aria-label="Principal">
    <a href="/">Início</a>
    <a href="/matriculas">Matrículas</a>
  </nav>
</header>
<main>
  <h1>Escola Aprender</h1>
  <img src="fachada.jpg" alt="Fachada da escola com portão verde" width="400" height="250">
  <h2>Calendário</h2>
  <a href="calendario.pdf">Baixar calendário escolar (PDF, 1 MB)</a>
</main>`,
        css: "",
        js: ""
      },
      teste: c`
var b = [].find.call(document.querySelectorAll("button"), function (x) { return x.textContent.trim() === "☰"; });
__assert(b, "Falta o <button> com o ícone ☰.");
__assert(b.getAttribute("aria-label") === "Abrir menu", 'O botão ☰ deveria ter aria-label="Abrir menu".');
var n = document.querySelector("nav");
__assert(n && n.getAttribute("aria-label") === "Principal", 'Falta o <nav aria-label="Principal">.');
var l = [].map.call(n.querySelectorAll("a"), function (a) { return a.textContent.trim() + ">" + a.getAttribute("href"); });
__assert(l.join("|") === "Início>/|Matrículas>/matriculas", "O nav deveria ter os links Início (/) e Matrículas (/matriculas).");
var hs = [].map.call(document.querySelectorAll("h1, h2, h3, h4, h5, h6"), function (h) { return h.tagName + ":" + h.textContent.trim(); });
__assert(hs.join("|") === "H1:Escola Aprender|H2:Calendário", 'Os títulos deveriam ser <h1> "Escola Aprender" e depois <h2> "Calendário".');
var pdf = document.querySelector('a[href="calendario.pdf"]');
__assert(pdf && pdf.textContent.trim() === "Baixar calendário escolar (PDF, 1 MB)", 'O link para calendario.pdf deveria ter o texto "Baixar calendário escolar (PDF, 1 MB)".');
var img = document.querySelector('img[src="fachada.jpg"]');
__assert(img && (img.getAttribute("alt") || "").trim().length >= 10, "A foto fachada.jpg precisa de um alt descritivo (pelo menos 10 letras).");`
    }
  ],

  // ---------------------------------------------------------------- a1: SEO e meta tags
  a1: [
    {
      tipo: "completar",
      titulo: "Título e descrição da pizzaria",
      enunciado: `Complete o <code>&lt;head&gt;</code> da Pizzaria Bella para o resultado do Google mostrar o título
        <code>Pizzaria Bella | Delivery em Campinas</code> e o resumo que já está escrito no <code>content</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `O título azul do Google vem da tag <code>&lt;title&gt;</code>; o resumo vem de <code>&lt;meta name="description"&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <____>Pizzaria Bella | Delivery em Campinas</____>
  <meta name="____" content="Pizza artesanal com massa de fermentação natural. Delivery em toda Campinas em até 40 minutos.">
</head>
<body>
  <h1>Pizzaria Bella</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Pizzaria Bella | Delivery em Campinas</title>
  <meta name="description" content="Pizza artesanal com massa de fermentação natural. Delivery em toda Campinas em até 40 minutos.">
</head>
<body>
  <h1>Pizzaria Bella</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(document.title === "Pizzaria Bella | Delivery em Campinas", 'O <title> deveria ser "Pizzaria Bella | Delivery em Campinas", mas é "' + document.title + '".');
var d = document.querySelector('meta[name="description"]');
__assert(d, 'Falta a <meta name="description">.');
__assert((d.getAttribute("content") || "").indexOf("Pizza artesanal") === 0, "Mantenha o texto do content da descrição.");`
    },
    {
      tipo: "completar",
      titulo: "Endereço oficial do produto",
      enunciado: `A página do tênis da loja abre por vários endereços (com <code>?cor=azul</code>, <code>?utm=...</code> etc.).
        Indique ao Google que o endereço oficial é <code>https://lojaexemplo.com.br/tenis-corrida</code>.
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `É uma tag <code>&lt;link&gt;</code> com <code>rel="canonical"</code> e o endereço completo no <code>href</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Tênis Corrida Pro | Loja Exemplo</title>
  <link rel="____" ____="https://lojaexemplo.com.br/tenis-corrida">
</head>
<body>
  <h1>Tênis Corrida Pro</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Tênis Corrida Pro | Loja Exemplo</title>
  <link rel="canonical" href="https://lojaexemplo.com.br/tenis-corrida">
</head>
<body>
  <h1>Tênis Corrida Pro</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
var l = document.querySelector('link[rel="canonical"]');
__assert(l, 'Falta <link rel="canonical">.');
__assert(l.getAttribute("href") === "https://lojaexemplo.com.br/tenis-corrida", 'O href do canonical deveria ser "https://lojaexemplo.com.br/tenis-corrida".');`
    },
    {
      tipo: "completar",
      titulo: "Prévia no WhatsApp com Open Graph",
      enunciado: `Quando alguém compartilha o link da Pizzaria Bella no WhatsApp, a prévia sai sem título, texto e foto.
        Complete as tags Open Graph de <b>título</b>, <b>descrição</b> e <b>imagem</b>. Substitua cada <code>____</code> pelo que falta.`,
      dica: `As propriedades são <code>og:title</code>, <code>og:description</code> e <code>og:image</code>, no atributo <code>property</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Pizzaria Bella | Delivery em Campinas</title>
  <meta property="og:____" content="Pizzaria Bella">
  <meta property="og:____" content="Pizza artesanal entregue quentinha em Campinas.">
  <meta property="og:____" content="https://pizzariabella.com.br/capa.jpg">
</head>
<body>
  <h1>Pizzaria Bella</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Pizzaria Bella | Delivery em Campinas</title>
  <meta property="og:title" content="Pizzaria Bella">
  <meta property="og:description" content="Pizza artesanal entregue quentinha em Campinas.">
  <meta property="og:image" content="https://pizzariabella.com.br/capa.jpg">
</head>
<body>
  <h1>Pizzaria Bella</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
function og(p) { var m = document.querySelector('meta[property="og:' + p + '"]'); return m ? m.getAttribute("content") : null; }
__assert(og("title") === "Pizzaria Bella", 'Falta <meta property="og:title" content="Pizzaria Bella">.');
__assert(og("description") === "Pizza artesanal entregue quentinha em Campinas.", 'A descrição deveria estar em property="og:description".');
__assert(og("image") === "https://pizzariabella.com.br/capa.jpg", 'A imagem deveria estar em property="og:image".');`
    },
    {
      tipo: "criar",
      titulo: "Head completo da página de produto",
      enunciado: `Crie o <code>&lt;head&gt;</code> da página da <b>Cafeteira Expresso</b> da loja Casa Boa, pronto para o Google e para as redes sociais:
        <ul>
          <li><code>&lt;title&gt;</code> com 30 a 60 caracteres, contendo a palavra <code>Cafeteira</code>;</li>
          <li><code>&lt;meta name="description"&gt;</code> com 70 a 160 caracteres;</li>
          <li><code>&lt;link rel="canonical"&gt;</code> com o endereço <code>https://casaboa.com.br/cafeteira-expresso</code>;</li>
          <li>as tags <code>og:title</code>, <code>og:description</code> e <code>og:image</code> (a imagem com endereço completo começando com <code>https://</code>).</li>
        </ul>
        No <code>&lt;body&gt;</code>, um <code>&lt;h1&gt;</code> com <code>Cafeteira Expresso</code>.`,
      dica: `Escreva o título no formato “Produto | Loja”. Conte os caracteres: descrições muito curtas ou longas demais são cortadas ou ignoradas pelo Google.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <!-- title, description, canonical e Open Graph aqui -->
</head>
<body>
  <!-- h1 aqui -->
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Cafeteira Expresso 15 bar | Casa Boa</title>
  <meta name="description" content="Cafeteira expresso com 15 bar de pressão, vaporizador de leite e reservatório de 1,2 litro. Entrega rápida para todo o Brasil.">
  <link rel="canonical" href="https://casaboa.com.br/cafeteira-expresso">
  <meta property="og:title" content="Cafeteira Expresso 15 bar">
  <meta property="og:description" content="Café de cafeteria em casa, com vaporizador de leite.">
  <meta property="og:image" content="https://casaboa.com.br/img/cafeteira.jpg">
</head>
<body>
  <h1>Cafeteira Expresso</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
var t = document.title.trim();
__assert(t.length >= 30 && t.length <= 60, "O <title> deveria ter de 30 a 60 caracteres, mas tem " + t.length + ".");
__assert(/cafeteira/i.test(t), 'O <title> deveria conter a palavra "Cafeteira".');
var d = document.querySelector('meta[name="description"]');
__assert(d, 'Falta a <meta name="description">.');
var dl = (d.getAttribute("content") || "").trim().length;
__assert(dl >= 70 && dl <= 160, "A descrição deveria ter de 70 a 160 caracteres, mas tem " + dl + ".");
var l = document.querySelector('link[rel="canonical"]');
__assert(l && l.getAttribute("href") === "https://casaboa.com.br/cafeteira-expresso", 'O canonical deveria apontar para "https://casaboa.com.br/cafeteira-expresso".');
["title", "description", "image"].forEach(function (p) {
  var m = document.querySelector('meta[property="og:' + p + '"]');
  __assert(m && (m.getAttribute("content") || "").trim(), 'Falta <meta property="og:' + p + '"> com content preenchido.');
});
__assert(/^https:\/\//.test(document.querySelector('meta[property="og:image"]').getAttribute("content")), "O og:image precisa de um endereço completo começando com https://.");
var h = document.querySelector("body h1");
__assert(h && h.textContent.trim() === "Cafeteira Expresso", 'Falta o <h1> "Cafeteira Expresso".');`
    },
    {
      tipo: "criar",
      titulo: "Dados estruturados da padaria",
      enunciado: `Para o Google mostrar o telefone e o horário da Padaria do Zé nos resultados, crie no <code>&lt;head&gt;</code> um bloco
        <code>&lt;script type="application/ld+json"&gt;</code> (JSON-LD) com:
        <ul>
          <li><code>"@context"</code>: <code>"https://schema.org"</code>;</li>
          <li><code>"@type"</code>: <code>"Bakery"</code>;</li>
          <li><code>"name"</code>: <code>"Padaria do Zé"</code>;</li>
          <li><code>"telephone"</code>: <code>"+55-11-98888-7777"</code>;</li>
          <li><code>"openingHours"</code>: <code>"Mo-Sa 06:00-20:00"</code>.</li>
        </ul>
        Mantenha também o <code>&lt;title&gt;</code> <code>Padaria do Zé | Pães artesanais</code>.`,
      dica: `Dentro do script vai um objeto JSON válido: chaves e textos entre aspas duplas, itens separados por vírgula e sem vírgula depois do último.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Padaria do Zé | Pães artesanais</title>
  <!-- bloco JSON-LD aqui -->
</head>
<body>
  <h1>Padaria do Zé</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Padaria do Zé | Pães artesanais</title>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Padaria do Zé",
    "telephone": "+55-11-98888-7777",
    "openingHours": "Mo-Sa 06:00-20:00"
  }
  </script>
</head>
<body>
  <h1>Padaria do Zé</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(document.title === "Padaria do Zé | Pães artesanais", 'Mantenha o <title> "Padaria do Zé | Pães artesanais".');
var s = document.querySelector('script[type="application/ld+json"]');
__assert(s, 'Falta o <script type="application/ld+json">.');
var j;
try { j = JSON.parse(s.textContent); } catch (e) { throw new Error("O conteúdo do JSON-LD não é um JSON válido: " + e.message); }
__assert(j["@context"] === "https://schema.org", '"@context" deveria ser "https://schema.org".');
__assert(j["@type"] === "Bakery", '"@type" deveria ser "Bakery".');
__assert(j.name === "Padaria do Zé", '"name" deveria ser "Padaria do Zé".');
__assert(j.telephone === "+55-11-98888-7777", '"telephone" deveria ser "+55-11-98888-7777".');
__assert(j.openingHours === "Mo-Sa 06:00-20:00", '"openingHours" deveria ser "Mo-Sa 06:00-20:00".');`
    }
  ],

  // ---------------------------------------------------------------- a2: Performance
  a2: [
    {
      tipo: "completar",
      titulo: "Galeria carregada sob demanda",
      enunciado: `A galeria de fotos do salão de festas fica no fim da página e deixa o carregamento lento.
        Faça as três imagens só serem baixadas quando o visitante rolar até perto delas. Substitua cada <code>____</code> pelo valor certo.`,
      dica: `O atributo é <code>loading</code>, e o valor que adia o download é <code>lazy</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Galeria</h2>
<div class="galeria">
  <img src="festa-1.webp" alt="Salão decorado para aniversário" width="400" height="300" loading="____">
  <img src="festa-2.webp" alt="Mesa de doces" width="400" height="300" loading="____">
  <img src="festa-3.webp" alt="Pista de dança iluminada" width="400" height="300" loading="____">
</div>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Galeria</h2>
<div class="galeria">
  <img src="festa-1.webp" alt="Salão decorado para aniversário" width="400" height="300" loading="lazy">
  <img src="festa-2.webp" alt="Mesa de doces" width="400" height="300" loading="lazy">
  <img src="festa-3.webp" alt="Pista de dança iluminada" width="400" height="300" loading="lazy">
</div>`,
        css: "",
        js: ""
      },
      teste: c`
var imgs = document.querySelectorAll(".galeria img");
__assert(imgs.length === 3, "A galeria deveria ter 3 imagens.");
[].forEach.call(imgs, function (img, i) { __assert(img.getAttribute("loading") === "lazy", "A imagem " + (i + 1) + ' deveria ter loading="lazy".'); });`
    },
    {
      tipo: "completar",
      titulo: "Scripts que não travam a página",
      enunciado: `O site da loja trava enquanto baixa os scripts do <code>&lt;head&gt;</code>. Ajuste:
        <ul>
          <li><code>app.js</code> depende do HTML pronto e deve rodar <b>depois</b> que a página toda for lida, na ordem;</li>
          <li><code>analytics.js</code> é independente e pode rodar <b>assim que baixar</b>.</li>
        </ul>
        Substitua cada <code>____</code> pelo atributo certo.`,
      dica: `<code>defer</code> espera o HTML terminar e mantém a ordem; <code>async</code> roda assim que o arquivo chega.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Loja Exemplo</title>
  <script src="app.js" ____></script>
  <script src="analytics.js" ____></script>
</head>
<body>
  <h1>Loja Exemplo</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Loja Exemplo</title>
  <script src="app.js" defer></script>
  <script src="analytics.js" async></script>
</head>
<body>
  <h1>Loja Exemplo</h1>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
var app = document.querySelector('script[src="app.js"]'), an = document.querySelector('script[src="analytics.js"]');
__assert(app && app.hasAttribute("defer") && !app.hasAttribute("async"), 'O app.js deveria usar defer (roda depois do HTML, na ordem).');
__assert(an && an.hasAttribute("async") && !an.hasAttribute("defer"), 'O analytics.js deveria usar async (roda assim que baixar).');`
    },
    {
      tipo: "completar",
      titulo: "Foto leve e sem pulos",
      enunciado: `A foto do prato principal do restaurante faz a página “pular” quando carrega e está num formato pesado.
        Use a versão <code>prato.webp</code> e reserve o espaço de <b>800 × 600</b> pixels. Substitua cada <code>____</code> pelo que falta.`,
      dica: `Os atributos que reservam o espaço são <code>width</code> e <code>height</code>, só com o número (sem “px”).`,
      lang: "web",
      inicial: {
        html: c`<h1>Prato do dia</h1>
<img src="____" alt="Risoto de cogumelos" ____="800" ____="600">
<p>Risoto de cogumelos com parmesão.</p>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Prato do dia</h1>
<img src="prato.webp" alt="Risoto de cogumelos" width="800" height="600">
<p>Risoto de cogumelos com parmesão.</p>`,
        css: "",
        js: ""
      },
      teste: c`
var img = document.querySelector("img");
__assert(img.getAttribute("src") === "prato.webp", 'Use a imagem em WebP: src="prato.webp".');
__assert(img.getAttribute("width") === "800", 'A imagem deveria ter width="800".');
__assert(img.getAttribute("height") === "600", 'A imagem deveria ter height="600".');`
    },
    {
      tipo: "criar",
      titulo: "Banner responsivo com picture",
      enunciado: `O banner da promoção de inverno é enorme e pesa demais no celular. Crie um <code>&lt;picture&gt;</code> que:
        <ul>
          <li>em telas de até 600px use <code>banner-mobile.webp</code> (um <code>&lt;source&gt;</code> com <code>media="(max-width: 600px)"</code>);</li>
          <li>nos outros casos use o <code>&lt;img&gt;</code> <code>banner-desktop.webp</code>, com <code>alt="Promoção de inverno"</code>, <code>width="1200"</code> e <code>height="400"</code>.</li>
        </ul>`,
      dica: `No <code>&lt;source&gt;</code> o arquivo vai em <code>srcset</code>. O <code>&lt;img&gt;</code> fica por último dentro do <code>&lt;picture&gt;</code>, e o <code>alt</code> vai nele.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie o picture com source e img aqui -->
`,
        css: c`img { max-width: 100%; height: auto; }`,
        js: ""
      },
      solucao: {
        html: c`<picture>
  <source media="(max-width: 600px)" srcset="banner-mobile.webp">
  <img src="banner-desktop.webp" alt="Promoção de inverno" width="1200" height="400">
</picture>`,
        css: c`img { max-width: 100%; height: auto; }`,
        js: ""
      },
      teste: c`
var p = document.querySelector("picture");
__assert(p, "Falta o <picture>.");
var s = p.querySelector("source");
__assert(s, "Falta o <source> dentro do <picture>.");
__assert((s.getAttribute("media") || "").replace(/\s/g, "") === "(max-width:600px)", 'O source deveria ter media="(max-width: 600px)".');
__assert(s.getAttribute("srcset") === "banner-mobile.webp", 'O source deveria ter srcset="banner-mobile.webp".');
var img = p.querySelector("img");
__assert(img && img.getAttribute("src") === "banner-desktop.webp", 'Falta o <img src="banner-desktop.webp"> dentro do <picture>.');
__assert(p.lastElementChild === img, "O <img> deve ser o último elemento dentro do <picture>.");
__assert(img.getAttribute("alt") === "Promoção de inverno", 'O img deveria ter alt="Promoção de inverno".');
__assert(img.getAttribute("width") === "1200" && img.getAttribute("height") === "400", 'O img deveria ter width="1200" e height="400".');`
    },
    {
      tipo: "criar",
      titulo: "Vitrine da loja otimizada",
      enunciado: `Monte a página da vitrine pensando em velocidade:
        <ul>
          <li>no <code>&lt;head&gt;</code>, o script <code>loja.js</code> com <code>defer</code>;</li>
          <li>no topo, o logo <code>logo.webp</code> (que aparece logo de cara, então <b>sem</b> lazy), com alt, <code>width="200"</code> e <code>height="80"</code>;</li>
          <li>uma <code>&lt;section class="produtos"&gt;</code> com 3 imagens <code>.webp</code> (<code>produto-1.webp</code>, <code>produto-2.webp</code>, <code>produto-3.webp</code>), cada uma com alt, <code>loading="lazy"</code>, <code>width="300"</code> e <code>height="300"</code>.</li>
        </ul>`,
      dica: `Imagens que aparecem logo no início não devem ser lazy: isso atrasaria o maior elemento visível (LCP).`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Vitrine | Loja Exemplo</title>
  <!-- script aqui -->
</head>
<body>
  <!-- logo e section.produtos aqui -->
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Vitrine | Loja Exemplo</title>
  <script src="loja.js" defer></script>
</head>
<body>
  <header>
    <img src="logo.webp" alt="Loja Exemplo" width="200" height="80">
  </header>
  <section class="produtos">
    <img src="produto-1.webp" alt="Camiseta branca" loading="lazy" width="300" height="300">
    <img src="produto-2.webp" alt="Calça jeans" loading="lazy" width="300" height="300">
    <img src="produto-3.webp" alt="Tênis preto" loading="lazy" width="300" height="300">
  </section>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
var s = document.querySelector('script[src="loja.js"]');
__assert(s && s.hasAttribute("defer"), 'Falta <script src="loja.js" defer>.');
__assert(document.head.contains(s), "O script loja.js deveria ficar no <head>.");
var logo = document.querySelector('img[src="logo.webp"]');
__assert(logo, 'Falta o logo <img src="logo.webp">.');
__assert(logo.getAttribute("loading") !== "lazy", "O logo aparece logo de cara: não use lazy nele.");
__assert((logo.getAttribute("alt") || "").trim(), "O logo precisa de alt.");
__assert(logo.getAttribute("width") === "200" && logo.getAttribute("height") === "80", 'O logo deveria ter width="200" e height="80".');
var imgs = document.querySelectorAll("section.produtos img");
__assert(imgs.length === 3, 'A <section class="produtos"> deveria ter 3 imagens, mas tem ' + imgs.length + ".");
[].forEach.call(imgs, function (img, i) {
  var n = i + 1;
  __assert(img.getAttribute("src") === "produto-" + n + ".webp", "A imagem " + n + ' deveria ter src="produto-' + n + '.webp".');
  __assert((img.getAttribute("alt") || "").trim(), "A imagem " + n + " precisa de alt.");
  __assert(img.getAttribute("loading") === "lazy", "A imagem " + n + ' deveria ter loading="lazy".');
  __assert(img.getAttribute("width") === "300" && img.getAttribute("height") === "300", "A imagem " + n + ' deveria ter width="300" e height="300".');
});`
    }
  ],

  // ---------------------------------------------------------------- a3: Elementos nativos modernos
  a3: [
    {
      tipo: "completar",
      titulo: "Perguntas frequentes que abrem e fecham",
      enunciado: `Complete a área de perguntas frequentes da loja: cada pergunta deve ficar sempre visível e, ao clicar nela,
        a resposta aparece (sem JavaScript). Substitua cada <code>____</code> pela tag certa.`,
      dica: `O bloco que abre e fecha é <code>&lt;details&gt;</code>; o texto clicável é <code>&lt;summary&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Dúvidas frequentes</h2>
<____>
  <____>Qual o prazo de entrega?</summary>
  <p>Até 5 dias úteis para capitais.</p>
</details>
<details>
  <summary>Posso trocar um produto?</____>
  <p>Sim, em até 7 dias após o recebimento.</p>
</____>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Dúvidas frequentes</h2>
<details>
  <summary>Qual o prazo de entrega?</summary>
  <p>Até 5 dias úteis para capitais.</p>
</details>
<details>
  <summary>Posso trocar um produto?</summary>
  <p>Sim, em até 7 dias após o recebimento.</p>
</details>`,
        css: "",
        js: ""
      },
      teste: c`
var ds = document.querySelectorAll("details");
__assert(ds.length === 2, "Deveriam existir 2 <details>, mas há " + ds.length + ".");
[].forEach.call(ds, function (d, i) { __assert(d.querySelector(":scope > summary"), "O details " + (i + 1) + " precisa de um <summary> com a pergunta."); });
__assert(!ds[0].open, "As respostas devem começar fechadas.");
ds[0].querySelector("summary").click();
await __esperar(50);
__assert(ds[0].open, "Clicar na pergunta deveria abrir a resposta.");`
    },
    {
      tipo: "completar",
      titulo: "Janela de confirmação do pedido",
      enunciado: `No delivery, o botão <code>Finalizar pedido</code> deve abrir a janela <code>#confirmar</code> como <b>modal</b>
        (escurecendo o fundo), e o botão <code>OK</code> dentro dela deve fechá-la sem JavaScript.
        Substitua cada <code>____</code> pelo que falta. <i>(Na prévia daqui o envio de formulários é simulado, então o botão do <code>method="dialog"</code> pode não fechar a janela; num site de verdade, fecha.)</i>`,
      dica: `O método que abre como modal é <code>showModal()</code>. Um formulário com <code>method="dialog"</code> fecha a janela ao ser enviado.`,
      lang: "web",
      inicial: {
        html: c`<____ id="confirmar">
  <p>Pedido enviado! Chega em até 40 minutos.</p>
  <form method="____"><button>OK</button></form>
</dialog>

<button onclick="confirmar.____()">Finalizar pedido</button>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<dialog id="confirmar">
  <p>Pedido enviado! Chega em até 40 minutos.</p>
  <form method="dialog"><button>OK</button></form>
</dialog>

<button onclick="confirmar.showModal()">Finalizar pedido</button>`,
        css: "",
        js: ""
      },
      teste: c`
var d = document.getElementById("confirmar");
__assert(d && d.tagName === "DIALOG", 'O elemento id="confirmar" deveria ser um <dialog>.');
__assert(!d.open, "A janela deve começar fechada.");
__botao("Finalizar pedido").click();
await __esperar(50);
__assert(d.open && d.matches(":modal"), "Clicar em Finalizar pedido deveria abrir a janela como modal (showModal).");
var f = d.querySelector("form");
__assert(f && f.getAttribute("method") === "dialog", 'O formulário dentro da janela deveria ter method="dialog" (é ele que fecha a janela ao clicar em OK).');
__assert(f.querySelector("button") && f.querySelector("button").textContent.trim() === "OK", "Mantenha o botão OK dentro do formulário.");`
    },
    {
      tipo: "completar",
      titulo: "Botão de compra com data-*",
      enunciado: `O botão de compra guarda o ID e o preço do produto em atributos <code>data-*</code>. Ao clicar, o parágrafo <code>#carrinho</code>
        deve mostrar <code>Produto 42 adicionado: R$ 19.90</code>. Substitua cada <code>____</code> no HTML e no JavaScript.`,
      dica: `<code>data-produto-id</code> vira <code>dataset.produtoId</code> no JavaScript (o nome muda para camelCase); <code>data-preco</code> vira <code>dataset.preco</code>.`,
      lang: "web",
      aba: "js",
      inicial: {
        html: c`<button id="comprar" data-produto-id="42" data-____="19.90">Adicionar ao carrinho</button>
<p id="carrinho">Carrinho vazio</p>`,
        css: "",
        js: c`const botao = document.getElementById("comprar");

botao.addEventListener("click", function () {
  const id = botao.dataset.____;
  const preco = botao.dataset.____;
  document.getElementById("carrinho").textContent = "Produto " + id + " adicionado: R$ " + preco;
});`
      },
      solucao: {
        html: c`<button id="comprar" data-produto-id="42" data-preco="19.90">Adicionar ao carrinho</button>
<p id="carrinho">Carrinho vazio</p>`,
        css: "",
        js: c`const botao = document.getElementById("comprar");

botao.addEventListener("click", function () {
  const id = botao.dataset.produtoId;
  const preco = botao.dataset.preco;
  document.getElementById("carrinho").textContent = "Produto " + id + " adicionado: R$ " + preco;
});`
      },
      teste: c`
var b = document.getElementById("comprar");
__assert(b.getAttribute("data-preco") === "19.90", 'O botão deveria ter data-preco="19.90".');
b.click();
await __esperar(50);
var t = document.getElementById("carrinho").textContent.trim();
__assert(t === "Produto 42 adicionado: R$ 19.90", 'Depois do clique, #carrinho deveria mostrar "Produto 42 adicionado: R$ 19.90", mas mostra "' + t + '".');`
    },
    {
      tipo: "criar",
      titulo: "Detalhes do agendamento em modal",
      enunciado: `No sistema da clínica, crie:
        <ul>
          <li>um <code>&lt;dialog id="detalhes"&gt;</code> com um <code>&lt;h2&gt;</code> <code>Consulta marcada</code>, um parágrafo com a data e um botão <code>Fechar</code> que fecha a janela usando <code>&lt;form method="dialog"&gt;</code>;</li>
          <li>um botão <code>Ver detalhes</code> que abre esse diálogo <b>como modal</b>.</li>
        </ul> <i>(Na prévia daqui o envio de formulários é simulado, então o botão do <code>method="dialog"</code> pode não fechar a janela; num site de verdade, fecha.)</i>`,
      dica: `Para abrir como modal, chame <code>showModal()</code> no diálogo (pode ser no <code>onclick</code> ou com <code>addEventListener</code> na aba JS).`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie o dialog #detalhes e o botão "Ver detalhes" -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<dialog id="detalhes">
  <h2>Consulta marcada</h2>
  <p>Terça-feira, 10/11, às 14h com a Dra. Paula.</p>
  <form method="dialog"><button>Fechar</button></form>
</dialog>

<button onclick="detalhes.showModal()">Ver detalhes</button>`,
        css: "",
        js: ""
      },
      teste: c`
var d = document.getElementById("detalhes");
__assert(d && d.tagName === "DIALOG", 'Falta o <dialog id="detalhes">.');
var h = d.querySelector("h2");
__assert(h && h.textContent.trim() === "Consulta marcada", 'O diálogo deveria ter o <h2> "Consulta marcada".');
__assert(d.querySelector("p"), "O diálogo deveria ter um parágrafo com a data.");
__assert(d.querySelector('form[method="dialog"]'), 'Use <form method="dialog"> para o botão Fechar.');
__assert(!d.open, "O diálogo deve começar fechado.");
var abrir = __botao("Ver detalhes");
__assert(abrir, 'Falta o botão "Ver detalhes".');
abrir.click();
await __esperar(50);
__assert(d.open && d.matches(":modal"), 'O botão "Ver detalhes" deveria abrir o diálogo como modal (showModal).');
var fb = d.querySelector('form[method="dialog"] button');
__assert(fb && fb.textContent.trim() === "Fechar", 'O botão "Fechar" deveria ficar dentro do <form method="dialog">.');`
    },
    {
      tipo: "criar",
      titulo: "Total da cafeteria com data-*",
      enunciado: `Crie o pedido rápido da cafeteria:
        <ul>
          <li>três botões com a classe <code>add</code> e o preço em <code>data-preco</code>: <code>Café</code> (<code>5.50</code>), <code>Pão de queijo</code> (<code>4.00</code>) e <code>Suco</code> (<code>7.25</code>);</li>
          <li>um <code>&lt;span id="total"&gt;</code> que começa com <code>0.00</code>;</li>
          <li>no JavaScript, cada clique em um botão <code>.add</code> soma o seu <code>data-preco</code> ao total e mostra o valor com 2 casas decimais (ex.: <code>9.50</code>).</li>
        </ul>`,
      dica: `<code>dataset.preco</code> é sempre texto: converta com <code>Number(...)</code> antes de somar. Para 2 casas: <code>total.toFixed(2)</code>. Use <code>querySelectorAll(".add")</code> e <code>forEach</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Pedido rápido</h2>
<!-- Crie os 3 botões .add com data-preco e o span#total -->
`,
        css: "",
        js: c`// Some o data-preco de cada botão clicado e mostre em #total com 2 casas
`
      },
      solucao: {
        html: c`<h2>Pedido rápido</h2>
<button class="add" data-preco="5.50">Café</button>
<button class="add" data-preco="4.00">Pão de queijo</button>
<button class="add" data-preco="7.25">Suco</button>
<p>Total: R$ <span id="total">0.00</span></p>`,
        css: "",
        js: c`let total = 0;

document.querySelectorAll(".add").forEach(function (botao) {
  botao.addEventListener("click", function () {
    total = total + Number(botao.dataset.preco);
    document.getElementById("total").textContent = total.toFixed(2);
  });
});`
      },
      teste: c`
var precos = { "Café": "5.50", "Pão de queijo": "4.00", "Suco": "7.25" };
Object.keys(precos).forEach(function (n) {
  var b = __botao(n);
  __assert(b && b.classList.contains("add"), 'Falta o botão "' + n + '" com a classe add.');
  __assert(b.dataset.preco === precos[n], 'O botão "' + n + '" deveria ter data-preco="' + precos[n] + '".');
});
var t = document.getElementById("total");
__assert(t && t.tagName === "SPAN", 'Falta o <span id="total">.');
__assert(t.textContent.trim() === "0.00", 'O total deveria começar com "0.00".');
__botao("Café").click(); __botao("Café").click(); __botao("Suco").click();
await __esperar(50);
__assert(t.textContent.trim() === "18.25", 'Depois de 2 cafés e 1 suco, o total deveria ser "18.25", mas é "' + t.textContent.trim() + '".');
__botao("Pão de queijo").click();
await __esperar(50);
__assert(t.textContent.trim() === "22.25", 'Somando 1 pão de queijo, o total deveria ser "22.25", mas é "' + t.textContent.trim() + '".');`
    }
  ],

  // ================================================================ Nível Iniciante
  // ---------------------------------------------------------------- p1: O que é HTML e sua primeira página
  p1: [
    {
      tipo: "completar",
      titulo: "Fechando as tags da padaria",
      enunciado: `A primeira página da Padaria do Zé está com as tags de fechar incompletas. Toda tag que abre precisa fechar com uma barra e o mesmo nome.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `A tag de fechar repete o nome da tag que abriu: <code>&lt;h1&gt;</code> fecha com <code>&lt;/h1&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Padaria do Zé</____>
<p>Pão quentinho todos os dias.</____>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Padaria do Zé</h1>
<p>Pão quentinho todos os dias.</p>`,
        css: "",
        js: ""
      },
      padroes: [
        [/<h1>Padaria do Zé<\/h1>/i, "O título deve fechar com </h1>."],
        [/<p>Pão quentinho todos os dias\.<\/p>/i, "O parágrafo deve fechar com </p>."]
      ],
      teste: c`
var h = document.querySelector("h1");
__assert(h && h.textContent.trim() === "Padaria do Zé", 'Falta o <h1> com o texto "Padaria do Zé".');
var p = document.querySelector("p");
__assert(p && p.textContent.trim() === "Pão quentinho todos os dias.", "Falta o parágrafo <p> com o texto da padaria.");`
    },
    {
      tipo: "completar",
      titulo: "O texto da aba e o corpo",
      enunciado: `A Loja da Ana quer que a aba do navegador mostre exatamente <code>Loja da Ana</code>, e que o título apareça na parte visível da página.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `O texto da aba fica dentro de <code>&lt;title&gt;</code>. A parte visível da página é o <code>&lt;body&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>____</title>
  </head>
  <____>
    <h1>Loja da Ana</h1>
  </body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Loja da Ana</title>
  </head>
  <body>
    <h1>Loja da Ana</h1>
  </body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [[/<body>/i, "Abra a parte visível com <body>."]],
      teste: c`
__assert(document.title === "Loja da Ana", 'O texto da aba (<title>) deveria ser "Loja da Ana", mas é "' + document.title + '".');
var h = document.body.querySelector("h1");
__assert(h && h.textContent.trim() === "Loja da Ana", "O <h1> deve ficar dentro do <body>.");`
    },
    {
      tipo: "completar",
      titulo: "Primeira linha e idioma",
      enunciado: `A página do Mercadinho Bom Preço precisa avisar ao navegador que é HTML moderno (primeira linha) e que o idioma é português do Brasil (<code>pt-BR</code>).
        Clique em cada retângulo e escreva o que falta.`,
      dica: `A primeira linha é <code>&lt;!doctype html&gt;</code>. O idioma vai no atributo <code>lang</code> da tag <code>&lt;html&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!____ html>
<html lang="____">
  <head>
    <meta charset="utf-8">
    <title>Mercadinho Bom Preço</title>
  </head>
  <body>
    <h1>Mercadinho Bom Preço</h1>
  </body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Mercadinho Bom Preço</title>
  </head>
  <body>
    <h1>Mercadinho Bom Preço</h1>
  </body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [[/<!doctype\s+html>/i, "A primeira linha deve ser <!doctype html>."]],
      teste: c`
__assert(document.documentElement.getAttribute("lang") === "pt-BR", 'O lang da tag <html> deveria ser "pt-BR", mas é "' + document.documentElement.getAttribute("lang") + '".');`
    },
    {
      tipo: "criar",
      titulo: "Olá, mundo!",
      enunciado: `Crie sua primeira página: um título <code>&lt;h1&gt;</code> com o texto exato <code>Olá, mundo!</code> e, embaixo, um parágrafo <code>&lt;p&gt;</code> com qualquer frase sobre você.`,
      dica: `Abra e feche cada tag: <code>&lt;h1&gt;...&lt;/h1&gt;</code> e <code>&lt;p&gt;...&lt;/p&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Escreva aqui o seu h1 e o seu parágrafo -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Olá, mundo!</h1>
<p>Meu nome é Ana e estou aprendendo HTML.</p>`,
        css: "",
        js: ""
      },
      padroes: [[/<\/h1>/i, "Feche o título com </h1>."], [/<\/p>/i, "Feche o parágrafo com </p>."]],
      teste: c`
var h = document.querySelector("h1");
__assert(h, "Falta o título <h1>.");
__assert(h.textContent.trim() === "Olá, mundo!", 'O <h1> deveria ter o texto "Olá, mundo!", mas tem "' + h.textContent.trim() + '".');
var p = document.querySelector("p");
__assert(p && p.textContent.trim().length > 0, "Falta um parágrafo <p> com uma frase.");`
    },
    {
      tipo: "criar",
      titulo: "Cartão de visita do eletricista",
      enunciado: `O João é eletricista e quer uma página simples. Crie uma página completa (com <code>&lt;!doctype html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> e <code>&lt;body&gt;</code>) em que:
        <ul>
          <li>o texto da aba seja <code>Cartão do João</code>;</li>
          <li>apareça um <code>&lt;h1&gt;</code> com <code>João Silva</code>;</li>
          <li>e um <code>&lt;p&gt;</code> com <code>Eletricista</code>.</li>
        </ul>`,
      dica: `O <code>&lt;title&gt;</code> fica no <code>&lt;head&gt;</code>; o <code>&lt;h1&gt;</code> e o <code>&lt;p&gt;</code> ficam no <code>&lt;body&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Monte aqui o esqueleto completo da página do João -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Cartão do João</title>
  </head>
  <body>
    <h1>João Silva</h1>
    <p>Eletricista</p>
  </body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [
        [/<!doctype\s+html>/i, "Comece com <!doctype html>."],
        [/<head>[\s\S]*<title>[\s\S]*<\/head>/i, "O <title> precisa ficar dentro do <head>."],
        [/<body>[\s\S]*<h1>[\s\S]*<\/body>/i, "O <h1> precisa ficar dentro do <body>."]
      ],
      teste: c`
__assert(document.title === "Cartão do João", 'O texto da aba deveria ser "Cartão do João", mas é "' + document.title + '".');
var h = document.querySelector("h1");
__assert(h && h.textContent.trim() === "João Silva", 'Falta o <h1> com "João Silva".');
var p = document.querySelector("p");
__assert(p && p.textContent.trim() === "Eletricista", 'Falta o <p> com "Eletricista".');`
    }
  ],

  // ---------------------------------------------------------------- p2: Textos e títulos
  p2: [
    {
      tipo: "completar",
      titulo: "Títulos do cardápio",
      enunciado: `O cardápio da Lanchonete da Praça tem um título principal e um subtítulo para as bebidas.
        Clique em cada retângulo e escreva o nome da tag que falta.`,
      dica: `O título principal é o <code>h1</code>; o subtítulo logo abaixo dele é o <code>h2</code>. Olhe a tag de fechar de cada linha.`,
      lang: "web",
      inicial: {
        html: c`<____>Cardápio</h1>
<____>Bebidas</h2>
<p>Suco de laranja, café e chá.</p>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Cardápio</h1>
<h2>Bebidas</h2>
<p>Suco de laranja, café e chá.</p>`,
        css: "",
        js: ""
      },
      teste: c`
var h1 = document.querySelector("h1");
__assert(h1 && h1.textContent.trim() === "Cardápio", 'O <h1> deveria ser "Cardápio".');
var h2 = document.querySelector("h2");
__assert(h2 && h2.textContent.trim() === "Bebidas", 'O <h2> deveria ser "Bebidas".');`
    },
    {
      tipo: "completar",
      titulo: "Destaque da promoção",
      enunciado: `No aviso do Café Aroma, o trecho <code>pão de queijo grátis</code> é a parte mais importante e deve ficar destacado com a tag de importância.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `A tag de importância (negrito) é a <code>strong</code>. Ela abre antes e fecha depois do trecho.`,
      lang: "web",
      inicial: {
        html: c`<p>Hoje tem <____>pão de queijo grátis</____> no café da manhã!</p>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<p>Hoje tem <strong>pão de queijo grátis</strong> no café da manhã!</p>`,
        css: "",
        js: ""
      },
      teste: c`
var s = document.querySelector("p strong");
__assert(s, "Falta a tag <strong> dentro do parágrafo.");
__assert(s.textContent.trim() === "pão de queijo grátis", 'O <strong> deveria destacar "pão de queijo grátis", mas destaca "' + s.textContent.trim() + '".');`
    },
    {
      tipo: "completar",
      titulo: "Endereço em duas linhas",
      enunciado: `O endereço da Clínica Sorriso precisa aparecer em duas linhas no mesmo parágrafo, e a palavra <code>novo</code> deve ter ênfase (itálico).
        Clique em cada retângulo e escreva o que falta.`,
      dica: `A quebra de linha é uma tag sozinha, de duas letras. A ênfase é a tag <code>em</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Clínica Sorriso</h1>
<p>Nosso <____>novo</em> endereço:</p>
<p>Rua das Palmeiras, 200<____>Centro - Belo Horizonte</p>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Clínica Sorriso</h1>
<p>Nosso <em>novo</em> endereço:</p>
<p>Rua das Palmeiras, 200<br>Centro - Belo Horizonte</p>`,
        css: "",
        js: ""
      },
      teste: c`
var e = document.querySelector("p em");
__assert(e && e.textContent.trim() === "novo", 'A palavra "novo" deve ficar dentro de <em>.');
__assert(document.querySelector("p br"), "Falta a quebra de linha <br> dentro do parágrafo do endereço.");`
    },
    {
      tipo: "criar",
      titulo: "Página de receita",
      enunciado: `Crie a página de uma receita:
        <ul>
          <li>um único <code>&lt;h1&gt;</code> com <code>Bolo de cenoura</code>;</li>
          <li>um <code>&lt;h2&gt;</code> com <code>Ingredientes</code> seguido de um parágrafo;</li>
          <li>um <code>&lt;h2&gt;</code> com <code>Modo de preparo</code> seguido de outro parágrafo.</li>
        </ul>`,
      dica: `Use a ordem: h1, h2, p, h2, p. Cada parágrafo é um <code>&lt;p&gt;</code> separado.`,
      lang: "web",
      inicial: {
        html: c`<!-- Escreva a receita: h1, h2 + p, h2 + p -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Bolo de cenoura</h1>
<h2>Ingredientes</h2>
<p>3 cenouras, 3 ovos, 2 xícaras de farinha e 1 xícara de açúcar.</p>
<h2>Modo de preparo</h2>
<p>Bata tudo no liquidificador e asse por 40 minutos.</p>`,
        css: "",
        js: ""
      },
      teste: c`
var h1s = document.querySelectorAll("h1");
__assert(h1s.length === 1, "A página deve ter exatamente um <h1> (tem " + h1s.length + ").");
__assert(h1s[0].textContent.trim() === "Bolo de cenoura", 'O <h1> deveria ser "Bolo de cenoura".');
var h2s = Array.prototype.map.call(document.querySelectorAll("h2"), function (h) { return h.textContent.trim(); });
__assert(h2s.indexOf("Ingredientes") >= 0, 'Falta o <h2> "Ingredientes".');
__assert(h2s.indexOf("Modo de preparo") >= 0, 'Falta o <h2> "Modo de preparo".');
__assert(document.querySelectorAll("p").length >= 2, "Coloque um parágrafo <p> depois de cada <h2>.");
document.querySelectorAll("h2").forEach(function (h) {
  var prox = h.nextElementSibling;
  __assert(prox && prox.tagName === "P", 'Depois do <h2> "' + h.textContent.trim() + '" deveria vir um <p>.');
});`
    },
    {
      tipo: "criar",
      titulo: "Aviso importante da clínica",
      enunciado: `Crie o aviso da Clínica Vida: um <code>&lt;h1&gt;</code> com <code>Clínica Vida</code> e um parágrafo que contenha o trecho <code>Traga seu documento</code> destacado com <code>&lt;strong&gt;</code>. Coloque também um comentário HTML (que não aparece na tela) com qualquer lembrete.`,
      dica: `Comentário: <code>&lt;!-- lembrete --&gt;</code>. O <code>&lt;strong&gt;</code> fica dentro do <code>&lt;p&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Escreva aqui o aviso da clínica e um comentário com um lembrete -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!-- aviso atualizado em outubro -->
<h1>Clínica Vida</h1>
<p><strong>Traga seu documento</strong> no dia da consulta.</p>`,
        css: "",
        js: ""
      },
      padroes: [[/<!--[\s\S]*?-->/, "Falta um comentário <!-- ... --> no código."]],
      teste: c`
var h = document.querySelector("h1");
__assert(h && h.textContent.trim() === "Clínica Vida", 'Falta o <h1> com "Clínica Vida".');
var s = document.querySelector("p strong");
__assert(s && s.textContent.trim() === "Traga seu documento", 'Dentro do <p>, destaque "Traga seu documento" com <strong>.');`
    }
  ],

  // ---------------------------------------------------------------- p3: Links
  p3: [
    {
      tipo: "completar",
      titulo: "Link para o mapa",
      enunciado: `A Pizzaria Bella quer um link <code>Como chegar</code> que leve ao Google Maps (outro site, endereço absoluto).
        Clique em cada retângulo e escreva o que falta: o nome do atributo do destino e o começo do endereço seguro.`,
      dica: `O destino do link vai no atributo <code>href</code>. Endereço de outro site começa com <code>https</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Pizzaria Bella</h1>
<a ____="____://www.google.com/maps">Como chegar</a>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Pizzaria Bella</h1>
<a href="https://www.google.com/maps">Como chegar</a>`,
        css: "",
        js: ""
      },
      teste: c`
var a = document.querySelector('a[href^="https://"]');
__assert(a, 'Falta um link <a> com href começando por "https://".');
__assert(a.getAttribute("href") === "https://www.google.com/maps", 'O href deveria ser "https://www.google.com/maps", mas é "' + a.getAttribute("href") + '".');
__assert(a.textContent.trim() === "Como chegar", 'O texto do link deveria ser "Como chegar".');`
    },
    {
      tipo: "completar",
      titulo: "Links entre as páginas do site",
      enunciado: `O site da Doceria Mel tem estas pastas:
        <pre>index.html
contato.html
produtos/
  bolos.html</pre>
        Você está editando o <code>index.html</code>. Complete os endereços <b>relativos</b>: <code>Fale conosco</code> vai para <code>contato.html</code> (mesma pasta) e <code>Nossos bolos</code> vai para <code>bolos.html</code> (dentro da pasta <code>produtos</code>).
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Mesma pasta: só o nome do arquivo. Dentro de uma pasta: <code>pasta/arquivo.html</code>.`,
      lang: "web",
      inicial: {
        html: c`<nav>
  <a href="____">Fale conosco</a>
  <a href="____/bolos.html">Nossos bolos</a>
</nav>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<nav>
  <a href="contato.html">Fale conosco</a>
  <a href="produtos/bolos.html">Nossos bolos</a>
</nav>`,
        css: "",
        js: ""
      },
      teste: c`
var links = document.querySelectorAll("nav a");
__assert(links.length === 2, "O menu deve ter os 2 links.");
var h1 = links[0].getAttribute("href"), h2 = links[1].getAttribute("href");
__assert(h1 === "contato.html" || h1 === "./contato.html", 'O link "Fale conosco" deveria ter href="contato.html", mas tem "' + h1 + '".');
__assert(h2 === "produtos/bolos.html", 'O link "Nossos bolos" deveria ter href="produtos/bolos.html", mas tem "' + h2 + '".');`
    },
    {
      tipo: "completar",
      titulo: "Instagram em nova aba",
      enunciado: `O link do Instagram da Padaria do Zé deve abrir em uma <b>nova aba</b>, com a proteção que impede a página nova de mexer na aba do site.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Nova aba: <code>target="_blank"</code>. Proteção: <code>rel="noopener"</code>.`,
      lang: "web",
      inicial: {
        html: c`<a href="https://www.instagram.com/padariadoze" target="____" rel="____">Siga no Instagram</a>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<a href="https://www.instagram.com/padariadoze" target="_blank" rel="noopener">Siga no Instagram</a>`,
        css: "",
        js: ""
      },
      teste: c`
var a = document.querySelector('a[href^="https://www.instagram.com"]');
__assert(a, "Falta o link do Instagram.");
__assert(a.getAttribute("target") === "_blank", 'O target deveria ser "_blank", mas é "' + a.getAttribute("target") + '".');
__assert((" " + (a.getAttribute("rel") || "") + " ").indexOf(" noopener ") >= 0, 'O rel deveria ter "noopener".');`
    },
    {
      tipo: "criar",
      titulo: "Contatos da padaria",
      enunciado: `Crie os 3 links de contato da Padaria do Zé:
        <ul>
          <li><code>Mande um e-mail</code>, que abre o e-mail para <code>contato@padariadoze.com</code> (use <code>mailto:</code>);</li>
          <li><code>Ligue para nós</code>, que abre o discador com <code>+5511999999999</code> (use <code>tel:</code>);</li>
          <li><code>Peça pelo WhatsApp</code>, que vai para <code>https://wa.me/5511999999999</code> e abre em nova aba com <code>rel="noopener"</code>.</li>
        </ul>`,
      dica: `Exemplo de formato: <code>&lt;a href="tel:+55..."&gt;texto&lt;/a&gt;</code>. Links externos em nova aba levam <code>target="_blank"</code> e <code>rel="noopener"</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Padaria do Zé</h1>
<!-- Crie aqui os links de e-mail, telefone e WhatsApp -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Padaria do Zé</h1>
<a href="mailto:contato@padariadoze.com">Mande um e-mail</a>
<a href="tel:+5511999999999">Ligue para nós</a>
<a href="https://wa.me/5511999999999" target="_blank" rel="noopener">Peça pelo WhatsApp</a>`,
        css: "",
        js: ""
      },
      teste: c`
var mail = document.querySelector('a[href^="mailto:"]');
__assert(mail && mail.getAttribute("href") === "mailto:contato@padariadoze.com", 'Falta o link com href="mailto:contato@padariadoze.com".');
var tel = document.querySelector('a[href^="tel:"]');
__assert(tel && tel.getAttribute("href").replace(/\s/g, "") === "tel:+5511999999999", 'Falta o link com href="tel:+5511999999999".');
var w = document.querySelector('a[href^="https://wa.me/"]');
__assert(w && w.getAttribute("href") === "https://wa.me/5511999999999", 'Falta o link do WhatsApp com href="https://wa.me/5511999999999".');
__assert(w.getAttribute("target") === "_blank", 'O link do WhatsApp deve ter target="_blank".');
__assert((" " + (w.getAttribute("rel") || "") + " ").indexOf(" noopener ") >= 0, 'O link do WhatsApp deve ter rel="noopener".');`
    },
    {
      tipo: "criar",
      titulo: "Âncora e volta ao início",
      enunciado: `Esta página fica em <code>produtos/bolos.html</code>. Crie:
        <ul>
          <li>um link <code>Ver horários</code> que pula para a seção da mesma página com <code>id="horarios"</code>;</li>
          <li>um <code>&lt;h2&gt;</code> com o texto <code>Horários</code> e o <code>id="horarios"</code>;</li>
          <li>um link <code>Voltar ao início</code> que leva ao <code>index.html</code> da pasta de cima (endereço relativo com <code>../</code>).</li>
        </ul>`,
      dica: `Âncora: <code>href="#horarios"</code>. Subir uma pasta: <code>../</code> antes do nome do arquivo.`,
      lang: "web",
      inicial: {
        html: c`<h1>Nossos bolos</h1>
<!-- Crie os links e a seção de horários -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Nossos bolos</h1>
<a href="#horarios">Ver horários</a>
<a href="../index.html">Voltar ao início</a>

<h2 id="horarios">Horários</h2>
<p>Todos os dias, das 8h às 18h.</p>`,
        css: "",
        js: ""
      },
      teste: c`
var ancora = document.querySelector('a[href="#horarios"]');
__assert(ancora, 'Falta o link com href="#horarios".');
var alvo = document.getElementById("horarios");
__assert(alvo && alvo.tagName === "H2", 'Falta o <h2 id="horarios">.');
__assert(alvo.textContent.trim() === "Horários", 'O <h2> deveria ter o texto "Horários".');
var volta = document.querySelector('a[href="../index.html"]');
__assert(volta, 'Falta o link "Voltar ao início" com href="../index.html".');`
    }
  ],

  // ---------------------------------------------------------------- p4: Imagens
  p4: [
    {
      tipo: "completar",
      titulo: "Foto do pão",
      enunciado: `A foto do pão francês está na pasta <code>img</code> do site. Complete a imagem: o atributo do endereço (que faz o navegador pedir o arquivo) e o atributo do texto alternativo.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `O endereço vai no <code>src</code>; o texto que aparece se a imagem quebrar vai no <code>alt</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Padaria do Zé</h1>
<img ____="img/pao.jpg" ____="Pão francês quentinho">`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Padaria do Zé</h1>
<img src="img/pao.jpg" alt="Pão francês quentinho">`,
        css: "",
        js: ""
      },
      teste: c`
var i = document.querySelector("img");
__assert(i, "Falta a imagem <img>.");
__assert(i.getAttribute("src") === "img/pao.jpg", 'O src deveria ser "img/pao.jpg", mas é "' + i.getAttribute("src") + '".');
__assert(i.getAttribute("alt") === "Pão francês quentinho", 'O alt deveria ser "Pão francês quentinho".');`
    },
    {
      tipo: "completar",
      titulo: "Subindo uma pasta",
      enunciado: `Você está editando <code>produtos/bolos.html</code>, e a foto fica em <code>img/bolo.jpg</code>, na pasta de cima:
        <pre>index.html
img/
  bolo.jpg
produtos/
  bolos.html   ← você está aqui</pre>
        Clique no retângulo e escreva o que falta para o caminho relativo encontrar a foto.`,
      dica: `Para voltar uma pasta, use dois pontos seguidos.`,
      lang: "web",
      inicial: {
        html: c`<h1>Nossos bolos</h1>
<img src="____/img/bolo.jpg" alt="Bolo de chocolate">`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Nossos bolos</h1>
<img src="../img/bolo.jpg" alt="Bolo de chocolate">`,
        css: "",
        js: ""
      },
      teste: c`
var i = document.querySelector("img");
__assert(i && i.getAttribute("src") === "../img/bolo.jpg", 'O src deveria ser "../img/bolo.jpg", mas é "' + (i && i.getAttribute("src")) + '".');`
    },
    {
      tipo: "completar",
      titulo: "Foto de outro site, segura e preguiçosa",
      enunciado: `A Loja Verde usa uma foto de um banco de imagens (outro site). A página é segura (<code>https</code>), então a imagem também deve ser. E ela fica no fim da página, então só deve ser pedida quando a pessoa rolar até ela.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Endereço seguro começa com <code>https</code>. O carregamento “preguiçoso” é <code>loading="lazy"</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Loja Verde</h1>
<p>Plantas para todos os cantos da casa.</p>
<img src="____://picsum.photos/400/300" alt="Vaso com planta na janela" width="400" height="300" loading="____">`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Loja Verde</h1>
<p>Plantas para todos os cantos da casa.</p>
<img src="https://picsum.photos/400/300" alt="Vaso com planta na janela" width="400" height="300" loading="lazy">`,
        css: "",
        js: ""
      },
      teste: c`
var i = document.querySelector('img[src^="https://"]');
__assert(i, 'O src da imagem deveria começar com "https://".');
__assert(i.getAttribute("loading") === "lazy", 'O loading deveria ser "lazy", mas é "' + i.getAttribute("loading") + '".');`
    },
    {
      tipo: "criar",
      titulo: "Vitrine com duas fotos",
      enunciado: `Monte a vitrine do Café Aroma com 2 imagens:
        <ul>
          <li>uma do <b>seu site</b>: <code>src="img/cafe.jpg"</code>, com <code>alt</code>, <code>width="300"</code> e <code>height="200"</code>;</li>
          <li>uma de <b>outro site</b>: <code>src</code> começando com <code>https://</code> (pode usar <code>https://picsum.photos/300/200</code>), com <code>alt</code> e <code>loading="lazy"</code>.</li>
        </ul>
        Todas as imagens devem ter um <code>alt</code> descrevendo a foto (não pode ficar vazio).`,
      dica: `Cada imagem é uma tag <code>&lt;img&gt;</code> sozinha, sem fechamento, com os atributos no formato <code>nome="valor"</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Café Aroma</h1>
<!-- Coloque aqui as duas imagens -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Café Aroma</h1>
<img src="img/cafe.jpg" alt="Xícara de café com espuma" width="300" height="200">
<img src="https://picsum.photos/300/200" alt="Mesa do café com pães" loading="lazy">`,
        css: "",
        js: ""
      },
      teste: c`
var imgs = document.querySelectorAll("img");
__assert(imgs.length >= 2, "Coloque 2 imagens <img> (há " + imgs.length + ").");
var local = document.querySelector('img[src="img/cafe.jpg"]');
__assert(local, 'Falta a imagem do seu site com src="img/cafe.jpg".');
__assert(local.getAttribute("width") === "300" && local.getAttribute("height") === "200", 'A imagem img/cafe.jpg deve ter width="300" e height="200".');
var ext = document.querySelector('img[src^="https://"]');
__assert(ext, 'Falta a imagem de outro site (src começando com "https://").');
__assert(ext.getAttribute("loading") === "lazy", 'A imagem de outro site deve ter loading="lazy".');
imgs.forEach(function (i) {
  __assert((i.getAttribute("alt") || "").trim().length > 0, 'A imagem "' + i.getAttribute("src") + '" está sem alt (ou com alt vazio).');
});`
    },
    {
      tipo: "criar",
      titulo: "Logo que leva ao início",
      enunciado: `É comum o logo do site ser um link para a página inicial. Crie um link <code>&lt;a&gt;</code> com <code>href="index.html"</code> e, <b>dentro</b> dele (no lugar do texto), a imagem <code>img/logo.png</code> com <code>alt="Padaria do Zé - página inicial"</code>.`,
      dica: `A imagem fica entre <code>&lt;a ...&gt;</code> e <code>&lt;/a&gt;</code>. Quando a imagem é o link, o <code>alt</code> diz para onde ele leva.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie o link com o logo dentro -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<a href="index.html">
  <img src="img/logo.png" alt="Padaria do Zé - página inicial" width="120" height="120">
</a>`,
        css: "",
        js: ""
      },
      teste: c`
var i = document.querySelector('a[href="index.html"] img');
__assert(i, 'Falta a imagem dentro de um link <a href="index.html">.');
__assert(i.getAttribute("src") === "img/logo.png", 'O src da imagem deveria ser "img/logo.png".');
__assert(i.getAttribute("alt") === "Padaria do Zé - página inicial", 'O alt deveria ser "Padaria do Zé - página inicial".');`
    }
  ],

  // ---------------------------------------------------------------- p5: Trazendo conteúdo de outros sites
  p5: [
    {
      tipo: "completar",
      titulo: "Vídeo da receita no YouTube",
      enunciado: `A Doceria Mel quer mostrar um vídeo do YouTube na página. O código veio do botão <b>Compartilhar → Incorporar</b>, mas algumas partes sumiram: o nome da tag da “janela”, o pedaço do endereço de incorporar e o atributo que descreve o vídeo para leitores de tela.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `A janela para outra página é o <code>iframe</code>. O endereço de incorporar do YouTube tem <code>/embed/</code>. A descrição vai em <code>title</code>.`,
      lang: "web",
      inicial: {
        html: c`<h1>Bolo de pote</h1>
<____ width="560" height="315"
  src="https://www.youtube.com/____/M7lc1UVf-VE"
  ____="Vídeo da receita de bolo de pote"
  allowfullscreen></iframe>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Bolo de pote</h1>
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/M7lc1UVf-VE"
  title="Vídeo da receita de bolo de pote"
  allowfullscreen></iframe>`,
        css: "",
        js: ""
      },
      teste: c`
var f = document.querySelector("iframe");
__assert(f, "Falta o <iframe>.");
__assert(f.getAttribute("src") === "https://www.youtube.com/embed/M7lc1UVf-VE", 'O src deveria ser "https://www.youtube.com/embed/M7lc1UVf-VE", mas é "' + f.getAttribute("src") + '".');
__assert((f.getAttribute("title") || "").trim().length > 0, "Falta o title do iframe.");`
    },
    {
      tipo: "completar",
      titulo: "Mapa de “Como chegar”",
      enunciado: `A Clínica Sorriso colou o mapa do Google Maps (Compartilhar → Incorporar um mapa), mas faltam partes: o caminho de incorporar no endereço e o carregamento preguiçoso (só buscar o mapa quando a pessoa rolar até ele).
        Clique em cada retângulo e escreva o que falta.`,
      dica: `O endereço de incorporar do Google Maps é <code>https://www.google.com/maps/embed?pb=...</code>. Carregamento preguiçoso: <code>lazy</code>.`,
      lang: "web",
      inicial: {
        html: c`<h2>Como chegar</h2>
<iframe
  src="https://www.google.com/maps/____?pb=CODIGO_DO_MAPA"
  width="400" height="300"
  title="Mapa da Clínica Sorriso"
  loading="____"></iframe>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h2>Como chegar</h2>
<iframe
  src="https://www.google.com/maps/embed?pb=CODIGO_DO_MAPA"
  width="400" height="300"
  title="Mapa da Clínica Sorriso"
  loading="lazy"></iframe>`,
        css: "",
        js: ""
      },
      teste: c`
var f = document.querySelector('iframe[src^="https://www.google.com/maps/embed"]');
__assert(f, 'O src do iframe deveria começar com "https://www.google.com/maps/embed".');
__assert(f.getAttribute("loading") === "lazy", 'O loading deveria ser "lazy", mas é "' + f.getAttribute("loading") + '".');`
    },
    {
      tipo: "completar",
      titulo: "Fonte do Google e script do site",
      enunciado: `A Loja da Ana vai usar a fonte Poppins do Google Fonts (um arquivo de CSS que vem de outro site) e o arquivo de JavaScript do próprio site, <code>js/app.js</code>.
        Clique em cada retângulo e escreva o que falta para o navegador pedir os dois arquivos.`,
      dica: `Arquivo de estilo: <code>&lt;link rel="stylesheet" href="..."&gt;</code>. Arquivo de JavaScript: <code>&lt;script src="..."&gt;&lt;/script&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Loja da Ana</title>
  <link rel="____" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
</head>
<body>
  <h1>Loja da Ana</h1>
  <script ____="js/app.js"></script>
</body>
</html>`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Loja da Ana</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
</head>
<body>
  <h1>Loja da Ana</h1>
  <script src="js/app.js"></script>
</body>
</html>`,
        css: "",
        js: ""
      },
      teste: c`
__assert(document.querySelector('link[rel="stylesheet"][href^="https://fonts.googleapis.com"]'), 'Falta o <link rel="stylesheet"> do Google Fonts.');
__assert(document.querySelector('script[src="js/app.js"]'), 'Falta o <script src="js/app.js">.');`
    },
    {
      tipo: "criar",
      titulo: "Vídeo institucional",
      enunciado: `Coloque na página da Academia Forte o vídeo do YouTube de código <code>M7lc1UVf-VE</code> usando um <code>&lt;iframe&gt;</code>:
        <ul>
          <li>com o endereço de <b>incorporar</b> (<code>https://www.youtube.com/embed/...</code>), não o de assistir;</li>
          <li>com um <code>title</code> descrevendo o vídeo;</li>
          <li>com <code>allowfullscreen</code> (tela cheia).</li>
        </ul>`,
      dica: `O formato é <code>&lt;iframe src="..." title="..." allowfullscreen&gt;&lt;/iframe&gt;</code>. O iframe precisa da tag de fechar.`,
      lang: "web",
      inicial: {
        html: c`<h1>Academia Forte</h1>
<!-- Coloque aqui o vídeo do YouTube -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<h1>Academia Forte</h1>
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/M7lc1UVf-VE"
  title="Conheça a Academia Forte"
  allowfullscreen></iframe>`,
        css: "",
        js: ""
      },
      teste: c`
var f = document.querySelector("iframe");
__assert(f, "Falta o <iframe>.");
var s = f.getAttribute("src") || "";
__assert(s.indexOf("watch?v=") < 0, 'Use o endereço de incorporar (/embed/), não o de assistir (watch?v=).');
__assert(s.indexOf("https://www.youtube.com/embed/M7lc1UVf-VE") === 0, 'O src deveria começar com "https://www.youtube.com/embed/M7lc1UVf-VE".');
__assert((f.getAttribute("title") || "").trim().length > 0, "Falta o title do iframe.");
__assert(f.hasAttribute("allowfullscreen"), "Falta o atributo allowfullscreen.");`
    },
    {
      tipo: "criar",
      titulo: "Página que pede CSS e JS",
      enunciado: `Crie a página completa da Floricultura Rosa, que busca dois arquivos do próprio site:
        <ul>
          <li>no <code>&lt;head&gt;</code>: o texto da aba <code>Floricultura Rosa</code> e o arquivo de estilos <code>css/estilo.css</code> (com <code>&lt;link rel="stylesheet"&gt;</code>);</li>
          <li>no <code>&lt;body&gt;</code>: um <code>&lt;h1&gt;</code> com <code>Floricultura Rosa</code> e, no final, o arquivo <code>js/app.js</code> (com <code>&lt;script src&gt;</code>).</li>
        </ul>`,
      dica: `O <code>&lt;link&gt;</code> não tem fechamento; o <code>&lt;script&gt;</code> precisa de <code>&lt;/script&gt;</code>.`,
      lang: "web",
      inicial: {
        html: c`<!-- Crie a página completa: head com title e link, body com h1 e script -->
`,
        css: "",
        js: ""
      },
      solucao: {
        html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Floricultura Rosa</title>
  <link rel="stylesheet" href="css/estilo.css">
</head>
<body>
  <h1>Floricultura Rosa</h1>
  <script src="js/app.js"></script>
</body>
</html>`,
        css: "",
        js: ""
      },
      padroes: [
        [/<head>[\s\S]*<link[^>]+rel=["']?stylesheet[\s\S]*<\/head>/i, 'O <link rel="stylesheet"> deve ficar dentro do <head>.'],
        [/<script[^>]+src=["']js\/app\.js["'][^>]*>\s*<\/script>/i, 'Escreva <script src="js/app.js"></script> (com a tag de fechar).']
      ],
      teste: c`
__assert(document.title === "Floricultura Rosa", 'O texto da aba deveria ser "Floricultura Rosa", mas é "' + document.title + '".');
__assert(document.querySelector('link[rel="stylesheet"][href="css/estilo.css"]'), 'Falta <link rel="stylesheet" href="css/estilo.css">.');
var h = document.querySelector("h1");
__assert(h && h.textContent.trim() === "Floricultura Rosa", 'Falta o <h1> com "Floricultura Rosa".');
__assert(document.querySelector('script[src="js/app.js"]'), 'Falta o <script src="js/app.js">.');`
    }
  ]
};
