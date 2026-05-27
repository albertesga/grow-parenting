# Rule · Copy canon

Todo copy user-facing en Grow sigue el canon **trauma-informed** definido
en ADR-0011. Aplica a microcopy, headlines, body text, sheet copy, error
messages, aria-labels, alt text.

## Por qué

Grow trata temas con carga emocional alta · embarazo, parto, pérdida,
lactancia, primeros 3 años. El copy convencional de productos digitales
(gamification, urgencia, juicio implícito) hace daño real a usuarios en
estados vulnerables. Trauma-informed es una decisión de producto, no de
estilo · y se enforza con `copy-auditor`.

## Reglas (6 reglas duras)

### 1 · Cero gamification tóxica

Prohibido:
- "racha", "streak", "llevas N días", "sigue así", "enhorabuena"
- "puntos", "badge", "achievement", "level up"
- "mantente al día", "no pierdas", "no falles"

Canon: estado vacío saludable es positivo · "Aquí registramos lo que pasa
· cuando pase".

### 2 · Cero rojo médico

Prohibido en CSS o inline styles:
- `#FF0000`, `#F00`, `red` puro, `color: red`, `background: red`

Canon:
- Urgencias · `var(--coral-base)` para texto, `var(--coral-strong)` para CTAs
- Advertencias · `var(--coral-subtle)` para fondo de callout
- NUNCA fill rojo sólido

### 3 · Cero militancia / juicio

Prohibido:
- "es lo mejor", "es lo correcto", "deberías", "tienes que"
- "el único método", "la verdad es", "la realidad es"
- Comparativas con peso ("Lola va detrás del N%", "por debajo de la media")

Canon: "Como salga. Y si no sale, también." · "Cero juicio · seguridad,
variedad y ritmo familiar."

### 4 · Cita clínica obligatoria con fuente + año

Prohibido:
- "los expertos dicen", "estudios demuestran", "según los estudios"
- "científicamente probado", "investigaciones recientes"

Canon: cita explícita con fuente + año.
- `NICE NG143 · 2021`
- `Wessel 1954`
- `AAP Bright Futures · 2024`
- `EPDS Cox · 1987`
- `Haizea-Llevant · 1991`

Si no hay fuente con año · NO es post canon · es nota informal.

### 5 · Lenguaje trauma-informed

Prohibido:
- "tu hij@ está enfermo", "padece", "sufre de"
- "has fallado", "no lo hiciste bien"
- "patrón anormal", "alteración", "trastorno" (sin fuente clínica)

Canon:
- "Vamos a por la otitis · día 3 de antibiótico"
- "Hiciste lo correcto al venir aquí"
- "Puede valer la pena hablar con tu pediatra"
- "Nunca sacudas al bebé. Ni siquiera 1 segundo." (NSBSP canon directo · OK)

### 6 · Modo arcoíris compliance

Si el copy aparece en pregnancy book y `pregnancyRainbowMode` está activo ·
NO debe haber:
- "¡Felicidades semana X!"
- Confetti animations
- "¡estás cerca!"
- Alegría performativa

Canon: tono blush-subtle · validación emocional sin alegría performativa ·
ruta rápida a duelo perinatal.

### 7 · Wording regulatorio · cero "triage" + NSBSP en contexto correcto

Grow no es un dispositivo médico Class IIa. Cierto wording dispara
MDR Rule 11 (clasificación europea de software como medical device) y
pone toda la app en una categoría que NO queremos asumir hoy.

**PROHIBIDO** · cualquier user-facing copy (landing, app, sheets, emails,
ads, push, alt text, aria-label, error messages, meta description):

| Palabra | Por qué prohibida |
|---|---|
| `triage`, `triaje` | Disparador directo MDR Class IIa Rule 11 |
| `te ayuda a decidir`, `decide por ti` | Frame de "decisión clínica" |
| `diagnostica`, `diagnóstico` | Acto médico reservado |
| `valora clínicamente`, `evaluación clínica` | Acto médico reservado |
| `recomendamos` (en contexto salud) | Acto profesional sanitario |
| `protocolo de triage` | Doble triggering |

**CANON · orientación informativa**:
- "te ayudamos a entender qué dicen las guías"
- "te orientamos"
- "te mostramos lo que dice [NICE/AEPED/etc]"
- "información basada en [guía + año]"
- "decide tú qué hacer"  ← deja la agencia en el user, no en la app
- "qué dicen las guías sobre lo que estás viendo"

**NSBSP** · National Center on Shaken Baby Syndrome Prevention. Es un
**marco de prevención educativa anti-shaken-baby** (justifica el chip
"No puedo más" en Modo 3 AM como ruta de relevo del cuidador agotado).

**NSBSP · uso correcto** (✓):
- "marco anti-shaken-baby NSBSP"
- "información NSBSP sobre cuidador agotado"
- "Nunca sacudas al bebé. Ni siquiera 1 segundo." (canon directo)

**NSBSP · uso incorrecto** (✗ · imprecisión clínica que un pediatra detecta):
- "protocolo de triage NSBSP"   ← NSBSP NO es protocolo de triage
- "escala validada NSBSP"        ← NSBSP NO es una escala
- "estandar NSBSP de evaluación" ← NSBSP NO evalúa, previene

**Citas clínicas correctas** para sostener el contenido del Modo 3 AM
sin entrar en Class IIa:
- `NICE NG143 (2021)` · sepsis recognition
- `AEPED 2026` · pediatría española
- `AAP 2026` · pediatría americana
- `EAPM` · medicina perinatal
- `NSBSP` (solo como marco anti-shaken-baby, ver arriba)

**Si necesitas decir "triage" porque hablas del producto interno**,
escala al user (ver `.agent/rules/escalation.md`) · es decisión legal
+ producto, no de copy. Por defecto, sustituye por "orientación".

## Tabla de sustituciones rápidas

| Anti-canon | Canon |
|---|---|
| "¡Llevas 5 días!" | "Aquí registramos lo que pasa · cuando pase" |
| "Racha de N hitos" | "N logrados · de M hitos" |
| `color: red` | `color: var(--coral-strong)` |
| "Los expertos dicen…" | "NICE NG143 · 2021" (fuente con año) |
| "Tu hij@ está enfermo" | "Vamos a por la otitis · día 3 de antibiótico" |
| "La lactancia materna es lo mejor" | "Como salga. Y si no sale, también." |
| "Patrón anormal" | "Puede valer la pena hablar con tu pediatra" |
| "¡Felicidades semana 8!" (rainbow) | "Semana 8 · estamos aquí" |
| "triage en madrugadas" | "orientación en madrugadas" |
| "Te ayuda a decidir si…" | "Te ayudamos a entender qué dicen las guías sobre…" |
| "protocolo de triage NSBSP" | "marco anti-shaken-baby NSBSP" |
| "escalas validadas (NSBSP, …)" | "escalas validadas (Haizea-Llevant, LATCH, EPDS, M-CHAT-R)" |

## Ejemplos

### ✓ Canon

```js
sheetCopy: "Hiciste lo correcto al venir aquí. Vamos a por la otitis · día 3 de antibiótico."
educational: "NICE NG143 (2021) recomienda observación 48h tras..."
```

### ✗ Anti-canon

```js
sheetCopy: "¡Felicidades por tu racha de 5 días!"  // gamification
educational: "Los expertos dicen que..."           // sin fuente
warning: '<span style="color: red">¡Urgente!</span>'  // rojo médico literal
```

## Workflow

1. Voy a escribir / modificar copy user-facing
2. Reviso esta rule + ADR-0011 · 6 reglas
3. Si copy clínico · busca fuente + año real
4. Edit
5. Post-commit · spawn `copy-auditor` (`.claude/agents/copy-auditor.md`)
6. Si copy-auditor marca 🔴 · fix y re-commit
7. Si copy-auditor marca 🟡 · valora contexto y deja nota en commit message

## Cita ADR

- **ADR-0011** · trauma-informed copy canon (master · 6 reglas completas)
- **ADR-0005** · chat IA modo 3am (cuándo copy adopta tono nocturno)
- **ADR-0009** · libro salud emergencia (NSBSP canon directo)
