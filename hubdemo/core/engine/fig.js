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

  return { blocks, addBlocks, fraction };
})();
