# Skill · implement

Ejecuta el plan. Patrones de edits, bulk replace, commits, push.

## Cuándo usar

- Tras `plan.md` · cuando ya tienes el plan ejecutable + checklist
- Para cambios directos sin plan formal (typo, bug 1-línea) · va directo a
  esta skill

## Patrones de edit

### 1 · Edit > Write

Siempre **Edit** sobre archivos existentes · preserva contexto y diffs
limpios. **Write** solo para crear archivos nuevos o rewrite completo
(raro).

```
✓ Edit · cambio quirúrgico, diff mínimo
✗ Write sobre archivo existente · borra contexto, diff masivo
```

### 2 · Bulk replace con cuidado

```
Edit con replace_all=true
```

Solo cuando:
- El string `old_string` es **único** en su contexto del archivo
- No hay falsos positivos potenciales
- Has verificado con `grep -c` el número de occurrences

Para replace cross-file (>1 archivo) · usa Python script via Bash:

```python
from pathlib import Path
for p in ["file1.css", "file2.html"]:
    s = Path(p).read_text()
    s = s.replace('old', 'new')
    Path(p).write_text(s)
```

### 3 · Verifica file state antes de Edit

Si el archivo es grande (>500 líneas) y no lo has leído recientemente ·
Read primero la sección que vas a editar · evita errores de "old_string
not found".

### 4 · Read targeted

NO leas archivos enteros (5k+ líneas) si solo necesitas una sección. Usa
`offset` + `limit` o grep first.

## Patterns por dominio

### CSS

- Tokens en `:root` · si el cambio es nuevo color/duración/easing · define
  token primero · luego úsalo
- Selectores · sigue specificity baja (clase única) salvo cuando necesites
  override
- Comments · sobre cada bloque · explica el por qué (no el qué)

### HTML

- Semantic-first · `<button>` > `<div onclick>`, `<nav>` > `<div class="nav">`
- Aria-labels en buttons icon-only (ver `.agent/rules/accessibility.md`)
- Atributos `data-*` para state lookup (`data-screen="hitos"`,
  `data-libro-tab="calendario"`)

### JS

- Vanilla · sin frameworks · ni jQuery
- `escapeHtml()` en innerHTML (helper canon en prototype y main.js)
- `addEventListener` con `{ passive: true }` cuando aplica (scroll,
  touchmove)
- No globals nuevos · usa cierres o módulos vivos en el archivo

## Commits atómicos

### Estructura

```
<type>(<scope>): <subject>

<body opcional · explicar el por qué, no el qué>

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

### Tipos

- `feat` · feature nueva
- `fix` · bug fix
- `chore` · housekeeping (deps, config, no user-facing)
- `refactor` · cambio interno sin user-facing
- `docs` · solo documentación
- `style` · formato (CSS, lint)

### Scope

- Nombre del libro (`libro-hitos`, `libro-vacunas`) si toca un libro
- `landing` si toca landing
- `ds` si toca design system
- `harness` si toca `.agent/`, `.claude/`, `docs/HANDBOOK.md`
- `typo` si tipografía
- `motion` si animations
- `a11y` si accesibilidad

### Ejemplos canon

```
feat(libro-hitos): añadir filtro por fase con chip tonal
fix(landing): pricing · alinear .amt baseline con .per
refactor(ds): chip primitive · extraer tonos a token
chore(harness): scaffold AGENTS.md + .agent/{rules,skills}
docs(adr): ADR-0017 · primitive tracker-pill canon
style(landing): typography · body Grift → Inter
```

## Push tras cada commit

Single-developer repo · no PRs · push tras cada commit atómico:

```bash
git push
```

Si push falla por rebase · `git pull --rebase` · re-test · re-push.

## Reglas

1. **NO crear `*.md` nuevos** salvo que el user lo pida explícito · regla
   del repo
2. **NO override `outline: none`** sin reemplazo de focus ring · regla a11y
3. **NO hex literal en JS** · usar `var(--token)` · regla palette
4. **NO `font-family` literal en CSS** salvo `@font-face` · usar tokens
5. **NO instalar deps** · stack es vanilla, sin package.json
6. **NO modificar `.git/`, `.replit`, `replit.nix`** salvo razón explícita
7. **NO ejecutar scripts arbitrarios** del DS HTML · es read-only para
   landing/prototype como consumers

## Anti-patterns

- ❌ Write sobre archivo existente para hacer 1 cambio
- ❌ Bulk replace sin verificar uniqueness del string
- ❌ Commit "WIP" sin mensaje claro
- ❌ Commit sin Co-Author footer
- ❌ Push sin commit (push de cambios staged sin commit · no aplica con git)
- ❌ Commit que incluye archivos sensibles (.env, credentials, .DS_Store)
- ❌ `git add -A` sin revisar qué se staged

## Output

Cambio aplicado, verificado, commiteado, pushed. Pasa a `verify.md` para
checklist completo + auditors.

## Links

- `.agent/skills/plan.md` (skill previa)
- `.agent/skills/verify.md` (skill siguiente)
- `.agent/rules/verification.md` (qué verificar pre-commit)
- `.agent/rules/accessibility.md` (escapeHtml, focus rings)
