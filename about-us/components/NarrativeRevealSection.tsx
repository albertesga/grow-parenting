'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

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
const COLOR_ON = '#1A1A1A';  // var(--ink)

interface WordTok { text: string; bold?: boolean; }
interface BlockSpec {
  words: WordTok[];
  start: number;
  end: number;
}

// 5 bloques del manifesto · headline + 4 frases · mismo tamaño visual
const BLOCKS: BlockSpec[] = [
  {
    start: 0.06, end: 0.22,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'preparó', bold: true },
      { text: 'para' }, { text: 'ser' }, { text: 'padre.', bold: true },
    ],
  },
  {
    start: 0.22, end: 0.38,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'que' },
      { text: 'me', bold: true }, { text: 'despertaría', bold: true },
      { text: 'varias' }, { text: 'veces' }, { text: 'de' }, { text: 'madrugada.' },
    ],
  },
  {
    start: 0.36, end: 0.52,
    words: [
      { text: 'Y' }, { text: 'nadie' }, { text: 'me' }, { text: 'explicó' },
      { text: 'cómo' }, { text: 'eso' }, { text: 'multiplicaría' }, { text: 'los' },
      { text: 'problemas', bold: true }, { text: 'del', bold: true },
      { text: 'día', bold: true }, { text: 'siguiente.', bold: true },
    ],
  },
  {
    start: 0.50, end: 0.66,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'el' },
      { text: 'miedo', bold: true },
      { text: 'que' }, { text: 'te' }, { text: 'entra' }, { text: 'en' },
      { text: 'el' }, { text: 'cuerpo' }, { text: 'por' }, { text: 'cualquier' },
      { text: 'tontería.' },
    ],
  },
  {
    start: 0.64, end: 0.82,
    words: [
      { text: 'Tampoco' }, { text: 'nadie' }, { text: 'me' }, { text: 'explicó' },
      { text: 'la' }, { text: 'potencia' }, { text: 'de' }, { text: 'la' },
      { text: 'sensación' },
      { text: 'cada', bold: true }, { text: 'vez', bold: true },
      { text: 'que', bold: true }, { text: 'me', bold: true },
      { text: 'mira.', bold: true },
    ],
  },
];

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
              gap reducido para que el manifesto entero quepa en 100vh */}
          <div
            className="flex w-full flex-col items-center"
            style={{ gap: 'clamp(14px, 2vh, 28px)' }}
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
  // Tipografía Grift Extrabold (canon legacy · uso experimental para
  // manifesto personal · NO para resto del producto). Baseline 800 ·
  // acentos Black 900 (ver FillWord). max-w-[48ch] mantiene líneas
  // naturales sin saltos forzados. Font-size ligeramente menor que
  // Galiner porque Grift Extrabold ocupa más visual.
  return (
    <p
      className="font-grift max-w-[48ch]"
      style={{
        fontSize: 'clamp(18px, 2.3vw, 34px)',
        lineHeight: 1.22,
        letterSpacing: '-0.005em',
        fontWeight: 800,
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
  // Acentos en Grift Black 900 sobre baseline Extrabold 800 · diferencia
  // visual sutil pero perceptible para palabras enfáticas
  return (
    <motion.span style={{ color, fontWeight: bold ? 900 : undefined }}>
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
