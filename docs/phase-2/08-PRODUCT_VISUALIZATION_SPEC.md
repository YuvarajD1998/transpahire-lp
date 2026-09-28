# 08 — Product visualisation specification

Nine compositions, in build detail. Eight are required for the homepage.

Governed by `docs/product-visualization.md` — every rule there applies. This
document adds what to build, from which data, with which fields. Reconciled
against `[OVERVIEW]`.

---

## 1. Shared foundations

### One data source

All compositions read from **one static data module**:

```
assets/data/product-demo.js      (or src/data/product-demo.ts under Astro)
  ├── JOB          one requisition, skills in four importance tiers
  ├── CANDIDATES    5–8 candidates with full match objects
  ├── SKILL_EDGES   the three confirmed taxonomy relationships
  ├── RANKINGS      precomputed orderings, one per importance combination
  └── CANDIDATE_VIEW  the same match rendered from the candidate's side
```

Non-negotiable, because it is the difference between a marketing site and a
collection of hand-typed lies:

1. **Numbers appear once.** `87` appears in sections 01, 05, 06, 08 and 10. That
   is one value read five times. Hand-typing it guarantees divergence, and a
   divergence here is the most visible possible defect `[07 § 7]`.
2. **Every field must exist in `[OVERVIEW]`.** A field the Overview does not name
   is a field the product may not have `docs/product-visualization.md § 6`.
3. **People and companies stay invented.** Sneha Iyer at PhonePe, Priya Nair at
   Zoho — invented, and obviously so, which is what is required. Never a real
   name, never a real employer logo.
4. **This module is the migration argument.** Hand-maintaining this markup across
   six pages is trigger #3 in `docs/architecture.md § 1`. See `[04 § 6]`.

The worked example — one job, one candidate, one skill carried across sections
05 → 06 → 07 → 08 — is specified in `06 § 1`. Build the data module to it.

### Shared conventions

| | |
|---|---|
| **Container** | Every composition sits in `.frame` with a mandatory `--ratio` `docs/components.md § 5` |
| **Chrome** | `.frame__meta` carries a real route: `app.transpahire.com / jobs / 1042 / matches` |
| **Tokens only** | No raw values. A mockup with its own greys will look wrong beside a real screenshot |
| **Type** | `--font-mono` for every label, score and datum; `--font-sans` for names and narrative prose; `--font-display` for score values. `--font-serif` **never** appears inside a product composition — it is the marketing voice, not the product's |
| **Classification colour** | `Strong` → `--c-ok`, `Good` → `--c-indigo-bright`, `Potential` → `--c-warn`, `Weak` → `--c-slate`. Always paired with the word — never colour alone `DESIGN.md § 2` |
| **Skill states** | `covered` ✓ `--c-ok` · `partial` ≈ `--c-indigo-bright` · `missing` ✗ `--c-slate` · `bonus` + `--c-slate-soft`. **Four visual states, three of them scored.** The `partial` glyph must be visually distinct from both others — it is the product's most distinctive single element |
| **Density** | Match the product's real density. Marketing mockups twice as airy as the product read as dishonest the first time someone sees a demo |
| **A11y** | Compositions are content, not decoration. Real headings, real lists, `.sr-only` summaries wherever a visual conveys structure a reader cannot see |

### The score component

Used by C1, C2, C4, C8. Build it once.

```html
<div class="score score--strong">
  <span class="score__value" data-count="87">87</span>
  <span class="score__scale" aria-hidden="true">/100</span>
  <span class="chip chip--strong">Strong Match</span>
  <span class="sr-only">Match score 87 out of 100. Classification: strong match.</span>
</div>
```

Three decisions worth recording:

- **No ring.** `[OVERVIEW]` gives a 0–100 score and four named classifications.
  A ring implies a proportion of a whole, which invites the reader to compute a
  percentage; the classification chip already carries the verdict, and it is the
  product's own vocabulary. A `--meter` bar is available if a proportion is
  genuinely wanted.
- **Integers.** `counter.js` works unmodified — `data-count="87"`, no
  `data-decimals` `[07 § 5]`.
- **Never display a threshold.** `[OVERVIEW]` does not publish the cut-offs
  between Strong / Good / Potential / Weak. Show the score and the classification
  the product returned; never a rule like "80+ is strong". Minor open question —
  worth asking product, blocks nothing `[06 § 1]`.

---

## 2. C1 — Ranked candidate list

| | |
|---|---|
| **Purpose** | Every candidate in the database is scored and ordered |
| **Appears** | § 01 (crop, 2 rows), § 05 (full, 6–8 rows), § 08 (live reorder); `/product`, `/product/matching`, `/for-teams` |
| **Ratio** | `16/10` full · `4/3` hero crop |
| **Route** | `app.transpahire.com / jobs / 1042 / matches` |
| **Medium** | Composed HTML |

```
┌ Senior Backend Engineer, Payments · Bengaluru · Hybrid · 5–8 yrs ────────────┐
│ [ all 47 ] [ strong 14 ] [ good 11 ]                    sort: match score    │
├──────────────────────────────────────────────────────────────────────────────┤
│  87   Sneha Iyer         Staff Engineer · PhonePe                             │
│       Strong Match      6.2y · Bengaluru · Hybrid    ✓3 ≈1 ✗1                │
├──────────────────────────────────────────────────────────────────────────────┤
│  81   Rahul Verma        SDE III · Razorpay                                   │
│       Strong Match      5.4y · Bengaluru · Hybrid    ✓4 ≈0 ✗1                │
└──────────────────────────────────────────────────────────────────────────────┘
                  every candidate in the database · consented profiles
```

**Per row:** score + classification chip · name · headline (role · company) ·
years · location · work mode · **the ✓ ≈ ✗ coverage triplet**. Nothing else —
`docs/product-visualization.md § 3`: one focal point.

The coverage triplet is the row-level detail worth having: it previews the
three-state model before the visitor opens the panel, and it makes the *partial*
column visibly non-zero across the list.

**Header:** job title with band and experience range; classification filter chips
with live counts; a sort label. **Footer line:** the pool statement plus the
consent clause — `[OVERVIEW]` licenses the first `[00 § 6]` and the second is what
makes it comfortable to read.

**Deliberately excluded:** avatars (photographs of invented people are a step too
far), the five dimensions (they belong in the panel), checkboxes.

**Motion:** `data-layers` in rank order, 120ms. Scores count with their row.
**Mobile:** 4 rows; drop the coverage triplet and the work mode.
**Markup:** a real `<ul>` of `<li>`, or a `<table>` if genuinely tabular. Never a
stack of divs.

---

## 3. C2 — Explanation panel ★

The most important asset on the site.

| | |
|---|---|
| **Purpose** | The score decomposes into an inspectable argument |
| **Appears** | § 01 (crop: head + breakdown), § 06 (full, interactive); `/product/matching` (full + comparison), `/for-teams` |
| **Ratio** | `4/3` full · `16/10` paired beside C1 |
| **Route** | `app.transpahire.com / jobs / 1042 / matches / sneha-iyer` |
| **Medium** | Composed HTML, **interactive** |

Five blocks, in this order:

```
1  IDENTITY     Sneha Iyer · Staff Engineer · PhonePe · Bengaluru
                                                   87 /100   Strong Match
2  MATCH BREAKDOWN                                 ← five dimensions
                Skill coverage        ▓▓▓▓▓▓▓▓░░  84
                Experience alignment  ▓▓▓▓▓▓▓▓▓░  91
                Location preference   ▓▓▓▓▓▓▓▓▓▓ 100
                Salary alignment      ▓▓▓▓▓▓▓░░░  76
                Semantic similarity   ▓▓▓▓▓▓▓▓▓░  93
3  SKILLS                                          ← three scored states
                ✓ Covered   Python · PostgreSQL · Distributed Systems
                ≈ Partial   Kubernetes
                            Docker experience transfers
                ✗ Missing   Kafka  (preferred)
                + Bonus     AWS · Terraform
4  WHY
                Six years on payment infrastructure at PhonePe, covering both
                critical skills. No direct Kubernetes, but deep Docker work
                makes the ramp short. Salary expectation sits above the band.
5  SIGNALS                                         ← arrive last
                Seniority    slightly over-levelled
                Trajectory   consistent growth
                Potential    high
                Drop-off     moderate
```

**Field sources — all `[OVERVIEW]` § 3–4:** match score 0–100 · classification ·
the five named dimensions · per-skill covered/partial/missing · AI narrative
(2–3 sentences, why the candidate *is or isn't* a fit) · seniority alignment ·
career trajectory · potential score · drop-off risk.

**The four details that make it work:**

1. **The `partial` state.** The single most distinctive element in the product
   and the hinge of the whole page `[07 § 4]`. It needs its own glyph, its own
   colour, its own row, and the transfer line beneath it naming the adjacent
   skill. If one detail in this specification gets built carefully, this is it.
2. **Salary alignment is scored, not hidden.** A 76 beside four high numbers is
   the panel telling the recruiter something inconvenient. Do not pick a
   candidate whose five dimensions are all high — the point of a breakdown is
   that the parts disagree.
3. **The narrative says what is wrong.** *"Salary expectation sits above the
   band"* in the product's own output is worth more than any adjective marketing
   can supply. It must come from the product `[10 § R4]`.
4. **Signals last, as a group.** Seniority, trajectory, potential and drop-off
   are the things a recruiter could not have derived by reading the CV
   `[03 § 2]`. Landing them after the narrative makes the panel feel like it
   knows more than it has said.

**Interactive contract:** `07 § 3`. **Motion:** `07 § 4`.
**Mobile:** full width, single column, becomes the whole section. Five meters full
width. Signals collapse to a 2×2 grid. Every block survives — this is the
composition most worth the mobile budget.
**A11y:** `<h3>` for the name, `<dl>` for the breakdown and the signals, real
`<ul>` per skill group, `aria-live="polite"` on the panel, `.sr-only` restating
each meter ("Skill coverage: 84 out of 100") and each skill state in words
("Kubernetes: partial match — Docker experience transfers"). The `≈` glyph must
never be the only carrier of the partial state.

---

## 4. C3 — Skill relationship graph ★

| | |
|---|---|
| **Purpose** | Explain how the *partial* in C2 was possible. The moat, made visible |
| **Appears** | § 07; `/product/matching` |
| **Ratio** | `16/10` |
| **Medium** | **Abstract system diagram** — inline SVG, no `.frame` chrome. It is not a screen, and dressing it as one would invent product UI |

```
                       REQUIRED BY THE JOB
                           Kubernetes
                                ▲
                                │  requires
                                │
                    Docker ── similar to ── containerd
                                ▲
                                │
                          ON THE PROFILE
                            Sneha Iyer

    typed · hierarchical · requires / enables / similar to · clustered
    → scored PARTIAL, not MISSING
    → Sneha holds #1 instead of dropping to #9
```

**Constraints. This composition has the strongest warrant on the page and the
tightest data discipline:**

- **Use only `[OVERVIEW]`'s three confirmed edges**: TypeScript↔JavaScript,
  **Docker→Kubernetes**, React→Vue `[03 § 2]`. The Docker edge is the one the page
  needs, because it continues the worked example. **An invented edge is an
  invented capability** — this is the one place where a plausible-looking addition
  would be a fabrication.
- Maximum six nodes. A dense graph looks impressive and says less.
- **No similarity score on any node or edge.** `[OVERVIEW]` does not expose one,
  and a number here would be invented.
- Label the relationship *types* — `requires`, `similar to` — because the type is
  the capability. A graph of unlabelled lines is decoration.
- The ESCO / O*NET alignment belongs in the **caption**, at `.label` size, not in
  the diagram. It is the credibility footnote, not the story.

**Motion:** **P4** path draw, capped at six paths, then **P3** for the ranked-row
payoff. Sequence: `07 § 4`.
**Mobile:** three nodes, vertical — Kubernetes, the `requires` edge, Docker. Drop
containerd. If the simplification cannot carry the idea, ship a static diagram —
a bad animation is worse than none.

---

## 5. C4 — Importance controls and what-if ★

| | |
|---|---|
| **Purpose** | The ranking is a function of the recruiter's priorities — and a change can be tested before it is made |
| **Appears** | § 08; `/product/matching` |
| **Ratio** | `16/10`, controls and list in one frame |
| **Medium** | Interactive product demo |

Two distinct controls beside a live 5-row C1:

**Tuning** — three sliders, each stepping through the product's own four tiers
(*bonus · preferred · required · critical*): Python, Kubernetes, Kafka. Moving
Kubernetes is the interesting one, because sections 06 and 07 just explained it.
Changing a tier reorders the list and recomputes the scores.

**Simulation** — one toggle, *drop Kafka*, with its own readout:
`qualified pool 248 → 417 (+169)`.

**Keep them visually separate.** Tuning changes the *order*; simulation changes
the *pool*. `[OVERVIEW]` § 3 treats them as two capabilities and conflating them
in one control loses both ideas.

**Precomputed outcomes only.** Store a ranking per tier combination; never compute
a score client-side. A visitor who reverse-engineers the demo's arithmetic has
learned something false about the product.

**The two figures must be labelled as an example.** They are the only quantities
on the page, no real values exist `[01 § 6]` Q5, and an unlabelled pool count
reads as a product metric.

**Motion:** **P3** reorder; the pool figure counts once and stops.
**Mobile:** one slider (Kubernetes) plus the toggle.
**Interaction contract:** `07 § 3`.
**Do not** cite the prototype's `tweaks-panel.jsx` as reference — it is a design
tool, not a product feature `[00 § 5]`.

---

## 6. C5 — Requisition and dual-mode search

| | |
|---|---|
| **Purpose** | Evaluation starts from a structured role, and there are two ways to search against it |
| **Appears** | § 04; `/product`, `/product/sourcing`, `/for-teams` |
| **Ratio** | `4/3` |
| **Route** | `app.transpahire.com / jobs / 1042` |
| **Medium** | Composed HTML |

```
┌ Senior Backend Engineer, Payments                    PUBLISHED ─┐
│ Engineering · Full Time · Senior · Hybrid                        │
│ Bengaluru, India  ·  5–8 yrs  ·  ₹45–65L                         │
│ ── CRITICAL ───────────────────────────────────────────────────  │
│ Python    Distributed Systems                                    │
│ ── REQUIRED ───────────────────────────────────────────────────  │
│ PostgreSQL    Kubernetes                                         │
│ ── PREFERRED ──────────────────────────────────────────────────  │
│ Kafka                                                            │
│ ── BONUS ──────────────────────────────────────────────────────  │
│ AWS                                                              │
├──────────────────────────────────────────────────────────────────┤
│ [ filters ]  [ describe ]                                        │
│ "senior python engineer, payments, 5+ years, Bengaluru"          │
└──────────────────────────────────────────────────────────────────┘
```

**The four importance tiers are the load-bearing element.** They are what section
08's controls manipulate and what the whole ranking is measured against — more
specific than a binary required/optional split, and confirmed `[OVERVIEW]` § 3.

The dual-mode control sits at the bottom as a second beat: two segmented options,
with the plain-text example visible in the `describe` state. Both modes are LIVE
and *"work side by side in the same tool"* is `[OVERVIEW]`'s own differentiator
`[03 § 2]`.

**Optional:** a `UNDER REVIEW` state as a small second card, evidencing the
approval workflow for section 09 without a second composition.

**Motion:** tiers arrive as four groups in importance order; the search control
crossfades between modes once (existing tab-crossfade primitive).
**Mobile:** chips wrap, never scroll. Search control below.
**Do not show** a JD quality score here. `[OVERVIEW]` confirms the JD optimizer
exists, but its output is a report of issues (*"too many critical skills"*), not a
number — and a fabricated `9.2` would be a fabricated metric
`docs/product-visualization.md § 6`.

---

## 7. C6 — Sourcing agent `[DEFERRED]`

**Do not build until `01 § 6` Q2 is answered.** `[OWNER]` confirms the agent
exists; no source describes its interface. Specified here so the answer can be
acted on immediately. Rationale for deferral: `06 § 5`.

| | |
|---|---|
| **Appears** | § 04b (inserted; becomes a signature moment); `/product/sourcing` |
| **Ratio** | `16/10` |
| **Medium** | Composed HTML, sequenced |

Three-part vertical sequence: **the brief** (a role described in plain language) →
**the stages** (the agent's own progress lines, in the product's own strings) →
**the results** (C1, abbreviated).

**The constraint that makes it honest:** use the product's actual stage strings or
do not build it. The brief's sketched four — *"Understanding requirements… Finding
relevant talent… Expanding related skills… Ranking candidates…"* — are a plausible
invention, and depicting them commits the product to that decomposition.

**Motion:** stage lines resolve in order with completion states, then results
arrive as a `data-layers` group. `.float` **off** — a sequence and a float in one
composition breaks the one-primitive rule.

**C6b, Chrome Extension:** abstract flow only —
`external profile → Transpahire → new or enriched` — with the external end
deliberately unbranded. Never a named or drawn external site: it implies a
supported integration, and `[OVERVIEW]` § 7 puts every integration in upcoming.
`/product/sourcing` only, never the homepage.

---

## 8. C7 — Pipeline

| | |
|---|---|
| **Purpose** | The shortlist becomes a hire in the same system |
| **Appears** | § 09; `/product`, `/for-teams` |
| **Ratio** | `21/9` — the stage row is wide and shallow |
| **Medium** | **Simplified** product UI |

Six stage columns with `[OVERVIEW]`'s default names — `SOURCED · REVIEWED ·
SHORTLISTED · INTERVIEWING · OFFER · HIRED` — a count per stage, and two or three
minimal candidate cards (name, score chip). One card advances one stage on reveal.

A short caption earns its place here: *your stages, your names, your order* —
custom pipelines are confirmed `[OVERVIEW]` § 3, and it is the one thing in this
composition a visitor would not assume.

**Deliberately schematic.** This section's job is reassurance, not depth
`[05 § 2]`, and `[OVERVIEW]` § 1 positions the product as *lighter* than an
enterprise ATS — so a dense board would argue against the positioning.

**Motion:** one card, one column, once. **Mobile:** vertical stage list with
counts; drop the moving card.
**Never show:** rejection in the visible flow, interview times, or any calendar UI
— scheduling with calendar sync is UPCOMING `[OVERVIEW]` § 7.

---

## 9. C8 — Candidate match view

| | |
|---|---|
| **Purpose** | The candidate sees the same score and the same breakdown |
| **Appears** | § 10 (left frame); `/for-candidates` (primary, full feed) |
| **Ratio** | `3/4` — deliberately mobile-shaped, because that is where candidates are |
| **Route** | `app.transpahire.com / jobs / recommended` |
| **Medium** | Composed HTML |

```
┌──────────────────────────────────┐
│  Senior Backend Engineer         │
│  Payments · Bengaluru · Hybrid   │
│                                  │
│        87  /100                  │
│        STRONG MATCH              │
│                                  │
│ ── WHERE YOU FIT ─────────────── │
│  Skill coverage           84     │
│  Experience alignment     91     │
│  Location preference     100     │
│ ── WHERE YOU DON'T ───────────── │
│  Salary alignment         76     │
│  ≈ Kubernetes                    │
│    your Docker work transfers    │
│ ── YOUR APPLICATION ──────────── │
│  Applied → Viewed → Shortlisted  │
└──────────────────────────────────┘
```

**The rule that carries the whole section: it is the same 87.** `[OVERVIEW]` § 2
and workflow 2 confirm candidates see a personalised match score and *"a breakdown
of where they fit and where they don't"*. Rendering a different number, or hiding
it, would waste the strongest structural claim on the site `[00 § 2]`.

The *where you fit / where you don't* split is `[OVERVIEW]`'s own phrasing and a
better information design than the recruiter panel's flat list — it sorts the five
dimensions by whether they help. Use it here and consider it for
`/for-candidates`.

**Do not show:** the AI narrative or the logged weights on this side — whether
candidates see those is `01 § 6` Q4, unanswered. Show score, dimensions, the
partial with its transfer line, and status. All four are confirmed.

**Motion:** the score counts to the **same value section 06 showed** — the
repetition is the point. Dimension rows arrive as two groups (fit, then don't).
`.float--delayed`, the only float in this viewport.
**Mobile:** first in reading order — the shared score is the more surprising of the
two frames `[05 § 4]`.

---

## 10. C9 — withdrawn

Was: employer reputation from candidate reviews. **Removed.** `[OVERVIEW]` does
not mention reputation scoring, candidate reviews of employers, response SLAs or
anti-ghosting enforcement; those came from the superseded `TranspaHire.pdf`
`[00 § 4]`. The prototype does read a real `/reviews/orgs/{id}/score` endpoint, so
the capability may exist unmarketed — `01 § 6` Q1. **Ask; do not build.**

The number is retired rather than reused, so a future session reading `C9` in an
older note finds this entry rather than a live spec.

---

## 11. C10 — Résumé quality and skill gaps

| | |
|---|---|
| **Purpose** | The candidate is told what to do next |
| **Appears** | § 10 (right frame); `/for-candidates` (primary) |
| **Ratio** | `1/1` |
| **Medium** | Composed HTML |

```
┌ RÉSUMÉ QUALITY ─────────────────────┐
│  62 / 100      5 suggestions        │
│  · add measurable outcomes          │
│  · reduce generic language          │
├─────────────────────────────────────┤
│ SKILLS THAT WOULD OPEN MORE ROLES   │
│  Kubernetes   +8 roles    High      │
│  Kafka        +5 roles    High      │
│  Go           +3 roles    Medium    │
└─────────────────────────────────────┘
```

Résumé critique with a quality score and specific suggestions, plus the skill-gap
list with unlock counts and demand levels — all LIVE `[OVERVIEW]` § 3, and the
demand levels come from the taxonomy's own demand scores `[03 § 2]`.

**Keep the résumé score low.** A mockup showing 95 has nothing to offer the
reader; a 62 with two named suggestions demonstrates the product being useful. The
two suggestion examples are `[OVERVIEW]`'s own — *"adding measurable outcomes",
"reducing generic language"*.

**Kubernetes at the top of the gap list is deliberate** — it closes the loop with
sections 06 and 07 from the candidate's side. The same skill, seen from three
positions on one page.

**Unlock counts are illustrative** and must be labelled as an example, like
section 08's pool figures `[10 § R5]`.

---

## 12. Build order

| Order | Composition | Why |
|---|---|---|
| 1 | **P1 meter primitive** | Five compositions depend on it |
| 2 | **Shared data module** | Everything depends on it. Getting it wrong is expensive later |
| 3 | **C2 explanation panel** | The most important asset. Build it first, at full size, then crop for the hero — not the reverse |
| 4 | **C1 ranked list** | Second most reused; pairs with C2 in the hero |
| 5 | **P2**, then the § 06 sequence | The signature moment. The `partial` beat is the payload |
| 6 | **P3**, then **C4** | Section 08. Shares C1 and the data module, so it is cheaper than it looks |
| 7 | C5 requisition · C7 pipeline | Small, confirmed, quick |
| 8 | C8 · C10 | Section 10 |
| 9 | **P4**, then **C3** | Section 07. Most expensive: a new primitive with a documented rule exception, plus product-confirmed edges |
| 10 | C6 | Deferred until Q2 |

**If time runs out, ship C1 + C2 + C4 and defer section 07.** Those three carry
the 30-second answer and both interactions `[02 § 11]`. Section 07 is the most
distinctive section on the page and the only one whose absence costs the page an
explanation rather than a claim — which makes it the right thing to build *last*
and the wrong thing to build *never*.
