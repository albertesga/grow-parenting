'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import Chip, { ChipStripTilt, ChipTono } from './Chip';
import TonalUnderline from './TonalUnderline';

interface HeroRevealSectionProps {
  /** Progreso de scroll del wrapper padre (0 → 1) */
  progress: MotionValue<number>;
  /** Si true · adapta tamaños y spacing a mobile */
  mobile?: boolean;
}

/**
 * HeroRevealSection v2 · DS-aligned · "Este es Inti."
 *
 * Composición (mantiene parallax · cero handwritten):
 *  - Eyebrow caps Galiner Light · "TESTIMONIO · CAP. 01"
 *  - Headline Galiner mix Light + Bold · "Este es Inti."
 *  - TonalUnderline mint debajo · scaleX animado (reemplaza swash)
 *  - Body Inter Light + Bold · 3 líneas con énfasis en palabras clave
 *  - ChipStripTilt · 3 chips de atributos (feliz · sensible · tranquilo)
 *
 * Timeline (progress 0 → 1):
 *  · 0.00 → 0.05  · eyebrow fades in
 *  · 0.00 → 0.22  · headline reveal con leve translateY
 *  · 0.20 → 0.35  · TonalUnderline mint scaleX
 *  · 0.30 → 0.70  · paragraph fade
 *  · 0.55 → 0.78  · 3 attribute chips stagger
 *
 * Sin handwritten doodles · sustituidos por DS primitives.
 */

// 3 attribute chips · tonos canon (mint default · blush suave · gold info)
const ATTRIBUTE_CHIPS: { tono: ChipTono; label: string }[] = [
  { tono: 'mint', label: 'feliz' },
  { tono: 'blush', label: 'sensible' },
  { tono: 'gold', label: 'tranquilo' },
];

export default function HeroRevealSection({
  progress,
  mobile = false,
}: HeroRevealSectionProps) {
  // Reveal opacities
  const eyebrowOpacity = useTransform(progress, [0, 0.05], [0, 1]);
  const eyebrowY = useTransform(progress, [0, 0.05], [8, 0]);
  const titleOpacity = useTransform(progress, [0, 0.22], [0, 1]);
  const titleY = useTransform(progress, [0, 0.22], [24, 0]);
  const underlineProgress = useTransform(progress, [0.2, 0.4], [0, 1]);
  const paragraphOpacity = useTransform(progress, [0.3, 0.7], [0, 1]);
  const paragraphY = useTransform(progress, [0.3, 0.7], [20, 0]);

  // Tamaños responsive
  const titleSize = mobile
    ? 'text-[15vw] leading-[0.95]'
    : 'text-[clamp(56px,8vw,160px)] leading-[0.95]';
  const paragraphSize = mobile
    ? 'text-[clamp(15px,4.2vw,18px)] leading-[1.5]'
    : 'text-[clamp(18px,1.6vw,32px)] leading-[1.45]';

  return (
    <div className="relative">
      {/* Eyebrow caps · Galiner Light · letter-spacing wide */}
      <motion.p
        className="mb-3 font-serif font-light uppercase text-ink-soft md:mb-4"
        style={{
          opacity: eyebrowOpacity,
          y: eyebrowY,
          fontSize: mobile ? '10px' : 'clamp(11px, 0.85vw, 13px)',
          letterSpacing: '0.22em',
        }}
      >
        Testimonio · Cap. 01
      </motion.p>

      {/* Headline · "Este es Inti." · Galiner mix Light + Bold */}
      <motion.h1
        className={`font-serif font-light tracking-tight text-ink ${titleSize}`}
        style={{
          opacity: titleOpacity,
          y: titleY,
          letterSpacing: '-0.02em',
        }}
      >
        Este es <span className="font-bold">Inti.</span>
      </motion.h1>

      {/* TonalUnderline mint · scaleX animado · reemplaza swash handwritten */}
      <TonalUnderline
        tono="mint"
        width={mobile ? 220 : 320}
        height={mobile ? 3 : 4}
        progress={underlineProgress}
        marginTop={mobile ? 8 : 14}
        className="origin-left"
      />

      {/* Párrafo · Inter Light + Bold en palabras clave */}
      <motion.p
        className={`mt-8 max-w-[28ch] font-text font-light text-ink-soft ${paragraphSize}`}
        style={{
          opacity: paragraphOpacity,
          y: paragraphY,
          letterSpacing: '-0.005em',
        }}
      >
        Un niño <span className="font-bold text-ink">feliz</span>, sensible y{' '}
        <span className="font-bold text-ink">tranquilo</span>
        <br className="hidden md:block" />
        {' '}de <span className="font-bold text-ink">7 años</span> que vive en{' '}
        <span className="font-bold text-ink">Barcelona</span>
        <br className="hidden md:block" />
        {' '}con su hermana y sus padres.
      </motion.p>

      {/* 3 attribute chips · chip-strip-tilt · stagger fade-in
          Reemplaza las 4 flechas handwritten · DS-native */}
      <div className="mt-7 md:mt-9">
        <ChipStripTilt className="justify-start">
          {ATTRIBUTE_CHIPS.map((c, i) => (
            <AttrChip
              key={c.label}
              index={i}
              progress={progress}
              tono={c.tono}
              label={c.label}
              size={mobile ? 'sm' : 'md'}
            />
          ))}
        </ChipStripTilt>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   AttrChip · chip con stagger fade-in tied to scroll progress
   ──────────────────────────────────────────────────────────────────── */

function AttrChip({
  index,
  progress,
  tono,
  label,
  size,
}: {
  index: number;
  progress: MotionValue<number>;
  tono: ChipTono;
  label: string;
  size: 'sm' | 'md';
}) {
  const start = 0.55 + index * 0.04;
  const end = 0.7 + index * 0.04;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const scale = useTransform(progress, [start, end], [0.88, 1]);

  return (
    <motion.div style={{ opacity, y, scale }}>
      <Chip tono={tono} size={size}>
        {label}
      </Chip>
    </motion.div>
  );
}
