/* ============================================================================
   VIZLESSONS — aplicacion

   Sitio estatico sin build: el indice vive en content/manifest.json y cada
   articulo es un .md que se pide bajo demanda. Enrutado por hash para que
   funcione tal cual en GitHub Pages, sin reglas de reescritura.
   ========================================================================= */

import { ramaMark, UI } from './icons.js';
import { render as renderMd, toText } from './markdown.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)');

/* --------------------------------------------------------------- 1. Estado */

const state = {
  manifest: null,
  ramas: [],
  byRama: new Map(),      // slug -> rama
  articles: [],           // plano, con referencia a su rama
  byPath: new Map(),      // "rama/slug" -> articulo
  cache: new Map(),       // "rama/slug" -> texto markdown
  fullText: null,         // Map path -> texto plano (se llena al buscar)
  fullTextJob: null,
};

const main = $('#main');
const rail = $('#rail');
const railScrim = $('#rail-scrim');

/* ------------------------------------------------------------ 2. Utilidades */

const fmtDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
};

const readingTime = (text) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

async function getJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function getArticle(path) {
  if (state.cache.has(path)) return state.cache.get(path);
  const res = await fetch(`content/${path}.md`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  const text = await res.text();
  state.cache.set(path, text);
  return text;
}

/* --------------------------------------------------------------- 3. Indice */

function indexManifest(manifest) {
  state.manifest = manifest;
  state.ramas = manifest.ramas || [];

  for (const rama of state.ramas) {
    rama.secciones = rama.secciones || [];
    rama.articulos = rama.secciones.flatMap((s) => s.articulos || []);
    state.byRama.set(rama.slug, rama);

    for (const art of rama.articulos) {
      art.rama = rama;
      art.path = `${rama.slug}/${art.slug}`;
      state.byPath.set(art.path, art);
      state.articles.push(art);
    }
  }
  state.articles.sort((a, b) => String(b.actualizado).localeCompare(String(a.actualizado)));
}

/* ------------------------------------------------------------ 4. Enrutador */

/** "#/filosofia/kant#el-giro" -> {rama, slug, anchor} */
function parseRoute() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [pathPart, anchor] = raw.split('#');
  const parts = pathPart.split('/').filter(Boolean);
  return { rama: parts[0] || null, slug: parts[1] || null, anchor: anchor || null };
}

let currentToken = 0;
let currentPath = null;

async function route() {
  const token = ++currentToken;
  const r = parseRoute();
  const path = `${r.rama || ''}/${r.slug || ''}`;

  closeDrawer();
  syncRail(r.rama);

  // Solo ha cambiado el ancla dentro de la misma pagina: basta con
  // desplazarse. Reconstruir el articulo entero seria tirar el trabajo hecho
  // y provocar un parpadeo en cada salto del indice.
  if (path === currentPath && r.anchor) {
    const target = document.getElementById(r.anchor);
    if (target) {
      target.scrollIntoView({ behavior: REDUCED.matches ? 'auto' : 'smooth', block: 'start' });
      return;
    }
  }
  currentPath = path;

  let build;
  if (!r.rama) build = viewHome;
  else if (!r.slug) build = () => viewRama(r.rama);
  else build = () => viewArticle(r.rama, r.slug, r.anchor);

  const paint = async () => {
    const html = await build();
    if (token !== currentToken) return false;   // llego una navegacion mas nueva
    main.innerHTML = html;
    return true;
  };

  // Se prepara el HTML antes de la transicion para que el intercambio sea
  // instantaneo y no parpadee.
  if (document.startViewTransition && !REDUCED.matches) {
    let painted = false;
    await document.startViewTransition(async () => { painted = await paint(); }).finished
      .catch(() => {});
    if (!painted) return;
  } else if (!(await paint())) {
    return;
  }

  afterPaint(r);
}

function afterPaint(r) {
  document.title = main.dataset.title
    ? `${main.dataset.title} — VIZLESSONS`
    : 'VIZLESSONS — Enciclopedia personal';

  main.classList.remove('view-enter');
  void main.offsetWidth;
  if (!REDUCED.matches) main.classList.add('view-enter');

  observeReveals();
  setupToc();
  setupProgress(Boolean(r.slug));

  if (r.anchor) {
    const target = document.getElementById(r.anchor);
    if (target) {
      target.scrollIntoView({ behavior: REDUCED.matches ? 'auto' : 'smooth', block: 'start' });
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
  main.focus({ preventScroll: true });
}

/* ------------------------------------------------------------- 5. El raíl */

function buildRail() {
  const activas = state.ramas.filter((r) => r.articulos.length);
  const futuras = state.ramas.filter((r) => !r.articulos.length);

  const link = (rama) => {
    const n = rama.articulos.length;
    return `<a class="rail-link${n ? '' : ' is-soon'}" href="#/${esc(rama.slug)}" data-rama="${esc(rama.slug)}">
      ${ramaMark(rama.slug)}
      <span>${esc(rama.nombre)}</span>
      <span class="rail-link__count">${n || '—'}</span>
    </a>`;
  };

  rail.innerHTML = `
    <div class="rail-group">
      <p class="rail-group__title eyebrow">Ramas</p>
      <div class="rail-list">${activas.map(link).join('')}</div>
    </div>
    ${futuras.length ? `
    <div class="rail-group">
      <p class="rail-group__title eyebrow">En preparación</p>
      <div class="rail-list">${futuras.map(link).join('')}</div>
    </div>` : ''}
    <p class="rail-foot">
      Para añadir una rama: un archivo <code>.md</code> en <code>content/</code>
      y su entrada en <code>manifest.json</code>.
    </p>`;
}

function syncRail(activeSlug) {
  $$('.rail-link', rail).forEach((el) => {
    el.classList.toggle('is-active', el.dataset.rama === activeSlug);
  });
}

function openDrawer() {
  rail.classList.add('is-open');
  railScrim.hidden = false;
  requestAnimationFrame(() => railScrim.classList.add('is-open'));
  document.body.classList.add('is-locked');
  $('#drawer-btn').setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
  if (!rail.classList.contains('is-open')) return;
  rail.classList.remove('is-open');
  railScrim.classList.remove('is-open');
  document.body.classList.remove('is-locked');
  $('#drawer-btn').setAttribute('aria-expanded', 'false');
  setTimeout(() => { if (!rail.classList.contains('is-open')) railScrim.hidden = true; }, 320);
}

/* ---------------------------------------------------------------- 6. Vistas */

function entryRow(art, i) {
  return `<a class="entry reveal" style="--d:${Math.min(i, 8) * 40}ms" href="#/${esc(art.path)}">
    <span class="entry__sig">${esc(art.rama.signatura)}·${String(i + 1).padStart(2, '0')}</span>
    <span class="entry__body">
      <span class="entry__title">${esc(art.titulo)}</span>
      <span class="entry__sum">${esc(art.resumen)}</span>
    </span>
    <span class="entry__meta">${esc(fmtDate(art.actualizado))}</span>
  </a>`;
}

function ramaCard(rama, i) {
  const n = rama.articulos.length;
  const soon = n === 0;
  const inner = `
    <span class="rama-card__top">
      ${ramaMark(rama.slug)}
      <span class="rama-card__sig">${esc(rama.signatura)}</span>
    </span>
    <span class="rama-card__name">${esc(rama.nombre)}</span>
    <span class="rama-card__desc">${esc(rama.lema)}</span>
    <span class="rama-card__foot">
      ${soon ? 'En preparación' : `<strong>${plural(n, 'artículo', 'artículos')}</strong> · ${plural(rama.secciones.length, 'sección', 'secciones')}`}
    </span>`;
  const attrs = `class="rama-card reveal${soon ? ' is-soon' : ''}" style="--d:${Math.min(i, 8) * 45}ms"`;
  return soon
    ? `<div ${attrs} aria-disabled="true">${inner}</div>`
    : `<a ${attrs} href="#/${esc(rama.slug)}">${inner}</a>`;
}

function viewHome() {
  const nArt = state.articles.length;
  const nActivas = state.ramas.filter((r) => r.articulos.length).length;
  const recientes = state.articles.slice(0, 6);

  main.dataset.title = '';

  return `
  <section class="hero">
    <div class="hero__inner">
      <div class="hero-lockup">
        <svg class="hero-word" viewBox="0 0 848 100" role="img" aria-label="VIZLESSONS">
          <use href="#vz-word"/>
        </svg>
      </div>
      <h1 class="hero__claim">Una enciclopedia que crece <em>por ramas</em>.</h1>
      <p class="hero__lede">
        Notas largas y ordenadas sobre lo que merece volver a leerse. Cada rama es un
        cuaderno independiente: filosofía, física, fluidodinámica, mecánica, matemáticas,
        historia. Se escribe en texto plano y se publica solo.
      </p>
      <div class="hero__stats">
        <div class="stat">
          <div class="stat__n">${String(nArt).padStart(2, '0')}</div>
          <div class="stat__k eyebrow">Artículos</div>
        </div>
        <div class="stat">
          <div class="stat__n">${String(nActivas).padStart(2, '0')}</div>
          <div class="stat__k eyebrow">Ramas abiertas</div>
        </div>
        <div class="stat">
          <div class="stat__n">${String(state.ramas.length).padStart(2, '0')}</div>
          <div class="stat__k eyebrow">Ramas previstas</div>
        </div>
      </div>
    </div>
  </section>

  <div class="view">
    <section class="section">
      <div class="section__head">
        <h2 class="section__title">Ramas del saber</h2>
        <p class="section__note">Elige por dónde entrar</p>
      </div>
      <div class="rama-grid">${state.ramas.map(ramaCard).join('')}</div>
    </section>

    ${recientes.length ? `
    <section class="section">
      <div class="section__head">
        <h2 class="section__title">Lo último</h2>
        <p class="section__note">Ordenado por fecha de revisión</p>
      </div>
      <div class="entry-list">${recientes.map(entryRow).join('')}</div>
    </section>` : ''}
  </div>`;
}

function viewRama(slug) {
  const rama = state.byRama.get(slug);
  if (!rama) return viewMissing(`No existe la rama «${slug}».`);

  main.dataset.title = rama.nombre;
  let n = 0;

  const secciones = rama.secciones.map((sec) => `
    <section class="section">
      <div class="section__head">
        <h2 class="section__title">${esc(sec.titulo)}</h2>
        <p class="section__note">${plural((sec.articulos || []).length, 'artículo', 'artículos')}</p>
      </div>
      <div class="entry-list">
        ${(sec.articulos || []).map((a) => entryRow(a, n++)).join('')}
      </div>
    </section>`).join('');

  return `
  <div class="view">
    <nav class="crumbs" aria-label="Ruta">
      <a href="#/">Inicio</a>
      <span class="crumbs__sep">/</span>
      <span class="crumbs__here">${esc(rama.nombre)}</span>
    </nav>

    <header class="rama-head">
      <div class="rama-head__top">
        ${ramaMark(rama.slug)}
        <div>
          <p class="eyebrow">${esc(rama.signatura)} · ${plural(rama.articulos.length, 'artículo', 'artículos')}</p>
          <h1 class="rama-head__title">${esc(rama.nombre)}</h1>
        </div>
      </div>
      <p class="rama-head__desc">${esc(rama.descripcion)}</p>
    </header>

    ${rama.articulos.length ? secciones : `
    <section class="section">
      <p class="hero__lede">Esta rama todavía no tiene artículos publicados.</p>
    </section>`}
  </div>`;
}

async function viewArticle(ramaSlug, slug, anchor) {
  const path = `${ramaSlug}/${slug}`;
  const art = state.byPath.get(path);
  if (!art) return viewMissing(`No existe el artículo «${path}».`);

  let src;
  try {
    src = await getArticle(path);
  } catch {
    return viewMissing(`No se pudo cargar <code>content/${esc(path)}.md</code>.`);
  }

  main.dataset.title = art.titulo;

  const { html, headings } = renderMd(src, `/${path}`);
  const minutes = readingTime(toText(src));

  const siblings = art.rama.articulos;
  const idx = siblings.indexOf(art);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const tocItems = headings.map((h) =>
    `<a class="toc__link${h.level === 3 ? ' is-h3' : ''}" href="#/${esc(path)}#${esc(h.id)}" data-toc="${esc(h.id)}">${esc(h.text)}</a>`
  ).join('');

  const toc = headings.length >= 2 ? `
    <details class="toc-mobile"${anchor ? ' open' : ''}>
      <summary>En esta página ${UI.chevron}</summary>
      <div class="toc__list">${tocItems}</div>
    </details>` : '';

  const tocAside = headings.length >= 2 ? `
    <aside class="toc" aria-label="Índice del artículo">
      <p class="toc__title eyebrow">En esta página</p>
      <nav class="toc__list">${tocItems}</nav>
    </aside>` : '<div></div>';

  return `
  <div class="view">
    <nav class="crumbs" aria-label="Ruta">
      <a href="#/">Inicio</a>
      <span class="crumbs__sep">/</span>
      <a href="#/${esc(art.rama.slug)}">${esc(art.rama.nombre)}</a>
      <span class="crumbs__sep">/</span>
      <span class="crumbs__here">${esc(art.titulo)}</span>
    </nav>

    <div class="article-shell">
      <article>
        <header class="article-head">
          <p class="eyebrow">${esc(art.rama.signatura)} · ${esc(art.rama.nombre)}</p>
          <h1 class="article-head__title">${esc(art.titulo)}</h1>
          <p class="article-head__sum">${esc(art.resumen)}</p>
          <div class="article-head__meta">
            <span class="tag">${minutes} min de lectura</span>
            <span class="tag">Rev. ${esc(fmtDate(art.actualizado))}</span>
            ${(art.etiquetas || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
          </div>
        </header>

        ${toc}

        <div class="prose" id="prose">${html}</div>

        <nav class="pager" aria-label="Navegación entre artículos">
          ${prev ? `<a class="pager__item pager__item--prev" href="#/${esc(prev.path)}">
            <span class="pager__k">← Anterior</span>
            <span class="pager__t">${esc(prev.titulo)}</span>
          </a>` : '<span></span>'}
          ${next ? `<a class="pager__item pager__item--next" href="#/${esc(next.path)}">
            <span class="pager__k">Siguiente →</span>
            <span class="pager__t">${esc(next.titulo)}</span>
          </a>` : '<span></span>'}
        </nav>
      </article>

      ${tocAside}
    </div>
  </div>`;
}

function viewMissing(msg) {
  main.dataset.title = 'No encontrado';
  return `
  <div class="view">
    <header class="rama-head">
      <p class="eyebrow">Error 404</p>
      <h1 class="rama-head__title">Aquí no hay nada… todavía.</h1>
      <p class="rama-head__desc">${msg}</p>
      <p style="margin-top:22px"><a class="search-trigger" href="#/">← Volver al inicio</a></p>
    </header>
  </div>`;
}

/* --------------------------------------------------- 7. Efectos de la vista */

/* Revelado al hacer scroll.

   Se comprueba la posicion en cada fotograma de scroll en vez de usar
   IntersectionObserver: el observador solo avisa cuando un elemento *cruza* el
   umbral, asi que un salto largo —un ancla, buscar en la pagina, arrastrar la
   barra hasta el final— deja atras bloques que nunca llegaron a entrar en
   pantalla y se quedan invisibles para siempre. Comparar rectangulos es
   barato: la lista se vacia sola segun se revelan. */
let pending = new Set();
let revealTick = 0;

function flushReveals() {
  revealTick = 0;
  const limit = window.innerHeight * .94;
  for (const el of pending) {
    if (el.getBoundingClientRect().top < limit) {
      el.classList.add('is-in');
      pending.delete(el);
    }
  }
  if (!pending.size) window.removeEventListener('scroll', onRevealScroll);
}

function onRevealScroll() {
  if (!revealTick) revealTick = requestAnimationFrame(flushReveals);
}

function observeReveals() {
  window.removeEventListener('scroll', onRevealScroll);
  pending = new Set($$('.reveal', main));
  if (!pending.size) return;

  // Sin animaciones, el contenido se muestra sin mas. Nunca debe quedar nada
  // en opacidad 0 esperando un evento que podria no llegar.
  if (REDUCED.matches) {
    pending.forEach((el) => el.classList.add('is-in'));
    pending.clear();
    return;
  }

  window.addEventListener('scroll', onRevealScroll, { passive: true });
  flushReveals();
}

let tocObserver = null;

function setupToc() {
  if (tocObserver) tocObserver.disconnect();
  const links = $$('.toc__link', main);
  const prose = $('#prose', main);
  if (!links.length || !prose) return;

  const targets = $$('h2[id], h3[id]', prose);
  if (!targets.length) return;

  // El encabezado activo es el ultimo que ha cruzado la linea superior de
  // lectura: se lleva la cuenta a mano porque IntersectionObserver por si solo
  // no distingue "he pasado de largo" de "aun no he llegado".
  const seen = new Set();
  const mark = () => {
    let active = targets[0].id;
    for (const t of targets) if (seen.has(t.id)) active = t.id;
    links.forEach((l) => l.classList.toggle('is-current', l.dataset.toc === active));
  };

  tocObserver = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.boundingClientRect.top < 0 || e.isIntersecting) seen.add(e.target.id);
      else seen.delete(e.target.id);
    }
    mark();
  }, { rootMargin: '-72px 0px -70% 0px', threshold: 0 });

  targets.forEach((t) => tocObserver.observe(t));
  mark();
}

const progressEl = $('#read-progress');
let progressOn = false;

function updateProgress() {
  if (!progressOn) return;
  const art = $('#prose', main);
  if (!art) return;

  // 0 % cuando el cuerpo del articulo empieza en la parte alta de la ventana,
  // 100 % cuando su ultima linea llega abajo. Lo que hay debajo —paginador y
  // pie— no es lectura y no cuenta.
  const start = art.offsetTop;
  const end = start + art.offsetHeight - window.innerHeight;
  const done = end > start ? (window.scrollY - start) / (end - start) : 1;
  progressEl.firstElementChild.style.width = `${Math.min(100, Math.max(0, done * 100))}%`;
}

function setupProgress(on) {
  progressOn = on;
  progressEl.firstElementChild.style.width = '0%';
  if (on) updateProgress();
}

/* ------------------------------------------------------------ 8. Buscador */

const palette = $('#palette');
const paletteInput = $('#palette-input');
const paletteResults = $('#palette-results');
let hits = [];
let sel = 0;
let lastFocus = null;

/** Descarga todos los .md una sola vez para poder buscar dentro del texto. */
function warmFullText() {
  if (state.fullTextJob) return state.fullTextJob;
  state.fullTextJob = Promise.all(state.articles.map(async (art) => {
    try { return [art.path, toText(await getArticle(art.path))]; } catch { return null; }
  })).then((pairs) => {
    state.fullText = new Map(pairs.filter(Boolean));
    if (palette.hidden === false && paletteInput.value.trim()) runSearch(paletteInput.value);
  });
  return state.fullTextJob;
}

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function highlight(text, terms) {
  let out = esc(text);
  for (const t of terms) {
    if (t.length < 2) continue;
    const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    // Se marca sobre el texto ya escapado: los terminos vienen del input, que
    // tambien se escapa antes de construir la expresion.
    out = out.replace(re, '<mark>$1</mark>');
  }
  return out;
}

function snippet(text, terms) {
  const hay = norm(text);
  let at = -1;
  for (const t of terms) { at = hay.indexOf(norm(t)); if (at >= 0) break; }
  if (at < 0) return text.slice(0, 110);
  const from = Math.max(0, at - 38);
  return (from ? '…' : '') + text.slice(from, from + 130).trim() + '…';
}

function search(q) {
  const terms = q.trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const nterms = terms.map(norm);

  const scored = [];

  for (const rama of state.ramas) {
    const hay = norm(`${rama.nombre} ${rama.lema} ${rama.descripcion}`);
    if (nterms.every((t) => hay.includes(t))) {
      scored.push({ kind: 'rama', rama, score: nterms.every((t) => norm(rama.nombre).includes(t)) ? 90 : 40 });
    }
  }

  for (const art of state.articles) {
    const title = norm(art.titulo);
    const tags = norm((art.etiquetas || []).join(' '));
    const sum = norm(art.resumen);
    const body = state.fullText ? norm(state.fullText.get(art.path) || '') : '';

    let score = 0;
    let matchedAll = true;
    for (const t of nterms) {
      if (title.includes(t)) score += title.startsWith(t) ? 100 : 70;
      else if (tags.includes(t)) score += 45;
      else if (sum.includes(t)) score += 30;
      else if (body.includes(t)) score += 12;
      else { matchedAll = false; break; }
    }
    if (matchedAll) scored.push({ kind: 'art', art, score, terms });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 24);
}

function runSearch(q) {
  hits = search(q);
  sel = 0;

  if (!q.trim()) {
    const recientes = state.articles.slice(0, 5);
    hits = recientes.map((art) => ({ kind: 'art', art, score: 0, terms: [] }));
    paletteResults.innerHTML =
      `<p class="palette__group">Revisados hace poco</p>${hits.map(hitRow).join('')}`;
    markSel();
    return;
  }

  if (!hits.length) {
    paletteResults.innerHTML = `<p class="palette__empty">Sin resultados para «${esc(q)}».${
      state.fullText ? '' : '<br>Indexando el texto completo…'}</p>`;
    return;
  }

  const ramas = hits.filter((h) => h.kind === 'rama');
  const arts = hits.filter((h) => h.kind === 'art');
  paletteResults.innerHTML =
    (ramas.length ? `<p class="palette__group">Ramas</p>${ramas.map(hitRow).join('')}` : '') +
    (arts.length ? `<p class="palette__group">Artículos</p>${arts.map(hitRow).join('')}` : '');
  markSel();
}

function hitRow(h) {
  if (h.kind === 'rama') {
    return `<a class="p-hit" role="option" href="#/${esc(h.rama.slug)}" data-href="#/${esc(h.rama.slug)}">
      ${ramaMark(h.rama.slug)}
      <span><span class="p-hit__t">${esc(h.rama.nombre)}</span></span>
      <span class="p-hit__k">rama</span>
    </a>`;
  }
  const { art, terms } = h;
  const body = state.fullText && state.fullText.get(art.path);
  const sub = body && terms.length && !norm(art.titulo).includes(norm(terms[0]))
    ? snippet(body, terms)
    : art.resumen;
  return `<a class="p-hit" role="option" href="#/${esc(art.path)}" data-href="#/${esc(art.path)}">
    ${ramaMark(art.rama.slug)}
    <span style="min-width:0">
      <span class="p-hit__t">${highlight(art.titulo, terms)}</span>
      <span class="p-hit__s" style="display:block">${highlight(sub, terms)}</span>
    </span>
    <span class="p-hit__k">${esc(art.rama.signatura)}</span>
  </a>`;
}

function markSel() {
  const rows = $$('.p-hit', paletteResults);
  rows.forEach((r, i) => {
    r.classList.toggle('is-sel', i === sel);
    r.setAttribute('aria-selected', String(i === sel));
  });
  const active = rows[sel];
  if (active) active.scrollIntoView({ block: 'nearest' });
}

function openPalette() {
  lastFocus = document.activeElement;
  palette.hidden = false;
  document.body.classList.add('is-locked');
  paletteInput.value = '';
  runSearch('');
  paletteInput.focus();
  warmFullText();
}

function closePalette() {
  if (palette.hidden) return;
  palette.hidden = true;
  document.body.classList.remove('is-locked');
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* ---------------------------------------------------------------- 9. Tema */

function applyTheme(mode) {
  if (mode === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = mode;
  try { localStorage.setItem('vz-theme', mode); } catch { /* sin persistencia */ }

  const dark = mode === 'dark' ||
    (mode !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  $$('meta[name="theme-color"]').forEach((m) => m.remove());
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = dark ? '#07070e' : '#fbfbfd';
  document.head.appendChild(meta);
}

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/* ------------------------------------------------------------ 10. Arranque */

function wire() {
  $('#drawer-btn').addEventListener('click', () => {
    rail.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  railScrim.addEventListener('click', closeDrawer);

  $('#theme-btn').addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  $('#search-trigger').addEventListener('click', openPalette);
  palette.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closePalette(); });
  paletteInput.addEventListener('input', () => runSearch(paletteInput.value));

  paletteResults.addEventListener('click', (e) => {
    const hit = e.target.closest('.p-hit');
    if (hit) closePalette();
  });
  paletteResults.addEventListener('mousemove', (e) => {
    const hit = e.target.closest('.p-hit');
    if (!hit) return;
    const i = $$('.p-hit', paletteResults).indexOf(hit);
    if (i !== sel) { sel = i; markSel(); }
  });

  document.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault(); openPalette(); return;
    }
    if (palette.hidden) {
      if (e.key === 'Escape') closeDrawer();
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, hits.length - 1); markSel(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); markSel(); }
    else if (e.key === 'Enter') {
      const row = $$('.p-hit', paletteResults)[sel];
      if (row) { e.preventDefault(); closePalette(); location.hash = row.dataset.href; }
    }
  });

  window.addEventListener('hashchange', route);
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  window.addEventListener('resize', flushReveals, { passive: true });

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!document.documentElement.dataset.theme) applyTheme('system');
  });

  // Tecla modificadora segun plataforma.
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    $$('[data-kbd-mod]').forEach((el) => { el.textContent = '⌘'; });
  }
}

async function boot() {
  wire();
  applyTheme(currentTheme() === 'dark' && !document.documentElement.dataset.theme ? 'system' : (document.documentElement.dataset.theme || 'system'));

  try {
    indexManifest(await getJSON('content/manifest.json'));
  } catch (err) {
    main.innerHTML = viewMissing(
      'No se pudo leer <code>content/manifest.json</code>. Si estás abriendo el archivo ' +
      'directamente desde el disco, sirve la carpeta con un servidor local ' +
      '(<code>python3 -m http.server</code>).');
    console.error(err);
    return;
  }

  buildRail();

  const dates = state.articles.map((a) => a.actualizado).filter(Boolean).sort();
  $('#foot-meta').textContent = state.articles.length
    ? `${state.articles.length} artículos · ${state.ramas.length} ramas · última revisión ${fmtDate(dates[dates.length - 1])}`
    : `${state.ramas.length} ramas previstas`;

  await route();
}

boot();
