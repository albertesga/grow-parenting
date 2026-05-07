# Auditoría Grow v0.1 · sistema completo
**Archivos:** Foundations · Primitives · Product Components · Flows · Avatars Vocab

---

## TL;DR
El sistema está sano de tokens y tipografía (todos los archivos comparten paleta y fonts). Los problemas son de **convergencia de componentes**: el mismo elemento (navbar, status bar, mini-hero, cat-card) está re-implementado en cada archivo con valores ligeramente distintos. Hay 12 inconsistencias accionables · ninguna grave.

---

## ✅ Lo que está bien (no tocar)
- **Paleta** idéntica en los 5 archivos: `--paper`, `--ink-warm`, `--coral-*`, `--blush-*`, `--mint-*`, `--gold-*`, `--line`, `--line-strong`. 
- **Fonts** idénticas: Lenia Sans (300/400/500/700 + italic) + Helvena (400/500/600/700).
- **Categorías** (8 cats con tint+ink) sólo viven en Product Components y Flows — bien aislado.
- **Night palette** idéntica en los 3 archivos que la usan.
- **Hero, section-num, section-head** idénticos pixel-a-pixel.

---

## 🟡 Inconsistencias prioritarias

### 1. Foundations le falta `--ink-warm`
- **Foundations** sólo tiene `--ink: #1A1A1A`.
- **Primitives + Product + Flows** añaden `--ink-warm: #2A211B` (usado para botones primarios, cat-card titles, navbar active).
- **Fix:** añadir `--ink-warm: #2A211B` a Foundations §tokens y rehacer la página de tokens. Sino el "color principal de UI" está documentado mal.

### 2. Categorías no documentadas en Foundations
- 8 tokens `--cat-*-tint`/`--cat-*-ink` sólo viven en Product Components y Flows.
- **Fix:** añadir sección "Category palette" en Foundations con los 8 swatches. Es info crítica de marca que un dev nuevo no encontraría.

### 3. Status bar varía entre archivos
- Flows usa `padding: 10px 16px 6px; font-size: 9px`.
- Primitives §F usa otra altura.
- **Fix:** congelar en Primitives como `.status` canónico y referenciarlo desde Flows con la misma clase + valores.

### 4. FAB color/sombra inconsistente
- **Primitives:** `width: 60px; box-shadow: 0 6px 18px rgba(214,119,66,0.28)` (FAB grande standalone).
- **Flows phn-nav:** `width: 35px; sin sombra` (FAB en navbar de móvil).
- **Estado:** correcto que sean tamaños distintos pero **falta documentarlo** como "FAB standalone vs FAB en navbar".

### 5. Símbolo de page-meta cambia color por archivo
- Foundations: `--mint-base`
- Primitives: `--mint-base`
- Product Components: `--coral-base`
- Flows: `--blush-base`
- **Estado:** intencional (cada doc tiene su "color firma") pero debe documentarse en Foundations como sistema, no parecer accidente.

### 6. `phn-nav .tab.active` color
- Flows: `color: var(--ink)` (no `--ink-warm`).
- Pero Primitives botones usan `--ink-warm`.
- **Fix:** unificar a `--ink-warm` en Flows para coherencia con el resto de UI activa.

### 7. Sub-tabs (`cal-subtabs`) sólo en Flows
- Componente nuevo añadido en §C Calendario sin pasar por Primitives ni Product.
- **Fix v0.2:** mover a Primitives §F (junto a tabs/segmented control) y a Product como pattern documentado.

### 8. Timeline scrubber (`cal-timeline`, `tl-tick`, `tl-now`) sólo en Flows
- Igual que sub-tabs: componente complejo nuevo sin promotion.
- **Fix v0.2:** documentar en Product Components junto al feed.

### 9. Hito range bar (`hito-range`) sólo en Flows §C5
- Componente nuevo del último cambio.
- **Fix v0.2:** promotion a Product Components.

### 10. Diary entry pattern (`diary-e`) sólo en Flows §C4
- Componente nuevo del último cambio.
- **Fix v0.2:** promotion a Product Components como "Timeline list pattern".

### 11. Canon option card (`canon-opt`) sólo en Flows §C6
- Componente nuevo. Selector pattern útil más allá del canon — podría reusarse en Settings, choice screens.
- **Fix v0.2:** promotion a Primitives como "Choice card / radio card".

### 12. CTA mini-hero vs cat-card vs cc-cta
- Hay 3 implementaciones de "botón pill ink" en distintos componentes. Mismo aspecto visual pero CSS independiente.
- **Fix:** una sola clase `.btn-pill-ink` reusable en Primitives + alias en componentes.

---

## 🟢 Avatars Vocab — solo nota
Coherente con Foundations. La paleta coral/blush/mint sale directamente de los avatares. **Nada que tocar.**

---

## Priorización para v0.2

| # | Prioridad | Esfuerzo | Acción |
|---|---|---|---|
| 1 | 🔴 Alta | XS | Añadir `--ink-warm` a Foundations |
| 2 | 🔴 Alta | S | Documentar 8 cats en Foundations |
| 6 | 🟡 Media | XS | `phn-nav .tab.active` → `--ink-warm` |
| 5 | 🟡 Media | XS | Documentar "color firma por doc" |
| 7-11 | 🟢 v0.2 | M | Promotion de 5 componentes nuevos del §C Calendario hacia Primitives + Product |
| 3-4 | 🟢 v0.2 | S | Congelar status bar y FABs |
| 12 | 🟢 v0.2 | S | Unificar btn-pill-ink |

---

## Lo que el §C Calendario rebuild añadió al sistema (necesita doc)
- `.cal-timeline` + `.tl-tick` + `.tl-now` — scrubber horizontal
- `.cal-subtabs` + `.cal-subtab` — segmented sub-nav
- `.cal-chips` + `.cal-chip` — filter chips
- `.cal-section-h` — caption uppercase para grupos
- `.cc-card` (variante de cat-card para calendario) + estados past/today/future + attention border
- `.hito-range` — barra de rango Haizea-Llevant
- `.canon-pill` + `.canon-other` + `.canon-opt` — UI de canon clínico
- `.diary-e` + `.diary-mh` + `.diary-fab` — timeline entries
- `.stat-bk` — bloque "✓ conquistado" / "no pierdes datos"
- `.ed-h` + `.ed-body` — secciones educacionales (Qué es / Cómo reconocer / Cuándo consultar)

**11 componentes nuevos** que merecen sección en Product Components v0.2.
