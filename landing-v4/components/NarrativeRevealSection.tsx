'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import Chip, { ChipStripTilt, ChipTono } from './Chip';

/**
 * NarrativeRevealSection v2 · editorial DS-aligned · fill-on-scroll.
 *
 * Product-design rationale:
 *  - El manifesto "Nadie me preparó" se mapea visualmente a los libros
 *    de Grow vía chips tonales (Sueño/Cólicos/Salud/Diario).
 *  - Top chip-strip · preview de los temas que vienen · pone "etiqueta"
 *    a las emociones del padre.
 *  - Cada frase del manifiesto lleva su chip-book delante · convierte
 *    la queja en una promesa implícita: "para esto, hay un libro Grow".
 *  - Closing chip · "Aquí estamos." · cierre cálido sin CTA.
 *
 * Tipografía canon DS v0.2 May 2026:
 *  - Galiner (font-serif) · headline + eyebrow
 *  - Inter (font-text)    · body, chips, captions
 *  - Grift                · NO usado aquí (solo .plan .amt en pricing)
 *
 * Composición:
 *  - Wrapper 220vh · sticky inner 100vh centered (mantiene parallax)
 *  - Eyebrow caps + top chip-strip-tilt arriba
 *  - Headline grande con fill on scroll
 *  - 4 frases con chip-book + texto, stack vertical centrado
 *  - Closing chip "Aquí estamos." al final
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.08  · top chips fade+y stagger
 *  · 0.06 → 0.16  · eyebrow caps
 *  · 0.10 → 0.32  · headline fill
 *  · 0.34 → 0.50  · frase 1 (chip pop + text fill)
 *  · 0.46 → 0.62  · frase 2
 *  · 0.58 → 0.74  · frase 3
 *  · 0.70 → 0.86  · frase 4
 *  · 0.86 → 0.95  · closing chip
 *  · 0.95 → 1.00  · HOLD
 */

// Colors · DS tokens (ink-faint → ink · NO hex literal)
const COLOR_OFF = '#BFBAA8'; // var(--ink-faint)
const COLOR_ON = '#1A1A1A';  // var(--ink)

// Top chip strip · 4 tonos previewing the books that follow
const TOP_CHIPS: { tono: ChipTono; label: string }[] = [
  { tono: 'mint', label: 'Sueño' },
  { tono: 'coral', label: 'Cólicos' },
  { tono: 'gold', label: 'Salud' },
  { tono: 'blush', label: 'Diario' },
];

// Headline · "Nadie me preparó / para ser padre."
interface WordTok { text: string; bold?: boolean; }
interface LineSpec {
  words: WordTok[];
  start: number;
  end: number;
}

const HEADLINE_LINE_1: LineSpec = {
  start: 0.10, end: 0.22,
  words: [
    { text: 'Nadie' },
    { text: 'me' },
    { text: 'preparó', bold: true },
  ],
};
const HEADLINE_LINE_2: LineSpec = {
  start: 0.18, end: 0.32,
  words: [
    { text: 'para' },
    { text: 'ser' },
    { text: 'padre.', bold: true },
  ],
};

// 4 phrases · each maps to a Grow book via tono+label
interface Phrase {
  tono: ChipTono;
  label: string;
  words: WordTok[];
  start: number;
  end: number;
}

const PHRASES: Phrase[] = [
  {
    tono: 'mint', label: 'Sueño',
    start: 0.34, end: 0.50,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'que' },
      { text: 'me', bold: true }, { text: 'despertaría', bold: true },
      { text: 'varias' }, { text: 'veces' }, { text: 'de' }, { text: 'madrugada.' },
    ],
  },
  {
    tono: 'coral', label: 'Cólicos',
    start: 0.46, end: 0.62,
    words: [
      { text: 'Y' }, { text: 'nadie' }, { text: 'me' }, { text: 'explicó' },
      { text: 'cómo' }, { text: 'eso' }, { text: 'multiplicaría' }, { text: 'los' },
      { text: 'problemas', bold: true }, { text: 'del', bold: true },
      { text: 'día', bold: true }, { text: 'siguiente.', bold: true },
    ],
  },
  {
    tono: 'gold', label: 'Salud',
    start: 0.58, end: 0.74,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'el' },
      { text: 'miedo', bold: true },
      { text: 'que' }, { text: 'te' }, { text: 'entra' }, { text: 'en' },
      { text: 'el' }, { text: 'cuerpo' }, { text: 'por' }, { text: 'cualquier' },
      { text: 'tontería.' },
    ],
  },
  {
    tono: 'blush', label: 'Diario',
    start: 0.70, end: 0.86,
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

  // Block entrance · subtle settle on first 5%
  const blockOpacity = useTransform(progress, [0, 0.05], [0.92, 1]);
  const blockY = useTransform(progress, [0, 0.05], [16, 0]);

  // Eyebrow caps fade
  const eyebrowOpacity = useTransform(progress, [0.06, 0.16], [0, 1]);
  const eyebrowY = useTransform(progress, [0.06, 0.16], [8, 0]);

  // Closing chip · pop in al final
  const closingOpacity = useTransform(progress, [0.86, 0.95], [0, 1]);
  const closingScale = useTransform(progress, [0.86, 0.95], [0.86, 1]);
  const closingY = useTransform(progress, [0.86, 0.95], [14, 0]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[220vh] w-full bg-paper"
      aria-label="Nadie me preparó para ser padre"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Paper noise · sutil · canon paper-deep grain */}
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
          className="relative z-10 flex w-full max-w-[1180px] flex-col items-center px-6 text-center md:px-10 lg:px-16"
          style={{ opacity: blockOpacity, y: blockY }}
        >
          {/* Top chip-strip-tilt · 4 topic chips, staggered in.
              Pattern DS · .chip-strip-tilt con rotaciones nth-child. */}
          <ChipStripTilt className="mb-6 md:mb-8">
            {TOP_CHIPS.map((c, i) => (
              <TopChip key={c.label} index={i} progress={progress} tono={c.tono} label={c.label} />
            ))}
          </ChipStripTilt>

          {/* Eyebrow caps · Galiner Light · ink-soft · letter-spacing wide */}
          <motion.p
            className="font-serif font-light uppercase text-ink-soft mb-5 md:mb-7"
            style={{
              opacity: eyebrowOpacity,
              y: eyebrowY,
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              letterSpacing: '0.22em',
            }}
          >
            Manifiesto · Un padre
          </motion.p>

          {/* Headline · Galiner · 2 lines · fill on scroll */}
          <h2
            className="font-serif text-balance leading-[0.95]"
            style={{
              fontSize: 'clamp(48px, 8.4vw, 138px)',
              letterSpacing: '-0.018em',
              fontWeight: 300,
            }}
          >
            <FillLine line={HEADLINE_LINE_1} progress={progress} as="span" displayBlock />
            <FillLine line={HEADLINE_LINE_2} progress={progress} as="span" displayBlock />
          </h2>

          {/* Air gap */}
          <div className="h-[6vh] min-h-[36px] md:h-[8vh] md:min-h-[56px]" />

          {/* 4 phrases · cada una con chip-book + texto stack vertical */}
          <div
            className="flex w-full max-w-[820px] flex-col items-center"
            style={{ gap: 'clamp(22px, 3vh, 44px)' }}
          >
            {PHRASES.map((p) => (
              <PhraseBlock key={p.label} phrase={p} progress={progress} />
            ))}
          </div>

          {/* Closing chip · "Aquí estamos." · active variant (canon vacío) */}
          <motion.div
            className="mt-[6vh] md:mt-[8vh]"
            style={{
              opacity: closingOpacity,
              scale: closingScale,
              y: closingY,
            }}
          >
            <Chip tono="mint" size="md" className="px-5">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-mint-strong" aria-hidden="true" />
              Aquí estamos.
            </Chip>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   TopChip · chip de topic con stagger fade-in
   ──────────────────────────────────────────────────────────────────── */

function TopChip({
  index,
  progress,
  tono,
  label,
}: {
  index: number;
  progress: MotionValue<number>;
  tono: ChipTono;
  label: string;
}) {
  const start = 0.0 + index * 0.015;
  const end = 0.08 + index * 0.015;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div style={{ opacity, y, scale }}>
      <Chip tono={tono} size="sm">{label}</Chip>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   PhraseBlock · chip-book + texto con fill on scroll
   Chip pop primero (primer 22% del window) · texto fill el resto
   ──────────────────────────────────────────────────────────────────── */

function PhraseBlock({
  phrase,
  progress,
}: {
  phrase: Phrase;
  progress: MotionValue<number>;
}) {
  const span = phrase.end - phrase.start;
  // Chip pops in primer 22% del window
  const chipStart = phrase.start;
  const chipEnd = phrase.start + span * 0.22;
  const chipOpacity = useTransform(progress, [chipStart, chipEnd], [0, 1]);
  const chipScale = useTransform(progress, [chipStart, chipEnd], [0.82, 1]);
  const chipY = useTransform(progress, [chipStart, chipEnd], [8, 0]);

  // Text fill arranca solapado con el chip · termina al end del window
  const textLine: LineSpec = {
    words: phrase.words,
    start: phrase.start + span * 0.10,
    end: phrase.end,
  };

  return (
    <div className="flex flex-col items-center gap-3 md:gap-3.5">
      <motion.div style={{ opacity: chipOpacity, scale: chipScale, y: chipY }}>
        <Chip tono={phrase.tono} size="sm">{phrase.label}</Chip>
      </motion.div>
      <FillLine
        line={textLine}
        progress={progress}
        as="p"
        className="font-text font-normal text-balance"
        style={{
          fontSize: 'clamp(17px, 1.85vw, 26px)',
          lineHeight: 1.5,
          letterSpacing: '-0.005em',
          maxWidth: '720px',
        }}
      />
    </div>
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
  return (
    <motion.span
      style={{ color, fontWeight: bold ? 700 : undefined }}
    >
      {word}
    </motion.span>
  );
}

interface FillLineProps {
  line: LineSpec;
  progress: MotionValue<number>;
  as?: 'p' | 'span';
  displayBlock?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function FillLine({
  line,
  progress,
  as = 'p',
  displayBlock = false,
  className = '',
  style,
}: FillLineProps) {
  const duration = line.end - line.start;
  const step = duration / Math.max(line.words.length, 1);
  const fillSpan = step * 1.7;

  const content = line.words.map((w, i) => {
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
  });

  if (as === 'span') {
    return (
      <span
        className={className}
        style={{ ...(displayBlock ? { display: 'block' } : {}), ...(style ?? {}) }}
      >
        {content}
      </span>
    );
  }
  return (
    <p className={className} style={style}>
      {content}
    </p>
  );
}
