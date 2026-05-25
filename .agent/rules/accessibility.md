# Rule · Accessibility (a11y)

WCAG AA+ es el target. Cero `outline: none` sin reemplazo · cero buttons
sin label · contraste validado · respeto a `prefers-reduced-motion` · DOM
seguro (escapeHtml).

## Por qué

Grow es para familias en estados emocionalmente cargados (embarazo,
postparto, llantos del peque) · muchas veces con la mano libre, en mobile,
con poca luz. Accesibilidad no es nice-to-have · es la baseline.

## Reglas

### 1 · Touch targets ≥ 44×44px

Cualquier elemento interactivo (button, link, icon-only) debe tener área
táctil mínima de 44×44 CSS pixels.

```css
.btn-icon-only {
  width: 44px;
  height: 44px;
  /* O bien · más pequeño visualmente + padding invisible */
  padding: 14px; /* asegura 44+ con el icono interior */
}
```

### 2 · Focus rings visibles

NUNCA `outline: none` sin reemplazo. Si el outline default es feo · reemplaza:

```css
/* ❌ NO */
button { outline: none; }

/* ✓ Sí */
button:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

Usa `:focus-visible` (no `:focus`) para evitar mostrar ring en click mouse.

### 3 · Buttons icon-only con `aria-label`

```html
<!-- ❌ NO -->
<button class="book-back"><svg>...</svg></button>

<!-- ✓ Sí -->
<button class="book-back" aria-label="Cerrar libro"><svg aria-hidden="true">...</svg></button>
```

### 4 · Navs con `role` + `aria-current`

```html
<nav class="phone-nav" role="navigation" aria-label="Libro de hitos">
  <button class="nav-tab" aria-current="page">Calendario</button>
  <button class="nav-tab">Hitos</button>
</nav>
```

### 5 · Imágenes con `alt` significativo

```html
<!-- ✓ Si la imagen aporta info -->
<img src="cover-embarazo.jpg" alt="Portada · Libro de embarazo · ilustración de María en su 6º mes">

<!-- ✓ Si la imagen es decorativa -->
<img src="texture.png" alt="">
```

### 6 · Contraste AA+ (≥ 4.5:1 body · ≥ 3:1 large)

Combinaciones validadas:
- `--ink` (#1A1A1A) sobre `--paper` (#FAF7F0) · 14.8:1 ✓
- `--ink` sobre cualquier `--{tono}-subtle` · validado en DS
- `--ink-soft` (#4D4D4D) sobre `--paper` · 7.4:1 ✓
- `--ink-muted` (#888) sobre `--paper` · 3.6:1 · solo para captions ≥18px

Anti-pattern:
- `--ink-faint` (#BFBAA8) sobre `--paper` · ~1.8:1 · solo decorativo
- Texto sobre `--{tono}-base` con `--ink-soft` · valida antes

### 7 · Respeto a `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Aplicar siempre · NO opt-in por componente. Se complementa con
`.agent/rules/motion-canon.md`.

### 8 · `escapeHtml()` en innerHTML

Cualquier string usuario / dinámico que se interpole en innerHTML debe
pasar por `escapeHtml()`:

```js
// helper canónico (existe en prototype.html y homepage/main.js)
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ❌ NO
container.innerHTML = `<h3>${userName}</h3>`;

// ✓ Sí
container.innerHTML = `<h3>${escapeHtml(userName)}</h3>`;
```

### 9 · `aria-hidden` en SVG decorativos

Cuando el SVG es puramente decorativo (icono junto a texto que ya dice
lo mismo):

```html
<button>
  <svg aria-hidden="true">...</svg>
  Cerrar
</button>
```

### 10 · Live regions para feedback dinámico

Si actualizas estado importante via JS · usa `aria-live`:

```html
<div class="status-toast" role="status" aria-live="polite">
  Hito registrado
</div>
```

`polite` para info, `assertive` para errores/alertas.

### 11 · Forms · labels asociados

```html
<!-- ❌ NO -->
<input type="text" placeholder="Nombre del peque">

<!-- ✓ Sí (label visible) -->
<label for="baby-name">Nombre del peque</label>
<input id="baby-name" type="text">

<!-- ✓ Sí (label visualmente oculto pero presente para SR) -->
<label for="search" class="sr-only">Buscar</label>
<input id="search" type="search">
```

### 12 · Modal / sheet · trap focus + Esc

Cuando abre un modal o bottom sheet:
- Focus inicial en el primer elemento focusable interior
- `Tab` no debe salir del modal
- `Esc` cierra
- Al cerrar · devolver focus al trigger

Pattern documentado en `homepage/main.js` (book modal).

## Ejemplos

### ✓ Canon

```html
<button
  class="btn-primary btn-arrow"
  type="button"
  aria-label="Entrar en la lista de espera"
>
  Entra en la lista
  <svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-arrow"/></svg>
</button>
```

```css
.btn-primary:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}
```

### ✗ Anti-canon

```html
<!-- ❌ Icon-only sin label -->
<button><svg>...</svg></button>

<!-- ❌ Outline removed sin reemplazo -->
<style>button { outline: none; }</style>

<!-- ❌ innerHTML sin escape -->
<script>el.innerHTML = `<p>${userInput}</p>`;</script>
```

## Cita ADR

- (Sin ADR formal a11y · reglas aquí + en cada ADR de primitive cuando
  aplica · ADR-0001 incluye focus ring, etc.)

## Workflow

1. Añado / modifico un elemento interactivo
2. Reviso · ¿touch target ≥44px? · ¿focus ring visible? · ¿aria-label si
   icon-only?
3. Si es texto sobre fondo nuevo · valido contraste (DevTools accessibility
   panel)
4. Si meto JS dinámico en innerHTML · `escapeHtml()` siempre
5. Test con keyboard (Tab, Shift+Tab, Esc) · ¿navegable?
6. Test con VoiceOver / NVDA si es flow importante (modal, form crítico)
