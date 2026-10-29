// Learning Hub cloud sync: the same Firestore classes and students as ELA Quest, reached through the REST API with
// anonymous sign-in (no Firebase SDK). A student joins a class once and is known to every app; each app keeps its own
// progress in classes/{classId}/students/{sid}/apps/{appId} as one JSON string. ELA Quest's progress (the `data`
// field on the student document) is never read or written here, except that a new student gets an empty one,
// because ELA Quest's rules require the field. The app stays local-first: it saves on the device and syncs later.
const Cloud = (() => {
  const CFG = typeof APP !== 'undefined' && APP.firebase && APP.firebase.apiKey ? APP.firebase : null;
  const APP_ID = typeof APP !== 'undefined' ? APP.id : 'app';
  // Every app that may keep progress under a student (must match the allowlist in firestore.rules).
  const ALL_APPS = ['mathquest2', 'mathquest4', 'mapmath2', 'mapmath4', 'algebra1', 'mapalg1', 'mapread2', 'mapread4', 'mapread8', 'satprep', 'hubdemo', 'contest2', 'contest4', 'contest8'];
  const available = !!(CFG && typeof window !== 'undefined' && !window.HUB_NO_CLOUD && typeof fetch !== 'undefined' && window.crypto && crypto.subtle);
  const DOCS = CFG ? `https://firestore.googleapis.com/v1/projects/${CFG.projectId}/databases/(default)/documents` : '';
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  // ---- auth (anonymous; one identity per device, shared by all hub apps on this site) ----
  async function token() {
    let a = ls.get('hub_auth', null);
    if (a && a.exp > Date.now() + 60000) return a.idToken;
    let r;
    if (a && a.refreshToken) {
      r = await fetch(`https://securetoken.googleapis.com/v1/token?key=${CFG.apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(a.refreshToken)}`,
      });
      if (r.ok) { const j = await r.json(); a = { idToken: j.id_token, refreshToken: j.refresh_token, exp: Date.now() + j.expires_in * 1000 }; ls.set('hub_auth', a); return a.idToken; }
    }
    r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${CFG.apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnSecureToken: true }),
    });
    if (!r.ok) throw new Error('Could not connect to the class server.');
    const j = await r.json();
    a = { idToken: j.idToken, refreshToken: j.refreshToken, exp: Date.now() + j.expiresIn * 1000 };
    ls.set('hub_auth', a);
    return a.idToken;
  }

  async function req(method, path, body, query = '') {
    const t = await token();
    const r = await fetch(`${DOCS}/${path}${query ? '?' + query : ''}`, {
      method, headers: { Authorization: `Bearer ${t}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (r.status === 404) return null;
    if (!r.ok) { const e = new Error(`Server said ${r.status}`); e.status = r.status; throw e; }
    return r.status === 200 ? r.json() : {};
  }

  // Firestore typed values <-> plain values
  const enc = (o) => ({ fields: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === 'number' ? { integerValue: String(Math.round(v)) } : { stringValue: String(v) }])) });
  const dec = (doc) => {
    if (!doc || !doc.fields) return null;
    const o = { id: doc.name.split('/').pop() };
    for (const [k, v] of Object.entries(doc.fields)) o[k] = 'integerValue' in v ? Number(v.integerValue) : v.stringValue;
    return o;
  };

  // ---- ids and PINs (same scheme as ELA Quest, so a PIN works in every app) ----
  const ALPHA = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // no 0/O/1/I/L
  const randomId = (n) => { const b = crypto.getRandomValues(new Uint8Array(n)); return [...b].map((x) => ALPHA[x % ALPHA.length]).join(''); };
  const cleanCode = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const prettyCode = (id) => id.replace(/(.{4})(?=.)/g, '$1-');
  async function hash(s) {
    const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  const adminHash = (classId, pin) => hash(`${classId}:admin:${pin}`);
  const pinHash = (classId, sid, pin) => hash(`${classId}:${sid}:${pin}`);

  // ---- classes & students ----
  async function createClass(name, pin) {
    const id = randomId(12);
    await req('PATCH', `classes/${id}`, enc({ name, adminHash: await adminHash(id, pin), createdAt: Date.now() }), 'currentDocument.exists=false');
    return { id, name };
  }
  const getClass = async (id) => dec(await req('GET', `classes/${id}`));
  const MASK = 'mask.fieldPaths=name&mask.fieldPaths=avatar&mask.fieldPaths=pinHash&mask.fieldPaths=updatedAt';
  async function listStudents(classId) {
    const out = [];
    let page = '';
    do {
      const r = await req('GET', `classes/${classId}/students`, null, `pageSize=300&${MASK}${page ? '&pageToken=' + page : ''}`);
      (r && r.documents || []).forEach((d) => out.push(dec(d)));
      page = r && r.nextPageToken;
    } while (page);
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }
  const getStudent = async (classId, sid) => dec(await req('GET', `classes/${classId}/students/${sid}`, null, MASK));
  async function createStudent(classId, { name, avatar, pin, data }) {
    const sid = randomId(10);
    await req('PATCH', `classes/${classId}/students/${sid}`, enc({ name, avatar, pinHash: await pinHash(classId, sid, pin), data: '{}', updatedAt: Date.now() }), 'currentDocument.exists=false');
    // The student exists now; if their first progress save fails, the app's normal sync retries it later.
    if (data) await saveProgress(classId, sid, data).catch(() => null);
    return sid;
  }

  // ---- this app's progress ----
  const appPath = (classId, sid, appId = APP_ID) => `classes/${classId}/students/${sid}/apps/${appId}`;
  async function getProgress(classId, sid, appId = APP_ID) {
    const d = dec(await req('GET', appPath(classId, sid, appId)));
    if (!d) return null;
    let data = {};
    try { data = JSON.parse(d.data || '{}'); } catch { /* keep empty */ }
    return { data, updatedAt: d.updatedAt || 0 };
  }
  const saveProgress = (classId, sid, data) => req('PATCH', appPath(classId, sid), enc({ data: JSON.stringify(data), updatedAt: Date.now() }));
  const deleteProgress = (classId, sid, appId = APP_ID) => req('DELETE', appPath(classId, sid, appId));
  // Removing a student also removes their progress in every hub app (Firestore does not delete sub-documents
  // on its own). ELA Quest's progress lives on the student document, so it goes with it.
  async function removeStudent(classId, sid) {
    await Promise.all(ALL_APPS.map((a) => deleteProgress(classId, sid, a).catch(() => null)));
    await req('DELETE', `classes/${classId}/students/${sid}`);
  }

  // ---- merging progress made on two devices ----
  const max = (a, b) => Math.max(a || 0, b || 0);
  const unionById = (a = [], b = [], gone = new Set(), limit = 400) => {
    const seen = new Set();
    return [...a, ...b].filter((x) => { if (!x || gone.has(x.id) || seen.has(x.id)) return false; seen.add(x.id); return true; })
      .sort((x, y) => (y.at || 0) - (x.at || 0)).slice(0, limit);
  };
  function merge(a, b) {
    if (!a) return b; if (!b) return a;
    // A reset on either device wins over anything recorded before it.
    if ((a.resetAt || 0) !== (b.resetAt || 0)) return (a.resetAt || 0) > (b.resetAt || 0) ? a : b;
    const m = { ...b, ...a };
    m.track = a.track || b.track;
    ['xp', 'quests', 'perfects', 'fixed'].forEach((k) => { m[k] = max(a[k], b[k]); });
    m.best = { ...b.best }; Object.entries(a.best || {}).forEach(([k, v]) => { m.best[k] = max(m.best[k], v); });
    m.plays = { ...b.plays }; Object.entries(a.plays || {}).forEach(([k, v]) => { m.plays[k] = max(m.plays[k], v); });
    m.daily = { ...b.daily };
    Object.entries(a.daily || {}).forEach(([d, v]) => { const o = m.daily[d] || {}; m.daily[d] = { rounds: max(o.rounds, v.rounds), q: max(o.q, v.q), correct: max(o.correct, v.correct), xp: max(o.xp, v.xp) }; });
    const sa = a.streak || {}, sb = b.streak || {};
    m.streak = (sa.last || '') > (sb.last || '') ? sa : (sb.last || '') > (sa.last || '') ? sb : { last: sa.last, count: max(sa.count, sb.count) };
    m.badges = { ...a.badges, ...b.badges };
    Object.keys(m.badges).forEach((k) => { if (a.badges?.[k] && b.badges?.[k]) m.badges[k] = a.badges[k] < b.badges[k] ? a.badges[k] : b.badges[k]; });
    m.watched = { ...b.watched, ...a.watched };
    // grown-up unlocks: the latest change to each level wins
    m.unlocks = { ...(b.unlocks || {}) }; Object.entries(a.unlocks || {}).forEach(([k, v]) => { if (!m.unlocks[k] || (v && (v.at || 0) >= (m.unlocks[k].at || 0))) m.unlocks[k] = v; });
    m.gone = [...new Set([...(a.gone || []), ...(b.gone || [])])].slice(-400);
    const gone = new Set(m.gone);
    m.missed = unionById(a.missed, b.missed, gone, 40);
    m.tests = unionById(a.tests, b.tests, gone, 200); // MAP / SAT practice test results
    if (a.writings || b.writings) {
      const wid = (w) => w.id || `${w.date}|${w.title}`;
      const seenW = new Set();
      m.writings = [...(a.writings || []), ...(b.writings || [])].filter((w) => { const k = wid(w); if (gone.has(k) || seenW.has(k)) return false; seenW.add(k); return true; })
        .sort((x, y) => (y.at || 0) - (x.at || 0));
      m.draft = (a.draftAt || 0) >= (b.draftAt || 0) ? a.draft : b.draft;
      m.draftAt = max(a.draftAt, b.draftAt);
    }
    return m;
  }

  return { available, ALL_APPS, createClass, getClass, listStudents, getStudent, createStudent, getProgress, saveProgress, deleteProgress, removeStudent, adminHash, pinHash, merge, cleanCode, prettyCode };
})();
