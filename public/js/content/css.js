const c = String.raw;

export default {
  id: "css",
  nome: "CSS",
  icone: "🎨",
  cor: "#2965f1",
  dificuldade: 1,
  resumo: "A roupa e a maquiagem da página: cores, fontes, espaçamentos, layout e adaptação ao celular.",
  mercado: "Obrigatório em front-end, UI/UX, WordPress e e-commerce. Saber layout responsivo é exigência em quase toda vaga web.",
  docs: [
    { nome: "MDN Web Docs — CSS", url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS", desc: "referência completa" },
    { nome: "CSS-Tricks: guia de Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", desc: "o guia visual mais famoso" },
    { nome: "CSS-Tricks: guia de Grid", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
    { nome: "Can I use", url: "https://caniuse.com/", desc: "descubra se um recurso funciona em todos os navegadores" }
  ],
  niveis: {
    basico: {
      objetivo: "mudar cores, fontes e espaçamentos e entender por que cada elemento ocupa o espaço que ocupa.",
      topicos: [
        {
          titulo: "Seletores, cores e o primeiro estilo",
          crianca: `O CSS é como dar <b>ordens de pintura</b>: “todos os títulos ficam azuis”, “o botão de comprar fica verde”. O <b>seletor</b> diz <i>quem</i> recebe a ordem (<code>h1</code>, <code>.botao</code>, <code>#topo</code>) e as <b>propriedades</b> dizem <i>o quê</i> fazer (<code>color</code>, <code>background</code>).`,
          codigo: c`
/* arquivo estilo.css — ligue no HTML com:
   <link rel="stylesheet" href="estilo.css"> */

h1 { color: #1e3a8a; }              /* todas as tags h1 */

.botao-comprar {                     /* class="botao-comprar" */
  background: #16a34a;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
}

.botao-comprar:hover {               /* quando o mouse passa */
  background: #15803d;
}

#cabecalho { background: #f1f5f9; } /* id="cabecalho" (único) */`,
          trabalho: `O primeiro pedido do time de design costuma ser: “aplique as cores da marca”. Você cria classes como <code>.btn-primario</code> e reaproveita em todo o site, em vez de pintar cada botão um por um.`,
          entrevista: {
            pergunta: "Qual a diferença entre classe e id no CSS?",
            resposta: `O <b>id</b> deve ser único na página e tem especificidade (força) maior. A <b>classe</b> pode ser repetida em vários elementos. Para estilo, prefira classes: são reutilizáveis e evitam brigas de especificidade.`
          },
          busca: ["seletores css lista", "css hover", "class vs id css"]
        },
        {
          titulo: "Box model: margem, borda e preenchimento",
          crianca: `Todo elemento é uma <b>caixa de presente</b>. Dentro está o conteúdo (o brinquedo), em volta tem o <b>padding</b> (o papel de seda), depois a <b>border</b> (a caixa de papelão) e, por fora, a <b>margin</b> (o espaço entre uma caixa e outra na prateleira).`,
          codigo: c`
/* Faz width incluir padding e borda (use SEMPRE) */
*, *::before, *::after { box-sizing: border-box; }

.card {
  width: 300px;
  padding: 16px;          /* espaço interno */
  border: 1px solid #ddd; /* borda */
  margin: 24px auto;      /* espaço externo; auto centraliza */
}`,
          nota: "Use o DevTools (F12 → Elements) para ver as caixas coloridas de cada elemento.",
          trabalho: `“O card está estourando a tela no celular!” Nove em cada dez vezes é <code>width</code> + <code>padding</code> somando mais de 100%. O <code>box-sizing: border-box</code> resolve. Saber abrir o DevTools e inspecionar a caixa é o que mais economiza tempo no dia a dia.`,
          entrevista: {
            pergunta: "Explique o box model e o que o box-sizing: border-box muda.",
            resposta: `Cada elemento tem content, padding, border e margin. No padrão (<code>content-box</code>), o <code>width</code> vale só para o conteúdo, e padding e borda somam por fora. Com <code>border-box</code>, o <code>width</code> já inclui padding e borda, o que deixa o cálculo previsível.`
          },
          busca: ["css box model", "box-sizing border-box", "margin collapse css"]
        },
        {
          titulo: "Fontes, textos e unidades",
          crianca: `Unidades são as <b>réguas</b> do CSS. O <code>px</code> é um tamanho fixo, como um palito. O <code>rem</code> cresce junto com o tamanho de letra que a pessoa escolheu no celular. O <code>%</code> e o <code>vw</code> são pedaços do espaço disponível, como “metade da mesa”.`,
          codigo: c`
body {
  font-family: "Inter", system-ui, sans-serif;
  font-size: 1rem;      /* 16px padrão do navegador */
  line-height: 1.6;     /* espaço entre linhas, sem unidade */
  color: #222;
}

h1 { font-size: clamp(1.6rem, 4vw, 2.5rem); } /* mínimo, ideal, máximo */

.container { width: 90%; max-width: 1100px; margin: 0 auto; }`,
          trabalho: `Cliente idoso reclama que “a letra é pequena”. Com fontes em <code>rem</code>, o site respeita o zoom do sistema. O <code>clamp()</code> evita escrever vários media queries só para o tamanho do título.`,
          entrevista: {
            pergunta: "Qual a diferença entre px, em e rem?",
            resposta: `<code>px</code> é absoluto. <code>em</code> é relativo ao tamanho de fonte do elemento pai (pode se acumular). <code>rem</code> é relativo à fonte da raiz (<code>html</code>), então é previsível e respeita a configuração de acessibilidade do usuário.`
          },
          busca: ["css rem vs em", "css clamp font-size", "google fonts como usar"]
        }
      ]
    },
    intermediario: {
      objetivo: "montar qualquer layout comum (menus, cards, grades) que funcione bem no desktop e no celular.",
      topicos: [
        {
          titulo: "Flexbox",
          crianca: `Flexbox é organizar <b>crianças em uma fila</b>. Você manda: “fiquem lado a lado”, “todos no meio”, “espalhem-se com o mesmo espaço”. É uma linha (ou coluna) só.`,
          codigo: c`
.menu {
  display: flex;
  justify-content: space-between; /* eixo principal: horizontal */
  align-items: center;            /* eixo cruzado: vertical */
  gap: 16px;
}

/* Centralizar qualquer coisa (pergunta clássica!) */
.centro {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.cards { display: flex; flex-wrap: wrap; gap: 12px; }
.cards > * { flex: 1 1 250px; } /* cresce, encolhe, base 250px */`,
          trabalho: `Barra de navegação com logo na esquerda e menu na direita, botões alinhados, rodapé com colunas: tudo isso é flexbox. É o recurso de CSS que você mais vai usar.`,
          entrevista: {
            pergunta: "Como centralizar uma div na horizontal e na vertical?",
            resposta: `No pai: <code>display:flex; justify-content:center; align-items:center;</code> (ou <code>display:grid; place-items:center;</code>). O pai precisa ter altura, por exemplo <code>min-height:100vh</code>.`
          },
          busca: ["flexbox guia completo", "justify-content vs align-items", "flexbox froggy jogo"]
        },
        {
          titulo: "CSS Grid",
          crianca: `Se o Flexbox é uma fila, o Grid é um <b>tabuleiro de xadrez</b>: você desenha linhas e colunas e diz em qual casinha cada peça fica.`,
          codigo: c`
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
} /* responsivo sem nenhum media query! */

.pagina {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "menu  topo"
    "menu  conteudo";
  min-height: 100vh;
}
.pagina > nav    { grid-area: menu; }
.pagina > header { grid-area: topo; }
.pagina > main   { grid-area: conteudo; }`,
          trabalho: `<b>Dashboards</b> administrativos (menu lateral + topo + cards) e <b>vitrines de produtos</b> são feitos com Grid. A linha <code>repeat(auto-fill, minmax(...))</code> monta a vitrine que se ajusta sozinha ao tamanho da tela.`,
          entrevista: {
            pergunta: "Quando usar Grid e quando usar Flexbox?",
            resposta: `Flexbox para <b>uma dimensão</b> (alinhar itens em linha ou coluna, como um menu). Grid para <b>duas dimensões</b> (linhas e colunas ao mesmo tempo, como o layout da página ou uma galeria). Eles podem ser combinados.`
          },
          busca: ["css grid template areas", "auto-fill vs auto-fit", "grid garden jogo"]
        },
        {
          titulo: "Responsividade e media queries",
          crianca: `Uma roupa que <b>estica</b> e serve em criança e em adulto. O site muda de forma conforme o tamanho da tela: no celular as coisas ficam uma embaixo da outra; no computador, lado a lado.`,
          codigo: c`
/* Mobile first: o padrão é o celular */
.colunas { display: grid; gap: 16px; }

/* A partir de 768px (tablet/desktop), 3 colunas */
@media (min-width: 768px) {
  .colunas { grid-template-columns: repeat(3, 1fr); }
}

img { max-width: 100%; height: auto; } /* imagens nunca estouram */

/* Modo escuro automático */
@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}`,
          trabalho: `Mais de 70% dos acessos no Brasil vêm do celular. Toda tarefa de front-end termina com “testa no mobile”. Use o modo dispositivo do DevTools (Ctrl+Shift+M) para simular vários aparelhos.`,
          entrevista: {
            pergunta: "O que é mobile first?",
            resposta: `É escrever o CSS pensando primeiro no celular (estilos base) e usar <code>@media (min-width: ...)</code> para adicionar ajustes em telas maiores. O CSS fica mais simples, e o celular não baixa regras que não usa.`
          },
          busca: ["media queries breakpoints comuns", "mobile first css", "chrome devtools device mode"]
        }
      ]
    },
    avancado: {
      objetivo: "criar temas, animações suaves e organizar CSS de projetos grandes sem bagunça.",
      topicos: [
        {
          titulo: "Variáveis CSS e temas (modo escuro)",
          crianca: `Variáveis são <b>potes de tinta com etiqueta</b>. Você escreve “cor-principal” em todo lugar; se um dia quiser trocar de azul para roxo, troca a tinta do pote <b>uma vez só</b> e tudo muda.`,
          codigo: c`
:root {
  --cor-primaria: #4f46e5;
  --fundo: #ffffff;
  --texto: #111827;
  --raio: 12px;
}

[data-tema="escuro"] {
  --fundo: #0f172a;
  --texto: #e5e7eb;
}

body   { background: var(--fundo); color: var(--texto); }
.botao { background: var(--cor-primaria); border-radius: var(--raio); }`,
          nota: "Para trocar o tema com JavaScript: <code>document.documentElement.dataset.tema = 'escuro'</code>.",
          trabalho: `Implementar <b>modo escuro</b> ou o <b>white label</b> (mesmo sistema com as cores de cada cliente) vira trocar algumas variáveis. É assim que os design systems de bancos e grandes empresas funcionam.`,
          entrevista: {
            pergunta: "Qual a vantagem das CSS custom properties sobre variáveis do Sass?",
            resposta: `As variáveis CSS existem <b>em tempo de execução</b>: podem mudar via JavaScript, por media query ou por escopo (um componente redefine o valor). As do Sass são substituídas na compilação e viram valores fixos.`
          },
          busca: ["css custom properties", "dark mode css variables", "design tokens"]
        },
        {
          titulo: "Transições e animações",
          crianca: `Em vez de a porta <b>teletransportar</b> de fechada para aberta, ela abre devagarinho. <code>transition</code> faz a mudança ser suave; <code>@keyframes</code> é um <b>desenho animado</b> com vários quadros.`,
          codigo: c`
.card { transition: transform .2s ease, box-shadow .2s ease; }
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}

@keyframes girar { to { transform: rotate(360deg); } }
.carregando {
  width: 32px; height: 32px;
  border: 4px solid #ddd; border-top-color: #4f46e5;
  border-radius: 50%;
  animation: girar 1s linear infinite;
}

/* Respeite quem sente enjoo com movimento */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`,
          trabalho: `<b>Spinner</b> de carregamento, efeito ao passar o mouse nos produtos, menu que desliza no celular. Anime só <code>transform</code> e <code>opacity</code>, que são processados pela placa de vídeo e não deixam o site travando.`,
          entrevista: {
            pergunta: "Por que animar transform é melhor que animar top/left/width?",
            resposta: `<code>top</code>, <code>left</code> e <code>width</code> obrigam o navegador a recalcular o layout (reflow) a cada quadro. <code>transform</code> e <code>opacity</code> só recompõem camadas na GPU, o que mantém os 60 fps.`
          },
          busca: ["css transition vs animation", "css keyframes exemplos", "prefers-reduced-motion"]
        },
        {
          titulo: "Especificidade e organização (BEM)",
          crianca: `Quando duas pessoas dão ordens diferentes, quem manda mais ganha: o <b>id</b> manda mais que a <b>classe</b>, que manda mais que a <b>tag</b>. Para não virar briga, combinamos <b>nomes claros</b> para tudo, como “bloco__parte--variação”.`,
          codigo: c`
/* Especificidade: tag (0,0,1) < classe (0,1,0) < id (1,0,0) */

/* BEM: Bloco__Elemento--Modificador */
.card { }
.card__titulo { }
.card__botao { }
.card__botao--destaque { }

/* Evite: seletores longos e !important */
#menu ul li a.link { }   /* difícil de sobrescrever */
.menu__link { }          /* simples e previsível */`,
          trabalho: `Em projetos grandes, “mudei o botão e quebrou outra tela” é comum. Padronizar nomes (BEM) ou usar CSS Modules ou <b>Tailwind</b> evita isso. Muitas vagas pedem Tailwind ou Sass: os conceitos daqui são a base.`,
          entrevista: {
            pergunta: "O que é especificidade e quando usar !important?",
            resposta: `É o peso de um seletor para decidir qual regra vence: inline &gt; id &gt; classe/atributo/pseudo-classe &gt; tag. Em empate, vence a regra que vem por último. <code>!important</code> só em último caso (sobrescrever biblioteca de terceiros ou utilitários), porque quebra a cascata.`
          },
          busca: ["css specificity calculator", "bem css naming", "tailwind css vs css puro"]
        }
      ]
    }
  }
};
