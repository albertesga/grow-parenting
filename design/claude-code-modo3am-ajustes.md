# Ajustes Modo 3 AM · landing index.html

> Cuatro prompts atómicos para Claude Code. Cada uno = un commit. Ordenados por prioridad. Pegar uno a uno; no encadenar.

| # | Cambio | Prioridad | Esfuerzo |
|---|---|---|---|
| 1 | Fix copy regulatorio (footer + lead + segunda mención NSBSP) | 🔴 alta · MDR | very low |
| 2 | Sub-líneas descriptivas bajo los 3 chips + mini-promesa | 🟡 media · comprensión | low |
| 3 | 3 viñetas demostrando entrada → pregunta → resultado | 🟡 media · comprensión | medium |
| 4 | Subir contraste de chips inactivos en mockup | 🟢 baja · visual | very low |

Contexto compartido (Claude Code ya lo tiene): repo Mimo, DS v0.2, canon Fase 0, sección Modo 3 AM en `homepage/index.html`, ADR-0005 (Modo madrugada single-thread + Modo madrugada efímero). Antes de cualquier cambio, leer ADR-0005 y `.claude/PATTERNS.md`.

---

## 🔴 Prompt 1 · Fix copy regulatorio (MDR + precisión clínica)

```
PROBLEMA
La sección Modo 3 AM en homepage/index.html tiene wording que nos
mete en MDR Class IIa innecesariamente y una cita clínica imprecisa
que un pediatra detectaría al instante:

1) Línea 707 (lede):
   "Te ayuda a decidir si toca consultar, vigilar en casa o pedir relevo"
   → "Te ayuda a decidir" frame el producto como decisión clínica.

2) Línea 713 (footer audit):
   "Avalado · Servicio de Urgencias Pediátricas · protocolo
    internacional de triage (NSBSP)"
   → DOS errores:
   • "triage" es la palabra que dispara MDR Rule 11 Class IIa.
   • NSBSP = National Center on Shaken Baby Syndrome Prevention.
     NO es un protocolo de triage. Es un marco anti-shaken-baby
     (educación al cuidador agotado, justifica el chip "No puedo más").

3) Línea 894 (otro bloque):
   "escalas validadas (NSBSP, Haizea-Llevant)"
   → NSBSP tampoco es una escala. Misma cita mal usada.

CAMBIO

En index.html, sustituir:

[línea 707] de:
"Cuando llega una noche difícil, Mimo baja el ritmo: fondo oscuro,
texto grande y una pregunta cada vez. Te ayuda a decidir si toca
consultar, vigilar en casa o pedir relevo."

a:
"Cuando llega una noche difícil, Mimo baja el ritmo: fondo oscuro,
texto grande, una pregunta cada vez. Te ayudamos a entender qué
dicen las guías sobre lo que estás viendo — tú decides qué hacer."

[línea 713] de:
"Avalado · Servicio de Urgencias Pediátricas · protocolo
internacional de triage (NSBSP)"

a:
"Revisado por Servicio de Urgencias Pediátricas · marco
anti-shaken-baby NSBSP · información basada en NICE NG143,
AEPED 2026 y AAP 2026"

[línea 894] de:
"escalas validadas (NSBSP, Haizea-Llevant)"

a:
"escalas validadas (Haizea-Llevant, LATCH, EPDS, M-CHAT-R)"

CRITERIOS DE ACEPTACIÓN
- Cero ocurrencias de la palabra "triage" en index.html (verificar
  con grep). Si aparece en otro sitio que no encontremos aquí,
  flagearlo en el commit message — no editarlo sin contexto.
- NSBSP solo aparece en contexto correcto: "marco anti-shaken-baby"
  o equivalente. Nunca como triage, nunca como escala.
- El lede del Modo 3 AM no usa verbos de decisión clínica:
  "decide", "diagnostica", "valora clínicamente", "triage".
  Sí puede usar: "te ayudamos a entender", "te orientamos",
  "te mostramos qué dicen las guías".

NO HACER
- No tocar el footer del comité asesor (sección 5).
- No quitar la mención a "Servicio de Urgencias Pediátricas" —
  esa revisión sí está hecha y es claim sostenible.
- No quitar las citas a NICE/AEPED/AAP — son las que sostienen
  el contenido del árbol.
- No cambiar el chip "No puedo más" — su existencia es justamente
  lo que justifica citar NSBSP correctamente.

COMMIT
fix(landing): retirar wording de triage del Modo 3 AM y corregir cita NSBSP

   - "triage" dispara MDR Class IIa por Rule 11; sustituido por
     wording de orientación informativa.
   - NSBSP citado como marco anti-shaken-baby (uso correcto)
     en lugar de "protocolo de triage" / "escala validada".
   - Lede reformulado: "te ayudamos a entender" en lugar de
     "te ayuda a decidir".
```

---

## 🟡 Prompt 2 · Sub-líneas bajo chips + mini-promesa

```
PROBLEMA
Los 3 chips de entrada del Modo 3 AM son ambiguos para alguien
que ve la landing en frío. Especialmente "No puedo más" — sin
contexto del marco NSBSP, suena vago. Y la landing no contesta
tres preguntas básicas que el visitante se hace al ver la sección:
¿está siempre disponible? ¿es de pago? ¿tengo que registrarme?

CAMBIO

En index.html, sección Modo 3 AM (.threeam):

1) Sustituir los chips actuales (líneas 708-712) por una lista con
   sub-línea descriptiva. Reusar primitives DS existentes — no crear
   .threeam-chip propio. Si .chip ya soporta sub-línea, usarlo;
   si no, añadir un span hijo con clase descriptiva genérica.

   Contenido:

   • No para de llorar
     Cólicos, llanto inconsolable, llevas horas
   • Le pasa algo
     Fiebre, respira raro, ha vomitado, rash
   • No puedo más
     Cuando tú necesitas el relevo

2) Añadir una mini-promesa debajo del bloque .audit (después de
   línea 713):

   <p class="threeam-promise">
     Disponible 22:00–06:00 · gratis · sin login · sin presión.
   </p>

   Tamaño visual: entre el .audit y el footer del comité, más
   pequeño que el lede, más grande que el .audit. Color ink-soft
   sobre fondo dark (verificar contraste WCAG AA).

CRITERIOS DE ACEPTACIÓN
- Los 3 chips siguen siendo clicables/tappables como una unidad
  (no separar el título de la sub-línea con padding/gap visual
  excesivo).
- La sub-línea es jerárquicamente secundaria: font-size menor,
  color más suave, peso menor.
- En mobile, los 3 chips siguen apilándose verticalmente con
  la sub-línea legible (no se corta).
- La mini-promesa no compite visualmente con el title — es
  utilitaria, no protagonista.
- Mantener el chip "is-live" highlighted en el primero
  (No para de llorar) — esa pauta visual se conserva.

NO HACER
- No crear clases .threeam-chip / .modo3am-chip propias. Reusar
  .chip canon. Si necesita variante, .chip--with-sub o similar.
- No añadir iconos a los chips. El DS de Mimo no los usa aquí.
- No usar "gratis siempre" ni "100% gratis" en la mini-promesa
  (claim regulatorio + comercial impreciso vs estructura
  freemium real).
- No cambiar el copy del título principal ni del lede (esto
  se hace en el prompt 1 si no se ha aplicado aún).

COMMIT
feat(landing): añadir sub-líneas descriptivas a chips Modo 3 AM y mini-promesa de acceso

   - 3 chips ganan sub-línea contextual (qué cubre cada ruta).
   - "No puedo más" gana contexto NSBSP sin nombrarlo
     ("cuando tú necesitas el relevo").
   - Mini-promesa contesta 3 dudas mudas del visitante:
     disponibilidad horaria, coste, friction de signup.
```

---

## 🟡 Prompt 3 · Viñetas demostrando el flow real (entrada → pregunta → resultado)

```
PROBLEMA
El bloque Modo 3 AM dice "una pregunta cada vez" pero el mockup
solo muestra la pantalla de entrada con los 3 chips. El visitante
nunca ve cómo funciona realmente — tiene que imaginarlo. Y lo
diferencial del modo (cadencia trauma-informed, resultado claro
con acción) queda invisible.

CAMBIO

En index.html, sección Modo 3 AM (.threeam .mockup), sustituir el
único mockup actual (líneas 715-723) por una secuencia de 3
mockups apilados horizontal en desktop / verticalmente en mobile,
contando una historia de 5 segundos:

VIÑETA 1 · entrada (lo que hay hoy)
  Time:    03:42 · MODO 3 AM
  Title:   Estoy aquí.
  Sub:     Una pregunta cada vez. Sin prisa.
  Chips:   [No para de llorar →]  ← highlighted
           [Le pasa algo →]
           [No puedo más →]
  Foot:    Aquí no diagnosticamos · aquí estamos.

VIÑETA 2 · pregunta (nueva)
  Time:    03:42 · MODO 3 AM
  Title:   ¿Le notas la respiración
           más rápida de lo normal?
  Sub:     (vacío o muy sutil)
  Chips:   [Sí, respira muy rápido →]  ← highlighted
           [No estoy segura →]
           [No, respira normal →]
  Foot:    Aquí no diagnosticamos · aquí estamos.

VIÑETA 3 · resultado (nueva)
  Time:    03:43 · MODO 3 AM
  Title:   Casa, con vigilancia.
  Sub:     Esperamos 30 minutos. Si empeora, 061.
  List:    • Pecho descubierto
           • Cuenta respiraciones por minuto
           • Mantén la luz baja
  CTA:     [¿Algo más? →]  (secundario)
  Foot:    Información basada en NICE NG143 · aquí estamos.

LAYOUT
- Desktop ≥1024px: 3 viñetas en fila, conectadas por una línea/dot
  suave que insinúa la secuencia. Cada viñeta ~280-320px ancho.
- Tablet 640-1023px: 3 viñetas en fila más compactas, o 2+1.
- Mobile ≤639px: apiladas verticales con separación clara y un
  pequeño "↓" entre viñetas (decorativo, no link).
- prefers-reduced-motion: sin animación (estáticas siempre).
- Sin animación de auto-rotación. Son estáticas — 3 viñetas
  visibles a la vez, no un carousel.

CRITERIOS DE ACEPTACIÓN
- Las 3 viñetas usan el mismo primitive .mockup del DS, no clases
  custom. Si .mockup necesita variantes (.mockup--question /
  --result), añadirlas mínimas.
- El usuario puede entender el flow completo sin leer el lede:
  "ah, le hace una pregunta, y luego le da una respuesta clara
  con acciones".
- La viñeta 3 no usa "te recomendamos" ni "deberías" — usa
  imperativos suaves estructurales ("Esperamos 30 min").
- El footer de la viñeta 3 cita la guía que soporta la respuesta
  (NICE NG143) — refuerza el claim regulatorio del prompt 1.
- Mantener fondo dark (.night / .threeam) en las 3 viñetas.

NO HACER
- No hacer interactivas las viñetas. Son storytelling estático,
  no preview funcional. Si en el futuro se quiere demo
  interactiva, va a un prompt separado.
- No usar la palabra "triage" en ninguna viñeta.
- No mostrar el chip "No puedo más" con la palabra "urgencia" —
  ese flow tiene su propio output (relevo · 024 · respiración
  guiada) y se demuestra en un prompt distinto si se quiere.
- No añadir countdown ni timers visibles en la viñeta 3 ("30
  minutos" es copy, no un widget que cuente).
- No reemplazar la viñeta 1 — debe seguir siendo la misma
  entrada que ya existe, para no romper consistency con el chip
  highlighted del lado izquierdo.

COMMIT
feat(landing): mostrar flow del Modo 3 AM con 3 viñetas (entrada → pregunta → resultado)

   - Sustituye mockup único por secuencia de 3 viñetas que
     enseñan el flow real, no solo la entrada.
   - Viñeta 3 cita NICE NG143 inline, reforzando el claim
     "información basada en guías" del lede reformulado.
   - Apilado responsive: horizontal desktop, vertical mobile.
```

---

## 🟢 Prompt 4 · Subir contraste de chips inactivos en mockup

```
PROBLEMA
En el mockup del Modo 3 AM (clase .mp-chip), el chip activo
(.primary) tiene fill gold/coral con buen contraste, pero los
otros dos chips están casi invisibles sobre el fondo dark.
Resultado contradictorio: una sección que demuestra calma y
claridad nocturna esconde 2 de las 3 rutas que ofrece.

CAMBIO

En styles.css, localizar la regla de .mp-chip (NO la .primary)
en la sección del Modo 3 AM. Subir su legibilidad sobre el fondo
night sin convertirla en una segunda primaria:

- background: subir opacity / lightness ligeramente (e.g. de
  rgba sobre dark ~5-8% a ~12-15%, o equivalente con tokens DS).
- border: pasar de invisible/transparent a 1px solid
  rgba(paper, 0.12-0.18) para definir el contorno.
- color (texto): si está a paper con opacity baja, subir a 0.78-0.85.
- hover: mantener tratamiento canon — ligero translate / border
  más visible, sin cambiar el fill principal.

Objetivo medible: contraste texto/fondo del chip inactivo ≥ AA
(4.5:1 para texto normal). Comprobar con devtools o curl + tool.

Si el chip activo .primary depende visualmente de que los otros
estén casi invisibles para destacar, recalibrar: el activo puede
mantener su gold fill, los inactivos solo necesitan ser leíbles,
no competir.

CRITERIOS DE ACEPTACIÓN
- En el mockup, los 3 chips son claramente leíbles. El primero
  sigue siendo visualmente el destacado (gold/coral fill).
- WCAG AA: contraste ≥4.5:1 en todos los chips. Verificar con
  Chrome devtools Lighthouse o equivalente.
- En mobile, sin overflow del chip ni del border.
- Si los 3 mockups del prompt 3 ya están aplicados, este fix
  aplica a las 3 viñetas — no solo a la primera.

NO HACER
- No cambiar el tratamiento del chip primary (.primary). Sigue
  siendo el highlight visual.
- No añadir border-radius distinto entre activos e inactivos.
  La forma se conserva, solo cambia el fill/border.
- No usar !important para los overrides — refactorizar el
  selector si hace falta más specificity.
- No tocar los chips del lado izquierdo (.chips > .chip) — ese
  bloque tiene su propio tratamiento canon y es el que está bien.

COMMIT
fix(landing): subir contraste de chips inactivos en mockup Modo 3 AM (WCAG AA)

   - Los chips no-primary del mockup eran casi invisibles sobre
     fondo night, contradictorio con una sección que vende
     claridad nocturna.
   - Background opacity + border + text color ajustados para
     pasar AA (4.5:1) sin competir con .primary.
```

---

## Notas para Claude Code

- Antes del prompt 1, validar con `grep -n triage homepage/` y reportar si aparece fuera de las líneas conocidas (707, 713) — puede haber heredados de versiones viejas que también convenga limpiar en el mismo PR.
- Tras cada prompt, `python3 -m http.server 5050` en `/homepage/` y validar visualmente antes del commit.
- Tras el prompt 3, abrir la página en mobile viewport (390×844) y verificar que las 3 viñetas no rompen layout. Si rompen, ajustar antes de commit.
- Push después de cada commit (single-developer repo, canon `CLAUDE.md`).

---

*Ajustes Modo 3 AM · canon Fase 0 + ADR-0005 · mayo 2026*
