# ADR-0011 · Trauma-informed copy canon · cero gamification · cero rojo médico

**Status:** Accepted
**Date:** 2026-05-08 (canon Fase 0 PRD) · aplicado en todos los commits desde
**Commit:** `cdb5779` (Chat) · `37d4f62` (Cólicos NSBSP) · `8b1a522` (Salud) · varios

## Context

Apps de parenting tienden a 3 anti-patterns:
- **Gamification tóxica** · streaks, badges, "¡felicidades por X racha!"
- **Alarmismo médico** · rojo agresivo, "¡PELIGRO!", interrupciones modales
- **Diminutivos forzados + militancia** · "tu hij@-cito", "como buena mami...", LM-vs-biberón judgmental

Estos enfoques son contraproducentes en momentos de crisis (3AM crying, post-pérdida arcoíris, primer parto, etc.).

Research: NSBSP PURPLE crying canon, EPDS antenatal/postnatal validation Cox 1987, ACOG perinatal mental health.

## Decision

**Canon · 6 reglas hard:**

### 1. Cero gamification tóxica

- ❌ "¡Llevas 5 días sin perder!"
- ❌ "Racha de 12 hitos · sigue así"
- ❌ Badges · stars · trophies
- ❌ Comparativas con otros hij@s
- ✓ Estado vacío saludable es **positivo**: *"Aquí registramos lo que pasa · cuando pase. No es un libro que tenga que estar lleno."*

### 2. Cero rojo médico

- ❌ Fill rojo `#FF0000` o `red` puro
- ❌ Triángulos de alerta con borders rojos sangrientos
- ✓ **`coral-base`** para urgencias reales (112, anafilaxia · solo donde aplica)
- ✓ **`coral-subtle / blush-subtle`** para advertencias menores
- ✓ Modo emergencia Salud · borders coral 1.5px · NO fill rojo

### 3. Cero militancia · cero juicio

- ❌ "La lactancia materna es lo mejor"
- ❌ "El método X es el único correcto"
- ✓ "Como salga. Y si no sale, también." (Lactancia hero)
- ✓ "Cero juicio. Seguridad, variedad y ritmo familiar." (Alimentación)
- ✓ Respeto decisiones familias · cólico = colecho + cuna + 5 S's todos válidos

### 4. Cita clínica con fuente + año

- ❌ "Los expertos dicen que..."
- ❌ "Estudios demuestran..."
- ✓ "NICE NG143 · 2021" pill canónico
- ✓ "Wessel 1954" para regla cólicos
- ✓ "AEPED CAV 2026" para vacunas
- ✓ Footer fuentes en cada libro de Educación

### 5. Lenguaje trauma-informed

- ❌ "Tu hij@ está enfermo"
- ❌ "Has fallado en..."
- ❌ "Deberías..."
- ✓ "Aquí no diagnosticamos · aquí estamos" (sticky disclaimer chat)
- ✓ "Hiciste lo correcto al venir aquí" (3AM follow-up)
- ✓ "Lola: 3 otitis en 6 meses. Es común a esta edad, pero quizás vale la pena que tu pediatra eche un vistazo. ¿Te preparo un resumen?" (pattern alert · sugerencia no afirmación)
- ✓ "Nunca sacudas al bebé. Ni siquiera 1 segundo." (NSBSP canon directo)

### 6. Modo arcoíris (post-pérdida)

- ❌ "¡Felicidades semana 28!"
- ❌ Confetti animations
- ✓ Tone tonal coral-subtle (sin alegría performativa)
- ✓ "Cero confetti · sin felicidades semana X · contenido factual + validación emocional"
- ✓ Toggle opt-in en Perfil + Onboarding · cambia solo tono y contenido, nunca limita funciones

## Consequences

- ✓ Diferenciador canon vs apps comerciales (Solid Starts · BLW Babies · Sleep apps)
- ✓ Familias en momentos vulnerables se sienten acompañadas, no juzgadas
- ✓ Pediatras valoran el lenguaje preciso con citas
- ⚠ Tentación de "softness" excesiva · canon requiere también directez cuando aplica (NSBSP "nunca sacudas")
- ⚠ Pasa de moda si llega "Mimo Premium" con gamification · resistir

## Alternatives considered

- **Tone neutro técnico**: pierde la "doula bilingüe" feel · NO.
- **Tone overly soft**: pierde directez crisis (NSBSP) · NO.
- **Gamification light (streaks opt-in)**: una vez abierta la puerta es difícil cerrarla · NO en v0.
