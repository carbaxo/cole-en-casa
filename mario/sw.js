// Canvia la versió quan vulguis forçar una actualització
const CACHE='mario-v6';
const FILES=["../gate.js","../shared/glass.css","../shared/escriptori.js","./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "angles/repas/", "angles/repas/index.html", "../shared/duo.js", "../shared/duo.css", "../shared/angles/repas.js", "catala/pronoms-febles/", "catala/pronoms-febles/index.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
