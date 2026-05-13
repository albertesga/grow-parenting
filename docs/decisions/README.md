# Architecture Decision Records · Grow

Decisiones canónicas del producto y del DS · cortas, evaluables por
agentes, resistentes a la rotación. Reemplaza prose en CLAUDE.md.

## Cómo añadir una ADR

1. Copia el template de `0000-template.md`.
2. Numera secuencialmente: `NNNN-titulo-kebab.md`.
3. Llena status, fecha, commit que la introduce.
4. Contexto + decisión + consecuencias + alternativas consideradas.
5. Status `Accepted` por defecto. Si se reemplaza, marcar `Superseded by ADR-NNNN` y crear la nueva.

## ¿Cuándo crear una ADR?

- Nuevo primitive en el DS (book-hero tone nuevo, chip variant, etc.)
- Cambio de canon (rename, restructure, anti-pattern documentado)
- Nuevo libro o tab con patrón diferente
- Decisión de scope o ámbito de un módulo

## ¿Cuándo NO crear una ADR?

- Bug fixes (commit message basta)
- Polish visual sin cambio de canon
- Copy tweaks
- Refactors internos del prototipo sin cambio de comportamiento

## Index

### Primitives DS
- [0001 · Book-hero canon (6 tonos)](0001-book-hero-canon.md)
- [0002 · Navbar dedicado por libro](0002-navbar-dedicado-por-libro.md)
- [0003 · Chip primitive DS §E](0003-chip-primitive-DS.md)
- [0007 · Diary timeline vertical primitive](0007-diary-timeline-vertical.md)
- [0012 · Action CTAs card-style](0012-action-ctas-card-style.md)
- [0013 · Post primitives (gallery + page) DS §Q](0013-post-primitives.md)

### Arquitectura de módulos
- [0004 · Bottom nav · Perfil reemplaza Hitos](0004-bottom-nav-perfil.md)
- [0005 · Chat IA · single-thread + Modo 3AM efímero](0005-chat-ia-modo-3am.md)
- [0006 · Sub-libros · librería anidada bajo libro padre](0006-sub-libros-pattern.md)
- [0008 · Pantalla Perfil · identidad + config global](0008-pantalla-perfil.md)
- [0009 · Libro de Salud · expediente clínico + Modo emergencia](0009-libro-salud-emergencia.md)
- [0010 · Log filter por source](0010-log-filter-por-source.md)

### Tono y producto
- [0011 · Trauma-informed copy canon](0011-trauma-informed-copy.md)

### Estrategia de distribución
- [0014 · App Store · single app + App Clips (no multi-app)](0014-app-store-distribucion.md)
