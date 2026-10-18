const c = String.raw;

export default {
  id: "python",
  nome: "Python",
  icone: "🐍",
  cor: "#3776ab",
  dificuldade: 2,
  resumo: "Linguagem simples de ler, parecida com inglês. Faz automação, análise de dados, IA, robôs e APIs.",
  mercado: "Líder em dados, IA e automação. Vagas de analista de dados, cientista de dados, back-end, QA e RPA.",
  docs: [
    { nome: "Documentação oficial (pt-BR)", url: "https://docs.python.org/pt-br/3/", desc: "tutorial e referência" },
    { nome: "Real Python", url: "https://realpython.com/", desc: "tutoriais práticos e profundos" },
    { nome: "PyPI", url: "https://pypi.org/", desc: "procure bibliotecas prontas (pip install ...)" },
    { nome: "Pandas — documentação", url: "https://pandas.pydata.org/docs/" }
  ],
  niveis: {
    basico: {
      objetivo: "escrever pequenos programas que recebem dados, tomam decisões e repetem tarefas.",
      topicos: [
        {
          titulo: "Variáveis, tipos e print",
          crianca: `Uma variável é uma <b>caixinha com etiqueta</b>. Na caixa “idade” você guarda o número 7; na caixa “nome”, a palavra “Ana”. Depois é só chamar pela etiqueta. O <code>print</code> é o <b>megafone</b> que mostra o que tem dentro.`,
          codigo: c`
nome = "Ana"          # str (texto)
idade = 30            # int (inteiro)
salario = 4500.50     # float (decimal)
ativo = True          # bool (verdadeiro/falso)

print(f"{nome} tem {idade} anos e ganha R$ {salario:.2f}")

entrada = input("Digite um número: ")  # input sempre devolve texto!
numero = int(entrada)
print(numero * 2)`,
          nota: "Instale o Python em python.org e rode com <code>python arquivo.py</code>. Ou teste online no Google Colab.",
          trabalho: `Montar a mensagem padrão de cobrança: <code>f"Olá {cliente}, sua fatura de R$ {valor:.2f} vence em {data}"</code>. A <b>f-string</b> é usada o tempo todo para relatórios, e-mails e logs.`,
          entrevista: {
            pergunta: "Quais são os tipos básicos em Python e o que é tipagem dinâmica?",
            resposta: `<code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code> e <code>None</code>, além das coleções <code>list</code>, <code>tuple</code>, <code>dict</code> e <code>set</code>. Tipagem dinâmica significa que o tipo fica no <b>valor</b>, não na variável: a mesma variável pode receber um número e depois um texto (mas isso não é boa prática).`
          },
          busca: ["python f-string formatação", "python input converter int", "tipos de dados python"]
        },
        {
          titulo: "Condições: if, elif, else",
          crianca: `É o <b>semáforo</b>: <i>se</i> estiver verde, atravesse; <i>senão, se</i> estiver amarelo, espere; <i>senão</i>, pare. O computador escolhe um caminho conforme a resposta é verdadeira ou falsa.`,
          codigo: c`
nota = 7.5

if nota >= 9:
    conceito = "A"
elif nota >= 7:
    conceito = "B"
elif nota >= 5:
    conceito = "C"
else:
    conceito = "Reprovado"

print(conceito)

# Combinando condições
idade, tem_cnh = 20, True
if idade >= 18 and tem_cnh:
    print("Pode dirigir")`,
          nota: "Em Python, a <b>indentação</b> (os 4 espaços) define o que está dentro do if. Errar o espaço causa erro!",
          trabalho: `Regra de negócio clássica: <b>frete grátis</b> acima de R$ 200, desconto de 10% para clientes VIP, bloquear a compra se o cliente estiver inadimplente. Tudo é if/elif.`,
          entrevista: {
            pergunta: "Escreva o FizzBuzz (de 1 a 100, Fizz nos múltiplos de 3, Buzz nos de 5, FizzBuzz nos dois).",
            resposta: `<code>for i in range(1, 101):<br>&nbsp;&nbsp;if i % 15 == 0: print("FizzBuzz")<br>&nbsp;&nbsp;elif i % 3 == 0: print("Fizz")<br>&nbsp;&nbsp;elif i % 5 == 0: print("Buzz")<br>&nbsp;&nbsp;else: print(i)</code><br>O segredo é testar o 15 (os dois) <b>primeiro</b>.`
          },
          busca: ["python if elif else", "operadores lógicos python and or not", "fizzbuzz python"]
        },
        {
          titulo: "Listas e laços (for / while)",
          crianca: `Uma lista é um <b>trem com vagões</b>, e cada vagão guarda uma coisa. O <code>for</code> é o fiscal que passa de vagão em vagão olhando cada um. O <code>while</code> repete “enquanto” algo for verdade, como “enquanto tiver bolo, coma mais um pedaço”.`,
          codigo: c`
vendas = [150.0, 320.5, 89.9, 1200.0]

total = 0
for valor in vendas:
    total += valor
print("Total:", total)            # ou simplesmente sum(vendas)

print(len(vendas), max(vendas))   # quantidade e maior valor
vendas.append(450.0)              # adiciona no fim
print(vendas[0], vendas[-1])      # primeiro e último

# List comprehension: filtra em uma linha
grandes = [v for v in vendas if v > 300]

for i, v in enumerate(vendas, start=1):
    print(f"Venda {i}: R$ {v}")`,
          trabalho: `Percorrer uma lista de clientes e enviar um e-mail para cada um, somar vendas do dia, filtrar pedidos acima de um valor. Quase toda automação é um <code>for</code> passando por itens.`,
          entrevista: {
            pergunta: "Qual a diferença entre lista e tupla?",
            resposta: `A lista (<code>[]</code>) é <b>mutável</b>: pode adicionar, remover e alterar itens. A tupla (<code>()</code>) é <b>imutável</b>, um pouco mais leve, e pode ser chave de dicionário. Use tupla para dados fixos, como coordenadas (lat, long).`
          },
          busca: ["python list methods", "list comprehension python", "python for enumerate"]
        }
      ]
    },
    intermediario: {
      objetivo: "organizar o código em funções, ler e gravar arquivos (CSV/JSON) e tratar erros sem o programa quebrar.",
      topicos: [
        {
          titulo: "Funções",
          crianca: `Uma função é uma <b>receita de bolo</b>. Você escreve a receita uma vez (com os ingredientes como parâmetros) e, sempre que quiser um bolo, só chama: “faça o bolo de chocolate!”. O <code>return</code> é o bolo pronto que sai do forno.`,
          codigo: c`
def calcular_desconto(valor, percentual=10):
    """Retorna o valor com desconto aplicado."""
    return valor - valor * percentual / 100

print(calcular_desconto(200))       # 180.0 (usa o padrão 10%)
print(calcular_desconto(200, 25))   # 150.0

def validar_cpf_formato(cpf: str) -> bool:
    numeros = cpf.replace(".", "").replace("-", "")
    return len(numeros) == 11 and numeros.isdigit()

print(validar_cpf_formato("123.456.789-00"))  # True`,
          trabalho: `Em vez de copiar o mesmo cálculo de imposto em 10 lugares, você cria <code>calcular_imposto()</code>. Se a alíquota mudar, corrige em <b>um lugar</b>. As dicas de tipo (<code>cpf: str -&gt; bool</code>) ajudam o editor e o time.`,
          entrevista: {
            pergunta: "O que são *args e **kwargs?",
            resposta: `<code>*args</code> recebe uma quantidade variável de argumentos <b>posicionais</b> como tupla; <code>**kwargs</code> recebe argumentos <b>nomeados</b> como dicionário. São úteis para funções flexíveis e decorators. Ex.: <code>def log(*args, **kwargs)</code>.`
          },
          busca: ["python def return", "args kwargs python", "type hints python"]
        },
        {
          titulo: "Dicionários e JSON",
          crianca: `Um dicionário é uma <b>agenda de telefones</b>: você procura pelo nome (a <b>chave</b>) e encontra o número (o <b>valor</b>). JSON é o jeito que os computadores mandam essas agendas uns para os outros pela internet.`,
          codigo: c`
import json

cliente = {"nome": "Carlos", "cidade": "Recife", "pedidos": 3}
print(cliente["nome"])
print(cliente.get("email", "sem e-mail"))  # não quebra se faltar
cliente["pedidos"] += 1

for chave, valor in cliente.items():
    print(chave, "=>", valor)

# Contar ocorrências: pergunta frequente!
palavras = ["sp", "rj", "sp", "mg", "sp"]
contagem = {}
for p in palavras:
    contagem[p] = contagem.get(p, 0) + 1
print(contagem)  # {'sp': 3, 'rj': 1, 'mg': 1}

texto = json.dumps(cliente, ensure_ascii=False)  # dict -> JSON
de_volta = json.loads(texto)                     # JSON -> dict`,
          trabalho: `Toda <b>API</b> responde em JSON. Pegar o nome do cliente na resposta de um sistema de CRM, montar o payload para emitir a nota fiscal ou ler arquivos de configuração: tudo isso é dicionário.`,
          entrevista: {
            pergunta: "Como contar quantas vezes cada palavra aparece em um texto?",
            resposta: `Com dicionário e <code>get(chave, 0) + 1</code>, como no exemplo, ou com <code>from collections import Counter; Counter(texto.split())</code>. Citar o <code>Counter</code> mostra que você conhece a biblioteca padrão.`
          },
          busca: ["python dict get items", "python json loads dumps", "collections Counter"]
        },
        {
          titulo: "Arquivos e tratamento de erros",
          crianca: `Ler um arquivo é <b>abrir um caderno</b>, ler e fechar de volta. O <code>with</code> fecha o caderno sozinho. O <code>try/except</code> é a <b>rede de proteção do trapézio</b>: se alguém cair (der erro), a rede segura e o show continua.`,
          codigo: c`
import csv

total = 0
erros = []

with open("vendas.csv", encoding="utf-8") as arquivo:
    for linha in csv.DictReader(arquivo):
        try:
            total += float(linha["valor"].replace(",", "."))
        except (ValueError, KeyError) as e:
            erros.append((linha, str(e)))

print(f"Total: R$ {total:.2f} | Linhas com erro: {len(erros)}")

with open("relatorio.txt", "w", encoding="utf-8") as saida:
    saida.write(f"Total vendido: {total:.2f}\n")`,
          trabalho: `Automação real: o financeiro manda um CSV exportado do ERP todo dia, sempre com algumas linhas quebradas. Seu script soma tudo, <b>não para</b> por causa de uma linha ruim e gera a lista de erros para alguém conferir.`,
          entrevista: {
            pergunta: "Por que usar with para abrir arquivos?",
            resposta: `O <code>with</code> é um <b>gerenciador de contexto</b>: garante que o arquivo seja fechado mesmo se ocorrer erro no meio. Sem ele, você precisaria de <code>try/finally</code> com <code>arquivo.close()</code>.`
          },
          busca: ["python ler csv DictReader", "python try except finally", "python with open encoding utf-8"]
        }
      ]
    },
    avancado: {
      objetivo: "modelar sistemas com classes, analisar planilhas grandes com pandas e criar uma API web.",
      topicos: [
        {
          titulo: "Programação orientada a objetos",
          crianca: `Uma <b>classe</b> é a <b>fôrma de biscoito</b>; os <b>objetos</b> são os biscoitos. Cada biscoito tem suas características (atributos: cor, sabor) e pode fazer coisas (métodos). Todos saem da mesma fôrma, mas cada um é único.`,
          codigo: c`
class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self._saldo = saldo          # _ = "uso interno"

    def depositar(self, valor):
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        self._saldo += valor

    def sacar(self, valor):
        if valor > self._saldo:
            raise ValueError("Saldo insuficiente")
        self._saldo -= valor

    @property
    def saldo(self):
        return self._saldo

class ContaPoupanca(Conta):           # herança
    def render(self, taxa=0.005):
        self._saldo *= 1 + taxa

c = ContaPoupanca("Ana", 1000)
c.render()
print(c.saldo)`,
          trabalho: `Sistemas de verdade têm entidades: <code>Cliente</code>, <code>Pedido</code>, <code>Produto</code>. Frameworks como Django e bibliotecas de automação são construídos com classes. Você vai ler e estender classes de outras pessoas o tempo todo.`,
          entrevista: {
            pergunta: "Quais são os 4 pilares da orientação a objetos?",
            resposta: `<b>Encapsulamento</b> (esconder detalhes internos, como <code>_saldo</code>), <b>Herança</b> (<code>ContaPoupanca</code> herda de <code>Conta</code>), <b>Polimorfismo</b> (o mesmo método se comporta diferente em cada classe) e <b>Abstração</b> (expor só o essencial).`
          },
          busca: ["python class __init__ self", "python property decorator", "pilares poo exemplos"]
        },
        {
          titulo: "Análise de dados com pandas",
          crianca: `O pandas é um <b>Excel com superpoderes</b> controlado por comandos. Você pede “some as vendas por cidade” e ele faz em um segundo, mesmo com 1 milhão de linhas.`,
          codigo: c`
import pandas as pd   # pip install pandas openpyxl

df = pd.read_excel("vendas.xlsx")        # ou pd.read_csv(...)
print(df.head())                          # primeiras linhas
print(df.info())                          # colunas e tipos

df["data"] = pd.to_datetime(df["data"])
df = df.dropna(subset=["valor"])          # remove valores vazios

resumo = (df[df["status"] == "pago"]
          .groupby("cidade")["valor"]
          .agg(["count", "sum", "mean"])
          .sort_values("sum", ascending=False))

resumo.to_excel("resumo_por_cidade.xlsx")`,
          trabalho: `O gestor pede todo mês “o total de vendas por região, só pedidos pagos”. Em vez de passar uma hora no Excel, você roda o script e o relatório sai pronto. É a habilidade mais pedida para <b>analista de dados</b>.`,
          entrevista: {
            pergunta: "Como você trataria valores nulos e duplicados em um DataFrame?",
            resposta: `Primeiro investigo com <code>df.isna().sum()</code> e <code>df.duplicated().sum()</code>. Depois decido: remover (<code>dropna</code>, <code>drop_duplicates</code>), preencher (<code>fillna</code> com zero, média ou valor anterior) ou sinalizar. A decisão depende do <b>negócio</b>, e não só da técnica.`
          },
          busca: ["pandas groupby agg", "pandas read_excel", "pandas fillna dropna"]
        },
        {
          titulo: "Criando uma API com FastAPI",
          crianca: `Uma API é o <b>garçom do restaurante</b>. O cliente (app, site) faz o pedido; o garçom leva para a cozinha (seu código e o banco de dados) e traz a resposta. Ninguém precisa entrar na cozinha.`,
          codigo: c`
# pip install fastapi uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
produtos = {1: {"nome": "Café", "preco": 12.9}}

class Produto(BaseModel):
    nome: str
    preco: float

@app.get("/produtos/{id}")
def buscar(id: int):
    if id not in produtos:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return produtos[id]

@app.post("/produtos", status_code=201)
def criar(p: Produto):
    novo_id = max(produtos) + 1
    produtos[novo_id] = p.model_dump()
    return {"id": novo_id, **produtos[novo_id]}

# Rode: uvicorn main:app --reload  → abra http://127.0.0.1:8000/docs`,
          trabalho: `Disponibilizar um modelo de IA ou um cálculo interno para o time do app consumir. O FastAPI gera a <b>documentação Swagger</b> sozinho em <code>/docs</code>, e o front-end consegue testar sem perguntar nada para você.`,
          entrevista: {
            pergunta: "Quais códigos HTTP você usaria para criar, não encontrar e erro de validação?",
            resposta: `<b>201 Created</b> ao criar, <b>404 Not Found</b> quando o recurso não existe, <b>400/422</b> para dados inválidos (o FastAPI usa 422), <b>401/403</b> para não autenticado ou sem permissão e <b>500</b> para erro interno.`
          },
          busca: ["fastapi tutorial", "pydantic basemodel", "http status codes lista"]
        }
      ]
    }
  }
};
