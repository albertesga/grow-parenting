/** @type {import('next').NextConfig} */
// Static export configuration · Grow about-us sub-app
//
// Estrategia · Next.js static export · el build produce HTML estático en
// `homepage/about-us/` que el python http.server del root sirve junto al
// landing principal · single domain · sin SSR.
//
// Ver ADR-0017 (docs/decisions/0017-homepage-aboutus-monorepo.md) para
// rationale + decisión arquitectónica.
const nextConfig = {
  output: 'export',
  // Todos los hrefs internos + assets quedan prefijados con /about-us/
  // para que match con la URL desde el python http.server del root.
  basePath: '/about-us',
  assetPrefix: '/about-us',
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
