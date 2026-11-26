/* Escriure la resposta amb el dit als exercicis de matemàtiques (shared/duo.js, tipus "type" amb eq).
   - Es dibuixen les xifres a la pissarra; quan el nen para un moment, les xifres llegides passen a la casella.
   - Botons per a la coma, la barra de fracció, el signe menys i esborrar; ⌨️ canvia al teclat.
   - Si la xarxa dubta entre dues xifres, en guarda les dues i variants() prova les combinacions.
   Fa servir window.Digits (shared/mates/digits.js). Preferència desada a localStorage['cec-pen'] ('0' = teclat). */
(function(){
let loading=null;
const getPref=()=>{try{return localStorage.getItem('cec-pen')!=='0'}catch(e){return true}};
const setPref=v=>{try{localStorage.setItem('cec-pen',v?'1':'0')}catch(e){}};

window.PenInput=function(el,inp,{model,ready}){
  if(!window.Digits)return null;
  if(!loading)loading=Digits.load(model).catch(()=>{loading=null;throw 0});
  const w=document.createElement('div');w.className='pn';
  w.innerHTML=`<div class="pn-pad glass"><canvas aria-label="Escriu la resposta amb el dit"></canvas><span class="pn-hint">Escriu aquí amb el dit ✍️</span></div>
    <div class="pn-keys"><button type="button" data-k=",">,</button><button type="button" data-k="/">/</button><button type="button" data-k="−">−</button>
      <button type="button" data-k="del" aria-label="Esborra">⌫</button><button type="button" class="pn-kb" aria-label="Canvia a teclat">⌨️</button></div>
    <button type="button" class="pn-back" hidden>✍️ Escriure amb el dit</button>`;
  inp.after(w);
  const pad=w.querySelector('.pn-pad'),cv=w.querySelector('canvas'),ctx=cv.getContext('2d'),hint=w.querySelector('.pn-hint'),keys=w.querySelector('.pn-keys'),back=w.querySelector('.pn-back');
  let on=false,strokes=[],cur=null,idle=null,alts=[],locked=false;
  const emit=()=>{inp.dispatchEvent(new Event('input'));ready(inp.value.trim()!==''||strokes.length>0)};

  function mode(p){
    on=p;pad.hidden=keys.hidden=!p;back.hidden=p;
    inp.readOnly=p;inp.setAttribute('inputmode',p?'none':'decimal');inp.classList.toggle('pn-hide',p);
    if(p){inp.blur();requestAnimationFrame(fit)}else{commit();inp.focus({preventScroll:true})}
  }
  /* si l'usuari escriu amb el teclat, les alternatives ja no valen */
  inp.addEventListener('input',e=>{if(e.isTrusted)alts=[...inp.value].map(c=>[c])});

  const fit=()=>{const r=cv.getBoundingClientRect();if(!r.width)return;const d=devicePixelRatio||1;cv.width=r.width*d;cv.height=r.height*d;ctx.setTransform(d,0,0,d,0,0);draw()};
  const draw=()=>{const r=cv.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);ctx.lineCap=ctx.lineJoin='round';ctx.lineWidth=Math.max(7,r.height*.05);ctx.strokeStyle=getComputedStyle(cv).color;
    for(const s of strokes){ctx.beginPath();s.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(s.length===1)ctx.lineTo(s[0][0]+.1,s[0][1]);ctx.stroke()}};
  const pos=e=>{const r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
  cv.addEventListener('pointerdown',e=>{if(locked)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}clearTimeout(idle);hint.hidden=true;cur=[pos(e)];strokes.push(cur);draw()});
  cv.addEventListener('pointermove',e=>{if(!cur)return;e.preventDefault();const p=pos(e),l=cur[cur.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])>1.5){cur.push(p);draw()}});
  const up=()=>{if(!cur)return;cur=null;emit();clearTimeout(idle);idle=setTimeout(commit,650)};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);

  /* passa el que hi ha dibuixat a la casella */
  function commit(){
    clearTimeout(idle);
    if(!strokes.length)return;
    const res=Digits.read(strokes);
    for(const r of res){
      inp.value+=r.best;
      alts.push(r.probs.map((p,k)=>({k,p})).filter(o=>o.k===r.best||o.p>=.2).sort((a,b)=>b.p-a.p).slice(0,2).map(o=>String(o.k)));
    }
    strokes=[];draw();hint.hidden=inp.value!=='';emit();
  }
  keys.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||locked)return;
    if(b.classList.contains('pn-kb')){setPref(false);mode(false);return}
    const k=b.dataset.k;
    if(k==='del'){if(strokes.length){strokes=[];clearTimeout(idle);draw()}else{inp.value=inp.value.slice(0,-1);alts.pop()}hint.hidden=inp.value!=='';emit();return}
    commit();inp.value+=k;alts.push([k]);hint.hidden=true;emit();
  });
  back.addEventListener('click',()=>{setPref(true);mode(true)});
  addEventListener('resize',fit);

  /* comença amb la pissarra si el model es pot carregar */
  pad.hidden=keys.hidden=true;
  if(getPref())loading.then(()=>{if(!locked)mode(true)},()=>{back.hidden=true;mode(false)});
  else mode(false);

  return {
    get on(){return on},
    flush:commit,
    /* respostes possibles (la llegida primer, després les alternatives més probables) */
    variants(){
      commit();
      if(alts.length!==inp.value.length)return [inp.value];
      let out=[''];
      for(const a of alts){out=out.flatMap(s=>a.map(c=>s+c));if(out.length>32)out=out.slice(0,32)}
      return [inp.value,...out.filter(s=>s!==inp.value)];
    },
    lock(){locked=true;clearTimeout(idle);keys.hidden=true;back.hidden=true;pad.hidden=true;inp.classList.remove('pn-hide')}
  };
};
})();
