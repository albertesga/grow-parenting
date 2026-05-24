'use client';

import IntroPhotoSection from './IntroPhotoSection';
import EmotionalStatementSection from './EmotionalStatementSection';
import GrowLogo from './GrowLogo';

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
    <main className="relative w-full overflow-x-hidden">
      {/* Logo persistente top-left · siempre visible, discreto */}
      <header className="fixed left-6 top-6 z-50 md:left-10 md:top-8">
        <GrowLogo className="h-9 w-auto md:h-11" />
        <span className="sr-only">Grow</span>
      </header>

      {/* Sección 1 + 2 fusionadas · sticky scroll narrative */}
      <IntroPhotoSection />

      {/* Sección 3 · declaración emocional */}
      <EmotionalStatementSection />
    </main>
  );
}
