// AWS de A a Z — Parte 3: segurança, monitoramento e governança, preços e suporte,
// migração, Well-Architected e preparação para a prova.
import { m, vf, l } from "../extras/q.js";

const S10 = "10. Segurança";
const S11 = "11. Monitoramento e governança";
const S12 = "12. Preços e suporte";
const S13 = "13. Migração";
const S14 = "14. Boas práticas e prova";

export default [
  {
    id: "responsabilidade", secao: S10, titulo: "Modelo de responsabilidade compartilhada",
    teoria: `
      <p>Na nuvem, a segurança é <b>dividida</b> entre a AWS e o cliente:</p>
      <ul>
        <li><b>AWS: segurança DA nuvem</b>: data centers físicos, hardware, rede global, a camada de virtualização e a infraestrutura dos serviços gerenciados;</li>
        <li><b>Cliente: segurança NA nuvem</b>: seus dados, quem tem acesso (IAM), configuração de firewalls e grupos de segurança, criptografia, sistema operacional e aplicativos das instâncias EC2.</li>
      </ul>
      <!--pratica-->
      <p>A divisão muda conforme o serviço: no <b>EC2</b> (IaaS) você cuida do sistema operacional; no <b>RDS</b> ou no <b>Lambda</b> (gerenciados), a AWS cuida dele e você cuida dos dados e dos acessos. Em qualquer caso, os <b>dados</b> e as <b>permissões</b> são sempre responsabilidade do cliente.</p>`,
    perguntas: [
      m("Quem é responsável pela segurança física dos data centers?", ["A AWS", "O cliente", "Os dois igualmente", "O governo"], 0, "É a “segurança DA nuvem”."),
      m("Quem aplica atualizações de segurança no sistema operacional de uma instância EC2?", ["O cliente", "A AWS", "O AWS Support", "Ninguém"], 0, "No EC2 (IaaS), o sistema operacional é do cliente."),
      vf("Os dados guardados na AWS e quem pode acessá-los são sempre responsabilidade do cliente.", true, "Isso vale para todos os serviços.")
    ]
  },
  {
    id: "iam", secao: S10, titulo: "Acesso de usuários: IAM, MFA e Organizations",
    teoria: `
      <h3>Usuário raiz (root)</h3>
      <p>O e-mail que criou a conta tem acesso <b>total</b>. Boas práticas: ligar <b>MFA</b> (autenticação em dois fatores), não usar no dia a dia e criar outros acessos para as tarefas.</p>
      <h3>AWS IAM (Identity and Access Management)</h3>
      <ul>
        <li><b>Usuários</b>: pessoas ou aplicações, com credenciais próprias;</li>
        <li><b>Grupos</b>: conjuntos de usuários com as mesmas permissões (ex.: “Financeiro”);</li>
        <li><b>Políticas</b>: documentos JSON que <b>permitem</b> ou <b>negam</b> ações em recursos;</li>
        <li><b>Funções (roles)</b>: permissões <b>temporárias</b> assumidas por serviços (ex.: uma EC2 que lê o S3) ou pessoas.</li>
      </ul>
      <!--pratica-->
      <p>Princípio do <b>privilégio mínimo</b>: dê só as permissões necessárias para a tarefa, nada além. Para muitas contas e acesso único (SSO), use o <b>IAM Identity Center</b>.</p>
      <pre><code>{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::relatorios/*"
}</code></pre>
      <h3>AWS Organizations</h3>
      <p>Gerencia <b>várias contas</b> num só lugar: agrupa em <b>unidades organizacionais (OUs)</b>, centraliza a cobrança (<b>faturamento consolidado</b>) e aplica <b>SCPs</b> (políticas de controle de serviço) que limitam o que cada conta pode fazer.</p>`,
    perguntas: [
      m("Qual é a recomendação para o usuário raiz (root)?", ["Ativar MFA e não usar no dia a dia", "Compartilhar com a equipe", "Usar para todas as tarefas", "Apagar a conta raiz"], 0, "Crie acessos IAM para o trabalho diário."),
      m("Uma instância EC2 precisa ler arquivos do S3. O jeito recomendado é…", ["Atribuir uma função (role) do IAM", "Gravar a senha do root na instância", "Deixar o bucket público", "Criar um usuário IAM e colar a chave no código"], 0, "Roles dão credenciais temporárias, sem chaves fixas no código."),
      l("Complete o princípio de segurança: dar só as permissões necessárias é o princípio do privilégio ____.", "privilégio ____", ["mínimo", "minimo"], "*Least privilege*: o mínimo necessário."),
      m("Qual serviço gerencia várias contas e aplica SCPs?", ["AWS Organizations", "AWS IAM", "Amazon Inspector", "AWS Artifact"], 0, "SCPs limitam as ações das contas da organização.")
    ]
  },
  {
    id: "protecao", secao: S10, titulo: "Proteção de rede e de dados",
    teoria: `
      <h3>Rede e aplicações</h3>
      <ul>
        <li><b>AWS Shield</b>: proteção contra ataques <b>DDoS</b> (Standard grátis e automático; Advanced pago, com equipe de resposta);</li>
        <li><b>AWS WAF</b>: firewall de aplicações web; bloqueia SQL Injection, XSS, IPs e países;</li>
        <li><b>AWS Network Firewall</b> e <b>AWS Firewall Manager</b>: firewall de rede e gestão central das regras.</li>
      </ul>
      <!--pratica-->
      <h3>Dados</h3>
      <ul>
        <li><b>Criptografia em repouso</b> (dados guardados) e <b>em trânsito</b> (TLS/HTTPS);</li>
        <li><b>AWS KMS</b>: cria e gerencia chaves de criptografia (e o <b>CloudHSM</b>, hardware dedicado);</li>
        <li><b>AWS Secrets Manager</b>: guarda e troca senhas e chaves de API;</li>
        <li><b>AWS Certificate Manager</b>: certificados SSL/TLS grátis para HTTPS;</li>
        <li><b>Amazon Macie</b>: encontra dados sensíveis (CPF, cartões) no S3.</li>
      </ul>`,
    perguntas: [
      m("Qual serviço protege contra ataques DDoS?", ["AWS Shield", "AWS KMS", "Amazon Macie", "AWS Artifact"], 0, "Shield Standard já vem ligado sem custo."),
      m("Qual serviço gerencia chaves de criptografia?", ["AWS KMS", "AWS WAF", "Amazon Inspector", "AWS Shield"], 0, "*Key Management Service*."),
      m("Para bloquear tentativas de SQL Injection num site, use…", ["AWS WAF", "AWS Shield Standard", "Amazon EBS", "AWS DMS"], 0, "WAF filtra requisições web maliciosas.")
    ]
  },
  {
    id: "deteccao", secao: S10, titulo: "Detecção e resposta",
    teoria: `
      <ul>
        <li><b>Amazon GuardDuty</b>: detecção de <b>ameaças</b> com inteligência artificial, analisando logs de rede, DNS e atividade da conta (ex.: acesso de IP suspeito, mineração de criptomoedas);</li>
        <li><b>Amazon Inspector</b>: varre instâncias EC2, contêineres e Lambdas em busca de <b>vulnerabilidades</b> de software e exposição de rede;</li>
        <li><b>AWS Security Hub</b>: painel central que junta os alertas de segurança e confere as boas práticas;</li>
        <li><b>Amazon Detective</b>: ajuda a <b>investigar</b> a causa de um incidente;</li>
        <li><b>AWS Config</b>: registra mudanças de configuração e confere se os recursos seguem as regras.</li>
      </ul>
      <!--pratica-->`,
    perguntas: [
      m("Qual serviço detecta ameaças analisando logs e atividade da conta?", ["Amazon GuardDuty", "Amazon Inspector", "AWS Config", "AWS Budgets"], 0, "GuardDuty = detecção contínua de ameaças."),
      m("Qual serviço procura **vulnerabilidades** de software nas instâncias?", ["Amazon Inspector", "Amazon GuardDuty", "AWS Shield", "Amazon Macie"], 0, "Inspector faz avaliações de vulnerabilidade.")
    ]
  },
  {
    id: "monitoramento", secao: S11, titulo: "Monitoramento: CloudWatch e CloudTrail",
    teoria: `
      <h3>Amazon CloudWatch</h3>
      <p>Monitora <b>desempenho e saúde</b>: coleta <b>métricas</b> (CPU, memória, requisições), <b>logs</b> e mostra em <b>painéis</b>. Com <b>alarmes</b>, avisa (por SNS) ou age sozinho (ex.: acionar o Auto Scaling quando a CPU passar de 80%).</p>
      <h3>AWS CloudTrail</h3>
      <p>Registra <b>quem fez o quê, quando e de onde</b>: todas as chamadas de API na conta (ex.: “o usuário Ana apagou o bucket X às 14h, do IP Y”). É essencial para <b>auditoria</b> e investigação. O <b>CloudTrail Insights</b> aponta atividade fora do normal.</p>
      <!--pratica-->
      <p>💡 Para lembrar: <b>CloudWatch</b> = “como está o desempenho?”; <b>CloudTrail</b> = “quem fez isso?”.</p>`,
    perguntas: [
      m("Qual serviço responde “quem apagou este recurso e quando?”", ["AWS CloudTrail", "Amazon CloudWatch", "AWS Trusted Advisor", "AWS Health"], 0, "CloudTrail registra as chamadas de API."),
      m("Para receber um alerta quando a CPU passar de 80%, use…", ["um alarme do Amazon CloudWatch", "o AWS CloudTrail", "o AWS Artifact", "o AWS Pricing Calculator"], 0, "Alarmes do CloudWatch observam métricas."),
      vf("O CloudWatch coleta métricas, logs e permite criar painéis.", true, "É o serviço de observabilidade da AWS.")
    ]
  },
  {
    id: "governanca", secao: S11, titulo: "Conformidade, auditoria e governança",
    teoria: `
      <ul>
        <li><b>AWS Artifact</b>: acesso a relatórios de <b>conformidade</b> da AWS (ISO, SOC, PCI) e a acordos legais;</li>
        <li><b>AWS Audit Manager</b>: ajuda a juntar evidências para auditorias;</li>
        <li><b>AWS Config</b>: histórico de configurações e regras de conformidade;</li>
        <li><b>AWS Control Tower</b>: monta um ambiente com várias contas já seguindo boas práticas (<i>landing zone</i>), com <i>guardrails</i>;</li>
        <li><b>AWS Service Catalog</b>: catálogo de recursos aprovados que as equipes podem usar;</li>
        <li><b>AWS Health Dashboard</b>: avisa sobre eventos da AWS que afetam os seus recursos (manutenções, falhas);</li>
        <li><b>AWS Trusted Advisor</b>: recomendações automáticas em 5 áreas: <b>custo</b>, <b>desempenho</b>, <b>segurança</b>, <b>tolerância a falhas</b> e <b>limites de serviço</b> (ex.: “este bucket está público”, “esta instância está ociosa”).</li>
      </ul>
      <!--pratica-->`,
    perguntas: [
      m("Onde baixar relatórios de conformidade (ISO, SOC) da AWS?", ["AWS Artifact", "AWS Trusted Advisor", "AWS Config", "Amazon CloudWatch"], 0, "Artifact é o portal de documentos de conformidade."),
      m("Qual serviço dá recomendações de custo, segurança, desempenho, tolerância a falhas e limites?", ["AWS Trusted Advisor", "AWS Health", "AWS Artifact", "AWS Organizations"], 0, "São as 5 categorias do Trusted Advisor."),
      m("Qual serviço avisa sobre eventos da própria AWS que afetam seus recursos?", ["AWS Health Dashboard", "AWS CloudTrail", "Amazon Inspector", "AWS WAF"], 0, "Ele mostra manutenções e incidentes que impactam você.")
    ]
  },
  {
    id: "precos", secao: S12, titulo: "Free Tier e conceitos de preço",
    teoria: `
      <h3>AWS Free Tier</h3>
      <ul>
        <li><b>Sempre grátis</b>: limites que não expiram (ex.: 1 milhão de execuções do Lambda por mês);</li>
        <li><b>12 meses grátis</b> (contas mais antigas) ou <b>créditos</b> para contas novas, conforme as regras atuais da AWS;</li>
        <li><b>Testes gratuitos</b> de curto prazo para alguns serviços.</li>
      </ul>
      <p>⚠️ Sempre confira as condições vigentes no site da AWS e configure alertas de gasto.</p>
      <!--pratica-->
      <h3>Como a AWS cobra</h3>
      <ul>
        <li><b>Pague pelo uso</b>;</li>
        <li><b>Pague menos ao reservar</b> (Savings Plans, instâncias reservadas);</li>
        <li><b>Pague menos usando mais</b> (descontos por volume, como no S3);</li>
        <li>Em geral, a <b>entrada</b> de dados na AWS é grátis; a <b>saída</b> para a internet é cobrada.</li>
      </ul>
      <p>O <b>AWS Pricing Calculator</b> estima o custo antes de criar os recursos.</p>`,
    perguntas: [
      m("Qual ferramenta estima o custo de uma arquitetura **antes** de criá-la?", ["AWS Pricing Calculator", "AWS Cost Explorer", "AWS Budgets", "AWS Artifact"], 0, "O Cost Explorer analisa o que já foi gasto."),
      vf("Na AWS, em geral, a transferência de dados para **dentro** da nuvem é gratuita.", true, "A saída para a internet é que costuma ser cobrada."),
      m("“Pague menos usando mais” se refere a…", ["descontos por volume", "Free Tier", "instâncias Spot", "suporte Enterprise"], 0, "Quanto mais você usa (ex.: S3), menor o preço por unidade.")
    ]
  },
  {
    id: "faturamento", secao: S12, titulo: "Faturamento, planos de suporte e Marketplace",
    teoria: `
      <h3>Ferramentas de cobrança</h3>
      <ul>
        <li><b>Billing Dashboard</b>: fatura do mês e gasto por serviço;</li>
        <li><b>AWS Cost Explorer</b>: gráficos do gasto passado e previsão;</li>
        <li><b>AWS Budgets</b>: limites de gasto com alertas;</li>
        <li><b>Cost and Usage Report</b>: relatório detalhado;</li>
        <li><b>Faturamento consolidado</b> (Organizations): uma fatura para várias contas, somando o uso para ganhar descontos por volume;</li>
        <li><b>Tags de alocação de custo</b>: etiquetas (ex.: <code>projeto=loja</code>) para saber quanto cada área gasta.</li>
      </ul>
      <!--pratica-->
      <h3>Planos de suporte</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Plano</th><th>Destaques</th></tr></thead><tbody>
        <tr><td><b>Basic</b></td><td>grátis: documentação, fóruns, Health Dashboard, verificações básicas do Trusted Advisor</td></tr>
        <tr><td><b>Developer</b></td><td>suporte técnico por e-mail em horário comercial</td></tr>
        <tr><td><b>Business</b></td><td>24/7 por telefone, chat e e-mail; Trusted Advisor completo</td></tr>
        <tr><td><b>Enterprise On-Ramp</b></td><td>tudo do Business + pool de gerentes técnicos (TAMs)</td></tr>
        <tr><td><b>Enterprise</b></td><td><b>TAM dedicado</b>, resposta em até 15 min para sistemas críticos</td></tr>
      </tbody></table>
      <h3>AWS Marketplace</h3>
      <p>Catálogo de softwares de terceiros (firewalls, bancos, ferramentas de dados) prontos para rodar na AWS, cobrados na mesma fatura.</p>`,
    perguntas: [
      m("Qual plano de suporte oferece um gerente técnico (TAM) **dedicado**?", ["Enterprise", "Business", "Developer", "Basic"], 0, "No Enterprise On-Ramp o TAM é de um grupo; no Enterprise é dedicado."),
      m("Qual ferramenta mostra gráficos do gasto passado e previsões?", ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS Marketplace", "AWS Artifact"], 0, "Cost Explorer analisa e prevê gastos."),
      m("Onde comprar softwares de terceiros prontos para a AWS?", ["AWS Marketplace", "AWS Artifact", "AWS Organizations", "Amazon ECR"], 0, "O Marketplace é a loja de softwares."),
      vf("O plano de suporte Basic é gratuito.", true, "Todo cliente tem o Basic.")
    ]
  },
  {
    id: "otimizar-custos", secao: S12, titulo: "Otimização de custos",
    teoria: `
      <ul>
        <li><b>Dimensionamento correto (right-sizing)</b>: use o tamanho de instância que você precisa (o <b>AWS Compute Optimizer</b> recomenda);</li>
        <li><b>Desligue o que não usa</b>: ambientes de teste fora do horário, instâncias ociosas, volumes e IPs esquecidos;</li>
        <li><b>Escolha o modelo de compra certo</b>: Savings Plans/reservadas para uso constante, Spot para tarefas interrompíveis;</li>
        <li><b>Classes de armazenamento</b>: mova dados frios para S3 IA/Glacier com regras de ciclo de vida;</li>
        <li><b>Serverless e gerenciados</b>: pague só pelo uso e não pelo servidor parado;</li>
        <li><b>Acompanhe</b>: Budgets, Cost Explorer, tags e Trusted Advisor.</li>
      </ul>
      <!--pratica-->`,
    perguntas: [
      m("Uma instância usa 5% de CPU o tempo todo. A melhor ação para economizar é…", ["Reduzir o tamanho (right-sizing)", "Comprar uma maior", "Mudar para Hosts dedicados", "Ligar o Shield Advanced"], 0, "Ajuste o tamanho à necessidade real."),
      vf("Mover arquivos antigos para o S3 Glacier pode reduzir custos.", true, "As classes de arquivamento são bem mais baratas.")
    ]
  },
  {
    id: "migracao", secao: S13, titulo: "AWS CAF e as estratégias de migração (7 Rs)",
    teoria: `
      <h3>AWS Cloud Adoption Framework (CAF)</h3>
      <p>Guia para planejar a adoção da nuvem, organizado em <b>6 perspectivas</b>: <b>Negócios</b>, <b>Pessoas</b> e <b>Governança</b> (foco no negócio) e <b>Plataforma</b>, <b>Segurança</b> e <b>Operações</b> (foco técnico).</p>
      <!--pratica-->
      <h3>Os 7 Rs da migração</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Estratégia</th><th>O que é</th></tr></thead><tbody>
        <tr><td><b>Rehost</b> (“lift and shift”)</td><td>mover como está, sem mudar</td></tr>
        <tr><td><b>Replatform</b> (“lift, tinker and shift”)</td><td>pequenos ajustes (ex.: banco próprio → RDS)</td></tr>
        <tr><td><b>Refactor / Re-architect</b></td><td>reescrever para aproveitar a nuvem (ex.: serverless)</td></tr>
        <tr><td><b>Repurchase</b></td><td>trocar por um SaaS (ex.: CRM próprio → Salesforce)</td></tr>
        <tr><td><b>Retain</b></td><td>manter onde está por enquanto</td></tr>
        <tr><td><b>Retire</b></td><td>desligar o que não é mais usado</td></tr>
        <tr><td><b>Relocate</b></td><td>mover de uma vez (ex.: VMware para o VMware Cloud on AWS)</td></tr>
      </tbody></table>`,
    perguntas: [
      m("Mover um servidor para a AWS **sem nenhuma mudança** é…", ["Rehost", "Refactor", "Repurchase", "Retire"], 0, "*Lift and shift*."),
      m("Trocar um sistema próprio por um software SaaS é…", ["Repurchase", "Retain", "Replatform", "Rehost"], 0, "Recomprar uma solução pronta."),
      m("Qual destas é uma perspectiva **técnica** do AWS CAF?", ["Segurança", "Pessoas", "Negócios", "Governança"], 0, "As técnicas são Plataforma, Segurança e Operações.")
    ]
  },
  {
    id: "servicos-migracao", secao: S13, titulo: "Serviços de migração e transferência de dados",
    teoria: `
      <ul>
        <li><b>AWS Application Migration Service (MGN)</b>: replica servidores para a AWS (rehost) com pouca parada;</li>
        <li><b>AWS Migration Hub</b>: acompanha todas as migrações num só lugar;</li>
        <li><b>AWS Application Discovery Service</b>: levanta os servidores e dependências do data center;</li>
        <li><b>AWS DMS</b> + <b>Schema Conversion Tool</b>: migração de bancos de dados.</li>
      </ul>
      <h3>Transferência online</h3>
      <p><b>AWS DataSync</b> (copia arquivos pela rede, automatizado), <b>AWS Transfer Family</b> (SFTP/FTP para o S3) e <b>Direct Connect</b> (link dedicado).</p>
      <!--pratica-->
      <h3>Transferência offline: família Snow</h3>
      <p>Quando há <b>muitos dados</b> e a internet levaria meses, a AWS envia um <b>dispositivo físico</b>: você copia os dados e devolve pelo correio.</p>
      <ul>
        <li><b>AWS Snowcone</b>: pequeno e portátil (terabytes);</li>
        <li><b>AWS Snowball Edge</b>: maleta robusta (dezenas de TB), com opção de processamento local;</li>
        <li>Para volumes de <b>petabytes a exabytes</b>, a AWS oferece opções de transferência em grande escala com vários dispositivos.</li>
      </ul>`,
    perguntas: [
      m("Uma empresa precisa mover 80 TB e a internet dela é lenta. A opção indicada é…", ["AWS Snowball Edge", "AWS DataSync pela internet", "Amazon Route 53", "AWS Lambda"], 0, "Dispositivos Snow fazem a transferência offline."),
      m("Qual serviço migra servidores para a AWS no modelo rehost?", ["AWS Application Migration Service", "AWS Artifact", "Amazon Athena", "AWS Budgets"], 0, "O MGN replica os servidores continuamente.")
    ]
  },
  {
    id: "well-architected", secao: S14, titulo: "AWS Well-Architected Framework",
    teoria: `
      <p>O <b>Well-Architected Framework</b> reúne as boas práticas da AWS para construir sistemas seguros, confiáveis e eficientes, em <b>6 pilares</b>:</p>
      <ol>
        <li><b>Excelência operacional</b>: automatizar, monitorar e melhorar continuamente (ex.: infraestrutura como código);</li>
        <li><b>Segurança</b>: proteger dados e sistemas (privilégio mínimo, criptografia, rastreabilidade);</li>
        <li><b>Confiabilidade</b>: recuperar-se de falhas e atender à demanda (várias AZs, backups, Auto Scaling);</li>
        <li><b>Eficiência de desempenho</b>: usar os recursos certos, do jeito certo (serverless, tipos de instância adequados);</li>
        <li><b>Otimização de custos</b>: evitar gastos desnecessários;</li>
        <li><b>Sustentabilidade</b>: reduzir o impacto ambiental (usar só o necessário, regiões com energia mais limpa).</li>
      </ol>
      <!--pratica-->
      <p>A ferramenta gratuita <b>AWS Well-Architected Tool</b>, no console, revisa sua arquitetura com perguntas sobre cada pilar.</p>
      <h3>Princípios de design</h3>
      <ul>
        <li>Projete para <b>falhar</b> (nada deve ser ponto único de falha);</li>
        <li><b>Desacople</b> componentes (filas, eventos);</li>
        <li>Prefira <b>escala horizontal</b> e automação;</li>
        <li>Trate servidores como descartáveis.</li>
      </ul>`,
    perguntas: [
      m("Quantos pilares tem o AWS Well-Architected Framework?", ["6", "5", "4", "7"], 0, "O 6º pilar, sustentabilidade, foi adicionado em 2021."),
      m("Usar várias Zonas de Disponibilidade e backups faz parte de qual pilar?", ["Confiabilidade", "Sustentabilidade", "Otimização de custos", "Excelência operacional"], 0, "Confiabilidade = recuperar-se de falhas."),
      vf("Projetar o sistema esperando que componentes falhem é uma boa prática da nuvem.", true, "*Design for failure*: elimine pontos únicos de falha.")
    ]
  },
  {
    id: "especializados", secao: S14, titulo: "Serviços especializados e casos de uso",
    teoria: `
      <ul>
        <li><b>IoT</b>: <b>AWS IoT Core</b> conecta milhões de dispositivos (sensores, máquinas);</li>
        <li><b>Desktops e apps virtuais</b>: <b>Amazon WorkSpaces</b> (computador na nuvem) e <b>AppStream 2.0</b>;</li>
        <li><b>Front-end e mobile</b>: <b>AWS Amplify</b> (sites e apps com back-end pronto), <b>Amazon API Gateway</b> (publicar APIs) e <b>Device Farm</b> (testes em celulares reais);</li>
        <li><b>Comunicação com clientes</b>: <b>Amazon Connect</b> (central de atendimento), <b>Amazon SES</b> (envio de e-mails), <b>Amazon Pinpoint</b>;</li>
        <li><b>Mídia</b>: <b>Elemental MediaConvert</b> (conversão de vídeo);</li>
        <li><b>Jogos</b>: <b>Amazon GameLift</b> (servidores de jogos);</li>
        <li><b>Blockchain</b>: <b>Amazon Managed Blockchain</b>;</li>
        <li><b>Ferramentas de desenvolvimento</b>: <b>CodeCommit/CodeBuild/CodeDeploy/CodePipeline</b> (CI/CD), <b>AWS Cloud9</b> e <b>CloudShell</b>, <b>X-Ray</b> (rastrear requisições);</li>
        <li><b>Integração de apps</b>: <b>Step Functions</b> (orquestra etapas e serviços em fluxos).</li>
      </ul>
      <!--pratica-->`,
    perguntas: [
      m("Qual serviço oferece computadores (desktops) virtuais na nuvem?", ["Amazon WorkSpaces", "Amazon Connect", "AWS Amplify", "AWS IoT Core"], 0, "WorkSpaces = desktop como serviço."),
      m("Qual serviço cria uma central de atendimento (call center) na nuvem?", ["Amazon Connect", "Amazon SES", "Amazon WorkSpaces", "AWS Step Functions"], 0, "Connect é o *contact center* da AWS."),
      m("Qual serviço envia e-mails em grande volume?", ["Amazon SES", "Amazon SNS", "Amazon SQS", "AWS Artifact"], 0, "*Simple Email Service*.")
    ]
  },
  {
    id: "prova", secao: S14, titulo: "Revisão final e dicas para a prova",
    teoria: `
      <h3>O que cai na Cloud Practitioner (CLF-C02)</h3>
      <table class="sqlp-tabela-teoria"><thead><tr><th>Domínio</th><th>Peso aprox.</th></tr></thead><tbody>
        <tr><td>Conceitos de nuvem</td><td>24%</td></tr>
        <tr><td>Segurança e conformidade</td><td>30%</td></tr>
        <tr><td>Tecnologia e serviços</td><td>34%</td></tr>
        <tr><td>Cobrança, preços e suporte</td><td>12%</td></tr>
      </tbody></table>
      <h3>Pares que mais confundem</h3>
      <ul>
        <li><b>CloudWatch</b> (desempenho) × <b>CloudTrail</b> (quem fez o quê);</li>
        <li><b>Security Group</b> (instância, stateful, só permitir) × <b>Network ACL</b> (sub-rede, stateless, permitir e negar);</li>
        <li><b>SQS</b> (fila) × <b>SNS</b> (pub/sub);</li>
        <li><b>RDS</b> (relacional) × <b>DynamoDB</b> (NoSQL) × <b>Redshift</b> (data warehouse);</li>
        <li><b>EBS</b> (bloco, 1 AZ) × <b>EFS</b> (arquivos compartilhados) × <b>S3</b> (objetos);</li>
        <li><b>Shield</b> (DDoS) × <b>WAF</b> (ataques web) × <b>GuardDuty</b> (ameaças) × <b>Inspector</b> (vulnerabilidades);</li>
        <li><b>Pricing Calculator</b> (antes) × <b>Cost Explorer</b> (depois) × <b>Budgets</b> (alertas).</li>
      </ul>
      <!--pratica-->
      <h3>Dicas</h3>
      <ul>
        <li>Leia a pergunta inteira e procure a palavra-chave (“mais barato”, “sem gerenciar servidores”, “auditoria”);</li>
        <li>Elimine as alternativas absurdas primeiro;</li>
        <li>Faça simulados (o AWS Skill Builder tem um gratuito) e revise o que errou;</li>
        <li>Não há penalidade por errar: responda todas.</li>
      </ul>`,
    perguntas: [
      m("Uma empresa quer **auditar** quem alterou um grupo de segurança. Qual serviço?", ["AWS CloudTrail", "Amazon CloudWatch", "AWS Trusted Advisor", "Amazon Inspector"], 0, "Auditoria de ações = CloudTrail."),
      m("Qual serviço é mais indicado para rodar código **sem gerenciar servidores**, por poucos segundos, a cada upload no S3?", ["AWS Lambda", "Amazon EC2 reservada", "Amazon Lightsail", "AWS Outposts"], 0, "Evento + código curto + serverless = Lambda."),
      m("Qual opção garante **alta disponibilidade** de uma aplicação web?", ["Instâncias em várias AZs atrás de um ELB", "Uma instância grande numa só AZ", "Instance store", "Uma VPN"], 0, "Várias AZs + balanceador = sem ponto único de falha."),
      m("Qual domínio tem o **maior peso** na prova?", ["Tecnologia e serviços", "Cobrança e preços", "Conceitos de nuvem", "Todos têm o mesmo peso"], 0, "Cerca de 34% das questões.")
    ]
  }
];
