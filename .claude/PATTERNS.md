# Grow · patrones implícitos del código

Pointer para agentes sin context. Patrones que están en el código pero NO documentados en ADRs ni CLAUDE.md. Si un patrón canon merece ADR, créalo en `docs/decisions/`.

## Navigation · `data-goto`

Todos los buttons del shelf, sub-libros y navbar global usan `data-goto="X"` para navegar a un screen.

```html
<button data-goto="hitos">→ Libro hitos</button>
<button data-goto="salud-emergencia">→ Modo emergencia</button>
```

Dispatch table en JS (línea ~15600): `if (name === 'X') { ... }` por screen.

## Tonal · color por libro

Mapping canon (también en `CLAUDE.md`):
- mint · hitos · sueño · perfil · diario (default)
- coral · embarazo · alimentación · cólicos
- gold · vacunas
- blush · lactancia
- lavender · desarrollo
- paper-deep · salud (AEPap DSI)

Aplica a · `book-hero.{tono}` · `.{libro}-phone-nav` background · sub-libro highlights · chip cycling.

## Log filter · per source

Map central en JS (`logSourceCategoryFilter`):

```js
const logSourceCategoryFilter = {
  vacunacion:   ['vacuna', 'temperatura', 'antitermico', 'sintoma'],
  embarazo:     ['patadas', 'med', 'tension', 'embarazo'],
  sueno:        ['sueno', 'toma', 'panal', 'sintoma'],
  alimentacion: ['biberon', 'alimento']
};
```

Cualquier libro nuevo añade su entry · sin entry = 19 categorías completas (Hoy fallback).

## localStorage keys

Naming canon: `grow.{módulo}.{key}.v{N}`

- `grow.chat.main.v1` · chat messages persistidos
- `grow.chat.3am.optedIn` · flag de opt-in del modo nocturno
- `grow.chat.welcomed` · primer visit marcado

Versionar (`.v1`, `.v2`) cuando el schema cambie · evita romper a usuarios existentes.

## Sheet stub pattern

Para cualquier acción que aún no tiene UI real:

```html
<button type="button"
  data-open-sheet
  data-sheet-title="Título corto"
  data-sheet-copy="Stub · descripción de qué hará la acción real cuando se implemente.">
  CTA
</button>
```

Handler global en JS · captura todos los `[data-open-sheet]` y muestra sheet bottom con title + copy.

## Sub-libro entry

Cuando un libro tiene sub-libros (canon ADR-0006), el padre muestra un entry destacado con tonal gold sutil:

```html
<article class="health-sublibro-card">
  <div class="health-sublibro-tag">📕 Sub-libro</div>
  <h3>Libro de cólicos</h3>
  <p>1 sem - 4 m · estamos contigo si llega esa etapa.</p>
  <button class="health-action ghost" data-goto="colicos">Abrir libro de cólicos →</button>
</article>
```

Border gold subtle (`rgba(184,151,63,0.32)`) · background paper + radial highlight · NO infla el shelf.

## Cross-ref bidireccional

Sub-libro y libro padre se referencian mutuamente:

- **Padre → sub-libro** · entry destacado en Hoy del padre + en Educación
- **Sub-libro → padre** · cross-ref en cólicos a salud (cómo registrar episodio)
- **Auto-cross-ref** · fiebre 72h post-vacuna en Libro Vacunas → auto-crea episodio en Libro Salud

Cuando crees un sub-libro nuevo, valida que ambos lados se referencian. Skill futura `/verify-cross-refs` audita esto.

## Anti-rojo médico

NUNCA usar `#FF0000` ni `red` para urgencias clínicas. Canon:

- **Urgencias reales** (112, anafilaxia, modo emergencia) · `var(--coral-base) #F2A57A`
- **Advertencias** · `var(--coral-subtle) #FBE5D6` o `var(--blush-subtle)`
- **Border de elementos críticos** · `1.5px solid var(--coral-base)` (no fill)

Razón: ADR-0011 trauma-informed copy · el rojo médico es alarmante y contraproducente en momentos de crisis (3AM, post-pérdida, primer parto).

## Trauma-informed copy quick check

Antes de añadir copy nuevo, verifica:

- ❌ Gamification ("¡Felicidades por X racha!" · "Streak de N días")
- ❌ Comparativas ("Tu peque va detrás del N% de niños")
- ❌ Diminutivos forzados ("peque-cito" · "mami")
- ❌ Militancia ("La lactancia materna es lo mejor")
- ❌ "Tu peque está enfermo" (no diagnosticamos)
- ✓ "Aquí no diagnosticamos · aquí estamos"
- ✓ "Hiciste lo correcto al venir aquí"
- ✓ Estado vacío saludable es POSITIVO: "Aquí registramos lo que pasa · cuando pase"
- ✓ Cita clínica siempre con `FUENTE · AÑO`

Detalle completo en ADR-0011.

## escapeHtml en innerHTML

Siempre que metas variables en `innerHTML` template literal · pasa por `escapeHtml(value)` (función helper · línea ~10800).

```js
root.innerHTML = `<strong>${escapeHtml(item.title)}</strong>`;
```

Skipear esto crea bugs visuales (caracteres especiales rotos) y XSS si en el futuro el data viene del usuario.
