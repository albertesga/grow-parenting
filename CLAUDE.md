# Grow · prototype + Design System · Claude instructions

> Lee este archivo siempre al empezar sesión. Estas reglas pesan más que
> cualquier suposición sobre lo que "queda bien".

## Stack del repo

- **`prototype.html`** · single-file HTML clicable (~20k líneas) con todos los libros, screens y JS inline. Es el único entry-point del prototipo.
- **`design/Grow Design System v0.2.html`** · DS canónico con tokens, primitives y specs por sección (§A · Foundation, §B · Bottom nav, §E · Chips, §F · Pills, §K · Module, §V · Chat, etc.).
- Server local: `python3 -m http.server 5050` · URLs `http://localhost:5050/prototype.html` + `http://localhost:5050/design/Grow%20Design%20System%20v0.2.html`.

## ⚠️ Regla #1 · Sigue el Design System SIEMPRE

**Para cualquier cambio de diseño · UI · componentes:**

1. **Lee el DS antes de inventar nada nuevo.** Casi todo lo que necesitas ya está documentado en `design/Grow Design System v0.2.html`. Busca por sección o por nombre del primitive antes de crear CSS desde cero.

2. **Reusa primitives existentes en lugar de duplicar:**
   - **Chips** (filtros, view-tabs, escalas) → `.chip` + tonal cycle (`.coral / .mint / .gold / .blush / .ink / .soft`) + active "vacío" (paper + inset ink ring). NO crear `.{book}-chip` propio.
   - **Book hero** (cabecera de cualquier libro) → `.book-hero` con tono del libro (`mint / coral / gold / blush / lavender / salud`). NO override `min-height` ni `padding` — el primitive es 120px, radius 26, padding 14.
   - **Navbar dedicado de libro** → `.{book}-phone-nav` tonal + FAB central · misma estructura que `.vaccine-phone-nav` / `.milestone-phone-nav` / `.pregnancy-phone-nav` / etc.
   - **Timeline diario** → `.diary-timeline` con lanes (time + dot + card).
   - **Timeline hitos** → `.timeline-track.tall` + `.timeline-seg.{coral/blush/mint/gold}` + `.seg-label/.seg-dur/.today-dot/.seg-cursor`.
   - **Callouts** → `.callout` (+ `.coral / .with-rule / .urgent-soft`).
   - **Pills/stickers** → `.pill` (rotated stickers DS §F).
   - **Section heads** → eyebrow uppercase Lenia 10.5px 0.18em + h3 + chip count.
   - **Action CTAs** card-style → icon tonal 44×44 + body (strong Lenia + sub Helvena caption) + arrow `→`.

3. **Si el DS dice algo distinto a lo que estás haciendo, gana el DS.** Si necesitas algo que no existe en el DS, primero comprueba que de verdad no existe y luego añádelo al DS además del prototipo · canon ↔ implementación deben estar sincronizados.

4. **Si modificas un primitive en el prototipo, modifícalo también en el DS** (y viceversa). Aliases `.{book}-hero, .{book}-phone-nav` deben heredar del primitive canónico vía comma-list selectors, no duplicar reglas.

## Tokens canon (DS §A)

```
--paper #FAF7F0 · --paper-soft · --paper-deep
--ink #1A1A1A · --ink-soft · --ink-muted · --ink-warm
--coral-base / --coral-subtle / --coral-strong
--mint-base / --mint-subtle
--gold-base / --gold-subtle
--blush-base / --blush-subtle
--line / --line-soft / --line-strong
--radius-sm 14 · --radius-md 18 · --radius-xl 22 · --radius-pill 999
--fs-eyebrow 10.5 · --fs-caption 12 · --fs-body-sm 14 · --fs-body 15 · --fs-h3 18 · --fs-h2 22
--ease-standard cubic-bezier(0.2, 0.8, 0.2, 1) · --duration-base 220ms
```

**Fuentes:** `Lenia` (titles, labels uppercase) · `Helvena` (body, paragraphs).

## Tono libro · mapping canon

| Libro | Tono | Avatar/glyph |
|---|---|---|
| 🌱 Hitos | mint | avatar-mint |
| 💉 Vacunas | gold | avatar-mint |
| 📈 Desarrollo | lavender | avatar-mint |
| 🤰 Embarazo | coral | avatar-coral (María) |
| 🍐 Alimentación | coral | avatar-mint |
| ♡ Lactancia | blush | avatar-mint |
| ☾ Sueño | mint nocturno | avatar-mint |
| 🌡 Salud | paper-deep (`#EFE9D8`) | avatar-mint |
| 🔵 Cólicos | coral | avatar-mint |
| 📓 Diario | blush | avatar-mint |
| 👤 Perfil | mint | avatar-mint (Lola) |

## Estructura canon de libro

Todo libro sigue este patrón:

```
section.screen[data-screen="..."]
├── status bar
├── content
│   ├── top-header (eyebrow + screen-title + book-back X)
│   ├── book-hero TONO (kicker + h3 + p + orb)
│   ├── [tab 1 content] · default visible
│   ├── [tab 2 content] · hidden
│   └── [tab 3 content] · hidden
└── nav.phone-nav.{book}-phone-nav · 4 tabs + FAB Log central tonal
```

**View routing:** `{book}ActiveView` state + `set{Book}View(view)` función + `update{Book}NavActive()` para sync del .active del navbar + dispatch table hook al entrar al screen.

## Reglas hard

- **No emojis** salvo cuando ya están en el canon (los iconos de libros, cólicos, etc.). El DS evita emojis en chrome.
- **No rojo médico** · usar `coral-base` para urgencias, no `#FF0000`.
- **Trauma-informed copy:** sin gamification tóxica ("¡felicidades por mantener el libro al día!" → ❌), sin militancia, sin diminutivos forzados. Estado vacío saludable es positivo: "Aquí registramos lo que pasa · cuando pase".
- **`escapeHtml()`** siempre que metas variables en innerHTML.
- **Verificar antes de commit:**
  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5050/prototype.html  # → 200
  node --check /tmp/grow-extracted.js                                              # JS syntax OK
  ```

## Anti-patrones detectados (no volver a hacer)

- ❌ Crear `.food-age-chip` / `.{book}-chip` propio cuando `.chip` ya cubre el use case
- ❌ Override `min-height` en `.{book}-hero` rompiendo el canon 120px
- ❌ Active state con fill negro sólido (`module-dark`) en lugar del canon "vacío"
- ❌ `[name]` text placeholders en cards (food-photo, food-detail-photo)
- ❌ `transform: translateX(-50%)` para centrar navbars que tienen child con transform propio (FAB cell) · usar `left:0 + right:0 + margin-inline:auto`
- ❌ Auto column widths en navbars con FAB (FAB infla su cell) · usar `repeat(N, FIXED_PX)` con `justify-content: center` en `.nav-tab`
- ❌ Time text de timeline solapado con dot (lanes mal calculadas) · planificar lanes explícitas con gaps mínimos 6-8px

## Workflow

- **Commits atómicos por feature** con mensaje conventional (`feat(libro): ...`, `fix(libro): ...`, `chore(...): ...`) + co-author footer Claude.
- **Push siempre después de commit** (single-developer repo).
- **No documentación nueva** (`*.md`, `README.md`) salvo que el usuario lo pida explícitamente.
- **Plan mode:** lo activa el usuario (no decidir solo). Cuando se activa, escribir en `/Users/titoespanolgamon/.claude/plans/abre-un-nuevo-proyecto-wild-nest.md` y llamar `ExitPlanMode` al final del turno.
