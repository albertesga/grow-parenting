'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import HandwrittenAsset from './HandwrittenAsset';

/**
 * NarrativeRevealSection · sección 3 con word-by-word reveal.
 *
 * Layout:
 *  - Headline gigante (3 líneas) "La verdad es que nadie te prepara para esto."
 *  - 2 columnas inferiores con confesiones del padre
 *  - 4 doodles handwritten distribuidos
 *
 * Animación · cada palabra se revela secuencialmente con stagger sutil.
 * Las palabras "bold" se enfatizan con scale extra al aparecer.
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.30 · Headline palabra por palabra (stagger)
 *  · 0.25 → 0.35 · Subrayado handwritten bajo el headline
 *  · 0.30 → 0.55 · Columna izquierda · word stagger
 *  · 0.40 → 0.65 · Columna derecha · word stagger
 *  · 0.60 → 0.70 · Subrayado bajo "me mira."
 *  · 0.55 → 0.85 · 4 doodles fade-in escalonado
 *  · 0.85 → 1.00 · HOLD
 *
 * Wrapper sticky 220vh · da tiempo perceptible para leer y absorber.
 */
export default function NarrativeRevealSection() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.3,
  });

  // Headline · 3 líneas reveal por palabra
  // Líneas: "La verdad es" / "que nadie te" / "prepara para esto."
  // Cada palabra mapeada a una ventana de progress (start, end)
  // con stagger natural · todas en el rango 0.00 → 0.30
  const headlineWords: WordSpec[] = [
    { text: 'La',       start: 0.00, end: 0.04 },
    { text: 'verdad',   start: 0.02, end: 0.06 },
    { text: 'es',       start: 0.04, end: 0.08 },
    { text: 'que',      start: 0.07, end: 0.11 },
    { text: 'nadie',    start: 0.09, end: 0.14, bold: true },
    { text: 'te',       start: 0.11, end: 0.16, bold: true },
    { text: 'prepara',  start: 0.14, end: 0.19, bold: true },
    { text: 'para',     start: 0.17, end: 0.22, bold: true },
    { text: 'esto.',    start: 0.20, end: 0.26, bold: true },
  ];

  // Subrayado del headline · empieza a dibujarse después de "esto."
  const underlineHeadlineProgress = useTransform(progress, [0.26, 0.36], [0, 1]);

  // Columna izquierda · "Nadie me explicó el miedo que te entra en el cuerpo
  // por cualquier tontería."
  const leftWords: WordSpec[] = [
    { text: 'Nadie',       start: 0.32, end: 0.36 },
    { text: 'me',          start: 0.33, end: 0.37 },
    { text: 'explicó',     start: 0.34, end: 0.38 },
    { text: 'el',          start: 0.36, end: 0.40 },
    { text: 'miedo',       start: 0.37, end: 0.41, bold: true },
    { text: 'que',         start: 0.39, end: 0.43 },
    { text: 'te',          start: 0.40, end: 0.44 },
    { text: 'entra',       start: 0.41, end: 0.45 },
    { text: 'en',          start: 0.43, end: 0.47 },
    { text: 'el',          start: 0.44, end: 0.48 },
    { text: 'cuerpo',      start: 0.45, end: 0.49 },
    { text: 'por',         start: 0.47, end: 0.51 },
    { text: 'cualquier',   start: 0.48, end: 0.52 },
    { text: 'tontería.',   start: 0.50, end: 0.54 },
  ];

  // Columna derecha · "Tampoco nadie me explicó la potencia de la sensación
  // cada vez que me mira."
  const rightWords: WordSpec[] = [
    { text: 'Tampoco',     start: 0.42, end: 0.46 },
    { text: 'nadie',       start: 0.43, end: 0.47 },
    { text: 'me',          start: 0.44, end: 0.48 },
    { text: 'explicó',     start: 0.45, end: 0.49 },
    { text: 'la',          start: 0.47, end: 0.51 },
    { text: 'potencia',    start: 0.48, end: 0.52 },
    { text: 'de',          start: 0.50, end: 0.54 },
    { text: 'la',          start: 0.51, end: 0.55 },
    { text: 'sensación',   start: 0.52, end: 0.56 },
    { text: 'cada',        start: 0.54, end: 0.58 },
    { text: 'vez',         start: 0.55, end: 0.59 },
    { text: 'que',         start: 0.57, end: 0.61 },
    { text: 'me',          start: 0.58, end: 0.62, bold: true },
    { text: 'mira.',       start: 0.60, end: 0.64, bold: true },
  ];

  // Subrayado bajo "me mira." (derecha)
  const underlineRightProgress = useTransform(progress, [0.64, 0.74], [0, 1]);

  // Doodles · 5 elementos con fade-in stagger
  const doodle1 = useTransform(progress, [0.62, 0.74], [0, 1]);
  const doodle2 = useTransform(progress, [0.66, 0.78], [0, 1]);
  const doodle3 = useTransform(progress, [0.70, 0.82], [0, 1]);
  const doodle4 = useTransform(progress, [0.74, 0.86], [0, 1]);
  const doodle5 = useTransform(progress, [0.78, 0.90], [0, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[220vh] w-full"
      aria-label="La verdad es que nadie te prepara para esto"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Paper texture overlay sutil */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='12'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>\")",
            backgroundSize: '320px 320px',
          }}
          aria-hidden="true"
        />

        {/* Desktop/Tablet layout (lg+) · headline centered + 2 columnas */}
        <div className="relative hidden h-full w-full lg:block">
          <DesktopLayout
            progress={progress}
            headlineWords={headlineWords}
            leftWords={leftWords}
            rightWords={rightWords}
            underlineHeadlineProgress={underlineHeadlineProgress}
            underlineRightProgress={underlineRightProgress}
            doodle1={doodle1}
            doodle2={doodle2}
            doodle3={doodle3}
            doodle4={doodle4}
            doodle5={doodle5}
          />
        </div>

        {/* Mobile/Tablet (<lg) · headline + 2 frases en stack vertical */}
        <div className="flex h-full w-full flex-col lg:hidden">
          <MobileLayout
            progress={progress}
            headlineWords={headlineWords}
            leftWords={leftWords}
            rightWords={rightWords}
            underlineHeadlineProgress={underlineHeadlineProgress}
            underlineRightProgress={underlineRightProgress}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Word reveal · helper que renderiza palabras con scroll-driven opacity
   ──────────────────────────────────────────────────────────────────── */

interface WordSpec {
  text: string;
  start: number;
  end: number;
  bold?: boolean;
}

interface AnimatedWordProps {
  word: WordSpec;
  progress: MotionValue<number>;
}

function AnimatedWord({ word, progress }: AnimatedWordProps) {
  const opacity = useTransform(progress, [word.start, word.end], [0, 1]);
  const y = useTransform(progress, [word.start, word.end], [20, 0]);
  return (
    <motion.span
      className={word.bold ? 'font-extrabold' : 'font-normal'}
      style={{
        opacity,
        y,
        display: 'inline-block',
        marginRight: '0.28em',
      }}
    >
      {word.text}
    </motion.span>
  );
}

function WordReveal({
  words,
  progress,
  className = '',
}: {
  words: WordSpec[];
  progress: MotionValue<number>;
  className?: string;
}) {
  return (
    <div className={className}>
      {words.map((w, i) => (
        <AnimatedWord key={`${w.text}-${i}`} word={w} progress={progress} />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Desktop layout
   ──────────────────────────────────────────────────────────────────── */

type MV = MotionValue<number>;

interface LayoutProps {
  progress: MV;
  headlineWords: WordSpec[];
  leftWords: WordSpec[];
  rightWords: WordSpec[];
  underlineHeadlineProgress: MV;
  underlineRightProgress: MV;
  doodle1?: MV;
  doodle2?: MV;
  doodle3?: MV;
  doodle4?: MV;
  doodle5?: MV;
}

function DesktopLayout(p: LayoutProps) {
  // Para el headline necesitamos las 3 líneas separadas visualmente
  // pero el reveal es continuo. Splitamos por palabras según líneas:
  const line1 = p.headlineWords.slice(0, 3); // "La verdad es"
  const line2 = p.headlineWords.slice(3, 6); // "que nadie te"
  const line3 = p.headlineWords.slice(6, 9); // "prepara para esto."

  return (
    <>
      {/* Headline · 3 líneas con word reveal */}
      <div className="absolute left-[7vw] top-[14vh] z-20 max-w-[80vw]">
        <h2 className="font-grift text-[clamp(56px,7vw,120px)] font-light leading-[1.05] tracking-tight text-ink">
          <WordReveal words={line1} progress={p.progress} className="block" />
          <WordReveal words={line2} progress={p.progress} className="block" />
          <WordReveal words={line3} progress={p.progress} className="block" />
        </h2>

        {/* Subrayado doble bajo el headline · debajo de "esto." */}
        <motion.div
          className="mt-2 origin-left"
          style={{
            scaleX: p.underlineHeadlineProgress,
            opacity: p.underlineHeadlineProgress,
            width: '40%',
            maxWidth: 360,
          }}
        >
          <HandwrittenAsset variant="doubleLine" width={360} />
        </motion.div>
      </div>

      {/* 2 columnas inferiores · texto secundario */}
      <div className="absolute bottom-[12vh] left-[7vw] z-20 w-[36vw] max-w-[420px]">
        <WordReveal
          words={p.leftWords}
          progress={p.progress}
          className="font-grift text-[clamp(18px,1.5vw,24px)] leading-[1.45] text-ink"
        />
      </div>

      <div className="absolute bottom-[12vh] right-[7vw] z-20 w-[36vw] max-w-[420px]">
        <WordReveal
          words={p.rightWords}
          progress={p.progress}
          className="font-grift text-[clamp(18px,1.5vw,24px)] leading-[1.45] text-ink"
        />

        {/* Subrayado handwritten bajo "me mira." al final del párrafo derecha */}
        <motion.div
          className="mt-2 origin-left"
          style={{
            scaleX: p.underlineRightProgress,
            opacity: p.underlineRightProgress,
            width: '50%',
            maxWidth: 220,
          }}
        >
          <HandwrittenAsset variant="swash" width={220} />
        </motion.div>
      </div>

      {/* 5 Doodles distribuidos · ver referencia user */}
      {/* Doodle 1 · arrow-curve top-right apuntando abajo */}
      {p.doodle1 && (
        <motion.div
          className="pointer-events-none absolute right-[15vw] top-[8vh] z-30"
          style={{ opacity: p.doodle1, rotate: -10 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowCurve" width={130} />
        </motion.div>
      )}

      {/* Doodle 2 · loop espiral right-mid */}
      {p.doodle2 && (
        <motion.div
          className="pointer-events-none absolute right-[10vw] top-[42vh] z-30"
          style={{ opacity: p.doodle2 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowLoop" width={110} />
        </motion.div>
      )}

      {/* Doodle 3 · arrow-up-left esquina izquierda apuntando al headline */}
      {p.doodle3 && (
        <motion.div
          className="pointer-events-none absolute left-[2vw] top-[48vh] z-30"
          style={{ opacity: p.doodle3, rotate: -10 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowUpLeft" width={120} />
        </motion.div>
      )}

      {/* Doodle 4 · arrow-curve apuntando hacia la columna derecha desde el centro-bottom */}
      {p.doodle4 && (
        <motion.div
          className="pointer-events-none absolute bottom-[8vh] left-[42vw] z-30"
          style={{ opacity: p.doodle4, rotate: 18 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowCurve" width={140} flipX />
        </motion.div>
      )}

      {/* Doodle 5 · sparkle decorativo bottom-right */}
      {p.doodle5 && (
        <motion.div
          className="pointer-events-none absolute bottom-[6vh] right-[3vw] z-30"
          style={{ opacity: p.doodle5 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="sparkleAlt" width={60} />
        </motion.div>
      )}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Mobile/Tablet layout · vertical stack
   ──────────────────────────────────────────────────────────────────── */

function MobileLayout(p: LayoutProps) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-8 px-6 py-16">
      {/* Headline · word reveal en 1 bloque (sin separar líneas · wrap natural) */}
      <div className="w-full max-w-[640px]">
        <h2 className="font-grift text-[clamp(36px,9vw,64px)] font-light leading-[1.05] tracking-tight text-ink">
          <WordReveal words={p.headlineWords} progress={p.progress} />
        </h2>

        {/* Subrayado handwritten · más estrecho mobile */}
        <motion.div
          className="mt-2 origin-left"
          style={{
            scaleX: p.underlineHeadlineProgress,
            opacity: p.underlineHeadlineProgress,
            width: '60%',
            maxWidth: 220,
          }}
        >
          <HandwrittenAsset variant="doubleLine" width={220} />
        </motion.div>
      </div>

      {/* 2 frases en stack vertical · sin columnas */}
      <div className="w-full max-w-[640px]">
        <WordReveal
          words={p.leftWords}
          progress={p.progress}
          className="font-grift text-[clamp(15px,4vw,20px)] leading-[1.5] text-ink"
        />
      </div>

      <div className="w-full max-w-[640px]">
        <WordReveal
          words={p.rightWords}
          progress={p.progress}
          className="font-grift text-[clamp(15px,4vw,20px)] leading-[1.5] text-ink"
        />

        <motion.div
          className="mt-2 origin-left"
          style={{
            scaleX: p.underlineRightProgress,
            opacity: p.underlineRightProgress,
            width: '50%',
            maxWidth: 180,
          }}
        >
          <HandwrittenAsset variant="swash" width={180} />
        </motion.div>
      </div>
    </div>
  );
}
