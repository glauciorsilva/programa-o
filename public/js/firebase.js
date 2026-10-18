import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Configuração pública do app web (pode ficar no front-end; a segurança vem das regras do Firestore).
// NUNCA coloque aqui a chave privada da service account.
const firebaseConfig = {
  apiKey: "AIzaSyACVmJcmlDjd_RwC43j4jOVnei89nWxb5s",
  authDomain: "progrtotal.firebaseapp.com",
  projectId: "progrtotal",
  storageBucket: "progrtotal.firebasestorage.app",
  messagingSenderId: "102594294399",
  appId: "1:102594294399:web:98e18dfb87aedbb853054a",
  measurementId: "G-HQ0RGLH2X8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

isSupported().then((ok) => ok && getAnalytics(app)).catch(() => {});

// Contas com acesso de administrador / TI (também precisa estar em firestore.rules).
export const ADMIN_EMAILS = ["rafael.glaucio2@gmail.com"];

export function isAdminEmail(user) {
  return !!user && !!user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
}

export function isAdminUser(user) {
  return isAdminEmail(user) && user.emailVerified;
}
