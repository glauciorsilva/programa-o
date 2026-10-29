// Nível Iniciante da trilha python: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é programar, escrever suas primeiras linhas em Python, fazer contas, guardar valores em variáveis e conversar com o usuário usando input.",
  topicos: [
    {
      titulo: "O que é programar? Seu primeiro print",
      crianca: `Programar é escrever <b>instruções</b> para o computador, uma por linha, como uma receita de bolo. O computador é muito obediente, mas não adivinha nada: ele faz <b>exatamente</b> o que está escrito, na ordem em que está escrito. Python é uma linguagem de programação conhecida por ser <b>fácil de ler</b>: parece quase inglês.`,
      passos: [
        {
          titulo: "A primeira instrução: print",
          html: `<p>A instrução <code>print</code> (“imprimir”, em inglês) <b>mostra um texto na tela</b>. O que você quer mostrar vai dentro dos parênteses, e o texto vai entre aspas.</p>
<p>Para testar, você pode usar o botão <b>▶ Testar no sandbox</b> aqui da página: escreva o código e clique em rodar. Não precisa instalar nada.</p>`,
          codigo: c`print("Olá, mundo!")`,
          pratica: [
            m("O que a linha `print(\"Bom dia\")` faz?", ["Mostra Bom dia na tela", "Apaga a tela", "Desliga o computador", "Nada"], 0, "O `print` mostra na tela o que está dentro dos parênteses."),
            vf("O computador consegue adivinhar o que você quis dizer, mesmo se estiver escrito errado.", false, "O computador faz exatamente o que está escrito. Por isso cada detalhe (aspas, parênteses) importa.")
          ]
        },
        {
          titulo: "Textos sempre entre aspas",
          html: `<p>Para o Python, um <b>texto</b> precisa estar entre aspas: <code>"assim"</code> ou <code>'assim'</code>. Sem aspas, ele acha que é o nome de alguma coisa e dá erro.</p>`,
          codigo: c`print("Meu nome é Ana")
print('Tenho 20 anos')`,
          pratica: [
            vf("`print(Olá)` (sem aspas) funciona normalmente.", false, "Sem aspas, o Python procura algo chamado `Olá` e mostra um erro (NameError). Texto vai entre aspas."),
            l("Complete para mostrar Tchau na tela:", c`print(____)`, ['"Tchau"', "'Tchau'"], "O texto vai entre aspas dentro dos parênteses: `print(\"Tchau\")`.")
          ]
        },
        {
          titulo: "Uma linha de cada vez, de cima para baixo",
          html: `<p>O computador executa as linhas <b>na ordem</b>, de cima para baixo. Cada <code>print</code> mostra uma linha nova na tela.</p>`,
          codigo: c`print("1. Acordar")
print("2. Escovar os dentes")
print("3. Tomar café")`,
          pratica: [
            m("Com o código acima, qual frase aparece primeiro na tela?", ["3. Tomar café", "1. Acordar", "2. Escovar os dentes", "Todas ao mesmo tempo"], 1, "As linhas rodam de cima para baixo, então a primeira é `1. Acordar`."),
            m("Quantas linhas aparecem na tela com 3 comandos `print`?", ["1", "2", "3", "Nenhuma"], 2, "Cada `print` mostra uma linha nova. Três `print`, três linhas.")
          ]
        },
        {
          titulo: "Comentários: bilhetes para você mesmo",
          html: `<p>Tudo o que vem depois do símbolo <code>#</code> numa linha é um <b>comentário</b>: o Python <b>ignora</b>. Serve para deixar recados para quem for ler o código (inclusive você, daqui a um mês).</p>`,
          codigo: c`# Este programa dá boas-vindas
print("Bem-vindo à padaria!")  # mostra a mensagem`,
          pratica: [
            m("O que o Python faz com a linha `# lista de compras`?", ["Mostra na tela", "Ignora, porque é um comentário", "Dá erro", "Apaga o programa"], 1, "O `#` marca um comentário: é só um recado para pessoas, o Python pula essa parte.")
          ]
        }
      ],
      codigo: c`# Meu primeiro programa
print("Olá, mundo!")
print("Estou aprendendo Python")
print("Uma linha de cada vez")`,
      partes: [
        ["# Meu primeiro programa", "Comentário: um recado para quem lê. O Python ignora."],
        ["print(", "É o comando que mostra algo na tela. Sempre seguido de parênteses."],
        ['"Olá, mundo!"', "É o texto que vai aparecer. Fica entre aspas para o Python saber que é texto."],
        [")", "Fecha o comando. Todo parêntese que abre precisa fechar."]
      ],
      nota: "Clique em <b>▶ Testar no sandbox</b> e troque as frases pelo que você quiser.",
      trabalho: `Programas de verdade mostram mensagens o tempo todo: “Pagamento aprovado”, “Senha incorreta”, “Arquivo salvo”. Por trás de cada mensagem há algo parecido com um <code>print</code>.`,
      entrevista: {
        pergunta: "O que acontece se eu esquecer de fechar as aspas ou o parêntese?",
        resposta: `O Python mostra um <b>erro de sintaxe</b> (<code>SyntaxError</code>) e não roda nada. Ele avisa a linha do problema: é só conferir se toda aspa e todo parêntese que abriu também fechou.`
      },
      busca: ["python print para iniciantes", "o que é programação", "primeiro programa python"]
    },
    {
      titulo: "Fazendo contas",
      crianca: `O Python é uma <b>calculadora muito rápida</b>. Você escreve a conta e ele dá o resultado na hora. Serve para somar a conta da padaria, calcular o troco ou dividir a pizza entre os amigos.`,
      passos: [
        {
          titulo: "Somar e subtrair",
          html: `<p>Para fazer uma conta, escreva a conta <b>sem aspas</b> dentro do <code>print</code>. Use <code>+</code> para somar e <code>-</code> para subtrair.</p>`,
          codigo: c`print(2 + 3)
print(10 - 4)`,
          pratica: [
            m("O que aparece na tela com `print(7 + 1)`?", ["7 + 1", "8", "71", "Erro"], 1, "Sem aspas, o Python faz a conta: 7 + 1 = 8."),
            l("Complete para mostrar quanto é 9 menos 5:", c`print(9 ____ 5)`, ["-"], "O sinal de menos `-` faz a subtração: 9 - 5 = 4.")
          ]
        },
        {
          titulo: "Multiplicar e dividir",
          html: `<p>No teclado não tem “×” nem “÷”. Em Python, a multiplicação é o <b>asterisco</b> <code>*</code> e a divisão é a <b>barra</b> <code>/</code>.</p>
<p>A divisão com <code>/</code> sempre dá um número com ponto: <code>10 / 2</code> mostra <code>5.0</code>.</p>`,
          codigo: c`print(3 * 4)    # 3 pães de R$ 4
print(20 / 4)   # 20 reais divididos por 4 pessoas`,
          pratica: [
            m("Qual sinal faz multiplicação em Python?", ["`x`", "`*`", "`.`", "`÷`"], 1, "O asterisco `*` é o sinal de vezes: `3 * 4` dá 12."),
            vf("`print(20 / 4)` mostra `5.0`.", true, "A divisão com `/` sempre devolve um número com ponto (decimal), mesmo quando a conta é exata.")
          ]
        },
        {
          titulo: "Conta com número e conta em texto são diferentes",
          html: `<p>Com aspas, o Python acha que é um <b>texto</b> e mostra do jeito que está escrito. Sem aspas, ele <b>calcula</b>.</p>`,
          codigo: c`print("2 + 3")   # mostra: 2 + 3
print(2 + 3)     # mostra: 5`,
          pratica: [
            m("O que aparece na tela com `print(\"5 * 2\")`?", ["10", "5 * 2", "52", "Erro"], 1, "Está entre aspas, então é texto: o Python mostra exatamente `5 * 2`, sem calcular.")
          ]
        },
        {
          titulo: "A ordem das contas",
          html: `<p>Igual na escola: <b>multiplicação e divisão vêm antes</b> de soma e subtração. Em <code>2 + 3 * 4</code>, o Python faz primeiro <code>3 * 4 = 12</code> e depois soma 2: resultado <b>14</b>.</p>
<p>Quer que a soma venha primeiro? Use <b>parênteses</b>: <code>(2 + 3) * 4</code> dá <b>20</b>.</p>`,
          codigo: c`print(2 + 3 * 4)     # 14
print((2 + 3) * 4)   # 20`,
          pratica: [
            m("Quanto dá `print(10 - 2 * 3)`?", ["24", "4", "6", "16"], 1, "Primeiro a multiplicação: 2 * 3 = 6. Depois 10 - 6 = 4."),
            l("Complete com parênteses para somar 1 + 1 antes de multiplicar por 5 (resultado 10):", c`print(____ * 5)`, ["(1 + 1)", "(1+1)"], "Os parênteses fazem a soma acontecer primeiro: `(1 + 1) * 5` = 10.")
          ]
        }
      ],
      codigo: c`# Conta da padaria
print(3 * 0.50)          # 3 pães de R$ 0,50
print(2 * 4.50 + 6)      # 2 cafés de R$ 4,50 e um bolo de R$ 6
print((12 + 8) / 2)      # dividir R$ 20 entre 2 amigos`,
      partes: [
        ["3 * 0.50", "Multiplica a quantidade pelo preço. Número decimal usa <b>ponto</b>, não vírgula."],
        ["2 * 4.50 + 6", "Primeiro a multiplicação (2 * 4.50 = 9.0), depois a soma: 15.0."],
        ["(12 + 8) / 2", "Os parênteses fazem a soma primeiro (20) e depois divide por 2: 10.0."],
        ["# dividir R$ 20 ...", "Comentário explicando a conta. O Python ignora."]
      ],
      nota: "Em Python, número com casas decimais usa <b>ponto</b>: escreva <code>4.50</code>, nunca <code>4,50</code>.",
      trabalho: `Todo sistema de loja faz contas: somar os itens do carrinho, calcular o frete, aplicar desconto, dividir em parcelas. São exatamente os sinais <code>+ - * /</code> que você acabou de ver.`,
      entrevista: {
        pergunta: "Por que `print(2 + 3 * 4)` mostra 14 e não 20?",
        resposta: `Porque o Python segue a <b>precedência</b> (a ordem) da matemática: multiplicação e divisão antes de soma e subtração. Para mudar a ordem, usamos parênteses: <code>(2 + 3) * 4</code> dá 20.`
      },
      busca: ["python operadores aritméticos", "python ordem das operações", "python calculadora iniciante"]
    },
    {
      titulo: "Guardando coisas em variáveis",
      crianca: `Uma variável é uma <b>caixinha com etiqueta</b>. Você escreve o nome na etiqueta (por exemplo, <code>preco</code>) e guarda um valor dentro (por exemplo, <code>5</code>). Depois, sempre que precisar do valor, é só chamar a caixinha pelo nome.`,
      passos: [
        {
          titulo: "Criando uma variável: nome = valor",
          html: `<p>Para guardar um valor, escreva o <b>nome</b>, o sinal <code>=</code> e o <b>valor</b>. Aqui o <code>=</code> não quer dizer “igual”: quer dizer “<b>guarde</b> isto aqui”.</p>`,
          codigo: c`preco = 5
cliente = "Joana"`,
          pratica: [
            m("O que a linha `idade = 12` faz?", ["Compara idade com 12", "Guarda o número 12 na variável idade", "Mostra 12 na tela", "Dá erro"], 1, "O `=` guarda o valor da direita na caixinha da esquerda."),
            l("Complete para guardar o texto Maria na variável `nome`:", c`nome = ____`, ['"Maria"', "'Maria'"], "Texto vai entre aspas: `nome = \"Maria\"`.")
          ]
        },
        {
          titulo: "Usando a variável no print",
          html: `<p>Para mostrar o que tem dentro da caixinha, coloque o nome dela no <code>print</code>, <b>sem aspas</b>. Com aspas, apareceria a palavra, e não o valor.</p>
<p>Para juntar texto e variável, separe com <b>vírgula</b>: o <code>print</code> coloca um espaço entre eles.</p>`,
          codigo: c`cliente = "Joana"
print(cliente)               # Joana
print("Olá,", cliente)       # Olá, Joana`,
          pratica: [
            m("Com `fruta = \"maçã\"`, o que `print(\"fruta\")` mostra?", ["maçã", "fruta", "Erro", "Nada"], 1, "Com aspas é texto: aparece a palavra `fruta`. Para ver o valor, use `print(fruta)` sem aspas."),
            vf("`print(\"Total:\", 10)` mostra `Total: 10`.", true, "A vírgula separa as coisas que o `print` mostra e coloca um espaço entre elas.")
          ]
        },
        {
          titulo: "Fazendo contas com variáveis",
          html: `<p>Variáveis com números podem entrar em contas, como se fossem os próprios números. E o resultado pode ser guardado em <b>outra</b> variável.</p>`,
          codigo: c`preco = 5
quantidade = 3
total = preco * quantidade
print("Total:", total)      # Total: 15`,
          pratica: [
            m("Com `a = 4` e `b = 6`, quanto vale `a + b`?", ["46", "10", "a + b", "24"], 1, "O Python troca cada nome pelo valor guardado: 4 + 6 = 10.")
          ]
        },
        {
          titulo: "Mudando o valor da caixinha",
          html: `<p>Uma variável pode receber um <b>novo valor</b> a qualquer momento. O valor antigo é jogado fora e fica só o novo.</p>
<p>Dá até para usar o valor atual para calcular o novo: <code>estoque = estoque - 1</code> quer dizer “pegue o estoque, tire 1 e guarde de volta”.</p>`,
          codigo: c`estoque = 10
print(estoque)        # 10
estoque = estoque - 1
print(estoque)        # 9`,
          pratica: [
            m("Depois destas linhas, quanto vale `pontos`? `pontos = 5` e depois `pontos = 8`", ["5", "8", "13", "58"], 1, "O novo valor substitui o antigo. Fica só o 8."),
            l("Complete para somar 1 ao valor atual de `visitas`:", c`visitas = 3
visitas = ____ + 1`, ["visitas"], "Usamos o valor atual da própria variável: `visitas = visitas + 1` guarda 4.")
          ]
        },
        {
          titulo: "Bons nomes para as caixinhas",
          html: `<p>Regras simples para nomes: comece com <b>letra</b>, sem espaços e sem acentos. Para nomes com duas palavras, use <b>sublinhado</b>: <code>valor_total</code>. Escolha nomes que digam o que está guardado: <code>preco</code> é melhor que <code>x</code>.</p>`,
          codigo: c`valor_total = 30
nome_cliente = "Pedro"`,
          pratica: [
            m("Qual destes é um nome de variável válido em Python?", ["`valor total`", "`valor_total`", "`1valor`", "`valor-total`"], 1, "Sem espaço, sem traço e sem começar com número. O sublinhado `_` junta as palavras.")
          ]
        }
      ],
      codigo: c`# Compra na padaria
produto = "Pão francês"
preco = 0.50
quantidade = 6
total = preco * quantidade

print("Produto:", produto)
print("Total a pagar:", total)

quantidade = quantidade + 2   # o cliente pediu mais 2
total = preco * quantidade
print("Novo total:", total)`,
      partes: [
        ['produto = "Pão francês"', "Guarda um texto (entre aspas) na variável <code>produto</code>."],
        ["preco = 0.50", "Guarda um número decimal. Número não leva aspas."],
        ["total = preco * quantidade", "Faz a conta com os valores guardados e coloca o resultado em <code>total</code>."],
        ['print("Produto:", produto)', "Mostra o texto e, depois de um espaço, o valor da variável."],
        ["quantidade = quantidade + 2", "Muda o valor: pega o atual (6), soma 2 e guarda 8."],
        ["total = preco * quantidade", "A conta precisa ser feita de novo para o total acompanhar a nova quantidade."]
      ],
      nota: "Repare: mudar <code>quantidade</code> não muda <code>total</code> sozinho. Por isso calculamos o total de novo.",
      trabalho: `Em um caixa de loja, variáveis guardam o nome do cliente, o total da compra, o desconto e o troco. Quando um item é adicionado, o total é atualizado, exatamente como <code>total = total + preco</code>.`,
      entrevista: {
        pergunta: "Qual a diferença entre `=` e `==` em Python?",
        resposta: `O <code>=</code> <b>guarda</b> um valor numa variável (<code>idade = 30</code>). O <code>==</code> <b>compara</b> dois valores e responde verdadeiro ou falso (<code>idade == 30</code>). Você vai usar o <code>==</code> no tópico de condições.`
      },
      busca: ["python variáveis para iniciantes", "python atribuição de variável", "nomes de variáveis python"]
    },
    {
      titulo: "Conversando com o usuário: input",
      crianca: `Até agora o programa só falava. Com o <code>input</code>, ele também <b>escuta</b>: faz uma pergunta, espera a pessoa digitar e guarda a resposta. É como o atendente da padaria perguntando “Quantos pães?” e anotando no bloquinho.`,
      passos: [
        {
          titulo: "Fazendo uma pergunta",
          html: `<p>O <code>input("pergunta")</code> mostra a pergunta e <b>espera</b> a pessoa digitar e apertar Enter. O que ela digitou é guardado na variável da esquerda.</p>
<p>No sandbox desta página, escreva as respostas na caixa <b>“Entrada”</b>, uma por linha, antes de rodar.</p>`,
          codigo: c`nome = input("Qual é o seu nome? ")
print("Olá,", nome)`,
          pratica: [
            m("O que o `input` faz?", ["Só mostra um texto", "Mostra uma pergunta e espera a pessoa digitar", "Faz uma conta", "Apaga uma variável"], 1, "O `input` pergunta, espera a resposta e devolve o que foi digitado."),
            l("Complete para perguntar a cidade e guardar a resposta em `cidade`:", c`cidade = ____("Em que cidade você mora? ")`, ["input"], "O comando que lê o que a pessoa digita é o `input`.")
          ]
        },
        {
          titulo: "O input sempre devolve texto",
          html: `<p>Atenção: tudo que vem do <code>input</code> é <b>texto</b>, mesmo que a pessoa digite um número. Se ela digitar <code>3</code>, o Python guarda <code>"3"</code> (com aspas).</p>
<p>E texto somado com texto <b>gruda</b>: <code>"3" + "2"</code> dá <code>"32"</code>, e não 5!</p>`,
          codigo: c`a = input("Primeiro número: ")   # pessoa digita 3
b = input("Segundo número: ")    # pessoa digita 2
print(a + b)                     # 32  (grudou os textos!)`,
          pratica: [
            vf("Se a pessoa digitar 10 num `input`, o Python guarda o número 10.", false, "O `input` sempre devolve texto: guarda `\"10\"`. Para fazer conta, é preciso converter."),
            m("Quanto dá `\"4\" + \"4\"`?", ["8", "\"44\"", "Erro", "16"], 1, "São textos (estão entre aspas), então o `+` junta um no outro: `\"44\"`.")
          ]
        },
        {
          titulo: "Convertendo para número com int()",
          html: `<p>Para transformar o texto em número inteiro, use <code>int()</code> (de “inteiro”). Coloque o <code>input</code> dentro dele, ou converta a variável depois.</p>
<p>Para números com vírgula (como preço), use <code>float()</code>. A pessoa digita com <b>ponto</b>: <code>4.50</code>.</p>`,
          codigo: c`quantidade = int(input("Quantos pães? "))   # digita 4
print(quantidade * 2)                        # 8`,
          pratica: [
            l("Complete para converter a resposta em número inteiro:", c`idade = ____(input("Sua idade: "))`, ["int"], "O `int()` transforma o texto digitado em número inteiro."),
            m("Para ler um preço como `4.50`, qual conversão é melhor?", ["`int()`", "`float()`", "`print()`", "Nenhuma"], 1, "`float()` aceita números com ponto decimal. O `int()` é só para inteiros.")
          ]
        },
        {
          titulo: "Juntando tudo: pergunta, conta e resposta",
          html: `<p>Um programa completo costuma ter 3 partes: <b>pergunta</b> (input), <b>conta</b> (com as variáveis) e <b>resposta</b> (print).</p>`,
          codigo: c`preco = 0.50
quantidade = int(input("Quantos pães? "))
total = preco * quantidade
print("Total:", total)`,
          pratica: [
            m("Se a pessoa digitar 6 no código acima, o que aparece no fim?", ["Total: 6", "Total: 3.0", "Total: 0.506", "Erro"], 1, "`int(\"6\")` vira 6, e 0.50 * 6 = 3.0.")
          ]
        }
      ],
      codigo: c`# Caixa da padaria
nome = input("Nome do cliente: ")
paes = int(input("Quantos pães? "))
preco = 0.50

total = paes * preco
print("Cliente:", nome)
print("Total a pagar:", total)`,
      partes: [
        ['nome = input("Nome do cliente: ")', "Pergunta o nome e guarda o texto digitado. Nome é texto mesmo, não precisa converter."],
        ['paes = int(input("Quantos pães? "))', "Pergunta a quantidade e já converte para número inteiro com <code>int()</code>."],
        ["total = paes * preco", "Agora que <code>paes</code> é número, a multiplicação funciona."],
        ['print("Total a pagar:", total)', "Mostra a resposta para a pessoa."]
      ],
      sandbox: { entrada: "Carla\n6" },
      nota: "No sandbox, escreva as respostas na caixa <b>Entrada</b> (uma por linha), por exemplo <code>Carla</code> e <code>6</code>.",
      trabalho: `Caixas eletrônicos, totens de lanchonete e cadastros perguntam coisas e usam as respostas: “Digite o valor do saque”, “Quantas unidades?”. Em sites e apps a pergunta vem de um formulário, mas a ideia é a mesma: a resposta chega como <b>texto</b> e precisa ser convertida para fazer contas.`,
      entrevista: {
        pergunta: "Por que `input()` + `input()` às vezes dá `\"32\"` em vez de 5?",
        resposta: `Porque o <code>input()</code> sempre devolve <b>texto</b>, e o <code>+</code> entre textos junta um no outro. A solução é converter antes: <code>int(a) + int(b)</code>. Se a pessoa digitar letras, o <code>int()</code> dá erro <code>ValueError</code>.`
      },
      busca: ["python input int", "python converter texto em número", "python input para iniciantes"]
    }
  ],
  fixacao: [
    m("Qual comando mostra uma mensagem na tela?", ["`input`", "`print`", "`show`", "`int`"], 1, "O `print` mostra na tela o que estiver dentro dos parênteses."),
    vf("Em Python, texto precisa estar entre aspas.", true, "Aspas duplas ou simples avisam ao Python que aquilo é um texto."),
    m("Em que ordem o Python roda as linhas de um programa?", ["De baixo para cima", "De cima para baixo", "Em ordem aleatória", "Só a última"], 1, "Uma linha de cada vez, de cima para baixo."),
    l("Complete para mostrar o resultado de 6 vezes 7:", c`print(6 ____ 7)`, ["*"], "O asterisco `*` é o sinal de multiplicação."),
    m("Quanto dá `print(1 + 2 * 3)`?", ["9", "7", "6", "123"], 1, "Primeiro a multiplicação: 2 * 3 = 6. Depois 1 + 6 = 7."),
    vf("Em Python, o número quatro e meio se escreve `4,5`.", false, "Número decimal usa ponto: `4.5`."),
    m("O que a linha `cor = \"azul\"` faz?", ["Mostra azul na tela", "Guarda o texto azul na variável cor", "Pergunta a cor ao usuário", "Compara cor com azul"], 1, "`nome = valor` guarda o valor na variável."),
    l("Complete para mostrar o valor guardado na variável `total`:", c`total = 50
print(____)`, ["total"], "Para ver o valor, use o nome da variável sem aspas."),
    m("Depois de `x = 2` e `x = x + 3`, quanto vale `x`?", ["2", "3", "5", "23"], 2, "Pega o valor atual (2), soma 3 e guarda de volta: 5."),
    m("O que o `input` devolve quando a pessoa digita 7?", ["O número 7", "O texto \"7\"", "Nada", "Um erro"], 1, "O `input` sempre devolve texto. Para fazer conta, converta com `int()`."),
    l("Complete para transformar o texto `\"15\"` em número inteiro:", c`numero = ____("15")`, ["int"], "`int()` converte texto em número inteiro."),
    m("O que o Python faz com o que vem depois de `#`?", ["Mostra na tela", "Ignora (é comentário)", "Transforma em número", "Pergunta ao usuário"], 1, "O `#` inicia um comentário, um recado para quem lê o código.")
  ],
  checkpoints: {
    b1: [
      m("Qual destas linhas cria uma variável chamada `idade` com o valor 30?", ["idade = 30", "30 = idade", "print(idade 30)", "idade == 30"], 0, "Para guardar um valor usamos `nome = valor`. O `==` é para comparar, não para guardar."),
      m("Com `nome = \"Ana\"`, o que `print(f\"Oi, {nome}!\")` mostra?", ["Oi, {nome}!", "Oi, Ana!", "Oi, nome!", "Erro"], 1, "Na f-string (com `f` antes das aspas), o que está entre chaves é trocado pelo valor da variável.")
    ],
    b2: [
      vf("Num `if/elif/else`, apenas um dos blocos é executado.", true, "O Python executa o primeiro bloco cuja condição for verdadeira e pula os outros."),
      m("Com `nota = 7.5`, qual conceito o código do tópico guarda?", ["A", "B", "C", "Reprovado"], 1, "7.5 não é ≥ 9, mas é ≥ 7, então entra no `elif nota >= 7` e o conceito é B.")
    ],
    b3: [
      m("Qual é o primeiro item de `vendas = [150.0, 320.5, 89.9]`?", ["`vendas[1]`", "`vendas[0]`", "`vendas[-1]`", "`vendas[first]`"], 1, "Os índices começam em 0, então o primeiro é `vendas[0]`."),
      l("Complete para adicionar 450.0 no final da lista:", c`vendas.____(450.0)`, ["append"], "`append` acrescenta um item no fim da lista.")
    ],
    i1: [
      m("O que o `return` faz numa função?", ["Repete a função", "Devolve o resultado para quem chamou", "Mostra na tela", "Apaga a função"], 1, "O `return` entrega o resultado e encerra a função."),
      m("Quanto devolve `calcular_desconto(200)` se o percentual padrão é 10?", ["200", "180.0", "190.0", "20"], 1, "Sem informar o percentual, usa 10%: 200 - 20 = 180.0.")
    ],
    i2: [
      vf("Em um dicionário, você acessa os valores pela chave, como `cliente[\"nome\"]`.", true, "Dicionário guarda pares chave: valor; a chave é a etiqueta usada para buscar."),
      m("Com `cliente = {\"nome\": \"Carlos\"}`, o que `cliente.get(\"email\", \"sem e-mail\")` devolve?", ["Um erro KeyError", "\"sem e-mail\"", "`None`", "\"Carlos\""], 1, "A chave `email` não existe, então o `get` devolve o valor padrão informado.")
    ],
    i3: [
      m("Para que serve o `try/except`?", ["Para repetir código", "Para tratar um erro sem o programa parar", "Para abrir arquivos", "Para criar funções"], 1, "Se algo dentro do `try` falhar, o `except` segura o erro e o programa continua."),
      vf("Abrindo com `with open(...)`, o arquivo é fechado sozinho no fim do bloco.", true, "O `with` garante o fechamento, mesmo se acontecer um erro no meio.")
    ],
    a1: [
      m("Na analogia do tópico, a classe é a fôrma. O que são os objetos?", ["Os ingredientes", "Os biscoitos feitos com a fôrma", "O forno", "A receita"], 1, "A classe é o molde; cada objeto é um biscoito criado a partir dele."),
      l("Complete o nome do método que roda quando o objeto é criado:", c`class Conta:
    def ____(self, titular, saldo=0):
        self.titular = titular`, ["__init__"], "O `__init__` é o construtor: define os atributos iniciais do objeto.")
    ],
    a2: [
      vf("O pandas trabalha com tabelas chamadas DataFrame, parecidas com uma planilha.", true, "O DataFrame tem linhas e colunas nomeadas, como no Excel."),
      m("No código do tópico, o que `df[df[\"status\"] == \"pago\"]` faz?", ["Apaga os pedidos pagos", "Mantém só as linhas com status pago", "Conta os pedidos", "Muda o status para pago"], 1, "É um filtro: ficam só as linhas em que a coluna status é \"pago\".")
    ],
    a3: [
      m("Na analogia do tópico, a API é quem?", ["O cozinheiro", "O garçom", "O cliente", "O cardápio"], 1, "A API recebe o pedido do cliente (app/site), leva à cozinha (seu código) e traz a resposta."),
      m("Qual código de status a rota de busca devolve quando o produto não existe?", ["200", "201", "404", "500"], 2, "404 significa “não encontrado”, usado no `HTTPException(status_code=404, ...)`.")
    ]
  }
};
