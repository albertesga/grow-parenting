---
description: Pre-commit verification de Mimo. Verifica que landing, prototype.html y design/Mimo Design System v0.2.html cargan (HTTP 200), y que el JS extraído del prototype es sintácticamente válido (node --check). Úsalo SIEMPRE antes de commit. Trigger keywords: verificar, verify, check, pre-commit, validar, validate, HTTP, sintaxis, JS, syntax, smoke test, comprobar.
allowed-tools: Bash(curl *) Bash(node *) Bash(python3 *)
---

## Verificación HTTP

!`curl -s -o /dev/null -w "LAND  %{http_code}\n" http://localhost:5050/homepage/index.html`
!`curl -s -o /dev/null -w "PROTO %{http_code}\n" http://localhost:5050/prototype.html`
!`curl -s -o /dev/null -w "DS    %{http_code}\n" "http://localhost:5050/design/Mimo%20Design%20System%20v0.2.html"`

## Verificación JS

!`cd "/Users/titoespanolgamon/Documents/Vibe Coding/Grow" && python3 -c "import re; html=open('prototype.html',encoding='utf-8').read(); s=re.findall(r'<script[^>]*>(.*?)</script>',html,re.DOTALL); open('/tmp/mimo-extracted.js','w').write('\n'.join(s))" && node --check /tmp/mimo-extracted.js && echo "JS_OK"`

## Instrucciones

1. Si alguno de los HTTP no devuelve 200:
   - Reportar qué archivo falla.
   - Sugerir `python3 -m http.server 5050` si el server está caído.

2. Si JS no pasa el check:
   - Identificar la línea exacta del error.
   - Sugerir fix concreto.
   - NO commitear hasta resolverlo.

3. Si ambos pasan:
   - Reportar `✓ HTTP 200 · JS OK · listo para commit`.
   - Recordar al user de hacer commit atómico + push.

Sin lógica condicional · sin lecturas innecesarias del repo · este skill
es solo verificación binaria.
