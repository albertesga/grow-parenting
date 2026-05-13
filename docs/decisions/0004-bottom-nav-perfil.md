# ADR-0004 · Bottom nav · 5ª tab es Perfil (no Hitos)

**Status:** Accepted
**Date:** 2026-05-12
**Commit:** `7f0cdaf`

## Context

El bottom-nav global tenía 5 tabs · Hoy · Calendario · Log (FAB) · Chat · **Hitos**.
La 5ª tab era acceso directo al Libro de Hitos (un libro entre 10).

Problema: el bottom-nav debería tener affordances **globales** (no específicas de un libro). El usuario tiene 10 libros, ¿por qué la 5ª tab apunta a uno solo? Además faltaba un acceso a:
- Identidad del niño activo (datos básicos)
- Cuidadores (cuenta compartida)
- Modos especiales (arcoíris, preemie, monoparental)
- Plan / privacidad / cuenta
- País + emergencias

Conceptualmente Perfil = identidad + configuración global · sí merece slot global.

## Decision

Reemplazar Hitos → **Perfil** en la 5ª tab del bottom-nav global:

- Icon nuevo `#i-user` (circle head + arc shoulders)
- `data-goto="perfil"` apunta al screen nuevo `data-screen="perfil"`
- 10 secciones canónicas (Hero · Niño · Cuidadores · Modos especiales ·
  País + emergencias · Notificaciones · Plan · Privacidad · Cuenta · About)
- Hitos sigue accesible desde el shelf de la biblioteca (libro 1 entre 10)

DS §B Bottom nav actualizado:
- Lista de 5 tabs: Hoy · Calendario · FAB Log · Chat · **Perfil**
- Icon `#i-user` añadido al DS

## Consequences

- ✓ Bottom-nav coherente con la naturaleza global de sus 5 slots
- ✓ Acceso 1-tap a config + identidad + privacidad
- ✓ Multi-niño v1.5 ready (switch entre niños desde Perfil)
- ⚠ Usuarios anteriores acostumbrados a "Hitos" en el navbar deberán
  re-aprender · mitigado porque Hitos sigue siendo el primer libro del shelf

## Alternatives considered

- **Mantener Hitos en navbar**: privilegia un libro arbitrariamente. NO.
- **Diario en navbar**: candidato fuerte (acceso al timeline emocional)
  pero menos config-funcional · v1.5 considera.
- **Sin 5ª tab · solo 4**: rompe el balance simétrico izq/der del FAB. NO.
