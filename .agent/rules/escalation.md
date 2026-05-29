# Rule · Escalation

Cuándo el agente NO decide solo · cuándo escala al user. Lista corta y
explícita.

## Por qué

- **Confianza del user** · si decidimos sobre pricing/business/legal sin
  preguntar · podemos romper estrategia o exponer riesgo
- **Canon estable** · si toleramos cambios silenciosos sobre ADR vigente ·
  el canon deja de ser fiable
- **Reversibility** · algunos cambios son difíciles de revertir (claim
  clínico sin fuente, copy legal, decisión de pricing)
- **Visibility** · el user debe saber cuándo el agente está fuera de su
  comfort zone

## Reglas (cuándo escalar)

### 1 · Cambio que rompe ADR vigente

Si la tarea requiere violar un canon documentado en ADR (`docs/decisions/`):

- **NO ejecutes** el cambio silenciosamente
- Notifica al user · "Esto rompe ADR-{NNNN} · {qué dice la ADR}"
- Sugiere: "¿Creo ADR nueva que derogue / extienda la anterior, o
  reconsideramos el approach?"
- Espera decisión antes de continuar

Ejemplo:
- ADR-0001 dice `.book-hero` tiene `min-height: 120px`
- Te piden hero más alto · NO hagas override silencioso · escala

### 2 · Copy clínico sin fuente / año

Si la tarea introduce o modifica copy clínico (educational, callouts
médicos, urgencias) sin fuente bibliográfica explícita:

- NO inventes la fuente · NO uses "los expertos dicen" / "estudios
  demuestran"
- Pide al user: "Necesito fuente con año para este claim (NICE / AAP /
  Wessel / etc.). ¿Cuál usamos?"
- Si no hay fuente · el copy no puede ser "post canon" · se convierte
  en nota informal o se omite

### 3 · Primitive nuevo no documentado en DS

Si necesitas un primitive visual que el DS no documenta:

- Pide al user: "Voy a necesitar un `.{primitive}` nuevo. ¿Valido look
  con un mockup antes de canonizar?"
- Si user OK · crea ADR primero · luego implementa en DS · luego propaga
- NO añadas a prototype/landing como "one-off" · genera drift

### 4 · Decisión business (pricing, paywall, partner)

- NO decides el precio ni el modelo (€1,99 vs €9,99 vs €0)
- NO decides qué features son gated vs free
- NO decides qué partners listar (comité, certificaciones)
- Si la tarea toca esto · escala 100%

Ejemplo:
- User pide "haz el pricing más atractivo" sin specs · escala · pide
  decisiones concretas (cuánto cobrar, qué incluir, qué excluir)

### 5 · Decisión con implicación legal

- Cookies / privacidad / GDPR · al user (puede requerir abogado)
- Claim médico ("trata", "cura", "diagnostica") · evita siempre · escala
  si el user insiste
- Términos & condiciones · al user
- Datos personales (formularios que recogen datos) · al user

### 6 · Cambio que afecta a ≥3 archivos críticos

Si el cambio toca 3+ de los entry points principales (`prototype.html`,
`homepage/*`, `design/Mimo Design System v0.2.html`) simultáneamente:

- Pausa y propone un plan
- Spawn `Plan` agent si la complejidad lo justifica
- Confirma scope antes de implementar
- Asegura que cada archivo queda en estado coherente al final

### 7 · Migración masiva (rename, bulk replace cross-file)

Si vas a hacer un find/replace que afecta >50 occurrences:

- Confirma con el user el alcance ("voy a renombrar X a Y en 4 archivos ·
  ~80 occurrences")
- Verifica que el string a reemplazar es único (no contamina otros
  contextos)
- Considera commit separado para la migración (rollback fácil)

### 8 · Decisión de architecture / metodología

- Si el cambio modifica `.agent/`, `.claude/` (settings, hooks),
  `docs/HANDBOOK.md` · escala primero
- Si propones nuevo sub-agent · escala
- Si propones nuevo slash command · escala
- Si propones cambiar workflow (commits, push, branches) · escala

## Cómo escalar (formato)

Cuando escalas · sé concreto y propone opciones:

```markdown
**Escalación · {tipo}**

**Contexto** · {qué tarea estoy haciendo}
**Problema** · {por qué necesito tu decisión}
**Opciones**:
  A) {opción 1} · trade-off · {pros/contras}
  B) {opción 2} · trade-off · {pros/contras}
  C) {opción 3} · trade-off · {pros/contras}
**Mi recomendación** · {A/B/C} porque {razón corta}

¿Cómo procedo?
```

Usa `AskUserQuestion` cuando hay 2-4 opciones discretas. Texto libre si la
decisión es más abierta.

## Cuándo NO escalar (resolver tú)

- Bug fixes obvios (typo, falta de `;`, propiedad CSS mal escrita)
- Refactor interno sin cambio visual ni de copy
- Cambio de comentarios / documentation menor
- Verificación post-implementación
- Bulk replace seguro con scope conocido (<50 occurrences, string único)

## Ejemplos

### ✓ Escalación correcta

> "Necesitas cambiar el `min-height` del `.book-hero` a 200px. Esto
> contradice ADR-0001 que fija 120px. ¿Creamos ADR-0017 que actualice
> el canon, o reconsideramos el approach (ej. usar padding interno en
> lugar de min-height)?"

### ✗ Decisión sin escalar (anti-canon)

> "Cambié `min-height: 120px` a `200px` en el hero. Listo."
> ← rompe ADR · debió escalarse

### ✓ Escalación correcta

> "El nuevo callout educativo sobre lactancia menciona 'los estudios
> demuestran que…'. Necesito una fuente concreta (NICE? AEPap?). ¿Cuál
> uso, o lo replanteamos sin claim científico?"

## Cita ADR

- (Sin ADR formal de escalation · este archivo es el canon)
- ADR-0011 · trauma-informed copy (regla 4 · cita clínica obligatoria con
  fuente + año · trigger natural de escalation)

## Workflow

1. Voy a ejecutar tarea
2. Reviso esta rule · ¿toca algún trigger de escalation?
3. Si sí · formula la pregunta + opciones + recomendación
4. Espera respuesta del user
5. Solo entonces · ejecuta
