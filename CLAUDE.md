# CLAUDE.md — Transpahire marketing site

Permanent development rules for this repository. Read this before changing anything.

---

## 1. Project identity

This is the **Transpahire marketing website** — the public site, not the product.

Transpahire, Inc. is an AI recruitment platform (enterprise SaaS). The brand
identity is the **Stratum** direction from the Transpahire Brand System: a
capital T whose stem is built from opacity-graded stacked segments,
"transparency in layers".

**Phase status: Phase 6 — the landing page is the approved Stage 3 prototype,
implemented.** Twenty-three pages. The homepage is now eight scenes
(`prototypes/STAGE-3.md`, the production handoff): the job-detail workspace as
the hero, the score taken apart on a pinned stage (P6, the sixth motion
primitive), the pool, the argument, the gate-capable tuner, the system and the
close. `STAGE-4-IMPLEMENTATION.md` at the root is the record: files, the
deviation log, and the two product decisions it raised, now settled. The Stage 3 visual
system — warm paper, the taller type ramp, the sans lede, the highlighter — was
adopted site-wide because the header and footer are shared.

**Two rules Phase 6 adds.** `RANKINGS` obeys the product's two ranking rules,
settled against the source on 28 Sep 2026 (`STAGE-4-IMPLEMENTATION.md` § 12):
a candidate missing a skill set to critical is never scored
(`MatchingService.isCriticalDisqualified`), and every classification word is
what `BANDS` gives the score — Strong ≥ 72, Good ≥ 52, Potential ≥ 32
(`RankerService.classifyScore`). Every tuner on the site reads `RANKINGS`;
`tools/rankings.mjs` authors it and `tools/check.mjs` asserts both rules over
it and over `CANDIDATES`. Change a score, rerun the tool.
And the native scroll timeline in `motion.css` hard-codes the header height
(`view(block 64px 0px)`) because it cannot read `--header-h`; `tools/check.mjs`
asserts the two agree. Change one, change both.

**Read `docs/phase-4.md` § 1 first, then `docs/phase-5.md` § 2.** § 1 is the
site's fact sheet; § 2 of the Phase 5 document is its delta and corrects nothing
in it. Where either and `docs/phase-2/` disagree, the later document wins. Where
either and the product source disagree, the source wins and the document gets
updated in the same commit. `docs/phase-5.md` § 9 lists what is still blocked and
on whom; § 10 of that file states what the phase was for.

The information architecture, the narrative and the section order are settled.
What remains outstanding is a named list and not one item on it is an engineering
decision: a destination for the demo form, a destination for the two tool
endpoints and a privacy paragraph covering them, a home for the email list, the
maintainer's OK on the `/about` founder paragraph (named 28 Sep 2026; no
contact, by decision), counsel's sign-off on four legal drafts, the pricing model, registered company details, three job descriptions for
`/proof`, confirmation that the people in `/product`'s screenshot (filled 28
Sep 2026) are demo data, and that the person whose résumé is in
`/product/sourcing`'s extension screenshot (filled 28 Sep 2026, email blurred)
and in `/product/candidate-intelligence`'s extraction-review screenshot (filled
28 Sep 2026, cropped to the dialog) is happy to appear.

**Three streams were NOT built, deliberately, and the reasons differ.**

- **`/proof` (§ 5.1)** — its entire content is three real job descriptions run
  through the live services. A `/proof` page carrying invented parser output would
  be the one invention this site has avoided from the beginning, so it is not
  scaffolded, not stubbed, and not faked. It needs the three JDs.
- **Screenshots (§ 5.2)** — needs the running app. **Built since, 28 Sep
  2026:** all three `screenshotSlot()` instances carry the running app. What is
  left is clearing the people in them, which is on the list above.
- **Indexing, and the three pages behind it (§ 6.1, § 6.3)** — six of the eight
  blockers gate the switch. `robots.txt` now lists all six with their owners, and
  `docs/phase-5.md` § 7 is explicit that the three new pages come *after* the
  switch: three more pages nobody can find is three more pages to maintain.

**The lesson Phase 4 exists to teach.** The nine factual defects it corrected
were not authoring mistakes. They were the correct output of a process pointed at
a stale planning document, and a prohibition list does not notice when the thing
it was protecting you from becomes true. Point the instinct at the schema instead
of at the plan.

**The lesson Phase 5 exists to teach**, and it is the same shape one layer down.
The hero was thin for a whole phase and every check passed on it. It was thin
because it had been designed to fit a column that was 560 pixels wide, and the
CSS switched off three of every row's five tracks to make it fit — with a comment
explaining, truthfully, that the drawer covered them. **A true local explanation
for a global defect is the hardest kind to notice.**

> A composition's width is a design input, not a consequence.
> If a layout forces `display: none` on a row track, the layout is wrong.

Neither `tools/check.mjs` nor `tools/audit.mjs` could see it, and neither could
see the frame that later grew to 1250px and pushed the headline off the screen.
Opening the page found both in seconds. That is § 6 step 6 earning its place, and
the audit now carries the one-screen measurement so it does not depend on
somebody remembering to look.

---

## 2. Design philosophy

The target is **editorial + product + intelligence + motion**.

| It should feel like | It must not feel like |
|---|---|
| A considered publication that happens to sell software | A generic AI SaaS template with effects |
| Dark ink, indigo accent, restrained neutrals | Purple gradients everywhere |
| Large type carrying the page | Icons and shadows carrying the page |
| Thin rules, generous whitespace, asymmetric bento | Endless identical rounded three-column cards |
| One serif italic accent per headline | Decoration for its own sake |

Concretely: Space Grotesk for display, Manrope for UI and body, **Instrument
Serif italic in indigo for the accented phrase inside a headline**, JetBrains
Mono for labels and data. That serif accent is the single most recognisable
Transpahire signature — wrap the phrase in `<em>` and the system handles it.

Banned by default (see DESIGN.md § Anti-patterns): glowing blobs, glassmorphism
as a default surface, floating sparkles, animation with no communicative job.

---

## 3. Engineering principles

1. **Inspect before modifying.** Read the file, and the token/component it
   depends on, before editing. Most "new" needs are already covered.
2. **Reuse the existing pattern.** A new class is a last resort. Check
   `docs/components.md` first.
3. **No unnecessary rewrites.** The **served** site has no build step and the
   project has **no dependencies** — no `package.json`, no lockfile, no
   `node_modules`. Keep it that way. `tools/` is an authoring layer that runs
   on the maintainer's machine using only Node's standard library and writes the
   committed HTML; it is not a build system and it ships nothing. Adding a real
   build, or a dependency, means executing `docs/architecture.md` § 1b's port
   deliberately.
4. **No dependency bloat.** Every dependency added to a marketing site is a
   permanent cost. The current dependency count is zero.
5. **Accessibility is not negotiable.** Semantic elements, one `<h1>`, no
   skipped heading levels, real buttons for actions, visible focus on
   everything, `prefers-reduced-motion` honoured. Never remove a focus ring.
6. **Preserve performance.** Animate only `transform`, `opacity` and `filter`.
   Reserve space for every image. Do not add render-blocking scripts.
7. **Responsive behaviour is part of "done."** Verify at 390px, 768px and
   1440px before considering a change complete.

### Where things live

```
assets/data/product-demo.js  THE single source of every product value.
assets/css/tokens.css        Design tokens. The only place a raw value may appear.
assets/css/base.css          Reset, typography, layout primitives, a11y floor.
assets/css/motion.css        The whole motion system.
assets/css/components.css    Reusable UI + marketing components.
assets/css/sections.css      Page-level composition only.
assets/js/main.js            Entry point. Registers every behaviour.
assets/js/modules/           One concern per module. scene.js is P6's clock.

src/lib/layout.mjs           One head, header, drawer, footer, icon sprite, and
                             the email sign-up.
src/lib/compositions.mjs     Every product composition.
src/lib/page.mjs             The sub-page pieces, and the two tool pages' shared
                             honest gap: toolGate(), toolPrivacy().
src/lib/legal.mjs            The legal document layout, and the [COUNSEL] flag.
src/pages/*.mjs              One module per page. Twenty-three of them.
tools/build.mjs              Writes the HTML. Run it after editing src/.
tools/check.mjs              Structural checks, the stale-fact tripwire, the
                             banned-vocabulary check, the inert-workspace
                             assertion, and the ranking rules (the gate and
                             BANDS). Run it before saying "done".
tools/audit.mjs              Headless-Chrome checks: reduced motion, the
                             one-screen hero at 1440×900 and 1280×800, the P6
                             stage (no two layers at once; the two clocks
                             agree), the critical gate, and the page heights.
tools/rankings.mjs           Authors RANKINGS in product-demo.js, gate and
                             bands included. Run after editing CANDIDATES or
                             TUNABLE.
prototypes/                  The Stage 3 final page — the landing page's visual
                             source of truth. Kept intact; not production.
```

Cascade order is load order. Do not reorder the `<link>` tags.

**The `.html` files are generated.** Editing one directly is a change that the
next `node tools/build.mjs` silently discards. Edit `src/` and rebuild.

**Two rules with no exceptions.** A raw value belongs only in `tokens.css`. A
product value — a score, a name, a label, a stage, a weight, a threshold —
belongs only in `product-demo.js`. Both exist so that one edit changes every
place a thing appears.

This rule beats a sketch. `docs/phase-4.md` sketches several compositions with
invented names and figures; every one of them was built with the data module's
own values instead, and the deviations are recorded at the composition. A hero
showing 84 while five other pages show 87 is the most visible possible defect.

---

## 4. Product integrity

**The template content is not product truth.** It was written to demonstrate a
layout, not to describe what Transpahire does.

Never invent:
customers · metrics · testimonials · integrations · certifications ·
partnerships · AI capabilities · pricing · security or compliance claims.

Every piece of content carries a classification (`docs/content-integrity.md`):

- **AUTHORITATIVE** — confirmed by Transpahire documentation. Safe to publish.
- **PROVISIONAL** — currently on the page, requires product validation.
- **PLACEHOLDER** — exists only to demonstrate layout.

Sections are annotated in the markup with `data-content="provisional|placeholder"`.
Grep for it. Never promote a classification without a source; never publish a
PLACEHOLDER number as a marketing claim.

**The classification is checked against the schema, not against a plan.**
`docs/phase-4.md` § 1 is the current fact sheet. When it and `docs/phase-2/`
disagree, § 1 wins. When § 1 and the product source disagree, the source wins and
§ 1 gets updated in the same commit.

**A stale prohibition costs as much as a false claim.** Phase 3 filed
notifications and interview scheduling as "coming soon" while both were live,
which told every buyer the product was less finished than it is. Under-claiming a
shipped feature is a defect, not a safe default. `tools/check.mjs` carries a
stale-fact tripwire and a placeholder-on-shipped check; when a fact changes, add
a line to `STALE` in the same commit.

The site ships `noindex` and `Disallow: /` on purpose. Opening it to search
engines requires clearing the content inventory first.

---

## 5. Motion rules

Use the centralised system in `assets/css/motion.css`. Do not write a bespoke
`@keyframes` or a one-off transition in a section.

1. **Motion communicates.** Hierarchy, product behaviour, relationship,
   progression. If you cannot say what an animation communicates, delete it.
2. **Motion feels expensive.** Subtle travel, decelerating easing, meaningful
   stagger. No bounce, no rotation, no aggressive scaling, no idle drift on
   text, no distracting parallax.
3. **Product visualisations may be more expressive** than text and cards — and
   only they may be. One expressive primitive per composition.
4. **Reduced motion is respected, always.** Enforced at the token layer so no
   component can opt out by accident. Verify with the toggle on
   `motion-lab.html`.
5. **The hero may be dense; it may not be interactive.** Added in Phase 5,
   because the rebuilt hero makes this far easier to violate than the old one
   did. `jobWorkspace()` renders a search field, a segmented control, five job
   tabs, five drawer tabs and six `Move to…` affordances, and every one of them
   is a `<span>`. A control that looks operable and is not is worse than a static
   image, and a real `<button>` in the hero is a focus stop that goes nowhere —
   a dozen of them before the first CTA is a keyboard user's whole impression of
   the page. `tools/check.mjs` asserts no `<button>`, `<select>`, `<a>` or
   focusable `tabindex` inside `.workspace`; `tools/audit.mjs` asserts the same
   over the rendered tree.

**Six primitives exist** — P1 meter fill, P2 sequenced beats, P3 list reorder,
P4 path draw, P5 drawer reveal, and P6 staged layers — each with a cap, each on
the lab page, documented in `docs/motion-system.md` § 3.

**P6 is the one pinned, scroll-driven sequence on the site**, and the Rejected
table's reason for turning such things down still governs everything else. It
is admitted on one condition: every state is a still, every layer is complete
DOM in reading order, and the stack — reduced motion, under 700px, no
JavaScript — is the same markup with no animation at all. Cap: one per page,
enforced. It moves only `transform` and `opacity`.

**P5 is documented as a composition of two existing primitives**, not as a fifth
animation: it reuses the nav drawer's translate-and-fade and the `tp-panel-in`
entrance, adds no keyframe and no module, and is released by an ancestor's reveal
exactly as P1 is. Cap: one per page. If an existing pair of primitives can do the
job, that is what to document — or the system grows an entry every time an old
pair gets a new job.

**One documented exception exists.** P4 animates `stroke-dashoffset`, which is
outside the transform/opacity/filter allowlist in § 3 rule 6, because no
transform draws a line along itself. It is bounded: six paths per page maximum,
that primitive only, and `tools/check.mjs` enforces the cap. **A second
exception needs the same treatment or a different design** — do not read this one
as permission.

**Adding a primitive:** demonstrate it in `motion-lab.html` first, document it
in `docs/motion-system.md`, then use it. Give it a cap. If it cannot be
justified on the lab page, it does not belong in the system.

---

## 6. AI development workflow

Before any significant change:

1. **Inspect** — read the affected files and their token dependencies.
2. **Understand** — establish what the current implementation is doing and why.
3. **Identify reusable patterns** — check `docs/components.md` and the token
   layer before authoring anything new.
4. **Plan** — state what changes, what is preserved, and what is deliberately
   not touched.
5. **Implement** — smallest change that fully does the job.
6. **Validate** — `node tools/build.mjs && node tools/check.mjs`, then
   `node tools/serve.mjs` and `node tools/audit.mjs`. The audit covers the
   console, reveals, `will-change`, overflow, both interactions, the keyboard,
   focus rings, reduced motion and JavaScript-disabled, at all three widths.
   **It is not a substitute for opening the page** — it cannot tell you whether
   something looks right, and it has nothing to say about a screen reader.
7. **Summarise** — report what changed, what was verified, and what was left
   out and why.

---

## 7. The remaining boundary

Phase 4 read the product source and cleared most of the old boundary. What is
left is narrower and none of it is an engineering decision.

### The distinction that governs every trust claim

This is the rule Phase 4 added, and it is the one that unblocked `/trust`:

> **A claim about what the software COMPUTES AND SHOWS is a mechanism claim, and
> is permitted. A claim about the OUTCOME is not, and needs named legal
> sign-off.**
>
> "We read the job description for exclusionary language and hold no demographic
> data" is the first kind. "Fair by design" is the second.

Outcome words, banned in visible copy site-wide and checked by
`tools/check.mjs`: *bias-free · fair by design · enterprise-grade · fully
compliant*. Also avoid, without sign-off: *compliant · defensible · auditable ·
unbiased · secure*. `/trust` may not use any of them, and the one place they
appear is the list of claims we refuse to make — which is marked
`data-claims="negated"` so the check exempts it and a reader can see why.

### Do not, without the named input

- **publish pricing** — `/pricing/` publishes the *shape* and no number. There is
  nothing to bill with; a range invented to look qualified is a commitment made
  by a marketing page.
- **invent a skill-graph edge** — use the nine relationship types in
  `SkillRelationType` and the five in `JobRelationType`, and no others.
  `docs/phase-4.md` § 1.2 lists them. The three worked examples the narrative
  depends on stay as they are.
- **draw the browser extension** — the sourcing agent's interface *is* built
  and specified in `docs/phase-4.md` § 1.5; depict it from that. The Chrome
  extension is shown on `/product/sourcing` as a **screenshot** of the running
  extension (28 Sep 2026), with its copy read off `transpahire-source-extension`.
  It is still not *drawn*: to show more of it, recapture it, do not compose it.
- **display an analytics figure** without labelling it an example.
  `/product/analytics/` labels every one.
- **open the site to indexing** — `docs/content-integrity.md` § 5, every box.
  Four legal drafts and the `/about` founder paragraph's sign-off are on that list.
- **publish the "148,000+ cities" figure** — it appears in
  `product-overview.md` and could not be found in the source. The alias
  behaviour (Bangalore/Bengaluru, Bombay/Mumbai) is real and can be described
  without a count.
- **restore** the stats strip, the testimonial, the demo video block, the nine
  "coming soon" cards, a features bento, the *invented* employer-reputation
  card, or the comparison table. Employer reviews are now sourced — the
  verified-application gate, moderation and right of reply are real — so a page
  describing the shipped feature is permitted; the old invented card is not.
- **ship a `[COUNSEL]` or `[CONFIRM]` marker as final copy.** Both are visible on
  the page on purpose. Grep for them.

`docs/phase-4.md` § 9 lists every outstanding input with its owner.

## 8. Documentation map

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file. Permanent rules. |
| `DESIGN.md` | The design system: brand, colour, type, space, layout, motion, responsive. |
| `docs/architecture.md` | Stack decision, file structure, migration strategy. |
| `docs/motion-system.md` | Motion primitives, timing rationale, usage rules. |
| `docs/components.md` | Component inventory and when to use each. |
| `docs/product-visualization.md` | Rules for product mockups and the frame system. |
| `docs/content-integrity.md` | Content classification and the current inventory. |
| `docs/audit.md` | Phase 1 findings: project audit, Myniq analysis, blend strategy. |
| `docs/phase-2.md` | The Phase 2 brief: what was needed before the site could be designed. |
| `docs/phase-3.md` | Phase 3 output: what was built, and every deviation from that plan. |
| `docs/phase-4.md` | **Phase 4. § 1 is the site's fact sheet and the first thing to read.** Then § 5 onward for the plan that was executed, and § 9 for what is still blocked. |
| `docs/phase-5.md` | **Phase 5. § 2 is § 1's delta — read it second.** § 3 is the hero rebuild and the width rule that came out of it, § 4 the conversion work, § 9 what is still blocked and on whom. |
| `prototypes/STAGE-3.md` | **The approved landing page.** § 6–9 are the page's architecture, interaction, motion and responsive decisions; the production handoff at the end is what `src/pages/home.mjs` implements. |
| `STAGE-4-IMPLEMENTATION.md` | **Phase 6.** How the prototype became production: files, components, data, the deviation log, and how the two product decisions were settled (§ 12). |
| `docs/glossary.md` | The vocabulary the site inherits from the product's copy layer, the words it bans, and the three permitted deviations with their reason. |
| `docs/phase-2/` | **Phase 2 output.** Strategy, IA, homepage blueprint, storyboards, visualisation and motion specs, messaging, content requirements, Phase 3 plan. Start at its `README.md`. |
| `motion-lab.html` | Live, internal reference for every motion primitive. |
