# Skill · explore

Antes de tocar nada · entiende qué primitives existen, qué dicen las ADRs
relevantes, y qué patrones implícitos hay en el código. Output: lista de
primitives reusables + gaps + ADRs aplicables.

## Cuándo usar

- Inicio de cualquier tarea no trivial
- Antes de planear refactor cross-cutting
- Antes de añadir primitive nuevo (para confirmar que no existe)
- Cuando el user pide algo ambiguo · explorar para clarificar

## Inputs

- Descripción de la tarea del user
- Conocimiento de read-order (AGENTS.md → .agent/agents.md → rules)

## Steps

### 1 · Identifica el dominio de la tarea

- ¿CSS / visual? · explora DS + ADRs primitives
- ¿Copy? · explora ADR-0011 + skill `audit-trauma-copy`
- ¿JS lógica? · explora `prototype.html` para patterns existentes
- ¿Cross-cutting (multiple áreas)? · spawn `Explore` agent para mapping

### 2 · Lee las rules relevantes (NO todas)

Para una tarea CSS típica · leer:
- `.agent/rules/ds-canon.md`
- `.agent/rules/typography.md` (si tipografía)
- `.agent/rules/palette-tonal.md` (si color)

NO leas `.agent/rules/*` enteros · solo los que aplican.

### 3 · Grep primitives existentes

```bash
# ¿Existe ya un primitive como el que necesito?
grep -n "\.{candidato}" "design/Mimo Design System v0.2.html" prototype.html homepage/styles.css

# ¿Qué ADRs hablan de este primitive / dominio?
grep -l "{keyword}" docs/decisions/*.md
```

### 4 · Lee ADRs aplicables (solo las que el grep retornó)

- 1-2 ADRs · OK leer enteras
- 3+ ADRs · lee solo "Decision" + "Consequences" de cada una

### 5 · Identifica patrones implícitos en el código

Si el cambio toca JS · grep handlers / state existentes:
```bash
grep -n "function set{Libro}Tab\|let {libro}Active" prototype.html
```

Y revisa `.claude/PATTERNS.md` por patrones documentados implicit.

### 6 · Documenta hallazgos (interno)

Output esperado (en tu cabeza o en un scratch buffer):

```
TASK · {descripción}
DOMAIN · CSS / copy / JS / cross-cutting
PRIMITIVES RELEVANTES:
  - .book-hero (DS §A · ADR-0001 · ya existe · reusar)
  - .chip (DS §E · ADR-0003 · ya existe · reusar tono coral)
  - .nuevo-primitive (NO existe · valorar ADR)
ADRS APLICABLES:
  - ADR-0001 (book-hero canon)
  - ADR-0003 (chip primitive)
  - ADR-0011 (copy trauma-informed) · si hay copy
GAPS · {primitives faltantes que requerirían ADR}
ESCALATION TRIGGERS · {si alguno de la rule escalation.md aplica}
```

## Anti-patterns

- ❌ Leer DS HTML completo (5k líneas) cuando solo necesitas 1 sección
- ❌ Leer todas las ADRs sin haber filtrado por grep
- ❌ Saltarse exploración y empezar a editar "porque ya sé lo que hago"
- ❌ Asumir que un primitive no existe sin grep · siempre verifica

## Output

Plan ejecutable para la siguiente skill (`plan.md`). Debe contestar:

1. ¿Qué primitive(s) voy a reusar?
2. ¿Necesito crear ADR nueva? (sí/no/talvez)
3. ¿Qué archivos voy a tocar?
4. ¿Hay ESCALATION trigger?

Si la respuesta a (4) es sí · NO procedas a plan · escala primero.

## Links

- `.agent/rules/ds-canon.md` (regla #1 · DS antes de inventar)
- `.agent/rules/escalation.md` (triggers de escalar)
- `.claude/PATTERNS.md` (patrones implícitos)
- `docs/decisions/` (ADRs · canon histórico)
