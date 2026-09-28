# 05 — Homepage blueprint

The narrative decision, then a section-by-section specification.

---

## 1. Narrative evaluation

### Narrative A — "From Job to Shortlist"
Hero → problem → describe the role → AI understands → discover → match → explain
→ tune → shortlist → pipeline → intelligence → CTA.

**Strength:** chronological, so it never has to explain itself; a recruiter
recognises their own week in it. Every beat maps to a screen.
**Weakness:** twelve beats of equal weight and no climax. The explanation — the
actual differentiator — arrives as step six of twelve, and "tune the search"
lands after it as an anticlimax. It also front-loads sourcing, the least
evidenced pillar `[03 § 2]`.

### Narrative B — "The Intelligence Layer"
Hero → traditional workflow → where intelligence is missing → the layer → four
pillars → workflow → CTA.

**Strength:** conceptually clean; positions against the ATS without naming it.
**Weakness:** it argues instead of showing. Three of the first four sections are
diagrams of an abstraction, and the product does not appear until halfway.
"Layer" also implies integration into an incumbent system, which is a claim with
no evidence `[02 § 2]`. Rejected.

### Narrative C — "The Match"
Hero → what makes a great match → skills → experience → trajectory → seniority →
potential → hidden talent → explainability → control → outcome.

**Strength:** goes deepest on the strongest asset, and "the match is the product"
is the correct instinct.
**Weakness:** four consecutive sections (skills, experience, trajectory,
seniority) are the four rows of one panel, promoted to sections each. That is the
repetitive-card-grid failure mode in a new costume. Two of the beats — trajectory
and potential — are unevidenced `[03 § 2]`. And it never shows a hire happening,
so the buyer leaves unsure whether they still need an ATS.

### Recommended — Narrative D: "Fit, explained"

Keep A's chronological spine, because it is legible and every beat is a screen.
Take C's conviction that the match is the product, and use it to give the spine a
**centre of gravity** — one section that is unmistakably the point, with the
sections before it building toward it and the sections after it defending it.
Then close on the thing neither A nor C has: the two-sided proof.

```
                  ┌─────────────── ACT I — the stakes ────────────────┐
  01  HERO         the shortlist explains itself                       paper
  02  THE GAP      finding ≠ fitting                                   paper + ink inset
  03  INTERLUDE    editorial turn                                      ink
                  └──────────────────────────────────────────────────┘
                  ┌────────────── ACT II — the mechanism ─────────────┐
  04  THE ROLE     the role, and two ways to search against it         paper
  05  THE POOL     every candidate ranked, nobody skipped              bone
  06  THE ARGUMENT ★ the score decomposes                              paper
  07  ADJACENCY  ★ it understands skills, not words                    bone
  08  CONTROL    ★ you decide what matters                             paper
                  └──────────────────────────────────────────────────┘
                  ┌──────────── ACT III — the consequence ────────────┐
  09  THE HIRE     move the right people forward                       bone
  10  BOTH SIDES   the candidate sees the same score                   paper
  11  PHILOSOPHY   recommends · explains · you decide                  ink
  12  CTA          see it on your own roles                            indigo
                  └──────────────────────────────────────────────────┘
```

Twelve sections, inside the 8–14 target `brief § 29`. Each answers a different
question:

| § | Question it answers |
|---|---|
| 01 | What is it? |
| 02 | Why does it matter? |
| 03 | *(rest — the editorial signature)* |
| 04 | Where does it start? |
| 05 | How much does it look at? |
| 06 | **What makes it different?** |
| 07 | How does it know? |
| 08 | Am I still in charge? |
| 09 | Do I still need an ATS? |
| 10 | Can I trust it — and what do the people I reject see? |
| 11 | What does this company believe? |
| 12 | What do I do next? |

### What is cut from the current sixteen

| Cut | Why |
|---|---|
| Interlude 02 | `docs/audit.md § 5`: "two interludes may be one too many". One is a signature; two is a tic |
| Stats + testimonial | Every value fabricated `docs/content-integrity.md § 2`. Returns only with real data |
| "Coming soon" grid (nine cards) | Reduced to at most four, moved to `/product` `[03 § 4]` |
| Pricing section | Deferred; no page either `[04 § 5]` |
| Platform tabs | Absorbed. The three tab names (*Candidate Matching · Hiring Pipeline · Analytics*) turn out to be roughly right — they map to pillars 2, 6 and 6 `[03 § 1]` — but a tabbed frame competes with section 06 for the same attention, and the page no longer needs a breadth device. The tab component stays available for `/product` |
| Differentiation comparison table | Moved to `/product/matching`. `[OVERVIEW]` § 9 now supplies the documented basis `docs/content-integrity.md § 5` requires, so the table is publishable — it is moved for *composition* reasons rather than legal ones: the homepage argues by demonstration, and a comparison table argues by assertion `[02 § 8]` |
| Demo video section | Returns when a video exists `docs/content-integrity.md` |
| Features bento (six cards) | Absorbed into 04–09, which show the same capabilities happening rather than listing them |

Four card grids become zero. That is the single biggest improvement available to
this page.

**What `[OVERVIEW]` did *not* change:** every cut above still holds. Confirming
that thirty-two features exist is an argument for *fewer* sections, not more —
`[03 § 4]` now lists eight Tier-1 capabilities and the page has room for six.
The temptation this document exists to resist is adding a features bento back
because the features turned out to be real.

### Ground alternation and the loud moves

`paper · paper · ink · paper · bone · paper · bone · paper · bone · paper · ink ·
indigo`

No two adjacent sections share a ground. Three loud moves, per
`DESIGN.md § 1`: the ink problem statement inside 02, the ink interlude at 03,
and the ink philosophy at 11. Sections 11 and 12 are both dark **deliberately** —
they are one closing movement, so 12 takes `--section-y-tight` and reads as the
consequence of 11 rather than a new section.

`data-reveal="blur"` budget is three per page `docs/motion-system.md § 3`.
Allocated: the H1 (01), the interlude quote (03), the philosophy statement (11).
No fourth.

---

## 2. Section specifications

Each section carries: purpose · audience · message · copy concept · visual ·
product UI · motion · interaction · CTA · transition · importance · gate.

Headline copy below is a **concept**, not final. `09-MESSAGING.md` holds the
candidates and the voice rules. Every `<em>` marks the serif-italic accent, one
per headline, falling on the phrase that carries the turn `DESIGN.md § 3`.

---

### SECTION 01 — HERO
`paper` · `.hero` · `.split--lead` (1.05:1)

| | |
|---|---|
| **Purpose** | Deliver the 30-second answer `[02 § 11]` in one screen, and show the product doing it |
| **Audience** | Recruiter |
| **Message** | Every ranking comes with its reasons |
| **Copy concept** | H1: *"Every shortlist <em>explains itself.</em>"* — Lede: what the engine returns for a role — a ranked list where every position carries five scored dimensions, which skills are covered, partial and missing, and a plain-language narrative. Not a number you have to trust |
| **Primary visual** | The ranked candidate list with one row selected and its explanation panel open beside it — a `92` score, five dimensions, one **partial** skill. Cropped to two rows plus the panel, `4/3` per `docs/product-visualization.md` § 2 |
| **Product UI** | **REAL, composed HTML.** Spec: `08 § 2` (list) + `08 § 3` (panel). Not an image — it animates internally |
| **Motion** | `data-reveal="blur"` on the H1 (one of three). `data-reveal="rise"` on the frame. `.float` on the frame — one only. **Intensity: MEDIUM** |
| **Interaction** | None. Above the fold does not animate in `docs/motion-system.md § 5`, and the hero must not ask for work before it has earned any |
| **CTA** | Primary `Book a demo`. Secondary `See how matching works` → `/product/matching` |
| **Below** | The neutralised customer-logo row stays as labelled empty slots until real marks exist `docs/content-integrity.md § 3` |
| **Transition** | The hero shows the answer. Section 02 explains why it is hard. Deliberate: state the conclusion, then earn it |
| **Importance** | **CRITICAL** |
| **Gate** | **Clear.** The score model is settled — 0–100, five dimensions, four classifications `[00 § 2]` |

---

### SECTION 02 — THE GAP
`paper` with an inset ink statement · `.section` · three cards + `.problem-statement on-ink`

| | |
|---|---|
| **Purpose** | Establish problems B and C fused — evaluation and trust `[02 § 5]` |
| **Audience** | Recruiter |
| **Message** | Finding people has never been easier. Knowing who fits is the part nobody solved |
| **Copy concept** | H2: *"Finding people is easy now. <em>Knowing who fits isn't.</em>"* Three cards, not four: **the volume** (more candidates than anyone can read), **the guesswork** (a ranked list you cannot interrogate is still a guess), **the memory** (why someone was rejected survives three weeks in nobody's head). Each closes on a serif `.card__benefit` line |
| **Primary visual** | None. The ink statement block *is* the visual — this is the page's best turn `docs/audit.md § 5` and it works as type |
| **Product UI** | None |
| **Motion** | `data-reveal-group data-stagger="normal"` on the three cards. `data-reveal="scale"` on the ink statement. **Intensity: LOW** |
| **Interaction** | None |
| **CTA** | None. A CTA here would interrupt the argument |
| **Transition** | The ink statement is the pivot: the problem is not supply, it is judgement. 03 lets it land |
| **Importance** | **HIGH** |
| **Gate** | None — this section makes no product claim. Publishable today |

---

### SECTION 03 — INTERLUDE
`ink` · `.interlude on-ink` · centred

| | |
|---|---|
| **Purpose** | Editorial rest. The device that makes the site read as a publication rather than a funnel `DESIGN.md § 1` |
| **Audience** | Everyone |
| **Message** | Transparency is structural here, not a feature |
| **Copy concept** | `.quote`, one sentence, load-bearing. Candidates in `09 § 3`. Working line: *"A score you cannot question is <em>an opinion with a number on it.</em>"* |
| **Primary visual** | Type only |
| **Motion** | `data-reveal="blur"` (two of three). Nothing else. **Intensity: LOW** — the restraint is the effect |
| **Interaction** | None |
| **CTA** | None |
| **Transition** | Full stop after Act I. Act II opens on mechanism |
| **Importance** | **MEDIUM** — cuttable if the line is not excellent. A weak interlude is worse than none `docs/audit.md § 5` |
| **Gate** | Copy quality only |

---

### SECTION 04 — THE ROLE
`paper` · `.section` · `.split` (text left, visual right) · reversed on mobile

| | |
|---|---|
| **Purpose** | Show that evaluation starts from a structured requirement — and that you can search against it two ways |
| **Audience** | Recruiter, sourcer |
| **Message** | Skills are tiered by importance, not listed. Then you search by filter or by description |
| **Copy concept** | H2: *"It reads the role <em>before it reads a résumé.</em>"* Body: every skill is marked **critical, required, preferred or bonus** — the four tiers are what everything downstream is measured against. Second beat: search the pool by structured filters, or describe the person in a sentence. Same interface `[OVERVIEW]` § 3 |
| **Primary visual** | The requisition record with skills grouped by the four importance tiers, plus a small dual-mode search control (filters ⇄ plain text) |
| **Product UI** | **REAL, composed HTML** — `08 § 6`. Four-tier importance, JD extraction, and dual-mode search all LIVE `[OVERVIEW]` § 3 |
| **Motion** | `data-reveal="left"` on text, `data-reveal="right"` on the frame — paired, so they read as one object `docs/motion-system.md § 3`. `data-parallax="0.02"` on the frame. **Intensity: MEDIUM** |
| **Interaction** | None |
| **CTA** | None |
| **Transition** | The role is defined. Now: who gets measured against it |
| **Importance** | **HIGH** |
| **Gate** | **Clear** |
| **Note** | The AI Sourcing Agent and Chrome Extension **exist** `[OWNER]` but no source describes their interfaces `[01 § 6]` Q2. They may therefore be **named in the copy of this section** — one clause, e.g. *"or let the sourcing agent work the brief for you"* — and **must not be depicted** until the interface is known `docs/product-visualization.md § 6`. When it is, insert **04b — DISCOVERY** (spec `08 § 7`) and promote it to a signature moment. This beat leads on the role because the role is what makes the ranking meaningful |

---

### SECTION 05 — THE POOL
`bone` · `.section--sunken` · full-width composition

| | |
|---|---|
| **Purpose** | Establish scope: every candidate is evaluated and ranked, not filtered to whoever matched a keyword |
| **Audience** | Recruiter |
| **Message** | Every candidate in the database is scored against the role — you are not waiting for applications |
| **Copy concept** | H2: *"Nobody gets skipped, <em>and nobody gets a free pass.</em>"* Body: every candidate is scored 0–100 and classified Strong, Good, Potential or Weak. No waiting for applications to trickle in `[OVERVIEW]` workflow 1. One clause on candidate privacy controls — the pool is consented, not scraped |
| **Primary visual** | The ranked list at full width: 6–8 rows, scores out of 100, classification chips, a `14 strong · 11 good` counter. The row section 06 opens is visibly present here |
| **Product UI** | **REAL, composed HTML** — `08 § 2` |
| **Motion** | `data-reveal="rise"` on the composition, then `data-layers` on the rows — they arrive 120ms apart, which communicates *ranking* rather than decoration `docs/motion-system.md § 3`. Score rings count up `data-count`, staggered. **Intensity: HIGH** |
| **Interaction** | Optional: band filter chips that actually filter the mock list. Cheap, and it proves the list is real rather than an image |
| **CTA** | None |
| **Transition** | **The most important transition on the page.** A row is selected and the view opens into it. 05 and 06 are one continuous move — 06 takes `--section-y-tight` at its top edge and the same candidate carries across |
| **Importance** | **CRITICAL** |
| **Gate** | **Clear.** `[OVERVIEW]` workflow 1 step 5 licenses *"ranks candidates in the database"* explicitly, which closes the open item in `docs/content-integrity.md § 2`. Mention privacy controls alongside it — a searchable pool needs its consent model in the same breath |

---

### SECTION 06 — THE ARGUMENT ★ SIGNATURE
`paper` · `.section--tight` at the top edge · asymmetric: panel dominant

| | |
|---|---|
| **Purpose** | **The centre of the page.** Prove that the score decomposes into an argument a recruiter can inspect, disagree with, and act on |
| **Audience** | Recruiter, and the hiring manager reading over their shoulder |
| **Message** | The score shows its work — five dimensions, three skill states, and what it thinks is wrong |
| **Copy concept** | H2: *"The score <em>shows its work.</em>"* Lede: skill coverage, experience alignment, location, salary and semantic fit — then which skills are covered, which are **partial**, which are missing, and a two-sentence narrative saying why this candidate is *or isn't* a fit. Body positioned as *the engine's case*, with the recruiter as the one who rules on it |
| **Primary visual** | The full explanation panel: `92` and a **Strong Match** chip, the five-dimension breakdown, Covered / **Partial** / Missing skills, the AI narrative, and the seniority + drop-off signals **last** |
| **Product UI** | **REAL, composed HTML, interactive** — `08 § 3`. Every element LIVE `[OVERVIEW]` § 3 |
| **Motion** | **SIGNATURE.** A single `data-layers` sequence, one expressive primitive per composition `docs/product-visualization.md § 4`: score counts `0 → 92` · classification chip resolves · five breakdown bars fill in order · covered chips arrive as a group · **the partial chip arrives alone, 200ms later, with the adjacent skill that transfers named beneath it** · the missing chip · the narrative fades in as a block, no typewriter · **the seniority and drop-off signals arrive last, after a deliberate pause.** The partial beat is the section's hinge — it is where the skill graph becomes visible, and it sets up section 07. Full timing: `07 § 4` |
| **Interaction** | **One of two memorable ones** `[02 § 11]`: three candidate rows are selectable. Selecting another re-runs the sequence with genuinely different outcomes — a `Good Match` with two partials, a `Potential` who is under-levelled but scores high on potential, a strong scorer flagged for drop-off risk. Keyboard-operable, real `<button>`s, `aria-live="polite"` on the panel. Reduced motion: values swap instantly |
| **CTA** | The page's one mid-page exploratory link: `.link` → *"How the match is calculated"* → `/product/matching` |
| **Transition** | The argument is complete. What did search miss entirely? |
| **Importance** | **CRITICAL — if only one section is built well, this one** |
| **Gate** | **Clear on capability.** One content dependency remains: narrative and signal text must come from the product, not from marketing — real output beats anything a copywriter produces `[10 § R4]` |

---

### SECTION 07 — ADJACENCY ★ SIGNATURE
`bone` · `.section--sunken` · centred composition

| | |
|---|---|
| **Purpose** | Explain *how* section 06 was possible. The moat, made visible `[02 § 7]` |
| **Audience** | Recruiter, and the sceptic who wants to know what "AI matching" actually means |
| **Message** | The platform knows what skills mean and how they relate. Docker is a prerequisite for Kubernetes; React transfers to Vue. That is why the partial in section 06 was a partial and not a miss |
| **Copy concept** | H2: *"Your filter said no. <em>The skills said otherwise.</em>"* Body: skills are structured — typed, hierarchical, and related to one another by *requires*, *enables* and *similar to* — not a flat list of words. Hidden-talent detection is that structure doing its job, and it is why the effective pool is larger without the bar being lower `[OVERVIEW]` § 6, § 8. Optional closing clause: aligned to ESCO and O*NET, which is the credibility line rather than the headline |
| **Primary visual** | A skill-relationship graph: the requirement node, the candidate's adjacent nodes, the relationship path lighting up, then the candidate rejoining the ranked list at a new position |
| **Product UI** | **ABSTRACT SYSTEM DIAGRAM.** The one place on the homepage where abstraction beats product UI — the relationship is a property of the model, not a screen `docs/product-visualization.md § 3`. Spec: `08 § 4` |
| **Motion** | **SIGNATURE.** Nodes arrive, the relationship path draws, the candidate row slides into the list. The only place `stroke-dashoffset` is used on the site — a new primitive (**P4**), so it must be demonstrated in `motion-lab.html` first `docs/motion-system.md § 6`. **Intensity: SIGNATURE** |
| **Interaction** | Hover a node for the relationship label (*requires* / *enables* / *similar to*). Not load-bearing — the animation carries it |
| **CTA** | None |
| **Transition** | The machine found something you would have missed. Which raises: how much of this is the machine's call? |
| **Importance** | **CRITICAL.** Promoted. This is the section that converts "AI matching" from a claim into a mechanism, and it is the one thing on the page a competitor cannot bolt on |
| **Gate** | **Clear on capability** — the relational skill graph, hidden-talent detection and ESCO/O*NET mapping are all LIVE `[OVERVIEW]` § 3, § 6. **One content dependency:** use only `[OVERVIEW]`'s own three edges — TypeScript↔JavaScript, Docker→Kubernetes, React→Vue. An invented edge is an invented capability `[08 § 4]` |

---

### SECTION 08 — CONTROL ★ SIGNATURE
`paper` · `.section` · `.split`, controls left, ranked list right

| | |
|---|---|
| **Purpose** | Resolve the objection the last four sections created: *is the machine deciding?* |
| **Audience** | Recruiter, and the hiring manager |
| **Message** | You set what matters, the ranking follows — and you can test a change before you commit to it |
| **Copy concept** | H2: *"You decide what counts. <em>It does the arithmetic.</em>"* Two beats: **tune** — make Python matter more than SQL and the list re-ranks instantly; **simulate** — drop a preferred skill and see how many more qualified candidates appear, before changing the job `[OVERVIEW]` § 3. Closing line on the point: it shows its work *and* lets you override it |
| **Primary visual** | Skill importance controls beside the live ranked list. Change one, the list reorders and the scores recompute. A second small readout for the what-if: pool size before → after |
| **Product UI** | **INTERACTIVE PRODUCT DEMO** — `08 § 5`. Weight tuning, instant re-rank and what-if simulation are all LIVE `[OVERVIEW]` § 3 |
| **Motion** | Weight change → rows reorder (**P3**) → scores recount with `data-count`. Reordering is the one animation that *is* the information. **Intensity: SIGNATURE** |
| **Interaction** | Three importance controls, real `<input type="range">` with `aria-valuetext` reading the tier word (critical / required / preferred / bonus), plus one what-if toggle. Deterministic **precomputed** outcomes — never client-side arithmetic pretending to be the engine `[08 § 5]`. Reduced motion: rows reposition without transition |
| **CTA** | None |
| **Transition** | Control established. Now: what the people on the other side of it see |
| **Importance** | **CRITICAL** — it answers the black-box objection `[OVERVIEW]` § 9 names as a buyer characteristic, and it is the only place the visitor changes the outcome |
| **Gate** | **Clear.** Do not cite the prototype's `tweaks-panel.jsx` as reference — it is a design tool, not a product feature `[00 § 5]` |

---

### SECTION 09 — THE HIRE
`bone` · `.section--sunken` · `.steps` with the hairline connector

| | |
|---|---|
| **Purpose** | Remove the objection *"so I still need an ATS?"*. Sufficiency, never superiority `[03 § 2]` |
| **Audience** | Recruiter, and whoever they have to justify a purchase to |
| **Message** | The shortlist becomes a hire in the same system — approvals, stages, interviews, feedback |
| **Copy concept** | H2: *"From shortlist <em>to signed.</em>"* Deliberately short. Four steps: **open** (approval before publish), **move** (custom stages, both sides can see them), **meet** (interview records, structured feedback), **decide**. One paragraph, no feature grid. One clause that the stages are the team's own, named and ordered by them `[OVERVIEW]` § 3 |
| **Primary visual** | The pipeline: stage columns with the real default names `SOURCED · REVIEWED · SHORTLISTED · INTERVIEWING · OFFER · HIRED`, counts per stage, a candidate card moving one stage |
| **Product UI** | **SIMPLIFIED PRODUCT UI** — `08 § 8`. Stages, customisation and counts are LIVE `[OVERVIEW]` § 3; keep it schematic because this section's job is reassurance, not depth |
| **Motion** | `data-reveal-group data-stagger="slow"` on the steps — order carries meaning here, which is what `slow` is for. One card advances one column, once. **Intensity: LOW** |
| **Interaction** | None. This section's job is reassurance, and reassurance does not need a toy |
| **CTA** | None |
| **Transition** | The hire is made. Someone got the job — and everyone else got an answer |
| **Importance** | **MEDIUM** — low glamour, high objection-clearing value. Do not let it grow |
| **Gate** | **Clear**, with one exclusion: interview **scheduling with calendar sync** is UPCOMING `[OVERVIEW]` § 7. Copy may say interviews are recorded and tracked; it may not say they are scheduled or synced |

---

### SECTION 10 — BOTH SIDES
`paper` · `.section` · `.split`, two frames facing each other

| | |
|---|---|
| **Purpose** | The closing turn `[02 § 6]`. Land two-sided transparency — addressed to the recruiter, about the candidate |
| **Audience** | Recruiter (**not** the candidate — this section is evidence, not a pitch) |
| **Message** | The reasoning is not only yours. The candidate sees the same score and the same breakdown — and gets told what to do about it |
| **Copy concept** | H2: *"The person you passed on <em>can see why.</em>"* Body: candidates see their match score, a breakdown of where they fit and where they don't, real application status rather than silence, and AI feedback on their own résumé with specific suggestions `[OVERVIEW]` § 2, § 8. Closing serif line on the turn: *transparency that only runs one way is just a dashboard.* Optional supporting clause, and a good one: this is *"uncommon in ATS products, which typically optimize entirely for the recruiter"* — `[OVERVIEW]`'s own framing, worth borrowing |
| **Primary visual** | Two frames. **Left:** the candidate's view of the *same* candidate from section 06 — same score, same dimensions, "where you fit / where you don't". **Right:** their own intelligence — résumé quality score with suggestion count, the skills that would open more roles, and an honest application timeline |
| **Product UI** | **REAL, composed HTML** — `08 § 9` (candidate match view) and `08 § 11` (résumé and gaps). All LIVE `[OVERVIEW]` § 3 |
| **Motion** | `data-reveal="left"` / `data-reveal="right"` — the pairing is the argument `docs/motion-system.md § 3`. `.float--delayed` on the left frame only, never both. **Intensity: MEDIUM** |
| **Interaction** | None |
| **CTA** | `.link` → *"How it works for candidates"* → `/for-candidates`. The only place the candidate audience is addressed on the homepage |
| **Transition** | Both sides can see it. So what does that commit us to? |
| **Importance** | **HIGH** — the least expected section on the page and structurally impossible for a single-sided tool to copy |
| **Gate** | **Clear on the core claim.** Two constraints: (1) `[OVERVIEW]` § 7 puts in-platform messaging and notifications in **upcoming**, so the copy must not imply candidates are messaged or alerted — they *can see* status, which is a different and still-strong claim; (2) **do not use the employer-reputation card here.** `[PROTO]` reads a real reputation endpoint but `[OVERVIEW]` does not mention reputation scoring, SLAs or candidate reviews of employers at all `[00 § 4]`. It is `01 § 6` Q1 — ask, do not build |
| **What changed** | Earlier drafts built this section on employer reputation scoring from candidate reviews, sourced from the now-superseded `TranspaHire.pdf`. `[OVERVIEW]` does not support it. The rebuilt version is a stronger claim anyway: the candidate does not see a *proxy* for the recruiter's reasoning, they see **the same score** |

---

### SECTION 11 — PHILOSOPHY
`ink` · `.section--ink` · centred, typographic

| | |
|---|---|
| **Purpose** | State what the company believes, in the register `[02 § 9]` defines. Convert everything above into a stance |
| **Audience** | Everyone, especially a sceptic |
| **Message** | The AI recommends and explains. A person reviews and decides |
| **Copy concept** | A progression set in type, four beats, mono labels and a display line each: **recommends** (it ranks the pool) → **explains** (it shows the arithmetic) → **you review** (you read the case) → **you decide** (and you can change the inputs). Then one statement in `.quote`: *"A recommendation you can argue with is <em>the only kind worth having.</em>"* **Stop there.** The fifth beat — traceability — is legally gated and does not go on the page without named sign-off `docs/content-integrity.md § 4` |
| **Primary visual** | **TYPOGRAPHIC COMPOSITION.** No icons, no shields, no lock glyphs. The restraint is the argument `[02 § 9]` |
| **Product UI** | None. Deliberate — a trust claim illustrated with a screenshot reads as a feature; set in type it reads as a position |
| **Motion** | `data-reveal-group data-stagger="slow"` on the four beats, then `data-reveal="blur"` on the closing statement (three of three). **Intensity: LOW** |
| **Interaction** | None |
| **CTA** | None — 12 is one thought away |
| **Transition** | Runs straight into the CTA as one dark closing movement |
| **Importance** | **HIGH** — for a young vendor making decisions about people's careers, this section is the difference between confident and cavalier |
| **Gate** | **Four beats are clear.** The fifth is not — and note the distinction carefully, because it changed: fairness monitoring, the audit trail and decision justification are **LIVE features** `[OVERVIEW]` § 3, § 6. What is blocked is *marketing them*, because automated hiring tools are regulated and `docs/content-integrity.md § 4` requires named legal sign-off. **Existence is not permission** `[02 § 9]`. If sign-off arrives, the fifth beat is *"the weights are logged"* — a statement about mechanism — never *"auditable"*, *"compliant"* or *"defensible"* |

---

### SECTION 12 — CTA
`indigo` · `.cta` · `--section-y-tight` · centred

| | |
|---|---|
| **Purpose** | The primary conversion moment, at peak belief `[02 § 10]` |
| **Audience** | Recruiter |
| **Message** | See it against your own roles |
| **Copy concept** | H2: *"Bring a role <em>you're struggling to fill.</em>"* — the most concrete, least generic demo ask available, and it doubles as qualification. Supporting: what a demo actually involves. Fine print: **only verifiable facts.** Not "setup in 10 minutes", not "join hiring teams using Transpahire" — both currently on the page and both unsourced `docs/content-integrity.md § 2` |
| **Primary visual** | None. Centred, terminal `DESIGN.md § 1` |
| **Product UI** | None |
| **Motion** | `data-reveal="scale"` on the block. **Intensity: LOW** |
| **Interaction** | None. The form lives on `/demo` |
| **CTA** | Primary `Book a demo` → `/demo`. Secondary `.btn--secondary` → `/product/matching`. Candidate link in the footer only |
| **Transition** | Footer |
| **Importance** | **CRITICAL** |
| **Gate** | Fine print must be verifiable |

---

## 3. Signature moments

Brief § 13 asks for 3–5. **Four, all on confirmed capability.** The earlier
draft's fallback set is no longer needed — `[OVERVIEW]` cleared both gates.

| | Section | Why it earns it |
|---|---|---|
| ★★★ | **06 The argument** | The definitive one. The differentiator, demonstrated and operable. Its hinge is the **partial** skill state |
| ★★★ | **08 Control** | The only place the visitor changes the outcome. Answers the black-box objection `[OVERVIEW]` § 9 names as a buyer trait |
| ★★ | **07 Adjacency** | The most visually distinctive idea on the site, and the moat made visible |
| ★ | **05 → 06 transition** | The ranked list opening into the argument. A transition, not a section — and the moment the page feels like software |

The three section-length moments form a deliberate chain: **06** shows the
argument, **07** explains how it was possible, **08** hands it to the visitor.
Each one answers the question the previous one raises.

Two things this list does *not* include, on purpose: the hero (it must be
instantly legible, not impressive) and section 11 (its power is restraint).

**If time runs out**, build in this order: 06, then 08, then 07. Section 07 is
the most distinctive and the most expensive — it needs a new motion primitive
(P4) and product-confirmed skill edges. Sections 06 and 08 share their data and
most of their components.

## 4. Mobile

Brief § 30. Per-section decisions; the responsive contract is `DESIGN.md § 9`.

| § | At 390px |
|---|---|
| 01 | Text first, frame below. Crop the composition to **one candidate row plus the panel head** — the full list is unreadable at this width. `.float` off (coarse pointer) |
| 02 | Cards stack. The ink statement keeps its full type scale — it is the section's whole job |
| 03 | Unchanged. Type-only sections are already responsive |
| 04 | Text first, then the requisition card. Skill chips wrap; do not scroll them |
| 05 | **Simplified variant.** Four rows, not eight. Score and classification only — drop the inline coverage meter. `data-layers` stagger drops to `fast` so the sequence does not outlast the reader's patience |
| 06 | **The panel becomes the section.** Full width, single column, five breakdown bars full width. Candidate switcher becomes a horizontally scrollable row of three chips inside its own `overflow-x: auto` container `DESIGN.md § 9`. The sequence still runs, partial beat included — this is the composition most worth the mobile effort |
| 07 | **Simplified variant.** Three nodes, vertical — requirement, the relationship, the candidate's adjacent skill. Not the full graph. If the simplification cannot carry the idea, show a static diagram rather than a bad animation |
| 08 | Controls above the list. **One** importance control, not three; keep the what-if toggle. Reordering still animates — it is the information, and this is a signature moment, so it is worth the mobile budget |
| 09 | Steps stack, connector removed (already the contract). Pipeline becomes a vertical stage list |
| 10 | Candidate match view first, résumé-and-gaps frame second — the shared score is the more surprising of the two and mobile reading order should lead with it |
| 11 | Four beats stack. Unchanged otherwise |
| 12 | Buttons stack full-width |

Cross-cutting: parallax off on coarse pointers, `.float` off, nothing scrolls
horizontally except the two named containers, and every simplified variant is
authored as a real layout rather than a scaled-down desktop one
`DESIGN.md § 9`.

## 5. What this page does not do

- **It does not list features.** Zero card grids beyond section 02's three
  problem cards.
- **It does not claim a number.** No stats section, no percentages, no
  time-saved. Until real data exists, the product's specificity is the proof.
- **It does not mention a competitor by name**, and its category claims stay at
  category level `[02 § 8]`.
- **It does not sell to candidates.** One section and one link.
- **It does not ask twice.** Header CTA, one mid-page link, one closing CTA.
- **It does not show anything the product cannot do.** Every section is now on
  confirmed capability — but three things are still withheld: the sourcing agent
  and Chrome extension are named, not depicted (`§ 04`); the fifth trust beat is
  unwritten (`§ 11`); employer reputation is absent (`§ 10`). The mechanism is
  still working; it just has less to hold back.
- **It does not display an analytics figure.** Pool sizes, funnel rates and
  scarcity indices are computed by the product, but no real values exist to show
  `[01 § 6]` Q5. Section 08's what-if readout is the one exception, and it is
  labelled as an example.
