// Exercícios práticos: um por nível de cada trilha.
// Chave: <trilha>_<nivel>. Os testes rodam no sandbox, isolados.
const c = String.raw;

export const EXERCICIOS = {
  /* ======================= HTML ======================= */
  html_basico: {
    titulo: "Página da padaria do bairro",
    enunciado: `A Padaria do Zé quer uma página simples. Monte o HTML com:
      <ul>
        <li>um título <code>&lt;h1&gt;</code> com o nome da padaria;</li>
        <li>um parágrafo de apresentação;</li>
        <li>um link para pedir pelo WhatsApp (o <code>href</code> deve começar com <code>https://wa.me/</code>);</li>
        <li>uma imagem com texto alternativo (<code>alt</code>) descritivo;</li>
        <li>uma lista <code>&lt;ul&gt;</code> com pelo menos 3 produtos.</li>
      </ul>`,
    dica: `Para a imagem, use qualquer endereço, ex.: <code>https://picsum.photos/300/200</code>. O que importa é o <code>alt</code>.`,
    lang: "web",
    inicial: {
      html: c`<!-- Escreva o HTML da padaria aqui -->
<h1></h1>
`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }`,
      js: ""
    },
    solucao: {
      html: c`<h1>Padaria do Zé</h1>
<p>Pão quentinho todos os dias, desde 1998.</p>
<a href="https://wa.me/5511999999999" target="_blank" rel="noopener">Peça pelo WhatsApp</a>
<img src="https://picsum.photos/300/200" alt="Cesta com pães franceses fresquinhos" width="300">
<ul>
  <li>Pão francês</li>
  <li>Pão de queijo</li>
  <li>Bolo de fubá</li>
</ul>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }`,
      js: ""
    },
    teste: c`
__assert(document.querySelector("h1") && document.querySelector("h1").textContent.trim(), "Falta um <h1> com o nome da padaria.");
__assert(document.querySelector("p") && document.querySelector("p").textContent.trim(), "Falta um parágrafo <p> de apresentação.");
__assert(document.querySelector('a[href^="https://wa.me/"]'), "Falta o link do WhatsApp (href começando com https://wa.me/).");
var img = document.querySelector("img");
__assert(img, "Falta uma imagem <img>.");
__assert((img.getAttribute("alt") || "").trim().length >= 5, "A imagem precisa de um alt descritivo (pelo menos 5 letras).");
__assert(document.querySelectorAll("ul > li").length >= 3, "A lista <ul> precisa de pelo menos 3 itens <li>.");`
  },

  html_intermediario: {
    titulo: "Formulário de orçamento",
    enunciado: `Crie um formulário de pedido de orçamento com:
      <ul>
        <li>campo <b>nome</b> (<code>name="nome"</code>) obrigatório;</li>
        <li>campo de <b>e-mail</b> (<code>type="email"</code>) obrigatório;</li>
        <li>um <code>&lt;select&gt;</code> de serviço com pelo menos 2 opções;</li>
        <li>uma <code>&lt;textarea&gt;</code> para a mensagem;</li>
        <li>um botão de envio;</li>
        <li><b>todos</b> os campos com <code>&lt;label&gt;</code> ligado a eles (acessibilidade!).</li>
      </ul>`,
    dica: `Ligue o label ao campo com <code>&lt;label for="email"&gt;</code> + <code>&lt;input id="email"&gt;</code>, ou colocando o campo dentro do label.`,
    lang: "web",
    inicial: {
      html: c`<h2>Peça seu orçamento</h2>
<form>
  <!-- seus campos aqui -->
</form>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
form { display: grid; gap: 8px; max-width: 360px; }`,
      js: ""
    },
    solucao: {
      html: c`<h2>Peça seu orçamento</h2>
<form>
  <label for="nome">Nome</label>
  <input id="nome" name="nome" required>

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required>

  <label for="servico">Serviço</label>
  <select id="servico" name="servico">
    <option>Site institucional</option>
    <option>Loja virtual</option>
  </select>

  <label for="msg">Mensagem</label>
  <textarea id="msg" name="mensagem"></textarea>

  <button type="submit">Enviar</button>
</form>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
form { display: grid; gap: 8px; max-width: 360px; }`,
      js: ""
    },
    teste: c`
var f = document.querySelector("form");
__assert(f, "Falta o <form>.");
__assert(f.querySelector('input[name="nome"][required]'), 'Falta o campo name="nome" com required.');
__assert(f.querySelector('input[type="email"][required]'), 'Falta o campo type="email" com required.');
var sel = f.querySelector("select");
__assert(sel && sel.options.length >= 2, "Falta um <select> com pelo menos 2 <option>.");
__assert(f.querySelector("textarea"), "Falta a <textarea> da mensagem.");
__assert(f.querySelector('button:not([type="button"]), input[type="submit"]'), "Falta o botão de envio.");
f.querySelectorAll("input:not([type=submit]):not([type=hidden]), select, textarea").forEach(function (el) {
  __assert(el.labels && el.labels.length, "O campo " + (el.name || el.id || el.tagName.toLowerCase()) + " está sem <label> ligado a ele.");
});`
  },

  html_avancado: {
    titulo: "Página de FAQ otimizada para o Google",
    enunciado: `Monte uma página <b>completa</b> (com <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> e <code>&lt;body&gt;</code>) de perguntas frequentes com:
      <ul>
        <li><code>&lt;title&gt;</code> e <code>&lt;meta name="description"&gt;</code> com pelo menos 20 caracteres;</li>
        <li>tags semânticas <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code> e <code>&lt;footer&gt;</code>;</li>
        <li>pelo menos 2 perguntas usando <code>&lt;details&gt;</code> + <code>&lt;summary&gt;</code>;</li>
        <li>uma imagem com <code>loading="lazy"</code> e <code>alt</code>.</li>
      </ul>`,
    dica: `O <code>&lt;details&gt;</code> já abre e fecha sozinho, sem JavaScript.`,
    lang: "web",
    inicial: {
      html: c`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <!-- title e meta description aqui -->
</head>
<body>

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
  <title>Dúvidas frequentes | Loja Exemplo</title>
  <meta name="description" content="Tire suas dúvidas sobre prazos de entrega, trocas e formas de pagamento.">
</head>
<body>
  <header><h1>Perguntas frequentes</h1></header>
  <main>
    <details>
      <summary>Qual o prazo de entrega?</summary>
      <p>Até 5 dias úteis para capitais.</p>
    </details>
    <details>
      <summary>Posso trocar um produto?</summary>
      <p>Sim, em até 7 dias após o recebimento.</p>
    </details>
    <img src="https://picsum.photos/400/200" alt="Caixas prontas para envio" loading="lazy" width="400" height="200">
  </main>
  <footer>© 2026 Loja Exemplo</footer>
</body>
</html>`,
      css: "",
      js: ""
    },
    teste: c`
__assert(document.title.trim(), "Falta o <title> da página.");
var d = document.querySelector('meta[name="description"]');
__assert(d && (d.getAttribute("content") || "").trim().length >= 20, 'Falta <meta name="description"> com pelo menos 20 caracteres.');
["header", "main", "footer"].forEach(function (t) { __assert(document.querySelector(t), "Falta a tag semântica <" + t + ">."); });
__assert(document.querySelectorAll("details > summary").length >= 2, "Faça pelo menos 2 perguntas com <details> e <summary>.");
var img = document.querySelector('img[loading="lazy"]');
__assert(img && (img.getAttribute("alt") || "").trim(), 'Falta uma imagem com loading="lazy" e alt.');`
  },

  /* ======================= CSS ======================= */
  css_basico: {
    titulo: "Card de produto",
    enunciado: `Estilize o card (o HTML já está pronto, edite só o <b>CSS</b>):
      <ul>
        <li><code>.card</code>: largura de <b>280px</b> já incluindo padding e borda (<code>box-sizing</code>), <code>padding</code> de <b>16px</b>, borda de 1px sólida e cantos arredondados (<code>border-radius</code> de pelo menos 8px);</li>
        <li><code>.card__preco</code>: cor verde <code>#16a34a</code>;</li>
        <li><code>.botao</code>: fundo <code>#4f46e5</code> e texto branco.</li>
      </ul>`,
    dica: `<code>box-sizing: border-box</code> faz o <code>width</code> incluir padding e borda.`,
    lang: "web",
    inicial: {
      html: c`<div class="card">
  <h2 class="card__titulo">Fone Bluetooth</h2>
  <p class="card__preco">R$ 129,90</p>
  <button class="botao">Comprar</button>
</div>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }

.card {
  /* seu código aqui */
}
`,
      js: ""
    },
    solucao: {
      html: c`<div class="card">
  <h2 class="card__titulo">Fone Bluetooth</h2>
  <p class="card__preco">R$ 129,90</p>
  <button class="botao">Comprar</button>
</div>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }

.card {
  box-sizing: border-box;
  width: 280px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
}
.card__preco { color: #16a34a; font-weight: 700; }
.botao { background: #4f46e5; color: white; border: 0; padding: 10px 16px; border-radius: 8px; }`,
      js: ""
    },
    teste: c`
var card = document.querySelector(".card");
__assert(card.offsetWidth === 280, "O card deveria medir 280px no total (com padding e borda). Está com " + card.offsetWidth + "px. Use box-sizing: border-box.");
__assert(__css(".card", "paddingTop") === "16px" && __css(".card", "paddingLeft") === "16px", "O .card precisa de padding: 16px.");
__assert(__css(".card", "borderTopStyle") === "solid" && __css(".card", "borderTopWidth") === "1px", "O .card precisa de borda de 1px sólida.");
__assert(parseFloat(__css(".card", "borderTopLeftRadius")) >= 8, "O .card precisa de border-radius de pelo menos 8px.");
__assert(__css(".card__preco", "color") === "rgb(22, 163, 74)", "O preço deve ter a cor #16a34a.");
__assert(__css(".botao", "backgroundColor") === "rgb(79, 70, 229)", "O botão deve ter fundo #4f46e5.");
__assert(__css(".botao", "color") === "rgb(255, 255, 255)", "O texto do botão deve ser branco.");`
  },

  css_intermediario: {
    titulo: "Menu com Flexbox e vitrine com Grid",
    enunciado: `Edite o CSS para:
      <ul>
        <li><code>.menu</code>: usar <b>flexbox</b>, com o logo na esquerda e os links na direita (<code>space-between</code>) e itens centralizados na vertical;</li>
        <li><code>.galeria</code>: usar <b>grid</b> com <code>gap</code> de 16px e colunas automáticas de no mínimo 150px;</li>
        <li>em telas de até 600px, esconder os <code>.links</code> (crie uma <code>@media</code>).</li>
      </ul>`,
    dica: `<code>grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));</code>`,
    lang: "web",
    inicial: {
      html: c`<nav class="menu">
  <strong class="logo">MinhaLoja</strong>
  <div class="links"><a href="#">Início</a> <a href="#">Produtos</a> <a href="#">Contato</a></div>
</nav>
<div class="galeria">
  <div class="item">1</div><div class="item">2</div><div class="item">3</div>
  <div class="item">4</div><div class="item">5</div><div class="item">6</div>
</div>`,
      css: c`body { font-family: system-ui, sans-serif; margin: 0; }
.menu { padding: 12px 16px; background: #1e293b; color: white; }
.menu a { color: white; margin-left: 12px; }
.galeria { padding: 16px; }
.item { background: #e0e7ff; padding: 32px; text-align: center; border-radius: 8px; }

/* seu código aqui */
`,
      js: ""
    },
    solucao: {
      html: c`<nav class="menu">
  <strong class="logo">MinhaLoja</strong>
  <div class="links"><a href="#">Início</a> <a href="#">Produtos</a> <a href="#">Contato</a></div>
</nav>
<div class="galeria">
  <div class="item">1</div><div class="item">2</div><div class="item">3</div>
  <div class="item">4</div><div class="item">5</div><div class="item">6</div>
</div>`,
      css: c`body { font-family: system-ui, sans-serif; margin: 0; }
.menu { padding: 12px 16px; background: #1e293b; color: white; }
.menu a { color: white; margin-left: 12px; }
.galeria { padding: 16px; }
.item { background: #e0e7ff; padding: 32px; text-align: center; border-radius: 8px; }

.menu { display: flex; justify-content: space-between; align-items: center; }
.galeria { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
@media (max-width: 600px) {
  .links { display: none; }
}`,
      js: ""
    },
    teste: c`
__assert(__css(".menu", "display") === "flex", "O .menu precisa de display: flex.");
__assert(__css(".menu", "justifyContent") === "space-between", "O .menu precisa de justify-content: space-between.");
__assert(__css(".menu", "alignItems") === "center", "O .menu precisa de align-items: center.");
__assert(__css(".galeria", "display") === "grid", "A .galeria precisa de display: grid.");
__assert(__css(".galeria", "rowGap") === "16px" && __css(".galeria", "columnGap") === "16px", "A .galeria precisa de gap: 16px.");
var regra = [].slice.call(document.styleSheets).flatMap(function (s) { return [].slice.call(s.cssRules); })
  .find(function (r) { return r.media && /max-width:\s*600px/.test(r.media.mediaText) && /\.links/.test(r.cssText) && /display:\s*none/.test(r.cssText); });
__assert(regra, "Crie uma @media (max-width: 600px) que esconda os .links (display: none).");
var col = getComputedStyle(document.querySelector(".galeria")).gridTemplateColumns.split(" ").map(parseFloat);
__assert(col.every(function (w) { return w >= 149; }), "As colunas da galeria devem ter no mínimo 150px (use minmax).");`
  },

  css_avancado: {
    titulo: "Tema claro/escuro com variáveis e animação",
    enunciado: `Use <b>variáveis CSS</b> para criar um tema:
      <ul>
        <li>em <code>:root</code>, defina <code>--cor-primaria</code>, <code>--fundo</code> e <code>--texto</code>;</li>
        <li>o <code>body</code> deve usar <code>var(--fundo)</code> e <code>var(--texto)</code>; o <code>.botao</code> usa <code>var(--cor-primaria)</code> no fundo;</li>
        <li><code>[data-tema="escuro"]</code> deve trocar o <code>--fundo</code> e o <code>--texto</code> (o JS do botão já liga o tema);</li>
        <li>o <code>.botao</code> deve ter <code>transition</code> no <code>transform</code> e subir 2px no <code>:hover</code>.</li>
      </ul>`,
    dica: `O JavaScript faz <code>document.documentElement.dataset.tema = "escuro"</code>, então o seletor <code>[data-tema="escuro"]</code> pega a tag <code>&lt;html&gt;</code>.`,
    lang: "web",
    inicial: {
      html: c`<h1>Meu app</h1>
<p>Clique para trocar o tema.</p>
<button class="botao" id="tema">Alternar tema</button>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
.botao { border: 0; padding: 10px 16px; border-radius: 8px; color: white; cursor: pointer; }

/* seu código aqui */
`,
      js: c`document.querySelector("#tema").addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.tema = html.dataset.tema === "escuro" ? "" : "escuro";
});`
    },
    solucao: {
      html: c`<h1>Meu app</h1>
<p>Clique para trocar o tema.</p>
<button class="botao" id="tema">Alternar tema</button>`,
      css: c`body { font-family: system-ui, sans-serif; padding: 16px; }
.botao { border: 0; padding: 10px 16px; border-radius: 8px; color: white; cursor: pointer; }

:root { --cor-primaria: #4f46e5; --fundo: #ffffff; --texto: #111827; }
[data-tema="escuro"] { --fundo: #0f172a; --texto: #e5e7eb; }
body { background: var(--fundo); color: var(--texto); }
.botao { background: var(--cor-primaria); transition: transform .2s ease; }
.botao:hover { transform: translateY(-2px); }`,
      js: c`document.querySelector("#tema").addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.tema = html.dataset.tema === "escuro" ? "" : "escuro";
});`
    },
    teste: c`
var raiz = getComputedStyle(document.documentElement);
["--cor-primaria", "--fundo", "--texto"].forEach(function (v) { __assert(raiz.getPropertyValue(v).trim(), "Defina a variável " + v + " em :root."); });
var corBtn = __css(".botao", "backgroundColor");
var prim = document.createElement("div"); prim.style.color = raiz.getPropertyValue("--cor-primaria").trim(); document.body.appendChild(prim);
__assert(corBtn === getComputedStyle(prim).color, "O fundo do .botao deve usar var(--cor-primaria).");
prim.remove();
var antes = __css("body", "backgroundColor"), textoAntes = __css("body", "color");
document.documentElement.dataset.tema = "escuro";
var depois = __css("body", "backgroundColor"), textoDepois = __css("body", "color");
document.documentElement.dataset.tema = "";
__assert(antes !== depois, 'O fundo do body deve mudar com [data-tema="escuro"] (use var(--fundo)).');
__assert(textoAntes !== textoDepois, 'A cor do texto deve mudar com [data-tema="escuro"] (use var(--texto)).');
var tr = __css(".botao", "transitionProperty");
__assert(/transform|all/.test(tr), "O .botao precisa de transition em transform.");
var hover = [].slice.call(document.styleSheets).flatMap(function (s) { return [].slice.call(s.cssRules); })
  .find(function (r) { return /\.botao:hover/.test(r.selectorText || "") && /translateY\(\s*-2px\s*\)/.test(r.cssText); });
__assert(hover, "No .botao:hover use transform: translateY(-2px).");`
  },

  /* ======================= Python ======================= */
  python_basico: {
    titulo: "Relatório de vendas do dia",
    enunciado: `A lista <code>vendas</code> tem as vendas de hoje. Crie as variáveis:
      <ul>
        <li><code>total</code>: soma de todas as vendas;</li>
        <li><code>maior</code>: a maior venda;</li>
        <li><code>acima_de_200</code>: <b>quantas</b> vendas foram maiores que 200;</li>
      </ul>
      Depois, imprima <code>Meta batida!</code> se o total passar de 2000, ou <code>Abaixo da meta</code> caso contrário.`,
    dica: `Use <code>sum()</code>, <code>max()</code> e um <code>for</code> com contador (ou <code>len([v for v in vendas if v &gt; 200])</code>).`,
    lang: "python",
    inicial: c`vendas = [150.0, 320.5, 89.9, 1200.0, 45.0, 610.0]

# 1) total
# 2) maior
# 3) acima_de_200
# 4) imprima "Meta batida!" ou "Abaixo da meta"
`,
    solucao: c`vendas = [150.0, 320.5, 89.9, 1200.0, 45.0, 610.0]

total = sum(vendas)
maior = max(vendas)
acima_de_200 = 0
for v in vendas:
    if v > 200:
        acima_de_200 += 1

if total > 2000:
    print("Meta batida!")
else:
    print("Abaixo da meta")

print(f"Total: R$ {total:.2f} | Maior: {maior} | Acima de 200: {acima_de_200}")`,
    teste: c`
_g = globals()
for _n in ("total", "maior", "acima_de_200"):
    assert _n in _g, f"Crie a variável {_n}."
assert abs(total - 2415.4) < 0.01, f"total deveria ser 2415.40, mas é {total}"
assert maior == 1200.0, f"maior deveria ser 1200.0, mas é {maior}"
assert acima_de_200 == 3, f"acima_de_200 deveria ser 3, mas é {acima_de_200}"
assert "Meta batida!" in __saida__, 'Como o total passou de 2000, imprima exatamente: Meta batida!'`
  },

  python_intermediario: {
    titulo: "Funções para o CRM",
    enunciado: `Escreva duas funções:
      <ol>
        <li><code>contar_por_uf(clientes)</code>: recebe uma lista de dicionários (cada um com a chave <code>"uf"</code>) e devolve um dicionário com quantos clientes há em cada UF. Ex.: <code>{"SP": 2, "PE": 1}</code>.</li>
        <li><code>ticket_medio(valores)</code>: devolve a média dos valores arredondada com 2 casas (<code>round(x, 2)</code>). Se a lista estiver vazia, devolve <code>0</code> (sem dar erro!).</li>
      </ol>`,
    dica: `Para contar: <code>contagem[uf] = contagem.get(uf, 0) + 1</code>.`,
    lang: "python",
    inicial: c`def contar_por_uf(clientes):
    # seu código aqui
    pass


def ticket_medio(valores):
    # seu código aqui
    pass


# Teste você mesmo:
clientes = [{"nome": "Ana", "uf": "SP"}, {"nome": "Bia", "uf": "PE"}, {"nome": "Caio", "uf": "SP"}]
print(contar_por_uf(clientes))
print(ticket_medio([100, 250.5, 80]))
print(ticket_medio([]))
`,
    solucao: c`def contar_por_uf(clientes):
    contagem = {}
    for c in clientes:
        contagem[c["uf"]] = contagem.get(c["uf"], 0) + 1
    return contagem


def ticket_medio(valores):
    if not valores:
        return 0
    return round(sum(valores) / len(valores), 2)


clientes = [{"nome": "Ana", "uf": "SP"}, {"nome": "Bia", "uf": "PE"}, {"nome": "Caio", "uf": "SP"}]
print(contar_por_uf(clientes))
print(ticket_medio([100, 250.5, 80]))
print(ticket_medio([]))`,
    teste: c`
assert contar_por_uf([{"uf": "SP"}, {"uf": "PE"}, {"uf": "SP"}]) == {"SP": 2, "PE": 1}, "contar_por_uf não contou certo para [SP, PE, SP]."
assert contar_por_uf([]) == {}, "contar_por_uf([]) deveria devolver {}."
assert ticket_medio([100, 250.5, 80]) == 143.5, f"ticket_medio([100, 250.5, 80]) deveria ser 143.5, veio {ticket_medio([100, 250.5, 80])}"
assert ticket_medio([10, 20, 20]) == 16.67, "ticket_medio deve arredondar para 2 casas (round)."
assert ticket_medio([]) == 0, "ticket_medio([]) deve devolver 0."`
  },

  python_avancado: {
    titulo: "Classe Carrinho de compras",
    enunciado: `Crie a classe <code>Carrinho</code> com:
      <ul>
        <li><code>adicionar(nome, preco, qtd=1)</code>: guarda o item. Se <code>preco &lt;= 0</code> ou <code>qtd &lt;= 0</code>, lança <code>ValueError</code>;</li>
        <li><code>total(cupom=0)</code>: devolve a soma de <code>preco × qtd</code> com o desconto percentual do cupom aplicado, arredondada com 2 casas;</li>
        <li><code>quantidade_itens()</code>: devolve a soma das quantidades.</li>
      </ul>`,
    dica: `Guarde os itens em uma lista criada no <code>__init__</code>: <code>self.itens = []</code>.`,
    lang: "python",
    inicial: c`class Carrinho:
    def __init__(self):
        self.itens = []

    # seus métodos aqui


c = Carrinho()
c.adicionar("Caneca", 29.9, 2)
c.adicionar("Camiseta", 59.9)
print(c.total(), c.total(cupom=10), c.quantidade_itens())
`,
    solucao: c`class Carrinho:
    def __init__(self):
        self.itens = []

    def adicionar(self, nome, preco, qtd=1):
        if preco <= 0 or qtd <= 0:
            raise ValueError("Preço e quantidade devem ser positivos")
        self.itens.append({"nome": nome, "preco": preco, "qtd": qtd})

    def total(self, cupom=0):
        bruto = sum(i["preco"] * i["qtd"] for i in self.itens)
        return round(bruto * (1 - cupom / 100), 2)

    def quantidade_itens(self):
        return sum(i["qtd"] for i in self.itens)


c = Carrinho()
c.adicionar("Caneca", 29.9, 2)
c.adicionar("Camiseta", 59.9)
print(c.total(), c.total(cupom=10), c.quantidade_itens())`,
    teste: c`
_c = Carrinho()
assert _c.total() == 0, "Um carrinho vazio deve ter total 0."
_c.adicionar("A", 10, 3)
_c.adicionar("B", 5.5)
assert _c.total() == 35.5, f"total() deveria ser 35.5, veio {_c.total()}"
assert _c.total(cupom=10) == 31.95, f"total(cupom=10) deveria ser 31.95, veio {_c.total(cupom=10)}"
assert _c.quantidade_itens() == 4, "quantidade_itens() deveria ser 4."
for _args in (("X", 0), ("X", -5), ("X", 10, 0)):
    try:
        _c.adicionar(*_args)
    except ValueError:
        pass
    else:
        raise AssertionError(f"adicionar{_args} deveria lançar ValueError.")`
  },

  /* ======================= JavaScript / TypeScript ======================= */
  javascript_basico: {
    titulo: "Resumo de pedidos",
    enunciado: `Escreva a função <code>resumoPedidos(pedidos)</code> que devolve um objeto com:
      <ul>
        <li><code>totalPago</code>: soma dos valores dos pedidos pagos;</li>
        <li><code>qtdPendentes</code>: quantos pedidos <b>não</b> estão pagos;</li>
        <li><code>maiorValor</code>: o maior valor entre todos os pedidos (0 se a lista estiver vazia).</li>
      </ul>`,
    dica: `Combine <code>filter</code>, <code>reduce</code> e <code>Math.max(...lista)</code>.`,
    lang: "js",
    inicial: c`function resumoPedidos(pedidos) {
  // seu código aqui
}

const pedidos = [
  { id: 1, valor: 120, pago: true },
  { id: 2, valor: 80, pago: false },
  { id: 3, valor: 300, pago: true },
];
console.log(resumoPedidos(pedidos));
`,
    solucao: c`function resumoPedidos(pedidos) {
  const totalPago = pedidos.filter((p) => p.pago).reduce((s, p) => s + p.valor, 0);
  const qtdPendentes = pedidos.filter((p) => !p.pago).length;
  const maiorValor = pedidos.length ? Math.max(...pedidos.map((p) => p.valor)) : 0;
  return { totalPago, qtdPendentes, maiorValor };
}

const pedidos = [
  { id: 1, valor: 120, pago: true },
  { id: 2, valor: 80, pago: false },
  { id: 3, valor: 300, pago: true },
];
console.log(resumoPedidos(pedidos));`,
    teste: c`
const r1 = resumoPedidos([{ valor: 120, pago: true }, { valor: 80, pago: false }, { valor: 300, pago: true }]);
__assert(r1 && typeof r1 === "object", "A função precisa devolver (return) um objeto.");
__assert(r1.totalPago === 420, "totalPago deveria ser 420, veio " + r1.totalPago);
__assert(r1.qtdPendentes === 1, "qtdPendentes deveria ser 1, veio " + r1.qtdPendentes);
__assert(r1.maiorValor === 300, "maiorValor deveria ser 300, veio " + r1.maiorValor);
const r2 = resumoPedidos([]);
__assert(r2.totalPago === 0 && r2.qtdPendentes === 0 && r2.maiorValor === 0, "Com lista vazia, tudo deve ser 0.");`
  },

  javascript_intermediario: {
    titulo: "Buscar dados de uma API",
    enunciado: `Escreva a função assíncrona <code>buscarUsuario(id)</code> que consulta
      <code>https://jsonplaceholder.typicode.com/users/ID</code> e devolve um objeto
      <code>{ nome, cidade }</code> (campos <code>name</code> e <code>address.city</code> da API).
      Se a resposta não for OK (ex.: 404), devolva <code>null</code>.`,
    dica: `Lembre: o <code>fetch</code> não dá erro em 404, então verifique <code>resp.ok</code>.`,
    lang: "js",
    inicial: c`async function buscarUsuario(id) {
  // seu código aqui
}

console.log(await buscarUsuario(1));
console.log(await buscarUsuario(9999));
`,
    solucao: c`async function buscarUsuario(id) {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  if (!resp.ok) return null;
  const u = await resp.json();
  return { nome: u.name, cidade: u.address.city };
}

console.log(await buscarUsuario(1));
console.log(await buscarUsuario(9999));`,
    teste: c`
const u = await buscarUsuario(1);
__assert(u && u.nome === "Leanne Graham", "buscarUsuario(1) deveria trazer nome 'Leanne Graham'.");
__assert(u.cidade === "Gwenborough", "buscarUsuario(1) deveria trazer cidade 'Gwenborough'.");
const n = await buscarUsuario(9999);
__assert(n === null, "Para um usuário que não existe (404), devolva null.");`
  },

  javascript_avancado: {
    titulo: "TypeScript + closure",
    lang: "ts",
    enunciado: `Em <b>TypeScript</b>:
      <ol>
        <li>Escreva <code>agruparPorStatus(pedidos)</code> que devolve a <b>soma dos valores</b> por status, ex.: <code>{ pago: 300, pendente: 80, cancelado: 0 }</code> (todos os status devem aparecer).</li>
        <li>Escreva <code>criarContador()</code> que devolve um objeto com <code>incrementar()</code> (soma 1 e devolve o novo valor) e <code>atual()</code>, usando uma variável “presa” na closure.</li>
      </ol>`,
    dica: `Comece o acumulador com <code>{ pendente: 0, pago: 0, cancelado: 0 }</code>. Os tipos são removidos antes de rodar; aqui o que vale é o resultado.`,
    inicial: c`type Status = "pendente" | "pago" | "cancelado";

interface Pedido {
  id: number;
  valor: number;
  status: Status;
}

function agruparPorStatus(pedidos: Pedido[]): Record<Status, number> {
  // seu código aqui
}

function criarContador(): { incrementar(): number; atual(): number } {
  // seu código aqui
}

console.log(agruparPorStatus([{ id: 1, valor: 300, status: "pago" }, { id: 2, valor: 80, status: "pendente" }]));
`,
    solucao: c`type Status = "pendente" | "pago" | "cancelado";

interface Pedido {
  id: number;
  valor: number;
  status: Status;
}

function agruparPorStatus(pedidos: Pedido[]): Record<Status, number> {
  return pedidos.reduce<Record<Status, number>>(
    (acc, p) => {
      acc[p.status] += p.valor;
      return acc;
    },
    { pendente: 0, pago: 0, cancelado: 0 }
  );
}

function criarContador(): { incrementar(): number; atual(): number } {
  let n = 0;
  return {
    incrementar: () => ++n,
    atual: () => n,
  };
}

console.log(agruparPorStatus([{ id: 1, valor: 300, status: "pago" }, { id: 2, valor: 80, status: "pendente" }]));`,
    teste: c`
const g = agruparPorStatus([{ id: 1, valor: 300, status: "pago" }, { id: 2, valor: 80, status: "pendente" }, { id: 3, valor: 20, status: "pago" }]);
__assert(g && g.pago === 320 && g.pendente === 80, "agruparPorStatus deveria somar pago=320 e pendente=80.");
__assert(g.cancelado === 0, "Todos os status devem aparecer, inclusive cancelado: 0.");
const c1 = criarContador(), c2 = criarContador();
c1.incrementar(); c1.incrementar();
__assert(c1.incrementar() === 3, "incrementar() deveria devolver o novo valor (3 na terceira vez).");
__assert(c1.atual() === 3 && c2.atual() === 0, "Cada contador deve ter seu próprio valor (closure).");`
  },

  /* ======================= React ======================= */
  react_basico: {
    titulo: "Contador do carrinho",
    enunciado: `Crie o componente <code>App</code> que mostra <b>“Quantidade: N”</b> (começando em 1) e dois botões: <b>+</b> (soma 1) e <b>−</b> (subtrai 1, mas nunca fica abaixo de 1).`,
    dica: `<code>const [qtd, setQtd] = useState(1)</code> e <code>setQtd(q =&gt; Math.max(1, q - 1))</code>.`,
    lang: "react",
    inicial: c`import { useState } from "react";

export default function App() {
  return (
    <div>
      <p>Quantidade: 1</p>
    </div>
  );
}
`,
    solucao: c`import { useState } from "react";

export default function App() {
  const [qtd, setQtd] = useState(1);
  return (
    <div>
      <button onClick={() => setQtd((q) => Math.max(1, q - 1))}>−</button>
      <button onClick={() => setQtd((q) => q + 1)}>+</button>
      <p>Quantidade: {qtd}</p>
    </div>
  );
}`,
    teste: c`
__assert(/Quantidade:\s*1\b/.test(__texto()), 'Comece mostrando "Quantidade: 1".');
var mais = __botao("+"), menos = __botao("−", "-");
__assert(mais && menos, "Crie os botões + e −.");
mais.click(); await __esperar(); mais.click(); await __esperar();
__assert(/Quantidade:\s*3\b/.test(__texto()), "Depois de clicar 2x em +, deveria mostrar Quantidade: 3.");
for (var i = 0; i < 5; i++) { menos.click(); await __esperar(); }
__assert(/Quantidade:\s*1\b/.test(__texto()), "A quantidade nunca pode ficar abaixo de 1.");`
  },

  react_intermediario: {
    titulo: "Lista de tarefas",
    enunciado: `Crie uma lista de tarefas com um <code>&lt;input&gt;</code> controlado, um botão <b>Adicionar</b> e uma <code>&lt;ul&gt;</code> com as tarefas.
      <ul>
        <li>Ao adicionar, a tarefa aparece como <code>&lt;li&gt;</code> e o campo fica vazio;</li>
        <li>texto vazio (ou só espaços) <b>não</b> deve ser adicionado;</li>
        <li>use uma <code>key</code> única em cada item.</li>
      </ul>`,
    dica: `Guarde as tarefas em <code>useState([])</code> e adicione com <code>setTarefas([...tarefas, nova])</code>.`,
    lang: "react",
    inicial: c`import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nova tarefa" />
      <button>Adicionar</button>
      <ul></ul>
    </div>
  );
}
`,
    solucao: c`import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);

  function adicionar() {
    if (!texto.trim()) return;
    setTarefas([...tarefas, { id: crypto.randomUUID(), texto: texto.trim() }]);
    setTexto("");
  }

  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nova tarefa" />
      <button onClick={adicionar}>Adicionar</button>
      <ul>
        {tarefas.map((t) => <li key={t.id}>{t.texto}</li>)}
      </ul>
    </div>
  );
}`,
    teste: c`
var input = document.querySelector("input"), btn = __botao("Adicionar");
__assert(input && btn, "Precisa ter um <input> e um botão Adicionar.");
__digitar(input, "Estudar React"); await __esperar(); btn.click(); await __esperar(80);
__assert(document.querySelectorAll("li").length === 1, "Depois de adicionar, deveria existir 1 <li>.");
__assert(/Estudar React/.test(document.querySelector("li").textContent), "O <li> deveria mostrar o texto digitado.");
__assert(document.querySelector("input").value === "", "O campo deve ficar vazio depois de adicionar.");
__digitar(document.querySelector("input"), "   "); await __esperar(); btn.click(); await __esperar(80);
__assert(document.querySelectorAll("li").length === 1, "Texto vazio não pode ser adicionado.");
__digitar(document.querySelector("input"), "Fazer exercício"); await __esperar(); btn.click(); await __esperar(80);
__assert(document.querySelectorAll("li").length === 2, "A segunda tarefa também deveria aparecer.");`
  },

  react_avancado: {
    titulo: "Busca de produtos com useMemo",
    enunciado: `A lista <code>PRODUTOS</code> já existe. Crie:
      <ul>
        <li>um <code>&lt;input&gt;</code> de busca;</li>
        <li>a lista filtrada pelo nome, <b>sem diferenciar maiúsculas</b>, calculada com <code>useMemo</code>;</li>
        <li>um texto <b>“N produto(s)”</b> com a quantidade encontrada.</li>
      </ul>`,
    dica: `<code>useMemo(() =&gt; PRODUTOS.filter(p =&gt; p.nome.toLowerCase().includes(busca.toLowerCase())), [busca])</code>`,
    lang: "react",
    inicial: c`import { useMemo, useState } from "react";

const PRODUTOS = [
  { id: 1, nome: "Caneca" }, { id: 2, nome: "Camiseta" }, { id: 3, nome: "Mouse" },
  { id: 4, nome: "Carregador" }, { id: 5, nome: "Teclado" }, { id: 6, nome: "Mochila" },
];

export default function App() {
  return (
    <div>
      {/* seu código aqui */}
    </div>
  );
}
`,
    solucao: c`import { useMemo, useState } from "react";

const PRODUTOS = [
  { id: 1, nome: "Caneca" }, { id: 2, nome: "Camiseta" }, { id: 3, nome: "Mouse" },
  { id: 4, nome: "Carregador" }, { id: 5, nome: "Teclado" }, { id: 6, nome: "Mochila" },
];

export default function App() {
  const [busca, setBusca] = useState("");
  const filtrados = useMemo(
    () => PRODUTOS.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase())),
    [busca]
  );
  return (
    <div>
      <input placeholder="Buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
      <p>{filtrados.length} produto(s)</p>
      <ul>{filtrados.map((p) => <li key={p.id}>{p.nome}</li>)}</ul>
    </div>
  );
}`,
    teste: c`
__assert(/\b6 produto\(s\)/.test(__texto()), 'Sem busca, deveria mostrar "6 produto(s)".');
var input = document.querySelector("input");
__assert(input, "Falta o <input> de busca.");
__digitar(input, "CA"); await __esperar(80);
__assert(/\b3 produto\(s\)/.test(__texto()), 'Buscando "CA" (maiúsculo) deveria encontrar 3: Caneca, Camiseta e Carregador.');
__digitar(input, "mouse"); await __esperar(80);
__assert(/\b1 produto\(s\)/.test(__texto()) && /Mouse/.test(__texto()), 'Buscando "mouse" deveria mostrar 1 produto: Mouse.');
__digitar(input, "xyz"); await __esperar(80);
__assert(/\b0 produto\(s\)/.test(__texto()), 'Buscando "xyz" deveria mostrar "0 produto(s)".');`
  },

  /* ======================= Go ======================= */
  go_basico: {
    titulo: "Estoque com map e slice",
    enunciado: `Complete o programa: some todos os preços do slice <code>precos</code> e conte quantos itens do map <code>estoque</code> têm menos de 10 unidades. A saída deve ser exatamente a <b>saída esperada</b>.`,
    dica: `Use <code>for _, p := range precos</code> e <code>for item, qtd := range estoque</code>.`,
    lang: "go",
    inicial: c`package main

import "fmt"

func main() {
	precos := []float64{10.5, 20, 7.25, 99.9}
	estoque := map[string]int{"caneta": 50, "lapis": 8, "borracha": 3, "caderno": 12}

	total := 0.0
	baixo := 0
	// seu código aqui

	fmt.Printf("Total: %.2f\n", total)
	fmt.Println("Itens com estoque baixo:", baixo)
}
`,
    solucao: c`package main

import "fmt"

func main() {
	precos := []float64{10.5, 20, 7.25, 99.9}
	estoque := map[string]int{"caneta": 50, "lapis": 8, "borracha": 3, "caderno": 12}

	total := 0.0
	baixo := 0
	for _, p := range precos {
		total += p
	}
	for _, qtd := range estoque {
		if qtd < 10 {
			baixo++
		}
	}

	fmt.Printf("Total: %.2f\n", total)
	fmt.Println("Itens com estoque baixo:", baixo)
}`,
    saidaEsperada: "Total: 137.65\nItens com estoque baixo: 2"
  },

  go_intermediario: {
    titulo: "Saque com tratamento de erro",
    enunciado: `Implemente <code>sacar(saldo, valor float64) (float64, error)</code>: devolve erro <code>ErrValorInvalido</code> se o valor for ≤ 0, <code>ErrSaldoInsuficiente</code> se for maior que o saldo, e o novo saldo caso contrário. O <code>main</code> já testa os 3 casos.`,
    dica: `Compare erros com <code>errors.Is(err, ErrSaldoInsuficiente)</code>.`,
    lang: "go",
    inicial: c`package main

import (
	"errors"
	"fmt"
)

var ErrValorInvalido = errors.New("valor inválido")
var ErrSaldoInsuficiente = errors.New("saldo insuficiente")

func sacar(saldo, valor float64) (float64, error) {
	// seu código aqui
	return saldo, nil
}

func main() {
	for _, v := range []float64{50, -10, 500} {
		novo, err := sacar(100, v)
		if errors.Is(err, ErrSaldoInsuficiente) {
			fmt.Println("Recusado: saldo insuficiente")
		} else if err != nil {
			fmt.Println("Recusado:", err)
		} else {
			fmt.Printf("OK, novo saldo: %.2f\n", novo)
		}
	}
}
`,
    solucao: c`package main

import (
	"errors"
	"fmt"
)

var ErrValorInvalido = errors.New("valor inválido")
var ErrSaldoInsuficiente = errors.New("saldo insuficiente")

func sacar(saldo, valor float64) (float64, error) {
	if valor <= 0 {
		return saldo, ErrValorInvalido
	}
	if valor > saldo {
		return saldo, ErrSaldoInsuficiente
	}
	return saldo - valor, nil
}

func main() {
	for _, v := range []float64{50, -10, 500} {
		novo, err := sacar(100, v)
		if errors.Is(err, ErrSaldoInsuficiente) {
			fmt.Println("Recusado: saldo insuficiente")
		} else if err != nil {
			fmt.Println("Recusado:", err)
		} else {
			fmt.Printf("OK, novo saldo: %.2f\n", novo)
		}
	}
}`,
    saidaEsperada: "OK, novo saldo: 50.00\nRecusado: valor inválido\nRecusado: saldo insuficiente"
  },

  go_avancado: {
    titulo: "Consultas em paralelo com goroutines",
    enunciado: `A função <code>consultar(id)</code> demora 300ms. Consulte os 5 clientes <b>em paralelo</b> usando goroutines, <code>sync.WaitGroup</code> e um channel, some os pontos de todos e imprima o total. O programa deve levar ~0,3s, não 1,5s.`,
    dica: `Crie <code>resultados := make(chan int, len(ids))</code>, lance <code>go func(id int){...}(id)</code>, chame <code>wg.Wait()</code> e depois <code>close(resultados)</code>.`,
    lang: "go",
    inicial: c`package main

import (
	"fmt"
	"sync"
	"time"
)

func consultar(id int) int {
	time.Sleep(300 * time.Millisecond)
	return id * 10
}

func main() {
	inicio := time.Now()
	ids := []int{1, 2, 3, 4, 5}
	var wg sync.WaitGroup
	_ = wg
	total := 0

	// seu código aqui

	fmt.Println("Total de pontos:", total)
	fmt.Println("Rápido?", time.Since(inicio) < time.Second)
}
`,
    solucao: c`package main

import (
	"fmt"
	"sync"
	"time"
)

func consultar(id int) int {
	time.Sleep(300 * time.Millisecond)
	return id * 10
}

func main() {
	inicio := time.Now()
	ids := []int{1, 2, 3, 4, 5}
	var wg sync.WaitGroup
	resultados := make(chan int, len(ids))
	total := 0

	for _, id := range ids {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			resultados <- consultar(id)
		}(id)
	}
	wg.Wait()
	close(resultados)
	for r := range resultados {
		total += r
	}

	fmt.Println("Total de pontos:", total)
	fmt.Println("Rápido?", time.Since(inicio) < time.Second)
}`,
    saidaEsperada: "Total de pontos: 150\nRápido? true"
  },

  /* ======================= C# ======================= */
  csharp_basico: {
    titulo: "Classificação de notas",
    enunciado: `Para cada nota da lista, imprima a nota e o conceito usando uma <b>switch expression</b>: ≥ 9 → A, ≥ 7 → B, ≥ 5 → C, abaixo disso → Reprovado. Ao final, imprima quantos foram reprovados.`,
    dica: `<code>string conceito = n switch { &gt;= 9 =&gt; "A", &gt;= 7 =&gt; "B", &gt;= 5 =&gt; "C", _ =&gt; "Reprovado" };</code>`,
    lang: "csharp",
    inicial: c`using System;
using System.Collections.Generic;

var notas = new List<double> { 9.5, 7, 4.5, 6, 3 };
int reprovados = 0;

foreach (var n in notas)
{
    // seu código aqui
}

Console.WriteLine($"Reprovados: {reprovados}");
`,
    solucao: c`using System;
using System.Collections.Generic;

var notas = new List<double> { 9.5, 7, 4.5, 6, 3 };
int reprovados = 0;

foreach (var n in notas)
{
    string conceito = n switch
    {
        >= 9 => "A",
        >= 7 => "B",
        >= 5 => "C",
        _ => "Reprovado"
    };
    if (conceito == "Reprovado") reprovados++;
    Console.WriteLine($"{n}: {conceito}");
}

Console.WriteLine($"Reprovados: {reprovados}");`,
    saidaEsperada: "9.5: A\n7: B\n4.5: Reprovado\n6: C\n3: Reprovado\nReprovados: 2",
    nota: "Em computadores configurados em português, o C# pode mostrar 9,5 em vez de 9.5. As duas formas estão certas."
  },

  csharp_intermediario: {
    titulo: "Ranking de vendedores com LINQ",
    enunciado: `Usando <b>LINQ</b>, agrupe as vendas por vendedor, some os valores e imprima o ranking do maior para o menor no formato <code>Nome: total</code>.`,
    dica: `<code>vendas.GroupBy(v =&gt; v.Vendedor).Select(g =&gt; new { Nome = g.Key, Total = g.Sum(v =&gt; v.Valor) }).OrderByDescending(x =&gt; x.Total)</code>`,
    lang: "csharp",
    inicial: c`using System;
using System.Linq;
using System.Collections.Generic;

var vendas = new List<Venda>
{
    new("Ana", 1200m), new("Beto", 300m), new("Ana", 450m),
    new("Carla", 980m), new("Beto", 900m)
};

// seu código aqui

record Venda(string Vendedor, decimal Valor);
`,
    solucao: c`using System;
using System.Linq;
using System.Collections.Generic;

var vendas = new List<Venda>
{
    new("Ana", 1200m), new("Beto", 300m), new("Ana", 450m),
    new("Carla", 980m), new("Beto", 900m)
};

var ranking = vendas
    .GroupBy(v => v.Vendedor)
    .Select(g => new { Nome = g.Key, Total = g.Sum(v => v.Valor) })
    .OrderByDescending(x => x.Total);

foreach (var r in ranking)
    Console.WriteLine($"{r.Nome}: {r.Total}");

record Venda(string Vendedor, decimal Valor);`,
    saidaEsperada: "Ana: 1650\nBeto: 1200\nCarla: 980"
  },

  csharp_avancado: {
    titulo: "Regras de desconto com interface (SOLID)",
    enunciado: `Crie a interface <code>IRegraDesconto</code> com <code>decimal Aplicar(decimal valor)</code> e três implementações: <code>SemDesconto</code>, <code>DescontoVip</code> (10%) e <code>DescontoFuncionario</code> (20%). O código principal percorre as regras e imprime o resultado para R$ 200.`,
    dica: `Cada nova regra é uma nova classe; o laço não precisa mudar (princípio Aberto/Fechado).`,
    lang: "csharp",
    inicial: c`using System;
using System.Collections.Generic;

var regras = new List<IRegraDesconto> { new SemDesconto(), new DescontoVip(), new DescontoFuncionario() };
foreach (var r in regras)
    Console.WriteLine($"{r.GetType().Name}: {r.Aplicar(200m)}");

// declare a interface e as classes aqui
`,
    solucao: c`using System;
using System.Collections.Generic;

var regras = new List<IRegraDesconto> { new SemDesconto(), new DescontoVip(), new DescontoFuncionario() };
foreach (var r in regras)
    Console.WriteLine($"{r.GetType().Name}: {r.Aplicar(200m)}");

public interface IRegraDesconto { decimal Aplicar(decimal valor); }
public class SemDesconto : IRegraDesconto { public decimal Aplicar(decimal v) => v; }
public class DescontoVip : IRegraDesconto { public decimal Aplicar(decimal v) => v * 0.9m; }
public class DescontoFuncionario : IRegraDesconto { public decimal Aplicar(decimal v) => v * 0.8m; }`,
    saidaEsperada: "SemDesconto: 200\nDescontoVip: 180.0\nDescontoFuncionario: 160.0",
    nota: "Dependendo da configuração regional, os decimais podem aparecer com vírgula (180,0)."
  },

  /* ======================= Java ======================= */
  java_basico: {
    titulo: "Aprovados e média da turma",
    enunciado: `Percorra o array <code>notas</code>, conte quantos alunos foram aprovados (nota ≥ 6) e calcule a média da turma. Imprima no formato da saída esperada.`,
    dica: `Use <code>for (int n : notas)</code> e <code>System.out.printf("Média: %.1f%n", media)</code>.`,
    lang: "java",
    inicial: c`public class Main {
    public static void main(String[] args) {
        int[] notas = {8, 5, 10, 3, 7, 6};
        int aprovados = 0;
        double soma = 0;

        // seu código aqui

        System.out.println("Aprovados: " + aprovados);
    }
}
`,
    solucao: c`public class Main {
    public static void main(String[] args) {
        int[] notas = {8, 5, 10, 3, 7, 6};
        int aprovados = 0;
        double soma = 0;

        for (int n : notas) {
            soma += n;
            if (n >= 6) aprovados++;
        }
        double media = soma / notas.length;

        System.out.println("Aprovados: " + aprovados);
        System.out.printf("Média: %.1f%n", media);
    }
}`,
    saidaEsperada: "Aprovados: 4\nMédia: 6.5"
  },

  java_intermediario: {
    titulo: "Total por vendedor com Streams",
    enunciado: `Com <b>Streams</b>, calcule o total de vendas por vendedor (<code>Collectors.groupingBy</code>) e imprima em ordem alfabética.`,
    dica: `Use um <code>TreeMap</code> para manter as chaves ordenadas: <code>groupingBy(Venda::vendedor, TreeMap::new, summingDouble(Venda::valor))</code>.`,
    lang: "java",
    inicial: c`import java.util.*;
import java.util.stream.*;

public class Main {
    record Venda(String vendedor, double valor) {}

    public static void main(String[] args) {
        List<Venda> vendas = List.of(
            new Venda("Caio", 980), new Venda("Ana", 1200),
            new Venda("Beto", 300), new Venda("Ana", 450));

        // seu código aqui
    }
}
`,
    solucao: c`import java.util.*;
import java.util.stream.*;

public class Main {
    record Venda(String vendedor, double valor) {}

    public static void main(String[] args) {
        List<Venda> vendas = List.of(
            new Venda("Caio", 980), new Venda("Ana", 1200),
            new Venda("Beto", 300), new Venda("Ana", 450));

        Map<String, Double> total = vendas.stream()
            .collect(Collectors.groupingBy(Venda::vendedor, TreeMap::new, Collectors.summingDouble(Venda::valor)));

        total.forEach((nome, valor) -> System.out.println(nome + ": " + valor));
    }
}`,
    saidaEsperada: "Ana: 1650.0\nBeto: 300.0\nCaio: 980.0"
  },

  java_avancado: {
    titulo: "Meios de pagamento com polimorfismo",
    enunciado: `Crie a interface <code>MeioPagamento</code> com <code>boolean pagar(double valor)</code> e duas classes: <code>Pix</code> (sempre aprova) e <code>Cartao</code> (aprova só valores até 5000). O <code>main</code> tenta pagar 6000 com cada meio.`,
    dica: `Declare as classes como <code>static class Pix implements MeioPagamento</code> dentro de <code>Main</code>.`,
    lang: "java",
    inicial: c`import java.util.List;

public class Main {
    // declare a interface e as classes aqui

    public static void main(String[] args) {
        List<MeioPagamento> meios = List.of(new Pix(), new Cartao());
        for (MeioPagamento m : meios) {
            System.out.println(m.getClass().getSimpleName() + ": " + (m.pagar(6000) ? "aprovado" : "recusado"));
        }
    }
}
`,
    solucao: c`import java.util.List;

public class Main {
    interface MeioPagamento { boolean pagar(double valor); }

    static class Pix implements MeioPagamento {
        public boolean pagar(double valor) { return true; }
    }

    static class Cartao implements MeioPagamento {
        public boolean pagar(double valor) { return valor <= 5000; }
    }

    public static void main(String[] args) {
        List<MeioPagamento> meios = List.of(new Pix(), new Cartao());
        for (MeioPagamento m : meios) {
            System.out.println(m.getClass().getSimpleName() + ": " + (m.pagar(6000) ? "aprovado" : "recusado"));
        }
    }
}`,
    saidaEsperada: "Pix: aprovado\nCartao: recusado"
  },

  /* ======================= SQL ======================= */
  sql_basico: {
    titulo: "Clientes ativos de SP",
    enunciado: `O comercial pediu: <b>nome</b> e <b>email</b> dos clientes <b>ativos</b> (<code>ativo = 1</code>) do estado de <b>SP</b>, em ordem alfabética pelo nome.`,
    dica: `<code>WHERE uf = 'SP' AND ativo = 1 ORDER BY nome</code>`,
    lang: "sql",
    inicial: c`-- Tabela: clientes (id, nome, email, cidade, uf, ativo, ...)
SELECT * FROM clientes LIMIT 5;
`,
    solucao: c`SELECT nome, email
FROM clientes
WHERE uf = 'SP' AND ativo = 1
ORDER BY nome;`,
    ordem: true
  },

  sql_intermediario: {
    titulo: "Clientes que nunca compraram",
    enunciado: `Para uma campanha de boas-vindas, liste o <b>nome</b> dos clientes que <b>nunca fizeram nenhum pedido</b>, em ordem alfabética.`,
    dica: `<code>LEFT JOIN pedidos ... WHERE p.id IS NULL</code>`,
    lang: "sql",
    inicial: c`-- Tabelas: clientes (id, nome, ...) e pedidos (id, cliente_id, valor, status, data)
SELECT c.nome, p.id AS pedido
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id;
`,
    solucao: c`SELECT c.nome
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
WHERE p.id IS NULL
ORDER BY c.nome;`,
    ordem: true
  },

  sql_avancado: {
    titulo: "Melhor cliente de cada estado",
    enunciado: `Para cada <b>uf</b> (do cliente), mostre o cliente que mais gastou em pedidos <b>pagos</b>: colunas <b>uf</b>, <b>nome</b> e <b>total</b>. Use uma <i>window function</i>.`,
    dica: `Some por cliente em uma CTE e depois use <code>ROW_NUMBER() OVER (PARTITION BY uf ORDER BY total DESC)</code> e filtre <code>rn = 1</code>.`,
    lang: "sql",
    inicial: c`WITH gastos AS (
  SELECT c.uf, c.nome, SUM(p.valor) AS total
  FROM clientes c
  JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'
  GROUP BY c.id, c.uf, c.nome
)
SELECT * FROM gastos ORDER BY uf, total DESC;
`,
    solucao: c`WITH gastos AS (
  SELECT c.uf, c.nome, SUM(p.valor) AS total
  FROM clientes c
  JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'
  GROUP BY c.id, c.uf, c.nome
),
ranking AS (
  SELECT uf, nome, total,
         ROW_NUMBER() OVER (PARTITION BY uf ORDER BY total DESC) AS rn
  FROM gastos
)
SELECT uf, nome, total FROM ranking WHERE rn = 1;`,
    ordem: false
  },

  /* ======================= MySQL ======================= */
  mysql_basico: {
    titulo: "Lista para o marketing",
    enunciado: `Liste os clientes de <b>PE</b> com: <b>nome</b>, <b>idade</b> em anos completos (use <code>TIMESTAMPDIFF</code> com <code>nascimento</code>) e <b>cadastro</b> no formato <code>dd/mm/aaaa</code> (use <code>DATE_FORMAT</code> com <code>data_cadastro</code>), ordenados pelo nome.`,
    dica: `<code>TIMESTAMPDIFF(YEAR, nascimento, CURDATE())</code> e <code>DATE_FORMAT(data_cadastro, '%d/%m/%Y')</code>`,
    lang: "sql",
    inicial: c`SELECT nome, nascimento, data_cadastro
FROM clientes
WHERE uf = 'PE';
`,
    solucao: c`SELECT nome,
       TIMESTAMPDIFF(YEAR, nascimento, CURDATE()) AS idade,
       DATE_FORMAT(data_cadastro, '%d/%m/%Y') AS cadastro
FROM clientes
WHERE uf = 'PE'
ORDER BY nome;`,
    ordem: true
  },

  mysql_intermediario: {
    titulo: "View para o time de BI",
    enunciado: `Crie a view <code>vw_total_por_cliente</code> com as colunas <b>nome</b> e <b>total</b> (soma dos pedidos <b>pagos</b> de cada cliente). Clientes sem pedido pago <b>não</b> precisam aparecer. A verificação vai rodar <code>SELECT nome, total FROM vw_total_por_cliente ORDER BY nome</code>.`,
    dica: `<code>CREATE OR REPLACE VIEW vw_total_por_cliente AS SELECT ... GROUP BY ...;</code>`,
    lang: "sql",
    inicial: c`-- crie a view aqui

-- depois teste:
-- SELECT * FROM vw_total_por_cliente;
`,
    solucao: c`CREATE OR REPLACE VIEW vw_total_por_cliente AS
SELECT c.nome, SUM(p.valor) AS total
FROM clientes c
JOIN pedidos p ON p.cliente_id = c.id
WHERE p.status = 'pago'
GROUP BY c.id, c.nome;

SELECT * FROM vw_total_por_cliente;`,
    verificacao: "SELECT nome, total FROM vw_total_por_cliente ORDER BY nome",
    ordem: true
  },

  mysql_avancado: {
    titulo: "Transferência com transação",
    enunciado: `Transfira <b>R$ 250,00</b> da conta de <b>João</b> (id 1) para a conta da <b>Ana</b> (id 3) dentro de uma <b>transação</b> (<code>START TRANSACTION</code> … <code>COMMIT</code>). A verificação confere os saldos de todas as contas.`,
    dica: `Dois <code>UPDATE contas SET saldo = saldo ± 250 WHERE id = ...</code> entre <code>START TRANSACTION</code> e <code>COMMIT</code>.`,
    lang: "sql",
    inicial: c`SELECT * FROM contas;

-- sua transação aqui
`,
    solucao: c`START TRANSACTION;
UPDATE contas SET saldo = saldo - 250 WHERE id = 1;
UPDATE contas SET saldo = saldo + 250 WHERE id = 3;
COMMIT;

SELECT * FROM contas;`,
    verificacao: "SELECT id, saldo FROM contas ORDER BY id",
    ordem: true
  },

  /* ======================= C++ ======================= */
  cpp_basico: {
    titulo: "Boletim da turma com funções",
    enunciado: `Escreva a função <code>bool aprovado(double nota)</code>, que devolve <code>true</code> para nota ≥ 6. No <code>main</code>, percorra o array <code>notas</code> com um <code>for</code>, conte os aprovados usando a função e calcule a média da turma. Imprima a média com <b>duas casas decimais</b> (<code>fixed &lt;&lt; setprecision(2)</code>), como na saída esperada.`,
    dica: `Declare a função antes do <code>main</code>. A média é <code>soma / 6</code>; para o tamanho do array, você também pode usar <code>size(notas)</code> (C++17).`,
    lang: "cpp",
    inicial: c`#include <iostream>
#include <iomanip>
using namespace std;

// escreva a função aprovado aqui

int main() {
    double notas[] = {8, 5, 10, 3, 7, 6};
    int aprovados = 0;
    double soma = 0;

    // percorra as notas aqui

    cout << "Aprovados: " << aprovados << '\n';
    return 0;
}
`,
    solucao: c`#include <iostream>
#include <iomanip>
using namespace std;

bool aprovado(double nota) {
    return nota >= 6;
}

int main() {
    double notas[] = {8, 5, 10, 3, 7, 6};
    int aprovados = 0;
    double soma = 0;

    for (double n : notas) {
        soma += n;
        if (aprovado(n)) aprovados++;
    }
    double media = soma / 6;

    cout << "Aprovados: " << aprovados << '\n';
    cout << fixed << setprecision(2) << "Média: " << media << '\n';
    return 0;
}`,
    padroes: [
      [/bool\s+aprovado\s*\(\s*double\s+\w+\s*\)/, "Crie a função bool aprovado(double nota)."],
      [/for\s*\(/, "Percorra as notas com um laço for."],
      [/aprovado\s*\(\s*\w+(\[\s*\w+\s*\])?\s*\)/, "Use a função aprovado(...) dentro do laço para contar os aprovados."],
      [/setprecision\s*\(\s*2\s*\)/, "Mostre a média com duas casas: fixed << setprecision(2)."]
    ],
    saidaEsperada: "Aprovados: 4\nMédia: 6.50"
  },

  cpp_intermediario: {
    titulo: "Estoque com classe e vector",
    enunciado: `Crie a classe <code>Produto</code> com os atributos <b>privados</b> <code>nome</code>, <code>quantidade</code> e <code>preco</code>, um construtor e os métodos <code>const</code> <code>getNome()</code> e <code>valorTotal()</code> (quantidade × preço). No <code>main</code>, guarde os três produtos em um <code>vector&lt;Produto&gt;</code>, imprima o valor de cada um e o valor total do estoque, com duas casas decimais.`,
    dica: `Construtor com lista de inicialização: <code>Produto(const string&amp; n, int q, double p) : nome(n), quantidade(q), preco(p) {}</code>. Adicione no vector com <code>push_back(Produto("Caneta", 120, 2.5))</code> ou <code>emplace_back("Caneta", 120, 2.5)</code>.`,
    lang: "cpp",
    inicial: c`#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
using namespace std;

// crie a classe Produto aqui

int main() {
    // Caneta: 120 x 2.50 | Caderno: 35 x 18.90 | Mochila: 8 x 129.99
    double total = 0;

    cout << fixed << setprecision(2);
    // imprima cada produto e o total aqui
    return 0;
}
`,
    solucao: c`#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
using namespace std;

class Produto {
private:
    string nome;
    int quantidade;
    double preco;

public:
    Produto(const string& n, int q, double p) : nome(n), quantidade(q), preco(p) {}

    const string& getNome() const { return nome; }
    double valorTotal() const { return quantidade * preco; }
};

int main() {
    vector<Produto> estoque;
    estoque.push_back(Produto("Caneta", 120, 2.50));
    estoque.push_back(Produto("Caderno", 35, 18.90));
    estoque.push_back(Produto("Mochila", 8, 129.99));
    double total = 0;

    cout << fixed << setprecision(2);
    for (const Produto& p : estoque) {
        cout << p.getNome() << ": R$ " << p.valorTotal() << '\n';
        total += p.valorTotal();
    }
    cout << "Total do estoque: R$ " << total << '\n';
    return 0;
}`,
    padroes: [
      [/class\s+Produto/, "Crie a classe Produto."],
      [/private\s*:/, "Deixe os atributos da classe em uma seção private:."],
      [/valorTotal\s*\(\s*\)\s*const/, "Crie o método double valorTotal() const."],
      [/vector\s*<\s*Produto\s*>/, "Guarde os produtos em um vector<Produto>."]
    ],
    saidaEsperada: "Caneta: R$ 300.00\nCaderno: R$ 661.50\nMochila: R$ 1039.92\nTotal do estoque: R$ 2001.42"
  },

  cpp_avancado: {
    titulo: "Ranking de vendedores com map e sort",
    enunciado: `Some as vendas de cada vendedor em um <code>map&lt;string, double&gt;</code>. Depois copie os pares para um <code>vector</code>, ordene com <code>sort</code> e uma <b>lambda</b> do maior total para o menor e imprima o ranking com duas casas decimais.`,
    dica: `<code>total[v.first] += v.second;</code> soma no map. Depois: <code>vector&lt;pair&lt;string, double&gt;&gt; ranking(total.begin(), total.end());</code> e <code>sort(ranking.begin(), ranking.end(), [](const auto&amp; a, const auto&amp; b) { return a.second &gt; b.second; });</code>`,
    lang: "cpp",
    inicial: c`#include <iostream>
#include <iomanip>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<string, double>> vendas = {
        {"Caio", 980.00}, {"Ana", 1200.00}, {"Beto", 300.00},
        {"Ana", 450.00}, {"Beto", 1500.50}, {"Caio", 120.00}
    };

    // 1) some por vendedor em um map
    // 2) copie para um vector e ordene do maior para o menor
    // 3) imprima: 1. Nome: R$ 0.00
    return 0;
}
`,
    solucao: c`#include <iostream>
#include <iomanip>
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<string, double>> vendas = {
        {"Caio", 980.00}, {"Ana", 1200.00}, {"Beto", 300.00},
        {"Ana", 450.00}, {"Beto", 1500.50}, {"Caio", 120.00}
    };

    map<string, double> total;
    for (const auto& v : vendas) total[v.first] += v.second;

    vector<pair<string, double>> ranking(total.begin(), total.end());
    sort(ranking.begin(), ranking.end(), [](const auto& a, const auto& b) {
        return a.second > b.second;
    });

    cout << fixed << setprecision(2);
    int posicao = 1;
    for (const auto& [nome, valor] : ranking) {
        cout << posicao++ << ". " << nome << ": R$ " << valor << '\n';
    }
    return 0;
}`,
    padroes: [
      [/map\s*<\s*(std::)?string\s*,\s*double\s*>/, "Some os totais em um map<string, double>."],
      [/sort\s*\(/, "Ordene o ranking com sort(...)."],
      [/\[[^\]]*\]\s*\([^)]*\)\s*(->\s*\w+\s*)?\{/, "Passe uma lambda para o sort, por exemplo [](const auto& a, const auto& b) { ... }."],
      [/setprecision\s*\(\s*2\s*\)/, "Mostre os valores com duas casas: fixed << setprecision(2)."]
    ],
    saidaEsperada: "1. Beto: R$ 1800.50\n2. Ana: R$ 1650.00\n3. Caio: R$ 1100.00"
  }
};

export const EXERCICIO_IDS = Object.keys(EXERCICIOS);
