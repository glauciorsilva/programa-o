// Helpers para escrever exercícios de fixação.
// Texto entre crases (`assim`) vira código na tela.

/** Múltipla escolha: `correta` é o índice (0, 1, 2...) da opção certa. */
export const m = (pergunta, opcoes, correta, explicacao, codigo) =>
  ({ tipo: "multipla", pergunta, opcoes, correta, explicacao, codigo });

/** Verdadeiro ou falso. */
export const vf = (afirmacao, verdadeira, explicacao, codigo) =>
  ({ tipo: "multipla", pergunta: "Verdadeiro ou falso: " + afirmacao, opcoes: ["Verdadeiro", "Falso"], correta: verdadeira ? 0 : 1, explicacao, codigo, fixa: true });

/** Complete a lacuna (____) do código. `respostas` lista as respostas aceitas. */
export const l = (pergunta, codigo, respostas, explicacao, ci = false) =>
  ({ tipo: "lacuna", pergunta, codigo, respostas: [].concat(respostas), explicacao, ci });
