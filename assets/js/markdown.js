/* ============================================================================
   Markdown -> HTML

   Subconjunto deliberado: lo que hace falta para escribir artículos y nada
   mas. Sin dependencias externas, para que el sitio siga siendo estatico y
   funcione sin build. Todo el texto pasa por escapeHtml antes de convertirse
   en marcado: el contenido de los .md nunca inyecta HTML.

   Soporta: encabezados, parrafos, listas (con un nivel de anidamiento),
   citas, avisos (> [!clave]), tablas, bloques de codigo, reglas, y en linea
   negrita, cursiva, tachado, codigo, enlaces e imagenes.
   ========================================================================= */

const NUL = '\u0000';

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/** Solo se permiten destinos http(s), anclas y rutas relativas del sitio. */
function safeUrl(raw) {
  const url = raw.trim();
  if (/^(https?:|mailto:)/i.test(url)) return url;
  if (/^[#/]/.test(url)) return url;
  if (/^[\w./-]+$/.test(url)) return url;
  return '#';
}

export function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'seccion';
}

/* ------------------------------------------------------------- nivel linea */

function emphasis(escaped) {
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(¿¡"'—-])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|[\s(¿¡"'—-])_([^_\n]+)_/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>');
}

function inline(src) {
  const slots = [];
  const park = (html) => `${NUL}${slots.push(html) - 1}${NUL}`;

  let s = src;

  // 1. Codigo en linea: se aparta antes de nada para que no le afecte el
  //    resto de reglas.
  s = s.replace(/`([^`]+)`/g, (_, code) => park(`<code>${escapeHtml(code)}</code>`));

  // 2. Imagenes antes que enlaces: comparten sintaxis salvo el "!".
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, alt, src2, title) =>
    park(`<img src="${escapeHtml(safeUrl(src2))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"${
      title ? ` title="${escapeHtml(title)}"` : ''}>`));

  // 3. Enlaces. Se apartan enteros porque una URL con guiones bajos se
  //    romperia al aplicar la cursiva.
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const url = safeUrl(href);
    const ext = /^https?:/i.test(url);
    return park(
      `<a href="${escapeHtml(url)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>` +
      `${emphasis(escapeHtml(label))}</a>`);
  });

  s = emphasis(escapeHtml(s));

  return s.replace(new RegExp(`${NUL}(\\d+)${NUL}`, 'g'), (_, i) => slots[i]);
}

/* ------------------------------------------------------------ nivel bloque */

const CALLOUT_KINDS = { clave: 'Clave', dato: 'Dato', ojo: 'Ojo' };

function renderList(lines, ordered) {
  const items = [];
  let current = null;
  let nested = [];
  let nestedOrdered = false;

  const flushNested = () => {
    if (nested.length && current !== null) {
      items[current] += renderList(nested, nestedOrdered);
      nested = [];
    }
  };

  for (const line of lines) {
    const deep = /^\s{2,}(?:[-*+]|\d+[.)])\s+/.test(line);
    if (deep) {
      if (!nested.length) nestedOrdered = /^\s{2,}\d+[.)]\s/.test(line);
      nested.push(line.replace(/^\s{2}/, ''));
      continue;
    }
    flushNested();
    const text = line.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '');
    current = items.push(inline(text)) - 1;
  }
  flushNested();

  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${items.map((h) => `<li>${h}</li>`).join('')}</${tag}>`;
}

function renderTable(rows) {
  const cells = (row) => row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const head = cells(rows[0]);
  const align = cells(rows[1]).map((c) => {
    if (/^:-+:$/.test(c)) return ' style="text-align:center"';
    if (/^-+:$/.test(c)) return ' style="text-align:right"';
    return '';
  });
  const body = rows.slice(2).map((r) => {
    const cs = cells(r);
    return `<tr>${head.map((_, i) => `<td${align[i] || ''}>${inline(cs[i] || '')}</td>`).join('')}</tr>`;
  }).join('');

  return '<div class="table-wrap"><table><thead><tr>' +
    head.map((h, i) => `<th${align[i] || ''}>${inline(h)}</th>`).join('') +
    `</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderQuote(lines, ctx) {
  const inner = lines.map((l) => l.replace(/^>\s?/, ''));

  const flag = inner[0] && inner[0].match(/^\[!(\w+)\]\s*(.*)$/i);
  if (flag) {
    const kind = flag[1].toLowerCase();
    const label = flag[2].trim() || CALLOUT_KINDS[kind] || flag[1];
    const rest = inner.slice(1);
    const known = Object.prototype.hasOwnProperty.call(CALLOUT_KINDS, kind);
    return `<aside class="callout callout--${known ? kind : 'clave'}">` +
      `<p class="callout__label">${inline(label)}</p>` +
      blocks(rest, ctx) +
      '</aside>';
  }

  // Una ultima linea que empieza por raya larga es la atribucion de la cita.
  let cite = '';
  if (inner.length > 1 && /^—\s+\S/.test(inner[inner.length - 1])) {
    cite = `<cite>${inline(inner.pop().replace(/^—\s+/, ''))}</cite>`;
  }
  return `<blockquote>${blocks(inner, ctx)}${cite}</blockquote>`;
}

function blocks(lines, ctx) {
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // Bloque de codigo
    const fence = line.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++;
      const lang = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : '';
      out.push(`<pre><code${lang}>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // Regla horizontal
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

    // Encabezados. Los de nivel 2 y 3 alimentan el indice lateral.
    const h = line.match(/^(#{1,4})\s+(.+?)\s*#*$/);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      const html = inline(text);
      if (level >= 2 && level <= 3) {
        let id = slugify(text);
        let n = 2;
        while (ctx.ids.has(id)) id = `${slugify(text)}-${n++}`;
        ctx.ids.add(id);
        ctx.headings.push({ level, id, text: text.replace(/[*_`~]/g, '') });
        out.push(
          `<h${level} id="${id}">${html}` +
          `<a class="h-anchor" href="#${ctx.base}#${id}" aria-label="Enlace a esta sección">#</a>` +
          `</h${level}>`);
      } else {
        out.push(`<h${level}>${html}</h${level}>`);
      }
      i++;
      continue;
    }

    // Cita / aviso
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++]);
      out.push(renderQuote(buf, ctx));
      continue;
    }

    // Tabla: cabecera + fila de guiones
    if (/^\|.*\|\s*$/.test(line) && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '')) {
      const buf = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) buf.push(lines[i++]);
      out.push(renderTable(buf));
      continue;
    }

    // Listas
    const bullet = /^\s*[-*+]\s+/.test(line);
    const numbered = /^\s*\d+[.)]\s+/.test(line);
    if (bullet || numbered) {
      const buf = [];
      while (i < lines.length && (/^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))) {
        buf.push(lines[i++]);
      }
      out.push(renderList(buf, numbered));
      continue;
    }

    // Parrafo: se acumula hasta la siguiente linea en blanco o bloque nuevo.
    const buf = [];
    while (
      i < lines.length && lines[i].trim() &&
      !/^(#{1,4}\s|>|```|\||\s*(?:[-*+]|\d+[.)])\s)/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])
    ) buf.push(lines[i++]);
    if (buf.length) out.push(`<p>${inline(buf.join(' '))}</p>`);
  }

  return out.join('');
}

/**
 * Convierte Markdown en HTML y devuelve tambien el arbol de encabezados.
 * @param {string} src   texto Markdown
 * @param {string} base  ruta hash del articulo, para los enlaces de ancla
 * @returns {{html: string, headings: Array<{level:number,id:string,text:string}>}}
 */
export function render(src, base = '') {
  const ctx = { headings: [], ids: new Set(), base };
  const lines = String(src).replace(/\r\n?/g, '\n').replace(/\t/g, '  ').split('\n');
  return { html: blocks(lines, ctx), headings: ctx.headings };
}

/** Texto plano, para el indice de busqueda y el conteo de palabras. */
export function toText(src) {
  return String(src)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}[>#|-]+\s?/gm, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
