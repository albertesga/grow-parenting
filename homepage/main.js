    (() => {
      'use strict';
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const topbar = document.getElementById("topbar");
      const stickyCta = document.getElementById("sticky-cta");
      const blocks = document.querySelectorAll(".block");
      const block2 = blocks[1];

      /* 1 · Topbar.scrolled cuando scroll > 80 */
      window.addEventListener("scroll", () => {
        topbar.classList.toggle("scrolled", window.scrollY > 80);
      }, { passive: true });

      /* 2 · Quote rotator · 5.4s con stagger 900ms por bloque */
      if (!reduced) {
        document.querySelectorAll(".quote-rotator").forEach((rot, idx) => {
          const items = rot.querySelectorAll(".q-item");
          if (items.length <= 1) return;
          let i = 0;
          setTimeout(() => {
            setInterval(() => {
              items[i].classList.remove("is-active");
              i = (i + 1) % items.length;
              items[i].classList.add("is-active");
            }, 5400);
          }, idx * 900);
        });
      }

      /* 2.5 · Flow stepper reveal · title + cards aparecen secuencialmente
         al entrar en viewport. Si no hay JS o reduced-motion, el contenido
         permanece visible por defecto. */
      const flowSection = document.getElementById("como-funciona");
      if (flowSection) {
        if (reduced || !("IntersectionObserver" in window)) {
          flowSection.classList.add("is-ready", "is-inview");
        } else {
          flowSection.classList.add("is-ready");
          const flowReveal = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              flowSection.classList.add("is-inview");
              observer.unobserve(entry.target);
            });
          }, { rootMargin: "0px 0px -28% 0px", threshold: 0.16 });
          flowReveal.observe(flowSection);
        }
      }

      /* 2.6 · Modo 3 AM scrollytelling · una pantalla, tres estados.
         La sección da recorrido con .threeam-story-scroll y este handler
         sincroniza copy, stepper y mockup activo sin bloquear el scroll real. */
      function initThreeAmStory() {
        const root = document.getElementById("threeam");
        if (!root) return;
        const scrollArea = root.querySelector(".threeam-story-scroll");
        const device = root.querySelector(".threeam-device");
        const panels = Array.from(root.querySelectorAll("[data-threeam-panel]"));
        const copies = Array.from(root.querySelectorAll("[data-threeam-copy]"));
        const dots = Array.from(root.querySelectorAll("[data-threeam-dot]"));
        const chips = Array.from(root.querySelectorAll("[data-threeam-chip]"));
        const cursor = document.getElementById("threeam-cursor");
        if (!scrollArea || panels.length === 0) return;

        const lowHeightQuery = window.matchMedia("(max-height: 700px)");
        let activeStep = -1;
        let ticking = false;
        const clamp = (value) => Math.max(0, Math.min(1, value));
        const stepFromProgress = (progress) => {
          if (progress >= 0.67) return 2;
          if (progress >= 0.34) return 1;
          return 0;
        };

        const placeCursorAtStep = (step) => {
          if (!cursor || !device || dots.length === 0) return;
          const target = dots[Math.max(0, Math.min(dots.length - 1, step))];
          if (!target) return;
          const deviceRect = device.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const x = targetRect.left + targetRect.width / 2 - deviceRect.left;
          const y = targetRect.top + targetRect.height / 2 - deviceRect.top;
          cursor.style.setProperty("--cursor-x", `${x}px`);
          cursor.style.setProperty("--cursor-y", `${y}px`);
        };

        const pulseCursorClick = () => {
          if (!cursor || reduced) return;
          cursor.classList.remove("is-clicking");
          void cursor.offsetWidth;
          cursor.classList.add("is-clicking");
        };

        const setStep = (step) => {
          const isLowHeightFallback = lowHeightQuery.matches;
          const previousStep = activeStep;
          if (step === activeStep && !isLowHeightFallback) return;
          activeStep = step;
          root.dataset.threeamStep = String(step);

          panels.forEach((panel, index) => {
            const isActive = index === step;
            panel.classList.toggle("is-active", isActive);
            panel.setAttribute("aria-hidden", isLowHeightFallback || isActive ? "false" : "true");
            panel.tabIndex = isLowHeightFallback || isActive ? 0 : -1;
          });
          copies.forEach((copy, index) => {
            copy.classList.toggle("is-active", index === step);
          });
          dots.forEach((dot, index) => {
            dot.classList.toggle("is-active", index === step);
            dot.setAttribute("aria-pressed", index === step ? "true" : "false");
          });
          placeCursorAtStep(step);
          if (previousStep !== step) pulseCursorClick();
        };

        const veil = document.querySelector(".threeam-veil");
        let veilPlayed = false;

        const update = () => {
          ticking = false;
          const rect = scrollArea.getBoundingClientRect();
          const scrollable = Math.max(1, scrollArea.offsetHeight - window.innerHeight);
          const progress = clamp(-rect.top / scrollable);
          setStep(stepFromProgress(progress));
          /* Gota de aceite one-shot · al quedar la sección fija a pantalla
             completa (progress >= 0.03) se dispara una vez: header a night +
             veil radial que crece y asienta en dark. Al salir (<= 0.005) se
             resetea para poder re-dispararse al volver. */
          if (progress >= 0.03 && !veilPlayed) {
            veilPlayed = true;
            if (topbar) topbar.classList.add("is-night");
            if (veil && !reduced) {
              veil.classList.remove("is-playing");
              void veil.offsetWidth;
              veil.classList.add("is-playing");
            }
          } else if (progress <= 0.005 && veilPlayed) {
            veilPlayed = false;
            if (topbar) topbar.classList.remove("is-night");
            if (veil) veil.classList.remove("is-playing");
          }
        };

        const requestUpdate = () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(update);
        };

        const stepAnchors = [0.02, 0.5, 0.84];
        const jumpToStep = (step) => {
          const clampedStep = Math.max(0, Math.min(2, step));
          const scrollable = Math.max(1, scrollArea.offsetHeight - window.innerHeight);
          const scrollRect = scrollArea.getBoundingClientRect();
          const scrollTopDoc = window.scrollY + scrollRect.top;
          const targetY = scrollTopDoc + scrollable * stepAnchors[clampedStep];
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: reduced ? "auto" : "smooth",
          });
          setStep(clampedStep);
        };

        dots.forEach((dot, index) => {
          dot.addEventListener("click", () => jumpToStep(index));
        });

        setStep(0);
        update();
        placeCursorAtStep(0);
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
      }
      initThreeAmStory();

      /* 3 · Parallax avatar · canvas chroma key + frame cache.
         Estrategia · decodear los 2 MP4 (preview-1 bolita→newborn, preview-2
         newborn→bebé) a un array de frames offscreen al cargar la página,
         aplicar chroma key per-pixel (negro → alpha 0 con soft edge ramp)
         y cachear cada frame como HTMLCanvasElement. En scroll, mapeamos
         progress 0..1 al frame index global y pintamos via drawImage. Esto
         resuelve los dos problemas del enfoque anterior:
         - Alpha real sin halo · no dependemos del SVG filter ni multiply.
         - Animación scroll-locked frame-exacta · sin GOP snapping de MP4. */
      const phaseText  = document.getElementById("phase-text");
      const phaseDot   = document.getElementById("phase-dot");
      const avatarFill = document.getElementById("avatar-fill");
      const avatarCanvas  = document.getElementById("avatar-canvas");
      const mAvatarCanvas = document.getElementById("m-avatar-canvas");
      const stops = {
        coral: document.getElementById("stop-coral"),
        blush: document.getElementById("stop-blush"),
        mint:  document.getElementById("stop-mint")
      };
      const phaseColors = {
        coral: "var(--coral-base)",
        blush: "var(--blush-base)",
        mint:  "var(--mint-base)"
      };
      const phaseLabels = {
        coral: "Embarazo",
        blush: "Recién nacido",
        mint:  "Bebé"
      };

      /* Iter 5 · LEAN approach · removed ALL per-pixel JS chroma processing
         (chromaKey + dilateAlpha + erodeEdge) que tardaba ~2s al cargar.
         Ahora extractFrames solo hace drawImage(vid) en cada frame · el
         background black se mantiene en el canvas. La eliminación del bg
         + matte closing (para preservar ojos) se delega al SVG filter
         #sec2-chroma aplicado via CSS al .avatar-stage canvas (definido
         en index.html · ver sprite). GPU accelerated · sin per-pixel JS. */

      /* Decodea N frames de un MP4 · scrub via currentTime + seeked event.
         Aplica chroma key + guarda cada frame como canvas. Promise resuelve
         con el array de canvases listos para drawImage. */
      function extractFrames(url, count) {
        return new Promise((resolve, reject) => {
          const vid = document.createElement("video");
          vid.src = url;
          vid.muted = true;
          vid.playsInline = true;
          vid.preload = "metadata";
          vid.crossOrigin = "anonymous";
          const onError = () => reject(new Error("video load failed: " + url));
          vid.addEventListener("error", onError, { once: true });
          vid.addEventListener("loadedmetadata", async () => {
            const w = vid.videoWidth || 320;
            const h = vid.videoHeight || 320;
            const frames = [];
            try {
              for (let i = 0; i < count; i++) {
                const t = (i / Math.max(1, count - 1)) * vid.duration;
                /* Race · seeked event vs 5s timeout per frame · si el browser no
                   responde reusamos el frame anterior (gracefully degrade). */
                const seeked = new Promise((r) => {
                  const done = () => { vid.removeEventListener("seeked", done); r(); };
                  vid.addEventListener("seeked", done, { once: true });
                });
                const timeout = new Promise((r) => setTimeout(r, 5000));
                vid.currentTime = t;
                await Promise.race([seeked, timeout]);
                const off = document.createElement("canvas");
                off.width = w;
                off.height = h;
                const ctx = off.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(vid, 0, 0);
                /* Lean · no per-pixel processing · frame se guarda con su
                   background black original · CSS filter url(#sec2-chroma)
                   se encarga de hacer chroma key + matte closing en GPU. */
                frames.push(off);
              }
              resolve(frames);
            } catch (e) {
              reject(e);
            }
          }, { once: true });
        });
      }

      let framesA = null;
      let framesB = null;
      let totalFrames = 0;
      let currentProgress = 0;
      let parallaxBootA = false;
      let parallaxBootB = false;
      let parallaxBLoading = false;

      function paintCanvas(canvas, frame) {
        if (!canvas || !frame) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
      }

      function renderFrameAt(progress) {
        if (!framesA || totalFrames === 0) return;
        const idx = Math.max(0, Math.min(totalFrames - 1, Math.round(progress * (totalFrames - 1))));
        const frame = idx < framesA.length
          ? framesA[idx]
          : framesB[idx - framesA.length];
        if (!frame) return;
        paintCanvas(avatarCanvas, frame);
        paintCanvas(mAvatarCanvas, frame);
      }

      function updateParallax() {
        const shell = document.querySelector(".narrative-shell");
        if (!shell) return;
        const rect = shell.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = Math.max(1, rect.height - vh);
        const progress = Math.max(0, Math.min(1, -rect.top / total));
        currentProgress = progress;

        /* Map progress 0-1 to phases · ver thresholds:
           0.00-0.40 · coral (embarazo)
           0.40-0.70 · blush (recién nacido)
           0.70-1.00 · mint  (bebé) */
        let phase = "coral";
        if (progress >= 0.70) phase = "mint";
        else if (progress >= 0.40) phase = "blush";

        renderFrameAt(progress);

        if (phaseText)  phaseText.textContent = phaseLabels[phase];
        if (phaseDot)   phaseDot.style.background = phaseColors[phase];
        if (avatarFill) avatarFill.style.width = (progress * 100).toFixed(1) + "%";

        Object.entries(stops).forEach(([key, el]) => {
          if (!el) return;
          el.classList.toggle("is-active", key === phase);
          const order = { coral: 0, blush: 1, mint: 2 };
          const currentIdx = order[phase];
          const elIdx = order[key];
          el.classList.toggle("is-passed", elIdx <= currentIdx);
        });
      }

      /* Boot async por fases:
         1) Cargamos solo preview 1 (bolita→newborn) cerca de viewport.
         2) Cargamos preview 2 (newborn→baby) únicamente cuando el closing
            entra en viewport. Esto reduce carga inicial en mobile.
         Nota: hero-avatar.mp4 está deprecado y no se usa en runtime. */
      const loadParallaxFramesA = async () => {
        if (parallaxBootA) return;
        parallaxBootA = true;
        const isMobile = window.matchMedia("(max-width: 960px)").matches;
        const FRAME_COUNT = reduced ? 2 : (isMobile ? 24 : 40);
        const URL_1 = "assets/parallax-1-bolita-to-newborn.mp4";
        try {
          const fa = await extractFrames(URL_1, FRAME_COUNT);
          framesA = fa;
          totalFrames = framesA.length + (framesB ? framesB.length : 0);
          /* Ajustar canvas size al nativo del primer frame · evita stretch borroso. */
          const refFrame = framesA[0];
          if (refFrame) {
            if (avatarCanvas) { avatarCanvas.width = refFrame.width; avatarCanvas.height = refFrame.height; }
            if (mAvatarCanvas) { mAvatarCanvas.width = refFrame.width; mAvatarCanvas.height = refFrame.height; }
          }
          renderFrameAt(currentProgress);
          avatarCanvas?.classList.add("is-ready");
          mAvatarCanvas?.classList.add("is-ready");
        } catch (e) {
          /* Decode failed · log + leave canvases hidden. */
          console.warn("[parallax] frame extraction failed", e);
        }
      };
      const loadParallaxFramesB = async () => {
        if (parallaxBootB || parallaxBLoading) return;
        if (!framesA || !framesA.length) return;
        parallaxBLoading = true;
        const isMobile = window.matchMedia("(max-width: 960px)").matches;
        const FRAME_COUNT = reduced ? 2 : (isMobile ? 24 : 40);
        const URL_2 = "assets/parallax-2-newborn-to-baby.mp4";
        try {
          const fb = await extractFrames(URL_2, FRAME_COUNT);
          framesB = fb;
          totalFrames = framesA.length + framesB.length;
          parallaxBootB = true;
          renderFrameAt(currentProgress);
        } catch (e) {
          console.warn("[parallax] frame extraction failed (part 2)", e);
        } finally {
          parallaxBLoading = false;
        }
      };

      const narrativeShell = document.querySelector(".narrative-shell");
      if (narrativeShell && "IntersectionObserver" in window) {
        const preloadObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            loadParallaxFramesA();
            observer.unobserve(entry.target);
          });
        }, { rootMargin: "280px 0px", threshold: 0.01 });
        preloadObserver.observe(narrativeShell);
      } else {
        loadParallaxFramesA();
      }
      const narrativeClosing = document.querySelector(".narrative-closing");
      if (narrativeClosing && "IntersectionObserver" in window) {
        const loadSecondObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            loadParallaxFramesB();
            observer.unobserve(entry.target);
          });
        }, { rootMargin: "200px 0px", threshold: 0.1 });
        loadSecondObserver.observe(narrativeClosing);
      } else {
        loadParallaxFramesB();
      }

      if (!reduced) {
        let ticking = false;
        window.addEventListener("scroll", () => {
          if (!ticking) {
            requestAnimationFrame(() => { updateParallax(); ticking = false; });
            ticking = true;
          }
        }, { passive: true });
        updateParallax();
      } else {
        /* Reduced motion · solo pintar estado inicial cuando los frames lleguen. */
        updateParallax();
      }

      /* 3.5 · Floating halo traveler · burbuja coral que vive en body
         (position: fixed) y viaja desde detrás del hero avatar hasta
         detrás del avatar parallax de sección 2 conforme el user hace
         scroll. Cuando ambos están off-screen (después de sec 2), el
         halo se queda en la última posición conocida.

         Estrategia · cada scroll frame:
           1. Medimos rect del hero avatar + frame del parallax
           2. Calculamos progress 0-1 en función de la sec2.top vs vh
              · sec2.top >= vh    → progress 0 (halo en hero)
              · sec2.top <= 0     → progress 1 (halo en sec2)
              · between           → interpolación lineal
           3. Interpolamos posición + scale + opacity entre los 2 endpoints
           4. Aplicamos transform translate(px,px) scale + opacity

         Notas:
           - Si sec2 frame no existe (mobile), halo solo sigue hero
           - Si user prefers-reduced-motion: el halo igual viaja (es scroll
             driven · no es animation independiente · no rompe accessibility)
           - rAF throttle para suavidad sin saturar scroll handler */
      (() => {
        const halo = document.getElementById("floating-halo");
        if (!halo) return;
        const heroAvatar = document.getElementById("hero-avatar");
        const sec2Stage  = document.querySelector(".avatar-stage");
        const sec2Frame  = document.querySelector(".avatar-stage .frame");
        const teamSection = document.getElementById("parenting-team");
        const trustSection = document.querySelector(".trust");
        if (!heroAvatar) return;

        const HALO_SIZE = 460; // matches CSS width/height
        const HALO_HALF = HALO_SIZE / 2;

        // Sticky offset del .avatar-stage en CSS (top: 96px). Cuando el
        // scrollY hace que stage_pageY - scrollY = 96, sticky activa.
        const SEC2_STICKY_TOP = 96;
        // Cuándo arranca la transición de halo · 5% del scroll del hero ·
        // ya no esperamos a 40% · user quiere que se mueva desde el primer
        // pixel de scroll para que el efecto sea más evidente.
        const HERO_KICKOFF_RATIO = 0.05;
        // Distancia de scroll en la que el halo viaja de hero hasta el centro
        // viewport · corto · feels responsive al scroll inicial.
        const KICKOFF_TRAVEL_PX = 220;
        // Nudge Y para alinear el centro del halo con el visible avatar
        // dentro del canvas (kling parallax mp4 no está exactamente al
        // centro geométrico del frame · este offset lo empuja hacia abajo).
        const SEC2_Y_NUDGE = 30;

        function rectInfo(el) {
          const r = el.getBoundingClientRect();
          return {
            cx: r.left + r.width / 2,
            cy: r.top + r.height / 2,
            top: r.top,
            w: r.width,
            h: r.height,
          };
        }

        function paintTeamHalo(x, y) {
          if (!teamSection) return;
          const r = teamSection.getBoundingClientRect();
          const visible = r.top < window.innerHeight && r.bottom > 0;
          if (!visible) {
            teamSection.style.setProperty("--team-halo-opacity", "0");
            return;
          }

          const localX = x - r.left;
          const localY = y - r.top;
          const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
          const bell = Math.sin(sectionProgress * Math.PI);
          const within = localY > -260 && localY < r.height + 260;
          const opacity = within ? Math.min(0.72, bell * 0.64) : Math.min(0.32, bell * 0.26);

          teamSection.style.setProperty("--team-halo-x", `${localX.toFixed(1)}px`);
          teamSection.style.setProperty("--team-halo-y", `${localY.toFixed(1)}px`);
          teamSection.style.setProperty("--team-halo-opacity", opacity.toFixed(3));
        }

        /* Mismo paint que parenting-team pero para el trust strip · 4 chips
           con clinical claims. El halo cruza por encima durante el scroll
           inicial y deja un wash coral/mint sobre los chips (mismo pattern
           radial + dotted texture, mismo blend multiply). */
        function paintTrustHalo(x, y) {
          if (!trustSection) return;
          const r = trustSection.getBoundingClientRect();
          const visible = r.top < window.innerHeight && r.bottom > 0;
          if (!visible) {
            trustSection.style.setProperty("--trust-halo-opacity", "0");
            return;
          }

          const localX = x - r.left;
          const localY = y - r.top;
          // Trust strip es delgado (1 row · ~80px) · expandimos la "ventana
          // útil" en Y a ±400px para que el wash sea visible mientras el
          // halo aún está bajando hacia la sección y mientras sube saliendo.
          const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
          const bell = Math.sin(sectionProgress * Math.PI);
          const within = localY > -400 && localY < r.height + 400;
          const opacity = within ? Math.min(0.78, bell * 0.70) : Math.min(0.32, bell * 0.26);

          trustSection.style.setProperty("--trust-halo-x", `${localX.toFixed(1)}px`);
          trustSection.style.setProperty("--trust-halo-y", `${localY.toFixed(1)}px`);
          trustSection.style.setProperty("--trust-halo-opacity", opacity.toFixed(3));
        }

        let ticking = false;
        function update() {
          ticking = false;
          /* Mobile bail · en viewport ≤960px ocultamos hero-avatar +
             avatar-stage + mobile-avatar (decisión UX · reducir peso visual
             en mobile y dejar el copy respirar). Sin esos targets el halo
             no tiene a quién seguir · clear pintures y return. */
          if (window.innerWidth <= 960) {
            halo.style.opacity = "0";
            if (teamSection) teamSection.style.setProperty("--team-halo-opacity", "0");
            if (trustSection) trustSection.style.setProperty("--trust-halo-opacity", "0");
            return;
          }
          halo.style.opacity = "";
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const vh = window.innerHeight;
          const hero = rectInfo(heroAvatar);

          if (!sec2Stage || !sec2Frame) {
            // No parallax · halo siempre en hero
            halo.style.transform =
              `translate(${(hero.cx - HALO_HALF).toFixed(1)}px, ${(hero.cy - HALO_HALF).toFixed(1)}px) scale(1)`;
            paintTeamHalo(hero.cx, hero.cy);
            paintTrustHalo(hero.cx, hero.cy);
            return;
          }

          const stage = rectInfo(sec2Stage);
          const sec2  = rectInfo(sec2Frame);
          const team  = teamSection ? rectInfo(teamSection) : null;

          // Trajectory revisitada · user pidió que el halo se mueva desde el
          // primer pixel de scroll y viva en el centro del viewport durante
          // el viaje (no anclado a avatares fuera de pantalla). Fases:
          //  · scroll < kickoff       → halo en hero avatar (estado inicial)
          //  · kickoff → kickoff+220  → hero → centro viewport (transición rápida)
          //  · centro hasta team-exit → halo en centro viewport (cruza trust + team)
          //  · team-exit → sec2-stick → centro → sec2 avatar (aterrizaje)
          //  · sec2-stick adelante    → halo en sec2 avatar
          const heroPageY = hero.top + scrollY;
          const stagePageY = stage.top + scrollY;
          const startScroll = heroPageY + hero.h * HERO_KICKOFF_RATIO;
          const endScroll = stagePageY - SEC2_STICKY_TOP;

          const targetSec2X = sec2.cx;
          const targetSec2Y = sec2.cy + SEC2_Y_NUDGE;
          const centerX = window.innerWidth * 0.5;
          const centerY = vh * 0.5;
          const scaleHero = 1.0;
          const scaleTeam = 1.18;   // más evidente al pasar por team/trust
          const scaleSec2 = 0.72;

          let x, y, scale;

          if (team) {
            const teamPageY = team.top + scrollY;
            // Waypoints · scroll positions donde la transición cambia de fase
            const wp1 = startScroll;                    // hero kickoff (ahora 5%)
            const wp2 = startScroll + KICKOFF_TRAVEL_PX; // arrive a centro rápido
            const wp3 = teamPageY + team.h - vh * 0.55; // team ~al borde superior viewport
            const wp4 = endScroll;                      // sec2 sticky

            if (scrollY < wp1) {
              x = hero.cx; y = hero.cy; scale = scaleHero;
            } else if (scrollY < wp2) {
              // hero → centro viewport · transición rápida para que el halo
              // se sienta moviéndose desde los primeros pixels de scroll
              const t = (scrollY - wp1) / Math.max(1, wp2 - wp1);
              x = hero.cx + (centerX - hero.cx) * t;
              y = hero.cy + (centerY - hero.cy) * t;
              scale = scaleHero + (scaleTeam - scaleHero) * t;
            } else if (scrollY < wp3) {
              // centro viewport durante todo el cruce trust + team · halo
              // queda "screen-centered" mientras pasa por encima de chips
              // de trust y luego de las cards del equipo · scale boost full.
              x = centerX;
              y = centerY;
              scale = scaleTeam;
            } else if (scrollY < wp4) {
              // centro → sec2 (aterrizaje en avatar parallax)
              const t = (scrollY - wp3) / Math.max(1, wp4 - wp3);
              x = centerX + (targetSec2X - centerX) * t;
              y = centerY + (targetSec2Y - centerY) * t;
              scale = scaleTeam + (scaleSec2 - scaleTeam) * t;
            } else {
              x = targetSec2X; y = targetSec2Y; scale = scaleSec2;
            }
          } else {
            // Fallback · sin team waypoint · interpolación lineal hero → sec2
            const span = Math.max(1, endScroll - startScroll);
            const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / span));
            x = hero.cx + (targetSec2X - hero.cx) * progress;
            y = hero.cy + (targetSec2Y - hero.cy) * progress;
            scale = scaleHero + (scaleSec2 - scaleHero) * progress;
          }

          halo.style.transform =
            `translate(${(x - HALO_HALF).toFixed(1)}px, ${(y - HALO_HALF).toFixed(1)}px) scale(${scale.toFixed(3)})`;

          // Sync color del halo con la fase del avatar parallax · coral
          // (embarazo · default) → blush (recién nacido) → mint (bebé) ·
          // mismos thresholds que updateParallax() (que vive en otro IIFE
          // scope · no podemos compartir variable currentProgress). Guard
          // evita mutación DOM redundante si la fase no cambia.
          const shell = document.querySelector(".narrative-shell");
          let phase = "coral";
          if (shell) {
            const sr = shell.getBoundingClientRect();
            const total = Math.max(1, sr.height - vh);
            const pProgress = Math.max(0, Math.min(1, -sr.top / total));
            if (pProgress >= 0.70)      phase = "mint";
            else if (pProgress >= 0.40) phase = "blush";
          }
          if (halo.dataset.phase !== phase) {
            halo.dataset.phase = phase;
          }

          paintTeamHalo(x, y);
          paintTrustHalo(x, y);
        }

        function onScroll() {
          if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
          }
        }

        update();
        // Reveal después del primer frame (evita flash inicial en posición default)
        requestAnimationFrame(() => halo.classList.add("is-ready"));

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
      })();

      /* 4 · sticky-cta visible cuando block2 entra en viewport */
      if (block2 && "IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) stickyCta.classList.add("armed");
          });
        }, { rootMargin: "0px 0px -40% 0px" });
        io.observe(block2);
      }

      /* 5 · Signup form · opens the progressive waitlist with email prefilled */
      const signupForm = document.getElementById("signup");
      if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const input = signupForm.querySelector('input[type="email"]');
          const email = (input?.value || "").trim();
          const target = email
            ? `waitlist.html?email=${encodeURIComponent(email)}`
            : "waitlist.html";
          window.location.href = target;
        });
      }

      /* 6 · Pricing billing toggle · mensual/anual */
      const billingToggle = document.querySelector("[data-billing-toggle]");
      const billingPlans = Array.from(document.querySelectorAll("[data-billing-plan]"));
      function setPricingBilling(isAnnual) {
        billingPlans.forEach((plan) => {
          const mode = isAnnual ? "annual" : "monthly";
          const amount = plan.dataset[`${mode}Amount`];
          const per = plan.dataset[`${mode}Per`];
          const foot = plan.dataset[`${mode}Foot`];
          const href = plan.dataset[`${mode}Href`];
          const amountNode = plan.querySelector("[data-billing-amount]");
          const perNode = plan.querySelector("[data-billing-per]");
          const footNode = plan.querySelector("[data-billing-foot]");
          const ctaNode = plan.querySelector("[data-billing-cta]");
          plan.classList.toggle("is-annual", isAnnual);
          if (amount && amountNode) amountNode.textContent = amount;
          if (per && perNode) perNode.textContent = per;
          if (foot && footNode) footNode.textContent = foot;
          if (href && ctaNode) ctaNode.setAttribute("href", href);
        });
      }
      if (billingToggle && billingPlans.length) {
        setPricingBilling(billingToggle.checked);
        billingToggle.addEventListener("change", () => {
          setPricingBilling(billingToggle.checked);
        });
      }

      /* 7 · Book sheet · shared-element transition libro embarazo → bottom sheet
         Timeline:
         · 0-150ms  · lift source card + start backdrop dim
         · 100-450ms · sheet rises (CSS transition con delay 100) ·
                       cover-frame FLIP del source rect al header slot ·
                       ambas anims usan misma easing+duration para que
                       el book's visual position interpole linealmente
                       entre src y target a pesar de que el sheet también
                       está animándose.
         · 250-700ms · spine rotate · rotateY(0) → rotateY(-180) con
                       transform-origin 0% 50% (spine izquierdo).
         · 500-800ms · invisible content swap automático via backface-visibility.
         · 700-1000ms · body content fades + slides in (CSS delay 600ms). */
      const bsOverlay = document.getElementById("bs-overlay");
      const bsSheet   = document.getElementById("bs-sheet");
      const bsBook    = document.getElementById("bs-book");
      const bsFrame   = document.getElementById("bs-cover-frame");
      const bsSpinner = document.getElementById("bs-cover-spinner");
      const bsClose   = document.getElementById("bs-close");
      const bsHeader  = bsSheet ? bsSheet.querySelector(".bs-header") : null;
      const bsBody    = document.getElementById("bs-body");
      const pageSiblings = bsOverlay
        ? Array.from(document.body.children).filter((el) => el !== bsOverlay)
        : [];
      const previousAriaHidden = new WeakMap();

      function getOverlayFocusable() {
        if (!bsOverlay) return [];
        return Array.from(
          bsOverlay.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => {
          if (el.getAttribute("aria-hidden") === "true") return false;
          return el.offsetParent !== null;
        });
      }

      function focusOverlayFirst() {
        const focusables = getOverlayFocusable();
        const target = focusables[0] || bsClose || bsOverlay;
        target?.focus?.();
      }

      function setBackgroundInert(isInert) {
        pageSiblings.forEach((el) => {
          if (isInert) {
            if (!previousAriaHidden.has(el)) {
              previousAriaHidden.set(el, el.getAttribute("aria-hidden"));
            }
            el.setAttribute("aria-hidden", "true");
            el.inert = true;
          } else {
            const prevAriaHidden = previousAriaHidden.get(el);
            if (prevAriaHidden === null) {
              el.removeAttribute("aria-hidden");
            } else if (typeof prevAriaHidden === "string") {
              el.setAttribute("aria-hidden", prevAriaHidden);
            }
            previousAriaHidden.delete(el);
            el.inert = false;
          }
        });
      }

      /* Scroll forwarding · cuando el usuario hace wheel/scroll DENTRO del
         .bs-header (cover del libro · NO scrollable nativo) reenviamos el
         delta a .bs-body.scrollTop para que el contenido del libro avance
         como si fuera un solo flujo continuo. Sin esto, el header capturaba
         el wheel sin hacer nada (UX confuso · user reporta "no scrollea"). */
      if (bsHeader && bsBody) {
        bsHeader.addEventListener("wheel", (e) => {
          // Solo cuando el overlay está abierto
          if (!bsOverlay.classList.contains("is-active")) return;
          e.preventDefault();
          bsBody.scrollTop += e.deltaY;
        }, { passive: false });
      }

      const EASE_OUT   = "cubic-bezier(0.22, 0.61, 0.36, 1)"; /* mirror de var(--ease-sheet) · WAAPI no resuelve var() */
      const EASE_LIFT  = "cubic-bezier(0.34, 1.20, 0.64, 1)";
      const EASE_HINGE = "cubic-bezier(0.32, 0.04, 0.24, 0.99)";

      /* ────────────────────────────────────────────────────────────────
         Book config · data-driven modal · single overlay HTML, contenido
         se populates desde aquí según la card clicada (.r-book[data-book]).
         Para añadir un libro nuevo · entrada en BOOK_DATA + data-book en
         la card. Cero cambios HTML adicionales. */
      const BOOK_AVATARS = {
        coral: "assets/avatar-coral.png",
        blush: "assets/avatar-blush.png",
        mint: "assets/avatar-mint.png",
        gold: "assets/avatar-coral.png",
        violet: "assets/avatar-mint.png",
        paper: "assets/avatar-blush.png",
        default: "assets/embarazo-hero.png"
      };

      const BOOK_DATA = {
        embarazo: {
          tone: "coral",
          coverIcon: "#b-belly",
          coverTitle: 'Libro de<br><em>embarazo</em>',
          coverFootCount: "Sem 4-40",
          coverFootMethod: "SEGO",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Acompañamiento clínico <em>semana a semana</em> sin comparativas ni alarmismo.',
          pageImg: "assets/embarazo-hero.png",
          pageImgAlt: "Libro de embarazo",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Semana a semana", copy: "FPP, días restantes, cambios maternos y fetales, y qué toca preparar ahora." },
            { title: "Citas y pruebas", copy: "Cribado T1, morfológica, glucosa, Tdpa, eco 3T y EGB ordenados por semana." },
            { title: "Patadas", copy: "Count the Kicks · 10 movimientos en 2 horas desde la semana 28, con ruta clara si no llegas." },
            { title: "Tensión", copy: "Lectura PPG orientativa, histórico y señales para hablar con obstetra si sube." },
            { title: "Parto", copy: "Plan editable, checklist hospital y contactos importantes listos para compartir." },
            { title: "Modo arcoíris", copy: "Si vienes de una pérdida, el tono cambia: factual, sin confetti y con más cuidado." }
          ],
          avalChips: [
            { tone: "coral", text: "SEGO" },
            { tone: "mint", text: "NICE NG201" },
            { tone: "gold", text: "ACOG" },
            { tone: "blush", text: "EPDS" }
          ],
          researchOnly: {
            competitors: ["Pregnancy+", "Ovia Pregnancy", "What to Expect"]
          }
        },
        alimentacion: {
          tone: "coral",
          coverIcon: "#b-bottle",
          coverTitle: 'Libro de<br><em>alimentación</em>',
          coverFootCount: "0-3 años",
          coverFootMethod: "EU14",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Sólidos, BLW, purés y alérgenos <em>sin presión</em>, con señales claras cuando toca consultar.',
          pageImg: BOOK_AVATARS.coral,
          pageImgAlt: "Libro de alimentación",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Alimentos por edad", copy: "Cortes e ideas para 6-8m, 9-12m y 12m+, sin convertir BLW en obligación." },
            { title: "Mapa de alérgenos", copy: "14 alérgenos EU con estado, ingestas y recordatorio de exposición regular." },
            { title: "Recetas simples", copy: "Ideas por edad y textura para resolver una comida sin abrir diez búsquedas." },
            { title: "Probado en diario", copy: "Marca un alimento como probado y queda guardado para toda la familia." },
            { title: "Señales de cuidado", copy: "Atragantamiento, alergia y cuándo pedir ayuda, explicado sin dramatizar." },
            { title: "Plan IA", copy: "Compara tu contexto con guías públicas y te muestra opciones para el siguiente alimento." }
          ],
          avalChips: [
            { tone: "coral", text: "AEPED" },
            { tone: "gold", text: "AAP Big 9" },
            { tone: "mint", text: "OMS" },
            { tone: "blush", text: "UE 1169/2011" }
          ],
          researchOnly: {
            competitors: ["Solid Starts", "Yuka", "NHS Start4Life"],
            gap: "Caca tracker AI BITSS queda fuera del claim público hasta estar implementado."
          }
        },
        lactancia: {
          tone: "blush",
          coverIcon: "#b-breast",
          coverTitle: 'Libro de<br><em>lactancia</em>',
          coverFootCount: "0-18 meses",
          coverFootMethod: "LATCH",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Dolor, agarre, extracción y medicación <em>sin lactivismo</em> ni culpa por el biberón.',
          pageImg: BOOK_AVATARS.blush,
          pageImgAlt: "Libro de lactancia",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Tomas y ritmo", copy: "Pecho izquierdo, derecho, duración, intervalos y últimas 24h en una vista." },
            { title: "LATCH", copy: "Cinco preguntas, score 0-10 y recomendación de IBCLC externa si se repite bajo." },
            { title: "Dolor y mastitis", copy: "Preguntas guiadas para grietas, conducto bloqueado, fiebre o zona roja." },
            { title: "Medicamentos", copy: "Buscador APILAM/e-lactancia mock con riesgo 0-3 y copy claro." },
            { title: "Banco de leche", copy: "Batches FIFO, nevera, congelador y vencimientos según conservación canon." },
            { title: "Modos sensibles", copy: "Extracción exclusiva, adopción, IGT, tándem o experiencia previa difícil." }
          ],
          avalChips: [
            { tone: "blush", text: "LATCH" },
            { tone: "mint", text: "OMS" },
            { tone: "coral", text: "APILAM" },
            { tone: "gold", text: "ABM" }
          ],
          researchOnly: {
            competitors: ["LactApp", "Medela Family", "Baby Tracker"]
          }
        },
        vacunas: {
          tone: "gold",
          coverIcon: "#b-syringe",
          coverTitle: 'Libro de<br><em>vacunas</em>',
          coverFootCount: "0-3 años",
          coverFootMethod: "AEPED",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Calendario vivo, fiebre 72h y carnet digital <em>sin militancia</em>, con datos para decidir con pediatría.',
          pageImg: BOOK_AVATARS.coral,
          pageImgAlt: "Libro de vacunas",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Calendario AEPED 2026", copy: "Hexavalente, MenB, neumococo, rotavirus, triple vírica, varicela y HepA." },
            { title: "Switcher", copy: "AEP y AAP 2026 para familias internacionales, viajes o cambios de país." },
            { title: "Fiebre 72h", copy: "Curva real frente a banda esperada para bajar ansiedad sin minimizar." },
            { title: "Antitérmico", copy: "Dosis por peso y guardrails: NO alternar y NO profiláctico pre-vacuna." },
            { title: "Carnet digital", copy: "Lote, centro, profesional y export PDF para colegio, viajes o cambio de pediatra." },
            { title: "Qué esperar", copy: "Efectos esperables y señales para llamar, con lenguaje claro." }
          ],
          avalChips: [
            { tone: "gold", text: "CAV-AEP" },
            { tone: "mint", text: "AAP" },
            { tone: "coral", text: "NICE NG143" },
            { tone: "blush", text: "JMIR Fever Coach" }
          ],
          researchOnly: {
            competitors: ["Mi Vacuna", "CDC Vaccine Schedule", "NHS Red Book"]
          }
        },
        sueno: {
          tone: "mint",
          coverIcon: "#b-moon",
          coverTitle: 'Libro del<br><em>sueño</em>',
          coverFootCount: "0-3 años",
          coverFootMethod: "ventanas",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Ventanas, rutinas y noches difíciles <em>sin juicio</em> y sin extinción del llanto por defecto.',
          pageImg: BOOK_AVATARS.mint,
          pageImgAlt: "Libro del sueño",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Ventana óptima", copy: "Aún pronto, óptima o cansancio acumulado según edad y últimas siestas." },
            { title: "Tracker sueño", copy: "Siestas, noche y despertares para entender el patrón sin obsesionarse." },
            { title: "Esquema por edad", copy: "Ocho rangos de 0-2m a 2,5-3a con siestas, rutina y total esperado." },
            { title: "Vista semana", copy: "Barras día a día para ver si una noche difícil encaja en un patrón." },
            { title: "Regresiones", copy: "4m, 8-10m, 12m, 18m y 2a explicadas sin convertirlas en amenaza." },
            { title: "Modo madrugada", copy: "Texto grande, fondo oscuro y una pregunta cada vez cuando estás al límite." }
          ],
          avalChips: [
            { tone: "mint", text: "AAP Safe Sleep" },
            { tone: "gold", text: "NHS" },
            { tone: "blush", text: "Lullaby Trust" },
            { tone: "coral", text: "Sleep Foundation" }
          ],
          researchOnly: {
            competitors: ["Huckleberry", "Smart Sleep Coach", "Hatch Rest+"]
          }
        },
        salud: {
          tone: "paper",
          coverIcon: "#b-thermo",
          coverTitle: 'Libro de<br><em>salud</em>',
          coverFootCount: "0-3 años",
          coverFootMethod: "AEPap",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Fiebre, episodios y señales para consultar <em>con criterio</em>, sin convertir cada síntoma en alarma.',
          pageImg: BOOK_AVATARS.paper,
          pageImgAlt: "Libro de salud",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Preguntas guiadas por síntoma", copy: "Fiebre, respiración, vómitos, diarrea, golpe, rash, convulsión y llanto." },
            { title: "Tres niveles", copy: "Urgencias, mismo día o casa, con explicación para hablar con pediatría." },
            { title: "Paracetamol", copy: "Calculadora por peso según AEPED y guardrails para evitar errores comunes." },
            { title: "Modo emergencia", copy: "Alergias críticas, 112, pediatra y hospital de referencia a mano." },
            { title: "Historial", copy: "Episodios, visitas, medicación y pruebas con búsqueda y filtros." },
            { title: "Patrones", copy: "Si algo se repite, Mimo lo ordena para preparar la consulta." }
          ],
          avalChips: [
            { tone: "mint", text: "AEPED" },
            { tone: "coral", text: "NICE" },
            { tone: "gold", text: "AAP" },
            { tone: "blush", text: "DSI AEPap" }
          ],
          researchOnly: {
            competitors: ["NHS 111", "Kinsa", "WebMD Baby"]
          }
        },
        colicos: {
          tone: "coral",
          coverIcon: "#b-tear",
          coverTitle: 'Libro de<br><em>cólicos</em>',
          coverFootCount: "0-6 meses",
          coverFootMethod: "PURPLE",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Llanto inconsolable con descarte, regulación y relevo <em>sin culparte</em> por no poder más.',
          pageImg: BOOK_AVATARS.coral,
          pageImgAlt: "Libro de cólicos",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Episodio en curso", copy: "Timer, intensidad y qué intervención estás probando ahora." },
            { title: "Wessel", copy: "Regla 3-3-3 monitorizada sin convertir cada tarde difícil en diagnóstico." },
            { title: "5 S's", copy: "Swaddle, side, shush, swing y suck con seguridad y límites claros." },
            { title: "Relevo", copy: "Avisar al co-cuidador cuando necesitas cambiar de manos." },
            { title: "Si no puedes más", copy: "Cuatro pasos concretos para bajar riesgo y pedir ayuda." },
            { title: "Cruces útiles", copy: "Sueño, lactancia, frenillo, APLV o sobrecansancio conectados cuando encaja." }
          ],
          avalChips: [
            { tone: "coral", text: "Wessel" },
            { tone: "blush", text: "PURPLE Crying" },
            { tone: "mint", text: "AAP" },
            { tone: "gold", text: "Roma IV" }
          ],
          researchOnly: {
            competitors: ["ChatterBaby", "Happiest Baby", "Zoundream"]
          }
        },
        hitos: {
          tone: "mint",
          coverIcon: "#b-sprout",
          coverTitle: 'Libro de<br><em>hitos</em>',
          coverFootCount: "0-3 años",
          coverFootMethod: "Haizea",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Hitos 0-3 años con Haizea-Llevant, edad corregida y <em>sin comparativas tóxicas</em>.',
          pageImg: BOOK_AVATARS.mint,
          pageImgAlt: "Libro de hitos",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "97 hitos", copy: "Organizados por etapa y por área: socialización, lenguaje, manipulación y postural." },
            { title: "Rangos P50/P75/P95", copy: "Mini-chart por hito para ver dónde está Lola sin ranking." },
            { title: "Edad corregida", copy: "Modo preemie automático cuando la cronología no cuenta toda la historia." },
            { title: "Marcar logrado", copy: "Fecha, foto y nota privada, sin confetti ni presión." },
            { title: "Hito custom", copy: "Añade un logro familiar y guárdalo con área editable." },
            { title: "Señales de consulta", copy: "Regresión, asimetría o retrasos concretos explicados para hablar con pediatría." }
          ],
          avalChips: [
            { tone: "mint", text: "Haizea-Llevant" },
            { tone: "gold", text: "AAP Bright Futures" },
            { tone: "blush", text: "ASQ-3" },
            { tone: "coral", text: "AEPap" }
          ],
          researchOnly: {
            competitors: ["Kinedu", "CDC Milestone Tracker", "BabyCenter"]
          }
        },
        desarrollo: {
          tone: "violet",
          coverIcon: "#b-heart",
          coverTitle: 'Libro de<br><em>desarrollo</em>',
          coverFootCount: "0-3 años",
          coverFootMethod: "ASQ-3",
          backEyebrow: "Lo que resuelve",
          backPhraseHTML: 'Cribados, curvas y observaciones para conversar con pediatría <em>sin diagnosticar desde una app</em>.',
          pageImg: BOOK_AVATARS.violet,
          pageImgAlt: "Libro de desarrollo",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "M-CHAT-R", copy: "Cribado 16-30m para ordenar observaciones, no para cerrar diagnósticos." },
            { title: "ASQ-3", copy: "Selector de escala y preguntas estructuradas para preparar la consulta." },
            { title: "Multi-escala", copy: "Haizea-Llevant, Denver II, Van Wiechen y Bayley-III como mapa comparativo." },
            { title: "Curvas OMS", copy: "Peso, talla y perímetro craneal con histórico y edad corregida." },
            { title: "EPDS", copy: "Chequeo rápido de salud mental perinatal con ruta directa si algo pesa demasiado." },
            { title: "Export pediatra", copy: "Resumen PDF para CDIAT, neuropediatría o revisión ordinaria." }
          ],
          avalChips: [
            { tone: "violet", text: "M-CHAT-R/F" },
            { tone: "mint", text: "ASQ-3" },
            { tone: "gold", text: "OMS" },
            { tone: "blush", text: "EPDS" }
          ],
          researchOnly: {
            competitors: ["Cognoa", "Pathways.org", "Kinedu"]
          }
        },
        recuerdos: {
          tone: "paper",
          coverIcon: "#b-bookmark",
          coverTitle: 'Libro de<br><em>recuerdos</em>',
          coverFootCount: "diario",
          coverFootMethod: "privado",
          backEyebrow: "Lo que guarda",
          backPhraseHTML: 'Lo que ya está pasando, ordenado para ti, para mañana y para compartir <em>solo si quieres</em>.',
          pageImg: BOOK_AVATARS.paper,
          pageImgAlt: "Libro de recuerdos",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Diario familiar", copy: "Tomas, sueño, hitos, vacunas y notas quedan en una línea de tiempo privada." },
            { title: "Fotos y notas", copy: "Guarda contexto sin convertirlo en red social ni en álbum público." },
            { title: "Compartir con cuidado", copy: "Exporta o comparte solo lo que quieras con familia, pediatra o cuidadores." },
            { title: "Recuerdos útiles", copy: "No solo memorias: también datos que ayudan a explicar qué pasó." }
          ],
          avalChips: [
            { tone: "mint", text: "Privacidad" },
            { tone: "gold", text: "Diario" },
            { tone: "blush", text: "Familia" },
            { tone: "coral", text: "Sin ads" }
          ]
        },
        parto: {
          tone: "blush",
          coverIcon: "#b-pulse",
          coverTitle: 'Preparación<br><em>al parto</em>',
          coverFootCount: "Sem 36+",
          coverFootMethod: "plan",
          backEyebrow: "Para llegar lista",
          backPhraseHTML: 'Plan, checklist y primeras horas para que el equipo sepa <em>qué necesitas</em> cuando llegues.',
          pageImg: "assets/parto-hero.png",
          pageImgAlt: "Libro de preparación al parto",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { title: "Signos de parto", copy: "Contracciones, rotura de aguas y cuándo ir al hospital." },
            { title: "Fases", copy: "Dilatación, transición, expulsivo y alumbramiento explicados sin tecnicismos." },
            { title: "Preferencias", copy: "Epidural, música, piel con piel, pinzamiento y acompañante." },
            { title: "Cesárea", copy: "Si pasa algo, el plan también contempla alternativas." },
            { title: "Checklist hospital", copy: "18 ítems editables y exportables para llevar en papel." },
            { title: "Primeras horas", copy: "Piel con piel, primera toma y recuperación inmediata." }
          ],
          avalChips: [
            { tone: "blush", text: "SEGO" },
            { tone: "mint", text: "NICE" },
            { tone: "gold", text: "OMS" },
            { tone: "coral", text: "APILAM" }
          ]
        }
      };

      /* Card actualmente activa · se setea en el click handler antes de openBook */
      let sourceCard = null;
      let activeBookKey = null;

      function populateModal(bookKey) {
        const data = BOOK_DATA[bookKey];
        if (!data) return false;
        bsSheet.dataset.tone = data.tone || "coral";
        /* Cover front */
        bsOverlay.querySelector(".bs-cover-front .bs-icon svg use").setAttribute("href", data.coverIcon);
        bsOverlay.querySelector(".bs-cover-front .bs-ttl").innerHTML = data.coverTitle;
        const foot = bsOverlay.querySelectorAll(".bs-cover-front .bs-foot span");
        if (foot[0]) foot[0].textContent = data.coverFootCount;
        if (foot[1]) foot[1].textContent = data.coverFootMethod;
        /* Cover back · eyebrow + headline. `.bs-back-sub` removida del HTML
           (user request · no más línea mono "Sem 4 → primeras horas · SEGO
           · NICE · AEPED"). Si vuelve, restablecer el setter aquí. */
        bsOverlay.querySelector(".bs-back-eyebrow").textContent = data.backEyebrow;
        const backH = bsOverlay.querySelector(".bs-back-h");
        if (data.backPhraseHTML) {
          backH.innerHTML = data.backPhraseHTML;
        } else if (data.backPhrase) {
          backH.textContent = data.backPhrase;
        }
        /* Page right · img */
        const pageImg = bsOverlay.querySelector(".bs-page-img");
        pageImg.src = data.pageImg || BOOK_AVATARS[data.tone] || BOOK_AVATARS.default;
        pageImg.alt = data.pageImgAlt;
        /* Body · features dinámicas · checklist DS canon reutilizable. */
        bsOverlay.querySelector(".bs-features-section .bs-eyebrow").textContent = data.featuresLabel;
        const featuresList = bsOverlay.querySelector(".bs-features");
        featuresList.replaceChildren(...data.features.map((f, i) => {
          const item = document.createElement("li");
          item.className = "bs-feature";
          item.style.setProperty("--feature-delay", `${560 + (i * 60)}ms`);

          const marker = document.createElement("span");
          marker.className = "bs-check";
          marker.setAttribute("aria-hidden", "true");
          marker.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 13 9 17 19 7"/></svg>';

          const text = document.createElement("div");
          text.className = "bs-feature-text";
          const title = document.createElement("h5");
          title.textContent = f.title;
          const copy = document.createElement("p");
          copy.textContent = f.copy;
          text.append(title, copy);
          item.append(marker, text);
          return item;
        }));
        const aval = bsOverlay.querySelector(".bs-aval");
        aval.replaceChildren(...(data.avalChips || []).map((chip, i) => {
          const el = document.createElement("span");
          el.className = `bs-aval-chip t-${chip.tone || data.tone || "mint"}`;
          el.style.setProperty("--chip-lean", `${[-3, 2, -2, 3, -1, 2][i % 6]}deg`);
          el.textContent = chip.text;
          return el;
        }));
        /* ARIA label del overlay para SR */
        bsOverlay.setAttribute("aria-label", data.pageImgAlt);
        return true;
      }

      let bsOpen = false;
      let bsBusy = false;
      let lastFocused = null;
      /* Pending intent · si el user toca/escapa mientras una animación está
         en curso, encolamos su intención y la procesamos al terminar.
         Evita "clicks perdidos" y permite Esc durante el opening. */
      let bsPending = null;
      function bsProcessPending() {
        const next = bsPending;
        bsPending = null;
        if (next === "open" && !bsOpen) openBook();
        else if (next === "close" && bsOpen) closeBook();
      }

      function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

      /* Mide el rect natural del cover-frame asumiendo sheet en posición FINAL
         (translate(-50%, 0)) sin disparar transitions. Necesario porque el
         frame está dentro del sheet que arranca en translate(-50%, 100%). */
      function measureTargetRect() {
        const prevTransition = bsSheet.style.transition;
        const prevTransform  = bsSheet.style.transform;
        const prevVisibility = bsSheet.style.visibility;
        bsSheet.style.transition = "none";
        bsSheet.style.transform  = "translate(-50%, 0)";
        bsSheet.style.visibility = "hidden";
        /* Force reflow */
        void bsSheet.offsetWidth;
        const r = bsFrame.getBoundingClientRect();
        bsSheet.style.transition = prevTransition;
        bsSheet.style.transform  = prevTransform;
        bsSheet.style.visibility = prevVisibility;
        void bsSheet.offsetWidth;
        return r;
      }

      async function openBook() {
        if (!sourceCard || !bsOverlay) return;
        if (bsBusy) { bsPending = "open"; return; }
        if (bsOpen) return;
        bsBusy = true;
        lastFocused = document.activeElement;
        bsOverlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("bs-locked");
        setBackgroundInert(true);

        if (reduced) {
          /* Reduced motion · skip animations · sheet aparece sin transition */
          bsOverlay.classList.add("is-active");
          bsSpinner.style.transform = "rotateY(-180deg)";
          bsFrame.style.transform = "none";
          bsFrame.style.opacity = "1";
          bsClose.classList.add("is-ready");
          bsOpen = true;
          bsBusy = false;
          focusOverlayFirst();
          bsProcessPending();
          return;
        }

        /* Reset estados por si vienen de un close incompleto */
        bsSpinner.style.transition = "none";
        bsSpinner.style.transform = "rotateY(0deg)";
        void bsSpinner.offsetWidth;
        bsFrame.style.opacity = "0";

        /* === Phase 1 · 0-150ms · lift source card + backdrop start dim ====== */
        sourceCard.classList.add("is-lifting");
        sourceCard.animate(
          [
            { transform: "rotate(var(--lean, -3.2deg)) translateY(var(--lift, -2px)) scale(1)" },
            { transform: "rotate(0deg) translateY(-8px) scale(1.04)" }
          ],
          { duration: 150, easing: EASE_LIFT, fill: "forwards" }
        );

        /* === Phase 2 · 100-450ms · sheet rises + book moves to header ======= */
        /* Esperar hasta T=100ms para alinear con el delay de la sheet CSS transition */
        await wait(100);

        /* Medir el rect del cover-frame en su posición FINAL (sheet at translateY 0) */
        const tgtRect = measureTargetRect();
        const srcRect = sourceCard.getBoundingClientRect();
        const dx = (srcRect.left + srcRect.width / 2) - (tgtRect.left + tgtRect.width / 2);
        const dy = (srcRect.top  + srcRect.height / 2) - (tgtRect.top  + tgtRect.height / 2);
        const sx = srcRect.width  / tgtRect.width;
        const sy = srcRect.height / tgtRect.height;
        const scale = Math.max(sx, sy);

        /* Activar overlay · dispara backdrop fade + sheet rise (CSS transition 350ms con delay 0 ya consumido) */
        bsOverlay.classList.add("is-active");
        bsFrame.style.opacity = "1";

        /* FLIP del cover-frame · misma duración (350ms) y easing que la sheet
           para que el book quede sincronizado con el header rising. */
        const moveAnim = bsFrame.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, offset: 0 },
            { transform: "translate(0, 0) scale(1)", offset: 1 }
          ],
          { duration: 350, easing: EASE_OUT, fill: "forwards" }
        );

        /* Source card desaparece */
        sourceCard.style.transition = "opacity 140ms ease";
        sourceCard.style.opacity = "0";

        /* === Phase 3 · 250-700ms · spine rotation =========================== */
        /* Arrancar el rotate a los 150ms de phase 2 (T=250ms total) · solapa con el move */
        await wait(150);
        const spinAnim = bsSpinner.animate(
          [
            { transform: "rotateY(0deg)" },
            { transform: "rotateY(-90deg)", offset: 0.5 },
            { transform: "rotateY(-180deg)" }
          ],
          { duration: 450, easing: EASE_HINGE, fill: "forwards" }
        );

        /* === Phase 4 · 500-800ms · invisible swap automático via backface ==== */

        /* === Phase 5 · 700-1000ms · body content fade in (CSS delay 600ms) === */
        /* Body slides+fades automaticamente por CSS .bs-overlay.is-active .bs-body */

        await Promise.all([moveAnim.finished, spinAnim.finished]);
        bsClose.classList.add("is-ready");
        bsOpen = true;
        bsBusy = false;
        focusOverlayFirst();
        bsProcessPending();
      }

      async function closeBook() {
        if (!sourceCard) return;
        if (bsBusy) { bsPending = "close"; return; }
        if (!bsOpen) return;
        bsBusy = true;
        bsClose.classList.remove("is-ready");

        if (reduced) {
          bsOverlay.classList.remove("is-active");
          bsOverlay.setAttribute("aria-hidden", "true");
          document.body.classList.remove("bs-locked");
          setBackgroundInert(false);
          sourceCard.style.opacity = "";
          sourceCard.classList.remove("is-lifting");
          bsOpen = false;
          bsBusy = false;
          lastFocused?.focus?.();
          bsProcessPending();
          return;
        }

        /* Close simultáneo · TODAS las animaciones disparan en T=0 ·
           cero pausa muerta como antes (rotateSpin awaited 280ms con todo
           lo demás quieto). Trace en DevTools Performance · close en ~300ms.
           · is-closing aplicado primero · dispara CSS transitions del sheet,
             body, backdrop, page-right, features (todo en paralelo).
           · closeMove WAAPI para el cover-frame (shrink + fade al source rect).
           · NO hay closeSpin · el cover ya no necesita un-rotate · al hacer
             fade + shrink simultáneo el user no nota la pose final del cover.
           · sourceCard opacity 1 sin delay (close más rápido · no necesario). */
        const tgtRect = bsFrame.getBoundingClientRect();
        const srcRect = sourceCard.getBoundingClientRect();
        const dx = (srcRect.left + srcRect.width / 2) - (tgtRect.left + tgtRect.width / 2);
        const dy = (srcRect.top  + srcRect.height / 2) - (tgtRect.top  + tgtRect.height / 2);
        const sx = srcRect.width  / tgtRect.width;
        const sy = srcRect.height / tgtRect.height;
        const scale = Math.max(sx, sy);

        sourceCard.style.transition = "opacity 200ms ease 40ms";
        sourceCard.style.opacity = "1";

        bsOverlay.classList.add("is-closing");

        const closeMove = bsFrame.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 }
          ],
          { duration: 300, easing: EASE_OUT, fill: "forwards" }
        );

        await closeMove.finished;

        /* Cleanup · reset todo y devuelve estilos */
        bsOverlay.classList.remove("is-active");
        bsOverlay.classList.remove("is-closing");
        bsOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("bs-locked");
        setBackgroundInert(false);
        bsFrame.style.opacity = "";
        bsFrame.getAnimations().forEach((a) => a.cancel());
        bsSpinner.getAnimations().forEach((a) => a.cancel());
        bsSpinner.style.transition = "";
        bsSpinner.style.transform = "";
        sourceCard.style.transition = "";
        sourceCard.style.opacity = "";
        sourceCard.classList.remove("is-lifting");
        sourceCard.getAnimations().forEach((a) => a.cancel());

        bsOpen = false;
        bsBusy = false;
        lastFocused?.focus?.();
        bsProcessPending();
      }

      /* Event delegation · cualquier .r-book[data-book] abre el modal con
         su data populated. Permite añadir libros nuevos sin tocar event
         listeners individuales. */
      if (bsOverlay) {
        document.addEventListener("click", (e) => {
          const card = e.target.closest("a.r-book[data-book]");
          if (!card) return;
          const bookKey = card.dataset.book;
          if (!BOOK_DATA[bookKey]) return; /* libro sin config · click normal nav */
          e.preventDefault();
          /* Si ya hay un modal open con otro libro, cerramos primero · luego
             abrimos el nuevo cuando termine. Mismo libro · noop si ya está open. */
          if (bsOpen && activeBookKey === bookKey) return;
          sourceCard = card;
          activeBookKey = bookKey;
          populateModal(bookKey);
          openBook();
        });
        bsOverlay.querySelectorAll("[data-bs-close]").forEach((el) => {
          el.addEventListener("click", () => closeBook());
        });
        document.addEventListener("keydown", (e) => {
          if (!(bsOpen || bsBusy)) return;
          if (e.key === "Escape") {
            /* Esc cierra · si todavía no está open pero estamos en mid-animation
               del open, encolamos close → se procesará al terminar el opening. */
            closeBook();
            return;
          }
          if (e.key !== "Tab") return;
          const focusables = getOverlayFocusable();
          if (focusables.length === 0) {
            e.preventDefault();
            bsOverlay.focus();
            return;
          }
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement;
          if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
            return;
          }
          if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
        });
      }

      /* (Módulo 7 · Hero avatar video removido · el hero ahora usa el
         personaje embarazo con animación de respiración orgánica (hero-breathe
         keyframes) · cero JS necesario · todo CSS.) */

      /* ────────────────────────────────────────────────────────────────
         Módulo 8 · Shelf scroll control
         Para cada .r-shelf · inyecta un botón tonal que avanza la
         estantería. Mantiene la pista visual del scroll horizontal sin
         quedarse en un indicador decorativo no clicable. */
      const shelfArrowHTML = '<span class="r-shelf-arrow-lbl">Más</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12"/><path d="m13 7 5 5-5 5"/></svg>';
      document.querySelectorAll(".r-shelf").forEach((shelf) => {
        const rail = shelf.querySelector(".r-shelf-rail");
        if (!rail) return;
        /* Skip si el contenido no necesita scroll (todos los libros caben) */
        const needsScroll = () => rail.scrollWidth > rail.clientWidth + 4;
        /* Inyecta flecha solo si hace falta · si no, ni la creamos */
        let arrow = null;
        const ensureArrow = () => {
          if (arrow) return;
          arrow = document.createElement("button");
          arrow.type = "button";
          arrow.className = "r-shelf-arrow";
          arrow.setAttribute("aria-label", "Ver más libros de Mimo");
          arrow.innerHTML = shelfArrowHTML;
          arrow.addEventListener("click", () => {
            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const distance = Math.max(rail.clientWidth * 0.72, 180);
            const maxLeft = rail.scrollWidth - rail.clientWidth;
            const targetLeft = Math.min(rail.scrollLeft + distance, maxLeft);
            rail.classList.add("is-programmatic-scroll");
            if (prefersReduced) {
              rail.scrollLeft = targetLeft;
              rail.classList.remove("is-programmatic-scroll");
              update();
              return;
            }
            const startLeft = rail.scrollLeft;
            const delta = targetLeft - startLeft;
            const startedAt = performance.now();
            const duration = 440;
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);
            const step = (now) => {
              const t = Math.min(1, (now - startedAt) / duration);
              rail.scrollLeft = startLeft + delta * easeOut(t);
              if (t < 1) {
                requestAnimationFrame(step);
                return;
              }
              rail.classList.remove("is-programmatic-scroll");
              update();
            };
            requestAnimationFrame(step);
          });
          shelf.appendChild(arrow);
        };
        const update = () => {
          if (!needsScroll()) {
            shelf.classList.add("is-scrolled-end");
            return;
          }
          ensureArrow();
          const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
          shelf.classList.toggle("is-scrolled-end", atEnd);
        };
        rail.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
      });

      /* ────────────────────────────────────────────────────────────────
         Módulo 9 · Hero avatar videos
         · Video 1 (hero-vid-scroll) · scroll-scrubbed · currentTime = f(scroll)
         · Video 2 (hero-vid-tap) · trigger en hover (mouseenter) · click
           se mantiene como fallback para touch devices sin hover
         · Background black eliminado via SVG filter luma-to-alpha v8 en
           .hero-avatar-vid (ver index.html sprite)
         · Respeta prefers-reduced-motion · scroll-scrub se queda en frame 0
         ──────────────────────────────────────────────────────────────── */
      const heroAvatar = document.getElementById("hero-avatar");
      const heroVidScroll = document.getElementById("hero-vid-scroll");
      const heroVidTap = document.getElementById("hero-vid-tap");
      const heroTrigger = document.getElementById("hero-avatar-trigger");
      if (heroAvatar && heroVidScroll && heroVidTap && heroTrigger) {
        let isPlayingTap = false;
        let scrubReady = false;

        heroVidScroll.addEventListener("loadedmetadata", () => {
          heroVidScroll.pause();
          heroVidScroll.currentTime = 0;
          scrubReady = true;
        });

        const heroEl = document.querySelector(".hero");
        const onScroll = () => {
          if (!scrubReady || isPlayingTap || reduced || !heroEl) return;
          const rect = heroEl.getBoundingClientRect();
          const heroH = heroEl.offsetHeight || 1;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(1, Math.max(0, scrolled / heroH));
          heroVidScroll.currentTime = progress * (heroVidScroll.duration || 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        /* Trigger compartido · llamado tanto en hover (desktop) como
           click (touch fallback) · guard isPlayingTap evita re-triggers
           si el usuario mueve el mouse sobre el avatar repetidamente. */
        const playTap = () => {
          if (isPlayingTap) return;
          isPlayingTap = true;
          heroAvatar.classList.add("is-playing-tap");
          heroVidTap.currentTime = 0;
          const p = heroVidTap.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        };

        // Hover · desktop · feels like "petting" el avatar
        heroTrigger.addEventListener("mouseenter", playTap);
        // Click · fallback para touch (no hover en mobile) + keyboard a11y
        heroTrigger.addEventListener("click", playTap);

        heroVidTap.addEventListener("ended", () => {
          isPlayingTap = false;
          heroAvatar.classList.remove("is-playing-tap");
          heroVidTap.currentTime = 0;
          onScroll();
        });
      }
    })();

    /* ════════════════════════════════════════════════════════════════════
       Modal · Datos (data-trust) · se abre desde "Datos privados" (footer) ·
       no se muestra inline. Cierre por backdrop / X / Escape · restaura foco
       al trigger. Scroll lock reutiliza body.bs-locked. */
    (function initDatosModal() {
      const overlay = document.getElementById("datos");
      if (!overlay || !overlay.classList.contains("datos-overlay")) return;
      const modal = overlay.querySelector(".datos-modal");
      let lastTrigger = null;

      const open = (trigger) => {
        lastTrigger = trigger || null;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("bs-locked");
        if (modal) { try { modal.focus(); } catch (e) {} }
      };
      const close = () => {
        if (!overlay.classList.contains("is-open")) return;
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("bs-locked");
        if (lastTrigger && typeof lastTrigger.focus === "function") {
          try { lastTrigger.focus(); } catch (e) {}
        }
        lastTrigger = null;
      };

      // Triggers · [data-datos-open] o cualquier <a href="#datos">
      document.querySelectorAll('[data-datos-open], a[href="#datos"], a[href$="/#datos"]').forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          open(el);
        });
      });

      // Cierre · backdrop + botón X
      overlay.querySelectorAll("[data-datos-close]").forEach((el) => {
        el.addEventListener("click", close);
      });

      // Cierre · Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      });
    })();
