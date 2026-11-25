/* Escriptori de cada nen: inici + una pàgina per assignatura (#catala, #castella, #angles, #mates).
   Cada pàgina defineix window.ESCRIPTORI = {kid, name, grade, color, subjects:[{id,name,short,color,topics:[...]}]}
   Un tema: {href, title, sub, key (localStorage de les estrelles), levels, ex} */
(function(){
const C=window.ESCRIPTORI;
const I={
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
 star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>',
 medal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="M8.5 10L6 3h4l2 4 2-4h4l-2.5 7"/><path d="M12 12.5v5"/></svg>',
 flame:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s5 4.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 1.5-4s.5 2.5 2.5 3c0-4 1-6.5 1-9z"/></svg>',
 layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
 out:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 17l-5-5 5-5M5 12h11"/></svg>',
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
 sparkle:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z"/><circle cx="19" cy="19" r="2"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>'
};
const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}};
const topicStats=t=>{const b=read(t.key),v=Object.values(b);return {stars:v.reduce((a,x)=>a+x,0),max:t.levels*3,lv:v.filter(x=>x>0).length}};
const all=C.subjects.flatMap(s=>s.topics.map(t=>({...t,subject:s})));

/* ratxa de dies seguits */
let streak=1;
try{const key='cec-days-'+C.kid,today=new Date().toISOString().slice(0,10);let days=JSON.parse(localStorage.getItem(key)||'[]');
  if(!days.includes(today))days.push(today);days=days.slice(-90);localStorage.setItem(key,JSON.stringify(days));
  streak=0;const d=new Date(today);while(days.includes(d.toISOString().slice(0,10))){streak++;d.setDate(d.getDate()-1)}}catch(e){}

const icoSubj=s=>`<span class="icotile" style="--cc:${s.color}">${s.short}</span>`;
document.body.insertAdjacentHTML('afterbegin',`<div class="app" style="--cc:${C.color}">
  <aside class="side">
    <div class="who">
      <div class="avatar" aria-hidden="true">${C.name[0]}<img src="../img/${C.kid}-avatar.png" alt="" onerror="this.remove()"></div>
      <div><div class="hi">Hola, ${C.name}!</div><div class="grade">${C.grade}</div></div>
    </div>
    <nav class="nav" aria-label="Assignatures">
      <a href="#" data-v="">${I.home}Escriptori</a>
      ${C.subjects.map(s=>`<a href="#${s.id}" data-v="${s.id}"><span class="navico" style="--cc:${s.color}">${s.short}</span>${s.name}</a>`).join('')}
    </nav>
    <div class="out"><button type="button" onclick="cecLock()" aria-label="Tanca la sessió">${I.out}<span class="lbl">Tanca la sessió</span></button></div>
  </aside>
  <main class="main" id="main"></main>
</div>`);
const main=document.getElementById('main');

function topicCard(t){
  const st=topicStats(t),s=t.subject;
  return `<a class="glass topic" href="${t.href}" style="--cc:${s.color}">${icoSubj(s)}<span class="meta"><span class="tt">${t.title}</span><span class="sub">${t.sub} · ★ ${st.stars} de ${st.max}</span><span class="bar" aria-hidden="true"><span style="width:${st.stars/st.max*100}%"></span></span></span><span class="play">${I.play}</span></a>`;
}
function home(){
  let stars=0,max=0,lv=0,maxLv=0;all.forEach(t=>{const s=topicStats(t);stars+=s.stars;max+=s.max;lv+=s.lv;maxLv+=t.levels});
  const h=new Date().getHours(),greet=(h<14?'Bon dia':h<21?'Bona tarda':'Bona nit')+', '+C.name+'!';
  /* el tema per continuar: el primer que no tingui totes les estrelles */
  const next=all.find(t=>{const s=topicStats(t);return s.stars<s.max})||all[0];
  main.innerHTML=`
  <div class="topbar"><h1 class="pagetitle">El meu escriptori</h1><a class="back" href="../">← Cole en casa</a></div>
  <section class="hero">
    <div class="txt"><h2>${greet}</h2>
      <p>${next?'Preparat per aprendre una mica avui?':'Molt aviat tindràs aquí els teus primers temes.'}</p>
      ${next?`<a class="pill" href="${next.href}">${I.play.replace('<svg ','<svg width="18" height="18" ')}<span>Continua: ${next.title}</span></a>`:''}
    </div>
    <div class="art"><span class="orb">${I.sparkle}</span><img src="../img/${C.kid}-hero.png" alt="" onerror="this.remove()" style="position:absolute;inset:0"></div>
  </section>
  <section class="stats" aria-label="El meu progrés">
    <div class="stat" style="--tint:rgba(143,196,182,.55)"><span class="icotile">${I.star}</span><span class="lbl">Estrelles</span><span class="num">${stars}</span><span class="sub">de ${max}</span></div>
    <div class="stat" style="--tint:rgba(229,236,243,.5)"><span class="icotile">${I.medal}</span><span class="lbl">Nivells superats</span><span class="num">${lv}</span><span class="sub">de ${maxLv}</span></div>
    <div class="stat" style="--tint:rgba(219,232,243,.75)"><span class="icotile">${I.flame}</span><span class="lbl">Ratxa</span><span class="num">${streak}</span><span class="sub">${streak===1?'dia seguit':'dies seguits'}</span></div>
    <div class="stat" style="--tint:rgba(148,151,207,.55)"><span class="icotile">${I.layers}</span><span class="lbl">Temes</span><span class="num">${all.length}</span><span class="sub">${all.reduce((a,t)=>a+t.ex,0)} exercicis</span></div>
  </section>
  <h2>Les meves assignatures</h2>
  <section class="subjects">${C.subjects.map(s=>{
    let st=0,mx=0;s.topics.forEach(t=>{const x=topicStats(t);st+=x.stars;mx+=x.max});
    return `<a class="glass subject" href="#${s.id}" style="--cc:${s.color}">${icoSubj(s)}<span class="tt">${s.name}</span><span class="sub">${s.topics.length?s.topics.length+(s.topics.length===1?' tema':' temes')+' · ★ '+st+' de '+mx:'Aviat'}</span>${s.topics.length?`<span class="bar" aria-hidden="true"><span style="width:${mx?st/mx*100:0}%"></span></span>`:''}</a>`}).join('')}</section>`;
}
function subject(s){
  main.innerHTML=`
  <div class="topbar"><a class="back" href="#">${I.back.replace('<svg ','<svg width="16" height="16" ')}Escriptori</a></div>
  <section class="subjhead glass" style="--cc:${s.color}">${icoSubj(s)}<div><span class="eyebrow">${C.grade}</span><h1>${s.name}</h1></div></section>
  <section class="topics">${s.topics.length?s.topics.map(t=>topicCard({...t,subject:s})).join(''):
    `<div class="glass empty" style="--cc:${s.color}">${icoSubj(s)}<div><h2>Encara no hi ha temes</h2><p class="muted">Molt aviat hi trobaràs els temes de ${s.name}.</p></div></div>`}</section>`;
}
function route(){
  const id=location.hash.slice(1),s=C.subjects.find(x=>x.id===id);
  if(s)subject(s);else home();
  document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===(s?s.id:'')));
  document.title=(s?s.name+' · ':'')+'Escriptori '+(C.kid==='oliver'?"de l'":'del ')+C.name;
  window.scrollTo({top:0});
}
addEventListener('hashchange',route);route();
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
