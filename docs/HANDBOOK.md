# Mimo · HANDBOOK

Onboarding doc para humano nuevo + agente fresco. Lee esto si es tu primer
día en el proyecto · o si has vuelto tras un break largo.

## Qué es Mimo

App para familias hispanohablantes · del embarazo a los 3 años del hij@.
**Trauma-informed** · sin gamification, sin urgencia, sin juicio. Diseñado
para ser usado con poco tiempo, con la mano libre, en mobile, en momentos
emocionalmente cargados.

**Target audience** · familias en España y LATAM en su primer/segundo
ciclo familiar · padres / madres / parejas LGBTIQ+ / adoptivos / monoparentales.

**Diferencial vs competencia** · no es un tracker de hitos clinical (BabyTracker,
ChildLens). Es un **acompañamiento editorial** con criterio clínico ·
contenido validado, calendario que usan los pediatras, tests científicos
para detectar a tiempo, conversación con criterio.

## Stack visual

- **Paper** · papel crema cálido (`#FAF7F0`) · evita el blanco quirúrgico
- **Ink** · negro suave (`#34342D`) · evita el negro hospital
- **Galiner** (serif TBJ) · display único · pesos 300/400/700 sin italic
- **Inter** Variable · body, micro, CTAs · 100-900 normal + italic
- **Grift** · acento geométrico · SOLO en el número grande del pricing
- **7 tonal families** · coral, blush, mint, gold (× 3 tiers) + violet, sky, ochre (× subtle/strong)
  (subtle/base/strong)

Detalle: `.agent/rules/typography.md` · `.agent/rules/palette-tonal.md`.

## Stack técnico · dual (ver ADR-0017)

- **homepage/ + prototype.html** · vanilla HTML/CSS/JS · sin frameworks, sin
  build, sin bundler · se sirven directos.
- **apps/about-us/** · Next.js 16 + Tailwind + Framer Motion · CON build ·
  `npm run build` genera static export en `homepage/about-us/` (NO editar a
  mano · ver `.agent/rules/file-structure.md` regla 9).
- **No backend** · todo client-side · el prototipo no hace network requests.
- **Server local** · `python3 -m http.server 5050` desde raíz sirve
  todo prod-like · dev about-us con HMR · `cd apps/about-us && npm run dev`.
- **Single-developer** · sin PRs · commits atómicos + push directo.

## Map de archivos

```
Mimo/
├── AGENTS.md                          (entry-point canónico para agentes)
├── CLAUDE.md                          (alias pointer Claude Code)
├── README.md                          (overview humano · 30s)
├── .agent/                            (brain · loop · rules · skills)
│   ├── agents.md                      (brain detallado)
│   ├── rules/ (9 archivos)            (reglas duras)
│   └── skills/ (5 archivos)           (loop: explore→plan→implement→verify→memoria)
├── .claude/                           (Claude Code config + sub-agents existentes)
│   ├── agents/ (2)                    (ds-auditor, copy-auditor)
│   ├── skills/ (4)                    (verify-proto, sync-ds, new-book, audit-trauma-copy)
│   ├── hooks/                         (post-edit-verify.sh)
│   ├── PATTERNS.md                    (patrones implícitos)
│   └── settings.json, launch.json
├── docs/
│   ├── HANDBOOK.md                    (este archivo)
│   └── decisions/                     (18 ADRs + template + README)
├── design/
│   ├── Mimo Design System v0.2.html   ★ SINGLE SOURCE OF TRUTH ★
│   ├── assets/{fonts, img}/
│   ├── v0.1/                          (histórico · solo arqueología)
│   └── briefs *.md                    (iteración pasada · read-only)
├── homepage/                           (★ canonical public web root)
│   ├── index.html                      (landing vanilla)
│   ├── styles.css
│   ├── main.js
│   ├── assets/{fonts, img}/
│   ├── about-us/                       (static export · output del Next build)
│   ├── img/ frames/ fonts/ lottie/     (assets mirrored del about-us public)
│   └── propuesta-v{2,3}.html           (drafts archivados)
├── apps/                               (sub-app sources · ver ADR-0017)
│   └── about-us/                       (Next.js 16 · narrativa Inti)
│       ├── app/                        (App Router · layout + page)
│       ├── components/                 (LandingPage + 4 sections)
│       ├── public/                     (fonts/frames/img/lottie sources)
│       ├── next.config.js              (output:'export' basePath /about-us)
│       └── package.json                (build copia a homepage/about-us/)
├── prototype.html                     (app simulation single-file · ~20k líneas)
├── prd/ (3 PRDs)                      (Product Requirement Docs · read-only)
└── research/ (6 docs)                 (User research · read-only)
```

Detalle completo: `.agent/rules/file-structure.md`.

## Glosario

| Término | Qué significa |
|---|---|
| **Libro** | Módulo del app (Hitos, Vacunas, Embarazo, Lactancia, Sueño, Desarrollo, Diario, Salud, Alimentación, Cólicos, Perfil). Cada libro tiene tono canon y avatar. |
| **Primitive** | Componente reusable del DS (`.book-hero`, `.chip`, `.phone-nav`, `.book-card`). |
| **Tono** | Familia de color tonal (coral, blush, mint, gold, violet, sky, ochre, paper-deep). |
| **Kicker** | Microcopy serif (Galiner Light 300) sobre headlines · context label. |
| **Eyebrow** | Texto pequeño sobre headlines · puede ser serif o ink-soft. |
| **Hero** | Card grande superior de un libro con tono + avatar. |
| **FAB** | Floating Action Button central del navbar · log primario del libro. |
| **ADR** | Architecture Decision Record · `docs/decisions/{NNNN}-{slug}.md`. |
| **Trauma-informed** | Tono que respeta carga emocional · no urgencia, no juicio, no gamification. |
| **DS** | Design System · `design/Mimo Design System v0.2.html`. |
| **Sheet** | Bottom sheet modal · pattern documentado en prototype y landing. |
| **Avatar** | Personaje circular en hero · mint default · coral solo embarazo. |

## Workflow local

### Server

```bash
cd "/Users/titoespanolgamon/Documents/Vibe Coding/Grow"
python3 -m http.server 5050
```

URLs:
- Landing · http://localhost:5050/homepage/
- Prototype · http://localhost:5050/prototype.html
- DS · http://localhost:5050/design/Mimo%20Design%20System%20v0.2.html

### Hot reload manual

No hay HMR. Hard refresh con `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Linux).
Si el cambio es a font woff2 · puede requerir clear cache.

### Commit / push

Atomic commits con Co-Author footer · push tras cada commit:

```bash
git add <files>
git commit -m "feat(scope): mensaje corto

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push
```

Tipos: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`.
Scopes: `libro-{name}`, `landing`, `ds`, `harness`, `typo`, `motion`, `a11y`.

Detalle: `.agent/skills/implement.md`.

## Cómo hacer cosas comunes

### Crear un libro nuevo en el app

Usa el skill `/new-book`:
- Definición · `.claude/skills/new-book/SKILL.md`
- Scaffold completo · shelf entry + screen + hero + navbar + state + log filter
- Sigue ADR-0001 (book-hero) + ADR-0002 (navbar)
- Post-creación · spawn `ds-auditor` para review

### Verificar cambios pre-commit

Usa el skill `/verify-proto`:
- HTTP 200 sobre landing + prototype + DS
- `node --check` sobre JS del prototype
- Output canónico · `LAND 200 · PROTO 200 · DS 200 · JS_OK`

### Auditar drift DS ↔ prototype

Usa el skill `/sync-ds`:
- Detecta primitives en DS sin uso · primitives en prototype sin doc en DS
- Útil tras cambios CSS de primitive canónico

### Auditar copy trauma-informed

Usa el skill `/audit-trauma-copy`:
- Grep canon ADR-0011 (gamification, rojo médico, militancia, citas sin fuente)
- Reporta hits con sugerencias canon

### Spawn sub-agent auditor

- `ds-auditor` · review independiente cambio visual (`.claude/agents/ds-auditor.md`)
- `copy-auditor` · review independiente cambio copy (`.claude/agents/copy-auditor.md`)

Spawn en paralelo si el cambio toca UI y copy a la vez.

## ADRs vigentes (canon histórico)

18 decisiones formales en `docs/decisions/`. Una línea cada una:

| ADR | Decisión |
|---|---|
| ADR-0001 | book-hero canon · min-height 120px, padding 14px, radius 26px |
| ADR-0002 | navbar dedicado por libro · `.phone-nav .{libro}-phone-nav` |
| ADR-0003 | chip primitive · 1 sola clase `.chip` + tono + active "vacío" |
| ADR-0004 | bottom nav perfil · acceso global a configuración |
| ADR-0005 | chat IA Modo madrugada · tono nocturno cuando aplica |
| ADR-0006 | sub-libros pattern · navegación interna jerárquica |
| ADR-0007 | diary timeline vertical · pattern de lanes calculadas |
| ADR-0008 | pantalla perfil · estructura canon |
| ADR-0009 | libro salud emergencia · NSBSP canon directo |
| ADR-0010 | log filter por source · map central en JS |
| ADR-0011 | **trauma-informed copy canon** · 6 reglas duras |
| ADR-0012 | action CTAs card-style · pattern icon + body + arrow |
| ADR-0013 | post primitives · section-head, checklist, etc. |
| ADR-0014 | app store distribución · iOS + Android via Expo |
| ADR-0015 | bookstate helpers · compartir state entre libros |
| ADR-0016 | cross-libro routing · `data-goto` unificado |
| ADR-0017 | monorepo · homepage canonical + apps/about-us static export |
| ADR-0018 | dual-stack + deuda DS conocida (tokens/topbar/avatar dup diferida) |

Read README en `docs/decisions/README.md` para cómo crear nueva ADR.

## Loop canónico

`explore → plan → implement → verify → memoria`

Cada paso es una skill en `.agent/skills/{step}.md`. Lee en orden cuando
arrancas una tarea no trivial.

## Guardrails críticos

1. **DS canon siempre primero** · reusa primitives, NO inventes
2. **Copy trauma-informed** · cero gamification, cita clínica con fuente + año
3. **Typography** · Galiner display / Inter body / Grift solo `.amt`
4. **Palette tonal** · CSS variables, nunca hex literal
5. **Verificación pre-commit** · HTTP 200 + JS check + auditor si aplica

Detalle: `AGENTS.md` (root) y `.agent/agents.md` (brain).

## Decisiones business pendientes

- **Pricing final** · €0 / €1,99 (founding, 100 plazas) / €9,99 mensual · plan anual €69,99 (−42%) · OK
  según research 04, pero pending lock-in de partners
- **Paywall** · qué features son gated · pending finalizar con producto
- **Comité clínico** · listado de doctores · OK firmado, pending refresh
  fotos
- **Store distribution** · iOS primero · Android Q2 · ADR-0014
- **App store name** · "Mimo" disponible en App Store según verificación
  v0.3 · pending registro

## Contacto / ownership

Single-developer · todas las decisiones business pasan por el user (Tito).
Los agentes (Claude Code, sub-agents) NO deciden pricing/business/legal ·
ver `.agent/rules/escalation.md`.

## Cambio reciente importante (May 2026)

- **Body font swap** · Grift → Inter Variable · Grift queda solo en
  `.plan .price .amt` (pricing big number). Detalle en `.agent/rules/typography.md`.

Para el resto · revisa `git log --oneline -20` para los commits más recientes.
