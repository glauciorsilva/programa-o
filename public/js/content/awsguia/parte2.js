// AWS de A a Z — Parte 2: redes, armazenamento, bancos de dados, IA/análise de dados.
import { m, vf } from "../extras/q.js";

const S6 = "6. Redes";
const S7 = "7. Armazenamento";
const S8 = "8. Bancos de dados";
const S9 = "9. IA, Machine Learning e análise de dados";

export default [
  {
    id: "vpc", secao: S6, titulo: "Amazon VPC, sub-redes e conectividade",
    teoria: `
      <p>A <b>Amazon VPC</b> (<i>Virtual Private Cloud</i>) é a sua <b>rede privada</b> dentro da AWS. Nela você define faixas de IP, sub-redes, rotas e quem entra e sai.</p>
      <h3>Sub-redes</h3>
      <ul>
        <li><b>Pública</b>: tem rota para a internet (ex.: o site, o balanceador de carga);</li>
        <li><b>Privada</b>: sem acesso direto da internet (ex.: o banco de dados). Para sair (baixar atualizações), usa um <b>NAT Gateway</b>.</li>
      </ul>
      <!--pratica-->
      <h3>Portas de entrada</h3>
      <ul>
        <li><b>Internet Gateway</b>: liga a VPC à internet pública;</li>
        <li><b>Virtual Private Gateway + VPN</b>: túnel <b>criptografado</b> pela internet entre a VPC e o escritório/data center;</li>
        <li><b>AWS Direct Connect</b>: link <b>físico dedicado</b> entre o data center da empresa e a AWS (mais rápido, estável e privado, sem passar pela internet).</li>
      </ul>
      <p>Para ligar várias VPCs entre si: <b>VPC Peering</b> ou <b>AWS Transit Gateway</b> (um “hub” central).</p>`,
    perguntas: [
      m("Onde se costuma colocar um banco de dados que não deve ser acessado pela internet?", ["Numa sub-rede privada", "Numa sub-rede pública", "Num local de borda", "No Internet Gateway"], 0, "Sub-redes privadas não têm rota direta para a internet."),
      m("Qual serviço oferece um link **físico dedicado** entre o data center da empresa e a AWS?", ["AWS Direct Connect", "VPN", "Internet Gateway", "Amazon CloudFront"], 0, "A VPN passa pela internet (criptografada); o Direct Connect não."),
      vf("O Internet Gateway permite que recursos de uma VPC se comuniquem com a internet.", true, "Sem ele, a VPC fica isolada da internet.")
    ]
  },
  {
    id: "seguranca-rede", secao: S6, titulo: "Grupos de segurança e ACLs de rede",
    teoria: `
      <p>Há duas camadas de “firewall” virtual numa VPC:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th></th><th>Network ACL</th><th>Security Group</th></tr></thead><tbody>
        <tr><td>Protege</td><td>a <b>sub-rede</b></td><td>a <b>instância</b> (ou recurso)</td></tr>
        <tr><td>Regras</td><td>permitir <b>e negar</b></td><td>só <b>permitir</b></td></tr>
        <tr><td>Estado</td><td><b>sem estado</b> (stateless): confere a ida e a volta</td><td><b>com estado</b> (stateful): se a ida foi permitida, a volta passa</td></tr>
        <tr><td>Padrão</td><td>a ACL padrão permite tudo</td><td>novo grupo: nega toda entrada, permite toda saída</td></tr>
      </tbody></table>
      <!--pratica-->
      <p>💼 Exemplo: o grupo de segurança do servidor web permite entrada nas portas 80/443 de qualquer lugar; o do banco permite a porta 3306 <b>só</b> a partir do grupo do servidor web.</p>`,
    perguntas: [
      m("Qual camada protege no nível da **instância** e é *stateful*?", ["Security Group", "Network ACL", "Internet Gateway", "Route 53"], 0, "Grupos de segurança lembram o estado da conexão."),
      vf("Security Groups permitem criar regras de **negar**.", false, "Eles só têm regras de permitir; negar é com a Network ACL."),
      m("A Network ACL atua no nível…", ["da sub-rede", "da instância", "da região", "da conta"], 0, "Ela filtra o tráfego que entra e sai da sub-rede.")
    ]
  },
  {
    id: "rede-global", secao: S6, titulo: "Rede global: Route 53, CloudFront e Global Accelerator",
    teoria: `
      <ul>
        <li><b>Amazon Route 53</b>: serviço de <b>DNS</b> (traduz <code>minhaloja.com</code> em endereços IP) e registro de domínios. Pode rotear por <b>latência</b>, <b>geolocalização</b>, <b>peso</b> (testes A/B) e <b>failover</b> (se a região principal cair, manda para a reserva).</li>
        <li><b>Amazon CloudFront</b>: <b>CDN</b> que guarda cópias de sites, imagens e vídeos nos locais de borda, perto do usuário: carrega mais rápido e alivia o servidor.</li>
        <li><b>AWS Global Accelerator</b>: usa a rede global da AWS para levar o tráfego mais rápido até a aplicação.</li>
      </ul>
      <!--pratica-->
      <h3>Arquiteturas globais</h3>
      <p>Um site global típico: o usuário digita o endereço → <b>Route 53</b> resolve → <b>CloudFront</b> entrega o conteúdo estático da borda → o resto vai para um <b>ELB</b> com instâncias EC2 em várias <b>AZs</b> → o banco <b>RDS Multi-AZ</b>. Para desastres, replica-se em uma <b>segunda região</b>.</p>`,
    perguntas: [
      m("Qual serviço é o DNS da AWS?", ["Amazon Route 53", "Amazon CloudFront", "AWS Direct Connect", "Amazon VPC"], 0, "O nome vem da porta 53, usada pelo DNS."),
      m("Qual serviço entrega conteúdo a partir dos locais de borda (CDN)?", ["Amazon CloudFront", "Amazon Route 53", "Amazon S3 Glacier", "AWS Snowball"], 0, "CloudFront é a CDN da AWS.")
    ]
  },
  {
    id: "armazenamento", secao: S7, titulo: "Armazenamento: instance store e EBS",
    teoria: `
      <p>Três formas de guardar dados: <b>em bloco</b> (como um HD), <b>em arquivo</b> (pastas compartilhadas) e <b>em objetos</b> (arquivos com metadados, acessados pela web).</p>
      <h3>Instance store</h3>
      <p>Disco físico <b>temporário</b> preso ao servidor onde a instância roda. Muito rápido, mas os dados <b>somem</b> quando a instância é parada ou encerrada. Bom para cache e arquivos temporários.</p>
      <!--pratica-->
      <h3>Amazon EBS (Elastic Block Store)</h3>
      <ul>
        <li>“HD virtual” <b>persistente</b> para o EC2: os dados continuam mesmo se a instância parar;</li>
        <li>Fica numa <b>Zona de Disponibilidade</b> (a instância precisa estar na mesma AZ);</li>
        <li>Tipos SSD (uso geral, IOPS provisionadas) e HDD (vazão, uso esporádico);</li>
        <li><b>Snapshots</b>: backups incrementais guardados no S3, que podem criar novos volumes em outra AZ ou região.</li>
      </ul>`,
    perguntas: [
      m("O que acontece com os dados do **instance store** quando a instância é encerrada?", ["São perdidos", "São copiados para o S3", "Continuam no volume", "Vão para o Glacier"], 0, "Instance store é temporário."),
      m("Como fazer backup de um volume EBS?", ["Com snapshots", "Copiando para o instance store", "Com o Route 53", "Não é possível"], 0, "Snapshots são incrementais e ficam no S3."),
      vf("Um volume EBS fica dentro de uma única Zona de Disponibilidade.", true, "Para outra AZ, crie um volume a partir de um snapshot.")
    ]
  },
  {
    id: "s3", secao: S7, titulo: "Amazon S3 e classes de armazenamento",
    teoria: `
      <p>O <b>Amazon S3</b> (<i>Simple Storage Service</i>) guarda <b>objetos</b> (qualquer arquivo + metadados) em <b>buckets</b>. É praticamente ilimitado, cada objeto pode ter até 5 TB e a durabilidade é de <b>99,999999999%</b> (“11 noves”).</p>
      <p>Usos: backups, imagens e vídeos de sites, data lakes, sites estáticos, arquivamento. O acesso é controlado por políticas; o padrão é <b>privado</b>. Dá para ligar <b>versionamento</b> (guardar versões antigas) e <b>criptografia</b>.</p>
      <!--pratica-->
      <h3>Classes de armazenamento</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Classe</th><th>Para</th></tr></thead><tbody>
        <tr><td><b>S3 Standard</b></td><td>dados acessados com frequência</td></tr>
        <tr><td><b>S3 Intelligent-Tiering</b></td><td>padrão de acesso desconhecido: move sozinho entre camadas</td></tr>
        <tr><td><b>S3 Standard-IA</b></td><td>acesso pouco frequente, mas rápido quando precisa</td></tr>
        <tr><td><b>S3 One Zone-IA</b></td><td>igual ao IA, numa só AZ (mais barato, menos resiliente)</td></tr>
        <tr><td><b>S3 Glacier Instant / Flexible Retrieval</b></td><td>arquivamento; recuperação em ms / minutos a horas</td></tr>
        <tr><td><b>S3 Glacier Deep Archive</b></td><td>o mais barato; recuperação em até 12 horas (guardar por anos)</td></tr>
      </tbody></table>
      <p><b>Regras de ciclo de vida</b> movem objetos automaticamente (ex.: para o Glacier depois de 90 dias).</p>`,
    perguntas: [
      m("No S3, os arquivos são guardados em…", ["buckets", "volumes", "instâncias", "tabelas"], 0, "Bucket = “balde” onde ficam os objetos."),
      m("Qual classe é a **mais barata** para guardar dados por anos, aceitando horas para recuperar?", ["S3 Glacier Deep Archive", "S3 Standard", "S3 Intelligent-Tiering", "S3 Standard-IA"], 0, "Deep Archive é para arquivamento de longo prazo."),
      vf("Um bucket S3 novo é público por padrão.", false, "O padrão é privado (e o bloqueio de acesso público vem ligado)."),
      m("Para dados com padrão de acesso desconhecido, a classe indicada é…", ["S3 Intelligent-Tiering", "S3 One Zone-IA", "S3 Glacier Deep Archive", "EBS"], 0, "Ela move os objetos entre camadas sozinha.")
    ]
  },
  {
    id: "efs", secao: S7, titulo: "Amazon EFS e comparação dos armazenamentos",
    teoria: `
      <p>O <b>Amazon EFS</b> (<i>Elastic File System</i>) é um <b>sistema de arquivos compartilhado</b> (NFS, Linux): várias instâncias EC2, em várias AZs, montam a mesma “pasta” ao mesmo tempo. Ele cresce e diminui sozinho. Para Windows, há o <b>Amazon FSx</b>.</p>
      <!--pratica-->
      <table class="sqlp-tabela-teoria"><thead><tr><th></th><th>EBS</th><th>EFS</th><th>S3</th></tr></thead><tbody>
        <tr><td>Tipo</td><td>bloco</td><td>arquivo</td><td>objeto</td></tr>
        <tr><td>Acesso</td><td>uma instância (na mesma AZ)</td><td>muitas instâncias, várias AZs</td><td>pela web/API, de qualquer lugar</td></tr>
        <tr><td>Escopo</td><td>uma AZ</td><td>regional</td><td>regional</td></tr>
        <tr><td>Bom para</td><td>disco do sistema, bancos na EC2</td><td>pastas compartilhadas, CMS</td><td>backups, mídia, data lake</td></tr>
      </tbody></table>
      <p>Também existe o <b>AWS Storage Gateway</b>, que conecta o armazenamento local da empresa à nuvem (híbrido), e o <b>AWS Backup</b>, que centraliza backups de vários serviços.</p>`,
    perguntas: [
      m("Vários servidores Linux precisam acessar a **mesma pasta** ao mesmo tempo. Qual serviço?", ["Amazon EFS", "Amazon EBS", "Instance store", "Amazon S3 Glacier"], 0, "EFS é um sistema de arquivos compartilhado."),
      m("Qual destes é armazenamento de **objetos**?", ["Amazon S3", "Amazon EBS", "Amazon EFS", "Instance store"], 0, "S3 guarda objetos em buckets.")
    ]
  },
  {
    id: "bancos", secao: S8, titulo: "Amazon RDS e Aurora (bancos relacionais)",
    teoria: `
      <p>Você pode instalar um banco numa instância EC2 (e cuidar de tudo) ou usar um banco <b>gerenciado</b>: a AWS faz instalação, atualizações, backups e alta disponibilidade.</p>
      <h3>Amazon RDS</h3>
      <p>Bancos <b>relacionais</b> (SQL) gerenciados: <b>MySQL, PostgreSQL, MariaDB, Oracle, SQL Server</b> e Aurora. Recursos:</p>
      <ul>
        <li><b>Backups automáticos</b> e snapshots;</li>
        <li><b>Multi-AZ</b>: uma cópia em espera em outra AZ, com troca automática em caso de falha (alta disponibilidade);</li>
        <li><b>Réplicas de leitura</b>: cópias para dividir as consultas (desempenho);</li>
        <li>Criptografia e isolamento em VPC.</li>
      </ul>
      <!--pratica-->
      <h3>Amazon Aurora</h3>
      <p>Banco relacional criado pela AWS, <b>compatível com MySQL e PostgreSQL</b>, até 5× mais rápido que o MySQL padrão, com os dados replicados 6 vezes em 3 AZs. Há a versão <b>Aurora Serverless</b>, que escala sozinha.</p>`,
    perguntas: [
      m("Qual recurso do RDS mantém uma cópia em espera em outra AZ para alta disponibilidade?", ["Multi-AZ", "Réplica de leitura", "Snapshot", "Instance store"], 0, "Réplicas de leitura são para desempenho; Multi-AZ para disponibilidade."),
      m("O Amazon Aurora é compatível com…", ["MySQL e PostgreSQL", "Oracle e SQL Server", "MongoDB", "Redis"], 0, "Aurora fala MySQL e PostgreSQL."),
      vf("No RDS, a AWS cuida de backups e atualizações do banco.", true, "É um serviço gerenciado.")
    ]
  },
  {
    id: "dynamodb", secao: S8, titulo: "Amazon DynamoDB e quando usar cada banco",
    teoria: `
      <p>O <b>DynamoDB</b> é um banco <b>NoSQL</b> de chave-valor e documentos, <b>serverless</b> (sem servidores para gerenciar), com resposta em <b>milissegundos</b> em qualquer escala. Os dados ficam em tabelas com <b>itens</b> e <b>atributos</b>, sem esquema fixo; cada item é achado pela <b>chave primária</b>.</p>
      <p>Usos: carrinhos de compra, sessões, jogos, IoT, catálogos com milhões de acessos.</p>
      <!--pratica-->
      <table class="sqlp-tabela-teoria"><thead><tr><th></th><th>RDS / Aurora</th><th>DynamoDB</th></tr></thead><tbody>
        <tr><td>Modelo</td><td>relacional (tabelas, JOINs, SQL)</td><td>NoSQL (chave-valor/documento)</td></tr>
        <tr><td>Esquema</td><td>fixo</td><td>flexível</td></tr>
        <tr><td>Consultas</td><td>complexas, relatórios</td><td>simples por chave, altíssima escala</td></tr>
        <tr><td>Gestão</td><td>escolhe tamanho da instância</td><td>serverless</td></tr>
      </tbody></table>`,
    perguntas: [
      m("Qual banco é NoSQL e serverless?", ["Amazon DynamoDB", "Amazon RDS", "Amazon Aurora", "Amazon Redshift"], 0, "DynamoDB = chave-valor, sem servidores."),
      m("Um sistema com muitos JOINs e relatórios complexos combina mais com…", ["Amazon RDS/Aurora", "Amazon DynamoDB", "Amazon S3", "Amazon ElastiCache"], 0, "Relacionais lidam bem com JOINs e SQL.")
    ]
  },
  {
    id: "outros-bancos", secao: S8, titulo: "Redshift, DMS e outros bancos",
    teoria: `
      <ul>
        <li><b>Amazon Redshift</b>: <b>data warehouse</b> para análise de grandes volumes (relatórios, BI) com SQL;</li>
        <li><b>AWS DMS</b> (<i>Database Migration Service</i>): migra bancos para a AWS com o banco de origem <b>funcionando</b> durante a migração. Pode ser homogênea (MySQL → MySQL) ou heterogênea (Oracle → Aurora, com a ajuda da Schema Conversion Tool);</li>
        <li><b>Amazon DocumentDB</b>: documentos, compatível com MongoDB;</li>
        <li><b>Amazon ElastiCache</b>: cache em memória (Redis/Memcached) para acelerar leituras;</li>
        <li><b>Amazon MemoryDB</b>: banco em memória compatível com Redis, durável;</li>
        <li><b>Amazon Neptune</b>: banco de <b>grafos</b> (redes sociais, recomendações, fraudes);</li>
        <li><b>Amazon Keyspaces</b> (Cassandra), <b>Timestream</b> (séries temporais) e <b>QLDB</b> (registro imutável).</li>
      </ul>
      <!--pratica-->`,
    perguntas: [
      m("Qual serviço é um data warehouse para análises?", ["Amazon Redshift", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon Neptune"], 0, "Redshift = análise de grandes volumes com SQL."),
      m("Qual serviço migra bancos de dados mantendo a origem funcionando?", ["AWS DMS", "AWS Snowball", "Amazon S3", "AWS CloudTrail"], 0, "*Database Migration Service*."),
      m("Qual banco é indicado para dados em **grafo** (redes sociais)?", ["Amazon Neptune", "Amazon Aurora", "Amazon DocumentDB", "Amazon Redshift"], 0, "Neptune é o banco de grafos.")
    ]
  },
  {
    id: "ia-ml", secao: S9, titulo: "IA e Machine Learning na AWS",
    teoria: `
      <p><b>Inteligência Artificial</b> faz máquinas realizarem tarefas que pediriam inteligência humana. <b>Machine Learning</b> é a parte da IA que aprende padrões com dados. A AWS oferece três camadas:</p>
      <ol>
        <li><b>Serviços de IA prontos</b> (sem precisar saber ML):
          <ul>
            <li><b>Amazon Rekognition</b>: imagens e vídeos (rostos, objetos);</li>
            <li><b>Amazon Comprehend</b>: análise de texto (sentimento, entidades);</li>
            <li><b>Amazon Polly</b>: texto → fala; <b>Amazon Transcribe</b>: fala → texto;</li>
            <li><b>Amazon Translate</b>: tradução; <b>Amazon Lex</b>: chatbots;</li>
            <li><b>Amazon Textract</b>: extrai texto e tabelas de documentos;</li>
            <li><b>Amazon Kendra</b>: busca inteligente; <b>Amazon Personalize</b>: recomendações; <b>Amazon Fraud Detector</b>: fraudes.</li>
          </ul></li>
        <li><b>Amazon SageMaker</b>: plataforma para cientistas de dados <b>criarem, treinarem e publicarem</b> modelos próprios;</li>
        <li><b>Infraestrutura</b>: instâncias com GPUs e chips próprios (Trainium, Inferentia).</li>
      </ol>
      <!--pratica-->`,
    perguntas: [
      m("Qual serviço converte **texto em fala**?", ["Amazon Polly", "Amazon Transcribe", "Amazon Translate", "Amazon Lex"], 0, "Transcribe faz o contrário (fala → texto)."),
      m("Para identificar rostos e objetos em fotos, use…", ["Amazon Rekognition", "Amazon Comprehend", "Amazon Textract", "Amazon Kendra"], 0, "Rekognition analisa imagens e vídeos."),
      m("Qual serviço permite criar, treinar e publicar modelos de ML próprios?", ["Amazon SageMaker", "Amazon Polly", "Amazon Lex", "AWS Glue"], 0, "SageMaker é a plataforma completa de ML.")
    ]
  },
  {
    id: "genai", secao: S9, titulo: "IA generativa na AWS",
    teoria: `
      <p><b>IA generativa</b> cria conteúdo novo (texto, imagens, código, resumos) a partir de <b>modelos de fundação</b> (<i>foundation models</i>), treinados com enormes volumes de dados. Os modelos de linguagem (LLMs) respondem a instruções em linguagem natural (<i>prompts</i>).</p>
      <ul>
        <li><b>Amazon Bedrock</b>: acesso por API a vários modelos de fundação (da Amazon e de outras empresas, como a Anthropic), com recursos para personalizar com seus dados (RAG), criar agentes e aplicar proteções (<i>guardrails</i>), sem gerenciar infraestrutura;</li>
        <li><b>Amazon Q</b>: assistente de IA para empresas e para desenvolvedores (responde perguntas, gera e explica código);</li>
        <li><b>SageMaker JumpStart</b>: modelos prontos para ajustar e publicar.</li>
      </ul>
      <!--pratica-->
      <p>⚠️ Cuidados: revisar as respostas (modelos podem “alucinar”), proteger dados sensíveis e seguir as regras de uso responsável.</p>`,
    perguntas: [
      m("Qual serviço dá acesso por API a vários modelos de fundação?", ["Amazon Bedrock", "Amazon Rekognition", "Amazon Redshift", "AWS Lambda"], 0, "Bedrock é o serviço de IA generativa gerenciado."),
      vf("Modelos de IA generativa podem dar respostas erradas com aparência de certas (“alucinações”).", true, "Por isso é preciso revisar e validar as respostas.")
    ]
  },
  {
    id: "analise-dados", secao: S9, titulo: "Análise de dados e pipelines",
    teoria: `
      <p>Um <b>pipeline de dados</b> coleta, guarda, processa e mostra dados. Serviços principais:</p>
      <ul>
        <li><b>Coletar/fluxo em tempo real</b>: <b>Amazon Kinesis</b> (streams de dados, vídeo) e <b>Amazon MSK</b> (Kafka gerenciado);</li>
        <li><b>Guardar</b>: <b>Amazon S3</b> como <b>data lake</b> (dados brutos de todos os tipos), com o <b>AWS Lake Formation</b> para organizar e controlar acesso;</li>
        <li><b>Preparar/transformar (ETL)</b>: <b>AWS Glue</b> (catálogo e ETL serverless) e <b>Amazon EMR</b> (Spark/Hadoop);</li>
        <li><b>Consultar</b>: <b>Amazon Athena</b> (SQL direto em arquivos no S3, paga por consulta) e <b>Amazon Redshift</b> (data warehouse);</li>
        <li><b>Buscar e analisar logs</b>: <b>Amazon OpenSearch Service</b>;</li>
        <li><b>Visualizar</b>: <b>Amazon QuickSight</b> (painéis e BI).</li>
      </ul>
      <!--pratica-->`,
    perguntas: [
      m("Qual serviço roda consultas SQL diretamente em arquivos guardados no S3?", ["Amazon Athena", "Amazon QuickSight", "Amazon Kinesis", "AWS Glue"], 0, "Athena é serverless e cobra por dados lidos."),
      m("Qual serviço cria painéis e relatórios de BI?", ["Amazon QuickSight", "Amazon Athena", "Amazon EMR", "AWS DMS"], 0, "QuickSight é a ferramenta de visualização."),
      m("Para processar dados em **tempo real** (cliques, sensores), use…", ["Amazon Kinesis", "S3 Glacier", "Amazon RDS", "AWS Snowcone"], 0, "Kinesis lida com streams de dados.")
    ]
  }
];
