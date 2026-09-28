# 07 — Motion storyboard

Motion and interaction per section, and the four primitives Phase 3 must add.

Read `docs/motion-system.md` first. Everything here is expressed in its
vocabulary; nothing here overrides its rules.

---

## 1. The budget

Motion is a budget, not a palette. Spending it evenly produces a page where
nothing stands out.

| Resource | Cap | Allocation |
|---|---|---|
| `data-reveal="blur"` | **3 per page** `motion-system.md § 3` | 01 H1 · 03 interlude quote · 11 philosophy statement |
| `.float` | **2 per viewport** `motion-system.md § 3` | 01 hero frame · 10 candidate frame (`--delayed`). Never two in one viewport |
| `data-parallax` | 0.02, three uses `motion-system.md § 3` | 04 requisition · 07 graph · 10 right-hand frame |
| Expressive product primitive | **1 per composition** `product-visualization.md § 4` | 05 `data-layers` · 06 `data-layers` · 07 path draw · 08 reorder |
| Interactive sections | **2** | 06 candidate switcher · 08 importance controls + what-if |
| SIGNATURE intensity | **4**, all confirmed | 06 · 07 · 08 · the 05→06 transition `[05 § 3]` |

---

## 2. Per-section motion

Intensity scale: **LOW** (reveals only) · **MEDIUM** (reveals + one product
primitive) · **HIGH** (sequenced product animation) · **SIGNATURE** (the section
someone remembers).

| § | Entrance | Product animation | Scroll | Interaction | Intensity |
|---|---|---|---|---|---|
| **01** Hero | `blur` H1, `up` lede, `up` CTA cluster, `rise` frame | `.float` on the frame. **No entrance sequence** — above-the-fold content reveals immediately without transition `motion-system.md § 5` | static | none | **MEDIUM** |
| **02** The gap | `up` on the head; `data-reveal-group data-stagger="normal"` on three cards; `scale` on the ink statement | none | reveal | none | **LOW** |
| **03** Interlude | `blur` on the quote | none | reveal | none | **LOW** |
| **04** The role | `left` on text, `right` on the frame — paired | Skill chips arrive as **four groups in importance order** — critical, required, preferred, bonus. The search control crossfades between filter and describe modes, once | `data-parallax="0.02"` | none | **MEDIUM** |
| **05** The pool | `rise` on the composition | `data-layers` on rows — arrive in **rank order**, 120ms apart. Scores count up, staggered with their row | reveal | optional classification-filter chips | **HIGH** |
| **06** The argument ★ | `fade` only on the container (it sits inside a transformed parent) | **The signature sequence — § 4** | reveal, fires once | **candidate switcher** | **SIGNATURE** |
| **07** Adjacency ★ | `up` on the head, `scale` on the diagram | Nodes arrive bottom-up, the relationship path draws (`stroke-dashoffset`), the label *requires* resolves on the edge, the candidate row slides from #9 to #1 in an abbreviated list | `data-parallax="0.02"` | node hover → relationship label | **SIGNATURE** |
| **08** Control ★ | `left` controls, `right` list | **Reorder on importance change** — rows translate to new positions, scores recount. Separately, the what-if toggle counts the pool figure `248 → 417` | reveal | **importance controls + what-if toggle** | **SIGNATURE** |
| **09** The hire | `up` head; `data-reveal-group data-stagger="slow"` on four steps | One card advances one stage column, **once**, on reveal | reveal | none | **LOW** |
| **10** Both sides | `left` / `right` on the two frames | `.float--delayed` on the candidate frame only. Skill-gap rows arrive as a group | `data-parallax="0.02"` on the right frame | none | **MEDIUM** |
| **11** Philosophy | `data-reveal-group data-stagger="slow"` on four beats, then `blur` on the statement | none | reveal | none | **LOW** |
| **12** CTA | `scale` on the block | none | reveal | none | **LOW** |

### Why no scroll-driven sequences, sticky sections or scrubbed timelines

The temptation in a page like this is to pin section 06 and scrub the explanation
sequence against scroll position. Rejected:

- It takes the animation's pacing away from the reader and gives it to their
  trackpad. The rationale paragraph needs to be *read*, and a scrubbed reveal
  makes reading a scroll-position problem.
- Sticky sections fight `scroll-padding-top` and the fixed 64px header
  `DESIGN.md § 5`.
- `docs/motion-system.md § 2` Rule 2 rejects "parallax you can notice". A pinned
  scrub is the most noticeable form there is.
- Reduced motion has no honest fallback for a scroll-scrubbed sequence — the
  content only exists at certain scroll offsets.

Reveal-once plus a real control is better on all four counts, and it is what the
existing system already supports.

---

## 3. Interaction inventory

Exactly two interactive product elements. Both are the *information*, not
decoration.

### 06 — Candidate switcher (the memorable interaction `[02 § 11]`)

```html
<div class="switcher" role="group" aria-label="Choose a candidate">
  <button type="button" class="chip is-active" data-candidate="c6" aria-pressed="true">Sneha Iyer</button>
  <button type="button" class="chip" data-candidate="c5" aria-pressed="false">Karan Mehta</button>
  <button type="button" class="chip" data-candidate="c7" aria-pressed="false">Vikram Singh</button>
</div>
```

- Real `<button>`s, never divs `docs/components.md § 3`.
- `aria-pressed` tracks state; the panel is `aria-live="polite"` so a switch is
  announced once, not field by field.
- Values come from the shared data module `[08 § 1]` — **precomputed, never a
  model**. Three candidates chosen so the outcomes differ meaningfully: Sneha
  (Strong, one partial, over-levelled, moderate drop-off risk), Priya (Good, two
  partials, salary alignment high, under-levelled but high potential), Vikram
  (Potential, two missing criticals, strong trajectory). The contrast is the
  lesson — one of the three is *not* a good hire and the panel says so.
- First interaction replays the full sequence; subsequent switches use a shorter
  320ms crossfade per field. Watching the same 2s build three times is tedious.
- Reduced motion: values swap instantly, no sequence, no crossfade.
- Focus ring is never removed `CLAUDE.md § 3`.

### 08 — Importance controls and what-if ★

```html
<label class="weight">
  <span class="label">Kubernetes</span>
  <input type="range" min="0" max="3" step="1" value="2"
         aria-valuetext="Kubernetes: required">
</label>
```

- **Four steps, using the product's own tiers** `[OVERVIEW]` § 3: *bonus ·
  preferred · required · critical*. `aria-valuetext` carries the tier word, never
  a number — the product does not expose a numeric weight and neither should the
  demo.
- Three controls: Python (critical), Kubernetes (required), Kafka (preferred).
  Kubernetes is the one worth moving, because it is the skill sections 06 and 07
  just explained.
- **Precomputed rankings for every combination.** Do not ship arithmetic that
  pretends to be the matching engine — a visitor who works out that the demo math
  is fake has learned the wrong thing about the product.
- Reordering: rows translate to new positions over 320ms on `--ease-standard`;
  scores recount via `data-count`. Reduced motion repositions with no transition.
- **The what-if is a separate control**, a single toggle (*drop Kafka*), with its
  own readout counting `248 → 417`. Keep it visually distinct from the importance
  sliders: tuning changes the *order*, simulation changes the *pool*, and
  conflating them loses both ideas. The figures must be labelled as an example
  `[10 § R5]`.

One non-interactive hover, in section 07: a skill node reveals its relationship
label. Hover-only, `aria-hidden` decoration on top of a diagram whose meaning is
already carried by the drawn path and its visible label — nothing is
hover-gated.

Everything else on the page is hover-only via existing classes: `.hover-lift` on
cards, `.hover-icon` + `.icon-shift` on buttons, `.hover-bg` on list rows,
`.press` on every button `docs/motion-system.md § 3`.

---

## 4. The signature sequence — section 06, frame by frame

One `data-layers` stack. Total 2,420ms from first paint of the panel. Every value
below is an existing token.

| t | Beat | Implementation | Communicates |
|---|---|---|---|
| 0 | Panel present | Revealed with the section, `fade` | — |
| 0 | Score starts counting | `data-count="87"` — integers, so **no `data-decimals` needed**; `counter.js` handles it as shipped | This is being computed, not displayed |
| 120 | Classification chip — *Strong Match* | layer 1 | A verdict, not just a number |
| 300 | Breakdown label | layer 2 | — |
| 420 | Skill coverage bar | `--meter` scaleX (**P1**), 620ms, `--ease-entrance` | The score has parts |
| 500 | Experience alignment | +80ms stagger | |
| 580 | Location preference | | …five of them |
| 660 | Salary alignment | | |
| 740 | Semantic similarity | | |
| 1000 | ✓ Covered chips | one group, `data-stagger="fast"` | Most of the requirement is met |
| **1400** | **≈ Partial chip, alone** | +200ms gap before it. Then at **1560**, the transfer line *"Docker experience transfers"* fades in beneath it | **This is the hinge.** Not covered, not missing — *understood.* It is the skill graph becoming visible, and it is the setup for section 07 |
| 1780 | ✗ Missing chip | | And this is genuinely absent |
| 1900 | + Bonus chips | group | And this is what they bring anyway |
| 2020 | The narrative | `fade`, as a **block**. No typewriter — see below | A person could have written this |
| **2420** | **The four signals** | +400ms pause, then `up` 16px as a 2×2 group | **Seniority, trajectory, potential, drop-off risk — what the CV does not say** |

Three beats carry the section, and two of them are pauses: the **partial** chip
arriving alone at 1400, and the signals arriving last at 2420. A sequence that
revealed everything on one 80ms stagger would contain the same information and
communicate nothing.

The 1400 beat is the single most important moment on the homepage. It is where a
visitor stops reading a feature list and understands the mechanism — and it is
why section 07 exists immediately afterwards to answer the question it provokes.

**No typewriter effect on the narrative.** It is 200+ characters; typing it costs
three seconds, cannot be read while it moves, breaks selection and copy, and
reads to assistive technology as a stream of partial words. `docs/motion-system.md`
Rule 1: name what it communicates. "A machine is typing" is not a claim this
product needs.

**Reduced motion:** the panel renders complete and static — score at `87`, five
bars at width, all four skill groups, the transfer line, the narrative and all
four signals present. Enforced at the token layer, so it is automatic — but verify
on `motion-lab.html` `CLAUDE.md § 5`.

### The 07 sequence, which continues it

Section 07 is deliberately the *answer* to 06's partial beat, so its sequence
starts where 06's ended:

| t | Beat |
|---|---|
| 0 | The requirement node — *Kubernetes* — arrives from above, `down` |
| 200 | The profile node — *Docker* — arrives from below, `up` |
| 400 | The path draws between them (**P4**), 620ms |
| 900 | The edge label *requires* resolves |
| 1100 | *similar to · containerd* draws as a secondary edge, dimmer |
| 1500 | The verdict line: **scored PARTIAL, not MISSING** |
| 1900 | The abbreviated ranked list appears and Sneha's row slides from #9 to #1 |

That last beat is the payoff — it converts an abstract diagram into a
consequence. Without it the section is a nice picture of a graph.

## 5. New primitives required

Four. Each needs a `motion-lab.html` swatch and a `docs/motion-system.md` entry
**before** use `docs/motion-system.md § 6`.

### P1 — `--meter` bar fill · REQUIRED
`transform: scaleX(0 → n)` with `transform-origin: left`, 620ms
`--ease-entrance`. Communicates: *this quantity has a magnitude relative to a
whole.* Used by the five breakdown dimensions in C2, the candidate-side dimensions
in C8, the résumé quality score in C10, and the coverage triplet in C1.
Transform-only, so it satisfies `CLAUDE.md § 3` rule 6. **The most reusable of the
four — build it first.**

### P2 — Sequenced layer reveal with per-child offsets · REQUIRED
`data-layers` gives a fixed 120ms cadence. Section 06 needs specific offsets at
specific beats (the 200ms and 400ms pauses are the entire point). Extend rather
than replace: `data-layer-delay="200"` on a child adds to its computed offset.
Communicates: *these parts assemble in this order, and this part is separate.*

### P3 — List reorder · REQUIRED
Measure, reorder, transform to new positions, 320ms `--ease-standard`. Absolute
positioning is not required — transforms on grid rows suffice. Communicates:
*your priorities changed the answer.* Skip on reduced motion (reposition
instantly). Used by section 08, and again by section 07's payoff beat, which makes
it more reusable than the pre-Overview plan assumed.

### P4 — Path draw · REQUIRED
`stroke-dashoffset` on an inline SVG path. **`stroke-dashoffset` is not in the
`transform`/`opacity`/`filter` allowlist** `CLAUDE.md § 3`. It is
compositor-friendly in practice on a handful of short paths, but this is a real
exception to a stated rule and needs to be recorded as one in
`docs/motion-system.md` — with a cap (six paths maximum) and a note that it is
permitted for this one primitive only. Communicates: *these two things are
connected, and here is the connection.* Used by section 07 and, optionally, by
`/product/matching`'s larger graph. It is the most expensive of the four and the
last to build `[11 § 3]`.

**Not needed:** decimal counting — the score is 0–100 integers `[00 § 2]`, so
`counter.js` works unmodified and the `data-decimals` attribute is not required
anywhere on the site; crossfade (tab crossfade covers the section-04 search-mode
switch); any spring physics (`docs/motion-system.md § 1`: a tuned cubic-bezier is
indistinguishable and free).

**All four primitives are now required**, where the pre-Overview plan had two
required and two conditional. P1 and P2 are shared across compositions; P3 is used
twice; P4 once. Build in that order.

## 6. Rejected

| Idea | Why |
|---|---|
| Character-by-character headline reveal | Already rejected system-wide `DESIGN.md § 10` |
| Typewriter on the AI rationale | § 4 |
| Scroll-scrubbed / pinned sequences | § 2 |
| Number tickers on anything that is not a real value | There are no real metrics `[00 § 6]` |
| A cursor animation "operating" the product | Fake agency. If it is worth operating, let the visitor operate it |
| Idle animation on the ranked list | `docs/motion-system.md` Rule 2: no constant idle movement. `.float` on a whole panel is the sanctioned exception |
| Confetti / success flourish on the CTA | Not this brand |
| A third and fourth interactive element | Two is the budget. A page of toys reads as a demo, not a product — and with sections 06 and 08 both interactive, the budget is spent |
| Animating the skill graph continuously | Section 07 draws once and settles. An idly pulsing network diagram is the "glowing blob" of technical marketing `DESIGN.md § 10` |
| A live-looking counter on the what-if pool figure | It counts once, on toggle, and stops. A number that keeps moving implies live data, and the figure is an example `[10 § R5]` |

## 7. Validation

Per `CLAUDE.md § 6` step 6, plus the specifics this page introduces:

- [ ] 390 / 768 / 1440, and the simplified mobile variants for 05, 06, 07, 08
- [ ] The same score value appears in sections 01, 05, 06, 08 and 10 and is read
      from one source `[08 § 1]` — a divergence here is the most visible possible
      defect
- [ ] `prefers-reduced-motion` on: every sequence renders complete and static;
      both interactions still work
- [ ] Keyboard: candidate switcher and weight controls reachable, operable,
      focus ring visible on every state
- [ ] Screen reader: `aria-live` announces a candidate switch **once**;
      `aria-valuetext` reads the weight as a word; no intermediate count values
      reach the accessibility tree
- [ ] JS disabled: every composition renders complete and readable
      `docs/motion-system.md § 5`
- [ ] `will-change` released after settle (0 remaining, per the audit's method)
- [ ] Frame `--ratio` present on every frame, before and after real media lands
- [ ] No horizontal overflow at any width except the two named scroll containers
