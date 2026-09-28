# 11 — Phase 3 implementation plan

The roadmap. Read `00`–`10` first; this sequences them, it does not restate them.

**`[OVERVIEW]` changed the shape of this plan.** The pre-Overview version ran a
validation track in parallel with build because the build could not finish without
it. Product truth is now settled, so **Phase 3 is a build project with two content
dependencies**, not a discovery project.

---

## 1. The answers Phase 3 needs, in one table

Brief § 34. Each row links to the decision rather than summarising it.

| Question | Answer | Where |
|---|---|---|
| What are we building? | A 10-page marketing site whose centre is three interactive product compositions | `04 § 2`, `05` |
| Why? | So a recruiter understands in 30 seconds that every ranking comes with its reasons — built on what skills mean, not what words appeared | `02 § 11` |
| For whom? | Recruiters and sourcers in tech-forward teams hiring 50–500 a year. Hiring managers second, candidates on their own page | `02 § 4` |
| What pages? | Home · product · matching · sourcing · candidate-intelligence · for-teams · for-candidates · demo · about · 3 legal | `04 § 2` |
| What sections? | Twelve on the homepage, three acts, four signature moments | `05 § 1`, `05 § 3` |
| What does each say? | Headline candidates and copy concepts per section | `09 § 3`, `05 § 2` |
| What product UI? | Nine compositions, eight required for the homepage, from one shared data module | `08 § 12`, `06 § 6` |
| What animation? | Existing primitives plus four new ones; four signature moments; two interactions | `07` |
| What components? | Nearly all exist. One nav menu, one score component, eight compositions | `10 § R23`, `08 § 1` |
| What assets? | One real screenshot, an `og:image`, real narrative strings. No photography, no logos, no video at launch | `10` |
| What content is missing? | 20 items. **One** blocks the whole build, and it is a legal decision | `10 § 2`, `10 § 8` |
| What first? | Astro migration; the meter primitive; the data module; the explanation panel | § 3 |
| What **not** yet? | § 6 |

---

## 2. Sequencing principle

One track now, with two content requests running alongside it rather than in
front of it.

```
BUILD (Eng, Design, Marketing)                              weeks 1–8
  migrate → primitives → data module → C2+C1 → §06 sequence
          → §08 → unblocked sections → §07 → pages → gate

ALONGSIDE, not blocking:
  R4  real narrative strings (Product)   ─── needed by the time §06 is dressed
  R5  field/label confirmation (Product) ─── needed before the data module lands
  R3  legal sign-off (Legal)             ─── decides §11's fifth beat only
  R19 legal documents (Legal)            ─── blocks launch, not build
```

`docs/phase-2.md § 5` warned that product visualisations are the long pole and to
start commissioning them at step 1. That is still true, and it is now the *only*
long pole — the eight compositions in `08` are the bulk of Phase 3's work.

**R4 is the item most likely to be deprioritised** because it looks like copy and
is actually product output `[10 § R4]`. Ask for it in week 1.

---

## 3. The phases

### Phase 3.1 — Migrate to Astro · **owner: Eng**
Two migration triggers fire `[04 § 6]`. Do this **before** page content — porting
ten hand-written pages later costs more than starting on Astro.

- Port `tokens.css` unchanged; it contains no selectors.
- Port `motion.css` and the seven JS modules as-is.
- Convert `index.html` into layout + section components. The markup is nearly
  valid `.astro` already.
- **Preserve, with an explicit checklist: every accessibility decision, and
  `--ratio` on every frame.** `docs/phase-2.md § 4` names these as the two things
  most likely to be lost, and both are invisible when correct.

**Done when:** the current homepage renders identically on Astro and the audit's
validation table `docs/audit.md § 6` passes again — 38/38 reveals, zero console
errors, one `<h1>`, zero `will-change` after settle, drawer and tab keyboard
behaviour intact.

### Phase 3.2 — Motion primitives · **owner: Eng**
**All four**, in order: P1 meter, P2 sequenced layers, P3 list reorder, P4 path
draw. P3 and P4 were conditional in the pre-Overview plan; both sections that need
them are now confirmed `[07 § 5]`.

Each gets a `motion-lab.html` swatch and a `docs/motion-system.md` entry **before**
use. Record P4 as an explicit, capped exception to the transform/opacity/filter
rule.

**Done when:** every primitive is demonstrated in isolation on the lab page and
correct under reduced motion. `CLAUDE.md § 5`: if it cannot be justified on the lab
page, it does not belong in the system.

### Phase 3.3 — Shared data module · **owner: Eng + Product**
`08 § 1`, built to the worked example in `06 § 1`. Gate on R5 — the field and
label confirmation, which is a short conversation, not a project.

**Done when:** every value on the site resolves from this one module. `87` appears
in five sections and is typed once.

### Phase 3.4 — C2, then C1 · **owner: Eng + Design**
Build the explanation panel **first, at full size**, then crop for the hero — not
the reverse `[08 § 12]`. Then the ranked list.

Give the **`partial` state** disproportionate care: its glyph, its colour, its own
row, and the transfer line naming the adjacent skill. It is the hinge of the whole
page `[07 § 4]` and the one detail that, done well, makes the rest legible.

**Done when:** C2 is keyboard-operable, `aria-live` announces once, every meter and
skill state has an `.sr-only` restatement, the panel renders complete and static
under reduced motion, renders complete with JS disabled, and is legible at 390px.

### Phase 3.5 — The § 06 sequence · **owner: Eng**
P2 plus the timing in `07 § 4`. Two beats are the section: the partial chip alone
at 1400ms, and the four signals at 2420ms. Plus the candidate switcher `[07 § 3]`.

### Phase 3.6 — § 08 Control · **owner: Eng**
P3 plus C4. Cheaper than it looks — it reuses C1 and the data module, and it adds
the second interaction and the second signature moment for roughly the cost of the
precomputed rankings.

Keep tuning and simulation **visually separate**: one changes the order, the other
changes the pool `[08 § 5]`.

### Phase 3.7 — The rest of the homepage · **owner: Eng + Marketing**
Sections 01, 02, 03, 04, 05, 09, 10, 11, 12, plus C5, C7, C8, C10. All confirmed,
none gated. Section 11 stops at four beats.

**Done when:** `CLAUDE.md § 6` step 6 in full, plus `07 § 7`. Ground alternation
and three loud moves as specified `[05 § 1]`; blur budget exactly three.

### Phase 3.8 — § 07 Adjacency · **owner: Eng + Design**
P4 plus C3. Built last of the three signature moments because it is the most
expensive: a new primitive with a rule exception, plus the edge confirmation in R5.

**Use only `[OVERVIEW]`'s three edges.** An invented edge is an invented
capability `[08 § 4]`.

### Phase 3.9 — `/product/matching`, then `/product` · **owner: Eng + Marketing**
The flagship page `[04 § 3]`: C2 at full size, the skill graph at full size, the
signals cluster, and the comparison table once R20 is cleared.

### Phase 3.10 — `/for-candidates` · **owner: Eng + Marketing**
C8 as a full feed, plus C10. This page is what makes section 10's claim
checkable, and `[OVERVIEW]` § 8's candidate-centricity strength is the whole page.

### Phase 3.11 — `/product/sourcing`, `/for-teams`, `/product/candidate-intelligence`, `/about`, `/demo`
Reuse only; no new compositions. Sourcing ships **without** the agent depicted
`[10 § R7]`.

### Phase 3.12 — Legal · **owner: Legal** · R19
Blocks launch, not build.

### Phase 3.13 — The indexing gate · **owner: everyone**
`docs/content-integrity.md § 5`, every checkbox, plus R13. Both the `robots.txt`
`Disallow` **and** every meta robots tag — both, or the site stays invisible.

Two gate items can be closed immediately on `[OVERVIEW]`'s authority: the score
conflict, and the comparison-table basis. **Then** update
`docs/content-integrity.md` to record what became AUTHORITATIVE and on what
evidence — that update is itself a deliverable, and `[OVERVIEW]` is the evidence
for most of the PROVISIONAL table.

---

## 4. Critical path

```
3.1 migrate ─► P1 ─► R5 ─► data module ─► C2 ─► §06 sequence ─► homepage ─► gate ─► launch
                                            ▲
                              R4 narrative strings
```

Three items sit on it: **the Astro migration**, **the shared data module** (which
needs R5, a conversation), and **C2 with the § 06 sequence**. R4 joins it at the
dressing stage.

Everything else can slip a week without moving the launch date — including section
07, which is the most distinctive section on the page and deliberately last.

## 5. Risks

| Risk | Consequence | Mitigation |
|---|---|---|
| **R4 never arrives** | § 06 falls back to marketing-written narrative and loses its proof. **The highest-likelihood, highest-impact risk on this list** | Escalate in week 1. It is cheap, it looks like copy, and it is the difference between a convincing section and a plausible one |
| **The three skill edges turn out to be illustrative prose, not shipped taxonomy relationships** | § 07 loses its worked example and possibly its warrant | R5 item 1. If they are not real, ask for three that are — the *capability* is confirmed `[OVERVIEW]` § 8, so this is a data request, not a re-gating |
| **Legal declines the trust claims** | § 11 stays at four beats; no `/responsible-ai` | Already the plan `[10 § R3]`. Costs one beat, not a section |
| **The a11y work is lost in the Astro migration** | Invisible regression, expensive to reinstate | Explicit checklist in 3.1; re-run the audit's validation table |
| **`--ratio` dropped when real media lands** | Layout shift; the site's main CLS defence gone | Named as the most likely regression. In the 3.4 done criteria |
| **The `partial` state is built as a third grey chip** | The page's hinge becomes invisible and § 07 loses its setup | Called out in 3.4. It needs its own glyph, colour and row `[08 § 3]` |
| **The what-if and unlock figures ship unlabelled** | Two fabricated-looking metrics on a site whose whole argument is honesty | R9. Label as examples or replace with real figures |
| **Scope creep back toward feature cards** | The page becomes the template it replaced | `[OVERVIEW]` confirming thirty-two features is an argument for *fewer* sections, not more. Zero card grids beyond § 02's three `[05 § 1]` |
| **No social proof at launch** | The biggest remaining conversion gap | Accepted deliberately; product specificity substitutes `[09 § 2]`. Revisit the moment one customer agrees to be named |
| **Two interactive sections become four** | The page reads as a toy | Two is the budget `[07 § 6]` |

## 6. What Phase 3 must NOT do

- **Do not invent** customers, metrics, testimonials, integrations,
  certifications, pricing, compliance claims, model details, or capabilities
  beyond `[OVERVIEW]` `docs/content-integrity.md § 1`.
- **Do not display an analytics figure** without labelling it an example
  `[10 § R9]`.
- **Do not invent a skill edge.** Three are confirmed; use those three
  `[08 § 4]`.
- **Do not display a classification threshold.** `[OVERVIEW]` does not publish
  the cut-offs `[08 § 1]`.
- **Do not depict the sourcing agent or Chrome extension.** They exist and may be
  **named**; their interfaces are undescribed `[06 § 5]`. Never draw a named
  external site.
- **Do not reinstate the employer-reputation card**, response SLAs, anti-ghosting
  penalties or candidate reviews of employers. Not in `[OVERVIEW]`; they came from
  a superseded document `[00 § 4]`.
- **Do not write the fifth trust beat** without R3. And even with it, describe the
  mechanism, never the outcome `[02 § 9]`.
- **Do not restore** the stats section, the testimonial, the demo video block, the
  nine "coming soon" cards, or a features bento.
- **Do not build** `/pricing`, `/blog`, `/resources`, `/careers`, `/customers`,
  `/integrations` or `/responsible-ai` `[04 § 3]`.
- **Do not open the site to indexing** until every gate item passes.
- **Do not add a dependency.** The count is zero and Astro is the only planned
  addition `CLAUDE.md § 3`.
- **Do not add a motion primitive without a lab swatch.**
- **Do not remove a focus ring.** Ever.
- **Do not ship arithmetic that pretends to be the matching engine.** Precomputed
  outcomes only `[08 § 5]`.

## 7. If only one thing gets built

Sections **01, 02, 06** and **12**, using **C1 and C2** — a four-section page
carrying the hero, the problem, the argument and the ask.

It contains the whole 30-second answer `[02 § 11]`, one signature moment, one real
interaction, and zero fabrication. Everything else on this roadmap makes that page
more complete; the two additions worth reaching for next are **§ 08** (the second
interaction, cheap because it reuses C1) and **§ 07** (the explanation of *how*,
and the only section a competitor could not write).

Nothing on this roadmap makes that page more *true* — which is the only axis this
site cannot afford to lose on, and the one `[OVERVIEW]` has now made it possible
to win on.
