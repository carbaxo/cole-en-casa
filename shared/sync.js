/* Sincronització del progrés amb el PocketBase del NUC (offline-first).
   Ho carrega gate.js a les pàgines de cada nen. Tot es desa primer a localStorage;
   aquest fitxer el puja i el baixa quan hi ha connexió.

   Claus que es sincronitzen per a un nen:
     - les que acaben en "-<nen>" (en-repas-mario, cec-days-mario, cec-avatar-mario…),
       excepte cec-unlock-* i cec-sync-*
     - les d'EXTRA (temes antics que no porten el nom del nen a la clau)
   Temes nous: feu servir claus acabades en "-<nen>".

   Ús (per al tauler de família, familia/):
     - cec-time-<nen> = {"AAAA-MM-DD|dispositiu|secció": segons actius}
     - cec-log-<nen>  = ["hora ISO|tema|unitat|estrelles|encerts", …] (cecLog)

   Com es combinen dos dispositius:
     - objectes de números ({unitat: estrelles}) → el màxim de cada camp
     - llistes (dies de la ratxa) → la unió
     - la resta (avatar) → guanya l'últim canvi */
(function(){
const kid=window.CEC_KID; if(!kid) return;
const EXTRA={mario:['pf-kids-v2']};
let API='https://rcv-nuc.tail66e645.ts.net:10000/api';
try{API=localStorage.getItem('cec-api')||API}catch(e){}
const TK='cec-sync-'+kid, MK='cec-sync-meta-'+kid;
const S=Storage.prototype, rawSet=S.setItem, rawRemove=S.removeItem;
const ls=window.localStorage;

const tracked=k=>(k.endsWith('-'+kid)&&!k.startsWith('cec-unlock-')&&!k.startsWith('cec-sync'))||(EXTRA[kid]||[]).includes(k);
const jget=k=>{try{return JSON.parse(ls.getItem(k)||'null')}catch(e){return null}};
const auth=()=>jget(TK);
let meta=jget(MK)||{};
const saveMeta=()=>{try{rawSet.call(ls,MK,JSON.stringify(meta))}catch(e){}};

/* marca els canvis locals amb l'hora i programa una pujada */
let timer=null;
const dirty=k=>{meta[k]=Date.now();saveMeta();clearTimeout(timer);timer=setTimeout(sync,1500)};
S.setItem=function(k,v){rawSet.call(this,k,v);if(this===ls&&tracked(k))dirty(k)};
S.removeItem=function(k){rawRemove.call(this,k);if(this===ls&&tracked(k))dirty(k)};

const parse=v=>{try{return JSON.parse(v)}catch(e){return v}};
const numObj=o=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.values(o).every(x=>typeof x==='number');
function merge(a,b){ /* a i b: {v: text o null, t: hora} */
  /* v null = esborrat: guanya si és més nou */
  if(a.v==null||b.v==null)return a.t>=b.t?a:b;
  const x=parse(a.v),y=parse(b.v),t=Math.max(a.t,b.t);
  if(numObj(x)&&numObj(y)){const o={...x};for(const k in y)o[k]=Math.max(o[k]||0,y[k]);return {v:JSON.stringify(o),t}}
  if(Array.isArray(x)&&Array.isArray(y)){return {v:JSON.stringify([...new Set([...x,...y])].sort().slice(-300)),t}}
  return a.t>=b.t?a:b;
}

async function call(path,opt={}){
  const a=auth();if(!a)throw new Error('no auth');
  const r=await fetch(API+path,{...opt,headers:{'content-type':'application/json',Authorization:a.token,...(opt.headers||{})}});
  if(r.status===401||r.status===403){try{rawRemove.call(ls,TK)}catch(e){}throw new Error('auth')}
  if(!r.ok)throw new Error('http '+r.status);
  return r.json();
}

let busy=false,again=false;
async function sync(){
  if(!auth()||!navigator.onLine)return;
  if(busy){again=true;return} busy=true;
  try{
    const list=await call('/collections/progress/records?perPage=1');
    const rec=list.items[0], remote=(rec&&rec.data)||{};
    const keys=new Set(Object.keys(remote).filter(tracked));
    for(let i=0;i<ls.length;i++){const k=ls.key(i);if(tracked(k))keys.add(k)}
    const out={};let changed=false,push=!rec;
    keys.forEach(k=>{
      const loc={v:ls.getItem(k),t:meta[k]||0}, rem=remote[k]||{v:null,t:0};
      const m=merge(loc,rem);
      if(m.v!==loc.v){ if(m.v==null)rawRemove.call(ls,k);else rawSet.call(ls,k,m.v); changed=true }
      if(m.t!==(meta[k]||0)){meta[k]=m.t}
      if(m.v!==rem.v||m.t!==rem.t)push=true;
      out[k]=m;
    });
    saveMeta();
    if(push){
      const body=JSON.stringify({user:auth().uid,data:out});
      if(rec)await call('/collections/progress/records/'+rec.id,{method:'PATCH',body,keepalive:body.length<60000});
      else await call('/collections/progress/records',{method:'POST',body,keepalive:body.length<60000});
    }
    if(changed)dispatchEvent(new CustomEvent('cec-sync'));
  }catch(e){}
  finally{busy=false;if(again){again=false;setTimeout(sync,300)}}
}

/* entrada: la crida gate.js amb la contrasenya que ja ha comprovat */
window.cecSyncLogin=async function(password){
  try{
    const r=await fetch(API+'/cec/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({kid,password})});
    if(!r.ok)return false;
    const d=await r.json();
    rawSet.call(ls,TK,JSON.stringify({token:d.token,uid:d.record.id}));
    sync();return true;
  }catch(e){return false}
};
/* renova la sessió (dura 180 dies) i sincronitza */
async function start(){
  const a=auth();if(!a)return;
  try{const d=await call('/collections/users/auth-refresh',{method:'POST'});rawSet.call(ls,TK,JSON.stringify({token:d.token,uid:d.record.id}))}catch(e){}
  sync();
}
/* ---------- temps d'ús: compta mentre la pàgina és visible i hi ha hagut activitat l'últim minut i mig ---------- */
let dev=null;try{dev=ls.getItem('cec-dev');if(!dev){dev=Math.random().toString(36).slice(2,8);rawSet.call(ls,'cec-dev',dev)}}catch(e){dev='x'}
const area=(()=>{const p=location.pathname.split('/'+kid+'/')[1]||'';return p.replace(/(index\.html)?$/,'').replace(/\/$/,'')})();
let acc=0,lastAct=Date.now();
['pointerdown','keydown','scroll','touchstart'].forEach(ev=>addEventListener(ev,()=>{lastAct=Date.now()},{passive:true}));
setInterval(()=>{if(document.visibilityState==='visible'&&Date.now()-lastAct<90e3)acc+=5},5000);
function flush(){
  if(acc<=0)return;
  const k='cec-time-'+kid,o=jget(k)||{},id=new Date().toLocaleDateString('sv')+'|'+dev+'|'+area;
  o[id]=(o[id]||0)+acc;acc=0;
  try{ls.setItem(k,JSON.stringify(o))}catch(e){}
}
setInterval(flush,60000);
/* registre de lliçons acabades */
window.cecLog=function(text){
  const k='cec-log-'+kid,a=jget(k)||[];a.push(new Date().toISOString()+'|'+text);
  try{ls.setItem(k,JSON.stringify(a.slice(-300)))}catch(e){}
};
addEventListener('online',sync);
addEventListener('pagehide',()=>{flush();clearTimeout(timer);sync()});
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){lastAct=Date.now();sync()}
  else{flush();clearTimeout(timer);sync()}
});
start();
})();
