# ADR-0018 · Dual-stack + deuda DS conocida (duplicación diferida)

**Status:** Accepted
**Date:** 2026-05-28
**Commit:** pending

## Context

Un review completo del repo (mayo 2026) cuantificó duplicación significativa
acumulada tras varias iteraciones rápidas single-dev:

- **Paleta tonal duplicada 5-6×** · `homepage/styles.css` (`:root`),
  `homepage/waitlist.html` (`:root`), `prototype.html` (`:root`),
  `apps/about-us/tailwind.config.ts`, 29 hex hardcoded en `SiteTopbar.tsx`,
  + el DS HTML "single source of truth". Cambiar un color = editar 5-6 sitios.
- **Topbar triplicado** · homepage (styles.css `.topbar`) + waitlist.html
  (CSS inline copiado) + `apps/about-us/components/SiteTopbar.tsx` (`<style jsx>`).
- **Avatar duplicado** · hero homepage (`.hero-avatar*` + filtro `#luma-to-alpha`
  inline en index.html) vs `homepage/assets/mimo-avatar.js` (`.mimo-avatar*` +
  el mismo filtro re-inyectado). El hero NO usa el componente.
- **Fill-on-scroll duplicado** · `FillBlock/FillWord/FillLine` + `COLOR_OFF/ON`
  + scaffolding `useScroll/useSpring` re-declarados en `NarrativeRevealSection`
  y `NarrativeClosingSection` (~80 LOC) · `useSpring` config repetido en 4
  componentes.

El review también confirmó que el harness (rules/skills/ADRs) está bien
estructurado · solo había drift documental (file-structure.md no mencionaba
`apps/about-us`, stack decía "100% vanilla" obviando el build de about-us).

## Decision

1. **Mantener dual-stack** (decisión ya vigente desde ADR-0017, formalizada aquí):
   `homepage/` + `prototype.html` = vanilla sin build · `apps/about-us/` =
   Next.js 16 con build (static export a `homepage/about-us/`).

2. **Limpieza inmediata ejecutada**: borrados ~2.1k LOC de componentes muertos
   en `apps/about-us/components/` (backups `*.codex-*`, `*.arrow.patch`,
   `HandwrittenAsset.tsx` orphan). Harness sincronizado con la realidad
   (file-structure.md regla 9 dual-stack, HANDBOOK stack + map, agents.md,
   implement.md excepción de deps para about-us).

3. **Deuda DS ACEPTADA y diferida** (no se refactoriza ahora · prioridad =
   features sobre dedup hasta estabilizar el DS): la duplicación de paleta,
   topbar, avatar y fill-on-scroll queda como backlog explícito. Cuando se
   aborde, el orden recomendado es:
   - `homepage/tokens.css` único (`:root`) importado por index + waitlist ·
     SiteTopbar → tailwind tokens · tailwind.config documenta que deriva de la
     misma paleta.
   - Topbar a un solo source por stack.
   - Hero homepage usa `MimoAvatar.mount()` (1 avatar, 1 filtro SVG).
   - `<ScrollFillText>` / `useScrollFill` + `useNarrativeScroll(ref)` en about-us.

## Consequences

- ✓ Harness deja de "mentir" · un agente fresco encuentra la estructura real.
- ✓ −2.1k LOC muertos · menos ruido al navegar about-us.
- ✓ La deuda queda explícita y priorizada (no oculta) · decisión consciente.
- ⚠ La paleta sigue duplicada · cambiar un color requiere editar varios sitios
  hasta que se haga el refactor de `tokens.css`. Mitigación · `palette-tonal.md`
  documenta los valores canon · auditar con `/sync-ds` antes de tocar color.
- ⚠ El hero homepage y `mimo-avatar.js` deben mantenerse en sync a mano hasta
  el refactor (documentado en el header de `mimo-avatar.js`).

## Alternatives considered

- **Refactor completo ya** (tokens/topbar/avatar/fill-on-scroll) · rejected ·
  toca código que ya funciona (main.js scroll/halo hooks, 2 narrativas) · riesgo
  de regresión visual alto para un prototype en validación · mejor diferir.
- **Unificar a un solo stack** (todo Next, o todo vanilla) · rejected · el
  homepage vanilla sin build es deliberado (instant serve, cero toolchain) y
  about-us necesita Framer Motion · forzar uno rompería el otro. Ver ADR-0017.
