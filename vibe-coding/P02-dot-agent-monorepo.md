# P02 — `.agent/` tree for a single-repo monorepo

## Role

You create **`.agent/`** at the **repository root** as the single editable source for assistant policy, adapted to **one Git checkout** and **area-based** task prefixes (see P01).

Resolve all placeholders from **`CONFIG_BOOTSTRAP`** (no unresolved `{{...}}`).

## Preconditions

- P01 completed with an area table and naming variables.

## Postconditions

- `.agent/agents.md`, `.agent/rules/*.md`, `.agent/skills/openspec/{propose,apply,archive,explore}.md`, `.agent/workflows/openspec-{proposal,apply,archive}.md`, `.agent/config/package-areas.yaml`, `.agent/skills/profiles/README.md`.
- **No** `subrepo-*.tmpl` required (single repo). Optional: `.agent/templates/` only if you still want shared snippets.

## Tree to create

```text
.agent/
  agents.md
  config/
    package-areas.yaml
  rules/
    workspace-role.md
    context-retrieval.md
    package-scope-selection.md
    spec-authoring.md
    spec-vs-code.md
    mono-repo-tasks.md
    commit-style.md
  skills/
    openspec/
      propose.md
      apply.md
      archive.md
      explore.md
    profiles/
      README.md
  workflows/
    openspec-proposal.md
    openspec-apply.md
    openspec-archive.md
```

## `package-areas.yaml`

Example shape (edit paths and ids to match P01):

```yaml
version: 1
areas:
  - id: apps-console
    path: apps/console
    description: Web console UI
  - id: packages-core
    path: packages/core
    description: Shared packages
```

## `agents.md` template

```markdown
# {{META_WORKSPACE_NAME}} — AI agents (monorepo)

This repository is a **single Git root**: application code, shared packages, and OpenSpec live together.

## Workspace areas

| Area id | Path | Role |
| --- | --- | --- |
<!-- ONE ROW PER AREA FROM package-areas.yaml -->

## OpenSpec

- **Schema:** spec-driven (canonical specs under `openspec/specs/`).
- **Changes:** `openspec/changes/<change-id>/` at this repo root.
- **Project context for the CLI:** `openspec/project.md`.

## Skills

- `.agent/skills/openspec/propose.md`
- `.agent/skills/openspec/apply.md`
- `.agent/skills/openspec/archive.md`
- `.agent/skills/openspec/explore.md`

## Rules

- `.agent/rules/workspace-role.md`
- `.agent/rules/context-retrieval.md`
- `.agent/rules/package-scope-selection.md`
- `.agent/rules/spec-authoring.md`
- `.agent/rules/spec-vs-code.md`
- `.agent/rules/mono-repo-tasks.md`
- `.agent/rules/commit-style.md`

## Single source

Edit **only** `.agent/` for policy. Run **`npm run agents:sync`** to refresh IDE stubs (see P04).
```

## Rule content (must-have semantics)

### `workspace-role.md`

- One repo root; OpenSpec CLI runs here.
- **Canonical specs:** `openspec/specs/<capability>/spec.md` (do not also maintain a conflicting second canon under root `specs/` without an explicit team rule).
- **During apply:** implement under `apps/**`, `packages/**`, etc.; follow `openspec/project.md` for commands.
- **During archive:** merge deltas into `openspec/specs/` (and update `openspec/project.md` / docs index if your archive skill says so).

### `mono-repo-tasks.md`

- Every checkbox line starts with **`[area-id]`** from `package-areas.yaml` **or** `[workspace]` for repo-wide tasks (scripts, OpenSpec sync, codegen not tied to one app).
- Checklist file: `openspec/changes/<id>/tasks.md`.

### `package-scope-selection.md`

- Heuristics: which folder patterns map to which `area_id` (mirror your table; mention `apps/` vs `packages/` like latitude-llm).

### `context-retrieval.md`

- Read order: `.agent/agents.md` → active change under `openspec/changes/<id>/` → canonical `openspec/specs/**` → `openspec/project.md` → root `README.md` / `turbo.json` / `pnpm-workspace.yaml`.

### `spec-authoring.md` / `spec-vs-code.md` / `commit-style.md`

Adapt from the [multi-repo](../multi-repo/P02-orchestrator-dot-agent.md) pack: replace multi-repo delta paths with **spec-driven** delta rules (deltas still live under the change folder; canonical merge target is **`openspec/specs/`**).

## `openspec/*.md` skills

Copy the four skills from a working **spec-driven** OpenSpec repo or scaffold with the CLI, then ensure they mention:

- `npx openspec new change`, `validate --strict`, **`openspec/specs/`** reads before writing deltas.
- Task prefixes **`[area-id]`** and `[workspace]` consistent with `mono-repo-tasks.md`.

## Final check

- Grep `.agent/` for stale foreign product names and remove them.
- `package-areas.yaml` matches the `agents.md` table.
