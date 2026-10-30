// Código dos Web Workers que executam o código do aluno.
// Cada função vira um Worker (via Blob) dentro do iframe isolado runner.html,
// assim o código do aluno não tem acesso ao login/Firebase da página principal.
/* eslint-disable no-restricted-globals */

self.WORKERS = {};

/* ---------------- JavaScript (e TypeScript já transpilado) ---------------- */
self.WORKERS.js = function () {
  const fmt = (v) => {
    if (typeof v === "string") return v;
    if (v instanceof Error) return v.name + ": " + v.message;
    if (typeof v === "function") return "[função " + (v.name || "anônima") + "]";
    if (v === undefined) return "undefined";
    try {
      return JSON.stringify(v, (k, x) => (x instanceof Map ? Object.fromEntries(x) : x instanceof Set ? [...x] : x));
    } catch {
      return String(v);
    }
  };
  const saida = [];
  const enviar = (tipo, args) => {
    const texto = args.map(fmt).join(" ");
    if (tipo === "log") saida.push(texto);
    postMessage({ tipo, texto });
  };
  console.log = (...a) => enviar("log", a);
  console.info = (...a) => enviar("log", a);
  console.table = (...a) => enviar("log", a);
  console.warn = (...a) => enviar("aviso", a);
  console.error = (...a) => enviar("erro", a);
  self.addEventListener("unhandledrejection", (e) =>
    enviar("erro", ["Promise rejeitada: " + fmt(e.reason)]));

  // localStorage de mentirinha (o Worker não tem), para os exemplos funcionarem
  const mem = new Map();
  self.localStorage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    clear: () => mem.clear()
  };

  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const assert = (cond, msg) => { if (!cond) throw new Error(msg || "verificação falhou"); };

  onmessage = async (e) => {
    const { codigo, teste } = e.data;
    // O teste roda no MESMO escopo do código do aluno (para enxergar as funções dele).
    let fase = "codigo";
    const marcar = async () => {
      fase = "teste";
      await new Promise((r) => setTimeout(r, 300));
    };
    let fn;
    try {
      fn = new AsyncFunction("__saida", "__assert", "__marcar",
        codigo + (teste ? "\n;await __marcar();\n{\n" + teste + "\n}" : ""));
    } catch (err) {
      postMessage({ tipo: "erro", texto: "Erro de sintaxe: " + err.message });
      return postMessage({ tipo: "fim", ok: false });
    }
    try {
      await fn(saida, assert, marcar);
      if (teste) postMessage({ tipo: "teste", ok: true });
    } catch (err) {
      if (fase === "teste") {
        postMessage({ tipo: "teste", ok: false, msg: err && err.message || String(err) });
      } else {
        postMessage({ tipo: "erro", texto: (err && err.name ? err.name + ": " : "") + (err && err.message || err) });
        return postMessage({ tipo: "fim", ok: false });
      }
    }
    // dá tempo para setTimeout/promises pendentes imprimirem
    await new Promise((r) => setTimeout(r, 400));
    postMessage({ tipo: "fim", ok: true });
  };
};

/* ---------------- Python (Pyodide) ---------------- */
self.WORKERS.python = function () {
  let py = null;

  function limparErro(msg) {
    const linhas = String(msg).split("\n");
    const i = linhas.findIndex((l) => l.includes('"<exec>"') || l.includes('"main.py"'));
    if (i < 0) return linhas.filter((l) => l.trim()).slice(-3).join("\n");
    return ["Traceback (most recent call last):", ...linhas.slice(i)]
      .join("\n").replace(/"<exec>"/g, '"main.py"').trim();
  }

  onmessage = async (e) => {
    const m = e.data;
    if (m.acao === "init") {
      try {
        postMessage({ tipo: "status", texto: "Carregando Python (só na primeira vez, ~10s)…" });
        importScripts(m.indexURL + "pyodide.js");
        py = await loadPyodide({ indexURL: m.indexURL });
        if (m.graficos) for (const [nome, conteudo] of Object.entries(m.arquivos || {})) py.FS.writeFile(nome, conteudo);
        postMessage({ tipo: "pronto" });
      } catch (err) {
        postMessage({ tipo: "erro", texto: "Falha ao carregar o Python: " + err.message });
        postMessage({ tipo: "fim", ok: false });
      }
      return;
    }

    let saida = "";
    try {
      postMessage({ tipo: "status", texto: "Preparando bibliotecas…" });
      await py.loadPackagesFromImports(m.codigo + "\n" + (m.teste || "") + (m.graficos ? "\nimport matplotlib" : ""));
    } catch (err) {
      postMessage({ tipo: "aviso", texto: "Não consegui carregar alguma biblioteca: " + err.message });
    }
    // stdout "cru" para mostrar o texto do input() na mesma linha da resposta, como num terminal
    const dec = new TextDecoder();
    let buf = "";
    const linha = (s) => { saida += s + "\n"; postMessage({ tipo: "log", texto: s }); };
    py.setStdout({
      write: (bytes) => {
        buf += dec.decode(bytes);
        let i;
        while ((i = buf.indexOf("\n")) >= 0) { linha(buf.slice(0, i)); buf = buf.slice(i + 1); }
        return bytes.length;
      }
    });
    py.setStderr({ batched: (s) => postMessage({ tipo: "erro", texto: s }) });
    const entradas = (m.entrada || "").split("\n");
    if (entradas.length && entradas[entradas.length - 1] === "") entradas.pop();
    py.setStdin({
      stdin: () => {
        if (!entradas.length) return undefined;
        const v = entradas.shift();
        linha(buf + v);
        buf = "";
        return v;
      },
      autoEOF: true
    });

    const ns = py.globals.get("dict")();
    postMessage({ tipo: "executando" });
    try {
      // Reset practice files on every run, including runs in a cached worker.
      if (m.graficos) for (const [nome, conteudo] of Object.entries(m.arquivos || {})) py.FS.writeFile(nome, conteudo);
      if (m.graficos) await py.runPythonAsync(`
import matplotlib
matplotlib.use("Agg", force=True)
import matplotlib.pyplot as plt
plt.close("all")
`, { globals: ns });
      await py.runPythonAsync(m.codigo, { globals: ns, filename: "main.py" });
    } catch (err) {
      if (buf) { linha(buf); buf = ""; }
      let texto = limparErro(err.message);
      if (/EOFError/.test(texto)) texto += "\n💡 Seu código usa input(): escreva os valores na caixa “Entrada”, um por linha.";
      postMessage({ tipo: "erro", texto });
      ns.destroy();
      return postMessage({ tipo: "fim", ok: false });
    }
    if (m.teste) {
      ns.set("__saida__", saida);
      try {
        await py.runPythonAsync(m.teste, { globals: ns });
        postMessage({ tipo: "teste", ok: true });
      } catch (err) {
        const ult = String(err.message).trim().split("\n").pop();
        postMessage({ tipo: "teste", ok: false, msg: ult.replace(/^AssertionError:?\s*/, "") || "Resultado diferente do esperado." });
      }
    }
    if (m.graficos) {
      try {
        const images = await py.runPythonAsync(`
import matplotlib.pyplot as _ds_plt
import io as _ds_io, base64 as _ds_base64, json as _ds_json
_ds_images = []
for _ds_number in _ds_plt.get_fignums()[:5]:
    _ds_buffer = _ds_io.BytesIO()
    _ds_plt.figure(_ds_number).savefig(_ds_buffer, format="png", dpi=100)
    if _ds_buffer.tell() <= 5000000:
        _ds_images.append(_ds_base64.b64encode(_ds_buffer.getvalue()).decode("ascii"))
_ds_plt.close("all")
_ds_json.dumps(_ds_images)
`, { globals: ns });
        for (const png of JSON.parse(images)) postMessage({ tipo: "imagem", png });
      } catch (err) {
        postMessage({ tipo: "aviso", texto: "Chart rendering failed / Falha ao exibir gráfico: " + err.message });
      }
    }
    if (buf) linha(buf);
    ns.destroy();
    postMessage({ tipo: "fim", ok: true });
  };
};

/* ---------------- SQL (SQLite via sql.js, com tradução de MySQL) ---------------- */
self.WORKERS.sql = function () {
  let SQL = null;

  const pad = (n) => String(n).padStart(2, "0");
  const dataISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => (s == null ? null : new Date(String(s).length <= 10 ? s + "T00:00:00" : String(s).replace(" ", "T")));

  function registrarFuncoes(db) {
    db.create_function("NOW", () => { const d = new Date(); return `${dataISO(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; });
    db.create_function("CURDATE", () => dataISO(new Date()));
    db.create_function("YEAR", (s) => (parse(s) ? parse(s).getFullYear() : null));
    db.create_function("MONTH", (s) => (parse(s) ? parse(s).getMonth() + 1 : null));
    db.create_function("DAY", (s) => (parse(s) ? parse(s).getDate() : null));
    db.create_function("DATEDIFF", (a, b) => (a && b ? Math.round((parse(a) - parse(b)) / 864e5) : null));
    db.create_function("TIMESTAMPDIFF", (u, a, b) => {
      const x = parse(a), y = parse(b);
      if (!x || !y) return null;
      const meses = (y.getFullYear() - x.getFullYear()) * 12 + (y.getMonth() - x.getMonth()) - (y.getDate() < x.getDate() ? 1 : 0);
      switch (String(u).toUpperCase()) {
        case "YEAR": return Math.floor(meses / 12);
        case "MONTH": return meses;
        case "DAY": return Math.floor((y - x) / 864e5);
        case "HOUR": return Math.floor((y - x) / 36e5);
        case "MINUTE": return Math.floor((y - x) / 6e4);
        default: return Math.floor((y - x) / 1000);
      }
    });
    db.create_function("DATE_FORMAT", (s, f) => {
      const d = parse(s);
      if (!d) return null;
      const mapa = { Y: d.getFullYear(), y: String(d.getFullYear()).slice(2), m: pad(d.getMonth() + 1), d: pad(d.getDate()),
        H: pad(d.getHours()), i: pad(d.getMinutes()), s: pad(d.getSeconds()), "%": "%" };
      return String(f).replace(/%([YymdHis%])/g, (_, k) => mapa[k]);
    });
    db.create_function("ESQUERDA", (s, n) => (s == null ? null : String(s).slice(0, n)));
    db.create_function("DIREITA", (s, n) => (s == null ? null : String(s).slice(-n)));
  }

  // Divide o script em comandos, respeitando aspas e comentários.
  function dividir(sql) {
    const out = [];
    let atual = "", q = null;
    for (let i = 0; i < sql.length; i++) {
      const c = sql[i], n = sql[i + 1];
      if (!q && c === "-" && n === "-") { const j = sql.indexOf("\n", i); i = j < 0 ? sql.length : j; atual += "\n"; continue; }
      if (!q && c === "#") { const j = sql.indexOf("\n", i); i = j < 0 ? sql.length : j; atual += "\n"; continue; }
      if (!q && c === "/" && n === "*") { const j = sql.indexOf("*/", i + 2); i = j < 0 ? sql.length : j + 1; continue; }
      if (q) { if (c === q) q = null; }
      else if (c === "'" || c === '"' || c === "`") q = c;
      if (!q && c === ";") { if (atual.trim()) out.push(atual.trim()); atual = ""; continue; }
      atual += c;
    }
    if (atual.trim()) out.push(atual.trim());
    return out;
  }

  // Ajusta a sintaxe do MySQL para o SQLite usado no navegador.
  function traduzir(s) {
    return s
      .replace(/`/g, '"')
      .replace(/(\w+)\s+INT(?:EGER)?\b[^,\n]*?\bAUTO_INCREMENT\b[^,\n]*/gi, "$1 INTEGER PRIMARY KEY AUTOINCREMENT")
      .replace(/\bUNSIGNED\b/gi, "")
      .replace(/\bENUM\s*\([^)]*\)/gi, "TEXT")
      .replace(/\bON\s+UPDATE\s+CURRENT_TIMESTAMP\b/gi, "")
      .replace(/\)\s*ENGINE\s*=\s*\w+[^;]*$/i, ")")
      .replace(/\bSTART\s+TRANSACTION\b/gi, "BEGIN TRANSACTION")
      .replace(/\bROW_COUNT\s*\(\s*\)/gi, "changes()")
      .replace(/\bEXPLAIN\s+ANALYZE\b/gi, "EXPLAIN QUERY PLAN")
      .replace(/\bEXPLAIN\b(?!\s+QUERY)/gi, "EXPLAIN QUERY PLAN")
      .replace(/\bTIMESTAMPDIFF\s*\(\s*(\w+)\s*,/gi, "TIMESTAMPDIFF('$1',")
      .replace(/\bLEFT\s*\(/gi, "ESQUERDA(")
      .replace(/\bRIGHT\s*\(/gi, "DIREITA(")
      .replace(/\bIF\s*\(/gi, "IIF(")
      .replace(/\bTRUNCATE\s+TABLE\s+(\w+)/gi, "DELETE FROM $1");
  }

  const ADMIN = /^(GRANT|REVOKE|CREATE\s+USER|DROP\s+USER|ALTER\s+USER|SET\s+GLOBAL|SHOW\s+(GRANTS|VARIABLES|FULL\s+PROCESSLIST|PROCESSLIST|REPLICA|SLAVE|STATUS)|DELIMITER|KILL|FLUSH|CREATE\s+(PROCEDURE|FUNCTION|EVENT|TRIGGER)|CALL)\b/i;

  function executar(db, script, comLog) {
    const resultados = [];
    for (const original of dividir(script)) {
      const s = original.trim();
      let sql = null;
      if (/^(CREATE\s+(DATABASE|SCHEMA)|USE\s|DROP\s+(DATABASE|SCHEMA))/i.test(s) || /^SHOW\s+DATABASES/i.test(s)) {
        comLog && postMessage({ tipo: "aviso", texto: "ℹ️ No sandbox existe um único banco de dados — comando ignorado: " + s.split("\n")[0] });
        continue;
      }
      if (ADMIN.test(s)) {
        comLog && postMessage({ tipo: "aviso", texto: "⚠️ Comando administrativo do MySQL (usuários, procedures, triggers, variáveis do servidor) não roda no sandbox. Teste em um MySQL de verdade: " + s.split("\n")[0] });
        continue;
      }
      let m;
      if (/^SHOW\s+(FULL\s+)?TABLES/i.test(s)) sql = "SELECT name AS tabela, type AS tipo FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY name";
      else if ((m = s.match(/^(?:DESCRIBE|DESC|SHOW\s+COLUMNS\s+FROM)\s+["`]?(\w+)/i))) sql = `SELECT name AS campo, type AS tipo, CASE "notnull" WHEN 1 THEN 'NÃO' ELSE 'SIM' END AS aceita_nulo, dflt_value AS padrao, CASE pk WHEN 0 THEN '' ELSE 'PRI' END AS chave FROM pragma_table_info('${m[1]}')`;
      else if ((m = s.match(/^SHOW\s+CREATE\s+(?:TABLE|VIEW)\s+["`]?(\w+)/i))) sql = `SELECT name AS tabela, sql AS create_table FROM sqlite_master WHERE name = '${m[1]}'`;
      else if ((m = s.match(/^CREATE\s+OR\s+REPLACE\s+VIEW\s+(\w+)/i))) {
        db.run(`DROP VIEW IF EXISTS ${m[1]}`);
        sql = traduzir(s.replace(/^CREATE\s+OR\s+REPLACE\s+VIEW/i, "CREATE VIEW"));
      } else sql = traduzir(s);

      const stmt = db.prepare(sql);
      try {
        const colunas = stmt.getColumnNames();
        if (colunas.length) {
          const linhas = [];
          while (stmt.step()) linhas.push(stmt.get());
          resultados.push({ sql: s, colunas, linhas });
        } else {
          stmt.step();
          const dml = /^(INSERT|UPDATE|DELETE|REPLACE)\b/i.test(sql);
          resultados.push({ sql: s, afetadas: dml ? db.getRowsModified() : null });
        }
      } finally {
        stmt.free();
      }
    }
    return resultados;
  }

  // Mensagens do SQLite em português, com dica
  function erroAmigavel(msg) {
    let m;
    if ((m = msg.match(/no such table: (\S+)/))) return `a tabela ou view "${m[1]}" não existe. Confira o nome (use SHOW TABLES).`;
    if ((m = msg.match(/no such column: (\S+)/))) return `a coluna "${m[1]}" não existe. Confira o nome (use DESCRIBE tabela).`;
    if ((m = msg.match(/near "([^"]*)": syntax error/))) return `erro de sintaxe perto de "${m[1]}". Confira vírgulas, parênteses e aspas.`;
    if ((m = msg.match(/table (\S+) already exists/))) return `a tabela "${m[1]}" já existe (use DROP TABLE IF EXISTS antes, ou outro nome).`;
    if ((m = msg.match(/UNIQUE constraint failed: (\S+)/))) return `valor repetido em ${m[1]}, que não aceita duplicados (UNIQUE/PRIMARY KEY).`;
    if ((m = msg.match(/NOT NULL constraint failed: (\S+)/))) return `${m[1]} é obrigatório (NOT NULL).`;
    if (/misuse of aggregate/.test(msg)) return "uso inválido de função de agregação (COUNT/SUM...). Filtros com agregação vão no HAVING, não no WHERE.";
    if ((m = msg.match(/no such function: (\S+)/))) return `a função ${m[1]} não existe neste banco.`;
    return msg;
  }

  function novoBanco(seed) {
    const db = new SQL.Database();
    registrarFuncoes(db);
    if (seed) db.exec(seed);
    return db;
  }

  const normalizar = (res, ordem) => {
    if (!res) return null;
    const linhas = res.linhas.map((l) => JSON.stringify(l.map((v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v))));
    return { n: res.colunas.length, linhas: ordem ? linhas : [...linhas].sort() };
  };

  onmessage = async (e) => {
    const m = e.data;
    if (m.acao === "init") {
      try {
        importScripts(m.base + "sql-wasm.js");
        SQL = await initSqlJs({ locateFile: (f) => m.base + f });
        postMessage({ tipo: "pronto" });
      } catch (err) {
        postMessage({ tipo: "erro", texto: "Falha ao carregar o motor SQL: " + err.message });
        postMessage({ tipo: "fim", ok: false });
      }
      return;
    }
    postMessage({ tipo: "executando" });
    const seed = m.db === "vazio" ? "" : m.seed;
    let db = novoBanco(seed);
    let resultados;
    try {
      resultados = executar(db, m.codigo, true);
      postMessage({ tipo: "tabelas", resultados });
    } catch (err) {
      postMessage({ tipo: "erro", texto: "Erro SQL: " + erroAmigavel(err.message) });
      db.close();
      return postMessage({ tipo: "fim", ok: false });
    }

    if (m.solucao) {
      try {
        const consultaFinal = (dbx, res) => (m.verificacao ? executar(dbx, m.verificacao, false).pop() : res.filter((r) => r.colunas).pop());
        const meu = normalizar(consultaFinal(db, resultados), m.ordem);
        const dbSol = novoBanco(seed);
        const esperado = normalizar(consultaFinal(dbSol, executar(dbSol, m.solucao, false)), m.ordem);
        dbSol.close();
        if (!meu) postMessage({ tipo: "teste", ok: false, msg: "Sua consulta não retornou nenhuma tabela de resultado." });
        else if (meu.n !== esperado.n) postMessage({ tipo: "teste", ok: false, msg: `O resultado deveria ter ${esperado.n} coluna(s), mas tem ${meu.n}.` });
        else if (meu.linhas.length !== esperado.linhas.length) postMessage({ tipo: "teste", ok: false, msg: `O resultado deveria ter ${esperado.linhas.length} linha(s), mas tem ${meu.linhas.length}.` });
        else if (meu.linhas.join() !== esperado.linhas.join()) postMessage({ tipo: "teste", ok: false, msg: m.ordem ? "Os dados ou a ORDEM das linhas não batem com o esperado." : "Os dados não batem com o esperado." });
        else postMessage({ tipo: "teste", ok: true });
      } catch (err) {
        postMessage({ tipo: "teste", ok: false, msg: "Não foi possível verificar: " + erroAmigavel(err.message) });
      }
    }
    db.close();
    postMessage({ tipo: "fim", ok: true });
  };
};

