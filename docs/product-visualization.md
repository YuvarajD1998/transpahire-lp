# Product visualisation

How Transpahire's product is shown on the marketing site.

**Phase 1** built the architecture and the rules and no product visuals.
**Phase 3** built eight compositions from confirmed product fields, and still no
screenshots — see § 2b. Nothing on this site depicts a screen the product does
not have, and three things are withheld on purpose
(`docs/content-integrity.md § 6`).

---

## 1. The principle

A marketing site for a product that claims to *show its work* has to show its
work. Screenshots are the highest-conviction content this site can carry, and
they are the content it currently has none of.

Two failure modes to avoid, in order of severity:

1. **Fabricating product UI.** A beautifully rendered dashboard showing scores
   and candidates that do not correspond to anything the product does is a lie
   with a design budget. It is also a trap: it sets expectations the product
   then has to meet.
2. **A meaningless mockup.** A frame containing generic bars and circles
   signals "we have a product" without saying anything about it. It costs
   attention and returns nothing.

The placeholders in this codebase deliberately look like placeholders — graph
paper, a mono tag saying what will go there. That is honest, and it means
nobody can mistake a stand-in for a screenshot.

---

## 2. The frame system

Everything product-related lives inside `.frame`: a restrained window chrome
plus a content slot.

```html
<div class="frame frame--elevated" style="--ratio: 16 / 9">
  <div class="frame__chrome">
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__meta">app.transpahire.com / candidates</span>
  </div>
  <div class="frame__body">
    <!-- one of: placeholder · img · video · composed HTML mockup -->
  </div>
</div>
```

Why a frame at all: chrome makes a rectangle read as *software* rather than as
an illustration, and the `__meta` line does real work — a route like
`app.transpahire.com / candidates` tells the reader where in the product they
are looking without a caption.

### `--ratio` is mandatory

```html
<div class="frame" style="--ratio: 16 / 9">
```

The slot reserves its box before anything loads. This is the site's main
defence against layout shift and it **must survive the swap to real media** —
the single most likely regression when Phase 2 drops screenshots in.

Available: `16/9` (dashboards, video) · `16/10` (segment panels) · `4/3` (the
hero) · `21/9` (wide strips) · `1/1` · `3/4` (mobile views).

### Modifiers

| | Use |
|---|---|
| `--elevated` | Hero, tab panels — a surface above the page |
| `--float` | A composition lifted well out of the page |
| `--ink` | On a dark section ground |

### Slots

**Placeholder** (current state everywhere) — graph paper plus a mono tag:

```html
<div class="frame__body">
  <div class="frame__placeholder">
    <span class="frame__tag"><span class="frame__tag-kind">image</span>Score breakdown panel</span>
  </div>
</div>
```

The tag text should describe what will go there specifically enough to be
actionable: "Score breakdown panel", not "product screenshot".

**Image:**

```html
<div class="frame__body">
  <img src="assets/product/candidate-dashboard.avif"
       alt="Candidate list ranked by match score, each row showing skill coverage"
       width="1600" height="900" loading="lazy" decoding="async">
</div>
```

**Video:**

```html
<div class="frame__body">
  <video controls playsinline preload="none"
         poster="assets/videos/demo-poster.avif" width="1600" height="900">
    <source src="assets/videos/demo.webm" type="video/webm">
    <source src="assets/videos/demo.mp4" type="video/mp4">
    <track kind="captions" src="assets/videos/demo.vtt" srclang="en" label="English" default>
  </video>
</div>
```

Captions are not optional. Never autoplay with sound. `preload="none"` keeps a
demo video off the critical path.

**Composed HTML mockup** — real markup styled with site tokens. The most work
and the best result: crisp at every density, themeable, animatable per element,
searchable, and it cannot drift stylistically from the rest of the page. Use
for anything that needs to animate internally.

---

## 2b. What Phase 3 built

**Phase 1 built the frame system and no product visuals. Phase 3 built eight
compositions and still no screenshots.** That distinction is the whole of this
section, and it is deliberate on one side and a gap on the other. § 2c records
what Phase 4 changed; the inventory below is Phase 3's and is kept because the
reasoning in it still holds.

### The eight, all composed HTML

| | Composition | Where |
|---|---|---|
| C1 | Ranked candidate list | § 01 crop, § 05 full, § 08 live; four other pages |
| C2 | Explanation panel ★ | § 01 crop, § 06 full interactive; three other pages |
| C3 | Skill relationship graph ★ | § 07; `/product/matching` |
| C4 | Importance controls and what-if ★ | § 08; `/product/matching` |
| C5 | Requisition and dual-mode search | § 04; three other pages |
| C7 | Pipeline | § 09; two other pages |
| C8 | Candidate match view | § 10; two other pages |
| C10 | Résumé quality and skill gaps | § 10; three other pages |

C6 (the sourcing agent) is **not built** — see § 6. C9 was withdrawn.

Rendered by `src/lib/compositions.mjs` at build time, from
`assets/data/product-demo.js`. **They are never hand-written and never rendered
in the browser.** Building them at authoring time is what makes them work with
JavaScript disabled; reading them from one data module is what makes `87` the
same number on all ten pages.

### Why composed HTML rather than images, in retrospect

`§ 2` called composed HTML "the default, not a fallback". Three properties turned
out to matter more than expected:

1. **Six of the eight animate internally**, which rules out an image on its own.
2. **Two of them are operable.** The claim in section 06 is *you can inspect
   this*; a static image makes that claim without honouring it, and section 08's
   claim is *you can change this*, which an image cannot even gesture at.
3. **Zero requests.** Eight compositions across ten pages add no network
   requests, no CLS risk beyond the reserved ratio, and nothing to re-export when
   a token changes.

The cost is real and worth stating: this is more markup than a screenshot, it has
to be kept accurate by hand as the product changes, and it can drift from the
product without anyone noticing — which a screenshot cannot. That is the argument
for R8 below, not against the compositions.

### `--ratio` on a composition

`--ratio` exists to reserve a box before media loads. Composed HTML has nothing
to load, so `.frame__body--content` treats the authored ratio as a reserved
**minimum**: a spacer holds the box open and the composition grows past it when
its content is taller.

**`--ratio` is still declared on every frame**, and it must stay declared. It is
the property that has to survive the swap to real media, it is named in
`docs/phase-2.md § 4` as one of the two things most likely to be lost, and
`tools/check.mjs` fails the build if a frame appears without one.

### Still zero screenshots

The rule in `06 § 4` stands: **the site needs at least one real screenshot in the
evaluation path.** Eight compositions and zero screenshots reads as a product
that does not exist, and no amount of composed HTML fixes that — a composition
proves the design team understands the product, and a screenshot proves the
product is there.

Three labelled slots are waiting, with their ratios already declared, so dropping
an image in shifts nothing:

| Page | Slot | Best candidate |
|---|---|---|
| `/product` | ~~`16 / 9`~~ **filled 28 Sep 2026** — the ratio now comes from the image (`1856 / 934`) | The running app: a job's ranked pool with the candidate drawer open |
| `/product/candidate-intelligence` | ~~`4 / 3`~~ **filled 28 Sep 2026** — cropped to the review dialog, so the ratio comes from the image (`866 / 874`) | The extraction review screen, with its confidence indicators |
| `/product/sourcing` | ~~`16 / 10`~~ **filled 28 Sep 2026** — the ratio now comes from the image (`1039 / 664`) | The browser extension over a résumé: page-kind pill, preview, one button |

---

## 2c. What changed in Phase 4

Twenty compositions, and **the screenshot count fell from six slots to two**,
because four of them were reserving space for surfaces the site could now build
honestly. `docs/phase-4.md` § 1 is what made that possible: the product was
under-documented in Phase 3 and it is not any more.

### Two allowances the Phase 3 rules did not have

**1 · Density is allowed.** Phase 3's compositions were deliberately sparse, and
the reason was epistemic rather than aesthetic: with the product
under-documented, every extra row was an extra chance to invent one. § 1 of the
Phase 4 document supplies the real labels, states and enums, so **a composition
may now carry a realistic number of rows, chips and states.**

This is not permission to fill space. The test is unchanged — can you name the
product surface each element comes from? — it is only that the answer is now
available more often.

**2 · A composition may show two panes.** The product's primary surface is a list
with a drawer open over it, and `jobWorkspace()` shows both. Phase 3's
implicit one-surface-per-frame rule was a consequence of cropping rather than a
principle, and cropping a two-pane surface to one pane misrepresents the
interaction the whole site is about.

The cap that replaces it: **two panes, not three**, and at 700px one of them
goes. A two-pane layout at phone width is two unreadable panes.

**PHASE 5 CORRECTION.** "At 700px one of them goes" was implemented by hiding the
list, which made the drawer the whole composition on a phone. `jobWorkspace()`
stacks instead: below `--bp-xl` the drawer becomes a sheet beneath the list, so
both panes get the full frame width and nothing is dropped. Hiding a pane was the
right call when the hidden pane was a three-track strip; it is the wrong call now
that the list is the denser of the two.

### The rule Phase 5 added, and it is the most general one here

> **A composition's width is a design input, not a consequence.**
> **If a layout forces `display: none` on a row track, the layout is wrong.**

Phase 4 put the product's real primary surface in the hero and it still came out
thin. The diagnosis was mechanical and it is worth reproducing, because the
failure is invisible from inside the composition:

`matchesWorkspace()` sat in `.split--lead`'s visual column — about 48% of a
1280px container, so roughly **560px**. A job workspace does not fit in 560px,
and the CSS admitted it:

```css
.workspace__list .rank__row--tracked .pill--stage,
.workspace__list .rank__row--tracked .ring,
.workspace__list .rank__origin { display: none; }
```

Three of five tracks off, in every row, with a comment explaining that the drawer
covered them and they had nowhere to go. **That comment was true and it was a
symptom.** The composition had been designed to fit a column nobody had chosen
for it, and the visible result was that the first screen of the site showed six
names and one panel in front of an application with five job tabs, a tabbed
drawer, a pulse strip it calls its own signature and a parser that escalates
rather than guesses.

The recurrence this rule prevents is specific: **adding content to a composition
that is too narrow pushes more of it behind `display: none`.** So the order of
work is fixed — decide the composition's width first, from what the composition
has to show, and let the page layout follow. `docs/phase-5.md` § 3 did it in that
order and the three rules above were deleted rather than worked around.

Two corollaries worth having:

- **A responsive `display: none` is a different thing from a layout one.** At
  390px the workspace list scrolls horizontally *inside itself* rather than
  dropping tracks, because the constraint there is the device. Dropping a track
  because a sibling covers it is the defect; dropping one because the viewport is
  390px wide is a decision — and even then, a scroll is usually available and
  better.
- **Check the frame's rendered height, not just its `--ratio`.** `--ratio` is a
  reserved minimum for composed HTML, so a composition whose content is taller
  simply grows — and a drawer allowed to size its own grid row took the hero frame
  to ~1250px and pushed the copy column off the screen. Neither `tools/check.mjs`
  nor the audit's overflow checks could see it. Opening the page found it in four
  seconds, which is `CLAUDE.md` § 6 step 6 earning its place.

### The rule Phase 4 added, and it is general

> **Ordinal data gets an ordered bar, never a ring.**

The product rejected a donut for its score distribution, and the reason is worth
reproducing rather than paraphrasing:

> *"A ring has no beginning, so 'strong' and 'weak' read as two peer slices
> rather than the two ends of a scale."*

So `poolBands()` is one ordered stacked bar, and so is `scoreModel()`'s weight
bar. Two corollaries that come with it:

- **A stacked bar's segments must sum to its stated whole.** The four score bands
  sum to the pool total by construction. Candidates the critical gate dropped sit
  *outside* the bar with their own line, because they were never scored, and
  folding them into the lowest band would be the one place on the page where a
  chart lied.
- **A magnitude and a multiplier are different shapes.** The four weighted
  dimensions are bar segments; the three modifiers are a text row. A modifier
  drawn as a bar reads as a fifth dimension, which is precisely the defect that
  cost the site a phase.

### And one deviation from the Phase 4 plan, recorded

`docs/phase-4.md` sketches several compositions with invented names and figures —
a hero with five people at 84, 71, 68, 54 and 41; a skills-unlock panel at 14, 9
and 6. **Every one of them was built with the data module's own values instead.**
The rule at the top of `product-demo.js` beats a sketch in a plan: one value,
typed once, read everywhere. A hero showing 84 while five other pages show 87 is
the most visible possible defect, and it is the specific thing the data module
exists to prevent.

## 3. Visual rules for mockups

1. **Use the site's tokens.** A mockup with its own greys will look wrong beside
   a real screenshot and wrong beside the page.
2. **Match the product's real density.** Marketing mockups that are twice as
   airy as the product read as dishonest the first time someone sees a demo.
3. **One focal point.** A mockup exists to show *one* thing. If it shows three,
   crop it to one and use three frames.
4. **Crop rather than shrink.** A full dashboard scaled to 600px wide is
   unreadable. Crop to the region that carries the point.
5. **Plausible data.** Names, roles and numbers should look like real hiring
   data — but see § 6 on privacy and on numbers.
6. **No frame without content.** A frame with nothing to show is worse than no
   frame.

---

## 4. Motion for product visuals

Rule 3 of the motion system: product visualisations may be more expressive than
text — and only they may. **One expressive primitive per composition.**

| Primitive | Communicates | Constraint |
|---|---|---|
| `data-reveal="rise"` | This is a substantial object | The default entrance for any frame |
| `.float` | This is a live surface | Max two per viewport |
| `data-parallax="0.02"` | Depth | Capped ±40px; off on touch |
| `data-layers` | These parts assemble in this order | The one that carries information |

`data-layers` was the foundation the Phase 3 primitives were built on. **Four
more now exist** — P1 meter fill, P2 sequenced beats, P3 list reorder, P4 path
draw — documented in `docs/motion-system.md § 3`, each with a cap. P4 is a
bounded exception to the transform/opacity/filter rule and is recorded as one.

The original target sequence —

```
Dashboard → metric updates → candidate card appears → signal changes → recommendation appears
```

— is a layer reveal driven by real product states. Demonstrated generically in
`motion-lab.html` § 4.

---

## 5. What Phase 2 needs to support

The architecture is built to carry these without structural change. **None are
implemented**, because each depends on knowing the real product:

- Dashboard overview · candidate profile · job view · search experience
- AI recommendation panel · candidate intelligence · sourcing workflow
- Recruiter and hiring-manager views · candidate-side views
- Workflow animations · browser and mobile frames · video · interactive demos

Where each will live:

```
assets/product/     Screenshots and exported mockups
assets/videos/      Demo video, posters, caption tracks
assets/images/      Marketing photography and illustration
```

If a visualisation needs internal animation, build it as a composed HTML
mockup — a `.frame` containing a `data-layers` stack of token-styled panels.
That combination is why both primitives exist.

---

## 6. Integrity

Per `docs/content-integrity.md` — product visuals make claims as loudly as copy:

- **Never invent product UI.** If the screen does not exist, use a placeholder.
- **Never show a metric in a mockup that is not real.** A dashboard reading
  "94% match accuracy" is a fabricated metric wearing a screenshot.
- **Never show a real customer's data**, real candidate names, or a real
  company logo without written permission. Use invented people and invented
  companies, and keep them obviously invented.
- **Never imply an integration** by putting a third-party logo in a mockup.
- A mockup showing a feature that is planned rather than shipped must carry the
  same "Coming soon" treatment the copy does.

---

## 7. Performance

- AVIF or WebP with a JPEG fallback via `<picture>`; PNG only for hard-edged UI
  that artefacts badly.
- Always set `width` and `height` — belt and braces alongside `--ratio`.
- `loading="lazy" decoding="async"` below the fold. The hero image gets
  `fetchpriority="high"` and **no** lazy attribute.
- Serve at 2× the rendered size, no more. A 3000px-wide dashboard in a 600px
  slot is wasted bytes.
- `preload="none"` on video; never autoplay a demo.
- Composed HTML mockups cost no request at all — prefer them for small
  compositions.
