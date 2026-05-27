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

      /* Chroma key per-pixel · luminance Rec.709 → alpha con hard cut + soft ramp.
         HARD a 40 (iter 2 · era 30 · 18 originalmente) para matar el rim
         compresión MP4 más agresivamente · SOFT a 75 mantiene ramp angosto.
         Iter 2 · user reporta que el rim aún se ve · subo HARD y aumento
         erode passes. */
      const CHROMA_HARD = 40;
      const CHROMA_SOFT = 75;
      function chromaKey(d) {
        const range = CHROMA_SOFT - CHROMA_HARD;
        for (let i = 0; i < d.length; i += 4) {
          const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          if (lum < CHROMA_HARD)      d[i + 3] = 0;
          else if (lum < CHROMA_SOFT) d[i + 3] = ((lum - CHROMA_HARD) * 255 / range) | 0;
        }
      }

      /* Erode "true" · morfología binaria · CUALQUIER pixel con alpha>0 que
         toque un pixel con alpha=0 → se vuelve alpha=0. Iter 3 · removido
         el threshold <220 que evitaba eat pixels alpha-altos (lo que dejaba
         visible el rim de pixels con alpha 220-255 pero RGB oscuro · línea
         dotted persistente). Ahora la silueta se reduce 1px por pase, sin
         excepciones · 4-5 pases eliminan ~4-5px de rim eficazmente. */
      function erodeEdge(d, w, h) {
        const a = new Uint8Array(w * h);
        for (let i = 0, j = 3; i < a.length; i++, j += 4) a[i] = d[j];
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const k = y * w + x;
            if (a[k] === 0) continue;
            const up = y > 0 ? a[k - w] : 0;
            const dn = y < h - 1 ? a[k + w] : 0;
            const lt = x > 0 ? a[k - 1] : 0;
            const rt = x < w - 1 ? a[k + 1] : 0;
            if (up === 0 || dn === 0 || lt === 0 || rt === 0) {
              d[k * 4 + 3] = 0;
            }
          }
        }
      }

      /* Decodea N frames de un MP4 · scrub via currentTime + seeked event.
         Aplica chroma key + guarda cada frame como canvas. Promise resuelve
         con el array de canvases listos para drawImage. */
      function extractFrames(url, count) {
        return new Promise((resolve, reject) => {
          const vid = document.createElement("video");
          vid.src = url;
          vid.muted = true;
          vid.playsInline = true;
          vid.preload = "auto";
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
                try {
                  const img = ctx.getImageData(0, 0, w, h);
                  chromaKey(img.data);
                  // 5 pases · eat ~5px del rim de pixels boundary dark
                  // (con erode "true" cada pase reduce 1px sin excepciones)
                  for (let p = 0; p < 5; p++) erodeEdge(img.data, w, h);
                  ctx.putImageData(img, 0, 0);
                } catch (e) {
                  /* CORS taint · sin alpha real pero al menos pintamos algo. */
                }
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

      function paintCanvas(canvas, frame) {
        if (!canvas || !frame) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
      }

      function renderFrameAt(progress) {
        if (!framesA || !framesB || totalFrames === 0) return;
        const idx = Math.max(0, Math.min(totalFrames - 1, Math.round(progress * (totalFrames - 1))));
        const frame = idx < framesA.length
          ? framesA[idx]
          : framesB[idx - framesA.length];
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

      /* Boot async · arranca extracción de frames en paralelo. Mientras carga,
         mostramos los canvases con opacity 0 (CSS); cuando termina pintamos
         frame 0 y añadimos .is-ready (fade in). Si falla, dejamos el canvas
         invisible · el bloque sigue narrando con el texto y el tracker. */
      (async () => {
        const isMobile = window.matchMedia("(max-width: 960px)").matches;
        const FRAME_COUNT = reduced ? 2 : (isMobile ? 24 : 40);
        const URL_1 = "assets/parallax-1-bolita-to-newborn.mp4";
        const URL_2 = "assets/parallax-2-newborn-to-baby.mp4";
        try {
          const [fa, fb] = await Promise.all([
            extractFrames(URL_1, FRAME_COUNT),
            extractFrames(URL_2, FRAME_COUNT)
          ]);
          framesA = fa;
          framesB = fb;
          totalFrames = framesA.length + framesB.length;
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
      })();

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
        if (!heroAvatar) return;

        const HALO_SIZE = 460; // matches CSS width/height
        const HALO_HALF = HALO_SIZE / 2;

        // Sticky offset del .avatar-stage en CSS (top: 96px). Cuando el
        // scrollY hace que stage_pageY - scrollY = 96, sticky activa.
        const SEC2_STICKY_TOP = 96;
        // Cuándo arranca la transición de halo · 40% del scroll del hero ·
        // antes de esto halo queda anchored en hero · evita movimientos
        // raros mientras el user está leyendo el hero.
        const HERO_KICKOFF_RATIO = 0.4;
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

        let ticking = false;
        function update() {
          ticking = false;
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const hero = rectInfo(heroAvatar);

          if (!sec2Stage || !sec2Frame) {
            // No parallax · halo siempre en hero
            halo.style.transform =
              `translate(${(hero.cx - HALO_HALF).toFixed(1)}px, ${(hero.cy - HALO_HALF).toFixed(1)}px) scale(1)`;
            return;
          }

          const stage = rectInfo(sec2Stage);
          const sec2  = rectInfo(sec2Frame);

          // Progress basado en scrollY entre 2 anchors estables del DOM:
          //   start · scrollY donde el hero se vuelve "leaving" (40% scrolled)
          //   end   · scrollY donde el stage sticky-activa (stage_pageY - 96)
          // Como ambos son page-Y absolutos (rect.top + scrollY) las anclas
          // son estables y la interpolación es continua · no hay dead zone
          // donde hero ya salió y sec2 aún no entró (el halo seguía hero.y
          // negativo · disappeared above viewport).
          const heroPageY = hero.top + scrollY;
          const stagePageY = stage.top + scrollY;
          const startScroll = heroPageY + hero.h * HERO_KICKOFF_RATIO;
          const endScroll = stagePageY - SEC2_STICKY_TOP;
          const span = Math.max(1, endScroll - startScroll);
          const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / span));

          // Posición target del halo · interpolada entre hero center y
          // sec2 frame center (+nudge Y) usando las posiciones ACTUALES en
          // viewport · cuando ambos están off-screen pero progress=0.5,
          // halo termina en viewport center (visible) en vez de off-screen.
          const targetSec2X = sec2.cx;
          const targetSec2Y = sec2.cy + SEC2_Y_NUDGE;
          const x = hero.cx + (targetSec2X - hero.cx) * progress;
          const y = hero.cy + (targetSec2Y - hero.cy) * progress;

          // Interpolar escala · hero más grande (1.0) · sec2 más pequeño (0.72)
          const scaleHero = 1.0;
          const scaleSec2 = 0.72;
          const scale = scaleHero + (scaleSec2 - scaleHero) * progress;

          halo.style.transform =
            `translate(${(x - HALO_HALF).toFixed(1)}px, ${(y - HALO_HALF).toFixed(1)}px) scale(${scale.toFixed(3)})`;
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

      /* 5 · Signup form · changes button text to "Gracias ✓" */
      const signupForm = document.getElementById("signup");
      if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const btn = signupForm.querySelector("button");
          if (btn) { btn.textContent = "Gracias ✓"; btn.disabled = true; }
        });
      }

      /* 6 · Book sheet · shared-element transition libro embarazo → bottom sheet
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
      const BOOK_DATA = {
        embarazo: {
          tone: "coral", /* clase tonal aplicada al .bs-sheet o cover · futuro */
          coverIcon: "#b-belly",
          coverTitle: 'Libro de<br><em>embarazo</em>',
          coverFootCount: "Libro · 01",
          coverFootMethod: "SEGO",
          backEyebrow: "Lo que resuelve",
          backPhrase: '"Cuando las opiniones se contradicen, la evidencia te lleva a casa."',
          backSub: "Sem 4 → primeras horas · SEGO · NICE · AEPED",
          pageImg: "assets/embarazo-hero.png",
          pageImgAlt: "Libro de embarazo",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { icon: "#b-pulse",    title: "Patadas",         copy: "Count the Kicks · 10 movimientos en 2 horas desde la semana 28." },
            { icon: "#b-thermo",   title: "Tensión",         copy: "PPG via cámara del móvil · orientativo · alarma cuando sube." },
            { icon: "#b-bookmark", title: "Plan de parto",   copy: "Sub-libro propio · editable · imprimible · checklist hospital." },
            { icon: "#b-heart",    title: "Síntomas",        copy: "Qué mirar · cuándo llamar · qué decir al equipo." },
            { icon: "#i-cal",      title: "Citas y pruebas", copy: "Ecografías · glucosa · Tdpa · qué preguntar en cada una." },
            { icon: "#b-syringe",  title: "APILAM",          copy: "Medicación segura durante el embarazo · base actualizada." }
          ],
          aval: "Avalado por · SEGO · NICE · AEPED · Comité clínico Grow"
        },
        parto: {
          tone: "coral",
          coverIcon: "#b-pulse",
          coverTitle: 'Preparación<br><em>al parto</em>',
          coverFootCount: "Libro · 11",
          coverFootMethod: "EAPM",
          backEyebrow: "Para llegar lista",
          backPhrase: '"Saber qué pasa en cada fase es lo que cambia el miedo por confianza."',
          backSub: "Sem 28 → primeras horas · EAPM · NICE · OMS",
          pageImg: "assets/parto-hero.png",
          pageImgAlt: "Libro de preparación al parto",
          featuresLabel: "Lo que el libro hace por ti",
          features: [
            { icon: "#b-pulse",  title: "Signos de parto",   copy: "Contracciones · rotura de aguas · cuándo ir al hospital." },
            { icon: "#i-cal",    title: "Fases del parto",   copy: "Dilatación · transición · expulsivo · alumbramiento." },
            { icon: "#b-sprout", title: "Posiciones",        copy: "Movimiento · gravedad · cuerpo · todo el repertorio." },
            { icon: "#b-heart",  title: "Manejo del dolor",  copy: "Respiración · epidural · masaje · agua caliente." },
            { icon: "#b-thermo", title: "Cesárea",           copy: "Programada o de urgencia · piel a piel también." },
            { icon: "#b-tear",   title: "Primeras horas",    copy: "Piel a piel · primer enganche · postpartum 24h." }
          ],
          aval: "Avalado por · EAPM · NICE · OMS · Comité clínico Grow"
        }
      };

      /* Card actualmente activa · se setea en el click handler antes de openBook */
      let sourceCard = null;
      let activeBookKey = null;

      function populateModal(bookKey) {
        const data = BOOK_DATA[bookKey];
        if (!data) return false;
        /* Cover front */
        bsOverlay.querySelector(".bs-cover-front .bs-icon svg use").setAttribute("href", data.coverIcon);
        bsOverlay.querySelector(".bs-cover-front .bs-ttl").innerHTML = data.coverTitle;
        const foot = bsOverlay.querySelectorAll(".bs-cover-front .bs-foot span");
        if (foot[0]) foot[0].textContent = data.coverFootCount;
        if (foot[1]) foot[1].textContent = data.coverFootMethod;
        /* Cover back */
        bsOverlay.querySelector(".bs-back-eyebrow").textContent = data.backEyebrow;
        bsOverlay.querySelector(".bs-back-h").textContent = data.backPhrase;
        bsOverlay.querySelector(".bs-back-sub").textContent = data.backSub;
        /* Page right · img */
        const pageImg = bsOverlay.querySelector(".bs-page-img");
        pageImg.src = data.pageImg;
        pageImg.alt = data.pageImgAlt;
        /* Body · features · checklist DS canon · check mark uniforme
           para todos los items (no se populates · sólo title + copy). */
        bsOverlay.querySelector(".bs-features-section .bs-eyebrow").textContent = data.featuresLabel;
        const features = bsOverlay.querySelectorAll(".bs-feature");
        data.features.forEach((f, i) => {
          if (!features[i]) return;
          features[i].querySelector("h5").textContent = f.title;
          features[i].querySelector("p").textContent = f.copy;
        });
        /* Aval */
        bsOverlay.querySelector(".bs-aval").textContent = data.aval;
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
        if (bsOpen) return;
        if (bsBusy) { bsPending = "open"; return; }
        bsBusy = true;
        lastFocused = document.activeElement;
        bsOverlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("bs-locked");

        if (reduced) {
          /* Reduced motion · skip animations · sheet aparece sin transition */
          bsOverlay.classList.add("is-active");
          bsSpinner.style.transform = "rotateY(-180deg)";
          bsFrame.style.transform = "none";
          bsFrame.style.opacity = "1";
          bsClose.classList.add("is-ready");
          bsOpen = true;
          bsBusy = false;
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
        bsProcessPending();
      }

      async function closeBook() {
        if (!sourceCard) return;
        if (!bsOpen) return;
        if (bsBusy) { bsPending = "close"; return; }
        bsBusy = true;
        bsClose.classList.remove("is-ready");

        if (reduced) {
          bsOverlay.classList.remove("is-active");
          bsOverlay.setAttribute("aria-hidden", "true");
          document.body.classList.remove("bs-locked");
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
          /* Esc cierra · si todavía no está open pero estamos en mid-animation
             del open, encolamos close → se procesará al terminar el opening. */
          if (e.key === "Escape" && (bsOpen || bsBusy)) closeBook();
        });
      }

      /* (Módulo 7 · Hero avatar video removido · el hero ahora usa el
         personaje embarazo con animación de respiración orgánica (hero-breathe
         keyframes) · cero JS necesario · todo CSS.) */

      /* ────────────────────────────────────────────────────────────────
         Módulo 8 · Shelf scroll hint
         Para cada .r-shelf · inyecta una flecha indicadora a la derecha
         (.r-shelf-arrow) + atacha listener al .r-shelf-rail que toggle
         clase .is-scrolled-end cuando el scroll horizontal llega al
         final. CSS fade out la flecha + el gradiente del edge. */
      /* Chip-style indicator · "MÁS" en Galiner caps + chevron 1.5px stroke.
         Hereda tonal del bloque via --accent-* vars (coral/blush/mint). */
      const shelfArrowHTML = '<span class="r-shelf-arrow-lbl">Más</span><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>';
      document.querySelectorAll(".r-shelf").forEach((shelf) => {
        const rail = shelf.querySelector(".r-shelf-rail");
        if (!rail) return;
        /* Skip si el contenido no necesita scroll (todos los libros caben) */
        const needsScroll = () => rail.scrollWidth > rail.clientWidth + 4;
        /* Inyecta flecha solo si hace falta · si no, ni la creamos */
        let arrow = null;
        const ensureArrow = () => {
          if (arrow) return;
          arrow = document.createElement("div");
          arrow.className = "r-shelf-arrow";
          arrow.setAttribute("aria-hidden", "true");
          arrow.innerHTML = shelfArrowHTML;
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
