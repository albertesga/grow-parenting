'use client';

/**
 * GrowLogo · logo wordmark "grow" con bolita mint en lugar de la "o".
 *
 * SVG inline para mantener crisp en cualquier tamaño y evitar HTTP request.
 * Si prefieres asset estático · reemplaza por /img/grow-logo.svg.
 *
 * El path está aproximado al wordmark del brief (g · r · [bolita] · w).
 * Para usar la versión real · reemplaza el path o sustituye por <img>.
 */
export default function GrowLogo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 80"
      className={className}
      aria-label="Grow"
      role="img"
    >
      {/* g */}
      <text
        x="0"
        y="62"
        fontFamily="Grift, system-ui, sans-serif"
        fontSize="80"
        fontWeight="800"
        fill="#1A1A1A"
        letterSpacing="-0.04em"
      >
        gr
      </text>
      {/* bolita · "o" en mint */}
      <circle cx="115" cy="42" r="20" fill="#C8D8B8" />
      {/* w */}
      <text
        x="143"
        y="62"
        fontFamily="Grift, system-ui, sans-serif"
        fontSize="80"
        fontWeight="800"
        fill="#1A1A1A"
        letterSpacing="-0.04em"
      >
        w
      </text>
    </svg>
  );
}
