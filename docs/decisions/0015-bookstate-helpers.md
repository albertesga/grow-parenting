# ADR-0015 · bookState + generic helpers · canon centralización JS

**Status:** Accepted
**Date:** 2026-05-13
**Commit:** `ff2cd78`

## Context

Tras consolidar todos los libros con navbar dedicado (canon ADR-0002), el código JS tenía duplicaciones masivas:

- 5 variables globales `xActiveView` (vaccine/milestone/sleep/food/pregnancy)
- 5 funciones `setXView()` casi idénticas
- 5 funciones `updateXNavActive()` con misma estructura
- 5 maps `parents` duplicados con sub-vista → tab parent mapping
- ~33 referencias scatter de variables globales

Cada libro nuevo replicaba estos patrones · drift compound + mantenibilidad pobre · cambios en la lógica de nav requerían 5 ediciones paralelas.

## Decision

**Patrón canon centralizado · `bookConfig` + `bookState` + 2 helpers genéricos.**

### `bookConfig` · metadata por libro (canon source)

```js
const bookConfig = {
  milestone: { screenId, navClass, tabAttr, tabSelector, defaultView, parents: null },
  sleep:     { ..., parents: { now: 'now', sweetspot: 'now', ... } },
  food:      { ..., parents: { ... } },
  pregnancy: { ..., parents: { ... } },
  vaccine:   { ..., parents: { home: 'home', detail: 'home', ... } }
};
```

Cada libro declara su metadata en UN solo lugar. Sub-vistas drill-down (detail, dose, education) se mapean al tab padre via `parents`.

### `bookState` · state object centralizado

```js
const bookState = {
  milestone: 'home', sleep: 'now', food: 'alimentos',
  pregnancy: 'calendario', vaccine: 'home'
};
```

Sustituye 5 variables globales. Acceso: `bookState.X` · mutación: `bookState.X = view`.

### 2 helpers genéricos

```js
function setBookView(book, view, renderFn) {
  // 1. update state · 2. render callback · 3. update nav · 4. scroll top
}
function updateBookNavActive(book) {
  // querySelectorAll del navbar · toggle .active · respeta parents map
}
```

### Migración funciones existentes · wrappers thin

```js
// Antes (15 líneas):
function setSleepView(view) {
  sleepActiveView = view || 'now';
  renderSleepBook();
  updateSleepNavActive();
  document.querySelector('[data-screen="sueno"] .content')?.scrollTo({ top: 0, behavior: 'smooth' });
}
function updateSleepNavActive() { /* parents map · forEach · toggle */ }

// Después (2 líneas):
function setSleepView(view)         { setBookView('sleep', view, renderSleepBook); }
function updateSleepNavActive()     { updateBookNavActive('sleep'); }
```

## Reglas canon

1. **Cualquier libro nuevo añade 1 entry a `bookConfig` + 1 entry a `bookState`** · NO crear `setXView` desde cero
2. **Sub-vistas drill-down** se mapean en `bookConfig.X.parents` (no en JS hard-coded)
3. **`setBookView` SIEMPRE** dispara render + nav-active + scroll · NO bypass
4. **Render callback opcional** · si el libro tiene render condicional (milestone hidden toggles), pasar custom function
5. **Wrappers thin** (1-2 líneas) · mantener contratos `setXView()` / `updateXNavActive()` para legacy compat

## Consequences

- ✓ 1 lugar para cambios de nav logic (no 5)
- ✓ Cada libro nuevo: -15 líneas (no setXView ni updateXNavActive duplicados)
- ✓ Skill `/new-book` simplificada · solo añade bookConfig entry
- ✓ Debugging trivial · `console.log(bookState)` muestra todos los views
- ✓ Pattern extensible · futuras lift-ups (renderBookViewHead, renderScreenHeader) pueden reusar bookConfig metadata
- ⚠ `setMilestoneView` requiere custom render callback (toggle hidden de 4 wrappers) · no es un wrapper plano · canon válido
- ⚠ Si el bookState se inicializa después de algún use site temprano · TDZ error · mitigación: declaration al top del IIFE

## Alternatives considered

- **Class-based approach** (`class Book {}`): overkill para HTML estático sin bundler · NO.
- **Reactive state library** (proxy/observable): tampoco usa framework reactivo · NO.
- **Solo refactor de setXView, mantener vars globales**: pierde el beneficio del state centralizado · NO.
- **Map of render functions también centralizado**: complica el API · mejor delegar a callback · NO.

## Patrón skill /new-book actualizado

Cuando añadas un libro nuevo en `/new-book`, añade:

```js
bookConfig.newbook = {
  screenId: 'newbook',
  navClass: 'newbook-phone-nav',
  tabAttr: 'newbookTab',
  tabSelector: 'data-newbook-tab',
  defaultView: 'home',
  parents: null  // o map si tiene sub-vistas
};
bookState.newbook = 'home';

function setNewbookView(view) { setBookView('newbook', view, renderNewbookBook); }
function updateNewbookNavActive() { updateBookNavActive('newbook'); }
```

Cero CSS · cero lógica · cero forEach. Canon canon canon.
