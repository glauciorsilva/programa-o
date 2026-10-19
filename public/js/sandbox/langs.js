// Linguagens disponíveis no sandbox e dados de exemplo.

export const LANGS = {
  web: { nome: "HTML + CSS + JS", icone: "🌐", tipo: "web" },
  js: { nome: "JavaScript", icone: "⚡", tipo: "runner", runner: "js", modo: "javascript" },
  ts: { nome: "TypeScript", icone: "🔷", tipo: "runner", runner: "js", modo: "text/typescript" },
  react: { nome: "React", icone: "⚛️", tipo: "react", modo: "jsx" },
  python: { nome: "Python", icone: "🐍", tipo: "runner", runner: "python", modo: "python" },
  sql: { nome: "SQL / MySQL", icone: "🗃️", tipo: "runner", runner: "sql", modo: "text/x-mysql" },
  go: {
    nome: "Go", icone: "🐹", tipo: "externo", modo: "text/x-go",
    playgrounds: [{ nome: "Go Playground (oficial)", url: "https://go.dev/play/" }]
  },
  csharp: {
    nome: "C#", icone: "🟣", tipo: "externo", modo: "text/x-csharp",
    playgrounds: [{ nome: ".NET Fiddle", url: "https://dotnetfiddle.net/" }, { nome: "OneCompiler (C#)", url: "https://onecompiler.com/csharp" }]
  },
  java: {
    nome: "Java", icone: "☕", tipo: "externo", modo: "text/x-java",
    playgrounds: [{ nome: "OneCompiler (Java)", url: "https://onecompiler.com/java" }, { nome: "JDoodle", url: "https://www.jdoodle.com/online-java-compiler" }]
  }
};

export const TRILHA_LANG = {
  html: "web", css: "web", python: "python", javascript: "js", react: "react",
  go: "go", csharp: "csharp", java: "java", sql: "sql", mysql: "sql"
};

// Código inicial do sandbox livre.
export const EXEMPLOS = {
  web: {
    html: `<h1>Olá, sandbox! 👋</h1>
<p>Edite o HTML, o CSS e o JS e clique em <b>Executar</b>.</p>
<button id="btn">Clique aqui</button>
<p id="msg"></p>`,
    css: `body { font-family: system-ui, sans-serif; padding: 16px; }
h1 { color: #4f46e5; }
button { padding: 8px 16px; border-radius: 8px; border: 0; background: #4f46e5; color: #fff; cursor: pointer; }`,
    js: `let cliques = 0;
document.querySelector("#btn").addEventListener("click", () => {
  cliques++;
  document.querySelector("#msg").textContent = "Você clicou " + cliques + " vez(es)!";
  console.log("clique", cliques);
});`
  },
  js: `// Use console.log para ver resultados na saída
const pedidos = [
  { cliente: "Ana", valor: 120, pago: true },
  { cliente: "Bia", valor: 80, pago: false },
  { cliente: "Caio", valor: 300, pago: true },
];

const total = pedidos.filter((p) => p.pago).reduce((s, p) => s + p.valor, 0);
console.log("Total pago:", total);
console.log(pedidos.map((p) => p.cliente));`,
  ts: `type Status = "pendente" | "pago";

interface Pedido {
  cliente: string;
  valor: number;
  status: Status;
}

const pedidos: Pedido[] = [
  { cliente: "Ana", valor: 120, status: "pago" },
  { cliente: "Bia", valor: 80, status: "pendente" },
];

function totalPago(lista: Pedido[]): number {
  return lista.filter((p) => p.status === "pago").reduce((s, p) => s + p.valor, 0);
}

console.log(totalPago(pedidos));`,
  react: `import { useState } from "react";

export default function App() {
  const [nome, setNome] = useState("");
  return (
    <div>
      <h1>Olá, {nome || "visitante"}!</h1>
      <input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
    </div>
  );
}`,
  python: `# Use print() para ver resultados na saída
vendas = [150.0, 320.5, 89.9, 1200.0]

total = sum(vendas)
print(f"Total: R$ {total:.2f}")
print("Maior venda:", max(vendas))

# Arquivos de exemplo disponíveis: vendas.csv e clientes.csv
import csv
with open("clientes.csv", encoding="utf-8") as f:
    for linha in csv.DictReader(f):
        print(linha["nome"], "-", linha["cidade"])`,
  sql: `-- Banco de exemplo: clientes, pedidos, produtos, itens_pedido,
-- funcionarios, contas, sessoes, vendas_vendedor, faturamento_mensal
SHOW TABLES;

SELECT c.nome, COUNT(p.id) AS pedidos, SUM(p.valor) AS total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id AND p.status = 'pago'
GROUP BY c.id, c.nome
ORDER BY total DESC;`,
  go: `package main

import "fmt"

func main() {
	vendas := []float64{150, 320.5, 89.9}
	total := 0.0
	for _, v := range vendas {
		total += v
	}
	fmt.Printf("Total: %.2f\\n", total)
}`,
  csharp: `using System;
using System.Linq;
using System.Collections.Generic;

var vendas = new List<decimal> { 150m, 320.5m, 89.9m };
Console.WriteLine($"Total: {vendas.Sum():C}");
Console.WriteLine($"Maior: {vendas.Max()}");`,
  java: `public class Main {
    public static void main(String[] args) {
        double[] vendas = {150, 320.5, 89.9};
        double total = 0;
        for (double v : vendas) total += v;
        System.out.printf("Total: %.2f%n", total);
    }
}`
};

// Arquivos que o Python enxerga no sandbox (open("vendas.csv")).
export const ARQUIVOS_PYTHON = {
  "vendas.csv": `data,cliente,cidade,valor,status
2026-09-01,Ana Souza,Recife,150.00,pago
2026-09-02,Bruno Lima,São Paulo,320.50,pago
2026-09-03,Carla Dias,Recife,89.90,pendente
2026-09-05,Diego Alves,Curitiba,1200.00,pago
2026-09-08,Ana Souza,Recife,450.00,pago
2026-09-10,Eva Rocha,São Paulo,abc,pago
2026-09-12,Fábio Nunes,Curitiba,610.00,cancelado
2026-09-15,Bruno Lima,São Paulo,"89,90",pago
2026-09-20,Gabi Costa,Salvador,980.00,pago
`,
  "clientes.csv": `id,nome,cidade,uf,email
1,Ana Souza,Recife,PE,ana@email.com
2,Bruno Lima,São Paulo,SP,bruno@email.com
3,Carla Dias,Recife,PE,carla@email.com
4,Diego Alves,Curitiba,PR,diego@email.com
5,Eva Rocha,São Paulo,SP,eva@email.com
`
};

// Banco de exemplo do sandbox SQL (recriado do zero a cada execução).
export const SEED_SQL = `
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY, nome TEXT NOT NULL, email TEXT, cpf TEXT, cidade TEXT, uf TEXT,
  telefone TEXT, nascimento DATE, limite DECIMAL(12,2) DEFAULT 0, ativo INT DEFAULT 1,
  plano TEXT DEFAULT 'free', data_cadastro DATE, criado_em DATETIME, ultimo_pedido DATE
);
INSERT INTO clientes VALUES
 (1,'Ana Souza','ana@email.com','12345678901','Recife','PE','81999990001','1990-05-02',3000,1,'pro','2025-03-10','2025-03-10 09:15:00','2026-09-08'),
 (2,'Bruno Lima','bruno@email.com','23456789012','São Paulo','SP','11988880002','1985-11-20',8000,1,'premium','2024-07-01','2024-07-01 14:00:00','2026-09-15'),
 (3,'Carla Dias','carla@email.com','34567890123','Recife','PE',NULL,'2000-01-15',500,1,'free','2026-01-20','2026-01-20 10:30:00','2026-09-03'),
 (4,'Diego Alves','diego@email.com','45678901234','Curitiba','PR','41977770004','1978-08-08',12000,1,'premium','2023-11-05','2023-11-05 08:00:00','2026-09-05'),
 (5,'Eva Rocha','eva@email.com','56789012345','São Paulo','SP','11966660005','1995-03-30',1500,0,'free','2025-06-18','2025-06-18 16:45:00','2026-02-10'),
 (6,'Fábio Nunes','fabio@email.com','67890123456','Campinas','SP','19955550006','1988-12-12',2500,1,'pro','2025-09-09','2025-09-09 11:20:00','2026-09-12'),
 (7,'Gabi Costa','gabi@email.com','78901234567','Salvador','BA','71944440007','1999-07-07',4000,1,'pro','2026-02-14','2026-02-14 19:00:00','2026-09-20'),
 (8,'Hugo Melo','hugo@email.com','89012345678','Belo Horizonte','MG',NULL,'1992-04-25',1000,1,'free','2026-05-01','2026-05-01 07:50:00',NULL),
 (9,'Íris Prado','iris@email.com','90123456789','São Paulo','SP','11933330009','2002-10-10',800,1,'free','2026-08-22','2026-08-22 13:10:00',NULL),
 (10,'João Pires','joao@email.com','01234567890','Recife','PE','81922220010','1983-06-18',6000,1,'premium','2024-02-29','2024-02-29 17:35:00','2026-08-30'),
 (11,'Karen Lopes','karen@email.com','11223344556','Curitiba','PR',NULL,'1997-09-03',700,1,'free','2026-09-30','2026-09-30 09:00:00',NULL),
 (12,'Lucas Reis','lucas@email.com','22334455667','Campinas','SP','19911110012','1980-02-17',9000,1,'premium','2023-05-15','2023-05-15 15:15:00','2026-07-11');

CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, categoria TEXT, preco DECIMAL(10,2), estoque INT);
INSERT INTO produtos VALUES
 (1,'Fone Bluetooth','eletronicos',129.90,40),(2,'Carregador USB-C','eletronicos',59.00,120),
 (3,'Caneca Personalizada','casa',29.90,200),(4,'Camiseta Dev','roupas',59.90,80),
 (5,'Mouse Sem Fio','eletronicos',89.90,60),(6,'Livro de SQL','livros',79.00,35),
 (7,'Mochila Notebook','acessorios',199.00,25),(8,'Teclado Mecânico','eletronicos',349.00,15),
 (9,'Garrafa Térmica','casa',49.90,90),(10,'Jogo de Tabuleiro','jogos',149.00,18);

CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INT REFERENCES clientes(id), valor DECIMAL(10,2), status TEXT, data DATE, uf TEXT);
INSERT INTO pedidos VALUES
 (1,1,150.00,'pago','2026-07-02','PE'),(2,2,320.50,'pago','2026-07-05','SP'),(3,3,89.90,'pendente','2026-07-09','PE'),
 (4,4,1200.00,'pago','2026-07-15','PR'),(5,1,450.00,'pago','2026-08-01','PE'),(6,5,210.00,'cancelado','2026-08-03','SP'),
 (7,6,610.00,'pago','2026-08-10','SP'),(8,2,89.90,'pago','2026-08-18','SP'),(9,7,980.00,'pago','2026-08-25','BA'),
 (10,10,1500.00,'pago','2026-08-30','PE'),(11,12,2300.00,'pago','2026-07-11','SP'),(12,4,349.00,'pago','2026-09-05','PR'),
 (13,1,79.00,'pago','2026-09-08','PE'),(14,6,59.90,'pendente','2026-09-12','SP'),(15,2,1999.00,'pago','2026-09-15','SP'),
 (16,7,129.90,'pago','2026-09-20','BA'),(17,3,49.90,'pago','2026-09-03','PE'),(18,10,299.00,'cancelado','2026-09-25','PE'),
 (19,4,650.00,'pago','2026-09-28','PR'),(20,12,180.00,'pago','2026-09-29','SP');

CREATE TABLE itens_pedido (pedido_id INT, produto_id INT, quantidade INT, PRIMARY KEY (pedido_id, produto_id));
INSERT INTO itens_pedido VALUES
 (1,3,2),(1,9,1),(2,1,1),(2,5,2),(3,5,1),(4,8,2),(4,7,1),(5,10,3),(6,4,2),(7,1,2),(7,6,3),(8,5,1),
 (9,7,4),(9,10,1),(10,8,3),(10,7,2),(11,8,5),(11,10,3),(12,8,1),(13,6,1),(14,4,1),(15,8,4),(15,7,3),
 (16,1,1),(17,9,1),(18,7,1),(19,7,2),(19,8,1),(20,3,6);

CREATE TABLE funcionarios (id INTEGER PRIMARY KEY, nome TEXT, cargo TEXT, departamento TEXT, salario DECIMAL(10,2));
INSERT INTO funcionarios VALUES
 (1,'Marta','Analista','TI',6500),(2,'Nelson','Desenvolvedor','TI',9000),(3,'Olga','Gerente','Vendas',12000),
 (4,'Paulo','Vendedor','Vendas',4000),(5,'Quésia','Desenvolvedora','TI',9000),(6,'Rui','Estagiário','TI',2000);

CREATE TABLE contas (id INTEGER PRIMARY KEY, titular TEXT, saldo DECIMAL(12,2));
INSERT INTO contas VALUES (1,'João',1000.00),(2,'Maria',500.00),(3,'Ana',250.00);

CREATE TABLE sessoes (id INTEGER PRIMARY KEY, usuario TEXT, expira_em DATETIME);
INSERT INTO sessoes VALUES (1,'ana','2026-01-01 00:00:00'),(2,'bruno','2030-01-01 00:00:00'),(3,'carla','2025-06-01 12:00:00');

CREATE TABLE vendas_vendedor (regiao TEXT, vendedor TEXT, total DECIMAL(12,2));
INSERT INTO vendas_vendedor VALUES
 ('Sul','Paulo',52000),('Sul','Rita',61000),('Sul','Sara',61000),('Sudeste','Tiago',98000),
 ('Sudeste','Úrsula',75000),('Nordeste','Vera',43000),('Nordeste','Wagner',57000);

CREATE TABLE faturamento_mensal (mes TEXT, faturamento DECIMAL(12,2));
INSERT INTO faturamento_mensal VALUES ('2026-05',41000),('2026-06',45500),('2026-07',39800),('2026-08',52300),('2026-09',58900);
`;
