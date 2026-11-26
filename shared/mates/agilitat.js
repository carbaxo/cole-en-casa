/* Càlcul ràpid: joc d'agilitat mental amb temps. El nen escriu la resposta amb el dit
   (shared/mates/digits.js la reconeix) o amb el teclat numèric.
   La pàgina defineix window.AGIL = {kid, name, grade, back, key, img, model}.
   Rècords: localStorage[key] = {mode: punts}. Lliçons: cecLog (shared/sync.js). */
(function(){
const A=window.AGIL,app=document.getElementById('agil');
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
const IMG=n=>A.img+n+'.webp';
const ROUND=60;

/* ---------- operacions per curs ---------- */
const sq=()=>{const n=R(2,15);return {q:`${n}²`,a:n*n}};
const add=(a,b)=>({q:`${a} + ${b}`,a:a+b}),sub=(a,b)=>({q:`${a} − ${b}`,a:a-b}),mul=(a,b)=>({q:`${a} × ${b}`,a:a*b}),dvd=(a,b)=>({q:`${a*b} : ${a}`,a:b});
const MODES=A.grade>=6?[
  {id:'taules',name:'Taules',sub:'de la del 2 a la del 12',img:'fire',gen:()=>mul(R(2,12),R(2,12))},
  {id:'sumres',name:'Sumes i restes',sub:'de dues xifres',img:'biceps',gen:()=>pick([()=>add(R(12,89),R(11,99)),()=>{const a=R(30,150),b=R(11,a-1);return sub(a,b)}])()},
  {id:'multdiv',name:'Multiplica i divideix',sub:'per una xifra i divisions exactes',img:'brain',gen:()=>pick([()=>mul(R(11,25),R(2,9)),()=>dvd(R(2,12),R(2,12)),sq])()},
  {id:'barreja',name:'Barreja',sub:'de tot una mica',img:'rocket',gen:()=>pick([()=>mul(R(2,12),R(2,12)),()=>add(R(12,99),R(11,99)),()=>{const a=R(30,150),b=R(11,a-1);return sub(a,b)},()=>dvd(R(2,12),R(2,12)),sq])()}
]:[
  {id:'sumes',name:'Sumes',sub:'fins a 100',img:'star',gen:()=>{const a=R(5,60),b=R(3,40);return add(a,b)}},
  {id:'restes',name:'Restes',sub:'fins a 100',img:'biceps',gen:()=>{const a=R(15,99),b=R(3,a-1);return sub(a,b)}},
  {id:'taules',name:'Taules',sub:'de la del 2 a la del 10',img:'fire',gen:()=>mul(R(2,10),R(2,10))},
  {id:'barreja',name:'Barreja',sub:'sumes, restes i taules',img:'rocket',gen:()=>pick([()=>add(R(5,60),R(3,40)),()=>{const a=R(15,99),b=R(3,a-1);return sub(a,b)},()=>mul(R(2,10),R(2,10)),()=>dvd(R(2,9),R(2,9))])()}
];

/* ---------- rècords ---------- */
const best=()=>{try{return JSON.parse(localStorage.getItem(A.key)||'{}')||{}}catch(e){return {}}};
const saveBest=(id,p)=>{const b=best();if(p>(b[id]||0)){b[id]=p;try{localStorage.setItem(A.key,JSON.stringify(b))}catch(e){}return true}return false};

/* ---------- sons ---------- */
let actx=null;
function tone(seq,type='sine'){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const t0=actx.currentTime;
  seq.forEach(([f,at,d])=>{const o=actx.createOscillator(),g=actx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,t0+at);g.gain.exponentialRampToValueAtTime(.16,t0+at+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+at+d);o.connect(g).connect(actx.destination);o.start(t0+at);o.stop(t0+at+d+.05)})}catch(e){}}
const SND={ok:()=>tone([[660,0,.12],[990,.08,.18]]),ko:()=>tone([[260,0,.18],[200,.12,.25]],'triangle'),tick:()=>tone([[1200,0,.04]]),end:()=>tone([[523,0,.14],[659,.13,.14],[784,.26,.14],[1047,.39,.4]])};

/* ---------- pantalla inicial ---------- */
let inputMode='pen';try{inputMode=localStorage.getItem('agil-input')||'pen'}catch(e){}
function home(){
  const b=best();
  app.innerHTML=`<div class="ag-wrap">
    <div class="ag-top"><a class="backhub" href="${A.back}">← Matemàtiques</a></div>
    <header class="ag-hero glass"><img src="${IMG('hourglass')}" alt=""><div><span class="eyebrow">Agilitat mental</span><h1>Càlcul ràpid</h1>
      <p>Tens <b>${ROUND} segons</b>. Escriu el resultat amb el dit tan ràpid com puguis. Com més ràpid, més punts!</p></div></header>
    <div class="ag-modes">${MODES.map(m=>`<button type="button" class="glass ag-mode" data-m="${m.id}"><img src="${IMG(m.img)}" alt=""><span class="t">${m.name}</span><span class="s">${m.sub}</span><span class="rec">${b[m.id]?'Rècord: <b>'+b[m.id]+'</b>':'Encara sense rècord'}</span></button>`).join('')}</div>
    <div class="ag-input"><span>Respondre amb:</span>
      <button type="button" class="ag-seg${inputMode==='pen'?' on':''}" data-i="pen">✍️ El dit</button><button type="button" class="ag-seg${inputMode==='keys'?' on':''}" data-i="keys">🔢 Teclat</button></div>
  </div>`;
  app.querySelectorAll('.ag-mode').forEach(b=>b.addEventListener('click',()=>start(MODES.find(m=>m.id===b.dataset.m))));
  app.querySelectorAll('.ag-seg').forEach(b=>b.addEventListener('click',()=>{inputMode=b.dataset.i;try{localStorage.setItem('agil-input',inputMode)}catch(e){}home()}));
}

/* ---------- partida ---------- */
let G=null;
function start(mode){
  G={mode,points:0,ok:0,ko:0,combo:0,t0:0,end:0,cur:null,qt:0,timer:null,busy:false};
  let n=3;
  app.innerHTML=`<div class="ag-count"><span id="n">3</span></div>`;
  const step=()=>{if(n===0){play();return}app.querySelector('#n').textContent=n;tone([[n===1?880:660,0,.1]]);n--;setTimeout(step,700)};step();
}
function play(){
  app.innerHTML=`<div class="ag-wrap ag-game">
    <div class="ag-bar"><a class="d-x" href="#" id="quit" aria-label="Surt">✕</a><div class="bar"><span id="time"></span></div><span class="ag-pts"><b id="pts">0</b> punts</span></div>
    <div class="ag-q glass"><span class="ag-combo" id="combo"></span><div class="ag-op" id="op"></div><div class="ag-ans" id="ans">?</div><div class="ag-fly" id="fly"></div></div>
    <div id="inp"></div>
  </div>`;
  app.querySelector('#quit').addEventListener('click',e=>{e.preventDefault();stop(true)});
  inputMode==='pen'?pen():keys();
  G.t0=performance.now();G.end=G.t0+ROUND*1000;
  const tm=app.querySelector('#time');let last=ROUND;
  G.timer=setInterval(()=>{const left=Math.max(0,(G.end-performance.now())/1000);tm.style.width=(left/ROUND*100)+'%';tm.classList.toggle('low',left<10);
    if(Math.ceil(left)<last&&left<5.5&&left>0)SND.tick();last=Math.ceil(left);if(left<=0)stop(false)},100);
  next();
}
function next(){
  let q;do{q=G.mode.gen()}while(G.cur&&q.q===G.cur.q);
  G.cur=q;G.qt=performance.now();G.busy=false;
  app.querySelector('#op').textContent=q.q+' =';
  setAns('?','');
  if(G.clear)G.clear();
}
function setAns(t,cls){const a=app.querySelector('#ans');if(!a)return;a.textContent=t;a.className='ag-ans'+(cls?' '+cls:'')}
function flyText(t,cls){const f=app.querySelector('#fly');if(!f)return;f.textContent=t;f.className='ag-fly go '+cls;setTimeout(()=>{f.className='ag-fly'},700)}
/* resposta: v = text; alts = altres lectures possibles (si la xarxa dubta) */
function answer(v,alts){
  if(G.busy||!G.cur)return;
  const want=String(G.cur.a),ok=v===want||(alts||[]).includes(want);
  G.busy=true;
  if(ok){
    const secs=(performance.now()-G.qt)/1000,bonus=Math.max(0,Math.round(10-secs*1.5));
    G.combo++;const mult=G.combo>=10?3:G.combo>=5?2:1,p=(10+bonus)*mult;
    G.points+=p;G.ok++;SND.ok();
    setAns(want,'ok');flyText('+'+p,'ok');
    app.querySelector('#pts').textContent=G.points;
    app.querySelector('#combo').textContent=mult>1?`×${mult} combo!`:'';
    setTimeout(next,350);
  }else{
    G.ko++;G.combo=0;SND.ko();app.querySelector('#combo').textContent='';
    setAns(want,'ko');flyText('Era '+want,'ko');
    setTimeout(next,1100);
  }
}

/* ---------- escriure amb el dit ---------- */
function pen(){
  const box=app.querySelector('#inp');
  box.innerHTML=`<div class="ag-pad glass"><canvas id="cv" aria-label="Escriu aquí el resultat amb el dit"></canvas><span class="ag-hint" id="hint">Escriu aquí ✍️</span></div>
    <div class="ag-tools"><button type="button" class="btn ghost" id="clr">Esborra</button><span class="ag-read" id="read"></span><button type="button" class="btn" id="send">Envia</button></div>`;
  const cv=box.querySelector('#cv'),ctx=cv.getContext('2d'),read=box.querySelector('#read'),hint=box.querySelector('#hint');
  let strokes=[],cur=null,idle=null,res=null;
  const fit=()=>{const r=cv.getBoundingClientRect(),d=devicePixelRatio||1;cv.width=r.width*d;cv.height=r.height*d;ctx.setTransform(d,0,0,d,0,0);draw()};
  const draw=()=>{const r=cv.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);ctx.lineCap=ctx.lineJoin='round';ctx.lineWidth=Math.max(7,r.height*.045);ctx.strokeStyle=getComputedStyle(cv).color;
    for(const s of strokes){ctx.beginPath();s.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(s.length===1)ctx.lineTo(s[0][0]+.1,s[0][1]);ctx.stroke()}};
  const pos=e=>{const r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
  cv.addEventListener('pointerdown',e=>{if(G.busy)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}clearTimeout(idle);hint.hidden=true;cur=[pos(e)];strokes.push(cur);draw()});
  cv.addEventListener('pointermove',e=>{if(!cur)return;e.preventDefault();const p=pos(e),l=cur[cur.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])>1.5){cur.push(p);draw()}});
  const up=()=>{if(!cur)return;cur=null;recognize();clearTimeout(idle);idle=setTimeout(()=>auto(),700)};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  function recognize(){
    res=Digits.read(strokes);
    const s=res.map(r=>r.best).join('');read.textContent=s?'Llegeixo: '+s:'';
    if(G.cur&&s){const alts=Digits.candidates(res).map(c=>c.s);if(alts.includes(String(G.cur.a))&&s.length===String(G.cur.a).length){clearTimeout(idle);answer(s,alts)}}
  }
  /* si deixa d'escriure i ja hi ha prou xifres, es corregeix sol */
  function auto(){if(!res||!res.length||G.busy)return;const s=res.map(r=>r.best).join('');if(s.length>=String(G.cur.a).length)answer(s,Digits.candidates(res).map(c=>c.s))}
  box.querySelector('#clr').addEventListener('click',()=>{G.clear()});
  box.querySelector('#send').addEventListener('click',()=>{if(!res||!res.length)return;answer(res.map(r=>r.best).join(''),Digits.candidates(res).map(c=>c.s))});
  G.clear=()=>{strokes=[];res=null;clearTimeout(idle);read.textContent='';hint.hidden=false;draw()};
  addEventListener('resize',fit);requestAnimationFrame(fit);
}

/* ---------- teclat ---------- */
function keys(){
  const box=app.querySelector('#inp');let v='';
  box.innerHTML=`<div class="ag-keys">${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k=>`<button type="button" class="ag-key${k==='✓'?' go':''}" data-k="${k}">${k}</button>`).join('')}</div>`;
  const show=()=>setAns(v||'?','typing');
  box.querySelectorAll('.ag-key').forEach(b=>b.addEventListener('click',()=>{
    if(G.busy)return;const k=b.dataset.k;
    if(k==='⌫')v=v.slice(0,-1);else if(k==='✓'){if(v)answer(v);return}else if(v.length<5)v+=k;
    show();
    /* si ja és correcte, no cal prémer ✓ */
    if(v===String(G.cur.a))answer(v);
  }));
  G.clear=()=>{v=''};
  document.onkeydown=e=>{if(!G||!G.cur||!app.querySelector('.ag-keys'))return;if(/^\d$/.test(e.key))box.querySelector(`[data-k="${e.key}"]`).click();else if(e.key==='Backspace')box.querySelector('[data-k="⌫"]').click();else if(e.key==='Enter')box.querySelector('[data-k="✓"]').click()};
}

/* ---------- final ---------- */
function stop(quit){
  if(!G)return;clearInterval(G.timer);document.onkeydown=null;
  if(quit){G=null;home();return}
  const g=G;G=null;SND.end();
  const rec=saveBest(g.mode.id,g.points),tot=g.ok+g.ko;
  const stars=g.ok>=20?3:g.ok>=12?2:g.ok>=1?1:0;
  if(window.cecLog&&tot)cecLog(`Càlcul ràpid|${g.mode.name}|${stars}|${g.ok}/${tot}`);
  app.innerHTML=`<div class="ag-wrap ag-end">
    <img class="ag-endimg" src="${IMG(rec&&g.points?'trophy':stars>=2?'party':'star')}" alt="">
    <h1>${rec&&g.points?'Nou rècord!':'Temps!'}</h1>
    <p class="ag-big"><b>${g.points}</b> punts</p>
    <div class="ag-stats"><div class="glass"><span>Encerts</span><b>${g.ok}</b></div><div class="glass"><span>Errors</span><b>${g.ko}</b></div><div class="glass"><span>Rècord</span><b>${best()[g.mode.id]||0}</b></div></div>
    <div class="ag-nav"><button type="button" class="btn" id="again">Torna a jugar</button><button type="button" class="btn ghost" id="menu">Canvia de joc</button></div>
  </div>`;
  app.querySelector('#again').addEventListener('click',()=>start(g.mode));
  app.querySelector('#menu').addEventListener('click',home);
}

Digits.load(A.model).catch(()=>{inputMode='keys'});
home();
})();
