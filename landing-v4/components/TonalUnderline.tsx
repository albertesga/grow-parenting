'use client';

import { motion, MotionValue } from 'framer-motion';

/**
 * TonalUnderline · primitive DS · línea tonal 2px con scaleX animado.
 *
 * Reemplaza los handwritten swash/doubleLine de las secciones anteriores
 * por un underline plano coherente con el lenguaje DS.
 *
 * Modos:
 *  - Con `progress` (MotionValue) · scaleX = progress · animado por scroll
 *  - Sin `progress` · estático full width (scaleX = 1)
 *
 * Visualmente · un trazo limpio bajo headlines, equivalente sober al
 * subrayado handwritten · más en línea con el DS canon May 2026.
 */

export type UnderlineTono = 'coral' | 'blush' | 'mint' | 'gold' | 'violet' | 'ink';

interface TonalUnderlineProps {
  /** Tono del trazo · usa los tokens tailwind {tono}-base */
  tono?: UnderlineTono;
  /** Ancho del wrapper · px o string CSS · default 100% */
  width?: number | string;
  /** Altura del trazo en px · default 2 */
  height?: number;
  /** MotionValue de progress · si está, scaleX = progress (origin-left) */
  progress?: MotionValue<number>;
  /** Top margin · negativo para "pegar" al baseline del headline */
  marginTop?: number | string;
  /** Border-radius del trazo · default height/2 (rounded full) */
  rounded?: number | string;
  /** Aria-hidden por defecto · es decorativo */
  className?: string;
}

const TONO_BG: Record<UnderlineTono, string> = {
  coral: 'bg-coral-base',
  blush: 'bg-blush-base',
  mint: 'bg-mint-base',
  gold: 'bg-gold-base',
  violet: 'bg-violet-strong', // violet no tiene base, usa strong
  ink: 'bg-ink',
};

export default function TonalUnderline({
  tono = 'mint',
  width = '100%',
  height = 2,
  progress,
  marginTop,
  rounded,
  className = '',
}: TonalUnderlineProps) {
  const bg = TONO_BG[tono];
  const radius = rounded ?? height / 2;

  const baseStyle: React.CSSProperties = {
    width,
    height,
    marginTop,
    borderRadius: radius,
    transformOrigin: 'left center',
  };

  if (progress) {
    return (
      <motion.div
        aria-hidden="true"
        className={`${bg} ${className}`}
        style={{ ...baseStyle, scaleX: progress, opacity: progress }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${bg} ${className}`}
      style={baseStyle}
    />
  );
}
