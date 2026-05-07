# P04 — `sync-agents.sh` + `validate-repo.sh` (monorepo)

## Role

Add **`scripts/sync-agents.sh`** (same generator pattern as [multi-repo P04](../multi-repo/P04-scripts-sync-and-validate.md)) and a **mono-repo** validator that enforces **spec-driven** invariants at the **single** repository root.

Replace script banner strings with `{{ORCHESTRATOR_RULES_TITLE}}`, `{{META_WORKSPACE_NAME}}`, `{{PROFILES_SKILL_NAME}}`, `{{PROFILES_SKILL_DESC}}`.

## Preconditions

- `.agent/` complete (P02).
- Root `package.json` includes `agents:sync` and `agents:validate` pointing at these scripts (P03).

## Postconditions

- `scripts/sync-agents.sh` — copy from [multi-repo P04](../multi-repo/P04-scripts-sync-and-validate.md) section **2** verbatim (same outputs: `.cursor/rules/openspec.mdc`, `.clinerules/openspec.md`, `.claude/CLAUDE.md`, `.codex/AGENTS.md`, skill stubs). Replace `__...__` markers once.
- `scripts/validate-repo.sh` (name can vary; wire as `agents:validate`) — content below.
- **No** `validate-subrepo-spec-roots.list` (that is multi-repo only).

---

## `scripts/validate-repo.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERR=0

fail() {
  echo "validate-repo: $*" >&2
  ERR=1
}

if [[ ! -d "$ROOT/openspec/specs" ]]; then
  fail "Missing openspec/specs/ (spec-driven canonical specs)"
fi

if [[ ! -f "$ROOT/openspec/project.md" ]]; then
  fail "Missing openspec/project.md"
fi

if [[ ! -f "$ROOT/.agent/config/package-areas.yaml" ]]; then
  fail "Missing .agent/config/package-areas.yaml"
fi

if [[ ! -f "$ROOT/.agent/agents.md" ]]; then
  fail "Missing .agent/agents.md"
fi

if [[ ! -f "$ROOT/.cursor/rules/openspec.mdc" ]]; then
  fail "Missing .cursor/rules/openspec.mdc — run npm run agents:sync"
fi

if [[ ! -f "$ROOT/.clinerules/openspec.md" ]]; then
  fail "Missing .clinerules/openspec.md — run npm run agents:sync"
fi

shopt -s nullglob
for d in "$ROOT/openspec/changes"/*/; do
  [[ -d "$d" ]] || continue
  base="$(basename "$d")"
  [[ "$base" == "archive" ]] && continue
  # spec-driven changes may not require orchestrator.yaml — only fail if your team adds a sidecar policy
  :
done
shopt -u nullglob

if [[ "$ERR" -ne 0 ]]; then
  exit 1
fi
echo "validate-repo: OK"
```

**Note:** Uncomment or extend the `openspec/changes` loop if you require extra sidecars (e.g. custom `manifest.yaml`).

Wire in `package.json`:

```json
"agents:validate": "bash scripts/validate-repo.sh"
```

---

## Check

```bash
bash scripts/sync-agents.sh
bash scripts/validate-repo.sh
```
