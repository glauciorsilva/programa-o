import { m, vf, l } from "./q.js";
const c = String.raw;

export default {
  topicos: {
    b1: {
      detalhes: `<p>Em Python, você cria uma variável simplesmente escrevendo <code>nome = valor</code>. Não é preciso declarar o tipo: o Python descobre sozinho a partir do valor (isso se chama <b>tipagem dinâmica</b>). Os tipos básicos são: <code>str</code> (texto, entre aspas), <code>int</code> (número inteiro), <code>float</code> (número com casas decimais, usando ponto), <code>bool</code> (<code>True</code> ou <code>False</code>) e <code>None</code> (ausência de valor).</p>
<p>Nomes de variáveis devem ser descritivos, em letras minúsculas e com palavras separadas por sublinhado (<code>valor_total</code>), padrão chamado <i>snake_case</i>. O Python diferencia maiúsculas de minúsculas: <code>nome</code> e <code>Nome</code> são variáveis diferentes. Use <code>type(x)</code> para descobrir o tipo de um valor.</p>
<p>A <b>f-string</b> (texto com <code>f</code> antes das aspas) permite colocar variáveis dentro do texto usando chaves, e até formatar números: <code>{salario:.2f}</code> mostra duas casas decimais. A função <code>input()</code> lê o que o usuário digita, mas sempre devolve <b>texto</b>; para fazer contas, converta com <code>int()</code> ou <code>float()</code>.</p>`,
      partes: [
        [c`nome = "Ana"          # str (texto)`, "Cria a variável `nome` com um texto. O `#` inicia um comentário, que o Python ignora."],
        [c`idade = 30`, "Número inteiro (`int`)."],
        [c`salario = 4500.50`, "Número decimal (`float`). Use ponto, não vírgula."],
        [c`ativo = True`, "Valor lógico (`bool`). `True` e `False` começam com letra maiúscula."],
        [c`print(f"{nome} tem {idade} anos e ganha R$ {salario:.2f}")`, "Mostra um texto montado com as variáveis. `:.2f` formata o número com 2 casas decimais."],
        [c`entrada = input("Digite um número: ")`, "Mostra a pergunta, espera o usuário digitar e guarda o texto digitado em `entrada`."],
        [c`numero = int(entrada)`, "Converte o texto em número inteiro. Se a pessoa digitar letras, dá erro `ValueError`."],
        [c`print(numero * 2)`, "Mostra o dobro do número."]
      ]
    },
    b2: {
      detalhes: `<p>Estruturas condicionais permitem ao programa <b>tomar decisões</b>. O <code>if</code> testa uma condição; se ela for verdadeira, executa o bloco abaixo. O <code>elif</code> (“senão, se”) testa outra condição quando as anteriores foram falsas, e o <code>else</code> (“senão”) pega todos os casos restantes. Apenas <b>um</b> dos blocos é executado: o primeiro cuja condição for verdadeira.</p>
<p>As condições usam <b>operadores de comparação</b>: <code>==</code> (igual), <code>!=</code> (diferente), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Note que <code>=</code> é atribuição e <code>==</code> é comparação. Para combinar condições, use os <b>operadores lógicos</b> <code>and</code> (as duas precisam ser verdadeiras), <code>or</code> (basta uma) e <code>not</code> (inverte).</p>
<p>Em Python, a <b>indentação</b> (os espaços no início da linha, normalmente 4) define o que está dentro de cada bloco. Outras linguagens usam chaves <code>{ }</code>; o Python usa o recuo. Esquecer o recuo ou os dois-pontos <code>:</code> no final da linha do <code>if</code> causa erro.</p>`,
      partes: [
        [c`nota = 7.5`, "Valor que será avaliado."],
        [c`if nota >= 9:`, "Testa se a nota é maior ou igual a 9. Os dois-pontos `:` abrem o bloco."],
        [c`    conceito = "A"`, "Linha recuada: só executa se a condição acima for verdadeira."],
        [c`elif nota >= 7:`, "Só é testado se a condição anterior foi falsa. Como 7.5 ≥ 7, este bloco executa."],
        [c`elif nota >= 5:`, "Não chega a ser testado, porque um bloco anterior já foi executado."],
        [c`else:`, "Pega qualquer nota abaixo de 5."],
        [c`idade, tem_cnh = 20, True`, "Atribuição múltipla: cria duas variáveis em uma linha."],
        [c`if idade >= 18 and tem_cnh:`, "`and`: só entra se as duas condições forem verdadeiras."]
      ]
    },
    b3: {
      detalhes: `<p>A <b>lista</b> guarda vários valores em ordem, entre colchetes e separados por vírgula. Cada item tem uma posição (<b>índice</b>) que começa em <b>0</b>: <code>lista[0]</code> é o primeiro e <code>lista[-1]</code> é o último. Listas são <b>mutáveis</b>: dá para adicionar (<code>append</code>), remover (<code>remove</code>, <code>pop</code>) e alterar itens. Também é possível pegar “fatias”: <code>lista[1:3]</code> pega os itens das posições 1 e 2.</p>
<p>O laço <code>for</code> percorre cada item de uma sequência (lista, texto, intervalo). O <code>range(1, 6)</code> gera os números de 1 a 5 (o último número não entra). O <code>enumerate()</code> entrega a posição e o item ao mesmo tempo. O laço <code>while</code> repete <b>enquanto</b> uma condição for verdadeira; cuidado para a condição se tornar falsa em algum momento, senão o laço é infinito.</p>
<p>Funções úteis com listas: <code>len()</code> (tamanho), <code>sum()</code> (soma), <code>max()</code> e <code>min()</code>, <code>sorted()</code> (cópia ordenada). A <b>list comprehension</b> <code>[expressão for item in lista if condição]</code> cria uma nova lista de forma curta, muito comum para filtrar e transformar dados.</p>`,
      partes: [
        [c`vendas = [150.0, 320.5, 89.9, 1200.0]`, "Cria uma lista com quatro valores."],
        [c`total = 0`, "Acumulador: começa em zero e vai somando dentro do laço."],
        [c`for valor in vendas:`, "Para cada item da lista, a variável `valor` recebe o item da vez."],
        [c`    total += valor`, "Soma o valor ao total. `+=` é o mesmo que `total = total + valor`."],
        [c`print(len(vendas), max(vendas))`, "Mostra a quantidade de itens e o maior valor."],
        [c`vendas.append(450.0)`, "Adiciona um item no final da lista."],
        [c`print(vendas[0], vendas[-1])`, "Primeiro item (índice 0) e último (índice -1)."],
        [c`grandes = [v for v in vendas if v > 300]`, "List comprehension: nova lista só com as vendas acima de 300."],
        [c`for i, v in enumerate(vendas, start=1):`, "Percorre a lista com um contador que começa em 1."]
      ]
    },
    i1: {
      detalhes: `<p>Uma <b>função</b> é um bloco de código com nome, que pode ser executado várias vezes. É criada com <code>def nome(parâmetros):</code>. Os <b>parâmetros</b> são as entradas; o <code>return</code> devolve o resultado e encerra a função. Uma função sem <code>return</code> devolve <code>None</code>.</p>
<p>Parâmetros podem ter <b>valor padrão</b> (<code>percentual=10</code>), usado quando quem chama não informa aquele valor. Na chamada, você pode passar os argumentos por posição (<code>f(200, 25)</code>) ou por nome (<code>f(valor=200, percentual=25)</code>), o que deixa o código mais claro.</p>
<p>O texto entre três aspas logo abaixo do <code>def</code> é a <b>docstring</b>: a documentação da função, que aparece em <code>help()</code> e nos editores. As <b>dicas de tipo</b> (<code>cpf: str -&gt; bool</code>) não mudam a execução, mas ajudam o editor a apontar erros e documentam o que a função espera e devolve. Variáveis criadas dentro da função só existem lá dentro (<b>escopo local</b>).</p>`,
      partes: [
        [c`def calcular_desconto(valor, percentual=10):`, "Define a função com dois parâmetros; `percentual` vale 10 se não for informado."],
        [c`"""Retorna o valor com desconto aplicado."""`, "Docstring: documenta o que a função faz."],
        [c`return valor - valor * percentual / 100`, "Calcula e devolve o valor com desconto."],
        [c`print(calcular_desconto(200))`, "Chama com um argumento só; usa o percentual padrão (10%) → 180.0."],
        [c`print(calcular_desconto(200, 25))`, "Informa os dois argumentos → 150.0."],
        [c`def validar_cpf_formato(cpf: str) -> bool:`, "Dicas de tipo: recebe texto e devolve verdadeiro/falso."],
        [c`numeros = cpf.replace(".", "").replace("-", "")`, "Remove pontos e traço, deixando só os dígitos."],
        [c`return len(numeros) == 11 and numeros.isdigit()`, "Verdadeiro se tiver 11 caracteres e todos forem dígitos. (Isso valida só o formato, não os dígitos verificadores.)"]
      ]
    },
    i2: {
      detalhes: `<p>O <b>dicionário</b> (<code>dict</code>) guarda pares <b>chave: valor</b> entre chaves. Em vez de acessar por posição, como na lista, você acessa pela chave: <code>cliente["nome"]</code>. As chaves costumam ser textos e não se repetem. Se você acessar uma chave que não existe com colchetes, dá erro <code>KeyError</code>; com <code>.get(chave, padrão)</code>, você recebe o valor padrão.</p>
<p>Métodos úteis: <code>.keys()</code> (chaves), <code>.values()</code> (valores), <code>.items()</code> (pares, ótimo para laços), <code>in</code> (testa se a chave existe) e <code>del</code> (remove). Dicionários podem conter listas e outros dicionários, formando estruturas complexas.</p>
<p><b>JSON</b> é um formato de texto para trocar dados entre sistemas, muito parecido com dicionários e listas do Python. O módulo <code>json</code> converte nos dois sentidos: <code>json.dumps()</code> transforma um dicionário em texto JSON e <code>json.loads()</code> transforma texto JSON em dicionário. Para arquivos, existem <code>json.dump()</code> e <code>json.load()</code>.</p>`,
      partes: [
        [c`import json`, "Importa o módulo da biblioteca padrão que trabalha com JSON."],
        [c`cliente = {"nome": "Carlos", "cidade": "Recife", "pedidos": 3}`, "Dicionário com três pares chave: valor."],
        [c`cliente.get("email", "sem e-mail")`, "Busca a chave `email`; como não existe, devolve o texto padrão em vez de dar erro."],
        [c`cliente["pedidos"] += 1`, "Atualiza um valor existente."],
        [c`for chave, valor in cliente.items():`, "Percorre todos os pares do dicionário."],
        [c`contagem[p] = contagem.get(p, 0) + 1`, "Padrão de contagem: pega o valor atual (ou 0 se ainda não existe) e soma 1."],
        [c`texto = json.dumps(cliente, ensure_ascii=False)`, "Dicionário → texto JSON. `ensure_ascii=False` mantém os acentos legíveis."],
        [c`de_volta = json.loads(texto)`, "Texto JSON → dicionário Python."]
      ]
    },
    i3: {
      detalhes: `<p>Para ler ou escrever arquivos, usamos <code>open(caminho, modo, encoding=...)</code>. Os modos mais comuns são <code>"r"</code> (ler, padrão), <code>"w"</code> (escrever, apagando o conteúdo anterior) e <code>"a"</code> (acrescentar no final). Sempre informe <code>encoding="utf-8"</code> para não ter problemas com acentos.</p>
<p>O <code>with</code> é um <b>gerenciador de contexto</b>: ele abre o arquivo e garante que ele seja fechado no final do bloco, mesmo que aconteça um erro. Para arquivos CSV (planilhas em texto), o módulo <code>csv</code> lê cada linha; o <code>DictReader</code> usa a primeira linha como cabeçalho e entrega cada linha como dicionário.</p>
<p><b>Exceções</b> são os erros que acontecem durante a execução. O bloco <code>try</code> contém o código que pode falhar; <code>except TipoDeErro</code> trata o problema sem derrubar o programa; <code>else</code> roda se não houve erro; e <code>finally</code> roda sempre. Capture erros <b>específicos</b> (<code>ValueError</code>, <code>KeyError</code>, <code>FileNotFoundError</code>) em vez de um <code>except</code> genérico, para não esconder bugs.</p>`,
      partes: [
        [c`import csv`, "Módulo da biblioteca padrão para arquivos CSV."],
        [c`with open("vendas.csv", encoding="utf-8") as arquivo:`, "Abre o arquivo para leitura e o fecha automaticamente ao sair do bloco."],
        [c`for linha in csv.DictReader(arquivo):`, "Cada linha vira um dicionário cujas chaves são os nomes das colunas."],
        [c`try:`, "Início do trecho que pode falhar."],
        [c`total += float(linha["valor"].replace(",", "."))`, "Troca vírgula por ponto e converte para número. Falha se o valor não for numérico."],
        [c`except (ValueError, KeyError) as e:`, "Captura erro de conversão ou coluna ausente; `e` guarda a mensagem do erro."],
        [c`erros.append((linha, str(e)))`, "Guarda a linha problemática para revisão, sem parar o programa."],
        [c`with open("relatorio.txt", "w", encoding="utf-8") as saida:`, "Abre (ou cria) um arquivo para escrita, apagando o conteúdo anterior."],
        [c`saida.write(f"Total vendido: {total:.2f}\n")`, "Escreve uma linha no arquivo. O `\\n` é a quebra de linha."]
      ]
    },
    a1: {
      detalhes: `<p>A <b>Programação Orientada a Objetos</b> organiza o código em <b>classes</b>, que descrevem um tipo de coisa (dados + comportamentos), e <b>objetos</b>, que são as instâncias concretas. Por exemplo, a classe <code>Conta</code> descreve qualquer conta; <code>Conta("Ana", 100)</code> cria a conta específica da Ana.</p>
<p>O método especial <code>__init__</code> é o <b>construtor</b>: roda quando o objeto é criado e define os atributos iniciais. O primeiro parâmetro de todo método, <code>self</code>, representa o próprio objeto; é por ele que acessamos os atributos (<code>self.titular</code>). Por convenção, atributos que começam com <code>_</code> são de uso interno e não devem ser alterados de fora.</p>
<p>A <b>herança</b> permite criar uma classe a partir de outra: <code>class ContaPoupanca(Conta)</code> herda tudo de <code>Conta</code> e acrescenta o que é específico dela. O decorador <code>@property</code> transforma um método em algo que se lê como atributo, permitindo leitura controlada (sem permitir alterar o valor diretamente). Lançar exceções com <code>raise</code> protege as regras de negócio.</p>`,
      partes: [
        [c`class Conta:`, "Define a classe `Conta`. Por convenção, nomes de classes usam PascalCase."],
        [c`def __init__(self, titular, saldo=0):`, "Construtor: executa ao criar uma conta. `saldo` começa em 0 se não for informado."],
        [c`self.titular = titular`, "Guarda o titular como atributo do objeto."],
        [c`self._saldo = saldo`, "O `_` indica que o saldo é interno: deve ser alterado só pelos métodos."],
        [c`def depositar(self, valor):`, "Método (ação) da conta."],
        [c`raise ValueError("Valor deve ser positivo")`, "Interrompe com erro se a regra for violada."],
        [c`@property def saldo(self): return self._saldo`, "Permite ler `conta.saldo` como atributo, mas não alterar diretamente."],
        [c`class ContaPoupanca(Conta):`, "Herança: a poupança é uma conta com algo a mais."],
        [c`self._saldo *= 1 + taxa`, "Aplica o rendimento: multiplica o saldo por 1,005."],
        [c`c = ContaPoupanca("Ana", 1000)`, "Cria um objeto (instância) da classe."]
      ]
    },
    a2: {
      detalhes: `<p>O <b>pandas</b> é a biblioteca mais usada para análise de dados em Python. Sua estrutura principal é o <b>DataFrame</b>: uma tabela com linhas e colunas nomeadas, como uma planilha. Cada coluna é uma <b>Series</b>. Ele lê dados de CSV, Excel, bancos de dados e APIs (<code>pd.read_csv</code>, <code>pd.read_excel</code>, <code>pd.read_sql</code>).</p>
<p>O fluxo típico de análise é: <b>carregar</b> → <b>explorar</b> (<code>head()</code>, <code>info()</code>, <code>describe()</code>) → <b>limpar</b> (tipos corretos, valores nulos, duplicados) → <b>filtrar</b> (<code>df[df["status"] == "pago"]</code>) → <b>agrupar e resumir</b> (<code>groupby</code> + <code>agg</code>) → <b>exportar</b> (<code>to_excel</code>, <code>to_csv</code>) ou fazer gráficos.</p>
<p>Operações em pandas são <b>vetorizadas</b>: você escreve a operação para a coluna inteira, sem laço <code>for</code>, e ela é muito mais rápida. Muitas operações devolvem um novo DataFrame em vez de alterar o original, por isso é comum reatribuir (<code>df = df.dropna(...)</code>) ou encadear operações entre parênteses.</p>`,
      partes: [
        [c`import pandas as pd`, "Importa o pandas com o apelido `pd`, padrão em todo o mercado."],
        [c`df = pd.read_excel("vendas.xlsx")`, "Lê a planilha em um DataFrame (no sandbox usamos `read_csv`)."],
        [c`print(df.head())`, "Mostra as 5 primeiras linhas para conferir os dados."],
        [c`print(df.info())`, "Lista colunas, tipos e quantidade de valores não nulos."],
        [c`df["data"] = pd.to_datetime(df["data"])`, "Converte a coluna de texto para o tipo data."],
        [c`df = df.dropna(subset=["valor"])`, "Remove linhas em que `valor` está vazio."],
        [c`df[df["status"] == "pago"]`, "Filtro: mantém só as linhas com status pago."],
        [c`.groupby("cidade")["valor"]`, "Agrupa por cidade e seleciona a coluna valor."],
        [c`.agg(["count", "sum", "mean"])`, "Calcula quantidade, soma e média de cada grupo."],
        [c`.sort_values("sum", ascending=False)`, "Ordena da maior soma para a menor."],
        [c`resumo.to_excel("resumo_por_cidade.xlsx")`, "Exporta o resultado para Excel."]
      ]
    },
    a3: {
      detalhes: `<p>Uma <b>API web</b> é um programa que recebe pedidos pela internet (requisições HTTP) e devolve respostas, normalmente em JSON. Cada pedido tem um <b>método</b> (<code>GET</code> para buscar, <code>POST</code> para criar, <code>PUT</code>/<code>PATCH</code> para alterar, <code>DELETE</code> para remover) e um <b>caminho</b> (como <code>/produtos/1</code>). A resposta tem um <b>código de status</b> (200 OK, 201 Criado, 404 Não encontrado, 422 Dados inválidos, 500 Erro interno).</p>
<p>O <b>FastAPI</b> é um framework Python moderno para criar APIs. Você escreve funções comuns e as liga a caminhos com <b>decoradores</b> (<code>@app.get(...)</code>). Os tipos indicados nos parâmetros são usados para converter e validar os dados automaticamente.</p>
<p>O <b>Pydantic</b> (<code>BaseModel</code>) descreve o formato dos dados de entrada: se alguém enviar um preço em texto, a API responde 422 sem você escrever validação. O FastAPI gera sozinho uma página de documentação interativa em <code>/docs</code>. Para rodar, usamos o servidor <b>uvicorn</b>.</p>`,
      partes: [
        [c`from fastapi import FastAPI, HTTPException`, "Importa a classe da aplicação e o erro HTTP."],
        [c`from pydantic import BaseModel`, "Base para descrever e validar o formato dos dados."],
        [c`app = FastAPI()`, "Cria a aplicação."],
        [c`produtos = {1: {"nome": "Café", "preco": 12.9}}`, "“Banco de dados” em memória, só para o exemplo."],
        [c`class Produto(BaseModel): nome: str; preco: float`, "Formato esperado para criar um produto."],
        [c`@app.get("/produtos/{id}")`, "Liga a função abaixo ao método GET no caminho `/produtos/1`, `/produtos/2`…"],
        [c`def buscar(id: int):`, "O `id` do caminho é convertido para inteiro automaticamente."],
        [c`raise HTTPException(status_code=404, detail="Não encontrado")`, "Responde com erro 404 e uma mensagem."],
        [c`@app.post("/produtos", status_code=201)`, "Rota de criação; responde 201 (Criado) em caso de sucesso."],
        [c`def criar(p: Produto):`, "O corpo da requisição é validado e convertido em `Produto`."],
        [c`produtos[novo_id] = p.model_dump()`, "Converte o objeto em dicionário e guarda."],
        [c`# uvicorn main:app --reload`, "Comando para rodar o servidor; `--reload` reinicia ao salvar o arquivo."]
      ]
    }
  },

  fixacao: {
    basico: [
      m("Qual é o tipo do valor `3.14` em Python?", ["`int`", "`float`", "`str`", "`decimal`"], 1, "Números com ponto decimal são `float`."),
      m("O que `input()` devolve quando o usuário digita 25?", ["O número 25", "O texto \"25\"", "`None`", "Um erro"], 1, "`input()` sempre devolve texto; converta com `int()` ou `float()`."),
      l("Complete para mostrar o texto na tela:", c`____("Olá, mundo!")`, "print", "`print()` exibe valores na saída."),
      m("Qual o resultado de `print(f\"{10/4:.1f}\")`?", ["2.5", "2.50", "2", "2,5"], 0, "`:.1f` formata com 1 casa decimal."),
      m("Qual operador compara se dois valores são iguais?", ["`=`", "`==`", "`===`", "`eq`"], 1, "`=` atribui um valor; `==` compara."),
      m("O que define os blocos (o que está dentro do `if`) em Python?", ["Chaves `{ }`", "A indentação (recuo)", "Parênteses", "A palavra `end`"], 1, "Por isso o recuo é obrigatório em Python."),
      l("Complete a palavra que significa “senão, se”:", c`if nota >= 7:
    print("Aprovado")
____ nota >= 5:
    print("Recuperação")`, "elif", "`elif` testa outra condição quando a anterior é falsa."),
      m("Qual o valor de `[10, 20, 30][-1]`?", ["10", "20", "30", "Erro"], 2, "O índice -1 representa o último item."),
      m("Quantas vezes o laço executa? `for i in range(1, 5):`", ["5", "4", "6", "1"], 1, "`range(1, 5)` gera 1, 2, 3 e 4: o número final não entra."),
      m("O que faz `lista.append(7)`?", ["Remove o 7", "Adiciona 7 no final da lista", "Adiciona 7 no começo", "Ordena a lista"], 1, "Para inserir em outra posição, use `insert(posição, valor)`.")
    ],
    intermediario: [
      l("Complete a palavra que cria uma função:", c`____ somar(a, b):
    return a + b`, "def", "`def` define (cria) uma função."),
      m("O que uma função devolve se não tiver `return`?", ["0", "Uma string vazia", "`None`", "Um erro"], 2, "Sem `return`, o resultado é `None`."),
      m("Em `def saudar(nome=\"visitante\"):`, o que é `\"visitante\"`?", ["Um comentário", "O valor padrão do parâmetro", "O retorno", "Um erro de sintaxe"], 1, "É usado quando a função é chamada sem argumento."),
      m("Como acessar com segurança uma chave que pode não existir em um dicionário?", ["`d[\"chave\"]`", "`d.get(\"chave\")`", "`d.find(\"chave\")`", "`d->chave`"], 1, "`get` devolve `None` (ou um valor padrão) em vez de lançar `KeyError`."),
      m("Qual método percorre chave e valor de um dicionário ao mesmo tempo?", ["`.keys()`", "`.values()`", "`.items()`", "`.pairs()`"], 2, "`for chave, valor in d.items():`"),
      l("Complete para converter um dicionário em texto JSON:", c`import json
texto = json.____(cliente)`, "dumps", "`dumps` = dump string. O inverso é `json.loads(texto)`."),
      m("Qual a vantagem de abrir arquivos com `with open(...)`?", ["Fica mais rápido", "O arquivo é fechado automaticamente, mesmo se der erro", "Permite abrir arquivos sem existir", "Criptografa o arquivo"], 1, "O `with` gerencia o contexto e evita arquivos abertos esquecidos."),
      m("Qual modo de `open` apaga o conteúdo e escreve do zero?", ["`\"r\"`", "`\"a\"`", "`\"w\"`", "`\"x\"`"], 2, "`\"a\"` acrescenta no final sem apagar."),
      m("Qual erro acontece em `int(\"abc\")`?", ["`TypeError`", "`ValueError`", "`KeyError`", "`NameError`"], 1, "O tipo (texto) é aceito, mas o valor não representa um número."),
      vf("No bloco `try/except/finally`, o `finally` executa mesmo quando ocorre um erro.", true, "É usado para liberar recursos, como fechar conexões.")
    ],
    avancado: [
      m("Qual método é executado automaticamente quando um objeto é criado?", ["`__start__`", "`__init__`", "`__new_object__`", "`create()`"], 1, "O `__init__` é o construtor da classe."),
      m("O que representa `self` dentro de um método?", ["A classe pai", "O próprio objeto que está chamando o método", "Uma variável global", "O módulo"], 1, "É por `self` que acessamos os atributos do objeto."),
      l("Complete para que `ContaPoupanca` herde de `Conta`:", c`class ContaPoupanca(____):
    pass`, "Conta", "A classe pai vai entre parênteses."),
      m("Qual pilar da orientação a objetos protege os dados internos de alterações diretas?", ["Herança", "Polimorfismo", "Encapsulamento", "Abstração"], 2, "Ex.: `_saldo` só é alterado pelos métodos `depositar` e `sacar`."),
      m("No pandas, como se chama a estrutura em formato de tabela?", ["Matrix", "DataFrame", "Sheet", "Table"], 1, "Cada coluna de um DataFrame é uma Series."),
      m("Qual comando mostra as primeiras linhas de um DataFrame `df`?", ["`df.top()`", "`df.first()`", "`df.head()`", "`df.show()`"], 2, "Por padrão mostra 5 linhas; `df.head(10)` mostra 10."),
      l("Complete para somar a coluna `valor` por cidade:", c`df.____("cidade")["valor"].sum()`, "groupby", "`groupby` agrupa as linhas pelo valor da coluna."),
      m("Qual código HTTP indica que um recurso foi criado com sucesso?", ["200", "201", "404", "500"], 1, "200 é OK genérico; 201 é Created."),
      m("No FastAPI, o que `@app.get(\"/produtos/{id}\")` faz?", ["Cria um produto", "Liga a função a requisições GET nesse caminho", "Apaga um produto", "Importa produtos"], 1, "O `{id}` é um parâmetro do caminho, passado para a função."),
      m("Em uma API REST, qual método é usado para criar um recurso novo?", ["GET", "POST", "DELETE", "HEAD"], 1, "GET busca, POST cria, PUT/PATCH alteram e DELETE remove.")
    ]
  }
};
