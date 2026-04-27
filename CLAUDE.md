# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/landing page for Harrison Keen (`harrisonkeen.tech`). Vanilla HTML5 + CSS3 only — no build tools, no JavaScript, no frameworks, no package manager.

## Development

No build step. Open `index.html` directly in a browser, or use a local static server:

```bash
python -m http.server 8000
# or
npx serve .
```

## Deployment

Hosted on Netlify, DNS via Cloudflare. Deploys automatically from the GitHub `main` branch (publish dir: `.`). See `DEPLOY.md` for full DNS/SSL setup steps.

The `/canvas` route is a 200-rewrite to `canvas/index.html` (configured in `netlify.toml`).

## Architecture

### Pages
- `index.html` — main landing page (hero → work → experience → footer), ~11KB
- `canvas/index.html` — standalone Canvas LMS showcase page (~1.5MB), preserved as a historical portfolio piece; linked from the hero CTA

### Styling conventions (index.html)
All CSS lives in a single `<style>` block in `index.html`. Key patterns:
- Dark theme: background `#0a0a14`, purple/pink gradient accents (`#8b5cf6`, `#ec4899`)
- Fluid typography via `clamp()` — no breakpoint-heavy overrides
- Glow blobs: absolutely positioned divs with `filter: blur()` for ambient lighting effect
- Gradient text: `-webkit-background-clip: text` technique
- No JavaScript — all interactivity is CSS `:hover`/`:focus` only

`canvas/index.html` uses a different design language (light cream/paper theme, CSS custom properties via `:root`, Google Fonts: "Instrument Serif" + "DM Sans"). Keep the two pages visually independent.

### Assets
- `HARRISON.jpeg` — headshot used in hero (referenced by relative path)
- `harrison_keen_resume.pdf`, `harrison_keen_cover_letter.pdf` — downloadable from the page
