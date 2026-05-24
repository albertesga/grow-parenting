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

      {/* Subrayado handwritten bajo "Inti." · usa swash.png cropped.
          Margin-top negativo para que quede PEGADO a la baseline del h1
          (el h1 tiene leading-[0.95] que deja algo de espacio inferior). */}
      <motion.div
        className="relative -mt-1 origin-left md:-mt-2"
        style={{
          scaleX: underlineProgress,
          opacity: underlineProgress,
        }}
      >
        <HandwrittenAsset
          variant="swash"
          width={mobile ? 320 : 520}
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

      {/* Flechas handwritten · matchea composición referencia.
          Posiciones relativas al hero text block (que tiene ml-[8vw] y
          max-w-[52vw] · está en la mitad-izquierda del viewport).
          La foto está absolutamente posicionada a la derecha del viewport. */}
      {!mobile && (
        <>
          {/* Arrow 1 · arrow-curve · entre el texto y la foto, en el top.
              Apunta hacia abajo-derecha (hacia el top de la foto polaroid).
              Right negativo para que se posicione fuera del text block hacia la foto. */}
          <motion.div
            className="pointer-events-none absolute -right-[8vw] -top-[10vh] z-30"
            style={{ opacity: arrow1Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowCurve" width={240} />
          </motion.div>

          {/* Arrow 2 · arrow-thin-left · a la derecha de la foto, apuntando
              hacia la foto. Visualmente "viene de fuera" hacia la foto. */}
          <motion.div
            className="pointer-events-none absolute -right-[20vw] top-[18vh] z-30"
            style={{ opacity: arrow2Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowThinLeft" width={180} />
          </motion.div>

          {/* Arrow 3 · arrow-up-left · debajo de la foto, apuntando arriba-izq
              hacia la foto. Hace de "subraya/conecta con la foto desde abajo". */}
          <motion.div
            className="pointer-events-none absolute -right-[2vw] top-[40vh] z-30"
            style={{ opacity: arrow3Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowUpLeft" width={210} />
          </motion.div>

          {/* Arrow 4 · arrow-loop · garabato decorativo bottom-left bajo el párrafo */}
          <motion.div
            className="pointer-events-none absolute -bottom-[12vh] -left-[1vw] z-30"
            style={{ opacity: arrow4Opacity }}
            aria-hidden="true"
          >
            <HandwrittenAsset variant="arrowLoop" width={130} />
          </motion.div>
        </>
      )}
    </div>
  );
}
