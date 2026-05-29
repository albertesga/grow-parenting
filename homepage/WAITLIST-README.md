# Mimo · Waitlist form

## Qué es
`waitlist.html` es un formulario progresivo (1 pregunta por pantalla) para capturar intención real y feedback de familias. Está implementado en HTML/CSS/JS vanilla y ahora envía eventos a un endpoint serverless (`/api/waitlist`) para persistir en Notion.

## Archivos clave
- `homepage/waitlist.html` · UI + lógica del flujo + tracking.
- `api/waitlist.js` · endpoint Vercel para validación, dedupe y escritura en Notion.
- `.env.example` · variables de entorno necesarias.
- `vercel.json` · runtime para functions.

## Flujo actual (11 pantallas visuales)
Hay 9 preguntas reales, más welcome y gracias:

| Step UI | Pantalla | Tipo | Requerido |
|---|---|---|---|
| 0 | Welcome | portada | no |
| 1 | Nombre | text | no |
| 2 | Email | email | **sí** |
| 3 | Rol cuidador | single choice | no |
| 4 | Fecha + tipo (nacido / en camino) | date + toggle | no |
| 5 | Intensidad por tema + comentario | grid + textarea | no |
| 6 | Rating de features + comentario | rating + textarea | no |
| 7 | Sensación de precio | single choice | no |
| 8 | Tier elegido + por qué | single + textarea | no |
| 9 | Gap de herramientas actuales | textarea | no |
| 10 | Gracias + newsletter | confirmación | no |

## Persistencia local
- Clave de estado: `mimo_waitlist_v1`.
- Mantiene progreso, respuestas, timestamps y flags de envío.
- Si el usuario vuelve desde el mismo navegador, retoma en el último paso.

## Endpoint de datos reales
El frontend resuelve el destino así:
1. Si existe `window.MIMO_WEBHOOK_URL`, usa ese valor.
2. Si no existe, usa `'/api/waitlist'` por defecto.

## Variables de entorno
Configurar en Vercel:

```bash
NOTION_TOKEN=secret_xxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_EVENTS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WAITLIST_ALLOWED_ORIGINS=http://localhost:5050,https://mimo.family,https://www.mimo.family
```

- `NOTION_EVENTS_DATABASE_ID` es opcional, pero recomendado para análisis de abandono por evento.
- Si no se define `NOTION_EVENTS_DATABASE_ID`, solo se actualizan leads en la DB principal.

## Eventos emitidos
`waitlist.html` emite:
- `step_viewed` (cada cambio de pantalla, con `elapsedPrevStepMs`)
- `step_completed`
- `step_skipped`
- `waitlist_submitted`
- `waitlist_hidden` (al ocultar pestaña)
- `waitlist_abandoned` (salida de sesión: `visibilitychange`, `pagehide`, `beforeunload`)
- `session_heartbeat` (cada 15s mientras la sesión está activa)

Todos incluyen:
- `sessionId`
- `step`, `stepInfo`
- `action`
- `answers` (snapshot actual)
- `source` (`path`, `referrer`, `query`, `utm`)
- `timestamp`

## Payload ejemplo
```json
{
  "event": "step_completed",
  "sessionId": "gw_lxw2p5k3_7s92ab1f",
  "step": 5,
  "stepInfo": { "step": 5, "tag": "5 de 9 · prioridades", "title": "¿Qué te preocupa más ahora?" },
  "action": "next",
  "fromStep": 5,
  "toStep": 6,
  "stepDurationMs": 18473,
  "answers": {
    "nombre": "Tito",
    "email": "tito@example.com",
    "rol": "padre",
    "fechaTipo": "born",
    "fecha": "2025-11-12",
    "problemas": ["sueno", "salud"],
    "intensidad": { "sueno": "mucho", "salud": "bastante" },
    "problemas_comentario": "",
    "features_comentario": "",
    "features": {},
    "precio_sensacion": "",
    "tier": "",
    "porque": "",
    "gap": "",
    "newsletter": true
  },
  "source": {
    "path": "/homepage/waitlist.html",
    "referrer": "https://mimo.family/homepage/",
    "query": "?utm_source=ig",
    "utm": { "utm_source": "ig" }
  },
  "timestamp": "2026-05-28T15:02:12.456Z"
}
```

## Notion: mapeo recomendado
DB principal (`NOTION_DATABASE_ID`) para leads:
- `Nombre` (title)
- `Email` (email)
- `Rol cuidador` (select)
- `Estado embarazo` (select)
- `Fecha hij@` (date)
- `Top 3 problemas` (multi-select) o `Problemas` (rich text)
- `Intensidad problemas` (rich text JSON)
- `Rating features` (rich text JSON)
- `Sensación precio` (select)
- `Tier intent` (select)
- `Por qué precio` (rich text)
- `Gap competencia` (rich text)
- `Opt-in newsletter` (checkbox)
- `Session ID` (rich text)
- `Último evento` (rich text/select)
- `Último step` (number)
- `Payload` (rich text)

DB opcional de eventos (`NOTION_EVENTS_DATABASE_ID`):
- `Event` (title)
- `Evento` (select/rich text)
- `Session ID` (rich text)
- `Step` (number)
- `Action` (select/rich text)
- `Email` (email/rich text)
- `Timestamp` (date/rich text)
- `Payload` (rich text)

## Verificación local
1. Levanta estático:
```bash
cd homepage
python3 -m http.server 5050
```
2. En otra terminal, corre endpoint:
```bash
vercel dev
```
3. Abre `http://localhost:5050/waitlist.html` y verifica:
- avanzar pasos registra `step_viewed`/`step_completed`
- cerrar pestaña en mitad del flujo registra `waitlist_abandoned`
- submit final crea/actualiza lead

## Métricas mínimas a revisar
- `visit → email` (step 2)
- `email → submit`
- drop-off por paso (`step_viewed` sin siguiente `step_completed`)
- mediana de `stepDurationMs` por paso
- distribución de `tier` y `precio_sensacion`
