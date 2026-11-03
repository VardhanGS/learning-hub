// Code Quest runtime: runs compiled scripts on a 480×360 stage (origin in the middle, y up; direction 90 = right,
// 0 = up). Each script is a generator-based thread. A tick runs every thread until it yields, and loops yield once
// per pass, so `forever` can never freeze the page. Time counts ticks, not the clock, and random numbers are seeded,
// so a run can be repeated exactly in tests. No DOM here: stage.js draws the state, and hooks play the sounds.
const CodeRuntime = (() => {
  const FPS = 30, HALF_W = 240, HALF_H = 180, BASE = 48, MAX_CLONES = 100, MAX_PEN = 20000, MAX_EVENTS = 4000, CELL = 60, STEP_TICKS = 10, TURN_TICKS = 5;
  const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
  const norm = (d) => { let x = ((d + 180) % 360 + 360) % 360 - 180; if (x === -180) x = 180; return x; };
  const truthy = (v) => v === true || (v !== false && v !== 0 && v !== '' && v !== '0' && v !== 'false');
  const isNumeric = (v) => v !== '' && v !== null && !Number.isNaN(Number(v));
  const round = (n) => Math.round(n * 1e6) / 1e6;

  class Runtime {
    // model: { sprites: [{id, name, emoji, x, y, dir, size, visible, rot, scripts}], backdrop, vars: [names], seed }
    constructor(model, hooks = {}) {
      this.model = model;
      this.hooks = hooks;
      this.reset();
    }

    reset() {
      const m = this.model;
      this.ticks = 0; this.timerStart = 0; this.threads = []; this.nextId = 1; this.clones = 0;
      this.rng = (m.seed >>> 0) || 12345;
      this.sprites = m.sprites.map((s) => this.instance(s));
      this.backdrop = m.backdrop || 'blank';
      this.vars = Object.fromEntries((m.vars || []).map((n) => [n, 0]));
      this.shownVars = new Set(m.shownVars || []);
      this.keys = new Set();
      this.mouse = { x: 0, y: 0, down: false };
      this.pen = []; this.penVersion = 0;
      this.pending = [];
      this.running = false;
      this.events = []; // what happened in this run, for level goals
      this.grid = m.maps ? this.loadGrid(m.maps[(m.variant || 0) % m.maps.length]) : null;
    }

    // A puzzle map is rows of text: . floor, # wall, R start, * gem (the goal), o coin. The first sprite walks it.
    loadGrid(rows) {
      const g = { rows: rows.length, cols: Math.max(...rows.map((r) => r.length)), walls: new Set(), coins: new Set(), goal: null, won: false, bumped: false, picks: 0, wrongPick: false, c: 0, r: 0 };
      rows.forEach((row, r) => [...row].forEach((ch, c) => {
        if (ch === '#') g.walls.add(`${c},${r}`);
        if (ch === 'o') g.coins.add(`${c},${r}`);
        if (ch === '*') g.goal = `${c},${r}`;
        if (ch === 'R') { g.c = c; g.r = r; }
      }));
      g.total = g.coins.size;
      const a = this.sprites[0], p = this.cellXY(g, g.c, g.r);
      a.x = p.x; a.y = p.y; a.rot = 'none';
      return g;
    }
    cellXY(g, c, r) { return { x: (c - (g.cols - 1) / 2) * CELL, y: ((g.rows - 1) / 2 - r) * CELL }; }
    gridOpen(g, c, r) { return c >= 0 && r >= 0 && c < g.cols && r < g.rows && !g.walls.has(`${c},${r}`); }
    // The square `turn` degrees from where the sprite faces, one step away.
    ahead(sp, turn = 0) {
      const a = (((sp.dir + turn) % 360) + 360) % 360;
      return a === 0 ? [0, -1] : a === 90 ? [1, 0] : a === 180 ? [0, 1] : [-1, 0];
    }
    note(type, sp, data) { if (this.events.length < MAX_EVENTS) this.events.push({ type, s: sp ? sp.id : null, t: this.ticks, ...data }); }

    instance(s) {
      return { uid: this.nextId++, id: s.id, name: s.name, emoji: s.emoji, x: s.x || 0, y: s.y || 0, dir: s.dir ?? 90, size: s.size || 100, visible: s.visible !== false, rot: s.rot || 'all', facing: s.facing || 1, bubble: null, penOn: false, penColor: '#6a4fd0', isClone: false, dead: false, scripts: s.scripts || [] };
    }

    random() { // mulberry32: small, seeded, and the same in every browser
      this.rng = (this.rng + 0x6D2B79F5) >>> 0;
      let t = this.rng;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    // ---- events ----
    flag() { this.reset(); this.fire((e) => e.type === 'flag'); this.running = true; }
    stopAll() { this.threads = []; this.pending = []; this.running = false; this.sprites.forEach((s) => { s.bubble = null; }); }
    press(key) { if (this.keys.has(key)) return; this.keys.add(key); this.note('key', null, { key }); this.fire((e) => e.type === 'key' && (e.key === key || e.key === 'any'), false); }
    release(key) { this.keys.delete(key); }
    setMouse(x, y, down) { this.mouse.x = x; this.mouse.y = y; if (down !== undefined) this.mouse.down = down; }
    tap(sprite) { this.note('tap', sprite); this.fire((e) => e.type === 'tap', false, sprite); }
    broadcast(msg) { this.fire((e) => e.type === 'recv' && e.msg === msg, true); }

    // restart: a script already running starts over (broadcasts); otherwise a repeat event is ignored while it runs
    // (holding a key must not pile up threads).
    fire(match, restart = true, only = null) {
      this.sprites.forEach((sp) => {
        if (sp.dead || (only && sp !== only)) return;
        sp.scripts.forEach((script) => { if (match(script.event)) this.startThread(sp, script, restart); });
      });
    }

    startThread(sp, script, restart) {
      const old = [...this.threads, ...this.pending].find((t) => t.sprite === sp && t.script === script && !t.done);
      if (old) { if (!restart) return; old.done = true; }
      this.pending.push({ sprite: sp, script, gen: this.run(sp, script.body, null), done: false, cur: null });
    }

    // ---- one frame ----
    tick() {
      this.ticks++;
      if (this.pending.length) { this.threads.push(...this.pending); this.pending = []; }
      for (const th of this.threads) {
        if (th.done) continue;
        if (th.sprite.dead) { th.done = true; continue; }
        this.current = th;
        const r = th.gen.next();
        if (r.done) { th.done = true; th.cur = null; }
        if (this.halted) break;
      }
      this.current = null;
      if (this.halted) { this.halted = false; this.stopAll(); return; }
      this.threads = this.threads.filter((t) => !t.done);
      this.sprites.forEach((s) => { if (s.bubble && s.bubble.until != null && this.ticks >= s.bubble.until) s.bubble = null; });
      if (this.sprites.some((s) => s.dead)) this.sprites = this.sprites.filter((s) => !s.dead);
      if (!this.threads.length && !this.pending.length) this.running = false;
    }

    // Blocks running right now, per sprite id, so the editor can light them up.
    activeBlocks(spriteId) { return this.threads.filter((t) => t.sprite.id === spriteId && t.cur).map((t) => t.cur); }

    // ---- statements ----
    * run(sp, list) {
      for (const st of list) {
        const th = this.current;
        if (th) th.cur = st.id;
        yield* this.exec(sp, st);
        if (sp.dead) return;
      }
    }

    * exec(sp, st) {
      const e = (x) => this.val(sp, x);
      switch (st.op) {
        case 'move': { const n = num(e(st.n)), a = (sp.dir * Math.PI) / 180; this.moveTo(sp, sp.x + n * Math.sin(a), sp.y + n * Math.cos(a)); break; }
        case 'turn': sp.dir = norm(sp.dir + st.sign * num(e(st.n))); this.note('turn', sp); break;
        case 'goto': this.moveTo(sp, num(e(st.x)), num(e(st.y))); this.note('goto', sp); break;
        case 'glide': {
          const secs = num(e(st.secs)), x0 = sp.x, y0 = sp.y, x1 = num(e(st.x)), y1 = num(e(st.y)), n = Math.round(secs * FPS);
          for (let i = 1; i <= n; i++) { this.moveTo(sp, x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n); yield; if (sp.dead) return; }
          this.moveTo(sp, x1, y1);
          this.note('glide', sp);
          break;
        }
        case 'point': sp.dir = norm(num(e(st.n))); this.note('point', sp); break;
        case 'changex': this.moveTo(sp, sp.x + num(e(st.n)), sp.y); break;
        case 'changey': this.moveTo(sp, sp.x, sp.y + num(e(st.n))); break;
        case 'setx': this.moveTo(sp, num(e(st.n)), sp.y); break;
        case 'sety': this.moveTo(sp, sp.x, num(e(st.n))); break;
        case 'bounce': this.bounce(sp); break;
        case 'rotstyle': sp.rot = st.style; break;
        case 'say': {
          const n = Math.max(0, num(e(st.secs)));
          sp.bubble = { text: String(e(st.text)), until: null };
          this.note('say', sp, { text: sp.bubble.text, until: this.ticks + Math.round(n * FPS) });
          yield* this.sleep(n, sp);
          sp.bubble = null;
          break;
        }
        case 'saynow': { const t = String(e(st.text)); sp.bubble = t ? { text: t, until: null } : null; if (t) this.note('say', sp, { text: t, until: this.ticks }); break; }
        case 'costume': sp.emoji = st.emoji; this.note('costume', sp, { emoji: st.emoji }); break;
        case 'sizeset': sp.size = this.clampSize(num(e(st.n))); break;
        case 'sizechange': sp.size = this.clampSize(sp.size + num(e(st.n))); break;
        case 'visible': sp.visible = st.on; break;
        case 'backdrop': this.backdrop = st.name; this.note('backdrop', sp, { name: st.name }); break;
        case 'pen': sp.penOn = st.on; break;
        case 'pencolor': sp.penColor = st.color; break;
        case 'penclear': this.pen = []; this.penVersion++; break;
        case 'sfx': this.hooks.sfx && this.hooks.sfx(st.name); this.note('sfx', sp, { name: st.name }); break;
        case 'note': { const b = Math.max(0, num(e(st.beats))); this.note('note', sp, { n: Number(st.n) }); this.hooks.note && this.hooks.note(Number(st.n), b / 2); yield* this.sleep(b / 2, sp); break; }
        case 'wait': yield* this.sleep(num(e(st.secs)), sp); break;
        case 'repeat': {
          const n = Math.floor(num(e(st.n)));
          for (let i = 0; i < n; i++) { yield* this.run(sp, st.body); if (sp.dead) return; yield; }
          break;
        }
        case 'forever':
          for (;;) { yield* this.run(sp, st.body); if (sp.dead) return; yield; }
        case 'if': yield* this.run(sp, truthy(e(st.c)) ? st.body : st.other); break;
        case 'waituntil': while (!truthy(e(st.c))) { yield; if (sp.dead) return; } break;
        case 'stop':
          if (st.what === 'all') { this.halted = true; yield; return; }
          this.current.done = true; yield; return;
        case 'clone': this.makeClone(sp); break;
        case 'delclone': if (sp.isClone) { sp.dead = true; this.clones--; yield; return; } break;
        case 'send': this.note('send', sp, { msg: st.msg }); this.broadcast(st.msg); break;
        case 'timerreset': this.timerStart = this.ticks; break;
        case 'setvar': this.vars[st.name] = e(st.v); break;
        case 'changevar': this.vars[st.name] = round(num(this.vars[st.name]) + num(e(st.v))); break;
        case 'showvar': if (st.on) this.shownVars.add(st.name); else this.shownVars.delete(st.name); break;
        case 'gstep': yield* this.gridStep(sp); break;
        case 'gturn':
          if (!this.grid) break;
          sp.dir = norm(sp.dir + st.sign * 90);
          this.note('turn', sp);
          yield* this.pause(TURN_TICKS, sp);
          break;
        case 'gpick': {
          const g = this.grid;
          if (!g) break;
          const at = `${g.c},${g.r}`;
          if (g.coins.delete(at)) { g.picks++; this.hooks.sfx && this.hooks.sfx('star'); this.note('pick', sp); } else g.wrongPick = true;
          this.finishIfWon(g);
          yield* this.pause(TURN_TICKS, sp);
          break;
        }
        default: break;
      }
    }

    // One square forward, drawn as a short walk. A wall ends the run with a bump.
    * gridStep(sp) {
      const g = this.grid;
      if (!g) return;
      const [dc, dr] = this.ahead(sp), c = g.c + dc, r = g.r + dr;
      if (!this.gridOpen(g, c, r)) { g.bumped = true; this.hooks.sfx && this.hooks.sfx('wrong'); this.note('bump', sp); this.halted = true; yield; return; }
      this.note('step', sp);
      const a = { x: sp.x, y: sp.y }, b = this.cellXY(g, c, r);
      for (let i = 1; i <= STEP_TICKS; i++) { sp.x = round(a.x + ((b.x - a.x) * i) / STEP_TICKS); sp.y = round(a.y + ((b.y - a.y) * i) / STEP_TICKS); if (i < STEP_TICKS) yield; }
      g.c = c; g.r = r;
      // Coins are picked up by walking on them, unless the level has a pick-up block to practice.
      if (!this.model.pickBlock && g.coins.delete(`${c},${r}`)) { g.picks++; this.hooks.sfx && this.hooks.sfx('star'); this.note('pick', sp); }
      this.finishIfWon(g);
      yield;
    }
    finishIfWon(g) {
      if (g.won || g.wrongPick || g.coins.size) return;
      if (g.goal && `${g.c},${g.r}` !== g.goal) return;
      if (!g.goal && !g.total) return; // a plain map has nothing to finish
      g.won = true;
      this.halted = true;
    }
    * pause(n, sp) { for (let i = 0; i < n; i++) { yield; if (sp.dead) return; } }

    * sleep(secs, sp) {
      const n = Math.round(Math.max(0, secs) * FPS);
      for (let i = 0; i < n; i++) { yield; if (sp.dead) return; }
    }

    moveTo(sp, x, y) {
      const nx = Math.max(-HALF_W - 20, Math.min(HALF_W + 20, x)), ny = Math.max(-HALF_H - 20, Math.min(HALF_H + 20, y));
      if (sp.penOn && (nx !== sp.x || ny !== sp.y) && this.pen.length < MAX_PEN) this.pen.push({ x0: sp.x, y0: sp.y, x1: nx, y1: ny, c: sp.penColor });
      sp.x = round(nx); sp.y = round(ny);
    }

    bounce(sp) {
      const r = this.radius(sp), a = (sp.dir * Math.PI) / 180;
      let dx = Math.sin(a), dy = Math.cos(a), hit = false;
      if ((sp.x > HALF_W - r && dx > 0) || (sp.x < -HALF_W + r && dx < 0)) { dx = -dx; hit = true; }
      if ((sp.y > HALF_H - r && dy > 0) || (sp.y < -HALF_H + r && dy < 0)) { dy = -dy; hit = true; }
      if (!hit) return;
      sp.dir = norm(round((Math.atan2(dx, dy) * 180) / Math.PI));
      this.note('bounce', sp);
    }

    clampSize(n) { return Math.max(10, Math.min(400, n)); }
    radius(sp) { return (BASE * sp.size * 0.42) / 100; }

    makeClone(sp) {
      if (this.clones >= MAX_CLONES) return;
      const c = this.instance(sp);
      Object.assign(c, { x: sp.x, y: sp.y, dir: sp.dir, size: sp.size, visible: sp.visible, rot: sp.rot, emoji: sp.emoji, penOn: false, penColor: sp.penColor, isClone: true });
      this.clones++;
      this.sprites.push(c);
      c.scripts.forEach((script) => { if (script.event.type === 'clone') this.startThread(c, script, true); });
    }

    // ---- expressions ----
    val(sp, x) {
      if ('k' in x) return x.k;
      const e = (y) => this.val(sp, y);
      switch (x.op) {
        case 'math': {
          const a = num(e(x.a)), b = num(e(x.b));
          const r = x.f === 'add' ? a + b : x.f === 'sub' ? a - b : x.f === 'mul' ? a * b : x.f === 'div' ? (b === 0 ? 0 : a / b) : x.f === 'mod' ? (b === 0 ? 0 : ((a % b) + b) % b) : 0;
          return round(r);
        }
        case 'cmp': {
          const a = e(x.a), b = e(x.b);
          if (isNumeric(a) && isNumeric(b)) { const p = Number(a), q = Number(b); return x.f === 'lt' ? p < q : x.f === 'gt' ? p > q : p === q; }
          const p = String(a).toLowerCase(), q = String(b).toLowerCase();
          return x.f === 'lt' ? p < q : x.f === 'gt' ? p > q : p === q;
        }
        case 'logic': return x.f === 'and' ? truthy(e(x.a)) && truthy(e(x.b)) : truthy(e(x.a)) || truthy(e(x.b));
        case 'not': return !truthy(e(x.a));
        case 'rand': {
          const a = num(e(x.a)), b = num(e(x.b)), lo = Math.min(a, b), hi = Math.max(a, b);
          if (Number.isInteger(lo) && Number.isInteger(hi)) return lo + Math.floor(this.random() * (hi - lo + 1));
          return round(lo + this.random() * (hi - lo));
        }
        case 'var': return this.vars[x.name] ?? 0;
        case 'touching': return this.touching(sp, x.what);
        case 'keydown': return x.key === 'any' ? this.keys.size > 0 : this.keys.has(x.key);
        case 'mousedown': return this.mouse.down;
        case 'mousex': return this.mouse.x;
        case 'mousey': return this.mouse.y;
        case 'timer': return round((this.ticks - this.timerStart) / FPS);
        case 'x': return sp.x;
        case 'y': return sp.y;
        case 'dir': return sp.dir;
        case 'gpath': {
          const g = this.grid;
          if (!g) return false;
          const [dc, dr] = this.ahead(sp, x.way === 'left' ? -90 : x.way === 'right' ? 90 : 0);
          return this.gridOpen(g, g.c + dc, g.r + dr);
        }
        case 'gcoin': return !!this.grid && this.grid.coins.has(`${this.grid.c},${this.grid.r}`);
        default: return 0;
      }
    }

    touching(sp, what) {
      if (!sp.visible) return false;
      const r = this.radius(sp);
      if (what === '_edge') return sp.x > HALF_W - r || sp.x < -HALF_W + r || sp.y > HALF_H - r || sp.y < -HALF_H + r;
      if (what === '_mouse') return Math.hypot(sp.x - this.mouse.x, sp.y - this.mouse.y) <= r;
      return this.sprites.some((o) => o !== sp && !o.dead && o.visible && o.id === what && Math.hypot(sp.x - o.x, sp.y - o.y) <= r + this.radius(o));
    }

    // The topmost visible sprite at a stage point (later sprites draw on top), or null.
    spriteAt(x, y) {
      for (let i = this.sprites.length - 1; i >= 0; i--) {
        const s = this.sprites[i];
        if (!s.dead && s.visible && Math.hypot(s.x - x, s.y - y) <= Math.max(this.radius(s), 16)) return s;
      }
      return null;
    }
  }

  return { Runtime, FPS, HALF_W, HALF_H, BASE, CELL };
})();
if (typeof module !== 'undefined') module.exports = CodeRuntime;
