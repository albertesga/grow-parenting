'use client';

import { useEffect, useState } from 'react';

/**
 * SiteTopbar · header de about-us.
 *
 * Layout · logo (izq) + cluster derecho (Quiénes somos · Trabaja con nosotros
 * · CTA waitlist). En about-us NO mostramos el book-nav de libros (eso vive en
 * el homepage) · aquí el link diferencial es "Trabaja con nosotros" que ancla
 * a la sección CofoundersCall (#trabaja) de la propia página.
 *
 * Estilos inline (<style jsx>) · es un Next bundle separado · hex del DS canon.
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(12px, 3vw, 28px);
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
        .right {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: flex-end;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 500;
          color: #4d4d4d;
          white-space: nowrap;
          text-decoration: none;
          transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .nav-link:hover {
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
            padding: 10px 16px;
          }
          .brand img {
            height: 22px;
          }
          /* "Quiénes somos" es self-referential en about-us · se oculta en
             mobile para dar aire al CTA principal "Trabaja con nosotros". */
          .nav-link.about {
            display: none;
          }
        }
        @media (max-width: 540px) {
          /* CTA waitlist compacto para que quepa junto a "Trabaja con nosotros" */
          .waitlist-link {
            font-size: 0;
            padding: 9px 14px;
            min-height: 36px;
          }
          .waitlist-link::before {
            content: 'Waitlist';
            font-size: 12.5px;
          }
        }
      `}</style>
      <header
        className={`site-topbar${scrolled ? ' scrolled' : ''}`}
        id="topbar"
      >
        <div className="brand">
          <a href="/" aria-label="Grow · volver al inicio">
            <img src="/about-us/img/grow-logo.png" alt="Grow" draggable={false} />
          </a>
        </div>
        <div className="right">
          <a className="nav-link about" href="/about-us/">
            Quiénes somos
          </a>
          <a className="nav-link" href="#trabaja">
            Trabaja con nosotros
          </a>
          <a className="waitlist-link" href="/waitlist.html">
            Únete a la waitlist
          </a>
        </div>
      </header>
    </>
  );
}
