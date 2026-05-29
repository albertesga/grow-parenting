# Midjourney · avatares por libro (9 prompts)

> Sistema: 3 cuerpos canon (coral·embarazo · blush·recién nacido · sage·bebé) + acción específica por libro. Fondo transparente para que el render encaje sobre cualquier tonal de card en el UI.

---

## Setup técnico (parámetros comunes a los 9)

- **Versión**: `--v 7` (mejor rendering de transparencia y materiales blandos).
- **Aspect ratio**: `--ar 1:1`.
- **Style**: `--style raw` (menos estilización por defecto, más fiel al prompt).
- **Quality**: `--q 2`.
- **Transparencia**: `--no background --no shadow`. Si tu plan de Midjourney aún no soporta alpha real, generar con `solid pure white background, no shadow` y luego pasar por `remove.bg` o el background eraser de Figma/PS.

**Línea de parámetros que aplicaré al final de cada prompt**:
```
--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## Base canon · los 3 cuerpos (memoriza esto antes de los 9)

Todo prompt parte de este bloque. Cambia color, pose y micro-objeto. **Nada más**.

```
3D character render of a soft squishy silicone toy creature, single subject
centered on transparent background.

CHARACTER BODY:
- Rounded blob body, soft matte vinyl material, subtle subsurface scattering,
  soft cream rim light from upper-front.
- [PER-LIBRO: shape variation — egg / round / pear / standing].
- Color: [PER-LIBRO: coral / blush / sage hex].

EYES — STRICT:
- Two small matte black vertical ovals, close together, centered upper-third
  of the face. FULLY MATTE BLACK. No chrome, no metallic, no glossy reflection,
  no specular highlight, no gradient inside the eye.
- Optional tiny 1-2px soft organic white dot as natural highlight, never chrome.
- Style reference: Pop Mart, Sonny Angel, Mappies — flat-dot kawaii eyes.

MOUTH:
- Single tiny matte black curve, soft and warm, same flat matte material as the eyes.

LIGHTING:
- Soft diffuse studio light from upper-front, no harsh shadows.

STYLE:
- Studio product photography of a soft toy, crisp 8k render, shallow DOF.
- Centered subject, NO background, NO contact shadow, NO text, NO outlines.

NEGATIVE: chrome eyes, metallic reflection, glossy eyeballs, plastic doll eyes,
huge eyes, eyes far apart, gradient inside pupil, white reflection inside iris,
anime sparkle eyes, realistic human eyes, scary, sad expression, screaming.
```

---

## 1 · 🤰 Embarazo · coral · bolita

**Cuerpo**: coral warm `#E89765`, forma de huevo blando, sin extremidades visibles (todavía es la bolita).

**Acción**: flotando sereno, ojos cerrados en suaves curvas crecientes (sleeping crescent), aura interna cálida cuyo glow envuelve al avatar pero el fondo sigue transparente.

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: smooth egg / blob form, no visible arms or legs yet,
  slightly tilted as if floating in fluid.
- Body color: warm coral #E89765 with soft golden interior glow as if
  light comes from inside.
- Eyes: gently closed soft crescent shapes (peaceful sleep), turned upward
  slightly, matte black curves.
- Mouth: tiny serene matte curve.
- Subtle warm aura immediately around the body (NOT a background — fades
  to fully transparent within 30% of body radius).
- Pose: floating gently, head tilted, sense of weightlessness.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 2 · 🤱 Lactancia · blush · recién nacido

**Cuerpo**: blush soft `#F0CFC4`, recién nacido compacto, casi sin patitas visibles.

**Acción**: tumbado de lado en posición de saciedad post-toma, ojos cerrados sereno, boquita en mini-O (gesto de succión satisfecha).

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: very compact newborn form, slightly elongated horizontal,
  tiny feet hint just visible at bottom.
- Body color: soft blush pink #F0CFC4.
- Pose: lying on its side in soothed post-feeding stillness, body
  curved gently.
- Eyes: peacefully closed soft matte black crescents.
- Mouth: tiny round O shape (matte black), suggesting satiated suckling reflex.
- Expression: deeply content, just-fed serenity.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 3 · 😭 Cólicos · blush · recién nacido (calma post-llanto)

**Cuerpo**: blush soft `#F0CFC4`. **NUNCA mostrar llorando, rojo, alarmado**. Canon trauma-informed.

**Acción**: posición lateral 5 S's "side", siendo arropado, ojos cerrados, mejilla con un leve sonrojo natural (no rojo médico), respiración tranquila.

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: newborn compact, lying on the right side (the "side" of the
  5 S's), one tiny arm partially tucked under.
- Body color: soft blush pink #F0CFC4 with a very subtle natural cheek
  warmth (NEVER bright red, NEVER medical red — canon).
- Pose: deeply soothed, post-cry tranquility — the moment AFTER calm has
  arrived, not during distress.
- Eyes: softly closed matte black crescents, no tears, no tension lines.
- Mouth: tiny matte curve, relaxed.
- Expression: serene relief, breathing soft.

NEGATIVE (extra for this one): crying, tears, red face, distress,
medical red, screaming mouth, alarmed.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 4 · 🍼 Alimentación · sage · bebé curioso

**Cuerpo**: sage green `#C9D4BC`, bebé blando con brazitos cortos y piecitos.

**Acción**: sostiene una pequeña pieza de fruta (un trozo de aguacate o una fresa) cerca de la boca, examinándola con curiosidad, pequeña sonrisa cerrada.

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: standing baby form, small stubby arms, tiny rounded feet,
  slight pear shape.
- Body color: sage green #C9D4BC.
- Holding in one tiny hand: a small soft food piece — a chunk of avocado
  OR a strawberry half — close to the face, examining it with curiosity.
- Eyes: matte black vertical ovals, calmly wide-open, focused on the food piece.
- Mouth: tiny closed curve, expectant.
- Pose: leaning slightly forward, both arms slightly forward, exploring.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 5 · 💉 Vacunas · sage · bebé valiente

**Cuerpo**: sage green `#C9D4BC`.

**Acción**: de pie, mostrando con orgullo un mini-parche redondo beige en el bracito (suprimir cualquier indicio de jeringa o sangre). Pose "lo logré".

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: standing upright baby form, small stubby arms, tiny feet.
- Body color: sage green #C9D4BC.
- Detail: a tiny round beige bandaid (about 4% of body height) on the
  upper part of one arm. Soft, matte, plain — no cross, no symbol.
- Pose: standing proud, chest slightly forward, both arms slightly raised,
  showing a "look what I did" stance.
- Eyes: matte black vertical ovals, brave gentle gaze.
- Mouth: tiny soft proud smile (matte curve, slightly upturned).

NEGATIVE (extra): syringe, needle, blood, medical cross, red mark.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 6 · 🌙 Sueño · sage · bebé dormido

**Cuerpo**: sage green con tinte ligeramente más frío `#BFCDB6` (sensación nocturna).

**Acción**: acurrucado en posición fetal, ojos cerrados en suaves crescent, expresión de sueño profundo. Pequeña luna creciente sutil cerca pero **sin tocarla** y fundida a transparente.

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: small baby form curled inward, knees soft toward chest,
  arms tucked in close — a peaceful fetal sleep curl.
- Body color: sage green with cooler tone #BFCDB6 (slight night feeling
  WITHOUT going dark or dramatic).
- Pose: lying on side, deeply asleep, body relaxed.
- Eyes: softly closed matte black crescents, gentle upward arcs.
- Mouth: tiny matte curve, slightly parted in peaceful sleep.
- Optional: a tiny soft moon crescent shape floating nearby (about 15%
  body size), warm cream color, soft-edged, NOT touching the body and
  fading to fully transparent at its outer 40%.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 7 · 🌡️ Salud · sage · bebé cuidado

**Cuerpo**: sage green `#C9D4BC`.

**Acción**: una manita pequeña tocando suavemente la frente, mini-parche redondo beige en la rodillita, expresión de "no me siento del todo bien pero estoy cuidado". Sin rojo, sin alarmismo.

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: standing baby form, slightly slouched (a touch of softness
  in the posture, not alarmingly).
- Body color: sage green #C9D4BC.
- Details:
  • One tiny hand softly raised toward the forehead (a "I feel a little off"
    gesture — NOT distressed).
  • A small round beige bandaid on the rounded knee, very subtle, matte.
- Eyes: matte black vertical ovals, slightly drooped lower lids (sleepy
  not sad).
- Mouth: tiny neutral matte curve, slight downward at corners but warm.
- Expression: gentle vulnerability, sense of being cared for.

NEGATIVE (extra): red cheeks, fever flush, tears, scared, medical cross.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 8 · 🌱 Hitos · sage · bebé celebrando

**Cuerpo**: sage green `#C9D4BC`.

**Acción**: de pie sobre piecitos diminutos, ambos brazos ligeramente elevados en gesto de victoria suave, gran sonrisa cerrada (crescent eyes opcional para "súper contento").

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: standing upright baby form, balanced on tiny rounded feet,
  slightly wider stance to suggest stability of a new milestone.
- Body color: sage green #C9D4BC.
- Pose: both small arms slightly raised outward in a soft "I did it"
  celebration, body leaning gently forward, weight balanced.
- Eyes: option A — wide matte black vertical ovals with sparkle of focus;
  option B — closed soft crescent arcs (smiling eyes). Pick B if smile
  should be huge.
- Mouth: small wide matte black curve, joyful but soft — not cartoonish.
- Expression: pure quiet pride.

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## 9 · 💛 Desarrollo · sage con violet sutil · bebé curioso

**Cuerpo**: sage `#C9D4BC` con muy ligera modulación violeta hacia las sombras (`#B5BFC0` en los lower edges para guiñar al tonal violet del libro sin romper el sistema).

**Acción**: examinando un objeto sensorial pequeño (un cubo blando o anillo de madera estilo Montessori), expresión profundamente curiosa.

```
[BASE prompt arriba]

VARIATION FOR THIS BOOK:
- Body shape: seated or slightly leaning baby form, one arm forward
  holding a small object.
- Body color: sage green #C9D4BC with very subtle violet undertone in
  the shadowed areas (#B5BFC0 hint, never dominant).
- Holding in one tiny hand: a small soft sensory object — either a
  pastel-colored fabric cube (about 18% body size) OR a smooth wooden
  ring. Pick fabric cube as default.
- Pose: leaning slightly forward, fully absorbed in examining the object,
  bringing it close to face level.
- Eyes: matte black vertical ovals, very focused, slight tilt of head.
- Mouth: tiny matte curve slightly open in concentration ("oh, what is this").

--ar 1:1 --style raw --v 7 --q 2 --no background --no shadow
```

---

## Post-procesado (si la transparencia no llega limpia desde MJ)

1. Generar el set con `solid pure white background, no shadow` si `--no background` da resultado pobre.
2. Pasar cada PNG por `remove.bg` (free tier hasta 50/mes) o por el background eraser de Figma.
3. Verificar bordes: si quedan halos blancos en los contornos, en Figma usar `Layer effects → background blur 0` y un tono de "matte" a nivel pixel sobre el contorno.
4. Exportar todos como PNG-24 con alpha, 1024×1024 (suficiente para la card de cada libro en hi-res 2x).
5. Nombre de archivo canon: `avatar-{libro}.png` (e.g. `avatar-embarazo.png`, `avatar-lactancia.png`...).

## Mantener coherencia entre los 9

Antes de aprobar el set:

- Comparar los 9 en una sola pantalla a tamaño card real (256-320px).
- Comprobar que los ojos siguen siendo **matte negros sólidos** en los 9 (sin chrome).
- Verificar que los 3 cuerpos base se reconocen: coral=bolita / blush=recién nacido / sage=bebé.
- Si alguno desentona, re-roll con el mismo prompt (Midjourney suele converger en la segunda iteración).

---

*MJ avatares libros · canon Fase 0 + 3 cuerpos base · mayo 2026*
