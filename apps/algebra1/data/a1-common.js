// Shared pieces for Algebra 1 Quest. Every answer is computed in code; meta {kind, args} lets tools/validate.js
// recompute it independently (e.g. by solving the equation itself, or checking that an answer equals the question's
// expression at many random points). Goal areas follow the MAP Growth Algebra 1 course test (NWEA): Real Numbers;
// Expressions, Equations, and Inequalities; Patterns, Functions, and Graphing. Difficulty tags (rit) are hand-set
// estimates for MAP Algebra 1 (Phase 7), not NWEA calibrations.
const A1 = (() => {
  // Tag a question with its standard, difficulty, and goal area. A mistake note that happens to equal the answer
  // (e.g. "−x" when x = 0) is dropped, so a right answer is never called a mistake.
  function tag(q, std, rit, goal) {
    if (q.miss) for (const k of Object.keys(q.miss)) {
      const same = q.t === 'num' ? N.eq(N.parse(k), N.parse(q.a)) : q.t === 'expr' ? Alg.equiv(k, q.a) : q.t === 'mc' ? k === q.a || !q.opts.includes(k) : false;
      if (same) delete q.miss[k];
    }
    return Object.assign(q, { std, rit, goal });
  }
  const nz = (lo, hi) => U.intWhere(lo, hi, (v) => v !== 0);
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // A number as text: integers plain, fractions as a/b in lowest terms (sign in front).
  function frac(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; }
  // Fraction as TeX for display
  function ftex(n, d = 1) { const s = frac(n, d); if (!s.includes('/')) return s; const [a, b] = s.split('/'); return a.startsWith('-') ? `-\\frac{${a.slice(1)}}{${b}}` : `\\frac{${a}}{${b}}`; }
  // Linear term text: (3, 'x') → "3x", (-1, 'x') → "-x", (0) → ""
  const term = (c, v = 'x') => (c === 0 ? '' : `${c === -1 ? '-' : c === 1 ? '' : c}${v}`);
  // "ax + b" in typed form with clean signs (b may be 0)
  function lin(a, b, v = 'x') {
    const t = term(a, v);
    if (!t) return String(b);
    return b === 0 ? t : `${t} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
  }
  // TeX of a typed expression (for prompts): uses Alg.tex
  const tx = (s) => T(Alg.tex(s));
  // Distinct picks from a pool, as strings
  const pickN = (fn, n) => { const out = new Set(); let g = 0; while (out.size < n && g++ < 200) out.add(fn()); return [...out]; };
  const LETTERS = ['A', 'B', 'C', 'D'];
  // Several SVG pictures as answer choices labeled A–D: a 2 × 2 grid, or one column for wide pictures like number
  // lines (so their numbers stay big enough to read on a phone).
  function choicesFig(svgs) {
    const dims = svgs.map((sv) => { const vb = sv.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); return [+vb[1], +vb[2]]; });
    const wide = dims.every(([w, h]) => w / h > 3), cols = wide ? 1 : 2, cw = wide ? 400 : 200, chh = wide ? 112 : 210, iw = wide ? 360 : 186, ih = wide ? 90 : 176;
    let body = '';
    svgs.forEach((sv, i) => {
      const [w, h] = dims[i], k = Math.min(iw / w, ih / h), col = i % cols, row = Math.floor(i / cols), x0 = col * cw, y0 = row * chh;
      const ix = wide ? x0 + 30 + (iw - w * k) / 2 : x0 + (cw - w * k) / 2, iy = wide ? y0 + (chh - h * k) / 2 : y0 + 30 + (ih - h * k) / 2;
      body += `<rect x="${x0 + 2}" y="${y0 + 2}" width="${cw - 6}" height="${chh - 6}" rx="12" class="pc-cell"/><text x="${x0 + 14}" y="${y0 + 26}" class="fg-text" font-size="18">${LETTERS[i]}</text><g transform="translate(${ix} ${iy}) scale(${k})">${sv.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>`;
    });
    return `<svg viewBox="0 0 ${cols * cw} ${Math.ceil(svgs.length / cols) * chh}" width="${cols * cw}" role="img" aria-label="Choices ${LETTERS.slice(0, svgs.length).join(', ')}">${body}</svg>`;
  }
  // A picture-choice question: right picture + wrong pictures, shuffled; answer is the letter.
  function picQ(q, right, wrongs, extra) {
    const order = U.shuffle([0, 1, 2, 3].slice(0, wrongs.length + 1)), svgs = [right, ...wrongs], pics = order.map((i) => svgs[i]);
    return U.mcFixed(q, LETTERS[order.indexOf(0)], LETTERS.slice(0, pics.length), { fig: choicesFig(pics), meta: { kind: 'picChoice', args: [order.indexOf(0)] }, ...extra });
  }
  // Balance-scale picture for an equation (left = right).
  const balance = (left, right) => Fig.table([['Left side', '=', 'Right side'], [left, '=', right]], '⚖️ Keep both sides balanced');
  // Algebra-tile style area model for (a x + b)(c x + d) with labels.
  function areaAlg(a, b, c, d, hide = false) {
    const t = (k, v) => (k === 0 ? '' : `${k === 1 ? '' : k === -1 ? '−' : String(k).replace('-', '−')}${v}`), n = (v) => String(v).replace('-', '−');
    const cell = (p, q) => (hide ? '?' : p);
    const rowsH = [t(c, 'x'), n(d)], colsH = [t(a, 'x'), n(b)];
    return Fig.table([['', ...colsH], [rowsH[0], cell(t(a * c, 'x²')), cell(t(b * c, 'x'))], [rowsH[1], cell(t(a * d, 'x')), cell(n(b * d))]], 'Area model: multiply each row by each column');
  }
  // Real minus signs for text choices; multiple choice with them (also in the miss keys).
  const fx = (s) => String(s).replace(/-(?=\d)/g, '−');
  function mcN(q, a, w, extra = {}) { const o = U.mc(q, fx(a), w.map(fx), extra); if (extra.miss) o.miss = Object.fromEntries(Object.entries(extra.miss).map(([k, v]) => [fx(k), v])); return o; }
  // Keypad for a number answer: always a minus key in Algebra 1 (so the keys never hint at the sign).
  const kp = (a) => ['neg', String(a).includes('/') && 'frac', String(a).includes('.') && 'dec'].filter(Boolean).join(',');
  const lv = (title, std, desc, fns) => ({ title, std, desc, gen: () => U.mix(8, fns) });
  return { tag, nz, gcd, frac, ftex, term, lin, tx, pickN, LETTERS, choicesFig, picQ, balance, areaAlg, lv, fx, mcN, kp };
})();
const A1_SKILLS = [];
