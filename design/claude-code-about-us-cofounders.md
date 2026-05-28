# Brief Claude Code · nueva sección Cofounders en about-us

> Pegar este prompt entero a Claude Code. Asume que ya conoce el repo Grow, el DS v0.2, el canon Fase 0 y la arquitectura Next.js + Framer Motion + Tailwind del subproyecto `apps/about-us/`.

---

```
PROBLEMA

La página about-us (apps/about-us/) cierra hoy con NarrativeClosingSection,
que termina en "ayudar a otras familias a hacerlo de forma más presente,
segura y feliz" con underline mint en "oportunidad". El comentario del
propio componente (línea 26) dice literalmente:

  "NO incluye CTA ni cierre de producto · eso va en otro sitio (decisión user)."

Ese "otro sitio" no existe. La página termina sin acción y sin invitación.
Quiero crear esa última sección, ahora — el cierre real de la página, que:

1) Recoja el peso emocional del closing actual.
2) Convierta esa promesa en una invitación concreta: estamos buscando
   4-6 cofundadores para construir esto durante los próximos 3-6 meses
   de validación, con posibilidad de full-time en una segunda fase.
3) Liste los 6 perfiles que buscamos sin convertirse en una bolsa de
   trabajo corporate.
4) Cierre con un CTA real (email) y una frase emocional final.

CAMBIO

Crear nuevo componente:
  apps/about-us/components/CofoundersCallSection.tsx

Y montarlo en LandingPage.tsx DESPUÉS de NarrativeClosingSection
(será la sección 6 · cierre real de la página).

ESTRUCTURA DEL COMPONENTE (en orden de scroll)

1) Tag corto · alineado izquierda
   "BUSCAMOS · COFUNDADORES · MAYO 2026"
   (uppercase, letter-spaced, ink-soft o ink-faint según DS)

2) Título grande (font-grift, mismo nivel visual que las narrativas previas)
   "Buscamos 4-6 personas para construir esto con nosotros."
   Sin "cofundadores" en el título — la palabra ya está en el eyebrow.

3) Lead (2 párrafos cortos)
   "Estamos en una fase inicial de validación de 3-6 meses. Construiremos
   producto, hablaremos con usuarios reales, iteraremos rápido y
   descubriremos si aquí hay una compañía que merezca los próximos años
   de nuestra vida."

   "No buscamos freelances ni un side project. Buscamos a las personas
   con las que queremos fundar esto. Pacto de socios desde el principio,
   expectativas claras, equity definido."

4) Quiénes somos (mini-bloque, 2 columnas en desktop, stacked mobile)
   Dos cards mínimas, paper background, border-line sutil:

   PRODUCTO
   20+ años creando productos digitales desde cero. 10+ proyectos en
   compañías que han levantado 20M€+ en pre-seed/seed.

   BUILDER VELOCITY
   15+ años de software engineering en la base técnica actual. Prototipo
   vivo y capacidad de iterar rápido. La siguiente etapa pide un CTO
   cofundador que lidere de aquí en adelante.

5) Los 6 perfiles · grid de cards con tonal accent canon DS
   (sage / mint / blush / coral / gold / violet · uno por perfil)

   Cada card tiene:
   - Numeración 01 → 06 (opcional, refuerza estructura)
   - Tono accent en una franja superior o en el título
   - Role title (Inter o equivalente, bold)
   - 1 frase de qué hace en el proyecto
   - 4-6 bullets de skills clave (max — no listas de 10)
   - 1 línea "Suma puntos" opcional (para CTO + Designer)

   CARD 1 · gold · CTO cofundador
     "Lidera ingeniería y co-decide la dirección técnica."
     • 10+ años construyendo productos digitales desde cero
     • Full-stack, infra propia, datos
     • AI-native real (Cursor, Claude Code, evals, agentes)
     • Decisiones de arquitectura sin sobre-ingeniería en validación
     • Ganas de construir con las manos, no de managear todavía
     • Criterio de privacy / GDPR / datos sensibles
     Suma puntos · experiencia en salud digital, ex-fundador, scaling
     pequeño→mediano.

   CARD 2 · blush · Medical Advisor cofundador
     "Construye con nosotros la dimensión clínica del producto."
     • Formación en medicina, enfermería pediátrica, matronería,
       psicología perinatal o área afín
     • Revisa contenido, escalas y citas con criterio clínico
     • Hace llamadas reales con usuarios en validación
     • Entiende la línea entre "información" y "consejo médico"
     • Curiosidad por software que acompaña — sin sustituir — al SNS
     No queremos un asesor que firme un PDF. Queremos a alguien dentro
     del equipo fundador.

   CARD 3 · coral · GTM / Growth orgánico y guerrilla
     "Crece sin presupuesto en la primera fase."
     • Validación de canales desde cero
     • Contenido rápido, narrativa, comunidad
     • Growth creativo y experimentos baratos
     • Combina orgánico + community + cultura digital
     • AI-native, maker, rápido ejecutando
     • Orientado a validación real, no vanity metrics
     Más adelante abriremos paid + performance. Ahora toca orgánico.

   CARD 4 · violet · Senior Product Designer · Brand & Motion
     "Diseña producto, marca y motion."
     • Muy buen gusto visual y obsesión por detalle
     • Experiencias web/app modernas
     • Identidad visual + narrativa de marca
     • Motion skills
     • Research humano y sintético
     • Sensibilidad emocional y estética
     Idealmente · 10+ años, startups, sensibilidad por bienestar /
     familia / psicología / comportamiento humano.

   CARD 5 · mint · Junior Content & Research
     "Perfil curioso, AI-native, ganas de aprender rápido."
     • Interés por psicología, crianza o comportamiento humano
     • Investigación y síntesis
     • Buen gusto + sensibilidad por contenido
     • Herramientas IA fluido
     Ayuda en · research · entrevistas · contenido · benchmark ·
     prompts · tendencias · community · social.

   CARD 6 · sage · Junior Builder · Design + Dev
     "Perfil híbrido moderno, prototipado rápido."
     • Figma + Framer
     • Cursor / Claude / AI tools
     • Motion + web experiments
     Más importante velocidad, curiosidad y sensibilidad de producto
     que el CV.

6) Bloque "cómo trabajamos" · 3 columnas compactas (mobile stack)
   Sin cards. Solo titulares + 1 línea cada uno.

   SANO
   Sin política, sin egos, sin cultura tóxica de hustle.

   HONESTO
   Feedback directo, ownership real, iteración rápida.

   AMBICIOSO
   Construimos para impacto real, no para postureo startup.

7) Filtro mínimo · "esto no es para ti si"
   Una frase final, NO una lista:

   "Esto probablemente no encaja contigo si buscas freelance corto,
   estructura corporativa, rol ultra definido desde el día 1 o cobrar
   antes de validar."

8) Compromiso real · línea corta
   "Durante la fase de validación: mínimo 10h/semana, 1 reunión semanal
   de 1h, flexibilidad total, mayoritariamente async. En Barcelona o
   con intención real de estar aquí en una segunda fase."

9) CTA final
   - Título emocional (font-grift, grande):
     "Cuéntanos quién eres."
   - Subtítulo:
     "Escríbenos a hola@growbythechildlens.com con dos frases sobre ti
     y por qué te interesa esto. Te respondemos en menos de una semana."
   - Botón primario (mailto): "Escribir a hola@growbythechildlens.com"
   - Línea final, pequeña, ink-faint:
     "Sin formularios. Sin proceso. Solo una primera conversación honesta."

PATRÓN VISUAL · alineamiento con las narrativas previas

- bg-paper (mismo fondo que NarrativeClosingSection)
- font-grift para titulares grandes
- Sticky scroll NO obligatorio — esta sección puede ser scroll normal
  (no necesita el truco h-[220vh] de las narrativas). Justificación:
  las narrativas usan fill-on-scroll word-by-word para construir tensión
  emocional; esta sección informa y convoca, no necesita ese pattern.
- Animaciones de entrada · sí, pero sutiles. Sugerencia: Framer Motion
  whileInView con opacity 0→1 + y 24→0 por bloque, stagger 0.06s.
  Respetar prefers-reduced-motion (Framer ya lo hace nativo).
- Cards de perfil · paper background, border-line, border-radius
  grande (token DS rl, ~28px o equivalente), padding generoso.
  Tonal accent: una franja superior 3-4px del color tonal de cada
  perfil, o el role title pintado con ese tono. Sin abusar.
- Comportamiento de cards en hover · ligero translate-y(-2) +
  border más definido. Sin scale, sin shadow agresiva.
- El botón CTA mailto · primary canon (ink fill, paper text), pill
  (border-radius 999px), padding generoso. No usar full-width
  excepto en mobile.

CRITERIOS DE ACEPTACIÓN

- Componente nuevo en components/CofoundersCallSection.tsx,
  default export, sin props requeridas.
- Importado y montado en LandingPage.tsx DESPUÉS de
  NarrativeClosingSection, antes del cierre de <main>.
- Eliminar el comentario "NO incluye CTA ni cierre de producto..."
  de NarrativeClosingSection.tsx línea 26 — ya está resuelto en esta
  sección.
- Mobile (≤640px) · las 6 cards en columna única, stack vertical.
  Las 3 columnas de "cómo trabajamos" también stacked. Todo legible
  sin scroll horizontal.
- Tablet (640-1023px) · cards en 2 columnas.
- Desktop (≥1024px) · cards en 3 columnas (2 filas).
- prefers-reduced-motion · animaciones deshabilitadas (Framer
  default lo respeta).
- Tonal por card es DS canon (sage / mint / blush / coral / gold /
  violet). Reutilizar tokens existentes en globals.css o tailwind
  config — NO definir colores hex hardcoded en el componente.
- Build pasa sin warnings de TypeScript ni de Next (npm run build
  o pnpm build, según el lockfile del repo).
- Lighthouse accesibilidad ≥ 95 en la página completa tras añadir
  la sección.

NO HACER

- No usar la palabra "vacante" ni "puesto". Aquí buscamos
  cofundadores, no empleados.
- No prometer salario ni equity específico (X% o XK€) en el
  componente — eso va en la conversación uno-a-uno.
- No añadir contador de plazas ("solo 4 cofundadores restantes"),
  no countdown, no urgencia falsa. Mismo canon que el resto del
  producto.
- No incluir un formulario inline. El CTA es mailto. Si en el
  futuro quieres Tally / Notion form, va en un PR separado.
- No copiar emojis decorativos en titulares. El tono es serio-cálido,
  no playful.
- No usar "futuro papá" / "mami" / diminutivos forzados (canon Fase 0).
- No replicar la animación fill-on-scroll word-by-word de las
  narrativas previas. Esta sección informa, no construye tensión.
- No tocar las 4 secciones existentes (Intro, Emotional, Reveal,
  Closing) excepto para eliminar el comentario de la línea 26 de
  Closing.
- No introducir nuevas dependencias. Framer Motion + Tailwind +
  tokens DS existentes son suficientes.

COMMIT

feat(about-us): añadir CofoundersCallSection como cierre real de la página

   - Nuevo componente CofoundersCallSection.tsx con eyebrow,
     título, 6 perfiles en cards tonales, "cómo trabajamos",
     filtro mínimo y CTA mailto.
   - Montado en LandingPage.tsx después de NarrativeClosingSection.
   - Elimina el comentario "eso va en otro sitio" de
     NarrativeClosingSection línea 26 — ya resuelto.
   - Tonal canon DS por perfil (gold·CTO, blush·Medical,
     coral·GTM, violet·Designer, mint·Junior Content,
     sage·Junior Builder).
   - Sin animaciones fill-on-scroll (esta sección informa,
     no construye tensión emocional).
   - prefers-reduced-motion respetado.
```

---

## Notas para revisar antes de mergear

- **Email**: el prompt usa `hola@growbythechildlens.com`. Verificar si es el dominio canon real o si conviene cambiar a `equipo@`, `cofounders@`, etc. Es cambio de 1 string.
- **Tonal por perfil**: el mapping (gold·CTO / blush·Medical / coral·GTM / violet·Designer / mint·Junior Content / sage·Junior Builder) es propuesta — no canon establecido. Si tienes preferencia, reordena en el prompt antes de pegar.
- **Animaciones**: la decisión de **no** usar fill-on-scroll aquí es deliberada (las narrativas ya hacen ese trabajo emocional; esta sección informa y convoca). Si lo quieres aplicar, modifica la sección "PATRÓN VISUAL".

---

*Brief Cofounders Section · canon Fase 0 + DS v0.2 · mayo 2026*
