// Exercícios de código da trilha go (completar e criar do zero), por tópico.
// Go não roda no navegador: a verificação é feita pelos "padroes" e a saída esperada é mostrada ao aluno.
const c = String.raw;

export default {
  /* ===================== b1: Primeiro programa, variáveis e funções ===================== */
  b1: [
    {
      tipo: "completar",
      titulo: "Ficha da funcionária",
      enunciado: `O RH quer um programa que mostre a ficha de uma funcionária. Complete as variáveis:
        <ul>
          <li><code>nome</code> com a forma curta <code>:=</code> e o texto <code>"Ana Souza"</code>;</li>
          <li><code>idade</code> com <code>var</code>, tipo <code>int</code> e valor <code>32</code>;</li>
          <li><code>salario</code> com <code>:=</code> e o valor decimal <code>3500.50</code>.</li>
        </ul>
        Substitua cada <code>____</code> pelo que falta.`,
      dica: `Texto vai entre aspas duplas. Na forma completa, o tipo vem depois do nome: <code>var idade int = ...</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	nome := ____
	var idade ____ = ____
	salario := ____

	fmt.Printf("Funcionária: %s\n", nome)
	fmt.Printf("Idade: %d anos\n", idade)
	fmt.Printf("Salário: R$ %.2f\n", salario)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	nome := "Ana Souza"
	var idade int = 32
	salario := 3500.50

	fmt.Printf("Funcionária: %s\n", nome)
	fmt.Printf("Idade: %d anos\n", idade)
	fmt.Printf("Salário: R$ %.2f\n", salario)
}
`,
      padroes: [
        [/nome\s*:=\s*"Ana Souza"/, 'Crie nome com := e o texto "Ana Souza".'],
        [/var\s+idade\s+int\s*=\s*32\b/, "Declare idade com var, tipo int e valor 32."],
        [/salario\s*:=\s*3500\.50?\b/, "Crie salario com := e o valor 3500.50."],
      ],
      saidaEsperada: "Funcionária: Ana Souza\nIdade: 32 anos\nSalário: R$ 3500.50",
    },
    {
      tipo: "completar",
      titulo: "Total do pedido da padaria",
      enunciado: `A padaria vende 3 pães de fermentação natural a R$ 19,90 cada. Complete a função <code>totalPedido</code>:
        ela recebe <code>qtd</code> (int) e <code>preco</code> (float64) e <b>devolve um float64</b> com o total.
        Como Go não mistura tipos, converta <code>qtd</code> com <code>float64(qtd)</code> antes de multiplicar.
        Substitua cada <code>____</code>.`,
      dica: `O tipo de retorno vem depois dos parênteses dos parâmetros: <code>func f(...) float64 {</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func totalPedido(qtd int, preco float64) ____ {
	return ____(qtd) * preco
}

func main() {
	total := totalPedido(3, 19.90)
	fmt.Printf("Total: R$ %.2f\n", total)
}
`,
      solucao: c`package main

import "fmt"

func totalPedido(qtd int, preco float64) float64 {
	return float64(qtd) * preco
}

func main() {
	total := totalPedido(3, 19.90)
	fmt.Printf("Total: R$ %.2f\n", total)
}
`,
      padroes: [
        [/func\s+totalPedido\s*\(\s*qtd\s+int\s*,\s*preco\s+float64\s*\)\s*float64\s*\{/, "A função totalPedido deve devolver float64."],
        [/return\s+float64\s*\(\s*qtd\s*\)\s*\*\s*preco/, "Converta qtd com float64(qtd) e multiplique por preco."],
      ],
      saidaEsperada: "Total: R$ 59.70",
    },
    {
      tipo: "completar",
      titulo: "Dividindo a conta do restaurante",
      enunciado: `A função <code>dividirConta</code> devolve <b>dois valores</b>: quanto cada pessoa paga e um <code>error</code>.
        Se o número de pessoas for zero ou negativo, ela devolve um erro. Complete:
        <ul>
          <li>o tipo de retorno <code>(float64, error)</code>;</li>
          <li>o <code>nil</code> no retorno de sucesso;</li>
          <li>a verificação <code>err != nil</code> no <code>main</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>nil</code> significa “nenhum erro”. O padrão Go é sempre conferir <code>if err != nil</code> logo depois da chamada.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func dividirConta(total float64, pessoas int) ____ {
	if pessoas <= 0 {
		return 0, fmt.Errorf("número de pessoas inválido")
	}
	return total / float64(pessoas), ____
}

func main() {
	for _, p := range []int{4, 0} {
		valor, err := dividirConta(120, p)
		if ____ {
			fmt.Println("Erro:", err)
			continue
		}
		fmt.Printf("Cada um paga: R$ %.2f\n", valor)
	}
}
`,
      solucao: c`package main

import "fmt"

func dividirConta(total float64, pessoas int) (float64, error) {
	if pessoas <= 0 {
		return 0, fmt.Errorf("número de pessoas inválido")
	}
	return total / float64(pessoas), nil
}

func main() {
	for _, p := range []int{4, 0} {
		valor, err := dividirConta(120, p)
		if err != nil {
			fmt.Println("Erro:", err)
			continue
		}
		fmt.Printf("Cada um paga: R$ %.2f\n", valor)
	}
}
`,
      padroes: [
        [/func\s+dividirConta\s*\([^)]*\)\s*\(\s*float64\s*,\s*error\s*\)/, "dividirConta deve devolver (float64, error)."],
        [/return\s+total\s*\/\s*float64\s*\(\s*pessoas\s*\)\s*,\s*nil/, "No sucesso, devolva o valor e nil."],
        [/if\s+err\s*!=\s*nil/, "Confira o erro com if err != nil."],
      ],
      saidaEsperada: "Cada um paga: R$ 30.00\nErro: número de pessoas inválido",
    },
    {
      tipo: "criar",
      titulo: "Preço com desconto",
      enunciado: `Escreva um programa completo (<code>package main</code> + <code>func main</code>) com a função
        <code>precoComDesconto(preco float64, percentual float64) float64</code>, que devolve o preço já com o desconto
        (ex.: 50 com 10% de desconto → 45).
        No <code>main</code>, use a função e imprima exatamente, com <code>fmt.Printf</code> e <code>%.2f</code>:
        <ul>
          <li>Bolo, preço 50, desconto 10;</li>
          <li>Torta, preço 80, desconto 25;</li>
          <li>Café, preço 12.5, desconto 0.</li>
        </ul>`,
      dica: `Desconto em reais = <code>preco * percentual / 100</code>. Formato da linha: <code>"%s: R$ %.2f\n"</code>.`,
      lang: "go",
      inicial: c`package main

// 1. Crie a função precoComDesconto(preco float64, percentual float64) float64
// 2. No main, imprima Bolo (50, 10%), Torta (80, 25%) e Café (12.5, 0%)
//    no formato "Bolo: R$ 45.00"

func main() {
}
`,
      solucao: c`package main

import "fmt"

func precoComDesconto(preco float64, percentual float64) float64 {
	desconto := preco * percentual / 100
	return preco - desconto
}

func main() {
	fmt.Printf("%s: R$ %.2f\n", "Bolo", precoComDesconto(50, 10))
	fmt.Printf("%s: R$ %.2f\n", "Torta", precoComDesconto(80, 25))
	fmt.Printf("%s: R$ %.2f\n", "Café", precoComDesconto(12.5, 0))
}
`,
      padroes: [
        [/func\s+precoComDesconto\s*\([^)]*float64[^)]*\)\s*float64\s*\{/, "Crie func precoComDesconto(preco float64, percentual float64) float64."],
        [/return\s+/, "A função precisa devolver o resultado com return."],
        [/precoComDesconto\s*\(\s*80\s*,\s*25\s*\)/, "Chame precoComDesconto(80, 25) para a Torta."],
        [/%\.2f/, "Use %.2f para mostrar o preço com 2 casas."],
      ],
      saidaEsperada: "Bolo: R$ 45.00\nTorta: R$ 60.00\nCafé: R$ 12.50",
    },
    {
      tipo: "criar",
      titulo: "Menor e maior temperatura",
      enunciado: `A câmara fria da clínica registra 3 temperaturas por dia. Escreva um programa com a função
        <code>minMax(a, b, c int) (int, int)</code>, que devolve <b>dois valores</b>: a menor e a maior temperatura.
        No <code>main</code>, chame <code>menor, maior := minMax(7, 2, 9)</code> e imprima:
        <pre>Menor: 2
Maior: 9</pre>`,
      dica: `Comece com <code>menor := a</code> e <code>maior := a</code> e use <code>if</code> para comparar com <code>b</code> e <code>c</code>. Devolva com <code>return menor, maior</code>.`,
      lang: "go",
      inicial: c`package main

// Crie func minMax(a, b, c int) (int, int)
// que devolve a menor e a maior das três temperaturas.
// No main: menor, maior := minMax(7, 2, 9) e imprima "Menor: 2" e "Maior: 9"

func main() {
}
`,
      solucao: c`package main

import "fmt"

func minMax(a, b, c int) (int, int) {
	menor, maior := a, a
	if b < menor {
		menor = b
	}
	if c < menor {
		menor = c
	}
	if b > maior {
		maior = b
	}
	if c > maior {
		maior = c
	}
	return menor, maior
}

func main() {
	menor, maior := minMax(7, 2, 9)
	fmt.Println("Menor:", menor)
	fmt.Println("Maior:", maior)
}
`,
      padroes: [
        [/func\s+minMax\s*\([^)]*\)\s*\(\s*int\s*,\s*int\s*\)/, "Crie func minMax(a, b, c int) (int, int)."],
        [/return\s+\w+\s*,\s*\w+/, "Devolva os dois valores: return menor, maior."],
        [/\w+\s*,\s*\w+\s*:=\s*minMax\s*\(\s*7\s*,\s*2\s*,\s*9\s*\)/, "No main, receba os dois valores: menor, maior := minMax(7, 2, 9)."],
      ],
      saidaEsperada: "Menor: 2\nMaior: 9",
    },
  ],

  /* ===================== b2: Slices e maps ===================== */
  b2: [
    {
      tipo: "completar",
      titulo: "Fila de pedidos do delivery",
      enunciado: `A cozinha recebe pedidos numa fila (slice). Complete o código para:
        <ul>
          <li>adicionar <code>"Salada"</code> ao slice com <code>append</code>;</li>
          <li>mostrar quantos pedidos há com <code>len</code>;</li>
          <li>mostrar os dois primeiros com a fatia <code>pedidos[0:2]</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>append</code> devolve o slice novo, por isso reatribuímos: <code>pedidos = append(pedidos, ...)</code>. A fatia <code>[0:2]</code> pega os índices 0 e 1.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	pedidos := []string{"Pizza", "Lasanha"}
	pedidos = ____(pedidos, "Salada")

	fmt.Println("Pedidos:", ____(pedidos))
	fmt.Println("Primeiros:", pedidos[____])
	fmt.Println("Último:", pedidos[len(pedidos)-1])
}
`,
      solucao: c`package main

import "fmt"

func main() {
	pedidos := []string{"Pizza", "Lasanha"}
	pedidos = append(pedidos, "Salada")

	fmt.Println("Pedidos:", len(pedidos))
	fmt.Println("Primeiros:", pedidos[0:2])
	fmt.Println("Último:", pedidos[len(pedidos)-1])
}
`,
      padroes: [
        [/pedidos\s*=\s*append\s*\(\s*pedidos\s*,\s*"Salada"\s*\)/, 'Use pedidos = append(pedidos, "Salada").'],
        [/"Pedidos:"\s*,\s*len\s*\(\s*pedidos\s*\)/, "Mostre o tamanho com len(pedidos)."],
        [/pedidos\s*\[\s*0?\s*:\s*2\s*\]/, "Use a fatia pedidos[0:2]."],
      ],
      saidaEsperada: "Pedidos: 3\nPrimeiros: [Pizza Lasanha]\nÚltimo: Salada",
    },
    {
      tipo: "completar",
      titulo: "Média da turma",
      enunciado: `A escola guarda as notas de um aluno em um slice. Complete o <code>for ... range</code> para somar as notas,
        ignorando o índice com <code>_</code>, e calcule a média dividindo pela quantidade de notas.
        Substitua cada <code>____</code>.`,
      dica: `O <code>range</code> entrega índice e valor: <code>for _, n := range notas</code>. Para dividir um float64 pelo <code>len</code>, converta: <code>float64(len(notas))</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	notas := []float64{8, 6.5, 9, 6.5}

	soma := 0.0
	for ____, n := ____ notas {
		soma += n
	}
	media := soma / ____(len(notas))

	fmt.Printf("Média: %.2f\n", media)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	notas := []float64{8, 6.5, 9, 6.5}

	soma := 0.0
	for _, n := range notas {
		soma += n
	}
	media := soma / float64(len(notas))

	fmt.Printf("Média: %.2f\n", media)
}
`,
      padroes: [
        [/for\s+_\s*,\s*n\s*:=\s*range\s+notas/, "Percorra com for _, n := range notas."],
        [/soma\s*\/\s*float64\s*\(\s*len\s*\(\s*notas\s*\)\s*\)/, "Divida por float64(len(notas))."],
      ],
      saidaEsperada: "Média: 7.50",
    },
    {
      tipo: "completar",
      titulo: "Consulta de estoque com vírgula ok",
      enunciado: `A papelaria quer consultar o estoque de alguns produtos. Se o produto não estiver no map, deve aparecer
        <code>não cadastrado</code> (e não <code>0</code>!). Complete usando o padrão <b>“vírgula ok”</b>:
        <code>qtd, ok := estoque[nome]</code>. Substitua cada <code>____</code>.`,
      dica: `Quando a chave não existe, <code>ok</code> vale <code>false</code> e <code>qtd</code> vale 0. Use <code>if !ok</code> para tratar esse caso.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	estoque := map[string]int{"caneta": 50, "lapis": 20}
	estoque["borracha"] = 10

	for _, nome := range []string{"caneta", "borracha", "caderno"} {
		qtd, ok := ____[nome]
		if ____ {
			fmt.Println(nome + ": não cadastrado")
			continue
		}
		fmt.Printf("%s: %d\n", nome, qtd)
	}
}
`,
      solucao: c`package main

import "fmt"

func main() {
	estoque := map[string]int{"caneta": 50, "lapis": 20}
	estoque["borracha"] = 10

	for _, nome := range []string{"caneta", "borracha", "caderno"} {
		qtd, ok := estoque[nome]
		if !ok {
			fmt.Println(nome + ": não cadastrado")
			continue
		}
		fmt.Printf("%s: %d\n", nome, qtd)
	}
}
`,
      padroes: [
        [/qtd\s*,\s*ok\s*:=\s*estoque\s*\[\s*nome\s*\]/, "Leia o map com qtd, ok := estoque[nome]."],
        [/if\s+!\s*ok\b|if\s+ok\s*==\s*false/, "Trate a chave inexistente com if !ok."],
      ],
      saidaEsperada: "caneta: 50\nborracha: 10\ncaderno: não cadastrado",
    },
    {
      tipo: "criar",
      titulo: "Sabores mais pedidos",
      enunciado: `A pizzaria tem a lista de sabores pedidos hoje no slice <code>pedidos</code>. Crie um
        <code>map[string]int</code> chamado <code>contagem</code> e, percorrendo <code>pedidos</code> com <code>range</code>,
        conte quantas vezes cada sabor apareceu. Depois, imprima a contagem <b>na ordem do slice</b> <code>sabores</code>
        (a ordem de um map não é garantida!), no formato <code>sabor: quantidade</code>.`,
      dica: `<code>contagem[s]++</code> funciona mesmo na primeira vez, porque a chave que não existe vale 0. Para imprimir, percorra <code>sabores</code> e leia <code>contagem[s]</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	pedidos := []string{"calabresa", "mussarela", "calabresa", "frango", "calabresa", "mussarela"}
	sabores := []string{"calabresa", "frango", "mussarela"}

	// 1. Crie contagem (um map de string para int)
	// 2. Percorra pedidos e some 1 para cada sabor
	// 3. Percorra sabores e imprima "sabor: quantidade"
	fmt.Println(pedidos, sabores)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	pedidos := []string{"calabresa", "mussarela", "calabresa", "frango", "calabresa", "mussarela"}
	sabores := []string{"calabresa", "frango", "mussarela"}

	contagem := map[string]int{}
	for _, s := range pedidos {
		contagem[s]++
	}

	for _, s := range sabores {
		fmt.Printf("%s: %d\n", s, contagem[s])
	}
}
`,
      padroes: [
        [/contagem\s*:=\s*(map\s*\[\s*string\s*\]\s*int\s*\{\s*\}|make\s*\(\s*map\s*\[\s*string\s*\]\s*int\s*\))/, "Crie contagem := map[string]int{} (ou com make)."],
        [/range\s+pedidos/, "Percorra o slice pedidos com range."],
        [/contagem\s*\[\s*\w+\s*\]\s*(\+\+|\+=\s*1)/, "Some 1 com contagem[s]++."],
        [/range\s+sabores/, "Imprima percorrendo o slice sabores, para a ordem ser sempre a mesma."],
      ],
      saidaEsperada: "calabresa: 3\nfrango: 1\nmussarela: 2",
    },
    {
      tipo: "criar",
      titulo: "Filtrando as vendas altas",
      enunciado: `O financeiro quer separar as vendas de <b>R$ 100 ou mais</b>. A partir do slice <code>vendas</code>,
        monte um novo slice <code>altas</code> (usando <code>append</code>) só com essas vendas e imprima:
        <pre>Vendas altas: [120 300 100]
Quantidade: 3
Soma: 520.00</pre>`,
      dica: `Comece com um slice vazio <code>altas := []float64{}</code>. Dentro do <code>for _, v := range vendas</code>, use <code>if v &gt;= 100</code>. <code>fmt.Println</code> mostra o slice entre colchetes.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	vendas := []float64{50, 120, 99.9, 300, 100}

	// Monte o slice altas com as vendas de 100 ou mais
	// e imprima o slice, a quantidade e a soma (com %.2f)
	fmt.Println(vendas)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	vendas := []float64{50, 120, 99.9, 300, 100}

	altas := []float64{}
	soma := 0.0
	for _, v := range vendas {
		if v >= 100 {
			altas = append(altas, v)
			soma += v
		}
	}

	fmt.Println("Vendas altas:", altas)
	fmt.Println("Quantidade:", len(altas))
	fmt.Printf("Soma: %.2f\n", soma)
}
`,
      padroes: [
        [/range\s+vendas/, "Percorra vendas com range."],
        [/>=\s*100/, "Filtre as vendas com >= 100 (R$ 100 também conta)."],
        [/altas\s*=\s*append\s*\(\s*altas\s*,/, "Adicione ao slice com altas = append(altas, v)."],
        [/len\s*\(\s*altas\s*\)/, "Mostre a quantidade com len(altas)."],
      ],
      saidaEsperada: "Vendas altas: [120 300 100]\nQuantidade: 3\nSoma: 520.00",
    },
  ],

  /* ===================== b3: Structs e métodos ===================== */
  b3: [
    {
      tipo: "completar",
      titulo: "Produto da papelaria",
      enunciado: `Complete a definição da struct <code>Produto</code> e crie o produto Caderno com preço <code>15.90</code>
        e quantidade 3, preenchendo os campos pelo nome. Depois calcule o subtotal usando o campo <code>Qtd</code>.
        Substitua cada <code>____</code>.`,
      dica: `Uma struct se define com <code>type Nome struct { ... }</code>. Campos são acessados com ponto: <code>p.Qtd</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

type Produto ____ {
	Nome  string
	Preco float64
	Qtd   int
}

func main() {
	p := Produto{Nome: "Caderno", Preco: ____, Qtd: 3}
	subtotal := float64(p.____) * p.Preco

	fmt.Printf("%s: %d x R$ %.2f\n", p.Nome, p.Qtd, p.Preco)
	fmt.Printf("Subtotal: R$ %.2f\n", subtotal)
}
`,
      solucao: c`package main

import "fmt"

type Produto struct {
	Nome  string
	Preco float64
	Qtd   int
}

func main() {
	p := Produto{Nome: "Caderno", Preco: 15.90, Qtd: 3}
	subtotal := float64(p.Qtd) * p.Preco

	fmt.Printf("%s: %d x R$ %.2f\n", p.Nome, p.Qtd, p.Preco)
	fmt.Printf("Subtotal: R$ %.2f\n", subtotal)
}
`,
      padroes: [
        [/type\s+Produto\s+struct\s*\{/, "Defina type Produto struct { ... }."],
        [/Preco\s*:\s*15\.90?\b/, "Preencha Preco: 15.90."],
        [/float64\s*\(\s*p\.Qtd\s*\)\s*\*\s*p\.Preco/, "Calcule o subtotal com float64(p.Qtd) * p.Preco."],
      ],
      saidaEsperada: "Caderno: 3 x R$ 15.90\nSubtotal: R$ 47.70",
    },
    {
      tipo: "completar",
      titulo: "Ficha do paciente",
      enunciado: `Na clínica, cada <code>Paciente</code> precisa de um método <code>Ficha()</code> que <b>devolve</b> um texto
        (não imprime). Como o método só lê os dados, use receptor <b>por valor</b> chamado <code>p</code>.
        Monte o texto com <code>fmt.Sprintf</code>. Substitua cada <code>____</code>.`,
      dica: `O receptor fica antes do nome: <code>func (p Paciente) Ficha() string</code>. <code>Sprintf</code> funciona como <code>Printf</code>, mas devolve o texto.`,
      lang: "go",
      inicial: c`package main

import "fmt"

type Paciente struct {
	Nome  string
	Idade int
}

func (____ Paciente) Ficha() ____ {
	return fmt.____("Paciente: %s (%d anos)", p.Nome, p.Idade)
}

func main() {
	pac := Paciente{Nome: "Marina", Idade: 45}
	fmt.Println(pac.Ficha())
}
`,
      solucao: c`package main

import "fmt"

type Paciente struct {
	Nome  string
	Idade int
}

func (p Paciente) Ficha() string {
	return fmt.Sprintf("Paciente: %s (%d anos)", p.Nome, p.Idade)
}

func main() {
	pac := Paciente{Nome: "Marina", Idade: 45}
	fmt.Println(pac.Ficha())
}
`,
      padroes: [
        [/func\s*\(\s*p\s+Paciente\s*\)\s*Ficha\s*\(\s*\)\s*string/, "Declare func (p Paciente) Ficha() string."],
        [/return\s+fmt\.Sprintf\s*\(/, "Devolva o texto montado com fmt.Sprintf."],
      ],
      saidaEsperada: "Paciente: Marina (45 anos)",
    },
    {
      tipo: "completar",
      titulo: "Carrinho que guarda os itens",
      enunciado: `O método <code>Adicionar</code> do carrinho precisa <b>alterar o carrinho original</b> (somar ao total e
        contar mais um item). Para isso, o receptor deve ser um <b>ponteiro</b> (<code>*Carrinho</code>).
        Substitua cada <code>____</code>.`,
      dica: `Com receptor por valor, o método recebe uma cópia e o total do <code>main</code> continuaria 0. Some com <code>+=</code> e conte com <code>++</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

type Carrinho struct {
	Itens int
	Total float64
}

func (c ____) Adicionar(v float64) {
	c.Total ____ v
	c.Itens____
}

func main() {
	var car Carrinho
	car.Adicionar(20)
	car.Adicionar(30.5)
	car.Adicionar(13.9)

	fmt.Println("Itens:", car.Itens)
	fmt.Printf("Total: R$ %.2f\n", car.Total)
}
`,
      solucao: c`package main

import "fmt"

type Carrinho struct {
	Itens int
	Total float64
}

func (c *Carrinho) Adicionar(v float64) {
	c.Total += v
	c.Itens++
}

func main() {
	var car Carrinho
	car.Adicionar(20)
	car.Adicionar(30.5)
	car.Adicionar(13.9)

	fmt.Println("Itens:", car.Itens)
	fmt.Printf("Total: R$ %.2f\n", car.Total)
}
`,
      padroes: [
        [/func\s*\(\s*c\s+\*Carrinho\s*\)\s*Adicionar/, "O receptor deve ser ponteiro: func (c *Carrinho) Adicionar(...)."],
        [/c\.Total\s*\+=\s*v/, "Some o valor com c.Total += v."],
        [/c\.Itens\s*(\+\+|\+=\s*1)/, "Conte o item com c.Itens++."],
      ],
      saidaEsperada: "Itens: 3\nTotal: R$ 64.40",
    },
    {
      tipo: "criar",
      titulo: "Reajuste de salário",
      enunciado: `Crie para o RH:
        <ul>
          <li>a struct <code>Funcionario</code> com os campos <code>Nome</code> (string) e <code>Salario</code> (float64);</li>
          <li>o método <code>Reajustar(percentual float64)</code> com <b>receptor ponteiro</b>, que aumenta o salário;</li>
          <li>o método <code>Resumo() string</code> com receptor por valor, que devolve <code>"Carlos: R$ 3300.00"</code>.</li>
        </ul>
        No <code>main</code>, crie Carlos com salário 3000, reajuste 10% e imprima o resumo.`,
      dica: `Aumento: <code>f.Salario += f.Salario * percentual / 100</code>. Use <code>fmt.Sprintf("%s: R$ %.2f", ...)</code> no Resumo.`,
      lang: "go",
      inicial: c`package main

// 1. type Funcionario struct com Nome e Salario
// 2. func (f *Funcionario) Reajustar(percentual float64)
// 3. func (f Funcionario) Resumo() string
// 4. No main: Carlos, 3000, reajuste de 10%, imprima o resumo

func main() {
}
`,
      solucao: c`package main

import "fmt"

type Funcionario struct {
	Nome    string
	Salario float64
}

func (f *Funcionario) Reajustar(percentual float64) {
	f.Salario += f.Salario * percentual / 100
}

func (f Funcionario) Resumo() string {
	return fmt.Sprintf("%s: R$ %.2f", f.Nome, f.Salario)
}

func main() {
	f := Funcionario{Nome: "Carlos", Salario: 3000}
	f.Reajustar(10)
	fmt.Println(f.Resumo())
}
`,
      padroes: [
        [/type\s+Funcionario\s+struct\s*\{/, "Crie type Funcionario struct { ... }."],
        [/func\s*\(\s*\w+\s+\*Funcionario\s*\)\s*Reajustar\s*\(\s*\w+\s+float64\s*\)/, "Reajustar precisa de receptor ponteiro: func (f *Funcionario) Reajustar(percentual float64)."],
        [/func\s*\(\s*\w+\s+\*?Funcionario\s*\)\s*Resumo\s*\(\s*\)\s*string/, "Crie o método Resumo() string."],
        [/\.Reajustar\s*\(\s*10\s*\)/, "No main, chame Reajustar(10)."],
      ],
      saidaEsperada: "Carlos: R$ 3300.00",
    },
    {
      tipo: "criar",
      titulo: "Agenda de consultas",
      enunciado: `Monte a agenda do dia de uma clínica:
        <ul>
          <li>crie a struct <code>Consulta</code> com <code>Hora</code> (string), <code>Paciente</code> (string) e <code>Valor</code> (float64);</li>
          <li>crie o método <code>Linha() string</code> que devolve, por exemplo, <code>"09:00 - Ana - R$ 150.00"</code>;</li>
          <li>no <code>main</code>, crie um slice <code>[]Consulta</code> com as 3 consultas abaixo, imprima a linha de cada uma e, no fim, o faturamento total.</li>
        </ul>
        Consultas: 09:00 Ana 150; 10:30 Bruno 200; 14:00 Carla 180.`,
      dica: `Um slice de structs: <code>agenda := []Consulta{{"09:00", "Ana", 150}, ...}</code>. Some <code>c.Valor</code> dentro do <code>for _, c := range agenda</code>.`,
      lang: "go",
      inicial: c`package main

// 1. type Consulta struct com Hora, Paciente e Valor
// 2. func (c Consulta) Linha() string  -> "09:00 - Ana - R$ 150.00"
// 3. No main: slice com as 3 consultas, imprima cada Linha()
//    e depois "Faturamento: R$ 530.00"

func main() {
}
`,
      solucao: c`package main

import "fmt"

type Consulta struct {
	Hora     string
	Paciente string
	Valor    float64
}

func (c Consulta) Linha() string {
	return fmt.Sprintf("%s - %s - R$ %.2f", c.Hora, c.Paciente, c.Valor)
}

func main() {
	agenda := []Consulta{
		{Hora: "09:00", Paciente: "Ana", Valor: 150},
		{Hora: "10:30", Paciente: "Bruno", Valor: 200},
		{Hora: "14:00", Paciente: "Carla", Valor: 180},
	}

	total := 0.0
	for _, c := range agenda {
		fmt.Println(c.Linha())
		total += c.Valor
	}
	fmt.Printf("Faturamento: R$ %.2f\n", total)
}
`,
      padroes: [
        [/type\s+Consulta\s+struct\s*\{/, "Crie type Consulta struct { ... }."],
        [/func\s*\(\s*\w+\s+\*?Consulta\s*\)\s*Linha\s*\(\s*\)\s*string/, "Crie o método Linha() string em Consulta."],
        [/\[\]Consulta\s*\{/, "Crie o slice de consultas com []Consulta{...}."],
        [/for\s+_\s*,\s*\w+\s*:=\s*range\s+\w+/, "Percorra a agenda com for _, c := range ..."],
      ],
      saidaEsperada: "09:00 - Ana - R$ 150.00\n10:30 - Bruno - R$ 200.00\n14:00 - Carla - R$ 180.00\nFaturamento: R$ 530.00",
    },
  ],

  /* ===================== i1: Tratamento de erros ===================== */
  i1: [
    {
      tipo: "completar",
      titulo: "Erro sentinela no estoque",
      enunciado: `O sistema da loja precisa reconhecer quando falta produto para mostrar um aviso, em vez de travar.
        Complete o código:
        <ul>
          <li>crie o erro sentinela <code>ErrSemEstoque</code> com <code>errors.New("sem estoque")</code>;</li>
          <li>no <code>main</code>, reconheça esse erro com <code>errors.Is(err, ErrSemEstoque)</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Erros sentinela são variáveis do pacote criadas com <code>errors.New</code>. <code>errors.Is</code> compara o erro recebido com o sentinela.`,
      lang: "go",
      inicial: c`package main

import (
	"errors"
	"fmt"
)

var ErrSemEstoque = errors.____("sem estoque")

func reservar(estoque, qtd int) (int, error) {
	if qtd > estoque {
		return estoque, ErrSemEstoque
	}
	return estoque - qtd, nil
}

func main() {
	for _, q := range []int{3, 20} {
		resto, err := reservar(10, q)
		if errors.____(err, ____) {
			fmt.Println("Aviso:", err)
			continue
		}
		fmt.Println("Reservado! Restam", resto)
	}
}
`,
      solucao: c`package main

import (
	"errors"
	"fmt"
)

var ErrSemEstoque = errors.New("sem estoque")

func reservar(estoque, qtd int) (int, error) {
	if qtd > estoque {
		return estoque, ErrSemEstoque
	}
	return estoque - qtd, nil
}

func main() {
	for _, q := range []int{3, 20} {
		resto, err := reservar(10, q)
		if errors.Is(err, ErrSemEstoque) {
			fmt.Println("Aviso:", err)
			continue
		}
		fmt.Println("Reservado! Restam", resto)
	}
}
`,
      padroes: [
        [/ErrSemEstoque\s*=\s*errors\.New\s*\(\s*"sem estoque"\s*\)/, 'Crie ErrSemEstoque com errors.New("sem estoque").'],
        [/errors\.Is\s*\(\s*err\s*,\s*ErrSemEstoque\s*\)/, "Reconheça o erro com errors.Is(err, ErrSemEstoque)."],
      ],
      saidaEsperada: "Reservado! Restam 7\nAviso: sem estoque",
    },
    {
      tipo: "completar",
      titulo: "Embrulhando o erro com %w",
      enunciado: `Quando o banco de dados não encontra um cliente, a função <code>carregarCliente</code> deve
        <b>acrescentar contexto</b> ao erro sem perder a causa original. Complete:
        <ul>
          <li>use o verbo <code>%w</code> no <code>fmt.Errorf</code> para embrulhar o erro;</li>
          <li>no <code>main</code>, confirme com <code>errors.Is</code> que a causa ainda é <code>ErrNaoEncontrado</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>%v</code> só copiaria o texto; <code>%w</code> guarda o erro original dentro do novo, e é isso que permite o <code>errors.Is</code> funcionar.`,
      lang: "go",
      inicial: c`package main

import (
	"errors"
	"fmt"
)

var ErrNaoEncontrado = errors.New("registro não encontrado")

func buscarNoBanco(id int) error {
	return ErrNaoEncontrado
}

func carregarCliente(id int) error {
	if err := buscarNoBanco(id); err != nil {
		return fmt.Errorf("carregando cliente %d: %____", id, err)
	}
	return nil
}

func main() {
	err := carregarCliente(42)
	fmt.Println(err)
	fmt.Println("É não encontrado?", errors.Is(err, ____))
}
`,
      solucao: c`package main

import (
	"errors"
	"fmt"
)

var ErrNaoEncontrado = errors.New("registro não encontrado")

func buscarNoBanco(id int) error {
	return ErrNaoEncontrado
}

func carregarCliente(id int) error {
	if err := buscarNoBanco(id); err != nil {
		return fmt.Errorf("carregando cliente %d: %w", id, err)
	}
	return nil
}

func main() {
	err := carregarCliente(42)
	fmt.Println(err)
	fmt.Println("É não encontrado?", errors.Is(err, ErrNaoEncontrado))
}
`,
      padroes: [
        [/fmt\.Errorf\s*\(\s*"[^"]*%w[^"]*"\s*,\s*id\s*,\s*err\s*\)/, "Embrulhe o erro com %w no fmt.Errorf."],
        [/errors\.Is\s*\(\s*err\s*,\s*ErrNaoEncontrado\s*\)/, "Confira a causa com errors.Is(err, ErrNaoEncontrado)."],
      ],
      saidaEsperada: "carregando cliente 42: registro não encontrado\nÉ não encontrado? true",
    },
    {
      tipo: "completar",
      titulo: "Idades vindas do formulário",
      enunciado: `As idades chegam do formulário como texto, e uma delas foi digitada errado. Complete o código para converter
        cada texto com <code>strconv.Atoi</code>, <b>pular</b> o valor inválido (avisando) e somar só os válidos.
        Substitua cada <code>____</code>.`,
      dica: `<code>strconv.Atoi</code> devolve o número e um erro. Se <code>err != nil</code>, avise e use <code>continue</code> para ir ao próximo.`,
      lang: "go",
      inicial: c`package main

import (
	"fmt"
	"strconv"
)

func main() {
	entradas := []string{"25", "abc", "40"}
	soma := 0

	for _, s := range entradas {
		n, err := strconv.____(s)
		if err ____ nil {
			fmt.Println("Inválido:", s)
			____
		}
		soma += n
	}
	fmt.Println("Soma das idades:", soma)
}
`,
      solucao: c`package main

import (
	"fmt"
	"strconv"
)

func main() {
	entradas := []string{"25", "abc", "40"}
	soma := 0

	for _, s := range entradas {
		n, err := strconv.Atoi(s)
		if err != nil {
			fmt.Println("Inválido:", s)
			continue
		}
		soma += n
	}
	fmt.Println("Soma das idades:", soma)
}
`,
      padroes: [
        [/n\s*,\s*err\s*:=\s*strconv\.Atoi\s*\(\s*s\s*\)/, "Converta com n, err := strconv.Atoi(s)."],
        [/if\s+err\s*!=\s*nil/, "Confira o erro com if err != nil."],
        [/\bcontinue\b/, "Use continue para pular o valor inválido."],
      ],
      saidaEsperada: "Inválido: abc\nSoma das idades: 65",
    },
    {
      tipo: "criar",
      titulo: "Validação de senha",
      enunciado: `No cadastro de usuários, crie:
        <ul>
          <li>dois erros sentinela: <code>ErrSenhaCurta</code> (<code>"senha muito curta"</code>) e <code>ErrSemNumero</code> (<code>"senha sem número"</code>);</li>
          <li>a função <code>validarSenha(s string) error</code>: devolve <code>ErrSenhaCurta</code> se tiver menos de 8 caracteres, <code>ErrSemNumero</code> se não tiver nenhum dígito, e <code>nil</code> se estiver ok.</li>
        </ul>
        No <code>main</code>, teste <code>"abc"</code>, <code>"abcdefgh"</code> e <code>"abc12345"</code>, usando <code>errors.Is</code>
        para decidir a mensagem, e imprima exatamente a saída esperada.`,
      dica: `<code>len(s) &lt; 8</code> verifica o tamanho e <code>strings.ContainsAny(s, "0123456789")</code> verifica se há algum dígito. Imprima com <code>fmt.Println(s+":", err)</code> ou <code>s + ": ok"</code>.`,
      lang: "go",
      inicial: c`package main

// 1. var ErrSenhaCurta = errors.New("senha muito curta")
//    var ErrSemNumero  = errors.New("senha sem número")
// 2. func validarSenha(s string) error
// 3. No main, teste "abc", "abcdefgh" e "abc12345" e use errors.Is
//    Saída: "abc: senha muito curta", "abcdefgh: senha sem número", "abc12345: ok"

func main() {
}
`,
      solucao: c`package main

import (
	"errors"
	"fmt"
	"strings"
)

var ErrSenhaCurta = errors.New("senha muito curta")
var ErrSemNumero = errors.New("senha sem número")

func validarSenha(s string) error {
	if len(s) < 8 {
		return ErrSenhaCurta
	}
	if !strings.ContainsAny(s, "0123456789") {
		return ErrSemNumero
	}
	return nil
}

func main() {
	for _, s := range []string{"abc", "abcdefgh", "abc12345"} {
		err := validarSenha(s)
		if errors.Is(err, ErrSenhaCurta) || errors.Is(err, ErrSemNumero) {
			fmt.Println(s+":", err)
		} else {
			fmt.Println(s + ": ok")
		}
	}
}
`,
      padroes: [
        [/ErrSenhaCurta\s*=\s*errors\.New\s*\(\s*"senha muito curta"\s*\)/, 'Crie ErrSenhaCurta com errors.New("senha muito curta").'],
        [/ErrSemNumero\s*=\s*errors\.New\s*\(\s*"senha sem número"\s*\)/, 'Crie ErrSemNumero com errors.New("senha sem número").'],
        [/func\s+validarSenha\s*\(\s*\w+\s+string\s*\)\s*error/, "Crie func validarSenha(s string) error."],
        [/errors\.Is\s*\(/, "Use errors.Is no main para reconhecer os erros."],
      ],
      saidaEsperada: "abc: senha muito curta\nabcdefgh: senha sem número\nabc12345: ok",
    },
    {
      tipo: "criar",
      titulo: "Erro personalizado no pedido",
      enunciado: `A loja quer saber <b>qual campo</b> do pedido está errado. Crie:
        <ul>
          <li>o tipo <code>ErroValidacao</code> (struct com <code>Campo</code> e <code>Motivo</code>, ambos string) e o método
            <code>func (e *ErroValidacao) Error() string</code>, que devolve <code>"campo X: motivo"</code>;</li>
          <li>a função <code>validarPedido(qtd int, cep string) error</code>: se <code>qtd &lt;= 0</code>, devolve
            <code>&amp;ErroValidacao{"quantidade", "deve ser maior que zero"}</code>; se o cep não tiver 8 caracteres, devolve
            <code>&amp;ErroValidacao{"cep", "deve ter 8 dígitos"}</code>; senão, <code>nil</code>.</li>
        </ul>
        No <code>main</code>, valide os pedidos (2, "01001000"), (0, "01001000") e (1, "123") e use <code>errors.As</code>
        para ler o campo e o motivo. Saída exata:
        <pre>Pedido 1: ok
Pedido 2: campo quantidade inválido (deve ser maior que zero)
Pedido 3: campo cep inválido (deve ter 8 dígitos)</pre>`,
      dica: `Qualquer tipo com o método <code>Error() string</code> é um erro. Use <code>var ev *ErroValidacao</code> e <code>if errors.As(err, &amp;ev)</code>; depois leia <code>ev.Campo</code> e <code>ev.Motivo</code>.`,
      lang: "go",
      inicial: c`package main

// 1. type ErroValidacao struct { Campo, Motivo string }
//    func (e *ErroValidacao) Error() string
// 2. func validarPedido(qtd int, cep string) error
// 3. No main, valide (2, "01001000"), (0, "01001000") e (1, "123")
//    e use errors.As para imprimir o campo e o motivo

func main() {
}
`,
      solucao: c`package main

import (
	"errors"
	"fmt"
)

type ErroValidacao struct {
	Campo  string
	Motivo string
}

func (e *ErroValidacao) Error() string {
	return "campo " + e.Campo + ": " + e.Motivo
}

func validarPedido(qtd int, cep string) error {
	if qtd <= 0 {
		return &ErroValidacao{Campo: "quantidade", Motivo: "deve ser maior que zero"}
	}
	if len(cep) != 8 {
		return &ErroValidacao{Campo: "cep", Motivo: "deve ter 8 dígitos"}
	}
	return nil
}

type pedido struct {
	qtd int
	cep string
}

func main() {
	pedidos := []pedido{{2, "01001000"}, {0, "01001000"}, {1, "123"}}
	for i, p := range pedidos {
		err := validarPedido(p.qtd, p.cep)
		var ev *ErroValidacao
		if errors.As(err, &ev) {
			fmt.Printf("Pedido %d: campo %s inválido (%s)\n", i+1, ev.Campo, ev.Motivo)
			continue
		}
		fmt.Printf("Pedido %d: ok\n", i+1)
	}
}
`,
      padroes: [
        [/type\s+ErroValidacao\s+struct\s*\{/, "Crie type ErroValidacao struct { ... }."],
        [/func\s*\(\s*\w+\s+\*?ErroValidacao\s*\)\s*Error\s*\(\s*\)\s*string/, "Implemente o método Error() string em ErroValidacao."],
        [/func\s+validarPedido\s*\(\s*\w+\s+int\s*,\s*\w+\s+string\s*\)\s*error/, "Crie func validarPedido(qtd int, cep string) error."],
        [/errors\.As\s*\(\s*err\s*,\s*&\s*\w+\s*\)/, "Use errors.As(err, &ev) para ler o erro personalizado."],
      ],
      saidaEsperada: "Pedido 1: ok\nPedido 2: campo quantidade inválido (deve ser maior que zero)\nPedido 3: campo cep inválido (deve ter 8 dígitos)",
    },
  ],

  /* ===================== i2: Interfaces ===================== */
  i2: [
    {
      tipo: "completar",
      titulo: "Interface de frete",
      enunciado: `A loja trabalha com várias formas de entrega. Toda forma de entrega deve ter <code>Nome() string</code> e
        <code>Calcular(peso float64) float64</code>. Complete a interface <code>Frete</code> e o método <code>Calcular</code>
        do <code>Motoboy</code> (valor fixo de R$ 15). Substitua cada <code>____</code>.`,
      dica: `Uma interface é declarada com <code>type Nome interface { ... }</code>. O tipo implementa a interface só por ter os mesmos métodos, com as mesmas assinaturas.`,
      lang: "go",
      inicial: c`package main

import "fmt"

type Frete ____ {
	Nome() string
	Calcular(peso float64) ____
}

type Correios struct{}
type Motoboy struct{}

func (Correios) Nome() string { return "Correios" }
func (Correios) Calcular(peso float64) float64 {
	return 10 + peso*5
}

func (Motoboy) Nome() string { return "Motoboy" }
func (Motoboy) ____(peso float64) float64 {
	return 15
}

func main() {
	opcoes := []Frete{Correios{}, Motoboy{}}
	for _, f := range opcoes {
		fmt.Printf("%s: R$ %.2f\n", f.Nome(), f.Calcular(3))
	}
}
`,
      solucao: c`package main

import "fmt"

type Frete interface {
	Nome() string
	Calcular(peso float64) float64
}

type Correios struct{}
type Motoboy struct{}

func (Correios) Nome() string { return "Correios" }
func (Correios) Calcular(peso float64) float64 {
	return 10 + peso*5
}

func (Motoboy) Nome() string { return "Motoboy" }
func (Motoboy) Calcular(peso float64) float64 {
	return 15
}

func main() {
	opcoes := []Frete{Correios{}, Motoboy{}}
	for _, f := range opcoes {
		fmt.Printf("%s: R$ %.2f\n", f.Nome(), f.Calcular(3))
	}
}
`,
      padroes: [
        [/type\s+Frete\s+interface\s*\{/, "Declare type Frete interface { ... }."],
        [/^\s*Calcular\s*\(\s*peso\s+float64\s*\)\s*float64\s*$/m, "Na interface, Calcular(peso float64) deve devolver float64."],
        [/func\s*\(\s*\w*\s*Motoboy\s*\)\s*Calcular\s*\(\s*\w+\s+float64\s*\)\s*float64/, "Implemente Calcular(peso float64) float64 no Motoboy."],
      ],
      saidaEsperada: "Correios: R$ 25.00\nMotoboy: R$ 15.00",
    },
    {
      tipo: "completar",
      titulo: "Formas de pagamento",
      enunciado: `O caixa aceita Pix e cartão. Os dois tipos implementam a interface <code>Pagamento</code>.
        Complete o método <code>Pagar</code> do <code>Cartao</code> (mesma assinatura da interface) e o laço que percorre
        o slice <code>pagamentos</code>. Substitua cada <code>____</code>.`,
      dica: `A assinatura precisa ser idêntica: <code>Pagar(valor float64) string</code>. Para percorrer use <code>range</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

type Pagamento interface {
	Pagar(valor float64) string
}

type Pix struct{ Chave string }
type Cartao struct{ Final string }

func (p Pix) Pagar(valor float64) string {
	return fmt.Sprintf("Pix (chave %s): R$ %.2f", p.Chave, valor)
}

func (c Cartao) ____(valor ____) ____ {
	return fmt.Sprintf("Cartão final %s: R$ %.2f", c.Final, valor)
}

func main() {
	pagamentos := []Pagamento{Pix{"loja@ex.com"}, Cartao{"4321"}}
	for _, p := range ____ {
		fmt.Println(p.Pagar(100))
	}
}
`,
      solucao: c`package main

import "fmt"

type Pagamento interface {
	Pagar(valor float64) string
}

type Pix struct{ Chave string }
type Cartao struct{ Final string }

func (p Pix) Pagar(valor float64) string {
	return fmt.Sprintf("Pix (chave %s): R$ %.2f", p.Chave, valor)
}

func (c Cartao) Pagar(valor float64) string {
	return fmt.Sprintf("Cartão final %s: R$ %.2f", c.Final, valor)
}

func main() {
	pagamentos := []Pagamento{Pix{"loja@ex.com"}, Cartao{"4321"}}
	for _, p := range pagamentos {
		fmt.Println(p.Pagar(100))
	}
}
`,
      padroes: [
        [/func\s*\(\s*\w+\s+Cartao\s*\)\s*Pagar\s*\(\s*\w+\s+float64\s*\)\s*string/, "Implemente func (c Cartao) Pagar(valor float64) string."],
        [/range\s+pagamentos/, "Percorra o slice pagamentos com range."],
      ],
      saidaEsperada: "Pix (chave loja@ex.com): R$ 100.00\nCartão final 4321: R$ 100.00",
    },
    {
      tipo: "completar",
      titulo: "Pedido que sabe se imprimir",
      enunciado: `O <code>fmt</code> usa a interface <code>fmt.Stringer</code> (que tem só o método <code>String() string</code>)
        para decidir como mostrar um valor. Complete o método para que <code>fmt.Println(p)</code> imprima o pedido no formato
        <code>Pedido #7 - Ana - R$ 89.90</code>. Substitua cada <code>____</code>.`,
      dica: `Basta o tipo <code>Pedido</code> ter o método <code>String() string</code>: não é preciso “declarar” que ele implementa a interface.`,
      lang: "go",
      inicial: c`package main

import "fmt"

type Pedido struct {
	Numero  int
	Cliente string
	Total   float64
}

func (p Pedido) ____() ____ {
	return fmt.Sprintf("Pedido #%d - %s - R$ %.2f", p.Numero, p.Cliente, p.Total)
}

func main() {
	p := Pedido{Numero: 7, Cliente: "Ana", Total: 89.9}
	fmt.Println(p)
}
`,
      solucao: c`package main

import "fmt"

type Pedido struct {
	Numero  int
	Cliente string
	Total   float64
}

func (p Pedido) String() string {
	return fmt.Sprintf("Pedido #%d - %s - R$ %.2f", p.Numero, p.Cliente, p.Total)
}

func main() {
	p := Pedido{Numero: 7, Cliente: "Ana", Total: 89.9}
	fmt.Println(p)
}
`,
      padroes: [
        [/func\s*\(\s*\w+\s+\*?Pedido\s*\)\s*String\s*\(\s*\)\s*string/, "Crie o método String() string em Pedido."],
        [/fmt\.Println\s*\(\s*p\s*\)/, "Imprima com fmt.Println(p)."],
      ],
      saidaEsperada: "Pedido #7 - Ana - R$ 89.90",
    },
    {
      tipo: "criar",
      titulo: "Avisar todos os canais",
      enunciado: `A clínica confirma consultas por e-mail e por notificação push. Crie:
        <ul>
          <li>a interface <code>Notificador</code> com o método <code>Enviar(msg string) error</code>;</li>
          <li>os tipos <code>Email</code> (campo <code>Endereco</code>) e <code>Push</code> (campo <code>Dispositivo</code>), cada um com seu <code>Enviar</code>, que imprime a mensagem e devolve <code>nil</code>;</li>
          <li>a função <code>avisarTodos(ns []Notificador, msg string)</code>.</li>
        </ul>
        No <code>main</code>, avise <code>Email{"ana@ex.com"}</code> e <code>Push{"celular-01"}</code> com a mensagem
        <code>"Consulta confirmada"</code>. Saída exata:
        <pre>E-mail para ana@ex.com: Consulta confirmada
Push para celular-01: Consulta confirmada</pre>`,
      dica: `<code>avisarTodos</code> não sabe se é e-mail ou push: ela só chama <code>n.Enviar(msg)</code> para cada <code>n</code> do slice.`,
      lang: "go",
      inicial: c`package main

// 1. type Notificador interface { Enviar(msg string) error }
// 2. type Email struct{ Endereco string } e type Push struct{ Dispositivo string }
//    com os métodos Enviar
// 3. func avisarTodos(ns []Notificador, msg string)
// 4. No main, avise os dois com "Consulta confirmada"

func main() {
}
`,
      solucao: c`package main

import "fmt"

type Notificador interface {
	Enviar(msg string) error
}

type Email struct{ Endereco string }
type Push struct{ Dispositivo string }

func (e Email) Enviar(msg string) error {
	fmt.Println("E-mail para " + e.Endereco + ": " + msg)
	return nil
}

func (p Push) Enviar(msg string) error {
	fmt.Println("Push para " + p.Dispositivo + ": " + msg)
	return nil
}

func avisarTodos(ns []Notificador, msg string) {
	for _, n := range ns {
		n.Enviar(msg)
	}
}

func main() {
	avisarTodos([]Notificador{Email{"ana@ex.com"}, Push{"celular-01"}}, "Consulta confirmada")
}
`,
      padroes: [
        [/type\s+Notificador\s+interface\s*\{[^}]*Enviar\s*\(\s*\w+\s+string\s*\)\s*error/, "Crie a interface Notificador com Enviar(msg string) error."],
        [/func\s*\(\s*\w+\s+Email\s*\)\s*Enviar\s*\(\s*\w+\s+string\s*\)\s*error/, "Implemente Enviar no tipo Email."],
        [/func\s*\(\s*\w+\s+Push\s*\)\s*Enviar\s*\(\s*\w+\s+string\s*\)\s*error/, "Implemente Enviar no tipo Push."],
        [/func\s+avisarTodos\s*\(\s*\w+\s+\[\]Notificador\s*,\s*\w+\s+string\s*\)/, "Crie func avisarTodos(ns []Notificador, msg string)."],
      ],
      saidaEsperada: "E-mail para ana@ex.com: Consulta confirmada\nPush para celular-01: Consulta confirmada",
    },
    {
      tipo: "criar",
      titulo: "Repositório falso para testes",
      enunciado: `O serviço de boas-vindas busca o nome do cliente num banco. Para testar sem banco de verdade, crie:
        <ul>
          <li>a interface <code>Repositorio</code> com <code>BuscarNome(id int) (string, error)</code>;</li>
          <li>o tipo <code>RepoFalso</code>, com um campo <code>dados map[int]string</code>, que implementa a interface
            (se o id não existir, devolve um erro <code>"cliente N não encontrado"</code>);</li>
          <li>a função <code>saudacao(r Repositorio, id int) string</code>, que devolve <code>"Olá, Ana!"</code> ou o texto do erro.</li>
        </ul>
        No <code>main</code>, crie o repositório falso com <code>{1: "Ana", 2: "Bruno"}</code> e imprima a saudação para os ids 1, 2 e 9.`,
      dica: `Use <code>nome, ok := r.dados[id]</code> e <code>fmt.Errorf("cliente %d não encontrado", id)</code>. A função <code>saudacao</code> recebe a <b>interface</b>, então amanhã pode receber o repositório real sem mudar nada.`,
      lang: "go",
      inicial: c`package main

// 1. type Repositorio interface { BuscarNome(id int) (string, error) }
// 2. type RepoFalso struct { dados map[int]string } + método BuscarNome
// 3. func saudacao(r Repositorio, id int) string
// 4. No main: ids 1, 2 e 9
//    Saída: "Olá, Ana!", "Olá, Bruno!", "cliente 9 não encontrado"

func main() {
}
`,
      solucao: c`package main

import "fmt"

type Repositorio interface {
	BuscarNome(id int) (string, error)
}

type RepoFalso struct {
	dados map[int]string
}

func (r RepoFalso) BuscarNome(id int) (string, error) {
	nome, ok := r.dados[id]
	if !ok {
		return "", fmt.Errorf("cliente %d não encontrado", id)
	}
	return nome, nil
}

func saudacao(r Repositorio, id int) string {
	nome, err := r.BuscarNome(id)
	if err != nil {
		return err.Error()
	}
	return "Olá, " + nome + "!"
}

func main() {
	repo := RepoFalso{dados: map[int]string{1: "Ana", 2: "Bruno"}}
	for _, id := range []int{1, 2, 9} {
		fmt.Println(saudacao(repo, id))
	}
}
`,
      padroes: [
        [/type\s+Repositorio\s+interface\s*\{/, "Crie type Repositorio interface { ... }."],
        [/BuscarNome\s*\(\s*\w*\s*int\s*\)\s*\(\s*string\s*,\s*error\s*\)/, "BuscarNome deve receber int e devolver (string, error)."],
        [/func\s*\(\s*\w+\s+\*?RepoFalso\s*\)\s*BuscarNome/, "Implemente BuscarNome no tipo RepoFalso."],
        [/func\s+saudacao\s*\(\s*\w+\s+Repositorio\s*,\s*\w+\s+int\s*\)\s*string/, "Crie func saudacao(r Repositorio, id int) string."],
      ],
      saidaEsperada: "Olá, Ana!\nOlá, Bruno!\ncliente 9 não encontrado",
    },
  ],

  /* ===================== i3: API HTTP com net/http ===================== */
  i3: [
    {
      tipo: "completar",
      titulo: "Rota de saúde do serviço",
      enunciado: `Todo microsserviço tem uma rota <code>/saude</code> que responde <code>ok</code>, usada pelo balanceador para saber se o
        serviço está vivo. Complete o <b>handler</b>: ele recebe um <code>http.ResponseWriter</code> e um <code>*http.Request</code>,
        e escreve <code>ok</code> na resposta com <code>fmt.Fprint(w, ...)</code>.
        O <code>main</code> usa o pacote <code>net/http/httptest</code> para simular a requisição sem abrir porta nenhuma.
        Substitua cada <code>____</code>.`,
      dica: `<code>w</code> é por onde a resposta é escrita. <code>httptest.NewRecorder()</code> “grava” o status (<code>rec.Code</code>) e o corpo (<code>rec.Body</code>).`,
      lang: "go",
      inicial: c`package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func saude(w ____, r *http.Request) {
	fmt.Fprint(____, "ok")
}

func main() {
	req := httptest.NewRequest("GET", "/saude", nil)
	rec := httptest.NewRecorder()
	saude(rec, req)

	fmt.Println(rec.Code, rec.Body.String())
}
`,
      solucao: c`package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func saude(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "ok")
}

func main() {
	req := httptest.NewRequest("GET", "/saude", nil)
	rec := httptest.NewRecorder()
	saude(rec, req)

	fmt.Println(rec.Code, rec.Body.String())
}
`,
      padroes: [
        [/func\s+saude\s*\(\s*w\s+http\.ResponseWriter\s*,\s*r\s+\*http\.Request\s*\)/, "O handler deve ser func saude(w http.ResponseWriter, r *http.Request)."],
        [/fmt\.Fprint\w*\s*\(\s*w\s*,\s*"ok"/, 'Escreva na resposta com fmt.Fprint(w, "ok").'],
      ],
      saidaEsperada: "200 ok",
    },
    {
      tipo: "completar",
      titulo: "Listar produtos em JSON",
      enunciado: `A rota <code>GET /produtos</code> deve responder a lista de produtos em <b>JSON</b>. Complete o handler
        <code>listar</code>:
        <ul>
          <li>defina o cabeçalho <code>Content-Type</code> como <code>application/json</code>;</li>
          <li>escreva a lista com <code>json.NewEncoder(w).Encode(produtos)</code>.</li>
        </ul>
        O <code>main</code> chama o handler diretamente com <code>httptest</code> (num servidor de verdade você registraria com <code>mux.HandleFunc("GET /produtos", listar)</code>).
        Substitua cada <code>____</code>.`,
      dica: `Cabeçalhos são definidos com <code>w.Header().Set(nome, valor)</code>, antes de escrever o corpo.`,
      lang: "go",
      inicial: c`package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

type Produto struct {
	ID    int
	Nome  string
	Preco float64
}

var produtos = []Produto{{1, "Teclado", 199.9}, {2, "Mouse", 89.5}}

func listar(w http.ResponseWriter, r *http.Request) {
	w.Header().____("Content-Type", "application/json")
	json.____(w).Encode(____)
}

func main() {
	req := httptest.NewRequest("GET", "/produtos", nil)
	rec := httptest.NewRecorder()
	listar(rec, req)

	fmt.Println(rec.Code, rec.Header().Get("Content-Type"))
	fmt.Println(strings.TrimSpace(rec.Body.String()))
}
`,
      solucao: c`package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

type Produto struct {
	ID    int
	Nome  string
	Preco float64
}

var produtos = []Produto{{1, "Teclado", 199.9}, {2, "Mouse", 89.5}}

func listar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(produtos)
}

func main() {
	req := httptest.NewRequest("GET", "/produtos", nil)
	rec := httptest.NewRecorder()
	listar(rec, req)

	fmt.Println(rec.Code, rec.Header().Get("Content-Type"))
	fmt.Println(strings.TrimSpace(rec.Body.String()))
}
`,
      padroes: [
        [/w\.Header\(\)\.Set\s*\(\s*"Content-Type"\s*,\s*"application\/json"\s*\)/, 'Defina o cabeçalho com w.Header().Set("Content-Type", "application/json").'],
        [/json\.NewEncoder\s*\(\s*w\s*\)\.Encode\s*\(\s*produtos\s*\)/, "Escreva o JSON com json.NewEncoder(w).Encode(produtos)."],
      ],
      saidaEsperada: '200 application/json\n[{"ID":1,"Nome":"Teclado","Preco":199.9},{"ID":2,"Nome":"Mouse","Preco":89.5}]',
    },
    {
      tipo: "completar",
      titulo: "Cadastrar produto via POST",
      enunciado: `A rota <code>POST /produtos</code> lê um produto em JSON do corpo da requisição. Complete o handler <code>criar</code>:
        <ul>
          <li>decodifique o corpo para dentro de <code>p</code> (passe o <b>endereço</b> de <code>p</code>);</li>
          <li>se o JSON for inválido, responda com <code>http.StatusBadRequest</code> (400);</li>
          <li>se der certo, responda com <code>http.StatusCreated</code> (201) antes de escrever o JSON.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>Decode(&amp;p)</code> precisa do ponteiro para conseguir preencher <code>p</code>. <code>w.WriteHeader</code> tem de vir antes de escrever o corpo.`,
      lang: "go",
      inicial: c`package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

type Produto struct {
	ID    int
	Nome  string
	Preco float64
}

var produtos = []Produto{{1, "Teclado", 199.9}}

func criar(w http.ResponseWriter, r *http.Request) {
	var p Produto
	if err := json.NewDecoder(r.Body).Decode(____); err != nil {
		http.Error(w, "JSON inválido", http.____)
		return
	}
	p.ID = len(produtos) + 1
	produtos = append(produtos, p)
	w.WriteHeader(http.____)
	json.NewEncoder(w).Encode(p)
}

func main() {
	for _, corpo := range []string{"{\"Nome\":\"Monitor\",\"Preco\":899}", "isso não é json"} {
		req := httptest.NewRequest("POST", "/produtos", strings.NewReader(corpo))
		rec := httptest.NewRecorder()
		criar(rec, req)
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
}
`,
      solucao: c`package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

type Produto struct {
	ID    int
	Nome  string
	Preco float64
}

var produtos = []Produto{{1, "Teclado", 199.9}}

func criar(w http.ResponseWriter, r *http.Request) {
	var p Produto
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}
	p.ID = len(produtos) + 1
	produtos = append(produtos, p)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func main() {
	for _, corpo := range []string{"{\"Nome\":\"Monitor\",\"Preco\":899}", "isso não é json"} {
		req := httptest.NewRequest("POST", "/produtos", strings.NewReader(corpo))
		rec := httptest.NewRecorder()
		criar(rec, req)
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
}
`,
      padroes: [
        [/\.Decode\s*\(\s*&\s*p\s*\)/, "Decodifique com Decode(&p) (com o &)."],
        [/http\.Error\s*\([^)]*http\.StatusBadRequest\s*\)/, "Responda JSON inválido com http.StatusBadRequest."],
        [/w\.WriteHeader\s*\(\s*http\.StatusCreated\s*\)/, "Responda o sucesso com w.WriteHeader(http.StatusCreated)."],
      ],
      saidaEsperada: '201 {"ID":2,"Nome":"Monitor","Preco":899}\n400 JSON inválido',
    },
    {
      tipo: "criar",
      titulo: "Calculadora de frete por CEP",
      enunciado: `Escreva o handler <code>frete(w http.ResponseWriter, r *http.Request)</code> da rota <code>GET /frete</code>:
        <ul>
          <li>leia o parâmetro da URL com <code>r.URL.Query().Get("cep")</code>;</li>
          <li>se vier vazio, responda <code>http.Error(w, "informe o cep", http.StatusBadRequest)</code>;</li>
          <li>se o CEP começar com <code>"0"</code> (São Paulo), o frete é R$ 15.00; senão, R$ 25.00. Responda
            <code>Frete para CEP: R$ VALOR</code> (ex.: <code>Frete para 01001000: R$ 15.00</code>).</li>
        </ul>
        O <code>main</code> abaixo já testa três chamadas com <code>httptest</code>; não precisa mexer nele.`,
      dica: `<code>strings.HasPrefix(cep, "0")</code> diz se o texto começa com "0". Escreva a resposta com <code>fmt.Fprintf(w, "Frete para %s: R$ %.2f", cep, valor)</code>.`,
      lang: "go",
      inicial: c`package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

// Escreva aqui: func frete(w http.ResponseWriter, r *http.Request)

func main() {
	for _, url := range []string{"/frete?cep=01001000", "/frete?cep=80010000", "/frete"} {
		rec := httptest.NewRecorder()
		frete(rec, httptest.NewRequest("GET", url, nil))
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
}
`,
      solucao: c`package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

func frete(w http.ResponseWriter, r *http.Request) {
	cep := r.URL.Query().Get("cep")
	if cep == "" {
		http.Error(w, "informe o cep", http.StatusBadRequest)
		return
	}
	valor := 25.0
	if strings.HasPrefix(cep, "0") {
		valor = 15.0
	}
	fmt.Fprintf(w, "Frete para %s: R$ %.2f", cep, valor)
}

func main() {
	for _, url := range []string{"/frete?cep=01001000", "/frete?cep=80010000", "/frete"} {
		rec := httptest.NewRecorder()
		frete(rec, httptest.NewRequest("GET", url, nil))
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
}
`,
      padroes: [
        [/func\s+frete\s*\(\s*\w+\s+http\.ResponseWriter\s*,\s*\w+\s+\*http\.Request\s*\)/, "Crie func frete(w http.ResponseWriter, r *http.Request)."],
        [/\.URL\.Query\(\)\.Get\s*\(\s*"cep"\s*\)/, 'Leia o CEP com r.URL.Query().Get("cep").'],
        [/http\.StatusBadRequest/, "Sem CEP, responda com http.StatusBadRequest."],
        [/fmt\.Fprint\w*\s*\(\s*w\s*,/, "Escreva a resposta em w com fmt.Fprintf(w, ...)."],
      ],
      saidaEsperada: "200 Frete para 01001000: R$ 15.00\n200 Frete para 80010000: R$ 25.00\n400 informe o cep",
    },
    {
      tipo: "criar",
      titulo: "Mini API de tarefas",
      enunciado: `Crie a função <code>novoServidor() *http.ServeMux</code> com duas rotas:
        <ul>
          <li><code>"POST /tarefas"</code>: lê uma <code>Tarefa</code> em JSON, define <code>ID = len(tarefas) + 1</code>, guarda no slice e responde <b>201</b> com a tarefa em JSON;</li>
          <li><code>"GET /tarefas/{id}"</code>: lê o id com <code>r.PathValue("id")</code> (converta com <code>strconv.Atoi</code>), responde a tarefa em JSON ou, se não existir, <code>http.Error(w, "tarefa não encontrada", http.StatusNotFound)</code>.</li>
        </ul>
        O tipo <code>Tarefa</code>, o slice inicial e o <code>main</code> de teste já estão prontos.`,
      dica: `Dentro de <code>novoServidor</code>, crie <code>mux := http.NewServeMux()</code>, registre as rotas com <code>mux.HandleFunc(...)</code> e devolva <code>mux</code>. Para achar a tarefa, percorra o slice comparando <code>t.ID == id</code>.`,
      lang: "go",
      inicial: c`// A linha abaixo liga as rotas com método e {id} (padrão do Go 1.22+) mesmo rodando sem go.mod.
//go:debug httpmuxgo121=0

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
)

type Tarefa struct {
	ID     int
	Titulo string
	Feita  bool
}

var tarefas = []Tarefa{{1, "Comprar pão", false}}

// Escreva aqui: func novoServidor() *http.ServeMux
// com as rotas "POST /tarefas" e "GET /tarefas/{id}"

func chamar(mux *http.ServeMux, metodo, url, corpo string) {
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, httptest.NewRequest(metodo, url, strings.NewReader(corpo)))
	fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
}

func main() {
	mux := novoServidor()
	chamar(mux, "POST", "/tarefas", "{\"Titulo\":\"Pagar boleto\"}")
	chamar(mux, "GET", "/tarefas/2", "")
	chamar(mux, "GET", "/tarefas/9", "")
}
`,
      solucao: c`// A linha abaixo liga as rotas com método e {id} (padrão do Go 1.22+) mesmo rodando sem go.mod.
//go:debug httpmuxgo121=0

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
)

type Tarefa struct {
	ID     int
	Titulo string
	Feita  bool
}

var tarefas = []Tarefa{{1, "Comprar pão", false}}

func novoServidor() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /tarefas", func(w http.ResponseWriter, r *http.Request) {
		var t Tarefa
		if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
			http.Error(w, "JSON inválido", http.StatusBadRequest)
			return
		}
		t.ID = len(tarefas) + 1
		tarefas = append(tarefas, t)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(t)
	})

	mux.HandleFunc("GET /tarefas/{id}", func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, "id inválido", http.StatusBadRequest)
			return
		}
		for _, t := range tarefas {
			if t.ID == id {
				json.NewEncoder(w).Encode(t)
				return
			}
		}
		http.Error(w, "tarefa não encontrada", http.StatusNotFound)
	})

	return mux
}

func chamar(mux *http.ServeMux, metodo, url, corpo string) {
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, httptest.NewRequest(metodo, url, strings.NewReader(corpo)))
	fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
}

func main() {
	mux := novoServidor()
	chamar(mux, "POST", "/tarefas", "{\"Titulo\":\"Pagar boleto\"}")
	chamar(mux, "GET", "/tarefas/2", "")
	chamar(mux, "GET", "/tarefas/9", "")
}
`,
      padroes: [
        [/func\s+novoServidor\s*\(\s*\)\s*\*http\.ServeMux/, "Crie func novoServidor() *http.ServeMux."],
        [/HandleFunc\s*\(\s*"POST \/tarefas"/, 'Registre a rota "POST /tarefas".'],
        [/HandleFunc\s*\(\s*"GET \/tarefas\/\{id\}"/, 'Registre a rota "GET /tarefas/{id}".'],
        [/PathValue\s*\(\s*"id"\s*\)/, 'Leia o id da URL com r.PathValue("id").'],
        [/http\.StatusNotFound/, "Responda 404 com http.StatusNotFound quando a tarefa não existir."],
      ],
      saidaEsperada: '201 {"ID":2,"Titulo":"Pagar boleto","Feita":false}\n200 {"ID":2,"Titulo":"Pagar boleto","Feita":false}\n404 tarefa não encontrada',
    },
  ],

  /* ===================== a1: Goroutines e channels ===================== */
  a1: [
    {
      tipo: "completar",
      titulo: "Consultas de clientes em paralelo",
      enunciado: `Cada consulta a um cliente demora 100 ms. Com goroutines, as 5 consultas rodam ao mesmo tempo.
        Complete o uso do <code>sync.WaitGroup</code>:
        <ul>
          <li><code>wg.Add(1)</code> antes de iniciar cada goroutine;</li>
          <li><code>defer wg.Done()</code> dentro dela;</li>
          <li><code>wg.Wait()</code> para esperar todas antes de fechar o channel.</li>
        </ul>
        Como as goroutines terminam em ordem imprevisível, o código <b>ordena</b> os resultados antes de imprimir.
        Substitua cada <code>____</code>.`,
      dica: `Se esquecer o <code>Wait</code>, o <code>close</code> acontece antes das goroutines enviarem e o programa quebra. <code>sort.Strings</code> deixa a saída sempre igual.`,
      lang: "go",
      inicial: c`package main

import (
	"fmt"
	"sort"
	"sync"
	"time"
)

func consultar(id int) string {
	time.Sleep(100 * time.Millisecond) // simula chamada lenta
	return fmt.Sprintf("cliente %d ok", id)
}

func main() {
	ids := []int{1, 2, 3, 4, 5}
	resultados := make(chan string, len(ids))
	var wg sync.WaitGroup

	for _, id := range ids {
		wg.____(1)
		go func(id int) {
			defer wg.____()
			resultados <- consultar(id)
		}(id)
	}

	wg.____()
	close(resultados)

	lista := []string{}
	for r := range resultados {
		lista = append(lista, r)
	}
	sort.Strings(lista)
	for _, r := range lista {
		fmt.Println(r)
	}
}
`,
      solucao: c`package main

import (
	"fmt"
	"sort"
	"sync"
	"time"
)

func consultar(id int) string {
	time.Sleep(100 * time.Millisecond) // simula chamada lenta
	return fmt.Sprintf("cliente %d ok", id)
}

func main() {
	ids := []int{1, 2, 3, 4, 5}
	resultados := make(chan string, len(ids))
	var wg sync.WaitGroup

	for _, id := range ids {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			resultados <- consultar(id)
		}(id)
	}

	wg.Wait()
	close(resultados)

	lista := []string{}
	for r := range resultados {
		lista = append(lista, r)
	}
	sort.Strings(lista)
	for _, r := range lista {
		fmt.Println(r)
	}
}
`,
      padroes: [
        [/wg\.Add\s*\(\s*1\s*\)/, "Chame wg.Add(1) antes de cada goroutine."],
        [/defer\s+wg\.Done\s*\(\s*\)/, "Dentro da goroutine, use defer wg.Done()."],
        [/wg\.Wait\s*\(\s*\)\s*\n\s*close\s*\(\s*resultados\s*\)/, "Chame wg.Wait() antes de close(resultados)."],
      ],
      saidaEsperada: "cliente 1 ok\ncliente 2 ok\ncliente 3 ok\ncliente 4 ok\ncliente 5 ok",
    },
    {
      tipo: "completar",
      titulo: "Somando as vendas em duas metades",
      enunciado: `Para fechar o caixa mais rápido, duas goroutines somam cada uma metade das vendas e mandam o resultado por um
        <b>channel</b>. Complete:
        <ul>
          <li>crie o channel de inteiros com <code>make(chan int)</code>;</li>
          <li>envie a soma pelo channel com <code>ch &lt;- soma</code>;</li>
          <li>no <code>main</code>, receba os dois resultados com <code>&lt;-ch</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `A seta mostra a direção do dado: <code>ch &lt;- v</code> envia, <code>v := &lt;-ch</code> recebe. Receber de um channel sem buffer espera até alguém enviar.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func somar(vendas []int, ch chan int) {
	soma := 0
	for _, v := range vendas {
		soma += v
	}
	ch ____ soma
}

func main() {
	vendas := []int{100, 200, 300, 400, 250, 250}
	ch := ____(chan int)

	go somar(vendas[:3], ch)
	go somar(vendas[3:], ch)

	a, b := ____ch, ____ch
	fmt.Println("Total de vendas:", a+b)
}
`,
      solucao: c`package main

import "fmt"

func somar(vendas []int, ch chan int) {
	soma := 0
	for _, v := range vendas {
		soma += v
	}
	ch <- soma
}

func main() {
	vendas := []int{100, 200, 300, 400, 250, 250}
	ch := make(chan int)

	go somar(vendas[:3], ch)
	go somar(vendas[3:], ch)

	a, b := <-ch, <-ch
	fmt.Println("Total de vendas:", a+b)
}
`,
      padroes: [
        [/ch\s*:=\s*make\s*\(\s*chan\s+int\s*\)/, "Crie o channel com ch := make(chan int)."],
        [/ch\s*<-\s*soma/, "Envie a soma com ch <- soma."],
        [/a\s*,\s*b\s*:=\s*<-\s*ch\s*,\s*<-\s*ch/, "Receba os dois valores com a, b := <-ch, <-ch."],
      ],
      saidaEsperada: "Total de vendas: 1500",
    },
    {
      tipo: "completar",
      titulo: "Contador de visitas com Mutex",
      enunciado: `100 goroutines registram visitas no site ao mesmo tempo. Sem proteção, duas podem alterar o contador juntas e
        visitas se perdem (<i>race condition</i>). Complete o código com um <code>sync.Mutex</code>: trave com
        <code>mu.Lock()</code> antes de alterar e destrave com <code>mu.Unlock()</code> depois. Substitua cada <code>____</code>.`,
      dica: `Só uma goroutine por vez passa do <code>Lock()</code>; as outras esperam até o <code>Unlock()</code>.`,
      lang: "go",
      inicial: c`package main

import (
	"fmt"
	"sync"
)

func main() {
	visitas := 0
	var mu sync.____
	var wg sync.WaitGroup

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.____()
			visitas++
			mu.____()
		}()
	}

	wg.Wait()
	fmt.Println("Visitas:", visitas)
}
`,
      solucao: c`package main

import (
	"fmt"
	"sync"
)

func main() {
	visitas := 0
	var mu sync.Mutex
	var wg sync.WaitGroup

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			visitas++
			mu.Unlock()
		}()
	}

	wg.Wait()
	fmt.Println("Visitas:", visitas)
}
`,
      padroes: [
        [/var\s+mu\s+sync\.Mutex/, "Declare var mu sync.Mutex."],
        [/mu\.Lock\s*\(\s*\)\s*\n\s*visitas\+\+/, "Trave com mu.Lock() antes de visitas++."],
        [/visitas\+\+\s*\n\s*mu\.Unlock\s*\(\s*\)/, "Destrave com mu.Unlock() depois de visitas++."],
      ],
      saidaEsperada: "Visitas: 100",
    },
    {
      tipo: "criar",
      titulo: "Worker pool de pedidos",
      enunciado: `O delivery recebeu 6 pedidos (números 1 a 6) e quer processá-los com <b>3 trabalhadores</b> em paralelo.
        Crie:
        <ul>
          <li>a struct <code>Resultado</code> com <code>Pedido int</code> e <code>Valor float64</code>;</li>
          <li>a função <code>trabalhador(pedidos &lt;-chan int, resultados chan&lt;- Resultado, wg *sync.WaitGroup)</code>,
            que lê pedidos com <code>range</code> até o channel fechar e envia <code>Resultado{p, float64(p) * 10}</code>;</li>
          <li>no <code>main</code>: os channels, 3 goroutines de <code>trabalhador</code>, o envio dos pedidos 1 a 6,
            <code>close(pedidos)</code>, a espera e a coleta dos resultados.</li>
        </ul>
        A ordem de chegada muda a cada execução, então guarde cada valor na posição do seu pedido e imprima na ordem 1 a 6:
        <pre>Pedido 1: R$ 10.00
...
Pedido 6: R$ 60.00
Total: R$ 210.00</pre>`,
      dica: `Use channels com buffer (<code>make(chan int, 6)</code>) para os envios não travarem. Depois do <code>wg.Wait()</code>, feche <code>resultados</code> e percorra com <code>range</code>, guardando em <code>valores[r.Pedido] = r.Valor</code> (um slice de tamanho 7).`,
      lang: "go",
      inicial: c`package main

// 1. type Resultado struct { Pedido int; Valor float64 }
// 2. func trabalhador(pedidos <-chan int, resultados chan<- Resultado, wg *sync.WaitGroup)
// 3. No main: 3 trabalhadores, pedidos 1 a 6, close(pedidos), wg.Wait(),
//    close(resultados), guarde cada valor na posição do pedido e imprima em ordem

func main() {
}
`,
      solucao: c`package main

import (
	"fmt"
	"sync"
)

type Resultado struct {
	Pedido int
	Valor  float64
}

func trabalhador(pedidos <-chan int, resultados chan<- Resultado, wg *sync.WaitGroup) {
	defer wg.Done()
	for p := range pedidos {
		resultados <- Resultado{Pedido: p, Valor: float64(p) * 10}
	}
}

func main() {
	pedidos := make(chan int, 6)
	resultados := make(chan Resultado, 6)
	var wg sync.WaitGroup

	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go trabalhador(pedidos, resultados, &wg)
	}

	for p := 1; p <= 6; p++ {
		pedidos <- p
	}
	close(pedidos)

	wg.Wait()
	close(resultados)

	valores := make([]float64, 7)
	for r := range resultados {
		valores[r.Pedido] = r.Valor
	}

	total := 0.0
	for p := 1; p <= 6; p++ {
		fmt.Printf("Pedido %d: R$ %.2f\n", p, valores[p])
		total += valores[p]
	}
	fmt.Printf("Total: R$ %.2f\n", total)
}
`,
      padroes: [
        [/func\s+trabalhador\s*\(\s*\w+\s+<-chan\s+int\s*,\s*\w+\s+chan<-\s*Resultado\s*,\s*\w+\s+\*sync\.WaitGroup\s*\)/, "Crie func trabalhador(pedidos <-chan int, resultados chan<- Resultado, wg *sync.WaitGroup)."],
        [/for\s+\w+\s*:=\s*range\s+pedidos/, "No trabalhador, leia os pedidos com for p := range pedidos."],
        [/go\s+trabalhador\s*\(/, "Inicie os trabalhadores com go trabalhador(...)."],
        [/close\s*\(\s*pedidos\s*\)/, "Feche o channel de pedidos com close(pedidos) para os trabalhadores terminarem."],
      ],
      saidaEsperada: "Pedido 1: R$ 10.00\nPedido 2: R$ 20.00\nPedido 3: R$ 30.00\nPedido 4: R$ 40.00\nPedido 5: R$ 50.00\nPedido 6: R$ 60.00\nTotal: R$ 210.00",
    },
    {
      tipo: "criar",
      titulo: "Pipeline de preços com taxa",
      enunciado: `Monte um <b>pipeline</b> de duas etapas ligadas por channels:
        <ul>
          <li><code>gerar(precos []float64) &lt;-chan float64</code>: inicia uma goroutine que envia cada preço e depois fecha o channel;</li>
          <li><code>comTaxa(entrada &lt;-chan float64) &lt;-chan float64</code>: inicia uma goroutine que lê cada preço, envia o preço
            com 10% de taxa (<code>p * 1.1</code>) e fecha o channel de saída no fim.</li>
        </ul>
        No <code>main</code>, ligue <code>comTaxa(gerar([]float64{10, 25.5, 4}))</code>, percorra o resultado com
        <code>range</code> imprimindo cada valor e, no fim, o total. Saída exata:
        <pre>R$ 11.00
R$ 28.05
R$ 4.40
Total: R$ 43.45</pre>`,
      dica: `Cada etapa cria o channel, dispara <code>go func() { ...; close(saida) }()</code> e devolve o channel na hora. Como cada etapa tem uma só goroutine, a ordem é mantida.`,
      lang: "go",
      inicial: c`package main

// 1. func gerar(precos []float64) <-chan float64
// 2. func comTaxa(entrada <-chan float64) <-chan float64   (p * 1.1)
// 3. No main: for p := range comTaxa(gerar(...)) { ... }
//    imprima "R$ %.2f" para cada um e o total no fim

func main() {
}
`,
      solucao: c`package main

import "fmt"

func gerar(precos []float64) <-chan float64 {
	saida := make(chan float64)
	go func() {
		for _, p := range precos {
			saida <- p
		}
		close(saida)
	}()
	return saida
}

func comTaxa(entrada <-chan float64) <-chan float64 {
	saida := make(chan float64)
	go func() {
		for p := range entrada {
			saida <- p * 1.1
		}
		close(saida)
	}()
	return saida
}

func main() {
	total := 0.0
	for p := range comTaxa(gerar([]float64{10, 25.5, 4})) {
		fmt.Printf("R$ %.2f\n", p)
		total += p
	}
	fmt.Printf("Total: R$ %.2f\n", total)
}
`,
      padroes: [
        [/func\s+gerar\s*\(\s*\w+\s+\[\]float64\s*\)\s*<-chan\s+float64/, "Crie func gerar(precos []float64) <-chan float64."],
        [/func\s+comTaxa\s*\(\s*\w+\s+<-chan\s+float64\s*\)\s*<-chan\s+float64/, "Crie func comTaxa(entrada <-chan float64) <-chan float64."],
        [/go\s+func/, "Cada etapa deve rodar numa goroutine (go func() { ... }())."],
        [/close\s*\(/, "Feche os channels de saída com close para o range terminar."],
        [/range\s+comTaxa\s*\(\s*gerar\s*\(/, "No main, percorra range comTaxa(gerar(...))."],
      ],
      saidaEsperada: "R$ 11.00\nR$ 28.05\nR$ 4.40\nTotal: R$ 43.45",
    },
  ],

  /* ===================== a2: Context: timeouts e cancelamento ===================== */
  a2: [
    {
      tipo: "completar",
      titulo: "Timeout na consulta ao banco",
      enunciado: `A consulta de saldo não pode travar a API: ela tem <b>100 ms</b> no total. Complete:
        <ul>
          <li>crie o contexto com <code>context.WithTimeout(context.Background(), 100*time.Millisecond)</code>;</li>
          <li>garanta a liberação com <code>defer cancel()</code>;</li>
          <li>no <code>select</code>, reaja ao fim do prazo com <code>&lt;-ctx.Done()</code>.</li>
        </ul>
        A primeira consulta demora 10 ms (dá tempo); a segunda, 1 s (estoura o prazo). Substitua cada <code>____</code>.`,
      dica: `O <code>select</code> espera o que acontecer primeiro: a resposta (<code>time.After</code>) ou o cancelamento (<code>ctx.Done()</code>). <code>ctx.Err()</code> diz o motivo.`,
      lang: "go",
      inicial: c`package main

import (
	"context"
	"fmt"
	"time"
)

func consultarSaldo(ctx context.Context, demora time.Duration) (string, error) {
	select {
	case <-time.After(demora):
		return "saldo: R$ 500.00", nil
	case <-ctx.____():
		return "", ctx.Err()
	}
}

func main() {
	ctx, cancel := context.____(context.Background(), 100*time.Millisecond)
	defer ____()

	for _, d := range []time.Duration{10 * time.Millisecond, time.Second} {
		res, err := consultarSaldo(ctx, d)
		if err != nil {
			fmt.Println("erro:", err)
			continue
		}
		fmt.Println(res)
	}
}
`,
      solucao: c`package main

import (
	"context"
	"fmt"
	"time"
)

func consultarSaldo(ctx context.Context, demora time.Duration) (string, error) {
	select {
	case <-time.After(demora):
		return "saldo: R$ 500.00", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	for _, d := range []time.Duration{10 * time.Millisecond, time.Second} {
		res, err := consultarSaldo(ctx, d)
		if err != nil {
			fmt.Println("erro:", err)
			continue
		}
		fmt.Println(res)
	}
}
`,
      padroes: [
        [/case\s*<-\s*ctx\.Done\s*\(\s*\)\s*:/, "No select, use case <-ctx.Done():"],
        [/context\.WithTimeout\s*\(\s*context\.Background\s*\(\s*\)\s*,/, "Crie o contexto com context.WithTimeout(context.Background(), ...)."],
        [/defer\s+cancel\s*\(\s*\)/, "Libere o contexto com defer cancel()."],
      ],
      saidaEsperada: "saldo: R$ 500.00\nerro: context deadline exceeded",
    },
    {
      tipo: "completar",
      titulo: "Erro de contexto vira status HTTP",
      enunciado: `A API precisa traduzir o motivo do erro em status HTTP: prazo estourado → <b>504</b>, cliente desistiu (cancelado) → <b>499</b>,
        sucesso → <b>200</b>. Complete:
        <ul>
          <li>em <code>statusPara</code>, compare com <code>context.DeadlineExceeded</code> e <code>context.Canceled</code> usando <code>errors.Is</code>;</li>
          <li>no caso 2, crie o contexto com <code>context.WithCancel</code> (ele é cancelado logo em seguida).</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>context.WithCancel</code> devolve o contexto e a função <code>cancel</code>; chamar <code>cancel()</code> faz <code>ctx.Err()</code> virar <code>context.Canceled</code>.`,
      lang: "go",
      inicial: c`package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

func operacao(ctx context.Context, demora time.Duration) error {
	select {
	case <-time.After(demora):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func statusPara(err error) int {
	if errors.Is(err, context.____) {
		return 504
	}
	if errors.Is(err, context.____) {
		return 499
	}
	return 200
}

func main() {
	ctx1, cancel1 := context.WithTimeout(context.Background(), 20*time.Millisecond)
	defer cancel1()
	fmt.Println("Caso 1:", statusPara(operacao(ctx1, time.Second)))

	ctx2, cancel2 := context.____(context.Background())
	cancel2()
	fmt.Println("Caso 2:", statusPara(operacao(ctx2, time.Second)))

	fmt.Println("Caso 3:", statusPara(operacao(context.Background(), time.Millisecond)))
}
`,
      solucao: c`package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

func operacao(ctx context.Context, demora time.Duration) error {
	select {
	case <-time.After(demora):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func statusPara(err error) int {
	if errors.Is(err, context.DeadlineExceeded) {
		return 504
	}
	if errors.Is(err, context.Canceled) {
		return 499
	}
	return 200
}

func main() {
	ctx1, cancel1 := context.WithTimeout(context.Background(), 20*time.Millisecond)
	defer cancel1()
	fmt.Println("Caso 1:", statusPara(operacao(ctx1, time.Second)))

	ctx2, cancel2 := context.WithCancel(context.Background())
	cancel2()
	fmt.Println("Caso 2:", statusPara(operacao(ctx2, time.Second)))

	fmt.Println("Caso 3:", statusPara(operacao(context.Background(), time.Millisecond)))
}
`,
      padroes: [
        [/errors\.Is\s*\(\s*err\s*,\s*context\.DeadlineExceeded\s*\)\s*\{\s*return\s+504/, "Prazo estourado: errors.Is(err, context.DeadlineExceeded) → 504."],
        [/errors\.Is\s*\(\s*err\s*,\s*context\.Canceled\s*\)\s*\{\s*return\s+499/, "Cancelado: errors.Is(err, context.Canceled) → 499."],
        [/ctx2\s*,\s*cancel2\s*:=\s*context\.WithCancel\s*\(\s*context\.Background\s*\(\s*\)\s*\)/, "Crie ctx2 com context.WithCancel(context.Background())."],
      ],
      saidaEsperada: "Caso 1: 504\nCaso 2: 499\nCaso 3: 200",
    },
    {
      tipo: "completar",
      titulo: "Handler que respeita o prazo",
      enunciado: `Todo handler HTTP recebe <code>r.Context()</code>, que é cancelado se o cliente desistir ou o prazo acabar.
        Complete o handler de frete para repassar esse contexto a <code>calcularFrete</code> e responder
        <code>http.StatusGatewayTimeout</code> (504) quando der erro. No <code>main</code>, a primeira requisição recebe um contexto
        de 50 ms com <code>req.WithContext(ctx)</code>; a segunda não tem prazo. Substitua cada <code>____</code>.`,
      dica: `<code>r.Context()</code> pega o contexto da requisição. <code>req.WithContext(ctx)</code> devolve uma cópia da requisição usando o novo contexto.`,
      lang: "go",
      inicial: c`package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"time"
)

func calcularFrete(ctx context.Context) (float64, error) {
	select {
	case <-time.After(200 * time.Millisecond):
		return 15, nil
	case <-ctx.Done():
		return 0, ctx.Err()
	}
}

func freteHandler(w http.ResponseWriter, r *http.Request) {
	valor, err := calcularFrete(r.____())
	if err != nil {
		http.Error(w, "tempo esgotado", http.____)
		return
	}
	fmt.Fprintf(w, "frete: R$ %.2f", valor)
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	req1 := httptest.NewRequest("GET", "/frete", nil).____(ctx)
	req2 := httptest.NewRequest("GET", "/frete", nil)

	for _, req := range []*http.Request{req1, req2} {
		rec := httptest.NewRecorder()
		freteHandler(rec, req)
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
}
`,
      solucao: c`package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"time"
)

func calcularFrete(ctx context.Context) (float64, error) {
	select {
	case <-time.After(200 * time.Millisecond):
		return 15, nil
	case <-ctx.Done():
		return 0, ctx.Err()
	}
}

func freteHandler(w http.ResponseWriter, r *http.Request) {
	valor, err := calcularFrete(r.Context())
	if err != nil {
		http.Error(w, "tempo esgotado", http.StatusGatewayTimeout)
		return
	}
	fmt.Fprintf(w, "frete: R$ %.2f", valor)
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	req1 := httptest.NewRequest("GET", "/frete", nil).WithContext(ctx)
	req2 := httptest.NewRequest("GET", "/frete", nil)

	for _, req := range []*http.Request{req1, req2} {
		rec := httptest.NewRecorder()
		freteHandler(rec, req)
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
}
`,
      padroes: [
        [/calcularFrete\s*\(\s*r\.Context\s*\(\s*\)\s*\)/, "Repasse o contexto da requisição: calcularFrete(r.Context())."],
        [/http\.StatusGatewayTimeout/, "Responda o erro com http.StatusGatewayTimeout."],
        [/\.WithContext\s*\(\s*ctx\s*\)/, "Coloque o prazo na requisição com .WithContext(ctx)."],
      ],
      saidaEsperada: "504 tempo esgotado\n200 frete: R$ 15.00",
    },
    {
      tipo: "criar",
      titulo: "Cotação com prazo por transportadora",
      enunciado: `A loja consulta três transportadoras, e cada uma tem <b>100 ms</b> para responder. Crie:
        <ul>
          <li><code>consultarServico(ctx context.Context, nome string, demora time.Duration) (string, error)</code>: usa
            <code>select</code> entre <code>time.After(demora)</code> (devolve <code>nome + ": respondeu"</code>) e
            <code>ctx.Done()</code> (devolve o erro <code>ctx.Err()</code>);</li>
          <li>no <code>main</code>, para cada transportadora crie um contexto com <code>context.WithTimeout</code> de 100 ms,
            chame a função e chame <code>cancel()</code> logo depois.</li>
        </ul>
        Transportadoras e demoras: Correios 20 ms, Transportadora 500 ms, Motoboy 30 ms. Em caso de erro, imprima
        <code>nome + ": desisti (" + err.Error() + ")"</code>. Saída exata:
        <pre>Correios: respondeu
Transportadora: desisti (context deadline exceeded)
Motoboy: respondeu</pre>`,
      dica: `Dentro de um laço, não use <code>defer cancel()</code> (só rodaria no fim do <code>main</code>): chame <code>cancel()</code> logo depois da consulta.`,
      lang: "go",
      inicial: c`package main

// 1. func consultarServico(ctx context.Context, nome string, demora time.Duration) (string, error)
//    com select entre time.After(demora) e ctx.Done()
// 2. No main, para Correios (20ms), Transportadora (500ms) e Motoboy (30ms):
//    context.WithTimeout de 100ms, chame a função, depois cancel()

func main() {
}
`,
      solucao: c`package main

import (
	"context"
	"fmt"
	"time"
)

func consultarServico(ctx context.Context, nome string, demora time.Duration) (string, error) {
	select {
	case <-time.After(demora):
		return nome + ": respondeu", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

type servico struct {
	nome   string
	demora time.Duration
}

func main() {
	servicos := []servico{
		{"Correios", 20 * time.Millisecond},
		{"Transportadora", 500 * time.Millisecond},
		{"Motoboy", 30 * time.Millisecond},
	}

	for _, s := range servicos {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
		res, err := consultarServico(ctx, s.nome, s.demora)
		cancel()
		if err != nil {
			fmt.Println(s.nome + ": desisti (" + err.Error() + ")")
			continue
		}
		fmt.Println(res)
	}
}
`,
      padroes: [
        [/func\s+consultarServico\s*\(\s*ctx\s+context\.Context\s*,\s*\w+\s+string\s*,\s*\w+\s+time\.Duration\s*\)\s*\(\s*string\s*,\s*error\s*\)/, "Crie func consultarServico(ctx context.Context, nome string, demora time.Duration) (string, error)."],
        [/select\s*\{/, "Use select para esperar a resposta ou o fim do prazo."],
        [/<-\s*ctx\.Done\s*\(\s*\)/, "Reaja ao prazo com <-ctx.Done()."],
        [/context\.WithTimeout\s*\(/, "Crie um contexto com context.WithTimeout para cada consulta."],
        [/\bcancel\s*\(\s*\)/, "Chame cancel() depois de cada consulta."],
      ],
      saidaEsperada: "Correios: respondeu\nTransportadora: desisti (context deadline exceeded)\nMotoboy: respondeu",
    },
    {
      tipo: "criar",
      titulo: "O servidor mais rápido vence",
      enunciado: `Para consultar o preço de uma ação, o sistema pergunta a 3 servidores ao mesmo tempo, usa a <b>primeira</b> resposta e
        <b>cancela</b> as outras. Escreva o programa:
        <ul>
          <li>crie <code>ctx, cancel := context.WithCancel(context.Background())</code>;</li>
          <li>para cada servidor, inicie uma goroutine com <code>select</code>: se <code>time.After(demora)</code> chegar primeiro, envie o nome
            num channel <code>respostas</code> (com buffer); se <code>ctx.Done()</code> chegar primeiro, conte mais uma cancelada
            (proteja o contador com <code>sync.Mutex</code>);</li>
          <li>leia a primeira resposta, chame <code>cancel()</code>, espere todas com <code>sync.WaitGroup</code> e imprima.</li>
        </ul>
        Servidores: <code>servidor-rapido</code> 20 ms, <code>servidor-medio</code> 300 ms, <code>servidor-lento</code> 400 ms. Saída exata:
        <pre>Vencedor: servidor-rapido
Canceladas: 2</pre>`,
      dica: `Ordem no <code>main</code>: <code>vencedor := &lt;-respostas</code>, depois <code>cancel()</code>, depois <code>wg.Wait()</code> e só então leia o contador.`,
      lang: "go",
      inicial: c`package main

// 1. ctx, cancel := context.WithCancel(context.Background())
// 2. Uma goroutine por servidor com select entre time.After(demora) e ctx.Done()
// 3. vencedor := <-respostas; cancel(); wg.Wait()
// 4. Imprima "Vencedor: ..." e "Canceladas: ..."

func main() {
}
`,
      solucao: c`package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Servidor struct {
	Nome   string
	Demora time.Duration
}

func main() {
	servidores := []Servidor{
		{"servidor-rapido", 20 * time.Millisecond},
		{"servidor-medio", 300 * time.Millisecond},
		{"servidor-lento", 400 * time.Millisecond},
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	respostas := make(chan string, len(servidores))
	var wg sync.WaitGroup
	var mu sync.Mutex
	canceladas := 0

	for _, s := range servidores {
		wg.Add(1)
		go func(s Servidor) {
			defer wg.Done()
			select {
			case <-time.After(s.Demora):
				respostas <- s.Nome
			case <-ctx.Done():
				mu.Lock()
				canceladas++
				mu.Unlock()
			}
		}(s)
	}

	vencedor := <-respostas
	cancel()
	wg.Wait()

	fmt.Println("Vencedor:", vencedor)
	fmt.Println("Canceladas:", canceladas)
}
`,
      padroes: [
        [/context\.WithCancel\s*\(\s*context\.Background\s*\(\s*\)\s*\)/, "Crie o contexto com context.WithCancel(context.Background())."],
        [/go\s+func/, "Consulte cada servidor numa goroutine (go func ...)."],
        [/<-\s*ctx\.Done\s*\(\s*\)/, "Nas goroutines, reaja ao cancelamento com <-ctx.Done()."],
        [/\.Lock\s*\(\s*\)/, "Proteja o contador de canceladas com um sync.Mutex (Lock/Unlock)."],
        [/\.Wait\s*\(\s*\)/, "Espere todas as goroutines com wg.Wait() antes de imprimir."],
      ],
      saidaEsperada: "Vencedor: servidor-rapido\nCanceladas: 2",
    },
  ],

  /* ===================== a3: Testes e benchmarks ===================== */
  a3: [
    {
      tipo: "completar",
      titulo: "Primeiro teste do desconto VIP",
      enunciado: `Complete o teste da função <code>Desconto</code>. Uma função de teste em Go:
        <ul>
          <li>começa com <code>Test</code> e recebe <code>t *testing.T</code>;</li>
          <li>avisa a falha com <code>t.Errorf(...)</code>.</li>
        </ul>
        Num projeto real o teste fica em <code>desconto_test.go</code> e roda com <code>go test</code>; aqui o <code>main</code>
        faz o papel do <code>go test</code> com <code>testing.Main</code>, e imprime <code>PASS</code> se tudo passar.
        Substitua cada <code>____</code>.`,
      dica: `O tipo do parâmetro é um ponteiro: <code>*testing.T</code>. <code>Errorf</code> marca o teste como falho, mas continua rodando.`,
      lang: "go",
      inicial: c`package main

import "testing"

func Desconto(valor float64, vip bool) float64 {
	if vip {
		return valor * 0.9
	}
	return valor
}

func TestDesconto(t ____) {
	if got := Desconto(100, true); got != 90 {
		t.____("vip: esperava 90.00, veio %.2f", got)
	}
	if got := Desconto(100, false); got != 100 {
		t.____("comum: esperava 100.00, veio %.2f", got)
	}
}

// Faz o papel do "go test": roda TestDesconto e imprime PASS ou FAIL.
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestDesconto", TestDesconto}}, nil, nil)
}
`,
      solucao: c`package main

import "testing"

func Desconto(valor float64, vip bool) float64 {
	if vip {
		return valor * 0.9
	}
	return valor
}

func TestDesconto(t *testing.T) {
	if got := Desconto(100, true); got != 90 {
		t.Errorf("vip: esperava 90.00, veio %.2f", got)
	}
	if got := Desconto(100, false); got != 100 {
		t.Errorf("comum: esperava 100.00, veio %.2f", got)
	}
}

// Faz o papel do "go test": roda TestDesconto e imprime PASS ou FAIL.
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestDesconto", TestDesconto}}, nil, nil)
}
`,
      padroes: [
        [/func\s+TestDesconto\s*\(\s*t\s+\*testing\.T\s*\)/, "A função de teste deve ser func TestDesconto(t *testing.T)."],
        [/t\.Errorf\s*\(\s*"vip/, "Avise a falha do caso VIP com t.Errorf(...)."],
        [/t\.Errorf\s*\(\s*"comum/, "Avise a falha do caso comum com t.Errorf(...)."],
      ],
      saidaEsperada: "PASS",
    },
    {
      tipo: "completar",
      titulo: "Teste de tabela do frete",
      enunciado: `O jeito mais comum de testar em Go é o <b>teste de tabela</b>: um slice de casos e um <code>t.Run</code> para cada um.
        Regra do frete: até 1 kg custa R$ 10; acima disso, R$ 10 + R$ 4 por kg extra. Complete:
        <ul>
          <li>o slice de casos é um <code>[]struct{...}</code>;</li>
          <li>percorra <code>casos</code> com <code>range</code>;</li>
          <li>crie um subteste com <code>t.Run(c.nome, func(t *testing.T) { ... })</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `<code>t.Run</code> dá um nome a cada caso: quando um falha, o <code>go test -v</code> mostra exatamente qual.`,
      lang: "go",
      inicial: c`package main

import "testing"

func Frete(peso float64) float64 {
	if peso <= 1 {
		return 10
	}
	return 10 + (peso-1)*4
}

func TestFrete(t *testing.T) {
	casos := []____{
		nome   string
		peso   float64
		espera float64
	}{
		{"meio quilo", 0.5, 10},
		{"exatamente 1 kg", 1, 10},
		{"3 kg", 3, 18},
	}
	for _, c := range ____ {
		t.____(c.nome, func(t *testing.T) {
			if got := Frete(c.peso); got != c.espera {
				t.Errorf("esperava %.2f, veio %.2f", c.espera, got)
			}
		})
	}
}

// Faz o papel do "go test".
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestFrete", TestFrete}}, nil, nil)
}
`,
      solucao: c`package main

import "testing"

func Frete(peso float64) float64 {
	if peso <= 1 {
		return 10
	}
	return 10 + (peso-1)*4
}

func TestFrete(t *testing.T) {
	casos := []struct {
		nome   string
		peso   float64
		espera float64
	}{
		{"meio quilo", 0.5, 10},
		{"exatamente 1 kg", 1, 10},
		{"3 kg", 3, 18},
	}
	for _, c := range casos {
		t.Run(c.nome, func(t *testing.T) {
			if got := Frete(c.peso); got != c.espera {
				t.Errorf("esperava %.2f, veio %.2f", c.espera, got)
			}
		})
	}
}

// Faz o papel do "go test".
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestFrete", TestFrete}}, nil, nil)
}
`,
      padroes: [
        [/casos\s*:=\s*\[\]struct\s*\{/, "Os casos são um slice de struct: casos := []struct{ ... }."],
        [/for\s+_\s*,\s*c\s*:=\s*range\s+casos/, "Percorra com for _, c := range casos."],
        [/t\.Run\s*\(\s*c\.nome\s*,\s*func\s*\(\s*t\s+\*testing\.T\s*\)/, "Crie o subteste com t.Run(c.nome, func(t *testing.T) { ... })."],
      ],
      saidaEsperada: "PASS",
    },
    {
      tipo: "completar",
      titulo: "Notificador falso no teste",
      enunciado: `<code>ConfirmarPedido</code> envia uma mensagem pelo <code>Notificador</code>. No teste, não queremos mandar e-mail de verdade:
        usamos um <b>notificador falso</b> que só anota quantas vezes foi chamado e qual foi a mensagem. Complete:
        <ul>
          <li>o método <code>Enviar</code> do falso (receptor ponteiro, para conseguir anotar);</li>
          <li>a contagem de chamadas com <code>f.chamadas++</code>;</li>
          <li>a chamada de <code>ConfirmarPedido</code> passando o <code>falso</code>.</li>
        </ul>
        Substitua cada <code>____</code>.`,
      dica: `Como <code>ConfirmarPedido</code> recebe a <b>interface</b>, qualquer tipo com o método <code>Enviar(para, msg string) error</code> serve, inclusive o falso.`,
      lang: "go",
      inicial: c`package main

import "testing"

type Notificador interface {
	Enviar(para, msg string) error
}

func ConfirmarPedido(n Notificador, cliente string) error {
	return n.Enviar(cliente, "Seu pedido foi confirmado")
}

type notificadorFalso struct {
	chamadas  int
	ultimaMsg string
}

func (f *notificadorFalso) ____(para, msg string) error {
	f.chamadas____
	f.ultimaMsg = msg
	return nil
}

func TestConfirmarPedido(t *testing.T) {
	falso := &notificadorFalso{}
	ConfirmarPedido(____, "ana@ex.com")

	if falso.chamadas != 1 {
		t.Errorf("esperava 1 envio, houve %d", falso.chamadas)
	}
	if falso.ultimaMsg != "Seu pedido foi confirmado" {
		t.Errorf("mensagem errada: %q", falso.ultimaMsg)
	}
}

// Faz o papel do "go test".
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestConfirmarPedido", TestConfirmarPedido}}, nil, nil)
}
`,
      solucao: c`package main

import "testing"

type Notificador interface {
	Enviar(para, msg string) error
}

func ConfirmarPedido(n Notificador, cliente string) error {
	return n.Enviar(cliente, "Seu pedido foi confirmado")
}

type notificadorFalso struct {
	chamadas  int
	ultimaMsg string
}

func (f *notificadorFalso) Enviar(para, msg string) error {
	f.chamadas++
	f.ultimaMsg = msg
	return nil
}

func TestConfirmarPedido(t *testing.T) {
	falso := &notificadorFalso{}
	ConfirmarPedido(falso, "ana@ex.com")

	if falso.chamadas != 1 {
		t.Errorf("esperava 1 envio, houve %d", falso.chamadas)
	}
	if falso.ultimaMsg != "Seu pedido foi confirmado" {
		t.Errorf("mensagem errada: %q", falso.ultimaMsg)
	}
}

// Faz o papel do "go test".
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestConfirmarPedido", TestConfirmarPedido}}, nil, nil)
}
`,
      padroes: [
        [/func\s*\(\s*f\s+\*notificadorFalso\s*\)\s*Enviar\s*\(\s*para\s*,\s*msg\s+string\s*\)\s*error/, "Implemente func (f *notificadorFalso) Enviar(para, msg string) error."],
        [/f\.chamadas\s*(\+\+|\+=\s*1)/, "Conte a chamada com f.chamadas++."],
        [/ConfirmarPedido\s*\(\s*falso\s*,/, "Passe o falso para ConfirmarPedido(falso, ...)."],
      ],
      saidaEsperada: "PASS",
    },
    {
      tipo: "criar",
      titulo: "Função e teste da média",
      enunciado: `A escola precisa da função <code>Media(notas []float64) float64</code>, que devolve a média das notas e
        <b>0 quando o slice estiver vazio</b> (sem dividir por zero!). Escreva:
        <ul>
          <li>a função <code>Media</code>;</li>
          <li>o teste de tabela <code>TestMedia(t *testing.T)</code> com pelo menos 3 casos: vazio (0), uma nota <code>{7}</code> (7) e
            <code>{6, 8, 10}</code> (8), usando <code>t.Run</code> e <code>t.Errorf</code>.</li>
        </ul>
        O <code>main</code> que roda o teste já está pronto.`,
      dica: `Comece a função com <code>if len(notas) == 0 { return 0 }</code>. Siga o modelo de casos <code>[]struct{ nome string; notas []float64; espera float64 }</code>.`,
      lang: "go",
      inicial: c`package main

import "testing"

// 1. func Media(notas []float64) float64   (0 para slice vazio)
// 2. func TestMedia(t *testing.T) com casos de tabela, t.Run e t.Errorf

// Faz o papel do "go test".
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestMedia", TestMedia}}, nil, nil)
}
`,
      solucao: c`package main

import "testing"

func Media(notas []float64) float64 {
	if len(notas) == 0 {
		return 0
	}
	soma := 0.0
	for _, n := range notas {
		soma += n
	}
	return soma / float64(len(notas))
}

func TestMedia(t *testing.T) {
	casos := []struct {
		nome   string
		notas  []float64
		espera float64
	}{
		{"vazio", []float64{}, 0},
		{"uma nota", []float64{7}, 7},
		{"várias notas", []float64{6, 8, 10}, 8},
	}
	for _, c := range casos {
		t.Run(c.nome, func(t *testing.T) {
			if got := Media(c.notas); got != c.espera {
				t.Errorf("esperava %.2f, veio %.2f", c.espera, got)
			}
		})
	}
}

// Faz o papel do "go test".
func main() {
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestMedia", TestMedia}}, nil, nil)
}
`,
      padroes: [
        [/func\s+Media\s*\(\s*\w+\s+\[\]float64\s*\)\s*float64/, "Crie func Media(notas []float64) float64."],
        [/len\s*\(\s*\w+\s*\)\s*==\s*0/, "Trate o slice vazio com if len(notas) == 0."],
        [/func\s+TestMedia\s*\(\s*t\s+\*testing\.T\s*\)/, "Crie func TestMedia(t *testing.T)."],
        [/t\.Run\s*\(/, "Use t.Run para cada caso da tabela."],
        [/t\.(Errorf|Fatalf)\s*\(/, "Avise as falhas com t.Errorf."],
      ],
      saidaEsperada: "PASS",
    },
    {
      tipo: "criar",
      titulo: "Teste e benchmark do CPF",
      enunciado: `O cadastro mostra o CPF formatado. Escreva:
        <ul>
          <li><code>FormatarCPF(cpf string) string</code>: <code>"12345678901"</code> vira <code>"123.456.789-01"</code>; se não tiver 11 caracteres, devolve o texto como veio;</li>
          <li><code>TestFormatarCPF(t *testing.T)</code>, testando pelo menos um CPF válido e um inválido;</li>
          <li><code>BenchmarkFormatarCPF(b *testing.B)</code>, chamando a função <code>b.N</code> vezes.</li>
        </ul>
        O <code>main</code> pronto roda o benchmark com <code>testing.Benchmark</code> e depois os testes. Saída exata:
        <pre>Benchmark rodou: true
PASS</pre>`,
      dica: `Fatie o texto: <code>cpf[0:3] + "." + cpf[3:6] + "." + cpf[6:9] + "-" + cpf[9:]</code>. No benchmark: <code>for i := 0; i &lt; b.N; i++ { ... }</code>.`,
      lang: "go",
      inicial: c`package main

import (
	"fmt"
	"testing"
)

// 1. func FormatarCPF(cpf string) string
// 2. func TestFormatarCPF(t *testing.T)
// 3. func BenchmarkFormatarCPF(b *testing.B)

// Roda o benchmark e depois os testes (papel do "go test -bench=.").
func main() {
	r := testing.Benchmark(BenchmarkFormatarCPF)
	fmt.Println("Benchmark rodou:", r.N > 0)
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestFormatarCPF", TestFormatarCPF}}, nil, nil)
}
`,
      solucao: c`package main

import (
	"fmt"
	"testing"
)

func FormatarCPF(cpf string) string {
	if len(cpf) != 11 {
		return cpf
	}
	return cpf[0:3] + "." + cpf[3:6] + "." + cpf[6:9] + "-" + cpf[9:]
}

func TestFormatarCPF(t *testing.T) {
	if got := FormatarCPF("12345678901"); got != "123.456.789-01" {
		t.Errorf("CPF válido: esperava 123.456.789-01, veio %s", got)
	}
	if got := FormatarCPF("123"); got != "123" {
		t.Errorf("CPF inválido: esperava 123, veio %s", got)
	}
}

func BenchmarkFormatarCPF(b *testing.B) {
	for i := 0; i < b.N; i++ {
		FormatarCPF("12345678901")
	}
}

// Roda o benchmark e depois os testes (papel do "go test -bench=.").
func main() {
	r := testing.Benchmark(BenchmarkFormatarCPF)
	fmt.Println("Benchmark rodou:", r.N > 0)
	testing.Main(func(pat, str string) (bool, error) { return true, nil },
		[]testing.InternalTest{{"TestFormatarCPF", TestFormatarCPF}}, nil, nil)
}
`,
      padroes: [
        [/func\s+FormatarCPF\s*\(\s*\w+\s+string\s*\)\s*string/, "Crie func FormatarCPF(cpf string) string."],
        [/func\s+TestFormatarCPF\s*\(\s*t\s+\*testing\.T\s*\)/, "Crie func TestFormatarCPF(t *testing.T)."],
        [/func\s+BenchmarkFormatarCPF\s*\(\s*b\s+\*testing\.B\s*\)/, "Crie func BenchmarkFormatarCPF(b *testing.B)."],
        [/b\.N\b|b\.Loop\s*\(\s*\)/, "No benchmark, repita a chamada b.N vezes (for i := 0; i < b.N; i++)."],
      ],
      saidaEsperada: "Benchmark rodou: true\nPASS",
    },
  ],
  /* ===================== p1 (Iniciante): O que é Go e como rodar ===================== */
  p1: [
    {
      tipo: "completar",
      titulo: "Boas-vindas da padaria",
      enunciado: `A Padaria Pão Quente quer um programa que mostre uma mensagem de boas-vindas.
        Clique em cada retângulo e escreva o que falta: o nome do pacote de todo programa que roda e a ferramenta do <code>fmt</code> que mostra uma linha na tela.
        Depois, copie o código, cole no Go Playground (go.dev/play) e clique em <b>Run</b>.`,
      dica: `Todo programa começa com <code>package main</code>. A ferramenta de mostrar linha tem P maiúsculo.`,
      lang: "go",
      inicial: c`package ____

import "fmt"

func main() {
	fmt.____("Bem-vindo à Padaria Pão Quente!")
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Bem-vindo à Padaria Pão Quente!")
}
`,
      padroes: [
        [/package\s+main\b/, "A primeira linha deve ser package main."],
        [/fmt\.Println\(\s*"Bem-vindo à Padaria Pão Quente!"\s*\)/, 'Use fmt.Println("Bem-vindo à Padaria Pão Quente!").'],
      ],
      saidaEsperada: "Bem-vindo à Padaria Pão Quente!",
    },
    {
      tipo: "completar",
      titulo: "Ponto de partida",
      enunciado: `Este programa avisa que a loja abriu, mas faltam duas peças do “cabeçalho”.
        Clique em cada retângulo e escreva o que falta: o nome da caixa de ferramentas importada (entre aspas) e o nome da função onde o programa começa.`,
      dica: `A caixa de ferramentas de textos é <code>"fmt"</code>, com aspas. A função de partida se chama <code>main</code>.`,
      lang: "go",
      inicial: c`package main

import ____

func ____() {
	fmt.Println("Loja aberta!")
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Loja aberta!")
}
`,
      padroes: [
        [/import\s+"fmt"/, 'Importe a caixa de ferramentas com import "fmt" (com aspas).'],
        [/func\s+main\s*\(\s*\)\s*\{/, "A função de partida é func main() {."],
      ],
      saidaEsperada: "Loja aberta!",
    },
    {
      tipo: "completar",
      titulo: "Cardápio do dia",
      enunciado: `O café da esquina quer mostrar o cardápio, um item por linha, nesta ordem:
        <pre>Cardápio do dia
Pão francês
Café com leite</pre>
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Texto vai entre aspas duplas dentro dos parênteses. Cada linha usa <code>fmt.Println</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	fmt.Println("Cardápio do dia")
	fmt.Println(____)
	fmt.____("Café com leite")
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Cardápio do dia")
	fmt.Println("Pão francês")
	fmt.Println("Café com leite")
}
`,
      padroes: [
        [/fmt\.Println\(\s*"Pão francês"\s*\)/, 'Mostre "Pão francês" com fmt.Println.'],
        [/fmt\.Println\(\s*"Café com leite"\s*\)/, 'Mostre "Café com leite" com fmt.Println.'],
      ],
      saidaEsperada: "Cardápio do dia\nPão francês\nCafé com leite",
    },
    {
      tipo: "criar",
      titulo: "Seu primeiro programa",
      enunciado: `Escreva do zero um programa completo em Go (as 3 partes: <code>package main</code>, <code>import "fmt"</code> e <code>func main()</code>)
        que mostre na tela exatamente:
        <pre>Olá, Go!</pre>
        Depois, rode no Go Playground: copie, cole em go.dev/play e clique em <b>Run</b>.`,
      dica: `Copie o “cabeçalho” do exemplo do tópico e coloque um <code>fmt.Println</code> dentro das chaves da <code>main</code>.`,
      lang: "go",
      inicial: c`// Escreva aqui o programa completo:
// 1. a linha do pacote principal
// 2. a linha que importa a caixa de ferramentas de textos
// 3. a função principal, mostrando a frase Olá, Go!
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Olá, Go!")
}
`,
      padroes: [
        [/package\s+main\b/, "Comece com package main."],
        [/import\s+"fmt"/, 'Importe com import "fmt".'],
        [/func\s+main\s*\(\s*\)\s*\{/, "Crie a função func main() {."],
        [/fmt\.Println\(\s*"Olá, Go!"\s*\)/, 'Mostre a frase com fmt.Println("Olá, Go!").'],
      ],
      saidaEsperada: "Olá, Go!",
    },
    {
      tipo: "criar",
      titulo: "Lista de compras",
      enunciado: `Faça um programa que mostre a lista de compras do mercado, uma linha por vez, exatamente assim:
        <pre>Lista de compras:
- Arroz
- Feijão
- Ovos</pre>`,
      dica: `Use um <code>fmt.Println</code> para cada linha, dentro da <code>func main</code>, na ordem certa.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// Mostre o título e os 3 itens, um por linha
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Lista de compras:")
	fmt.Println("- Arroz")
	fmt.Println("- Feijão")
	fmt.Println("- Ovos")
}
`,
      padroes: [
        [/fmt\.Println\(\s*"Lista de compras:"\s*\)/, 'Mostre o título "Lista de compras:".'],
        [/fmt\.Println\(\s*"- Arroz"\s*\)/, 'Mostre "- Arroz".'],
        [/fmt\.Println\(\s*"- Feijão"\s*\)/, 'Mostre "- Feijão".'],
        [/fmt\.Println\(\s*"- Ovos"\s*\)/, 'Mostre "- Ovos".'],
      ],
      saidaEsperada: "Lista de compras:\n- Arroz\n- Feijão\n- Ovos",
    },
  ],

  /* ===================== p2 (Iniciante): Contas e textos ===================== */
  p2: [
    {
      tipo: "completar",
      titulo: "Pães e troco",
      enunciado: `Um cliente comprou 3 pães de R$ 0.75 e pagou com R$ 10. Complete as contas:
        o total é 3 <b>vezes</b> 0.75 e o troco é 10 <b>menos</b> o total (2.25).
        Clique em cada retângulo e escreva o sinal que falta.`,
      dica: `Vezes é <code>*</code> e menos é <code>-</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	fmt.Println("Total:", 3 ____ 0.75)
	fmt.Println("Troco:", 10 ____ 2.25)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Total:", 3 * 0.75)
	fmt.Println("Troco:", 10 - 2.25)
}
`,
      padroes: [
        [/3\s*\*\s*0\.75/, "O total é 3 * 0.75."],
        [/10\s*-\s*2\.25/, "O troco é 10 - 2.25."],
      ],
      saidaEsperada: "Total: 2.25\nTroco: 7.75",
    },
    {
      tipo: "completar",
      titulo: "Dividindo a pizza",
      enunciado: `Quatro amigos vão dividir a conta da pizzaria, de R$ 120.0. Complete a conta com o sinal de <b>dividir</b>.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Dividir é <code>/</code>. Como 120.0 tem parte decimal, o resultado também é decimal.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	fmt.Println("Conta da pizzaria:", 120.0)
	fmt.Println("Cada um paga:", 120.0 ____ 4)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Conta da pizzaria:", 120.0)
	fmt.Println("Cada um paga:", 120.0 / 4)
}
`,
      padroes: [
        [/120\.0\s*\/\s*4/, "Divida 120.0 por 4 com o sinal /."],
      ],
      saidaEsperada: "Conta da pizzaria: 120\nCada um paga: 30",
    },
    {
      tipo: "completar",
      titulo: "Juntando nomes de produtos",
      enunciado: `A vitrine da lanchonete monta os nomes juntando textos com <code>+</code>. O resultado deve ser:
        <pre>Pão de queijo
Café com leite</pre>
        Clique em cada retângulo e escreva o que falta. Lembre do espaço dentro das aspas!`,
      dica: `O primeiro retângulo é um texto entre aspas que começa com espaço. O segundo é o sinal que junta textos.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	fmt.Println("Pão" + ____)
	fmt.Println("Café" ____ " com leite")
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Pão" + " de queijo")
	fmt.Println("Café" + " com leite")
}
`,
      padroes: [
        [/"Pão"\s*\+\s*" de queijo"/, 'Junte "Pão" + " de queijo" (com o espaço antes de "de").'],
        [/"Café"\s*\+\s*" com leite"/, 'Junte "Café" + " com leite" usando +.'],
      ],
      saidaEsperada: "Pão de queijo\nCafé com leite",
    },
    {
      tipo: "criar",
      titulo: "Preço de 4 cafés",
      enunciado: `Cada café custa R$ 3.50. Escreva um programa que <b>faça a conta</b> 4 vezes 3.50 dentro do <code>fmt.Println</code>
        e mostre o texto e o resultado separados por vírgula, assim:
        <pre>4 cafés: 14</pre>`,
      dica: `<code>fmt.Println("texto:", conta)</code> coloca um espaço entre as partes. Não escreva o 14 direto: deixe o Go calcular.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// Mostre o texto "4 cafés:" e o resultado da conta 4 vezes 3.50
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("4 cafés:", 4 * 3.50)
}
`,
      padroes: [
        [/fmt\.Println\(\s*"4 cafés:"\s*,/, 'Use fmt.Println("4 cafés:", ...) com vírgula.'],
        [/4\s*\*\s*3\.50?|3\.50?\s*\*\s*4/, "Deixe o Go calcular: 4 * 3.50."],
      ],
      saidaEsperada: "4 cafés: 14",
    },
    {
      tipo: "criar",
      titulo: "Placa da loja",
      enunciado: `Faça a placa da loja em duas linhas:
        <ul>
          <li>a 1ª juntando os textos <code>"Loja"</code> e <code>" da Esquina"</code> com <code>+</code>;</li>
          <li>a 2ª usando vírgulas no <code>fmt.Println</code> para misturar texto e os números 8 e 18.</li>
        </ul>
        A saída deve ser exatamente:
        <pre>Loja da Esquina
Aberta das 8 às 18</pre>`,
      dica: `Na 2ª linha: <code>fmt.Println("Aberta das", 8, "às", 18)</code>. Número fica sem aspas.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// Linha 1: junte os dois textos com o sinal de mais
	// Linha 2: misture textos e números separando por vírgula
}
`,
      solucao: c`package main

import "fmt"

func main() {
	fmt.Println("Loja" + " da Esquina")
	fmt.Println("Aberta das", 8, "às", 18)
}
`,
      padroes: [
        [/"Loja"\s*\+\s*" da Esquina"/, 'Junte "Loja" + " da Esquina" com +.'],
        [/fmt\.Println\(\s*"Aberta das"\s*,\s*8\s*,\s*"às"\s*,\s*18\s*\)/, 'Use fmt.Println("Aberta das", 8, "às", 18), com os números sem aspas.'],
      ],
      saidaEsperada: "Loja da Esquina\nAberta das 8 às 18",
    },
  ],

  /* ===================== p3 (Iniciante): Variáveis com := e var ===================== */
  p3: [
    {
      tipo: "completar",
      titulo: "Ficha do cliente",
      enunciado: `A loja guarda os dados do cliente em variáveis. Crie <code>nome</code> com a forma curta e <code>idade</code> com <code>var</code> e o tipo de número inteiro.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `A forma curta usa <code>:=</code>. Número inteiro é <code>int</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	nome ____ "Carla"
	var idade ____ = 29

	fmt.Println("Cliente:", nome)
	fmt.Println("Idade:", idade)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	nome := "Carla"
	var idade int = 29

	fmt.Println("Cliente:", nome)
	fmt.Println("Idade:", idade)
}
`,
      padroes: [
        [/nome\s*:=\s*"Carla"/, 'Crie nome com := "Carla".'],
        [/var\s+idade\s+int\s*=\s*29\b/, "Declare var idade int = 29."],
      ],
      saidaEsperada: "Cliente: Carla\nIdade: 29",
    },
    {
      tipo: "completar",
      titulo: "Tipos da padaria",
      enunciado: `Escolha o tipo certo de cada caixinha: <code>preco</code> guarda um número com parte decimal e <code>aberta</code> guarda verdadeiro ou falso.
        Clique em cada retângulo e escreva o tipo que falta.`,
      dica: `Decimal é <code>float64</code>; verdadeiro/falso é <code>bool</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	var preco ____ = 6.50
	var aberta ____ = true

	fmt.Println("Preço do bolo:", preco)
	fmt.Println("Aberta?", aberta)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	var preco float64 = 6.50
	var aberta bool = true

	fmt.Println("Preço do bolo:", preco)
	fmt.Println("Aberta?", aberta)
}
`,
      padroes: [
        [/var\s+preco\s+float64\s*=\s*6\.50?/, "preco é decimal: var preco float64 = 6.50."],
        [/var\s+aberta\s+bool\s*=\s*true/, "aberta é verdadeiro/falso: var aberta bool = true."],
      ],
      saidaEsperada: "Preço do bolo: 6.5\nAberta? true",
    },
    {
      tipo: "completar",
      titulo: "Atualizando o estoque",
      enunciado: `O estoque começou com 20 pães e foram vendidos 6. Troque o valor da variável <code>estoque</code> para 14.
        Como a variável <b>já existe</b>, use o sinal certo para trocar o valor.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `<code>:=</code> é só para criar. Para trocar o valor de uma caixinha que já existe, use só <code>=</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	estoque := 20
	fmt.Println("Antes:", estoque)

	estoque ____ 14
	fmt.Println("Depois:", estoque)
}
`,
      solucao: c`package main

import "fmt"

func main() {
	estoque := 20
	fmt.Println("Antes:", estoque)

	estoque = 14
	fmt.Println("Depois:", estoque)
}
`,
      padroes: [
        [/estoque\s*=\s*14\b/, "Troque o valor com estoque = 14 (só =, sem os dois-pontos)."],
      ],
      saidaEsperada: "Antes: 20\nDepois: 14",
    },
    {
      tipo: "criar",
      titulo: "Pedido em variáveis",
      enunciado: `Guarde o pedido em variáveis criadas com <code>:=</code>:
        <ul>
          <li><code>produto</code> com o texto <code>"Coxinha"</code>;</li>
          <li><code>preco</code> com o valor <code>5.50</code>.</li>
        </ul>
        Depois mostre o produto e o total de 4 coxinhas (use a variável <code>preco</code> na conta), exatamente assim:
        <pre>Produto: Coxinha
Total de 4: 22</pre>`,
      dica: `A conta é <code>preco * 4</code>. Use vírgula no <code>fmt.Println</code> para juntar texto e valor.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// 1. Crie a variável produto com o texto Coxinha
	// 2. Crie a variável preco com o valor 5.50
	// 3. Mostre o produto e o total de 4 unidades
}
`,
      solucao: c`package main

import "fmt"

func main() {
	produto := "Coxinha"
	preco := 5.50

	fmt.Println("Produto:", produto)
	fmt.Println("Total de 4:", preco * 4)
}
`,
      padroes: [
        [/produto\s*:=\s*"Coxinha"/, 'Crie produto := "Coxinha".'],
        [/preco\s*:=\s*5\.50?\b/, "Crie preco := 5.50."],
        [/preco\s*\*\s*4|4\s*\*\s*preco/, "Calcule o total usando a variável: preco * 4."],
        [/fmt\.Println\(\s*"Produto:"\s*,\s*produto\s*\)/, 'Mostre o produto com fmt.Println("Produto:", produto).'],
      ],
      saidaEsperada: "Produto: Coxinha\nTotal de 4: 22",
    },
    {
      tipo: "criar",
      titulo: "Previsão do tempo com var",
      enunciado: `Crie três variáveis usando <code>var</code> e escrevendo o tipo de cada uma:
        <ul>
          <li><code>cidade</code>, do tipo texto, com <code>"Recife"</code>;</li>
          <li><code>temperatura</code>, do tipo decimal, com <code>31.5</code>;</li>
          <li><code>chovendo</code>, do tipo verdadeiro/falso, com <code>false</code>.</li>
        </ul>
        Depois mostre exatamente:
        <pre>Cidade: Recife
Temperatura: 31.5
Chovendo? false</pre>`,
      dica: `O formato é <code>var nome tipo = valor</code>. Os tipos são <code>string</code>, <code>float64</code> e <code>bool</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// Crie cidade, temperatura e chovendo com a palavra var e o tipo de cada uma
	// Depois mostre as três linhas
}
`,
      solucao: c`package main

import "fmt"

func main() {
	var cidade string = "Recife"
	var temperatura float64 = 31.5
	var chovendo bool = false

	fmt.Println("Cidade:", cidade)
	fmt.Println("Temperatura:", temperatura)
	fmt.Println("Chovendo?", chovendo)
}
`,
      padroes: [
        [/var\s+cidade\s+string\s*=\s*"Recife"/, 'Declare var cidade string = "Recife".'],
        [/var\s+temperatura\s+float64\s*=\s*31\.5\b/, "Declare var temperatura float64 = 31.5."],
        [/var\s+chovendo\s+bool\s*=\s*false/, "Declare var chovendo bool = false."],
        [/fmt\.Println\(\s*"Chovendo\?"\s*,\s*chovendo\s*\)/, 'Mostre fmt.Println("Chovendo?", chovendo).'],
      ],
      saidaEsperada: "Cidade: Recife\nTemperatura: 31.5\nChovendo? false",
    },
  ],

  /* ===================== p4 (Iniciante): Decidindo com if ===================== */
  p4: [
    {
      tipo: "completar",
      titulo: "Frete grátis",
      enunciado: `A loja online dá frete grátis para compras de R$ 100 <b>ou mais</b>. Senão, o frete é R$ 15.
        Clique em cada retângulo e escreva o que falta: o sinal de “maior ou igual” e a palavra do caminho B.`,
      dica: `“Maior ou igual” é <code>&gt;=</code>. O “senão” em Go é <code>else</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	total := 150.0

	if total ____ 100 {
		fmt.Println("Frete grátis!")
	} ____ {
		fmt.Println("Frete: R$ 15")
	}
}
`,
      solucao: c`package main

import "fmt"

func main() {
	total := 150.0

	if total >= 100 {
		fmt.Println("Frete grátis!")
	} else {
		fmt.Println("Frete: R$ 15")
	}
}
`,
      padroes: [
        [/if\s+total\s*>=\s*100\s*\{/, "Compare com if total >= 100 {."],
        [/\}\s*else\s*\{/, "Use } else { para o caminho B."],
      ],
      saidaEsperada: "Frete grátis!",
    },
    {
      tipo: "completar",
      titulo: "Conferindo a senha",
      enunciado: `O sistema só libera quem digitar a senha <code>"abc123"</code>. Complete a comparação de igualdade.
        Clique em cada retângulo e escreva o que falta.`,
      dica: `Para <b>comparar</b> se é igual, são dois sinais: <code>==</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	senha := "abc123"

	if senha ____ "abc123" {
		fmt.Println("Acesso liberado")
	} else {
		fmt.Println("Senha incorreta")
	}
}
`,
      solucao: c`package main

import "fmt"

func main() {
	senha := "abc123"

	if senha == "abc123" {
		fmt.Println("Acesso liberado")
	} else {
		fmt.Println("Senha incorreta")
	}
}
`,
      padroes: [
        [/if\s+senha\s*==\s*"abc123"\s*\{/, 'Compare com if senha == "abc123" {.'],
      ],
      saidaEsperada: "Acesso liberado",
    },
    {
      tipo: "completar",
      titulo: "Produto esgotado",
      enunciado: `Quando o estoque é <b>igual a</b> zero, a loja mostra “Produto esgotado”. Senão, mostra “Temos em estoque”.
        Clique em cada retângulo e escreva o que falta: a palavra que começa a decisão e o sinal de comparação.`,
      dica: `A decisão começa com <code>if</code>. “Igual a” é <code>==</code>.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	estoque := 0

	____ estoque ____ 0 {
		fmt.Println("Produto esgotado")
	} else {
		fmt.Println("Temos em estoque")
	}
}
`,
      solucao: c`package main

import "fmt"

func main() {
	estoque := 0

	if estoque == 0 {
		fmt.Println("Produto esgotado")
	} else {
		fmt.Println("Temos em estoque")
	}
}
`,
      padroes: [
        [/if\s+estoque\s*==\s*0\s*\{/, "Escreva if estoque == 0 {."],
      ],
      saidaEsperada: "Produto esgotado",
    },
    {
      tipo: "criar",
      titulo: "Entrada no show",
      enunciado: `No show, quem tem 18 anos ou mais pode entrar sozinho. Crie a variável <code>idade</code> com o valor <code>17</code> (use <code>:=</code>) e faça um <code>if</code>/<code>else</code>:
        <ul>
          <li>se <code>idade</code> for maior ou igual a 18, mostre <code>Pode entrar</code>;</li>
          <li>senão, mostre <code>Entrada só com responsável</code>.</li>
        </ul>
        Com 17, a saída deve ser:
        <pre>Entrada só com responsável</pre>`,
      dica: `Formato: <code>if idade &gt;= 18 { ... } else { ... }</code>. A chave <code>{</code> fica na mesma linha do if.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// 1. Crie a variável idade com o valor 17
	// 2. Se for 18 ou mais: Pode entrar
	// 3. Senão: Entrada só com responsável
}
`,
      solucao: c`package main

import "fmt"

func main() {
	idade := 17

	if idade >= 18 {
		fmt.Println("Pode entrar")
	} else {
		fmt.Println("Entrada só com responsável")
	}
}
`,
      padroes: [
        [/idade\s*:=\s*17\b/, "Crie idade := 17."],
        [/if\s+idade\s*>=\s*18\s*\{/, "Compare com if idade >= 18 {."],
        [/\}\s*else\s*\{/, "Use } else { para o outro caminho."],
        [/fmt\.Println\(\s*"Entrada só com responsável"\s*\)/, 'Mostre "Entrada só com responsável" no else.'],
      ],
      saidaEsperada: "Entrada só com responsável",
    },
    {
      tipo: "criar",
      titulo: "Nota do aluno",
      enunciado: `A escola aprova quem tira nota 6 ou mais. Crie <code>nota</code> com <code>7.5</code> e faça um <code>if</code>/<code>else</code>:
        <ul>
          <li>se a nota for maior ou igual a 6, mostre <code>Aprovado com nota</code> seguido da nota (use vírgula no <code>fmt.Println</code>);</li>
          <li>senão, mostre <code>Recuperação</code>.</li>
        </ul>
        Com 7.5, a saída deve ser:
        <pre>Aprovado com nota 7.5</pre>`,
      dica: `<code>fmt.Println("Aprovado com nota", nota)</code> coloca o espaço sozinho.`,
      lang: "go",
      inicial: c`package main

import "fmt"

func main() {
	// 1. Crie a variável nota com o valor 7.5
	// 2. Se for 6 ou mais: Aprovado com nota (e a nota)
	// 3. Senão: Recuperação
}
`,
      solucao: c`package main

import "fmt"

func main() {
	nota := 7.5

	if nota >= 6 {
		fmt.Println("Aprovado com nota", nota)
	} else {
		fmt.Println("Recuperação")
	}
}
`,
      padroes: [
        [/nota\s*:=\s*7\.5\b/, "Crie nota := 7.5."],
        [/if\s+nota\s*>=\s*6(\.0)?\s*\{/, "Compare com if nota >= 6 {."],
        [/fmt\.Println\(\s*"Aprovado com nota"\s*,\s*nota\s*\)/, 'Mostre fmt.Println("Aprovado com nota", nota).'],
        [/\}\s*else\s*\{[\s\S]*"Recuperação"/, 'No else, mostre "Recuperação".'],
      ],
      saidaEsperada: "Aprovado com nota 7.5",
    },
  ],
};
