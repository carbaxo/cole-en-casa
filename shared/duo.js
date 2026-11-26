/* Cole en casa · motor d'exercicis tipus joc (camí d'unitats, targetes i pràctica).
   Cada pàgina defineix abans:
     window.CURS = {kid, name, grade, back, key, img, title, eyebrow, units:[...]}
   Una unitat: {id, title, sub, img, min?, learn:[targetes], ex:[exercicis]}
   Targeta: {img?, t, p, ex?:[[anglès, català]], tip?}
   Exercicis (k = tipus):
     pick  {q:"She ___ happy.", a:"is", o:["are","am"], ca?, w?}
     type  {q:"They ___ here. (be)", a:["are"], ca?, w?}
     build {ca:"Som germans.", en:"We are brothers.", x:["is"], w?}
     listen{en:"...", x:[...], ca?}
     img   {q:"There are two dogs.", a:{i:"dog",n:2,l?}, o:[{i:"cat",n:2}], w?, say?:false si q és en català}
     match {p:[["I","am"],["she","is"]]}
     spell {en:"Wednesday", ca?:"dimecres", alt?:[...]}  dictat: s'escolta i s'escriu
   Exercicis generats (matemàtiques): {k:"type", gen:()=>({q, a, eq?, num?})}: es crida a cada lliçó.
     eq(v) = funció que diu si la resposta v és bona (per a números i fraccions); num = teclat numèric.
     t = enunciat propi en lloc del de per defecte.
   Opcions de CURS: voice:false (sense veu en anglès), backLabel, intro, mascot, ask:{tipus:'enunciat'}.
   min:6 a una unitat o un exercici = només per a 6è. Les estrelles es desen a localStorage[key] = {idUnitat: 1-3}. */
(function(){
const C=window.CURS, app=document.getElementById('duo');
const units=C.units.filter(u=>!u.min||C.grade>=u.min).map(u=>({...u,ex:u.ex.filter(e=>!e.min||C.grade>=e.min)}));
const IMG=n=>C.img+n+'.webp';
const attr=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pickOne=a=>a[Math.floor(Math.random()*a.length)];
const COL=['--c1','--c3','--c5','--c4','--c2'];

/* ---------- progrés ---------- */
let best={};
try{best=JSON.parse(localStorage.getItem(C.key)||'{}')||{}}catch(e){}
const load=()=>{try{const o=JSON.parse(localStorage.getItem(C.key)||'{}')||{};for(const k in o)best[k]=Math.max(best[k]||0,o[k])}catch(e){}};
const save=()=>{load();try{localStorage.setItem(C.key,JSON.stringify(best))}catch(e){}};
/* progrés nou d'un altre dispositiu (shared/sync.js): si som al camí, el tornem a pintar */
addEventListener('cec-sync',()=>{load();if(!location.hash.includes('/'))route()});
const starRow=(n,cls='')=>`<span class="d-stars ${cls}" aria-label="${n} de 3 estrelles">${[0,1,2].map(i=>`<span class="${i<n?'on':''}">★</span>`).join('')}</span>`;

/* ---------- veu i sons ---------- */
let voice=null;
function pickVoice(){try{const vs=speechSynthesis.getVoices();voice=vs.find(v=>/^en[-_]GB/i.test(v.lang))||vs.find(v=>/^en[-_]US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null}catch(e){}}
const hasVoice='speechSynthesis' in window;
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
const plain=t=>String(t).replace(/<[^>]+>/g,'').replace(/ · /g,', ').replace(/_{2,}/g,' ... ').replace(/→/g,', ').replace(/ \/ /g,', ').replace(/\(.*?\)/g,'');
/* Àudios gravats (veu neuronal generada al NUC amb tools/tts-gen.py): <clau>.mp3 a C.audio.
   La clau és un hash FNV-1a del text net; ha de coincidir amb tools/tts-texts.mjs.
   Si una frase no té àudio, es fa servir la veu del dispositiu. */
const sayKey=t=>{let h=0x811c9dc5;const s=plain(t).replace(/\s+/g,' ').trim();for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16).padStart(8,'0')};
let clips=null,player=null;
if(C.audio)fetch(C.audio+'index.json').then(r=>r.ok?r.json():[]).then(a=>{clips=new Set(a)}).catch(()=>{});
function speak(t,slow){
  hush();if(C.voice===false)return;
  const k=clips&&sayKey(t);
  if(k&&clips.has(k)){
    try{player=new Audio(C.audio+k+'.mp3');player.playbackRate=slow?.7:1;player.preservesPitch=true;
      player.play().catch(()=>{clips.delete(k);tts(t,slow)});return}catch(e){}
  }
  tts(t,slow);
}
function tts(t,slow){if(!hasVoice)return;try{const u=new SpeechSynthesisUtterance(plain(t));u.lang=voice?voice.lang:'en-GB';if(voice)u.voice=voice;u.rate=slow?.55:.9;speechSynthesis.speak(u)}catch(e){}}
const hush=()=>{try{if(player){player.pause();player=null}}catch(e){}try{speechSynthesis.cancel()}catch(e){}};
let actx=null;
function tone(seq,type='sine'){
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const t0=actx.currentTime;
    seq.forEach(([f,at,d])=>{const o=actx.createOscillator(),g=actx.createGain();o.type=type;o.frequency.value=f;
      g.gain.setValueAtTime(.0001,t0+at);g.gain.exponentialRampToValueAtTime(.16,t0+at+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+at+d);
      o.connect(g).connect(actx.destination);o.start(t0+at);o.stop(t0+at+d+.05)})}catch(e){}
}
const SND={ok:()=>tone([[660,0,.14],[990,.1,.22]]),ko:()=>tone([[260,0,.2],[200,.14,.28]],'triangle'),
  win:()=>tone([[523,0,.14],[659,.13,.14],[784,.26,.14],[1047,.39,.4]]),tap:()=>tone([[520,0,.05]])};
const SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
const sayBtn=(t,cls='')=>C.voice!==false&&(hasVoice||C.audio)?`<button type="button" class="d-say ${cls}" data-say="${attr(t)}" aria-label="Escolta">${SPK}</button>`:'';
app.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.stopPropagation();speak(b.dataset.say,b.dataset.slow)}});

/* ---------- navegació (el botó enrere del mòbil torna al camí) ---------- */
function go(h){if(location.hash!==h)location.hash=h;else route()}
function route(){
  hush();closeSheet();
  const [id,view]=location.hash.slice(1).split('/'),u=units.find(x=>x.id===id);
  if(u&&view==='apren')learn(u,0);
  else if(u&&view==='practica')lesson(u);
  else path();
  window.scrollTo({top:0});
}
addEventListener('hashchange',route);

/* ---------- camí d'unitats ---------- */
const OFF=[0,1,1.5,1,0,-1,-1.5,-1];
function path(){
  const tot=units.reduce((a,u)=>a+(best[u.id]||0),0),next=units.find(u=>!best[u.id]);
  const h=new Date().getHours(),hi=(h<14?'Bon dia':h<21?'Bona tarda':'Bona nit')+', '+C.name+'!';
  const msg=next?(tot?`${hi} Seguim? Et toca <b>${next.title}</b>.`:`${hi} ${C.intro||"Repassem la base de l'anglès."} Comença per la primera unitat.`):`${hi} Has acabat totes les unitats. Pots repetir-les per aconseguir totes les estrelles!`;
  document.title=C.title+' · '+C.name;
  app.innerHTML=`<div class="d-wrap">
    <div class="d-top"><a class="backhub" href="${C.back}">${C.backLabel||'← Anglès'}</a><span class="d-total"><img src="${IMG('star')}" alt="">${tot} / ${units.length*3}</span></div>
    <header class="d-hero glass"><img class="d-mascot" src="${IMG(C.mascot||'fox')}" alt=""><div class="d-herotxt"><span class="eyebrow">${C.eyebrow}</span><h1>${C.title}</h1><p class="d-bubble">${msg}</p></div></header>
    <ol class="d-path">${units.map((u,i)=>{const s=best[u.id]||0;return `<li class="d-node${u===next?' next':''}${s?' done':''}" style="--cc:var(${COL[i%5]});--x:${OFF[i%8]}">
      ${u===next?'<span class="d-start">Comença aquí!</span>':''}
      <button type="button" class="d-orb" data-u="${u.id}" aria-label="Unitat ${i+1}: ${attr(u.title)}"><img src="${IMG(u.img)}" alt=""></button>
      ${starRow(s)}<span class="d-name">${u.title}</span><span class="d-sub">${u.sub}</span></li>`}).join('')}</ol>
    <p class="d-credit">Il·lustracions: Fluent Emoji de Microsoft (MIT)</p>
  </div>`;
  app.querySelectorAll('[data-u]').forEach(b=>b.addEventListener('click',()=>{SND.tap();sheet(units.find(u=>u.id===b.dataset.u))}));
}
function sheet(u){
  closeSheet();
  const i=units.indexOf(u),s=best[u.id]||0;
  const bg=document.createElement('div');bg.className='d-sheetbg';
  bg.innerHTML=`<div class="d-sheet glass pop" role="dialog" aria-modal="true" aria-label="${attr(u.title)}" style="--cc:var(${COL[i%5]})">
    <button type="button" class="d-close" aria-label="Tanca">✕</button>
    <img class="d-sheetimg" src="${IMG(u.img)}" alt="">
    <span class="eyebrow">Unitat ${i+1}</span><h2>${u.title}</h2><p class="muted">${u.sub}</p>${starRow(s,'big')}
    <div class="d-sheetbtns">
      <a class="btn ghost" href="#${u.id}/apren"><img src="${IMG('book')}" alt="">Aprèn <small>${u.learn.length} targetes</small></a>
      <a class="btn" href="#${u.id}/practica"><img src="${IMG('rocket')}" alt="">Practica <small>${u.ex.length} exercicis</small></a>
    </div></div>`;
  bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('.d-close'))closeSheet()});
  document.body.appendChild(bg);document.body.classList.add('d-noscroll');
  bg.querySelector('.btn:not(.ghost)').focus({preventScroll:true});
}
function closeSheet(){document.querySelectorAll('.d-sheetbg').forEach(x=>x.remove());document.body.classList.remove('d-noscroll')}
addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});

/* ---------- aprèn: targetes ---------- */
function learn(u,k){
  hush();
  const c=u.learn[k],n=u.learn.length,last=k===n-1;
  app.innerHTML=`<div class="d-wrap d-lesson">
    <div class="d-lbar"><a class="d-x" href="#" aria-label="Surt">✕</a><div class="bar"><span style="width:${(k+1)/n*100}%"></span></div><span class="d-count">${k+1}/${n}</span></div>
    <article class="d-card glass pop">
      <img class="d-cardimg" src="${IMG(c.img||u.img)}" alt="">
      <span class="eyebrow">${u.title}</span><h2>${c.t}</h2><p class="d-p">${c.p}</p>
      ${c.ex?`<ul class="d-ex">${c.ex.map(e=>`<li>${sayBtn(e[0])}<span class="d-en">${e[0]}</span>${e[1]?`<span class="d-cat">${e[1]}</span>`:''}</li>`).join('')}</ul>`:''}
      ${c.tip?`<div class="d-tip"><img src="${IMG('bulb')}" alt=""><p>${c.tip}</p></div>`:''}
    </article>
    <div class="d-nav"><button type="button" class="btn ghost" id="prev"${k?'':' hidden'}>← Enrere</button><button type="button" class="btn" id="next">${last?'A practicar! →':'Següent →'}</button></div>
  </div>`;
  app.querySelector('#prev').addEventListener('click',()=>{learn(u,k-1);window.scrollTo({top:0})});
  app.querySelector('#next').addEventListener('click',()=>{if(last)go('#'+u.id+'/practica');else{learn(u,k+1);window.scrollTo({top:0})}});
}

/* ---------- pràctica ---------- */
const ASK={pick:'Tria la paraula que falta',type:'Escriu el que falta',build:'Tradueix la frase',listen:'Escolta i construeix la frase',img:'Tria la imatge correcta',match:'Uneix les parelles',spell:'Escolta i escriu'};
const FACES=['boy','girl','fox','owl','cool'];
const norm=s=>String(s).toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.,!?¿¡]/g,' ').replace(/\s+/g,' ').trim();
const words=s=>String(s).replace(/[.,!?]/g,'').split(/\s+/).filter(Boolean);
const blank=(q,fill)=>q.replace(/_{2,}/g,fill===undefined?'<span class="d-blank" id="blank">&nbsp;</span>':`<b class="d-fill">${fill}</b>`);
const hintSplit=q=>{const m=q.match(/^(.*?)\s*\(([^)]*)\)\s*$/);return m?[m[1],m[2]]:[q,'']};

let L=null;
function lesson(u){
  const ex=shuffle(u.ex);
  /* les parelles al principi, per escalfar */
  ex.sort((a,b)=>(b.k==='match')-(a.k==='match'));
  L={u,queue:ex.map(q=>({q:q.gen?{...q,...q.gen()}:q,retry:false})),pos:0,total:ex.length,done:0,first:0,streak:0,top:0};
  render();
}
function render(){
  hush();
  const it=L.queue[L.pos];let q=it.q;
  if(q.k==='listen'&&!hasVoice&&!C.audio)q={...q,k:'build',ca:q.ca||q.en};
  if(q.k==='spell'&&!hasVoice&&!C.audio)q={...q,k:'type',q:'___ ('+(q.ca||'')+')',a:[q.en]};
  app.innerHTML=`<div class="d-wrap d-lesson">
    <div class="d-lbar"><a class="d-x" href="#" aria-label="Surt">✕</a><div class="bar"><span style="width:${L.done/L.total*100}%"></span></div>
      <span class="d-streak${L.streak>=2?' on':''}" title="Ratxa"><img src="${IMG('fire')}" alt="">${L.streak}</span></div>
    ${it.retry?'<p class="d-retry">Aquesta l\'has fallat abans. Torna-ho a provar!</p>':''}
    <h2 class="d-ask">${q.t||(C.ask&&C.ask[q.k])||ASK[q.k]}</h2>
    <div class="d-body pop" id="body"></div>
  </div>
  <div class="d-foot" id="foot"><div class="d-footin"><button type="button" class="btn d-check" id="check" disabled>Comprova</button></div></div>`;
  const body=app.querySelector('#body'),check=app.querySelector('#check');
  const T=TYPES[q.k](q,body,ok=>{check.disabled=!ok});
  check.addEventListener('click',()=>feedback(q,T));
  if(q.k==='match')app.querySelector('#foot').hidden=true;
  T.onDone=r=>feedback(q,T,r);
}
function feedback(q,T,forced){
  const ok=forced?forced.ok:T.check();
  T.lock&&T.lock(ok);
  const it=L.queue[L.pos];
  if(ok){SND.ok();L.done++;L.streak++;L.top=Math.max(L.top,L.streak);if(!it.retry&&!(forced&&forced.slips))L.first++}
  else{SND.ko();L.streak=0;L.queue.push({q,retry:true})}
  if(T.say)setTimeout(()=>speak(T.say),ok?250:500);
  const cheer=pickOne(['Molt bé!','Genial!','Perfecte!','Ho has clavat!','Fantàstic!','Boníssim!']);
  const foot=app.querySelector('#foot');foot.hidden=false;foot.className='d-foot '+(ok?'ok':'ko');
  const slip=forced&&forced.slips?`<p>Fet! Però t'has equivocat ${forced.slips===1?'una vegada':forced.slips+' vegades'}.</p>`:'';
  foot.innerHTML=`<div class="d-footin pop"><div class="d-fb">
      <img src="${IMG(ok?'starstruck':'thinking')}" alt="">
      <div><strong>${ok?cheer:'Gairebé!'}</strong>
        ${!ok&&T.right?`<p class="d-right">Resposta correcta: <b>${T.right}</b>${T.say?sayBtn(T.say,'sm'):''}</p>`:''}
        ${ok&&T.say?`<p class="d-right">${T.right||''}${sayBtn(T.say,'sm')}</p>`:''}
        ${slip}${q.ca&&q.k!=='build'?`<p class="d-cat">${q.ca}</p>`:''}${q.w&&(!ok||q.k==='pick')?`<p class="d-why">${q.w}</p>`:''}
      </div></div>
    <button type="button" class="btn d-check" id="cont">Continua</button></div>`;
  const cont=foot.querySelector('#cont');cont.focus({preventScroll:true});
  cont.addEventListener('click',()=>{L.pos++;if(L.pos>=L.queue.length)end();else{render();window.scrollTo({top:0})}});
}

/* tipus d'exercici: cadascun pinta el cos i torna {check, right, say, lock} */
function choose(box,sel,on){box.querySelectorAll(sel).forEach(b=>b.addEventListener('click',()=>{SND.tap();box.querySelectorAll(sel).forEach(x=>x.classList.toggle('sel',x===b));on(b)}))}
const TYPES={
  pick(q,el,ready){
    el.innerHTML=`<div class="d-q glass"><p class="d-sentence">${blank(q.q)}</p>${q.ca?`<p class="d-cat">${q.ca}</p>`:''}</div>
      <div class="d-opts">${shuffle([q.a,...q.o]).map(o=>`<button type="button" class="d-opt" data-v="${attr(o)}">${o}</button>`).join('')}</div>`;
    let v=null;choose(el,'.d-opt',b=>{v=b.dataset.v;el.querySelector('#blank').textContent=v;ready(true)});
    return {check:()=>v===q.a,right:blank(q.q,q.a),say:q.q.replace(/_{2,}/,q.a),
      lock(ok){el.querySelectorAll('.d-opt').forEach(b=>{b.disabled=true;if(b.dataset.v===q.a)b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')});
        el.querySelector('#blank').outerHTML=`<b class="d-fill ${ok?'':'bad'}">${ok?q.a:v}</b>`}};
  },
  type(q,el,ready){
    const [s,h]=hintSplit(q.q),ans=[].concat(q.a);
    el.innerHTML=`<div class="d-q glass"><p class="d-sentence">${blank(s)}</p>${h?`<p class="d-hint">(${h})</p>`:''}${q.ca?`<p class="d-cat">${q.ca}</p>`:''}</div>
      <input class="d-input" id="inp" type="text"${q.num?' inputmode="decimal"':''} autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Resposta" placeholder="Escriu aquí…">`;
    const inp=el.querySelector('#inp');
    inp.addEventListener('input',()=>{el.querySelector('#blank').textContent=inp.value||' ';ready(inp.value.trim()!=='')});
    inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim()){e.preventDefault();app.querySelector('#check').click()}});
    setTimeout(()=>inp.focus({preventScroll:true}),50);
    return {check:()=>q.eq?q.eq(inp.value):ans.some(a=>norm(a)===norm(inp.value)),right:blank(s,ans[0]),say:s.replace(/_{2,}/,ans[0]),
      lock(ok){inp.disabled=true;inp.classList.add(ok?'right':'wrong')}};
  },
  build(q,el,ready){return tiles(q,el,ready,`<div class="d-speaker"><img src="${IMG(FACES[q.ca.length%FACES.length])}" alt=""><p class="d-bubble2">${q.ca}</p></div>`)},
  listen(q,el,ready){
    const T=tiles(q,el,ready,`<div class="d-listen"><button type="button" class="d-big" data-say="${attr(q.en)}" aria-label="Escolta">${SPK}</button><button type="button" class="d-big slow" data-say="${attr(q.en)}" data-slow="1" aria-label="Escolta a poc a poc"><img src="${IMG('turtle')}" alt=""></button></div>`);
    setTimeout(()=>speak(q.en),350);return T;
  },
  spell(q,el,ready){
    el.innerHTML=`<div class="d-listen"><button type="button" class="d-big" data-say="${attr(q.en)}" aria-label="Escolta">${SPK}</button><button type="button" class="d-big slow" data-say="${attr(q.en)}" data-slow="1" aria-label="Escolta a poc a poc"><img src="${IMG('turtle')}" alt=""></button></div>
      ${q.ca?`<p class="d-cat" style="text-align:center">${q.ca}</p>`:''}
      <input class="d-input" id="inp" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Escriu el que sents" placeholder="Escriu el que sents…">`;
    const inp=el.querySelector('#inp');
    inp.addEventListener('input',()=>ready(inp.value.trim()!==''));
    inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim()){e.preventDefault();app.querySelector('#check').click()}});
    setTimeout(()=>{speak(q.en);inp.focus({preventScroll:true})},350);
    return {check:()=>[q.en,...(q.alt||[])].some(a=>norm(a)===norm(inp.value)),right:q.en,say:q.en,
      lock(ok){inp.disabled=true;inp.classList.add(ok?'right':'wrong')}};
  },
  img(q,el,ready){
    const key=o=>o.i+'|'+(o.n||1)+'|'+(o.l||'');
    const pic=o=>`<button type="button" class="d-pic" data-v="${attr(key(o))}"><span class="d-picimgs n${o.n||1}">${Array(o.n||1).fill(`<img src="${IMG(o.i)}" alt="">`).join('')}</span>${o.l?`<span class="d-piclabel">${o.l}</span>`:''}</button>`;
    const isQ=q.say!==false;
    el.innerHTML=`<div class="d-q glass"><p class="d-sentence">${q.q}${isQ?sayBtn(q.q,'sm'):''}</p>${q.ca?`<p class="d-cat">${q.ca}</p>`:''}</div>
      <div class="d-pics">${shuffle([q.a,...q.o]).map(pic).join('')}</div>`;
    let v=null;choose(el,'.d-pic',b=>{v=b.dataset.v;ready(true)});
    return {check:()=>v===key(q.a),right:null,say:isQ?q.q:null,
      lock(){el.querySelectorAll('.d-pic').forEach(b=>{b.disabled=true;if(b.dataset.v===key(q.a))b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')})}};
  },
  match(q,el){
    const left=shuffle(q.p.map((p,i)=>({t:p[0],i}))),right=shuffle(q.p.map((p,i)=>({t:p[1],i})));
    el.innerHTML=`<div class="d-match"><div>${left.map(x=>`<button type="button" class="d-opt" data-side="l" data-i="${x.i}">${x.t}</button>`).join('')}</div>
      <div>${right.map(x=>`<button type="button" class="d-opt" data-side="r" data-i="${x.i}">${x.t}</button>`).join('')}</div></div>`;
    let sel=null,slips=0,left2=q.p.length;const T={};
    el.querySelectorAll('.d-opt').forEach(b=>b.addEventListener('click',()=>{
      if(b.disabled)return;
      if(b.dataset.side==='l'&&/[a-z]/i.test(b.textContent))speak(b.textContent);
      if(!sel||sel.dataset.side===b.dataset.side){el.querySelectorAll('.d-opt.sel').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b;SND.tap();return}
      const a=sel,l=a.dataset.side==='l'?a:b,r=a.dataset.side==='l'?b:a;sel=null;
      /* el text pot repetir-se (am, is...): val qualsevol parella amb el mateix text */
      const good=q.p[l.dataset.i][1]===r.textContent;
      if(good){[l,r].forEach(x=>{x.classList.remove('sel');x.classList.add('right');x.disabled=true});tone([[700,0,.08]]);
        if(--left2===0)setTimeout(()=>T.onDone({ok:true,slips}),350)}
      else{slips++;[l,r].forEach(x=>{x.classList.remove('sel');x.classList.add('wrong');setTimeout(()=>x.classList.remove('wrong'),500)});SND.ko()}
    }));
    return Object.assign(T,{check:()=>true,right:null,say:null});
  }
};
function tiles(q,el,ready,top){
  const bank=shuffle([...words(q.en),...(q.x||[])].map((t,i)=>({t,i})));
  el.innerHTML=`${top}<div class="d-answer" id="ans" aria-label="La teva resposta"></div><div class="d-bank" id="bank">${bank.map(b=>`<button type="button" class="d-tile" data-i="${b.i}">${b.t}</button>`).join('')}</div>`;
  const ans=el.querySelector('#ans'),bk=el.querySelector('#bank');
  bk.querySelectorAll('.d-tile').forEach(b=>{
    b.addEventListener('click',()=>{
      if(b.disabled)return;SND.tap();speak(b.textContent);
      const c=document.createElement('button');c.type='button';c.className='d-tile pop';c.textContent=b.textContent;c.dataset.i=b.dataset.i;
      c.addEventListener('click',()=>{if(c.disabled)return;c.remove();b.classList.remove('used');b.disabled=false;ready(ans.children.length>0)});
      ans.appendChild(c);b.classList.add('used');b.disabled=true;ready(true);
    });
  });
  const said=()=>[...ans.children].map(c=>c.textContent).join(' ');
  return {check:()=>norm(said())===norm(q.en)||(q.alt||[]).some(a=>norm(a)===norm(said())),right:q.en,say:q.en,
    lock(ok){el.querySelectorAll('.d-tile').forEach(b=>b.disabled=true);ans.classList.add(ok?'right':'wrong')}};
}

/* ---------- final ---------- */
function end(){
  const u=L.u,r=L.first/L.total,s=r>=.9?3:r>=.7?2:1,prev=best[u.id]||0;
  if(s>prev){best[u.id]=s;save()}
  if(window.cecLog)cecLog(`${C.title}|${u.title}|${s}|${L.first}/${L.total}`);
  const msg=s===3?`Ets un crack, ${C.name}! Unitat perfecta.`:s===2?'Molt bé! Una mica més i tindràs les 3 estrelles.':'Unitat acabada! Mira les targetes i torna-ho a provar per guanyar més estrelles.';
  const i=units.indexOf(u),nx=units[i+1];
  app.innerHTML=`<div class="d-wrap d-end pop">
    <img class="d-endimg" src="${IMG(s===3?'trophy':s===2?'party':'star')}" alt="">
    <h1>${s===3?'Perfecte!':s===2?'Molt bé!':'Unitat acabada!'}</h1>
    ${starRow(s,'huge')}
    <div class="d-statrow"><div class="glass"><span>A la primera</span><b>${L.first} de ${L.total}</b></div><div class="glass"><span>Millor ratxa</span><b><img src="${IMG('fire')}" alt="">${L.top}</b></div></div>
    <p class="d-endmsg">${msg}${s>prev&&prev?' <b>Nou rècord!</b>':''}</p>
    <div class="d-nav center"><button type="button" class="btn ghost" id="again">Torna-ho a fer</button>${nx?`<a class="btn" href="#${nx.id}/apren">Següent: ${nx.title} →</a>`:''}<a class="btn ghost" href="#">Totes les unitats</a></div>
  </div>`;
  app.querySelector('#again').addEventListener('click',()=>{lesson(u);window.scrollTo({top:0})});
  SND.win();speak(s===3?'Perfect!':s===2?'Well done!':'Good job!');
  if(s===3)confetti();
}
function confetti(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const box=document.createElement('div');box.className='d-confetti';box.setAttribute('aria-hidden','true');
  const cs=['#3f6fa8','#3a9585','#d39a3c','#7d77c0','#c56d6a','#ffe27a'];
  box.innerHTML=Array.from({length:60},(_,i)=>`<i style="left:${Math.random()*100}%;background:${cs[i%cs.length]};animation-delay:${Math.random()*.6}s;animation-duration:${1.8+Math.random()*1.4}s;transform:rotate(${Math.random()*360}deg)"></i>`).join('');
  document.body.appendChild(box);setTimeout(()=>box.remove(),3600);
}

route();
})();
