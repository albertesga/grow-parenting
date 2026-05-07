# P03 — OpenSpec **spec-driven** + root `package.json`

## Role

At the **repository root**, wire the OpenSpec CLI for the default **single-repo** workflow: **`spec-driven`**. Canonical behaviour specs live under **`openspec/specs/<capability>/spec.md`**; project context for assistants and scripts lives in **`openspec/project.md`**.

## Preconditions

- P02 done (`.agent/` exists).
- Node version compatible with `@fission-ai/openspec` (see package engines).

## Postconditions

- Root `package.json` with `openspec`, `agents:sync`, `agents:validate` scripts (same names as [multi-repo P03](../multi-repo/P03-orchestrator-openspec-and-npm.md) so habits transfer). Example:

```json
{
  "name": "{{META_PACKAGE_NAME}}",
  "private": true,
  "description": "{{META_WORKSPACE_NAME}}",
  "engines": { "node": ">=20.19.0" },
  "devDependencies": {
    "@fission-ai/openspec": "^1.3.1"
  },
  "scripts": {
    "openspec": "openspec",
    "openspec:list": "openspec list",
    "openspec:specs": "openspec list --specs",
    "openspec:validate": "openspec validate --strict",
    "openspec:version": "openspec --version",
    "agents:sync": "bash scripts/sync-agents.sh",
    "agents:validate": "bash scripts/validate-repo.sh"
  }
}
```

- `openspec/schemas/spec-driven/` containing `schema.yaml` and `templates/{proposal,design,spec,tasks}.md` (copied from the installed package).
- `openspec/config.yaml` selecting schema **`spec-driven`** (paths relative to `openspec/`).
- **`openspec/specs/`** exists (may be empty until P05 seeds platform capabilities).
- **`openspec/project.md`** exists with real commands (pnpm/turbo filters, biome, vitest, etc.).
- `openspec/changes/` exists (and `openspec/changes/archive/` if you use that convention).
- **`openspec/AGENTS.md`** present (CLI `openspec update` or hand-written stub).

## Tasks

### 1. Install the CLI

```bash
npm install -D @fission-ai/openspec@^1.3.1
```

(Align version with org policy.)

### 2. Copy the **spec-driven** schema bundle

From the installed package (paths may vary slightly by version):

```bash
mkdir -p openspec/schemas/spec-driven/templates
cp node_modules/@fission-ai/openspec/schemas/spec-driven/schema.yaml openspec/schemas/spec-driven/
cp node_modules/@fission-ai/openspec/schemas/spec-driven/templates/*.md openspec/schemas/spec-driven/templates/
```

### 3. `openspec/config.yaml`

Create `openspec/config.yaml` per your CLI version. A typical **spec-driven** shape:

```yaml
schema: spec-driven
```

If your version requires explicit paths, add keys per upstream docs (e.g. pointing at `schemas/spec-driven/schema.yaml`).

### 4. `openspec/project.md`

Write a short, accurate index:

- What the monorepo is (one paragraph).
- **How to run** lint / typecheck / unit tests / e2e (copy from root `package.json` scripts; for latitude-like repos, mention `pnpm`, `turbo run`, `biome check`, `vitest`, etc.).
- Link to `.agent/agents.md` and to `openspec/specs/README.md` (created in P05).

### 5. `tasks.md` template and **area prefixes**

The stock **spec-driven** `tasks.md` template uses `- [ ] 1.1 …` without area tags. To match **P02** (`mono-repo-tasks.md`), extend your **local** template or skill text so tasks look like:

```text
- [ ] 1.1 [apps-console] Update UI copy for export flow
- [ ] 1.2 [workspace] Run openspec validate --strict
```

Keep the `- [ ]` checkbox format **exactly** so apply tooling can parse it.

### 6. Materialize `openspec/AGENTS.md`

```bash
npm install
npx openspec update
```

If the CLI does not emit the file, create a short `openspec/AGENTS.md` linking to `.agent/agents.md` and describing `new change` / `validate`.

### 7. Optional `.openspec.yaml` at repo root

Some versions expect a root `.openspec.yaml` after `openspec new change`; follow CLI output. Do not commit secrets.

## Check

```bash
npx openspec --version
```

After P05 seeds at least one capability:

```bash
npx openspec validate "<change-id>" --strict
```
