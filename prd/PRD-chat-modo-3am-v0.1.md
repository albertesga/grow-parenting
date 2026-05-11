# PRD · Chat IA + Modo 3AM
## Grow · v0.1 · canon Fase 0

> Producto: **Grow by The Child Lens** · Módulo: **Chat IA contextual con triage trees + Modo 3AM** · Categoría DS: cross-categoría (chat es transversal · triage trees pintan el color de su categoría · Modo 3AM = paleta dark dedicada).
> Status: ready for Claude Design + ingeniería · siguiendo `Grow Design System v0.2`.

---

## 0 · TL;DR

El **chat de Grow** es la conversación viva del producto · una sola hebra continua donde la IA acompaña a la familia con citas clínicas siempre con fuente y año, contexto pre-cargado del peque (edad, módulos activos, modo arcoíris/preemie/3AM), y **8 chips de cribaje rápido** que disparan árboles de triage validados clínicamente (NICE, AAP, NSBSP).

El **Modo 3AM** es un sub-modo del chat que se activa siempre en `dark` (22:00-06:00 default · opt-in/out), abre **un thread efímero independiente** del chat principal, y arranca con el mensaje canon:

> *"Este es un modo urgencia. Las respuestas son más rápidas, más directas y sin juzgar."*

Tras esa apertura presenta **3 opciones edad-aware** (embarazo · 0-3 m · 3-12 m · 12-36 m), cada una conectada a un flujo específico (triage tree · ruta cólicos · ruta urgencias · ruta apoyo emocional).

**Por qué importa**: el chat es la diferencia entre "una app más" y "una doula bilingüe que no se cansa". El Modo 3AM es la diferencia entre llamar a urgencias por miedo y resolver con calma a las 4 a.m.

---

## 1 · Contexto y problema

### 1.1 Realidad del cuidado nocturno

| Hecho | Fuente |
| --- | --- |
| 80 % de las crisis emocionales parentales ocurren entre 22:00 y 06:00 | Postpartum Support International 2022 |
| Madres/padres consultan Internet de madrugada en lugar de pediatra | encuestas BabyCenter / What to Expect |
| Cólicos, fiebre y llanto inconsolable son los 3 motivos top de búsqueda 22:00-04:00 | Google Trends pediátrico ES 2024 |
| 40 % de visitas a urgencias pediátricas son innecesarias clínicamente | NHS England 2023 · ED audit |
| 1 de cada 3 madres tiene pensamientos intrusivos de daño 0-12 m | Kendall-Tackett 2017 |
| Pediatra de guardia tarda 15-45 min en responder en horario nocturno | sistemas sanitarios EU promedio |

### 1.2 Pain del cuidador/a

| Pain | Cuándo | Driver |
| --- | --- | --- |
| "¿Es grave o es normal?" | Cualquier hora · pico nocturno | Falta marco clínico claro |
| "No quiero molestar al pediatra" | Siempre | Culpa parental + cultura "no exagerar" |
| "No me atrevo a llamar a 112" | Madrugada | Miedo a hacer el ridículo |
| "Mi pareja duerme · estoy sola" | 02:00-05:00 | Aislamiento cuidador/a primario |
| "Tengo miedo de hacerle daño" | Privación sueño extrema | Pico de ansiedad SBS |
| "Necesito hablar con alguien YA" | Crisis emocional | Salud mental sin acceso |

### 1.3 Lo que Grow resuelve

- **Marco clínico evidence-based** activado en 2 taps · canon NICE/AAP/NSBSP.
- **Tono trauma-informed** · ni alarmismo ni minimización.
- **Disponibilidad 24/7** sin "te respondo mañana".
- **Escalada inteligente** a urgencias o salud mental si hay signos canon.
- **Sin culpabilizar** la consulta nocturna · *"este es el modo urgencia, las respuestas son más rápidas"*.
- **Acompañamiento emocional** sin diagnosticar.
- **Memoria persistente** del journey del peque (edad, módulos activos, eventos recientes).

---

## 2 · Usuarios y casos de uso

### 2.1 Persona primaria

**María · 34 a · Lola 7 sem · 03:42 a.m.**
Lola lleva 1 h 20 min llorando. María durmió 2 h. Pablo trabaja mañana y duerme. María googleó "fiebre 38° bebé recién nacido cuándo urgencias" y encontró 14 resultados contradictorios. Abre Grow en modo 3AM.

### 2.2 Personas secundarias

- **Pablo · co-cuidador/a no gestante**: usa el chat principal de día para entender qué pasa con el peque y para coordinar con María.
- **Carmen · monoparental**: usa Modo 3AM como único interlocutor a las 4 a.m.
- **Lucía · embarazo arcoíris previo**: usa el chat para ansiedad anticipatoria · jamás en tono celebratorio.
- **Familia adoptiva o subrogada**: lactancia no aplica · todo lo demás sí · canon ajustado.

### 2.3 Casos de uso

| ID | Caso | Surface |
| --- | --- | --- |
| UC-1 | Pregunta clínica diurna ("¿es normal que babee así?") | Chat principal |
| UC-2 | Triage rápido de fiebre nocturna | Modo 3AM ruta 2 |
| UC-3 | Cólicos a las 22:00 · ruta cuidado | Modo 3AM ruta 1 |
| UC-4 | Llanto inconsolable madrugada · cuidador/a al límite | Modo 3AM ruta 3 |
| UC-5 | Pesadilla toddler · necesita pista | Modo 3AM ruta 1 toddler |
| UC-6 | Embarazo · síntoma raro 02:00 a.m. | Modo 3AM ruta embarazo |
| UC-7 | Discusión con pareja sobre crianza · necesita 2nd opinion | Chat principal |
| UC-8 | Cribado canon (EPDS, M-CHAT-R) inducido por chat | Chat principal con tool |
| UC-9 | Recordar dosis paracetamol pediátrica | Chat principal con calculadora |
| UC-10 | Sospecha urgencia real · escalada 112 | Modo 3AM ruta 2 alarma |

---

## 3 · Outcomes y KPIs

### 3.1 Outcomes esperados a 6 m

| Outcome | Métrica | Target v0 |
| --- | --- | --- |
| Reducción visitas urgencias innecesarias | Self-report "consulté Grow en lugar de urgencias y resolví" | ≥ 30 % usuarios mensuales |
| Reducción ansiedad nocturna | EPDS/PBA-5 pre/post · diff | -1.5 puntos vs cohorte sin chat |
| Confianza en marco clínico | Encuesta NPS clínico chat | ≥ 50 NPS |
| Apertura conversación emocional | % usuari@s que activan ruta 3 Modo 3AM al menos 1 vez | ≥ 15 % |
| Adherencia a citas pediatra | Conversión "te recomendamos llamar" → llamada real | ≥ 70 % |

### 3.2 KPIs operativos

- Latencia primera respuesta chat principal · objetivo p50 ≤ 1.5 s · p95 ≤ 4 s.
- Latencia primera respuesta Modo 3AM · objetivo p50 ≤ 0.8 s · p95 ≤ 2 s (Haiku 4.5).
- Mensajes/usuari@/sem.
- % conversaciones con cita clínica fuente+año.
- % triage trees completados.
- % escaladas a urgencias 112 reales en triage.
- Time-to-resolution mediano por ruta 3AM.

---

## 4 · Scope

### 4.1 In scope · v0 (MVP · 6 m)

- **Chat principal** único · una hebra continua por peque.
- **Modo 3AM** como sub-modo (no app aparte) · thread efímero · 3 opciones edad-aware.
- **8 chips de cribaje rápido** con triage trees validados.
- **Contexto pre-cargado** (edad peque, módulos activos, eventos 7 d, modos especiales).
- **Citas clínicas** siempre con fuente y año · validadas en knowledge base curada.
- **Disclaimer canon Fase 0** "Aquí no diagnosticamos. Aquí estamos." sticky.
- **Escalada a urgencias** 112 / 911 / 999 auto-detect país · botón llamar 1-tap.
- **Escalada salud mental** ruta dedicada con números locales.
- **Multi-perfil**: chat por peque + chat sin peque (embarazo · sin hijos aún).
- **Co-cuidador/a sync**: el chat es por cuenta · cada cuidador/a ve la conversación con su peque (no con la pareja).
- **Idiomas v0**: ES (España) + EN (paralelo).

### 4.2 Out of scope · v0

- Chat con otro humano (lactanciera · pediatra) → v2 partnership.
- Voice input/output → v1.5.
- Búsqueda dentro del chat histórico → v1.5.
- Threads múltiples / canales → fuera de canon (un chat único).
- Compartir mensajes externamente → v1.5.
- Generación de imágenes en chat → fuera de scope.

### 4.3 v1.5 (post-validación · 6-12 m)

- Voice mode (input + output dictado · accesibilidad).
- Búsqueda histórico chat ("¿cuándo te dije X?").
- Multi-idioma chat (catalán · francés · alemán).
- Personalización del estilo de respuesta (más breve · más largo · con fuentes ampliadas).
- Compartir respuesta con pediatra (export PDF).

### 4.4 v2 (escala)

- Telesalud humana integrada (lactanciera DKV · pediatra de guardia).
- Group chat familia (varios cuidadores/as alrededor del mismo peque).
- Voice analysis del cuidador/a (detectar agotamiento · burnout pre-clínico).

---

## 5 · Research clínico canon

### 5.1 Marcos de triage adoptados

| Marco | Para qué | Fuente |
| --- | --- | --- |
| **NICE NG143** Fever in under 5s · traffic light system | Triage fiebre por edad y signos | NICE 2021 |
| **NICE NG9** Bronchiolitis | Triage respiratorio | NICE 2021 |
| **NICE NG232** Head injury | Triage golpe cabeza | NICE 2023 |
| **NICE NG217** Epilepsies | Triage convulsión | NICE vigente |
| **NICE CG84** Diarrhoea & vomiting in under 5s | Triage GI · deshidratación | NICE vigente |
| **PECARN rule** | Decisión TC en lesión cabeza pediátrica | Kuppermann 2009 |
| **AAP Febrile seizures** | Convulsión febril simple vs compleja | AAP 2008 |
| **PAT · Pediatric Assessment Triangle** | Apariencia · trabajo respiratorio · circulación | APLS · EPALS |
| **Wessel rule of threes** | Diagnóstico cólico clásico | Wessel 1954 + Roma IV 2016 |
| **NSBSP PURPLE Crying** | Educación normalizadora + safety frame | NSBSP / dontshake.org |
| **EPDS** Edinburgh Postnatal Depression Scale | Cribado depresión peri/postnatal | Cox 1987 + validación ES |
| **M-CHAT-R** | Cribado autismo 18 + 24 m | Robins 2014 |
| **PBA-5** Parental Burnout Assessment | Burnout parental Spanish-validated | Aguiar 2021 |

### 5.2 Marcos editoriales / tono

| Marco | Adopción |
| --- | --- |
| **Trauma-informed care** (SAMHSA) | Canon en cada respuesta |
| **Motivational Interviewing** | Estilo de preguntas en triage emocional |
| **Plain Language Movement** (CDC Plain Language) | Lenguaje sin jerga |
| **WHO Communicating Risk** | Comunicación incertidumbre clínica |

### 5.3 Lo que NO copiamos

- Symptom checkers tipo Babylon / K Health / Ada · son **diagnostic-style** y eso choca con canon Fase 0 "Aquí no diagnosticamos".
- Tono celebratorio de What to Expect.
- Gamification de Headspace.
- Voice "de IA Pixar amigable".

---

## 6 · Arquitectura del chat

### 6.1 Modelo de threads

**Decisión**: chat **monothread por peque** · NO subthreads.

Razón: una madre/padre con privación de sueño no maneja organización conversacional. Una sola hebra continua reduce carga cognitiva y fomenta continuidad terapéutica con la IA.

```
ChatPeque (monothread persistente)
├── Mensajes ordenados por timestamp
├── Contexto pre-cargado en cada mensaje IA
├── Citas clínicas inline con fuente
├── Tool calls visibles (calculadora paracetamol, EPDS, etc.)
└── Markers de eventos (hito conquistado, vacuna, EPDS hecho)

Modo3AMThread (efímero, paralelo, NO contamina chatpeque)
├── Se abre solo entre 22:00-06:00 (opt-in/out por usuario)
├── Mensaje canon de apertura
├── 3 opciones edad-aware
├── Rutas con timeline acelerado
├── Si se cierra · se ofrece "guardar resumen al chat principal" o "borrar"
└── Si se borra · queda solo agregado anonimizado en métricas
```

### 6.2 Bottom nav y entry points

```
Bottom nav canon · Hoy · Calendario · ⊕ · Chat · Yo
                                          │
                                          ├── Chat principal (default)
                                          └── Modo 3AM (auto si dentro 22-06h
                                              + opt-in al menos 1 vez · banner
                                              switch siempre visible)

Entry adicionales al Modo 3AM:
- Card "🌙 No estás sola" en Hoy 22:00-06:00
- Notification "¿necesitas hablar?" si epis cólicos > 30 min
- Quick log ⊕ → "Algo va mal" → ofrece Modo 3AM
```

### 6.3 Estados del chat

```
Chat principal
├── Idle (sin mensajes nuevos · paper background)
├── Conversando (live · IA escribiendo · indicador 3 puntos animados)
├── Esperando input usuario
├── Tool en ejecución (calc paracetamol corriendo · skeleton)
├── Cita clínica embebida (block paper-soft + fuente + año)
└── Escalada activa (banner persistente · llamar 112 · borde 2px ink)

Modo 3AM
├── Pre-apertura (opt-in primera vez)
├── Apertura canon (mensaje fijo)
├── Selección de 3 opciones (chips grandes dark)
├── Triage tree en curso
├── Resolución (resumen + opción guardar al chat principal)
└── Salida (vuelve al chat principal con sticky note "Anoche 3AM · resuelto")
```

### 6.4 Selección de modelo IA

| Surface | Modelo | Razón |
| --- | --- | --- |
| Chat principal · respuestas largas · cribados | **Claude Sonnet 4.6** | Calidad · matiz · trauma-informed |
| Modo 3AM · triage rápido | **Claude Haiku 4.5** | Latencia · directo |
| Tool calling (calc dosis · EPDS · M-CHAT-R) | **Claude Haiku 4.5** | Coste + latencia |
| Resumen al cerrar chat · etiquetas | **Claude Haiku 4.5** | Background |

---

## 7 · Funcionalidades core

### 7.1 Chat principal

**Composición**:
- Header sticky con nombre peque + edad + modo activo (arcoíris/preemie/normal).
- Stream conversacional vertical · burbujas IA paper-soft + usuari@ ink filled.
- **Disclaimer footer sticky**: *"Aquí no diagnosticamos. Aquí estamos."*
- **8 chips de cribaje** justo encima del input · scroll horizontal.
- Input con autocomplete sugerido (top 5 preguntas frecuentes para esa edad).
- Tool calls embebidos visualmente (calculadoras · gráficos · cribados).

**Reglas canon de respuesta**:
- Máximo 4 párrafos por respuesta.
- Si > 4 párrafos · ofrecer "¿quieres que te lo cuente más despacio?".
- Cita clínica con formato `— [Fuente] · [Año]`.
- Lenguaje sin jerga · si término técnico, definir entre paréntesis.
- Cero exclamaciones celebratorias.
- Cero diminutivos forzados.
- Cero religiosidad.

### 7.2 Modo 3AM · 3 opciones edad-aware

**Mensaje canon de apertura** (siempre, sin variación):
> *"Este es un modo urgencia. Las respuestas son más rápidas, más directas y sin juzgar."*

**3 opciones por edad del peque**:

| Etapa | Opción 1 | Opción 2 | Opción 3 |
| --- | --- | --- | --- |
| **Embarazo** | "Algo no va bien con mi cuerpo" | "Tengo miedo · necesito hablar" | "No puedo dormir" |
| **0-3 m** (recién nacido) | "No para de llorar" | "Le pasa algo a mi peque" | "No puedo más" |
| **3-12 m** (bebé) | "No duerme · y yo tampoco" | "Le pasa algo a mi peque" | "Solo necesito acompañar" |
| **12-36 m** (toddler) | "Pesadilla nocturna" | "Le pasa algo a mi peque" | "No puedo más" |

Cada opción es un **chip grande** (h ≥ 64 px · ancho 100 % · radius 12) con icono dark + label Lenia medium + sub-label Helvena 12 px caption.

**Lógica de cada opción**:

```
EMBARAZO
├── Opción 1 · "Algo no va bien con mi cuerpo"
│   └── Triage embarazo (sangrado · dolor · contracciones · movs ↓)
│       → si signos preeclampsia/parto prematuro → 🚨 urgencias
│
├── Opción 2 · "Tengo miedo · necesito hablar"
│   └── Acompañamiento emocional · EPDS antenatal opcional
│       → si EPDS ≥ 13 o ideación → ruta salud mental con teléfono local
│
└── Opción 3 · "No puedo dormir"
    └── Educación insomnio embarazo + ejercicios respiración + cuándo es preocupante

0-3 MESES
├── Opción 1 · "No para de llorar"
│   ├── Pre-check: ¿tiene fiebre? → si <3m + cualquier Tª ≥ 38 → 🚨 urgencias
│   ├── Triage cólicos (Wessel · 5 S's · cry classifier)
│   └── Cross-ref Libro de Cólicos (si activo)
│
├── Opción 2 · "Le pasa algo a mi peque"
│   └── 8 chips de cribaje rápido (fiebre · respiratorio · vómitos · etc.)
│
└── Opción 3 · "No puedo más"
    ├── Safety frame anti-shaken-baby (NSBSP 4 pasos · canon)
    ├── EPDS rápido si signos
    └── Ruta salud mental + teléfono crisis local

3-12 MESES
├── Opción 1 · "No duerme · y yo tampoco"
│   └── Triage sueño (regresión 4m/8m · ventanas Huckleberry · cross-ref Sueño)
│
├── Opción 2 · "Le pasa algo a mi peque"
│   └── 8 chips de cribaje rápido
│
└── Opción 3 · "Solo necesito acompañar"
    └── Acompañamiento emocional sin acción · validación · "estoy aquí"

12-36 MESES
├── Opción 1 · "Pesadilla nocturna"
│   └── Educación pesadillas vs terrores nocturnos + estrategias
│
├── Opción 2 · "Le pasa algo a mi peque"
│   └── 8 chips de cribaje rápido (toddler-adapted)
│
└── Opción 3 · "No puedo más"
    └── Safety frame + ruta salud mental + relevo
```

### 7.3 Triage trees · 8 árboles canon

Disponibles desde:
- Chips persistentes encima del input del chat principal.
- Modo 3AM ruta 2 "Le pasa algo a mi peque".
- Quick log ⊕ → contexto.

**Los 8 árboles** (con detalle clínico ya documentado en respuesta canon previa):

1. **🌡 Fiebre** · NICE NG143 traffic light system.
2. **😮‍💨 Dificultad respiratoria · bronquiolitis** · NICE NG9.
3. **😢 Llanto inconsolable** · Wessel + NSBSP + criterios alarma.
4. **🤮 Vómitos / deshidratación** · NICE CG84 + ESPGHAN.
5. **💩 Diarrea** · NICE CG84.
6. **💢 Lesión cabeza** · NICE NG232 + PECARN rule.
7. **🫧 Erupción / rash** · NICE meningitis CG102 + AAD eczema.
8. **⚡ Convulsión** · NICE NG217 + AAP febrile 2008.

Cada árbol = mini-encuesta de 2-4 preguntas · output `🚨 / ⚠ / 🟢` + acción concreta + fuente.

### 7.4 Tool calling

| Tool | Cuándo se llama | Output |
| --- | --- | --- |
| `dose_calculator` | "¿cuánto paracetamol le doy?" | Calculadora por peso · canon AEPED 10-15 mg/kg |
| `vaccine_lookup` | "¿qué vacuna toca a 4 m?" | Lista AEPED 2026 |
| `epds_screening` | "¿cómo te has sentido esta semana?" + criterios | Score + recomendación |
| `mchat_screening` | "¿le hacemos el cribado de los 18 m?" | Cuestionario + score |
| `growth_lookup` | "¿está bien Lola en peso?" | Curva OMS · percentil actual |
| `milestone_lookup` | "¿cuándo debería caminar?" | Rango Haizea-Llevant + canon activo |
| `library_open` | "¿qué hago si llora 1 h?" | Abre Libro de Cólicos |
| `urgent_call` | Triage devuelve `🚨` | Llamar 112 / 911 / 999 con 1 tap |
| `relay_partner` | Modo 3AM ruta 3 si pareja en cuenta | Push síncrono al co-cuidador/a |

### 7.5 Contexto pre-cargado en cada mensaje IA

**System prompt** dinámico que incluye:

```
[Contexto del peque]
- Nombre: Lola
- Edad: 18 meses (cronológica) · 18 meses (corregida)
- Sexo: F
- Modos: ninguno especial
- Lactancia: destete progresivo · biberón fórmula 1×/día
- Vacunas al día: ✓ canon AEPED 2026
- Última cita pediatra: 12 jun 2027 · revisión 18m
- Últimos eventos 7 d:
  - Vacuna 4ª hexavalente · 12 jun · sin reacciones
  - 2 episodios llanto > 30 min · 14 jun y 16 jun
  - EPDS materna 14 jun: score 6 (sin alerta)
  - Hito "marcha autónoma" marcado conquistado

[Contexto cuidador/a]
- Quien escribe: María (madre · cuenta principal)
- Co-cuidador/a en cuenta: Pablo (pareja · sync activo)
- Idioma preferido: es-ES
- Hora local: Madrid CET · 03:42 (Modo 3AM activo)

[Modos especiales]
- Modo arcoíris: NO
- Modo preemie: NO
- Modo monoparental: NO

[Canon clínico]
- País: España
- Esquema vacunal: AEPED 2026
- Canon hitos: Haizea-Llevant + AEP
- Curvas: OMS LMS

[Reglas trauma-informed canon Fase 0]
- Aquí no diagnosticamos. Acompañamos.
- Sin alarmismo. Sin minimización.
- Cita clínica siempre con fuente + año.
- Sin diminutivos forzados, sin religiosidad, sin militancia.
- Co-cuidador/a sin género forzado.
```

### 7.6 Citas clínicas embebidas

Cada respuesta clínica de la IA cita su fuente. Formato canónico:

> *"La fiebre por debajo de 38.5 °C en bebés mayores de 3 meses con buen aspecto general no necesita tratamiento. Solo paracetamol si Lola está incómoda."*
>
> — *NICE NG143 · 2021* · *CAV-AEP 2026*

Las citas se renderizan como tag pill `paper-soft` con fuente + año · tap abre detalle de la guía.

### 7.7 Disclaimer + escalada

**Disclaimer canon footer sticky** (siempre visible en el chat):

> *"Aquí no diagnosticamos. Aquí estamos. Si dudas, llama a tu pediatra."*

**Escalada urgente** (si triage devuelve `🚨`):

- Banner full-width borde 2 px ink (NO rojo) con tag `[!] URGENCIA`.
- Botón primario: `Llamar al 112` (auto-detect país).
- Botón secundario: `Avisar Pablo` (si co-cuidador/a en cuenta).
- Mensaje: *"Esto necesita atención médica ahora. Si quieres, me quedo contigo mientras llaman."*

**Escalada salud mental** (si Modo 3AM ruta 3 + EPDS positivo o ideación):

- Banner cat-bienestar-tint borde ink 1.5 px.
- Botón primario: `Llamar a la línea de ayuda · [número local]`.
- España · 024 · línea atención conducta suicida.
- Mensaje: *"No estás sola. Hay personas entrenadas para escucharte ahora mismo."*

---

## 8 · Especificaciones por pantalla

### 8.1 Convenciones DS aplicadas

- Frame mobile-first 360 px · radius 22 · borde `var(--ink)`.
- Tipografía: títulos **Lenia** medium 18-22 · body **Helvena** regular 14-15.
- Burbujas IA: `paper-soft` background · ink texto · radius 14 · max 85 % width.
- Burbujas usuari@: `ink` background · paper texto · radius 14 · alineadas derecha.
- Modo 3AM: `night` background `#1A1D24` · `night-fg` `#E8E6DF` texto · sin sombras.
- Cero color brand fuerte en burbujas default.
- 1 sola CTA primaria por mensaje IA.

### 8.2 Frame A · Chat principal · vista por defecto

**Composición vertical**:
1. **Nav bar**: `← Chat · Lola` + meta sub *"18 meses · canon Haizea"*.
2. **Stream mensajes** (paper bg · scroll vertical reverse-chrono).
3. **Citas clínicas embebidas** como tag pill `paper-soft` con fuente + año.
4. **Tool calls embebidos** (calculadora paracetamol · gráfico curva · etc.) como cards con borde fino.
5. **Sticky footer 1**: 8 chips de cribaje rápido scroll horizontal.
6. **Sticky footer 2**: Input con `+ adjuntar foto` y `🎙 voz` (v1.5).
7. **Sticky footer 3**: Disclaimer `Aquí no diagnosticamos. Aquí estamos.`
8. **Bottom nav canon**.

### 8.3 Frame B · Modo 3AM · apertura

**Composición**:
1. Background `night` `#1A1D24`.
2. **Header**: solo texto `🌙 Modo urgencia · 03:42` · Lenia medium 14 px.
3. **Mensaje canon central** (Lenia medium 24 px · `night-fg`):
   > *"Este es un modo urgencia."*
   > *"Las respuestas son más rápidas, más directas y sin juzgar."*
4. **3 opciones · chips grandes verticales** (h 76 · paper-soft sobre night · radius 16):
   - Cada chip: icon (24 px) + label Lenia medium 17 + sub-label Helvena 12 caption.
5. **Footer**: link discreto *"volver al chat normal"* · 11 px ink-faint.

### 8.4 Frame C · Modo 3AM · ruta "Le pasa algo" (cribaje)

**Composición**:
1. Header `← 🌙 Modo urgencia · Lola 18m`.
2. **Mensaje IA** (paper-soft sobre night):
   > *"Vamos por orden. ¿Qué le pasa?"*
3. **8 chips cribaje** apilados verticalmente · ancho 100 % · radius 12.
4. Tap en uno → abre triage tree de 2-4 preguntas.
5. Output del triage como banner full-width:
   - 🚨 urgencia: borde 2 px `night-fg` + botón `Llamar 112` + cita clínica.
   - ⚠ atención: borde 1.5 px + botón `Hablar con pediatra mañana`.
   - 🟢 normal: borde dashed + sugerencia + cita.
6. Footer: chip `Llevarme esto al chat principal cuando me despierte`.

### 8.5 Frame D · Modo 3AM · ruta "No puedo más"

**Composición trauma-informed canon**:
1. Header `← 🌙 Estamos aquí · 03:42`.
2. **Mensaje IA grande** (paper-soft sobre night · padding generoso):
   > *"Lo que sientes es real. No es debilidad. No estás sola."*
3. **Card · Safety frame anti-shaken-baby NSBSP**:
   - 4 pasos numerados Lenia medium 16 · `night-fg`.
   - Mensaje cierre Lenia italic *"Nunca sacudas al bebé. Ni siquiera 1 segundo."*
4. **Card · Avisar Pablo** (si co-cuidador/a en cuenta):
   - Botón primario: `Avisar a Pablo ahora` · sub *"Le diremos que necesitas relevo"*.
5. **Card · Salud mental** (escalada):
   - Botón primario: `Llamar línea ayuda · 024` (España auto-detect).
   - Sub: *"Es gratis. Es 24h. No registran. Solo escuchan."*
6. **Card · EPDS rápido** (si no hecho en > 4 sem):
   - 5 preguntas validadas.
   - Si score ≥ 13 o ideación → escalada salud mental obligatoria.

### 8.6 Frame E · Cierre Modo 3AM

**Composición**:
1. Cuando el usuari@ termina un flujo o pulsa `cerrar`.
2. **Mensaje IA** (paper-soft):
   > *"¿Lo guardamos al chat principal para mañana? Solo lo verás tú."*
3. **3 opciones**:
   - `Sí · guardar resumen` (canon · entra al chat principal con sticky note "Anoche 3AM · [tema]").
   - `No · borrar todo` (thread efímero se elimina · solo queda agregado anonimizado para métricas).
   - `Quedarme en 3AM` (sigue conversando).

### 8.7 Frame F · Triage tree ejemplo (Fiebre)

**Composición** (aplica a los 8 árboles · este es el patrón):
1. Header `← Fiebre · Lola 18m`.
2. **Pregunta 1** (Lenia medium 18):
   > *"¿Cuál es la temperatura ahora?"*
3. **Input numérico** + sub-label *"axilar · °C"*.
4. **Pregunta 2** condicional según output anterior.
5. **Pregunta 3** condicional.
6. **Resultado · banner full-width**:
   - 🚨 / ⚠ / 🟢 con icon + tag textual + acción.
   - Cita clínica: `— NICE NG143 · 2021`.
7. **Botones acción**:
   - Si 🚨 → `Llamar 112` primario.
   - Si ⚠ → `Programar cita mañana` primario · `Hablar con chat IA` secundario.
   - Si 🟢 → `Volver a dormir` primario · `Anotar en diario` secundario.

---

## 9 · Lógica IA · system prompts · RAG

### 9.1 Stack técnico

```
Front
├── Next.js 15 (canon Grow)
├── Tailwind + shadcn/ui (DS v0.2)
└── Web Streams API (streaming responses)

Back
├── Next.js API routes
├── Anthropic Claude API
│   ├── Sonnet 4.6 → chat principal
│   └── Haiku 4.5 → 3AM + tools
├── RAG · pgvector + Supabase
│   └── Knowledge base curada (NICE · AAP · AEPED · NSBSP · etc.)
├── Tool calling vía Anthropic native tools
└── Persistence · Supabase Postgres
```

### 9.2 System prompt canon (chat principal)

```
You are Grow's clinical companion. Behave like a doula or a senior 
maternal-child nurse: warm, professional, calm, never alarmist, 
never minimizing.

NEVER diagnose. ALWAYS cite sources with year (e.g., "NICE NG143 · 2021").
NEVER use celebratory exclamations. NEVER use diminutives like "bebito".
NEVER use religious language. Cero militancia pro/anti anything.

Spanish first (es-ES). Respond in user's language. 
For Spanish, never assume "papá" if co-caregiver gender is unknown.

Response format:
- Max 4 paragraphs.
- Plain language, no jargon (define if technical term used).
- Cite sources at end of clinical claims.
- Offer 1 clear next step.
- If urgency signs present → trigger urgent_call tool.

Trauma-informed:
- Validate feelings first.
- Offer information second.
- Suggest action third.
- Never "don't worry", never "tu peque está bien".

Use the user context provided in [Contexto del peque] dynamically.

If user mentions self-harm or harm to baby → IMMEDIATELY trigger 
mental_health_escalation tool. Do not ask follow-up clarification.
```

### 9.3 System prompt Modo 3AM (delta sobre el principal)

```
You are now in 3AM mode. The user is likely:
- Sleep deprived
- Anxious or scared
- Alone

Adjust:
- Shorter sentences (max 15 words).
- One question at a time.
- Validate first ("Tiene sentido que estés asustada.").
- Action immediately if urgency.
- If user says "no puedo más" or similar → safety frame + 
  partner relay + mental health escalation.

NEVER joke. NEVER lecture. NEVER minimize.

Default opening: 
"Este es un modo urgencia. Las respuestas son más rápidas, 
más directas y sin juzgar."
```

### 9.4 RAG · knowledge base curada

| Source | Coverage | Update freq |
| --- | --- | --- |
| NICE guidelines pediatric (NG143, NG9, NG232, NG217, CG84, CG102) | Triage clínico | Anual |
| AAP red flags + Bright Futures | Hitos · cribados USA | Anual |
| CAV-AEP 2026 | Vacunas España | Anual (calendario sale ene) |
| AEPap programa salud infantil | Revisiones niño sano | Anual |
| Haizea-Llevant | 97 hitos | Estable (canon validado) |
| NSBSP PURPLE Crying | Educación cólicos | Estable |
| WHO Multicentre Growth | Curvas LMS | Estable |
| EPDS · M-CHAT-R · ASQ-3 · PBA-5 | Cribados validados | Estable |
| Cochrane reviews (lactancia · cólicos · sueño) | Evidencia base | Trimestral |
| Wessel + Roma IV | Cólicos | Estable |
| ESPGHAN/ESPID | GI pediátrico | Anual |

Embeddings: `voyage-3-large` (mejor que ada-002 para clínico).
Re-ranker: Cohere rerank-english-v3 + rerank-multilingual.
Chunking: por sección + tabla preservada.

### 9.5 Tools registradas

```typescript
const tools = [
  {
    name: "dose_calculator",
    description: "Calcula dosis paracetamol/ibuprofeno por peso",
    input_schema: { weight_kg: "number", drug: "paracetamol|ibuprofeno", age_months: "number" }
  },
  {
    name: "epds_screening",
    description: "Inicia cribado EPDS de 10 preguntas",
    input_schema: { trigger: "user_request|weekly|6m_postpartum" }
  },
  {
    name: "mchat_screening",
    description: "Inicia cribado M-CHAT-R 18m o 24m",
    input_schema: { age_months: "number" }
  },
  {
    name: "growth_lookup",
    description: "Devuelve percentil actual peso/talla/PC",
    input_schema: { metric: "weight|height|head", baby_id: "uuid" }
  },
  {
    name: "milestone_lookup",
    description: "Busca rango canon Haizea/AAP/WHO/CDC para hito",
    input_schema: { milestone: "string", canon: "haizea|aap|who|cdc" }
  },
  {
    name: "library_open",
    description: "Abre módulo: vacunas, cólicos, sueño, alimentación, lactancia",
    input_schema: { module: "string" }
  },
  {
    name: "urgent_call",
    description: "Trigger banner urgencia + número emergencia local",
    input_schema: { reason: "string", country: "ES|US|UK|other" }
  },
  {
    name: "mental_health_escalation",
    description: "Trigger ruta salud mental con número crisis local",
    input_schema: { severity: "moderate|high", country: "string" }
  },
  {
    name: "relay_partner",
    description: "Push síncrono al co-cuidador/a si en cuenta",
    input_schema: { reason: "string", urgency: "soft|hard" }
  },
  {
    name: "save_to_chat_main",
    description: "Cierra Modo 3AM y guarda resumen al chat principal",
    input_schema: { thread_id: "uuid", summary: "string" }
  }
];
```

### 9.6 Triage tree implementación

Los 8 árboles se modelan como **state machines** en código (no LLM-only) para garantizar determinismo clínico. La IA llama `trigger_triage` con `tree_name` y se ejecuta el state machine. La IA solo añade glosa contextual a la pregunta.

Pseudocódigo:
```typescript
const fiebreTree: TriageTree = {
  id: "fever",
  source: "NICE NG143 · 2021",
  start: "ask_age",
  states: {
    ask_age: { type: "ask", q: "¿Edad de Lola?", next: (a) => a < 3 ? "any_temp_under_3m" : "temp_above_3m" },
    any_temp_under_3m: { type: "ask", q: "¿Tª ≥ 38°C?", next: (a) => a ? "URGENT" : "monitor" },
    URGENT: { type: "result", level: "🚨", action: "urgent_call", message: "Bebé < 3m con fiebre · urgencias siempre · canon AEPED" },
    // ...
  }
};
```

---

## 10 · Tono y copy · canon library

### 10.1 Aperturas chat principal (saludo contextual)

- *"Hola María. Lola ya tiene 18 meses · ¿en qué te ayudo hoy?"*
- *"Buenos días. Te leo."*
- *"Hola. Estoy aquí."*

### 10.2 Aperturas Modo 3AM

- *"Este es un modo urgencia. Las respuestas son más rápidas, más directas y sin juzgar."* **(canon · siempre)**

### 10.3 Validación emocional

- *"Tiene sentido que estés asustada."*
- *"Lo que sientes es real."*
- *"No estás sola."*
- *"Tres horas sin dormir cambian a cualquiera."*

### 10.4 Información clínica

- *"Esto puede ser X o Y. Te explico la diferencia."*
- *"Lo que sabemos hasta ahora..."* (cuando no hay certeza)
- *"Te dejo lo que dice [fuente]."*

### 10.5 Acciones suaves

- *"Si te ayuda, podemos..."*
- *"¿Quieres que lo veamos juntos?"*
- *"Podemos esperar a mañana o llamar ahora · tú decides."*

### 10.6 Escalada urgente

- *"Esto necesita atención médica ahora."*
- *"Llama al 112. Si quieres, me quedo contigo mientras llaman."*
- *"Mientras esperan: pon a Lola de lado · respira con ella."*

### 10.7 Cierre

- *"Estoy aquí cuando me necesites."*
- *"Mañana revisamos juntos."*
- *"Avisa a Pablo cuando despierte."*

### 10.8 Lo que NUNCA decimos

- ❌ *"¡No te preocupes!"*
- ❌ *"Tu peque está bien"* (no diagnosticamos)
- ❌ *"Otros bebés lo pasan peor"*
- ❌ *"Eres una madre increíble"*
- ❌ *"Felicidades por usar el chat"*
- ❌ *"Confía en tu instinto"* (en triage clínico es peligroso)
- ❌ *"Dios te bendiga"*
- ❌ *"Mami / papi"* forzado
- ❌ *"¡Excelente pregunta!"*

---

## 11 · Datos · modelos · privacy

### 11.1 Schema datos persistidos

```typescript
type ChatMessage = {
  id: string;
  chatId: string; // un chat por peque + un chat sin peque (embarazo)
  role: 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: Date;
  citations?: Array<{ source: string; year: number; url?: string }>;
  toolCall?: { name: string; input: any; output: any };
  metadata?: Record<string, any>;
};

type Mode3AMThread = {
  id: string;
  parentChatId: string;
  startedAt: Date;
  endedAt: Date | null;
  routeChosen: '1' | '2' | '3';
  ageEtapa: 'embarazo' | '0-3m' | '3-12m' | '12-36m';
  outcome: 'urgent_call' | 'monitor' | 'normal' | 'mental_health' | 'partner_relay' | 'saved_to_main';
  savedToMainChatId: string | null; // null si borrado
  messageCount: number;
  duration_seconds: number;
};

type TriageRun = {
  id: string;
  chatId: string;
  treeName: 'fever' | 'respiratory' | 'crying' | 'vomiting' | 'diarrhea' | 'head_injury' | 'rash' | 'seizure';
  startedAt: Date;
  outcome: '🚨' | '⚠' | '🟢';
  followedAdvice: boolean | null; // self-report 24h después
  source: 'main' | '3am';
};
```

### 11.2 Privacy canon

- Conversaciones cifradas at-rest (AES-256 · Supabase encryption keys).
- Modo 3AM thread efímero · si usuari@ pulsa "borrar", solo queda agregado anonimizado.
- Cero entrenamiento de modelos de Anthropic con conversaciones de Grow (Anthropic API zero-retention).
- Cero envío de PII al modelo · solo edad/etapa del peque · nunca nombre completo.
- Derecho borrado GDPR: usuari@ puede borrar todo el chat por peque.
- Export GDPR: chat completo en JSON + PDF al pedir portabilidad.

### 11.3 Compliance

- **GDPR**: consent granular en onboarding · derecho borrado · portabilidad.
- **EU AI Act**: chat clasifica como "limited risk" · transparencia obligatoria (mostrar "es IA") · documentación técnica modelo y datos.
- **EU MDR 2017/745**: cribados clínicos embebidos clasifican como Class IIa · pathway en pilot DKV.
- **HIPAA** (si scale a USA): conversaciones tratadas como PHI · Business Associate Agreement con Anthropic.
- **NSBSP messaging compliance** en safety frame.

---

## 12 · Métricas · dashboard

### 12.1 Eventos PostHog

| Evento | Properties |
| --- | --- |
| `chat_opened` | source: 'nav'\|'card'\|'notification', mode: 'main'\|'3am' |
| `chat_message_sent` | role: 'user', length_chars, has_attachment |
| `chat_message_received` | role: 'assistant', length_chars, citations_count, tool_calls_count, latency_ms |
| `chip_cribaje_tapped` | tree_name |
| `triage_started` | tree_name, source: 'main'\|'3am' |
| `triage_completed` | tree_name, outcome: '🚨'\|'⚠'\|'🟢', duration_seconds |
| `mode_3am_opened` | trigger: 'auto'\|'manual'\|'card_hoy', age_etapa |
| `mode_3am_route_chosen` | route: '1'\|'2'\|'3', age_etapa |
| `mode_3am_closed` | outcome, duration_seconds, saved_to_main: bool |
| `urgent_call_triggered` | reason, country, did_call: bool |
| `mental_health_escalation` | severity, country, did_call: bool |
| `partner_relay_sent` | response_time_seconds |
| `tool_called` | name, success: bool, duration_ms |
| `disclaimer_clicked` | from_screen |

### 12.2 Métricas clínicas

- **Time-to-resolution Modo 3AM mediano** por ruta.
- **% triage outcomes urgent_call que llamaron** (self-report 24h después).
- **% triage normal que NO acabaron en urgencias** (validación clínica).
- **EPDS detection rate** desde chat.
- **NPS clínico** ("¿Te sentiste bien atendida?") post-conversación.

---

## 13 · Roadmap

### 13.1 v0 · MVP · 6 meses

- Chat principal monothread por peque.
- Modo 3AM con 3 opciones edad-aware.
- 8 triage trees state-machine.
- 10 tools registradas.
- Sonnet 4.6 + Haiku 4.5 stack.
- RAG con NICE/AAP/AEPED/NSBSP.
- ES + EN.
- Latencia p50 ≤ 1.5s chat · ≤ 0.8s 3AM.

### 13.2 v1.5 · 6-12 m post-launch

- Voice mode input + output.
- Búsqueda histórico chat.
- Multi-idioma (CA · FR · DE).
- Personalización estilo respuesta.
- Compartir respuesta a pediatra (export PDF).
- Ampliación triage trees (+ 4 árboles: dolor de oído · alergia · hipotermia · golpes no-cabeza).

### 13.3 v2 · escala

- Telesalud humana integrada (DKV partnership).
- Group chat familia (multi-cuidadores).
- Voice analysis cuidador/a (detección burnout pre-clínico).
- Chat por module (módulo cólicos tiene su sub-chat especializado).

---

## 14 · Riesgos y mitigaciones

| Riesgo | Severidad | Mitigación |
| --- | --- | --- |
| **Diagnóstico erróneo · falso negativo** | 🔴 alta | State-machine triage validado · disclaimer canon · escalada agresiva ante alarma |
| **Hallucination IA** (cita inventada) | 🔴 alta | RAG curado · eval pre-launch con expertos clínicos · validation set 200 preguntas reales |
| **Latencia 3AM inaceptable** | 🟡 media | Haiku 4.5 + edge functions + streaming · target p95 ≤ 2s |
| **Sobre-uso del chat para todo** | 🟡 media | UI sugiere módulos cuando aplica (libro vacunas · cólicos · sueño) |
| **Burnout dependencia chat** | 🟡 media | Chat reconoce patrones · sugiere humanos cuando aplica |
| **Tono frío en momento vulnerable** | 🟡 media | A/B test tonos · dogfood interno · feedback loop |
| **Cita clínica desactualizada** | 🟡 media | Update trimestral RAG · alert si guideline > 3 años |
| **Modo 3AM no accesible cuando se necesita** | 🟡 media | Card persistente Hoy 22:00-06:00 · entry desde widgets · push si epis cólicos > 30 min |
| **Privacy leak conversación** | 🔴 alta | E2E encryption · zero-retention API · audit anual |
| **Liability medical advice** | 🔴 alta | Disclaimer canon Fase 0 · canon "no diagnosticamos" en cada respuesta · escalada urgencias automatizada · seguro RC |
| **Multilingüe inconsistente** | 🟡 media | Eval por idioma · no traducción literal · canon adaptado |
| **Modo 3AM contamina chat principal con ansiedad** | 🟡 media | Thread efímero opt-in para guardar · resumen sintético si guarda |

---

## 15 · Decisiones abiertas

1. **Modelo chat principal**: Sonnet 4.6 vs Sonnet 4.7 (1M context). Recomendación: 4.6 por coste · 4.7 si presupuesto.
2. **Modo 3AM auto-activación**: pasiva (banner switch) vs activa (default si dentro de 22-06h tras opt-in). Recomendación: opt-in primera vez · luego auto.
3. **Voice v0**: incluir o no. Recomendación: NO · v1.5.
4. **Borrado completo Modo 3AM**: ¿borra hasta de métricas agregadas? Recomendación: solo conversación · agregado anonimizado se mantiene.
5. **Multi-perfil chat**: ¿chat compartido pareja o individual? Recomendación: chat por cuenta · cada cuidador/a el suyo · pero con visibilidad sincronizada (canon §14 cuenta compartida).
6. **Embedding model**: Voyage-3-large vs OpenAI text-embedding-3-large. Recomendación: Voyage por dominio clínico.
7. **Triage tree determinismo**: state machine puro vs IA-modulated. Recomendación: state machine puro · IA solo añade glosa.
8. **Latencia objetivo Modo 3AM**: p50 0.5s vs 0.8s. Recomendación: 0.8 inicial · iterar.

---

## 16 · Anexos

### 16.1 Fuentes clínicas

(Mismas que Libro de Cólicos PRD · más todas las NICE guidelines listadas en §5.1)

### 16.2 Componentes DS Grow v0.2 referenciados

- `.cat-card` (mensajes IA con cita clínica)
- `.chip` con variantes categoría (chips cribaje)
- Bubble component (a definir como primitive nuevo en DS v0.3)
- Triage banner (a canon en DS v0.3)
- Mode 3AM dark variant (a canon en DS v0.3 · paleta night)
- Tool call card (a definir como primitive)
- Cita clínica pill `paper-soft + fuente + año` (primitive)
- Sticky disclaimer footer (primitive)

### 16.3 Cross-ref con otros docs canon

- `wireframes-v2.html · §11 Chat IA contextual` (frames lo-fi base).
- `wireframes-v2.html · §12 Modo 3AM` (5 rutas canónicas previas · ahora canónico 3 rutas edad-aware).
- `wireframes-v2.html · §13 Screening EPDS` (cribado embebido).
- `wireframes-v2.html · §14 Cuenta compartida` (relevo + visibilidad).
- `wireframes-v2.html · §16 Settings` (toggle Modo 3AM auto / manual).
- `PRD-libro-colicos-v0.1.md` (cross-ref bidireccional).
- `prototype.html · landing` (entry chat desde web).
- `Notion · Diferenciales Grow` (canon trauma-informed).
- `Notion · Journey Grow` (contexto pre-cargado).

---

## 17 · Cierre · qué hace falta para arrancar

| Bloque | Status | Owner |
| --- | --- | --- |
| Spec PRD (este doc) | ✅ done v0.1 | Tito + Claude |
| Wireframes lo-fi 7 frames | ⏳ pending (§11 wireframes-v2 base + actualizar 3 rutas) | Claude |
| Hi-fi en DS v0.2 | ⏳ pending | Claude Design |
| RAG knowledge base curada | ⏳ pending | clinical advisor + ML |
| Eval set 200 preguntas reales | ⏳ pending | producto + clinical |
| State machines triage trees | ⏳ pending | ingeniería |
| Tool implementations | ⏳ pending | ingeniería |
| Sign-off legal MDR Class IIa | ⏳ pending | legal externo |
| Anthropic zero-retention agreement | ⏳ pending | legal |
| Implementación frontend + streaming | ⏳ pending | ingeniería |
| Localización ES + EN | ⏳ pending | content |
| Dogfood interno · feedback loop | ⏳ pending | producto |
| A/B test tonos | ⏳ pending Q3 2026 | producto |
| Pilot DKV · go-live | ⏳ Q3 2026 | partnerships |

---

*PRD · Chat IA + Modo 3AM · Grow v0.1 · canon Fase 0 · alineado con DS Grow v0.2 · abril 2026*
