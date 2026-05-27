'use client';

import IntroPhotoSection from './IntroPhotoSection';
import EmotionalStatementSection from './EmotionalStatementSection';
import NarrativeRevealSection from './NarrativeRevealSection';
import ScrollProgressLine from './ScrollProgressLine';

/**
 * LandingPage · orquesta las 3 secciones narrativas de Inti.
 *
 * Layout narrativo:
 *  1. Intro fullscreen · foto grande de Inti centrada (100vh)
 *  2. Hero reveal · al scroll, la foto se reduce + mueve a la derecha
 *     como polaroid, y aparece el texto "Este es Inti." con flechas
 *     handwritten (se renderiza dentro de IntroPhotoSection como
 *     overlay del sticky)
 *  3. Emotional statement · "Probablemente es el mejor niño del mundo..."
 *
 * El logo Grow vive en top-left con position: fixed y se mantiene
 * discreto durante todo el scroll.
 */
export default function LandingPage() {
  return (
    <main className="relative w-full overflow-x-clip">
      <ScrollProgressLine />

      {/* Logo persistente top-left · 3 tamaños responsive
          mobile: h-9 (compacto) · tablet: h-11 · desktop: h-14 */}
      <header className="fixed left-5 top-3 z-50 md:left-8 md:top-7 lg:left-10 lg:top-8">
        <img
          src="/img/grow-logo.png"
          alt="Grow"
          className="h-7 w-auto md:h-11 lg:h-14"
          draggable={false}
        />
      </header>

      {/* Sección 1 + 2 fusionadas · sticky scroll narrative */}
      <IntroPhotoSection />

      {/* Sección 3 · declaración emocional · "Probablemente es el mejor niño" */}
      <EmotionalStatementSection />

      {/* Sección 4 · text reveal · "La verdad es que nadie te prepara para esto" */}
      <NarrativeRevealSection />
    </main>
  );
}
