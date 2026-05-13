# ADR-0001 · Book-hero primitive canon · 6 tonos

**Status:** Accepted
**Date:** 2026-05-11
**Commit:** `fc3bf22`

## Context

Cada libro tenía su propio hero con CSS distinto (`.milestone-hero`,
`.vaccine-hero`, `.pregnancy-hero`, `.sleep-hero`, `.food-hero`,
`.lactation-hero`, `.growth-cover`). Resultado: 7 hero implementations
distintas, copy diferente, altura inconsistente, sin lenguaje visual
unificado entre libros.

El user pidió que todos los libros tuvieran el mismo componente con
solo el color del libro como variación, alineado con `.avatar-hero` de Hoy.

## Decision

Crear un primitive `.book-hero` canon con 6 tonos:

- `.book-hero.mint` (default · hitos · sueño · perfil · diario)
- `.book-hero.coral` (embarazo · alimentación · cólicos)
- `.book-hero.gold` (vacunas)
- `.book-hero.blush` (lactancia)
- `.book-hero.lavender` (desarrollo)
- `.book-hero.salud` (paper-deep canon AEPap DSI)

Anatomy fija (NO override):
- `min-height: 120px`
- `border-radius: 26px`
- `padding: 14px`
- Background: `radial-gradient(circle at 72% 12%, rgba(232,201,122,0.x), transparent 24%) + linear-gradient(135deg, var(--{tone}-subtle), var(--paper-soft))`
- Hijos: `.book-hero-kicker` (Lenia 10.5 uppercase 0.18em) + `<h3>` (22px) + `<p>` (caption) + `.book-hero-orb` con avatar mint

Las clases legacy (`.milestone-hero`, `.vaccine-hero`, etc.) son aliases
via comma-list selectors, no duplicates.

## Consequences

- ✓ Cambio de cualquier propiedad del hero se propaga a todos los libros
  con una sola edición
- ✓ Multi-niño v1.5 ready (el avatar+nombre del hero ya prepara este path)
- ✓ Mismo lenguaje visual que `.avatar-hero` de Hoy
- ⚠ Override accidental de `min-height` / `padding` / `border-radius` en
  alias rompe el canon (caso del food-hero · resuelto en commit `8fd8fa7`)

## Alternatives considered

- **Sin primitive · cada libro con su CSS**: alta divergencia, doloroso
  cambiar consistencia global. NO.
- **Component web (custom element)**: para HTML estático sin framework, overkill. NO.
- **Body / layout flex con tonal class en el screen**: pierde la independencia
  del primitive y mezcla layout con identidad. NO.
