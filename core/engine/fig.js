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
    const top = Math.max(...Object.values(counts)), base = 40 + top * 22;
    let body = `<text x="${W / 2}" y="16" class="fg-text" font-size="15" text-anchor="middle">${title}</text><line x1="${pad - 10}" y1="${base}" x2="${W - pad + 10}" y2="${base}" class="fg-stroke"/>`;
    for (let i = 0; i <= n; i++) {
      const v = min + i / den;
      const whole = Number.isInteger(v);
      body += `<line x1="${x(v)}" y1="${base - 7}" x2="${x(v)}" y2="${base + 7}" class="fg-stroke"/>`;
      const lbl = whole ? String(v) : (den === 2 ? `${Math.floor(v) || ''} ½` : den === 4 ? `${Math.floor(v) || ''} ${['', '¼', '½', '¾'][Math.round((v % 1) * 4)]}` : '');
      body += `<text x="${x(v)}" y="${base + 25}" class="fg-text" font-size="${whole ? 17 : den === 4 ? 11 : 14}" text-anchor="middle">${lbl.trim()}</text>`;
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
  function rect(w, h, { grid = true, labels = false, unit = '' } = {}) {
    const g = Math.min(32, 240 / Math.max(w, h)), x0 = labels ? 62 : 4, y0 = 4, W = w * g, H = h * g;
    let body = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" class="fg-fill"/>`;
    if (grid) { for (let i = 1; i < w; i++) body += `<line x1="${x0 + i * g}" y1="${y0}" x2="${x0 + i * g}" y2="${y0 + H}" class="fg-stroke" style="stroke-width:1.5"/>`; for (let j = 1; j < h; j++) body += `<line x1="${x0}" y1="${y0 + j * g}" x2="${x0 + W}" y2="${y0 + j * g}" class="fg-stroke" style="stroke-width:1.5"/>`; }
    if (labels) body += `<text x="${x0 + W / 2}" y="${y0 + H + 22}" class="fg-text" font-size="15" text-anchor="middle">${w} ${unit}</text><text x="${x0 - 8}" y="${y0 + H / 2 + 5}" class="fg-text" font-size="15" text-anchor="end">${h} ${unit}</text>`;
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

  return { blocks, addBlocks, fraction, clock, hands, coins, coinSvg, COIN, ruler, barGraph, picGraph, linePlot, array, rect, shape };
})();
