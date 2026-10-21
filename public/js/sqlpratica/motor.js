// Motor da trilha "SQL na Prática": cria o banco de cada lição (sql.js),
// executa a consulta do aluno e corrige a tarefa atual pelos "checks".
// Script clássico (sem import/export) para poder ser usado com importScripts no worker.
self.criarMotorSQL = function (SQL) {
  let inicial = null; // banco limpo da lição (bytes), usado nas comparações com a solução
  let atual = null;   // banco que o aluno altera nas lições com envio manual

  const abrirBanco = () => new SQL.Database(inicial);

  // Executa todos os comandos do texto e devolve o último resultado em forma de tabela.
  function executar(db, sql) {
    let ultimo = null, afetadas = 0, comandos = 0, stmt = null;
    try {
      for (stmt of db.iterateStatements(sql)) {
        comandos++;
        const colunas = stmt.getColumnNames();
        if (colunas.length) {
          const linhas = [];
          while (stmt.step()) linhas.push(stmt.get());
          ultimo = { colunas, linhas };
        } else {
          stmt.step();
          if (/^\s*(INSERT|UPDATE|DELETE|REPLACE)\b/i.test(stmt.getSQL())) afetadas += db.getRowsModified();
        }
      }
    } catch (err) {
      // Libera o comando que falhou para não deixar a tabela travada (ex.: DROP TABLE depois).
      try { stmt && stmt.free(); } catch { /* já liberado */ }
      throw err;
    }
    return { ultimo, afetadas, comandos };
  }

  function tabelas(db, nomes) {
    return (nomes || []).map((nome) => {
      try {
        const r = executar(db, `SELECT * FROM "${nome}"`).ultimo;
        return { nome, colunas: r ? r.colunas : [], linhas: r ? r.linhas : [] };
      } catch {
        return { nome, ausente: true };
      }
    });
  }

  function erroAmigavel(msg) {
    let m;
    if ((m = msg.match(/no such table: (\S+)/))) return `a tabela "${m[1]}" não existe. Confira o nome.`;
    if ((m = msg.match(/no such column: (\S+)/))) return `a coluna "${m[1]}" não existe. Confira o nome (veja as tabelas acima).`;
    if ((m = msg.match(/near "([^"]*)": syntax error/))) return `erro de sintaxe perto de "${m[1]}". Confira vírgulas, parênteses e aspas.`;
    if (/incomplete input/.test(msg)) return "o comando está incompleto. Falta terminar a consulta?";
    if ((m = msg.match(/ambiguous column name: (\S+)/))) return `a coluna "${m[1]}" existe em mais de uma tabela. Escreva tabela.${m[1]}.`;
    if ((m = msg.match(/table (\S+) already exists/))) return `a tabela "${m[1]}" já existe.`;
    if ((m = msg.match(/duplicate column name: (\S+)/))) return `a coluna "${m[1]}" já existe nesta tabela.`;
    if ((m = msg.match(/UNIQUE constraint failed: (\S+)/))) return `valor repetido em ${m[1]}, que não aceita duplicados (UNIQUE/PRIMARY KEY).`;
    if ((m = msg.match(/NOT NULL constraint failed: (\S+)/))) return `${m[1]} é obrigatório (NOT NULL).`;
    if ((m = msg.match(/table (\S+) has (\d+) columns but (\d+) values were supplied/))) return `a tabela ${m[1]} tem ${m[2]} colunas, mas foram informados ${m[3]} valores.`;
    if (/(\d+) values for (\d+) columns/.test(msg)) return "a quantidade de valores não bate com a quantidade de colunas.";
    if (/misuse of aggregate/.test(msg)) return "uso inválido de função de agregação (COUNT, SUM…). Filtros com agregação vão no HAVING, não no WHERE.";
    if ((m = msg.match(/no such function: (\S+)/))) return `a função ${m[1]} não existe neste banco (SQLite).`;
    if (/SELECTs to the left and right of (\w+) do not have the same number of result columns/.test(msg)) return "as consultas dos dois lados precisam ter o mesmo número de colunas.";
    return msg;
  }

  /* ---------- comparação de resultados ---------- */

  const norm = (v) => (typeof v === "number" ? String(Math.round(v * 100) / 100) : v === null ? "∅" : String(v));

  // A linha do aluno contém todos os valores da linha da solução? (colunas extras são permitidas)
  function contem(linhaAluno, linhaSol) {
    const sobra = linhaAluno.map(norm);
    return linhaSol.every((v) => {
      const i = sobra.indexOf(norm(v));
      if (i < 0) return false;
      sobra.splice(i, 1);
      return true;
    });
  }

  function compararValores(aluno, solucao, ordenado) {
    if (!aluno) return "Sua consulta não devolveu uma tabela de resultado.";
    if (aluno.linhas.length !== solucao.linhas.length) {
      return `O resultado deveria ter ${solucao.linhas.length} linha(s), mas tem ${aluno.linhas.length}.`;
    }
    if (aluno.colunas.length < solucao.colunas.length) {
      return `O resultado deveria ter pelo menos ${solucao.colunas.length} coluna(s), mas tem ${aluno.colunas.length}.`;
    }
    if (ordenado) {
      const ok = solucao.linhas.every((l, i) => contem(aluno.linhas[i], l));
      if (!ok) {
        const semOrdem = compararValores(aluno, solucao, false);
        return semOrdem || "Os dados estão certos, mas a ORDEM das linhas não bate com o pedido.";
      }
      return null;
    }
    const usadas = new Set();
    for (const l of solucao.linhas) {
      const i = aluno.linhas.findIndex((a, k) => !usadas.has(k) && contem(a, l));
      if (i < 0) return "Os dados do resultado não batem com o que a tarefa pede.";
      usadas.add(i);
    }
    return null;
  }

  function contar(db, sql) {
    const r = executar(db, sql).ultimo;
    return r ? r.linhas.length : 0;
  }

  // Devolve null se o check passou, ou uma mensagem explicando o que falta.
  function avaliar(check, ctx) {
    switch (check.tipo) {
      case "colunas": {
        const r = ctx.resultado;
        if (!r) return "Sua consulta não devolveu uma tabela de resultado.";
        const tem = r.colunas.map((c) => c.toLowerCase());
        const quer = check.colunas.map((c) => c.toLowerCase());
        if (tem.length === quer.length && tem.every((c, i) => c === quer[i])) return null;
        return `O resultado deveria ter exatamente a(s) coluna(s): ${check.colunas.join(", ")}.`;
      }
      case "valores": {
        const db = abrirBanco();
        try {
          const sol = executar(db, ctx.tarefa.solucao).ultimo;
          return compararValores(ctx.resultado, sol, check.ordenado);
        } finally {
          db.close();
        }
      }
      case "maior_igual": {
        const r = ctx.resultado;
        const cols = r ? r.colunas.map((c) => c.toLowerCase()) : [];
        const a = cols.indexOf(check.a.toLowerCase()), b = cols.indexOf(check.b.toLowerCase());
        if (a < 0 || b < 0) return `Inclua as colunas ${check.a} e ${check.b} no resultado.`;
        return r.linhas.every((l) => l[a] >= l[b]) ? null : `Em todas as linhas, ${check.a} deveria ser maior que ${check.b}.`;
      }
      case "contagem": {
        const n = contar(ctx.db, check.sql);
        return n >= check.min && n <= check.max ? null : check.msg || "O banco ainda não está como a tarefa pede.";
      }
      case "linha_existe": {
        const cond = check.ci ? `LOWER("${check.coluna}") = LOWER(?)` : `"${check.coluna}" = ?`;
        const stmt = ctx.db.prepare(`SELECT 1 FROM "${check.tabela}" WHERE ${cond}`);
        try {
          stmt.bind([check.valor]);
          return stmt.step() ? null : check.msg || `Não encontrei em ${check.tabela} uma linha com ${check.coluna} = '${check.valor}'.`;
        } finally {
          stmt.free();
        }
      }
      case "funciona":
        try {
          executar(ctx.db, check.sql);
          return null;
        } catch {
          if (check.desfazer) {
            try { executar(ctx.db, check.desfazer); } catch { /* nada a desfazer */ }
          }
          return check.msg || "O banco ainda não está como a tarefa pede.";
        }
      case "falha":
        try {
          executar(ctx.db, check.sql);
          return check.msg || "O banco ainda não está como a tarefa pede.";
        } catch {
          return null;
        }
      default:
        return "Tipo de verificação desconhecido: " + check.tipo;
    }
  }

  function corrigir(tarefa, db, resultado) {
    for (const check of tarefa.checks || []) {
      let msg;
      try {
        msg = avaliar(check, { tarefa, db, resultado });
      } catch (err) {
        msg = "Ainda não: " + erroAmigavel(err.message);
      }
      if (msg) return { ok: false, msg };
    }
    return { ok: true };
  }

  return {
    // Cria o banco da lição: seed + preload.
    abrir({ seed, preload, nomesTabelas }) {
      const db = new SQL.Database();
      db.exec(seed || "");
      if (preload) db.exec(preload);
      inicial = db.export();
      db.close();
      if (atual) atual.close();
      atual = abrirBanco();
      return { tabelas: tabelas(atual, nomesTabelas) };
    },

    resetar({ nomesTabelas }) {
      if (atual) atual.close();
      atual = abrirBanco();
      return { tabelas: tabelas(atual, nomesTabelas) };
    },

    // manual = true: roda no banco persistente (INSERT/UPDATE/...); senão, num banco descartável.
    rodar({ sql, manual, tarefa, nomesTabelas }) {
      const db = manual ? atual : abrirBanco();
      const saida = {};
      try {
        if (!sql.trim()) {
          saida.erro = "Escreva uma consulta SQL no editor.";
        } else {
          const r = executar(db, sql);
          saida.resultado = r.ultimo;
          saida.afetadas = r.afetadas;
          saida.comandos = r.comandos;
          if (tarefa) saida.correcao = corrigir(tarefa, db, r.ultimo);
        }
      } catch (err) {
        saida.erro = erroAmigavel(err.message);
        // No modo manual, mesmo com erro o banco pode já ter mudado (comandos anteriores).
        if (manual && tarefa) saida.correcao = corrigir(tarefa, db, null);
      }
      if (manual) saida.tabelas = tabelas(db, nomesTabelas);
      else db.close();
      return saida;
    }
  };
};
