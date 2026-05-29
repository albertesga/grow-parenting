/** @type {import('next').NextConfig} */
// Static export configuration · Mimo about-us sub-app
//
// Estrategia · Next.js static export · el build produce HTML estático en
// `homepage/about-us/` que el python http.server del root sirve junto al
// landing principal · single domain · sin SSR.
//
// Ver ADR-0017 (docs/decisions/0017-homepage-aboutus-monorepo.md) para
// rationale + decisión arquitectónica.
const nextConfig = {
  output: 'export',
  // El sitio se sirve desde la RAÍZ DEL REPO (.replit: python http.server desde
  // root; local: localhost:5050/homepage/). El landing vive en /homepage/ y este
  // export en /homepage/about-us/, así que assets+hrefs internos se prefijan con
  // /homepage/about-us para que resuelvan bajo ese layout. (Antes era /about-us
  // → 404 porque about-us NO está en la raíz web sino bajo /homepage/.)
  basePath: '/homepage/about-us',
  assetPrefix: '/homepage/about-us',
  // Output del build · va a `out/` por default (Next 16 no permite
  // distDir fuera del project path con Turbopack). El script `npm run
  // build` copia post-build a `../../homepage/about-us/` (ver package.json).
  // /about-us/ resuelve a /about-us/index.html · evita problemas con
  // python http.server que no resuelve "/" implícito de carpetas.
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Static export no soporta el Next image optimizer (Sharp en server) ·
    // unoptimized: true sirve las images raw vía <img> standard.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
