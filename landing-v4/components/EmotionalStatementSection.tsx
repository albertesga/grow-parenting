'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HandwrittenAsset from './HandwrittenAsset';

/**
 * EmotionalStatementSection · sección 2 redesigned.
 *
 * Layout editorial 3 columnas (scrapbook style):
 *  - Izquierda · texto "Probablemente es el mejor niño del mundo." + sub
 *  - Centro · polaroid del padre (foto)
 *  - Derecha · texto "Aquí estoy yo. Padre de Inti y Llivia." + 3 frases
 *  - 5-7 flechas handwritten distribuidas alrededor
 *
 * Estructura sticky:
 *  - Wrapper de 160vh (1.6 viewports de scroll) · permite parallax durante
 *    el tiempo que el inner sticky está pegado al top.
 *  - Inner sticky de 100vh · composición full-screen.
 *
 * Parallax layers (depth):
 *  L1 background · noise + paper · movimiento casi imperceptible
 *  L2 text-left · reveal por líneas + parallax y
 *  L3 polaroid · parallax más visible · entry scale + rotate
 *  L4 text-right · parallax x + reveal escalonado
 *  L5 doodles · arrows con parallax independiente (top más lento, bottom más rápido)
 *
 * Mobile · layout vertical · parallax simplificado (solo fade + y).
 */
export default function EmotionalStatementSection() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });

  // Spring sutil para suavizar el scroll en trackpads
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.3,
  });

  // Background paper · movimiento casi imperceptible (depth muy lejana)
  const bgY = useTransform(progress, [0, 1], [0, -20]);

  // Bloque izquierdo · entra desde abajo · opacity + y parallax
  const leftY = useTransform(progress, [0, 0.5, 1], [80, 0, -20]);
  const leftOpacity = useTransform(progress, [0, 0.25, 0.5], [0, 1, 1]);

  // Headline · reveal escalonado por línea (3 líneas)
  const line1Opacity = useTransform(progress, [0.12, 0.22], [0, 1]);
  const line1Y = useTransform(progress, [0.12, 0.22], [40, 0]);
  const line2Opacity = useTransform(progress, [0.16, 0.26], [0, 1]);
  const line2Y = useTransform(progress, [0.16, 0.26], [40, 0]);
  const line3Opacity = useTransform(progress, [0.2, 0.3], [0, 1]);
  const line3Y = useTransform(progress, [0.2, 0.3], [40, 0]);

  // Subtexto izquierdo · aparece después del headline
  const subLeftOpacity = useTransform(progress, [0.32, 0.45], [0, 1]);
  const subLeftY = useTransform(progress, [0.32, 0.45], [40, 0]);

  // Polaroid central · más parallax · scale + y + rotate
  const polaroidScale = useTransform(progress, [0, 0.4, 1], [0.92, 1, 1]);
  const polaroidY = useTransform(progress, [0, 0.5, 1], [120, 0, -40]);
  const polaroidRotate = useTransform(progress, [0, 0.4, 1], [-4, 1, 1]);
  const polaroidOpacity = useTransform(progress, [0.05, 0.3], [0, 1]);

  // Bloque derecho · aparece después · x + y + opacity
  const rightX = useTransform(progress, [0.25, 0.5], [60, 0]);
  const rightY = useTransform(progress, [0.25, 0.6, 1], [40, 0, -10]);
  const rightOpacity = useTransform(progress, [0.25, 0.45], [0, 1]);

  // Reveal escalonado del bloque derecho (4 líneas)
  const r1Opacity = useTransform(progress, [0.3, 0.42], [0, 1]);
  const r1Y = useTransform(progress, [0.3, 0.42], [20, 0]);
  const r2Opacity = useTransform(progress, [0.38, 0.5], [0, 1]);
  const r2Y = useTransform(progress, [0.38, 0.5], [20, 0]);
  const r3Opacity = useTransform(progress, [0.45, 0.57], [0, 1]);
  const r3Y = useTransform(progress, [0.45, 0.57], [16, 0]);
  const r4Opacity = useTransform(progress, [0.5, 0.62], [0, 1]);
  const r4Y = useTransform(progress, [0.5, 0.62], [16, 0]);
  const r5Opacity = useTransform(progress, [0.55, 0.67], [0, 1]);
  const r5Y = useTransform(progress, [0.55, 0.67], [16, 0]);

  // Doodles · parallax independiente
  const doodleTopY = useTransform(progress, [0, 1], [40, -30]);
  const doodleBottomY = useTransform(progress, [0, 1], [20, -60]);
  const doodleLoopX = useTransform(progress, [0, 1], [-20, 20]);
  const doodleOpacity = useTransform(progress, [0.35, 0.55], [0, 1]);
  const doodleScale = useTransform(progress, [0.35, 0.55], [0.8, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[160vh] w-full"
      aria-label="Probablemente es el mejor niño del mundo"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Desktop layout · 3 columnas */}
        <div className="relative hidden h-full w-full md:block">
          <DesktopLayout
            bgY={bgY}
            leftY={leftY}
            leftOpacity={leftOpacity}
            line1Opacity={line1Opacity}
            line1Y={line1Y}
            line2Opacity={line2Opacity}
            line2Y={line2Y}
            line3Opacity={line3Opacity}
            line3Y={line3Y}
            subLeftOpacity={subLeftOpacity}
            subLeftY={subLeftY}
            polaroidScale={polaroidScale}
            polaroidY={polaroidY}
            polaroidRotate={polaroidRotate}
            polaroidOpacity={polaroidOpacity}
            rightX={rightX}
            rightY={rightY}
            rightOpacity={rightOpacity}
            r1Opacity={r1Opacity}
            r1Y={r1Y}
            r2Opacity={r2Opacity}
            r2Y={r2Y}
            r3Opacity={r3Opacity}
            r3Y={r3Y}
            r4Opacity={r4Opacity}
            r4Y={r4Y}
            r5Opacity={r5Opacity}
            r5Y={r5Y}
            doodleTopY={doodleTopY}
            doodleBottomY={doodleBottomY}
            doodleLoopX={doodleLoopX}
            doodleOpacity={doodleOpacity}
            doodleScale={doodleScale}
          />
        </div>

        {/* Mobile layout · vertical · parallax simplificado */}
        <div className="flex h-full w-full flex-col md:hidden">
          <MobileLayout
            line1Opacity={line1Opacity}
            line2Opacity={line2Opacity}
            line3Opacity={line3Opacity}
            subLeftOpacity={subLeftOpacity}
            polaroidScale={polaroidScale}
            polaroidOpacity={polaroidOpacity}
            r1Opacity={r1Opacity}
            r2Opacity={r2Opacity}
            r3Opacity={r3Opacity}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Desktop layout · 3 zonas (izquierda + centro polaroid + derecha)
   ──────────────────────────────────────────────────────────────────── */

type MV = ReturnType<typeof useTransform<number, number>>;

interface DesktopProps {
  bgY: MV;
  leftY: MV;
  leftOpacity: MV;
  line1Opacity: MV;
  line1Y: MV;
  line2Opacity: MV;
  line2Y: MV;
  line3Opacity: MV;
  line3Y: MV;
  subLeftOpacity: MV;
  subLeftY: MV;
  polaroidScale: MV;
  polaroidY: MV;
  polaroidRotate: MV;
  polaroidOpacity: MV;
  rightX: MV;
  rightY: MV;
  rightOpacity: MV;
  r1Opacity: MV;
  r1Y: MV;
  r2Opacity: MV;
  r2Y: MV;
  r3Opacity: MV;
  r3Y: MV;
  r4Opacity: MV;
  r4Y: MV;
  r5Opacity: MV;
  r5Y: MV;
  doodleTopY: MV;
  doodleBottomY: MV;
  doodleLoopX: MV;
  doodleOpacity: MV;
  doodleScale: MV;
}

function DesktopLayout(p: DesktopProps) {
  return (
    <>
      {/* L1 · Background paper layer · parallax muy sutil */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: p.bgY }}
        aria-hidden="true"
      >
        {/* Paper texture overlay extra (sobre el body bg ya cremoso) */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>\")",
            backgroundSize: '320px 320px',
          }}
        />
      </motion.div>

      {/* L2 · Bloque izquierdo (texto "Probablemente...") */}
      <motion.div
        className="absolute left-[7vw] top-1/2 z-20 w-[36vw] -translate-y-1/2"
        style={{ y: p.leftY, opacity: p.leftOpacity }}
      >
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

          {/* Subrayado handwritten doble bajo el headline */}
          <motion.div
            className="mt-2 origin-left"
            style={{ opacity: p.line3Opacity, width: '24%', maxWidth: 200 }}
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

        {/* Doodle loop garabato bajo subtexto izquierdo */}
        <motion.div
          className="pointer-events-none mt-6"
          style={{
            opacity: p.doodleOpacity,
            scale: p.doodleScale,
            x: p.doodleLoopX,
          }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowLoop" width={90} />
        </motion.div>
      </motion.div>

      {/* L3 · Polaroid central · más parallax */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 w-[30vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2"
        style={{
          scale: p.polaroidScale,
          y: p.polaroidY,
          rotate: p.polaroidRotate,
          opacity: p.polaroidOpacity,
          willChange: 'transform',
        }}
      >
        <FloatingPolaroid />
      </motion.div>

      {/* L4 · Bloque derecho (texto "Aquí estoy yo...") */}
      <motion.div
        className="absolute right-[6vw] top-1/2 z-20 w-[28vw] -translate-y-1/2"
        style={{ x: p.rightX, y: p.rightY, opacity: p.rightOpacity }}
      >
        <motion.h2
          className="font-grift text-[clamp(28px,2.6vw,40px)] font-extrabold leading-[1.05] tracking-tight text-ink"
          style={{ opacity: p.r1Opacity, y: p.r1Y }}
        >
          Aquí estoy yo.
        </motion.h2>

        {/* Subrayado handwritten bajo "Aquí estoy yo." */}
        <motion.div
          className="mt-1 origin-left"
          style={{ opacity: p.r1Opacity, width: '60%', maxWidth: 240 }}
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
      </motion.div>

      {/* L5 · Doodles distribuidos · parallax independiente */}
      {/* Doodle 1 · curva top-center apuntando a la polaroid */}
      <motion.div
        className="pointer-events-none absolute left-[42vw] top-[12vh] z-30"
        style={{
          opacity: p.doodleOpacity,
          scale: p.doodleScale,
          y: p.doodleTopY,
          rotate: 15,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowCurve" width={140} />
      </motion.div>

      {/* Doodle 2 · curva top-right apuntando a la polaroid desde derecha */}
      <motion.div
        className="pointer-events-none absolute left-[62vw] top-[14vh] z-30"
        style={{
          opacity: p.doodleOpacity,
          scale: p.doodleScale,
          y: p.doodleTopY,
          rotate: -10,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowCurve" width={130} flipX />
      </motion.div>

      {/* Doodle 3 · loop bottom-center · debajo polaroid */}
      <motion.div
        className="pointer-events-none absolute left-[40vw] bottom-[8vh] z-30"
        style={{
          opacity: p.doodleOpacity,
          scale: p.doodleScale,
          y: p.doodleBottomY,
          x: p.doodleLoopX,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowSmallLoop" width={110} />
      </motion.div>

      {/* Doodle 4 · curva bottom-right apuntando hacia polaroid desde abajo */}
      <motion.div
        className="pointer-events-none absolute left-[58vw] bottom-[6vh] z-30"
        style={{
          opacity: p.doodleOpacity,
          scale: p.doodleScale,
          y: p.doodleBottomY,
          rotate: -15,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowUpLeft" width={150} />
      </motion.div>

      {/* Doodle 5 · arrow apuntando al bloque derecho */}
      <motion.div
        className="pointer-events-none absolute right-[40vw] top-[20vh] z-30"
        style={{
          opacity: p.doodleOpacity,
          scale: p.doodleScale,
          rotate: 5,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="arrowRight" width={120} />
      </motion.div>

      {/* Doodle 6 · sparkle decorativo top-left */}
      <motion.div
        className="pointer-events-none absolute left-[42vw] bottom-[20vh] z-30"
        style={{
          opacity: p.doodleOpacity,
          scale: p.doodleScale,
        }}
        aria-hidden="true"
      >
        <HandwrittenAsset variant="sparkleAlt" width={60} />
      </motion.div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Polaroid central · marco crema + foto + sutil floating loop
   ──────────────────────────────────────────────────────────────────── */

function FloatingPolaroid() {
  return (
    <motion.div
      className="relative"
      style={{ aspectRatio: '4 / 5' }}
      animate={{
        y: [0, -6, 0],
        rotate: [0, 0.5, 0],
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
        <img
          src="/img/padre.jpg"
          alt="Padre · Albert · sonriendo"
          className="block h-full w-full object-cover"
          style={{ aspectRatio: '4 / 5' }}
          onError={(e) => {
            // Fallback al placeholder svg si padre.jpg no existe aún
            (e.target as HTMLImageElement).src = '/img/padre.svg';
          }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Mobile layout · vertical · sin parallax horizontal
   ──────────────────────────────────────────────────────────────────── */

interface MobileProps {
  line1Opacity: MV;
  line2Opacity: MV;
  line3Opacity: MV;
  subLeftOpacity: MV;
  polaroidScale: MV;
  polaroidOpacity: MV;
  r1Opacity: MV;
  r2Opacity: MV;
  r3Opacity: MV;
}

function MobileLayout(p: MobileProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="font-grift text-ink">
        <motion.div
          className="text-[10vw] font-light leading-[1.0] tracking-tight"
          style={{ opacity: p.line1Opacity }}
        >
          Probablemente
        </motion.div>
        <motion.div
          className="text-[10vw] font-extrabold leading-[1.0] tracking-tight"
          style={{ opacity: p.line2Opacity }}
        >
          es el mejor niño
        </motion.div>
        <motion.div
          className="text-[10vw] font-extrabold leading-[1.0] tracking-tight"
          style={{ opacity: p.line3Opacity }}
        >
          del mundo.
        </motion.div>
        <motion.div
          className="mt-3 font-grift text-[16px] font-medium leading-[1.45] text-ink-soft"
          style={{ opacity: p.subLeftOpacity }}
        >
          ¿qué cómo lo sé?, pues porque soy su padre.
        </motion.div>
      </div>

      <motion.div
        className="relative w-[70vw] max-w-[320px]"
        style={{
          scale: p.polaroidScale,
          opacity: p.polaroidOpacity,
          aspectRatio: '4 / 5',
        }}
      >
        <FloatingPolaroid />
      </motion.div>

      <motion.div
        className="font-grift text-ink"
        style={{ opacity: p.r1Opacity }}
      >
        <h2 className="text-[24px] font-extrabold leading-[1.05] tracking-tight">
          Aquí estoy yo.
        </h2>
        <motion.div
          className="mt-2 text-[16px] font-bold"
          style={{ opacity: p.r2Opacity }}
        >
          Padre de Inti y Llivia.
        </motion.div>
        <motion.p
          className="mt-4 text-[14px] font-medium leading-[1.5] text-ink-soft"
          style={{ opacity: p.r3Opacity }}
        >
          Muy orgulloso de cada uno de mis peques. Aún que nadie me enseñó a ser
          padre. Y nadie me avisó de lo complejo que es.
        </motion.p>
      </motion.div>
    </div>
  );
}
