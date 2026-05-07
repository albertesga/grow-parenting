# P01 — Audit and variables (single-repo monorepo)

## Role

You inventory a **single Git repository** (typical **pnpm + Turborepo** layout like [latitude-dev/latitude-llm](https://github.com/latitude-dev/latitude-llm)) and produce a **`CONFIG_BOOTSTRAP`** block for the next prompts.

## Preconditions

- Repository root is the workspace (contains root `package.json`, likely `pnpm-workspace.yaml`, often `turbo.json`).
- You may read but must not destroy existing assistant config (e.g. root `AGENTS.md`, `CLAUDE.md`, `.cursor/`, `.agents/`).

## Tasks

1. **Package manager & tasks**
   - Detect **pnpm / npm / yarn** (lockfiles, `package.json` `packageManager` field).
   - If `turbo.json` exists, note pipelines and named tasks you will reference in `openspec/project.md` later.

2. **Workspace layout**
   - List `apps/*` and `packages/*` (or `services/*`, `libs/*` if the repo uses other names).
   - Note top-level folders: `docs/`, `infra/`, `docker/`, `scripts/`, `fern/`, `examples/`, root **`specs/`** (if present — often **not** OpenSpec; see [00-README.md](00-README.md)).

3. **Existing OpenSpec / agent material**
   - Search for `openspec/`, `.agent/`, `.openspec.yaml`, `@fission-ai/openspec` in `package.json`.

4. **Area → path table (for task prefixes)**

   Define stable **`{{AREA_ID}}`** values (kebab-case, no spaces) and map each to a primary folder. Examples for a latitude-like tree:

   | `{{AREA_ID}}` | Primary path | Typical work |
   |---------------|--------------|--------------|
   | `apps-gateway` | `apps/gateway` | HTTP / edge API |
   | `apps-console` | `apps/console` | Web UI |
   | `packages-core` | `packages/core` | Shared domain / SDK |

   Every real change in `tasks.md` should use a prefix **`[area-id]`** from this table, plus **`[workspace]`** for repo-wide chores (OpenSpec housekeeping, codegen, sync scripts).

5. **Output**

   - Emit **`CONFIG_BOOTSTRAP`** (YAML or markdown table) with: `REPO_NAME`, `META_WORKSPACE_NAME`, `META_PACKAGE_NAME`, `ORCHESTRATOR_RULES_TITLE`, `PROFILES_SKILL_NAME`, `REQ_ID_PREFIX` (one for the whole repo, e.g. `LAT`), and the **full area table**.

## Verifiable postconditions

- Explicit list of `(area_id, path)` pairs.
- Documented decision: existing root `specs/` is **left untouched** vs repurposed (default: leave untouched; OpenSpec canon under `openspec/specs/`).

## Notes

- If the repo is **not** a JS monorepo, keep the area table small (e.g. single `app` area) and widen later.
