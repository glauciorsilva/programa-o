const c = String.raw;

export default {
  id: "html",
  nome: "HTML",
  icone: "🧱",
  cor: "#e34c26",
  dificuldade: 1,
  resumo: "A estrutura de toda página da web. É o esqueleto: títulos, textos, imagens, links e formulários.",
  mercado: "Obrigatório para front-end, full-stack, marketing digital, e-mails e WordPress. Aparece em quase toda vaga web.",
  docs: [
    { nome: "MDN Web Docs — HTML", url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML", desc: "a referência mais confiável, em português" },
    { nome: "W3Schools HTML", url: "https://www.w3schools.com/html/", desc: "exemplos rápidos com botão “Try it”" },
    { nome: "Validador W3C", url: "https://validator.w3.org/", desc: "cole seu HTML e veja os erros" }
  ],
  niveis: {
    basico: {
      objetivo: "montar uma página simples com títulos, textos, links, imagens, listas e tabelas.",
      topicos: [
        {
          titulo: "Estrutura de uma página",
          crianca: `Uma página é como uma <b>casa</b>. O <code>&lt;html&gt;</code> é a casa inteira, o <code>&lt;head&gt;</code> é o sótão (guarda coisas que ninguém vê, como o nome da casa) e o <code>&lt;body&gt;</code> é a sala, onde fica tudo o que as visitas enxergam. As <b>tags</b> são caixinhas: uma abre <code>&lt;p&gt;</code> e outra fecha <code>&lt;/p&gt;</code>.`,
          codigo: c`
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Minha primeira página</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <p>Esta é minha primeira página.</p>
  </body>
</html>`,
          nota: "Salve como <code>index.html</code> e abra no navegador com dois cliques.",
          trabalho: `Na empresa pedem uma <b>landing page</b> de promoção. A primeira coisa que você faz é criar esse esqueleto com <code>title</code> correto (aparece no Google e na aba) e o <code>meta viewport</code> (sem ele, o site fica minúsculo no celular).`,
          entrevista: {
            pergunta: "Para que serve o <!doctype html> e a tag meta viewport?",
            resposta: `O <code>doctype</code> avisa ao navegador que a página usa HTML5 e evita o “modo de compatibilidade” antigo. O <code>meta viewport</code> faz a página usar a largura real do celular, essencial para sites responsivos.`
          },
          busca: ["estrutura básica html5", "meta viewport o que é", "MDN head html"]
        },
        {
          titulo: "Textos, links e imagens",
          crianca: `Títulos são como as letras grandes da capa de um livro: <code>&lt;h1&gt;</code> é o maior e <code>&lt;h6&gt;</code> o menor. O <code>&lt;p&gt;</code> é um parágrafo. O link <code>&lt;a&gt;</code> é uma <b>porta mágica</b> que leva a outro lugar. A imagem <code>&lt;img&gt;</code> é um quadro na parede, e o <code>alt</code> é a plaquinha que diz o que tem no quadro para quem não consegue ver.`,
          codigo: c`
<h1>Padaria do Zé</h1>
<h2>Nossos pães</h2>
<p>Pão francês <strong>quentinho</strong> toda manhã.</p>

<a href="https://wa.me/5511999999999" target="_blank" rel="noopener">
  Peça pelo WhatsApp
</a>

<img src="pao.jpg" alt="Cesta com pães franceses" width="300">`,
          trabalho: `Um cliente pede o botão “Fale no WhatsApp” no site. É só um <code>&lt;a&gt;</code> com o link <code>wa.me</code>. O <code>alt</code> nas imagens é exigido em sites do governo e ajuda no SEO (Google lê o alt).`,
          entrevista: {
            pergunta: "Qual a diferença entre <strong> e <b>? E por que usar o atributo alt?",
            resposta: `<code>&lt;strong&gt;</code> indica <b>importância</b> (tem significado para leitores de tela e Google); <code>&lt;b&gt;</code> só deixa visualmente em negrito. O <code>alt</code> descreve a imagem para pessoas cegas, aparece se a imagem não carregar e ajuda no SEO.`
          },
          busca: ["tag a target blank rel noopener", "atributo alt acessibilidade", "html strong vs b"]
        },
        {
          titulo: "Listas e tabelas",
          crianca: `Lista é a <b>lista de compras</b> da mamãe: <code>&lt;ul&gt;</code> usa bolinhas, <code>&lt;ol&gt;</code> usa números. Tabela é como um <b>jogo da velha grande</b>: tem linhas (<code>&lt;tr&gt;</code>) e quadradinhos (<code>&lt;td&gt;</code>), e a primeira linha pode ter os títulos (<code>&lt;th&gt;</code>).`,
          codigo: c`
<ol>
  <li>Abrir o sistema</li>
  <li>Emitir a nota</li>
</ol>

<table>
  <thead>
    <tr><th>Produto</th><th>Preço</th></tr>
  </thead>
  <tbody>
    <tr><td>Café</td><td>R$ 5,00</td></tr>
    <tr><td>Pão de queijo</td><td>R$ 4,50</td></tr>
  </tbody>
</table>`,
          trabalho: `Relatórios simples, tabela de preços e <b>e-mails marketing</b> (que ainda são montados com tabelas!) usam esse conteúdo. Passo a passo de manual interno costuma ser <code>&lt;ol&gt;</code>.`,
          entrevista: {
            pergunta: "Quando devo usar tabela e quando NÃO devo?",
            resposta: `Use tabela para <b>dados tabulares</b> (linhas e colunas, como planilha). Não use tabela para montar o layout da página: para isso existem CSS Flexbox e Grid. A exceção é e-mail HTML, onde tabelas ainda são o padrão.`
          },
          busca: ["html table thead tbody", "ul ol li diferença", "html email tabela layout"]
        }
      ]
    },
    intermediario: {
      objetivo: "criar formulários que funcionam, organizar a página com tags semânticas e deixá-la acessível.",
      topicos: [
        {
          titulo: "Formulários",
          crianca: `Formulário é aquela <b>ficha de cadastro</b> que se preenche no médico. Cada espaço em branco é um <code>&lt;input&gt;</code>, o nome escrito ao lado é o <code>&lt;label&gt;</code> e o botão de entregar a ficha é o <code>&lt;button type="submit"&gt;</code>.`,
          codigo: c`
<form action="/contato" method="post">
  <label for="nome">Nome</label>
  <input id="nome" name="nome" required>

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required>

  <label for="assunto">Assunto</label>
  <select id="assunto" name="assunto">
    <option>Orçamento</option>
    <option>Suporte</option>
  </select>

  <label><input type="checkbox" name="lgpd" required> Aceito a política de privacidade</label>

  <button type="submit">Enviar</button>
</form>`,
          nota: "Os tipos <code>email</code>, <code>tel</code>, <code>date</code> e <code>number</code> já abrem o teclado certo no celular.",
          trabalho: `Formulário de <b>orçamento</b>, de <b>login</b> ou de <b>“trabalhe conosco”</b> é tarefa de toda semana. O <code>required</code> e o <code>type="email"</code> já validam sem nenhuma linha de JavaScript. O checkbox de LGPD é exigido por lei em muitos casos.`,
          entrevista: {
            pergunta: "Qual a diferença entre os métodos GET e POST em um formulário?",
            resposta: `<b>GET</b> envia os dados na URL (bom para buscas e filtros, pode ser salvo como favorito). <b>POST</b> envia no corpo da requisição (usado para cadastrar, logar e enviar dados sensíveis). Senha nunca vai por GET.`
          },
          busca: ["html form input types", "label for id acessibilidade", "form get vs post"]
        },
        {
          titulo: "HTML semântico",
          crianca: `Imagine uma escola com placas: <b>“Secretaria”</b>, <b>“Cantina”</b>, <b>“Banheiro”</b>. Sem placas, tudo seria só “sala”. Tags semânticas são essas placas: <code>&lt;header&gt;</code> (cabeçalho), <code>&lt;nav&gt;</code> (menu), <code>&lt;main&gt;</code> (conteúdo principal), <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code> (rodapé). Assim o Google e os leitores de tela entendem a página.`,
          codigo: c`
<header>
  <nav>
    <a href="/">Início</a>
    <a href="/servicos">Serviços</a>
  </nav>
</header>

<main>
  <article>
    <h1>Como economizar na conta de luz</h1>
    <p>...</p>
  </article>
  <aside>Posts relacionados</aside>
</main>

<footer>© 2026 Minha Empresa</footer>`,
          trabalho: `Ao migrar um site antigo cheio de <code>&lt;div&gt;</code>, trocar por tags semânticas melhora o <b>SEO</b> e a nota de acessibilidade no Lighthouse (ferramenta do Chrome que muitas empresas usam como meta).`,
          entrevista: {
            pergunta: "O que é HTML semântico e por que ele importa?",
            resposta: `É usar a tag que descreve o <b>significado</b> do conteúdo, e não só a aparência. Importa para acessibilidade (leitores de tela navegam por regiões), SEO (o Google entende o que é principal) e manutenção (o código fica mais legível).`
          },
          busca: ["html semântico exemplos", "div vs section vs article", "lighthouse acessibilidade"]
        },
        {
          titulo: "Acessibilidade básica",
          crianca: `Acessibilidade é construir a casa com <b>rampa</b> além da escada, para que todo mundo consiga entrar. No site, é ter <code>alt</code> nas imagens, <code>label</code> nos campos, cores com bom contraste e dar para usar tudo só com o <b>teclado</b>.`,
          codigo: c`
<!-- Botão de ícone precisa de um nome -->
<button aria-label="Fechar janela">✕</button>

<!-- Imagem decorativa: alt vazio para o leitor pular -->
<img src="enfeite.svg" alt="">

<!-- Link que diz para onde vai -->
<a href="/relatorio.pdf">Baixar relatório anual (PDF, 2 MB)</a>

<!-- Mensagem de erro anunciada ao leitor de tela -->
<p role="alert">Preencha o CPF.</p>`,
          trabalho: `Bancos, governo e grandes empresas exigem conformidade com a <b>WCAG</b> e com a Lei Brasileira de Inclusão. É comum receber um relatório de auditoria e precisar corrigir “botão sem nome acessível” ou “contraste insuficiente”.`,
          entrevista: {
            pergunta: "Como você testa se uma página é acessível?",
            resposta: `Navego só com Tab/Enter, uso o Lighthouse ou a extensão axe DevTools, verifico contraste e, se possível, testo com leitor de tela (NVDA no Windows, VoiceOver no Mac/iPhone). Também confiro alt, labels e a hierarquia de títulos.`
          },
          busca: ["wcag checklist português", "aria-label quando usar", "axe devtools"]
        }
      ]
    },
    avancado: {
      objetivo: "deixar páginas rápidas, bem posicionadas no Google e usar elementos modernos sem bibliotecas.",
      topicos: [
        {
          titulo: "SEO e meta tags",
          crianca: `O Google é um <b>bibliotecário</b> que precisa saber do que cada livro fala. As meta tags são a <b>etiqueta na capa</b>: título, resumo e a figurinha que aparece quando você compartilha o link no WhatsApp.`,
          codigo: c`
<head>
  <title>Pizzaria Bella | Delivery em Campinas</title>
  <meta name="description" content="Pizza artesanal com entrega em 30 min em Campinas.">
  <link rel="canonical" href="https://pizzariabella.com.br/">

  <!-- Prévia no WhatsApp, Facebook, LinkedIn -->
  <meta property="og:title" content="Pizzaria Bella">
  <meta property="og:description" content="Peça já sua pizza artesanal!">
  <meta property="og:image" content="https://pizzariabella.com.br/capa.jpg">
</head>`,
          trabalho: `O time de marketing reclama que o link enviado no WhatsApp aparece <b>sem imagem</b>. A solução são as tags <b>Open Graph</b> (<code>og:</code>). Também é comum ajustar <code>title</code> e <code>description</code> para melhorar o posicionamento.`,
          entrevista: {
            pergunta: "Quais práticas de HTML ajudam no SEO?",
            resposta: `Um <code>h1</code> por página com hierarquia correta, <code>title</code> e <code>meta description</code> únicos, tags semânticas, <code>alt</code> em imagens, URLs canônicas, site rápido e responsivo, e dados estruturados (JSON-LD) quando fizer sentido.`
          },
          busca: ["open graph tags whatsapp", "meta description tamanho ideal", "json-ld schema.org exemplo"]
        },
        {
          titulo: "Performance: carregar rápido",
          crianca: `Se você leva <b>todos os brinquedos</b> para o parque de uma vez, demora para sair de casa. Melhor levar só o que vai usar agora e buscar o resto depois. No site, carregamos primeiro o que aparece na tela e deixamos o resto “preguiçoso” (<code>lazy</code>).`,
          codigo: c`
<!-- Imagem só carrega quando chegar perto da tela -->
<img src="galeria-1.webp" alt="Ambiente" loading="lazy" width="800" height="600">

<!-- Imagem diferente para celular e desktop -->
<picture>
  <source media="(max-width: 600px)" srcset="banner-mobile.webp">
  <img src="banner-desktop.webp" alt="Promoção de inverno">
</picture>

<!-- Script não trava o carregamento da página -->
<script src="app.js" defer></script>`,
          trabalho: `O Google mede a velocidade (<b>Core Web Vitals</b>) e isso afeta vendas. Uma tarefa clássica: “o site está lento no 4G”. Você converte imagens para WebP, usa <code>loading="lazy"</code>, define <code>width/height</code> (evita a página “pular”) e coloca <code>defer</code> nos scripts.`,
          entrevista: {
            pergunta: "Qual a diferença entre script com async e com defer?",
            resposta: `Os dois baixam o arquivo sem travar o HTML. <b>defer</b> executa na ordem, depois que o HTML terminou de ser lido (ideal para o código do site). <b>async</b> executa assim que baixar, sem ordem garantida (bom para scripts independentes, como analytics).`
          },
          busca: ["core web vitals o que são", "script async vs defer", "img loading lazy suporte"]
        },
        {
          titulo: "Elementos nativos modernos",
          crianca: `Antigamente, para ter uma <b>caixinha que abre e fecha</b> ou uma janela que pula na tela, era preciso montar tudo à mão. Hoje o HTML já vem com esses brinquedos prontos: <code>&lt;details&gt;</code> (sanfona) e <code>&lt;dialog&gt;</code> (janela modal).`,
          codigo: c`
<details>
  <summary>Qual o prazo de entrega?</summary>
  <p>Até 5 dias úteis para capitais.</p>
</details>

<dialog id="aviso">
  <p>Seu pedido foi enviado!</p>
  <form method="dialog"><button>OK</button></form>
</dialog>
<button onclick="aviso.showModal()">Finalizar</button>

<!-- Dados extras para o JavaScript usar -->
<button data-produto-id="42" data-preco="19.90">Comprar</button>`,
          trabalho: `Página de <b>perguntas frequentes (FAQ)</b> com <code>&lt;details&gt;</code> não precisa de biblioteca. Os atributos <code>data-*</code> são muito usados para guardar o ID do produto no botão e ler com JavaScript no carrinho.`,
          entrevista: {
            pergunta: "Para que servem os atributos data-*?",
            resposta: `Guardam informações personalizadas no elemento HTML, sem inventar atributos inválidos. No JavaScript lemos com <code>elemento.dataset.produtoId</code>. São úteis para ligar o HTML à lógica (IDs, preços, estados).`
          },
          busca: ["html dialog element", "details summary faq", "dataset javascript data attributes"]
        }
      ]
    }
  }
};
