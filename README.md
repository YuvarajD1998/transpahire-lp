# Transpahire — marketing website

The public marketing site. Static HTML, CSS and native ES modules. **Zero
dependencies** — no `package.json`, no lockfile, no `node_modules`.

**Phase 5 — streams A, B and the governance work are complete.**
Twenty-three pages. The hero is the product's whole job-detail surface rather
than a strip of six names; the site has its first low-threshold conversion path,
two tool pages and an email capture, where before this every page funnelled into
a thirty-minute call. The motion system did not move.

**Read `docs/phase-4.md` § 1 first, then `docs/phase-5.md` § 2.** § 1 is the
site's fact sheet — every weight, label, enum and route, read out of the product
on 31 August 2026. § 2 of the Phase 5 document is its delta, read out of the same
source on the same date, and it corrects nothing in § 1.

Three streams were deliberately not built: `/proof`, because its whole content is
three real job descriptions run through the live services and a page of invented
parser output would be the one invention this site has avoided; the screenshots,
which need the running app; and the indexing switch with the three pages behind
it, which is gated on six named inputs.

What is outstanding is business and legal input, not engineering:
`docs/phase-5.md` § 9 lists it with owners, `robots.txt` lists the six that gate
indexing, and `docs/content-integrity.md` § 5 is the gate.

---

## Run it

The HTML files are committed and served as-is. Any static server works; the site
needs one, because every internal link and asset path is root-relative and ES
modules require `http://`.

```bash
node tools/serve.mjs
# → http://localhost:4321
```

---

## Change it

The `.html` files are **generated**. Edit the source and rebuild:

```bash
node tools/build.mjs      # writes the twenty-three pages and sitemap.xml
node tools/check.mjs      # structural checks over every built page
node tools/audit.mjs      # drives headless Chrome over the built site
```

`tools/` runs on your machine, uses only Node's standard library, and produces no
build artefact — the HTML it writes *is* the site. Nothing is installed and the
served site has no build step. Why this exists rather than hand-written pages or
Astro: `docs/architecture.md § 1b`.

---

## Structure

```
GENERATED — committed, served as-is
  index.html
  product/ · product/matching/ · product/sourcing/
  product/candidate-intelligence/ · product/hiring-operations/
  product/analytics/
  for-teams/ · for-hiring-managers/ · for-candidates/
  trust/ · pricing/ · changelog/ · demo/ · about/
  legal/ · legal/privacy/ · legal/terms/
  legal/terms/organisations/ · legal/terms/candidates/ · legal/cookies/
  sitemap.xml

SOURCE — never served
  src/lib/layout.mjs          One head, header, drawer, footer, icon sprite
  src/lib/compositions.mjs    Every product composition
  src/lib/legal.mjs           The legal document layout, and the [COUNSEL] flag
  src/lib/page.mjs            Sub-page furniture
  src/pages/*.mjs             One module per page. Twenty-three of them
  tools/                      build · check · audit · serve · rankings

SHIPPED ASSETS
  assets/data/product-demo.js  THE single source of every product value
  assets/css/                  tokens → base → motion → components → sections
  assets/js/                   main.js + fifteen single-concern modules
  assets/brand/                Stratum mark, favicons, app icons, brand.json

  motion-lab.html              Internal motion reference (noindex, unlinked)
  CLAUDE.md                    Permanent development rules — read first
  DESIGN.md                    The design system
  docs/                        Architecture, motion, components, product
                               visuals, content integrity, glossary, phases 1–5
  prototypes/                  The Stage 2 board and the Stage 3 final page —
                               the landing page's visual source of truth
  STAGE-4-IMPLEMENTATION.md    How the Stage 3 prototype became the landing
                               page: files, deviations, what is still owed
```

CSS load order is cascade order. Do not reorder the `<link>` tags.

---

## Read this before changing anything

| Question | Document |
|---|---|
| What are the rules here? | `CLAUDE.md` |
| What colour / size / spacing should this be? | `DESIGN.md`, then `assets/css/tokens.css` |
| How do I animate this? | `docs/motion-system.md`, then open `motion-lab.html` |
| Is there already a component for this? | `docs/components.md` |
| Can I publish this claim? | `docs/content-integrity.md` — **usually the answer is no** |
| What does this page say and why? | `docs/phase-2/`, starting at its `README.md` |
| What is actually true about the product? | **`docs/phase-4.md` § 1 — the fact sheet. Start here** |
| What was built, and what deviated? | `STAGE-4-IMPLEMENTATION.md` (the landing page), then `docs/phase-5.md`, `docs/phase-4.md` |
| Why does the landing page look like this? | `prototypes/STAGE-3.md` — the approved prototype and its handoff |
| Which word do I use for this? | `docs/glossary.md` |
| Why is it built this way? | `docs/architecture.md` and `docs/audit.md` |

---

## Five things that will surprise you

**The site is closed to search engines on purpose.** Every page ships
`noindex, nofollow` and `robots.txt` is `Disallow: /`. Not because the content is
fake — Phase 4 reconciled all of it against the product source and Phase 5
rebuilt the hero from it — but because six named inputs are outstanding.
`robots.txt` lists all six with their owners and `docs/content-integrity.md § 5`
is the gate. Opening the site requires changing **both** the robots file and the
meta tag on all twenty-three pages, on the same day.

**Every product value is typed once**, in `assets/data/product-demo.js`. `87`
appears on many pages and is one value read many times. If you are about to type a
score, a candidate name, a dimension label, a weight, a threshold or a stage name
anywhere else, stop — that divergence is the defect the module exists to prevent,
and it had already happened once inside the specification before the site was
built. **This rule also beats a plan:** `docs/phase-4.md` sketches compositions
with invented figures, and every one of them was built with the data module's own
values instead.

**Under-claiming a shipped feature is a defect, not a safe default.** This is the
lesson of Phase 4 and the least obvious rule in the repository. Phase 3 filed
notifications and interview scheduling as "coming soon" while both were live, and
said the site "does not import a person who did not ask to be there" while the
default import path did exactly that. Nine claims were wrong and sixteen live
capabilities were filed as absent. A prohibition list protects you from
over-claiming and does nothing about the opposite failure. `tools/check.mjs`
carries a stale-fact tripwire now; when a fact changes, add a line to it in the
same commit.

**There is a line between a mechanism claim and an outcome claim, and it is
load-bearing.** "We read the job description for exclusionary language and hold no
demographic data" is publishable. "Fair by design" is not, and needs named legal
sign-off. `CLAUDE.md § 7` states it; `tools/check.mjs` fails the build on four
outcome phrases in visible copy. The one exempt element is the list on `/trust`
that *names* the claims we refuse to make.

**Motion is a system, not a set of effects.** Nothing has a bespoke animation.
Every movement composes from primitives in `assets/css/motion.css`, each with a
cap, each demonstrated on `motion-lab.html`. Exactly one primitive animates a
property outside the `transform` / `opacity` / `filter` allowlist, and it is
recorded as a bounded exception with a six-path limit that `tools/check.mjs`
enforces. **P5 is documented as a composition of two existing primitives rather
than as a fifth animation** — if an existing pair can do the job, that is what to
document.

---

## Common tasks

**Change a colour, size or timing** — edit `assets/css/tokens.css`. Nowhere
else. A raw hex or a `clamp()` outside that file is a bug.

**Change a product value** — edit `assets/data/product-demo.js` and rebuild.
Nowhere else holds one.

**Add a section** — compose from existing components (`docs/components.md`) in
the page's module under `src/pages/`. Give it `data-reveal` /
`data-reveal-group`. Page-specific CSS goes in `sections.css`, nothing else.

**Add a page** — add a module to `src/pages/` exporting `meta` and `render()`,
its name to the `PAGES` list in `tools/build.mjs`, and its built path to the
`PAGES` list in `tools/check.mjs` and `tools/audit.mjs`. The head, header,
drawer, footer and sitemap entry come for free.

**Correct a fact** — edit `assets/data/product-demo.js`, then **add the old claim
to `STALE` in `tools/check.mjs` in the same commit.** That list is what stops the
claim reappearing, and it is the only part of this repository that would have
caught the nine defects Phase 4 existed to fix. A comment that legitimately
quotes a retired claim carries `[STALE-OK]` on its line.

**Replace a screenshot placeholder** — swap the `.frame__placeholder` for an
`<img>`. **Keep `--ratio` on the frame** — it is what prevents layout shift, and
`tools/check.mjs` fails the build if a frame loses one.

**Add a motion primitive** — `docs/motion-system.md § 6`. Lab swatch first, docs
entry second, use third.

---

## Size

Twenty-three pages, and **zero network requests for any product
composition** — they are all composed HTML. 88KB of JavaScript across fourteen
modules, a 68KB data module, 204KB of CSS. All unminified and heavily
commented; roughly half of the CSS and JS is documentation. Minification needs
a build step, which is deliberately absent — it waits for the Astro port rather
than justifying one.

The site makes **one third-party request**: a Google Fonts stylesheet, and the
font files it points at. `/legal/cookies` names it and commits to removing it by
self-hosting, which is about half a day of work and is on the open list.

---

## Verified

`node tools/check.mjs` — 24 pages and 42 source files: tag balance, heading
levels, duplicate ids, aria references, dead and broken links, image alt text,
frame ratios, input labels, the head contract, the stylesheet load order, the
five motion budgets, the stale-fact tripwire, placeholder-on-shipped, the banned
implementation vocabulary, the four outcome claims, and — new in Phase 5 — that
nothing inside `.workspace` is operable.

`node tools/audit.mjs` — 23 pages plus the motion lab at 390 / 768 / 1440 via the
Chrome DevTools Protocol:

- zero console errors; every reveal, group and sequence fires
- `will-change` released after settle; no horizontal overflow at any width
- the explanation panel lands every beat, arrives at the partial concept card
  alone, and **every card cites a section of the profile**
- **the hero fits one screen** — at 1440×900 and 1280×800 the frame chrome, the
  job header, the pulse strip, the tab strip and at least three (two) candidate
  rows are above the fold, without scrolling
- **nothing in the hero composition is operable** — no button, select, link or
  focusable tabindex inside `.workspace`
- both interactions work — the switcher changes the panel, the ring's band and
  the confidence level and announces it once; an importance change reorders the
  list, recounts, updates each ring's arc, and reads out the tier *word*
- every tab stop shows a focus ring; the nav menu is `inert` when closed, opens,
  closes on Escape and returns focus
- under **reduced motion**: nothing hidden, nothing transformed, no empty meter,
  no undrawn edge, no float running, the hero drawer present and complete — and
  both interactions still work
- with **JavaScript disabled**: every composition's content is present

**Not yet covered:** real screen-reader testing, Safari and Firefox, physical
touch devices.
