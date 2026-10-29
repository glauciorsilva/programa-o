// Nível Iniciante da trilha python: tutoriais bem fáceis com prática no meio da explicação.
// Também traz as "paradas para praticar" (checkpoints) dos tópicos dos outros níveis.
import { m, vf, l } from "../extras/q.js";
const c = String.raw;

export default {
  objetivo: "entender o que é programar, escrever suas primeiras linhas em Python e fazer o computador mostrar mensagens e fazer contas.",
  topicos: [
    {
      titulo: "O que é programar? Seu primeiro print",
      crianca: `Programar é escrever <b>instruções</b> para o computador, uma por linha, como uma receita de bolo. O computador é muito obediente, mas não adivinha nada: ele faz <b>exatamente</b> o que está escrito, na ordem em que está escrito. Python é uma linguagem de programação conhecida por ser <b>fácil de ler</b>: parece quase inglês.`,
      passos: [
        {
          titulo: "A primeira instrução: print",
          html: `<p>A instrução <code>print</code> (“imprimir”, em inglês) <b>mostra um texto na tela</b>. O que você quer mostrar vai dentro dos parênteses, e o texto vai entre aspas.</p>`,
          codigo: c`print("Olá, mundo!")`,
          pratica: [
            m("O que a linha `print(\"Bom dia\")` faz?", ["Mostra Bom dia na tela", "Apaga a tela", "Desliga o computador", "Nada"], 0, "O `print` mostra na tela o que está dentro dos parênteses.")
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
            m("Com o código acima, qual frase aparece primeiro na tela?", ["3. Tomar café", "1. Acordar", "2. Escovar os dentes", "Todas ao mesmo tempo"], 1, "As linhas rodam de cima para baixo, então a primeira é `1. Acordar`.")
          ]
        }
      ],
      codigo: c`print("Olá, mundo!")
print("Estou aprendendo Python")
print("Uma linha de cada vez")`,
      partes: [
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
    }
  ],
  fixacao: [],
  checkpoints: {
    b1: [
      m("Qual destas linhas cria uma variável chamada `idade` com o valor 30?", ["idade = 30", "30 = idade", "print(idade 30)", "idade == 30"], 0, "Para guardar um valor usamos `nome = valor`. O `==` é para comparar, não para guardar.")
    ]
  }
};
