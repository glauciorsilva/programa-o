// Banco de exemplo do "SQL de A a Z": uma pequena distribuidora de alimentos.
// A estrutura lembra a dos tutoriais clássicos de SQL (clientes, pedidos, produtos…),
// com dados próprios, em português.

export const SEED_LOJA = `
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  contato TEXT,
  endereco TEXT,
  cidade TEXT,
  cep TEXT,
  pais TEXT
);
INSERT INTO clientes VALUES
 (1,'Armazém Bom Preço','Ana Souza','Rua das Flores, 120','São Paulo','01310-000','Brasil'),
 (2,'Bistrô da Praça','Bruno Lima','Praça XV, 8','Rio de Janeiro','20010-010','Brasil'),
 (3,'Casa do Pão','Carla Mendes','Av. Brasil, 455','Belo Horizonte','30140-001','Brasil'),
 (4,'Doces da Vovó','Diego Alves','Rua Augusta, 900','São Paulo','01305-100','Brasil'),
 (5,'Empório Lisboa','Inês Duarte','Rua Garrett, 19','Lisboa','1200-203','Portugal'),
 (6,'Feira Fresca','Fernanda Rocha','Rua XV de Novembro, 300','Curitiba','80020-310','Brasil'),
 (7,'Gourmet Madrid','Javier Ruiz','Calle Mayor, 4','Madri','28013','Espanha'),
 (8,'Granja Sevilla','Lucía Ortega','Avenida de la Constitución, 21','Sevilha','41004','Espanha'),
 (9,'Hortifruti Porto','Rui Pereira','Rua de Santa Catarina, 77','Porto','4000-447','Portugal'),
 (10,'Rancho Grande','Miguel Torres','Av. Reforma, 222','Cidade do México','06600','México'),
 (11,'Restaurante Barcelona','Marta Puig','Carrer de Mallorca, 150','Barcelona','08036','Espanha'),
 (12,'Sabor Mineiro','Rafael Costa','Rua da Bahia, 1000','Belo Horizonte','30160-011','Brasil'),
 (13,'Tempero Baiano','Juliana Santos','Av. Sete de Setembro, 50','Salvador','40060-001','Brasil'),
 (14,'La Esquina','Sofía Gómez','Av. Corrientes, 1234','Buenos Aires','C1043','Argentina'),
 (15,'Mercado Central','Pedro Nunes','Rua Direita, 5','Rio de Janeiro','20050-000','Brasil'),
 (16,'Berliner Markt','Hans Weber','Unter den Linden, 10','Berlim','10117','Alemanha'),
 (17,'Café Colonial','Laura Becker','Rua Pomerode, 33','Blumenau',NULL,'Brasil'),
 (18,'Rotisseria Roma','Giulia Rossi','Via del Corso, 18','Roma','00186','Itália'),
 (19,'Quitanda Nova',NULL,'Rua Nova, 9','Recife','50010-000','Brasil'),
 (20,'Gaúcho Sul','Tiago Pinto','Av. Ipiranga, 700','Porto Alegre',NULL,'Brasil');

CREATE TABLE categorias (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  descricao TEXT
);
INSERT INTO categorias VALUES
 (1,'Bebidas','Sucos, cafés, chás e refrigerantes'),
 (2,'Condimentos','Molhos, temperos e especiarias'),
 (3,'Doces','Chocolates, bolos e sobremesas'),
 (4,'Laticínios','Queijos, leite e iogurtes'),
 (5,'Grãos','Arroz, feijão, massas e farinhas'),
 (6,'Carnes','Carnes frescas e embutidos');

CREATE TABLE fornecedores (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  contato TEXT,
  cidade TEXT,
  pais TEXT,
  telefone TEXT
);
INSERT INTO fornecedores VALUES
 (1,'Café Serra Alta','Marcos Ribeiro','Varginha','Brasil','(35) 3222-1000'),
 (2,'Laticínios Vale Verde','Paula Ferraz','Juiz de Fora','Brasil','(32) 3215-2000'),
 (3,'Temperos do Norte','Antônio Melo','Belém','Brasil','(91) 3224-3000'),
 (4,'Doceria Imperial','Cecília Prado','Petrópolis','Brasil','(24) 2242-4000'),
 (5,'Quinta do Douro','José Matos','Porto','Portugal','+351 22 555 5000'),
 (6,'Molinos del Sur','Carlos Vega','Rosário','Argentina','+54 341 555 6000'),
 (7,'Frigorífico Pampa','Lúcia Freitas','Pelotas','Brasil','(53) 3222-7000'),
 (8,'Ervas Finas','Renata Dias','Campinas','Brasil',NULL);

CREATE TABLE produtos (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  fornecedor_id INTEGER,
  categoria_id INTEGER,
  unidade TEXT,
  preco REAL
);
INSERT INTO produtos VALUES
 (1,'Café em grãos',1,1,'pacote 1 kg',42.9),
 (2,'Chá de camomila',8,1,'caixa 20 sachês',9.5),
 (3,'Suco de uva integral',5,1,'garrafa 1 L',18),
 (4,'Molho de pimenta',3,2,'frasco 150 ml',12.4),
 (5,'Tucupi',3,2,'garrafa 1 L',15),
 (6,'Orégano',8,2,'pacote 50 g',6.8),
 (7,'Chocolate meio amargo',4,3,'barra 200 g',21.5),
 (8,'Doce de leite',2,3,'pote 400 g',16.9),
 (9,'Bolo de rolo',4,3,'unidade 500 g',35),
 (10,'Queijo minas',2,4,'peça 500 g',28.75),
 (11,'Iogurte natural',2,4,'pote 170 g',4.2),
 (12,'Queijo da Serra',5,4,'peça 1 kg',89.9),
 (13,'Arroz agulhinha',6,5,'pacote 5 kg',27.5),
 (14,'Feijão preto',6,5,'pacote 1 kg',8.9),
 (15,'Farinha de mandioca',3,5,'pacote 1 kg',7.6),
 (16,'Macarrão integral',6,5,'pacote 500 g',6.4),
 (17,'Picanha',7,6,'peça 1,2 kg',119.9),
 (18,'Linguiça artesanal',7,6,'pacote 1 kg',32),
 (19,'Presunto cru',5,6,'pacote 200 g',45),
 (20,'Café descafeinado',1,1,'pacote 500 g',29.9);

CREATE TABLE funcionarios (
  id INTEGER PRIMARY KEY,
  sobrenome TEXT,
  nome TEXT,
  nascimento TEXT,
  cargo TEXT,
  chefe_id INTEGER,
  salario REAL
);
INSERT INTO funcionarios VALUES
 (1,'Moreira','Helena','1975-03-14','Diretora',NULL,18000),
 (2,'Barros','Eduardo','1982-07-02','Gerente de vendas',1,11000),
 (3,'Cardoso','Patrícia','1990-11-23','Vendedora',2,4800),
 (4,'Teixeira','Lucas','1995-01-30','Vendedor',2,4200),
 (5,'Ramos','Beatriz','1988-05-17','Vendedora',2,5100),
 (6,'Farias','Gustavo','1979-09-08','Gerente de logística',1,10500),
 (7,'Monteiro','Camila','1998-12-01','Assistente de logística',6,3200),
 (8,'Azevedo','Rodrigo','1993-04-26','Vendedor',2,4500);

CREATE TABLE transportadoras (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  telefone TEXT
);
INSERT INTO transportadoras VALUES
 (1,'Rápido Expresso','(11) 4000-1111'),
 (2,'Entrega Certa','(21) 4000-2222'),
 (3,'Correio Veloz','(31) 4000-3333');

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER,
  funcionario_id INTEGER,
  data TEXT,
  transportadora_id INTEGER
);
INSERT INTO pedidos VALUES
 (1001,1,3,'2024-01-08',1),
 (1002,5,4,'2024-01-15',3),
 (1003,2,3,'2024-01-22',2),
 (1004,7,5,'2024-02-03',1),
 (1005,1,8,'2024-02-10',1),
 (1006,10,4,'2024-02-19',3),
 (1007,3,5,'2024-03-01',2),
 (1008,12,3,'2024-03-09',1),
 (1009,11,8,'2024-03-18',3),
 (1010,4,4,'2024-04-02',2),
 (1011,14,5,'2024-04-11',1),
 (1012,2,3,'2024-04-25',2),
 (1013,16,8,'2024-05-06',3),
 (1014,6,4,'2024-05-20',1),
 (1015,8,5,'2024-06-03',2),
 (1016,1,3,'2024-06-14',1),
 (1017,13,8,'2024-07-01',3),
 (1018,9,4,'2024-07-15',2),
 (1019,15,5,'2024-08-05',1),
 (1020,5,3,'2024-08-21',3);

CREATE TABLE itens_pedido (
  id INTEGER PRIMARY KEY,
  pedido_id INTEGER,
  produto_id INTEGER,
  quantidade INTEGER
);
INSERT INTO itens_pedido VALUES
 (1,1001,1,10),(2,1001,13,5),(3,1002,12,2),(4,1002,19,6),
 (5,1003,17,4),(6,1003,4,12),(7,1004,7,20),(8,1004,3,15),
 (9,1005,14,30),(10,1005,15,25),(11,1006,1,8),(12,1006,5,10),
 (13,1007,9,6),(14,1007,10,12),(15,1008,18,10),(16,1008,13,8),
 (17,1009,12,3),(18,1009,7,10),(19,1010,8,24),(20,1010,9,4),
 (21,1011,17,6),(22,1011,3,12),(23,1012,11,40),(24,1012,2,15),
 (25,1013,1,12),(26,1013,20,6),(27,1014,6,18),(28,1014,16,30),
 (29,1015,19,5),(30,1015,18,8),(31,1016,10,9),(32,1016,1,5),
 (33,1017,5,14),(34,1017,4,9),(35,1018,3,20),(36,1018,12,1),
 (37,1019,13,10),(38,1019,14,20),(39,1020,7,8),(40,1020,8,6);
`;

export const TABELAS_LOJA = ["clientes", "categorias", "fornecedores", "produtos", "funcionarios", "transportadoras", "pedidos", "itens_pedido"];
