'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import HandwrittenAsset from './HandwrittenAsset';

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

      {/* Subrayado handwritten bajo "Inti." · usa el asset swash.png
          (línea sinuosa con loop al final · estilo handwritten real) */}
      <motion.div
        className="relative mt-2 origin-left"
        style={{
          scaleX: underlineProgress,
          opacity: underlineProgress,
          width: mobile ? '70%' : '58%',
          maxWidth: 480,
        }}
      >
        <HandwrittenAsset
          variant="swash"
          width={480}
          className="block h-auto w-full"
        />
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

      {/* Flechas handwritten · assets reales direccionales · grandes y prominentes
          Distribución matchea la referencia editorial:
          - arrow-curve top apuntando a la foto desde top-left
          - arrow-thin-left apuntando a la foto desde la derecha
          - arrow-up-left apuntando a la foto desde abajo-derecha
          - arrow-loop espiral decorativa bottom-left
          - sparkle decorativo cerca de "Inti." */}
      {!mobile && (
        <>
          {/* Arrow 1 · curva grande top entre texto y foto (arrowCurve es la
              curva descendente perfecta para apuntar a la foto desde top-left) */}
          <motion.div
            className="pointer-events-none absolute right-[26vw] -top-[18vh] z-30"
            style={{ opacity: arrow1Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowCurve" width={300} />
          </motion.div>

          {/* Arrow 2 · curva delgada con punta a la izquierda · apunta a foto
              desde la derecha · bien separada de la foto para no solapar */}
          <motion.div
            className="pointer-events-none absolute -right-[20vw] top-[8vh] z-30"
            style={{ opacity: arrow2Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowThinLeft" width={220} />
          </motion.div>

          {/* Arrow 3 · curva apuntando arriba-izquierda · sube hacia la foto
              desde abajo-derecha */}
          <motion.div
            className="pointer-events-none absolute -right-[14vw] top-[34vh] z-30"
            style={{ opacity: arrow3Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowUpLeft" width={210} />
          </motion.div>

          {/* Arrow 4 · espiral con loop decorativo bottom-left bajo el párrafo */}
          <motion.div
            className="pointer-events-none absolute -bottom-[14vh] left-[1vw] z-30"
            style={{ opacity: arrow4Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowLoop" width={150} />
          </motion.div>

          {/* Sparkle decorativo · más arriba para no tapar el texto */}
          <motion.div
            className="pointer-events-none absolute right-[10vw] -top-[6vh] z-30"
            style={{ opacity: arrow3Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="sparkle" width={100} />
          </motion.div>
        </>
      )}
    </div>
  );
}
