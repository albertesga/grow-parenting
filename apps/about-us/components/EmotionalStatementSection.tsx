'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Chip, { ChipTono } from './Chip';
import TonalUnderline from './TonalUnderline';
import EmotionalLottieArrow from './EmotionalLottieArrow';
import useIsDesktop from './useIsDesktop';

/**
 * EmotionalStatementSection v2 · DS-aligned · "Probablemente / Aquí estoy yo."
 *
 * Sección 2 con storytelling scroll-driven · 3 columnas desktop ·
 * polaroid stack animation (titoAlone behind + titoKids drops on top).
 *
 * Tipografía DS canon May 2026:
 *  - Galiner (font-serif) · headlines, eyebrows
 *  - Inter (font-text)    · body, chips, captions
 *
 * Composición:
 *  - Bloque IZQ · eyebrow "EL HIJO" + headline Galiner mix + TonalUnderline
 *    + body Inter "¿cómo lo sé? porque soy su padre"
 *  - CENTER · stack 2 polaroids con chip-labels dentro
 *    · titoAlone label "Tito" · titoKids cluster "Inti+Llivia+Tito"
 *  - Bloque DER · eyebrow "EL PADRE" + headline "Aquí estoy yo." +
 *    TonalUnderline ink + chip-strip family + body + closing callout
 *    "Y de eso nace Mimo."
 *
 * Wrapper sticky 320vh · timeline 0→0.95 cambios · 0.95→1.0 HOLD.
 *
 * Cero handwritten doodles · 100% DS primitives.
 */

// Family chips · identidades visibles a la derecha
const FAMILY_CHIPS: { tono: ChipTono; label: string }[] = [
  { tono: 'mint', label: 'Inti · 7' },
  { tono: 'coral', label: 'Llivia · 3' },
  { tono: 'paper', label: 'Tito' },
];

export default function EmotionalStatementSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();

  return (
    <section
      ref={wrapperRef}
      className="relative w-full lg:h-[320vh]"
      aria-label="Probablemente es el mejor niño del mundo"
    >
      {isDesktop ? <DesktopEmotionalSticky wrapperRef={wrapperRef} /> : null}

      {/* Mobile + tablet · lectura natural, sin forzar todo en un sticky h-screen */}
      <MobileEditorialLayout />
    </section>
  );
}

function DesktopEmotionalSticky({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  // ═══════════════════════════════════════════════════════
  // MOMENTO 1 · Bloque izquierdo (0.00 → 0.25)
  // ═══════════════════════════════════════════════════════
  const eyebrowLeftOpacity = useTransform(progress, [0.00, 0.04], [0, 1]);
  const eyebrowLeftY = useTransform(progress, [0.00, 0.04], [8, 0]);
  const line1Opacity = useTransform(progress, [0.02, 0.08], [0, 1]);
  const line1Y = useTransform(progress, [0.02, 0.08], [40, 0]);
  const line2Opacity = useTransform(progress, [0.06, 0.12], [0, 1]);
  const line2Y = useTransform(progress, [0.06, 0.12], [40, 0]);
  const line3Opacity = useTransform(progress, [0.10, 0.16], [0, 1]);
  const line3Y = useTransform(progress, [0.10, 0.16], [40, 0]);
  const underlineLeftProgress = useTransform(progress, [0.14, 0.22], [0, 1]);
  const subLeftOpacity = useTransform(progress, [0.18, 0.25], [0, 1]);
  const subLeftY = useTransform(progress, [0.18, 0.25], [24, 0]);

  // ═══════════════════════════════════════════════════════
  // MOMENTO 2 · Polaroid stack (0.20 → 0.65)
  // ═══════════════════════════════════════════════════════
  const polaroidOpacity = useTransform(progress, [0.22, 0.38], [0, 1]);
  const polaroidScale = useTransform(progress, [0.22, 0.42], [0.85, 1]);
  const polaroidY = useTransform(progress, [0.22, 0.42], [80, 0]);
  // Polaroid 1 (titoAlone · DETRÁS)
  const polaroid1X = useTransform(progress, [0.40, 0.65], [0, -54]);
  const polaroid1Y = useTransform(progress, [0.40, 0.65], [0, 12]);
  const polaroid1Rotate = useTransform(progress, [0.22, 0.42, 0.65], [-5, -3, -10]);
  // Polaroid 2 (titoKids · DELANTE) · cae desde arriba con overshoot
  const polaroid2Opacity = useTransform(progress, [0.42, 0.58], [0, 1]);
  const polaroid2Scale = useTransform(progress, [0.42, 0.55, 0.65], [0.72, 1.04, 1]);
  const polaroid2Y = useTransform(progress, [0.42, 0.65], [-80, -8]);
  const polaroid2X = useTransform(progress, [0.42, 0.65], [20, 44]);
  const polaroid2Rotate = useTransform(progress, [0.42, 0.55, 0.85], [14, 7, 5]);
  // Chip labels · sincronizados con la aparición de cada polaroid
  const chipLabelAloneOpacity = useTransform(progress, [0.30, 0.42], [0, 1]);
  const chipLabelKidsOpacity = useTransform(progress, [0.50, 0.62], [0, 1]);

  // ═══════════════════════════════════════════════════════
  // MOMENTO 3 · Bloque derecho (0.40 → 0.78)
  // ═══════════════════════════════════════════════════════
  const eyebrowRightOpacity = useTransform(progress, [0.38, 0.44], [0, 1]);
  const eyebrowRightY = useTransform(progress, [0.38, 0.44], [8, 0]);
  const r1Opacity = useTransform(progress, [0.42, 0.50], [0, 1]);
  const r1Y = useTransform(progress, [0.42, 0.50], [30, 0]);
  const r1X = useTransform(progress, [0.42, 0.55], [40, 0]);
  const underlineRightProgress = useTransform(progress, [0.48, 0.56], [0, 1]);
  const familyStripOpacity = useTransform(progress, [0.54, 0.64], [0, 1]);
  const r2Opacity = useTransform(progress, [0.58, 0.66], [0, 1]);
  const r2Y = useTransform(progress, [0.58, 0.66], [20, 0]);
  const r3Opacity = useTransform(progress, [0.62, 0.70], [0, 1]);
  const r3Y = useTransform(progress, [0.62, 0.70], [16, 0]);
  const r4Opacity = useTransform(progress, [0.66, 0.74], [0, 1]);
  const r4Y = useTransform(progress, [0.66, 0.74], [16, 0]);
  const r5Opacity = useTransform(progress, [0.70, 0.78], [0, 1]);
  const r5Y = useTransform(progress, [0.70, 0.78], [16, 0]);
  // Closing callout · bridge a sección 3
  const closingOpacity = useTransform(progress, [0.80, 0.90], [0, 1]);
  const closingY = useTransform(progress, [0.80, 0.90], [16, 0]);
  const closingScale = useTransform(progress, [0.80, 0.90], [0.88, 1]);

  return (
    <div className="sticky top-0 hidden h-screen w-full overflow-hidden lg:block">
      {/* Paper texture overlay sutil */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>\")",
          backgroundSize: '320px 320px',
        }}
        aria-hidden="true"
      />

      {/* Desktop layout · 3 columnas · lg+ (1024+) */}
      <div className="relative h-full w-full">
        <DesktopLayout
          eyebrowLeftOpacity={eyebrowLeftOpacity}
          eyebrowLeftY={eyebrowLeftY}
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
          polaroid1X={polaroid1X}
          polaroid1Y={polaroid1Y}
          polaroid1Rotate={polaroid1Rotate}
          polaroid2Opacity={polaroid2Opacity}
          polaroid2Scale={polaroid2Scale}
          polaroid2Y={polaroid2Y}
          polaroid2X={polaroid2X}
          polaroid2Rotate={polaroid2Rotate}
          chipLabelAloneOpacity={chipLabelAloneOpacity}
          chipLabelKidsOpacity={chipLabelKidsOpacity}
          eyebrowRightOpacity={eyebrowRightOpacity}
          eyebrowRightY={eyebrowRightY}
          r1Opacity={r1Opacity}
          r1Y={r1Y}
          r1X={r1X}
          underlineRightProgress={underlineRightProgress}
          familyStripOpacity={familyStripOpacity}
          r2Opacity={r2Opacity}
          r2Y={r2Y}
          r3Opacity={r3Opacity}
          r3Y={r3Y}
          r4Opacity={r4Opacity}
          r4Y={r4Y}
          r5Opacity={r5Opacity}
          r5Y={r5Y}
          closingOpacity={closingOpacity}
          closingY={closingY}
          closingScale={closingScale}
          progress={progress}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Desktop layout · 3 columnas storytelling
   ──────────────────────────────────────────────────────────────────── */

type MV = MotionValue<number>;

interface DesktopProps {
  eyebrowLeftOpacity: MV; eyebrowLeftY: MV;
  line1Opacity: MV; line1Y: MV;
  line2Opacity: MV; line2Y: MV;
  line3Opacity: MV; line3Y: MV;
  underlineLeftProgress: MV;
  subLeftOpacity: MV; subLeftY: MV;
  polaroidOpacity: MV; polaroidScale: MV; polaroidY: MV;
  polaroid1X: MV; polaroid1Y: MV; polaroid1Rotate: MV;
  polaroid2Opacity: MV; polaroid2Scale: MV; polaroid2Y: MV;
  polaroid2X: MV; polaroid2Rotate: MV;
  chipLabelAloneOpacity: MV;
  chipLabelKidsOpacity: MV;
  eyebrowRightOpacity: MV; eyebrowRightY: MV;
  r1Opacity: MV; r1Y: MV; r1X: MV;
  underlineRightProgress: MV;
  familyStripOpacity: MV;
  r2Opacity: MV; r2Y: MV;
  r3Opacity: MV; r3Y: MV;
  r4Opacity: MV; r4Y: MV;
  r5Opacity: MV; r5Y: MV;
  closingOpacity: MV; closingY: MV; closingScale: MV;
  progress: MV;
}

function DesktopLayout(p: DesktopProps) {
  return (
    <div className="relative grid h-full w-full grid-cols-[minmax(300px,0.9fr)_minmax(280px,0.72fr)_minmax(330px,0.82fr)] items-center gap-[clamp(28px,3.4vw,88px)] px-[clamp(44px,5vw,128px)] xl:grid-cols-[minmax(340px,0.88fr)_minmax(310px,0.7fr)_minmax(360px,0.78fr)] 2xl:px-[clamp(72px,6vw,168px)]">
      <EmotionalLottieArrow progress={p.progress} />

      {/* Bloque izquierdo · contenido acotado para no invadir las fotos */}
      <div className="relative z-30 min-w-0 max-w-[620px] justify-self-start text-ink">
        {/* Eyebrow caps Galiner Light */}
        <motion.p
          className="mb-4 font-serif font-light uppercase text-ink-soft"
          style={{
            opacity: p.eyebrowLeftOpacity,
            y: p.eyebrowLeftY,
            fontSize: 'clamp(11px, 0.85vw, 13px)',
            letterSpacing: '0.22em',
          }}
        >
          El Hijo
        </motion.p>

        <div className="font-serif text-ink">
          <motion.div
            className="text-[clamp(46px,4.1vw,96px)] font-light leading-[0.98] tracking-tight"
            style={{ opacity: p.line1Opacity, y: p.line1Y, letterSpacing: '-0.018em' }}
          >
            Probablemente
          </motion.div>
          <motion.div
            className="max-w-[10.5ch] text-[clamp(46px,4.1vw,96px)] font-light leading-[0.98] tracking-tight"
            style={{ opacity: p.line2Opacity, y: p.line2Y, letterSpacing: '-0.018em' }}
          >
            es el <span className="font-bold">mejor niño</span>
          </motion.div>
          <motion.div
            className="text-[clamp(46px,4.1vw,96px)] font-bold leading-[0.98] tracking-tight"
            style={{ opacity: p.line3Opacity, y: p.line3Y, letterSpacing: '-0.018em' }}
          >
            del mundo.
          </motion.div>

          <div className="mt-5">
            <TonalUnderline tono="mint" width={220} height={4} progress={p.underlineLeftProgress} />
          </div>
        </div>

        <motion.div
          className="mt-10 max-w-[28ch] font-text text-[clamp(16px,1.12vw,22px)] font-light leading-[1.45] text-ink-soft"
          style={{ opacity: p.subLeftOpacity, y: p.subLeftY, letterSpacing: '-0.005em' }}
        >
          ¿cómo lo sé?,
          <br />
          pues porque <span className="font-bold text-ink">soy su padre</span>.
        </motion.div>
      </div>

      {/* Polaroid stack centro · contenido propio, sin pisar texto */}
      <div
        data-emotional-arrow-target
        className="relative z-20 aspect-[4/5] w-[min(24vw,380px)] min-w-[280px] justify-self-center"
      >
        <PolaroidWithCombinedY
          opacity={p.polaroidOpacity}
          scale={p.polaroidScale}
          baseY={p.polaroidY}
          extraY={p.polaroid1Y}
          x={p.polaroid1X}
          rotate={p.polaroid1Rotate}
          src="/homepage/about-us/img/titoAlone.jpg"
          alt="Padre · Tito · sonriendo"
          floatRotate={-4}
          zIndex={10}
          labelChip={
            <motion.div style={{ opacity: p.chipLabelAloneOpacity, rotate: -2 }}>
              <Chip tono="paper" size="xs">Tito</Chip>
            </motion.div>
          }
        />

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
          <FloatingPolaroid
            src="/homepage/about-us/img/titoKids.jpg"
            alt="Padre con sus hijas"
            floatRotate={6}
            labelChip={
              <motion.div
                className="flex items-center justify-center gap-1.5 [&>*:nth-child(1)]:-rotate-[4deg] [&>*:nth-child(2)]:rotate-[2deg] [&>*:nth-child(3)]:-rotate-[3deg]"
                style={{ opacity: p.chipLabelKidsOpacity }}
              >
                <Chip tono="paper" size="xs">Tito</Chip>
                <Chip tono="mint" size="xs">Inti</Chip>
                <Chip tono="coral" size="xs">Llivia</Chip>
              </motion.div>
            }
          />
        </motion.div>
      </div>

      {/* Bloque derecho · ancho cómodo de lectura */}
      <div className="relative z-30 min-w-0 max-w-[520px] justify-self-end text-ink">
        <motion.p
          className="mb-3 font-serif font-light uppercase text-ink-soft"
          style={{
            opacity: p.eyebrowRightOpacity,
            y: p.eyebrowRightY,
            fontSize: 'clamp(11px, 0.85vw, 13px)',
            letterSpacing: '0.22em',
          }}
        >
          El Padre
        </motion.p>

        <motion.h2
          data-emotional-arrow-start
          className="font-serif text-[clamp(30px,2.3vw,48px)] font-bold leading-[1.02] tracking-tight text-ink"
          style={{ opacity: p.r1Opacity, y: p.r1Y, x: p.r1X, letterSpacing: '-0.018em' }}
        >
          Aquí estoy yo.
        </motion.h2>

        <div className="mt-3">
          <TonalUnderline tono="ink" width={150} height={3} progress={p.underlineRightProgress} />
        </div>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-2 [&>*:nth-child(1)]:-rotate-[3deg] [&>*:nth-child(2)]:rotate-[2deg] [&>*:nth-child(3)]:-rotate-[2deg]"
          style={{ opacity: p.familyStripOpacity }}
        >
          {FAMILY_CHIPS.map((c) => (
            <Chip key={c.label} tono={c.tono} size="sm">
              {c.label}
            </Chip>
          ))}
        </motion.div>

        <motion.div
          className="mt-7 font-text text-[clamp(18px,1.25vw,27px)] font-light leading-[1.35] text-ink"
          style={{ opacity: p.r2Opacity, y: p.r2Y, letterSpacing: '-0.005em' }}
        >
          <span className="font-bold">Padre</span> de{' '}
          <span className="font-bold">Inti</span> y{' '}
          <span className="font-bold">Llivia</span>.
        </motion.div>

        <motion.p
          className="mt-5 max-w-[27ch] font-text text-[clamp(17px,1.16vw,25px)] font-light leading-[1.5] text-ink-soft"
          style={{ opacity: p.r3Opacity, y: p.r3Y, letterSpacing: '-0.005em' }}
        >
          Aunque <span className="font-bold text-ink">nadie</span> me enseñó a{' '}
          <span className="font-bold text-ink">ser padre</span>.
        </motion.p>

        <motion.p
          className="mt-3 max-w-[27ch] font-text text-[clamp(17px,1.16vw,25px)] font-light leading-[1.5] text-ink-soft"
          style={{ opacity: p.r4Opacity, y: p.r4Y, letterSpacing: '-0.005em' }}
        >
          Y <span className="font-bold text-ink">nadie</span> me avisó de lo{' '}
          <span className="font-bold text-ink">complejo</span> que es.
        </motion.p>

        <motion.div
          className="mt-8"
          style={{ opacity: p.closingOpacity, y: p.closingY, scale: p.closingScale, rotate: -2 }}
        >
          <Chip tono="ink" size="md" className="px-5">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper" aria-hidden="true" />
            Y de eso nace Mimo.
          </Chip>
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Polaroid · marco crema + foto + chip label + floating loop infinito
   ──────────────────────────────────────────────────────────────────── */

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
  labelChip?: ReactNode;
}

function PolaroidWithCombinedY({
  opacity, scale, baseY, extraY, x, rotate,
  src, alt, floatRotate, zIndex, labelChip,
}: PolaroidWithCombinedYProps) {
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
      <FloatingPolaroid src={src} alt={alt} floatRotate={floatRotate} labelChip={labelChip} />
    </motion.div>
  );
}

interface FloatingPolaroidProps {
  src?: string;
  alt?: string;
  floatRotate?: number;
  /** Chip/cluster a renderizar dentro del label area (bottom 56px del frame) */
  labelChip?: ReactNode;
}

function FloatingPolaroid({
  src = '/homepage/about-us/img/titoAlone.jpg',
  alt = 'Padre · Tito · sonriendo',
  floatRotate = 1,
  labelChip,
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
      {/* Frame polaroid · marco crema con label area inferior */}
      <div
        className="relative h-full w-full bg-polaroid-paper"
        style={{
          padding: '14px 14px 56px 14px',
          borderRadius: 3,
          boxShadow:
            '0 1px 2px rgba(20,18,12,0.06), 0 14px 32px rgba(20,18,12,0.16), 0 28px 70px rgba(20,18,12,0.10)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="block h-full w-full object-cover"
          draggable={false}
        />

        {/* Chip label dentro del label area · centrado · bottom 14px del frame */}
        {labelChip && (
          <div className="pointer-events-none absolute bottom-[14px] left-1/2 -translate-x-1/2">
            {labelChip}
          </div>
        )}
      </div>
    </motion.div>
  );
}


/* ────────────────────────────────────────────────────────────────────
   Mobile/Tablet layout · lectura natural, sin sticky h-screen
   ──────────────────────────────────────────────────────────────────── */

function MobileEditorialLayout() {
  return (
    <div className="relative z-10 px-5 pb-20 pt-44 sm:px-8 sm:pt-48 md:px-10 lg:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>\")",
          backgroundSize: '320px 320px',
        }}
      />

      <div className="mx-auto max-w-[520px]">
        <p
          className="mb-3 font-serif text-[10px] font-light uppercase text-ink-soft"
          style={{ letterSpacing: '0.22em' }}
        >
          El Hijo
        </p>

        <div className="font-serif">
          <div
            className="text-[clamp(40px,11.6vw,64px)] font-light leading-[0.96] tracking-tight text-ink"
            style={{ letterSpacing: '-0.018em' }}
          >
            Probablemente
          </div>
          <div
            className="max-w-[9.5ch] text-[clamp(40px,11.6vw,64px)] font-light leading-[0.96] tracking-tight text-ink"
            style={{ letterSpacing: '-0.018em' }}
          >
            es el <span className="font-bold">mejor niño</span>
          </div>
          <div
            className="text-[clamp(40px,11.6vw,64px)] font-bold leading-[0.96] tracking-tight text-ink"
            style={{ letterSpacing: '-0.018em' }}
          >
            del mundo.
          </div>

          <div className="mt-4">
            <TonalUnderline tono="mint" width={180} height={3} />
          </div>
        </div>

        <p
          className="mt-7 max-w-[26ch] font-text text-[clamp(17px,4.5vw,20px)] font-light leading-[1.42] text-ink-soft"
          style={{ letterSpacing: '-0.005em' }}
        >
          ¿cómo lo sé?,
          <br />
          pues porque <span className="font-bold text-ink">soy su padre</span>.
        </p>

        <div
          className="relative mx-auto mt-12 h-[clamp(330px,92vw,470px)] w-full max-w-[390px]"
          aria-label="Fotos familiares"
        >
          <div className="absolute left-0 top-10 z-10 w-[72%] -rotate-[8deg] opacity-95">
            <FloatingPolaroid
              src="/homepage/about-us/img/titoAlone.jpg"
              alt="Padre · Tito · sonriendo"
              floatRotate={-2}
              labelChip={<Chip tono="paper" size="xs">Tito</Chip>}
            />
          </div>

          <div className="absolute right-0 top-0 z-20 w-[80%] rotate-[5deg]">
            <FloatingPolaroid
              src="/homepage/about-us/img/titoKids.jpg"
              alt="Padre con Inti y Llivia"
              floatRotate={3}
              labelChip={
                <div className="flex items-center justify-center gap-1.5 [&>*:nth-child(1)]:-rotate-[4deg] [&>*:nth-child(2)]:rotate-[2deg] [&>*:nth-child(3)]:-rotate-[3deg]">
                  <Chip tono="paper" size="xs">Tito</Chip>
                  <Chip tono="mint" size="xs">Inti</Chip>
                  <Chip tono="coral" size="xs">Llivia</Chip>
                </div>
              }
            />
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-stone/70 bg-paper/70 p-6 shadow-[0_22px_60px_rgba(20,18,12,0.08)] backdrop-blur-sm">
          <p
            className="mb-3 font-serif text-[10px] font-light uppercase text-ink-soft"
            style={{ letterSpacing: '0.22em' }}
          >
            El Padre
          </p>

          <h2
            className="font-serif text-[clamp(32px,8.8vw,46px)] font-bold leading-[1.02] tracking-tight text-ink"
            style={{ letterSpacing: '-0.018em' }}
          >
            Aquí estoy yo.
          </h2>

          <div className="mt-3">
            <TonalUnderline tono="ink" width={132} height={3} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 [&>*:nth-child(1)]:-rotate-[3deg] [&>*:nth-child(2)]:rotate-[2deg] [&>*:nth-child(3)]:-rotate-[2deg]">
            {FAMILY_CHIPS.map((c) => (
              <Chip key={c.label} tono={c.tono} size="xs">
                {c.label}
              </Chip>
            ))}
          </div>

          <div
            className="mt-6 font-text text-[clamp(17px,4.4vw,21px)] font-light leading-[1.42] text-ink"
            style={{ letterSpacing: '-0.005em' }}
          >
            <span className="font-bold">Padre</span> de{' '}
            <span className="font-bold">Inti</span> y{' '}
            <span className="font-bold">Llivia</span>.
          </div>

          <p className="mt-5 font-text text-[clamp(16px,4.15vw,19px)] font-light leading-[1.48] text-ink-soft">
            Aunque <span className="font-bold text-ink">nadie</span> me enseñó a{' '}
            <span className="font-bold text-ink">ser padre</span>.
          </p>
          <p className="mt-3 font-text text-[clamp(16px,4.15vw,19px)] font-light leading-[1.48] text-ink-soft">
            Y <span className="font-bold text-ink">nadie</span> me avisó de lo{' '}
            <span className="font-bold text-ink">complejo</span> que es.
          </p>

          <div className="mt-7 -rotate-2">
            <Chip tono="ink" size="sm" className="px-4">
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper"
                aria-hidden="true"
              />
              Y de eso nace Mimo.
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
}
