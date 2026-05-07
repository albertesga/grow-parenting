# P05 — Handbook (`docs/`) + seed **`openspec/specs/platform-*`**

## Role

You add human-oriented handbook files under **`docs/`** (latitude-llm already uses **`docs/`** at repo root) and seed **15** canonical **`platform-*`** capabilities under **`openspec/specs/`** (OpenSpec **spec-driven** canon), each with minimal English snapshot content.

## Preconditions

- `openspec/specs/` exists (P03).
- `{{REQ_ID_PREFIX}}` chosen (e.g. `LAT`).

## Postconditions

- `docs/HANDBOOK.md` — snapshot + RFC 2119 contract; states that **normative OpenSpec capabilities** live under `openspec/specs/`.
- `docs/README.md` — index into handbook + specs index.
- `docs/config/openspec/AGENTS.md` — assistant entry: read `openspec/specs/`, read active change under `openspec/changes/`, link `.agent/agents.md`.
- `docs/config/openspec/project.md` — thin pointer to root `openspec/project.md` **or** duplicate the command table (prefer single source: **link** to `../../openspec/project.md` from `docs/config/openspec/project.md`).
- `openspec/specs/README.md` — table of all `platform-*` + placeholder “Other capabilities”.
- For **each** row below: `openspec/specs/<capability>/spec.md` with 2–4 **SHALL/MUST** lines and stable IDs `[{{REQ_ID_PREFIX}}-<SUFFIX>-###]`.

## Coexistence with an existing root `specs/` folder

If the repo already has **`specs/`** at the root (e.g. PromptL or product assets), **do not** mix OpenSpec merge targets into that tree unless the team explicitly chooses one merged layout. This pack keeps OpenSpec under **`openspec/specs/`** and uses `docs/` to explain the distinction.

## Platform capabilities (required)

Same capability set as [multi-repo P05](../multi-repo/P05-subrepo-docs-and-platform.md) for cross-pack consistency:

| capability | Suffix | Topic |
|------------|--------|--------|
| `platform-purpose` | `PUR` | Product purpose |
| `platform-tech-stack` | `TEC` | Languages, frameworks, runtime |
| `platform-repository-layout` | `REL` | Repo layout and entrypoints |
| `platform-architecture` | `ARC` | Layers and module boundaries |
| `platform-runtime` | `RUN` | Process bootstrap, HTTP server, request limits |
| `platform-configuration` | `CFG` | Env vars, secrets |
| `platform-messaging` | `MSG` | Queues, events, outbox (or explicit N/A) |
| `platform-observability` | `OBS` | Logs, metrics, traces |
| `platform-infrastructure` | `INF` | Deploy, containers, CI |
| `platform-external-services` | `EXT` | Third-party HTTP/SDK integrations |
| `platform-conventions` | `CON` | Code style, naming, i18n |
| `platform-testing` | `TST` | Test pyramid, commands |
| `platform-domain` | `DOM` | Ubiquitous language, bounded contexts |
| `platform-database` | `DAT` | Persistence, migrations |
| `platform-constraints` | `CNS` | Compliance, SLAs |

### Per-capability `spec.md` skeleton

```markdown
# <Title in English>

## Rationale

<One short paragraph.>

## Requirements

[{{REQ_ID_PREFIX}}-<SUFFIX>-001]: The system SHALL <concrete requirement>.

[{{REQ_ID_PREFIX}}-<SUFFIX>-002]: The system SHALL <concrete requirement>.

[{{REQ_ID_PREFIX}}-<SUFFIX>-003]: The system MUST <concrete requirement>.
```

Use **spec-driven normative format** for non-platform capabilities later (`### Requirement:` + `#### Scenario:`); for these **bootstrap** platform files, the simple `## Requirements` + bracketed IDs are enough to start; you can tighten to full OpenSpec requirement blocks in a follow-up change.

## Root `AGENTS.md` (optional refresh)

If the repo already has `AGENTS.md` (latitude-llm does), ensure it **points** to:

- `.agent/agents.md` (once `.agent/` exists), and/or
- `docs/config/openspec/AGENTS.md`

Avoid duplicating long policy in three places: pick a **short** root file that `@`-includes or links deeper docs.

## Check

- `openspec/specs/` contains **15** `platform-*` directories.
- `npx openspec list --specs` (when applicable) sees the new capabilities.
