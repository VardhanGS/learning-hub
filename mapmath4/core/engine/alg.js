// Algebra helpers for typed answers like "3x + 2", "x^2 - 4", "(x + 1)(x - 3)", "2(x - 5)".
// Alg.parse(text) → a small syntax tree (no eval of user text); Alg.evalAt(tree, vars) → a number;
// Alg.equiv(a, b) compares two expressions by evaluating them at many random points (so any equivalent form passes);
// Alg.form(text) tells whether an answer is written expanded or factored (so "simplify" questions can't be answered
// by retyping the question). Alg.tex(text) shows a typed answer nicely with KaTeX.
const Alg = (() => {
  const VARS = 'xyabmnt';
  // Normalize what a student or a generator writes: unicode signs, superscripts, spaces.
  function clean(s) {
    return String(s).replace(/[−–]/g, '-').replace(/[×·∙]/g, '*').replace(/÷/g, '/').replace(/²/g, '^2').replace(/³/g, '^3').replace(/√/g, 'r').replace(/\s+/g, '');
  }
  // Tokens: numbers, single-letter variables, operators, parentheses, r (square root).
  function tokens(s) {
    const out = [];
    for (let i = 0; i < s.length;) {
      const c = s[i];
      if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; const t = s.slice(i, j); if ((t.match(/\./g) || []).length > 1) throw new Error('bad number'); out.push({ k: 'n', v: +t }); i = j; continue; }
      if (VARS.includes(c)) { out.push({ k: 'v', v: c }); i++; continue; }
      if ('+-*/^()r'.includes(c)) { out.push({ k: c }); i++; continue; }
      throw new Error(`unexpected "${c}"`);
    }
    // implicit multiplication: 3x, 2(…), x(…), )(, )x, x y
    const res = [];
    out.forEach((t, i) => {
      const p = res[res.length - 1];
      if (p && (p.k === 'n' || p.k === 'v' || p.k === ')') && (t.k === 'n' || t.k === 'v' || t.k === '(' || t.k === 'r') && !(p.k === 'n' && t.k === 'n')) res.push({ k: '*', implicit: true });
      res.push(t);
    });
    return res;
  }
  // Recursive-descent parser: sum → product → unary → power → atom.
  function parse(text) {
    const ts = tokens(clean(text));
    let i = 0;
    const peek = () => ts[i], next = () => ts[i++];
    function sum() {
      let a = product();
      while (peek() && (peek().k === '+' || peek().k === '-')) { const op = next().k; a = { op, a, b: product() }; }
      return a;
    }
    function product() {
      let a = unary();
      while (peek() && (peek().k === '*' || peek().k === '/')) { const op = next().k; a = { op, a, b: unary() }; }
      return a;
    }
    function unary() {
      if (peek() && peek().k === '-') { next(); return { op: 'neg', a: unary() }; }
      if (peek() && peek().k === '+') { next(); return unary(); }
      return power();
    }
    function power() {
      const base = atom();
      if (peek() && peek().k === '^') { next(); return { op: '^', a: base, b: unary() }; }
      return base;
    }
    function atom() {
      const t = next();
      if (!t) throw new Error('incomplete');
      if (t.k === 'n') return { num: t.v };
      if (t.k === 'v') return { v: t.v };
      if (t.k === 'r') return { op: 'sqrt', a: power() };
      if (t.k === '(') { const e = sum(); if (!peek() || next().k !== ')') throw new Error('missing )'); return e; }
      throw new Error('unexpected symbol');
    }
    const tree = sum();
    if (i !== ts.length) throw new Error('extra symbols');
    return tree;
  }
  function evalAt(t, vars) {
    if (t.num != null) return t.num;
    if (t.v) return vars[t.v] ?? NaN;
    const a = evalAt(t.a, vars);
    switch (t.op) {
      case 'neg': return -a;
      case 'sqrt': return Math.sqrt(a);
      case '+': return a + evalAt(t.b, vars);
      case '-': return a - evalAt(t.b, vars);
      case '*': return a * evalAt(t.b, vars);
      case '/': return a / evalAt(t.b, vars);
      case '^': return a ** evalAt(t.b, vars);
      default: return NaN;
    }
  }
  const tryParse = (s) => { try { return parse(s); } catch { return null; } };
  const varsIn = (t, set = new Set()) => { if (t.v) set.add(t.v); if (t.a) varsIn(t.a, set); if (t.b) varsIn(t.b, set); return set; };
  // Same value at 12 random points (a fixed seed so checks are repeatable)?
  function equiv(a, b) {
    const A = typeof a === 'string' ? tryParse(a) : a, B = typeof b === 'string' ? tryParse(b) : b;
    if (!A || !B) return false;
    const names = [...new Set([...varsIn(A), ...varsIn(B)])];
    let seed = 7, ok = 0;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let k = 0; k < 24 && ok < 12; k++) {
      const vars = Object.fromEntries(names.map((n) => [n, Math.round((rnd() * 8 - 4) * 1000) / 1000 + 0.137]));
      const x = evalAt(A, vars), y = evalAt(B, vars);
      if (!Number.isFinite(x) && !Number.isFinite(y)) continue;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
      if (Math.abs(x - y) > 1e-7 * Math.max(1, Math.abs(x), Math.abs(y))) return false;
      ok++;
    }
    if (ok >= 6) return true;
    // Some answers only have real values at whole numbers, like (−2)^(n − 1) for a sequence: check those instead.
    ok = 0;
    for (let k = 0; k < 24 && ok < 12; k++) {
      const vars = Object.fromEntries(names.map((n, i) => [n, ((k * 7 + i * 3) % 11) + 1]));
      const x = evalAt(A, vars), y = evalAt(B, vars);
      if (!Number.isFinite(x) && !Number.isFinite(y)) continue;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
      if (Math.abs(x - y) > 1e-7 * Math.max(1, Math.abs(x), Math.abs(y))) return false;
      ok++;
    }
    return ok >= 6;
  }
  // Form of a written answer: 'expanded' (a sum of terms, no parentheses, each kind of term once),
  // 'factored' (a product or power at the top), or 'other'.
  function monoKey(t) { // the variable part of a simple term like 3x^2 or -xy
    const parts = [];
    (function walk(n) { if (n.v) parts.push(n.v); else if (n.op === '^' && n.a.v && n.b.num != null) parts.push(n.a.v + '^' + n.b.num); else if (n.op === '*' || n.op === 'neg') { walk(n.a); if (n.b) walk(n.b); } })(t);
    return parts.sort().join('·') || '1';
  }
  function topTerms(t, out = []) { if (t.op === '+' || t.op === '-') { topTerms(t.a, out); out.push(t.b); } else out.push(t); return out; }
  // A single simplified term like 6x^5 or -2xy^3: one number at most, each variable once, no division or parentheses.
  function isMonomial(t) {
    const seen = new Set(); let nums = 0, ok = true;
    (function walk(n) {
      if (n.num != null) nums++;
      else if (n.v) { if (seen.has(n.v)) ok = false; seen.add(n.v); }
      else if (n.op === '^' && n.a.v && n.b.num != null) { if (seen.has(n.a.v)) ok = false; seen.add(n.a.v); }
      else if (n.op === '^' && n.a.v && n.b.op === 'neg' && n.b.a.num != null) { if (seen.has(n.a.v)) ok = false; seen.add(n.a.v); }
      else if (n.op === '*') { walk(n.a); walk(n.b); }
      else if (n.op === 'neg') walk(n.a);
      else ok = false;
    })(t);
    return ok && nums <= 1;
  }
  function form(text) {
    const s = clean(text), t = tryParse(s);
    if (!t) return 'other';
    if (!s.includes('(') && !s.includes('/') && isMonomial(t)) return 'monomial';
    if (!s.includes('(')) {
      const keys = topTerms(t).map(monoKey);
      return new Set(keys).size === keys.length ? 'expanded' : 'other';
    }
    let top = t.op === 'neg' ? t.a : t;
    return top.op === '*' || top.op === '^' ? 'factored' : 'other';
  }
  // Show typed text as TeX: x^2 → x^{2}, * → ·, sqrt.
  function tex(text) {
    return clean(text).replace(/\*/g, ' \\cdot ').replace(/r\(/g, '\\sqrt(').replace(/\^\(([^()]*)\)/g, '^{$1}').replace(/\^(-?[0-9.]+|[a-z])/g, '^{$1}').replace(/-/g, ' - ').replace(/\+/g, ' + ');
  }
  // Polynomial helpers for generators: coefficients [c0, c1, c2, …] in x.
  const pmul = (p, q) => { const r = Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { r[i + j] += a * b; })); return r; };
  const padd = (p, q) => Array(Math.max(p.length, q.length)).fill(0).map((_, i) => (p[i] || 0) + (q[i] || 0));
  // [c0, c1, c2] → "3x^2 - 2x + 5" (typed form, highest power first)
  function pstr(p, v = 'x') {
    const out = [];
    for (let i = p.length - 1; i >= 0; i--) {
      const c = p[i]; if (!c) continue;
      const mag = Math.abs(c), sign = c < 0 ? '-' : '+';
      const body = i === 0 ? String(mag) : `${mag === 1 ? '' : mag}${v}${i > 1 ? '^' + i : ''}`;
      out.push(out.length ? ` ${sign} ${body}` : `${c < 0 ? '-' : ''}${body}`);
    }
    return out.join('') || '0';
  }
  // The number factored out in front of a product: 3(x − 7)(x − 2) → 3, (3x − 21)(x − 2) → 1, −6(2x + 1) → −6.
  // Used to ask for the GREATEST common factor (a partly factored answer is equal, but not finished).
  function leadNum(text) {
    let t = tryParse(text), k = 1;
    if (!t) return null;
    if (t.op === 'neg') { k = -1; t = t.a; }
    (function walk(n) { if (n.op === '*') { walk(n.a); walk(n.b); } else if (n.op === 'neg') { k = -k; walk(n.a); } else if (n.num != null) k *= n.num; })(t);
    return k;
  }
  // A monomial is also written expanded.
  const formOk = (text, want) => { const f = form(text); return f === want || (want === 'expanded' && f === 'monomial'); };
  return { clean, parse, tryParse, evalAt, equiv, form, formOk, leadNum, tex, pmul, padd, pstr };
})();
