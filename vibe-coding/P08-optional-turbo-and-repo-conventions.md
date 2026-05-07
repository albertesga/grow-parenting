# P08 (optional) — Turborepo, pnpm, and latitude-like conventions

## Role

Document (or lightly codify) how OpenSpec **apply** work maps onto the repo’s real task runners, using [latitude-dev/latitude-llm](https://github.com/latitude-dev/latitude-llm) as the **reference shape** (not a mandatory copy).

## Reference layout (from public repo overview)

- **Workspaces:** `pnpm-workspace.yaml`, `apps/`, `packages/`, root `package.json`.
- **Task orchestration:** `turbo.json` pipelines (`build`, `lint`, `test`, …).
- **Quality:** `biome.json`, `vitest.config.ts`, `knip.json`.
- **Tooling / env:** `mise.toml`, `.env.example`, `docker-compose.yml`, `docker/`, `infra/`.
- **API / docs products:** `fern/` (API definitions), `docs/` (product documentation).
- **Assistant UX:** `.cursor/`, `.agents/skills/`, root `AGENTS.md`, `CLAUDE.md`, `.mcp.json`.
- **Existing root `specs/`:** treat as **non-OpenSpec** unless the team decides otherwise ([00-README.md](00-README.md)).

## Tasks for the assistant

1. **Update `openspec/project.md`** (started in P03) with a concise table:

   | Goal | Command |
   |------|---------|
   | Install | `pnpm install` |
   | Lint / format | `pnpm exec biome check …` (or repo’s actual script names) |
   | Typecheck / build | `turbo run build --filter=…` |
   | Tests | `turbo run test` / `vitest` as applicable |

   Use **`pnpm --filter <pkg>`** when a change’s tasks target a single workspace package.

2. **Align `package-areas.yaml`** with real `apps/*` and `packages/*` names so `[area-id]` prefixes in `tasks.md` are obvious to implementers.

3. **Docker / infra** — If changes touch `docker/` or `infra/`, add explicit `[workspace]` tasks to run compose / IaC validation scripts if they exist.

4. **Fern / SDKs** — If API surface is generated, add tasks to regenerate clients and note the generator command.

## Postconditions

- A new contributor can jump from `openspec/project.md` to the correct **pnpm/turbo** commands without asking chat.
- Area ids in tasks correspond to real folders.

## Optional

- Add a short `CONTRIBUTING.md` section “OpenSpec in this monorepo” linking to `docs/HANDBOOK.md` and `.agent/agents.md` (only if your project welcomes that doc change).
