/* Matemàtiques · 6è de primària (Mario). Exercicis generats a l'atzar: cada partida és diferent.
   Format: shared/duo.js. Ajudes: shared/mates/gen.js (window.MG). */
(function(){
const {R,pick,fmt,num,choice,gcd,lcm,fracAns}=window.MG;
const N=(k,gen,extra)=>({k,gen,...extra});
const T=(gen)=>N('type',gen);
const P=(gen)=>N('pick',gen);
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const PRIMES=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

window.MATES6=[

{id:"combinades",title:"Operacions combinades",sub:"qui va primer?",img:"brain",
 learn:[
  {img:"brain",t:"L'ordre de les operacions",p:"1r <b>parèntesis</b> · 2n <b>multiplicacions i divisions</b> · 3r <b>sumes i restes</b>.",
   ex:[["3 + 4 × 2 = 11","primer 4 × 2 = 8, després 3 + 8"],["(3 + 4) × 2 = 14","primer el parèntesi"]],
   tip:"Si són del mateix nivell, d'esquerra a dreta."}
 ],
 ex:[
  T(()=>{const a=R(2,20),b=R(2,9),c=R(2,9);return num(`${a} + ${b} × ${c} = ___`,a+b*c)}),
  T(()=>{const a=R(2,9),b=R(2,9),c=R(2,9);return num(`(${a} + ${b}) × ${c} = ___`,(a+b)*c)}),
  T(()=>{const b=R(2,9),c=R(2,9),a=b*c+R(1,30);return num(`${a} − ${b} × ${c} = ___`,a-b*c)}),
  T(()=>{const c=R(2,9),q=R(2,9),a=R(2,30);return num(`${a} + ${c*q} : ${c} = ___`,a+q)}),
  T(()=>{const a=R(2,9),b=R(2,9),c=R(2,9),d=R(2,9);return num(`${a} × ${b} + ${c} × ${d} = ___`,a*b+c*d)}),
  T(()=>{const a=R(10,30),b=R(2,9),c=R(2,6);return num(`${a} − (${b} + ${c}) × 2 = ___`,a-(b+c)*2)}),
  P(()=>{const a=R(2,9),b=R(2,9),c=R(2,9);return {...choice(`${a} + ${b} × ${c} = ___`,a+b*c,[(a+b)*c,a*b+c]),t:"Compte amb l'ordre!"}}),
  T(()=>{const n=R(3,6),p=R(2,5),e=R(10,20);return num(`Compro ${n} llibretes a ${p} € i pago amb ${e*2} €. Quant em tornen? ___ €`,e*2-n*p)})
 ]},

{id:"divisibilitat",title:"Múltiples i divisors",sub:"primers, mcm i mcd",img:"thinking",
 learn:[
  {img:"thinking",t:"Múltiples i divisors",p:"Els <b>múltiples</b> de 4 són 4, 8, 12, 16... Els <b>divisors</b> de 12 són els que el divideixen exactament: 1, 2, 3, 4, 6, 12.",
   ex:[["24 és múltiple de 6","6 × 4 = 24"],["6 és divisor de 24","24 : 6 = 4, residu 0"]],tip:"Si a és múltiple de b, llavors b és divisor de a."},
  {img:"star",t:"Criteris de divisibilitat",p:"",
   ex:[["per 2","acaba en 0, 2, 4, 6, 8"],["per 3","la suma de xifres és múltiple de 3"],["per 5","acaba en 0 o 5"],["per 10","acaba en 0"]],tip:"483: 4+8+3 = 15 → és divisible per 3."},
  {img:"crown",t:"Nombres primers",p:"Un nombre <b>primer</b> només es pot dividir per 1 i per ell mateix.",
   ex:[["2, 3, 5, 7, 11, 13, 17, 19...","primers"],["9 = 3 × 3","no és primer (compost)"]],tip:"El 2 és l'únic primer parell."},
  {img:"brain",t:"mcm i mcd",p:"<b>mcm</b>: el múltiple comú més petit. <b>mcd</b>: el divisor comú més gran.",
   ex:[["mcm(4, 6) = 12","4, 8, <b>12</b> · 6, <b>12</b>"],["mcd(12, 18) = 6","el més gran que divideix tots dos"]],tip:"mcm per saber <i>quan coincideixen</i>; mcd per <i>fer grups iguals</i>."}
 ],
 ex:[
  P(()=>{const d=R(3,9),k=R(3,12);const ws=[d*k+1,d*k+2,d*k-1].filter(x=>x%d);return {q:`Quin és múltiple de ${d}?`,a:String(d*k),o:ws.slice(0,2).map(String),t:"Tria"}}),
  P(()=>{const n=pick([12,18,20,24,30,36,40]);const ds=[];for(let i=2;i<n;i++)if(n%i===0)ds.push(i);const nd=[];for(let i=2;i<n;i++)if(n%i)nd.push(i);return {q:`Quin és divisor de ${n}?`,a:String(pick(ds)),o:[String(pick(nd)),String(n+pick(ds))],t:"Tria"}}),
  P(()=>{const p=Math.random()<.5;let n;if(p)n=pick(PRIMES.slice(4));else{do{n=R(15,99)}while(isPrime(n)||n%2===0||n%5===0)}return {q:`El ${n} és primer?`,a:p?'Sí':'No',o:[p?'No':'Sí'],t:"Pensa-hi bé"}}),
  P(()=>{const n=R(30,330)*3;return {q:`${fmt(n)} és divisible per 3?`,a:'Sí',o:['No'],t:"Suma les xifres"}}),
  T(()=>{const [a,b]=pick([[4,6],[3,4],[6,8],[4,10],[6,9],[5,6],[8,12],[3,5]]);return num(`mcm(${a}, ${b}) = ___`,lcm(a,b))}),
  T(()=>{const [a,b]=pick([[12,18],[8,12],[15,20],[16,24],[9,12],[20,30],[14,21]]);return num(`mcd(${a}, ${b}) = ___`,gcd(a,b))}),
  T(()=>{const [a,b]=pick([[4,6],[6,8],[3,5],[4,10]]);return num(`Un bus passa cada ${a} minuts i un altre cada ${b}. Si ara surten junts, d'aquí a quants minuts tornaran a coincidir? ___`,lcm(a,b))}),
  T(()=>{const n=pick([12,18,20,24,30]);let c=0;for(let i=1;i<=n;i++)if(n%i===0)c++;return num(`Quants divisors té el ${n}? ___`,c)})
 ]},

{id:"fraccions6",title:"Fraccions",sub:"equivalents i operacions",img:"pizza",
 learn:[
  {img:"pizza",t:"Fraccions equivalents",p:"Si multipliques o divideixes dalt i baix pel mateix número, la fracció val el mateix.",
   ex:[["1/2 = 2/4 = 3/6","equivalents"],["12/18 = 2/3","simplificar: dividim per 6"]],tip:"Simplificar = fer-la tan petita com es pugui (dividir pel mcd)."},
  {img:"cake",t:"Sumar i restar",p:"Amb el <b>mateix denominador</b>, sumem els de dalt. Si són diferents, primer busquem un denominador comú.",
   ex:[["2/7 + 3/7 = 5/7","mateix denominador"],["1/2 + 1/3 = 3/6 + 2/6 = 5/6","denominador comú: 6"]],tip:"El denominador comú més fàcil: el mcm dels denominadors."},
  {img:"brain",t:"Multiplicar",p:"Dalt per dalt i baix per baix.",ex:[["2/3 × 4/5 = 8/15",""],["3 × 2/7 = 6/7",""]],tip:"Per dividir: multiplica per la fracció <b>girada</b>."}
 ],
 ex:[
  {...T(()=>{const [a,b]=pick([[2,3],[3,4],[2,5],[3,5],[1,3],[5,6]]),k=R(2,6);return {...fracAns(`Simplifica: ${a*k}/${b*k} = ___`,a,b,true),t:"Escriu la fracció simplificada"}})},
  T(()=>{const d=R(5,12),a=R(1,d-2),b=R(1,d-a-1);return {...fracAns(`${a}/${d} + ${b}/${d} = ___`,a+b,d,false),t:"Escriu la fracció (per exemple 3/7)"}}),
  T(()=>{const [d1,d2]=pick([[2,3],[2,4],[3,4],[2,5],[4,6],[3,6]]);const a=R(1,d1-1),b=R(1,d2-1);return {...fracAns(`${a}/${d1} + ${b}/${d2} = ___`,a*d2+b*d1,d1*d2,false),t:"Escriu la fracció"}}),
  T(()=>{let d1,d2,a,b;do{[d1,d2]=pick([[2,4],[3,6],[2,6],[4,8],[3,4],[2,3]]);a=R(1,d1-1);b=R(1,d2-1)}while(a*d2-b*d1<=0);return {...fracAns(`${a}/${d1} − ${b}/${d2} = ___`,a*d2-b*d1,d1*d2,false),t:"Escriu la fracció"}}),
  T(()=>{const a=R(1,4),b=R(2,5),c=R(1,4),d=R(2,6);return {...fracAns(`${a}/${b} × ${c}/${d} = ___`,a*c,b*d,false),t:"Escriu la fracció"}}),
  P(()=>{const k=R(2,5);return {q:`Quina fracció és equivalent a 2/3?`,a:`${2*k}/${3*k}`,o:[`${2*k}/${3*k+1}`,`${2+k}/${3+k}`],t:"Tria"}}),
  T(()=>{const d=pick([4,5,8]),n=R(2,d-1),k=R(3,15);return num(`${n}/${d} de ${d*k} = ___`,n*k)}),
  T(()=>{const d=pick([4,5,6,8]),n=R(1,d-1),k=R(3,10);return num(`Una classe té ${d*k} alumnes. ${n}/${d} són nenes. Quantes nenes hi ha? ___`,n*k)})
 ]},

{id:"decimals6",title:"Decimals",sub:"operar amb la coma",img:"gift",
 learn:[
  {img:"gift",t:"Sumar i restar",p:"Posa les comes una sota l'altra. Si cal, afegeix zeros.",ex:[["3,25 + 1,8 = 5,05","3,25 + 1,80"]],tip:"Comes en columna, sempre."},
  {img:"rocket",t:"Per 10, 100, 1.000",p:"Multiplicar: la coma salta a la <b>dreta</b>. Dividir: salta a l'<b>esquerra</b>.",
   ex:[["2,35 × 100 = 235","2 llocs a la dreta"],["45,6 : 10 = 4,56","1 lloc a l'esquerra"]],tip:"Tants llocs com zeros."},
  {img:"brain",t:"Multiplicar decimals",p:"Multiplica sense comes i després posa tants decimals com sumin els dos números.",ex:[["1,2 × 0,3 = 0,36","12 × 3 = 36, 2 decimals"]],tip:"Compta les xifres decimals!"}
 ],
 ex:[
  T(()=>{const a=R(100,999)/100,b=R(10,99)/10;return num(`${fmt(a,2)} + ${fmt(b,1)} = ___`,+(a+b).toFixed(2),{dec:2})}),
  T(()=>{const a=R(500,999)/100,b=R(100,499)/100;return num(`${fmt(a,2)} − ${fmt(b,2)} = ___`,+(a-b).toFixed(2),{dec:2})}),
  T(()=>{const a=R(101,999)/100,m=pick([10,100,1000]);return num(`${fmt(a,2)} × ${fmt(m)} = ___`,+(a*m).toFixed(2))}),
  T(()=>{const a=R(101,999)/10,m=pick([10,100]);return num(`${fmt(a,1)} : ${m} = ___`,+(a/m).toFixed(4),{dec:3})}),
  T(()=>{const a=R(11,49)/10,b=R(2,9);return num(`${fmt(a,1)} × ${b} = ___`,+(a*b).toFixed(1),{dec:1})}),
  T(()=>{const a=R(11,29)/10,b=R(2,9)/10;return num(`${fmt(a,1)} × ${fmt(b,1)} = ___`,+(a*b).toFixed(2),{dec:2})}),
  P(()=>{const v=[];while(v.length<3){const x=R(100,999)/100;if(!v.includes(x))v.push(x)}const mx=Math.max(...v);return {q:`Quin és el número més gran?`,a:fmt(mx,2),o:v.filter(x=>x!==mx).map(x=>fmt(x,2)).slice(0,2),t:"Compara"}}),
  T(()=>{const p=R(105,495)/100,k=R(3,6);return num(`Un quilo de pomes costa ${fmt(p,2)} €. Quant costen ${k} quilos? ___ €`,+(p*k).toFixed(2),{dec:2})})
 ]},

{id:"percent",title:"Percentatges",sub:"el %",img:"trophy",
 learn:[
  {img:"trophy",t:"Què vol dir %",p:"<b>25%</b> vol dir 25 de cada 100.",ex:[["50% = la meitat","1/2"],["25% = la quarta part","1/4"],["10% = la desena part","1/10"]],tip:"El 100% és el tot."},
  {img:"gift",t:"Calcular un percentatge",p:"Multiplica pel percentatge i divideix per 100.",ex:[["20% de 80","80 × 20 : 100 = 16"],["10% de 350 = 35","treu un zero"]],tip:"Descompte del 20%: pagues el 80%."}
 ],
 ex:[
  T(()=>{const n=R(2,40)*10;return num(`10% de ${n} = ___`,n/10)}),
  T(()=>{const n=R(2,50)*2;return num(`50% de ${n} = ___`,n/2)}),
  T(()=>{const n=R(2,30)*4;return num(`25% de ${n} = ___`,n/4)}),
  T(()=>{const p=pick([20,30,40,75]),n=R(2,20)*20;return num(`${p}% de ${n} = ___`,p*n/100)}),
  T(()=>{const n=R(2,10)*10,p=pick([10,20,50]);return num(`Unes vambes costen ${n} €. Fan un descompte del ${p}%. Quant pagues? ___ €`,n-n*p/100)}),
  P(()=>({q:`El 25% és el mateix que...`,a:'1/4',o:['1/25','2/5'],t:"Tria"})),
  T(()=>{const t=pick([20,25,50]),k=R(1,t-1);return num(`A una classe de ${t} alumnes, ${k} han aprovat l'examen. Quin percentatge ha aprovat? ___ %`,k/t*100,{dec:t===50||t===25||t===20?undefined:1})}),
 ]},

{id:"potencies",title:"Potències i arrels",sub:"² ³ i √",img:"rocket",
 learn:[
  {img:"rocket",t:"Potències",p:"Una potència és una multiplicació del mateix número repetit.",ex:[["2⁵ = 2 × 2 × 2 × 2 × 2 = 32","base 2, exponent 5"],["10³ = 1.000","tants zeros com l'exponent"]],tip:"<b>al quadrat</b> = ² · <b>al cub</b> = ³"},
  {img:"brain",t:"Arrel quadrada",p:"√49 = 7 perquè 7² = 49.",ex:[["√81 = 9",""],["√100 = 10",""]],tip:"És la potència al revés."}
 ],
 ex:[
  T(()=>{const b=R(2,12);return num(`${b}² = ___`,b*b)}),
  T(()=>{const b=R(2,5);return num(`${b}³ = ___`,b**3)}),
  T(()=>{const e=R(2,6);return num(`10${'⁰¹²³⁴⁵⁶'[e]} = ___`,10**e)}),
  T(()=>{const e=R(3,6);return num(`2${'⁰¹²³⁴⁵⁶'[e]} = ___`,2**e)}),
  T(()=>{const r=R(2,12);return num(`√${r*r} = ___`,r)}),
  T(()=>{const a=R(2,5),b=R(2,5);return num(`${a}² + ${b}² = ___`,a*a+b*b)}),
  P(()=>{const b=R(3,9);return {...choice(`${b}² = ___`,b*b,[b*2,b*b+b]),t:"Compte: no és ×2!"}}),
  T(()=>{const c=R(3,12);return num(`Un quadrat fa ${c} cm de costat. Quina és l'àrea? ___ cm²`,c*c)})
 ]},

{id:"proporcio",title:"Proporcionalitat",sub:"regla de tres",img:"cook",
 learn:[
  {img:"cook",t:"Més és més",p:"Si 3 kg costen 6 €, 1 kg costa 2 € i 5 kg costen 10 €.",ex:[["3 kg → 6 €","divideix: 1 kg → 2 €"],["5 kg → ?","multiplica: 5 × 2 = 10 €"]],tip:"Passa primer per <b>1</b> i després multiplica."},
  {img:"house",t:"Escales",p:"Un mapa a escala 1:1.000 vol dir que 1 cm del mapa són 1.000 cm reals (10 m).",ex:[["1:100","1 cm = 1 m"],["1:100.000","1 cm = 1 km"]],tip:"El número gran és la realitat."}
 ],
 ex:[
  T(()=>{const u=R(2,6),a=R(2,5),b=R(6,12);return num(`${a} entrades costen ${a*u} €. Quant costen ${b} entrades? ___ €`,b*u)}),
  T(()=>{const u=R(2,5)*50,a=R(2,4),b=R(5,8);return num(`Per fer ${a} pastissos calen ${a*u} g de farina. Quanta farina cal per a ${b} pastissos? ___ g`,b*u)}),
  T(()=>{const v=R(40,90),h=R(2,5);return num(`Un cotxe va a ${v} km/h. Quants km fa en ${h} hores? ___`,v*h)}),
  T(()=>{const c=R(2,9);return num(`En un mapa 1:100.000, ${c} cm són ___ km`,c)}),
  T(()=>{const c=R(2,9);return num(`En un plànol 1:100, ${c} cm són ___ m`,c)}),
  P(()=>({q:`Si 4 bolis costen 2 €, 1 boli costa...`,a:'0,50 €',o:['2 €','0,25 €'],t:"Tria"})),
  T(()=>{const p=R(2,6),k=R(3,8);return num(`Un paquet de ${k} iogurts costa ${fmt(p*k/2,1)} €. Quant costa cada iogurt? ___ €`,p/2,{dec:2})})
 ]},

{id:"negatius",title:"Nombres negatius",sub:"sota zero",img:"snowman",
 learn:[
  {img:"snowman",t:"Sota zero",p:"Els nombres negatius són menors que zero: −1, −2, −3...",ex:[["−5 °C","5 graus sota zero"],["−2 < 1","qualsevol negatiu és més petit que un positiu"]],tip:"Pensa en un termòmetre."},
  {img:"thinking",t:"Sumar i restar",p:"Mou-te per la recta: sumar és anar a la dreta, restar a l'esquerra.",ex:[["−3 + 5 = 2","puja 5 des de −3"],["2 − 6 = −4","baixa 6 des de 2"]],tip:"−7 és <b>més petit</b> que −2."}
 ],
 ex:[
  T(()=>{const a=-R(1,9),b=R(1,15);return num(`${fmt(a)} + ${b} = ___`,a+b)}),
  T(()=>{const a=R(1,8),b=R(a+1,15);return num(`${a} − ${b} = ___`,a-b)}),
  T(()=>{const t=-R(1,8),u=R(3,12);return num(`Al matí fa ${fmt(t)} °C i a la tarda la temperatura puja ${u} graus. Quina temperatura fa? ___ °C`,t+u)}),
  T(()=>{const t=R(1,5),d=R(t+2,12);return num(`Fa ${t} °C i baixa ${d} graus. Quina temperatura fa? ___ °C`,t-d)}),
  P(()=>{const a=-R(1,9);let b=-R(1,9);while(b===a)b=-R(1,9);return {q:`${fmt(a)} ___ ${fmt(b)}`,a:a>b?'>':'<',o:[a>b?'<':'>','='],t:"Tria el signe"}}),
  P(()=>{const v=[-R(1,9),-R(10,20),R(1,9)];return {q:`Quin és el més petit?`,a:fmt(v[1]),o:[fmt(v[0]),fmt(v[2])],t:"Compara"}}),
  T(()=>{const s=-R(1,3),b=R(2,5);return num(`Un ascensor és a la planta ${fmt(s)} i puja ${b} plantes. A quina planta és? ___`,s+b)})
 ]},

{id:"geometria",title:"Àrees i perímetres",sub:"rectangle, triangle, cercle",img:"house",
 learn:[
  {img:"house",t:"Àrees",p:"",ex:[["rectangle = base × altura",""],["quadrat = costat × costat",""],["triangle = base × altura : 2","la meitat d'un rectangle"]],tip:"L'àrea es mesura en <b>cm²</b> o <b>m²</b>."},
  {img:"ball",t:"El cercle",p:"π (pi) val aproximadament <b>3,14</b>.",ex:[["longitud = 2 × π × r","la vora"],["àrea = π × r²",""]],tip:"r = radi (del centre a la vora). El diàmetre és el doble."}
 ],
 ex:[
  T(()=>{const b=R(3,15),h=R(2,10);return num(`Àrea d'un rectangle de ${b} cm × ${h} cm = ___ cm²`,b*h)}),
  T(()=>{const b=R(2,10)*2,h=R(3,12);return num(`Àrea d'un triangle de base ${b} cm i altura ${h} cm = ___ cm²`,b*h/2)}),
  T(()=>{const b=R(3,15),h=R(2,10);return num(`Perímetre d'un rectangle de ${b} cm × ${h} cm = ___ cm`,2*(b+h))}),
  T(()=>{const c=R(3,15);return num(`Perímetre d'un quadrat de ${c} cm de costat = ___ cm`,4*c)}),
  T(()=>{const r=R(1,10);return num(`Longitud d'una circumferència de radi ${r} cm (π = 3,14) = ___ cm`,+(2*3.14*r).toFixed(2),{dec:2})}),
  T(()=>{const r=R(1,10);return num(`Àrea d'un cercle de radi ${r} cm (π = 3,14) = ___ cm²`,+(3.14*r*r).toFixed(2),{dec:2})}),
  T(()=>{const d=R(2,10)*2;return num(`Un cercle fa ${d} cm de diàmetre. Quin és el radi? ___ cm`,d/2)}),
  P(()=>({q:`Quants graus sumen els angles d'un triangle?`,a:'180°',o:['360°','90°'],t:"Tria"}))
 ]}
];
})();
