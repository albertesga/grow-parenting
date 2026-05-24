# Grow · AGENTS.md

Entry-point canónico para cualquier agente (Claude Code, Codex, sub-agents)
que toca el proyecto. **Lee este archivo primero. Siempre.**

## Qué es Grow

App para familias hispanohablantes · del embarazo a los 3 años del peque ·
trauma-informed, sin gamification, sin urgencia. Single-developer repo.

- **App** · simulada en `prototype.html` (single-file HTML/CSS/JS, ~20k líneas)
- **Landing** · marketing site en `landing/` (3 archivos: `index.html` +
  `styles.css` + `main.js`)
- **Design System** · `design/Grow Design System v0.2.html` · single source
  of truth para tokens, primitives, copy canon
- **Stack** · 100% vanilla HTML/CSS/JS · sin build, sin backend, sin auth ·
  server local con `python3 -m http.server 5050`

## Read-order

Lee en este orden cuando arrancas. **Para una tarea concreta** · profundiza
solo lo necesario (no leas todo cada vez).

1. **`AGENTS.md`** (este archivo) · 1 min · qué es Grow y dónde mirar
2. **`.agent/agents.md`** · 3 min · brain del proyecto · loop + guardrails
3. **`.agent/rules/{topic}.md`** · 1 min cada · reglas duras por dominio
4. **`CLAUDE.md`** · 1 min · alias condensado para Claude Code (rápido)
5. **`docs/HANDBOOK.md`** · 5 min · onboarding humano + glosario
6. **`docs/decisions/*.md`** · 16 ADRs vigentes · canon histórico evaluable
7. **Código real** · `prototype.html`, `landing/`, `design/` · cuando ya
   sabes qué tocar

## Loop · `explore → plan → implement → verify → memoria`

Cada paso tiene una skill detallada en `.agent/skills/{step}.md`.

- **explore** · lee el DS antes de inventar nada. Grep primitives. Cita ADRs.
- **plan** · ¿qué primitive reuso? ¿necesito ADR nueva? ¿qué archivos toco?
- **implement** · Edit > Write · commits atómicos · push tras cada commit
- **verify** · HTTP 200 + `node --check` + spawn `ds-auditor`/`copy-auditor`
- **memoria** · ADR nueva si canon · `CLAUDE.md`/`PATTERNS.md` si anti-pattern

## Guardrails críticos (resumen)

Los 5 que rompen cualquier merge:

1. **DS canon siempre** · reusa primitives (`.book-hero`, `.chip`, `.phone-nav`,
   `.book-card`). NO crees `.{libro}-chip` propio. Detalle: `.agent/rules/ds-canon.md`
2. **Copy trauma-informed** · cero gamification, cero rojo médico, cero
   militancia, citas clínicas con fuente + año. Detalle:
   `.agent/rules/copy-canon.md` + ADR-0011
3. **Typography canon** · Galiner display · Inter body · Grift SOLO en
   `.plan .price .amt`. Detalle: `.agent/rules/typography.md`
4. **Palette tonal** · 5 familias (coral, blush, mint, gold, violet) × 3
   tiers · siempre `var(--{tono}-{tier})`, nunca hex literal. Detalle:
   `.agent/rules/palette-tonal.md`
5. **Verificación pre-commit** · HTTP 200 + JS check + auditor si tocaste
   primitive canon o copy user-facing. Detalle: `.agent/rules/verification.md`

## Glosario express

| Término | Qué significa |
|---|---|
| **Libro** | Módulo del app (Hitos, Vacunas, Embarazo, etc.). Cada uno tiene tono canon. |
| **Primitive** | Componente reusable del DS (`.book-hero`, `.chip`, `.phone-nav`). |
| **Tono** | Familia de color tonal (coral, blush, mint, gold, violet, paper-deep). |
| **Kicker** | Eyebrow corto sobre title del hero · mayúsculas + ink-soft. |
| **Eyebrow** | Microcopy serif (Galiner Light 300) sobre headlines · context label. |
| **FAB** | Floating Action Button central del navbar · acción primaria del libro. |
| **ADR** | Architecture Decision Record · `docs/decisions/{NNNN}-{slug}.md`. |
| **Trauma-informed** | Tono que respeta carga emocional · no urgencia, no juicio. |

## Sub-agents disponibles

| Agent | Cuándo | Definición |
|---|---|---|
| `ds-auditor` | Tras cambio visual mayor (primitive, libro nuevo, refactor UI) | `.claude/agents/ds-auditor.md` |
| `copy-auditor` | Tras cambio que toque copy user-facing | `.claude/agents/copy-auditor.md` |
| `Explore` (built-in) | Búsqueda de código / símbolo / patrón | — |
| `Plan` (built-in) | Diseñar approach para tarea no trivial | — |
| `code-reviewer` (built-in) | Review independiente de cambio de alto riesgo | — |

## Skills (slash commands locales)

| Skill | Qué hace | Cuándo |
|---|---|---|
| `/verify-proto` | HTTP 200 + JS check sobre prototype y DS | Pre-commit, siempre |
| `/sync-ds` | Audita drift DS ↔ prototype | Tras cambio CSS primitive |
| `/audit-trauma-copy` | Grep canon ADR-0011 en prototype | Tras cambio copy |
| `/new-book` | Scaffold canónico libro nuevo (hero+nav+state+filter) | Añadir libro |

## Cuándo escalar al humano

- **Cambio que rompe ADR vigente** · pide al user crear ADR nueva primero
- **Copy clínico sin fuente** · pide referencia bibliográfica (NICE, AAP, etc.)
- **Primitive nuevo no en DS** · pide validación del look antes de canonizar
- **Decisión business** (pricing, paywall, partner) · NO decide el agente
- **Decisión legal** (cookies, privacidad, claim médico) · al humano

Detalle: `.agent/rules/escalation.md`.

## Anti-patrones rápidos

- ❌ Crear `.{libro}-chip` propio cuando `.chip` ya sirve (ADR-0003)
- ❌ Override `min-height` o `padding` del `.book-hero` (ADR-0001)
- ❌ Active state con fill negro en lugar de canon "vacío" (ADR-0003)
- ❌ `color: red` para urgencias · usa `var(--coral-strong)` (ADR-0011)
- ❌ Grift en body · solo en `.amt` (canon May 2026)
- ❌ Animar `width/height/top/left` · usa `transform` + `opacity`
- ❌ `outline: none` sin reemplazo de focus ring visible
- ❌ Crear `*.md` docs nuevos salvo que el user lo pida

## Convenciones del repo

- **Idioma** · español en código, copy, docs · inglés solo en nombres técnicos
- **Commits** · atómicos · `feat/fix/chore/refactor(scope): mensaje corto` +
  `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`
- **Push** · después de cada commit (single-developer)
- **Server local** · `python3 -m http.server 5050` desde la raíz del repo
- **URLs** · `http://localhost:5050/landing/` · `/prototype.html` ·
  `/design/Grow%20Design%20System%20v0.2.html`
