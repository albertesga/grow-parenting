'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';

const LOTTIE_WIDTH = 1920;
const LOTTIE_HEIGHT = 1080;
// Visual bounds extracted from the real .lottie file supplied by the user.
// Shape Layer 1 is positioned at [856, 540], path starts at [-622, 86]
// and ends at [830, 106].
const START_ANCHOR = { x: 234, y: 626 };
const END_ANCHOR = { x: 1686, y: 646 };
const MIN_ARROW_WIDTH = 108;

interface ArrowBox {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}

interface ScrollLottieArrowProps {
  progress: MotionValue<number>;
}

/**
 * ScrollLottieArrow · flecha editorial controlada por scroll.
 *
 * No usa porcentajes fijos. Mide el headline y la polaroid reales en viewport,
 * y calcula la caja del Lottie para que el anchor inicial y final coincidan con
 * ambos elementos. Esto evita drift entre breakpoints, zoom y estados del
 * parallax.
 */
export default function ScrollLottieArrow({ progress }: ScrollLottieArrowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<import('lottie-web').AnimationItem | null>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const settleFramesRef = useRef(0);
  const [box, setBox] = useState<ArrowBox | null>(null);
  const revealOpacity = useTransform(progress, [0.16, 0.28], [0, 1]);

  const measure = useCallback(() => {
    const title = document.querySelector<HTMLElement>('[data-intro-title]');
    const polaroid = document.querySelector<HTMLElement>('[data-intro-polaroid]');

    if (!title || !polaroid) {
      setBox(null);
      return;
    }

    const titleRect = title.getBoundingClientRect();
    const polaroidRect = polaroid.getBoundingClientRect();

    if (titleRect.width <= 0 || polaroidRect.width <= 0) {
      setBox(null);
      return;
    }

    const viewportWidth = window.innerWidth;
    const startGap = Math.min(46, Math.max(24, viewportWidth * 0.018));
    const endInset = Math.min(18, Math.max(8, viewportWidth * 0.008));

    const desiredStart = {
      x: titleRect.right + startGap,
      y: titleRect.top + titleRect.height * 0.62,
    };
    const desiredEnd = {
      x: polaroidRect.left + endInset,
      y: polaroidRect.top + polaroidRect.height * 0.34,
    };

    const localDx = END_ANCHOR.x - START_ANCHOR.x;
    const localDy = END_ANCHOR.y - START_ANCHOR.y;
    const desiredDx = desiredEnd.x - desiredStart.x;
    const desiredDy = desiredEnd.y - desiredStart.y;
    const localDistance = Math.hypot(localDx, localDy);
    const desiredDistance = Math.hypot(desiredDx, desiredDy);
    const scale = Math.max(MIN_ARROW_WIDTH / LOTTIE_WIDTH, desiredDistance / localDistance);
    const rotation = Math.atan2(desiredDy, desiredDx) - Math.atan2(localDy, localDx);
    const width = LOTTIE_WIDTH * scale;
    const height = LOTTIE_HEIGHT * scale;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const anchorX = START_ANCHOR.x * scale;
    const anchorY = START_ANCHOR.y * scale;
    const rotatedAnchorX = anchorX * cos - anchorY * sin;
    const rotatedAnchorY = anchorX * sin + anchorY * cos;
    const left = desiredStart.x - rotatedAnchorX;
    const top = desiredStart.y - rotatedAnchorY;

    setBox({ left, top, width, height, rotation });
  }, []);

  const scheduleMeasure = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      measure();
      if (settleFramesRef.current > 0) {
        settleFramesRef.current -= 1;
        scheduleMeasure();
      }
    });
  }, [measure]);

  const trackMovingTargets = useCallback(() => {
    settleFramesRef.current = Math.max(settleFramesRef.current, 42);
    scheduleMeasure();
  }, [scheduleMeasure]);

  useEffect(() => {
    let mounted = true;

    import('lottie-web').then(({ default: lottie }) => {
      if (!mounted || !containerRef.current) return;

      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/homepage/about-us/lottie/intro-arrow-right-hand-drawn.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });

      animationRef.current = animation;
      animation.addEventListener('DOMLoaded', () => {
        animation.goToAndStop(frameRef.current, true);
        trackMovingTargets();
      });
    });

    trackMovingTargets();
    window.addEventListener('resize', trackMovingTargets);
    window.addEventListener('scroll', trackMovingTargets, { passive: true });

    return () => {
      mounted = false;
      window.removeEventListener('resize', trackMovingTargets);
      window.removeEventListener('scroll', trackMovingTargets);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [scheduleMeasure]);

  useMotionValueEvent(progress, 'change', (value) => {
    frameRef.current = Math.max(0, Math.min(59, value * 59));
    animationRef.current?.goToAndStop(frameRef.current, true);
    trackMovingTargets();
  });

  const renderBox = box ?? {
    left: -9999,
    top: -9999,
    width: MIN_ARROW_WIDTH,
    height: MIN_ARROW_WIDTH * (LOTTIE_HEIGHT / LOTTIE_WIDTH),
    rotation: 0,
  };

  return (
    <motion.div
      data-intro-lottie-arrow
      aria-hidden="true"
      className="pointer-events-none absolute z-[8] hidden overflow-visible lg:block"
      style={{
        left: renderBox.left,
        top: renderBox.top,
        width: renderBox.width,
        height: renderBox.height,
        opacity: box ? revealOpacity : 0,
      }}
    >
      <div
        className="relative h-full w-full overflow-visible"
        style={{
          transform: `rotate(${renderBox.rotation}rad)`,
          transformOrigin: '0 0',
        }}
      >
        <div ref={containerRef} className="relative h-full w-full overflow-visible" />
      </div>
    </motion.div>
  );
}
