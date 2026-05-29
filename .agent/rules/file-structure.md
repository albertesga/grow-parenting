# Rule · File structure

Qué archivo vive dónde · qué archivos son single-source-of-truth · qué es
consumer vs producer. No mezclar dominios (landing vs prototype vs DS).

## Por qué

- **Single source of truth claro** · DS es origen, prototype y landing
  consumen. Si cambias el DS, propagas a los consumers. Si cambias un
  consumer sin tocar el DS · el DS está mintiendo.
- **No mezcla de scopes** · landing es público (marketing) · prototype es
  app simulation · no se cruzan en contenido ni en lógica.
- **Cero ambigüedad** · cuando un agente fresco necesita encontrar X ·
  sabe en qué archivo mirar primero.

## Mapa de archivos

```
/Users/titoespanolgamon/Documents/Vibe Coding/Grow/
├── AGENTS.md                         (root entry · qué es Mimo)
├── CLAUDE.md                         (alias pointer Claude Code)
├── README.md                         (humano · 30s overview)
├── .agent/                           (brain orquestador)
│   ├── agents.md
│   ├── rules/                        (9 reglas duras)
│   └── skills/                       (5 skills · loop)
├── .claude/                          (Claude Code config + sub-agents existentes)
│   ├── agents/                       (ds-auditor, copy-auditor)
│   ├── skills/                       (verify-proto, sync-ds, new-book, audit-trauma-copy)
│   ├── hooks/                        (post-edit-verify.sh)
│   ├── PATTERNS.md                   (patrones implícitos no canon)
│   ├── WORKSPACE-NOTION-MAP.md
│   ├── settings.json / launch.json
│   └── worktrees/                    (git worktrees)
├── docs/
│   ├── HANDBOOK.md                   (onboarding humano + agentes)
│   └── decisions/                    (ADRs · canon histórico)
│       ├── 0000-template.md
│       ├── 0001-...md  →  0018-...md (18 ADRs vigentes)
│       └── README.md
├── design/                           (Design System · single source of truth)
│   ├── Mimo Design System v0.2.html  (DS canónico · NO tocar como consumer)
│   ├── assets/fonts/                 (Galiner, Inter Variable, Grift)
│   ├── assets/img/                   (avatares, covers, ilustraciones)
│   ├── v0.1/                         (histórico · arqueología solo)
│   ├── IA-homepage-v0.1.md           (info architecture briefs)
│   ├── claude-design-*.md            (briefs de iteración)
│   └── wireframes-homepage-v0.1.html (wireframes baja fidelidad)
├── homepage/                          (★ public web root · consumer del DS · vanilla, sin build)
│   ├── index.html                     (landing marketing)
│   ├── styles.css
│   ├── main.js
│   ├── waitlist.html                  (flow waitlist · 10 pasos · localStorage)
│   ├── assets/fonts/                 (espejo de design/assets/fonts/)
│   ├── assets/img/                   (assets específicos landing)
│   ├── assets/mimo-avatar.js          (component reusable del avatar chroma · ver doc inline)
│   ├── about-us/                      (★ static export del build de apps/about-us · NO editar a mano)
│   ├── img/ frames/ fonts/ lottie/    (assets mirror del about-us public · ver ADR-0017)
│   ├── propuesta-v2.html             (drafts archivados)
│   └── propuesta-v3.html
├── apps/                              (sub-app sources con build · ver ADR-0017)
│   └── about-us/                      (Next.js 16 + Tailwind + Framer Motion · narrativa Inti)
│       ├── app/                       (App Router · layout + page + globals.css)
│       ├── components/                (LandingPage + secciones + SiteTopbar + primitives)
│       ├── public/                    (fonts/frames/img/lottie sources)
│       ├── next.config.js             (output:'export' · basePath /about-us)
│       └── tailwind.config.ts         (tokens DS · paleta tonal espejo de styles.css)
├── prototype.html                    (app simulation · consumer del DS · single-file ~20k líneas)
├── prd/                              (Product Requirement Docs · read-only para diseño)
│   ├── PRD-chat-modo-madrugada-v0.1.md
│   ├── PRD-libro-colicos-v0.1.md
│   └── PRD-libro-salud-v0.1.md
├── research/                         (User research · read-only para diseño)
│   ├── 00-executive-summary.md
│   ├── 01-landing-flow-walkthrough.md
│   ├── 02-task-flow-validation.md
│   ├── 03-heuristic-canon-audit.md
│   ├── 04-pricing-wtp-audit.md
│   ├── 05-pricing-strategy-canon.md
│   └── screenshots/
├── .planning/                        (audits ad-hoc · 1 archivo)
├── .gitignore
├── .replit
└── replit.nix
```

## Reglas

1. **DS es producer · landing y prototype son consumers**:
   - El DS define el primitive · ej. `.book-hero`
   - Landing y prototype reusan ese primitive
   - Si necesitas modificar el primitive · primero modifica DS · luego
     propaga
   - Cambiar `.book-hero` solo en landing sin actualizar DS = drift = ⚠

2. **Landing ≠ prototype**:
   - Landing tiene su propio `homepage/styles.css` y `homepage/main.js`
   - Prototype es single-file (CSS y JS inline en `prototype.html`)
   - NO importes lógica del prototype en landing
   - NO compartas componentes JS entre los dos (cada uno tiene su propio
     reset, modal handler, etc.)
   - El único cross-cutting permitido · DS HTML y assets compartidos
     (fonts, img)

3. **`design/v0.1/` es histórico** · no tocar salvo arqueología de
   decisiones tempranas. Cualquier diseño nuevo va en el HTML canónico v0.2.

4. **`prd/` y `research/` son read-only para el agente diseño**:
   - Lee para entender context · NO modifiques
   - Si el copy o spec cambia · el PRD lo actualiza un humano
   - Si necesitas un PRD nuevo · pide al user

5. **Fonts assets** · ambos paths (`homepage/assets/fonts/` y
   `design/assets/fonts/`) están sincronizados manualmente. Si añades
   una font nueva · `cp` a ambos. No symlinks porque rompe en algunos
   filesystems.

6. **NO crear `*.md` nuevos** salvo que el user pida · regla del repo.

7. **NO crear nuevas carpetas en raíz** sin razón fuerte. Si necesitas
   organizar · usa subcarpetas de `homepage/`, `design/`, `docs/`.

8. **Archivos draft / propuesta** · OK temporalmente con sufijo `-v2`,
   `-v3`. Cuando se canoniza · merge al canon principal y borrar el draft.

9. **Dual-stack · vanilla + Next (ver ADR-0017)**:
   - `homepage/` (index, waitlist, styles, main.js) + `prototype.html` =
     **vanilla HTML/CSS/JS sin build** · se editan y se sirven directos.
   - `apps/about-us/` = **Next.js 16 con build** · se edita el source aquí ·
     `npm run build` genera el static export en `homepage/about-us/` +
     espeja assets a `homepage/{img,frames,fonts,lottie}`.
   - **`homepage/about-us/` es GENERADO · NUNCA editar a mano** (se pierde al
     re-buildear). Cambios de about-us → editar `apps/about-us/` + rebuild.
   - Dev about-us · `cd apps/about-us && npm run dev` (:3000). Todo servido
     prod-like · `python3 -m http.server --directory homepage`.

## Glosario

| Carpeta | Propósito | Read/Write para agente diseño |
|---|---|---|
| `homepage/` | Public web root (landing + waitlist · vanilla) | R/W |
| `homepage/about-us/` | Static export generado (build de apps/about-us) | R only · NUNCA editar a mano |
| `apps/about-us/` | Sub-app Next.js (narrativa Inti · con build) | R/W (source) |
| `prototype.html` | App simulation | R/W |
| `design/` (DS principal) | Single source of truth visual | R/W |
| `design/v0.1/` | Histórico | R only |
| `design/{briefs}.md` | Briefs de iteración pasados | R only (archivo) |
| `docs/decisions/` | ADRs · canon histórico | R · W solo crea nuevas |
| `docs/HANDBOOK.md` | Onboarding | R · W si stack cambia |
| `prd/` | PRDs · scope humano | R only |
| `research/` | User research | R only |
| `.agent/`, `.claude/` | Harness + Claude Code | R · W solo si cambia metodología |
| `.planning/` | Audits ad-hoc | R/W |

## Ejemplos

### ✓ Canon

- Necesito añadir un chip nuevo · lo añado en DS HTML primero · luego
  propago a `prototype.html` y a `homepage/styles.css`
- Necesito un avatar nuevo · `cp avatar.png design/assets/img/ && cp
  avatar.png homepage/assets/img/`
- Necesito documentar una decisión · ADR nueva en `docs/decisions/`

### ✗ Anti-canon

- Añado un primitive solo en landing sin actualizar el DS · drift
- Modifico un archivo en `design/v0.1/` para "fix" algo · es histórico
- Edito un PRD para que coincida con lo que implementé · al revés · el PRD
  define el scope · si cambió · pide al user actualizar el PRD
- Creo `homepage/components/` o `homepage/utils/` · over-engineering ·
  todo en 3 archivos

## Workflow

1. Necesito tocar X
2. ¿Es un primitive visual? · empieza en `design/Mimo Design System v0.2.html`
3. ¿Es copy del app? · `prototype.html`
4. ¿Es copy de marketing? · `homepage/index.html`
5. ¿Es spec / requirement? · NO toques · lee `prd/`
6. ¿Es metodología? · `.agent/` o ADR nueva
