# grow

Prototipo HTML de **Grow** — app de parenting con curvas de desarrollo OMS, Haizea-Llevant clínico y 9 libros tonales canon Fase 0.

## Superficies

- **`prototype.html`** · simulación de la app (single-file HTML/CSS/JS, ~21k líneas)
- **`homepage/`** · marketing site público canon Fase 0 (vanilla HTML/CSS/JS · 3 archivos)
- **`apps/about-us/`** · narrativa del founder (Next.js 16 + Tailwind + Framer Motion) con export estático a `homepage/about-us/`
- **`design/Grow Design System v0.2.html`** · DS canónico · single source of truth

Cualquier discrepancia entre archivos se resuelve siempre a favor del DS canónico.

## Estructura

```
.
├── AGENTS.md                                  # entry-point canónico (lee primero)
├── CLAUDE.md                                  # alias condensado Claude Code
├── prototype.html                             # prototipo app (single-file)
├── homepage/
│   ├── index.html                             # landing canon
│   ├── styles.css
│   ├── main.js
│   └── assets/fonts/
│       ├── TBJGaliner-{Light,Regular,Bold}.ttf    # serif display canon
│       ├── InterVariable{,-Italic}.woff2          # body sans canon
│       └── Grift-{18 cortes}.ttf                  # acento pricing .amt
├── apps/
│   └── about-us/
│   ├── app/                                   # Next.js app dir
│   ├── components/                            # React components
│   ├── public/fonts/                          # mismas fonts canon
│   └── package.json
├── design/
│   ├── Grow Design System v0.2.html           # DS canónico (~7k líneas)
│   ├── assets/fonts/                          # mismas fonts canon
│   └── v0.1/                                  # histórico (no tocar)
├── docs/
│   ├── HANDBOOK.md                            # onboarding humano + glosario
│   └── decisions/                             # 18 ADRs vigentes
├── .agent/
│   ├── agents.md                              # brain del proyecto
│   ├── rules/                                 # 9 reglas duras
│   └── skills/                                # 5 skills loop
├── .replit                                    # workflow Replit (opcional)
└── replit.nix
```

## Ejecutar localmente

### Prototype + homepage (vanilla)

Servidor HTTP desde la raíz (las fuentes son locales · no funciona con `file://`):

```sh
python3 -m http.server 5050
# luego abre:
# http://localhost:5050/prototype.html
# http://localhost:5050/homepage/index.html
# http://localhost:5050/design/Grow%20Design%20System%20v0.2.html
```

### About-us (Next.js)

```sh
cd apps/about-us && npm install && npm run dev
# luego abre http://localhost:3000
```

## Ejecutar en Replit

El repo conserva `.replit` y `replit.nix`. El workflow `Project` ejecuta `python3 -m http.server 5050` y expone el puerto 5050 para prototype + homepage.

## Marca (resumen rápido · canon May 2026)

- **Paper canvas** · `#FAF7F0` (paper) / `#F2EDE0` (paper-soft) / `#E8E1CF` (paper-deep)
- **Ink hierarchy** · `#1A1A1A` (ink) / `#4D4D4D` (ink-soft) / `#888888` (ink-muted) / `#BFBAA8` (ink-faint)
- **Paleta tonal** · 7 familias (coral · blush · mint · gold completas 3 tiers · violet · sky · ochre parciales subtle/strong)
- **Tipografía** · **Galiner** display serif · **Inter Variable** body sans · **Grift** acento pricing (`.amt` único)
- **Avatares** · blush (bebé) / coral (embarazo) / mint (crianza)

Detalle completo · `.agent/rules/typography.md` + `.agent/rules/palette-tonal.md` + `design/Grow Design System v0.2.html` § Foundations.

## Stack canon

`prototype.html`, `homepage/` y DS se sirven en vanilla sin build. Excepción explícita: `apps/about-us/` usa Next.js 16 con build y export estático a `homepage/about-us/`.

Detalle workflow + harness · `AGENTS.md` raíz.
