# ADR-0003 · Chip primitive DS §E · tonal cycle + active "vacío"

**Status:** Accepted
**Date:** 2026-05-11
**Commit:** `8bde453`

## Context

Cada libro tenía su propio chip primitive (`.food-age-chip`,
`.food-filter-chip`, `.pregnancy-view-chip`, `.vaccine-view-chip`,
`.sleep-age-chip`, `.scale-btn`, `.milestone-filter`, etc.) con active
state distinto (la mayoría `module-dark` fill negro sólido).

Las chips de Hoy (`<div class="chips">`) en cambio usaban el primitive
`.chip` canon DS §E · tonal cycle por posición + tilts + active "vacío"
(paper + inset 1.5px ink stroke).

Resultado: el filtro de Hoy se sentía "del producto" mientras los chips
internos de libros se sentían "del prototipo".

## Decision

Unificar TODOS los selectores horizontales (filtros, escalas, view-tabs)
sobre el `.chip` primitive canon DS §E:

- **Tilts** por posición · `nth-child` cycle: `-3deg / 2deg / -2deg / 3deg / -1deg / 2deg`
- **Tonos** por clase · `.coral / .mint / .gold / .blush / .ink / .soft`
- **Active** = "vacío" · `background: var(--paper); box-shadow: inset 0 0 0 1.5px var(--ink)`
- **Premium** = `.chip.premium { opacity: 0.55 }` para gated (Bayley-III)

Clases legacy (`.{book}-chip`) NO se reescriben · pasan a `.chip` directamente
en el JS render con tonal cycle.

Aplicado a:
- Hitos · Escala (Haizea/ASQ/Denver/Wiechen/Bayley) + Tipo (Postural/Lenguaje/etc.)
- Embarazo · view-tabs (Resumen/Patadas/Tensión/...)
- Alimentación · Edad + Filtro
- Salud · Historial filters

## Consequences

- ✓ Mismo lenguaje visual entre Hoy y libros
- ✓ Tonal cycle automático · no hay que pensar el color de cada chip
- ✓ Active state no compite visualmente con hermanos (no es "más fuerte")
- ⚠ El chip cycle compite con el tonal del libro (alimentación coral
  pero chips ciclan en varios tonos) · esto es CANON DS §E intencional

## Alternatives considered

- **Active state coral fill** como antes: contraste alto pero rompe canon · NO.
- **Tonal único del libro** para todos los chips: pierde la "vibration"
  visual que el cycle aporta · NO.
- **Crear `.chip-{book}` per-book**: explosión de variants · ya lo
  hicimos antes y resultó en 6 primitives distintos · NO.
