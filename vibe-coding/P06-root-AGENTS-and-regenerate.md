# P06 — Root `AGENTS.md`, install, `agents:sync`

## Role

Align the **repository root** `AGENTS.md` with OpenSpec + `.agent/` (latitude-llm already ships `AGENTS.md` / `CLAUDE.md` — evolve rather than blindly replace). Then install dependencies and regenerate IDE stubs.

## Preconditions

- P02–P04 done.
- `openspec/AGENTS.md` exists or will be created (P03).

## Postconditions

- Root `AGENTS.md` includes the managed `<!-- OPENSPEC:START -->` … `<!-- OPENSPEC:END -->` block pointing at `@/openspec/AGENTS.md` (or a relative `openspec/AGENTS.md` if `@/` is unsupported).
- Clear statement: **single repo**; canonical specs under `openspec/specs/`; policy edits in `.agent/`.
- `npm install` + `npm run agents:sync` succeed.
- Generated files present: `.cursor/rules/openspec.mdc`, `.clinerules/openspec.md`, `.claude/CLAUDE.md`, `.codex/AGENTS.md`, skill stubs.

## Template (merge with existing root `AGENTS.md`)

```markdown
<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# {{META_WORKSPACE_NAME}} — AI instructions (monorepo)

Single Git repository. Product code under `apps/**`, `packages/**`, and related folders. **OpenSpec canonical specs:** `openspec/specs/<capability>/spec.md`. **Editable assistant policy:** `.agent/` (run `npm run agents:sync` after edits).

## Read first

- [.agent/agents.md](.agent/agents.md)
- [openspec/project.md](openspec/project.md)
- [docs/config/openspec/AGENTS.md](docs/config/openspec/AGENTS.md) (if present)

## CLI

```bash
npm install
npm run openspec -- list
npm run agents:validate
```
```

## Shell

```bash
npm install
npm run agents:sync
npm run agents:validate
```

## Reminder

Prefer editing `.agent/` over hand-editing `.cursor/rules/openspec.mdc`.
