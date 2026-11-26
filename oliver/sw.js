// Canvia la versió quan vulguis forçar una actualització
const CACHE='oliver-v10';
const FILES=["../gate.js","../shared/glass.css","../shared/escriptori.js","../shared/sync.js","./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "angles/repas/", "angles/repas/index.html", "../shared/duo.js", "../shared/duo.css", "../shared/angles/repas.js", "mates/curs/", "mates/curs/index.html", "mates/agilitat/", "mates/agilitat/index.html", "../shared/mates/gen.js", "../shared/mates/mates4.js", "../shared/mates/digits.js", "../shared/mates/digits.json", "../shared/mates/agilitat.js", "../shared/mates/agilitat.css"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return; // el NUC (sync) no passa per la memòria cau
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
