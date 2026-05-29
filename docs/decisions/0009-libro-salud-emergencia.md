# ADR-0009 · Libro de Salud · expediente clínico + Modo emergencia

**Status:** Accepted
**Date:** 2026-05-13
**Commit:** `8b1a522` (PRD v0.1 completo)

## Context

PRD canon Fase 0 definió Libro de Salud como expediente clínico episódico paralelo al Libro de Vacunas pero para todo lo demás (fiebres · otitis · gastro · golpes · alergias · visitas · medicaciones · pruebas).

Necesidades canon:
- Digitalizar la "Cartilla de Salud Infantil AEPap DSI"
- Searchable: "¿cuándo fue la última otitis?"
- Carnet sanitario exportable (pediatra · cole · viaje)
- Detección de patrones (3 otitis en 6m → ORL)
- Acceso emergencia 1-tap sin desbloquear app
- Cross-ref con Vacunas (fiebre post-vacuna auto-import)

## Decision

**Screen `data-screen="salud"` · 4 tabs + FAB + screen separada `salud-emergencia`:**

| Tab | Contenido canon |
|---|---|
| Hoy | Sub-libro Cólicos card · Último episodio · Próxima visita · **Alerta patrón** · Sticky allergy banner · Quick actions |
| Historial | Filter chip-strip (5 tipos) + Búsqueda + Lista cronológica agrupada por mes |
| Carnet | 8 secciones DSI AEPap · CTAs Exportar PDF + Modo emergencia |
| Educación | 7 cards canon NICE · Cuándo llamar/urgencias/112 · Sub-libro Cólicos PURPLE |

**FAB Log central · 5 tipos:** 🌡 Episodio · 🩺 Visita · 💊 Medicación · 🐝 Alergia · 🧪 Prueba.

**Pattern detection IA · reglas v0:**
- `count(episodios.tipo='otitis' en últimos 180d) >= 3` → "puede valer la pena hablar con ORL"
- `count(episodios.tipo='fiebre' Y diagnóstico='viral inespecífico') >= 4` → "revisión general"
- `count(medicaciones.tipo='antibiótico' en últimos 180d) >= 3` → educación AEPED uso prudente
- `episodios.notas mencionan ≥ 2 veces "tras comer X"` → sugerir alergia bajo investigación

Tono: "puede valer la pena" no "tu hij@ tiene problema".

**Modo emergencia · screen `data-screen="salud-emergencia"` · full-screen:**
- Tipografía Lenia bold extra-grande · nombre 56px · tipo sangre 84px
- Alergias críticas con border coral 1.5px (no fill rojo · ADR-0011 anti-rojo médico)
- Contactos 1-tap (`<a href="tel:...">`) · 112 primero en coral
- PWA quick-action ready (acceso sin desbloquear app)
- Solo info marcada explícitamente como "visible en emergencia"

**Cross-ref canon:**
- Vacuna + fiebre tracker 72h → auto-crea episodio salud "Fiebre post-vacuna"
- Modo madrugada triage outcome `⚠ pediatra` → sugiere "guardar al libro de salud"
- Sub-libro Cólicos (ADR-0006) vive bajo Salud · entry destacado en Hoy

**Schema TS** documentado en PRD §11.1: `EpisodioSalud · VisitaPediatrica · Medicacion · AlergiaConfirmada · PruebaAnalisis · CarnetSanitario`.

## Consequences

- ✓ Reemplaza la cartilla de papel · canon institucional EU (DSI · NHS Red Book · Carnet de Santé)
- ✓ Pattern detection conservadora · "sugiere" no "diagnostica"
- ✓ Modo emergencia funcional sin red ni unlock
- ✓ Cross-ref bidireccional con Vacunas + Chat + Cólicos
- ⚠ MDR Class IIa compliance · sign-off legal pendiente antes v0 launch
- ⚠ Liability si pediatra usa info incompleta · disclaimer canon "no sustituye historia clínica oficial"

## Alternatives considered

- **Tab dentro del libro de Vacunas**: confunde naturaleza (vacunas = programado, salud = reactivo) · NO.
- **Diary entries con flag clínico**: pierde estructura searchable · NO.
- **Solo carnet sin historial**: pierde patrón detection · NO.
- **Modo emergencia como sheet**: requiere unlock · NO (canon emergencia = sin unlock).
