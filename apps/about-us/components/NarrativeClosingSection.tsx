'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import TonalUnderline from './TonalUnderline';
import useIsDesktop from './useIsDesktop';

/**
 * NarrativeClosingSection · cierre de la narrativa about-us.
 *
 * Viene DESPUÉS de NarrativeRevealSection ("Nadie me preparó para ser
 * padre...") · recoge ese peso emocional y lo convierte en el por qué de
 * Grow: criar es el reto más grande de la vida, y por eso la mayor
 * oportunidad de ayudar a otras familias.
 *
 * Mismo vocabulario de animación que NarrativeRevealSection · fill-on-scroll
 * word-by-word gris (ink-faint) → carbón (ink). Único acento distintivo: la
 * palabra "oportunidad" gana un TonalUnderline mint que se dibuja al scroll,
 * marcando el pivote problema → esperanza.
 *
 * El cierre real (CTA + convocatoria de cofundadores) vive en la sección
 * siguiente · CofoundersCallSection.
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.05  · entrada bloque (opacity + y)
 *  · 0.06 → 0.32  · bloque 1 (reto)
 *  · 0.30 → 0.54  · bloque 2 (oportunidad)
 *  · 0.46 → 0.62  · underline mint draw
 *  · 0.54 → 0.86  · bloque 3 (presente, segura y feliz)
 *  · 0.86 → 1.00  · HOLD
 */

// Color tokens DS (string interpolables para framer-motion)
const COLOR_OFF = '#BFBAA8'; // var(--ink-faint)
const COLOR_ON = '#1A1A1A'; // var(--ink)

interface WordTok {
  text: string;
  bold?: boolean;
}
interface BlockSpec {
  words: WordTok[];
  start: number;
  end: number;
}

const BLOCK_RETO: BlockSpec = {
  start: 0.06,
  end: 0.32,
  words: [
    { text: 'No' }, { text: 'hay' },
    { text: 'reto', bold: true }, { text: 'más', bold: true }, { text: 'grande', bold: true },
    { text: 'en' }, { text: 'la' }, { text: 'vida' },
    { text: 'que' },
    { text: 'criar', bold: true },
    { text: 'a' }, { text: 'un' }, { text: 'hij@.' },
  ],
};

const BLOCK_OPP: BlockSpec = {
  start: 0.30,
  end: 0.54,
  words: [
    { text: 'Y' }, { text: 'eso' }, { text: 'lo' }, { text: 'convierte' },
    { text: 'en' }, { text: 'la' },
    { text: 'mayor', bold: true }, { text: 'oportunidad:', bold: true },
  ],
};

const BLOCK_TRIAD: BlockSpec = {
  start: 0.54,
  end: 0.86,
  words: [
    { text: 'ayudar' }, { text: 'a' }, { text: 'otras' }, { text: 'familias' },
    { text: 'a' }, { text: 'hacerlo' }, { text: 'de' }, { text: 'forma' },
    { text: 'más' },
    { text: 'presente,', bold: true }, { text: 'segura', bold: true },
    { text: 'y' }, { text: 'feliz.', bold: true },
  ],
};

export default function NarrativeClosingSection() {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return <MobileNarrativeClosingSection />;
  return <DesktopNarrativeClosingSection />;
}

function DesktopNarrativeClosingSection() {
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

  // Block entrance suave
  const blockOpacity = useTransform(progress, [0, 0.05], [0.9, 1]);
  const blockY = useTransform(progress, [0, 0.05], [16, 0]);

  // Underline mint bajo "oportunidad" · se dibuja en su propia ventana
  const underlineProgress = useTransform(progress, [0.46, 0.62], [0, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[220vh] w-full bg-paper"
      aria-label="No hay reto más grande que criar · la mayor oportunidad"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Paper noise sutil · mismo que las otras secciones narrativas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='360' height='360' filter='url(%23n)'/></svg>\")",
            backgroundSize: '360px 360px',
          }}
        />

        <motion.div
          className="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-6 text-center md:px-10 lg:px-16"
          style={{ opacity: blockOpacity, y: blockY }}
        >
          <div
            className="flex w-full flex-col items-center"
            style={{ gap: 'clamp(10px, 1.6vh, 22px)' }}
          >
            <FillBlock block={BLOCK_RETO} progress={progress} />

            {/* Bloque pivote · "...la mayor oportunidad:" + underline mint */}
            <div className="flex flex-col items-center">
              <FillBlock block={BLOCK_OPP} progress={progress} />
              <div className="mt-3">
                <TonalUnderline
                  tono="mint"
                  width="clamp(180px, 22vw, 320px)"
                  height={4}
                  progress={underlineProgress}
                />
              </div>
            </div>

            <FillBlock block={BLOCK_TRIAD} progress={progress} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileNarrativeClosingSection() {
  const mobileBlocks = [BLOCK_RETO, BLOCK_OPP, BLOCK_TRIAD];

  return (
    <section
      className="relative w-full bg-paper py-20"
      aria-label="No hay reto más grande que criar · la mayor oportunidad"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center px-6 text-center md:px-10">
        <div
          className="flex w-full flex-col items-center"
          style={{ gap: 'clamp(16px, 2vh, 28px)' }}
        >
          {mobileBlocks.map((block, index) => (
            <p
              key={`mobile-closing-${index}`}
              className="font-grift max-w-[52ch] text-ink"
              style={{
                fontSize: 'clamp(24px, 7vw, 38px)',
                lineHeight: 1.1,
                letterSpacing: '-0.012em',
                fontWeight: 300,
              }}
            >
              {block.words.map((w, wordIdx) => (
                <span key={`mobile-closing-word-${index}-${wordIdx}`} style={{ fontWeight: w.bold ? 800 : undefined }}>
                  {w.text}
                  {wordIdx < block.words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          ))}
          <div className="mt-2">
            <TonalUnderline tono="mint" width="clamp(180px, 56vw, 300px)" height={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   FillBlock + primitives · idénticas a NarrativeRevealSection · word-level
   color change con cascada izq→der (re-declaradas locales a propósito ·
   no refactorizar el componente existente).
   ──────────────────────────────────────────────────────────────────── */

function FillBlock({
  block,
  progress,
}: {
  block: BlockSpec;
  progress: MotionValue<number>;
}) {
  return (
    <p
      className="font-grift max-w-[52ch]"
      style={{
        fontSize: 'clamp(24px, 3.4vw, 52px)',
        lineHeight: 1.05,
        letterSpacing: '-0.012em',
        fontWeight: 300,
      }}
    >
      <FillLine line={block} progress={progress} />
    </p>
  );
}

interface FillWordProps {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  bold?: boolean;
}

function FillWord({ word, start, end, progress, bold = false }: FillWordProps) {
  const color = useTransform(progress, [start, end], [COLOR_OFF, COLOR_ON]);
  return (
    <motion.span style={{ color, fontWeight: bold ? 800 : undefined }}>
      {word}
    </motion.span>
  );
}

function FillLine({
  line,
  progress,
}: {
  line: BlockSpec;
  progress: MotionValue<number>;
}) {
  const duration = line.end - line.start;
  const step = duration / Math.max(line.words.length, 1);
  const fillSpan = step * 1.7;

  return (
    <>
      {line.words.map((w, i) => {
        const wStart = line.start + i * step * 0.55;
        const wEnd = Math.min(wStart + fillSpan, line.end + duration * 0.1);
        return (
          <span key={`${line.start}-${i}`}>
            <FillWord
              word={w.text}
              start={wStart}
              end={wEnd}
              progress={progress}
              bold={w.bold}
            />
            {i < line.words.length - 1 && ' '}
          </span>
        );
      })}
    </>
  );
}
