const c = String.raw;

export default {
  id: "java",
  nome: "Java",
  icone: "☕",
  cor: "#b07219",
  dificuldade: 4,
  resumo: "Linguagem robusta e madura, que roda em qualquer lugar com a JVM. Move grande parte dos sistemas de bancos e grandes empresas.",
  mercado: "Uma das linguagens com mais vagas no Brasil: bancos, seguradoras, varejo e governo. Spring Boot é o framework mais pedido.",
  docs: [
    { nome: "Dev.java (oficial)", url: "https://dev.java/learn/", desc: "tutoriais oficiais da Oracle" },
    { nome: "Javadoc da API (Java 21)", url: "https://docs.oracle.com/en/java/javase/21/docs/api/" },
    { nome: "Spring Boot — guias", url: "https://spring.io/guides", desc: "passo a passo de cada recurso" },
    { nome: "Baeldung", url: "https://www.baeldung.com/", desc: "o site de referência para Java/Spring" }
  ],
  niveis: {
    basico: {
      objetivo: "escrever programas Java com tipos, decisões, laços e classes bem encapsuladas.",
      topicos: [
        {
          titulo: "Estrutura, tipos e o método main",
          crianca: `Em Java, tudo mora dentro de uma <b>casa chamada classe</b>. A porta de entrada é o método <code>main</code>: é por ali que o programa começa. Cada caixinha tem tipo fixo e <b>bem etiquetado</b>.`,
          codigo: c`
// Arquivo: Main.java  →  rode com: java Main.java
public class Main {
    public static void main(String[] args) {
        String nome = "Rafael";
        int idade = 35;
        double altura = 1.78;
        boolean ativo = true;
        var cidade = "Belo Horizonte";   // inferência (Java 10+)

        System.out.println("Olá, " + nome + "!");
        System.out.printf("%s tem %d anos e %.2f m%n", nome, idade, altura);

        // Para dinheiro, use BigDecimal (precisão exata)
        var preco = new java.math.BigDecimal("19.90");
        System.out.println(preco.multiply(java.math.BigDecimal.valueOf(3))); // 59.70
    }
}`,
          nota: "Instale o JDK 21 (LTS). Use IntelliJ IDEA Community ou VS Code com o pacote Java.",
          trabalho: `Em bancos, valores monetários <b>sempre</b> usam <code>BigDecimal</code>: <code>0.1 + 0.2</code> com <code>double</code> dá 0.30000000000000004. Esse detalhe já derrubou muito candidato em teste técnico.`,
          entrevista: {
            pergunta: "Qual a diferença entre JDK, JRE e JVM?",
            resposta: `<b>JVM</b> é a máquina virtual que executa o bytecode. <b>JRE</b> é a JVM + bibliotecas para rodar programas. <b>JDK</b> é o JRE + ferramentas de desenvolvimento (compilador <code>javac</code>, debugger). Para programar, você instala o JDK.`
          },
          busca: ["jdk jre jvm diferença", "java tipos primitivos", "java bigdecimal dinheiro"]
        },
        {
          titulo: "Condicionais, laços e Strings",
          crianca: `O <code>if</code> é o <b>porteiro</b> que deixa ou não deixa passar. O <code>for</code> é a <b>esteira</b> que passa item por item. Strings são <b>colares de letras</b>: você pode juntar, cortar e comparar.`,
          codigo: c`
int[] notas = {8, 5, 10, 3};
int aprovados = 0;

for (int nota : notas) {
    if (nota >= 6) aprovados++;
}
System.out.println("Aprovados: " + aprovados);

String status = switch (aprovados) {   // switch moderno (Java 14+)
    case 0 -> "Ninguém passou";
    case 1, 2 -> "Poucos aprovados";
    default -> "Turma boa!";
};

String email = "  Ana@Email.COM ";
String limpo = email.trim().toLowerCase();
System.out.println(limpo.equals("ana@email.com")); // true

// NUNCA compare Strings com ==
String a = new String("java");
System.out.println(a == "java");       // false (compara endereço)
System.out.println(a.equals("java"));  // true  (compara conteúdo)`,
          trabalho: `Normalizar e-mails e CPFs antes de salvar, validar regras de aprovação de crédito, percorrer itens de pedido. Para montar textos grandes dentro de laços, use <code>StringBuilder</code>.`,
          entrevista: {
            pergunta: "Por que String é imutável em Java? E quando usar StringBuilder?",
            resposta: `Imutável dá <b>segurança</b> (não muda depois de validada), permite o <b>pool de Strings</b> (reuso) e é thread-safe. Cada concatenação cria uma String nova, então em laços use <code>StringBuilder</code>, que é mutável e muito mais eficiente.`
          },
          busca: ["java string equals vs ==", "java stringbuilder", "java switch expression"]
        },
        {
          titulo: "Classes, objetos e encapsulamento",
          crianca: `A classe é o <b>molde do bolo</b>; cada bolo é um objeto. O encapsulamento é a <b>cobertura</b>: ninguém mexe no recheio direto, só pelos métodos que você deixou (getters e métodos de negócio).`,
          codigo: c`
public class ContaBancaria {
    private final String titular;
    private java.math.BigDecimal saldo = java.math.BigDecimal.ZERO;

    public ContaBancaria(String titular) {
        this.titular = titular;
    }

    public void depositar(java.math.BigDecimal valor) {
        if (valor.signum() <= 0) throw new IllegalArgumentException("Valor inválido");
        saldo = saldo.add(valor);
    }

    public java.math.BigDecimal getSaldo() { return saldo; }
    public String getTitular() { return titular; }
}

// record: classe de dados imutável em 1 linha (Java 16+)
public record ClienteDTO(String nome, String email) {}`,
          trabalho: `Entidades do sistema com regras protegidas: ninguém consegue fazer <code>conta.saldo = -1000</code>. Muitos projetos usam <b>Lombok</b> (<code>@Getter</code>, <code>@Builder</code>) para reduzir código repetitivo, mas é bom entender o que ele gera.`,
          entrevista: {
            pergunta: "Por que sobrescrever equals e hashCode juntos?",
            resposta: `Coleções como <code>HashMap</code> e <code>HashSet</code> usam o <code>hashCode</code> para achar o “balde” e o <code>equals</code> para comparar. Se dois objetos são iguais pelo <code>equals</code>, mas têm hashCodes diferentes, o <code>HashSet</code> aceita duplicados e o <code>get</code> do mapa falha. <code>record</code> já gera os dois.`
          },
          busca: ["java encapsulamento getters", "java equals hashcode contrato", "java record"]
        }
      ]
    },
    intermediario: {
      objetivo: "manipular coleções com Streams, aplicar herança e interfaces e tratar exceções corretamente.",
      topicos: [
        {
          titulo: "Collections e Streams",
          crianca: `<b>List</b> é uma fila (aceita repetidos e tem ordem). <b>Set</b> é um saquinho de figurinhas <b>sem repetidas</b>. <b>Map</b> é um armário com chaves. Os <b>Streams</b> são uma <b>esteira de fábrica</b>: filtra, transforma e empacota.`,
          codigo: c`
import java.util.*;
import java.util.stream.*;

record Venda(String vendedor, String uf, double valor) {}

List<Venda> vendas = List.of(
    new Venda("Ana", "SP", 1200), new Venda("Beto", "RJ", 300),
    new Venda("Ana", "SP", 450),  new Venda("Caio", "MG", 980));

List<Venda> grandes = vendas.stream()
    .filter(v -> v.valor() > 500)
    .sorted(Comparator.comparingDouble(Venda::valor).reversed())
    .toList();

Map<String, Double> totalPorVendedor = vendas.stream()
    .collect(Collectors.groupingBy(Venda::vendedor, Collectors.summingDouble(Venda::valor)));

Set<String> estados = vendas.stream().map(Venda::uf).collect(Collectors.toSet());

Optional<Venda> daBahia = vendas.stream().filter(v -> v.uf().equals("BA")).findFirst();
System.out.println(daBahia.map(Venda::vendedor).orElse("nenhuma"));`,
          trabalho: `Relatórios de vendas, deduplicação de clientes (Set) e cache em memória (Map). O <code>Optional</code> evita o famoso <b>NullPointerException</b>, que é o erro mais comum em produção Java.`,
          entrevista: {
            pergunta: "Qual a diferença entre ArrayList e LinkedList? E HashMap e TreeMap?",
            resposta: `<code>ArrayList</code> tem acesso por índice O(1) e é a melhor escolha na maioria dos casos; <code>LinkedList</code> é boa só para inserir e remover nas pontas. <code>HashMap</code> não garante ordem e tem acesso O(1); <code>TreeMap</code> mantém as chaves <b>ordenadas</b>, com O(log n).`
          },
          busca: ["java streams groupingby", "java optional boas práticas", "arraylist vs linkedlist"]
        },
        {
          titulo: "Herança, polimorfismo e interfaces",
          crianca: `Cachorro e gato são <b>animais</b>: os dois “fazem som”, mas cada um do seu jeito (au-au, miau). Isso é polimorfismo. A interface é um <b>contrato</b>: “quem assinar precisa saber pagar”, seja com Pix, cartão ou boleto.`,
          codigo: c`
public interface MeioPagamento {
    boolean pagar(double valor);
    default String recibo(double v) { return "Pago: R$ " + v; }
}

public class Pix implements MeioPagamento {
    public boolean pagar(double valor) {
        System.out.println("Gerando QR Code Pix de " + valor);
        return true;
    }
}

public class Cartao implements MeioPagamento {
    public boolean pagar(double valor) {
        System.out.println("Autorizando cartão: " + valor);
        return valor < 5000;
    }
}

// Polimorfismo: o checkout não sabe (nem precisa saber) qual é
public class Checkout {
    public void finalizar(MeioPagamento meio, double total) {
        if (meio.pagar(total)) System.out.println(meio.recibo(total));
    }
}`,
          trabalho: `Adicionar “pagamento por boleto” sem mexer no checkout: basta criar <code>class Boleto implements MeioPagamento</code>. É exatamente assim que sistemas de e-commerce e de bancos crescem.`,
          entrevista: {
            pergunta: "Qual a diferença entre classe abstrata e interface?",
            resposta: `Uma classe só pode <b>estender uma</b> classe (abstrata ou não), mas pode <b>implementar várias</b> interfaces. A classe abstrata pode ter estado (atributos) e construtor; a interface define um contrato (e pode ter métodos <code>default</code>). Prefira interfaces e use “composição em vez de herança”.`
          },
          busca: ["java interface vs abstract class", "polimorfismo java exemplo", "composição vs herança"]
        },
        {
          titulo: "Exceções",
          crianca: `Exceções são <b>alarmes</b>. Alguns são obrigatórios de atender, como o alarme de incêndio (<b>checked</b>: o compilador obriga a tratar). Outros tocam por descuido, como esquecer a porta aberta (<b>unchecked</b>: erros de programação).`,
          codigo: c`
public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String msg) { super(msg); }
}

public void sacar(double valor) {
    if (valor > saldo) throw new SaldoInsuficienteException("Saldo: " + saldo);
    saldo -= valor;
}

// try-with-resources: fecha o arquivo sozinho
import java.nio.file.*;
try (var linhas = Files.lines(Path.of("clientes.csv"))) {
    linhas.skip(1).forEach(System.out::println);
} catch (java.io.IOException e) {          // checked: obrigatório tratar
    log.error("Falha ao ler arquivo", e);   // registre a causa!
} finally {
    System.out.println("Fim da leitura");
}`,
          trabalho: `No Spring, um <code>@RestControllerAdvice</code> converte <code>SaldoInsuficienteException</code> em uma resposta HTTP 422 com mensagem amigável. Engolir exceção (<code>catch (Exception e) {}</code>) é motivo de reprovação em code review.`,
          entrevista: {
            pergunta: "Qual a diferença entre checked e unchecked exceptions?",
            resposta: `<b>Checked</b> (herdam de <code>Exception</code>, como <code>IOException</code>) precisam ser tratadas ou declaradas com <code>throws</code>; representam falhas externas recuperáveis. <b>Unchecked</b> (herdam de <code>RuntimeException</code>, como <code>NullPointerException</code>) não são obrigatórias e geralmente indicam bug ou regra de negócio violada.`
          },
          busca: ["checked vs unchecked exceptions", "java try with resources", "spring controlleradvice exception handler"]
        }
      ]
    },
    avancado: {
      objetivo: "criar APIs REST com Spring Boot, persistir dados com JPA e lidar com concorrência.",
      topicos: [
        {
          titulo: "API REST com Spring Boot",
          crianca: `O Spring Boot é um <b>kit de montar restaurante</b>: já vem com cozinha, garçons e caixa. Você só escreve o cardápio (os endpoints) e a receita (a regra de negócio).`,
          codigo: c`
// Crie em https://start.spring.io (Web, Validation, JPA, PostgreSQL/MySQL)
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService service;
    public ProdutoController(ProdutoService service) { this.service = service; } // injeção

    @GetMapping
    public List<ProdutoDTO> listar() { return service.listar(); }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscar(@PathVariable Long id) {
        return service.buscar(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> criar(@RequestBody @Valid ProdutoDTO dto) {
        var salvo = service.criar(dto);
        return ResponseEntity.created(URI.create("/produtos/" + salvo.id())).body(salvo);
    }
}

public record ProdutoDTO(Long id, @NotBlank String nome, @Positive BigDecimal preco) {}`,
          trabalho: `É o dia a dia de 8 em cada 10 vagas Java: criar endpoints, validar a entrada (<code>@Valid</code>) e separar em camadas <b>Controller → Service → Repository</b>.`,
          entrevista: {
            pergunta: "O que é injeção de dependência e IoC no Spring?",
            resposta: `<b>Inversão de Controle</b>: o Spring (o container) cria e gerencia os objetos (beans), em vez de você dar <code>new</code>. <b>Injeção de dependência</b> é ele entregar as dependências prontas, de preferência pelo <b>construtor</b>. Isso facilita testes e o desacoplamento.`
          },
          busca: ["spring boot rest api tutorial", "spring initializr", "spring boot validation @valid"]
        },
        {
          titulo: "Persistência com JPA / Hibernate",
          crianca: `O JPA é um <b>tradutor</b> entre os objetos Java e as tabelas do banco. Você diz <code>repository.save(cliente)</code> e ele escreve o <code>INSERT</code> para você.`,
          codigo: c`
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String uf;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();
    // getters/setters...
}

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByUfOrderByNomeAsc(String uf);   // SQL gerado pelo nome!

    @Query("select c from Cliente c join fetch c.pedidos where c.id = :id")
    Optional<Cliente> buscarComPedidos(Long id);       // evita N+1
}

// application.properties
// spring.jpa.show-sql=true   ← veja o SQL gerado`,
          trabalho: `CRUDs, buscas com filtros e relatórios. Problemas reais: consultas lentas por <b>N+1</b>, <code>LazyInitializationException</code> e migrations com <b>Flyway</b> ou <b>Liquibase</b> no deploy.`,
          entrevista: {
            pergunta: "Qual a diferença entre FetchType.LAZY e EAGER?",
            resposta: `<b>LAZY</b> carrega o relacionamento só quando ele é acessado (padrão em <code>@OneToMany</code>). <b>EAGER</b> carrega junto sempre. EAGER pode trazer dados demais; LAZY pode causar N+1 ou <code>LazyInitializationException</code> fora da transação. A solução costuma ser LAZY + <code>join fetch</code> ou EntityGraph quando precisar.`
          },
          busca: ["spring data jpa query methods", "jpa n+1 join fetch", "flyway spring boot"]
        },
        {
          titulo: "Concorrência e threads",
          crianca: `Threads são <b>vários cozinheiros</b> na mesma cozinha. Rendem mais, mas se dois pegarem a mesma panela ao mesmo tempo, dá confusão. Precisamos de regras: “um de cada vez nesta panela” (<code>synchronized</code>) ou panelas especiais que aguentam todo mundo (<code>ConcurrentHashMap</code>).`,
          codigo: c`
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

ExecutorService pool = Executors.newFixedThreadPool(4);
// Java 21: Executors.newVirtualThreadPerTaskExecutor() — milhares de threads leves

AtomicInteger processados = new AtomicInteger();   // contador seguro
List<Future<String>> futuros = new ArrayList<>();

for (int i = 1; i <= 10; i++) {
    final int id = i;
    futuros.add(pool.submit(() -> {
        Thread.sleep(300);                // simula chamada externa
        processados.incrementAndGet();
        return "Cliente " + id + " ok";
    }));
}

for (Future<String> f : futuros) System.out.println(f.get());
pool.shutdown();
System.out.println("Total: " + processados.get());

// Assíncrono encadeado
CompletableFuture.supplyAsync(() -> "dados")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println);`,
          trabalho: `Processar lotes de boletos, consultar vários serviços em paralelo e jobs agendados (<code>@Scheduled</code>). As <b>virtual threads</b> do Java 21 são tema quente em entrevistas atuais.`,
          entrevista: {
            pergunta: "O que é race condition e como evitar em Java?",
            resposta: `Duas threads lendo e escrevendo o mesmo dado sem coordenação, causando resultados errados (por exemplo, um contador perdendo incrementos). Evita-se com <code>synchronized</code>/<code>Lock</code>, classes atômicas (<code>AtomicInteger</code>), coleções concorrentes (<code>ConcurrentHashMap</code>) ou, melhor ainda, objetos <b>imutáveis</b>.`
          },
          busca: ["java executorservice exemplo", "java virtual threads", "completablefuture tutorial"]
        }
      ]
    }
  }
};
