# harrisonkeen.tech Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal brand landing page at harrisonkeen.tech that introduces Harrison Keen as an actor, software developer, and AI builder.

**Architecture:** Single static `index.html` with all CSS inline in a `<style>` block — no build step, no frameworks, no JavaScript. The existing Canvas page moves to `canvas/index.html`. Both are deployed to Netlify and served via Cloudflare DNS.

**Tech Stack:** HTML5, CSS3 (custom properties, clamp(), linear-gradient, backdrop-filter), Netlify (static hosting), Cloudflare (DNS)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Create | Root landing page |
| `HARRISON.jpeg` | Exists | Headshot used in hero |
| `canvas/index.html` | Create | Existing Canvas page moved here |
| `_redirects` | Create | Netlify redirect rules (if needed) |

---

## Task 1: Initialise git and scaffold index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: Initialise git repo**

```bash
cd "C:\Users\Keen_\Desktop\Projects\Website"
git init
git add HARRISON.jpeg harrison_keen_resume.pdf harrison_keen_cover_letter.pdf
git commit -m "chore: initial commit with existing assets"
```

- [ ] **Step 2: Create index.html with full CSS**

Create `C:\Users\Keen_\Desktop\Projects\Website\index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Harrison Keen — Actor, Software Developer, Innovator.">
  <title>Harrison Keen</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #0a0a14;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #fff;
    }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      background: linear-gradient(160deg, #1a0533 0%, #0d1a3a 60%, #0a0a14 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 24px;
      position: relative;
      overflow: hidden;
    }
    .hero-glow-1 {
      position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
      width: 500px; height: 500px;
      background: rgba(236, 72, 153, 0.12);
      border-radius: 50%; filter: blur(80px); pointer-events: none;
    }
    .hero-glow-2 {
      position: absolute; bottom: -60px; right: 10%;
      width: 300px; height: 300px;
      background: rgba(139, 92, 246, 0.15);
      border-radius: 50%; filter: blur(70px); pointer-events: none;
    }
    .hero-photo {
      width: 140px; height: 140px;
      border-radius: 50%; overflow: hidden;
      border: 2px solid rgba(192, 132, 252, 0.5);
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
      margin-bottom: 20px;
      position: relative; z-index: 1;
    }
    .hero-photo img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: center top;
    }
    .hero-name {
      font-size: clamp(32px, 5vw, 52px);
      font-weight: 900;
      letter-spacing: -1px;
      margin-bottom: 10px;
      position: relative; z-index: 1;
      background: linear-gradient(90deg, #ffffff, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-tagline {
      font-size: clamp(13px, 2vw, 18px);
      font-weight: 400;
      color: rgba(255, 255, 255, 0.55);
      letter-spacing: 1px;
      margin-bottom: 32px;
      position: relative; z-index: 1;
    }
    .hero-buttons {
      display: flex; gap: 12px; flex-wrap: wrap;
      justify-content: center;
      position: relative; z-index: 1;
    }
    .btn-primary {
      background: linear-gradient(90deg, #8b5cf6, #ec4899);
      color: #fff; padding: 12px 28px;
      font-size: 13px; font-weight: 700;
      border-radius: 30px; text-decoration: none;
    }
    .btn-secondary {
      border: 1px solid rgba(192, 132, 252, 0.4);
      color: #c084fc; padding: 12px 28px;
      font-size: 13px; font-weight: 600;
      border-radius: 30px; text-decoration: none;
    }

    /* ── SHARED ── */
    .sec-label {
      color: #c084fc;
      font-size: 13px; font-weight: 700;
      letter-spacing: 3px; text-transform: uppercase;
      margin-bottom: 12px;
    }

    /* ── WORK ── */
    .work {
      background: rgba(255, 255, 255, 0.02);
      padding: 80px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .work-inner {
      max-width: 900px; margin: 0 auto; text-align: center;
    }
    .work-inner h2 {
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 800; margin-bottom: 8px;
    }
    .work-subtitle {
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px; margin-bottom: 48px;
    }
    .work-card {
      max-width: 480px; margin: 0 auto;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.05));
      border: 1px solid rgba(192, 132, 252, 0.15);
      border-radius: 16px; padding: 28px;
      text-align: left;
    }
    .card-label {
      color: #c084fc;
      font-size: 11px; font-weight: 700;
      letter-spacing: 3px; text-transform: uppercase;
      margin-bottom: 10px;
    }
    .work-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 10px; }
    .work-card p {
      color: rgba(255, 255, 255, 0.55);
      font-size: 13px; line-height: 1.7; margin-bottom: 20px;
    }
    .work-card a {
      font-size: 12px; font-weight: 700;
      color: #c084fc; text-decoration: none;
    }

    /* ── EXPERIENCE ── */
    .experience { max-width: 780px; margin: 0 auto; padding: 80px 24px; }
    .experience h2 {
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 800; margin-bottom: 8px;
    }
    .exp-subtitle {
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px; margin-bottom: 48px;
    }
    .exp-item {
      display: flex; gap: 20px;
      margin-bottom: 36px; padding-bottom: 36px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .exp-item:last-child { border-bottom: none; }
    .exp-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      margin-top: 6px; flex-shrink: 0;
    }
    .exp-body { flex: 1; }
    .exp-role { font-size: 16px; font-weight: 700; margin-bottom: 3px; }
    .exp-company { color: #c084fc; font-size: 13px; font-weight: 600; margin-bottom: 3px; }
    .exp-date { color: rgba(255, 255, 255, 0.35); font-size: 12px; margin-bottom: 10px; }
    .exp-desc { color: rgba(255, 255, 255, 0.55); font-size: 13px; line-height: 1.7; }
    .skills-block { margin-top: 48px; }
    .skills-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .skill-tag {
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.2);
      color: rgba(255, 255, 255, 0.7);
      padding: 5px 12px; border-radius: 20px; font-size: 11px;
    }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding: 40px 24px; text-align: center;
    }
    .social-links { display: flex; gap: 16px; justify-content: center; margin-bottom: 16px; }
    .social-links a { color: rgba(255, 255, 255, 0.4); font-size: 13px; text-decoration: none; }
    .social-links a:hover { color: #c084fc; }
    .footer-copy { color: rgba(255, 255, 255, 0.2); font-size: 12px; }
  </style>
</head>
<body>
  <!-- content added in subsequent tasks -->
</body>
</html>
```

- [ ] **Step 3: Open in browser and confirm it renders a dark blank page without errors**

Open `index.html` in your browser. Expected: black/dark background, no console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: scaffold index.html with full CSS"
```

---

## Task 2: Hero section

**Files:**
- Modify: `index.html` — replace `<body>` content

- [ ] **Step 1: Add hero HTML inside `<body>`**

Replace `<!-- content added in subsequent tasks -->` with:

```html
  <!-- HERO -->
  <section class="hero">
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>
    <div class="hero-photo">
      <img src="HARRISON.jpeg" alt="Harrison Keen" />
    </div>
    <div class="hero-name">Harrison Keen</div>
    <p class="hero-tagline">Actor.&nbsp; Software Developer.&nbsp; Innovator.</p>
    <div class="hero-buttons">
      <a href="/canvas" class="btn-primary">Canvas Work</a>
      <a href="https://saffrascripts.com" class="btn-secondary" target="_blank" rel="noopener">Saffra Scripts &#x2197;</a>
    </div>
  </section>

  <!-- WORK, EXPERIENCE, FOOTER added in subsequent tasks -->
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`. Expected:
- Dark gradient background with pink/purple glow blobs
- Circular photo of Harrison (140×140px) with purple glow border
- "Harrison Keen" in large white-to-purple gradient text
- "Actor. Software Developer. Innovator." in muted smaller text below
- Purple gradient "Canvas Work" pill button and outlined "Saffra Scripts ↗" button

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add hero section with photo, name, tagline and CTA buttons"
```

---

## Task 3: Work section

**Files:**
- Modify: `index.html` — add work section after hero

- [ ] **Step 1: Add work section HTML**

Replace `<!-- WORK, EXPERIENCE, FOOTER added in subsequent tasks -->` with:

```html
  <!-- WORK -->
  <section class="work">
    <div class="work-inner">
      <div class="sec-label">Work</div>
      <h2>What I&#8217;ve built</h2>
      <p class="work-subtitle">A live AI platform, end-to-end and in use.</p>
      <div class="work-card">
        <div class="card-label">AI Platform</div>
        <h3>Saffra Scripts</h3>
        <p>Solo-built AI platform that generates a complete 100-page screenplay from six user inputs. Live and in use, end-to-end automated with n8n and the Claude API.</p>
        <a href="https://saffrascripts.com" target="_blank" rel="noopener">Visit site &#x2197;</a>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE, FOOTER added in subsequent tasks -->
```

- [ ] **Step 2: Verify in browser**

Scroll below hero. Expected:
- Slightly lighter background stripe for the work section
- "WORK" label in purple, "What I've built" heading, subtitle below
- Single centred card: "AI PLATFORM" label (purple, bold), "Saffra Scripts" title, description text, "Visit site ↗" link

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add work section with Saffra Scripts card"
```

---

## Task 4: Experience section

**Files:**
- Modify: `index.html` — add experience section after work

- [ ] **Step 1: Add experience section HTML**

Replace `<!-- EXPERIENCE, FOOTER added in subsequent tasks -->` with:

```html
  <!-- EXPERIENCE -->
  <section class="experience">
    <div class="sec-label">Experience</div>
    <h2>Background</h2>
    <p class="exp-subtitle">Co-op scholar, enterprise intern, and shipping-grade developer.</p>

    <div class="exp-item">
      <div class="exp-dot"></div>
      <div class="exp-body">
        <div class="exp-role">Website Designer</div>
        <div class="exp-company">The King&#8217;s School &middot; Sydney, Australia</div>
        <div class="exp-date">June 2024 &#8211; Present</div>
        <div class="exp-desc">Designing, building, and maintaining internal web platforms and digital learning environments within Canvas LMS using DesignPlus for custom UI components.</div>
      </div>
    </div>

    <div class="exp-item">
      <div class="exp-dot"></div>
      <div class="exp-body">
        <div class="exp-role">EUC Engineering Intern</div>
        <div class="exp-company">Woolworths Group &middot; SOI EUC Engineering</div>
        <div class="exp-date">January 2022 &#8211; July 2022</div>
        <div class="exp-desc">Supported enterprise end-user computing infrastructure across corporate and BYOD devices. Systems administration, endpoint management, and internal IT tooling at scale.</div>
      </div>
    </div>

    <div class="exp-item">
      <div class="exp-dot"></div>
      <div class="exp-body">
        <div class="exp-role">Software Development Intern</div>
        <div class="exp-company">Channel Nine &middot; 9Now Streaming</div>
        <div class="exp-date">January 2021 &#8211; July 2021</div>
        <div class="exp-desc">Contributed to the 9Now streaming platform in a fast-paced production team. Onboarded rapidly into an unfamiliar codebase and delivered production-grade work.</div>
      </div>
    </div>

    <div class="exp-item">
      <div class="exp-dot"></div>
      <div class="exp-body">
        <div class="exp-role">Bachelor of Information Technology (Co-op Scholarship)</div>
        <div class="exp-company">University of Technology Sydney</div>
        <div class="exp-date">Graduated November 2022</div>
      </div>
    </div>

    <div class="skills-block">
      <div class="sec-label">Skills</div>
      <div class="skills-tags">
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">React</span>
        <span class="skill-tag">HTML &amp; CSS</span>
        <span class="skill-tag">SQL</span>
        <span class="skill-tag">Java</span>
        <span class="skill-tag">REST APIs</span>
        <span class="skill-tag">n8n</span>
        <span class="skill-tag">Claude API</span>
        <span class="skill-tag">Canvas LMS</span>
        <span class="skill-tag">Cloudflare</span>
        <span class="skill-tag">PowerShell</span>
        <span class="skill-tag">Jira</span>
      </div>
    </div>
  </section>

  <!-- FOOTER added in next task -->
```

- [ ] **Step 2: Verify in browser**

Scroll to experience section. Expected:
- "EXPERIENCE" label, "Background" heading, subtitle
- Four timeline entries each with a purple/pink gradient dot, role, company in purple, date in muted text, description
- "SKILLS" label appearing with 48px gap below the education entry
- Skill tags as rounded pill chips

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add experience section with timeline and skills block"
```

---

## Task 5: Footer

**Files:**
- Modify: `index.html` — add footer after experience section

- [ ] **Step 1: Add footer HTML**

Replace `<!-- FOOTER added in next task -->` with:

```html
  <!-- FOOTER -->
  <footer>
    <div class="social-links">
      <a href="mailto:keen_ha@outlook.com">Email</a>
      <a href="https://www.linkedin.com/in/harrisonkeen/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://www.instagram.com/harrison_keen_/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.imdb.com/name/nm15486957/" target="_blank" rel="noopener">IMDb</a>
    </div>
    <div class="footer-copy">&copy; 2025 Harrison Keen</div>
  </footer>
```

- [ ] **Step 2: Verify all links in browser**

Open the page and click every link. Expected:
- "Canvas Work" button → navigates to `/canvas` (will 404 locally — that's fine until Task 6)
- "Saffra Scripts ↗" button → opens `https://saffrascripts.com` in new tab
- Email → opens mail client to `keen_ha@outlook.com`
- LinkedIn → opens `https://www.linkedin.com/in/harrisonkeen/` in new tab
- Instagram → opens `https://www.instagram.com/harrison_keen_/` in new tab
- IMDb → opens `https://www.imdb.com/name/nm15486957/` in new tab

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add footer with social links"
```

---

## Task 6: Canvas subpage

The existing Canvas page HTML currently lives at harrisonkeen.tech. Retrieve it and place it at `canvas/index.html` so Netlify serves it at `harrisonkeen.tech/canvas`.

**Files:**
- Create: `canvas/index.html`

- [ ] **Step 1: Retrieve the existing Canvas page HTML**

In your browser, go to `https://harrisonkeen.tech`, hit **Ctrl+U** (View Source), select all, copy.

Or via curl:
```bash
curl -o canvas/index.html https://harrisonkeen.tech
```

(Create the `canvas/` folder first if using curl: `mkdir canvas`)

- [ ] **Step 2: Verify canvas/index.html renders correctly**

Open `canvas/index.html` directly in your browser. It should look identical to the current harrisonkeen.tech page. If any assets (images, CSS, JS) are hosted externally via absolute URLs they will load fine. If any use relative paths they will need to be updated to absolute URLs pointing to their current host.

- [ ] **Step 3: Commit**

```bash
git add canvas/index.html
git commit -m "feat: move canvas page to canvas/index.html subpath"
```

---

## Task 7: Deploy to Netlify and configure DNS

**Files:**
- Create: `netlify.toml` (optional but recommended)

- [ ] **Step 1: Create netlify.toml**

Create `C:\Users\Keen_\Desktop\Projects\Website\netlify.toml`:

```toml
[build]
  publish = "."

[[redirects]]
  from = "/canvas"
  to = "/canvas/index.html"
  status = 200
```

- [ ] **Step 2: Commit netlify.toml**

```bash
git add netlify.toml
git commit -m "chore: add netlify.toml with publish dir and canvas redirect"
```

- [ ] **Step 3: Push repo to GitHub**

Create a new repo on github.com (name it e.g. `harrisonkeen-website`), then:

```bash
git remote add origin https://github.com/<your-username>/harrisonkeen-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4: Create Netlify site from GitHub**

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
2. Connect GitHub, select `harrisonkeen-website`
3. Build command: leave blank
4. Publish directory: `.`
5. Click **Deploy site**
6. Netlify will give you a random subdomain like `peaceful-curie-abc123.netlify.app` — confirm the site loads correctly there first

- [ ] **Step 5: Add custom domain in Netlify**

In Netlify site settings → **Domain management** → **Add custom domain** → enter `harrisonkeen.tech` → click verify.

Netlify will show you either:
- A **CNAME** record to point to `<site-name>.netlify.app`, or
- Two **A records** (Netlify load balancer IPs)

Note these values down.

- [ ] **Step 6: Update Cloudflare DNS**

In your Cloudflare dashboard for `harrisonkeen.tech`:

1. Delete or update the existing A/CNAME record pointing to the old host
2. Add the record(s) Netlify provided in Step 5:
   - If CNAME: `CNAME @ <site-name>.netlify.app` (proxy: DNS only / grey cloud)
   - If A records: add both A records for `@`
3. Set **SSL/TLS** to **Full** in Cloudflare (Netlify handles its own cert)

- [ ] **Step 7: Enable Netlify HTTPS**

Back in Netlify → Domain management → click **Verify DNS configuration** → then **Provision certificate** (Let's Encrypt, free).

- [ ] **Step 8: Final verification**

Visit each URL and confirm:

| URL | Expected |
|-----|----------|
| `https://harrisonkeen.tech` | New landing page loads |
| `https://harrisonkeen.tech/canvas` | Existing Canvas page loads |
| `https://www.harrisonkeen.tech` | Redirects to apex (Netlify handles this) |
| All footer social links | Open correct external destinations |

---

## Self-Review

**Spec coverage:**
- ✅ Hero: photo, name, tagline, two buttons
- ✅ Work: Saffra Scripts card only, "What I've built"
- ✅ Experience: 3 jobs + education timeline, skills block separated with 48px buffer
- ✅ Footer: Email, LinkedIn, Instagram, IMDb
- ✅ Canvas page moved to `/canvas`
- ✅ No About section
- ✅ No Canvas Work project card in Work section
- ✅ Design language: purple/pink gradient, bold heading, muted tagline, bold section labels

**Placeholder scan:** None found — all steps contain complete code.

**Type consistency:** CSS class names used in HTML match definitions in `<style>` block throughout all tasks.
