// Pictures drawn in code for questions (SVG strings). Colors come from CSS classes, so they follow light/dark mode.
const Fig = (() => {
  const svg = (w, h, body, label) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="${label}">${body}</svg>`;

  // Base-ten blocks: hundreds (flats), tens (rods), ones (cubes).
  function blocks(n) {
    const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
    const u = 9; // one cube
    let x = 4, body = '';
    for (let i = 0; i < h; i++) {
      body += `<rect x="${x}" y="4" width="${u * 10}" height="${u * 10}" class="fg-fill"/>`;
      for (let k = 1; k < 10; k++) body += `<path d="M${x + k * u} 4 v${u * 10} M${x} ${4 + k * u} h${u * 10}" class="fg-stroke" style="stroke-width:1"/>`;
      x += u * 10 + 10;
    }
    for (let i = 0; i < t; i++) {
      body += `<rect x="${x}" y="4" width="${u}" height="${u * 10}" class="fg-fill"/>`;
      for (let k = 1; k < 10; k++) body += `<path d="M${x} ${4 + k * u} h${u}" class="fg-stroke" style="stroke-width:1"/>`;
      x += u + 6;
    }
    if (t) x += 6;
    for (let i = 0; i < o; i++) body += `<rect x="${x + (i % 2) * (u + 4)}" y="${4 + u * 10 - (Math.floor(i / 2) + 1) * (u + 4) + 4}" width="${u}" height="${u}" class="fg-fill"/>`;
    if (o) x += 2 * (u + 4);
    return svg(Math.max(40, x + 4), u * 10 + 8, body, `${h} hundreds, ${t} tens, ${o} ones`);
  }

  // A shape cut into equal parts with some shaded (for "what fraction is shaded?").
  function fraction(shape, parts, shaded, rows = 1) {
    let body = '';
    if (shape === 'circle') {
      const R = 60, c = 64;
      body = [...Array(parts)].map((_, i) => {
        const a0 = (i / parts) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
        const p = (a) => `${(c + R * Math.cos(a)).toFixed(2)} ${(c + R * Math.sin(a)).toFixed(2)}`;
        return parts === 1 ? `<circle cx="${c}" cy="${c}" r="${R}" class="${i < shaded ? 'fg-fill' : 'fg-stroke'}"/>` : `<path d="M${c} ${c} L${p(a0)} A${R} ${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z" class="${i < shaded ? 'fg-fill' : 'fg-stroke'}"/>`;
      }).join('');
      return svg(128, 128, body, `A circle cut into ${parts} equal parts with ${shaded} shaded`);
    }
    const cols = parts / rows, W = 240, H = rows === 1 ? 70 : 46 * rows, w = W / cols, h = H / rows;
    body = [...Array(parts)].map((_, i) => `<rect x="${3 + (i % cols) * w}" y="${3 + Math.floor(i / cols) * h}" width="${w}" height="${h}" class="${i < shaded ? 'fg-fill' : 'fg-stroke'}" style="${i < shaded ? '' : 'fill:var(--surface)'}"/>`).join('');
    return svg(W + 6, H + 6, body, `A rectangle cut into ${parts} equal parts with ${shaded} shaded`);
  }

  // Two numbers as blocks with a + between them.
  function addBlocks(a, b) {
    const A = blocks(a), B = blocks(b);
    const w = (x) => +x.match(/viewBox="0 0 (\d+(?:\.\d+)?)/)[1];
    const inner = (x) => x.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    const wa = w(A), wb = w(B), H = 98;
    return `<svg viewBox="0 0 ${wa + wb + 40} ${H}" width="${wa + wb + 40}" role="img" aria-label="${a} plus ${b} in blocks"><g>${inner(A)}</g><text x="${wa + 20}" y="${H / 2 + 10}" class="fg-text" font-size="30" text-anchor="middle">+</text><g transform="translate(${wa + 40} 0)">${inner(B)}</g></svg>`;
  }

  // ---- clock face (static) ----
  function clock(h, m, size = 180) {
    const c = 100, R = 92;
    let body = `<circle cx="${c}" cy="${c}" r="${R}" class="ck-face"/>`;
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 - 90) * Math.PI / 180, r1 = i % 5 ? R - 6 : R - 11;
      body += `<line x1="${c + r1 * Math.cos(a)}" y1="${c + r1 * Math.sin(a)}" x2="${c + (R - 2) * Math.cos(a)}" y2="${c + (R - 2) * Math.sin(a)}" class="fg-stroke" style="stroke-width:${i % 5 ? 1.5 : 3}"/>`;
    }
    for (let n = 1; n <= 12; n++) { const a = (n * 30 - 90) * Math.PI / 180; body += `<text x="${c + 70 * Math.cos(a)}" y="${c + 70 * Math.sin(a) + 7}" class="fg-text" font-size="20" text-anchor="middle">${n}</text>`; }
    body += hands(h, m, c);
    return svg(200, 200, body, `A clock showing ${h}:${String(m).padStart(2, '0')}`).replace(`width="200"`, `width="${size}"`);
  }
  function hands(h, m, c = 100) {
    const ha = (((h % 12) + m / 60) * 30 - 90) * Math.PI / 180, ma = (m * 6 - 90) * Math.PI / 180;
    return `<line x1="${c}" y1="${c}" x2="${c + 46 * Math.cos(ha)}" y2="${c + 46 * Math.sin(ha)}" class="ck-hour"/>
      <line x1="${c}" y1="${c}" x2="${c + 74 * Math.cos(ma)}" y2="${c + 74 * Math.sin(ma)}" class="ck-min"/><circle cx="${c}" cy="${c}" r="6" class="ck-pin"/>`;
  }

  // ---- coins and bills (drawn, not photos) ----
  const COIN = { p: { v: 1, r: 19, name: 'penny', cls: 'cn-copper', lbl: '1¢' }, n: { v: 5, r: 21, name: 'nickel', cls: 'cn-silver', lbl: '5¢' },
    d: { v: 10, r: 17, name: 'dime', cls: 'cn-silver', lbl: '10¢' }, q: { v: 25, r: 24, name: 'quarter', cls: 'cn-silver', lbl: '25¢' }, b: { v: 100, r: 0, name: 'dollar bill', cls: 'cn-bill', lbl: '$1' } };
  function coinShape(k, x, y) {
    const C = COIN[k];
    if (k === 'b') return `<rect x="${x - 34}" y="${y - 18}" width="68" height="36" rx="5" class="${C.cls}"/><text x="${x}" y="${y + 6}" class="cn-text" font-size="16" text-anchor="middle">$1</text>`;
    return `<circle cx="${x}" cy="${y}" r="${C.r}" class="${C.cls}"/><circle cx="${x}" cy="${y}" r="${C.r - 4}" class="cn-rim"/><text x="${x}" y="${y + 5}" class="cn-text" font-size="${C.r > 18 ? 13 : 11}" text-anchor="middle">${C.lbl}</text>`;
  }
  function coins(list) {
    let x = 0, body = '';
    list.forEach((k) => { const w = k === 'b' ? 72 : COIN[k].r * 2 + 6; body += coinShape(k, x + w / 2, 30); x += w; });
    return svg(Math.max(60, x), 60, body, list.map((k) => COIN[k].name).join(', '));
  }
  const coinSvg = (k) => svg(k === 'b' ? 72 : COIN[k].r * 2 + 4, 52, coinShape(k, k === 'b' ? 36 : COIN[k].r + 2, 26), COIN[k].name);

  // ---- ruler with an object above it ----
  function ruler(len, unit = 'in', start = 0, max = null, obj = 'pencil') {
    max = max || Math.max(6, start + len + 1);
    const u = unit === 'cm' ? 34 : 52, W = max * u + 30, x0 = 15;
    let body = `<rect x="${x0}" y="58" width="${max * u}" height="40" class="ru-body"/>`;
    for (let i = 0; i <= max; i++) {
      body += `<line x1="${x0 + i * u}" y1="58" x2="${x0 + i * u}" y2="76" class="fg-stroke"/><text x="${x0 + i * u}" y="93" class="fg-text" font-size="14" text-anchor="middle">${i}</text>`;
      if (i < max) body += `<line x1="${x0 + i * u + u / 2}" y1="58" x2="${x0 + i * u + u / 2}" y2="68" class="fg-stroke" style="stroke-width:1.5"/>`;
    }
    const xa = x0 + start * u, xb = x0 + (start + len) * u;
    body += obj === 'pencil'
      ? `<path d="M${xa} 30 h${xb - xa - 22} l22 10 l-22 10 h-${xb - xa - 22} z" class="fg-fill"/><path d="M${xb} 40 l-9 -4 v8 z" class="ck-pin"/>`
      : `<rect x="${xa}" y="26" width="${xb - xa}" height="24" rx="8" class="fg-fill"/>`;
    body += `<line x1="${xa}" y1="20" x2="${xa}" y2="58" class="ru-guide"/><line x1="${xb}" y1="20" x2="${xb}" y2="58" class="ru-guide"/>`;
    return svg(W, 100, body, `An object measured on a ruler in ${unit === 'cm' ? 'centimeters' : 'inches'}`);
  }

  // ---- graphs ----
  // Bar graph: cats [[label, value]], scale = value per grid line.
  function barGraph(title, cats, scale = 1, max = null) {
    max = max || Math.ceil(Math.max(...cats.map((c) => c[1])) / scale) * scale + scale;
    const H = 180, bw = 56, gap = 26, x0 = 46, W = x0 + cats.length * (bw + gap) + 10, y0 = 26;
    const y = (v) => y0 + H - (v / max) * H;
    let body = `<text x="${W / 2}" y="16" class="fg-text" font-size="15" text-anchor="middle">${title}</text>`;
    for (let v = 0; v <= max; v += scale) body += `<line x1="${x0}" y1="${y(v)}" x2="${W - 6}" y2="${y(v)}" class="gr-grid"/><text x="${x0 - 8}" y="${y(v) + 5}" class="fg-text" font-size="13" text-anchor="end">${v}</text>`;
    cats.forEach(([lbl, v], i) => {
      const x = x0 + gap / 2 + i * (bw + gap);
      body += `<rect x="${x}" y="${y(v)}" width="${bw}" height="${y(0) - y(v)}" class="gr-bar gr-b${i % 4}"/><text x="${x + bw / 2}" y="${y0 + H + 20}" class="fg-text" font-size="13" text-anchor="middle">${lbl}</text>`;
    });
    body += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y(0)}" class="fg-stroke"/><line x1="${x0}" y1="${y(0)}" x2="${W - 6}" y2="${y(0)}" class="fg-stroke"/>`;
    return svg(W, y0 + H + 30, body, `Bar graph: ${title}. ` + cats.map(([l, v]) => `${l} ${v}`).join(', '));
  }
  // Picture graph: each symbol stands for `per`.
  function picGraph(title, cats, icon, per = 1) {
    const rowH = 38, W = 110 + Math.max(...cats.map((c) => Math.ceil(c[1] / per))) * 34 + 10;
    let body = `<text x="8" y="18" class="fg-text" font-size="15">${title}</text>`;
    cats.forEach(([lbl, v], i) => {
      const yy = 30 + i * rowH;
      body += `<text x="8" y="${yy + 24}" class="fg-text" font-size="14">${lbl}</text><line x1="100" y1="${yy}" x2="100" y2="${yy + rowH}" class="gr-grid"/>`;
      for (let k = 0; k < v / per; k++) body += `<text x="${118 + k * 34}" y="${yy + 26}" font-size="24" text-anchor="middle">${icon}</text>`;
    });
    const yk = 30 + cats.length * rowH + 22;
    body += `<text x="8" y="${yk}" class="fg-text" font-size="13">Key: ${icon} = ${per}</text>`;
    return svg(Math.max(W, 200), yk + 8, body, `Picture graph: ${title}. ` + cats.map(([l, v]) => `${l} ${v}`).join(', ') + `. Each picture is ${per}.`);
  }
  // Line plot: values on a number line with an X for each data point. den = parts per unit (2 = halves).
  function linePlot(title, min, max, values, den = 1, unit = '') {
    const n = (max - min) * den, W = 430, pad = 26, x = (v) => pad + ((v - min) * den / n) * (W - 2 * pad);
    const counts = {};
    values.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
    const top = Math.max(0, ...Object.values(counts)), base = 40 + top * 22; // an empty plot ("make a line plot") has no X yet
    let body = `<text x="${W / 2}" y="16" class="fg-text" font-size="15" text-anchor="middle">${title}</text><line x1="${pad - 10}" y1="${base}" x2="${W - pad + 10}" y2="${base}" class="fg-stroke"/>`;
    for (let i = 0; i <= n; i++) {
      const v = min + i / den;
      const whole = Number.isInteger(v);
      body += `<line x1="${x(v)}" y1="${base - 7}" x2="${x(v)}" y2="${base + 7}" class="fg-stroke"/>`;
      const lbl = whole ? String(v) : (den === 2 ? `${Math.floor(v) || ''} ½` : den === 4 ? `${Math.floor(v) || ''} ${['', '¼', '½', '¾'][Math.round((v % 1) * 4)]}` : den === 8 ? `${Math.floor(v) || ''} ${['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'][Math.round((v % 1) * 8)]}` : '');
      body += `<text x="${x(v)}" y="${base + 25}" class="fg-text" font-size="${whole ? 17 : den >= 4 ? 11 : 14}" text-anchor="middle">${lbl.trim()}</text>`;
    }
    Object.entries(counts).forEach(([v, c]) => { for (let k = 0; k < c; k++) body += `<text x="${x(+v)}" y="${base - 12 - k * 22}" class="lp-x" font-size="24" text-anchor="middle">✕</text>`; });
    if (unit) body += `<text x="${W / 2}" y="${base + 46}" class="fg-text" font-size="13" text-anchor="middle">${unit}</text>`;
    return svg(W, base + (unit ? 54 : 34), body, `Line plot: ${title}`);
  }

  // ---- arrays, area, shapes ----
  function array(rows, cols, icon = null) {
    const g = 34, W = cols * g + 10, H = rows * g + 10;
    let body = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) body += icon ? `<text x="${5 + c * g + g / 2}" y="${5 + r * g + g / 2 + 9}" font-size="24" text-anchor="middle">${icon}</text>` : `<circle cx="${5 + c * g + g / 2}" cy="${5 + r * g + g / 2}" r="11" class="fg-fill"/>`;
    return svg(W, H, body, `An array with ${rows} rows and ${cols} columns`);
  }
  // A rectangle: grid of unit squares, or just side labels (labels = true).
  function rect(w, h, { grid = true, labels = false, unit = '', hLabel = null } = {}) {
    const g = Math.min(32, 240 / Math.max(w, h)), x0 = labels ? 62 : 4, y0 = 4, W = w * g, H = h * g;
    let body = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" class="fg-fill"/>`;
    if (grid) { for (let i = 1; i < w; i++) body += `<line x1="${x0 + i * g}" y1="${y0}" x2="${x0 + i * g}" y2="${y0 + H}" class="fg-stroke" style="stroke-width:1.5"/>`; for (let j = 1; j < h; j++) body += `<line x1="${x0}" y1="${y0 + j * g}" x2="${x0 + W}" y2="${y0 + j * g}" class="fg-stroke" style="stroke-width:1.5"/>`; }
    if (labels) body += `<text x="${x0 + W / 2}" y="${y0 + H + 22}" class="fg-text" font-size="15" text-anchor="middle">${w} ${unit}</text><text x="${x0 - 8}" y="${y0 + H / 2 + 5}" class="fg-text" font-size="15" text-anchor="end">${hLabel ?? `${h} ${unit}`}</text>`;
    return svg(x0 + W + 6, y0 + H + (labels ? 30 : 6), body, `A rectangle ${w} by ${h}`);
  }
  const SHAPES = {
    triangle: [[60, 8], [112, 100], [8, 100]], square: [[14, 14], [106, 14], [106, 106], [14, 106]], rectangle: [[4, 26], [146, 26], [146, 96], [4, 96]],
    rhombus: [[60, 4], [112, 60], [60, 116], [8, 60]], trapezoid: [[36, 20], [104, 20], [136, 100], [4, 100]], pentagon: [[60, 6], [114, 46], [94, 110], [26, 110], [6, 46]],
    hexagon: [[32, 8], [88, 8], [116, 60], [88, 112], [32, 112], [4, 60]], parallelogram: [[34, 20], [146, 20], [116, 100], [4, 100]],
  };
  function shape(kind, turn = 0) {
    if (kind === 'circle') return svg(120, 120, '<circle cx="60" cy="60" r="54" class="fg-fill"/>', 'a circle');
    if (kind === 'cube') return svg(120, 120, '<path d="M20 40 L60 20 L100 40 L100 90 L60 110 L20 90 Z" class="fg-fill"/><path d="M20 40 L60 60 L100 40 M60 60 L60 110" class="fg-stroke"/>', 'a cube');
    const a = (turn * Math.PI) / 180, base = SHAPES[kind];
    const cx = base.reduce((t, p) => t + p[0], 0) / base.length, cy = base.reduce((t, p) => t + p[1], 0) / base.length;
    let pts = base.map(([x, y]) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)]);
    const mx = Math.min(...pts.map((p) => p[0])) - 6, my = Math.min(...pts.map((p) => p[1])) - 6;
    pts = pts.map(([x, y]) => [+(x - mx).toFixed(1), +(y - my).toFixed(1)]);
    const W = Math.max(...pts.map((p) => p[0])) + 6, H = Math.max(...pts.map((p) => p[1])) + 6;
    return svg(W, H, `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" class="fg-fill"/>`, `a ${kind}`);
  }

  // ---- ten-frames: a red counters, then b blue counters; the last `away` counters are crossed out ----
  function tenFrames(a, b = 0, away = 0) {
    const total = a + b, frames = Math.max(1, Math.ceil(total / 10)), c = 30, W = frames * (5 * c + 16) - 16 + 8, H = 2 * c + 8;
    let body = '';
    for (let f = 0; f < frames; f++) {
      const x0 = 4 + f * (5 * c + 16);
      body += `<rect x="${x0}" y="4" width="${5 * c}" height="${2 * c}" class="fg-stroke" style="fill:var(--surface)"/>`;
      for (let k = 1; k < 5; k++) body += `<line x1="${x0 + k * c}" y1="4" x2="${x0 + k * c}" y2="${4 + 2 * c}" class="fg-stroke" style="stroke-width:1.5"/>`;
      body += `<line x1="${x0}" y1="${4 + c}" x2="${x0 + 5 * c}" y2="${4 + c}" class="fg-stroke" style="stroke-width:1.5"/>`;
      for (let k = 0; k < 10; k++) {
        const i = f * 10 + k;
        if (i >= total) break;
        const cx = x0 + (k % 5) * c + c / 2, cy = 4 + Math.floor(k / 5) * c + c / 2;
        body += `<circle cx="${cx}" cy="${cy}" r="${c / 2 - 5}" class="${i < a ? 'tf-a' : 'tf-b'}"/>`;
        if (i >= total - away) body += `<path d="M${cx - 9} ${cy - 9} L${cx + 9} ${cy + 9} M${cx + 9} ${cy - 9} L${cx - 9} ${cy + 9}" class="tf-x"/>`;
      }
    }
    return svg(W, H, body, `Ten-frames showing ${a}${b ? ` and ${b}` : ''}${away ? `, ${away} crossed out` : ''}`);
  }

  // ---- bar model: a whole bar over its parts (part-part-whole). Values may be '?' ----
  function barModel(whole, parts, label = '') {
    const nums = parts.map((p) => (typeof p === 'number' ? p : null));
    const known = nums.filter((v) => v != null).reduce((t, v) => t + v, 0);
    const W = 420, x0 = 6, tot = typeof whole === 'number' ? whole : known * 1.6 || 10;
    const widths = parts.map((p) => (typeof p === 'number' ? (p / tot) * W : Math.max(60, W - (known / tot) * W)));
    const scale = W / widths.reduce((t, w) => t + w, 0);
    let x = x0, body = `<rect x="${x0}" y="6" width="${W}" height="40" rx="6" class="bm-whole"/><text x="${x0 + W / 2}" y="33" class="fg-text" font-size="20" text-anchor="middle">${whole}</text>`;
    parts.forEach((p, i) => {
      const w = widths[i] * scale;
      body += `<rect x="${x}" y="56" width="${w}" height="40" rx="6" class="${p === '?' ? 'bm-unknown' : 'bm-part'} bm-p${i % 3}"/><text x="${x + w / 2}" y="83" class="fg-text" font-size="20" text-anchor="middle">${p}</text>`;
      x += w;
    });
    if (label) body += `<text x="${x0 + W / 2}" y="122" class="fg-text" font-size="15" text-anchor="middle" style="opacity:.75">${label}</text>`;
    return svg(W + 12, label ? 130 : 102, body, `Bar model: ${whole} is made of ${parts.join(' and ')}`);
  }
  // ---- compare bars: two lengths with the difference marked '?' ----
  function compareBars(a, b, la, lb, unit = '') {
    const W = 400, big = Math.max(a, b), wa = (a / big) * W, wb = (b / big) * W, x0 = 70;
    let body = `<text x="4" y="31" class="fg-text" font-size="15">${la}</text><rect x="${x0}" y="10" width="${wa}" height="32" rx="6" class="bm-part bm-p0"/><text x="${x0 + wa / 2}" y="32" class="fg-text" font-size="17" text-anchor="middle">${a}${unit}</text>`;
    body += `<text x="4" y="79" class="fg-text" font-size="15">${lb}</text><rect x="${x0}" y="58" width="${wb}" height="32" rx="6" class="bm-part bm-p1"/><text x="${x0 + wb / 2}" y="80" class="fg-text" font-size="17" text-anchor="middle">${b}${unit}</text>`;
    const lo = Math.min(wa, wb), hi = Math.max(wa, wb), yy = a > b ? 58 : 10;
    body += `<rect x="${x0 + lo}" y="${yy}" width="${hi - lo}" height="32" rx="6" class="bm-unknown"/><text x="${x0 + (lo + hi) / 2}" y="${yy + 22}" class="fg-text" font-size="17" text-anchor="middle">?</text>`;
    return svg(x0 + W + 6, 96, body, `${la} ${a}, ${lb} ${b}: how much more?`);
  }

  // ---- number bond: a whole and its two parts ----
  function bond(whole, a, b) {
    const circ = (x, y, v, cls) => `<circle cx="${x}" cy="${y}" r="28" class="${cls}"/><text x="${x}" y="${y + 8}" class="fg-text" font-size="22" text-anchor="middle">${v}</text>`;
    return svg(200, 140, `<line x1="100" y1="36" x2="44" y2="104" class="fg-stroke"/><line x1="100" y1="36" x2="156" y2="104" class="fg-stroke"/>${circ(100, 34, whole, 'bm-whole')}${circ(44, 104, a, 'bm-part bm-p0')}${circ(156, 104, b, 'bm-part bm-p1')}`, `Number bond: ${whole} is ${a} and ${b}`);
  }

  // ---- equal groups: g circles with n dots each ----
  function groups(g, n, icon = null) {
    // At most 5 groups per row, so many groups still look big enough on a phone.
    const per = Math.ceil(Math.sqrt(n)), d = 18, r = (per * d) / 2 + 14, perRow = g > 5 ? Math.ceil(g / 2) : g;
    const W = perRow * (2 * r + 10) + 4, rowsG = Math.ceil(g / perRow);
    let body = '';
    for (let k = 0; k < g; k++) {
      const cx = 4 + r + (k % perRow) * (2 * r + 10), cy = r + 4 + Math.floor(k / perRow) * (2 * r + 10);
      body += `<circle cx="${cx}" cy="${cy}" r="${r}" class="gp-ring"/>`;
      const rows = Math.ceil(n / per);
      for (let i = 0; i < n; i++) {
        const x = cx - ((per - 1) * d) / 2 + (i % per) * d, y = cy - ((rows - 1) * d) / 2 + Math.floor(i / per) * d;
        body += icon ? `<text x="${x}" y="${y + 6}" font-size="15" text-anchor="middle">${icon}</text>` : `<circle cx="${x}" cy="${y}" r="6.5" class="tf-a"/>`;
      }
    }
    return svg(W, rowsG * (2 * r + 10) - 2, body, `${g} groups of ${n}`);
  }
  // ---- groups of ten-rods (for 4 × 30) ----
  function tensGroups(g, tensEach) {
    const u = 8, gw = tensEach * (u + 4) + 14, W = g * (gw + 10);
    let body = '';
    for (let k = 0; k < g; k++) {
      const x0 = k * (gw + 10) + 4;
      body += `<rect x="${x0}" y="4" width="${gw}" height="${10 * u + 16}" rx="12" class="gp-ring"/>`;
      for (let t = 0; t < tensEach; t++) body += `<rect x="${x0 + 9 + t * (u + 4)}" y="12" width="${u}" height="${10 * u}" class="fg-fill"/>`;
    }
    return svg(W, 10 * u + 26, body, `${g} groups of ${tensEach} tens`);
  }

  // ---- place-value chart: numbers stacked in hundreds, tens, ones columns ----
  function placeChart(nums, op = '', highlight = null) {
    const cols = ['Hundreds', 'Tens', 'Ones'], cw = 92, x0 = 40, rows = nums.length;
    let body = cols.map((c, i) => `<rect x="${x0 + i * cw}" y="4" width="${cw}" height="30" class="pc-head ${highlight === i ? 'pc-hi' : ''}"/><text x="${x0 + i * cw + cw / 2}" y="25" class="fg-text" font-size="14" text-anchor="middle">${c}</text>`).join('');
    nums.forEach((n, r) => {
      const d = String(n).padStart(3, ' ').split('');
      d.forEach((ch, i) => { body += `<rect x="${x0 + i * cw}" y="${34 + r * 44}" width="${cw}" height="44" class="pc-cell ${highlight === i ? 'pc-hi' : ''}"/><text x="${x0 + i * cw + cw / 2}" y="${34 + r * 44 + 32}" class="fg-text" font-size="28" text-anchor="middle">${ch.trim()}</text>`; });
      if (op && r === rows - 1) body += `<text x="${x0 - 22}" y="${34 + r * 44 + 32}" class="fg-text" font-size="28" text-anchor="middle">${op}</text>`;
    });
    if (op) body += `<line x1="${x0 - 30}" y1="${38 + rows * 44}" x2="${x0 + 3 * cw}" y2="${38 + rows * 44}" class="fg-stroke" style="stroke-width:3"/>`;
    return svg(x0 + 3 * cw + 6, 44 + rows * 44 + (op ? 6 : 0), body, `Place-value chart: ${nums.join(op ? ` ${op} ` : ', ')}`);
  }

  // ---- number line for rounding: n between two tens or hundreds, with the halfway mark ----
  function roundLine(n, to) {
    const lo = Math.floor(n / to) * to, hi = lo + to, mid = lo + to / 2, W = 420, x0 = 30, x = (v) => x0 + ((v - lo) / to) * (W - 2 * x0);
    let body = `<line x1="${x0 - 10}" y1="50" x2="${W - x0 + 10}" y2="50" class="fg-stroke"/>`;
    for (let i = 0; i <= 10; i++) { const v = lo + (i * to) / 10; body += `<line x1="${x(v)}" y1="${i % 5 ? 44 : 38}" x2="${x(v)}" y2="${i % 5 ? 56 : 62}" class="fg-stroke"/>`; }
    [lo, mid, hi].forEach((v) => { body += `<text x="${x(v)}" y="84" class="fg-text" font-size="${v === mid ? 14 : 18}" text-anchor="middle">${v}${v === mid ? ' (halfway)' : ''}</text>`; });
    body += `<circle cx="${x(n)}" cy="50" r="8" class="tf-a"/><text x="${x(n)}" y="26" class="fg-text" font-size="18" text-anchor="middle">${n}</text>`;
    return svg(W, 92, body, `${n} is between ${lo} and ${hi}`);
  }
  // ---- jumps on a number line (skip counting) ----
  function jumps(start, by, count) {
    const end = start + by * count, W = 460, x0 = 26, x = (v) => x0 + ((v - start) / (end - start)) * (W - 2 * x0);
    let body = `<line x1="${x0 - 10}" y1="70" x2="${W - x0 + 10}" y2="70" class="fg-stroke"/>`;
    for (let k = 0; k <= count; k++) {
      const v = start + k * by;
      body += `<line x1="${x(v)}" y1="62" x2="${x(v)}" y2="78" class="fg-stroke"/><text x="${x(v)}" y="98" class="fg-text" font-size="15" text-anchor="middle">${k === count ? '?' : v}</text>`;
      if (k < count) body += `<path d="M${x(v)} 62 Q${(x(v) + x(v + by)) / 2} 18 ${x(v + by)} 62" class="jp-arc"/><text x="${(x(v) + x(v + by)) / 2}" y="30" class="fg-text" font-size="13" text-anchor="middle">+${by}</text>`;
    }
    return svg(W, 106, body, `Jumps of ${by} from ${start}`);
  }

  // ---- labeled small shapes in a row ----
  function shapeRow(names) {
    let x = 0, body = '';
    names.forEach((n) => {
      const sv = shape(n);
      const vb = sv.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/), w = +vb[1], h = +vb[2], k = 70 / Math.max(w, h);
      body += `<g transform="translate(${x + (90 - w * k) / 2} ${6 + (70 - h * k) / 2}) scale(${k})">${sv.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g><text x="${x + 45}" y="96" class="fg-text" font-size="13" text-anchor="middle">${n}</text>`;
      x += 96;
    });
    return svg(x, 104, body, names.join(', '));
  }
  // ---- a picture with a caption (time of day, items with prices) ----
  function picture(icons, caption = '') {
    const W = Math.max(icons.length * 60 + 20, caption.length * 9 + 20), cx = W / 2;
    const body = `<text x="${cx}" y="56" font-size="52" text-anchor="middle">${icons.join('')}</text>${caption ? `<text x="${cx}" y="96" class="fg-text" font-size="17" text-anchor="middle">${caption}</text>` : ''}`;
    return svg(W, caption ? 104 : 72, body, caption || icons.join(' '));
  }
  function priceTags(icon, price, qty) {
    let body = '';
    for (let k = 0; k < qty; k++) body += `<text x="${40 + k * 90}" y="50" font-size="44" text-anchor="middle">${icon}</text><rect x="${12 + k * 90}" y="62" width="56" height="26" rx="8" class="pc-head"/><text x="${40 + k * 90}" y="81" class="fg-text" font-size="16" text-anchor="middle">${price}¢</text>`;
    const x = qty * 90 + 20;
    body += `<rect x="${x}" y="22" width="80" height="44" rx="6" class="cn-bill"/><text x="${x + 40}" y="51" class="cn-text" font-size="18" text-anchor="middle">$1</text><text x="${x + 40}" y="86" class="fg-text" font-size="14" text-anchor="middle">pays</text>`;
    return svg(x + 90, 94, body, `${qty} items at ${price} cents, paid with a dollar`);
  }


  // ===== Grade 4–5 pictures (MAP Math 4) =====
  const inner = (sv) => sv.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const vbox = (sv) => { const m = sv.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); return [+m[1], +m[2]]; };
  const rad = (d) => (d * Math.PI) / 180;
  const FRAC_GLYPH = { '1/8': '⅛', '1/4': '¼', '3/8': '⅜', '1/2': '½', '5/8': '⅝', '3/4': '¾', '7/8': '⅞' };

  // A table: rows of cells, the first row is the header. '?' cells are dashed.
  function table(rows, title = '') {
    // powers typed as x^2 or x^{2} are shown as x² (b^(m/n), notation being explained, stays as written)
    rows = rows.map((r) => r.map((c) => (c != null && /\^[\d{]/.test(String(c)) ? MathText.plain(String(c)) : c)));
    const supT = (t) => String(t).replace(/\^\(([^()]+)\)/g, '<tspan baseline-shift="super" font-size="70%">$1</tspan>'); // x^(1/2) → raised 1/2
    // Columns keep the old fixed width when their text fits; a column with longer text grows (up to 250), and a cell
    // that is still too long wraps onto two lines (its row gets taller), so no text is ever cut off.
    const cols = Math.max(...rows.map((r) => r.length)), cw0 = Math.max(72, Math.min(110, 420 / cols));
    const fsz = (r) => (r === 0 ? 14 : 18), tw = (c, r) => String(c).length * fsz(r) * 0.56;
    const cw = [...Array(cols).keys()].map((i) => Math.max(cw0, Math.min(250, Math.max(...rows.map((row, r) => (row[i] == null ? 0 : tw(row[i], r) + 16))))));
    const wrap = (c, r, w) => { const t = String(c); if (tw(t, r) + 12 <= w || !t.includes(' ')) return [t]; const mid = t.length / 2; let best = -1; for (let k = 0; k < t.length; k++) if (t[k] === ' ' && (best < 0 || Math.abs(k - mid) < Math.abs(best - mid))) best = k; return [t.slice(0, best), t.slice(best + 1)]; };
    const lines = rows.map((row, r) => row.map((c, i) => wrap(c, r, cw[i]))), rh = lines.map((row) => (row.some((l) => l.length > 1) ? 60 : 40));
    const TW = cw.reduce((a, b) => a + b, 0) + 8, W = Math.max(TW, title ? title.length * 15 * 0.55 + 16 : 0), off = (W - TW) / 2, top = title ? 26 : 4, x0 = (i) => off + 4 + cw.slice(0, i).reduce((a, b) => a + b, 0), y0 = (r) => top + rh.slice(0, r).reduce((a, b) => a + b, 0);
    let body = title ? `<text x="${W / 2}" y="18" class="fg-text" font-size="15" text-anchor="middle">${title}</text>` : '';
    rows.forEach((row, r) => row.forEach((c, i) => {
      const x = x0(i), y = y0(r), L = lines[r][i], fs = fsz(r);
      const txt = L.length === 1 ? `<text x="${x + cw[i] / 2}" y="${y + rh[r] / 2 + 6}" class="fg-text" font-size="${fs}" text-anchor="middle">${supT(L[0])}</text>`
        : `<text x="${x + cw[i] / 2}" y="${y + rh[r] / 2 - 4}" class="fg-text" font-size="${fs}" text-anchor="middle">${supT(L[0])}<tspan x="${x + cw[i] / 2}" dy="${fs + 3}">${supT(L[1])}</tspan></text>`;
      body += `<rect x="${x}" y="${y}" width="${cw[i]}" height="${rh[r]}" class="${r === 0 ? 'pc-head' : c === '?' ? 'bm-unknown' : 'pc-cell'}"/>${txt}`;
    }));
    return svg(W, y0(rows.length) + 4, body, `Table${title ? ` ${title}` : ''}: ${rows.map((r) => r.join(' ')).join('; ')}`);
  }

  // An angle: two rays from a vertex. `start` = direction of the first ray (degrees, counterclockwise from the right).
  // label shown inside the arc ('35°', '?', or ''). A right angle gets a small square instead of an arc.
  function angle(deg, { start = 0, label = '', len = 120 } = {}) {
    const W = 300, H = 170, cx = 150, cy = 140;
    const p = (a, r) => `${(cx + r * Math.cos(rad(a))).toFixed(1)} ${(cy - r * Math.sin(rad(a))).toFixed(1)}`;
    const a0 = start, a1 = start + deg;
    let body = `<path d="M${p(a0, len)} L${cx} ${cy} L${p(a1, len)}" class="fg-stroke" style="stroke-width:3"/>`;
    body += `<circle cx="${p(a0, len).split(' ')[0]}" cy="${p(a0, len).split(' ')[1]}" r="4" class="fg-text"/><circle cx="${p(a1, len).split(' ')[0]}" cy="${p(a1, len).split(' ')[1]}" r="4" class="fg-text"/><circle cx="${cx}" cy="${cy}" r="4" class="fg-text"/>`;
    if (deg === 90) body += `<path d="M${p(a0, 22)} L${(cx + 22 * Math.SQRT2 * Math.cos(rad(a0 + 45))).toFixed(1)} ${(cy - 22 * Math.SQRT2 * Math.sin(rad(a0 + 45))).toFixed(1)} L${p(a1, 22)}" class="fg-stroke" style="stroke-width:2"/>`;
    else body += `<path d="M${p(a0, 34)} A34 34 0 ${deg > 180 ? 1 : 0} 0 ${p(a1, 34)}" class="jp-arc"/>`;
    if (label) { const m = a0 + deg / 2, r = deg < 40 ? 70 : 54; body += `<text x="${(cx + r * Math.cos(rad(m))).toFixed(1)}" y="${(cy - r * Math.sin(rad(m)) + 6).toFixed(1)}" class="fg-text" font-size="18" text-anchor="middle">${label}</text>`; }
    return svg(W, H, body, `An angle${label && label !== '?' ? ` of ${label.replace('°', ' degrees')}` : ''}`);
  }
  // An angle split into two parts by a ray: parts [a, b] with labels (one may be '?').
  function angleSplit(a, b, la, lb, lt = '') {
    const W = 320, H = 180, cx = 150, cy = 150, len = 125;
    const p = (d, r) => `${(cx + r * Math.cos(rad(d))).toFixed(1)} ${(cy - r * Math.sin(rad(d))).toFixed(1)}`;
    let body = `<path d="M${p(0, len)} L${cx} ${cy} L${p(a + b, len)} M${cx} ${cy} L${p(a, len)}" class="fg-stroke" style="stroke-width:3"/>`;
    body += `<path d="M${p(0, 40)} A40 40 0 0 0 ${p(a, 40)}" class="jp-arc"/><path d="M${p(a, 52)} A52 52 0 0 0 ${p(a + b, 52)}" class="jp-arc" style="stroke:var(--c3)"/>`;
    const lab = (d, r, t) => `<text x="${(cx + r * Math.cos(rad(d))).toFixed(1)}" y="${(cy - r * Math.sin(rad(d)) + 6).toFixed(1)}" class="fg-text" font-size="17" text-anchor="middle">${t}</text>`;
    body += lab(a / 2, a < 30 ? 100 : 78, la) + lab(a + b / 2, b < 30 ? 108 : 90, lb);
    if (lt) body += `<text x="${W - 6}" y="20" class="fg-text" font-size="15" text-anchor="end">Whole angle: ${lt}</text>`;
    return svg(W, H, body, `An angle split into two parts: ${la} and ${lb}${lt ? `; whole angle ${lt}` : ''}`);
  }
  // A protractor with both scales; one ray along the base (pointing right) and one ray at `deg` (outer scale).
  function protractor(deg) {
    const W = 360, H = 200, cx = 180, cy = 185, R = 160;
    const p = (d, r) => `${(cx + r * Math.cos(rad(d))).toFixed(1)} ${(cy - r * Math.sin(rad(d))).toFixed(1)}`;
    let body = `<path d="M${cx - R} ${cy} A${R} ${R} 0 0 1 ${cx + R} ${cy} Z" class="ck-face"/>`;
    for (let d = 0; d <= 180; d += 5) {
      const big = d % 10 === 0;
      body += `<line x1="${p(d, R).split(' ')[0]}" y1="${p(d, R).split(' ')[1]}" x2="${p(d, R - (big ? 12 : 7)).split(' ')[0]}" y2="${p(d, R - (big ? 12 : 7)).split(' ')[1]}" class="fg-stroke" style="stroke-width:${big ? 1.6 : 1}"/>`;
      if (d % 20 === 0 || d === 90) {
        const lift = d === 0 || d === 180 ? 12 : 0; // keep the end labels off the bottom ray
        const [x1, y1] = p(d, R - 24).split(' '), [x2, y2] = p(d, R - 46).split(' ');
        body += `<text x="${x1}" y="${+y1 + 5 - lift}" class="fg-text" font-size="12" text-anchor="middle">${d}</text><text x="${x2}" y="${+y2 + 5}" class="fg-text" font-size="11" text-anchor="middle" style="opacity:.7" transform="translate(0 ${-lift})">${180 - d}</text>`;
      }
    }
    body += `<path d="M${cx} ${cy} L${p(0, R + 8)} M${cx} ${cy} L${p(deg, R + 8)}" class="jp-arc" style="stroke-width:3.5"/><circle cx="${cx}" cy="${cy}" r="5" class="fg-text"/>`;
    return svg(W, H, body, `A protractor. One ray is on 0 of the outer scale; the other ray points to ${deg} on the outer scale and ${180 - deg} on the inner scale`);
  }

  // Area model for a × b: a rectangle split by the place-value parts of each factor, with partial products
  // (or '?' for the cells listed in `hide`).
  function areaModel(a, b, { hide = [], showTotals = true } = {}) {
    const parts = (n) => String(n).split('').map((d, i, s) => +d * 10 ** (s.length - 1 - i)).filter((v) => v > 0);
    const A = parts(a), B = parts(b), W = 380, H = B.length > 1 ? 170 : 90, x0 = 56, y0 = 30;
    const sum = (xs) => xs.reduce((t, v) => t + v, 0), wTot = W - x0 - 6;
    const ws = A.map((v) => Math.max(54, (v / sum(A)) * wTot)), sc = wTot / sum(ws), hs = B.map((v) => Math.max(56, (v / sum(B)) * H)), sh = H / sum(hs);
    let body = '', x = x0, k = 0;
    A.forEach((av, i) => {
      const w = ws[i] * sc;
      body += `<text x="${x + w / 2}" y="${y0 - 10}" class="fg-text" font-size="16" text-anchor="middle">${av}</text>`;
      let y = y0;
      B.forEach((bv, j) => {
        const h = hs[j] * sh;
        const val = hide.includes(k) ? '?' : (showTotals ? (av * bv).toLocaleString('en-US') : '');
        body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${hide.includes(k) ? 'bm-unknown' : `bm-part bm-p${(i + j) % 3}`}"/><text x="${x + w / 2}" y="${y + h / 2 + 6}" class="fg-text" font-size="${w < 70 ? 13 : 16}" text-anchor="middle">${val}</text>`;
        if (i === 0) body += `<text x="${x0 - 8}" y="${y + h / 2 + 6}" class="fg-text" font-size="16" text-anchor="end">${bv}</text>`;
        y += h; k++;
      });
      x += w;
    });
    return svg(W, y0 + H + 6, body, `Area model for ${a} times ${b}: ${A.join(' + ')} by ${B.join(' + ')}`);
  }

  // Hundredths grid (10 × 10) with n shaded; tenths strip when total = 10.
  function decimalGrid(n, total = 100) {
    const c = total === 100 ? 20 : 40, cols = 10, rows = total / 10, W = cols * c + 8, H = rows * c + 8;
    let body = '';
    for (let i = 0; i < total; i++) {
      // fill whole columns (tenths) first, the way hundredths are usually shown
      const col = total === 100 ? Math.floor(i / 10) : i, row = total === 100 ? i % 10 : 0;
      body += `<rect x="${4 + col * c}" y="${4 + row * c}" width="${c}" height="${c}" class="${i < n ? 'fg-fill' : 'pc-cell'}" style="stroke-width:1"/>`;
    }
    body += `<rect x="4" y="4" width="${cols * c}" height="${rows * c}" class="fg-stroke" style="stroke-width:2.5"/>`;
    return svg(W, H, body, `A ${total === 100 ? 'hundredths grid' : 'tenths strip'} with ${n} of ${total} parts shaded`);
  }

  // A number line from min to max cut into `den` parts per unit. marks: [{v, label}] (label '?' or text above a dot).
  // labels: 'whole' (whole numbers), 'all' (every tick), or a list of values. dec: show decimal labels with that many places.
  function numLine(min, max, den, { marks = [], labels = 'whole', dec = null } = {}) {
    const n = Math.round((max - min) * den), W = 460, pad = 28, y = 56, x = (v) => pad + ((v - min) * den / n) * (W - 2 * pad);
    const lab = (v) => { if (dec != null) return v.toFixed(dec); if (Number.isInteger(v)) return String(v); const w = Math.floor(v + 1e-9), f = Math.round((v - w) * den); const g = N.str(N.make(f, den)); return `${w ? w + ' ' : ''}${FRAC_GLYPH[g] || g}`; };
    let body = `<line x1="${pad - 12}" y1="${y}" x2="${W - pad + 12}" y2="${y}" class="fg-stroke"/>`;
    for (let i = 0; i <= n; i++) {
      const v = min + i / den, whole = Math.abs(v - Math.round(v)) < 1e-9;
      body += `<line x1="${x(v)}" y1="${y - (whole ? 12 : 7)}" x2="${x(v)}" y2="${y + (whole ? 12 : 7)}" class="fg-stroke" style="stroke-width:${whole ? 2.5 : 1.5}"/>`;
      const show = labels === 'all' || (labels === 'whole' && whole) || (Array.isArray(labels) && labels.some((l) => Math.abs(l - v) < 1e-9));
      if (show) body += `<text x="${x(v)}" y="${y + 32}" class="fg-text" font-size="${n > 12 && !whole ? 11 : 15}" text-anchor="middle">${lab(v)}</text>`;
    }
    marks.forEach((m) => { body += `<circle cx="${x(m.v)}" cy="${y}" r="8" class="tf-a"/>${m.label ? `<text x="${x(m.v)}" y="${y - 18}" class="fg-text" font-size="17" text-anchor="middle">${m.label}</text>` : ''}`; });
    return svg(W, y + 42, body, `A number line from ${min} to ${max} in ${den === 1 ? 'wholes' : `parts of 1/${den}`}${marks.length ? `, with a point at ${marks.map((m) => m.label || '').join(', ')}` : ''}`);
  }

  // Lines and line pieces: 'parallel', 'perpendicular', 'intersecting', 'segment', 'ray', 'line', 'point'.
  function lines(kind) {
    const W = 200, H = 120, arrow = (x, y, a) => `<path d="M${x} ${y} l${(-12 * Math.cos(rad(a - 25))).toFixed(1)} ${(12 * Math.sin(rad(a - 25))).toFixed(1)} M${x} ${y} l${(-12 * Math.cos(rad(a + 25))).toFixed(1)} ${(12 * Math.sin(rad(a + 25))).toFixed(1)}" class="fg-stroke"/>`;
    const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="5" class="fg-text"/>`;
    let body = '';
    if (kind === 'parallel') body = `<line x1="20" y1="35" x2="180" y2="35" class="fg-stroke"/><line x1="20" y1="85" x2="180" y2="85" class="fg-stroke"/>${arrow(180, 35, 0)}${arrow(20, 35, 180)}${arrow(180, 85, 0)}${arrow(20, 85, 180)}`;
    else if (kind === 'perpendicular') body = `<line x1="20" y1="70" x2="180" y2="70" class="fg-stroke"/><line x1="100" y1="10" x2="100" y2="112" class="fg-stroke"/><path d="M100 56 h14 v14" class="fg-stroke" style="stroke-width:1.8"/>${arrow(180, 70, 0)}${arrow(20, 70, 180)}${arrow(100, 10, 90)}${arrow(100, 112, 270)}`;
    else if (kind === 'intersecting') body = `<line x1="20" y1="100" x2="180" y2="20" class="fg-stroke"/><line x1="20" y1="40" x2="180" y2="88" class="fg-stroke"/>${arrow(180, 20, 26.6)}${arrow(20, 100, 206.6)}${arrow(180, 88, -16.7)}${arrow(20, 40, 163.3)}`;
    else if (kind === 'segment') body = `<line x1="30" y1="60" x2="170" y2="60" class="fg-stroke"/>${dot(30, 60)}${dot(170, 60)}`;
    else if (kind === 'ray') body = `<line x1="30" y1="60" x2="180" y2="60" class="fg-stroke"/>${dot(30, 60)}${arrow(180, 60, 0)}`;
    else if (kind === 'line') body = `<line x1="20" y1="60" x2="180" y2="60" class="fg-stroke"/>${arrow(180, 60, 0)}${arrow(20, 60, 180)}`;
    else body = dot(100, 60);
    return svg(W, H, body, kind === 'point' ? 'a point' : kind === 'segment' ? 'a line segment' : kind === 'ray' ? 'a ray' : kind === 'line' ? 'a line' : `${kind} lines`);
  }

  // A shape with a dashed fold line. Shapes: 'heart', 'arrow', 'isosceles', 'rectangle', 'square', 'scalene', 'L', 'parallelogram', 'kite', 'hexagon'.
  // fold: 'v' (up-down), 'h' (left-right), 'd' (corner to corner).
  const SYM = {
    heart: 'M100 150 C40 105 15 70 40 40 C62 16 92 28 100 52 C108 28 138 16 160 40 C185 70 160 105 100 150 Z',
    arrow: 'M100 15 L160 75 L125 75 L125 150 L75 150 L75 75 L40 75 Z',
    isosceles: 'M100 15 L165 150 L35 150 Z',
    rectangle: 'M30 45 L170 45 L170 125 L30 125 Z',
    square: 'M40 25 L160 25 L160 145 L40 145 Z',
    scalene: 'M45 140 L170 140 L80 30 Z',
    L: 'M50 20 L90 20 L90 110 L160 110 L160 150 L50 150 Z',
    parallelogram: 'M60 40 L175 40 L140 130 L25 130 Z',
    kite: 'M100 15 L150 70 L100 155 L50 70 Z',
    hexagon: 'M65 25 L135 25 L170 85 L135 145 L65 145 L30 85 Z',
  };
  // Which fold lines really are lines of symmetry for each shape (the true answers, used by questions and the validator).
  const SYM_LINES = { heart: ['v'], arrow: ['v'], isosceles: ['v'], rectangle: ['v', 'h'], square: ['v', 'h', 'd'], scalene: [], L: [], parallelogram: [], kite: ['v'], hexagon: ['v', 'h'] };
  function symmetry(kind, fold = null) {
    let body = `<path d="${SYM[kind]}" class="fg-fill"/>`;
    const C = { square: [100, 85], rectangle: [100, 85], hexagon: [100, 85] }[kind] || [100, 85];
    if (fold === 'v') body += `<line x1="100" y1="5" x2="100" y2="162" class="fg-stroke" style="stroke-dasharray:8 6;stroke:var(--c3);stroke-width:3"/>`;
    if (fold === 'h') body += `<line x1="10" y1="${C[1]}" x2="190" y2="${C[1]}" class="fg-stroke" style="stroke-dasharray:8 6;stroke:var(--c3);stroke-width:3"/>`;
    if (fold === 'd') body += kind === 'square' ? `<line x1="28" y1="13" x2="172" y2="157" class="fg-stroke" style="stroke-dasharray:8 6;stroke:var(--c3);stroke-width:3"/>` : `<line x1="20" y1="20" x2="180" y2="150" class="fg-stroke" style="stroke-dasharray:8 6;stroke:var(--c3);stroke-width:3"/>`;
    return svg(200, 166, body, `a ${kind === 'L' ? 'L-shape' : kind}${fold ? ' with a dashed fold line' : ''}`);
  }
  // Triangles by angle: 'right', 'acute', 'obtuse' (a right triangle gets a square corner mark).
  function triangle(kind) {
    const P = { right: [[30, 140], [170, 140], [30, 30]], acute: [[30, 140], [170, 140], [110, 25]], obtuse: [[20, 140], [120, 140], [185, 50]] }[kind];
    let body = `<polygon points="${P.map((p) => p.join(',')).join(' ')}" class="fg-fill"/>`;
    if (kind === 'right') body += `<path d="M30 124 h16 v16" class="fg-stroke" style="stroke-width:1.8"/>`;
    return svg(200, 150, body, `a ${kind} triangle`);
  }

  // First-quadrant coordinate grid with labeled points [[x, y, 'A'], …].
  function coordGrid(points, max = 10) {
    const g = 30, x0 = 34, y0 = 10, W = x0 + max * g + 16, H = y0 + max * g + 34;
    const X = (v) => x0 + v * g, Y = (v) => y0 + (max - v) * g;
    let body = '';
    for (let i = 0; i <= max; i++) body += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(max)}" class="gr-grid"/><line x1="${X(0)}" y1="${Y(i)}" x2="${X(max)}" y2="${Y(i)}" class="gr-grid"/><text x="${X(i)}" y="${Y(0) + 20}" class="fg-text" font-size="12" text-anchor="middle">${i}</text>${i ? `<text x="${X(0) - 8}" y="${Y(i) + 4}" class="fg-text" font-size="12" text-anchor="end">${i}</text>` : ''}`;
    body += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(max) + 8}" y2="${Y(0)}" class="fg-stroke"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(max) - 8}" class="fg-stroke"/>`;
    points.forEach(([x, y, l]) => { body += `<circle cx="${X(x)}" cy="${Y(y)}" r="6" class="tf-a"/><text x="${X(x) + 9}" y="${Y(y) - 8}" class="fg-text" font-size="16">${l}</text>`; });
    return svg(W, H, body, `A coordinate grid with ${points.map(([x, y, l]) => `point ${l}`).join(', ')}`);
  }

  // A rectangular prism built from unit cubes (l long, w deep, h tall), drawn at an angle.
  function prism(l, w, h) {
    const u = Math.min(30, 200 / (l + w * 0.6)), dx = u * 0.55, dy = u * 0.4, W = l * u + w * dx + 10, H = h * u + w * dy + 10;
    const ox = 5, oy = 5 + w * dy;
    let body = '';
    // front face, then top, then right side
    for (let z = 0; z < h; z++) for (let x = 0; x < l; x++) body += `<rect x="${ox + x * u}" y="${oy + (h - 1 - z) * u}" width="${u}" height="${u}" class="fg-fill" style="stroke-width:1.2"/>`;
    for (let d = 0; d < w; d++) for (let x = 0; x < l; x++) { const bx = ox + x * u + d * dx, by = oy - d * dy; body += `<path d="M${bx} ${by} l${dx} ${-dy} h${u} l${-dx} ${dy} z" class="pc-head" style="stroke-width:1.2"/>`; }
    for (let d = 0; d < w; d++) for (let z = 0; z < h; z++) { const bx = ox + l * u + d * dx, by = oy + (h - 1 - z) * u - d * dy; body += `<path d="M${bx} ${by} l${dx} ${-dy} v${u} l${-dx} ${dy} z" class="pc-cell" style="stroke-width:1.2"/>`; }
    return svg(W, H, body, `A box made of unit cubes: ${l} long, ${w} wide, ${h} tall`);
  }

  // "Times as many": a bar for the smaller amount and a bar made of k copies of it.
  function timesBars(small, k, la, lb, big = '?') {
    const u = Math.min(64, 330 / k), x0 = 80;
    let body = `<text x="4" y="31" class="fg-text" font-size="15">${la}</text><rect x="${x0}" y="10" width="${u}" height="32" rx="5" class="bm-part bm-p0"/><text x="${x0 + u / 2}" y="32" class="fg-text" font-size="15" text-anchor="middle">${small}</text>`;
    body += `<text x="4" y="79" class="fg-text" font-size="15">${lb}</text>`;
    for (let i = 0; i < k; i++) body += `<rect x="${x0 + i * u}" y="58" width="${u}" height="32" rx="5" class="bm-part bm-p1"/><text x="${x0 + i * u + u / 2}" y="80" class="fg-text" font-size="${u < 40 ? 11 : 15}" text-anchor="middle">${small}</text>`;
    body += `<path d="M${x0} 100 v8 h${k * u} v-8" class="fg-stroke" style="stroke-width:1.8"/><text x="${x0 + (k * u) / 2}" y="126" class="fg-text" font-size="16" text-anchor="middle">${big}</text>`;
    return svg(x0 + k * u + 10, 132, body, `${lb} is ${k} times as many as ${la}: ${k} bars of ${small}`);
  }

  // Equal-share bar for division: total split into n equal parts (labels '?' by default), with remainder r shown apart.
  function shareBar(total, n, { each = '?', r = 0 } = {}) {
    const W = 420, x0 = 6, rw = r ? 50 : 0, w = (W - rw) / n;
    let body = `<rect x="${x0}" y="6" width="${W}" height="36" rx="6" class="bm-whole"/><text x="${x0 + W / 2}" y="31" class="fg-text" font-size="18" text-anchor="middle">${total}</text>`;
    for (let i = 0; i < n; i++) body += `<rect x="${x0 + i * w}" y="52" width="${w}" height="36" rx="5" class="${each === '?' ? 'bm-unknown' : 'bm-part bm-p0'}"/><text x="${x0 + i * w + w / 2}" y="77" class="fg-text" font-size="${w < 40 ? 12 : 16}" text-anchor="middle">${each}</text>`;
    if (r) body += `<rect x="${x0 + W - rw}" y="52" width="${rw}" height="36" rx="5" class="bm-part bm-p2"/><text x="${x0 + W - rw / 2}" y="77" class="fg-text" font-size="14" text-anchor="middle">${r} left</text>`;
    return svg(W + 12, 94, body, `${total} shared into ${n} equal parts${r ? ` with ${r} left over` : ''}`);
  }

  // Fraction strips: several fractions as bars of the same length, one per row (for equivalence and comparing).
  function fracStrips(list) {
    const W = 360, x0 = 64, h = 34;
    let body = '';
    list.forEach(([n, d], r) => {
      const y = 4 + r * (h + 10), w = W / d;
      body += `<text x="${x0 - 10}" y="${y + 23}" class="fg-text" font-size="16" text-anchor="end">${n}/${d}</text>`;
      for (let i = 0; i < d; i++) body += `<rect x="${x0 + i * w}" y="${y}" width="${w}" height="${h}" class="${i < n ? 'fg-fill' : 'pc-cell'}" style="${i < n ? '' : 'fill:var(--surface)'}"/>`;
    });
    return svg(x0 + W + 6, list.length * (h + 10) + 2, body, `Fraction strips: ${list.map(([n, d]) => `${n}/${d}`).join(', ')}`);
  }

  // Side by side, scaled to the same height (two pictures in one figure).
  function pair(a, b, gap = 24) {
    const [wa, ha] = vbox(a), [wb, hb] = vbox(b), H = Math.max(ha, hb);
    return `<svg viewBox="0 0 ${wa + gap + wb} ${H}" width="${wa + gap + wb}" role="img" aria-label="Two pictures"><g transform="translate(0 ${(H - ha) / 2})">${inner(a)}</g><g transform="translate(${wa + gap} ${(H - hb) / 2})">${inner(b)}</g></svg>`;
  }

  // ---- reading: pictures of nonfiction pages (text features), lists, and labeled diagrams ----
  const escT = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // A book page: heading, a picture with a caption, text lines with one bold word, and an optional mark ('?')
  // pointing at one part: 'heading' | 'caption' | 'bold' | 'picture'.
  function pageFig({ heading, icon, caption, bold, mark = null }) {
    const W = 320, H = 230;
    let b = `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="10" class="pc-cell"/>`;
    b += `<text x="20" y="34" class="fg-text" font-size="19" font-weight="800">${escT(heading)}</text>`;
    b += `<rect x="20" y="48" width="120" height="96" rx="8" class="pc-head"/><text x="80" y="110" font-size="44" text-anchor="middle">${icon}</text>`;
    b += `<text x="80" y="162" class="fg-text" font-size="11" text-anchor="middle" font-style="italic">${escT(caption)}</text>`;
    for (let i = 0; i < 6; i++) b += `<rect x="156" y="${54 + i * 16}" width="${i === 5 ? 90 : 140}" height="7" rx="3" class="gr-grid" style="fill:var(--line)"/>`;
    b += `<text x="156" y="168" class="fg-text" font-size="14" font-weight="800">${escT(bold)}</text><rect x="156" y="174" width="140" height="7" rx="3" style="fill:var(--line)"/><rect x="20" y="190" width="276" height="7" rx="3" style="fill:var(--line)"/><rect x="20" y="206" width="200" height="7" rx="3" style="fill:var(--line)"/>`;
    const at = { heading: [W - 40, 28], caption: [150, 160], bold: [W - 18, 164], picture: [150, 96] }[mark];
    if (at) b += `<circle cx="${at[0]}" cy="${at[1]}" r="13" class="tf-a"/><text x="${at[0]}" y="${at[1] + 6}" class="fg-text" font-size="16" text-anchor="middle">?</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="A page with the heading ${escT(heading)}, a picture with a caption, and a bold word${mark ? `; a question mark points at the ${mark}` : ''}">${b}</svg>`;
  }
  // A table of contents or a glossary/index as a picture.
  function listFig(title, rows, right = true) {
    const W = 300, H = 46 + rows.length * 30;
    let b = `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="10" class="pc-cell"/><text x="${W / 2}" y="32" class="fg-text" font-size="17" font-weight="800" text-anchor="middle">${escT(title)}</text>`;
    rows.forEach(([l, r], i) => { const y = 60 + i * 30; b += `<text x="20" y="${y}" class="fg-text" font-size="14">${escT(l)}</text>${right ? `<text x="${W - 20}" y="${y}" class="fg-text" font-size="14" text-anchor="end">${escT(r)}</text><line x1="${20 + l.length * 7.6}" y1="${y - 4}" x2="${W - 24 - String(r).length * 8}" y2="${y - 4}" class="gr-grid" style="stroke-dasharray:2 4"/>` : `<text x="20" y="${y + 14}" class="fg-text" font-size="12" style="opacity:.75">${escT(r)}</text>`}`; });
    return `<svg viewBox="0 0 ${W} ${right ? H : H + rows.length * 14}" width="${W}" role="img" aria-label="${escT(title)}: ${rows.map((r) => r.join(' ')).join('; ')}">${b}</svg>`;
  }
  // A labeled diagram: an emoji in the middle with labels around it.
  function diagramFig(title, icon, labels) {
    const W = 320, H = 230, cx = 160, cy = 125;
    let b = `<text x="${cx}" y="24" class="fg-text" font-size="16" font-weight="800" text-anchor="middle">${escT(title)}</text><text x="${cx}" y="${cy + 30}" font-size="90" text-anchor="middle">${icon}</text>`;
    const spots = [[30, 70, 110, 95], [290, 70, 210, 95], [30, 200, 115, 160], [290, 200, 205, 160]];
    labels.slice(0, 4).forEach((l, i) => { const [lx, ly, tx, ty] = spots[i]; b += `<line x1="${lx < cx ? lx + 50 : lx - 50}" y1="${ly - 4}" x2="${tx}" y2="${ty}" class="fg-stroke" style="stroke-width:1.5"/><text x="${lx}" y="${ly}" class="fg-text" font-size="14" text-anchor="${lx < cx ? 'start' : 'end'}">${escT(l)}</text>`; });
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="Diagram: ${escT(title)}, labeled ${labels.join(', ')}">${b}</svg>`;
  }

  // ===== Algebra pictures =====
  // A coordinate graph. fns: {kind:'lin', m, b} | {kind:'quad', a, h, k} | {kind:'exp', a, b} | {kind:'v', x}
  // (vertical line); pts: [[x, y, label?]]; range [lo, hi] (square) or {x:[lo,hi], y:[lo,hi]}; step for labels.
  let GRAPH_ID = 0;
  // fs = label size and lw = line width (bigger for small answer-choice pictures).
  function graph({ fns = [], pts = [], range = [-6, 6], step = 2, labels = true, w = 300, fs = 10, lw = 0 } = {}) {
    const R = Array.isArray(range) ? { x: range, y: range } : range, [xl, xh] = R.x, [yl, yh] = R.y;
    const pad = 22, H = w * Math.min(1.1, Math.max(0.62, (yh - yl) / (xh - xl))), // square for equal ranges; never too tall or flat
      sx = (w - 2 * pad) / (xh - xl), sy = (H - 2 * pad) / (yh - yl);
    const X = (v) => pad + (v - xl) * sx, Y = (v) => pad + (yh - v) * sy;
    let b = '';
    const gx = Math.max(1, Math.round((xh - xl) / 12)), gy = Math.max(1, Math.round((yh - yl) / 12));
    for (let v = Math.ceil(xl / gx) * gx; v <= xh; v += gx) b += `<line x1="${X(v)}" y1="${Y(yl)}" x2="${X(v)}" y2="${Y(yh)}" class="gr-grid"/>`;
    for (let v = Math.ceil(yl / gy) * gy; v <= yh; v += gy) b += `<line x1="${X(xl)}" y1="${Y(v)}" x2="${X(xh)}" y2="${Y(v)}" class="gr-grid"/>`;
    if (yl <= 0 && yh >= 0) b += `<line x1="${X(xl)}" y1="${Y(0)}" x2="${X(xh)}" y2="${Y(0)}" class="fg-stroke" style="stroke-width:1.8"/>`;
    if (xl <= 0 && xh >= 0) b += `<line x1="${X(0)}" y1="${Y(yl)}" x2="${X(0)}" y2="${Y(yh)}" class="fg-stroke" style="stroke-width:1.8"/>`;
    if (labels) {
      const ax = yl <= 0 && yh >= 0 ? Y(0) : Y(yl), ay = xl <= 0 && xh >= 0 ? X(0) : X(xl);
      for (let v = Math.ceil(xl / step) * step; v <= xh; v += step) if (v) b += `<text x="${X(v)}" y="${ax + fs + 3}" class="fg-text" font-size="${fs}" text-anchor="middle">${String(v).replace('-', '−')}</text>`;
      let sy2 = step; while ((yh - yl) / sy2 > 12) sy2 = [1, 2, 4, 5].includes(sy2) ? { 1: 2, 2: 4, 4: 5, 5: 10 }[sy2] : sy2 * 2; // at most ~12 labels up the side
      for (let v = Math.ceil(yl / sy2) * sy2; v <= yh; v += sy2) if (v) b += `<text x="${ay - 4}" y="${Y(v) + fs * 0.35}" class="fg-text" font-size="${fs}" text-anchor="end">${String(v).replace('-', '−')}</text>`;
    }
    const COLORS = ['gr-c0', 'gr-c1', 'gr-c2'], cid = `grc${++GRAPH_ID}`;
    // graphs stop at the grid's edge (a clip path), instead of running along its border
    b += `<clipPath id="${cid}"><rect x="${pad}" y="${pad}" width="${w - 2 * pad}" height="${H - 2 * pad}"/></clipPath><g clip-path="url(#${cid})">`;
    fns.forEach((f, i) => {
      if (f.kind === 'v') { b += `<line x1="${X(f.x)}" y1="${Y(yl)}" x2="${X(f.x)}" y2="${Y(yh)}" class="gr-fn ${COLORS[i % 3]}"${lw ? ` style="stroke-width:${lw}"` : ''}/>`; return; }
      const val = (x) => (f.kind === 'lin' ? f.m * x + f.b : f.kind === 'quad' ? f.a * (x - f.h) ** 2 + f.k : f.a * f.b ** x);
      let d = '', on = false;
      for (let k = 0; k <= 120; k++) {
        const x = xl + (k / 120) * (xh - xl), y = val(x);
        if (!Number.isFinite(y) || y < yl - (yh - yl) || y > yh + (yh - yl)) { on = false; continue; }
        const yc = Math.max(yl - 1, Math.min(yh + 1, y));
        d += `${on ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(yc).toFixed(1)} `; on = true;
      }
      b += `<path d="${d}" class="gr-fn ${COLORS[i % 3]}"${lw ? ` style="stroke-width:${lw}"` : ''}/>`;
      if (f.label) b += `<text x="${X(xh) - 4}" y="${Y(Math.max(yl, Math.min(yh, val(xh)))) - 6}" class="fg-text" font-size="12" text-anchor="end">${f.label}</text>`;
    });
    b += '</g>';
    pts.forEach(([x, y, l]) => { b += `<circle cx="${X(x)}" cy="${Y(y)}" r="4.5" class="tf-a"/>${l ? `<text x="${X(x) + 7}" y="${Y(y) - 7}" class="fg-text" font-size="12">${l}</text>` : ''}`; });
    return `<svg viewBox="0 0 ${w} ${H}" width="${w}" role="img" aria-label="A coordinate graph${fns.length ? ` with ${fns.length} graph${fns.length > 1 ? 's' : ''}` : ''}${pts.length ? ` and ${pts.length} point${pts.length > 1 ? 's' : ''}` : ''}">${b}<rect x="${pad}" y="${pad}" width="${w - 2 * pad}" height="${H - 2 * pad}" class="fg-stroke" style="fill:none;stroke-width:1"/></svg>`;
  }
  // Box plot of a five-number summary [min, Q1, median, Q3, max] above a number line from lo to hi (tick every step).
  function boxPlot(five, lo, hi, step = 5, title = '') {
    const W = 440, pad = 26, X = (v) => pad + ((v - lo) / (hi - lo)) * (W - 2 * pad), yb = title ? 44 : 30, yl = yb + 56;
    let b = title ? `<text x="${W / 2}" y="16" class="fg-text" font-size="14" text-anchor="middle">${title}</text>` : '';
    const [mn, q1, md, q3, mx] = five;
    b += `<line x1="${X(mn)}" y1="${yb + 20}" x2="${X(q1)}" y2="${yb + 20}" class="fg-stroke"/><line x1="${X(q3)}" y1="${yb + 20}" x2="${X(mx)}" y2="${yb + 20}" class="fg-stroke"/>`;
    b += `<line x1="${X(mn)}" y1="${yb + 10}" x2="${X(mn)}" y2="${yb + 30}" class="fg-stroke"/><line x1="${X(mx)}" y1="${yb + 10}" x2="${X(mx)}" y2="${yb + 30}" class="fg-stroke"/>`;
    b += `<rect x="${X(q1)}" y="${yb}" width="${X(q3) - X(q1)}" height="40" class="pc-head" style="stroke-width:2.5"/><line x1="${X(md)}" y1="${yb}" x2="${X(md)}" y2="${yb + 40}" class="fg-stroke" style="stroke-width:4"/>`;
    b += `<line x1="${pad - 8}" y1="${yl}" x2="${W - pad + 8}" y2="${yl}" class="fg-stroke"/>`;
    for (let v = lo; v <= hi + 1e-9; v += step) b += `<line x1="${X(v)}" y1="${yl - 6}" x2="${X(v)}" y2="${yl + 6}" class="fg-stroke" style="stroke-width:1.5"/><text x="${X(v)}" y="${yl + 22}" class="fg-text" font-size="13" text-anchor="middle">${v}</text>`;
    return svg(W, yl + 30, b, `Box plot${title ? ` ${title}` : ''}: minimum ${mn}, first quartile ${q1}, median ${md}, third quartile ${q3}, maximum ${mx}`);
  }
  // Solution of an inequality on a number line: x op v (op: < > ≤ ≥), or a compound [v1, op1, op2, v2].
  function ineqLine(v, op, lo = v - 6, hi = v + 6) {
    const W = 420, pad = 26, y = 44, X = (t) => pad + ((t - lo) / (hi - lo)) * (W - 2 * pad);
    let b = `<line x1="${pad - 12}" y1="${y}" x2="${W - pad + 12}" y2="${y}" class="fg-stroke"/>`;
    for (let t = Math.ceil(lo); t <= hi; t++) b += `<line x1="${X(t)}" y1="${y - 7}" x2="${X(t)}" y2="${y + 7}" class="fg-stroke" style="stroke-width:1.5"/><text x="${X(t)}" y="${y + 26}" class="fg-text" font-size="12" text-anchor="middle">${String(t).replace('-', '−')}</text>`;
    const closed = op === '≤' || op === '≥', right = op === '>' || op === '≥';
    b += `<line x1="${X(v)}" y1="${y}" x2="${right ? W - pad + 10 : pad - 10}" y2="${y}" class="gr-fn gr-c0" style="stroke-width:6"/>`;
    b += `<path d="M${right ? W - pad + 14 : pad - 14} ${y} l${right ? -12 : 12} -8 v16 z" class="ck-pin"/>`;
    b += `<circle cx="${X(v)}" cy="${y}" r="8" class="${closed ? 'tf-a' : 'pc-cell'}" style="stroke-width:3"/>`;
    return `<svg viewBox="0 0 ${W} 80" width="${W}" role="img" aria-label="Number line: x ${op} ${v}">${b}</svg>`;
  }

  // Several SVG pictures as answer choices labeled A–D (2 × 2 grid, or one column for wide pictures). Same layout
  // as Algebra 1 Quest's choicesFig; shared so other apps (SAT graph choices) can use it.
  function choices(svgs) {
    const dims = svgs.map((sv) => { const vb = sv.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); return [+vb[1], +vb[2]]; });
    const wide = dims.every(([w, h]) => w / h > 3), cols = wide ? 1 : 2, cw = wide ? 400 : 200, chh = wide ? 112 : 210, iw = wide ? 360 : 186, ih = wide ? 90 : 176;
    let body = '';
    svgs.forEach((sv, i) => {
      const [w, h] = dims[i], k = Math.min(iw / w, ih / h), col = i % cols, row = Math.floor(i / cols), x0 = col * cw, y0 = row * chh;
      const ix = wide ? x0 + 30 + (iw - w * k) / 2 : x0 + (cw - w * k) / 2, iy = wide ? y0 + (chh - h * k) / 2 : y0 + 30 + (ih - h * k) / 2;
      body += `<rect x="${x0 + 2}" y="${y0 + 2}" width="${cw - 6}" height="${chh - 6}" rx="12" class="pc-cell"/><text x="${x0 + 14}" y="${y0 + 26}" class="fg-text" font-size="18">${'ABCD'[i]}</text><g transform="translate(${ix} ${iy}) scale(${k})">${sv.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>`;
    });
    return `<svg viewBox="0 0 ${cols * cw} ${Math.ceil(svgs.length / cols) * chh}" width="${cols * cw}" role="img" aria-label="Choices ${'ABCD'.slice(0, svgs.length).split('').join(', ')}">${body}</svg>`;
  }
  // ===== Puzzle pictures (Puzzle Peak) =====
  // A balance in balance: items on each pan. An item is an emoji, or a number (drawn as a weight block with that number).
  function balance(left, right, { tilt = 0 } = {}) {
    const W = 340, cx = W / 2, beamY = 40 + tilt * 0, pan = (items, x0, y) => {
      const n = items.length, per = Math.min(5, Math.max(1, n)), rows = Math.ceil(n / per), s = 30;
      let b = `<path d="M${x0 - 62} ${y} h124 l-14 16 h-96 z" class="fg-fill"/>`;
      items.forEach((it, i) => {
        const r = Math.floor(i / per), c = i % per, inRow = Math.min(per, n - r * per), x = x0 - (inRow * s) / 2 + c * s + s / 2, yy = y - 4 - r * s;
        b += /^\d+$/.test(String(it)) ? `<rect x="${x - 13}" y="${yy - 26}" width="26" height="24" rx="4" class="bm-part bm-p2"/><text x="${x}" y="${yy - 9}" class="fg-text" font-size="13" text-anchor="middle">${it}</text>`
          : `<text x="${x}" y="${yy - 3}" font-size="24" text-anchor="middle">${it}</text>`;
      });
      return { b, top: y - rows * s - 6 };
    };
    const L = pan(left, cx - 100, beamY + 40), R = pan(right, cx + 100, beamY + 40);
    const top = Math.min(L.top, R.top, 6), dy = 10 - top;
    let body = `<g transform="translate(0 ${dy})">`;
    body += `<path d="M${cx} ${beamY} L${cx - 22} ${beamY + 92} h44 z" class="fg-fill"/><line x1="${cx - 100}" y1="${beamY}" x2="${cx + 100}" y2="${beamY}" class="fg-stroke" style="stroke-width:4"/>`;
    body += `<line x1="${cx - 100}" y1="${beamY}" x2="${cx - 100}" y2="${beamY + 40}" class="fg-stroke"/><line x1="${cx + 100}" y1="${beamY}" x2="${cx + 100}" y2="${beamY + 40}" class="fg-stroke"/>`;
    body += L.b + R.b + `<circle cx="${cx}" cy="${beamY}" r="6" class="tf-a"/></g>`;
    return svg(W, beamY + 96 + dy, body, `A balance: ${left.join(' ')} on the left balance ${right.join(' ')} on the right`);
  }
  // A number pyramid: rows from the top down; each brick sits on the two below it. Cells: numbers, '?' (dashed), or ''.
  function pyramid(rows) {
    const n = rows.length, bw = 64, bh = 38, W = n * bw + 8;
    let body = '';
    rows.forEach((row, r) => {
      const x0 = 4 + ((n - row.length) * bw) / 2;
      row.forEach((v, i) => {
        const x = x0 + i * bw, y = 4 + r * bh, unk = v === '?';
        body += `<rect x="${x + 2}" y="${y + 2}" width="${bw - 4}" height="${bh - 4}" rx="6" class="${unk ? 'bm-unknown' : 'bm-part bm-p' + (r % 3)}"/>${v === '' ? '' : `<text x="${x + bw / 2}" y="${y + bh / 2 + 6}" class="fg-text" font-size="17" text-anchor="middle">${v}</text>`}`;
      });
    });
    return svg(W, n * bh + 8, body, `A number pyramid: ${rows.map((r) => r.join(' ')).join(' / ')}`);
  }
  // A string of beads that repeats (colors: r g b y p o k = red green blue yellow purple orange black), then `more` '?' beads.
  const BEAD = { r: '#e0484d', g: '#2f9e57', b: '#2b6fd6', y: '#f2b01e', p: '#8a5bd6', o: '#ee7d22', k: '#333a4d' };
  function beads(list, more = 1) {
    const s = 34, W = (list.length + more) * s + 16;
    let body = `<line x1="6" y1="24" x2="${W - 6}" y2="24" class="fg-stroke" style="stroke-width:2"/>`;
    list.forEach((c, i) => { body += `<circle cx="${14 + i * s + s / 2 - 6}" cy="24" r="14" fill="${BEAD[c]}" stroke="#1d2640" stroke-width="1.5"/>`; });
    for (let i = 0; i < more; i++) { const x = 14 + (list.length + i) * s + s / 2 - 6; body += `<circle cx="${x}" cy="24" r="14" class="bm-unknown"/><text x="${x}" y="30" class="fg-text" font-size="16" text-anchor="middle">?</text>`; }
    return svg(W, 48, body, `Beads: ${list.join(' ')} then ${more} unknown`);
  }
  // Columns of unit cubes seen from the front (heights left to right), with a slight top face.
  function cubeStack(heights) {
    const s = 26, d = 8, H = Math.max(...heights), W = heights.length * s + d + 8;
    let body = '';
    heights.forEach((h, c) => {
      for (let k = 0; k < h; k++) {
        const x = 4 + c * s, y = d + 4 + (H - 1 - k) * s;
        body += `<rect x="${x}" y="${y}" width="${s}" height="${s}" class="fg-fill"/>`;
        if (k === h - 1) body += `<path d="M${x} ${y} l${d} ${-d} h${s} l${-d} ${d} z" class="fg-fill" style="opacity:.75"/>`;
        if (c === heights.length - 1 || heights[c + 1] <= k) body += `<path d="M${x + s} ${y} l${d} ${-d} v${s} l${-d} ${d} z" class="fg-fill" style="opacity:.55"/>`;
      }
    });
    return svg(W, H * s + d + 8, body, `Stacks of cubes, ${heights.join(', ')} high`);
  }
  // A street grid of w × h blocks with A at the bottom left and B at the top right (shortest paths go right and up).
  function gridPath(w, h) {
    const g = 40, x0 = 22, y0 = 14, W = x0 + w * g + 26, H = y0 + h * g + 30;
    let body = '';
    for (let i = 0; i <= w; i++) body += `<line x1="${x0 + i * g}" y1="${y0}" x2="${x0 + i * g}" y2="${y0 + h * g}" class="fg-stroke" style="stroke-width:2.5"/>`;
    for (let j = 0; j <= h; j++) body += `<line x1="${x0}" y1="${y0 + j * g}" x2="${x0 + w * g}" y2="${y0 + j * g}" class="fg-stroke" style="stroke-width:2.5"/>`;
    body += `<circle cx="${x0}" cy="${y0 + h * g}" r="9" class="tf-a"/><text x="${x0 - 4}" y="${y0 + h * g + 26}" class="fg-text" font-size="16" text-anchor="middle">A</text>`;
    body += `<circle cx="${x0 + w * g}" cy="${y0}" r="9" class="tf-a"/><text x="${x0 + w * g + 16}" y="${y0 + 6}" class="fg-text" font-size="16">B</text>`;
    return svg(W, H, body, `A grid of streets ${w} blocks wide and ${h} blocks tall, from A to B`);
  }
  // A month page: `first` = weekday of the 1st (0 = Sunday), `days` in the month; marks {day: label} (label '?' or '★').
  function calendar(first, days, marks = {}, title = '') {
    const cw = 40, ch = 30, top = title ? 26 : 0, rows = Math.ceil((first + days) / 7), W = 7 * cw + 4;
    let body = title ? `<text x="${W / 2}" y="18" class="fg-text" font-size="15" text-anchor="middle">${title}</text>` : '';
    'SMTWTFS'.split('').forEach((d, i) => { body += `<text x="${2 + i * cw + cw / 2}" y="${top + 18}" class="fg-text" font-size="13" text-anchor="middle">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</text>`; });
    for (let day = 1; day <= days; day++) {
      const k = first + day - 1, r = Math.floor(k / 7), c = k % 7, x = 2 + c * cw, y = top + 26 + r * ch, m = marks[day];
      body += `<rect x="${x + 1}" y="${y + 1}" width="${cw - 2}" height="${ch - 2}" rx="4" class="${m ? 'bm-unknown' : 'pc-cell'}" style="${m ? '' : 'fill:var(--surface)'}"/><text x="${x + cw / 2}" y="${y + 20}" class="fg-text" font-size="13" text-anchor="middle">${m === '?' ? '?' : day}</text>`;
    }
    return svg(W, top + 30 + rows * ch, body, `A calendar month that starts on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][first]}`);
  }
  // Two dice faces (values 1–6), or a 6 × 6 table of sums when sums = true.
  function dice(a, b) {
    const pip = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
    const face = (v, x) => `<rect x="${x}" y="4" width="64" height="64" rx="12" class="pc-cell" style="fill:var(--surface);stroke-width:3"/>` + pip[v].map(([i, j]) => `<circle cx="${x + 14 + i * 18}" cy="${18 + j * 18}" r="6" class="fg-text"/>`).join('');
    return svg(160, 72, face(a, 4) + face(b, 88), `Two dice showing ${a} and ${b}`);
  }

  // A regular polygon with n sides (any n ≥ 3), one corner at the top.
  function regular(n) {
    const R0 = 70, c = 76, pts = Array.from({ length: n }, (_, i) => { const t = -Math.PI / 2 + (2 * Math.PI * i) / n; return `${(c + R0 * Math.cos(t)).toFixed(1)},${(c + R0 * Math.sin(t)).toFixed(1)}`; });
    return svg(152, 152, `<polygon points="${pts.join(' ')}" class="fg-fill"/>`, `a regular polygon with ${n} sides`);
  }

  return { regular, balance, pyramid, beads, cubeStack, gridPath, calendar, dice, choices, blocks, addBlocks, fraction, clock, hands, coins, coinSvg, COIN, ruler, barGraph, picGraph, linePlot, array, rect, shape,
    tenFrames, barModel, compareBars, bond, groups, tensGroups, placeChart, roundLine, jumps, shapeRow, picture, priceTags,
    table, angle, angleSplit, protractor, areaModel, decimalGrid, numLine, lines, symmetry, SYM_LINES, triangle, coordGrid, prism, timesBars, shareBar, fracStrips, pair, pageFig, listFig, diagramFig, graph, ineqLine, boxPlot };
})();
