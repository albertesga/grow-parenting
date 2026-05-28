# Workspace Notion map · Grow canon mayo 2026
## Handoff doc para Claude Code spec-driven development

> Pegable directo a prompt Claude Code para que sepa la estructura canónica del workspace Notion + cómo navegarlo. Ver también `CLAUDE.md` en la raíz del repo.
>
> Última actualización: 18 mayo 2026 · post-migración spec-driven (Fases A-E).

---

## 0 · TL;DR (≤200 palabras)

El workspace Notion de Grow está **organizado spec-driven** desde mayo 2026. **Master directory**: `📍 _index canon`. Architecture decision records: `📜 adrs-index` (16 ADRs activas mapeadas a líneas del prototype.html). 4 niveles canónicos: **specs/** (8 specs core: manifiesto · arquitectura · DS · clínico AEPED · trauma-informed · auth · i18n · privacy), **libros/** (9: Embarazo · Alimentación · Lactancia · Vacunas · Sueño · Salud · Cólicos · Hitos · Desarrollo), **transversales/** (10: quick-log · modo-madrugada · chat-IA · cuenta-compartida · ChildLens-ID · export-PDF · screening · modos-especiales · notificaciones · onboarding), y páginas operativas (Pricing canon · Architecture v0 · 4. Competitive · 7. Business Model · 8. Roadmap · 1. Overview · 2.1 Lean Canvas · Research v0.2). Cada spec tiene frontmatter + TL;DR ≤200 palabras + Goal + Acceptance + Anti-patterns + Implementation pointer (líneas reales prototype.html) + Changelog. Si hay contradicción entre páginas, las specs canon ganan.

---

## 1 · Cómo navegar el workspace (orden recomendado)

**1er fetch para cualquier pregunta canon**:
- `📍 _index canon` master directory con **matriz pregunta → spec**.
- URL: https://www.notion.so/36455399748a814f938bd43c547581db

**2do fetch (si necesitas detalle)**:
- La spec canon que respondió en la matriz.

**3er fetch (si necesitas implementación)**:
- `📜 adrs-index` con líneas reales del prototype.html + ADRs.
- URL: https://www.notion.so/36455399748a815bb616e184990cffbf

---

## 2 · Jerarquía canon del workspace

```
🌱 Grow (hub)
│
├── 📍 _index canon — master directory + matriz pregunta → spec
├── 📜 adrs-index — 16 ADRs + mapa screen → línea prototype.html
├── 📋 Auditoría + propuesta arquitectura spec-driven
│
├── 🌱 specs/ (8 specs canon core · source of truth)
│   ├── 🌱 spec/manifiesto-canon
│   ├── 🏛️ spec/arquitectura-canon (9 libros + Modo madrugada + 6 modos + transversales)
│   ├── 🎨 spec/design-system-canon (DS v0.2 real · Lenia + Helvena + 8 tonales)
│   ├── 🩺 spec/canon-clinico-aeped (AEPED 2026 · escalas · red-flags · MDR)
│   ├── 🌈 spec/canon-trauma-informed (10 chequeos Fase 0)
│   ├── 🔐 spec/auth-canon (sin password · Apple/Google/magic link · anónimo first 24h)
│   ├── 🌍 spec/i18n-canon (ES Fase 0 · EN+IT Q1 2027 · STIKO/NICE Q2-Q3 2027)
│   └── 🔒 spec/privacy-canon (cifrado E2E · on-device · cero ads · GDPR Art.9)
│
├── 📚 libros/ (9 libros canónicos)
│   ├── 🤰 libro/embarazo (coral) — sem 4-40
│   ├── 🍼 libro/alimentacion (coral) — 0-3a
│   ├── 🤱 libro/lactancia (blush) — 0-18m
│   ├── 💉 libro/vacunas (gold) — 0-3a
│   ├── 🌙 libro/sueno (mint nocturno) — 0-3a
│   ├── 🌡️ libro/salud (paper-deep) — 0-3a
│   ├── 😭 libro/colicos (coral) — 0-6m
│   ├── 🌱 libro/hitos (mint) — 0-3a
│   └── 💛 libro/desarrollo (lavender) — 0-3a
│
├── 🔧 transversales/ (10 features cross-libros)
│   ├── ➕ trans/quick-log (9 tipos · FAB central)
│   ├── 🌙 trans/modo-madrugada (3 chips edad-aware · triage 061)
│   ├── 💬 trans/chat-ia-contextual (Haiku 4.5 + Sonnet 4.6)
│   ├── 👥 trans/cuenta-compartida (co-cuidador simétrico)
│   ├── 🎁 trans/childlens-id-cross-app (ecosistema)
│   ├── 📤 trans/export-pdf-pediatra
│   ├── 📊 trans/screening-clinico (EPDS · M-CHAT-R · ASQ-3 · LATCH · BITSS · Wessel · PBA-5)
│   ├── 🌈 trans/modos-especiales (6: preemie · arcoíris · monoparental · mismo sexo · adopción · subrogación)
│   ├── 🔔 trans/notificaciones-canon (16 tipos · críticas no-silenciables)
│   └── 📝 trans/onboarding-canon (3 preguntas <60s · anónimo first 24h)
│
├── Páginas operativas (canon vivo)
│   ├── 🌱 Fase 0 — Manifiesto + Arquitectura (source of truth resumen)
│   ├── 💰 Pricing strategy + GTM (source of truth pricing)
│   ├── 🏗️ Architecture v0 web + modelo de costes (stack target v1)
│   ├── 1. Overview & Visión (canon manifesto v2)
│   ├── 2.1 Lean Canvas & Hipótesis (canon)
│   ├── ⚔️ 4. Competitive Landscape (canon)
│   ├── 💰 7. Business Model (pricing delegado)
│   ├── 🗺️ 8. Roadmap & Decisiones (canon)
│   ├── 🔬 Research sintético v0.2 (8 entrevistas + findings)
│   └── 🧬 Content Journey de Grow
│
├── Histórico refactored a pointer
│   ├── 🧩 5. Features / Módulos → pointer a specs/ + libros/ + transversales/
│   ├── 🎨 6. Wireframes & Design → pointer a spec/design-system-canon
│   ├── 2. User Research → pointer + JTBD útil
│   └── 3. Desk Research → pointer + sizing + journey 12 fases
│
└── 📦 Archived · pre-mayo-2026
    ├── GR-9 Sign-off (cancelado)
    ├── 2.2 Insights & Recalibraciones (research v1 histórico)
    ├── 🏃 Grow Execution Board F1-F8
    ├── Funneles Captación 2027 (otro proyecto)
    └── 🎯 GR-19 MVP v0 Scope + RICE Matrix 58 features
```

---

## 3 · Matriz pregunta → spec (consulta rápida)

| Pregunta | Spec canon · 1 fetch |
| --- | --- |
| ¿Cuál es el manifesto? | spec/manifiesto-canon |
| ¿Cuántos libros + cuáles? | spec/arquitectura-canon |
| ¿Pricing canon? | 💰 Pricing strategy + GTM |
| ¿Stack técnico + costes? | 🏗️ Architecture v0 |
| ¿Onboarding canon? | trans/onboarding-canon |
| ¿Research + personas? | 🔬 Research sintético v0.2 |
| ¿Plan validación Q2-Q3? | 9 · Findings transversales |
| ¿Competencia? | 4. Competitive Landscape |
| ¿Business model + canales? | 7. Business Model |
| ¿Features por libro? | libros/ · libro/XXX |
| ¿DS · paleta · tipografía? | spec/design-system-canon |
| ¿Escalas clínicas? | spec/canon-clinico-aeped |
| ¿Tono trauma-informed? | spec/canon-trauma-informed |
| ¿Auth flow? | spec/auth-canon |
| ¿i18n roadmap? | spec/i18n-canon |
| ¿Privacy / GDPR? | spec/privacy-canon |
| ¿Modo madrugada? | trans/modo-madrugada |
| ¿Quick log? | trans/quick-log |
| ¿Chat IA? | trans/chat-ia-contextual |
| ¿Cuenta compartida? | trans/cuenta-compartida |
| ¿Export PDF pediatra? | trans/export-pdf-pediatra |
| ¿Screening clínico? | trans/screening-clinico |
| ¿6 modos especiales? | trans/modos-especiales |
| ¿Notificaciones? | trans/notificaciones-canon |
| ¿ADRs + líneas prototype? | 📜 adrs-index |

---

## 4 · Plantilla obligatoria por nueva spec

```markdown
---
title: spec/[nombre]
version: 1.0
last-updated: YYYY-MM-DD
owner: tito.espanol@antaiventures.com
status: canon | draft | deprecated
supersedes: [page-titles]
depends-on: [page-titles]
implementation: prototype.html [linea] | docs/decisions/ADR-XXXX.md
---

## TL;DR (≤200 palabras · pegable a prompt)
[Autocontenido. Si pegas esto a Claude Code, sabe construir.]

## Goal
[1-2 frases. "Este spec define X para conseguir Y."]

## User stories (si aplica)
- As a [persona research v0.1], I want [outcome], so that [why].

## Acceptance criteria
- [ ] criterio testeable 1
- [ ] criterio testeable 2

## Anti-patterns (NO HACER)
- ❌ [pattern específico que rompe el canon]

## Data model / API (si aplica)

## Edge cases

## Implementation pointer
- prototype.html línea X-Y · función handleXYZ()
- docs/decisions/0012-name.md

## Changelog
- v1.0 · YYYY-MM-DD · Inicial canonizado.
```

---

## 5 · Convenciones canon mayo 2026 (cheatsheet)

- **Manifesto v2**: *"No hay una manera correcta. Hay la tuya. Y la tuya nace del amor. Para cualquier familia que cuida."*
- **Brand**: "tu hij@" hero · "tu hij@" copy contextual.
- **0**: streaks · rankings · comparativos · rojo médico explícito · ads · dark patterns.
- **9 libros** (no 6 módulos viejo).
- **6 modos especiales**: preemie · arcoíris · monoparental · mismo sexo · adopción · subrogación.
- **Bottom nav**: Hoy · Calendario · ⊕ FAB · Chat · Yo (5-tab + FAB central).
- **DS v0.2**: paper-cream + 8 tonales canon + Lenia + Helvena + avatares 3D blandos.
- **Auth**: sin password nunca · Apple/Google/magic link · anónimo first 24h.
- **Pricing**: Plus €7.99 · ChildLens+ €9.99 · Care €19.99 · Founding €1.99 launch · trial 14d sin tarjeta.
- **Sin audio / sin TTS** (decisión mayo 2026).
- **Privacy first**: cifrado E2E + cry classifier on-device + cero ads.
- **MDR Class IIa pathway Q3 2026**: audit log desde día 1.
- **i18n**: ES Fase 0 · EN+IT Q1 2027 · UK+DE Q2-Q3 2027.

---

## 6 · ADRs canon (16 activas)

Ver `📜 adrs-index` para tabla completa. Resumen por categoría:

- **Primitives DS** (6): 0001 book-hero · 0002 navbar · 0003 chip · 0007 diary timeline · 0012 action CTAs · 0013 post primitives.
- **Arquitectura módulos** (7): 0004 bottom nav Perfil · 0005 chat IA + Modo madrugada · 0006 sub-libros · 0008 Pantalla Perfil · 0009 libro Salud + emergencia · 0010 log filter · 0016 cross-libro routing.
- **Tono** (1): 0011 trauma-informed copy canon.
- **Distribución** (1): 0014 App Store single + App Clips.
- **JS centralización** (1): 0015 bookState + helpers.

ADRs pendientes (backlog): 0017-0023 para canon-clinico · auth · i18n · privacy · modos · cuenta · notif.

---

## 7 · Mapa Screen → Línea prototype.html (cheatsheet)

| Screen | Línea | Spec/Libro |
| --- | --- | --- |
| registro | 11276 | spec/auth-canon |
| onboarding-fase/datos/casa/ready | 11294-11386 | trans/onboarding-canon |
| hoy | 11450 | spec/arquitectura-canon |
| calendario | 11592 | spec/arquitectura-canon |
| desarrollo | 11625 | libro/desarrollo |
| hitos | 11659 | libro/hitos |
| diario | 11732 | spec/arquitectura-canon |
| salud | 11758 | libro/salud |
| salud-emergencia | 12225 | libro/salud + trans/modo-madrugada |
| perfil | 12272 | spec/arquitectura-canon |
| sueno | 12459 | libro/sueno |
| alimentacion | 12497 | libro/alimentacion |
| lactancia | 12535 | libro/lactancia |
| embarazo | 12549 | libro/embarazo |
| vacunacion | 12587 | libro/vacunas |
| log/log-registro | 12611-12626 | trans/quick-log |
| chat | 12634 | trans/chat-ia-contextual + trans/modo-madrugada |
| colicos (+5 sub) | 12824-13157 | libro/colicos |

---

## 8 · Briefs Claude Design existentes

- `/Grow/design/claude-design-landing-brief-v2.md` — landing v0.2 hi-fi brief.
- `/Grow/design/claude-design-onboarding-brief-v2.md` — onboarding v0.2 hi-fi brief.

Ambos pegables directos a Claude Design.

---

## 9 · Research artifacts

- `/Grow/research/00-executive-summary.md`
- `/Grow/research/01-landing-flow-walkthrough.md`
- `/Grow/research/02-task-flow-validation.md`
- `/Grow/research/03-heuristic-canon-audit.md`
- `/Grow/research/04-pricing-wtp-audit.md`
- `/Grow/research/05-pricing-strategy-canon.md`

---

## 10 · Reglas para Claude Code

1. **Antes de tocar canon visible/UI**: leer la spec relevante (`spec/design-system-canon` siempre + spec/libro de la zona afectada).
2. **Antes de crear ADR nueva**: copiar `docs/decisions/0000-template.md` + secuenciar `NNNN-titulo-kebab.md`.
3. **Cuando una decisión canon cambie**: crear ADR nueva + marcar la vieja como `Superseded by ADR-NNNN`.
4. **Si una spec contradice prototype.html**: ganan las specs canon (canon source of truth, no implementación).
5. **Si una spec contradice docs/decisions/ADR**: ganan las ADRs (autoridad técnica).
6. **Para nuevas features**: crear `spec/[nombre]` siguiendo plantilla §4.
7. **Antes de implementar**: spec → ADR → código.
8. **Status canon `Accepted` por defecto** en ADRs y specs nuevas.

---

## 11 · Changelog

- **v1.0 · 2026-05-18** · Inicial post-migración spec-driven (Fases A-E completadas). Workspace canon Notion + map screen → línea + ADRs index + plantilla obligatoria + reglas Claude Code.

---

*WORKSPACE-NOTION-MAP · Grow canon mayo 2026 · pegable a prompt Claude Code para handoff spec-driven.*
