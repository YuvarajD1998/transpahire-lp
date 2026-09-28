# 03 — Product pillars

`[OVERVIEW]`'s fourteen modules and thirty-two features, clustered into six
pillars and tiered by where they belong on the site.

---

## 1. Why these six

`[OVERVIEW]` organises by module — correct for a product document, wrong for a
site. Fourteen modules is fourteen nav items. Two structural decisions:

**The skill taxonomy gets its own pillar.** `[OVERVIEW]` buries it as module
thirteen and then calls it *"the intelligent backbone of the platform"* and
*"what makes matching accurate rather than approximate"*. It is the moat `[02 § 7]`
and it is invisible if folded into matching. Marketing it separately is what turns
"we use AI" into "we understand that Docker leads to Kubernetes".

**Workflow and analytics merge.** Pipelines, applications and interviews are how
the hire runs; funnel, pipeline health and org trends are how you see whether it
ran well. Same audience, same section, one story. Splitting them produces the
fourth card grid `docs/audit.md § 5` warns about.

| # | Pillar | The question it answers | Modules |
|---|---|---|---|
| 1 | **Sourcing & Discovery** | Where do candidates come from? | Candidate Search, sourcing agent, Chrome extension |
| 2 | **Explainable Matching** | Who fits, and why? | Smart Matching Engine |
| 3 | **Skill Intelligence** | How does it know? | Skill & Job Taxonomy |
| 4 | **Candidate Intelligence** | What do we know about this person? | Candidate Profiles, Resume Intelligence |
| 5 | **Recruiter Control** | What if I disagree with it? | Recruiter Controls & Tuning |
| 6 | **Hiring Operations** | Then what happens, and did it work? | Job Management, Pipeline, Application Tracking, Analytics, Pool Intelligence |

Pillar 3 makes pillar 2 possible; 1 and 4 feed it; 5 governs it; 6 acts on it.
That dependency order is also the homepage order.

Not a pillar: User & Org Management (an administrative capability, not a story),
Location Intelligence (proof of craft — a footnote at most, though the 148,000-city
alias resolution is a nice detail for `/product/candidate-intelligence`).

---

## 2. The pillars

### Pillar 1 — Sourcing & Discovery
*"Find them by filter, or by description."*

| Capability | Status |
|---|---|
| Structured search — skills, experience, location, education, certifications, availability, notice period, open-to-work, expected salary, profile quality | **LIVE** |
| Semantic search — plain-text description → relevant candidates | **LIVE** |
| Both modes in one interface, switchable | **LIVE** — a stated differentiator `[OVERVIEW]` § 6 |
| Ranking against the whole database, without waiting for applications | **LIVE** — workflow 1 step 5 |
| Similar-candidate discovery | **LIVE** |
| Quick-view candidate drawer, infinite scroll | **LIVE** |
| Add to pipeline from search; source attribution | **LIVE** |
| AI Candidate Sourcing Agent | **PRODUCT DIRECTION** `[OWNER]` — exists; interface undescribed |
| Chrome Extension | **PRODUCT DIRECTION** `[OWNER]` — exists; scope undescribed |

**Marketing note.** Mention candidate privacy controls (public / limited /
private) wherever the shared database appears. A recruiter reads it as data
quality; a candidate reads it as consent. Both are true and it costs one clause.

### Pillar 2 — Explainable Matching
*"Every ranking comes with its reasons."*

| Capability | Status |
|---|---|
| Match score **0–100**, every candidate-job pair | **LIVE** |
| Five dimensions — skill coverage, experience alignment, location preference, salary alignment, AI semantic similarity | **LIVE** |
| Four classifications — Strong / Good / Potential / Weak | **LIVE** |
| Per-skill state — **covered / partial / missing** | **LIVE.** The *partial* state is where the skill graph becomes visible |
| AI narrative, 2–3 sentences, why a candidate is *or isn't* a fit | **LIVE** |
| Audit trail — weights and skill-level scores logged at computation time | **LIVE**; claim gated `[02 § 9]` |
| Hiring decision justification | **LIVE**; claim gated |

### Pillar 3 — Skill Intelligence
*"It understands skills, not words."*

| Capability | Status |
|---|---|
| Hierarchical skill catalogue, category → specific tool | **LIVE** |
| Skill types — technical, soft, domain, tools, certifications, languages | **LIVE** |
| **Skill relationships — requires / enables / similar to** | **LIVE.** The mechanism behind everything else here |
| Skill clusters (e.g. a frontend stack) | **LIVE** |
| **Hidden talent detection** — adjacent experience that transfers | **LIVE** |
| Hierarchical job role catalogue, families → titles | **LIVE** |
| Seniority levels, intern → distinguished/executive | **LIVE** |
| Career progression maps | **LIVE** |
| ESCO and O*NET alignment | **LIVE** |
| Skill demand and trending scores | **LIVE** |
| Duplicate detection and merging, catalogue QA | **LIVE** — internal, never marketed |

`[OVERVIEW]`'s own examples, and the right ones to use: TypeScript relates to
JavaScript; Docker is a prerequisite for Kubernetes; React transfers to Vue.
**Use these three and no others** — they are sourced, and an invented edge is an
invented capability `[08 § 4]`.

### Pillar 4 — Candidate Intelligence
*"A profile, not a document — and signals you couldn't derive by hand."*

| Capability | Status |
|---|---|
| Résumé upload, AI extraction of skills, history, education, certifications, projects | **LIVE** |
| **Per-item confidence indicators** + accept/reject/edit review screen | **LIVE.** Unusually honest; worth showing |
| Résumé critique — quality score + specific suggestions | **LIVE** |
| Résumé quality shown to recruiters as a trust signal | **LIVE** |
| Structured profile — skills with proficiency and years each, experience, education, projects, certifications, links | **LIVE** |
| Preferences — salary, location, notice period, work style | **LIVE** |
| Privacy control — public / limited / private | **LIVE** |
| Profile completeness tracker | **LIVE** |
| **Career trajectory** — consistent growth / pivot / specialist / generalist | **LIVE** |
| **Seniority alignment** — over- or under-levelled | **LIVE** |
| **Potential score** — likelihood of growing into the role | **LIVE** |
| **Responsiveness signal** | **LIVE** |
| **Drop-off risk prediction** | **LIVE** |

The last five are the most marketable cluster in the product after the
explanation itself. Sell them together, on `/product/matching`, as *signals you
could not have derived by reading the CV*.

### Pillar 5 — Recruiter Control
*"You decide what matters."*

| Capability | Status |
|---|---|
| Skills tiered by importance on the job — **critical / required / preferred / bonus** | **LIVE.** The shipped foundation |
| Per-skill weight tuning, instant re-rank | **LIVE** |
| **What-if simulation** — change a requirement, see the pool move | **LIVE** |
| JD optimizer — too many criticals, near-impossible skills, missing soft-skill tiers | **LIVE** |
| JD document upload with automatic skill extraction | **LIVE** |
| Fairness monitoring report | **LIVE**; claim gated `[02 § 9]` |

All previously gated, all confirmed. This pillar moves from *hoped-for* to
*section 08 is buildable as specified*.

### Pillar 6 — Hiring Operations
*"Move the right people forward, and see whether it worked."*

| Capability | Status |
|---|---|
| Job lifecycle — Draft → Under Review → Approved → Published → Active → Closed; pause; duplicate | **LIVE** |
| Approval workflow before publish | **LIVE** |
| Salary visibility toggle; team assignment | **LIVE** |
| Custom pipelines — default `Sourced · Reviewed · Shortlisted · Interviewing · Offer · Hired/Rejected`, renameable, recolourable, reorderable | **LIVE** |
| Application tracking both sides — submitted, viewed, shortlisted, interview scheduled, offered, rejected | **LIVE** |
| Feedback and ratings, public or private | **LIVE** |
| Interview records and history | **LIVE** |
| Funnel, conversion, time-to-hire by stage | **LIVE** |
| Pipeline health — stage bottlenecks | **LIVE** |
| Skill gap analysis; skill heatmap | **LIVE** |
| Talent pool intelligence — pool size, score distribution, per-skill coverage, scarcity index | **LIVE** |
| Org intelligence — match-to-hire, average score at hire, prediction accuracy | **LIVE** |
| Interview **scheduling** with calendar sync | **UPCOMING** `[OVERVIEW]` § 7 |

**Marketing rule: sufficiency, never superiority.** This pillar's job is to remove
*"so I still need an ATS?"*. One homepage section, one frame, no feature grid —
`[OVERVIEW]` § 1 positions the product as *lighter* than an enterprise ATS, so
competing on workflow depth argues against the product's own positioning.

**No analytics figure may be displayed** — the modules compute real numbers, but
none exist to show `[01 § 6]` Q5. Show the mechanism, never a value.

---

## 3. Feature scoring

1–5 per axis. **Differentiation** = how hard for a competitor to claim.
**Buyer value** = the primary buyer's felt urgency `[02 § 4]`. **Visual** = can it
be shown, not described. **Strategic** = does it carry the positioning.

| Feature | Diff | Buyer | Visual | Strat | Σ | Tier |
|---|---|---|---|---|---|---|
| Match explanation — score + 5 dimensions + per-skill state | 4 | 5 | 5 | 5 | **19** | **1** |
| **Skill graph / relationships** | 5 | 4 | 5 | 5 | **19** | **1** |
| **Hidden talent detection** | 5 | 5 | 5 | 4 | **19** | **1** |
| **Skill weight tuning + instant re-rank** | 4 | 5 | 5 | 5 | **19** | **1** |
| AI narrative | 4 | 5 | 4 | 4 | **17** | **1** |
| **What-if simulation** | 4 | 4 | 5 | 4 | **17** | **1** |
| Candidates see the same score and breakdown | 5 | 3 | 4 | 5 | **17** | **1** |
| Four-tier skill importance on the job | 3 | 5 | 4 | 4 | 16 | **1** |
| Semantic + structured search in one interface | 3 | 5 | 3 | 4 | 15 | 2 |
| Seniority alignment | 4 | 4 | 4 | 3 | 15 | 2 |
| Potential score | 4 | 3 | 4 | 3 | 14 | 2 |
| Career trajectory | 4 | 3 | 4 | 3 | 14 | 2 |
| **Drop-off risk prediction** | 5 | 4 | 3 | 2 | 14 | 2 |
| Responsiveness signal | 4 | 4 | 3 | 3 | 14 | 2 |
| Résumé critique + quality score | 3 | 3 | 4 | 3 | 13 | 2 (candidate page **1**) |
| Résumé extraction with per-item confidence | 3 | 3 | 4 | 3 | 13 | 2 |
| Similar-candidate discovery | 3 | 4 | 3 | 2 | 12 | 2 |
| Talent pool intelligence + scarcity index | 4 | 3 | 3 | 2 | 12 | 3 |
| JD optimizer | 3 | 4 | 3 | 2 | 12 | 3 |
| AI Sourcing Agent `[OWNER]` | 3 | 5 | 5 | 3 | 16 | **2 — copy yes, depiction no** |
| Profile completeness tracker | 2 | 2 | 3 | 2 | 9 | 3 (candidate page 2) |
| Custom pipelines | 2 | 4 | 3 | 2 | 11 | 3 |
| Application status, both sides | 3 | 3 | 3 | 3 | 12 | 3 |
| Skill heatmap | 3 | 2 | 4 | 2 | 11 | 3 |
| Pipeline health / funnel / time-to-hire | 2 | 3 | 3 | 2 | 10 | 3 |
| Job approval workflow | 1 | 3 | 2 | 2 | 8 | 3 |
| Chrome Extension `[OWNER]` | 3 | 3 | 3 | 2 | 11 | 3 |
| Org intelligence | 2 | 2 | 3 | 1 | 8 | 3 |
| ESCO / O*NET alignment | 3 | 2 | 2 | 3 | 10 | 3 — *evidence for the graph, not a feature* |
| Interview records + feedback | 1 | 3 | 2 | 1 | 7 | 4 |
| Location intelligence | 2 | 2 | 2 | 1 | 7 | 4 |
| Fairness monitoring · audit trail · decision justification | 4 | 3 | 2 | 3 | 12 | **4 — legally gated** `[02 § 9]` |
| Org / role / seat management | 1 | 1 | 1 | 1 | 4 | 4 |
| Everything in `[OVERVIEW]` § 7 (messaging, notifications, billing, calendar, verification, scorecards, OAuth…) | — | — | — | — | — | **4 — UPCOMING** |

Six features now score 17+, against three before the Overview. The page has more
Tier-1 material than it has room for — which is a better problem than the one it
had, and § 4 is where the discipline goes.

## 4. Tiers

**Tier 1 — homepage-defining.** Eight, all LIVE.
Match explanation · skill graph · hidden talent · weight tuning with instant
re-rank · AI narrative · what-if simulation · candidates see the same score ·
four-tier skill importance.

**Tier 2 — supporting; homepage mention, full treatment on a product page.**
Dual-mode search · seniority alignment · potential score · career trajectory ·
drop-off risk · responsiveness · résumé critique and extraction confidence
(Tier 1 on `/for-candidates`) · similar candidates · the sourcing agent **in copy
only**.

**Tier 3 — product and solution pages only.**
Pool intelligence and scarcity · JD optimizer · pipelines · application status ·
skill heatmap · funnel and pipeline health · approval workflow · Chrome extension
· org intelligence · ESCO/O*NET (as evidence for pillar 3, never as a feature
bullet).

**Tier 4 — in the product; not marketed now.**
Fairness, audit trail and decision justification (**LIVE but legally gated** —
the only Tier 4 entries that are there for permission rather than for lack of
interest) · interview records · location intelligence · org and seat management ·
every `[OVERVIEW]` § 7 upcoming capability.

For the roadmap treatment: `.card--dashed` exists for it, and `docs/audit.md § 5`
says reduce nine cards to three or four. `[OVERVIEW]` § 7 lists eleven upcoming
features — **pick four**, on `/product`, not the homepage. Recommended:
in-platform messaging, notifications, interview scheduling with calendar sync,
collaborative scorecards. They are the four a recruiter would ask about.

## 5. Pillar → page → section map

| Pillar | Homepage | Product page |
|---|---|---|
| 1 Sourcing & Discovery | § 04 (search), § 04b `[deferred]` | `/product/sourcing` |
| 2 Explainable Matching | § 05, **06** | `/product/matching` |
| 3 Skill Intelligence | **§ 07** | `/product/matching` |
| 4 Candidate Intelligence | § 10 (candidate half) | `/product/candidate-intelligence` |
| 5 Recruiter Control | **§ 08** | `/product/matching` |
| 6 Hiring Operations | § 09 | `/product` overview |
| — Two-sided transparency *(spans 2 and 4)* | § 10 | `/for-candidates` |
