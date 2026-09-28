# Architecture

The stack decision, the file structure it produced, and the migration path for
when the decision changes.

---

## 1. Decision

**Stay on standards-based HTML + CSS + native ES modules for Phase 1.
Re-evaluate — and most likely adopt Astro — at the start of Phase 2, once the
information architecture is known.**

No build step. No dependencies. No framework.

### Why not migrate now

The question was framed as "HTML/CSS/JS or Vite + React". Neither is quite
right yet, and the timing is the deciding factor.

**Phase 2 will redesign the content.** The IA, the section list, the narrative
and the product visualisations are all explicitly undetermined. Migrating a
page whose content is about to change means porting markup twice. The
expensive, durable part of this phase — tokens, motion, component semantics —
is portable to *any* target, and that is where the effort went.

**One page does not justify a framework.** There is currently a single HTML
document. React's value is component reuse and client state; a marketing page
has little of either. Its cost — a runtime shipped to every visitor, hydration,
a build to debug — is paid immediately.

**The constraints point away from React specifically.** This is a content site
that needs excellent SEO, fast first paint, and near-zero client JavaScript.
React defaults to the opposite of all three, and correcting for that means
reaching for a meta-framework anyway.

**Zero dependencies is a real asset.** No supply chain, no lockfile drift, no
build that breaks in eight months. For a site a small team edits occasionally,
that is worth protecting until something concrete demands otherwise.

### What was done instead

The project was restructured so that migration is mechanical rather than a
rewrite:

- **Tokens are isolated.** `tokens.css` contains no selectors. It can be lifted
  into any framework unchanged, or converted to a JS/Tailwind theme by reading
  `assets/brand/brand.json`.
- **Motion is a standalone layer.** `motion.css` plus seven JS modules. In a
  React target these become hooks or a `<Reveal>` wrapper; the CSS is unchanged.
- **Components are documented patterns** with defined markup contracts
  (`docs/components.md`). Each maps 1:1 to a future component.
- **Behaviour is modular.** Seven ES modules, one concern each, no shared
  state, each guarding its own absence. Any bundler consumes them as-is.
- **The page is semantic.** Real `<table>`, real `<button>`, real landmarks. The
  accessibility work survives any migration; it is the part that is expensive
  to redo and easy to forget.

### The trigger to migrate

Migrate when **two or more** of these are true:

- More than three pages exist (header, footer and nav are then duplicated
  markup, which is where hand-maintained HTML starts to rot).
- A blog or resources section is committed to (content collections, feeds,
  pagination).
- Product visualisations need to be data-driven (one `<CandidateCard>` fed a
  list, rather than hand-written repeated markup).
- Someone other than the maintainer and Claude Code needs to edit content.

### Recommended target: Astro

When the trigger fires, **Astro** over Vite + React:

| | Astro | Vite + React |
|---|---|---|
| Default JS shipped | Zero | Full runtime |
| SEO / first paint | Static HTML | Needs SSG/SSR configuration |
| This project's CSS | Drops in unchanged | Drops in unchanged |
| This project's ES modules | Work as-is | Work as-is |
| Islands of interactivity | Native (`client:visible`) | Everything is an island |
| Content collections | Built in | Add a library |
| Migration cost from here | Low — HTML is nearly valid `.astro` | Medium — markup must be JSX-ified |

Astro also keeps the option open: a React island can be dropped in later for a
genuinely interactive product demo without converting the whole site.

**Rejected: Next.js.** Correct for an app, oversized for a marketing site —
more framework surface than this project will ever use.
**Rejected: staying on hand-written HTML past four pages.** Duplicated headers
and footers are exactly how marketing sites drift out of sync.

### Migration strategy, when it happens

1. `npm create astro@latest` alongside; do not delete anything yet.
2. Copy `assets/css/*` in unchanged. Import in the base layout in the same
   order. **This step should require no edits** — if it does, a token has
   leaked into a component.
3. Copy `assets/js/modules/*` in unchanged; call them from a base-layout script.
4. Extract `<head>`, header, drawer, footer and the icon sprite into
   `layouts/Base.astro`. This is the actual win: one copy each.
5. Convert each section to a `.astro` component, **markup unchanged**. Section
   props (heading, eyebrow, cards) become frontmatter.
6. Move `data-content` classifications to frontmatter so the content inventory
   becomes lintable rather than grepped.
7. Add pages one at a time. Delete the static originals only after parity is
   confirmed at 390 / 768 / 1440 with the keyboard.

**Preserve:** all five stylesheets, all seven JS modules, every semantic
decision, the token layer, the motion system, `motion-lab.html`.
**Rewrite:** only the page shell and the section composition.
**Risks:** losing the accessibility work by "cleaning up" markup during
conversion (mitigation: convert markup verbatim, refactor later); build-time
CSS reordering (mitigation: one explicit import list in the base layout);
scope creep into a redesign (mitigation: migrate and redesign in separate
passes).

---

## 1b. What Phase 3 did about the trigger

**Both triggers fired, and neither Astro nor hand-written HTML was the right
answer to them yet.** What shipped is a third option, and it is recorded here
because it is a deviation from the plan in `docs/phase-2/11-PHASE_3_PLAN.md § 3`,
which sequences the Astro migration first.

### The two triggers, and what each one actually demanded

| Trigger | Fired | What it demanded |
|---|---|---|
| More than three pages | **Yes — twenty-two** | One copy of the `<head>`, header, drawer, footer and icon sprite |
| Data-driven product visualisations | **Yes** | One copy of every value in every composition |
| A committed blog | No | — |
| Non-maintainer editors | Unknown | — |

The second is the sharper of the two, and it is stated as a non-negotiable in
`docs/phase-2/08-PRODUCT_VISUALIZATION_SPEC.md § 1`:

> Numbers appear once. `87` appears in sections 01, 05, 06, 08 and 10. That is
> one value read five times. Hand-typing it guarantees divergence, and a
> divergence here is the most visible possible defect.

Across the ten marketing pages that value is read more than twenty times, and the
explanation panel's full markup appears on four pages at three crops.

### What shipped

```
assets/data/product-demo.js     the single source of every product value
src/lib/compositions.mjs        every composition, as a function
src/lib/layout.mjs              one <head>, header, drawer, footer, sprite
src/lib/page.mjs                sub-page furniture
src/lib/legal.mjs               the three legal pages' shared shape
src/pages/*.mjs                 one module per page
tools/build.mjs                 writes the HTML and the sitemap
tools/rankings.mjs              authors the 64-combination ranking fixture
tools/serve.mjs                 a static server, for checking
tools/check.mjs                 structural checks over every built page
tools/audit.mjs                 drives headless Chrome over the built site
```

**The shipped site is unchanged in kind.** Plain HTML, CSS and native ES modules;
no runtime dependency; nothing to install to view it. `tools/` runs on the
maintainer's machine, uses only Node's standard library, and produces no build
artefact — the `.html` files it writes *are* the site, and they are committed.

The dependency count is still **zero**. There is no `package.json`, no lockfile
and no `node_modules`.

### Why not Astro yet

Astro remains the recommended target and the plan's first step. Three reasons it
was not the right first move here, in order of weight:

1. **It front-loads the structural work and defers the content.** The plan's own
   critical path runs *migrate → P1 → data module → C2 → §06 sequence*. Every
   item after the first is what the site is actually for, and the migration is
   the only one that produces nothing a visitor can see.
2. **Migrating markup that does not exist yet is not a migration.** The plan
   sequences the migration before page content specifically so that ten pages
   are not ported twice. But there were zero pages to port and twelve sections to
   author, so the risk it was avoiding — porting hand-written pages later — was
   avoided just as well by never hand-writing them.
3. **It is the one step that risks the two things Phase 2 named as most likely
   to be lost** — the accessibility work and `--ratio` on every frame — and it
   would have risked them against markup nobody had validated yet. Migrating
   *working, checked* markup is a safer operation than migrating markup and then
   finding out what it should have been.

### The port to Astro, from here

Cheaper than it was before Phase 3, and mechanical:

1. Every page module is `export const meta` plus a function returning a string.
   That is an `.astro` component with different syntax. `meta` becomes
   frontmatter; the template literal becomes the markup body.
2. `src/lib/layout.mjs` becomes `layouts/Base.astro` — it is already exactly the
   extraction step 4 of § 1's migration strategy describes.
3. `src/lib/compositions.mjs` becomes one component per composition. The
   functions already take props and return markup, and they already read from a
   data module Astro can import unchanged.
4. `assets/data/product-demo.js` moves to `src/data/` and keeps its shape.
5. `assets/css/*` and `assets/js/modules/*` copy in unchanged, as § 1 requires.
6. `tools/check.mjs` and `tools/audit.mjs` run against the Astro build's output
   and are the parity test. That is the real gain from doing it in this order:
   the migration now has a pass/fail criterion instead of an eyeball.

**What would trigger doing it:** a blog or resources section, a second person
editing content, or the page count growing again. None of those is true today.

## 2. Structure

```
transpahire-landing-page/
│  GENERATED — written by tools/build.mjs, committed, served as-is
├── index.html                  Home
├── product/index.html
├── product/matching/index.html
├── product/sourcing/index.html
├── product/candidate-intelligence/index.html
├── for-teams/index.html
├── for-candidates/index.html
├── demo/index.html
├── about/index.html
├── legal/{privacy,terms,cookies}/index.html
├── sitemap.xml
│
│  HAND-WRITTEN
├── motion-lab.html             Internal motion reference (noindex)
├── site.webmanifest
├── robots.txt                  Currently Disallow: / — see content-integrity.md
├── CLAUDE.md                   Permanent development rules
├── DESIGN.md                   The design system
├── README.md
│
├── src/                        Authoring source — never served
│   ├── lib/
│   │   ├── layout.mjs          One head, header, drawer, footer, sprite
│   │   ├── compositions.mjs    The eight product compositions
│   │   ├── page.mjs            Sub-page furniture
│   │   └── legal.mjs           The legal pages' shared shape
│   └── pages/                  One module per page
│
├── tools/                      Authoring and checking — never served
│   ├── build.mjs               Writes the HTML and the sitemap
│   ├── rankings.mjs            Authors the 64-combination ranking fixture
│   ├── serve.mjs               Static server, for local checking
│   ├── check.mjs               Structural checks over every built page
│   └── audit.mjs               Drives headless Chrome over the built site
│
├── docs/
│   ├── architecture.md         This file
│   ├── motion-system.md
│   ├── components.md
│   ├── product-visualization.md
│   ├── content-integrity.md
│   ├── audit.md                Phase 1 findings
│   └── phase-2.md
│
└── assets/
    ├── css/
    │   ├── tokens.css          Values only. No selectors.
    │   ├── base.css            Reset, type, layout primitives, a11y floor
    │   ├── motion.css          The motion system
    │   ├── components.css      Reusable components
    │   └── sections.css        Page-level composition
    ├── data/
    │   └── product-demo.js     THE single source of every product value
    ├── js/
    │   ├── main.js             Entry point
    │   └── modules/
    │       ├── prefs.js        Motion preference — every module asks this one
    │       ├── reveal.js       Scroll entrance + stagger indices
    │       ├── sequence.js     P2 sequenced beats, P4 path draw
    │       ├── nav.js          Header state + mobile drawer
    │       ├── menu.js         Header disclosure menus
    │       ├── tabs.js         WAI-ARIA tabs
    │       ├── accordion.js    Disclosure groups
    │       ├── counter.js      Count-up, and recount
    │       ├── parallax.js     Scroll-linked depth
    │       ├── panel.js        § 06 candidate switcher
    │       ├── tuner.js        § 08 importance controls, what-if, P3 reorder
    │       ├── poolfilter.js   § 05 classification filters
    │       └── dualmode.js     § 04 filters ⇄ describe
    ├── brand/                  Logo, favicons, app icons, brand.json
    ├── icons/                  Standalone icons (sprite is inline in the page)
    ├── images/                 Marketing photography and illustration
    ├── product/                Product screenshots and mockups
    └── videos/                 Demo video and posters
```

### Layer rules

Load order is cascade order; do not reorder the `<link>` tags.

```
tokens  →  base  →  motion  →  components  →  sections
```

- **tokens** may not contain a selector other than `:root` and `.on-ink`.
- **base** may not know about any component.
- **motion** may not style appearance — only movement.
- **components** must work on any ground, in any section.
- **sections** is the only layer allowed to be page-specific.

And one rule the data module introduces:

- **`assets/data/product-demo.js` is the only place a product value may
  appear.** Not a score, not a candidate name, not a dimension label, not a
  stage name — in CSS, in a page module, or in a JS module. Everything reads
  from it, at build time or at run time. This is what makes "`87` is typed
  once" true rather than aspirational.

A rule in the wrong layer is the main way a design system decays. If a
component needs a value, add the token; if a section needs a component, add it
to components.css and document it.

### CSS delivery

Five separate `<link>` tags rather than one file or an `@import` chain. Five
parallel requests on HTTP/2 cost less than a serialised `@import` waterfall,
and the separation is what keeps the layer rules enforceable. A bundler
concatenates them at migration time; nothing about the source has to change.

### JS delivery

One `<script type="module">`, which is deferred by default and never blocks
first paint. One synchronous inline line in `<head>` sets `html.js` before the
first paint so pre-reveal states are armed without a flash — it is the only
inline script on the site and should stay that way.

Total JS is roughly 14KB unminified across seven modules, with no dependencies.

---

## 3. Multi-page readiness

The eventual site may grow to `/features`, `/product`, `/solutions`,
`/pricing`, `/about`, `/resources`, `/blog`, `/contact`, `/legal`. **None of
those are built** — Phase 2 decides which exist.

What is in place to make adding them clean:

- Every style is page-agnostic except `sections.css`, and even that is mostly
  reusable composition.
- The header, drawer and footer are self-contained blocks with no page-specific
  content, ready to be extracted into a layout.
- `--container-text` (760px) exists for prose pages.
- `sitemap.xml` and `robots.txt` exist and are commented with what to change.
- Every page gets the same `<head>` contract: title, description, canonical,
  robots, OG, Twitter, theme-color, icons, manifest.

**All three now exist**, because Phase 2 settled the IA that they encode:
`src/lib/layout.mjs` is the page template, `NAV` inside it is the nav data
structure, and the routing convention is a directory per page with an
`index.html` — so every URL ends in a slash and every internal link and asset
path is root-relative. That last point is why the site must be **served** rather
than opened over `file://`; `node tools/serve.mjs` exists for that.

---

## 4. Performance

Current budget, homepage: zero JS dependencies, 61KB JS across fourteen
modules plus a 30KB data module, 141KB CSS — all unminified and all heavily
commented, so roughly half of each is documentation — 4 webfont families, and
**no images and no product screenshots**: every composition is composed HTML,
which costs no request at all.

The 72KB homepage is the largest document on the site and holds eight product
compositions. Minifying the CSS and stripping comments is the obvious next win
and it needs a build step, which is the one thing this project does not have —
so it waits for the Astro port rather than justifying one.

That last point is worth stating plainly: the eight product compositions on this
site, across ten pages, add zero network requests. They are the reason
`docs/product-visualization.md § 2` calls composed HTML the default rather than
a fallback.

Rules:

- Animate only `transform`, `opacity`, `filter`. Nothing in the codebase
  animates a layout property.
- Reserve space for everything. Product frames declare `--ratio`; counters
  reserve their final width in `ch`. These are the two CLS sources on a page
  like this and both are closed.
- `will-change` is applied only while an animation is pending and removed
  after (`reveal.js` adds `is-settled`). It is never a permanent declaration.
- Scroll handlers are rAF-batched and `{ passive: true }`. Parallax skips
  offscreen elements and is disabled entirely on coarse pointers.
- IntersectionObserver over scroll math; observers unobserve after firing.
- Request only the font weights the system declares — currently 8 faces across
  4 families, down from 17.
- No third-party script. Analytics, if added, is one deferred tag and must be
  justified against this list.

### Not yet done — Phase 2

- Self-host the fonts (removes two DNS lookups and a third-party dependency;
  subset to Latin). Currently deferred because the weight list may still change.
- `og:image` — 1200×630, once there is a real product visual.
- Minify and concatenate CSS, if a build is introduced.
- Real images: AVIF/WebP with `<picture>`, explicit `width`/`height`,
  `loading="lazy"` below the fold, `fetchpriority="high"` on the hero.
