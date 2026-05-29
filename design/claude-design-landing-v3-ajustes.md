# Ajustes a la landing v3 de Mimo · prompts para Claude Design
## 8 cambios derivados del research de validación de propuesta de valor · mayo 2026

> Estos 8 prompts corrigen la landing **v3** (`design/claude-design-landing-brief-v3.md`) a partir de los hallazgos del research de 24 usuarios sintéticos — ver Notion *3.1 · Validación de propuesta de valor · Homepage*. Cada prompt es **autónomo y pegable**: aplícalo actualizando primero el brief v3, o pásalo directo a Claude Design al generar `design/wireframes-homepage-v0.3-hi-fi.html`. No reescriben la arquitectura de 6 secciones — solo ajustan dentro de ella.

---

## Resumen · qué cambia y por qué

| # | Cambio | Sección landing | Prioridad |
| --- | --- | --- | --- |
| 1 | Hero funcional: decir **qué hace**, no solo qué hace sentir | 1 · Hero | 🔴 Alta |
| 2 | Sacar el precio del CTA del hero + hacer visible el **tier gratuito** | 1 · Hero · 6 · Pricing | 🔴 Alta |
| 3 | Reintroducir una **señal de inclusividad** para familias no estándar | 2 · Parallax · 3 · Libros | 🔴 Alta |
| 4 | Reformular **"desde la concepción"** para no excluir a la adopción | 1 · microcopy | 🟡 Media |
| 5 | **Comité asesor** con nombres reales — o reestructurar la sección | 5 · Validado | 🟡 Media |
| 6 | Resolver la contradicción **"sin urgencia"** vs **"Modo emergencia"** | 1 · 4 | 🟡 Media |
| 7 | Hacer la **jerga clínica accesible** a todo nivel socioeconómico | 1 · trust signals · 5 | 🟡 Media |
| 8 | Narrativa **stage-aware**: que no se sienta solo "para el principio" | 2 · Parallax · 3 · Libros | 🟢 Baja |

Al final hay una **decisión de canon** señalada (la "@" de "hij@") que no es un prompt de diseño.

---

## 🔴 Prompt 1 · Hero funcional

```
Ajuste a la landing v3 de Mimo (ver design/claude-design-landing-brief-v3.md, Sección 1 · Hero).

PROBLEMA (research v0.3, 24 usuarios): el hero comunica un sentimiento ("Mimo te cuida a ti")
pero no qué HACE la app. Casi nadie supo decir si es un tracker, contenido, un chat o las tres
cosas. El test de 5 segundos pasa solo a medias. Además "los 9 libros" se confunde con material
de lectura, no con una app con herramientas.

CAMBIO: mantén el manifiesto canon en Galiner ("Tú cuidas a tu hij@. / Mimo te cuida a ti." +
"Sin manual, sin juicios, sin urgencia."). Añade DEBAJO una sola línea funcional en Inter que
diga, en concreto, qué obtiene el usuario — nombrando las tres patas: SABER (contenido con
criterio clínico), REGISTRAR (seguimiento) y PREGUNTAR (chat que conoce a tu hij@). Ejemplo de
intención, no copy final: "Tu embarazo y la crianza, semana a semana: contenido con criterio
clínico, seguimiento y un chat que conoce a tu hij@." Ajusta el microcopy de rango de edad
para que conviva con esta línea sin repetir.

CRITERIOS DE ACEPTACIÓN: tras 5 segundos sobre el hero, un usuario nuevo puede decir (1) qué es,
(2) para quién, (3) qué hace. La palabra "libros" no aparece sin un anclaje de que es una app
con herramientas.

NO HACER: no alargar el hero a un párrafo (máximo: manifiesto + 1 línea funcional + microcopy).
No meter bullets de features en el hero. No tocar el tono trauma-informed.
```

---

## 🔴 Prompt 2 · Precio fuera del CTA + tier gratuito visible

```
Ajuste a la landing v3 de Mimo (Sección 1 · Hero CTA + Sección 6 · Pricing).

PROBLEMA (research v0.3): el CTA del hero "Apúntate desde €1.99/mes" pone el precio antes de que
el valor aterrice. Usuarios de renta baja lo leen como "producto de pago, no es para mí" y
rebotan. Y el tier gratuito robusto — que el research previo declaró prerrequisito de
inclusividad y de prescripción médica — no aparece en ninguna parte de la landing.

CAMBIO:
1. CTA primario del hero → orientado a valor, SIN precio: "Entra en la lista" o "Apúntate gratis".
2. En la Sección 6 · Pricing, añade visible el TIER GRATUITO como primer bloque, con lo que
   incluye sin pagar (mínimo canon: 1 libro core, chat IA limitado, Modo madrugada, calendario básico,
   diario). Founding €1.99 y Plus €7.99 se mantienen, pero el free deja de ser invisible.
3. Microcopy bajo el pricing: que quedarse en gratis sea una opción digna, no un castigo.

CRITERIOS DE ACEPTACIÓN: ningún precio en € aparece por encima de la Sección 6. El tier gratuito
es lo primero que se ve en la sección de pricing. El trial 14 días sin tarjeta sigue visible.

NO HACER: no esconder el pricing entero (sigue siendo transparente, solo deja de liderar). No
countdown ni FOMO. No pintar el free como una versión "lite" frustrante.
```

---

## 🔴 Prompt 3 · Señal de inclusividad para familias no estándar

```
Ajuste a la landing v3 de Mimo (Sección 2 · Parallax + Sección 3 · Libros).

PROBLEMA (research v0.3, hallazgo #1): v3 quitó el bloque "Para cualquier familia que cuida" y
el de modos especiales apostando por "inclusividad implícita". No funciona: preemie, adopción,
subrogación, dos madres y monoparental dijeron, casi con la misma frase, "si no me nombráis,
asumo que no me pensasteis". Son ~15-20% de las familias nuevas, además del moat clínico
declarado (preemie/arcoíris real) y de los usuarios de mayor disposición a pagar.

CAMBIO: reintroduce UNA señal honesta de que esas familias están vistas, SIN volver al grid de
6 configuraciones. Elige la opción más limpia o combina dos en versión ligera:
(a) añade en el parallax una 6ª frase situación-dolor desde una familia no gestante o no
    estándar (adopción/acogida, o post-UCIN) con su card de respuesta;
(b) en una card de libro relevante (Hitos, Salud, Desarrollo) muestra una etiqueta sutil
    tipo "edad corregida" o "modo arcoíris" como prueba de que el producto los contempla;
(c) una línea honesta al cierre del parallax: "Vengas de donde vengas tu historia — gestación,
    adopción, acogida, una pérdida antes — Mimo se adapta a la tuya."

CRITERIOS DE ACEPTACIÓN: una persona de familia no estándar encuentra al menos un punto
explícito de la landing donde se reconoce su caso. Sin bloque dedicado tipo grid.

NO HACER: no reconstruir el grid de 6 configs (es anti-patrón del brief v3). No foto de stock.
No convertirlo en un bloque decorativo de "diversidad" — la señal debe ser funcional (qué hace
el producto distinto para ellos), no estética.
```

---

## 🟡 Prompt 4 · Reformular "desde la concepción"

```
Ajuste a la landing v3 de Mimo (microcopy del Hero y cualquier mención del rango de edad).

PROBLEMA (research v0.3): "De la concepción al 3er cumpleaños" excluye en seco a las familias
adoptivas — no hubo concepción en su historia y se incorporan más tarde. Es un gatillo de
exclusión en la primera línea de la landing.

CAMBIO: reformula el rango para que no presuponga gestación propia y siga comunicando "los
1.000 días". Ejemplos de intención, no copy final: "Desde antes de que llegue hasta sus 3 años",
"Del embarazo —o del día que llega— a su tercer cumpleaños", "Los tres primeros años, desde el
principio". Mantén la concreción del rango de edad: es información clave para el 5-second test.

CRITERIOS DE ACEPTACIÓN: el microcopy de rango no asume que el usuario ha gestado. Sigue
dejando claro que cubre embarazo + 0-3 años.

NO HACER: no perder la concreción del rango por sonar inclusivo (no vale un vago "para la
crianza"). No alargar el microcopy.
```

---

## 🟡 Prompt 5 · Comité asesor con nombres reales

```
Ajuste a la landing v3 de Mimo (Sección 5 · Validado por quien sabe).

PROBLEMA (research v0.3): la pediatra prescriptora — el usuario más valioso del flywheel B2B —
rechazó la sección: un "comité asesor" con avatares placeholder y sin nombres es marketing, no
credibilidad. Sin nombres reales, la sección RESTA en vez de sumar para quien más puede
recomendar Mimo.

CAMBIO:
- Si hay comité asesor real cerrado: muéstralo con nombre y apellidos, especialidad y
  hospital/centro de referencia verificables.
- Si todavía no está cerrado: NO inventes perfiles ni nombres. Reestructura la sección hacia lo
  que sí es verificable hoy — el canon clínico (AEPED 2026, CAV-AEP, Haizea-Llevant, escalas
  validadas, MDR Class IIa pathway) y el proceso ("cada palabra y cada cita las revisa personal
  sanitario"). Si aplica, un espacio honesto "comité asesor — en formación" es mejor que
  placeholders anónimos.

CRITERIOS DE ACEPTACIÓN: cero avatares de personas sin nombre real. La credibilidad de la
sección descansa solo en hechos verificables.

NO HACER: no nombres ni credenciales inventados. No fotos de stock presentadas como "expertos".
No logos de hospitales sin acuerdo real.
```

---

## 🟡 Prompt 6 · Coherencia "sin urgencia" vs "Modo emergencia"

```
Ajuste a la landing v3 de Mimo (Hero/manifiesto + Sección 4 · Modo madrugada).

PROBLEMA (research v0.3): el manifiesto promete "sin urgencia" y la Sección 4 va sobre un "modo
emergencia / urgencia". Una usuaria escéptica detectó la contradicción en segundos: "¿en qué
quedamos?".

CAMBIO: alinea el vocabulario. "Sin urgencia" en el manifiesto significa "sin presión, sin
alarmismo, a tu ritmo": déjalo explícito, o cámbialo a una palabra que no choque ("sin prisa",
"sin agobios"). Y/o reencuadra la Sección 4: el Modo madrugada no es "crear urgencia" sino "estar
cuando la urgencia llega". El copy de la sección debe dejar claro que el modo te CALMA y te
orienta en un momento difícil, no que la app te mete en estado de alarma.

CRITERIOS DE ACEPTACIÓN: leídos el hero y la Sección 4 seguidos, no hay contradicción aparente
entre "sin urgencia" y el Modo madrugada. Un escéptico no puede señalar incoherencia.

NO HACER: no eliminar el Modo madrugada ni suavizar su utilidad real (es un diferencial fuerte). No
rojo médico. El ajuste es de lenguaje y encuadre, no de función.
```

---

## 🟡 Prompt 7 · Jerga clínica accesible a todo nivel socioeconómico

```
Ajuste a la landing v3 de Mimo (Sección 1 · trust signals + Sección 5 · micro-badges).

PROBLEMA (research v0.3): "MDR Class IIa pathway" y los nombres de escalas (EPDS, M-CHAT-R,
ASQ-3, LATCH, BITSS...) tranquilizan a la diana informada y a la pediatra, pero a usuarias de
renta baja o menor literacidad les dicen "esto es para gente con estudios y dinero" — y cortan
la alineación con el producto.

CAMBIO: mantén el rigor pero tradúcelo. Cada término técnico acompañado de su función en
lenguaje llano. Ejemplos: "MDR Class IIa pathway" → "En camino de certificarse como producto
sanitario en la UE"; las escalas → "tests validados que usan los profesionales para detectar a
tiempo". Los nombres técnicos pueden quedar como detalle secundario o tooltip, no como titular.
El trust signal debe tranquilizar a todo el espectro socioeconómico, no señalar pertenencia a
una clase.

CRITERIOS DE ACEPTACIÓN: una persona sin formación sanitaria entiende qué le aporta cada trust
signal y cada badge sin buscar nada fuera. Ninguna sigla o término en inglés aparece sin glosa.

NO HACER: no quitar el rigor clínico (es el moat). No infantilizar. No esconder información
clave en tooltips que en móvil no se ven.
```

---

## 🟢 Prompt 8 · Narrativa stage-aware

```
Ajuste a la landing v3 de Mimo (Sección 2 · Parallax + Sección 3 · Libros).

PROBLEMA (research v0.3): el parallax cuenta tan bien una historia cronológica
(embarazo → bebé → toddler) que quien no está al principio se siente descentrado. La embarazada
de 34 semanas siente que "la web le habla a la semana 8"; la madre de un niño de casi 3 años,
que "la app se le acaba pronto".

CAMBIO: introduce una señal ligera de "estés donde estés en el camino, esto es para tu ahora".
Opciones:
(a) una línea de encuadre antes o después del parallax que diga explícitamente que al recorrido
    se entra en cualquier punto, no solo al inicio;
(b) que la Sección 3 · Libros comunique que cada libro se activa según la edad real del hij@
    (la tabla del brief ya tiene "edad activa" — hazla legible como "lo que te toca ahora");
(c) que la frase del parallax de embarazo no quede anclada solo en el primer trimestre.

CRITERIOS DE ACEPTACIÓN: una usuaria en embarazo avanzado o con un toddler mayor encuentra una
señal de que la landing y el producto le hablan a su etapa actual, no solo al principio.

NO HACER: no romper la narrativa cronológica del parallax (funciona muy bien para la diana). No
añadir un selector de etapa pesado en la landing. El cambio es sutil.
```

---

## Decisión de canon (no es un prompt de diseño)

El research detectó que la **"@" de "hij@"** y la estética abstracta de marca pierden a usuarios de baja afinidad tech y mayores (perfil abuelo-cuidador): no entienden de entrada qué es el producto.

Esto **no es un ajuste de landing** — "hij@" es una decisión del manifiesto canon. Si quisieras tocarlo, es una decisión de marca tuya, no de Claude Design. Opciones: mantener "hij@" y asumir el coste en ese segmento (defendible: no es la diana), o evaluar "tu hijo o tu hija" / "tu hij@" en el hero. Lo dejo señalado, no convertido en prompt.

---

## Cómo usar este archivo

1. **Rápido**: pega los prompts 1, 2 y 3 (prioridad alta) a Claude Design junto con el brief v3 — son los que mueven la aguja antes de un smoke test.
2. **Completo**: aplica los 8 actualizando primero `claude-design-landing-brief-v3.md` a un v3.1, y luego genera el HTML una sola vez.
3. Los prompts 1, 4 y 6 son cambios de copy/microcopy; 2, 3, 5, 7, 8 tocan estructura o contenido de sección.

*Derivado de: Notion · 3.1 · Validación de propuesta de valor · Homepage (24 usuarios) · mayo 2026.*
