# DESIGN.md — Transpahire design system

The visual system as implemented, not as aspired to. Every value here exists in
`assets/css/tokens.css`; if the two disagree, the stylesheet is correct and this
document is stale.

Source of brand authority: the Transpahire Brand System document (Stratum
direction) and `assets/brand/brand.json`.

---

## 1. Brand

### Personality

Transpahire is **hiring intelligence that shows its work**. The visual system
has to carry that claim before a word is read: it must look like something that
can be audited, not something that is asking to be trusted.

Four traits, in priority order:

1. **Editorial** — the page is composed, not assembled. Asymmetric grids, a
   left rail of mono labels, generous rests between ideas, headlines that carry
   a serif accent the way a magazine deck does.
2. **Structured** — thin rules, aligned baselines, tabular figures, a visible
   grid discipline. Structure *is* the trust signal.
3. **Restrained** — one accent colour, one gradient per section at most, no
   surface that is decorated rather than doing a job.
4. **Precise** — mono for anything that is data or a label; nothing approximate.

### Tone

Direct, specific, unhedged. Short declaratives. The serif italic accent is where
the voice allows itself a turn of phrase — *"your team is missing"*,
*"X-ray vision"* — and nowhere else.

### Composition principles

- **Asymmetry over symmetry.** The bento grid, the 200px label rail, the
  1.05fr / 1fr hero. A centred layout is reserved for terminal moments: the
  demo, pricing, the final CTA.
- **Rest is a component.** Section padding runs to 128px on desktop. Do not
  compress it to fit more in.
- **One loud move per act.** The problem statement inverts to ink; the
  interludes go dark; the featured pricing tier inverts. Three inversions in the
  whole page. A fourth would cost the other three their weight.
- **Rules, not boxes.** Where a divider is needed, a 1px hairline beats a card.

---

## 2. Colour

One indigo system. Ink is the dark surface, indigo is the intelligence, the
neutrals stay out of the way.

### Palette

| Token | Value | Role |
|---|---|---|
| `--c-ink` | `#0B0B1F` | Primary dark surface; primary text on light |
| `--c-ink-raised` | `#14142B` | Raised panel on an ink ground |
| `--c-indigo-deep` | `#1E1B4B` | Brand primary; the CTA ground |
| `--c-indigo` | `#312E81` | Secondary; chip text |
| `--c-indigo-bright` | `#4F46E5` | **Accent on light** — the serif italic, ticks, focus ring |
| `--c-indigo-glow` | `#6366F1` | **Accent on dark**; the gradient washes |
| `--c-indigo-tint` | `#EEF0FE` | Faintest indigo wash; chip ground |
| `--c-white` | `#FFFFFF` | Raised surface on light |
| `--c-paper` | `#F7F6F2` | Page ground — warm paper, not dashboard grey (Phase 6) |
| `--c-bone` | `#EFEDE7` | Alternating section ground |
| `--c-platinum` | `#E6E6EF` | Primary text on ink |
| `--c-rule` | `#E3E1DA` | Hairline |
| `--c-rule-soft` | `#ECEAE3` | Hairline, quieter |
| `--c-ink-type` | `#1A1A2E` | Display and strong text on paper; grounds keep `--c-ink` |
| `--c-slate-dark` | `#3A3A4C` | Body copy on light — 10.3:1 |
| `--c-slate` | `#6B6B7D` | Secondary and tertiary copy — 4.8:1 |
| `--c-slate-soft` | `#9A9AB0` | Copy on ink **only** — 2.64:1 on paper, so `--text-faint` no longer points here |
| `--c-indigo-text-on-ink` | `#818CF8` | Indigo at text size on ink; `--c-indigo-glow` stays for large type and fills |
| `--wash-evidence` / `--text-evidence` | `#FFF1A8` / `#1A1A2E` | **The highlighter.** Cited profile lines only. Never a surface, never a hover |

Signals — state only, never decoration: `--c-ok #1F8A5B`, `--c-warn #C58A2F`,
`--c-err #C0392B`, and `--c-crit-ink #A32C3C` (rose).

### Semantic roles

Components never reference a raw pigment. They reference a role:

```
--surface / --surface-raised / --surface-sunken / --surface-accent
--text-strong / --text-body / --text-muted / --text-faint / --text-accent
--border / --border-soft / --border-strong
--focus-ring
```

### The five state roles

A signal colour used as **text** needs more contrast than the same colour used as
a **dot**, and far more than the same colour used as a **surface**. So each state
carries three roles — an ink, a wash, and a dot — and a component never reaches
for a pigment:

| Role | Used for |
|---|---|
| `--state-ok` / `--wash-ok` | Strong match · Hired · covered skill · low scarcity |
| `--state-info` / `--wash-info` | Good match · Shortlisted · Interviewing · **partial skill** · preferred tier |
| `--state-warn` / `--wash-warn` | Potential match · Offer out · required tier · medium scarcity |
| `--state-crit` / `--wash-crit` | **Critical requirement** · high scarcity |
| `--state-none` / `--wash-none` | Possible match · Sourced · Reviewed · Not moving forward · missing skill · bonus tier |

**`crit` was added in Phase 4.** The product tones the four importance tiers
CRITICAL rose · REQUIRED amber · PREFERRED indigo · BONUS neutral, and the site
had only three state roles — so critical rendered in `warn`, which is the colour
the app uses for the tier *below* it, and the two most consequential tiers were
indistinguishable.

**Rose, not `--c-err`.** An error colour says something has gone wrong. A critical
requirement is not an error; it is the most important thing on the requisition.
The rose is deliberately a step quieter than the error red.

**And "Not moving forward" is `none`, not `crit`.** The product's stated reason is
worth keeping: *a candidate who was not right for one role is not a failure
state.* Colouring that stage like an error teaches a recruiter the opposite.

### The inversion mechanism

`.on-ink` re-points every role above to its dark-ground equivalent. A card,
button, badge or eyebrow placed inside `.on-ink` is correct with no dark
variant class. This is why there is exactly one `.card` rule rather than
`.card` plus `.card--dark`.

```html
<section class="cta on-ink"> … </section>
```

### Contrast

All body and label combinations meet WCAG AA (4.5:1) at their rendered size;
large display type meets AA Large (3:1). The two combinations to watch when
introducing new pairings:

- `--c-slate-soft` on `--c-ink` — passes, but only as secondary copy at 13px+.
  Do not use it for anything a reader must not miss.
- `--c-indigo-bright` on `--c-paper` — 5.9:1, fine for the serif accent and
  ticks. It is **not** approved for body copy.

Never convey information by colour alone. **The word always rides with the
colour**: a classification chip prints "Strong", a pill prints "High
confidence", a stage chip prints "Not moving forward", and a score ring is
accompanied by its numeral. Every composition also carries an `.sr-only` line
stating in prose what its colours state visually.

---

## 3. Typography

Four families, four jobs. A family used outside its job is a bug.

| Family | Token | Weights | Job |
|---|---|---|---|
| **Space Grotesk** | `--font-display` | 400, 500 | Display and section headings, stat values, card titles, tier names. Never body copy. |
| **Manrope** | `--font-sans` | 400, 500, 600 | Everything UI: body, buttons, nav, lists, the wordmark. The default. |
| **Instrument Serif** | `--font-serif` | 400 italic | The editorial accent inside headings and ledes, the card benefit line, frame captions, pull quotes. **Never a full paragraph of UI text** — as of Phase 6 the lede itself is Manrope, and the serif survives only on its `<em>`. |
| **JetBrains Mono** | `--font-mono` | 400 | Eyebrows, labels, step numbers, metadata, fine print, data. Anything that is a label rather than a sentence. |

### The serif accent — the brand signature

An `<em>` inside any display-family heading becomes Instrument Serif italic in
the accent colour. One rule covers `.h-display`, `.h-section`, `.h-sub`,
`.quote`, `.lede` and `blockquote`:

```html
<h2 class="h-section">Not another ATS. <em>Not just a job board.</em></h2>
```

Rules: one accent per headline; it must fall on the phrase that carries the
turn, not on a noun; never nest it in body copy.

### Scale

Fluid, declared once in tokens. Never author a `clamp()` in a component.

| Token | Range | Used by |
|---|---|---|
| `--fs-display` | 48 → 104px | `.h-display` — one per page (the landing page's hero steps down to 44 → 76px; `sections.css`) |
| `--fs-h2` | 32 → 64px | `.h-section` |
| `--fs-h3` | 22 → 30px | `.h-sub` |
| `--fs-card` | 20px | `.h-card` |
| `--fs-lede` | 18 → 22px | `.lede` |
| `--fs-body-lg` | 16px | Default body, ruled checklists |
| `--fs-body` | 15px | `.body-copy` — card text |
| `--fs-small` | 14px | Buttons, nav, checklists |
| `--fs-micro` | 13px | Tabs, stat labels |
| `--fs-label` | 12px | Mono eyebrows and labels — the page floor; **11px is the floor inside compositions** |
| `--fs-data` | 13 → 15px | Numerals in compositions, tabular |
| `--fs-stat` | 40 → 72px | Stat values |
| `--fs-quote` | 36 → 72px | `.quote` — statement scenes |
| `--fs-pullquote` | 22 → 32px | `.pullquote` — testimonials |

### Tracking and line height

Brand spec: **−2.5% display, 0% body, −4.5% wordmark**.

`--tr-display -0.03em` · `--tr-heading -0.022em` · `--tr-card -0.012em` ·
`--tr-body 0` · `--tr-wordmark -0.045em` · `--tr-label 0.14em` (mono, uppercase).

Phase 6 adopted the Stage 3 type pass and palette site-wide
(`prototypes/STAGE-3.md` § 5): a taller ramp, tighter display tracking, a
sans lede, warm paper, and the highlighter. `STAGE-4-IMPLEMENTATION.md` § 4.

`--lh-tight 0.98` (display) · `--lh-heading 1.12` · `--lh-lede 1.45` ·
`--lh-body 1.55`.

### Measure

`.measure` caps at 56ch, `--narrow` 40ch, `--wide` 68ch. Every block of running
copy gets one. Numerals are tabular wherever a number sits next to another.

---

## 4. Spacing

A 4px ramp: `--sp-1` (4) through `--sp-24` (96). Component spacing is fixed so a
card looks identical at every viewport; section rhythm is fluid.

| Token | Range | Use |
|---|---|---|
| `--section-y` | 64 → 128px | Standard section |
| `--section-y-tight` | 48 → 80px | A section that continues the previous thought |
| `--section-y-huge` | 96 → 160px | A section that must stand alone |
| `--gap-grid` | 20px | Every card grid, everywhere |
| `--gap-wide` | 40 → 80px | Two-column splits |

Recurring intervals worth knowing: eyebrow → headline `--sp-8`; headline →
lede `--sp-4`; section head → content `--sp-14`; card icon → title `--sp-5`;
title → body `--sp-2`.

---

## 5. Layout

- **Container** `--container: 1280px`, `--page-pad: clamp(20px, 4vw, 56px)`.
  A prose container `--container-text: 760px` exists for future article pages.
- **Header** fixed, 64px. `scroll-padding-top` on `<html>` keeps anchor targets
  clear of it — no JS scroll interception.
- **Grid** `.grid--2 / --3 / --4`, collapsing 4→2 and 3→2 at 900px, then to 1
  at 700px.
- **Split** `.split` (1:1) and `.split--lead` (1.05:1), collapsing at 900px.
- **Bento** 3 columns: a 2-wide lead cell, a 1-wide stacked pair, then a
  full-width row of three. Collapses to a single column at 900px.

### Breakpoints

Five, and only five. Recorded as tokens for documentation (CSS cannot use a
custom property in a media query — keep every query aligned to these):

| | Width | What changes |
|---|---|---|
| `--bp-sm` | 520px | Footer to one column |
| `--bp-md` | 700px | All grids to one column; stats to 2×2 |
| `--bp-lg` | 900px | **The main break.** Splits stack, bento collapses, desktop nav → drawer |
| `--bp-xl` | 1100px | Reserved |
| — | 800px | Section head stacks; steps stack; interlude stacks |

### Radius and elevation

`--radius-sm 8` · `--radius 14` (cards, frames) · `--radius-lg 22` (tiers, the
problem statement) · `--radius-pill 999`.

Four shadows, in ascending weight: `--shadow-card` (resting surface),
`--shadow-lift` (hover), `--shadow-elev` (a surface that should read as
above the page), `--shadow-float` (a product composition lifted out of it).
Nothing gets a shadow it has not earned by being elevated.

---

## 6. Components

Full inventory and usage rules: `docs/components.md`. In brief:

**Layout** `.container` `.section` `.stack` `.cluster` `.grid` `.split` `.rule`
**Type** `.h-display` `.h-section` `.h-sub` `.h-card` `.lede` `.body-copy` `.eyebrow` `.label` `.measure` `.section-head`
**UI** `.btn` (primary / accent / secondary / ghost) `.link` `.badge` `.chip` `.signal` `.tab` `.accordion`
**Marketing** `.card` (+ `--dashed`, `__icon`, `__benefit`) `.stat` `.quote` `.pullquote` `.cite` `.tier` `.checklist` `.logo-strip` `.step` `.wordmark`
**Product** `.frame` (+ `__chrome`, `__body`, `__placeholder`, `__tag`, `__play`, `__caption`)
**Product data** `.ring` `.pill` `.chip--mono` `.meter` `.mono-disc` `.concept` `.relchip` `.evidence` `.missing-row` `[data-tone]`

`.compare` was removed in Phase 4 with the composition that used it — see
`docs/components.md` § 4.

Rule: a component earns its existence by being used in two places or by owning
a real accessibility contract. Abstraction alone is not a reason.

---

## 7. Product UI

Rules in full: `docs/product-visualization.md`. The visual contract:

- Every product visual sits in a `.frame` — a restrained window chrome plus a
  content slot, so a mockup reads as software rather than illustration.
- The slot **always** declares `--ratio`. This is the site's main defence
  against layout shift, and it must survive the swap to real media.
- Placeholders use the graph-paper canvas and a labelled tag. They are
  deliberately, visibly *not* screenshots — a stand-in must never be mistaken
  for the product.
- Product surfaces use the same tokens as the site. A mockup that invents its
  own greys is a mockup that will look wrong beside a real screenshot.
- The frame is a stage, not a decoration: no frame without something to show.
- **A composition may show density and it may show two panes** (Phase 4), but it
  may not show a label, a state, a route or a relationship the product does not
  have. The test is unchanged: can you name the surface each element comes from?
- **Ordinal data gets an ordered bar, never a ring.** A ring has no beginning, so
  the two ends of a scale read as two peer slices. A stacked bar's segments must
  also sum to its stated whole.
- **A magnitude and a multiplier are different shapes.** The four weighted
  dimensions are bar segments; the three modifiers are a text row. A modifier
  drawn as a bar reads as a fifth dimension — which is the exact defect that cost
  the site a phase.

---

## 8. Motion

Full rationale: `docs/motion-system.md`. Live reference: `motion-lab.html`.

**Primitives.** Reveal (fade · up · down · left · right · scale · blur · rise),
Stagger (fast 50ms · normal 80ms · slow 120ms), Hover (lift · scale · icon
shift · border · background), Product (float · parallax · layer reveal),
Utility (tab crossfade · accordion · count up · nav).

**Timing.** House easing is `--ease-entrance: cubic-bezier(0.16, 1, 0.3, 1)` —
a long, soft settle. Durations: 120ms instant, 180ms hover, 320ms state change,
620ms reveal, 820ms large composition. Travel scales with the object:
16 / 28 / 48 / 64px.

**Rules.** Motion communicates something, or it goes. Motion decelerates —
nothing eases in. Only `transform`, `opacity` and `filter` animate. Product
visualisations may be more expressive than text; nothing else may. Reduced
motion is honoured at the token layer, so a component cannot opt out.

---

## 9. Responsive design

| | Mobile (< 700px) | Tablet (700 – 900px) | Desktop (> 900px) |
|---|---|---|---|
| Navigation | Disclosure drawer, focus-trapped | Drawer | Inline links + underline hover |
| Grids | 1 column | 2 columns | 2 / 3 / 4 |
| Bento | Stacked | Stacked | Asymmetric 3-column |
| Splits | Stacked, visual after text | Stacked | Side by side |
| Section head | Stacked | Stacked (< 800px) | 200px rail + headline |
| Stats | 2 × 2 | 2 × 2 | 4 across |
| Steps | Stacked, no connector | Stacked (< 800px) | 3 across, hairline connector |
| Type | Bottom of every clamp | Mid-clamp | Top of every clamp |
| Parallax | Off (coarse pointer) | Off | On |

Principles: mobile is a real layout, not a fallback — the previous build hid
the nav below 800px with nothing behind it, and that is the class of bug this
table exists to prevent. Order follows reading order: on a flipped segment, the
text comes first on mobile regardless of desktop order. Nothing scrolls
horizontally except the deliberately scrollable comparison table and tab list,
each inside its own `overflow-x: auto` container.

---

## 10. Anti-patterns

Deliberately rejected. Adding any of these is a regression, not a feature.

| Rejected | Why |
|---|---|
| Glowing gradient blobs | Generic AI-SaaS shorthand. Two restrained washes exist (hero, CTA) and that is the budget. |
| Glassmorphism as a surface | Used once, on the scrolled header, where a translucent substrate has a job. |
| Floating sparkle icons | Decoration pretending to be intelligence. |
| Three identical feature columns | The bento exists precisely to avoid this. |
| Meaningless dashboard mockups | A frame with nothing to show is worse than no frame. |
| Excessive pills and shadows | Pills mark status. Shadows mark elevation. Neither is a texture. |
| Idle animation on text | Movement with no message. Float is for product panels only. |
| A fourth inversion | Three dark moments carry the page's rhythm; a fourth flattens it. |
| Character-by-character headline reveals | The Myniq hero splits every letter into a span. Expensive, unreadable to some AT, and it says nothing the whole-line reveal does not. |
