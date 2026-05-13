# ADR-0010 · Log filter por source · `logSourceCategoryFilter`

**Status:** Accepted
**Date:** 2026-05-11 → 2026-05-12 (rollout progresivo)
**Commit:** `0767ddf` (Vacunas) · `b851b32` (Embarazo) · `cf3102e` (Sueño) · `dea3ef2` (Alimentación) · `8b1a522` (Salud)

## Context

El FAB Log central global muestra 19 categorías (toma · biberón · pañal · sueño · síntoma · med · vacuna · hito · nota · foto · medida · alimento · patadas · tensión · temperatura · antitérmico · lactancia · extracción · embarazo). Útil desde Hoy donde el contexto es amplio · ABRUMADOR desde un libro específico donde solo aplican 2-4 categorías.

Ejemplo: estás en el Libro de Sueño, abres FAB Log · ves 19 opciones · solo necesitas Sueño · Toma · Pañal · Síntoma.

## Decision

**`logSourceCategoryFilter` · map de source → array de category ids** que filtra el log sheet cuando se abre desde un libro específico.

```js
const logSourceCategoryFilter = {
  vacunacion:   ['vacuna', 'temperatura', 'antitermico', 'sintoma'],
  embarazo:     ['patadas', 'med', 'tension', 'embarazo'],
  sueno:        ['sueno', 'toma', 'panal', 'sintoma'],
  alimentacion: ['biberon', 'alimento'],
  hitos:        ['hito']  // implícito por openLog con type=hito skipea selector
  // sin entry = 19 categorías completas (Hoy, Calendario, etc.)
};
```

**Función helper:**

```js
function getLogCategoriesForSource(source) {
  const ids = logSourceCategoryFilter[source];
  if (!ids) return logCategories;  // sin filtro · all 19
  const order = new Map(ids.map((id, i) => [id, i]));
  return logCategories
    .filter((c) => order.has(c.id))
    .sort((a, b) => order.get(a.id) - order.get(b.id));  // respeta orden declarado
}
```

**`renderLogSheet()`** usa `filtered = getLogCategoriesForSource(logActive.source)` con copy contextual: *"Categorías filtradas al scope de este libro."*

**Patrón de uso · FAB del libro:**

```html
<button class="fab {libro}-fab" type="button"
        data-log-open data-log-source="{libro}"
        aria-label="Abrir log de {libro}">
```

## Consequences

- ✓ Cognitive load mínimo desde libro específico
- ✓ Mantiene single source of truth · `logCategories` array completo no se fragmenta
- ✓ Order preserved · `['patadas', 'med', 'tension']` muestra Patadas primero
- ✓ Fallback canónico · sin entry = todas las categorías (Hoy, Calendario, Log central, Diario)
- ⚠ Categorías hardcoded · cambios de scope requieren editar el map · v1.5 derivable de DS metadata

## Alternatives considered

- **Filter dinámico via tags en `logCategories`**: cada categoría con `appliesTo: ['vacunacion', 'sueno']` · más declarativo pero el config invertido es más legible · NO.
- **Sub-arrays por libro en `logCategories`**: duplica datos · NO.
- **Sin filtro · siempre 19**: abruma · NO.
- **Filter via JS condition por libro**: dispersa · NO. El map central es testable + auditable.
