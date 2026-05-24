# Rule · Palette tonal

5 familias tonales × 3 tiers (subtle / base / strong) + paleta paper / ink.
Mapping libro → tono fijo. Cero hex literal en código aplicación · todo
via CSS variables.

## Por qué

- **Coherencia visual** · cada libro tiene un tono identificable y constante
  entre app y landing
- **Editorial sobriety** · paleta cálida (papel crema + ink negro suave +
  acentos pasteles) que evita la saturación de productos digitales típicos
- **Accesibilidad** · contraste AA+ garantizado en las combinaciones canon
  (ink sobre paper, ink sobre subtle)
- **Mantenibilidad** · 1 cambio de hex en `:root` → propagación automática

## Familias tonales

### Coral (cálido / energía / acción / urgencia)

| Tier | Hex | Uso |
|---|---|---|
| `--coral-subtle` | `#FBE5D6` | Fondos de callout, hero subtle |
| `--coral-base` | `#F2A57A` | Buttons, badges, accents |
| `--coral-strong` | `#D67742` | Texto de urgencia, CTAs primary (NO fill) |

**Libro asignado** · Embarazo, Alimentación, Cólicos.

### Blush (suave / lactancia / contención)

| Tier | Hex | Uso |
|---|---|---|
| `--blush-subtle` | `#F8E4DD` | Fondos contention (modo arcoíris) |
| `--blush-base` | `#EFC2B5` | Hero de Lactancia, Diario |
| `--blush-strong` | `#D89A89` | Texto emphasis blush |

**Libro asignado** · Lactancia, Diario.

### Mint (calma / hitos / crecimiento / default)

| Tier | Hex | Uso |
|---|---|---|
| `--mint-subtle` | `#E5EDDF` | Fondos checklist, ready cards |
| `--mint-base` | `#BFD2B0` | Hero de Hitos, Sueño, Perfil |
| `--mint-strong` | `#8FAE85` | Confirmaciones, completed checks |

**Libro asignado** · Hitos, Sueño, Perfil, Diario (default).

### Gold (informativo / salud / prevención)

| Tier | Hex | Uso |
|---|---|---|
| `--gold-subtle` | `#F6EBC9` | Fondos vacunas, alertas suaves |
| `--gold-base` | `#E8C97A` | Hero de Vacunas, callouts info |
| `--gold-strong` | `#B8973F` | Texto emphasis gold (sparingly) |

**Libro asignado** · Vacunas.

### Violet (desarrollo / introspectivo)

| Tier | Hex | Uso |
|---|---|---|
| `--violet-subtle` | `#E6DFE9` | Fondos desarrollo |
| `--violet-strong` | `#6A5A7E` | Texto emphasis lavanda |

**Libro asignado** · Desarrollo.

(No tiene `--violet-base` definido · usa subtle + strong solamente.)

### Paper / Ink (base canvas)

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#FAF7F0` | Background principal |
| `--paper-soft` | `#F2EDE0` | Cards background suave |
| `--paper-deep` | `#E8E1CF` | Cards background deep / hero Salud |
| `--ink` | `#1A1A1A` | Texto principal |
| `--ink-warm` | `#2A211B` | Texto warm sobre tonal |
| `--ink-soft` | `#4D4D4D` | Texto secundario, eyebrows |
| `--ink-muted` | `#888888` | Texto muted, captions |
| `--ink-faint` | `#BFBAA8` | Texto faint, placeholders |
| `--line` | `#E2DDD1` | Borders sutiles |
| `--line-strong` | `#C9C2B2` | Borders dividers |
| `--module-dark` | `#1B1A18` | Backgrounds dark modules (poster, etc.) |

## Mapping libro → tono (canon fijo)

| Libro | Tono | Avatar |
|---|---|---|
| Hitos | mint | mint |
| Lactancia | blush | mint |
| Vacunas | gold | mint |
| Sueño | mint (nocturno) | mint |
| Desarrollo | lavender (violet) | mint |
| Diario | blush | mint |
| Embarazo | coral | **coral** (única excepción) |
| Salud | paper-deep | mint |
| Alimentación | coral | mint |
| Cólicos | coral | mint |
| Perfil | mint | mint |

**María (embarazo)** usa `avatar-coral` · todos los demás `avatar-mint`.

## Reglas

1. **Cero hex literal en JS / inline styles** · siempre variable CSS:
   ```js
   // ❌ NO
   el.style.color = '#D67742';
   // ✓ Sí
   el.style.color = 'var(--coral-strong)';
   ```

2. **Cero `red`, `#FF0000`, `#F00`** · para urgencias usa `coral-strong`
   (texto) o `coral-base` (background suave). Ver `copy-canon.md` regla 2.

3. **Tono libro = canon fijo** · no cambiar mapping libro → tono sin ADR.
   `salud` siempre `paper-deep`, `vacunas` siempre `gold`, etc.

4. **Subtle/base/strong tiering**:
   - `subtle` · backgrounds amplios, callouts, hero soft
   - `base` · accents identificables (FAB, badge, button bg)
   - `strong` · texto emphasis, CTAs primary, borders deep

5. **Contraste** · valida AA+ en combinaciones nuevas:
   - `ink` sobre `paper` · OK (alto)
   - `ink` sobre `subtle` · OK (medio-alto)
   - `ink-soft` sobre `subtle` · ojo · valida si <4.5:1

## Ejemplos

### ✓ Canon

```css
.book-hero.coral { background: var(--coral-subtle); color: var(--ink); }
.cta-urgent { color: var(--coral-strong); } /* urgencia */
.fab.hitos-fab { background: var(--mint-base); box-shadow: 0 6px 18px rgba(143,174,133,0.28); }
```

### ✗ Anti-canon

```css
/* ❌ Hex literal */
.btn { background: #F2A57A; }

/* ❌ Rojo médico */
.warning { color: red; }

/* ❌ Tono fuera de mapping (vacunas debería ser gold, no mint) */
.book-hero.vacunas { background: var(--mint-subtle); }
```

## Cita ADR

- **ADR-0001** · book-hero canon (asigna tono a cada hero por libro)
- **ADR-0011** · trauma-informed copy (cero rojo médico)
- **ADR-0009** · libro salud emergencia (uso de paper-deep para hero)

## Workflow

1. Necesito un color en CSS
2. Reviso esta rule · ¿qué familia/tier toca?
3. Uso `var(--{familia}-{tier})` · nunca hex literal
4. Si el tono no existe en el mapping libro → tono · escala a ADR
