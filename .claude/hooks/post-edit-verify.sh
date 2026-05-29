#!/bin/bash
# Auto-verify después de Edit/Write a prototype.html o DS.
# Silent en happy path · reporta solo si rompe HTTP o JS syntax.
# Triggered por settings.json PostToolUse hook.

# Lee input JSON del hook (matcher + tool input)
INPUT=$(cat 2>/dev/null)

# Extrae file_path del JSON (sin jq dependency · regex simple)
FILE_PATH=$(echo "$INPUT" | grep -oE '"file_path"[^"]*"[^"]*"' | grep -oE '"[^"]*"$' | tr -d '"')

# Solo continúa si el edit toca prototype.html o el DS
case "$FILE_PATH" in
  *prototype.html|*"Mimo Design System v0.2.html")
    ;;
  *)
    exit 0
    ;;
esac

# Salta al cwd del repo (script vive en .claude/hooks/)
REPO_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_DIR" || exit 0

# HTTP check · ambos archivos
PROTO_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5050/prototype.html 2>/dev/null)
DS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5050/design/Mimo%20Design%20System%20v0.2.html" 2>/dev/null)

# Server caído · skip silent (no es error del edit · es ambiental)
if [ -z "$PROTO_CODE" ] || [ "$PROTO_CODE" = "000" ]; then
  exit 0
fi

# HTTP rompió tras el edit
if [ "$PROTO_CODE" != "200" ]; then
  echo "{\"hookSpecificOutput\":{\"additionalContext\":\"⚠️ prototype.html HTTP $PROTO_CODE tras el edit · ejecuta /verify-proto para detalles\"}}"
  exit 0
fi
if [ "$DS_CODE" != "200" ] && [ "$DS_CODE" != "" ]; then
  echo "{\"hookSpecificOutput\":{\"additionalContext\":\"⚠️ DS HTTP $DS_CODE tras el edit\"}}"
fi

# JS syntax check del prototype (solo si fue prototype.html lo editado)
case "$FILE_PATH" in
  *prototype.html)
    python3 -c "
import re
try:
    with open('prototype.html', encoding='utf-8') as f:
        html = f.read()
    scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
    with open('/tmp/grow-extracted.js', 'w') as f:
        f.write('\n'.join(scripts))
except Exception as e:
    pass
" 2>/dev/null

    JS_ERR=$(node --check /tmp/grow-extracted.js 2>&1)
    if [ $? -ne 0 ]; then
      # Trunca a 200 chars para no spamear context
      JS_SHORT=$(echo "$JS_ERR" | head -c 200 | tr '\n' ' ')
      echo "{\"hookSpecificOutput\":{\"additionalContext\":\"⚠️ JS syntax error en prototype.html: ${JS_SHORT}... · ejecuta /verify-proto para detalles\"}}"
    fi
    ;;
esac

exit 0
