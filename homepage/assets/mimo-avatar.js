/* ════════════════════════════════════════════════════════════════════════
   mimo-avatar.js · component reusable del avatar Mimo (chroma kling MP4)
   ════════════════════════════════════════════════════════════════════════

   El avatar coral del homepage hero también vive (visualmente) en otras
   superficies (waitlist thank-you, posibles error pages, etc.). Este module
   centraliza:
   - Markup del avatar (2 videos apilados · scroll + tap)
   - CSS (chroma key via SVG filter, drop shadow, levitación, tap toggle)
   - SVG filter #luma-to-alpha (chroma key per-pixel)
   - Wire de interactividad opcional (hover/tap arranca el tap video)

   Uso:
     <div id="my-avatar"></div>
     <script src="/assets/mimo-avatar.js"></script>
     <script>
       MimoAvatar.mount(document.getElementById('my-avatar'), {
         interactive: true,         // hover/tap dispara el tap MP4
         phaseTag: 'Embarazo · sem 4–40', // opcional · null = sin tag
         size: 'md',                // 'sm' | 'md' | 'lg' (default 'md')
       });
     </script>

   El homepage hero NO usa este module (mantiene su markup inline porque
   main.js engancha IDs concretos para scroll-scrub + halo travel). Pero
   las CLASSES y los MP4s son los mismos · si cambias el visual del
   avatar (e.g., nuevo MP4 o nueva shadow), actualiza:
     - homepage/styles.css · `.hero-avatar` rules (homepage hero)
     - este file · `GROW_AVATAR_CSS` constant (resto de surfaces)
  Ambas fuentes deben matchear.
  Nota perf (May 2026): `hero-avatar.mp4` se eliminó del bundle porque no
  estaba referenciado; el canon activo usa `hero-scroll.mp4` + `hero-tap.mp4`. */

(function () {
  'use strict';

  /* CSS del avatar · namespace `.mimo-avatar*` distinto de `.hero-avatar*`
     para no chocar con el homepage hero. Mismas keyframes (levitate +
     shadow pulse inverso) que la original. */
  var GROW_AVATAR_CSS = [
    '.mimo-avatar {',
    '  position: relative;',
    '  width: 100%;',
    '  aspect-ratio: 1 / 1;',
    '  margin: 0 auto;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  --mimo-avatar-max: 280px;',
    '  max-width: var(--mimo-avatar-max);',
    '}',
    '.mimo-avatar--sm { --mimo-avatar-max: 180px; }',
    '.mimo-avatar--md { --mimo-avatar-max: 280px; }',
    '.mimo-avatar--lg { --mimo-avatar-max: 520px; }',
    /* Drop shadow ovalada bajo el avatar · pulsa inversa a la levitación
       para crear ilusión de "elevación" (cuando sube, sombra se reduce). */
    '.mimo-avatar::after {',
    '  content: "";',
    '  position: absolute;',
    '  bottom: 18%;',
    '  left: 50%;',
    '  width: 42%;',
    '  height: 14px;',
    '  border-radius: 50%;',
    '  background: radial-gradient(ellipse at center,',
    '    rgba(42, 33, 27, 0.32) 0%,',
    '    rgba(42, 33, 27, 0.16) 35%,',
    '    transparent 75%);',
    '  filter: blur(6px);',
    '  pointer-events: none;',
    '  z-index: 0;',
    '  transform: translateX(-50%);',
    '  animation: mimo-avatar-shadow 4.4s ease-in-out infinite;',
    '  will-change: transform, opacity;',
    '}',
    '.mimo-avatar-vid {',
    '  position: absolute;',
    '  inset: 7%;',
    '  width: 86%;',
    '  height: 86%;',
    '  object-fit: contain;',
    '  z-index: 1;',
    '  pointer-events: none;',
    '  transition: opacity 400ms cubic-bezier(0.4, 0, 0.6, 1);',
    '  filter: url(#luma-to-alpha);',
    '  -webkit-filter: url(#luma-to-alpha);',
    '  animation: mimo-avatar-float 4.4s ease-in-out infinite;',
    '  will-change: transform;',
    '}',
    '.mimo-avatar-vid--tap {',
    '  opacity: 0;',
    '  z-index: 2;',
    '}',
    '.mimo-avatar.is-playing-tap .mimo-avatar-vid--scroll { opacity: 0; }',
    '.mimo-avatar.is-playing-tap .mimo-avatar-vid--tap { opacity: 1; }',
    '.mimo-avatar-trigger {',
    '  position: absolute;',
    '  inset: 7%;',
    '  z-index: 3;',
    '  background: transparent;',
    '  border: 0;',
    '  padding: 0;',
    '  cursor: grab;',
    '  border-radius: 50%;',
    '  -webkit-tap-highlight-color: transparent;',
    '}',
    '.mimo-avatar.is-playing-tap .mimo-avatar-trigger,',
    '.mimo-avatar-trigger:active { cursor: grabbing; }',
    '.mimo-avatar-trigger:focus-visible {',
    '  outline: 2px solid #F2A57A;',
    '  outline-offset: 4px;',
    '}',
    '.mimo-avatar-phase {',
    '  position: absolute;',
    '  bottom: 12px;',
    '  left: 50%;',
    '  transform: translateX(-50%);',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 8px;',
    '  padding: 8px 14px;',
    '  background: rgba(250, 247, 240, 0.86);',
    '  backdrop-filter: blur(8px);',
    '  -webkit-backdrop-filter: blur(8px);',
    '  border: 1px solid rgba(201, 194, 178, 0.6);',
    '  border-radius: 999px;',
    '  font-family: "Inter", system-ui, -apple-system, sans-serif;',
    '  font-size: 12px;',
    '  font-weight: 500;',
    '  color: #4d4d4d;',
    '  z-index: 4;',
    '  white-space: nowrap;',
    '}',
    '.mimo-avatar-phase .dot {',
    '  width: 8px;',
    '  height: 8px;',
    '  border-radius: 50%;',
    '  background: #F2A57A;',
    '}',
    '@keyframes mimo-avatar-float {',
    '  0%, 100% { transform: translateY(0); }',
    '  50%      { transform: translateY(-6px); }',
    '}',
    '@keyframes mimo-avatar-shadow {',
    '  0%, 100% { transform: translateX(-50%) scale(1);    opacity: 0.32; }',
    '  50%      { transform: translateX(-50%) scale(0.74); opacity: 0.15; }',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  .mimo-avatar-vid, .mimo-avatar::after { animation: none !important; }',
    '}'
  ].join('\n');

  /* SVG filter #luma-to-alpha · idéntico al definido en homepage/index.html.
     Inyectamos solo si NO existe ya en el DOM (homepage hero ya lo tiene). */
  var GROW_AVATAR_FILTER = [
    '<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">',
    '  <defs>',
    '    <filter id="luma-to-alpha" color-interpolation-filters="sRGB">',
    '      <feColorMatrix in="SourceGraphic" type="matrix" result="orig" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>',
    '      <feMorphology in="SourceGraphic" operator="dilate" radius="12"/>',
    '      <feMorphology operator="erode" radius="12"/>',
    '      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 1 1 0 -0.3"/>',
    '      <feComponentTransfer><feFuncA type="linear" slope="5" intercept="-0.5"/></feComponentTransfer>',
    '      <feMorphology operator="erode" radius="2"/>',
    '      <feGaussianBlur stdDeviation="1.2" result="matte"/>',
    '      <feComposite in="orig" in2="matte" operator="in"/>',
    '    </filter>',
    '  </defs>',
    '</svg>'
  ].join('\n');

  var injected = false;
  function ensureGlobals() {
    if (injected) return;
    injected = true;
    /* CSS · siempre inject (las clases .mimo-avatar* son del namespace
       del component · no chocan con homepage hero). */
    var style = document.createElement('style');
    style.setAttribute('data-mimo-avatar', '');
    style.textContent = GROW_AVATAR_CSS;
    document.head.appendChild(style);
    /* SVG filter · solo si #luma-to-alpha aún no existe (homepage hero
       ya lo define inline · evitamos duplicado). */
    if (!document.getElementById('luma-to-alpha')) {
      var div = document.createElement('div');
      div.innerHTML = GROW_AVATAR_FILTER;
      document.body.appendChild(div.firstElementChild);
    }
  }

  /* Wire interactivity · hover/click sobre el trigger arranca el tap MP4
     (mismo behavior que homepage hero · ver main.js mod 9). */
  function wireInteractive(root) {
    var scroll = root.querySelector('.mimo-avatar-vid--scroll');
    var tap = root.querySelector('.mimo-avatar-vid--tap');
    var trigger = root.querySelector('.mimo-avatar-trigger');
    if (!scroll || !tap || !trigger) return;

    var playing = false;
    function playTap() {
      if (playing) return;
      playing = true;
      root.classList.add('is-playing-tap');
      tap.currentTime = 0;
      var p = tap.play();
      if (p && p.catch) p.catch(function () { playing = false; root.classList.remove('is-playing-tap'); });
    }
    tap.addEventListener('ended', function () {
      playing = false;
      root.classList.remove('is-playing-tap');
    });
    trigger.addEventListener('mouseenter', playTap);
    trigger.addEventListener('click', playTap);
    trigger.addEventListener('touchstart', function (e) { e.preventDefault(); playTap(); }, { passive: false });
  }

  function mountMimoAvatar(container, opts) {
    if (!container) return null;
    opts = opts || {};
    ensureGlobals();

    var interactive = opts.interactive !== false; // default true
    var size = opts.size || 'md';
    var phaseTag = opts.phaseTag || null;
    var scrollSrc = opts.scrollSrc || '/assets/hero-scroll.mp4';
    var tapSrc = opts.tapSrc || '/assets/hero-tap.mp4';

    var root = document.createElement('div');
    root.className = 'mimo-avatar mimo-avatar--' + size;

    var html = '';
    html += '<video class="mimo-avatar-vid mimo-avatar-vid--scroll" src="' + scrollSrc + '" muted playsinline preload="auto" aria-hidden="true"></video>';
    if (interactive) {
      html += '<video class="mimo-avatar-vid mimo-avatar-vid--tap" src="' + tapSrc + '" muted playsinline preload="auto" aria-hidden="true"></video>';
      html += '<button class="mimo-avatar-trigger" type="button" aria-label="Reproducir animación del avatar"></button>';
    }
    if (phaseTag) {
      html += '<div class="mimo-avatar-phase"><span class="dot"></span>' + phaseTag + '</div>';
    }
    root.innerHTML = html;

    container.appendChild(root);

    if (interactive) wireInteractive(root);

    /* Cuando el scroll video carga su primer frame · arranca pausado en t=0
       para que el avatar se vea estable desde el primer paint (no negro). */
    var scroll = root.querySelector('.mimo-avatar-vid--scroll');
    if (scroll) {
      scroll.addEventListener('loadedmetadata', function () {
        try { scroll.currentTime = 0; } catch (e) {}
      }, { once: true });
    }

    return root;
  }

  window.MimoAvatar = { mount: mountMimoAvatar };
})();
