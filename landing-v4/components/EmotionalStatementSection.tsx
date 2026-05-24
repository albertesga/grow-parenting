'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import HandwrittenAsset from './HandwrittenAsset';

/**
 * EmotionalStatementSection · sección 2 con storytelling scroll-driven.
 *
 * Wrapper sticky de 320vh permite secuenciar 3 momentos narrativos:
 *
 * Scroll progress 0 → 1:
 *  · 0.00 → 0.20 · Bloque izquierdo "Probablemente es el mejor niño del mundo"
 *                  + subrayado + subtexto · reveal escalonado por línea
 *  · 0.20 → 0.40 · Polaroid del padre entra (scale + fade + rotate)
 *  · 0.40 → 0.70 · Bloque derecho "Aquí estoy yo. Padre de Inti..."
 *                  reveal escalonado de 5 elementos
 *  · 0.55 → 0.85 · Doodles handwritten distribuidos
 *  · 0.85 → 1.00 · HOLD · todo visible · usuario absorbe la composición
 *
 * Reverso al scroll up · todos los elementos vuelven a ocultarse en orden
 * inverso porque las animaciones están atadas al scroll progress.
 *
 * Layout · 3 columnas desktop / vertical mobile.
 */
export default function EmotionalStatementSection() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Spring sutil · suaviza el scroll en trackpads · evita jitter
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  // ═══════════════════════════════════════════════════════
  // Timeline · MOMENTO 1 · Bloque izquierdo (0.00 → 0.20)
  // ═══════════════════════════════════════════════════════
  const line1Opacity = useTransform(progress, [0.00, 0.06], [0, 1]);
  const line1Y = useTransform(progress, [0.00, 0.06], [40, 0]);
  const line2Opacity = useTransform(progress, [0.04, 0.10], [0, 1]);
  const line2Y = useTransform(progress, [0.04, 0.10], [40, 0]);
  const line3Opacity = useTransform(progress, [0.08, 0.14], [0, 1]);
  const line3Y = useTransform(progress, [0.08, 0.14], [40, 0]);
  const underlineLeftProgress = useTransform(progress, [0.12, 0.18], [0, 1]);
  const subLeftOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);
  const subLeftY = useTransform(progress, [0.15, 0.22], [24, 0]);
  const loopBottomOpacity = useTransform(progress, [0.18, 0.25], [0, 1]);
  const loopBottomScale = useTransform(progress, [0.18, 0.25], [0.7, 1]);

  // ═══════════════════════════════════════════════════════
  // Timeline · MOMENTO 2 · Polaroid (0.20 → 0.40)
  // ═══════════════════════════════════════════════════════
  const polaroidOpacity = useTransform(progress, [0.22, 0.38], [0, 1]);
  const polaroidScale = useTransform(progress, [0.22, 0.42], [0.85, 1]);
  const polaroidY = useTransform(progress, [0.22, 0.42], [80, 0]);
  const polaroidRotate = useTransform(progress, [0.22, 0.42], [-3, 1]);

  // Doodles polaroid · entran junto con la polaroid
  const arrowCurveTop1Opacity = useTransform(progress, [0.28, 0.42], [0, 1]);
  const arrowCurveTop1Scale = useTransform(progress, [0.28, 0.42], [0.7, 1]);
  const arrowCurveTop2Opacity = useTransform(progress, [0.32, 0.46], [0, 1]);
  const arrowCurveTop2Scale = useTransform(progress, [0.32, 0.46], [0.7, 1]);

  // ═══════════════════════════════════════════════════════
  // Timeline · MOMENTO 3 · Bloque derecho (0.40 → 0.70)
  // ═══════════════════════════════════════════════════════
  const r1Opacity = useTransform(progress, [0.42, 0.50], [0, 1]);
  const r1Y = useTransform(progress, [0.42, 0.50], [30, 0]);
  const r1X = useTransform(progress, [0.42, 0.55], [40, 0]);
  const underlineRightProgress = useTransform(progress, [0.48, 0.56], [0, 1]);
  const r2Opacity = useTransform(progress, [0.52, 0.60], [0, 1]);
  const r2Y = useTransform(progress, [0.52, 0.60], [20, 0]);
  const r3Opacity = useTransform(progress, [0.58, 0.66], [0, 1]);
  const r3Y = useTransform(progress, [0.58, 0.66], [16, 0]);
  const r4Opacity = useTransform(progress, [0.62, 0.70], [0, 1]);
  const r4Y = useTransform(progress, [0.62, 0.70], [16, 0]);
  const r5Opacity = useTransform(progress, [0.66, 0.74], [0, 1]);
  const r5Y = useTransform(progress, [0.66, 0.74], [16, 0]);

  // ═══════════════════════════════════════════════════════
  // Timeline · MOMENTO FINAL · Doodles bottom (0.55 → 0.85)
  // ═══════════════════════════════════════════════════════
  const sparkleOpacity = useTransform(progress, [0.55, 0.70], [0, 1]);
  const sparkleScale = useTransform(progress, [0.55, 0.70], [0.5, 1]);
  const loopCenterOpacity = useTransform(progress, [0.65, 0.78], [0, 1]);
  const loopCenterScale = useTransform(progress, [0.65, 0.78], [0.7, 1]);
  const arrowBottomRightOpacity = useTransform(progress, [0.72, 0.85], [0, 1]);
  const arrowBottomRightScale = useTransform(progress, [0.72, 0.85], [0.7, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[320vh] w-full"
      aria-label="Probablemente es el mejor niño del mundo"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Paper texture overlay extra · sutil noise sobre paper crema base */}
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
          <DesktopLayout
            line1Opacity={line1Opacity}
            line1Y={line1Y}
            line2Opacity={line2Opacity}
            line2Y={line2Y}
            line3Opacity={line3Opacity}
            line3Y={line3Y}
            underlineLeftProgress={underlineLeftProgress}
            subLeftOpacity={subLeftOpacity}
            subLeftY={subLeftY}
            loopBottomOpacity={loopBottomOpacity}
            loopBottomScale={loopBottomScale}
            polaroidOpacity={polaroidOpacity}
            polaroidScale={polaroidScale}
            polaroidY={polaroidY}
            polaroidRotate={polaroidRotate}
            arrowCurveTop1Opacity={arrowCurveTop1Opacity}
            arrowCurveTop1Scale={arrowCurveTop1Scale}
            arrowCurveTop2Opacity={arrowCurveTop2Opacity}
            arrowCurveTop2Scale={arrowCurveTop2Scale}
            r1Opacity={r1Opacity}
            r1Y={r1Y}
            r1X={r1X}
            underlineRightProgress={underlineRightProgress}
            r2Opacity={r2Opacity}
            r2Y={r2Y}
            r3Opacity={r3Opacity}
            r3Y={r3Y}
            r4Opacity={r4Opacity}
            r4Y={r4Y}
            r5Opacity={r5Opacity}
            r5Y={r5Y}
            sparkleOpacity={sparkleOpacity}
            sparkleScale={sparkleScale}
            loopCenterOpacity={loopCenterOpacity}
            loopCenterScale={loopCenterScale}
            arrowBottomRightOpacity={arrowBottomRightOpacity}
            arrowBottomRightScale={arrowBottomRightScale}
          />
        </div>

        {/* Mobile layout · vertical · animations CSS-only */}
        <div className="flex h-full w-full flex-col md:hidden">
          <MobileLayout />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Desktop layout · scroll-driven storytelling
   ──────────────────────────────────────────────────────────────────── */

type MV = MotionValue<number>;

interface DesktopProps {
  line1Opacity: MV; line1Y: MV;
  line2Opacity: MV; line2Y: MV;
  line3Opacity: MV; line3Y: MV;
  underlineLeftProgress: MV;
  subLeftOpacity: MV; subLeftY: MV;
  loopBottomOpacity: MV; loopBottomScale: MV;
  polaroidOpacity: MV; polaroidScale: MV; polaroidY: MV; polaroidRotate: MV;
  arrowCurveTop1Opacity: MV; arrowCurveTop1Scale: MV;
  arrowCurveTop2Opacity: MV; arrowCurveTop2Scale: MV;
  r1Opacity: MV; r1Y: MV; r1X: MV;
  underlineRightProgress: MV;
  r2Opacity: MV; r2Y: MV;
  r3Opacity: MV; r3Y: MV;
  r4Opacity: MV; r4Y: MV;
  r5Opacity: MV; r5Y: MV;
  sparkleOpacity: MV; sparkleScale: MV;
  loopCenterOpacity: MV; loopCenterScale: MV;
  arrowBottomRightOpacity: MV; arrowBottomRightScale: MV;
}

function DesktopLayout(p: DesktopProps) {
  return (
    <>
      {/* Bloque izquierdo · texto "Probablemente..." */}
      <div className="absolute left-[7vw] top-1/2 z-20 w-[36vw] -translate-y-1/2">
        <div className="font-grift text-ink">
          <motion.div
            className="text-[clamp(48px,5.4vw,86px)] font-light leading-[1.0] tracking-tight"
            style={{ opacity: p.line1Opacity, y: p.line1Y }}
          >
            Probablemente
          </motion.div>
          <motion.div
            className="text-[clamp(48px,5.4vw,86px)] font-light leading-[1.0] tracking-tight"
            style={{ opacity: p.line2Opacity, y: p.line2Y }}
          >
            es el <span className="font-extrabold">mejor niño</span>
          </motion.div>
          <motion.div
            className="text-[clamp(48px,5.4vw,86px)] font-extrabold leading-[1.0] tracking-tight"
            style={{ opacity: p.line3Opacity, y: p.line3Y }}
          >
            del mundo.
          </motion.div>

          {/* Subrayado doble bajo el headline */}
          <motion.div
            className="mt-3 origin-left"
            style={{
              scaleX: p.underlineLeftProgress,
              opacity: p.underlineLeftProgress,
              width: '24%',
              maxWidth: 200,
            }}
          >
            <HandwrittenAsset variant="doubleLine" width={200} />
          </motion.div>
        </div>

        {/* Subtexto izquierdo */}
        <motion.div
          className="mt-12 max-w-[28ch] font-grift text-[clamp(16px,1.25vw,22px)] font-medium leading-[1.45] text-ink-soft"
          style={{ opacity: p.subLeftOpacity, y: p.subLeftY }}
        >
          ¿qué cómo lo sé?,
          <br />
          pues porque soy su padre.
        </motion.div>

        {/* Loop garabato bajo el subtexto */}
        <motion.div
          className="pointer-events-none mt-6"
          style={{ opacity: p.loopBottomOpacity, scale: p.loopBottomScale }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowLoop" width={90} />
        </motion.div>
      </div>

      {/* Polaroid central · scroll-driven entry */}
      <motion.div
        className="absolute left-[48%] top-1/2 z-10 w-[24vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: p.polaroidOpacity,
          scale: p.polaroidScale,
          y: p.polaroidY,
          rotate: p.polaroidRotate,
        }}
      >
        <FloatingPolaroid />
      </motion.div>

      {/* Doodles arriba de la polaroid · aparecen con la polaroid */}
      <motion.div
        className="pointer-events-none absolute left-[40vw] top-[10vh] z-30"
        style={{
          opacity: p.arrowCurveTop1Opacity,
          scale: p.arrowCurveTop1Scale,
          rotate: 15,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowCurve" width={140} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[60vw] top-[12vh] z-30"
        style={{
          opacity: p.arrowCurveTop2Opacity,
          scale: p.arrowCurveTop2Scale,
          rotate: -10,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowCurve" width={130} flipX />
      </motion.div>

      {/* Bloque derecho · texto "Aquí estoy yo..." · scroll-driven escalonado */}
      <div className="absolute right-[6vw] top-1/2 z-20 w-[28vw] -translate-y-1/2">
        <motion.h2
          className="font-grift text-[clamp(28px,2.6vw,40px)] font-extrabold leading-[1.05] tracking-tight text-ink"
          style={{ opacity: p.r1Opacity, y: p.r1Y, x: p.r1X }}
        >
          Aquí estoy yo.
        </motion.h2>

        {/* Subrayado handwritten bajo "Aquí estoy yo." */}
        <motion.div
          className="mt-1 origin-left"
          style={{
            scaleX: p.underlineRightProgress,
            opacity: p.underlineRightProgress,
            width: '60%',
            maxWidth: 240,
          }}
        >
          <HandwrittenAsset variant="swash" width={240} />
        </motion.div>

        <motion.div
          className="mt-6 font-grift text-[clamp(18px,1.5vw,24px)] font-bold leading-[1.3] text-ink"
          style={{ opacity: p.r2Opacity, y: p.r2Y }}
        >
          Padre de Inti y Llivia.
        </motion.div>

        <motion.p
          className="mt-8 font-grift text-[clamp(14px,1.1vw,18px)] font-medium leading-[1.5] text-ink-soft"
          style={{ opacity: p.r3Opacity, y: p.r3Y }}
        >
          Muy orgulloso de cada uno de mis peques.
        </motion.p>

        <motion.p
          className="mt-5 font-grift text-[clamp(14px,1.1vw,18px)] font-medium leading-[1.5] text-ink-soft"
          style={{ opacity: p.r4Opacity, y: p.r4Y }}
        >
          Aún que nadie me enseñó a ser padre.
        </motion.p>

        <motion.p
          className="mt-5 font-grift text-[clamp(14px,1.1vw,18px)] font-medium leading-[1.5] text-ink-soft"
          style={{ opacity: p.r5Opacity, y: p.r5Y }}
        >
          Y nadie me avisó de lo complejo que es.
        </motion.p>
      </div>

      {/* Doodles bottom · aparecen al final · refuerzan composición scrapbook */}
      <motion.div
        className="pointer-events-none absolute left-[42vw] bottom-[22vh] z-30"
        style={{ opacity: p.sparkleOpacity, scale: p.sparkleScale }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="sparkleAlt" width={60} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[8vh] left-[38vw] z-30"
        style={{ opacity: p.loopCenterOpacity, scale: p.loopCenterScale }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowSmallLoop" width={110} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[6vh] left-[58vw] z-30"
        style={{
          opacity: p.arrowBottomRightOpacity,
          scale: p.arrowBottomRightScale,
          rotate: -15,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowUpLeft" width={150} />
      </motion.div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Polaroid · marco crema + foto + floating loop infinito
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
        {/* Por ahora usa padre.svg placeholder · cuando user guarde
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
   Mobile layout · vertical · animations CSS fade simples
   ──────────────────────────────────────────────────────────────────── */

function MobileLayout() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="font-grift text-ink">
        <div className="text-[10vw] font-light leading-[1.0] tracking-tight">
          Probablemente
        </div>
        <div className="text-[10vw] font-extrabold leading-[1.0] tracking-tight">
          es el mejor niño
        </div>
        <div className="text-[10vw] font-extrabold leading-[1.0] tracking-tight">
          del mundo.
        </div>
        <div className="mt-3 font-grift text-[16px] font-medium leading-[1.45] text-ink-soft">
          ¿qué cómo lo sé?, pues porque soy su padre.
        </div>
      </div>

      <div
        className="relative w-[70vw] max-w-[320px]"
        style={{ aspectRatio: '4 / 5' }}
      >
        <FloatingPolaroid />
      </div>

      <div className="font-grift text-ink">
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
