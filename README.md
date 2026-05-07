# grow

Prototipo HTML de **grow** — app de parenting con curvas de desarrollo OMS DS.

`prototype.html` es la única superficie ejecutable: un único archivo autocontenido que carga assets y fuentes desde `design/assets/`. Los archivos en `design/*.html` son documentos del sistema de diseño (foundations, primitives, components, flows, avatars vocab) y se abren independientemente.

## Estructura

```
.
├── prototype.html                          # prototipo principal (single-file app)
├── design/
│   ├── Grow Foundations v0.1.html          # tokens, color, tipografía
│   ├── Grow Foundations v0.1 (standalone-src).html
│   ├── Grow Foundations v0.1 (standalone).html
│   ├── Grow Primitives v0.1.html           # botones, inputs, nav
│   ├── Grow Product Components v0.1.html   # componentes de producto
│   ├── Grow Flows v0.1.html                # flujos
│   ├── Grow Avatars Vocab v0.1.html        # vocabulario de avatares
│   └── assets/
│       ├── avatar-{blush,coral,mint}.png
│       ├── grow-logo.png
│       ├── mood-{cansados,contentos,durmiendo}.png
│       └── fonts/
│           ├── Helvena-{Bold,Light,Medium,Regular,Semibold}.ttf
│           └── LeniaSans-{Bold,Italic,Light,Medium,MediumItalic,Regular}.ttf
├── .replit                                 # workflow Replit (opcional)
└── replit.nix
```

## Ejecutar localmente

`prototype.html` necesita un servidor HTTP (no funciona con `file://` por las fuentes locales). Desde la raíz del repo:

```sh
python3 -m http.server 5000
# luego abre http://localhost:5000/prototype.html
```

Los documentos del sistema de diseño:

```sh
# tras lanzar el servidor:
open http://localhost:5000/design/Grow%20Foundations%20v0.1.html
```

## Ejecutar en Replit

El repo conserva `.replit` y `replit.nix`. El workflow `Project` ejecuta `python3 -m http.server 5000` y expone el puerto 5000.

## Marca (resumen rápido)

- Color principal de marca: `#B6C5B2`
- Color principal de texto: `#3E3D34`
- Fondo preferente: blanco o crema `#FAF6EE`
- Logo: `design/assets/grow-logo.png`
- Avatares: blush, coral, mint (`design/assets/avatar-*.png`)
- Tipografías: Helvena (texto), LeniaSans (display/UI)
