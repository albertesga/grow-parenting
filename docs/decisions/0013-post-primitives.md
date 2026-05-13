# ADR-0013 · Post primitives · gallery + page · DS §Q

**Status:** Accepted
**Date:** 2026-05-13
**Commit:** `697fa56`

## Context

Los libros tienen contenido educativo de longitud variable:
- Hitos · explicación de escalas, cuándo preocuparse, lenguaje
- Salud · síntomas canon NICE, cuándo llamar/urgencias/112
- Embarazo · semana a semana, plan de parto, alarmas
- Sueño · regresiones, plan IA, ventana óptima

Antes esto se servía vía:
- `.callout` para snippets cortos
- `.{libro}-edu-card` ad-hoc en Salud (sin canon)
- Sheets stub con copy largo (no escalable)
- Sin pattern unificado para "lista de posts" + "post individual"

Necesidad: primitives reusables para contenido editorial educativo · gallery + post page.

## Decision

**Nuevos primitives canon en DS §Q (entre §P Vaccine calendar y §R Animations):**

### `.post-gallery` + `.post-card`

Grid de cards educativas · 1-col mobile · 2-col tablet. Cada card:
- **Illustration** · 92px ancho · gradient tonal (mint/coral/gold/blush/lavender) + icono 36px (emoji o SVG)
- **Tag** · pill 10px Lenia 0.12em uppercase tonal
- **h4** · Lenia 500 · 15px line-height 1.2
- **p excerpt** · Helvena · 12px ink-soft · 2-3 líneas máx
- **Meta** · Lenia 10.5px ink-muted · `{X min} · {Fuente · año}`
- **Hover** · `translateY(-1px)` + border ink-soft

Click abre `.post-page` (drill-down · sheet stub en v0).

### `.post-page`

Pantalla de un post individual · header + body + cite footer:
- **Header** · padding 22 · gradient tonal (igual que `.book-hero`) + tag + h2 26px + meta
- **Body** · Helvena 14px line-height 1.55 · `<h3>` 18px secciones internas
- **Cite footer** · paper-soft · border-left 3px ink-muted · uppercase "Fuentes" + p caption

Tono opcional (heredado de la card de origen).

### Reglas trauma-informed (ADR-0011 cross-ref)

- Cada post tiene **1 tag · 1 tono · 1 icono · 1 fuente con año**
- Tiempo lectura realista (3-7 min cortos · 8-15 min deep dives)
- Excerpt revela conclusión sin spoiler · NO clickbait
- Sin "te sorprenderás" · sin cliffhangers
- Fuente con año **siempre** · si no hay fuente, no es post · es nota
- Sticky disclaimer canónico al pie del `.post-page` · *"Aquí no diagnosticamos · aquí estamos"*

### Primer caller · Hitos · tab Aprende

- 6 posts canon AEPap/NICE/AAP (commit 697fa56)
- Toggles de Ajustes tab reusan `.profile-switch` (ADR-0008)

## Consequences

- ✓ Pattern unificado · cualquier libro puede tener "Aprende" / "Educación"
- ✓ Trauma-informed copy enforced por design (fuente obligatoria · sin clickbait)
- ✓ Tonal cycle visual ayuda a identificar tema (color = tag = ilustración)
- ✓ Multi-niño v1.5 ready · posts son content estático compartido entre niños
- ⚠ CSS duplicado entre prototype + DS (prefijo `.ds-post-*` en DS) · sincronía manual
  hasta que un build process unifique
- ⚠ Post pages drill-down todavía es sheet stub · v1 será sub-screen real

## Alternatives considered

- **Cards genéricas + tipografía libre**: pierde consistencia tonal y meta canon · NO.
- **Markdown rendering library**: overkill para contenido curado · NO en v0.
- **Iframe a blog externo**: pierde tonal canon + no offline · NO.
- **Solo cards sin post page**: insuficiente para deep dives clínicos · NO.
- **§K Cards extension**: §K ya está saturado · §Q nueva sección dedicada · más limpio.
