import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>Java é uma linguagem orientada a objetos em que todo código fica dentro de <b>classes</b>. O programa começa pelo método <code>public static void main(String[] args)</code>. O código-fonte (<code>.java</code>) é compilado para <b>bytecode</b> (<code>.class</code>), que roda na <b>JVM</b> (Java Virtual Machine). Por isso o mesmo programa roda em Windows, Linux ou Mac: “escreva uma vez, rode em qualquer lugar”.</p>
<p>Java tem <b>tipos primitivos</b> (<code>int</code>, <code>long</code>, <code>double</code>, <code>boolean</code>, <code>char</code>...), que guardam valores simples, e <b>tipos de referência</b> (<code>String</code>, arrays, objetos de classes). Desde o Java 10, <code>var</code> deduz o tipo de variáveis locais. Convenções: classes em PascalCase (<code>ContaBancaria</code>), métodos e variáveis em camelCase (<code>saldoAtual</code>).</p>
<p>Para imprimir, usamos <code>System.out.println</code> (com quebra de linha) ou <code>printf</code> (formatado: <code>%s</code> texto, <code>%d</code> inteiro, <code>%.2f</code> decimal com 2 casas, <code>%n</code> quebra de linha). Para dinheiro, use <code>BigDecimal</code> criado a partir de texto, pois <code>double</code> tem imprecisões de arredondamento.</p>`,
      partes: [
        [c`public class Main {`, "Classe pública. O nome do arquivo deve ser igual: `Main.java`."],
        [c`public static void main(String[] args) {`, "Ponto de entrada do programa. `static` permite rodar sem criar objeto; `args` recebe argumentos da linha de comando."],
        [c`String nome = "Rafael";`, "Texto (tipo de referência, com S maiúsculo)."],
        [c`int idade = 35; double altura = 1.78; boolean ativo = true;`, "Tipos primitivos: inteiro, decimal e lógico."],
        [c`var cidade = "Belo Horizonte";`, "O compilador deduz `String`."],
        [c`System.out.println("Olá, " + nome + "!");`, "Imprime e pula linha. O `+` junta textos."],
        [c`System.out.printf("%s tem %d anos e %.2f m%n", nome, idade, altura);`, "Impressão formatada com marcadores para cada valor."],
        [c`var preco = new java.math.BigDecimal("19.90");`, "Valor monetário exato, criado a partir de texto (não de `double`)."],
        [c`preco.multiply(java.math.BigDecimal.valueOf(3))`, "Com BigDecimal, as contas usam métodos (`add`, `subtract`, `multiply`) em vez de operadores."]
      ]
    },
    b2: {
      detalhes: `<p>As condicionais seguem a sintaxe da família C: <code>if (condição) { ... } else if (...) { ... } else { ... }</code>, com <code>&amp;&amp;</code>, <code>||</code> e <code>!</code> para combinar condições. O <b>switch moderno</b> (Java 14+) usa setas (<code>case 1, 2 -&gt; ...</code>), não precisa de <code>break</code> e pode devolver um valor, como no exemplo.</p>
<p>Os laços são <code>for</code> clássico (<code>for (int i = 0; i &lt; 10; i++)</code>), o <b>for-each</b> (<code>for (int nota : notas)</code>), <code>while</code> e <code>do-while</code>. Arrays têm tamanho fixo, definido na criação, e o tamanho é lido com <code>.length</code>.</p>
<p><code>String</code> é <b>imutável</b>: métodos como <code>trim()</code>, <code>toLowerCase()</code> e <code>replace()</code> devolvem uma nova String, sem alterar a original. Para comparar conteúdo, use <b>sempre</b> <code>equals()</code> (ou <code>equalsIgnoreCase()</code>); o <code>==</code> compara se é o mesmo objeto na memória. Para montar textos dentro de laços, use <code>StringBuilder</code>, que é mutável e muito mais eficiente.</p>`,
      partes: [
        [c`int[] notas = {8, 5, 10, 3};`, "Array de inteiros com 4 posições, já preenchido."],
        [c`for (int nota : notas) { if (nota >= 6) aprovados++; }`, "For-each: percorre cada nota e conta as aprovadas."],
        [c`String status = switch (aprovados) {`, "Switch como expressão: o resultado vai para `status`."],
        [c`case 0 -> "Ninguém passou";`, "Caso único com seta; não precisa de `break`."],
        [c`case 1, 2 -> "Poucos aprovados";`, "Vários valores no mesmo caso."],
        [c`default -> "Turma boa!";`, "Qualquer outro valor."],
        [c`String limpo = email.trim().toLowerCase();`, "Remove espaços das pontas e converte para minúsculas, criando uma nova String."],
        [c`System.out.println(a == "java");`, "`false`: compara referências (objetos diferentes na memória)."],
        [c`System.out.println(a.equals("java"));`, "`true`: compara o conteúdo do texto."]
      ]
    },
    b3: {
      detalhes: `<p>Uma <b>classe</b> descreve o modelo de um objeto: seus <b>atributos</b> (dados) e <b>métodos</b> (comportamentos). O <b>construtor</b> tem o mesmo nome da classe e prepara o objeto quando ele é criado com <code>new</code>. A palavra <code>this</code> se refere ao próprio objeto, útil quando o parâmetro tem o mesmo nome do atributo.</p>
<p><b>Encapsulamento</b> significa esconder os dados (<code>private</code>) e expor só operações seguras (<code>public</code>). Em vez de deixar qualquer um alterar o saldo, a classe oferece <code>depositar()</code>, que valida o valor. Métodos <code>getX()</code> permitem leitura. A palavra <code>final</code> impede que um atributo seja reatribuído depois de definido.</p>
<p>Para classes que só carregam dados, o <b>record</b> (Java 16+) gera automaticamente construtor, métodos de acesso, <code>equals</code>, <code>hashCode</code> e <code>toString</code>. Em projetos, a biblioteca <b>Lombok</b> também é usada para reduzir código repetitivo com anotações como <code>@Getter</code> e <code>@Builder</code>.</p>`,
      partes: [
        [c`public class ContaBancaria {`, "Define a classe."],
        [c`private final String titular;`, "Atributo privado e final: definido uma vez no construtor e nunca mais alterado."],
        [c`private java.math.BigDecimal saldo = java.math.BigDecimal.ZERO;`, "Saldo privado, começando em zero."],
        [c`public ContaBancaria(String titular) { this.titular = titular; }`, "Construtor: `this.titular` é o atributo; `titular` é o parâmetro."],
        [c`public void depositar(java.math.BigDecimal valor) {`, "Método público que altera o saldo de forma controlada."],
        [c`if (valor.signum() <= 0) throw new IllegalArgumentException("Valor inválido");`, "`signum()` devolve -1, 0 ou 1 conforme o sinal; recusa zero e negativos."],
        [c`saldo = saldo.add(valor);`, "BigDecimal é imutável: `add` devolve um novo valor, que é atribuído ao saldo."],
        [c`public java.math.BigDecimal getSaldo() { return saldo; }`, "Getter: permite ler o saldo, mas não alterá-lo diretamente."],
        [c`public record ClienteDTO(String nome, String email) {}`, "Record: classe de dados imutável em uma linha."]
      ]
    },
    i1: {
      detalhes: `<p>O <b>Collections Framework</b> oferece estruturas prontas: <code>List</code> (ordem e repetidos, normalmente <code>ArrayList</code>), <code>Set</code> (sem repetidos, como <code>HashSet</code>) e <code>Map</code> (chave → valor, como <code>HashMap</code>). Declaramos pela interface (<code>List&lt;String&gt; nomes = new ArrayList&lt;&gt;()</code>) para poder trocar a implementação. <code>List.of(...)</code> cria listas imutáveis rapidamente.</p>
<p>A <b>Stream API</b> (Java 8+) processa coleções como uma linha de produção: <code>stream()</code> abre o fluxo, operações intermediárias (<code>filter</code>, <code>map</code>, <code>sorted</code>, <code>distinct</code>) transformam e uma operação final (<code>toList</code>, <code>collect</code>, <code>count</code>, <code>sum</code>, <code>findFirst</code>) produz o resultado. A classe <code>Collectors</code> traz coletores como <code>groupingBy</code>, <code>summingDouble</code> e <code>toSet</code>.</p>
<p>O <code>Optional</code> representa um valor que pode estar ausente, evitando o <code>NullPointerException</code>. Em vez de devolver <code>null</code>, métodos como <code>findFirst</code> devolvem <code>Optional</code>, e você decide o que fazer com <code>map</code>, <code>orElse</code> ou <code>ifPresent</code>. A notação <code>Venda::valor</code> é uma <b>referência de método</b>, atalho para <code>v -&gt; v.valor()</code>.</p>`,
      partes: [
        [c`record Venda(String vendedor, String uf, double valor) {}`, "Tipo de dados de cada venda."],
        [c`List<Venda> vendas = List.of(…);`, "Lista imutável de vendas."],
        [c`vendas.stream().filter(v -> v.valor() > 500)`, "Abre o fluxo e mantém só vendas acima de 500."],
        [c`.sorted(Comparator.comparingDouble(Venda::valor).reversed())`, "Ordena pelo valor, do maior para o menor."],
        [c`.toList();`, "Operação final: gera a lista resultante."],
        [c`Collectors.groupingBy(Venda::vendedor, Collectors.summingDouble(Venda::valor))`, "Agrupa por vendedor e soma os valores de cada grupo, gerando um `Map`."],
        [c`vendas.stream().map(Venda::uf).collect(Collectors.toSet());`, "Extrai os estados sem repetição."],
        [c`Optional<Venda> daBahia = … .findFirst();`, "Pode ou não ter encontrado uma venda da BA."],
        [c`daBahia.map(Venda::vendedor).orElse("nenhuma")`, "Se houver, pega o vendedor; senão, usa \"nenhuma\"."]
      ]
    },
    i2: {
      detalhes: `<p><b>Herança</b> (<code>extends</code>) permite que uma classe reaproveite atributos e métodos de outra. Em Java, uma classe só pode estender <b>uma</b> classe. Métodos herdados podem ser redefinidos na filha (<i>override</i>), marcados com <code>@Override</code>.</p>
<p>Uma <b>interface</b> (<code>implements</code>) é um contrato com os métodos que uma classe deve ter. Uma classe pode implementar <b>várias</b> interfaces. Desde o Java 8, interfaces também podem ter métodos <code>default</code>, com implementação padrão. Uma <b>classe abstrata</b> fica no meio do caminho: pode ter atributos e métodos prontos, mas não pode ser instanciada diretamente.</p>
<p><b>Polimorfismo</b> é tratar objetos diferentes pela mesma interface: o <code>Checkout</code> recebe um <code>MeioPagamento</code> e chama <code>pagar()</code> sem saber se é Pix ou cartão; cada objeto executa sua própria versão. É a base para sistemas extensíveis: um novo meio de pagamento é apenas uma nova classe. Uma boa prática é preferir <b>composição</b> (ter um objeto) à herança (ser um objeto) quando possível.</p>`,
      partes: [
        [c`public interface MeioPagamento {`, "Contrato para qualquer meio de pagamento."],
        [c`boolean pagar(double valor);`, "Método obrigatório: quem implementa precisa definir."],
        [c`default String recibo(double v) { return "Pago: R$ " + v; }`, "Método com implementação padrão, herdado por todas as classes."],
        [c`public class Pix implements MeioPagamento {`, "Pix cumpre o contrato."],
        [c`public boolean pagar(double valor) { … return true; }`, "Versão do Pix: sempre aprova."],
        [c`return valor < 5000;`, "Versão do Cartão: aprova só valores abaixo do limite."],
        [c`public void finalizar(MeioPagamento meio, double total) {`, "Recebe qualquer meio de pagamento (polimorfismo)."],
        [c`if (meio.pagar(total)) System.out.println(meio.recibo(total));`, "Chama `pagar` da classe real do objeto e, se aprovado, imprime o recibo."]
      ]
    },
    i3: {
      detalhes: `<p>Exceções em Java formam uma hierarquia. As <b>checked exceptions</b> (filhas de <code>Exception</code>, como <code>IOException</code>) representam falhas externas previsíveis e o compilador <b>obriga</b> a tratá-las com <code>try/catch</code> ou a declará-las com <code>throws</code>. As <b>unchecked</b> (filhas de <code>RuntimeException</code>, como <code>NullPointerException</code> e <code>IllegalArgumentException</code>) costumam indicar bugs ou regras violadas e não precisam ser declaradas.</p>
<p>Você pode criar exceções próprias, normalmente estendendo <code>RuntimeException</code>, para representar erros de negócio (<code>SaldoInsuficienteException</code>). Lance com <code>throw new ...</code>. Ao capturar, trate ou registre o erro com a causa original; nunca deixe um <code>catch</code> vazio.</p>
<p>O <b>try-with-resources</b> (<code>try (var recurso = ...) { }</code>) fecha automaticamente arquivos, conexões e streams ao final do bloco, mesmo com erro. Em aplicações Spring, uma classe com <code>@RestControllerAdvice</code> transforma exceções em respostas HTTP adequadas, em um único lugar.</p>`,
      partes: [
        [c`public class SaldoInsuficienteException extends RuntimeException {`, "Exceção de negócio própria (unchecked)."],
        [c`public SaldoInsuficienteException(String msg) { super(msg); }`, "Repassa a mensagem para a classe mãe com `super`."],
        [c`if (valor > saldo) throw new SaldoInsuficienteException("Saldo: " + saldo);`, "Interrompe o saque com um erro claro."],
        [c`try (var linhas = Files.lines(Path.of("clientes.csv"))) {`, "Try-with-resources: o arquivo será fechado automaticamente."],
        [c`linhas.skip(1).forEach(System.out::println);`, "Pula o cabeçalho e imprime cada linha."],
        [c`} catch (java.io.IOException e) {`, "Exceção checked: o compilador exige o tratamento."],
        [c`log.error("Falha ao ler arquivo", e);`, "Registra o erro com a causa completa (stack trace)."],
        [c`} finally { System.out.println("Fim da leitura"); }`, "Executa sempre."]
      ]
    },
    a1: {
      detalhes: `<p>O <b>Spring Boot</b> é o framework mais usado para criar aplicações Java no mercado. Ele traz configurações prontas, um servidor web embutido e se integra a bancos de dados, segurança, mensageria e muito mais. Um projeto é gerado no site <b>start.spring.io</b>, escolhendo as dependências (Web, JPA, Validation...).</p>
<p>Em uma API REST, as classes são organizadas em <b>camadas</b>: o <b>Controller</b> recebe as requisições HTTP, o <b>Service</b> contém as regras de negócio e o <b>Repository</b> acessa o banco. Anotações dizem ao Spring o papel de cada coisa: <code>@RestController</code>, <code>@RequestMapping</code>, <code>@GetMapping</code>, <code>@PostMapping</code>, <code>@PathVariable</code> (parte do caminho) e <code>@RequestBody</code> (corpo JSON).</p>
<p>O Spring cria e conecta os objetos (beans) automaticamente pela <b>injeção de dependência</b>, de preferência pelo construtor. A validação com <code>@Valid</code> e anotações como <code>@NotBlank</code> e <code>@Positive</code> recusa dados inválidos com resposta 400. O <code>ResponseEntity</code> permite controlar o status e os cabeçalhos da resposta.</p>`,
      partes: [
        [c`@RestController`, "Marca a classe como controlador REST: os retornos viram JSON."],
        [c`@RequestMapping("/produtos")`, "Prefixo de todas as rotas desta classe."],
        [c`public ProdutoController(ProdutoService service) { this.service = service; }`, "Injeção pelo construtor: o Spring entrega o serviço pronto."],
        [c`@GetMapping public List<ProdutoDTO> listar()`, "GET `/produtos`: devolve a lista."],
        [c`@GetMapping("/{id}") … @PathVariable Long id`, "GET `/produtos/5`: o `5` vai para o parâmetro `id`."],
        [c`.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());`, "Se encontrou, 200 com o produto; senão, 404."],
        [c`@PostMapping … @RequestBody @Valid ProdutoDTO dto`, "POST: converte o corpo JSON em DTO e valida as anotações."],
        [c`ResponseEntity.created(URI.create("/produtos/" + salvo.id())).body(salvo);`, "Responde 201 com o endereço do novo produto."],
        [c`public record ProdutoDTO(Long id, @NotBlank String nome, @Positive BigDecimal preco) {}`, "DTO com regras: nome não pode ser vazio e preço deve ser positivo."]
      ]
    },
    a2: {
      detalhes: `<p>O <b>JPA</b> (Jakarta Persistence API) é a especificação Java para mapear objetos em tabelas; o <b>Hibernate</b> é a implementação mais usada. Uma classe anotada com <code>@Entity</code> vira uma tabela; <code>@Id</code> marca a chave primária e <code>@GeneratedValue</code> deixa o banco gerá-la. Relacionamentos são mapeados com <code>@OneToMany</code>, <code>@ManyToOne</code>, <code>@ManyToMany</code>.</p>
<p>O <b>Spring Data JPA</b> elimina boa parte do código de acesso a dados: basta criar uma interface que estende <code>JpaRepository&lt;Entidade, TipoDoId&gt;</code> e você ganha <code>save</code>, <code>findById</code>, <code>findAll</code>, <code>deleteById</code>... Além disso, ele gera consultas a partir do <b>nome do método</b> (<code>findByUfOrderByNomeAsc</code>). Para consultas complexas, usa-se <code>@Query</code> com JPQL.</p>
<p>O <code>FetchType.LAZY</code> carrega os relacionamentos só quando são acessados, evitando trazer dados demais. Mas acessar listas em um laço pode gerar o problema <b>N+1</b> (uma consulta extra por item); a solução é o <code>join fetch</code>. Ligue <code>spring.jpa.show-sql=true</code> para ver o SQL gerado, e use <b>Flyway</b> ou <b>Liquibase</b> para versionar o banco.</p>`,
      partes: [
        [c`@Entity @Table(name = "clientes")`, "A classe vira a tabela `clientes`."],
        [c`@Id @GeneratedValue(strategy = GenerationType.IDENTITY)`, "Chave primária com valor gerado pelo banco (auto incremento)."],
        [c`@Column(nullable = false) private String nome;`, "Coluna obrigatória (NOT NULL)."],
        [c`@OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)`, "Um cliente tem muitos pedidos, carregados só quando acessados."],
        [c`public interface ClienteRepository extends JpaRepository<Cliente, Long> {`, "Repositório: o Spring cria a implementação automaticamente."],
        [c`List<Cliente> findByUfOrderByNomeAsc(String uf);`, "Consulta gerada pelo nome: `WHERE uf = ? ORDER BY nome ASC`."],
        [c`@Query("select c from Cliente c join fetch c.pedidos where c.id = :id")`, "Consulta JPQL que já traz os pedidos junto, evitando N+1."],
        [c`spring.jpa.show-sql=true`, "Mostra no log o SQL executado."]
      ]
    },
    a3: {
      detalhes: `<p><b>Threads</b> permitem executar tarefas ao mesmo tempo, aproveitando vários núcleos do processador ou esperando várias operações lentas em paralelo. Criar threads manualmente é trabalhoso; o <code>ExecutorService</code> gerencia um <b>pool</b> de threads reutilizáveis para você. Cada tarefa enviada com <code>submit</code> devolve um <code>Future</code>, que dá acesso ao resultado com <code>get()</code>.</p>
<p>Quando várias threads alteram o mesmo dado, surgem <b>condições de corrida</b>. Ferramentas para evitar: <code>synchronized</code> (uma thread por vez em um trecho), classes atômicas (<code>AtomicInteger</code>), coleções concorrentes (<code>ConcurrentHashMap</code>) e, sempre que possível, objetos <b>imutáveis</b>, que não precisam de proteção.</p>
<p>O <code>CompletableFuture</code> encadeia tarefas assíncronas (<code>supplyAsync</code>, <code>thenApply</code>, <code>thenAccept</code>) sem bloquear. O Java 21 trouxe as <b>virtual threads</b>, threads muito leves gerenciadas pela JVM, que permitem atender milhares de tarefas simultâneas com código simples, ideal para servidores que passam muito tempo esperando banco de dados e APIs.</p>`,
      partes: [
        [c`ExecutorService pool = Executors.newFixedThreadPool(4);`, "Pool com 4 threads reutilizáveis."],
        [c`AtomicInteger processados = new AtomicInteger();`, "Contador seguro para uso por várias threads."],
        [c`final int id = i;`, "Cópia final de `i`: lambdas só podem usar variáveis que não mudam."],
        [c`futuros.add(pool.submit(() -> { … return "Cliente " + id + " ok"; }));`, "Envia a tarefa ao pool e guarda o `Future` do resultado."],
        [c`processados.incrementAndGet();`, "Incrementa de forma atômica, sem perder contagens."],
        [c`for (Future<String> f : futuros) System.out.println(f.get());`, "`get()` espera cada tarefa terminar e pega o resultado."],
        [c`pool.shutdown();`, "Encerra o pool depois que as tarefas terminarem."],
        [c`CompletableFuture.supplyAsync(() -> "dados").thenApply(String::toUpperCase).thenAccept(System.out::println);`, "Pipeline assíncrono: gera dados, transforma e consome, sem bloquear."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual método é o ponto de entrada de um programa Java?", ["`start()`", "`public static void main(String[] args)`", "`run()`", "`init()`"], 1, "A JVM procura exatamente essa assinatura para iniciar o programa."),
      m("O que é a JVM?", ["Um editor de código", "A máquina virtual que executa o bytecode Java", "Um banco de dados", "Um framework web"], 1, "É ela que permite o mesmo programa rodar em qualquer sistema."),
      l("Complete para imprimir uma linha:", c`System.out.____("Olá!");`, "println", "`println` imprime e pula linha; `print` não pula."),
      m("Qual tipo é o mais indicado para valores monetários em Java?", ["`double`", "`float`", "`BigDecimal`", "`int`"], 2, "`0.1 + 0.2` com `double` dá 0.30000000000000004."),
      m("Qual a forma correta de comparar o conteúdo de duas Strings?", ["`a == b`", "`a.equals(b)`", "`a = b`", "`a.compare(b)`"], 1, "`==` compara se são o mesmo objeto na memória."),
      vf("Strings em Java são imutáveis: `texto.toUpperCase()` não altera `texto`.", true, "O método devolve uma nova String; é preciso guardar o resultado."),
      l("Complete o for-each que percorre o array:", c`for (int nota ____ notas) {
    System.out.println(nota);
}`, ":", "No for-each, os dois-pontos significam “em cada item de”."),
      m("No switch moderno com setas (`case 1 ->`), é preciso usar `break`?", ["Sim, sempre", "Não", "Só no último caso", "Só com Strings"], 1, "A seta executa apenas aquele caso, sem “cair” no próximo."),
      m("Qual modificador impede o acesso a um atributo de fora da classe?", ["`public`", "`private`", "`static`", "`final`"], 1, "É a base do encapsulamento."),
      m("Para que serve um construtor?", ["Apagar o objeto", "Preparar o objeto no momento em que é criado com `new`", "Comparar objetos", "Imprimir o objeto"], 1, "Tem o mesmo nome da classe e não tem tipo de retorno.")
    ],
    intermediario: [
      m("Qual coleção NÃO aceita elementos repetidos?", ["`ArrayList`", "`LinkedList`", "`HashSet`", "`List.of`"], 2, "Conjuntos (`Set`) guardam valores únicos."),
      m("Qual coleção guarda pares chave → valor?", ["`List`", "`Set`", "`Map`", "`Queue`"], 2, "A implementação mais comum é `HashMap`."),
      l("Complete para filtrar vendas acima de 500 com Streams:", c`vendas.stream().____(v -> v.valor() > 500).toList();`, "filter", "`filter` mantém só os itens que passam no teste."),
      m("O que `Venda::valor` representa?", ["Uma divisão", "Uma referência de método, equivalente a `v -> v.valor()`", "Um comentário", "Um atributo estático"], 1, "Referências de método deixam o código mais enxuto."),
      m("Para que serve o `Optional`?", ["Acelerar o código", "Representar um valor que pode estar ausente, evitando `NullPointerException`", "Criar listas", "Ler arquivos"], 1, "Use `orElse`, `map` e `ifPresent` para lidar com a ausência."),
      m("Quantas classes uma classe Java pode estender (`extends`)?", ["Nenhuma", "Uma", "Duas", "Quantas quiser"], 1, "Mas pode implementar várias interfaces."),
      l("Complete para a classe Pix cumprir o contrato da interface:", c`public class Pix ____ MeioPagamento { }`, "implements", "`extends` é para herdar de classes; `implements` para interfaces."),
      m("O que é polimorfismo?", ["Ter várias classes no mesmo arquivo", "Tratar objetos diferentes pela mesma interface, cada um com seu comportamento", "Copiar código", "Usar muitos `if`"], 1, "O Checkout chama `pagar()` sem saber se é Pix ou cartão."),
      m("Qual destas é uma checked exception (o compilador obriga a tratar)?", ["`NullPointerException`", "`IllegalArgumentException`", "`IOException`", "`ArithmeticException`"], 2, "As outras são unchecked (filhas de `RuntimeException`)."),
      vf("O try-with-resources fecha automaticamente o recurso aberto, mesmo se ocorrer um erro.", true, "Funciona com qualquer classe que implemente `AutoCloseable`.")
    ],
    avancado: [
      m("Qual anotação transforma uma classe em controlador de API REST no Spring?", ["`@Service`", "`@RestController`", "`@Entity`", "`@Repository`"], 1, "Os retornos dos métodos viram JSON automaticamente."),
      l("Complete a anotação que liga um método a requisições GET:", c`@____("/produtos")
public List<Produto> listar() { ... }`, "GetMapping", "Há também `@PostMapping`, `@PutMapping` e `@DeleteMapping`."),
      m("Qual é a ordem comum das camadas em uma API Spring?", ["Repository → Controller → Service", "Controller → Service → Repository", "Service → Controller → Entity", "Entity → Controller → View"], 1, "O Controller recebe a requisição, o Service aplica as regras e o Repository acessa o banco."),
      m("O que faz `@Valid` em um `@RequestBody`?", ["Criptografa os dados", "Valida o objeto pelas anotações (`@NotBlank`, `@Positive`...)", "Salva no banco", "Gera documentação"], 1, "Dados inválidos resultam em resposta 400."),
      m("Qual anotação transforma uma classe em tabela no JPA?", ["`@Table`", "`@Entity`", "`@Column`", "`@Model`"], 1, "`@Table` só personaliza o nome da tabela."),
      m("O que o Spring Data gera para `findByUfOrderByNomeAsc(String uf)`?", ["Nada, dá erro", "Uma consulta filtrando pela UF e ordenando pelo nome", "Uma tabela nova", "Um índice"], 1, "As consultas são derivadas do nome do método."),
      m("O que é o problema N+1?", ["Um erro de compilação", "Uma consulta para a lista principal + uma consulta extra para cada item", "Ter N tabelas", "Um tipo de índice"], 1, "Resolve-se com `join fetch`, EntityGraph ou projeções."),
      l("Complete para criar um pool fixo de 4 threads:", c`ExecutorService pool = Executors.____(4);`, "newFixedThreadPool", "O pool reaproveita as threads para várias tarefas."),
      m("Qual classe incrementa um contador com segurança entre várias threads?", ["`Integer`", "`int`", "`AtomicInteger`", "`Counter`"], 2, "Use `incrementAndGet()`."),
      vf("As virtual threads do Java 21 são threads leves que permitem atender muitas tarefas simultâneas com código simples.", true, "São ideais para aplicações que passam muito tempo esperando I/O.")
    ]
  }
};
