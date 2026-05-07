# `prompt-openspec/mono-repo` — quick start

Modular prompts for an AI assistant to bootstrap **OpenSpec in a single Git repository** shaped like a modern JS/TS monorepo (reference: [latitude-dev/latitude-llm](https://github.com/latitude-dev/latitude-llm): **pnpm** workspaces, **Turborepo**, `apps/`, `packages/`, root `docs/`, optional root `specs/`, `.cursor/`, `.agents/skills/`, `turbo.json`, `biome.json`, `vitest`, Docker/infra folders).

## Layout this pack assumes

```text
<repo-root>/
  apps/                    # deployable apps (or services)
  packages/                # shared libraries
  docs/                    # handbook + links into OpenSpec (recommended)
  openspec/
    specs/                 # canonical capabilities (spec-driven) — REQUIRED for this pack
    changes/               # active + archived changes
    schemas/spec-driven/   # schema + templates (from P03)
  .agent/                  # single source for assistant rules + skills
  scripts/sync-agents.sh   # same idea as multi-repo pack
```

**Important:** Many monorepos (including latitude-llm) already have a top-level `specs/` directory for **product or PromptL assets**. This pack stores **OpenSpec canonical behaviour specs** under **`openspec/specs/<capability>/spec.md`** so the OpenSpec CLI’s default **spec-driven** flow stays valid. Do **not** overwrite an existing root `specs/` tree without an explicit human decision; use `openspec/specs/` as the OpenSpec canon unless you intentionally merge into another layout.

## Recommended order

1. [P01-audit-and-variables.md](P01-audit-and-variables.md)
2. [P02-dot-agent-monorepo.md](P02-dot-agent-monorepo.md)
3. [P03-openspec-spec-driven-and-npm.md](P03-openspec-spec-driven-and-npm.md)
4. [P04-scripts-sync-and-validate.md](P04-scripts-sync-and-validate.md)
5. [P05-handbook-and-platform-specs.md](P05-handbook-and-platform-specs.md)
6. [P06-root-AGENTS-and-regenerate.md](P06-root-AGENTS-and-regenerate.md)
7. [P07-cursor-commands-and-dot-agents.md](P07-cursor-commands-and-dot-agents.md)
8. [P08-optional-turbo-and-repo-conventions.md](P08-optional-turbo-and-repo-conventions.md)

## Variables (fill in P01)

| Variable | Example | Purpose |
|----------|---------|---------|
| `{{REPO_NAME}}` | `latitude-llm` | Short repo / product label |
| `{{META_WORKSPACE_NAME}}` | `Latitude LLM` | Human title in `agents.md` / CLAUDE header |
| `{{META_PACKAGE_NAME}}` | `latitude` | Root `package.json` `name` |
| `{{ORCHESTRATOR_RULES_TITLE}}` | `Latitude OpenSpec (monorepo)` | `.cursor/rules/openspec.mdc` description |
| `{{PROFILES_SKILL_NAME}}` | `latitude-profiles` | Profiles aggregate skill stub name |
| `{{REQ_ID_PREFIX}}` | `LAT` | Single prefix for requirement IDs (one repo) |
| **Area table** | see P01 | Maps task prefixes such as `[apps-console]` → `apps/console` (or `[packages-db]` → `packages/db`) |

## Invariants for this mono-repo track

- **One** Git root: all implementation paths live under this checkout.
- OpenSpec **spec-driven**: maintain **`openspec/specs/<capability>/spec.md`** as canonical; maintain **`openspec/project.md`** for how to run lint/test/build.
- Changes live under **`openspec/changes/<id>/`**; deltas merge into **`openspec/specs/`** on archive (follow your skill text).
- **Single source** for editable assistant policy: **`.agent/`**; regenerate IDE stubs with `npm run agents:sync`.

## Relation to `multi-repo/`

If you later split apps into separate Git repos, migrate to [../multi-repo/00-README.md](../multi-repo/00-README.md): move canonical specs from `openspec/specs/` into each product repo’s `docs/specs/` and switch schema to `multi-repo`.
