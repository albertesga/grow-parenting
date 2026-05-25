# Claude Design brief · Grow landing v3 (hi-fi)
## canon mayo 2026 · arquitectura 6 secciones + parallax avatar 3 fases

> Brief pegable a Claude Design para producir la landing hi-fi de Grow. **6 secciones · sin pricing duplicado · sin trust signals enterrados · narrative-driven con parallax avatar evolutivo**. Supersede `claude-design-landing-brief-v2.md` (13 bloques).

> [!NOTE]
> **Typography canon May 2026** · Brief migrado de tipografía legacy
> (Lenia + Helvena) a **Galiner + Inter**. Referencias a "Galiner italic"
> deben leerse como **Galiner Light 300 + `color: var(--ink-soft)`** · el
> corte Galiner Italic no existe en el sistema (canon `.agent/rules/typography.md`).

---

## 0 · TL;DR (≤200 palabras · pegable a prompt)

Diseña la landing hi-fi mobile-first de **Grow** — companion digital trauma-informed para familias desde semana 4 de embarazo hasta el 3er cumpleaños. **Arquitectura 6 secciones**: (1) Hero con manifiesto canon + trust signals; (2) **Parallax scroll narrative** con avatar evolutivo 3 fases (coral embarazo → blush bebé → mint toddler) + 5 frases situación-dolor-solución; (3) Los 9 libros canon; (4) Modo madrugada dark; (5) Comité asesor clínico + escalas + MDR pathway; (6) Pricing transparente. Aplica **DS v0.2 canon** (paper-cream + 8 tonales + Galiner/Inter + avatares 3D blandos). Manifesto canon mayo 2026: *"Tú cuidas a tu hij@. Grow te cuida a ti. Sin manual, sin juicios, sin urgencia."* Tono trauma-informed: 0 comparativos, 0 streaks, 0 rojo médico, 0 ads, 0 foto stock de bebés. **Parallax avatar es el eje narrativo**: se transforma con el scroll del usuario, materializando el journey de los 1.000 días sin que el lector tenga que leer fechas. Output: HTML single-file responsive + CSS inline + sin librerías externas más que Google Fonts (Galiner + Inter).

---

## 1 · Contexto producto

**Qué es Grow**
Companion digital trauma-informed para familias que cuidan peques desde semana 4 de embarazo hasta el 3er cumpleaños. Producto B2C con pilot B2B2C (aseguradora DKV Q3-Q4 2026).

**Por qué ahora**
- Mercado parenting apps $1B+ · CAGR 20%.
- Huckleberry (US) líder pero solo EN + USA-centric.
- BubuAI (ES/IT) lanza commerce-first sin moat clínico.
- Gap: España + Europa con canon clínico real (CAV-AEP 2026 + Haizea-Llevant + escalas validadas + MDR Class IIa) + trauma-informed copy.

**Goal de la landing**
1. Captar email signup waitlist (Q2 2026 smoke test).
2. 5-second test passing (entiendes qué es y para quién).
3. Generar reconocimiento emocional ("eso me pasa a mí") en el parallax scroll.
4. Conversión PLG · canon trauma-informed shareable.

**KPI target**: conversion email signup ≥ 5%.

---

## 2 · Inputs obligatorios

1. **Spec arquitectura**: notion <https://www.notion.so/36455399748a81c4862fc45fd03b02d8> (`spec/arquitectura-canon`).
2. **DS v0.2 canon**: `design/Grow Design System v0.2.html` (8 tonales + Galiner + Inter + avatares 3D blandos).
3. **Pricing canon**: notion <https://www.notion.so/36455399748a8164ac54caa1cfdac144>.
4. **Research v0.1 personas + findings**: `/Grow/research/00-executive-summary.md`.
5. **Prototype real**: `prototype.html` (9 libros vivos · canon Fase 0 verificado 10/10).
6. **Lo-fi v0.1**: `design/wireframes-homepage-v0.1.html` (referencia parallax avatar funcional).

---

## 3 · Brand & Design System v0.2 canon

### Paleta core

```
--paper      #FAF7F0   fondo principal
--paper-soft #F2EDE0   surfaces cards
--paper-deep #E8E1CF   bloque oscurito + dividers
--ink        #1A1A1A   texto principal
```

### 8 tonales por categoría

| Tonal | Uso landing |
| --- | --- |
| **coral** | avatar fase embarazo · cards libros Embarazo/Alimentación/Cólicos · CTA primary |
| **blush** | avatar fase bebé · cards libros Lactancia |
| **mint** | avatar fase toddler · cards libros Sueño/Hitos · accent calmo |
| **gold** | card libro Vacunas |
| **paper-deep** | card libro Salud · fondo sección "Validado" |
| **ink dark** | sección Modo madrugada (full-bleed dark) |

### Tipografía

- **Galiner** (display, serif suave) — hero · headings sección · italic en frases manifesto + scroll narrative.
- **Inter** (sans body) — copy general · CTAs · pricing tables.

### Avatares 3D blandos (CRÍTICO para parallax)

3 avatares con la misma forma esférica pero **distinto color por fase + accesorios sutiles**:

- **Coral · Embarazo (sem 4-40)**: bola coral suave · sin extremidades · pequeño bump central que sugiere bebé dentro.
- **Blush · Bebé (0-12m)**: bola blush · pequeñas patitas/pies asomando · expresión despierta.
- **Mint · Toddler (12-36m)**: bola mint · pies más visibles + brazos pequeños · expresión curiosa.

Los 3 tienen la **misma cara canon** (ojos negros simples + sonrisa suave). Es **el mismo "ser" creciendo**, no 3 personajes distintos.

### Estados / radius / sombras

- Radius: 12px inputs · 16-20px cards · 24px modales · 9999px botones primary + avatares.
- Sombras MUY sutiles (paper inspired).
- Cards libros con tonal canon como fondo + ink text.

---

## 4 · Tone & voice canon

### Manifesto canon mayo 2026

> *"Tú cuidas a tu hij@. Grow te cuida a ti. Sin manual, sin juicios, sin urgencia."*

### Brand consistency

- "tu hij@" en hero canon · "tu peque" libre en copy contextual.
- "Para cualquier familia que cuida" implícito en inclusivity (sin necesidad de bloque dedicado · esta versión).
- **0** "futuro papá" · **0** "bebito" · **0** "mami" · **0** "racha/streak" · **0** comparativos · **0** religiosidad.

### Reglas estrictas

- **Cero foto stock de bebés** (privacy first canon · usa avatares canon DS v0.2).
- **Cero rojo médico explícito** (#FF0000) → coral-base para alertas.
- **Cero pop-ups intrusivos** · cero countdown timer fake.
- **Cero comparativos** "X% de bebés..." como hook.
- **Cero dark mode forzado** fuera de sección Modo madrugada.
- **`prefers-reduced-motion`** desactiva parallax avatar + crossfades.

---

## 5 · ARQUITECTURA · 6 secciones (canon esta versión)

### SECCIÓN 1 · HERO

**Layout mobile**: full viewport (~90vh).
**Layout desktop**: 70vh con avatar 3 fases inicial (coral) flotando en columna derecha.

**Copy canon**:

```
[Galiner · serif · semibold]
Tú cuidas a tu hij@.
Grow te cuida a ti.

[Inter · sans · regular · italic permitido]
Sin manual, sin juicios, sin urgencia.

[Microcopy bajo el sub]
De la concepción al 3er cumpleaños · ES · web y móvil.
```

**Trust signals** (4 badges horizontales bajo el hero, sobre paper-soft):

- 🩺 **Canon AEPED 2026** · validado por comité clínico
- 🔒 **Privacy first** · cifrado E2E · audio on-device
- 📋 **MDR Class IIa pathway** · Q3 2026
- 🌱 **Made by humans, for humans**

Iconografía outline reasonal-style stroke 1.5-2px. Micro-tooltip on tap.

**CTA**: `Apúntate desde €1.99/mes →` (coral primary) + `Ver cómo funciona` (ghost ink).

---

### SECCIÓN 2 · PARALLAX SCROLL · narrative-driven (CORE diferencial)

**El eje narrativo de la landing.** A medida que el usuari@ hace scroll:

- **Mobile**: pequeño tracker top-right (avatar ~64px) que cambia con crossfade entre fases.
- **Desktop**: avatar grande (~200-280px) fijo en columna lateral (sticky), cambia con crossfade entre fases.

**Progresión visual**:
- Bloques 0-3 → **coral embarazo**
- Bloques 4-7 → **blush bebé**
- Bloques 8-13 → **mint toddler**

Crossfade entre fases ~600ms con prefers-reduced-motion respetado (sin animación si activo).

**Estructura de cada frase**: tres capas verticales.
1. **Cita situación reconocible** (Galiner italic · ink-soft · grande).
2. **Cita dolor agudo opcional** (Galiner italic · ink-soft · más pequeña).
3. **Respuesta Grow** (Inter medium · ink + tonal accent · destacada en bloque tarjeta).

---

#### 🟠 Bloque 1 · Embarazo · coral · scroll position 0-3

```
[Galiner italic · grande]
"Mi cuñada me dice una cosa, mi madre otra, internet quince.
Y aún no he salido del primer trimestre."

[Galiner italic · pequeña · ink-soft]
"Llevo dos horas sin notar pataditas. ¿Es para preocuparme?"

[Card · coral tint · Inter medium]
Embarazo semana a semana. Una sola voz, basada en SEGO,
NICE y canon AEPED. Si algo merece atención, te decimos
qué mirar y cuándo llamar.
```

---

#### 🩷 Bloque 2 · Bebé 0-12m · blush · scroll position 4-7

```
[Galiner italic · grande]
"Lleva tres horas llorando.
No sé si es hambre, sueño, cólico o algo más."

[Rotación crossfade 5s cada una · Galiner italic · pequeña]
"Cada toma duele. Cada comentario también."
"Le doy biberón. Y cada vez que lo digo, alguien opina."
"'Llora por capricho', dicen. Yo solo veo a mi peque."
"Vuelvo al trabajo en seis semanas. No sé cómo voy a poder."

[Card · blush tint · Inter medium]
Lactancia, cólicos, sueño, alimentación.
Sin juicio, sin recetas únicas. Aquí estamos contigo.
```

---

#### 🌙 Bloque 3 · Modo madrugada · transición noche · paper-deep / dark hint

```
[Galiner italic · grande]
"38,2 °C a las 3 AM. ¿Voy a urgencias o espero?"

[Card · ink dark · paper text · Inter medium]
Modo madrugada. Fondo oscuro, una pregunta por pantalla, tres taps.
Te decimos si es urgencia o casa. Sin alarmar, sin minimizar.
```

(Este bloque preludia la SECCIÓN 4 dark full-bleed.)

---

#### 🟢 Bloque 4 · Toddler · hitos · mint · scroll position 8-10

```
[Galiner italic · grande]
"Mi sobrino decía veinte palabras a su edad.
El mío dice cuatro. ¿Debería preocuparme?"

[Card · mint tint · Inter medium]
Aquí no comparamos. 97 hitos de Haizea-Llevant —
la única escala validada en población española.
Si el lenguaje tarda de verdad, lo ves a tiempo.
```

---

#### 🟢 Bloque 5 · Toddler · conducta · mint · scroll position 11-13

```
[Galiner italic · grande]
"Me ha llamado la profe. Pega en la guardería
y no sé cómo hablarlo en casa."

[Card · mint tint · Inter medium]
Toddler real. Conducta, comunicación, sueño, vacunas.
Si algo merece pediatra o atención temprana,
lo verás a tiempo.
```

---

### SECCIÓN 3 · LOS 9 LIBROS

**Encabezado**:
```
[Galiner · serif · semibold]
Todo lo que necesitas, en nueve libros.

[Inter · sub]
Cada libro con su color, su evidencia y su voz.
```

**Grid 3×3** mobile + desktop (cards cuadradas). Cada card con tonal canon como fondo + icon outline + título Galiner + edad activa + CTA "Ver libro →".

| Libro | Tonal | Edad |
| --- | --- | --- |
| 🤰 Embarazo | coral | sem 4-40 |
| 🍼 Alimentación | coral | 0-3a |
| 🤱 Lactancia | blush | 0-18m |
| 💉 Vacunas | gold | 0-3a |
| 🌙 Sueño | mint nocturno | 0-3a |
| 🌡 Salud | paper-deep | 0-3a |
| 😭 Cólicos | coral | 0-6m |
| 🌱 Hitos | mint | 0-3a |
| 💛 Desarrollo | lavender | 0-3a |

CTA "Ver libro →" abre drawer/modal con preview pre-signup (curiosity hook).

---

### SECCIÓN 4 · A LAS 3 DE LA MAÑANA TAMBIÉN

**Full-bleed dark canon · ink #1A1A1A background · paper text.**

```
[Galiner · serif · semibold · paper]
A las 3 de la mañana también estamos.

[Inter · sub · paper-soft]
Modo emergencia con fondo oscuro, texto grande,
una pregunta por pantalla. Triage auditado por
urgencias pediátricas: te decimos cuándo ir y
cuándo esperar.
```

**3 chips edad-aware** (canon):
- "No para de llorar"
- "Le pasa algo"
- "No puedo más"

**Mockup phone** centrado mostrando interfaz Modo madrugada real con uno de los 3 chips visibles.

---

### SECCIÓN 5 · VALIDADO POR QUIEN SABE

**Fondo paper-deep para diferenciación visual.**

```
[Galiner · serif · semibold]
Validado por quien sabe.

[Inter · sub]
Pediatra de Atención Primaria · neonatólogo ·
psicóloga perinatal · enfermera pediátrica.
Cuatro perfiles que revisan cada palabra y cada cita.
```

**4 cards comité asesor** horizontal (mobile: 2×2 · desktop: 4 cols):
- Avatar outline canon (placeholder · estilo reasonal).
- Nombre + especialidad.
- Hospital/centro de referencia.

**Below · 3 micro-badges credenciales canon**:
- **Canon AEPED 2026 + CAV-AEP** · vacunas + revisiones niño sano.
- **Escalas validadas** · EPDS · M-CHAT-R · ASQ-3 · LATCH · BITSS · Wessel · PBA-5.
- **MDR Class IIa pathway** · Q3 2026.

---

### SECCIÓN 6 · PRICING

```
[Galiner · serif · semibold]
Te acompañamos también con el bolsillo.
```

**3 tarjetas pricing** horizontal (mobile: stack vertical · desktop: 3 cols).

#### Card 1 · Founding (highlighted con borde coral)
- **€1.99/mes** · price-lock primer año
- Primeros 1.000 founding members ES
- Acceso completo Plus
- Badge: "Solo lanzamiento"

#### Card 2 · Grow Plus (default)
- **€7.99/mes** · €69.99/año (–27%)
- Los 9 libros desbloqueados
- Chat IA contextual ilimitado
- Multi-perfil ilimitado
- Cuenta compartida co-cuidador
- Export PDF pediatra

#### Card 3 · ChildLens+ (premium)
- **€9.99/mes**
- Plus + 1 sesión mensual con consultora HUMANA
- Psicóloga perinatal o sleep consultant
- Comunidad privada
- Cross-app ChildLens ecosistema

**Bajo las cards** (Inter italic centrado):
*"14 días de Plus completo sin tarjeta. Si no es para ti, sigues con el tier gratuito sin perder nada."*

**CTA final**:
- Form email + `Apúntate desde €1.99 →` (coral primary).
- Reassurance: *"Te escribimos cuando podamos abrirte la puerta · Q3 2026. Sin spam, sin presión."*
- **Sticky bottom CTA mobile** desde scroll del bloque 2.

---

## 6 · CTAs jerárquicos

- **CTA primary coral**: `Apúntate desde €1.99 →`. Aparece en hero + sticky bottom mobile post-scroll + form final.
- **CTA secondary ghost**: `Ver cómo funciona` (anchor scroll a sección 2).
- **CTA tertiary text**: `Ver libro →` en cada card sección 3.

---

## 7 · Anti-patterns explícitos (NO HACER)

- ❌ Pop-up de waitlist al cargar.
- ❌ Countdown timer fake o urgencia falsa.
- ❌ Foto stock de bebés/familias → usa avatares canon DS v0.2.
- ❌ Comparativa "X% de bebés" como hook.
- ❌ Dark mode fuera de sección 4 Modo madrugada.
- ❌ Animaciones agresivas o autoplay video.
- ❌ Cookie banner intrusivo.
- ❌ Logo Antai/inversores.
- ❌ Branding DKV/Sanitas/partner como pillar visible.
- ❌ "Made with AI" como pillar (canon humans-for-humans).
- ❌ Comparativa explícita Bubu/Huckleberry/Kinedu.
- ❌ Testimonios con foto.
- ❌ Bloques de "para cualquier familia que cuida" con grid 6 configs (esta versión simplifica · inclusivity implícita).
- ❌ Bloque de "modos especiales" separado (esta versión los integra en cards libros + comité asesor).

---

## 8 · Layout intent

### Mobile (390px viewport iPhone 14)

- Stack vertical · 6 secciones.
- Hero 90vh para 5-second test.
- Sticky CTA bottom desde bloque 2.
- Parallax avatar top-right ~64px sticky.
- Sección 4 dark full-bleed.
- Sección 6 pricing cards stack vertical · Founding highlight con border coral.

### Desktop (1280px)

- Hero 70vh + avatar coral grande derecha.
- Sección 2 split: avatar sticky columna izquierda (~280px) · narrative columna derecha.
- Sección 3 grid 3×3 cards libros.
- Sección 4 dark full-bleed centered.
- Sección 5 comité 4 cols horizontal.
- Sección 6 pricing 3 cards horizontal · Founding highlight.

### Accesibilidad

- WCAG 2.2 AA mínimo · AAA en datos médicos críticos.
- `prefers-reduced-motion: reduce` desactiva parallax + crossfades.
- Touch targets ≥44pt.
- Contrast paper #FAF7F0 + ink #1A1A1A = 15.7:1 ✅.

---

## 9 · Output esperado

- **Archivo único**: `design/wireframes-homepage-v0.3-hi-fi.html` (self-contained · CSS inline · sin librerías externas más que Google Fonts).
- **Mobile-first responsive** (390px + 1280px breakpoints).
- **6 secciones canon** estructuradas con `<section data-section="X">`.
- **Parallax avatar funcional** con 3 fases + crossfade (referencia funcional en `wireframes-homepage-v0.1.html`).
- **DS v0.2 canon aplicado** (paleta + tipo + tonales + avatares 3D blandos + estados).
- **`<script>` inline** para parallax + crossfade frases narrative + sticky CTA mobile.
- Validar Lighthouse mobile ≥ 90.
- `prefers-reduced-motion` respetado.

### Convención de nombrado
- HTML principal: `design/wireframes-homepage-v0.3-hi-fi.html`.
- Assets ilustración (si genera nuevos avatares): `design/assets/v0.3/avatares/`.

---

## 10 · Checklist final pre-entrega

- [ ] Manifesto canon nuevo en hero: *"Tú cuidas a tu hij@. Grow te cuida a ti. Sin manual, sin juicios, sin urgencia."*
- [ ] 4 trust signals visibles en hero (no enterrados).
- [ ] Parallax avatar 3 fases funcional (coral → blush → mint).
- [ ] 5 frases scroll narrative con estructura cita + dolor opcional + card respuesta.
- [ ] Rotación crossfade 4 frases secundarias en bloque 2 (bebé).
- [ ] 9 libros con tonal canon DS v0.2 + CTA "Ver libro →".
- [ ] Sección Modo madrugada dark full-bleed + 3 chips edad-aware (no 5 rutas).
- [ ] Comité asesor 4 perfiles + 3 micro-badges credenciales.
- [ ] Pricing 3 tarjetas con Founding highlight.
- [ ] Trial 14d sin tarjeta visible.
- [ ] Sticky bottom CTA mobile post-bloque 2.
- [ ] Sin foto stock de bebés.
- [ ] Sin rojo médico explícito.
- [ ] `prefers-reduced-motion` respetado.

---

## 11 · Cambios vs v2 (13 bloques)

| v2 (13 bloques) | v3 (6 secciones) |
| --- | --- |
| Hero + manifesto extendido bloque 3 separado | Manifesto integrado en hero |
| Bloque 4 "Para cualquier familia que cuida" con 6 configs | Inclusivity implícita en parallax narrative + manifesto |
| Bloque 6 Modo madrugada standalone | Sección 4 + preludio en bloque 3 del scroll |
| Bloque 8 modos especiales | Integrados en cards libros (modo arcoíris/preemie como toggles, no bloque dedicado) |
| Bloque 10 comité asesor + bloque 9 diferenciación clínica separados | Sección 5 "Validado por quien sabe" consolidada |
| Bloque 11 form waitlist standalone | Sección 6 pricing + form integrados |
| Bloque 12 B2B teaser | Fuera (esta versión es 100% B2C · B2B en sub-página separada) |

**Resultado**: scroll más corto, narrative más fuerte, conversion path más limpio.

---

## 12 · Changelog

- **v3.0 · 2026-05-18** · Nueva arquitectura 6 secciones · parallax avatar 3 fases como eje narrativo · manifesto canon nuevo en hero · 5 frases scroll situación-dolor-solución · sin bloques de inclusivity / B2B / modos especiales standalone (integrados).
- v2.0 · 2026-05-18 · 13 bloques · superseded por v3.
- v1.0 · 2026-04-26 · Lo-fi v0.1 inicial.

---

*Brief Claude Design · Grow landing v0.3 hi-fi · 18 mayo 2026 · canon Fase 0 · trauma-informed · arquitectura 6 secciones + parallax narrative.*
