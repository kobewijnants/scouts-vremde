#!/usr/bin/env bash
# Deploy scouts-vremde to this server. Run as sn0838, no sudo required.
#
# Usage: ~/scouts-vremde/scripts/deploy.sh
#
# Assumes this script lives inside the git clone at ~/scouts-vremde. If your
# clone is elsewhere, edit REPO_DIR below.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="main"

# DocumentRoot is fixed in a root-owned vhost conf
# (/etc/apache2/sites-enabled/scoutnet.be.dyn.inc.conf) and can't be
# repointed without sudo, so PUBLISH_MODE is always rsync here.
PUBLISH_MODE="rsync"          # "rsync" or "none"
DOCROOT="$HOME/public_html"   # confirmed DocumentRoot for scoutsvremde.be
# -----------------------------------------------------------------------

# SurrealCMS edits public_html directly, outside git (see sync-cms.sh). The
# reset+publish below would silently wipe those edits, so capture and push
# them first - sync-cms.sh exits non-zero (aborting this deploy) if that
# sync hits a real conflict, rather than risk clobbering unsaved CMS edits.
echo "==> Syncing any pending SurrealCMS edits before deploying"
"$REPO_DIR/scripts/sync-cms.sh"

echo "==> Updating checkout in $REPO_DIR"
cd "$REPO_DIR"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
echo "==> Now at $(git rev-parse --short HEAD): $(git log -1 --format=%s)"

if [ "$PUBLISH_MODE" = "rsync" ]; then
  if [ ! -d "$DOCROOT" ]; then
    echo "ERROR: DOCROOT '$DOCROOT' does not exist. Fix the DOCROOT variable in this script." >&2
    exit 1
  fi
  echo "==> Publishing public/ -> $DOCROOT (rsync, deletes files no longer in the repo)"
  rsync -a --delete \
    --chmod=Du=rwx,Dg=rx,Do=rx,Fu=rw,Fg=r,Fo=r \
    "$REPO_DIR/public/" "$DOCROOT/"
elif [ "$PUBLISH_MODE" = "none" ]; then
  echo "==> PUBLISH_MODE=none, DocumentRoot points at $REPO_DIR/public directly, nothing to copy"
  find "$REPO_DIR/public" -type d -exec chmod 755 {} \;
  find "$REPO_DIR/public" -type f -exec chmod 644 {} \;
else
  echo "ERROR: PUBLISH_MODE must be 'rsync' or 'none', got '$PUBLISH_MODE'" >&2
  exit 1
fi

echo "==> Done."
