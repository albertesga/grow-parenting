'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HandwrittenArrow from './HandwrittenArrow';

/**
 * EmotionalStatementSection · sección 3 · declaración íntima del padre.
 *
 * Layout editorial · texto grande tipo manifiesto en el centro,
 * con segunda frase desplazada e íntima debajo.
 *
 * Reveal por scroll · useScroll local (target: section) detecta cuándo
 * la sección entra al viewport y revela el texto progresivamente.
 *
 * Continuidad visual · flecha handwritten arriba a la izquierda que
 * conecta con la narrativa de la sección anterior.
 */
export default function EmotionalStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Reveal staged
  const arrowTopOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const line1Opacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.15, 0.45], [20, 0]);
  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.25, 0.55], [20, 0]);
  const line3Opacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.35, 0.65], [20, 0]);

  const subOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.5, 0.85], [20, 0]);

  const arrowSideOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-10"
      aria-label="Declaración del padre"
    >
      <div className="relative w-full max-w-[1180px]">
        {/* Flecha handwritten viniendo desde arriba · continuidad con
            la sección anterior. Solo visible en desktop. */}
        <motion.div
          className="pointer-events-none absolute -top-10 left-[8vw] hidden md:block"
          style={{ opacity: arrowTopOpacity }}
        >
          <HandwrittenArrow variant="curve-down" size={110} />
        </motion.div>

        {/* Texto principal · 3 líneas grandes */}
        <div className="relative font-grift text-ink">
          <motion.div
            className="text-[clamp(56px,9vw,140px)] font-light leading-[1.0] tracking-tight"
            style={{ opacity: line1Opacity, y: line1Y }}
          >
            Probablemente
          </motion.div>
          <motion.div
            className="mt-1 text-[clamp(56px,9vw,140px)] font-light leading-[1.0] tracking-tight"
            style={{ opacity: line2Opacity, y: line2Y }}
          >
            es el <span className="font-extrabold">mejor niño</span>
          </motion.div>
          <motion.div
            className="mt-1 text-[clamp(56px,9vw,140px)] font-extrabold leading-[1.0] tracking-tight"
            style={{ opacity: line3Opacity, y: line3Y }}
          >
            del mundo.
          </motion.div>
        </div>

        {/* Segunda frase · pequeña, íntima, desplazada */}
        <motion.div
          className="relative mt-14 max-w-[42ch] font-grift text-[clamp(20px,1.7vw,30px)] font-normal leading-[1.4] text-ink-soft md:mt-20 md:ml-[18vw]"
          style={{ opacity: subOpacity, y: subY }}
        >
          ¿qué cómo lo sé?,
          <br />
          pues porque soy su padre.
        </motion.div>

        {/* Flecha lateral apuntando a la frase íntima · desktop only */}
        <motion.div
          className="pointer-events-none absolute bottom-[6vh] right-[4vw] hidden md:block"
          style={{ opacity: arrowSideOpacity }}
        >
          <HandwrittenArrow variant="loop" size={90} />
        </motion.div>
      </div>
    </section>
  );
}
