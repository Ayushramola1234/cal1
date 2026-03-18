# PROJECT_MASTER.md — Calcify
> **This is the single source of truth for the Calcify project.**
> Gemini must read this file before doing ANYTHING. Do not contradict it.
> Only Claude updates this file.

---

## 1. BASIC INFO

| Field | Value |
|---|---|
| Site Name | Calcify |
| Domain | Not decided yet |
| Hosting | Firebase Hosting |
| Purpose | A free online calculator website with 200+ calculators across 6 categories |
| Target Audience | Students, professionals, and general public worldwide |
| Main Language | English |

---

## 2. TECH STACK

- **Frontend:** HTML5, CSS3, Vanilla JavaScript only
- **Backend:** Firebase Hosting (Firestore only if explicitly needed later)
- **No frameworks (React/Vue/Angular).** Build tools may only be used if explicitly approved by Claude.
- **Charts:** Chart.js (CDN) — only load on pages that use charts
- **Icons:** Font Awesome 6 (CDN)
- **Fonts:** Google Fonts — Inter (weights: 400, 500, 600, 700)
- **Search:** lunr.js (CDN) or custom client-side search — no backend required

**CDN Links — include only what each page needs:**
```html
<!-- Google Fonts (every page) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome (every page) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- Chart.js — ONLY on pages that render a chart -->
<script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>

<!-- lunr.js — ONLY on pages with search -->
<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js" defer></script>
```

> ⚠️ **All `<script>` tags must use `defer`.** No exceptions.

### Dark Mode Implementation

- Apply theme to the `<html>` element — **NOT** `body.classList`
- **Toggle on:** `document.documentElement.setAttribute('data-theme', 'dark')`
- **Toggle off:** `document.documentElement.setAttribute('data-theme', 'light')`
- **Save preference:** `localStorage.setItem('theme', 'dark')` or `'light'`
- **On page load:** read `localStorage` and apply the attribute *before* the page renders to prevent a flash of the wrong theme
- **After toggling:** dispatch a custom event so charts re-render: `document.dispatchEvent(new Event('themeChanged'))`

---

## 3. DESIGN SYSTEM

### Color Palette (Light Mode — default)

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#2563EB` | Buttons, links, highlights |
| `--primary-dark` | `#1D4ED8` | Button hover states |
| `--primary-light` | `#EFF6FF` | Input focus bg, subtle accents |
| `--secondary` | `#0F172A` | Headings, strong text |
| `--accent` | `#F59E0B` | Badges, callouts, special highlights |
| `--bg` | `#F8FAFC` | Page background |
| `--surface` | `#FFFFFF` | Cards, modals, calculator panels |
| `--surface-2` | `#F1F5F9` | Alternate row bg, inner panels |
| `--text-primary` | `#0F172A` | Main body text |
| `--text-secondary` | `#64748B` | Subtitles, labels, meta text |
| `--border` | `#E2E8F0` | Card borders, input borders |
| `--success` | `#10B981` | Success messages, positive results |
| `--error` | `#EF4444` | Error messages, validation fails |
| `--warning` | `#F59E0B` | Warnings |

### Color Palette (Dark Mode — activated by toggle)

| Token | Hex |
|---|---|
| `--bg` | `#0F172A` |
| `--surface` | `#1E293B` |
| `--surface-2` | `#334155` |
| `--text-primary` | `#F1F5F9` |
| `--text-secondary` | `#94A3B8` |
| `--border` | `#334155` |
| `--primary-light` | `#1E3A5F` |

### Typography

| Property | Value |
|---|---|
| Font Family | `'Inter', sans-serif` |
| Base Font Size | `16px` |
| Line Height | `1.6` |
| H1 | `2rem / 700` |
| H2 | `1.5rem / 600` |
| H3 | `1.25rem / 600` |
| Small / meta | `0.875rem / 400` |

### Spacing & Shape

| Property | Value |
|---|---|
| Border Radius (base) | `8px` |
| Border Radius (large) | `12px` |
| Border Radius (pill) | `9999px` |
| Box Shadow (card) | `0 2px 8px rgba(0,0,0,0.07)` |
| Box Shadow (elevated) | `0 4px 20px rgba(0,0,0,0.10)` |
| Max Page Width | `1200px` |
| Section Padding | `60px 20px` |

### CSS Variables Block (paste into `:root` in style.css)

```css
:root {
  /* Colors */
  --primary: #2563EB;
  --primary-dark: #1D4ED8;
  --primary-light: #EFF6FF;
  --secondary: #0F172A;
  --accent: #F59E0B;
  --bg: #F8FAFC;
  --surface: #FFFFFF;
  --surface-2: #F1F5F9;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --border: #E2E8F0;
  --success: #10B981;
  --error: #EF4444;
  --warning: #F59E0B;

  /* Typography */
  --font: 'Inter', sans-serif;
  --text-base: 1rem;
  --text-sm: 0.875rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;

  /* Shape */
  --radius: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --shadow: 0 2px 8px rgba(0,0,0,0.07);
  --shadow-lg: 0 4px 20px rgba(0,0,0,0.10);
  --max-width: 1200px;
}

[data-theme="dark"] {
  --bg: #0F172A;
  --surface: #1E293B;
  --surface-2: #334155;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --border: #334155;
  --primary-light: #1E3A5F;
}
```

---

## 4. FOLDER STRUCTURE

Calcify uses a **3-tier file structure** based on calculator complexity. Choose the correct tier before building — see Section 10 for the decision rules.

### 🟢 Simple — Single file
```
pages/[category]/[calculator-name].html
```
Example: `pages/health/bmi-calculator.html`

**Use when:** Basic input → output only, under 60 lines of JS, no charts, no data tables, no unique CSS.

### 🟡 Medium — Folder with 2 files
```
pages/[category]/[calculator-name]/
├── index.html
└── script.js
```
**Use when:** 60–200 lines of JS, has a results table, multi-step conditional logic, no charts, no unique CSS.

### 🔴 Complex — Folder with 3 files
```
pages/[category]/[calculator-name]/
├── index.html    ← structure + SEO only
├── style.css     ← only styles unique to this calculator
└── script.js     ← only this calculator's logic
```
**Use when:** Has Chart.js charts, amortization/schedule tables, multi-step wizard, comparison mode, real-time live updates, over 200 lines of JS, or needs CSS beyond global files.

> **Rule:** When in doubt, use the simpler tier. A simple calculator with an empty `style.css` is wasteful. A complex calculator crammed into one file is unmaintainable.

### Full Project Tree

```
calcify/
├── index.html                          ← Homepage
├── about.html                          ← About page
├── privacy-policy.html                 ← Privacy policy
├── terms.html                          ← Terms of use
├── 404.html                            ← Custom error page
├── css/
│   ├── style.css                       ← Global styles, CSS variables, typography
│   ├── components.css                  ← Navbar, footer, cards, buttons
│   └── calculator.css                  ← Calculator panel + chart-wrapper styles
├── js/
│   ├── main.js                         ← Navbar toggle, dark mode, global utils
│   ├── utils.js                        ← Shared utility functions
│   ├── calculators.js                  ← Master calculator registry
│   ├── generator.js                    ← Page generator for complex calculators
│   └── search-index.js                 ← Auto-generated search index
├── pages/
│   ├── health/
│   │   ├── index.html                  ← Health category page
│   │   ├── bmi-calculator.html         ← 🟢 Simple example
│   │   ├── macro-calculator/           ← 🔴 Complex example
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   └── script.js
│   │   └── calorie-calculator/         ← 🟡 Medium example
│   │       ├── index.html
│   │       └── script.js
│   ├── finance/                        ← same pattern
│   ├── math/                           ← same pattern
│   ├── converters/                     ← same pattern
│   ├── tools/                          ← same pattern
│   └── date/                           ← same pattern
├── components/
│   ├── navbar.html
│   └── footer.html
├── assets/
│   ├── icons/
│   └── og-image.png
├── PROJECT_MASTER.md
├── CHANGELOG.md
├── STATUS.md
├── firebase.json
├── .firebaserc
├── sitemap.xml
└── robots.txt
```

---

## 5. NAVBAR STRUCTURE

- **Logo:** Left-aligned — text "Calcify" in `--primary` color, bold 700
- **Nav Links:** Home | Health | Finance | Math | Converters | Tools | Date & Time
- **Mobile:** Hamburger menu (toggle class `nav-open` on `<body>`)
- **Sticky:** Yes — `position: sticky; top: 0; z-index: 100`
- **Dark Mode Toggle:** Yes — sun/moon icon, saves preference to `localStorage`
- **Background:** `--surface` with `border-bottom: 1px solid var(--border)`

---

## 6. FOOTER STRUCTURE

- **Columns (4):** About Calcify | Calculator Categories | Popular Calculators | Connect
- **About text:** "Calcify offers 200+ free online calculators for health, finance, math, and everyday life."
- **Copyright:** `© 2025 Calcify. All rights reserved.`
- **Social links:** None (add later)
- **Bottom bar:** Copyright + "Made with ❤️ for everyone"

---

## 7. CALCULATOR CATEGORIES

| # | Category | URL Path | Icon (FA) |
|---|---|---|---|
| 1 | Health & Fitness | `/pages/health/` | `fa-heart-pulse` |
| 2 | Finance & Money | `/pages/finance/` | `fa-coins` |
| 3 | Math & Science | `/pages/math/` | `fa-square-root-variable` |
| 4 | Unit Converters | `/pages/converters/` | `fa-arrows-rotate` |
| 5 | Everyday Tools | `/pages/tools/` | `fa-screwdriver-wrench` |
| 6 | Date & Time | `/pages/date/` | `fa-calendar-days` |

---

## 8. CALCULATOR DATA STRUCTURE

Every calculator entry in `calculators.js` must follow this structure:

```javascript
{
  id: "bmi-calculator",
  name: "BMI Calculator",
  category: "health",
  slug: "bmi-calculator",
  url: "/pages/health/bmi-calculator.html",  // simple: .html | medium/complex: /folder/
  description: "Calculate your Body Mass Index to assess if your weight is healthy.",
  tags: ["bmi", "body mass index", "weight", "health"],
  icon: "fa-weight-scale",
  featured: true,
  dateAdded: "2025-03-01",
  complexity: "simple",     // "simple" | "medium" | "complex"
  hasChart: false,          // true | false
  chartType: null,          // "line" | "bar" | "doughnut" | "area" | "combo" | null
  fileType: "single",       // "single" | "folder"
  related: ["bmr-calculator", "calorie-calculator", "ideal-weight-calculator"]
}
```

> `dateAdded` powers the "Recently Added" homepage section. `complexity`, `hasChart`, `chartType`, and `fileType` are required on every entry.

---

## 9. CALCULATOR GENERATION SYSTEM

### Registry as Single Source of Truth

`calculators.js` is the master registry for every calculator on the site. Every calculator — whether its page is a static `.html` file or a generated folder — **must have a registry entry before any code is written**.

### What the Registry Powers

| Consumer | How it uses `calculators.js` |
|---|---|
| **Homepage** | `featured: true` entries → Featured Calculators section |
| **Category pages** | Filters by `category` → calculator grid |
| **Related calculators** | `related` array → related links on each page |
| **Sitemap** | All `url` fields → `sitemap.xml` entries |
| **Search** | All entries indexed → `search-index.js` |
| **Recently Added** | Sorted by `dateAdded` descending |

### Two Types of Calculator Pages

**Type A — Static file** (`🟢` simple): Gemini builds a single `.html` file manually.

**Type B — Generated by `generator.js`** (`🟡`/`🔴`): Gemini builds the folder structure. Only use when explicitly instructed by Claude.

### Rules
1. Always add a `calculators.js` entry **before** building the page
2. Never delete or modify existing registry entries — add only
3. After adding a new entry, update `search-index.js`

---

## 10. CALCULATOR COMPLEXITY FLAGS

Every calculator entry in `calculators.js` must include `complexity`, `hasChart`, `chartType`, and `fileType` fields (see Section 8 for full structure).

### Complexity Decision Rules

| Flag | File structure | When to use |
|---|---|---|
| `"simple"` | Single `.html` file | Basic input/output, under 60 lines of JS, no charts, no tables |
| `"medium"` | Folder: `index.html` + `script.js` | 60–200 lines JS, results tables, conditional logic, no chart |
| `"complex"` | Folder: `index.html` + `style.css` + `script.js` | Charts, amortization tables, multi-step wizards, 200+ lines JS |

### Chart Type Reference

| Calculator type | Recommended chart |
|---|---|
| Compound interest / investment | `line` (growth over time) |
| Mortgage / loan | `combo` (bar + line) |
| Budget / expenses | `doughnut` (category split) |
| Calorie / weight loss | `line` (projection over time) |
| Retirement | `area` (savings growth) |
| BMI | `doughnut` (category ranges) |
| Tax breakdown | `doughnut` (tax vs take-home) |
| Macro calculator | `doughnut` (protein/carbs/fat) |
| Break-even | `line` (revenue vs cost) |
| Debt payoff | `bar` (reduction over months) |
| Heart rate zones | `bar` (time in each zone) |
| Savings calculator | `area` (balance over time) |
| ROI calculator | `line` (portfolio over time) |
| Amortization | `combo` (bar + line) |
| Body fat | `doughnut` (category ranges) |

---

## 11. HOMEPAGE SECTIONS

`index.html` must contain these sections in this exact order:

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Site name "Calcify", tagline, and a prominent search bar. Filters the registry client-side. |
| 2 | **Featured Calculators** | 6–8 calculators where `featured: true`. Icon, name, short description, link. |
| 3 | **Categories Grid** | All 6 categories as cards with FA icon, name, description, and calculator count. |
| 4 | **Popular Calculators** | ~8 curated high-traffic calculators (set manually via flags in registry). |
| 5 | **Recently Added** | Last 4–6 calculators sorted by `dateAdded` descending. |
| 6 | **About Calcify** | ~60–80 word paragraph about the site's purpose. |
| 7 | **Footer** | Standard footer (see Section 6). |

---

## 12. CATEGORY PAGE STRUCTURE

Every `/pages/[category]/index.html` must include ALL of the following, in order:

1. **`<head>`** — Full SEO meta tags (see Section 14)
2. **Navbar**
3. **Breadcrumb** — e.g., Home > Health & Fitness
4. **`<main>`**
   - **`<h1>`** — e.g., "Free Health & Fitness Calculators"
   - **SEO intro paragraph** — 2–3 sentences, keyword-natural
   - **Calculator Grid** — driven by `calculators.js`, not hardcoded
   - **Popular in This Category** — 3–4 highlighted calculators
   - **FAQ Section** — min 5 questions with `FAQPage` schema
   - **Other Categories** — links to all other 5 category pages
5. **Footer**

---

## 13. INDIVIDUAL CALCULATOR PAGE STRUCTURE

Every calculator page must include ALL of the following, in order:

1. **`<head>`** — Full SEO meta tags (see Section 14)
2. **Navbar**
3. **Breadcrumb** — e.g., Home > Health > BMI Calculator
4. **`<main>`**
   - `<h1>` — Primary keyword required
   - Intro paragraph (2–3 sentences)
   - **Calculator Panel** — inputs, calculate button, results area
   - **Chart** (where applicable — see Section 17)
   - **How to Use** — numbered steps
   - **Formula / Method Explanation**
   - **FAQ Section** — min 5 Q&A pairs with `FAQPage` schema
   - **Related Calculators** — 3–5 links
5. **Footer**

---

## 14. SEO RULES (apply to EVERY page)

- **Title format:** `[Calculator Name] - Free Online Calculator | Calcify`
- **Meta description:** Max 155 characters. Include primary keyword + "free" + "online"
- **Every page must have:** canonical tag, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and both Schema blocks below
- **H1:** Primary keyword exactly once
- **URL structure:** `/pages/[category]/[name].html` (simple) or `/pages/[category]/[name]/` (medium/complex)
- **Internal links:** 3–5 related calculator links per page
- **Image alt text:** All images/icons must have descriptive alt attributes

### Schema Template 1 — WebApplication
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Calculator Name]",
  "url": "https://calcify.com/pages/[category]/[name]/",
  "description": "[Same as meta description]",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>
```

### Schema Template 2 — FAQPage
> ⚡ Enables Google rich results (expandable FAQ dropdowns). Critical for SEO. Never skip.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question exactly as shown on page]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Full answer]" }
    }
  ]
}
</script>
```

> Both schema blocks must appear on every calculator page and every category page. The `FAQPage` block must include **all** FAQ items — not a subset.

---

## 15. SHARED UTILITY FUNCTIONS — js/utils.js

Include via `<script src="/js/utils.js" defer></script>` in every page, after `main.js`.

| Function | Signature | Description |
|---|---|---|
| `formatCurrency` | `formatCurrency(number)` | USD string, 2 decimal places + commas. `1234.5` → `$1,234.50` |
| `formatNumber` | `formatNumber(number, decimals)` | Number with commas + set decimal places. `1234.5678, 2` → `1,234.57` |
| `validateInput` | `validateInput(value, min, max)` | `true` if finite number within `[min, max]`. `false` for empty/NaN/out-of-range. |
| `showError` | `showError(elementId, message)` | Shows styled inline error in element. Adds `.error-visible` class. |
| `hideError` | `hideError(elementId)` | Clears and hides error element. Removes `.error-visible`. |
| `debounce` | `debounce(func, delay)` | Returns debounced version of `func`. Recommended delay: `300ms`. |

### Rules
1. Always use `formatCurrency()` for monetary output
2. Always use `formatNumber()` — never raw `.toFixed()`
3. Always call `validateInput()` before calculating
4. Always use `showError()` / `hideError()` — never `alert()`
5. Use `debounce()` for all `input` event listeners
6. May add new functions but **never modify or remove existing ones**

---

## 16. PERFORMANCE RULES

1. **Chart.js is NOT global.** Only include its `<script>` tag on pages that render a chart.
2. **All `<script>` tags must use `defer`.** No exceptions.
3. **Lazy load all below-fold images:** `<img src="..." alt="..." loading="lazy">`
4. **Per-page JS target: under 100KB total** (excluding CDN libraries). Split large logic into page-specific files.
5. **No new libraries without Claude approval.** Approved list: Chart.js, Font Awesome, lunr.js, Inter. Everything else needs sign-off.
6. **Cache DOM references** at the top of each script — never call `document.getElementById()` inside loops or event handlers.
7. **No unused CSS globally.** Calculator-specific styles go in `calculator.css` or the calculator's own `style.css`.

---

## 17. CHART & VISUALIZATION STANDARDS

**Library:** Chart.js only (CDN approved). Load only on pages that use charts.

### Mandatory Chart Code Pattern

Gemini must use this exact pattern in every `script.js` that renders a chart:

```javascript
// 1. Declare instance at top of script
let chartInstance = null;

// 2. Always destroy before re-creating
function renderChart(data) {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
  const ctx = document.getElementById('myChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Chart Title' },
        legend: { display: true }
      },
      scales: {
        x: { grid: { color: getCSSVar('--border') } },
        y: { grid: { color: getCSSVar('--border') } }
      }
    }
  });
}

// 3. Helper to read CSS variables — use for ALL chart colors
function getCSSVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim();
}

// 4. Re-render chart when dark mode toggles
document.addEventListener('themeChanged', () => renderChart(currentData));
```

### Chart Container HTML

Copy into every calculator page that has a chart:

```html
<div class="chart-wrapper">
  <div class="chart-container">
    <canvas id="myChart"
            aria-label="[describe what chart shows]"
            role="img">
    </canvas>
  </div>
</div>
```

### Chart CSS

Already defined in `calculator.css` — **do not rewrite it**:

```css
.chart-wrapper {
  margin: 2rem 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
@media (max-width: 768px) {
  .chart-container { height: 220px; }
}
```

### Dark Mode Chart Colors

Never hardcode chart colors. Always use `getCSSVar()`:

| Purpose | Variable |
|---|---|
| Grid lines | `getCSSVar('--border')` |
| Labels / text | `getCSSVar('--text-secondary')` |
| Primary data | `getCSSVar('--primary')` |
| Success data | `getCSSVar('--success')` |
| Error / negative data | `getCSSVar('--error')` |
| Accent data | `getCSSVar('--accent')` |

### Data Table Rules

For amortization / schedule tables:
- Show first 12 rows by default
- Add "Show All" / "Show Less" toggle if over 24 rows
- Wrap all tables in `<div class="table-wrapper">` for mobile scroll
- Add "Download CSV" button on all data tables
- Use `var(--surface-2)` for alternating row colors

### Chart Checklist

Gemini must verify before submitting any chart-bearing calculator:

- [ ] Chart.js CDN only on this page
- [ ] `chartInstance = null` declared at top of script
- [ ] `destroy()` called before every new render
- [ ] `responsive: true` + `maintainAspectRatio: false`
- [ ] `chart-container` has fixed height in CSS
- [ ] All colors use `getCSSVar()` — no hardcoded hex
- [ ] Dark mode re-renders correctly on `themeChanged` event
- [ ] Chart updates when user changes any input
- [ ] Canvas has `aria-label` attribute
- [ ] Mobile tested at 375px — no overflow

---

## 18. CODING STANDARDS — GEMINI MUST FOLLOW ALL OF THESE

1. **Always use CSS variables** — never hardcoded hex values anywhere
2. **Every JS function must have a JSDoc comment** explaining what it does
3. **All input fields must have `<label>` elements** — required for accessibility and SEO
4. **Use semantic HTML** — `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`
5. **Every calculator must have** all sections listed in Section 13
6. **Input validation** — validate all inputs, show inline error messages via `showError()`
7. **Chart.js rules** — see Section 17 for full pattern (destroy before create, `getCSSVar()` for colors)
8. **Mobile-first CSS** — base styles for mobile, `@media (min-width: 768px)` for desktop
9. **Never use `alert()`** — use `showError()` from `utils.js`
10. **File encoding:** UTF-8 for all files
11. **Dark mode implementation:**
    - Toggle attribute on `<html>` element: `document.documentElement.setAttribute('data-theme', 'dark')`
    - Default (light): `[data-theme="light"]` or no attribute
    - Dark active: `[data-theme="dark"]`
    - After toggle: `document.dispatchEvent(new Event('themeChanged'))` so charts re-render
    - All CSS must work correctly under both `[data-theme="light"]` and `[data-theme="dark"]`
12. **No inline styles** — all styles go in CSS files
13. **Button states:** All buttons must have `:hover`, `:active`, and `:focus` states
14. **No inline `<style>` tags** in any HTML file, ever
15. **No inline `<script>` logic** in medium/complex calculators — always use `script.js`

---

## 19. FILE OWNERSHIP

### Files Gemini Should NEVER Modify:
- `css/style.css` — Global styles (ask Claude first)
- `js/main.js` — Global JS (ask Claude first)
- `firebase.json` — Firebase config
- `.firebaserc` — Firebase project settings
- `PROJECT_MASTER.md` — Only Claude updates this
- Never add inline `<style>` tags to any HTML file
- Never add inline `<script>` logic in medium/complex calculators — always use `script.js`

### Files Gemini Owns and Updates Freely:
- Any 🟢 simple calculator: `pages/[category]/[name].html`
- Any 🟡 medium calculator folder: `pages/[category]/[name]/`
- Any 🔴 complex calculator folder: `pages/[category]/[name]/`
- Each calculator's own `script.js` and `style.css`
- `sitemap.xml` — Add new URLs after every new page
- `CHANGELOG.md` — Must update after every single task
- `STATUS.md` — Must update checkboxes after every task

### Files Gemini May Modify With Care:
- `js/utils.js` — May **add** new utility functions only; never modify or delete existing ones
- `js/calculators.js` — Add new entries only, never delete existing ones
- `js/search-index.js` — Regenerate after adding new calculators
- `css/components.css` — Only add new component styles, never change existing ones
- `css/calculator.css` — Full ownership

---

## 20. LEAN AI PROMPT RULES

Rules for how to ask AI to build calculators efficiently. These prevent wasting tokens by sending unnecessary context.

### What to Include in Every Calculator Prompt

| Include | Reason |
|---|---|
| ✅ Calculator name and file path | So Gemini knows exactly where to write |
| ✅ Complexity flag (🟢/🟡/🔴) | Determines file structure |
| ✅ List of inputs (name, type, unit) | Core spec |
| ✅ Formula or calculation logic | Core spec |
| ✅ Output to display | Core spec |
| ✅ Chart type if applicable | Determines if Chart.js is needed |
| ✅ 3 related calculator IDs | For internal linking |
| ✅ Primary SEO keyword | For title, H1, meta description |

### What to Never Include

| Never Include | Reason |
|---|---|
| ❌ Previous calculator's code | Irrelevant, wastes tokens |
| ❌ Contents of `style.css`, `main.js`, or `utils.js` | Already in context via PROJECT_MASTER.md |
| ❌ Full `PROJECT_MASTER.md` | Gemini already has it |
| ❌ Other already-built calculator pages | Not needed for new builds |
| ❌ Any file that has not changed | Noise |

### Standard Calculator Build Prompt Template

```
Build this calculator. Output new files only.
Global CSS and JS already exist — do NOT rewrite them.

Name: [CALCULATOR NAME]
Path: pages/[category]/[name].html         (🟢 simple)
   OR pages/[category]/[name]/             (🟡🔴 folder)
Complexity: [🟢 simple / 🟡 medium / 🔴 complex]
Files needed: [index.html only /
               index.html + script.js /
               index.html + style.css + script.js]

INPUTS:
- [Input name]: [type] in [unit]

FORMULA / LOGIC:
[Explain calculation, or: "Use the standard [name] formula"]

OUTPUT:
- Primary result: [what to show prominently]
- Secondary results: [other values]
- Table: [yes — describe columns / no]

CHART:
- Needed: [yes / no]
- Type: [line / bar / doughnut / area / combo]
- X-axis: [e.g. Years 1–30]
- Y-axis: [e.g. Amount in $]
- Data series: [e.g. Balance, Interest Paid, Principal Paid]

SEO:
- Primary keyword: [e.g. "loan calculator"]
- Title tag: [Calculator Name] - Free Online Calculator | Calcify
- Related calculators: [id-1, id-2, id-3]

Follow all PROJECT_MASTER.md rules.
```

### When Debugging — Paste Only the Broken File

| Bug type | Paste only |
|---|---|
| Logic bug | `script.js` only |
| Layout bug | `index.html` only |
| Style bug | `style.css` only |
| Global bug | Raw URL of ONE file only |

> Never paste multiple files to fix one bug. The more code you paste, the slower and less focused the fix.

---

## 21. AFTER EVERY TASK — GEMINI CHECKLIST

Before marking any task complete, Gemini must confirm:

- [ ] Read PROJECT_MASTER.md before starting
- [ ] Used CSS variables (no hardcoded colours)
- [ ] All inputs have `<label>` elements
- [ ] Page has full SEO meta tags + **both** Schema blocks (WebApplication + FAQPage)
- [ ] Chart.js only loaded on this page if it uses a chart
- [ ] All `<script>` tags use `defer`
- [ ] Images use `loading="lazy"`
- [ ] Chart (if applicable) — full Section 17 checklist completed
- [ ] Dark mode uses `documentElement.setAttribute` — not `body.classList`
- [ ] Dark mode works correctly on the new page
- [ ] Mobile layout tested at 375px viewport
- [ ] Calculator complexity matches file structure (🟢 = single file, 🟡 = 2 files, 🔴 = 3 files)
- [ ] No inline `<style>` tags in HTML files
- [ ] No inline `<script>` logic in medium/complex calculators
- [ ] New calculator registered in `calculators.js` with all required fields including `complexity`, `hasChart`, `chartType`, `fileType`, and `dateAdded`
- [ ] `search-index.js` updated (if new calculator added)
- [ ] `CHANGELOG.md` updated with task details
- [ ] `STATUS.md` checkbox updated
- [ ] `sitemap.xml` updated with new page URL

---

## 22. SEARCH SYSTEM

Calcify's search works entirely client-side — no backend, no server calls at search time.

### How It Works
1. `calculators.js` is the data source — `name`, `description`, `tags`, and `category` are indexed
2. `search-index.js` is pre-built from `calculators.js` — regenerate whenever new calculators are added
3. The search bar (homepage hero + optionally navbar) queries the index with lunr.js or a custom filter
4. Results appear as a dropdown or inline panel — no page reload

### Library Options

| Option | When to use |
|---|---|
| **lunr.js** (preferred) | Fuzzy matching and ranked results |
| **Custom simple search** | Filter `calculators.js` array by matching `name` and `tags` against query string |

### Rules
1. Search must never require a network request beyond initial page load
2. `search-index.js` must stay in sync with `calculators.js`
3. Results link directly to the calculator's `url` from its registry entry
4. No server-side search library or API without Claude approval

---

*Last updated by Claude — Added: 3-tier file structure (§4), Calculator Complexity Flags (§10), Chart & Visualization Standards (§17), Lean AI Prompt Rules (§20); Updated: dark mode implementation (§2, §18), file ownership 3-tier rules (§19), Gemini checklist (§21)*
*Do not edit this file manually. Request updates through Claude.*
