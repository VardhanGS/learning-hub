// Code Quest stage: draws a runtime's state on a canvas (480×360 stage units, sharp on any screen) and turns finger
// and mouse input into stage coordinates. All backdrops are drawn here, so there are no image files to load.
const CodeStage = (() => {
  const W = 480, H = 360, SCALE = 2;

  const BG = {
    blank(g) { g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H); },
    meadow(g) {
      sky(g, '#9ed8f5', '#dff3fb');
      g.fillStyle = '#7cc66d'; g.beginPath(); g.moveTo(0, 230); g.quadraticCurveTo(140, 190, 280, 232); g.quadraticCurveTo(390, 262, W, 220); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      g.fillStyle = '#5fae55'; g.fillRect(0, 300, W, 60);
      circle(g, 415, 55, 28, '#ffd95a');
    },
    night(g) {
      sky(g, '#10163a', '#2b2f66');
      dots(g, 50, '#fff', 1.4, 7);
      circle(g, 400, 65, 30, '#f4efc8'); circle(g, 412, 58, 26, '#141b42');
      g.fillStyle = '#141a33'; g.fillRect(0, 310, W, 50);
    },
    ocean(g) {
      sky(g, '#2fa6d8', '#0d4f8b');
      g.fillStyle = 'rgba(255,255,255,.14)';
      for (let i = 0; i < 4; i++) { g.beginPath(); g.ellipse(70 + i * 120, 40 + (i % 2) * 22, 60, 9, 0, 0, 7); g.fill(); }
      g.fillStyle = '#d9c48a'; g.beginPath(); g.moveTo(0, 325); g.quadraticCurveTo(240, 295, W, 330); g.lineTo(W, H); g.lineTo(0, H); g.fill();
    },
    city(g) {
      sky(g, '#ffc9a8', '#fff0d9');
      const hs = [120, 170, 95, 200, 140, 180, 110, 150];
      hs.forEach((h, i) => {
        g.fillStyle = i % 2 ? '#6a6f8f' : '#54597a'; g.fillRect(i * 60, 310 - h, 56, h);
        g.fillStyle = '#ffe9a8';
        for (let y = 318 - h; y < 296; y += 24) for (let x = 8; x < 48; x += 18) g.fillRect(i * 60 + x, y, 8, 11);
      });
      g.fillStyle = '#42445a'; g.fillRect(0, 310, W, 50);
    },
    space(g) {
      sky(g, '#05060f', '#1a1038');
      dots(g, 90, '#fff', 1.1, 11);
      circle(g, 90, 80, 34, '#d9734e'); circle(g, 80, 72, 9, '#b95a38');
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3; g.beginPath(); g.ellipse(395, 270, 52, 14, -0.3, 0, 7); g.stroke();
      circle(g, 395, 270, 26, '#8fb4f0');
    },
    desert(g) {
      sky(g, '#ffdf9e', '#fff4d6');
      circle(g, 90, 70, 34, '#ffb733');
      g.fillStyle = '#e8b66c'; g.beginPath(); g.moveTo(0, 245); g.quadraticCurveTo(170, 195, 330, 250); g.quadraticCurveTo(410, 275, W, 240); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      g.fillStyle = '#d29c50'; g.fillRect(0, 310, W, 50);
    },
    grid(g) {
      g.fillStyle = '#fbfcff'; g.fillRect(0, 0, W, H);
      g.strokeStyle = '#d9e0ef'; g.lineWidth = 1;
      for (let x = 0; x <= W; x += 40) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      for (let y = 0; y <= H; y += 40) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      g.strokeStyle = '#9aa7c7'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke();
    },
  };
  function sky(g, a, b) { const l = g.createLinearGradient(0, 0, 0, H); l.addColorStop(0, a); l.addColorStop(1, b); g.fillStyle = l; g.fillRect(0, 0, W, H); }
  function circle(g, x, y, r, c) { g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  function dots(g, n, c, r, seed) { let s = seed; const next = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; for (let i = 0; i < n; i++) circle(g, next() * W, next() * 280, r * (0.5 + next()), c); }

  class Stage {
    constructor(canvas) {
      this.canvas = canvas;
      canvas.width = W * SCALE; canvas.height = H * SCALE;
      this.g = canvas.getContext('2d');
      this.emoji = new Map();
      this.bgs = new Map();
      this.penLayer = document.createElement('canvas');
      this.penLayer.width = W * SCALE; this.penLayer.height = H * SCALE;
      this.penDrawn = 0; this.penVersion = -1;
    }

    // Emoji are drawn once to their own small canvas, because text is slow to draw many times a frame.
    emojiImage(e) {
      if (this.emoji.has(e)) return this.emoji.get(e);
      const c = document.createElement('canvas'), S = 128;
      c.width = S; c.height = S;
      const g = c.getContext('2d');
      g.font = `${S * 0.78}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(e, S / 2, S / 2 + S * 0.05);
      this.emoji.set(e, c);
      return c;
    }

    background(name) {
      const key = BG[name] ? name : 'blank';
      if (this.bgs.has(key)) return this.bgs.get(key);
      const c = document.createElement('canvas');
      c.width = W * SCALE; c.height = H * SCALE;
      const g = c.getContext('2d');
      g.scale(SCALE, SCALE);
      BG[key](g);
      this.bgs.set(key, c);
      return c;
    }

    drawPen(rt) {
      const g = this.penLayer.getContext('2d');
      if (rt.penVersion !== this.penVersion || rt.pen.length < this.penDrawn) { g.clearRect(0, 0, this.penLayer.width, this.penLayer.height); this.penDrawn = 0; this.penVersion = rt.penVersion; }
      g.lineWidth = 3 * SCALE; g.lineCap = 'round';
      for (; this.penDrawn < rt.pen.length; this.penDrawn++) {
        const p = rt.pen[this.penDrawn];
        g.strokeStyle = p.c;
        g.beginPath();
        g.moveTo((p.x0 + W / 2) * SCALE, (H / 2 - p.y0) * SCALE);
        g.lineTo((p.x1 + W / 2) * SCALE, (H / 2 - p.y1) * SCALE);
        g.stroke();
      }
    }

    draw(rt, mark) {
      const g = this.g;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.drawImage(this.background(rt.backdrop), 0, 0);
      this.drawGhost(rt);
      this.drawPen(rt);
      g.drawImage(this.penLayer, 0, 0);
      g.setTransform(SCALE, 0, 0, SCALE, (W / 2) * SCALE, (H / 2) * SCALE);
      if (rt.grid) this.drawGrid(rt);
      rt.sprites.forEach((s) => { if (s.visible && !s.dead) this.drawSprite(s); });
      if (rt.grid) this.drawHeading(rt);
      rt.sprites.forEach((s) => { if (s.visible && !s.dead && s.bubble) this.drawBubble(s); });
      this.drawVars(rt);
      if (mark) this.drawMark(mark);
    }

    // The drawing a level asks for, dotted, to trace over.
    drawGhost(rt) {
      if (!rt.ghost) return;
      const g = this.g;
      g.save();
      g.lineWidth = 3 * SCALE; g.strokeStyle = 'rgba(106,79,208,.38)'; g.setLineDash([5 * SCALE, 7 * SCALE]);
      rt.ghost.forEach((p) => { g.beginPath(); g.moveTo((p.x0 + W / 2) * SCALE, (H / 2 - p.y0) * SCALE); g.lineTo((p.x1 + W / 2) * SCALE, (H / 2 - p.y1) * SCALE); g.stroke(); });
      g.restore();
    }

    // Puzzle squares, walls, coins and the gem. The sprites are drawn on top.
    drawGrid(rt) {
      const g = this.g, m = rt.grid, C = CodeRuntime.CELL;
      g.fillStyle = '#23304f'; g.fillRect(-W / 2, -H / 2, W, H);
      for (let r = 0; r < m.rows; r++) for (let c = 0; c < m.cols; c++) {
        const p = rt.cellXY(m, c, r), x = p.x - C / 2, y = -p.y - C / 2, key = `${c},${r}`;
        if (m.walls.has(key)) {
          g.fillStyle = '#6d5a48'; g.beginPath(); g.roundRect(x + 2, y + 2, C - 4, C - 4, 8); g.fill();
          g.fillStyle = '#857058'; g.fillRect(x + 10, y + 12, 18, 7); g.fillRect(x + 30, y + 30, 18, 7);
        } else {
          g.fillStyle = (c + r) % 2 ? '#dff2cf' : '#cfeab9'; g.fillRect(x, y, C, C);
        }
        if (m.coins.has(key)) this.emojiAt('🪙', p.x, p.y, 34);
        if (m.goal === key) this.emojiAt('💎', p.x, p.y, 40);
      }
      if (m.bumped) this.emojiAt('💥', rt.sprites[0].x + 14, -rt.sprites[0].y - 14, 40, true);
    }
    emojiAt(e, x, y, px, raw) { this.g.drawImage(this.emojiImage(e), x - px / 2, (raw ? y : -y) - px / 2, px, px); }

    // A grid walker's picture doesn't show which way it faces, so an arrow does.
    drawHeading(rt) {
      const g = this.g, s = rt.sprites[0];
      g.save();
      g.translate(s.x, -s.y);
      g.rotate((s.dir * Math.PI) / 180);
      g.fillStyle = '#e0352b'; g.strokeStyle = '#fff'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(0, -31); g.lineTo(9, -19); g.lineTo(-9, -19); g.closePath(); g.stroke(); g.fill();
      g.restore();
    }

    // In a goal clip: a hand where a tap happens, or the key being pressed.
    drawMark(mark) {
      const g = this.g;
      if (mark.key) {
        g.font = '700 22px Fredoka, system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
        const w = g.measureText(mark.key).width + 24;
        g.fillStyle = '#2a2350'; g.beginPath(); g.roundRect(-w / 2, H / 2 - 44, w, 36, 9); g.fill();
        g.fillStyle = '#fff'; g.fillText(mark.key, 0, H / 2 - 26);
      } else this.emojiAt('👆', mark.x, mark.y - 18, 44);
    }

    drawSprite(s) {
      const g = this.g, px = (CodeRuntime.BASE * s.size) / 100, img = this.emojiImage(s.emoji);
      g.save();
      g.translate(s.x, -s.y);
      let flip = s.facing === -1 ? -1 : 1;
      if (s.rot === 'all') g.rotate(((s.dir - 90) * Math.PI) / 180);
      else if (s.rot === 'flip' && s.dir < 0) flip = -flip;
      g.scale(flip, 1);
      g.drawImage(img, -px / 2, -px / 2, px, px);
      g.restore();
    }

    drawBubble(s) {
      const g = this.g, text = s.bubble.text.slice(0, 80);
      g.font = '600 15px Andika, system-ui, sans-serif';
      const pad = 8, w = Math.min(190, g.measureText(text).width + pad * 2), lines = wrap(g, text, w - pad * 2), h = lines.length * 18 + pad * 2;
      const r = (CodeRuntime.BASE * s.size * 0.42) / 100;
      const x = Math.max(-W / 2 + 4, Math.min(W / 2 - w - 4, s.x + r * 0.5)), y = Math.max(-H / 2 + 4, Math.min(H / 2 - h - 12, -s.y - r - h - 8));
      g.fillStyle = '#fff'; g.strokeStyle = '#6b7390'; g.lineWidth = 1.5;
      g.beginPath(); g.roundRect(x, y, w, h, 10); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(x + 14, y + h); g.lineTo(x + 10, y + h + 9); g.lineTo(x + 26, y + h); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#fff'; g.fillRect(x + 13, y + h - 2, 12, 3);
      g.fillStyle = '#1d2333'; g.textAlign = 'left'; g.textBaseline = 'middle';
      lines.forEach((l, i) => g.fillText(l, x + pad, y + pad + 9 + i * 18));
    }

    drawVars(rt) {
      const g = this.g;
      let y = -H / 2 + 6;
      g.font = '700 13px Fredoka, system-ui, sans-serif'; g.textBaseline = 'middle'; g.textAlign = 'left';
      [...rt.shownVars].forEach((name) => {
        const t = `${name}: ${rt.vars[name] ?? 0}`, w = g.measureText(t).width + 16;
        g.fillStyle = 'rgba(224,98,43,.94)'; g.beginPath(); g.roundRect(-W / 2 + 6, y, w, 22, 7); g.fill();
        g.fillStyle = '#fff'; g.fillText(t, -W / 2 + 14, y + 11);
        y += 26;
      });
    }

    // Screen position → stage units.
    toStage(clientX, clientY) {
      const r = this.canvas.getBoundingClientRect();
      return { x: Math.round(((clientX - r.left) / r.width - 0.5) * W), y: Math.round((0.5 - (clientY - r.top) / r.height) * H) };
    }
  }

  function wrap(g, text, max) {
    const lines = [];
    let cur = '';
    String(text).split(/\s+/).forEach((word) => {
      const t = cur ? `${cur} ${word}` : word;
      if (g.measureText(t).width > max && cur) { lines.push(cur); cur = word; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines.slice(0, 5);
  }

  return { Stage, W, H };
})();
