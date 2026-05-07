# grow logo asset kit

Este ZIP incluye los assets básicos para implementar el logo de `grow` en web/app y arrancar un design system coherente.

## Estructura

- `logo/`
  - `grow-logo-horizontal.png`: logo principal con fondo transparente.
  - `grow-logo-horizontal-256.png`, `512.png`, `1024.png`, `1536.png`: versiones optimizadas por ancho.
  - `grow-symbol.png`: isotipo verde sólido usado como `o`.
  - `grow-symbol-32.png` → `grow-symbol-1024.png`: isotipo en tamaños cuadrados.

- `favicons/`
  - `favicon.ico`: incluye 16x16, 32x32 y 48x48.
  - `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-64x64.png`.
  - `apple-touch-icon.png`: 180x180.
  - `android-chrome-192x192.png`, `android-chrome-512x512.png`.
  - `maskable-icon-192x192.png`, `maskable-icon-512x512.png`.
  - `site.webmanifest`, `browserconfig.xml`, `safari-pinned-tab.svg`.

- `svg/`
  - `grow-symbol-flat.svg`: versión vectorial simple del isotipo.
  - `grow-logo-horizontal-raster.svg`: wrapper SVG con PNG incrustado.
  - `grow-symbol-raster.svg`: wrapper SVG con PNG incrustado.

- `tokens/`
  - `grow-design-tokens.json`: tokens base de color, radio, sombra y tipografía.
  - `grow.css`: variables CSS listas para usar.

- `social/`
  - `og-image-1200x630.png`: imagen Open Graph básica.

## HTML recomendado

```html
<link rel="icon" href="/favicons/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#B6C5B2">
<link rel="manifest" href="/favicons/site.webmanifest">
<meta name="theme-color" content="#B6C5B2">
<meta name="msapplication-TileColor" content="#FAF6EE">
<meta property="og:image" content="/social/og-image-1200x630.png">
```

## Uso recomendado

- Logo principal: usa `logo/grow-logo-horizontal.png` en headers, landing y onboarding.
- Favicon/app icon: usa el isotipo verde (`favicons/`).
- Fondo preferente: blanco o crema `#FAF6EE`.
- Color principal de texto: `#3E3D34`.
- Color principal de marca: `#B6C5B2`.
- Clear space mínimo alrededor del logo: aproximadamente la altura del isotipo.
- Evita poner el logo sobre fondos muy saturados o fotografías sin una tarjeta clara detrás.

## Nota

La versión horizontal viene de una imagen generada en raster. Para un sistema de marca definitivo, conviene vectorizar manualmente el wordmark en Figma/Illustrator y fijar una tipografía oficial.
