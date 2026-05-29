# PRD · Libro de Salud
## Mimo · v0.1 · canon Fase 0

> Producto: **Mimo by The Child Lens** · Módulo: **Libro de Salud** (expediente clínico episódico del hij@) · Categoría DS: **🌡 Salud** (`--cat-salud-tint #E6E2D6` · `--cat-salud-ink #5C5648`).
> Status: ready for Claude Design + ingeniería · siguiendo `Mimo Design System v0.2` y canon de libros del `prototype.html`.

---

## 0 · TL;DR

El **Libro de Salud** es el **expediente clínico episódico** del hij@ · paralelo al Libro de Vacunas pero para todo lo demás. Centraliza: episodios agudos (fiebres · otitis · gastroenteritis · golpes · alergias · rashes · dentición), visitas pediátricas, medicaciones, pruebas/análisis, alergias confirmadas e información de emergencia (tipo sanguíneo · contactos médicos).

Es el **carnet sanitario digital** que la familia podía llevar al pediatra, al colegio o de viaje. Complementa, no solapa:

- 💉 **Vacunas** → eventos vacunales programados (canon AEPED).
- 📊 **Desarrollo** → crecimiento físico (OMS).
- 🌱 **Hitos** → adquisición de habilidades (Haizea-Llevant).
- 📓 **Diario** → memoria emocional (fotos · notas · audios).
- 📕 **Salud** → expediente clínico episódico · agudo · estructurado.

Bajo el Libro de Salud viven **sub-libros accionables temporales** cuando aplica:
- 📕 **Libro de Cólicos** (1 sem - 4 m · ya canon).
- 📕 *(Futuro)* Libro de Alergias (si confirmada).
- 📕 *(Futuro)* Libro de Dentición.

Sigue el canon de libros del prototype: **navbar dedicado tonal `salud` (paper-deep) · 4 tabs + FAB Log central · book-back X**.

**Por qué importa**: digitaliza la "Cartilla de Salud Infantil" AEPap, ahorra preguntas del pediatra ("¿cuándo fue la última otitis?"), detecta patrones (otitis recurrente · 4 episodios en 6 meses → posible derivación ORL), y prepara para colegio/viaje (carnet sanitario exportable).

---

## 1 · Contexto y problema · justificación research

### 1.1 Lo que ya existe en papel

| País | Documento | Equivalente digital Mimo |
| --- | --- | --- |
| España | Cartilla de Salud Infantil AEPap · Documento de Salud Infantil (DSI) por CCAA | 📕 Libro de Salud + 💉 Libro de Vacunas + 📊 Libro de Desarrollo |
| Suecia | BVC-journal (Barnavårdcentralen) | igual |
| Dinamarca | Sundhedsbog | igual |
| Reino Unido | Personal Child Health Record · "Red Book" | igual |
| USA | AAP Bright Futures personal record | igual |
| Francia | Carnet de santé | igual |
| Alemania | Untersuchungsheft + U-Heft | igual |

**Conclusión**: el carnet de salud infantil es un canon institucional global. Hoy es papel · Mimo lo digitaliza con valor añadido (sync, export, búsqueda, cross-ref, educación contextual).

### 1.2 Referentes digitales

| Producto | Modelo | Qué adoptamos |
| --- | --- | --- |
| **Apple Health · Health Records** | PHR (Personal Health Record) | Estructura por dimensiones · alergias críticas siempre visibles |
| **NHS App · Medical Record** | Acceso a historial NHS | Visitas pediátricas + medicaciones |
| **MyChart (Epic)** | Portal paciente | No adoptamos UI · sí concepto longitudinal |
| **Babylon · K Health** | Symptom log | NO adoptamos (diagnostic-style choca con canon Fase 0) |
| **AEPap "EnFamilia"** | Educación + tablas síntomas | Adoptamos contenido + canon AEPap |

### 1.3 Pain del cuidador/a

| Pain | Frecuencia | Driver |
| --- | --- | --- |
| "¿Cuándo fue la última otitis?" en consulta pediátrica | recurrente | Memoria humana imposible |
| "¿Qué antibiótico tomó?" sin historial | recurrente | Pediatra cambia / centro cambia |
| "¿Es alérgico a algo?" en urgencias | crítico | Sin datos fiables = sobre-cautela / riesgo |
| "Llévense la cartilla al cole" | cada otoño | Papel se pierde / olvida |
| "Detectar patrones recurrentes" (4 otitis/año) | crónico | Sin tracker → derivación ORL tardía |
| Tipo sanguíneo desconocido | emergencias | No se hace estudio rutinario hasta los 6 a |
| Medicación crónica · gestión recetas | TDAH · asma · alergias | Mezcla con vida diaria sin estructura |

### 1.4 Lo que Mimo resuelve

- **Carnet sanitario digital** con info de emergencia siempre a mano.
- **Historial episódico** searchable y exportable.
- **Cross-ref con Vacunas** (reacciones post-vacuna como episodios de Salud).
- **Detección de patrones** (alerta "Lola: 4 otitis en 6 meses · podría valer la pena hablar con ORL").
- **Sub-libros accionables** (Cólicos hoy · Alergias y Dentición v1.5+).
- **Export PDF** estructurado para pediatra, urgencias, colegio, viaje.
- **Educación contextual** (síntomas a vigilar por edad · canon AEPED).

### 1.5 ¿Por qué no es redundante con otros libros?

| Diferencia | Vacunas | Salud | Diario |
| --- | --- | --- | --- |
| Naturaleza | Programada · canon AEPED | Reactiva · cuando pasa algo | Memoria emocional |
| Estructura | Calendario fijo de eventos | Historial libre de episodios | Fotos · notas · audios |
| Trigger | Edad del hij@ · canon | Síntoma / consulta médica | Voluntad del cuidador/a |
| Output | Carnet vacunal | Carnet sanitario | Álbum |
| Cross-ref | Tracker fiebre 72h post-vacuna → Salud | Cólicos sub-libro · alergias confirmadas | Auto-entrada desde Salud (foto receta · audio del hij@ tosiendo) |

---

## 2 · Usuarios y casos de uso

### 2.1 Persona primaria

**Pablo · 38 a · Lola 18 m · consulta pediátrica martes 11:30**
La pediatra le pregunta: *"¿Cuándo fue la última otitis y qué antibiótico le pusieron?"*. Pablo abre Mimo → Libro de Salud → busca *"otitis"* → 3 episodios este año + medicación. La consulta cierra en 8 minutos en lugar de 25.

### 2.2 Personas secundarias

- **María · cuidadora principal**: anota cada episodio en el momento, alimenta el libro.
- **Carmen · monoparental con red de apoyo**: pasa el carnet a la abuela cuando le toca cuidar.
- **Cuidador@ en colegio/guardería**: necesita acceso de emergencia (alergias críticas · contactos médicos · permiso medicación).
- **Familia adoptiva**: registra antecedentes desde la edad de adopción · no antes.
- **Embarazo arcoíris previo**: usa libro de salud para registrar hij@ actual sin contadores celebratorios.

### 2.3 Casos de uso

| ID | Caso | Surface |
| --- | --- | --- |
| UC-1 | Registrar episodio puntual (fiebre, otitis) | FAB Log → Episodio |
| UC-2 | Buscar historial antes de consulta pediátrica | Pestaña Historial |
| UC-3 | Mostrar info emergencia (tipo sanguíneo, alergias) | Pestaña Carnet |
| UC-4 | Anotar visita pediátrica + diagnóstico + tratamiento | FAB Log → Visita |
| UC-5 | Registrar alergia confirmada (post-prueba) | FAB Log → Alergia |
| UC-6 | Anotar medicación con dosis y duración | FAB Log → Medicación |
| UC-7 | Subir foto del informe de un análisis | FAB Log → Prueba |
| UC-8 | Export PDF para pediatra/colegio/viaje | Pestaña Carnet → Exportar |
| UC-9 | Activar Libro de Cólicos como sub-libro | Card en Hoy del libro |
| UC-10 | Detectar patrón recurrente | Alerta auto desde IA |
| UC-11 | Cribaje rápido en chat → guardar resultado al libro | Botón "guardar al libro de salud" |
| UC-12 | Educación "síntomas a vigilar a 18 m" | Pestaña Educación |

---

## 3 · Outcomes y KPIs

### 3.1 Outcomes esperados a 6 m

| Outcome | Métrica | Target v0 |
| --- | --- | --- |
| Consultas pediátricas más eficientes | Self-report "llegué con info ordenada a la consulta" | ≥ 60 % usuari@s |
| Reducción uso papel | "¿Sigues anotando en libreta?" → No | ≥ 50 % |
| Detección patrones | Alertas auto del libro confirmadas por familia | ≥ 30 % de las generadas |
| Confianza en emergencias | "Sé el tipo de sangre / alergias de mi hij@" | +40 % vs baseline |
| Sub-libro Cólicos activado | Familias 1-4 m que abren Libro Cólicos vía Salud | ≥ 70 % |

### 3.2 KPIs operativos

- **Activación**: % familias que registran ≥ 1 episodio en primeros 3 m.
- **Engagement**: episodios registrados/familia/sem (esperado bajo · target ≥ 2/mes promedio).
- **Search rate**: búsquedas en Historial / familia activa.
- **Export rate**: exports PDF / familia activa / trimestre.
- **Carnet completeness**: % carnets con tipo sanguíneo + alergias + contactos rellenados.

---

## 4 · Scope

### 4.1 In scope · v0 (MVP · 6 m)

- **4 tabs internos**: Hoy · Historial · Carnet · Educación.
- **FAB Log central · "+ Registrar"** con 5 tipos: Episodio · Visita · Alergia · Medicación · Prueba.
- **Sub-libro Cólicos integrado** (entry destacado en Hoy del libro cuando aplica edad 1 sem - 4 m).
- **Historial cronológico** searchable + filtrable.
- **Carnet sanitario** con secciones: identificación · tipo sanguíneo · alergias confirmadas · medicaciones activas · contactos médicos.
- **Export PDF** estructurado para pediatra · colegio · viaje · urgencias.
- **Cross-ref** automática: reacción post-vacuna · medicación pediatra · alergia detectada.
- **Educación contextual** por edad · canon AEPED + AAP.
- **Modo emergencia** · pantalla full-screen con info crítica accesible aún con app bloqueada (PWA quick-action).
- **Multi-perfil** · un Libro de Salud por hij@.
- **Sync cuenta compartida** (canon §14).
- ES + EN.

### 4.2 Out of scope · v0

- Integración con sistemas sanitarios oficiales (NHS, Seguridad Social) → v2.
- Recordatorios automáticos de citas pediátricas → v1.5.
- OCR de recetas papel → v1.5.
- Recetas electrónicas → fuera scope (regulado).
- Visualizaciones de pruebas (gráfica de hemograma) → v1.5.
- Group chat con pediatra → fuera scope (legal).

### 4.3 v1.5 (post-validación · 6-12 m)

- Sub-libro **Alergias** (cuando confirmada · tracker reacciones · protocolo emergencia).
- Sub-libro **Dentición** (línea de tiempo dentición · educación · dolor management).
- OCR de recetas papel → estructurado.
- Visualización pruebas estructuradas (hemograma · análisis comunes).
- Recordatorios inteligentes citas pediátricas.
- Patrones IA enriquecidos ("3 otitis · ¿quieres que abra el chat con info para la derivación?").

### 4.4 v2 (escala)

- Integración FHIR con sistemas sanitarios EU.
- Telesalud directa lactanciera/pediatra dentro del libro.
- Export estructurado a HCE/EHR del centro pediátrico (B2B DKV).

---

## 5 · Research clínico canon

### 5.1 Marcos adoptados

| Fuente | Qué adoptamos | Cómo se aplica |
| --- | --- | --- |
| **AEPap · DSI** Documento de Salud Infantil (España) | Estructura del carnet sanitario · secciones canónicas | Carnet (tab) |
| **AEPap "EnFamilia"** | Educación familias canónica | Tab Educación · síntomas a vigilar |
| **AAP Bright Futures** | Personal record + Anticipatory Guidance | Tab Educación · paralelo EN |
| **NICE NG143/NG9/NG232/NG217/CG84/CG102** | Triage clínico | Cross-ref con Modo madrugada + alertas |
| **WHO ICD-10** (subset pediátrico común) | Categorización episodios | Estructura datos · diagnósticos |
| **MedDRA** | Reacciones adversas medicamentos | Sección medicación |
| **EAACI** (European Academy Allergy) | Cribado alergias · protocolo | Sub-libro Alergias v1.5 |
| **Cartilla Vacunación AEPED 2026** | Cross-ref vacunas | Reacciones post-vacuna como episodios Salud |
| **NSBSP PURPLE Crying** | Cross-ref Cólicos | Sub-libro Cólicos |

### 5.2 Adaptado

| Fuente | Adaptación |
| --- | --- |
| **Apple Health Records** | Adoptamos estructura PHR · NO sincronización HealthKit en v0 |
| **NHS Red Book** | Adoptamos secciones canónicas · adaptamos a digital |
| **MyChart Epic** | Concepto historial longitudinal · UI propia DS Mimo |

### 5.3 Descartado

| Fuente | Por qué |
| --- | --- |
| Symptom checker AI-driven (Ada · Buoy) | Choca con canon "aquí no diagnosticamos" |
| Wearables continuos (Owlet · Snuza) | v2+ partnership · no MVP |
| Telesalud humana integrada v0 | Legal complexity · v2 con DKV |
| OCR auto v0 | Accuracy variable · UX frustration en MVP |

---

## 6 · Arquitectura del libro · canon de libros Mimo

### 6.1 Anatomy canon del libro Mimo (patrón del prototype)

Todos los libros respetan este patrón:

```
┌─────────────────────────────────────────┐
│ Status bar                              │
├─────────────────────────────────────────┤
│ top-header                              │
│  ├── eyebrow ("Categoría · contexto")   │
│  ├── screen-title ("Libro de X")        │
│  └── book-back X (right)                │
├─────────────────────────────────────────┤
│ Tab 1 · Tab 2 · Tab 3 · Tab 4           │ ← navbar dedicado · tonal categoría
│ (con FAB Log central + tab activo)      │
├─────────────────────────────────────────┤
│                                         │
│ Contenido del tab activo                │
│ (book-hero + callouts + cards)          │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Ejemplos canon del prototype**:
- Libro de Vacunas → tabs `Calendario · Fiebre · Carnet · Settings` · tonal **gold** `#FBF5EA`.
- Libro de Hitos → 3 cells `Hitos · Log · Carnet` · tonal **mint** `#EEF7EE`.
- Libro de Embarazo → 4 tabs · tonal **coral** `#FBEEE5`.
- Libro de Sueño → 4 tabs · tonal **mint nocturno**.
- Libro de Alimentación → 4 tabs · tonal **coral**.

### 6.2 Libro de Salud · estructura canon

```
Libro de Salud · Lola · 18 m
│
├── eyebrow: "Salud · expediente clínico"
├── screen-title: "Libro de salud"
├── book-back X → vuelve a Hoy
│
├── navbar dedicado · tonal salud (paper-deep #E8E1CF · ink #5C5648)
│   ├── tab 1 · Hoy (default)
│   ├── tab 2 · Historial
│   ├── FAB central + Log (chip "Registrar")
│   ├── tab 3 · Carnet
│   └── tab 4 · Educación
│
└── Contenido por tab (ver §8)
```

### 6.3 Cómo encaja con los otros libros

| Origen | Cómo entra a Libro de Salud |
| --- | --- |
| 💉 Libro de Vacunas · tracker fiebre 72h | Auto-crea episodio Salud "Fiebre post-vacuna" |
| 💬 Modo madrugada · triage tree con resultado | Botón "Guardar al Libro de Salud" |
| ⊕ Quick log · tipo "Salud" | Va al FAB Log del libro |
| 🌱 Libro de Hitos · cribado con alerta | Sugiere abrir Libro de Salud |
| 📕 Libro de Cólicos (sub-libro) | Vive bajo Libro de Salud · entry destacado en Hoy del libro |
| 🌙 Libro de Sueño · regresión + síntomas | Solo si síntoma clínico · cross-ref |

### 6.4 Sub-libros bajo Libro de Salud

| Sub-libro | Cuándo se activa | Estado |
| --- | --- | --- |
| 📕 **Cólicos** | 1 sem - 4 m + trigger episodios | ✅ v0 (PRD ya canon) |
| 📕 **Alergias** | Tras confirmación clínica de alergia | ⏳ v1.5 |
| 📕 **Dentición** | Detección 1er diente / signos | ⏳ v1.5 |
| 📕 **Asma / atopia** | Diagnóstico clínico crónico | ⏳ v2 |
| 📕 **TDAH / neurodivergencia** | Diagnóstico clínico crónico | ⏳ v2 con cuidado canon |

---

## 7 · Funcionalidades core

### 7.1 Tab Hoy · overview del libro

**Composición**:
- **Hero card** con avatar + edad + estado salud general ("al día" · "1 episodio activo" · "vigilando X").
- **Sub-libro Cólicos** (si aplica edad) · card destacada `cat-salud-tint` con borde gold sutil.
- **Último episodio** · card con tipo + fecha + estado (resuelto · activo · seguimiento).
- **Próxima visita** pediátrica · card con fecha + motivo (si agendada).
- **Alerta de patrón** (auto-IA) · si detectada recurrencia.
- **Alergias críticas** · sticky banner si alguna confirmada (anafilaxia, medicamento, etc.).
- **Acceso rápido a Modo emergencia**.

### 7.2 Tab Historial

**Composición**:
- **Filtros chip-strip**: Todo · Episodios · Visitas · Medicación · Pruebas · Por categoría síntoma.
- **Búsqueda** ("otitis", "amoxicilina", "fiebre marzo").
- **Lista cronológica inversa** · agrupada por mes.
- **Cada entrada**:
  - Icon tipo (🌡 episodio · 🩺 visita · 💊 medicación · 🧪 prueba · 🐝 alergia).
  - Fecha grande Lenia.
  - Título canónico + sub-meta.
  - Estado (✓ resuelto · ● en curso · ⚠ seguimiento).
  - Cross-ref si aplica (e.g. "post-vacuna hexavalente 4m").

### 7.3 Tab Carnet · sanitario digital

**Secciones canon (basadas en DSI AEPap)**:

1. **Identificación**
   - Nombre, fecha nacimiento, edad cronológica/corregida (preemie), sexo, peso/talla actual.
2. **Identificación médica**
   - Tarjeta sanitaria (foto o número).
   - Seguro privado (si aplica).
3. **Tipo sanguíneo**
   - Si conocido. Si no: "Pendiente de confirmar".
4. **Alergias confirmadas**
   - Lista con protocolo de emergencia por alergia.
5. **Medicaciones activas**
   - Crónicas (TDAH, asma, etc.). Con dosis y frecuencia.
6. **Antecedentes relevantes**
   - Familiares (madre/padre/hermano/abuelo) · pediátricos heredables.
7. **Contactos médicos**
   - Pediatra · centro · ORL · alergólogo · dentista · emergencia 24h.
8. **Centro de referencia**
   - Hospital pediátrico cercano · urgencias.
9. **Exportar PDF** (destinatario: pediatra / colegio / viaje internacional).

### 7.4 Tab Educación

**Composición**:
- **Educación contextual a la edad**: "Lola 18 m · síntomas a vigilar este mes".
- **Tablas canon AEPED**: cuándo es alarma vs cuándo es normal (canon fever NICE NG143 traffic light · canon respiratorio NG9 · etc.).
- **Recursos sobre alergias** (introducción canónica de alergenos cross-ref Alimentación).
- **Sub-libro Cólicos · educación PURPLE** si edad 1 sem - 4 m.
- **Cuándo llamar al pediatra** · canon.
- **Cuándo ir a urgencias** · canon.
- **Cuándo es 112** · canon.

### 7.5 FAB Log central · "+ Registrar"

Sheet bottom al pulsar FAB · 5 opciones:

```
🌡 Episodio de salud
   → Tipo (fiebre · otitis · gastro · golpe · rash · respiratorio · alergia leve · otro)
   → Fecha y hora · duración estimada
   → Síntomas asociados (checkboxes)
   → Temperatura (si fiebre · calculadora paracetamol auto)
   → Foto (opcional · oído · rash)
   → Acción tomada (casa · pediatra · urgencias)
   → Resultado (resuelto · pendiente · seguimiento)
   → Notas libres

🩺 Visita pediátrica
   → Fecha · centro · pediatra
   → Motivo
   → Diagnóstico
   → Tratamiento prescrito
   → Próxima revisión
   → Foto del informe (opcional)

💊 Medicación
   → Nombre · dosis · frecuencia · duración
   → Inicio · fin (si curso definido)
   → Razón
   → Foto receta (opcional)
   → Auto-recordatorio (toma siguiente)

🐝 Alergia confirmada
   → Sustancia
   → Tipo (alimentaria · medicamento · ambiental · contacto)
   → Severidad (leve · moderada · anafiláctica)
   → Confirmada por · fecha
   → Protocolo emergencia
   → Auto-add a Carnet · sticky

🧪 Prueba / análisis
   → Tipo (sangre · orina · imagen · cultivo · otro)
   → Fecha
   → Foto informe
   → Resultado
   → Anotaciones libres
```

### 7.6 Cross-ref automática

| Trigger | Auto-acción |
| --- | --- |
| Vacuna administrada en Libro Vacunas + fiebre > 38 °C en tracker 72h | Auto-crea episodio "Fiebre post-vacuna [tipo]" en Libro Salud |
| Modo madrugada · triage tree con outcome `⚠ pediatra mañana` | Sugiere "guardar episodio al Libro de Salud" |
| Recetas en visita pediátrica | Auto-añade a Medicación |
| Caca tracker BITSS · patrón sospechoso APLV | Sugiere registrar como "alergia bajo investigación" |
| Quick log "Llanto > 3h" recurrente | Sugiere activar sub-libro Cólicos |

### 7.7 Detección de patrones · IA

Reglas canon que disparan alerta:

```
PATRÓN_OTITIS_RECURRENTE:
  IF count(episodios.tipo = "otitis" en últimos 6 meses) >= 3:
    ALERTA: "Lola: 3+ otitis en 6 meses · puede valer la pena hablar con ORL"
    CTA: "Exportar resumen → llevar a pediatra"

PATRÓN_FIEBRE_RECURRENTE_SIN_FOCO:
  IF count(episodios.tipo = "fiebre" Y campo "diagnóstico" = "viral inespecífico") >= 4:
    ALERTA: "Hablamos con tu pediatra de revisión general"

PATRÓN_ANTIBIÓTICO_REPETIDO:
  IF count(medicaciones.tipo = "antibiótico" en últimos 6 meses) >= 3:
    EDUCACIÓN: canon AEPED uso prudente antibióticos

PATRÓN_ALERGIA_BAJO_INVESTIGACIÓN:
  IF episodios.notas mencionan ≥ 2 veces "tras comer X":
    SUGERIR registrar como alergia bajo investigación · cross-ref Alimentación
```

### 7.8 Modo emergencia

**Trigger**: shake del móvil · botón flotante · acceso rápido PWA quick action.

**Composición**:
- Pantalla full-screen sin chrome.
- Tipografía grande Lenia bold.
- **Tipo sanguíneo** (si conocido).
- **Alergias críticas** rojas (anafilaxia).
- **Medicaciones activas**.
- **Contactos médicos** con botón llamar 1-tap.
- **Centro pediátrico de referencia** con mapa.
- Accesible sin desbloquear app (PWA install) · igual que carnet vacunal en papel.

### 7.9 Export PDF

3 plantillas según destinatario:

```
1 · Pediatra · "Resumen clínico"
   → Identificación + cronología 12m + medicaciones + alergias + visitas
   → Formato denso · 2-3 páginas

2 · Colegio / guardería · "Carnet sanitario escolar"
   → Identificación + tipo sangre + alergias + medicación crónica + contactos emergencia + permisos
   → Formato visual · 1 página + adjunto vacunas

3 · Viaje internacional · "Health summary"
   → Bilingüe ES/EN
   → Identificación + alergias + medicación + último episodio + vacunas internacionales
   → 1 página · QR a versión digital online
```

---

## 8 · Especificaciones por pantalla

### 8.1 Convenciones DS aplicadas

- Frame mobile-first 360 · radius 22 · borde `var(--ink)`.
- Tipografía: títulos **Lenia** medium 18-22 · body **Helvena** regular 14-15.
- Categoría: `🌡 SALUD` · `--cat-salud-tint #E6E2D6` · `--cat-salud-ink #5C5648`.
- Tonal navbar libro: paper `#F2EDE0` · ink active `#5C5648`.
- FAB Log Salud: `--cat-salud-tint` fill · ink stroke.
- Estados card: state-doing · state-done · state-snoozed · state-attention.
- Sin sombras agresivas. Sin rojo médico. Coral solo para 112 reales.

### 8.2 Frame A · Tab Hoy

**Composición vertical**:
1. **Top header**: eyebrow `Salud · expediente clínico` + screen-title `Libro de salud` + book-back X.
2. **Hero card**: avatar mint Lola + edad + estado `🌱 Al día · sin episodios activos`.
3. **Sub-libro Cólicos** (si aplica edad 1 sem - 4 m): card cat-salud-tint con borde gold sutil + CTA `Abrir libro de cólicos →`.
4. **Card · Último episodio**: tipo + fecha + estado. Si > 30 días: "Último episodio · otitis · 12 mar · resuelto".
5. **Card · Próxima visita** (si agendada): pediatra · fecha · motivo.
6. **Alertas patrón** (si activas): banner cat-salud-tint borde 1.5 px ink + CTA.
7. **Alergias críticas** (si confirmadas): sticky banner naranja muted (no rojo) + acceso rápido emergencia.
8. **Quick actions**: chips `Registrar episodio` · `Ver historial` · `Carnet sanitario`.
9. **Navbar Libro Salud**: Hoy active · Historial · ⊕ · Carnet · Educación.
10. **Bottom nav canon Mimo**.

### 8.3 Frame B · Tab Historial

**Composición**:
1. Top header igual.
2. **Filtros chip-strip** scroll horizontal: Todo · 🌡 · 🩺 · 💊 · 🧪 · 🐝 · por edad · por categoría.
3. **Búsqueda** input expandible.
4. **Lista cronológica inversa** agrupada por mes.
5. **Cada entrada**:
   - Strip izquierda con día grande Lenia.
   - Icon tipo (Helvena medium uppercase caption).
   - Título Lenia 15 px medium.
   - Sub-meta Helvena 12 · gris.
   - Estado dot (✓ resuelto · ● activo · ⚠ seguimiento).
6. **Vacío** estado: `Aquí registramos lo que pasa · cuando pase.` (sin culpa por estar vacío).
7. **Navbar Salud** activo en Historial.

### 8.4 Frame C · Detalle de episodio (sheet bottom)

**Composición**:
1. Sheet 90 % viewport.
2. Header con tipo (`🌡 EPISODIO · OTITIS`) + fecha grande.
3. **Cuerpo**:
   - Síntomas (chips no editables).
   - Duración.
   - Temperatura (si registrada · con curva mini si > 1 medida).
   - Acción tomada (casa · pediatra · urgencias).
   - Diagnóstico (si conocido).
   - Medicación asociada (linkea a entrada).
   - Foto adjunta (si la hay · oído rojo · rash · informe).
   - Notas libres.
4. **Acciones pie**:
   - `Editar`
   - `Marcar como resuelto / seguimiento`
   - `Compartir con pediatra (PDF)`
   - `Borrar` (con confirmación)

### 8.5 Frame D · Tab Carnet

**Composición**:
1. Top header igual.
2. **Hero carnet**: avatar + nombre + edad + foto tarjeta sanitaria (placeholder si no).
3. **Sección Tipo sanguíneo**: dato o `Pendiente de confirmar` con CTA `Anotar tras análisis`.
4. **Sección Alergias confirmadas**: lista con severidad por colores muted + protocolo emergencia por alergia.
5. **Sección Medicaciones activas**: nombre · dosis · frecuencia · prescritor.
6. **Sección Antecedentes**: heredables familia.
7. **Sección Contactos médicos**: lista con CTA `llamar` 1-tap.
8. **Sección Centro referencia**: hospital + dirección + mapa link.
9. **Acciones pie**: `📤 Exportar PDF` (3 plantillas) · `📱 Modo emergencia` (full-screen).

### 8.6 Frame E · Tab Educación

**Composición**:
1. Top header igual.
2. **Hero educativo**: "Síntomas a vigilar · Lola 18 m" (edad-aware).
3. **Card por tema** (paper-soft + borde fino):
   - Fiebre (tabla NICE NG143 traffic light).
   - Tos · respiración (NICE NG9).
   - Vómitos · diarrea (NICE CG84).
   - Llanto inconsolable (Wessel + NSBSP).
   - Rash (NICE CG102).
   - Golpe cabeza (NICE NG232).
   - Convulsión (NICE NG217).
4. **Cuándo llamar / urgencias / 112**: 3 cards apiladas con criterios canon.
5. **Sub-libro Cólicos · educación PURPLE** (si edad 1 sem - 4 m).
6. **Footer fuentes**: AEPap · NICE · AAP · NSBSP.

### 8.7 Frame F · Modal "+ Registrar" (FAB Log)

**Composición**:
1. Sheet bottom 60 % viewport.
2. Header: `¿Qué quieres anotar?`.
3. **5 opciones grandes** vertical:
   - 🌡 Episodio
   - 🩺 Visita pediátrica
   - 💊 Medicación
   - 🐝 Alergia confirmada
   - 🧪 Prueba / análisis
4. Tap → abre form contextual (frame G según tipo).

### 8.8 Frame G · Form registrar episodio

**Composición**:
1. Header con tipo dinámico.
2. **Stepper de 3 pasos** sutil:
   - 1 · Qué y cuándo
   - 2 · Síntomas y duración
   - 3 · Acción y notas
3. **Inputs progresivos**:
   - Tipo (chips)
   - Fecha y hora (default ahora)
   - Síntomas asociados (multi-select)
   - Temperatura (si fiebre · calculadora paracetamol auto)
   - Foto (opcional)
   - Acción tomada
   - Resultado / estado
   - Notas libres
4. **Acción primaria**: `Guardar`. Acción secundaria: `Cancelar`.

### 8.9 Frame H · Modo emergencia

**Composición full-screen**:
1. Background `paper-deep` con tipografía Lenia bold extra-grande.
2. **Nombre del hij@** Lenia 56 px.
3. **Edad** subtítulo.
4. **Tipo sanguíneo** Lenia 84 px central (si conocido).
5. **Alergias críticas** lista con icono atención + tipo + protocolo.
6. **Medicación activa** lista.
7. **Contactos médicos** con botón `📞 Llamar` 1-tap.
8. **Centro referencia** + dirección + mapa.
9. **Volver al libro** discreto inferior.
10. Accesible sin desbloquear app (PWA install).

---

## 9 · Lógica clínica · automatismos

### 9.1 Auto-creación de episodios desde otros libros

```
Trigger: Libro de Vacunas · tracker fiebre 72h · Tª >= 38°C
Acción: 
  CREATE episodio_salud {
    tipo: "fiebre_post_vacuna",
    fuente: "auto_libro_vacunas",
    fecha: now,
    contexto: "Hexavalente 2ª · 12 jul · 11:30",
    vinculo_vacuna_id: <id>
  }
  NOTIFY user "Hemos anotado la fiebre post-vacuna en el libro de salud."
```

### 9.2 Sugerencia de patrón

```
Trigger nightly batch:
  para cada hij@:
    contar(episodios.tipo = "otitis" en últimos 180 días)
    si >= 3:
      crear_alerta_patron {
        tipo: "otitis_recurrente",
        severidad: "moderada",
        sugerencia: "Lola: 3 otitis en 6 meses · puede valer la pena hablar con ORL",
        cta_principal: "Exportar resumen para pediatra",
        cta_secundaria: "Hablar con Modo madrugada"
      }
```

### 9.3 Cross-ref con Cólicos

```
Si edad_hijo entre 1 sem y 4 m:
  mostrar entry destacado en Tab Hoy · "📕 Libro de cólicos · estamos contigo"
  si trigger_cólicos_activado:
    estado: "activo"
    icon: pulse
    CTA: "Abrir libro de cólicos"
  si no:
    estado: "disponible"
    CTA: "Conocer · activar si lo necesitas"
```

### 9.4 Cross-ref con Modo madrugada

```
Trigger en chat: triage_tree.outcome = "⚠ pediatra mañana" o "🚨 urgencias"
  mensaje IA: "¿Quieres que guarde esto al Libro de Salud para que lo lleves al pediatra?"
  on accept:
    CREATE episodio_salud {
      tipo: <triage_tree_name>,
      fuente: "chat_ia_triage",
      sintomas: <triage_inputs>,
      acción_recomendada: <triage_outcome>
    }
```

---

## 10 · Tono y copy · canon library

### 10.1 Principios canon Fase 0

- Trauma-informed · sin alarmismo · sin minimización.
- "Aquí no diagnosticamos. Aquí estamos." sticky en Educación.
- Cita clínica siempre con fuente + año.
- Estado vacío saludable es positivo: *"Aquí registramos lo que pasa · cuando pase"*.
- Sin militancia anti-medicación · respeto decisiones familias.

### 10.2 Mensajes canon

**Hero Tab Hoy · al día**:
> *"Sin episodios activos · respira."*

**Hero Tab Hoy · con seguimiento**:
> *"Vamos a por la otitis · día 3 de antibiótico."*

**Alerta patrón otitis recurrente**:
> *"Lola: 3 otitis en 6 meses. Es algo común a esta edad, pero quizás vale la pena que tu pediatra eche un vistazo. ¿Te preparo un resumen?"*

**Estado vacío Historial**:
> *"Aquí registramos lo que pasa · cuando pase. No es un libro que tenga que estar lleno."*

**Carnet · tipo sanguíneo pendiente**:
> *"Lo descubriremos cuando le hagan el primer análisis · no hay prisa."*

**Modo emergencia · sin alergias confirmadas**:
> *"Sin alergias conocidas. Si descubres alguna, la añadimos aquí."*

**Sub-libro Cólicos · entry**:
> *"📕 Libro de cólicos · estamos contigo."* (no "activar" agresivo)

**Cierre PDF export**:
> *"Tu pediatra te lo agradecerá."*

**Confirmación borrado**:
> *"¿Borramos esta entrada? Borrar es definitivo · pero no judging."*

### 10.3 Lo que NUNCA decimos

- ❌ *"¡Felicidades por mantener el libro al día!"*
- ❌ *"Eres una madre ejemplar"*
- ❌ *"Tu hij@ está enfermo"* (no diagnosticamos)
- ❌ *"Llevas X días sin un episodio · racha!"* (gamification tóxica)
- ❌ *"Compárate con otros hij@s"*
- ❌ Diminutivos forzados · religiosidad · militancia.

---

## 11 · Datos · modelos · privacy

### 11.1 Schema datos persistidos

```typescript
type EpisodioSalud = {
  id: string;
  ninoId: string;
  tipo: 'fiebre'|'otitis'|'gastroenteritis'|'golpe'|'rash'|'respiratorio'|'alergia_leve'|'cólico'|'otro';
  fechaInicio: Date;
  fechaFin: Date | null;
  sintomas: string[];
  temperaturaMaxima: number | null;
  duracionEstimada: 'horas'|'1_dia'|'2-3_dias'|'semana'|'mas';
  accionTomada: 'casa'|'pediatra'|'urgencias'|'112';
  diagnostico: string | null;
  tratamiento: string | null;
  medicacionAsociadaId: string | null;
  fotoId: string | null;
  notas: string | null;
  estado: 'activo'|'resuelto'|'seguimiento';
  fuente: 'manual'|'auto_vacunas'|'auto_chat_triage'|'auto_quick_log';
  vinculos: {
    vacunaId?: string;
    chatThreadId?: string;
    sublibroId?: string; // colicos, alergias, denticion
  };
};

type VisitaPediatrica = {
  id: string;
  ninoId: string;
  fecha: Date;
  centro: string;
  pediatra: string;
  motivo: string;
  diagnostico: string | null;
  tratamientoPrescrito: string | null;
  proximaRevision: Date | null;
  fotoInformeId: string | null;
  notas: string | null;
};

type Medicacion = {
  id: string;
  ninoId: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  inicio: Date;
  fin: Date | null;
  razon: string;
  prescritor: string | null;
  fotoRecetaId: string | null;
  tipoUso: 'agudo'|'cronico';
  episodioVinculadoId: string | null;
};

type AlergiaConfirmada = {
  id: string;
  ninoId: string;
  sustancia: string;
  tipo: 'alimentaria'|'medicamento'|'ambiental'|'contacto'|'venenosa';
  severidad: 'leve'|'moderada'|'anafilactica';
  fechaConfirmacion: Date;
  confirmadaPor: string | null;
  protocoloEmergencia: string;
  visibleEnCarnet: boolean;
  visibleEnModoEmergencia: boolean;
};

type PruebaAnalisis = {
  id: string;
  ninoId: string;
  tipo: 'sangre'|'orina'|'imagen'|'cultivo'|'otro';
  fecha: Date;
  fotoInformeId: string | null;
  resultadoTextual: string | null;
  notas: string | null;
};

type CarnetSanitario = {
  ninoId: string;
  tarjetaSanitariaNumero: string | null;
  tipoSanguineo: string | null;
  centroReferencia: string | null;
  contactosMedicos: Array<{
    rol: 'pediatra'|'orl'|'alergologo'|'dentista'|'urgencias'|'otro';
    nombre: string;
    telefono: string;
  }>;
  antecedentesFamiliares: string | null;
};
```

### 11.2 Privacy canon

- **Cifrado at-rest** AES-256 (datos clínicos PHI).
- **Sync E2E** vía Supabase Realtime con cuenta compartida.
- **GDPR** consent granular · derecho borrado · portabilidad.
- **HIPAA-ready** schema para futura entrada USA.
- **Fotos** (informes, recetas, rashes) cifradas con keys del hij@.
- **Audio** (si en notas) on-device · NO subir.
- **Modo emergencia** accesible sin desbloquear app (lock screen widget) · solo info que el usuari@ marca explícitamente como "visible en emergencia".

### 11.3 Compliance

- **EU MDR 2017/745**: Libro de Salud canónicamente clasificado como software médico Class IIa (educación + alertas patrón).
- **EU AI Act**: detección patrones IA = "limited risk" · transparencia obligatoria.
- **GDPR art 9** (datos especiales salud) · base legal: consentimiento explícito.
- **Pediatric data**: minor data protections especiales (FERPA/COPPA si scale USA).

---

## 12 · Métricas · dashboard

### 12.1 Eventos PostHog

| Evento | Properties |
| --- | --- |
| `salud_libro_abierto` | source: 'hoy_card'\|'navbar_directo'\|'chat'\|'colicos' |
| `salud_episodio_registrado` | tipo, accion_tomada, edad_hijo_meses, fuente |
| `salud_visita_registrada` | centro, motivo |
| `salud_medicacion_registrada` | tipo_uso, agudo_cronico |
| `salud_alergia_confirmada` | tipo, severidad |
| `salud_prueba_registrada` | tipo |
| `salud_historial_buscado` | query, results_count |
| `salud_carnet_abierto` | section |
| `salud_carnet_completitud` | porcentaje_campos_rellenos |
| `salud_pdf_exportado` | plantilla: 'pediatra'\|'colegio'\|'viaje' |
| `salud_modo_emergencia_activado` | trigger: 'shake'\|'fab'\|'pwa_quick_action' |
| `salud_educacion_visto` | tema, scroll_depth |
| `salud_patron_detectado` | tipo_patron, confirmado_por_familia |
| `salud_subbookicolico_activado` | trigger |
| `salud_episodio_auto_creado` | fuente |

### 12.2 Métricas clínicas

- **Carnet completeness**: % carnets con ≥ 5 secciones rellenas.
- **Time-to-record**: tiempo medio desde episodio hasta registro.
- **Search-to-resolution**: tap historial → resultado → tap detalle (segundos).
- **PDF efficacy**: self-report "el pediatra usó el PDF" post-visita.
- **Pattern alerts confirmed**: % alertas patrón que la familia confirma como útiles.

---

## 13 · Roadmap

### 13.1 v0 · MVP · 6 m

- 4 tabs canon: Hoy · Historial · Carnet · Educación.
- FAB Log con 5 tipos.
- Sub-libro Cólicos integrado (vive bajo Salud · entry destacado).
- Auto-creación episodios desde Vacunas tracker fiebre.
- Cross-ref Modo madrugada triage tree → guardar.
- Detección patrones (otitis recurrente · fiebre sin foco · antibióticos repetidos).
- Export PDF 3 plantillas (pediatra · colegio · viaje).
- Modo emergencia full-screen.
- Edición/borrado entradas.
- Sync cuenta compartida.
- ES + EN.

### 13.2 v1.5 · 6-12 m post-launch

- Sub-libro **Alergias** activable.
- Sub-libro **Dentición** activable.
- OCR de recetas papel.
- Visualización pruebas estructuradas (gráfica hemograma).
- Recordatorios inteligentes citas pediátricas.
- Patrones IA enriquecidos.

### 13.3 v2 · 12 m+

- Integración FHIR sistemas sanitarios EU.
- Telesalud directa dentro del libro (DKV partnership).
- Sub-libros asma · TDAH · neurodivergencia (con cuidado canon).
- Export estructurado a EHR pediátricos (B2B).
- Modelo PWA install offline-first emergencia.

---

## 14 · Riesgos y mitigaciones

| Riesgo | Severidad | Mitigación |
| --- | --- | --- |
| Familia se siente vigilada · "tracker tóxico" | 🟡 media | Estado vacío saludable es positivo · cero gamification · cero racha · "no es un libro que tenga que estar lleno" |
| Falso positivo patrón (3 otitis es normal a 18m) | 🟡 media | Algoritmo conservador + sugerencia ("puede valer la pena") no afirmación |
| Solapamiento con Diario | 🟡 media | Roles claros: Salud = clínico estructurado · Diario = emocional libre. Cross-link inteligente |
| Solapamiento con Vacunas | 🟢 baja | Vacunas = eventos programados · Salud = todo lo demás. Cross-ref de reacciones post-vacuna como ÚNICO punto de contacto |
| Privacy leak emergencia (alguien ve alergias sin permiso) | 🟡 media | Solo info que usuari@ marca explícitamente como "visible en emergencia" |
| MDR Class IIa compliance | 🔴 alta | Sign-off legal antes v0 · pathway con DKV pilot |
| Olvidan tipo sanguíneo · carnet incompleto | 🟢 baja | "Pendiente de confirmar" en lugar de campo vacío · sin culpa |
| Liability si pediatra usa info incompleta | 🔴 alta | Disclaimer canon · "no sustituye historia clínica oficial · es complemento" |
| Foto receta legible | 🟡 media | Guías UX en captura · OCR auto v1.5 |
| Alertas patrón asustan | 🟡 media | Lenguaje trauma-informed · "puede valer la pena" · cero "tu hij@ tiene problema" |

---

## 15 · Decisiones abiertas

1. **Hoy vs default tab**: ¿default Hoy o Historial? Recomendación: Hoy (overview).
2. **FAB Log central** o **botón inline en cada tab**: Recomendación: FAB central canon de libros.
3. **Auto-import desde Libro de Vacunas**: ¿on/off configurable? Recomendación: on default · opt-out.
4. **Detección patrones**: ¿solo otitis y fiebres recurrentes en v0 o más reglas? Recomendación: 4 reglas v0, ampliable.
5. **Modo emergencia**: ¿accesible sin biometric o requiere unlock? Recomendación: sin unlock pero solo info explícitamente marcada como pública para emergencia.
6. **PDF export gratuito vs Premium**: Recomendación: gratuito en MVP (es feature mínima · canon).
7. **Alergia bajo investigación** como entidad propia o nota: Recomendación: nota en v0 · entidad propia v1.5.
8. **Sub-libro Cólicos como botón destacado en Hoy del libro de Salud** o sólo en Hoy global de la app: Recomendación: ambos · canon §10.5.

---

## 16 · Anexos

### 16.1 Fuentes clínicas

- AEPap · Programa de Salud Infantil (PSI) · Documento de Salud Infantil (DSI) por CCAA.
- AEPED · Vacunas + reacciones canon AEPED 2026.
- AAP · Bright Futures Health Supervision · 4th edition.
- NHS · Personal Child Health Record (Red Book).
- WHO · International Classification of Diseases (ICD-10) pediatric.
- NICE NG143 (fever), NG9 (bronchiolitis), NG232 (head injury), NG217 (epilepsies), CG84 (gastroenteritis), CG102 (meningitis).
- EAACI · European Academy of Allergy guidelines.
- MedDRA · Medical Dictionary for Regulatory Activities.

### 16.2 Componentes DS Mimo v0.2 referenciados

- `.book-screen` · pattern canon de libro
- `.book-back` (X dismiss)
- `.book-hero-orb` (avatar mint/coral/blush)
- `.book-hero` con eyebrow + screen-title
- Tonal navbar `.health-phone-nav` (a definir como variante en DS v0.3 con `--cat-salud-tint`)
- `.cat-card.cat-salud` con estados
- `.callout.gold` (educación · canon)
- `.chip-strip` (filtros)
- FAB Log central tonal salud (a canon en DS v0.3)
- Sticky banner para alergias críticas (a canon en DS v0.3)
- Modo emergencia full-screen pattern (a canon en DS v0.3 · variante de pantalla)

### 16.3 Cross-ref con otros docs canon

- `wireframes-v2.html · §10.5 Cólicos` (sub-libro).
- `prototype.html · libros existentes` (patrón navbar canon).
- `PRD-libro-colicos-v0.1.md` (sub-libro detallado).
- `PRD-modo-madrugada-v0.1.md` (cross-ref triage trees).
- `Notion · Journey Mimo · Postparto + Crianza` (eventos clínicos por etapa).
- `Notion · Diferenciales Mimo vs referencia comercial` (canon trauma-informed).
- `design/v0.1/Mimo Product Components v0.1.html` (cat-card · chips · estados).
- `design/Mimo Design System v0.2.html` (tokens · primitives).

---

## 17 · Cierre · qué hace falta para arrancar

| Bloque | Status | Owner |
| --- | --- | --- |
| Spec PRD (este doc) | ✅ done v0.1 | Tito + Claude |
| Wireframes lo-fi 8 frames | ⏳ pending | Claude |
| Hi-fi en DS v0.2 | ⏳ pending | Claude Design |
| Definir variante tonal `health-phone-nav` en DS v0.3 | ⏳ pending | DS owner |
| Sign-off legal MDR Class IIa | ⏳ pending | legal externo |
| Implementación frontend | ⏳ pending | ingeniería |
| Cross-ref sub-libro Cólicos | ⏳ pending | producto + ingeniería |
| Modelos patrón IA (otitis recurrente · fiebre sin foco) | ⏳ pending | ML + clinical |
| Plantillas PDF (3) | ⏳ pending | content + diseño |
| Modo emergencia PWA install | ⏳ pending | ingeniería |
| Validación con pediatra real | ⏳ pending | clinical advisor |
| Localización ES + EN | ⏳ pending | content |
| Pilot DKV · go-live | ⏳ Q3 2026 | partnerships |

---

*PRD · Libro de Salud · Mimo v0.1 · canon Fase 0 · alineado con DS Mimo v0.2 + canon libros del prototype · abril 2026*
