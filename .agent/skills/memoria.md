# Skill · memoria

Tras implementar y verificar · actualiza la memoria del proyecto para que
el próximo agente (humano o claude) parta del conocimiento actualizado.

## Cuándo usar

- Tras commit · siempre evalúa si la memoria necesita actualizarse
- Especialmente: cuando introduces canon nuevo, anti-pattern nuevo,
  primitive nuevo, o cambias workflow

## Tabla de triggers · qué actualizar

| Trigger | Archivo | Cómo |
|---|---|---|
| Introduces canon nuevo o derogas viejo | ADR en `docs/decisions/{NNNN}-{slug}.md` | Copia `0000-template.md` |
| Descubres anti-pattern nuevo (resolved o vivo) | `CLAUDE.md` (sección "Anti-patrones") | Bullet de 1 línea con ref a commit |
| Descubres patrón implícito en código no canon | `.claude/PATTERNS.md` | Sección nueva o append |
| Cambia stack o workflow | `docs/HANDBOOK.md` | Actualizar sección relevante |
| Añades primitive al DS | DS HTML · sección documentada + demo | Add a `design/Grow Design System v0.2.html` |
| Cambias mapping libro → tono / libro → fuente | `CLAUDE.md` tabla + `.agent/rules/palette-tonal.md` | Edit ambas |
| Cambias rule del harness | `.agent/rules/{rule}.md` + propaga si aplica | Edit + revisa AGENTS.md |

## Reglas por tipo de actualización

### ADR nueva

Cuándo:
- Cambio que establece canon (primitive, pattern, decisión técnica)
- Cambio que deroga ADR existente
- Cambio con trade-offs que merezcan documentación evaluable

Cómo:
1. Copia `docs/decisions/0000-template.md` → `docs/decisions/{NNNN}-{slug}.md`
2. `{NNNN}` · siguiente número libre · check con `ls docs/decisions/`
3. `{slug}` · kebab-case corto descriptivo
4. Rellena: Status (Proposed/Accepted/Deprecated), Context, Decision,
   Consequences, Alternatives considered, References
5. Si esta ADR deroga otra · marca la vieja `Status: Deprecated by ADR-{NNNN}`
6. Update `docs/decisions/README.md` con la nueva entrada

### CLAUDE.md (anti-patterns)

Cuándo:
- Detectaste anti-pattern que un agente futuro puede repetir
- Resolviste un bug que vino de un anti-pattern · documentar para prevenir

Cómo:
1. Edit `CLAUDE.md` sección "Anti-patrones detectados"
2. Append 1 línea: `❌ {descripción corta} (commit `{hash}`)`
3. Si crítico · también update `AGENTS.md` "Anti-patrones rápidos"

### `.claude/PATTERNS.md`

Cuándo:
- Encuentras patrón que está en código pero NO documentado en ADR ni
  CLAUDE.md
- Es implícito pero importante (handlers naming, state convention, etc.)

Cómo:
1. Edit `.claude/PATTERNS.md`
2. Sección nueva con título descriptivo
3. Code snippet · explicación corta · referencias a archivos/líneas
4. Si el patrón merece canon · promueve a ADR

### `docs/HANDBOOK.md`

Cuándo:
- Cambia stack (nueva dependencia, nuevo tool)
- Cambia workflow (commits, push, branching)
- Cambia glosario (nuevo término · libro nuevo · primitive nuevo)

Cómo:
1. Edit sección relevante
2. Mantén corto · si crece >300 líneas, splittea en docs separados

### DS HTML (nuevo primitive)

Cuándo:
- Implementaste primitive nuevo y lo canonizaste (con ADR previa)

Cómo:
1. Edit `design/Grow Design System v0.2.html`
2. Encuentra la sección correcta (§A heros, §B navbar, §E chips, §G landing, etc.)
3. Añade markup demo + CSS canónico + spec annotation
4. Verifica HTTP 200 sobre DS post-edit

### `.agent/rules/{rule}.md`

Cuándo:
- La rule cambia (typography canon update, palette nueva familia, etc.)

Cómo:
1. Edit la rule
2. Actualiza ejemplos ✓/✗ si aplica
3. Si la rule afecta `AGENTS.md` (resumen) · propaga
4. Si afecta `CLAUDE.md` · propaga

## Reglas

1. **No actualices memoria si no es necesario** · over-documentation
   ensucia · solo si hay valor real para el próximo agente

2. **ADR > CLAUDE.md > PATTERNS.md** · jerarquía de importancia:
   - ADR = canon evaluable, decisiones formales
   - CLAUDE.md = pointers rápidos, anti-patterns conocidos
   - PATTERNS.md = patrones implícitos sin canon formal

3. **Commit aparte para memoria** · si actualizas docs tras un commit
   feature/fix · haz commit separado:
   ```
   docs(adr): ADR-0017 · {decisión} · justifica commit {hash}
   ```

4. **Mantén consistencia** · si actualizas una tabla en CLAUDE.md ·
   verifica que la misma tabla en AGENTS.md y rules/ está sincronizada

## Anti-patterns

- ❌ Crear ADR para todo · solo para decisiones con trade-offs reales
- ❌ Update CLAUDE.md con detalles que deberían ir a ADR
- ❌ Olvidar actualizar `docs/decisions/README.md` con la ADR nueva
- ❌ Memoria inconsistente entre AGENTS.md, CLAUDE.md, .agent/rules/

## Output

Memoria actualizada · próximo agente parte de un canon coherente.

## Links

- `.agent/skills/verify.md` (skill previa)
- `docs/decisions/0000-template.md` (template ADR)
- `docs/decisions/README.md` (índice ADRs)
- `CLAUDE.md` (pointer rápido)
- `.claude/PATTERNS.md` (patrones implícitos)
