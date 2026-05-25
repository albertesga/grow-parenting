# Rule · DS canon

Regla #1 de Grow. El Design System (`design/Grow Design System v0.2.html`)
es la **single source of truth** para todos los primitives visuales. Casi
todo está documentado · si lo necesitas, busca antes de crear.

## Por qué

- Mantiene coherencia visual entre landing (marketing) y prototype (app)
- Reduce drift: 1 cambio en DS → propagar a 2 archivos, no 200
- Permite a futuros agentes auditar con `ds-auditor` sin contexto extra
- Evita re-inventar primitives que ya existen (chip, hero, navbar, card)

## Reglas

1. **Antes de crear cualquier `.{algo}` nuevo en CSS** · grep el DS y el
   prototype:
   ```bash
   grep -n "\.{primitive}" "design/Grow Design System v0.2.html" prototype.html homepage/styles.css
   ```
   Si existe en cualquier sitio · **reusa**, no recrees.

2. **NO crees variantes ad-hoc por libro** · `.chip` ya soporta tonos via
   modificador (`.chip.coral`, `.chip.mint`, `.chip.gold`). NO crees
   `.hitos-chip`, `.vacunas-chip`, etc. (anti-pattern ADR-0003).

3. **NO override propiedades canónicas del primitive**:
   - `.book-hero` · `min-height: 120px`, `border-radius: 26px`,
     `padding: 14px` · NO override (ADR-0001)
   - `.chip` active = "vacío" (paper bg + inset 1.5px ink ring) · NO
     fill negro (ADR-0003)
   - `.phone-nav` · FAB central con `transform`-based positioning · NO
     `translateX(-50%)` con child FAB

4. **Si necesitas un primitive nuevo que el DS no documenta**:
   - Valora si justifica una ADR (la mayoría sí)
   - Crea ADR primero (`docs/decisions/{NNNN}-{slug}.md`, template:
     `0000-template.md`)
   - Implementa en DS HTML con sección documentada + demo
   - Luego propaga a prototype y/o landing
   - Spawn `ds-auditor` post-merge

5. **Tras cualquier cambio CSS de primitive canónico** · spawn `ds-auditor`
   para review independiente (`.claude/agents/ds-auditor.md`).

## Primitives clave (catálogo rápido)

| Primitive | Para qué | DS section |
|---|---|---|
| `.book-hero` + tono | Hero card por libro | §A |
| `.chip` + tono | Pills tonales (filtros, view-tabs, escalas) | §E |
| `.phone-nav` + `.{libro}-phone-nav` | Bottom nav dedicado por libro | §B |
| `.book-card` | Card de libro en shelf | §C |
| `.tracker-pill` + `.book-art` | Iconografía + tracker tonal | §D |
| `.timeline-track.tall` + `.timeline-seg.{tono}` | Timeline horizontal hitos | §F |
| `.libro-card` | Card grande con cover + meta (landing) | §G |
| `.comite-card` | Card del comité clínico (landing) | §G |
| `.section-head` | Header editorial con eyebrow + title | §G |
| `.checklist` mint-circle marker | Checklist editorial (ready, setup) | §G |
| `.chip.lean` | Chip con inclinación posicional (landing) | §G |
| `.plan` (pricing) + `.amt` | Pricing card · `.amt` único uso Grift | §G |

## Ejemplos

### ✓ Canon

```html
<!-- Reusa .chip + tono existente -->
<button class="chip mint">Hitos</button>
<button class="chip coral">Embarazo</button>

<!-- Reusa .book-hero + tono -->
<section class="book-hero mint">...</section>
```

### ✗ Anti-canon

```html
<!-- ❌ NO crear chip propio por libro -->
<button class="hitos-chip">Hitos</button>

<!-- ❌ NO override del hero -->
<section class="book-hero mint" style="min-height: 200px; padding: 30px;">

<!-- ❌ NO fill negro para active -->
<button class="chip coral active" style="background: #000;">
```

## Cita ADR

- **ADR-0001** · book-hero canon (min-height, padding, radius)
- **ADR-0003** · chip primitive (tonos, active vacío, NO custom variants)
- **ADR-0013** · post primitives (section-head, checklist, etc.)
- **ADR-0015** · bookstate helpers (compartir state entre libros)
- **ADR-0016** · cross-libro routing (data-goto unificado)

## Workflow

1. Quiero tocar / crear un primitive
2. Grep DS + prototype → ¿existe?
3. Si sí · reusa con modificadores (tono, size, state)
4. Si no · valora ADR + crea en DS primero + propaga
5. Spawn `ds-auditor` tras commit
