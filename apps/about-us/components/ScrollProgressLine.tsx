'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollProgressLine · fixed top progress rail.
 *
 * The browser drives the animation with scroll(root), matching modern
 * scroll progress indicators. A tiny JS fallback updates one CSS variable
 * only when scroll timelines are not supported.
 */
export default function ScrollProgressLine() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports('animation-timeline: scroll(root block)');

    if (supportsScrollTimeline) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      railRef.current?.style.setProperty('--grow-scroll-progress', String(progress));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    railRef.current?.setAttribute('data-scroll-fallback', 'true');
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="grow-scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[80] h-3"
    >
      <div className="grow-scroll-progress__hairline" />
      <div className="grow-scroll-progress__clip">
        <div className="grow-scroll-progress__fill" />
      </div>
      <div className="grow-scroll-progress__marker" />
    </div>
  );
}
