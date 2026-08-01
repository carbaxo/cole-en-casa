/* ============================================================================
   Marcas de las ramas.

   Todas comparten la gramatica del logo: poligonos de lados rectos, ninguna
   curva y dos tonos (--mark-a solido, --mark-b azul). Esto es lo que hace que
   el conjunto se lea como un sistema y no como iconos sueltos de una libreria.
   ========================================================================= */

const A = 'var(--mark-a)';
const B = 'var(--mark-b)';

/** @type {Record<string, Array<[string, string, string?]>>} [d, color, fillRule] */
const SHAPES = {
  /* Columna: capitel, basa y dos estrias. El saber que sostiene al resto. */
  filosofia: [
    ['M8,8L56,8L56,16L8,16Z', A],
    ['M8,48L56,48L56,56L8,56Z', A],
    ['M18,19L29,19L29,45L18,45Z', A],
    ['M35,19L46,19L46,45L35,45Z', B],
  ],

  /* Orbita romboidal y nucleo: la materia y lo que la rodea. */
  fisica: [
    ['M32,4L60,32L32,60L4,32ZM32,15L49,32L32,49L15,32Z', A, 'evenodd'],
    ['M27,27L37,27L37,37L27,37Z', B],
  ],

  /* Lineas de corriente con el borde de fuga cortado en diagonal. */
  fluidodinamica: [
    ['M6,12L42,12L50,20L6,20Z', A],
    ['M14,28L50,28L58,36L14,36Z', B],
    ['M6,44L38,44L46,52L6,52Z', A],
  ],

  /* Engranaje cuadrado: corona hueca y cuatro dientes. */
  mecanica: [
    ['M14,14L50,14L50,50L14,50ZM25,25L39,25L39,39L25,39Z', A, 'evenodd'],
    ['M27,3L37,3L37,13L27,13Z', B],
    ['M27,51L37,51L37,61L27,61Z', B],
    ['M3,27L13,27L13,37L3,37Z', B],
    ['M51,27L61,27L61,37L51,37Z', B],
  ],

  /* Matriz 3x3 con la diagonal marcada: la estructura antes que el numero. */
  matematicas: [
    ['M26,8L38,8L38,20L26,20Z', A],
    ['M44,8L56,8L56,20L44,20Z', A],
    ['M8,26L20,26L20,38L8,38Z', A],
    ['M44,26L56,26L56,38L44,38Z', A],
    ['M8,44L20,44L20,56L8,56Z', A],
    ['M26,44L38,44L38,56L26,56Z', A],
    ['M8,8L20,8L20,20L8,20Z', B],
    ['M26,26L38,26L38,38L26,38Z', B],
    ['M44,44L56,44L56,56L44,56Z', B],
  ],

  /* Estratos: capas de anchura desigual, como un corte de terreno. */
  historia: [
    ['M8,9L56,9L56,17L8,17Z', A],
    ['M8,21L48,21L48,29L8,29Z', B],
    ['M8,33L60,33L60,41L8,41Z', A],
    ['M8,45L42,45L42,53L8,53Z', A],
  ],

  /* Comodin para ramas que aun no tienen marca propia. */
  generica: [
    ['M8,8L56,8L56,20L8,20Z', A],
    ['M8,26L34,26L34,38L8,38Z', B],
    ['M8,44L48,44L48,56L8,56Z', A],
  ],
};

/**
 * Devuelve el SVG de la marca de una rama, listo para insertar.
 * @param {string} slug  identificador de la rama
 * @param {string} [cls] clases extra
 */
export function ramaMark(slug, cls = '') {
  const shape = SHAPES[slug] || SHAPES.generica;
  const paths = shape
    .map(([d, fill, rule]) =>
      `<path d="${d}" fill="${fill}"${rule ? ` fill-rule="${rule}"` : ''}/>`)
    .join('');
  return `<svg class="rmark ${cls}" viewBox="0 0 64 64" aria-hidden="true">${paths}</svg>`;
}

/** Iconos de interfaz (trazo, no masa): comparten grosor y remates. */
export const UI = {
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
