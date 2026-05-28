# Brief · Waitlist form Grow

> Tú ya conoces Grow, el DS v0.2 y el canon Fase 0. Este brief solo te da **qué tiene que pasar, qué copy usar y por qué**. La implementación (tokens, layout exacto, animaciones, JS) la decides tú alineado al canon.

---

## Qué construir

Un formulario **progressive · una pregunta por pantalla** (`waitlist.html` en `homepage/`) al que llegan los CTAs "Apúntate" de la landing v3.

**Doble función**:

1. **Capturar leads cualificados** para la beta (Q3 2026).
2. **Servir de research instrument continuo** — cada respuesta nos dice si la propuesta de valor encaja, qué precio aguanta, qué features importan.

**Objetivo de experiencia**: 12 preguntas en ~3 minutos. Sensación de "alguien me está escuchando", no de "me están sacando datos". Trauma-informed: cualquier pregunta saltable, lenguaje sin urgencia, opt-outs visibles.

---

## Por qué progressive (no single-page)

- Un form de 12 preguntas en una sola página colapsa el completion al 10-15%.
- Progressive (Typeform-style) sube a 35-55% en SaaS B2C trauma-informed.
- Cada pantalla con foco único refuerza el canon "sin urgencia" — el usuario respira entre preguntas.

---

## Flow general (14 pantallas)

```
0  Welcome           →  marco emocional + permiso para saltar
1  Nombre            →  opcional · cálido
2  Email             →  ÚNICO required · contacto
3  Rol               →  required · personalización futura
4  Fecha hij@        →  opcional · qué libros activar primero
5  Modos especiales  →  opcional · para no decir nada que no encaje
6  Top 3 problemas   →  required (≥1) · entender dónde empezar
7  Intensidad        →  opcional · matiz sobre los problemas marcados
8  Rating features   →  opcional · validar qué construir primero
9  Sensación precio  →  required · Van Westendorp simplificado
10 Tier + porqué     →  required · intención real de pago
11 Gap competencia   →  opcional · qué les falta en lo que ya usan
12 Origen            →  required · attribution
13 Gracias           →  confirmación + opt-in newsletter
```

Persistencia local entre sesiones (si abandonan, vuelven al mismo paso). Submit hace POST a `window.GROW_WEBHOOK_URL` si está definido; si no, `console.log` del payload (modo dev).

---

## Pantalla 0 · Welcome

**Por qué**: marcar tono honesto desde el primer segundo. No "regístrate gratis", sino "estamos construyendo esto, ayúdanos". Reduce expectativa, aumenta calidad de respuesta.

```
EYEBROW    Estamos en validación · mayo 2026
TITLE      Estamos construyendo Grow. Ayúdanos a hacerlo bien.
LEAD       12 preguntas. Unos 3 minutos. Cada respuesta nos ayuda
           a construir algo que de verdad encaje con tu familia
           — no con la media.
META       Sin spam, sin presión
           Puedes saltarte cualquier pregunta
           Tus datos. Tuyos.
CTA        Empezar →
```

Sin contador. Sin progress bar visible.

---

## Pantalla 1 · Nombre (opcional)

**Por qué**: empezar por algo trivial baja el ego-threshold. Y nos sirve para personalizar el email de invitación a beta.

```
TAG    1 de 12 · tú
TITLE  ¿Cómo te llamas?
HELP   Solo el nombre. Lo usaremos cuando te escribamos.
INPUT  Tu nombre
SKIP   prefiero no decir
```

---

## Pantalla 2 · Email (required)

**Por qué**: el único dato que necesitamos para cumplir lo que prometemos (avisarles al lanzar). Si fallan otros pasos, este no.

```
TAG    2 de 12 · contacto
TITLE  ¿A qué email te escribimos?
HELP   Es el único dato obligatorio. Te avisamos cuando podamos
       abrirte la puerta · Q3 2026. Sin spam, sin presión.
INPUT  tu@email.com
HINT   Solo lo usamos para avisarte del lanzamiento.
ERR    Necesitamos un email válido para avisarte.
```

Validación de regex bloquea el siguiente. Sin skip.

---

## Pantalla 3 · Rol (single, required)

**Por qué**: el canon Fase 0 prohíbe asumir género del cuidador. Preguntar directo es más respetuoso que adivinar, y nos sirve para segmentar mensajes.

```
TAG     3 de 12 · familia
TITLE   ¿Cómo cuidas en tu familia?
HELP    Sin etiquetas rígidas. Solo nos ayuda a no decirte nada que no encaje.

OPCIONES
  1  Madre
  2  Padre
  3  Co-cuidador o co-cuidadora
  4  Abuel@
  5  Familia de acogida o adopción
  6  Prefiero otra palabra
```

---

## Pantalla 4 · Fecha (opcional, con toggle)

**Por qué**: la edad del hij@ (incluso prenatal) determina qué libros activar y qué tono usar. Toggle "ya nació / está en camino" porque el lenguaje cambia (no es lo mismo decir "tu bebé" antes del parto).

```
TAG     4 de 12 · tu hij@
TITLE   ¿Cuándo nació o nacerá?
HELP    Esto nos dice qué libros activar primero para ti. Si aún
        no lo sabes con certeza, una estimación es suficiente.

TOGGLE  [Ya nació]  [Está en camino]
INPUT   date picker
HINT    "Ya nació"     → Fecha de nacimiento.
        "Está en camino" → Fecha probable de parto.
SKIP    prefiero no decir
```

---

## Pantalla 5 · Modos especiales (multi, opcional, "ninguno" exclusivo)

**Por qué crítico**: el research v0.3 detectó que el moat de Grow es servir bien a los modos especiales (preemie, arcoíris, mono, etc.) donde la competencia falla. Pero **preguntarlo mal hace daño**. Por eso es opcional, sin imágenes, sin emojis, con sub-labels que evitan asumir.

```
TAG     5 de 12 · contexto
TITLE   ¿Hay algo de su llegada que sea especial?
HELP    Lo preguntamos para no decirte nada que no encaje.
        Puedes marcar varias — o ninguna.

OPCIONES
  1  Llegó antes de tiempo            sub: Preemie · edad corregida
  2  Su embarazo siguió a una pérdida sub: Embarazo arcoíris
  3  Soy cuidador/a principal sin pareja  sub: Familia monoparental
  4  Familia del mismo sexo
  5  Adopción o familia de acogida
  6  Gestación subrogada
  7  Ninguna de estas              ← exclusivo: desmarca el resto
SKIP    prefiero no decir
```

---

## Pantalla 6 · Top problemas (multi 1-3, required)

**Por qué**: necesitamos saber **dónde empieza el dolor**. "Hasta 3" porque más de 3 destroza la priorización; menos de 1 anula el research.

```
TAG     6 de 12 · qué te preocupa
TITLE   ¿Qué te quita más el sueño hoy?
HELP    Hasta 3 — las que más pesan ahora mismo. No para juzgar nada,
        solo para entender dónde tiene sentido empezar.

OPCIONES (con sub-label corto que ayuda a desambiguar)
  El sueño                    Despertares, conciliación, rutinas
  Cólicos y llanto            Llanto inconsolable, gases
  Salud y fiebre              Mocos, fiebre, qué es urgencia
  Vacunas                     Calendario, dudas, efectos
  Lactancia                   Materna, mixta, biberón
  Alimentación                BLW, alergias, qué dar cuándo
  Hitos del desarrollo        Hablar, andar, comparar
  Saber qué es "normal"       Incertidumbre constante
  Cómo me cuido yo            Carga mental, soledad, sueño propio
  Logística práctica          Calendarios, papeleo, agendas

CONTADOR  "Has elegido X / 3" debajo de la lista
```

---

## Pantalla 7 · Intensidad (single per item, opcional)

**Por qué**: saber que "el sueño" es problema no dice tanto como saber que es "muchísimo". Esto separa _curiosidad_ de _dolor real_ y nos prioriza qué libro empujar primero al onboarding.

Render dinámico: una fila por cada problema seleccionado en el paso 6. Si no marcaron ninguno, mensaje neutral y pasar al siguiente.

```
TAG     7 de 12 · intensidad
TITLE   ¿Cuánto te pesa cada una?
HELP    Una etiqueta por bloque. Sin escalas raras — solo lo que sientes ahora.

POR CADA PROBLEMA ELEGIDO:
  [Poco]  [Bastante]  [Mucho]  [Muchísimo]
SKIP    saltar
```

---

## Pantalla 8 · Rating features (tri-state, opcional)

**Por qué**: muestra simultáneamente **qué estamos construyendo** (educa) y **mide qué importa más** (research). Tri-state (no me sirve / útil / imprescindible) es más útil que estrellas 1-5 — fuerza decisión clara.

```
TAG     8 de 12 · qué te serviría
TITLE   Esto es lo que estamos construyendo. ¿Qué te serviría?
HELP    No hace falta puntuar todas. Marca las que tengas claras.

FEATURES (icon + tonal según libro · 9 cards)
  📚  Los 9 libros
      Sueño · Cólicos · Salud · Vacunas · Lactancia · Alimentación · Hitos · Desarrollo · Embarazo
  🗓️  Calendario semana a semana
      Te avisamos de lo relevante esa semana — sin abrumar con lo que aún no toca
  🌱  Calendario de hitos
      97 hitos de Haizea-Llevant, la escala validada en España
  🌙  Chat de madrugada
      A las 3am: fondo oscuro, texto grande, una pregunta por pantalla. Triage auditado
  💛  Diario · libro de recuerdos
      Lo que ya estás viviendo, guardado. Para ti, para mañana
  👩‍⚕️  Comité pediátrico detrás del contenido
      Pediatra · neonatólogo · psicóloga perinatal · enfermera revisan cada palabra
  📞  Llamadas 1:1 con profesional
      Pediatra, psicóloga perinatal o asesora de sueño · add-on a Premium
  🔒  Privacy first
      Sin ads, cifrado de extremo a extremo, audio que no sale de tu móvil
  🤍  Sin urgencia, sin juicio
      Aquí no diagnosticamos · te ayudamos a hablar con el pediatra

RATING (tri-state por card)
  [No me sirve]  [Útil]  [Imprescindible]
SKIP    saltar
```

---

## Pantalla 9 · Sensación precio (single, required)

**Por qué**: testeamos el precio que vamos a poner — `9,99 €/mes Premium` sobre un free generoso. Mostrar las dos cards visibles antes de la pregunta es clave: la decisión es del valor relativo, no del precio absoluto. Pregunta calcada de Van Westendorp simplificada.

```
TAG     9 de 12 · precio
TITLE   ¿Cómo te suena el precio?
HELP    Estamos pensando en un modelo freemium. La mayor parte funciona
        gratis, y para todo lo demás, 9,99 € / mes.

CARD FREE                        CARD PREMIUM
  Gratis                            Premium
  Grow                              Grow Plus
  0 € siempre                       9,99 € / mes
  - Calendario semana a semana      - Los 9 libros desbloqueados
  - 1 libro activo según edad       - Chat con IA ilimitado · modo madrugada
  - Chat con IA limitado            - Multi-perfil · cuenta compartida
  - Diario · libro de recuerdos     - Llamadas 1:1 con pediatra (add-on)

OPCIONES
  1  Demasiado caro. No pagaría
  2  Caro pero lo consideraría
  3  Me parece razonable
  4  Más barato de lo que esperaba
```

---

## Pantalla 10 · Tier intent + porqué (single + textarea, tier required)

**Por qué**: separa _sensación de precio_ (pantalla anterior) de _intención real_ (esta). Alguien puede pensar "es razonable" y aun así elegir free. El textarea opcional captura el porqué — oro para iteración.

```
TAG     10 de 12 · tu intención
TITLE   ¿Cuál usarías tú?
HELP    Honestidad > cortesía. Si no pagarías, dilo. Es la respuesta
        más útil que podemos recibir.

OPCIONES
  1  El gratis me llega
  2  Pagaría Premium (9,99 €/mes)
  3  Aún no lo sé · necesito ver más
  4  Ninguno · no es para mí ahora

TEXTAREA   ¿Por qué? (opcional · una línea es suficiente)
```

---

## Pantalla 11 · Gap competencia (textarea, opcional)

**Por qué**: las respuestas a esto son el research más accionable que vas a recibir. Aquí la gente cuenta gratis qué le falta a Huckleberry, BabyCenter, su grupo de WhatsApp del paritorio. Una sola pregunta abierta porque es la única donde el texto libre vale más que las opciones cerradas.

```
TAG     11 de 12 · ayúdanos
TITLE   ¿Qué falta en lo que ya usas?
HELP    Si ya usas otra app (Huckleberry, Wonder Weeks, BabyCenter…)
        o miras el grupo de WhatsApp de tu paritorio — ¿qué echas
        de menos? Si no usas nada, ¿qué te haría empezar?

TEXTAREA   Una frase es suficiente. Lo que escribas nos ayuda mucho.
SKIP       saltar
```

---

## Pantalla 12 · Origen (single, required)

**Por qué**: attribution barata. También el `skip "enviar sin contestar"` aquí porque si han llegado al final, no queremos perderles por una pregunta de marketing.

```
TAG     12 de 12 · y por último
TITLE   ¿Cómo nos encontraste?
HELP    Ayuda a saber por dónde está saliendo.

OPCIONES
  1  Instagram
  2  LinkedIn
  3  Boca a boca
  4  Newsletter o blog
  5  Mi pediatra, midwife o doula
  6  Búsqueda en Google
  7  Otro / no me acuerdo

CTA   Enviar → (en lugar de Siguiente)
SKIP  enviar sin contestar
```

---

## Pantalla 13 · Gracias (sin contador)

**Por qué**: cierre cálido, no celebratorio (canon: no streak, no confetti). Opt-in newsletter aquí — no antes — porque ya completó, ya ganamos confianza. Y un email de contacto humano (`hola@growbythechildlens.com`) cumple GDPR sin sonar legal.

```
ARTE       Orb sage pequeño (replica chica del orb de la landing)
TAG        listo
TITLE      Gracias. De verdad.
HELP       Te escribimos cuando podamos abrirte la puerta — Q3 2026.
           Sin spam, sin presión.

OPT-IN CARD (checkbox default checked)
  □ Recibe la newsletter mensual.
    Lo que vamos descubriendo + un libro nuevo desbloqueado cada mes.
    Cero spam, baja con un clic.

FINEPRINT  Si más adelante quieres editar tu respuesta o borrarla del
           todo, escríbenos a hola@growbythechildlens.com · Tus datos. Tuyos.

CTA        Volver a Grow ↗   →   anchor a index.html
```

---

## Microcopy canon

**Sí**:

- "Te escribimos cuando podamos abrirte la puerta."
- "Sin spam, sin presión."
- "Honestidad > cortesía."
- "Tus datos. Tuyos."
- "Aquí no diagnosticamos."
- "Estamos construyendo esto, ayúdanos."

**No**:

- "¡Reserva tu plaza antes de que se agoten!" (urgencia falsa)
- "Solo quedan 47 plazas." (urgencia falsa)
- "Felicidades por unirte a la familia Grow!" (celebratorio)
- "Nuestro equipo de expertos…" (corporate)
- "Cuéntanos tu historia" (demasiado terapéutico para un form de waitlist)
- "Futuro papá", "mami", "bebito", "mi pequeño guerrero" (canon Fase 0)

**Patrón de help text por pantalla**:

1. Primera frase explica qué hacemos con la respuesta.
2. Segunda añade tranquilidad (skip permitido / datos seguros / por qué importa).

Si necesitas más, sobra.

---

## Lo no negociable

- Una pregunta por pantalla. Nunca dos.
- Email es el único required absoluto. Todo lo demás permite skip.
- Contador "X de 12" oculto en welcome y final, visible y correcto en el resto.
- Volver atrás nunca borra valores ya introducidos.
- LocalStorage persiste entre sesiones (clave `grow_waitlist_v1`).
- `prefers-reduced-motion` desactiva animaciones de entrada.
- Submit hace POST a `window.GROW_WEBHOOK_URL` (sin hardcodear URL en el archivo).
- Cero urgencia, cero gamification, cero diminutivos forzados.
- Las 5 CTAs de `propuesta-v3.html` apuntan a `waitlist.html`. El form de email final de la landing pasa el email por `?email=` y la waitlist lo prefilla.

---

*Brief waitlist · canon Fase 0 · DS v0.2 · mayo 2026*
