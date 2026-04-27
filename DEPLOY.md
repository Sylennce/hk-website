# harrisonkeen.tech — Deployment Guide

## What's been built

Single-page personal brand landing page at `index.html`. Sections: hero → work → experience → footer.
Existing Canvas page retrieved and saved to `canvas/index.html`.
`netlify.toml` configured for Netlify static hosting.

## File structure

```
Website/
├── index.html              ← new landing page (root)
├── HARRISON.jpeg           ← headshot
├── harrison_keen_resume.pdf
├── harrison_keen_cover_letter.pdf
├── netlify.toml            ← Netlify config
├── canvas/
│   └── index.html          ← existing Canvas page (served at /canvas)
└── docs/
    └── superpowers/
        └── plans/
            └── 2026-04-27-harrisonkeen-landing.md
```

## Deploy steps

### 1. Push to GitHub

Create a new repo on github.com (e.g. `harrisonkeen-website`), then:

```bash
git remote add origin https://github.com/<your-username>/harrisonkeen-website.git
git branch -M main
git push -u origin main
```

### 2. Create Netlify site

1. netlify.com → **Add new site** → **Import an existing project** → connect GitHub
2. Select `harrisonkeen-website`
3. Build command: leave **blank**
4. Publish directory: `.`
5. Click **Deploy site**
6. Confirm the page loads at the random `.netlify.app` URL before continuing

### 3. Add custom domain in Netlify

Site settings → **Domain management** → **Add custom domain** → enter `harrisonkeen.tech`

Netlify will give you either:
- A **CNAME** record: `CNAME @ <site-name>.netlify.app`, or
- Two **A records** (Netlify load balancer IPs)

Note these values down before going to Cloudflare.

### 4. Update Cloudflare DNS

In the Cloudflare dashboard for `harrisonkeen.tech`:

1. Delete or update the existing A/CNAME record pointing to the old host
2. Add the record(s) from Netlify:
   - If CNAME: add `CNAME` for `@` pointing to `<site-name>.netlify.app`
   - If A records: add both A records for `@`
3. Set the proxy to **DNS only** (grey cloud, not orange)
4. Set **SSL/TLS** encryption mode to **Full**

### 5. Provision HTTPS in Netlify

Back in Netlify → Domain management → **Verify DNS configuration** → **Provision certificate** (Let's Encrypt, free)

DNS propagation can take a few minutes to an hour.

### 6. Final verification

| URL | Expected |
|-----|----------|
| `https://harrisonkeen.tech` | New landing page |
| `https://harrisonkeen.tech/canvas` | Existing Canvas page |
| All footer social links | Open correct destinations |

## Git history (at time of build)

```
a7b62a3 chore: add netlify.toml with publish dir and canvas redirect
75da480 feat: move canvas page to canvas/index.html subpath
9bdf02f feat: add footer with social links
c7803b5 feat: add experience section with timeline and skills block
16dddb5 feat: add work section with Saffra Scripts card
013a778 style: add hover and focus states to CTA buttons
792a718 feat: add hero section with photo, name, tagline and CTA buttons
318dd71 feat: scaffold index.html with full CSS
1797618 chore: initial commit with existing assets
```
