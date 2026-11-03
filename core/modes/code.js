// Code Quest mode: the home screen, project list, and block editor. The editor lives in its own element outside #app,
// because the shell replaces everything in #app whenever it re-renders (a background sync can do that at any time),
// and that would destroy the Blockly workspace. Projects are kept in P.code.projects and sync with the player.
(window.HubModes = window.HubModes || []).push((api) => {
  const { esc } = api;
  const MAX_PROJECTS = 12, MAX_SPRITES = 12;
  const MAX_BYTES = 350000; // Firestore rules refuse progress of 400,000 characters; leave room for the rest of P
  const FILE_KIND = 'codequest-project';

  const code = () => { const P = api.P(); P.code = P.code || { projects: [], levels: {} }; return P.code; };
  const uid = (p) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const bytes = (list) => JSON.stringify(list).length;
  const starter = () => ({ blocks: { languageVersion: 0, blocks: [{ type: 'cq_flag', x: 40, y: 40 }] } });
  const newSprite = (c, x = 0, y = 0) => ({ id: uid('s'), name: c.name, emoji: c.emoji, facing: c.facing, x, y, dir: 90, size: 100, visible: true, rot: 'all', ws: starter() });
  function newProject() {
    const n = code().projects.length + 1;
    return { id: uid('prj'), v: 1, name: `My Project ${n}`, backdrop: 'blank', vars: ['score'], sprites: [newSprite(CodeBlocks.SPRITES[0])], updatedAt: Date.now() };
  }

  const toast = (msg) => {
    const el = document.createElement('div');
    el.className = 'cq-toast'; el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  };

  // ---------- projects on the device ----------
  // Returns false when the project could not be kept, so the editor can tell the child instead of losing work quietly.
  function store(project) {
    const list = code().projects, next = list.filter((p) => p.id !== project.id);
    next.unshift(project);
    if (bytes(next) > MAX_BYTES) return false;
    code().projects = next;
    api.save();
    const me = api.me(), saved = me && api.store.get(`${api.PFX}p_${me.id}`, null); // store.set hides a full disk
    const copy = saved && saved.code && saved.code.projects.find((p) => p.id === project.id);
    return !!copy && copy.updatedAt === project.updatedAt;
  }

  // A file can hold anything, so only well-formed projects made of our own blocks get in.
  function checkImported(j) {
    if (!j || j.kind !== FILE_KIND || !j.project || !Array.isArray(j.project.sprites) || !j.project.sprites.length || j.project.sprites.length > MAX_SPRITES) return null;
    const known = (b) => !b || (CodeBlocks.TYPES.has(b.type) && Object.values(b.inputs || {}).every((i) => known(i.block) && known(i.shadow)) && known(b.next && b.next.block));
    const sprites = j.project.sprites.map((s) => {
      const tops = (s.ws && s.ws.blocks && s.ws.blocks.blocks) || [];
      if (!tops.every(known)) throw new Error('unknown block');
      return { id: uid('s'), oldId: String(s.id), name: String(s.name || 'Sprite').slice(0, 16), emoji: String(s.emoji || '🤖').slice(0, 8), facing: s.facing === -1 ? -1 : 1, x: Number(s.x) || 0, y: Number(s.y) || 0, dir: Number(s.dir) || 90, size: Number(s.size) || 100, visible: s.visible !== false, rot: ['all', 'flip', 'none'].includes(s.rot) ? s.rot : 'all', ws: s.ws || starter() };
    });
    // Sprite ids are new here, so "touching" blocks that name a sprite must follow them.
    let text = JSON.stringify(sprites);
    sprites.forEach((s) => { text = text.split(`"WHAT":"${s.oldId}"`).join(`"WHAT":"${s.id}"`); });
    const fixed = JSON.parse(text).map(({ oldId, ...s }) => s);
    const vars = (Array.isArray(j.project.vars) ? j.project.vars : ['score']).map((v) => String(v).slice(0, 16)).slice(0, 20);
    return { id: uid('prj'), v: 1, name: String(j.project.name || 'Imported project').slice(0, 30), backdrop: CodeBlocks.BACKDROPS.some(([b]) => b === j.project.backdrop) ? j.project.backdrop : 'blank', vars: vars.length ? vars : ['score'], sprites: fixed, updatedAt: Date.now() };
  }
  function exportProject(p) {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ kind: FILE_KIND, v: 1, project: p }, null, 1)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = `${p.name.replace(/[^\w -]+/g, '').trim() || 'project'}.codequest.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function importProject() {
    if (code().projects.length >= MAX_PROJECTS) { toast(`You have ${MAX_PROJECTS} projects. Delete one first.`); return; }
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json,application/json';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      let p = null;
      try { p = file.size < 400000 ? checkImported(JSON.parse(await file.text())) : null; } catch { p = null; }
      if (!p) { toast('That file is not a Code Quest project.'); return; }
      if (store(p)) { api.render(); toast(`Added “${p.name}”.`); } else toast('There is no room for that project. Delete one first.');
    };
    input.click();
  }

  // ---------- levels: what is open, and unfinished blocks ----------
  const trackOf = () => api.P().track || Object.keys(api.APP.tracks)[0];
  const stars = (id) => (code().levels[id] || {}).stars || 0;
  const worldDone = (w) => CODE_WORLDS[w].levels.every((l) => stars(l.id) > 0);
  const FREE_WORLDS = { g2: 0, g4: 2 }; // Grade 4 can go anywhere in this many worlds from the start
  const isFree = (w) => api.settings().unlockAll || w < (FREE_WORLDS[trackOf()] || 0);
  const worldOpen = (w) => w === 0 || isFree(w) || worldDone(w - 1);
  const levelOpen = (w, i) => worldOpen(w) && (i === 0 || isFree(w) || stars(CODE_WORLDS[w].levels[i - 1].id) > 0);
  const freeBuildOpen = () => isFree(0) || worldDone(0) || code().projects.length > 0;
  function nextLevelAfter(id) {
    const all = CODE_WORLDS.flatMap((x) => x.levels), i = all.findIndex((l) => l.id === id);
    return all[i + 1] || null;
  }
  // Blocks a child has on a level stay on this device only: they aren't worth using up the synced progress limit.
  const draftKey = () => `${api.PFX}cqdraft_${api.me().id}`;
  const loadDraft = (id) => (api.store.get(draftKey(), {}) || {})[id] || null;
  function saveDraft(id, value) {
    const all = api.store.get(draftKey(), {}) || {};
    if (value) all[id] = value; else delete all[id];
    api.store.set(draftKey(), all);
  }

  // ---------- editor ----------
  const Editor = (() => {
    let host = null, ws = null, stage = null, rt = null, project = null, cur = null;
    let raf = 0, last = 0, acc = 0, lit = new Set(), saveTimer = 0, changeTimer = 0, loading = false, full = false, drag = null, tab = 'code', defined = null;
    let L = null, clip = null, handTimer = 0; // L: the level being played, or null in Free Build. clip: the goal clip playing.
    const $ = (s) => host.querySelector(s);

    function build() {
      host = document.createElement('div');
      host.id = 'cq-editor';
      host.hidden = true;
      host.innerHTML = `
        <header class="cq-top">
          <button class="cq-btn" id="cqBack">← Home</button>
          <input id="cqName" class="cq-name" maxlength="30" aria-label="Project name" autocomplete="off">
          <span class="cq-title" id="cqTitle" hidden></span>
          <span class="cq-saved" id="cqSaved" role="status"></span>
          <span class="cq-grow"></span>
          <span class="cq-count" id="cqCount" hidden></span>
          <button class="cq-btn" id="cqGoal" aria-label="Watch the goal" hidden>🎬<span class="cq-wide"> Goal</span></button>
          <button class="cq-btn" id="cqHint" aria-label="Get a hint" hidden>💡<span class="cq-wide"> Hint</span></button>
          <button class="cq-btn" id="cqUndo" aria-label="Undo">↩︎</button>
          <button class="cq-btn" id="cqRedo" aria-label="Redo">↪︎</button>
          <button class="cq-btn" id="cqExport" aria-label="Save as a file">💾<span class="cq-wide"> Save file</span></button>
        </header>
        <div class="cq-tabs" role="tablist">
          <button role="tab" id="cqTabCode">🧩 Code</button>
          <button role="tab" id="cqTabStage">🎬 Stage</button>
        </div>
        <div class="cq-body" id="cqBody">
          <section class="cq-code"><div id="cqBlockly"></div></section>
          <section class="cq-side">
            <div class="cq-task" id="cqTask" hidden><button class="cq-btn" id="cqSay" aria-label="Read it to me">🔊</button><p id="cqTaskText"></p></div>
            <div class="cq-run">
              <button class="cq-go" id="cqFlag" aria-label="Start: green flag">🚩 Go</button>
              <button class="cq-stop" id="cqStop" aria-label="Stop">⏹ Stop</button>
              <button class="cq-btn" id="cqReset" aria-label="Put everything back at the start">↺ Reset</button>
            </div>
            <div class="cq-stage-box"><canvas id="cqStage" aria-label="Stage"></canvas></div>
            <div class="cq-note" id="cqNote" role="status" hidden></div>
            <div class="cq-keys" id="cqKeys" hidden>
              ${[['left', '←'], ['up', '↑'], ['down', '↓'], ['right', '→'], ['space', 'space']].map(([k, l]) => `<button data-key="${k}" aria-label="${k} key">${l}</button>`).join('')}
            </div>
            <div class="cq-panel" id="cqPanel">
              <div class="cq-panel-h"><b>Characters</b><button class="cq-btn" id="cqAddSprite">＋ Add</button><button class="cq-btn" id="cqDelSprite" aria-label="Remove this character">🗑</button></div>
              <div class="cq-sprites" id="cqSprites"></div>
              <div class="cq-panel-h" id="cqBdHead"><b>Backdrop</b></div>
              <div class="cq-backdrops" id="cqBackdrops"></div>
            </div>
            <button class="cq-btn" id="cqRestart" hidden>🧹 Start this level over</button>
          </section>
        </div>
        <div class="cq-over" id="cqOver" hidden></div>`;
      document.body.appendChild(host);
      stage = new CodeStage.Stage($('#cqStage'));
      wire();
    }

    function wire() {
      $('#cqBack').onclick = close;
      $('#cqFlag').onclick = () => {
        SFX.unlockAudio(); flushChange();
        if (L) goLevel();
        rt.flag();
      };
      $('#cqHint').onclick = showHint;
      $('#cqGoal').onclick = () => showGoal(false);
      $('#cqSay').onclick = () => Voice.say(L.level.say);
      $('#cqRestart').onclick = restartLevel;
      $('#cqStop').onclick = () => rt.stopAll();
      $('#cqReset').onclick = () => { flushChange(); rebuild(); };
      $('#cqUndo').onclick = () => ws.undo(false);
      $('#cqRedo').onclick = () => ws.undo(true);
      $('#cqExport').onclick = () => { flushChange(); exportProject(project); };
      $('#cqName').oninput = (e) => { project.name = e.target.value.slice(0, 30) || 'My Project'; queueSave(); };
      $('#cqAddSprite').onclick = pickSprite;
      $('#cqDelSprite').onclick = deleteSprite;
      $('#cqTabCode').onclick = () => setTab('code');
      $('#cqTabStage').onclick = () => setTab('stage');
      host.querySelectorAll('#cqKeys button').forEach((b) => {
        const k = b.dataset.key;
        b.onpointerdown = (e) => { e.preventDefault(); b.setPointerCapture(e.pointerId); rt.press(k); };
        b.onpointerup = b.onpointercancel = () => rt.release(k);
      });
      const cv = $('#cqStage');
      cv.onpointerdown = onDown; cv.onpointermove = onMove; cv.onpointerup = onUp; cv.onpointercancel = onUp;
      window.addEventListener('keydown', onKey);
      window.addEventListener('keyup', onKey);
      window.addEventListener('resize', () => { if (full) Blockly.svgResize(ws); });
    }

    const themes = {};
    function makeWorkspace() {
      const track = trackOf(), box = L ? CodeBlocks.tray(CodeLevels.tray(L.level)) : CodeBlocks.toolbox(track), key = `${track}|${L ? 'tray' : 'full'}`;
      CodeBlocks.define(track);
      // A workspace can't switch between a tray and a toolbox with categories, so changing needs a new one.
      if (ws && defined === key) { if (L) ws.updateToolbox(box); return; }
      if (ws) ws.dispose();
      defined = key;
      const theme = themes[track] = themes[track] || Blockly.Theme.defineTheme(`cq-${track}`, { base: Blockly.Themes.Classic, fontStyle: { family: 'Fredoka, system-ui, sans-serif', weight: '500', size: track === 'g2' ? 16 : 14 }, componentStyles: { workspaceBackgroundColour: '#fbfaff', toolboxBackgroundColour: '#f0ecfb', toolboxForegroundColour: '#2a2350', flyoutBackgroundColour: '#e9e4f8', flyoutOpacity: 0.97, scrollbarColour: '#b3a9d8' } });
      ws = Blockly.inject($('#cqBlockly'), {
        renderer: 'zelos', theme, toolbox: box, trashcan: true, sounds: api.settings().sound,
        media: 'core/code/vendor/blockly/media/', move: { scrollbars: true, drag: true, wheel: true },
        zoom: { controls: true, wheel: false, pinch: true, startScale: window.innerWidth < 768 ? 0.8 : 0.95, maxScale: 2, minScale: 0.4 },
      });
      ws.registerButtonCallback('cqNewVar', makeVar);
      ws.addChangeListener(onChange);
    }

    function onChange(e) {
      if (loading || e.isUiEvent || e.type === Blockly.Events.FINISHED_LOADING) return;
      clearTimeout(changeTimer);
      changeTimer = setTimeout(flushChange, 150);
    }
    // Saves the workspace into the sprite, and puts the stage back at the start so it matches the code.
    function flushChange() {
      clearTimeout(changeTimer);
      if (!cur || loading) return;
      const next = Blockly.serialization.workspaces.save(ws);
      if (JSON.stringify(next) === JSON.stringify(cur.ws)) return;
      cur.ws = next;
      rebuild();
      queueSave();
    }
    function queueSave() { clearTimeout(saveTimer); setSaved('…'); saveTimer = setTimeout(saveNow, 700); }
    function saveNow() {
      clearTimeout(saveTimer);
      if (L) { saveDraft(L.level.id, Object.fromEntries(project.sprites.map((s) => [s.id, s.ws]))); setSaved(''); return true; }
      project.updatedAt = Date.now();
      const ok = store(project);
      setSaved(ok ? '✓ Saved' : '⚠️ No room left. Tap “Save file”, then delete an old project.', !ok);
      return ok;
    }
    function setSaved(t, bad) { const el = $('#cqSaved'); el.textContent = t; el.classList.toggle('bad', !!bad); }

    function model() {
      if (L) return CodeLevels.model(L.level, wsBy(), { seed: Date.now() >>> 0, variant: L.variant });
      return { seed: Date.now() >>> 0, backdrop: project.backdrop, vars: project.vars, sprites: project.sprites.map((s) => ({ ...s, scripts: CodeCompile.scripts(s.ws) })) };
    }
    function rebuild() {
      rt = new CodeRuntime.Runtime(model(), { sfx: (n) => SFX.play(n), note: (m, secs) => SFX.play('pitch', { f: 440 * 2 ** ((m - 69) / 12), d: Math.max(0.05, secs) }) });
      const usesKeys = project.sprites.some((s) => /"cq_key(down)?"/.test(JSON.stringify(s.ws)));
      $('#cqKeys').hidden = !usesKeys;
      clearLit();
      if (L) {
        if (L.level.draw) rt.ghost = CodeLevels.solutionPen(L.level);
        L.started = false; L.stopped = false; L.okAt = null; L.told = false; L.idle = 0; L.seen = 0;
        updateCount();
      }
    }
    const wsBy = () => Object.fromEntries(project.sprites.map((s) => [s.id, s.ws]));

    function selectSprite(s) {
      flushChange();
      cur = s;
      loading = true;
      Blockly.Events.disable();
      try { ws.clear(); Blockly.serialization.workspaces.load(s.ws, ws); } finally { Blockly.Events.enable(); }
      ws.clearUndo();
      lit = new Set();
      loading = false;
      renderPanel();
    }

    function liveMenus() {
      CodeBlocks.live.sprites = project.sprites.map((s) => ({ id: s.id, name: s.name }));
      CodeBlocks.live.vars = project.vars;
    }

    function renderPanel() {
      liveMenus();
      $('#cqSprites').innerHTML = project.sprites.map((s) => `<button class="cq-sprite ${s === cur ? 'on' : ''}" data-id="${esc(s.id)}" aria-pressed="${s === cur}"><span class="e">${esc(s.emoji)}</span><span class="n">${esc(s.name)}</span></button>`).join('');
      $('#cqSprites').querySelectorAll('button').forEach((b) => { b.onclick = () => { const s = project.sprites.find((x) => x.id === b.dataset.id); if (s && s !== cur) selectSprite(s); }; });
      $('#cqDelSprite').disabled = project.sprites.length < 2;
      $('#cqAddSprite').hidden = $('#cqDelSprite').hidden = $('#cqBdHead').hidden = $('#cqBackdrops').hidden = !!L;
      $('#cqPanel').hidden = !!L && project.sprites.length < 2;
      $('#cqBackdrops').innerHTML = CodeBlocks.BACKDROPS.map(([id, n]) => `<button class="cq-bd ${project.backdrop === id ? 'on' : ''}" data-id="${id}">${esc(n)}</button>`).join('');
      $('#cqBackdrops').querySelectorAll('button').forEach((b) => { b.onclick = () => { project.backdrop = b.dataset.id; rebuild(); renderPanel(); queueSave(); }; });
    }

    // Small pop-ups belong to the editor (the shell's modal would re-render #app, which is hidden behind this anyway).
    function over(html, wireIt) {
      clearHand();
      const el = $('#cqOver');
      el.innerHTML = `<div class="cq-sheet" role="dialog" aria-modal="true">${html}</div>`;
      el.hidden = false;
      el.onclick = (e) => { if (e.target === el) closeOver(); };
      wireIt(el);
    }
    const closeOver = () => { $('#cqOver').hidden = true; $('#cqOver').innerHTML = ''; clip = null; };

    function pickSprite() {
      if (project.sprites.length >= MAX_SPRITES) { toast(`A project can have ${MAX_SPRITES} characters.`); return; }
      over(`<h2>Pick a character</h2><div class="cq-pick">${CodeBlocks.SPRITES.map((c, i) => `<button data-i="${i}" aria-label="${esc(c.name)}"><span>${c.emoji}</span><small>${esc(c.name)}</small></button>`).join('')}</div>`, (el) => {
        el.querySelectorAll('.cq-pick button').forEach((b) => {
          b.onclick = () => {
            flushChange();
            const n = project.sprites.length;
            const s = newSprite(CodeBlocks.SPRITES[+b.dataset.i], ((n * 70) % 300) - 150, ((n * 47) % 160) - 80);
            const same = project.sprites.filter((x) => x.name === s.name || x.name.startsWith(`${s.name} `)).length;
            if (same) s.name = `${s.name} ${same + 1}`;
            project.sprites.push(s);
            closeOver();
            rebuild();
            selectSprite(s);
            queueSave();
          };
        });
      });
    }
    function deleteSprite() {
      if (project.sprites.length < 2) return;
      over(`<h2>Remove ${esc(cur.emoji)} ${esc(cur.name)}?</h2><p>Its code goes too.</p><div class="cq-row"><button class="cq-btn" id="cqNo">Keep it</button><button class="cq-btn danger" id="cqYes">Remove</button></div>`, (el) => {
        el.querySelector('#cqNo').onclick = closeOver;
        el.querySelector('#cqYes').onclick = () => {
          const gone = cur;
          project.sprites = project.sprites.filter((s) => s !== gone);
          cur = null;
          closeOver();
          selectSprite(project.sprites[0]);
          rebuild();
          queueSave();
        };
      });
    }
    function makeVar() {
      over(`<h2>Make a number box</h2><p>A number box keeps a number, like a score.</p><input id="cqVar" class="input" maxlength="16" placeholder="Name it" autocomplete="off"><p class="cq-err" id="cqVarErr" role="alert"></p><div class="cq-row"><button class="cq-btn" id="cqNo">Cancel</button><button class="cq-btn primary" id="cqYes">Make it</button></div>`, (el) => {
        const input = el.querySelector('#cqVar');
        el.querySelector('#cqNo').onclick = closeOver;
        el.querySelector('#cqYes').onclick = () => {
          const name = input.value.trim();
          if (!name) { el.querySelector('#cqVarErr').textContent = 'Type a name first.'; return; }
          if (project.vars.includes(name)) { el.querySelector('#cqVarErr').textContent = 'You already have that one.'; return; }
          project.vars.push(name);
          liveMenus();
          closeOver();
          rebuild();
          queueSave();
        };
        input.focus();
      });
    }

    // ---------- stage input ----------
    const KEYMAP = { ' ': 'space', ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    function onKey(e) {
      if (!full || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const k = KEYMAP[e.key] || (e.key.length === 1 ? e.key.toLowerCase() : null);
      if (!k) return;
      if (e.type === 'keydown') { rt.press(k); if (KEYMAP[e.key]) e.preventDefault(); } else rt.release(k);
    }
    function onDown(e) {
      const p = stage.toStage(e.clientX, e.clientY);
      rt.setMouse(p.x, p.y, true);
      const s = rt.spriteAt(p.x, p.y);
      if (!s) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag = { s, dx: s.x - p.x, dy: s.y - p.y, moved: false, sx: p.x, sy: p.y };
    }
    function onMove(e) {
      const p = stage.toStage(e.clientX, e.clientY);
      rt.setMouse(p.x, p.y);
      if (!drag || rt.running || L) return;
      if (!drag.moved && Math.hypot(p.x - drag.sx, p.y - drag.sy) < 5) return;
      drag.moved = true;
      rt.moveTo(drag.s, p.x + drag.dx, p.y + drag.dy);
    }
    function onUp(e) {
      const p = stage.toStage(e.clientX, e.clientY);
      rt.setMouse(p.x, p.y, false);
      const d = drag;
      drag = null;
      if (!d) return;
      if (d.moved) {
        // Dragging sets where the character starts.
        const src = project.sprites.find((x) => x.id === d.s.id);
        if (src && !d.s.isClone) { src.x = Math.round(d.s.x); src.y = Math.round(d.s.y); rt.model = model(); queueSave(); }
      } else rt.tap(d.s);
    }

    // ---------- frame loop ----------
    function frame(now) {
      if (!full) return;
      raf = requestAnimationFrame(frame);
      const step = 1000 / CodeRuntime.FPS;
      acc = Math.min(acc + (now - (last || now)), step * 3); // after a pause, catch up a little, not all at once
      last = now;
      while (acc >= step) { rt.tick(); if (clip) tickClip(); acc -= step; }
      stage.draw(rt);
      if (clip) clip.stage.draw(clip.rt, clip.mark);
      if (L && !L.done) judgeLevel();
      if (cur) highlight(new Set(rt.activeBlocks(cur.id)));
      $('#cqFlag').classList.toggle('on', rt.running);
    }
    function highlight(next) {
      lit.forEach((id) => { if (!next.has(id)) ws.highlightBlock(id, false); });
      next.forEach((id) => { if (!lit.has(id)) ws.highlightBlock(id, true); });
      lit = next;
    }
    function clearLit() { if (ws) highlight(new Set()); }

    function setTab(t) {
      clearHand();
      tab = t;
      $('#cqBody').dataset.tab = t;
      $('#cqTabCode').className = t === 'code' ? 'on' : '';
      $('#cqTabStage').className = t === 'stage' ? 'on' : '';
      $('#cqTabCode').setAttribute('aria-selected', t === 'code');
      $('#cqTabStage').setAttribute('aria-selected', t === 'stage');
      Blockly.svgResize(ws);
    }

    // ---------- levels ----------
    const line = (k) => CODE_LINES[k];
    function setNote(text, good) {
      const el = $('#cqNote');
      el.hidden = !text; el.textContent = text || ''; el.classList.toggle('good', !!good);
      if (text && tab === 'code' && window.innerWidth < 768) toast(text);
    }
    const speak = (text) => { if (text) Voice.say(text); };
    function tell(text, good) { setNote(text, good); speak(text); }
    function updateCount() {
      const n = CodeLevels.totalBlocks(wsBy()), max = CodeLevels.limitOf(L.level), el = $('#cqCount');
      el.textContent = `🧩 ${n} / ${max}`;
      el.classList.toggle('over', n > max);
    }

    function goLevel() {
      const maps = CodeLevels.mapsOf(L.level);
      // A new try on a level with several maps gets the next map.
      if (maps && maps.length > 1 && L.tried) { L.variant = (L.variant + 1) % maps.length; rt.model.variant = L.variant; }
      L.tried = true; L.started = true; L.stopped = false; L.okAt = null; L.told = false; L.idle = 0; L.seen = 0;
      setNote('');
      if (window.innerWidth < 768) setTab('stage');
    }

    // Runs after every frame: has this try reached the goal, or stopped without reaching it?
    function judgeLevel() {
      const level = L.level, by = wsBy(), acted = rt.events.some((e) => e.type === 'tap' || e.type === 'key');
      if (L.stopped || (!L.started && !acted)) return;
      if (CodeLevels.passes(level, rt)) {
        if (L.okAt == null) L.okAt = rt.ticks;
        if (rt.running && rt.ticks - L.okAt < 25) return;
        if (!rt.running && rt.ticks - L.okAt < 12) return;
        rt.stopAll();
        const needs = CodeLevels.missingBlocks(level, by);
        L.stopped = true;
        if (needs.length) { tell(line('needs')); pointAt(trayBlock(needs[0])); return; }
        if (!CodeLevels.verify(level, by).ok) { tell(line('variant')); return; }
        finishLevel();
        return;
      }
      if (level.input && rt.events.length !== L.seen) { L.seen = rt.events.length; L.idle = 0; L.told = false; }
      if (L.told) return;
      L.idle++;
      // A level played with taps or keys is waiting for them, even with a forever block running.
      if (level.input && !acted) { if (L.idle > 20) { L.told = true; tell(level.prompt); } return; }
      if (rt.running) { L.idle = 0; return; }
      if (L.idle < (level.input ? 90 : 15)) return;
      L.told = true;
      tell(level.input ? line('tryAgain') : line(CodeLevels.whyNot(level, rt, by)));
    }
    const trayBlock = (type) => { const f = ws.getFlyout(); return f ? f.getWorkspace().getTopBlocks(false).find((x) => x.type === type) : null; };

    function pointAt(block) {
      clearHand();
      if (!block || !block.getSvgRoot) return;
      const r = block.getSvgRoot().getBoundingClientRect();
      if (!r.width) return;
      const el = document.createElement('div');
      el.className = 'cq-hand'; el.textContent = '👆'; el.setAttribute('aria-hidden', 'true');
      el.style.left = `${r.left + Math.min(r.width, 90) / 2}px`;
      el.style.top = `${r.top + Math.min(r.height, 40) - 6}px`;
      host.appendChild(el);
      handTimer = setTimeout(clearHand, 4500);
    }
    function clearHand() { clearTimeout(handTimer); host.querySelectorAll('.cq-hand').forEach((e) => e.remove()); }

    function showHint() {
      flushChange();
      L.hinted = true;
      if (window.innerWidth < 768) setTab('code');
      const h = CodeLevels.nextHint(L.level, cur.id, cur.ws);
      if (h.kind === 'done') {
        const other = project.sprites.find((s) => s !== cur && CodeLevels.nextHint(L.level, s.id, s.ws).kind !== 'done');
        tell(other ? line('hintOther') : line('hintDone'), !other);
        return;
      }
      const first = !L.hintOnce;
      L.hintOnce = true;
      if (h.kind === 'block') { pointAt(trayBlock(h.type)); if (h.wrong && ws.getBlockById(h.wrong)) Blockly.common.setSelected(ws.getBlockById(h.wrong)); tell(first ? L.level.hint : line('hintBlock')); }
      else if (h.kind === 'number') { pointAt(ws.getBlockById(h.id)); tell(`${line('hintNumber')}`); }
      else if (h.kind === 'field') { pointAt(ws.getBlockById(h.id)); tell(line('hintField')); }
      else { pointAt(ws.getBlockById(h.id)); tell(line('hintExtra')); }
    }

    // The goal clip is the real stage running the level's own solution, so the picture always matches the answer.
    function startClip(variant) {
      const level = L.level, r = new CodeRuntime.Runtime(CodeLevels.model(level, CodeLevels.solutionWs(level), { variant }), {});
      r.flag();
      return { rt: r, sim: CodeLevels.expandSim(level.sim), i: 0, t: 0, end: 0, mark: null, markUntil: 0, variant };
    }
    function tickClip() {
      const c = clip, sim = c.sim, r = c.rt;
      c.t++;
      while (c.i < sim.length && sim[c.i].t <= c.t) {
        const a = sim[c.i++];
        CodeLevels.applySim(r, a);
        if (a.xy) { c.mark = { x: a.xy[0], y: a.xy[1] }; c.markUntil = c.t + 20; }
        if (a.tap || a.mouse) { const s = r.sprites.find((x) => x.id === (a.tap || a.mouse)); if (s) { c.mark = { x: s.x, y: s.y }; c.markUntil = c.t + 15; } }
        if (a.press) { c.mark = { key: { right: '→', left: '←', up: '↑', down: '↓', space: 'space' }[a.press] || a.press }; c.markUntil = c.t + 15; }
      }
      if (c.mark && c.t > c.markUntil && !(c.mark.key && r.keys.size)) c.mark = null;
      r.tick();
      const done = c.i >= sim.length && !r.running || CodeLevels.passes(L.level, r) && c.t > (sim.length ? sim[sim.length - 1].t : 0) + 45;
      if (!done && c.t < 450) return;
      if (++c.end < 50) return; // hold the finished picture for a moment, then play it again
      const maps = CodeLevels.mapsOf(L.level);
      clip = { ...startClip(maps ? (c.variant + 1) % maps.length : 0), stage: c.stage };
    }
    const chipHTML = (type) => { const c = CodeBlocks.chip(type, trackOf()); return c ? `<span class="cq-chip" style="background:${c.color}">${esc(c.text)}</span>` : ''; };
    function showGoal(first) {
      const level = L.level, learn = first ? (level.learn || []) : [];
      over(`
        <div class="cq-goal-h"><h2>${esc(level.icon)} ${esc(level.title)}</h2><button class="cq-btn" id="cqGoalSay" aria-label="Read it to me">🔊</button></div>
        <canvas class="cq-goal-canvas" id="cqClip" aria-label="A picture of the goal, playing"></canvas>
        <p class="cq-goal-text">${esc(level.say)}</p>
        ${learn.length ? `<div class="cq-chips"><b>✨ New:</b>${learn.map(chipHTML).join('')}</div>` : ''}
        <div class="cq-row"><button class="cq-btn primary" id="cqGoalGo">Let's code!</button></div>`, (el) => {
        clip = { ...startClip(0), stage: new CodeStage.Stage(el.querySelector('#cqClip')) };
        el.querySelector('#cqGoalSay').onclick = () => Voice.say(level.say);
        el.querySelector('#cqGoalGo').onclick = () => { Voice.stop(); closeOver(); if (learn.length) pointAt(trayBlock(learn[0])); };
      });
      if (first && (trackOf() === 'g2' || api.settings().autoRead)) speak(level.say);
    }

    function finishLevel() {
      const level = L.level, stars = CodeLevels.stars(level, wsBy(), L.hinted), before = (code().levels[level.id] || {}).stars || 0;
      L.done = true;
      saveNow();
      code().levels[level.id] = { stars: Math.max(stars, before), at: Date.now() };
      const xp = before ? Math.max(0, stars - before) * 5 : 20 + stars * 5;
      api.P().xp += xp;
      api.touchDay((d) => { d.xp += xp; });
      api.save(); api.checkBadges(); api.sync();
      SFX.play(stars === 3 ? 'fanfare' : 'star');
      api.confetti();
      const next = nextLevelAfter(level.id), overLimit = CodeLevels.totalBlocks(wsBy()) > CodeLevels.limitOf(level);
      const say = line(`win${stars}`);
      over(`<div class="cq-result cq-sheet-in">
        <div class="cq-stars" role="img" aria-label="${stars} of 3 stars">${[1, 2, 3].map((n) => `<span class="${n <= stars ? '' : 'off'}">⭐</span>`).join('')}</div>
        <h2>${esc(say)}</h2>
        ${overLimit ? `<p>${esc(line('overLimit'))} (🧩 ${CodeLevels.limitOf(level)})</p>` : ''}
        ${L.hinted ? '<p class="muted">Try it with no hints for another star.</p>' : ''}
        ${xp ? `<p><b>+${xp} XP</b></p>` : ''}
        <div class="cq-row"><button class="cq-btn" id="cqAgain">↺ Try again</button><button class="cq-btn" id="cqMap">🗺️ Map</button>${level.keep ? '<button class="cq-btn" id="cqKeep">🛠 Keep building</button>' : ''}${next ? '<button class="cq-btn primary" id="cqNext">Next level →</button>' : ''}</div>
      </div>`, (el) => {
        el.onclick = null;
        el.querySelector('#cqAgain').onclick = () => { closeOver(); L.done = false; L.hinted = false; L.hintOnce = false; rebuild(); };
        el.querySelector('#cqMap').onclick = () => { closeOver(); close(); };
        if (level.keep) el.querySelector('#cqKeep').onclick = () => { closeOver(); keepBuilding(); };
        if (next) el.querySelector('#cqNext').onclick = () => { closeOver(); openLevel(next); };
      });
      speak(say);
    }

    // A finished game becomes a project of its own, to change however the child likes.
    function keepBuilding() {
      if (code().projects.length >= MAX_PROJECTS) { toast(`You have ${MAX_PROJECTS} projects. Delete one first.`); return; }
      const level = L.level, p = { id: uid('prj'), v: 1, name: level.title.slice(0, 30), backdrop: level.backdrop || 'blank', vars: level.vars || ['score'], sprites: JSON.parse(JSON.stringify(project.sprites)), updatedAt: Date.now() };
      if (!store(p)) { toast('There is no room for a new project. Delete one first.'); return; }
      toast(line('keepBuilding'));
      speak(line('keepBuilding'));
      open(p);
    }

    function restartLevel() {
      over(`<h2>Start over?</h2><p>Your blocks for this level go away.</p><div class="cq-row"><button class="cq-btn" id="cqNo">Keep them</button><button class="cq-btn danger" id="cqYes">Start over</button></div>`, (el) => {
        el.querySelector('#cqNo').onclick = closeOver;
        el.querySelector('#cqYes').onclick = () => {
          closeOver();
          const start = CodeLevels.startWs(L.level);
          project.sprites.forEach((s) => { s.ws = start[s.id]; });
          saveDraft(L.level.id, null);
          selectSprite(project.sprites[0]);
          rebuild();
          setNote('');
        };
      });
    }

    function openLevel(level) {
      const draft = loadDraft(level.id), start = CodeLevels.startWs(level);
      L = { level, variant: 0, hinted: false, hintOnce: false, started: false, tried: false, done: false, okAt: null, told: false, idle: 0, seen: 0 };
      show({
        id: 'level', name: level.title, backdrop: 'blank', vars: level.vars || ['score'],
        sprites: CodeLevels.spritesOf(level).map((s) => ({ ...s, ws: (draft && draft[s.id]) || start[s.id] })),
      });
      showGoal(true);
    }

    function open(p) { L = null; show(p); }

    function show(p) {
      if (!host) build();
      project = JSON.parse(JSON.stringify(p));
      if (!project.vars || !project.vars.length) project.vars = ['score'];
      liveMenus();
      host.hidden = false;
      document.body.classList.add('cq-open');
      full = true;
      makeWorkspace();
      $('#cqName').value = project.name;
      setSaved('');
      $('#cqName').hidden = $('#cqExport').hidden = !!L;
      $('#cqTitle').hidden = $('#cqCount').hidden = $('#cqGoal').hidden = $('#cqHint').hidden = $('#cqTask').hidden = $('#cqRestart').hidden = !L;
      $('#cqBack').textContent = L ? '← Map' : '← Home';
      setNote('');
      if (L) { $('#cqTitle').textContent = `${L.level.icon} ${L.level.title}`; $('#cqTaskText').textContent = L.level.say; }
      setTab(tab);
      cur = null;
      selectSprite(project.sprites[0]);
      rebuild();
      Blockly.svgResize(ws);
      last = 0; acc = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    function close() {
      flushChange();
      if (!saveNow()) {
        over(`<h2>This project did not save</h2><p>There is no room left. Save it as a file so you keep it, then delete an old project.</p><div class="cq-row"><button class="cq-btn" id="cqNo">Back to my project</button><button class="cq-btn primary" id="cqYes">💾 Save file</button></div>`, (el) => {
          el.querySelector('#cqNo').onclick = closeOver;
          el.querySelector('#cqYes').onclick = () => { exportProject(project); closeOver(); };
        });
        return;
      }
      full = false;
      cancelAnimationFrame(raf);
      Blockly.hideChaff();
      clearHand();
      Voice.stop();
      if (rt) rt.stopAll();
      host.hidden = true;
      document.body.classList.remove('cq-open');
      const from = L;
      L = null;
      if (from) { const w = CODE_WORLDS.findIndex((x) => x.levels.includes(from.level)); api.go('cqWorld', { w }); } else api.go('home');
    }

    return { open, openLevel, debug: () => ({ ws, rt: () => rt, project: () => project, cur: () => cur, flush: flushChange, save: saveNow, L: () => L, clip: () => clip }) };
  })();

  // ---------- home ----------
  function home() {
    const me = api.me(), list = code().projects;
    const when = (t) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `
      <section class="hello">
        <div class="hello-av">${esc(me.avatar)}</div>
        <div class="hello-text"><h1>Hi, ${esc(me.name)}!</h1><p>What will you build today?</p></div>
      </section>
      <h2 class="sec">🗺️ Coding worlds</h2>
      <section class="cq-worlds">${CODE_WORLDS.map((w, i) => {
        const open = worldOpen(i), got = w.levels.reduce((n, l) => n + stars(l.id), 0);
        return `<button class="cq-world" data-act="cqWorld" data-w="${i}" ${open ? '' : 'disabled'}>
          <span class="pic" aria-hidden="true">${open ? w.icon : '🔒'}</span>
          <span><b>${i + 1}. ${esc(w.name)}</b><small>${esc(w.idea)}</small><small>⭐ ${got} of ${w.levels.length * 3}</small></span>
        </button>`;
      }).join('')}
      </section>
      <h2 class="sec">🕵️ Code Detective</h2>
      <section class="cq-worlds"><button class="cq-world" data-act="openSubject" data-s="det${esc(trackOf())}"><span class="pic" aria-hidden="true">🕵️</span><span><b>What will this code do?</b><small>Read code, find bugs, and predict what happens. One quiz for each world.</small></span></button></section>
      ${freeBuildOpen() ? '' : `<section class="card"><h2>🔒 Free Build</h2><p class="muted">Finish World 1 to open Free Build, where you can make anything you like.</p></section>`}
      ${freeBuildOpen() ? `<section class="card cq-hero">
        <div class="cq-hero-pic" aria-hidden="true"><span class="b1">🚩 start</span><span class="b2">👣 20</span><span class="b3">💬 Hello!</span></div>
        <div>
          <h2>Free Build</h2>
          <p class="muted">Snap blocks together to make characters move, talk, and play.</p>
          <div class="row"><button class="btn primary big" data-act="cqNew">＋ New project</button><button class="btn" data-act="cqImport">📂 Open a file</button></div>
        </div>
      </section>
      <h2 class="sec">My projects (${list.length} of ${MAX_PROJECTS})</h2>
      ${list.length ? `<section class="cq-projects">${list.map((p) => `
        <div class="cq-project">
          <button class="cq-open" data-act="cqOpen" data-id="${esc(p.id)}">
            <span class="cq-emojis" aria-hidden="true">${p.sprites.slice(0, 3).map((s) => esc(s.emoji)).join('')}</span>
            <b>${esc(p.name)}</b><small>${esc(when(p.updatedAt))}</small>
          </button>
          <button class="cq-x" data-act="cqDelete" data-id="${esc(p.id)}" aria-label="Delete ${esc(p.name)}">🗑</button>
        </div>`).join('')}</section>` : '<p class="muted">Nothing here yet. Tap “New project” to start.</p>'}` : ''}`;
  }

  // One world's levels.
  function cqWorld() {
    const w = Math.max(0, Math.min(CODE_WORLDS.length - 1, api.view().w || 0)), world = CODE_WORLDS[w];
    if (!worldOpen(w)) return home();
    let nextShown = false;
    return `
      <button class="btn" data-act="nav" data-to="home">← All worlds</button>
      <section class="card cq-hero">
        <div style="font-size:48px" aria-hidden="true">${world.icon}</div>
        <div><h1>${esc(world.name)}</h1><p>${esc(world.intro)}</p><button class="btn" data-act="cqSayWorld" data-w="${w}">🔊 Listen</button></div>
      </section>
      <section class="cq-levels">${world.levels.map((l, i) => {
        const open = levelOpen(w, i), got = stars(l.id), next = open && !got && !nextShown;
        if (next) nextShown = true;
        return `<button class="cq-level ${next ? 'next' : ''}" data-act="cqLevel" data-id="${esc(l.id)}" ${open ? '' : 'disabled'} aria-label="Level ${i + 1}: ${esc(l.title)}${open ? `, ${got} stars` : ', locked'}">
          <span class="pic" aria-hidden="true">${open ? l.icon : '🔒'}</span><b>${i + 1}. ${esc(l.title)}</b>
          <span class="st" aria-hidden="true">${[1, 2, 3].map((n) => `<span class="${n <= got ? '' : 'off'}">⭐</span>`).join('')}</span>
        </button>`;
      }).join('')}</section>`;
  }

  // Grown-ups' class dashboard: how far each child has come in the worlds.
  function dashboard(rows) {
    const all = CODE_WORLDS.flatMap((w) => w.levels);
    const seen = rows.map(({ st }) => ({ st, c: st.prog.data.code || { levels: {}, projects: [] } }));
    if (!seen.length) return '';
    const got = (c, l) => ((c.levels || {})[l.id] || {}).stars || 0;
    return `<h2 class="sec">Coding worlds</h2><section class="card dash-wrap"><div class="dash-scroll"><table class="dash">
      <thead><tr><th>Student</th><th>Levels solved</th><th>Stars</th><th>Up to</th><th>Projects</th></tr></thead>
      <tbody>${seen.map(({ st, c }) => {
        const solved = all.filter((l) => got(c, l) > 0), next = all.find((l) => !got(c, l));
        return `<tr><td><b>${esc(st.name)}</b></td><td class="num">${solved.length} of ${all.length}</td><td class="num">${solved.reduce((n, l) => n + got(c, l), 0)} of ${all.length * 3}</td><td>${next ? esc(next.title) : 'All done!'}</td><td class="num">${(c.projects || []).length}</td></tr>`;
      }).join('')}</tbody></table></div></section>`;
  }

  function studentView() {
    const list = code().projects;
    const all = CODE_WORLDS.flatMap((w) => w.levels), solved = all.filter((l) => stars(l.id) > 0).length, got = all.reduce((n, l) => n + stars(l.id), 0);
    return `<section class="card"><h2>Coding worlds</h2><p>${solved} of ${all.length} levels solved · ⭐ ${got} of ${all.length * 3} stars</p>
        <div class="dash-scroll"><table class="dash"><thead><tr><th>World</th><th>Solved</th><th>Stars</th></tr></thead><tbody>${CODE_WORLDS.map((w) => `<tr><td>${w.icon} ${esc(w.name)}</td><td class="num">${w.levels.filter((l) => stars(l.id) > 0).length} of ${w.levels.length}</td><td class="num">${w.levels.reduce((n, l) => n + stars(l.id), 0)} of ${w.levels.length * 3}</td></tr>`).join('')}</tbody></table></div></section>
      ${list.length ? `<section class="card"><h2>Projects</h2><p>${list.length} project${list.length === 1 ? '' : 's'}: ${list.map((p) => esc(p.name)).join(', ')}</p></section>` : ''}`;
  }

  if (location.hash === '#debug') window.__cq = { Editor, code, checkImported, store, saveDraft, dashboard, studentView };

  return {
    screens: { home, cqWorld },
    dashboard,
    studentView,
    acts: {
      cqWorld: (ds) => { if (worldOpen(+ds.w)) api.go('cqWorld', { w: +ds.w }); },
      cqSayWorld: (ds) => Voice.say(CODE_WORLDS[+ds.w].intro),
      cqLevel: (ds) => { const l = CODE_WORLDS.flatMap((w) => w.levels).find((x) => x.id === ds.id); if (l) Editor.openLevel(l); },
      cqNew: () => {
        if (code().projects.length >= MAX_PROJECTS) { toast(`You have ${MAX_PROJECTS} projects. Delete one first.`); return; }
        const p = newProject();
        if (!store(p)) { toast('There is no room for a new project. Delete one first.'); return; }
        Editor.open(p);
      },
      cqOpen: (ds) => { const p = code().projects.find((x) => x.id === ds.id); if (p) Editor.open(p); },
      cqImport: importProject,
      cqDelete: (ds) => {
        const p = code().projects.find((x) => x.id === ds.id);
        if (!p) return;
        api.confirmModal(`Delete “${p.name}”?`, 'This cannot be undone. Save it as a file first if you might want it later.', 'cqDeleteYes', 'Delete', `data-id="${esc(p.id)}"`);
      },
      cqDeleteYes: (ds) => {
        const P = api.P();
        code().projects = code().projects.filter((x) => x.id !== ds.id);
        P.gone = [...(P.gone || []), ds.id].slice(-400); // so a sync doesn't bring it back from another device
        api.save();
        api.go('home');
      },
    },
  };
});
