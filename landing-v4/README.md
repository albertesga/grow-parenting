# Grow Landing v4 · Inti narrative

Landing narrativa con scroll parallax · Next.js 14 + Tailwind + Framer Motion.

## Stack

- **Next.js 14** · App Router · React Server Components donde aplica
- **TypeScript**
- **Tailwind CSS 3** · tokens custom (paper, ink, mint-soft)
- **Framer Motion 11** · `useScroll` + `useTransform` para parallax
- **Grift** font family · auto-loaded vía `@font-face` (18 cortes en `/public/fonts/`)

## Estructura

```
landing-v4/
├── app/
│   ├── layout.tsx          # html lang="es" · body class Grift
│   ├── page.tsx            # renders <LandingPage />
│   └── globals.css         # @font-face Grift + paper texture + reset
├── components/
│   ├── LandingPage.tsx               # Orquesta · logo + sections
│   ├── IntroPhotoSection.tsx         # Sección 1+2 (sticky scroll choreography)
│   ├── HeroRevealSection.tsx         # Texto "Este es Inti." + arrows
│   ├── EmotionalStatementSection.tsx # Sección 3 (declaración padre)
│   ├── HandwrittenArrow.tsx          # 6 variantes SVG hand-drawn
│   └── GrowLogo.tsx                  # Logo wordmark inline SVG
├── public/
│   ├── fonts/             # 18 Grift TTFs (Thin → Black, normal + italic)
│   └── img/
│       └── inti.svg       # Placeholder · reemplazar con inti.jpg
└── ...configs
```

## Setup

```bash
cd landing-v4
npm install
npm run dev
```

Abre http://localhost:3000

## Pendiente · poner assets reales

### 1 · Foto de Inti

El componente espera `/img/inti.svg` (placeholder actual).

**Para usar tu foto real:**

1. Guarda la foto como `landing-v4/public/img/inti.jpg`
2. Edita `landing-v4/components/IntroPhotoSection.tsx`
3. Reemplaza ambas instancias de `src="/img/inti.svg"` por `src="/img/inti.jpg"`
4. Para versión optimizada · considera migrar a `<Image>` de `next/image`
   (más performance, lazy load automático)

### 2 · Logo Grow

El componente `GrowLogo.tsx` renderiza un SVG inline aproximado al wordmark.
Si tienes el SVG real:

1. Guarda como `landing-v4/public/img/grow-logo.svg`
2. Edita `LandingPage.tsx` para usar `<img src="/img/grow-logo.svg" alt="Grow" />`
   en lugar de `<GrowLogo />`

### 3 · (Opcional) Fonts Grift en woff2

Actualmente carga TTFs. Para mejor performance (~40% más pequeños):

1. Convierte cada `Grift-*.ttf` a `.woff2` (ej. con
   [transfonter.org](https://transfonter.org))
2. Coloca en `public/fonts/Grift-*.woff2`
3. El `@font-face` ya tiene los `.woff2` como source prioritario · sin cambios
   en CSS

## Animation timeline

### IntroPhotoSection (sticky scroll · 200vh wrapper)

| Progress | Foto                     | Texto + Arrows           |
|----------|--------------------------|--------------------------|
| 0.00     | Fullscreen · scale 1     | (oculto)                 |
| 0.25     | Reducción · empieza desplaz. | "Este es Inti." fade in |
| 0.55     | En posición polaroid hero | Subrayado dibujado       |
| 0.70     | Estable                  | Párrafo visible          |
| 1.00     | Estable                  | 4 flechas reveladas      |

### EmotionalStatementSection (sticky scroll local)

| Progress | Action                                        |
|----------|-----------------------------------------------|
| 0.10     | Arrow top fade in                             |
| 0.45     | Línea 1 "Probablemente"                       |
| 0.55     | Línea 2 "es el mejor niño"                    |
| 0.65     | Línea 3 "del mundo."                          |
| 0.85     | Frase íntima "¿qué cómo lo sé?…"              |
| 1.00     | Arrow lateral fade in                         |

## Responsive

- **Desktop ≥ 768px** · layout horizontal · foto right + texto left · parallax completo
- **Mobile < 768px** · layout vertical · foto arriba + texto abajo · parallax simplificado
  (sin desplazamiento horizontal · arrows handwritten ocultas para evitar caos visual)

## Performance notes

- `position: sticky` para wrapper de 100vh · evita JS scrolljacking
- `useSpring` sobre `scrollYProgress` · smooth scroll en trackpads sin saltos
- `willChange: transform` en elementos animados · GPU layer promotion
- Solo `transform` + `opacity` animados · ningún `width/height/top/left`
- Fonts `font-display: swap` · FOUT pero sin FOIT
- Paper texture · SVG noise inline (data URI) · zero HTTP requests

## Accessibility

- `<html lang="es">`
- `alt="Inti sonriendo en una foto tipo polaroid"` · descriptivo
- Logo con `aria-label="Grow"` + sr-only text
- Arrows handwritten con `aria-hidden="true"` (decorativas)
- Respeto a `prefers-reduced-motion` · todas las transitions a 0.01ms
- Contraste · `#1A1A1A` sobre `#FAF7F0` · 14.8:1 ✓ AAA
- Soft text · `#4D4D4D` sobre `#FAF7F0` · 7.4:1 ✓ AAA

## Trade-offs y notas

- **No menu superior** (por brief) · solo logo discreto en top-left
- **No CTAs** (por brief) · foco en narrativa pura
- **No copy adicional** (por brief) · solo las frases especificadas
- **No backend** · 100% static · deployable a Vercel/Netlify sin config extra
- **Grift como única font** · contradice el typography canon del repo Grow
  (ver `.agent/rules/typography.md`) · es decisión explícita del user para
  esta landing-v4 específica
- **Stack independiente del harness** · este proyecto no aplica las rules de
  `.agent/rules/` del repo Grow

## Scripts

| Comando         | Acción                              |
|-----------------|-------------------------------------|
| `npm run dev`   | Dev server en http://localhost:3000 |
| `npm run build` | Build estático para producción      |
| `npm run start` | Server producción local             |
| `npm run lint`  | Next.js lint                        |

## Deploy

Vercel · `vercel deploy` desde esta carpeta (autodetect Next.js).
Netlify · `netlify deploy` con `npm run build` y publish dir `.next`.

## Roadmap potencial

- Migrar a `next/image` para foto Inti (perf · LCP optimization)
- Añadir CTAs / formulario al final (cuando producto lo requiera)
- Internacionalización (i18n) si el target se expande a LATAM con variantes locales
- Tests visuales con Playwright para snapshots de cada step del scroll
