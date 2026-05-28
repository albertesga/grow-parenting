# Grow · Waitlist form

## Qué es
`waitlist.html` es un formulario progressive (estilo Typeform · 1 pregunta por pantalla) que captura leads cualificados para la beta. Construido en HTML/CSS/JS vanilla con DS canon Grow (Fraunces + Inter, paleta clay/rose/sage, paper-cream).

## Archivos
- `waitlist.html` · página completa, self-contained.
- `propuesta-v3.html` · landing v3, todos los CTAs apuntan a `waitlist.html`.
- `index.html` (legacy) · si lo mantienes, repetir los mismos cambios de CTA.

## Flow (14 pantallas)
| # | Pregunta | Tipo | Req |
|---|---|---|---|
| 0 | Welcome | hero | — |
| 1 | Nombre | text | opcional |
| 2 | Email | email | **sí** |
| 3 | Rol (madre/padre/co-cuidador/abuel@/adopción/otro) | single | sí |
| 4 | Fecha nacimiento/parto previsto + toggle | date | opcional |
| 5 | Modos especiales (preemie/arcoíris/mono/mismo sexo/adopción/subrogación) | multi (exclusivo: ninguno) | opcional |
| 6 | Top problemas (10 opciones, max 3) | multi | sí |
| 7 | Intensidad por problema (poco/bastante/mucho/muchísimo) | single per item | opcional |
| 8 | Rating de 9 features (no me sirve / útil / imprescindible) | tri-state | opcional |
| 9 | Sensación de precio 9,99 € (Van Westendorp simplificado) | single | sí |
| 10 | Tier elegido (Free / Premium / aún no sé / no) + porqué | single + textarea | sí |
| 11 | Qué falta en lo que ya usas (texto libre) | textarea | opcional |
| 12 | Cómo nos encontraste | single | sí |
| 13 | Gracias + opt-in newsletter | confirmation | — |

## Estado y persistencia
- LocalStorage key: `grow_waitlist_v1` · guarda en cada cambio.
- Si el usuario sale y vuelve desde el mismo navegador, retoma donde lo dejó.
- Después de submit, el state se conserva (no se borra) para que un refresh no pierda confirmación.

## Conectar a Tally + Notion

### Opción A · Tally embebido (más rápido, recomendado para Tito)
1. Crea un form en Tally con los mismos campos. Mapping sugerido (campo Tally → propiedad Notion DB User Research):
   - **nombre** → Title `Nombre`
   - **email** → Email `Email`
   - **rol** → Select `Rol cuidador`
   - **fecha + fechaTipo** → Date `Fecha hij@` + Select `Estado embarazo`
   - **modos** (multi) → Multi-select `Modos especiales`
   - **problemas** (multi) → Multi-select `Top 3 problemas`
   - **intensidad** (object) → Text `Intensidad problemas` (JSON pegado)
   - **features** (object) → Text `Rating features` (JSON pegado)
   - **precio_sensacion** → Select `Sensación precio`
   - **tier** → Select `Tier intent`
   - **porque** → Long text `Por qué precio`
   - **gap** → Long text `Gap competencia`
   - **origen** → Select `Origen`
   - **newsletter** → Checkbox `Opt-in newsletter`
   - **_started / _submitted** → Created at automático
2. En Tally → integrations → **Notion** → conecta tu workspace y target la DB `User Research` (o crea una nueva DB `Waitlist leads` separada).
3. Tally genera un webhook URL. Pégala en `waitlist.html` así (línea 1 del último `<script>` o vía global):
   ```html
   <script>window.GROW_WEBHOOK_URL = 'https://api.tally.so/...';</script>
   ```
   Pónlo justo **antes** del `<script>` principal.

### Opción B · Notion API directa
Más limpio pero requiere serverless function (Vercel / Netlify) porque la API de Notion requiere `Authorization: Bearer <token>` y CORS — no se puede llamar desde HTML estático sin exponer el token.
- Crea Vercel function `/api/waitlist.js` con el SDK `@notionhq/client`.
- Apunta `window.GROW_WEBHOOK_URL = '/api/waitlist'`.
- Mapping de propiedades en la función.

### Opción C · Formspree (más simple, no estructurado)
Si quieres lanzar **hoy** sin Tally:
1. Crea form en formspree.io → te dan endpoint `https://formspree.io/f/xxx`.
2. `window.GROW_WEBHOOK_URL = 'https://formspree.io/f/xxx';`
3. Las respuestas llegan como JSON a tu email + dashboard. Luego se puede migrar a Notion manualmente o con Zapier.

## Configurar el webhook
Edita `waitlist.html`, busca esta línea y añade tu URL:

```js
var url = window.GROW_WEBHOOK_URL || ''; // leave empty for now; see README
```

O mejor, inyecta el global desde el `<head>` para no tocar el JS:

```html
<head>
  ...
  <script>window.GROW_WEBHOOK_URL = 'https://api.tally.so/r/XXXXXX';</script>
</head>
```

Mientras no haya webhook, el form **funciona visualmente** y hace `console.log` del payload — útil en dev pero los datos se pierden.

## Schema del payload
El submit envía JSON con esta forma:

```json
{
  "nombre": "Tito",
  "email": "tito@example.com",
  "rol": "padre",
  "fechaTipo": "born",
  "fecha": "2024-11-12",
  "modos": ["preemie"],
  "problemas": ["sueno","colicos","salud"],
  "intensidad": {"sueno":"muchisimo","colicos":"mucho","salud":"bastante"},
  "features": {"libros":2,"chat3am":2,"comite":1,"llamadas":0,"diario":1},
  "precio_sensacion": "ok",
  "tier": "premium",
  "porque": "Si me ahorra ir a urgencias 1 vez, ya está pagado.",
  "gap": "Huckleberry es solo sueño. Falta vacunas y desarrollo en un solo sitio.",
  "origen": "linkedin",
  "newsletter": true,
  "_started": "2026-05-27T10:14:00Z",
  "_submitted": "2026-05-27T10:17:42Z",
  "_lastSave": "2026-05-27T10:17:42Z",
  "_step": 12
}
```

## Privacidad
- Los datos viven en localStorage del navegador hasta submit.
- No hay analytics third-party en `waitlist.html` (sí los hay en la landing si los añades).
- Email es el único campo obligatorio. Cualquier otro se puede saltar.
- Microcopy de salida menciona `hola@growbythechildlens.com` para edición/borrado.

## Accesibilidad
- `prefers-reduced-motion` respetado.
- Keyboard nav completo: `Enter` siguiente, `←` atrás, `1-9` selecciona opción rápida en listas single.
- `aria-label` en botones de salida, contraste >= AA en todos los pares.
- Focus visible heredado del browser.

## Testing local
```sh
cd homepage/
python3 -m http.server 5050
# http://localhost:5050/propuesta-v3.html → click "Apúntate" → flow
# http://localhost:5050/waitlist.html → directo
```

## Métricas a trackear (cuando conectes)
- **Completion rate** por paso (drop-off heatmap)
- **Time-to-submit** mediano
- **Email validity rate** (descartar typos)
- **% por tier elegido** (free vs premium vs no)
- **% por sensación precio**
- **Top 3 problemas** distribución
- **Top 3 features con `imprescindible`**

Target benchmarks (SaaS B2C waitlist):
- Visit → start (paso 1): 25-40 %
- Start → email (paso 2): 70-85 %
- Email → submit: 35-55 %
- Visit → submit final: 5-12 %

## TODO posteriores
- [ ] Crear DB `Waitlist leads` en Notion (separar de `User Research`)
- [ ] Conectar webhook Tally / Vercel function
- [ ] A/B precio: 9,99 € vs 7,99 € vs 12,99 €
- [ ] Versión EN (i18n) cuando se abra mercado UK
- [ ] Email transaccional de confirmación al submit (Resend / Postmark)
