// Math text: how it is shown (KaTeX when loaded, plain text otherwise) and how it is spoken.
// Math inside a prompt is wrapped with T('…') (stored as ⟪…⟫, so $ stays free for money) and uses a small TeX subset: \frac{a}{b}, x^2, \sqrt{x}, \le, \ge, \ne,
// \times, \div, \cdot, \pi. Plain text like "27 + 15 = ?" also works and needs no wrapping.
const MathText = (() => {
  const CFG = (typeof APP !== 'undefined' && APP.speech) || {};
  const ORD = { 2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['fourth', 'fourths'], 5: ['fifth', 'fifths'], 6: ['sixth', 'sixths'], 7: ['seventh', 'sevenths'], 8: ['eighth', 'eighths'], 9: ['ninth', 'ninths'], 10: ['tenth', 'tenths'], 12: ['twelfth', 'twelfths'], 100: ['hundredth', 'hundredths'],
    14: ['fourteenth', 'fourteenths'], 15: ['fifteenth', 'fifteenths'], 16: ['sixteenth', 'sixteenths'], 18: ['eighteenth', 'eighteenths'], 20: ['twentieth', 'twentieths'], 24: ['twenty-fourth', 'twenty-fourths'], 30: ['thirtieth', 'thirtieths'], 40: ['fortieth', 'fortieths'], 1000: ['thousandth', 'thousandths'] };
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', n: 'ⁿ', '-': '⁻' };

  // TeX subset -> readable plain text (the fallback when KaTeX is not available).
  function plain(tex) {
    return String(tex).replace(/[⟦⟧]/g, '')
      .replace(/(\d)\s*\\frac/g, '$1 \\frac')
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2')
      .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)').replace(/√\((\w)\)/g, '√$1')
      .replace(/\^\{([^{}]+)\}/g, (_, e) => [...e].map((c) => SUP[c] || c).join(''))
      .replace(/\^(\w)/g, (_, c) => SUP[c] || '^' + c)
      .replace(/\^\{?\\circ\}?/g, '°').replace(/\\(sin|cos|tan)\b/g, '$1')
      .replace(/\\le\b/g, '≤').replace(/\\ge\b/g, '≥').replace(/\\ne\b/g, '≠')
      .replace(/\\times\b/g, '×').replace(/\\div\b/g, '÷').replace(/\\cdot\b/g, '·').replace(/\\pi\b/g, 'π')
      .replace(/\\left|\\right/g, '').replace(/\\,/g, ' ').replace(/[{}]/g, '');
  }

  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Display: escape, keep line breaks, render ⟪…⟫ with KaTeX (or the plain fallback).
  function html(text) {
    return String(text ?? '').split(/(⟪[^⟫]+⟫)/g).map((seg) => {
      if (seg.length > 2 && seg[0] === '⟪' && seg[seg.length - 1] === '⟫') {
        const tex = seg.slice(1, -1);
        if (typeof katex !== 'undefined') { try { return katex.renderToString(tex, { throwOnError: true, output: 'html' }); } catch { /* fall through */ } }
        return `<span class="mplain">${esc(plain(tex))}</span>`;
      }
      // plain-text powers outside ⟪…⟫ (x^{2}, 6^0, x^(2/3)) are shown raised, never as a caret. A spaced caret
      // ("r ^ (n − 1)", how to type it) is left alone.
      return esc(seg).replace(/⟦([^⟧]*)⟧/g, '<u>$1</u>').replace(/\^\{([^{}]+)\}/g, '<sup>$1</sup>').replace(/\^\(([^()]+)\)/g, '<sup>$1</sup>').replace(/\^([−-]?\d+|[a-zA-Z])/g, '<sup>$1</sup>').replace(/\n/g, '<br>');
    }).join('');
  }

  // Spoken form of a fraction token like "3/4", "1 1/2", "-2/3".
  function fracWords(tok) {
    const m = tok.match(/^(-)?(?:(\d+) )?(\d+)\/(\d+)$/);
    if (!m) return tok;
    const [, neg, whole, n, d] = m;
    let core;
    if (CFG.frac === 'over' || !ORD[d]) core = `${n} over ${d}`;
    else core = `${n} ${ORD[d][+n === 1 ? 0 : 1]}`;
    if (whole) core = `${whole} and ${core}`;
    return (neg ? 'negative ' : '') + core;
  }
  // Spoken form of one number token.
  function numWords(tok) {
    if (tok.includes('/')) return fracWords(tok);
    if (tok.startsWith('-')) return 'negative ' + tok.slice(1);
    return tok;
  }

  // Text -> what the narrator should say, with numbers kept as tokens: "3/4", "27", "-5", "1 1/2", "3.25".
  const ALONE = { '>': 'greater than', '<': 'less than', '=': 'equal to', '≥': 'greater than or equal to', '≤': 'less than or equal to', '≠': 'not equal to' };
  function spoken(text) {
    let t = String(text ?? '').replace(/[⟦⟧]/g, ''); // ⟦underlined⟧ text is read normally
    if (ALONE[t.trim()]) return ALONE[t.trim()]; // a comparison sign on its own (an answer choice)
    t = t.replace(/⟪([^⟫]+)⟫/g, (_, tex) => ' ' + tex
      .replace(/(\d)\s*\\frac/g, '$1 \\frac')
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_m, a, b) => (/^-?\d+$/.test(a) && /^\d+$/.test(b) ? `${a}/${b}` : `${a} over ${b}`))
      .replace(/\^\{?\\circ\}?/g, ' degrees').replace(/\\(sin|cos|tan)\b/g, ' $1 ')
      .replace(/\\sqrt\[3\]\{([^{}]+)\}/g, 'the cube root of $1')
      .replace(/\\sqrt\{([^{}]+)\}/g, 'the square root of $1')
      // algebra: logs, subscripts, absolute value, and a minus sign that starts a quantity ("= -25", "-(x + 2)")
      .replace(/\\log_\{?(\w+)\}?\s*/g, ' log base $1 of ').replace(/_\{?(\w+)\}?/g, ' sub $1').replace(/\|([^|]+)\|/g, ' the absolute value of $1 ')
      .replace(/(^|[=(,<>]|\\le\b|\\ge\b)\s*-\s*(?=[a-z(])/g, '$1 negative ')
      .replace(/(^|[=(,<>]|\\le\b|\\ge\b)\s*-\s+(?=\d)/g, '$1 -')
      .replace(/\^2\b|\^\{2\}/g, ' squared').replace(/\^3\b|\^\{3\}/g, ' cubed').replace(/\^\{?(-?\w+)\}?/g, ' to the power of $1')
      .replace(/\\le\b/g, ' is less than or equal to ').replace(/\\ge\b/g, ' is greater than or equal to ').replace(/\\ne\b/g, ' is not equal to ')
      .replace(/\\times\b|\\cdot\b/g, ' times ').replace(/\\div\b/g, ' divided by ').replace(/\\pi\b/g, ' pi ')
      .replace(/[{}\\]/g, ' ') + ' ');
    t = t
      // superscript powers like 10⁻⁹ or 10¹⁰ (a lone ² or ³ is still "squared" / "cubed")
      .replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => (m === '²' || m === '³' ? m : ' to the power of ' + [...m].map((c) => '-0123456789'['⁻⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)]).join('')))
      .replace(/²/g, ' squared').replace(/³/g, ' cubed').replace(/√(\w+)/g, 'the square root of $1')
      .replace(/\b(\d{1,2}):00\b/g, "$1 o'clock").replace(/\b(\d{1,2}):0(\d)\b/g, '$1 oh $2').replace(/\b(\d{1,2}):(\d\d)\b/g, '$1 $2')
      .replace(/\ba\.m\./g, 'A M').replace(/\bp\.m\./g, 'P M')
      .replace(/\$(\d+)\.(\d\d)\b/g, (_m, d, c) => (+d ? `${d} dollar${+d === 1 ? '' : 's'}${+c ? ` and ${+c} cent${+c === 1 ? '' : 's'}` : ''}` : `${+c} cent${+c === 1 ? '' : 's'}`))
      .replace(/\$(\d+)\b/g, (_m, d) => `${d} dollar${+d === 1 ? '' : 's'}`)
      .replace(/(\d)\s*¢/g, '$1 cents').replace(/(\d) R (\d)/g, '$1 remainder $2')
      .replace(/(\d)\s*%/g, '$1 percent').replace(/(\d)\s*°/g, '$1 degrees')
      .replace(/_{2,}|□/g, ' blank ')
      .replace(/\s[−-]\s/g, ' minus ').replace(/\s\+\s/g, ' plus ').replace(/\s[×·]\s/g, ' times ').replace(/\s÷\s/g, ' divided by ')
      .replace(/\s=\s/g, ' equals ').replace(/\s≤\s/g, ' is less than or equal to ').replace(/\s≥\s/g, ' is greater than or equal to ')
      .replace(/\s<\s/g, ' is less than ').replace(/\s>\s/g, ' is greater than ').replace(/\s≠\s/g, ' is not equal to ')
      .replace(/−/g, '-')
      .replace(/\s+/g, ' ').trim();
    return t;
  }

  // Whole numbers from 1,001 to 20,999 are said as two recorded pieces: "1 thousand" + "129".
  // Bigger ones (to 999,999,999) as "45" + "thousand" + "678", and "1" + "million" + …, so 0–999 clips cover them all.
  function bigSplit(tok) {
    const v = tok.replace(/,/g, '');
    if (/^\d{5,9}$/.test(v) && +v > 20999) {
      const n = +v, m = Math.floor(n / 1e6), k = Math.floor((n % 1e6) / 1000), r = n % 1000, out = [];
      if (m) out.push({ num: String(m) }, { text: 'million' });
      if (k) out.push({ num: String(k) }, { text: 'thousand' });
      if (r) out.push({ num: String(r) });
      return out;
    }
    if (!/^\d{4,5}$/.test(v) || +v % 1000 === 0 || +v > 20999) return [{ num: tok }];
    return [{ num: String(Math.floor(+v / 1000) * 1000) }, { num: String(+v % 1000) }];
  }
  // Split spoken text into phrases and number tokens: [{text:'What is'}, {num:'27'}, {text:'plus'}, …].
  const NUM = /(-?\d+ \d+\/\d+|-?\d+\/\d+|-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d+(?:\.\d+)?)/;
  // With speech.split (Grade 4+), decimals and fractions are said in short recorded pieces instead of one clip each:
  // "4.647" → 4 · point · 6 · 4 · 7, and "8 4/15" → 8 · and · 4 · fifteenths. 0–999 clips plus a few words cover them all.
  function splitNum(tok) {
    let m = tok.match(/^(\d+)\.(\d+)$/);
    if (m) return [{ num: m[1] }, { text: 'point' }, ...m[2].split('').map((d) => ({ num: d }))];
    m = tok.match(/^(?:(\d+) )?(\d+)\/(\d+)$/);
    if (m) {
      const [, whole, n, d] = m, out = whole ? [{ num: whole }, { text: 'and' }] : [];
      if (CFG.frac === 'over' || !ORD[d]) return [...out, { num: n }, { text: 'over' }, { num: d }];
      return [...out, { num: n }, { text: ORD[d][+n === 1 ? 0 : 1] }];
    }
    return bigSplit(tok);
  }
  function pieces(text) {
    return spoken(text).split(new RegExp(NUM.source, 'g')).flatMap((s, i) => (i % 2 ? (CFG.split ? splitNum(s) : bigSplit(s)) : [{ text: s.trim() }]))
      .filter((p) => p.num || /[a-z]/i.test(p.text));
  }

  // The full sentence a narrator reads, with each number token turned into words ("3/4" -> "3 fourths").
  const sayWords = (text) => spoken(text).replace(new RegExp(NUM.source, 'g'), (m) => numWords(m));

  return { html, plain, spoken, pieces, numWords, sayWords, hasNum: (t) => NUM.test(spoken(t)) };
})();
// Wrap TeX for a prompt: T('\\frac{3}{4}') -> '⟪\\frac{3}{4}⟫'.
const T = (tex) => `⟪${tex}⟫`;
