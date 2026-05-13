# ADR-0008 · Pantalla Perfil · identidad + config global · 10 secciones

**Status:** Accepted
**Date:** 2026-05-12
**Commit:** `7f0cdaf` (Perfil + DS) · `057c513` (cleanup b-medicacion)

## Context

Antes existía un "libro" `b-medicacion` ("Familia & medicación") en el shelf que NO era libro · era un log shortcut `data-log-open data-log-source="hoy"`. Confundía la metáfora (shelf = libros navegables).

Además faltaba un sitio canónico para:
- Identidad del niño activo + multi-niño v1.5
- Cuidadores · cuenta compartida
- Modos especiales (arcoíris · preemie · monoparental)
- Plan · privacidad · cuenta · país
- Notificaciones por libro

## Decision

**Crear screen Perfil** con 10 secciones canon:

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | Avatar Lola · nombre · 18m · medidas (book-hero mint canon) |
| 2 | Niño | Nombre · fecha nac · sexo · medidas + CTA Añadir otro niño (v1.5) |
| 3 | Cuidadores | Lista María (admin) + Pablo · CTA Invitar a otra persona |
| 4 | Modos especiales | 🌈 Arcoíris · 🐣 Preemie · 💪 Monoparental (toggles iOS-style) |
| 5 | País + emergencias | 🇪🇸 ES · 112 · 024 (auto-detect via navigator.language) |
| 6 | Notificaciones | Por libro: Vacunas · Sueño · Hitos · Modo 3AM (toggles) |
| 7 | Plan | Free actual + CTA Mejorar a Premium (callout coral) |
| 8 | Privacidad | Solo local · Compartir pediatra · Analytics + Export JSON GDPR |
| 9 | Cuenta | Email · Cambiar password · Cerrar sesión · Eliminar cuenta (danger) |
| 10 | Sobre Grow | Versión · Privacidad · Términos · Feedback |

**Componentes nuevos:**
- `.profile-section` · card paper bordered con head uppercase + list
- `.profile-row` · clickable + static variants · stack multi-line
- `.profile-avatar` · 36×36 round con iniciales tonales
- `.profile-toggle` + `.profile-switch` · iOS-style toggle 36×20 (mint-base cuando active)
- `.profile-action` · ghost/coral/danger variants
- `.profile-plan-card` · upgrade CTA con gradient coral

**Bottom navbar:** 5ª tab reemplaza Hitos → Perfil (ver ADR-0004).

**Multi-niño v1.5 ready** · "Niño activo" sección + CTA "Añadir otro niño" preparan el switch.

## Consequences

- ✓ Identidad + config son globales (no por libro) · slot navbar coherente
- ✓ Cleanup del shelf (10 → 10 con uno reemplazado · b-medicacion era basura)
- ✓ GDPR export + privacy controls visibles · prep compliance
- ✓ Multi-niño v1.5 arquitectónicamente listo
- ⚠ Los toggles NO persisten (mock UI) · v1 enchufar a localStorage o Supabase

## Alternatives considered

- **Settings en sheet pop-up desde Hoy**: pierde discovery · NO.
- **Per-libro settings**: fragmenta · cambiar nombre de Lola desde Sueño? · NO.
- **Mantener Hitos en navbar**: privilegia un libro arbitrariamente · NO (ADR-0004).
