'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import useIsDesktop from './useIsDesktop';

/**
 * NarrativeRevealSection v4 · "Solo texto"
 *
 * Sección 3 minimalista · 5 bloques de texto al mismo tamaño grande,
 * centrados, con fill-on-scroll word-by-word de gris (ink-faint) a
 * carbón (ink). Cero chips · cero cards · cero handwritten.
 *
 * Tipografía:
 *  - Galiner (font-serif) · headline + frases · weight 300 baseline,
 *    bold en palabras enfáticas
 *
 * Composición:
 *  - 1 headline · "Nadie me preparó para ser padre."
 *  - 4 frases · cada una en su bloque, mismo tamaño que headline
 *  - Todo centrado horizontal + vertical
 *  - Gap generoso entre bloques
 *
 * Animación:
 *  - Spring-smoothed scroll progress 0 → 1
 *  - Cada bloque tiene su window · cascada secuencial
 *  - Fill word-by-word · color animado por scroll
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.05  · entrada bloque (opacity + y)
 *  · 0.06 → 0.22  · headline fill
 *  · 0.22 → 0.38  · phrase 1
 *  · 0.36 → 0.52  · phrase 2
 *  · 0.50 → 0.66  · phrase 3
 *  · 0.64 → 0.82  · phrase 4
 *  · 0.82 → 1.00  · HOLD
 */

// Color tokens DS (string interpolables para framer-motion)
const COLOR_OFF = '#BFBAA8'; // var(--ink-faint)
const COLOR_ON = '#34342D';  // var(--ink)

interface WordTok { text: string; bold?: boolean; }
interface BlockSpec {
  words: WordTok[];
  start: number;
  end: number;
}

// 4 bloques del manifesto · headline + 3 frases · mismo tamaño visual
const BLOCKS: BlockSpec[] = [
  // Headline
  {
    start: 0.06, end: 0.24,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'preparó', bold: true },
      { text: 'para' }, { text: 'ser' }, { text: 'padre.', bold: true },
    ],
  },
  // Frase 1 · noches + cansancio + problemas día siguiente (combinada)
  {
    start: 0.22, end: 0.46,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' },
      { text: 'las' },
      { text: 'noches', bold: true }, { text: 'sin', bold: true }, { text: 'dormir.', bold: true },
      { text: 'Ni' }, { text: 'cómo' }, { text: 'el' },
      { text: 'cansancio', bold: true },
      { text: 'multiplica' }, { text: 'los' },
      { text: 'problemas', bold: true }, { text: 'del', bold: true },
      { text: 'día', bold: true }, { text: 'siguiente.', bold: true },
    ],
  },
  // Frase 2 · miedo en el cuerpo
  {
    start: 0.44, end: 0.62,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'el' },
      { text: 'miedo', bold: true },
      { text: 'que' }, { text: 'entra' }, { text: 'en' }, { text: 'el' },
      { text: 'cuerpo' }, { text: 'por' }, { text: 'cualquier' },
      { text: 'tontería.' },
    ],
  },
  // Frase 3 · potencia inmensa cada vez que me mira (cierre emocional)
  {
    start: 0.60, end: 0.84,
    words: [
      { text: 'Y' }, { text: 'nadie' }, { text: 'me' }, { text: 'avisó' },
      { text: 'de' }, { text: 'esto:' },
      { text: 'de' }, { text: 'la' },
      { text: 'potencia', bold: true }, { text: 'inmensa', bold: true },
      { text: 'de' },
      { text: 'cada', bold: true }, { text: 'vez', bold: true },
      { text: 'que', bold: true }, { text: 'me', bold: true },
      { text: 'mira.', bold: true },
    ],
  },
];

export default function NarrativeRevealSection() {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return <MobileNarrativeRevealSection />;
  return <DesktopNarrativeRevealSection />;
}

function DesktopNarrativeRevealSection() {
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

  return (
    <section
      ref={wrapperRef}
      className="relative h-[260vh] w-full bg-paper"
      aria-label="Nadie me preparó para ser padre"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Paper noise sutil */}
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
          {/* 5 bloques · todos mismo tamaño · centrados · stack vertical
              gap muy compacto (clamp 6-14px) · bloques casi pegados ·
              editorial dense look */}
          <div
            className="flex w-full flex-col items-center"
            style={{ gap: 'clamp(6px, 1vh, 14px)' }}
          >
            {BLOCKS.map((block, i) => (
              <FillBlock key={i} block={block} progress={progress} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileNarrativeRevealSection() {
  return (
    <section
      className="relative w-full bg-paper py-20"
      aria-label="Nadie me preparó para ser padre"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center px-6 text-center md:px-10">
        <div
          className="flex w-full flex-col items-center"
          style={{ gap: 'clamp(14px, 2vh, 26px)' }}
        >
          {BLOCKS.map((block, i) => (
            <p
              key={`mobile-block-${i}`}
              className="font-grift max-w-[52ch] text-ink"
              style={{
                fontSize: 'clamp(24px, 7vw, 38px)',
                lineHeight: 1.1,
                letterSpacing: '-0.012em',
                fontWeight: 300,
              }}
            >
              {block.words.map((w, wordIdx) => (
                <span key={`mobile-word-${i}-${wordIdx}`} style={{ fontWeight: w.bold ? 800 : undefined }}>
                  {w.text}
                  {wordIdx < block.words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   FillBlock · un bloque del manifesto · todos mismo tamaño editorial
   ──────────────────────────────────────────────────────────────────── */

function FillBlock({
  block,
  progress,
}: {
  block: BlockSpec;
  progress: MotionValue<number>;
}) {
  // Tipografía Grift mix · Light 300 baseline + Extrabold 800 acentos.
  // Editorial poster look · font-size grande · line-height muy tight
  // (1.05) para que las palabras se peguen · max-w generoso 52ch para
  // longitudes naturales sin saltos forzados.
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

/* ────────────────────────────────────────────────────────────────────
   Fill primitives · word-level color change con cascada izq→der
   ──────────────────────────────────────────────────────────────────── */

interface FillWordProps {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  bold?: boolean;
}

function FillWord({ word, start, end, progress, bold = false }: FillWordProps) {
  const color = useTransform(progress, [start, end], [COLOR_OFF, COLOR_ON]);
  // Acentos en Grift Extrabold 800 sobre baseline Light 300 · contraste
  // dramático tipo editorial poster
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
