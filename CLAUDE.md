# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Harrison Keen (`harrisonkeen.tech`). Vanilla HTML5 + CSS3 with a little inline vanilla JS — no build tools, no frameworks, no package manager, no dependencies. Every page is a single self-contained `.html` file with its CSS in one `<style>` block.

## Development

No build step. Open `index.html` directly in a browser, or use a local static server:

```bash
python3 -m http.server 8000   # `python` is not on PATH on this machine
```

Prefer the server over `file://` when testing the acting page, so video loading and seeking
behave the way they do in production.

## Deployment

Pushing to `main` on `github.com/Sylennce/hk-website` deploys to production immediately (Netlify, publish dir `.`). **There is no staging environment** — check locally before pushing.

The full chain, verified 2026-08-02:

| Layer | Provider | Detail |
|---|---|---|
| Registrar | Hostinger | `harrisonkeen.tech`, expires 2027-03-11 |
| DNS | Cloudflare | `damian` / `tara.ns.cloudflare.com` |
| Host | Netlify | apex `A` → `75.2.60.5`, serves `server: Netlify` |

Apex and `www` behave differently: the apex record is **DNS-only** (requests hit Netlify directly), while `www` is **Cloudflare-proxied** and 301s to the apex. If you change DNS, keep the apex unproxied — proxying it puts Cloudflare in front of Netlify's TLS and can break certificate renewal.

`netlify.toml` declares 200-rewrites for `/canvas`, `/tech`, and `/acting`. In practice Netlify's own pretty-URL handling 301s each to a trailing-slash path first, then serves the directory `index.html`; all three return 200 after the redirect.

There is no `DEPLOY.md` in this repo (older versions of this file referenced one). The table above is the record.

## Architecture

### Pages
Four standalone pages, each its own `index.html`:

- `index.html` — landing page, **hero only** (one screen): headshot, typewriter tagline, a single *Actor* button, Instagram icon + email text pinned bottom-centre (325 lines)
- `acting/index.html` — acting portfolio: headshots, reels, video carousel, credits (854 lines). **The only page linked from anywhere.**
- `tech/index.html` — tech/dev portfolio (364 lines). **Hidden since 2026-10-14**: unlinked from the homepage and acting nav, `noindex`, but still served at `/tech`. Saffra Scripts is likewise unlinked from the homepage. Don't re-link either without being asked.
- `canvas/index.html` — standalone Canvas LMS showcase (512 lines, 1.5 MB), kept as a historical portfolio piece; linked only from the (hidden) tech page

### Styling conventions
`index.html`, `acting/`, and `tech/` share one design language — keep them consistent:
- Dark theme: background `#0a0a14` (`#0d0d1a` on acting), purple/pink accents `#8b5cf6`, `#c084fc`, `#ec4899`
- System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`) — no webfonts
- Fluid sizing via `clamp()`/`vw` — hero photos, reel heights and the clip stage all scale with the window rather than sitting at fixed px
- Acting sections centre in a 1200px column via `padding: … max(60px, calc((100% - 1200px) / 2))`; breakpoints at 1000px (tablet: reels stack, 2-col credits/gallery), 760px (hero stacks — three photos need ~700px side by side) and 640px (phone)
- Glow blobs: absolutely positioned divs with `filter: blur()` for ambient lighting
- Gradient text via `-webkit-background-clip: text`
- Literal hex values throughout, **no CSS custom properties** — a colour change means find-and-replace across the file

`canvas/index.html` is deliberately the odd one out: light cream/paper theme, `:root` custom properties, Google Fonts ("Instrument Serif" + "DM Sans"). Keep it visually independent of the other three.

### JavaScript
Small inline IIFEs, no libraries. Both are progressive enhancements — the pages remain usable if they fail:
- `index.html:139` — hero canvas effects: mouse-repelling particle field (`#particle-canvas`), pink→purple cursor trail (`#star-canvas`), handwriting cursor (`#hw-cursor` / `#hw-text`)
- `acting/index.html:793` — video carousel; arrows/dots scroll the CSS scroll-snap track and pause off-screen videos. Without JS the track still scrolls natively.

### Assets
- `HARRISON.jpeg` — hero headshot (1.9 MB, referenced by relative path)
- `acting/HarrisonKeen_ActingCV.pdf` — the acting CV behind *Download CV* (`/acting/cv.pdf` 301s to it via `netlify.toml`); `harrison_keen_resume.pdf` at the root backs the tech page's Resume link
- `acting/resources/` — 357 MB of headshots, showreels, and clips

**`.gitignore` excludes `*.pdf` except those two.** Any other résumé or cover-letter PDF is deliberately kept off GitHub, so don't add it or write page links that assume it exists.

## Gotchas

**Video is committed straight to git — no LFS.** The checkout is ~790 MB, `.git` alone is 433 MB. Consequences before you touch `acting/resources/`:

- `presidential-rally.mp4` is **93.6 MB against GitHub's 100 MB hard per-file limit**. A slightly larger re-export will be rejected at push time, after the commit exists — compress before committing, not after.
- History already carries duplicate copies of both showreels from earlier replacements. Every swap of a reel adds the new file's full size to history permanently; deleting it later does not shrink the repo.
- If reels grow much further, the fix is Git LFS or moving video to external hosting — not another in-place replacement.

**`docs/` is listed in `.gitignore` but `docs/acting-redesign-spec.md` is tracked anyway** (committed before the ignore rule). Git keeps honouring the existing tracking, so edits to that file *do* show up in `git status`; new files in `docs/` do not.
