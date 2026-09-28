# Phase 3 — what was built

The implementation of `docs/phase-2/11-PHASE_3_PLAN.md`. This document records
what exists, every place the build deviated from the plan and why, and what is
still outstanding.

Read `docs/phase-2/` for the specification. This is the delta.

---

## 1. Status against the plan

| | Phase | State |
|---|---|---|
| 3.1 | Migrate to Astro | **Not done — deliberately.** `docs/architecture.md § 1b` |
| 3.2 | Motion primitives P1–P4 | **Done.** All four, with lab swatches and docs entries |
| 3.3 | Shared data module | **Done.** `assets/data/product-demo.js` |
| 3.4 | C2, then C1 | **Done.** The panel at full size first, then cropped for the hero |
| 3.5 | The § 06 sequence | **Done.** `07 § 4`'s beat table verbatim, plus the candidate switcher |
| 3.6 | § 08 Control | **Done.** P3 reorder, C4, the what-if, 64 precomputed rankings |
| 3.7 | The rest of the homepage | **Done.** All twelve sections |
| 3.8 | § 07 Adjacency | **Done.** P4, C3, and the payoff beat |
| 3.9 | `/product/matching`, then `/product` | **Done** |
| 3.10 | `/for-candidates` | **Done** |
| 3.11 | `/product/sourcing`, `/for-teams`, `/product/candidate-intelligence`, `/about`, `/demo` | **Done** |
| 3.12 | Legal | **Pending notices, not documents.** Blocks launch, not build |
| 3.13 | The indexing gate | **Five items closed, eight open.** `docs/content-integrity.md § 5` |

**Twelve pages ship.** `/for-teams/hiring-managers` is the plan's own first
post-launch addition and is not built; its story is served by `/product/matching`
and the hiring-manager section of `/for-teams`, which is what `04 § 3` says to do
at launch.

Eight compositions: C1, C2, C3, C4, C5, C7, C8, C10. C6 is deferred and C9 was
withdrawn, both per specification.

---

## 2. Deviations, and why

Seven. Each one is a place where following the plan literally would have produced
a worse result, and each is recorded so it can be argued with.

### 2.1 The Astro migration was not done first

**Plan:** § 3 sequences it first, before page content.
**Built:** a zero-dependency Node generator under `tools/`, writing committed
static HTML.

Full reasoning in `docs/architecture.md § 1b`. The short version: both migration
triggers fired and had to be answered, but the migration itself produces nothing
a visitor can see, and the risk it was avoiding — porting ten hand-written pages
twice — is avoided just as well by never hand-writing them. The port from here is
cheaper than it would have been from nothing, and it now has a pass/fail criterion
(`tools/check.mjs` and `tools/audit.mjs` run against the output) rather than an
eyeball.

The dependency count is still zero. There is no `package.json`, no lockfile and
no `node_modules`.

### 2.2 `87`, not `92`

`05 § 2` describes the hero and § 06 compositions with a score of `92`. Every
other document uses `87`, and `08 § 1` names `87` explicitly as the value that
"appears in sections 01, 05, 06, 08 and 10" — the sentence the whole data module
exists to honour. `09 § 3` builds a headline on it: *"It's the same
eighty-seven."*

The site uses **87**, once, from `assets/data/product-demo.js`.

Worth noticing: this divergence had already happened *inside the specification*,
between two documents written days apart, before a line of the page existed. That
is the argument for the data module in one observation.

### 2.3 No `containerd` in the skill graph

`08 § 4`'s ASCII sketch shows `Docker ── similar to ── containerd`. The same
section's rule forbids it: only three edges are confirmed, and "an invented edge
is an invented capability — this is the one place where a plausible-looking
addition would be a fabrication."

The sketch loses. The built diagram draws the confirmed Docker→Kubernetes edge,
and its secondary edge is the confirmed React→Vue relationship — which also
demonstrates the second relationship *type*, and the type is the capability being
claimed.

### 2.4 P2 uses absolute beats at any depth

`07 § 5` proposes extending `data-layers` with `data-layer-delay="200"`, additive,
on direct children. Built as `data-sequence` + `data-beat="1400"`, absolute, at
any depth. Both reasons are in `docs/motion-system.md § 3` under P2: an absolute
storyboard expressed as relative offsets drifts when one beat is edited, and the
explanation panel's beats sit three levels down, so a direct-children-only
mechanism would have forced the panel's structure to follow the animation.

### 2.5 The § 06 panel's live region is one atomic element

`07 § 3` asks for `aria-live="polite"` on the panel so a switch is announced once
rather than field by field. A live region on the panel does the opposite — it
announces every changed node. Built as a single atomic `.sr-only` summary inside
a labelled group. Same contract, one announcement.

### 2.6 § 05's mobile variant keeps all six rows

`05 § 4` says four rows at 390px, not eight. Built with all six, dropping the
coverage triplet and tightening the row instead.

Hiding two rows would have left the list's `.sr-only` summary claiming six
candidates while a sighted reader saw four, and the summary cannot vary by
viewport. The intent behind "four rows" is that the staggered sequence should not
outlast the reader's patience; that is met by the row density and the `fast`
stagger. If the row count matters more than the mismatch, the fix is a
JavaScript-set summary, not a CSS `display: none`.

### 2.7 § 12 ships with no fine print

`05 § 2` requires the fine print to contain only verifiable facts. Nothing
currently qualifies: *"no credit card required"* implies a self-serve path that
does not exist, and *"setup in under 10 minutes"* is an unsourced measurable
claim. An empty line beats an unsourced one, so the element is absent rather than
filled.

---

## 3. What the plan asked for that is genuinely missing

Not deviations — gaps, with owners.

| | What | Owner | Blocks |
|---|---|---|---|
| **R4** | Real AI narratives from the live engine, with their signal values | Product | Nothing. § 06 works; R4 is what makes it *good*. The narratives on the site are written to the Overview's standard and marked provisional |
| **R5** | Five field/label confirmations | Product | Nothing. One conversation |
| **R8** | One real screenshot | Product + Design | Nothing structurally, and everything in terms of conviction. Three labelled slots are waiting with their ratios declared |
| **R3** | Legal sign-off on the trust claims | Legal | § 11's fifth beat, and a `/responsible-ai` page that should probably never exist |
| **R13** | `og:image` | Design | Indexing |
| **R15/16** | What a demo is; product stage | Business | The `/demo` form's wiring, and whether the CTA reads *Book a demo* or *Get early access* |
| **R17/18** | Company details; social accounts | Business | The footer. Social icons are deleted rather than left dead |
| **R19** | The three legal documents | Legal | **Launch** |
| **R20** | Legal reading of the AI-screening comparison row | Legal | The comparison table's third column, which ships absent |

The pattern is worth stating: **nothing on this list is a product-capability
question.** Every open item is a business, legal or wording input. That is the
position `11 § 2` predicted once the Overview landed — one build track, with
content requests running alongside rather than in front of it.

---

## 4. Risks from `11 § 5`, and what happened

| Risk | Outcome |
|---|---|
| **R4 never arrives** | Live risk, unchanged. § 06 currently reads well and is not proof. The narratives are marked provisional in one file, so replacing them is a single edit |
| The three skill edges turn out to be prose | Live risk. The graph draws two of the three; if they are not real taxonomy relationships, the diagram needs three that are. The *capability* is confirmed, so it is a data request |
| Legal declines the trust claims | Already the plan. § 11 stops at four beats and reads better for it |
| **The a11y work is lost in the migration** | **Avoided** — there was no migration. And it is now checked rather than trusted: `tools/check.mjs` asserts one `<h1>`, no skipped heading levels, no duplicate ids, no dangling aria references, no dead links, and a label on every input; `tools/audit.mjs` tabs 39 stops looking for a missing focus ring |
| **`--ratio` dropped** | **Avoided and enforced.** Every frame declares one, and `tools/check.mjs` fails the build if the frame count and the ratio count disagree |
| **The `partial` state built as a third grey chip** | **Avoided.** It has its own glyph, its own colour, its own row, a ringed chip, the transfer line, and a beat 400ms clear of its neighbours. The audit asserts the transfer line reads *"Docker experience transfers"* |
| The what-if and unlock figures ship unlabelled | **Avoided.** Both carry a visible `.example-tag`, and the what-if adds a sentence saying no analytics values are published |
| Scope creep back toward feature cards | **Held.** Card grids on the homepage: one, § 02's three problem cards. The roadmap is four dashed cards on `/product` |
| No social proof at launch | Accepted, as specified. Product specificity substitutes. It remains the biggest conversion gap |
| Two interactive sections become four | **Held at two.** § 06's switcher and § 08's controls. `/for-teams` had a third and it was removed — it was a slider with no list to reorder |

---

## 5. How to check it

```bash
node tools/build.mjs      # writes the twelve pages and the sitemap
node tools/check.mjs      # structural checks over every built page
node tools/serve.mjs &    # the site needs a server: links are root-relative
node tools/audit.mjs      # drives headless Chrome over the built site
```

`tools/audit.mjs` is the interesting one. It checks, at 390 / 768 / 1440:

- zero console errors
- every `[data-reveal]`, group and sequence actually fires
- `will-change` released after settle, with one allowed exception (an on-screen
  parallax element, which releases the hint when it leaves the viewport)
- no horizontal overflow, ignoring the deliberate scroll containers
- no meter left at zero width

and then, once:

- the § 06 sequence lands all 18 beats, settles, and shows the partial with its
  transfer line
- the switcher changes the panel, keeps one button pressed, gives Priya two
  partials and Vikram a `Potential Match` chip, and announces the switch
- an importance change reorders the list, recounts the scores, reads out the tier
  **word**, and exposes no number in `aria-valuetext`
- the what-if counts 248 → 417 once and is labelled as an example
- the pool filter filters and updates its status line
- the nav menu is `inert` when closed, opens, closes on Escape, and returns focus
- 39 tab stops all show a focus ring
- under reduced motion: no beat hidden, no beat transformed, no empty meter, no
  undrawn edge, no float animating — and **both interactions still work**
- with JavaScript disabled: every composition's content is present on four pages

**Four defects were found this way and fixed**, all of which read as fine in a
browser at desktop width:

1. `.float` and `[data-parallax]` declared `will-change` permanently, which
   contradicts `docs/architecture.md § 4`'s own rule. The hint is now set by
   `parallax.js` only while an element is on screen.
2. The header was ~8px too wide at 390px, and a fixed header wider than the
   viewport makes the **whole document** scroll sideways — which is why the
   failure first pointed at a table three sections away.
3. `.example-tag` was `white-space: nowrap` around a 53-character sentence, which
   set a 422px minimum width on a 350px column. Single-column composition grids
   also lacked an explicit `minmax(0, 1fr)` track, so their content could widen
   them.
4. The classification chip was clipped inside the ranked list's 56px score column
   at 390px — leaving the score visible and its verdict cut off, which reads as
   more confidence than the product claimed.

---

## 6. What to build next

In this order, and none of it is blocked:

1. **Ask Product for R4 and R5.** R5 is a conversation; R4 is the difference
   between a convincing § 06 and a plausible one, and it is the item most likely
   to be deprioritised because it looks like copy and is actually product output.
2. **Get one screenshot.** Three slots are waiting. It is the highest-value
   single asset on the outstanding list.
3. **Wire `/demo`.** The page is complete and the form is deliberately inert.
4. **`/for-teams/hiring-managers`.** The whole story is confirmed and the
   components exist.
5. **Then, if a blog or a second content editor appears, migrate to Astro.**
   `docs/architecture.md § 1b` has the port, and the checks are the parity test.

What **not** to do is in `11 § 6`, and all of it still holds. The one worth
repeating: confirming that thirty-two features exist is an argument for *fewer*
sections, not more.
