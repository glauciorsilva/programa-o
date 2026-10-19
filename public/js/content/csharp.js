const c = String.raw;

export default {
  id: "csharp",
  nome: "C#",
  icone: "🟣",
  cor: "#68217a",
  dificuldade: 4,
  resumo: "Linguagem da Microsoft (.NET) para sistemas corporativos, APIs, aplicativos desktop e jogos com Unity.",
  mercado: "Muito forte no Brasil em bancos, seguradoras, governo, ERPs e indústria. Também é a porta de entrada para jogos com Unity.",
  docs: [
    { nome: "Microsoft Learn — C#", url: "https://learn.microsoft.com/pt-br/dotnet/csharp/", desc: "documentação oficial em português" },
    { nome: "ASP.NET Core", url: "https://learn.microsoft.com/pt-br/aspnet/core/" },
    { nome: "Entity Framework Core", url: "https://learn.microsoft.com/pt-br/ef/core/" },
    { nome: "NuGet", url: "https://www.nuget.org/", desc: "pacotes/bibliotecas do .NET" }
  ],
  niveis: {
    basico: {
      objetivo: "escrever programas de console em C# com variáveis, decisões, repetições e classes.",
      topicos: [
        {
          titulo: "Variáveis, tipos e console",
          crianca: `C# é como um <b>armário com caixas de tamanhos certos</b>: a caixa de número inteiro (<code>int</code>) não aceita texto, e a de dinheiro (<code>decimal</code>) é bem precisa para não sumir nenhum centavo.`,
          codigo: c`
// dotnet new console -n MeuApp && cd MeuApp && dotnet run
string nome = "Paula";
int idade = 32;
decimal salario = 5250.75m;   // decimal para dinheiro (sufixo m)
bool ativo = true;
var cidade = "Salvador";      // var deduz o tipo (string)

Console.WriteLine($"{nome}, {idade} anos, salário {salario:C}");

Console.Write("Digite um número: ");
if (int.TryParse(Console.ReadLine(), out int numero))
    Console.WriteLine($"O dobro é {numero * 2}");
else
    Console.WriteLine("Isso não é um número!");`,
          trabalho: `Em sistemas financeiros, usar <code>double</code> para dinheiro gera erros de centavos; o padrão é <code>decimal</code>. O <code>TryParse</code> evita que o sistema quebre quando o usuário digita algo inválido.`,
          entrevista: {
            pergunta: "Qual a diferença entre tipos de valor e tipos de referência em C#?",
            resposta: `<b>Tipos de valor</b> (<code>int</code>, <code>decimal</code>, <code>bool</code>, <code>struct</code>) guardam o próprio dado, e a cópia é independente. <b>Tipos de referência</b> (<code>class</code>, <code>string</code>, arrays) guardam um endereço: duas variáveis podem apontar para o mesmo objeto.`
          },
          busca: ["c# tipos de dados", "c# decimal vs double", "c# string interpolation"]
        },
        {
          titulo: "Condições e laços",
          crianca: `O <code>if</code> é a <b>bifurcação na trilha</b>; o <code>switch</code> é um <b>painel de botões</b> (cada botão leva a um lugar); o <code>for</code> e o <code>foreach</code> são dar voltas na pista contando cada uma.`,
          codigo: c`
decimal total = 350m;
string tipo = "vip";

decimal desconto = tipo switch      // switch expression (moderno)
{
    "vip" => 0.15m,
    "funcionario" => 0.20m,
    _ => total > 300 ? 0.05m : 0m
};
Console.WriteLine($"Desconto: {desconto:P0}");

var notas = new List<double> { 7.5, 8, 4.5, 9 };
foreach (var n in notas)
{
    if (n < 5) { Console.WriteLine($"Nota baixa: {n}"); continue; }
    Console.WriteLine(n);
}

for (int i = 3; i > 0; i--) Console.WriteLine($"Contagem: {i}");`,
          trabalho: `Tabela de descontos por tipo de cliente, cálculo de comissão por faixa de vendas, processamento de cada item de uma nota fiscal. A <b>switch expression</b> deixa as regras de negócio legíveis.`,
          entrevista: {
            pergunta: "Qual a diferença entre for e foreach?",
            resposta: `<code>for</code> usa um índice e dá controle total (pular itens, andar de trás para frente). <code>foreach</code> percorre qualquer <code>IEnumerable</code> de forma mais simples e segura, mas não permite alterar a coleção durante o laço.`
          },
          busca: ["c# switch expression", "c# foreach list", "c# pattern matching"]
        },
        {
          titulo: "Classes e objetos",
          crianca: `A classe é a <b>planta da casa</b> e o objeto é a casa construída. Propriedades são as características (cor, número de quartos); métodos são o que a casa faz (abrir o portão).`,
          codigo: c`
public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public decimal Preco { get; private set; }  // só a classe altera

    public Produto(string nome, decimal preco)
    {
        Nome = nome;
        AlterarPreco(preco);
    }

    public void AlterarPreco(decimal novo)
    {
        if (novo <= 0) throw new ArgumentException("Preço inválido");
        Preco = novo;
    }
}

// record: ótimo para dados imutáveis (DTOs)
public record ClienteDto(string Nome, string Email);

var p = new Produto("Mouse", 89.90m);
p.AlterarPreco(79.90m);
var dto = new ClienteDto("Ana", "ana@email.com");`,
          trabalho: `Entidades do domínio (<code>Pedido</code>, <code>Cliente</code>, <code>NotaFiscal</code>) com validação dentro da própria classe garantem que nenhum preço negativo entre no sistema. <code>record</code> é muito usado para os dados que entram e saem da API (DTOs).`,
          entrevista: {
            pergunta: "Qual a diferença entre class, struct e record?",
            resposta: `<code>class</code> é tipo referência e mutável por padrão. <code>struct</code> é tipo valor, para dados pequenos. <code>record</code> (normalmente referência) tem <b>igualdade por valor</b>, sintaxe curta e cópia com <code>with</code>, sendo ideal para dados imutáveis.`
          },
          busca: ["c# class properties get set", "c# record vs class", "c# constructor"]
        }
      ]
    },
    intermediario: {
      objetivo: "consultar coleções com LINQ, escrever código assíncrono e organizar o código com interfaces e injeção de dependência.",
      topicos: [
        {
          titulo: "Coleções e LINQ",
          crianca: `LINQ é <b>fazer perguntas para uma pilha de figurinhas</b>: “me dá só as douradas”, “ordena pelo número”, “quantas tem de cada time?”. E você pergunta quase em português.`,
          codigo: c`
var vendas = new List<Venda>
{
    new("Ana", "SP", 1200m), new("Beto", "RJ", 300m),
    new("Ana", "SP", 450m),  new("Carla", "MG", 980m)
};

var acimaDe500 = vendas.Where(v => v.Valor > 500).ToList();

var porVendedor = vendas
    .GroupBy(v => v.Vendedor)
    .Select(g => new { Vendedor = g.Key, Total = g.Sum(v => v.Valor) })
    .OrderByDescending(x => x.Total);

foreach (var x in porVendedor)
    Console.WriteLine($"{x.Vendedor}: {x.Total:C}");

bool temRJ = vendas.Any(v => v.Uf == "RJ");
var primeira = vendas.FirstOrDefault(v => v.Uf == "BA"); // null se não achar

record Venda(string Vendedor, string Uf, decimal Valor);`,
          trabalho: `Ranking de vendedores, filtrar pedidos atrasados, montar relatórios. Com o Entity Framework, o mesmo LINQ <b>vira SQL</b> automaticamente, então é a habilidade mais usada no dia a dia de C#.`,
          entrevista: {
            pergunta: "Qual a diferença entre IEnumerable e IQueryable?",
            resposta: `<code>IEnumerable</code> executa o filtro <b>em memória</b> (os dados já foram carregados). <code>IQueryable</code> monta uma expressão que é traduzida e executada <b>no banco</b> (via EF Core). Chamar <code>.ToList()</code> cedo demais traz a tabela inteira para a memória.`
          },
          busca: ["c# linq groupby sum", "ienumerable vs iqueryable", "linq first vs firstordefault"]
        },
        {
          titulo: "Exceções e async/await",
          crianca: `<code>try/catch</code> é o <b>airbag</b>: se bater, ele protege e você decide o que fazer. <code>async/await</code> é colocar a roupa na máquina de lavar e ir fazer outra coisa enquanto ela trabalha, em vez de ficar parado olhando.`,
          codigo: c`
using System.Net.Http.Json;

public class CepService
{
    private readonly HttpClient _http = new();

    public async Task<Endereco?> BuscarAsync(string cep)
    {
        try
        {
            return await _http.GetFromJsonAsync<Endereco>(
                $"https://viacep.com.br/ws/{cep}/json/");
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Falha de rede: {ex.Message}");
            return null;
        }
        finally
        {
            Console.WriteLine("Consulta finalizada"); // sempre executa
        }
    }
}

public record Endereco(string Logradouro, string Localidade, string Uf);

// var end = await new CepService().BuscarAsync("01001000");`,
          trabalho: `Chamadas a APIs de pagamento, banco de dados e arquivos são <b>sempre async</b> em ASP.NET, para o servidor atender milhares de pessoas sem travar. Erros devem ser capturados e <b>logados</b>, nunca engolidos com um <code>catch { }</code> vazio.`,
          entrevista: {
            pergunta: "Por que não usar .Result ou .Wait() em uma Task?",
            resposta: `Bloqueiam a thread enquanto esperam e podem causar <b>deadlock</b> (principalmente em apps com contexto de sincronização) e perda de escalabilidade. O correto é usar <code>async/await</code> “de ponta a ponta”.`
          },
          busca: ["c# async await boas práticas", "c# try catch finally", "httpclient getfromjsonasync"]
        },
        {
          titulo: "Interfaces e injeção de dependência",
          crianca: `Em vez de a sua classe <b>fabricar</b> as próprias ferramentas, alguém (o “container”) <b>entrega</b> a ferramenta pronta. Se amanhã você quiser outra marca de martelo, troca na entrega e a classe nem percebe.`,
          codigo: c`
public interface IEmailService
{
    Task EnviarAsync(string para, string assunto, string corpo);
}

public class SmtpEmailService : IEmailService
{
    public Task EnviarAsync(string para, string assunto, string corpo)
    {
        Console.WriteLine($"Enviando para {para}: {assunto}");
        return Task.CompletedTask;
    }
}

public class PedidoService
{
    private readonly IEmailService _email;
    public PedidoService(IEmailService email) => _email = email; // recebe pronto

    public Task FinalizarAsync(string cliente) =>
        _email.EnviarAsync(cliente, "Pedido confirmado", "Obrigado!");
}

// Program.cs (ASP.NET Core)
// builder.Services.AddScoped<IEmailService, SmtpEmailService>();
// builder.Services.AddScoped<PedidoService>();`,
          trabalho: `Todo projeto ASP.NET Core é organizado assim. Nos testes, você passa um <b>IEmailService falso</b> (com Moq ou NSubstitute) e testa o <code>PedidoService</code> sem enviar e-mail de verdade.`,
          entrevista: {
            pergunta: "Qual a diferença entre AddSingleton, AddScoped e AddTransient?",
            resposta: `<b>Singleton</b>: uma instância para a aplicação inteira. <b>Scoped</b>: uma por requisição HTTP (padrão para serviços com DbContext). <b>Transient</b>: uma nova a cada vez que é pedida. Injetar Scoped dentro de Singleton é um erro clássico.`
          },
          busca: ["asp.net core dependency injection", "addscoped vs addtransient vs addsingleton", "moq c# tutorial"]
        }
      ]
    },
    avancado: {
      objetivo: "construir uma Web API completa com banco de dados e aplicar boas práticas de arquitetura.",
      topicos: [
        {
          titulo: "Web API com ASP.NET Core",
          crianca: `O ASP.NET Core é uma <b>fábrica de garçons</b> super-rápidos. Você só diz: “quando pedirem /produtos, entregue a lista”. Ele cuida de todo o resto (rede, JSON, segurança).`,
          codigo: c`
// dotnet new web -n LojaApi
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

var produtos = new List<Produto> { new(1, "Monitor", 899m) };

app.MapGet("/produtos", () => produtos);

app.MapGet("/produtos/{id:int}", (int id) =>
    produtos.FirstOrDefault(p => p.Id == id) is { } p
        ? Results.Ok(p)
        : Results.NotFound());

app.MapPost("/produtos", (Produto p) =>
{
    if (p.Preco <= 0) return Results.BadRequest("Preço inválido");
    produtos.Add(p);
    return Results.Created($"/produtos/{p.Id}", p);
});

app.Run();

record Produto(int Id, string Nome, decimal Preco);`,
          trabalho: `APIs internas de bancos, integrações com ERP e back-end de aplicativos. O <b>Swagger</b> (em <code>/swagger</code>) documenta tudo para o time de front-end e mobile.`,
          entrevista: {
            pergunta: "O que é o pipeline de middlewares no ASP.NET Core?",
            resposta: `É a sequência de componentes que cada requisição atravessa (autenticação, CORS, log, tratamento de erros, roteamento). A <b>ordem importa</b>: por exemplo, <code>UseAuthentication</code> deve vir antes de <code>UseAuthorization</code>.`
          },
          busca: ["asp.net core minimal api", "asp.net core middleware order", "swagger .net"]
        },
        {
          titulo: "Entity Framework Core",
          crianca: `O EF Core é um <b>tradutor</b>: você fala C# (“me dá os clientes de SP”) e ele traduz para a língua do banco de dados (SQL). Também cria e atualiza as tabelas para você com as <b>migrations</b>.`,
          codigo: c`
// dotnet add package Microsoft.EntityFrameworkCore.SqlServer
// dotnet add package Microsoft.EntityFrameworkCore.Design
using Microsoft.EntityFrameworkCore;

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string Uf { get; set; } = "";
    public List<Pedido> Pedidos { get; set; } = new();
}
public class Pedido { public int Id { get; set; } public decimal Valor { get; set; } public int ClienteId { get; set; } }

public class LojaContext(DbContextOptions<LojaContext> opt) : DbContext(opt)
{
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Pedido> Pedidos => Set<Pedido>();
}

// Consulta (vira SELECT ... JOIN ... WHERE)
// var top = await db.Clientes
//     .Where(c => c.Uf == "SP")
//     .Include(c => c.Pedidos)
//     .AsNoTracking()
//     .ToListAsync();

// dotnet ef migrations add Inicial  →  dotnet ef database update`,
          trabalho: `CRUD de cadastros, relatórios e versionamento do banco com migrations no deploy. Saber ler o SQL gerado (com logging) é essencial para achar consultas lentas.`,
          entrevista: {
            pergunta: "O que é o problema N+1 e como evitar no EF Core?",
            resposta: `Acontece quando você busca N registros e depois faz <b>uma consulta extra para cada um</b> (por exemplo, os pedidos de cada cliente dentro de um laço). Evita-se com <code>Include</code> (eager loading), projeção com <code>Select</code> ou uma consulta única. Use <code>AsNoTracking</code> em consultas somente leitura.`
          },
          busca: ["ef core migrations", "ef core include n+1", "asnotracking ef core"]
        },
        {
          titulo: "SOLID e testes com xUnit",
          crianca: `SOLID são <b>5 combinados</b> para o código não virar um quarto bagunçado: cada brinquedo na sua caixa, dá para colocar brinquedo novo sem desmontar os antigos, e assim por diante. Testes são a <b>vistoria</b> que confere se tudo está no lugar.`,
          codigo: c`
// S - Responsabilidade única: cada classe faz uma coisa
// O - Aberto para extensão, fechado para modificação
// L - Substituição de Liskov: subtipos funcionam no lugar do tipo base
// I - Interfaces pequenas e específicas
// D - Dependa de abstrações (interfaces), não de implementações

public interface IRegraDesconto { decimal Aplicar(decimal valor); }
public class DescontoVip : IRegraDesconto { public decimal Aplicar(decimal v) => v * 0.9m; }
public class SemDesconto : IRegraDesconto { public decimal Aplicar(decimal v) => v; }
// Nova regra? Crie outra classe; não mexa nas existentes (O de SOLID)

// Teste (dotnet new xunit)
public class DescontoTests
{
    [Theory]
    [InlineData(100, 90)]
    [InlineData(0, 0)]
    public void Vip_aplica_10_por_cento(decimal entrada, decimal esperado)
    {
        var regra = new DescontoVip();
        Assert.Equal(esperado, regra.Aplicar(entrada));
    }
}`,
          trabalho: `Entrevistas de pleno e sênior em .NET quase sempre perguntam SOLID e pedem um exemplo real. Em code review, “essa classe faz coisa demais” é o comentário mais comum, e é o S de SOLID.`,
          entrevista: {
            pergunta: "Explique o Princípio da Inversão de Dependência com um exemplo.",
            resposta: `Módulos de alto nível não devem depender de detalhes, mas de <b>abstrações</b>. Exemplo: <code>PedidoService</code> depende de <code>IEmailService</code>, e não de <code>SmtpEmailService</code>. Assim dá para trocar SMTP por SendGrid ou usar um mock no teste sem alterar o serviço.`
          },
          busca: ["solid c# exemplos", "xunit theory inlinedata", "clean architecture .net"]
        }
      ]
    }
  }
};
