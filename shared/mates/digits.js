/* Reconeixedor de números escrits a mà (per al joc d'agilitat).
   - Agrupa els traços en xifres segons la posició horitzontal.
   - Cada xifra es dibuixa en 28×28 com les imatges de MNIST (traç gruixut, centrat pel centre de masses).
   - Una xarxa petita (shared/mates/digits.json, entrenada amb tools/digits-train.py) diu quina xifra és.
   window.Digits = {load(url), read(strokes) → [{best, probs}], candidates(result, max)} */
(function(){
let M=null;
const b64=s=>{const b=atob(s),a=new Int8Array(b.length);for(let i=0;i<b.length;i++)a[i]=(b.charCodeAt(i)<<24)>>24;return a};
async function load(url){
  if(M)return M;
  const j=await (await fetch(url)).json();
  const deq=q=>{const a=b64(q.d),f=new Float32Array(a.length);for(let i=0;i<a.length;i++)f[i]=a[i]*q.s;return f};
  M={h:j.h,w1:deq(j.w1),b1:Float32Array.from(j.b1),w2:deq(j.w2),b2:Float32Array.from(j.b2)};
  return M;
}
function predict(x){
  const H=M.h,h=new Float32Array(H);
  for(let j=0;j<H;j++)h[j]=M.b1[j];
  for(let i=0;i<784;i++){const v=x[i];if(!v)continue;const o=i*H;for(let j=0;j<H;j++)h[j]+=v*M.w1[o+j]}
  const z=new Float32Array(10);
  for(let k=0;k<10;k++)z[k]=M.b2[k];
  for(let j=0;j<H;j++){const v=h[j]>0?h[j]:0;if(!v)continue;const o=j*10;for(let k=0;k<10;k++)z[k]+=v*M.w2[o+k]}
  const mx=Math.max(...z);let s=0;const p=Array.from(z,v=>{const e=Math.exp(v-mx);s+=e;return e});
  return p.map(v=>v/s);
}
const bbox=pts=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const [x,y] of pts){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}return {x0,y0,x1,y1}};
/* agrupa traços que se solapen en horitzontal (el 4, el 5 o el 7 es poden fer amb dos traços) */
function groups(strokes){
  const items=strokes.filter(s=>s.length).map(s=>({s:[s],b:bbox(s)})).sort((a,b)=>a.b.x0-b.b.x0);
  const out=[];
  for(const it of items){
    const g=out[out.length-1];
    if(g){
      const ov=Math.min(g.b.x1,it.b.x1)-Math.max(g.b.x0,it.b.x0);
      const wmin=Math.max(8,Math.min(g.b.x1-g.b.x0,it.b.x1-it.b.x0));
      const mid=(it.b.x0+it.b.x1)/2,inside=mid>g.b.x0-4&&mid<g.b.x1+4;
      if(inside||ov>wmin*.35||ov>18){g.s.push(...it.s);g.b={x0:Math.min(g.b.x0,it.b.x0),y0:Math.min(g.b.y0,it.b.y0),x1:Math.max(g.b.x1,it.b.x1),y1:Math.max(g.b.y1,it.b.y1)};continue}
    }
    out.push(it);
  }
  return out;
}
const cv=document.createElement('canvas');cv.width=cv.height=112;const cx=cv.getContext('2d',{willReadFrequently:true});
const sm=document.createElement('canvas');sm.width=sm.height=28;const sx=sm.getContext('2d',{willReadFrequently:true});
function raster(g,ox,oy){
  const {x0,y0,x1,y1}=g.b,w=Math.max(x1-x0,1),h=Math.max(y1-y0,1);
  const sc=80/Math.max(w,h);                        /* la xifra ocupa 20×20 de 28 (×4 = 80 de 112) */
  cx.clearRect(0,0,112,112);cx.strokeStyle='#fff';cx.lineCap=cx.lineJoin='round';cx.lineWidth=10;
  const offx=56-w*sc/2+ox*4,offy=56-h*sc/2+oy*4;
  for(const s of g.s){cx.beginPath();s.forEach(([x,y],i)=>{const X=(x-x0)*sc+offx,Y=(y-y0)*sc+offy;i?cx.lineTo(X,Y):cx.moveTo(X,Y)});if(s.length===1){const [x,y]=s[0];cx.lineTo((x-x0)*sc+offx+.1,(y-y0)*sc+offy)}cx.stroke()}
  sx.clearRect(0,0,28,28);sx.imageSmoothingEnabled=true;sx.imageSmoothingQuality='high';sx.drawImage(cv,0,0,28,28);
  const d=sx.getImageData(0,0,28,28).data,x=new Float32Array(784);
  for(let i=0;i<784;i++)x[i]=d[i*4+3]/255;
  return x;
}
function toInput(g){
  let x=raster(g,0,0);
  /* centre de masses al mig, com MNIST */
  let s=0,mx=0,my=0;for(let i=0;i<784;i++){const v=x[i];s+=v;mx+=v*(i%28);my+=v*Math.floor(i/28)}
  if(s>0){const dx=13.5-mx/s,dy=13.5-my/s;if(Math.abs(dx)>.5||Math.abs(dy)>.5)x=raster(g,dx,dy)}
  return x;
}
function read(strokes){
  if(!M)return [];
  return groups(strokes).map(g=>{const p=predict(toInput(g));let best=0;for(let k=1;k<10;k++)if(p[k]>p[best])best=k;return {best,probs:p}});
}
/* combinacions plausibles (per acceptar l'opció correcta si la xarxa dubta entre dues xifres) */
function candidates(res,min=.12){
  let out=[{s:'',p:1}];
  for(const r of res){
    const opts=r.probs.map((p,k)=>({k,p})).filter(o=>o.p>=min||o.k===r.best).sort((a,b)=>b.p-a.p).slice(0,2);
    out=out.flatMap(c=>opts.map(o=>({s:c.s+o.k,p:c.p*o.p})));
  }
  return out.sort((a,b)=>b.p-a.p);
}
window.Digits={load,read,candidates};
})();
