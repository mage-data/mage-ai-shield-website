# Mage Data AI Shield Website — Build Plan

## Context

Building the Mage Data AI Shield website from scratch. The repo is greenfield — only `website_requirements.md` (full spec) and `CLAUDE.md` exist. The site is a product-brand marketing site targeting enterprise CISOs/CDOs in BFSI and Healthcare. The goal is to launch an MVP with 10 pages + 3 blog articles that supports sales conversations and inbound lead capture.

**Note:** `CLAUDE.md` currently references Next.js/Vercel, but the actual requirements specify **Astro 5.x + GitHub Pages**. CLAUDE.md must be updated first.

**Design decisions confirmed:**
- **Fonts:** Space Grotesk (headings) + Inter (body) + JetBrains Mono (code/labels)
- **Blog content:** Full-length, publication-ready articles (~1500 words each)

---

## Phase 0: Project Initialization

### 0.1 — Scaffold Astro Project
- Run `npm create astro@latest . -- --template minimal --typescript strict`
- Install integrations: `npx astro add tailwind sitemap mdx`
- Configure `astro.config.mjs`: `output: 'static'`, `site` URL, integrations array
- **Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (placeholder)

### 0.2 — Design Tokens & Global Styles
- Create `src/styles/global.css` with Tailwind directives, CSS custom properties for all 11 colors, `@font-face` rules (Space Grotesk headings, Inter body, JetBrains Mono code), `prefers-reduced-motion` base rules
- Configure `tailwind.config.mjs`: extend colors to reference CSS vars, extend fontFamily, configure content paths
- Add `public/fonts/.gitkeep` (placeholder until WOFF2 files sourced)
- Add `public/robots.txt` (allow-all with sitemap ref) and `public/favicon.svg` (placeholder shield icon)

### 0.3 — CI/CD Pipeline
- Create `.github/workflows/deploy.yml`: checkout → setup-node 20 → npm ci → astro build → upload-pages-artifact → deploy-pages

### 0.4 — Developer Tooling
- Create `.gitignore` (node_modules, dist, .astro, .env), `.editorconfig`, `.prettierrc` (with Astro plugin)
- Update `CLAUDE.md` to reflect Astro stack, add build/dev commands

### Phase 0 Verification
- `npm run dev` starts at localhost:4321
- `npm run build` produces `dist/` with static HTML
- GitHub Actions workflow file passes syntax validation

---

## Phase 1A: Design System & Global Components

### 1A.1 — BaseLayout
- `src/layouts/BaseLayout.astro` — HTML shell with props: `title`, `description`, `ogImage`, `canonicalUrl`, `jsonLd`
- Includes: global.css import, font preload links, analytics script (env flag), OG/Twitter meta, skip-nav link
- Renders: `<Header />`, `<slot />`, `<Footer />`

### 1A.2 — Sticky Navigation Header
- `src/components/Header.astro` — Desktop: logo + 4 dropdown menus (Platform, Solutions, Resources, Company) + 2 CTA buttons
- Mobile: hamburger toggle, slide-in panel
- Inline `<script>`: scroll listener (transparent → solid+blur at ~50px), dropdown open/close, mobile toggle
- Accessible: `aria-expanded`, `aria-haspopup`, `role="menu"`, keyboard nav, Escape to close
- Nav links for non-MVP pages point to parent route or are omitted initially

### 1A.3 — Footer
- `src/components/Footer.astro` — 4-column links, bottom bar (logo, copyright, "A Mage Data product", legal links, ISO 27001 badge, social icons as inline SVGs)
- Contact: 3 Columbus Circle, 15th Floor, NYC

### 1A.4 — Shared UI Components
| Component | File | Key Props |
|-----------|------|-----------|
| Button | `src/components/Button.astro` | `variant` (primary/secondary/outlined), `size`, `href` |
| SectionHeading | `src/components/SectionHeading.astro` | `title`, `subtitle`, `align`, `tag` (eyebrow) |
| StatCard | `src/components/StatCard.astro` | `number`, `suffix`, `label`, `source` — count-up via IntersectionObserver + rAF |
| FeatureCard | `src/components/FeatureCard.astro` | `icon`, `title`, `description`, `link` |
| TestimonialCard | `src/components/TestimonialCard.astro` | `quote`, `attribution`, `company` |
| CTASection | `src/components/CTASection.astro` | `heading`, `subheading`, `primaryCta`, `secondaryCta` — dark bg + accent glow |
| TrustBar | `src/components/TrustBar.astro` | `logos` array, `heading` — grayscale logo row |
| Card | `src/components/Card.astro` | Generic dark-slate card with optional hover lift |
- Utility: `src/utils/countUp.ts` — shared count-up animation function

### 1A.5 — Page Layout Templates
- `src/layouts/ProductPageLayout.astro` — extends BaseLayout, adds hero section + sidebar nav + bottom CTA
- `src/layouts/SolutionPageLayout.astro` — extends BaseLayout, adds hero + regulatory badges + testimonials + CTA

### Phase 1A Verification
- Dev server shows styled page with working nav (dropdowns, scroll transition, mobile hamburger)
- Keyboard navigation through all interactive elements
- All components render without errors
- `npm run build` succeeds

---

## Phase 1B: Core Pages

### 1B.1 — Homepage (`/`)
- `src/pages/index.astro` — 7 sections as specified in requirements

**Homepage-specific components:**
| Component | File | Description |
|-----------|------|-------------|
| HeroPipeline | `src/components/home/HeroPipeline.astro` | Canvas particle flow animation (data dots: red/amber → green through pipeline). ~2KB JS. Static SVG fallback for `prefers-reduced-motion`. `aria-hidden="true"` on canvas. |
| ProblemStatement | `src/components/home/ProblemStatement.astro` | 3-column gap analysis cards + callout bar |
| Capabilities | `src/components/home/Capabilities.astro` | 2x2 FeatureCard grid: Discover, Transform, Certify, Deliver |
| MarketUrgency | `src/components/home/MarketUrgency.astro` | 4 StatCards: "84%", "$11M", "Aug 2026", "63%" |
| IndustrySolutions | `src/components/home/IndustrySolutions.astro` | 2 large side-by-side cards (Healthcare, Banking) |
| HowItWorks | `src/components/home/HowItWorks.astro` | 5-step horizontal flow |
| SocialProof | `src/components/home/SocialProof.astro` | 3 TestimonialCards + analyst TrustBar |

### 1B.2 — Platform Overview (`/platform`)
- `src/pages/platform/index.astro`

**Platform-specific components:**
| Component | File | Description |
|-----------|------|-------------|
| ArchitectureDiagram | `src/components/platform/ArchitectureDiagram.astro` | SVG diagram with hover highlights + tooltips. Click → subpage nav. CSS transitions, JS tooltips. |
| PipelineStage | `src/components/platform/PipelineStage.astro` | Expandable section for each of 5 stages |
| ComparisonTable | `src/components/platform/ComparisonTable.astro` | AI Shield vs 5 competitors. Horizontal scroll on mobile. |
| TechSpecs | `src/components/platform/TechSpecs.astro` | Deployment, auth, API, audit, certs, performance |

### 1B.3 — Training Data Protection (`/platform/training-data`)
- `src/pages/platform/training-data.astro` — uses ProductPageLayout
- `src/components/product/BeforeAfterViz.astro` — animated data table (raw → masked on scroll/click). ~50-80 lines JS. Respects reduced-motion.
- Sections: Hero, Problem (5 pain points), Capabilities (5 detailed blocks), Use Case Scenarios (2 walkthroughs), CTA

### 1B.4 — GenAI Firewall (`/platform/genai-firewall`)
- `src/pages/platform/genai-firewall.astro` — uses ProductPageLayout
- Sections: Hero with stat callout, 6 capabilities, pipeline context positioning, CTA

### Phase 1B Verification
- All 4 routes render: `/`, `/platform`, `/platform/training-data`, `/platform/genai-firewall`
- Hero animation runs smoothly, degrades with `prefers-reduced-motion`
- StatCard count-up triggers on scroll
- Architecture diagram hover/click works
- BeforeAfterViz animates on scroll and via toggle button
- Mobile: all sections stack correctly, tables scroll horizontally
- `astro check` passes, `npm run build` succeeds

---

## Phase 1C: Solution Pages, Forms & Lead Capture

### 1C.1 — Healthcare Solution (`/solutions/healthcare`)
- `src/pages/solutions/healthcare.astro` — uses SolutionPageLayout
- Sections: Hero, Problem framing ($11M breach cost), How AI Shield helps (Safe Harbor, 18 identifiers, provenance), Supported systems, Regulatory mapping (HIPAA Privacy/Security/Breach), 3 testimonials, CTA

### 1C.2 — Banking Solution (`/solutions/banking`)
- `src/pages/solutions/banking.astro` — uses SolutionPageLayout
- Sections: Hero, Problem framing (fraud/credit/AML), How AI Shield helps, Supported systems (Oracle, Snowflake, DB2...), Regulatory mapping (GLBA, PCI-DSS, SOX, OCC, DPDP), CTA

### 1C.3 — Free Assessment (`/free-assessment`)
- `src/pages/free-assessment.astro`
- `src/components/forms/AssessmentForm.astro` — Fields: Name, Email, Company, Role (dropdown), DB count, Industry (dropdown), Regulation concern (dropdown). Submits to Formspree. UTM capture via hidden fields + inline JS. HTML5 validation.
- Sections: Hero, What you get (4 bullets), How it works (3-step visual), Form, Trust elements

### 1C.4 — Contact (`/contact`)
- `src/pages/contact.astro`
- `src/components/forms/ContactForm.astro` — Fields: Name, Email, Company, Phone (optional), Message. Separate Formspree endpoint. UTM capture.

### 1C.5 — About (`/company/about`)
- `src/pages/company/about.astro` — Company overview, mission, ISO 27001, analyst recognitions, link to magedata.ai

### Phase 1C Verification
- All 5 routes render correctly
- Forms submit to Formspree successfully (test real submission)
- UTM params captured (test with `?utm_source=test`)
- Validation prevents empty required fields
- Success message shown after submission
- Mobile: forms usable on small screens

---

## Phase 1D: Blog Infrastructure + Seed Content

### 1D.1 — Content Collections
- `src/content/config.ts` — Blog collection schema: title, description, date, author, tags, readTime, draft, ogImage (optional)

### 1D.2 — Blog Post Layout
- `src/layouts/BlogPostLayout.astro` — extends BaseLayout. Renders: article header (title, date, author, read time, tags), prose-styled content, inline CTA, related articles, social share links (URL-based, no third-party scripts)
- Configure Tailwind Typography plugin or custom prose styles for dark backgrounds

### 1D.3 — Blog Pages
- `src/pages/resources/blog/index.astro` — lists non-draft posts sorted by date desc
- `src/pages/resources/blog/[...slug].astro` — dynamic route via `getStaticPaths()` + `getCollection('blog')`

### 1D.4 — 3 Seed Articles
1. `src/content/blog/ai-training-data-blind-spot.md` — "Why AI training data is the biggest compliance blind spot in your enterprise"
2. `src/content/blog/hipaa-ai-security-rule-2026.md` — "HIPAA and AI: What the 2026 Security Rule updates mean for clinical AI training data"
3. `src/content/blog/eu-ai-act-training-data.md` — "EU AI Act training data requirements: A practical guide for data teams"

Each: ~1500 words of full, publication-ready content with real industry data, proper frontmatter, inline CTA to free assessment, internal links to product/solution pages.

### Phase 1D Verification
- `/resources/blog` lists all 3 articles with correct metadata
- Each article renders at `/resources/blog/[slug]` with styled prose
- Content Collections schema validates all frontmatter (`astro check`)
- Inline CTAs and internal links work

---

## Phase 1E: SEO, Analytics, Performance & QA

### 1E.1 — Structured Data (JSON-LD)
- `src/components/seo/JsonLd.astro` — helper component for `<script type="application/ld+json">`
- Add to BaseLayout: Organization schema (all pages), Product (platform pages), Article (blog posts)

### 1E.2 — Meta Tags Audit
- Ensure every page has unique: meta title (<60 chars), meta description (<155 chars), OG image, Twitter Card, canonical URL
- Create `public/images/og/` with branded OG images for key pages

### 1E.3 — Analytics
- Add Plausible script to BaseLayout (behind env flag)
- Add custom events for CTA clicks via `data-analytics` prop on Button
- Scroll depth tracking via sentinel divs + IntersectionObserver

### 1E.4 — Performance Optimization
- Font loading: preload critical font files, verify `font-display: swap`
- Images: WebP/AVIF, explicit width/height, `loading="lazy"` below fold
- JS audit: verify only interactive islands ship JS (target <50KB total)
- CSS audit: verify Tailwind purge (<30KB gzipped)
- CLS prevention: reserve nav height, set hero dimensions

### 1E.5 — Accessibility Audit
- Run axe/Lighthouse on all 10 pages
- Verify contrast ratios (teal on dark navy = 8.4:1 — good; body text `#94A3B8` on `#0B1120` needs verification)
- Keyboard navigation, focus indicators, screen reader testing
- `prefers-reduced-motion` disables all animations
- All form inputs have labels + aria attributes

### 1E.6 — Cross-Browser & Responsive Testing
- Browsers: Chrome, Firefox, Safari, Edge
- Viewports: 320px, 375px, 768px, 1024px, 1440px, 1920px

### 1E.7 — Pre-Launch Checklist
- [ ] All 10 pages render correctly
- [ ] No broken internal links
- [ ] Sitemap at `/sitemap-index.xml`
- [ ] robots.txt accessible
- [ ] Favicon renders
- [ ] OG images work (test with card validators)
- [ ] Forms submit end-to-end
- [ ] Analytics fires page views
- [ ] GitHub Actions deploys on push to main
- [ ] Custom domain configured (CNAME in `public/`)
- [ ] HTTPS working

### Phase 1E Verification
- Lighthouse: Performance 95+, Accessibility 95+, Best Practices 95+, SEO 100
- Structured data validates via Google Rich Results Test
- No console errors on any page
- Site loads <1.5s on throttled 3G

---

## Key Risks

| Risk | Mitigation |
|------|------------|
| Font files unavailable | System font fallback in CSS; site works without custom fonts |
| Logo/brand assets not ready | Text-based "AI Shield" logo in Space Grotesk; swap SVG when available |
| Hero animation complexity | Build in layers: static SVG → CSS keyframes → canvas. Page works at each stage. |
| Formspree not configured | Forms built with standard HTML; just need endpoint URLs |
| Content not written | Build page structures with `[TODO: Final copy]` placeholders |

---

## Estimated File Count

| Phase | New Files | Description |
|-------|-----------|-------------|
| 0 | ~10 | Project scaffold, config, CI/CD, tooling |
| 1A | ~14 | Layouts, nav, footer, shared components |
| 1B | ~16 | Homepage (8 components), platform (5 components), product pages |
| 1C | ~7 | Solution pages, form components, about |
| 1D | ~7 | Content config, blog layout, blog pages, 3 articles |
| 1E | ~3 | JSON-LD helper, OG images, modifications to existing files |
| **Total** | **~57** | |
