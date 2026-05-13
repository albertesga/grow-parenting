---
description: Scaffold de un libro nuevo siguiendo canon Grow · navbar dedicado + book-hero + tabs + state JS. Úsalo cuando el user pida añadir un libro nuevo a la app.
argument-hint: [nombre-libro] [tono] [tabs...]
arguments: bookName tone tabs
---

## Tu tarea

Crear un libro nuevo siguiendo el canon Grow. Pide al user (si no lo
sabes ya):

1. **Nombre del libro** (kebab-case · ej: `salud`, `lactancia`)
2. **Tono canon** según la tabla de CLAUDE.md (mint / coral / gold / blush / lavender / paper-deep)
3. **Tabs internos** (3-4 · ej: Calendario / Patadas / Tensión / Parto)
4. **Categorías para el FAB Log filter** (ej: `['patadas', 'med', 'tension', 'embarazo']`)

## Checklist canon

Sigue ADR-0001 (book-hero) y ADR-0002 (navbar dedicado). En orden:

### 1. Shelf-book entry

En `prototype.html` busca `shelf-book b-{nombre}` o crea uno nuevo en la sección shelf:
```html
<button class="shelf-book b-{libro}" type="button" data-goto="{libro}">
  <div class="sb-eyb">{Libro} · {fuente canon}</div>
  <div class="sb-icon"><svg ...>...</svg></div>
  <h4 class="sb-ttl">Libro de<br><em>{libro}</em></h4>
  <div class="sb-foot"><span class="count">{X}</span><span>{contexto}</span></div>
</button>
```

Actualiza el shelf-counter "N libros".

### 2. Screen markup

Inserta antes del screen perfil (o ubicación lógica) en `prototype.html`:

```html
<section class="screen" data-screen="{libro}">
  <div class="status">...</div>
  <div class="content {libro}-book">
    <div class="top-header">
      <div>
        <div class="eyebrow">{Eyebrow} · {fuente canon}</div>
        <h2 class="screen-title">Libro de {libro}</h2>
      </div>
      <button class="book-back" type="button" data-goto="hoy"
              aria-label="Cerrar libro">
        <svg viewBox="0 0 24 24"><use href="#i-x"/></svg>
      </button>
    </div>

    <!-- Tab content wrappers · primer tab visible, resto hidden -->
    <div data-{libro}-tab="{tab1}">
      <section class="book-hero {tono}">
        <div class="book-hero-kicker">{kicker text}</div>
        <h3>{Nombre niño} · {edad}</h3>
        <p>{1 línea info}</p>
        <div class="book-hero-orb"><img src="design/assets/avatar-mint.png" alt=""></div>
      </section>
      <!-- ... contenido del tab ... -->
    </div>
    <div data-{libro}-tab="{tab2}" hidden>...</div>
    <div data-{libro}-tab="{tab3}" hidden>...</div>
  </div>

  <nav class="phone-nav {libro}-phone-nav" aria-label="Libro de {libro}">
    <button class="nav-tab" type="button" data-{libro}-tab-switch="{tab1}" data-{libro}-tab-id="{tab1}">
      <svg viewBox="0 0 24 24"><use href="#i-{icon}"/></svg>
      <span>{Tab 1}</span>
    </button>
    <button class="nav-tab" type="button" data-{libro}-tab-switch="{tab2}" data-{libro}-tab-id="{tab2}">
      <svg viewBox="0 0 24 24"><use href="#i-{icon}"/></svg>
      <span>{Tab 2}</span>
    </button>
    <div class="nav-tab fab-cell">
      <button class="fab {libro}-fab" type="button" data-log-open data-log-source="{libro}" aria-label="Abrir log de {libro}">
        <svg viewBox="0 0 24 24"><use href="#i-plus"/></svg>
      </button>
      <span class="lbl">Log</span>
    </div>
    <button class="nav-tab" type="button" data-{libro}-tab-switch="{tab3}" data-{libro}-tab-id="{tab3}">
      <svg viewBox="0 0 24 24"><use href="#i-{icon}"/></svg>
      <span>{Tab 3}</span>
    </button>
    <button class="nav-tab" type="button" data-{libro}-tab-switch="{tab4}" data-{libro}-tab-id="{tab4}">
      <svg viewBox="0 0 24 24"><use href="#i-{icon}"/></svg>
      <span>{Tab 4}</span>
    </button>
  </nav>
</section>
```

### 3. CSS tonal del navbar

En el bloque CSS donde están los otros `.{libro}-phone-nav`:
```css
[data-screen="{libro}"] .content { padding-bottom: 110px; }
.{libro}-phone-nav { background: #{tonal-paper-deep}; }
.{libro}-phone-nav .nav-tab.active { color: #{tonal-ink}; }
.{libro}-phone-nav .fab.{libro}-fab {
  background: var(--{tone}-base);
  color: #{darken-ink};
  box-shadow: 0 6px 18px rgba({tone-rgb}, 0.28);
}
```

### 4. JS state + handlers

Añade junto a los otros `set{Book}Tab` (cerca de `setSaludTab`):
```js
let {libro}ActiveTab = '{tab1}';
function set{Libro}Tab(tab) {
  {libro}ActiveTab = tab || '{tab1}';
  document.querySelectorAll('[data-{libro}-tab]').forEach((el) => {
    el.toggleAttribute('hidden', el.dataset.{libro}Tab !== {libro}ActiveTab);
  });
  document.querySelectorAll('.{libro}-phone-nav [data-{libro}-tab-id]').forEach((el) => {
    el.classList.toggle('active', el.dataset.{libro}TabId === {libro}ActiveTab);
  });
  document.querySelector('[data-screen="{libro}"] .content')?.scrollTo({ top: 0, behavior: 'smooth' });
}
```

### 5. Click handler

Cerca del `saludTab` handler:
```js
const {libro}Tab = event.target.closest('[data-{libro}-tab-switch]');
if ({libro}Tab) {
  set{Libro}Tab({libro}Tab.dataset.{libro}TabSwitch);
  return;
}
```

### 6. Dispatch hook

```js
if (name === '{libro}') {
  set{Libro}Tab({libro}ActiveTab);
}
```

### 7. Log filter

```js
const logSourceCategoryFilter = {
  ...,
  {libro}: ['cat1', 'cat2', 'cat3']
};
```

### 8. ADR (si introduce canon nuevo)

Si el libro nuevo introduce un patrón distinto (ej. sub-libros, vista
nueva, etc.) · crea ADR en `docs/decisions/`. Si solo replica el canon
existente, NO necesita ADR.

### 9. Verify + commit

- Corre `/verify-proto` (HTTP 200 + JS OK)
- Spawn `ds-auditor` si quieres review independiente
- Commit `feat(libro-{nombre}): scaffold libro · {tabs} + FAB Log filtrado` + Co-Author Claude
- Push

## Notas

- NO inventes primitives nuevos · reusa `.book-hero`, `.phone-nav`, `.chip` etc.
- NO override `min-height` ni `padding` del `.book-hero` (ADR-0001)
- NO uses fill negro para active de chips (ADR-0003)
- Recuerda accesibilidad: aria-label, role, aria-current
