'use client';

import IntroPhotoSection from './IntroPhotoSection';
import EmotionalStatementSection from './EmotionalStatementSection';
import NarrativeRevealSection from './NarrativeRevealSection';
import NarrativeClosingSection from './NarrativeClosingSection';
import CofoundersCallSection from './CofoundersCallSection';
import ScrollProgressLine from './ScrollProgressLine';
import SiteTopbar from './SiteTopbar';

/**
 * LandingPage · orquesta las 3 secciones narrativas de Inti.
 *
 * Header · usamos el mismo topbar que homepage y waitlist (SiteTopbar)
 * para mantener navegación consistente entre las 3 superficies.
 */
export default function LandingPage() {
  return (
    <main className="relative w-full overflow-x-clip">
      <ScrollProgressLine />

      {/* Topbar unificado · logo + book-nav central + about-us link + CTA waitlist */}
      <SiteTopbar />

      {/* Sección 1 + 2 fusionadas · sticky scroll narrative */}
      <IntroPhotoSection />

      {/* Sección 3 · declaración emocional · "Probablemente es el mejor niño" */}
      <EmotionalStatementSection />

      {/* Sección 4 · text reveal · "Nadie me preparó para ser padre" */}
      <NarrativeRevealSection />

      {/* Sección 5 · cierre narrativo · "No hay reto más grande que criar ·
          la mayor oportunidad" · fill-on-scroll + underline mint */}
      <NarrativeClosingSection />

      {/* Sección 6 · cierre real · convocatoria de cofundadores · 6 perfiles
          tonales + cómo trabajamos + filtro + CTA mailto */}
      <CofoundersCallSection />
    </main>
  );
}
