# ADR-0012 · Action CTAs card-style · canon de botones de acción primaria

**Status:** Accepted
**Date:** 2026-05-13
**Commit:** `75ee71e` (Hitos carnet rediseño)

## Context

Los botones de acción (`Exportar PDF` · `Compartir` · `Modo emergencia` · etc.) usaban `.vaccine-action` / `.module-action` que son pills básicos (min-height 38px · padding 0 16px · radius 999).

Para acciones secundarias (toggles, jump links) las pills siguen siendo correctas. Pero para CTAs principales (export, share, upgrade) las pills se sienten **planas** · pierden jerarquía visual + no comunican qué hace cada botón sin leer.

## Decision

**Componente canon `card-style CTA`** para acciones principales:

```html
<button class="{libro}-cta primary" type="button" data-open-sheet="...">
  <span class="{libro}-cta-icon">{SVG icon}</span>
  <span class="{libro}-cta-body">
    <strong>Exportar PDF</strong>
    <span>Para pediatra · colegio · viaje</span>
  </span>
  <span class="{libro}-cta-arrow" aria-hidden="true">→</span>
</button>
```

**Anatomy canon:**
- **Card flat** · paper bg + border var(--line) + radius-md
- **Icon left** · 44×44 round/squircle con tonal del libro
- **Body central** · `<strong>` Lenia 500 + `<span>` Helvena caption (subtitle informativo)
- **Arrow right** · → Lenia color ink-muted
- **Hover** · `translateY(-1px)` + border ink-soft
- **Variant `.primary`** · gradient + icon en color tonal solid (mint-base, gold-base, coral-base)
- **Stack vertical** full-width (no row · cada CTA respira)

**Section heads canon (en cards / sections):**
```html
<header class="{libro}-section-head">
  <div>
    <div class="{libro}-eyebrow">EYEBROW · CONTEXT</div>
    <h3>{count} <span class="sub">de {total} {item}</span></h3>
  </div>
  <span class="{libro}-chip {tone}">{badge}</span>
</header>
```

**Progress bar slim** (opcional):
```css
.progress-bar { height: 6px; border-radius: 999px; background: var(--paper-soft); }
.progress-fill { height: 100%; background: var(--mint-base); transition: width 300ms; }
```

**Aplicación canon:**
- Hitos carnet · Exportar PDF + Compartir (primary mint + secondary paper)
- Salud carnet · Exportar PDF + Modo emergencia (primary coral + secondary)
- Futuras CTAs export/share en otros libros

**Pill simple `.X-action`** sigue siendo correcta para:
- Toggles
- Jump links small ("Ver semana a semana →")
- Acciones secundarias inline en cards
- Acciones en sheets

## Consequences

- ✓ Jerarquía visual clara · CTAs principales destacan sin gritar
- ✓ Subtitle informativo · "Para pediatra · colegio · viaje" explica qué hace sin leer modal
- ✓ Icon tonal facilita scan visual
- ✓ Hover lift sutil + border transition · feedback canon DS
- ⚠ Más markup por botón (icon + body + arrow vs un simple span) · razonable por valor visual

## Alternatives considered

- **Pills tradicionales con icon prefix**: pierde subtitle informativo · NO para CTAs principales.
- **Card sin icon · solo body + arrow**: pierde el reconocimiento visual instantáneo · NO.
- **Floating action card (FAB extendido)**: ocupa demasiado · NO en lista de actions.
- **Just bigger buttons**: no es jerarquía es tamaño · NO.
