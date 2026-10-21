// Web Worker da trilha "SQL na Prática": carrega o sql.js e responde aos pedidos da tela.
const SQLJS = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/";
importScripts("motor.js", SQLJS + "sql-wasm.js");

const pronto = initSqlJs({ locateFile: (f) => SQLJS + f }).then((SQL) => self.criarMotorSQL(SQL));

onmessage = async (e) => {
  const { id, acao, dados } = e.data;
  try {
    const motor = await pronto;
    postMessage({ id, ok: true, dados: motor[acao](dados) });
  } catch (err) {
    postMessage({ id, ok: false, erro: err.message || String(err) });
  }
};
