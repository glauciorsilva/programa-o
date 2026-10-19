import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>Todo programa Go executável começa com <code>package main</code> e tem uma função <code>main()</code>, que é o ponto de partida. As bibliotecas são trazidas com <code>import</code>; a <code>fmt</code> (de <i>format</i>) cuida de imprimir e formatar textos. Go é <b>compilada</b>: o comando <code>go build</code> gera um único arquivo executável, que roda sem precisar instalar nada na máquina de destino.</p>
<p>Go tem <b>tipagem estática</b>: cada variável tem um tipo fixo (<code>int</code>, <code>float64</code>, <code>string</code>, <code>bool</code>...). Você pode declarar com <code>var nome tipo = valor</code> ou usar a forma curta <code>nome := valor</code>, em que o tipo é deduzido. Variáveis sem valor recebem o <b>valor zero</b> do tipo (0, "", false). O compilador recusa variáveis e imports não usados, o que mantém o código limpo.</p>
<p>Funções declaram o tipo de cada parâmetro e do retorno. Uma característica marcante de Go é poder <b>devolver mais de um valor</b>; o padrão é devolver o resultado e um <code>error</code>. Quem chama verifica se o erro é <code>nil</code> (nenhum erro). Letra maiúscula no início de um nome significa que ele é <b>público</b> (exportado) para outros pacotes.</p>`,
      partes: [
        [c`package main`, "Diz que este arquivo pertence ao pacote principal, o que gera um programa executável."],
        [c`import "fmt"`, "Importa o pacote de formatação e impressão."],
        [c`func soma(a int, b int) int {`, "Função que recebe dois inteiros e devolve um inteiro."],
        [c`func dividir(a, b float64) (float64, error) {`, "Devolve dois valores: o resultado e um possível erro. `a, b float64` = ambos do mesmo tipo."],
        [c`return 0, fmt.Errorf("divisão por zero")`, "Em caso de problema, devolve um valor qualquer e um erro."],
        [c`return a / b, nil`, "Sucesso: o resultado e `nil` (nenhum erro)."],
        [c`nome := "Lia"`, "Declaração curta: cria e atribui, deduzindo o tipo `string`."],
        [c`var idade int = 28`, "Declaração completa, com o tipo explícito."],
        [c`fmt.Printf("%s tem %d anos\n", nome, idade)`, "Impressão formatada: `%s` para texto, `%d` para inteiro, `\\n` pula linha."],
        [c`r, err := dividir(10, 0)`, "Recebe os dois valores devolvidos."],
        [c`if err != nil { fmt.Println("Erro:", err); return }`, "Padrão Go: se houve erro, trata e sai da função."]
      ]
    },
    b2: {
      detalhes: `<p>Em Go, o <b>array</b> tem tamanho fixo, que faz parte do tipo (<code>[3]int</code>). Por isso, no dia a dia usamos o <b>slice</b> (<code>[]int</code>), uma “janela” flexível sobre um array, que cresce com <code>append</code>. O slice tem <code>len</code> (quantos itens tem) e <code>cap</code> (quanto cabe antes de precisar de mais memória). A notação <code>s[1:3]</code> cria um novo slice com os itens das posições 1 e 2.</p>
<p>O <b>map</b> guarda pares chave → valor, como <code>map[string]int</code> (chave texto, valor inteiro). Ao ler uma chave inexistente, Go devolve o valor zero do tipo. Para saber se a chave existe de verdade, use o padrão <b>“vírgula ok”</b>: <code>valor, ok := mapa[chave]</code>. Para apagar, use <code>delete(mapa, chave)</code>. A ordem de um map ao percorrê-lo não é garantida.</p>
<p>O único laço de Go é o <code>for</code>, que serve para tudo: contador clássico, “enquanto” e percorrer coleções com <code>range</code>. O <code>range</code> entrega dois valores (índice e item, ou chave e valor); use <code>_</code> para ignorar o que não precisar.</p>`,
      partes: [
        [c`precos := []float64{10.5, 20, 7.25}`, "Cria um slice de números decimais."],
        [c`precos = append(precos, 99.9)`, "Adiciona um item. `append` devolve o slice atualizado, por isso reatribuímos."],
        [c`fmt.Println(len(precos), precos[1:3])`, "Mostra o tamanho e uma fatia com os itens das posições 1 e 2."],
        [c`for _, p := range precos { total += p }`, "Percorre o slice; o `_` descarta o índice, que não é usado."],
        [c`estoque := map[string]int{"caneta": 50, "lapis": 20}`, "Cria um map de nome do produto → quantidade."],
        [c`estoque["borracha"] = 10`, "Adiciona (ou atualiza) uma chave."],
        [c`if qtd, ok := estoque["caderno"]; !ok {`, "“Vírgula ok”: `ok` é falso porque a chave não existe; `qtd` vale 0."],
        [c`for item, qtd := range estoque {`, "Percorre o map entregando chave e valor."]
      ]
    },
    b3: {
      detalhes: `<p>Go não tem classes. Para agrupar dados, usamos <b>structs</b>: um tipo com campos nomeados (<code>type Conta struct { Titular string; Saldo float64 }</code>). Criamos valores com <code>Conta{Titular: "Rui", Saldo: 100}</code> e acessamos os campos com ponto.</p>
<p><b>Métodos</b> são funções ligadas a um tipo, declaradas com um <b>receptor</b> antes do nome: <code>func (c Conta) Resumo() string</code>. Se o receptor for um <b>ponteiro</b> (<code>*Conta</code>), o método trabalha sobre o valor original e pode alterá-lo. Se for um valor, recebe uma cópia, e alterações não têm efeito fora do método.</p>
<p>Um <b>ponteiro</b> guarda o endereço de memória de um valor: <code>&amp;x</code> pega o endereço de <code>x</code> e <code>*p</code> acessa o valor apontado. Go faz algumas conversões automáticas, por isso <code>c.Depositar(50)</code> funciona mesmo com <code>c</code> sendo um valor. Campos e métodos com inicial maiúscula são públicos; com minúscula, ficam privados ao pacote.</p>`,
      partes: [
        [c`type Conta struct {`, "Define um novo tipo `Conta` composto por campos."],
        [c`Titular string; Saldo float64`, "Campos com inicial maiúscula: visíveis fora do pacote (e no JSON)."],
        [c`func (c *Conta) Depositar(v float64) {`, "Método com receptor ponteiro: pode alterar a conta original."],
        [c`c.Saldo += v`, "Altera o saldo da conta original."],
        [c`func (c Conta) Resumo() string {`, "Receptor por valor: recebe uma cópia, adequado para métodos que só leem."],
        [c`return fmt.Sprintf("%s: R$ %.2f", c.Titular, c.Saldo)`, "`Sprintf` monta e devolve o texto, em vez de imprimir."],
        [c`c := Conta{Titular: "Rui", Saldo: 100}`, "Cria uma conta preenchendo os campos pelo nome."],
        [c`c.Depositar(50)`, "Chama o método; o saldo passa a 150."]
      ]
    },
    i1: {
      detalhes: `<p>Go trata erros como <b>valores comuns</b>, e não como exceções. Funções que podem falhar devolvem um <code>error</code> como último resultado, e quem chama decide o que fazer. O padrão <code>if err != nil { ... }</code> aparece o tempo todo e deixa explícito onde cada falha é tratada.</p>
<p>Erros podem ser criados com <code>errors.New("mensagem")</code> ou <code>fmt.Errorf(...)</code>. <b>Erros sentinela</b> são variáveis de erro declaradas no pacote (como <code>ErrSaldoInsuficiente</code>), que permitem comparar e reagir a um erro específico com <code>errors.Is(err, ErrX)</code>.</p>
<p>Ao repassar um erro para cima, é boa prática adicionar contexto com <code>fmt.Errorf("carregando config: %w", err)</code>. O verbo <code>%w</code> “embrulha” o erro original, mantendo-o acessível para <code>errors.Is</code> e <code>errors.As</code>. O <code>panic</code> existe, mas é reservado para situações realmente irrecuperáveis, como um bug de programação.</p>`,
      partes: [
        [c`var ErrSaldoInsuficiente = errors.New("saldo insuficiente")`, "Erro sentinela: uma variável que representa um erro conhecido."],
        [c`func sacar(saldo, valor float64) (float64, error) {`, "Devolve o novo saldo e um possível erro."],
        [c`if valor > saldo { return saldo, ErrSaldoInsuficiente }`, "Regra violada: devolve o saldo sem mudar e o erro."],
        [c`return saldo - valor, nil`, "Sucesso: novo saldo e nenhum erro."],
        [c`if errors.Is(err, ErrSaldoInsuficiente) {`, "Verifica se o erro é (ou contém) o erro sentinela."],
        [c`_, err = os.ReadFile("config.json")`, "Tenta ler um arquivo; descarta o conteúdo com `_`."],
        [c`fmt.Errorf("carregando configuração: %w", err)`, "Cria um erro novo com contexto, embrulhando o original."]
      ]
    },
    i2: {
      detalhes: `<p>Uma <b>interface</b> define um conjunto de métodos (um “contrato”). Qualquer tipo que tenha esses métodos <b>implementa</b> a interface automaticamente, sem precisar declarar nada; isso se chama <b>implementação implícita</b>. É o principal mecanismo de polimorfismo em Go.</p>
<p>Com interfaces, uma função pode trabalhar com qualquer tipo que cumpra o contrato. A função <code>avisarTodos</code> do exemplo aceita e-mail, SMS ou qualquer notificador futuro, sem mudar uma linha. Em testes, criamos implementações falsas (mocks) para não enviar mensagens reais.</p>
<p>Boas práticas em Go: interfaces <b>pequenas</b>, muitas vezes com um único método (como <code>io.Reader</code> e <code>io.Writer</code> da biblioteca padrão), e a máxima “<b>aceite interfaces, devolva structs</b>”. A interface vazia (<code>any</code>) aceita qualquer valor, mas abre mão da segurança de tipos.</p>`,
      partes: [
        [c`type Notificador interface { Enviar(msg string) error }`, "Contrato: qualquer tipo com o método `Enviar(string) error` é um `Notificador`."],
        [c`type Email struct{ Endereco string }`, "Um tipo concreto."],
        [c`func (e Email) Enviar(msg string) error {`, "Ao ter este método, `Email` passa a implementar `Notificador` automaticamente."],
        [c`func (s SMS) Enviar(msg string) error {`, "`SMS` também implementa, do seu jeito."],
        [c`func avisarTodos(ns []Notificador, msg string) {`, "Recebe uma lista de qualquer coisa que seja `Notificador`."],
        [c`n.Enviar(msg)`, "Cada item executa sua própria versão de `Enviar` (polimorfismo)."],
        [c`avisarTodos([]Notificador{Email{"a@b.com"}, SMS{"1199999"}}, …)`, "Mistura e-mail e SMS na mesma lista."]
      ]
    },
    i3: {
      detalhes: `<p>A biblioteca padrão de Go já vem com um servidor HTTP completo no pacote <code>net/http</code>, usado em produção por muitas empresas. Você registra <b>handlers</b> (funções que tratam requisições) em um roteador (<code>ServeMux</code>) e inicia o servidor com <code>http.ListenAndServe</code>.</p>
<p>Todo handler recebe dois parâmetros: <code>w http.ResponseWriter</code>, onde você escreve a resposta (cabeçalhos, status e corpo), e <code>r *http.Request</code>, com tudo sobre a requisição (método, caminho, corpo, cabeçalhos). Desde o Go 1.22, o roteador entende o método e parâmetros no padrão, como <code>"GET /produtos/{id}"</code>.</p>
<p>O pacote <code>encoding/json</code> converte structs em JSON e vice-versa. <code>json.NewEncoder(w).Encode(v)</code> escreve o JSON na resposta; <code>json.NewDecoder(r.Body).Decode(&amp;v)</code> lê o JSON do corpo para dentro de uma variável. Para controlar o nome dos campos no JSON, usamos <i>struct tags</i> como <code>json:"nome"</code>.</p>`,
      partes: [
        [c`type Produto struct { ID int; Nome string; Preco float64 }`, "Formato dos dados que entram e saem da API."],
        [c`mux := http.NewServeMux()`, "Cria o roteador que liga caminhos a funções."],
        [c`mux.HandleFunc("GET /produtos", func(w http.ResponseWriter, r *http.Request) {`, "Registra a função para requisições GET em `/produtos`."],
        [c`w.Header().Set("Content-Type", "application/json")`, "Avisa ao cliente que a resposta é JSON."],
        [c`json.NewEncoder(w).Encode(produtos)`, "Converte a lista em JSON e escreve na resposta."],
        [c`if err := json.NewDecoder(r.Body).Decode(&p); err != nil {`, "Lê o JSON enviado para dentro de `p`; o `&` passa o endereço para a função preencher."],
        [c`http.Error(w, "JSON inválido", http.StatusBadRequest)`, "Responde 400 com uma mensagem."],
        [c`w.WriteHeader(http.StatusCreated)`, "Define o status 201 antes de escrever o corpo."],
        [c`log.Fatal(http.ListenAndServe(":8080", mux))`, "Liga o servidor na porta 8080; se falhar, registra e encerra."]
      ]
    },
    a1: {
      detalhes: `<p>Uma <b>goroutine</b> é uma função executando de forma concorrente, iniciada com a palavra <code>go</code>. Ela é muito leve (começa com poucos KB de memória), então um programa pode ter milhares delas. O próprio Go distribui as goroutines entre os núcleos do processador.</p>
<p><b>Channels</b> (canais) são o jeito recomendado de as goroutines se comunicarem: uma envia com <code>canal &lt;- valor</code> e outra recebe com <code>valor := &lt;-canal</code>. Um canal <i>bufferizado</i> (<code>make(chan T, n)</code>) aceita até <code>n</code> valores sem esperar alguém receber. Fechar um canal com <code>close</code> avisa que não virão mais valores, e o <code>range</code> sobre ele termina.</p>
<p>O <code>sync.WaitGroup</code> espera um grupo de goroutines terminar: <code>Add(1)</code> antes de iniciar cada uma, <code>Done()</code> ao final de cada uma e <code>Wait()</code> para bloquear até todas acabarem. Quando várias goroutines alteram o mesmo dado sem coordenação, ocorre <b>condição de corrida</b> (<i>race condition</i>); o comando <code>go run -race</code> ajuda a detectá-la.</p>`,
      partes: [
        [c`resultados := make(chan string, len(ids))`, "Canal com espaço para todos os resultados, para ninguém ficar esperando."],
        [c`var wg sync.WaitGroup`, "Contador de goroutines em andamento."],
        [c`wg.Add(1)`, "Avisa que uma goroutine nova vai começar."],
        [c`go func(id int) { … }(id)`, "Inicia uma goroutine. O `id` é passado como argumento para cada uma receber o seu."],
        [c`defer wg.Done()`, "`defer` adia a chamada para o fim da função: marca esta goroutine como concluída."],
        [c`resultados <- consultar(id)`, "Envia o resultado para o canal."],
        [c`wg.Wait()`, "Bloqueia até todas as goroutines chamarem `Done`."],
        [c`close(resultados)`, "Fecha o canal: não serão enviados mais valores."],
        [c`for r := range resultados { fmt.Println(r) }`, "Lê todos os valores até o canal ficar vazio e fechado."]
      ]
    },
    a2: {
      detalhes: `<p>O pacote <code>context</code> carrega, ao longo de uma cadeia de chamadas, três coisas: um <b>prazo</b> (deadline/timeout), um sinal de <b>cancelamento</b> e valores ligados à requisição (como um ID de rastreio). Ele é essencial em servidores, onde uma requisição pode disparar consultas ao banco e chamadas a outros serviços.</p>
<p><code>context.Background()</code> é o contexto raiz, vazio. A partir dele criamos contextos derivados: <code>WithTimeout</code> (cancela sozinho após um tempo), <code>WithDeadline</code> (cancela em um horário) e <code>WithCancel</code> (cancela quando você mandar). Essas funções devolvem também uma função <code>cancel</code>, que deve ser chamada sempre (normalmente com <code>defer</code>) para liberar recursos.</p>
<p>Por convenção, funções que fazem operações demoradas recebem o contexto como <b>primeiro parâmetro</b> (<code>ctx context.Context</code>) e o repassam adiante. Quando o contexto é cancelado, as operações que o respeitam (requisições HTTP, consultas SQL) param e devolvem um erro como <code>context deadline exceeded</code>.</p>`,
      partes: [
        [c`func buscar(ctx context.Context, url string) error {`, "Recebe o contexto como primeiro parâmetro, por convenção."],
        [c`req, _ := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)`, "Cria a requisição ligada ao contexto: se ele for cancelado, a requisição também é."],
        [c`resp, err := http.DefaultClient.Do(req)`, "Envia a requisição."],
        [c`defer resp.Body.Close()`, "Garante que o corpo da resposta seja fechado ao sair da função."],
        [c`ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)`, "Contexto que se cancela sozinho após 2 segundos."],
        [c`defer cancel()`, "Libera os recursos do contexto ao final."],
        [c`buscar(ctx, "https://httpbin.org/delay/5")`, "O site demora 5s, mas o limite é 2s: a busca é interrompida com erro."]
      ]
    },
    a3: {
      detalhes: `<p>Go tem testes embutidos na linguagem, sem precisar de biblioteca externa. Os testes ficam em arquivos terminados em <code>_test.go</code>, no mesmo pacote do código, e são funções que começam com <code>Test</code> e recebem <code>t *testing.T</code>. Rodamos tudo com <code>go test ./...</code>.</p>
<p>O padrão mais comum é o <b>table-driven test</b>: uma lista (tabela) de casos, cada um com nome, entrada e saída esperada, percorrida em um laço. Com <code>t.Run(nome, ...)</code>, cada caso vira um subteste com nome próprio no relatório. Para reportar falhas, usamos <code>t.Errorf</code> (continua o teste) ou <code>t.Fatalf</code> (para na hora).</p>
<p><b>Benchmarks</b> medem desempenho: funções <code>BenchmarkX(b *testing.B)</code> repetem a operação <code>b.N</code> vezes, e o Go ajusta <code>b.N</code> até ter uma medição confiável. A opção <code>-cover</code> mostra quanto do código é coberto pelos testes. Em equipes, os testes rodam automaticamente a cada pull request (CI).</p>`,
      partes: [
        [c`func Desconto(valor float64, vip bool) float64 {`, "Função que será testada (no arquivo `desconto.go`)."],
        [c`func TestDesconto(t *testing.T) {`, "Teste: nome começa com `Test` e recebe `*testing.T`."],
        [c`casos := []struct { nome string; valor float64; vip bool; espera float64 }{`, "Tabela de casos: um slice de structs anônimas."],
        [c`{"cliente vip", 100, true, 90},`, "Um caso: nome, entrada (100, vip) e resultado esperado (90)."],
        [c`for _, c := range casos { t.Run(c.nome, func(t *testing.T) {`, "Roda cada caso como subteste com seu nome."],
        [c`if got := Desconto(c.valor, c.vip); got != c.espera {`, "Calcula o resultado e compara com o esperado."],
        [c`t.Errorf("esperava %.2f, veio %.2f", c.espera, got)`, "Registra a falha com uma mensagem clara."],
        [c`func BenchmarkDesconto(b *testing.B) { for i := 0; i < b.N; i++ { … } }`, "Benchmark: repete a função `b.N` vezes para medir o tempo."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual pacote todo programa Go executável deve declarar?", ["`package app`", "`package main`", "`package go`", "`package start`"], 1, "E precisa ter a função `func main()`, que é o ponto de partida."),
      l("Complete a declaração curta que cria e atribui uma variável:", c`nome ____ "Lia"`, ":=", "`:=` declara deduzindo o tipo; só pode ser usado dentro de funções."),
      m("Qual o valor zero de uma variável `int` declarada sem valor?", ["`nil`", "0", "-1", "Indefinido"], 1, "Em Go, toda variável começa com o valor zero do seu tipo: 0, \"\", false ou nil."),
      vf("Uma função Go pode devolver mais de um valor.", true, "O padrão é devolver o resultado e um `error`."),
      m("Como verificar se uma função retornou erro?", ["`if err == true`", "`if err != nil`", "`try { } catch { }`", "`if err.exists()`"], 1, "`nil` significa “nenhum erro”."),
      m("Qual estrutura cresce com `append` e é a mais usada para listas em Go?", ["Array", "Slice", "Map", "Struct"], 1, "Arrays têm tamanho fixo; slices crescem."),
      l("Complete para percorrer o slice ignorando o índice:", c`for ____, p := range precos {
	total += p
}`, "_", "O identificador `_` descarta um valor que não será usado."),
      m("O que `valor, ok := estoque[\"caderno\"]` faz se a chave não existir?", ["Dá erro", "`ok` fica `false` e `valor` recebe o valor zero", "Cria a chave", "Encerra o programa"], 1, "É o padrão “vírgula ok”."),
      m("Qual o único tipo de laço de repetição em Go?", ["`while`", "`for`", "`loop`", "`foreach`"], 1, "O `for` cobre contador, “enquanto” e `range`."),
      m("Qual receptor um método deve usar para ALTERAR a struct original?", ["Receptor por valor `(c Conta)`", "Receptor ponteiro `(c *Conta)`", "Qualquer um", "Nenhum, structs não mudam"], 1, "Com receptor por valor, o método recebe uma cópia.")
    ],
    intermediario: [
      m("Como Go trata erros?", ["Com exceções e try/catch", "Como valores comuns devolvidos pelas funções", "Ignorando-os", "Com goto"], 1, "Por isso o padrão `if err != nil` é tão comum."),
      l("Complete para criar um erro novo:", c`var ErrSemEstoque = errors.____("sem estoque")`, "New", "`errors.New` cria um erro com a mensagem informada."),
      m("Qual verbo do `fmt.Errorf` embrulha um erro mantendo o original acessível?", ["`%v`", "`%s`", "`%w`", "`%e`"], 2, "Com `%w`, `errors.Is` e `errors.As` continuam encontrando o erro original."),
      m("Para que serve `errors.Is(err, ErrX)`?", ["Criar um erro", "Verificar se `err` é (ou embrulha) o erro `ErrX`", "Apagar o erro", "Imprimir o erro"], 1, "Funciona mesmo com erros embrulhados por `%w`."),
      m("Como um tipo implementa uma interface em Go?", ["Usando `implements`", "Tendo todos os métodos da interface (implementação implícita)", "Herdando de uma classe", "Registrando em um arquivo"], 1, "Não existe a palavra `implements` em Go."),
      vf("Em Go, interfaces pequenas, com um ou poucos métodos, são consideradas boa prática.", true, "Exemplos: `io.Reader` e `io.Writer`."),
      m("Qual pacote padrão cria servidores web em Go?", ["`net/http`", "`web/server`", "`fmt`", "`os/web`"], 0, "Frameworks como Gin e Echo são construídos sobre ele."),
      l("Complete o tipo do parâmetro onde o handler escreve a resposta:", c`func(w http.____, r *http.Request)`, "ResponseWriter", "`w` recebe cabeçalhos, status e corpo da resposta."),
      m("O que faz `json.NewDecoder(r.Body).Decode(&p)`?", ["Escreve JSON na resposta", "Lê o JSON do corpo da requisição para dentro de `p`", "Apaga `p`", "Converte `p` em texto"], 1, "O `&p` passa o endereço para que `Decode` preencha a variável."),
      m("Qual status HTTP indica criação bem-sucedida (`http.StatusCreated`)?", ["200", "201", "400", "404"], 1, "400 é `StatusBadRequest`.")
    ],
    avancado: [
      m("Como se inicia uma goroutine?", ["`thread f()`", "`go f()`", "`async f()`", "`run f()`"], 1, "A palavra `go` executa a função de forma concorrente."),
      l("Complete para enviar um valor para o canal `ch`:", c`ch ____ 42`, "<-", "`ch <- v` envia; `v := <-ch` recebe."),
      m("Para que serve `sync.WaitGroup`?", ["Criar canais", "Esperar um grupo de goroutines terminar", "Dar prioridade a goroutines", "Ler arquivos"], 1, "`Add` antes de iniciar, `Done` ao terminar e `Wait` para esperar."),
      m("O que faz `defer wg.Done()` no início de uma goroutine?", ["Executa imediatamente", "Garante que `Done()` seja chamado quando a função terminar", "Cancela a goroutine", "Cria outra goroutine"], 1, "`defer` adia a execução para o fim da função, mesmo se houver erro."),
      m("O que é uma condição de corrida (race condition)?", ["Duas goroutines acessando e alterando o mesmo dado sem coordenação", "Um programa muito rápido", "Um erro de compilação", "Uma goroutine que nunca termina"], 0, "Detecte com `go run -race` e evite com channels ou `sync.Mutex`."),
      m("Qual função cria um contexto que se cancela sozinho após um tempo?", ["`context.Background()`", "`context.WithTimeout()`", "`context.Sleep()`", "`context.Stop()`"], 1, "Ela também devolve uma função `cancel`, que deve ser chamada."),
      vf("Por convenção, o `context.Context` é passado como primeiro parâmetro das funções.", true, "Exemplo: `func Buscar(ctx context.Context, id int)`."),
      m("Em que tipo de arquivo ficam os testes em Go?", ["`teste.go`", "Arquivos terminados em `_test.go`", "`.spec.js`", "Qualquer arquivo com `Test`"], 1, "E as funções de teste começam com `Test`."),
      l("Complete o comando que roda todos os testes do projeto:", c`go ____ ./...`, "test", "`go test -cover` mostra também a cobertura."),
      m("O que são table-driven tests?", ["Testes que leem uma tabela do banco", "Uma lista de casos (entrada e saída esperada) percorrida em um laço", "Testes de interface gráfica", "Testes manuais"], 1, "Facilitam adicionar novos casos e deixam o relatório claro com `t.Run`.")
    ]
  }
};
