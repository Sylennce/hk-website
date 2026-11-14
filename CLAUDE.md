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
Five standalone pages, each its own `index.html`:

- `index.html` — landing page, **"Sky Islands" hub** (live 2026-11-12, replaced the old headshot hero): one painted scene, paths fork to *Acting* (theatre, `/acting/`) and *Websites* (observatory, `/websites/`); WebGL depth parallax, floating words, balloons/birds/butterflies, click = zoom + colour glow, then navigate. Engine is inline; config + art live in `assets/home/` (`worlds.js`, `isles*.{jpg,png}`, `sprites/`). Design source and tools: `drafts/hk-home-g3-sky-islands/` (gitignored); `isles.jpg` is a 2x upscale, coordinates stay in 1376px space. Uses Google Fonts (Cinzel etc.), unlike the old convention below.
- `websites/index.html` — "Websites" page selling portfolio sites for actors (live 2026-11-12, conversion rework 2026-11-13): hero wall where every poster is a looping clip of a real client site + a calm centred pitch over it (problem headline, fix line, one button); "Now showing" player (no URLs) with thumbnail picker; three-question FAQ (details expanders); mono "spec sheet" price panel ($119 CAD once + the price of the domain) and the see-it-before-you-pay promise; marquee contact form; floating pill. **One CTA label everywhere: "Build my site"** (hero, pill, offer, form button). Audience is actors, singers, performers and other creatives, not actors only. Stills in `websites/images/`, clips in `websites/media/` (`<slug>-s.mp4` 480w for the wall, `-l.mp4` 960w for the player, all exactly 5s, recorded from the live sites from the moment of load, with the still = the clip's last frame; how to re-record: `drafts/hk-websites-page-draft/capture/README.md`). The projector dust canvas is `z-index:0` — it must stay behind every section. Honours `prefers-reduced-motion` (stills, no dust). Google Fonts + CSS custom properties (own look, like `canvas/`). The form is **Netlify Forms** (`name="websites-enquiry"`, honeypot `bot-field`, fields `name`/`email`/`links`/`message`), posted by `fetch` to `/`; "Message sent" shows only on a 2xx, otherwise an inline error. Submissions land in the Netlify dashboard → Forms. The live file is ahead of `drafts/hk-websites-page-draft/index.html` — edit the live file.
- `acting/index.html` — acting portfolio, **redesigned and live 2026-11-12**: B&W cover hero with camera flashes, Featured work posters, press timeline, Reels, Photos, Credits (three columns that end level), Socials, Casting & bookings. Own look like the home and Websites pages (Google Fonts, CSS custom properties), so the shared `acting/`+`tech/` styling notes below now describe `tech/` only. **Generated file — don't hand-edit:** the source is `drafts/hk-acting-draft-3/` (`index.html` + `shared.js`, gitignored); change it there, then run `python3 drafts/hk-acting-draft-3/build_live.py`, which inlines the script, swaps in live paths and drops the mockup panel. Images it loads are in `acting/resources/web/`. The old page is in git history before this date.
- `tech/index.html` — tech/dev portfolio (364 lines). **Hidden since 2026-10-14**: unlinked from the homepage and acting nav, `noindex`, but still served at `/tech`. Saffra Scripts is likewise unlinked from the homepage. Don't re-link either without being asked.
- `canvas/index.html` — standalone Canvas LMS showcase (512 lines, 1.5 MB), kept as a historical portfolio piece; linked only from the (hidden) tech page

### Styling conventions
`acting/` and `tech/` share one design language — keep them consistent (the home and Websites pages have their own looks, see Pages):
- Dark theme: background `#0a0a14` (`#0d0d1a` on acting), purple/pink accents `#8b5cf6`, `#c084fc`, `#ec4899`
- System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`) — no webfonts
- Fluid sizing via `clamp()`/`vw` — hero photos, reel heights and the clip stage all scale with the window rather than sitting at fixed px
- Acting sections centre in a 1200px column via `padding: … max(60px, calc((100% - 1200px) / 2))`; breakpoints at 1000px (tablet: reels stack, 2-col credits/gallery), 760px (hero stacks — three photos need ~700px side by side) and 640px (phone)
- Glow blobs: absolutely positioned divs with `filter: blur()` for ambient lighting
- Gradient text via `-webkit-background-clip: text`
- Literal hex values throughout, **no CSS custom properties** — a colour change means find-and-replace across the file

**Design review lens:** the advisory "Craft principles" in
`../Portfolio Sites/docs/design.md` apply here too. They cover the mirror-test copy, keeping the
accent for clickable things only (60-30-10), front/middle/back depth, motion with a job plus
`prefers-reduced-motion`, and a free sample before the ask. Known gaps as of 2026-11-09: no page
here honours reduced motion yet, and the purple/pink gradient sits on headings and text as well
as on buttons, so the buttons don't stand out.

`canvas/index.html` is deliberately the odd one out: light cream/paper theme, `:root` custom properties, Google Fonts ("Instrument Serif" + "DM Sans"). Keep it visually independent of the other three.

### JavaScript
Small inline IIFEs, no libraries. Both are progressive enhancements — the pages remain usable if they fail:
- `index.html:139` — hero canvas effects: mouse-repelling particle field (`#particle-canvas`), pink→purple cursor trail (`#star-canvas`), handwriting cursor (`#hw-cursor` / `#hw-text`)
- `acting/index.html:793` — video carousel; arrows/dots scroll the CSS scroll-snap track and pause off-screen videos. Without JS the track still scrolls natively.

### Assets
- `HARRISON.jpeg` — hero headshot (1.9 MB, referenced by relative path)
- `acting/HarrisonKeen_ActingCV.pdf` — the acting CV behind *Download CV* (`/acting/cv.pdf` 301s to it via `netlify.toml`); `harrison_keen_resume.pdf` at the root backs the tech page's Resume link
- `acting/resources/` — 357 MB of headshots, showreels, and clips
- `acting/resources/web/` + `HARRISON-web.jpg` — **what the pages actually load.** Progressive JPEGs resized from the originals (hero 720w, gallery 900w, reel posters 1280w; ~25–200 KB each vs up to 12 MB). The originals stay in the repo but are no longer referenced. Adding or replacing a photo means generating a web copy (Pillow lives in `../Expenses/receipt-agent/venv`; `ImageOps.exif_transpose`, `quality=82, progressive=True`) under a **new filename** — `netlify.toml` caches `web/*` for 30 days.
- Reels have no `autoplay` attribute: they carry `class="reel-autoplay"`, `preload="none"` and a poster, and a small script plays them only after `window.load` and while on screen, so the 57 MB of reel video doesn't compete with the hero photos.

- `favicon.ico` / `favicon.png` (192) / `apple-touch-icon.png` (180) — **gold "HK" initials on dark plum** (Georgia Bold, `#1b1024` / `rgb(255,196,92)`), linked from all five pages with `?v=2`; this is what Google shows beside the search result. Replaced the headshot crop 2026-11-13 — he does not want his face as the tab icon. Bump the `?v=` when the icon changes (the acting links live in `drafts/hk-acting-draft-3/build_live.py`).
- `googlef482c8a3045fc8bc.html` — Google Search Console ownership file for the `https://harrisonkeen.tech/` property. **Never delete it** — removing it unverifies the property.

**`.gitignore` excludes `*.pdf` except those two.** Any other résumé or cover-letter PDF is deliberately kept off GitHub, so don't add it or write page links that assume it exists.

## Gotchas

**Video is committed straight to git — no LFS.** The checkout is ~790 MB, `.git` alone is 433 MB. Consequences before you touch `acting/resources/`:

- `presidential-rally.mp4` is **93.6 MB against GitHub's 100 MB hard per-file limit**. A slightly larger re-export will be rejected at push time, after the commit exists — compress before committing, not after.
- History already carries duplicate copies of both showreels from earlier replacements. Every swap of a reel adds the new file's full size to history permanently; deleting it later does not shrink the repo.
- If reels grow much further, the fix is Git LFS or moving video to external hosting — not another in-place replacement.

**`docs/` is listed in `.gitignore` but `docs/acting-redesign-spec.md` is tracked anyway** (committed before the ignore rule). Git keeps honouring the existing tracking, so edits to that file *do* show up in `git status`; new files in `docs/` do not.
