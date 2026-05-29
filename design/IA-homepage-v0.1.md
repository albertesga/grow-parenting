# Arquitectura de información · Homepage Mimo
## v0.1 · canon Fase 0 · DS v0.2

> Producto: **Mimo by The Child Lens** · Landing pública (no la app autenticada).
> Audiencias: B2C familias 1.000 días · B2B aseguradoras (DKV pilot) · partners clínicos · prensa/inversores.
> Estética guía: **editorial calmo · paper cream · Galiner + Inter · ilustración minimalista** (canon DS v0.2 · referencia tonal `reasonal.co`).

> [!NOTE]
> **Typography canon May 2026** · Documento migrado de tipografía legacy
> (Lenia + Helvena) a **Galiner + Inter**. Referencias a "Galiner italic" /
> "Galiner Italic" deben leerse como **Galiner Light 300 + `var(--ink-soft)`**
> · el corte Galiner Italic no existe en el sistema. Detalle canon ·
> `.agent/rules/typography.md`.

---

## 0 · TL;DR

La homepage tiene **un solo objetivo primario**: convertir visitas en `Acceder a Mimo` / `Waitlist v0` con **tono editorial calmo trauma-informed**, no agresivo. Estructura vertical larga · scroll generoso · sin pop-ups · sin tarjetas de tiempo limitado · sin testimonios falsos.

13 bloques canon top-to-bottom + header global + footer. Cada bloque cumple una promesa concreta del manifesto. El mismo journey de la app (1.000 días desde embarazo hasta 3 años) estructura también la landing.

Los 8 libros canon (Vacunas · Hitos · Desarrollo · Embarazo · Sueño · Alimentación · Lactancia · Salud) son el centro visual de la página · ocupan más espacio que cualquier otro bloque y son lo único que se "vende" explícitamente.

---

## 1 · Contexto y objetivos

### 1.1 Objetivo de negocio

| Objetivo | Métrica | Target v0 |
| --- | --- | --- |
| Conversión a waitlist B2C | % visitas únicas que dejan email | ≥ 8 % |
| Lead B2B DKV-style | demos solicitadas/mes | ≥ 4 |
| Engagement editorial | scroll depth > 60 % | ≥ 50 % visitas |
| Confianza clínica | tap en sección Diferenciales clínicos | ≥ 25 % visitas |

### 1.2 Objetivo emocional

La landing tiene que hacer sentir 3 cosas en orden, durante el scroll:

1. **"Me ven"** (validación primer scroll · hero + manifesto).
2. **"Esto es serio"** (canon clínico · libros · diferenciales).
3. **"Quiero probarlo"** (acceso · waitlist · CTA cierre).

Nunca pasar de la 1 a la 3 saltándose la 2 · es la trampa del marketing parental agresivo.

### 1.3 Lo que la homepage NO hace

- ❌ Pop-up de email gating.
- ❌ Banners de cookies invasivos (canon privacy first).
- ❌ Testimonios de "mamás influencer".
- ❌ Comparativas agresivas con otras apps por nombre.
- ❌ Stock photos de bebés "perfectos".
- ❌ Tarjetas tiempo limitado / FOMO.
- ❌ Chat-bot proactivo "¿en qué te ayudo?".
- ❌ Video auto-play con audio.

---

## 2 · Audiencias y JTBD

### 2.1 Personas y su Job-to-be-Done

| Audiencia | JTBD al llegar | Lo que necesita ver |
| --- | --- | --- |
| **María · embarazo 14 sem** | "¿Esta app vale la pena? Ya tengo 3 instaladas" | Hero diferenciador + Libro de Embarazo + privacy + ES first |
| **Pablo · co-cuidador 4 m** | "¿Puedo usarla sin ser quien más cuida?" | Co-cuidado · cuenta compartida · "para los dos" |
| **Carmen · monoparental** | "¿Asume que soy mamá tradicional?" | Modos especiales · lenguaje inclusivo · sin "papá supuesto" |
| **Lucía · embarazo arcoíris** | "¿Me van a alegrar sin saber por lo que paso?" | Modo arcoíris mencionado · sin celebracion default · tono atemperado |
| **Pediatra Dra. Comas** | "¿Esto manda gente a urgencias sin necesidad?" | Sección clínica · canon AEPED 2026 · "Aquí no diagnosticamos" |
| **DKV partnership lead** | "¿Es serio? ¿Hay regulación?" | Sección B2B · MDR Class IIa · pilot disponible |
| **Inversor / Antai · prensa** | "¿Cuál es la tesis? ¿Es repetible?" | Manifesto · mercado · diferenciales · equipo |

### 2.2 Variantes consideradas

¿Una landing o varias?

**Decisión v0**: **una sola landing** · B2C primero · con sección B2B/Pediatras al final separada y enlazada desde header.

Razón: el mercado real es B2C · DKV es pilot. Una landing dispersa pierde conversión. v1.5+ podemos hacer `/clinico` y `/pro` dedicados.

---

## 3 · Mapa de la página · sitemap vertical

```
┌─────────────────────────────────────────────────┐
│ HEADER GLOBAL (sticky)                          │
│  logo · libros · clínico · acceder · ES/EN     │
├─────────────────────────────────────────────────┤
│                                                 │
│  1 · HERO                                       │
│    Manifesto principal + Avatar 3 fases         │
│                                                 │
├─────────────────────────────────────────────────┤
│  2 · MANIFESTO EXTENDIDO                        │
│    Frase larga centrada · Galiner italic          │
├─────────────────────────────────────────────────┤
│  3 · ¿PARA QUIÉN?                               │
│    Inclusivo · sin género forzado               │
├─────────────────────────────────────────────────┤
│  4 · CÓMO TE ACOMPAÑA · 1.000 DÍAS              │
│    Timeline horizontal con fases                │
├─────────────────────────────────────────────────┤
│  5 · LOS LIBROS                                 │
│    Grid 8 libros · clic abre detalle            │
│    El bloque más extenso de la página           │
├─────────────────────────────────────────────────┤
│  6 · MODO 3AM                                   │
│    Diferencial fuerte · dark hint               │
├─────────────────────────────────────────────────┤
│  7 · CO-CUIDADO                                 │
│    Cuenta compartida · pareja sim sin género    │
├─────────────────────────────────────────────────┤
│  8 · MODOS ESPECIALES                           │
│    Arcoíris · preemie · monoparental · etc.     │
├─────────────────────────────────────────────────┤
│  9 · DIFERENCIALES CLÍNICOS                     │
│    Canon AEPED · escalas · PPG · trauma-inf.    │
├─────────────────────────────────────────────────┤
│ 10 · PRIVACY FIRST                              │
│    Cero ads · GDPR · on-device · sin entrenar IA │
├─────────────────────────────────────────────────┤
│ 11 · ACCESO                                     │
│    Waitlist v0 / Probar / Pricing si aplica     │
├─────────────────────────────────────────────────┤
│ 12 · PARA CLÍNICOS Y ASEGURADORAS               │
│    Sección dedicada B2B · enlaces detalle       │
├─────────────────────────────────────────────────┤
│ 13 · FAQ                                        │
│    8-10 preguntas canon                         │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│  Compañía · legal · clínico · contacto         │
└─────────────────────────────────────────────────┘
```

---

## 4 · Detalle por bloque

### Bloque 0 · Header global · sticky

**Propósito**: navegación · acceso · branding.

**Composición**:
- Logo Mimo (Galiner bold) izquierda · tap → `top`.
- Centro · 3 links: `Libros` · `Para clínicos` · `Por qué Mimo`.
- Derecha: selector idioma `ES / EN` · botón `Acceder` (ink fill).

**Comportamiento**:
- Sticky top con paper-soft bg al hacer scroll.
- En mobile · hamburguesa con drawer.
- Sin animaciones agresivas · solo `transition: 200ms ease-out`.

---

### Bloque 1 · Hero

**Propósito**: claim emocional + visual canon · convertir scroll inicial.

**Composición**:
```
[ eyebrow · uppercase 11px · ink-muted ]
 MIMO · LOS 1.000 PRIMEROS DÍAS

[ hero claim · Galiner bold 56-72px · ink ]
 Tú cuidas a tu hij@,
 y Mimo te cuida a ti.

[ sub-claim · Inter 18px · ink-soft · 2 líneas max ]
 La compañera que faltaba para el embarazo,
 la crianza y todo lo que viene en medio.

[ CTA primaria · ink fill ]      [ CTA secundaria · ghost ]
 Probar Mimo gratis             Ver cómo funciona

[ Avatar 3 fases · 3 imágenes 3D apiladas o lado a lado ]
  blush (bebé) · coral (embarazo) · mint (toddler)
```

**Visual hero**:
- Composición editorial generosa · aire generoso.
- Avatares 3D apilados con leves rotaciones (-3° a +3°) tipo sticker.
- Fondo `paper` cream · NO photo.
- Posible tag-cloud sutil con palabras del journey ("primera palabra · vacunas · sueño · regresión · cólicos · hito").

**Sin**:
- Sin contador animado.
- Sin testimonios en hero.
- Sin video.

---

### Bloque 2 · Manifesto extendido

**Propósito**: emocional · valor · tono.

**Composición**:
- Background `paper-soft`.
- Texto centrado · ancho 720px max.
- Frase Galiner italic 32px:

> *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor."*

- Pull-quote sub Inter 16px:

> *"Made by humans, for humans. Acompañamos sin diagnosticar, sin juzgar, sin militancia."*

- Pequeña separación visual con divisor `· · ·` ink-muted.

---

### Bloque 3 · ¿Para quién?

**Propósito**: inclusividad · sin asumir género ni configuración familiar.

**Composición**:
- H2 Galiner medium: `Para cualquier familia`.
- Sub Inter 15: `Madre · padre · pareja del mismo sexo · adopción · subrogación · monoparental · acogimiento · abuel@s tutor@s.`.
- 6 ilustraciones outline geométricas mini (4-6 configuraciones familiares · estilo reasonal.co iconography).
- Frase cierre Galiner italic 18:
> *"Si tu corazón cuida de alguien pequeño, esto es para ti."*

---

### Bloque 4 · Cómo te acompaña · 1.000 días

**Propósito**: estructura temporal del producto.

**Composición**:
- H2: `Los primeros 1.000 días · contigo`.
- Sub Inter: `Desde la concepción hasta el tercer cumpleaños. Una conversación que dura años.`
- **Timeline horizontal** scrubeable (con touch) · 4 etapas grandes:
  - 🤰 Embarazo · sem 0-40
  - 👶 Recién nacido · 0-3 m
  - 🐣 Bebé · 3-12 m
  - 🌱 Crianza · 12-36 m
- Cada etapa con caption corto Galiner medium + 1-2 hitos canónicos esperables.
- CTA debajo: `Ver el journey completo →` lleva a sección dedicada o ancla a bloque 5.

---

### Bloque 5 · Los libros · **el bloque protagonista**

**Propósito**: explicar el producto a través de su pieza más concreta y diferencial.

**Composición**:
- H2 Galiner bold 36px: `8 libros para acompañarte.`
- Sub Inter 16: `Cada libro es un destino con sentido. Vacunas, sueño, cólicos, alimentación, y todo lo que pasa entre medias. Cuando los necesitas, están. Cuando no, no estorban.`
- **Grid 4×2 de libros** (o 2×4 en mobile) · cada libro con su tonal canon:

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🤰 Embarazo│ │ 🍼 Alim. │ │ 🤱 Lact. │ │ 💉 Vac.  │
│  coral   │ │  coral   │ │  blush   │ │  gold    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🌙 Sueño │ │ 🌡 Salud │ │ 🌱 Hitos │ │ 📊 Desar.│
│  mint    │ │  paper-d │ │  mint    │ │  lilac   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

- Cada libro = card paper-soft con borde tonal · emoji-icon · "Libro de X" Galiner bold · sub Inter 13 (1 línea: qué hace).
- Tap → modal/drawer con detalle del libro (qué contiene · cuándo se activa · screenshots hi-fi).
- Frase cierre Inter italic:
> *"También está el Modo madrugada y el Diario. Te lo enseñamos abajo."*

---

### Bloque 6 · Modo madrugada

**Propósito**: diferencial emocional fuerte · pocos competidores tienen esto.

**Composición**:
- **Fondo dark** (paleta `night` `#1A1D24`) o paper con transición visual sutil.
- H2 Galiner bold 36px · `night-fg`: `A las 3 de la mañana, también.`
- Sub Inter 16: `El llanto inconsolable, la fiebre que no baja, el sentir que no puedes más. El Modo madrugada cambia el tono cuando lo necesitas.`
- Mockup phone mini con la pantalla canon:
> *"Este es un modo urgencia. Las respuestas son más rápidas, más directas y sin juzgar."*
- 3 chips de opciones (sin desarrollar):
  - "No para de llorar"
  - "Le pasa algo a mi hij@"
  - "No puedo más"
- CTA: `Conocer el Modo madrugada →` lleva a página dedicada o expand drawer.

---

### Bloque 7 · Co-cuidado

**Propósito**: pareja co-cuidadora canon · diferencial inclusivo.

**Composición**:
- H2: `Para los dos · y para vuestra red.`
- Sub: `Una cuenta compartida que entiende que no cuida una sola persona. Tu pareja, tu madre, tu mejor amiga. Cuando lo necesitas, ofreces relevo en un tap.`
- 2 phone mockups mini lado a lado:
  - Phone 1: María recibiendo "Lola lleva 30 min llorando · ¿paso a Pablo?".
  - Phone 2: Pablo recibiendo el push síncrono "voy en 5 min · 8 min · llamo".
- 3 bullets canon:
  - Roles simétricos · sin género forzado.
  - Push síncrono en tiempo real.
  - Funciona para pareja del mismo sexo · monoparental con red · abuel@s tutor@s · adopción · subrogación.

---

### Bloque 8 · Modos especiales

**Propósito**: inclusividad y trauma-informed sin militancia.

**Composición**:
- H2: `Hay muchas maneras de empezar.`
- Sub: `Embarazo arcoíris, preemie, monoparental, adopción. Mimo se adapta sin que tengas que pedirlo.`
- **6 cards horizontal scroll** o grid:
  - 🌈 Modo arcoíris (post-pérdida) · *"Sin contadores celebratorios. Acompañamiento que respeta tu duelo."*
  - 🐣 Modo preemie · *"Edad corregida en hitos, vacunas y cribados."*
  - 👤 Monoparental · *"Red de apoyo en lugar de pareja."*
  - 🏳️‍🌈 Pareja mismo sexo · *"Roles simétricos · sin género asumido."*
  - 💛 Adopción · *"Hitos cronológicos desde la llegada."*
  - 🤝 Subrogación · *"Lenguaje y journey adaptados."*
- Frase canon en italic Galiner 18:
> *"Si tu caso no aparece aquí, igual te acompañamos. Escríbenos."*

---

### Bloque 9 · Diferenciales clínicos

**Propósito**: confianza médica · canon · contraste con apps de marketing.

**Composición**:
- H2: `Información honesta. Tono cuidado.`
- Sub: `La diferencia entre una app de tracking y una compañera clínica está en de dónde viene cada palabra.`
- **3-4 cards** horizontal:

```
┌─────────────────────────────┐
│ 📐 Canon AEPED 2026         │
│ Calendario vacunal de tu    │
│ país, no de otro. Hitos     │
│ Haizea-Llevant default.     │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🔬 Escalas validadas        │
│ EPDS · M-CHAT-R · ASQ-3.    │
│ Embebidas en conversación,  │
│ no como tests.              │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 📷 Vitales sin hardware     │
│ Frec. respiratoria, presión │
│ arterial, frec. card. con   │
│ cámara · canon PPG.         │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🤝 Aquí no diagnosticamos   │
│ Acompañamos · escalamos     │
│ a tu pediatra cuando toca · │
│ trauma-informed canon.      │
└─────────────────────────────┘
```

- Footer cita: `Fuentes · AEPap · NICE · AAP · CAV-AEP 2026 · NSBSP · WHO LMS`.

---

### Bloque 10 · Privacy first

**Propósito**: diferencial anti-mercado.

**Composición**:
- H2: `Tus datos. Tuyos.`
- Sub: `Sin ads. Sin venta a terceros. Sin entrenar modelos de IA con vuestra conversación. Cifrado y exportable.`
- 4 bullets icon + texto:
  - ✅ Cero anuncios · siempre.
  - ✅ Cifrado E2E · GDPR · canon EU.
  - ✅ Audio (cólicos · llanto) procesado on-device.
  - ✅ Export PDF total cuando quieras · derecho borrado completo.
- CTA discreto: `Leer política de privacidad →`.

---

### Bloque 11 · Acceso · waitlist v0 o pricing

**Propósito**: cierre conversión.

**Composición**:
- H2 Galiner bold 36-44px: `Cuando lo necesites, aquí.`
- Sub Inter 16: `Estamos en pruebas con familias. Apúntate, te avisaremos cuando podamos abrirte la puerta.`
- **Form simple** (un solo campo email + botón):

```
[ tu email ........................ ] [ Apúntate ]
```

- Microcopy debajo Inter 12 muted:
*"Sin spam. Te escribimos cuando podamos abrirte el acceso."*

- (v1.5+) Si hay pricing:
  - 2 tiers · `Esencial · gratis` · `Plus · X €/mes`.
  - Sin "más popular" agresivo.

---

### Bloque 12 · Para clínicos y aseguradoras

**Propósito**: B2B · pilot DKV-style · partners.

**Composición**:
- Background `paper-deep` o diferenciado del flujo B2C.
- H2: `Si trabajas con familias, hablemos.`
- Sub: `Mimo está en pilot con aseguradoras y centros pediátricos. Aplicaciones clínicas + reducción de visitas innecesarias + activación de cribados validados.`
- 3 columnas mini:
  - **Aseguradoras** · "Pilot DKV-style · CE-marked roadmap · MDR Class IIa."
  - **Pediatras** · "Tu paciente llega con el carnet sanitario listo. Tú decides cómo usarlo."
  - **Doulas · lactancieras** · "Tu trabajo profesional sale del WhatsApp y entra en una conversación con memoria."
- CTA: `Solicitar demo o pilot →` (lleva a form contacto B2B).

---

### Bloque 13 · FAQ

**Propósito**: cerrar dudas frecuentes pre-decisión.

**Composición**:
- H2: `Preguntas frecuentes.`
- 8-10 preguntas como accordion (Inter 15):

  1. ¿Sustituye Mimo al pediatra?
  → *"No. Acompañamos entre visitas, escalamos cuando toca."*
  2. ¿Funciona si solo está mi pareja?
  → *"Sí. La cuenta compartida funciona para ambos por igual."*
  3. ¿Y si mi hij@ es prematuro?
  → *"Modo preemie activa edad corregida automáticamente."*
  4. ¿Y si tuve una pérdida gestacional?
  → *"Modo arcoíris. Sin contadores celebratorios. Con cuidado."*
  5. ¿Qué idiomas?
  → *"Español (España) y English (paralelos). Catalán pronto."*
  6. ¿Funciona offline?
  → *"PWA · sí, las funciones core sí."*
  7. ¿Mi pediatra puede ver mis datos?
  → *"Solo lo que tú exportes y compartas con ella/él."*
  8. ¿Hay versión iPad / web / móvil?
  → *"PWA · funciona en cualquier dispositivo con navegador moderno."*
  9. ¿De dónde vienen las citas clínicas?
  → *"Canon AEPED 2026 · NICE · AAP · WHO · siempre con fuente y año."*
  10. ¿Cómo se cobra?
  → *"Esencial gratis. Plus opcional. Sin ads · jamás."*

---

### Footer

**Composición**:

```
╔════════════════════════════════════════════╗
║ Mimo                                       ║
║ Los 1.000 primeros días · contigo.         ║
║                                            ║
║ Producto    Compañía     Legal             ║
║ Libros      Quiénes      Privacy           ║
║ Modo madrugada    Manifiesto   Términos          ║
║ Diario      Blog         Cookies (sin ads) ║
║ Co-cuidado  Prensa       Compliance MDR    ║
║                                            ║
║ Para clínicos      Contacto                ║
║ Pediatras          hola@mimo.family           ║
║ Aseguradoras       LinkedIn                ║
║ Doulas             X / Bluesky             ║
║                                            ║
║ Sources canon clínicos:                    ║
║ AEPap · CAV-AEP 2026 · NICE · AAP · WHO    ║
║ · Haizea-Llevant · NSBSP                   ║
║                                            ║
║ Hecho con cuidado en Barcelona.            ║
║ Antai Venture Studio · 2026                ║
╚════════════════════════════════════════════╝
```

---

## 5 · Microcontent · library de claims canon

### 5.1 Hero claims (4 variantes para A/B)

| ID | Claim | Sub-claim |
| --- | --- | --- |
| A · canon | *"Tú cuidas a tu hij@, y Mimo te cuida a ti."* | *"La compañera que faltaba para el embarazo, la crianza y todo lo que viene en medio."* |
| B · 1000d | *"Los primeros 1.000 días, contigo."* | *"Embarazo, sueño, vacunas, cólicos. En un sitio. Sin juzgar."* |
| C · honest | *"Información honesta. Tono cuidado."* | *"La compañera clínica que faltaba para los primeros 1.000 días."* |
| D · noche | *"A las 3 de la mañana, también."* | *"Hecha para los días largos y las noches que parecen no acabar."* |

Mi recomendación firme: **A** como default · es la canon Fase 0 ya pulida.

### 5.2 CTAs · jerarquía

- Primaria · `Probar Mimo gratis` (ink fill · pill 14px Inter medium).
- Secundaria · `Ver cómo funciona` (ghost ink border).
- Terciaria · `Apúntate a la lista` (link underline · Inter 14).
- B2B · `Solicitar demo o pilot →` (ghost paper-deep border).

### 5.3 Microcopy clave

- Bloque manifiesto: *"No hay una manera correcta. Hay la tuya."*
- Bloque privacy: *"Tus datos. Tuyos."*
- Bloque 3AM: *"A las 3 de la mañana, también."*
- Footer manifesto: *"Hecho con cuidado en Barcelona."*

### 5.4 Lo que NUNCA dice la landing

- ❌ "¡La mejor app de parenting!"
- ❌ "Únete a 100k+ mamás".
- ❌ "Por qué tu bebé llora · solución".
- ❌ "Recupera tu cuerpo" / "Vuelve a ser tú misma".
- ❌ "Como una app de meditación, pero para mamás".
- ❌ "¡Probado por miles de mamis!".
- ❌ Diminutivos · religiosidad · militancia.

---

## 6 · Modos visuales y estética

### 6.1 Paleta de la landing

- Background principal · `paper` `#FAF7F0`.
- Background alterno secciones · `paper-soft` `#F2EDE0`.
- Background dark (sólo bloque 6 Modo madrugada) · `night-bg` `#1A1D24`.
- Acentos por categoría (en bloque Libros) · 8 tints DS v0.2.
- Ink principal · `#34342D`.

### 6.2 Tipografía

- Display claims · **Galiner** Bold 56-72px (hero) · 36-44px (H2 secciones).
- Body · **Inter** Regular 15-16px · medium 18 para sub-claims.
- Italic · Galiner Italic solo para frases manifesto.
- Caption · Inter Medium uppercase 11px · letter-spacing 0.18em.

### 6.3 Avatares 3 fases

- Hero principal · 3 imágenes (blush · coral · mint) levemente rotadas, tipo sticker.
- Bloque ¿Para quién? · 6 ilustraciones outline geométricas mini.
- Bloque libros · cada libro con icon vectorial outline, NO avatar 3D dentro.
- Bloque co-cuidado · 2 avatares apilados (cuidador/a + co-cuidador/a) simétricos.

### 6.4 Ilustración minimalista (estilo reasonal.co)

- Outline · stroke 1.5-2px · esquinas redondeadas.
- Sin sombras agresivas · sin gradientes pastel.
- Stickers / tags / clouds editoriales (canon DS).

---

## 7 · Variantes por audiencia · multilingüe

### 7.1 Idiomas

- **ES (España)** · default.
- **EN (paralelo)** · no traducción literal · adaptación de tono.
- **CA (catalán)** · roadmap v1.5 (Antai está en Barcelona · valor regional).

### 7.2 Detección y switcher

- Auto-detect navegador · pero respetar manual switch.
- Switcher visible en header · ES/EN como botones cortos.
- Persistir elección en cookie funcional (no de tracking).

### 7.3 ¿Una landing o varias?

| Opción | Pros | Contras |
| --- | --- | --- |
| Una sola landing | Simple · conversión enfocada · menos mantenimiento | Mezcla mensajes B2C/B2B |
| Tres landings: `/`, `/clinico`, `/pro` | Mensajes claros por audiencia | Más mantenimiento |

**Recomendación v0**: una landing principal + página dedicada `/clinico` (mini) para B2B y `/manifiesto` (extensión filosófica). v1.5+ pueden separarse.

---

## 8 · SEO + metadata

### 8.1 Title canon

- ES: `Mimo · La compañera para los 1.000 primeros días · embarazo, crianza y bienestar familiar`
- EN: `Mimo · The first 1,000 days companion · pregnancy, parenting, and family wellbeing`

### 8.2 Meta description

- ES: `Información honesta y tono cuidado para los primeros 1.000 días. Calendario AEPED 2026, hitos Haizea-Llevant, modo 3AM, co-cuidado y privacy first. Sin diagnósticos. Sin juzgar.`
- EN: análoga.

### 8.3 OG image

- Hero claim grande sobre paper cream.
- Avatar 3 fases lateral.
- Logo discreto.

### 8.4 Keywords objetivo

- "app embarazo en español"
- "calendario vacunas AEPED 2026"
- "hitos del bebé Haizea-Llevant"
- "cólicos del lactante app"
- "modo arcoíris embarazo app"
- "co-cuidador app"
- "EPDS postparto app"

### 8.5 Schema.org

- `WebApplication` para la app · `Organization` para Mimo · `MedicalEntity` referenced for clinical credibility (no usar `Hospital` ni `Physician`).

---

## 9 · Accesibilidad

- AAA contraste para body sobre cream.
- AA contraste para captions y links.
- Touch targets ≥ 44×44.
- Sin auto-play.
- Skip-to-content link.
- ARIA labels en avatares, ilustraciones e iconos.
- Lector de pantalla amigable con todos los bloques.
- Sin animaciones que disparen con motion-sickness (prefers-reduced-motion respected).

---

## 10 · Performance

- Lazy load todo lo que está por debajo del fold.
- Avatares 3D · SVG / WebP / AVIF responsive.
- Fonts · Galiner + Inter auto-subset + display:swap (canon DS v0.2 ya implementado en `prototype.html`).
- Target Lighthouse > 90 mobile y desktop.
- Target LCP < 2.5s.

---

## 11 · Decisiones abiertas

1. **CTA hero**: "Probar Mimo gratis" vs "Apúntate a la lista" para v0 (depende de si hay app pública o solo waitlist). Recomendación: si solo waitlist → "Apúntate".
2. **Bloque pricing**: incluir desde v0 o solo "free durante beta"? Recomendación: solo "gratis durante beta · te avisaremos si cambia".
3. **Bloque testimonios**: ¿incluir si no hay todavía? Recomendación: NO · solo cuando haya genuine.
4. **Video hero**: ¿hacer 30s de "cómo se siente Mimo"? Recomendación: NO en v0 · v1.5 si producto está maduro.
5. **Blog**: ¿enlazar desde header? Recomendación: NO en v0 · v1.5 con content fase 5.
6. **Galería screenshots app**: ¿incluir? Recomendación: NO en hero · sí en bloque "Los libros" como mini-mockups.
7. **Mascot vs producto en hero**: ¿el avatar 3 fases es protagonista o el screenshot del producto? Recomendación: avatar 3 fases · más editorial · más diferenciador.
8. **¿Landing distinta para Antai/inversores?**: Recomendación: una página `/historia` que cuenta la tesis · accesible desde footer.

---

## 12 · Anexos

### 12.1 Referencias visuales canon

- `reasonal.co` · tono editorial · whitespace · ilustración outline.
- `notion.so` · header sticky · CTAs claros.
- `linear.app` · tipografía editorial · sin estridencia.
- `arc.net` · paleta cream + avatares blandos.
- `framer.com` · grid limpio · estética profesional.

### 12.2 Componentes DS Mimo v0.2 referenciados

- `book-shelf` · grid de libros canon (existe ya en `prototype.html`).
- `book-card` con tonal categoría.
- `cat-card` (para bloques de feature).
- `callout` para frases manifiesto.
- `phn-nav` mini-mockup phone (canon Primitives).
- `chip-strip` (3 chips Modo madrugada).
- Button primary/secondary/ghost canon.
- Form input + submit canon.
- Accordion para FAQ (a definir como primitive en DS v0.3).

### 12.3 Cross-ref con otros docs canon

- `PRD-libro-salud-v0.1.md` (sección bloque libros · linkea a salud).
- `PRD-libro-colicos-v0.1.md` (sub-libro · mencionable en bloque 6).
- `PRD-chat-modo-madrugada-v0.1.md` (bloque 6 Modo madrugada).
- `prototype.html` · libros canon en producto autenticado.
- `Mimo Foundations v0.1` · tokens.
- `Mimo Product Components v0.1` · cat-card, chips, callouts.
- `grow-landing.html` · iteración previa de landing · servirá de base hi-fi.
- `Notion · Manifiesto v2.10 · Fase 0` (canon textos).

### 12.4 Stack técnico landing

- Next.js 15 (canon Mimo).
- Static / ISR (la mayoría del contenido es estático).
- Tailwind + shadcn/ui (canon DS).
- Image · Avif/Webp · responsive · Next/Image.
- Form submit · Supabase Auth waitlist.
- Analytics · PostHog autohosted (canon Mimo stack).
- Sin chat-bot proactivo · sin pop-ups.

---

## 13 · Checklist para arrancar diseño hi-fi

| Bloque | Status | Owner |
| --- | --- | --- |
| IA canon (este doc) | ✅ done v0.1 | Tito + Claude |
| Wireframes lo-fi 13 bloques | ⏳ pending | Claude o Claude Design |
| Hi-fi en DS v0.2 | ⏳ pending | Claude Design |
| Microcontent ES finalizado | ⏳ 80 % | content owner |
| Microcontent EN finalizado | ⏳ pending | content owner |
| Avatares 3D adaptados a hero | ⏳ pending | diseño 3D |
| Ilustraciones outline 6 configs familias | ⏳ pending | ilustrador@ |
| Phone mockups mini para bloques 6, 7 | ⏳ pending | Claude Design |
| Implementación Next.js | ⏳ pending | ingeniería |
| OG image + metadata SEO | ⏳ pending | diseño |
| Schema.org · accessibility audit | ⏳ pending | ingeniería |
| Lighthouse > 90 · LCP < 2.5s | ⏳ target | ingeniería |
| Waitlist form a Supabase | ⏳ pending | ingeniería |
| Analytics PostHog events | ⏳ pending | ingeniería |
| Legal · términos · privacy | ⏳ pending | legal |

---

*IA homepage Mimo v0.1 · canon Fase 0 · alineado DS v0.2 + prototype canon libros · abril 2026*
