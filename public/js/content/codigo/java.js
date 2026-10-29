// Exercícios de código da trilha java (completar e criar do zero), por tópico.
const c = String.raw;

const NOTA_SPRING = "Este código usa Spring Boot e não roda no navegador: a verificação confere as anotações e a estrutura. Para ver funcionando, crie um projeto em start.spring.io (Spring Web), cole o código e rode com ./mvnw spring-boot:run.";
const NOTA_JPA = "Este código usa Spring Data JPA e não roda no navegador: a verificação confere as anotações e a estrutura. Para ver funcionando, crie um projeto em start.spring.io (Spring Data JPA + H2), cole o código e rode com spring.jpa.show-sql=true.";

export default {
  // ───────────────────────── b1: Estrutura, tipos e o método main
  b1: [
    {
      tipo: "completar",
      titulo: "Ficha da funcionária",
      enunciado: `O RH precisa guardar os dados de uma funcionária em variáveis com o <b>tipo certo</b>.
        Substitua cada <code>____</code> pelo tipo adequado:
        <ul>
          <li><code>nome</code> é um texto;</li>
          <li><code>idade</code> é um número inteiro;</li>
          <li><code>salario</code> é um número decimal;</li>
          <li><code>ativa</code> é verdadeiro ou falso.</li>
        </ul>`,
      dica: `Os tipos são <code>String</code> (com S maiúsculo), <code>int</code>, <code>double</code> e <code>boolean</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        ____ nome = "Carla Mendes";
        ____ idade = 29;
        ____ salario = 3500.50;
        ____ ativa = true;

        System.out.println("Funcionária: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("Salário: " + salario);
        System.out.println("Ativa: " + ativa);
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        String nome = "Carla Mendes";
        int idade = 29;
        double salario = 3500.50;
        boolean ativa = true;

        System.out.println("Funcionária: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("Salário: " + salario);
        System.out.println("Ativa: " + ativa);
    }
}`,
      padroes: [
        [/String\s+nome\s*=/, "nome é um texto: use o tipo String."],
        [/int\s+idade\s*=/, "idade é um número inteiro: use int."],
        [/double\s+salario\s*=/, "salario tem casas decimais: use double."],
        [/boolean\s+ativa\s*=/, "ativa é verdadeiro/falso: use boolean."]
      ],
      saidaEsperada: "Funcionária: Carla Mendes\nIdade: 29\nSalário: 3500.5\nAtiva: true"
    },
    {
      tipo: "completar",
      titulo: "Etiqueta de preço com printf",
      enunciado: `Na mercearia, a etiqueta do produto é impressa com <code>printf</code>. Substitua cada <code>____</code> pelo
        marcador certo para que a saída seja exatamente:
        <pre>Produto: Café 500g
Preço: R$ 18.90
Estoque: 42 unidades</pre>`,
      dica: `<code>%s</code> é para texto, <code>%d</code> para inteiro e <code>%.2f</code> para decimal com 2 casas.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        String produto = "Café 500g";
        double preco = 18.9;
        int estoque = 42;

        System.out.printf("Produto: ____%n", produto);
        System.out.printf("Preço: R$ ____%n", preco);
        System.out.printf("Estoque: ____ unidades%n", estoque);
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        String produto = "Café 500g";
        double preco = 18.9;
        int estoque = 42;

        System.out.printf("Produto: %s%n", produto);
        System.out.printf("Preço: R$ %.2f%n", preco);
        System.out.printf("Estoque: %d unidades%n", estoque);
    }
}`,
      padroes: [
        [/"Produto: %s%n"/, "Para mostrar o texto do produto, use %s."],
        [/"Preço: R\$ %\.2f%n"/, "Para o preço com 2 casas decimais, use %.2f."],
        [/"Estoque: %d unidades%n"/, "Para o estoque (inteiro), use %d."]
      ],
      saidaEsperada: "Produto: Café 500g\nPreço: R$ 18.90\nEstoque: 42 unidades"
    },
    {
      tipo: "completar",
      titulo: "Troco exato com BigDecimal",
      enunciado: `No caixa da padaria, <code>double</code> pode gerar imprecisões (4.35 × 6 dá <code>26.099999999999998</code>).
        Por isso usamos <code>BigDecimal</code>. Substitua cada <code>____</code> para:
        <ul>
          <li>criar <code>pago</code> com o valor <b>30.00</b> a partir de texto;</li>
          <li>calcular <code>total</code> = preço × quantidade;</li>
          <li>calcular <code>troco</code> = pago − total.</li>
        </ul>
        Saída esperada: <pre>Total: R$ 26.10
Troco: R$ 3.90</pre>`,
      dica: `Com BigDecimal as contas são métodos: <code>multiply</code> (vezes) e <code>subtract</code> (menos). Crie a partir de texto, entre aspas.`,
      lang: "java",
      inicial: c`import java.math.BigDecimal;

public class Main {
    public static void main(String[] args) {
        BigDecimal preco = new BigDecimal("4.35");
        BigDecimal quantidade = BigDecimal.valueOf(6);
        BigDecimal pago = new BigDecimal(____);

        BigDecimal total = preco.____(quantidade);
        BigDecimal troco = pago.____(total);

        System.out.println("Total: R$ " + total);
        System.out.println("Troco: R$ " + troco);
    }
}
`,
      solucao: c`import java.math.BigDecimal;

public class Main {
    public static void main(String[] args) {
        BigDecimal preco = new BigDecimal("4.35");
        BigDecimal quantidade = BigDecimal.valueOf(6);
        BigDecimal pago = new BigDecimal("30.00");

        BigDecimal total = preco.multiply(quantidade);
        BigDecimal troco = pago.subtract(total);

        System.out.println("Total: R$ " + total);
        System.out.println("Troco: R$ " + troco);
    }
}`,
      padroes: [
        [/new\s+BigDecimal\s*\(\s*"30(\.0{1,2})?"\s*\)/, "Crie o valor pago a partir de texto: new BigDecimal(\"30.00\")."],
        [/preco\.multiply\s*\(\s*quantidade\s*\)/, "O total é preco.multiply(quantidade)."],
        [/pago\.subtract\s*\(\s*total\s*\)/, "O troco é pago.subtract(total)."]
      ],
      saidaEsperada: "Total: R$ 26.10\nTroco: R$ 3.90"
    },
    {
      tipo: "criar",
      titulo: "Conta do restaurante",
      enunciado: `Escreva do zero um programa Java completo: a classe <code>Main</code> com o método <code>main</code>.
        Uma mesa pediu <b>2 pratos de R$ 42.50</b> e <b>3 sucos de R$ 8.00</b>. Calcule o subtotal, a taxa de serviço de <b>10%</b>
        e o total, e imprima <b>com printf</b> (2 casas decimais) exatamente:
        <pre>Subtotal: R$ 109.00
Serviço (10%): R$ 10.90
Total: R$ 119.90</pre>`,
      dica: `A estrutura é <code>public class Main { public static void main(String[] args) { ... } }</code>. No printf, o sinal de porcentagem literal se escreve <code>%%</code>.`,
      lang: "java",
      inicial: c`// Escreva aqui o programa inteiro:
// a classe principal, o ponto de entrada,
// as variáveis de preço e quantidade, as contas e a impressão formatada.
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        double precoPrato = 42.50;
        int qtdPratos = 2;
        double precoSuco = 8.00;
        int qtdSucos = 3;

        double subtotal = precoPrato * qtdPratos + precoSuco * qtdSucos;
        double servico = subtotal * 0.10;
        double total = subtotal + servico;

        System.out.printf("Subtotal: R$ %.2f%n", subtotal);
        System.out.printf("Serviço (10%%): R$ %.2f%n", servico);
        System.out.printf("Total: R$ %.2f%n", total);
    }
}`,
      padroes: [
        [/public\s+class\s+Main\b/, "Crie a classe pública Main."],
        [/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w+\s*\)/, "Crie o método public static void main(String[] args)."],
        [/printf\s*\(/, "Imprima os valores com System.out.printf."],
        [/%%/, "Para mostrar o símbolo de porcentagem no printf, use %%."]
      ],
      saidaEsperada: "Subtotal: R$ 109.00\nServiço (10%): R$ 10.90\nTotal: R$ 119.90"
    },
    {
      tipo: "criar",
      titulo: "Caixas da expedição",
      enunciado: `No estoque há <code>itens = 47</code> produtos e cada caixa leva <code>porCaixa = 6</code>. Cada item pesa <code>pesoItem = 0.75</code> kg.
        Crie as variáveis:
        <ul>
          <li><code>int caixas</code>: quantas caixas ficam <b>cheias</b> (divisão inteira);</li>
          <li><code>int sobra</code>: quantos itens ficam soltos (resto da divisão);</li>
          <li><code>double pesoTotal</code>: itens × pesoItem.</li>
        </ul>
        Saída esperada:
        <pre>Caixas cheias: 7
Itens soltos: 5
Peso total: 35.25 kg</pre>`,
      dica: `Entre dois <code>int</code>, a barra <code>/</code> descarta a parte decimal. O operador de resto é <code>%</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        int itens = 47;
        int porCaixa = 6;
        double pesoItem = 0.75;

        // calcule as caixas cheias, os itens soltos e o peso total
        // e imprima as três linhas da saída esperada
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int itens = 47;
        int porCaixa = 6;
        double pesoItem = 0.75;

        int caixas = itens / porCaixa;
        int sobra = itens % porCaixa;
        double pesoTotal = itens * pesoItem;

        System.out.println("Caixas cheias: " + caixas);
        System.out.println("Itens soltos: " + sobra);
        System.out.println("Peso total: " + pesoTotal + " kg");
    }
}`,
      padroes: [
        [/int\s+caixas\s*=\s*itens\s*\/\s*porCaixa/, "caixas deve ser itens / porCaixa (divisão inteira)."],
        [/int\s+sobra\s*=\s*itens\s*%\s*porCaixa/, "sobra deve ser o resto: itens % porCaixa."],
        [/double\s+pesoTotal\s*=\s*(itens\s*\*\s*pesoItem|pesoItem\s*\*\s*itens)/, "pesoTotal deve ser itens * pesoItem (do tipo double)."]
      ],
      saidaEsperada: "Caixas cheias: 7\nItens soltos: 5\nPeso total: 35.25 kg"
    }
  ],

  // ───────────────────────── b2: Condicionais, laços e Strings
  b2: [
    {
      tipo: "completar",
      titulo: "Frete da loja virtual",
      enunciado: `Regras do frete: compras a partir de R$ 200 têm <b>frete grátis</b>; a partir de R$ 150 <b>e</b> na região "Sudeste",
        frete promocional; senão, frete normal. Substitua cada <code>____</code> para completar o <code>if / else if / else</code>.
        Com <code>total = 180</code> e <code>regiao = "Sudeste"</code> a saída deve ser:
        <pre>Frete promocional: R$ 9.90</pre>`,
      dica: `"E" lógico em Java é <code>&amp;&amp;</code>. Para comparar Strings, use <code>equals</code>, nunca <code>==</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        double total = 180.0;
        String regiao = "Sudeste";

        if (total >= 200) {
            System.out.println("Frete grátis");
        } ____ (total >= 150 ____ regiao.____("Sudeste")) {
            System.out.println("Frete promocional: R$ 9.90");
        } ____ {
            System.out.println("Frete normal: R$ 24.90");
        }
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        double total = 180.0;
        String regiao = "Sudeste";

        if (total >= 200) {
            System.out.println("Frete grátis");
        } else if (total >= 150 && regiao.equals("Sudeste")) {
            System.out.println("Frete promocional: R$ 9.90");
        } else {
            System.out.println("Frete normal: R$ 24.90");
        }
    }
}`,
      padroes: [
        [/\}\s*else\s+if\s*\(/, "A segunda condição é um else if."],
        [/total\s*>=\s*150\s*&&/, "As duas condições precisam ser verdadeiras: use &&."],
        [/regiao\.equals\s*\(\s*"Sudeste"\s*\)/, "Compare o texto com regiao.equals(\"Sudeste\")."],
        [/\}\s*else\s*\{/, "O último caso é um else."]
      ],
      saidaEsperada: "Frete promocional: R$ 9.90"
    },
    {
      tipo: "completar",
      titulo: "Horário da clínica com switch",
      enunciado: `A clínica abre em horários diferentes conforme o dia (1 = domingo ... 7 = sábado). Substitua cada <code>____</code> para
        completar o <b>switch moderno</b> (com setas), que devolve o horário. Saída esperada:
        <pre>Dia 1: fechado
Dia 4: 8h às 18h
Dia 7: 8h às 12h
Dia 9: dia inválido</pre>`,
      dica: `O switch como expressão fica do lado direito do <code>=</code>. Cada caso usa <code>-&gt;</code>, e o caso "qualquer outro" é o <code>default</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        int[] dias = {1, 4, 7, 9};

        for (int dia : dias) {
            String horario = ____ (dia) {
                case 1 -> "fechado";
                case 2, 3, 4, 5, 6 ____ "8h às 18h";
                case 7 -> "8h às 12h";
                ____ -> "dia inválido";
            };
            System.out.println("Dia " + dia + ": " + horario);
        }
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int[] dias = {1, 4, 7, 9};

        for (int dia : dias) {
            String horario = switch (dia) {
                case 1 -> "fechado";
                case 2, 3, 4, 5, 6 -> "8h às 18h";
                case 7 -> "8h às 12h";
                default -> "dia inválido";
            };
            System.out.println("Dia " + dia + ": " + horario);
        }
    }
}`,
      padroes: [
        [/=\s*switch\s*\(\s*dia\s*\)/, "Use o switch como expressão: String horario = switch (dia) { ... };"],
        [/case\s+2\s*,\s*3\s*,\s*4\s*,\s*5\s*,\s*6\s*->/, "No switch moderno, cada caso usa a seta ->."],
        [/default\s*->/, "Trate os outros valores com default ->."]
      ],
      saidaEsperada: "Dia 1: fechado\nDia 4: 8h às 18h\nDia 7: 8h às 12h\nDia 9: dia inválido"
    },
    {
      tipo: "completar",
      titulo: "Fechamento do caixa do dia",
      enunciado: `O array <code>vendas</code> tem os valores vendidos hoje. Substitua cada <code>____</code> para percorrer o array com
        <b>for-each</b>, somar tudo, contar as vendas acima de R$ 100 e mostrar quantas vendas houve. Saída esperada:
        <pre>Vendas: 5
Total: R$ 510.40
Acima de R$ 100: 2</pre>`,
      dica: `O for-each é <code>for (tipo item : array)</code>. O tamanho de um array se lê com <code>.length</code> (sem parênteses).`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        double[] vendas = {35.0, 120.0, 89.9, 250.0, 15.5};
        double soma = 0;
        int acimaDe100 = 0;

        for (double v ____ vendas) {
            soma ____ v;
            if (v > 100) {
                acimaDe100++;
            }
        }

        System.out.println("Vendas: " + vendas.____);
        System.out.printf("Total: R$ %.2f%n", soma);
        System.out.println("Acima de R$ 100: " + acimaDe100);
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        double[] vendas = {35.0, 120.0, 89.9, 250.0, 15.5};
        double soma = 0;
        int acimaDe100 = 0;

        for (double v : vendas) {
            soma += v;
            if (v > 100) {
                acimaDe100++;
            }
        }

        System.out.println("Vendas: " + vendas.length);
        System.out.printf("Total: R$ %.2f%n", soma);
        System.out.println("Acima de R$ 100: " + acimaDe100);
    }
}`,
      padroes: [
        [/for\s*\(\s*double\s+v\s*:\s*vendas\s*\)/, "O for-each fica: for (double v : vendas)."],
        [/soma\s*\+=\s*v\s*;|soma\s*=\s*soma\s*\+\s*v\s*;/, "Acumule cada venda em soma (soma += v)."],
        [/vendas\.length\b/, "O tamanho do array é vendas.length."]
      ],
      saidaEsperada: "Vendas: 5\nTotal: R$ 510.40\nAcima de R$ 100: 2"
    },
    {
      tipo: "criar",
      titulo: "Limpando e-mails do cadastro",
      enunciado: `Os e-mails do cadastro da loja vieram com espaços sobrando e letras maiúsculas misturadas. Para cada e-mail do array:
        <ul>
          <li>crie uma versão limpa, <b>sem espaços nas pontas</b> e <b>toda em minúsculas</b>, e imprima com <code>"- "</code> na frente;</li>
          <li>conte quantos, depois de limpos, são iguais a <code>"ana@loja.com"</code> (compare o conteúdo do jeito certo).</li>
        </ul>
        Saída esperada:
        <pre>- ana@loja.com
- bruno@loja.com
- ana@loja.com
- carla@loja.com
Cadastros da Ana: 2</pre>`,
      dica: `Encadeie métodos de String: <code>e.trim().toLowerCase()</code>. Para comparar conteúdo, use <code>equals</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        String[] emails = {"  Ana@Loja.com ", "BRUNO@loja.com", " ana@loja.com", "carla@LOJA.com  "};

        // percorra o array, limpe cada e-mail, imprima e conte os da Ana
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        String[] emails = {"  Ana@Loja.com ", "BRUNO@loja.com", " ana@loja.com", "carla@LOJA.com  "};

        int daAna = 0;
        for (String e : emails) {
            String limpo = e.trim().toLowerCase();
            System.out.println("- " + limpo);
            if (limpo.equals("ana@loja.com")) {
                daAna++;
            }
        }
        System.out.println("Cadastros da Ana: " + daAna);
    }
}`,
      padroes: [
        [/for\s*\(/, "Percorra o array com um laço for."],
        [/\.trim\s*\(\s*\)/, "Use trim() para tirar os espaços das pontas."],
        [/\.toLowerCase\s*\(\s*\)/, "Use toLowerCase() para deixar tudo em minúsculas."],
        [/\.equals\s*\(\s*"ana@loja\.com"\s*\)|"ana@loja\.com"\s*\.equals\s*\(/, "Compare o texto com equals(\"ana@loja.com\"), não com ==."]
      ],
      saidaEsperada: "- ana@loja.com\n- bruno@loja.com\n- ana@loja.com\n- carla@loja.com\nCadastros da Ana: 2"
    },
    {
      tipo: "criar",
      titulo: "Painel de senhas com StringBuilder",
      enunciado: `O painel do banco mostra as próximas senhas em uma linha só. Com <code>quantidade = 5</code>, monte o texto usando
        um <b>for clássico</b> (contador de 1 até <code>quantidade</code>) e um <code>StringBuilder</code>, separando as senhas por
        vírgula e espaço, <b>sem vírgula sobrando no fim</b>. Saída esperada:
        <pre>Senhas: A1, A2, A3, A4, A5</pre>`,
      dica: `Crie com <code>new StringBuilder("Senhas: ")</code> e use <code>append</code>. Só coloque o separador antes das senhas a partir da segunda.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        int quantidade = 5;

        // monte o texto das senhas e imprima
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int quantidade = 5;

        StringBuilder painel = new StringBuilder("Senhas: ");
        for (int i = 1; i <= quantidade; i++) {
            if (i > 1) {
                painel.append(", ");
            }
            painel.append("A").append(i);
        }
        System.out.println(painel.toString());
    }
}`,
      padroes: [
        [/new\s+StringBuilder\s*\(/, "Crie um StringBuilder para montar o texto."],
        [/\.append\s*\(/, "Adicione as partes com append(...)."],
        [/for\s*\(\s*int\s+\w+\s*=/, "Use um for clássico com contador: for (int i = 1; ...; i++)."]
      ],
      saidaEsperada: "Senhas: A1, A2, A3, A4, A5"
    }
  ],

  // ───────────────────────── b3: Classes, objetos e encapsulamento
  b3: [
    {
      tipo: "completar",
      titulo: "Conta bancária protegida",
      enunciado: `A classe <code>ContaBancaria</code> não pode deixar ninguém mexer no saldo diretamente. Substitua cada <code>____</code> para:
        <ul>
          <li>deixar o atributo <code>saldo</code> <b>privado</b>;</li>
          <li>guardar o parâmetro <code>titular</code> no atributo do objeto;</li>
          <li>criar o objeto no <code>main</code>;</li>
          <li>devolver o saldo no getter.</li>
        </ul>
        Saída esperada:
        <pre>Depósito inválido: -20.0
Marina tem R$ 150.0</pre>`,
      dica: `<code>this</code> se refere ao próprio objeto; objetos são criados com <code>new</code>.`,
      lang: "java",
      inicial: c`class ContaBancaria {
    private final String titular;
    ____ double saldo;

    public ContaBancaria(String titular, double saldoInicial) {
        ____.titular = titular;
        this.saldo = saldoInicial;
    }

    public void depositar(double valor) {
        if (valor <= 0) {
            System.out.println("Depósito inválido: " + valor);
            return;
        }
        saldo += valor;
    }

    public String getTitular() { return titular; }
    public double getSaldo() { return ____; }
}

public class Main {
    public static void main(String[] args) {
        ContaBancaria conta = ____ ContaBancaria("Marina", 100.0);
        conta.depositar(50.0);
        conta.depositar(-20.0);
        System.out.println(conta.getTitular() + " tem R$ " + conta.getSaldo());
    }
}
`,
      solucao: c`class ContaBancaria {
    private final String titular;
    private double saldo;

    public ContaBancaria(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public void depositar(double valor) {
        if (valor <= 0) {
            System.out.println("Depósito inválido: " + valor);
            return;
        }
        saldo += valor;
    }

    public String getTitular() { return titular; }
    public double getSaldo() { return saldo; }
}

public class Main {
    public static void main(String[] args) {
        ContaBancaria conta = new ContaBancaria("Marina", 100.0);
        conta.depositar(50.0);
        conta.depositar(-20.0);
        System.out.println(conta.getTitular() + " tem R$ " + conta.getSaldo());
    }
}`,
      padroes: [
        [/private\s+double\s+saldo/, "O saldo deve ser private."],
        [/this\.titular\s*=\s*titular/, "No construtor, use this.titular = titular."],
        [/return\s+(this\.)?saldo\s*;/, "O getter deve devolver o saldo."],
        [/=\s*new\s+ContaBancaria\s*\(/, "Crie a conta com new ContaBancaria(...)."]
      ],
      saidaEsperada: "Depósito inválido: -20.0\nMarina tem R$ 150.0"
    },
    {
      tipo: "completar",
      titulo: "Produto como record",
      enunciado: `Para uma classe que só carrega dados, o <b>record</b> gera construtor, acessores e <code>toString</code> sozinho.
        Substitua cada <code>____</code> para declarar o record <code>Produto</code> e ler o nome e o estoque. Saída esperada:
        <pre>Teclado custa R$ 129.9
Em estoque: 8
Produto[nome=Teclado, preco=129.9, estoque=8]</pre>`,
      dica: `Em um record, os acessores têm o nome do campo, com parênteses: <code>p.preco()</code> (não <code>getPreco()</code>).`,
      lang: "java",
      inicial: c`____ Produto(String nome, double preco, int estoque) {}

public class Main {
    public static void main(String[] args) {
        Produto p = new Produto("Teclado", 129.9, 8);

        System.out.println(p.____() + " custa R$ " + p.preco());
        System.out.println("Em estoque: " + p.____());
        System.out.println(p);
    }
}
`,
      solucao: c`record Produto(String nome, double preco, int estoque) {}

public class Main {
    public static void main(String[] args) {
        Produto p = new Produto("Teclado", 129.9, 8);

        System.out.println(p.nome() + " custa R$ " + p.preco());
        System.out.println("Em estoque: " + p.estoque());
        System.out.println(p);
    }
}`,
      padroes: [
        [/record\s+Produto\s*\(/, "Declare Produto como record."],
        [/p\.nome\s*\(\s*\)/, "Leia o nome com p.nome()."],
        [/p\.estoque\s*\(\s*\)/, "Leia o estoque com p.estoque()."]
      ],
      saidaEsperada: "Teclado custa R$ 129.9\nEm estoque: 8\nProduto[nome=Teclado, preco=129.9, estoque=8]"
    },
    {
      tipo: "completar",
      titulo: "Estoque que não fica negativo",
      enunciado: `O método <code>retirar</code> só pode tirar itens se houver quantidade suficiente: devolve <code>true</code> quando
        conseguiu e <code>false</code> quando não. Substitua cada <code>____</code>. Saída esperada:
        <pre>Retirar 3: true
Retirar 10: false
Parafuso: 2 em estoque</pre>`,
      dica: `O tipo de retorno de um sim/não é <code>boolean</code>. Subtrair e guardar ao mesmo tempo: <code>-=</code>.`,
      lang: "java",
      inicial: c`class ItemEstoque {
    private final String nome;
    private int quantidade;

    public ItemEstoque(String nome, int quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }

    public ____ retirar(int qtd) {
        if (qtd ____ quantidade) {
            return false;
        }
        quantidade ____ qtd;
        return ____;
    }

    public String getNome() { return nome; }
    public int getQuantidade() { return quantidade; }
}

public class Main {
    public static void main(String[] args) {
        ItemEstoque item = new ItemEstoque("Parafuso", 5);
        System.out.println("Retirar 3: " + item.retirar(3));
        System.out.println("Retirar 10: " + item.retirar(10));
        System.out.println(item.getNome() + ": " + item.getQuantidade() + " em estoque");
    }
}
`,
      solucao: c`class ItemEstoque {
    private final String nome;
    private int quantidade;

    public ItemEstoque(String nome, int quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }

    public boolean retirar(int qtd) {
        if (qtd > quantidade) {
            return false;
        }
        quantidade -= qtd;
        return true;
    }

    public String getNome() { return nome; }
    public int getQuantidade() { return quantidade; }
}

public class Main {
    public static void main(String[] args) {
        ItemEstoque item = new ItemEstoque("Parafuso", 5);
        System.out.println("Retirar 3: " + item.retirar(3));
        System.out.println("Retirar 10: " + item.retirar(10));
        System.out.println(item.getNome() + ": " + item.getQuantidade() + " em estoque");
    }
}`,
      padroes: [
        [/public\s+boolean\s+retirar\s*\(\s*int\s+qtd\s*\)/, "retirar devolve sim/não: o tipo de retorno é boolean."],
        [/if\s*\(\s*(qtd\s*>\s*quantidade|quantidade\s*<\s*qtd)\s*\)/, "Recuse quando qtd for maior que a quantidade."],
        [/quantidade\s*-=\s*qtd/, "Desconte com quantidade -= qtd."],
        [/return\s+true\s*;/, "Quando der certo, devolva true."]
      ],
      saidaEsperada: "Retirar 3: true\nRetirar 10: false\nParafuso: 2 em estoque"
    },
    {
      tipo: "criar",
      titulo: "Classe Aluno com média",
      enunciado: `Crie a classe <code>Aluno</code> (fora de <code>Main</code>) com:
        <ul>
          <li>atributos <b>privados</b> <code>nome</code> (String), <code>nota1</code> e <code>nota2</code> (double);</li>
          <li>um construtor <code>Aluno(String nome, double nota1, double nota2)</code>;</li>
          <li><code>double media()</code>: média das duas notas;</li>
          <li><code>String situacao()</code>: <code>"Aprovado"</code> se a média for ≥ 6, senão <code>"Recuperação"</code>;</li>
          <li><code>String getNome()</code>.</li>
        </ul>
        No <code>main</code>, crie Ana (8 e 7) e Bruno (5 e 4) e imprima:
        <pre>Ana: 7.5 (Aprovado)
Bruno: 4.5 (Recuperação)</pre>`,
      dica: `Um método pode chamar outro do mesmo objeto: dentro de <code>situacao()</code>, use <code>media()</code>.`,
      lang: "java",
      inicial: c`// 1) Escreva aqui a classe do aluno, com atributos privados,
//    construtor, media(), situacao() e getNome().

public class Main {
    public static void main(String[] args) {
        // 2) Crie os dois alunos e imprima nome, média e situação
    }
}
`,
      solucao: c`class Aluno {
    private final String nome;
    private final double nota1;
    private final double nota2;

    public Aluno(String nome, double nota1, double nota2) {
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
    }

    public double media() {
        return (nota1 + nota2) / 2;
    }

    public String situacao() {
        if (media() >= 6) {
            return "Aprovado";
        }
        return "Recuperação";
    }

    public String getNome() { return nome; }
}

public class Main {
    public static void main(String[] args) {
        Aluno ana = new Aluno("Ana", 8, 7);
        Aluno bruno = new Aluno("Bruno", 5, 4);

        System.out.println(ana.getNome() + ": " + ana.media() + " (" + ana.situacao() + ")");
        System.out.println(bruno.getNome() + ": " + bruno.media() + " (" + bruno.situacao() + ")");
    }
}`,
      padroes: [
        [/class\s+Aluno\b/, "Crie a classe Aluno."],
        [/private\s+(final\s+)?String\s+nome/, "O atributo nome deve ser private."],
        [/double\s+media\s*\(\s*\)/, "Crie o método double media()."],
        [/String\s+situacao\s*\(\s*\)/, "Crie o método String situacao()."],
        [/new\s+Aluno\s*\(/, "No main, crie os alunos com new Aluno(...)."]
      ],
      saidaEsperada: "Ana: 7.5 (Aprovado)\nBruno: 4.5 (Recuperação)"
    },
    {
      tipo: "criar",
      titulo: "Carrinho da padaria",
      enunciado: `Crie a classe <code>Carrinho</code> com atributos <b>privados</b> <code>double total</code> e <code>int itens</code>, e os métodos:
        <ul>
          <li><code>void adicionar(String produto, double preco, int qtd)</code>: soma <code>preco * qtd</code> ao total, soma <code>qtd</code> aos itens
            e imprime <code>"+ " + qtd + "x " + produto</code>;</li>
          <li><code>double getTotal()</code> e <code>int getItens()</code>.</li>
        </ul>
        No <code>main</code>, adicione 10 pães franceses de 0.75, 2 leites de 5.5 e 1 manteiga de 12.0 e imprima:
        <pre>+ 10x Pão francês
+ 2x Leite
+ 1x Manteiga
Itens: 13
Total: R$ 30.5</pre>`,
      dica: `Quem está de fora não mexe em <code>total</code> diretamente: só pelo método <code>adicionar</code>. Comece os atributos em 0.`,
      lang: "java",
      inicial: c`// Escreva aqui a classe do carrinho (atributos privados + métodos)

public class Main {
    public static void main(String[] args) {
        // crie o carrinho, adicione os 3 produtos e imprima itens e total
    }
}
`,
      solucao: c`class Carrinho {
    private double total = 0;
    private int itens = 0;

    public void adicionar(String produto, double preco, int qtd) {
        total += preco * qtd;
        itens += qtd;
        System.out.println("+ " + qtd + "x " + produto);
    }

    public double getTotal() { return total; }
    public int getItens() { return itens; }
}

public class Main {
    public static void main(String[] args) {
        Carrinho carrinho = new Carrinho();
        carrinho.adicionar("Pão francês", 0.75, 10);
        carrinho.adicionar("Leite", 5.5, 2);
        carrinho.adicionar("Manteiga", 12.0, 1);

        System.out.println("Itens: " + carrinho.getItens());
        System.out.println("Total: R$ " + carrinho.getTotal());
    }
}`,
      padroes: [
        [/class\s+Carrinho\b/, "Crie a classe Carrinho."],
        [/private\s+double\s+total/, "O total deve ser um atributo private double."],
        [/void\s+adicionar\s*\(\s*String\s+\w+\s*,\s*double\s+\w+\s*,\s*int\s+\w+\s*\)/, "Crie void adicionar(String produto, double preco, int qtd)."],
        [/getTotal\s*\(\s*\)/, "Crie (e use) o getter getTotal()."]
      ],
      saidaEsperada: "+ 10x Pão francês\n+ 2x Leite\n+ 1x Manteiga\nItens: 13\nTotal: R$ 30.5"
    }
  ],

  // ───────────────────────── i1: Collections e Streams
  i1: [
    {
      tipo: "completar",
      titulo: "Filtrando pedidos grandes",
      enunciado: `Substitua cada <code>____</code> para, com um <b>Stream</b>, manter só os pedidos com valor acima de R$ 100 e juntar o resultado
        em uma lista. Saída esperada:
        <pre>Pedidos acima de R$ 100: 2
#102 Beto
#103 Caio</pre>`,
      dica: `A esteira começa com <code>stream()</code>, filtra com <code>filter(p -&gt; ...)</code> e termina com <code>toList()</code>.`,
      lang: "java",
      inicial: c`import java.util.*;

record Pedido(int numero, String cliente, double valor) {}

public class Main {
    public static void main(String[] args) {
        List<Pedido> pedidos = List.of(
            new Pedido(101, "Ana", 89.9),
            new Pedido(102, "Beto", 250.0),
            new Pedido(103, "Caio", 120.0),
            new Pedido(104, "Duda", 45.0));

        List<Pedido> grandes = pedidos.____()
            .____(p -> p.valor() > 100)
            .____();

        System.out.println("Pedidos acima de R$ 100: " + grandes.size());
        for (Pedido p : grandes) {
            System.out.println("#" + p.numero() + " " + p.cliente());
        }
    }
}
`,
      solucao: c`import java.util.*;

record Pedido(int numero, String cliente, double valor) {}

public class Main {
    public static void main(String[] args) {
        List<Pedido> pedidos = List.of(
            new Pedido(101, "Ana", 89.9),
            new Pedido(102, "Beto", 250.0),
            new Pedido(103, "Caio", 120.0),
            new Pedido(104, "Duda", 45.0));

        List<Pedido> grandes = pedidos.stream()
            .filter(p -> p.valor() > 100)
            .toList();

        System.out.println("Pedidos acima de R$ 100: " + grandes.size());
        for (Pedido p : grandes) {
            System.out.println("#" + p.numero() + " " + p.cliente());
        }
    }
}`,
      padroes: [
        [/pedidos\.stream\s*\(\s*\)/, "Comece com pedidos.stream()."],
        [/\.filter\s*\(\s*p\s*->/, "Filtre com .filter(p -> ...)."],
        [/\.toList\s*\(\s*\)|Collectors\.toList\s*\(\s*\)/, "Junte o resultado em lista com .toList()."]
      ],
      saidaEsperada: "Pedidos acima de R$ 100: 2\n#102 Beto\n#103 Caio"
    },
    {
      tipo: "completar",
      titulo: "Alunos sem repetição com Set",
      enunciado: `As inscrições do curso de férias vieram com nomes repetidos. Substitua cada <code>____</code> para guardar os nomes em
        um <b>Set ordenado</b> (sem repetidos, em ordem alfabética) e verificar se Tom está inscrito. Saída esperada:
        <pre>Inscrições: 6
Alunos únicos: 4
[Bia, Lia, Rafa, Tom]
Tom inscrito? true</pre>`,
      dica: `<code>TreeSet</code> é o Set que mantém os elementos ordenados. Para perguntar "tem?", use <code>contains</code>.`,
      lang: "java",
      inicial: c`import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> inscricoes = List.of("Rafa", "Lia", "Rafa", "Tom", "Lia", "Bia");

        ____<String> unicos = new ____<>(inscricoes);

        System.out.println("Inscrições: " + inscricoes.size());
        System.out.println("Alunos únicos: " + unicos.size());
        System.out.println(unicos);
        System.out.println("Tom inscrito? " + unicos.____("Tom"));
    }
}
`,
      solucao: c`import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> inscricoes = List.of("Rafa", "Lia", "Rafa", "Tom", "Lia", "Bia");

        Set<String> unicos = new TreeSet<>(inscricoes);

        System.out.println("Inscrições: " + inscricoes.size());
        System.out.println("Alunos únicos: " + unicos.size());
        System.out.println(unicos);
        System.out.println("Tom inscrito? " + unicos.contains("Tom"));
    }
}`,
      padroes: [
        [/(Set|SortedSet|TreeSet)\s*<\s*String\s*>\s+unicos/, "Declare unicos como um Set<String>."],
        [/new\s+TreeSet\s*<\s*(String)?\s*>\s*\(\s*inscricoes\s*\)/, "Use new TreeSet<>(inscricoes) para remover repetidos e ordenar."],
        [/unicos\.contains\s*\(\s*"Tom"\s*\)/, "Pergunte com unicos.contains(\"Tom\")."]
      ],
      saidaEsperada: "Inscrições: 6\nAlunos únicos: 4\n[Bia, Lia, Rafa, Tom]\nTom inscrito? true"
    },
    {
      tipo: "completar",
      titulo: "Estoque do mercado em um Map",
      enunciado: `O estoque é um <b>Map</b> de produto → quantidade. Substitua cada <code>____</code> para:
        usar um Map com chaves em ordem alfabética, atualizar o arroz (vendeu 5), buscar o açúcar com valor padrão 0
        (ele não está cadastrado) e percorrer o mapa. Saída esperada:
        <pre>arroz: 25
café: 0
feijão: 12
açúcar: 0 (não cadastrado)</pre>`,
      dica: `<code>TreeMap</code> ordena pelas chaves. <code>put</code> grava (ou substitui), <code>getOrDefault</code> evita o <code>null</code> e <code>forEach((chave, valor) -&gt; ...)</code> percorre.`,
      lang: "java",
      inicial: c`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> estoque = new ____<>();
        estoque.put("arroz", 30);
        estoque.put("feijão", 12);
        estoque.put("café", 0);

        estoque.____("arroz", estoque.get("arroz") - 5);
        int acucar = estoque.____("açúcar", 0);

        estoque.____((produto, qtd) -> System.out.println(produto + ": " + qtd));
        System.out.println("açúcar: " + acucar + " (não cadastrado)");
    }
}
`,
      solucao: c`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> estoque = new TreeMap<>();
        estoque.put("arroz", 30);
        estoque.put("feijão", 12);
        estoque.put("café", 0);

        estoque.put("arroz", estoque.get("arroz") - 5);
        int acucar = estoque.getOrDefault("açúcar", 0);

        estoque.forEach((produto, qtd) -> System.out.println(produto + ": " + qtd));
        System.out.println("açúcar: " + acucar + " (não cadastrado)");
    }
}`,
      padroes: [
        [/new\s+TreeMap\s*</, "Use new TreeMap<>() para manter as chaves em ordem alfabética."],
        [/estoque\.put\s*\(\s*"arroz"\s*,\s*estoque\.get\s*\(\s*"arroz"\s*\)\s*-\s*5\s*\)/, "Atualize o arroz com estoque.put(\"arroz\", ...)."],
        [/estoque\.getOrDefault\s*\(\s*"açúcar"\s*,\s*0\s*\)/, "Busque o açúcar com getOrDefault(\"açúcar\", 0)."],
        [/estoque\.forEach\s*\(/, "Percorra o mapa com estoque.forEach(...)."]
      ],
      saidaEsperada: "arroz: 25\ncafé: 0\nfeijão: 12\naçúcar: 0 (não cadastrado)"
    },
    {
      tipo: "criar",
      titulo: "Reembolso por categoria",
      enunciado: `O financeiro quer o total de despesas de reembolso <b>por categoria</b>, em ordem alfabética, e o total geral.
        Usando Streams:
        <ul>
          <li>agrupe as despesas por categoria somando os valores (o resultado deve ser um Map ordenado pela chave);</li>
          <li>calcule o total geral com um stream que soma todos os valores.</li>
        </ul>
        Imprima com <code>printf</code> (2 casas):
        <pre>Alimentação: R$ 60.00
Material: R$ 150.00
Transporte: R$ 65.00
Total geral: R$ 275.00</pre>`,
      dica: `<code>Collectors.groupingBy(Despesa::categoria, TreeMap::new, Collectors.summingDouble(Despesa::valor))</code>. Para o total: <code>mapToDouble(...).sum()</code>.`,
      lang: "java",
      inicial: c`import java.util.*;
import java.util.stream.*;

record Despesa(String categoria, double valor) {}

public class Main {
    public static void main(String[] args) {
        List<Despesa> despesas = List.of(
            new Despesa("Transporte", 45.0),
            new Despesa("Alimentação", 32.5),
            new Despesa("Transporte", 20.0),
            new Despesa("Material", 150.0),
            new Despesa("Alimentação", 27.5));

        // 1) agrupe por categoria somando os valores (em ordem alfabética)
        // 2) imprima cada categoria
        // 3) calcule e imprima o total geral
    }
}
`,
      solucao: c`import java.util.*;
import java.util.stream.*;

record Despesa(String categoria, double valor) {}

public class Main {
    public static void main(String[] args) {
        List<Despesa> despesas = List.of(
            new Despesa("Transporte", 45.0),
            new Despesa("Alimentação", 32.5),
            new Despesa("Transporte", 20.0),
            new Despesa("Material", 150.0),
            new Despesa("Alimentação", 27.5));

        Map<String, Double> porCategoria = despesas.stream()
            .collect(Collectors.groupingBy(Despesa::categoria, TreeMap::new,
                Collectors.summingDouble(Despesa::valor)));

        porCategoria.forEach((cat, total) -> System.out.printf("%s: R$ %.2f%n", cat, total));

        double geral = despesas.stream().mapToDouble(Despesa::valor).sum();
        System.out.printf("Total geral: R$ %.2f%n", geral);
    }
}`,
      padroes: [
        [/Collectors\.groupingBy\s*\(|\bgroupingBy\s*\(/, "Agrupe com Collectors.groupingBy(...)."],
        [/TreeMap/, "Use um TreeMap para as categorias saírem em ordem alfabética."],
        [/summingDouble\s*\(/, "Some os valores de cada grupo com Collectors.summingDouble(...)."],
        [/\.sum\s*\(\s*\)/, "Calcule o total geral com mapToDouble(...).sum()."]
      ],
      saidaEsperada: "Alimentação: R$ 60.00\nMaterial: R$ 150.00\nTransporte: R$ 65.00\nTotal geral: R$ 275.00"
    },
    {
      tipo: "criar",
      titulo: "Busca de cliente com Optional",
      enunciado: `Crie o método <code>static Optional&lt;Cliente&gt; buscarPorCpf(List&lt;Cliente&gt; clientes, String cpf)</code>, que usa um Stream
        para achar o <b>primeiro</b> cliente com aquele CPF. No <code>main</code>:
        <ul>
          <li>busque o CPF <code>"222"</code> e o <code>"999"</code>, imprimindo o nome ou <code>"Cliente não encontrado"</code> (sem usar <code>if</code> com <code>null</code>);</li>
          <li>imprima a lista dos nomes em ordem alfabética, gerada com um stream ordenado.</li>
        </ul>
        Saída esperada:
        <pre>222: Bruno Lima
999: Cliente não encontrado
[Ana Costa, Bruno Lima, Carla Dias]</pre>`,
      dica: `<code>filter(...).findFirst()</code> devolve um Optional; depois <code>.map(Cliente::nome).orElse("...")</code>. Para ordenar: <code>sorted()</code>.`,
      lang: "java",
      inicial: c`import java.util.*;

record Cliente(String cpf, String nome) {}

public class Main {
    // crie aqui o método de busca por CPF

    public static void main(String[] args) {
        List<Cliente> clientes = List.of(
            new Cliente("333", "Carla Dias"),
            new Cliente("111", "Ana Costa"),
            new Cliente("222", "Bruno Lima"));

        // busque "222" e "999" e depois imprima os nomes em ordem alfabética
    }
}
`,
      solucao: c`import java.util.*;

record Cliente(String cpf, String nome) {}

public class Main {
    static Optional<Cliente> buscarPorCpf(List<Cliente> clientes, String cpf) {
        return clientes.stream()
            .filter(c -> c.cpf().equals(cpf))
            .findFirst();
    }

    public static void main(String[] args) {
        List<Cliente> clientes = List.of(
            new Cliente("333", "Carla Dias"),
            new Cliente("111", "Ana Costa"),
            new Cliente("222", "Bruno Lima"));

        for (String cpf : List.of("222", "999")) {
            String nome = buscarPorCpf(clientes, cpf)
                .map(Cliente::nome)
                .orElse("Cliente não encontrado");
            System.out.println(cpf + ": " + nome);
        }

        List<String> nomes = clientes.stream().map(Cliente::nome).sorted().toList();
        System.out.println(nomes);
    }
}`,
      padroes: [
        [/Optional\s*<\s*Cliente\s*>\s+buscarPorCpf\s*\(/, "Crie o método Optional<Cliente> buscarPorCpf(...)."],
        [/\.findFirst\s*\(\s*\)/, "Use findFirst() para pegar o primeiro cliente encontrado."],
        [/\.orElse(Get)?\s*\(/, "Trate o 'não encontrado' com .orElse(...)."],
        [/\.sorted\s*\(/, "Ordene os nomes com .sorted()."]
      ],
      saidaEsperada: "222: Bruno Lima\n999: Cliente não encontrado\n[Ana Costa, Bruno Lima, Carla Dias]"
    }
  ],

  // ───────────────────────── i2: Herança, polimorfismo e interfaces
  i2: [
    {
      tipo: "completar",
      titulo: "Contrato de pagamento",
      enunciado: `O checkout aceita qualquer meio de pagamento que assine o contrato <code>MeioPagamento</code>. Substitua cada <code>____</code>
        para declarar a interface, fazer <code>Pix</code> e <code>Boleto</code> a implementarem e receber o contrato em <code>finalizar</code>. Saída esperada:
        <pre>Pix de R$ 89.9 aprovado
Pedido liberado
Boleto de R$ 89.9 gerado (vence em 3 dias)
Aguardando pagamento</pre>`,
      dica: `Contrato se declara com <code>interface</code>; quem assina usa <code>implements</code>. O parâmetro pode ter o tipo da interface.`,
      lang: "java",
      inicial: c`____ MeioPagamento {
    boolean pagar(double valor);
}

class Pix ____ MeioPagamento {
    @Override
    public boolean pagar(double valor) {
        System.out.println("Pix de R$ " + valor + " aprovado");
        return true;
    }
}

class Boleto ____ MeioPagamento {
    @Override
    public boolean pagar(double valor) {
        System.out.println("Boleto de R$ " + valor + " gerado (vence em 3 dias)");
        return false;
    }
}

public class Main {
    static void finalizar(____ meio, double total) {
        boolean pago = meio.pagar(total);
        System.out.println(pago ? "Pedido liberado" : "Aguardando pagamento");
    }

    public static void main(String[] args) {
        finalizar(new Pix(), 89.9);
        finalizar(new Boleto(), 89.9);
    }
}
`,
      solucao: c`interface MeioPagamento {
    boolean pagar(double valor);
}

class Pix implements MeioPagamento {
    @Override
    public boolean pagar(double valor) {
        System.out.println("Pix de R$ " + valor + " aprovado");
        return true;
    }
}

class Boleto implements MeioPagamento {
    @Override
    public boolean pagar(double valor) {
        System.out.println("Boleto de R$ " + valor + " gerado (vence em 3 dias)");
        return false;
    }
}

public class Main {
    static void finalizar(MeioPagamento meio, double total) {
        boolean pago = meio.pagar(total);
        System.out.println(pago ? "Pedido liberado" : "Aguardando pagamento");
    }

    public static void main(String[] args) {
        finalizar(new Pix(), 89.9);
        finalizar(new Boleto(), 89.9);
    }
}`,
      padroes: [
        [/interface\s+MeioPagamento/, "Declare MeioPagamento como interface."],
        [/class\s+Pix\s+implements\s+MeioPagamento/, "Pix deve implementar (implements) MeioPagamento."],
        [/class\s+Boleto\s+implements\s+MeioPagamento/, "Boleto deve implementar (implements) MeioPagamento."],
        [/finalizar\s*\(\s*MeioPagamento\s+meio/, "finalizar deve receber o tipo da interface: MeioPagamento meio."]
      ],
      saidaEsperada: "Pix de R$ 89.9 aprovado\nPedido liberado\nBoleto de R$ 89.9 gerado (vence em 3 dias)\nAguardando pagamento"
    },
    {
      tipo: "completar",
      titulo: "Bônus do gerente com herança",
      enunciado: `Todo funcionário ganha 10% do salário de bônus; o gerente ganha isso <b>mais R$ 1000</b>. Substitua cada <code>____</code> para
        <code>Gerente</code> herdar de <code>Funcionario</code>, chamar o construtor da classe mãe e sobrescrever <code>bonus()</code>
        reaproveitando o cálculo original. Saída esperada:
        <pre>Paulo - bônus: R$ 300.0
Renata - bônus: R$ 1800.0</pre>`,
      dica: `Herança: <code>extends</code>. O construtor da mãe é <code>super(...)</code> e o método da mãe é <code>super.bonus()</code>.`,
      lang: "java",
      inicial: c`import java.util.*;

class Funcionario {
    protected String nome;
    protected double salario;

    public Funcionario(String nome, double salario) {
        this.nome = nome;
        this.salario = salario;
    }

    public double bonus() { return salario * 0.10; }

    public String resumo() { return nome + " - bônus: R$ " + bonus(); }
}

class Gerente ____ Funcionario {
    public Gerente(String nome, double salario) {
        ____(nome, salario);
    }

    @Override
    public double bonus() { return ____.bonus() + 1000; }
}

public class Main {
    public static void main(String[] args) {
        List<Funcionario> equipe = List.of(new Funcionario("Paulo", 3000), new Gerente("Renata", 8000));
        for (Funcionario f : equipe) {
            System.out.println(f.resumo());
        }
    }
}
`,
      solucao: c`import java.util.*;

class Funcionario {
    protected String nome;
    protected double salario;

    public Funcionario(String nome, double salario) {
        this.nome = nome;
        this.salario = salario;
    }

    public double bonus() { return salario * 0.10; }

    public String resumo() { return nome + " - bônus: R$ " + bonus(); }
}

class Gerente extends Funcionario {
    public Gerente(String nome, double salario) {
        super(nome, salario);
    }

    @Override
    public double bonus() { return super.bonus() + 1000; }
}

public class Main {
    public static void main(String[] args) {
        List<Funcionario> equipe = List.of(new Funcionario("Paulo", 3000), new Gerente("Renata", 8000));
        for (Funcionario f : equipe) {
            System.out.println(f.resumo());
        }
    }
}`,
      padroes: [
        [/class\s+Gerente\s+extends\s+Funcionario/, "Gerente deve herdar: class Gerente extends Funcionario."],
        [/super\s*\(\s*nome\s*,\s*salario\s*\)/, "Chame o construtor da mãe com super(nome, salario)."],
        [/super\.bonus\s*\(\s*\)\s*\+\s*1000/, "Reaproveite o cálculo da mãe: super.bonus() + 1000."]
      ],
      saidaEsperada: "Paulo - bônus: R$ 300.0\nRenata - bônus: R$ 1800.0"
    },
    {
      tipo: "completar",
      titulo: "Notificações com método default",
      enunciado: `A clínica avisa os pacientes por e-mail e SMS. A interface <code>Notificador</code> tem um método <b>default</b>
        <code>assinatura()</code>, que o SMS sobrescreve para ficar mais curto. Substitua cada <code>____</code>. Saída esperada:
        <pre>[E-mail para Joana] Consulta amanhã às 9h. -- Clínica Vida
[SMS para Joana] Consulta amanhã às 9h. -- Vida</pre>`,
      dica: `Método com corpo dentro de interface leva a palavra <code>default</code>. A lista e o laço podem usar o tipo da interface.`,
      lang: "java",
      inicial: c`import java.util.*;

interface Notificador {
    void enviar(String destino, String msg);

    ____ String assinatura() {
        return "-- Clínica Vida";
    }
}

class Email implements Notificador {
    public void enviar(String destino, String msg) {
        System.out.println("[E-mail para " + destino + "] " + msg + " " + assinatura());
    }
}

class Sms implements Notificador {
    public void enviar(String destino, String msg) {
        System.out.println("[SMS para " + destino + "] " + msg + " " + assinatura());
    }

    @Override
    public String assinatura() {
        return "-- Vida";
    }
}

public class Main {
    public static void main(String[] args) {
        List<____> canais = List.of(new Email(), new Sms());
        for (____ n : canais) {
            n.enviar("Joana", "Consulta amanhã às 9h.");
        }
    }
}
`,
      solucao: c`import java.util.*;

interface Notificador {
    void enviar(String destino, String msg);

    default String assinatura() {
        return "-- Clínica Vida";
    }
}

class Email implements Notificador {
    public void enviar(String destino, String msg) {
        System.out.println("[E-mail para " + destino + "] " + msg + " " + assinatura());
    }
}

class Sms implements Notificador {
    public void enviar(String destino, String msg) {
        System.out.println("[SMS para " + destino + "] " + msg + " " + assinatura());
    }

    @Override
    public String assinatura() {
        return "-- Vida";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Notificador> canais = List.of(new Email(), new Sms());
        for (Notificador n : canais) {
            n.enviar("Joana", "Consulta amanhã às 9h.");
        }
    }
}`,
      padroes: [
        [/default\s+String\s+assinatura\s*\(/, "Na interface, o método com corpo é default String assinatura()."],
        [/List\s*<\s*Notificador\s*>\s+canais/, "A lista deve ser do tipo da interface: List<Notificador>."],
        [/for\s*\(\s*Notificador\s+n\s*:\s*canais\s*\)/, "Percorra com for (Notificador n : canais)."]
      ],
      saidaEsperada: "[E-mail para Joana] Consulta amanhã às 9h. -- Clínica Vida\n[SMS para Joana] Consulta amanhã às 9h. -- Vida"
    },
    {
      tipo: "criar",
      titulo: "Formas de entrega com polimorfismo",
      enunciado: `Crie a interface <code>Entrega</code> com <code>String nome()</code> e <code>double frete(double km)</code>, e três classes que a implementam:
        <ul>
          <li><code>Moto</code>: nome "Moto", frete = 5 + 1.5 × km;</li>
          <li><code>Caminhao</code>: nome "Caminhão", frete = 40 + 0.5 × km;</li>
          <li><code>Drone</code>: nome "Drone", frete fixo de 20.</li>
        </ul>
        No <code>main</code>, coloque as três numa <code>List&lt;Entrega&gt;</code>, calcule o frete para <b>8 km</b> de cada uma (printf, 2 casas)
        e descubra a mais barata percorrendo a lista. Saída esperada:
        <pre>Moto: R$ 17.00
Caminhão: R$ 44.00
Drone: R$ 20.00
Mais barata: Moto</pre>`,
      dica: `Guarde a mais barata em uma variável do tipo <code>Entrega</code> e compare <code>e.frete(km)</code> de cada item dentro do laço.`,
      lang: "java",
      inicial: c`import java.util.*;

// 1) crie o contrato das entregas e as três classes

public class Main {
    public static void main(String[] args) {
        double km = 8;
        // 2) monte a lista, imprima o frete de cada uma e a mais barata
    }
}
`,
      solucao: c`import java.util.*;

interface Entrega {
    String nome();
    double frete(double km);
}

class Moto implements Entrega {
    public String nome() { return "Moto"; }
    public double frete(double km) { return 5 + 1.5 * km; }
}

class Caminhao implements Entrega {
    public String nome() { return "Caminhão"; }
    public double frete(double km) { return 40 + 0.5 * km; }
}

class Drone implements Entrega {
    public String nome() { return "Drone"; }
    public double frete(double km) { return 20; }
}

public class Main {
    public static void main(String[] args) {
        double km = 8;
        List<Entrega> opcoes = List.of(new Moto(), new Caminhao(), new Drone());

        Entrega maisBarata = opcoes.get(0);
        for (Entrega e : opcoes) {
            System.out.printf("%s: R$ %.2f%n", e.nome(), e.frete(km));
            if (e.frete(km) < maisBarata.frete(km)) {
                maisBarata = e;
            }
        }
        System.out.println("Mais barata: " + maisBarata.nome());
    }
}`,
      padroes: [
        [/interface\s+Entrega\b/, "Crie a interface Entrega."],
        [/(implements\s+Entrega\b[\s\S]*){3}/, "Crie as três classes (Moto, Caminhao, Drone) com implements Entrega."],
        [/List\s*<\s*Entrega\s*>/, "Guarde as opções numa List<Entrega>."],
        [/\.frete\s*\(\s*km\s*\)/, "Calcule o frete chamando .frete(km) em cada entrega."]
      ],
      saidaEsperada: "Moto: R$ 17.00\nCaminhão: R$ 44.00\nDrone: R$ 20.00\nMais barata: Moto"
    },
    {
      tipo: "criar",
      titulo: "Pacientes da clínica veterinária",
      enunciado: `Crie a <b>classe abstrata</b> <code>Animal</code> com:
        <ul>
          <li>atributo <code>protected final String nome</code> e construtor <code>Animal(String nome)</code>;</li>
          <li>método abstrato <code>abstract String som()</code>;</li>
          <li>método <code>String apresentar()</code> que devolve <code>nome + " faz " + som()</code>.</li>
        </ul>
        Crie <code>Cachorro</code> (som "Au au!") e <code>Gato</code> (som "Miau!") herdando de <code>Animal</code>.
        No <code>main</code>, percorra um array <code>Animal[]</code> com Rex (cachorro) e Mimi (gata) e imprima:
        <pre>Rex faz Au au!
Mimi faz Miau!
Pacientes atendidos: 2</pre>`,
      dica: `Classe abstrata não pode ser instanciada com <code>new Animal(...)</code>. As filhas chamam <code>super(nome)</code> no construtor e implementam <code>som()</code>.`,
      lang: "java",
      inicial: c`// 1) crie a classe base dos animais (abstrata) e as duas filhas

public class Main {
    public static void main(String[] args) {
        // 2) crie o array de pacientes e imprima as apresentações e a contagem
    }
}
`,
      solucao: c`abstract class Animal {
    protected final String nome;

    Animal(String nome) {
        this.nome = nome;
    }

    abstract String som();

    String apresentar() {
        return nome + " faz " + som();
    }
}

class Cachorro extends Animal {
    Cachorro(String nome) { super(nome); }

    @Override
    String som() { return "Au au!"; }
}

class Gato extends Animal {
    Gato(String nome) { super(nome); }

    @Override
    String som() { return "Miau!"; }
}

public class Main {
    public static void main(String[] args) {
        Animal[] pacientes = { new Cachorro("Rex"), new Gato("Mimi") };
        for (Animal a : pacientes) {
            System.out.println(a.apresentar());
        }
        System.out.println("Pacientes atendidos: " + pacientes.length);
    }
}`,
      padroes: [
        [/abstract\s+class\s+Animal/, "Animal deve ser uma abstract class."],
        [/abstract\s+String\s+som\s*\(\s*\)\s*;/, "Declare o método abstrato: abstract String som();"],
        [/class\s+Cachorro\s+extends\s+Animal/, "Cachorro deve herdar de Animal (extends)."],
        [/class\s+Gato\s+extends\s+Animal/, "Gato deve herdar de Animal (extends)."],
        [/Animal\s*\[\s*\]/, "Guarde os pacientes num array Animal[]."]
      ],
      saidaEsperada: "Rex faz Au au!\nMimi faz Miau!\nPacientes atendidos: 2"
    }
  ],

  // ───────────────────────── i3: Exceções
  i3: [
    {
      tipo: "completar",
      titulo: "Quantidades digitadas com erro",
      enunciado: `Os atendentes digitam as quantidades como texto e às vezes erram. Substitua cada <code>____</code> para converter cada texto em
        <code>int</code> e, se a conversão falhar, avisar e continuar. Saída esperada:
        <pre>Ok: 12
Valor inválido: 3a
Ok: 7
Total: 19</pre>`,
      dica: `<code>Integer.parseInt</code> lança <code>NumberFormatException</code> quando o texto não é um número.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        String[] entradas = {"12", "3a", "7"};
        int total = 0;

        for (String e : entradas) {
            ____ {
                int qtd = Integer.____(e);
                total += qtd;
                System.out.println("Ok: " + qtd);
            } ____ (____ ex) {
                System.out.println("Valor inválido: " + e);
            }
        }
        System.out.println("Total: " + total);
    }
}
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        String[] entradas = {"12", "3a", "7"};
        int total = 0;

        for (String e : entradas) {
            try {
                int qtd = Integer.parseInt(e);
                total += qtd;
                System.out.println("Ok: " + qtd);
            } catch (NumberFormatException ex) {
                System.out.println("Valor inválido: " + e);
            }
        }
        System.out.println("Total: " + total);
    }
}`,
      padroes: [
        [/try\s*\{/, "Coloque a conversão dentro de um bloco try."],
        [/Integer\.parseInt\s*\(\s*e\s*\)/, "Converta com Integer.parseInt(e)."],
        [/catch\s*\(\s*NumberFormatException\s+ex\s*\)/, "Capture a exceção específica: catch (NumberFormatException ex)."]
      ],
      saidaEsperada: "Ok: 12\nValor inválido: 3a\nOk: 7\nTotal: 19"
    },
    {
      tipo: "completar",
      titulo: "Exceção de saldo insuficiente",
      enunciado: `Crie a exceção de negócio <code>SaldoInsuficienteException</code> (unchecked) e use-a no saque. Substitua cada <code>____</code>. Saída esperada:
        <pre>Saque de R$ 50.0 ok. Saldo: R$ 150.0
Erro: Saldo de R$ 150.0 não cobre R$ 300.0</pre>
        Repare que o terceiro saque nem acontece: ao lançar a exceção, o <code>try</code> é interrompido.`,
      dica: `Exceções unchecked herdam de <code>RuntimeException</code>. A mensagem vai para a mãe com <code>super(msg)</code>; para disparar, <code>throw new ...</code>.`,
      lang: "java",
      inicial: c`class SaldoInsuficienteException extends ____ {
    public SaldoInsuficienteException(String msg) {
        ____(msg);
    }
}

class Conta {
    private double saldo;

    Conta(double saldo) { this.saldo = saldo; }

    void sacar(double valor) {
        if (valor > saldo) {
            ____ new SaldoInsuficienteException("Saldo de R$ " + saldo + " não cobre R$ " + valor);
        }
        saldo -= valor;
        System.out.println("Saque de R$ " + valor + " ok. Saldo: R$ " + saldo);
    }
}

public class Main {
    public static void main(String[] args) {
        Conta conta = new Conta(200);
        try {
            conta.sacar(50);
            conta.sacar(300);
            conta.sacar(10);
        } catch (SaldoInsuficienteException e) {
            System.out.println("Erro: " + e.____());
        }
    }
}
`,
      solucao: c`class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String msg) {
        super(msg);
    }
}

class Conta {
    private double saldo;

    Conta(double saldo) { this.saldo = saldo; }

    void sacar(double valor) {
        if (valor > saldo) {
            throw new SaldoInsuficienteException("Saldo de R$ " + saldo + " não cobre R$ " + valor);
        }
        saldo -= valor;
        System.out.println("Saque de R$ " + valor + " ok. Saldo: R$ " + saldo);
    }
}

public class Main {
    public static void main(String[] args) {
        Conta conta = new Conta(200);
        try {
            conta.sacar(50);
            conta.sacar(300);
            conta.sacar(10);
        } catch (SaldoInsuficienteException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}`,
      padroes: [
        [/extends\s+RuntimeException/, "Exceção unchecked herda de RuntimeException."],
        [/super\s*\(\s*msg\s*\)/, "Passe a mensagem para a classe mãe com super(msg)."],
        [/throw\s+new\s+SaldoInsuficienteException/, "Dispare a exceção com throw new SaldoInsuficienteException(...)."],
        [/e\.getMessage\s*\(\s*\)/, "Mostre a mensagem com e.getMessage()."]
      ],
      saidaEsperada: "Saque de R$ 50.0 ok. Saldo: R$ 150.0\nErro: Saldo de R$ 150.0 não cobre R$ 300.0"
    },
    {
      tipo: "completar",
      titulo: "Dividindo a conta da mesa",
      enunciado: `O restaurante divide a conta de R$ 120 entre as pessoas da mesa. Se alguém digitar 0 pessoas, a divisão inteira lança
        <code>ArithmeticException</code>. Em qualquer caso, a mesa deve ser liberada no final. Substitua cada <code>____</code>. Saída esperada:
        <pre>Cada um paga R$ 30
Mesa liberada
Erro: / by zero
Mesa liberada</pre>`,
      dica: `O bloco que roda <b>sempre</b>, dando erro ou não, é o <code>finally</code>.`,
      lang: "java",
      inicial: c`public class Main {
    static int dividirConta(int total, int pessoas) {
        return total / pessoas;
    }

    public static void main(String[] args) {
        int[] mesas = {4, 0};

        for (int pessoas : mesas) {
            try {
                System.out.println("Cada um paga R$ " + dividirConta(120, pessoas));
            } catch (____ e) {
                System.out.println("Erro: " + e.getMessage());
            } ____ {
                System.out.println("Mesa liberada");
            }
        }
    }
}
`,
      solucao: c`public class Main {
    static int dividirConta(int total, int pessoas) {
        return total / pessoas;
    }

    public static void main(String[] args) {
        int[] mesas = {4, 0};

        for (int pessoas : mesas) {
            try {
                System.out.println("Cada um paga R$ " + dividirConta(120, pessoas));
            } catch (ArithmeticException e) {
                System.out.println("Erro: " + e.getMessage());
            } finally {
                System.out.println("Mesa liberada");
            }
        }
    }
}`,
      padroes: [
        [/catch\s*\(\s*ArithmeticException\s+e\s*\)/, "Capture a exceção da divisão por zero: catch (ArithmeticException e)."],
        [/\}\s*finally\s*\{/, "Use finally para liberar a mesa em qualquer caso."]
      ],
      saidaEsperada: "Cada um paga R$ 30\nMesa liberada\nErro: / by zero\nMesa liberada"
    },
    {
      tipo: "criar",
      titulo: "Conexão que se fecha sozinha",
      enunciado: `Crie a classe <code>ConexaoBanco</code> que implementa <code>AutoCloseable</code>:
        <ul>
          <li>o construtor imprime <code>Conexão aberta</code>;</li>
          <li><code>void executar(String sql)</code> imprime <code>Executando: </code> + sql, mas se o comando estiver vazio (<code>isBlank()</code>)
            lança <code>IllegalArgumentException("comando vazio")</code>;</li>
          <li><code>public void close()</code> imprime <code>Conexão fechada</code>.</li>
        </ul>
        No <code>main</code>, use <b>try-with-resources</b> para abrir a conexão, executar <code>"SELECT * FROM pedidos"</code> e depois <code>""</code>,
        e um <code>catch</code> que imprime <code>Erro: </code> + a mensagem. Saída esperada (repare que a conexão fecha <b>antes</b> do catch):
        <pre>Conexão aberta
Executando: SELECT * FROM pedidos
Conexão fechada
Erro: comando vazio</pre>`,
      dica: `A sintaxe é <code>try (ConexaoBanco con = new ConexaoBanco()) { ... } catch (...) { ... }</code>. Se o seu <code>close()</code> não declarar <code>throws Exception</code>, o compilador não obriga a tratar <code>Exception</code>.`,
      lang: "java",
      inicial: c`// 1) crie a classe da conexão (ela precisa poder ser fechada automaticamente)

public class Main {
    public static void main(String[] args) {
        // 2) abra a conexão no try com recursos, execute os dois comandos
        //    e trate o erro imprimindo a mensagem
    }
}
`,
      solucao: c`class ConexaoBanco implements AutoCloseable {
    ConexaoBanco() {
        System.out.println("Conexão aberta");
    }

    void executar(String sql) {
        if (sql.isBlank()) {
            throw new IllegalArgumentException("comando vazio");
        }
        System.out.println("Executando: " + sql);
    }

    @Override
    public void close() {
        System.out.println("Conexão fechada");
    }
}

public class Main {
    public static void main(String[] args) {
        try (ConexaoBanco con = new ConexaoBanco()) {
            con.executar("SELECT * FROM pedidos");
            con.executar("");
        } catch (IllegalArgumentException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}`,
      padroes: [
        [/class\s+ConexaoBanco\s+implements\s+AutoCloseable/, "ConexaoBanco deve implementar AutoCloseable."],
        [/public\s+void\s+close\s*\(\s*\)/, "Implemente o método public void close()."],
        [/throw\s+new\s+IllegalArgumentException\s*\(/, "Lance IllegalArgumentException(\"comando vazio\") para comando vazio."],
        [/try\s*\(\s*(var|ConexaoBanco)\s+\w+\s*=\s*new\s+ConexaoBanco\s*\(/, "Abra a conexão com try-with-resources: try (ConexaoBanco con = new ConexaoBanco()) { ... }."]
      ],
      saidaEsperada: "Conexão aberta\nExecutando: SELECT * FROM pedidos\nConexão fechada\nErro: comando vazio"
    },
    {
      tipo: "criar",
      titulo: "Validação de idade no cadastro do RH",
      enunciado: `Crie a exceção <b>checked</b> <code>IdadeInvalidaException</code> (herda de <code>Exception</code>) e o método
        <code>static void validarIdade(int idade)</code>, que <b>declara</b> que pode lançá-la:
        <ul>
          <li>idade menor que 18: mensagem <code>"Idade 15: menor de idade"</code> (com a idade recebida);</li>
          <li>idade maior que 120: mensagem <code>"Idade 130: valor impossível"</code>.</li>
        </ul>
        No <code>main</code>, valide cada idade do array; se passar, imprima <code>Idade X: cadastro ok</code>; se não, <code>Recusado -&gt; </code> + mensagem.
        <pre>Idade 25: cadastro ok
Recusado -&gt; Idade 15: menor de idade
Recusado -&gt; Idade 130: valor impossível
Idade 40: cadastro ok</pre>`,
      dica: `Exceções checked exigem <code>throws IdadeInvalidaException</code> na assinatura do método, e quem chama precisa de <code>try/catch</code>.`,
      lang: "java",
      inicial: c`// 1) crie a exceção checked do cadastro

public class Main {
    // 2) crie o método que valida a idade

    public static void main(String[] args) {
        int[] idades = {25, 15, 130, 40};
        // 3) valide cada idade e imprima o resultado
    }
}
`,
      solucao: c`class IdadeInvalidaException extends Exception {
    public IdadeInvalidaException(String msg) {
        super(msg);
    }
}

public class Main {
    static void validarIdade(int idade) throws IdadeInvalidaException {
        if (idade < 18) {
            throw new IdadeInvalidaException("Idade " + idade + ": menor de idade");
        }
        if (idade > 120) {
            throw new IdadeInvalidaException("Idade " + idade + ": valor impossível");
        }
    }

    public static void main(String[] args) {
        int[] idades = {25, 15, 130, 40};
        for (int idade : idades) {
            try {
                validarIdade(idade);
                System.out.println("Idade " + idade + ": cadastro ok");
            } catch (IdadeInvalidaException e) {
                System.out.println("Recusado -> " + e.getMessage());
            }
        }
    }
}`,
      padroes: [
        [/class\s+IdadeInvalidaException\s+extends\s+Exception\b/, "A exceção checked herda de Exception (não de RuntimeException)."],
        [/validarIdade\s*\(\s*int\s+\w+\s*\)\s*throws\s+IdadeInvalidaException/, "Declare no método: throws IdadeInvalidaException."],
        [/throw\s+new\s+IdadeInvalidaException\s*\(/, "Lance a exceção com throw new IdadeInvalidaException(...)."],
        [/catch\s*\(\s*IdadeInvalidaException\s+\w+\s*\)/, "Trate com catch (IdadeInvalidaException e)."]
      ],
      saidaEsperada: "Idade 25: cadastro ok\nRecusado -> Idade 15: menor de idade\nRecusado -> Idade 130: valor impossível\nIdade 40: cadastro ok"
    }
  ],

  // ───────────────────────── a1: API REST com Spring Boot
  a1: [
    {
      tipo: "completar",
      titulo: "Primeiro endpoint da padaria",
      enunciado: `Crie o primeiro endpoint da API da padaria. Substitua cada <code>____</code> para:
        <ul>
          <li>transformar <code>SaudacaoController</code> em um controller REST;</li>
          <li>mapear o método para <b>GET /saudacao</b>;</li>
          <li>subir a aplicação Spring Boot no <code>main</code>.</li>
        </ul>
        Ao rodar e acessar <code>http://localhost:8080/saudacao</code>, a resposta deve ser:
        <pre>HTTP 200
Bem-vindo à Padaria Pão Quente!</pre>`,
      dica: `As anotações são <code>@RestController</code> e <code>@GetMapping("/caminho")</code>. A aplicação sobe com <code>SpringApplication.run(Main.class, args)</code>.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_SPRING,
      inicial: c`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.____(Main.class, args);
    }
}

@____
class SaudacaoController {

    @____("/saudacao")
    public String saudacao() {
        return "Bem-vindo à Padaria Pão Quente!";
    }
}
`,
      solucao: c`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@RestController
class SaudacaoController {

    @GetMapping("/saudacao")
    public String saudacao() {
        return "Bem-vindo à Padaria Pão Quente!";
    }
}`,
      padroes: [
        [/SpringApplication\.run\s*\(\s*Main\.class\s*,\s*args\s*\)/, "Suba a aplicação com SpringApplication.run(Main.class, args)."],
        [/@RestController\s+class\s+SaudacaoController/, "Anote a classe com @RestController."],
        [/@GetMapping\s*\(\s*"\/saudacao"\s*\)/, "Mapeie o método com @GetMapping(\"/saudacao\")."]
      ],
      saidaEsperada: "GET http://localhost:8080/saudacao\nHTTP 200\nBem-vindo à Padaria Pão Quente!"
    },
    {
      tipo: "completar",
      titulo: "Buscar produto por id (200 ou 404)",
      enunciado: `O endpoint <b>GET /produtos/{id}</b> deve devolver o produto com <b>200 OK</b> ou <b>404 Not Found</b> se o id não existir.
        Substitua cada <code>____</code> para:
        <ul>
          <li>definir o prefixo <code>/produtos</code> na classe;</li>
          <li>ler o <code>{id}</code> da URL no parâmetro;</li>
          <li>devolver <code>ResponseEntity.ok(...)</code> ou <code>ResponseEntity.notFound().build()</code>.</li>
        </ul>
        Execução real:
        <pre>GET /produtos/1  → 200 OK  {"id":1,"nome":"Pão de queijo","preco":4.50}
GET /produtos/99 → 404 Not Found (corpo vazio)</pre>`,
      dica: `Prefixo comum: <code>@RequestMapping("/produtos")</code>. Variável do caminho: <code>@PathVariable Long id</code>. O Optional vira resposta com <code>.map(ResponseEntity::ok)</code>.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_SPRING,
      inicial: c`import java.math.BigDecimal;
import java.util.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

record ProdutoDTO(Long id, String nome, BigDecimal preco) {}

@RestController
@____("/produtos")
class ProdutoController {

    private final Map<Long, ProdutoDTO> produtos = Map.of(
        1L, new ProdutoDTO(1L, "Pão de queijo", new BigDecimal("4.50")),
        2L, new ProdutoDTO(2L, "Café coado", new BigDecimal("6.00")));

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscar(@____ Long id) {
        return Optional.ofNullable(produtos.get(id))
            .map(ResponseEntity::____)
            .orElse(ResponseEntity.____().build());
    }
}
`,
      solucao: c`import java.math.BigDecimal;
import java.util.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

record ProdutoDTO(Long id, String nome, BigDecimal preco) {}

@RestController
@RequestMapping("/produtos")
class ProdutoController {

    private final Map<Long, ProdutoDTO> produtos = Map.of(
        1L, new ProdutoDTO(1L, "Pão de queijo", new BigDecimal("4.50")),
        2L, new ProdutoDTO(2L, "Café coado", new BigDecimal("6.00")));

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscar(@PathVariable Long id) {
        return Optional.ofNullable(produtos.get(id))
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}`,
      padroes: [
        [/@RequestMapping\s*\(\s*"\/produtos"\s*\)/, "Defina o prefixo da classe com @RequestMapping(\"/produtos\")."],
        [/@PathVariable\s+Long\s+id/, "Leia o id da URL com @PathVariable Long id."],
        [/\.map\s*\(\s*ResponseEntity::ok\s*\)/, "Quando achar, responda 200 com .map(ResponseEntity::ok)."],
        [/ResponseEntity\.notFound\s*\(\s*\)\s*\.build\s*\(\s*\)/, "Quando não achar, responda ResponseEntity.notFound().build()."]
      ],
      saidaEsperada: "GET /produtos/1  -> 200 OK\n{\"id\":1,\"nome\":\"Pão de queijo\",\"preco\":4.50}\nGET /produtos/99 -> 404 Not Found (corpo vazio)"
    },
    {
      tipo: "completar",
      titulo: "Camadas com injeção pelo construtor",
      enunciado: `No Spring, o <b>Controller</b> recebe o <b>Service</b>, que recebe o <b>Repository</b>, sempre pelo construtor (o Spring faz os
        <code>new</code> por você). Aqui simulamos isso em Java puro. Substitua cada <code>____</code> para:
        <ul>
          <li>declarar a dependência do controller como <code>private final</code>;</li>
          <li>guardá-la no construtor;</li>
          <li>no <code>main</code>, montar as três camadas como o container do Spring faria.</li>
        </ul>
        Saída esperada:
        <pre>GET /produtos -&gt; [Café, Pão francês, Sonho]</pre>`,
      dica: `Monte de dentro para fora: <code>new ProdutoController(new ProdutoService(new ProdutoRepository()))</code>.`,
      lang: "java",
      inicial: c`import java.util.*;

class ProdutoRepository {
    List<String> findAll() {
        return List.of("Sonho", "Café", "Pão francês");
    }
}

class ProdutoService {
    private final ProdutoRepository repository;

    ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    List<String> listarOrdenado() {
        return repository.findAll().stream().sorted().toList();
    }
}

class ProdutoController {
    ____ ProdutoService service;

    ProdutoController(ProdutoService service) {
        ____ = service;
    }

    String listar() {
        return "GET /produtos -> " + service.listarOrdenado();
    }
}

public class Main {
    public static void main(String[] args) {
        // o Spring faria isto sozinho (injeção de dependência)
        ProdutoController controller = ____;
        System.out.println(controller.listar());
    }
}
`,
      solucao: c`import java.util.*;

class ProdutoRepository {
    List<String> findAll() {
        return List.of("Sonho", "Café", "Pão francês");
    }
}

class ProdutoService {
    private final ProdutoRepository repository;

    ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    List<String> listarOrdenado() {
        return repository.findAll().stream().sorted().toList();
    }
}

class ProdutoController {
    private final ProdutoService service;

    ProdutoController(ProdutoService service) {
        this.service = service;
    }

    String listar() {
        return "GET /produtos -> " + service.listarOrdenado();
    }
}

public class Main {
    public static void main(String[] args) {
        // o Spring faria isto sozinho (injeção de dependência)
        ProdutoController controller = new ProdutoController(new ProdutoService(new ProdutoRepository()));
        System.out.println(controller.listar());
    }
}`,
      padroes: [
        [/private\s+final\s+ProdutoService\s+service/, "A dependência deve ser private final ProdutoService service."],
        [/this\.service\s*=\s*service/, "Guarde a dependência no construtor: this.service = service."],
        [/new\s+ProdutoController\s*\(\s*new\s+ProdutoService\s*\(\s*new\s+ProdutoRepository\s*\(\s*\)\s*\)\s*\)/, "Monte as camadas: new ProdutoController(new ProdutoService(new ProdutoRepository()))."]
      ],
      saidaEsperada: "GET /produtos -> [Café, Pão francês, Sonho]"
    },
    {
      tipo: "criar",
      titulo: "Cadastro de clientes com POST e validação",
      enunciado: `Crie o endpoint <b>POST /clientes</b> da API:
        <ul>
          <li>um <code>record ClienteDTO(Long id, String nome, String email)</code> com <code>@NotBlank</code> no nome e <code>@Email</code> no e-mail;</li>
          <li>um <code>@RestController</code> com <code>@RequestMapping("/clientes")</code>;</li>
          <li>um método com <code>@PostMapping</code> que recebe o corpo com <code>@RequestBody @Valid</code>, gera o id (comece em 1)
            e responde <b>201 Created</b> com <code>ResponseEntity.created(URI.create("/clientes/" + id)).body(salvo)</code>.</li>
        </ul>
        Execução real:
        <pre>POST /clientes {"nome":"Ana","email":"ana@email.com"}
→ 201 Created, Location: /clientes/1
{"id":1,"nome":"Ana","email":"ana@email.com"}
POST /clientes {"nome":"","email":"x"}
→ 400 Bad Request (falhou na validação)</pre>`,
      dica: `As anotações de validação vêm de <code>jakarta.validation.constraints</code> (dependência <b>Validation</b> no start.spring.io). Um <code>AtomicLong</code> serve para gerar ids.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_SPRING + " Adicione também a dependência Validation.",
      inicial: c`import java.net.URI;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

// 1) crie o record do cliente com as validações
// 2) crie o controller de clientes com o método de cadastro
`,
      solucao: c`import java.net.URI;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

record ClienteDTO(Long id, @NotBlank String nome, @Email String email) {}

@RestController
@RequestMapping("/clientes")
class ClienteController {

    private final AtomicLong sequencia = new AtomicLong();

    @PostMapping
    public ResponseEntity<ClienteDTO> criar(@RequestBody @Valid ClienteDTO dto) {
        long id = sequencia.incrementAndGet();
        ClienteDTO salvo = new ClienteDTO(id, dto.nome(), dto.email());
        return ResponseEntity.created(URI.create("/clientes/" + id)).body(salvo);
    }
}`,
      padroes: [
        [/@NotBlank\s+String\s+nome/, "Valide o nome com @NotBlank String nome."],
        [/@RequestMapping\s*\(\s*"\/clientes"\s*\)/, "Use @RequestMapping(\"/clientes\") no controller."],
        [/@PostMapping/, "Mapeie o cadastro com @PostMapping."],
        [/@RequestBody\s+@Valid|@Valid\s+@RequestBody/, "Receba o corpo validado: @RequestBody @Valid ClienteDTO dto."],
        [/ResponseEntity\.created\s*\(/, "Responda 201 com ResponseEntity.created(URI...).body(...)."]
      ],
      saidaEsperada: "POST /clientes {\"nome\":\"Ana\",\"email\":\"ana@email.com\"}\n-> 201 Created, Location: /clientes/1\n{\"id\":1,\"nome\":\"Ana\",\"email\":\"ana@email.com\"}\nPOST /clientes {\"nome\":\"\",\"email\":\"x\"}\n-> 400 Bad Request"
    },
    {
      tipo: "criar",
      titulo: "Roteador da agenda (simulação em Java puro)",
      enunciado: `Para entender o que o Spring faz por baixo, simule uma API em Java puro. Crie a classe <code>AgendaController</code>:
        <ul>
          <li>recebe um <code>AgendaService</code> <b>pelo construtor</b> (guarde em <code>private final</code>);</li>
          <li>tem <code>Resposta despachar(String metodo, String caminho)</code>:
            <ul>
              <li>método diferente de <code>"GET"</code> → <code>new Resposta(405, "Método não permitido")</code>;</li>
              <li><code>/horarios</code> → 200 com a lista (<code>service.listar().toString()</code>);</li>
              <li><code>/horarios/{id}</code> → 200 com o horário, ou 404 <code>"Horário não encontrado"</code> (use o Optional do service);</li>
              <li>qualquer outro caminho → 404 <code>"Rota não encontrada"</code>.</li>
            </ul></li>
        </ul>
        Saída esperada:
        <pre>GET /horarios -&gt; 200 [09:00 - Dra. Paula, 10:30 - Dr. Marcos]
GET /horarios/2 -&gt; 200 10:30 - Dr. Marcos
GET /horarios/9 -&gt; 404 Horário não encontrado
DELETE /horarios/1 -&gt; 405 Método não permitido</pre>`,
      dica: `Para pegar o id: <code>Long.parseLong(caminho.substring("/horarios/".length()))</code>. Depois: <code>service.buscar(id).map(h -&gt; new Resposta(200, h)).orElse(...)</code>.`,
      lang: "java",
      inicial: c`import java.util.*;

record Resposta(int status, String corpo) {}

class AgendaService {
    private final Map<Long, String> horarios = new TreeMap<>();

    AgendaService() {
        horarios.put(1L, "09:00 - Dra. Paula");
        horarios.put(2L, "10:30 - Dr. Marcos");
    }

    List<String> listar() { return new ArrayList<>(horarios.values()); }

    Optional<String> buscar(long id) { return Optional.ofNullable(horarios.get(id)); }
}

// crie aqui o controller da agenda

public class Main {
    public static void main(String[] args) {
        AgendaController api = new AgendaController(new AgendaService());
        String[][] chamadas = {
            {"GET", "/horarios"}, {"GET", "/horarios/2"}, {"GET", "/horarios/9"}, {"DELETE", "/horarios/1"}
        };
        for (String[] ch : chamadas) {
            Resposta r = api.despachar(ch[0], ch[1]);
            System.out.println(ch[0] + " " + ch[1] + " -> " + r.status() + " " + r.corpo());
        }
    }
}
`,
      solucao: c`import java.util.*;

record Resposta(int status, String corpo) {}

class AgendaService {
    private final Map<Long, String> horarios = new TreeMap<>();

    AgendaService() {
        horarios.put(1L, "09:00 - Dra. Paula");
        horarios.put(2L, "10:30 - Dr. Marcos");
    }

    List<String> listar() { return new ArrayList<>(horarios.values()); }

    Optional<String> buscar(long id) { return Optional.ofNullable(horarios.get(id)); }
}

class AgendaController {
    private final AgendaService service;

    AgendaController(AgendaService service) {
        this.service = service;
    }

    Resposta despachar(String metodo, String caminho) {
        if (!metodo.equals("GET")) {
            return new Resposta(405, "Método não permitido");
        }
        if (caminho.equals("/horarios")) {
            return new Resposta(200, service.listar().toString());
        }
        if (caminho.startsWith("/horarios/")) {
            long id = Long.parseLong(caminho.substring("/horarios/".length()));
            return service.buscar(id)
                .map(h -> new Resposta(200, h))
                .orElse(new Resposta(404, "Horário não encontrado"));
        }
        return new Resposta(404, "Rota não encontrada");
    }
}

public class Main {
    public static void main(String[] args) {
        AgendaController api = new AgendaController(new AgendaService());
        String[][] chamadas = {
            {"GET", "/horarios"}, {"GET", "/horarios/2"}, {"GET", "/horarios/9"}, {"DELETE", "/horarios/1"}
        };
        for (String[] ch : chamadas) {
            Resposta r = api.despachar(ch[0], ch[1]);
            System.out.println(ch[0] + " " + ch[1] + " -> " + r.status() + " " + r.corpo());
        }
    }
}`,
      padroes: [
        [/class\s+AgendaController\b/, "Crie a classe AgendaController."],
        [/private\s+final\s+AgendaService\s+\w+/, "Guarde o service em um atributo private final AgendaService."],
        [/AgendaController\s*\(\s*AgendaService\s+\w+\s*\)/, "Receba o AgendaService pelo construtor."],
        [/Resposta\s+despachar\s*\(\s*String\s+\w+\s*,\s*String\s+\w+\s*\)/, "Crie o método Resposta despachar(String metodo, String caminho)."],
        [/new\s+Resposta\s*\(\s*405/, "Responda 405 para métodos diferentes de GET."]
      ],
      saidaEsperada: "GET /horarios -> 200 [09:00 - Dra. Paula, 10:30 - Dr. Marcos]\nGET /horarios/2 -> 200 10:30 - Dr. Marcos\nGET /horarios/9 -> 404 Horário não encontrado\nDELETE /horarios/1 -> 405 Método não permitido"
    }
  ],

  // ───────────────────────── a2: Persistência com JPA / Hibernate
  a2: [
    {
      tipo: "completar",
      titulo: "Mapeando a entidade Cliente",
      enunciado: `Mapeie a classe <code>Cliente</code> para a tabela <code>clientes</code>. Substitua cada <code>____</code> para:
        <ul>
          <li>marcar a classe como entidade JPA;</li>
          <li>marcar <code>id</code> como chave primária gerada pelo banco (auto incremento);</li>
          <li>deixar <code>nome</code> obrigatório (NOT NULL).</li>
        </ul>
        Ao subir a aplicação com <code>spring.jpa.show-sql=true</code>, o Hibernate cria a tabela (H2, SQL aproximado):
        <pre>create table clientes (
  id bigint generated by default as identity,
  nome varchar(255) not null,
  uf varchar(2),
  primary key (id)
)</pre>`,
      dica: `As anotações são <code>@Entity</code>, <code>@Id</code>, <code>@GeneratedValue(strategy = GenerationType.IDENTITY)</code> e <code>@Column(nullable = false)</code>.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_JPA,
      inicial: c`import jakarta.persistence.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@____
@Table(name = "clientes")
class Cliente {

    @____
    @GeneratedValue(strategy = GenerationType.____)
    private Long id;

    @Column(____ = false)
    private String nome;

    @Column(length = 2)
    private String uf;

    protected Cliente() {}   // o JPA exige um construtor sem argumentos

    public Cliente(String nome, String uf) {
        this.nome = nome;
        this.uf = uf;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getUf() { return uf; }
}
`,
      solucao: c`import jakarta.persistence.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@Entity
@Table(name = "clientes")
class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(length = 2)
    private String uf;

    protected Cliente() {}   // o JPA exige um construtor sem argumentos

    public Cliente(String nome, String uf) {
        this.nome = nome;
        this.uf = uf;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getUf() { return uf; }
}`,
      padroes: [
        [/@Entity\s+@Table/, "Marque a classe com @Entity."],
        [/@Id\s+@GeneratedValue/, "Marque a chave primária com @Id."],
        [/GenerationType\.IDENTITY/, "Use GenerationType.IDENTITY (auto incremento do banco)."],
        [/@Column\s*\(\s*nullable\s*=\s*false\s*\)\s*private\s+String\s+nome/, "Deixe o nome obrigatório com @Column(nullable = false)."]
      ],
      saidaEsperada: "create table clientes (\n  id bigint generated by default as identity,\n  nome varchar(255) not null,\n  uf varchar(2),\n  primary key (id)\n)"
    },
    {
      tipo: "completar",
      titulo: "Consultas pelo nome do método",
      enunciado: `Com Spring Data, basta declarar a interface do repositório: o SQL é gerado a partir do <b>nome do método</b>. Substitua cada <code>____</code> para:
        <ul>
          <li>o repositório herdar o CRUD pronto para <code>Cliente</code> com id <code>Long</code>;</li>
          <li>declarar a busca por UF ordenada pelo nome (A→Z) e a contagem por UF;</li>
          <li>salvar o primeiro cliente.</li>
        </ul>
        Ao rodar, o <code>CommandLineRunner</code> imprime:
        <pre>Ana
Bruno
Clientes em SP: 1</pre>`,
      dica: `O repositório é <code>extends JpaRepository&lt;Cliente, Long&gt;</code>. Nomes: <code>findByUfOrderByNomeAsc</code> e <code>countByUf</code>. Para gravar: <code>save</code>.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_JPA,
      inicial: c`import java.util.List;
import jakarta.persistence.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner demo(ClienteRepository repo) {
        return args -> {
            repo.____(new Cliente("Bruno", "MG"));
            repo.save(new Cliente("Ana", "MG"));
            repo.save(new Cliente("Caio", "SP"));

            repo.findByUfOrderByNomeAsc("MG").forEach(c -> System.out.println(c.getNome()));
            System.out.println("Clientes em SP: " + repo.countByUf("SP"));
        };
    }
}

@Entity
class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String uf;

    protected Cliente() {}
    Cliente(String nome, String uf) { this.nome = nome; this.uf = uf; }

    public String getNome() { return nome; }
}

interface ClienteRepository extends ____<Cliente, Long> {
    List<Cliente> ____(String uf);
    long ____(String uf);
}
`,
      solucao: c`import java.util.List;
import jakarta.persistence.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner demo(ClienteRepository repo) {
        return args -> {
            repo.save(new Cliente("Bruno", "MG"));
            repo.save(new Cliente("Ana", "MG"));
            repo.save(new Cliente("Caio", "SP"));

            repo.findByUfOrderByNomeAsc("MG").forEach(c -> System.out.println(c.getNome()));
            System.out.println("Clientes em SP: " + repo.countByUf("SP"));
        };
    }
}

@Entity
class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String uf;

    protected Cliente() {}
    Cliente(String nome, String uf) { this.nome = nome; this.uf = uf; }

    public String getNome() { return nome; }
}

interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByUfOrderByNomeAsc(String uf);
    long countByUf(String uf);
}`,
      padroes: [
        [/repo\.save\s*\(\s*new\s+Cliente\s*\(\s*"Bruno"/, "Grave o cliente com repo.save(...)."],
        [/interface\s+ClienteRepository\s+extends\s+JpaRepository\s*<\s*Cliente\s*,\s*Long\s*>/, "O repositório deve estender JpaRepository<Cliente, Long>."],
        [/List\s*<\s*Cliente\s*>\s+findByUfOrderByNomeAsc\s*\(\s*String\s+uf\s*\)/, "Declare List<Cliente> findByUfOrderByNomeAsc(String uf)."],
        [/long\s+countByUf\s*\(\s*String\s+uf\s*\)/, "Declare long countByUf(String uf)."]
      ],
      saidaEsperada: "Ana\nBruno\nClientes em SP: 1"
    },
    {
      tipo: "completar",
      titulo: "Cliente e seus pedidos (relacionamento)",
      enunciado: `Um cliente tem muitos pedidos, e cada pedido pertence a um cliente. Substitua cada <code>____</code> para mapear:
        <ul>
          <li>em <code>Pedido</code>: o lado "muitos para um", com a coluna estrangeira <code>cliente_id</code>;</li>
          <li>em <code>Cliente</code>: o lado "um para muitos", apontando para o atributo <code>cliente</code> do pedido, carregado sob demanda (LAZY).</li>
        </ul>
        Ao subir a aplicação, o Hibernate cria (SQL aproximado):
        <pre>create table clientes (id bigint ..., nome varchar(255), primary key (id))
create table pedidos (id bigint ..., valor numeric(38,2), cliente_id bigint, primary key (id))
alter table pedidos add constraint ... foreign key (cliente_id) references clientes</pre>`,
      dica: `<code>@ManyToOne</code> + <code>@JoinColumn(name = "cliente_id")</code> no pedido; <code>@OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)</code> no cliente.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_JPA,
      inicial: c`import java.math.BigDecimal;
import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@Entity
@Table(name = "clientes")
class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    @____(mappedBy = "____", fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();
}

@Entity
@Table(name = "pedidos")
class Pedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valor;

    @____
    @JoinColumn(name = "____")
    private Cliente cliente;
}
`,
      solucao: c`import java.math.BigDecimal;
import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@Entity
@Table(name = "clientes")
class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();
}

@Entity
@Table(name = "pedidos")
class Pedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valor;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
}`,
      padroes: [
        [/@OneToMany\s*\(\s*mappedBy\s*=\s*"cliente"/, "No Cliente, use @OneToMany(mappedBy = \"cliente\", ...)."],
        [/@ManyToOne(\s*\([^)]*\))?\s+@JoinColumn/, "No Pedido, use @ManyToOne no atributo cliente."],
        [/@JoinColumn\s*\(\s*name\s*=\s*"cliente_id"\s*\)/, "A coluna estrangeira é @JoinColumn(name = \"cliente_id\")."]
      ],
      saidaEsperada: "create table clientes (id bigint ..., nome varchar(255), primary key (id))\ncreate table pedidos (id bigint ..., valor numeric(38,2), cliente_id bigint, primary key (id))\nalter table pedidos add constraint ... foreign key (cliente_id) references clientes"
    },
    {
      tipo: "criar",
      titulo: "Repositório em memória (como o JpaRepository)",
      enunciado: `Para entender o que o <code>JpaRepository</code> faz, implemente um repositório em memória em Java puro.
        Crie a classe <code>ProdutoRepositorio implements Repositorio&lt;Produto, Long&gt;</code>:
        <ul>
          <li>guarda os produtos em um <code>Map&lt;Long, Produto&gt;</code> ordenado pelo id;</li>
          <li><code>save</code>: se o produto ainda não tem id (<code>null</code>), gera o próximo (1, 2, 3...) como o <code>IDENTITY</code> faria, com <code>p.setId(...)</code>; depois grava (insere ou atualiza) e devolve o produto;</li>
          <li><code>findById</code> devolve <code>Optional</code>; <code>findAll</code>, <code>deleteById</code> e <code>count</code> fazem o óbvio.</li>
        </ul>
        O <code>main</code> já está pronto. Saída esperada:
        <pre>Leite salvo com id 3
6.5
Total: 2
2 - Açúcar
3 - Leite
id 1 não existe mais</pre>`,
      dica: `Use <code>new TreeMap&lt;&gt;()</code> e um contador <code>private long sequencia = 0;</code>. <code>Optional.ofNullable(mapa.get(id))</code> resolve o findById.`,
      lang: "java",
      inicial: c`import java.util.*;

class Produto {
    private Long id;
    private final String nome;
    private double preco;

    Produto(Long id, String nome, double preco) { this.id = id; this.nome = nome; this.preco = preco; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public double getPreco() { return preco; }
    public void setPreco(double preco) { this.preco = preco; }
}

interface Repositorio<T, ID> {
    T save(T entidade);
    Optional<T> findById(ID id);
    List<T> findAll();
    void deleteById(ID id);
    long count();
}

// crie aqui o repositório de produtos em memória

public class Main {
    public static void main(String[] args) {
        ProdutoRepositorio repo = new ProdutoRepositorio();
        repo.save(new Produto(null, "Café", 18.9));
        repo.save(new Produto(null, "Açúcar", 5.5));
        Produto leite = repo.save(new Produto(null, "Leite", 6.0));
        System.out.println("Leite salvo com id " + leite.getId());

        leite.setPreco(6.5);
        repo.save(leite);   // já tem id: atualiza
        System.out.println(repo.findById(3L).map(Produto::getPreco).orElse(0.0));

        repo.deleteById(1L);
        System.out.println("Total: " + repo.count());
        repo.findAll().forEach(p -> System.out.println(p.getId() + " - " + p.getNome()));
        System.out.println(repo.findById(1L).isPresent() ? "achou" : "id 1 não existe mais");
    }
}
`,
      solucao: c`import java.util.*;

class Produto {
    private Long id;
    private final String nome;
    private double preco;

    Produto(Long id, String nome, double preco) { this.id = id; this.nome = nome; this.preco = preco; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public double getPreco() { return preco; }
    public void setPreco(double preco) { this.preco = preco; }
}

interface Repositorio<T, ID> {
    T save(T entidade);
    Optional<T> findById(ID id);
    List<T> findAll();
    void deleteById(ID id);
    long count();
}

class ProdutoRepositorio implements Repositorio<Produto, Long> {
    private final Map<Long, Produto> dados = new TreeMap<>();
    private long sequencia = 0;

    @Override
    public Produto save(Produto p) {
        if (p.getId() == null) {
            sequencia++;
            p.setId(sequencia);
        }
        dados.put(p.getId(), p);
        return p;
    }

    @Override
    public Optional<Produto> findById(Long id) {
        return Optional.ofNullable(dados.get(id));
    }

    @Override
    public List<Produto> findAll() {
        return new ArrayList<>(dados.values());
    }

    @Override
    public void deleteById(Long id) {
        dados.remove(id);
    }

    @Override
    public long count() {
        return dados.size();
    }
}

public class Main {
    public static void main(String[] args) {
        ProdutoRepositorio repo = new ProdutoRepositorio();
        repo.save(new Produto(null, "Café", 18.9));
        repo.save(new Produto(null, "Açúcar", 5.5));
        Produto leite = repo.save(new Produto(null, "Leite", 6.0));
        System.out.println("Leite salvo com id " + leite.getId());

        leite.setPreco(6.5);
        repo.save(leite);   // já tem id: atualiza
        System.out.println(repo.findById(3L).map(Produto::getPreco).orElse(0.0));

        repo.deleteById(1L);
        System.out.println("Total: " + repo.count());
        repo.findAll().forEach(p -> System.out.println(p.getId() + " - " + p.getNome()));
        System.out.println(repo.findById(1L).isPresent() ? "achou" : "id 1 não existe mais");
    }
}`,
      padroes: [
        [/class\s+ProdutoRepositorio\s+implements\s+Repositorio\s*<\s*Produto\s*,\s*Long\s*>/, "Crie class ProdutoRepositorio implements Repositorio<Produto, Long>."],
        [/Map\s*<\s*Long\s*,\s*Produto\s*>/, "Guarde os produtos em um Map<Long, Produto>."],
        [/\.setId\s*\(/, "No save, gere o id com p.setId(...) quando ele for null."],
        [/Optional\s*<\s*Produto\s*>\s+findById\s*\(/, "Implemente Optional<Produto> findById(Long id)."]
      ],
      saidaEsperada: "Leite salvo com id 3\n6.5\nTotal: 2\n2 - Açúcar\n3 - Leite\nid 1 não existe mais"
    },
    {
      tipo: "criar",
      titulo: "Relatório sem N+1 com join fetch",
      enunciado: `O relatório de clientes de MG está lento: para cada cliente, o Hibernate faz mais um SELECT dos pedidos (problema <b>N+1</b>).
        Com as entidades já prontas, crie:
        <ul>
          <li><code>ClienteRepository extends JpaRepository&lt;Cliente, Long&gt;</code> com o método
            <code>List&lt;Cliente&gt; buscarComPedidos(@Param("uf") String uf)</code> anotado com <code>@Query</code> usando
            <b>join fetch</b> e ordenando pelo nome;</li>
          <li>um <code>@Service</code> <code>RelatorioService</code> com o repositório injetado pelo construtor e o método
            <code>imprimir(String uf)</code> anotado com <code>@Transactional(readOnly = true)</code>, que imprime <code>nome: N pedido(s)</code>.</li>
        </ul>
        Execução real com <code>show-sql</code> (repare: <b>uma única</b> consulta):
        <pre>Hibernate: select c1_0.id, ..., p1_0.id, ... from clientes c1_0 join pedidos p1_0 on c1_0.id=p1_0.cliente_id where c1_0.uf=? order by c1_0.nome
Ana: 2 pedido(s)
Bruno: 1 pedido(s)</pre>`,
      dica: `JPQL usa os nomes das <b>classes e atributos</b>: <code>select c from Cliente c join fetch c.pedidos where c.uf = :uf order by c.nome</code>.`,
      lang: "java",
      semCompilar: true,
      notaVerificacao: NOTA_JPA,
      inicial: c`import java.math.BigDecimal;
import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@Entity
@Table(name = "clientes")
class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String uf;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();

    public String getNome() { return nome; }
    public List<Pedido> getPedidos() { return pedidos; }
}

@Entity
@Table(name = "pedidos")
class Pedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valor;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
}

// 1) crie o repositório de clientes com a consulta otimizada
// 2) crie o serviço do relatório
`,
      solucao: c`import java.math.BigDecimal;
import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

@Entity
@Table(name = "clientes")
class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String uf;

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();

    public String getNome() { return nome; }
    public List<Pedido> getPedidos() { return pedidos; }
}

@Entity
@Table(name = "pedidos")
class Pedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valor;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
}

interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query("select c from Cliente c join fetch c.pedidos where c.uf = :uf order by c.nome")
    List<Cliente> buscarComPedidos(@Param("uf") String uf);
}

@Service
class RelatorioService {
    private final ClienteRepository repository;

    RelatorioService(ClienteRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public void imprimir(String uf) {
        for (Cliente c : repository.buscarComPedidos(uf)) {
            System.out.println(c.getNome() + ": " + c.getPedidos().size() + " pedido(s)");
        }
    }
}`,
      padroes: [
        [/interface\s+ClienteRepository\s+extends\s+JpaRepository\s*<\s*Cliente\s*,\s*Long\s*>/, "Crie interface ClienteRepository extends JpaRepository<Cliente, Long>."],
        [/@Query\s*\(\s*"[^"]*join\s+fetch\s+c\.pedidos[^"]*"\s*\)/i, "Use @Query com join fetch c.pedidos para trazer tudo em uma consulta."],
        [/@Param\s*\(\s*"uf"\s*\)/, "Ligue o parâmetro :uf com @Param(\"uf\")."],
        [/@Service\s+(public\s+)?class\s+RelatorioService/, "Crie o @Service RelatorioService."],
        [/@Transactional\s*\(\s*readOnly\s*=\s*true\s*\)/, "Anote o método do relatório com @Transactional(readOnly = true)."]
      ],
      saidaEsperada: "Hibernate: select c1_0.id, ..., p1_0.id, ... from clientes c1_0 join pedidos p1_0 on c1_0.id=p1_0.cliente_id where c1_0.uf=? order by c1_0.nome\nAna: 2 pedido(s)\nBruno: 1 pedido(s)"
    }
  ],

  // ───────────────────────── a3: Concorrência e threads
  a3: [
    {
      tipo: "completar",
      titulo: "Contador de pedidos seguro",
      enunciado: `Quatro caixas (threads) registram 1000 pedidos cada no <b>mesmo</b> contador. Com <code>int</code> comum, incrementos se perdem
        (race condition). Substitua cada <code>____</code> para usar um contador atômico, iniciar as threads e esperar todas terminarem. Saída esperada:
        <pre>Caixas: 4
Pedidos registrados: 4000</pre>`,
      dica: `<code>AtomicInteger</code> tem <code>incrementAndGet()</code>. Uma thread começa com <code>start()</code> e esperamos o fim dela com <code>join()</code>.`,
      lang: "java",
      inicial: c`import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ____ pedidos = new AtomicInteger();
        List<Thread> caixas = new ArrayList<>();

        for (int i = 1; i <= 4; i++) {
            Thread t = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    pedidos.____();
                }
            });
            caixas.add(t);
            t.____();
        }

        for (Thread t : caixas) {
            t.____();
        }

        System.out.println("Caixas: " + caixas.size());
        System.out.println("Pedidos registrados: " + pedidos.get());
    }
}
`,
      solucao: c`import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger pedidos = new AtomicInteger();
        List<Thread> caixas = new ArrayList<>();

        for (int i = 1; i <= 4; i++) {
            Thread t = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    pedidos.incrementAndGet();
                }
            });
            caixas.add(t);
            t.start();
        }

        for (Thread t : caixas) {
            t.join();
        }

        System.out.println("Caixas: " + caixas.size());
        System.out.println("Pedidos registrados: " + pedidos.get());
    }
}`,
      padroes: [
        [/AtomicInteger\s+pedidos\s*=\s*new\s+AtomicInteger/, "Declare o contador como AtomicInteger."],
        [/pedidos\.(incrementAndGet|getAndIncrement)\s*\(\s*\)/, "Incremente de forma atômica: pedidos.incrementAndGet()."],
        [/t\.start\s*\(\s*\)/, "Inicie cada thread com t.start() (não run())."],
        [/t\.join\s*\(\s*\)/, "Espere cada thread terminar com t.join()."]
      ],
      saidaEsperada: "Caixas: 4\nPedidos registrados: 4000"
    },
    {
      tipo: "completar",
      titulo: "Lote de boletos com pool de threads",
      enunciado: `O financeiro registra 5 boletos usando um <b>pool de 3 threads</b>. Cada tarefa devolve um texto, guardado em um <code>Future</code>.
        Substitua cada <code>____</code> para criar o pool, enviar as tarefas, pegar os resultados (na ordem do envio) e encerrar o pool. Saída esperada:
        <pre>Boleto 1 registrado
Boleto 2 registrado
Boleto 3 registrado
Boleto 4 registrado
Boleto 5 registrado
Lote finalizado</pre>`,
      dica: `<code>Executors.newFixedThreadPool(n)</code>, <code>pool.submit(...)</code> devolve um Future, <code>f.get()</code> espera o resultado, <code>pool.shutdown()</code> encerra.`,
      lang: "java",
      inicial: c`import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.____(3);
        List<Future<String>> futuros = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            final int numero = i;
            futuros.add(pool.____(() -> {
                Thread.sleep(100);   // simula a chamada ao banco
                return "Boleto " + numero + " registrado";
            }));
        }

        for (Future<String> f : futuros) {
            System.out.println(f.____());
        }
        pool.____();
        System.out.println("Lote finalizado");
    }
}
`,
      solucao: c`import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        List<Future<String>> futuros = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            final int numero = i;
            futuros.add(pool.submit(() -> {
                Thread.sleep(100);   // simula a chamada ao banco
                return "Boleto " + numero + " registrado";
            }));
        }

        for (Future<String> f : futuros) {
            System.out.println(f.get());
        }
        pool.shutdown();
        System.out.println("Lote finalizado");
    }
}`,
      padroes: [
        [/Executors\.newFixedThreadPool\s*\(\s*3\s*\)/, "Crie o pool com Executors.newFixedThreadPool(3)."],
        [/pool\.submit\s*\(/, "Envie cada tarefa com pool.submit(...)."],
        [/f\.get\s*\(\s*\)/, "Pegue o resultado de cada Future com f.get()."],
        [/pool\.shutdown\s*\(\s*\)/, "Encerre o pool com pool.shutdown()."]
      ],
      saidaEsperada: "Boleto 1 registrado\nBoleto 2 registrado\nBoleto 3 registrado\nBoleto 4 registrado\nBoleto 5 registrado\nLote finalizado"
    },
    {
      tipo: "completar",
      titulo: "Reserva de ingressos com synchronized",
      enunciado: `Restam 50 ingressos e chegam 80 pedidos de reserva ao mesmo tempo, em 8 threads. Sem proteção, dois pedidos podem levar o mesmo ingresso.
        Substitua cada <code>____</code> para tornar <code>reservar()</code> exclusivo (uma thread por vez), encerrar o pool e <b>esperar</b> todas as tarefas
        terminarem antes de imprimir. Saída esperada:
        <pre>Vendidos: 50
Esgotados: 30
Restam: 0</pre>`,
      dica: `A palavra que deixa só uma thread por vez dentro do método é <code>synchronized</code>. Depois de <code>shutdown()</code>, espere com <code>awaitTermination(10, TimeUnit.SECONDS)</code>.`,
      lang: "java",
      inicial: c`import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

class Estoque {
    private int unidades;

    Estoque(int unidades) { this.unidades = unidades; }

    public ____ boolean reservar() {
        if (unidades > 0) {
            unidades--;
            return true;
        }
        return false;
    }

    public synchronized int getUnidades() { return unidades; }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Estoque ingressos = new Estoque(50);
        AtomicInteger vendidos = new AtomicInteger();
        AtomicInteger esgotados = new AtomicInteger();

        ExecutorService pool = Executors.newFixedThreadPool(8);
        for (int i = 0; i < 80; i++) {
            pool.submit(() -> {
                if (ingressos.reservar()) vendidos.incrementAndGet();
                else esgotados.incrementAndGet();
            });
        }
        pool.____();
        pool.____(10, TimeUnit.SECONDS);

        System.out.println("Vendidos: " + vendidos.get());
        System.out.println("Esgotados: " + esgotados.get());
        System.out.println("Restam: " + ingressos.getUnidades());
    }
}
`,
      solucao: c`import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

class Estoque {
    private int unidades;

    Estoque(int unidades) { this.unidades = unidades; }

    public synchronized boolean reservar() {
        if (unidades > 0) {
            unidades--;
            return true;
        }
        return false;
    }

    public synchronized int getUnidades() { return unidades; }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Estoque ingressos = new Estoque(50);
        AtomicInteger vendidos = new AtomicInteger();
        AtomicInteger esgotados = new AtomicInteger();

        ExecutorService pool = Executors.newFixedThreadPool(8);
        for (int i = 0; i < 80; i++) {
            pool.submit(() -> {
                if (ingressos.reservar()) vendidos.incrementAndGet();
                else esgotados.incrementAndGet();
            });
        }
        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);

        System.out.println("Vendidos: " + vendidos.get());
        System.out.println("Esgotados: " + esgotados.get());
        System.out.println("Restam: " + ingressos.getUnidades());
    }
}`,
      padroes: [
        [/public\s+synchronized\s+boolean\s+reservar\s*\(/, "Deixe reservar() exclusivo com synchronized."],
        [/pool\.shutdown\s*\(\s*\)/, "Encerre o pool com pool.shutdown()."],
        [/pool\.awaitTermination\s*\(\s*10\s*,\s*TimeUnit\.SECONDS\s*\)/, "Espere as tarefas com pool.awaitTermination(10, TimeUnit.SECONDS)."]
      ],
      saidaEsperada: "Vendidos: 50\nEsgotados: 30\nRestam: 0"
    },
    {
      tipo: "criar",
      titulo: "Preço e frete em paralelo com CompletableFuture",
      enunciado: `No checkout, o preço do produto e o frete vêm de dois serviços lentos (300 ms cada). Em vez de esperar um depois do outro,
        consulte os dois <b>em paralelo</b>:
        <ul>
          <li>crie um <code>CompletableFuture&lt;Double&gt;</code> para cada consulta (rodando de forma assíncrona);</li>
          <li>combine os dois resultados somando-os em um terceiro futuro;</li>
          <li>espere os resultados e imprima com printf (2 casas).</li>
        </ul>
        Saída esperada:
        <pre>Preço: R$ 120.00
Frete: R$ 15.50
Total: R$ 135.50</pre>`,
      dica: `<code>CompletableFuture.supplyAsync(() -&gt; buscarPreco("SKU-1"))</code>; para juntar dois: <code>preco.thenCombine(frete, (p, f) -&gt; p + f)</code>; para esperar: <code>join()</code>.`,
      lang: "java",
      inicial: c`import java.util.concurrent.*;

public class Main {
    static double buscarPreco(String sku) {
        dormir(300);
        return 120.0;
    }

    static double buscarFrete(String cep) {
        dormir(300);
        return 15.5;
    }

    static void dormir(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        // consulte preço ("SKU-1") e frete ("30140-000") em paralelo,
        // combine os dois em um total e imprima as três linhas
    }
}
`,
      solucao: c`import java.util.concurrent.*;

public class Main {
    static double buscarPreco(String sku) {
        dormir(300);
        return 120.0;
    }

    static double buscarFrete(String cep) {
        dormir(300);
        return 15.5;
    }

    static void dormir(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        CompletableFuture<Double> preco = CompletableFuture.supplyAsync(() -> buscarPreco("SKU-1"));
        CompletableFuture<Double> frete = CompletableFuture.supplyAsync(() -> buscarFrete("30140-000"));
        CompletableFuture<Double> total = preco.thenCombine(frete, (p, f) -> p + f);

        System.out.printf("Preço: R$ %.2f%n", preco.join());
        System.out.printf("Frete: R$ %.2f%n", frete.join());
        System.out.printf("Total: R$ %.2f%n", total.join());
    }
}`,
      padroes: [
        [/(CompletableFuture\.supplyAsync\s*\([\s\S]*){2}/, "Crie as duas consultas com CompletableFuture.supplyAsync(...)."],
        [/\.thenCombine\s*\(/, "Combine os dois resultados com thenCombine(...)."],
        [/\.join\s*\(\s*\)|\.get\s*\(\s*\)/, "Espere os resultados com join() (ou get())."]
      ],
      saidaEsperada: "Preço: R$ 120.00\nFrete: R$ 15.50\nTotal: R$ 135.50"
    },
    {
      tipo: "criar",
      titulo: "Pedidos do delivery com virtual threads",
      enunciado: `O delivery recebe uma rajada de pedidos e quer contar quantos são de cada tipo, processando cada pedido em uma <b>virtual thread</b> (Java 21).
        <ul>
          <li>crie o executor de virtual threads dentro de um <b>try-with-resources</b> (ao fechar, ele espera todas as tarefas);</li>
          <li>cada tarefa soma 1 ao tipo do pedido em um <b>mapa seguro para várias threads</b> e conta o total processado de forma atômica;</li>
          <li>depois, imprima os tipos em ordem alfabética e o total.</li>
        </ul>
        Saída esperada:
        <pre>lanche: 2
pizza: 4
sushi: 2
Total processado: 8</pre>`,
      dica: `<code>Executors.newVirtualThreadPerTaskExecutor()</code>, <code>ConcurrentHashMap</code> com <code>merge(tipo, 1, Integer::sum)</code>, <code>AtomicInteger</code> para o total e <code>new TreeMap&lt;&gt;(mapa)</code> para ordenar na hora de imprimir.`,
      lang: "java",
      inicial: c`import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class Main {
    public static void main(String[] args) {
        String[] pedidos = {"pizza", "lanche", "pizza", "sushi", "lanche", "pizza", "sushi", "pizza"};

        // 1) prepare o mapa de contagem e o contador total
        // 2) processe cada pedido em uma virtual thread
        // 3) imprima a contagem em ordem alfabética e o total
    }
}
`,
      solucao: c`import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class Main {
    public static void main(String[] args) {
        String[] pedidos = {"pizza", "lanche", "pizza", "sushi", "lanche", "pizza", "sushi", "pizza"};

        Map<String, Integer> porTipo = new ConcurrentHashMap<>();
        AtomicInteger total = new AtomicInteger();

        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (String tipo : pedidos) {
                executor.submit(() -> {
                    porTipo.merge(tipo, 1, Integer::sum);
                    total.incrementAndGet();
                });
            }
        }

        new TreeMap<>(porTipo).forEach((tipo, qtd) -> System.out.println(tipo + ": " + qtd));
        System.out.println("Total processado: " + total.get());
    }
}`,
      padroes: [
        [/Executors\.newVirtualThreadPerTaskExecutor\s*\(\s*\)/, "Use Executors.newVirtualThreadPerTaskExecutor()."],
        [/try\s*\(\s*(var|ExecutorService)\s+\w+\s*=\s*Executors\.newVirtualThreadPerTaskExecutor/, "Abra o executor em um try-with-resources para esperar todas as tarefas."],
        [/new\s+ConcurrentHashMap\s*</, "Conte os tipos em um ConcurrentHashMap (seguro entre threads)."],
        [/new\s+TreeMap\s*<[^>]*>\s*\(\s*\w+\s*\)/, "Para imprimir em ordem alfabética, copie para new TreeMap<>(mapa)."]
      ],
      saidaEsperada: "lanche: 2\npizza: 4\nsushi: 2\nTotal processado: 8"
    }
  ],
  // ───────────────────────── p1: O que é Java e como rodar (Iniciante)
  p1: [
    {
      tipo: "completar",
      titulo: "Olá da padaria",
      enunciado: `A padaria quer que o programa mostre a mensagem <b>Bom dia, padaria!</b> na tela.
        Clique em cada retângulo e escreva o que falta: o comando que imprime uma linha.`,
      dica: `O comando completo é <code>System.out.println</code>. Falta só a última palavra.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        System.out.____("Bom dia, padaria!");
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Bom dia, padaria!");
    }
}`,
      padroes: [
        [/System\.out\.println\s*\(\s*"Bom dia, padaria!"\s*\)\s*;/, "Use System.out.println(\"Bom dia, padaria!\"); com aspas e ponto e vírgula."],
        [/public\s+static\s+void\s+main\s*\(\s*String\s*\[\]\s*\w+\s*\)/, "Mantenha a linha do main igual: public static void main(String[] args)."]
      ],
      saidaEsperada: "Bom dia, padaria!"
    },
    {
      tipo: "completar",
      titulo: "A embalagem do programa",
      enunciado: `Faltam pedaços da “embalagem” do programa. Clique em cada retângulo e escreva o que falta:
        a palavra que cria a classe e o nome da porta de entrada do programa.
        O programa deve mostrar <b>Loja aberta</b>.`,
      dica: `A classe começa com <code>public class Main</code> e a porta de entrada é o método <code>main</code> (tudo minúsculo).`,
      lang: "java",
      inicial: c`public ____ Main {
    public static void ____(String[] args) {
        System.out.println("Loja aberta");
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Loja aberta");
    }
}`,
      padroes: [
        [/public\s+class\s+Main\s*\{/, "A primeira linha deve ser public class Main {."],
        [/public\s+static\s+void\s+main\s*\(/, "A porta de entrada se chama main (minúsculo): public static void main(...)."],
        [/System\.out\.println\s*\(\s*"Loja aberta"\s*\)\s*;/, "Mantenha System.out.println(\"Loja aberta\");."]
      ],
      saidaEsperada: "Loja aberta"
    },
    {
      tipo: "completar",
      titulo: "Aspas e ponto e vírgula",
      enunciado: `A mensagem <b>Pedido recebido</b> está sem as aspas e sem o ponto e vírgula.
        Clique em cada retângulo e escreva o que falta: no primeiro, o texto <b>entre aspas</b>; no segundo, o sinal que encerra a instrução.`,
      dica: `Texto vai entre aspas duplas: <code>"Pedido recebido"</code>. Toda instrução termina com <code>;</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        System.out.println(____)____
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Pedido recebido");
    }
}`,
      padroes: [
        [/System\.out\.println\s*\(\s*"Pedido recebido"\s*\)/, "O texto Pedido recebido precisa estar entre aspas duplas dentro dos parênteses."],
        [/println\s*\(\s*"Pedido recebido"\s*\)\s*;/, "Termine a linha com ponto e vírgula ;."]
      ],
      saidaEsperada: "Pedido recebido"
    },
    {
      tipo: "criar",
      titulo: "Seu cartão de visita",
      enunciado: `Escreva um programa que mostre exatamente estas duas linhas, nesta ordem:
        <pre>Meu nome é Ana
Estou aprendendo Java</pre>
        Use um <code>System.out.println</code> para cada linha. Depois cole no playground (onecompiler.com/java) e clique em Run para ver.`,
      dica: `Escreva as duas linhas dentro do <code>main</code>, uma embaixo da outra, cada uma com aspas e <code>;</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // escreva aqui os dois System.out.println
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Meu nome é Ana");
        System.out.println("Estou aprendendo Java");
    }
}`,
      padroes: [
        [/System\.out\.println\s*\(\s*"Meu nome é Ana"\s*\)\s*;/, "Falta a linha System.out.println(\"Meu nome é Ana\");."],
        [/System\.out\.println\s*\(\s*"Estou aprendendo Java"\s*\)\s*;/, "Falta a linha System.out.println(\"Estou aprendendo Java\");."],
        [/"Meu nome é Ana"[\s\S]*"Estou aprendendo Java"/, "A linha do nome deve vir antes da linha do Java."]
      ],
      saidaEsperada: "Meu nome é Ana\nEstou aprendendo Java"
    },
    {
      tipo: "criar",
      titulo: "Programa completo do zero",
      enunciado: `Agora escreva o programa <b>inteiro</b>, com a classe <code>Main</code> e o método <code>main</code>, que mostre estas três linhas de uma agenda:
        <pre>Agenda de hoje
09h Dentista
14h Reunião</pre>`,
      dica: `Comece com <code>public class Main {</code>, depois <code>public static void main(String[] args) {</code>, os três <code>println</code> e feche as duas chaves.`,
      lang: "java",
      inicial: c`// Escreva aqui o programa completo:
// 1) a classe Main
// 2) o método main
// 3) três System.out.println
`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Agenda de hoje");
        System.out.println("09h Dentista");
        System.out.println("14h Reunião");
    }
}`,
      padroes: [
        [/public\s+class\s+Main\s*\{/, "Comece com public class Main {."],
        [/public\s+static\s+void\s+main\s*\(\s*String\s*\[\]\s*\w+\s*\)\s*\{/, "Crie a porta de entrada: public static void main(String[] args) {."],
        [/println\s*\(\s*"Agenda de hoje"\s*\)\s*;[\s\S]*println\s*\(\s*"09h Dentista"\s*\)\s*;[\s\S]*println\s*\(\s*"14h Reunião"\s*\)\s*;/, "Mostre as três linhas na ordem: Agenda de hoje, 09h Dentista, 14h Reunião."],
        [/\}\s*\}\s*$/, "Feche as duas chaves no final: uma do main e uma da classe."]
      ],
      saidaEsperada: "Agenda de hoje\n09h Dentista\n14h Reunião"
    }
  ],
  // ───────────────────────── p2: Contas e textos (Iniciante)
  p2: [
    {
      tipo: "completar",
      titulo: "Conta do pão",
      enunciado: `Um cliente levou 5 pães de R$ 2. Clique em cada retângulo e escreva o que falta: o sinal de <b>multiplicar</b>.
        O programa deve mostrar <b>10</b>.`,
      dica: `Em Java, multiplicar é o asterisco.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        System.out.println(5 ____ 2);
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println(5 * 2);
    }
}`,
      padroes: [
        [/println\s*\(\s*5\s*\*\s*2\s*\)\s*;/, "Use o asterisco para multiplicar: 5 * 2."]
      ],
      saidaEsperada: "10"
    },
    {
      tipo: "completar",
      titulo: "Etiqueta com total",
      enunciado: `A balança deve mostrar <b>Total: 12</b>, fazendo a conta 7 + 5.
        Clique em cada retângulo e escreva o que falta: o sinal que <b>junta o texto</b> com a conta e a conta <b>entre parênteses</b>.`,
      dica: `Sem parênteses, o Java cola o 7 e o 5 e mostra 75. Escreva <code>(7 + 5)</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Total: " ____ ____);
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Total: " + (7 + 5));
    }
}`,
      padroes: [
        [/"Total: "\s*\+\s*\(\s*7\s*\+\s*5\s*\)/, "Junte o texto com + e coloque a conta entre parênteses: \"Total: \" + (7 + 5)."]
      ],
      saidaEsperada: "Total: 12"
    },
    {
      tipo: "completar",
      titulo: "Dividindo a pizza",
      enunciado: `Uma pizza de 8 fatias será dividida entre 4 amigos, e o caixa recebeu 50 e precisa dar o troco de uma conta de 35.
        Clique em cada retângulo e escreva o sinal que falta: <b>dividir</b> no primeiro e <b>subtrair</b> no segundo.`,
      dica: `Dividir é a barra <code>/</code>. Subtrair é o sinal de menos <code>-</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Fatias por pessoa: " + (8 ____ 4));
        System.out.println("Troco: " + (50 ____ 35));
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Fatias por pessoa: " + (8 / 4));
        System.out.println("Troco: " + (50 - 35));
    }
}`,
      padroes: [
        [/\(\s*8\s*\/\s*4\s*\)/, "Para dividir, use a barra: (8 / 4)."],
        [/\(\s*50\s*-\s*35\s*\)/, "Para o troco, subtraia: (50 - 35)."]
      ],
      saidaEsperada: "Fatias por pessoa: 2\nTroco: 15"
    },
    {
      tipo: "criar",
      titulo: "Nome completo",
      enunciado: `Mostre o nome completo de uma cliente <b>juntando dois textos</b> com <code>+</code>: <code>"Maria"</code> e <code>"Souza"</code>, com um espaço entre eles.
        A saída deve ser exatamente <b>Maria Souza</b>.`,
      dica: `Você pode juntar três pedaços: <code>"Maria" + " " + "Souza"</code>, ou colocar o espaço dentro de uma das aspas.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // junte "Maria" e "Souza" com + e mostre com System.out.println
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Maria" + " " + "Souza");
    }
}`,
      padroes: [
        [/println\s*\([^;]*"Maria ?"\s*\+/, "Comece com o texto \"Maria\" e use + para juntar."],
        [/\+\s*" ?Souza"/, "Junte o texto \"Souza\" com +."],
        [/"Maria "|" "|" Souza"/, "Não esqueça do espaço entre o nome e o sobrenome."]
      ],
      saidaEsperada: "Maria Souza"
    },
    {
      tipo: "criar",
      titulo: "Cupom da lanchonete",
      enunciado: `Mostre o cupom de uma lanchonete com <b>três linhas</b>, fazendo as contas dentro do código (entre parênteses):
        <ul>
          <li><b>Lanches: 3</b></li>
          <li><b>Total: 45</b> (3 lanches de 15: use <code>3 * 15</code>)</li>
          <li><b>Por pessoa: 15</b> (o total dividido por 3: use <code>45 / 3</code>)</li>
        </ul>`,
      dica: `Exemplo: <code>System.out.println("Total: " + (3 * 15));</code>. Os parênteses fazem a conta acontecer antes de juntar com o texto.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // linha 1: Lanches: 3
        // linha 2: Total: (3 * 15)
        // linha 3: Por pessoa: (45 / 3)
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        System.out.println("Lanches: 3");
        System.out.println("Total: " + (3 * 15));
        System.out.println("Por pessoa: " + (45 / 3));
    }
}`,
      padroes: [
        [/println\s*\(\s*"Lanches: 3"\s*\)|println\s*\(\s*"Lanches: "\s*\+\s*3\s*\)/, "A primeira linha deve mostrar Lanches: 3."],
        [/"Total: "\s*\+\s*\(\s*3\s*\*\s*15\s*\)/, "Calcule o total no código: \"Total: \" + (3 * 15)."],
        [/"Por pessoa: "\s*\+\s*\(\s*45\s*\/\s*3\s*\)/, "Calcule a divisão no código: \"Por pessoa: \" + (45 / 3)."]
      ],
      saidaEsperada: "Lanches: 3\nTotal: 45\nPor pessoa: 15"
    }
  ],
  // ───────────────────────── p3: Variáveis e tipos (Iniciante)
  p3: [
    {
      tipo: "completar",
      titulo: "Cadastro do produto",
      enunciado: `Guarde os dados de um produto em variáveis com o tipo certo. Clique em cada retângulo e escreva o tipo que falta:
        <ul>
          <li><code>nome</code> é um texto;</li>
          <li><code>quantidade</code> é um número inteiro.</li>
        </ul>`,
      dica: `Texto é <code>String</code> (S maiúsculo). Número inteiro é <code>int</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        ____ nome = "Sonho de creme";
        ____ quantidade = 12;
        System.out.println(nome + ": " + quantidade);
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        String nome = "Sonho de creme";
        int quantidade = 12;
        System.out.println(nome + ": " + quantidade);
    }
}`,
      padroes: [
        [/String\s+nome\s*=/, "nome é um texto: use String (com S maiúsculo)."],
        [/int\s+quantidade\s*=/, "quantidade é um número inteiro: use int."]
      ],
      saidaEsperada: "Sonho de creme: 12"
    },
    {
      tipo: "completar",
      titulo: "Preço e estoque",
      enunciado: `Clique em cada retângulo e escreva o tipo que falta: <code>preco</code> tem centavos e <code>disponivel</code> é verdadeiro ou falso.`,
      dica: `Número com casas decimais é <code>double</code>. Verdadeiro/falso é <code>boolean</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        ____ preco = 7.5;
        ____ disponivel = true;
        System.out.println("Preço: " + preco);
        System.out.println("Disponível: " + disponivel);
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        double preco = 7.5;
        boolean disponivel = true;
        System.out.println("Preço: " + preco);
        System.out.println("Disponível: " + disponivel);
    }
}`,
      padroes: [
        [/double\s+preco\s*=/, "preco tem casas decimais: use double."],
        [/boolean\s+disponivel\s*=/, "disponivel é verdadeiro ou falso: use boolean."]
      ],
      saidaEsperada: "Preço: 7.5\nDisponível: true"
    },
    {
      tipo: "completar",
      titulo: "Total da compra",
      enunciado: `Calcule o total de uma compra usando as variáveis. Clique em cada retângulo e escreva o que falta:
        no primeiro, o <b>nome da variável</b> do preço; no segundo, o nome da variável que guarda o resultado, para mostrar na tela.
        A saída deve ser <b>Total: 9.0</b>.`,
      dica: `As variáveis se chamam <code>preco</code> e <code>total</code>. Use o nome sem aspas.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        double preco = 3.0;
        int quantidade = 3;
        double total = ____ * quantidade;
        System.out.println("Total: " + ____);
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        double preco = 3.0;
        int quantidade = 3;
        double total = preco * quantidade;
        System.out.println("Total: " + total);
    }
}`,
      padroes: [
        [/double\s+total\s*=\s*preco\s*\*\s*quantidade\s*;|double\s+total\s*=\s*quantidade\s*\*\s*preco\s*;/, "Calcule total multiplicando as variáveis: preco * quantidade."],
        [/"Total: "\s*\+\s*total\s*\)/, "Mostre a variável total (sem aspas): \"Total: \" + total."]
      ],
      saidaEsperada: "Total: 9.0"
    },
    {
      tipo: "criar",
      titulo: "Ficha da cliente",
      enunciado: `Crie <b>três variáveis</b> com o tipo certo e mostre cada uma numa linha:
        <ul>
          <li><code>nome</code> com o valor <code>"Joana"</code>;</li>
          <li><code>idade</code> com o valor <code>28</code>;</li>
          <li><code>vip</code> com o valor <code>true</code>.</li>
        </ul>
        A saída deve ser:
        <pre>Nome: Joana
Idade: 28
VIP: true</pre>`,
      dica: `Exemplo de uma linha: <code>System.out.println("Nome: " + nome);</code>. Use o nome da variável sem aspas.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // crie as variáveis nome, idade e vip
        // mostre cada uma com System.out.println
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        String nome = "Joana";
        int idade = 28;
        boolean vip = true;
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("VIP: " + vip);
    }
}`,
      padroes: [
        [/String\s+nome\s*=\s*"Joana"\s*;/, "Crie String nome = \"Joana\";."],
        [/int\s+idade\s*=\s*28\s*;/, "Crie int idade = 28;."],
        [/boolean\s+vip\s*=\s*true\s*;/, "Crie boolean vip = true;."],
        [/"Nome: "\s*\+\s*nome[\s\S]*"Idade: "\s*\+\s*idade[\s\S]*"VIP: "\s*\+\s*vip/, "Mostre as três linhas usando as variáveis, na ordem: Nome, Idade, VIP."]
      ],
      saidaEsperada: "Nome: Joana\nIdade: 28\nVIP: true"
    },
    {
      tipo: "criar",
      titulo: "Estoque que muda",
      enunciado: `A loja tem 20 camisetas. Crie <code>int estoque = 20;</code> e mostre <b>Estoque: 20</b>.
        Depois a loja vendeu algumas: <b>mude o valor</b> da mesma variável para <code>15</code> (sem criar outra) e mostre <b>Estoque: 15</b>.`,
      dica: `Para trocar o valor, escreva só <code>estoque = 15;</code>, sem o <code>int</code> na frente.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // 1) crie a variável estoque com 20 e mostre
        // 2) mude o valor para 15 e mostre de novo
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int estoque = 20;
        System.out.println("Estoque: " + estoque);
        estoque = 15;
        System.out.println("Estoque: " + estoque);
    }
}`,
      padroes: [
        [/int\s+estoque\s*=\s*20\s*;/, "Crie a variável: int estoque = 20;."],
        [/(^|[^\w\s])\s*estoque\s*=\s*15\s*;/m, "Mude o valor com estoque = 15; (sem escrever int de novo)."],
        [/int\s+estoque[\s\S]*"Estoque: "\s*\+\s*estoque[\s\S]*estoque\s*=\s*15[\s\S]*"Estoque: "\s*\+\s*estoque/, "Mostre o estoque antes e depois da mudança: \"Estoque: \" + estoque."]
      ],
      saidaEsperada: "Estoque: 20\nEstoque: 15"
    }
  ],
  // ───────────────────────── p4: Decidindo com if (Iniciante)
  p4: [
    {
      tipo: "completar",
      titulo: "Pode dirigir?",
      enunciado: `Mostre <b>Pode tirar carteira</b> quando a idade for 18 ou mais.
        Clique em cada retângulo e escreva o que falta: a palavra que começa a decisão e o sinal de “maior ou igual”.`,
      dica: `A decisão começa com <code>if</code>. “Maior ou igual” é <code>&gt;=</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        int idade = 19;
        ____ (idade ____ 18) {
            System.out.println("Pode tirar carteira");
        }
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int idade = 19;
        if (idade >= 18) {
            System.out.println("Pode tirar carteira");
        }
    }
}`,
      padroes: [
        [/if\s*\(\s*idade\s*>=\s*18\s*\)/, "Use if (idade >= 18)."]
      ],
      saidaEsperada: "Pode tirar carteira"
    },
    {
      tipo: "completar",
      titulo: "Aprovado ou recuperação",
      enunciado: `Se a nota for 6 ou mais, mostre <b>Aprovado</b>; senão, mostre <b>Recuperação</b>.
        Clique em cada retângulo e escreva o que falta: a palavra do caminho “senão”.`,
      dica: `“Senão”, em Java, é <code>else</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        double nota = 4.5;
        if (nota >= 6) {
            System.out.println("Aprovado");
        } ____ {
            System.out.println("Recuperação");
        }
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        double nota = 4.5;
        if (nota >= 6) {
            System.out.println("Aprovado");
        } else {
            System.out.println("Recuperação");
        }
    }
}`,
      padroes: [
        [/\}\s*else\s*\{/, "Use } else { para o caminho da recuperação."]
      ],
      saidaEsperada: "Recuperação"
    },
    {
      tipo: "completar",
      titulo: "Faixas do frete",
      enunciado: `Compras de 200 ou mais têm <b>Frete grátis</b>; de 100 ou mais, <b>Frete com desconto</b>; abaixo disso, <b>Frete normal</b>.
        Clique em cada retângulo e escreva o que falta: o caminho do meio e o sinal de comparação.`,
      dica: `O caminho do meio é <code>else if</code>, e a comparação é “maior ou igual a 100”.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        int compras = 150;
        if (compras >= 200) {
            System.out.println("Frete grátis");
        } ____ (compras ____ 100) {
            System.out.println("Frete com desconto");
        } else {
            System.out.println("Frete normal");
        }
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int compras = 150;
        if (compras >= 200) {
            System.out.println("Frete grátis");
        } else if (compras >= 100) {
            System.out.println("Frete com desconto");
        } else {
            System.out.println("Frete normal");
        }
    }
}`,
      padroes: [
        [/\}\s*else\s+if\s*\(\s*compras\s*>=\s*100\s*\)/, "O caminho do meio é } else if (compras >= 100)."]
      ],
      saidaEsperada: "Frete com desconto"
    },
    {
      tipo: "criar",
      titulo: "Loja aberta ou fechada",
      enunciado: `Crie <code>boolean aberta = false;</code>. Use <code>if</code> e <code>else</code>: se <code>aberta</code> for verdadeiro, mostre <b>Pode entrar</b>; senão, mostre <b>Volte amanhã</b>.
        Com o valor <code>false</code>, a saída deve ser <b>Volte amanhã</b>.`,
      dica: `Um boolean pode ir direto no if: <code>if (aberta) { ... } else { ... }</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // crie a variável aberta
        // use if e else para mostrar a mensagem
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        boolean aberta = false;
        if (aberta) {
            System.out.println("Pode entrar");
        } else {
            System.out.println("Volte amanhã");
        }
    }
}`,
      padroes: [
        [/boolean\s+aberta\s*=\s*false\s*;/, "Crie boolean aberta = false;."],
        [/if\s*\(\s*(aberta|aberta\s*==\s*true)\s*\)/, "Teste a variável no if: if (aberta)."],
        [/\}\s*else\s*\{/, "Use else para o caminho do Volte amanhã."],
        [/"Pode entrar"[\s\S]*else[\s\S]*"Volte amanhã"/, "Pode entrar vai no bloco do if e Volte amanhã no bloco do else."]
      ],
      saidaEsperada: "Volte amanhã"
    },
    {
      tipo: "criar",
      titulo: "Termômetro da cozinha",
      enunciado: `Crie <code>int temperatura = 32;</code> e mostre:
        <ul>
          <li><b>Quente</b> se for maior que 30;</li>
          <li><b>Agradável</b> se for maior que 18;</li>
          <li><b>Frio</b> nos outros casos.</li>
        </ul>
        Use <code>if</code>, <code>else if</code> e <code>else</code>. Com 32, a saída deve ser <b>Quente</b>.`,
      dica: `Teste primeiro o maior (<code>temperatura &gt; 30</code>), depois <code>else if (temperatura &gt; 18)</code> e por último <code>else</code>.`,
      lang: "java",
      inicial: c`public class Main {
    public static void main(String[] args) {
        // crie a variável temperatura com 32
        // use if, else if e else
    }
}`,
      solucao: c`public class Main {
    public static void main(String[] args) {
        int temperatura = 32;
        if (temperatura > 30) {
            System.out.println("Quente");
        } else if (temperatura > 18) {
            System.out.println("Agradável");
        } else {
            System.out.println("Frio");
        }
    }
}`,
      padroes: [
        [/int\s+temperatura\s*=\s*32\s*;/, "Crie int temperatura = 32;."],
        [/if\s*\(\s*temperatura\s*>\s*30\s*\)/, "O primeiro teste é if (temperatura > 30)."],
        [/else\s+if\s*\(\s*temperatura\s*>\s*18\s*\)/, "O segundo é else if (temperatura > 18)."],
        [/"Quente"[\s\S]*"Agradável"[\s\S]*else\s*\{[\s\S]*"Frio"/, "Coloque Quente, Agradável e Frio nos blocos certos, nessa ordem."]
      ],
      saidaEsperada: "Quente"
    }
  ]

};
