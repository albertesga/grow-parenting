# Claude Design brief · Grow Onboarding v2 (hi-fi)
## canon mayo 2026 · derivado de trans/onboarding-canon + DS v0.2 + Fase 0

> Brief pegable a Claude Design para producir los wireframes hi-fi del onboarding de Grow. Implementa el onboarding mínimo de 3 preguntas (≤60s) + progressive profiling + screenings clínicos en momentos canon + capa B2B opcional.

> [!NOTE]
> **Typography canon May 2026** · Brief migrado de tipografía legacy
> (Lenia + Helvena) a **Galiner + Inter**. Referencias a "Galiner italic"
> deben leerse como **Galiner Light 300 + `var(--ink-soft)`** · el corte
> Galiner Italic no existe (canon `.agent/rules/typography.md`).

---

## 0 · TL;DR (≤200 palabras)

Diseña **6 pantallas hi-fi mobile-first** del onboarding mínimo de Grow + las **tarjetas de progressive profiling** que aparecen en el feed durante las primeras 4 semanas. Base canónica: notion `📝 trans/onboarding-canon`. Aplica **DS v0.2 canon** (paper-cream + 8 tonales + Galiner/Inter + avatares 3D blandos coral/blush/mint). Manifesto canon mayo 2026: *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor. Para cualquier familia que cuida."* Principios: (1) Una sola pregunta por pantalla. (2) Anónimo first 24h (no login obligatorio · canon §auth-canon). (3) Sin password nunca · Apple/Google/magic link. (4) Quick win garantizado en pantalla 4 (Timeline visible con avatar canon en su fase). (5) Tarjetas de progressive profiling no bloqueantes en el feed posterior. (6) Screenings clínicos validados (EPDS · M-CHAT-R · ASQ-3 · PBA-5) embebidos como conversación, nunca como "test médico". (7) Capa B2B (DKV pilot) opcional con consentimiento granular y solo después del primer Quick win. Output: HTML single-file responsive + CSS inline + sin librerías externas excepto Google Fonts (Galiner + Inter).

---

## 1 · Inputs obligatorios

1. **Spec canon**: notion [📝 trans/onboarding-canon](https://www.notion.so/34d55399748a81c4945bd6dffa44bb30) (decisiones D1-D6 cerradas · screenings con timing · copy ES+EN).
2. **DS v0.2 canon**: `design/Grow Design System v0.2.html` (8 tonales · Galiner/Inter · avatares 3D blandos · estados card).
3. **Fase 0 source of truth**: notion `🌱 Fase 0 — Manifiesto + Arquitectura` (manifesto v2 mayo · 9 libros · 6 modos especiales · auth canon).
4. **Pricing canon**: notion `💰 Pricing strategy + GTM` (free tier robusto · trial 14d sin tarjeta · Founding €1.99).
5. **Research v0.1**: notion `🔬 Research sintético deep dive v0.2` (canon Pablo/Carmen friction-killer + canon Ingrid contexto preemie + canon Lucía modo arcoíris).

---

## 2 · Estructura del onboarding (6 pantallas core + B2B opcional)

### P0 · Welcome (sin pregunta)

- Background paper-cream canon.
- Logo Grow + manifesto canon v2 completo en Galiner italic:
  > *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor."*
  > *"Para cualquier familia que cuida."*
- Avatares 3 fases canon flotando suavemente (coral · blush · mint).
- CTA primary coral: `Empezar`.
- Link tertiary ink: `Tengo cuenta — entrar` (lleva a auth canon sign-in).

### P1 · Anchor question · ¿dónde estás?

> "¿Dónde estás ahora mismo?"
> Sub Inter: *"Esto cambia todo lo que verás. Puedes editarlo en cualquier momento."*

5 opciones · cada una con tonal canon de su libro principal:

- 🌱 **Estoy embarazada / esperamos** → tonal coral
- 🐣 **Acabamos de tener al hij@ (< 1 mes)** → tonal blush
- 👶 **Tengo un hij@ en casa (1-12 m)** → tonal blush
- 🧒 **Tengo un hij@ más mayor (1-3a)** → tonal mint
- 🤔 **Estamos pensándolo** → modo lurker · sin perfil · paper-soft

Una opción por pantalla scroll vertical mobile · grid 2×3 desktop.

### P2 · Fecha (branched)

**Rama A — Embarazo:**
> "¿Cuándo es la fecha estimada de parto?"
> Helper: *"Si no la sabes aún, podemos calcularla a partir de tu última regla."*
> Date picker + toggle "Calcularla por la regla" → date picker LMP.

**Rama B — Nacido:**
> "¿Cuándo nació?"
> Date picker.
> Pregunta opcional: *"¿Fecha estimada de parto? (si nació antes o después)"* → trigger modo preemie auto si <37 sem.

**Rama C — Lurker:** salta a feed con contenido genérico.

CTA primary: `Continuar`.

### P3 · Nombres (opcional)

> "¿Cómo te llamamos? Y al hij@, ¿le habéis puesto ya nombre?"
> Helper: *"Lo usamos solo para que la app te hable como persona. Si aún no tiene nombre, déjalo en blanco — luego lo añades."*

- Input "Tu nombre" (placeholder neutro: "Tu nombre")
- Input "Nombre del hij@ (opcional)"
- CTA primary coral: `Ver mi Timeline`.

### P4 · Timeline personalizado (Quick win)

> ⚠️ **Esto es el quick win garantizado.** 80% más retención si llegan aquí en ≤60s (canon BabyCenter case study).

- Avatar canon en la fase correspondiente (coral · blush · mint según rama P1).
- Timeline con 3-5 hitos próximos visibles inmediatamente.
- Calendario con fase activa marcada.
- Manifesto canon repetido al pie (Galiner italic, paper-soft).
- Bottom nav 5-tab + FAB central ya visible (canon DS v0.2): `Hoy · Calendario · ⊕ · Chat · Yo`.
- Toast no-bloqueante en bottom: *"Tu Timeline está listo. Empezamos."*

### P5 · Auth tras 24h (opcional · no bloqueante)

> ⚠️ Aparece como **tarjeta en el feed** tras 24h o tras un momento clave (post-hito, post-screening). No es pantalla aparte.

> "¿Guardamos tu progreso?"
> Sub: *"Para que no pierdas nada y puedas invitar a quien cuida contigo."*

3 vías canon (sin password nunca):

- `Apple` (sign-in)
- `Google` (sign-in)
- `Email mágico` (magic link · expira 15 min)

CTA secondary ghost: `Más tarde`.

Errores trauma-informed: *"Este enlace ya caducó · no es nada que hayas hecho mal."*

### P6 · B2B aseguradora (opcional · solo si llega vía partner)

> ⚠️ **Solo aparece** si el usuario llega vía link DKV/Sanitas/Adeslas. **Después de timeline + sesión 1 completada** (canon D4).

> "Tu aseguradora [DKV] paga Grow para ti."
> Sub: *"Tú decides qué compartir con ellos. Puedes cambiarlo cuando quieras."*

Toggles granulares · default = mínimo necesario:

- ☐ Hitos vacunales y revisiones cumplidas (recomendado)
- ☐ Resultados screenings de desarrollo (M-CHAT-R · ASQ-3)
- ☐ Resultados screenings salud mental (EPDS · PBA)
- ☐ Datos utilización app (cuando evitaste urgencias)
- ☐ Antecedentes familiares y datos perinatales
- ☐ Nada por ahora *— puedes activarlo más tarde*

Disclaimer trauma-informed prominente:
> *"Línea roja: Grow nunca comparte datos individuales con tu aseguradora para ajuste de prima. Solo agregados anónimos para reporting de programa."*

CTA primary: `Activar y empezar`.
CTA secondary: `Saltar`.

---

## 3 · Progressive profiling (tarjetas en feed D1-D30)

Las tarjetas aparecen en el feed Home / Hoy como cards canon DS v0.2 (estados doing/done/snoozed) · una por sesión max · siempre dismisseable. Detalle completo en notion `📝 trans/onboarding-canon §4`.

### D1-D7 · capa relacional

- Es vuestro primer hij@ (sí/no) → tono del contenido.
- Hay otra persona que cuida contigo → trigger invitar co-cuidador (canon Pablo).
- Idioma del hogar → fase 0 ES default · Fase 0.5+ multilenguaje.
- Modo especial activo (preemie auto si <37 sem · arcoíris toggle · monoparental · adopción · subrogación · mismo sexo).
- Notificaciones (canon §trans/notificaciones-canon): *"Para recordatorios de hitos · nunca para spam."*
- Apodo del hij@ (opcional).

### D7-D30 · capa contextual + clínica light

Si embarazo: bajo riesgo · embarazos previos · hospital previsto.
Si postparto: tipo de parto · lactancia · peso al nacer · antecedentes familiares relevantes.

### D30+ · screenings clínicos

| Instrumento | Cuándo | Framing canon |
| --- | --- | --- |
| EPDS | 3T + 6-8 sem postparto + 6m + 12m | *"Cómo te encuentras tú"* |
| EPDS adaptado padre | 6-8 sem + 6m postparto | *"Y tú, ¿cómo estás llevando esto?"* |
| M-CHAT-R | 18m + 24m | *"Hitos de comunicación"* · sin nombrar autismo |
| ASQ-3 | 2 · 4 · 6 · 9 · 12 · 18 · 24 · 30 · 36 meses | *"Vamos a ver cómo va el hij@"* |
| PBA-5 | 3 · 6 · 12 · 24 meses postparto | *"¿Cómo está siendo para ti ser madre/padre?"* |
| LATCH | inicio lactancia | dentro libro Lactancia |
| BITSS | caca tracker | dentro libro Alimentación |
| Wessel + Roma IV | inicio cólicos | dentro libro Cólicos |

Reglas canon:
- Nunca como formulario · siempre como conversación con el avatar / Chat IA.
- Resultados positivos → trauma-informed. Nunca "tienes depresión". Siempre: *"Lo que cuentas merece que hables con alguien. Aquí tienes recursos."*
- Skip permitido siempre · vuelve a ofrecer en 2 semanas.
- Si EPDS score alto → derivación profesional automática trauma-informed.

---

## 4 · DS v0.2 specs aplicados

### Paleta (canon)

- `--paper #FAF7F0` fondo principal.
- `--paper-soft #F2EDE0` cards y surfaces.
- `--paper-deep #E8E1CF` modo lurker / fondo secundario.
- `--ink #1A1A1A` texto principal.
- Tonal por contexto fase: coral (embarazo) · blush (bebé 0-12m) · mint (toddler 1-3a) · paper-deep (lurker).

### Tipografía (canon)

- **Galiner** display · italic permitido en frases manifesto · semibold en titulares P1-P3.
- **Inter** body · regular para inputs · medium para CTAs primary.

### Avatares 3 fases (canon DS v0.2)

- Embarazo: avatar **coral** blando · presente en P0/P1/P2/P3/P4 (rama embarazo).
- Bebé 0-12m: avatar **blush** · presente en rama bebé.
- Toddler 12-36m: avatar **mint con bolitas alrededor** (hitos conquistados) · presente en rama toddler.

### Estados card canon

`doing` (en curso) · `done` (✓) · `snoozed` (recordatorio) · `attention` (alerta) · siempre con tonal del libro.

### Bottom nav (canon)

`Hoy · Calendario · ⊕ (FAB coral) · Chat · Yo`. Visible desde P4 (Quick win).

---

## 5 · Reglas de tono trauma-informed (canon)

| ❌ Anti-canon | ✅ Canon |
| --- | --- |
| "Bienvenida mamá" | "Bienvenida" / "Hola" (canon Pablo / Carmen / Lucía / familias mismo sexo) |
| "Futuro papá / futura mamá" | "Co-cuidador/a" / "Tu hij@" |
| "Bebito" / "Mami" | "Hij@" / "Tu hij@" |
| "Tu bebé puede tener autismo" (M-CHAT) | "Hitos de comunicación" |
| "Test de depresión postparto" (EPDS) | "Cómo te encuentras tú" |
| "Registra tus síntomas" (formulario médico) | "¿Quieres contarnos cómo va?" |
| "Felicidades semana X" si modo arcoíris activo | Sin contadores celebratorios |
| "El X% de bebés..." | (canon · 0 comparativos) |
| "Has fallado / no completaste" | "Cuando estés, aquí está esto para ti" |
| Pop-up bloqueante | Tarjeta dismisseable en feed |

---

## 6 · Top fixes vs onboarding research previo

- [ ] Manifesto v2 nuevo completo (canon mayo 2026 · ya actualizado en notion).
- [ ] **Anónimo first 24h** (P0-P4 sin auth · P5 tras 24h o quick win).
- [ ] **Sin password nunca** · Apple/Google/magic link en P5.
- [ ] **6 modos especiales canon** detectables en P2/P3 progressive profiling.
- [ ] Modo preemie **auto-activado** si fecha nacimiento <37 sem.
- [ ] B2B aseguradora pantalla **NO antes del Quick win** (P6 tras P4 completado).
- [ ] Multi-perfil: 1 hij@ en onboarding · añadir hermanos desde dashboard.
- [ ] **Lurker mode** permitido (P1 opción "Estamos pensándolo").
- [ ] Bottom nav 5-tab + FAB central canon (no Hitos tab obsoleto).
- [ ] Screenings clínicos como conversación · nunca formulario.

---

## 7 · Layout intent

### Mobile (390px viewport iPhone 14 reference)

- Mobile-first canon · una pregunta por pantalla.
- Touch targets ≥44pt.
- P0/P1: full viewport.
- P2 date picker: native iOS/Android picker style.
- P3 inputs: paper-cream con border ink 1px.
- P4 Timeline: vertical scroll · avatar fixed top-right.
- P5/P6 tarjetas: como card en feed · no full-screen.

### Desktop (1280px reference)

- Centered max-width 640px.
- P1 opciones grid 2×3.
- P4 Timeline: split layout (avatar izquierda · timeline derecha).

### Reduce motion / accessibility

- WCAG 2.2 AA mínimo.
- `prefers-reduced-motion`: desactiva flotación avatares.
- Inputs con labels visibles (no solo placeholder).
- Error messages trauma-informed inline.
- Skip option visible en todas las pantallas opcionales.

---

## 8 · Anti-patterns explícitos (NO HACER)

- ❌ Login obligatorio antes de P4 Timeline (rompe canon §auth-canon "anónimo first 24h").
- ❌ Password fields en cualquier flow (canon "sin password nunca").
- ❌ Cookie banner intrusivo bloqueante (canon GDPR-native).
- ❌ Pedir notificaciones en P1-P3 (canon D7 contextual).
- ❌ Pedir email en P1-P3 (BabyCenter midió 21% drop-off en primeros 1-2 clicks signup).
- ❌ B2B aseguradora ANTES del Quick win (D4 canon).
- ❌ "Test de depresión postparto" / "Test de autismo" como label de screening (anti-trauma-informed).
- ❌ Progress bar agresiva en P1-P3 (no metric productividad · canon trauma-informed).
- ❌ Auto-renewal countdown timer (canon anti-dark-pattern).
- ❌ Streak/rachas/ranking (canon 0 gamification tóxica).
- ❌ Foto stock de bebés (canon privacy-first · usa avatares canon DS v0.2).

---

## 9 · Output esperado

- **Archivo único**: `design/wireframes-onboarding-v0.2-hi-fi.html` (self-contained · CSS inline · sin librerías externas más que Google Fonts).
- **6 pantallas core** + **tarjetas progressive profiling** D1-D30 (representativas, no exhaustivo: ≥3 ejemplos de tarjeta dismissable canon).
- **Mobile-first responsive** (390px + 1280px breakpoints).
- DS v0.2 canon aplicado (paper-cream + tonales + Galiner + Inter + avatares blandos).
- Top fixes implementados.
- Sin emojis decorativos en copy (solo en iconografía P1 opciones canon).
- `prefers-reduced-motion` respetado.
- Validar Lighthouse mobile ≥90.

---

## 10 · Convención de nombres

- HTML principal: `design/wireframes-onboarding-v0.2-hi-fi.html`.
- Assets ilustración (si genera nuevas): `design/assets/v0.2/onboarding/`.

---

## 11 · Changelog

- v2.0 · 2026-05-18 · Brief inicial canon mayo 2026 · derivado de trans/onboarding-canon + DS v0.2 + Fase 0 + pricing canon. 6 decisiones D1-D6 cerradas. Auth canon "sin password nunca".

---

*Brief Claude Design · Grow Onboarding v0.2 hi-fi · 18 mayo 2026 · canon Fase 0 · trauma-informed · supersede onboarding wireframes v0.1.*
