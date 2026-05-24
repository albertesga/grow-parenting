'use client';

// Usamos <img> nativo en lugar de next/image porque los assets son
// decorativos pequeños (no críticos para LCP) y porque next/image puede
// tener problemas con PNGs grandes sin alpha · más control directo.

/**
 * HandwrittenAsset · renderiza un PNG handwritten desde
 * /public/img/handwritten/{filename}.png
 *
 * Catálogo completo (20 variantes) organizado por uso:
 *
 *  DECORATIVOS PUROS (sin punta, sin dirección):
 *   - cloud       · nube/speech bubble (≈1.4:1)
 *   - sparkle     · estrella 4 puntas con rayos (1:1)
 *   - sparkleAlt  · asterisco 8 puntas (1:1)
 *   - circle      · óvalo handwritten · trazo grueso (≈1.4:1)
 *   - circleLarge · óvalo grande con tilt (≈1.4:1)
 *   - wave        · línea horizontal ondulada (≈4:1)
 *   - doubleLine  · dos líneas paralelas horizontales (≈4:1)
 *   - curve       · línea curva limpia (≈5:1)
 *   - swash       · línea sinuosa con loop al final (≈3.5:1)
 *
 *  FLECHAS DIRECCIONALES (con punta clara):
 *   Horizontales:
 *   - arrowDouble    · flecha doble ←—→ (≈4:1)
 *   - arrowWave      · línea ondulada apuntando derecha (≈3.5:1)
 *   - arrowThinRight · curva delgada apuntando derecha (≈1.3:1)
 *   - arrowThinLeft  · curva delgada apuntando izquierda (≈1.3:1)
 *   - arrowRight     · curva con punta derecha (≈1.3:1)
 *
 *   Verticales:
 *   - arrowDown      · vertical ondulada apuntando abajo (1:1.5)
 *
 *   Con loops (decorativas-direccionales):
 *   - arrowLoop      · espiral grande con punta arriba-derecha (1:1)
 *   - arrowLoopDown  · loop con punta abajo-derecha (1:1)
 *   - arrowSmallLoop · loop pequeño con punta arriba-derecha (1:1)
 *
 *   Curvas grandes:
 *   - arrowUpLeft    · curva apuntando arriba-izquierda (≈1.3:1)
 *   - arrowCurve     · curva apuntando abajo-derecha (≈1.3:1)
 *
 *  Para reusar el mismo asset en orientaciones diferentes, pasa
 *  `rotate` en grados o `flipX` para espejo horizontal.
 */
export type HandwrittenVariant =
  // Decorativos
  | 'cloud'
  | 'sparkle'
  | 'sparkleAlt'
  | 'circle'
  | 'circleLarge'
  | 'wave'
  | 'doubleLine'
  | 'curve'
  | 'swash'
  // Direccionales horizontales
  | 'arrowDouble'
  | 'arrowWave'
  | 'arrowThinRight'
  | 'arrowThinLeft'
  | 'arrowRight'
  // Direccionales verticales
  | 'arrowDown'
  // Direccionales con loops
  | 'arrowLoop'
  | 'arrowLoopDown'
  | 'arrowSmallLoop'
  // Curvas grandes
  | 'arrowUpLeft'
  | 'arrowCurve';

interface HandwrittenAssetProps {
  variant: HandwrittenVariant;
  width: number;
  height?: number;
  rotate?: number;
  flipX?: boolean;
  alt?: string;
  className?: string;
}

// Aspect ratios reales post-crop (whitespace eliminado con PIL bbox crop).
// Estos ratios son la dimensión exacta de cada PNG · usar para calcular height.
const ASSET_META: Record<HandwrittenVariant, { aspect: number; src: string }> = {
  // Decorativos
  cloud:         { aspect: 1.45,  src: '/img/handwritten/cloud.png' },
  sparkle:       { aspect: 0.97,  src: '/img/handwritten/sparkle.png' },
  sparkleAlt:    { aspect: 1.03,  src: '/img/handwritten/sparkle-alt.png' },
  circle:        { aspect: 1.65,  src: '/img/handwritten/circle.png' },
  circleLarge:   { aspect: 1.31,  src: '/img/handwritten/circle-large.png' },
  wave:          { aspect: 22.9,  src: '/img/handwritten/wave.png' },
  doubleLine:    { aspect: 9.81,  src: '/img/handwritten/double-line.png' },
  curve:         { aspect: 16.04, src: '/img/handwritten/curve.png' },
  swash:         { aspect: 11.6,  src: '/img/handwritten/swash.png' },
  // Direccionales horizontales
  arrowDouble:   { aspect: 5.88,  src: '/img/handwritten/arrow-double.png' },
  arrowWave:     { aspect: 12.11, src: '/img/handwritten/arrow-wave.png' },
  arrowThinRight:{ aspect: 2.56,  src: '/img/handwritten/arrow-thin-right.png' },
  arrowThinLeft: { aspect: 3.73,  src: '/img/handwritten/arrow-thin-left.png' },
  arrowRight:    { aspect: 4.14,  src: '/img/handwritten/arrow-right.png' },
  // Direccionales verticales
  arrowDown:     { aspect: 0.17,  src: '/img/handwritten/arrow-down.png' },
  // Direccionales con loops
  arrowLoop:     { aspect: 1.2,   src: '/img/handwritten/arrow-loop.png' },
  arrowLoopDown: { aspect: 1.57,  src: '/img/handwritten/arrow-loop-down.png' },
  arrowSmallLoop:{ aspect: 1.95,  src: '/img/handwritten/arrow-small-loop.png' },
  // Curvas grandes
  arrowUpLeft:   { aspect: 3.5,   src: '/img/handwritten/arrow-up-left.png' },
  arrowCurve:    { aspect: 3.38,  src: '/img/handwritten/arrow-curve.png' },
};

export default function HandwrittenAsset({
  variant,
  width,
  height,
  rotate = 0,
  flipX = false,
  alt = '',
  className = '',
}: HandwrittenAssetProps) {
  const meta = ASSET_META[variant];
  const computedHeight = height ?? Math.round(width / meta.aspect);

  const transforms: string[] = [];
  if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`);
  if (flipX) transforms.push('scaleX(-1)');

  // PNGs procesados con PIL · 2 colores · negro (stroke) + transparente.
  // 516KB total para 20 assets · perfectamente compactos. Sin filter.
  return (
    <img
      src={meta.src}
      alt={alt}
      width={width}
      height={computedHeight}
      className={className}
      style={{
        width,
        height: computedHeight,
        ...(transforms.length > 0 ? { transform: transforms.join(' ') } : {}),
      }}
      draggable={false}
    />
  );
}
