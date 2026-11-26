// Llista totes les frases en anglès que el motor (shared/duo.js) pot dir en veu alta.
// Ús: node tools/tts-texts.mjs > /tmp/texts.json   (després: tools/tts-gen.py)
// Ha de fer servir les MATEIXES regles que duo.js: plain(), words(), blank i la clau sayKey().
import fs from 'node:fs';
const window = {};
for (const f of ['repas.js', 'listening.js'])
  if (fs.existsSync(new URL('../shared/angles/' + f, import.meta.url))) new Function('window', fs.readFileSync(new URL('../shared/angles/' + f, import.meta.url), 'utf8'))(window);

export const plain = t => String(t).replace(/<[^>]+>/g,'').replace(/ · /g,', ').replace(/_{2,}/g,' ... ').replace(/→/g,', ').replace(/ \/ /g,', ').replace(/\(.*?\)/g,'');
export const clean = t => plain(t).replace(/\s+/g,' ').trim();
export const sayKey = t => { let h = 0x811c9dc5; const s = clean(t); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 } return h.toString(16).padStart(8,'0') };
const words = s => String(s).replace(/[.,!?]/g,'').split(/\s+/).filter(Boolean);
const hintSplit = q => { const m = q.match(/^(.*?)\s*\(([^)]*)\)\s*$/); return m ? [m[1], m[2]] : [q, ''] };

const out = new Set(['Perfect!', 'Well done!', 'Good job!']);
const add = t => { if (t && /[a-z]/i.test(clean(t))) out.add(clean(t)) };
for (const u of [...window.REPAS, ...(window.LISTENING || [])]) {
  for (const c of u.learn || []) for (const e of c.ex || []) add(e[0]);
  for (const q of u.ex) {
    if (q.k === 'pick') add(q.q.replace(/_{2,}/, q.a));
    if (q.k === 'type') { const [s] = hintSplit(q.q); add(s.replace(/_{2,}/, [].concat(q.a)[0])) }
    if (q.k === 'build' || q.k === 'listen') { add(q.en); [...words(q.en), ...(q.x || [])].forEach(add) }
    if (q.k === 'img' && q.say !== false) add(q.q);
    if (q.k === 'match') q.p.forEach(p => add(p[0]));
    if (q.k === 'spell') { add(q.en); }
    if (q.k === 'text' && q.hear) { add(q.txt); add(q.q) }
  }
}
if (process.argv[1] && process.argv[1].endsWith('tts-texts.mjs')) process.stdout.write(JSON.stringify([...out].map(t => ({ key: sayKey(t), text: t })), null, 0));
