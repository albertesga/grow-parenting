# Landing flow walkthrough · Mimo v0.1
## Research sintético · canon Fase 0 · abril 2026

> Recorrido de la landing como si fuese un usuari@ real · cubre **A · heurística landing + H1 · download intent**. Screenshots en `/research/screenshots/homepage/` (15 PNG · desktop 1280 + mobile 390).

---

## 0 · Setup

- URL recorrida: `http://localhost:5050/design/wireframes-homepage-v0.1.html` (wireframes lo-fi)
- Viewports: 1280×800 desktop · 390×844 mobile (iPhone 14)
- Tracker parallax verificado: cambia entre `Embarazo · Bebé · Crianza` al scroll. Funciona.
- Full height desktop: **9.897 px** (~12.4 viewports apilados).
- Full height mobile: **16.023 px** (~19 viewports apilados).

⚠️ **Alerta scroll fatigue · mobile**: 19 viewports apilados es MUY largo. Drop-off probable antes del bloque 11 (acceso · CTA). Acción: comprimir o introducir CTA waitlist más arriba.

---

## 1 · 5-second test · ¿qué es Mimo?

**Procedimiento**: cargo el hero y miro 5 segundos. ¿Entiendo qué es, para quién y qué resuelve?

**Hero canon visible**:
> "Tú cuidas a tu hij@, y Mimo te cuida a ti."
> · La compañera que faltaba para el embarazo, la crianza y todo lo que viene en medio.
> [Apúntate a la lista →] [Ver cómo funciona]

**¿Pasa el test?** **Parcialmente.**

| ✅ Sí entiendo | ❌ No queda claro |
| --- | --- |
| Es una app de acompañamiento parental | A qué edad sirve (embarazo? bebé? toddler?) |
| Trauma-informed (canon "te cuida a ti") | Si es app o web · funciona offline? |
| Para cualquier cuidador/a (no género forzado) | Precio · gratis? |
| Promesa emocional | Diferenciación vs Huckleberry/Kinedu/Bubu |

**Severidad**: 🟡 media. **Fix**:
- Añadir microcopy bajo hero: *"De la concepción al 3er cumpleaños · ES + EN · web y móvil"*.
- Mantener 3 avatares (coral · blush · mint) que ayudan a entender rango edad sin leer.

---

## 2 · Manifesto extendido + Para cualquier familia

**Procedimiento**: scroll a bloques 02 y 03.

**Bloque 02 · Manifesto extendido**:
> *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor."*
> *"Made by humans, for humans. Acompañamos sin diagnosticar, sin juzgar, sin militancia."*

✅ Funciona como suspiro entre hero y bloque libros. Galiner italic + paper-soft canon · respeta editorial reasonal-style.

**Bloque 03 · Para quién**: incluye 6 configs familiares (Madre+padre · 2M/2P · Monoparental · Adopción · Subrogación · Abuel@s).

✅ Inclusivo canon Fase 0. Frase cierre: *"Si tu corazón cuida de alguien pequeño, esto es para ti."*

⚠️ **Hallazgo**: los iconos de las 6 configs están vacíos (placeholder círculos sin emoji renderizado · son "div ico" sin SVG content). En hi-fi necesitan ilustraciones outline reasonal-style.

---

## 3 · Bloque libros · el protagonista

**Procedimiento**: scroll a bloque 05 (grid 4×2 de 8 libros).

**Visible**: Embarazo · Alimentación · Lactancia · Vacunas · Sueño · Salud · Hitos · Desarrollo. Cada uno con su tonal canon.

✅ Diferenciación clara · el grid funciona como anchor visual y promesa concreta.

⚠️ **Hallazgo crítico**: **falta CTA secundario "Ver libro X →"** en cada tarjeta · solo título y sub. Para conversión H1 cada libro debe ser tap-able y abrir drawer/modal con detalle. Si llego curiosa y no puedo ver más sin signup, friction.

⚠️ **Hallazgo**: en el wireframe los tints son barras pequeñas en vez de fondo de tarjeta. En hi-fi probablemente sí ocupan toda la tarjeta tipo `cat-card.cat-X` canon.

---

## 4 · Modo madrugada

**Procedimiento**: scroll a bloque 06 (fondo dark).

**Visible**: mockup phone con apertura canon textual + 3 chips edad-aware.

✅ Funciona el contraste dark vs cream del resto · pico emocional fuerte.

✅ La frase canon *"Este es un modo urgencia. Las respuestas son más rápidas, más directas y sin juzgar."* lleva el mensaje completo.

⚠️ **Hallazgo**: los chips "No para de llorar" · "Le pasa algo" · "No puedo más" son **muy específicos** sin contexto. Si nunca has tenido un hij@ puede sonar exagerado · si lo has tenido reconoces inmediato. Acción: A/B test con copy más universal en hero.

---

## 5 · Diferenciación vs competidores

**Procedimiento**: leo los bloques 09 (Diferenciales clínicos) + 10 (Privacy).

**Visible**:
- 4 diff-cards: Canon AEPED 2026 · Escalas validadas · Vitales sin hardware · Aquí no diagnosticamos.
- Privacy: 4 bullets (cero ads · cifrado E2E · audio on-device · export PDF + borrado).

✅ Si soy comparando con **BubuAI** (commerce-first · sin AEPED · sin escalas · sin MDR · marketplace + AI toy), el diff queda claro **si llego al bloque 9**. Pero está a >70% scroll · mucha gente no llega.

✅ Si soy comparando con **Huckleberry** (sin embarazo · sin Haizea-Llevant · sin ES · sin AEPED), también queda claro.

❌ **Hallazgo crítico**: la diferenciación clínica + privacy first NO se asoman antes del bloque 9. El hero y los primeros bloques son emocionales/inclusivos. Para alguien escéptico que va comparando apps, la diferenciación tiene que estar **mucho más arriba** · al menos en el bloque 2-3 con 3-4 trust signals visuales (logos AEP · candado privacy · "MDR Class IIa pathway · Q3 2026").

---

## 6 · CTA principal · friction de signup

**Procedimiento**: contar CTAs en la landing.

**Visible**:
- Hero: 2 CTAs (`Apúntate a la lista` + `Ver cómo funciona`).
- Bloque 11 (acceso): form con input email + `Apúntate`.
- Bloque 12 (B2B): `Solicitar demo o pilot`.
- Total: 4 CTAs.

✅ Jerarquía clara · primaria coral · secundaria ghost.

❌ **Hallazgo crítico**: hay **solo 2 CTAs B2C** (hero + bloque 11). Entre uno y otro hay ~7.000 px de scroll. Drop-off probable. Acción: añadir sticky bottom CTA en mobile que aparezca al pasar el hero (`Apúntate desde X €/mes` o `Apúntate gratis ahora`).

⚠️ **Friction signup**: pide email solo · low friction. Bien. Pero no hay microcopy de qué pasa al darle clic (recibo email? lista de espera? lanzamiento Q3 2026?). Añadir reassurance.

---

## 7 · Pricing transparente

**Procedimiento**: buscar pricing en la landing.

**Hallazgo crítico**: ❌ **0 menciones de pricing en €** en la landing. Si soy una madre tirana del cashflow familiar, no veo si Mimo es gratis, freemium, o premium. La decisión de descargar/apuntarme se posterga.

**Acción**: añadir bloque transparente o microcopy:
- *"Gratis durante el beta. Founding members con €1.99/mes price-lock."*
- O incluir tier teaser en bloque 11 con anchor del precio canon.

**Severidad**: 🔴 alta para H1 (download intent) y H3 (WTP). El research previo dice que 33% padres mencionan ansiedad económica · la transparencia ayuda.

---

## 8 · Personas canon · ¿quién se descarga?

| Persona | ¿Se descarga? | Razón | Friction |
| --- | --- | --- | --- |
| **María · 34 a · 14 sem embarazo** | ✅ Probable | Le pega manifesto + 1.000 días + libros (Embarazo + Vacunas) | Pricing no visible · si supiera gratis → instant |
| **Pablo · co-cuidador 4 m** | 🟡 Tal vez | "Para los dos" le invita · co-cuidado simétrico es diferencial real | Pero el hero es muy "para madre" emocional · le falta hook propio |
| **Carmen · monoparental 7 m** | ✅ Probable | "Para cualquier familia que cuida" + modos especiales le tocan | Privacy first la convence · sin tracking |
| **Lucía · embarazo arcoíris** | 🟡 Tal vez | Modo arcoíris específico es plus · pero tiene que llegar al bloque 8 (modos especiales) que está a 60% scroll · puede perder antes | Hero podría tener un hint de inclusividad/sensibilidad |
| **Dra. Comas · pediatra Barcelona** | ✅ Probable | Canon AEPED 2026 + MDR Class IIa + "Aquí no diagnosticamos" la convencen | Tiene que llegar al bloque 12 B2B · que está casi al final |
| **Olivia · UK HNW expat** | 🟡 Tal vez | "Made by humans, for humans" + privacy first + Modo madrugada le pegan | Pero ya usa Huckleberry Premium · necesita ver diff superior más claro · "edad corregida automática" + "co-cuidador simétrico" sin pasar al bloque 9 |

**Score H1 sintético**: 4/6 personas se descargarían si pricing fuera transparente. 2/6 dependen de fixes específicos.

---

## 9 · Top fixes prioritarios H1 (download intent)

| # | Fix | Severidad | Impacto | Esfuerzo |
| --- | --- | --- | --- | --- |
| 1 | Añadir pricing transparente (sticky bottom + bloque dedicado) | 🔴 alta | H1 + H3 | low |
| 2 | Subir 3-4 trust signals visuales al bloque 2-3 (logos AEP · candado · MDR pathway) | 🔴 alta | H1 | medium |
| 3 | Microcopy hero · "concepción → 3er cumpleaños · ES + EN" para clarificar scope | 🟡 media | H1 | very low |
| 4 | Sticky bottom CTA en mobile post-hero (`Apúntate gratis`) | 🟡 media | H1 | low |
| 5 | Ilustraciones outline canon en bloque 3 · 6 configs familiares | 🟡 media | H1 + brand | medium |
| 6 | CTA secundario "Ver libro X →" en cada card de bloque 5 · drawer con detalle pre-signup | 🟡 media | H1 + curiosity | medium |
| 7 | Microcopy reassurance post-submit del form (`Te escribimos cuando podamos abrirte la puerta · Q3 2026`) | 🟢 baja | H1 confidence | very low |
| 8 | Tarjeta dedicada para Pablo/co-cuidador en hero o sub-hero · más balance no-madre-céntrico | 🟢 baja | H1 inclusivity | medium |

---

## 10 · Recomendaciones para validación real H1

Lo que **no puedo responder sintéticamente** y sí valida con smoke test:

1. **Smoke test landing** · Q2 2026 · €500-1k de tráfico pagado a la landing pública con waitlist signup. Target: conversion email > 5% (benchmark SaaS B2C trauma-informed).
2. **A/B hero claim** · canon A *"Tú cuidas..."* vs canon C *"Los primeros 1.000 días, contigo"*. Métrica: scroll depth + email signup.
3. **A/B sticky CTA** vs sin sticky · medir email signup rate.
4. **A/B pricing transparente** vs solo waitlist. Si pricing visible mata signups, mantener waitlist.
5. **A/B inclusividad explícita en hero** · "Para cualquier familia que cuida" como sub-claim del hero vs solo bloque 3.

**Estimado tráfico de smoke test**: 5.000-10.000 visitas únicas → 250-500 emails canon Fase 0 trauma-informed (benchmarks comparables).

---

*Landing flow walkthrough v0.1 · canon Fase 0 · `prefers-reduced-motion` respetado · abril 2026*
