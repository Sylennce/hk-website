# Acting Page Redesign — Design Spec

**Date:** 2026-05-11  
**Status:** Design approved — ready for implementation  
**Output file:** `acting/index.html`  
**Constraint:** Vanilla HTML5 + CSS3 only. No JS, no frameworks, no build tools.

---

## Overview

A dedicated acting portfolio page at `/acting/` (rewrite from `acting/index.html`). Dark theme matching the main site (`#0a0a14` base), purple/pink gradient accents (`#8b5cf6`, `#ec4899`). Sections top to bottom: Hero → Reel → Gallery → Credits.

---

## Section 1 — Hero

**Layout:** Two tall pillar photos (portrait cards, slightly rotated) positioned in the right ~60% of the hero frame. Text block sits bottom-left of the photos in the second horizontal quarter.

**Background:** Warm noir dot field  
- Base colour: `#0c0907`  
- Pattern: `radial-gradient(circle, rgba(255,255,255,0.048) 1px, transparent 1px)` at `24px 24px` via `::before` pseudo-element (z-index 0, below glows)  
- Glow 1 (centre): `520×520px`, `left:42%`, `top:50%`, warm amber/brown (`rgba(160,78,8,0.18)` → `rgba(110,44,4,0.07)` → transparent)  
- Glow 2 (bottom-left): `400×400px`, `left:-80px`, `bottom:-80px`, violet (`rgba(100,36,210,0.22)`)  
- Glow 3 (top-right): `260×260px`, `right:4%`, `top:-50px`, pink (`rgba(236,72,153,0.12)`)  

**Photos:**
- Left pillar: `HARRISON KEEN 4.jpeg` — `172×342px`, `top:42px`, `left:52%`, `rotate(-2deg)`, `object-position: 40% top`
- Right pillar: `HARRISON KEEN 2.jpeg` — `164×328px`, `top:48px`, `left:66%`, `rotate(3deg)`, `object-position: center top`, accent border (`rgba(192,132,252,0.2)`) + purple glow shadow

**Text block** (`bottom:46px`, `left:22%`, `width:248px`, `z-index:20`):
- "ACTOR" tag — purple small-caps with gradient line decoration
- Name: "Harrison / Keen" — `56px`, weight 900, `letter-spacing:-2.5px`, `line-height:0.85`, gradient text (`#fff` → `rgba(192,132,252,0.6)`), drop-shadow glow
- Divider: `36px` gradient line
- Tagline: "Vancouver based. Internationally cast." — `11.5px`, `rgba(255,255,255,0.5)`, `white-space:nowrap`
- Buttons (flex row, `gap:8px`):
  - "Watch Reel" — gradient fill (`#8b5cf6` → `#ec4899`), `border-radius:22px`, purple box-shadow
  - "IMDb ↗" — ghost button, `border: 1px solid rgba(192,132,252,0.35)`, purple text

**Frame:** `height:460px`, `border-radius:24px`, `overflow:hidden`, `border:1px solid rgba(255,255,255,0.07)`, `box-shadow:0 32px 100px rgba(0,0,0,0.65)`

---

## Section 2 — Reel

**Layout:** Vertical stack — full-width showreel at top, then a two-column row below.

**Showreel block:**
- Full-width video player (`aspect-ratio:16/9`), `border-radius:16px`, dark border
- "SHOWREEL" badge — pill overlay, top-left, frosted glass (`backdrop-filter:blur(6px)`)
- Info bar below video: title + subtitle left, "IMDb ↗" ghost chip right

**Two-column row** (`grid-template-columns: 1fr auto`, `align-items:stretch`):

Left column (text/stats, `display:flex; flex-direction:column; justify-content:space-between`):
- Big stat: "14+" in gradient text (`#c084fc` → `#ec4899`), `56px` weight 900, label + subtext below
- Horizontal rule separator
- "Filmed Internationally" block with flag+name pairs: Australia, China, Turkey
- Horizontal rule separator
- Award block: gradient background card, trophy emoji, "NOMINATED" label, "Male Rising Star — 2025", "Vertical Drama Love Fan Awards"

Right column:
- Vertical reel card (`width:220px`), `border-radius:18px`, video fills full height (`flex:1; object-fit:cover`)
- "VERTICAL REEL" badge overlay
- Purple glow blob beneath card

**Video sources:**
- Showreel: `acting/resources/Showreel_HarrisonKeen.mp4`
- Vertical reel: `acting/resources/VerticalReel_HarrisonKeen.mp4`
- Both: `muted autoplay loop playsinline`

---

## Section 3 — Gallery

**Layout:** 4-column manual flex masonry  
`display:flex; gap:12px; align-items:flex-start`  
Each column: `flex:1; display:flex; flex-direction:column; gap:12px; min-width:0`

**Image treatment:** Natural aspect ratios (`height:auto`, no cropping or forced heights). Photos have `border:2px solid rgba(255,255,255,0.1)`, `border-radius:10px`, shadow.

**Column distribution** (P = portrait, L = landscape):

| Col 1 (4 items)         | Col 2 (4 items)      | Col 3 (3 items)    | Col 4 (2 items)          |
|-------------------------|----------------------|--------------------|--------------------------|
| HARRISON KEEN 1.jpeg (P)| HARRISON KEEN 3.jpeg (P)| HARRISON 457.jpeg (P)| IMG_1783_cropped.JPG (P)|
| IMG_1820.JPG (L)        | _MRC8528.JPG (P)     | IMG_1941.JPG (P)   | IMG_2006.JPG (L)         |
| DSC07561.jpg (P)        | IMG_1906.JPG (L)     | DSC08433.jpg (P)   |                          |
| scaledDown.JPG (P)      | IMG_1949.JPG (P)     |                    |                          |

Total: 13 images. Landscapes distributed across cols 1, 2, 4 to offset portrait-heavy stacking.

**Section header:** "PHOTOS" in purple uppercase small-caps with trailing gradient rule.

---

## Section 4 — Credits

**Layout:** IMDb-style filmography — grouped by category, each group has a purple category label, rows of `year | title | role | platform-badge`, with "View all →" for large categories.

**Categories:**
- Feature Film (single entry shown fully)
- Vertical Short-Drama (14 total — show 3, "View all 14 →")
- Short Film · Commercial · Theatre (collapsed into one group — show 1 each, "View all →")

**Row anatomy:** `display:flex; align-items:baseline; gap:10px`  
- Year: `11px`, purple, `min-width:36px`  
- Title: `13px`, weight 700, `flex:1`  
- Role: `11px`, muted, `flex:1; text-align:right`  
- Badge: small pill, `rgba(139,92,246,0.15)` bg, `#a78bfa` text

**Card container:** `background:#0d0d1a`, `border-radius:18px`, `border:1px solid rgba(255,255,255,0.07)`, `padding:22px`

---

## Assets

All assets live in `acting/resources/`:
- Images: HARRISON KEEN 1–4.jpeg, HARRISON 457.jpeg, _MRC8528.JPG, IMG_1783_cropped.JPG, IMG_1820.JPG, IMG_1906.JPG, IMG_1941.JPG, IMG_1949.JPG, IMG_2006.JPG, DSC07561.jpg, DSC08433.jpg, scaledDown.JPG
- Video: Showreel_HarrisonKeen.mp4, VerticalReel_HarrisonKeen.mp4
- CV: CV.pdf

---

## Page Structure

```
acting/index.html
  <style>  ← all CSS inline, single block
  <body>
    .hero          ← section 1
    .reel          ← section 2
    .gallery       ← section 3
    .credits       ← section 4
```

Section spacing: `padding: 56px 60px` body, `margin-bottom: 80px` between sections (approx).  
Font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (same as main site).

---

## Implementation Notes

- All CSS in a single `<style>` block in `acting/index.html`
- No JS — video autoplays via HTML attributes, no custom controls needed
- Hero pillar photos: use `object-fit:cover` + `object-position` to control crop
- Hero `::before` texture must be `z-index:0`; glow divs `z-index:1`; photos `z-index:2/3`; text `z-index:20`
- Gallery images: `width:100%; height:auto` — never force a height, let aspect ratio be natural
- Credits "View all" links — can be dead links (`href="#"`) for now; actual CV/IMDb links can be wired up later
