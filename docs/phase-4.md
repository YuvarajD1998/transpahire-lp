# Phase 4 — Execution plan

**Correct the record, show the product, finish the site.**

**Status: executed 31 Aug 2026.** Written against the landing site at Phase 3
complete and the product at the state of `transpahire-backend` / `frontend` on
the same date, and executed the same day. § 0b below is the execution record:
what shipped, every deviation from this plan and why, and what is still open.

§ 1 remains the site's fact sheet and is the first thing a new session should
read.

---

## 0. How to use this document

This plan is written to be executed in a fresh session with **no access to the
product repositories**. Everything the executor needs — every value, every
label, every enum, every route — is transcribed into § 1. Do not re-derive it.

If you do open the product repos, they live at:

```
~/projects/yuvaraj/transpahire/transpahire-backend
~/projects/yuvaraj/transpahire/frontend
```

**Read before starting:** `CLAUDE.md`, `DESIGN.md`,
`docs/product-visualization.md`, `docs/content-integrity.md`,
`docs/motion-system.md`. This plan amends several of them; § 8 says which and
how.

**The build loop is unchanged.** Edit `src/`, never the `.html`. Then:

```bash
node tools/build.mjs && node tools/check.mjs
node tools/serve.mjs   # in one terminal
node tools/audit.mjs   # in another
```

Verify at 390px, 768px and 1440px. The audit is not a substitute for opening
the page.

**Work streams A–F are independent except where noted.** A is the fastest and
highest-value; do it first and in full before starting B. F is a
documentation stream that must land in the same commit as the code it
describes, or the next session inherits the same stale-fact problem this whole
plan exists to fix.

---

## 0b. Execution record — 31 Aug 2026

All six work streams shipped. Twenty-one pages (up from twelve), twenty
compositions (up from eight), five motion primitives (up from four), four legal
documents in draft, and 22 pages + 40 source files passing `tools/check.mjs`
with three new checks in it.

### What shipped, by stream

| Stream | State |
|---|---|
| **A — correct the record** | Complete except A.1's destination. All nine edits landed: the four weighted dimensions and three modifiers throughout, the two-population consent account, two roadmap cards, the corrected § 05 headline and gate, nine edge types, the fifth philosophy beat, "Possible" for "Weak", and the glossary with its build check. |
| **B — the preview library** | Complete. `matchesWorkspace()`, `explainPanel()`, `criticalGate()`, `scoreModel()`, `poolBands()`, `missionConsole()`, `marketCovered()`, `structuralFairness()`, `governanceLedger()`, `candidateWorkspace()`, plus `funnelChart()` and `scarcityTable()` for C.5. P5 documented and on the lab page. `rankedList()`, `pipeline()`, `requisition()`, `tuner()` and `searchComposition()` reworked; `heroComposition()`, `explanationPanel()` and `comparisonTable()` retired. |
| **C — pages** | Complete. `/product/matching` and `/product/sourcing` rebuilt; `/trust`, `/product/hiring-operations`, `/product/analytics`, `/for-hiring-managers`, `/pricing` and `/changelog` new; `/for-candidates` rebuilt; `/for-teams` split. |
| **D — legal** | Four complete drafts: privacy (with the two-audience chooser and the unclaimed-profile section), organisation terms, candidate terms, cookies — plus a `/legal/` index, and the footer collapsed to one Legal link. Every determination flagged `[COUNSEL]` in a loud inline marker. |
| **E — /about** | Complete, with `[NAME]` and `[email]` placeholders. Pending team grid and pending-details panel deleted; "what we will not claim" moved to `/trust`; "where this is" added. |
| **F — stop it happening again** | Complete. `CLAUDE.md` §§ 1, 3, 4, 5 and 7 amended; `docs/content-integrity.md` re-inventoried with a dated reconciliation line; `docs/motion-system.md` § 3 has P5; `docs/components.md` § 5c has an entry per composition with a `models:` line; `docs/product-visualization.md` § 2c has the density and two-pane allowances and the ordered-bar rule; `docs/glossary.md` is new; `tools/check.mjs` has the three new checks. |

### Deviations from this plan, and why

Each is also recorded at the code it affects.

| Plan | What shipped | Why |
|---|---|---|
| § 3.1's hero shows five invented people at 84 / 71 / 68 / 54 / 41 | The site's own six candidates at their own scores | The rule at the top of `product-demo.js` beats a sketch. A hero showing 84 while five other pages show 87 is the most visible possible defect. |
| § 3.1: the list pane drops to 60% opacity behind the drawer | It does not. The selected row carries `aria-current="true"` instead | 60% opacity on a real text element takes the row's secondary line to ~2.5:1 against paper, which fails AA. `CLAUDE.md` § 3 rule 5 outranks a number in a sketch, and `aria-current` states the relationship to a screen reader as well as drawing it. |
| § 3.3's gated candidate is "Vikram Nair" | "Aditya Nair" | There is already a Vikram in `CANDIDATES`. Two Vikrams, one scored and one not, teaches the reader the opposite of the point. |
| § 3.9's skills-unlock panel shows Kubernetes +14, Kafka +9, Terraform +6 | The figures in `RESUME.gaps` — Kubernetes +8, Kafka +5, Go +3 | Two unlock counts for Kubernetes on one site is the divergence the data module exists to prevent. |
| § 4.9: seed `/changelog` with the last six months, dated | Undated, grouped by area | The product's phase docs were not available to this session. A guessed date is a fabricated fact, and a changelog is the last page where that would be forgivable. The page says so, and dating begins with the next release. |
| § 2.1: use a `mailto:` action as a stopgap | The form stays unwired; the note was rewritten to name the gap and point at the address on `/about` | Maintainer's decision. A form that opens a mail client addressed to an inbox nobody watches is not better than one that says it is not wired. The three steps to wire it are in the module header. |
| § 2.2's `DIMENSIONS` restructure only | Also: `c5` and `c6` lost their MISSING CRITICAL skills | Under the real model a candidate missing a critical skill is gated out and never scored, so two scored candidates with a missing critical contradicted the section built to explain the gate. Both now carry a thin PARTIAL on it — still a stretch, still honestly not a hire. The genuinely gated candidate is `GATED`, and has no score. |
| § 3.11: keep two screenshot slots | Two remain, and the tuning slot became `controlComposition()` | The tuner is a working composition on three pages; an empty box was reserving space for something the site already had. |
| — | `PIPELINE` gained a seventh stage and its counts now feed `ANALYTICS.funnel` | Two sets of stage numbers for one job on one site reads as a contradiction. And Phase 3 hid rejection from the pipeline, which implied the opposite of the product's own principle that it is not a failure state. |
| — | `--state-crit` / `--wash-crit` added to `tokens.css` | The product tones CRITICAL rose. The site had three state roles and rendered critical in `warn`, which is the colour the app uses for the tier below it — so the two most consequential tiers were indistinguishable. |
| — | `assets/js/modules/ring.js` is new | The switcher and the tuner both have to write a ring's arc, band and numeral. One module, called by both, rather than the same three writes twice. |

### What opening the pages found, after check and audit both passed

`tools/check.mjs` and `tools/audit.mjs` passed on every page before any of the
following was noticed. All of it was found by taking real-time screenshots and
looking at them, which is what `CLAUDE.md` § 6 step 6 means when it says the
audit is not a substitute for opening the page. Recorded because the *class* of
defect is worth knowing about, not just the instances.

| Found | Cause | Fix |
|---|---|---|
| A `.checklist__item` containing `<strong>` rendered **one word per line** | The item was a two-column grid, so every element *and every text node* inside it became its own grid item: the `<strong>` took the text column and the sentence after it was placed in the 22px tick column. **This defect predates Phase 4** — `/product/candidate-intelligence` had it too — and Phase 4 multiplied it across `/trust` and `/for-hiring-managers` | The tick is positioned rather than laid out, so an item can hold any inline markup. Every existing instance keeps its appearance |
| Four compositions sat in 300–400px of empty white inside a window chrome | `--ratio` is a reserved **minimum** for composed HTML, so a ratio taller than the content leaves a void — and a 16/9 frame around a 220px log is not generous padding, it reads as a broken screenshot | Ratios chosen short, and the rule written down: **erring short is strictly safer than erring tall.** Plus `align-content: start` so a composition packs to the top of its frame rather than stretching its own rows |
| The pipeline's seventh stage wrapped onto a second row alone | The grid was still `repeat(6, …)` from when there were six stages | Seven columns, explicitly — not `auto-fit`, because these are ordered stages and the count should change when the data does |
| The hero's list rows were cut off mid-word by the drawer's edge | Five tracks in the 38% strip the drawer does not cover | Three tracks there, truncating cleanly. The full five-track row got a full-width home on `/product/hiring-operations`, which is also where the copy about it lives |
| The audit log wrapped every row onto three lines | It was in a 490px half-column | Full width. A log wants width, and the CSS now says so |
| `REQUIRED` was still grey while `CRITICAL` went rose | Only three of the four tier tones were added | All four, and `--state-crit` is in `tokens.css` |
| `/trust` said a fairness rating from "thirty-one data points" | The figure came from the plan's example; the site's own pool is 47 | Read from `JOB.pool.total`, so it cannot drift again |
| The audit reported two failures that were not defects | A meter at zero width is correct when the value *is* zero (the funnel's `Hired: 0`), and the settle wait was shorter than the lengthened sequence | Both checks corrected. Also two escaping bugs in the audit's own eval bodies: a single-backslash `\s` inside a template literal became `s`, and a backtick inside an eval-body comment terminated the literal |

Two things about `--virtual-time-budget`, because they cost time: it does **not**
advance CSS transitions, so every `[data-beat]` renders at its pre-transition
state and a fully working page looks empty; and rAF-driven counters *do* advance,
so a score ring shows an arbitrary intermediate number. Screenshots for review
have to wait in real time. There is a small CDP script for it in the scratchpad
pattern described above — it scrolls the page so every observer fires, waits, and
then captures.

### Still open — see § 9, and `docs/content-integrity.md` § 5

Nothing engineering. In rough order of what it unblocks: a destination for the
demo form and a named person who reads it; `[NAME]` and `[email]` for `/about`;
counsel's sign-off on four drafts and every `[COUNSEL]` marker resolved; the
pricing model; registered company details; one real screenshot of the matches
screen; `og:image`; self-hosting the fonts; confirmation of the "148,000+ cities"
figure; and the four PROVISIONAL wording rows.

---

## 1. Ground truth

Everything in this section was read out of the product source on 31 Aug 2026.
It supersedes `docs/phase-2/` wherever the two disagree. **Treat this section
as the site's fact sheet.** When a copy decision needs a number, it comes from
here.

> **`docs/phase-5.md` § 2 is this section's delta, and it is not copied in here.**
> It was read out of the same source on the same date, on the job-detail surface
> this section did not examine closely: the five job tabs, `JobPulseStrip`, the
> job header's three rows, the tabbed candidate drawer, the candidates toolbar
> and Kanban view, the source channels, the assignment gate, and the JD skill
> review. It **corrects nothing here** — it adds. Read both; one fact, one home.

### 1.1 The scoring model

The site currently says "five dimensions: skill coverage, experience
alignment, location, salary and semantic fit." **This is wrong.** The real
model is four weighted dimensions, three multipliers, and a hard gate.

`src/matching/services/ranker.service.ts`

```
DEFAULT_WEIGHTS = {
  skillCoverage:      0.65
  semanticSimilarity: 0.25
  experienceCurve:    0.07
  locationWorkMode:   0.03
}
```

Then, in order:

| Stage | Effect |
|---|---|
| **Critical gate** | A candidate missing a CRITICAL skill is disqualified at the retrieval layer and never reaches the scorer. Authoritative, runs on cache hits and misses, and records which requirement dropped whom. "Missing" is `matchType === 'none'` (`MatchingService.isCriticalDisqualified`): a partial — synonym or hierarchy — passes the gate. |
| Critical partial factor | `skillScore × (0.7 + criticalCoverageRatio × 0.3)` — a critical skill only partly covered passes the gate and costs up to 30% of the skill score. |
| Weighted score | The four weights above. |
| Skill tier points | REQUIRED → 20 pts, PREFERRED → 8 pts, BONUS → 4 pts. Normaliser is `requiredCount × 20`, so preferred and bonus can never inflate coverage past 100%. |
| Salary adjustment | `score × (0.9 + salaryScore × 0.1)` — a ±10% band, **not** a fifth dimension. Defaults to `0.6` when either side's figure is unknown. |
| Rarity boost | `× rarityBoost` — scarce skills lift the score. |
| Seniority modifier | `× seniorityModifier`, behind the DB-backed `SENIORITY_MODIFIER_ENABLED` feature flag. |

**Classification bands** (`ranker.service.ts:142`):

```
>= 72  STRONG_MATCH
>= 52  GOOD_MATCH
>= 32  POTENTIAL
 < 32  WEAK
```

**Per-skill coverage bands** (`explainability.service.ts:226`):

```
>= 75%   strong
40–74%   moderate
 < 40%   weak
   0     missing
```

Search scoring is a **deliberately different** formula from match scoring —
search may have no JD, so it uses tier-weight redistribution and a no-free-points
rule instead. The source says explicitly: *do not unify these formulas.* The
site must not imply one number applies everywhere.

### 1.2 The skill graph

Nine relationship types, each carrying a `strength` float and a `bidirectional`
flag. The site currently shows three.

```
REQUIRES  ENABLES  SIMILAR_TO  SPECIALIZATION_OF  COMMONLY_WITH
PROGRESSION  ADJACENT  PREREQUISITE_OF  TRANSFERABLE_TO
```

Job roles have their own graph — five types, never mentioned on the site:

```
SPECIALIZATION_OF  PROGRESSES_TO  ALTERNATE_TITLE  SIMILAR_TO  CROSS_FUNCTIONAL
```

Supporting models: `SkillTaxonomy`, `SkillSynonym`, `SkillCluster`,
`SkillClusterMember`, `SkillOntologyVersion` (the taxonomy is versioned),
`NonTaxonomySkill`, `SemanticDuplicateSuggestion`,
`JobDesignationTaxonomy`, `JobDesignationSynonym`.

### 1.3 What has shipped since Phase 2 froze

Everything in this table is live and marketable. The site currently
either omits it, files it as "coming soon", or apologises for its absence.

| Capability | Evidence | Site's current position |
|---|---|---|
| Notifications | 22 `NotificationType` values, `NotificationPreference`, `notifications.cron.ts`, `NotificationsPage.tsx` | "Coming soon" — **wrong** |
| Job alerts | `JobAlert` with `DAILY / WEEKLY / INSTANT`, `JobAlerts.tsx` | Absent |
| Interview scheduling | `Interview { scheduledAt, duration, meetingLink, status }` + `INTERVIEW_SCHEDULED` / `INTERVIEW_CANCELLED` notifications | "Coming soon" — **wrong** (calendar sync absent at the time; shipped since — see below) |
| AI sourcing agent | `SourcingMission / Run / Step / Strategy / Event` + 21 React components | "Deliberately not depicted" — **obsolete** |
| Employer reviews | `OrgReview`, verified-application gate, moderation queue, right-of-reply | Forbidden by `CLAUDE.md` §7 — **now sourced** |
| Public company pages | `OrgProfile`, slugs, `PUBLIC / UNLISTED / PRIVATE`, `CompanyPublicPage.tsx` | Absent |
| GDPR export & delete | `GdprRequest { EXPORT \| DELETE }` + admin review queue | Described as future scope |
| Structural fairness | `FairnessMonitorService`, JD language flags | Withheld entirely |
| Talent pools | `TalentPool`, `TalentPoolMembership`, `ImportWizard`, `ImportHistory` | Absent |
| Saved searches | `SavedSearch`, `SearchAuditLog`, `SaveSearchModal` | Absent |
| Screener questions | `JobScreenerQuestion { TEXT \| YES_NO \| MULTIPLE_CHOICE }` | Absent |
| Recruiter outreach | `RecruiterOutreach { PENDING \| INTERESTED \| NOT_INTERESTED \| EXPIRED }` | Absent |
| Career gap detection | `ProfileCareerGap` | Absent |
| Skill endorsements | `SkillEndorsement` | Absent |
| Match audit log | `MatchAuditLog` — weights, per-skill scores, verdict at compute time | Absent |

~~**Genuinely not shipped**, and the only thing that should stay on a roadmap:
**in-platform messaging.** A `Message` model exists with no controller.
**Calendar sync** (Google / Outlook) is also absent.~~

**Update, 28 Sep 2026 — both shipped.** The maintainer confirmed in-platform
messaging and calendar sync live, and the site now claims both and carries no
roadmap. **The evidence is the maintainer's word, not a source read.** The next
session with product access should add both to the table above with their
models and endpoints, and record which calendar providers are connected: the
site names none until that is confirmed, because a provider name is an
integration claim.

### 1.4 The consent model — read this before touching `/product/sourcing`

There are **two populations** in the candidate database, and the site currently
describes only one.

```
enum ProfileOwnerType  { RECRUITER_MANAGED  CANDIDATE_MANAGED }
enum CandidateSource   { SELF_SIGNUP  RECRUITER_IMPORT  CSV_IMPORT
                         REFERRAL  MARKETPLACE }
enum CandidateAccountStatus { UNCLAIMED  INVITED  ACTIVATED
                              VERIFIED  OPTED_OUT  DISABLED }
Profile.privacyMode : PrivacyMode = PUBLIC
model RecruiterImport { fileUrl  poolId  items[] }
model CandidateInviteToken { … }
```

The current live sentence on `/product/sourcing` — *"it does not import a
person who did not ask to be there"* — is contradicted by the default path.
This is the highest-priority copy change on the site and the only one with real
legal exposure. See § 2.3.

Note that the recruiter search UI **already surfaces this honestly**: the
candidate card renders an account-status dot reading `Unclaimed`, `Invited`,
`Activated`, `Verified` or `Opted Out`. The product is more transparent about
this than the marketing site is.

### 1.5 The sourcing agent, in detail

This is the most defensible capability in the product and the site does not
describe it. The mechanism:

- **A mission has a goal.** `targetCount` (default 20), `targetBand`
  (default STRONG), `countingMode` (`TOTAL_IN_POOL` | `NEW_SINCE_START`),
  `surfacingBand` (default GOOD — who you actually hear about).
- **A policy derived from the JD tiers.** `hardSkillIds` (must-haves, rule
  people out) vs `relaxableSkillIds`. Location and experience expansion are
  opt-in flags with an explicit `experienceDeltaYears`. Critical requirements
  can only be widened with approval.
- **A JD fingerprint snapshot**, so a mission knows when the job changed
  underneath it.
- **A run ledger.** Each `SourcingRun` records its trigger, planner, rounds
  used, **LLM calls used** (budgeted), candidates evaluated, new found, new
  strong found, gap at start, gap at end, and a `stopReason`.
- **Steps.** Each `SourcingStep` records `kind`, `tool`, validated `args`,
  a `resultSummary` of counts only (never candidate rows), status,
  `rejectionReason`, prompt version and duration.
- **Strategies cannot repeat.** `@@unique([missionId, fingerprint])`. The
  schema comment: *"This is what mechanically enforces 'never repeat a
  search'."*
- **Refusals are shown.** `DECLINED_BY_RECRUITER` and `PROPOSED_REJECTED`
  strategies stay visible in the history. Source comment: *"Seeing 'you turned
  this down' is what makes the rest of the list credible."*
- **A terminal honest state.** When the market is covered the agent says so and
  recommends what to relax, with measured impact — and distinguishes three
  answers: `null` (unmeasurable, render nothing), `0` (measured, changes
  nothing — say so out loud), `>0` (the measured number, labelled an estimate).
  Source comment: *"A plausible invented number is worse than a blank, because
  a recruiter will act on it."*
- **It measures its own interruptions.** A `NotificationTrustPanel` shows
  dismissal rate and view rate, warning above 40% dismissal or below 30% views.
  Heading: *"How often we interrupt you."*

**Mission status vocabulary** (`eventCopy.ts`), which the site should adopt
verbatim:

```
DRAFT      "Not started"
ACTIVE     "Watching"
PAUSED     "Paused"
EXHAUSTED  "Market covered"
COMPLETED  "Target reached"
CANCELLED  "Turned off"
```

The product's own name for the feature is **Always-On Sourcing**, and its
pitch is: *"Keep watching for people who match this role, and hear about them
when they turn up."*

### 1.6 Structural fairness

`FairnessMonitorService` returns `scoreDistributionByExperience`,
`overQualificationBias`, `languageFlags`, `aggressiveFilterCount`,
`aggressiveFilters` and an `overallFairnessRating` of
`GOOD | NEEDS_REVIEW | PROBLEMATIC`. Below `MINIMUM_AUDIT_ENTRIES = 50` it
returns `dataStatus: 'INSUFFICIENT_DATA'` and refuses to rate.

The flagged terms, verbatim:

```
rockstar         → exclusionary jargon
10x              → culture-signal jargon that may discourage applications
ninja            → informal language that can be exclusionary
young            → potential age bias language
recent graduate  → overspecifying graduation recency may limit experienced returners
must have degree → strict degree requirement may exclude skilled non-traditional candidates
```

**The product's own framing, which is the one to use:**

> **Structural fairness.** How this job description narrows the candidate pool.
> It looks at the requirements themselves — no demographic data is used or
> held.

That last clause is the single most valuable trust sentence available to this
site, it is a statement of fact about the software, and it is legally safe in a
way that "bias-free" and "defensible" are not. See § 8.1 for the `CLAUDE.md`
amendment that unblocks it.

### 1.7 The recruiter's match explanation — the real structure

The site's `explanationPanel()` currently models five dimension bars plus skill
states. **The real panel is richer and better**, and Work stream B rebuilds
against it.

`frontend/src/views/recruiter/search/components/CandidateDrawer/ExplainMatchPanel.tsx`

```
┌─ ScoreRing (52px, stroke 5) ── "✨ AI" pill ── confidence chip ────────┐
│                                 HIGH / MEDIUM / LOW                    │
│  two-sentence summary                                                  │
├────────────────────────────────────────────────────────────────────────┤
│  HOW THE CONCEPTS CONNECT                                              │
│  [exact] [synonym] [≈ equivalent] [broader] [narrower] [transferable]  │
├────────────────────────────────────────────────────────────────────────┤
│  STRONG MATCHES                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Kubernetes  →  [container orchestration]   ✓ verified            │  │
│  │ reason sentence, in the model's own words                        │  │
│  │ TRANSFERABLE · Experience              confidence ▓▓▓▓▓▓░░  78%   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│  PARTIAL MATCHES        (same card, muted ground)                      │
├────────────────────────────────────────────────────────────────────────┤
│  NOT FOUND IN PROFILE   (missing concept rows)                         │
├────────────────────────────────────────────────────────────────────────┤
│  AI-generated · Cached                                    Regenerate   │
└────────────────────────────────────────────────────────────────────────┘
```

Three details that are load-bearing and that the site currently has no way to
express:

1. **Every concept match cites its evidence.** `evidence.section` is one of
   Headline, Summary, Bio, Experience, Projects, Skills, Education,
   Certifications — and clicking the card scrolls the drawer to the exact
   highlighted snippet. *The score cites its sources.* This is the strongest
   unclaimed beat in the product.
2. **`✓ verified`** means "verified against the candidate's own words."
3. **Relationship vocabulary**, distinct from the taxonomy edge types:
   `exact`, `synonym`, `≈ equivalent`, `broader`, `narrower`, `transferable`.

And on the card in the results list, `MatchHighlightChips` renders a skill chip
beside an **italic quoted snippet from the candidate's own profile** with the
matched terms marked — capped at two, because the card must stay compact.

### 1.8 The job → candidates row

`frontend/src/views/jobs/JobDetail/candidates/CandidateRow.tsx`. Five fluid
grid tracks:

```
[avatar 34px] [name + headline] [stage chip •] [ScoreRing 38px] [origin · when] [Move to…]
```

Stage labels and tones (`candidateCopy.ts`) — note that REJECTED is neutral,
not red, on the stated principle that *"a candidate who was not right for one
role is not a failure state"*:

```
SOURCED       "Sourced"              neutral
REVIEWED      "Reviewed"             neutral
SHORTLISTED   "Shortlisted"          indigo
INTERVIEWING  "Interviewing"         indigo
OFFER         "Offer out"            amber
HIRED         "Hired"                emerald
REJECTED      "Not moving forward"   neutral
```

Origin (provenance, muted tones only, never loud):

```
SOURCED               "Sourced"
APPLIED               "Applied"
SOURCED_THEN_APPLIED  "Sourced, then applied"
```

Application status, candidate-facing:

```
SUBMITTED "Applied" · VIEWED "Reviewed" · SHORTLISTED "Shortlisted"
INTERVIEW_SCHEDULED "Interview scheduled" · OFFERED "Offer out"
ACCEPTED "Offer accepted" · REJECTED "Not moving forward" · WITHDRAWN "Withdrew"
```

Empty state: *"Nobody here yet. People show up here as soon as they apply or
you add them to this job."*

List subtitle: *"Everyone tracked against this job — whether they applied or
you found them."*

### 1.9 The job insights tab

Four views, all shipped, none on the site:

- **Tuning** — `SkillWeightEditor` + `JdOptimizerPanel` + `WhatIfSimulator`.
  Placed first deliberately: *"they are where a recruiter changes the shape of
  the pool rather than just reading it."*
- **Fairness** — § 1.6.
- **Funnel** — stage counts, conversion, importance-tiered skill table.
- **Talent pool** — pool size, **score bands as one ordered stacked bar, not a
  donut**. The source explains why: *"a ring has no beginning, so 'strong' and
  'weak' read as two peer slices rather than the two ends of a scale."*
  Scarcity index is `HIGH / MEDIUM / LOW`, toned rose → amber → emerald.

Skill importance tones, used consistently across the app:

```
CRITICAL  rose      REQUIRED  amber      PREFERRED  indigo      BONUS  neutral
```

### 1.10 The candidate dashboard

`frontend/src/views/candidate/dashboard/components/`. Shipped panels the
`/for-candidates` page does not mention:

| Panel | What it shows |
|---|---|
| `RecruiterInterest` | *"Who's viewing your profile"* — profile views over 7 days, with a delta vs. last week |
| `SkillsUnlock` | Skills ranked by how many roles they would unlock, with a per-skill status (`verifying / confirmed / learning / watchlist`) |
| `Velocity` | Applications in 30 days, shortlist rate, weekly bars over 7 weeks |
| `ResumeCritique` | An animated score ring plus specific suggestions |
| `MatchedJobs`, `ApplicationTracker`, `TopCompanies`, `HealthCard`, `InsightsCard`, `AppKpis`, `RecentActivity`, `QuickActions` | |

Plus, elsewhere in the candidate app: `JobAlerts`, `SavedJobs`,
`JobComparison`, `ExploreJobs` with a filter rail and a "For you" card.

### 1.11 Governance and platform surface

All shipped. All mechanism claims. All currently absent from the site.

```
Data rights    GdprRequest { EXPORT | DELETE } + platform-admin/gdpr queue
Match audit    MatchAuditLog — weights, per-skill scores, verdict at compute time
Action audit   AuditLog on every mutation · users/UserAudit view
Search audit   SearchAuditLog · SavedSearch · platform-admin/search-console
Access         6 org roles · manager→recruiter hierarchy · org data isolation
               OrgMemberInviteToken · OrgJoinRequest
Ops            platform-admin/{system-health, data-quality, ai-ops,
               background-jobs, audit-logs, settings, organizations}
AI ops         AiCallLog · FeatureFlag-gated scoring · SkillOntologyVersion
Quality        DataQualitySnapshot · HealthCheckLog
```

Six org roles: **Admin, Job Manager, Hiring Manager, Recruiter, Sourcer,
Interviewer.**

Job lifecycle: **Draft → Under Review → Approved → Published → Active →
Closed**, with `JDStatusHistory` and `JobVersion`.

### 1.12 Things to be careful about

- **"148,000+ cities"** appears in `product-overview.md` and could not be
  verified in the source. Do not publish the figure until someone confirms it.
  The alias behaviour (Bangalore/Bengaluru, Bombay/Mumbai) is real and can be
  described without a count.
- **The site prints "Weak" as a match class.** The product deliberately renders
  it to users as **"Possible"** (`BAND_WORD` in `eventCopy.ts`) — "Weak" is
  described in-source as *"a scorer's word"*. Align the site.
- **Implementation vocabulary is banned in the product's user-facing copy** —
  `eventCopy.spec.ts` asserts that no user-facing string contains *embedding,
  vector, prompt, token, model, LLM, agent, semantic, cosine, context window*.
  The site says "semantic fit" and "the engine" freely. See § 2.9.
- **Locales**: `en.json` only. There is no multi-language story.
- **No integrations exist.** There is an `API_CONTRACT.md`. Say that, don't
  invent one.

---

## 2. Work stream A — correct the record

Nine edits. Together they take about a day and remove every factual defect on
the site. **Do all of A before starting B.**

### 2.1 `/demo` — give the form an action `[P0]`

`src/pages/demo.mjs`

The reasoning in the module header is sound and has been allowed to stand too
long. Twenty-one calls to action across twelve pages terminate here.

Minimum viable fix, shippable in an hour:

```html
<form class="form mt-8" method="POST" action="[CONFIRM: endpoint]">
```

If no endpoint exists yet, use a `mailto:` action with
`enctype="text/plain"` as a stopgap and delete the "not connected yet" note.
A form that opens the visitor's mail client is a working form; a form that
does nothing is not.

Then rewrite the `form__note` from an apology into a commitment:

> Goes to one inbox, read by one person. You will hear back inside two working
> days.

Only publish that if it is true. If it is not, say what is.

Also, per § 6 of the audit: **add a job-description file field.** You have JD
upload and tier extraction in the product; a demo request that arrives with a
JD attached is a demo that has already started.

### 2.2 The scoring model — six pages `[P0]`

Replace every instance of "five dimensions" and the five-item dimension list.

**`assets/data/product-demo.js`** — this is the root. `DIMENSIONS` currently
has five entries with `salary` among them. Restructure:

```js
/* THE FOUR WEIGHTED DIMENSIONS — ranker.service.ts:12.
   The weight is the story: skills dominate, and the site says so. */
export const DIMENSIONS = [
  { key: 'skill',      label: 'Skill coverage',      weight: 0.65 },
  { key: 'semantic',   label: 'Semantic similarity', weight: 0.25 },
  { key: 'experience', label: 'Experience curve',    weight: 0.07 },
  { key: 'location',   label: 'Location & work mode', weight: 0.03 },
];

/* Applied AFTER the weighted score, in this order. Not dimensions. */
export const MODIFIERS = [
  { key: 'salary',    label: 'Salary alignment', shape: '±10%',
    note: 'Moves the total by at most a tenth, either way.' },
  { key: 'rarity',    label: 'Skill rarity',     shape: '×',
    note: 'A scarce skill lifts the score.' },
  { key: 'seniority', label: 'Seniority',        shape: '×',
    note: 'Over- or under-levelling adjusts the total.' },
];

/* The gate runs BEFORE scoring. A disqualified candidate is never scored. */
export const CRITICAL_GATE = {
  label: 'Critical gate',
  line: 'A candidate missing a critical skill never reaches the scorer.',
  recorded: 'Which requirement dropped them is recorded.',
};

export const BANDS = [
  { key: 'strong',    label: 'Strong',    min: 72 },
  { key: 'good',      label: 'Good',      min: 52 },
  { key: 'potential', label: 'Potential', min: 32 },
  { key: 'possible',  label: 'Possible',  min: 0  },  // never "Weak" — § 1.12
];

export const COVERAGE_BANDS = [
  { label: 'Strong',   range: '≥ 75%' },
  { label: 'Moderate', range: '40–74%' },
  { label: 'Weak',     range: '< 40%' },
  { label: 'Missing',  range: '0' },
];
```

Then update, in order: `src/pages/home.mjs` (hero lede, § 06 body),
`src/pages/product.mjs` (pillar 02), `src/pages/product-matching.mjs`
(the dimension list and the section copy), `src/pages/for-candidates.mjs`
(the "five dimensions" sentence), and every candidate object in
`product-demo.js` that carries a five-bar breakdown.

**Hero lede — replacement copy:**

> Every candidate is scored against the role out of 100, and the score comes
> apart. Skill coverage carries 65% of it. Each skill is marked covered,
> partial or missing. Two sentences say why, including the part that counts
> against them. Not a number you have to trust — a number you can take apart.

**`/product/matching` gains a new section**, placed immediately after the
panel section and before the skill graph. This is the single highest-value
piece of new copy in the plan, because it converts the site's thesis from a
claim into something a reader can check. Composition: `scoreModel()`, § 3.7.

> **The arithmetic, published.**
> Skill coverage is 65% of the weight. Semantic similarity is 25%. Experience
> and location share the last 10%. Salary can move the total by a tenth, either
> way; a scarce skill lifts it; over-levelling pulls it down. Strong starts at
> 72, good at 52, potential at 32.
>
> Before any of that runs, a candidate missing a critical skill is dropped —
> and which requirement dropped them is recorded, so an exclusion is as
> explicable as a ranking.
>
> We publish the weights because a score you can reproduce is a score you can
> argue with.

### 2.3 `/product/sourcing` — the consent sentence `[P0]`

`src/pages/product-sourcing.mjs`, the "Consented profiles, and only consented
profiles" section.

**Delete** the current three-item checklist and the headline. **Replace** the
whole section with an honest two-population account. Draft:

> **Two kinds of profile, and we will not blur them.**
>
> A candidate who signed up owns their profile. They set their own visibility —
> public, limited or private — nothing pulled out of their résumé is stored
> until they have reviewed it item by item, and they can export or delete
> everything the platform holds about them.
>
> A profile a recruiter brings in themselves is a different thing, and the
> product says so on the card: every imported candidate carries an account
> status — *unclaimed*, *invited*, *activated*, *verified* or *opted out* — so
> a recruiter always knows whether they are looking at a person who chose to be
> there.
>
> Nothing here is scraped.

`[CONFIRM]` before publishing: what an unclaimed imported profile is
actually visible to, outside the importing organisation. If the answer is "only
that org", say so — it is a strong claim. If it is "the whole marketplace",
the copy above needs another clause and the product needs a conversation.

Also change the section headline from *"Consented profiles, and only consented
profiles"* to *"Two consent bases, both stated"*.

### 2.4 Roadmap cards and notification hedges `[P0]`

**`src/pages/product.mjs`** — the `ROADMAP` array. Reduce four cards to two:

```js
const ROADMAP = [
  { icon: 'i-mail',     title: 'In-platform messaging',
    body: 'Outreach to candidates without leaving Transpahire. Outreach and interest tracking are live today; the thread is not.' },
  { icon: 'i-calendar', title: 'Calendar sync',
    body: 'Interviews are scheduled and tracked in the pipeline today. Google and Outlook sync is not connected yet.' },
];
```

Delete the notifications card and the interview-scheduling card. Change the
section head from *"Four things that are still coming"* to *"Two things that
are still coming"*, and the grid from `grid--4` to `grid--2`.

**Then hunt the hedges.** Both of these are now underselling shipped features:

- `src/pages/for-candidates.mjs`: *"You can see where your application actually
  stands: applied, viewed, shortlisted. Not a notification, not a promise of a
  reply. Just the status, visible, instead of silence."*
  → **Replace:** "You see where your application stands — applied, reviewed,
  shortlisted, interview scheduled, offer out — and you are told when it moves.
  You choose which of those are worth an email."
- `src/pages/product-matching.mjs`: *"They can also see where their application
  actually stands, which is a different claim from being messaged about it, and
  a stronger one than silence."*
  → **Replace:** "They can see where their application stands, and they are
  told when it moves."

Grep for `data-content="placeholder"` and for the word `notification` across
`src/` and check each hit against § 1.3.

### 2.5 Homepage § 05 — the critical gate `[P1]`

`src/pages/home.mjs`, `thePool`.

Current headline: *"Nobody gets skipped, and nobody gets a free pass."* This
describes the opposite of what the engine does.

**Replace headline:**

> Nobody is dropped for a word they didn't type. <em>Some are dropped for a
> requirement they don't meet.</em>

**Replace lede:**

> Every candidate in the pool is scored against the role out of 100 and
> classified Strong, Good, Potential or Possible — no waiting for applications
> to trickle in. The exception is deliberate: a candidate missing a critical
> skill is dropped before scoring, and which requirement dropped them is
> recorded.

This turns an inaccuracy into a claim of rigour, and it sets up § 06.

### 2.6 Homepage § 07 and `/product/matching#adjacency` — nine edges `[P1]`

`assets/data/product-demo.js`, `SKILL_EDGES` and `EDGE_TYPES`.

`EDGE_TYPES` becomes the full nine (§ 1.2). Keep the three worked examples
that the page's narrative depends on — the Docker → Kubernetes edge is what
makes the partial state legible — but add the relationship count and the
weight to the copy, and add two edges that demonstrate the types the site has
never mentioned:

```js
export const SKILL_EDGES = [
  { from: 'Docker',     to: 'Kubernetes', type: 'requires',        primary: true,
    strength: 0.9, reading: 'Docker is a prerequisite for Kubernetes' },
  { from: 'TypeScript', to: 'JavaScript', type: 'similar to',      primary: false,
    strength: 0.85, reading: 'TypeScript relates to JavaScript' },
  { from: 'React',      to: 'Vue',        type: 'transferable to', primary: false,
    strength: 0.7, reading: 'React transfers to Vue' },
  { from: 'Kafka',      to: 'RabbitMQ',   type: 'adjacent',        primary: false,
    strength: 0.6, reading: 'Kafka sits adjacent to RabbitMQ' },
  { from: 'Senior BE',  to: 'Staff Eng',  type: 'progression',     primary: false,
    strength: 0.8, reading: 'Senior progresses to Staff', role: true },
];
```

Copy change in both places — add after the existing "requires / enables /
similar to" sentence:

> Nine relationship types in all, each one weighted, some of them
> bidirectional. Job titles have their own graph on top: a senior role
> *progresses to* a staff one, and an alternate title resolves to the same
> node.

**Amend `CLAUDE.md` § 7** in the same commit — see § 8.1.

### 2.7 Fairness — unblock and publish `[P1]`

New section on the new `/trust` page (§ 4.3), and a fifth philosophy beat on
the homepage.

Homepage `PHILOSOPHY` in `product-demo.js` currently stops at four beats. Add
the fifth, phrased as a mechanism:

```js
{ label: 'Fairness',
  line: 'We read the job description for language that narrows the pool, and we hold no demographic data at all.' }
```

Note the `.beats` grid may need a five-column rule or a two-row wrap — check
`assets/css/sections.css` `.beats` before assuming.

`[CONFIRM]` This is the one item in Work stream A that touches the legal gate
in `CLAUDE.md` § 7. § 8.1 argues that a mechanism claim clears it. Get a yes
before shipping.

### 2.8 Kill the `Weak` label `[P2]`

Grep `product-demo.js` and `src/` for `Weak`. In every user-facing
classification, replace with **Possible**. Keep "weak" in the coverage-band
table (§ 1.1), where it describes a percentage band rather than a person.

### 2.9 Adopt the product's glossary `[P2]`

The product bans a specific vocabulary from anything a user reads, enforced by
a spec file. The site should inherit it. Create
`docs/glossary.md` with the banned list and the permitted vocabulary, and add
a check to `tools/check.mjs`:

```js
/* The product's copy layer bans implementation vocabulary from user-facing
   strings (frontend eventCopy.spec.ts). The site inherits that rule so a
   visitor who converts meets the same words on day one. */
const BANNED = ['embedding', 'vector', 'prompt', 'token', 'cosine',
                'context window', 'LLM'];
```

`agent`, `semantic` and `model` are on the product's list but are load-bearing
on a marketing site talking about how the thing works — allow them, and note
the deviation in `docs/glossary.md` with the reason. Do not allow the rest.

Separately: **"arithmetic" is used three times** (hero, § 08, `/for-teams`).
Keep it once, in § 08, where the tuner makes it literal. And it is the wrong
word for a weighted model — prefer "the working" or "the weights".

---

## 3. Work stream B — the preview library

This is the largest stream and the one the user specifically asked for. The
brief: **stop showing abstracted diagrams of the product and start showing the
product's actual information architecture**, rendered in the site's visual
language.

### 3.0 The rule that governs all of it

`docs/product-visualization.md` § 1 is unchanged and still binding:

> Fabricating product UI … is a lie with a design budget.

Everything specced below is drawn from § 1 of this document, which was read out
of the shipped source. **A composition may show a layout, a label, a state or a
relationship that exists in the product. It may not invent one.** When in
doubt, the fallback is `screenshotSlot()`, not an invention.

Two things change from Phase 3:

1. **Density is now allowed.** Phase 3's compositions were deliberately sparse
   because the product was under-documented. It is not any more. A composition
   may now carry a realistic number of rows, chips and states.
2. **A composition may show two panes.** The hero brief is explicitly a
   list-plus-drawer, and the product's primary surface is exactly that.

All new compositions go in `src/lib/compositions.mjs` and all new CSS in
`assets/css/components.css`. Nothing goes in `sections.css` — these are
components, reused across pages.

### 3.1 `matchesWorkspace()` — the new hero `★`

**Replaces** `heroComposition()` on the homepage. The single most important
build in this plan.

**Models:** `frontend/src/views/jobs/JobDetail/candidates/` — the list — with
`CandidateDetailDrawer` open over it.

**Frame:** `--ratio: 16 / 10`, `frame--elevated`,
meta `app.transpahire.com / jobs / 1042 / candidates`.

**Structure:**

```
┌─ frame chrome ─────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌─ list pane (recedes) ──────────┐ ┌─ drawer (slides in, overlaps) ─┐ │
│  │ Candidates          47 tracked │ │ Sneha Iyer               ✕     │ │
│  │ ─────────────────────────────  │ │ Senior Backend Engineer        │ │
│  │ ◐ Sneha Iyer          ⟨84⟩     │ │ Bengaluru · 60d notice · ₹52L  │ │
│  │   Backend, payments            │ │ ─────────────────────────────  │ │
│  │   [Shortlisted] Applied · 2d   │ │  ⟨84⟩  AI   HIGH               │ │
│  │ ─────────────────────────────  │ │  Strong on distributed systems │ │
│  │ ◐ Arjun Rao           ⟨71⟩     │ │  and payments depth. Salary    │ │
│  │   Platform engineer            │ │  expectation sits above band.  │ │
│  │   [Reviewed] Sourced · 4d      │ │ ─────────────────────────────  │ │
│  │ ─────────────────────────────  │ │  HOW THE CONCEPTS CONNECT      │ │
│  │ ◐ Priya Menon         ⟨68⟩     │ │  [exact][transferable][broader]│ │
│  │ ─────────────────────────────  │ │ ─────────────────────────────  │ │
│  │ ◐ Rahul Kumar         ⟨54⟩     │ │  STRONG MATCHES                │ │
│  │ ─────────────────────────────  │ │  Python → Python  ✓ verified   │ │
│  │ ◐ Neha Shah           ⟨41⟩     │ │  Kubernetes → Docker  ≈ partial│ │
│  └────────────────────────────────┘ └────────────────────────────────┘ │
│                                                                        │
└─ Illustrative. Every person and company on this site is invented. ─────┘
```

**Row anatomy** — exactly § 1.8's five tracks. Avatar is a monogram disc, not
a photo. The score is a ring, not a bar: the product uses `ScoreRing` at 38px
on the row and 52px in the drawer, and the ring is the product's most
recognisable single element after the partial glyph.

**Motion.** This needs a primitive and therefore needs `motion-lab.html`
first — `CLAUDE.md` § 5 is not optional. Proposal:

- **P5 · drawer reveal.** The list is present on load. On reveal, the drawer
  translates in from the right over `--dur-medium` with `--ease-entrance`,
  and the list pane drops to 60% opacity behind it. One per page. It reuses
  the existing `tp-panel-in` keyframe and the nav drawer's transform pattern,
  so it is a composition of two existing primitives rather than a new
  animation — document it that way.
- **Cap: 1 per page.** Add the check to `tools/check.mjs` alongside the
  existing P4 path cap.
- **What it communicates:** *a row is selected and the view opens into it.*
  That is a real product behaviour and the single clearest statement of the
  site's thesis — the list gives you a number, the drawer gives you the
  argument.
- **Reduced motion:** the drawer is present, static, at full opacity, with the
  list at full opacity behind it. Verify on the lab page.

**Above the fold caveat.** `CLAUDE.md` and the current hero comment both say
above-the-fold content reveals immediately and the hero must not ask for work.
P5 is a one-shot entrance on load, not an interaction, and it completes inside
`--dur-medium`. That is compatible. **Do not** add a click-to-open interaction
in the hero. The switcher stays where it is, in § 06.

### 3.2 `explainPanel()` — rebuild against the real panel `★`

**Replaces** `explanationPanel()`. Used by `argumentComposition()` on the
homepage § 06, on `/product/matching`, and inside `matchesWorkspace()`.

Build the full structure from § 1.7. Signature:

```js
explainPanel({
  id,                  // for the switcher
  candidate,           // a CANDIDATES entry
  sequenced = true,    // P2 beat sequencing on/off
  crop = false,        // truncate for the /product pillar crop
  showFooter = true,   // "AI-generated · Cached" + Regenerate
})
```

**Sub-components to build:**

| Function | Models | Notes |
|---|---|---|
| `scoreRing({ score, size })` | `ScoreRing` | SVG ring, mono numeral centred, band colour from `BANDS`. Replaces the current bar-only treatment. |
| `confidenceChip({ level })` | `CONFIDENCE_STYLE` | HIGH / MEDIUM / LOW, emerald / amber / neutral. |
| `relationshipChip({ type })` | `REL_LABEL` | exact · synonym · ≈ equivalent · broader · narrower · transferable |
| `conceptCard({ match, muted })` | `ConceptMatchCard` | `queryConcept → matchedText`, `✓ verified`, reason, relationship label · evidence section, confidence mini-bar. |
| `missingRow({ concept })` | `MissingConceptRow` | |
| `evidenceSnippet({ skill, quote, terms })` | `MatchHighlightChips` | Skill chip + italic quoted snippet with matched terms marked. |

**The AI pill.** The product renders `✨ AI`. The site's design language bans
sparkles (`DESIGN.md` anti-patterns). Render it as a mono `AI` label in an
indigo pill with no glyph. Note the deviation in `docs/components.md`.

**The beat sequence.** `docs/phase-2/07-MOTION_STORYBOARD.md` § 4's beat table
governs the reveal order and must be re-cut for the new structure. Proposed
beats, preserving the two load-bearing pauses:

```
   0ms  ring + band, from 0
 380ms  the AI pill and confidence chip
 640ms  the summary sentence, blur-in
1120ms  relationship chips, 60ms stagger
1400ms  the FIRST concept card — the partial — alone            ← pause
1980ms  the remaining strong matches, 80ms stagger
2420ms  "not found in profile"                                  ← pause
2760ms  the footer line
```

The two pauses are the point. A sequence that revealed everything on one 80ms
stagger would contain the same information and communicate nothing.

### 3.3 `criticalGate()`

**New.** Small, one purpose: show an exclusion that explains itself. Used in
homepage § 05 beneath the pool, and on `/product/matching`.

A single dimmed row with a struck score and a named reason:

```
◐ Vikram Nair        —        Not scored
  Data engineer                Missing critical: Distributed Systems
```

Communicative, honest, and it is the visual proof of § 2.5's new headline.
No motion beyond the group reveal.

### 3.4 `missionConsole()` — Always-On Sourcing `★`

**New.** The centrepiece of the rebuilt `/product/sourcing` (§ 4.2). Models
`MissionHeader` + `MissionProgressStrip` + `StrategyHistoryPanel`.

**Frame:** `--ratio: 16 / 10`, meta `app.transpahire.com / jobs / 1042 / sourcing`.

```
┌────────────────────────────────────────────────────────────────────────┐
│  Senior Backend Engineer, Payments          ● Watching                 │
│                                                                        │
│  ┌───────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐          │
│  │ 14 / 20   │ │  47    │ │  14    │ │  11    │ │    9     │          │
│  │ MATCHING  │ │ POOL   │ │ STRONG │ │ GOOD   │ │ SURFACED │          │
│  │ THIS ROLE │ └────────┘ └────────┘ └────────┘ └──────────┘          │
│  └───────────┘   ← exactly one tile is featured                        │
│                                                                        │
│  EVERY APPROACH TRIED                                                  │
│  ✓  Structured: Python + distributed systems, Bengaluru      9 new     │
│  ✓  Described: "payments backend, 5+ yrs, Kafka"             4 new     │
│  ✓  Widened: notice period to 90 days                        1 new     │
│  ⊘  Proposed: drop Kubernetes requirement       you declined this      │
│  ⧗  Proposed: widen to Hyderabad                awaiting approval      │
└────────────────────────────────────────────────────────────────────────┘
```

**Three things this must get right**, all quoted from the source in § 1.5:

1. **Show the refusals.** The `⊘ you declined this` row is not decoration. It
   is what makes the rest of the list credible, and it is the visual argument
   that the agent has guardrails.
2. **`newFound`, never `resultsFound`.** A search that returned 50 people the
   mission had already seen found nobody. Every number in this composition is a
   *new* count.
3. **Exactly one featured tile.** The headline metric is found-against-target.

**Motion:** reuse **P1 meter fill** for the progress bar and **P2 sequenced
beats** for the strategy rows. No new primitive.

### 3.5 `marketCovered()`

**New.** The agent's terminal honest state, and per the source *"the most
valuable output in the feature."* A small panel for `/product/sourcing`:

```
● Market covered

We have looked at everyone who matches this role and cannot find
more at your target level. Three things would change that:

  Drop Kubernetes from required to preferred    ≈ 6 more strong
  Widen to Hyderabad and Pune                   ≈ 3 more strong
  Accept 90-day notice periods                  no change at your level
```

The third line is the whole point and must be included. The source
distinguishes three answers — unmeasurable (render nothing), zero (say so out
loud), positive (label it an estimate) — and a marketing composition that only
shows wins misrepresents the feature. `compositionNote()` should carry
"illustrative estimates".

### 3.6 `structuralFairness()`

**New.** For `/trust` (§ 4.3) and the homepage philosophy beat.

```
STRUCTURAL FAIRNESS                                   Needs review

How this job description narrows the pool. It reads the
requirements themselves. No demographic data is used or held.

  ⚑  "rockstar"          exclusionary jargon
  ⚑  "recent graduate"   may limit experienced returners
  ⚑  7 critical skills   almost nobody clears all seven

  ○  Not enough scored candidates to rate distribution yet.
     We need 50; this role has 31.
```

That last block is the most persuasive part. A product that refuses to give
you a metric it cannot support is the site's philosophy, shipped. Do not cut
it for space.

### 3.7 `scoreModel()`

**New.** The weights as one ordered stacked bar plus the modifier row and the
gate. Anchors § 2.2's new `/product/matching` section.

```
   THE WEIGHTED SCORE
   ████████████████████████████████░░░░░░░░░░░░░░░▒▒▒▒▒░
   Skill coverage 65%    Semantic 25%    Exp 7%   Loc 3%

   THEN                       Salary  ±10%   Rarity ×   Seniority ×
   BEFORE ANY OF IT           Critical gate — missing a critical skill
                              drops a candidate before scoring

   72 Strong    52 Good    32 Potential    below Possible
```

One ordered bar, not four separate meters: the *proportion* is the claim.
Motion: **P1 meter fill**, four segments on a 90ms stagger, left to right.

### 3.8 `poolBands()`

**New.** Replaces the counts line in homepage § 05 and used on the analytics
page (§ 4.5). One ordered stacked bar of the score distribution.

**Explicitly not a donut.** The product rejected a donut for this exact data
with a reason worth reproducing in `docs/components.md`: *"a ring has no
beginning, so 'strong' and 'weak' read as two peer slices rather than the two
ends of a scale."* Ordinal data gets an ordered bar.

### 3.9 `candidateWorkspace()`

**New.** For the rebuilt `/for-candidates` (§ 4.6). A two-panel crop of the
candidate dashboard.

```
┌─ Recruiter interest ──────────┐  ┌─ Skills that would unlock roles ──┐
│  12 profile views             │  │  Kubernetes        +14 roles      │
│  ▲ +4 vs last week            │  │  Kafka             +9 roles       │
│  ───────────────────────────  │  │  Terraform         +6 roles       │
│  ▁▃▂▅▄▇▆  last 7 days         │  │  ───────────────────────────────  │
└───────────────────────────────┘  │  Based on roles you already       │
                                   │  score above 52 on.               │
                                   └───────────────────────────────────┘
```

Both panels model shipped components (§ 1.10). Motion: **P1 meter fill** on
the unlock bars.

### 3.10 `governanceLedger()`

**New.** For `/trust`. An audit-log excerpt — the least glamorous and most
persuasive thing on that page.

```
14:22  priya.s@   viewed candidate 8841              job 1042
14:19  system     scored 47 candidates               weights v3 · gate: 6 dropped
14:04  arjun.k@   changed Kubernetes REQUIRED→PREFERRED   job 1042
13:51  priya.s@   exported search results (31 rows)  audit id 4c1e
09:30  system     GDPR export completed              user 3319
```

Every row type is a real logged event (§ 1.11). The `weights v3 · gate: 6
dropped` line is the `MatchAuditLog` doing its job and is the strongest single
row.

### 3.11 Retire and rework

| Composition | Action |
|---|---|
| `heroComposition()` | **Retire.** Replaced by `matchesWorkspace()`. |
| `explanationPanel()` | **Retire.** Replaced by `explainPanel()`. |
| `poolComposition()` | **Keep**, add `poolBands()` beneath the rows. |
| `rankedList()` | **Rework** to the § 1.8 five-track row: avatar, name+headline, stage chip, score ring, origin + when. |
| `signalsCluster()` | **Keep.** Still accurate. |
| `tuner()` | **Keep.** Add the four importance tones (§ 1.9) so CRITICAL reads rose and BONUS reads neutral, matching the app. |
| `controlComposition()` | **Keep.** |
| `requisitionComposition()` | **Keep**, add the four-tier importance tones. |
| `pipelineComposition()` | **Rework** to the § 1.8 stage labels — "Offer out", "Not moving forward" — and the neutral tone on the last one. |
| `candidateViewComposition()` | **Keep**, correct the dimension list. |
| `resumeComposition()` | **Keep.** |
| `searchComposition()` | **Rework** to add `evidenceSnippet()` under each result — the quoted-snippet chip is the point of semantic search and is currently missing. |
| `comparisonTable()` | **Cut.** Shipping a table with a visibly withheld column, on a page about transparency, reads as concealment. Move the two solid category claims into prose. |
| `screenshotSlot()` | **Keep**, but the count should fall from six to at most two as the compositions above land. |

### 3.12 Acceptance for Work stream B

- `node tools/check.mjs` passes, including the new P5 cap.
- Every new primitive appears on `motion-lab.html` before it appears on a page.
- `docs/components.md` has an entry per new composition with a "models" line
  naming the product component it is drawn from.
- Reduced motion verified on the lab page and on `/`.
- At 390px: `matchesWorkspace()` shows the drawer only, list hidden;
  `missionConsole()` stacks the stat tiles two-up.
- No composition contains a label, state or route that is not in § 1.

---

## 4. Work stream C — pages

### 4.1 Rebuild `/product/matching` `[P1]`

Keep the switcher, keep "the score is not the product — the breakdown is",
keep the partial-as-hinge argument.

Changes:
1. `explainPanel()` replaces `explanationPanel()` (§ 3.2).
2. **New section: "The arithmetic, published"** with `scoreModel()` (§ 2.2, § 3.7).
3. **New section: "It cites its sources."** This is the biggest unclaimed beat
   in the product (§ 1.7). Copy:

   > Every line of the explanation points at the place it came from — a
   > sentence in their experience, a project description, a skill they listed
   > themselves. Click the reason and the profile scrolls to the words it was
   > drawn from, with the matched terms marked.
   >
   > *Verified against the candidate's own words* is a status the panel prints,
   > not a promise we make.

   Composition: `evidenceSnippet()` (§ 3.2) plus a small annotated profile crop.
4. Nine edges, not three (§ 2.6).
5. `criticalGate()` added to the explanation section.
6. Comparison table cut; two prose claims kept.
7. Lede tightened — drop "Pre-interview intelligence —", it says the same thing
   as the clause after it.

### 4.2 Rebuild `/product/sourcing` `[P1]`

Delete the "named, not depicted" section entirely. New shape:

1. **Hero** — unchanged headline, it is good.
2. **Two modes, one tool** — keep, add `evidenceSnippet()` to
   `searchComposition()`.
3. **NEW: Always-On Sourcing** `★` — the largest section on the page, built on
   `missionConsole()` (§ 3.4). Use the product's own vocabulary: *Watching*,
   *Target reached*, *Market covered*. Copy the pitch:

   > **It keeps watching after you stop.**
   > Give a role a target — twenty strong matches — and the agent checks every
   > new and updated candidate against it. You hear about someone when they
   > become a strong match, not when a report runs.
   >
   > It cannot repeat itself. Every search it tries is fingerprinted, so an
   > approach that has been run once is never run again — the count it shows
   > you is people it had not seen before, not results it returned.
   >
   > And it shows you what it refused. An approach you declined stays in the
   > history, because a list that only ever agrees with itself is not evidence
   > of anything.

4. **NEW: When the market is covered** — `marketCovered()` (§ 3.5).

   > **The most useful thing it says is "there is nobody left."**
   > When the agent has covered the market it stops and tells you what would
   > change that, with a measured estimate against each option — including the
   > options that would change nothing. A plausible invented number is worse
   > than a blank, because you would act on it.

5. **NEW: How often we interrupt you** — small, one paragraph, no composition.
   The dismissal-rate and view-rate panel (§ 1.5) as a claim: the product
   measures whether its own notifications are worth having, and shows the
   recruiter the number.
6. **Once you have someone** — keep the three cards, add saved searches and
   talent pools as a fourth and fifth, or convert to a five-card grid.
7. **Two consent bases** — the rewritten § 2.3 section.

Keep the browser extension **named and not depicted** — that one is still
undocumented and the § 3.0 rule still applies to it.

### 4.3 New page: `/trust` `[P1]` `★`

The highest-ROI missing page. Every word of it is a mechanism claim.

`src/pages/trust.mjs`, add to `NAV` under a new top-level "Trust" item or
under Product — recommend top-level, because the buyer looking for it is not
browsing.

**Head:**
- eyebrow: Trust
- title: `A hiring tool should be able to <em>account for itself.</em>`
- lede: Who can see candidate data, what gets logged, what a candidate can ask
  for, and what happens when the model changes. Mechanisms, not assurances.

**Sections:**

| # | Section | Contents | Composition |
|---|---|---|---|
| 1 | Who can see what | Six org roles, the manager→recruiter hierarchy, per-job assignment gating (an unassigned recruiter gets a 403, not a filtered view), org data isolation | checklist |
| 2 | What is logged | Every mutation carries an actor and a timestamp; every score is stored with the weights, the per-skill scores and the verdict **as they were at the time of computation**; every search is audited | `governanceLedger()` § 3.10 |
| 3 | What a candidate can ask for | Export and delete, as a request with a review queue; visibility control; review-before-save on everything extracted from a résumé | checklist |
| 4 | Structural fairness | § 1.6 verbatim, including the refusal-to-rate | `structuralFairness()` § 3.6 |
| 5 | When the model changes | Feature-flagged scoring modifiers, a versioned skill ontology, data-quality snapshots. A score computed last month is reproducible because the weights that produced it are stored with it. | prose |
| 6 | What we will not claim | **Move the `/about` block here.** It is the best copy on the site and it belongs on the page where a buyer is evaluating trust. Leave a link on `/about`. | prose |

**Do not** use the words *compliant*, *defensible*, *bias-free*, *fair by
design*, *secure*, or *enterprise-grade* anywhere on this page. Describe what
the software does. The restraint is the argument.

### 4.4 New page: `/product/hiring-operations` `[P2]`

Fixes the pillar-6 link on `/product`, which currently points at an audience
page. Contents: the job lifecycle (Draft → Under Review → Approved → Published
→ Active → Closed) with `JDStatusHistory` and versioning; named and ordered
pipeline stages; screener questions with their three types; interviews with
meeting links and records; structured feedback, public or private; team
assignment across the six roles; the audit trail. Reuse
`pipelineComposition()` (reworked) and `requisitionComposition()`.

### 4.5 New page: `/product/analytics` `[P2]`

Funnel by job, conversion, bottleneck detection, time-to-hire by stage, pool
intelligence with the scarcity index, skill heatmap, JD optimizer, and
org-level match-to-hire and prediction accuracy.

**Every figure on this page must be labelled an example.** `CLAUDE.md` § 7 is
unchanged on this point. Use `compositionNote()` on every composition and add
a page-level note in the head.

Compositions: `poolBands()` (§ 3.8), plus a funnel and a heatmap — both new,
both straightforward, neither needing a new motion primitive (P1 meter fill
covers the funnel).

### 4.6 Rebuild `/for-candidates` `[P2]`

Keep the voice. It is right and the module header defending it should stay.

Add, in this order:
1. `candidateWorkspace()` (§ 3.9) as the new second section — recruiter
   interest and skills-unlock are the two strongest reasons to build a profile
   and neither is currently on the page.
2. **Job alerts and saved jobs** — daily, weekly or instant, on a search you
   saved.
3. **Job comparison** — side by side, with the score on each.
4. **Application velocity** — applications, shortlist rate, and the honest
   framing: this is a mirror, not a scoreboard.
5. **Your data** — export, delete, and review-before-save. Link to `/trust`.
6. Fix the notification hedge (§ 2.4) and the "Told what is wrong with it"
   fragment (§ 5).

### 4.7 Split `/for-teams` `[P2]`

`/for-teams` keeps the recruiter frame and the excellent headline, and gains an
operational block: roles and permissions, reporting, data export, and an
honest integrations answer. Link to `/trust` and `/product/analytics` rather
than duplicating them.

New `/for-hiring-managers` takes the second half: the four signals, the
narrative, what-if simulation, decision justification, and the "come to the
meeting with the reasoning" argument that is currently buried at the bottom of
`/for-teams`. Different fear, different page.

### 4.8 `/pricing` `[P1, blocked on a decision]`

Not a design problem. A buyer who cannot tell whether this is a $500 or a
$50,000 decision disqualifies you before the first call. Publish the *shape*
even with no numbers: per seat or per requisition, what a design-partner
arrangement involves, what changes when billing turns on. `Subscription`,
`OrgSubscription` and a Stripe reference exist in the schema, so the shape is
at least half-decided already.

Until it exists, `/demo`'s "Pricing is not published" card should answer the
question actually being asked. Current text answers a different one.

### 4.9 `/changelog` `[P2]`

The cheapest credibility available, and it permanently solves the problem this
entire plan exists to fix: a roadmap card rots silently, a dated changelog
entry cannot. Seed it with the last six months from the product's own phase
docs.

### 4.10 Later

`/companies` (explaining the public org profiles and reviews you already
ship), `/vs/applicant-tracking-systems`, `/vs/job-boards`, one anonymised
design-partner story, `/careers`, `/integrations`, and
`/for-candidates/resume-check` — a free no-signup résumé critique, which is the
only item in this whole plan that grows the marketplace rather than the funnel
and should be promoted the moment the P0/P1 work lands.

---

## 5. Work stream D — the legal pages

The three pages currently ship as "in preparation" lists. Replace them with
real documents.

### 5.1 The standing caveat

**Nothing in this stream is legal advice, and none of it should go live
without a named lawyer's sign-off.** What this plan can do — and what has been
blocking counsel — is supply the *factual* half: exactly what data the product
holds, what it infers, who can see it, and what a user can ask for. A lawyer
can draft against that in an afternoon. A lawyer staring at a blank page and a
product they have not used cannot.

So: write these as **complete drafts with the product facts filled in and the
legal determinations flagged**. Mark every unresolved item `[COUNSEL]`. Keep
`data-content="provisional"` on all three until sign-off, and keep the site
`noindex` until then regardless.

Build them with a shared `src/lib/legal.mjs` prose layout — the file already
exists, extend it from the "covers" list format to a full document format with
`<h2>` sections, a last-updated line and an anchored table of contents.

### 5.2 Privacy policy — `src/pages/legal-privacy.mjs`

Two audiences with genuinely different concerns, so lead with a chooser:
**"I'm a candidate"** / **"I'm a hiring organisation"**. Most privacy policies
in this category fail candidates by writing entirely for the buyer.

**Structure:**

**1 · Who we are.** `[COUNSEL]` registered entity, number, address, and
whether a DPO or EU/UK representative is required.

**2 · What we hold about a candidate.** This is the section the product can
fill in completely, and doing so is itself a trust signal.

- *Given by you:* name, email, phone, location, headline, summary, links,
  work history, education, projects, certifications, languages, skills with
  self-rated proficiency and years, and preferences — salary expectation,
  preferred location, notice period, work style, open-to-work status.
- *Extracted from a résumé you upload:* the same fields, each with a
  confidence indicator, **shown to you to accept, reject or edit before
  anything is stored.** The original file is retained as an uploaded document.
- *Generated by the platform:* a match score per role with its per-dimension
  breakdown; a résumé quality score with suggestions; profile completeness;
  and four inferences — seniority alignment, career trajectory, potential, and
  drop-off risk. Also a numeric embedding of the profile, used for search.
- *Recorded as you use it:* applications and their stage history, saved jobs,
  saved searches, job alerts, profile views by recruiters, and outreach you
  received and how you responded.
- *Held by an organisation about you:* their own status for you, stage, notes,
  tags, rating, and the source you entered their pool by.

**3 · Profiles you did not create.** § 1.4. A recruiter can add a person to
their organisation's pool by import. Such a profile is marked *unclaimed*
until the person activates it. State plainly: what such a profile may contain,
who can see it, how the person is notified, how they claim or opt out, and
`[COUNSEL]` the lawful basis. **This section is the one that most needs to
exist and the one most likely to be quietly omitted. Do not omit it.**

**4 · Automated decision-making.** The obligation this category actually turns
on, and the section where the product is unusually strong.

- The platform computes a recommendation and a ranking. It does not make
  hiring decisions; a person at the hiring organisation does.
- What goes into the score: four weighted factors, three modifiers, and a
  disqualifying gate on critical requirements. Publish the weights here as
  well as on `/product/matching` — a privacy policy that tells you the actual
  arithmetic is a rare thing.
- Every score is stored with the weights and per-skill scores that produced it,
  so any given result can be reconstructed.
- No demographic data is used or held, and none is inferred.
- What a candidate can ask for: the reasoning behind a score, correction of the
  underlying data, and human review. `[COUNSEL]` the exact rights language per
  jurisdiction, and whether the ranking constitutes a "decision" under Art. 22
  or its equivalents.

**5 · Visibility and who can see you.** The three levels and precisely what
each controls. `[COUNSEL]` verify the mapping against `PrivacyMode` before
publishing — the site must not describe a control the product does not have.

**6 · Your rights.** Access, correction, export, deletion, objection,
withdrawal of consent. Export and delete are **live in the product** as a
request with a review queue — describe the route and the timescale, don't
describe a form.

**7 · Retention.** `[COUNSEL]` — needs a decision per data class. At minimum
the policy needs a stated position on: an inactive candidate profile, an
unclaimed imported profile, an uploaded résumé file, match scores and audit
logs, and an organisation's own notes about a candidate after that candidate
deletes their account.

**8 · Sub-processors and transfers.** `[COUNSEL]` — needs the actual list.
Known from the code: an AI inference provider (there is an `AiCallLog` and a
FastAPI client), object storage for résumés and logos, an email provider, and
Clearbit for company logo fallback. Publish the list; a named list is worth
more than a paragraph about "trusted partners".

**9 · Cookies.** Cross-reference, do not duplicate.

**10 · Contact.** `[COUNSEL]` a named address, not a form — the current page
already promises this and it is the right call.

**11 · Changes to this policy.** Standard, plus a commitment to date it.

### 5.3 Terms of service — `src/pages/legal-terms.mjs`

Two documents. The current page is right that one would have to be vague where
it matters most. Ship `/legal/terms/organisations/` and
`/legal/terms/candidates/` with `/legal/terms/` as a chooser.

**Organisation terms — sections:**

1. The service, and the account model — organisation, members, six roles.
2. **What a match score is and is not.** A computed recommendation over
   structured data. Not an assessment, not a prediction of job performance,
   not a decision. **The hiring decision, and responsibility for it, remains
   with the organisation.** `[COUNSEL]` — this clause is load-bearing and
   should be drafted first.
3. Acceptable use of candidate data reached through search: purpose
   limitation, no re-sale, no export into an unrelated system, no use for
   anything but recruitment for the roles you are hiring.
4. Imported profiles — the organisation's obligations as the party that
   introduced that person's data. `[COUNSEL]`, and it likely needs a
   controller/processor determination that also belongs in a DPA.
5. Reviews — an organisation may respond once publicly and may flag for
   moderation; it cannot delete a review. Matches the shipped behaviour.
6. Availability, support, and the absence of an SLA where none has been made.
7. Fees. `[COUNSEL]` — pending § 4.8. Say plainly that billing is not active.
8. Termination, and what happens to data on it, in both directions.
9. Liability, indemnity, governing law. `[COUNSEL]`.

**Candidate terms — sections:**

1. Your account and your profile.
2. Accuracy — you are responsible for what you claim; the platform scores what
   you provide.
3. What we do with your profile, in one paragraph, linking to the privacy
   policy rather than restating it.
4. **What a match score means for you.** It is one organisation's ranking of
   fit against one role, computed from structured data. It is not a judgement
   of you, and a low score on one role says nothing about another.
5. Reviews you write: the verified-application gate, one per role, anonymity,
   moderation, and that you cannot delete after publication but can request
   removal.
6. Conduct, termination, and how to leave — including that deletion is a real
   route and where it is.
7. `[COUNSEL]` liability and governing law.

### 5.4 Cookie policy — `src/pages/legal-cookies.mjs`

The current page is honest and nearly right; it just needs to become a
document rather than a promise of one, and to separate the two properties.

**This marketing site.** Sets no cookies, runs no analytics, loads no
third-party script other than a Google Fonts stylesheet — and that request
does leave an IP address with Google. State it, and state the fix:
self-hosting the two font families removes the last third-party request from
the site entirely. **Recommend doing it** — it is a half-day of work, it makes
this page trivially short and true, and it removes the site's only external
dependency.

**The application.** Session cookies necessary for authentication, and a
refresh-token mechanism. `[COUNSEL]` — enumerate the actual cookie names,
purposes and lifetimes from the auth module before publishing. If analytics is
ever added, a consent mechanism becomes an obligation; say that adding it is a
decision with that attached, rather than leaving room to add it quietly.

### 5.5 Footer

Three "in preparation" links on every page is thirty-six reminders across the
site that the company is not ready. Once the drafts land they are real pages
and the problem goes away. Until then, collapse the three footer links to a
single **Legal** link pointing at a `/legal/` index.

---

## 6. Work stream E — `/about`, with one person behind it

`src/pages/about.mjs`.

### 6.1 What to delete

- **The three-card "Pending / Founder / Product / Engineering" grid.** It makes
  the company look unfinished, which is the opposite of what the prose two
  inches above it achieves. Delete it outright.
- **The "Company details pending" panel.** A missing registered address is a
  procurement blocker; announcing it in a bordered box makes it a visible one.
  Put the details in the footer when they exist; say nothing until then.

### 6.2 What to move

**"What we will not claim" moves to `/trust`** (§ 4.3, section 6). It is the
best copy on the site and it belongs where a buyer is evaluating. Leave a
one-line pointer on `/about`.

### 6.3 The new section — one person

Being solo is not a weakness to manage. It is the explanation for everything
distinctive about the product, and the page should say so plainly and then move
on. The failure modes to avoid, in order:

- Padding it out with "we" to imply a team. A visitor who checks LinkedIn will
  find out, and then every other claim on the site is retroactively suspect.
- Apologising for it.
- Making it the point. A buyer needs about ninety words on this, not a
  founder essay. The product is the argument.

**Draft copy.** Replace the names in brackets; keep the shape.

> ## Who is behind this
>
> One person. I'm **[NAME]**, and I built Transpahire — the matching engine,
> the taxonomy, the application and this site.
>
> That is the reason for a few things you may have noticed. The product refuses
> to show a number it cannot support, because there is nobody to overrule that
> instinct. The sourcing agent logs every search it tries and every one you
> turned down, because I have to be able to debug it from the outside. And this
> site has empty slots on it where the customer logos and the screenshots will
> go, because filling them in would have been faster than admitting they are
> not there yet.
>
> A one-person company is a real thing to weigh when you are buying software,
> and I would rather you weighed it now than found out later. What I can offer
> against it: you will always be talking to the person who wrote the code, and
> nothing on this site has been through a marketing department, because there
> isn't one.
>
> [OPTIONAL — one or two sentences: what you did before, and the specific thing
> that made you build this. Concrete beats impressive. "I spent four years
> watching good candidates get filtered out by keyword search" is worth more
> than a job title.]
>
> **[NAME]** · Founder · [email] · [LinkedIn, if you want it]

**Do not** add a photograph unless you want one; the page does not need it and
a stock-looking headshot is worse than none.

`[CONFIRM]` from you before this can ship: your name as you want it published,
the contact address, and whether the "[OPTIONAL]" paragraph exists and what is
in it. Everything else is written.

### 6.4 The rest of `/about`

"Why this exists" and "Both sides of the table" stay as they are. They are
good. Fix the one factual dependency: the paragraph describing the score should
match § 1.1 after Work stream A.

Add a short **"Where this is"** section replacing the deleted pending panel —
one honest paragraph about the stage the company is at. Pre-revenue, looking
for design partners, this many months in. Being early is not a secret, and a
buyer who is comfortable with early is exactly the buyer you want.

---

## 7. Sequencing

| Order | Work | Effort | Unblocks |
|---|---|---|---|
| 1 | A.1 wire `/demo` | 1 hr | everything |
| 2 | A.3 consent sentence | 1 hr | removes legal exposure |
| 3 | A.2 the scoring model, six pages | ½ day | B, C |
| 4 | A.4 roadmap + hedges | 1 hr | |
| 5 | A.5–A.9 remaining corrections | ½ day | |
| 6 | F — governance docs (§ 8) | ½ day | prevents recurrence |
| 7 | B.1 `matchesWorkspace()` + P5 in motion-lab | 2 days | the hero |
| 8 | B.2 `explainPanel()` | 2 days | C.1 |
| 9 | C.1 rebuild `/product/matching` | 1 day | |
| 10 | C.3 `/trust` + B.6, B.10 | 2 days | enterprise buyer |
| 11 | B.4, B.5 + C.2 rebuild `/product/sourcing` | 3 days | the differentiator |
| 12 | D — legal drafts | 2 days + counsel | launch |
| 13 | E — `/about` | ½ day | blocked on your name |
| 14 | C.4–C.7 remaining pages | 4 days | |
| 15 | C.8 pricing | a decision | |

**Do not** start stream B before stream A is complete. Building a preview
library against the wrong facts means building it twice.

---

## 8. Work stream F — stop this happening again

The nine defects in the audit were not authoring mistakes. They were the
correct output of a process pointed at a stale document. Fix the process in the
same commit as the content, or the next session inherits the same problem.

### 8.1 `CLAUDE.md` amendments

**§ 7, "The remaining boundary"** — the following clauses are now obsolete and
must be rewritten, not deleted, so the reasoning survives:

| Current clause | Replace with |
|---|---|
| "invent a skill-graph edge — three are confirmed" | "use the nine relationship types in `SkillRelationType` and the five in `JobRelationType`, and no others. `docs/phase-4.md` § 1.2 lists them." |
| "depict the sourcing agent or the Chrome extension — both exist, neither interface is described" | "the sourcing agent's interface is built and specified in `docs/phase-4.md` § 1.5; depict it from that. **The Chrome extension is still undescribed — name it, do not draw it.**" |
| "restore … the employer-reputation card" | "employer reviews are now sourced by `ORG_REVIEWS.md` — the verified-application gate, moderation and right-of-reply are real. The old *invented* reputation card stays deleted; a page describing the shipped feature is permitted." |
| "write a fifth trust beat … needs named legal sign-off" | Keep the gate, but add the distinction that unblocks the work: **"A claim about what the software computes and shows is a mechanism claim and is permitted. A claim about the outcome — fair, unbiased, compliant, defensible, auditable — is not, and needs named sign-off. 'We read the job description for exclusionary language and hold no demographic data' is the first kind. 'Fair by design' is the second."** |

**§ 4, "Product integrity"** — add:

> **The classification is checked against the schema, not against a plan.**
> `docs/phase-4.md` § 1 is the current fact sheet. When it and
> `docs/phase-2/` disagree, § 1 wins. When § 1 and the product source
> disagree, the source wins and § 1 gets updated in the same commit.

**§ 1, "Phase status"** — update to Phase 4, and point new sessions at
`docs/phase-4.md` § 1 as the first thing to read.

### 8.2 `docs/content-integrity.md`

Re-run the whole inventory against § 1 of this document. Specifically: every
item in § 1.3 that is currently PLACEHOLDER or absent is now AUTHORITATIVE and
needs promoting with § 1 as its source. Add a dated "last reconciled against
product source" line at the top of the file — an inventory with no date is an
inventory nobody knows to distrust.

### 8.3 `docs/motion-system.md`

Document P5 (§ 3.1) with its cap, its reduced-motion behaviour and what it
communicates. Note that it composes two existing primitives rather than
introducing a new keyframe.

### 8.4 `docs/components.md`

An entry per new composition, each with a **"models:"** line naming the product
component it is drawn from. That line is what lets a future session check a
composition against the product instead of guessing.

### 8.5 `docs/product-visualization.md`

Add § 1.5's density and two-pane allowances (§ 3.0), and record the donut
decision (§ 3.8) as a general rule: **ordinal data gets an ordered bar, never a
ring.**

### 8.6 `tools/check.mjs`

Three new checks:

1. P5 cap — one drawer reveal per page.
2. The banned-vocabulary list (§ 2.9).
3. **A stale-fact tripwire.** Fail the build if the string "five dimensions"
   appears anywhere in `src/`, or if `data-content="placeholder"` appears on a
   section listed as shipped in § 1.3. Crude, and it would have caught six of
   the nine defects.

---

## 9. What is blocked on you

Nothing in Work stream A or B needs an input. These do:

| Item | Needed for | Blocking |
|---|---|---|
| Your name, contact address, and the optional founder paragraph | § 6.3 | `/about` |
| Registered company name, number, address | footer, § 5.2 §1 | legal pages, enterprise credibility |
| A demo form endpoint, and who reads it | § 2.1 | **everything** |
| What an unclaimed imported profile is visible to | § 2.3, § 5.2 §3 | the consent rewrite |
| Named legal sign-off on the mechanism/outcome distinction | § 8.1 | fairness copy, `/trust` |
| Counsel to draft against § 5 | § 5 | launch |
| Pricing shape | § 4.8 | qualified buyers |
| Sub-processor list | § 5.2 §8 | privacy policy |
| Retention decisions per data class | § 5.2 §7 | privacy policy |
| One real screenshot of the matches screen | `/product` hero slot | it is still the highest-value single asset on the site |
| Confirmation of the "148,000+ cities" figure | § 1.12 | any location claim |

---

## 10. The one thing to hold on to

The instinct that produced this site — *never claim what you cannot support* —
is correct, rare, and worth more than any individual fix in this plan. Nothing
here loosens it.

What it needs is a different target. It was implemented as a list of
prohibitions frozen against a planning document, and a prohibition list does
not notice when the thing it was protecting you from becomes true. Point it at
the schema instead of at the plan, and the same instinct that produced nine
defects will produce the most accurate marketing site in the category.
