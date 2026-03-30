# Mage Data AI Shield — Website

Marketing and product website for **Mage Data AI Shield** — "Making enterprise data safe for AI."

AI Shield is the missing layer between production databases and ML platforms. It discovers, de-identifies, certifies, and delivers AI-ready enterprise data for healthcare, banking, and other regulated industries.

**Live site:** [aishield.magedata.ai](https://aishield.magedata.ai) (once deployed)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 5.x](https://astro.build) — static-first, zero JS by default |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Content | Markdown/MDX via Astro Content Collections |
| Analytics | [Plausible](https://plausible.io) — cookieless, GDPR-compliant |
| Forms | [Formspree](https://formspree.io) |
| Deployment | GitHub Pages via GitHub Actions |

## Getting Started

```sh
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | Run TypeScript and Astro diagnostics |

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── home/            # Homepage sections (HeroPipeline, Capabilities, etc.)
│   ├── platform/        # Platform page components (ArchitectureDiagram, etc.)
│   ├── product/         # Product page components (BeforeAfterViz)
│   ├── forms/           # AssessmentForm, ContactForm
│   └── seo/             # JsonLd helper
├── layouts/             # BaseLayout, ProductPageLayout, SolutionPageLayout, BlogPostLayout
├── content/
│   └── blog/            # Blog posts as Markdown files
├── pages/               # File-based routing (14 pages)
├── styles/              # global.css — Tailwind + design tokens
└── utils/               # jsonLd.ts, countUp.ts
public/
├── fonts/               # Self-hosted WOFF2 (placeholder until sourced)
├── images/              # Logos, OG images
├── robots.txt
└── favicon.svg
```

## Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/platform` | Platform overview |
| `/platform/training-data` | AI training data protection |
| `/platform/genai-firewall` | GenAI firewall |
| `/solutions/healthcare` | Healthcare / HIPAA solution |
| `/solutions/banking` | Banking / financial services solution |
| `/free-assessment` | Free AI data risk assessment (lead gen) |
| `/contact` | Contact / demo request |
| `/company/about` | About AI Shield |
| `/resources/blog` | Blog listing |
| `/resources/blog/[slug]` | Individual blog posts (3 seed articles) |

## Design System

- **Dark-mode dominant** — primary background `#0B1120`, accent teal `#00D4AA`, accent violet `#8B7BF7`
- **Typography** — Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- **No stock photography** — SVG illustrations and data visualizations throughout
- Design tokens defined as CSS custom properties in `src/styles/global.css`

## Deployment

Pushes to `main` automatically deploy via GitHub Actions (`.github/workflows/deploy.yml`).

To enable:
1. Go to **Settings > Pages > Source** and select **GitHub Actions**
2. For a custom domain, add a `CNAME` file to `public/` and configure DNS

## Configuration

Before going live, update these placeholders:

- **Formspree endpoints** — Replace `YOUR_FORM_ID` in `src/components/forms/AssessmentForm.astro` and `ContactForm.astro`
- **Font files** — Add WOFF2 files to `public/fonts/` (Space Grotesk, Inter, JetBrains Mono)
- **Plausible domain** — Verify `data-domain` in `src/layouts/BaseLayout.astro` matches your domain
- **Social links** — Update LinkedIn, YouTube, X URLs in `src/components/Footer.astro`

## Documentation

- `website_requirements.md` — Full site specification (pages, content, SEO, design)
- `BUILD_PLAN.md` — Phased implementation plan
- `CLAUDE.md` — AI assistant guidance for this repo
