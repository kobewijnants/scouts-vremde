# Migration plan: swap the live scoutsvremde.be site for this repo

**Server**: 193.110.254.16, Apache2 on Debian 10, SSH user `sn0838`, no sudo.
**Domain**: `scoutsvremde.be` already points at this exact server today — this
is not a server move, it's replacing the content currently being served with
this repo's `public/` tree, in place.

Helper scripts live in `scripts/`:
- `scripts/server-discovery.sh` — read-only, already run against the live
  server (2026-09-12). Findings baked into this doc below.
- `scripts/deploy.sh` — the repeatable deploy step (git pull + publish),
  already configured with the real `DOCROOT`.

**Status: fully confirmed, no open blockers.** Every question in the old §7
has been answered by direct SSH discovery. Skip to §4 for the exact commands.

## 0. Confirmed facts (SSH discovery, 2026-09-12)

| Fact | Evidence | Why it matters |
|---|---|---|
| **DocumentRoot**: `/scoutnet.be/users/scoutsvremde/public_html` (= `$HOME/public_html`) | Exact match in `/etc/apache2/sites-enabled/scoutnet.be.dyn.inc.conf`: `DocumentRoot /scoutnet.be/users/scoutsvremde/public_html` under `ServerName scoutsvremde.be` / `ServerAlias *.scoutsvremde.be` | This path is **fixed in a root-owned conf file** — can't be repointed without sudo/host support. **Option B (rsync-publish) is required**, Option A is not available. |
| **`AllowOverride All`** for that exact path | Same conf file, `<Directory>` block for the docroot | No blocker — `Options -Indexes +Includes` and everything else in `public/.htaccess` will be honored. |
| **All required modules enabled**: `rewrite`, `headers`, `deflate`, `expires`, `mime`, `include` | `ls /etc/apache2/mods-enabled/` | `.htaccess` rewrite rules, security headers, compression, caching, and SSI includes will all work as authored. |
| **The http→https/www redirect lives in the vhost config**, not a `.htaccess` | Same conf file: `Redirect / https://www.scoutsvremde.be/` (only in the `:80` block — the `:443` block serves content directly, no loop) | This is root-owned and **completely independent of docroot content**. Moving/replacing files in `public_html` does not affect it. The line in `public/.htaccess` calling this "the reverse proxy" is wrong (there is no reverse proxy) but harmless — no redirect logic needs to be added to `.htaccess` either way. |
| **No current `.htaccess`** in the live docroot | Directory listing of `/scoutnet.be/users/scoutsvremde/public_html` | Matches the earlier "stock 404 page" finding from outside. Confirms a clean slate — nothing to merge/preserve from an existing `.htaccess`. |
| **Home-dir traversal already works for `www-data`** — no `chmod` needed | `namei -l "$HOME"`: `/scoutnet.be/users/scoutsvremde` is `drwx--x--- sn0838:www-data` — group `www-data` has the `--x` traverse bit; `public_html` itself is `sn0838:sn0838 rwxr-xr-x`, world-traversable/readable | The `chmod o+x ~` step some guides recommend is **not needed on this server** — permissions are already correct via group ownership. |
| `git` 2.20.1 and `rsync` 3.1.3 available; `curl` not installed on this account | `command -v` checks | Deploy script works as-is. Run verification `curl` commands from your own machine instead of the server. |
| Outbound HTTPS to GitHub works | discovery script's connectivity check | `git clone`/`git pull` against the public repo will work with no auth needed. |
| ~1.1T disk free | `df -h "$HOME"` | No space concerns. |
| `public_html/index.html` was modified **today**, with `index.html.bak` from Aug 30 | `ls -la` timestamps | Someone edited the live homepage directly on the server, outside git. The migration backs up the whole directory before touching it (nothing is lost), but if that manual edit isn't reflected in this repo, **it will be overwritten** by the deploy. Worth checking before cutover. |
| Orphaned `havanasaloon.scoutsvremde.be` rewrite rule exists in the vhost config | `RewriteCond %{HTTP_HOST} havanasaloon\.scoutsvremde\.be` → `/havanasaloon/$1` | No `havanasaloon` folder exists in the current docroot listing — looks dead. Not a blocker, not touched by this migration. |
| TLS already provisioned: Let's Encrypt, `CN=scoutsvremde.be`, valid until **2026-10-19** | `openssl s_client` (checked from outside) | Independent of docroot content unless renewal uses the webroot ACME method. `.well-known/` already exists in the live docroot and is exempted from the dotfile-block rule in `public/.htaccess` — compatible either way. |

## 1. Permissions model (why git clone/pull won't fight with www-data)

Apache only needs **read** on files and **execute (traverse)** on
directories to serve static content — it doesn't need to *own* anything.
Ownership (`chown ... www-data`) is only needed for things Apache must
**write** (uploads, sessions, caches), and this static site has none of that
server-side. So git runs entirely as `sn0838`, owns everything it touches,
and the published files just need to be world-readable (`644`/`755`) —
confirmed already true for the full path down to `public_html` (§0). The
`chown -R www-data` pattern in `handy-commands.sh` is left over from a
previous root-owned VPS, doesn't apply here, and couldn't be run without
sudo anyway.

## 2. Deploy architecture: Option B (rsync-publish) — confirmed required

DocumentRoot (`/scoutnet.be/users/scoutsvremde/public_html`) is fixed in a
root-owned vhost conf and can't be repointed without sudo/host support, so
Option A ("point DocumentRoot straight at the repo's `public/`") is **not
available** here. `scripts/deploy.sh` implements Option B:

```
~/scouts-vremde/          <- git clone, never web-accessible
~/scouts-vremde/public/   <- source of truth
~/public_html/            <- rsync target, what Apache actually serves
```

Every deploy after the initial migration is just:

```bash
~/scouts-vremde/scripts/deploy.sh
```

which first runs `scripts/sync-cms.sh` (below) to capture and push any
SurrealCMS content edits sitting in `public_html`, then does
`git fetch && git reset --hard origin/main`, then `rsync -a --delete` from
`public/` into `~/public_html/`.

### SurrealCMS content sync

SurrealCMS edits `public_html` directly over SFTP, outside git entirely.
`public_html` is a plain rsync target, not a checkout, so those edits have
no history and would be silently overwritten by the `rsync --delete` above.
`scripts/sync-cms.sh` closes that gap: it mirrors `public_html` into the
`scouts-vremde` checkout, commits the delta, merges in anything new on
`origin/main`, pushes, then republishes the merged result back to
`public_html`. `deploy.sh` always runs it first, so a template deploy can't
clobber pending CMS edits. It can also be run on its own at any time:

```bash
~/scouts-vremde/scripts/sync-cms.sh
```

## 3. Before you start: update `SITE_URL` and check the manual edit

Two things to resolve locally, before cutover:

1. `public/.htaccess` sets `SetEnv SITE_URL https://scoutsvremde.kobecloud.be`
   — update this to `https://www.scoutsvremde.be` (the confirmed canonical
   redirect target) and commit/push.
2. Check whether today's manual edit to the live `index.html` (§0) contains
   anything worth porting into this repo's `public/index.html` before it
   gets overwritten. If you don't know what changed, you can compare it
   after backing up (§4 step 1 keeps `index.html.bak` too).

## 4. Migration procedure

```bash
ssh sn0838@193.110.254.16

# 1. Clone the repo first, before touching the live site (minimizes downtime —
#    the only "site is briefly broken" window is step 3, not this).
cd ~
git clone https://github.com/kobewijnants/scouts-vremde.git

# 2. Back up the current live site — MOVE, never delete.
mv ~/public_html ~/public_html.bak-$(date +%Y%m%d)

# 3. Recreate the docroot and publish. This is the only moment the site is
#    down, and it's as long as an rsync of static files takes (seconds).
mkdir -p ~/public_html
chmod 755 ~/public_html
~/scouts-vremde/scripts/deploy.sh
```

## 5. Post-deploy verification

Since this is the same live domain, testing after deploy *is* testing
production — do it immediately and be ready to roll back. Run these from
your own machine (no `curl` on the server account):

```bash
curl -I https://scoutsvremde.be/                    # 200
curl -I http://scoutsvremde.be/                     # confirm the https/www redirect still works
curl -I https://scoutsvremde.be/contact             # 200 = clean-URL rewrite working (needs mod_rewrite + AllowOverride)
curl -s https://scoutsvremde.be/ | grep -c '<!--#'  # must print 0 — any match means mod_include isn't processing SSI
curl -sI https://scoutsvremde.be/ | grep -i strict-transport-security  # confirms mod_headers is live
curl -I https://scoutsvremde.be/nonexistent-xyz     # should be your custom errors/404.html, not Apache's stock page
```

## 6. Rollback (fast, since old files were moved not deleted)

```bash
ssh sn0838@193.110.254.16
rm -rf ~/public_html
mv ~/public_html.bak-<date> ~/public_html
```
