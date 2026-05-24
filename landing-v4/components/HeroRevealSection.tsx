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

  // Tamaños responsive
  const titleSize = mobile
    ? 'text-[14vw] leading-[0.95]'
    : 'text-[clamp(64px,8.5vw,128px)] leading-[1.0]';
  const paragraphSize = mobile
    ? 'text-lg leading-relaxed'
    : 'text-[clamp(20px,1.55vw,28px)] leading-[1.45]';

  return (
    <div className="relative">
      {/* Headline · "Este es Inti." */}
      <motion.h1
        className={`font-grift font-light tracking-tight text-ink ${titleSize}`}
        style={{ opacity: titleOpacity, y: titleY }}
      >
        Este es <span className="font-extrabold">Inti.</span>
      </motion.h1>

      {/* Subrayado handwritten bajo "Inti." */}
      <motion.div
        className="relative mt-2 h-3 w-[58%] origin-left md:w-[42%]"
        style={{ scaleX: underlineProgress, opacity: underlineProgress }}
      >
        <svg
          viewBox="0 0 320 14"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="handwritten-path"
            d="M4,8 Q40,2 80,7 T160,6 Q200,3 240,8 T316,7"
            strokeWidth="2.4"
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
          absolutas relativas al hero · en mobile son demasiado caóticas. */}
      {!mobile && (
        <>
          {/* Arrow 1 · curva desde el centro hacia la foto (top-right) */}
          <motion.div
            className="pointer-events-none absolute -right-[14vw] top-[6vh] z-30"
            style={{ opacity: arrow1Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="curve-right" size={140} />
          </motion.div>

          {/* Arrow 2 · pequeña apuntando a la foto (mid-right) */}
          <motion.div
            className="pointer-events-none absolute -right-[10vw] top-[28vh] z-30"
            style={{ opacity: arrow2Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="short-right" size={90} />
          </motion.div>

          {/* Arrow 3 · garabato circular bottom-left */}
          <motion.div
            className="pointer-events-none absolute -bottom-[8vh] -left-[2vw] z-30"
            style={{ opacity: arrow3Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="loop" size={80} />
          </motion.div>

          {/* Arrow 4 · suave apuntando al texto desde arriba */}
          <motion.div
            className="pointer-events-none absolute -top-[6vh] left-[6vw] z-30"
            style={{ opacity: arrow4Opacity }}
            aria-hidden="true"
          >
            <HandwrittenArrow variant="curve-down" size={100} />
          </motion.div>
        </>
      )}
    </div>
  );
}
