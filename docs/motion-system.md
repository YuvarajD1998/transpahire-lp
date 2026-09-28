# Motion system

Implementation: `assets/css/motion.css` + `assets/js/modules/`.
Live reference: **`motion-lab.html`** — open it before reading further.

---

## 1. What the Myniq reference actually does

The Myniq Framer export was studied as an interaction reference. Reverse-
engineering it produced one finding that shaped this entire system:

> **Myniq's homepage uses essentially one entrance animation, 89 times.**

Measured across the export: 89 elements carry the inline initial state
`opacity: 0; transform: translateY(60px)`, 3 carry `translateY(20px)`, and 4
hero elements have bespoke spring configs. Across all eight pages the ratio
holds — 337 reveals, one primitive.

The tuned hero springs are worth recording, because they are the reference's
actual timing signature:

```json
{ "y": 60,  "opacity": 0.001, "spring": { "damping": 80, "stiffness": 400, "mass": 1, "delay": 0.8 } }
{ "y": 150, "opacity": 0.001, "spring": { "damping": 80, "stiffness": 500, "mass": 2, "delay": 0.6 },
  "transformPerspective": 1200 }
```

Damping 80 against stiffness 400 is **over-damped** — it settles without ever
overshooting. There is no bounce anywhere in the reference. What reads as
sophistication is not variety; it is *consistency, generous travel distance,
and a long decelerating settle*.

That is the lesson this system is built on. It is also why this system has
eight reveal variants rather than one: Transpahire's page is editorially
composed, with directional two-column segments and product compositions that
warrant a different entrance from a paragraph. But the discipline is the same —
every variant shares one easing curve and one direction of travel.

**What was not copied:** the Framer runtime, the spring physics engine
(a tuned cubic-bezier is indistinguishable from an over-damped spring and costs
nothing), the character-by-character headline split, the triple-rendered
breakpoint variants, and the `div[tabindex]` accordion.

---

## 2. Principles

### Rule 1 — Motion communicates something

Every animation must be answerable: *what does this tell the reader?*

| Primitive | What it communicates |
|---|---|
| Reveal up | This is new; it is arriving now |
| Stagger | These have an order; read them in it |
| Slide left / right | These two halves belong together |
| Rise | This is a substantial object, not a line of text |
| Hover lift | This is interactive |
| Icon shift | This will take you somewhere, in this direction |
| Layer reveal | These parts assemble into one thing, in this sequence |
| Float | This is a live surface, not a screenshot |
| Count up | This quantity accumulated |
| Meter fill (P1) | This quantity has a magnitude relative to a whole |
| Sequenced beats (P2) | These parts assemble in this order, and *this* part is separate |
| List reorder (P3) | Your priorities changed the answer |
| Path draw (P4) | These two things are connected, and here is the connection |

If a proposed animation has no row in that table, it does not go in.

### Rule 2 — Motion feels expensive

Prefer: subtle displacement · smooth deceleration · controlled timing ·
meaningful stagger · restrained transforms · one gesture at a time.

Avoid: bounce · overshoot · rotation · aggressive scaling · random floating ·
constant idle movement · heavy blur · parallax you can notice.

The tell of expensive motion is that you feel the page respond without being
able to point at the animation.

### Rule 3 — Product visualisations may be more expressive

A dashboard mockup may float, parallax, or assemble in layers. Body copy, cards
and headings may not. Use **at most one** expressive primitive per composition:
a panel that floats *and* parallaxes *and* layer-reveals is not three times as
interesting, it is broken.

Phase 2 target: product motion should depict something real —

```
Dashboard → metric updates → candidate card appears → signal changes → recommendation appears
```

The layer-reveal primitive exists for exactly this. Until Phase 2 confirms the
product surfaces, it is demonstrated on the lab page with generic panels.

### Rule 4 — Reduced motion is respected

Enforced at the **token layer**, not per component: under
`prefers-reduced-motion: reduce`, every travel distance goes to `0px`, every
duration to `1ms`, every stagger to `0ms`, and `--motion` to `0`. A component
physically cannot opt out.

`motion.css` § 6 additionally stops the two things a token cannot reach:
infinite animations (`.float`) and scroll-linked transforms (`[data-parallax]`).

The preference is watched live (`prefs.js`), so toggling it at OS level updates
without a reload. Verify on `motion-lab.html` — the status pill reflects the
live state.

---

## 3. The primitives

```
Motion
├── Reveal      fade · up · down · left · right · scale · blur · rise
├── Stagger     fast (50ms) · normal (80ms) · slow (120ms)
├── Hover       lift · scale · icon shift · border · background · press
├── Product     float · parallax · layer reveal
├── P1…P4      meter fill · sequenced beats · list reorder · path draw
├── Navigation  scroll state · drawer · link cascade
└── Utility     tab crossfade · accordion · count up
```

### Reveal — `motion.css` § 1

```html
<div data-reveal="up">…</div>
<div data-reveal="up" data-reveal-distance="lg">…</div>
```

| Variant | Transform | Duration | Use for |
|---|---|---|---|
| `fade` | opacity only | 620ms | Anything inside an already-transformed parent |
| `up` | +28px Y | 620ms | The default. ~80% of reveals |
| `down` | −28px Y | 620ms | Elements that belong above their trigger |
| `left` / `right` | ∓28px X | 620ms | Paired across a two-column segment |
| `scale` | 0.94 → 1 | 820ms | A self-contained panel arriving whole |
| `blur` | 12px blur + 16px Y | 820ms | **One per view.** Hero-weight headlines only |
| `rise` | +64px Y, 0.97 scale | 820ms | Product compositions |

Distance override: `sm` 16px · `md` 28px · `lg` 48px · `xl` 64px.
Travel scales with the object — a line of type moves a little, a dashboard
moves a lot.

**`blur` is rationed.** Filter animation is the most expensive thing here and
the loudest. Three uses exist on the homepage: the H1, the interlude quote, and
the philosophy statement in section 11. A fourth would need to displace one of
those, and `tools/check.mjs` fails the build if a fourth appears.

### Stagger — `motion.css` § 2

```html
<div class="grid grid--3" data-reveal-group data-stagger="normal">
  <article class="card">…</article>
  …
</div>
```

`reveal.js` writes a `--i` sibling index onto each child; CSS computes
`min(--i, 8) × step`. Unlike an `:nth-child` ladder this has **no ceiling** — a
24-card grid staggers correctly, where the previous implementation silently
dropped everything past the tenth.

| Speed | Step | Use |
|---|---|---|
| `fast` | 50ms | Six or more items — reads as one gesture |
| `normal` | 80ms | The default, two to five items |
| `slow` | 120ms | Sequences where order carries meaning |

Stagger is a hierarchy device. **A group whose items have no order should
reveal together, not in sequence.** The delay is a claim that one thing follows
another; do not make that claim falsely.

`data-reveal-skip` on a child removes it from the cascade without breaking the
indices of its siblings.

### Hover — `motion.css` § 3

Classes, because hover belongs to a component rather than to a moment.
All are gated behind `@media (hover: hover) and (pointer: fine)` — a touch
device fires `:hover` on tap and would otherwise leave elements stuck.

| Class | Effect |
|---|---|
| `.hover-lift` | −3px, border darkens, shadow deepens. The card gesture |
| `.hover-scale` | Child media scales 1.03. **Media only** — never text |
| `.hover-icon` + `.icon-shift` | Arrow moves 3px. Fires on `:focus-visible` too |
| `.hover-border` | Border strengthens. For outline-only surfaces |
| `.hover-bg` | Ground shifts. Table and list rows |
| `.press` | Scales to 0.99 on `:active`. **Not gated** — the only affordance a touch user gets |

`.hover-lift` on a `.card` also picks up the icon accent — one gesture, four
coordinated changes. That coordination is what makes it read as considered
rather than as four transitions.

### Product — `motion.css` § 4

**Float.** 6px over 7 seconds. Below the threshold where the eye tracks it as
animation, above the threshold where the panel reads as inert. `--delayed`
(−2.4s) and `--slow` (11s) desynchronise a pair. **Never more than two in one
viewport.**

**Parallax.** `data-parallax="0.02"` — a signed fraction of scroll distance.
Deliberate constraints, because parallax is the effect most likely to tip a
page from considered into gimmicky:

- Capped at ±40px regardless of what an element requests.
- Zero offset as the element passes the viewport centre, so it sits at its
  authored position at the moment it is read.
- Offscreen elements are skipped; updates are rAF-batched.
- Disabled on coarse pointers (frame cost on phones, reads as jitter under
  momentum scrolling) and under reduced motion.

Homepage usage is `0.02` on three segment visuals — roughly 18px of travel.
If you can point at the parallax, it is too strong.

**Layer reveal.** `data-layers` on a stack; children arrive 120ms apart.
This is the one product primitive that carries real information: *these parts
assemble into one thing, in this order*. It is the intended foundation for the
Phase 2 product visualisations.

### Product primitives — `motion.css` § 4b

Four primitives added in Phase 3, for the product compositions specified in
`docs/phase-2/08-PRODUCT_VISUALIZATION_SPEC.md`; P5 composed in Phase 4; P6
added in Phase 6 for the landing page's signature. Each is demonstrated in
isolation in `motion-lab.html` § 4b–4c, and each is here *because* it is used —
P1 by five compositions, P2 by the explain panel's sequence, P3 twice, P4 once,
P5 once, P6 once. A primitive that stops being used should be deleted rather
than kept for symmetry.

#### P1 — Meter fill

```html
<span class="meter" aria-hidden="true">
  <span class="meter__fill" style="--meter-v: .84"></span>
</span>
```

**Communicates:** this quantity has a magnitude relative to a whole.
`scaleX` from a left origin, 620ms on `--ease-entrance`. Transform-only, so it
cannot trigger layout. `--meter-v` is a unitless 0–1 fraction written once by
whoever renders the meter.

Released by any revealed ancestor — a plain reveal, a layer stack, a running
sequence, or `.is-filled` for a meter driven by a control rather than by scroll.
Armed only under `html.js`: with no JavaScript the bar renders at its true width
immediately, because the value **is** the content and not a decoration of it.

Used by C2's five dimensions, C8's candidate-side dimensions, C10's résumé
quality. The most reused of the four.

#### P2 — Sequenced reveal with per-beat offsets

```html
<div data-sequence>
  <p data-beat="0">…</p>
  <span data-beat="1400">…</span>       <!-- the partial chip, alone -->
  <text data-beat="900" data-beat-fade>…</text>
</div>
```

**Communicates:** these parts assemble in this order, and *this* part is
separate. `data-layers` gives a fixed 120ms cadence; a storyboarded sequence
needs specific beats, because its pauses are the information. The section 06
table is in `docs/phase-2/07-MOTION_STORYBOARD.md § 4`; its two carrying pauses
are the partial chip alone at 1400ms and the four signals last at 2420ms.

`modules/sequence.js` writes `--beat-delay` from each beat's own number, fires
once when the composition reaches the viewport, and releases the compositor
hints when the last beat has settled. `--beat-delay` **inherits**, which is how a
meter or an SVG path inside a beat picks up that beat's timing without being
told about it separately.

| Attribute | Effect |
|---|---|
| `data-beat="1400"` | places the element at an absolute 1400ms |
| `data-beat-fade` | fades only — for SVG text and dashed strokes, where a translate would slide a label off the geometry it names |
| `--beat-y` | overrides the travel distance for one beat, in terms of a token |

**Two deviations from `07 § 5`'s sketch,** both deliberate and both recorded
here because the sketch is the more obvious design:

1. **Absolute, not additive.** `07 § 5` proposes `data-layer-delay="200"` adding
   to a computed cadence offset. The storyboard it serves is an absolute beat
   table, and expressing an absolute table as a chain of relative offsets makes
   every beat depend on the one before it — which is how a sequence silently
   drifts when one beat is edited.
2. **Any depth, not direct children.** `[data-layers] > *` can only address
   direct children; the explanation panel's beats sit three levels down. A
   sequence that could only reach the top level would have forced the panel's
   structure to follow the animation, which is backwards.

`resetSequence()` and `playSequence()` are exported so the candidate switcher can
replay the sequence once — the first switch replays it in full, and later
switches crossfade per field, because watching the same two-second build three
times is tedious.

#### P3 — List reorder

**Communicates:** your priorities changed the answer. **This is the one
animation on the site that *is* the information** rather than a decoration of
it: the movement is what tells the reader the ranking responded.

A FLIP — measure every row, put the rows in their new order, transform them back
to where they were, release. 320ms on `--ease-standard`. No absolute
positioning, so the list keeps its own height and nothing below it moves, and
nothing animates a layout property.

Exported from `modules/tuner.js` as `reorder(list, order)` so the lab page can
demonstrate it on its own. Used by section 08's importance controls, and again by
section 07's payoff beat.

Under reduced motion the DOM is reordered with no transform at all, which
repositions instantly: the new order is the information and it survives — only
the movement is dropped.

#### P4 — Path draw · **a documented exception**

**Communicates:** these two things are connected, and here is the connection.
Used once, by C3's skill-relationship graph in section 07.

```html
<path class="edge__path" d="M350 232 L350 106" data-beat="400"/>
```

> **`stroke-dashoffset` is not in the `transform` / `opacity` / `filter`
> allowlist that `CLAUDE.md` § 3 rule 6 sets.** This is the only place on the
> site that animates a property outside it, and there is no transform that draws
> a line along itself.

The exception is deliberate and bounded. Its terms:

- **Six paths maximum on a page.** Section 07 draws one; a second edge fades,
  because a dashed line cannot animate a dash offset. `tools/check.mjs` enforces
  the cap.
- **This primitive only.** Nothing else may animate a non-allowlisted property.
- **Short, simple paths.** A long complex path is where the cost stops being
  negligible.

The dash offset is measured from the path's own length at run time rather than
authored: the geometry is responsive, so an authored length would be wrong at
every width but one. With no JavaScript, or under reduced motion, the line is
simply there — a relationship the reader cannot see is a relationship the page
did not state.

#### P5 — Drawer reveal · **a composition, not a new animation**

Added in Phase 4, **re-hosted in Phase 5 and unchanged by it.**
**Communicates:** a row is selected, and the view opens into it. Used once, by
the homepage hero.

```html
<div class="workspace" data-drawer-reveal>     <!-- inside a [data-reveal] ancestor -->
  <div class="workspace__job">…</div>          <!-- header, pulse, tabs. Present at 0ms -->
  <div class="workspace__panes">
    <div class="workspace__list">…</div>       <!-- present on load -->
    <div class="workspace__drawer">…</div>     <!-- slides in over it, from 42% -->
  </div>
</div>
```

The drawer translates in from the right over `--dur-medium` on
`--ease-entrance`, 120ms after its ancestor reveals.

**What Phase 5 changed, and what it did not.** The composition was rebuilt: the
drawer is inset to **42%** rather than 22%, it is **tabbed**, and the two panes
now share a `.workspace__panes` positioning context. The animation is
byte-for-byte the one Phase 4 shipped — not one declaration in `motion.css` § 4b
moved.

That is the test of whether P5 was documented correctly. A primitive recorded as
*a pair of existing primitives pointed at one composition* should survive that
composition changing shape without the motion system moving, and it did. A
primitive recorded as *the hero's drawer animation* would have needed an edit.

The sequence, stated as beats because the ordering is the claim:

```
   0ms   the frame, the job header, the pulse strip, the tabs and the list are
         all present — this is above-the-fold content and it does not wait
 240ms   the drawer translates in from the right
 240ms   the list does NOT dim — see the deviation at the end of this entry
```

**Why it is documented as a composition rather than as a fifth primitive.** It
reuses two things the site already had — the nav drawer's translate-and-fade, and
the `tp-panel-in` entrance — and adds no keyframe and no JavaScript module. Its
trigger is an ancestor's reveal, exactly like P1's meter fill, which is also why
the drawer is simply *there* with JavaScript unavailable. A pair of existing
primitives pointed at a new composition is not a new primitive, and recording it
as one would mean the system grows an entry every time an old pair gets a new
job.

The exception it does need is a cap, and it has one:

- **One per page.** `tools/check.mjs` enforces it alongside the P4 path cap. A
  page with two drawers sliding in has an animation, not a statement.
- **Above the fold is allowed, this once.** `CLAUDE.md` says above-the-fold
  content reveals immediately and the hero must not ask for work. P5 is a
  one-shot entrance on load that completes inside `--dur-medium`, not an
  interaction — and there is deliberately no click-to-open behaviour in the
  hero. The site's interaction budget stays where it was, in § 06 and § 08.

**Reduced motion:** the drawer is present, static, at full opacity, with the list
at full opacity behind it. An absent drawer is not a calmer version of the
composition; it is half the composition missing. Verified on `motion-lab.html`
§ 4b with the toggle on.

**One deviation from the plan, and it is an accessibility one.**
`docs/phase-4.md` § 3.1 asks for the list pane to drop to 60% opacity behind the
drawer. It does not. Sixty per cent opacity on a real text element takes the
row's secondary line to roughly 2.5:1 against paper, which fails AA, and
`CLAUDE.md` § 3 rule 5 outranks a number in a plan sketch. The relationship is
stated better instead: the selected row carries `aria-current="true"`, which the
site already styles, so the connection is announced as well as drawn. The
drawer's entrance and its shadow carry the depth on their own.

#### P6 — Staged layers · **the score, taken apart**

Added in Phase 6, for one composition: the landing page's signature (scene 02).
Specified in `prototypes/STAGE-3.md` § 8, demonstrated in `motion-lab.html` § 4c,
implemented in `motion.css` § 4b with `assets/js/modules/scene.js` as its
clock.

```html
<div class="sig sig--pinned" data-signature data-thresholds="0.14,0.31,0.48,0.65,0.82" data-state="1">
  <div class="sig__stage">
    <div class="sig__persist">…the small 87…</div>
    <ol class="srail">…six steps…</ol>
    <div class="sig__layers">
      <div class="layer layer--1" data-layer="1"><p class="layer__cap">…</p><div class="layer__body">…</div></div>
      … ×6: list · score · weights · skills · evidence · candidate
    </div>
  </div>
</div>
```

**Communicates:** one object has six layers, and the scroll takes it apart in
order — verdict → mechanism → evidence → source → shared result. The visitor
reads a ranked row, its 87, the four published weights the 87 is made of, the
skills those weights open into, the one cited line a match came from, and the
same number on the candidate's own screen.

**The scroll is the clock.** `--p` runs 0 → 1 across a stage
`--scene-length` (2.6) viewports tall whose sticky box is (viewport − header)
tall, with an 800px cap on the layer area. Boundaries at 0.14 · 0.31 · 0.48 ·
0.65 · 0.82; window 0.055. Each boundary *t* has the outgoing layer leaving over
[*t* − 0.055, *t*] and the incoming one arriving over [*t*, *t* + 0.055], so **two
layers are never on screen together** — at *t* the stage holds one caption and,
in states 4–5, the small 87. `tools/audit.mjs` samples eighteen positions and
fails if any two layers are visible at once.

| State | Arrives (`--a` 0 → 1) | Leaves (`--d` 0 → 1) |
|---|---|---|
| all | opacity a·(1−d); translateY (1−a)·48px − d·40px; scale 0.96 + a·0.04 − d·0.05; origin 50% 40% | |
| 1 list | already present | unselected rows fade with d; the selected row last |
| 2 score | as all | scale + d·0.35 from origin 18% / 42%: the 87 grows past itself |
| 3 weights | translateY (1−a)·−32px (from above); each bar scaleX(a); row *i* translateY (1−a)·(i·18 + 8)px | as all |
| 4 skills | row *i* opacity clamp(a·2.4 − i·0.28); translateX (1−a)·16px | as all |
| 5 evidence | as all | as all |
| 6 candidate | as all | holds to 1.0 |

The 87 becomes the four bars **once**, between states 2 and 3, and nowhere else.

**Two clocks, one number.** Where the browser supports a `view()` scroll
timeline, CSS drives `--p` itself (`@property --p`, a keyframe from 0 to 1,
`animation-range: contain 0% contain 100%`, inset by the header) and
`scene.js` keeps only the rail and `data-state`. Everywhere else one passive,
rAF-throttled scroll listener writes `--p` from the same range — the pin
starts when the stage's top reaches the header line and ends when its bottom
reaches the viewport's — so a Chromium visitor and a Firefox visitor see the
same state at the same scroll position. **The timeline hard-codes the header
inset** (`view(block 64px 0px)`) because `animation-timeline` cannot read a
custom property; `scene.js` reads `--header-h` at run time, and
`tools/check.mjs` asserts the stylesheet's number equals the token. Change the
header height and the check fails until the timeline follows.

**Only `transform` and `opacity` move.** The six layers are absolutely
positioned and carry `will-change` only while the stage is within a viewport
of its pin (`is-near`, set by `scene.js`); off screen the hint is released,
as every other primitive releases its own.

**The stack is the base, not the fallback.** Without JavaScript, under reduced
motion, below 700px wide or 620px tall, the same six layers are six frames in
reading order with sticky captions, every one complete, nothing hidden. The pin
is an enhancement scoped to `html.js` and `:not(.sig--static)`; a media-query
backstop covers the frames before `scene.js` runs. Every layer carries an
sr-only sentence, so a screen reader hears the same argument in the same order
whether or not the stage pins.

**Cap: one per page**, enforced by `tools/check.mjs` alongside P4's and P5's.
One pinned stage is a signature; two is a scrolljacked site.

**The rejection it lifts, and on what condition.** § 3's Rejected table turned
down scroll-scrubbed and pinned sequences because reduced motion had no honest
fallback for content that only exists at certain scroll offsets. P6 is admitted
because it answers exactly that objection: every state is a still, every layer
is complete DOM in reading order, and the fallback is the same markup with no
animation at all. It does not reopen the door for the explain panel's sequence,
which still has to be *read* and is still P2.

**Not needed, and not built:** decimal counting (every score on the site is a
0–100 integer, so `counter.js` works unmodified and `data-decimals` is used
nowhere); a crossfade primitive (the tab crossfade covers the section 04 search
mode switch); spring physics (a tuned cubic-bezier is indistinguishable from an
over-damped spring and costs nothing); **a ring-draw primitive** — the score
ring's arc is set, not animated, because animating it would mean a second
`stroke-dashoffset` exception and P4 already holds the only one. The ring arrives
on its beat and the numeral counts, which is how every other score on the site
behaves.

### Utility — `motion.css` § 5

**Tab crossfade.** Incoming panel fades up 8px over 320ms. No height animation —
the frame is a fixed aspect ratio, so there is nothing to reflow.

**Accordion.** Height animates `grid-template-rows: 0fr → 1fr`. No JS
measurement, no `max-height` guesswork, no jump when content reflows at a
different breakpoint. The grid child must be a bare wrapper with no padding —
padding on it survives `min-height: 0` and leaves collapsed panels propped open.

**Count up.** Ease-out cubic over 1400ms. The element reserves its final width
in `ch` before counting so growing digits cannot shift layout, and the true
value stays in the accessibility tree throughout — a screen reader is never
read a stream of intermediate numbers.

**Navigation.** Header gains a translucent substrate past 12px of scroll — a
substrate change, not a movement. The drawer slides 12px and its links cascade
in at 50ms. `visibility` flips instantly on open and is delayed to the end of
the close transition; without that the drawer is still `visibility: hidden`
when focus is moved into it and focus silently fails.

---

### The budgets

Motion is a budget, not a palette. Spending it evenly produces a page where
nothing stands out. `docs/phase-2/07-MOTION_STORYBOARD.md § 1` sets these, and
`tools/check.mjs` enforces the two that are rules rather than preferences.

| Resource | Cap | Spent on, the landing page (Phase 6) |
|---|---|---|
| `data-reveal="blur"` | **3 per page** | none — the eight scenes use rise and up only; the cap stands for the sub-pages |
| `.float` | **2 per viewport** | none on the landing page |
| `data-parallax` | 0.02, three uses | none on the landing page |
| Expressive primitive per composition | **1** | 02 P6 stage · 04 P3 filter · 05 P2 sequence · 06 P3 reorder |
| Interactive product elements | **3** | 04 pool chips · 05 candidate switcher · 06 controls + what-if |
| P4 paths | **6 per page** | none on the landing page (the graph lives on /product/matching) |
| P5 drawer reveals | **1 per page** | 01 hero |
| P6 stages | **1 per page** | 02 the score |

The interactive budget was two through Phase 5 and is three as of Phase 6: the
Stage 3 prototype was approved with the pool's filter chips, the switcher and
the tuner, and each one changes what the list shows rather than decorating it.
A fourth was not proposed. The old rule's reason stands: a page of toys reads
as a demo rather than as a product.

### Rejected

Recorded so they are not re-proposed. Phase 4 added the last two rows.

| Idea | Why |
|---|---|
| Scroll-scrubbed or pinned sequences | **Lifted once, in Phase 6, for P6 only** — see its entry for the condition. The reason still governs everything else: it takes the animation's pacing away from the reader and gives it to their trackpad, and the explain panel's narrative has to be *read*. Sticky sections fight `scroll-padding-top` and the fixed header, and a pinned sequence is only honest when every state is a still and the fallback is the same content in flow |
| Typewriter on the AI narrative | 200+ characters: three seconds to type, unreadable while it moves, breaks selection and copy, and reads to assistive technology as a stream of partial words. "A machine is typing" is not a claim this product needs |
| A cursor animation "operating" the product | Fake agency. If it is worth operating, let the visitor operate it |
| Idle animation on the ranked list | Rule 2: no constant idle movement. `.float` on a whole panel is the sanctioned exception |
| Animating the skill graph continuously | Section 07 draws once and settles. An idly pulsing network diagram is the "glowing blob" of technical marketing |
| A live-looking counter on the what-if pool figure | It counts once, on toggle, and stops. A number that keeps moving implies live data, and the figure is a labelled example |
| Number tickers on anything that is not a real value | There are no real metrics to tick |
| Animating the score ring's arc | It would be a second `stroke-dashoffset` exception, and P4 already spends the only one the site has. The ring arrives on its beat and the numeral counts — a ring that draws while its number counts is two animations describing one value |
| Dimming the list behind the hero drawer to 60% | Fails AA on the row's secondary line. `aria-current` on the selected row states the same relationship and is announced as well as drawn. See P5 |

## 4. Timing reference

```
--ease-entrance  cubic-bezier(0.16, 1, 0.3, 1)   the house curve
--ease-standard  cubic-bezier(0.4, 0, 0.2, 1)    hover, state
--ease-inout     cubic-bezier(0.65, 0, 0.35, 1)  float, accordion
--ease-exit      cubic-bezier(0.4, 0, 1, 1)      leaving the screen

--dur-instant 120ms   colour on a small control
--dur-fast    180ms   hover
--dur-medium  320ms   tab, accordion, menu
--dur-slow    620ms   section reveal — text, cards
--dur-slower  820ms   section reveal — large compositions

--travel-sm 16px · --travel-md 28px · --travel-lg 48px · --travel-xl 64px
--stagger-fast 50ms · --stagger-normal 80ms · --stagger-slow 120ms
--lift -3px · --lift-small -1px · --nudge 3px
```

Two rules generate all of it: **durations lengthen as the moving object gets
larger**, and **everything decelerates** — no entrance uses an ease-in.

---

## 5. Behaviour worth knowing

**Content is never dependent on a script.** Pre-reveal hidden states are scoped
to `html.js`. With JavaScript disabled, blocked, or still parsing, the page
renders fully readable. A 2.5s safety net force-reveals anything an observer
never fired for — print, an offscreen iframe, a prerenderer, a content blocker.

**Above-the-fold content does not animate in.** Anything intersecting the
viewport at first paint is revealed immediately, without transition. Animating
content the reader is already looking at reads as a page that has not finished
loading.

**Reveals fire once.** Observers unobserve after firing; scrolling back up does
not replay.

**A sequence plays even if it is already on screen** — unlike a reveal, which is
skipped for above-the-fold content. A sequence is the composition's own
explanation of itself, and skipping it would leave the visitor looking at the
answer with no argument. It is also why no `[data-sequence]` sits above the
fold: the hero is deliberately static, because it must be instantly legible
rather than impressive.

**The one interaction that replays a sequence does it once.** The section 06
switcher replays the full build on the first switch and crossfades per field
after that.

**Compositor hints are released.** `will-change` is removed 2s after a reveal
via an `is-settled` class. A permanent `will-change` on thirty elements is a
memory cost with no benefit once the animation has run.

---

## 6. Adding a primitive

1. Justify it against Rule 1 — name what it communicates.
2. Add it to `motion.css` in the correct section, using existing tokens. If it
   needs a new duration or distance, add the token first.
3. Add a swatch to `motion-lab.html` demonstrating it in isolation.
4. Verify with reduced motion on. If it needs a special case, it is probably
   wrong.
5. Document it here.

6. **If it animates a property outside `transform` / `opacity` / `filter`,
   stop.** There is exactly one such primitive on this site (P4) and it is
   recorded as a bounded exception in § 3 with a cap that `tools/check.mjs`
   enforces. A second one needs the same treatment or it needs a different
   design.
7. **Give it a budget.** Every primitive in § 3 has a cap, and the two that are
   rules rather than preferences are checked automatically. A primitive with no
   cap gets used everywhere, which is how a page ends up with nothing standing
   out.

If a primitive cannot be justified on the lab page, it does not belong in the
system. Conversely, a primitive on the lab page that nothing uses after two
phases should be deleted.
