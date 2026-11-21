#!/bin/bash
# Manual deploy of exactly what's committed (HEAD), never the working folder —
# the checkout holds gitignored personal files that must not go public.
# Normal path: push to main, Cloudflare Workers Builds deploys it.
set -euo pipefail
cd "$(dirname "$0")"
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
git archive HEAD | tar -x -C "$tmp"
cd "$tmp" && npx -y wrangler@4 deploy "$@"
