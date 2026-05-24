'use client';

import { motion } from 'framer-motion';

interface HandwrittenArrowProps {
  /** Variante del SVG · controla forma de la flecha */
  variant:
    | 'curve-right'
    | 'short-right'
    | 'curve-down'
    | 'curve-up'
    | 'loop'
    | 'wavy-right';
  /** Tamaño base en px (la flecha mantendrá aspect ratio) */
  size?: number;
  /** Color del stroke · default ink #1A1A1A */
  color?: string;
  /** Duración de la animación de path · ms */
  drawDuration?: number;
}

/**
 * HandwrittenArrow · componente reusable de flecha dibujada a mano.
 *
 * 6 variantes con paths SVG diferentes · todas con `strokeDasharray` +
 * `strokeDashoffset` animados desde 1 → 0 para crear el efecto "se dibuja".
 *
 * Las animaciones de framer-motion (initial → animate) se activan al montar.
 * Cuando se combina con scroll-controlled opacity en el padre, el dibujado
 * coincide con la entrada visual.
 */
export default function HandwrittenArrow({
  variant,
  size = 100,
  color = '#1A1A1A',
  drawDuration = 800,
}: HandwrittenArrowProps) {
  const paths = ARROW_PATHS[variant];

  return (
    <svg
      viewBox={paths.viewBox}
      width={size}
      height={(size * paths.height) / paths.width}
      fill="none"
      stroke={color}
      strokeWidth={paths.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: {
              duration: drawDuration / 1000,
              ease: [0.4, 0, 0.6, 1],
              delay: i * 0.18,
            },
            opacity: {
              duration: 0.2,
              delay: i * 0.18,
            },
          }}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Path definitions · cada variante incluye el path principal + arrowhead
   ──────────────────────────────────────────────────────────────────── */

const ARROW_PATHS: Record<
  HandwrittenArrowProps['variant'],
  {
    viewBox: string;
    width: number;
    height: number;
    strokeWidth: number;
    paths: string[];
  }
> = {
  'curve-right': {
    viewBox: '0 0 160 120',
    width: 160,
    height: 120,
    strokeWidth: 2.2,
    paths: [
      // Curva grande sweeping de izquierda hacia abajo-derecha
      'M14,18 Q60,8 100,40 T146,96',
      // Arrowhead pointing down-right
      'M146,96 L132,84',
      'M146,96 L138,108',
    ],
  },
  'short-right': {
    viewBox: '0 0 110 60',
    width: 110,
    height: 60,
    strokeWidth: 2.2,
    paths: [
      // Línea ligeramente curvada apuntando a la izquierda
      'M100,30 Q70,22 18,32',
      // Arrowhead pointing left
      'M18,32 L30,24',
      'M18,32 L30,40',
    ],
  },
  'curve-down': {
    viewBox: '0 0 120 130',
    width: 120,
    height: 130,
    strokeWidth: 2.2,
    paths: [
      // Curva descendiente con leve oscilación
      'M22,12 Q12,50 40,80 T96,118',
      // Arrowhead pointing down-right
      'M96,118 L84,108',
      'M96,118 L92,122',
    ],
  },
  'curve-up': {
    viewBox: '0 0 120 130',
    width: 120,
    height: 130,
    strokeWidth: 2.2,
    paths: [
      'M22,118 Q12,80 40,50 T96,12',
      'M96,12 L84,22',
      'M96,12 L92,8',
    ],
  },
  loop: {
    viewBox: '0 0 100 100',
    width: 100,
    height: 100,
    strokeWidth: 2.2,
    paths: [
      // Garabato circular tipo "loop infinito"
      'M22,52 C22,30 50,18 66,36 C82,54 50,68 32,58 C20,52 12,42 24,30',
      // Pequeña arrowhead saliendo del loop
      'M24,30 L34,32',
      'M24,30 L26,40',
    ],
  },
  'wavy-right': {
    viewBox: '0 0 200 50',
    width: 200,
    height: 50,
    strokeWidth: 2.2,
    paths: [
      // Línea ondulada
      'M12,28 Q40,12 70,28 T130,28 Q160,12 188,28',
      // Arrowhead pointing right
      'M188,28 L176,20',
      'M188,28 L176,36',
    ],
  },
};
