# Claude Design brief · Grow landing v2 (hi-fi)
## canon mayo 2026 · derivado de research sintético v0.1 + Fase 0 + DS v0.2 + pricing canon

> Brief pegable a Claude Design para producir la landing hi-fi de Grow. Resuelve los 10 fixes prioritarios del landing walkthrough research (top score H1 — download intent) sin romper canon Fase 0 / DS v0.2 / trauma-informed.

> [!NOTE]
> **Superseded** · ver `claude-design-landing-brief-v3.md` (arquitectura 6
> secciones + parallax avatar). Este v2 queda como referencia histórica.
> **Typography canon May 2026** · brief migrado de tipografía legacy
> (Lenia + Helvena) a **Galiner + Inter**. Referencias a "Galiner italic"
> deben leerse como **Galiner Light 300 + `var(--ink-soft)`** · el corte
> Galiner Italic no existe (canon `.agent/rules/typography.md`).

---

## 0 · TL;DR (≤200 palabras · pegable a prompt)

Diseña la landing **hi-fi mobile-first** de **Grow** — companion digital trauma-informed para familias desde la concepción hasta los 3 años. Base lo-fi: `design/wireframes-homepage-v0.1.html` (13 bloques + parallax avatar 3 fases). Aplica **DS v0.2 canon** (paper-cream + 8 tonales + Galiner/Inter + avatares 3D blandos coral/blush/mint). Manifiesto canon: *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor. Para cualquier familia que cuida."* Hero canon: *"Tú cuidas a tu hij@, y Grow te cuida a ti."* Cambios obligatorios vs v0.1: (1) subir trust signals al bloque 2-3 (no esperar al 9). (2) Añadir microcopy hero `"De la concepción al 3er cumpleaños · ES"`. (3) Añadir sticky CTA bottom mobile post-hero. (4) Mostrar 9 libros canon (no 8). (5) Pricing transparente visible: *"Gratis durante beta · Founding members €1.99/mes price-lock"*. Tono trauma-informed: 0 comparativos, 0 streaks, 0 rojo médico, 0 ads visuales, 0 testimonios con foto. Target: 5-second test passing + sticky scroll. Output: HTML single-file + assets inline + CSS inline. NO librerías externas más que Google Fonts (Galiner + Inter).

---

## 1 · Contexto

**Qué es Grow**
Companion digital trauma-informed para familias que cuidan peques desde semana 4 de embarazo hasta el 3er cumpleaños. Producto B2C con pilot B2B2C (aseguradora DKV Q3-Q4 2026). Pertenece al ecosistema **ChildLens** (BLW · Colic · Sleep · Stories · Aid).

**Por qué ahora**
- Mercado parenting apps $1B+ con CAGR ~20%.
- Huckleberry (US) líder pero solo EN + USA-centric.
- BubuAI (ES/IT) lanza commerce-first sin moat clínico.
- Gap claro: España + Europa con canon clínico real (CAV-AEP 2026 + Haizea-Llevant 97 hitos + escalas validadas + MDR Class IIa pathway) + trauma-informed copy.

**Estado del producto**
- Prototype canon vivo: `prototype.html` (9 libros + Modo madrugada + DS v0.2).
- Landing v0.1 lo-fi: `design/wireframes-homepage-v0.1.html`.
- Research sintético v0.1 (8 entrevistas) ya completado.

**Goal de la landing**
1. Captar email signup waitlist (Q2 2026 smoke test).
2. 5-second test passing (entiendes qué es y para quién).
3. Posicionar diferencial clínico antes del scroll 50%.
4. Generar viralidad orgánica (PLG · canon trauma-informed shareable).

**KPI target post-launch waitlist**: conversion email signup ≥ 5% (benchmark trauma-informed SaaS B2C). A/B post-pricing-visible: medir si visibilidad pricing reduce o aumenta conversion.

---

## 2 · Personas target + el clic emocional de cada una

| # | Persona | Edad/Contexto | El clic que necesita ver |
| --- | --- | --- | --- |
| 1 | **María** | 34a · embarazo 14 sem · Madrid | Hero manifesto + "concepción al 3er cumpleaños" + libros visible |
| 2 | **Pablo** | 38a · co-cuidador peque 4m | Hook propio de co-cuidador ("Para los dos · simétrico") |
| 3 | **Carmen** | 31a · monoparental 7m · Valencia | Pricing transparente Founding €1.99 + "Para cualquier familia que cuida" |
| 4 | **Lucía** | 36a · embarazo arcoíris sem 22 | Modo arcoíris visible explícito + tono cauto + ChildLens+ con psicóloga humana |
| 5 | **Marta** | 33a · expat ES Berlin · 2 peques | Roadmap STIKO + i18n en waitlist + canon dual |
| 6 | **Ingrid** | 35a · preemie sem 32 Berlin | Modo preemie visible + canon Fenton + edad corregida + Care tier €19.99 |
| 7 | **Dra. Comas** | 47a · pediatra Vall d'Hebron | Comité asesor clínico visible + canon AEPED + MDR pathway + free tier robusto |
| 8 | **Olivia** | 41a · UK HNW · Huckleberry Premium | Aesthetic premium curated + roadmap EN-UK + canon NICE Fase 1 |

**Personas prioritarias para Fase 0 ES** (orden de visualización en landing): María (anchor) · Carmen (inclusivity) · Lucía + Ingrid (differentiation moat) · Dra. Comas (B2B trojan horse).

---

## 3 · Brand & Design System v0.2 specs (CANON)

### Paleta core (paper cream + tonales)

```
--paper      #FAF7F0   fondo principal
--paper-soft #F2EDE0   surfaces cards
--paper-deep #E8E1CF   libro salud + dividers profundos
--ink        #1A1A1A   texto principal
```

### 8 tonales canon por categoría/libro

| Libro | Tonal | Hex aproximado |
| --- | --- | --- |
| Embarazo · Alimentación · Cólicos | **coral** | warm orange-pink |
| Lactancia · Diario | **blush** | soft pink |
| Sueño · Hitos · Perfil | **mint** | calm green |
| Vacunas | **gold** | warm amber |
| Salud | **paper-deep** | cream profundo |
| Reservado v1.5 | sky · lilac · ochre | accent colors |

> Use los tonales como **fondo de tarjeta del libro** (no como border o pequeño accent). Color block grande pero blando, no saturado.

### Tipografía (canon)

- **Display**: **Galiner** (serif suave, semibold solo en hero canon · italic permitido en frases manifesto).
- **Body**: **Inter** (sans-serif, regular + medium para énfasis).
- No usar Fraunces ni Inter (paleta vieja v1).

### Avatares 3 fases (canon DS v0.2)

Soft 3D blandos. Cada uno con tonal específico:

- **Embarazo (sem 4-40)**: avatar **coral** · bola suave · expresión cálida.
- **Bebé (0-12m)**: avatar **blush** · ligero blob · expresión despierta.
- **Crianza (12m-3a)**: avatar **mint** · bola grande con bolitas alrededor (hitos conquistados) · expresión curiosa.

Parallax canon: scroll cambia avatar progresivamente. Funciona ya en lo-fi v0.1.

### Espaciado + radius

- Base 4px. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- Radius: 12px inputs · 16-20px cards · 24px modales · 9999px botones primarios + avatares.
- Sombras MUY sutiles (paper inspired · no Material).

### Estados card

- `doing` (en curso) · `done` (✓) · `snoozed` · `attention` · siempre con tonal canon del libro.

### Iconografía

- Outline reasonal.co-style · stroke 1.5-2px · sin fill.
- Iconos universales para categorías canónicas: 🤰 🍼 💉 🌙 🌡 💊 🌱 💛.

---

## 4 · Tone & voice canon (trauma-informed)

### Manifesto canon v2 (mayo 2026)

> *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor."*
> *"Para cualquier familia que cuida."*

### Hero canon

> *"Tú cuidas a tu hij@, y Grow te cuida a ti."*
> Sub: *"La compañera que faltaba para el embarazo, la crianza y todo lo que viene en medio."*
> Microcopy nuevo (top fix research): *"De la concepción al 3er cumpleaños · ES · web y móvil."*

### Brand consistency

- **"tu hij@"** en hero canon · "tu peque" libre en copy contextual ("tu peque está aprendiendo a...").
- **"para cualquier familia que cuida"** · NO "mamá y papá" · NO "futuro papá" · NO "bebito" · NO "mami".
- **Co-cuidador/a** simétrico · NO "ayuda al padre" · NO "para la madre principal".
- **Modos especiales** mencionados explícitos: preemie · arcoíris · monoparental · mismo sexo · adopción · subrogación.

### Reglas de tono

1. **Cero comparativos** ("X% de bebés... tu peque va atrás" → ❌).
2. **Cero gamification tóxica** (streaks · rankings · "tu hijo está nivel 3").
3. **Cero rojo médico explícito** (#FF0000) → coral-base canon.
4. **Cero testimonios con foto de bebés** (privacy-first · canon Ingrid).
5. **Cero "felicidades semana X"** en modo arcoíris activo.
6. **Cero ads visuales** ni branding de partner aseguradora arriba.
7. **Trust signals con números reales solo si verificables** (canon "11 menciones Aquí no diagnosticamos en el producto").
8. **Citas clínicas con fuente + año** siempre (canon AEPED 2026, NICE, OMS, AAP).

---

## 5 · Estructura de la landing (13 bloques canon)

### Bloque 1 · Hero (full viewport mobile · 70vh desktop)

- **Hero claim canon**: *"Tú cuidas a tu hij@, y Grow te cuida a ti."*
- Sub canon: *"La compañera que faltaba para el embarazo, la crianza y todo lo que viene en medio."*
- **Microcopy nuevo (top fix)**: *"De la concepción al 3er cumpleaños · ES · web y móvil."*
- 3 avatares 3 fases canon (coral · blush · mint) flotando · parallax con scroll.
- CTA primary: `Apúntate a la lista →` (coral)
- CTA secondary: `Ver cómo funciona` (ghost ink)

### Bloque 2 · Trust signals NUEVO (top fix #2)

> ⚠️ Esto es nuevo · NO existe en lo-fi v0.1. Es el top fix #2 del research.

3-4 trust signals **visuales** (icon + 2-3 palabras) en una fila horizontal con fondo paper-soft:

- 🩺 **Canon AEPED 2026** · validado por comité clínico
- 🔒 **Privacy first** · cifrado E2E · audio on-device
- 📋 **MDR Class IIa pathway** · Q3 2026
- 🌱 **Made by humans, for humans**

Sin números fake. Con micro-tooltip explicando cada concepto si tap.

### Bloque 3 · Manifesto extendido

- Galiner italic sobre paper-soft:
  > *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor."*
  > *"Made by humans, for humans. Acompañamos sin diagnosticar, sin juzgar, sin militancia."*

### Bloque 4 · Para cualquier familia que cuida

- Grid 2x3 o 3x2 de **6 configuraciones familiares** (ilustración outline canon):
  1. Madre + padre
  2. 2 madres / 2 padres
  3. Monoparental
  4. Adopción
  5. Subrogación
  6. Abuelos cuidadores
- Frase cierre Galiner italic: *"Si tu corazón cuida de alguien pequeño, esto es para ti."*

### Bloque 5 · Los 9 libros canon (TOP FIX #8 · NO 8 libros)

> ⚠️ Cambio vs v0.1: añadir Salud + Hitos + Desarrollo (eran 6 antes · ahora 9 libros).

Grid 3×3 mobile · 3×3 desktop. Cada card con tonal canon del libro:

| # | Libro | Tonal | Edad activa |
| --- | --- | --- | --- |
| 1 | 🤰 Embarazo | coral | sem 4-40 |
| 2 | 🍼 Alimentación | coral | 0-3a |
| 3 | 🤱 Lactancia | blush | 0-18m |
| 4 | 💉 Vacunas | gold | 0-3a |
| 5 | 🌙 Sueño | mint nocturno | 0-3a |
| 6 | 🌡 Salud | paper-deep | 0-3a |
| 7 | 😭 Cólicos | coral | 0-6m |
| 8 | 🌱 Hitos | mint | 0-3a |
| 9 | 💛 Desarrollo | lavender | 0-3a |

CTA secundario en cada card (top fix #8): `Ver libro →` que abre drawer/modal con preview pre-signup (curiosity hook).

### Bloque 6 · Modo madrugada (highlight emocional · fondo dark)

- Background ink #1A1A1A · texto paper.
- Mockup phone con apertura canon textual.
- Frase canon: *"Este es un modo urgencia. Las respuestas son más rápidas, más directas y sin juzgar."*
- 3 chips edad-aware canon (NO 5 rutas):
  - "No para de llorar"
  - "Le pasa algo"
  - "No puedo más"
- Indicador auto-activación nocturna 21h-7h.

### Bloque 7 · Pricing transparente NUEVO (top fix #1 CRÍTICO)

> ⚠️ NUEVO bloque · NO existe en lo-fi v0.1. Top fix #1 research.

- **Tarjeta pricing canónica trauma-informed**:
  - Headline: *"Te acompañamos también con el bolsillo."*
  - Pricing visible:
    - **Gratis** durante beta · 1 libro + Modo madrugada + Chat IA limited.
    - **Plus €7.99/mes** · todos los libros desbloqueados.
    - **Founding members €1.99/mes price-lock** primer año (primeros 1.000).
  - 14 días Plus sin tarjeta · trial reverse (degrada a free).
  - Link al canon completo: `Ver detalle pricing →` (sub-página).

### Bloque 8 · Modos especiales · trust visible

- 6 modos especiales canon listados con micro-ilustración:
  - 🌈 Modo arcoíris (embarazo tras pérdida)
  - 👶 Modo preemie (curvas Fenton · edad corregida hasta 24m)
  - 💪 Modo monoparental
  - 👨‍👨 Modo familias mismo sexo
  - 🤲 Modo adopción
  - 🌷 Modo subrogación
- Frase canon: *"Cada cuidado merece su propio canon. Sin tono celebratorio agresivo si tú no quieres."*

### Bloque 9 · Diferenciación clínica + privacy first

Ya existía en v0.1. Mantener pero reforzar:

- **4 diff-cards**: Canon AEPED 2026 · Escalas validadas (EPDS · M-CHAT-R · ASQ-3 · LATCH · BITSS · Wessel · PBA-5) · Vitales sin hardware · "Aquí no diagnosticamos. Te ayudamos a hablar con tu pediatra."
- **Privacy 4 bullets**: Cero ads · Cifrado E2E · Audio on-device (cry classifier) · Export PDF + borrado total.

### Bloque 10 · Comité asesor clínico (B2B trust)

- 4 cards con foto outline canon (placeholder) + nombre + especialidad:
  - 1 pediatra AP (target Dra. Comas tipo)
  - 1 neonatólogo
  - 1 psicóloga perinatal
  - 1 enfermera pediátrica
- Frase canon: *"Validado por quien sabe."*

### Bloque 11 · Acceso · form waitlist + sticky CTA

- Form simple email + checkbox modo especial activo (opcional).
- CTA primary coral: `Apúntate desde €1.99/mes` (top fix CTA con pricing).
- Reassurance: *"Te escribimos cuando podamos abrirte la puerta · Q3 2026. Sin spam. Sin ads. Cero presión."*
- **Sticky bottom CTA mobile** (top fix #4): aparece tras scroll del hero · siempre visible.

### Bloque 12 · B2B teaser (mutuas + pediatras)

- *"¿Eres mutua privada, hospital, o pediatra AP?"*
- CTA: `Solicitar demo o pilot →` (sub-página DKV-ready).

### Bloque 13 · Footer

- Logo · ChildLens ecosystem cross-promo · GDPR + privacy + términos · contacto.

---

## 6 · Trust signals canon (re-énfasis)

Los trust signals **deben estar en el bloque 2-3** (no en el 9 como hoy). Es el top fix #2 del research y mueve significativamente la conversión.

Iconografía outline · NO badges fake · NO "5 estrellas Trustpilot" si no son reales.

---

## 7 · CTAs jerárquicos canon

- **CTA primary coral** (`#C75D4A` aprox · canon coral-base): `Apúntate desde €1.99/mes` (con pricing visible).
- **CTA secondary ghost** (border ink): `Ver cómo funciona`.
- **CTA tertiary text** (link ink underline subtle): `Ver libro X →` en cards.
- **Sticky bottom mobile** (post-hero scroll): primary coral compacta.
- **CTA B2B** (footer block): ghost separada del flujo B2C.

---

## 8 · Anti-patterns (NO HACER)

- ❌ Pop-up de waitlist al cargar (canon trauma-informed · no agresivo).
- ❌ Countdown timer fake o urgencia falsa.
- ❌ Bandera "Recommended by 10,000 parents" sin source verificable.
- ❌ Foto stock de bebés/familias (canon privacy first · usa ilustraciones outline).
- ❌ Comparativa "X% de bebés" como hook (canon no-comparación).
- ❌ Dark mode forzado fuera del Modo madrugada (paper cream canon en landing entera).
- ❌ Animaciones agresivas o autoplay video (`prefers-reduced-motion` canon).
- ❌ Cookie banner intrusivo (canon GDPR-native).
- ❌ Logo Antai/inversores arriba (canon humans-for-humans no commerce-first).
- ❌ Branding DKV/Sanitas como partner principal arriba (B2B se queda en bloque 12).
- ❌ "Made with AI" como pillar (canon humans-for-humans).
- ❌ Comparativa explícita Bubu / Huckleberry / Kinedu (canon no-trash-talk).

---

## 9 · Layout intent

### Mobile (390px viewport iPhone 14 reference)

- Mobile-first canon · stack vertical de 13 bloques.
- Hero ~85vh para maximizar 5-second test.
- Sticky bottom CTA tras hero scroll.
- Grid 9 libros: 3 cols × 3 rows con cards cuadradas.
- Modo madrugada full-bleed dark.
- Pricing tarjeta única visible sin tabs (más bullet point, más confianza).
- Total scroll mobile esperado: ~15.000-17.000 px (similar a v0.1).

### Desktop (1280px reference)

- Hero 70vh con avatares 3 fases distribuidos derecha.
- Trust signals horizontal · una fila.
- 6 configuraciones familiares: 3 cols × 2 rows.
- 9 libros: 3 cols × 3 rows.
- Modo madrugada: split layout (texto izquierda, phone mockup derecha).
- Comité asesor: 4 cols horizontal.

### Reduce motion / accessibility

- WCAG 2.2 AA mínimo.
- `prefers-reduced-motion: reduce` desactiva parallax avatar.
- Contrast ratio: paper #FAF7F0 + ink #1A1A1A = 15.7:1 ✅.
- Touch targets ≥44pt.

---

## 10 · Referencias para Claude Design

### Inputs obligatorios

1. **Lo-fi base**: `design/wireframes-homepage-v0.1.html` (13 bloques · 9.897px desktop · 16.023px mobile).
2. **DS v0.2 canon**: `design/Grow Design System v0.2.html`.
3. **Prototype real**: `prototype.html` (single-file · 9 libros vivos · canon Fase 0 sólido 10/10).

### Inputs de contexto

4. Manifesto + arquitectura canon: notion `🌱 Fase 0`.
5. Research v0.1 (8 entrevistas + findings transversales): notion `🔬 Research sintético deep dive v0.2`.
6. Pricing canon: notion `💰 Pricing strategy + GTM (source of truth)`.
7. Landing walkthrough findings: `/Grow/research/01-landing-flow-walkthrough.md`.

### Output esperado

- **Archivo único**: `design/wireframes-homepage-v0.2-hi-fi.html` (self-contained · CSS inline · sin librerías externas más que Google Fonts).
- Mobile-first responsive.
- 13 bloques canon estructurados.
- DS v0.2 canon aplicado (paleta + tipo + tonales + avatares 3D blandos + estados).
- Top 10 fixes research v0.1 implementados explícitamente.
- Sin emojis decorativos en copy (solo en iconografía de libros · NO en hero).
- `prefers-reduced-motion` respetado.

### Top 10 fixes a implementar (check final antes de entregar)

- [ ] #1 Pricing transparente bloque 7 + sticky CTA con pricing.
- [ ] #2 Trust signals bloque 2-3 (no esperar al 9).
- [ ] #3 Trial 14 días sin tarjeta visible en pricing block.
- [ ] #4 "tu hij@" en hero · "tu peque" libre en copy.
- [ ] #5 MDR Class IIa pathway visible.
- [ ] #6 Microcopy hero "concepción al 3er cumpleaños · ES".
- [ ] #7 9 libros (no 8) con tonales canon DS v0.2.
- [ ] #8 CTA "Ver libro →" en cada card de bloque 5.
- [ ] #9 Sticky bottom mobile post-hero.
- [ ] #10 Sub-pricing visible + Founding €1.99 price-lock.

---

## 11 · Mensajes prohibidos vs canon

| ❌ Anti-canon | ✅ Canon |
| --- | --- |
| "Para mamá y papá" | "Para cualquier familia que cuida" |
| "futuro papá" / "futura mamá" | "co-cuidador/a" / "tu hij@" |
| "Tu bebito" / "tu peque va atrás" | "tu peque está aprendiendo" / "cada peque a su ritmo" |
| "Hazte streak diario" | (canon · 0 streaks) |
| "URGENTE · termina en 24h" | "Sin presión. Cuando estés lista." |
| "Tu bebé puede tener X" (alarma fake) | "Es probable variación normal. Habla con tu pediatra si crece la duda." |
| Comparativa "X% de bebés..." | (canon · 0 comparación pública) |
| "AI-powered baby tracker" | "IA contextual entrenada con CAV-AEP 2026 + Haizea-Llevant" |

---

## 12 · Output format esperado

**Un solo HTML self-contained**:
- `<style>` inline en `<head>` con DS v0.2 canon completo.
- `<script>` inline para parallax avatar (con `prefers-reduced-motion`).
- 13 bloques semánticos `<section data-block="X">`.
- Sin librerías externas excepto Google Fonts (Galiner + Inter).
- Validar mobile 390px + desktop 1280px.
- Validar Lighthouse mobile ≥ 90.

**Convención de nombrado**:
- `design/wireframes-homepage-v0.2-hi-fi.html` para el output principal.
- Si se generan ilustraciones, guardar en `design/assets/v0.2/`.

---

## 13 · Changelog

- v2.0 · 2026-05-18 · Brief inicial canon mayo 2026 · derivado de research v0.1 + Fase 0 + DS v0.2 + pricing canon. Top 10 fixes incorporados.

---

*Brief Claude Design · Grow landing v0.2 hi-fi · 18 mayo 2026 · canon Fase 0 · trauma-informed · supersede prompt-landing-replace-pain-narrative.md*
