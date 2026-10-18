const c = String.raw;

export default {
  id: "go",
  nome: "Go (Golang)",
  icone: "🐹",
  cor: "#00add8",
  dificuldade: 3,
  resumo: "Linguagem do Google, simples e muito rápida. Feita para servidores, nuvem e programas que fazem muitas coisas ao mesmo tempo.",
  mercado: "Em alta em fintechs, bancos digitais e empresas de nuvem (Docker e Kubernetes são feitos em Go). Tem menos concorrência e salários altos.",
  docs: [
    { nome: "Tour of Go (pt-BR)", url: "https://go.dev/tour/list?lang=pt-BR", desc: "tutorial interativo oficial" },
    { nome: "Go by Example", url: "https://gobyexample.com/", desc: "exemplo pronto para cada assunto" },
    { nome: "Documentação dos pacotes", url: "https://pkg.go.dev/" },
    { nome: "Go Playground", url: "https://go.dev/play/", desc: "rode Go no navegador" }
  ],
  niveis: {
    basico: {
      objetivo: "escrever programas em Go com funções, coleções e structs.",
      topicos: [
        {
          titulo: "Primeiro programa, variáveis e funções",
          crianca: `Go é um <b>professor bem organizado</b>: quer tudo arrumadinho. Cada caixa tem um tipo fixo (número é número, texto é texto) e, se você criar uma variável e não usar, ele reclama! Isso evita bagunça.`,
          codigo: c`
package main

import "fmt"

func soma(a int, b int) int {
	return a + b
}

// Go pode devolver mais de um valor
func dividir(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("divisão por zero")
	}
	return a / b, nil
}

func main() {
	nome := "Lia"          // := cria e deduz o tipo
	var idade int = 28
	fmt.Printf("%s tem %d anos\n", nome, idade)
	fmt.Println(soma(2, 3))

	r, err := dividir(10, 0)
	if err != nil {
		fmt.Println("Erro:", err)
		return
	}
	fmt.Println(r)
}`,
          nota: "Instale em go.dev e rode com <code>go run main.go</code>. O comando <code>gofmt</code> formata o código sozinho.",
          trabalho: `Ferramentas de linha de comando (CLIs) que o time de infraestrutura usa: um único executável, sem precisar instalar nada na máquina. Por isso Go é tão usado em DevOps.`,
          entrevista: {
            pergunta: "Qual a diferença entre := e var em Go?",
            resposta: `<code>:=</code> declara e atribui deduzindo o tipo, e só pode ser usado <b>dentro de funções</b>. <code>var</code> pode ser usado em qualquer lugar, permite declarar sem valor (fica com o “zero value”: 0, "", false, nil) e explicitar o tipo.`
          },
          busca: ["go tour pt-br", "go := vs var", "go multiple return values"]
        },
        {
          titulo: "Slices e maps",
          crianca: `O <b>slice</b> é uma fila de cadeiras que <b>aumenta</b> quando chega mais gente. O <b>map</b> é um armário com gavetas etiquetadas: você abre a gaveta “SP” e encontra o que guardou lá.`,
          codigo: c`
package main

import "fmt"

func main() {
	precos := []float64{10.5, 20, 7.25}
	precos = append(precos, 99.9)
	fmt.Println(len(precos), precos[1:3]) // fatia do índice 1 ao 2

	total := 0.0
	for _, p := range precos {
		total += p
	}
	fmt.Printf("Total: %.2f\n", total)

	estoque := map[string]int{"caneta": 50, "lapis": 20}
	estoque["borracha"] = 10

	if qtd, ok := estoque["caderno"]; !ok {
		fmt.Println("caderno não existe", qtd)
	}

	for item, qtd := range estoque {
		fmt.Println(item, qtd)
	}
}`,
          trabalho: `Agrupar transações por cliente (<code>map[string][]Transacao</code>), contar requisições por IP e montar listas de resultados de consultas. O padrão <code>valor, ok := mapa[chave]</code> aparece em todo código Go.`,
          entrevista: {
            pergunta: "Qual a diferença entre array e slice em Go?",
            resposta: `O array tem tamanho <b>fixo</b>, que faz parte do tipo (<code>[3]int</code>). O slice é uma “janela” sobre um array, com ponteiro, tamanho (<code>len</code>) e capacidade (<code>cap</code>), e cresce com <code>append</code>. Na prática, quase sempre se usa slice.`
          },
          busca: ["go slices append cap", "go maps comma ok", "go by example range"]
        },
        {
          titulo: "Structs e métodos",
          crianca: `Struct é uma <b>ficha</b> com campos fixos, como a ficha de um jogador: nome, número e posição. Métodos são as <b>ações</b> que aquela ficha sabe fazer, como “marcar gol”.`,
          codigo: c`
package main

import "fmt"

type Conta struct {
	Titular string
	Saldo   float64
}

// Receptor por ponteiro (*Conta): altera a conta original
func (c *Conta) Depositar(v float64) {
	c.Saldo += v
}

// Receptor por valor: só lê
func (c Conta) Resumo() string {
	return fmt.Sprintf("%s: R$ %.2f", c.Titular, c.Saldo)
}

func main() {
	c := Conta{Titular: "Rui", Saldo: 100}
	c.Depositar(50)
	fmt.Println(c.Resumo()) // Rui: R$ 150.00
}`,
          trabalho: `Modelar <code>Pedido</code>, <code>Pagamento</code> e <code>Usuario</code> que vão virar JSON na API. Go não tem classes: structs + métodos + interfaces fazem esse papel. Campos com letra <b>maiúscula</b> são públicos (exportados).`,
          entrevista: {
            pergunta: "Quando usar receptor por ponteiro em vez de por valor?",
            resposta: `Use ponteiro quando o método precisa <b>alterar</b> a struct ou quando ela é grande (evita a cópia). Use valor para structs pequenas e imutáveis. Por consistência, se um método usa ponteiro, normalmente todos usam.`
          },
          busca: ["go struct methods", "pointer vs value receiver", "go exported names maiúscula"]
        }
      ]
    },
    intermediario: {
      objetivo: "tratar erros do jeito Go, usar interfaces e criar uma API HTTP só com a biblioteca padrão.",
      topicos: [
        {
          titulo: "Tratamento de erros",
          crianca: `Em Go, toda vez que você pede algo, recebe <b>dois pacotes</b>: o presente e um bilhete dizendo se deu problema. Você <b>sempre</b> lê o bilhete antes de abrir o presente.`,
          codigo: c`
package main

import (
	"errors"
	"fmt"
	"os"
)

var ErrSaldoInsuficiente = errors.New("saldo insuficiente")

func sacar(saldo, valor float64) (float64, error) {
	if valor > saldo {
		return saldo, ErrSaldoInsuficiente
	}
	return saldo - valor, nil
}

func main() {
	_, err := sacar(100, 500)
	if errors.Is(err, ErrSaldoInsuficiente) {
		fmt.Println("Mostrar mensagem amigável ao cliente")
	}

	_, err = os.ReadFile("config.json")
	if err != nil {
		// %w "embrulha" o erro mantendo a causa original
		fmt.Println(fmt.Errorf("carregando configuração: %w", err))
	}
}`,
          trabalho: `Em sistemas de pagamento, cada erro precisa virar a resposta certa: saldo insuficiente → 422; banco fora → 503. Erros sentinela (<code>ErrSaldoInsuficiente</code>) com <code>errors.Is</code> permitem essa decisão.`,
          entrevista: {
            pergunta: "Go não tem exceções (try/catch). Como os erros são tratados?",
            resposta: `Erros são <b>valores</b> retornados como último resultado (<code>error</code>), e quem chama verifica <code>if err != nil</code>. Usa-se <code>fmt.Errorf("...: %w", err)</code> para adicionar contexto e <code>errors.Is/As</code> para inspecionar. <code>panic</code> é só para situações realmente irrecuperáveis.`
          },
          busca: ["go error handling best practices", "errors.Is errors.As", "fmt.Errorf %w wrap"]
        },
        {
          titulo: "Interfaces",
          crianca: `Uma interface é uma <b>tomada</b>. Não importa se é um ventilador, uma TV ou um carregador: se tem o plugue certo, encaixa. Em Go, se o tipo tem os métodos pedidos, ele “encaixa” automaticamente.`,
          codigo: c`
package main

import "fmt"

type Notificador interface {
	Enviar(msg string) error
}

type Email struct{ Endereco string }
type SMS struct{ Numero string }

func (e Email) Enviar(msg string) error {
	fmt.Println("E-mail para", e.Endereco, ":", msg)
	return nil
}

func (s SMS) Enviar(msg string) error {
	fmt.Println("SMS para", s.Numero, ":", msg)
	return nil
}

func avisarTodos(ns []Notificador, msg string) {
	for _, n := range ns {
		n.Enviar(msg)
	}
}

func main() {
	avisarTodos([]Notificador{Email{"a@b.com"}, SMS{"1199999"}}, "Pedido enviado!")
}`,
          trabalho: `Trocar o provedor de SMS ou de e-mail sem mudar o resto do sistema. Em testes, você cria um <b>notificador falso</b> (mock) que implementa a mesma interface e não envia nada de verdade.`,
          entrevista: {
            pergunta: "O que significa “interfaces implícitas” em Go?",
            resposta: `Um tipo implementa uma interface só por ter os métodos com a assinatura certa, <b>sem declarar</b> “implements”. Isso desacopla os pacotes. A boa prática é “aceite interfaces, retorne structs” e manter as interfaces pequenas (como <code>io.Reader</code>).`
          },
          busca: ["go interfaces implicit", "accept interfaces return structs", "go io.Reader"]
        },
        {
          titulo: "API HTTP com net/http",
          crianca: `Go já vem com uma <b>caixa de ferramentas completa</b> para montar um servidor web. Não precisa comprar (instalar) nada: é abrir e usar.`,
          codigo: c`
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Produto struct {
	ID    int
	Nome  string
	Preco float64
}

var produtos = []Produto{{1, "Teclado", 199.9}}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /produtos", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(produtos)
	})

	mux.HandleFunc("POST /produtos", func(w http.ResponseWriter, r *http.Request) {
		var p Produto
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "JSON inválido", http.StatusBadRequest)
			return
		}
		p.ID = len(produtos) + 1
		produtos = append(produtos, p)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(p)
	})

	log.Println("Ouvindo em :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}`,
          nota: "Os padrões <code>\"GET /produtos\"</code> no HandleFunc existem a partir do Go 1.22. Para nomes JSON em minúsculo, use <i>struct tags</i> (pesquise “go struct tags json”).",
          trabalho: `Microsserviços de alta performance: consulta de saldo, cálculo de frete e autorização de pagamentos. Muitas empresas usam frameworks como <b>Gin</b> ou <b>Echo</b>, mas eles são construídos sobre este pacote.`,
          entrevista: {
            pergunta: "Por que Go é muito usado em microsserviços?",
            resposta: `Gera um binário único e pequeno (ótimo para Docker), inicia rápido, usa pouca memória, tem concorrência nativa e leve (goroutines) e uma biblioteca padrão forte para HTTP e JSON. A linguagem simples também facilita a manutenção por times grandes.`
          },
          busca: ["go net/http servemux 1.22", "go json encode decode", "gin vs echo go"]
        }
      ]
    },
    avancado: {
      objetivo: "processar tarefas em paralelo com segurança, controlar tempo limite e testar o código.",
      topicos: [
        {
          titulo: "Goroutines e channels",
          crianca: `Goroutines são <b>ajudantes</b> que trabalham ao mesmo tempo que você. Channels são <b>tubos</b> por onde os ajudantes mandam os resultados. Assim ninguém briga pelo mesmo brinquedo.`,
          codigo: c`
package main

import (
	"fmt"
	"sync"
	"time"
)

func consultar(id int) string {
	time.Sleep(500 * time.Millisecond) // simula chamada lenta
	return fmt.Sprintf("cliente %d ok", id)
}

func main() {
	ids := []int{1, 2, 3, 4, 5}
	resultados := make(chan string, len(ids))
	var wg sync.WaitGroup

	for _, id := range ids {
		wg.Add(1)
		go func(id int) {          // nova goroutine
			defer wg.Done()
			resultados <- consultar(id)
		}(id)
	}

	wg.Wait()
	close(resultados)
	for r := range resultados {
		fmt.Println(r)
	}
	// 5 consultas em ~0,5s em vez de 2,5s
}`,
          trabalho: `Consultar 1.000 CPFs em uma API externa: em sequência leva horas; com goroutines (e um limite de concorrência, o “worker pool”), leva minutos. É o motivo nº 1 para empresas escolherem Go.`,
          entrevista: {
            pergunta: "Qual a diferença entre concorrência e paralelismo? E o que é race condition?",
            resposta: `<b>Concorrência</b> é estruturar o programa para lidar com várias tarefas ao mesmo tempo; <b>paralelismo</b> é executá-las literalmente ao mesmo tempo em vários núcleos. <b>Race condition</b> acontece quando duas goroutines acessam o mesmo dado sem sincronização. Evita-se com channels ou <code>sync.Mutex</code> e detecta-se com <code>go run -race</code>.`
          },
          busca: ["go goroutines channels", "go worker pool", "go race detector"]
        },
        {
          titulo: "Context: timeouts e cancelamento",
          crianca: `O <code>context</code> é o <b>apito do juiz</b>. Se o tempo acabar ou o jogo for cancelado, ele apita e todos os jogadores (goroutines) param na hora, em vez de continuar correndo à toa.`,
          codigo: c`
package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func buscar(ctx context.Context, url string) error {
	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	fmt.Println("status:", resp.Status)
	return nil
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	if err := buscar(ctx, "https://httpbin.org/delay/5"); err != nil {
		fmt.Println("desisti:", err) // context deadline exceeded
	}
}`,
          trabalho: `Se o serviço do banco parceiro travar, sua API não pode ficar presa para sempre: com timeout de 2s você responde um erro claro e libera recursos. Todo handler HTTP em Go recebe <code>r.Context()</code>, que é cancelado se o cliente desistir.`,
          entrevista: {
            pergunta: "Para que serve o context.Context?",
            resposta: `Para propagar <b>prazo (deadline), cancelamento</b> e valores da requisição (como um ID de rastreio) por toda a cadeia de chamadas. A convenção é recebê-lo como primeiro parâmetro (<code>ctx context.Context</code>) e sempre chamar <code>cancel()</code>.`
          },
          busca: ["go context withtimeout", "go context cancellation", "go http request context"]
        },
        {
          titulo: "Testes e benchmarks",
          crianca: `Testes são <b>provas</b> que você mesmo escreve para o seu código. Toda vez que mudar algo, roda as provas: se tirar 10, nada quebrou.`,
          codigo: c`
// arquivo: desconto.go
package loja

func Desconto(valor float64, vip bool) float64 {
	if vip {
		return valor * 0.9
	}
	return valor
}

// arquivo: desconto_test.go
package loja

import "testing"

func TestDesconto(t *testing.T) {
	casos := []struct {
		nome   string
		valor  float64
		vip    bool
		espera float64
	}{
		{"cliente comum", 100, false, 100},
		{"cliente vip", 100, true, 90},
	}
	for _, c := range casos {
		t.Run(c.nome, func(t *testing.T) {
			if got := Desconto(c.valor, c.vip); got != c.espera {
				t.Errorf("esperava %.2f, veio %.2f", c.espera, got)
			}
		})
	}
}

func BenchmarkDesconto(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Desconto(100, true)
	}
}
// go test ./... -v     |     go test -bench=. -cover`,
          trabalho: `Pipelines de CI (GitHub Actions) rodam <code>go test ./...</code> a cada pull request. Em fintechs, testes de regras de cálculo são obrigatórios antes de ir para produção.`,
          entrevista: {
            pergunta: "O que são table-driven tests?",
            resposta: `É o padrão Go de listar os casos de teste em uma <b>tabela</b> (slice de structs com entrada e saída esperada) e percorrer com <code>t.Run</code>. Fica fácil adicionar casos, e cada um aparece com seu nome no relatório.`
          },
          busca: ["go table driven tests", "go test cover", "go benchmark"]
        }
      ]
    }
  }
};
