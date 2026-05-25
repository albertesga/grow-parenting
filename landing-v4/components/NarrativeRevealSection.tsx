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

  // Headline · 2 líneas reveal por palabra · "Nadie me preparó / para ser padre."
  // "Nadie" + "para ser padre." en extrabold · narrativa potente y directa
  const headlineWords: WordSpec[] = [
    { text: 'Nadie',    start: 0.00, end: 0.06, bold: true },
    { text: 'me',       start: 0.04, end: 0.10 },
    { text: 'preparó',  start: 0.07, end: 0.13 },
    { text: 'para',     start: 0.12, end: 0.18, bold: true },
    { text: 'ser',      start: 0.15, end: 0.21, bold: true },
    { text: 'padre.',   start: 0.18, end: 0.24, bold: true },
  ];

  // Subrayado del headline · empieza tras "padre."
  const underlineHeadlineProgress = useTransform(progress, [0.24, 0.34], [0, 1]);

  // Row 1 izq · "Nadie me explicó que me despertaría varias veces de madrugada."
  const leftWords: WordSpec[] = [
    { text: 'Nadie',       start: 0.30, end: 0.34, bold: true },
    { text: 'me',          start: 0.31, end: 0.35 },
    { text: 'explicó',     start: 0.32, end: 0.36 },
    { text: 'que',         start: 0.34, end: 0.38 },
    { text: 'me',          start: 0.35, end: 0.39 },
    { text: 'despertaría', start: 0.37, end: 0.41, bold: true },
    { text: 'varias',      start: 0.39, end: 0.43 },
    { text: 'veces',       start: 0.41, end: 0.45 },
    { text: 'de',          start: 0.43, end: 0.47 },
    { text: 'madrugada.',  start: 0.44, end: 0.48, bold: true },
  ];

  // Row 1 der · "Y nadie me explicó cómo eso multiplicaría los problemas
  // del día siguiente."
  const rightWords: WordSpec[] = [
    { text: 'Y',            start: 0.36, end: 0.40 },
    { text: 'nadie',        start: 0.37, end: 0.41, bold: true },
    { text: 'me',           start: 0.38, end: 0.42 },
    { text: 'explicó',      start: 0.39, end: 0.43 },
    { text: 'cómo',         start: 0.41, end: 0.45 },
    { text: 'eso',          start: 0.42, end: 0.46 },
    { text: 'multiplicaría', start: 0.44, end: 0.48, bold: true },
    { text: 'los',          start: 0.46, end: 0.50 },
    { text: 'problemas',    start: 0.47, end: 0.51, bold: true },
    { text: 'del',          start: 0.49, end: 0.53 },
    { text: 'día',          start: 0.50, end: 0.54 },
    { text: 'siguiente.',   start: 0.52, end: 0.56, bold: true },
  ];

  // Row 2 izq · "Nadie me explicó el miedo que te entra en el cuerpo
  // por cualquier tontería."
  const left2Words: WordSpec[] = [
    { text: 'Nadie',       start: 0.56, end: 0.60, bold: true },
    { text: 'me',          start: 0.57, end: 0.61 },
    { text: 'explicó',     start: 0.58, end: 0.62 },
    { text: 'el',          start: 0.60, end: 0.64 },
    { text: 'miedo',       start: 0.61, end: 0.65, bold: true },
    { text: 'que',         start: 0.63, end: 0.67 },
    { text: 'te',          start: 0.64, end: 0.68 },
    { text: 'entra',       start: 0.65, end: 0.69 },
    { text: 'en',          start: 0.67, end: 0.71 },
    { text: 'el',          start: 0.68, end: 0.72 },
    { text: 'cuerpo',      start: 0.69, end: 0.73, bold: true },
    { text: 'por',         start: 0.71, end: 0.75 },
    { text: 'cualquier',   start: 0.72, end: 0.76 },
    { text: 'tontería.',   start: 0.74, end: 0.78, bold: true },
  ];

  // Row 2 der · "Tampoco nadie me explicó la potencia de la sensación
  // cada vez que me mira."
  const right2Words: WordSpec[] = [
    { text: 'Tampoco',     start: 0.62, end: 0.66 },
    { text: 'nadie',       start: 0.63, end: 0.67, bold: true },
    { text: 'me',          start: 0.64, end: 0.68 },
    { text: 'explicó',     start: 0.65, end: 0.69 },
    { text: 'la',          start: 0.67, end: 0.71 },
    { text: 'potencia',    start: 0.68, end: 0.72, bold: true },
    { text: 'de',          start: 0.70, end: 0.74 },
    { text: 'la',          start: 0.71, end: 0.75 },
    { text: 'sensación',   start: 0.72, end: 0.76, bold: true },
    { text: 'cada',        start: 0.74, end: 0.78 },
    { text: 'vez',         start: 0.75, end: 0.79 },
    { text: 'que',         start: 0.76, end: 0.80 },
    { text: 'me',          start: 0.78, end: 0.82, bold: true },
    { text: 'mira.',       start: 0.80, end: 0.84, bold: true },
  ];

  // Subrayado bajo "mira." (row 2 der · al final)
  const underlineRightProgress = useTransform(progress, [0.84, 0.92], [0, 1]);

  // Doodles · 5 elementos con fade-in stagger · empiezan tras las 4 frases
  const doodle1 = useTransform(progress, [0.78, 0.86], [0, 1]);
  const doodle2 = useTransform(progress, [0.80, 0.88], [0, 1]);
  const doodle3 = useTransform(progress, [0.82, 0.90], [0, 1]);
  const doodle4 = useTransform(progress, [0.84, 0.92], [0, 1]);
  const doodle5 = useTransform(progress, [0.86, 0.94], [0, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[300vh] w-full"
      aria-label="Nadie me preparó para ser padre"
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
            left2Words={left2Words}
            right2Words={right2Words}
            underlineHeadlineProgress={underlineHeadlineProgress}
            underlineRightProgress={underlineRightProgress}
            doodle1={doodle1}
            doodle2={doodle2}
            doodle3={doodle3}
            doodle4={doodle4}
            doodle5={doodle5}
          />
        </div>

        {/* Mobile/Tablet (<lg) · headline + 4 frases en stack vertical */}
        <div className="flex h-full w-full flex-col lg:hidden">
          <MobileLayout
            progress={progress}
            headlineWords={headlineWords}
            leftWords={leftWords}
            rightWords={rightWords}
            left2Words={left2Words}
            right2Words={right2Words}
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
  left2Words: WordSpec[];
  right2Words: WordSpec[];
  underlineHeadlineProgress: MV;
  underlineRightProgress: MV;
  doodle1?: MV;
  doodle2?: MV;
  doodle3?: MV;
  doodle4?: MV;
  doodle5?: MV;
}

function DesktopLayout(p: LayoutProps) {
  // Headline 2 líneas · "Nadie me preparó / para ser padre."
  const line1 = p.headlineWords.slice(0, 3); // "Nadie me preparó"
  const line2 = p.headlineWords.slice(3, 6); // "para ser padre."

  return (
    <>
      {/* Headline · 2 líneas con word reveal · compacto top para dejar
          espacio a las 4 frases bottom */}
      <div className="absolute left-[6vw] top-[8vh] z-20 max-w-[88vw]">
        <h2 className="font-grift text-[clamp(64px,8.5vw,160px)] font-light leading-[0.98] tracking-tight text-ink">
          <WordReveal words={line1} progress={p.progress} className="block" />
          <WordReveal words={line2} progress={p.progress} className="block" />
        </h2>

        {/* Subrayado doble */}
        <motion.div
          className="-mt-1 origin-left"
          style={{
            scaleX: p.underlineHeadlineProgress,
            opacity: p.underlineHeadlineProgress,
            width: '40%',
            maxWidth: 460,
          }}
        >
          <HandwrittenAsset variant="doubleLine" width={460} />
        </motion.div>
      </div>

      {/* Grid 2x2 frases inferiores · 4 confesiones del padre */}
      <div className="absolute inset-x-0 bottom-[6vh] z-20 px-[6vw]">
        <div className="grid grid-cols-2 gap-x-[5vw] gap-y-7">
          {/* Row 1 · Frase izq · "despertaría madrugada" */}
          <WordReveal
            words={p.leftWords}
            progress={p.progress}
            className="font-grift text-[clamp(18px,1.45vw,26px)] leading-[1.4] text-ink"
          />

          {/* Row 1 · Frase der · "multiplicaría problemas día siguiente" */}
          <WordReveal
            words={p.rightWords}
            progress={p.progress}
            className="font-grift text-[clamp(18px,1.45vw,26px)] leading-[1.4] text-ink"
          />

          {/* Row 2 · Frase izq · "miedo cuerpo tontería" */}
          <WordReveal
            words={p.left2Words}
            progress={p.progress}
            className="font-grift text-[clamp(18px,1.45vw,26px)] leading-[1.4] text-ink"
          />

          {/* Row 2 · Frase der · "potencia sensación me mira" + swash */}
          <div>
            <WordReveal
              words={p.right2Words}
              progress={p.progress}
              className="font-grift text-[clamp(18px,1.45vw,26px)] leading-[1.4] text-ink"
            />
            {/* Subrayado swash bajo "me mira." */}
            <motion.div
              className="-mt-1 origin-left"
              style={{
                scaleX: p.underlineRightProgress,
                opacity: p.underlineRightProgress,
                width: '50%',
                maxWidth: 240,
              }}
            >
              <HandwrittenAsset variant="swash" width={240} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 5 Doodles distribuidos · matchea posiciones referencia · más grandes */}
      {/* Doodle 1 · arrow-curve top-right apuntando abajo al headline */}
      {p.doodle1 && (
        <motion.div
          className="pointer-events-none absolute right-[16vw] top-[6vh] z-30"
          style={{ opacity: p.doodle1, rotate: -12 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowCurve" width={170} />
        </motion.div>
      )}

      {/* Doodle 2 · loop espiral right-mid */}
      {p.doodle2 && (
        <motion.div
          className="pointer-events-none absolute right-[5vw] top-[36vh] z-30"
          style={{ opacity: p.doodle2 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowLoop" width={150} />
        </motion.div>
      )}

      {/* Doodle 3 · arrow-up-left esquina izquierda apuntando al headline */}
      {p.doodle3 && (
        <motion.div
          className="pointer-events-none absolute left-[1vw] top-[52vh] z-30"
          style={{ opacity: p.doodle3, rotate: -10 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowUpLeft" width={150} />
        </motion.div>
      )}

      {/* Doodle 4 · arrow-curve apuntando hacia col derecha desde el centro-bottom */}
      {p.doodle4 && (
        <motion.div
          className="pointer-events-none absolute bottom-[5vh] left-[44vw] z-30"
          style={{ opacity: p.doodle4, rotate: 22 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="arrowCurve" width={170} flipX />
        </motion.div>
      )}

      {/* Doodle 5 · sparkle decorativo bottom-right */}
      {p.doodle5 && (
        <motion.div
          className="pointer-events-none absolute bottom-[6vh] right-[2vw] z-30"
          style={{ opacity: p.doodle5 }}
          aria-hidden="true"
        >
          <HandwrittenAsset variant="sparkleAlt" width={80} />
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
    <div className="flex h-full w-full flex-col items-start justify-center gap-5 px-6 py-12">
      {/* Headline · compact mobile */}
      <div className="w-full max-w-[640px]">
        <h2 className="font-grift text-[clamp(32px,8vw,56px)] font-light leading-[1.05] tracking-tight text-ink">
          <WordReveal words={p.headlineWords} progress={p.progress} />
        </h2>
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

      {/* 4 frases stack vertical compacto */}
      <WordReveal
        words={p.leftWords}
        progress={p.progress}
        className="font-grift text-[clamp(14px,3.6vw,18px)] leading-[1.45] text-ink"
      />
      <WordReveal
        words={p.rightWords}
        progress={p.progress}
        className="font-grift text-[clamp(14px,3.6vw,18px)] leading-[1.45] text-ink"
      />
      <WordReveal
        words={p.left2Words}
        progress={p.progress}
        className="font-grift text-[clamp(14px,3.6vw,18px)] leading-[1.45] text-ink"
      />
      <div className="w-full max-w-[640px]">
        <WordReveal
          words={p.right2Words}
          progress={p.progress}
          className="font-grift text-[clamp(14px,3.6vw,18px)] leading-[1.45] text-ink"
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
