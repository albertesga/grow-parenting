# Mimo · About Us (source)

Sub-app narrativa en `apps/about-us/` (Next.js 16 + Tailwind + Framer Motion).
El source vive aquí y el output estático se exporta a `homepage/about-us/`.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 3
- Framer Motion 11
- Assets locales en `public/{img,frames,fonts,lottie}`

## Estructura

```
apps/about-us/
├── app/                 # layout + page + globals.css
├── components/          # secciones narrativas y primitives
├── public/              # img/ frames/ fonts/ lottie
├── scripts/
│   └── check-export-sync.mjs
├── next.config.js       # output export + basePath /about-us
└── package.json
```

## Scripts

- `npm run dev` · dev server en `http://localhost:3000`
- `npm run build` · build + export a `../../homepage/about-us`
- `npm run build:dry` · build local sin copiar output
- `npm run check:export-sync` · guardrail source/export (git diff)
- `npm run lint` · lint de Next

## Flujo recomendado

1. Edita source en `apps/about-us/`.
2. Ejecuta `npm run build`.
3. Verifica que `homepage/about-us/` quedó actualizado.
4. Sirve el repo con `python3 -m http.server 5050` desde raíz y abre `http://localhost:5050/about-us/`.

## Paths de assets

- Usa paths con prefijo `/about-us/...` en componentes y CSS para que el export funcione sin depender de mirrors en root.
- Evita editar manualmente `homepage/about-us/`: es output generado.
