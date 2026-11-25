# Cole en casa

Web d'estudi del Mario (6è) i l'Oliver (4t): https://carbaxo.github.io/cole-en-casa/

Web estàtica, sense build. Cada canvi a `main` es publica sol a GitHub Pages.

## Estructura

```
index.html              inici: «Qui estudia avui?»
gate.js                 contrasenya de cada nen (mario / oliver)
shared/glass.css        aspecte de tota la web
shared/escriptori.js    escriptori de cada nen (assignatures, progrés)
img/                    imatges opcionals: mario-avatar.png, mario-hero.png, oliver-...
mario/                  escriptori del Mario (app instal·lable)
  index.html            llista d'assignatures i temes
  catala/pronoms-febles/
oliver/                 escriptori de l'Oliver (app instal·lable)
```

Cada nen té quatre assignatures: `catala`, `castella`, `angles` i `mates`.

## Afegir deures o un tema nou

1. Crea la carpeta dins de l'assignatura: per exemple `mario/mates/fraccions/index.html`.
2. Afegeix-lo a `topics` de l'assignatura a `mario/index.html`
   (`href`, `title`, `sub`, `key` on es guarden les estrelles, `levels`, `ex`).
3. Afegeix la carpeta al `FILES` de `mario/sw.js` i puja'n la versió (`CACHE`).
