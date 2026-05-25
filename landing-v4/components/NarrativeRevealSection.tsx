'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import Chip, { ChipTono } from './Chip';
import TonalUnderline from './TonalUnderline';

/**
 * NarrativeRevealSection v3 · "Postales del padre"
 *
 * Sección 3 con manifesto + 4 phrase-cards numeradas. Cada queja del
 * padre se renderiza como una "postal" con número editorial 01-04,
 * chip-book tonal arriba a la derecha, y border-left del libro Grow
 * que la atiende.
 *
 * Tipografía DS canon May 2026:
 *  - Galiner (font-serif) · eyebrow, headline, números 01-04
 *  - Inter (font-text)    · body de las frases, chips
 *
 * Composición:
 *  - Eyebrow caps "Manifiesto · Un padre"
 *  - Headline grande "Nadie me preparó / para ser padre." con fill-on-scroll
 *  - TonalUnderline mint centrada
 *  - 4 cards postales stacked · cada una con:
 *    · Número Galiner Light (01-04)
 *    · Chip-book sm tono libro
 *    · Phrase Inter Light · fill-on-scroll ink-faint → ink
 *    · Background paper-soft · border-radius 12px
 *    · border-left 4px tono-base · firma visual del libro
 *  - Closing callout · Chip ink "Por eso nace Grow." con dot
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.05  · entrada bloque
 *  · 0.05 → 0.16  · eyebrow caps
 *  · 0.10 → 0.32  · headline fill word-by-word
 *  · 0.28 → 0.40  · TonalUnderline scaleX
 *  · 0.36 → 0.78  · 4 cards stagger pop · fill texto dentro de cada
 *  · 0.84 → 0.92  · closing callout
 *
 * Wrapper sticky 220vh · spring smoothing.
 */

// Colors · DS tokens (string interpolables para framer-motion)
const COLOR_OFF = '#BFBAA8'; // var(--ink-faint)
const COLOR_ON = '#1A1A1A';  // var(--ink)

interface WordTok { text: string; bold?: boolean; }

interface LineSpec {
  words: WordTok[];
  start: number;
  end: number;
}

// Headline · "Nadie me preparó / para ser padre."
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

// 4 phrase cards · cada una mapea a un libro Grow vía tono
interface PhraseCard {
  number: string;      // "01" .. "04"
  tono: ChipTono;
  label: string;       // chip-book label
  words: WordTok[];
  start: number;       // window inicio (card pops in)
  end: number;         // window fin (texto fully filled)
}

const CARDS: PhraseCard[] = [
  {
    number: '01', tono: 'mint', label: 'Sueño',
    start: 0.36, end: 0.50,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'que' },
      { text: 'me', bold: true }, { text: 'despertaría', bold: true },
      { text: 'varias' }, { text: 'veces' }, { text: 'de' }, { text: 'madrugada.' },
    ],
  },
  {
    number: '02', tono: 'coral', label: 'Cólicos',
    start: 0.46, end: 0.62,
    words: [
      { text: 'Y' }, { text: 'nadie' }, { text: 'me' }, { text: 'explicó' },
      { text: 'cómo' }, { text: 'eso' }, { text: 'multiplicaría' }, { text: 'los' },
      { text: 'problemas', bold: true }, { text: 'del', bold: true },
      { text: 'día', bold: true }, { text: 'siguiente.', bold: true },
    ],
  },
  {
    number: '03', tono: 'gold', label: 'Salud',
    start: 0.56, end: 0.72,
    words: [
      { text: 'Nadie' }, { text: 'me' }, { text: 'explicó' }, { text: 'el' },
      { text: 'miedo', bold: true },
      { text: 'que' }, { text: 'te' }, { text: 'entra' }, { text: 'en' },
      { text: 'el' }, { text: 'cuerpo' }, { text: 'por' }, { text: 'cualquier' },
      { text: 'tontería.' },
    ],
  },
  {
    number: '04', tono: 'blush', label: 'Diario',
    start: 0.66, end: 0.82,
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

// Tono → tailwind border class · firma visual del libro en cada card
const TONO_BORDER: Record<ChipTono, string> = {
  mint: 'border-mint-base',
  coral: 'border-coral-base',
  gold: 'border-gold-base',
  blush: 'border-blush-base',
  violet: 'border-violet-strong',
  ink: 'border-ink',
  soft: 'border-line-strong',
  paper: 'border-line-strong',
};

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
  const blockOpacity = useTransform(progress, [0, 0.05], [0.92, 1]);
  const blockY = useTransform(progress, [0, 0.05], [16, 0]);

  // Eyebrow caps fade
  const eyebrowOpacity = useTransform(progress, [0.05, 0.16], [0, 1]);
  const eyebrowY = useTransform(progress, [0.05, 0.16], [8, 0]);

  // TonalUnderline mint bajo headline
  const underlineProgress = useTransform(progress, [0.28, 0.40], [0, 1]);

  // Closing callout · pop in al final
  const closingOpacity = useTransform(progress, [0.84, 0.92], [0, 1]);
  const closingScale = useTransform(progress, [0.84, 0.92], [0.86, 1]);
  const closingY = useTransform(progress, [0.84, 0.92], [14, 0]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[220vh] w-full bg-paper"
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
          className="relative z-10 flex w-full max-w-[1100px] flex-col items-center px-6 text-center md:px-10 lg:px-16"
          style={{ opacity: blockOpacity, y: blockY }}
        >
          {/* Eyebrow caps Galiner */}
          <motion.p
            className="mb-5 font-serif font-light uppercase text-ink-soft md:mb-7"
            style={{
              opacity: eyebrowOpacity,
              y: eyebrowY,
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              letterSpacing: '0.22em',
            }}
          >
            Manifiesto · Un padre
          </motion.p>

          {/* Headline Galiner · 2 líneas · fill on scroll */}
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

          {/* TonalUnderline mint centrada · scaleX animado */}
          <div className="mt-5 flex justify-center md:mt-7">
            <TonalUnderline
              tono="mint"
              width={160}
              height={4}
              progress={underlineProgress}
            />
          </div>

          {/* Aire entre headline y cards */}
          <div className="h-[6vh] min-h-[36px] md:h-[8vh] md:min-h-[56px]" />

          {/* 4 phrase cards · stack vertical · stagger entry */}
          <div
            className="flex w-full max-w-[780px] flex-col"
            style={{ gap: 'clamp(14px, 1.8vh, 24px)' }}
          >
            {CARDS.map((card, i) => (
              <PostalCard key={card.number} card={card} index={i} progress={progress} />
            ))}
          </div>

          {/* Closing callout · ink chip con dot · bridge a Grow */}
          <motion.div
            className="mt-[7vh] md:mt-[9vh]"
            style={{
              opacity: closingOpacity,
              scale: closingScale,
              y: closingY,
            }}
          >
            <Chip tono="ink" size="md" className="px-5">
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-paper"
                aria-hidden="true"
              />
              Por eso nace Grow.
            </Chip>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   PostalCard · una postal por queja · número + chip-book + texto fill
   ──────────────────────────────────────────────────────────────────── */

function PostalCard({
  card,
  index,
  progress,
}: {
  card: PhraseCard;
  index: number;
  progress: MotionValue<number>;
}) {
  // Card pop entry · primeros 25% del window
  const span = card.end - card.start;
  const popEnd = card.start + span * 0.25;
  const cardOpacity = useTransform(progress, [card.start, popEnd], [0, 1]);
  const cardScale = useTransform(progress, [card.start, popEnd], [0.94, 1]);
  const cardY = useTransform(progress, [card.start, popEnd], [16, 0]);

  // Texto fill empieza al 30% del window · termina al end
  const textLine: LineSpec = {
    words: card.words,
    start: card.start + span * 0.3,
    end: card.end,
  };

  const borderClass = TONO_BORDER[card.tono];

  return (
    <motion.article
      className={`flex items-start gap-4 rounded-xl border-l-4 bg-paper-soft px-5 py-5 text-left md:gap-6 md:px-7 md:py-6 ${borderClass}`}
      style={{
        opacity: cardOpacity,
        scale: cardScale,
        y: cardY,
        transformOrigin: 'center center',
      }}
    >
      {/* Columna izq · número editorial Galiner Light */}
      <div className="flex-shrink-0 pt-1">
        <span
          className="font-serif font-light text-ink-faint tabular-nums"
          style={{
            fontSize: 'clamp(22px, 2.4vw, 36px)',
            letterSpacing: '-0.02em',
          }}
        >
          {card.number}
        </span>
      </div>

      {/* Columna der · chip-book arriba + texto fill abajo */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
        <div className="flex items-center justify-between">
          <Chip tono={card.tono} size="sm">
            {card.label}
          </Chip>
        </div>

        <FillLine
          line={textLine}
          progress={progress}
          as="p"
          className="font-text font-light"
          style={{
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            lineHeight: 1.5,
            letterSpacing: '-0.005em',
          }}
        />
      </div>
    </motion.article>
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
    <motion.span style={{ color, fontWeight: bold ? 700 : undefined }}>
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
