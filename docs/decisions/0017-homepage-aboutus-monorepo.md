# ADR-0017 · Monorepo · homepage canonical + apps/about-us static export

**Status:** Accepted
**Date:** 2026-05-27
**Commit:** pending

## Context

El repo tiene 2 sub-proyectos con stacks distintos:

- **`homepage/`** · landing marketing en vanilla HTML/CSS/JS · servido
  por python http.server sin build
- **`about-us/`** (Next.js 16 + Framer Motion + Tailwind) · narrativa
  personal del founder (Inti story) · necesita build

El menú del homepage tenía `<a href="/about-us">Quiénes somos</a>` que
no resolvía en dev (homepage en `:5051`, about-us Next dev en `:3000`)
ni en producción (sub-domains no configurados). Necesitamos integración
single-domain con estructura clara que separe sources de output.

## Decision

**Estructura monorepo**:
- **`homepage/`** = canonical public web root · todo lo servido vive aquí
- **`apps/`** = sub-app sources · `apps/about-us/` con el Next.js source
- **`homepage/about-us/`** = static export del build de about-us
  (gitignorable o committable según preferencia · single-dev prototype
  permite commit-everything para "git pull + serve")

**Next config** (`apps/about-us/next.config.js`):
- `output: 'export'` · static HTML/JS sin SSR
- `basePath: '/about-us'` · prefija routes internas
- `assetPrefix: '/about-us'` · prefija `_next/static`
- `trailingSlash: true` · `/about-us/` → `/about-us/index.html`
- `images.unoptimized: true` · requerido para static export

**Build pipeline** · script `npm run build` en `apps/about-us/package.json`:
```
next build
&& rm -rf ../../homepage/about-us
&& cp -R out ../../homepage/about-us
&& for d in img frames fonts lottie; do
     rm -rf ../../homepage/$d
     && cp -R public/$d ../../homepage/$d
   done
```

El paso de copy de `public/{img,frames,fonts,lottie}` a `homepage/` root
existe porque los hardcoded `<img src="/img/...">` y `<link href="/img/...">`
del about-us source apuntan a paths origin-relativos sin el `/about-us`
prefix (Next basePath no auto-prefixa hrefs de `<img>` standard, solo
los de `<Image>`). Espejear los assets al root permite ambos paths
resolver: `/img/...` (preload absoluto) y `/about-us/img/...` (basePath).

**Dev workflow**:
- Iteración rápida about-us · `cd apps/about-us && npm run dev` (`:3000`)
- Build + servir como producción · `npm run build` + python http.server
  desde `homepage/`

## Consequences

- ✓ Single domain · `http://host/about-us/` es navegable desde el homepage
- ✓ Separación de concerns · `apps/` = sources mutables · `homepage/` =
  artifact + static landing
- ✓ ADR 16 sigue siendo compatible (cross-libro routing del prototype
  no afectado)
- ⚠ Build manual antes de cada deploy/test prod-like (`npm run build`)
- ⚠ Assets duplicados en disco (~7MB en `homepage/about-us/` +
  ~6MB en `homepage/{img,frames,fonts,lottie}` mirror)
- ⚠ No soporta SSR/ISR · acceptable porque about-us es 100% client
  components + framer-motion sin server data fetching
- ⚠ Cualquier paths nuevos en `apps/about-us/components/` deben usar
  el prefix `/about-us/` manualmente o el script de copy lo soluciona

## Alternatives considered

- **Subdomain external** (e.g. `about.mimo.family`) · rejected · UX
  cambio de dominio rompe la sensación de unidad · DNS extra config
- **Reverse proxy Vercel/CloudFront** con rewrites `/about-us/* → about-us app` ·
  rejected · over-engineer para single-dev prototype · requiere
  infraestructura cloud
- **Mover homepage INTO about-us** (Next.js como host, homepage como
  ruta estática `/`) · rejected · invasivo, requeriría reescribir
  homepage vanilla como página Next · perdería simplicidad del
  `python3 -m http.server`
- **Symlinks** de `homepage/img → apps/about-us/public/img` · rejected ·
  no portable a git/deploy · genera fragilidad
