# Mage Data AI Shield — Website Build Plan

## Brand Overview

**Brand name:** Mage Data AI Shield
**Tagline:** "Making enterprise data safe for AI"
**Relationship to parent:** A focused product brand under Mage Data (magedata.ai). AI Shield inherits Mage Data's core technology (discovery, classification, masking, audit) but presents an entirely AI-centric identity, messaging, and buyer experience.
**Target audience:** CISOs, CDOs, VP Data Science, Chief Privacy Officers, and ML platform engineers at large BFSI and Healthcare enterprises globally.
**Competitive positioning:** The missing layer in the AI data pipeline — between production databases and ML platforms. Not an AI security tool (that's Lakera/Lasso). Not a data governance tool (that's Varonis/BigID). AI Shield is the *data transformation* layer that makes sensitive data safe to use in AI.

---

## 1. Site Architecture & Page Map

```
/                           → Homepage
/platform                   → Platform overview (how it works)
/platform/training-data     → AI training data protection
/platform/genai-firewall    → GenAI prompt firewall
/platform/prompt-protection → Real-time prompt protection
/platform/ml-workloads      → Securing AI/ML workloads
/platform/provenance        → Training data provenance certification
/platform/integrations      → ML platform integrations
/solutions/healthcare       → Healthcare / HIPAA use case
/solutions/banking          → Banking / financial services use case
/solutions/insurance        → Insurance use case
/solutions/eu-ai-act        → EU AI Act compliance
/resources/blog             → Blog / thought leadership
/resources/whitepapers      → Whitepapers & datasheets
/resources/case-studies      → Case studies
/resources/podcasts          → AI security podcasts
/company/about              → About AI Shield / Mage Data
/company/leadership          → Leadership team
/company/partners            → Partner program
/contact                    → Contact / request demo
/free-assessment             → Free AI data risk assessment landing page
```

**Total pages at launch:** 20 pages
**Priority for MVP (launch with these first):** Homepage, Platform overview, Training data protection, GenAI firewall, Healthcare solution, Banking solution, Free assessment, Contact, About, Blog (with 3-5 seed articles)

---

## 2. Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro 5.x | Static-first, ships zero JS by default, islands architecture for interactive components only where needed. Perfect for a marketing/product site where most pages are content-heavy. Built-in Markdown/MDX support eliminates the need for a CMS. |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration, responsive by default. Astro has first-class Tailwind integration via `@astrojs/tailwind`. |
| Animations | CSS animations + vanilla JS | Scroll-triggered reveals via Intersection Observer, CSS `@keyframes` for micro-interactions. No heavy animation library needed — keeps bundle size minimal. For the few interactive components (architecture diagram, before/after data viz), use Astro islands with a `<script>` tag or a lightweight Preact island. |
| Content | Markdown/MDX files in repo | Blog posts, whitepapers metadata, and case studies as `.md`/`.mdx` files in a `src/content/` directory using Astro's built-in Content Collections. No external CMS — content is version-controlled alongside code. |
| Documents | PDF files hosted on GitHub | Whitepapers, datasheets, and downloadable resources stored as PDF files in a public GitHub repository (e.g., `github.com/magedata/ai-shield-docs`). Linked directly from the site using raw GitHub URLs or GitHub Pages URLs from the docs repo. Keeps the main site repo lightweight and makes document updates independent of site deploys. |
| Forms | Formspree or Web3Forms | No server-side processing needed. Both services provide free tiers, spam protection, and email forwarding. Demo requests, contact forms, and assessment intake all submit to Formspree endpoints. Alternatively, use a simple `mailto:` link for the MVP if form volume is low. |
| Analytics | Plausible (cloud) or Umami (self-hosted) | Privacy-friendly, no cookies, GDPR-compliant out of the box. Important for a data security brand to model good privacy practices. Plausible offers a lightweight script (<1KB). |
| Deployment | GitHub Pages | Free hosting, custom domain support, automatic deploys via GitHub Actions. Astro has a built-in `@astrojs/sitemap` integration and a well-documented GitHub Pages deployment guide. Static output (`output: 'static'` in astro config) is a perfect fit. |
| CI/CD | GitHub Actions | On push to `main`, run `astro build` and deploy to GitHub Pages. Simple workflow file, no external services needed. |
| Domain | aishield.magedata.ai or magedata-aishield.com | Subdomain ties to parent brand; standalone domain for independence. Configure via CNAME file in the repo for GitHub Pages custom domain. |

### Astro project structure

```
ai-shield-site/
├── public/
│   ├── fonts/                    # Self-hosted web fonts (WOFF2)
│   ├── images/                   # Logos, OG images, icons
│   └── favicon.svg
├── src/
│   ├── components/               # Reusable Astro/HTML components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── StatCard.astro
│   │   ├── FeatureCard.astro
│   │   ├── TestimonialCard.astro
│   │   ├── PipelineDiagram.astro
│   │   ├── ComparisonTable.astro
│   │   ├── CTASection.astro
│   │   └── BeforeAfterViz.astro  # Interactive island (uses <script>)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, meta tags, nav, footer
│   │   ├── ProductPage.astro     # Layout for platform/* pages
│   │   ├── SolutionPage.astro    # Layout for solutions/* pages
│   │   └── BlogPost.astro        # Layout for blog posts
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   ├── blog/                 # Blog posts as .md files
│   │   │   ├── ai-training-data-blind-spot.md
│   │   │   ├── hipaa-ai-security-rule-2026.md
│   │   │   ├── eu-ai-act-training-data.md
│   │   │   ├── deidentification-vs-synthetic.md
│   │   │   └── hidden-pii-feature-stores.md
│   │   └── case-studies/         # Case studies as .md files
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── contact.astro
│   │   ├── free-assessment.astro
│   │   ├── platform/
│   │   │   ├── index.astro       # Platform overview
│   │   │   ├── training-data.astro
│   │   │   ├── genai-firewall.astro
│   │   │   ├── prompt-protection.astro
│   │   │   ├── ml-workloads.astro
│   │   │   ├── provenance.astro
│   │   │   └── integrations.astro
│   │   ├── solutions/
│   │   │   ├── healthcare.astro
│   │   │   ├── banking.astro
│   │   │   ├── insurance.astro
│   │   │   └── eu-ai-act.astro
│   │   ├── resources/
│   │   │   ├── blog/
│   │   │   │   ├── index.astro   # Blog listing page
│   │   │   │   └── [...slug].astro  # Dynamic blog post pages
│   │   │   ├── whitepapers.astro
│   │   │   ├── case-studies.astro
│   │   │   └── podcasts.astro
│   │   └── company/
│   │       ├── about.astro
│   │       ├── leadership.astro
│   │       └── partners.astro
│   └── styles/
│       └── global.css            # Tailwind directives, custom properties, font-face declarations
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions deploy workflow
```

### GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### PDF documents repository

Create a separate GitHub repository (e.g., `magedata/ai-shield-docs`) for hosting downloadable documents:

```
ai-shield-docs/
├── whitepapers/
│   ├── ai-training-data-compliance-guide.pdf
│   ├── hipaa-ai-data-protection.pdf
│   └── eu-ai-act-readiness-checklist.pdf
├── datasheets/
│   ├── ai-shield-platform-overview.pdf
│   ├── genai-firewall-datasheet.pdf
│   └── training-data-protection-datasheet.pdf
└── README.md
```

Enable GitHub Pages on this repo (from `main` branch) so documents are accessible at stable URLs like `https://magedata.github.io/ai-shield-docs/whitepapers/ai-training-data-compliance-guide.pdf`. Link these URLs from the AI Shield website's whitepapers and resources pages. This keeps document management separate from site code — marketing can update a PDF by pushing to the docs repo without triggering a site rebuild.

---

## 3. Design Direction

### Visual identity

AI Shield should feel distinctly different from magedata.ai. The parent site is corporate blue and safe. AI Shield should feel *precise, technical, and forward-looking* — like a product built by engineers for engineers, but with enough polish that a CISO would present it to their board.

**Aesthetic:** Dark-mode dominant, technical/editorial hybrid. Think: Vercel's site meets a Bloomberg terminal. Clean data visualizations, monospace accents for technical credibility, generous whitespace, high-contrast type.

**Color palette:**

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background (primary) | Very dark navy | `#0B1120` | Page backgrounds, hero sections |
| Background (secondary) | Dark slate | `#131C2E` | Cards, elevated surfaces |
| Background (light sections) | Off-white | `#F7F8FA` | Alternating content sections, light-mode variants |
| Accent (primary) | Electric teal | `#00D4AA` | CTAs, highlights, active states, data viz |
| Accent (secondary) | Soft violet | `#8B7BF7` | Secondary highlights, tags, badges |
| Text (primary on dark) | White | `#FFFFFF` | Headings on dark backgrounds |
| Text (secondary on dark) | Cool gray | `#94A3B8` | Body text on dark backgrounds |
| Text (primary on light) | Near-black | `#0F172A` | Headings on light backgrounds |
| Text (secondary on light) | Slate | `#64748B` | Body text on light backgrounds |
| Danger / alert | Coral red | `#FF6B6B` | Risk indicators, warning callouts |
| Success | Green | `#34D399` | Protected status, compliance indicators |

**Typography:**

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display headings | JetBrains Mono or Space Grotesk (pick one with character) | 700 | 48-64px |
| Section headings | Same as display | 600 | 28-36px |
| Body text | Inter or DM Sans | 400 | 16-18px, line-height 1.7 |
| Code/technical labels | JetBrains Mono | 400 | 14px |
| Navigation | Body font | 500 | 14px |
| CTAs | Body font | 600 | 16px, uppercase, letter-spacing 0.05em |

Note: The design skill recommends avoiding Inter as generic. If using a coding tool, instruct it to explore alternatives like Satoshi, General Sans, or Instrument Sans for body, paired with a distinctive display face. Self-host all fonts as WOFF2 files in `public/fonts/` — do not use Google Fonts CDN (avoids third-party requests and GDPR concerns, which matters for a data security brand).

**Design motifs to carry throughout:**

- Subtle grid overlay pattern on dark hero sections (suggesting data/matrix)
- Animated data flow lines connecting sections (suggesting the pipeline concept)
- "Before / After" visual treatment on product pages showing raw data → protected data
- Monospace-styled inline code snippets for technical credibility
- Metric cards with large numbers (borrowing from the presentation style), animated count-up on scroll via Intersection Observer
- No stock photography. Use abstract data visualizations, architectural diagrams, and custom SVG illustrations instead.

---

## 4. Page-by-Page Specifications

### 4.1 Homepage (`/`)

**Purpose:** Convert visitors into demo requests or free assessment sign-ups. Establish AI Shield's positioning in under 10 seconds.

**Sections (in scroll order):**

#### Hero section
- **Headline:** "Make your enterprise data safe for AI"
- **Subhead:** "Every AI model needs training data. AI Shield ensures that data is discovered, de-identified, and audit-ready — before it enters any ML pipeline."
- **Primary CTA:** "Get a free AI data risk assessment" → links to `/free-assessment`
- **Secondary CTA:** "See how it works" → links to `/platform`
- **Visual:** Animated pipeline diagram showing: Production DB → AI Shield (scan, classify, transform, certify) → ML Platform. Use CSS `@keyframes` with Intersection Observer for a flowing data animation that triggers on page load. Build as a self-contained Astro component (`PipelineDiagram.astro`) with an inline `<script>` for the scroll trigger.
- **Trust bar below hero:** Logos of regulatory frameworks supported (HIPAA, GDPR, EU AI Act, PCI-DSS, DPDP) and ML platforms integrated (Databricks, Snowflake, SageMaker logos as grayscale)

#### Problem statement section
- **Heading:** "AI has a data problem nobody is solving"
- **Layout:** Three-column card layout showing the gap:
  - Card 1: "Database security vendors (Varonis, Guardium) monitor who accesses data. They don't transform it for AI use."
  - Card 2: "ML platforms (Databricks, Snowflake ML) train models. They assume the data arriving is already safe."
  - Card 3: "AI security vendors (Lakera, Lasso) protect models at inference. They don't touch the training data."
- **Callout bar:** "AI Shield fills the gap between your production databases and your ML platforms."

#### Product capabilities section
- **Heading:** "What AI Shield does"
- **Layout:** Four icon-text blocks in a 2x2 grid:
  1. **Discover** — "AI-powered scanning finds PII, PHI, and PCI data in training datasets across 30+ database types and ML file formats (parquet, JSONL, arrow)"
  2. **Transform** — "Production-grade de-identification that preserves statistical distributions and correlations ML models need. Not synthetic. Not random. Intelligently masked."
  3. **Certify** — "Every dataset gets a provenance certificate documenting what was found, what was transformed, and what residual risk remains. Audit-ready for HIPAA, EU AI Act, PCI-DSS."
  4. **Deliver** — "Native integrations with Databricks, Snowflake ML, SageMaker, and Azure ML. Protected data arrives in the data scientist's workspace automatically."

#### Market urgency section
- **Heading:** "The regulatory clock is ticking"
- **Layout:** Large stat cards in a horizontal row:
  - "84% of physicians demand stronger data privacy before AI adoption" — AMA 2024
  - "$11M average cost of healthcare data breach" — IBM 2025
  - "Aug 2026: EU AI Act fully enforceable — training data documentation mandatory"
  - "63% of organizations have restricted data entered into GenAI tools" — Cisco 2024

#### Industry solutions section
- **Heading:** "Built for the industries that need it most"
- **Layout:** Two large cards, side by side:
  - **Healthcare:** "De-identify patient records for clinical AI. HIPAA Safe Harbor compliant. Training data provenance for FDA and IRB submissions." → Link to `/solutions/healthcare`
  - **Banking & Financial Services:** "Protect customer transaction data for fraud detection and risk models. GLBA, PCI-DSS, and SOX compliant." → Link to `/solutions/banking`

#### How it works section (mini version)
- **Heading:** "Five steps from production data to AI-ready dataset"
- **Layout:** Horizontal numbered flow (reuse the 5-step pipeline from the strategy deck: Request → Discover → Transform → Certify → Deliver)
- **CTA:** "See the full platform" → `/platform`

#### Social proof / testimonials section
- **Reuse existing Mage Data testimonials** from the parent site, specifically:
  - "iMask has perfectly met all of our expectations that other tools are unable to do" — IT Domain Manager, Healthcare, $30B+ firm
  - "Uses artificial intelligence to uncover data in the most complex of locations" — Project Manager, Healthcare, $10-30B firm
  - "Really helpful in protecting most sensitive data elements" — Decision Analyst, Healthcare, $1-3B firm
- **Analyst recognition bar:** QKS Group, Bloor, KuppingerCole, Forrester, Gartner logos (from parent site)

#### Final CTA section
- **Heading:** "See what sensitive data lives in your AI training pipeline"
- **Subhead:** "Run a free, no-commitment AI data risk assessment. Connect your databases, see what's exposed, and get a report you can show your board."
- **CTA button:** "Start free assessment"
- Dark background with accent glow effect

#### Footer
- Logo (AI Shield by Mage Data)
- Navigation links to all major sections
- Contact info (inherit from Mage Data: 3 Columbus Circle, 15th Floor, NYC)
- Social links (LinkedIn, YouTube, X)
- Legal links (Privacy Policy, Terms)
- "ISO 27001 Certified" badge
- Copyright: "© Mage Data AI Shield 2026. A Mage Data product."

---

### 4.2 Platform Overview (`/platform`)

**Purpose:** Detailed product overview for technical evaluators (security architects, data engineers, ML engineers).

**Sections:**

#### Hero
- **Headline:** "The AI data compliance pipeline"
- **Subhead:** "End-to-end protection for sensitive data flowing from production systems to AI/ML platforms."
- **Visual:** Full-width animated architecture diagram showing data flow through AI Shield's components. Interactive — hovering on each component highlights it and shows a tooltip with details.

#### Pipeline stages (detailed)
Five expandable/tabbed sections, one per pipeline stage:

1. **Data source connectivity**
   - Content from existing Mage Data: supports 30+ data sources including Oracle, SQL Server, PostgreSQL, MySQL, MongoDB, SAP HANA, Snowflake, BigQuery, Azure SQL, Amazon S3, SharePoint, Hadoop/Hive
   - NEW for AI Shield: parquet files, JSONL, Apache Arrow, CSV/TSV, Jupyter notebooks, feature stores
   - Visual: grid of supported data source logos

2. **AI-powered discovery & classification**
   - Content adapted from existing Mage Data iheartsecurity.info: "AI and NLP-powered discovery locates PII, PHI, and financial data across all databases, files, and cloud environments with patented accuracy"
   - Specific to AI Shield: Scans training datasets and feature stores, classifies by regulation (HIPAA 18 identifiers, PCI-DSS cardholder elements, GDPR personal data categories, EU AI Act training data requirements)
   - Visual: animated scan showing data elements being detected and tagged

3. **Intelligent de-identification**
   - Content from existing Mage Data: "Static and dynamic masking with encryption, tokenization, and redaction"
   - AI Shield-specific: Statistical utility preservation — masked data maintains distributions, correlations, and outlier patterns that ML models need. Techniques include differential privacy, k-anonymity, format-preserving tokenization, generalization, and smart noise injection.
   - Visual: Before/after data table showing raw vs. de-identified data with a "statistical fidelity score" indicator

4. **Provenance certification**
   - NEW capability: Generates a tamper-evident certificate for every de-identified dataset documenting: source data systems, sensitive elements detected (counts by category), transformations applied (technique per column), residual re-identification risk score, regulatory compliance mapping (which controls are satisfied), timestamp and operator identity
   - Visual: sample certificate rendering

5. **ML platform delivery**
   - NEW capability: Native connectors push protected datasets directly into Databricks Unity Catalog, Snowflake ML stages, SageMaker data channels, Azure ML datastores
   - Visual: integration logos with "one-click" setup badges

#### Capability comparison table
Reuse the competitive comparison table from the strategy deck (Varonis, Informatica, Tonic.ai, Lakera, Privacera vs. AI Shield across 5 dimensions)

#### Technical specifications sidebar/section
- Deployment options: On-premises, private cloud, SaaS
- Authentication: SAML 2.0, OIDC, LDAP, Active Directory
- API: RESTful API for programmatic access
- Audit: Complete audit trail with SIEM integration (Splunk, QRadar, Sentinel)
- Certifications: ISO 27001 (inherited from Mage Data)
- Performance: Designed for enterprise-scale datasets (billions of records)

---

### 4.3 AI Training Data Protection (`/platform/training-data`)

**Purpose:** Deep dive into the core use case — protecting training data.

**Content structure:**

#### Hero
- **Headline:** "Protect the data that powers your AI"
- **Subhead:** "Every model is only as good as its training data — and only as compliant as the data it was trained on."

#### The problem
- Content adapted from existing Mage Data AI Protection page: "AI systems need vast amounts of data to learn effectively, yet that same data must be protected from exposure. Organizations racing to adopt AI/ML technologies face critical governance questions — what sensitive data trains their models, who has access to AI training datasets, and whether PII is being fed into third-party AI services without proper controls."
- Add specific pain points:
  - Data scientists pull production data into notebooks with no de-identification
  - Training datasets accumulate in shared storage with no access controls
  - Feature stores contain derived PII that's harder to detect than raw identifiers
  - Re-identification risk increases when multiple de-identified datasets are combined
  - Regulators are starting to ask for training data provenance documentation

#### Capabilities (detailed)
Expand on the capability headers from existing magedata.ai content:
- **AI Training Data Discovery** — detailed explanation with technical depth
- **Privacy-Preserving Data Preparation** — masking techniques with ML utility preservation
- **Role-Based AI Data Access** — who can access what training data, enforced at the data level
- **AI Data Lineage Tracking** — trace every dataset back to its source, through every transformation
- **Catalog Integration** — connect with enterprise data catalogs (Collibra, Alation, Databricks Unity Catalog)

#### Use case scenarios
- "A data scientist at a health system wants to train a readmission prediction model on 5 years of patient records"
- "A bank's ML team needs transaction data to build a fraud detection model"
- Walk through the AI Shield workflow for each scenario

---

### 4.4 GenAI Firewall (`/platform/genai-firewall`)

**Purpose:** Protect data flowing into GenAI tools (ChatGPT, Copilot, Gemini, internal LLMs).

**Content:** Adapt directly from existing magedata.ai GenAI Firewall page:

- Core message: "75% of employees use GenAI tools at work, with 60% pasting confidential data into AI prompts"
- Capabilities from existing site:
  - Real-Time Prompt Inspection
  - Intelligent Protection Actions
  - Comprehensive AI Coverage
  - Policy-Based Control
  - Visibility and Analytics
  - SIEM Integration
- Add AI Shield-specific framing: Position this as one component of the broader pipeline, not a standalone product. The firewall protects data at the *usage* layer; training data protection protects data at the *preparation* layer. Together they cover the full AI data lifecycle.

---

### 4.5 Securing AI/ML Workloads (`/platform/ml-workloads`)

**Purpose:** End-to-end ML lifecycle protection.

**Content:** Adapt directly from existing magedata.ai Securing AI/ML Workloads page:

- Core message: "AI and machine learning have moved from experimental to mission-critical. The ML lifecycle has become an expanding attack surface."
- Capabilities from existing site:
  - Training Data Protection
  - Feature Store Security
  - Real-Time Inference Protection
  - ML Platform Integration
  - ML Data Lineage
  - Model Governance Audit

---

### 4.6 Healthcare Solution (`/solutions/healthcare`)

**Purpose:** HIPAA-specific messaging for health system CISOs and privacy officers.

**Sections:**
- Problem framing: Healthcare breach costs ($11M average), HIPAA right-of-access enforcement increasing, AI adoption doubling year-over-year
- How AI Shield helps: De-identify patient data for clinical AI, comply with HIPAA Safe Harbor (remove all 18 identifiers), generate provenance certificates for IRB submissions and FDA AI/ML regulatory filings
- Supported systems: Epic Clarity/Caboodle, Oracle Health (Cerner), SQL Server, MongoDB, cloud data lakes
- Regulatory mapping: HIPAA Privacy Rule, Security Rule, Breach Notification Rule, and upcoming Security Rule updates
- Testimonials: Reuse the three healthcare testimonials from magedata.ai homepage

---

### 4.7 Banking Solution (`/solutions/banking`)

**Purpose:** Financial services-specific messaging.

**Sections:**
- Problem framing: Banks building AI for fraud detection, credit scoring, AML, customer analytics — all using sensitive customer data
- How AI Shield helps: De-identify transaction data for model training, comply with GLBA, PCI-DSS, SOX, and OCC examination expectations
- Supported systems: Oracle (core banking), SQL Server, Snowflake, BigQuery, MongoDB, mainframe DB2
- Regulatory mapping: GLBA Safeguards Rule, PCI-DSS Requirement 3 (protect stored data), SOX Section 404, OCC heightened standards, DPDP Act (for Indian operations)

---

### 4.8 Free Assessment Landing Page (`/free-assessment`)

**Purpose:** Lead generation. Convert visitors into assessment sign-ups.

**Layout:**
- **Headline:** "What sensitive data lives in your AI training pipeline?"
- **Subhead:** "Run a free, no-commitment AI data risk assessment. See what's exposed before your regulators do."
- **What you get:**
  - Full sensitive data discovery across connected databases
  - Classification by regulation (HIPAA, PCI-DSS, GDPR, DPDP)
  - Quantified breach exposure estimate
  - Executive-ready risk scorecard
- **How it works:** 3-step visual (Connect → Scan → Report)
- **Form fields:** Name, email, company, role, number of databases, primary industry, primary regulation concern
- **Trust elements:** ISO 27001 certified, no production data leaves your environment, assessment runs on-premises

---

### 4.9 Blog (`/resources/blog`)

**Purpose:** SEO, thought leadership, and lead nurture.

**Seed articles for launch (5 articles):**
1. "Why AI training data is the biggest compliance blind spot in your enterprise"
2. "HIPAA and AI: What the 2026 Security Rule updates mean for clinical AI training data"
3. "EU AI Act training data requirements: A practical guide for data teams"
4. "De-identification vs. synthetic data: Which is better for ML model accuracy?"
5. "The hidden PII in your feature store: How sensitive data leaks into ML pipelines"

**Blog template:** Standard blog layout (using `BlogPost.astro` layout) with author, date, estimated read time, social sharing, related articles sidebar, and inline CTA ("Get a free AI data risk assessment"). Blog posts are Markdown files in `src/content/blog/` using Astro Content Collections with frontmatter for title, date, author, description, tags, and featured image.

---

## 5. Global Components

### Navigation (sticky header)
```
Logo (AI Shield by Mage Data)  |  Platform ▾  |  Solutions ▾  |  Resources ▾  |  Company ▾  |  [Free Assessment]  [Request Demo]
```
- Platform dropdown: Training Data Protection, GenAI Firewall, Prompt Protection, ML Workloads, Provenance Certification, Integrations
- Solutions dropdown: Healthcare, Banking, Insurance, EU AI Act Compliance
- Resources dropdown: Blog, Whitepapers, Case Studies, Podcasts
- Company dropdown: About, Leadership, Partners
- Two CTAs in nav: "Free Assessment" (outlined) and "Request Demo" (filled, accent color)

### Footer
- Four-column layout: Platform links, Solutions links, Resources links, Company links
- Bottom bar: Logo, copyright, "A Mage Data product", Privacy Policy, Terms, ISO 27001 badge
- Social icons: LinkedIn, YouTube, X

### Cookie consent
- If using Plausible or Umami, no cookie banner is needed — both are cookieless and GDPR-compliant by design. This is a meaningful brand signal for a data security company: "We don't track you with cookies. We practice what we preach."
- If any third-party scripts are added later (e.g., chat widgets, embedded videos), add a minimal consent banner at that point.

---

## 6. SEO Strategy

### Target keywords (primary)
- "AI training data protection"
- "de-identify data for AI"
- "HIPAA AI compliance"
- "AI data governance"
- "training data provenance"
- "sensitive data in ML pipelines"
- "EU AI Act training data requirements"
- "PHI protection for AI"
- "PII in machine learning"

### Technical SEO
- All pages statically generated at build time (Astro `output: 'static'`) — fully crawlable, no client-side rendering dependencies
- Structured data (JSON-LD) embedded in `<head>` via `BaseLayout.astro`: Organization, Product, FAQ, Article (for blog)
- XML sitemap auto-generated via `@astrojs/sitemap` integration
- `robots.txt` in `public/` directory
- Open Graph and Twitter Card meta tags on every page (passed as props to `BaseLayout.astro`)
- Canonical URLs set via Astro's `site` config and page-level overrides
- Alt text on all images and diagrams
- Page load target: <1s LCP on mobile (static HTML + minimal JS makes this achievable)
- Self-hosted fonts via `public/fonts/` with `font-display: swap` to avoid FOIT

### Content SEO
- Each product page targets 1-2 primary keywords
- Blog posts target long-tail keywords
- Internal linking strategy: every product page links to relevant solution pages and blog posts
- Each page has a unique meta title (60 chars max) and meta description (155 chars max)

---

## 7. Conversion Optimization

### CTAs hierarchy
- **Primary:** "Get a free AI data risk assessment" — appears in hero, mid-page callout, bottom CTA section, and blog inline
- **Secondary:** "Request a demo" — appears in nav and on product pages
- **Tertiary:** "Read the whitepaper" / "Download the datasheet" — appears on relevant product pages

### Lead capture points
1. Free assessment form (`/free-assessment`)
2. Demo request form (`/contact`)
3. Blog newsletter signup (inline in blog posts)
4. Gated whitepapers (Formspree email capture form that redirects to the PDF URL on `magedata.github.io/ai-shield-docs/` after submission)

### Social proof elements (use throughout site)
- Customer count: "Trusted by enterprises in 20+ countries"
- Data source count: "Supports 30+ data sources"
- Analyst recognitions: QKS Group, Bloor, KuppingerCole, Forrester, Gartner badges
- Customer testimonials: Reuse three healthcare testimonials from magedata.ai
- ISO 27001 certification badge

---

## 8. Content to Migrate from Existing Mage Data Sites

### From magedata.ai (production site)
| Source page | Content to reuse | Adaptation needed |
|-------------|-----------------|-------------------|
| `/ai-protection-and-governance/` | Intro paragraph on AI data security paradox | Rewrite as AI Shield core narrative |
| `/ai-protection-and-governance/` | Capability headers: AI Training Data Discovery, Privacy-Preserving Data Preparation, Role-Based AI Data Access, AI Data Lineage Tracking, Catalog Integration | Expand each into full product page sections |
| `/gen-ai-firewall/` | Full page content on GenAI Firewall, capability headers | Adapt with AI Shield branding, add pipeline context |
| `/real-time-prompt-protection/` | Prompt protection capabilities | Adapt with AI Shield branding |
| `/securing-ai-ml-workloads/` | Full page content on ML workload protection, capability headers | Adapt with AI Shield branding |
| Homepage | Three customer testimonials (Healthcare) | Reuse verbatim with AI Shield framing |
| Homepage | Analyst recognition logos | Reuse on AI Shield site |
| Homepage | Data source logo grid (30+ sources) | Reuse, add ML-specific formats |

### From iheartsecurity.info (pre-deployment site)
| Source page | Content to reuse | Adaptation needed |
|-------------|-----------------|-------------------|
| Homepage | Core messaging: "AI-powered platform for data masking, sensitive data discovery" | Reframe around AI data compliance pipeline |
| Homepage | Industry solutions framework (BFSI, HLS) | Adapt for AI Shield solution pages |
| Homepage | Feature descriptions: discovery, masking, TDM, production protection, AI protection | Extract AI-relevant features only |

---

## 9. Development Phases

### Phase 1: MVP (Weeks 1-4)
**Goal:** Launch with core pages to support sales conversations and inbound lead capture.

**Pages to build:**
- Homepage
- Platform overview
- Training data protection
- GenAI firewall
- Healthcare solution page
- Banking solution page
- Free assessment landing page
- Contact / demo request page
- About page
- Blog (infrastructure + 3 seed articles)

**Technical deliverables:**
- Astro project setup with Tailwind CSS, `@astrojs/sitemap`, and `@astrojs/mdx`
- Design system: CSS custom properties for color tokens, typography scale, reusable Astro components (buttons, cards, stat blocks, nav, footer)
- Content Collections configuration for blog posts and case studies (Markdown/MDX in `src/content/`)
- Form handling via Formspree (demo request, assessment intake, newsletter)
- Analytics setup (Plausible cloud script or Umami self-hosted)
- SEO foundations (meta tags via `BaseLayout.astro`, auto-generated sitemap, structured data as JSON-LD in `<head>`)
- Responsive design (mobile-first with Tailwind breakpoints)
- GitHub Actions workflow for automated build and deploy to GitHub Pages
- Separate `ai-shield-docs` GitHub repo with initial PDFs, GitHub Pages enabled

### Phase 2: Content Expansion (Weeks 5-8)
**Pages to add:**
- Prompt protection page
- ML workloads page
- Provenance certification page
- Integrations page (with ML platform logos and setup guides)
- EU AI Act compliance page
- Insurance solution page
- 2 additional blog posts
- 1 downloadable whitepaper (hosted in `ai-shield-docs` GitHub repo, linked from whitepapers page with optional email gate via Formspree before redirect)

### Phase 3: Optimization (Weeks 9-12)
**Additions:**
- Case studies page (template + 1-2 case studies)
- Partner program page
- Podcast page (embed existing Mage Data AI podcasts)
- Leadership team page
- Whitepapers library page
- Interactive architecture diagram on platform page (Astro island component with inline `<script>`, no framework dependency)
- A/B testing on hero headlines and CTA copy (use Plausible goals with manual variant rotation, or Cloudflare Workers if using Cloudflare DNS)
- Performance optimization pass (Core Web Vitals — should already be excellent with static Astro output; focus on image optimization and font loading)

---

## 10. Key Interactions & Animations

### Homepage hero
- **Pipeline animation:** Data particles flow from left (database icons) through the AI Shield processing zone (where they change color from red/amber to green, representing sensitive→protected) to right (ML platform icons). Built with CSS `@keyframes` animations and a lightweight `<canvas>` element via an inline `<script>` in the Astro component. Should be subtle and performant, not flashy. Use `prefers-reduced-motion` media query to disable for accessibility.

### Platform page architecture diagram
- **Interactive hover states:** Built as an Astro component with inline `<script>`. Hovering over each pipeline stage highlights it, dims others, and shows a tooltip with 2-3 bullet points. Click navigates to the detailed subpage. Use CSS `:hover` states for the visual effects and a small inline script for tooltip positioning. No framework needed.

### Product pages — Before/After data visualization
- **Animated table:** Built as an Astro island component with an inline `<script>`. Shows a data table with real-looking (but fictional) data. On scroll (Intersection Observer) or button click, sensitive columns animate from raw values to masked values using CSS `transition` properties. Demonstrates the product's core function visually.

### Stat cards
- **Count-up animation:** Numbers count up from 0 to target value when they scroll into view. Implement with Intersection Observer + `requestAnimationFrame` in a small inline `<script>` within the `StatCard.astro` component. Total JS: ~30 lines.

### Navigation
- **Scroll-aware:** Transparent on hero, transitions to solid dark background with `backdrop-filter: blur()` on scroll. Implement with a small inline `<script>` listening to scroll events and toggling a CSS class. Pure CSS transition handles the visual change.

---

## 11. Asset Requirements

### Must-have before development
- [ ] AI Shield logo (primary, reversed, favicon) — design needed
- [ ] Brand guidelines document (colors, typography, logo usage, tone of voice)
- [ ] Approved hero headline and subhead copy
- [ ] 3-5 blog articles written and reviewed
- [ ] Customer testimonials approved for use on AI Shield (confirm permission from magedata.ai customers)
- [ ] Analyst recognition logos approved for use (confirm licensing from QKS, Bloor, etc.)
- [ ] Data source logos (Oracle, SQL Server, Snowflake, Databricks, etc.) — standard partner logo packs
- [ ] ML platform logos (Databricks, SageMaker, Snowflake ML, Azure ML) — confirm partner logo usage rights
- [ ] Privacy policy and terms of service (legal review needed — can adapt from magedata.ai)

### Can be created during development
- [ ] Architecture diagrams (create in code as inline SVG within Astro components)
- [ ] Before/after data visualizations (create with fictional data as Astro island components)
- [ ] Stat card content (finalize numbers with approved sources and citations)
- [ ] Open Graph images for social sharing (generate as static PNGs, place in `public/images/og/`)
- [ ] Favicon and app icons (derive from logo, place in `public/`)
- [ ] GitHub repository setup: main site repo + `ai-shield-docs` repo for PDFs
- [ ] GitHub Actions workflow for automated deployment
- [ ] Formspree account setup with form endpoints for demo/contact/assessment forms

---

## 12. Performance & Accessibility Requirements

### Performance targets
- Lighthouse Performance score: 95+ (static sites should excel here)
- Largest Contentful Paint (LCP): < 1.5s (achievable with static HTML and optimized images)
- Cumulative Layout Shift (CLS): < 0.1
- Interaction to Next Paint (INP): < 100ms
- Total page weight: < 500KB (excluding images) — Astro ships zero JS by default, only interactive islands add JS
- Images: WebP/AVIF format, lazy loaded below fold, served from `public/images/` with explicit width/height attributes to prevent layout shift
- Fonts: Self-hosted WOFF2 in `public/fonts/`, preloaded in `<head>`, `font-display: swap`

### Accessibility targets
- WCAG 2.1 AA compliance minimum
- All interactive elements keyboard accessible
- Color contrast ratios: 4.5:1 minimum for text, 3:1 for large text
- All images have descriptive alt text
- Form inputs have associated labels
- Focus indicators visible on all interactive elements
- Skip navigation link
- Semantic HTML throughout

---

## 13. Measurement & KPIs

### Launch KPIs (first 90 days)
- Free assessment form submissions: target 50
- Demo request form submissions: target 30
- Monthly organic traffic: target 2,000 sessions
- Blog article views: target 500/article
- Average time on site: target 2+ minutes
- Bounce rate: target < 55%

### Tracking setup
- Form submission notifications → Formspree email forwarding → CRM (HubSpot, Salesforce, or equivalent) via Formspree Zapier integration or webhook
- Page view tracking → Plausible cloud (add `<script>` in `BaseLayout.astro`) or Umami self-hosted
- CTA click tracking → Plausible custom events (`plausible('CTA Clicked', {props: {page: '...'}})`)
- Scroll depth tracking on key pages → lightweight inline script with Intersection Observer on sentinel elements
- UTM parameter handling → Plausible captures UTM parameters automatically; pass them as hidden fields in Formspree forms via inline JS
