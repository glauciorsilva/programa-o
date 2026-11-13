// "AWS de A a Z": computação em nuvem com AWS para iniciantes, seguindo o conteúdo
// da certificação Cloud Practitioner. AWS não roda no navegador: a prática é feita
// com perguntas de fixação em cada lição.
import parte1 from "./parte1.js";
import parte2 from "./parte2.js";
import parte3 from "./parte3.js";

export const CURSO_AWSG = {
  id: "awsg",
  base: "awsguia",
  titulo: "☁️ AWS de A a Z",
  nomeCurto: "AWS de A a Z",
  voltar: { href: "#/linguagens", texto: "Linguagens" },
  ignorarCaixa: true,
  intro: "Guia de computação em nuvem com a AWS, em português, seguindo o conteúdo da certificação <b>AWS Certified Cloud Practitioner</b>: conceitos de nuvem, EC2, Lambda, contêineres, redes (VPC), armazenamento (S3, EBS), bancos de dados, IA, segurança (IAM), monitoramento, preços, migração e Well-Architected. Cada lição traz explicação e perguntas de fixação.",
  licoes: [...parte1, ...parte2, ...parte3]
};
