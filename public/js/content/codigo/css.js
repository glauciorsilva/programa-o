// Exercícios de código da trilha css (completar e criar do zero), por tópico.
const c = String.raw;

// Funções de apoio usadas nos testes: lêem as regras do CSS do aluno (inclusive dentro de @media)
// e normalizam cores para rgb(...).
const H = c`
function __regras(){var out=[];function walk(list,media){for(var i=0;i<list.length;i++){var r=list[i];if(r.media&&r.cssRules){walk(r.cssRules,r.media.mediaText)}else if(r.selectorText){out.push({sel:r.selectorText.replace(/\s+/g," ").trim(),st:r.style,media:media})}}}for(var s=0;s<document.styleSheets.length;s++){try{walk(document.styleSheets[s].cssRules,"")}catch(e){}}return out}
function __regra(sel,media){var rs=__regras();for(var i=rs.length-1;i>=0;i--){if(rs[i].sel===sel&&(media===undefined?!rs[i].media:rs[i].media.indexOf(media)>=0))return rs[i]}return null}
function __cor(v){var d=document.createElement("div");d.style.color=v;document.body.appendChild(d);var x=getComputedStyle(d).color;d.remove();return x}
function __keyframes(nome){for(var s=0;s<document.styleSheets.length;s++){var l;try{l=document.styleSheets[s].cssRules}catch(e){continue}for(var i=0;i<l.length;i++){if(l[i].type===7&&l[i].name===nome)return l[i]}}return null}
`;

const W = (html, css, js = "") => ({ html, css, js });

export default {
  /* ------------------------------------------------------------------ */
  b1: [
    {
      tipo: "completar",
      titulo: "Cores do título da padaria",
      enunciado: `A Padaria Pão Quente quer o título em azul-escuro e o slogan em cinza.
        Substitua cada <code>____</code> para que:
        <ul>
          <li>todos os <code>&lt;h1&gt;</code> tenham a <b>cor do texto</b> <code>#1e3a8a</code>;</li>
          <li>o parágrafo com a classe <code>slogan</code> tenha a cor <code>#64748b</code>.</li>
        </ul>`,
      dica: `A propriedade que muda a cor do <b>texto</b> é <code>color</code>. Cor em hexadecimal começa com <code>#</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Padaria Pão Quente</h1>
<p class="slogan">Pão fresquinho desde 1998.</p>`, c`h1 {
  ____: #1e3a8a;
}

.slogan {
  color: ____;
}`),
      solucao: W(c`<h1>Padaria Pão Quente</h1>
<p class="slogan">Pão fresquinho desde 1998.</p>`, c`h1 {
  color: #1e3a8a;
}

.slogan {
  color: #64748b;
}`),
      teste: c`
var h = __css("h1", "color");
__assert(h === "rgb(30, 58, 138)", "O h1 deveria ter color #1e3a8a (rgb(30, 58, 138)), mas está " + h);
var s = __css(".slogan", "color");
__assert(s === "rgb(100, 116, 139)", "O .slogan deveria ter color #64748b (rgb(100, 116, 139)), mas está " + s);`
    },
    {
      tipo: "completar",
      titulo: "Classe e id na loja",
      enunciado: `Na página da loja, o botão tem <code>class="botao-comprar"</code> e o cabeçalho tem <code>id="cabecalho"</code>.
        Substitua cada <code>____</code> pelo <b>seletor</b> certo para que o botão fique com fundo verde e o cabeçalho com fundo cinza-claro.`,
      dica: `Seletor de classe começa com ponto (<code>.nome</code>); seletor de id começa com cerquilha (<code>#nome</code>).`,
      lang: "web",
      aba: "css",
      inicial: W(c`<header id="cabecalho">
  <h1>Loja da Esquina</h1>
</header>
<p>Camiseta básica — R$ 49,90</p>
<button class="botao-comprar">Comprar</button>`, c`____ {
  background: #16a34a;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
}

____ {
  background: #f1f5f9;
}`),
      solucao: W(c`<header id="cabecalho">
  <h1>Loja da Esquina</h1>
</header>
<p>Camiseta básica — R$ 49,90</p>
<button class="botao-comprar">Comprar</button>`, c`.botao-comprar {
  background: #16a34a;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
}

#cabecalho {
  background: #f1f5f9;
}`),
      teste: c`
var b = __css(".botao-comprar", "backgroundColor");
__assert(b === "rgb(22, 163, 74)", "O botão deveria ter fundo #16a34a (rgb(22, 163, 74)), mas está " + b + ". Confira o seletor de classe.");
__assert(__css(".botao-comprar", "paddingLeft") === "20px", "O botão deveria manter padding: 12px 20px.");
var c = __css("#cabecalho", "backgroundColor");
__assert(c === "rgb(241, 245, 249)", "O cabeçalho deveria ter fundo #f1f5f9 (rgb(241, 245, 249)), mas está " + c + ". Confira o seletor de id.");`
    },
    {
      tipo: "completar",
      titulo: "Botão que escurece no hover",
      enunciado: `Para dar sensação de clique, o botão <code>.botao-comprar</code> deve ficar com o verde mais escuro
        <code>#15803d</code> <b>quando o mouse passa em cima</b>. Substitua o <code>____</code> pela pseudo-classe certa.`,
      dica: `A pseudo-classe de “mouse em cima” vem colada no seletor, com dois-pontos.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<button class="botao-comprar">Comprar agora</button>`, c`.botao-comprar {
  background: #16a34a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
}

.botao-comprar____ {
  background: #15803d;
}`),
      solucao: W(c`<button class="botao-comprar">Comprar agora</button>`, c`.botao-comprar {
  background: #16a34a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
}

.botao-comprar:hover {
  background: #15803d;
}`),
      teste: H + c`
__assert(__css(".botao-comprar", "backgroundColor") === "rgb(22, 163, 74)", "Fora do hover, o botão deve continuar com fundo #16a34a.");
var r = __regra(".botao-comprar:hover");
__assert(r, "Não encontrei a regra .botao-comprar:hover no CSS.");
__assert(__cor(r.st.backgroundColor) === "rgb(21, 128, 61)", "No hover, o fundo deveria ser #15803d, mas está " + (r.st.backgroundColor || "vazio") + ".");`
    },
    {
      tipo: "criar",
      titulo: "Etiquetas de status do pedido",
      enunciado: `No painel do delivery, cada pedido tem uma etiqueta de status. O HTML já está pronto.
        Na aba CSS, crie as regras:
        <ul>
          <li><code>.status-entregue</code>: fundo <code>#dcfce7</code> e texto <code>#166534</code>;</li>
          <li><code>.status-atrasado</code>: fundo <code>#fee2e2</code> e texto <code>#991b1b</code>;</li>
          <li><code>.status</code> (vale para as duas): <code>padding: 4px 8px</code> e <code>border-radius: 6px</code>.</li>
        </ul>`,
      dica: `Um elemento pode ter várias classes (<code>class="status status-entregue"</code>): ele recebe as regras de todas elas.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h2>Pedidos de hoje</h2>
<p>#1021 — Pizza grande <span class="status status-entregue">Entregue</span></p>
<p>#1022 — Lasanha <span class="status status-atrasado">Atrasado</span></p>`, c`/* Crie aqui as regras .status, .status-entregue e .status-atrasado */
`),
      solucao: W(c`<h2>Pedidos de hoje</h2>
<p>#1021 — Pizza grande <span class="status status-entregue">Entregue</span></p>
<p>#1022 — Lasanha <span class="status status-atrasado">Atrasado</span></p>`, c`.status {
  padding: 4px 8px;
  border-radius: 6px;
}

.status-entregue {
  background: #dcfce7;
  color: #166534;
}

.status-atrasado {
  background: #fee2e2;
  color: #991b1b;
}`),
      teste: c`
__assert(__css(".status-entregue", "backgroundColor") === "rgb(220, 252, 231)", "O fundo de .status-entregue deveria ser #dcfce7, mas está " + __css(".status-entregue", "backgroundColor"));
__assert(__css(".status-entregue", "color") === "rgb(22, 101, 52)", "O texto de .status-entregue deveria ser #166534, mas está " + __css(".status-entregue", "color"));
__assert(__css(".status-atrasado", "backgroundColor") === "rgb(254, 226, 226)", "O fundo de .status-atrasado deveria ser #fee2e2, mas está " + __css(".status-atrasado", "backgroundColor"));
__assert(__css(".status-atrasado", "color") === "rgb(153, 27, 27)", "O texto de .status-atrasado deveria ser #991b1b, mas está " + __css(".status-atrasado", "color"));
__assert(__css(".status-atrasado", "paddingLeft") === "8px" && __css(".status-entregue", "paddingTop") === "4px", "As duas etiquetas devem ter padding: 4px 8px (use a classe .status).");
__assert(__css(".status-entregue", "borderTopLeftRadius") === "6px" && __css(".status-atrasado", "borderTopLeftRadius") === "6px", "As duas etiquetas devem ter border-radius: 6px.");`
    },
    {
      tipo: "criar",
      titulo: "Menu da clínica com link ativo",
      enunciado: `A Clínica Bem-Estar tem um menu de links. Na aba CSS:
        <ul>
          <li>todos os links dentro de <code>nav</code> (seletor <code>nav a</code>) devem ter cor <code>#0f766e</code> e <b>sem sublinhado</b>;</li>
          <li>o link com <code>id="link-ativo"</code> deve ficar em <b>negrito</b>;</li>
          <li>ao passar o mouse em um link do menu (<code>nav a:hover</code>), o sublinhado deve aparecer (<code>underline</code>).</li>
        </ul>`,
      dica: `Sublinhado é controlado por <code>text-decoration</code> (<code>none</code> ou <code>underline</code>); negrito por <code>font-weight: bold</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<nav>
  <a href="#inicio" id="link-ativo">Início</a>
  <a href="#especialidades">Especialidades</a>
  <a href="#agendar">Agendar consulta</a>
</nav>`, c`/* Estilize os links do menu aqui */
`),
      solucao: W(c`<nav>
  <a href="#inicio" id="link-ativo">Início</a>
  <a href="#especialidades">Especialidades</a>
  <a href="#agendar">Agendar consulta</a>
</nav>`, c`nav a {
  color: #0f766e;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

#link-ativo {
  font-weight: bold;
}`),
      teste: H + c`
var links = document.querySelectorAll("nav a");
for (var i = 0; i < links.length; i++) {
  var cs = getComputedStyle(links[i]);
  __assert(cs.color === "rgb(15, 118, 110)", "Os links do menu deveriam ter cor #0f766e, mas o link \"" + links[i].textContent + "\" está " + cs.color);
  __assert(cs.textDecorationLine === "none", "Os links do menu não deveriam ter sublinhado (text-decoration: none).");
}
var w = __css("#link-ativo", "fontWeight");
__assert(w === "700" || w === "bold", "O #link-ativo deveria estar em negrito, mas font-weight é " + w);
__assert(__css("a[href='#agendar']", "fontWeight") === "400", "Só o link ativo deve ficar em negrito.");
var r = __regra("nav a:hover");
__assert(r && /underline/.test(r.st.textDecoration || r.st.textDecorationLine), "Falta a regra nav a:hover com text-decoration: underline.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  b2: [
    {
      tipo: "completar",
      titulo: "Espaços do card de aviso",
      enunciado: `O card de aviso da escola está “colado” no texto. Substitua cada <code>____</code> para que o card tenha:
        <ul>
          <li>preenchimento interno de <code>16px</code> nos quatro lados;</li>
          <li>borda de <code>1px</code>, <b>contínua</b> (sólida), na cor <code>#dddddd</code>;</li>
          <li>margem externa de <code>24px</code> nos quatro lados.</li>
        </ul>`,
      dica: `Espaço <b>interno</b> é <code>padding</code>; espaço <b>externo</b> é <code>margin</code>. Borda contínua é <code>solid</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="card">
  <h3>Reunião de pais</h3>
  <p>Sexta-feira, às 19h, no auditório.</p>
</div>`, c`.card {
  ____: 16px;
  border: 1px ____ #dddddd;
  ____: 24px;
}`),
      solucao: W(c`<div class="card">
  <h3>Reunião de pais</h3>
  <p>Sexta-feira, às 19h, no auditório.</p>
</div>`, c`.card {
  padding: 16px;
  border: 1px solid #dddddd;
  margin: 24px;
}`),
      teste: c`
__assert(__css(".card", "paddingTop") === "16px" && __css(".card", "paddingLeft") === "16px", "O card deveria ter padding de 16px, mas está " + __css(".card", "paddingTop"));
__assert(__css(".card", "borderTopStyle") === "solid", "A borda deveria ser solid, mas está " + __css(".card", "borderTopStyle"));
__assert(__css(".card", "borderTopWidth") === "1px", "A borda deveria ter 1px.");
__assert(__css(".card", "borderTopColor") === "rgb(221, 221, 221)", "A borda deveria ter a cor #dddddd.");
__assert(__css(".card", "marginTop") === "24px" && __css(".card", "marginLeft") === "24px", "O card deveria ter margin de 24px, mas está " + __css(".card", "marginTop"));`
    },
    {
      tipo: "completar",
      titulo: "Card que não estoura: border-box",
      enunciado: `O card do produto tem <code>width: 300px</code>, mas aparece com 344px na tela porque o padding e a borda são somados por fora.
        Substitua o <code>____</code> para que <b>todos</b> os elementos usem o modelo em que o <code>width</code> já inclui padding e borda.
        O card deve medir exatamente <b>300px</b> de largura total.`,
      dica: `A propriedade é <code>box-sizing</code>. Um dos dois valores possíveis é <code>content-box</code> (o padrão)... o outro é o que você quer.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="card">
  <h3>Fone Bluetooth</h3>
  <p>R$ 129,90</p>
</div>`, c`*, *::before, *::after {
  box-sizing: ____;
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #94a3b8;
}`),
      solucao: W(c`<div class="card">
  <h3>Fone Bluetooth</h3>
  <p>R$ 129,90</p>
</div>`, c`*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #94a3b8;
}`),
      teste: c`
var w = document.querySelector(".card").offsetWidth;
__assert(__css(".card", "boxSizing") === "border-box", "O card deveria usar box-sizing: border-box.");
__assert(w === 300, "A largura total do card deveria ser 300px, mas é " + w + "px.");
__assert(__css(".card", "paddingLeft") === "20px", "Mantenha o padding de 20px.");`
    },
    {
      tipo: "completar",
      titulo: "Centralizando o aviso",
      enunciado: `O aviso de manutenção do sistema de RH tem largura de <code>300px</code> e precisa ficar <b>centralizado na horizontal</b>,
        com <code>0</code> de margem em cima e embaixo. Substitua o <code>____</code> pelo valor que centraliza um bloco com largura definida.`,
      dica: `Com <code>margin: 0 X</code>, o segundo valor vale para esquerda e direita. Existe um valor que divide o espaço sobrando igualmente dos dois lados.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="aviso">O sistema de ponto ficará fora do ar no sábado, das 8h às 12h.</div>`, c`body { margin: 0; }

.aviso {
  width: 300px;
  padding: 12px;
  background: #fef3c7;
  margin: 0 ____;
}`),
      solucao: W(c`<div class="aviso">O sistema de ponto ficará fora do ar no sábado, das 8h às 12h.</div>`, c`body { margin: 0; }

.aviso {
  width: 300px;
  padding: 12px;
  background: #fef3c7;
  margin: 0 auto;
}`),
      teste: c`
var r = document.querySelector(".aviso").getBoundingClientRect();
var esq = r.left, dir = document.documentElement.clientWidth - r.right;
__assert(Math.abs(esq - dir) < 2, "O aviso não está centralizado: sobram " + Math.round(esq) + "px à esquerda e " + Math.round(dir) + "px à direita.");
__assert(__css(".aviso", "marginTop") === "0px", "A margem de cima deve continuar 0.");`
    },
    {
      tipo: "criar",
      titulo: "Cartão de produto do e-commerce",
      enunciado: `Estilize o cartão de produto (classe <code>produto</code>) com:
        <ul>
          <li><code>box-sizing: border-box</code> e largura de <code>250px</code> (a largura <b>total</b> deve dar 250px);</li>
          <li>preenchimento de <code>12px</code>;</li>
          <li>borda de <code>2px</code> sólida na cor <code>#e2e8f0</code>;</li>
          <li>cantos arredondados de <code>8px</code>;</li>
          <li>margem <b>só embaixo</b> de <code>16px</code> (para separar um cartão do outro).</li>
        </ul>`,
      dica: `Para mexer só em um lado da margem, use <code>margin-bottom</code>. Cantos arredondados: <code>border-radius</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="produto">
  <h3>Tênis de corrida</h3>
  <p>R$ 299,00</p>
</div>
<div class="produto">
  <h3>Garrafa térmica</h3>
  <p>R$ 59,90</p>
</div>`, c`/* Estilize o .produto aqui */
`),
      solucao: W(c`<div class="produto">
  <h3>Tênis de corrida</h3>
  <p>R$ 299,00</p>
</div>
<div class="produto">
  <h3>Garrafa térmica</h3>
  <p>R$ 59,90</p>
</div>`, c`.produto {
  box-sizing: border-box;
  width: 250px;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 16px;
}`),
      teste: c`
var p = document.querySelector(".produto");
__assert(p.offsetWidth === 250, "A largura total do .produto deveria ser 250px, mas é " + p.offsetWidth + "px (lembre do box-sizing).");
__assert(__css(".produto", "paddingTop") === "12px" && __css(".produto", "paddingRight") === "12px", "O padding deveria ser 12px.");
__assert(__css(".produto", "borderTopWidth") === "2px" && __css(".produto", "borderTopStyle") === "solid", "A borda deveria ser 2px solid.");
__assert(__css(".produto", "borderTopColor") === "rgb(226, 232, 240)", "A borda deveria ter a cor #e2e8f0.");
__assert(__css(".produto", "borderTopLeftRadius") === "8px", "O border-radius deveria ser 8px.");
__assert(__css(".produto", "marginBottom") === "16px", "A margem de baixo deveria ser 16px, mas é " + __css(".produto", "marginBottom"));
__assert(__css(".produto", "marginTop") === "0px" && __css(".produto", "marginLeft") === "0px", "Só a margem de baixo deve ter 16px; as outras ficam 0.");`
    },
    {
      tipo: "criar",
      titulo: "Etiquetas de categoria lado a lado",
      enunciado: `No blog da clínica veterinária, as categorias são <code>&lt;span class="etiqueta"&gt;</code>.
        Elementos <b>em linha</b> ignoram parte do espaçamento vertical, então crie a regra <code>.etiqueta</code> com:
        <ul>
          <li><code>display: inline-block</code> (continua na mesma linha, mas respeita padding e margem como caixa);</li>
          <li>preenchimento de <code>4px</code> em cima e embaixo e <code>10px</code> nas laterais;</li>
          <li>margem à direita de <code>8px</code>;</li>
          <li>fundo <code>#e0f2fe</code> e cantos totalmente arredondados (<code>border-radius: 999px</code>).</li>
        </ul>`,
      dica: `O atalho <code>padding: A B</code> usa A para cima/baixo e B para esquerda/direita.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h2>Como cuidar do seu filhote</h2>
<p>
  <span class="etiqueta">Cães</span>
  <span class="etiqueta">Vacinas</span>
  <span class="etiqueta">Alimentação</span>
</p>`, c`/* Crie a regra .etiqueta aqui */
`),
      solucao: W(c`<h2>Como cuidar do seu filhote</h2>
<p>
  <span class="etiqueta">Cães</span>
  <span class="etiqueta">Vacinas</span>
  <span class="etiqueta">Alimentação</span>
</p>`, c`.etiqueta {
  display: inline-block;
  padding: 4px 10px;
  margin-right: 8px;
  background: #e0f2fe;
  border-radius: 999px;
}`),
      teste: c`
__assert(__css(".etiqueta", "display") === "inline-block", "A .etiqueta deveria ter display: inline-block, mas tem " + __css(".etiqueta", "display"));
__assert(__css(".etiqueta", "paddingTop") === "4px" && __css(".etiqueta", "paddingBottom") === "4px", "O padding de cima e de baixo deveria ser 4px.");
__assert(__css(".etiqueta", "paddingLeft") === "10px" && __css(".etiqueta", "paddingRight") === "10px", "O padding das laterais deveria ser 10px.");
__assert(__css(".etiqueta", "marginRight") === "8px", "A margem à direita deveria ser 8px.");
__assert(__css(".etiqueta", "backgroundColor") === "rgb(224, 242, 254)", "O fundo deveria ser #e0f2fe.");
__assert(__css(".etiqueta", "borderTopLeftRadius") === "999px", "O border-radius deveria ser 999px.");
var e = document.querySelectorAll(".etiqueta");
__assert(Math.abs(e[0].getBoundingClientRect().top - e[1].getBoundingClientRect().top) < 2, "As etiquetas devem continuar na mesma linha.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  b3: [
    {
      tipo: "completar",
      titulo: "Texto confortável de ler",
      enunciado: `O texto do site da escola está apertado. Substitua cada <code>____</code> para que o <code>body</code> tenha:
        <ul>
          <li>tamanho de fonte <code>1rem</code> (respeita a configuração do usuário);</li>
          <li>altura de linha <code>1.6</code> (sem unidade).</li>
        </ul>`,
      dica: `As propriedades são <code>font-size</code> e <code>line-height</code>. O <code>line-height</code> sem unidade multiplica o tamanho da fonte.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Matrículas abertas</h1>
<p>As matrículas para 2027 vão até 30 de novembro. Traga RG, CPF e comprovante de residência do responsável.</p>`, c`body {
  font-family: system-ui, sans-serif;
  font-size: ____;
  line-height: ____;
  color: #222;
}`),
      solucao: W(c`<h1>Matrículas abertas</h1>
<p>As matrículas para 2027 vão até 30 de novembro. Traga RG, CPF e comprovante de residência do responsável.</p>`, c`body {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #222;
}`),
      padroes: [[/font-size\s*:\s*1rem/, "Use exatamente font-size: 1rem (em rem, não em px)."], [/line-height\s*:\s*1\.6\s*[;}]/, "Use line-height: 1.6, sem unidade."]],
      teste: c`
__assert(__css("body", "fontSize") === "16px", "A fonte do body deveria dar 16px (1rem), mas dá " + __css("body", "fontSize"));
__assert(__css("p", "lineHeight") === "25.6px", "A altura de linha deveria ser 1.6 × 16px = 25.6px, mas é " + __css("p", "lineHeight"));`
    },
    {
      tipo: "completar",
      titulo: "Container que se adapta",
      enunciado: `O conteúdo da loja precisa ocupar <b>90%</b> da largura disponível, mas nunca passar de <b>1100px</b> em telas grandes,
        e ficar centralizado. Substitua cada <code>____</code> pelo valor certo.`,
      dica: `Porcentagem é relativa ao pai. <code>max-width</code> é o limite máximo.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="container">
  <h1>Ofertas da semana</h1>
  <p>Até 40% de desconto em eletrônicos.</p>
</div>`, c`body { margin: 0; }

.container {
  width: ____;
  max-width: ____;
  margin: 0 auto;
  background: #f8fafc;
}`),
      solucao: W(c`<div class="container">
  <h1>Ofertas da semana</h1>
  <p>Até 40% de desconto em eletrônicos.</p>
</div>`, c`body { margin: 0; }

.container {
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  background: #f8fafc;
}`),
      padroes: [[/width\s*:\s*90%/, "A largura deve ser em porcentagem: width: 90%."]],
      teste: c`
__assert(__css(".container", "maxWidth") === "1100px", "O max-width deveria ser 1100px, mas é " + __css(".container", "maxWidth"));
var largura = document.querySelector(".container").getBoundingClientRect().width;
var esperado = Math.min(document.body.clientWidth * 0.9, 1100);
__assert(Math.abs(largura - esperado) < 2, "O container deveria ter " + Math.round(esperado) + "px (90% da tela, no máximo 1100px), mas tem " + Math.round(largura) + "px.");`
    },
    {
      tipo: "completar",
      titulo: "Título fluido com clamp",
      enunciado: `O título da página de uma academia deve crescer com a tela, mas com limites: no mínimo <code>1.6rem</code>,
        idealmente <code>4vw</code> e no máximo <code>2.5rem</code>. Substitua o <code>____</code> pela função que faz isso.`,
      dica: `A função recebe três valores, nesta ordem: mínimo, ideal e máximo.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Academia Força Total</h1>
<p>Primeira semana grátis!</p>`, c`h1 {
  font-size: ____(1.6rem, 4vw, 2.5rem);
}`),
      solucao: W(c`<h1>Academia Força Total</h1>
<p>Primeira semana grátis!</p>`, c`h1 {
  font-size: clamp(1.6rem, 4vw, 2.5rem);
}`),
      padroes: [[/clamp\(\s*1\.6rem\s*,\s*4vw\s*,\s*2\.5rem\s*\)/, "Use clamp(1.6rem, 4vw, 2.5rem) no font-size do h1."]],
      teste: c`
var f = parseFloat(__css("h1", "fontSize"));
__assert(f >= 25.5 && f <= 40.1, "O título deveria ficar entre 25.6px e 40px, mas está com " + f + "px.");`
    },
    {
      tipo: "criar",
      titulo: "Cardápio do restaurante",
      enunciado: `Estilize o cardápio do restaurante. Na aba CSS, crie as regras:
        <ul>
          <li><code>h2</code>: letras <b>maiúsculas</b> (<code>text-transform</code>) e espaço entre letras de <code>2px</code>;</li>
          <li><code>.preco</code>: <b>negrito</b> e tamanho de fonte <code>1.25rem</code>;</li>
          <li><code>.descricao</code>: <i>itálico</i> e cor <code>#555555</code>.</li>
        </ul>`,
      dica: `Espaço entre letras é <code>letter-spacing</code>; itálico é <code>font-style</code>; negrito é <code>font-weight</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h2>Pratos principais</h2>
<p>Feijoada completa <span class="preco">R$ 42,00</span></p>
<p class="descricao">Acompanha arroz, couve, farofa e laranja.</p>`, c`/* Estilize h2, .preco e .descricao */
`),
      solucao: W(c`<h2>Pratos principais</h2>
<p>Feijoada completa <span class="preco">R$ 42,00</span></p>
<p class="descricao">Acompanha arroz, couve, farofa e laranja.</p>`, c`h2 {
  text-transform: uppercase;
  letter-spacing: 2px;
}

.preco {
  font-weight: bold;
  font-size: 1.25rem;
}

.descricao {
  font-style: italic;
  color: #555555;
}`),
      teste: c`
__assert(__css("h2", "textTransform") === "uppercase", "O h2 deveria estar em maiúsculas (text-transform: uppercase).");
__assert(__css("h2", "letterSpacing") === "2px", "O h2 deveria ter letter-spacing de 2px, mas tem " + __css("h2", "letterSpacing"));
var w = __css(".preco", "fontWeight");
__assert(w === "700" || w === "bold", "O .preco deveria estar em negrito.");
__assert(__css(".preco", "fontSize") === "20px", "O .preco deveria ter 1.25rem (20px), mas tem " + __css(".preco", "fontSize"));
__assert(__css(".descricao", "fontStyle") === "italic", "A .descricao deveria estar em itálico.");
__assert(__css(".descricao", "color") === "rgb(85, 85, 85)", "A .descricao deveria ter cor #555555, mas tem " + __css(".descricao", "color"));`
    },
    {
      tipo: "criar",
      titulo: "rem e em no aviso da farmácia",
      enunciado: `A farmácia quer letras maiores para clientes idosos. Na aba CSS:
        <ul>
          <li>defina o tamanho de fonte da raiz: <code>html</code> com <code>20px</code>;</li>
          <li><code>.aviso</code> com tamanho <code>1.5rem</code> e texto centralizado;</li>
          <li><code>.aviso small</code> com tamanho <code>0.8em</code> (relativo ao pai, o aviso).</li>
        </ul>
        Resultado esperado: aviso com 30px e o <code>&lt;small&gt;</code> com 24px.`,
      dica: `<code>rem</code> multiplica o tamanho do <code>html</code>; <code>em</code> multiplica o tamanho do elemento pai. Centralizar texto: <code>text-align</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="aviso">
  Vacina da gripe disponível!
  <br><small>Traga sua carteirinha de vacinação.</small>
</div>`, c`/* Escreva as regras para html, .aviso e .aviso small */
`),
      solucao: W(c`<div class="aviso">
  Vacina da gripe disponível!
  <br><small>Traga sua carteirinha de vacinação.</small>
</div>`, c`html {
  font-size: 20px;
}

.aviso {
  font-size: 1.5rem;
  text-align: center;
}

.aviso small {
  font-size: 0.8em;
}`),
      padroes: [[/1\.5rem/, "Use rem no .aviso: font-size: 1.5rem."], [/0?\.8em/, "Use em no small: font-size: 0.8em."]],
      teste: c`
__assert(__css("html", "fontSize") === "20px", "O html deveria ter font-size 20px.");
__assert(__css(".aviso", "fontSize") === "30px", "O .aviso deveria ter 1.5rem = 30px, mas tem " + __css(".aviso", "fontSize"));
__assert(__css(".aviso small", "fontSize") === "24px", "O small deveria ter 0.8em = 24px, mas tem " + __css(".aviso small", "fontSize"));
__assert(__css(".aviso", "textAlign") === "center", "O texto do .aviso deveria estar centralizado.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  i1: [
    {
      tipo: "completar",
      titulo: "Menu com logo à esquerda",
      enunciado: `No topo do site da pizzaria, o logo deve ficar na esquerda e o botão “Pedir” na direita, os dois alinhados no meio na vertical.
        Substitua cada <code>____</code> para que <code>.menu</code>:
        <ul>
          <li>vire um contêiner flex;</li>
          <li>espalhe os itens com o espaço sobrando <b>entre</b> eles;</li>
          <li>centralize os itens no eixo cruzado (vertical).</li>
        </ul>`,
      dica: `<code>justify-content</code> cuida do eixo principal (horizontal); <code>align-items</code>, do eixo cruzado.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<header class="menu">
  <strong class="logo">🍕 Pizzaria Napoli</strong>
  <button>Pedir</button>
</header>`, c`.menu {
  display: ____;
  justify-content: ____;
  align-items: ____;
  padding: 12px;
  background: #fee2e2;
}`),
      solucao: W(c`<header class="menu">
  <strong class="logo">🍕 Pizzaria Napoli</strong>
  <button>Pedir</button>
</header>`, c`.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #fee2e2;
}`),
      teste: c`
__assert(__css(".menu", "display") === "flex", "O .menu deveria ter display: flex, mas tem " + __css(".menu", "display"));
__assert(__css(".menu", "justifyContent") === "space-between", "O justify-content deveria ser space-between, mas é " + __css(".menu", "justifyContent"));
__assert(__css(".menu", "alignItems") === "center", "O align-items deveria ser center, mas é " + __css(".menu", "alignItems"));
var m = document.querySelector(".menu").getBoundingClientRect(), b = document.querySelector(".menu button").getBoundingClientRect();
__assert(m.right - b.right < 14, "O botão deveria ficar encostado na direita do menu.");`
    },
    {
      tipo: "completar",
      titulo: "Centralizar a mensagem de sucesso",
      enunciado: `Depois de agendar uma consulta, a clínica mostra uma mensagem que deve ficar <b>bem no meio</b> da área <code>.centro</code>
        (na horizontal e na vertical). Substitua cada <code>____</code>.`,
      dica: `É a “pergunta clássica”: no pai, flex + <code>justify-content</code> + <code>align-items</code>, os dois com o mesmo valor.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="centro">
  <p class="mensagem">✅ Consulta agendada para 12/11 às 14h</p>
</div>`, c`body { margin: 0; }

.centro {
  display: flex;
  justify-content: ____;
  align-items: ____;
  min-height: 300px;
  background: #ecfdf5;
}

.mensagem { margin: 0; }`),
      solucao: W(c`<div class="centro">
  <p class="mensagem">✅ Consulta agendada para 12/11 às 14h</p>
</div>`, c`body { margin: 0; }

.centro {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #ecfdf5;
}

.mensagem { margin: 0; }`),
      teste: c`
var p = document.querySelector(".centro").getBoundingClientRect(), f = document.querySelector(".mensagem").getBoundingClientRect();
var cx = (p.left + p.right) / 2, cy = (p.top + p.bottom) / 2, fx = (f.left + f.right) / 2, fy = (f.top + f.bottom) / 2;
__assert(Math.abs(cx - fx) < 2, "A mensagem não está centralizada na horizontal.");
__assert(Math.abs(cy - fy) < 2, "A mensagem não está centralizada na vertical.");`
    },
    {
      tipo: "completar",
      titulo: "Vitrine que quebra linha",
      enunciado: `A vitrine de produtos tem vários cards. Substitua cada <code>____</code> para que:
        <ul>
          <li>os cards <b>quebrem para a linha de baixo</b> quando não couberem;</li>
          <li>haja <code>12px</code> de espaço entre eles;</li>
          <li>cada card cresça e encolha, com tamanho base de <code>250px</code>.</li>
        </ul>`,
      dica: `Quebra de linha no flex é <code>flex-wrap</code>. O atalho <code>flex: crescer encolher base</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="cards">
  <div class="card">Notebook</div>
  <div class="card">Mouse</div>
  <div class="card">Teclado</div>
  <div class="card">Monitor</div>
</div>`, c`.cards {
  display: flex;
  flex-wrap: ____;
  gap: ____;
}

.cards > * {
  flex: 1 1 ____;
  padding: 16px;
  background: #e0e7ff;
}`),
      solucao: W(c`<div class="cards">
  <div class="card">Notebook</div>
  <div class="card">Mouse</div>
  <div class="card">Teclado</div>
  <div class="card">Monitor</div>
</div>`, c`.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cards > * {
  flex: 1 1 250px;
  padding: 16px;
  background: #e0e7ff;
}`),
      teste: c`
__assert(__css(".cards", "flexWrap") === "wrap", "O flex-wrap deveria ser wrap, mas é " + __css(".cards", "flexWrap"));
__assert(__css(".cards", "columnGap") === "12px", "O gap deveria ser 12px, mas é " + __css(".cards", "columnGap"));
__assert(__css(".card", "flexBasis") === "250px", "A base (flex-basis) dos cards deveria ser 250px, mas é " + __css(".card", "flexBasis"));
__assert(__css(".card", "flexGrow") === "1" && __css(".card", "flexShrink") === "1", "Os cards devem poder crescer e encolher (flex: 1 1 250px).");`
    },
    {
      tipo: "criar",
      titulo: "Barra de navegação do delivery",
      enunciado: `Monte o topo do app de delivery. Na aba CSS:
        <ul>
          <li><code>.topo</code>: flex, logo na esquerda e menu na direita (<code>space-between</code>), itens centralizados na vertical e <code>padding: 16px</code>;</li>
          <li><code>.links</code> (a lista <code>&lt;ul&gt;</code>): flex, com <code>24px</code> de espaço entre os itens, sem marcadores (<code>list-style: none</code>), <code>margin: 0</code> e <code>padding: 0</code>.</li>
        </ul>`,
      dica: `Você vai precisar de <b>dois</b> contêineres flex: o <code>.topo</code> e a <code>.links</code>. Espaço entre itens: <code>gap</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<header class="topo">
  <strong>🛵 RapiEntrega</strong>
  <ul class="links">
    <li><a href="#">Restaurantes</a></li>
    <li><a href="#">Mercados</a></li>
    <li><a href="#">Meus pedidos</a></li>
  </ul>
</header>`, c`/* Estilize .topo e .links */
`),
      solucao: W(c`<header class="topo">
  <strong>🛵 RapiEntrega</strong>
  <ul class="links">
    <li><a href="#">Restaurantes</a></li>
    <li><a href="#">Mercados</a></li>
    <li><a href="#">Meus pedidos</a></li>
  </ul>
</header>`, c`.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}`),
      teste: c`
__assert(__css(".topo", "display") === "flex", "O .topo deveria ser flex.");
__assert(__css(".topo", "justifyContent") === "space-between", "O .topo deveria usar justify-content: space-between.");
__assert(__css(".topo", "alignItems") === "center", "O .topo deveria usar align-items: center.");
__assert(__css(".topo", "paddingTop") === "16px", "O .topo deveria ter padding de 16px.");
__assert(__css(".links", "display") === "flex", "A lista .links deveria ser flex (itens lado a lado).");
__assert(__css(".links", "columnGap") === "24px", "A .links deveria ter gap de 24px, mas tem " + __css(".links", "columnGap"));
__assert(__css(".links li", "listStyleType") === "none", "Os itens não deveriam ter marcadores (list-style: none).");
__assert(__css(".links", "paddingLeft") === "0px" && __css(".links", "marginTop") === "0px", "Zere margin e padding da .links.");
var li = document.querySelectorAll(".links li");
__assert(Math.abs(li[0].getBoundingClientRect().top - li[2].getBoundingClientRect().top) < 2, "Os itens do menu deveriam estar na mesma linha.");`
    },
    {
      tipo: "criar",
      titulo: "Formulário em coluna com botões à direita",
      enunciado: `No cadastro de funcionários do RH:
        <ul>
          <li><code>.formulario</code>: flex em <b>coluna</b> (um campo embaixo do outro) com <code>8px</code> de espaço;</li>
          <li><code>.acoes</code>: flex, com os botões encostados no <b>final</b> da linha (à direita) e <code>8px</code> de espaço entre eles.</li>
        </ul>`,
      dica: `Direção do eixo: <code>flex-direction</code>. Para empurrar os itens para o fim do eixo principal, use <code>justify-content: flex-end</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<form class="formulario">
  <label for="nome">Nome</label>
  <input id="nome">
  <label for="cargo">Cargo</label>
  <input id="cargo">
  <div class="acoes">
    <button type="button">Cancelar</button>
    <button type="submit">Salvar</button>
  </div>
</form>`, c`/* Estilize .formulario e .acoes */
`),
      solucao: W(c`<form class="formulario">
  <label for="nome">Nome</label>
  <input id="nome">
  <label for="cargo">Cargo</label>
  <input id="cargo">
  <div class="acoes">
    <button type="button">Cancelar</button>
    <button type="submit">Salvar</button>
  </div>
</form>`, c`.formulario {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}`),
      teste: c`
__assert(__css(".formulario", "display") === "flex" && __css(".formulario", "flexDirection") === "column", "O .formulario deveria ser flex em coluna (flex-direction: column).");
__assert(__css(".formulario", "rowGap") === "8px", "O .formulario deveria ter gap de 8px.");
__assert(__css(".acoes", "display") === "flex", "A .acoes deveria ser flex.");
var j = __css(".acoes", "justifyContent");
__assert(j === "flex-end" || j === "end", "Os botões deveriam ficar no final (justify-content: flex-end), mas está " + j);
__assert(__css(".acoes", "columnGap") === "8px", "A .acoes deveria ter gap de 8px.");
var a = document.querySelector(".acoes").getBoundingClientRect(), s = __botao("Salvar").getBoundingClientRect();
__assert(a.right - s.right < 2, "O botão Salvar deveria estar encostado na direita.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  i2: [
    {
      tipo: "completar",
      titulo: "Galeria de fotos em 3 colunas",
      enunciado: `A galeria do salão de beleza deve ter <b>3 colunas iguais</b>, com <code>16px</code> de espaço.
        Substitua cada <code>____</code>.`,
      dica: `Ative o grid com <code>display</code> e use a função que repete colunas: <code>____(3, 1fr)</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="galeria">
  <div class="foto">Corte</div>
  <div class="foto">Coloração</div>
  <div class="foto">Escova</div>
  <div class="foto">Manicure</div>
  <div class="foto">Maquiagem</div>
  <div class="foto">Penteado</div>
</div>`, c`.galeria {
  display: ____;
  grid-template-columns: ____(3, 1fr);
  gap: 16px;
}

.foto { background: #fce7f3; padding: 24px; }`),
      solucao: W(c`<div class="galeria">
  <div class="foto">Corte</div>
  <div class="foto">Coloração</div>
  <div class="foto">Escova</div>
  <div class="foto">Manicure</div>
  <div class="foto">Maquiagem</div>
  <div class="foto">Penteado</div>
</div>`, c`.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.foto { background: #fce7f3; padding: 24px; }`),
      teste: c`
__assert(__css(".galeria", "display") === "grid", "A .galeria deveria ter display: grid.");
var cols = __css(".galeria", "gridTemplateColumns").split(" ");
__assert(cols.length === 3, "A galeria deveria ter 3 colunas, mas tem " + cols.length);
__assert(Math.abs(parseFloat(cols[0]) - parseFloat(cols[2])) < 1, "As 3 colunas deveriam ter a mesma largura (1fr).");`
    },
    {
      tipo: "completar",
      titulo: "Vitrine responsiva sem media query",
      enunciado: `A vitrine da loja deve colocar quantas colunas couberem, cada uma com <b>no mínimo 220px</b> e dividindo o espaço que sobra.
        Substitua cada <code>____</code> para formar <code>repeat(auto-fill, minmax(220px, 1fr))</code>.`,
      dica: `<code>auto-fill</code> cria quantas colunas couberem; <code>minmax(mínimo, máximo)</code> limita o tamanho de cada uma.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="vitrine">
  <div class="item">Cafeteira</div>
  <div class="item">Liquidificador</div>
  <div class="item">Torradeira</div>
  <div class="item">Batedeira</div>
  <div class="item">Sanduicheira</div>
</div>`, c`.vitrine {
  display: grid;
  grid-template-columns: repeat(____, ____(220px, 1fr));
  gap: 16px;
}

.item { background: #fef9c3; padding: 24px; }`),
      solucao: W(c`<div class="vitrine">
  <div class="item">Cafeteira</div>
  <div class="item">Liquidificador</div>
  <div class="item">Torradeira</div>
  <div class="item">Batedeira</div>
  <div class="item">Sanduicheira</div>
</div>`, c`.vitrine {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.item { background: #fef9c3; padding: 24px; }`),
      padroes: [[/repeat\(\s*auto-fill\s*,\s*minmax\(\s*220px\s*,\s*1fr\s*\)\s*\)/, "Use grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))."]],
      teste: c`
var cols = __css(".vitrine", "gridTemplateColumns").split(" ");
for (var i = 0; i < cols.length; i++) __assert(parseFloat(cols[i]) >= 219.5, "Cada coluna deveria ter pelo menos 220px, mas uma tem " + cols[i]);
var v = document.querySelector(".vitrine").getBoundingClientRect().width;
__assert(cols.length === Math.max(1, Math.floor((v + 16) / 236)), "A quantidade de colunas não bate com auto-fill.");`
    },
    {
      tipo: "completar",
      titulo: "Dashboard com grid-template-areas",
      enunciado: `O painel administrativo da loja tem menu lateral, topo e conteúdo. As áreas já foram desenhadas em <code>grid-template-areas</code>.
        Substitua cada <code>____</code> pelo <b>nome da área</b> em que cada parte deve ficar: <code>nav</code> no menu, <code>header</code> no topo
        e <code>main</code> no conteúdo.`,
      dica: `Os nomes que você usa em <code>grid-area</code> são exatamente as palavras escritas em <code>grid-template-areas</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="pagina">
  <header>Painel — Loja da Esquina</header>
  <nav>Menu</nav>
  <main>Vendas de hoje: R$ 3.240,00</main>
</div>`, c`.pagina {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "menu  topo"
    "menu  conteudo";
  min-height: 300px;
}

.pagina > nav    { grid-area: ____; background: #1e293b; color: white; }
.pagina > header { grid-area: ____; background: #e2e8f0; }
.pagina > main   { grid-area: ____; }`),
      solucao: W(c`<div class="pagina">
  <header>Painel — Loja da Esquina</header>
  <nav>Menu</nav>
  <main>Vendas de hoje: R$ 3.240,00</main>
</div>`, c`.pagina {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "menu  topo"
    "menu  conteudo";
  min-height: 300px;
}

.pagina > nav    { grid-area: menu; background: #1e293b; color: white; }
.pagina > header { grid-area: topo; background: #e2e8f0; }
.pagina > main   { grid-area: conteudo; }`),
      teste: c`
var n = document.querySelector("nav").getBoundingClientRect(), h = document.querySelector("header").getBoundingClientRect(), m = document.querySelector("main").getBoundingClientRect();
__assert(Math.round(n.width) === 200, "O nav deveria ocupar a coluna de 200px (área menu), mas tem " + Math.round(n.width) + "px.");
__assert(n.left < h.left && n.left < m.left, "O nav deveria ficar à esquerda (área menu).");
__assert(h.top < m.top, "O header deveria ficar acima do main (área topo).");
__assert(Math.abs(h.left - m.left) < 1, "O header e o main deveriam ficar na mesma coluna (topo e conteudo).");
__assert(Math.abs(n.height - (m.bottom - h.top)) < 2, "O nav deveria ocupar as duas linhas (área menu).");`
    },
    {
      tipo: "criar",
      titulo: "Agenda da clínica com destaque",
      enunciado: `Monte a grade de horários da clínica. Na aba CSS:
        <ul>
          <li><code>.agenda</code>: grid com 3 colunas: a primeira de <code>120px</code> e as outras duas dividindo o resto igualmente (<code>1fr 1fr</code>); <code>gap: 8px</code>;</li>
          <li><code>.destaque</code>: deve ocupar <b>2 colunas</b> (use <code>grid-column</code>).</li>
        </ul>`,
      dica: `<code>grid-column: span 2</code> faz o item “esticar” por duas colunas.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="agenda">
  <div class="hora">08:00</div>
  <div>Dra. Paula</div>
  <div>Dr. Marcos</div>
  <div class="hora">09:00</div>
  <div class="destaque">Mutirão de vacinação (todas as salas)</div>
  <div class="hora">10:00</div>
  <div>Dra. Paula</div>
  <div>Livre</div>
</div>`, c`.agenda > div { background: #f1f5f9; padding: 8px; }
.agenda > .destaque { background: #bbf7d0; }

/* Escreva aqui as regras .agenda e .destaque */
`),
      solucao: W(c`<div class="agenda">
  <div class="hora">08:00</div>
  <div>Dra. Paula</div>
  <div>Dr. Marcos</div>
  <div class="hora">09:00</div>
  <div class="destaque">Mutirão de vacinação (todas as salas)</div>
  <div class="hora">10:00</div>
  <div>Dra. Paula</div>
  <div>Livre</div>
</div>`, c`.agenda > div { background: #f1f5f9; padding: 8px; }
.agenda > .destaque { background: #bbf7d0; }

.agenda {
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 8px;
}

.destaque {
  grid-column: span 2;
}`),
      teste: c`
__assert(__css(".agenda", "display") === "grid", "A .agenda deveria ter display: grid.");
var cols = __css(".agenda", "gridTemplateColumns").split(" ");
__assert(cols.length === 3, "A .agenda deveria ter 3 colunas, mas tem " + cols.length);
__assert(cols[0] === "120px", "A primeira coluna deveria ter 120px, mas tem " + cols[0]);
__assert(Math.abs(parseFloat(cols[1]) - parseFloat(cols[2])) < 1, "A segunda e a terceira coluna deveriam ser iguais (1fr 1fr).");
__assert(__css(".agenda", "columnGap") === "8px", "O gap deveria ser 8px.");
var d = document.querySelector(".destaque").getBoundingClientRect().width;
var esperado = parseFloat(cols[1]) + parseFloat(cols[2]) + 8;
__assert(Math.abs(d - esperado) < 2, "O .destaque deveria ocupar 2 colunas (" + Math.round(esperado) + "px), mas tem " + Math.round(d) + "px.");`
    },
    {
      tipo: "criar",
      titulo: "Layout do blog com áreas nomeadas",
      enunciado: `Monte o layout do blog da escola com <code>grid-template-areas</code>. Na regra <code>.blog</code>:
        <ul>
          <li>grid com colunas <code>250px 1fr</code> e <code>gap: 12px</code>;</li>
          <li>áreas: primeira linha <code>"topo topo"</code>, segunda <code>"lateral conteudo"</code>, terceira <code>"rodape rodape"</code>.</li>
        </ul>
        E ligue cada parte à sua área: <code>header</code> → <code>topo</code>, <code>aside</code> → <code>lateral</code>, <code>main</code> → <code>conteudo</code>, <code>footer</code> → <code>rodape</code>.`,
      dica: `Cada linha de <code>grid-template-areas</code> é um texto entre aspas. Uma área repetida na mesma linha ocupa as duas colunas.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="blog">
  <header>Blog da Escola Aprender</header>
  <aside>Categorias</aside>
  <main>Feira de ciências: confira os projetos premiados!</main>
  <footer>© 2026 Escola Aprender</footer>
</div>`, c`.blog > * { background: #f1f5f9; padding: 12px; }

/* Escreva aqui o grid do .blog e as grid-area de cada parte */
`),
      solucao: W(c`<div class="blog">
  <header>Blog da Escola Aprender</header>
  <aside>Categorias</aside>
  <main>Feira de ciências: confira os projetos premiados!</main>
  <footer>© 2026 Escola Aprender</footer>
</div>`, c`.blog > * { background: #f1f5f9; padding: 12px; }

.blog {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 12px;
  grid-template-areas:
    "topo topo"
    "lateral conteudo"
    "rodape rodape";
}

.blog > header { grid-area: topo; }
.blog > aside  { grid-area: lateral; }
.blog > main   { grid-area: conteudo; }
.blog > footer { grid-area: rodape; }`),
      padroes: [[/grid-template-areas/, "Use grid-template-areas para desenhar o layout."]],
      teste: c`
var b = document.querySelector(".blog").getBoundingClientRect();
var h = document.querySelector("header").getBoundingClientRect(), a = document.querySelector("aside").getBoundingClientRect(), m = document.querySelector("main").getBoundingClientRect(), f = document.querySelector("footer").getBoundingClientRect();
__assert(Math.abs(h.width - b.width) < 1, "O header deveria ocupar a largura toda (área topo topo).");
__assert(Math.abs(f.width - b.width) < 1, "O footer deveria ocupar a largura toda (área rodape rodape).");
__assert(Math.round(a.width) === 250, "O aside deveria ter 250px (coluna lateral), mas tem " + Math.round(a.width) + "px.");
__assert(a.left < m.left && Math.abs(a.top - m.top) < 1, "O aside e o main deveriam ficar lado a lado, com o aside à esquerda.");
__assert(h.bottom <= a.top && m.bottom <= f.top, "A ordem deveria ser: topo, depois lateral/conteudo, depois rodape.");
__assert(Math.round(a.top - h.bottom) === 12, "O gap entre as linhas deveria ser 12px.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  i3: [
    {
      tipo: "completar",
      titulo: "Três colunas a partir do tablet",
      enunciado: `Seguindo o <b>mobile first</b>, os cards ficam em uma coluna no celular. A partir de <code>768px</code> de largura,
        devem virar 3 colunas. Substitua o <code>____</code> pela condição de largura <b>mínima</b>.`,
      dica: `Mobile first usa <code>@media (min-width: ...)</code>: “a partir desta largura”.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="colunas">
  <div>Plano Básico</div>
  <div>Plano Plus</div>
  <div>Plano Premium</div>
</div>`, c`.colunas {
  display: grid;
  gap: 16px;
}

@media (____: 768px) {
  .colunas {
    grid-template-columns: repeat(3, 1fr);
  }
}`),
      solucao: W(c`<div class="colunas">
  <div>Plano Básico</div>
  <div>Plano Plus</div>
  <div>Plano Premium</div>
</div>`, c`.colunas {
  display: grid;
  gap: 16px;
}

@media (min-width: 768px) {
  .colunas {
    grid-template-columns: repeat(3, 1fr);
  }
}`),
      teste: H + c`
__assert(__css(".colunas", "display") === "grid", "A regra base .colunas deve continuar com display: grid.");
var r = __regra(".colunas", "min-width: 768px");
__assert(r, "Não encontrei .colunas dentro de @media (min-width: 768px).");
__assert(/repeat\(3,\s*1fr\)/.test(r.st.gridTemplateColumns), "Dentro do media query, .colunas deveria ter grid-template-columns: repeat(3, 1fr).");`
    },
    {
      tipo: "completar",
      titulo: "Imagem que nunca estoura",
      enunciado: `A foto do imóvel tem 600px de largura e está estourando o card de 200px da imobiliária.
        Substitua cada <code>____</code> para que a imagem <b>nunca passe da largura do pai</b> e a altura se ajuste <b>proporcionalmente</b>.`,
      dica: `Largura máxima relativa ao pai: <code>max-width</code> em porcentagem. Altura proporcional: <code>height: auto</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="card">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='600' height='300' fill='%2393c5fd'/%3E%3C/svg%3E" width="600" height="300" alt="Fachada do apartamento">
  <p>Apto 2 quartos — R$ 1.800/mês</p>
</div>`, c`.card {
  width: 200px;
  border: 1px solid #ccc;
}

img {
  max-width: ____;
  height: ____;
}`),
      solucao: W(c`<div class="card">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='600' height='300' fill='%2393c5fd'/%3E%3C/svg%3E" width="600" height="300" alt="Fachada do apartamento">
  <p>Apto 2 quartos — R$ 1.800/mês</p>
</div>`, c`.card {
  width: 200px;
  border: 1px solid #ccc;
}

img {
  max-width: 100%;
  height: auto;
}`),
      teste: c`
__assert(__css("img", "maxWidth") === "100%", "A imagem deveria ter max-width: 100%, mas tem " + __css("img", "maxWidth"));
var r = document.querySelector("img").getBoundingClientRect();
__assert(r.width <= 200.5, "A imagem deveria caber no card de 200px, mas tem " + Math.round(r.width) + "px.");
__assert(Math.abs(r.height - r.width / 2) < 2, "A altura deveria acompanhar a proporção (2:1). Está com " + Math.round(r.width) + "x" + Math.round(r.height) + ". Use height: auto.");`
    },
    {
      tipo: "completar",
      titulo: "Modo escuro automático",
      enunciado: `O app da biblioteca deve ficar escuro automaticamente quando o sistema do usuário estiver em modo escuro.
        Substitua o <code>____</code> pela característica de mídia que detecta a preferência de cores do sistema.`,
      dica: `O nome da característica começa com <code>prefers-</code> e termina com <code>-scheme</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Biblioteca Municipal</h1>
<p>Renove seus empréstimos pelo app.</p>`, c`body {
  background: #ffffff;
  color: #111111;
}

@media (____: dark) {
  body {
    background: #111111;
    color: #eeeeee;
  }
}`),
      solucao: W(c`<h1>Biblioteca Municipal</h1>
<p>Renove seus empréstimos pelo app.</p>`, c`body {
  background: #ffffff;
  color: #111111;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #111111;
    color: #eeeeee;
  }
}`),
      teste: H + c`
var r = __regra("body", "prefers-color-scheme: dark");
__assert(r, "Não encontrei a regra body dentro de @media (prefers-color-scheme: dark).");
__assert(__cor(r.st.backgroundColor) === "rgb(17, 17, 17)", "No modo escuro, o fundo deveria ser #111111.");
__assert(__cor(r.st.color) === "rgb(238, 238, 238)", "No modo escuro, o texto deveria ser #eeeeee.");
var base = __regra("body");
__assert(base && __cor(base.st.backgroundColor) === "rgb(255, 255, 255)", "Fora do media query, o body deve continuar com fundo branco.");`
    },
    {
      tipo: "criar",
      titulo: "Planos da academia: 1, 2 e 4 colunas",
      enunciado: `Faça a tabela de planos da academia no estilo <b>mobile first</b>. Na aba CSS:
        <ul>
          <li><code>.planos</code> (padrão, celular): <code>display: grid</code> e <code>gap: 16px</code>, sem definir colunas (fica 1 coluna);</li>
          <li>a partir de <code>600px</code>: <code>.planos</code> com <code>grid-template-columns: repeat(2, 1fr)</code>;</li>
          <li>a partir de <code>1000px</code>: <code>.planos</code> com <code>grid-template-columns: repeat(4, 1fr)</code>.</li>
        </ul>`,
      dica: `Escreva dois blocos <code>@media (min-width: ...)</code>, do menor para o maior: o último que valer vence.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="planos">
  <div class="plano">Mensal</div>
  <div class="plano">Trimestral</div>
  <div class="plano">Semestral</div>
  <div class="plano">Anual</div>
</div>`, c`.plano { background: #ede9fe; padding: 16px; }

/* Escreva o .planos padrão e os dois media queries */
`),
      solucao: W(c`<div class="planos">
  <div class="plano">Mensal</div>
  <div class="plano">Trimestral</div>
  <div class="plano">Semestral</div>
  <div class="plano">Anual</div>
</div>`, c`.plano { background: #ede9fe; padding: 16px; }

.planos {
  display: grid;
  gap: 16px;
}

@media (min-width: 600px) {
  .planos { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1000px) {
  .planos { grid-template-columns: repeat(4, 1fr); }
}`),
      teste: H + c`
var base = __regra(".planos");
__assert(base && base.st.display === "grid", "Falta a regra base .planos com display: grid (fora de media query).");
__assert(!base.st.gridTemplateColumns, "No padrão (celular), .planos não deve definir colunas: deixe 1 coluna.");
__assert(/16px/.test(base.st.gap || base.st.columnGap), "A regra base .planos deveria ter gap: 16px.");
var m6 = __regra(".planos", "min-width: 600px");
__assert(m6 && /repeat\(2,\s*1fr\)/.test(m6.st.gridTemplateColumns), "Falta @media (min-width: 600px) com .planos em repeat(2, 1fr).");
var m10 = __regra(".planos", "min-width: 1000px");
__assert(m10 && /repeat\(4,\s*1fr\)/.test(m10.st.gridTemplateColumns), "Falta @media (min-width: 1000px) com .planos em repeat(4, 1fr).");`
    },
    {
      tipo: "criar",
      titulo: "Menu que empilha no celular",
      enunciado: `O menu da pousada fica em linha no computador, mas no celular precisa empilhar. Na aba CSS:
        <ul>
          <li><code>.menu</code>: <code>display: flex</code> e <code>gap: 16px</code>;</li>
          <li>em telas de <b>até</b> <code>480px</code> (<code>max-width</code>): <code>.menu</code> com <code>flex-direction: column</code>
            e <code>.so-desktop</code> escondido (<code>display: none</code>).</li>
        </ul>`,
      dica: `<code>max-width</code> no media query significa “até esta largura”. Coloque as duas regras dentro do mesmo <code>@media</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<nav class="menu">
  <a href="#quartos">Quartos</a>
  <a href="#reservas">Reservas</a>
  <a href="#contato">Contato</a>
  <span class="so-desktop">📞 (48) 3333-4444</span>
</nav>`, c`/* Escreva o .menu e o media query para celular */
`),
      solucao: W(c`<nav class="menu">
  <a href="#quartos">Quartos</a>
  <a href="#reservas">Reservas</a>
  <a href="#contato">Contato</a>
  <span class="so-desktop">📞 (48) 3333-4444</span>
</nav>`, c`.menu {
  display: flex;
  gap: 16px;
}

@media (max-width: 480px) {
  .menu { flex-direction: column; }
  .so-desktop { display: none; }
}`),
      teste: H + c`
var base = __regra(".menu");
__assert(base && base.st.display === "flex", "Falta a regra .menu com display: flex (fora do media query).");
__assert(/16px/.test(base.st.gap || base.st.columnGap), "O .menu deveria ter gap: 16px.");
var m = __regra(".menu", "max-width: 480px");
__assert(m && m.st.flexDirection === "column", "Falta @media (max-width: 480px) com .menu em flex-direction: column.");
var s = __regra(".so-desktop", "max-width: 480px");
__assert(s && s.st.display === "none", "Dentro do @media (max-width: 480px), .so-desktop deveria ter display: none.");
__assert(!__regra(".so-desktop"), "Não esconda .so-desktop fora do media query: no computador ele deve aparecer.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  a1: [
    {
      tipo: "completar",
      titulo: "Botão com as cores da marca",
      enunciado: `As cores da marca da fintech estão em variáveis no <code>:root</code>. Substitua cada <code>____</code> para que o botão
        use a variável <code>--cor-primaria</code> no fundo e <code>--raio</code> nos cantos.`,
      dica: `Para ler uma variável, use a função <code>var(--nome)</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<button class="botao">Abrir conta</button>`, c`:root {
  --cor-primaria: #4f46e5;
  --raio: 12px;
}

.botao {
  background: ____(--cor-primaria);
  border-radius: var(____);
  color: white;
  border: none;
  padding: 12px 20px;
}`),
      solucao: W(c`<button class="botao">Abrir conta</button>`, c`:root {
  --cor-primaria: #4f46e5;
  --raio: 12px;
}

.botao {
  background: var(--cor-primaria);
  border-radius: var(--raio);
  color: white;
  border: none;
  padding: 12px 20px;
}`),
      teste: c`
__assert(__css(".botao", "backgroundColor") === "rgb(79, 70, 229)", "O fundo do botão deveria vir de --cor-primaria (#4f46e5), mas está " + __css(".botao", "backgroundColor"));
__assert(__css(".botao", "borderTopLeftRadius") === "12px", "Os cantos deveriam vir de --raio (12px).");
document.documentElement.style.setProperty("--cor-primaria", "#ff0000");
document.documentElement.style.setProperty("--raio", "3px");
var ok = __css(".botao", "backgroundColor") === "rgb(255, 0, 0)" && __css(".botao", "borderTopLeftRadius") === "3px";
document.documentElement.style.removeProperty("--cor-primaria");
document.documentElement.style.removeProperty("--raio");
__assert(ok, "O botão precisa LER as variáveis com var(): ao mudar a variável, o botão deve mudar junto.");`
    },
    {
      tipo: "completar",
      titulo: "Tema escuro por atributo",
      enunciado: `O sistema escolar troca de tema colocando <code>data-tema="escuro"</code> no <code>&lt;html&gt;</code>
        (via <code>document.documentElement.dataset.tema = "escuro"</code>). Substitua cada <code>____</code> para que, com esse atributo,
        as variáveis <code>--fundo</code> e <code>--texto</code> sejam redefinidas para <code>#0f172a</code> e <code>#e5e7eb</code>.`,
      dica: `Seletor de atributo: <code>[nome-do-atributo="valor"]</code>. O atributo no HTML é <code>data-tema</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Portal do Aluno</h1>
<p>Suas notas do 3º bimestre já estão disponíveis.</p>`, c`:root {
  --fundo: #ffffff;
  --texto: #111827;
}

[____="escuro"] {
  --fundo: ____;
  --texto: ____;
}

body {
  background: var(--fundo);
  color: var(--texto);
}`),
      solucao: W(c`<h1>Portal do Aluno</h1>
<p>Suas notas do 3º bimestre já estão disponíveis.</p>`, c`:root {
  --fundo: #ffffff;
  --texto: #111827;
}

[data-tema="escuro"] {
  --fundo: #0f172a;
  --texto: #e5e7eb;
}

body {
  background: var(--fundo);
  color: var(--texto);
}`),
      teste: c`
__assert(__css("body", "backgroundColor") === "rgb(255, 255, 255)", "Sem o atributo, o fundo deveria ser branco.");
document.documentElement.dataset.tema = "escuro";
var bg = __css("body", "backgroundColor"), tx = __css("body", "color");
delete document.documentElement.dataset.tema;
__assert(bg === "rgb(15, 23, 42)", "Com data-tema=\"escuro\", o fundo deveria ser #0f172a, mas está " + bg);
__assert(tx === "rgb(229, 231, 235)", "Com data-tema=\"escuro\", o texto deveria ser #e5e7eb, mas está " + tx);`
    },
    {
      tipo: "completar",
      titulo: "Alerta que muda de cor por escopo",
      enunciado: `No sistema de estoque, todo <code>.alerta</code> usa a variável <code>--cor-alerta</code> (azul por padrão) na borda e no texto.
        O alerta de perigo deve ser vermelho <b>sem repetir a borda e a cor</b>: só redefinindo a variável.
        Substitua cada <code>____</code> para que <code>.alerta--perigo</code> redefina <code>--cor-alerta</code> como <code>#dc2626</code>.`,
      dica: `Uma variável redefinida num elemento vale para ele e para os filhos. Escreva o nome da variável (com <code>--</code>) e o valor.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<p class="alerta">Inventário marcado para segunda-feira.</p>
<p class="alerta alerta--perigo">Produto “Arroz 5kg” com estoque zerado!</p>`, c`.alerta {
  --cor-alerta: #2563eb;
  border-left: 4px solid var(--cor-alerta);
  color: var(--cor-alerta);
  padding: 8px 12px;
}

.alerta--perigo {
  ____: ____;
}`),
      solucao: W(c`<p class="alerta">Inventário marcado para segunda-feira.</p>
<p class="alerta alerta--perigo">Produto “Arroz 5kg” com estoque zerado!</p>`, c`.alerta {
  --cor-alerta: #2563eb;
  border-left: 4px solid var(--cor-alerta);
  color: var(--cor-alerta);
  padding: 8px 12px;
}

.alerta--perigo {
  --cor-alerta: #dc2626;
}`),
      padroes: [[/\.alerta--perigo\s*\{\s*--cor-alerta\s*:\s*#dc2626\s*;?\s*\}/i, "Dentro de .alerta--perigo, escreva só a redefinição: --cor-alerta: #dc2626;"]],
      teste: c`
__assert(__css(".alerta", "color") === "rgb(37, 99, 235)", "O alerta comum deveria continuar azul (#2563eb).");
__assert(__css(".alerta--perigo", "color") === "rgb(220, 38, 38)", "O texto do alerta de perigo deveria ser #dc2626, mas está " + __css(".alerta--perigo", "color"));
__assert(__css(".alerta--perigo", "borderLeftColor") === "rgb(220, 38, 38)", "A borda do alerta de perigo deveria ser #dc2626.");`
    },
    {
      tipo: "criar",
      titulo: "Tokens da marca (white label)",
      enunciado: `O mesmo sistema de agendamento é vendido para vários salões; cada um tem suas cores. Na aba CSS:
        <ul>
          <li>no <code>:root</code>, crie <code>--cor-primaria: #0ea5e9</code>, <code>--cor-texto: #1f2937</code> e <code>--espaco: 16px</code>;</li>
          <li><code>.cabecalho</code>: fundo com <code>var(--cor-primaria)</code> e padding com <code>var(--espaco)</code>;</li>
          <li><code>.card</code>: cor do texto com <code>var(--cor-texto)</code>, padding com <code>var(--espaco)</code> e borda <code>1px solid var(--cor-primaria)</code>.</li>
        </ul>`,
      dica: `Declare as variáveis uma vez no <code>:root</code> e use <code>var(--nome)</code> em todos os lugares; nada de repetir o código da cor.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<header class="cabecalho">Salão Bela Vida</header>
<div class="card">Próximo horário livre: hoje, 15h30</div>`, c`/* Crie as variáveis no :root e use-as em .cabecalho e .card */
`),
      solucao: W(c`<header class="cabecalho">Salão Bela Vida</header>
<div class="card">Próximo horário livre: hoje, 15h30</div>`, c`:root {
  --cor-primaria: #0ea5e9;
  --cor-texto: #1f2937;
  --espaco: 16px;
}

.cabecalho {
  background: var(--cor-primaria);
  padding: var(--espaco);
}

.card {
  color: var(--cor-texto);
  padding: var(--espaco);
  border: 1px solid var(--cor-primaria);
}`),
      teste: c`
var raiz = getComputedStyle(document.documentElement);
__assert(raiz.getPropertyValue("--cor-primaria").trim().toLowerCase() === "#0ea5e9", "No :root, --cor-primaria deveria ser #0ea5e9.");
__assert(raiz.getPropertyValue("--cor-texto").trim().toLowerCase() === "#1f2937", "No :root, --cor-texto deveria ser #1f2937.");
__assert(raiz.getPropertyValue("--espaco").trim() === "16px", "No :root, --espaco deveria ser 16px.");
__assert(__css(".cabecalho", "backgroundColor") === "rgb(14, 165, 233)", "O .cabecalho deveria ter fundo #0ea5e9.");
__assert(__css(".card", "color") === "rgb(31, 41, 55)", "O .card deveria ter texto #1f2937.");
__assert(__css(".card", "borderTopColor") === "rgb(14, 165, 233)" && __css(".card", "borderTopWidth") === "1px", "O .card deveria ter borda 1px solid na cor primária.");
var st = document.documentElement.style;
st.setProperty("--cor-primaria", "#7c3aed"); st.setProperty("--cor-texto", "#000000"); st.setProperty("--espaco", "5px");
var r = [__css(".cabecalho", "backgroundColor"), __css(".card", "borderTopColor"), __css(".card", "color"), __css(".cabecalho", "paddingTop"), __css(".card", "paddingLeft")];
st.removeProperty("--cor-primaria"); st.removeProperty("--cor-texto"); st.removeProperty("--espaco");
__assert(r[0] === "rgb(124, 58, 237)" && r[1] === "rgb(124, 58, 237)", "O fundo do .cabecalho e a borda do .card precisam usar var(--cor-primaria).");
__assert(r[2] === "rgb(0, 0, 0)", "A cor do texto do .card precisa usar var(--cor-texto).");
__assert(r[3] === "5px" && r[4] === "5px", "O padding do .cabecalho e do .card precisam usar var(--espaco).");`
    },
    {
      tipo: "criar",
      titulo: "Botão de modo escuro completo",
      enunciado: `O app da padaria já tem um botão que coloca/tira <code>data-tema="escuro"</code> no <code>&lt;html&gt;</code> (veja a aba JS).
        Na aba CSS, crie o tema:
        <ul>
          <li><code>:root</code>: <code>--fundo: #ffffff</code>, <code>--texto: #111827</code>, <code>--cartao: #f3f4f6</code>;</li>
          <li><code>[data-tema="escuro"]</code>: <code>--fundo: #0f172a</code>, <code>--texto: #e5e7eb</code>, <code>--cartao: #1e293b</code>;</li>
          <li><code>body</code> usa <code>--fundo</code> no fundo e <code>--texto</code> na cor; <code>.cartao</code> usa <code>--cartao</code> no fundo.</li>
        </ul>`,
      dica: `Só as variáveis mudam no tema escuro; as regras de <code>body</code> e <code>.cartao</code> são escritas uma vez só, com <code>var()</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<button id="tema">Alternar tema</button>
<div class="cartao">Pão de queijo saindo às 16h!</div>`, c`/* Crie as variáveis dos dois temas e use-as em body e .cartao */
`, c`document.getElementById("tema").addEventListener("click", function () {
  var raiz = document.documentElement;
  if (raiz.dataset.tema === "escuro") delete raiz.dataset.tema;
  else raiz.dataset.tema = "escuro";
});`),
      solucao: W(c`<button id="tema">Alternar tema</button>
<div class="cartao">Pão de queijo saindo às 16h!</div>`, c`:root {
  --fundo: #ffffff;
  --texto: #111827;
  --cartao: #f3f4f6;
}

[data-tema="escuro"] {
  --fundo: #0f172a;
  --texto: #e5e7eb;
  --cartao: #1e293b;
}

body {
  background: var(--fundo);
  color: var(--texto);
}

.cartao {
  background: var(--cartao);
}`, c`document.getElementById("tema").addEventListener("click", function () {
  var raiz = document.documentElement;
  if (raiz.dataset.tema === "escuro") delete raiz.dataset.tema;
  else raiz.dataset.tema = "escuro";
});`),
      padroes: [[/var\(\s*--fundo\s*\)/, "O body deve usar var(--fundo)."], [/var\(\s*--cartao\s*\)/, "O .cartao deve usar var(--cartao)."]],
      teste: c`
__assert(__css("body", "backgroundColor") === "rgb(255, 255, 255)", "No tema claro, o fundo do body deveria ser #ffffff.");
__assert(__css("body", "color") === "rgb(17, 24, 39)", "No tema claro, o texto deveria ser #111827.");
__assert(__css(".cartao", "backgroundColor") === "rgb(243, 244, 246)", "No tema claro, o .cartao deveria ter fundo #f3f4f6.");
__botao("Alternar tema").click();
await __esperar();
var bg = __css("body", "backgroundColor"), tx = __css("body", "color"), ca = __css(".cartao", "backgroundColor");
__botao("Alternar tema").click();
__assert(bg === "rgb(15, 23, 42)", "No tema escuro, o fundo deveria ser #0f172a, mas está " + bg);
__assert(tx === "rgb(229, 231, 235)", "No tema escuro, o texto deveria ser #e5e7eb, mas está " + tx);
__assert(ca === "rgb(30, 41, 59)", "No tema escuro, o .cartao deveria ter fundo #1e293b, mas está " + ca);`
    }
  ],

  /* ------------------------------------------------------------------ */
  a2: [
    {
      tipo: "completar",
      titulo: "Card que sobe no hover",
      enunciado: `Na vitrine da loja, o card deve <b>subir 4px suavemente</b> quando o mouse passa em cima.
        Substitua cada <code>____</code>: a transição deve animar a propriedade <code>transform</code> em <code>.2s</code>,
        e no hover o card deve ser movido <code>-4px</code> no eixo Y.`,
      dica: `Mover verticalmente com transform: <code>translateY(...)</code>. A transição vai no estado normal, não no hover.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="card">Fone sem fio — R$ 199,00</div>`, c`.card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  transition: ____ .2s ease;
}

.card:hover {
  transform: ____(-4px);
}`),
      solucao: W(c`<div class="card">Fone sem fio — R$ 199,00</div>`, c`.card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  transition: transform .2s ease;
}

.card:hover {
  transform: translateY(-4px);
}`),
      teste: H + c`
__assert(__css(".card", "transitionProperty") === "transform", "A transição deveria animar transform, mas anima " + __css(".card", "transitionProperty"));
__assert(__css(".card", "transitionDuration") === "0.2s", "A transição deveria durar 0.2s, mas dura " + __css(".card", "transitionDuration"));
var r = __regra(".card:hover");
__assert(r && /translateY\(\s*-4px\s*\)/.test(r.st.transform), "No .card:hover, use transform: translateY(-4px).");`
    },
    {
      tipo: "completar",
      titulo: "Spinner de carregamento",
      enunciado: `Enquanto o pedido é enviado, o app mostra um círculo girando. Substitua cada <code>____</code>:
        <ul>
          <li>dê o nome <code>girar</code> à animação em <code>@keyframes</code>;</li>
          <li>a animação deve ter velocidade <b>constante</b> (sem acelerar/desacelerar).</li>
        </ul>`,
      dica: `O nome depois de <code>@keyframes</code> é o mesmo usado em <code>animation</code>. Velocidade constante é <code>linear</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="carregando"></div>
<p>Enviando pedido...</p>`, c`@keyframes ____ {
  to { transform: rotate(360deg); }
}

.carregando {
  width: 32px;
  height: 32px;
  border: 4px solid #ddd;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: girar 1s ____ infinite;
}`),
      solucao: W(c`<div class="carregando"></div>
<p>Enviando pedido...</p>`, c`@keyframes girar {
  to { transform: rotate(360deg); }
}

.carregando {
  width: 32px;
  height: 32px;
  border: 4px solid #ddd;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: girar 1s linear infinite;
}`),
      teste: H + c`
__assert(__keyframes("girar"), "Não encontrei @keyframes girar.");
__assert(__css(".carregando", "animationName") === "girar", "O .carregando deveria usar a animação girar.");
__assert(__css(".carregando", "animationTimingFunction") === "linear", "A velocidade deveria ser linear, mas é " + __css(".carregando", "animationTimingFunction"));
__assert(__css(".carregando", "animationIterationCount") === "infinite", "A animação deveria repetir para sempre (infinite).");`
    },
    {
      tipo: "completar",
      titulo: "Respeitando quem não quer movimento",
      enunciado: `Algumas pessoas sentem enjoo com animações e ativam “reduzir movimento” no sistema.
        Substitua o <code>____</code> pela característica de mídia que detecta essa preferência, para desligar animações e transições.`,
      dica: `Assim como <code>prefers-color-scheme</code>, esta também começa com <code>prefers-</code> e fala de “movimento reduzido”.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="banner">Black Friday: até 70% OFF!</div>`, c`@keyframes pulsar {
  50% { transform: scale(1.05); }
}

.banner {
  padding: 16px;
  background: #111;
  color: #facc15;
  animation: pulsar 1s ease-in-out infinite;
}

@media (____: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}`),
      solucao: W(c`<div class="banner">Black Friday: até 70% OFF!</div>`, c`@keyframes pulsar {
  50% { transform: scale(1.05); }
}

.banner {
  padding: 16px;
  background: #111;
  color: #facc15;
  animation: pulsar 1s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}`),
      teste: H + c`
var r = __regra("*", "prefers-reduced-motion: reduce");
__assert(r, "Não encontrei a regra * dentro de @media (prefers-reduced-motion: reduce).");
__assert(r.st.getPropertyValue("animation-name") === "none" && r.st.getPropertyPriority("animation-name") === "important", "Dentro do media query, mantenha animation: none !important.");
__assert(__css(".banner", "animationName") === "pulsar", "Para quem não pediu movimento reduzido, o banner continua animado.");`
    },
    {
      tipo: "criar",
      titulo: "Botão com transição de cor",
      enunciado: `O botão “Agendar” da clínica deve mudar de cor <b>suavemente</b>. Na aba CSS:
        <ul>
          <li><code>.botao</code>: fundo <code>#2563eb</code>, texto branco e transição de <code>background-color</code> em <code>0.3s</code> com <code>ease</code>;</li>
          <li><code>.botao:hover</code>: fundo <code>#1d4ed8</code>.</li>
        </ul>`,
      dica: `<code>transition: propriedade duração curva;</code>. A transição fica no <code>.botao</code> (estado normal), para valer na ida e na volta.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<button class="botao">Agendar</button>`, c`/* Estilize .botao e .botao:hover */
`),
      solucao: W(c`<button class="botao">Agendar</button>`, c`.botao {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  transition: background-color 0.3s ease;
}

.botao:hover {
  background: #1d4ed8;
}`),
      teste: H + c`
__assert(__css(".botao", "backgroundColor") === "rgb(37, 99, 235)", "O .botao deveria ter fundo #2563eb.");
__assert(__css(".botao", "color") === "rgb(255, 255, 255)", "O texto do .botao deveria ser branco.");
var p = __css(".botao", "transitionProperty");
__assert(p === "background-color" || p === "background", "A transição deveria ser de background-color, mas é " + p);
__assert(__css(".botao", "transitionDuration") === "0.3s", "A transição deveria durar 0.3s, mas dura " + __css(".botao", "transitionDuration"));
__assert(__css(".botao", "transitionTimingFunction") === "ease", "A curva da transição deveria ser ease.");
var r = __regra(".botao:hover");
__assert(r && __cor(r.st.backgroundColor) === "rgb(29, 78, 216)", "No .botao:hover, o fundo deveria ser #1d4ed8.");`
    },
    {
      tipo: "criar",
      titulo: "Notificação que aparece deslizando",
      enunciado: `Quando um pagamento é aprovado, a notificação deve surgir descendo e aparecendo aos poucos. Na aba CSS:
        <ul>
          <li>crie <code>@keyframes aparecer</code> que vai <code>from</code> (opacity 0 e <code>transform: translateY(-10px)</code>)
            <code>to</code> (opacity 1 e <code>transform: translateY(0)</code>);</li>
          <li><code>.notificacao</code>: <code>animation: aparecer 0.5s ease-out forwards</code>.</li>
        </ul>`,
      dica: `<code>forwards</code> faz o elemento <b>ficar</b> no estado final depois que a animação acaba.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="notificacao">✅ Pagamento de R$ 89,90 aprovado</div>`, c`.notificacao {
  padding: 12px 16px;
  background: #dcfce7;
  border-radius: 8px;
}

/* Crie o @keyframes aparecer e aplique no .notificacao */
`),
      solucao: W(c`<div class="notificacao">✅ Pagamento de R$ 89,90 aprovado</div>`, c`.notificacao {
  padding: 12px 16px;
  background: #dcfce7;
  border-radius: 8px;
  animation: aparecer 0.5s ease-out forwards;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`),
      teste: H + c`
var k = __keyframes("aparecer");
__assert(k, "Não encontrei @keyframes aparecer.");
var ini = k.findRule("0%") || k.findRule("from"), fim = k.findRule("100%") || k.findRule("to");
__assert(ini && fim, "O @keyframes aparecer precisa de from e to.");
__assert(ini.style.opacity === "0" && /translateY\(\s*-10px\s*\)/.test(ini.style.transform), "No from: opacity 0 e transform: translateY(-10px).");
__assert(fim.style.opacity === "1" && /translateY\(\s*0(px)?\s*\)/.test(fim.style.transform), "No to: opacity 1 e transform: translateY(0).");
__assert(__css(".notificacao", "animationName") === "aparecer", "O .notificacao deveria usar a animação aparecer.");
__assert(__css(".notificacao", "animationDuration") === "0.5s", "A animação deveria durar 0.5s.");
__assert(__css(".notificacao", "animationTimingFunction") === "ease-out", "A curva deveria ser ease-out.");
__assert(__css(".notificacao", "animationFillMode") === "forwards", "Use forwards para manter o estado final.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  a3: [
    {
      tipo: "completar",
      titulo: "Seletores no padrão BEM",
      enunciado: `O card de curso usa BEM: o bloco é <code>card</code>, os elementos são <code>titulo</code> e <code>botao</code>,
        e o botão de destaque tem o modificador <code>destaque</code>. Veja as classes no HTML e substitua cada <code>____</code> pelo
        <b>seletor de classe BEM</b> certo:
        <ul>
          <li>primeiro: o título do card (fonte de <code>1.25rem</code>);</li>
          <li>segundo: o botão com modificador de destaque (fundo <code>#f59e0b</code>).</li>
        </ul>`,
      dica: `BEM: <code>bloco__elemento--modificador</code>. Elemento usa dois sublinhados; modificador, dois hífens.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="card">
  <h3 class="card__titulo">Excel para o trabalho</h3>
  <button class="card__botao">Detalhes</button>
  <button class="card__botao card__botao--destaque">Matricular</button>
</div>`, c`.card {
  border: 1px solid #e5e7eb;
  padding: 16px;
}

____ {
  font-size: 1.25rem;
}

.card__botao {
  background: #e5e7eb;
  border: none;
  padding: 8px 12px;
}

____ {
  background: #f59e0b;
}`),
      solucao: W(c`<div class="card">
  <h3 class="card__titulo">Excel para o trabalho</h3>
  <button class="card__botao">Detalhes</button>
  <button class="card__botao card__botao--destaque">Matricular</button>
</div>`, c`.card {
  border: 1px solid #e5e7eb;
  padding: 16px;
}

.card__titulo {
  font-size: 1.25rem;
}

.card__botao {
  background: #e5e7eb;
  border: none;
  padding: 8px 12px;
}

.card__botao--destaque {
  background: #f59e0b;
}`),
      padroes: [[/\.card__titulo\s*\{/, "Use o seletor de classe BEM .card__titulo."], [/\.card__botao--destaque\s*\{/, "Use o seletor de classe BEM .card__botao--destaque."]],
      teste: c`
__assert(__css(".card__titulo", "fontSize") === "20px", "O título deveria ter 1.25rem (20px), mas tem " + __css(".card__titulo", "fontSize"));
__assert(__css(".card__botao--destaque", "backgroundColor") === "rgb(245, 158, 11)", "O botão de destaque deveria ter fundo #f59e0b.");
__assert(__botao("Detalhes") && getComputedStyle(__botao("Detalhes")).backgroundColor === "rgb(229, 231, 235)", "O botão comum deve continuar cinza (#e5e7eb).");`
    },
    {
      tipo: "completar",
      titulo: "Aplicando os modificadores",
      enunciado: `O CSS dos botões do sistema financeiro já existe (veja a aba CSS). Agora, no HTML, substitua cada <code>____</code>
        pela classe <b>modificadora</b> certa: “Salvar” deve ser o botão primário e “Excluir” o botão de perigo.`,
      dica: `Mantenha a classe base <code>botao</code> e acrescente o modificador ao lado, separado por espaço.`,
      lang: "web",
      aba: "html",
      inicial: W(c`<button class="botao ____">Salvar</button>
<button class="botao ____">Excluir</button>
<button class="botao">Voltar</button>`, c`.botao {
  background: #e5e7eb;
  color: #111827;
  border: none;
  padding: 8px 14px;
}

.botao--primario {
  background: #2563eb;
  color: white;
}

.botao--perigo {
  background: #dc2626;
  color: white;
}`),
      solucao: W(c`<button class="botao botao--primario">Salvar</button>
<button class="botao botao--perigo">Excluir</button>
<button class="botao">Voltar</button>`, c`.botao {
  background: #e5e7eb;
  color: #111827;
  border: none;
  padding: 8px 14px;
}

.botao--primario {
  background: #2563eb;
  color: white;
}

.botao--perigo {
  background: #dc2626;
  color: white;
}`),
      teste: c`
var s = __botao("Salvar"), e = __botao("Excluir"), v = __botao("Voltar");
__assert(s.classList.contains("botao") && e.classList.contains("botao"), "Mantenha a classe base botao nos dois botões.");
__assert(getComputedStyle(s).backgroundColor === "rgb(37, 99, 235)", "O botão Salvar deveria ser o primário (azul).");
__assert(getComputedStyle(e).backgroundColor === "rgb(220, 38, 38)", "O botão Excluir deveria ser o de perigo (vermelho).");
__assert(getComputedStyle(v).backgroundColor === "rgb(229, 231, 235)", "O botão Voltar deve continuar cinza.");`
    },
    {
      tipo: "completar",
      titulo: "Trocando o seletor longo por BEM",
      enunciado: `Antes, o menu usava o seletor <code>#menu ul li a.link</code>, tão forte que o link ativo nunca ficava azul.
        Substitua o <code>____</code> por um <b>seletor de uma classe só</b>, no padrão BEM, que pegue todos os links do menu
        (veja as classes no HTML). Sem ids e sem <code>!important</code>.`,
      dica: `Com especificidade igual (uma classe contra uma classe), vence a regra que vem <b>por último</b>. O link ativo já tem a classe do link comum.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<nav class="menu">
  <a class="menu__link" href="#">Extrato</a>
  <a class="menu__link menu__link--ativo" href="#">Pagamentos</a>
  <a class="menu__link" href="#">Investimentos</a>
</nav>`, c`____ {
  color: #334155;
  text-decoration: none;
}

.menu__link--ativo {
  color: #2563eb;
  font-weight: bold;
}`),
      solucao: W(c`<nav class="menu">
  <a class="menu__link" href="#">Extrato</a>
  <a class="menu__link menu__link--ativo" href="#">Pagamentos</a>
  <a class="menu__link" href="#">Investimentos</a>
</nav>`, c`.menu__link {
  color: #334155;
  text-decoration: none;
}

.menu__link--ativo {
  color: #2563eb;
  font-weight: bold;
}`),
      padroes: [[/^(?![\s\S]*#menu)/, "Não use o id #menu: troque por uma classe BEM."], [/^(?![\s\S]*!important)/, "Não use !important."], [/\.menu__link\s*\{/, "Use o seletor de classe .menu__link."]],
      teste: c`
var a = document.querySelectorAll(".menu__link");
__assert(getComputedStyle(a[0]).color === "rgb(51, 65, 85)", "Os links comuns deveriam ter a cor #334155.");
__assert(getComputedStyle(a[0]).textDecorationLine === "none", "Os links não deveriam ter sublinhado.");
__assert(getComputedStyle(a[1]).color === "rgb(37, 99, 235)", "O link ativo deveria ficar azul (#2563eb), mas está " + getComputedStyle(a[1]).color);`
    },
    {
      tipo: "criar",
      titulo: "Componente de produto em BEM",
      enunciado: `O HTML do card de produto do mercado já usa nomes BEM. Escreva o CSS usando <b>só seletores de uma classe</b>:
        <ul>
          <li><code>.produto</code>: borda <code>1px solid #e5e7eb</code> e <code>padding: 12px</code>;</li>
          <li><code>.produto__nome</code>: negrito;</li>
          <li><code>.produto__preco</code>: cor <code>#16a34a</code>;</li>
          <li><code>.produto--esgotado</code>: <code>opacity: 0.5</code> (o card inteiro fica apagado).</li>
        </ul>`,
      dica: `O modificador vai no <b>bloco</b> (<code>class="produto produto--esgotado"</code>), então a regra <code>.produto--esgotado</code> afeta o card todo.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<div class="produto">
  <p class="produto__nome">Café 500g</p>
  <p class="produto__preco">R$ 18,90</p>
</div>
<div class="produto produto--esgotado">
  <p class="produto__nome">Azeite 500ml</p>
  <p class="produto__preco">R$ 39,90</p>
</div>`, c`/* Escreva as regras BEM do produto */
`),
      solucao: W(c`<div class="produto">
  <p class="produto__nome">Café 500g</p>
  <p class="produto__preco">R$ 18,90</p>
</div>
<div class="produto produto--esgotado">
  <p class="produto__nome">Azeite 500ml</p>
  <p class="produto__preco">R$ 39,90</p>
</div>`, c`.produto {
  border: 1px solid #e5e7eb;
  padding: 12px;
}

.produto__nome {
  font-weight: bold;
}

.produto__preco {
  color: #16a34a;
}

.produto--esgotado {
  opacity: 0.5;
}`),
      padroes: [[/^(?![\s\S]*#[a-z_-]+\s*\{)/i, "Não use seletores de id: só classes BEM."], [/^(?![\s\S]*!important)/, "Não use !important."]],
      teste: c`
var p = document.querySelectorAll(".produto");
__assert(getComputedStyle(p[0]).borderTopWidth === "1px" && getComputedStyle(p[0]).borderTopStyle === "solid" && getComputedStyle(p[0]).borderTopColor === "rgb(229, 231, 235)", "O .produto deveria ter borda 1px solid #e5e7eb.");
__assert(getComputedStyle(p[0]).paddingTop === "12px", "O .produto deveria ter padding de 12px.");
var w = __css(".produto__nome", "fontWeight");
__assert(w === "700" || w === "bold", "O .produto__nome deveria estar em negrito.");
__assert(__css(".produto__preco", "color") === "rgb(22, 163, 74)", "O .produto__preco deveria ter cor #16a34a.");
__assert(getComputedStyle(p[0]).opacity === "1", "O produto disponível não deve ficar apagado.");
__assert(getComputedStyle(p[1]).opacity === "0.5", "O .produto--esgotado deveria ter opacity 0.5, mas tem " + getComputedStyle(p[1]).opacity);`
    },
    {
      tipo: "criar",
      titulo: "Vencendo pela especificidade certa",
      enunciado: `No portal da transportadora, já existe a regra <code>nav a</code> (duas tags) deixando os links cinza.
        Sem mexer nela, sem ids e sem <code>!important</code>, crie:
        <ul>
          <li><code>.menu__link--destaque</code>: cor <code>#ea580c</code> e negrito;</li>
          <li><code>.menu__link:hover</code>: sublinhado (<code>text-decoration: underline</code>).</li>
        </ul>
        Uma classe (0,1,0) vence duas tags (0,0,2), mesmo que a regra das tags venha depois.`,
      dica: `Some a especificidade: cada classe ou pseudo-classe vale 10, cada tag vale 1 (forma simplificada).`,
      lang: "web",
      aba: "css",
      inicial: W(c`<nav>
  <a class="menu__link" href="#">Rastrear encomenda</a>
  <a class="menu__link menu__link--destaque" href="#">Cotar frete</a>
</nav>`, c`/* Escreva suas regras aqui (acima da regra nav a, de propósito) */


nav a {
  color: #64748b;
  text-decoration: none;
}`),
      solucao: W(c`<nav>
  <a class="menu__link" href="#">Rastrear encomenda</a>
  <a class="menu__link menu__link--destaque" href="#">Cotar frete</a>
</nav>`, c`.menu__link--destaque {
  color: #ea580c;
  font-weight: bold;
}

.menu__link:hover {
  text-decoration: underline;
}

nav a {
  color: #64748b;
  text-decoration: none;
}`),
      padroes: [[/^(?![\s\S]*!important)/, "Não use !important."], [/^(?![\s\S]*#[a-z_-]+[^{};]*\{)/i, "Não use seletores de id."], [/nav a\s*\{\s*color:\s*#64748b/, "Não mexa na regra nav a."]],
      teste: H + c`
var a = document.querySelectorAll("nav a");
__assert(getComputedStyle(a[0]).color === "rgb(100, 116, 139)", "O link comum deve continuar cinza (#64748b).");
__assert(getComputedStyle(a[1]).color === "rgb(234, 88, 12)", "O link de destaque deveria ficar laranja (#ea580c), mas está " + getComputedStyle(a[1]).color);
var w = getComputedStyle(a[1]).fontWeight;
__assert(w === "700" || w === "bold", "O link de destaque deveria estar em negrito.");
var r = __regra(".menu__link:hover");
__assert(r && /underline/.test(r.st.textDecoration || r.st.textDecorationLine), "Falta .menu__link:hover com text-decoration: underline.");`
    }
  ],

  /* ------------------------------------------------------------------ */
  /* Nível Iniciante                                                     */
  /* ------------------------------------------------------------------ */
  p1: [
    {
      tipo: "completar",
      titulo: "A tag style da padaria",
      enunciado: `A página da Padaria Pão Quente está “sem roupa”. O CSS já foi escrito dentro do <code>&lt;head&gt;</code>, mas faltou o nome da tag que guarda o CSS.
        Clique em cada retângulo e escreva o que falta para que o título <code>&lt;h1&gt;</code> fique azul.`,
      dica: `A tag que guarda CSS dentro da página se chama “estilo” em inglês. Ela abre e fecha com o mesmo nome.`,
      lang: "web",
      aba: "html",
      inicial: W(c`<html>
<head>
  <____>
    h1 { color: blue; }
  </____>
</head>
<body>
  <h1>Padaria Pão Quente</h1>
  <p>Pão francês fresquinho todo dia.</p>
</body>
</html>`, c``),
      solucao: W(c`<html>
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>
<body>
  <h1>Padaria Pão Quente</h1>
  <p>Pão francês fresquinho todo dia.</p>
</body>
</html>`, c``),
      teste: c`
var estilos = document.querySelectorAll("head style");
var achou = false;
for (var i = 0; i < estilos.length; i++) { if (estilos[i].textContent.indexOf("h1") >= 0) achou = true; }
__assert(achou, "Não encontrei uma tag <style> com o CSS dentro do <head>. Confira o nome da tag nos dois retângulos.");
var cor = __css("h1", "color");
__assert(cor === "rgb(0, 0, 255)", "O título deveria estar azul (blue), mas está " + cor);`
    },
    {
      tipo: "completar",
      titulo: "Ligando o arquivo estilo.css",
      enunciado: `O CSS da Loja da Esquina está num arquivo separado chamado <code>estilo.css</code>, na mesma pasta do HTML.
        Clique em cada retângulo e escreva o que falta na tag <code>&lt;link&gt;</code> para o navegador buscar esse arquivo:
        <ul>
          <li>no <code>rel</code>: o tipo do arquivo (folha de estilo);</li>
          <li>no <code>href</code>: o nome exato do arquivo.</li>
        </ul>`,
      dica: `Folha de estilo em inglês é <i>stylesheet</i>. O <code>href</code> recebe o nome do arquivo com o final <code>.css</code>.`,
      lang: "web",
      aba: "html",
      inicial: W(c`<html>
<head>
  <link rel="____" href="____">
</head>
<body>
  <h1>Loja da Esquina</h1>
  <p>Roupas e acessórios.</p>
</body>
</html>`, c``),
      solucao: W(c`<html>
<head>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <h1>Loja da Esquina</h1>
  <p>Roupas e acessórios.</p>
</body>
</html>`, c``),
      teste: c`
var lk = document.querySelector("head link");
__assert(lk, "Não encontrei a tag <link> dentro do <head>.");
__assert((lk.getAttribute("rel") || "").trim().toLowerCase() === "stylesheet", "O rel deveria ser stylesheet, mas está \"" + lk.getAttribute("rel") + "\".");
__assert((lk.getAttribute("href") || "").trim() === "estilo.css", "O href deveria ser estilo.css (o nome exato do arquivo), mas está \"" + lk.getAttribute("href") + "\".");`,
      notaVerificacao: "Aqui no sandbox não existe o arquivo estilo.css de verdade, então a página não muda de cor. No seu computador, com os dois arquivos na mesma pasta, o navegador busca o estilo.css e aplica o CSS."
    },
    {
      tipo: "completar",
      titulo: "Vestindo a página da padaria",
      enunciado: `O HTML da padaria já está pronto e o CSS fica na aba CSS (é como se fosse o arquivo <code>estilo.css</code>).
        Clique em cada retângulo e escreva o que falta para que:
        <ul>
          <li>o fundo da página (<code>body</code>) fique <code>lightyellow</code>;</li>
          <li>o título <code>&lt;h1&gt;</code> fique com a letra <code>brown</code> (marrom).</li>
        </ul>`,
      dica: `Escreva só o nome da cor, em inglês, do jeitinho que está no enunciado.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Padaria Pão Quente</h1>
<p>Pão francês fresquinho todo dia.</p>`, c`body { background-color: ____; }
h1 { color: ____; }`),
      solucao: W(c`<h1>Padaria Pão Quente</h1>
<p>Pão francês fresquinho todo dia.</p>`, c`body { background-color: lightyellow; }
h1 { color: brown; }`),
      teste: c`
var f = __css("body", "backgroundColor");
__assert(f === "rgb(255, 255, 224)", "O fundo da página deveria ser lightyellow, mas está " + f);
var t = __css("h1", "color");
__assert(t === "rgb(165, 42, 42)", "O título deveria estar brown (marrom), mas está " + t);`
    },
    {
      tipo: "criar",
      titulo: "Escreva a tag style do zero",
      enunciado: `A página do Mercadinho Bom Preço não tem nenhum CSS. Na aba HTML, dentro do <code>&lt;head&gt;</code>, escreva uma tag <code>&lt;style&gt;</code> (abrindo e fechando) com uma regra que deixe o título <code>&lt;h1&gt;</code> com a letra <code>red</code> (vermelha).`,
      dica: `Abra com <code>&lt;style&gt;</code>, escreva <code>h1 { color: red; }</code> e feche com <code>&lt;/style&gt;</code>. Tudo entre <code>&lt;head&gt;</code> e <code>&lt;/head&gt;</code>.`,
      lang: "web",
      aba: "html",
      inicial: W(c`<html>
<head>
  <!-- escreva a tag style aqui -->
</head>
<body>
  <h1>Mercadinho Bom Preço</h1>
  <p>Ofertas toda semana.</p>
</body>
</html>`, c``),
      solucao: W(c`<html>
<head>
  <style>
    h1 { color: red; }
  </style>
</head>
<body>
  <h1>Mercadinho Bom Preço</h1>
  <p>Ofertas toda semana.</p>
</body>
</html>`, c``),
      teste: c`
var estilos = document.querySelectorAll("head style");
var achou = false;
for (var i = 0; i < estilos.length; i++) { if (estilos[i].textContent.indexOf("h1") >= 0) achou = true; }
__assert(achou, "Não encontrei uma tag <style> com a regra do h1 dentro do <head>.");
var cor = __css("h1", "color");
__assert(cor === "rgb(255, 0, 0)", "O título deveria estar vermelho (red), mas está " + cor);`
    },
    {
      tipo: "criar",
      titulo: "Ligue o arquivo loja.css",
      enunciado: `O site da Sapataria Passo Certo guarda o CSS num arquivo chamado <code>loja.css</code>, na mesma pasta do HTML.
        Na aba HTML, dentro do <code>&lt;head&gt;</code>, escreva a tag <code>&lt;link&gt;</code> que manda o navegador buscar esse arquivo.`,
      dica: `A tag tem dois atributos: <code>rel="stylesheet"</code> e <code>href</code> com o nome do arquivo.`,
      lang: "web",
      aba: "html",
      inicial: W(c`<html>
<head>
  <!-- ligue o arquivo loja.css aqui -->
</head>
<body>
  <h1>Sapataria Passo Certo</h1>
  <p>Sapatos, tênis e sandálias.</p>
</body>
</html>`, c``),
      solucao: W(c`<html>
<head>
  <link rel="stylesheet" href="loja.css">
</head>
<body>
  <h1>Sapataria Passo Certo</h1>
  <p>Sapatos, tênis e sandálias.</p>
</body>
</html>`, c``),
      teste: c`
var lk = document.querySelector("head link");
__assert(lk, "Não encontrei a tag <link> dentro do <head>.");
__assert((lk.getAttribute("rel") || "").trim().toLowerCase() === "stylesheet", "O rel deveria ser stylesheet, mas está \"" + lk.getAttribute("rel") + "\".");
__assert((lk.getAttribute("href") || "").trim() === "loja.css", "O href deveria ser loja.css, mas está \"" + lk.getAttribute("href") + "\".");`,
      notaVerificacao: "No sandbox o arquivo loja.css não existe de verdade, por isso a aparência não muda. No seu computador, com os dois arquivos na mesma pasta, o estilo seria aplicado."
    }
  ],

  /* ------------------------------------------------------------------ */
  p2: [
    {
      tipo: "completar",
      titulo: "Seletor e propriedade do cardápio",
      enunciado: `No cardápio da lanchonete, o título é um <code>&lt;h1&gt;</code> e a frase é um <code>&lt;p&gt;</code>.
        Clique em cada retângulo e escreva o que falta para que:
        <ul>
          <li>o <b>seletor</b> da primeira regra pegue o título <code>&lt;h1&gt;</code>;</li>
          <li>a <b>propriedade</b> da segunda regra mude a cor da letra do parágrafo.</li>
        </ul>`,
      dica: `O seletor de tag é o nome da tag sem os sinais <code>&lt; &gt;</code>. A propriedade da cor da letra é em inglês.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Cardápio da Lanchonete</h1>
<p>Escolha seu lanche favorito.</p>`, c`____ { color: red; }

p { ____: gray; }`),
      solucao: W(c`<h1>Cardápio da Lanchonete</h1>
<p>Escolha seu lanche favorito.</p>`, c`h1 { color: red; }

p { color: gray; }`),
      teste: c`
var h = __css("h1", "color");
__assert(h === "rgb(255, 0, 0)", "O título h1 deveria estar vermelho, mas está " + h + ". Confira o seletor da primeira regra.");
var p = __css("p", "color");
__assert(p === "rgb(128, 128, 128)", "O parágrafo deveria estar cinza (gray), mas está " + p + ". Confira a propriedade da segunda regra.");`
    },
    {
      tipo: "completar",
      titulo: "As chaves da lista de lanches",
      enunciado: `A regra dos itens da lista (<code>&lt;li&gt;</code>) perdeu as chaves que abrem e fecham a “caixinha” de ordens.
        Clique em cada retângulo e escreva o símbolo que falta para os itens ficarem verde-escuros.`,
      dica: `A caixinha de ordens abre com <code>{</code> e fecha com <code>}</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<ul>
  <li>X-salada</li>
  <li>Misto quente</li>
  <li>Pão de queijo</li>
</ul>`, c`li ____
  color: darkgreen;
____`),
      solucao: W(c`<ul>
  <li>X-salada</li>
  <li>Misto quente</li>
  <li>Pão de queijo</li>
</ul>`, c`li {
  color: darkgreen;
}`),
      teste: c`
var cor = __css("li", "color");
__assert(cor === "rgb(0, 100, 0)", "Os itens da lista deveriam estar verde-escuros (darkgreen), mas estão " + cor + ". Confira se as chaves abrem { e fecham }.");`
    },
    {
      tipo: "completar",
      titulo: "Dois-pontos e ponto e vírgula",
      enunciado: `O subtítulo <code>&lt;h2&gt;</code> deveria ter letra roxa e fundo amarelo, mas faltam sinais na regra.
        Clique em cada retângulo e escreva o sinal que falta: um separa a propriedade do valor e o outro termina a ordem.`,
      dica: `Entre a propriedade e o valor vão os dois-pontos; no fim de cada ordem, o ponto e vírgula.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h2>Promoção do dia</h2>
<p>Suco natural pela metade do preço.</p>`, c`h2 {
  color____ purple____
  background-color: yellow;
}`),
      solucao: W(c`<h2>Promoção do dia</h2>
<p>Suco natural pela metade do preço.</p>`, c`h2 {
  color: purple;
  background-color: yellow;
}`),
      teste: c`
var cor = __css("h2", "color");
__assert(cor === "rgb(128, 0, 128)", "A letra do h2 deveria estar roxa (purple), mas está " + cor + ". Confira os dois-pontos e o ponto e vírgula.");
var f = __css("h2", "backgroundColor");
__assert(f === "rgb(255, 255, 0)", "O fundo do h2 deveria estar amarelo (yellow), mas está " + f + ". Sem o ; a linha de cima se mistura com esta.");`
    },
    {
      tipo: "criar",
      titulo: "Regras do cardápio do zero",
      enunciado: `Na aba CSS, escreva <b>duas regras</b> para o cardápio:
        <ul>
          <li>o título <code>&lt;h1&gt;</code> com a letra <code>darkred</code>;</li>
          <li>os itens da lista <code>&lt;li&gt;</code> com a letra <code>darkgreen</code>.</li>
        </ul>`,
      dica: `Cada regra é: seletor, chaves, e dentro <code>color: valor;</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Cardápio</h1>
<ul>
  <li>Coxinha</li>
  <li>Pastel</li>
</ul>`, c`/* escreva suas regras aqui */
`),
      solucao: W(c`<h1>Cardápio</h1>
<ul>
  <li>Coxinha</li>
  <li>Pastel</li>
</ul>`, c`h1 {
  color: darkred;
}

li {
  color: darkgreen;
}`),
      teste: c`
var h = __css("h1", "color");
__assert(h === "rgb(139, 0, 0)", "O título h1 deveria estar darkred, mas está " + h);
var itens = document.querySelectorAll("li");
for (var i = 0; i < itens.length; i++) {
  var c1 = getComputedStyle(itens[i]).color;
  __assert(c1 === "rgb(0, 100, 0)", "O item \"" + itens[i].textContent + "\" deveria estar darkgreen, mas está " + c1);
}`
    },
    {
      tipo: "criar",
      titulo: "Três regras para a agenda",
      enunciado: `A página da agenda tem um título <code>&lt;h1&gt;</code>, um parágrafo <code>&lt;p&gt;</code> e uma lista de compromissos <code>&lt;li&gt;</code>.
        Na aba CSS, escreva uma regra para cada tag:
        <ul>
          <li><code>h1</code> com a letra <code>navy</code>;</li>
          <li><code>p</code> com a letra <code>gray</code>;</li>
          <li><code>li</code> com a letra <code>orange</code>.</li>
        </ul>`,
      dica: `Três seletores diferentes, cada um com suas chaves e um <code>color: ...;</code> dentro.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Minha agenda</h1>
<p>Compromissos de segunda-feira:</p>
<ul>
  <li>9h — Dentista</li>
  <li>14h — Reunião na escola</li>
</ul>`, c`/* uma regra para h1, uma para p e uma para li */
`),
      solucao: W(c`<h1>Minha agenda</h1>
<p>Compromissos de segunda-feira:</p>
<ul>
  <li>9h — Dentista</li>
  <li>14h — Reunião na escola</li>
</ul>`, c`h1 { color: navy; }
p { color: gray; }
li { color: orange; }`),
      teste: c`
var h = __css("h1", "color");
__assert(h === "rgb(0, 0, 128)", "O h1 deveria estar navy, mas está " + h);
var p = __css("p", "color");
__assert(p === "rgb(128, 128, 128)", "O p deveria estar gray, mas está " + p);
var li = __css("li", "color");
__assert(li === "rgb(255, 165, 0)", "Os li deveriam estar orange, mas estão " + li);`
    }
  ],

  /* ------------------------------------------------------------------ */
  p3: [
    {
      tipo: "completar",
      titulo: "Faixa azul do título",
      enunciado: `A Escola Aprender quer o título com <b>letra branca</b> (<code>white</code>) em <b>fundo azul</b> (<code>blue</code>).
        Clique em cada retângulo e escreva o nome da cor que falta.`,
      dica: `<code>color</code> é a letra; <code>background-color</code> é o fundo. Os nomes das cores são em inglês.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Escola Aprender</h1>
<p>Matrículas abertas.</p>`, c`h1 {
  color: ____;
  background-color: ____;
}`),
      solucao: W(c`<h1>Escola Aprender</h1>
<p>Matrículas abertas.</p>`, c`h1 {
  color: white;
  background-color: blue;
}`),
      teste: c`
var t = __css("h1", "color");
__assert(t === "rgb(255, 255, 255)", "A letra do título deveria ser branca (white), mas está " + t);
var f = __css("h1", "backgroundColor");
__assert(f === "rgb(0, 0, 255)", "O fundo do título deveria ser azul (blue), mas está " + f);`
    },
    {
      tipo: "completar",
      titulo: "Fundo da página e cor em hex",
      enunciado: `Na página da cafeteria:
        <ul>
          <li>complete a <b>propriedade</b> que pinta o fundo da página inteira (<code>body</code>);</li>
          <li>complete o parágrafo com a cor da marca, o código hex <code>#7c2d12</code>.</li>
        </ul>
        Clique em cada retângulo e escreva o que falta.`,
      dica: `<i>Background</i> é fundo. O código hex começa com <code>#</code>, copie igualzinho.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Cafeteria Grão Bom</h1>
<p>Café coado na hora.</p>`, c`body { ____: lightyellow; }

p { color: ____; }`),
      solucao: W(c`<h1>Cafeteria Grão Bom</h1>
<p>Café coado na hora.</p>`, c`body { background-color: lightyellow; }

p { color: #7c2d12; }`),
      teste: c`
var f = __css("body", "backgroundColor");
__assert(f === "rgb(255, 255, 224)", "O fundo da página deveria ser lightyellow, mas está " + f + ". Confira a propriedade do fundo.");
var p = __css("p", "color");
__assert(p === "rgb(124, 45, 18)", "O parágrafo deveria ter a cor #7c2d12, mas está " + p);`
    },
    {
      tipo: "completar",
      titulo: "Faixa de aviso vermelha",
      enunciado: `A clínica quer um aviso (<code>&lt;h2&gt;</code>) com letra branca em fundo vermelho <code>#dc2626</code>.
        Os valores já estão lá. Clique em cada retângulo e escreva a <b>propriedade</b> certa: uma para a cor da letra e outra para a cor do fundo.`,
      dica: `Primeiro a letra (<code>white</code>), depois o fundo (<code>#dc2626</code>).`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h2>Atenção: traga sua carteirinha</h2>
<p>Clínica Bem-Estar</p>`, c`h2 {
  ____: white;
  ____: #dc2626;
}`),
      solucao: W(c`<h2>Atenção: traga sua carteirinha</h2>
<p>Clínica Bem-Estar</p>`, c`h2 {
  color: white;
  background-color: #dc2626;
}`),
      teste: c`
var t = __css("h2", "color");
__assert(t === "rgb(255, 255, 255)", "A letra do aviso deveria ser branca, mas está " + t + ". A primeira propriedade é a da cor da letra.");
var f = __css("h2", "backgroundColor");
__assert(f === "rgb(220, 38, 38)", "O fundo do aviso deveria ser #dc2626, mas está " + f + ". A segunda propriedade é a da cor do fundo.");`
    },
    {
      tipo: "criar",
      titulo: "Cores da marca da loja",
      enunciado: `O guia da marca da Loja Azul diz: fundo da página <code>#f1f5f9</code> e títulos <code>#1e3a8a</code>.
        Na aba CSS, escreva:
        <ul>
          <li>uma regra para o <code>body</code> com a cor de fundo <code>#f1f5f9</code>;</li>
          <li>uma regra para o <code>h1</code> com a cor da letra <code>#1e3a8a</code>.</li>
        </ul>`,
      dica: `Use <code>background-color</code> no <code>body</code> e <code>color</code> no <code>h1</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Loja Azul</h1>
<p>Tudo para sua casa.</p>`, c`/* cores da marca */
`),
      solucao: W(c`<h1>Loja Azul</h1>
<p>Tudo para sua casa.</p>`, c`body {
  background-color: #f1f5f9;
}

h1 {
  color: #1e3a8a;
}`),
      teste: c`
var f = __css("body", "backgroundColor");
__assert(f === "rgb(241, 245, 249)", "O fundo da página deveria ser #f1f5f9, mas está " + f);
var t = __css("h1", "color");
__assert(t === "rgb(30, 58, 138)", "O título deveria ter a cor #1e3a8a, mas está " + t);`
    },
    {
      tipo: "criar",
      titulo: "Pizzaria colorida",
      enunciado: `Pinte a página da Pizzaria Forno a Lenha. Na aba CSS:
        <ul>
          <li>o <code>h1</code> com letra <code>white</code> e fundo <code>#c2410c</code>;</li>
          <li>os parágrafos <code>p</code> com letra <code>#431407</code>.</li>
        </ul>`,
      dica: `O <code>h1</code> leva duas ordens dentro das mesmas chaves, cada uma terminando com <code>;</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Pizzaria Forno a Lenha</h1>
<p>Mussarela: R$ 45,00</p>
<p>Calabresa: R$ 48,00</p>`, c`/* pinte a pizzaria aqui */
`),
      solucao: W(c`<h1>Pizzaria Forno a Lenha</h1>
<p>Mussarela: R$ 45,00</p>
<p>Calabresa: R$ 48,00</p>`, c`h1 {
  color: white;
  background-color: #c2410c;
}

p {
  color: #431407;
}`),
      teste: c`
var t = __css("h1", "color");
__assert(t === "rgb(255, 255, 255)", "A letra do h1 deveria ser white, mas está " + t);
var f = __css("h1", "backgroundColor");
__assert(f === "rgb(194, 65, 12)", "O fundo do h1 deveria ser #c2410c, mas está " + f);
var ps = document.querySelectorAll("p");
for (var i = 0; i < ps.length; i++) {
  var c1 = getComputedStyle(ps[i]).color;
  __assert(c1 === "rgb(67, 20, 7)", "Os parágrafos deveriam ter a cor #431407, mas um está " + c1);
}`
    }
  ],

  /* ------------------------------------------------------------------ */
  p4: [
    {
      tipo: "completar",
      titulo: "Tamanho das letras da promoção",
      enunciado: `No cartaz de promoções:
        <ul>
          <li>o título <code>&lt;h1&gt;</code> deve ter letra de <code>40px</code>;</li>
          <li>os parágrafos <code>&lt;p&gt;</code> devem ter letra de 18 pixels (falta só a unidade).</li>
        </ul>
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Pixels se escrevem <code>px</code>, grudado no número, sem espaço.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Promoções da Semana</h1>
<p>Arroz 5 kg — R$ 24,90</p>`, c`h1 { font-size: ____; }

p { font-size: 18____; }`),
      solucao: W(c`<h1>Promoções da Semana</h1>
<p>Arroz 5 kg — R$ 24,90</p>`, c`h1 { font-size: 40px; }

p { font-size: 18px; }`),
      teste: c`
var h = __css("h1", "fontSize");
__assert(h === "40px", "O título deveria ter font-size 40px, mas está " + h);
var p = __css("p", "fontSize");
__assert(p === "18px", "O parágrafo deveria ter font-size 18px, mas está " + p + ". Lembre do px grudado no número.");`
    },
    {
      tipo: "completar",
      titulo: "Aviso que não fica espremido",
      enunciado: `O aviso amarelo da farmácia está com o texto grudado na beirada do fundo.
        Clique no retângulo e escreva a propriedade que cria <b>20px de espaço por dentro</b>, entre o texto e a beirada do fundo.`,
      dica: `Espaço de dentro é como o enchimento da almofada.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Farmácia Saúde</h1>
<p>Plantão 24 horas neste fim de semana.</p>`, c`p {
  background-color: gold;
  ____: 20px;
}`),
      solucao: W(c`<h1>Farmácia Saúde</h1>
<p>Plantão 24 horas neste fim de semana.</p>`, c`p {
  background-color: gold;
  padding: 20px;
}`),
      teste: c`
var lados = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"];
for (var i = 0; i < lados.length; i++) {
  var v = __css("p", lados[i]);
  __assert(v === "20px", "O aviso deveria ter 20px de espaço por dentro (padding), mas " + lados[i] + " está " + v + ".");
}`
    },
    {
      tipo: "completar",
      titulo: "Dentro e fora dos produtos",
      enunciado: `Cada produto (<code>&lt;p&gt;</code>) da vitrine tem fundo azul-claro. Clique em cada retângulo e escreva a propriedade certa para que:
        <ul>
          <li>a primeira ordem dê <code>10px</code> de espaço <b>por dentro</b> (o fundo cresce em volta do texto);</li>
          <li>a segunda ordem dê <code>30px</code> de espaço <b>por fora</b> (afasta um produto do outro).</li>
        </ul>`,
      dica: `Dentro é <code>padding</code>; fora é <code>margin</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<p>Caderno — R$ 12,00</p>
<p>Lápis — R$ 2,00</p>
<p>Borracha — R$ 1,50</p>`, c`p {
  background-color: lightblue;
  ____: 10px;
  ____: 30px;
}`),
      solucao: W(c`<p>Caderno — R$ 12,00</p>
<p>Lápis — R$ 2,00</p>
<p>Borracha — R$ 1,50</p>`, c`p {
  background-color: lightblue;
  padding: 10px;
  margin: 30px;
}`),
      teste: c`
var pd = __css("p", "paddingLeft");
__assert(pd === "10px" && __css("p", "paddingTop") === "10px", "O espaço por dentro (padding) deveria ser 10px, mas está " + pd + ".");
var mg = __css("p", "marginLeft");
__assert(mg === "30px" && __css("p", "marginTop") === "30px", "O espaço por fora (margin) deveria ser 30px, mas está " + mg + ".");`
    },
    {
      tipo: "criar",
      titulo: "Letras do cardápio",
      enunciado: `No cardápio da sorveteria, escreva na aba CSS:
        <ul>
          <li>o título <code>h1</code> com letra de <code>36px</code>;</li>
          <li>os parágrafos <code>p</code> com letra de <code>18px</code>.</li>
        </ul>`,
      dica: `A propriedade do tamanho da letra é <code>font-size</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Sorveteria Gelato</h1>
<p>Casquinha — R$ 6,00</p>
<p>Milk-shake — R$ 15,00</p>`, c`/* tamanhos das letras */
`),
      solucao: W(c`<h1>Sorveteria Gelato</h1>
<p>Casquinha — R$ 6,00</p>
<p>Milk-shake — R$ 15,00</p>`, c`h1 {
  font-size: 36px;
}

p {
  font-size: 18px;
}`),
      teste: c`
var h = __css("h1", "fontSize");
__assert(h === "36px", "O título deveria ter font-size 36px, mas está " + h);
var p = __css("p", "fontSize");
__assert(p === "18px", "Os parágrafos deveriam ter font-size 18px, mas estão " + p);`
    },
    {
      tipo: "criar",
      titulo: "Vitrine do mercado com respiro",
      enunciado: `Arrume a vitrine do Mercado Central. Na aba CSS:
        <ul>
          <li>o título <code>h1</code> com letra de <code>30px</code>;</li>
          <li>cada produto <code>p</code> com fundo <code>#e0f2fe</code>, <code>12px</code> de espaço por dentro e <code>20px</code> de espaço por fora.</li>
        </ul>`,
      dica: `No <code>p</code> vão três ordens: <code>background-color</code>, <code>padding</code> e <code>margin</code>.`,
      lang: "web",
      aba: "css",
      inicial: W(c`<h1>Mercado Central</h1>
<p>Arroz 5 kg — R$ 24,90</p>
<p>Feijão 1 kg — R$ 7,50</p>
<p>Café 500 g — R$ 16,90</p>`, c`/* arrume a vitrine aqui */
`),
      solucao: W(c`<h1>Mercado Central</h1>
<p>Arroz 5 kg — R$ 24,90</p>
<p>Feijão 1 kg — R$ 7,50</p>
<p>Café 500 g — R$ 16,90</p>`, c`h1 {
  font-size: 30px;
}

p {
  background-color: #e0f2fe;
  padding: 12px;
  margin: 20px;
}`),
      teste: c`
var h = __css("h1", "fontSize");
__assert(h === "30px", "O título deveria ter font-size 30px, mas está " + h);
var f = __css("p", "backgroundColor");
__assert(f === "rgb(224, 242, 254)", "O fundo dos produtos deveria ser #e0f2fe, mas está " + f);
__assert(__css("p", "paddingTop") === "12px" && __css("p", "paddingLeft") === "12px", "Os produtos deveriam ter padding de 12px, mas está " + __css("p", "paddingTop"));
__assert(__css("p", "marginTop") === "20px" && __css("p", "marginLeft") === "20px", "Os produtos deveriam ter margin de 20px, mas está " + __css("p", "marginTop"));`
    }
  ]
};
