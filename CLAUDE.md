# Grow · Claude instructions

Pointer file. Una línea por fracaso conocido. Detalle en pointers.

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
| Desarrollo | lavender | Diario | blush |
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

- Verificar antes de commit: `/verify-proto` (HTTP 200 + JS OK)
- Commits atómicos · `feat(libro): ...` / `fix(libro): ...` / `chore(...): ...` + Co-Author Claude
- Push después de cada commit · single-developer repo
- Sin docs nuevas (`*.md`) salvo que el user lo pida
- Trauma-informed copy · no gamification, no diminutivos forzados, no rojo médico (usa coral-base)
- `escapeHtml()` siempre que metas variables en innerHTML

## Harness

- **Skills** · `.claude/skills/` · `/verify-proto` · `/new-book` · `/sync-ds`
- **Subagents** · `.claude/agents/` · `ds-auditor` (review independiente DS)
- **ADRs** · `docs/decisions/` · 4 seed: book-hero · navbar · chips · perfil
