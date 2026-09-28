# Transpahire — Stage 3

## Design consolidation, refinement and the final prototype

Written for: the Transpahire founder signing off the landing page, and the
engineer who implements it in production without reinterpreting it.

Date: 26 September 2026. Sources of truth, in order: the built Stage 2
prototypes (`prototypes/`), `STAGE-2.md`, the Stage 1 Design Intelligence
report. Nothing in production changed; `node tools/check.mjs` passes on all
twenty-four pages exactly as before.

**Run it:** `node tools/serve.mjs`, then open `http://localhost:4321/prototypes/`.
That is the final page. The Stage 2 board moved to
`http://localhost:4321/prototypes/stage-2.html`; every Stage 2 page still
builds and links back to both. Rebuild with `node prototypes/build.mjs`.

---

## 1 — Stage 3 objective

Take Variation 02 (Product editorial), the Stage 2 recommendation, and make it
one page rather than a set of scenes: the same visual world throughout, every
transition with a reason, every interaction truthful, the hero leading into the
score and the score leading into the argument. Then write it down precisely
enough that production implementation is transcription, not interpretation.

Everything in this document was decided by opening the built page in headless
Chrome at 1440×900, 1280×800, 768×1024, 390×844 and 1920×1080, with and without
JavaScript, with reduced motion emulated, and by driving every control over the
DevTools protocol. Where a number appears, it was measured on the build, not
inferred from the source.

---

## 2 — Stage 2 decisions carried forward

These are foundations. None was reopened.

| Decision | Kept as |
|---|---|
| Product Editorial direction | The A3 hero (workspace edge to edge, one route line), editorial type, real compositions |
| Eight-scene architecture, three tempos | 01 claim · 02 score · 03 problem · 04 pool · 05 argument · 06 control · 07 system · 08 close; statement → demonstration → reflection |
| Grounds | paper · paper · ink · bone · paper · paper · ink · ink→indigo |
| Evidence-driven storytelling, real product UI, real data | Every value from `assets/data/product-demo.js`; every composition a production renderer or a staging of one |
| Editorial typography, warm paper / ink / indigo, the highlighter on cited lines only | `proto-tokens.css` unchanged |
| Score transparency and "87 becomes four bars" | The signature's final mapping, § 8 |
| Unpinned tuner | § 7: sticky control column, no scroll track |
| Reduced-motion fallback, the stack as a composition | Verified again at 1440 and 390, with and without JavaScript |
| Mobile-first composition | 390 re-verified scene by scene; § 9 |
| The proposed ranking fixture | Kept, and now labelled on the page as a product decision; § 12 |

---

## 3 — Changes made

Each was found by looking, and each has one sentence of reason. The code lives
in `prototypes/lib/final.mjs` (the page), `prototypes/css/final.css` (the
consolidation layer, loaded on the final page only), `prototypes/css/signature.css`
§ FINAL and § TIMELINE, and `prototypes/js/scene.js`.

### The signature stage

1. **Two layers are never on screen together.** Stage 2's V2 and V3 mappings
   overlapped each layer's departure window with the next layer's arrival
   (0.46–0.53 against 0.48–0.55), so between states the weights and the skill
   rows were both half-visible on top of each other. The final mapping gives
   every boundary *t* a departure over [*t* − 0.055, *t*] and an arrival over
   [*t*, *t* + 0.055]. At *t* the stage holds one caption and, in states 4–5,
   the small 87. "Can I tell what changed?" is now structural.
2. **V3's one moment, in V2's mapping.** Between states 2 and 3 the 87 grows
   past its own size as it leaves (scale to 1.35 from an origin at 18% / 42%,
   where the numeral sits) and the weights layer arrives from above, its four
   bars growing out of zero and its rows fanning down. Skill rows in state 4
   arrive in order. Everything else is V2: rise 48px from 0.96 on arrival,
   recede 40px to 0.95 on departure; the unselected rows leave first in
   state 1.
3. **The persistent 87 shows in states 4 and 5 only.** State 3's own head is
   "87 = four weights, published", so a second 87 top-right was redundant
   there.
4. **Every layer is top-aligned.** Stage 2 centred each body in the stage, so
   the anchor moved between a tall list and a short ring. Caption then body,
   from the same y in every state.
5. **The final dwell is shorter.** The last layer arrives at 0.82–0.875 and
   holds to 1.0: about 180px of settle at 1440×900, not a hole.
6. **The clock is native where it can be.** `--p` is a registered custom
   property animated 0 → 1 by a `view()` scroll timeline over the stage's
   contain range, inset by the header; the listener detects support and stops
   writing `--p`, keeping only the rail and `data-state`. Without support the
   listener is the clock and nothing changes. Verified: the two agree to
   within a pixel at every sampled position (§ 11).
7. **The listener re-measures** on `load`, on `document.fonts.ready`, and on
   any document resize. Stage 2 measured once at start-up, before the fonts
   landed, and the rail ran ~30px ahead of the CSS.
8. **The head names the object.** A one-line lede under "The score, taken
   apart": "Sneha Iyer's row, from the screen above. Six layers of one
   object." The hero's secondary CTA, "See the working", now anchors to
   `#score` instead of leaving for the product page. The bridge is the
   button.
9. **Tighter above and below.** The scene's padding is the tight value both
   sides and the head's margin is halved, so the workspace, the head and the
   first layer read as one movement; the ink of scene 03 arrives one screen
   after the candidate's screen instead of two.

### The hero

10. **The first screen passes at 1280×800.** Stage 2's A3 put the first ranked
    row below the fold there. The head's top padding is header + 24px, the
    compact title is one step smaller, the bleed's margin and the route line's
    padding are tightened: at 1280×800 the first row sits at 716–779 with the
    drawer opening at 779; at 1440×900 the row sits at 770–833 with the
    drawer at 835.
11. **The pulse labels meet the 11px floor** everywhere. Production renders
    them at 9px; Stage 2's phone crop took them to 8px and recorded the
    exception. On the phone the strip is 2×2 at 11px. It costs one ranked row
    on the first 390 screen and keeps the system's floor.
12. **The bleed stops at 1600px.** At 1920 the workspace no longer runs edge to
    edge: it is centred with hairline sides and rounded top corners, because
    an 1,800px-wide ranked row is not a product screen.

### The rest of the page

13. **The tuner has no pin.** The control column is sticky beside the list;
    there is no scroll track and nothing costs scroll. (See § 7 for what
    "pinned" meant in the Stage 2 code.)
14. **A visible PRODUCT DECISION REQUIRED note** sits under the tuner, in the
    page, dashed and rose. § 12.
15. **The pool shows one cited line per row on the phone**, not two.
16. **The system scene's five beats are a single column** beside the
    candidate's dashboard, so the two columns end together instead of leaving
    400px of empty ink.
17. **Two ink scenes get an edge.** The close carries a hairline top border and
    the system scene's bottom padding is the tight value.
18. **The candidate's screen in the close hugs its content.** Stage 2 reserved
    a 4:5 box and left 200px of empty frame under the application trail.
19. **The close's secondary CTA is "What we will not claim" → `/trust/`.**
    After the whole argument, "See the working" pointed back at the product
    page; the honest close deserves the honest page.
20. **The tablet stage keeps its width.** Below 900px the rail is hidden and
    the layers span the container; at 768 the rail had cost the rows their
    name column.
21. **The phone stack breathes less.** Gaps between stacked layers drop from
    64px to 48px at 390.

---

## 4 — Changes deliberately NOT made

- **No new hero, no new scene, no new composition.** The brief's § 47 test was
  applied and Variation 02 passed it: nothing found was fundamental.
- **The stage's scroll length stays at 2.6 viewports.** Shortening it makes
  the six states too fast to read; the dwell was the problem, not the length.
- **V3's evidence-from-the-right, list-ghost and phone-rise were not
  borrowed.** Stage 2 took one thing from V3 and this stage held to that.
- **The scene copy is untouched**, including the two lines Stage 2 flagged
  as candidate wording (the eyebrow and "NN / 08"). Those are wording
  decisions, not design ones.
- **The hero's workspace remains inert and unlinked.** Stage 1 proposed the
  frame as a single link; it is a decision, and the secondary CTA now does the
  job of leading in.
- **No skill-review sheet, no live Filters / Describe switch.** Both are small
  modules that do not change the page's argument; they belong to production.
- **The candidate dashboard was not put behind the ledger on the phone.** It
  is the only place the candidate's side appears before the close, and hiding
  it to save 700px would take the "runs both ways" claim out of scene 07.
  The phone height target is therefore not met; § 9 says by how much.
- **Nothing about the data was fixed.** § 12.
- **The Stage 2 pages were not retuned.** Their windows still overlap and
  their listener still measures the old way; they are the reference for what
  was compared, not the page.

---

## 5 — Final visual system

Expressed as the Stage 2 token diff (`prototypes/css/proto-tokens.css`) plus
nothing: Stage 3 added no colour, no size and no face. If adopted, that file
becomes the diff for `assets/css/tokens.css`.

### Colours

| Role | Value | Rule |
|---|---|---|
| Paper | `#F7F6F2` | The reading ground: scenes 01, 02, 05, 06 |
| Bone | `#EFEDE7` | The secondary ground: scene 04; sunken surfaces |
| Raised | `#FFFFFF` | A verdict, a product surface, a source card |
| Ink | `#0B0B1F` | The statement ground: scenes 03, 07, 08 (08 runs into `#1E1B4B`) |
| Ink type on paper | `#1A1A2E` | Display and strong text |
| Body / muted | `#3A3A4C` / `#6B6B7D` | 10.3:1 and 4.8:1 on paper |
| Indigo | `#4F46E5` on paper, `#818CF8` for text on ink | The engine, the accent, the serif phrase |
| Highlighter | `#FFF1A8` | Cited profile lines only. Never a surface, never a hover |
| Hairlines | `#E3E1DA` / `#ECEAE3` | |
| State inks | ok `#146B45` · info `#4F46E5` · warn `#8A5F1E` · crit `#A32C3C` · none `#64647A` | Classification and skill states; colour is never the sole carrier |
| Actor chips | engine: indigo wash · human: ink outline | Who did the thing |

### Typography

| Role | Face | Size | Line height / tracking |
|---|---|---|---|
| Display (H1) | Space Grotesk 500 | 48 → 76px (compact hero) | 0.98 / −0.03em |
| Section (H2) | Space Grotesk 500 | 32 → 64px | 1.12 / −0.022em |
| Statement (scene 03) | Space Grotesk 500 | 36 → 72px | 1.04 |
| Layer key / H3 | Space Grotesk 500 | 22 → 30px | 1.12 |
| Accent | Instrument Serif italic, indigo | inherits | one `<em>` per headline, six on the page |
| Lede | Manrope 400 | 18 → 22px | 1.45 |
| Body | Manrope 400 | 15–16px | 1.55 |
| Data | JetBrains Mono, tabular | 13 → 15px | 0 |
| Label | JetBrains Mono, uppercase | 12px page · 11px floor inside compositions | +0.14em |

Paragraph measure: ledes 56–64ch, body 44–48ch, layer captions 64ch,
headlines 14–22ch.

### Layout

Container 1,280px; page padding 20 → 56px; a 200px rail column heads every
non-terminal scene ("NN / 08 · name") and the signature's stage; grid gap
40 → 80px; the 4px space ramp; section rhythm 64 → 128px with a tight value
of 48 → 80px and a huge one of 96 → 160px for the statement scene.

### Surfaces and depth

Depth is provenance: a verdict on raised white, its working on paper, the
source line in the highlighter. Frames carry a route line and no dots. The
hero has no frame at all.

---

## 6 — Final page architecture

| # | Scene | Ground | Tempo | Dominant object | Enters / leaves |
|---|---|---|---|---|---|
| 01 | The claim | paper | statement | The real job-detail workspace, edge to edge, drawer open on Sneha Iyer's 87 | Header → compact head → bleed; leaves on the composition note |
| 02 | The score | paper | demonstration | Six layers of one object on a pinned stage | Head with lede naming the row above; the stage; a tight exit |
| 03 | The problem | ink | reflection | One sentence at statement size | Hard cut in, hard cut out |
| 04 | The pool | bone | demonstration | The ranked list with truthful filters and cited evidence; the gate; the relationship rail | Ground change; sticky rail |
| 05 | The argument | paper | demonstration | The full explain panel in a frame, sequenced on reveal, with the switcher | Ground change; sticky switcher |
| 06 | The control | paper | demonstration | The tuner: sticky controls, the list, the gate; the decision note | Same ground; the head is the edge |
| 07 | The system | ink | reflection → demonstration | Sourcing console, market covered, the candidate's dashboard, five beats | Hard cut in |
| 08 | The close | ink → indigo | statement | The candidate's screen, the 87 at 208px, the ask | Hairline; gradient to the footer |

Density alternates: dense (01) · dense-then-single (02) · sparse (03) · dense
(04) · dense (05) · interactive (06) · dense-then-sparse (07) · sparse (08).
The sequence at 25% zoom reads as product, event, statement, product, product,
control, system, close.

---

## 7 — Final interaction system

| Element | Trigger | State | Result | Announced |
|---|---|---|---|---|
| Hero workspace | nothing | — | nothing; every control is a `<span>`; zero focus stops inside it | — |
| Hero "See the working" | click / Enter | — | scrolls to `#score` | — |
| Signature stage | scroll | `--p` 0 → 1, `data-state` 1 → 6 | layers arrive and leave; rail fills | each layer carries an sr-only sentence in reading order |
| Pool chips (all 47 · strong 14 · good 11) | click / Enter | pressed chip | rows hide; survivors FLIP (P3) | production |
| Candidate switcher | click / Enter | selected | panel re-renders, beats replay once | production |
| Tuner sliders (Python · Kubernetes · Kafka) | drag / arrow keys | tier 0–3, `aria-valuetext` = tier word | scores recount, rings redraw, rows FLIP, ▲/▼ for 1.8s | "Kubernetes set to critical. Rahul Verma now ranks first with 90 out of 100." |
| A skill at Critical | same | `is-gated` on rows missing it | those rows lose their score, read "Not scored · missing critical", drop last; the list head counts them | "… 5 candidates are not scored because they miss a critical skill." |
| What if · drop Kafka | change | checked | the example figure counts 248 → 417; five rows' ✗ count changes in green | "Dropping Kafka takes the example qualified pool from 248 to 417 …" |
| Show all three controls (phone only) | click | `aria-expanded` | two sliders and the what-if disclose | — |

**Verified on the built page over the DevTools protocol:** default order
c1 87 · c2 81 · c3 78 · c4 74 · c5 68 · c6 61. Kubernetes → critical: c2 90 ·
c1 87 · c3 78 · c5 77 · c4 74 · c6 61. Kafka → critical: c4 87 alone, five
gated, head reads "5 not scored · critical gate". What-if on: 417, five cells
changed. Strong filter: c1, c2. Switcher → Vikram Singh: panel shows Vikram
Singh.

**On "pinned".** The Stage 2 code had no scroll track for the tuner; its
`control--pinned` class only made the control column sticky. Stage 2 § 11 asked
for "the sticky column, no pin", and that is what the final page has: the
column stays beside the list while the list scrolls, and nothing holds the
page.

---

## 8 — Final motion system

One easing family, one direction of travel, only `transform` and `opacity`.
No loop, bounce, rotation, drift, cursor-following, typing, glow or blur.

### Micro — controls

| | Duration | Easing | Property | Reduced motion |
|---|---|---|---|---|
| Button / chip hover | 180ms | standard | background, colour; the arrow icon nudges 3px | instant |
| Press | 120ms | standard | scale 0.99 | none |
| Focus ring | 0 | — | outline | unchanged |

### Component — product surfaces

| | Duration | Easing | Property | Reduced motion |
|---|---|---|---|---|
| P5 hero drawer | 320ms after a 120ms delay, once, on first paint | entrance | translateX 24px → 0, opacity | drawer is simply open |
| P3 reorder (tuner, pool) | 320ms | standard | translateY (FLIP), then DOM order | DOM order only |
| Recount, ring redraw | 320ms | standard | text, stroke-dashoffset within the ring's cap | final value |
| ▲ / ▼ movement marker | shown 1.8s | 180ms fade | opacity | shown 1.8s |
| P2 beats (explain panel) | 820ms per beat, staggered by `--beat-delay` | entrance | translateY 16px → 0, opacity | all beats complete |

### Scene — section entrances

| | Duration | Easing | Property | Reduced motion |
|---|---|---|---|---|
| Reveal rise (compositions) | 820ms | entrance | translateY 64px → 0, scale 0.97 → 1, opacity | none |
| Reveal up (text, rails) | 620ms | entrance | translateY 28px → 0, opacity | none |
| Scene 03, 07 | 0 | — | hard cut | — |

Reveals are never used on the hero. The token layer collapses every duration
under `prefers-reduced-motion`, so no component can opt out.

### Signature — the score, taken apart

The scroll is the clock: `--p` runs 0 → 1 across a stage 2.6 viewports tall
whose sticky box is (viewport − header) tall with an 800px cap on the layer
area. Boundaries at 0.14 · 0.31 · 0.48 · 0.65 · 0.82; window 0.055.

| State | Arrives (--a 0 → 1) | Leaves (--d 0 → 1) |
|---|---|---|
| all | opacity a·(1−d); translateY (1−a)·48px − d·40px; scale 0.96 + a·0.04 − d·0.05; origin 50% 40% | |
| 1 list | already present | unselected rows fade with d; the selected row last |
| 2 score | as all | scale 0.96 + a·0.04 + d·0.35, origin 18% 42%: the 87 grows past itself |
| 3 weights | translateY (1−a)·−32px (from above); each bar scaleX(a); row i translateY (1−a)·(i·18 + 8)px | as all |
| 4 skills | row i opacity clamp(a·2.4 − i·0.28); translateX (1−a)·16px | as all |
| 5 evidence | as all | as all |
| 6 candidate | as all | holds to 1.0 |

The small 87 (`.sig__persist`) is visible in states 4 and 5. The rail marks
passed steps indigo and the current one ink. Reduced motion, a viewport under
700px wide or 620px tall, or no JavaScript: the stage is static and the six
layers stack in reading order with sticky captions; every layer renders
complete; nothing here applies.

---

## 9 — Responsive decisions

| Width | Hero first screen | Stage | Tuner | Page height |
|---|---|---|---|---|
| 1920×1080 | Head, route, job header, pulse, tabs, toolbar, four rows, drawer open; bleed capped at 1,600px | pinned, rail | sticky column | 13,533 |
| 1440×900 | Head, route, job header, pulse, tabs, toolbar, first row (770–833), drawer head at 835 | pinned, rail; track 1,440px | sticky column | 13,065 |
| 1280×800 | Same, first row at 716–779, drawer at 779 | pinned, rail; track 1,120px | sticky column | 12,594 |
| 768×1024 | Head, route, job header, pulse, tabs, toolbar, four rows with `Move to…` | pinned, no rail, full width | one column, nothing sticky | 15,885 |
| 390×844 | Headline, one sentence, one block CTA, route, job header, pulse 2×2 at 11px, tabs, first row (722–785), second row partly | stacked, 48px gaps | list first, one sticky control, "Show all three controls" | 17,726 |

Phone specifics, all verified in capture: rows are three tracks and nothing
scrolls sideways; the drawer follows the list as a cropped sheet ending on the
verdict; the score reads 87 → four bars → five skill rows → the highlighted
line → the candidate's card without anything becoming microscopic; the tuner
reorders in view with the Kubernetes control sticky under the header; the
close ends on a block CTA after the 87.

**The phone height target is not met.** Stage 2 asked for 14,000px and
measured Variation 02 at ~17,400. Stage 3 removed the second evidence line
(−245px), tightened the stack (−130px) and the pulse strip cost +40px; the
result is 17,726 because the pulse labels now meet the floor and the decision
note is on the page. The remaining lever Stage 2 named, the candidate dashboard
behind the ledger, was declined for the reason in § 4. Production should
decide whether 17.7k is acceptable or whether scene 07 loses the dashboard on
phones.

---

## 10 — Accessibility decisions

- One `<h1>`; H2 per scene; no skipped level (checked on the build).
- Zero focusable elements inside the hero workspace. Twenty-one focus stops
  precede the first CTA and every one is the production header's; that is a
  production decision, recorded here and not changed.
- Every layer of the signature carries an sr-only sentence, in reading order,
  and the static stack is the same markup; a screen reader hears the same
  argument in the same order whether or not the stage pins.
- The tuner's range inputs are 44px tall with 24px thumbs; `aria-valuetext`
  carries the tier word; a `role="status"` region announces the new first
  name and the gated count; the what-if has its own.
- Contrast: body 10.3:1, muted 4.8:1, the highlighter's ink type 15:1, indigo
  text on ink `#818CF8`. No text below 11px anywhere on the page.
- Focus rings are the production ring on every control; none removed.
- No information exists only inside motion: every state is a still, the
  captions say what each state is, the rail says where the visitor is.
- No-JavaScript: the page is the stack, the tuner shows the default order,
  the pool shows all rows, the panel shows Sneha Iyer. Verified at 13,686px.

---

## 11 — Performance decisions

- Only `transform` and `opacity` animate on the stage; the layers are
  absolutely positioned with `will-change: opacity, transform` while pinned
  and `auto` in the static routes. Six promoted layers is the cost of the
  signature; nothing else on the page is promoted at rest except production's
  reveal targets until they settle (35 elements at load, measured).
- The clock is a scroll timeline where supported (Chromium; Safari and Firefox
  behind flags at the time of writing) and one passive, rAF-throttled scroll
  listener elsewhere. Verified equal: at thirteen sampled positions the CSS
  `--p` and the listener's formula agree to four decimal places once the
  listener uses the same range (top − header, height − viewport).
- No layout property animates. The FLIP reorder measures once, translates,
  then reorders the DOM.
- No images; the fonts are the production set; no dependency; no build step
  in what is served.
- The bleed's cap and the layer area's cap bound the largest painted
  surfaces at 1,600px and 800px.
- Native timeline caveat: `view(block 64px 0px)` hard-codes the header height
  because `animation-timeline` cannot read a custom property. Production must
  keep that number equal to `--header-h`, and the listener's `header = 64`
  with it. `tools/check.mjs` should assert the three agree.

---

## 12 — Remaining product / data decisions

> **Settled 28 Sep 2026** against the product source: the gate is real (A) and
> `BANDS` is right (B). The proposed model is now `RANKINGS`, the note is off the
> page, and `STAGE-4-IMPLEMENTATION.md` § 12 records how. What follows is the
> question as it stood.

**PRODUCT DECISION REQUIRED — not a design decision.** The page carries this
note under the tuner on purpose; a note that only lives in a document gets
lost.

### A. The critical gate

- **What:** `RANKINGS` in `assets/data/product-demo.js`, authored by
  `tools/rankings.mjs`, scores candidates who miss a skill set to Critical.
  `CRITICAL_GATE` on the same page, and `docs/phase-4.md` § 1.1, say a
  candidate missing a critical skill never reaches the scorer.
- **Where it appears:** scene 06 (the tuner), scene 04 (the gate composition
  and the gate row), scene 02 state 3's last line.
- **Prototype behaviour:** the proposed fixture
  (`prototypes/lib/rankings-proposed.mjs`) gates them. The default combination
  reproduces the six published scores and words exactly.
- **Not claimed:** that the fixture's model is the product's. It is the
  product's *stated* model applied to invented candidates.

### B. The classification thresholds

- **What:** `BANDS` publishes Strong ≥ 72, Good ≥ 52, Potential ≥ 32. The six
  candidates ship at 78 and 74 as "Good", which those thresholds would call
  "Strong". The authoring bands (80 / 70 / 55) reproduce the shipped words.
- **Where it appears:** every ring and chip on the page: hero rows, the
  stage's states 1, 2 and 6, the pool, the tuner, the close.
- **Prototype behaviour:** the shipped words, from the authoring bands. No
  threshold is displayed anywhere.
- **Not claimed:** which set is right. One is; the source decides; it is a
  one-line data change either way and only `product-demo.js` and
  `tools/rankings.mjs` change.

### Also still owed, none of it engineering

The eyebrow wording ("Hiring platform · for talent teams"); the rail numbering
("NN / 08"); whether the hero frame may be a link; and everything in
`docs/phase-5.md` § 9 that blocks indexing.

---

## 13 — Production implementation notes

Where the prototype layer lands in production, file by file:

| Prototype | Production home |
|---|---|
| `css/proto-tokens.css` | The diff for `assets/css/tokens.css`; then deleted |
| `css/proto.css` scenes, heroes, tuner, phone crops; `css/final.css` | `assets/css/sections.css` (compositions) and `components.css` (`.wrow`, `.srow`, `.sig-*`, `.trow`, `.decision`) |
| `css/signature.css` | A P6 "staged layers" section in `assets/css/motion.css`, with its cap (one per page) and the `@supports` timeline block |
| `js/scene.js` | `assets/js/modules/scene.js`, registered from `main.js` |
| `js/tuner-proto.js` | Replaces `assets/js/modules/tuner.js` once the fixture is adopted |
| `lib/rankings-proposed.mjs` | `tools/rankings.mjs`, regenerating `RANKINGS` |
| `lib/parts.mjs` stagings | `src/lib/compositions.mjs` (the layers, the weight rows, the skill rows, the evidence card, the proposed tuner row) |
| `lib/final.mjs` | `src/pages/home.mjs` |
| `css/proto.css` § furniture, `lib/shell.mjs`, `lib/board.mjs` | Not ported |

`docs/motion-system.md` gains P6 with its lab-page demonstration before it is
used, per `CLAUDE.md` § 5; `motion-lab.html` gains the stage.

---

# PRODUCTION HANDOFF

Written for the implementing engineer. The prototype at `/prototypes/` is the
source of truth; where this text and the built page disagree, the page wins
and this text gets corrected.

## Page structure

Exact order inside `<main>`, after the production header:

1. `section#top.scene--claim.claim--a3` — eyebrow, H1 with one `<em>`, lede,
   two CTAs (`/demo/`, `#score`), then `.bleed` holding the route line, an
   sr-only H2, and `.workspace.workspace--bleed[data-drawer-reveal]` with
   `jobHeader()`, `pulseStrip()`, `tabStrip()`, `listToolbar()`,
   `rankedList({ids: POOL_ROWS, variant: 'tracked', selected: 'c1', move: true, gateRow: true})`,
   `drawerHead('c1')`, the five drawer tabs, `explainPanel('c1', {sequenced: false})`;
   then `compositionNote()`.
2. `section#score.scene--signature` — scene head (rail "02 / 08 · The score",
   H2 with `<em>`, the lede), `.sig.sig--pinned[data-signature][data-execution="final"][data-thresholds="0.14,0.31,0.48,0.65,0.82"]`
   containing `.sig__stage` → `.sig__persist` (a 38px ring), `.srail` (six
   items), `.sig__layers` (six `.layer.layer--N[data-layer]`, each a caption
   `.layer__cap` and a body); then the composition note.
3. `section#problem.scene--problem.on-ink` — rail line and one `.quote`.
4. `section#pool.scene--pool` — head; `.pool` grid: `.pool__list`
   (`rankedList({filters: true, evidence: true})` and `criticalGate()`) and
   the sticky `.pool__side` (relationship labels, edge types, the Docker →
   Kubernetes example).
5. `section#argument.scene--argument` — head with lede; `.argument` grid:
   sticky `switcher(['c1','c3','c6'])` with a note, and the framed
   `explainPanel({sequenced: true, showFooter: true})`.
6. `section#control.scene--control` — head with lede; the tuner
   (`control.control--proto.control--pinned`: sticky `.control__side` with
   three sliders, the actor hint, the what-if, the phone's show-all button;
   `.control__list` with `rank--proto`); the composition note; `.decision`.
7. `section#system.scene--system.on-ink` — head; `.system` grid:
   `missionConsole()`, `marketCovered()`, `candidateWorkspace()`, the five
   `.beat`s in one column.
8. `section#close.scene--close.on-ink` — rail line, H2 with `<em>`, the
   candidate view in `frame--ink` with `--ratio: auto`; `.close__ask`: the
   87 at `clamp(6rem, 4rem + 10vw, 13rem)`, the three-part line, H3, copy,
   CTAs (`/demo/`, `/trust/`), the two honest lines.

Then the production footer and email sign-up, unchanged.

## Components to make reusable

- `sceneHead({num, name, title, lede})` — the rail-numbered head.
- `weightRows(DIMENSIONS, {large})` — `.wrows` / `.wrow` with `--w` and `--i`.
- `skillRows(EXPLAIN[id])` — `.srows` / `.srow` in covered · partial · missing
  order with `--i`.
- `evidenceCard(match, edge)` — `.sig-evidence` with the highlighter `<mark>`.
- `candidateCard('c1')` — `.sig-cand`.
- `stageLayer(n, caption, body)` — `.layer` with the caption and the sr-only
  sentence.
- `signature({thresholds})` — the whole stage; one per page.
- `tunerRow(id)` — `.trow` with `[data-row-score]`, `[data-row-chip]`,
  `[data-row-sr]`, `[data-moved]`, `[data-gate]`.
- `decisionNote(items)` — `.decision`, for any PRODUCT DECISION REQUIRED.

## Data

Everything from `assets/data/product-demo.js`: `JOB`, `POOL_ROWS`,
`CANDIDATES`, `CLASSIFICATIONS`, `CONFIDENCE`, `DIMENSIONS`, `MODIFIERS`,
`CRITICAL_GATE`, `EXPLAIN`, `SKILL_EDGES`, `SKILL_STATES`, `REL_LABELS`,
`EDGE_TYPES`, `FIT_SPLIT`, `CANDIDATE_VIEW`, `TUNABLE`, `TIER_WORDS`,
`DEFAULT_COMBO`, `WHAT_IF`, `MISSION`, `MARKET_COVERED`, `PHILOSOPHY`.
The tuner reads a frozen lookup table of sixty-four orderings and does no
arithmetic in the browser. Until § 12 is settled, that table is the proposed
fixture and the decision note stays on the page.

## Interaction — trigger → state → result

See § 7; it is exact. Two additions for implementation:

- The scroll clock writes `--p` (four decimals) and `data-state` (1–6) to the
  stage, toggles `is-current` / `is-passed` on rail items, and sets
  `sig--static` when it must not pin (reduced motion, width < 700, height <
  620). It measures `top = stageTop − 64` and `track = stageHeight − viewport`
  on start, load, fonts ready, resize and document resize. Where
  `CSS.supports('animation-timeline: view()')`, it does not write `--p`.
- The tuner's announcement text is built from the ranking, never typed:
  `${skill} set to ${tier}. ${first} now ranks first with ${score} out of 100.`
  plus `${n} candidates are not scored because they miss a critical skill.`
  when `n > 0`.

## Motion

See § 8; it is exact. The mapping is CSS only, in `signature.css` § FINAL;
port it verbatim including the `--w` window, the boundaries, and the
`html.js … :not(.sig--static)` scoping. The `@property --p` declaration stays
at the top level (not inside `@supports`).

## Responsive

See § 9. Breakpoints are the production five: 520, 700, 900, 1100 and the
1,700 cap for the bleed. The rules that differ by width, all of them:

- ≤ 699: one CTA in the hero; pulse 2×2; toolbar hidden; three ranked rows in
  the hero; drawer as a sheet; stage stacked with 48px gaps; one evidence line
  per pool row; tuner list-first with one sticky control; scene numbers at
  micro size; the pool list and tuner list bleed to the edges.
- ≤ 899: scene heads single column; pool and argument single column; tuner
  single column with nothing sticky; stage pinned without the rail; system
  single column with the beats two-up; close single column.
- ≤ 1099: nothing specific to this page.
- ≥ 1700: the bleed caps at 1,600px with hairline sides and 14px top radius.

## Accessibility

See § 10. Required, not optional: no focusable element inside `.workspace`;
one H1; an sr-only sentence per stage layer; `aria-valuetext` on every slider;
`role="status"` regions for the tuner and the what-if; visible focus on every
control; every layer complete under reduced motion and without JavaScript.

## Performance

See § 11. Constraints: only `transform` and `opacity` on the stage; one
passive scroll listener; `will-change` on the six layers only while pinned;
no new dependency; no build step for what is served; the header inset in the
scroll timeline equals `--header-h`.

## Do-not-change rules

1. The eight scenes, their order, their grounds and their copy.
2. Six layers, in this order: list · score · weights · skills · evidence ·
   candidate. Never fewer.
3. Non-overlapping windows. If a production change makes two layers visible
   at once, it is wrong.
4. The 87 becomes the bars once, between states 2 and 3, and nowhere else.
5. The stage is a still in every state and stacks under reduced motion, under
   700px, under 620px tall, and without JavaScript.
6. The tuner has no scroll track. The control column may be sticky.
7. The hero is dense and inert: every control a `<span>`, zero focus stops.
8. The highlighter appears only on cited profile lines.
9. One serif accent per headline; six on the page; none in scenes 02 and 03.
10. The mono floor is 11px inside compositions and 12px on the page.
11. No threshold is displayed. No number is typed: every value is read from
    the data module, and the tuner's orderings come from a frozen table.
12. The PRODUCT DECISION REQUIRED note stays on the page until § 12 is
    settled by the product source, and is removed in the same commit that
    settles it.
13. Reveals never gate the hero; the drawer opens once on first paint.
14. No feature card grid, no logo wall, no testimonial, no statistic, no
    pricing figure, no screenshot until the inputs Phase 5 lists exist.

---

## Definition of done, checked

| Item | Status |
|---|---|
| One final landing page exists | `prototypes/index.html` |
| Variation 02 consolidated | § 3 |
| V3's score transition integrated | § 3.2, § 8 |
| Tuner remains unpinned | § 7 |
| Eight scenes feel like one experience | § 6; captures at five widths |
| Hero → score transition intentional | § 3.8–9 |
| Product UI authentic | every value from the data module; § 12 flags the two it cannot vouch for |
| Mobile deliberately designed | § 9 |
| Reduced motion works | verified 1440, 13,686px |
| Static fallback works | verified without JavaScript, 13,686px |
| No generic SaaS decoration | none found on the final sweep: no card grid, blob, particle, badge, pill run, glass, browser dots |
| Interaction behaviour truthful | § 7, driven and logged |
| Performance constraints documented | § 11 |
| Product / data inconsistencies flagged | § 12, and on the page |
| `STAGE-3.md` contains the production handoff | above |
| Production code untouched | `find` over the tree: only `prototypes/` changed; `tools/check.mjs` passes |
| Phone height target of 14,000px | **not met**: 17,726; § 9 says why and what would close it |
