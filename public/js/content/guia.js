// Guia "Como pesquisar quando não souber" — conteúdo estático confiável.
export const GUIA_PESQUISA = [
  {
    titulo: "1. Leia a mensagem de erro (de verdade)",
    crianca: "O erro não é bronca, é uma <b>pista do detetive</b>. Ele diz o que aconteceu e, quase sempre, em que linha.",
    html: `<ul>
      <li>Procure <b>o tipo do erro</b> (ex.: <code>TypeError</code>, <code>NullPointerException</code>, <code>SyntaxError</code>) e <b>o arquivo:linha</b>.</li>
      <li>No <i>stack trace</i> (a lista enorme), comece pela <b>primeira linha que é do SEU código</b>, não das bibliotecas.</li>
      <li>Traduza: “Cannot read properties of undefined (reading 'nome')” = “você tentou pegar <code>.nome</code> de algo que está vazio”.</li>
    </ul>`
  },
  {
    titulo: "2. Pesquise do jeito certo no Google",
    crianca: "Pergunte como um <b>bibliotecário</b> entenderia: poucas palavras, as mais importantes.",
    html: `<ol>
      <li>Formato campeão: <b>linguagem + o que quer fazer + palavra-chave</b>. Ex.: <code>python ler excel pandas</code>, <code>react input controlado</code>.</li>
      <li>Para erros, copie a mensagem <b>entre aspas</b>, sem seus nomes de variáveis: <code>"Cannot read properties of undefined" react</code>.</li>
      <li>Pesquise em <b>inglês</b> quando o português não ajudar: há 10× mais conteúdo.</li>
      <li>Filtre por data (Ferramentas → Último ano) em assuntos que mudam rápido (React, Next, Spring).</li>
      <li>Use <code>site:</code> para focar: <code>site:stackoverflow.com mysql timestampdiff</code>, <code>site:developer.mozilla.org fetch</code>.</li>
    </ol>`
  },
  {
    titulo: "3. Prefira fontes confiáveis",
    html: `<ul>
      <li><b>Documentação oficial</b> primeiro (MDN, docs.python.org, learn.microsoft.com, dev.java, go.dev, dev.mysql.com). Os links de cada trilha estão no final da página dela.</li>
      <li><b>Stack Overflow</b>: veja a resposta aceita <i>e</i> a mais votada, e confira a data. Respostas de 2012 podem estar desatualizadas.</li>
      <li><b>GitHub Issues</b> da biblioteca: ótimo para bugs de versões específicas.</li>
      <li>Blogs e vídeos ajudam a entender, mas confirme na documentação antes de colocar em produção.</li>
    </ul>`
  },
  {
    titulo: "4. Use IA como colega, não como muleta",
    crianca: "A IA é um <b>amigo que sabe muito, mas às vezes inventa</b>. Pergunte, mas confira.",
    html: `<ul>
      <li>Dê <b>contexto</b>: linguagem, versão, o que tentou, o erro completo e o trecho de código relevante.</li>
      <li>Peça para <b>explicar</b> a solução, não só para dar o código. Se não entendeu, não cole.</li>
      <li>Nunca cole <b>senhas, chaves de API, dados de clientes ou código confidencial</b> da empresa em ferramentas externas sem autorização.</li>
      <li>Teste sempre: a IA pode citar funções que não existem.</li>
    </ul>`
  },
  {
    titulo: "5. Isole o problema (o método do detetive)",
    html: `<ol>
      <li><b>Reproduza</b>: consiga fazer o erro acontecer de propósito.</li>
      <li><b>Diminua</b>: tire tudo o que não importa até sobrar o mínimo que ainda quebra.</li>
      <li><b>Observe</b>: use <code>print</code>/<code>console.log</code>, o debugger do editor (breakpoints) e o DevTools (F12).</li>
      <li><b>Mude uma coisa por vez</b> e teste.</li>
      <li>Travou mais de 30-40 minutos? <b>Peça ajuda</b> mostrando o que já tentou. Isso é valorizado, não é fraqueza.</li>
    </ol>`
  },
  {
    titulo: "6. Na entrevista: “não sei” do jeito certo",
    html: `<p>Ninguém espera que você saiba tudo. Uma boa resposta quando não souber:</p>
    <p class="kid-inline">“Não trabalhei com isso ainda, mas eu começaria pela documentação oficial de X, procuraria um exemplo mínimo, testaria localmente e validaria com o time. Já fiz algo parecido quando…”</p>
    <p>Isso mostra <b>autonomia</b>, que é o que as empresas mais procuram em júnior e pleno.</p>`
  },
  {
    titulo: "📌 Cola rápida de termos de busca",
    html: `<ul>
      <li><code>[linguagem] cheat sheet</code>: resumo de uma página com a sintaxe.</li>
      <li><code>[erro] stack overflow</code>: quem já passou pelo mesmo.</li>
      <li><code>[tecnologia] best practices</code>: boas práticas.</li>
      <li><code>[A] vs [B]</code>: comparação para escolher (ex.: <code>flexbox vs grid</code>).</li>
      <li><code>[tecnologia] interview questions</code>: perguntas de entrevista para treinar.</li>
      <li><code>how to [tarefa] in [linguagem]</code>: o formato mais universal.</li>
    </ul>`
  }
];
