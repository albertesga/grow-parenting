---
description: Auditor de sincronía DS ↔ prototype. Detecta drift entre el Design System y la implementación · CSS huérfano (en uno pero no en otro), primitives documentados sin uso, primitives usados sin documentar. Reporta por categoría (book-hero, chips, navbar, timeline). Úsalo después de cualquier cambio que toque CSS de un primitive canónico o cuando sospeches que el DS está desincronizado. Trigger keywords: sync DS, sincronía, drift, audit DS, gap prototype-DS, design system drift, primitives huérfanos, DS auditoría.
allowed-tools: Bash(grep *) Bash(rg *)
---

## Auditoría DS ↔ prototype

### 1. Primitives clave en DS

!`grep -oE "^\s*\.[a-z][a-z0-9-]+\s*\{" "/Users/titoespanolgamon/Documents/Vibe Coding/Grow/design/Grow Design System v0.2.html" | sort -u | head -40`

### 2. Primitives clave en prototype

!`grep -oE "^\s*\.[a-z][a-z0-9-]+\s*\{" "/Users/titoespanolgamon/Documents/Vibe Coding/Grow/prototype.html" | sort -u | head -40`

## Tu tarea

Cruza ambas listas y reporta en formato tabla:

| Primitive | Status | Acción sugerida |
|---|---|---|
| `.book-hero` | ✓ ambos | OK |
| `.foo-bar` | solo prototype | Documentar en DS o renombrar |
| `.legacy-x` | solo DS | Quitar de DS si no se usa o portar a prototype |

**Comprueba específicamente:**

1. **Book heros** · `.book-hero.{tono}` debe existir en DS para cada tono usado en prototype (`mint`, `coral`, `gold`, `blush`, `lavender`, `salud`).

2. **Chip variants** · `.chip.{tono}` + `.chip.active` + `.chip.premium` deben estar canónicamente documentados en DS §E.

3. **Navbar dedicado** · cada `.{libro}-phone-nav` que aparezca en prototype debe seguir el patrón documentado en DS §B.

4. **Timeline canon** · `.timeline-track.tall` + `.timeline-seg.{coral/blush/mint/gold}` deben coincidir entre ambos archivos.

5. **CSS huérfano** · clases definidas pero sin uso · candidatas a cleanup (no urgente).

## Reporte canónico

Termina con un resumen ejecutivo:

```
✓ DS ↔ prototype en sincronía · N primitives canon · 0 huérfanos
⚠ N primitives en prototype sin DS · revisar
⚠ N primitives en DS sin uso · candidatos a cleanup
```

Si detectas drift significativo · sugiere PR con `chore(ds): sync ...`
o pide al user crear ADR si el cambio justifica nuevo canon.

## Out of scope

- NO modificar archivos · solo reportar
- NO consideres clases internas inline `style="..."` · solo primitives
  globales (`.foo {}`)
- NO consideres CSS de specs DS (las que solo viven en el demo del DS · `.spec-row`, `.section-num`, etc.)
