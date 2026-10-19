import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>C# (lê-se “C sharp”) é uma linguagem da Microsoft que roda na plataforma <b>.NET</b>. Para começar, instale o <b>.NET SDK</b>; o comando <code>dotnet new console</code> cria um projeto e <code>dotnet run</code> o executa. Nas versões modernas, o arquivo <code>Program.cs</code> pode ter o código direto, sem precisar escrever a classe e o método <code>Main</code> (são as <i>top-level statements</i>).</p>
<p>C# tem <b>tipagem estática</b>: cada variável tem um tipo definido na declaração (<code>int</code>, <code>double</code>, <code>decimal</code>, <code>string</code>, <code>bool</code>, <code>char</code>, <code>DateTime</code>). A palavra <code>var</code> deixa o compilador deduzir o tipo, mas ele continua fixo. Toda instrução termina com ponto e vírgula e os blocos ficam entre chaves.</p>
<p>Para dinheiro, use <code>decimal</code> (com sufixo <code>m</code>: <code>19.90m</code>), que guarda valores decimais exatos. A <b>interpolação de strings</b> (<code>$"Olá {nome}"</code>) monta textos com variáveis e aceita formatos: <code>{valor:C}</code> (moeda), <code>{x:N2}</code> (2 casas), <code>{data:dd/MM/yyyy}</code>. Para converter texto em número com segurança, use <code>int.TryParse</code>, que não lança erro se o texto for inválido.</p>`,
      partes: [
        [c`// dotnet new console -n MeuApp && cd MeuApp && dotnet run`, "Cria o projeto MeuApp, entra na pasta e executa."],
        [c`string nome = "Paula";`, "Variável de texto. O tipo vem antes do nome."],
        [c`int idade = 32;`, "Número inteiro."],
        [c`decimal salario = 5250.75m;`, "Valor monetário exato. O `m` indica que o número é `decimal`."],
        [c`var cidade = "Salvador";`, "O compilador deduz que é `string`; o tipo não muda depois."],
        [c`Console.WriteLine($"{nome}, {idade} anos, salário {salario:C}");`, "Imprime com interpolação. `:C` formata como moeda, conforme o idioma do computador."],
        [c`if (int.TryParse(Console.ReadLine(), out int numero))`, "Lê o que foi digitado e tenta converter para inteiro. Se der certo, guarda em `numero` e devolve `true`."],
        [c`else Console.WriteLine("Isso não é um número!");`, "Se a conversão falhar, avisa em vez de quebrar o programa."]
      ]
    },
    b2: {
      detalhes: `<p>As decisões em C# usam <code>if</code>, <code>else if</code> e <code>else</code>, com a condição sempre entre parênteses. Os operadores lógicos são <code>&amp;&amp;</code> (e), <code>||</code> (ou) e <code>!</code> (não). O ternário <code>condição ? a : b</code> escolhe um valor em uma linha.</p>
<p>A <b>switch expression</b> (C# 8+) é uma forma moderna e enxuta de escolher um valor entre vários casos: <code>valor switch { padrão =&gt; resultado, ..., _ =&gt; padrãoGeral }</code>. O <code>_</code> é o “caso contrário”. Ela aceita <b>padrões</b> como comparações (<code>&gt;= 9</code>), tipos e combinações com <code>and</code>/<code>or</code>, deixando regras de negócio muito legíveis.</p>
<p>Os laços são: <code>for</code> (com contador), <code>foreach</code> (percorre cada item de uma coleção), <code>while</code> (repete enquanto a condição for verdadeira) e <code>do...while</code> (executa ao menos uma vez). Dentro de laços, <code>continue</code> pula para a próxima volta e <code>break</code> encerra o laço.</p>`,
      partes: [
        [c`decimal desconto = tipo switch`, "Switch expression: o resultado é atribuído a `desconto`."],
        [c`"vip" => 0.15m,`, "Se `tipo` for \"vip\", o desconto é 15%."],
        [c`"funcionario" => 0.20m,`, "Se for \"funcionario\", 20%."],
        [c`_ => total > 300 ? 0.05m : 0m`, "Qualquer outro caso: 5% se o total passar de 300, senão 0."],
        [c`Console.WriteLine($"Desconto: {desconto:P0}");`, "`:P0` formata como porcentagem sem casas decimais (15%)."],
        [c`var notas = new List<double> { 7.5, 8, 4.5, 9 };`, "Cria uma lista já com valores."],
        [c`foreach (var n in notas)`, "Percorre cada nota."],
        [c`if (n < 5) { …; continue; }`, "Para notas baixas, imprime o aviso e pula direto para a próxima volta."],
        [c`for (int i = 3; i > 0; i--)`, "Contador que começa em 3 e diminui até 1."]
      ]
    },
    b3: {
      detalhes: `<p>Em C#, quase tudo é organizado em <b>classes</b>. A classe é o modelo; os <b>objetos</b> são criados com <code>new</code>. Uma classe tem <b>propriedades</b> (dados), <b>métodos</b> (ações) e <b>construtores</b> (que preparam o objeto ao ser criado).</p>
<p>As propriedades com <code>{ get; set; }</code> são chamadas <b>auto-properties</b>: o C# cria por trás um campo para guardar o valor. Com <code>private set</code>, qualquer um pode ler, mas só a própria classe pode alterar. Isso é <b>encapsulamento</b>: o preço só muda pelo método <code>AlterarPreco</code>, que valida a regra. Os modificadores de acesso são <code>public</code>, <code>private</code>, <code>protected</code> e <code>internal</code>.</p>
<p>O <b>record</b> é um tipo especial para dados: com uma linha você declara as propriedades, e ele já vem com igualdade por valor (dois records com os mesmos dados são iguais), <code>ToString</code> legível e cópia com alteração (<code>with</code>). É ideal para DTOs, os objetos que transportam dados entre a API e o sistema.</p>`,
      partes: [
        [c`public class Produto {`, "Define a classe pública `Produto`."],
        [c`public int Id { get; set; }`, "Propriedade que pode ser lida e alterada de fora."],
        [c`public string Nome { get; set; } = "";`, "Começa com texto vazio, evitando `null`."],
        [c`public decimal Preco { get; private set; }`, "Leitura pública, alteração só dentro da classe."],
        [c`public Produto(string nome, decimal preco) {`, "Construtor: roda no `new` e exige nome e preço."],
        [c`AlterarPreco(preco);`, "Reaproveita a validação de preço já no construtor."],
        [c`if (novo <= 0) throw new ArgumentException("Preço inválido");`, "Impede preços zerados ou negativos."],
        [c`public record ClienteDto(string Nome, string Email);`, "Record: classe de dados declarada em uma linha."],
        [c`var p = new Produto("Mouse", 89.90m);`, "Cria um objeto com o construtor."]
      ]
    },
    i1: {
      detalhes: `<p>As coleções mais usadas em C# estão em <code>System.Collections.Generic</code>: <code>List&lt;T&gt;</code> (lista que cresce), <code>Dictionary&lt;TChave, TValor&gt;</code> (pares chave/valor) e <code>HashSet&lt;T&gt;</code> (conjunto sem repetidos). O <code>&lt;T&gt;</code> indica o tipo dos itens; isso se chama <b>genéricos</b>.</p>
<p>O <b>LINQ</b> (<i>Language Integrated Query</i>) é um conjunto de métodos para consultar coleções de forma declarativa: <code>Where</code> (filtrar), <code>Select</code> (transformar), <code>OrderBy</code>/<code>OrderByDescending</code> (ordenar), <code>GroupBy</code> (agrupar), <code>Sum</code>, <code>Count</code>, <code>Average</code>, <code>Max</code>, <code>Any</code>, <code>All</code>, <code>First</code>/<code>FirstOrDefault</code>. Os métodos recebem <b>expressões lambda</b> (<code>v =&gt; v.Valor &gt; 500</code>).</p>
<p>Muitas consultas LINQ têm <b>execução adiada</b>: elas só rodam quando o resultado é usado, por exemplo em um <code>foreach</code> ou ao chamar <code>ToList()</code>. Com o Entity Framework, a mesma sintaxe LINQ é traduzida para SQL e executada no banco de dados.</p>`,
      partes: [
        [c`var vendas = new List<Venda> { new("Ana", "SP", 1200m), … };`, "Lista de vendas. `new(...)` deduz o tipo `Venda` pela lista."],
        [c`vendas.Where(v => v.Valor > 500).ToList();`, "Filtra vendas acima de 500 e materializa o resultado em uma lista."],
        [c`.GroupBy(v => v.Vendedor)`, "Agrupa as vendas por vendedor."],
        [c`.Select(g => new { Vendedor = g.Key, Total = g.Sum(v => v.Valor) })`, "Para cada grupo, cria um objeto com o nome (`Key`) e a soma das vendas."],
        [c`.OrderByDescending(x => x.Total);`, "Ordena do maior total para o menor."],
        [c`bool temRJ = vendas.Any(v => v.Uf == "RJ");`, "`true` se existir ao menos uma venda do RJ."],
        [c`var primeira = vendas.FirstOrDefault(v => v.Uf == "BA");`, "Primeira venda da BA, ou `null` se não houver."],
        [c`record Venda(string Vendedor, string Uf, decimal Valor);`, "Tipo de dados usado na lista."]
      ]
    },
    i2: {
      detalhes: `<p><b>Exceções</b> são erros que interrompem o fluxo normal. Envolvemos o código que pode falhar em <code>try</code>; cada <code>catch (TipoDeExceção ex)</code> trata um tipo específico de erro; o <code>finally</code> executa sempre, com ou sem erro. Para criar seus próprios erros, use <code>throw new TipoDeExceção("mensagem")</code>. Nunca deixe um <code>catch</code> vazio: no mínimo, registre o erro em log.</p>
<p>Operações de entrada e saída (internet, banco de dados, arquivos) são lentas comparadas ao processador. Com <code>async</code>/<code>await</code>, o programa espera essas operações <b>sem bloquear</b> a thread, que pode atender outras tarefas enquanto isso. Um método assíncrono devolve <code>Task</code> ou <code>Task&lt;T&gt;</code> e, por convenção, tem nome terminado em <code>Async</code>.</p>
<p>O <code>HttpClient</code> faz requisições HTTP; os métodos de extensão como <code>GetFromJsonAsync&lt;T&gt;</code> já fazem a requisição e convertem o JSON no tipo informado. O <code>?</code> em <code>Endereco?</code> indica que o valor pode ser <code>null</code> (tipos anuláveis).</p>`,
      partes: [
        [c`using System.Net.Http.Json;`, "Importa os métodos que leem e enviam JSON pelo `HttpClient`."],
        [c`private readonly HttpClient _http = new();`, "Cliente HTTP; `readonly` impede trocar a instância depois de criada."],
        [c`public async Task<Endereco?> BuscarAsync(string cep)`, "Método assíncrono que vai devolver um `Endereco` ou `null`."],
        [c`return await _http.GetFromJsonAsync<Endereco>($"https://viacep.com.br/ws/{cep}/json/");`, "Faz o GET, espera sem bloquear e converte o JSON em `Endereco`."],
        [c`catch (HttpRequestException ex)`, "Trata apenas falhas de rede/HTTP."],
        [c`Console.WriteLine($"Falha de rede: {ex.Message}"); return null;`, "Registra a mensagem e devolve `null`."],
        [c`finally { Console.WriteLine("Consulta finalizada"); }`, "Executa sempre, com ou sem erro."],
        [c`public record Endereco(string Logradouro, string Localidade, string Uf);`, "Formato dos dados esperados da API."]
      ]
    },
    i3: {
      detalhes: `<p>Uma <b>interface</b> define o que uma classe deve saber fazer (métodos), sem dizer como. Por convenção, o nome começa com <code>I</code> (<code>IEmailService</code>). Classes que implementam a interface podem ser usadas no lugar dela, o que permite trocar implementações sem mudar quem as usa.</p>
<p>A <b>injeção de dependência</b> (DI) é um padrão em que uma classe <b>recebe</b> pelo construtor os serviços de que precisa, em vez de criá-los com <code>new</code>. O <code>PedidoService</code> não sabe se o e-mail vai por SMTP, por SendGrid ou se é um falso de teste: ele só conhece a interface.</p>
<p>O ASP.NET Core tem um <b>container de DI</b> embutido. No <code>Program.cs</code>, você registra qual classe atende cada interface e por quanto tempo ela vive: <code>AddSingleton</code> (uma instância para sempre), <code>AddScoped</code> (uma por requisição HTTP) e <code>AddTransient</code> (uma nova a cada pedido). Depois, o framework cria e entrega os objetos automaticamente.</p>`,
      partes: [
        [c`public interface IEmailService {`, "Contrato do serviço de e-mail."],
        [c`Task EnviarAsync(string para, string assunto, string corpo);`, "Assinatura do método: quem implementa precisa fornecê-lo."],
        [c`public class SmtpEmailService : IEmailService`, "Implementação concreta. Os dois-pontos indicam que ela cumpre a interface."],
        [c`return Task.CompletedTask;`, "Devolve uma tarefa já concluída (aqui o envio é só simulado)."],
        [c`private readonly IEmailService _email;`, "Guarda a dependência; o tipo é a interface, não a classe concreta."],
        [c`public PedidoService(IEmailService email) => _email = email;`, "Construtor que recebe a dependência pronta (injeção)."],
        [c`builder.Services.AddScoped<IEmailService, SmtpEmailService>();`, "Registro no container: quem pedir `IEmailService` recebe um `SmtpEmailService`, um por requisição."]
      ]
    },
    a1: {
      detalhes: `<p>O <b>ASP.NET Core</b> é o framework web do .NET para criar sites e APIs. Nas <b>Minimal APIs</b>, você cria a aplicação e mapeia cada rota diretamente com <code>app.MapGet</code>, <code>MapPost</code>, <code>MapPut</code> e <code>MapDelete</code>. Para projetos maiores, existe o modelo com <b>Controllers</b>, classes que agrupam rotas relacionadas.</p>
<p>O fluxo do <code>Program.cs</code>: <code>WebApplication.CreateBuilder</code> prepara as configurações e o container de serviços; você registra serviços (<code>builder.Services.Add...</code>); <code>builder.Build()</code> cria a aplicação; você configura o <b>pipeline de middlewares</b> (<code>app.Use...</code>), mapeia as rotas e chama <code>app.Run()</code>.</p>
<p>Os parâmetros das rotas são preenchidos automaticamente: valores do caminho (<code>{id:int}</code>, que já valida que é inteiro), da query string e do corpo JSON (convertido em objeto). As respostas usam a classe <code>Results</code> (<code>Ok</code>, <code>Created</code>, <code>NotFound</code>, <code>BadRequest</code>). O <b>Swagger</b> gera uma página com a documentação e permite testar a API pelo navegador.</p>`,
      partes: [
        [c`var builder = WebApplication.CreateBuilder(args);`, "Prepara a aplicação: configurações, logs e serviços."],
        [c`builder.Services.AddEndpointsApiExplorer(); builder.Services.AddSwaggerGen();`, "Registra os serviços que geram a documentação Swagger."],
        [c`var app = builder.Build();`, "Constrói a aplicação."],
        [c`app.UseSwagger(); app.UseSwaggerUI();`, "Ativa a documentação em `/swagger`."],
        [c`app.MapGet("/produtos", () => produtos);`, "GET `/produtos` devolve a lista, convertida para JSON automaticamente."],
        [c`app.MapGet("/produtos/{id:int}", (int id) => …`, "O `{id:int}` só aceita números e é passado para o parâmetro `id`."],
        [c`is { } p ? Results.Ok(p) : Results.NotFound()`, "Se encontrou (não é nulo), responde 200 com o produto; senão, 404."],
        [c`app.MapPost("/produtos", (Produto p) => {`, "POST: o corpo JSON é convertido em `Produto`."],
        [c`return Results.Created($"/produtos/{p.Id}", p);`, "Responde 201 com o endereço do novo recurso."],
        [c`app.Run();`, "Liga o servidor."]
      ]
    },
    a2: {
      detalhes: `<p>O <b>Entity Framework Core</b> (EF Core) é o <b>ORM</b> do .NET: ele faz a ponte entre classes C# e tabelas do banco de dados. Cada classe de entidade vira uma tabela, cada propriedade vira uma coluna, e você consulta o banco com LINQ em vez de escrever SQL.</p>
<p>O <b>DbContext</b> representa a sessão com o banco; cada <code>DbSet&lt;T&gt;</code> representa uma tabela. Por convenção, a propriedade <code>Id</code> vira chave primária e <code>ClienteId</code> vira chave estrangeira para <code>Cliente</code>. Uma lista como <code>List&lt;Pedido&gt; Pedidos</code> representa o relacionamento um-para-muitos.</p>
<p>As <b>migrations</b> versionam a estrutura do banco: ao mudar as classes, você gera uma migration (<code>dotnet ef migrations add Nome</code>) e aplica no banco (<code>dotnet ef database update</code>). Em consultas, <code>Include</code> traz os dados relacionados junto (evitando o problema N+1) e <code>AsNoTracking</code> deixa consultas somente de leitura mais rápidas. Alterações são gravadas com <code>SaveChangesAsync()</code>.</p>`,
      partes: [
        [c`// dotnet add package Microsoft.EntityFrameworkCore.SqlServer`, "Instala o provedor do EF Core para SQL Server (existem para MySQL, PostgreSQL etc.)."],
        [c`public class Cliente { public int Id { get; set; } …`, "Entidade: vira a tabela `Clientes`; `Id` vira a chave primária."],
        [c`public List<Pedido> Pedidos { get; set; } = new();`, "Relacionamento: um cliente tem vários pedidos."],
        [c`public int ClienteId { get; set; }`, "Chave estrangeira que liga o pedido ao cliente."],
        [c`public class LojaContext(DbContextOptions<LojaContext> opt) : DbContext(opt)`, "O contexto do banco; recebe as configurações (como a string de conexão)."],
        [c`public DbSet<Cliente> Clientes => Set<Cliente>();`, "Representa a tabela de clientes para consultas e alterações."],
        [c`.Where(c => c.Uf == "SP")`, "Vira `WHERE Uf = 'SP'` no SQL."],
        [c`.Include(c => c.Pedidos)`, "Vira um JOIN: traz os pedidos junto, em uma única consulta."],
        [c`.AsNoTracking().ToListAsync();`, "Consulta somente leitura (mais leve), executada de forma assíncrona."],
        [c`// dotnet ef migrations add Inicial → dotnet ef database update`, "Gera a migration a partir das classes e aplica no banco."]
      ]
    },
    a3: {
      detalhes: `<p><b>SOLID</b> é um conjunto de cinco princípios de design orientado a objetos que deixam o código mais fácil de manter e testar:</p>
<ul>
<li><b>S</b> — Responsabilidade única: cada classe tem um único motivo para mudar.</li>
<li><b>O</b> — Aberto/Fechado: aberto para extensão, fechado para modificação (nova regra = nova classe).</li>
<li><b>L</b> — Substituição de Liskov: uma classe filha deve funcionar onde a mãe é esperada.</li>
<li><b>I</b> — Segregação de interfaces: várias interfaces pequenas são melhores que uma gigante.</li>
<li><b>D</b> — Inversão de dependência: dependa de abstrações (interfaces), não de classes concretas.</li>
</ul>
<p>Testes automatizados garantem que as regras continuam corretas após mudanças. No .NET, o <b>xUnit</b> é o framework mais usado: <code>[Fact]</code> marca um teste simples e <code>[Theory]</code> com <code>[InlineData]</code> roda o mesmo teste com várias entradas. O padrão de escrita é <b>AAA</b>: <i>Arrange</i> (preparar), <i>Act</i> (executar) e <i>Assert</i> (verificar).</p>`,
      partes: [
        [c`public interface IRegraDesconto { decimal Aplicar(decimal valor); }`, "Abstração: qualquer regra de desconto sabe aplicar-se a um valor."],
        [c`public class DescontoVip : IRegraDesconto { … v * 0.9m; }`, "Uma regra concreta: 10% de desconto."],
        [c`public class SemDesconto : IRegraDesconto { … => v; }`, "Outra regra: devolve o valor sem mudança."],
        [c`// Nova regra? Crie outra classe; não mexa nas existentes`, "Princípio Aberto/Fechado na prática."],
        [c`[Theory]`, "Marca um teste parametrizado."],
        [c`[InlineData(100, 90)] [InlineData(0, 0)]`, "Cada linha é um caso: entrada e resultado esperado."],
        [c`var regra = new DescontoVip();`, "Arrange: prepara o objeto a ser testado."],
        [c`Assert.Equal(esperado, regra.Aplicar(entrada));`, "Act + Assert: executa e confere o resultado."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual tipo é o mais indicado para valores em dinheiro em C#?", ["`float`", "`double`", "`decimal`", "`int`"], 2, "`decimal` guarda valores decimais exatos, evitando erros de centavos."),
      l("Complete o sufixo que indica um número `decimal`:", c`decimal preco = 19.90____;`, ["m", "M"], "Sem o `m`, o C# entende o número como `double`."),
      m("O que faz `$\"Olá {nome}\"`?", ["Cria um comentário", "Interpola: insere o valor de `nome` no texto", "Converte para dólar", "Dá erro"], 1, "O `$` antes das aspas ativa a interpolação de strings."),
      m("Qual a vantagem de `int.TryParse` em relação a `int.Parse`?", ["É mais rápido", "Não lança exceção se o texto for inválido; devolve `false`", "Aceita letras", "Converte para decimal"], 1, "O resultado da conversão sai pelo parâmetro `out`."),
      m("Em uma switch expression, o que significa `_ =>`?", ["Erro", "O caso padrão (qualquer outro valor)", "Um comentário", "Um laço"], 1, "Equivale ao `default` do switch tradicional."),
      l("Complete o laço que percorre cada item da lista:", c`____ (var n in notas)
{
    Console.WriteLine(n);
}`, "foreach", "`foreach` percorre coleções sem precisar de índice."),
      m("O que `continue` faz dentro de um laço?", ["Encerra o laço", "Pula para a próxima volta", "Reinicia o programa", "Pausa por 1 segundo"], 1, "`break` é o que encerra o laço."),
      m("Como se cria um objeto da classe `Produto`?", ["`Produto p = Produto();`", "`var p = new Produto(\"Mouse\", 89m);`", "`create Produto p;`", "`p = Produto.new()`"], 1, "A palavra `new` chama o construtor."),
      m("O que `public decimal Preco { get; private set; }` permite?", ["Ler e alterar de qualquer lugar", "Ler de qualquer lugar, alterar só dentro da classe", "Só alterar", "Nada"], 1, "É uma forma de encapsulamento."),
      vf("Dois `record` com os mesmos valores nas propriedades são considerados iguais.", true, "Records têm igualdade por valor; classes comuns comparam a referência.")
    ],
    intermediario: [
      m("Qual método LINQ filtra uma coleção?", ["`Select`", "`Where`", "`OrderBy`", "`Sum`"], 1, "`Select` transforma, `OrderBy` ordena e `Sum` soma."),
      l("Complete para obter só os nomes dos clientes:", c`var nomes = clientes.____(c => c.Nome).ToList();`, "Select", "`Select` transforma cada item em outro valor."),
      m("O que `FirstOrDefault` devolve quando nenhum item atende à condição?", ["Lança exceção", "O valor padrão do tipo (ex.: `null`)", "O último item", "Uma lista vazia"], 1, "`First` lançaria exceção nesse caso."),
      m("O que `vendas.Any(v => v.Uf == \"RJ\")` devolve?", ["A primeira venda do RJ", "`true` se existir ao menos uma venda do RJ", "A quantidade", "Todas as vendas do RJ"], 1, "`All` verificaria se todas atendem à condição."),
      m("Qual bloco é executado sempre, com ou sem exceção?", ["`try`", "`catch`", "`finally`", "`throw`"], 2, "Ideal para liberar recursos."),
      l("Complete a palavra que espera uma `Task` sem bloquear a thread:", c`var endereco = ____ servico.BuscarAsync("01001000");`, "await", "Só pode ser usada dentro de métodos marcados com `async`."),
      vf("Usar `.Result` ou `.Wait()` em uma Task é a forma recomendada de esperar o resultado.", false, "Bloqueia a thread e pode causar deadlock. Prefira `async/await` de ponta a ponta."),
      m("O que é injeção de dependência?", ["Copiar código de outra classe", "A classe receber pronta (geralmente pelo construtor) os serviços de que precisa", "Instalar pacotes", "Um tipo de exceção"], 1, "Facilita trocar implementações e fazer testes."),
      m("No ASP.NET Core, qual registro cria uma instância por requisição HTTP?", ["`AddSingleton`", "`AddScoped`", "`AddTransient`", "`AddRequest`"], 1, "Singleton: uma para sempre. Transient: uma nova a cada vez que for pedida."),
      m("Por convenção, nomes de interfaces em C# começam com qual letra?", ["`C`", "`I`", "`T`", "`X`"], 1, "Ex.: `IEmailService`, `IRepositorio`.")
    ],
    avancado: [
      m("Qual método mapeia uma rota GET em uma Minimal API?", ["`app.Get()`", "`app.MapGet()`", "`app.Route()`", "`app.HttpGet()`"], 1, "Há também `MapPost`, `MapPut` e `MapDelete`."),
      l("Complete para responder 404 quando o produto não existir:", c`return produto is null ? Results.____() : Results.Ok(produto);`, ["NotFound", "NotFound()"], "`Results.NotFound()` gera a resposta 404."),
      m("O que é o Swagger em uma API?", ["Um banco de dados", "Uma documentação interativa para ver e testar as rotas", "Um antivírus", "Um tipo de teste unitário"], 1, "No ASP.NET Core fica normalmente em `/swagger`."),
      m("O que é um ORM como o Entity Framework Core?", ["Um editor de código", "Uma ponte que mapeia classes para tabelas do banco", "Um servidor web", "Um framework de CSS"], 1, "Você consulta com LINQ e o EF gera o SQL."),
      m("Para que servem as migrations do EF Core?", ["Mudar o servidor de lugar", "Versionar e aplicar mudanças na estrutura do banco", "Fazer backup", "Migrar o código para Java"], 1, "`dotnet ef migrations add` + `dotnet ef database update`."),
      l("Complete para trazer os pedidos junto com os clientes (evitando N+1):", c`db.Clientes.____(c => c.Pedidos).ToListAsync();`, "Include", "`Include` faz o JOIN e carrega o relacionamento em uma única consulta."),
      m("O que significa o “S” de SOLID?", ["Segurança", "Responsabilidade única (Single responsibility)", "Simplicidade", "Sincronismo"], 1, "Cada classe deve ter um único motivo para mudar."),
      m("Qual princípio diz que devemos depender de interfaces, e não de classes concretas?", ["Aberto/Fechado", "Liskov", "Inversão de dependência", "Segregação de interfaces"], 2, "É o “D” de SOLID."),
      m("No xUnit, qual atributo roda o mesmo teste com várias entradas?", ["`[Fact]`", "`[Theory]` com `[InlineData]`", "`[Test]`", "`[Repeat]`"], 1, "`[Fact]` é para um teste sem parâmetros."),
      vf("O padrão AAA de testes significa Arrange, Act e Assert.", true, "Preparar, executar e verificar.")
    ]
  }
};
