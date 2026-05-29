---
description: Auditor de copy trauma-informed (ADR-0011) · scanea prototype.html buscando violaciones del canon · gamification, rojo médico, militancia, citas sin fuente, lenguaje alarmista. Reporta hits con línea + contexto + sugerencia trauma-informed. Trigger keywords: trauma copy, audit copy, gamification, rojo médico, canon copy, tono, ADR-0011.
allowed-tools: Bash(grep *) Bash(rg *)
---

## Audit canon trauma-informed (ADR-0011)

Buscar patrones anti-canon en `prototype.html`:

### 1 · Gamification tóxica

!`grep -nE "(racha|streak|llevas [0-9]+ d[ií]as|sigue as[ií]|enhorabuena|¡felicidades|felicitations|congrats|achievement unlocked|level up|points|puntos|badge|insignia)" prototype.html | head -20`

### 2 · Rojo médico (color literal #FF, red puro, red en CSS)

!`grep -nE "(#FF0000|#F00|color: red|background: red|background-color: red)" prototype.html | head -10`

### 3 · Comparativas estigmatizantes

!`grep -nE "(detr[áa]s del [0-9]+%|por debajo del [0-9]+%|m[áa]s lento que|peor que|menos que la media|debajo de la media)" prototype.html | head -10`

### 4 · Militancia

!`grep -nE "(es lo mejor|es lo correcto|deber[íi]as|tienes que|necesitas|el [úu]nico m[ée]todo|el m[ée]todo correcto|la verdad es|la realidad es)" prototype.html | head -15`

### 5 · Diagnóstico no autorizado

!`grep -nE "(tu hij@ tiene|tu beb[ée] tiene|est[áa] enfermo|padece|sufre de|diagn[óo]stico positivo|alteraci[óo]n|trastorno)" prototype.html | head -10`

### 6 · Citas clínicas sin fuente

!`grep -nE "(los expertos dicen|estudios demuestran|seg[úu]n los estudios|ciencia demuestra|cient[íi]ficamente probado|investigaciones recientes)" prototype.html | head -10`

### 7 · Diminutivos forzados

!`grep -nE "(hij@[- ]cito|mami|mam[ií]|papito|hijit[oa]|bebecit[oa])" prototype.html | head -10`

## Instrucciones

Tras los greps:

1. **Si todos los greps están vacíos** · reporta `✅ Copy canon respetado · cero violaciones ADR-0011`.

2. **Si hay hits**:
   - Lista cada hit con número de línea + texto matching + contexto (linea anterior/posterior si ayuda)
   - Clasifica por severidad:
     - 🔴 **Bloquea commit**: rojo médico literal, gamification explícita, diagnóstico no autorizado
     - 🟡 **Revisar**: militancia, comparativas, diminutivos · puede ser intencional en contexto educativo (ej. cita Wessel)
     - 🟢 **Falso positivo**: re-validar si es solo similitud léxica
   - Para cada hit · sugiere reemplazo canon ADR-0011

3. **Tabla canon de sustituciones rápidas** (referencia):

| Anti-canon | Canon |
|---|---|
| "¡Llevas 5 días!" | "Aquí registramos lo que pasa · cuando pase" |
| "Racha de N hitos" | "N logrados · de M hitos" |
| `color: red` | `color: var(--coral-strong)` |
| "Los expertos dicen…" | "NICE NG143 · 2021" (fuente con año) |
| "Tu hij@ está enfermo" | "Vamos a por la otitis · día 3 de antibiótico" |
| "La lactancia materna es lo mejor" | "Como salga. Y si no sale, también." |
| "Patrón anormal" | "Puede valer la pena hablar con tu pediatra" |

4. **Output canon**:

```
## Audit trauma-informed · {fecha}

✅/⚠️/🔴 {N hits} · {severidad agregada}

### Violaciones detectadas
- 🔴 línea X · "{match}" · {clasificación} · fix: "{sugerencia canon}"
- 🟡 línea Y · "{match}" · {clasificación} · verificar contexto

### Verdict
{✅ Listo para commit | ⚠ Revisar antes de commit | 🔴 Bloquea}
```

## Reglas

- **No automatic fix** · solo reporta y sugiere · el commit lo hace el dev tras revisar
- **Falsos positivos OK** · grep es básico (no semantic) · siempre re-validar en contexto
- **Cita Wessel/NICE/AEPED** dentro de educational copy es canon válido (citas con fuente + año)
- **Modo arcoíris** post-pérdida requiere copy especial · si detectas referencias al toggle (`pregnancyRainbowMode`), verifica que no hay copy alegre tipo "¡felicidades semana X!" cuando está activo
- **NSBSP "Nunca sacudas al bebé"** es canon directo · NO marcar como militancia
