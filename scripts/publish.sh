#!/usr/bin/env bash
#
# bun run publish "commit message"
#
# Local "dev machine is the CI" pipeline:
#   1. sequoia publish  → mints AT URI, cross-posts to Bluesky, mutates frontmatter + .sequoia-state.json
#   2. git stage + commit (scoped to publish artifacts)
#   3. vercel build --prod  → produces .vercel/output
#   4. vercel deploy --prebuilt --prod  → uploads prebuilt artifacts
#   5. git push  → keeps git in sync with deployed state
#
set -euo pipefail

if [ $# -lt 1 ] || [ -z "${1:-}" ]; then
  echo "Usage: bun run publish \"commit message\"" >&2
  exit 1
fi

COMMIT_MSG="$1"

# Pre-flight: nothing already staged (we manage staging ourselves)
if ! git diff --staged --quiet; then
  echo "Error: you have staged changes. Unstage or commit them separately first." >&2
  git diff --staged --name-only >&2
  exit 1
fi

# 1. Publish to PDS + Bluesky
bun run sequoia:publish

# 2. Stage only the artifacts sequoia produces
git add src/content/blog/ .sequoia-state.json

# 3. Commit (skip if sequoia made no changes — e.g., re-run on unchanged content)
if git diff --staged --quiet; then
  echo "No publish changes to commit. Continuing to build."
else
  git commit -m "$COMMIT_MSG"
fi

# 4. Build with Vercel's toolchain → .vercel/output
bunx vercel build --prod

# 5. Upload prebuilt artifacts
bunx vercel deploy --prebuilt --prod

# 6. Push so origin/main matches deployed state
git push
