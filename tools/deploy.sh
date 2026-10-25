#!/bin/bash
# Publish dist/ to the gh-pages branch of github.com/VardhanGS/learning-hub (GitHub Pages serves that branch).
# Pushes as VardhanGS without switching the active gh account. Run only after a grown-up has approved publishing.
# Usage: tools/deploy.sh "message"
set -euo pipefail
cd "$(dirname "$0")/.."
MSG="${1:-Publish}"
python3 tools/build.py
TMP="$(mktemp -d)"
trap 'git worktree remove --force "$TMP" >/dev/null 2>&1 || true' EXIT
if git show-ref --verify --quiet refs/heads/gh-pages; then git worktree add -q "$TMP" gh-pages
else git worktree add -q --orphan -b gh-pages "$TMP"; fi
rsync -a --delete --exclude '.git' --exclude '_test' dist/ "$TMP"/
git -C "$TMP" add -A
git -C "$TMP" commit -q -m "$MSG" || { echo "Nothing to publish."; exit 0; }
GH_TOKEN="$(gh auth token -u VardhanGS)" git -C "$TMP" \
  -c credential.helper= -c 'credential.helper=!f(){ echo username=VardhanGS; echo "password=$GH_TOKEN"; }; f' \
  push -q origin gh-pages
echo "Published: https://vardhangs.github.io/learning-hub/"
