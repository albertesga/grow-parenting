# ADR-0016 · Cross-libro routing · pattern `data-goto` global

**Status:** Accepted
**Date:** 2026-05-13
**Commit:** PATTERNS.md (canon implícito previo)

## Context

Grow tiene 11 libros + screens auxiliares (chat, chat-3am, salud-emergencia, log-registro, etc.). Navegar entre ellos requiere un mecanismo único:
- Dispatch screen activation
- Reset scroll
- Trigger render del libro destino
- Optional · setear sub-vista inicial

El prototype ya usa `data-goto="X"` como pattern de facto en TODAS las navegaciones. Falta documentarlo como ADR canónico.

## Decision

**Pattern canon · `<button data-goto="X">` + dispatch table global.**

### Markup

```html
<button data-goto="hitos">→ Libro de hitos</button>
<button data-goto="salud-emergencia">📱 Modo emergencia</button>
<button data-goto="chat">Hablar con chat IA</button>
```

Cualquier element interactivo (button, a, div role=button) puede usar `data-goto`. Sin lógica embebida.

### Dispatch (línea ~15600 en prototype.html · `goTo(name, options)`)

```js
function goTo(name, options = {}) {
  // 1. closeSheet (cualquier sheet abierta)
  // 2. toggle .active screens
  // 3. reset scrollTop del .content
  // 4. update aria-current per nav-tab (botones globales)
  // 5. trigger render del libro/screen destino
}
```

Render dispatch · cada screen con render dinámico (libros) llama su función en `goTo` si `name === 'X'`:
```js
if (name === 'hitos') { setMilestoneView(bookState.milestone); }
if (name === 'salud') { setSaludTab(saludActiveTab); }
if (name === 'embarazo') { renderPregnancyBook(); updatePregnancyNavActive(); }
// ...
```

### Sub-vista inicial · `data-{libro}-view-set` companion attribute

Para abrir un libro DIRECTAMENTE en una sub-vista específica:

```html
<!-- Shelf-book de vacunas · abre tab Calendario por defecto -->
<button data-goto="vacunacion" data-vaccine-view-set="home">📕 Libro de vacunas</button>

<!-- Chat tool-card · abre vacunas tracker fiebre 72h directamente -->
<button data-goto="vacunacion" data-vaccine-view-set="tracker">🌡 Tracker fiebre</button>
```

Dispatch lo lee del `gotoButton.dataset.vaccineViewSet` y lo pasa a `goTo()` via options:
```js
goTo(name, {
  vaccineView: gotoButton.dataset.vaccineViewSet,
  pregnancyView: gotoButton.dataset.pregnancyViewSet,
  foodView: gotoButton.dataset.foodViewSet,
  sleepView: gotoButton.dataset.sleepViewSet,
  // ...
});
```

### Cross-ref entre libros · examples canónicos

| Origen | Destino | Trigger |
|---|---|---|
| Hoy shelf | Cualquier libro | `data-goto="libro"` |
| Bottom-nav | Hoy/Calendario/Chat/Perfil | `data-goto="..."` |
| Sub-libro card (Salud) | Cólicos | `data-goto="colicos"` |
| Modo emergencia (Salud Carnet) | `salud-emergencia` (full-screen) | `data-goto="salud-emergencia"` |
| Chat triage outcome | Libro Salud sugerido | `data-goto="salud" data-salud-tab-set="historial"` (futuro) |
| Quick log FAB | `log-registro` con type preseleccionado | `data-log-open data-log-type="X"` (variant pattern) |

## Reglas canon

1. **TODA navegación entre screens usa `data-goto`** · NO `window.location` · NO `pushState`
2. **NO embed lógica en el handler** · el handler solo dispara `goTo(name)`
3. **Sub-vista inicial via `data-{libro}-view-set`** (no via JS pre-call)
4. **Multi-attr permitido** · `data-goto="X" data-X-view-set="Y" data-Y-tab-set="Z"` para deep-links anidados
5. **Screen IDs canon** · `hitos · vacunacion · desarrollo · embarazo · alimentacion · lactancia · sueno · salud · salud-emergencia · colicos · diario · perfil · chat · chat-3am · hoy · calendario · log-registro · onboarding-X`

## Consequences

- ✓ 1 pattern para TODA la navegación · DOM-driven
- ✓ Markup declarativo · cero JS inline
- ✓ Cross-ref bidireccional trivial (cualquier botón a cualquier screen)
- ✓ Test E2E facilísimo · `[data-goto]` es un selector canónico
- ✓ Deep-linking ready · URL pattern `grow.app/X` → mapea a `data-goto="X"` (canon ADR-0014 App Clips)
- ⚠ El dispatch table crece con cada libro nuevo · vive en una sola function `goTo()` · OK
- ⚠ `data-X-view-set` proliferation · 5+ atributos hoy (vaccineView, pregnancyView, foodView, sleepView, etc.) · podría unificarse a `data-view-set` genérico v2 (no urgente)

## Alternatives considered

- **History API + URL routing**: overkill para single-page HTML estático · NO en v0.
- **Click handlers inline `onclick="goTo('X')"`**: pierde el declarativo + harder a auditar · NO.
- **React Router-style routes**: tampoco hay framework · NO.
- **Direct DOM manipulation** (sin dispatch table): falla cuando un screen necesita render dinámico · NO.

## Pattern v1.5+ (cuando migre a React)

Cuando Grow migre a framework (Next/Astro), el pattern se traduce a:
- `<Link to="/hitos">` (React Router)
- `data-goto` se queda como semántica del producto (analytics, e2e tests)
- bookState se mueve a Zustand/Jotai con misma shape

ADR-0014 (App Store distribución) ya prepara este path · App Clips también usan URLs `grow.app/X`.
