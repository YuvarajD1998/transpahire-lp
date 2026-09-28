# 01 — Product analysis

What Transpahire is, read off `[OVERVIEW]`.

---

## 1. The one-paragraph reading

Transpahire is an **intelligent hiring platform whose product is an explained
match.** A team defines a role — skills tiered by importance, seniority,
experience, location, salary — and the platform scores every candidate in the
database against it, 0–100, broken into five dimensions, with a plain-language
narrative and a skill-by-skill account of what is covered, partial and missing
`[OVERVIEW]` § 3. Around that engine sit three things that make it usable rather
than merely clever: **intelligence about the person** (résumé extraction, career
trajectory, seniority alignment, potential, responsiveness, drop-off risk),
**control for the human** (per-skill weight tuning, what-if simulation, JD
optimisation, fairness reporting), and **enough workflow** to run the hire —
custom pipelines, applications, interviews, analytics. Candidates are
first-class: they see the same score, the same breakdown, their real application
status, and AI feedback on their own résumé.

`[OVERVIEW]`'s own framing, and the right one:

> Transpahire sits between a traditional applicant tracking system and a smart
> talent marketplace. It is lighter and faster than enterprise ATS tools, but far
> more intelligent than a basic job board.

The centre of gravity is not the workflow and not the search. It is the
**explanation** — and `[OVERVIEW]` § 6 says so first: *"Most hiring platforms show
a score. Transpahire shows the reasoning behind the score."*

## 2. The shape of the thing

```
                              THE SKILL & JOB TAXONOMY
        hierarchical · typed · related (requires / enables / similar) · clustered
              seniority levels · career progression · ESCO + O*NET mapped
                                        │
                            everything below reads from it
                                        │
   ┌────────────────────────────────────┴────────────────────────────────────┐
   │                                                                          │
 JOB                                                              CANDIDATE PROFILE
 title · description · location                                  skills + proficiency
 skills tiered: critical /                                       experience · education
 required / preferred / bonus                                    projects · certifications
 seniority · experience · salary                                 preferences · privacy
 approval workflow                                               résumé → extracted
   │                                                                          │
   └──────────────────────────► MATCHING ENGINE ◄────────────────────────────┘
                                        │
              score 0–100  ·  Strong / Good / Potential / Weak
                                        │
     skill coverage · experience alignment · location preference ·
              salary alignment · AI semantic similarity
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        │                               │                               │
   EXPLANATION                    INTELLIGENCE                     CONTROL
   covered / partial /            hidden talent · potential        skill weights
   missing skills                 career trajectory                what-if simulation
   AI narrative (2–3 sent.)       seniority alignment              JD optimizer
   audit trail w/ weights         drop-off risk                    fairness report
                                  responsiveness
        │                               │                               │
        └───────────────────────────────┼───────────────────────────────┘
                                        ▼
                        PIPELINE  →  INTERVIEWS  →  DECISION
                     custom stages    feedback     AI justification
                                        │
                                   ANALYTICS
                    funnel · pipeline health · skill gaps · pool
                    intelligence · skill heatmap · org trends
```

Three structural facts, all of which matter to the marketing:

**The taxonomy is upstream of everything.** `[OVERVIEW]` calls it *"the
intelligent backbone"* and it is the reason the product can claim understanding
rather than matching: skills have **types**, **hierarchies** and **relationships**
— one skill *requires*, *enables* or *is similar to* another. That is what makes
hidden-talent detection, semantic similarity and career-progression mapping
possible from one substrate. It is also the single most defensible thing in the
product, because a competitor cannot bolt it on.

**The explanation is a first-class output, not a tooltip.** Score, five
dimensions, per-skill coverage state, narrative, and a full audit trail recording
*the exact weights and skill-level scores at the time of computation*
`[OVERVIEW]` § 6.

**The human is in the loop by design.** Weights are tunable, simulations are
runnable, fairness is *reported rather than silently corrected*, and every
override is logged. `[OVERVIEW]` § 8: *"Most AI hiring tools are black boxes.
Transpahire shows its work and lets humans override it."*

## 3. The fourteen modules

| Module | Marketing weight | Where |
|---|---|---|
| **Smart Matching Engine** | **The product.** Hero + centre of the homepage | § 01, 05, 06, 07 |
| **Skill & Job Taxonomy** | **High — the moat.** Explains why matching works | § 07, `/product/matching` |
| **Recruiter Controls & Tuning** | **High.** The agency story | § 08 |
| **Candidate Search** | High. Dual-mode, structured + semantic | § 04, `/product/sourcing` |
| **Resume Intelligence** | Medium–high. Best candidate-side story | § 10, `/for-candidates` |
| **Job Management** | Medium. The "understand the role" beat | § 04 |
| **Candidate Profiles** | Medium. Trust and data provenance | `/product/candidate-intelligence` |
| **Hiring Pipeline** | Medium. Sufficiency, not superiority | § 09 |
| **Application Tracking** | Medium. Both-sides visibility | § 10 |
| **Talent Pool Intelligence** | Medium. Distinctive, low urgency | `/product/matching` |
| **Hiring Analytics** | Low–medium | `/product` |
| **User & Org Management** | Low. Do not market | — |
| **Location Intelligence** | Low. Proof of craft, not a pillar | Footnote at most |

Plus two `[OWNER]`-confirmed capabilities that `[OVERVIEW]` does not detail:
the **AI Candidate Sourcing Agent** and the **Chrome Extension**. See § 6 Q2.

## 4. The data model, as marketing material

The fields every visualisation must be built from.

**The match** `[OVERVIEW]` § 3–4

| Field | Value | Note |
|---|---|---|
| Match score | `0–100` | The headline number, both sides |
| Classification | `Strong Match` · `Good Match` · `Potential` · `Weak` | Four, named. Not "medium" |
| Skill coverage | dimension | |
| Experience alignment | dimension | |
| Location preference | dimension | |
| **Salary alignment** | dimension | Absent from the prototypes; real `[OVERVIEW]` |
| **AI semantic similarity** | dimension | Absent from the prototypes; real |
| Per-skill state | `covered` · **`partial`** · `missing` | **Three states, not two.** "Partial" is where hidden talent surfaces |
| AI narrative | 2–3 sentences, plain language | Why the candidate is *or isn't* a fit |
| Hidden talent | flag + the adjacent skill that transfers | |
| Potential score | separate signal | Likelihood of growing into the role |
| Career trajectory | `consistent growth` · `career pivot` · `specialist` · `generalist` | Four classifications |
| Seniority alignment | over-levelled / aligned / under-levelled | Separate from the breakdown |
| Responsiveness signal | engagement likelihood | |
| **Drop-off risk** | decline/withdraw likelihood | Multiple active processes, long notice period |
| Audit record | weights + skill-level scores at computation time | The transparency proof |

**The job** `[OVERVIEW]` § 3 — title, description, location, salary range, work
style (remote / hybrid / on-site), **skills tiered by importance: critical ·
required · preferred · bonus**, seniority, experience level, salary visibility
toggle, assigned team members. Lifecycle: `Draft → Under Review → Approved →
Published → Active → Closed`, plus pause and duplicate. JD upload with automatic
skill extraction.

The four-tier skill importance model is load-bearing for section 04 and section
08 — it is the shipped foundation of "you decide what matters", and it is more
specific than the prototypes' binary required/nice-to-have.

**The candidate profile** — skills with **proficiency level and years per
skill**, experience timeline, education, projects, certifications, social
profiles, preferences (salary, location, notice period, work style), **privacy
control (public / limited / private)**, completeness tracker. Résumé extraction
returns **per-item confidence indicators** and a review screen where the
candidate accepts, rejects or edits before anything lands on the profile. Résumé
critique returns a quality score plus specific suggestions, and the quality
indicator is **visible to recruiters as a trust signal**.

**The pipeline** — default stages `Sourced · Reviewed · Shortlisted ·
Interviewing · Offer · Hired/Rejected`, customisable per job with names and
colours, reorderable. Candidate source tracked (referral, LinkedIn, job board,
direct). Application statuses: submitted, viewed, shortlisted, interview
scheduled, offered, rejected.

**The taxonomy** — skill types (technical, soft, domain, tools, certifications,
languages), hierarchy, relationships (`requires`, `enables`, `similar to`),
clusters, job families → titles, seniority levels intern → distinguished/
executive, career progression maps, ESCO and O*NET mapping, demand and trending
scores per skill.

## 5. Users

`[OVERVIEW]` § 2–3. Six org roles: **Admin · Job Manager · Hiring Manager ·
Recruiter · Sourcer · Interviewer**, plus Candidate and Platform Admin.

| Role | Marketing treatment |
|---|---|
| **Recruiter / Sourcer** | **Primary audience.** Grouped: `[OVERVIEW]` treats them as one goal-set — find candidates fast, search both ways, build pipelines |
| **Hiring Manager / Job Manager** | **Secondary.** Grouped: define the role, review efficiently, decide with support. `[OVERVIEW]` gives them what-if, trajectory, seniority, justification |
| **Candidate** | **Second audience, own page.** First-class user, not a record |
| **Org Admin** | Not an audience. Appears as a capability (roles, permissions, org analytics) |
| **Platform Admin** | **Never marketed.** Taxonomy administration is internal — but the *existence* of a curated taxonomy is a marketing asset |

Correction to the pre-Overview analysis: Sourcer and Job Manager **are** real
roles `[00 § 3]`. They still do not each get a page — `04 § 2` groups them into
`/for-teams` and `/product/matching` respectively.

## 6. Open questions

`[OVERVIEW]` closes almost everything. Five remain, and **none of them blocks the
homepage.**

| # | Question | Blocks | Position |
|---|---|---|---|
| Q1 | **Does employer reputation scoring from candidate reviews exist?** `[PROTO]` reads a real `/reviews/orgs/{id}/score`; `[OVERVIEW]` does not mention it, and `[SPEC]`'s SLA/reputation model is superseded `[00 § 4]` | The C9 composition only — already demoted off the homepage | Assume **not a marketed capability**. Ask, do not build |
| Q2 | **AI Sourcing Agent and Chrome Extension — what do they actually do?** `[OWNER]` confirms they exist; no source describes the interface, the stages it reports, or which external sites the extension supports | § 04b and `/product/sourcing` depth | Confirmed to exist, so they may be **named and described in copy**. Not depicted until the interface is known `[08 § 7]` |
| Q3 | **Is fairness monitoring shipped, and is legal willing to market it?** `[OVERVIEW]` § 3 describes it as a report | § 11's fifth beat, `/product/matching` | Two separate gates. Existence is confirmed; **permission is not** `[00 § 6]` |
| Q4 | **What is the candidate-visible half of the audit trail?** Candidates see score, breakdown and status. Do they see the narrative, or the weights? | § 10's exact claim | Ask. Copy says "the same score and breakdown" until answered — which `[OVERVIEW]` supports |
| Q5 | **Real numbers for anything.** Pool sizes, scarcity indices, funnel rates — the analytics modules compute them; no real values exist to show | Any composition that displays an analytics figure | Show mechanism, never a figure `[00 § 6]` |

## 7. Product truth classification

Per brief § 25.

**LIVE / CONFIRMED** — `[OVERVIEW]` describes as existing functionality. Safe to
build against; publishable subject to the integrity gate.

Match scoring 0–100 with five dimensions and four classifications · match
explanation with covered/partial/missing · AI narrative · hidden talent detection
· potential score · career trajectory · seniority alignment · responsiveness
signal · drop-off risk prediction · skill weight tuning · what-if simulation · JD
optimizer · fairness monitoring report · audit trail on matching · hiring
decision justification · structured search · semantic search · similar-candidate
discovery · résumé upload, extraction with confidence, and critique · candidate
profiles with proficiency and privacy controls · profile completeness · job
management with four-tier skill importance, JD extraction and approval workflow ·
custom pipelines · application tracking both sides · interview records and
feedback · hiring analytics (funnel, pipeline health, skill gaps, time-to-hire,
org trends) · talent pool intelligence with scarcity index · skill heatmap · the
skill and job taxonomy with relationships, clusters, progression maps and
ESCO/O*NET mapping · user and org management with audit trail · location
intelligence.

**PRODUCT DIRECTION** — confirmed to exist, insufficiently described to depict.
AI Candidate Sourcing Agent · Chrome Extension `[OWNER]`.

**UPCOMING / INFERRED** — `[OVERVIEW]` § 7 explicitly. The `.card--dashed`
treatment exists for exactly this.
In-platform messaging · notifications · subscription and billing · interview
scheduling with calendar sync · candidate verification and trust badges ·
collaborative scorecards · engagement scoring · team collaboration notes ·
market-trend job recommendations for candidates · org talent-bench planning ·
OAuth login (Google / LinkedIn).

**SPECULATIVE — must not appear.**
Any outcome metric (time saved, quality of hire, accuracy) · named customers or
logos · testimonials · pricing · live integrations · compliance guarantees ·
model or vendor details · employer reputation scoring until Q1 is answered.

## 8. What Transpahire is not

- **Not an enterprise ATS.** `[OVERVIEW]` positions it as *lighter and faster*
  than one. Deliberately less configurable, less compliance-tooled, and it does
  not claim otherwise.
- **Not a job board.** It evaluates rather than aggregates.
- **Not an AI screening or interview tool.** No assessment, no video, no voice.
  `[OVERVIEW]` § 9: it works *pre-interview*, and treats HireVue-class tools as
  complementary.
- **Not an outbound sequencing tool.** Messaging is `[OVERVIEW]` § 7 upcoming.
  There is no cadence engine.
- **Not a compliance product**, whatever the audit trail can support. The
  distinction between a logged mechanism and a compliance claim is the whole of
  `docs/content-integrity.md` § 4.
- **Not integrated with anything, yet.** OAuth, Stripe and calendar are upcoming.
