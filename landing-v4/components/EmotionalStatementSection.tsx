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
  // Timeline · MOMENTO 2 · Polaroid stack (0.20 → 0.65)
  // 2 polaroids con storytelling:
  //  · titoAlone (padre solo) entra primero · rotate -3° → 2°
  //  · titoKids (padre con hijas) entra después · viene desde detrás
  //  · al final, la titoAlone se desliza ligeramente al lado revelando
  //    titoKids · ambas visibles formando un álbum scrapbook
  // ═══════════════════════════════════════════════════════
  const polaroidOpacity = useTransform(progress, [0.22, 0.38], [0, 1]);
  const polaroidScale = useTransform(progress, [0.22, 0.42], [0.85, 1]);
  const polaroidY = useTransform(progress, [0.22, 0.42], [80, 0]);
  // Polaroid 1 (titoAlone · DETRÁS) · entra primero centrada
  // Después de aparecer la 2ª polaroid encima, se desliza a la izquierda
  // y rota más como mostrándose desde detrás del nuevo elemento.
  const polaroid1X = useTransform(progress, [0.40, 0.65], [0, -110]);
  const polaroid1Y = useTransform(progress, [0.40, 0.65], [0, 12]);
  const polaroid1Rotate = useTransform(progress, [0.22, 0.42, 0.65], [-5, -3, -10]);
  // Polaroid 2 (titoKids · DELANTE) · "cae" desde arriba-derecha
  // con escala mayor para entrada dramática + rotación opuesta a la 1ª
  // Termina ligeramente a la derecha + arriba · creando un fan scrapbook
  const polaroid2Opacity = useTransform(progress, [0.42, 0.58], [0, 1]);
  const polaroid2Scale = useTransform(progress, [0.42, 0.55, 0.65], [0.72, 1.04, 1]);
  const polaroid2Y = useTransform(progress, [0.42, 0.65], [-80, -8]);
  const polaroid2X = useTransform(progress, [0.42, 0.65], [60, 95]);
  const polaroid2Rotate = useTransform(progress, [0.42, 0.55, 0.85], [18, 9, 7]);

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

        {/* Desktop layout · 3 columnas · lg+ (1024+)
            Tablet/mobile usan MobileLayout (vertical stack) */}
        <div className="relative hidden h-full w-full lg:block">
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
            polaroid1X={polaroid1X}
            polaroid1Y={polaroid1Y}
            polaroid1Rotate={polaroid1Rotate}
            polaroid2Opacity={polaroid2Opacity}
            polaroid2Scale={polaroid2Scale}
            polaroid2Y={polaroid2Y}
            polaroid2X={polaroid2X}
            polaroid2Rotate={polaroid2Rotate}
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

        {/* Mobile + Tablet · vertical · mismas MotionValues (scroll-driven) */}
        <div className="flex h-full w-full flex-col lg:hidden">
          <MobileLayout
            line1Opacity={line1Opacity}
            line1Y={line1Y}
            line2Opacity={line2Opacity}
            line2Y={line2Y}
            line3Opacity={line3Opacity}
            line3Y={line3Y}
            underlineLeftProgress={underlineLeftProgress}
            subLeftOpacity={subLeftOpacity}
            subLeftY={subLeftY}
            polaroidOpacity={polaroidOpacity}
            polaroidScale={polaroidScale}
            polaroidY={polaroidY}
            polaroid2Opacity={polaroid2Opacity}
            polaroid2Scale={polaroid2Scale}
            polaroid2Y={polaroid2Y}
            r1Opacity={r1Opacity}
            r1Y={r1Y}
            underlineRightProgress={underlineRightProgress}
            r2Opacity={r2Opacity}
            r2Y={r2Y}
            r3Opacity={r3Opacity}
            r3Y={r3Y}
            r4Opacity={r4Opacity}
            r4Y={r4Y}
            r5Opacity={r5Opacity}
            r5Y={r5Y}
          />
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
  polaroidOpacity: MV; polaroidScale: MV; polaroidY: MV;
  polaroid1X: MV; polaroid1Y: MV; polaroid1Rotate: MV;
  polaroid2Opacity: MV; polaroid2Scale: MV; polaroid2Y: MV;
  polaroid2X: MV; polaroid2Rotate: MV;
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
      {/* Bloque izquierdo · texto "Probablemente..." · width responsive
          tablet (md): w-[34vw] · desktop (lg+): w-[36vw] */}
      <div className="absolute left-[6vw] top-1/2 z-20 w-[34vw] -translate-y-1/2 lg:left-[7vw] lg:w-[36vw]">
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

        {/* Subtexto izquierdo · light con "soy su padre" en extrabold */}
        <motion.div
          className="mt-12 max-w-[28ch] font-grift text-[clamp(16px,1.25vw,22px)] font-light leading-[1.45] text-ink-soft"
          style={{ opacity: p.subLeftOpacity, y: p.subLeftY }}
        >
          ¿qué cómo lo sé?,
          <br />
          pues porque <span className="font-extrabold text-ink">soy su padre</span>.
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

      {/* Polaroid stack · 2 fotos centradas · scroll-driven storytelling
          Order narrativo:
          - Polaroid 1 (titoAlone · padre solo) entra primero · queda DETRÁS
          - Polaroid 2 (titoKids · padre con hijas) ENTRA ENCIMA · z-30 delante
          - Al avanzar scroll, ambas se separan formando un fan scrapbook
            con titoKids encima y ligeramente offset */}
      <div className="absolute left-[48%] top-1/2 z-10 w-[26vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 lg:w-[24vw]">
        {/* Polaroid 1 (DETRÁS) · titoAlone · entra primero · z-10
            Usa Y combinado · polaroidY entry + polaroid1Y desplazamiento final */}
        <PolaroidWithCombinedY
          opacity={p.polaroidOpacity}
          scale={p.polaroidScale}
          baseY={p.polaroidY}
          extraY={p.polaroid1Y}
          x={p.polaroid1X}
          rotate={p.polaroid1Rotate}
          src="/img/titoAlone.jpg"
          alt="Padre · Tito · sonriendo"
          floatRotate={-4}
          zIndex={10}
        />

        {/* Polaroid 2 (DELANTE) · titoKids · entra después CAYENDO ENCIMA · z-30
            superpone a titoAlone con offset derecha + rotación opuesta */}
        <motion.div
          className="absolute inset-0 z-30"
          style={{
            opacity: p.polaroid2Opacity,
            scale: p.polaroid2Scale,
            y: p.polaroid2Y,
            x: p.polaroid2X,
            rotate: p.polaroid2Rotate,
          }}
        >
          <FloatingPolaroid src="/img/titoKids.jpg" alt="Padre con sus hijas" floatRotate={6} />
        </motion.div>
      </div>

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

      {/* Bloque derecho · texto "Aquí estoy yo..." · scroll-driven escalonado
          Width responsive · más estrecho en tablet/notebook para no solapar
          polaroid. Espaciado vertical generoso y consistente. */}
      <div className="absolute right-[5vw] top-1/2 z-20 w-[24vw] max-w-[380px] -translate-y-1/2 lg:right-[6vw] lg:w-[26vw]">
        {/* Headline · gran tamaño, peso extra bold */}
        <motion.h2
          className="font-grift text-[clamp(28px,2.6vw,42px)] font-extrabold leading-[1.0] tracking-tight text-ink"
          style={{ opacity: p.r1Opacity, y: p.r1Y, x: p.r1X }}
        >
          Aquí estoy yo.
        </motion.h2>

        {/* Subrayado handwritten · pegado al baseline del h2 */}
        <motion.div
          className="-mt-1 origin-left"
          style={{
            scaleX: p.underlineRightProgress,
            opacity: p.underlineRightProgress,
            width: '70%',
            maxWidth: 240,
          }}
        >
          <HandwrittenAsset variant="swash" width={240} />
        </motion.div>

        {/* Sub-headline · interlineado compacto · "Padre de Inti y Llivia." */}
        <motion.div
          className="mt-5 font-grift text-[clamp(17px,1.4vw,22px)] font-light leading-[1.3] text-ink"
          style={{ opacity: p.r2Opacity, y: p.r2Y }}
        >
          <span className="font-extrabold">Padre</span> de{' '}
          <span className="font-extrabold">Inti</span> y{' '}
          <span className="font-extrabold">Llivia</span>.
        </motion.div>

        {/* Frase 1 (sutil) · "Muy orgulloso..." */}
        <motion.p
          className="mt-3 font-grift text-[clamp(15px,1.15vw,19px)] font-light leading-[1.45] text-ink-soft"
          style={{ opacity: p.r3Opacity, y: p.r3Y }}
        >
          <span className="font-extrabold text-ink">Muy orgulloso</span> de cada uno de mis{' '}
          <span className="font-extrabold text-ink">peques</span>.
        </motion.p>

        {/* Frase 2 (énfasis · tamaño mayor) · "Aún que nadie me enseñó..." */}
        <motion.p
          className="mt-2 font-grift text-[clamp(17px,1.35vw,22px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r4Opacity, y: p.r4Y }}
        >
          Aún que <span className="font-extrabold text-ink">nadie</span> me enseñó a{' '}
          <span className="font-extrabold text-ink">ser padre</span>.
        </motion.p>

        {/* Frase 3 (énfasis · tamaño mayor) · "Y nadie me avisó..." */}
        <motion.p
          className="mt-2 font-grift text-[clamp(17px,1.35vw,22px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r5Opacity, y: p.r5Y }}
        >
          Y <span className="font-extrabold text-ink">nadie</span> me avisó de lo{' '}
          <span className="font-extrabold text-ink">complejo</span> que es.
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

/* Helper · combina 2 motion values de Y para 1 transform.
   Usado para polaroid1 que necesita entry Y + offset Y final. */
interface PolaroidWithCombinedYProps {
  opacity: MV;
  scale: MV;
  baseY: MV;
  extraY: MV;
  x: MV;
  rotate: MV;
  src: string;
  alt: string;
  floatRotate: number;
  zIndex: number;
}

function PolaroidWithCombinedY({
  opacity, scale, baseY, extraY, x, rotate,
  src, alt, floatRotate, zIndex,
}: PolaroidWithCombinedYProps) {
  // Combina 2 Y values · suma pixel
  const combinedY = useTransform(
    [baseY, extraY] as MV[],
    (latest: number[]) => latest[0] + latest[1]
  );
  return (
    <motion.div
      className="relative"
      style={{
        zIndex,
        opacity,
        scale,
        y: combinedY,
        x,
        rotate,
      }}
    >
      <FloatingPolaroid src={src} alt={alt} floatRotate={floatRotate} />
    </motion.div>
  );
}

interface FloatingPolaroidProps {
  /** Path a la foto · default titoAlone */
  src?: string;
  /** Alt text · descriptivo de la foto */
  alt?: string;
  /** Rotación base para el floating loop · da carácter individual a
      cada polaroid en el stack · default 1° */
  floatRotate?: number;
}

function FloatingPolaroid({
  src = '/img/titoAlone.jpg',
  alt = 'Padre · Tito · sonriendo',
  floatRotate = 1,
}: FloatingPolaroidProps) {
  return (
    <motion.div
      className="relative"
      style={{ aspectRatio: '4 / 5' }}
      animate={{
        y: [0, -6, 0],
        rotate: [floatRotate, floatRotate + 0.5, floatRotate],
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
          src={src}
          alt={alt}
          className="block h-full w-full object-cover"
          style={{ aspectRatio: '4 / 5' }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Mobile/Tablet layout · vertical stack · scroll-driven storytelling
   ──────────────────────────────────────────────────────────────────── */

interface MobileProps {
  line1Opacity: MV; line1Y: MV;
  line2Opacity: MV; line2Y: MV;
  line3Opacity: MV; line3Y: MV;
  underlineLeftProgress: MV;
  subLeftOpacity: MV; subLeftY: MV;
  polaroidOpacity: MV; polaroidScale: MV; polaroidY: MV;
  polaroid2Opacity: MV; polaroid2Scale: MV; polaroid2Y: MV;
  r1Opacity: MV; r1Y: MV;
  underlineRightProgress: MV;
  r2Opacity: MV; r2Y: MV;
  r3Opacity: MV; r3Y: MV;
  r4Opacity: MV; r4Y: MV;
  r5Opacity: MV; r5Y: MV;
}

function MobileLayout(p: MobileProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 pt-16 pb-10">
      {/* Bloque 1 · texto "Probablemente..." */}
      <div className="w-full max-w-[480px] font-grift text-ink">
        <motion.div
          className="text-[clamp(36px,10vw,56px)] font-light leading-[1.0] tracking-tight"
          style={{ opacity: p.line1Opacity, y: p.line1Y }}
        >
          Probablemente
        </motion.div>
        <motion.div
          className="text-[clamp(36px,10vw,56px)] font-light leading-[1.0] tracking-tight"
          style={{ opacity: p.line2Opacity, y: p.line2Y }}
        >
          es el <span className="font-extrabold">mejor niño</span>
        </motion.div>
        <motion.div
          className="text-[clamp(36px,10vw,56px)] font-extrabold leading-[1.0] tracking-tight"
          style={{ opacity: p.line3Opacity, y: p.line3Y }}
        >
          del mundo.
        </motion.div>

        <motion.div
          className="mt-2 origin-left"
          style={{
            scaleX: p.underlineLeftProgress,
            opacity: p.underlineLeftProgress,
            width: '40%',
            maxWidth: 160,
          }}
        >
          <HandwrittenAsset variant="doubleLine" width={160} />
        </motion.div>

        <motion.div
          className="mt-5 text-[clamp(14px,3.8vw,16px)] font-light leading-[1.45] text-ink-soft"
          style={{ opacity: p.subLeftOpacity, y: p.subLeftY }}
        >
          ¿qué cómo lo sé?, pues porque{' '}
          <span className="font-extrabold text-ink">soy su padre</span>.
        </motion.div>
      </div>

      {/* Polaroid stack mobile · 2 fotos · misma idea de scroll storytelling
          La 2ª (titoKids) detrás · 1ª (titoAlone) delante se desliza al
          aparecer la 2ª · ambas visibles al final del scroll */}
      <div className="relative w-[64vw] max-w-[300px]" style={{ aspectRatio: '4 / 5' }}>
        {/* Polaroid 2 (atrás) · titoKids */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            opacity: p.polaroid2Opacity,
            scale: p.polaroid2Scale,
            y: p.polaroid2Y,
            x: 28, // offset fijo en mobile · sin scroll horizontal complejo
            rotate: 6,
          }}
        >
          <FloatingPolaroid src="/img/titoKids.jpg" alt="Padre con sus hijas" floatRotate={3} />
        </motion.div>

        {/* Polaroid 1 (delante) · titoAlone */}
        <motion.div
          className="relative z-20"
          style={{
            opacity: p.polaroidOpacity,
            scale: p.polaroidScale,
            y: p.polaroidY,
            x: -18,
            rotate: -3,
          }}
        >
          <FloatingPolaroid src="/img/titoAlone.jpg" alt="Padre · Tito · sonriendo" floatRotate={-1} />
        </motion.div>
      </div>

      {/* Bloque 2 · texto "Aquí estoy yo..." · espaciado consistente */}
      <div className="w-full max-w-[420px] font-grift text-ink">
        <motion.h2
          className="text-[clamp(26px,6.5vw,34px)] font-extrabold leading-[1.0] tracking-tight"
          style={{ opacity: p.r1Opacity, y: p.r1Y }}
        >
          Aquí estoy yo.
        </motion.h2>

        <motion.div
          className="-mt-1 origin-left"
          style={{
            scaleX: p.underlineRightProgress,
            opacity: p.underlineRightProgress,
            width: '60%',
            maxWidth: 180,
          }}
        >
          <HandwrittenAsset variant="swash" width={180} />
        </motion.div>

        {/* Sub-headline mobile · interlineado compacto */}
        <motion.div
          className="mt-3 text-[clamp(15px,4.4vw,18px)] font-light leading-[1.3]"
          style={{ opacity: p.r2Opacity, y: p.r2Y }}
        >
          <span className="font-extrabold">Padre</span> de{' '}
          <span className="font-extrabold">Inti</span> y{' '}
          <span className="font-extrabold">Llivia</span>.
        </motion.div>

        {/* Frase 1 (sutil) */}
        <motion.p
          className="mt-2 text-[clamp(14px,3.8vw,17px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r3Opacity, y: p.r3Y }}
        >
          <span className="font-extrabold text-ink">Muy orgulloso</span> de cada uno de mis{' '}
          <span className="font-extrabold text-ink">peques</span>.
        </motion.p>
        {/* Frase 2 (énfasis · tamaño mayor) */}
        <motion.p
          className="mt-1.5 text-[clamp(16px,4.4vw,20px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r4Opacity, y: p.r4Y }}
        >
          Aún que <span className="font-extrabold text-ink">nadie</span> me enseñó a{' '}
          <span className="font-extrabold text-ink">ser padre</span>.
        </motion.p>
        {/* Frase 3 (énfasis · tamaño mayor) */}
        <motion.p
          className="mt-1.5 text-[clamp(16px,4.4vw,20px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r5Opacity, y: p.r5Y }}
        >
          Y <span className="font-extrabold text-ink">nadie</span> me avisó de lo{' '}
          <span className="font-extrabold text-ink">complejo</span> que es.
        </motion.p>
      </div>
    </div>
  );
}
