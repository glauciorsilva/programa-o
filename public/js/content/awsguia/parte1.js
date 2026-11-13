// AWS de A a Z — Parte 1: nuvem, computação, mensageria, serverless e infraestrutura global.
import { m, vf, l } from "../extras/q.js";

const S1 = "1. Começando na nuvem";
const S2 = "2. Computação (EC2)";
const S3 = "3. Mensageria e integração";
const S4 = "4. Serverless e contêineres";
const S5 = "5. Infraestrutura global e provisionamento";

export default [
  {
    id: "intro", secao: S1, titulo: "O que é a AWS e como este guia funciona",
    teoria: `
      <p><b>AWS</b> (<i>Amazon Web Services</i>) é a maior plataforma de <b>computação em nuvem</b> do mundo. Em vez de comprar servidores, você “aluga” recursos de TI (máquinas, armazenamento, bancos de dados, inteligência artificial…) pela internet e <b>paga só pelo que usar</b>.</p>
      <p>Empresas de todos os tamanhos usam AWS: de startups a bancos, streaming, jogos e governo. Saber nuvem é uma das habilidades mais pedidas no mercado de TI.</p>
      <h3>A certificação Cloud Practitioner</h3>
      <p>Este guia segue o conteúdo da certificação de entrada <b>AWS Certified Cloud Practitioner (CLF-C02)</b>: conceitos de nuvem, principais serviços, segurança, arquitetura e preços. Não exige experiência prévia. A prova tem 65 questões (múltipla escolha e resposta múltipla), 90 minutos, e é aplicada online ou em centros de prova.</p>
      <!--pratica-->
      <h3>Como praticar</h3>
      <ul>
        <li>Cada lição tem explicação e <b>perguntas de fixação</b> (⭐ 2 pts por acerto); marcar a lição como concluída vale ⭐ 10.</li>
        <li>Para mexer de verdade, crie uma conta no <b>AWS Free Tier</b> (nível gratuito) e explore o <b>Console</b>. ⚠️ Configure um <b>alerta de cobrança</b> (AWS Budgets) logo no primeiro dia e desligue o que não estiver usando.</li>
        <li>Há também o <b>AWS Skill Builder</b> (cursos oficiais gratuitos) e laboratórios guiados.</li>
      </ul>`,
    perguntas: [
      m("Qual é o modelo de cobrança básico da nuvem AWS?", ["Pagar pelo que usar (*pay-as-you-go*)", "Mensalidade fixa por servidor comprado", "Licença vitalícia", "Pagamento antecipado de 5 anos obrigatório"], 0, "Você paga conforme o uso, como na conta de luz."),
      vf("A certificação Cloud Practitioner exige experiência prévia em programação.", false, "É a certificação de entrada; foca em conceitos, não em código."),
      m("Qual serviço ajuda a evitar sustos na fatura com alertas de gasto?", ["AWS Budgets", "Amazon S3", "AWS Lambda", "Amazon EC2"], 0, "Com o Budgets você define um limite e recebe avisos.")
    ]
  },
  {
    id: "nuvem", secao: S1, titulo: "Computação em nuvem e modelos de implantação",
    teoria: `
      <p><b>Computação em nuvem</b> é a entrega de recursos de TI <b>sob demanda</b>, pela internet, com preço <b>conforme o uso</b>. Você não compra nem mantém data centers: usa a estrutura do provedor.</p>
      <h3>Modelos de implantação</h3>
      <ul>
        <li><b>Nuvem (cloud)</b>: tudo roda no provedor (ex.: um app novo feito 100% na AWS);</li>
        <li><b>On-premises (local / nuvem privada)</b>: tudo no data center próprio da empresa, com ferramentas de virtualização;</li>
        <li><b>Híbrida</b>: parte na nuvem, parte no local, conectadas (comum em bancos e governo, por leis ou sistemas antigos).</li>
      </ul>
      <!--pratica-->
      <h3>Modelos de serviço</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Modelo</th><th>Você gerencia</th><th>Exemplo AWS</th></tr></thead><tbody>
        <tr><td><b>IaaS</b> (infraestrutura)</td><td>sistema operacional, apps, dados</td><td>Amazon EC2</td></tr>
        <tr><td><b>PaaS</b> (plataforma)</td><td>só o app e os dados</td><td>AWS Elastic Beanstalk</td></tr>
        <tr><td><b>SaaS</b> (software)</td><td>só o uso</td><td>Amazon WorkMail, Chime</td></tr>
      </tbody></table>`,
    perguntas: [
      m("Uma empresa com parte dos sistemas no próprio data center e parte na AWS usa o modelo…", ["híbrido", "nuvem", "on-premises", "SaaS"], 0, "Híbrido = local + nuvem conectados."),
      m("Alugar máquinas virtuais e cuidar do sistema operacional é um exemplo de…", ["IaaS", "SaaS", "PaaS", "on-premises"], 0, "IaaS entrega infraestrutura; o resto é com você."),
      vf("Na nuvem, os recursos são entregues sob demanda pela internet.", true, "Essa é a definição de computação em nuvem.")
    ]
  },
  {
    id: "beneficios", secao: S1, titulo: "Os 6 benefícios da nuvem",
    teoria: `
      <ol>
        <li><b>Trocar despesa de capital por despesa variável</b>: em vez de investir alto em servidores antes de saber se vai usar (CapEx), paga-se conforme o uso (OpEx).</li>
        <li><b>Economia de escala</b>: como a AWS atende milhões de clientes, consegue preços menores do que você teria sozinho.</li>
        <li><b>Parar de adivinhar a capacidade</b>: aumente ou diminua os recursos conforme a demanda real, sem sobrar nem faltar.</li>
        <li><b>Mais velocidade e agilidade</b>: novos recursos ficam prontos em minutos, não em semanas.</li>
        <li><b>Parar de gastar com data centers</b>: foque no seu produto, não em energia, refrigeração e manutenção de hardware.</li>
        <li><b>Ficar global em minutos</b>: coloque sua aplicação perto de clientes no mundo todo com poucos cliques.</li>
      </ol>
      <!--pratica-->
      <p>💼 Exemplo: uma loja online que vende 10× mais na Black Friday aumenta os servidores só naqueles dias e paga só por eles, em vez de manter o ano todo uma estrutura para o pico.</p>`,
    perguntas: [
      m("“Pagar pelo uso em vez de investir antes em servidores” descreve qual benefício?", ["Trocar despesa de capital por despesa variável", "Economia de escala", "Ficar global em minutos", "Parar de gastar com data centers"], 0, "CapEx (investimento) → OpEx (gasto variável)."),
      m("A loja que aumenta servidores só na Black Friday aproveita principalmente…", ["parar de adivinhar a capacidade (elasticidade)", "economia de escala", "SaaS", "nuvem híbrida"], 0, "Ela ajusta a capacidade à demanda real."),
      vf("Economia de escala significa que os preços caem porque o provedor atende muitos clientes.", true, "O volume enorme reduz o custo por cliente.")
    ]
  },
  {
    id: "ec2", secao: S2, titulo: "Amazon EC2: servidores virtuais",
    teoria: `
      <p>O <b>Amazon EC2</b> (<i>Elastic Compute Cloud</i>) oferece <b>servidores virtuais</b> (chamados <b>instâncias</b>) na nuvem. Você escolhe o sistema operacional (Linux, Windows…), a quantidade de CPU e memória, e a instância fica pronta em minutos.</p>
      <p>Por trás, a AWS usa <b>virtualização</b>: uma máquina física grande é dividida em várias máquinas virtuais isoladas (<i>multitenancy</i>, gerenciado pelo <i>hypervisor</i>).</p>
      <!--pratica-->
      <h3>Passos para criar uma instância</h3>
      <ol>
        <li>Escolher a <b>AMI</b> (imagem com o sistema operacional);</li>
        <li>Escolher o <b>tipo</b> de instância (tamanho);</li>
        <li>Configurar rede (VPC/sub-rede) e <b>grupo de segurança</b> (firewall);</li>
        <li>Escolher o armazenamento (volume EBS) e um <b>par de chaves</b> para acesso SSH;</li>
        <li>Iniciar, conectar e instalar seu app.</li>
      </ol>
      <p>Você tem controle total do sistema (IaaS): é você quem atualiza, protege e configura o software.</p>`,
    perguntas: [
      m("No EC2, um servidor virtual é chamado de…", ["instância", "bucket", "função", "cluster"], 0, "Bucket é do S3; função é do Lambda."),
      m("O que é uma AMI?", ["A imagem com o sistema operacional usada para criar a instância", "Um tipo de banco de dados", "Uma região da AWS", "Um firewall"], 0, "*Amazon Machine Image*."),
      vf("No EC2, a atualização do sistema operacional da instância é responsabilidade do cliente.", true, "EC2 é IaaS: o sistema operacional é seu.")
    ]
  },
  {
    id: "ec2-tipos", secao: S2, titulo: "Tipos de instância EC2",
    teoria: `
      <p>Cada família de instância é otimizada para um tipo de trabalho:</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Família</th><th>Indicada para</th><th>Exemplos</th></tr></thead><tbody>
        <tr><td><b>Uso geral</b></td><td>equilíbrio de CPU, memória e rede</td><td>sites, servidores de apps, ambientes de teste (t3, m6)</td></tr>
        <tr><td><b>Otimizada para computação</b></td><td>muito processamento</td><td>jogos, cálculos científicos, encoding de vídeo (c6)</td></tr>
        <tr><td><b>Otimizada para memória</b></td><td>muitos dados na memória</td><td>bancos em memória, análise em tempo real (r6, x2)</td></tr>
        <tr><td><b>Computação acelerada</b></td><td>GPUs e chips especiais</td><td>machine learning, gráficos (p4, g5)</td></tr>
        <tr><td><b>Otimizada para armazenamento</b></td><td>muita leitura/escrita em disco local</td><td>data warehouses, bancos NoSQL (i4, d3)</td></tr>
      </tbody></table>
      <!--pratica-->
      <p>O nome tem um padrão: <code>m6g.large</code> = família <b>m</b>, geração <b>6</b>, processador <b>g</b> (Graviton), tamanho <b>large</b>.</p>`,
    perguntas: [
      m("Treinar um modelo de machine learning com GPU pede uma instância…", ["de computação acelerada", "de uso geral", "otimizada para armazenamento", "otimizada para memória"], 0, "Computação acelerada = GPUs."),
      m("Um banco de dados que mantém muitos dados em memória combina com…", ["otimizada para memória", "otimizada para computação", "uso geral", "computação acelerada"], 0, "Família r/x."),
      m("Um site simples com pouco tráfego costuma usar…", ["uso geral", "computação acelerada", "otimizada para armazenamento", "otimizada para memória"], 0, "Instâncias t/m equilibram recursos.")
    ]
  },
  {
    id: "ec2-precos", secao: S2, titulo: "Formas de pagar o EC2",
    teoria: `
      <table class="sqlp-tabela-teoria"><thead><tr><th>Opção</th><th>Como funciona</th><th>Quando usar</th></tr></thead><tbody>
        <tr><td><b>Sob demanda (On-Demand)</b></td><td>paga por segundo/hora, sem compromisso</td><td>cargas curtas, imprevisíveis, testes</td></tr>
        <tr><td><b>Savings Plans</b></td><td>compromisso de gasto por hora por 1 ou 3 anos; até ~72% de desconto</td><td>uso constante, com flexibilidade de tipo/região</td></tr>
        <tr><td><b>Instâncias reservadas</b></td><td>reserva de 1 ou 3 anos de um tipo específico; até ~72% de desconto</td><td>cargas estáveis e previsíveis</td></tr>
        <tr><td><b>Instâncias Spot</b></td><td>capacidade ociosa com até ~90% de desconto, mas a AWS pode retomar com 2 min de aviso</td><td>tarefas que podem ser interrompidas (processamento em lote)</td></tr>
        <tr><td><b>Hosts dedicados</b></td><td>servidor físico só seu</td><td>licenças por servidor, exigências legais</td></tr>
      </tbody></table>
      <!--pratica-->
      <p>💡 Combinação comum: base estável com Savings Plans/reservadas + picos com sob demanda + processamento em lote com Spot.</p>`,
    perguntas: [
      m("Qual opção dá o **maior** desconto, mas pode ser interrompida pela AWS?", ["Spot", "Sob demanda", "Hosts dedicados", "Reservadas"], 0, "Spot usa capacidade ociosa; pode ser retomada com 2 minutos de aviso."),
      m("Uma empresa precisa de um servidor físico exclusivo por causa de licenças. Ela deve usar…", ["Hosts dedicados", "Spot", "Savings Plans", "Sob demanda"], 0, "Host dedicado = hardware só seu."),
      vf("Instâncias sob demanda exigem contrato de 1 ano.", false, "Sob demanda não tem compromisso.")
    ]
  },
  {
    id: "ec2-escala", secao: S2, titulo: "Escalabilidade, Auto Scaling e Elastic Load Balancing",
    teoria: `
      <p><b>Escalar</b> é ajustar a capacidade à demanda:</p>
      <ul>
        <li><b>Vertical</b> (scale up): uma máquina maior;</li>
        <li><b>Horizontal</b> (scale out): mais máquinas iguais. É o preferido na nuvem.</li>
      </ul>
      <h3>Amazon EC2 Auto Scaling</h3>
      <p>Adiciona ou remove instâncias <b>automaticamente</b>. Você define no grupo de Auto Scaling a capacidade <b>mínima</b>, a <b>desejada</b> e a <b>máxima</b>. Pode ser <b>dinâmico</b> (reage à demanda, ex.: CPU acima de 70%) ou <b>preditivo</b> (agenda pela previsão).</p>
      <!--pratica-->
      <h3>Elastic Load Balancing (ELB)</h3>
      <p>Um <b>balanceador de carga</b> distribui o tráfego entre várias instâncias, para nenhuma ficar sobrecarregada, e para de mandar tráfego para instâncias com problema. Funciona muito bem junto com o Auto Scaling: as novas instâncias entram no balanceador sozinhas.</p>
      <p>Tipos: <b>Application Load Balancer</b> (HTTP/HTTPS, regras por caminho), <b>Network Load Balancer</b> (TCP/UDP, altíssimo desempenho) e <b>Gateway Load Balancer</b> (appliances de segurança).</p>`,
    perguntas: [
      m("Adicionar mais instâncias iguais é escalar…", ["horizontalmente", "verticalmente", "diagonalmente", "manualmente"], 0, "Scale out = mais máquinas."),
      m("Qual serviço distribui o tráfego entre várias instâncias?", ["Elastic Load Balancing", "EC2 Auto Scaling", "Amazon S3", "AWS Lambda"], 0, "O Auto Scaling ajusta a quantidade; o ELB distribui o tráfego."),
      vf("No Auto Scaling, você define capacidade mínima, desejada e máxima.", true, "São os limites do grupo de Auto Scaling.")
    ]
  },
  {
    id: "mensageria", secao: S3, titulo: "Mensageria: SQS, SNS e EventBridge",
    teoria: `
      <p>Em sistemas grandes, as partes devem ser <b>desacopladas</b>: se uma falhar ou ficar lenta, as outras continuam. Isso se faz trocando <b>mensagens</b> em vez de chamadas diretas.</p>
      <h3>Amazon SQS (filas)</h3>
      <p>Uma <b>fila</b>: quem produz coloca mensagens, quem consome retira e processa no seu ritmo. As mensagens ficam guardadas até serem processadas (até 14 dias). Ex.: pedidos de uma loja esperando o sistema de pagamento.</p>
      <h3>Amazon SNS (publicar/assinar)</h3>
      <p>Um <b>tópico</b>: uma mensagem publicada é entregue a <b>todos os assinantes</b> (e-mail, SMS, notificações no celular, filas SQS, funções Lambda). Ex.: “pedido enviado” avisa o cliente e o estoque ao mesmo tempo.</p>
      <!--pratica-->
      <h3>Amazon EventBridge (eventos)</h3>
      <p>Um <b>barramento de eventos</b> que recebe eventos de serviços AWS, apps próprios e parceiros SaaS, e os <b>roteia por regras</b> para os destinos certos. Também agenda tarefas (tipo “cron”).</p>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Serviço</th><th>Padrão</th><th>Use quando</th></tr></thead><tbody>
        <tr><td>SQS</td><td>fila (1 mensagem → 1 consumidor)</td><td>processar tarefas em segundo plano, absorver picos</td></tr>
        <tr><td>SNS</td><td>pub/sub (1 → muitos)</td><td>avisar vários sistemas/pessoas de uma vez</td></tr>
        <tr><td>EventBridge</td><td>eventos com regras de roteamento</td><td>integrar serviços e SaaS por eventos, agendamentos</td></tr>
      </tbody></table>`,
    perguntas: [
      m("Qual serviço é uma **fila** de mensagens?", ["Amazon SQS", "Amazon SNS", "Amazon EventBridge", "Amazon S3"], 0, "SQS = *Simple Queue Service*."),
      m("Para enviar a mesma notificação a vários assinantes (e-mail, SMS, Lambda), use…", ["Amazon SNS", "Amazon SQS", "Amazon EBS", "AWS DMS"], 0, "SNS funciona no modelo publicar/assinar."),
      vf("Desacoplar componentes faz com que a falha de uma parte não derrube todo o sistema.", true, "É o principal motivo de usar mensageria."),
      m("Qual serviço roteia eventos por regras e também agenda tarefas?", ["Amazon EventBridge", "Amazon SQS", "AWS CloudTrail", "Amazon RDS"], 0, "EventBridge é o barramento de eventos.")
    ]
  },
  {
    id: "serverless", secao: S4, titulo: "Serverless e AWS Lambda",
    teoria: `
      <p><b>Serverless</b> (“sem servidor”) não significa que não há servidores: significa que <b>você não os gerencia</b>. A AWS cuida de máquinas, sistema operacional, escala e disponibilidade; você só escreve o código.</p>
      <h3>AWS Lambda</h3>
      <ul>
        <li>Você envia uma <b>função</b> (Python, Node.js, Java, Go…);</li>
        <li>Ela roda quando um <b>gatilho</b> acontece: requisição HTTP (API Gateway), arquivo no S3, mensagem no SQS, horário agendado…;</li>
        <li>Escala sozinha de zero a milhares de execuções;</li>
        <li>Cobra por <b>número de execuções</b> e <b>tempo de execução</b> (em milissegundos). Sem uso, sem custo;</li>
        <li>Cada execução pode durar até <b>15 minutos</b>.</li>
      </ul>
      <!--pratica-->
      <pre><code># Exemplo de função Lambda em Python
def lambda_handler(event, context):
    nome = event.get("nome", "mundo")
    return {"statusCode": 200, "body": f"Olá, {nome}!"}</code></pre>
      <p>💼 Usos comuns: redimensionar fotos enviadas ao S3, APIs simples, automações e integrações.</p>`,
    perguntas: [
      m("Qual o tempo máximo de uma execução do AWS Lambda?", ["15 minutos", "1 minuto", "1 hora", "Ilimitado"], 0, "Tarefas mais longas devem usar outro serviço (ex.: ECS/Fargate)."),
      vf("Em serverless, você não gerencia servidores, mas eles continuam existindo.", true, "A AWS cuida deles para você."),
      m("Como o Lambda é cobrado?", ["Por número de execuções e tempo de execução", "Por servidor por mês", "Por usuário cadastrado", "Valor fixo anual"], 0, "Sem execuções, sem custo.")
    ]
  },
  {
    id: "containers", secao: S4, titulo: "Contêineres: ECS, EKS e Fargate",
    teoria: `
      <p>Um <b>contêiner</b> empacota a aplicação com tudo que ela precisa (bibliotecas, configurações). Assim ela roda igual no computador do desenvolvedor, no teste e na produção. A ferramenta mais famosa é o <b>Docker</b>.</p>
      <p>Com muitos contêineres, é preciso um <b>orquestrador</b> que os inicia, reinicia, escala e distribui:</p>
      <ul>
        <li><b>Amazon ECS</b> (<i>Elastic Container Service</i>): orquestrador da própria AWS, mais simples;</li>
        <li><b>Amazon EKS</b> (<i>Elastic Kubernetes Service</i>): Kubernetes gerenciado, o padrão de mercado, open source;</li>
        <li><b>Amazon ECR</b>: repositório para guardar as imagens dos contêineres.</li>
      </ul>
      <!--pratica-->
      <h3>Onde os contêineres rodam?</h3>
      <ul>
        <li>Em <b>instâncias EC2</b> que você gerencia; ou</li>
        <li>No <b>AWS Fargate</b>: motor <b>serverless</b> para contêineres; você não gerencia máquinas, só define CPU e memória de cada tarefa. Funciona com ECS e EKS.</li>
      </ul>`,
    perguntas: [
      m("Qual serviço oferece Kubernetes gerenciado?", ["Amazon EKS", "Amazon ECS", "AWS Fargate", "Amazon ECR"], 0, "EKS = *Elastic Kubernetes Service*."),
      m("Qual opção roda contêineres sem você gerenciar servidores?", ["AWS Fargate", "Amazon EC2", "Hosts dedicados", "AWS Outposts"], 0, "Fargate é serverless para contêineres."),
      vf("Um contêiner empacota a aplicação com suas dependências.", true, "Por isso ela roda igual em qualquer ambiente.")
    ]
  },
  {
    id: "outros-compute", secao: S4, titulo: "Outros serviços de computação",
    teoria: `
      <ul>
        <li><b>AWS Elastic Beanstalk</b>: você envia o código e ele cria e gerencia a infraestrutura (EC2, balanceador, Auto Scaling) para você (PaaS);</li>
        <li><b>Amazon Lightsail</b>: servidores virtuais simples com preço fixo mensal, para sites e apps pequenos;</li>
        <li><b>AWS Batch</b>: roda grandes volumes de tarefas em lote;</li>
        <li><b>AWS Outposts</b>: leva hardware e serviços AWS para dentro do data center do cliente (nuvem híbrida);</li>
        <li><b>AWS App Runner</b>: publica apps web e APIs em contêiner com poucos cliques.</li>
      </ul>
      <!--pratica-->
      <p>💡 Regra de bolso: quanto mais controle você quer (EC2), mais trabalho de gestão; quanto menos gestão (Lambda, Fargate, Beanstalk), menos controle fino.</p>`,
    perguntas: [
      m("Qual serviço oferece servidores simples com **preço fixo mensal**?", ["Amazon Lightsail", "Amazon EC2 Spot", "AWS Batch", "AWS Outposts"], 0, "Lightsail é a opção “simplificada”."),
      m("Qual serviço leva a infraestrutura AWS para o data center do cliente?", ["AWS Outposts", "AWS Lambda", "Amazon Lightsail", "Amazon ECR"], 0, "Outposts = AWS dentro da sua empresa.")
    ]
  },
  {
    id: "global", secao: S5, titulo: "Regiões, Zonas de Disponibilidade e locais de borda",
    teoria: `
      <h3>Regiões</h3>
      <p>Uma <b>região</b> é uma área geográfica com vários data centers (ex.: <code>sa-east-1</code> = São Paulo, <code>us-east-1</code> = Norte da Virgínia). Os dados <b>não saem</b> da região sem você mandar. Para escolher, considere:</p>
      <ol>
        <li><b>Leis e conformidade</b> (dados que precisam ficar no país, como pede a LGPD em alguns casos);</li>
        <li><b>Proximidade</b> dos clientes (menor latência);</li>
        <li><b>Serviços disponíveis</b> (nem todo serviço novo está em todas as regiões);</li>
        <li><b>Preço</b> (varia de região para região).</li>
      </ol>
      <!--pratica-->
      <h3>Zonas de Disponibilidade (AZs)</h3>
      <p>Cada região tem <b>várias AZs</b> (normalmente 3 ou mais): um ou mais data centers isolados, com energia e rede próprias, a dezenas de km uns dos outros. Rodar a aplicação em <b>pelo menos duas AZs</b> garante <b>alta disponibilidade</b>: se uma cair, a outra continua.</p>
      <h3>Locais de borda (edge locations)</h3>
      <p>Pontos espalhados pelo mundo (centenas, mais que as regiões) que guardam cópias de conteúdo <b>perto dos usuários</b>. São usados pelo <b>Amazon CloudFront</b> (CDN) e pelo <b>Route 53</b> (DNS).</p>`,
    perguntas: [
      m("O que é uma Zona de Disponibilidade?", ["Um ou mais data centers isolados dentro de uma região", "Um país onde a AWS atua", "Um ponto de cache do CloudFront", "Uma conta AWS"], 0, "Várias AZs formam uma região."),
      m("Qual destes **não** é um critério para escolher a região?", ["A cor do console", "Leis de proteção de dados", "Proximidade dos clientes", "Preço"], 0, "Os 4 critérios: conformidade, proximidade, serviços e preço."),
      vf("Para alta disponibilidade, recomenda-se usar pelo menos duas Zonas de Disponibilidade.", true, "Se uma AZ falhar, a outra continua atendendo."),
      m("Os locais de borda são usados principalmente pelo…", ["Amazon CloudFront", "Amazon RDS", "AWS Batch", "Amazon EBS"], 0, "CloudFront é a CDN que entrega conteúdo perto do usuário.")
    ]
  },
  {
    id: "provisionar", secao: S5, titulo: "Como acessar e provisionar: Console, CLI, SDK, Beanstalk e CloudFormation",
    teoria: `
      <p>Toda ação na AWS é uma chamada de <b>API</b>. Você pode fazer essas chamadas de várias formas:</p>
      <ul>
        <li><b>Console de Gerenciamento</b>: site com telas e botões. Ótimo para aprender e para tarefas pontuais. Há também o app para celular;</li>
        <li><b>AWS CLI</b>: linha de comando (<code>aws s3 ls</code>), boa para automatizar com scripts;</li>
        <li><b>SDKs</b>: bibliotecas para programas (Python <code>boto3</code>, JavaScript, Java…).</li>
      </ul>
      <!--pratica-->
      <h3>Provisionamento gerenciado</h3>
      <ul>
        <li><b>AWS Elastic Beanstalk</b>: envie o código; ele monta a infraestrutura (capacidade, balanceador, escala, monitoramento) e você mantém o controle das configurações;</li>
        <li><b>AWS CloudFormation</b>: <b>infraestrutura como código</b> (IaC). Você descreve os recursos num arquivo (JSON/YAML, um <i>template</i>) e ele cria tudo, sempre do mesmo jeito, em qualquer conta ou região. Alternativas: AWS CDK e Terraform.</li>
      </ul>
      <pre><code># trecho de template CloudFormation (YAML)
Resources:
  MeuBucket:
    Type: AWS::S3::Bucket</code></pre>`,
    perguntas: [
      m("Qual serviço cria infraestrutura a partir de um arquivo de template (infraestrutura como código)?", ["AWS CloudFormation", "AWS Elastic Beanstalk", "Amazon CloudWatch", "AWS Config"], 0, "Templates JSON/YAML descrevem os recursos."),
      m("Qual é a ferramenta de linha de comando da AWS?", ["AWS CLI", "AWS SDK", "Console", "CloudShell Desktop"], 0, "Ex.: `aws s3 ls`."),
      l("Complete o nome do SDK da AWS para Python:", "import ____", ["boto3"], "O `boto3` é o SDK oficial para Python.")
    ]
  }
];
