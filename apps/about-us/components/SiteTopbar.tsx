'use client';

import { useEffect, useState } from 'react';

/**
 * SiteTopbar · header unificado a través de homepage, about-us y waitlist.
 *
 * Layout (mismo que homepage/index.html y waitlist.html):
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ [logo]   [book-nav · 5 chips tonal]   [Quiénes somos] [CTA] │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * Hrefs absolutos (/) para que funcionen desde cualquier ruta:
 *  - homepage  · sirve /
 *  - about-us  · sirve /about-us/
 *  - waitlist  · sirve /waitlist.html
 *
 * El topbar de about-us no importa estilos de homepage/styles.css (es un
 * Next bundle separado) · todos los estilos van inline para no añadir
 * dependencias cross-bundle. Mismos colors hex que el DS canon de homepage
 * (paper, ink-warm, palette tonal de las 5 books principales).
 */
export default function SiteTopbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .site-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(250, 247, 240, 0.92);
          backdrop-filter: saturate(150%) blur(16px);
          -webkit-backdrop-filter: saturate(150%) blur(16px);
          padding: 12px 40px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: clamp(18px, 3vw, 34px);
          transition: border-color 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
          border-bottom: 1px solid transparent;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .site-topbar.scrolled {
          border-bottom: 1px solid #e2ddd1;
        }
        .brand {
          display: flex;
          align-items: center;
        }
        .brand img {
          height: 26px;
          width: auto;
        }
        .book-nav {
          justify-self: center;
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: center;
          min-width: 0;
          max-width: 100%;
          padding: 5px;
          border: 1px solid rgba(201, 194, 178, 0.72);
          border-radius: 999px;
          background: rgba(244, 239, 226, 0.76);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.62),
            0 12px 28px -24px rgba(42, 33, 27, 0.28);
        }
        .book-nav-link {
          position: relative;
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 500;
          color: #4d4d4d;
          white-space: nowrap;
          text-decoration: none;
          transition:
            color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
            background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .book-nav-link::after {
          content: '';
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 5px;
          height: 2px;
          border-radius: 999px;
          background: #bfd2b0;
          transform: scaleX(0);
          transform-origin: center;
          opacity: 0.9;
          transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .book-nav-link:hover {
          color: #1a1a1a;
          background: var(--nav-soft, #f2ede0);
          transform: translateY(-1px);
        }
        .book-nav-link:hover::after,
        .book-nav-link:focus-visible::after {
          transform: scaleX(1);
        }
        .t-coral {
          --nav-soft: #fbe5d6;
          color: #8e4a22;
        }
        .t-blush {
          --nav-soft: #f8e4dd;
          color: #7a3d2d;
        }
        .t-mint {
          --nav-soft: #e5eddf;
          color: #4e6a45;
        }
        .t-gold {
          --nav-soft: #f6ebc9;
          color: #6e5a2a;
        }
        .t-violet {
          --nav-soft: #e6dfe9;
          color: #4a3d55;
        }
        .nav-about-mobile {
          display: none;
        }
        .right {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: flex-end;
        }
        .about-link {
          font-size: 13px;
          font-weight: 500;
          color: #4d4d4d;
          white-space: nowrap;
          text-decoration: none;
          transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .about-link:hover {
          color: #1a1a1a;
        }
        .waitlist-link {
          background: #2a211b;
          color: #faf7f0;
          border: 0;
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          text-decoration: none;
          transition:
            background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .waitlist-link:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
        }
        @media (max-width: 960px) {
          .site-topbar {
            grid-template-columns: 1fr auto;
            grid-template-areas:
              'brand actions'
              'nav nav';
            gap: 8px 14px;
            padding: 10px 0 8px 16px;
          }
          .brand {
            grid-area: brand;
          }
          .brand img {
            height: 22px;
          }
          .right {
            grid-area: actions;
            padding-right: 16px;
          }
          .about-link {
            display: none;
          }
          .book-nav {
            grid-area: nav;
            position: relative;
            justify-self: stretch;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 2px 28px 2px 16px;
            margin-left: -16px;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x proximity;
            mask-image: linear-gradient(90deg, #000 0, #000 calc(100% - 32px), transparent 100%);
            -webkit-mask-image: linear-gradient(90deg, #000 0, #000 calc(100% - 32px), transparent 100%);
          }
          .book-nav::-webkit-scrollbar {
            display: none;
          }
          .book-nav-link {
            flex: 0 0 auto;
            min-height: 30px;
            padding: 6px 12px;
            font-size: 12.5px;
            scroll-snap-align: start;
            border: 1px solid rgba(201, 194, 178, 0.55);
            background: rgba(250, 247, 240, 0.7);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
          }
          .book-nav-link::after {
            left: 14px;
            right: 14px;
            bottom: 4px;
          }
          .nav-about-mobile {
            display: inline-flex;
            background: #faf7f0;
            color: #2a211b;
            border-color: rgba(42, 33, 27, 0.22);
            font-weight: 500;
          }
        }
      `}</style>
      <header
        className={`site-topbar${scrolled ? ' scrolled' : ''}`}
        id="topbar"
      >
        <div className="brand">
          <a href="/" aria-label="Grow · volver al inicio">
            <img src="/img/grow-logo.png" alt="Grow" draggable={false} />
          </a>
        </div>
        <nav className="book-nav" aria-label="Libros principales">
          <a className="book-nav-link t-coral" href="/#libros">
            Embarazo
          </a>
          <a className="book-nav-link t-blush" href="/#libros">
            Lactancia
          </a>
          <a className="book-nav-link t-mint" href="/#libros">
            Sueño
          </a>
          <a className="book-nav-link t-gold" href="/#libros">
            Alimentación
          </a>
          <a className="book-nav-link t-violet" href="/#libros">
            Desarrollo
          </a>
          <a className="book-nav-link nav-about-mobile" href="/about-us/">
            Quiénes somos
          </a>
        </nav>
        <div className="right">
          <a className="about-link" href="/about-us/">
            Quiénes somos
          </a>
          <a className="waitlist-link" href="/waitlist.html">
            Únete a la waitlist
          </a>
        </div>
      </header>
    </>
  );
}
