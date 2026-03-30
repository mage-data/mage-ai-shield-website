# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mage Data AI Shield website — "Making enterprise data safe for AI." A product brand site under Mage Data (magedata.ai) targeting CISOs, CDOs, and ML platform engineers at BFSI and Healthcare enterprises.

## Tech Stack

- **Framework:** Astro 5.x (static-first, islands architecture)
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite`
- **Animations:** CSS `@keyframes` + vanilla JS (Intersection Observer for scroll triggers)
- **Content:** Markdown/MDX via Astro Content Collections in `src/content/`
- **Forms:** Formspree or Web3Forms
- **Analytics:** Plausible (cookieless, GDPR-compliant)
- **Deployment:** GitHub Pages via GitHub Actions
- **Fonts:** Space Grotesk (headings) + Inter (body) + JetBrains Mono (code), self-hosted WOFF2

## Common Commands

- `npm run dev` — Start dev server at localhost:4321
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally
- `npx astro check` — Run TypeScript and Astro diagnostics

## Design System

- Dark-mode dominant, technical/editorial hybrid
- Primary bg: `#0B1120`, accent: `#00D4AA` (teal), secondary accent: `#8B7BF7` (violet)
- CSS custom properties defined in `src/styles/global.css`
- Tailwind theme extended via `@theme` in global.css
- No stock photography — SVG illustrations, data visualizations, architectural diagrams

## Project Structure

```
src/
├── components/     # Reusable Astro components
│   ├── home/       # Homepage-specific components
│   ├── platform/   # Platform page components
│   ├── product/    # Product page components
│   ├── forms/      # Form components
│   └── seo/        # SEO helpers (JsonLd)
├── layouts/        # BaseLayout, ProductPageLayout, SolutionPageLayout, BlogPostLayout
├── content/        # Content collections (blog posts as .md/.mdx)
├── pages/          # File-based routing
├── styles/         # global.css with Tailwind + design tokens
└── utils/          # Shared utilities (countUp.ts)
public/
├── fonts/          # Self-hosted WOFF2 files
├── images/         # Logos, OG images, icons
├── robots.txt
└── favicon.svg
```

## Key Reference

All detailed page specs, content, SEO strategy, and phased development plan are in `website_requirements.md`. Build plan is in `BUILD_PLAN.md`.
