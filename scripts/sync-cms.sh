#!/usr/bin/env bash
# Sync content edits made directly by SurrealCMS on production back into GitHub.
#
# SurrealCMS edits files straight in ~/public_html, the live DocumentRoot -
# not the git checkout at ~/scouts-vremde. public_html is a plain rsync
# target (see MIGRATION.md §2), so those edits aren't tracked by git and
# would be silently wiped by the next deploy.sh run (`rsync --delete` from
# the checkout over public_html).
#
# This script:
#   1. Mirrors public_html's current content into the checkout's public/
#      (the checkout's HEAD is always the last-published commit, so this
#      reproduces exactly what SurrealCMS changed since that publish).
#   2. Commits that delta.
#   3. Fetches and merges origin/main, in case template commits landed on
#      GitHub since the last deploy. A real 3-way merge, so CMS edits and
#      template edits to the same file both survive unless they touch the
#      same lines.
#   4. Pushes the merge to GitHub.
#   5. Re-publishes the merged checkout back to public_html - required even
#      for a pure CMS-only sync, to keep public_html and the checkout
#      identical (the invariant step 1 depends on next time this runs). If
#      the merge pulled in pending template commits, this publishes those
#      too - that's an intentional side effect, not a bug: there's no way to
#      sync CMS content without republishing, and gating that behind a
#      separate manual deploy would leave public_html and the checkout out
#      of sync again immediately.
#
# Must run as sn0838, no sudo needed - it only touches ~/scouts-vremde and
# ~/public_html, both owned by sn0838.
#
# Usage: ~/scouts-vremde/scripts/sync-cms.sh
# Manual for now (not cron-scheduled). Safe to re-run - no-op if nothing changed.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="main"
DOCROOT="$HOME/public_html"   # confirmed DocumentRoot for scoutsvremde.be

if [ ! -d "$DOCROOT" ]; then
  echo "ERROR: DOCROOT '$DOCROOT' does not exist. Fix the DOCROOT variable in this script." >&2
  exit 1
fi

# An empty DOCROOT means nothing has been published yet (first-time deploy),
# not that the CMS deleted every file - mirroring that in would wipe public/
# and push the deletion to origin/main. Nothing to sync yet, so skip.
if [ -z "$(ls -A "$DOCROOT" 2>/dev/null)" ]; then
  echo "==> DOCROOT is empty (nothing published yet) - skipping CMS sync."
  exit 0
fi

LOCK_FILE="/tmp/scouts-vremde-sync-cms.lock"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "==> Another sync-cms run is already in progress, exiting."
  exit 0
fi

cd "$REPO_DIR"

if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: $REPO_DIR has uncommitted changes already - not expected outside this script's" >&2
  echo "       own run. Investigate before syncing (git status / git diff in $REPO_DIR)." >&2
  exit 1
fi

echo "==> Mirroring $DOCROOT -> $REPO_DIR/public"
rsync -a --delete "$DOCROOT/" "$REPO_DIR/public/"

if [ -z "$(git status --porcelain)" ]; then
  echo "==> No CMS changes since last publish, nothing to sync."
  exit 0
fi

echo "==> CMS changes found:"
git status --porcelain

git add -A
CHANGED_FILES="$(git diff --cached --name-only | tr '\n' ' ')"
git commit -q -m "chore: sync SurrealCMS content edits ($(date -u +%Y-%m-%dT%H:%M:%SZ)Z)

Files: ${CHANGED_FILES}"
SYNC_COMMIT="$(git rev-parse --short HEAD)"
echo "==> Committed as $SYNC_COMMIT"

echo "==> Fetching origin/$BRANCH"
git fetch origin "$BRANCH"

if ! git merge --no-edit "origin/$BRANCH"; then
  git merge --abort
  echo "ERROR: origin/$BRANCH has changes that conflict with the SurrealCMS edits." >&2
  echo "       Your sync commit is safe locally at $SYNC_COMMIT (not pushed), and public_html" >&2
  echo "       is untouched (still showing the CMS edits as-is)." >&2
  echo "       Resolve by hand in $REPO_DIR: git merge origin/$BRANCH, fix conflicts, git push," >&2
  echo "       then re-run this script to republish." >&2
  exit 1
fi

echo "==> Pushing to origin/$BRANCH"
git push origin "$BRANCH"

echo "==> Publishing merged public/ -> $DOCROOT"
rsync -a --delete \
  --chmod=Du=rwx,Dg=rx,Do=rx,Fu=rw,Fg=r,Fo=r \
  "$REPO_DIR/public/" "$DOCROOT/"

echo "==> Done. Pushed and published: $(git log -1 --format='%h %s')"
