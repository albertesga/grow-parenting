# Prompt · Reemplazo de la sección "Voces de padres / preocupaciones" en la landing
## Mimo · canon Fase 0 · v0.1

> Briefing para Claude Design / Claude Code / quien implemente la landing pública de Mimo. Lee el contexto y aplica el reemplazo descrito al pie de letra.

> [!NOTE]
> **Typography canon May 2026** · Este brief fue migrado de tipografía legacy
> (Lenia + Helvena) a **Galiner + Inter**. Las referencias a "Galiner italic"
> en prose deben leerse como **Galiner Light 300 + `var(--ink-soft)`** · el
> corte Galiner Italic no existe (canon `.agent/rules/typography.md`).
> Los bloques CSS de § 4 ya están corregidos para usar `font-weight: 300`
> en lugar de `font-style: italic` sobre Galiner.

---

## 0 · Lo que tenemos hoy en la landing (sección a reemplazar)

En la iteración previa de la landing pusimos una **sección de scroll narrative con frases de preocupación parental** seguidas, cada una, de **cómo Mimo las atiende**. La sección se llamaba internamente "Voces de padres" / "Frases que escuchamos" / "Lo que te quita el sueño".

Su estructura era una columna larga vertical con pares pregunta/respuesta tipo:

```
"¿Es normal que llore tanto?"
→ Cry classifier · 5 segundos · 92% accuracy · canon Zoundream Hospital Clínic Barcelona.

"No sé si come lo suficiente."
→ Libro de Alimentación · BLW + tomas + caca tracker BITSS.

"¿Es algo grave?"
→ Chat IA con triage tree · NICE NG143/NG9/NG232 · escalada 112 si toca.

"Llevo tres noches sin dormir."
→ Modo madrugada · 3 rutas edad-aware · sin juzgar.

"No me atrevo a llamar a urgencias."
→ "Aquí no diagnosticamos. Te decimos si toca llamar."

"Mi pediatra no responde hasta el lunes."
→ Chat IA con citas clínicas siempre con fuente y año · 24/7.

"Mi pareja y yo no nos ponemos de acuerdo."
→ Cuenta compartida co-cuidador/a · sin género forzado · push síncrono.

"¿Cuándo le toca la vacuna?"
→ Libro de Vacunas · canon CAV-AEP 2026 · tracker fiebre 72h.

"Tengo miedo de hacerlo mal."
→ "No hay una manera correcta. Hay la tuya."
```

(Si el implementador no encuentra ese bloque actualmente en el código vivo de la landing, sabrá identificarlo por estos rasgos: pares pregunta + flecha → respuesta · scroll narrative vertical · pre-bloque manifesto · entre hero y bloque libros.)

---

## 1 · Por qué lo cambiamos

Esa sección era **transaccional** y **catálogo de features**: "Tienes este miedo → Mimo tiene esta función". Funcionaba como objection-handling, pero:

- Choca con el canon editorial reasonal-style de la landing v0.1 (calmo · no vendedor).
- Activa el miedo del cuidador/a antes de ofrecer paz · no es trauma-informed canon Fase 0.
- Convierte a Mimo en *solucionador de problemas* en lugar de *compañera*.
- Cada frase de pain implícitamente afirma que la familia está en crisis · no respeta a las familias que sí están bien.
- Apila 9 features distintos · diluye el mensaje.

**Decisión canon Fase 0**: la landing no enumera preocupaciones · valida que **cualquier manera de cuidar es válida**. Los detalles de cada libro/feature ya viven en el bloque 5 "Los libros" y en sus PRDs respectivos.

---

## 2 · Reemplazo · dos secciones nuevas

Donde estaba la sección "Voces de padres / preocupaciones", **insertar estas DOS secciones consecutivas** (en este orden, sin separador adicional).

---

### Sección A · Manifesto extendido

**Posición**: bloque inmediatamente posterior al Hero. Es el segundo bloque que ve el usuari@ al hacer scroll desde el hero.

**Tag interno**: `b-manifesto`

**Composición**:

- Background `paper-soft` (`#F2EDE0`).
- Contenido centrado · ancho máximo 560 px · padding vertical generoso (96 px arriba y abajo · 64 px en mobile).
- **Frase principal** · Galiner Italic 32-36 px (desktop) · 24 px (mobile) · color `ink-soft` (`#4D4D4D`) · line-height 1.4 · letter-spacing -0.005em:

> *No hay una manera correcta. Hay la tuya. Y la tuya nace del amor.*

- Divisor visual centrado debajo, **8 px** después del párrafo: tres puntos `· · ·` en `ink-faint` (`#BFBAA8`) · font Inter medium 11 px · letter-spacing 0.8em.
- **Sub-bajada opcional** debajo del divisor (16 px de gap) · Inter regular 14 px · `ink-soft` · max 420 px ancho:

> *Made by humans, for humans. Acompañamos sin diagnosticar, sin juzgar, sin militancia.*

**Sin**: imágenes, botones, links, números, badges. Es un suspiro entre el hero y el siguiente bloque. Tiene que sentirse como aire.

**Animación entry**: fade-in 600 ms ease-out al entrar al viewport. NO parallax. NO transform escalado. NO ningún efecto agresivo. Si `prefers-reduced-motion: reduce`, sin animación · solo aparece.

**Wireframe ASCII** (referencia visual):

```
┌────────────────────────────────────────────┐
│  background paper-soft                     │
│                                            │
│                                            │
│                                            │
│    No hay una manera correcta.             │
│    Hay la tuya. Y la tuya                  │
│    nace del amor.                          │
│                                            │
│              · · ·                         │
│                                            │
│   Made by humans, for humans.              │
│   Acompañamos sin diagnosticar,            │
│   sin juzgar, sin militancia.              │
│                                            │
│                                            │
│                                            │
└────────────────────────────────────────────┘
```

---

### Sección B · Para cualquier familia que cuida

**Posición**: bloque inmediatamente posterior al manifesto extendido (Sección A).

**Tag interno**: `b-para-quien`

**Composición**:

- Background `paper` (`#FAF7F0`) · transición visual sutil desde el `paper-soft` de la sección A (mismo cream warm, ligero contraste).
- **Eyebrow** uppercase 11 px · letter-spacing 0.18em · `ink-muted` (`#888`):

```
INCLUSIVIDAD · SIN GÉNERO FORZADO
```

- **H2 principal** · Galiner Medium 36-44 px (desktop) · 28 px (mobile) · color `ink` (`#34342D`) · line-height 1.2 · letter-spacing -0.005em:

> Para cualquier familia que cuida.

- **Sub-bajada** Inter regular 15-16 px · `ink-soft` · max 480 px:

> Madre · padre · pareja del mismo sexo · adopción · subrogación · monoparental · acogimiento · abuel@s tutor@s. Si en tu casa hay alguien pequeño a quien cuidas, Mimo es para ti.

- **Grid de 6 configuraciones familiares**, cada una como tarjeta minimalista paper bg + borde fino `line`:

| Posición | Label |
| --- | --- |
| 1 · top-left | 👩‍❤️‍👨 Madre + padre |
| 2 · top-center | 👩‍❤️‍👩 Dos madres / Dos padres |
| 3 · top-right | 👤 Monoparental |
| 4 · bottom-left | 🤝 Adopción |
| 5 · bottom-center | 💛 Subrogación |
| 6 · bottom-right | 👵 Abuel@s tutor@s · acogimiento |

Cada tarjeta:
- Padding 14 px · border-radius 8 px.
- Iconografía outline 32 px arriba (estilo reasonal-style minimalista · stroke 1.5-2 px · esquinas redondeadas).
- Label Inter medium 13 px · `ink`.
- Sin sombras agresivas · sin hover dramático · sólo border `ink-faint` al hover.

En mobile (< 600 px) el grid pasa a 2 columnas × 3 filas.

- **Frase de cierre** · Galiner Italic 18 px · `ink-soft` · centrada · 24 px debajo del grid:

> *Si tu corazón cuida de alguien pequeño, esto es para ti.*

**Sin**: testimonios, números, badges premium, CTAs en este bloque. La acción primaria la guarda el bloque "Los libros" siguiente.

**Animación entry**: stagger fade-in del grid 80 ms entre cada tarjeta · 400 ms total. NO parallax. Respeta `prefers-reduced-motion`.

**Wireframe ASCII** (referencia visual):

```
┌────────────────────────────────────────────┐
│  background paper                          │
│                                            │
│  INCLUSIVIDAD · SIN GÉNERO FORZADO         │
│                                            │
│  Para cualquier familia que cuida.         │
│                                            │
│  Madre · padre · pareja del mismo sexo ·   │
│  adopción · subrogación · monoparental ·   │
│  acogimiento · abuel@s tutor@s.            │
│  Si en tu casa hay alguien pequeño...      │
│                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ 👩‍❤️‍👨 │  │ 👩‍❤️‍👩 │  │ 👤  │              │
│  │ M+P  │  │ 2M/2P│  │ Mono │              │
│  └──────┘  └──────┘  └──────┘              │
│                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ 🤝  │  │ 💛  │  │ 👵  │              │
│  │ Ado. │  │ Subr.│  │ Tutr.│              │
│  └──────┘  └──────┘  └──────┘              │
│                                            │
│   Si tu corazón cuida de alguien           │
│   pequeño, esto es para ti.                │
│                                            │
└────────────────────────────────────────────┘
```

---

## 3 · Cómo se conecta con el resto de la landing

```
[ HEADER GLOBAL · sticky ]
   ↓
[ 1 · HERO · "Tú cuidas a tu hij@, y Mimo te cuida a ti." ]
   ↓
[ A · MANIFESTO EXTENDIDO · "No hay una manera correcta..."  ] ← NUEVO
   ↓
[ B · PARA CUALQUIER FAMILIA QUE CUIDA · grid 6 configs ]    ← NUEVO
   ↓
[ 4 · 1.000 DÍAS · timeline horizontal ]
   ↓
[ 5 · LOS LIBROS · bloque protagonista ]
   ↓
[ ... resto canon IA-homepage-v0.1.md ]
```

**Eliminar completamente** la sección antigua "Voces de padres / preocupaciones" con su scroll narrative pregunta/respuesta. Las preocupaciones específicas viven ahora en:
- Bloque 5 "Los libros" (cada libro abre detalle con su pain point).
- PRDs individuales (Cólicos · Vacunas · Salud · Chat 3AM) que se linkean desde los libros.
- FAQ canon al final de la landing (preguntas frecuentes con respuestas breves).

---

## 4 · Tokens DS aplicados (canon v0.2)

```css
/* Sección A · Manifesto extendido */
.b-manifesto {
  background: var(--paper-soft);
  padding: 96px 24px;
  text-align: center;
}
.b-manifesto .quote {
  /* Galiner sin italic per canon May 2026 · usar Light 300 + ink-soft
     para el matiz editorial (era "Galiner Italic" en brief original) */
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: 36px;
  line-height: 1.4;
  letter-spacing: -0.005em;
  color: var(--ink-soft);
  max-width: 560px;
  margin: 0 auto;
}
.b-manifesto .divider {
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.8em;
  color: var(--ink-faint);
  margin: 24px 0;
}
.b-manifesto .sub {
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--ink-soft);
  max-width: 420px;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .b-manifesto { padding: 64px 20px; }
  .b-manifesto .quote { font-size: 24px; }
}

/* Sección B · Para cualquier familia que cuida */
.b-para-quien {
  background: var(--paper);
  padding: 80px 24px;
}
.b-para-quien .eyebrow {
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--ink-muted);
  margin-bottom: 12px;
}
.b-para-quien h2 {
  font-family: "Galiner", Georgia, serif;
  font-weight: 500;
  font-size: 44px;
  line-height: 1.2;
  letter-spacing: -0.005em;
  color: var(--ink);
  margin: 0 0 16px;
}
.b-para-quien .sub {
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--ink-soft);
  max-width: 480px;
  margin: 0 0 32px;
}
.b-para-quien .grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 720px;
  margin: 0 auto;
}
.b-para-quien .card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 14px;
  text-align: center;
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: var(--ink);
}
.b-para-quien .card .ico {
  width: 32px;
  height: 32px;
  margin: 0 auto 8px;
  /* SVG outline · stroke 1.5-2px · canon reasonal-style */
}
.b-para-quien .closing {
  /* Galiner sin italic per canon May 2026 · usar Light 300 + ink-soft */
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: 18px;
  color: var(--ink-soft);
  text-align: center;
  margin-top: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 600px) {
  .b-para-quien { padding: 56px 20px; }
  .b-para-quien h2 { font-size: 28px; }
  .b-para-quien .grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 5 · Lo que el cambio resuelve · y lo que NO

### ✅ Resuelve

- Landing alineada con canon Fase 0 trauma-informed.
- Editorial calmo reasonal-style desde el segundo scroll.
- Inclusividad explícita sin género forzado.
- Espacio para respirar entre hero y bloque libros (que es denso).
- Coherencia con manifesto v2.10.
- Menor scroll fatigue (en lugar de 9 frases + respuestas, 2 secciones aireadas).

### ❌ Lo que NO resuelve (es trade-off consciente)

- Pierdes la conversión rápida tipo "responder objeción específica" para usuari@s muy racionales (los que querían ver feature-mapping directo).
- Los pain points específicos (cólicos · vacunas · noches) ahora viven en el bloque 5 "Los libros" y en el FAQ · NO en el segundo scroll.
- Si la métrica de conversión cae, considerar A/B test entre la versión canon (manifesto + inclusividad) y una versión que mantenga 3-4 pain points selectos como sub-bloque dentro de "Los libros".

---

## 6 · Texto exacto a usar (canon · no improvisar)

### Sección A · texto canon

**Frase principal** (Galiner Italic):

> No hay una manera correcta. Hay la tuya. Y la tuya nace del amor.

**Sub-bajada** (Inter regular):

> Made by humans, for humans. Acompañamos sin diagnosticar, sin juzgar, sin militancia.

### Sección B · texto canon

**Eyebrow** (Inter medium uppercase):

> INCLUSIVIDAD · SIN GÉNERO FORZADO

**H2** (Galiner medium):

> Para cualquier familia que cuida.

**Sub-bajada** (Inter regular):

> Madre · padre · pareja del mismo sexo · adopción · subrogación · monoparental · acogimiento · abuel@s tutor@s. Si en tu casa hay alguien pequeño a quien cuidas, Mimo es para ti.

**Labels de las 6 tarjetas** (Inter medium):

1. Madre + padre
2. Dos madres / dos padres
3. Monoparental
4. Adopción
5. Subrogación
6. Abuel@s tutor@s · acogimiento

**Frase de cierre** (Galiner italic):

> Si tu corazón cuida de alguien pequeño, esto es para ti.

---

## 7 · Checklist de implementación

- [ ] Identificar y eliminar la sección "Voces de padres / Frases / Preocupaciones" actual en la landing.
- [ ] Insertar Sección A `b-manifesto` justo después del Hero.
- [ ] Insertar Sección B `b-para-quien` justo después de Sección A.
- [ ] Aplicar tokens DS v0.2 exactos (paper, paper-soft, ink, ink-soft, line, ink-muted, ink-faint).
- [ ] Tipografías canon: Galiner Italic en frases manifesto · Galiner Medium en H2 · Inter en sub + labels.
- [ ] Crear las 6 ilustraciones outline para las configs familiares (estilo reasonal-style · stroke 1.5-2 px).
- [ ] Respetar `prefers-reduced-motion: reduce` · sin animaciones agresivas.
- [ ] Validar contraste AAA en body Inter sobre paper.
- [ ] Validar mobile responsive (grid pasa a 2×3 en < 600 px).
- [ ] Versión EN paralela canon (sin traducción literal · cultural fit):
  - *"There's no right way. There's yours. And yours comes from love."*
  - *"For any family that cares."*

---

## 8 · Cross-ref canon

- `/Mimo/design/IA-homepage-v0.1.md` · estos dos bloques son **02 · Manifesto extendido** y **03 · ¿Para quién?** del sitemap canon.
- `/Mimo/design/wireframes-homepage-v0.1.html` · ya están materializados en lo-fi.
- `/Mimo/prd/PRD-libro-colicos-v0.1.md` · canon trauma-informed copy.
- `/Mimo/prd/PRD-chat-modo-madrugada-v0.1.md` · canon "Aquí no diagnosticamos. Aquí estamos."
- Manifesto v2.10 canon Fase 0 (Notion · Hub Mimo).
- DS Mimo v0.2 · Foundations + Product Components.

---

*Prompt v0.1 · canon Fase 0 · alineado con IA-homepage-v0.1 + DS v0.2 · abril 2026*
