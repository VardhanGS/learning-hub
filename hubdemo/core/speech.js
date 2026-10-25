// Math text: how it is shown (KaTeX when loaded, plain text otherwise) and how it is spoken.
// Math inside a prompt is wrapped with T('…') (stored as ⟪…⟫, so $ stays free for money) and uses a small TeX subset: \frac{a}{b}, x^2, \sqrt{x}, \le, \ge, \ne,
// \times, \div, \cdot, \pi. Plain text like "27 + 15 = ?" also works and needs no wrapping.
const MathText = (() => {
  const CFG = (typeof APP !== 'undefined' && APP.speech) || {};
  const ORD = { 2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['fourth', 'fourths'], 5: ['fifth', 'fifths'], 6: ['sixth', 'sixths'], 7: ['seventh', 'sevenths'], 8: ['eighth', 'eighths'], 9: ['ninth', 'ninths'], 10: ['tenth', 'tenths'], 12: ['twelfth', 'twelfths'], 100: ['hundredth', 'hundredths'] };
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', n: 'ⁿ', '-': '⁻' };

  // TeX subset -> readable plain text (the fallback when KaTeX is not available).
  function plain(tex) {
    return String(tex)
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2')
      .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)').replace(/√\((\w)\)/g, '√$1')
      .replace(/\^\{([^{}]+)\}/g, (_, e) => [...e].map((c) => SUP[c] || c).join(''))
      .replace(/\^(\w)/g, (_, c) => SUP[c] || '^' + c)
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
      return esc(seg).replace(/\n/g, '<br>');
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
  function spoken(text) {
    let t = String(text ?? '');
    t = t.replace(/⟪([^⟫]+)⟫/g, (_, tex) => ' ' + tex
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_m, a, b) => (/^-?\d+$/.test(a) && /^\d+$/.test(b) ? `${a}/${b}` : `${a} over ${b}`))
      .replace(/\\sqrt\{([^{}]+)\}/g, 'the square root of $1')
      .replace(/\^2\b|\^\{2\}/g, ' squared').replace(/\^3\b|\^\{3\}/g, ' cubed').replace(/\^\{?(-?\w+)\}?/g, ' to the power of $1')
      .replace(/\\le\b/g, ' is less than or equal to ').replace(/\\ge\b/g, ' is greater than or equal to ').replace(/\\ne\b/g, ' is not equal to ')
      .replace(/\\times\b|\\cdot\b/g, ' times ').replace(/\\div\b/g, ' divided by ').replace(/\\pi\b/g, ' pi ')
      .replace(/[{}\\]/g, ' ') + ' ');
    t = t
      .replace(/²/g, ' squared').replace(/³/g, ' cubed').replace(/√(\w+)/g, 'the square root of $1')
      .replace(/(\d)\s*¢/g, '$1 cents').replace(/\$(\d+(?:\.\d+)?)/g, '$1 dollars')
      .replace(/(\d)\s*%/g, '$1 percent').replace(/(\d)\s*°/g, '$1 degrees')
      .replace(/_{2,}|□/g, ' blank ')
      .replace(/\s[−-]\s/g, ' minus ').replace(/\s\+\s/g, ' plus ').replace(/\s[×·]\s/g, ' times ').replace(/\s÷\s/g, ' divided by ')
      .replace(/\s=\s/g, ' equals ').replace(/\s≤\s/g, ' is less than or equal to ').replace(/\s≥\s/g, ' is greater than or equal to ')
      .replace(/\s<\s/g, ' is less than ').replace(/\s>\s/g, ' is greater than ').replace(/\s≠\s/g, ' is not equal to ')
      .replace(/−/g, '-')
      .replace(/\s+/g, ' ').trim();
    return t;
  }

  // Split spoken text into phrases and number tokens: [{text:'What is'}, {num:'27'}, {text:'plus'}, …].
  const NUM = /(-?\d+ \d+\/\d+|-?\d+\/\d+|-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d+(?:\.\d+)?)/;
  function pieces(text) {
    return spoken(text).split(new RegExp(NUM.source, 'g')).map((s, i) => (i % 2 ? { num: s } : { text: s.trim() }))
      .filter((p) => p.num || /[a-z]/i.test(p.text));
  }

  // The full sentence a narrator reads, with each number token turned into words ("3/4" -> "3 fourths").
  const sayWords = (text) => spoken(text).replace(new RegExp(NUM.source, 'g'), (m) => numWords(m));

  return { html, plain, spoken, pieces, numWords, sayWords, hasNum: (t) => NUM.test(spoken(t)) };
})();
// Wrap TeX for a prompt: T('\\frac{3}{4}') -> '⟪\\frac{3}{4}⟫'.
const T = (tex) => `⟪${tex}⟫`;
