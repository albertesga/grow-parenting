# Rule · Motion canon

Easings, duraciones y patterns de animación canónicos. **Cero gamification
motion** (no confetti, no streak animations, no celebraciones performativas).

## Por qué

- **Trauma-informed motion** · alegría performativa contradice el tono del
  producto · respeto al estado emocional del usuario
- **Performance** · animar solo `transform` y `opacity` evita layout
  thrashing (60fps garantizado)
- **Coherencia** · 5 easings canónicos + 5 duraciones canónicas cubren
  todos los casos · evita "snow flake" animations cada componente
- **Accesibilidad** · respeto a `prefers-reduced-motion` no es negociable

## Tokens canónicos

### Duraciones

```css
--duration-instant: 80ms;   /* tap feedback, micro-interactions */
--duration-fast:    150ms;  /* hover, focus, color transitions */
--duration-base:    220ms;  /* default · most UI transitions */
--duration-slow:    400ms;  /* sheet open, modal enter */
--duration-breath:  5400ms; /* avatar breath loop, ambient */
```

### Easings

```css
--ease:             cubic-bezier(0.2, 0.8, 0.2, 1);     /* default · UI sutil */
--ease-emphasized:  cubic-bezier(0.34, 1.1, 0.4, 1);    /* CTA, llamada de atención */
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);  /* spring bounce sutil */
--ease-soft:        cubic-bezier(0.4, 0, 0.6, 1);       /* soft in-out · breath */
--ease-sheet:       cubic-bezier(0.22, 0.61, 0.36, 1);  /* bottom-sheet, FLIP, hero CTAs */
```

## Reglas

1. **Animar solo `transform` + `opacity`** · NUNCA `width`, `height`, `top`,
   `left`, `padding`, `margin`. Si necesitas cambiar layout · usa FLIP
   technique (First-Last-Invert-Play).

2. **Usar tokens** · no hex literal de easing ni duración random:
   ```css
   /* ❌ NO */
   transition: transform 215ms cubic-bezier(0.42, 0, 0.58, 1);
   /* ✓ Sí */
   transition: transform var(--duration-base) var(--ease);
   ```

3. **Sin gamification motion**:
   - ❌ Confetti, sparkles, fireworks
   - ❌ "Streak" animations (counter pumping, glow loop)
   - ❌ "Achievement unlocked" zoom + rotate
   - ❌ Heart particles, star particles
   - ✓ Subtle fade-in al completar checklist (mint-subtle background pulse)
   - ✓ Smooth scroll suave a sección al completar

4. **Sin "breath" excesivo** · solo el avatar central tiene `--duration-breath`
   loop (5.4s ease-soft). No aplicar a CTAs, badges, ni elementos
   transactionales.

5. **Modal / bottom sheet** · usa `--ease-sheet` + `--duration-slow` (400ms)
   para enter, `--duration-base` (220ms) para exit. Pattern documentado
   en `prototype.html` (book opening) y `landing/main.js` (bs-overlay).

6. **FLIP para shared element transitions** (book opening cover → modal):
   - Captura bounding rect del cover
   - Mueve a posición final con `transform`
   - Invert al estado inicial visualmente
   - Play con `transform: none` + easing

7. **WAAPI > CSS transitions** cuando necesitas:
   - Coordinar múltiples elementos con timing relativo
   - Pause/resume programatically
   - Cancelar mid-animation

8. **`prefers-reduced-motion`** · respetar siempre:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
   }
   ```

## Patrones documentados en código

| Pattern | Where | Easing | Duration |
|---|---|---|---|
| Book opening (cover → modal) | `landing/main.js` openCover() | `--ease-sheet` | 400ms |
| Bottom sheet close | `landing/main.js` closeSheet() | `--ease-sheet` | 220ms |
| Spinner 3D rotation | landing modal spin | `--ease-sheet` | 700ms |
| FAB pulse | prototype `.fab` | `--ease-spring` | 150ms |
| Hero CTA press | landing `.btn-primary` | `--ease-emphasized` | 220ms |
| Avatar breath | prototype `.avatar` loop | `--ease-soft` | 5400ms infinite |
| Tab switch (book interior) | prototype `setBookTab()` | `--ease` | 220ms |

## Ejemplos

### ✓ Canon

```css
.btn-primary {
  transition: transform var(--duration-fast) var(--ease-emphasized),
              background var(--duration-base) var(--ease);
}
.btn-primary:active { transform: scale(0.97); }

.bs-overlay {
  transition: opacity var(--duration-base) var(--ease-sheet);
}
.bs-overlay.is-active { opacity: 1; }
```

### ✗ Anti-canon

```css
/* ❌ Animar layout properties */
.card { transition: width 300ms linear, height 300ms linear; }

/* ❌ Easing literal sin token */
.modal { transition: opacity 250ms ease-in-out; }

/* ❌ Confetti / sparkle gamification */
@keyframes celebration {
  0% { transform: scale(0); filter: brightness(2); }
  100% { transform: scale(1.5) rotate(720deg); }
}

/* ❌ No respeta reduced-motion */
.always-spin { animation: spin 1s linear infinite; } /* sin media query */
```

## Cita ADR

- (Sin ADR formal · canon documentado aquí + en `design/Grow Design System v0.2.html`
  § motion tokens)
- ADR-0011 · trauma-informed copy (motion debe alinearse al mismo tono)

## Workflow

1. Voy a añadir / modificar animation o transition
2. Reviso · ¿qué token de duración + easing toca?
3. Verifico que animo solo `transform` + `opacity`
4. Si es interaction "celebración" (logro hito, checklist completo)
   valido que NO sea performativa · sutil fade es OK
5. Test con DevTools throttle · verifica 60fps
6. Test con `prefers-reduced-motion: reduce` activo
