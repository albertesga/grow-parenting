'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import HandwrittenArrow from './HandwrittenArrow';

interface HeroRevealSectionProps {
  /** Progreso de scroll del wrapper padre (0 → 1) */
  progress: MotionValue<number>;
  /** Si true · adapta tamaños y spacing a mobile */
  mobile?: boolean;
}

/**
 * HeroRevealSection · texto "Este es Inti." + párrafo + arrows handwritten.
 *
 * Reveal staged controlado por `progress` (0 → 1):
 *  - 0.00 → 0.20  · "Este es Inti." fade in + slight Y
 *  - 0.20 → 0.55  · subrayado handwritten dibuja
 *  - 0.30 → 0.70  · párrafo aparece línea por línea
 *  - 0.55 → 1.00  · 4 flechas handwritten entran con stagger
 *
 * Usado dentro de IntroPhotoSection (sticky scroll). Texto se queda
 * visible al final del scroll · luego la página continua a
 * EmotionalStatementSection.
 */
export default function HeroRevealSection({
  progress,
  mobile = false,
}: HeroRevealSectionProps) {
  // Reveal opacities
  const titleOpacity = useTransform(progress, [0, 0.25], [0, 1]);
  const titleY = useTransform(progress, [0, 0.25], [24, 0]);
  const underlineProgress = useTransform(progress, [0.2, 0.55], [0, 1]);
  const paragraphOpacity = useTransform(progress, [0.3, 0.7], [0, 1]);
  const paragraphY = useTransform(progress, [0.3, 0.7], [20, 0]);

  // Arrows con stagger (0.55 → 1.00, cada flecha empieza 0.08 después)
  const arrow1Opacity = useTransform(progress, [0.55, 0.75], [0, 1]);
  const arrow2Opacity = useTransform(progress, [0.63, 0.83], [0, 1]);
  const arrow3Opacity = useTransform(progress, [0.71, 0.91], [0, 1]);
  const arrow4Opacity = useTransform(progress, [0.79, 1.0], [0, 1]);

  // Tamaños responsive · matchea referencia (composición editorial grande)
  const titleSize = mobile
    ? 'text-[14vw] leading-[0.95]'
    : 'text-[clamp(80px,10vw,160px)] leading-[0.95]';
  const paragraphSize = mobile
    ? 'text-lg leading-relaxed'
    : 'text-[clamp(22px,1.75vw,32px)] leading-[1.4]';

  return (
    <div className="relative">
      {/* Headline · "Este es Inti." */}
      <motion.h1
        className={`font-grift font-light tracking-tight text-ink ${titleSize}`}
        style={{ opacity: titleOpacity, y: titleY }}
      >
        Este es <span className="font-extrabold">Inti.</span>
      </motion.h1>

      {/* Subrayado handwritten bajo "Inti." · grueso y visible.
          Sin preserveAspectRatio · mantiene proporción natural del SVG.
          Stroke generoso (3px en viewBox 320x16 → escala uniforme). */}
      <motion.div
        className="relative mt-2 origin-left"
        style={{
          scaleX: underlineProgress,
          opacity: underlineProgress,
          width: '64%',
          maxWidth: 360,
        }}
      >
        <svg
          viewBox="0 0 320 16"
          className="block h-auto w-full"
          aria-hidden="true"
        >
          <path
            className="handwritten-path"
            d="M4,10 Q40,4 80,9 T160,7 Q200,4 240,10 T316,8"
            strokeWidth="3"
          />
        </svg>
      </motion.div>

      {/* Párrafo · 3 líneas */}
      <motion.p
        className={`mt-8 max-w-[28ch] font-grift font-normal text-ink-soft ${paragraphSize}`}
        style={{ opacity: paragraphOpacity, y: paragraphY }}
      >
        Un niño feliz, sensible y tranquilo
        <br className="hidden md:block" />
        {' '}de 7 años que vive en Barcelona
        <br className="hidden md:block" />
        {' '}con su hermana y sus padres.
      </motion.p>

      {/* Flechas handwritten · solo en desktop · 4 elementos en posiciones
          absolutas relativas al hero · matchea la composición de referencia:
          - 1 curva grande top apuntando a la foto desde arriba-centro
          - 1 curva derecha apuntando a la foto desde la derecha
          - 1 curva sube-derecha apuntando a la foto desde abajo
          - 1 loop garabato bottom-left (decorativo) */}
      {!mobile && (
        <>
          {/* Arrow 1 · curva grande desde centro-top hacia la foto (right) */}
          <motion.div
            className="pointer-events-none absolute -right-[8vw] -top-[14vh] z-30"
            style={{ opacity: arrow1Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="curve-right" size={180} />
          </motion.div>

          {/* Arrow 2 · pequeña apuntando a la foto desde la derecha · mid-right */}
          <motion.div
            className="pointer-events-none absolute -right-[18vw] top-[10vh] z-30"
            style={{ opacity: arrow2Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="short-right" size={130} />
          </motion.div>

          {/* Arrow 3 · curva subiendo hacia la foto desde abajo-derecha */}
          <motion.div
            className="pointer-events-none absolute -right-[2vw] top-[28vh] z-30"
            style={{ opacity: arrow3Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="curve-up" size={130} />
          </motion.div>

          {/* Arrow 4 · garabato loop decorativo bottom-left · más abajo
              del párrafo (separado para no solapar con el texto) */}
          <motion.div
            className="pointer-events-none absolute -bottom-[18vh] -left-[1vw] z-30"
            style={{ opacity: arrow4Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="loop" size={110} />
          </motion.div>
        </>
      )}
    </div>
  );
}
