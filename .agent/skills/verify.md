# Skill · verify

Verificación post-implementación · HTTP 200 + JS check + spawn auditor si
aplica + visual diff si aplica. Cero commit sin pasar por aquí.

## Cuándo usar

- Tras `implement.md` · siempre
- Antes de cualquier commit que toque código (no solo docs)

## Steps

### 1 · `/verify-proto` (HTTP + JS)

Skill canónica · ejecuta:
- `curl` sobre `homepage/index.html`, `prototype.html`, `design/Mimo DS v0.2.html`
- `node --check` sobre JS del prototype

Output esperado:
```
PROTO 200
DS    200
JS_OK
```

Si HTTP ≠ 200 · server caído · `python3 -m http.server 5050` desde raíz.
Si JS error · localiza línea · fix · re-verify.

### 2 · `/sync-ds` (si tocaste CSS primitive)

Skill canónica · audita drift DS ↔ prototype. Output:

```
✓ DS ↔ prototype en sincronía · N primitives canon · 0 huérfanos
```

Si hay drift · documenta · si es intencional, OK · si no, fix.

### 3 · Spawn `ds-auditor` (si cambio visual mayor)

Cuándo:
- Modificaste CSS de primitive canónico
- Añadiste primitive nuevo
- Cambio de tokens (`:root`)
- Refactor cross-cutting visual

Cómo:
```
Spawn: ds-auditor agent (.claude/agents/ds-auditor.md)
Prompt: "Audita el diff de los staged changes. Diff disponible vía
git diff HEAD~1. Reporta drift contra DS y ADRs."
```

El auditor lee solo el diff · sin contexto del plan · reporta verdict
✓ / ⚠ / ✗.

### 4 · Spawn `copy-auditor` (si copy user-facing)

Cuándo:
- Texto nuevo en `<p>`, `<h*>`, sheet copy, callouts
- Aria-label semántico

Cómo:
```
Spawn: copy-auditor agent (.claude/agents/copy-auditor.md)
Prompt: "Audita el copy del diff staged. Aplica canon ADR-0011."
```

### 5 · Spawn ambos en paralelo si aplica

Si el cambio toca tanto UI como copy · spawn `ds-auditor` y `copy-auditor`
**en paralelo** en un único mensaje con multiple tool calls.

### 6 · Visual diff manual (si cambio perceptual)

Para cambios visuales fuertes:
- Screenshot before (antes de aplicar)
- Apply change · hard refresh `Cmd+Shift+R`
- Screenshot after
- Compara · ¿es el cambio que esperabas?

Si Claude Preview MCP disponible · usar `mcp__Claude_Preview__preview_screenshot`.

### 7 · Revisa verdicts

| Verdict | Acción |
|---|---|
| ✓ Listo para merge | Procede a commit |
| ⚠ Drift menor | Valora · si OK, nota en commit message · si no, fix |
| ✗ Bloquea | Fix obligatorio · re-verify · re-spawn auditor |

NO commit si hay 🔴/✗ sin resolver.

### 8 · Commit + push

```bash
git status                # revisa qué se staged
git add <files>           # add explícito · evita .env, credentials
git commit -m "..."       # con Co-Author footer
git push                  # single-developer, push tras cada commit
```

## Checklist de verificación

```
[ ] /verify-proto · HTTP 200 + JS OK
[ ] /sync-ds (si CSS primitive)
[ ] spawn ds-auditor (si visual mayor)
[ ] spawn copy-auditor (si copy)
[ ] visual diff (si perceptual)
[ ] verdicts revisados · cero ✗
[ ] git diff revisado · sin archivos sensibles
[ ] commit con mensaje claro + Co-Author
[ ] push exitoso
```

## Reglas

1. **NUNCA commit con server caído** · si HTTP falla, fix primero
2. **NUNCA commit con JS broken** · `node --check` debe pasar
3. **NUNCA commit con auditor ✗** · resolver primero
4. **NUNCA push --force** sobre main · ni con razón
5. **NUNCA `git add -A`** · siempre add explícito

## Anti-patterns

- ❌ Saltarse `/verify-proto` "porque el cambio es pequeño"
- ❌ Ignorar verdict ✗ del auditor con "es false positive sin verificar"
- ❌ Commit con archivos sensibles (`.env`, `credentials.json`, `.DS_Store`)
- ❌ Commit con mensaje genérico ("update", "fix stuff")
- ❌ Commit sin Co-Author footer

## Output

Cambio verificado y commiteado. Pasa a `memoria.md` para actualizar canon
si aplica.

## Links

- `.agent/skills/implement.md` (skill previa)
- `.agent/skills/memoria.md` (skill siguiente)
- `.agent/rules/verification.md` (reglas duras de verificación)
- `.claude/skills/verify-proto/SKILL.md` (skill HTTP + JS)
- `.claude/skills/sync-ds/SKILL.md` (skill drift DS ↔ prototype)
- `.claude/agents/ds-auditor.md` (agent visual audit)
- `.claude/agents/copy-auditor.md` (agent copy audit)
