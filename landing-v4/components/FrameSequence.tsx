'use client';

import { useEffect, useRef } from 'react';

interface FrameSequenceProps {
  /** Total de frames disponibles */
  frameCount: number;
  /** Función que devuelve la URL del frame N (1-indexed) */
  frameSrc: (i: number) => string;
  /** Ref al wrapper sticky · usamos su rect para calcular progress */
  wrapperRef: React.RefObject<HTMLElement | null>;
  /** Alt text */
  alt?: string;
  /** ClassName del img */
  className?: string;
  /** Style adicional · merged con width/height */
  style?: React.CSSProperties;
}

/**
 * FrameSequence · reemplaza `<video>` scroll-scrubbing por una secuencia
 * de frames precargados que se intercambian con scroll.
 *
 * Por qué · scroll-scrubbing en H.264 es lento porque cada `seek` requiere
 * decodificar desde el keyframe más cercano · causa stuttering al scroll
 * rápido. Frame sequence = imagen → swap src instantáneo. Sin decode.
 *
 * Pipeline:
 *  1. Mount · preload todos los frames en `<Image>` cache del browser
 *  2. rAF loop · lee scrollY, calcula progress del wrapper, mapea a idx
 *  3. Si idx cambió · actualiza `src` del img visible
 *
 * Memory: 104 frames × 30KB ≈ 3MB en cache · aceptable para landing.
 */
export default function FrameSequence({
  frameCount,
  frameSrc,
  wrapperRef,
  alt = '',
  className = '',
  style,
}: FrameSequenceProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const preloadedRef = useRef<HTMLImageElement[]>([]);
  const lastIdxRef = useRef<number>(-1);

  // Preload todos los frames al mount · loaded en cache browser
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      imgs.push(img);
    }
    preloadedRef.current = imgs;
  }, [frameCount, frameSrc]);

  // rAF loop · sincroniza imagen visible con scroll
  useEffect(() => {
    let rafId = 0;
    let lastScrollY = -1;

    const tick = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY) {
        lastScrollY = currentScrollY;
        const wrapper = wrapperRef.current;
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const wrapperTopDoc = rect.top + currentScrollY;
          const scrolled = currentScrollY - wrapperTopDoc;
          const totalScrollable = rect.height - window.innerHeight;
          const progress =
            totalScrollable > 0
              ? Math.max(0, Math.min(1, scrolled / totalScrollable))
              : 0;
          const idx = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(progress * (frameCount - 1)))
          );
          if (idx !== lastIdxRef.current && imgRef.current) {
            lastIdxRef.current = idx;
            // 1-indexed para matchear el patrón f-001.jpg, f-002.jpg, etc.
            imgRef.current.src = frameSrc(idx + 1);
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [frameCount, frameSrc, wrapperRef]);

  return (
    <img
      ref={imgRef}
      src={frameSrc(1)}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
    />
  );
}
