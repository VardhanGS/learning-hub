// Checks the Firestore security rules over the REST API, the same way the apps talk to Firestore.
// Usage: node tools/rules_test.mjs before|after
//   before: rules without the apps/{appId} block (per-app writes must be refused)
//   after:  rules with the apps/{appId} block (valid per-app writes allowed, bad ones refused)
// Works inside the existing test class "ELA Quest test (safe to delete)" and removes its temporary student at the end.
const API_KEY = 'AIzaSyC5LJI3n6mcb7aG8oR7pyQFvG9UA0E_CSo';
const PROJECT = 'ela-quest';
const CLASS = 'QY735Y37E776';
const mode = process.argv[2];
if (!['before', 'after'].includes(mode)) { console.log('Usage: node tools/rules_test.mjs before|after'); process.exit(2); }

const DOCS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnSecureToken: true }),
});
if (!r.ok) { console.log('Anonymous sign-in failed', r.status, await r.text()); process.exit(1); }
const { idToken } = await r.json();

const enc = (o) => ({ fields: Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === 'number' ? { integerValue: String(v) } : { stringValue: String(v) }])) });
async function call(method, path, body, query = '') {
  const res = await fetch(`${DOCS}/${path}${query ? '?' + query : ''}`, {
    method, headers: { Authorization: `Bearer ${idToken}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(enc(body)) : undefined,
  });
  return res.status;
}

const sid = 'RULESTEST' + Math.random().toString(36).slice(2, 7).toUpperCase();
const stu = `classes/${CLASS}/students/${sid}`;
const after = mode === 'after';
const OK = 200, NO = 403;
const tests = [
  ['read the test class', () => call('GET', `classes/${CLASS}`), OK],
  ['ELA-style student create (name, avatar, pinHash, data)', () => call('PATCH', stu, { name: 'Rules Test', avatar: '🦊', pinHash: 'x', data: '{}', updatedAt: Date.now() }, 'currentDocument.exists=false'), OK],
  ['ELA-style progress update (data field)', () => call('PATCH', stu, { data: '{"xp":5}', updatedAt: Date.now() }, 'updateMask.fieldPaths=data&updateMask.fieldPaths=updatedAt&currentDocument.exists=true'), OK],
  ['student with an unknown field is refused', () => call('PATCH', stu, { name: 'x', avatar: 'x', pinHash: 'x', data: '{}', updatedAt: 1, hack: 'y' }), NO],
  ['per-app progress write (apps/hubdemo)', () => call('PATCH', `${stu}/apps/hubdemo`, { data: '{"xp":1}', updatedAt: Date.now() }), after ? OK : NO],
  ['per-app progress read', () => call('GET', `${stu}/apps/hubdemo`), after ? OK : NO],
  ['per-app write for an app not on the list', () => call('PATCH', `${stu}/apps/notanapp`, { data: '{}', updatedAt: Date.now() }), NO],
  ['per-app write with an extra field', () => call('PATCH', `${stu}/apps/hubdemo`, { data: '{}', updatedAt: Date.now(), extra: 'x' }), NO],
  ['per-app write with updatedAt as text', () => call('PATCH', `${stu}/apps/hubdemo`, { data: '{}', updatedAt: 'soon' }), NO],
  ['per-app write over the size limit (450 KB)', () => call('PATCH', `${stu}/apps/hubdemo`, { data: 'x'.repeat(450000), updatedAt: Date.now() }), NO],
  ['per-app write for a student who does not exist', () => call('PATCH', `classes/${CLASS}/students/NOSUCHSTUDENT/apps/hubdemo`, { data: '{}', updatedAt: Date.now() }), NO],
  ['per-app progress delete', () => call('DELETE', `${stu}/apps/hubdemo`), after ? OK : NO],
  ['class delete is still refused', () => call('DELETE', `classes/${CLASS}`), NO],
  ['remove the temporary student', () => call('DELETE', stu), OK],
];

let fails = 0;
console.log(`Firestore rules check (${mode}) — project ${PROJECT}, class ${CLASS}, temp student ${sid}`);
for (const [name, fn, want] of tests) {
  const got = await fn();
  const pass = got === want;
  if (!pass) fails++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}: got ${got}, expected ${want}`);
}
console.log(fails ? `${fails} check(s) failed` : 'All checks passed');
process.exit(fails ? 1 : 0);
