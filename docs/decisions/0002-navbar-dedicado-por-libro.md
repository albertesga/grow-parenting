# ADR-0002 · Navbar dedicado por libro · 4 tabs + FAB Log central

**Status:** Accepted
**Date:** 2026-05-11
**Commit:** `0767ddf` (Vacunas) · `11e7486` (Hitos) · `b851b32` (Embarazo) · `cf3102e` (Sueño) · `dea3ef2` (Alimentación) · `8b1a522` (Salud)

## Context

El bottom-nav global (Hoy · Calendario · Log · Chat · Perfil) sirve para
navegar entre módulos pero no para navegar DENTRO de un libro. Los libros
complejos tenían sub-navs ad-hoc (`pregnancy-view-chip`, `vaccine-view-chip`,
nav-cards de 5 items, etc.) que crecían sin canon común.

## Decision

Cada libro tiene su propio **navbar dedicado al fondo** con la misma estructura:

- **4-5 tabs** según el libro (mínimo 2 + FAB)
- **FAB Log central** con sheet filtrado a categorías relevantes al libro
- **Tonal del libro** · paper-soft tinted del color canon (mint/coral/gold/blush/paper-deep)
- **Same 76px height** que el global navbar · pero contenido en el screen del libro

Implementación:
- `<nav class="phone-nav {book}-phone-nav">` después del `<div class="content">` del libro
- `[data-screen="{libro}"] .content { padding-bottom: 110px }` para evitar overlap
- State JS · `{book}ActiveView` + `set{Book}View(view)` + `update{Book}NavActive()`
- Click handler genérico vía `data-{book}-view-switch="X"` o `data-{book}-view="X"`
- Sub-vistas drill-down highlight su tab padre lógico
- `logSourceCategoryFilter[libro]` para filtrar el log sheet

Libros con navbar dedicado:
- Vacunas (gold) · Calendario · Fiebre · Carnet · Settings
- Hitos (mint, 3 tabs centered) · Hitos · Log · Carnet
- Embarazo (coral) · Calendario · Patadas · Tensión · Parto
- Sueño (mint nocturno) · Ahora · Esquema · Semana · Plan
- Alimentación (coral) · Alimentos · Alérgenos · Recetas · Plan
- Salud (paper-deep) · Hoy · Historial · Carnet · Educación

## Consequences

- ✓ Patrón canónico replicable · usuario reconoce la estructura
- ✓ Mismas affordances en cada libro
- ✓ Log filter automático por contexto del libro
- ⚠ El navbar canon `repeat(5, 1fr)` con FAB-cell asume ciertos child transforms · centrar con `width:max-content + margin-inline:auto` rompía con `translateX(-50%)` (commit `2a39901` · `fd05fde`)

## Alternatives considered

- **Sub-nav arriba como chip-strip**: peor descubribilidad, conflicto con
  scroll vertical. NO.
- **Single navbar global + state contextual del libro**: rompe la separación
  conceptual (módulo vs libro). NO.
- **Tabs en el top-header**: ocupa mucho hero, conflicto con book-back. NO.
