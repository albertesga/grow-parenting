# ADR-0014 · Distribución App Store · single app + App Clips (no multi-app)

**Status:** Accepted
**Date:** 2026-05-13
**Commit:** (next commit)

## Context

Idea inicial: Mimo como "app de apps" · una app general con todos los
libros + cada libro descargable como app standalone independiente.

Apple Guideline 4.3(a) Design: Spam (enforced desde 2017) prohíbe apps
que "duplican el contenido y funcionalidad de otras apps del mismo
developer". Las sub-apps que son subsets puros del main triggean
rechazo automático.

Investigado en research 2026 + casos comparables en parenting (BabyTracker,
Huckleberry, Sprout, Solid Starts, Glow Inc.). Detalle completo en
`/Users/titoespanolgamon/.claude/plans/abre-un-nuevo-proyecto-wild-nest.md`.

## Decision

**v0-v1.5 · Mimo se distribuye como single app + App Clips.**

### Single main app

Todos los 10 libros (Hitos, Vacunas, Desarrollo, Embarazo, Alimentación,
Lactancia, Sueño, Salud, Cólicos, Diario, Perfil) viven dentro de Mimo.
Un solo bundle ID · `com.grow.parenting` · cuenta compartida única ·
cross-ref trivial entre libros.

### App Clips · acceso instantáneo per-libro

1 App Clip con **múltiples experiencias** distinguibles por URL de
invocación. Triggers: QR en consulta pediátrica · NFC tag en cartilla
papel · Safari Smart App Banner · iMessage link · Spotlight/Siri.

URL pattern canónico:
```
mimo.family/{libro}            → App Clip experience del libro
mimo.family/{libro}/{view}     → drill-down a tab específica
mimo.family/emergencia         → modo emergencia full-screen Salud
```

App Clips priorizados v0:
- **Salud emergencia** · QR en colegio/guardería sin instalar app
- **Vacunas calendario** · QR en consulta pediátrica para mostrar carnet
- **Cólicos crisis** · QR en hospital cuando llanto inconsolable
- **Diario foto compartida** · social sharing sin friction de install

### Universal links

`mimo.family/*` → si la app está instalada, abre tab directa · si no,
App Clip 10MB de esa experiencia. Discovery cero-fricción.

### Cuándo re-evaluar

**v2 (2027-2028) · considerar App Store Bundle** si:
- 3+ libros tienen masa crítica de uso propio (>30% DAU exclusivo del libro)
- Revenue propio justificable per-libro
- Marketing per-vertical aporta más que confunde

**v3 (2028+) · considerar standalone app** SOLO para libros con audiencia
genuinamente diferenciada:
- 🤰 **Mimo Embarazo** · ciclo cerrado pre-parto · transición clara
  al main app post-nacimiento. Precedente: Sprout Pregnancy + Sprout Baby.
- 🎯 **Mimo Pediatra (B2B)** · partner-facing, audiencia profesional, no
  consumer. Equivale a apps administrativas, no compite con main.
- 🌡 **Mimo Cólicos** · scope acotado 0-4m + crisis · retención corta ·
  audiencia distinguible. Riesgo medio.

**NO separar nunca** (alto riesgo 4.3):
- Sueño / Hitos / Alimentación / Lactancia · ya cubiertos por main ·
  serían subsets puros · rechazo casi garantizado
- Salud / Vacunas · cobertura clínica similar · audiencia idéntica al main

## Consequences

- ✓ Cero riesgo App Store rejection 4.3
- ✓ 1 codebase · 1 ciclo de release · 1 certificación MDR
- ✓ Cross-ref entre libros trivial (Modo madrugada con contexto, sub-libro
  Cólicos bajo Salud, fiebre post-vacuna auto-import, etc.)
- ✓ Cuenta compartida cuidadores · 1 login · datos unified
- ✓ App Clips dan el sentimiento de "app per libro" sin el cost legal
- ⚠ App size crece con cada libro · v1.5 considerar bundle splitting
  (on-demand resources for Premium libros)
- ⚠ MDR Class IIa toda la app (no solo Vacunas + Salud) · más estricto
- ⚠ Single keyword set para ASO · marketing per-libro requiere App Clip
  Cards + landing pages diferenciadas

## Alternatives considered

- **Multi-app desde v0** · ⚠ alto riesgo 4.3 rejection · NO. Apple
  rechaza activamente desde 2017. Solo apps con audiencia diferenciada
  pasan (Office, Adobe, Google Maps/Drive). Subsets de un main app son
  spam clásico.
- **PWA only** · pierde NFC, push notifications nativos, integración
  HealthKit. v0 no.
- **Web app + native main** · complejidad SSO 2x · no aporta sobre App
  Clips · NO.
- **Multi-app con bundle desde v0** · resuelve el discount pero no la
  4.3 base · NO.
- **iOS Extensions per libro** · Today widget, Share extension ·
  limitación funcional · útil como add-on al main, no reemplaza · v1.5.

## Criterios para re-evaluar

Re-abrir esta ADR cuando:
1. Apple cambia la guideline 4.3 (probable nunca · es regla canon desde 2017)
2. Un libro alcanza >30% DAU exclusivo · justifica standalone real
3. B2B opportunity clara con pediatras / hospitales · justifica Mimo Pediatra
4. Embarazo arcoíris audiencia justifica app standalone post-pérdida sensible
5. App size pasa 200MB y bundle splitting no resuelve

## Fuentes research

- [Apple Guideline 4.3 Design: Spam](https://developer.apple.com/app-store/review/guidelines/#design)
- [Apple Developer Forums · 4.3(a) cases](https://developer.apple.com/forums/thread/810744)
- [App Clips · Apple Developer Documentation](https://developer.apple.com/app-clips/)
- Single App vs Multi-App Strategy · Medium 2024
- Mobiloud · App Clips alternativa nativa
