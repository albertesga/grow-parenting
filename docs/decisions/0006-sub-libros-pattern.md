# ADR-0006 · Sub-libros · librería anidada bajo libro padre

**Status:** Accepted
**Date:** 2026-05-09 (Cólicos) · 2026-05-12 (Cólicos bajo Salud)
**Commit:** `37d4f62` (Cólicos v2 standalone) · `8b1a522` (sub-libro de Salud)

## Context

Algunos contextos clínicos son **temporales** y **acotados a una etapa** del peque:
- Cólicos (1 sem - 4 m · regla Wessel · período PURPLE NSBSP)
- (Futuro) Alergias confirmadas (tras prueba clínica)
- (Futuro) Dentición (1er diente hasta 24m)
- (Futuro) Asma · TDAH · neurodivergencia (crónicos)

No tienen sentido como libros independientes en el shelf (consumen slot · no aplican fuera de la ventana de edad/contexto). Pero sí merecen UI propia con su canon clínico.

## Decision

**Pattern: sub-libro como entry destacado dentro de un libro padre.**

Implementación:

1. **El sub-libro es un screen propio** · `data-screen="colicos"` (no nested DOM)
2. **El libro padre muestra un entry destacado** con `.health-sublibro-card` (gold sutil · `border 1px rgba(184,151,63,0.32)`) en Hoy del libro padre y/o Educación
3. **El entry tiene CTA "Abrir libro de cólicos →"** que `data-goto="colicos"`
4. **El sub-libro tiene su propia canon** (frames, tabs, navbar si aplica)
5. **El padre cross-refea sin asumir activación** · "Estamos contigo si llega esa etapa"

**Catálogo de sub-libros actual + planeado:**

| Sub-libro | Padre | Status | Trigger |
|---|---|---|---|
| 📕 Cólicos | 🌡 Salud | ✅ v0 | Edad 0-4m + opt-in |
| 📕 Alergias | 🌡 Salud | ⏳ v1.5 | Confirmación clínica |
| 📕 Dentición | 🌡 Salud | ⏳ v1.5 | 1er diente / signos |
| 📕 Asma | 🌡 Salud | ⏳ v2 | Diagnóstico crónico |
| 📕 TDAH | 👤 Perfil / 🌡 Salud | ⏳ v2 | Diagnóstico · cuidado canon |

**CSS canon del entry card:**
```css
.health-sublibro-card {
  background: radial-gradient(...) + linear-gradient(135deg, #F5EFDE, var(--paper-soft));
  border: 1px solid rgba(184,151,63,0.32);
  border-radius: var(--radius-md);
  padding: 14px;
}
.health-sublibro-tag { /* uppercase Lenia 10.5 0.18em color gold */ }
```

## Consequences

- ✓ Shelf permanece compacto (10 libros canónicos · no infla)
- ✓ Familias jóvenes ven Cólicos cuando importa · resto lo ven como "disponible si llega"
- ✓ Cross-ref bidireccional · sub-libro puede acceder al padre
- ✓ Multi-niño v1.5 ready · cada niño puede tener distintos sub-libros activos
- ⚠ Discoverability · el sub-libro no aparece en el shelf · solo desde el padre + Hoy global

## Alternatives considered

- **Sub-libro en shelf**: infla a 13+ libros · NO.
- **Tab dentro del libro padre**: pierde la identidad propia del sub-libro · NO para clínicos serios.
- **Onboarding-style modal full-screen**: roba context · NO.
