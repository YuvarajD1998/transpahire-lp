# Components

Inventory, markup contracts, and the rule for when to add one.

**The rule:** a component earns its existence by being used in two places, or by
owning a real accessibility contract. Abstraction alone is not a reason. Six
one-use "components" are worse than six sections of honest CSS.

Layers, in cascade order:

```
Design tokens        tokens.css
Layout primitives    base.css      container · section · stack · cluster · grid · split
UI primitives        components.css btn · link · badge · chip · signal · tab · accordion
Marketing components components.css card · stat · quote · tier · compare · checklist · step
Product components   components.css frame · score · meter · panel · rank · graph
Sections             sections.css   header · hero · bento · steps · segment · stats · cta · footer
Pages                src/pages/*.mjs → *.html (tools/build.mjs)
```

---

## 1. Layout primitives — `base.css`

### `.container`
The one horizontal measure. `max-width: 1280px`, fluid padding.
`.container--text` (760px) for future prose pages.

### `.section`
The one vertical rhythm. Modifiers: `--tight`, `--huge`, `--sunken` (bone
ground), `--ink`, `--indigo`.

Ground alternation across the homepage is `paper → paper → ink → paper → bone →
paper → paper → bone → ink → paper → ink → paper → bone → indigo → ink`. Two
consecutive sections should not share a ground unless they are one thought.

### `.stack` / `.cluster`
Vertical flow (`--2` … `--8`) and horizontal wrapping group. Between them they
replace most one-off margin utilities. `.cluster` is what CTA pairs, chip rows
and logo strips use.

### `.grid`
`--2` `--3` `--4`, collapsing 4→2 and 3→2 at 900px, then to 1 at 700px.
Always `minmax(0, 1fr)` so a long unbroken string cannot blow out a column.

### `.split`
Two columns. `.split--lead` is 1.05:1 — the hero's asymmetry. Both stack at
900px.

### `.rule`
A hairline `<hr>`. Use instead of a card when all that is needed is separation.

---

## 2. Typography primitives — `base.css`

`.h-display` · `.h-section` · `.h-sub` · `.h-card` — roles, not sizes. A
`.h-section` is the section's voice regardless of which element carries it, so
heading *level* can be chosen for document structure independently of size.

`.lede` (serif) · `.body-copy` (+ `--muted`, `--lg`) · `.measure` (56ch,
`--narrow` 40ch, `--wide` 68ch).

### `.eyebrow`
Mono, tracked-out, with the 28px leading rule that signs every section.
`--accent` for indigo, `--bare` to drop the rule.

### `.label`
Mono uppercase, no rule. Metadata, captions, fine print.

### `.section-head`
The recurring "eyebrow in a 200px left rail, headline in the right" grid.
`--center` collapses it to a centred stack.

```html
<div class="section-head" data-reveal="up">
  <p class="eyebrow">Product</p>
  <h2 class="h-section">Everything your team needs <em>to hire with confidence.</em></h2>
  <p class="lede">Optional.</p>
</div>
```

This replaced eight inline `style` attributes per centred usage in the previous
build. If you find yourself writing `style="text-align:center"` on a section
head, use `--center`.

---

## 3. UI primitives — `components.css`

### `.btn`

```html
<a class="btn btn--primary hover-icon press" href="#cta">
  Get early access
  <svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false">
    <use href="#i-arrow-right"/>
  </svg>
</a>
```

| Variant | Use |
|---|---|
| `--primary` | The page's main action. Ink on light, white on ink. **One per view.** |
| `--accent` | Indigo. Reserved — not currently used on the homepage |
| `--secondary` | The alternative action beside a primary |
| `--ghost` | Tertiary. Nav utilities |
| `--block` | Full width — pricing tiers, the drawer |

Rules: `<a>` for navigation, `<button>` for actions — never a `<div>`. Pair
with `.hover-icon` when the button carries an arrow, and `.press` for touch
feedback. On an ink ground, wrap in `.on-ink` and use the same classes.

### `.link`
The inline underlined variant, for running copy only.

### `.badge` / `.chip`
`.badge` is a **status** marker — "Coming soon", "Beta". It has a leading dot
and is never decorative. `.chip` is a compact **data** tag — a skill, a filter,
a count.

### `.signal`
An 8px state dot: `--ok`, `--warn`, `--err`. Always `aria-hidden`, and always
beside text that says the same thing — never the sole carrier of meaning.
Scoped so it cannot collide with the decorative `.frame__dot`.

### Tabs
Markup contract — `tabs.js` wires ids, roles and relationships:

```html
<div data-tabs id="platform-tabs">
  <div class="tabs">
    <div class="tabs__list" role="tablist" aria-label="Platform capabilities">
      <button class="tab is-active" data-tab="matching">Candidate Matching</button>
      <button class="tab" data-tab="pipeline">Hiring Pipeline</button>
    </div>
  </div>
  <div class="tab-panel" data-panel="matching">…</div>
  <div class="tab-panel" data-panel="pipeline">…</div>
</div>
```

Provides: roving tabindex, arrow keys, Home/End, `aria-selected`,
`aria-controls`/`aria-labelledby` both ways, panels toggled with the real
`hidden` attribute. `.is-active` on a tab sets the initial selection.

### Accordion
Markup contract — note the **bare inner wrapper**, which is load-bearing:

```html
<div class="accordion" data-accordion data-accordion-single>
  <div class="accordion__item" data-open="false">
    <h3 class="accordion__heading">
      <button class="accordion__trigger" data-accordion-trigger>
        Question text
        <span class="accordion__marker" aria-hidden="true">
          <svg width="14" height="14"><use href="#i-chevron-down"/></svg>
        </span>
      </button>
    </h3>
    <div class="accordion__panel">
      <div class="accordion__inner">
        <div class="accordion__content">Answer text</div>
      </div>
    </div>
  </div>
</div>
```

`.accordion__inner` must carry no padding: padding on the grid child survives
`min-height: 0` and props every collapsed panel open by its padding height.

Provides: real `<button>`, `aria-expanded`, `aria-controls`, `role="region"`,
Up/Down/Home/End between triggers, `inert` on collapsed panels.
`data-accordion-single` limits the group to one open item.

---

## 4. Marketing components — `components.css`

### `.card`

```html
<article class="card hover-lift">
  <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-zap"/></svg></span>
  <h3 class="h-card card__title">AI Match Scoring</h3>
  <p class="body-copy card__body">What it does.</p>
  <p class="card__benefit">Why it matters — serif italic.</p>
</article>
```

The workhorse. `--sunken` for a bone ground, `--dashed` for "planned, not
shipped" (it reads as a slot waiting to be filled, which is what it is).

`.card__benefit` is the Transpahire tell: one serif italic closer per card,
always last, giving each card a point of view rather than just a description.
`margin-top: auto` keeps it aligned across a row of unequal cards.

Movement comes from `.hover-lift`, not from the card — so every liftable
surface on the site moves identically.

### `.stat`
`.stat__value` (display face, tabular) + `.stat__label`. Pair with `data-count`
for the count-up. See `docs/content-integrity.md` before adding a number.

### `.quote` / `.pullquote` / `.cite`
`.quote` is display-face, for interlude statements. `.pullquote` is serif, for
testimonials. `.cite` is the mono attribution.

### `.tier`
Pricing card. `--featured` inverts to ink rather than shouting in colour —
restraint is the differentiator. `.tier__badge` sits at the top edge.

### `.compare` — **removed in Phase 4**

The comparison table and its CSS are both gone. `comparisonTable()` shipped one
column short with a note underneath admitting so, on a page about transparency,
which reads as concealment — and the reason it failed was structural rather than
visual, so a future comparison would need a different shape anyway. The two solid
category claims are prose on `/product/matching`. See § 5c.

### `.checklist`

> **An item may contain inline markup.** It used to be a two-column grid, which
> silently broke the moment an item held a `<strong>` — in a grid container every
> element *and every text node* is its own item, so the bold ran in the text
> column and the sentence after it landed in the 22px tick column, one word per
> line. The tick is positioned now. If you make a list item a grid again, this
> comes back.

Ticked list. `--ruled` adds a hairline above each row and steps the size up —
use when the list is the column's main content rather than a supporting detail.
`.checklist__group` is an unticked mono subheading ("Everything in Starter,
plus").

### `.logo-strip`
Slots for partner or customer marks. **Ships empty on purpose.** A row of grey
rectangles under the words "trusted by" is a fabricated trust signal, not a
placeholder — see `docs/content-integrity.md`.

### `.step`
Numbered process item. Composed by `.steps` in `sections.css`, which adds the
hairline connector.

### `.wordmark`
Mark + name lockup at −4.5% tracking, per the brand spec.

---

## 5. Product components

### `.frame`
The container every product visualisation lives inside. Full rules:
`docs/product-visualization.md`.

```html
<div class="frame frame--elevated" style="--ratio: 16 / 9">
  <div class="frame__chrome">
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__meta">app.transpahire.com / candidates</span>
  </div>
  <div class="frame__body">
    <div class="frame__placeholder">
      <span class="frame__tag"><span class="frame__tag-kind">image</span>What goes here</span>
    </div>
  </div>
</div>
```

`--ratio` is mandatory. Modifiers: `--elevated`, `--float`, `--ink`.
Parts: `__chrome` `__dot` `__meta` `__body` `__placeholder` `__tag` `__play`
`__caption`.

---

## 5b. Product composition components — `components.css`

Added in Phase 3, for the eight compositions in
`docs/phase-2/08-PRODUCT_VISUALIZATION_SPEC.md`. **Do not hand-write this
markup.** It is rendered from `src/lib/compositions.mjs`, which reads every value
from `assets/data/product-demo.js` — the point of the data module is that `87`
is typed once and read everywhere, and a hand-written copy of a panel is how
that guarantee breaks. The contracts below are here so the rendered markup can
be read and modified, not so it can be duplicated.

Every entry from § 5c onward carries a **models:** line naming the product
component it is drawn from. That line is what lets a future session check a
composition against the product instead of guessing at it, and it is the cheapest
thing in this document.

Two conventions run through all of them:

- **Type.** `--font-mono` for every label, score and datum; `--font-sans` for
  names and narrative prose; `--font-display` for score values. **`--font-serif`
  never appears inside a product composition.** It is the marketing voice, not
  the product's, and a mockup that speaks in the marketing voice stops reading
  as software.
- **Density.** Deliberately tighter than the marketing components. A mockup
  twice as airy as the product reads as dishonest the first time someone sees a
  demo.

### The composed-HTML slot

```html
<div class="frame" style="--ratio: 4 / 3">
  <div class="frame__chrome">…</div>
  <div class="frame__body frame__body--content">…</div>
</div>
```

`.frame__body` normally reserves its box with `aspect-ratio`, because its usual
job is holding media that has not loaded. Composed HTML has nothing to load, so
`--content` turns the authored ratio into a reserved **minimum**: an empty
spacer holds the box open at `--ratio` and the composition shares its grid cell,
growing past it when the content is taller.

**`--ratio` therefore stays declared on every frame**, which is the property
`docs/product-visualization.md § 2` actually cares about — it has to survive the
swap to real media, and it is checked by `tools/check.mjs`.

### `.score`

```html
<p class="score">
  <span class="score__value" data-count="87">87</span>
  <span class="score__scale" aria-hidden="true">/100</span>
  <span class="chip chip--mono chip--strong">Strong Match</span>
  <span class="sr-only">Match score 87 out of 100. Classification: strong match.</span>
</p>
```

`--sm` and `--lg` size it. Three decisions worth recording:

- **No ring.** The product returns a 0–100 score and a named classification. A
  ring implies a proportion of a whole and invites the reader to compute a
  percentage the product never claimed; the chip already carries the verdict, in
  the product's own vocabulary. `.meter` is available where a proportion is
  genuinely wanted.
- **Integers**, so `counter.js` works unmodified.
- **Never a threshold.** Show the score and the classification the product
  returned. Never a rule like "80+ is strong" — the cut-offs are not published.

### Classification and skill-state chips

`.chip--strong` `--good` `--potential` `--weak`, and `.chip--mono` for the
uppercase mono treatment. Always paired with the word: colour is never the sole
carrier. The mapping is fixed — Strong → ok, Good → indigo, Potential → warn,
Weak → slate — and it comes from the `--state-*` / `--wash-*` token pairs added
to `tokens.css`, which is why a chip and a skill glyph agree without either one
knowing about the other.

### `.meter`

```html
<span class="meter meter--ok" aria-hidden="true">
  <span class="meter__fill" style="--meter-v: .84"></span>
</span>
```

`--ok`, `--warn` and `--quiet` re-pigment the fill. Movement is P1 in
`motion.css § 4b`. Always `aria-hidden`, always beside a number and a label that
say the same thing.

### `.panel` — C2, the explanation panel

The most important asset on the site. Five blocks in a fixed order: identity ·
match breakdown · skills · why · signals.

```html
<div class="panel" id="argument-panel" data-sequence role="group" aria-labelledby="…">
  <p class="sr-only" data-field="announce" aria-live="polite" aria-atomic="true"></p>
  <div class="panel__head">…name, meta, .score…</div>
  <div class="panel__block">
    <p class="panel__rule">Match breakdown</p>
    <dl class="breakdown">
      <div class="breakdown__row" data-beat="420">
        <dt class="breakdown__label">Skill coverage</dt>
        <dd class="breakdown__meter">…meter…</dd>
        <dd class="breakdown__value">84 <span class="sr-only">…out of 100.</span></dd>
      </div>
    </dl>
  </div>
  …skills · narrative · signals…
</div>
```

`.panel__rule` is the block divider: a hairline with a mono label sitting on it.
It is the product's own sectioning device, and it is why the panel reads as one
surface rather than five stacked cards.

**On `aria-live`.** `07 § 3` asks for the panel to be a polite live region so a
candidate switch is announced once rather than field by field. A live region on
the panel itself does the opposite — it announces every changed node — so the
region is a single atomic `.sr-only` summary and the panel is a labelled group.
Same contract, one announcement.

### `.skillrow` — and the `partial` state

```html
<div class="skillrow skillrow--partial" data-field="skills-partial" data-beat="1400">
  <span class="skillrow__glyph" aria-hidden="true">≈</span>
  <span class="skillrow__state" aria-hidden="true">Partial</span>
  <ul class="skillrow__items">
    <li class="skill">Kubernetes</li>
    <li class="skill__transfer" data-beat="1560">Docker experience transfers</li>
  </ul>
  <span class="sr-only">Kubernetes: partial match — Docker experience transfers.</span>
</div>
```

Four variants: `--covered` `--partial` `--missing` `--bonus`.

**`--partial` is the most important single element in this file.** It is the
product's most distinctive state and the hinge of the whole homepage. It has its
own glyph, its own colour, its own row, and the transfer line beneath it naming
the adjacent skill — and its chip is ringed so it cannot be mistaken for a third
grey chip, which is the most likely way to build section 06 wrong.

The `≈` glyph is never the only carrier: every row has an `.sr-only`
restatement in words.

### `.rank` — C1, the ranked candidate list

A real `<ul>` of `<li>`, never a stack of divs: the list *is* a list, and a
screen reader should be told how many people are in it.

```html
<div class="rank">
  <div class="rank__head">… .rank__title · .rank__filters · .rank__sort …</div>
  <ul class="rank__list" id="pool-list" aria-describedby="pool-list-summary" data-layers>
    <li class="rank__row" data-row="c1" data-classification="strong">
      <span class="rank__score">…number, chip…</span>
      <span class="rank__ident">…name, headline…</span>
      <span class="rank__meta">6.2y · Bengaluru · Hybrid</span>
      <span class="rank__cover" aria-hidden="true">✓3 ≈1 ✗1</span>
      <span class="sr-only" data-row-sr>…score, classification, coverage in words…</span>
    </li>
  </ul>
  <p class="rank__foot">every candidate in the database · consented profiles only</p>
</div>
```

`data-classification` carries the band, and it is deliberately **not**
`data-band`: the filter buttons use `data-band`, and one attribute meaning two
things on one page is how a selector picks the wrong element.

`.rank__cover` is the ✓ ≈ ✗ triplet — the row-level detail worth having, because
it previews the three-state model before the visitor opens a panel and makes the
partial column visibly non-zero across the list.

`.rank__filter` buttons are real `<button>`s with `aria-pressed` that actually
filter the list. The value is not the filtering; it is that the filtering works,
which is what proves the composition is markup rather than an image.

### `.switcher`

```html
<div class="switcher" role="group" aria-labelledby="…" data-switcher="argument-panel">
  <button type="button" class="chip" data-candidate="c1" aria-pressed="true">Sneha Iyer</button>
</div>
```

Names its panel by id. Real buttons, never divs. Behaviour: `modules/panel.js`.

### `.tuner`, `.weights`, `.weight`, `.whatif`, `.toggle` — C4

```html
<div class="tuner" data-tuner="control-list">
  <div class="weights" role="group" aria-label="Skill importance">
    <div class="weight">
      <label class="weight__head" for="weight-kubernetes">
        <span class="weight__skill">Kubernetes</span>
        <span class="weight__tier" data-weight-readout="kubernetes">required</span>
      </label>
      <input type="range" id="weight-kubernetes" min="0" max="3" step="1" value="2"
             data-weight="kubernetes" data-skill="Kubernetes"
             aria-valuetext="Kubernetes: required">
    </div>
  </div>
  <div class="whatif">… .toggle · .whatif__readout · .example-tag …</div>
</div>
```

`data-tuner` names the list the controls reorder, because the controls and the
list sit in different columns of the section's grid. A tuner whose named list
does not exist warns in the console rather than shipping a dead slider.

`aria-valuetext` carries the product's **tier word**, never a number: the product
does not expose a numeric weight and neither should the demo.

`.whatif` is a visually distinct surface from `.weights` on purpose — tuning
changes the *order*, simulation changes the *pool*, and conflating them in one
control loses both ideas.

`.toggle` restyles a real `<input type="checkbox">`. Never a div with a click
handler.

### `.example-tag`

The label that stops an illustrative quantity from reading as a product metric.
**Required** on section 08's pool figures and C10's unlock counts — an
unlabelled pool count reads as measured data, and none of these numbers are
measured.

### `.req`, `.dualmode`, `.segmented` — C5, the requisition

`.req__tier` groups skills under the four importance tiers, which are the
load-bearing element: they are what section 08's controls manipulate and what
the whole ranking is measured against. `.dualmode` is the filters ⇄ describe
control, driven by `modules/dualmode.js` and crossfading with the existing
`.tab-panel` primitive.

**Do not add a JD quality score here.** The optimizer exists, but its output is a
report of issues rather than a number, and a fabricated `9.2` would be a
fabricated metric.

### `.pipeline` — C7

Seven stages with the product's default names — the last, *Not moving
forward*, in a neutral tone — a count per stage, and one minimal card in four of
them. Deliberately schematic: this composition's job is reassurance, not depth.

**Its shape follows its own width, not the viewport's.** `.pipeline` is a size
container; at 720px and over it is the seven-column board, under 720px a stage
list (name, card, count per row). Seven columns need that much to set
*Interviewing* whole — the viewport query this replaced let a half-width segment
on a desktop page (`/product`, `/for-teams`) squeeze the board until names broke
mid-word and cards spilled out of their columns.

`--advancing` was meant to move one card one stage on reveal, but nothing sets
`--advance`, so it does not move. **Never show** interview times or any calendar
UI — calendar sync is live, but its interface is undescribed: name it, do not
draw it.

### `.cview`, `.trail` — C8, the candidate match view

The candidate's side of the same record, split into *where you fit* and *where
you don't*, which is the product's own phrasing and a better information design
than a flat list. `.trail` is the application status — status, not a
notification: candidates *can see* where an application stands, and the copy
must not imply they are messaged about it.

**The rule that carries section 10: it is the same score.** Rendering a different
number, or hiding it, wastes the strongest structural claim on the site.

### `.quality`, `.gaps` — C10

Résumé critique with a quality score and named suggestions, plus the skill-gap
list with unlock counts and demand levels. **Keep the résumé score low.** A
mockup showing 95 has nothing to offer the reader; a 62 with two named
suggestions demonstrates the product being useful.

### `.graph`, `.node`, `.edge`, `.payoff` — C3, the skill graph

An abstract system diagram, **not** inside a `.frame`: the relationship is a
property of the taxonomy, no product surface displays a graph, and dressing it as
a screen would invent product UI.

The SVG is `aria-hidden` and a structured `.sr-only` description carries the same
information — which is what lets the hover labels be decoration rather than the
only carrier of meaning. Two authored layouts, `--wide` and `--tall`, swapped at
700px, because a simplified variant is a real layout rather than a scaled-down
desktop one.

**Only the three confirmed skill edges may appear.** An invented edge is an
invented capability. See the note in `src/lib/compositions.mjs` on why the
specification's own `containerd` sketch is not built.

### `.navmenu` — the header disclosure menu

```html
<div class="navmenu" data-navmenu>
  <button class="navmenu__button" aria-expanded="false" aria-controls="menu-product">Product …</button>
  <div class="navmenu__panel" id="menu-product" data-open="false">
    <a class="navmenu__link" href="…">
      <span class="navmenu__link-title">…</span>
      <span class="navmenu__link-note">…</span>
    </a>
  </div>
</div>
```

Behaviour: `modules/menu.js`. **Not hover-only** — a hover menu is unreachable by
keyboard and unusable on touch, where the first tap opens it and also follows
whatever is underneath.

Deliberately **not** `role="menu"`. That role describes an application menu with
its own focus model, and applying it to a list of page links makes a screen
reader announce navigation as though it were a desktop application. A button
with `aria-expanded` controlling a plain list of links is the correct pattern for
site navigation.

Provides: click / Enter / Space to open, Escape to close and return focus, Down
from the button into the panel, Up/Down/Home/End between links, Tab off either
end closing the panel behind you, an outside pointer-down closing it, one panel
open at a time, and `inert` while closed so the links never sit in the tab order
of a page whose menu is shut.

### `.beats` — the philosophy progression

Four mono labels with a display line each. No icons, no shields, no lock glyphs:
a trust claim illustrated with a screenshot reads as a feature, and set in type
it reads as a position. The restraint is the argument.

### `.composition-note`

The honesty label under a composition: every person, company and figure inside
one is invented. One per page. It costs a line and removes any chance of a
mockup being read as a customer's data.

## 5c. Phase 4 composition components — `components.css`

Added in Phase 4, against `docs/phase-4.md` § 1 — which was read out of the
shipped product source rather than out of a planning document. The two Phase 3
constraints these relax, both recorded in `docs/product-visualization.md`:
**density is now allowed**, and **a composition may show two panes**.

### `.pill`

**models:** the product's status chips — `CONFIDENCE_STYLE`, mission status,
scarcity level, pipeline stage.

Distinct from `.chip`, and the distinction is worth keeping: a **chip is a
value** (a skill, a filter, a classification), a **pill is a state**. Five
tones — `--ok --info --warn --crit --none` — plus `.pill--stage` for a slightly
tighter tracking and `.pill--status` for the leading dot.

```html
<span class="pill pill--info pill--status"><span class="pill__dot"></span>Watching</span>
```

`.pill--ai` is the AI disclosure. **The product renders `✨ AI`; the site renders
a mono `AI` in an indigo pill with no glyph**, because `DESIGN.md` bans floating
sparkles. Same disclosure, one fewer decoration — this is the deviation, recorded.

### `.ring` — the score ring

**models:** `ScoreRing`, at the product's own two sizes — 52px in a drawer,
38px on a row.

Phase 3 argued that a ring implies a proportion of a whole the product never
claimed, and rendered a bare numeral instead. The product publishes its
thresholds and renders a ring, so the argument is spent. The ring is the most
recognisable single element in the product after the partial glyph.

```html
<span class="ring ring--strong" style="--ring-size: 38px" data-row-ring data-ring-c="103.7">
  <svg …><circle class="ring__track"/><circle class="ring__arc" data-ring-arc/></svg>
  <span class="ring__value" data-count="87" data-row-score>87</span>
</span>
```

**The arc is static.** Animating it means animating `stroke-dashoffset`, and P4
already spends the site's only exception to the transform/opacity/filter
allowlist. `assets/js/modules/ring.js` sets the arc, the band class and nothing
else, and both interactive modules call it — a ring whose number moved while its
arc did not would be worse than either.

Circumference is stamped on at build time in `data-ring-c`, because it depends on
the ring's size and measuring an SVG for a number the renderer already knew is
work for nothing.

### `.mono-disc`

**models:** the avatar on `CandidateRow`.

A monogram, never a photograph and never a stock face. A composition with an
invented person in it should look invented — `docs/product-visualization.md` § 6.

### `.rank__row--tracked` — the job → candidates row

**models:** `frontend/src/views/jobs/JobDetail/candidates/CandidateRow.tsx`.

Five fluid grid tracks, in the product's own order: avatar · name + headline ·
stage chip · score ring · origin and when. `rankedList({ variant: 'tracked' })`
renders it.

**Two lists, not one.** `variant: 'scored'` is a *ranking* — ring, classification
chip, coverage triplet, used where the question is "who fits this role".
`variant: 'tracked'` is the pipeline list, used where the question is "where is
everyone". A search result never gets a stage chip, because a stage only exists
once somebody is being tracked against a job.

At 700px the stage chip and the origin column drop out; the avatar, the name and
the ring survive, in that priority order.

### `.concept` — the concept match card

**models:** `ConceptMatchCard` inside
`CandidateDrawer/ExplainMatchPanel.tsx`.

The load-bearing part is the last two lines: the relationship, the section of the
profile the match came from, a confidence figure, and the snippet itself. *The
score cites its sources* is the strongest unclaimed beat in the product, and this
card is where the site finally says it.

```html
<div class="concept concept--muted">
  <p class="concept__head">Kubernetes → container orchestration ✓ verified</p>
  <p class="concept__reason">…</p>
  <p class="concept__foot">transferable · Experience   [meter] 78%</p>
  <p class="concept__quote">…</p>
</div>
```

`--muted` is the partial ground. `✓ verified` means *verified against the
candidate's own words* — a status the panel prints, not a promise the site makes,
and `.concept__unverified` is the honest other half of it.

### `.relchip`

**models:** the panel's "how the concepts connect" strip. Six labels: exact ·
synonym · ≈ equivalent · broader · narrower · transferable.

Deliberately quieter than a skill chip — outlined, not washed — because this is
vocabulary rather than data. **Distinct from the taxonomy's nine edge types**, and
the two must never be conflated: an edge type describes how two skills relate in
the graph, a relationship label describes how a phrase in a profile relates to a
phrase in a job.

### `.missing-row`

**models:** `MissingConceptRow`. Neutral wash only. A requirement the profile
does not meet is a fact, not a verdict on the person.

### `.evidence`

**models:** `MatchHighlightChips` on the results-list card.

A skill chip beside an italic quoted snippet from the candidate's own profile,
with the section named. **Capped at two per card in the product**, because the
card has to stay compact; the cap is honoured. This is the point of semantic
search — a result you can check — and the site had no way to show one until now.

### `.workspace`, `.workspace__job`, `.workspace__panes` — the job detail surface

**models:** `views/jobs/JobDetail` — the job header, `JobPulseStrip`, the five
job tabs, the candidates toolbar, the candidates list, and
`CandidateDetailDrawer` open over it.

**Rebuilt in Phase 5.** The Phase 4 version was a strip of names with one panel,
and the reason was mechanical rather than aesthetic — it is the whole lesson of
`docs/phase-5.md` § 3.1, and the rule it produced is in
`docs/product-visualization.md`:

> A composition's width is a design input, not a consequence.
> If a layout forces `display: none` on a row track, the layout is wrong.

Three rows: `.workspace__job` (header, pulse, tabs) at full frame width, then
`.workspace__panes` holding the list with the drawer over it.

```html
<div class="workspace" data-drawer-reveal>
  <div class="workspace__job">… .jobhead · .pulse · .tabstrip …</div>
  <div class="workspace__panes">
    <div class="workspace__list">… .toolbar · .rank …</div>
    <div class="workspace__drawer">… .dhead · .tabstrip--drawer · .panel …</div>
  </div>
</div>
```

**`.workspace__panes` is load-bearing, not a wrapper.** The drawer is absolutely
positioned inside it, so the pane's height is set by the LIST and the drawer's
extent is derived from it — `top: var(--drawer-offset)`,
`bottom: var(--drawer-tail)`, `left: 42%`. As a plain grid sibling the drawer's
own content sized the row (the panel is far taller than seven rows) and the frame
came out ~1250px tall with the copy column pushed off the screen.

The drawer is **flex column with `flex: none` children**, not a grid, and that is
also a fix rather than a taste: the drawer has a definite height, which inside a
grid made the auto rows shrinkable — and `.tabstrip`, whose `overflow-x: auto`
computes `overflow-y` to `auto` too and therefore has a min-content height of
**zero**, collapsed to its 1px border. The five drawer tabs rendered as an empty
rule.

Two design constants, both on `.workspace`:

| | | |
|---|---|---|
| `--drawer-offset` | 96px | one toolbar plus one row. Keeps the SELECTED row fully visible above the drawer — the relationship the composition is about. |
| `--drawer-tail` | 66px | one row. Keeps the critical gate's row clear below it, so the first screen shows a ranking and a refusal. |

Below `--bp-xl` the drawer becomes a sheet beneath the list: both panes get the
full frame width, which is what keeps five row tracks and a readable drawer at
once. An overlay at 768px leaves the list ~320px, and 320px is where
`display: none` starts looking tempting again. Below `--bp-md` the list scrolls
horizontally inside itself rather than dropping tracks.

Motion is **P5**, in `motion.css` § 4b, unchanged by the rebuild. The selected
row carries `aria-current="true"` rather than the list being dimmed — see the P5
entry in `docs/motion-system.md` for why.

### `.jobhead` — the job header

**models:** `JobDetail`'s three stacked rows — title with status badge and the
amber skill-review flag, meta pills, stats row.

**`.jobhead__review` is the single most valuable element in the hero.** It is the
parser escalating rather than guessing: the job carries an amber
`N skills need review` flag until a person decides. Do not drop it for space.

**`.jobhead__eye` is a control, not an ornament.** The eye beside the salary band
means "visible to candidates", which is a real setting on the requisition, so it
renders from `JOB.salaryVisible` and carries its own reading for AT.

Seniority tone comes from the data (`JOB.seniorityTone`), not the caller — amber
for SENIOR, and LEAD/PRINCIPAL borrow `info` because the app's violet is not one
of the site's five pill tones. **Deviation, recorded:** the demo requisition is
SENIOR, so the substitution is not visible anywhere yet.

### `.pulse` — the pulse strip

**models:** `components/JobPulseStrip.tsx`. Four stat cards, **exactly one
featured.**

The featured tile is `In pipeline` and the data decides that, not the caller —
`JOB_PULSE` carries `featured`, and `pulseStrip()` has no parameter for it. The
product's own reasoning, worth keeping verbatim because it is an argument for the
product:

> *"In pipeline" is featured, exactly one per strip. It is the honest headline:
> applicants is a lifetime total that only ever grows, so a job with 200
> applicants and nobody in play looks healthy right up until you read the second
> tile.*

Getting this backwards inverts the product's argument. **No `data-count`** — a
pulse figure is a state, not an arrival, and `tools/check.mjs` asserts it.

### `.tabstrip` — a tab strip, job or drawer

**models:** `JobDetail`'s five tabs (Overview · Candidates · ◉ Sourcing ·
Insights · Settings) and `CandidateDetailDrawer`'s five (Profile · ◉ Match ·
Interviews · Feedback · Activity).

The cheapest possible statement that a product has depth, and it costs one line
of markup. **Inert:** spans with no role, no tabindex and no aria, inside an
`aria-hidden` container — this is a picture of a tab strip and the markup says so.
The real interactive tabs are `Tabs` in § 3.

`tabstrip--drawer` is the smaller variant. Insights' four sub-views (Tuning,
Fairness, Funnel, Talent pool) are named in copy rather than drawn: a tab strip
inside a tab strip at hero size is a picture of a navigation, not of a product.

### `.toolbar` — the candidates toolbar

**models:** search by name or email, the origin segmented control
(All / Applied / Sourced), the tracked count and the sort.

Reuses `.segmented` from `requisition()` so the picture and the real control
cannot drift apart visually; `.segmented--static` only restores the padding an
inline span loses. The origin control is the one interactive-*looking* element in
the hero and therefore the one that most needs not to be wired.

### `.dhead` — the drawer's header

**models:** `CandidateDetailDrawer`'s header and meta row — avatar 40px radius
11, name, headline, close; then stage chip, origin chip and `Full profile ↗`.

The identity lives here, and `explainPanel()` is therefore called with
`showIdent: false` beneath it — rendering the name twice in one drawer is the kind
of defect only opening the page finds.

**Deviation: the product's 34px `ScoreRing` is left out of the meta row.** The
Match tab's verdict ring sits directly beneath it, and the selected row above
carries the same score, so the open drawer read 87 three times on one screen. The
drawer now states the score once, in the panel whose subject it is.

### `.rank__move`, `.rank__row--gate`, `.rank__row--move`

**models:** the per-row `Move to…` select, and the retrieval-layer
disqualification as it appears *in the list*.

`rankedList({ move: true })` renders the inert `Move to…` affordance and switches
the row to six tracks. `rankedList({ gateRow: true })` appends the critical
gate's row to the same `<ul>` — which is where it sits in the product: the
exclusion is a row in the list, not a panel beside it.

The gate row's reason **spans the origin and move tracks**, because the whole
point of the row is that the disqualifying requirement is NAMED. In the 130px
origin track it truncated to "Missing critical · …", which names nothing and turns
an explained refusal back into an unexplained one.

### `.tiers` — an extraction, by importance

**models:** the tier extraction on the job description, as /check/job-description shows
it. Reads `JOB.tiers`, so it agrees with `requisition()` and /product/matching.

### `.checklist--refused`, `.badge--warn`, `.signup`, `.lowstep`

**models:** none — these four are marketing components, not product surfaces.

`.checklist--refused` swaps `.checklist`'s tick for a cross: a tick beside "a pool
size for your role" would say the opposite of the sentence. Used on both tool
pages, for the list of things the tool will not return.

`.signup` is the one-field email capture — footer on every page, and once at the
top of `/changelog`. `--ink` and `--paper` grounds. Deliberately quieter than the
demo CTA: /demo stays the loud ask.

`.lowstep` is the aside above /demo's form pointing at /check/job-description.

### `.gate` — the critical gate

### `.gate` — the critical gate

**models:** the retrieval-layer disqualification recorded in
`ranker.service.ts` and surfaced with the requirement that caused it.

A dimmed row with **no score**, because the candidate never got one — a low score
here would misrepresent the single most consequential thing the engine does. The
requirement is named. No motion beyond the group reveal: a dropped candidate is
not a beat.

### `.model`, `.wbar`, `.modrow`, `.gatebar`, `.bandkey` — the published weights

**models:** `DEFAULT_WEIGHTS` and the modifier chain in `ranker.service.ts`;
the classification bands at `ranker.service.ts:142`.

**One ordered bar, not four meters.** The *proportion* is the claim — skill
coverage is nearly two thirds of the weight — and four separate bars would show
four magnitudes while hiding the only fact that matters.

**The modifiers are a row, never a bar.** They are multiplications, and a bar
would read as a fifth dimension, which is the exact defect this composition was
built to correct.

Motion: P1 meter fill, four segments on a 90ms stagger, left to right.

### `.pbar` — the score distribution

**models:** the talent-pool view's score bands.

**Explicitly not a donut**, and the product's own reason is worth reproducing:
*"a ring has no beginning, so 'strong' and 'weak' read as two peer slices rather
than the two ends of a scale."* Ordinal data gets an ordered bar. Recorded as a
general rule in `docs/product-visualization.md`.

The four segments sum to `JOB.pool.total` by construction. The gated count sits
outside the bar, because those candidates were never scored — folding them into
the lowest band would be the one place on the page where a chart lied.

### `.mission`, `.tile`, `.strat` — Always-On Sourcing

**models:** `MissionHeader` + `MissionProgressStrip` + `StrategyHistoryPanel`.

Three things this must get right, all quoted from the source:

1. **Exactly one featured tile** (`.tile--featured`). The headline metric is
   found against target.
2. **Every number is a NEW count.** A search that returned fifty people the
   mission had already seen found nobody.
3. **The refusals stay visible.** `.strat--declined` is dimmed and struck, never
   hidden — *"seeing 'you turned this down' is what makes the rest of the list
   credible."* `.strat--awaiting` is the approval a widened critical requirement
   needs.

Motion: P1 on the progress meter, P2 on the strategy rows.

### `.covered` — the terminal honest state

**models:** the exhausted-mission recommendation panel.

`.covered__zero` renders an option that was measured and changes nothing, and it
is **not optional**. The source distinguishes three answers — unmeasurable
(render nothing), zero (say so out loud), positive (label it an estimate) — and a
composition that showed only the wins would misrepresent the feature.

### `.fairness`, `.flag`, `.insufficient` — structural fairness

**models:** `FairnessMonitorService`.

`.insufficient` is the most persuasive part of the panel and gets the most
deliberate treatment on it: below its minimum number of scored candidates the
service declines to rate distribution and says how far short it is. A product
that will not give you a metric it cannot support is this site's philosophy,
shipped. Do not cut it for space.

The shortfall count reads from `JOB.pool`, so this composition and the pool
composition cannot disagree.

### `.ledger` — the audit log

**models:** `AuditLog`, `MatchAuditLog`, `SearchAuditLog`, and the
`platform-admin/audit-logs` view.

Mono throughout: it is a log and it should look like one. `.ledger__row--strong`
is the match-audit row — the weights and the gate's own count, stored with the
result — and it is the only row that is not quiet, because a stored verdict is
what makes a score reproducible a month later.

### `.funnel`, `.scarcity` — the insights views

**models:** the funnel and talent-pool tabs of the job insights view.

The funnel reads its counts from `PIPELINE` rather than holding a second copy.
Scarcity is HIGH / MEDIUM / LOW, toned rose → amber → emerald: a skill almost
nobody in the pool has is a problem with the requirement, not a compliment to it.

Every figure carries `.example-tag`. `CLAUDE.md` § 7 is unchanged on that point.

### `.cwork`, `.spark`, `.unlock` — the candidate dashboard

**models:** `RecruiterInterest` and `SkillsUnlock` in
`views/candidate/dashboard/components/`.

The two strongest reasons to build a profile, and neither was on
`/for-candidates`. The sparkline is **bars, not a line**: seven daily counts are
seven values, and a line implies a continuum between them. Unlock counts read
from `RESUME.gaps`, which is the single source for them.

### `.statuses`, `.status`

**models:** the account-status dot on the recruiter's candidate card.

Five states — unclaimed, invited, activated, verified, opted out. The product is
more transparent about the two candidate populations than the marketing site was,
and this list is the site catching up.

`.statuses--pills` is the same ruled list carrying one `.pill--stage` per row
and no dot or note — the pipeline stages on `/product/hiring-operations`. It
drops the three-track grid, which would otherwise put the pill in the 10px dot
track and crush its wash to a sliver.

### `.counsel`, `.doc`, `.doclist`, `.chooser` — the legal documents

Not product components. `.counsel` marks a legal determination the drafter could
not make, and it is **deliberately loud**: a `[COUNSEL]` marker that is easy to
miss is a `[COUNSEL]` marker that ships. `.chooser` names the two audiences at
the top of a document, because a policy that writes only for the buyer fails the
candidate and this category does that as a matter of habit.

### `[data-tone]`

One rule, four tones — `crit warn info none` — applied wherever an importance
tier is named. Phase 3 rendered critical in amber, which is the colour the app
uses for the tier *below* it, so the two most consequential tiers were
indistinguishable. `--state-crit` was added to `tokens.css` for this.

## 5d. Phase 6 landing-page components — `components.css`, `sections.css`

The Stage 3 prototype's stagings, ported per `prototypes/STAGE-3.md` § 13.
Every one is a STAGING of data the site already renders, not a new product
surface; every value is read from `assets/data/product-demo.js`. Renderers are
in `src/lib/compositions.mjs` under "PHASE 6"; the page is `src/pages/home.mjs`.

### `.scene`, `.scene__head` — `sceneHead({num, name, title, lede})`

The rail-numbered head every non-terminal scene carries: a 200px rail column
("NN / 08 · name"), the H2 with one `<em>`, an optional lede. Single column
below 900px; the number drops to micro size on the phone. Layout only —
`sections.css`.

### `.claim`, `.claim__shot` — the hero

A compact head, then a screenshot of the running product's candidate
dashboard in a `screenshotSlot({ priority: true })` frame, captioned
(STAGE-4-IMPLEMENTATION.md D15, 29 Sep 2026). `.claim__shot` is a `<figure>`
that takes the container's full width — `min(100% − 2 × --page-pad,
--container)`, one gutter wider than the head at 1440 — and at ≤ 699px crops
the frame to the capture's content column (6 / 5, `object-position: 54% 0`;
both read off this capture, so a recapture means remeasuring). Inert: zero
focus stops, which `tools/audit.mjs` asserts over `.claim__shot`. No reveal
gates it, no count-up.

Until D15 the hero was `jobWorkspace()`'s pieces assembled edge to edge under
a route line (`.bleed`, `.workspace--bleed`, deleted). Visitors read that
composition as the product's own interface, which is why it went.

### `.wrows` / `.wrow` — `weightRows(DIMENSIONS, {large, lead})`

The four published weights as rows: label, a bar whose width is `--w`
(the percentage), the figure. `--i` is the row index, which P6 fans the rows
down by. `--lg` is the stage size.

### `.srows` / `.srow` — `skillRows(id)`

Every requirement, matched: covered · partial · missing, in that order, each
with its glyph, the phrase it matched, the relationship chip and the
confidence, plus an sr-only sentence. `--i` is the row index; P6 arrives the
rows in order. Three lines per row on the phone.

### `.sig-score`, `.sig-weights`, `.sig-skills`, `.sig-evidence`, `.sig-cand` — the six layer bodies

The bodies of P6's six layers, with `.layer--1`'s raised list. `evidenceCard(match, edge)`
is the highlighter's one home on the stage — the cited profile line in
`<mark>`; `candidateCard(id)` is the candidate's own card with the same 87.
`stageLayer(n, caption, body)` wraps one layer; `signature({id})` renders the
whole stage — **one per page** (`tools/check.mjs`). The motion is P6 in
`docs/motion-system.md` § 3.

### `.trow` — `tunerRow(id)`, and `gateTuner({listId, sticky})`

The gate-capable tuner. `.trow` extends `.rank__row` with a `[data-moved]`
cell (▲ / ▼ for 1.8s after a reorder) and a `[data-gate]` line that appears
when a skill set to CRITICAL drops the candidate before scoring: the score is
hidden, not lowered, and the row reads "Not scored · missing critical · Kafka".
`gateTuner()` renders the sticky control column (three 44px sliders with 24px
thumbs, the actor hint, the what-if, the phone's "Show all three controls"
disclosure) and the list. It reads `RANKINGS`, like every tuner. `tuner()` and
`controlComposition()` still exist and the sub-pages still use them; their
reorderable rows carry the same `.rank__gate` line (`gateLine()`), because
`RANKINGS` carries the product's gate and a gated row must lose its score, not
keep a stale one. The gated styles are scoped to `.reorder__row.is-gated`.

### `.chip--engine` / `.chip--human`

Who did the thing: the engine in an indigo wash, the human in an ink outline.
A convention, not a hue.

### The visual system's four global corrections (Phase 6)

Recorded here because they touch every page: the mono floor is **11px inside
compositions and 12px on the page** (pills, stats, scales, drawer tabs, toolbar
counts and pulse labels were 9–10px); numerals carry `tabular-nums`; the cited
profile line (`.concept__quote`, `.evidence__quote`) wears the highlighter
`--wash-evidence`, and nothing else does; and frames lose their three dots —
chrome is the route line, which says "real software", where the dots said
"screenshot". The lede is sans (`base.css`), per DESIGN.md § 3.

### Retired in Phase 6

| Component | Why |
|---|---|
| The twelve-section homepage (`.hero`, `.hero__inner--bleed`, `.interlude`, `.problem-statement`, `.gap__cards`, `.hero__composition`, `.bothsides`, `.philosophy`, `.hire__steps`) | Replaced by the eight scenes of the Stage 3 prototype. **The CSS was deleted with the markup** rather than left to rot; the rules the sub-pages still compose (`.argument`, `.adjacency`, the tuner's and the pipeline's phone rules, `.cta--tight`) stay. `jobWorkspace()` stays too: the lab page and the sub-pages still render it in a frame. |

### Retired in Phase 5

| Component | Why |
|---|---|
| `matchesWorkspace()` | Replaced by `jobWorkspace()`. It was not thin by choice — it sat in a 560px column and three of every row's five tracks were switched off in CSS to make it fit. `docs/phase-5.md` § 3.1. **The three `display: none` rules were deleted with it**, and the reason is recorded at the site of the deletion. |

### Retired in Phase 4

| Component | Why |
|---|---|
| `.compare` / `comparisonTable()` | Shipped with a visibly withheld column, and a note underneath admitting so, on a page about transparency. That reads as concealment. The two solid category claims are prose on `/product/matching` now, and **the CSS was deleted with the composition** rather than left to rot. |
| `explanationPanel()` | Replaced by `explainPanel()`. Two of its five dimension bars were wrong, and it had no way to express the thing the product does that nothing else in the category does. |
| `heroComposition()` | Replaced by `matchesWorkspace()`. |

## 6. Adding a component

1. **Check this document first.** Most needs are covered by an existing
   component plus a modifier.
2. **Can a token or a modifier do it?** A new `--variant` beats a new component.
3. **Is it used twice, or does it own an a11y contract?** If neither, put the
   CSS in `sections.css` and move on.
4. **Which layer?** Page-agnostic → `components.css`. Page-specific →
   `sections.css`. If it needs a raw value, add the token first.
5. **Does it work on ink?** Test inside `.on-ink`. If it needs a dark variant
   class, it is referencing a pigment instead of a role.
6. **Document it here** with its markup contract.

Naming: `block__element--modifier`. State is `.is-*` (set by JS) or a
`data-*` attribute (`data-open`, `data-panel`). Motion classes
(`.hover-lift`, `.press`) are applied by the *user* of a component, not baked
into it — that is what keeps movement consistent across unrelated surfaces.
