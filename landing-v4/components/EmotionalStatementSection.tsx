'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Chip, { ChipTono } from './Chip';
import TonalUnderline from './TonalUnderline';

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
 *    "Y de eso nace Grow."
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
  const polaroid1X = useTransform(progress, [0.40, 0.65], [0, -110]);
  const polaroid1Y = useTransform(progress, [0.40, 0.65], [0, 12]);
  const polaroid1Rotate = useTransform(progress, [0.22, 0.42, 0.65], [-5, -3, -10]);
  // Polaroid 2 (titoKids · DELANTE) · cae desde arriba con overshoot
  const polaroid2Opacity = useTransform(progress, [0.42, 0.58], [0, 1]);
  const polaroid2Scale = useTransform(progress, [0.42, 0.55, 0.65], [0.72, 1.04, 1]);
  const polaroid2Y = useTransform(progress, [0.42, 0.65], [-80, -8]);
  const polaroid2X = useTransform(progress, [0.42, 0.65], [60, 95]);
  const polaroid2Rotate = useTransform(progress, [0.42, 0.55, 0.85], [18, 9, 7]);
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
    <section
      ref={wrapperRef}
      className="relative h-[320vh] w-full"
      aria-label="Probablemente es el mejor niño del mundo"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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
        <div className="relative hidden h-full w-full lg:block">
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
          />
        </div>

        {/* Mobile + Tablet · vertical · mismas MotionValues */}
        <div className="flex h-full w-full flex-col lg:hidden">
          <MobileLayout
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
            polaroid2Opacity={polaroid2Opacity}
            polaroid2Scale={polaroid2Scale}
            polaroid2Y={polaroid2Y}
            chipLabelAloneOpacity={chipLabelAloneOpacity}
            chipLabelKidsOpacity={chipLabelKidsOpacity}
            eyebrowRightOpacity={eyebrowRightOpacity}
            eyebrowRightY={eyebrowRightY}
            r1Opacity={r1Opacity}
            r1Y={r1Y}
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
          />
        </div>
      </div>
    </section>
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
}

function DesktopLayout(p: DesktopProps) {
  return (
    <>
      {/* Bloque izquierdo · eyebrow + headline + body */}
      <div className="absolute left-[6vw] top-1/2 z-20 w-[34vw] -translate-y-1/2 lg:left-[7vw] lg:w-[36vw]">
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
            className="text-[clamp(48px,5.4vw,86px)] font-light leading-[1.0] tracking-tight"
            style={{
              opacity: p.line1Opacity,
              y: p.line1Y,
              letterSpacing: '-0.018em',
            }}
          >
            Probablemente
          </motion.div>
          <motion.div
            className="text-[clamp(48px,5.4vw,86px)] font-light leading-[1.0] tracking-tight"
            style={{
              opacity: p.line2Opacity,
              y: p.line2Y,
              letterSpacing: '-0.018em',
            }}
          >
            es el <span className="font-bold">mejor niño</span>
          </motion.div>
          <motion.div
            className="text-[clamp(48px,5.4vw,86px)] font-bold leading-[1.0] tracking-tight"
            style={{
              opacity: p.line3Opacity,
              y: p.line3Y,
              letterSpacing: '-0.018em',
            }}
          >
            del mundo.
          </motion.div>

          {/* TonalUnderline mint · reemplaza doubleLine handwritten */}
          <div className="mt-4">
            <TonalUnderline
              tono="mint"
              width={200}
              height={4}
              progress={p.underlineLeftProgress}
            />
          </div>
        </div>

        {/* Subtexto izquierdo · Inter Light + Bold en énfasis */}
        <motion.div
          className="mt-10 max-w-[28ch] font-text text-[clamp(16px,1.25vw,22px)] font-light leading-[1.45] text-ink-soft"
          style={{
            opacity: p.subLeftOpacity,
            y: p.subLeftY,
            letterSpacing: '-0.005em',
          }}
        >
          ¿cómo lo sé?,
          <br />
          pues porque <span className="font-bold text-ink">soy su padre</span>.
        </motion.div>
      </div>

      {/* Polaroid stack centro · 2 fotos con chip-labels dentro */}
      <div className="absolute left-[48%] top-1/2 z-10 w-[26vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 lg:w-[24vw]">
        {/* Polaroid 1 (DETRÁS) · titoAlone · chip "Tito" en label area */}
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
          labelChip={
            <motion.div style={{ opacity: p.chipLabelAloneOpacity }}>
              <Chip tono="paper" size="xs">Tito</Chip>
            </motion.div>
          }
        />

        {/* Polaroid 2 (DELANTE) · titoKids · cluster 3 chips en label */}
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
            src="/img/titoKids.jpg"
            alt="Padre con sus hijas"
            floatRotate={6}
            labelChip={
              <motion.div
                className="flex items-center gap-1"
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

      {/* Bloque derecho · eyebrow + headline + chip-strip family + body + closing */}
      <div className="absolute right-[4vw] top-1/2 z-20 w-[30vw] max-w-[460px] -translate-y-1/2 lg:right-[5vw] lg:w-[32vw]">
        {/* Eyebrow caps Galiner Light */}
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

        {/* Headline Galiner Bold */}
        <motion.h2
          className="font-serif text-[clamp(28px,2.6vw,42px)] font-bold leading-[1.0] tracking-tight text-ink"
          style={{
            opacity: p.r1Opacity,
            y: p.r1Y,
            x: p.r1X,
            letterSpacing: '-0.018em',
          }}
        >
          Aquí estoy yo.
        </motion.h2>

        {/* TonalUnderline ink · reemplaza swash handwritten */}
        <div className="mt-3">
          <TonalUnderline
            tono="ink"
            width={140}
            height={3}
            progress={p.underlineRightProgress}
          />
        </div>

        {/* Chip-strip familia · 3 identidades */}
        <motion.div
          className="mt-5 flex flex-wrap items-center gap-2"
          style={{ opacity: p.familyStripOpacity }}
        >
          {FAMILY_CHIPS.map((c) => (
            <Chip key={c.label} tono={c.tono} size="sm">
              {c.label}
            </Chip>
          ))}
        </motion.div>

        {/* Sub-headline Inter Light · "Padre de Inti y Llivia" */}
        <motion.div
          className="mt-5 font-text text-[clamp(18px,1.6vw,28px)] font-light leading-[1.3] text-ink"
          style={{
            opacity: p.r2Opacity,
            y: p.r2Y,
            letterSpacing: '-0.005em',
          }}
        >
          <span className="font-bold">Padre</span> de{' '}
          <span className="font-bold">Inti</span> y{' '}
          <span className="font-bold">Llivia</span>.
        </motion.div>

        {/* 3 frases body · Inter */}
        <motion.p
          className="mt-3 font-text text-[clamp(18px,1.6vw,28px)] font-light leading-[1.4] text-ink-soft"
          style={{
            opacity: p.r3Opacity,
            y: p.r3Y,
            letterSpacing: '-0.005em',
          }}
        >
          <span className="font-bold text-ink">Muy orgulloso</span> de cada uno de mis{' '}
          <span className="font-bold text-ink">peques</span>.
        </motion.p>

        <motion.p
          className="mt-2 font-text text-[clamp(18px,1.6vw,28px)] font-light leading-[1.4] text-ink-soft"
          style={{
            opacity: p.r4Opacity,
            y: p.r4Y,
            letterSpacing: '-0.005em',
          }}
        >
          Aunque <span className="font-bold text-ink">nadie</span> me enseñó a{' '}
          <span className="font-bold text-ink">ser padre</span>.
        </motion.p>

        <motion.p
          className="mt-2 font-text text-[clamp(18px,1.6vw,28px)] font-light leading-[1.4] text-ink-soft"
          style={{
            opacity: p.r5Opacity,
            y: p.r5Y,
            letterSpacing: '-0.005em',
          }}
        >
          Y <span className="font-bold text-ink">nadie</span> me avisó de lo{' '}
          <span className="font-bold text-ink">complejo</span> que es.
        </motion.p>

        {/* Closing callout-pill · bridge a sección 3 · ink chip con dot */}
        <motion.div
          className="mt-7"
          style={{
            opacity: p.closingOpacity,
            y: p.closingY,
            scale: p.closingScale,
          }}
        >
          <Chip tono="ink" size="md" className="px-5">
            <span
              className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper"
              aria-hidden="true"
            />
            Y de eso nace Grow.
          </Chip>
        </motion.div>
      </div>
    </>
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
  src = '/img/titoAlone.jpg',
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
        className="relative h-full w-full bg-[#FBF8EE]"
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
   Mobile/Tablet layout · vertical stack
   ──────────────────────────────────────────────────────────────────── */

interface MobileProps {
  eyebrowLeftOpacity: MV; eyebrowLeftY: MV;
  line1Opacity: MV; line1Y: MV;
  line2Opacity: MV; line2Y: MV;
  line3Opacity: MV; line3Y: MV;
  underlineLeftProgress: MV;
  subLeftOpacity: MV; subLeftY: MV;
  polaroidOpacity: MV; polaroidScale: MV; polaroidY: MV;
  polaroid2Opacity: MV; polaroid2Scale: MV; polaroid2Y: MV;
  chipLabelAloneOpacity: MV;
  chipLabelKidsOpacity: MV;
  eyebrowRightOpacity: MV; eyebrowRightY: MV;
  r1Opacity: MV; r1Y: MV;
  underlineRightProgress: MV;
  familyStripOpacity: MV;
  r2Opacity: MV; r2Y: MV;
  r3Opacity: MV; r3Y: MV;
  r4Opacity: MV; r4Y: MV;
  r5Opacity: MV; r5Y: MV;
  closingOpacity: MV; closingY: MV; closingScale: MV;
}

function MobileLayout(p: MobileProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 pt-16 pb-10">
      {/* Bloque 1 · eyebrow + headline + body */}
      <div className="w-full max-w-[480px] text-ink">
        <motion.p
          className="mb-2 font-serif font-light uppercase text-ink-soft"
          style={{
            opacity: p.eyebrowLeftOpacity,
            y: p.eyebrowLeftY,
            fontSize: '10px',
            letterSpacing: '0.22em',
          }}
        >
          El Hijo
        </motion.p>

        <div className="font-serif">
          <motion.div
            className="text-[clamp(36px,10vw,56px)] font-light leading-[1.0] tracking-tight"
            style={{ opacity: p.line1Opacity, y: p.line1Y, letterSpacing: '-0.018em' }}
          >
            Probablemente
          </motion.div>
          <motion.div
            className="text-[clamp(36px,10vw,56px)] font-light leading-[1.0] tracking-tight"
            style={{ opacity: p.line2Opacity, y: p.line2Y, letterSpacing: '-0.018em' }}
          >
            es el <span className="font-bold">mejor niño</span>
          </motion.div>
          <motion.div
            className="text-[clamp(36px,10vw,56px)] font-bold leading-[1.0] tracking-tight"
            style={{ opacity: p.line3Opacity, y: p.line3Y, letterSpacing: '-0.018em' }}
          >
            del mundo.
          </motion.div>

          <div className="mt-3">
            <TonalUnderline
              tono="mint"
              width={140}
              height={3}
              progress={p.underlineLeftProgress}
            />
          </div>
        </div>

        <motion.div
          className="mt-5 font-text text-[clamp(14px,3.8vw,16px)] font-light leading-[1.45] text-ink-soft"
          style={{
            opacity: p.subLeftOpacity,
            y: p.subLeftY,
            letterSpacing: '-0.005em',
          }}
        >
          ¿cómo lo sé?, pues porque{' '}
          <span className="font-bold text-ink">soy su padre</span>.
        </motion.div>
      </div>

      {/* Polaroid stack mobile · 2 fotos · chips dentro de los label areas */}
      <div className="relative w-[64vw] max-w-[300px]" style={{ aspectRatio: '4 / 5' }}>
        {/* Polaroid 2 (atrás) · titoKids · cluster 3 chips */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            opacity: p.polaroid2Opacity,
            scale: p.polaroid2Scale,
            y: p.polaroid2Y,
            x: 28,
            rotate: 6,
          }}
        >
          <FloatingPolaroid
            src="/img/titoKids.jpg"
            alt="Padre con sus hijas"
            floatRotate={3}
            labelChip={
              <motion.div
                className="flex items-center gap-1"
                style={{ opacity: p.chipLabelKidsOpacity }}
              >
                <Chip tono="paper" size="xs">Tito</Chip>
                <Chip tono="mint" size="xs">Inti</Chip>
                <Chip tono="coral" size="xs">Llivia</Chip>
              </motion.div>
            }
          />
        </motion.div>

        {/* Polaroid 1 (delante) · titoAlone · chip "Tito" */}
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
          <FloatingPolaroid
            src="/img/titoAlone.jpg"
            alt="Padre · Tito · sonriendo"
            floatRotate={-1}
            labelChip={
              <motion.div style={{ opacity: p.chipLabelAloneOpacity }}>
                <Chip tono="paper" size="xs">Tito</Chip>
              </motion.div>
            }
          />
        </motion.div>
      </div>

      {/* Bloque 2 · eyebrow + headline + family strip + body + closing */}
      <div className="w-full max-w-[420px] text-ink">
        <motion.p
          className="mb-2 font-serif font-light uppercase text-ink-soft"
          style={{
            opacity: p.eyebrowRightOpacity,
            y: p.eyebrowRightY,
            fontSize: '10px',
            letterSpacing: '0.22em',
          }}
        >
          El Padre
        </motion.p>

        <motion.h2
          className="font-serif text-[clamp(26px,6.5vw,34px)] font-bold leading-[1.0] tracking-tight"
          style={{ opacity: p.r1Opacity, y: p.r1Y, letterSpacing: '-0.018em' }}
        >
          Aquí estoy yo.
        </motion.h2>

        <div className="mt-2">
          <TonalUnderline
            tono="ink"
            width={110}
            height={3}
            progress={p.underlineRightProgress}
          />
        </div>

        {/* Family chip-strip mobile · más compacto */}
        <motion.div
          className="mt-4 flex flex-wrap items-center gap-1.5"
          style={{ opacity: p.familyStripOpacity }}
        >
          {FAMILY_CHIPS.map((c) => (
            <Chip key={c.label} tono={c.tono} size="xs">
              {c.label}
            </Chip>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 font-text text-[clamp(15px,4.4vw,18px)] font-light leading-[1.3]"
          style={{ opacity: p.r2Opacity, y: p.r2Y, letterSpacing: '-0.005em' }}
        >
          <span className="font-bold">Padre</span> de{' '}
          <span className="font-bold">Inti</span> y{' '}
          <span className="font-bold">Llivia</span>.
        </motion.div>

        <motion.p
          className="mt-2 font-text text-[clamp(14px,3.8vw,17px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r3Opacity, y: p.r3Y, letterSpacing: '-0.005em' }}
        >
          <span className="font-bold text-ink">Muy orgulloso</span> de cada uno de mis{' '}
          <span className="font-bold text-ink">peques</span>.
        </motion.p>
        <motion.p
          className="mt-1.5 font-text text-[clamp(16px,4.4vw,20px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r4Opacity, y: p.r4Y, letterSpacing: '-0.005em' }}
        >
          Aunque <span className="font-bold text-ink">nadie</span> me enseñó a{' '}
          <span className="font-bold text-ink">ser padre</span>.
        </motion.p>
        <motion.p
          className="mt-1.5 font-text text-[clamp(16px,4.4vw,20px)] font-light leading-[1.4] text-ink-soft"
          style={{ opacity: p.r5Opacity, y: p.r5Y, letterSpacing: '-0.005em' }}
        >
          Y <span className="font-bold text-ink">nadie</span> me avisó de lo{' '}
          <span className="font-bold text-ink">complejo</span> que es.
        </motion.p>

        {/* Closing callout-pill · bridge a sección 3 */}
        <motion.div
          className="mt-5"
          style={{
            opacity: p.closingOpacity,
            y: p.closingY,
            scale: p.closingScale,
          }}
        >
          <Chip tono="ink" size="sm" className="px-4">
            <span
              className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper"
              aria-hidden="true"
            />
            Y de eso nace Grow.
          </Chip>
        </motion.div>
      </div>
    </div>
  );
}
