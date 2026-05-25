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
 * NarrativeRevealSection · sección editorial · fill-on-scroll.
 *
 * Comportamiento:
 *  - Todo el texto entra en gris (#B8B4AA).
 *  - A medida que se hace scroll dentro del wrapper, cada línea se rellena
 *    progresivamente en carbón (#1A1A1A) · de izquierda a derecha por
 *    palabra · con stagger sutil entre líneas (la siguiente empieza antes
 *    de que termine la anterior · sensación de cascada continua).
 *  - No es typing · es "fill reveal" · solo cambia color.
 *
 * Composición:
 *  - Wrapper 200vh · sticky inner 100vh centrado.
 *  - Headline grande (2 líneas) arriba · "Nadie me preparó / para ser padre."
 *  - Bloque de 4 frases debajo · centradas · interlineado generoso.
 *  - Cero CTAs · cero doodles · textura sutil de papel.
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.05  · entrada suave (opacity + translateY)
 *  · 0.05 → 0.20  · headline línea 1 fill
 *  · 0.15 → 0.30  · headline línea 2 fill
 *  · 0.34 → 0.49  · frase 1
 *  · 0.46 → 0.61  · frase 2
 *  · 0.58 → 0.73  · frase 3
 *  · 0.70 → 0.86  · frase 4
 *  · 0.86 → 1.00  · HOLD · todo carbón · usuario absorbe
 */

const COLOR_OFF = '#B8B4AA';
const COLOR_ON = '#1A1A1A';

// Datos · cada línea define palabras + flag bold para palabras enfatizadas
interface WordTok {
  text: string;
  bold?: boolean;
}

interface LineSpec {
  words: WordTok[];
  start: number;
  end: number;
}

// Headline · "Nadie me preparó / para ser padre."
const HEADLINE_LINE_1: LineSpec = {
  start: 0.05,
  end: 0.2,
  words: [
    { text: 'Nadie' },
    { text: 'me' },
    { text: 'preparó', bold: true },
  ],
};
const HEADLINE_LINE_2: LineSpec = {
  start: 0.15,
  end: 0.3,
  words: [
    { text: 'para' },
    { text: 'ser' },
    { text: 'padre.', bold: true },
  ],
};

// 4 frases del manifiesto · cada una con sus palabras clave en bold
const PHRASE_1: LineSpec = {
  start: 0.34,
  end: 0.49,
  words: [
    { text: 'Nadie' },
    { text: 'me' },
    { text: 'explicó' },
    { text: 'que' },
    { text: 'me', bold: true },
    { text: 'despertaría', bold: true },
    { text: 'varias' },
    { text: 'veces' },
    { text: 'de' },
    { text: 'madrugada.' },
  ],
};
const PHRASE_2: LineSpec = {
  start: 0.46,
  end: 0.61,
  words: [
    { text: 'Y' },
    { text: 'nadie' },
    { text: 'me' },
    { text: 'explicó' },
    { text: 'cómo' },
    { text: 'eso' },
    { text: 'multiplicaría' },
    { text: 'los' },
    { text: 'problemas', bold: true },
    { text: 'del', bold: true },
    { text: 'día', bold: true },
    { text: 'siguiente.', bold: true },
  ],
};
const PHRASE_3: LineSpec = {
  start: 0.58,
  end: 0.73,
  words: [
    { text: 'Nadie' },
    { text: 'me' },
    { text: 'explicó' },
    { text: 'el' },
    { text: 'miedo', bold: true },
    { text: 'que' },
    { text: 'te' },
    { text: 'entra' },
    { text: 'en' },
    { text: 'el' },
    { text: 'cuerpo' },
    { text: 'por' },
    { text: 'cualquier' },
    { text: 'tontería.' },
  ],
};
const PHRASE_4: LineSpec = {
  start: 0.7,
  end: 0.86,
  words: [
    { text: 'Tampoco' },
    { text: 'nadie' },
    { text: 'me' },
    { text: 'explicó' },
    { text: 'la' },
    { text: 'potencia' },
    { text: 'de' },
    { text: 'la' },
    { text: 'sensación' },
    { text: 'cada', bold: true },
    { text: 'vez', bold: true },
    { text: 'que', bold: true },
    { text: 'me', bold: true },
    { text: 'mira.', bold: true },
  ],
};

export default function NarrativeRevealSection() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Spring suave · evita jitter de trackpad · mantiene reactividad
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.3,
  });

  // Entrada del bloque · opacity 0.85 → 1 + translateY 20 → 0 en los
  // primeros 5% del scroll · sutil · "asentamiento" del bloque
  const blockOpacity = useTransform(progress, [0, 0.05], [0.85, 1]);
  const blockY = useTransform(progress, [0, 0.05], [20, 0]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[200vh] w-full bg-paper"
      aria-label="Nadie me preparó para ser padre"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Textura sutil de papel · noise SVG · opacity baja para que solo
            se intuya · no compite con el texto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360' viewBox='0 0 360 360'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='360' height='360' filter='url(%23n)'/></svg>\")",
            backgroundSize: '360px 360px',
          }}
        />

        {/* Contenedor central · max-w generoso · padding lateral generoso */}
        <motion.div
          className="relative z-10 flex w-full max-w-[1180px] flex-col items-center px-6 text-center md:px-10 lg:px-16"
          style={{ opacity: blockOpacity, y: blockY }}
        >
          {/* Headline · 2 líneas · super grande · centrado
              font-light por defecto · palabras bold se enfatizan via FillWord
              tracking-tight + letter-spacing negativo · leading apretado */}
          <h2
            className="font-grift font-light leading-[0.95] text-balance"
            style={{
              fontSize: 'clamp(48px, 9vw, 148px)',
              letterSpacing: '-0.02em',
            }}
          >
            <FillLine line={HEADLINE_LINE_1} progress={progress} as="span" displayBlock />
            <FillLine line={HEADLINE_LINE_2} progress={progress} as="span" displayBlock />
          </h2>

          {/* Aire entre headline y cuerpo · responsive */}
          <div className="h-[8vh] min-h-[40px] md:h-[10vh] md:min-h-[64px]" />

          {/* Bloque de 4 frases · max-w más estrecho que el headline para
              que el texto respire · centrado · interlineado generoso */}
          <div
            className="flex w-full max-w-[860px] flex-col font-grift font-light"
            style={{
              fontSize: 'clamp(17px, 1.9vw, 28px)',
              lineHeight: 1.55,
              gap: 'clamp(18px, 2.4vh, 36px)',
            }}
          >
            <FillLine line={PHRASE_1} progress={progress} as="p" />
            <FillLine line={PHRASE_2} progress={progress} as="p" />
            <FillLine line={PHRASE_3} progress={progress} as="p" />
            <FillLine line={PHRASE_4} progress={progress} as="p" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Fill primitives · FillWord cambia color por scroll
   FillLine reparte timings entre palabras de la línea (cascada izq→der)
   ──────────────────────────────────────────────────────────────────── */

interface FillWordProps {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  bold?: boolean;
}

function FillWord({ word, start, end, progress, bold = false }: FillWordProps) {
  // Color interpola en el rango [start, end] · fuera del rango usa los
  // valores de los extremos (clamp implícito de useTransform).
  const color = useTransform(progress, [start, end], [COLOR_OFF, COLOR_ON]);

  return (
    <motion.span
      style={{ color }}
      className={bold ? 'font-extrabold' : 'font-light'}
    >
      {word}
    </motion.span>
  );
}

interface FillLineProps {
  line: LineSpec;
  progress: MotionValue<number>;
  /** Elemento HTML del wrapper · 'p' para frases, 'span' para headline */
  as?: 'p' | 'span';
  /** Si true · render `display: block` cuando `as='span'` (para headline) */
  displayBlock?: boolean;
  className?: string;
}

/**
 * FillLine · reparte el [start, end] de la línea entre sus palabras.
 *
 * Algoritmo: cada palabra arranca a `start + i * step * 0.55` y dura
 * `step * 1.7` · con overlap pesado entre palabras adyacentes la línea
 * se siente como una "ola" de relleno · no palabras discretas
 * apareciendo una a una.
 *
 * El último .end se clampa a `line.end + duration * 0.1` para garantizar
 * que TODA la línea esté llena al alcanzar line.end (sin colas residuales).
 */
function FillLine({
  line,
  progress,
  as = 'p',
  displayBlock = false,
  className = '',
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
        style={displayBlock ? { display: 'block' } : undefined}
      >
        {content}
      </span>
    );
  }
  return <p className={className}>{content}</p>;
}
