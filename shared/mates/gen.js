/* Ajudes per generar exercicis de matemàtiques amb números a l'atzar (per a shared/duo.js).
   Cada exercici: {k:"type"|"pick", gen:()=>({q, a, o?, eq?, num?, w?})}. */
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
/* format català: 12.345 (milers amb punt) i 3,5 (decimals amb coma) */
const fmt=(n,dec)=>{
  const neg=n<0;n=Math.abs(n);
  let [i,d]=(dec===undefined?String(+n.toFixed(4)):n.toFixed(dec)).split('.');
  i=i.replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  return (neg?'−':'')+i+(d?','+d:'');
};
/* llegeix el que escriu el nen: admet 12.345, 12345, 3,5, 3.5 i el signe menys */
const parse=(v,dec)=>{
  let s=String(v).trim().replace(/\s/g,'').replace(/[−–]/g,'-');
  if(/^-?\d+\/\d+$/.test(s)){const [a,b]=s.split('/').map(Number);return b?a/b:NaN}
  if(dec){ if(s.includes(','))s=s.replace(/\./g,'').replace(',','.'); }
  else s=s.replace(/[.,]/g,'');
  return s===''||s==='-'?NaN:Number(s);
};
const close=(a,b)=>Math.abs(a-b)<1e-6;
/* resposta numèrica */
const num=(q,val,o={})=>({q,a:[fmt(val,o.dec)],num:true,eq:v=>close(parse(v,o.dec!==undefined||!Number.isInteger(val)),val),...o.extra});
/* tria entre opcions numèriques: genera distractors propers i diferents */
const opts=(val,near,n=2,f=fmt)=>{
  const set=new Set([f(val)]),out=[];let guard=0;
  for(const x of near){const s=f(x);if(!set.has(s)&&x>=0){set.add(s);out.push(s)}if(out.length>=n)break}
  while(out.length<n&&guard++<50){const x=val+pick([-1,1])*R(1,Math.max(2,Math.round(Math.abs(val)*.2)));const s=f(x);if(!set.has(s)&&x>=0){set.add(s);out.push(s)}}
  return out;
};
const choice=(q,val,near,extra={})=>({q,a:fmt(val),o:opts(val,near),...extra});
/* fraccions */
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const lcm=(a,b)=>a/gcd(a,b)*b;
const frac=(n,d)=>{const g=gcd(n,d);return [n/g,d/g]};
const fstr=(n,d)=>d===1?String(n):n+'/'+d;
/* resposta en fracció: val qualsevol fracció equivalent (o simplificada si simple=true) */
const fracAns=(q,n,d,simple)=>{const [a,b]=frac(n,d);return {q,a:[fstr(a,b)],eq:v=>{
  const s=String(v).replace(/\s/g,'');const m=s.match(/^(-?\d+)\/(\d+)$/);
  if(!m)return /^-?\d+$/.test(s)&&b===1&&+s===a;
  const x=+m[1],y=+m[2];if(!y||x*b!==a*y)return false;return !simple||gcd(x,y)===1;}}};
window.MG={R,pick,fmt,parse,num,choice,opts,gcd,lcm,frac,fstr,fracAns};
})();
