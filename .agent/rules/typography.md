# Rule · Typography

Jerarquía tipográfica canon May 2026. **Galiner** serif para display,
**Inter** Variable para body, **Grift** exclusivamente para el número
grande del pricing.

## Por qué

- **Galiner** (TBJ Studio) · serif elegante editorial · ancla el tono
  emocional de Mimo (calma + dignidad)
- **Inter Variable** (Rasmus Andersson) · industry standard para UI ·
  optimizado para legibility en pantalla · 18 cortes en 2 woff2
- **Grift** · acento geométrico distintivo · usado puntualmente en el
  número grande del precio para crear contraste visual sin invadir body

Mantener esta jerarquía estricta evita "font soup" y refuerza el
contraste serif/sans que define el sistema visual.

## Reglas

### Galiner (display serif)

**Cuándo** · h1, h2, h3, h4, h5, h6 · `.eyebrow` · `.manifesto-sub` ·
nombre doctor en `.comite-card` · cualquier headline editorial.

**Pesos disponibles** · 300 (Light), 400 (Regular), 700 (Bold). **Sin
italic** · el corte no existe. Para matiz editorial usa Light 300 +
`color: var(--ink-soft)`.

**Token** · `--font-serif` o alias `--font-display`.

```css
font-family: var(--font-serif);
font-weight: 300; /* sin italic, weight controla matiz */
color: var(--ink-soft); /* contraste editorial */
```

### Inter Variable (body sans)

**Cuándo** · body, micro, labels, CTAs, navigation, form fields, captions ·
**todo lo que no sea Galiner o Grift**.

**Pesos disponibles** · 100-900 normal · 100-900 italic. 1 woff2 por
estilo (variable font · más eficiente que 18 archivos).

**Token** · `--font-text`.

```css
font-family: var(--font-text);
font-weight: 300; /* Light · trust strip, micro */
font-weight: 400; /* Regular · body default */
font-weight: 500; /* Medium · labels, emphasis sutil */
font-weight: 700; /* Bold · CTAs, callouts */
```

### Grift (acento pricing)

**Cuándo** · ÚNICAMENTE en números de precio · `.plan .price .amt` (pricing:
€0 / €1,99 / €9,99) y `.llamada-price .amt` (precio de llamadas 1:1: 30 €).
El `.per` (/mes, /llamada) y `.price-foot` usan Inter como el resto del body.

**Por qué exclusivo** · acento geométrico distintivo en un único punto ·
si Grift apareciese en body habría conflicto con Inter y se perdería el
contraste de "número-acento".

**Token** · `--font-price` (encapsula la cascade `"Grift", "Inter", sans-serif`).

```css
.plan .price .amt {
  font-family: var(--font-price); /* Grift · acento */
  font-weight: 900;
}
.plan .price .per,
.plan .price-foot {
  font-family: var(--font-text); /* Inter · body */
}
```

### Mono (debugging / code-like)

**Token** · `--font-mono`. Solo si excepcional · debugging readout, code
snippet en docs in-product. Casi nunca user-facing.

## Tokens canónicos

```css
:root {
  --font-serif:   "Galiner", "Bodoni Moda", "Playfair Display", Georgia, serif;
  --font-display: "Galiner", "Bodoni Moda", "Playfair Display", Georgia, serif; /* alias */
  --font-text:    "Inter", system-ui, -apple-system, sans-serif;
  --font-price:   "Grift", "Inter", sans-serif; /* SOLO .amt */
  --font-mono:    "JetBrains Mono", "SF Mono", ui-monospace, monospace;
}
```

## Ejemplos

### ✓ Canon

```css
h2 { font-family: var(--font-serif); font-weight: 300; }
p  { font-family: var(--font-text);  font-weight: 400; }
.btn-primary { font-family: var(--font-text); font-weight: 600; }
.plan .price .amt { font-family: var(--font-price); font-weight: 900; }
```

### ✗ Anti-canon

```css
/* ❌ Grift en body */
body { font-family: "Grift", sans-serif; }

/* ❌ Galiner italic (no existe en el corte) */
.eyebrow { font-family: var(--font-serif); font-style: italic; }

/* ❌ Inter en headline */
h1 { font-family: var(--font-text); }

/* ❌ Hex literal hardcoded sin token */
.label { font-family: "Inter"; } /* usar var(--font-text) */
```

## Archivos de fonts

```
homepage/assets/fonts/
  ├── TBJGaliner-Light.ttf  TBJGaliner-Regular.ttf  TBJGaliner-Bold.ttf
  ├── InterVariable.woff2  InterVariable-Italic.woff2
  └── Grift-{Thin..Black}.ttf  +  Grift-{...}Italic.ttf  (18 archivos)

design/assets/fonts/
  └── mismas (espejo · para prototype y DS)
```

## Cita ADR

- (Sin ADR formal del swap typography May 2026 · canon documentado aquí
  + en `design/Mimo Design System v0.2.html` § A.1)
- ADR-0011 · referencia indirecta (copy canon influye en typography choices)

## Workflow

1. Voy a añadir / modificar font-family en CSS
2. Reviso · ¿es headline → Galiner · body → Inter · pricing .amt → Grift?
3. Uso el token correspondiente · nunca string literal
4. Verifico que no introduzco Grift en body ni Inter en headline
5. Si el font no carga · valida que el woff2 está en `assets/fonts/`
