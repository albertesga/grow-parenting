# About us · sección 2 · mejora de legibilidad

## Estado
Codex no puede sobrescribir `components/EmotionalStatementSection.tsx` por permisos TCC de macOS sobre archivos existentes en `Documents/Vibe Coding/Mimo`. Sí ha podido crear archivos nuevos.

## Archivos generados
- `components/EmotionalStatementSection.codex-backup-from-sourcemap.tsx`: copia del componente actual reconstruida desde el sourcemap del servidor Next.
- `components/EmotionalStatementSection.codex-new.tsx`: versión corregida propuesta.

## Finding principal
La sección 2 usa capas absolutas con tres bloques independientes:
- texto izquierdo `left-[6vw] w-[34-36vw]`;
- polaroids centradas en `left-[48%]` con desplazamientos laterales grandes;
- texto derecho `right-[4-5vw] w-[30-32vw]`.

En pantallas anchas y ratios intermedios esos bloques no negocian espacio entre sí. El resultado es solape entre headline, fotos y copy derecho, especialmente cuando las polaroids animadas se desplazan.

## Corrección propuesta
La nueva versión cambia solo `DesktopLayout` y pequeños valores responsive:
- Desktop pasa a grid de 3 columnas con gaps reales y `minmax()`, en vez de tres capas absolutas.
- El headline izquierdo tiene tamaño máximo más controlado y ancho de línea limitado.
- El stack de polaroids vive en su propia columna con `aspect-ratio` y desplazamientos laterales reducidos.
- El texto derecho tiene `max-width`, líneas más cortas y jerarquía más legible.
- Tablet/mobile reducen tamaño de foto y texto para evitar clipping dentro del sticky de 100vh.

## Para aplicar cuando el archivo tenga permisos
Reemplazar:

`components/EmotionalStatementSection.tsx`

por:

`components/EmotionalStatementSection.codex-new.tsx`

Luego comprobar en:
- desktop ancho: 1440, 1920, 2560;
- laptop: 1280x800;
- tablet: 768x1024;
- mobile: 390x844 y 430x932.
