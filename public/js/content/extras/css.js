import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>CSS significa <i>Cascading Style Sheets</i> (folhas de estilo em cascata). Cada <b>regra</b> CSS tem duas partes: o <b>seletor</b>, que escolhe quais elementos serão estilizados, e o <b>bloco de declarações</b>, entre chaves, com pares <code>propriedade: valor;</code>. O ponto e vírgula separa uma declaração da outra.</p>
<p>Os seletores mais usados são: por <b>tag</b> (<code>p</code>, <code>h1</code>), por <b>classe</b> (<code>.botao</code>, que pega todos os elementos com <code>class="botao"</code>) e por <b>id</b> (<code>#topo</code>, um elemento único). Há também as <b>pseudo-classes</b>, que pegam um estado do elemento: <code>:hover</code> (mouse em cima), <code>:focus</code> (selecionado pelo teclado), <code>:first-child</code> etc.</p>
<p>Cores podem ser escritas por nome (<code>red</code>), em hexadecimal (<code>#16a34a</code>), em <code>rgb(22, 163, 74)</code> ou em <code>hsl()</code>. O CSS costuma ficar em um arquivo separado, ligado ao HTML pela tag <code>&lt;link rel="stylesheet" href="estilo.css"&gt;</code> dentro do <code>&lt;head&gt;</code>.</p>`,
      partes: [
        [c`/* arquivo estilo.css … */`, "Comentário: tudo entre `/*` e `*/` é ignorado pelo navegador. Serve para anotações."],
        [c`h1 { color: #1e3a8a; }`, "Seletor de tag: todos os `h1` da página ficam com o texto azul-escuro."],
        [c`.botao-comprar {`, "Seletor de classe (começa com ponto): vale para qualquer elemento com `class=\"botao-comprar\"`."],
        [c`background: #16a34a;`, "Cor de fundo verde."],
        [c`color: white;`, "Cor do texto."],
        [c`padding: 12px 20px;`, "Espaço interno: 12px em cima e embaixo, 20px nas laterais."],
        [c`border-radius: 8px;`, "Arredonda os cantos em 8 pixels."],
        [c`.botao-comprar:hover { background: #15803d; }`, "Pseudo-classe `:hover`: quando o mouse passa em cima, o verde fica mais escuro, dando sensação de clique."],
        [c`#cabecalho { background: #f1f5f9; }`, "Seletor de id (começa com #): vale só para o elemento com `id=\"cabecalho\"`."]
      ]
    },
    b2: {
      detalhes: `<p>No CSS, <b>todo elemento é uma caixa retangular</b>, mesmo que pareça redondo. Essa caixa tem quatro camadas, de dentro para fora: <b>content</b> (o conteúdo), <b>padding</b> (preenchimento interno), <b>border</b> (borda) e <b>margin</b> (margem externa, o espaço até os vizinhos). Entender isso resolve a maior parte dos problemas de layout.</p>
<p>Por padrão (<code>box-sizing: content-box</code>), o <code>width</code> define só a largura do conteúdo, e padding e borda são somados por fora. Um card com <code>width: 300px</code>, <code>padding: 16px</code> e borda de 1px fica com 334px no total. Com <code>box-sizing: border-box</code>, os 300px já incluem padding e borda, o que é muito mais previsível. Por isso quase todo projeto começa aplicando <code>border-box</code> em todos os elementos.</p>
<p>Atalhos úteis: <code>margin: 10px</code> (os 4 lados), <code>margin: 10px 20px</code> (vertical e horizontal) e <code>margin: 0 auto</code> (centraliza horizontalmente um bloco que tenha largura definida). Elementos de <b>bloco</b> (<code>div</code>, <code>p</code>, <code>h1</code>) ocupam a linha inteira; elementos <b>em linha</b> (<code>span</code>, <code>a</code>, <code>strong</code>) ocupam só o tamanho do conteúdo.</p>`,
      partes: [
        [c`*, *::before, *::after { box-sizing: border-box; }`, "O seletor `*` pega todos os elementos. Aplicar `border-box` em tudo faz o `width` sempre incluir padding e borda."],
        [c`.card {`, "Regra para os elementos com classe `card`."],
        [c`width: 300px;`, "Largura total do card (graças ao `border-box`)."],
        [c`padding: 16px;`, "Espaço interno de 16px nos quatro lados, entre a borda e o conteúdo."],
        [c`border: 1px solid #ddd;`, "Borda de 1px, sólida, cinza-clara. Atalho para espessura, estilo e cor."],
        [c`margin: 24px auto;`, "24px de margem em cima e embaixo; `auto` nas laterais divide o espaço igualmente, centralizando o card."]
      ]
    },
    b3: {
      detalhes: `<p>A tipografia é a parte do CSS que mais influencia a leitura. A propriedade <code>font-family</code> recebe uma <b>lista</b> de fontes: se a primeira não estiver disponível, o navegador tenta a próxima. A lista sempre termina com uma família genérica (<code>sans-serif</code>, <code>serif</code> ou <code>monospace</code>). Fontes da internet podem ser carregadas do Google Fonts.</p>
<p>Unidades de medida: <code>px</code> é fixo; <code>%</code> é relativo ao elemento pai; <code>em</code> é relativo ao tamanho da fonte do próprio elemento (e se acumula quando um elemento está dentro do outro); <code>rem</code> é relativo à fonte da raiz da página (normalmente 16px), por isso é previsível; <code>vw</code> e <code>vh</code> são 1% da largura e da altura da tela.</p>
<p>O <code>line-height</code> controla o espaço entre linhas; valores entre 1.4 e 1.7, sem unidade, deixam o texto confortável. A função <code>clamp(mínimo, ideal, máximo)</code> cria tamanhos fluidos, que crescem com a tela mas respeitam limites. Para leitura confortável, limite a largura dos textos a 60–75 caracteres por linha.</p>`,
      partes: [
        [c`body {`, "Regras no `body` são herdadas pelos elementos de texto da página toda."],
        [c`font-family: "Inter", system-ui, sans-serif;`, "Usa a fonte Inter; se não houver, a fonte padrão do sistema; por último, qualquer fonte sem serifa."],
        [c`font-size: 1rem;`, "Tamanho base: 1rem = tamanho de fonte que o usuário configurou (16px por padrão)."],
        [c`line-height: 1.6;`, "Altura da linha = 1,6 × o tamanho da fonte. Sem unidade, ela se adapta a cada elemento."],
        [c`color: #222;`, "Cinza bem escuro: mais confortável para ler que o preto puro."],
        [c`h1 { font-size: clamp(1.6rem, 4vw, 2.5rem); }`, "Título fluido: nunca menor que 1.6rem nem maior que 2.5rem; entre esses limites, acompanha 4% da largura da tela."],
        [c`.container { width: 90%; max-width: 1100px; margin: 0 auto; }`, "Ocupa 90% da tela, mas no máximo 1100px, e fica centralizado. Padrão clássico de “conteúdo no meio da página”."]
      ]
    },
    i1: {
      detalhes: `<p>O <b>Flexbox</b> organiza itens em <b>uma direção</b>: linha (padrão) ou coluna. Você ativa no elemento <b>pai</b> com <code>display: flex</code>, e os filhos diretos passam a ser “itens flex”. O pai controla o alinhamento; os filhos podem controlar quanto crescem ou encolhem.</p>
<p>São dois eixos. O <b>eixo principal</b> segue a direção (<code>flex-direction</code>: <code>row</code> ou <code>column</code>) e é controlado por <code>justify-content</code> (<code>flex-start</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>...). O <b>eixo cruzado</b> é o perpendicular e é controlado por <code>align-items</code> (<code>stretch</code>, <code>center</code>, <code>flex-start</code>...). Se a direção for coluna, os papéis se invertem.</p>
<p>O <code>gap</code> define o espaço entre os itens sem precisar de margens. O <code>flex-wrap: wrap</code> permite quebrar a linha quando não cabe tudo. Nos filhos, a propriedade <code>flex</code> é um atalho para <code>flex-grow</code> (quanto cresce), <code>flex-shrink</code> (quanto encolhe) e <code>flex-basis</code> (tamanho inicial).</p>`,
      partes: [
        [c`.menu { display: flex;`, "Transforma o `.menu` em contêiner flex: seus filhos ficam lado a lado."],
        [c`justify-content: space-between;`, "Eixo principal (horizontal): o primeiro item vai para a esquerda, o último para a direita e o espaço sobra no meio."],
        [c`align-items: center;`, "Eixo cruzado (vertical): centraliza os itens na altura."],
        [c`gap: 16px;`, "16px de espaço entre os itens."],
        [c`.centro { display: flex; justify-content: center; align-items: center; min-height: 100vh; }`, "Centraliza o conteúdo nos dois eixos. O `min-height: 100vh` dá ao pai a altura da tela, senão não haveria espaço vertical para centralizar."],
        [c`.cards { display: flex; flex-wrap: wrap; gap: 12px; }`, "Cards lado a lado que quebram para a linha de baixo quando não cabem."],
        [c`.cards > * { flex: 1 1 250px; }`, "Cada filho direto (`> *`) começa com 250px, pode crescer (1) para ocupar a sobra e pode encolher (1)."]
      ]
    },
    i2: {
      detalhes: `<p>O <b>CSS Grid</b> organiza itens em <b>duas dimensões</b> ao mesmo tempo: linhas e colunas. Assim como no flex, ele é ativado no pai com <code>display: grid</code>. As colunas são definidas com <code>grid-template-columns</code> e as linhas com <code>grid-template-rows</code>.</p>
<p>A unidade <code>fr</code> (fração) divide o espaço que sobra: <code>1fr 2fr</code> cria duas colunas em que a segunda é o dobro da primeira. A função <code>repeat(3, 1fr)</code> repete o padrão. <code>minmax(220px, 1fr)</code> diz que a coluna tem no mínimo 220px e no máximo uma fração. Combinado com <code>auto-fill</code>, o navegador calcula sozinho quantas colunas cabem, criando galerias responsivas sem media query.</p>
<p>Com <code>grid-template-areas</code>, você “desenha” o layout com nomes e depois diz em qual área cada elemento fica, usando <code>grid-area</code>. Isso deixa layouts de página (menu, topo, conteúdo, rodapé) muito fáceis de ler e de mudar.</p>`,
      partes: [
        [c`.galeria { display: grid;`, "Ativa o grid na galeria."],
        [c`grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));`, "Cria quantas colunas couberem, cada uma com no mínimo 220px; o espaço restante é dividido igualmente."],
        [c`gap: 16px;`, "Espaço entre linhas e colunas."],
        [c`grid-template-columns: 240px 1fr;`, "Duas colunas: a primeira fixa em 240px (menu) e a segunda com todo o resto."],
        [c`grid-template-areas: "menu topo" "menu conteudo";`, "Desenha o layout: cada texto entre aspas é uma linha. O menu ocupa as duas linhas da primeira coluna."],
        [c`min-height: 100vh;`, "O layout ocupa pelo menos a altura da tela."],
        [c`.pagina > nav { grid-area: menu; }`, "Coloca o `nav` na área chamada `menu`. O mesmo vale para `topo` e `conteudo`."]
      ]
    },
    i3: {
      detalhes: `<p><b>Design responsivo</b> é fazer um único site funcionar bem em qualquer tamanho de tela. As ferramentas principais são: layouts flexíveis (flex e grid), unidades relativas, imagens que não ultrapassam o contêiner e <b>media queries</b>.</p>
<p>Uma media query aplica regras só quando uma condição é verdadeira: <code>@media (min-width: 768px) { ... }</code> vale para telas a partir de 768px. Os pontos de quebra (<i>breakpoints</i>) mais usados ficam perto de 600px (celular), 768px (tablet), 1024px (notebook) e 1280px (desktop). O ideal, porém, é colocar o breakpoint onde o <b>seu</b> layout começa a ficar ruim.</p>
<p>A abordagem <b>mobile first</b> escreve primeiro o CSS do celular e usa <code>min-width</code> para acrescentar regras em telas maiores. Media queries também detectam preferências do usuário, como modo escuro (<code>prefers-color-scheme</code>) e redução de movimento (<code>prefers-reduced-motion</code>). Lembre: nada funciona bem no celular sem a meta tag <code>viewport</code> no HTML.</p>`,
      partes: [
        [c`/* Mobile first: o padrão é o celular */`, "Comentário lembrando a estratégia: o CSS sem media query vale para o celular."],
        [c`.colunas { display: grid; gap: 16px; }`, "No celular, o grid tem uma coluna só: os itens ficam um embaixo do outro."],
        [c`@media (min-width: 768px) {`, "Tudo dentro deste bloco só vale em telas com 768px ou mais de largura."],
        [c`.colunas { grid-template-columns: repeat(3, 1fr); }`, "Em telas maiores, passa a ter 3 colunas iguais."],
        [c`img { max-width: 100%; height: auto; }`, "Imagens nunca ficam mais largas que o contêiner e mantêm a proporção."],
        [c`@media (prefers-color-scheme: dark) {`, "Vale quando o sistema do usuário está em modo escuro."],
        [c`body { background: #111; color: #eee; }`, "Fundo escuro e texto claro para o modo escuro."]
      ]
    },
    a1: {
      detalhes: `<p><b>Variáveis CSS</b> (oficialmente <i>custom properties</i>) guardam valores reutilizáveis. São declaradas com dois hífens (<code>--cor-primaria: #4f46e5;</code>) e lidas com <code>var(--cor-primaria)</code>. Normalmente ficam em <code>:root</code>, que representa a tag <code>&lt;html&gt;</code>, para valerem na página toda.</p>
<p>Diferente das variáveis de pré-processadores como o Sass, elas existem <b>enquanto a página roda</b>: podem ser redefinidas dentro de um seletor (só aquele trecho muda), em media queries ou alteradas por JavaScript. É assim que se faz <b>tema claro/escuro</b>: os componentes usam só variáveis, e trocar o tema é apenas redefinir as variáveis.</p>
<p>A função <code>var()</code> aceita um valor reserva: <code>var(--cor, blue)</code> usa <code>blue</code> se a variável não existir. Esse conceito está na base dos <b>design tokens</b>, usados por grandes empresas para padronizar cores, espaçamentos e fontes em todos os produtos.</p>`,
      partes: [
        [c`:root {`, "Seletor que representa o elemento raiz (`<html>`). Variáveis declaradas aqui valem em toda a página."],
        [c`--cor-primaria: #4f46e5;`, "Declara a variável `--cor-primaria`. O nome é livre, mas precisa começar com `--`."],
        [c`--fundo: #ffffff; --texto: #111827; --raio: 12px;`, "Mais variáveis: cor de fundo, cor do texto e tamanho do arredondamento."],
        [c`[data-tema="escuro"] {`, "Seletor de atributo: vale quando algum elemento (aqui, o `<html>`) tem `data-tema=\"escuro\"`."],
        [c`--fundo: #0f172a; --texto: #e5e7eb;`, "Redefine só as variáveis. Todos os componentes que as usam mudam automaticamente."],
        [c`body { background: var(--fundo); color: var(--texto); }`, "Lê as variáveis com `var()`."],
        [c`.botao { background: var(--cor-primaria); border-radius: var(--raio); }`, "O botão usa as variáveis; trocar a cor da marca é editar uma única linha."]
      ]
    },
    a2: {
      detalhes: `<p><b>Transição</b> (<code>transition</code>) suaviza a mudança entre dois estados, como do normal para o <code>:hover</code>. Você informa qual propriedade anima, quanto tempo leva e a curva de velocidade (<code>ease</code>, <code>linear</code>, <code>ease-in-out</code>). Exemplo: <code>transition: transform .2s ease</code>.</p>
<p><b>Animação</b> (<code>@keyframes</code> + <code>animation</code>) cria sequências com vários quadros que podem se repetir, sem precisar de interação. Você dá um nome aos quadros-chave (<code>from</code>/<code>to</code> ou porcentagens) e aplica com <code>animation: nome duração curva repetição</code>.</p>
<p>Para desempenho, prefira animar <code>transform</code> (mover, girar, escalar) e <code>opacity</code>: essas propriedades são processadas pela placa de vídeo e não obrigam o navegador a recalcular o layout. E respeite quem configurou o sistema para reduzir movimento (<code>prefers-reduced-motion</code>), pois animações podem causar enjoo em algumas pessoas.</p>`,
      partes: [
        [c`.card { transition: transform .2s ease, box-shadow .2s ease; }`, "Quando `transform` ou `box-shadow` mudarem, a mudança levará 0,2 segundo, suavemente."],
        [c`.card:hover { transform: translateY(-4px);`, "Ao passar o mouse, o card sobe 4px."],
        [c`box-shadow: 0 8px 24px rgba(0,0,0,.12); }`, "E ganha uma sombra suave, dando sensação de elevação."],
        [c`@keyframes girar { to { transform: rotate(360deg); } }`, "Define uma animação chamada `girar`: do estado atual até uma volta completa."],
        [c`border: 4px solid #ddd; border-top-color: #4f46e5; border-radius: 50%;`, "Um círculo cinza com só a parte de cima colorida: é o visual do spinner."],
        [c`animation: girar 1s linear infinite;`, "Aplica `girar` com 1 segundo por volta, velocidade constante e repetição infinita."],
        [c`@media (prefers-reduced-motion: reduce) {`, "Vale para quem pediu ao sistema para reduzir movimento."],
        [c`* { animation: none !important; transition: none !important; }`, "Desliga animações e transições para essas pessoas."]
      ]
    },
    a3: {
      detalhes: `<p>Quando duas regras definem a mesma propriedade para o mesmo elemento, o navegador decide pela <b>especificidade</b>, uma espécie de pontuação do seletor: estilos inline (no atributo <code>style</code>) valem mais que <b>ids</b>, que valem mais que <b>classes</b>, atributos e pseudo-classes, que valem mais que <b>tags</b>. Em empate, vence a regra que aparece <b>por último</b> no CSS. Isso é a “cascata”.</p>
<p>Em projetos grandes, seletores muito específicos (<code>#menu ul li a.link</code>) e o uso de <code>!important</code> geram uma “guerra de especificidade”: para mudar algo, é preciso criar seletores cada vez mais fortes. A solução é usar quase sempre <b>uma classe por elemento</b>, com nomes claros.</p>
<p>A metodologia <b>BEM</b> (Bloco, Elemento, Modificador) padroniza esses nomes: <code>.card</code> (bloco), <code>.card__titulo</code> (elemento que pertence ao bloco) e <code>.card__botao--destaque</code> (variação). Outras abordagens populares são CSS Modules (nomes únicos gerados automaticamente) e Tailwind (classes utilitárias, como <code>p-4</code> e <code>text-center</code>).</p>`,
      partes: [
        [c`/* tag (0,0,1) < classe (0,1,0) < id (1,0,0) */`, "Pontuação de especificidade: ids valem mais que classes, que valem mais que tags."],
        [c`.card { }`, "Bloco: um componente independente."],
        [c`.card__titulo { }`, "Elemento: uma parte do bloco, ligada por dois sublinhados (`__`)."],
        [c`.card__botao--destaque { }`, "Modificador: uma variação do elemento, indicada por dois hífens (`--`)."],
        [c`#menu ul li a.link { }`, "Exemplo a evitar: seletor longo e com id, difícil de sobrescrever depois."],
        [c`.menu__link { }`, "Equivalente recomendado: uma classe só, com especificidade baixa e previsível."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Na regra `p { color: red; }`, o que é `p`?", ["A propriedade", "O valor", "O seletor", "A unidade"], 2, "O seletor escolhe quais elementos recebem o estilo. `color` é a propriedade e `red` o valor."),
      m("Qual seletor pega todos os elementos com `class=\"destaque\"`?", ["`#destaque`", "`.destaque`", "`destaque`", "`*destaque`"], 1, "Classe começa com ponto; id começa com #."),
      l("Complete a propriedade que muda a cor de fundo:", c`.caixa { ____: yellow; }`, ["background-color", "background"], "`background-color` (ou o atalho `background`) define a cor de fundo.", true),
      m("Qual pseudo-classe aplica estilo quando o mouse passa sobre o elemento?", ["`:active`", "`:focus`", "`:hover`", "`:over`"], 2, "`:focus` é para foco do teclado e `:active` para o momento do clique."),
      m("No box model, qual camada fica entre o conteúdo e a borda?", ["margin", "padding", "outline", "gap"], 1, "Ordem de dentro para fora: content → padding → border → margin."),
      m("Um elemento com `width: 200px; padding: 10px; border: 5px solid;` e `box-sizing: content-box` tem qual largura total?", ["200px", "215px", "230px", "220px"], 2, "200 + 10 + 10 (padding) + 5 + 5 (borda) = 230px. Com `border-box`, seria 200px."),
      m("Qual declaração centraliza horizontalmente um bloco com largura definida?", ["`text-align: center`", "`margin: 0 auto`", "`align: center`", "`float: center`"], 1, "`auto` nas margens laterais divide o espaço livre igualmente."),
      m("A unidade `rem` é relativa a quê?", ["Ao elemento pai", "À fonte do elemento raiz (`html`)", "À largura da tela", "Ao tamanho da imagem"], 1, "Por isso `rem` é previsível e respeita a configuração de fonte do usuário."),
      vf("Em `font-family: \"Inter\", sans-serif;`, se a fonte Inter não estiver disponível, o navegador usa uma fonte sem serifa.", true, "A lista funciona como plano A, plano B, plano C…"),
      m("Como se escreve um comentário em CSS?", ["`// comentário`", "`<!-- comentário -->`", "`/* comentário */`", "`# comentário`"], 2, "Em CSS só existe o formato `/* … */`.")
    ],
    intermediario: [
      l("Complete para transformar o elemento em contêiner flexbox:", c`.menu { display: ____; }`, "flex", "Os filhos diretos passam a ser itens flex, alinhados em linha por padrão.", true),
      m("No flexbox com direção padrão (linha), qual propriedade alinha os itens na horizontal?", ["`align-items`", "`justify-content`", "`text-align`", "`flex-wrap`"], 1, "`justify-content` age no eixo principal; `align-items` no eixo cruzado."),
      m("O que faz `flex-wrap: wrap`?", ["Esconde os itens que não cabem", "Permite que os itens quebrem para uma nova linha", "Inverte a ordem", "Centraliza os itens"], 1, "Sem `wrap`, os itens tentam caber todos em uma linha, encolhendo."),
      m("Qual a melhor escolha para montar um layout com linhas E colunas ao mesmo tempo?", ["Flexbox", "Grid", "Float", "Table"], 1, "Grid é bidimensional; flexbox é unidimensional."),
      m("O que significa `grid-template-columns: 1fr 2fr;`?", ["Duas colunas, a segunda com o dobro da largura da primeira", "Uma coluna de 1px e outra de 2px", "Três colunas iguais", "Duas linhas"], 0, "`fr` divide o espaço disponível em frações."),
      l("Complete a função que repete um padrão de colunas:", c`grid-template-columns: ____(3, 1fr);`, "repeat", "`repeat(3, 1fr)` é o mesmo que `1fr 1fr 1fr`.", true),
      m("O que faz `@media (min-width: 768px) { … }`?", ["Aplica as regras só em telas com até 768px", "Aplica as regras só em telas com 768px ou mais", "Muda a largura da tela", "Esconde a página no celular"], 1, "`min-width` = a partir de; `max-width` = até."),
      m("O que é “mobile first”?", ["Fazer só a versão para celular", "Escrever o CSS base para celular e adicionar regras para telas maiores", "Bloquear acesso pelo computador", "Usar apenas `max-width`"], 1, "Resulta em CSS mais simples e mais leve para o celular."),
      vf("`img { max-width: 100%; }` impede que imagens fiquem mais largas que o espaço onde estão.", true, "É uma das primeiras regras de qualquer site responsivo."),
      m("Qual propriedade define o espaço entre itens de flex ou grid sem usar margens?", ["`space`", "`padding`", "`gap`", "`between`"], 2, "`gap` funciona tanto em flexbox quanto em grid.")
    ],
    avancado: [
      m("Como se declara uma variável CSS?", ["`$cor: red;`", "`--cor: red;`", "`@cor: red;`", "`var cor = red;`"], 1, "Variáveis CSS começam com dois hífens. `$` é do Sass."),
      l("Complete para usar a variável `--cor-primaria`:", c`.botao { background: ____(--cor-primaria); }`, "var", "A função `var()` lê o valor da variável.", true),
      vf("Variáveis CSS podem ser alteradas por JavaScript enquanto a página está aberta.", true, "Por exemplo, `document.documentElement.style.setProperty(\"--cor\", \"red\")`."),
      m("Quais propriedades são mais leves para animar?", ["`width` e `height`", "`top` e `left`", "`transform` e `opacity`", "`margin` e `padding`"], 2, "Elas não forçam o recálculo do layout e usam a GPU."),
      m("Qual a diferença entre `transition` e `@keyframes`?", ["Não há diferença", "`transition` suaviza a mudança entre dois estados; `@keyframes` define animações com vários quadros", "`transition` só funciona no celular", "`@keyframes` só muda cores"], 1, "Transições precisam de uma mudança de estado (hover, classe nova); keyframes podem rodar sozinhas."),
      l("Complete para a animação repetir para sempre:", c`animation: girar 1s linear ____;`, "infinite", "`infinite` repete indefinidamente; um número repete aquela quantidade de vezes.", true),
      m("Qual seletor tem maior especificidade?", ["`p`", "`.texto`", "`#principal`", "`div p`"], 2, "id > classe > tag."),
      m("Duas regras com a mesma especificidade definem cores diferentes. Qual vale?", ["A primeira do arquivo", "A última do arquivo", "A mais curta", "Nenhuma"], 1, "Na cascata, em empate, vence a regra declarada por último."),
      m("No BEM, o que indica `.card__botao--destaque`?", ["Um bloco novo", "Uma variação (modificador) do elemento botão do card", "Um id", "Uma animação"], 1, "`__` liga o elemento ao bloco e `--` indica o modificador."),
      m("Para que serve `@media (prefers-reduced-motion: reduce)`?", ["Diminuir o tamanho do site", "Aplicar regras para quem pediu ao sistema menos animações", "Reduzir o uso de memória", "Desativar o JavaScript"], 1, "Respeitar essa preferência é uma prática de acessibilidade.")
    ]
  }
};
