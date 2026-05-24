'use client';

import { motion } from 'framer-motion';
import HandwrittenAsset from './HandwrittenAsset';

/**
 * EmotionalStatementSection · sección 2 layout 3 columnas scrapbook.
 *
 * Layout:
 *  - Izquierda · texto "Probablemente es el mejor niño del mundo." + sub
 *  - Centro · polaroid del padre (foto)
 *  - Derecha · texto "Aquí estoy yo. Padre de Inti y Llivia." + 3 frases
 *  - 5 doodles handwritten distribuidos
 *
 * Sticky 160vh · composición full-screen.
 *
 * Animations · CSS-driven (delays escalonados) en lugar de scroll-driven.
 * Esto garantiza que se reproduzcan al cargar la página sin requerir scroll.
 * La polaroid mantiene un floating loop infinito via framer-motion animate.
 */

export default function EmotionalStatementSection() {
  return (
    <section
      className="relative h-[160vh] w-full"
      aria-label="Probablemente es el mejor niño del mundo"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Paper texture overlay extra (sutil noise sobre paper crema base) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>\")",
            backgroundSize: '320px 320px',
          }}
          aria-hidden="true"
        />

        {/* Desktop layout · 3 columnas */}
        <div className="relative hidden h-full w-full md:block">
          <DesktopLayout />
        </div>

        {/* Mobile layout · vertical */}
        <div className="flex h-full w-full flex-col md:hidden">
          <MobileLayout />
        </div>
      </div>

      {/* CSS animations · keyframes para reveal escalonado · sin depender de
          framer-motion scroll/inView. Triggered al cargar el component. */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes scaleInX {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: scale(0.7) rotate(var(--rot-from, 0deg));
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(var(--rot-to, 0deg));
          }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Desktop layout · 3 zonas (izquierda + centro polaroid + derecha)
   ──────────────────────────────────────────────────────────────────── */

function DesktopLayout() {
  // CSS animation styles · objeto inline para cada elemento
  const fadeUp = (delay: number) => ({
    animation: `fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
    animationDelay: `${delay}s`,
  });
  const fadeInScale = (delay: number) => ({
    animation: `fadeInScale 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
    animationDelay: `${delay}s`,
  });
  const scaleInX = (delay: number) => ({
    animation: `scaleInX 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
    animationDelay: `${delay}s`,
    transformOrigin: 'left center' as const,
  });
  const fadeInRotate = (delay: number, rotFrom: number, rotTo: number) => ({
    animation: `fadeInRotate 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
    animationDelay: `${delay}s`,
    '--rot-from': `${rotFrom}deg`,
    '--rot-to': `${rotTo}deg`,
  } as React.CSSProperties);

  return (
    <>
      {/* Bloque izquierdo · texto "Probablemente..." */}
      <div className="absolute left-[7vw] top-1/2 z-20 w-[36vw] -translate-y-1/2">
        <div className="font-grift text-ink">
          <div
            className="text-[clamp(48px,5.4vw,86px)] font-light leading-[1.0] tracking-tight"
            style={fadeUp(0.1)}
          >
            Probablemente
          </div>
          <div
            className="text-[clamp(48px,5.4vw,86px)] font-light leading-[1.0] tracking-tight"
            style={fadeUp(0.25)}
          >
            es el <span className="font-extrabold">mejor niño</span>
          </div>
          <div
            className="text-[clamp(48px,5.4vw,86px)] font-extrabold leading-[1.0] tracking-tight"
            style={fadeUp(0.4)}
          >
            del mundo.
          </div>

          {/* Subrayado doble bajo el headline */}
          <div className="mt-3" style={scaleInX(0.7)}>
            <div style={{ width: '24%', maxWidth: 200 }}>
              <HandwrittenAsset variant="doubleLine" width={200} />
            </div>
          </div>
        </div>

        {/* Subtexto izquierdo */}
        <div
          className="mt-12 max-w-[28ch] font-grift text-[clamp(16px,1.25vw,22px)] font-medium leading-[1.45] text-ink-soft"
          style={fadeUp(0.85)}
        >
          ¿qué cómo lo sé?,
          <br />
          pues porque soy su padre.
        </div>

        {/* Doodle loop garabato bajo subtexto izquierdo */}
        <div className="pointer-events-none mt-6" style={fadeInScale(1.1)} aria-hidden="true">
          <HandwrittenAsset variant="arrowLoop" width={90} />
        </div>
      </div>

      {/* Polaroid central · CSS entry + framer-motion floating loop.
          left-[44%] desplazada ligeramente a la derecha del centro
          pero NO tan a la derecha que solape con bloque texto derecho. */}
      <div
        className="absolute left-[48%] top-1/2 z-10 w-[24vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2"
        style={{
          animation: 'fadeInScale 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both',
          animationDelay: '0s',
        }}
      >
        <FloatingPolaroid />
      </div>

      {/* Bloque derecho · texto "Aquí estoy yo..." */}
      <div className="absolute right-[6vw] top-1/2 z-20 w-[28vw] -translate-y-1/2">
        <h2
          className="font-grift text-[clamp(28px,2.6vw,40px)] font-extrabold leading-[1.05] tracking-tight text-ink"
          style={fadeUp(0.6)}
        >
          Aquí estoy yo.
        </h2>

        {/* Subrayado handwritten bajo "Aquí estoy yo." */}
        <div className="mt-1" style={scaleInX(0.85)}>
          <div style={{ width: '60%', maxWidth: 240 }}>
            <HandwrittenAsset variant="swash" width={240} />
          </div>
        </div>

        <div
          className="mt-6 font-grift text-[clamp(18px,1.5vw,24px)] font-bold leading-[1.3] text-ink"
          style={fadeUp(1.0)}
        >
          Padre de Inti y Llivia.
        </div>

        <p
          className="mt-8 font-grift text-[clamp(14px,1.1vw,18px)] font-medium leading-[1.5] text-ink-soft"
          style={fadeUp(1.15)}
        >
          Muy orgulloso de cada uno de mis peques.
        </p>

        <p
          className="mt-5 font-grift text-[clamp(14px,1.1vw,18px)] font-medium leading-[1.5] text-ink-soft"
          style={fadeUp(1.3)}
        >
          Aún que nadie me enseñó a ser padre.
        </p>

        <p
          className="mt-5 font-grift text-[clamp(14px,1.1vw,18px)] font-medium leading-[1.5] text-ink-soft"
          style={fadeUp(1.45)}
        >
          Y nadie me avisó de lo complejo que es.
        </p>
      </div>

      {/* Doodles distribuidos · 5 elementos handwritten */}

      {/* Doodle 1 · curva top-center apuntando a la polaroid desde la izquierda */}
      <div
        className="pointer-events-none absolute left-[40vw] top-[10vh] z-30"
        style={fadeInRotate(0.7, 10, 15)}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowCurve" width={140} />
      </div>

      {/* Doodle 2 · curva top-right apuntando a la polaroid desde derecha */}
      <div
        className="pointer-events-none absolute left-[60vw] top-[12vh] z-30"
        style={fadeInRotate(0.85, -5, -10)}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowCurve" width={130} flipX />
      </div>

      {/* Doodle 3 · loop bottom-center bajo la polaroid */}
      <div
        className="pointer-events-none absolute bottom-[8vh] left-[38vw] z-30"
        style={fadeInRotate(1.2, 5, 0)}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowSmallLoop" width={110} />
      </div>

      {/* Doodle 4 · curva bottom-right apuntando hacia polaroid desde abajo */}
      <div
        className="pointer-events-none absolute bottom-[6vh] left-[58vw] z-30"
        style={fadeInRotate(1.35, -10, -15)}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowUpLeft" width={150} />
      </div>

      {/* Doodle 5 · sparkle decorativo */}
      <div
        className="pointer-events-none absolute left-[42vw] bottom-[22vh] z-30"
        style={fadeInScale(1.5)}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="sparkleAlt" width={60} />
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Polaroid central · marco crema + foto + floating loop infinito
   ──────────────────────────────────────────────────────────────────── */

function FloatingPolaroid() {
  return (
    <motion.div
      className="relative"
      style={{ aspectRatio: '4 / 5' }}
      animate={{
        y: [0, -6, 0],
        rotate: [1, 1.5, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="relative h-full w-full bg-[#FBF8EE]"
        style={{
          padding: '18px 18px 64px 18px',
          borderRadius: 3,
          boxShadow:
            '0 1px 2px rgba(20,18,12,0.06), 0 14px 32px rgba(20,18,12,0.16), 0 28px 70px rgba(20,18,12,0.10)',
        }}
      >
        {/* Por ahora usa padre.svg placeholder · cuando el user guarde
            padre.jpg, cambiar este src a /img/padre.jpg */}
        <img
          src="/img/padre.svg"
          alt="Padre · Albert · sonriendo"
          className="block h-full w-full object-cover"
          style={{ aspectRatio: '4 / 5' }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Mobile layout · vertical · sin parallax horizontal
   ──────────────────────────────────────────────────────────────────── */

function MobileLayout() {
  const fadeUp = (delay: number) => ({
    animation: `fadeUp 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both`,
    animationDelay: `${delay}s`,
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="font-grift text-ink">
        <div className="text-[10vw] font-light leading-[1.0] tracking-tight" style={fadeUp(0.1)}>
          Probablemente
        </div>
        <div className="text-[10vw] font-extrabold leading-[1.0] tracking-tight" style={fadeUp(0.25)}>
          es el mejor niño
        </div>
        <div className="text-[10vw] font-extrabold leading-[1.0] tracking-tight" style={fadeUp(0.4)}>
          del mundo.
        </div>
        <div className="mt-3 font-grift text-[16px] font-medium leading-[1.45] text-ink-soft" style={fadeUp(0.6)}>
          ¿qué cómo lo sé?, pues porque soy su padre.
        </div>
      </div>

      <div
        className="relative w-[70vw] max-w-[320px]"
        style={{ ...fadeUp(0.3), aspectRatio: '4 / 5' }}
      >
        <FloatingPolaroid />
      </div>

      <div className="font-grift text-ink" style={fadeUp(0.5)}>
        <h2 className="text-[24px] font-extrabold leading-[1.05] tracking-tight">
          Aquí estoy yo.
        </h2>
        <div className="mt-2 text-[16px] font-bold">Padre de Inti y Llivia.</div>
        <p className="mt-4 text-[14px] font-medium leading-[1.5] text-ink-soft">
          Muy orgulloso de cada uno de mis peques. Aún que nadie me enseñó a ser
          padre. Y nadie me avisó de lo complejo que es.
        </p>
      </div>
    </div>
  );
}
