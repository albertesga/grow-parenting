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

- [0001 · Book-hero canon (6 tonos)](0001-book-hero-canon.md)
- [0002 · Navbar dedicado por libro](0002-navbar-dedicado-por-libro.md)
- [0003 · Chip primitive DS §E](0003-chip-primitive-DS.md)
- [0004 · Bottom nav Perfil en lugar de Hitos](0004-bottom-nav-perfil.md)
