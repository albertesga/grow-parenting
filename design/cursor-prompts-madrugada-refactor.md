# Cursor prompts · refactor Modo madrugada (sin chat, sin IA)

> Tres prompts pasteables a Cursor para completar el refactor del Modo madrugada. La parte de copy/Notion/MDs ya está hecha. Esto cubre el código y los renames de archivo.
>
> **Por qué este refactor**: Modo madrugada deja de ser un "Chat IA" y pasa a ser un **formulario clínico determinístico** (árbol de decisión auditado, sin LLM). Esto refleja la verdad del producto, alinea con MDR (saca de Class IIa), y elimina la implicación de IA conversacional.

---

## Prompt 1 · Refactor variables JS en `prototype.html`

```
Refactoriza los identificadores del Modo madrugada en prototype.html para eliminar el prefijo "chat" y el namespace "grow". El producto ya no es "Chat IA" — es un formulario determinístico llamado Modo madrugada.

OPERACIONES (todas case-sensitive, find-and-replace simple):

1. chatMadrugadaSession              → madrugadaSession              (9 ocurrencias esperadas)
2. chatMadrugadaSetLastAction        → madrugadaSetLastAction        (6)
3. chatMadrugadaLastAction           → madrugadaLastAction           (6)
4. chatMadrugadaStart                → madrugadaStart                (3)
5. chatMadrugadaSummary              → madrugadaSummary              (2)
6. chatMadrugadaSaveAndExit          → madrugadaSaveAndExit          (2)
7. chatMadrugadaOptionsForAge        → madrugadaOptionsForAge        (2)
8. chatMadrugadaLogAction            → madrugadaLogAction            (2)
9. chatMadrugadaDiscardAndExit       → madrugadaDiscardAndExit       (2)
10. CHAT_MADRUGADA_KEY                → MADRUGADA_KEY                 (1)
11. chat-madrugada-toggle             → madrugada-toggle              (varios, en HTML attrs y CSS)
12. grow.chat.madrugada               → mimo.madrugada                (3 ocurrencias)
13. data-screen="chat-madrugada"      → data-screen="modo-madrugada" (verificar uniqueness)
14. .chat-madrugada                   → .modo-madrugada               (CSS class · cambio masivo)
15. chat-madrugada                    → modo-madrugada                (resto de occurrences: data-attrs, HTML class, comments)

ANTES DEL CAMBIO 14 Y 15:
- Verifica que .chat-madrugada NO se confunde con otras clases similares
- Si grep encuentra otras clases tipo .chat-* relacionadas (ej. .chat-input, .chat-message), NO las toques

DESPUÉS DEL CAMBIO:
- Verifica que el screen Modo madrugada sigue funcionando (abrir prototype.html en navegador, navegar a la sección)
- Confirma que localStorage no rompe: el cambio CHAT_MADRUGADA_KEY → MADRUGADA_KEY invalida la key existente para usuarios que ya tenían estado. En desarrollo es OK. En producción habría que añadir migración (pero estamos en validación, no es necesario).

COMMIT:
refactor(prototype): renombrar variables Modo madrugada (chat* → madrugada*, grow.* → mimo.*)

  - Modo madrugada ya no es Chat IA · es formulario determinístico
  - Variables JS, CSS classes, data-attrs y namespace localStorage actualizados
  - Coherente con spec rewritten en Notion (mayo 2026)
  - localStorage key cambia: usuarios en dev pueden tener estado huérfano (no crítico)
```

---

## Prompt 2 · Rename de archivos legacy en `docs/decisions/` y `prd/`

```
Renombra dos archivos legacy del repo cuyos nombres contienen "chat" (Modo madrugada ya no es chat).

OPERACIONES (git mv para preservar history):

1. docs/decisions/0005-chat-ia-modo-madrugada.md
   →
   docs/decisions/0005-modo-madrugada.md

2. prd/PRD-chat-modo-madrugada-v0.1.md
   →
   prd/PRD-modo-madrugada-v0.1.md

DESPUÉS DEL RENAME:
- Verifica que no quedan refs internas en otros archivos a los paths antiguos. Estos paths deberían estar ya actualizados en los .md (limpieza hecha en mayo 2026), pero por si acaso, grep:
    grep -rn "0005-chat-ia-modo-madrugada\|PRD-chat-modo-madrugada" --include="*.md" --include="*.html"
  Si encuentra refs, actualízalas también.
- Si hay enlaces simbólicos o referencias en CI/scripts, actualízalas.

COMMIT:
chore(docs): rename 0005-chat-ia-modo-madrugada → 0005-modo-madrugada (y PRD homólogo)

  - Modo madrugada ya no es Chat IA · es formulario determinístico
  - git mv preserva history
  - Refs internas en MDs y Notion ya actualizadas previamente
```

---

## Prompt 3 · Verificación final

```
Ejecuta la verificación cero del refactor Modo madrugada en el repo. Confirma que no quedan rastros de la conceptualización "Chat IA" / "Chat madrugada".

EJECUTAR:

# 1. Buscar variables JS / código residual
grep -rnE "chatMadrugada|CHAT_MADRUGADA_KEY|\.chat-madrugada|grow\.chat\.madrugada" \
  --include="*.html" --include="*.js" --include="*.tsx" --include="*.ts" --include="*.css" \
  . | grep -vE "(node_modules|\.next|\.git|\.claude/worktrees)"
# expected: cero resultados

# 2. Buscar copy residual
grep -rniE "chat ia|chat de madrugada|chat madrugada|chat con ia" \
  --include="*.md" --include="*.html" --include="*.tsx" --include="*.ts" --include="*.css" \
  . | grep -vE "(node_modules|\.next|\.git|\.claude/worktrees)"
# expected: cero resultados

# 3. Buscar nombres de archivo legacy
find . -name "*chat-ia-modo-madrugada*" -o -name "*chat-modo-madrugada*" \
  | grep -vE "(node_modules|\.next|\.git|\.claude/worktrees)"
# expected: cero resultados

# 4. Confirmar que el feature sigue vivo
grep -rn "madrugada" docs/decisions/0005-modo-madrugada.md
grep -rn "data-screen=\"modo-madrugada\"" prototype.html
# expected: ambos devuelven matches

# 5. Smoke test
python3 -m http.server 5050
# abrir http://localhost:5050/prototype.html
# navegar a la pantalla Modo madrugada
# verificar:
#   - se abre sin error en consola
#   - los 3 chips edad-aware aparecen
#   - el localStorage usa key MADRUGADA_KEY (devtools → Application → Local Storage)

SI ALGO FALLA:
- Reporta el archivo y línea
- No revertas a chat* automáticamente · pregunta al user qué hacer
```

---

## Estado post-refactor

Cuando los 3 prompts se hayan ejecutado:

- ✅ Spec madrugada Notion: reescrita como "formulario clínico determinístico"
- ✅ Pricing canon: sin "Chat IA ilimitado"
- ✅ Hub Mimo, Fase 0, Overview, Business Model, Lexicon: limpios
- ✅ ADRs canon index: ADR-0005 reformulado
- ✅ 22 archivos MD/HTML del repo: 62 reemplazos aplicados
- ⏳ prototype.html: refactor variables (Prompt 1)
- ⏳ Renames archivos (Prompt 2)
- ⏳ Verificación cero (Prompt 3)

Si necesitas un commit message más detallado o un changelog para el equipo cuando incorporen los cambios, pídemelo.

---

*Cursor prompts · refactor Modo madrugada → formulario determinístico · mayo 2026*
