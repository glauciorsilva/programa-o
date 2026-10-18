import { db } from "./firebase.js";
import {
  doc, addDoc, updateDoc, collection, serverTimestamp, increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { dayKey } from "./util.js";

const FLUSH_EVERY = 30; // segundos entre gravações no Firestore

// Cronômetro de estudo: conta o tempo da sessão (só com a aba visível)
// e soma no tempo total do aluno a cada 30s.
export class StudyTimer {
  constructor(uid, baseTotal, onTick) {
    this.uid = uid;
    this.baseTotal = baseTotal || 0;
    this.onTick = onTick;
    this.session = 0;
    this.flushed = 0;
    this.userRef = doc(db, "users", uid);
    this.sessionRef = null;
    this.handleVisibility = () => {
      if (document.visibilityState === "hidden") this.flush();
      this.emit();
    };
    this.handlePageHide = () => this.flush();
  }

  get paused() {
    return document.visibilityState !== "visible";
  }

  async start() {
    const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    try {
      this.sessionRef = await addDoc(collection(db, "users", this.uid, "sessions"), {
        start: serverTimestamp(),
        lastPing: serverTimestamp(),
        seconds: 0,
        device: mobile ? "Mobile" : "Desktop",
        userAgent: navigator.userAgent.slice(0, 200)
      });
      await updateDoc(this.userRef, {
        sessionsCount: increment(1),
        lastAccess: serverTimestamp()
      });
    } catch (e) {
      console.error("Não foi possível registrar a sessão", e);
    }
    this.tickId = setInterval(() => this.tick(), 1000);
    document.addEventListener("visibilitychange", this.handleVisibility);
    window.addEventListener("pagehide", this.handlePageHide);
    this.emit();
  }

  tick() {
    if (this.paused) return;
    this.session++;
    if (this.session - this.flushed >= FLUSH_EVERY) this.flush();
    this.emit();
  }

  emit() {
    this.onTick?.({
      session: this.session,
      total: this.baseTotal + this.session,
      paused: this.paused
    });
  }

  async flush() {
    const delta = this.session - this.flushed;
    if (delta <= 0) return;
    this.flushed = this.session;
    try {
      await updateDoc(this.userRef, {
        totalSeconds: increment(delta),
        lastAccess: serverTimestamp(),
        ["daily." + dayKey()]: increment(delta)
      });
      if (this.sessionRef) {
        await updateDoc(this.sessionRef, { seconds: this.session, lastPing: serverTimestamp() });
      }
    } catch (e) {
      this.flushed -= delta; // tenta de novo na próxima rodada
      console.error("Falha ao salvar tempo de estudo", e);
    }
  }

  async stop() {
    clearInterval(this.tickId);
    document.removeEventListener("visibilitychange", this.handleVisibility);
    window.removeEventListener("pagehide", this.handlePageHide);
    await this.flush();
  }
}
