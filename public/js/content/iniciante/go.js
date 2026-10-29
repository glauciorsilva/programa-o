// Nível Iniciante da trilha go: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "escrever e rodar seus primeiros programas em Go no Go Playground, mostrar textos e contas na tela, guardar valores em variáveis e fazer o programa decidir com if.",
  topicos: [
    /* ===================== p1 ===================== */
    {
      titulo: "O que é Go e como rodar (Go Playground)",
      crianca: `Programar é escrever uma <b>lista de instruções</b> para o computador, como uma receita de bolo: ele faz exatamente o que está escrito, na ordem. <b>Go</b> é uma linguagem de programação criada pelo Google. Ela é simples, rápida e muito usada em sites e aplicativos grandes. Para começar, você não precisa instalar nada: dá para rodar Go num site chamado <b>Go Playground</b>.`,
      passos: [
        {
          titulo: "Go é uma linguagem para dar ordens ao computador",
          html: `<p>Uma <b>linguagem de programação</b> é um jeito de escrever ordens que o computador entende. Existem várias (Python, JavaScript, Java...). Go é uma delas.</p>
<p>Go é famosa por ser <b>organizada</b> e <b>rápida</b>. Bancos digitais e empresas de internet usam Go para os programas que ficam “por trás” dos aplicativos.</p>`,
          pratica: [
            m("O que é Go?", ["Uma linguagem de programação", "Um jogo de tabuleiro", "Um navegador de internet", "Um tipo de computador"], 0, "Go é uma linguagem de programação: um jeito de escrever ordens para o computador.")
          ]
        },
        {
          titulo: "Todo programa Go começa do mesmo jeito",
          html: `<p>Um programa Go sempre tem estas 3 partes. Pense nelas como o <b>cabeçalho</b> obrigatório de uma redação:</p>
<p><code>package main</code> diz “este é um programa que dá para rodar”. <code>import "fmt"</code> traz a <b>caixa de ferramentas</b> de mostrar textos (fmt vem de <i>format</i>, “formatar”). <code>func main() { }</code> é o <b>ponto de partida</b>: o computador começa a ler tudo o que estiver dentro das chaves <code>{ }</code>.</p>`,
          codigo: c`package main

import "fmt"

func main() {
	// suas ordens ficam aqui dentro
}`,
          pratica: [
            vf("O computador começa a executar o programa Go pelo que está dentro de `func main() { }`.", true, "A `func main` é o ponto de partida: tudo o que está entre as chaves dela é executado."),
            l("Complete a primeira linha de todo programa Go que dá para rodar:", c`package ____`, ["main"], "A primeira linha é `package main`. Ela avisa que o arquivo é um programa executável.")
          ]
        },
        {
          titulo: "Mostrando um texto na tela: fmt.Println",
          html: `<p><code>fmt.Println</code> mostra um texto na tela e pula para a linha de baixo (<i>Println</i> = “print line”, imprimir linha). O texto vai dentro dos parênteses e entre <b>aspas duplas</b>.</p>
<p>Repare: primeiro vem o nome da caixa de ferramentas (<code>fmt</code>), depois um ponto e o nome da ferramenta (<code>Println</code>), com <b>P maiúsculo</b>.</p>`,
          codigo: c`package main

import "fmt"

func main() {
	fmt.Println("Bom dia, padaria!")
}`,
          pratica: [
            l("Complete para mostrar Olá na tela:", c`fmt.____("Olá")`, ["Println"], "A ferramenta é `Println`, com P maiúsculo: `fmt.Println(\"Olá\")`."),
            m("Em Go, o texto que vai aparecer na tela fica entre...", ["Aspas duplas: \"assim\"", "Chaves: {assim}", "Asteriscos: *assim*", "Nada, é só escrever"], 0, "Em Go, textos ficam entre aspas duplas, como `\"Bom dia\"`.")
          ]
        },
        {
          titulo: "Rodando no Go Playground",
          html: `<p>Go não roda direto aqui no navegador, então vamos usar o <b>Go Playground</b>, um site oficial e gratuito. É só seguir 3 passos:</p>
<p><b>1.</b> Copie o código do exemplo (ou clique em <b>▶ Testar no sandbox</b>, que leva você até o playground). <b>2.</b> Abra <code>go.dev/play</code> e cole o código no lugar do que estiver lá. <b>3.</b> Clique no botão <b>Run</b> (“rodar”). O resultado aparece embaixo do código.</p>
<p>Se aparecer uma mensagem de erro, não se assuste: ela diz a linha do problema. Confira aspas, parênteses e chaves.</p>`,
          pratica: [
            m("No Go Playground, qual botão você clica para rodar o código?", ["Run", "Delete", "Share", "Exit"], 0, "O botão `Run` (rodar) executa o código e mostra o resultado logo abaixo."),
            vf("Para começar a programar em Go é obrigatório instalar programas no computador.", false, "Não é obrigatório: no Go Playground (go.dev/play) você cola o código e clica em Run, direto no navegador.")
          ]
        },
        {
          titulo: "Uma linha de cada vez",
          html: `<p>O computador lê as ordens <b>de cima para baixo</b>. Cada <code>fmt.Println</code> mostra uma linha nova na tela.</p>`,
          codigo: c`	fmt.Println("1. Ligar o forno")
	fmt.Println("2. Colocar o pão")
	fmt.Println("3. Esperar 20 minutos")`,
          pratica: [
            m("Com as 3 linhas acima, qual frase aparece por último na tela?", ["1. Ligar o forno", "2. Colocar o pão", "3. Esperar 20 minutos", "Nenhuma"], 2, "As linhas rodam de cima para baixo, então a última a aparecer é `3. Esperar 20 minutos`.")
          ]
        }
      ],
      codigo: c`package main

import "fmt"

func main() {
	fmt.Println("Olá, mundo!")
	fmt.Println("Estou aprendendo Go")
	fmt.Println("Uma linha de cada vez")
}`,
      partes: [
        ["package main", "Avisa que este arquivo é um programa que dá para rodar. Sempre a primeira linha."],
        ['import "fmt"', "Traz a caixa de ferramentas fmt, que sabe mostrar textos na tela."],
        ["func main() {", "Começo do programa. O computador executa o que está entre esta chave e a chave que fecha."],
        ['fmt.Println("Olá, mundo!")', "Mostra o texto Olá, mundo! e pula para a próxima linha."],
        ["}", "Fecha a func main. Toda chave que abre precisa fechar."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b>: ele abre o Go Playground. Cole o código (se precisar), clique em <b>Run</b> e troque as frases pelo que quiser.",
      trabalho: `Todo programa de verdade em Go, do sistema de um banco digital ao Docker, começa com <code>package main</code> e <code>func main()</code>. As mensagens que aparecem para quem cuida do sistema (“servidor ligado”, “pedido recebido”) saem de comandos parecidos com o <code>fmt.Println</code>.`,
      entrevista: {
        pergunta: "Para que servem o package main e a func main em Go?",
        resposta: `<code>package main</code> diz que o arquivo é um <b>programa executável</b> (e não uma biblioteca). A <code>func main()</code> é o <b>ponto de partida</b>: quando o programa roda, é ela que é chamada primeiro.`
      },
      busca: ["go playground", "primeiro programa em go", "go fmt.Println iniciante"]
    },

    /* ===================== p2 ===================== */
    {
      titulo: "Contas e textos",
      crianca: `O computador é uma <b>calculadora superpoderosa</b> e também sabe juntar palavras, como quem monta uma frase com ímãs de geladeira. Neste tópico você vai fazer contas da padaria e montar frases com Go.`,
      passos: [
        {
          titulo: "Contas com + - * /",
          html: `<p>Números em Go são escritos <b>sem aspas</b>. Os sinais das contas são: <code>+</code> soma, <code>-</code> subtração, <code>*</code> multiplicação (o “vezes”) e <code>/</code> divisão.</p>
<p>Se você colocar uma conta dentro do <code>fmt.Println</code>, Go faz a conta primeiro e mostra o resultado.</p>`,
          codigo: c`	fmt.Println(2 + 3)   // 5
	fmt.Println(10 - 4)  // 6
	fmt.Println(3 * 5)   // 15
	fmt.Println(20 / 4)  // 5`,
          pratica: [
            m("Em Go, qual sinal é usado para multiplicar?", ["*", "x", "×", "#"], 0, "A multiplicação usa o asterisco: `3 * 5` dá 15."),
            l("Complete para mostrar o resultado de 6 vezes 7:", c`fmt.Println(6 ____ 7)`, ["*"], "O sinal de vezes é `*`: `fmt.Println(6 * 7)` mostra 42.")
          ]
        },
        {
          titulo: "Números inteiros e números com vírgula",
          html: `<p>Go separa dois tipos de número: <b>inteiros</b> (sem vírgula, como 7) e <b>decimais</b> (com parte quebrada, como 4.5). Atenção: em programação, a “vírgula” do número é um <b>ponto</b>: <code>4.50</code>.</p>
<p>Uma pegadinha: dividir <b>dois inteiros</b> dá um inteiro, e a parte quebrada é jogada fora. <code>7 / 2</code> dá <code>3</code>. Para ter <code>3.5</code>, escreva um dos números como decimal: <code>7.0 / 2</code>.</p>`,
          codigo: c`	fmt.Println(7 / 2)    // 3
	fmt.Println(7.0 / 2)  // 3.5
	fmt.Println(4.50 + 3) // 7.5`,
          pratica: [
            vf("Em Go, `fmt.Println(7 / 2)` mostra 3.5.", false, "Os dois números são inteiros, então o resultado também é inteiro: mostra `3`. Para ver 3.5, use `7.0 / 2`."),
            m("Como se escreve o preço quatro reais e cinquenta centavos em Go?", ["4.50", "4,50", "R$4,50", "\"4,50\""], 0, "Em programação o separador decimal é o ponto: `4.50`.")
          ]
        },
        {
          titulo: "Textos e o + que junta",
          html: `<p>Um <b>texto</b> (os programadores chamam de <b>string</b>, “cordão de letras”) fica sempre entre aspas duplas. Com textos, o <code>+</code> não soma: ele <b>junta</b> um texto no outro.</p>
<p>Cuidado com o espaço: <code>"Pão" + "de queijo"</code> vira <code>Pãode queijo</code>. O espaço precisa estar dentro das aspas.</p>`,
          codigo: c`	fmt.Println("Pão" + " de queijo")  // Pão de queijo
	fmt.Println("2" + "3")             // 23 (são textos!)`,
          pratica: [
            m("O que aparece com `fmt.Println(\"2\" + \"3\")`?", ["23", "5", "2 + 3", "Erro"], 0, "Com aspas, `\"2\"` e `\"3\"` são textos, e o `+` junta textos: o resultado é `23`."),
            l("Complete para aparecer Bom dia (com espaço):", c`fmt.Println("Bom" + ____)`, ['" dia"'], "O espaço precisa ir dentro das aspas: `\"Bom\" + \" dia\"` vira `Bom dia`.")
          ]
        },
        {
          titulo: "Misturando texto e número com vírgula",
          html: `<p>Go <b>não deixa</b> juntar texto e número com <code>+</code> (<code>"Total: " + 10</code> dá erro). Mas o <code>fmt.Println</code> aceita várias coisas separadas por <b>vírgula</b> e coloca um espaço entre elas sozinho.</p>`,
          codigo: c`	fmt.Println("Total:", 3 * 2)        // Total: 6
	fmt.Println("Pães:", 5, "unidades") // Pães: 5 unidades`,
          pratica: [
            m("O que aparece com `fmt.Println(\"Troco:\", 10 - 7)`?", ["Troco: 3", "Troco:10 - 7", "Troco: 10 - 7", "Erro"], 0, "O Println faz a conta `10 - 7` e coloca um espaço entre as partes: `Troco: 3`."),
            vf("No `fmt.Println`, separar as partes com vírgula coloca um espaço entre elas automaticamente.", true, "Isso mesmo: `fmt.Println(\"Pães:\", 5)` mostra `Pães: 5`.")
          ]
        }
      ],
      codigo: c`package main

import "fmt"

func main() {
	fmt.Println("Padaria do Bairro")
	fmt.Println("3 pães custam:", 3 * 0.75)
	fmt.Println("Bolo dividido em 8:", 40.0 / 8)
	fmt.Println("Café" + " com leite")
}`,
      partes: [
        ['fmt.Println("Padaria do Bairro")', "Mostra um texto simples."],
        ['fmt.Println("3 pães custam:", 3 * 0.75)', "Faz a conta 3 × 0.75 e mostra junto com o texto, separados por espaço: 3 pães custam: 2.25."],
        ["40.0 / 8", "Como 40.0 é decimal, a divisão mantém a parte quebrada (aqui dá 5 certinho)."],
        ['"Café" + " com leite"', "O + junta os dois textos: Café com leite. O espaço está dentro das aspas."]
      ],
      nota: "No playground, troque os números e veja o resultado mudar. Experimente também <code>7 / 2</code> e <code>7.0 / 2</code>.",
      trabalho: `Caixas de loja, aplicativos de entrega e bancos fazem contas o tempo todo: total do pedido, troco, juros. E montam mensagens juntando textos, como “Pedido confirmado” ou “Seu saldo é”.`,
      entrevista: {
        pergunta: "Por que em Go 7 / 2 dá 3 e não 3.5?",
        resposta: `Porque <code>7</code> e <code>2</code> são <b>inteiros</b>, e a divisão de inteiros em Go devolve um inteiro, descartando a parte decimal. Para ter <code>3.5</code>, pelo menos um dos números precisa ser decimal (<code>float64</code>), por exemplo <code>7.0 / 2</code>.`
      },
      busca: ["go operadores aritméticos", "go divisão inteira", "go concatenar strings"]
    },

    /* ===================== p3 ===================== */
    {
      titulo: "Variáveis com := e var",
      crianca: `Uma <b>variável</b> é uma <b>caixinha com etiqueta</b>. Você escreve um nome na etiqueta (por exemplo, <code>preco</code>) e guarda algo dentro (por exemplo, <code>4.50</code>). Depois, é só chamar pelo nome para usar o que está guardado. Em Go, cada caixinha só aceita <b>um tipo de coisa</b>: caixa de número guarda número, caixa de texto guarda texto.`,
      passos: [
        {
          titulo: "Criando uma variável com :=",
          html: `<p>O jeito mais curto de criar uma variável é <code>nome := valor</code>. O sinal <code>:=</code> quer dizer “<b>crie</b> esta caixinha e guarde isto nela”.</p>
<p>Depois, use o nome da variável <b>sem aspas</b>. Com aspas, Go mostraria a palavra em si.</p>`,
          codigo: c`	cliente := "Ana"
	fmt.Println(cliente)    // Ana
	fmt.Println("cliente")  // cliente (a palavra, não a caixa)`,
          pratica: [
            l("Complete para criar a variável produto com o texto Café:", c`produto ____ "Café"`, [":="], "Para criar uma variável na forma curta usamos `:=`: `produto := \"Café\"`."),
            m("Se `total := 12`, o que `fmt.Println(total)` mostra?", ["12", "total", "\"total\"", "Nada"], 0, "Sem aspas, `total` é o nome da caixinha, então aparece o que está guardado nela: `12`.")
          ]
        },
        {
          titulo: "Os tipos básicos",
          html: `<p>O <b>tipo</b> diz o que a caixinha guarda. Os 4 mais usados:</p>
<p><code>int</code>: número inteiro (quantidade de pães: <code>12</code>). <code>float64</code>: número com parte decimal (preço: <code>4.50</code>). <code>string</code>: texto (nome: <code>"Ana"</code>). <code>bool</code>: só <code>true</code> (verdadeiro) ou <code>false</code> (falso), como “a loja está aberta?”.</p>
<p>Com <code>:=</code>, Go descobre o tipo sozinho olhando o valor.</p>`,
          codigo: c`	qtd := 12          // int
	preco := 4.50      // float64
	nome := "Ana"      // string
	aberta := true     // bool`,
          pratica: [
            m("Qual tipo guarda um texto, como o nome de um cliente?", ["string", "int", "bool", "float64"], 0, "Texto é `string`. `int` é inteiro, `float64` é decimal e `bool` é verdadeiro/falso."),
            m("Com `pago := false`, qual é o tipo de `pago`?", ["bool", "string", "int", "float64"], 0, "`true` e `false` são valores do tipo `bool` (verdadeiro ou falso).")
          ]
        },
        {
          titulo: "O jeito com var e trocando o valor",
          html: `<p>Também dá para criar com a palavra <code>var</code>, escrevendo o tipo depois do nome: <code>var preco float64 = 4.50</code>. Faz a mesma coisa que <code>:=</code>, só que deixa o tipo escrito.</p>
<p>Para <b>trocar</b> o valor de uma caixinha que já existe, use só <code>=</code> (sem os dois-pontos). O <code>:=</code> é só para criar.</p>`,
          codigo: c`	var estoque int = 20
	fmt.Println(estoque)  // 20
	estoque = 15          // vendeu 5
	fmt.Println(estoque)  // 15`,
          pratica: [
            l("Complete com o tipo certo para um número inteiro:", c`var pessoas ____ = 30`, ["int"], "Número inteiro é `int`: `var pessoas int = 30`."),
            vf("Para mudar o valor de uma variável que já existe, usamos `=` (sem os dois-pontos).", true, "Certo! `:=` cria; `=` troca o valor de uma caixinha que já foi criada.")
          ]
        },
        {
          titulo: "Go é exigente (e isso ajuda)",
          html: `<p>Duas regras do Go que pegam todo iniciante:</p>
<p><b>1.</b> Se você criar uma variável e <b>não usar</b>, o programa nem roda: aparece o erro <code>declared and not used</code> (“criada e não usada”). <b>2.</b> Uma caixinha de <code>int</code> não aceita texto. <code>qtd = "dez"</code> dá erro.</p>
<p>Parece chato, mas evita bagunça: o Go avisa o erro <b>antes</b> de o programa rodar.</p>`,
          pratica: [
            vf("Em Go, criar uma variável e nunca usá-la gera erro.", true, "Go recusa variáveis não usadas com o erro `declared and not used`. Basta usá-la (ou apagá-la)."),
            m("Se `qtd := 10`, o que acontece com `qtd = \"dez\"`?", ["Dá erro, porque qtd guarda int e \"dez\" é texto", "qtd passa a valer \"dez\"", "qtd passa a valer 10dez", "Nada acontece"], 0, "A caixinha `qtd` é do tipo `int`, então não aceita texto. O Go mostra o erro antes de rodar.")
          ]
        }
      ],
      codigo: c`package main

import "fmt"

func main() {
	produto := "Pão de queijo"
	var preco float64 = 4.50
	qtd := 3
	aberta := true

	fmt.Println("Produto:", produto)
	fmt.Println("Total:", preco * 3)
	fmt.Println("Loja aberta?", aberta)

	qtd = 5
	fmt.Println("Agora são", qtd, "unidades")
}`,
      partes: [
        ['produto := "Pão de queijo"', "Cria a caixinha produto (tipo string) com um texto."],
        ["var preco float64 = 4.50", "Cria preco com var, deixando o tipo float64 escrito."],
        ["qtd := 3", "Cria qtd; o Go vê o 3 e entende que é int."],
        ["aberta := true", "Cria aberta do tipo bool (verdadeiro ou falso)."],
        ['fmt.Println("Total:", preco * 3)', "Usa o valor guardado em preco na conta: 4.50 × 3 = 13.5."],
        ["qtd = 5", "Troca o valor de qtd. Só = porque a caixinha já existe."]
      ],
      nota: "No playground, apague a linha que usa <code>aberta</code> e clique em Run: veja o erro <code>declared and not used</code>.",
      trabalho: `Todo sistema guarda informações em variáveis: o nome do cliente, o preço do produto, a quantidade no estoque, se o pagamento foi aprovado. Escolher o tipo certo (int para quantidade, float64 para valor, bool para sim/não) é o dia a dia do programador.`,
      entrevista: {
        pergunta: "Qual a diferença entre := e var em Go?",
        resposta: `Os dois criam variáveis. <code>x := 10</code> é a forma curta, e o Go deduz o tipo pelo valor (só pode ser usada dentro de funções). <code>var x int = 10</code> é a forma completa, com o tipo escrito. Para mudar o valor de uma variável que já existe, usa-se só <code>=</code>.`
      },
      busca: ["go variáveis := var", "go tipos básicos int float64 string bool", "go declared and not used"]
    },

    /* ===================== p4 ===================== */
    {
      titulo: "Decidindo com if",
      crianca: `Todo dia você toma decisões: <b>se</b> está chovendo, leva guarda-chuva; <b>senão</b>, vai sem. O <code>if</code> (“se”, em inglês) faz o programa tomar decisões assim: ele confere uma pergunta de sim ou não e escolhe o que fazer.`,
      passos: [
        {
          titulo: "Perguntas de sim ou não: comparações",
          html: `<p>Uma <b>comparação</b> é uma pergunta que o computador responde com <code>true</code> (verdadeiro) ou <code>false</code> (falso).</p>
<p>Os sinais: <code>&gt;</code> maior que, <code>&lt;</code> menor que, <code>&gt;=</code> maior ou igual, <code>&lt;=</code> menor ou igual, <code>==</code> igual (dois sinais de igual!) e <code>!=</code> diferente.</p>`,
          codigo: c`	fmt.Println(10 > 5)   // true
	fmt.Println(3 == 4)   // false
	fmt.Println(7 != 2)   // true`,
          pratica: [
            m("O que `fmt.Println(8 < 3)` mostra?", ["false", "true", "8", "3"], 0, "8 não é menor que 3, então a resposta é `false` (falso)."),
            l("Complete com o sinal de “igual a” para comparar:", c`fmt.Println(5 ____ 5)`, ["=="], "Para comparar se é igual usamos `==` (dois sinais). Um só `=` serve para guardar valor.")
          ]
        },
        {
          titulo: "O if: só faz se for verdade",
          html: `<p>O <code>if</code> recebe uma comparação. Se ela for <code>true</code>, o programa executa o que está dentro das chaves <code>{ }</code>. Se for <code>false</code>, pula.</p>
<p>Em Go a comparação vai <b>sem parênteses</b>, e as chaves são <b>obrigatórias</b>, com a <code>{</code> na mesma linha do <code>if</code>.</p>`,
          codigo: c`	idade := 20
	if idade >= 18 {
		fmt.Println("Pode tirar carteira de motorista")
	}`,
          pratica: [
            vf("Com `idade := 15`, o código acima mostra a mensagem da carteira.", false, "15 não é maior ou igual a 18, a comparação dá `false` e o que está dentro do `if` é pulado."),
            l("Complete a palavra que começa uma decisão:", c`____ saldo > 0 {
	fmt.Println("Tem dinheiro")
}`, ["if"], "A decisão começa com `if`, seguida da comparação e das chaves.")
          ]
        },
        {
          titulo: "O else: o que fazer se não for verdade",
          html: `<p>O <code>else</code> (“senão”) é o <b>caminho B</b>: roda só quando a comparação do <code>if</code> dá <code>false</code>. Sempre um dos dois caminhos é escolhido, nunca os dois.</p>
<p>Em Go, o <code>else</code> fica na mesma linha da chave que fecha o <code>if</code>: <code>} else {</code>.</p>`,
          codigo: c`	estoque := 0
	if estoque > 0 {
		fmt.Println("Disponível")
	} else {
		fmt.Println("Esgotado")
	}`,
          pratica: [
            m("O que o código acima mostra?", ["Esgotado", "Disponível", "Disponível e Esgotado", "Nada"], 0, "`estoque` vale 0, e `0 > 0` é `false`, então roda o `else`: `Esgotado`."),
            vf("Em um `if` com `else`, os dois blocos podem rodar ao mesmo tempo.", false, "Nunca: ou roda o bloco do `if` (comparação verdadeira) ou o do `else` (falsa).")
          ]
        },
        {
          titulo: "Cuidado: = guarda, == compara",
          html: `<p>É o erro mais comum de quem começa: escrever <code>if nota = 10</code>. Um <code>=</code> só serve para <b>guardar</b> um valor. Para <b>perguntar</b> se é igual, use <code>==</code>.</p>
<p>A boa notícia: em Go, <code>if nota = 10</code> dá erro antes de rodar, então você percebe na hora.</p>`,
          codigo: c`	senha := "1234"
	if senha == "1234" {
		fmt.Println("Bem-vindo!")
	} else {
		fmt.Println("Senha incorreta")
	}`,
          pratica: [
            m("Qual linha está certa para conferir se a senha é 1234?", ["if senha == \"1234\" {", "if senha = \"1234\" {", "if (senha) {", "if senha := \"1234\" {"], 0, "Para comparar usamos `==`. O `=` sozinho é para guardar valor.")
          ]
        }
      ],
      codigo: c`package main

import "fmt"

func main() {
	total := 120.0

	if total >= 100 {
		fmt.Println("Frete grátis!")
	} else {
		fmt.Println("Frete: R$ 15")
	}

	pago := true
	if pago == true {
		fmt.Println("Pedido liberado")
	}
}`,
      partes: [
        ["total := 120.0", "Guarda o valor da compra numa variável."],
        ["if total >= 100 {", "Pergunta: o total é maior ou igual a 100? Aqui é verdade."],
        ['fmt.Println("Frete grátis!")', "Roda porque a comparação deu true."],
        ["} else {", "Caminho B: rodaria só se o total fosse menor que 100."],
        ["if pago == true {", "Compara com ==. Como pago é true, mostra Pedido liberado."]
      ],
      nota: "No playground, troque <code>120.0</code> por <code>80.0</code> e clique em Run: agora aparece o frete de R$ 15.",
      trabalho: `Sistemas decidem o tempo todo: <b>se</b> a senha está certa, entra; <b>se</b> o saldo é suficiente, aprova o pagamento; <b>se</b> a compra passa de R$ 100, o frete é grátis. Tudo isso é <code>if</code> e <code>else</code>.`,
      entrevista: {
        pergunta: "Qual a diferença entre = e == em Go?",
        resposta: `<code>=</code> <b>atribui</b> (guarda) um valor numa variável que já existe. <code>==</code> <b>compara</b> dois valores e devolve <code>true</code> ou <code>false</code>. Dentro do <code>if</code> usamos comparações, como <code>==</code>, <code>&gt;</code> e <code>!=</code>.`
      },
      busca: ["go if else", "go operadores de comparação", "go if sem parênteses"]
    }
  ],

  fixacao: [
    m("Qual é a primeira linha de um programa Go que dá para rodar?", ["package main", "func main()", "import \"fmt\"", "start go"], 0, "Todo programa executável em Go começa com `package main`."),
    vf("A `func main()` é o ponto de partida de um programa Go.", true, "Isso mesmo: o programa começa executando o que está dentro da `func main`."),
    m("Qual destas linhas mostra Oi na tela?", ["fmt.Println(\"Oi\")", "fmt.println(\"Oi\")", "Println Oi", "fmt.Println(Oi)"], 0, "É `fmt.Println`, com P maiúsculo, e o texto entre aspas duplas."),
    m("Como você roda um código Go no Go Playground?", ["Cola o código e clica em Run", "Salva como imagem", "Envia por e-mail", "Aperta Delete"], 0, "No go.dev/play, basta colar o código e clicar no botão `Run`."),
    m("Quanto é `fmt.Println(10 / 3)` em Go?", ["3", "3.33", "3.333333", "Erro"], 0, "Divisão entre dois inteiros dá inteiro: a parte decimal é descartada e o resultado é `3`."),
    l("Complete para juntar os textos e formar Bolo de fubá:", c`fmt.Println("Bolo" ____ " de fubá")`, ["+"], "Com textos, o `+` junta um no outro: `\"Bolo\" + \" de fubá\"`."),
    vf("Em Go, `\"Total: \" + 10` funciona e mostra Total: 10.", false, "Go não junta texto com número usando `+`. Use vírgula no Println: `fmt.Println(\"Total:\", 10)`."),
    m("Qual tipo é o mais indicado para guardar o preço 9.90?", ["float64", "int", "bool", "string"], 0, "Número com parte decimal é `float64`."),
    l("Complete para criar a variável cidade com o texto Recife:", c`cidade ____ "Recife"`, [":="], "A forma curta de criar uma variável é `:=`."),
    vf("`var qtd int = 5` e `qtd := 5` criam uma variável int com valor 5.", true, "As duas formas criam a mesma variável; a com `var` só deixa o tipo escrito."),
    m("O que aparece com este código?", ["Barato", "Caro", "Barato Caro", "Nada"], 0, "`preco` é 8, e `8 > 10` é falso, então roda o `else`: `Barato`.", c`preco := 8
if preco > 10 {
	fmt.Println("Caro")
} else {
	fmt.Println("Barato")
}`),
    l("Complete com o sinal de “diferente de”:", c`if status ____ "pago" {
	fmt.Println("Aguardando pagamento")
}`, ["!="], "O sinal de diferente em Go é `!=`.")
  ],

  checkpoints: {
    b1: [
      m("Qual linha cria a variável `nome` com o texto Lia usando a forma curta?", ["nome := \"Lia\"", "nome == \"Lia\"", "var nome := \"Lia\"", "\"Lia\" := nome"], 0, "A forma curta é `nome := valor`; o Go deduz que é `string`."),
      vf("Na linha `func soma(a int, b int) int`, o último `int` é o tipo do valor que a função devolve.", true, "Isso: depois dos parênteses vem o tipo do retorno. A função devolve um `int`.")
    ],
    b2: [
      m("Qual comando adiciona um item ao final de um slice em Go?", ["append", "push", "add", "insert"], 0, "Em Go usamos `append`, e reatribuímos: `precos = append(precos, 99.9)`."),
      vf("No `for _, p := range precos`, o `_` serve para ignorar o índice, que não será usado.", true, "O `range` entrega índice e item; o `_` descarta o índice, já que só precisamos do preço `p`.")
    ],
    b3: [
      m("O que é uma struct em Go?", ["Um tipo que agrupa campos, como uma ficha", "Um laço de repetição", "Uma lista que cresce", "Um tipo de erro"], 0, "Struct junta vários campos nomeados num tipo só, como `Conta{Titular, Saldo}`."),
      vf("No método `func (c *Conta) Depositar(v float64)`, o `*` (ponteiro) permite alterar a conta original.", true, "Com receptor ponteiro, o método trabalha na conta original; com receptor por valor, trabalharia numa cópia.")
    ],
    i1: [
      m("Em Go, como se sabe que uma função deu certo, sem erro?", ["O erro devolvido é nil", "O erro devolvido é true", "A função não devolve nada", "Aparece uma exceção"], 0, "Por convenção, `err == nil` significa “nenhum erro”."),
      vf("`errors.Is(err, ErrSaldoInsuficiente)` confere se o erro recebido é o erro `ErrSaldoInsuficiente`.", true, "`errors.Is` compara o erro (inclusive se ele estiver embrulhado com `%w`) com um erro conhecido.")
    ],
    i2: [
      vf("Em Go, um tipo precisa escrever `implements Notificador` para encaixar na interface.", false, "Não precisa: se o tipo tem os métodos pedidos (aqui, `Enviar`), ele encaixa na interface automaticamente."),
      m("Por que `Email` e `SMS` cabem na mesma lista `[]Notificador`?", ["Porque os dois têm o método Enviar(msg string) error", "Porque têm os mesmos campos", "Porque são strings", "Porque estão no mesmo arquivo"], 0, "Os dois têm o método `Enviar` com a mesma assinatura, então ambos são `Notificador`.")
    ],
    i3: [
      m("Qual pacote padrão de Go é usado para criar o servidor HTTP do exemplo?", ["net/http", "fmt", "os", "strings"], 0, "O pacote `net/http` já vem com Go e traz servidor, rotas e cliente HTTP."),
      vf("Em `mux.HandleFunc(\"POST /produtos\", ...)`, a função só responde a pedidos POST no caminho /produtos.", true, "Desde o Go 1.22, o padrão pode incluir o método HTTP antes do caminho.")
    ],
    a1: [
      m("Qual palavra inicia uma goroutine?", ["go", "async", "thread", "run"], 0, "Basta colocar `go` antes da chamada: `go func(...) { ... }()`."),
      vf("No exemplo, `wg.Wait()` espera todas as goroutines chamarem `wg.Done()` antes de seguir.", true, "O `WaitGroup` conta as tarefas: `Add` soma, `Done` subtrai e `Wait` espera chegar a zero.")
    ],
    a2: [
      m("O que `context.WithTimeout(..., 2*time.Second)` faz?", ["Cria um contexto que é cancelado depois de 2 segundos", "Faz o programa dormir 2 segundos", "Repete a requisição 2 vezes", "Limita a 2 goroutines"], 0, "Depois de 2 segundos o contexto “apita” e quem o usa (a requisição) desiste."),
      vf("O `defer cancel()` garante que os recursos do contexto sejam liberados quando a função terminar.", true, "Sempre chame `cancel` (normalmente com `defer`) para liberar o contexto, mesmo que o tempo não tenha acabado.")
    ],
    a3: [
      m("Como deve terminar o nome de um arquivo de testes em Go?", ["_test.go", ".test", "Test.go", "_spec.go"], 0, "O `go test` procura arquivos que terminam em `_test.go`."),
      vf("Uma função de teste em Go começa com `Test` e recebe `t *testing.T`.", true, "Exemplo: `func TestDesconto(t *testing.T)`. Para benchmarks, `Benchmark` e `b *testing.B`.")
    ]
  }
};
