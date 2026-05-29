'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';

const LOTTIE_WIDTH = 150;
const LOTTIE_HEIGHT = 84;
// Real visual anchors extracted from /Downloads/arrow.lottie:
// layer position [78.125, 34.75] + path coords scaled by 120.366%.
// Tail is the right/lower start of the main stroke; head is the left tip.
const TAIL_ANCHOR = { x: 145, y: 73 };
const HEAD_ANCHOR = { x: 6, y: 31 };
const MIN_ARROW_WIDTH = 120;

interface ArrowBox {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}

interface EmotionalLottieArrowProps {
  progress: MotionValue<number>;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function EmotionalLottieArrow({ progress }: EmotionalLottieArrowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<import('lottie-web').AnimationItem | null>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const settleFramesRef = useRef(0);
  const [box, setBox] = useState<ArrowBox | null>(null);
  const opacity = useTransform(progress, [0.52, 0.62], [0, 1]);

  const measure = useCallback(() => {
    const start = document.querySelector<HTMLElement>('[data-emotional-arrow-start]');
    const target = document.querySelector<HTMLElement>('[data-emotional-arrow-target]');

    if (!start || !target) {
      setBox(null);
      return;
    }

    const startRect = start.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (startRect.width <= 0 || targetRect.width <= 0) {
      setBox(null);
      return;
    }

    const viewportWidth = window.innerWidth;
    const tailGap = clamp(viewportWidth * 0.012, 12, 28);
    const headInset = clamp(targetRect.width * 0.18, 48, 76);

    const desiredTail = {
      x: startRect.left - tailGap,
      y: startRect.top + startRect.height * 0.54,
    };
    const desiredHead = {
      x: targetRect.right - headInset,
      y: targetRect.top + clamp(targetRect.height * 0.12, 34, 58),
    };

    const localDx = HEAD_ANCHOR.x - TAIL_ANCHOR.x;
    const localDy = HEAD_ANCHOR.y - TAIL_ANCHOR.y;
    const desiredDx = desiredHead.x - desiredTail.x;
    const desiredDy = desiredHead.y - desiredTail.y;
    const localDistance = Math.hypot(localDx, localDy);
    const desiredDistance = Math.hypot(desiredDx, desiredDy);
    const scale = Math.max(MIN_ARROW_WIDTH / LOTTIE_WIDTH, desiredDistance / localDistance);
    const rotation = Math.atan2(desiredDy, desiredDx) - Math.atan2(localDy, localDx);
    const width = LOTTIE_WIDTH * scale;
    const height = LOTTIE_HEIGHT * scale;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const anchorX = TAIL_ANCHOR.x * scale;
    const anchorY = TAIL_ANCHOR.y * scale;
    const rotatedAnchorX = anchorX * cos - anchorY * sin;
    const rotatedAnchorY = anchorX * sin + anchorY * cos;
    const left = desiredTail.x - rotatedAnchorX;
    const top = desiredTail.y - rotatedAnchorY;

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
        path: '/homepage/about-us/lottie/emotional-arrow-to-photos.json',
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
  }, [trackMovingTargets]);

  useMotionValueEvent(progress, 'change', (value) => {
    const normalized = clamp((value - 0.52) / 0.26, 0, 1);
    frameRef.current = normalized * 39;
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
      data-emotional-lottie-arrow
      aria-hidden="true"
      className="pointer-events-none absolute z-[25] hidden overflow-visible lg:block"
      style={{
        left: renderBox.left,
        top: renderBox.top,
        width: renderBox.width,
        height: renderBox.height,
        opacity: box ? opacity : 0,
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
