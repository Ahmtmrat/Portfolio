# Portfolio — Ahmet Murat Yıldırım

Personal engineering portfolio at **[ahmetmuratyildirim.dev](https://ahmetmuratyildirim.dev)**.
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Shiki.

## Design system

The UI implements the **AMY — Portfolio Design System (Galaxy)**: a three.js
starfield fixed behind the entire page, with sections layered over it as
translucent tints and content held in frosted-glass cards, so the backdrop
stays visible the whole way down. One accent — teal `#3fe0cb`. 28px radii,
fully pill-shaped buttons, a blurred sticky nav.

Every token lives in [`app/globals.css`](app/globals.css) — colour ramp, type
scale, spacing, radii, elevation and motion. Components consume the tokens
through the class layer defined in the same file; nothing hardcodes a colour.

The neutral `--ink-*` ramp is **inverted** for this surface: it keeps its
meaning (high number = strongest foreground) but resolves to white and
translucent whites, so every component reads correctly on dark without
carrying a per-component light/dark branch.

Cards belong to one of three star-tint families — turquoise, periwinkle,
amber — applied with `.glass-1` / `.glass-2` / `.glass-3`.

The site is dark-only by design; there is no theme toggle.

### The galaxy backdrop

[`components/GalaxyCanvas.tsx`](components/GalaxyCanvas.tsx) generates a
five-armed spiral of 50,000 points plus a distant twinkling field, drifting
under a soft mouse parallax. Everything is produced at runtime — **no model
file, no sprite image, no third-party asset**; even the star sprite is drawn
into a canvas on the fly.

It is strictly decorative and defensive about it:

- `three` is imported dynamically, so it lands in its own ~680 KB chunk that
  is not referenced by the initial HTML and never blocks first paint.
- Missing WebGL, a blocked context or a failed import leaves the page fully
  readable — the canvas simply stays empty.
- `prefers-reduced-motion` renders a single still frame instead of animating.
- The render loop stops while the tab is hidden.

## Getting started

```bash
npm ci
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit
```

## Layout

```
app/
  layout.tsx        root layout — fonts, metadata, JSON-LD, language cookie
  page.tsx          section composition
  globals.css       design tokens + component classes
  sitemap.ts        robots.ts
components/
  ui/               design-system primitives (Button, Chip, Card, …)
  GalaxyCanvas.tsx  procedural three.js starfield backdrop
  *.tsx             page sections
context/
  LanguageContext   EN/TR, resolved server-side from the `lang` cookie
data/
  cv.ts             language-independent CV structure, keyed by id
  translations.ts   all copy, EN + TR
  snippets.ts       production code samples, highlighted at build time
```

## Content model

`data/cv.ts` holds only what does not change between languages (dates, company
names, technologies, project glyphs and accent colours). Everything readable
lives in `data/translations.ts`, keyed by the **same `id`** — never by array
index — so reordering either file cannot desynchronise them.

`tr` is typed as `Translations` (derived from `en`), so a missing or misspelled
key is a compile error rather than a blank spot on the page. Snippet ids are
typed as `keyof Translations["snippets"]`, so a code sample cannot ship without
its title and description.

## Internationalisation

The active language comes from a `lang` cookie read in the root layout, so the
first paint is already correct and `<html lang>` matches the content — no flash
of English and no hydration mismatch. This makes `/` server-rendered on demand
rather than statically prerendered.

## Deployment

Vercel picks up `vercel.json`; security headers (CSP, HSTS and friends) are
defined once in [`next.config.ts`](next.config.ts) so they apply on every host.
`output: "standalone"` supports the container build in [`Dockerfile`](Dockerfile):

```bash
docker compose up --build
```
