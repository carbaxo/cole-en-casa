/* Candau senzill per entrar a l'espai de cada nen.
   Ús: <script src="RUTA/gate.js" data-kid="mario"></script> dins del <head>.
   No és seguretat de debò (la web és pública): només evita entrar a l'espai de l'altre. */
(function(){
  var KIDS={
    mario:{name:'Mario',hash:'59195c6c541c8307f1da2d1e768d6f2280c984df217ad5f4c64c3542b04111a4'},
    oliver:{name:'Oliver',hash:'7dfef7aed2105b7eceb4d34e1ad84fdad4693bd5de041e1b47079efeb6001a83'}
  };
  var me=document.currentScript, kid=me&&me.getAttribute('data-kid'), K=KIDS[kid];
  if(!K)return;
  var KEY='cec-unlock-'+kid;
  function isOpen(){try{return localStorage.getItem(KEY)==='1'}catch(e){return false}}
  window.cecLock=function(){try{localStorage.removeItem(KEY)}catch(e){};location.reload()};
  if(isOpen())return;

  var root=document.documentElement;root.classList.add('cec-locked');
  var st=document.createElement('style');
  st.textContent='.cec-locked body>*:not(#cec-gate){display:none!important}'+
  '#cec-gate{min-height:100vh;display:grid;place-items:center;padding:24px max(16px,env(safe-area-inset-left,0px));box-sizing:border-box;background:var(--bg,#eef3ff);color:var(--ink,#1c2547);font-family:"Atkinson Hyperlegible","Segoe UI",system-ui,sans-serif}'+
  '#cec-gate form{width:100%;max-width:380px;background:var(--paper,#fff);border:3px solid var(--line,#d8e0f5);border-radius:22px;padding:24px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box}'+
  '#cec-gate .lock{width:56px;height:56px;border-radius:50%;background:var(--accent,#2f62ec);display:grid;place-items:center}'+
  '#cec-gate h1{font-family:"Fredoka","Trebuchet MS",system-ui,sans-serif;font-size:2rem;margin:0;line-height:1.1}'+
  '#cec-gate p{margin:0;color:var(--muted,#58628a)}'+
  '#cec-gate label{font-weight:700}'+
  '#cec-gate input{font:inherit;font-size:1.3rem;padding:12px 14px;border:3px solid var(--line,#d8e0f5);border-radius:14px;background:var(--bg,#eef3ff);color:var(--ink,#1c2547);width:100%;box-sizing:border-box}'+
  '#cec-gate input:focus{outline:3px solid var(--accent,#2f62ec);outline-offset:2px}'+
  '#cec-gate button{font-family:"Fredoka","Trebuchet MS",system-ui,sans-serif;font-weight:600;font-size:1.2rem;background:var(--accent,#2f62ec);color:#fff;border:0;border-radius:14px;padding:12px 20px;cursor:pointer}'+
  '#cec-gate .err{color:var(--bad,#c8372d);font-weight:700;min-height:1.5em}'+
  '#cec-gate a{color:var(--accent,#2f62ec);font-weight:700;text-decoration:none}';
  document.head.appendChild(st);

  async function sha(t){var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
  function home(){var s=me.getAttribute('src')||'';return s.replace(/gate\.js.*$/,'')||'./'}

  function build(){
    var g=document.createElement('div');g.id='cec-gate';
    g.innerHTML='<form autocomplete="off"><div class="lock" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></div>'+
      '<h1>Hola, '+K.name+'!</h1><p>Escriu la teva contrasenya per entrar.</p>'+
      '<label for="cec-pw">Contrasenya</label><input id="cec-pw" type="password" autocapitalize="none" autocorrect="off" spellcheck="false">'+
      '<p class="err" id="cec-err" aria-live="polite"></p><button type="submit">Entra</button>'+
      '<a href="'+home()+'">← No sóc '+K.name+'</a></form>';
    document.body.insertBefore(g,document.body.firstChild);
    var f=g.querySelector('form'),inp=g.querySelector('input'),err=g.querySelector('#cec-err');
    inp.focus();
    f.addEventListener('submit',async function(e){
      e.preventDefault();
      var ok=false;
      try{ok=(await sha(inp.value.trim().toLowerCase()))===K.hash}catch(x){ok=inp.value.trim().toLowerCase()===kid}
      if(ok){try{localStorage.setItem(KEY,'1')}catch(x){};root.classList.remove('cec-locked');g.remove()}
      else{err.textContent='Aquesta no és la contrasenya. Torna-ho a provar!';inp.value='';inp.focus()}
    });
  }
  if(document.body)build();else document.addEventListener('DOMContentLoaded',build);
})();
