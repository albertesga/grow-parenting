# Hero · flecha desde “Este es Inti” hasta la foto

## Estado
La versión corregida está preparada en:

`components/IntroPhotoSection.codex-arrow.tsx`

No he podido reemplazar `components/IntroPhotoSection.tsx` porque macOS bloquea la escritura sobre archivos existentes en esta carpeta (`Operation not permitted`).

## Qué cambia
- Añade una flecha SVG editorial entre el headline “Este es Inti.” y la polaroid.
- La flecha usa el mismo `textProgress` del hero, por lo que nace cuando aparece el título.
- La línea se dibuja primero y la punta aparece después.
- Es `pointer-events-none` y `aria-hidden`, así que no afecta interacción ni accesibilidad.
- Está posicionada solo en desktop, dentro del `DesktopChoreography`.

## Para aplicar
Reemplazar `components/IntroPhotoSection.tsx` por `components/IntroPhotoSection.codex-arrow.tsx`.

También queda un patch en:

`components/IntroPhotoSection.arrow.patch`
