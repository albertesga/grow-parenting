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
import FrameSequence from './FrameSequence';
import Chip, { ChipTono } from './Chip';
import ScrollLottieArrow from './ScrollLottieArrow';
import TonalUnderline from './TonalUnderline';
import useIsDesktop from './useIsDesktop';

// Pattern para los frames extraídos del video con ffmpeg.
// 104 frames a 20fps · paddings 3 dígitos · /public/frames/f-001.jpg ... f-104.jpg
const FRAME_COUNT = 104;
const frameSrc = (i: number) =>
  `/about-us/frames/f-${String(i).padStart(3, '0')}.jpg`;

const MOBILE_ATTRIBUTE_CHIPS: { tono: ChipTono; label: string; tilt: number }[] = [
  { tono: 'mint', label: 'feliz', tilt: -3 },
  { tono: 'blush', label: 'sensible', tilt: 2 },
  { tono: 'gold', label: 'tranquilo', tilt: -2 },
];

/**
 * IntroPhotoSection · sección fusionada 1+2.
 *
 * Estructura:
 *  - Wrapper de 450vh (4.5 viewports de scroll). El alto largo es
 *    intencional · garantiza que el scroll "se atrape" en el hero
 *    durante un tiempo perceptible · el usuario NO avanza a la siguiente
 *    sección hasta que todo el hero está completamente visible y
 *    absorbido.
 *  - Sticky inner de 100vh donde la foto se ancla (position: sticky
 *    + top: 0 + height: 100vh = mientras el wrapper está en viewport,
 *    el inner queda pegado al top).
 *  - useScroll(target: wrapper, offset: ['start start', 'end end'])
 *    devuelve scrollYProgress de 0 → 1 mientras el wrapper sale del viewport.
 *
 * Timeline narrativo (progress 0 → 1):
 *  · 0.00 → 0.25 · foto se reduce + desplaza + rota · frame polaroid aparece
 *  · 0.20 → 0.38 · texto "Este es Inti." + subrayado handwritten reveal
 *  · 0.32 → 0.52 · párrafo + 4 flechas handwritten con stagger
 *  · 0.52 → 1.00 · HOLD largo (~48% del scroll · ≈215vh) · composición
 *                  completa visible · NADA cambia · el scroll sigue siendo
 *                  consumido por el wrapper sticky · cuando el usuario
 *                  finalmente "termina" el hero, la sección 2 entra natural
 *
 * El HOLD largo es el truco clave · da la sensación de que el scroll está
 * "pausado" mostrando el hero, aunque técnicamente sí está scrolleando
 * (consumiendo el alto del wrapper). UX-wise · el usuario percibe que la
 * página no avanza hasta que ha visto y leído todo.
 *
 * En mobile · simplificamos el parallax · la foto se reduce sin desplazarse
 * a la derecha (queda arriba) y el texto va debajo.
 */
export default function IntroPhotoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-[100svh] w-full lg:h-[450vh] lg:min-h-0"
      aria-label="Presentación de Inti"
    >
      {/* Mobile + tablet · lectura natural. Evita sticky h-screen + overflow-hidden,
          que recortaba el copy en viewports bajos. */}
      <MobileEditorialIntro />

      {isDesktop ? <DesktopStickyIntro wrapperRef={wrapperRef} /> : null}
    </section>
  );
}

function DesktopStickyIntro({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLElement | null>;
}) {
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

  // Transform values · timeline 0 → 1 · TODOS los cambios ocurren en el
  // primer 52% del scroll · el 48% restante es HOLD (composición estática)
  const scale = useTransform(progress, [0, 0.25], [1, 0.72]);
  const xPercent = useTransform(progress, [0, 0.25], [0, 26]);
  const yPercent = useTransform(progress, [0, 0.25], [0, 3]);
  const rotate = useTransform(progress, [0, 0.25], [0, 5]);
  // Frame · de foto limpia (frameOpacity 0) a polaroid (1)
  const frameOpacity = useTransform(progress, [0.05, 0.25], [0, 1]);
  // Padding del marco · de 0 a 16/16/56 (polaroid)
  const framePadding = useTransform(progress, [0.05, 0.25], [0, 16]);
  const framePaddingBottom = useTransform(progress, [0.05, 0.25], [0, 56]);
  // Shadow intensity · sube cuando el frame aparece
  const shadowStrength = useTransform(progress, [0.08, 0.25], [0, 1]);

  // Reveal del bloque de texto (empieza cuando foto ya está en posición)
  // Termina en 0.52 · resto del scroll (0.52 → 1.0) es HOLD donde todo
  // queda visible y estático. Usuario no puede pasar a sección 2 hasta
  // consumir todo el wrapper.
  const textProgress = useTransform(progress, [0.2, 0.52], [0, 1]);

  // Frame sequence reemplaza video MP4 scroll-scrubbing (que tenía stuttering
  // por re-decode de H.264 en cada seek). FrameSequence preload + swap src
  // es instantáneo. wrapperRef se pasa para que calcule su propio progress.
  return (
    <div className="sticky top-0 hidden h-screen w-full overflow-hidden lg:block">
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
        wrapperRef={wrapperRef}
      />
    </div>
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
  wrapperRef,
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
  wrapperRef: React.RefObject<HTMLElement | null>;
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
      {/* Texto hero (capa inferior · aparece progresivo) ·
          max-w generoso para que "Este es Inti." entre en una línea */}
      <div className="absolute inset-0 z-0 flex items-center">
        <div className="ml-[6vw] max-w-[52vw] xl:ml-[8vw]">
          <HeroRevealSection progress={textProgress} />
        </div>
      </div>

      <ScrollLottieArrow progress={textProgress} />

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
          data-intro-polaroid
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
          {/* FrameSequence · 104 JPG precargados · swap src instantáneo
              al scroll · sin stutter de decode de video. */}
          <div className="relative h-full w-full overflow-hidden">
            <FrameSequence
              frameCount={FRAME_COUNT}
              frameSrc={frameSrc}
              wrapperRef={wrapperRef}
              alt="Inti sonriendo en una foto tipo polaroid"
              className="h-full w-full object-cover"
              style={{ display: 'block' }}
            />
          </div>

          {/* Chip label dentro del label area de la polaroid (padding bottom 56px).
              Visible solo cuando el polaroid está formado (frame ≥ 0.6).
              Tilt -3deg estilo DS chip-strip-tilt. */}
          <motion.div
            className="pointer-events-none absolute bottom-[14px] left-1/2 z-10 -translate-x-1/2"
            style={{
              opacity: useTransform(frameOpacity, [0.6, 1], [0, 1]),
              rotate: -3,
            }}
          >
            <Chip tono="mint" size="xs">
              Inti · 2024
            </Chip>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Mobile · versión editorial natural · sin clipping de viewport
   ──────────────────────────────────────────────────────────────────── */

function MobileEditorialIntro() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-[520px] flex-col px-6 pb-14 pt-[clamp(68px,10svh,108px)] sm:px-8 lg:hidden">
      <div className="mx-auto w-[min(64vw,32svh,286px)] bg-paper-deep p-3 pb-12 shadow-[0_1px_2px_rgba(20,18,12,0.06),0_12px_30px_rgba(20,18,12,0.13)]">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={frameSrc(FRAME_COUNT)}
            alt="Inti sonriendo en una foto tipo polaroid"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <div className="-mb-7 mt-3 flex justify-center">
          <span className="-rotate-3">
            <Chip tono="mint" size="xs">
              Inti · 2024
            </Chip>
          </span>
        </div>
      </div>

      <div className="mt-[clamp(26px,5svh,46px)]">
        <p
          className="mb-3 font-serif font-light uppercase text-ink-soft"
          style={{ fontSize: '10px', letterSpacing: '0.22em' }}
        >
          Testimonio · Cap. 01
        </p>

        <h1
          data-intro-title
          className="font-serif text-[clamp(56px,15vw,76px)] font-light leading-[0.94] tracking-[-0.02em] text-ink"
        >
          Este es <span className="font-bold">Inti.</span>
        </h1>

        <TonalUnderline tono="mint" width="min(220px, 62vw)" height={3} marginTop={10} />

        <p className="mt-6 max-w-[29ch] font-text text-[clamp(16px,4.1vw,18px)] font-light leading-[1.45] tracking-[-0.005em] text-ink-soft">
          Un niño <span className="font-bold text-ink">feliz</span>, sensible y{' '}
          <span className="font-bold text-ink">tranquilo</span> de{' '}
          <span className="font-bold text-ink">7 años</span> que vive en{' '}
          <span className="font-bold text-ink">Barcelona</span> con su hermana y
          sus padres.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {MOBILE_ATTRIBUTE_CHIPS.map((chip) => (
            <span key={chip.label} style={{ transform: `rotate(${chip.tilt}deg)` }}>
              <Chip tono={chip.tono} size="sm">
                {chip.label}
              </Chip>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
