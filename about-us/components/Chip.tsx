'use client';

import { ReactNode } from 'react';

/**
 * Chip · primitive replicando `.chip` del DS canon (ADR-0003).
 *
 * Variantes:
 *  - tono · subtle bg + ink tonal · paper/soft/ink/coral/mint/gold/blush/violet
 *  - active · "vacío" · paper bg + inset 1.5px ink ring (canon DS · NO fill negro)
 *  - premium · opacity 0.55 · gated state
 *  - size · sm | md (default 36px / 44px) · respeta tap target 44px en md
 *
 * Font: Inter Medium 500 · canon DS body para chips/labels.
 *
 * Uso típico · chip-strip horizontal de filtros, tags, topic labels.
 * Combinable con `.chip-strip-tilt` (rotaciones nth-child) si se renderiza
 * dentro de un wrapper con esa clase.
 */

export type ChipTono =
  | 'soft'      // paper-soft bg · neutral default
  | 'paper'     // pure paper bg · subtle outline-like
  | 'ink'       // ink bg + paper text · alto contraste
  | 'coral'     // embarazo/alimentación/cólicos
  | 'mint'      // hitos/sueño/perfil/default
  | 'gold'      // vacunas
  | 'blush'     // lactancia/diario
  | 'violet'    // desarrollo
  | 'sky'       // lenguaje · feed-cards info
  | 'ochre';    // alimentación complementaria · cálido tierra

export interface ChipProps {
  children: ReactNode;
  tono?: ChipTono;
  active?: boolean;
  premium?: boolean;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const TONE_CLASSES: Record<ChipTono, string> = {
  soft:   'bg-paper-soft text-ink',
  paper:  'bg-paper text-ink ring-1 ring-inset ring-line-strong',
  ink:    'bg-ink text-paper',
  coral:  'bg-coral-subtle text-coral-ink',
  mint:   'bg-mint-subtle text-mint-ink',
  gold:   'bg-gold-subtle text-gold-ink',
  blush:  'bg-blush-subtle text-blush-ink',
  violet: 'bg-violet-subtle text-violet-ink',
  sky:    'bg-sky-subtle text-sky-ink',
  ochre:  'bg-ochre-subtle text-ochre-ink',
};

export default function Chip({
  children,
  tono = 'soft',
  active = false,
  premium = false,
  size = 'md',
  className = '',
}: ChipProps) {
  const base =
    'inline-flex items-center justify-center rounded-full font-text font-medium tracking-normal whitespace-nowrap select-none transition-[filter,box-shadow] duration-200';
  const sizing =
    size === 'xs'
      ? 'h-7 min-h-[28px] px-2.5 text-[11px]'
      : size === 'sm'
      ? 'h-8 min-h-[32px] px-3 text-[12px]'
      : 'h-11 min-h-[44px] px-4 text-[13px]';
  // Active = "vacío" canon DS · paper bg + inset ring 1.5px ink
  const activeOverride = active
    ? 'bg-paper text-ink ring-[1.5px] ring-inset ring-ink'
    : TONE_CLASSES[tono];
  const premiumOverride = premium ? 'opacity-[0.55]' : '';

  return (
    <span
      className={`${base} ${sizing} ${activeOverride} ${premiumOverride} ${className}`}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────
   ChipStripTilt · wrapper que aplica rotaciones nth-child al estilo DS.
   Usa este wrapper para el efecto "chips inclinados" del Hoy filter strip.
   ──────────────────────────────────────────────────────────────────── */

export function ChipStripTilt({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 [&>*:nth-child(1)]:-rotate-[3deg] [&>*:nth-child(2)]:rotate-[2deg] [&>*:nth-child(3)]:-rotate-[2deg] [&>*:nth-child(4)]:rotate-[3deg] [&>*:nth-child(5)]:-rotate-[1deg] [&>*:nth-child(6)]:rotate-[2deg] ${className}`}
    >
      {children}
    </div>
  );
}
