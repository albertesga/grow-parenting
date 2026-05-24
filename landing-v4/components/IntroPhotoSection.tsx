'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import HeroRevealSection from './HeroRevealSection';

/**
 * IntroPhotoSection · sección fusionada 1+2.
 *
 * Estructura:
 *  - Wrapper de 200vh (2 viewports de scroll).
 *  - Sticky inner de 100vh donde la foto se ancla.
 *  - useScroll(target: wrapper, offset: ['start start', 'end end'])
 *    devuelve scrollYProgress de 0 → 1 mientras el wrapper sale del viewport.
 *  - 0   · foto centrada, grande (intro)
 *  - 0.5 · foto reducida + desplazada a la derecha + rotada (en transición)
 *  - 1   · foto en posición polaroid hero · texto + arrows visibles
 *
 * Las transformaciones aplican durante 0 → 0.55 aproximadamente · luego se
 * mantiene estable mientras el texto y arrows revelan (0.45 → 1).
 *
 * En mobile · simplificamos el parallax · la foto se reduce sin desplazarse
 * a la derecha (queda arriba) y el texto va debajo.
 */
export default function IntroPhotoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Spring sutil para suavizar el scroll · evita el "jitter" en trackpads
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  // Transform values · timeline 0 → 1
  //  · 0      foto fullscreen
  //  · 0.55   foto en posición polaroid hero
  //  · 0.55→1 texto + arrows revealan
  const scale = useTransform(progress, [0, 0.55], [1, 0.62]);
  const xPercent = useTransform(progress, [0, 0.55], [0, 28]);
  const yPercent = useTransform(progress, [0, 0.55], [0, 4]);
  const rotate = useTransform(progress, [0, 0.55], [0, 3]);
  // Frame · de foto limpia (frameOpacity 0) a polaroid (1)
  const frameOpacity = useTransform(progress, [0.05, 0.55], [0, 1]);
  // Padding del marco · de 0 a 16/16/56 (polaroid)
  const framePadding = useTransform(progress, [0.05, 0.55], [0, 16]);
  const framePaddingBottom = useTransform(progress, [0.05, 0.55], [0, 56]);
  // Shadow intensity · sube cuando el frame aparece
  const shadowStrength = useTransform(progress, [0.1, 0.55], [0, 1]);

  // Reveal del bloque de texto (sólo a partir de 0.5 progress)
  const textProgress = useTransform(progress, [0.45, 0.95], [0, 1]);

  return (
    <section
      ref={wrapperRef}
      className="relative h-[200vh] w-full"
      aria-label="Presentación de Inti"
    >
      {/* Sticky inner · ocupa 100vh mientras el wrapper se desplaza */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Desktop · foto + texto en layout absolute · controlado por scroll */}
        <div className="hidden h-full w-full md:block">
          <DesktopChoreography
            scale={scale}
            xPercent={xPercent}
            yPercent={yPercent}
            rotate={rotate}
            frameOpacity={frameOpacity}
            framePadding={framePadding}
            framePaddingBottom={framePaddingBottom}
            shadowStrength={shadowStrength}
            textProgress={textProgress}
          />
        </div>

        {/* Mobile · layout vertical simple · sin parallax horizontal */}
        <div className="flex h-full w-full flex-col md:hidden">
          <MobileChoreography
            scale={scale}
            yPercent={yPercent}
            frameOpacity={frameOpacity}
            framePadding={framePadding}
            framePaddingBottom={framePaddingBottom}
            textProgress={textProgress}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Desktop · foto centrada → derecha + texto entra por la izquierda
   ──────────────────────────────────────────────────────────────────── */

function DesktopChoreography({
  scale,
  xPercent,
  yPercent,
  rotate,
  frameOpacity,
  framePadding,
  framePaddingBottom,
  shadowStrength,
  textProgress,
}: {
  scale: MotionValue<number>;
  xPercent: MotionValue<number>;
  yPercent: MotionValue<number>;
  rotate: MotionValue<number>;
  frameOpacity: MotionValue<number>;
  framePadding: MotionValue<number>;
  framePaddingBottom: MotionValue<number>;
  shadowStrength: MotionValue<number>;
  textProgress: MotionValue<number>;
}) {
  // Construcción dinámica del box-shadow (de 0 a sombra polaroid completa)
  const boxShadow = useTransform(
    shadowStrength,
    [0, 1],
    [
      '0 0 0 rgba(0,0,0,0)',
      '0 1px 2px rgba(20,18,12,0.06), 0 12px 28px rgba(20,18,12,0.14), 0 22px 60px rgba(20,18,12,0.10)',
    ]
  );

  return (
    <>
      {/* Texto hero (capa inferior · aparece progresivo) */}
      <div className="absolute inset-0 z-0 flex items-center">
        <div className="ml-[6vw] max-w-[42vw] xl:ml-[8vw]">
          <HeroRevealSection progress={textProgress} />
        </div>
      </div>

      {/* Foto · capa superior · controlada por scroll */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10"
        style={{
          x: useTransform(xPercent, (v) => `calc(-50% + ${v}vw)`),
          y: useTransform(yPercent, (v) => `calc(-50% + ${v}vh)`),
          scale,
          rotate,
          width: 'min(58vw, 78vh)',
          aspectRatio: '4 / 5',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden bg-paper-deep"
          style={{
            // Polaroid frame morph
            paddingLeft: framePadding,
            paddingRight: framePadding,
            paddingTop: framePadding,
            paddingBottom: framePaddingBottom,
            backgroundColor: useTransform(
              frameOpacity,
              [0, 1],
              ['rgba(251,248,238,0)', 'rgba(251,248,238,1)']
            ),
            borderRadius: useTransform(frameOpacity, [0, 1], [12, 3]),
            boxShadow,
          }}
        >
          {/* Foto · siempre fills el contenedor interno */}
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/img/inti.svg"
              alt="Inti sonriendo en una foto tipo polaroid"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Mobile · foto arriba · texto debajo · sin parallax horizontal
   ──────────────────────────────────────────────────────────────────── */

function MobileChoreography({
  scale,
  yPercent,
  frameOpacity,
  framePadding,
  framePaddingBottom,
  textProgress,
}: {
  scale: MotionValue<number>;
  yPercent: MotionValue<number>;
  frameOpacity: MotionValue<number>;
  framePadding: MotionValue<number>;
  framePaddingBottom: MotionValue<number>;
  textProgress: MotionValue<number>;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start pt-20">
      {/* Foto · centra y reduce con scroll */}
      <motion.div
        className="relative"
        style={{
          scale,
          y: useTransform(yPercent, (v) => `${v}vh`),
          width: 'min(80vw, 60vh)',
          aspectRatio: '4 / 5',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden bg-paper-deep"
          style={{
            paddingLeft: framePadding,
            paddingRight: framePadding,
            paddingTop: framePadding,
            paddingBottom: framePaddingBottom,
            backgroundColor: useTransform(
              frameOpacity,
              [0, 1],
              ['rgba(251,248,238,0)', 'rgba(251,248,238,1)']
            ),
            borderRadius: useTransform(frameOpacity, [0, 1], [12, 3]),
            boxShadow: useTransform(
              frameOpacity,
              [0, 1],
              [
                '0 0 0 rgba(0,0,0,0)',
                '0 1px 2px rgba(20,18,12,0.06), 0 10px 24px rgba(20,18,12,0.12)',
              ]
            ),
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/img/inti.svg"
              alt="Inti sonriendo en una foto tipo polaroid"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Texto debajo · reveal progresivo */}
      <div className="w-full px-6 pt-8">
        <HeroRevealSection progress={textProgress} mobile />
      </div>
    </div>
  );
}
