# PRD · Libro de Cólicos
## Mimo · v0.1 · canon Fase 0

> Producto: **Mimo by The Child Lens** · Módulo: **Libro de Cólicos** · Categoría DS: **🌡 Salud** (`--cat-salud-tint #E6E2D6` · `--cat-salud-ink #5C5648`).
> Status: ready for Claude Design + ingeniería · siguiendo `Mimo Design System v0.2`.

---

## 0 · TL;DR

Los cólicos del lactante afectan a **~20 % de los bebés sanos** en los primeros 4 meses. Son la causa más frecuente de consulta pediátrica de urgencia en ese rango y el principal driver de **agotamiento parental severo** y de eventos de **shaken baby syndrome** en el mundo. Mimo construye un **Libro de Cólicos** —análogo al Libro de Vacunas en su entidad propia, pero **temporal y accionable** durante 1 sem – 4 m— que combina:

1. **Cry classifier on-device** (90-92 % accuracy) para identificar el tipo de llanto.
2. **5 S's interactivo guiado** (Karp · Happiest Baby).
3. **Diario de episodios + Wessel auto-detect** para distinguir cólico clínico de variación normal.
4. **Plan IA de descarte** (APLV · frenillo · reflujo · sobre-cansancio · fiebre) cross-linkeado con Caca tracker, Lactancia, Sueño y Salud.
5. **Educación PURPLE Crying + safety frame** anti-shaken-baby con NSBSP.
6. **Relevo de co-cuidador/a** vía cuenta compartida.
7. **Modo madrugada** ruta canónica "No para de llorar".

Todo siguiendo el DS Mimo v0.2 (Lenia + Helvena · 8 categorías canon · `.cat-card` salud + estados doing/done/snoozed · paleta paper/ink + tints).

**Por qué importa**: reduce ansiedad parental medible (EPDS / PBA-5), reduce consultas innecesarias a urgencias, previene tragedias evitables (sacudida del bebé), y construye memoria longitudinal del hij@ que sirve a otros módulos.

---

## 1 · Contexto y problema

### 1.1 Definición clínica canon

| Marco | Criterio | Fuente |
| --- | --- | --- |
| **Wessel rule of threes** (1954, clásico) | ≥ 3 h/día llorando · ≥ 3 días/sem · ≥ 3 sem | Wessel MA et al., *Pediatrics* 1954 |
| **Roma IV** (2016, vigente) | ≥ 1 h/día llanto/irritabilidad/inquietud sin causa clara · sin retraso ponderal · sin enfermedad subyacente · resuelve antes de 5 m | Benninga MA et al., *Gastroenterology* 2016 |
| **Patrón canónico** | Llanto vespertino/nocturno · pico semanas 6-8 · resolución espontánea ~4 m | NSBSP · Period of PURPLE Crying |

### 1.2 Prevalencia y carga

- **17-25 %** de lactantes sanos cumplen criterio Wessel/Roma IV (Wolke 2017 metaanálisis · n = 8 690).
- **40 %** de las visitas a pediatría en 0-3 m son por llanto inconsolable (Long & Johnson 2001).
- Cólicos son **predictor independiente** de depresión postparto materna (Vik 2009, Petzoldt 2014).
- Cólicos asociados a **mayor riesgo de Shaken Baby Syndrome** · pico de incidencia coincide con pico de llanto a las 6-8 sem (Barr 2006).

### 1.3 Pain del cuidador/a

| Pain | Frecuencia | Driver |
| --- | --- | --- |
| Ansiedad "mi bebé está mal" | ~80 % padres lactantes con cólicos | Falta de marco para distinguir variación normal vs alarma |
| Agotamiento extremo | ~60 % | Episodios concentrados 18:00-22:00 + nocturnos |
| Sentimiento de fracaso parental | ~50 % | "Si fuera buena madre, sabría calmarlo" |
| Conflicto pareja | ~35 % | Desigualdad en carga del cuidado |
| Aislamiento social | ~40 % | "Mi bebé llora siempre · no puedo salir" |
| Pensamientos intrusivos sacudida | ~5-10 % (subreportado) | Frustración + privación sueño |

Fuente: Kurth et al. *J Adv Nurs* 2011 · canon NSBSP.

### 1.4 Lo que Mimo resuelve

- **Marco clínico claro** sin alarmismo: distingue cólico clásico (variación normal) de causas tratables (APLV, frenillo, reflujo) y de alarma real (fiebre <3m, vómitos verdes, letargia).
- **Estrategias evidence-based**: 5 S's con evidencia RCT + sonido blanco AAP-compliant + cry classifier validado.
- **Co-cuidado**: distribuye carga vía cuenta compartida + relevo proactivo.
- **Prevención SBS** activa: educación PURPLE Crying + 4 pasos seguros + escalada salud mental.
- **Memoria longitudinal**: episodios alimentan otros módulos (caca tracker, lactancia, sueño) para detectar causas subyacentes.

---

## 2 · Usuarios y casos de uso

### 2.1 Persona primaria

**María · 34 a · primer hijo · Lola · 7 sem**
- Lactancia mixta. Vuelve al trabajo en 2 m.
- Lola llora 2-3 h cada tarde y se despierta cada 2 h. María duerme < 4 h.
- Llamó a urgencias 1 vez · le dijeron "es cólico, ya pasará".
- Tiene miedo de que sea APLV o reflujo (info de Internet).
- Su pareja Pablo trabaja en oficina · la llama "muchas veces" pero no sabe qué hacer.

### 2.2 Personas secundarias

- **Pablo · co-cuidador/a no gestante**: necesita saber cómo ayudar sin esperar a que María pida.
- **Alex · pareja madre adoptiva o subrogada**: lactancia no aplica, todo lo demás sí.
- **Carmen · monoparental con red**: necesita organizar relevos con su madre.
- **Lucía · embarazo arcoíris previo**: miedo extremo · necesita más acompañamiento emocional.

### 2.3 Casos de uso

| ID | Caso | Frecuencia |
| --- | --- | --- |
| UC-1 | Primer episodio inesperado · "no sé qué le pasa" | Activación |
| UC-2 | Episodio en curso · pánico parental nocturno | Pico crítico |
| UC-3 | Patrón recurrente · "¿es cólico de verdad?" | Validación Wessel |
| UC-4 | Sospecha causa tratable · "¿es APLV?" | Plan descarte |
| UC-5 | Agotamiento extremo · "no puedo más" | Modo madrugada ruta 3 |
| UC-6 | Pareja necesita relevar · "ven, ya no puedo" | Cuenta compartida |
| UC-7 | Educación preventiva · 1ª sem postparto | Onboarding pasivo |
| UC-8 | Escalada urgencias · síntoma de alarma | Triage tree |

---

## 3 · Outcomes y KPIs

### 3.1 Outcomes esperados (medibles a 6 m post-launch)

| Outcome | Métrica | Baseline | Target v0 |
| --- | --- | --- | --- |
| Reducción ansiedad parental | EPDS score promedio en familias activas | n/a | -2 puntos vs cohorte sin libro |
| Reducción consultas urgencias | Self-report "no llamé a urgencias gracias a Mimo" | n/a | ≥ 30 % usuarios reportan al menos 1 vez |
| Empoderamiento clínico | Wessel auto-confirmado / sospechado | n/a | ≥ 50 % cólicos sospechados confirmados |
| Co-cuidado activo | Episodios con relevo registrado / total | 0 | ≥ 25 % cuentas compartidas |
| Prevención SBS | PURPLE Crying education completion | n/a | ≥ 70 % familias activas |

### 3.2 KPIs operativos

- **Activación**: % familias 1-4 m que abren el libro al menos 1 vez.
- **Engagement**: episodios trackeados por familia activa (target: ≥ 5/sem en pico).
- **Cry classifier usage**: grabaciones / familia activa / sem.
- **5 S's completados**: % episodios donde al menos 3 S's se ejecutan.
- **Diferencial vs control**: comparativa con cohorte sin libro a 12 sem.

---

## 4 · Scope

### 4.1 In scope · v0 (MVP · ship en 6 meses)

- Activación automática 1 sem - 4 m.
- 6 frames principales (Home · Episodio · Cry classifier · Histórico · Plan IA · PURPLE).
- Cry classifier on-device (vendor TBD pilot DKV).
- 5 S's interactivo con cronómetro.
- Wessel auto-detect.
- Diario de episodios persistente.
- Cross-ref a Caca tracker, Lactancia, Sueño.
- Modo madrugada ruta "No para de llorar".
- Relevo co-cuidador/a vía cuenta compartida.
- Educación PURPLE Crying con safety frame anti-shaken-baby.
- Idioma: ES (España) + EN (paralelo).

### 4.2 Out of scope · v0

- Comunidad/grupos de familias con cólicos → v2.
- Wearable detección llanto ambient → v2.
- Predicción cuándo va a llorar (timing learning) → v1.5.
- Recomendación L. reuteri activa (con disclaimer médico) → v1.5 con sign-off legal.
- Telesalud lactanciera/asesora dentro de la app → v2.
- Audio guardado para análisis posterior → fuera de canon (privacidad).

### 4.3 v1.5 (post-validación · 6-12 m post-launch)

- Patrones aprendidos por hij@ (personalización IA local).
- Multi-idioma cry classifier (catalán, francés, alemán).
- Recomendación probiótica con disclaimer.
- Notificación inteligente al co-cuidador/a (ML "ahora deberías ofrecer relevo").
- Export libro completo a PDF para llevar a pediatra.

### 4.4 v2 (escala · 12 m+)

- Comunidad opt-in.
- Wearable ambient.
- Telesalud integrada.

---

## 5 · Research clínico canon

### 5.1 Adoptado

| Fuente | Qué adoptamos | Cómo se aplica |
| --- | --- | --- |
| **Happiest Baby · Karp 1996/2002** | 5 S's: Swaddle · Side/Stomach · Shush · Swing · Suck | Frame B Episodio · checklist guiado |
| **ChatterBaby UCLA** (Dunbar et al. 2016+) | Algoritmo 6000 acoustic features · 90.7 % accuracy pain · 71.5 % discriminating fussy/hunger/pain | Cry classifier opción 1 (preferida por dataset) |
| **Zoundream Hospital Clínic Barcelona** (CE-marked 2021) | 5 categorías cry classification · 92 % accuracy clinical trial · 100K horas grabaciones | Cry classifier opción 2 (preferida por proximidad clínica + idioma ES) |
| **Wessel rule of threes** (1954) | Definición clínica clásica de cólico | Auto-detect a partir de logged episodes |
| **Roma IV** (Benninga 2016) | Definición clínica vigente | Educación + criterios actualizados |
| **AAP 2023 white noise guidelines** | ≤ 50 dB · ≥ 200 cm · apagar al despertar | Frame B 5 S's · "Shush" guidance |
| **PURPLE Crying** (NSBSP) | Educación normalizadora · anti-shaken-baby | Frame F + sticky en Home |
| **L. reuteri DSM 17938** (Indrio 2014, Sung 2018 metaanálisis) | Evidencia probiótica EXCLUSIVAMENTE en lactantes maternos · NO en formula-fed | Educación pasiva v0 · recomendación activa v1.5 con disclaimer |
| **Cochrane breastfeeding analgesia** | Lactancia reduce dolor en procedimientos | Cross-ref Lactancia |
| **NSBSP 4-step safety plan** | Si no puedes más: cuna + alejarse 5 min + respirar + pedir relevo | Frame F + Modo madrugada ruta 3 |

### 5.2 Adaptado

| Fuente | Adaptación |
| --- | --- |
| **Happiest Baby SNOO** (FDA De Novo 2023) | NO usamos hardware · adaptamos 5 S's a guía digital + cronómetro |
| **CryAnalyzer / Predictive Analytics** | NO predecimos en v0 · adaptamos como insight retrospectivo en histórico semanal |
| **NICE NG143** (fever in under 5s) | Adaptado en triage tree alarma vs cólico |

### 5.3 Descartado

| Fuente | Por qué |
| --- | --- |
| Recomendación simeticona (gases) | Evidencia insuficiente · no canon |
| Recomendación dieta materna restrictiva por defecto | Solo si APLV confirmada · cross-ref Caca tracker |
| Manipulación osteopática infantil | No evidencia + riesgo en lactantes |
| "Bebé orgánico" / homeopatía | No evidencia |
| Apps tipo "white noise spam" sin canon AAP | No respetan ≤ 50 dB ni distancia |

---

## 6 · Arquitectura de información

### 6.1 Cómo encaja en el navbar canon

El bottom nav canon de Mimo es **5-tab + FAB central coral**:
`Hoy · Calendario · ⊕ · Chat · Yo`

**Decisión**: el Libro de Cólicos **NO es una pestaña top-level**. Es un **módulo accionable temporal** (1 sem - 4 m) que vive como vista expandida con 4 entry points:

1. **Card categoría 🌡 Salud en Hoy** durante 1-6 sem postparto (educación preventiva pasiva).
2. **Card categoría 🌡 Salud en Calendario · pestaña Hitos** durante 1 sem - 4 m (acceso longitudinal).
3. **Modo madrugada · ruta "No para de llorar"** (entry crítico nocturno).
4. **Cry classifier desde Quick log ⊕** (entry rápido para análisis puntual).

### 6.2 Diferencia vs Libro de Vacunas

| | Libro de Vacunas | Libro de Cólicos |
| --- | --- | --- |
| Duración | 0-18 a (toda la infancia) | 1 sem - 4 m (4 meses) |
| Naturaleza | Estructural · canon AEPED 2026 | Accionable · resolución espontánea |
| Entry | Sub-tab persistente del Calendario | Card categoría 🌡 Salud en Hoy y Calendario |
| Lo que cubre | Calendario · carnet · tracker fiebre · dosis | Cry classifier · 5 S's · Wessel · plan IA · PURPLE |
| Persistencia | Permanente (carnet vital) | Episodios trackeados quedan en Diario |

### 6.3 Estados del módulo

```
Estado del Libro
│
├── Pre-activación (0 - 1 sem postparto)
│   └── Educación preventiva pasiva en Hoy
│       (PURPLE Crying intro · "qué es lo que viene")
│
├── Activación posible (1 sem - 4 m)
│   ├── Trigger A · auto: 3 episodios > 30 min en 1 sem
│   ├── Trigger B · cry classifier detecta patrón cólico
│   ├── Trigger C · usuari@ activa manual desde Hoy
│   └── Trigger D · Modo madrugada ruta 1 lo abre on-the-fly
│
├── Activo (1 sem - 4 m)
│   ├── Card destacada en Hoy todos los días
│   ├── Episodios en curso (live)
│   ├── Diario semanal con heatmap
│   ├── Wessel auto-monitor
│   └── Plan IA descarte si Wessel ≥ 3 sem
│
└── Resuelto (4 m+)
    ├── Auto-archivado · sigue accesible histórico
    ├── Card transición "Lola superó los cólicos · cuántas horas le acompañaste"
    └── Episodios persisten en Diario (§Calendario · Diario)
```

### 6.4 Dependencias cross-módulo

| Módulo | Cómo se cruza |
| --- | --- |
| **§7 Quick log** | "Llanto" tipo de log · alimenta Diario de cólicos |
| **§10.1 Sueño** | Sobre-cansancio como causa cólicos · ventanas Huckleberry |
| **§10.2 Alimentación + Caca tracker** | BITSS scale → descartar APLV/FPIES |
| **§10.3 Lactancia** | LATCH score → descartar frenillo · descartar agarre |
| **§10.5 Salud** | Tabla síntomas alarma vs cólicos clásicos |
| **§11 Modo madrugada** | Contexto pre-cargado "+ episodio cólicos en curso" |
| **§12 Modo madrugada** | Ruta "No para de llorar" entry directo |
| **§13 EPDS** | Trigger EPDS si Wessel + agotamiento severo |
| **§14 Cuenta compartida** | Push síncrono "María lleva 30 min · ¿paso a Pablo?" |

---

## 7 · Funcionalidades core

### 7.1 Cry classifier on-device

**Qué**: graba 5 s de audio del hij@, lo procesa **localmente** con TensorFlow Lite, devuelve probabilidad por categoría.

**Categorías** (ChatterBaby + Zoundream merged):
1. Hambre
2. Sueño / cansancio
3. Dolor / cólico
4. Gas / incomodidad
5. Aburrimiento / atención
6. (Indeterminado · si todas < 60 %)

**Privacy canon Fase 0**:
- Audio **nunca** sale del dispositivo.
- Solo se guarda el output (% categoría) + timestamp.
- Audio buffer borrado en memoria tras inferencia.
- Modelo TFLite descargado 1 vez (~12 MB).

**UX**:
- Botón hold-to-record 5 s.
- Waveform en vivo.
- Resultado: `Sueño · 87 %` + 2 estrategias contextuales.

**Vendors candidatos**:
- ChatterBaby UCLA (open dataset · académico · accuracy 90.7 %).
- Zoundream Hospital Clínic Barcelona (CE-marked · ES · accuracy 92 %).
- **Decisión recomendada**: Zoundream para v0 (proximidad clínica + idioma).

### 7.2 5 S's interactivo (Karp · Happiest Baby)

**Qué**: checklist guiado en orden, con cronómetro por S, animación e instrucciones paso a paso.

| S | Acción | Detalle UI | Cronómetro |
| --- | --- | --- | --- |
| **Swaddle** | Envolver en manta firme | Vídeo 30 s + checklist 4 pasos | n/a |
| **Side/Stomach** | Postura lado/boca abajo (en brazos, no en cuna) | Disclaimer "no dejar boca abajo en cuna" | n/a |
| **Shush** | Sonido blanco ≤ 50 dB · ≥ 200 cm · apagar al despertar | Player blanco con timer · canon AAP 2023 | hasta calmarse |
| **Swing** | Mecer 1-2 cm rápido (no balanceo grande) | Animación rítmica 1 Hz | hasta calmarse |
| **Suck** | Dedo limpio o chupete | Disclaimer "evitar exceso por riesgo otitis canon AAP" | n/a |

**Lógica**:
- Aplicarlas **en orden**.
- Si después de las 5 S's en 10-15 min sigue inconsolable → escalada (Plan IA / Modo madrugada / urgencias si síntoma alarma).
- Marcar cuáles funcionan para personalizar a futuro (v1.5).

### 7.3 Diario de episodios

**Qué se logea**:
- Inicio · fin · duración.
- Intensidad 1-5 (auto-evaluada · escala emoji o números).
- Estrategias intentadas (5 S's marcadas + extras manuales).
- Co-cuidador/a presente (yo / pareja / ambos).
- Tipo final (cólico / hambre / sueño / dolor / otro / no sé).

**Visualización**:
- Heatmap por hora del día (eje X = horas 0-24, eje Y = días de la semana, intensidad = duración total minutos).
- Total horas/día con banda Wessel-3h sutil.
- Curva tendencia 30 días.

**Wessel auto-detect**:
```
SI (≥ 3h llanto/día) Y (≥ 3 días/sem) Y (≥ 3 sem)
  → Modal "Esto suena a cólico clásico según Wessel"
  → Activar Plan IA descarte (Frame E)
  → NO diagnosticar · solo informar y ofrecer descartar causas
```

### 7.4 Plan IA descarte de causas

**Qué**: árbol de descarte de las 5 causas tratables más frecuentes detrás de "cólico".

```
Causa 1 · APLV (alergia proteína leche vaca)
  ├── Síntomas asociados a vigilar
  │   ├── Caca con sangre/moco (BITSS scale tipo 7+)
  │   ├── Eczema severo
  │   ├── Vómitos frecuentes
  │   └── Curva peso plana
  ├── Cross-ref Caca tracker §10.2
  └── Si ≥ 2 → "habla con tu pediatra · puede ser APLV"

Causa 2 · Frenillo lingual / labial
  ├── Síntomas asociados
  │   ├── LATCH score < 7 (cross-ref §10.3)
  │   ├── Dolor pezones materno persistente
  │   ├── Tomas > 40 min frecuentes
  │   ├── Click al mamar
  │   └── Curva peso plana
  └── Si ≥ 2 → "valoración por pediatra/lactanciera"

Causa 3 · Reflujo gastroesofágico
  ├── Síntomas asociados
  │   ├── Regurgitaciones frecuentes (> 5/día)
  │   ├── Llanto inmediato post-toma
  │   ├── Arquea espalda
  │   └── Tos sin catarro
  └── Si ≥ 2 → "habla con pediatra · GERD posible"

Causa 4 · Sobre-cansancio
  ├── Cross-ref Sueño Huckleberry §10.1
  ├── Ventana sueño excedida en > 80 % episodios
  └── Si patrón → "ajustar ventanas de sueño"

Causa 5 · Algo más serio (alarma)
  ├── Fiebre + < 3 m → 🚨 urgencias
  ├── Vómitos verdes → 🚨 112
  ├── Letargia · no responde → 🚨 urgencias
  ├── Bulto inguinal/escrotal → 🚨 urgencias
  ├── Heces "jalea de grosella" → 🚨 112
  └── Llanto agudo súbito + dolor evidente → ⚠ mismo día

Si nada de lo anterior → cólico clásico (variación normal · resuelve a 4m)
+ educación PURPLE Crying
+ apoyo emocional
+ EPDS si signos burnout
```

### 7.5 Educación PURPLE Crying + safety

**Acrónimo PURPLE** (NSBSP):
- **P**eak of crying (pico semana 6-8)
- **U**nexpected (sin razón aparente)
- **R**esists soothing (no calma con nada)
- **P**ain-like face (cara de dolor pero no le duele)
- **L**ong-lasting (puede durar horas)
- **E**vening (vespertino · 18:00-22:00)

**Mensaje canon**:
> "El llanto del bebé puede ser normal aunque te parezca insoportable. No es culpa tuya. No le pasa nada grave. Pasará."

**Safety frame anti-shaken-baby (NSBSP 4 pasos)**:

```
SI sientes que NO PUEDES MÁS:

1 · Pon al bebé en la cuna boca arriba · es el sitio más seguro.
2 · Aléjate 5 minutos · cierra la puerta si necesitas.
3 · Respira · cuenta hasta 100 · llama a alguien.
4 · Vuelve cuando estés más tranquila/o. El bebé estará bien.

NUNCA sacudas al bebé. Ni siquiera 1 segundo. 
Su cuello no aguanta.
```

**3 reglas oro**:
1. Llorar no es señal de mala madre/padre.
2. Soltar al bebé en cuna durante 5 min es seguro.
3. Pedir relevo es un acto de cuidado · no de fracaso.

### 7.6 Relevo co-cuidador/a

**Trigger**:
- Botón explícito "Avisar Pablo" en frame B.
- Auto-sugerencia si timer episodio > 30 min y co-cuidador/a en cuenta.

**UX**:
- Push síncrono con contexto: *"Lola lleva 30 min llorando · María lleva 22 min sola con ella · ¿puedes ofrecer relevo?"*
- Pablo responde: `voy en X min` / `no puedo ahora` / `llamo`.
- Tracker visual en frame B: `Pablo viene en 8 min`.

**Edge case · solo cuidador/a**:
- Si no hay co-cuidador/a, sugerir red de apoyo (configurada en onboarding) o llamada a emergencia emocional (modo arcoíris).

### 7.7 Modo madrugada · ruta "No para de llorar"

Ya canon en `grow-wireframes-v2.html` §12 + spec chat. Aquí solo recap:

```
Modo madrugada (22:00-06:00) · ruta 1 "No para de llorar"
│
├── Quick triage (3 preguntas dark mode)
│   ├── ¿Tiene fiebre? → triage fiebre
│   ├── ¿Edad < 3 meses + cualquier síntoma raro? → urgencias
│   └── No alarma → continuar
│
├── 5 S's accesibles (1-tap por S)
├── Cry classifier (botón hold)
└── Si > 30 min sin calmar → Plan IA descarte
```

---

## 8 · Especificaciones por pantalla

### 8.1 Convenciones DS aplicadas a todas

- Frame mobile-first 360 px · radius 22 px · borde `var(--ink)`.
- Tipografía: títulos **Lenia** (Lenia Sans · medium 18-22 px) · body **Helvena** (regular 14-15 px).
- Categoría: `🌡 SALUD` · `--cat-salud-tint #E6E2D6` · `--cat-salud-ink #5C5648`.
- Estados card: `state-doing` (live · paper) · `state-done` (dashed · muted) · `state-snoozed` (opacity 0.55).
- Sin sombras agresivas. Sin rojo médico. Coral solo para urgencias 112 reales.

### 8.2 Frame A · Home Cólicos

**Cuándo se muestra**: card destacada en feed Hoy + sub-vista al tap.

**Composición vertical**:
1. **Hero manifiesto**: *"Las tres horas más largas del día"* (Lenia bold 28 px) + sub *"y las 3 más importantes para ti"* (Helvena italic 14 px).
2. **Sticky PURPLE warning** (banner soft cat-salud-tint): *"Esto que estás viviendo es un período. Pasará. No es tu culpa. Aquí estamos."*
3. **Card hero · Cry classifier**: botón circular grande `🎙 Escuchar 5 s` + sub *"on-device · privado"*.
4. **Card · Episodio actual** (si activo · live state): timer + 5 S's checklist + relevo. Si no activo: `+ Empezar episodio`.
5. **Card · Esta semana**: heatmap mini + total horas + Wessel status (`× 2/3 sem · pendiente`).
6. **Acceso PURPLE education** (button-link low key): *"Por qué llora aunque no le pase nada"*.
7. **Bottom nav canon**.

### 8.3 Frame B · Episodio en curso

**Cuándo**: tap en `+ Empezar episodio` o auto-trigger por cry classifier prolongado.

**Composición**:
1. **Header live**: timer grande Lenia bold 56 px (`+22:14`).
2. **Slider intensidad 1-5**: emoji-less · 5 puntos · default 3.
3. **5 S's checklist**:
   - Cada S como pill expandible · cronómetro sub-S al tap.
   - Estado: pending · doing (animación rítmica si Swing/Shush) · done (✓).
4. **Botón relevo**: `Avisar Pablo` (chip cat-salud · ink 5C5648) · si pareja en cuenta.
5. **Botón secundario**: `Cry classifier · 5 s`.
6. **Footer fijo**: `Cerrar episodio` (acción primaria) + `Algo va mal · pediatra` (acción atención).

### 8.4 Frame C · Cry classifier

**Composición**:
1. **Header**: *"5 segundos · acerca el móvil"*.
2. **Botón hold-to-record** (circular · cat-salud-tint · pulse cuando hold).
3. **Waveform en vivo**.
4. **Pre-result mientras procesa**: skeleton 1-2 s.
5. **Resultado**:
   - Top: `Sueño · 87 %` (Lenia bold 32 px · cat-sueno-ink).
   - Sub: `Dolor 9 % · Hambre 4 %`.
   - Insight contextual: *"Lola lleva despierta 2h 15 min · ventana ideal cerrada"* (cross-ref §10.1).
   - 2 CTAs primarias contextuales: `Ver rutina sueño` + `Continuar episodio`.
6. **Footnote privacy**: *"El audio nunca sale de tu móvil"*.

### 8.5 Frame D · Histórico semanal

**Composición**:
1. **Header**: *"Esta semana · Lola"* + selector semanas.
2. **Heatmap**: 7 días × 24 h grid · intensidad por minutos llanto/celda. Paleta cat-salud-tint → cat-salud-ink.
3. **Stats key**:
   - Total horas/día promedio.
   - Pico horario (e.g. *"19:00 - 21:00"*).
   - Tendencia 30 días (↑ ↓ →).
4. **Wessel status card**:
   - 3 checkpoints visuales (≥ 3h · ≥ 3 días · ≥ 3 sem).
   - Estado: `incompleto` · `cumple` · `confirmado`.
   - Si confirmado → CTA `Plan IA descarte`.
5. **Lista episodios** (últimos 7).
6. **Insight IA** (text · paper-soft block):
   *"Lola llora más entre 19:00 y 21:00 los días que duerme menos siesta. ¿Quieres que ajustemos su rutina de sueño?"*

### 8.6 Frame E · Plan IA descarte

**Composición**:
1. **Header**: *"Vamos a descartar 5 cosas"* (Lenia medium 22 px) + *"Aquí no diagnosticamos"* (caption cat-salud-ink uppercase).
2. **5 cards de causa**, cada una expandible:
   - APLV
   - Frenillo
   - Reflujo
   - Sobre-cansancio
   - Algo más serio (alarma · borde 1.5 px ink)
3. Cada card:
   - Tag `🌡 CAUSA POSIBLE`.
   - Title canon.
   - Sub-checklist síntomas asociados (3-5 items con checkbox).
   - CTA según resultado: `Cross-ref con [módulo]` o `Habla con pediatra`.
4. **L. reuteri callout** (al final · solo si lactancia materna confirmada · paper-soft):
   *"Algunos estudios muestran que L. reuteri DSM 17938 puede reducir el llanto en bebés amamantados. Habla con tu pediatra antes de probar."*
   Fuente: *"Sung 2018 · meta-análisis Cochrane"*.
5. **Cierre**:
   *"Si descartamos las 5, es cólico clásico. Variación normal. Pasará a los 4 meses."*

### 8.7 Frame F · PURPLE education + safety

**Composición**:
1. **Hero**: *"PURPLE Crying · por qué llora aunque no le pase nada"*.
2. **6 letras del acrónimo** · cards apilables (timeline visual · pico semana 6-8 marcado).
3. **Mensaje canon trauma-informed** (paper-soft block · borde izquierdo ink):
   *"El llanto del bebé puede ser normal aunque te parezca insoportable. No es culpa tuya. No le pasa nada grave. Pasará."*
4. **Safety frame anti-shaken-baby**:
   - Sticky cat-salud-tint con borde 2 px ink (NO rojo).
   - 4 pasos numerados Lenia bold.
   - Mensaje cierre Lenia italic *"Nunca sacudas al bebé. Ni siquiera 1 segundo. Su cuello no aguanta."*
5. **3 reglas oro** · lista numerada Helvena medium.
6. **CTA escalada salud mental**: *"Si llevas días pensando en hacer daño · habla ahora"* + número emergencia 112 / línea ayuda parental.
7. **Fuentes**: NSBSP · Barr 2006 · canon NICHD.

---

## 9 · Lógica clínica · activación y triage

### 9.1 Activación del libro

```
TRIGGER A · Auto detección
  Si ≥ 3 episodios > 30 min en 1 sem
  → modal "He visto que Lola está pasando ratos difíciles. ¿Activamos el Libro de Cólicos?"

TRIGGER B · Cry classifier prolongado
  Si classifier devuelve "Dolor/Cólico" > 80 % en sesión > 20 min
  → modal idéntico

TRIGGER C · Manual
  Card en Hoy "🌡 Activar libro de cólicos" siempre disponible 1 sem - 4 m

TRIGGER D · Modo madrugada ruta 1
  Abre el libro on-the-fly sin pedir confirmación
```

### 9.2 Triage tree alarma vs cólico clásico

```
INICIO · llanto inconsolable detectado
│
├── EDAD del hij@?
│   ├── < 3 meses
│   │   ├── + Tª cualquiera ≥ 38°C → 🚨 URGENCIAS
│   │   ├── + Vómitos verdes/sangre → 🚨 112
│   │   ├── + Letargia · no responde → 🚨 URGENCIAS
│   │   ├── + Heces "jalea grosella" → 🚨 112 (intususcepción)
│   │   ├── + Bulto inguinal/escrotal → 🚨 URGENCIAS (hernia)
│   │   └── ningún signo alarma → continuar
│   │
│   └── 3 - 12 meses
│       ├── Inconsolable > 3h + cualquier signo arriba → ⚠ MISMO DÍA
│       └── Episodios cortos consolables → casa
│
├── PATRÓN típico cólico Wessel?
│   ├── Vespertino + cara de dolor + resiste consuelo → SÍ cólico clásico
│   └── Otro patrón → considerar Plan IA descarte
│
└── ESTRATEGIAS
    ├── 5 S's en orden
    ├── Cry classifier
    ├── Si > 30 min sin calmar → Plan IA
    └── Si cuidador/a agotad@ → safety frame + relevo + escalada SM
```

### 9.3 Wessel auto-monitor

```
Daily summary calculation:
  total_min_llanto_hoy = sum(episodios.duracion donde fecha = hoy)
  if total_min_llanto_hoy >= 180:
    flag_dia(hoy) = true

Weekly summary:
  dias_flagged_esta_sem = count(flag_dia donde semana = actual)
  if dias_flagged_esta_sem >= 3:
    flag_semana(actual) = true

Si flag_semana(actual) = true para 3 sem consecutivas:
  → Wessel confirmado
  → Trigger Plan IA descarte (modal)
  → Trigger EPDS adelantado si no se ha hecho
```

---

## 10 · Tono y copy

### 10.1 Principios canon Fase 0

- **Trauma-informed**: nunca minimizar (`"se pasará pronto"` ❌) · nunca alarmar (`"esto puede ser grave"` ❌).
- **Sin religiosidad** (`"Dios proveerá"` ❌).
- **Sin diminutivos forzados** (`"bebito"` ❌ · `"hij@"` ✅).
- **Sin militancia** (ni pro-lactancia · ni anti-vacunas).
- **Profesional cálido**, como una doula, no como una influencer.
- **Cita clínica** siempre con fuente + año (e.g. *"— NSBSP · Barr 2006"*).
- **Honestidad sobre incertidumbre**: *"Esto puede ser cólico clásico o algo más · si dudas, llama"*.

### 10.2 Mensajes canon (copy library)

**Hero manifiesto**:
> *"Las tres horas más largas del día."*
> *"Y las 3 más importantes para ti."*

**Sticky PURPLE**:
> *"Esto que estás viviendo es un período. Pasará. No es tu culpa. Aquí estamos."*

**Activación**:
> *"He visto que Lola está pasando ratos difíciles. Si quieres, activamos el libro de cólicos. Te ayudará a entender qué pasa y a no estar sol@."*

**Episodio empezando**:
> *"Empezamos contigo. Cuenta los minutos. Cuenta cuántas estrategias pruebas. Te lo guardamos todo."*

**Episodio largo · sugerencia relevo**:
> *"Llevas 32 minutos sola con Lola. ¿Le decimos a Pablo?"*

**5 S's introduction**:
> *"Cinco cosas que han ayudado a millones de bebés. Pruébalas en orden. Si no funcionan, está bien también."*

**Cry classifier resultado** (sueño detectado):
> *"Suena a sueño. Lola lleva despierta 2h 15 min · su ventana ideal era 2h."*

**Wessel confirmado**:
> *"Llevas 3 semanas con días duros. Esto suena a cólico clásico (variación normal). Vamos a descartar 5 cosas tratables · por si acaso."*

**Plan IA descarte cierre · cólico confirmado**:
> *"Hemos descartado 5 cosas. Es variación normal. Pasará a los 4 meses. Mientras: ánimo, descanso, relevo. Aquí seguimos."*

**Safety frame · 4 pasos**:
> *"Si sientes que no puedes más: pon a Lola en la cuna boca arriba · aléjate 5 min · respira · vuelve cuando estés mejor. La cuna es lo más seguro. Tú eres lo más importante."*

**Modo madrugada apertura**:
> *"Es de noche. Vamos por orden. Primero, ¿tiene fiebre?"*

### 10.3 Lo que NUNCA decimos

- ❌ *"¡No te preocupes!"*
- ❌ *"Eres una mamá increíble"* (presión + falsedad)
- ❌ *"Esto se pasa rápido"*
- ❌ *"Otros bebés lo pasan peor"* (comparación)
- ❌ *"Tu bebé está bien"* (no diagnosticamos)
- ❌ *"Felicidades por activar el libro"*
- ❌ *"¡Llevas 7 días tracking · qué constancia!"* (gamification tóxica)
- ❌ Términos como *"super-mami"*, *"warrior mom"*, *"tribu"*

---

## 11 · Datos · modelos · privacidad

### 11.1 Schema de datos persistidos

```ts
type Episodio = {
  id: string;
  ninoId: string;
  inicioTs: Date;
  finTs: Date | null; // null si en curso
  duracionMinutos: number; // computed
  intensidad: 1 | 2 | 3 | 4 | 5;
  estrategiasUsadas: ('swaddle'|'side'|'shush'|'swing'|'suck'|'feeding'|'walk'|'other')[];
  cuidadorPresente: 'yo'|'pareja'|'ambos'|'red';
  tipoFinal: 'colico'|'hambre'|'sueno'|'dolor'|'reflujo'|'aplv'|'otro'|'no_se' | null;
  cryClassifierResultado: { categoria: string, probabilidad: number }[] | null;
  notaTexto: string | null;
  fotoId: string | null; // referenced from Diario
};

type WesselStatus = {
  ninoId: string;
  semanaInicio: Date;
  diasConCriterio3h: number;
  cumpleSemana: boolean;
  semanasConsecutivas: number;
  confirmado: boolean;
};

type LibroColicosState = {
  ninoId: string;
  estado: 'pre-activacion'|'activable'|'activo'|'resuelto';
  activadoTs: Date | null;
  resueltoTs: Date | null;
  triggerActivacion: 'auto-3eps'|'cry-classifier'|'manual'|'modo-madrugada';
};
```

### 11.2 Lo que NO se guarda

- **Audio** del cry classifier · borrado en RAM tras inferencia.
- **Datos biométricos** brutos del bebé (PPG raw) · solo derivados.
- **Localización** durante episodios.

### 11.3 Sync cuenta compartida

- Episodios sincronizados con cifrado E2E (Supabase Realtime + AES-256).
- Co-cuidador/a ve los mismos episodios en tiempo real.
- Push síncronos vía Web Push API (PWA canon).

### 11.4 Cumplimiento

- **GDPR**: consent granular · derecho borrado · portabilidad PDF.
- **EU MDR 2017/745**: cribado clínico · clasificación probable Class IIa software · pathway en pilot DKV.
- **EU AI Act**: cry classifier clasifica como "limited risk" · obligaciones de transparencia (mostrar al usuari@ que es IA · accuracy publicada).
- **NSBSP messaging compliance**: educación PURPLE Crying alineada con guidelines oficiales.

---

## 12 · Métricas · dashboard

### 12.1 Métricas de producto (PostHog · canon Mimo stack)

| Evento | Properties |
| --- | --- |
| `colicos_libro_activado` | trigger, edad_hijo_dias |
| `colicos_episodio_iniciado` | hora_dia, edad_hijo_dias |
| `colicos_episodio_cerrado` | duracion_min, intensidad, estrategias_count, tipo_final |
| `colicos_5s_completado` | s_count, tiempo_total |
| `colicos_cry_classifier_run` | resultado_top_categoria, top_probabilidad, edad_hijo_dias |
| `colicos_relevo_solicitado` | duracion_episodio_min |
| `colicos_relevo_aceptado` | tiempo_respuesta_segundos |
| `colicos_wessel_confirmado` | dias_total_logged |
| `colicos_plan_ia_iniciado` | causa_que_lleva |
| `colicos_purple_completado` | scroll_depth |
| `colicos_safety_frame_visto` | timestamp_hora |
| `colicos_libro_resuelto` | edad_hijo_dias_al_resolver |

### 12.2 Métricas clínicas

- EPDS pre y post libro · diff promedio.
- Self-report "evité una visita a urgencias gracias al libro" · counter.
- Wessel confirmación rate vs sospecha rate.
- Time-to-relief (mediana minutos episodio · evolución cohortes).

---

## 13 · Roadmap

### 13.1 v0 · MVP · 6 meses

- Frames A-F implementados.
- Cry classifier on-device (Zoundream o ChatterBaby).
- 5 S's interactivo con cronómetros.
- Wessel auto-detect.
- Diario persistente sincronizado.
- Cross-ref Caca tracker, Lactancia, Sueño.
- Modo madrugada ruta 1.
- Relevo cuenta compartida.
- PURPLE education + safety.
- ES + EN.

### 13.2 v1.5 · 6-12 m post-launch

- Patrones aprendidos por hij@ (personalización IA local).
- Multi-idioma cry classifier (CA, FR, DE).
- Recomendación L. reuteri activa con sign-off legal y disclaimer.
- Notificación inteligente al co-cuidador/a (ML "ahora deberías ofrecer relevo").
- Export libro completo a PDF para llevar al pediatra.
- Sub-modo "post-cólicos · regulación 4-6m" para transición.

### 13.3 v2 · 12 m+

- Wearable ambient detección llanto (B2B · partners).
- Comunidad opt-in · grupos familias con cólicos misma fase.
- Telesalud lactanciera/asesora integrada (DKV partnership).
- Exportación a EHR (B2B · centros pediátricos).

---

## 14 · Riesgos y mitigaciones

| Riesgo | Severidad | Mitigación |
| --- | --- | --- |
| **Falso negativo clínico** (no detectamos enfermedad real, padre confiado) | 🔴 alta | Triage tree explícito + escalada agresiva ante cualquier signo de alarma + disclaimer "aquí no diagnosticamos" en cada pantalla |
| **Falso positivo** (alarmismo innecesario) | 🟡 media | Lenguaje atemperado + datos clínicos calibrados + escalada solo en signos canon |
| **Cry classifier fail en entorno real** (ruido, reverberación) | 🟡 media | Disclaimer accuracy 90 % + fallback manual + on-device garantizado |
| **Sobre-tracking causa ansiedad** | 🟡 media | Heatmap suave + insights orientados a tranquilizar + opción "no quiero ver stats" |
| **Modo coleccionista tóxico** ("debo trackear todo") | 🟡 media | Cero gamification · cero racha · "no pasa nada si no logueas" |
| **Incumplimiento MDR Class IIa** | 🔴 alta | Sign-off legal antes de v0 · vendor cry classifier CE-marked · pathway con DKV |
| **Privacy leak audio** | 🔴 alta | Audit técnico independiente + tests on-device + audit logs |
| **Liability si hij@ tiene problema serio** | 🔴 alta | Disclaimer canon Fase 0 + escalada urgente automatizada + insurance B2C |
| **L. reuteri recomendación equivocada** (formula-fed) | 🟡 media | Cross-check tipo alimentación antes de mostrar · canon "solo lactantes maternos" |
| **Adopción baja** (padres no abren libro) | 🟢 baja | Activación auto + entry desde Modo madrugada + card persistente Hoy |

---

## 15 · Decisiones abiertas

1. **Vendor cry classifier**: Zoundream (CE-marked · ES · 92 %) vs ChatterBaby (open · académico · 90.7 %) vs propio modelo TFLite. Recomendación: Zoundream para v0.
2. **L. reuteri recomendación**: pasiva v0 (educación) vs activa v1.5 (con sign-off legal). Recomendación: pasiva.
3. **Activación auto vs manual**: auto con modal vs solo manual. Recomendación: auto con modal opt-out.
4. **Audio guardar**: nunca (canon privacidad) vs opcional para feedback usuario. Recomendación: nunca canon.
5. **Modo arcoíris específico** para cólicos: ¿cambiar copy si activado? Recomendación: sí, atemperar manifiesto + sin "pasará a los 4 meses" agresivo.
6. **Score Wessel relajado** (Roma IV ≥ 1h vs Wessel ≥ 3h): ¿activar libro con criterio Roma IV más sensible? Recomendación: usar Roma IV para activación · Wessel para confirmación.
7. **Comunidad MVP**: ¿incluir grupos de apoyo en v0? Recomendación: NO · v2.
8. **Telesalud**: ¿botón directo a lactanciera/asesora en v0? Recomendación: NO · solo cross-ref a Modo madrugada.

---

## 16 · Anexos

### 16.1 Fuentes clínicas

- Wessel MA, Cobb JC, Jackson EB, Harris GS, Detwiler AC. *Paroxysmal fussing in infancy, sometimes called "colic"*. Pediatrics 1954.
- Benninga MA et al. *Childhood Functional Gastrointestinal Disorders: Neonate/Toddler*. Gastroenterology 2016 (Roma IV).
- Wolke D, Bilgin A, Samara M. *Systematic Review and Meta-Analysis: Fussing and Crying Durations and Prevalence of Colic in Infants*. J Pediatr 2017.
- Barr RG. *Crying as a trigger for abusive head trauma: a key to prevention*. Pediatr Radiol 2014.
- Karp H. *The Happiest Baby on the Block*. Bantam 2002.
- Indrio F, Riezzo G, et al. *Prophylactic use of L. reuteri in formula-fed healthy newborns: a randomized clinical trial*. JAMA Pediatr 2014.
- Sung V, D'Amico F, Cabana MD, et al. *Lactobacillus reuteri to Treat Infant Colic: A Meta-analysis*. Pediatrics 2018.
- Dunbar A, Goldfarb SH, et al. *Acoustic features of infant cries*. UCLA ChatterBaby Initiative.
- Zoundream / Hospital Clínic de Barcelona · clinical trial 2021.
- AAP Council on Sleep, *White noise and sleep guidelines*. AAP 2023.
- National Center on Shaken Baby Syndrome · *Period of PURPLE Crying*. dontshake.org.
- NICE NG143. *Fever in under 5s: assessment and initial management*. 2021.
- NICE NG9. *Bronchiolitis in children: diagnosis and management*. 2021.

### 16.2 Componentes del DS Mimo v0.2 referenciados

- `.cat-card.cat-salud` (estado base, doing, done, snoozed)
- `.chip.salud`
- `.chip-strip` (filtros)
- Botón hold-to-record (a definir como primitive nuevo en DS v0.3)
- Heatmap canónico (a definir como component v0.3)
- Slider intensidad 1-5 (primitive)
- Timer Lenia bold 56 px (a canon en DS v0.3)
- Sticky PURPLE banner (variant de `.cat-card` con borde 2 px ink)

### 16.3 Cross-ref con otros docs canon

- `wireframes-v2.html · §10.5 Módulo Cólicos` (frames lo-fi base).
- `wireframes-v2.html · §12 Modo madrugada` (ruta nocturna).
- `wireframes-v2.html · §14 Cuenta compartida` (relevo).
- `wireframes-v2.html · §10.2 Caca tracker` (BITSS · descartar APLV).
- `wireframes-v2.html · §10.3 Lactancia` (LATCH · descartar frenillo).
- `Notion · Journey Mimo · Postparto y reci nacido (0-3m)` (cuándo se activa).
- `Notion · Diferenciales Mimo vs referencia comercial` (canon trauma-informed).
- `prototype.html · landing` (entry point B2C).
- `design/v0.1/Mimo Product Components v0.1.html` (cat-card · chips · estados).
- `design/Mimo Design System v0.2.html` (tokens · primitives).

---

## 17 · Cierre · qué hace falta para arrancar

| Bloque | Status | Owner |
| --- | --- | --- |
| Spec PRD (este doc) | ✅ done v0.1 | Tito + Claude |
| Wireframes lo-fi 6 frames | ✅ done en `wireframes-v2.html §10.5` | Claude |
| Hi-fi en DS v0.2 | ⏳ pending | Claude Design |
| Vendor cry classifier · sign | ⏳ pending | Tito (DKV pilot) |
| Sign-off legal MDR | ⏳ pending | legal externo |
| Implementación frontend | ⏳ pending | ingeniería |
| Modelo TFLite on-device | ⏳ pending | ML / vendor |
| Tests clínicos pre-launch | ⏳ pending | clínico advisor |
| EPDS / PBA-5 baseline | ⏳ pending | producto + clínico |
| Localización ES + EN | ⏳ pending | content |
| Pilot DKV · go-live | ⏳ Q3 2026 | partnerships |

---

*PRD · Libro de Cólicos · Mimo v0.1 · canon Fase 0 · alineado con DS Mimo v0.2 · abril 2026*
