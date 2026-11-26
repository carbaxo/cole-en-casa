/* Matemàtiques · 4t de primària (Oliver). Exercicis generats a l'atzar: cada partida és diferent.
   Format: shared/duo.js. Ajudes: shared/mates/gen.js (window.MG). */
(function(){
const {R,pick,fmt,num,choice,fracAns}=window.MG;
const N=(k,gen,extra)=>({k,gen,...extra});
const T=(gen)=>N('type',gen);
const P=(gen)=>N('pick',gen);
/* nom dels nombres en català (fins a 999.999) */
const U=['zero','un','dos','tres','quatre','cinc','sis','set','vuit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
const D={2:'vint',3:'trenta',4:'quaranta',5:'cinquanta',6:'seixanta',7:'setanta',8:'vuitanta',9:'noranta'};
const w100=n=>n<20?U[n]:D[Math.floor(n/10)]+(n%10?(Math.floor(n/10)===2?'-i-':'-')+U[n%10]:'');
const w1000=n=>{const c=Math.floor(n/100),r=n%100;const cc=c===0?'':c===1?'cent':U[c]+'-cents';return [cc,r?w100(r):''].filter(Boolean).join(' ')||'zero'};
const words=n=>{const m=Math.floor(n/1000),r=n%1000;const mm=m===0?'':m===1?'mil':w1000(m)+' mil';return [mm,r?w1000(r):''].filter(Boolean).join(' ')};
const PLACE=[['unitats',1],['desenes',10],['centenes',100],['unitats de miler',1000],['desenes de miler',10000],['centenes de miler',100000]];

window.MATES4=[

{id:"nombres",title:"Nombres grans",sub:"fins a 999.999",img:"rocket",
 learn:[
  {img:"rocket",t:"El valor de cada xifra",p:"Cada xifra val diferent segons <b>on</b> és.",
   ex:[["345.278","3 centenes de miler, 4 desenes de miler, 5 unitats de miler..."],["CM · DM · UM · C · D · U","de més gran a més petit"]],
   tip:"Llegim de tres en tres: <b>345 mil 278</b>."},
  {img:"thinking",t:"Comparar",p:"Mira primer quantes xifres tenen. Si en tenen les mateixes, compara d'esquerra a dreta.",
   ex:[["45.301 > 45.103","3 centenes és més que 1"],["9.999 < 10.000","4 xifres és menys que 5"]],
   tip:"La boca del cocodril <b>&gt;</b> s'obre cap al més gran."},
  {img:"star",t:"Arrodonir",p:"Per arrodonir a les centenes, mira la xifra de les desenes: si és 5 o més, puja.",
   ex:[["3.462 → 3.500","6 desenes: puja"],["3.429 → 3.400","2 desenes: es queda"]],
   tip:"Arrodonir serveix per calcular <b>més o menys</b> ràpid."}
 ],
 ex:[
  T(()=>{const n=R(10000,999999),[name,v]=pick(PLACE.slice(1));const d=Math.floor(n/v)%10;return num(`Al número <b>${fmt(n)}</b>, quina xifra hi ha a les ${name}? ___`,d)}),
  T(()=>{const n=R(10000,999999),[name,v]=pick(PLACE.slice(2));return num(`Al número <b>${fmt(n)}</b>, quant val la xifra de les ${name}? ___`,(Math.floor(n/v)%10)*v)}),
  P(()=>{const n=R(1000,99999);return {...choice(`<i>${words(n)}</i> = ___`,n,[n+R(1,9)*10,Math.floor(n/10)+R(0,9)*10000].filter(x=>x<100000)),t:"Tria el número"}}),
  P(()=>{const n=R(1000,99999);const m=n+pick([-1,1])*pick([1,10,100,1000]);return {q:`${fmt(n)} ___ ${fmt(m)}`,a:n>m?'>':'<',o:[n>m?'<':'>','='],t:"Tria el signe"}}),
  T(()=>{const n=R(1000,99999);return num(`Arrodoneix <b>${fmt(n)}</b> a les centenes: ___`,Math.round(n/100)*100)}),
  T(()=>{const n=R(1000,99999);return num(`Arrodoneix <b>${fmt(n)}</b> als milers: ___`,Math.round(n/1000)*1000)}),
  T(()=>{const a=R(1,9),b=R(0,9),c=R(0,9),d=R(1,9);return num(`${a} DM + ${b} UM + ${c} C + ${d} U = ___`,a*10000+b*1000+c*100+d)}),
  T(()=>{const n=R(100,9998);return num(`Quin número va just després de ${fmt(n*10+9)}? ___`,n*10+10)})
 ]},

{id:"sumres",title:"Sumes i restes",sub:"amb nombres grans",img:"biceps",
 learn:[
  {img:"biceps",t:"En columna",p:"Posa les unitats sota les unitats, les desenes sota les desenes... i comença per la <b>dreta</b>.",
   ex:[["4.568 + 2.775","8+5 = 13: escric 3 i me'n porto 1"]],tip:"El que te'n portes s'afegeix a la columna següent."},
  {img:"thinking",t:"La resta i la prova",p:"Per comprovar una resta, suma el resultat amb el que has tret.",
   ex:[["5.000 − 1.236 = 3.764","3.764 + 1.236 = 5.000 ✔"]],tip:"Si et dóna el primer número, està bé!"}
 ],
 ex:[
  T(()=>{const a=R(1000,9999),b=R(1000,9999);return num(`${fmt(a)} + ${fmt(b)} = ___`,a+b)}),
  T(()=>{const a=R(10000,59999),b=R(1000,39999);return num(`${fmt(a)} + ${fmt(b)} = ___`,a+b)}),
  T(()=>{const a=R(5000,9999),b=R(1000,a-1);return num(`${fmt(a)} − ${fmt(b)} = ___`,a-b)}),
  T(()=>{const a=R(2,9)*1000,b=R(100,a-1);return num(`${fmt(a)} − ${fmt(b)} = ___`,a-b)}),
  T(()=>{const a=R(20000,99999),b=R(10000,a-1);return num(`${fmt(a)} − ${fmt(b)} = ___`,a-b)}),
  P(()=>{const a=R(100,900)*10,b=R(100,900)*10;return {...choice(`${fmt(a)} + ${fmt(b)} = ___`,a+b,[a+b+100,a+b-1000]),t:"Calcula de cap"}}),
  T(()=>{const a=R(1200,4800),b=R(300,900);return num(`Una biblioteca té ${fmt(a)} llibres. En compra ${b} més. Quants en té ara? ___`,a+b)}),
  T(()=>{const a=R(2000,9000),b=R(300,1900);return num(`Un viatge fa ${fmt(a)} km. Ja n'hem fet ${fmt(b)}. Quants en falten? ___`,a-b)})
 ]},

{id:"taules",title:"Les taules",sub:"multiplicar ràpid",img:"fire",
 learn:[
  {img:"fire",t:"Trucs per a les taules",p:"Si saps una multiplicació, també saps la del revés.",
   ex:[["6 × 8 = 48","8 × 6 = 48"],["× 9","10 vegades menys una: 9 × 7 = 70 − 7"],["× 5","la meitat de × 10: 5 × 8 = 80 : 2"]],
   tip:"Les més difícils: 6×7, 7×8, 6×8. Repeteix-les!"}
 ],
 ex:[
  N('match',()=>{const ps=[];const used=new Set();while(ps.length<5){const a=R(3,9),b=R(3,9);if(used.has(a*b))continue;used.add(a*b);ps.push([`${a} × ${b}`,String(a*b)])}return {p:ps}}),
  ...Array.from({length:8},()=>T(()=>{const a=R(2,10),b=R(2,10);return num(`${a} × ${b} = ___`,a*b)})),
  P(()=>{const a=R(6,9),b=R(6,9);return {...choice(`${a} × ${b} = ___`,a*b,[a*b+a,a*b-b]),t:"Tria el resultat"}}),
  T(()=>{const a=R(3,9),b=R(3,9);return num(`${a} × ___ = ${a*b}`,b)}),
  T(()=>{const a=R(3,9),b=R(3,9);return num(`${a*b} : ${a} = ___`,b)})
 ]},

{id:"multi",title:"Multiplicar",sub:"per 1 i 2 xifres",img:"brain",
 learn:[
  {img:"brain",t:"Per 10, 100 i 1.000",p:"Afegim tants zeros com tingui el 10, el 100 o el 1.000.",
   ex:[["34 × 10 = 340","un zero"],["34 × 100 = 3.400","dos zeros"],["34 × 1.000 = 34.000","tres zeros"]],tip:"Fàcil i molt ràpid!"},
  {img:"thinking",t:"Per dues xifres",p:"Multiplica primer per les unitats, després per les desenes (deixant un lloc buit), i suma.",
   ex:[["23 × 14","23 × 4 = 92 · 23 × 10 = 230"],["92 + 230 = 322","resultat"]],tip:"El lloc buit és perquè multipliques per <b>desenes</b>."}
 ],
 ex:[
  T(()=>{const a=R(12,99),m=pick([10,100,1000]);return num(`${a} × ${fmt(m)} = ___`,a*m)}),
  T(()=>{const a=R(102,999),b=R(2,9);return num(`${a} × ${b} = ___`,a*b)}),
  T(()=>{const a=R(1001,4999),b=R(2,9);return num(`${fmt(a)} × ${b} = ___`,a*b)}),
  T(()=>{const a=R(12,99),b=R(11,39);return num(`${a} × ${b} = ___`,a*b)}),
  T(()=>{const a=R(102,499),b=R(11,29);return num(`${a} × ${b} = ___`,a*b)}),
  P(()=>{const a=R(20,90),m=pick([10,100]);return {...choice(`${a} × ${m} = ___`,a*m,[a*m*10,a*m/10]),t:"Tria el resultat"}}),
  T(()=>{const p=R(3,9),c=R(12,48);return num(`Una entrada del cine costa ${p} €. Quant costen ${c} entrades? ___ €`,p*c)}),
  T(()=>{const f=R(12,35),c=R(12,25);return num(`Un teatre té ${f} files de ${c} cadires. Quantes cadires hi ha? ___`,f*c)})
 ]},

{id:"divi",title:"Dividir",sub:"per una xifra",img:"pizza",
 learn:[
  {img:"pizza",t:"Repartir a parts iguals",p:"Dividir és repartir. El que sobra és el <b>residu</b>.",
   ex:[["17 : 5 = 3 i sobren 2","3 a cadascú, i en sobren 2"],["dividend : divisor = quocient","i el residu"]],tip:"El residu sempre ha de ser <b>més petit</b> que el divisor."},
  {img:"thinking",t:"La prova",p:"quocient × divisor + residu = dividend",
   ex:[["3 × 5 + 2 = 17","✔ està bé"]],tip:"Fes la prova sempre que puguis."}
 ],
 ex:[
  T(()=>{const d=R(2,9),q=R(11,99);return num(`${fmt(d*q)} : ${d} = ___`,q)}),
  T(()=>{const d=R(2,9),q=R(101,999);return num(`${fmt(d*q)} : ${d} = ___`,q)}),
  T(()=>{const d=R(3,9),q=R(5,30),r=R(1,d-1);return num(`${d*q+r} : ${d} → quocient ___`,q)}),
  T(()=>{const d=R(3,9),q=R(5,30),r=R(1,d-1);return num(`${d*q+r} : ${d} → residu ___`,r)}),
  T(()=>{const d=R(2,9),q=R(4,25);return num(`Reparteixo ${d*q} cromos entre ${d} amics. Quants en toca a cadascú? ___`,q)}),
  T(()=>{const d=R(3,8),q=R(4,12),r=R(1,d-1);return num(`Tinc ${d*q+r} caramels i faig bosses de ${d}. Quants caramels em sobren? ___`,r)}),
  P(()=>{const d=R(3,9),q=R(5,20),r=R(1,d-1);return {q:`${d*q+r} : ${d} = ${q}, residu ${r}. Està bé?`,a:'Sí',o:['No, el residu és massa gran','No, el quocient està malament'],t:"Fes la prova"}}),
  T(()=>{const n=R(2,9)*100;return num(`${n} : 10 = ___`,n/10)})
 ]},

{id:"fraccions",title:"Fraccions",sub:"meitats, terços, quarts...",img:"pizza",
 learn:[
  {img:"pizza",t:"Què és una fracció",p:"Una fracció diu en quantes parts iguals partim una cosa (<b>denominador</b>) i quantes en agafem (<b>numerador</b>).",
   ex:[["3/4","tres quarts: 4 parts, n'agafo 3"],["1/2","una meitat"]],tip:"El número de <b>baix</b> diu en quantes parts. El de <b>dalt</b>, quantes n'agafo."},
  {img:"cake",t:"Fracció d'un número",p:"Per calcular 3/4 de 20: divideix per 4 i multiplica per 3.",
   ex:[["1/4 de 20 = 5","20 : 4"],["3/4 de 20 = 15","5 × 3"]],tip:"Primer <b>divideix</b> pel de baix, després <b>multiplica</b> pel de dalt."}
 ],
 ex:[
  N('match',()=>({p:[["1/2","una meitat"],["1/3","un terç"],["1/4","un quart"],["3/4","tres quarts"],["2/5","dos cinquens"]]})),
  T(()=>{const d=R(3,10),n=R(1,d-1);return {...fracAns(`Una pizza té ${d} trossos. Me'n menjo ${n}. Quina fracció me n'he menjat? ___`,n,d,false),t:"Escriu la fracció (per exemple 2/5)"}}),
  T(()=>{const d=pick([2,3,4,5,10]),k=R(2,12);return num(`1/${d} de ${d*k} = ___`,k)}),
  T(()=>{const d=pick([3,4,5,6,8]),n=R(2,d-1),k=R(2,10);return num(`${n}/${d} de ${d*k} = ___`,n*k)}),
  P(()=>{const d=R(4,12),a=R(1,d-1);let b=R(1,d-1);while(b===a)b=R(1,d-1);return {q:`${a}/${d} ___ ${b}/${d}`,a:a>b?'>':'<',o:[a>b?'<':'>','='],t:"Tria el signe"}}),
  P(()=>{const d=pick([2,3,4]);return {q:`Quina fracció és més gran?`,a:`1/${d}`,o:[`1/${d*2}`,`1/${d*3}`],t:"Pensa en una pizza"}}),
  T(()=>{const k=R(3,9);return num(`La meitat de ${k*2} nens van en bici. Quants nens van en bici? ___`,k)})
 ]},

{id:"decimals",title:"Decimals i diners",sub:"dècimes i cèntims",img:"gift",
 learn:[
  {img:"gift",t:"La coma",p:"La coma separa la part entera de la part decimal.",
   ex:[["2,5","2 unitats i 5 dècimes"],["0,1","una dècima: 1/10"],["0,01","una centèsima: 1/100"]],tip:"10 dècimes = 1 unitat."},
  {img:"star",t:"Euros i cèntims",p:"1 euro = 100 cèntims.",
   ex:[["3,50 €","3 euros i 50 cèntims"],["0,75 €","75 cèntims"]],tip:"Amb diners sempre hi ha <b>dues</b> xifres darrere la coma."}
 ],
 ex:[
  T(()=>{const a=R(1,9),b=R(1,9);return num(`${a} unitats i ${b} dècimes = ___`,a+b/10,{dec:1})}),
  T(()=>{const n=R(11,99)/10;return num(`Quantes dècimes té ${fmt(n,1)}? ___`,Math.round(n*10))}),
  T(()=>{const e=R(1,9),c=pick([10,20,25,50,75,90]);return num(`${e} € i ${c} cèntims = ___ €`,e+c/100,{dec:2})}),
  T(()=>{const c=pick([150,250,320,475,600]);return num(`${c} cèntims = ___ €`,c/100,{dec:2})}),
  P(()=>{const a=R(11,49)/10,b=+(a+pick([-1,1])*R(1,9)/10).toFixed(1);return {q:`${fmt(a,1)} ___ ${fmt(b,1)}`,a:a>b?'>':'<',o:[a>b?'<':'>','='],t:"Tria el signe"}}),
  T(()=>{const a=R(1,9)+R(1,9)/10,b=R(1,9)+R(1,9)/10;return num(`${fmt(a,1)} + ${fmt(b,1)} = ___`,+(a+b).toFixed(1),{dec:1})}),
  T(()=>{const p=pick([1.5,2.5,0.75,1.25,3.5]);return num(`Un suc costa ${fmt(p,2)} €. Quant costen 2 sucs? ___ €`,p*2,{dec:2})}),
  T(()=>{const p=pick([2.5,3.75,1.2,4.5]);return num(`Pago amb un bitllet de 10 €. Costa ${fmt(p,2)} €. Quant em tornen? ___ €`,10-p,{dec:2})})
 ]},

{id:"mesures",title:"Mesures i temps",sub:"metres, litres, hores",img:"clock",
 learn:[
  {img:"run",t:"Longitud",p:"",ex:[["1 km = 1.000 m","quilòmetre"],["1 m = 100 cm","metre"],["1 cm = 10 mm","centímetre"]],tip:"Per passar a una unitat <b>més petita</b>, multiplica."},
  {img:"cake",t:"Pes i capacitat",p:"",ex:[["1 kg = 1.000 g","quilogram"],["1 L = 1.000 mL","litre"],["mig litre = 500 mL",""]],tip:"El quilo i el litre tenen 1.000 parts."},
  {img:"clock",t:"El temps",p:"",ex:[["1 h = 60 min","hora"],["1 min = 60 s","minut"],["1 dia = 24 h",""]],tip:"Mitja hora = 30 minuts · un quart d'hora = 15 minuts."}
 ],
 ex:[
  T(()=>{const k=R(2,9);return num(`${k} m = ___ cm`,k*100)}),
  T(()=>{const k=R(2,9);return num(`${k} km = ___ m`,k*1000)}),
  T(()=>{const k=R(2,9)*100;return num(`${k} cm = ___ m`,k/100)}),
  T(()=>{const k=R(2,5);return num(`${k} kg = ___ g`,k*1000)}),
  T(()=>{const k=R(2,5);return num(`${k} h = ___ min`,k*60)}),
  T(()=>{const k=R(1,3);return num(`${k} h i mitja = ___ min`,k*60+30)}),
  P(()=>({q:`Quina és la mesura més llarga?`,a:'2 km',o:['1.500 m','900 m'],t:"Compara"})),
  T(()=>{const s=R(8,10),m=pick([0,15,30,45]),d=pick([30,45,60,90]);const e=s*60+m+d;return {...num(`La classe comença a les ${s}:${String(m).padStart(2,'0')} i dura ${d} minuts. A quina hora acaba? ___`,0),a:[Math.floor(e/60)+':'+String(e%60).padStart(2,'0')],num:false,eq:v=>{const x=String(v).trim().replace(/[.h]/,':').match(/^(\d{1,2}):(\d{2})$/);return !!x&&+x[1]*60+ +x[2]===e},t:"Escriu l'hora (per exemple 9:45)"}}),
  T(()=>{const l=R(3,12),a=R(2,8);return num(`Un rectangle fa ${l} cm de llarg i ${a} cm d'ample. Quin és el perímetre? ___ cm`,2*(l+a))})
 ]}
];
})();
