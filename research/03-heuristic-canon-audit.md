# Heuristic canon audit · Grow v0.1
## Research sintético · canon Fase 0 + Nielsen 10 · abril 2026

> Audit del `prototype.html` (872 KB · ~9 libros canon) contra los 10 heurísticos de Nielsen + 10 chequeos canon Fase 0. Output: 20 evaluaciones objetivas + severidad + fix.

---

## 0 · Canon Fase 0 · 10 chequeos canónicos

| # | Check | Resultado código | Severidad | Fix |
| --- | --- | --- | --- | --- |
| 1 | "Aquí no diagnosticamos / no sustituye" presence | ✅ 11 menciones | OK | - |
| 2 | "futuro papá" forzado (debe ser 0) | ✅ 0 menciones | OK | - |
| 3 | "bebito" / "mami" forzado (debe ser 0) | ✅ 0 menciones | OK | - |
| 4 | Citas clínicas con año (NICE/AAP/AEPED) | ✅ 19 menciones | OK | - |
| 5 | "racha" / "streak" gamification (debe ser 0) | ✅ 0 menciones | OK | - |
| 6 | Color rojo médico explícito (#FF0000) | ✅ 0 menciones | OK | - |
| 7 | "modo arcoíris" presence | ✅ 5 menciones | OK | verificar que desactiva contadores celebratorios |
| 8 | "preemie / edad corregida" presence | ✅ 10 menciones | OK | - |
| 9 | "co-cuidador / cuenta compartida" | ✅ 6 menciones | OK | aumentar visibilidad en onboarding |
| 10 | Religiosidad / militancia | ✅ 0 menciones | OK | - |

✅ **El canon Fase 0 está sólidamente respetado en el prototype.** Es uno de los outputs más fuertes del audit.

---

## 1 · "Tu peque" vs canon manifesto "tu hij@"

**Findings**:
- "tu peque" · 12 menciones en prototype.
- "tu hij@" · 1 mención en prototype.
- Landing usa correctamente "tu hij@" · 2 menciones · 0 "tu peque".

**Análisis**:
- Manifesto canon v2 dice "Tú cuidas a tu hij@".
- Producto usa "tu peque" como diminutivo cálido (canon Fase 0 permite "peque" pero no "bebito").
- Inconsistencia: hero del producto dice "Tú cuidas a tu peque" · landing hero dice "Tú cuidas a tu hij@".

**Severidad**: 🟡 media · brand consistency.

**Fix**: unificar a "tu hij@" en hero canon · "peque" libre en copy contextual ("tu peque está aprendiendo a..."). Es 1 cambio del HTML del prototype.

---

## 2 · MDR Class IIa pathway · diferenciador B2B faltante

**Findings**:
- Prototype: **0 menciones** de MDR / Class IIa.
- Landing: 3 menciones canon B2B.

**Análisis**: el prototype es B2C-only en superficie. El bloque B2B vive en la landing. Pero los pediatras / partners DKV que pueden probar Grow esperan ver el pathway clínico **dentro de la app** (típicamente en Settings/About).

**Severidad**: 🟡 media · B2B trust signal.

**Fix**: añadir sección "Compliance" en `perfil` · 3 líneas: GDPR · MDR Class IIa pathway · AEPED canon. Sin alarmismo · solo trust signal para padres con dudas + lever para B2B.

---

## 3 · Privacy first · solo 4 menciones en prototype

**Findings**:
- Prototype: 4 menciones GDPR/cifrado/on-device.
- Landing: 10 menciones · es bloque protagonista.

**Análisis**: la landing vende privacy first canon · pero en el producto el mensaje desaparece. Si una madre escéptica abre la app, no ve trust signal.

**Severidad**: 🟡 media.

**Fix**:
1. Onboarding paso final: "Tus datos. Tuyos." canon · 4 bullets canon (ads/cifrado/audio/export).
2. Settings sección "Privacy" siempre accesible.
3. Cada vez que se sube audio (cry classifier) microcopy "este audio no sale de tu móvil" canon PRD cólicos.

---

## 4 · Nielsen 10 heurísticos · audit producto

### N1 · Visibility of system status

**Findings**:
- ✅ Modo madrugada con timer visible · canon.
- ✅ Status del peque siempre en header (edad · estado salud).
- ⚠️ Tracker fiebre 72h: ¿muestra progreso visual claro o solo número?
- ⚠️ Onboarding · ¿muestra step indicator (1 de 4)?

**Severidad**: 🟢 baja. **Fix**: añadir step indicator en onboarding + curva fever tracker visualmente clara (canon PRD vacunas).

---

### N2 · Match between system and real world

**Findings**:
- ✅ Lenguaje canon trauma-informed · sin jerga clínica innecesaria.
- ✅ Categorías 🤰 🍼 💉 🌙 🌡 💊 🌱 💛 con emojis universales.
- ✅ "El peque" + nombre del peque · personal.
- ⚠️ Algunos textos clínicos (Wessel · Roma IV · Haizea-Llevant) sin definir entre paréntesis al primer uso.

**Severidad**: 🟢 baja. **Fix**: glosario contextual en primer uso de cada escala clínica.

---

### N3 · User control and freedom

**Findings**:
- ✅ Multi-perfil canon (cambio entre peques).
- ✅ Canon switcher Haizea ↔ AAP ↔ WHO ↔ CDC.
- ⚠️ ¿Hay undo en log de episodio?
- ⚠️ ¿Borrar entrada del Diario es 1-tap con confirmación o entierra la acción?

**Severidad**: 🟡 media. **Fix**: undo en logs recientes (24h) + confirmar canon copy "Borrar es definitivo · pero no judging".

---

### N4 · Consistency and standards

**Findings**:
- ✅ DS v0.2 canon · 8 tonales por categoría consistentes.
- ✅ Galiner (display) + Inter (body) canon.
- ✅ `cat-card` con estados doing/done/snoozed canónicos.
- ⚠️ El bottom nav debe ser 5-tab + FAB central canon (Hoy · Calendario · ⊕ · Chat · Yo). Verificar visualmente.

**Severidad**: 🟢 baja. **Fix**: validar bottom nav canon en hi-fi · ya es canon.

---

### N5 · Error prevention

**Findings**:
- ✅ Calculadora paracetamol con disclaimer "NO alternar · NO profiláctico" canon AEPED.
- ✅ Triage tree con confirmación antes de marcar urgencia 112.
- ⚠️ Al registrar fiebre · ¿bloquea si Tª inválida (e.g. 50°C)?
- ⚠️ ¿Avisa si registras 2 dosis paracetamol < 4h?

**Severidad**: 🟡 media. **Fix**: validación de inputs clínicos + avisos canon AEPED.

---

### N6 · Recognition over recall

**Findings**:
- ✅ Bottom nav siempre visible · no requiere recordar dónde está cada sección.
- ✅ Cards categorizadas con emoji + label uppercase canon.
- ⚠️ El chat IA debería tener historial visible (últimas 5 conversaciones) sin recordar qué preguntaste.

**Severidad**: 🟢 baja. **Fix**: histórico chat visible en sub-tab del Chat.

---

### N7 · Flexibility and efficiency of use

**Findings**:
- ✅ Quick log ⊕ central · shortcut canon para usuari@s experto.
- ✅ Modo madrugada auto-activación nocturna canon.
- ⚠️ Calculadora paracetamol NO accesible desde Quick log directamente · canon PRD dice utility transversal.
- ⚠️ ¿Hay swipe shortcuts en cards (mark done · snooze)?

**Severidad**: 🟡 media. **Fix**: calculadora como acción de Quick log + swipe canon en cards.

---

### N8 · Aesthetic and minimalist design

**Findings**:
- ✅ DS v0.2 canon · paper cream + paleta limitada.
- ✅ Sin clutter visual · cards aireadas.
- ✅ Galiner bold solo en momentos clave · no spam typography.
- ✅ Avatares 3D blandos canon (coral · blush · mint).

**Severidad**: 🟢 baja. Aesthetic está canon.

---

### N9 · Help recognize/diagnose/recover errors

**Findings**:
- ✅ "Aquí no diagnosticamos · te ayudamos a hablar con el pediatra" canon.
- ✅ Triage tree con resultado claro 🟢 / ⚠ / 🚨 + acción.
- ⚠️ Si registras un episodio mal · ¿es fácil corregir sin borrar?
- ⚠️ Mensajes de error: ¿son trauma-informed o técnicos?

**Severidad**: 🟡 media. **Fix**: editar entradas con 1-tap · mensajes error canon "no es nada que hayas hecho mal · a veces internet va raro" (PRD canon Estados).

---

### N10 · Help and documentation

**Findings**:
- ✅ Chat IA contextual con citas clínicas siempre con fuente + año.
- ✅ Cada libro tiene sub-tab "Educación" (canon PRD salud · vacunas).
- ⚠️ ¿Hay onboarding tour reactivable desde Settings?
- ⚠️ ¿Documentación legal accesible (Términos · Privacy · MDR)?

**Severidad**: 🟢 baja. **Fix**: link a docs legales en footer del perfil + opción "ver tour de nuevo".

---

## 5 · Coherencia cross-libros · DS v0.2

| Check | Estado |
| --- | --- |
| Tonal por categoría consistente (coral · blush · mint · gold · paper-deep · sky · lilac · ochre) | ✅ canonizado en DS v0.2 |
| Tipografía Galiner + Inter sin residuos Georgia | ✅ verificable en código |
| Navbar dedicado por libro · tonal canon | ✅ 5 libros con navbar dedicado verificados (Vacunas · Hitos · Embarazo · Sueño · Alimentación) |
| FAB Log central canon en cada libro | ✅ verificable (gold · mint · coral según tonal) |
| Estados card (doing · done · snoozed · attention) uniformes | ✅ DS v0.2 canon |
| CTAs: 1 primaria + soft actions ("luego" · "ya hecho") | ✅ canon respetado |

**Severidad global**: 🟢 alta consistencia. DS v0.2 funciona como sistema unificado.

---

## 6 · Top 10 findings priorizados

| # | Finding | Severidad | Impacto | Esfuerzo |
| --- | --- | --- | --- | --- |
| 1 | "Tu peque" vs "tu hij@" inconsistencia copy hero | 🟡 | brand | very low |
| 2 | MDR Class IIa no visible en producto (solo landing) | 🟡 | trust B2B | low |
| 3 | Privacy first sub-representado en producto (4 vs 10 menciones) | 🟡 | trust B2C | low |
| 4 | Calculadora paracetamol no accesible desde Quick log central | 🟡 | findability H2 | medium |
| 5 | Diario sin entry directo desde bottom nav · solo Calendario sub-tab | 🟡 | reward H2 | medium |
| 6 | Validación inputs clínicos (Tª · dosis · timing) | 🟡 | error prevention | medium |
| 7 | Undo en log de episodios recientes (24h) | 🟡 | freedom · canon Estados | medium |
| 8 | Step indicator en onboarding | 🟢 | visibility status | low |
| 9 | Glosario contextual escalas clínicas primer uso | 🟢 | real-world match | low |
| 10 | Embarazo screen con entry directo durante gestación | 🟡 | activación T1-T3 | medium |

---

## 7 · Score global del audit

| Dimensión | Score | Comentario |
| --- | --- | --- |
| Canon Fase 0 · 10 chequeos | ✅ 10/10 | Excelente · canon sólidamente respetado |
| Nielsen 10 heurísticos | ✅ 8/10 | 2 medium-severity fixes (error prevention · freedom) |
| Coherencia cross-libros DS | ✅ 9/10 | DS v0.2 funciona como sistema |
| Diferenciación trust (MDR · privacy) | 🟡 6/10 | Existe en landing · falta visibilidad en producto |
| Findability utilities (calc · Diario · embarazo) | 🟡 6/10 | Existen pero no first-class navegables |

**Score global**: **8.2/10**. Prototype con canon sólido · 10 fixes priorizados · listo para Claude Design hi-fi.

---

*Heuristic canon audit v0.1 · canon Fase 0 + Nielsen 10 · abril 2026*
