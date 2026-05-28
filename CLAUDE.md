# Grow · Claude instructions

**GENERATED POINTER.** Fuente canónica: `.agent/agents.md`. Si actualizas
reglas profundas · edita `.agent/agents.md` y propaga aquí los puntos
críticos.

## Read-order

1. `AGENTS.md` raíz · qué es Grow (1 min)
2. `.agent/agents.md` · brain · loop + guardrails (3 min)
3. `.agent/rules/{topic}.md` · 9 reglas duras por dominio (1 min cada)
4. `CLAUDE.md` (este archivo) · alias condensado · lectura rápida
5. `docs/HANDBOOK.md` · onboarding humano + glosario
6. `docs/decisions/*.md` · 18 ADRs vigentes
7. Código real · `prototype.html`, `homepage/`, `design/`

## Loop

`explore → plan → implement → verify → memoria` · skills en `.agent/skills/`.

## Stack

- `prototype.html` · single-file HTML (~20k líneas) con todos los libros + JS inline.
- `design/Grow Design System v0.2.html` · DS canónico.
- Server local: `python3 -m http.server 5050` · http://localhost:5050/.

## Regla #1 · DS canon siempre

Para cualquier cambio visual/UI · **lee el DS antes de inventar nada**. Casi todo está documentado. Reusar primitives existentes en lugar de crear `.{book}-chip` propio.

- **Antes de tocar un primitive establecido** · lee la ADR relevante en `docs/decisions/`.
- **Al introducir canon nuevo** · crea ADR nueva (copia `docs/decisions/0000-template.md`).
- **Tras cambios visuales mayores** · spawn `ds-auditor` para review independiente.

## Tono libro → color canon

| Libro | Tono | Libro | Tono |
|---|---|---|---|
| Hitos | mint | Lactancia | blush |
| Vacunas | gold | Sueño | mint nocturno |
| Desarrollo | violet | Diario | blush |
| Embarazo | coral | Salud | paper-deep |
| Alimentación | coral | Cólicos | coral |
| Perfil | mint | | |

María (embarazo) usa `avatar-coral`. Resto usa `avatar-mint`.

## Anti-patrones detectados

- ❌ Crear `.{book}-chip` propio cuando `.chip` ya sirve (ADR-0003)
- ❌ Override `min-height` en `.{book}-hero` rompiendo canon 120px (ADR-0001)
- ❌ Active state con fill negro en lugar de canon "vacío" (ADR-0003)
- ❌ `transform: translateX(-50%)` con child FAB transform (commit `2a39901`)
- ❌ Auto column widths en navbar con FAB cell (commit `fd05fde`)
- ❌ Text placeholders `[name]` en cards (commit `8fd8fa7`)
- ❌ Time text + dot lanes solapadas en timeline (commit `e059da0`)

## Workflow

- Verificar antes de commit: `/verify-proto` (landing/prototype/DS 200 + JS OK)
- Commits atómicos · `feat(libro): ...` / `fix(libro): ...` / `chore(...): ...` + Co-Author Claude
- Push después de cada commit · single-developer repo
- Sin docs nuevas (`*.md`) salvo que el user lo pida
- Trauma-informed copy · no gamification, no diminutivos forzados, no rojo médico (usa coral-base)
- `escapeHtml()` siempre que metas variables en innerHTML

## Harness

- **Skills** · `.claude/skills/` · `/verify-proto` · `/new-book` · `/sync-ds` · `/audit-trauma-copy`
- **Subagents** · `.claude/agents/` · `ds-auditor` (visual/DS) · `copy-auditor` (tono/citas)
- **ADRs** · `docs/decisions/` · 18 decisiones canon · ver `README.md` index
  (6 primitives DS · 6 arquitectura módulos · 2 tono+routing · 1 distribución · 1 centralización JS)
- **Patterns** · `.claude/PATTERNS.md` · patrones implícitos del código (data-goto · tonal · log filter · localStorage · sheet stubs · sub-libros · cross-ref)
