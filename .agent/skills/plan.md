# Skill · plan

Diseña el cambio antes de implementar. Output: plan ejecutable bajo 200
palabras + checklist de auditors a spawn post-implementación.

## Cuándo usar

- Tras `explore.md` · cuando ya tienes el mapa de primitives y ADRs
- Antes de cualquier cambio que afecte > 1 archivo
- Cuando hay decisión arquitectónica (nuevo primitive, ADR nueva)
- Antes de bulk replace > 20 occurrences

NO uses para tareas triviales (typo, bug 1-línea, edit pequeño con scope
claro).

## Inputs

- Output de `explore.md` · primitives identificados, ADRs aplicables, gaps
- Comprensión clara del intent del user

## Checklist obligatorio

Antes de implementar · contesta cada una de estas preguntas:

### 1 · ¿Qué primitive(s) reuso?

- Lista exacta · con path/línea en DS si aplica
- Si no reuso ninguno · explica por qué (¿gap real? ¿nuevo primitive?)

### 2 · ¿Necesito crear ADR nueva?

Triggers para ADR:
- Introduces canon nuevo (primitive, pattern, decisión arquitectónica)
- Derogas ADR existente
- Cambias mapping fijo (libro → tono, libro → fuente, etc.)
- Decisión técnica con trade-offs documentables

Si sí · ADR primero · luego implementación.

### 3 · ¿Qué archivos toco?

Listado preciso:
- `landing/styles.css` · líneas {X-Y} · cambio · {descripción}
- `prototype.html` · líneas {X-Y} · cambio · {descripción}
- `design/Grow Design System v0.2.html` · sección {X} · cambio · {descripción}

Si tocas 3+ archivos críticos · valida con `escalation.md` rule 6.

### 4 · ¿Bulk replace seguro?

Si haces find/replace:
- ¿El string a reemplazar es único en el archivo? (grep -c)
- ¿Hay false positives potenciales? (ej. "Grift" como substring de
  "Griftson")
- ¿Cuántas occurrences? (>50 · valora commit separado)

### 5 · ¿Tocaré copy user-facing?

Si sí · post-implementación · spawn `copy-auditor`.
Si copy clínico · valida fuente + año.

### 6 · ¿Tocaré primitive visual?

Si sí · post-implementación · spawn `ds-auditor`.

### 7 · ¿Es cambio perceptual?

Si sí · screenshot before/after en el plan.

## Output canónico

```markdown
## Plan · {tarea}

### Approach
{2-3 frases describiendo el qué y el por qué}

### Files
- `path/to/file` · lines {X-Y} · {qué cambio}
- ...

### Primitives reused
- `.book-hero` (DS §A · ADR-0001) · sin cambio
- `.chip.coral` (DS §E · ADR-0003) · sin cambio

### New primitives / ADRs
- {Lista si aplica · o "ninguno"}

### Post-implementation
- [ ] `/verify-proto` (HTTP + JS)
- [ ] spawn `ds-auditor` (cambio CSS primitive)
- [ ] spawn `copy-auditor` (copy nuevo)
- [ ] visual diff (cambio perceptual)
- [ ] commit `{type}({scope}): {message}` + Co-Author
- [ ] push

### Risks / escalation
- {Lista de triggers de escalation que se contemplaron · o "ninguno"}
```

## Reglas

1. **Bajo 200 palabras total** · si más · estás sobre-planeando
2. **No proponer alternativas** · una sola recomendación + razón corta
3. **Citar paths concretos** · no "el archivo de pricing", sino
   `landing/styles.css:1380-1395`
4. **Incluir verification** · plan sin checklist post-implementación es plan
   incompleto

## Anti-patterns

- ❌ Plan con todas las alternativas exploradas · ya elegiste, propón una
- ❌ Plan sin checklist post-implementación
- ❌ Plan que omite ADR cuando hay canon nuevo
- ❌ Plan ambiguo ("cambiar pricing") · sé preciso

## Output esperado

Plan corto, accionable, con archivos + líneas + checklist. Pasa a `implement.md`.

## Links

- `.agent/skills/explore.md` (skill previa)
- `.agent/rules/ds-canon.md` (¿reusar primitive? regla #1)
- `.agent/rules/escalation.md` (triggers · ¿escalo antes de planear?)
- `.agent/rules/verification.md` (checklist post-implementación)
- `docs/decisions/0000-template.md` (template ADR si necesitas crear)
