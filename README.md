# VIZLESSONS

Enciclopedia personal organizada por ramas del saber. Sitio **estático**, sin
build ni dependencias: se publica tal cual en GitHub Pages.

- **Contenido**: un archivo Markdown por artículo en `content/<rama>/<slug>.md`.
- **Índice**: un único `content/manifest.json` con las ramas, secciones y metadatos.
- **Interfaz**: HTML + CSS + tres módulos de JavaScript. Cero librerías.

---

## Añadir un artículo

1. Crea el archivo en `content/<rama>/<slug>.md`. **No** pongas el título con
   `#` al principio: el título sale del manifiesto, para que haya una sola
   fuente de verdad.

2. Añade su entrada en la sección correspondiente de `content/manifest.json`:

   ```json
   {
     "slug": "kant",
     "titulo": "Kant y el giro copernicano",
     "resumen": "Una frase que se lee en la tarjeta y en el buscador.",
     "etiquetas": ["modernidad", "epistemología"],
     "actualizado": "2026-08-01"
   }
   ```

El orden dentro de `articulos` es el orden de lectura: determina la navegación
«anterior / siguiente» al pie de cada artículo.

## Añadir una rama

Añade un objeto a `ramas` en el manifiesto:

```json
{
  "slug": "fisica",
  "nombre": "Física",
  "signatura": "FIS",
  "lema": "Frase corta para la tarjeta de portada.",
  "descripcion": "Párrafo de presentación en la cabecera de la rama.",
  "secciones": []
}
```

Una rama con `secciones` vacío aparece como «En preparación» y no es
navegable. En cuanto tenga un artículo, pasa sola al bloque principal.

Para darle marca propia, añade su geometría en `assets/js/icons.js`. Todas se
dibujan con la misma gramática que la V del logo: **polígonos de lados rectos,
ninguna curva, dos tonos** (`var(--mark-a)` sólido y `var(--mark-b)` azul). Sin
entrada propia se usa la marca genérica.

## Markdown admitido

| Sintaxis | Resultado |
| --- | --- |
| `## Título` / `### Subtítulo` | Encabezados; los de nivel 2 y 3 alimentan el índice lateral |
| `**negrita**` `*cursiva*` `~~tachado~~` | Énfasis |
| `` `código` `` y bloques con ``` | Código |
| `- item` / `1. item` | Listas, con un nivel de anidamiento |
| `[texto](#/filosofia/kant)` | Enlace interno entre artículos |
| `> cita` + línea final `— Autor` | Cita con atribución |
| `> [!clave]`, `> [!dato]`, `> [!ojo]` | Avisos destacados |
| `\| a \| b \|` con fila de guiones | Tabla (con scroll horizontal propio) |

Todo el texto se escapa antes de convertirse en HTML: los `.md` no pueden
inyectar marcado.

## Ver el sitio en local

Hace falta un servidor: la aplicación pide los `.md` con `fetch`, y eso no
funciona abriendo `index.html` desde el disco.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar

`.github/workflows/pages.yml` despliega en cada `push` a `main`. En el
repositorio, **Settings → Pages → Source → GitHub Actions**.

El enrutado es por *hash* (`#/filosofia/kant`), así que no hacen falta reglas
de reescritura ni un `404.html`: cualquier enlace profundo funciona y se puede
compartir.

## Estructura

```
index.html              Armazón, definiciones SVG de la marca
site.webmanifest        Instalable como aplicación
assets/css/app.css      Sistema visual completo (tokens, temas, responsive)
assets/js/app.js        Enrutador, vistas, buscador, tema
assets/js/markdown.js   Markdown → HTML, sin dependencias
assets/js/icons.js      Marcas geométricas de cada rama
assets/img/             Favicon e iconos de aplicación
content/manifest.json   Índice de ramas y artículos
content/<rama>/*.md     Los artículos
```

## Detalles de la interfaz

- **Tema claro y oscuro** con tres capas: preferencia del sistema, interruptor
  manual persistente y tokens CSS. El azul de marca `#0000FF` se mantiene en
  masas y se eleva a `#6B78FF` para texto sobre fondo oscuro, donde el puro no
  llega a contraste legible.
- **Buscador** con `⌘K` / `Ctrl+K` (o `/`). Indexa títulos, etiquetas y
  resúmenes al instante, y descarga el texto completo de todos los artículos
  la primera vez que se abre para buscar también dentro del cuerpo.
- **Móvil**: barra superior traslúcida, cajón de navegación deslizante, índice
  del artículo plegable y respeto de las áreas seguras (`env(safe-area-inset-*)`).
- **Accesibilidad**: enlace de salto al contenido, foco visible, navegación
  completa por teclado en el buscador y `prefers-reduced-motion` respetado.
