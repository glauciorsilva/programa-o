// Nível Iniciante da trilha css: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é CSS, ligá-lo a uma página HTML e mudar cores, fundos, tamanho de letra e espaços dos elementos.",
  topicos: [
    /* ------------------------------------------------------------ p1 */
    {
      titulo: "O que é CSS e como ligar ao HTML",
      crianca: `Pense na página como uma pessoa. O <b>HTML</b> é o corpo: diz o que existe ali (um título, um parágrafo, uma imagem). O <b>CSS</b> é a <b>roupa</b>: diz como cada coisa vai aparecer (cor, tamanho, espaço). A mesma página pode estar “sem roupa” (só HTML, toda preta e branca) ou “com roupa” (com CSS, colorida e arrumada). O conteúdo é o mesmo; só a aparência muda.`,
      passos: [
        {
          titulo: "HTML é o conteúdo, CSS é a aparência",
          html: `<p>Veja esta página da padaria. Ela só tem HTML: um título (<code>&lt;h1&gt;</code>) e um parágrafo (<code>&lt;p&gt;</code>). O navegador mostra tudo com letra preta, fundo branco e o tamanho padrão. Funciona, mas é sem graça: é a página <b>“sem roupa”</b>.</p>
<p><b>CSS</b> quer dizer <i>Cascading Style Sheets</i>, ou “folhas de estilo”. Estilo é a aparência. O CSS <b>não escreve</b> textos novos: ele só muda o jeito que os textos do HTML aparecem.</p>`,
          codigo: c`<!-- página sem roupa: só HTML -->
<h1>Padaria Pão Quente</h1>
<p>Pão francês fresquinho todo dia.</p>`,
          pratica: [
            m("Qual é o trabalho do CSS numa página?", ["Cuidar da aparência: cores, tamanhos e espaços", "Escrever os textos da página", "Guardar os dados dos clientes", "Ligar o computador na internet"], 0, "O HTML diz o que existe na página; o CSS diz como aparece."),
            vf("Sem CSS, a página não abre no navegador.", false, "Abre sim! Ela só aparece com o visual padrão do navegador (letra preta, fundo branco). O CSS é a roupa, não o corpo.")
          ]
        },
        {
          titulo: "Primeiro jeito: a tag <style> dentro do <head>",
          html: `<p>O jeito mais rápido de colocar CSS é escrever dentro da tag <code>&lt;style&gt;</code>, que fica no <code>&lt;head&gt;</code> da página (a parte “de bastidores”, que não aparece na tela).</p>
<p>No exemplo, a linha <code>h1 { color: blue; }</code> quer dizer: “todos os <code>&lt;h1&gt;</code> ficam com a letra azul”. Repare que o HTML do título <b>não mudou nada</b>: quem pintou foi o CSS. Agora a página está <b>“com roupa”</b>.</p>`,
          codigo: c`<html>
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>
<body>
  <h1>Padaria Pão Quente</h1>
  <p>Pão francês fresquinho todo dia.</p>
</body>
</html>`,
          pratica: [
            l("Complete o nome da tag onde o CSS pode ser escrito dentro da página:", c`<head>
  <____>
    h1 { color: blue; }
  </style>
</head>`, ["style"], "A tag é `<style>` (estilo, em inglês). Ela abre com `<style>` e fecha com `</style>`."),
            m("Em qual parte da página fica a tag `<style>`?", ["Dentro do `<head>`", "Dentro do `<h1>`", "Depois do `</html>`", "Dentro do `<p>`"], 0, "O `<style>` fica no `<head>`, a parte de configurações da página.")
          ]
        },
        {
          titulo: "Segundo jeito: um arquivo separado com <link>",
          html: `<p>O jeito mais usado no dia a dia é guardar o CSS num <b>arquivo só dele</b>, com final <code>.css</code>, por exemplo <code>estilo.css</code>. No HTML, dentro do <code>&lt;head&gt;</code>, você coloca a tag <code>&lt;link&gt;</code>.</p>
<p>A tag <code>&lt;link&gt;</code> é um <b>aviso</b> para o navegador: “vá buscar o arquivo <code>estilo.css</code> e use as regras dele nesta página”. O <code>rel="stylesheet"</code> diz que o arquivo é uma folha de estilo, e o <code>href</code> diz <b>onde</b> o arquivo está (o nome dele).</p>`,
          codigo: c`<!-- index.html -->
<head>
  <link rel="stylesheet" href="estilo.css">
</head>

/* estilo.css (outro arquivo, na mesma pasta) */
h1 { color: blue; }`,
          pratica: [
            m("O que o navegador faz quando encontra `<link rel=\"stylesheet\" href=\"estilo.css\">`?", ["Busca o arquivo estilo.css e aplica as regras dele na página", "Mostra a palavra estilo.css na tela", "Apaga o CSS da página", "Abre uma nova aba"], 0, "O `<link>` manda o navegador buscar o arquivo indicado no `href` e usar o CSS que está lá."),
            l("Complete o atributo que diz qual é o arquivo de CSS:", c`<link rel="stylesheet" ____="estilo.css">`, ["href"], "O `href` guarda o endereço (o nome) do arquivo que o navegador vai buscar.")
          ]
        },
        {
          titulo: "Por que um arquivo separado é melhor",
          html: `<p>Um site de loja tem várias páginas: início, produtos, contato. Se todas tiverem o mesmo <code>&lt;link href="estilo.css"&gt;</code>, todas usam <b>a mesma roupa</b>. Quer trocar a cor dos títulos do site inteiro? Muda <b>uma linha</b> em <code>estilo.css</code> e pronto.</p>
<p>Dica: se o CSS “não funcionar”, confira se o nome no <code>href</code> é <b>igual</b> ao nome do arquivo (letra por letra) e se os dois estão na mesma pasta. Se o nome estiver errado, o navegador não acha o arquivo e a página fica “sem roupa”.</p>`,
          pratica: [
            vf("Várias páginas podem usar o mesmo arquivo `estilo.css`.", true, "Sim! Basta cada página ter o `<link>` apontando para ele. Assim o site inteiro fica com a mesma aparência."),
            m("O arquivo se chama `estilo.css`, mas o HTML tem `href=\"estilos.css\"`. O que acontece?", ["O navegador não encontra o arquivo e a página fica sem o estilo", "Funciona normalmente", "O navegador corrige o nome sozinho", "A página fica em branco"], 0, "O nome precisa ser igual, letra por letra. Com um `s` a mais, o navegador procura um arquivo que não existe.")
          ]
        }
      ],
      codigo: c`/* estilo.css — a roupa da página da padaria */
body { background-color: lightyellow; }
h1 { color: brown; }
p { color: gray; }`,
      sandbox: {
        html: c`<h1>Padaria Pão Quente</h1>
<p>Pão francês fresquinho todo dia.</p>
<p>Aberto de segunda a sábado, das 6h às 20h.</p>`
      },
      partes: [
        ["/* estilo.css ... */", "Comentário: tudo entre `/*` e `*/` é só anotação. O navegador ignora."],
        ["body { background-color: lightyellow; }", "O `body` é a página inteira: o fundo dela fica amarelo-clarinho."],
        ["h1 { color: brown; }", "Todo título `<h1>` do HTML fica com a letra marrom."],
        ["p { color: gray; }", "Todos os parágrafos `<p>` ficam com a letra cinza."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b>: o HTML da padaria já está lá. Apague as regras de CSS para ver a página “sem roupa” e depois volte com elas.",
      trabalho: `Em quase toda empresa o site tem um arquivo de CSS principal (às vezes chamado <code>style.css</code> ou <code>main.css</code>) ligado em todas as páginas com <code>&lt;link&gt;</code>. Quando a marca troca de cor, quem cuida do site muda esse arquivo e o site inteiro muda junto.`,
      entrevista: {
        pergunta: "Quais são as formas de colocar CSS numa página HTML?",
        resposta: `Três: num <b>arquivo externo</b> ligado com <code>&lt;link rel="stylesheet" href="..."&gt;</code> (o mais recomendado, porque várias páginas reaproveitam), na tag <code>&lt;style&gt;</code> dentro do <code>&lt;head&gt;</code>, e direto no atributo <code>style="..."</code> de uma tag (inline, que deve ser evitado porque mistura conteúdo e aparência).`
      },
      busca: ["o que é css para iniciantes", "como ligar css no html link", "tag style html"]
    },

    /* ------------------------------------------------------------ p2 */
    {
      titulo: "Seletor, propriedade e valor",
      crianca: `Uma regra de CSS é como um <b>bilhete de ordem</b>: “<i>Para</i> todos os títulos: <i>cor</i> = vermelha.” Primeiro vem <b>para quem</b> é a ordem (o <b>seletor</b>), depois <b>o que mudar</b> (a <b>propriedade</b>) e <b>como vai ficar</b> (o <b>valor</b>).`,
      passos: [
        {
          titulo: "O seletor: para quem é a ordem",
          html: `<p>O <b>seletor</b> é a primeira palavra da regra. Ele escolhe <b>quais elementos do HTML</b> vão mudar. O jeito mais simples é usar o <b>nome da tag</b>, sem os sinais <code>&lt; &gt;</code>.</p>
<p>Se o HTML tem <code>&lt;h1&gt;Cardápio&lt;/h1&gt;</code>, o seletor é <code>h1</code>. Se tem <code>&lt;p&gt;</code>, o seletor é <code>p</code>. A regra vale para <b>todos</b> os elementos daquela tag.</p>`,
          codigo: c`h1 { color: red; }   /* vale para todos os <h1> */
p  { color: green; } /* vale para todos os <p> */`,
          pratica: [
            m("Na regra `h1 { color: red; }`, qual parte é o seletor?", ["`h1`", "`color`", "`red`", "`;`"], 0, "O seletor vem primeiro e diz quem recebe a ordem: aqui, os títulos `h1`."),
            l("O HTML tem `<p>Pão de queijo</p>`. Complete o seletor para pintar esse parágrafo:", c`____ { color: orange; }`, ["p"], "Para pegar a tag `<p>`, o seletor é só o nome dela: `p` (sem `<` e `>`).")
          ]
        },
        {
          titulo: "A propriedade e o valor",
          html: `<p>Dentro das chaves vem a ordem em si: <b>propriedade</b>, dois-pontos e <b>valor</b>. A <b>propriedade</b> é o que você quer mudar (por exemplo, <code>color</code> = cor da letra). O <b>valor</b> é como vai ficar (por exemplo, <code>red</code> = vermelho).</p>
<p>Os nomes das propriedades são em <b>inglês</b> e escritos sempre do mesmo jeito: <code>color</code>, e não <code>cor</code>.</p>`,
          codigo: c`h1 {
  color: red;
/* ↑       ↑
   propriedade: valor; */
}`,
          pratica: [
            m("Em `color: red;`, o que é `red`?", ["O valor (como vai ficar)", "O seletor", "A propriedade", "O nome do arquivo"], 0, "Antes dos dois-pontos vem a propriedade (`color`); depois, o valor (`red`)."),
            vf("Posso escrever `cor: red;` em vez de `color: red;`.", false, "As propriedades têm nomes fixos, em inglês. O navegador não conhece `cor` e ignora a linha.")
          ]
        },
        {
          titulo: "As chaves { } e o ponto e vírgula ;",
          html: `<p>As <b>chaves</b> <code>{ }</code> são como uma caixinha: tudo que está dentro delas vale para o seletor que vem antes. Toda chave que abre <code>{</code> precisa fechar <code>}</code>.</p>
<p>O <b>ponto e vírgula</b> <code>;</code> termina cada ordem, como o ponto final de uma frase. Com ele você pode colocar <b>várias ordens</b> para o mesmo seletor, uma em cada linha.</p>`,
          codigo: c`h1 {
  color: red;
  background-color: yellow;
}`,
          pratica: [
            l("Complete com o sinal que termina cada ordem:", c`h1 {
  color: red____
  background-color: yellow;
}`, [";"], "O `;` termina cada declaração. Sem ele, a próxima linha se mistura com a anterior e para de funcionar."),
            m("Qual símbolo abre a caixinha de ordens de um seletor?", ["`{`", "`(`", "`[`", "`<`"], 0, "As ordens de um seletor ficam entre chaves: `{` abre e `}` fecha.")
          ]
        },
        {
          titulo: "Quando uma regra não funciona",
          html: `<p>O navegador é educado: quando encontra algo que não entende, ele <b>ignora</b> aquela parte e segue em frente, sem mostrar erro. Por isso, se uma cor não aparecer, confira:</p>
<ul><li>o seletor tem o mesmo nome da tag do HTML?</li><li>a propriedade está escrita certinho (<code>color</code>)?</li><li>tem <code>:</code> entre propriedade e valor e <code>;</code> no final?</li><li>as chaves abriram e fecharam?</li></ul>`,
          codigo: c`/* com erro: faltou o ; depois de red */
h1 { color: red background-color: yellow; }

/* certo */
h1 { color: red; background-color: yellow; }`,
          pratica: [
            vf("Quando o CSS tem um erro, o navegador mostra uma mensagem vermelha na página.", false, "Não mostra nada: ele só ignora a parte que não entendeu. Por isso é preciso conferir com calma o seletor, os `:`, os `;` e as chaves.")
          ]
        }
      ],
      codigo: c`h1 {
  color: darkred;
}

p {
  color: gray;
}

li {
  color: darkgreen;
}`,
      sandbox: {
        html: c`<h1>Cardápio da Lanchonete</h1>
<p>Escolha seu lanche favorito:</p>
<ul>
  <li>X-salada</li>
  <li>Misto quente</li>
  <li>Pão de queijo</li>
</ul>`
      },
      partes: [
        ["h1 {", "Seletor `h1`: a ordem vale para o título `<h1>` do cardápio. A chave `{` abre a caixinha de ordens."],
        ["color: darkred;", "Propriedade `color` (cor da letra) com o valor `darkred` (vermelho-escuro). O `;` termina a ordem."],
        ["}", "Fecha a caixinha do `h1`."],
        ["p { color: gray; }", "Todos os parágrafos `<p>` ficam com letra cinza."],
        ["li { color: darkgreen; }", "Cada item da lista (`<li>`) fica verde-escuro."]
      ],
      nota: "No sandbox, troque <code>li</code> por <code>p</code> e veja quem muda de cor.",
      trabalho: `Ler e escrever regras de CSS é o pão de cada dia de quem mexe com sites. Quando alguém pede “deixe os títulos da página de produtos vermelhos”, você pensa: seletor = os títulos, propriedade = <code>color</code>, valor = vermelho.`,
      entrevista: {
        pergunta: "Quais são as partes de uma regra de CSS?",
        resposta: `O <b>seletor</b> (quem recebe o estilo) e o <b>bloco de declarações</b> entre chaves. Cada declaração tem uma <b>propriedade</b> e um <b>valor</b>, separados por <code>:</code> e terminados por <code>;</code>. Exemplo: <code>h1 { color: red; }</code>.`
      },
      busca: ["sintaxe css seletor propriedade valor", "regra css para iniciantes", "seletor de tag css"]
    },

    /* ------------------------------------------------------------ p3 */
    {
      titulo: "Cores e fundos",
      crianca: `Colorir uma página é como pintar um <b>desenho de colorir</b>: você escolhe a cor do <b>traço</b> (a letra) e a cor do <b>fundo</b> de cada parte. Para dizer qual cor quer, dá para usar o <b>nome</b> da cor, como no estojo de lápis, ou um <b>código</b>, como o número de uma tinta na loja.`,
      passos: [
        {
          titulo: "Cor da letra com color",
          html: `<p>A propriedade <code>color</code> muda a <b>cor do texto</b>. O jeito mais fácil é usar o nome da cor em inglês: <code>red</code> (vermelho), <code>blue</code> (azul), <code>green</code> (verde), <code>black</code> (preto), <code>white</code> (branco), <code>orange</code> (laranja), <code>purple</code> (roxo), <code>gray</code> (cinza).</p>`,
          codigo: c`h1 { color: purple; }
p  { color: gray; }`,
          pratica: [
            m("Qual valor deixa a letra azul?", ["`blue`", "`azul`", "`red`", "`#azul`"], 0, "Os nomes de cores são em inglês: azul é `blue`."),
            l("Complete para deixar a letra do parágrafo verde:", c`p { color: ____; }`, ["green"], "Verde, em inglês, é `green`.")
          ]
        },
        {
          titulo: "Cor do fundo com background-color",
          html: `<p>A propriedade <code>background-color</code> muda a <b>cor do fundo</b> (o “papel” atrás do texto). <i>Background</i> quer dizer “fundo”.</p>
<p>Use no <code>body</code> para pintar a página inteira, ou numa tag específica para pintar só ela. Cuidado com o <b>contraste</b>: letra clara em fundo claro fica difícil de ler.</p>`,
          codigo: c`body { background-color: lightyellow; }
h1 {
  color: white;
  background-color: darkblue;
}`,
          pratica: [
            m("Qual propriedade muda a cor do FUNDO?", ["`background-color`", "`color`", "`font-color`", "`fundo`"], 0, "`color` é a cor da letra; `background-color` é a cor do fundo."),
            vf("`h1 { color: yellow; }` deixa o fundo do título amarelo.", false, "`color` muda só a cor da letra. Para o fundo, use `background-color: yellow;`.")
          ]
        },
        {
          titulo: "Cores com código: o #hex",
          html: `<p>Os nomes de cores são poucos. Para escolher <b>qualquer</b> tom (como o verde exato da marca da loja), usamos o código <b>hexadecimal</b>: começa com <code>#</code> e tem 6 letras ou números, como <code>#16a34a</code>.</p>
<p>Você não precisa decorar: copie o código de um <b>seletor de cores</b> (pesquise “color picker” no Google) ou do material da marca. Exemplos: <code>#000000</code> é preto, <code>#ffffff</code> é branco, <code>#ff0000</code> é vermelho.</p>`,
          codigo: c`h1 { color: #16a34a; }              /* verde da marca */
body { background-color: #f1f5f9; }  /* cinza bem clarinho */`,
          pratica: [
            l("Complete o símbolo que começa todo código de cor hexadecimal:", c`h1 { color: ____ff0000; }`, ["#"], "Todo código hex começa com `#`, seguido de 6 letras/números."),
            m("Qual destes é um código hex válido?", ["`#1e3a8a`", "`1e3a8a#`", "`#azul`", "`hex(1e3a8a)`"], 0, "Um código hex é `#` + 6 caracteres de 0 a 9 e de a até f: `#1e3a8a`.")
          ]
        },
        {
          titulo: "Juntando letra e fundo",
          html: `<p>Um mesmo seletor pode receber as duas coisas: cor da letra e cor do fundo. É assim que se faz uma <b>faixa</b> de aviso, por exemplo: fundo vermelho e letra branca.</p>
<p>Lembre: cada ordem termina com <code>;</code>, e as duas ficam dentro das mesmas chaves.</p>`,
          codigo: c`h2 {
  color: white;
  background-color: #dc2626;
}`,
          pratica: [
            m("Quero um título com letra branca em fundo preto. Qual regra faz isso?", ["`h1 { color: white; background-color: black; }`", "`h1 { color: black; background-color: white; }`", "`h1 { background: white; color: white; }`", "`h1 { white: black; }`"], 0, "`color` é a letra (branca) e `background-color` é o fundo (preto).")
          ]
        }
      ],
      codigo: c`body {
  background-color: #fff7ed;
}

h1 {
  color: white;
  background-color: #c2410c;
}

p {
  color: #431407;
}`,
      sandbox: {
        html: c`<h1>Pizzaria Forno a Lenha</h1>
<p>Pizza de mussarela: R$ 45,00</p>
<p>Pizza de calabresa: R$ 48,00</p>`
      },
      partes: [
        ["body { background-color: #fff7ed; }", "Pinta o fundo da página inteira de um creme bem clarinho."],
        ["h1 {", "Começa as ordens do título `<h1>`."],
        ["color: white;", "A letra do título fica branca, usando o nome da cor."],
        ["background-color: #c2410c;", "O fundo do título fica laranja-escuro (cor por código hex). Letra branca em fundo escuro: bom contraste."],
        ["p { color: #431407; }", "Os preços (`<p>`) ficam marrom-escuro, fácil de ler no fundo claro."]
      ],
      nota: "No sandbox, troque <code>#c2410c</code> por <code>green</code> e veja a faixa do título mudar.",
      trabalho: `O time de design entrega um “guia da marca” com as cores em hex, por exemplo “azul principal <code>#1d4ed8</code>”. Seu trabalho é copiar esses códigos para o CSS. Conferir o <b>contraste</b> (letra bem visível no fundo) também é obrigatório para pessoas com baixa visão.`,
      entrevista: {
        pergunta: "Qual a diferença entre color e background-color?",
        resposta: `<code>color</code> define a cor do <b>texto</b> do elemento. <code>background-color</code> define a cor do <b>fundo</b> da caixa do elemento. Os valores podem ser nomes (<code>red</code>), códigos hex (<code>#ff0000</code>) ou <code>rgb(255, 0, 0)</code>.`
      },
      busca: ["nomes de cores css", "css cor hexadecimal", "color picker online", "contraste de cores acessibilidade"]
    },

    /* ------------------------------------------------------------ p4 */
    {
      titulo: "Tamanho de letra e espaços",
      crianca: `Arrumar uma página é como arrumar uma <b>vitrine de loja</b>: os nomes dos produtos precisam ter um tamanho bom para ler, e eles não podem ficar grudados uns nos outros. No CSS, <code>font-size</code> muda o <b>tamanho da letra</b>, <code>padding</code> é o espaço <b>de dentro</b> (como o enchimento de uma almofada) e <code>margin</code> é o espaço <b>de fora</b> (a distância até o vizinho).`,
      passos: [
        {
          titulo: "Tamanho da letra com font-size",
          html: `<p>A propriedade <code>font-size</code> muda o <b>tamanho da letra</b>. O valor mais simples é em <b>pixels</b> (<code>px</code>), que são os pontinhos da tela. O texto normal do navegador tem <code>16px</code>.</p>
<p>Escreva o número <b>grudado</b> no <code>px</code>, sem espaço: <code>20px</code>.</p>`,
          codigo: c`h1 { font-size: 40px; } /* bem grande */
p  { font-size: 18px; } /* um pouco maior que o normal */`,
          pratica: [
            m("Qual propriedade muda o tamanho da letra?", ["`font-size`", "`color`", "`text-big`", "`size-letter`"], 0, "Font é letra e size é tamanho: `font-size`."),
            l("Complete para deixar o parágrafo com letra de 20 pixels:", c`p { font-size: 20____; }`, ["px"], "Pixels se escrevem `px`, grudado no número: `20px`.")
          ]
        },
        {
          titulo: "Espaço de dentro: padding",
          html: `<p>O <code>padding</code> é o espaço <b>entre o texto e a borda</b> do próprio elemento. Fica fácil de ver quando o elemento tem cor de fundo: com <code>padding</code>, o fundo “cresce” em volta do texto e ele para de ficar espremido.</p>`,
          codigo: c`h1 {
  background-color: gold;
  padding: 20px; /* 20px de espaço em volta do texto, por dentro */
}`,
          pratica: [
            m("Um aviso com fundo amarelo está com o texto grudado na beirada do fundo. O que resolve?", ["`padding`", "`color`", "`font-size`", "`background-color`"], 0, "O `padding` coloca espaço dentro da caixa, entre o texto e a beirada.")
          ]
        },
        {
          titulo: "Espaço de fora: margin",
          html: `<p>A <code>margin</code> (margem) é o espaço <b>do lado de fora</b> do elemento: a distância até o que está em volta. Ela é transparente (não pega a cor de fundo).</p>
<p>Use para <b>afastar</b> um elemento do outro, como dar distância entre dois produtos da vitrine.</p>`,
          codigo: c`p {
  background-color: lightblue;
  padding: 10px; /* dentro: o fundo azul cresce */
  margin: 30px;  /* fora: afasta dos vizinhos */
}`,
          pratica: [
            vf("A `margin` é o espaço de fora, que afasta o elemento dos vizinhos.", true, "Isso mesmo: `margin` = fora; `padding` = dentro."),
            l("Complete para afastar cada produto 24px dos outros:", c`.produto { ____: 24px; }`, ["margin"], "Espaço do lado de fora, entre um elemento e outro, é `margin`.")
          ]
        },
        {
          titulo: "Padding ou margin? Um jeito de lembrar",
          html: `<p>Pense numa <b>foto num porta-retrato</b>: o <code>padding</code> é o <b>paspatur</b> (a moldurinha de papel entre a foto e a borda), e faz parte do quadro. A <code>margin</code> é o <b>espaço na parede</b> entre um quadro e outro.</p>
<p>No nível Básico você vai ver isso com mais detalhes, no tópico <b>Box model</b>, junto com a borda.</p>`,
          pratica: [
            m("Os botões “Comprar” e “Voltar” estão grudados um no outro. Qual propriedade afasta um do outro?", ["`margin`", "`padding`", "`font-size`", "`color`"], 0, "Para afastar elementos entre si, use `margin` (o espaço na parede entre os quadros).")
          ]
        }
      ],
      codigo: c`h1 {
  font-size: 32px;
  background-color: #fde68a;
  padding: 16px;
}

p {
  font-size: 18px;
  background-color: #e0f2fe;
  padding: 12px;
  margin: 20px;
}`,
      sandbox: {
        html: c`<h1>Promoções da Semana</h1>
<p>Arroz 5 kg — R$ 24,90</p>
<p>Feijão 1 kg — R$ 7,50</p>
<p>Café 500 g — R$ 16,90</p>`
      },
      partes: [
        ["font-size: 32px;", "O título fica com letra de 32 pixels, o dobro do texto normal."],
        ["background-color: #fde68a;", "Fundo amarelo-claro no título, para dar para ver o espaço do padding."],
        ["padding: 16px;", "16px de espaço por dentro, entre o texto do título e a beirada do fundo amarelo."],
        ["font-size: 18px;", "Os produtos (`<p>`) ficam com letra um pouco maior que o normal."],
        ["margin: 20px;", "20px de espaço por fora de cada produto: eles se afastam uns dos outros e da beirada da página."]
      ],
      nota: "No sandbox, mude o <code>margin</code> para <code>0</code> e veja os produtos ficarem grudados.",
      trabalho: `Pedidos como “aumenta a letra do preço”, “dá um respiro entre os cards” ou “o botão está apertado” aparecem toda semana. As respostas quase sempre são <code>font-size</code>, <code>margin</code> e <code>padding</code>.`,
      entrevista: {
        pergunta: "Qual a diferença entre margin e padding?",
        resposta: `O <code>padding</code> é o espaço <b>interno</b>, entre o conteúdo e a borda do elemento, e fica com a cor de fundo do elemento. A <code>margin</code> é o espaço <b>externo</b>, entre a borda e os elementos vizinhos, e é sempre transparente.`
      },
      busca: ["css font-size px", "diferença margin e padding", "css espaçamento iniciante"]
    }
  ],

  fixacao: [
    m("Na comparação com uma pessoa, o CSS é...", ["A roupa (a aparência)", "O corpo (o conteúdo)", "O nome da pessoa", "O endereço da casa"], 0, "O HTML é o corpo/conteúdo e o CSS é a roupa/aparência."),
    l("Complete o valor do `rel` para ligar um arquivo de CSS:", c`<link rel="____" href="estilo.css">`, ["stylesheet"], "`rel=\"stylesheet\"` avisa que o arquivo é uma folha de estilo."),
    vf("A tag `<link>` do CSS fica dentro do `<head>`.", true, "Sim: `<link>` e `<style>` ficam no `<head>`, a parte de configurações da página."),
    m("Qual é o final do nome de um arquivo de CSS?", ["`.css`", "`.html`", "`.txt`", "`.style`"], 0, "Arquivos de CSS terminam com `.css`, como `estilo.css`."),
    m("Em `p { color: gray; }`, qual é a propriedade?", ["`color`", "`p`", "`gray`", "`{`"], 0, "A propriedade vem antes dos dois-pontos: `color`."),
    l("Complete o sinal que separa a propriedade do valor:", c`h1 { color____ blue; }`, [":"], "Entre propriedade e valor vão os dois-pontos: `color: blue;`."),
    vf("O seletor `h1` muda todos os títulos `<h1>` da página.", true, "Um seletor de tag vale para todos os elementos daquela tag."),
    m("Qual regra deixa o fundo da página inteira cinza-claro?", ["`body { background-color: lightgray; }`", "`body { color: lightgray; }`", "`page { background: cinza; }`", "`h1 { background-color: lightgray; }`"], 0, "O `body` representa a página toda, e o fundo é `background-color`."),
    m("O que é `#ffffff`?", ["Um código de cor (branco)", "Um seletor de id", "Um tamanho de letra", "Um comentário"], 0, "`#` seguido de 6 caracteres é uma cor em hexadecimal; `#ffffff` é branco."),
    l("Complete para o título ficar com letra de 36 pixels:", c`h1 { ____: 36px; }`, ["font-size"], "`font-size` é a propriedade do tamanho da letra."),
    vf("O `padding` é o espaço de fora, entre um elemento e o outro.", false, "É o contrário: `padding` é o espaço de dentro; o de fora é `margin`."),
    m("Qual destas regras está escrita CERTO?", ["`p { color: red; font-size: 18px; }`", "`p ( color: red; )`", "`p { color red }`", "`<p> { color: red; }`"], 0, "Seletor, chaves, e cada `propriedade: valor;` terminando com ponto e vírgula.")
  ],

  checkpoints: {
    b1: [
      m("Qual seletor pega os elementos com `class=\"botao-comprar\"`?", ["`.botao-comprar`", "`#botao-comprar`", "`botao-comprar`", "`<botao-comprar>`"], 0, "Seletor de classe começa com ponto: `.botao-comprar`."),
      m("O que faz a regra `.botao-comprar:hover { background: #15803d; }`?", ["Muda o fundo quando o mouse passa em cima do botão", "Esconde o botão", "Muda o fundo só quando a página carrega", "Muda o texto do botão"], 0, "`:hover` é o estado “mouse em cima”: a regra só vale nesse momento.")
    ],
    b2: [
      vf("No box model, o `padding` fica entre o conteúdo e a borda.", true, "De dentro para fora: conteúdo, padding, borda e margem."),
      l("Complete para que o `width` já inclua o padding e a borda:", c`* { box-sizing: ____; }`, ["border-box"], "Com `box-sizing: border-box`, a largura informada já conta padding e borda.")
    ],
    b3: [
      m("Qual unidade cresce junto com o tamanho de letra que a pessoa escolheu no celular?", ["`rem`", "`px`", "`#`", "`deg`"], 0, "`rem` é relativo à fonte da raiz, que respeita a configuração do usuário. `px` é fixo."),
      m("Em `font-family: \"Inter\", system-ui, sans-serif;`, para que serve o `sans-serif` no fim?", ["É a reserva: usada se as fontes anteriores não existirem", "Deixa o texto em negrito", "Baixa a fonte Inter", "Aumenta o tamanho da letra"], 0, "A lista é tentada em ordem; a família genérica no fim garante que sempre haverá uma fonte.")
    ],
    i1: [
      vf("O `display: flex` é colocado no elemento pai, e os filhos é que ficam lado a lado.", true, "O pai vira o contêiner flex e organiza seus filhos diretos."),
      l("Complete para centralizar os itens na vertical (eixo cruzado):", c`.menu { display: flex; ____: center; }`, ["align-items"], "`align-items` alinha no eixo cruzado; `justify-content`, no principal.")
    ],
    i2: [
      m("Qual é a principal diferença entre Grid e Flexbox?", ["Grid organiza linhas e colunas ao mesmo tempo; Flexbox, uma direção só", "Grid só funciona no celular", "Flexbox não consegue alinhar itens", "Não há diferença"], 0, "Flexbox é uma fila (1 dimensão); Grid é um tabuleiro (2 dimensões)."),
      m("O que `grid-template-columns: 240px 1fr;` cria?", ["Duas colunas: uma fixa de 240px e outra com o espaço que sobra", "240 colunas iguais", "Uma linha de 240px", "Duas linhas de altura igual"], 0, "Cada valor é uma coluna; `1fr` é uma fração do espaço livre.")
    ],
    i3: [
      vf("No mobile first, o CSS sem `@media` vale para o celular, e o `@media (min-width: ...)` acrescenta ajustes para telas maiores.", true, "É isso: começa pelo celular e vai adicionando para telas maiores."),
      l("Complete para que as imagens nunca fiquem mais largas que o espaço delas:", c`img { ____: 100%; height: auto; }`, ["max-width"], "`max-width: 100%` impede a imagem de estourar o contêiner.")
    ],
    a1: [
      m("Como se lê o valor de uma variável CSS chamada `--fundo`?", ["`var(--fundo)`", "`$fundo`", "`--fundo()`", "`get(fundo)`"], 0, "Declara com `--nome: valor;` e lê com `var(--nome)`."),
      vf("Variáveis declaradas em `:root` valem para a página toda.", true, "`:root` representa a tag `<html>`, o topo da página; tudo herda dali.")
    ],
    a2: [
      m("Para que serve `transition` no CSS?", ["Deixar suave a mudança entre dois estados, como ao passar o mouse", "Trocar de página", "Carregar uma fonte", "Criar uma variável"], 0, "A transição faz a mudança acontecer aos poucos, em vez de “teletransportar”."),
      l("Complete para a animação `girar` repetir para sempre:", c`.carregando { animation: girar 1s linear ____; }`, ["infinite"], "`infinite` faz a animação repetir sem parar, como num spinner.")
    ],
    a3: [
      m("Qual destes seletores tem MAIS força (especificidade)?", ["`#menu`", "`.menu`", "`nav`", "`a`"], 0, "id vence classe, que vence tag."),
      m("No padrão BEM, o que indica `.card__botao--destaque`?", ["Uma variação (modificador) do botão que faz parte do card", "Um id chamado card", "Dois cards diferentes", "Um erro de digitação"], 0, "Bloco `card`, elemento `__botao` e modificador `--destaque`.")
    ]
  }
};
