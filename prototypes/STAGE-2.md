# Transpahire — Stage 2

## Creative exploration, visual directions and interactive prototyping

Written for: the Transpahire founder making the Stage 3 design decision, and
whoever builds it.

Date: 26 September 2026. Source of truth: the Stage 1 Design Intelligence
report (Claude Doc, 26 Sep 2026). Nothing in production changed; `node
tools/check.mjs` passes on all twenty-four pages exactly as before.

**Run it:** `node tools/serve.mjs`, then open `http://localhost:4321/prototypes/`.
The board links every prototype; the floating tag on every prototype links back.

---

## 01 — Prototype overview

Eleven prototype pages, one board, one proposed data fixture, and a prototype
layer of three stylesheets and three scripts. Every page wraps the **production
document shell** (real header, footer, fonts, icon sprite, the five production
stylesheets) and appends the prototype layer after it, so the prototypes add to
the site and cannot drift from it.

| # | File | What it is |
|---|---|---|
| A1 | `hero-a1.html` | Editorial product: headline at the top of the scale, support in the right column, the real workspace full width beneath |
| A2 | `hero-a2.html` | Evidence first: the claim, then the chain row → 87 → four weights → cited line as one diagram |
| A3 | `hero-a3.html` | Product as the hero: compact head, workspace edge to edge, one route line for chrome |
| B·V1 | `score-v1.html` | The score, taken apart — subtle: layers crossfade and rise 24px, like a page turning |
| B·V2 | `score-v2.html` | Cinematic: layers rise from 64px and scale in; the outgoing layer recedes; the 87 persists top-right while its parts show |
| B·V3 | `score-v3.html` | Experimental: the 87 grows past itself and the weights emerge from it; the list stays as a ghost; the evidence slides in from the right; the candidate view rises like a phone |
| B·S | `score-static.html` | The static composition every execution falls back to |
| C | `tuner.html` | The tuner with the proposed fixture, the gate, the what-if marking rows, and the phone's list-first layout |
| D·01 | `page-v1.html` | Editorial: A1 hero, stacked signature, no pins |
| D·02 | `page-v2.html` | Product editorial: A3 hero, pinned V2 signature, pinned tuner |
| D·03 | `page-v3.html` | Experimental editorial: A2 hero, pinned V3 signature, pinned tuner |
| — | `index.html` | The board: links, a four-width live viewer, the comparison board, the checklist, the recommendation |

**Where the code lives.** `prototypes/lib/parts.mjs` holds every composition;
`prototypes/lib/shell.mjs` wraps the production document; `prototypes/build.mjs`
writes the pages; `prototypes/css/proto-tokens.css` is the token diff (Palette
01 and the type pass); `prototypes/css/proto.css` the scene layouts and phone
crops; `prototypes/css/signature.css` the stage and its three mappings;
`prototypes/js/scene.js` the scroll clock; `prototypes/js/tuner-proto.js` the
control; `prototypes/lib/rankings-proposed.mjs` the fixture and its reasons.

**What was reused rather than authored.** `jobWorkspace()`, `jobHeader()`,
`pulseStrip()`, `tabStrip()`, `listToolbar()`, `rankedList()`, `drawerHead()`,
`explainPanel()`, `scoreRing()`, `switcher()`, `criticalGate()`,
`candidateView()`, `candidateWorkspace()`, `missionConsole()`,
`marketCovered()`, and P3 (`reorder`), P2, P5 and the counters from the
production modules. The pieces authored here are stagings of the data module,
not new product surfaces.

---

## 02 — Hero variations

All three answer the four-second questions (what, who, why, and the product)
in one screen, render at first paint with no blur, no count-up and no
reveal gate, and keep every control in the composition inert. Eyebrow:
"Hiring platform · for talent teams" (still a wording decision, per Stage 1).
Headline: "Every shortlist *explains itself.*" Support, in the sans: "Every
candidate scored against the role out of 100, and every point traced to the
line of the profile it came from."

**A1 — Editorial product.** The headline reaches 104px at 1440 because it has
the full width; the support sentence and the two CTAs sit in the right column,
bottom-aligned to the headline's baseline; the workspace runs the full
container beneath. At 1440×900 the frame chrome, job header, pulse strip, tabs,
toolbar and three ranked rows are above the fold, with the drawer opening on
Sneha Iyer's 87. Pass condition met.

**A2 — Evidence first.** The claim, then a ruled chain of four steps with
hairline leaders: the ranked row (Sneha Iyer, Shortlisted, 87) → the 87 at
120px with Strong match and High confidence → the four weights as rows →
"Kubernetes → container orchestration · transferable · Experience · 78% ·
✓ verified" with the profile line in the highlighter. The visitor reads the
differentiator without a paragraph. The cost: no chrome on the first screen,
so "is it real software?" is answered one screen later.

**A3 — Product as the hero.** The head is compact (80px display), then the
workspace runs edge to edge on a raised surface with one route line and no
frame. The fold cuts the list mid-row. This is the composition where the
website opens into the product. It is the hero of variation 02.

**Phone (390×844).** All three share one crop: headline at 48px, one sentence,
one block CTA, then the job header, a compact four-tile pulse strip, the tab
strip and two to three rows on the first screen; the drawer follows as a
cropped sheet ending on the two-sentence verdict. Rows are three tracks and
nothing scrolls sideways. One exception is recorded: the pulse labels in the
phone crop are 8px, below the 11px floor; see § 12.

---

## 03 — Signature interaction: the score, taken apart

Six layers of one object, each a real DOM state in reading order with its own
caption and sr-only sentence, on a sticky stage 2.6 viewports long. A scroll
clock (`scene.js`, forty lines, rAF-throttled) writes two values onto the
stage: `--p`, 0 → 1 across the scroll length, and `data-state`, 1 → 6. CSS maps
those to opacity and transform and to nothing else. Each layer has an arrival
window and a departure window (7% of the track each); the last layer holds
from 82% to the end. A rail on the left fills as the states pass so the pin
never feels like a trap.

| State | Layer | Caption | Built from |
|---|---|---|---|
| 01 | The ranked list, Sneha Iyer selected | Ranked. 47 people scored against the role. Sneha Iyer first, at 87. | `rankedList()` tracked |
| 02 | The 87 at 220px, Strong match, AI, High confidence | The score. | `scoreRing()` |
| 03 | Four rows: 65 / 25 / 7 / 3, then the three modifiers in order, then the gate | Four weights, published. Salary is a ±10% adjustment after, not a fifth weight. | `DIMENSIONS`, `MODIFIERS`, `CRITICAL_GATE` |
| 04 | Skill coverage 65% opens into five rows: Python exact 96, Distributed Systems ≈ equivalent 91, PostgreSQL exact 94, Kubernetes transferable 78, Kafka not found | Every skill, matched. | `EXPLAIN.c1` |
| 05 | Kubernetes → container orchestration, the Docker → Kubernetes *requires* edge at 0.9, the reason, the quoted line in the highlighter, ✓ verified, 78% | Every match, cited. | `EXPLAIN.c1.partial[0]`, `SKILL_EDGES` |
| 06 | The candidate's own screen: 87, "the same score the recruiter sees", the four dimensions with weights, Applied → Viewed → Shortlisted | The same number, on her screen. | `candidateView()` data |

**V1 — Subtle.** Opacity plus a 24px rise on arrival and a 12px lift on
departure. Nothing scales. It feels like an editorial page turning, and it is
the mapping variation 01 would use if it pinned.

**V2 — Cinematic.** Arrival: 64px rise and scale from 0.95. Departure: the
layer recedes 56px and scales to 0.93 as it fades, so the next layer arrives
in front of it. In state 1 the unselected rows fade before the selected one.
In state 3 the weight bars fill as the layer arrives (P1's meaning: this
quantity has a magnitude). From states 3 to 5 a 56px 87 persists top-right:
the parts are still it.

**V3 — Experimental.** State 1 → 2: the list shrinks to 40% and moves to the
bottom-left, where it stays at 30% opacity as a ghost. State 2 → 3: the 87
scales past its own size before the weights layer arrives, and the four bars
grow out of zero while their rows fan down. State 4: skill rows arrive one
after another. State 5: the evidence layer enters from the right and the
source card lands with a 0.6° settle. State 6: the candidate view rises 28vh
from the bottom and scales up like a phone brought into frame.

**The static fallback is a composition.** Six frames in flow, each with its
caption sticky beside it. It is reached three ways and the markup is the same
in all three: `.sig--stacked` (authored, used by variation 01 and
`score-static.html`), `.sig--static` (set by the scroll clock under reduced
motion, below 700px wide, or below 620px tall), and `html:not(.js)` (the
inline `js` class never lands, so the sticky rules never apply). Verified with
the reduced-motion media feature emulated: the page unpins, every layer is
complete, and the page height goes from 3,971 to 4,592.

---

## 04 — Tuner prototype

**The finding it answers.** The production fixture never reorders for the
advertised move: Sneha Iyer is first in all sixty-four combinations. The
prototype ships a **proposed fixture** (`prototypes/lib/rankings-proposed.mjs`,
frozen into a browser lookup table at build) authored the same way as
`tools/rankings.mjs` with two changes taken from the product's own model:

1. **The gate is real.** A skill set to Critical disqualifies everyone missing
   it at the retrieval layer, before scoring. The row loses its ring, reads
   "Not scored · missing critical · Kafka", carries a rose rule, and drops
   last. The list head counts them.
2. **A partial counts for less the higher the tier** (0.75 · 0.5 · 0.4 · 0.2).
   A transferable skill is a small risk on a bonus requirement and a large one
   on a critical one.

The default combination reproduces the six published scores exactly (87 · 81 ·
78 · 74 · 68 · 61) and their published classifications. Fifteen distinct
orderings across the sixty-four combinations, against the production fixture's
much narrower set.

**What the visitor sees.**

- Kubernetes → Critical: Rahul Verma (production Kubernetes) rises to 90 above
  Sneha Iyer (Docker experience transferring), who stays at 87; Meera Krishnan
  passes Rishav Ranjan. Rows that moved carry ▲ 1 / ▼ 1 for two seconds.
- Kafka → Critical: five people are not scored; Rishav Ranjan, the only one
  with Kafka, is alone at 87. "A requisition with seven criticals is not a high
  bar, it is an empty list" is now something the page shows.
- What if · drop Kafka: the example pool figure counts 248 → 417 (labelled an
  example) **and** the five rows missing Kafka flip ✗1 → ✗0 in green, so the
  simulation acts on the list, not only on a number.
- The chip convention from Stage 1: "you set the tier · engine re-ranks",
  ink-outlined for the person, filled indigo for the engine.

**Layouts.** Desktop: the control column is sticky beside a large list.
Tablet: two columns, nothing sticky. Phone: **list first**; one control
(Kubernetes) rides sticky under the header; "Show all three controls"
discloses the other two and the what-if. The reorder happens in view.

Range inputs are 44px tall with 24px thumbs; `aria-valuetext` carries the tier
word; a live region announces the new first name and the gated count.

---

## 05 — Complete landing page

Eight scenes, three grounds (paper · paper · ink · bone · paper · paper · ink ·
ink→indigo), three tempos.

| # | Scene | Tempo | Headline | Composition |
|---|---|---|---|---|
| 01 | The claim | Statement | Every shortlist *explains itself.* | A1 / A3 / A2 |
| 02 | The score | Demonstration | The score, *taken apart.* | Six layers, pinned or stacked |
| 03 | The problem | Reflection | A score you cannot question is an opinion with a number on it. | Type, ink, hard cut |
| 04 | The pool | Demonstration | Nobody is dropped for a word they didn't type. *Some are dropped for a requirement they don't meet.* | Ranked list with truthful filters and cited evidence on every row; the critical gate beneath it; the six relationship labels, the nine edge types and the worked Docker → Kubernetes edge in a sticky rail |
| 05 | The argument | Demonstration | It will tell you what's wrong with *its own top pick.* | The full explain panel in a frame, sequenced on reveal, with the three-candidate switcher; every cited line in the highlighter |
| 06 | The control | Demonstration | You decide what counts. *It does the arithmetic.* | The tuner (§ 04) |
| 07 | The system | Reflection → demonstration | Transparency that only runs one way *is just a dashboard.* | Always-On Sourcing console with its refusals, Market covered with the labelled estimates including the zero row, the candidate's dashboard, the five beats |
| 08 | The close | Statement | The person you passed on *can see why.* Bring a role you're struggling to fill. | The candidate view in an ink frame, the 87 at 208px, the CTA pair, the two honest lines (no pricing, no logos) |

Six serif accents on the page (01, 04, 05, 06, 07, 08); scenes 02 and 03 carry
none. No card grid anywhere. Every "Move to…", search field, segmented control
and tab in the hero is a span.

**Three executions** differ in hero, in the signature's mode and mapping, and
in whether the tuner pins. Everything else is shared, on purpose: the decision
is about the direction's pressure, not about eight different scenes.

---

## 06 — Responsive views

Captured in headless Chrome at 1440×900, 1280×800 (checked), 768×1024 and
390×844, with scroll positions and the animations settled; the board's viewer
shows all four live.

- **1440.** Hero one-screen test passes on A1 and A3 (three rows above the
  fold). The pinned stage caps at 800px so layers never become billboards.
- **1280.** As 1440 with two rows above the fold.
- **768.** The workspace keeps all five row tracks; the pool sidebar and the
  argument's switcher fall under their compositions; the tuner is two columns
  with nothing sticky; the signature pins only if the viewport is at least
  620px tall.
- **390.** The phone crop (§ 02); the signature is the stack; the tuner is
  list-first; scene numbers voice as "04 / 08". Page heights: about 17,400px
  for variation 02 against 19,200 today. Shorter, and not yet the 14,000
  target; § 12 says where the rest comes from.

---

## 07 — Interaction map

| Element | Responds to | What changes | Why it is allowed |
|---|---|---|---|
| Hero composition | Nothing | Nothing | The hero may be dense; it may not be interactive |
| Signature stage | Scroll position | `--p` and `data-state` on the stage; the rail | The scroll is the clock; no control is drawn |
| Pool filter chips | Click, keyboard | Rows hide; survivors FLIP (production P3) | Your criteria changed the answer |
| Candidate switcher | Click, keyboard | The explain panel re-renders and replays its beats once (production) | Three outcomes, one of them not a hire |
| Tuner sliders | Drag, arrow keys | Scores recount, rings redraw, rows FLIP, gated rows lose their score, ▲/▼ markers, live announcement | You decide what counts |
| Kafka/Kubernetes at Critical | Same | Rows missing the skill become "Not scored", sort last, and are counted | The gate is the mechanism |
| What-if toggle | Click | The example figure counts; the affected rows' ✗ count changes | See who changes before you change the job |
| Show all three controls (phone) | Click | Two more sliders and the what-if disclose | The result stays the object |
| Board viewer select | Change | Four iframes load the chosen prototype | Stage 2 furniture only |

Not interactive, deliberately: the frame in the hero (Stage 1 proposed one
link; it is a decision, so it is left unwired), the skill-review pill, the
sourcing ledger.

---

## 08 — Motion map

| Motion | Where | Communicates (Rule 1 category) |
|---|---|---|
| P5 drawer slide, once, 320ms after first paint | Hero | A product state is transitioning: a row is selected and the view opens |
| Scroll-bound layer arrival and departure | Signature | A layer is being revealed |
| Weight bars filling as the layer arrives (V2, V3) | Signature state 3 | This quantity has a magnitude |
| The persisting 87 (V2) | Signature states 3–5 | Two pieces of information belong together: the parts and the score |
| The 87 scaling past itself before the bars grow out of it (V3) | Signature 2 → 3 | The score is constructed |
| Skill rows arriving in sequence (V3) | Signature state 4 | These parts assemble in this order |
| Evidence entering from the right (V3) | Signature state 5 | The line came from somewhere else: the profile |
| Candidate view rising (V3) | Signature state 6 | A different surface, the same number |
| Rail steps filling | Signature | Progress: the pin will release |
| P3 FLIP reorder, 320ms | Tuner, pool filters | The answer changed because you changed an input |
| Recount, ring redraw | Tuner | Something is being computed |
| ▲ / ▼ for 1.8s | Tuner | Causality: this row moved because of that change |
| P2 beats | Explain panel | These parts assemble in this order, and this one is separate |
| Reveals (rise / up) | Scenes 04–08 | Hierarchy; never on the hero |
| Hard cut | Scene 03 | A rest; a hard edit reads as intent |

Nothing loops, bounces, rotates, drifts, follows the cursor, types, glows, or
blurs. Only transform and opacity move, except P4's documented
stroke-dashoffset, which the pages do not use. Reduced motion: the token layer
collapses durations and travel; the stage unpins; every layer renders complete.

---

## 09 — Visual system

Expressed as a token diff in `prototypes/css/proto-tokens.css`. If adopted, it
becomes the diff for `tokens.css` and the file is deleted.

**Ground.** Paper #F7F6F2, bone #EFEDE7, hairlines #E3E1DA. Ink grounds stay
#0B0B1F. One wash in the hero's top-left corner and one under the closing band,
both static.

**Ink and text.** Display and strong text #1A1A2E; body #3A3A4C; muted
#6B6B7D. The failing #9A9AB0 is retired for text (kept for dots and route
chrome). Indigo #4F46E5 unchanged on paper; #818CF8 for text-size indigo on
ink.

**The highlighter.** `--wash-evidence: #FFF1A8` with the ink type on it. It
appears on cited profile lines and nowhere else: the explain panel's quotes,
the pool rows' evidence snippets, the A2 chain's fourth step, the signature's
fifth layer. It is a wash, never a glow, and it always carries the section
label or ✓ verified beside it.

**Chips by actor.** `.chip--engine` filled indigo wash; `.chip--human` ink
outline on paper. One convention, no second hue.

**Type.** Space Grotesk 500 display 48 → 104px at 0.98 and −0.03em; H2 32 →
64px; quote 36 → 72px; the lede in Manrope at 18 → 22px, 1.45; mono labels at
12px with +0.14em tracking (11px floor inside compositions, one crop exception
noted); a data role at 13 → 15px, tabular, untracked, for every score, weight,
percentage and citation. Instrument Serif italic only on the accent, at most
six per page.

**Space and layout.** The 4px ramp, the 1,280px container and the fluid
section rhythm are unchanged. A 200px rail heads every non-terminal scene with
"NN / 08 · name". Added: `--scene-length` (2.6 viewports), `--pin-length`
(1.5), `--dur-scene` (1,400ms).

**Surfaces and frames.** Depth is provenance: a verdict on raised white, its
working on paper, the source line in the highlighter. Frames lose the three
dots and keep the route line. A3's workspace has no frame at all.

---

## 10 — Design differences

**What is shared.** The eight scenes, the copy, the data, the pool, the
argument, the system and the close are identical across the three pages. The
type system, the palette and the highlighter are identical. All three pass
reduced motion, keyboard traversal, and the 390 first-screen test.

**What differs, and what it costs.**

| | 01 Editorial | 02 Product editorial | 03 Experimental editorial |
|---|---|---|---|
| Hero | A1: the sentence in the margin, the product framed beneath | A3: the product edge to edge, the site opens into it | A2: the argument as a diagram, no chrome |
| Signature | Stacked; a captioned document | Pinned, V2: layers separate and recede, the 87 persists | Pinned, V3: the 87 becomes bars, the list ghosts, the evidence enters from the right |
| Tuner | Sticky column, no pin | Pinned | Pinned |
| Scroll cost | None | About four viewports across two pins | The same |
| Failure mode | Reads as safe | A void under a short final layer; two pins may fatigue | Mid-transition overlap; a chrome-less first screen |
| The moment a visitor describes afterwards | The highlighter on the quoted line | The list opening into the 87 and the 87 opening into its parts | The 87 turning into four bars |

---

## 11 — Recommended prototype

**Variation 02, Product editorial, is the strongest candidate for the next
iteration**, because it is the only one where the site's thesis is something
that happens rather than something that is said. The first screen is the real
workspace at real width, so the buyer's four-second question is answered before
a word is read. The second screen takes the 87 apart on a stage the visitor
scrubs, so "explains itself" is an experience. The sixth scene lets the visitor
change what counts and watch a name move, and watch a critical requirement
empty the list. Stage 1's north star, a well-argued brief you could take into
a meeting, is met by 01 too; 02 is the version of it that also proves the
product exists.

**Take from 03 exactly one thing:** the V3 mapping between states 2 and 3, in
which the 87 grows before the weights emerge from it, should replace V2's
plain crossfade at that one transition. It is the "score is constructed" idea
made literal, and it survives reduced motion because it is still a still. The
rest of 03 answers "how far can we push it", and the answer is: to there.

**Take from 01 the discipline** it already shares: every state a still, every
value the data module's, the stack as the fallback.

**Before Stage 3 treats it as the page:**

1. Unpin the tuner. The sticky control column does everything the pin does;
   the pin only costs scroll.
2. Tighten the stage's final dwell so the void under the candidate layer does
   not read as a hole in the page at 1440.
3. Adopt the proposed fixture through `tools/rankings.mjs` so production and
   prototype agree, and settle the classification-threshold finding below.
4. Decide the two wording and product questions Stage 1 raised: the eyebrow
   ("Hiring platform · for talent teams") and whether the hero frame may be a
   single link.

---

## 12 — Findings, exceptions, and what was left out

**Findings in the data module, for the product source to settle.**

- `BANDS` publishes Strong ≥ 72, Good ≥ 52, Potential ≥ 32, but the six
  candidates ship at 78 = Good and 74 = Good, which those thresholds would call
  Strong. The tuner fixture reproduces the shipped classifications with the
  authoring bands `tools/rankings.mjs` used (80 / 70 / 55). One of the two is
  wrong; the source wins, and the fix is a one-line data change either way.
- The production fixture scores candidates who miss a Critical skill, which
  contradicts `CRITICAL_GATE` and the critical-gate composition on the same
  page. The proposed fixture gates them.

**Exceptions recorded.**

- Pulse-strip labels in the phone crop are 8px, below the 11px floor, so that
  the job header and two ranked rows fit the first 390×844 screen. The
  alternative is dropping the strip from the phone hero; that is a design
  decision for Stage 3.
- The eyebrow wording and the rail numbering ("NN / 08") are candidate copy.

**Left out, and why.**

- No screenshots, no `/proof` content, no logos, no statistics, no
  testimonials, no pricing figure: the same inputs Phase 5 lists as blocked.
- The JD checker in scene 08: the endpoint decision is not an engineering one;
  the closing band names the two honest lines instead.
- The skill-review sheet (Stage 1's V5) and the real Filters / Describe switch
  (V3): both are small modules and neither changes the direction decision; they
  belong to Stage 3.
- Native `animation-timeline` for the stage: the prototype drives the stage
  from one scroll listener so that every browser shows the same thing. Stage 3
  should add the native timeline behind `@supports` and keep the listener as
  the fallback.
- The 14,000px phone target: variation 02 is about 17,400px. The remaining
  height is the pool's cited evidence (two lines per row) and the system scene;
  Stage 3 should cap evidence at one line per row on the phone and put the
  candidate dashboard behind the ledger.

---

## Design review checklist

The § 31 checklist is on the board (`index.html`), assessed per variation on
the built pages, with a note wherever a mark is △ rather than ✓. Every ✓ was
checked in a capture, not inferred.
