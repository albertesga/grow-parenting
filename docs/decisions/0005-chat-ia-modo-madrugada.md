# ADR-0005 · Modo madrugada · single-thread + Modo madrugada efímero

**Status:** Accepted
**Date:** 2026-05-09 → 2026-05-11 (Fases A-F) · rename brand 2026-05-25 · refactor JS internals 2026-05-25
**Commit:** `cdb5779` (skeleton) · `a66bee1` (DS) · `050e645` (Fase A) · `8421209` (B) · `f6a03ac` (C.1) · `04543dd` (C.2) · `abea206` (D) · `7b977b4` (E) · `56fd863` (F DS) · `2a8104c` (revision) · `e8b3108` (rename brand Modo 3AM → Modo madrugada) · `pending` (refactor JS internals chat-3am → modo-madrugada)

> **Historial terminológico** · El feature se llamó originalmente "Modo 3AM"
> (mayo 2026) · renombrado a **"Modo madrugada"** (25 may 2026) en todo el
> stack · brand user-visible + JS internals + CSS classes + DOM IDs +
> data-attributes + localStorage keys. **Cero refs `3am`/`3AM`** en el
> codebase actual. Identificadores canon:
>
> - `data-screen="modo-madrugada"` (screen routing)
> - `madrugadaSession`, `madrugadaStart()`, `renderChatMadrugada()` (JS)
> - `MADRUGADA_KEY` (localStorage const)
> - `.madrugada-toggle`, `.modo-madrugada-options` (CSS classes)
> - `mimo.madrugada.optedIn`, `mimo.madrugada.v1` (localStorage keys)

## Context

PRD Fase 0 definía un Modo madrugada como módulo central de la app · necesidad de:
- Conversación con hij@ contextualizado (edad, modos especiales)
- Triage de síntomas con árboles canon NICE/AAP/AEPED
- Modo nocturno crisis (22-06h) sin gamification ni juicio
- Cero diagnóstico · "aquí no diagnosticamos, aquí estamos"

Alternativas: chat multi-thread por libro (rechazado, fragmentaba experiencia), prompt único sin contexto (rechazado, perdía continuidad), wizard de decisiones (rechazado, frío clínico).

## Decision

**Dos screens canon:**

1. **`data-screen="chat"`** · single-thread principal · persistente · UI cálida
2. **`data-screen="modo-madrugada"`** · efímero · dark mode · solo accesible 22-06h o vía opt-in localStorage `mimo.madrugada.optedIn`

**Componentes canon:**
- `.bubble.{you|companion|pediatra|system}` · primitive de mensaje
- `.chat-triage-chips` · 8 árboles cribaje (fever · breathing · crying · vomiting · diarrhea · head · rash · seizure) con fuentes NICE NG143/NG9/NG232/NG217/CG84/CG102 + Wessel + NSBSP
- `.tool-card` · 5 tonal variants · link-out a libros existentes desde el chat
- `.cita-clinica` · pill primitive `FUENTE · AÑO`
- `.safety-frame` · NSBSP 4-pasos cards numeradas + footer canon
- `.mental-health-banner` · CTA tel:024 (ES) auto-detect via navigator.language
- `.sticky-disclaimer` · "Aquí no diagnosticamos · aquí estamos" footer fijo

**Estado persistido:** `logEntries`, `chatMessages` en localStorage con prefix `grow.chat.*`.

**26 funciones JS** modulares (chatIsNightTime, openSafetyFrame, openEpds, madrugadaSaveAndExit, etc.).

DS § V · 13 sub-secciones canonical · documenta toda la architecture.

## Consequences

- ✓ Continuidad emocional · una sola conversación, no fragmentada
- ✓ Modo madrugada no estigmatiza · efímero por diseño (no historial visible)
- ✓ Triage trees con outcome estructurado · `urgent / caution / safe` badges
- ✓ Cross-ref a libros vía tool-cards · no requiere context switch mental
- ⚠ Single thread puede crecer mucho · v1.5 considerar archivo por mes
- ⚠ Trigger 22-06h depende de `Date.prototype.getHours()` cliente · no es seguro pero coincide con PRD

## Alternatives considered

- **Chat per-libro**: fragmenta. Cada libro tiene su contexto pero el hij@ es uno · NO.
- **Wizard estructurado**: pierde calidez "doula bilingüe" · NO.
- **Auto-trigger madrugada sin opt-in**: paternalista · resp. PRD canon · opt-in 1ª vez · NO auto.
