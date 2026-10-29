// Nível Iniciante da trilha html: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis
// e o lembrete "E no CSS?" (css) de cada tópico existente.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "criar e abrir sua primeira página no navegador, escrever títulos e textos, colocar links e imagens (do seu site e de outros sites) e trazer vídeos e mapas para dentro da página.",
  topicos: [
    // ------------------------------------------------------------ p1
    {
      titulo: "O que é HTML e sua primeira página",
      crianca: `HTML é a <b>língua que o navegador entende</b> para montar uma página. Pense numa <b>mudança de casa</b>: você escreve etiquetas nas caixas (“louça”, “livros”, “roupas”) para quem carrega saber o que tem dentro. No HTML, as etiquetas se chamam <b>tags</b>: você escreve <code>&lt;h1&gt;</code> antes de um título e o navegador entende “isto é um título grande”. O navegador (Chrome, Edge, Firefox, Safari) lê essas etiquetas e desenha a página na tela.`,
      passos: [
        {
          titulo: "Uma página é só um arquivo de texto",
          html: `<p>Abra um editor de texto (o <b>Bloco de Notas</b> serve; o <b>VS Code</b>, gratuito, é melhor). Escreva uma frase e salve com o nome <code>pagina.html</code>. O final <code>.html</code> (a <b>extensão</b>) avisa ao computador que aquilo é uma página da web.</p>
<p>Agora dê <b>dois cliques</b> no arquivo: ele abre no navegador. Pronto, você criou uma página!</p>`,
          codigo: c`Olá! Esta é a minha primeira página.`,
          pratica: [
            m("Com que final (extensão) você deve salvar o arquivo da página?", ["`.html`", "`.txt`", "`.docx`", "`.jpg`"], 0, "O final `.html` avisa que o arquivo é uma página da web, e o navegador sabe abri-lo."),
            vf("Para ver a página pronta, você abre o arquivo `.html` no navegador (Chrome, Edge, Firefox...).", true, "Isso mesmo! Dois cliques no arquivo e ele abre no navegador, que desenha a página.")
          ]
        },
        {
          titulo: "Tags: etiquetas que abrem e fecham",
          html: `<p>Uma <b>tag</b> é um nome entre os sinais <code>&lt;</code> e <code>&gt;</code>. Quase toda tag vem em dupla: uma <b>abre</b> (<code>&lt;p&gt;</code>) e outra <b>fecha</b> (<code>&lt;/p&gt;</code>). A de fechar é igual, só que com uma <b>barra</b> <code>/</code> antes do nome.</p>
<p>O que fica no meio é o conteúdo. Aqui, <code>p</code> quer dizer <b>parágrafo</b>.</p>`,
          codigo: c`<p>Pão quentinho todos os dias.</p>`,
          pratica: [
            l("Complete a tag que fecha o parágrafo:", c`<p>Bom dia!</____>`, ["p"], "A tag de fechar repete o nome com uma barra antes: `</p>`."),
            m("Qual destas é a tag que FECHA um parágrafo?", ["`</p>`", "`<p>`", "`<\\p>`", "`<p/>`"], 0, "A barra normal `/` vem logo depois do `<`: `</p>`.")
          ]
        },
        {
          titulo: "Caixas dentro de caixas",
          html: `<p>Uma tag pode ficar <b>dentro</b> de outra, como uma caixinha dentro de uma caixa maior. A regra: a última que abriu é a primeira que fecha.</p>
<p>Para enxergar melhor, deixamos as tags de dentro um pouco mais para a direita (isso se chama <b>indentação</b>, e é só para facilitar a leitura).</p>`,
          codigo: c`<p>Hoje tem <strong>bolo de cenoura</strong>!</p>`,
          pratica: [
            m("Qual linha está CERTA?", ["`<p><strong>Oi</strong></p>`", "`<p><strong>Oi</p></strong>`", "`<strong><p>Oi</strong></p>`", "`<p>Oi<strong></p>`"], 0, "Quem abriu por último (`<strong>`) fecha primeiro; depois fecha o `<p>`.")
          ]
        },
        {
          titulo: "O esqueleto da página",
          html: `<p>Toda página tem um <b>esqueleto</b> padrão:</p>
<ul>
<li><code>&lt;!doctype html&gt;</code>: primeira linha, avisa “sou uma página HTML moderna”.</li>
<li><code>&lt;html&gt;</code>: a página inteira.</li>
<li><code>&lt;head&gt;</code>: configurações que não aparecem na página, como o <code>&lt;title&gt;</code> (o texto da <b>aba</b> do navegador).</li>
<li><code>&lt;body&gt;</code>: tudo o que <b>aparece na tela</b>.</li>
</ul>`,
          codigo: c`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Padaria do Zé</title>
  </head>
  <body>
    <h1>Padaria do Zé</h1>
  </body>
</html>`,
          pratica: [
            m("Em qual parte fica o que APARECE na tela para o visitante?", ["`<body>`", "`<head>`", "`<title>`", "`<!doctype html>`"], 0, "O `<body>` (corpo) guarda tudo o que a pessoa vê. O `<head>` guarda configurações."),
            l("Complete para que a aba do navegador mostre Padaria:", c`<____>Padaria</title>`, ["title"], "O texto da aba fica dentro de `<title>` e `</title>`, no `<head>`.")
          ]
        },
        {
          titulo: "Mudou? Salve e atualize",
          html: `<p>O navegador mostra a versão do arquivo que ele leu quando abriu. Depois de mudar o código, <b>salve</b> o arquivo (Ctrl+S) e <b>atualize</b> a página no navegador (tecla <b>F5</b> ou o botão ⟳).</p>
<p>Dica: deixe o editor e o navegador lado a lado. Escreveu, salvou, F5. Esse vai e volta é o dia a dia de quem faz sites.</p>`,
          pratica: [
            vf("Depois de mudar o código, é preciso salvar o arquivo e atualizar (F5) o navegador para ver a mudança.", true, "Isso! Sem salvar e atualizar, o navegador continua mostrando a versão antiga.")
          ]
        }
      ],
      codigo: c`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Minha primeira página</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <p>Esta é a minha <strong>primeira</strong> página.</p>
  </body>
</html>`,
      partes: [
        ["<!doctype html>", "Primeira linha do arquivo. Avisa ao navegador que a página usa o HTML moderno."],
        ['<html lang="pt-BR">', "Abre a página inteira. O `lang` diz que o idioma é português do Brasil (ajuda o tradutor e o leitor de tela)."],
        ['<meta charset="utf-8">', "Faz os acentos (é, ã, ç) aparecerem certinho."],
        ["<title>Minha primeira página</title>", "O texto que aparece na aba do navegador. Fica dentro do `<head>`."],
        ["<body>", "Começo da parte visível: tudo daqui até `</body>` aparece na tela."],
        ["<h1>Olá, mundo!</h1>", "Um título grande. Abre com `<h1>` e fecha com `</h1>`."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b>, troque o texto do <code>&lt;h1&gt;</code> e veja a página mudar.",
      trabalho: `Todo site que você visita (loja, banco, rede social) é, no fundo, HTML que o navegador recebeu e desenhou. Quando uma empresa pede “uma página simples com o cardápio”, o primeiro passo é exatamente este: criar o arquivo <code>index.html</code> com o esqueleto.`,
      entrevista: {
        pergunta: "Qual a diferença entre o head e o body?",
        resposta: `O <code>&lt;head&gt;</code> guarda informações <b>sobre</b> a página que não aparecem nela: título da aba, codificação de caracteres, links para arquivos de CSS. O <code>&lt;body&gt;</code> guarda o <b>conteúdo visível</b>: títulos, textos, imagens, links.`
      },
      busca: ["o que é html para iniciantes", "como criar arquivo html no bloco de notas", "vs code primeiro html"],
      noCss: {
        texto: `A cor de fundo, a fonte e a cor das letras da página inteira não são escolhidas no HTML: isso é <b>CSS</b>. O jeito mais simples de começar é colocar uma tag <code>&lt;style&gt;</code> dentro do <code>&lt;head&gt;</code> e configurar o <code>body</code>:`,
        codigo: c`<style>
  body {
    background-color: #fff8ee;     /* cor de fundo da página */
    color: #333333;                /* cor das letras */
    font-family: Arial, sans-serif; /* tipo de letra */
    margin: 24px;                  /* espaço nas bordas da tela */
  }
</style>`
      }
    },

    // ------------------------------------------------------------ p2
    {
      titulo: "Textos e títulos",
      crianca: `Pense na <b>primeira página de um jornal</b>: tem a manchete enorme, depois os títulos menores de cada notícia e, embaixo, os textos. No HTML é igual: <code>&lt;h1&gt;</code> é a manchete, <code>&lt;h2&gt;</code> e <code>&lt;h3&gt;</code> são títulos menores e <code>&lt;p&gt;</code> é o texto (parágrafo). E quando uma palavra é muito importante, você a “grifa” com <code>&lt;strong&gt;</code>.`,
      passos: [
        {
          titulo: "Títulos do maior para o menor: h1, h2, h3",
          html: `<p>O <b>h</b> vem de <i>heading</i> (“título”, em inglês), e o número diz o nível: <code>&lt;h1&gt;</code> é o mais importante (e o maior), <code>&lt;h2&gt;</code> é um subtítulo, <code>&lt;h3&gt;</code> é um subtítulo dentro do subtítulo. Existem até o <code>&lt;h6&gt;</code>, mas no dia a dia usamos h1, h2 e h3.</p>
<p>Use <b>um só</b> <code>&lt;h1&gt;</code> por página: é o assunto principal (o Google também lê assim).</p>`,
          codigo: c`<h1>Padaria do Zé</h1>
<h2>Pães</h2>
<h3>Pão francês</h3>`,
          pratica: [
            m("Qual tag é o título MAIS importante da página?", ["`<h1>`", "`<h3>`", "`<h6>`", "`<p>`"], 0, "Quanto menor o número, mais importante: `<h1>` é a manchete."),
            vf("Um `<h3>` é um título mais importante que um `<h1>`.", false, "É o contrário: o `<h1>` é o principal; o `<h3>` é um subtítulo de nível 3.")
          ]
        },
        {
          titulo: "Parágrafos com p",
          html: `<p>Textos corridos vão dentro de <code>&lt;p&gt;</code> (parágrafo). Cada <code>&lt;p&gt;</code> começa em uma nova linha, com um espacinho em cima e embaixo.</p>
<p>Atenção: o navegador <b>ignora</b> os Enters e os espaços extras que você digita no código. Para separar textos, use um <code>&lt;p&gt;</code> para cada um.</p>`,
          codigo: c`<p>Abrimos às 6h da manhã.</p>
<p>Aos domingos, fechamos ao meio-dia.</p>`,
          pratica: [
            vf("Se eu apertar Enter várias vezes no meio do texto do código, a página mostra várias linhas em branco.", false, "O navegador junta espaços e Enters em um único espaço. Para separar, use parágrafos `<p>` diferentes."),
            l("Complete para criar um parágrafo:", c`<____>Entregamos em todo o bairro.</p>`, ["p"], "Parágrafo abre com `<p>` e fecha com `</p>`.")
          ]
        },
        {
          titulo: "Destaque: strong (importante) e em (ênfase)",
          html: `<p><code>&lt;strong&gt;</code> marca algo <b>importante</b> (aparece em negrito). <code>&lt;em&gt;</code> dá <b>ênfase</b>, como quando a gente fala uma palavra com outro tom (aparece em itálico).</p>
<p>Eles ficam <b>dentro</b> do parágrafo, só em volta das palavras que você quer destacar.</p>`,
          codigo: c`<p><strong>Atenção:</strong> amanhã a loja abre <em>mais tarde</em>.</p>`,
          pratica: [
            m("Qual tag usar para destacar a palavra “Promoção” como importante?", ["`<strong>`", "`<h6>`", "`<title>`", "`<head>`"], 0, "`<strong>` indica importância e deixa o texto em negrito.")
          ]
        },
        {
          titulo: "Quebra de linha e comentários",
          html: `<p>Para pular de linha <b>dentro</b> do mesmo parágrafo (como num endereço), use <code>&lt;br&gt;</code>. Ela é uma tag <b>sozinha</b>: não tem tag de fechar.</p>
<p>Um <b>comentário</b> <code>&lt;!-- assim --&gt;</code> é um bilhete para você mesmo: fica no código, mas <b>não aparece</b> na tela.</p>`,
          codigo: c`<!-- endereço da loja -->
<p>Rua das Flores, 10<br>Centro - Campinas</p>`,
          pratica: [
            m("O que acontece com `<!-- trocar o preço amanhã -->` na página?", ["Não aparece na tela; é só um lembrete no código", "Aparece em vermelho", "Vira um título", "Dá erro na página"], 0, "Comentários ficam só no código, para quem lê o HTML."),
            vf("A tag `<br>` precisa de uma tag de fechar `</br>`.", false, "`<br>` é uma tag vazia: ela só marca o ponto da quebra de linha e não tem fechamento.")
          ]
        }
      ],
      codigo: c`<h1>Padaria do Zé</h1>
<p>Pão quentinho <strong>toda manhã</strong>, desde 1998.</p>

<h2>Pães</h2>
<h3>Pão francês</h3>
<p>Casquinha crocante e miolo macio.</p>

<h2>Onde estamos</h2>
<!-- endereço com quebra de linha -->
<p>Rua das Flores, 10<br>Centro - Campinas</p>
<p>Aos domingos abrimos <em>só de manhã</em>.</p>`,
      partes: [
        ["<h1>Padaria do Zé</h1>", "O título principal da página. Só um `<h1>` por página."],
        ["<h2>Pães</h2>", "Subtítulo de uma seção. Organiza a página em partes."],
        ["<h3>Pão francês</h3>", "Subtítulo dentro da seção Pães."],
        ["<strong>toda manhã</strong>", "Destaca o trecho como importante (negrito)."],
        ["<br>", "Pula de linha dentro do mesmo parágrafo. Não tem fechamento."],
        ["<!-- ... -->", "Comentário: lembrete no código que não aparece na tela."]
      ],
      trabalho: `Quase toda tarefa de site começa com texto: a página “Sobre nós”, o cardápio, a política de troca. Organizar bem os títulos (h1 → h2 → h3) deixa a página fácil de ler e ajuda o Google a entender o assunto.`,
      entrevista: {
        pergunta: "Posso usar h3 só porque quero um título menor?",
        resposta: `Não é o ideal. O número do título indica a <b>ordem de importância</b>, não o tamanho. Escolha o nível certo (h1, depois h2, depois h3) e, se quiser outro tamanho, mude no CSS com <code>font-size</code>.`
      },
      busca: ["html h1 h2 h3 hierarquia", "html strong em diferença", "html br quando usar"],
      noCss: {
        texto: `O HTML diz <b>o que</b> é título e o que é parágrafo; o <b>tamanho</b>, a <b>cor</b> e o <b>alinhamento</b> do texto se configuram no CSS:`,
        codigo: c`h1 {
  font-size: 32px;        /* tamanho da letra */
  color: #8b4513;         /* cor do título */
  text-align: center;     /* centralizado */
}
p {
  font-size: 18px;
  line-height: 1.5;       /* espaço entre as linhas */
}
strong {
  color: #c0392b;         /* destaque em vermelho */
}`
      }
    },

    // ------------------------------------------------------------ p3
    {
      titulo: "Links: levando para outras páginas",
      crianca: `Um link é como uma <b>placa de “siga por aqui”</b> ou o <b>endereço escrito num envelope</b>. Você escreve o endereço de destino e um texto para a pessoa clicar. Se o endereço estiver certo, o navegador vai até lá; se estiver errado, é como mandar carta para uma rua que não existe: a página <b>não é encontrada</b> (o famoso erro 404).`,
      passos: [
        {
          titulo: "A tag a e o atributo href",
          html: `<p>Link se faz com a tag <code>&lt;a&gt;</code> (de <i>anchor</i>, “âncora”). O destino vai no <b>atributo</b> <code>href</code>. <b>Atributo</b> é uma informação extra escrita dentro da tag de abrir, no formato <code>nome="valor"</code>.</p>
<p>O texto entre <code>&lt;a&gt;</code> e <code>&lt;/a&gt;</code> é o que aparece para a pessoa clicar (normalmente azul e sublinhado).</p>`,
          codigo: c`<a href="https://www.google.com">Pesquisar no Google</a>`,
          pratica: [
            l("Complete o atributo que guarda o endereço do link:", c`<a ____="https://www.google.com">Google</a>`, ["href"], "O destino do link sempre vai no `href`."),
            m("No link `<a href=\"https://g1.globo.com\">Notícias</a>`, o que aparece na tela para clicar?", ["Notícias", "https://g1.globo.com", "href", "Nada"], 0, "Aparece o texto entre `<a>` e `</a>`; o endereço fica escondido no `href`.")
          ]
        },
        {
          titulo: "Link para outro site: endereço absoluto",
          html: `<p>Para levar a <b>outro site</b>, escreva o endereço <b>completo</b>, começando com <code>https://</code>. Isso se chama endereço <b>absoluto</b>: funciona de qualquer lugar, como um endereço com rua, número, cidade e CEP.</p>
<p>Esqueceu o <code>https://</code>? Então <code>href="www.google.com"</code> é entendido como um <b>arquivo</b> chamado “www.google.com” dentro do seu site, e o link quebra.</p>`,
          codigo: c`<a href="https://www.instagram.com/padariadoze">Nosso Instagram</a>`,
          pratica: [
            vf("`<a href=\"www.google.com\">` (sem o `https://`) leva corretamente ao Google.", false, "Sem `https://`, o navegador procura um arquivo com esse nome no seu próprio site e não acha. Para outro site, use o endereço completo."),
            m("Qual destes é um endereço ABSOLUTO (completo)?", ["`https://www.correios.com.br`", "`contato.html`", "`../index.html`", "`img/foto.jpg`"], 0, "Endereço absoluto tem o caminho inteiro, começando com `https://`.")
          ]
        },
        {
          titulo: "Link para outra página do seu site: endereço relativo",
          html: `<p>Dentro do <b>seu</b> site, basta dizer onde está o arquivo <b>a partir da página atual</b>. Isso é um endereço <b>relativo</b>, como dizer “a padaria é a segunda porta à esquerda daqui”. Imagine estas pastas:</p>
<pre>meu-site/
├── index.html
├── contato.html
└── produtos/
    └── bolos.html</pre>
<ul>
<li>De <code>index.html</code> para o contato (mesma pasta): <code>href="contato.html"</code></li>
<li>De <code>index.html</code> para os bolos (entrando na pasta): <code>href="produtos/bolos.html"</code></li>
<li>De <code>bolos.html</code> de volta ao início (subindo uma pasta): <code>href="../index.html"</code> — o <code>../</code> quer dizer “volte uma pasta”.</li>
</ul>
<p>Se o nome, a pasta ou até uma letra maiúscula estiver errado, o servidor responde <b>erro 404</b> (“página não encontrada”).</p>`,
          codigo: c`<a href="contato.html">Fale conosco</a>
<a href="produtos/bolos.html">Nossos bolos</a>`,
          pratica: [
            l("Você está no `index.html`. Complete para abrir o `contato.html`, que está na MESMA pasta:", c`<a href="____">Contato</a>`, ["contato.html", "./contato.html"], "Na mesma pasta, basta o nome do arquivo: `contato.html`."),
            m("Você está em `produtos/bolos.html` e quer voltar para o `index.html` da pasta de cima. Qual `href`?", ["`../index.html`", "`index.html`", "`produtos/index.html`", "`/produtos/../`"], 0, "O `../` sobe uma pasta: sai de `produtos` e chega onde está o `index.html`."),
            m("O que significa o erro 404 ao clicar num link?", ["A página não foi encontrada naquele endereço", "A internet caiu", "O link abriu em nova aba", "A página carregou com sucesso"], 0, "404 é a resposta do servidor quando não existe nada naquele endereço. Confira o nome, a pasta e as maiúsculas.")
          ]
        },
        {
          titulo: "Abrir em nova aba: target e rel",
          html: `<p>Para o link abrir em uma <b>nova aba</b> (e o visitante não perder o seu site), use <code>target="_blank"</code>.</p>
<p>Junto, coloque <code>rel="noopener"</code>: é uma <b>proteção</b> que impede a página nova de mexer na aba do seu site. Use os dois sempre juntos em links para outros sites.</p>`,
          codigo: c`<a href="https://www.google.com/maps" target="_blank" rel="noopener">Como chegar</a>`,
          pratica: [
            l("Complete para o link abrir em uma nova aba:", c`<a href="https://www.youtube.com" target="____" rel="noopener">YouTube</a>`, ["_blank"], "O valor é `_blank`, com o tracinho embaixo (underline) no começo."),
            vf("O `rel=\"noopener\"` é uma proteção para usar junto com `target=\"_blank\"`.", true, "Isso! Ele impede que a página aberta na nova aba controle a aba do seu site.")
          ]
        },
        {
          titulo: "Links especiais: e-mail, telefone, WhatsApp e âncora",
          html: `<ul>
<li><code>href="mailto:contato@padaria.com"</code>: abre o programa de <b>e-mail</b> já com o destinatário.</li>
<li><code>href="tel:+5511999999999"</code>: no celular, abre o <b>discador</b> com o número.</li>
<li><code>href="https://wa.me/5511999999999"</code>: abre uma conversa no <b>WhatsApp</b> (só números: 55 do Brasil + DDD + número).</li>
<li><code>href="#horarios"</code>: <b>âncora</b>, pula para o lugar da MESMA página que tem <code>id="horarios"</code>.</li>
</ul>`,
          codigo: c`<a href="mailto:contato@padaria.com">Mande um e-mail</a>
<a href="tel:+5511999999999">Ligue para nós</a>
<a href="https://wa.me/5511999999999" target="_blank" rel="noopener">Peça pelo WhatsApp</a>
<a href="#horarios">Ver horários</a>

<h2 id="horarios">Horários</h2>`,
          pratica: [
            m("Qual link abre o discador do celular?", ["`<a href=\"tel:+5511988887777\">`", "`<a href=\"mailto:+5511988887777\">`", "`<a href=\"#5511988887777\">`", "`<a href=\"5511988887777.html\">`"], 0, "O `tel:` antes do número abre o discador."),
            l("Complete para o link pular até `<h2 id=\"cardapio\">` na mesma página:", c`<a href="____">Ver cardápio</a>`, ["#cardapio"], "Âncora é o `#` seguido do `id`: `#cardapio`.")
          ]
        }
      ],
      codigo: c`<h1>Padaria do Zé</h1>

<!-- link interno (relativo) -->
<a href="produtos/bolos.html">Nossos bolos</a>

<!-- link externo (absoluto), em nova aba -->
<a href="https://www.instagram.com/padariadoze" target="_blank" rel="noopener">Instagram</a>

<!-- links especiais -->
<a href="https://wa.me/5511999999999" target="_blank" rel="noopener">WhatsApp</a>
<a href="mailto:contato@padaria.com">E-mail</a>
<a href="tel:+5511999999999">Telefone</a>

<!-- âncora para a seção abaixo -->
<a href="#horarios">Horários</a>

<h2 id="horarios">Horários</h2>
<p>Todos os dias, das 6h às 20h.</p>`,
      partes: [
        ['href="produtos/bolos.html"', "Endereço relativo: entra na pasta `produtos` e abre `bolos.html` do seu próprio site."],
        ['href="https://www.instagram.com/padariadoze"', "Endereço absoluto: o caminho completo para outro site, começando com `https://`."],
        ['target="_blank" rel="noopener"', "Abre em nova aba (`_blank`) com proteção (`noopener`)."],
        ['href="https://wa.me/5511999999999"', "Abre conversa no WhatsApp: código do país + DDD + número, só números."],
        ['href="mailto:..." / href="tel:..."', "Abrem o e-mail e o discador do celular."],
        ['href="#horarios" ... id="horarios"', "Âncora: o `#horarios` pula até o elemento que tem `id=\"horarios\"`."]
      ],
      nota: "No sandbox, os links relativos levam a arquivos que não existem ali (dariam 404). Repare nos endereços e no que cada um faria.",
      trabalho: `Pedidos clássicos de clientes: “coloca um botão de WhatsApp”, “o link do Instagram tem que abrir em outra aba”, “o menu precisa levar para a seção de preços”. Tudo isso é <code>&lt;a&gt;</code> com o <code>href</code> certo. E quando alguém avisa “o link está dando 404”, você confere o caminho: pasta, nome do arquivo e maiúsculas.`,
      entrevista: {
        pergunta: "Qual a diferença entre um endereço absoluto e um relativo?",
        resposta: `O <b>absoluto</b> tem o caminho completo (<code>https://site.com/pagina.html</code>) e funciona de qualquer lugar; é usado para outros sites. O <b>relativo</b> é calculado a partir da página atual (<code>contato.html</code>, <code>../index.html</code>) e é usado entre as páginas do próprio site: se o site mudar de domínio, os links continuam funcionando.`
      },
      busca: ["html link relativo absoluto", "target _blank rel noopener", "link whatsapp wa.me site", "erro 404 o que é"],
      noCss: {
        texto: `A <b>cor</b> do link, o <b>sublinhado</b> e o efeito quando o mouse passa por cima (<code>:hover</code>) são configurados no CSS. Dá até para fazer um link parecer um botão:`,
        codigo: c`a {
  color: #8b4513;            /* cor do link */
  text-decoration: none;     /* tira o sublinhado */
}
a:hover {
  text-decoration: underline; /* sublinha ao passar o mouse */
}
a:visited {
  color: #6b4226;            /* cor de link já visitado */
}
.botao-whats {
  background: #25d366;       /* link com cara de botão */
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
}`
      }
    },

    // ------------------------------------------------------------ p4
    {
      titulo: "Imagens: como o navegador busca a imagem (request)",
      crianca: `A imagem <b>não fica dentro</b> do arquivo HTML. O HTML só tem um <b>bilhete com o endereço</b> da foto. Funciona como <b>pedir comida por delivery</b>: o navegador lê o endereço e faz um <b>pedido</b> (em inglês, <i>request</i>, ou <b>requisição</b>) ao servidor: “me manda o arquivo <code>foto.jpg</code>”. O servidor entrega e a foto aparece. Se o endereço estiver errado, o pedido volta “não encontrado” e aparece uma <b>imagem quebrada</b>.`,
      passos: [
        {
          titulo: "A tag img e o src: o navegador PEDE o arquivo",
          html: `<p>Imagem se coloca com <code>&lt;img&gt;</code>. Ela é uma tag <b>sozinha</b> (não tem <code>&lt;/img&gt;</code>). O endereço do arquivo vai no atributo <code>src</code> (de <i>source</i>, “origem”).</p>
<p>Quando o navegador encontra o <code>src</code>, ele faz uma <b>requisição</b>: pede o arquivo ao servidor (o computador onde o site está guardado). Cada imagem é um pedido separado. Por isso, numa internet lenta, o texto aparece antes e as fotos chegam depois.</p>`,
          codigo: c`<img src="pao.jpg" alt="Pão francês quentinho">`,
          pratica: [
            vf("A foto fica guardada dentro do arquivo `.html`.", false, "O HTML só guarda o endereço no `src`. O navegador busca (requisita) o arquivo da imagem separadamente."),
            m("O que o navegador faz quando lê `<img src=\"bolo.jpg\">`?", ["Pede o arquivo `bolo.jpg` ao servidor e mostra a imagem", "Desenha um bolo sozinho", "Abre uma nova aba", "Apaga a imagem"], 0, "O `src` é o endereço: o navegador faz uma requisição para buscar aquele arquivo.")
          ]
        },
        {
          titulo: "Imagem do seu site: caminho relativo e pastas",
          html: `<p>O mais comum é guardar as fotos numa pasta <code>img</code> ao lado da página:</p>
<pre>meu-site/
├── index.html
├── img/
│   ├── logo.png
│   └── bolo.jpg
└── produtos/
    └── bolos.html</pre>
<ul>
<li>No <code>index.html</code>: <code>src="img/bolo.jpg"</code> (entra na pasta img).</li>
<li>Em <code>produtos/bolos.html</code>: <code>src="../img/bolo.jpg"</code> (sobe uma pasta e depois entra em img).</li>
</ul>
<p>O nome tem que ser <b>idêntico</b>, inclusive a extensão e as maiúsculas: <code>Bolo.JPG</code> não é o mesmo que <code>bolo.jpg</code> na maioria dos servidores. Dica: use nomes sem espaço e sem acento, como <code>bolo-de-cenoura.jpg</code>.</p>`,
          codigo: c`<img src="img/bolo.jpg" alt="Bolo de cenoura com chocolate">`,
          pratica: [
            l("Você está no `index.html`. Complete o nome da pasta onde está a foto:", c`<img src="____/bolo.jpg" alt="Bolo">`, ["img"], "A foto está dentro da pasta `img`, então o caminho é `img/bolo.jpg`."),
            m("Na página `produtos/bolos.html`, qual `src` encontra a foto `img/bolo.jpg` da pasta de cima?", ["`../img/bolo.jpg`", "`img/bolo.jpg`", "`produtos/img/bolo.jpg`", "`bolo.jpg`"], 0, "Primeiro sobe uma pasta com `../`, depois entra em `img/`.")
          ]
        },
        {
          titulo: "Imagem de outro site: endereço absoluto, https e direitos",
          html: `<p>Também dá para mostrar uma imagem que está em <b>outro site</b>, com o endereço completo: <code>src="https://..."</code>. Aí o pedido vai para o servidor <b>daquele</b> site. Se ele apagar a foto, mudar o endereço ou bloquear, a imagem quebra na sua página. Por isso, o mais seguro é baixar e guardar no seu site (quando você tem permissão).</p>
<p><b>https x http:</b> se a sua página é <code>https://</code> (com cadeado), use imagens <code>https://</code> também. O navegador pode bloquear ou avisar “não seguro” quando a página segura busca algo em <code>http://</code>.</p>
<p><b>Direitos de uso:</b> nem toda imagem da internet pode ser usada. Use suas fotos, imagens compradas ou de bancos gratuitos (Unsplash, Pexels, Pixabay), respeitando a licença.</p>`,
          codigo: c`<img src="https://picsum.photos/400/300" alt="Foto de exemplo de um banco de imagens">`,
          pratica: [
            vf("Qualquer imagem que aparece no Google Imagens pode ser usada livremente no site de uma empresa.", false, "Imagens têm dono e licença. Use fotos próprias, compradas ou de bancos gratuitos, respeitando as regras deles."),
            m("Sua página abre com `https://` (cadeado). Qual `src` é o mais indicado para uma imagem de outro site?", ["`https://fotos.exemplo.com/loja.jpg`", "`http://fotos.exemplo.com/loja.jpg`", "`fotos.exemplo.com/loja.jpg`", "`www/loja.jpg`"], 0, "Página segura busca imagens seguras: endereço completo com `https://`.")
          ]
        },
        {
          titulo: "Endereço errado: imagem quebrada, alt e a aba Rede (F12)",
          html: `<p>Se o <code>src</code> está errado, o servidor responde “não encontrado” e aparece o ícone de <b>imagem quebrada</b>. É aí que entra o <code>alt</code> (texto alternativo): ele aparece no lugar da foto e é lido em voz alta para pessoas cegas. Descreva a imagem em poucas palavras.</p>
<p>Para <b>ver os pedidos</b> acontecendo: aperte <b>F12</b> no navegador, abra a aba <b>Rede</b> (<i>Network</i>) e atualize a página (F5). Cada linha é uma requisição, com o <b>status</b>:</p>
<ul>
<li><b>200</b> = OK, o arquivo chegou;</li>
<li><b>404</b> = não encontrado (confira o nome e a pasta!).</li>
</ul>`,
          codigo: c`<!-- nome errado: "fot.jpg" não existe -> imagem quebrada -->
<img src="img/fot.jpg" alt="Fachada da Padaria do Zé">`,
          pratica: [
            l("Complete o atributo do texto que aparece quando a imagem não carrega:", c`<img src="logo.png" ____="Logo da Padaria do Zé">`, ["alt"], "O `alt` descreve a imagem: aparece se ela quebrar e é lido pelos leitores de tela."),
            m("Na aba Rede (F12), a linha da imagem mostra status 404. O que isso quer dizer?", ["O arquivo não foi encontrado naquele endereço", "A imagem carregou certinho", "A imagem é muito grande", "O site está em manutenção"], 0, "404 = não encontrado. Confira a pasta, o nome e a extensão no `src`. O status 200 é o de sucesso.")
          ]
        },
        {
          titulo: "Tamanho e carregamento: width, height e loading=\"lazy\"",
          html: `<p><code>width</code> (largura) e <code>height</code> (altura), em pixels, avisam o tamanho da imagem <b>antes</b> de ela chegar. Assim o navegador já reserva o espaço e o texto não fica “pulando” quando a foto aparece.</p>
<p><code>loading="lazy"</code> (“preguiçoso”) faz o pedido da imagem só quando a pessoa <b>rola a página até perto dela</b>. Uma galeria com 30 fotos abre muito mais rápido assim.</p>`,
          codigo: c`<img src="img/galeria-1.jpg" alt="Mesa com cafés e pães" width="400" height="300" loading="lazy">`,
          pratica: [
            l("Complete para a imagem só ser buscada quando a pessoa rolar até ela:", c`<img src="img/foto.jpg" alt="Vitrine" loading="____">`, ["lazy"], "`loading=\"lazy\"` adia o pedido da imagem até ela estar perto de aparecer."),
            vf("Informar `width` e `height` ajuda a página a não ficar “pulando” enquanto as imagens carregam.", true, "Com o tamanho informado, o navegador reserva o espaço da imagem antes de ela chegar.")
          ]
        }
      ],
      codigo: c`<h1>Padaria do Zé</h1>

<!-- imagem do seu site (caminho relativo) -->
<img src="img/logo.png" alt="Logo da Padaria do Zé" width="120" height="120">

<!-- imagem de outro site (endereço absoluto, com https) -->
<img src="https://picsum.photos/400/300" alt="Foto de exemplo" width="400" height="300">

<!-- só carrega quando a pessoa rolar até ela -->
<img src="https://picsum.photos/400/301" alt="Outra foto de exemplo" width="400" height="300" loading="lazy">`,
      partes: [
        ['src="img/logo.png"', "Caminho relativo: o navegador pede o arquivo `logo.png` que está na pasta `img` do seu site. No sandbox ele não existe, então você vê a imagem quebrada e o `alt`."],
        ['src="https://picsum.photos/400/300"', "Endereço absoluto: o pedido vai para o servidor de outro site, que devolve uma foto."],
        ['alt="Logo da Padaria do Zé"', "Texto alternativo: aparece se a imagem não carregar e é lido para pessoas cegas."],
        ['width="400" height="300"', "Tamanho em pixels, para o navegador reservar o espaço antes da foto chegar."],
        ['loading="lazy"', "Adia o pedido da imagem até ela estar perto da tela."]
      ],
      nota: "No sandbox, aperte F12, abra a aba <b>Rede</b> e clique em executar de novo: veja o pedido de <code>img/logo.png</code> com 404 e o da foto externa com 200.",
      trabalho: `Situação de todo dia: “a foto do produto não aparece no site”. Você abre o F12, vai na aba Rede, vê o 404 e descobre que o arquivo se chama <code>Bolo.JPG</code> mas o <code>src</code> diz <code>bolo.jpg</code>. Também é comum o cliente mandar uma foto “pega do Google”: aí você explica os direitos de uso e sugere um banco de imagens gratuito.`,
      entrevista: {
        pergunta: "Por que uma imagem pode aparecer quebrada na página?",
        resposta: `Porque a requisição do <code>src</code> falhou: caminho ou nome errado (404), diferença de maiúsculas, arquivo apagado no outro site, bloqueio do outro servidor ou imagem <code>http://</code> numa página <code>https://</code>. Eu confiro na aba Rede (F12) o status do pedido. E sempre coloco <code>alt</code> para o conteúdo continuar compreensível.`
      },
      busca: ["html img src caminho relativo", "imagem quebrada html", "devtools aba rede network status 404", "imagens gratuitas para site"],
      noCss: {
        texto: `O <code>width</code> e o <code>height</code> do HTML são o tamanho “oficial”, mas a aparência final se ajusta no CSS. O mais importante: <code>max-width: 100%</code> e <code>height: auto</code> fazem a foto <b>caber no celular</b> sem distorcer.`,
        codigo: c`img {
  max-width: 100%;       /* nunca maior que a tela */
  height: auto;          /* mantém a proporção */
  display: block;        /* tira o espacinho embaixo */
}
.foto-produto {
  width: 300px;
  height: 200px;
  object-fit: cover;     /* preenche sem esticar (corta as sobras) */
  border-radius: 12px;   /* cantos arredondados */
}`
      }
    },

    // ------------------------------------------------------------ p5
    {
      titulo: "Trazendo conteúdo de outros sites",
      crianca: `Sabe a <b>janela</b> da sua casa? Por ela você vê a rua sem sair da sala. O <code>&lt;iframe&gt;</code> é uma janelinha na sua página que mostra <b>outra página</b>: um vídeo do YouTube, um mapa do Google Maps. E não é só isso: o navegador também pode <b>pedir emprestado</b> arquivos de estilo (CSS), fontes de letra e programas (JavaScript) que estão em outros endereços. Tudo isso são <b>requisições</b>, como as das imagens.`,
      passos: [
        {
          titulo: "iframe: uma janela para outra página",
          html: `<p>O <code>&lt;iframe&gt;</code> tem um <code>src</code>, igual à imagem, mas em vez de pedir uma foto, ele pede uma <b>página inteira</b> e a mostra dentro de um retângulo na sua página.</p>
<p>Coloque também um <code>title</code> dizendo o que tem ali (para leitores de tela). E atenção: muitos sites <b>não deixam</b> ser mostrados em iframe. YouTube e Google Maps deixam, desde que você use o endereço de “incorporar”.</p>`,
          codigo: c`<iframe src="https://www.youtube.com/embed/M7lc1UVf-VE" title="Vídeo de exemplo"></iframe>`,
          pratica: [
            vf("O `<iframe>` mostra uma página de outro site dentro de um retângulo na sua página.", true, "Isso! Ele é uma janela: o `src` diz qual página aparece lá dentro."),
            m("Qual atributo diz o que tem dentro do iframe, para os leitores de tela?", ["`title`", "`alt`", "`href`", "`rel`"], 0, "No iframe, a descrição vai em `title`. O `alt` é das imagens.")
          ]
        },
        {
          titulo: "Vídeo do YouTube: Compartilhar → Incorporar",
          html: `<p>No YouTube, abaixo do vídeo, clique em <b>Compartilhar</b> e depois em <b>Incorporar</b>. Ele mostra um código <code>&lt;iframe ...&gt;</code> pronto: é só copiar e colar no seu HTML.</p>
<p>Repare que o endereço é diferente do link normal: o link de assistir é <code>youtube.com/watch?v=CODIGO</code>, mas o de incorporar é <code>youtube.com/<b>embed</b>/CODIGO</code>. Com o link <code>watch</code>, o iframe não funciona.</p>`,
          codigo: c`<iframe width="560" height="315"
  src="https://www.youtube.com/embed/M7lc1UVf-VE"
  title="Receita de pão caseiro"
  allowfullscreen></iframe>`,
          pratica: [
            l("Complete o endereço de incorporar do YouTube:", c`<iframe src="https://www.youtube.com/____/M7lc1UVf-VE" title="Vídeo"></iframe>`, ["embed"], "Para iframe, o YouTube usa `/embed/` seguido do código do vídeo."),
            m("O que o atributo `allowfullscreen` permite?", ["Que a pessoa assista ao vídeo em tela cheia", "Que o vídeo comece mudo", "Que o vídeo seja baixado", "Que o vídeo abra em nova aba"], 0, "`allowfullscreen` libera o botão de tela cheia do player.")
          ]
        },
        {
          titulo: "Mapa do Google Maps",
          html: `<p>No Google Maps, procure o endereço da loja, clique em <b>Compartilhar</b> → <b>Incorporar um mapa</b> → <b>Copiar HTML</b>. Você recebe um iframe com <code>src="https://www.google.com/maps/embed?pb=..."</code> (aquele <code>pb=...</code> é um código grande, copie inteiro).</p>
<p>Ele já vem com <code>loading="lazy"</code>: o mapa só é pedido quando a pessoa rola até ele, igual às imagens.</p>`,
          codigo: c`<iframe
  src="https://www.google.com/maps/embed?pb=COLE_AQUI_O_CODIGO"
  width="400" height="300"
  title="Mapa da Padaria do Zé"
  loading="lazy"></iframe>`,
          pratica: [
            m("Onde você pega o código do mapa para colocar no site?", ["No Google Maps: Compartilhar → Incorporar um mapa → Copiar HTML", "Tirando um print do mapa", "Copiando o endereço da barra do navegador para um `<img>`", "No Bloco de Notas"], 0, "O próprio Google Maps gera o `<iframe>` pronto em Compartilhar → Incorporar."),
            vf("O `loading=\"lazy\"` também funciona no iframe: o mapa só é buscado quando a pessoa rola até ele.", true, "Sim! Igual às imagens, o pedido fica para depois e a página abre mais rápido.")
          ]
        },
        {
          titulo: "link rel=\"stylesheet\": pedindo um arquivo de CSS (e fontes)",
          html: `<p>A tag <code>&lt;link&gt;</code>, dentro do <code>&lt;head&gt;</code>, faz o navegador <b>pedir um arquivo de CSS</b> (o estilo da página). O <code>rel="stylesheet"</code> diz “isto é uma folha de estilos” e o <code>href</code> diz onde ela está: pode ser um arquivo seu (<code>css/estilo.css</code>) ou de outro site.</p>
<p>O <b>Google Fonts</b> funciona assim: você escolhe uma letra no site deles e recebe um <code>&lt;link&gt;</code> para colar. O arquivo vem de uma <b>CDN</b> (rede de servidores espalhados pelo mundo que entregam arquivos rapidinho, do servidor mais perto de você).</p>`,
          codigo: c`<head>
  <!-- arquivo de CSS do seu site -->
  <link rel="stylesheet" href="css/estilo.css">
  <!-- fonte do Google Fonts (vem de outro site) -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
</head>`,
          pratica: [
            l("Complete para a página buscar o arquivo de estilos:", c`<link rel="____" href="css/estilo.css">`, ["stylesheet"], "`rel=\"stylesheet\"` avisa que o arquivo é uma folha de estilos (CSS)."),
            m("O que é uma CDN?", ["Uma rede de servidores que entrega arquivos (fontes, CSS, JS) de forma rápida", "Um tipo de imagem", "Uma tag do HTML", "Um erro de página"], 0, "CDN é uma rede de servidores espalhados; o arquivo chega do mais próximo de você.")
          ]
        },
        {
          titulo: "script src: pedindo um arquivo de JavaScript",
          html: `<p>O JavaScript (a parte que dá “vida” à página: botões, contas, animações) costuma ficar num arquivo separado. A tag <code>&lt;script src="js/app.js"&gt;&lt;/script&gt;</code> faz o navegador <b>pedir</b> esse arquivo e rodá-lo. Diferente do <code>&lt;img&gt;</code>, ela <b>precisa</b> do <code>&lt;/script&gt;</code>.</p>
<p>Também dá para usar arquivos de uma CDN (<code>src="https://cdn.jsdelivr.net/..."</code>), mas só de lugares <b>confiáveis</b>: o código de fora roda com acesso total à sua página. No F12 → Rede, o CSS, as fontes e os scripts aparecem na lista, junto das imagens.</p>`,
          codigo: c`<body>
  <h1>Padaria do Zé</h1>
  <!-- no fim do body: a página aparece antes do script rodar -->
  <script src="js/app.js"></script>
</body>`,
          pratica: [
            m("Qual tag faz o navegador buscar e rodar um arquivo JavaScript?", ["`<script src=\"js/app.js\"></script>`", "`<link rel=\"stylesheet\" href=\"js/app.js\">`", "`<img src=\"js/app.js\">`", "`<a href=\"js/app.js\">`"], 0, "`<script src>` busca e executa o JavaScript. O `<link rel=\"stylesheet\">` é para CSS."),
            vf("A tag `<script src=\"app.js\">` pode ficar sem o `</script>`, como o `<img>`.", false, "O `<script>` sempre precisa da tag de fechar `</script>`, mesmo quando usa `src`.")
          ]
        }
      ],
      codigo: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Padaria do Zé</title>
  <!-- pedido de um arquivo de fonte para o Google Fonts (CDN) -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
  <style>
    body { font-family: "Poppins", sans-serif; }
  </style>
</head>
<body>
  <h1>Padaria do Zé</h1>

  <h2>Veja como fazemos o pão</h2>
  <iframe width="560" height="315"
    src="https://www.youtube.com/embed/M7lc1UVf-VE"
    title="Vídeo de exemplo do YouTube"
    allowfullscreen></iframe>

  <h2>Como chegar</h2>
  <iframe
    src="https://www.google.com/maps?q=Campinas&output=embed"
    width="400" height="300"
    title="Mapa de Campinas"
    loading="lazy"></iframe>
</body>
</html>`,
      partes: [
        ['<link rel="stylesheet" href="https://fonts.googleapis.com/...">', "Pede ao Google Fonts o CSS da fonte Poppins. É uma requisição, como a de uma imagem."],
        ['font-family: "Poppins", sans-serif;', "Usa a fonte que chegou. Se ela não carregar, usa uma fonte simples do computador (`sans-serif`)."],
        ['src="https://www.youtube.com/embed/..."', "Endereço de incorporar do YouTube (com `/embed/`, não `watch?v=`)."],
        ["allowfullscreen", "Permite assistir ao vídeo em tela cheia."],
        ['title="Mapa de Campinas"', "Descreve o conteúdo do iframe para leitores de tela."],
        ['loading="lazy"', "O mapa só é pedido quando a pessoa rola até ele."]
      ],
      nota: "No Google Maps de verdade, copie o iframe em Compartilhar → Incorporar um mapa. O endereço deste exemplo é uma forma simples só para testar.",
      trabalho: `Site de restaurante, clínica ou loja quase sempre tem o <b>mapa de “Como chegar”</b> e um <b>vídeo institucional</b>. Os dois são iframes copiados do Google Maps e do YouTube. E toda vez que o designer pede “usa a fonte Poppins”, você cola o <code>&lt;link&gt;</code> do Google Fonts no <code>&lt;head&gt;</code>.`,
      entrevista: {
        pergunta: "Quais tags fazem o navegador baixar arquivos de outros endereços?",
        resposta: `Várias: <code>&lt;img src&gt;</code> (imagens), <code>&lt;iframe src&gt;</code> (páginas inteiras, como vídeos e mapas), <code>&lt;link rel="stylesheet" href&gt;</code> (CSS e fontes), <code>&lt;script src&gt;</code> (JavaScript), além de <code>&lt;video&gt;</code> e <code>&lt;audio&gt;</code>. Cada uma vira uma requisição, que dá para ver na aba Rede do F12.`
      },
      busca: ["youtube incorporar vídeo iframe", "google maps incorporar mapa site", "google fonts como usar", "o que é cdn"],
      noCss: {
        texto: `O iframe vem com largura fixa (560px), que estoura no celular. No CSS você o deixa <b>responsivo</b> e sem borda. E a fonte que veio do Google Fonts só aparece quando você a usa no <code>font-family</code>:`,
        codigo: c`body {
  font-family: "Poppins", sans-serif; /* usa a fonte do Google Fonts */
}
iframe {
  width: 100%;          /* ocupa a largura disponível */
  max-width: 560px;
  height: auto;
  aspect-ratio: 16 / 9; /* formato de vídeo */
  border: 0;            /* sem borda */
  border-radius: 12px;
}`
      }
    }
  ],

  fixacao: [
    m("O que o HTML faz numa página da web?", ["Monta a estrutura: títulos, textos, links e imagens", "Guarda as senhas dos usuários", "Liga o computador", "Só muda as cores"], 0, "HTML é a estrutura (o esqueleto). As cores e tamanhos ficam com o CSS."),
    vf("A maioria das tags tem uma tag que abre e outra que fecha, com uma barra: `<p>` e `</p>`.", true, "Isso! A barra `/` indica a tag de fechar."),
    l("Complete o título principal da página:", c`<h1>Loja da Ana</____>`, ["h1"], "Fecha com o mesmo nome e uma barra: `</h1>`."),
    m("Qual tag deixa uma palavra destacada como importante?", ["`<strong>`", "`<br>`", "`<title>`", "`<img>`"], 0, "`<strong>` marca importância e aparece em negrito."),
    l("Complete o atributo que guarda o destino do link:", c`<a ____="https://www.correios.com.br">Rastrear</a>`, ["href"], "O destino do link vai no `href`."),
    m("Para um link de outro site, como deve começar o endereço?", ["`https://`", "`../`", "`#`", "`img/`"], 0, "Outros sites usam o endereço absoluto, completo, com `https://`."),
    vf("`target=\"_blank\"` faz o link abrir numa nova aba.", true, "Isso! E use junto `rel=\"noopener\"` para proteger a sua aba."),
    m("Você está em `produtos/bolos.html`. Qual `src` pega a imagem `img/bolo.jpg` da pasta de cima?", ["`../img/bolo.jpg`", "`img/bolo.jpg`", "`bolos/img.jpg`", "`#img/bolo.jpg`"], 0, "`../` sobe uma pasta; depois entra em `img/`."),
    l("Complete a tag que mostra uma imagem:", c`<img ____="img/logo.png" alt="Logo">`, ["src"], "O endereço da imagem vai no `src`; o navegador faz uma requisição para buscá-la."),
    m("Na aba Rede (F12), qual status indica que o arquivo chegou certinho?", ["200", "404", "500", "0"], 0, "200 é sucesso. 404 é não encontrado."),
    vf("O `alt` aparece no lugar da imagem quando ela não carrega.", true, "Sim, e também é lido em voz alta para pessoas cegas."),
    m("Qual tag mostra um vídeo do YouTube dentro da sua página?", ["`<iframe>`", "`<a>`", "`<h1>`", "`<strong>`"], 0, "O `<iframe>` é a janela que mostra outra página, como o player do YouTube (com `/embed/`)."),
    l("Complete para trazer um arquivo de CSS (como o do Google Fonts):", c`<link rel="stylesheet" ____="https://fonts.googleapis.com/css2?family=Poppins">`, ["href"], "No `<link>`, o endereço do arquivo vai no `href`.")
  ],

  checkpoints: {
    b1: [
      m("Na analogia da casa, qual tag é o “sótão”, onde ficam coisas que o visitante não vê (como o título da aba)?", ["`<head>`", "`<body>`", "`<p>`", "`<h1>`"], 0, "O `<head>` guarda configurações; o que aparece na tela fica no `<body>`."),
      vf("O `<meta name=\"viewport\" ...>` serve para a página não ficar minúscula no celular.", true, "Sem ele, o celular mostra a página como se fosse uma tela de computador encolhida.")
    ],
    b2: [
      m("Qual tag é a “porta mágica” que leva a outro lugar?", ["`<a>`", "`<img>`", "`<p>`", "`<h2>`"], 0, "O link `<a>` leva para outro endereço (o do `href`)."),
      l("Complete para o link abrir em nova aba com segurança:", c`<a href="https://wa.me/5511999999999" target="_blank" rel="____">WhatsApp</a>`, ["noopener", "noopener noreferrer"], "`rel=\"noopener\"` acompanha o `target=\"_blank\"` e protege a sua aba.")
    ],
    b3: [
      m("Qual lista usa números (1, 2, 3)?", ["`<ol>`", "`<ul>`", "`<li>`", "`<td>`"], 0, "`<ol>` é a lista ordenada (numerada); `<ul>` usa bolinhas."),
      vf("Na tabela, `<th>` é a célula de título e `<td>` é a célula comum de dados.", true, "Isso! `th` = cabeçalho, `td` = dado. As linhas são `<tr>`.")
    ],
    i1: [
      m("Na “ficha de cadastro”, qual tag é o nome escrito ao lado do espaço em branco?", ["`<label>`", "`<input>`", "`<button>`", "`<form>`"], 0, "O `<label>` é o rótulo do campo; o `<input>` é o espaço para digitar."),
      vf("Com `type=\"email\"` e `required`, o navegador já confere o campo sem nenhuma linha de JavaScript.", true, "O próprio navegador valida: não deixa enviar vazio nem um e-mail sem @.")
    ],
    i2: [
      m("Qual tag semântica é o “rodapé” da página?", ["`<footer>`", "`<header>`", "`<nav>`", "`<main>`"], 0, "`<footer>` é o rodapé; `<header>` é o cabeçalho e `<nav>` o menu."),
      l("Complete a tag do conteúdo principal da página:", c`<____>
  <article>...</article>
</main>`, ["main"], "`<main>` marca o conteúdo principal (só um por página).")
    ],
    i3: [
      vf("Uma imagem só decorativa deve ter `alt=\"\"` (vazio) para o leitor de tela pular.", true, "Se a imagem não traz informação, o `alt` vazio evita que o leitor fale algo inútil."),
      m("Um botão só com o ícone ✕ precisa de quê para ser acessível?", ["`aria-label=\"Fechar janela\"`", "`target=\"_blank\"`", "`loading=\"lazy\"`", "Uma cor mais forte"], 0, "O `aria-label` dá um nome ao botão para quem usa leitor de tela.")
    ],
    a1: [
      m("Quais meta tags fazem aparecer a figurinha e o resumo quando o link é compartilhado no WhatsApp?", ["As Open Graph (`og:title`, `og:image`...)", "`<meta charset>`", "`<br>`", "`<link rel=\"stylesheet\">`"], 0, "As tags `og:` são lidas pelo WhatsApp, Facebook e LinkedIn para montar a prévia."),
      vf("O `<meta name=\"description\">` é o resumo da página que o Google pode mostrar nos resultados de busca.", true, "É a “etiqueta na capa” que resume do que a página fala.")
    ],
    a2: [
      l("Complete para a imagem só carregar quando chegar perto da tela:", c`<img src="galeria-1.webp" alt="Ambiente" loading="____">`, ["lazy"], "`loading=\"lazy\"` adia o pedido da imagem."),
      m("O que o `defer` faz em `<script src=\"app.js\" defer>`?", ["Baixa sem travar a página e roda depois que o HTML foi lido", "Apaga o script", "Roda o script duas vezes", "Bloqueia a página até o script terminar"], 0, "Com `defer`, o HTML continua sendo lido e o script roda no fim, na ordem.")
    ],
    a3: [
      m("Qual elemento já vem pronto como uma “sanfona” que abre e fecha?", ["`<details>` com `<summary>`", "`<dialog>`", "`<table>`", "`<nav>`"], 0, "`<details>` abre e fecha; o `<summary>` é o texto clicável."),
      vf("Atributos como `data-preco=\"19.90\"` guardam informações para o JavaScript ler.", true, "No JS, lemos com `elemento.dataset.preco`.")
    ]
  },

  css: {
    b1: {
      texto: `A estrutura não tem aparência própria: fundo, fonte e largura da página são configurados no CSS, geralmente a partir do <code>body</code>. Ligue um arquivo com <code>&lt;link rel="stylesheet" href="estilo.css"&gt;</code> no <code>&lt;head&gt;</code>.`,
      codigo: c`body {
  margin: 0;
  font-family: system-ui, Arial, sans-serif;
  background: #fafafa;
  color: #222;
}`
    },
    b2: {
      texto: `Títulos, links e imagens ganham tamanho, cor e forma no CSS: <code>font-size</code> e <code>color</code> nos títulos; <code>color</code>, <code>text-decoration</code> e <code>:hover</code> nos links; <code>max-width: 100%</code>, <code>height: auto</code>, <code>border-radius</code> e <code>object-fit</code> nas imagens.`,
      codigo: c`h1 { font-size: 2rem; color: #8b4513; }
a { color: #0a66c2; text-decoration: none; }
a:hover { text-decoration: underline; }
img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}`
    },
    b3: {
      texto: `Tabelas e listas ficam bem mais legíveis com CSS: <code>border-collapse</code> junta as bordas das células, <code>padding</code> dá respiro, e <code>list-style</code> troca as bolinhas da lista.`,
      codigo: c`table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background: #f3f3f3; }
tbody tr:nth-child(even) { background: #fafafa; }
ul { list-style: square; padding-left: 20px; }`
    },
    i1: {
      texto: `Campos e botões de formulário são configurados no CSS: <code>padding</code> (espaço interno), <code>border</code>, <code>border-radius</code> e o <code>:focus</code> (como o campo fica quando a pessoa clica nele).`,
      codigo: c`label { display: block; margin-top: 12px; }
input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 6px;
}
input:focus { outline: 2px solid #0a66c2; border-color: #0a66c2; }
button { padding: 10px 20px; background: #0a66c2; color: white; border: 0; }`
    },
    i2: {
      texto: `As tags semânticas viram as <b>áreas do layout</b> no CSS: cabeçalho, menu em linha (<code>display: flex</code>), conteúdo e rodapé. Dá para estilizar pela própria tag, sem inventar classes.`,
      codigo: c`header { background: #222; color: white; padding: 16px; }
nav { display: flex; gap: 16px; }
nav a { color: white; }
main { max-width: 900px; margin: 0 auto; padding: 16px; }
footer { text-align: center; padding: 24px; color: #777; }`
    },
    i3: {
      texto: `Acessibilidade também é CSS: <b>contraste</b> de cores suficiente, foco visível para quem navega pelo teclado (<code>:focus-visible</code>) e nunca tirar o contorno do foco sem colocar outro no lugar.`,
      codigo: c`body { color: #222; background: #fff; } /* bom contraste */
a:focus-visible, button:focus-visible {
  outline: 3px solid #ffbf47;
  outline-offset: 2px;
}
/* texto só para leitor de tela */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }`
    },
    a1: {
      texto: `As meta tags não aparecem na página, mas o CSS influencia o SEO indiretamente: texto legível no celular (<code>font-size</code>), botões com tamanho bom para o dedo e layout responsivo com <code>@media</code>.`,
      codigo: c`body { font-size: 16px; line-height: 1.5; }
a, button { min-height: 44px; } /* fácil de tocar no celular */
@media (max-width: 600px) {
  h1 { font-size: 1.6rem; }
}`
    },
    a2: {
      texto: `Para carregar rápido, o CSS ajuda reservando o espaço das imagens (<code>aspect-ratio</code>), deixando-as responsivas e mostrando o texto enquanto a fonte chega (<code>font-display: swap</code>, que no Google Fonts vem no <code>&amp;display=swap</code>).`,
      codigo: c`img {
  max-width: 100%;
  height: auto;
  aspect-ratio: 4 / 3; /* reserva o espaço antes de carregar */
}
@font-face {
  font-family: "Minha Fonte";
  src: url("fonte.woff2") format("woff2");
  font-display: swap; /* mostra o texto enquanto a fonte chega */
}`
    },
    a3: {
      texto: `O <code>&lt;details&gt;</code> e o <code>&lt;dialog&gt;</code> já funcionam sozinhos, e o CSS dá o acabamento: o <code>[open]</code> estiliza a sanfona aberta e o <code>::backdrop</code> escurece o fundo atrás do modal.`,
      codigo: c`details { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
details[open] summary { font-weight: bold; }
summary { cursor: pointer; }
dialog { border: 0; border-radius: 12px; padding: 24px; }
dialog::backdrop { background: rgba(0, 0, 0, 0.5); }`
    }
  }
};
