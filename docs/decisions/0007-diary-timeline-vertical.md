# ADR-0007 · Diary timeline · primitive vertical reusable

**Status:** Accepted
**Date:** 2026-05-11
**Commit:** `fb66424` (skeleton) · `e059da0` (lanes fix)

## Context

El diario era un sheet stub (`data-open-sheet`) sin contenido real. Conceptualmente debería ser un timeline cronológico de TODOS los logs del peque (toma · biberón · pañal · sueño · síntoma · nota · foto · vacuna · hito · medida).

Necesidad: componente que pueda mostrar entries de cualquier tipo agrupadas por día, con jerarquía visual clara (hora + dot tonal + card derecha).

## Decision

**Componente `.diary-timeline` · 3 lanes horizontales:**

```
0────32px ── 40px ──── 54px ── 64px ──── card
[ TIME → ]  gap  [ ◯ rail + dot ]  gap  [card body]
                     ↑ centrado en x=47
```

- **Lane 1** (0-32px) · time text right-aligned · tabular nums · Lenia 10.5
- **Gap 8px** entre time y dot
- **Lane 2** (40-54px) · rail vertical 2px + dot tonal 14px visible (10 + border 2px) centrado en x=47
- **Gap 10px** entre dot y card
- **Lane 3** (64+) · entry card con icon tonal + title Lenia + detail Helvena + author/source

**Grupos por día:**
- `.diary-day-label` con dot 16px (12 + border 2px) en el rail · uppercase Lenia 11px 0.18em
- Labels: "Hoy" · "Ayer" · "{N nov}" via lookup table `diaryDayLabelES`

**4 tonos por categoría** (driven by inline custom props):
- `tone-mint` · toma · lactancia · sueño · hito (continuidad/wellness)
- `tone-coral` · síntoma · temperatura · antitérmico · patadas · tensión (clínico/alerta)
- `tone-gold` · vacuna (institucional)
- `tone-blush` · nota · foto · medida · biberón · pañal (lifestyle/registro)

**Single source of truth** · reusa `logEntries` array. Cuando se registra desde cualquier FAB del prototipo, aparece directamente en el diario.

## Consequences

- ✓ Componente reusable · podría aparecer en otros libros (Hitos timeline de cribaje · etc.)
- ✓ Tonal cycle visual identifica tipo de entry a primera vista
- ✓ Lanes calculadas evitan solapes (lección: time + dot solapaban antes · commit `e059da0`)
- ✓ Single source con logEntries · cero duplicación de datos
- ⚠ Diary day labels dependen de lookup hardcoded (`diaryDayLabelES`) · v1.5 derivar de fecha real

## Alternatives considered

- **Cards apiladas sin rail**: pierde el sentido temporal · NO.
- **Tabla columnar**: mobile-unfriendly · NO.
- **Reuse de `.health-history-group` (Salud)**: distinta semántica (Salud es clínico episódico, Diario es lifestyle continuo) · NO.
- **Lanes con flexbox sin position absolute**: time text colisionaba con dot · NO funcional.

## Anti-pattern detected

Original implementation tenía `padding-left: 56px` con `time at left:-56 width:38` y `dot at left:-39`. Time text terminaba en x=38, dot empezaba en x=15 (visual). Solape de 13px que tapaba dígitos del time. Fix: padding 64 + width 32 + dot reposicionado a center 47.
