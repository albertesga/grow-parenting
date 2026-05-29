# Rule · Verification

Verificación obligatoria pre-commit · NUNCA commit sin pasar por aquí.
HTTP 200 + JS check + spawn auditor si aplica + visual diff si aplica.

## Por qué

- **Single-developer repo** · sin CI · sin code review humano · la
  verificación local es la única defensa
- **Cambios atómicos** · cada commit debe dejar el repo en estado
  funcional · sin regressions
- **Sub-agents son cheap** · spawn auditor de 30s es barato comparado
  con un bug visual en producción
- **Auditor con ojo fresco** · ve el diff sin context del plan · cazas
  drift que el agente principal no nota

## Reglas

### 1 · HTTP 200 en los 3 entry points (siempre)

```bash
curl -s -o /dev/null -w "landing:    %{http_code}\n" "http://localhost:5050/homepage/index.html"
curl -s -o /dev/null -w "prototype:  %{http_code}\n" "http://localhost:5050/prototype.html"
curl -s -o /dev/null -w "DS:         %{http_code}\n" "http://localhost:5050/design/Mimo%20Design%20System%20v0.2.html"
```

Si alguno ≠ 200 · NO commit. Diagnose:
- Server caído · `python3 -m http.server 5050` desde raíz
- Archivo movido / renombrado · verifica path
- Permisos · `chmod 644`

### 2 · JS válido (`node --check`)

```bash
cd "/Users/titoespanolgamon/Documents/Vibe Coding/Grow"
python3 -c "import re; html=open('prototype.html',encoding='utf-8').read(); s=re.findall(r'<script[^>]*>(.*?)</script>',html,re.DOTALL); open('/tmp/grow-extracted.js','w').write('\n'.join(s))"
node --check /tmp/grow-extracted.js
```

Si syntax error · localiza línea con el error · fix · re-extract · re-check.

Para `homepage/main.js` directamente:

```bash
node --check homepage/main.js
```

### 3 · Spawn `ds-auditor` si tocaste primitive canónico

Triggers:
- Modificaste CSS de `.book-hero`, `.chip`, `.phone-nav`, `.book-card`,
  `.tracker-pill`, `.timeline-track`, etc.
- Añadiste primitive nuevo
- Refactor cross-cutting visual
- Cambio de tokens (`:root` variables)

```
Spawn: ds-auditor (definición en .claude/agents/ds-auditor.md)
```

El auditor lee solo el diff (`git diff HEAD~1` o staged) y reporta drift
contra DS + ADRs.

### 4 · Spawn `copy-auditor` si tocaste copy user-facing

Triggers:
- Texto nuevo en `<p>`, `<h*>`, `<span>`
- Sheet copy (`data-sheet-title`, `data-sheet-copy`)
- Educational callout, post, tip
- Aria-label semántico (no decorativo)
- Cualquier string en JS que se renderiza en UI

```
Spawn: copy-auditor (definición en .claude/agents/copy-auditor.md)
```

Si tocas BOTH visual y copy · spawn ambos **en paralelo** · reportes
independientes con ojo fresco.

### 5 · Visual diff manual si el cambio es perceptual

Para cambios visuales fuertes (tipografía, color, spacing) · captura
screenshot before/after:

1. Antes del cambio · `Cmd+Shift+4` sobre la sección afectada · guarda
2. Aplica cambio
3. Hard refresh (`Cmd+Shift+R`)
4. Mismo screenshot
5. Visual diff manual · ¿es el cambio que esperabas?

Para iteraciones rápidas · usa `mcp__Claude_Preview__preview_screenshot`
si está disponible.

### 6 · Skill `/verify-proto` cubre 1+2

El skill `.claude/skills/verify-proto/SKILL.md` automatiza HTTP + JS check.
Úsalo SIEMPRE antes de commit:

```
/verify-proto
```

Output esperado:
```
LAND  200
PROTO 200
DS    200
JS_OK
```

### 7 · Skill `/sync-ds` para chequear drift estructural

Si tocaste CSS de primitive · corre `/sync-ds` para detectar si el DS y
el prototype divergieron:

```
/sync-ds
```

Chequeo automatizado adicional (bloqueante si falla):

```bash
node "/Users/titoespanolgamon/Documents/Vibe Coding/Grow/scripts/check-ds-drift.mjs"
```

### 8 · Si auditor reporta 🔴 bloqueante

NO commit. Fix · re-verify · re-spawn auditor si necesario.

Si auditor reporta 🟡 (revisar) · valora contexto · si es OK, deja nota
en el commit message ("audited via ds-auditor · drift menor aceptado por X").

### 9 · Cero commits silenciosos

Cada commit debe tener:
- Mensaje claro `feat/fix/chore/refactor(scope): qué cambió`
- Co-Author footer `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`
- Si auditor corrió · resultado mencionado o adjuntado al log

### 10 · Pricing homepage y waitlist alineados

Si tocas pricing en `homepage/index.html` o en `homepage/waitlist.html`:

- Valida que ambos lados mantienen el mismo canon de planes y precios
  (Gratis · Founding · Mimo Plus).
- Revisa que `precio_sensacion` y `tier` en waitlist no contradicen el pricing
  público de homepage.

Chequeo rápido (bloqueante si falla):

```bash
rg "Founding member|Mimo Plus|€9,99|€69,99|100 plazas|14 días" homepage/index.html homepage/waitlist.html
```

## Checklist pre-commit (resumen)

```
[ ] /verify-proto · HTTP 200 + JS OK
[ ] /sync-ds · si tocaste CSS primitive
[ ] Spawn ds-auditor · si cambio visual mayor
[ ] Spawn copy-auditor · si copy user-facing
[ ] Pricing homepage/waitlist alineado · si tocaste planes/precios
[ ] Visual diff manual · si cambio perceptual
[ ] Auditor verdicts revisados · cero 🔴 sin resolver
[ ] Commit message claro + Co-Author footer
[ ] Push tras commit (single-developer)
```

## Cita ADR

- ADR-0011 · trauma-informed copy (copy-auditor enforza ADR-0011)
- ADRs primitives (0001, 0003, 0013) · ds-auditor enforza estos
- (No ADR formal de verification · canon definido aquí)

## Workflow

1. Termino de implementar
2. `/verify-proto` · pasa? sí → continúo · no → fix
3. ¿Tocaste primitive? · `/sync-ds` + spawn `ds-auditor`
4. ¿Tocaste copy? · spawn `copy-auditor`
5. ¿Cambio perceptual? · screenshot before/after
6. Revisa verdicts · cero 🔴
7. `git add` + `git commit -m "..."` con Co-Author
8. `git push`
