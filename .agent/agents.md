# Grow · .agent/agents.md (brain)

Brain del proyecto. Lee este archivo después de `AGENTS.md` para el detalle
completo del loop, guardrails, y cuándo aplicar cada rule.

## Stack

Grow es un proyecto **100% diseño** · sin backend, sin build, sin auth.

### 3 entry points

| File | Qué es | Tamaño |
|---|---|---|
| `prototype.html` | Single-file app prototype (HTML + CSS + JS inline) | ~20k líneas |
| `homepage/index.html` + `homepage/styles.css` + `homepage/main.js` | Marketing site | 3 archivos |
| `design/Grow Design System v0.2.html` | DS canónico · single source of truth | ~5k líneas |

### Assets compartidos

- `homepage/assets/fonts/` · Galiner (TBJ 3 weights) + Inter Variable (woff2) + Grift (18 TTFs)
- `design/assets/fonts/` · espejo · mismas familias
- `homepage/assets/img/`, `design/assets/img/` · fotos avatares, covers libros, ilustraciones

### Tooling

- **Server local** · `python3 -m http.server 5050` desde raíz repo
- **No package.json, no build, no bundler**
- **JS verification** · `node --check` sobre script extraído del prototype
- **Git** · branch `main`, single-developer · push tras cada commit atómico

## Read-order por escenario

### Cambio CSS sobre primitive existente

1. `.agent/rules/ds-canon.md` (¿estoy reusando primitive existente?)
2. `design/Grow Design System v0.2.html` · sección del primitive (grep)
3. `docs/decisions/*.md` · ADR del primitive si existe
4. CSS actual del primitive en `prototype.html` o `homepage/styles.css`
5. Edit

### Cambio de copy user-facing

1. `.agent/rules/copy-canon.md`
2. `docs/decisions/0011-trauma-informed-copy.md` (canon completo)
3. Edit
4. Spawn `copy-auditor` post-edit

### Nuevo libro en el app

1. `.claude/skills/new-book/SKILL.md` (scaffold canónico)
2. `docs/decisions/0001-book-hero-canon.md` + `0002-navbar-dedicado-por-libro.md`
3. `CLAUDE.md` · tabla libro → tono
4. Ejecutar skill · spawn `ds-auditor` post

### Nuevo primitive (no existe en DS)

1. `.agent/rules/escalation.md` · ¿debería escalar al user?
2. Si sí · pide validación del look + crea ADR primero
3. Solo entonces · implementa en DS + propaga a prototype/landing

### Refactor mayor (cross-cutting)

1. `.agent/skills/explore.md` · entender el alcance real
2. `.agent/skills/plan.md` · diseño y checklist primitives
3. Si afecta canon · ADR nueva antes de tocar código

## Loop

### explore (.agent/skills/explore.md)

Antes de tocar nada · entiende qué primitives existen y qué dicen las ADRs.
Usa grep / Read targeted, no leas el DS completo (5k líneas). Output: lista
de primitives reusables + gaps + ADRs relevantes.

### plan (.agent/skills/plan.md)

Diseña el cambio · checklist obligatorio:
- ¿Qué primitive del DS reuso?
- ¿Necesito crear ADR nueva?
- ¿Qué archivos toco? (landing / prototype / DS)
- ¿Bulk replace seguro? (string único)
- ¿Tocaré copy user-facing? (→ spawn copy-auditor después)
- ¿Tocaré primitive visual? (→ spawn ds-auditor después)

Output: plan ejecutable bajo 200 palabras antes de implementar.

### implement (.agent/skills/implement.md)

Patrones:
- **Edit > Write** · preserva contexto y diffs limpios
- **Bulk replace** · `replace_all: true` solo si el string es único en el archivo
- **Atomic commits** · 1 commit = 1 unidad lógica de cambio
- **Commit message** · `feat/fix/chore/refactor(scope): mensaje corto` +
  Co-Author footer
- **Push tras cada commit** · single-developer, no PRs
- **No crear `*.md`** · salvo que el user lo pida explícito
- **`escapeHtml()`** · siempre que interpoles variable en innerHTML

### verify (.agent/skills/verify.md)

Pre-commit obligatorio:
- HTTP 200 sobre los 3 entry points (skill `/verify-proto`)
- `node --check` sobre JS del prototype
- Spawn `ds-auditor` si tocaste primitive
- Spawn `copy-auditor` si tocaste copy user-facing
- Visual diff manual si el cambio es perceptual (screenshot before/after)

Si pasa · commit + push. Si falla · fix y retry. NO commit si el auditor
marca 🔴 bloqueante sin resolverlo.

### memoria (.agent/skills/memoria.md)

Tras implementar · actualiza la memoria del proyecto:

| Trigger | Archivo a actualizar |
|---|---|
| Introduces canon nuevo o derogas viejo | ADR nueva en `docs/decisions/{NNNN}-{slug}.md` |
| Descubres anti-pattern nuevo | `CLAUDE.md` (sección "Anti-patrones") |
| Descubres patrón implícito en código (no canon documentable) | `.claude/PATTERNS.md` |
| Cambia stack o workflow | `docs/HANDBOOK.md` |
| Añades primitive al DS | sección documentada + demo en DS HTML |

## Stack guardrails

### G1 · DS canon siempre primero

`design/Grow Design System v0.2.html` es la single source of truth. Antes
de crear cualquier primitive nuevo · grep en DS y prototype. Si existe ·
reusa. Si no · valora si justifica ADR. Detalle: `.agent/rules/ds-canon.md`.

### G2 · Copy trauma-informed

Cero gamification, cero rojo médico, cero militancia, citas clínicas
obligatorias con fuente + año. Si el copy es user-facing y nuevo · spawn
`copy-auditor` tras editar. Detalle: `.agent/rules/copy-canon.md` +
ADR-0011.

### G3 · Typography hierarchy (May 2026)

- **Galiner** serif · h1-h6, eyebrows, manifesto · pesos 300 / 400 / 700 ·
  sin italic
- **Inter Variable** · body, micro, labels, CTAs · pesos 100-900 ·
  normal + italic disponibles
- **Grift** · SOLO `.plan .price .amt` (acento geométrico en pricing)
- **Tokens** · `--font-serif`, `--font-text`, `--font-price`, `--font-mono`

Detalle: `.agent/rules/typography.md`.

### G4 · Palette tonal

5 familias × 3 tiers · siempre via CSS variables, nunca hex literal en JS.
Mapping libro → tono fijo (extender de `CLAUDE.md`). Rojo médico
prohibido · `coral-strong` para urgencias. Detalle:
`.agent/rules/palette-tonal.md`.

### G5 · Motion canon

Easings y duraciones canónicas via tokens. Animar solo `transform` +
`opacity`. Cero confetti, cero streak animations. Detalle:
`.agent/rules/motion-canon.md`.

### G6 · Accessibility

Touch targets ≥44×44px, focus rings visibles, `aria-label` en buttons
icon-only, `role` + `aria-current` en navs, contraste AA+, respeta
`prefers-reduced-motion`, `escapeHtml()` en innerHTML. Detalle:
`.agent/rules/accessibility.md`.

### G7 · File structure

Sabe qué va dónde · no metas lógica de landing en prototype, no metas
copy del prototype en landing. DS es read-only desde homepage/prototype
(ellos consumen, no modifican el DS). Detalle:
`.agent/rules/file-structure.md`.

### G8 · Verification

Verificación obligatoria pre-commit. Detalle:
`.agent/rules/verification.md`.

### G9 · Escalation

Cuándo NO decide el agente. Detalle: `.agent/rules/escalation.md`.

## Sub-agents

| Agent | Path | Cuándo spawn |
|---|---|---|
| `ds-auditor` | `.claude/agents/ds-auditor.md` | Tras cambio visual mayor (primitive, libro, refactor UI) |
| `copy-auditor` | `.claude/agents/copy-auditor.md` | Tras cambio que toque copy user-facing |
| `Explore` (built-in) | — | Buscar código / símbolo / patrón (read-only) |
| `Plan` (built-in) | — | Diseñar approach para tarea no trivial |
| `code-reviewer` (built-in) | — | Review independiente de cambio de alto riesgo |

Spawn auditors en **paralelo** si el cambio toca tanto UI como copy ·
reportes independientes con ojo fresco.

## Skills (slash commands)

| Skill | Path | Qué hace |
|---|---|---|
| `/verify-proto` | `.claude/skills/verify-proto/SKILL.md` | HTTP 200 + JS check pre-commit |
| `/sync-ds` | `.claude/skills/sync-ds/SKILL.md` | Audita drift DS ↔ prototype |
| `/audit-trauma-copy` | `.claude/skills/audit-trauma-copy/SKILL.md` | Grep canon ADR-0011 |
| `/new-book` | `.claude/skills/new-book/SKILL.md` | Scaffold libro nuevo |

## Cuándo escalar al humano

- Cambio que rompe ADR vigente · pide crear ADR nueva primero
- Copy clínico sin fuente · pide referencia (NICE, AAP, Wessel, etc.)
- Primitive nuevo no en DS · pide validación del look
- Decisión business (pricing, paywall, partner) · NO decide el agente
- Decisión legal (cookies, privacidad, médico) · al humano

Detalle: `.agent/rules/escalation.md`.
