# 09 — Messaging

Headlines, supporting copy, pillar messaging, CTAs, and the voice rules that
govern all of it.

**Status: candidates, not final copy.** Brief § 19 and `docs/content-integrity.md`
§ 6 both apply — improving copy means making true things clearer, never making
unverified things sound more confident.

Reconciled against `[OVERVIEW]`. Its § 9 supplies five key messages; those are
**owner-supplied and sanctioned**, and § 8 below records where they sit against
the recommendations here. Where this document and `[OVERVIEW]` differ on a line,
`[OVERVIEW]` is the source and any reservation is stated once and then dropped.

---

## 1. Voice

Set by `DESIGN.md § 1`: **direct, specific, unhedged. Short declaratives.**

| Do | Don't |
|---|---|
| Name the mechanism — *"skill coverage, experience alignment, location, salary, semantic similarity"* | Name the technology — *"powered by advanced AI"* |
| Use the product's own words — *Covered · Partial · Missing · Strong Match · critical / required / preferred / bonus* | Invent marketing synonyms for shipped labels |
| State a limit — *"three covered, one partial, one missing"* | Round up to a feeling — *"near-perfect match"* |
| One idea per sentence | Three clauses and a conjunction |
| Let a number be specific or absent | Approximate — *"up to 10x faster"* |

### The serif accent — the brand signature

One `<em>` per headline, falling on **the phrase that carries the turn, not on a
noun** `DESIGN.md § 3`. It is the single most recognisable Transpahire signature
`CLAUDE.md § 2`.

```html
<h2 class="h-section">The score <em>shows its work.</em></h2>          ✅ the turn
<h2 class="h-section">The <em>score</em> shows its work.</h2>          ❌ a noun
<h2 class="h-section"><em>Every</em> shortlist <em>explains itself.</em></h2>  ❌ two
```

### Banned by default

The brief's list, plus what this analysis adds:

*Revolutionize your hiring · Supercharge your recruitment · The future of hiring ·
AI-powered talent acquisition · Unlock the power of AI · Hire smarter, faster,
better · Transform your hiring · Next-generation · Seamlessly · Effortlessly ·
End-to-end (unqualified) · Best-in-class · 10x · Game-changing · Cutting-edge ·
Leverage · Empower · Democratize*

Also banned because they are unverifiable or gated, not merely because they are
tired: *bias-free · unbiased · fair by design · fully auditable · compliant ·
enterprise-grade · trusted by · industry-leading · proven*.

And two the current site uses that must go until sourced: *"Setup in under 10
minutes"* and *"Join hiring teams using Transpahire"*
`docs/content-integrity.md § 2`.

---

## 2. The message hierarchy

### Primary message — one sentence

> **Transpahire scores every candidate against a role out of 100, and shows you
> the reasoning behind every position on the list.**

Deliberately unglamorous and testable. No adjective, no technology claim, nothing
that needs sign-off. `[OVERVIEW]` § 6's own opening is the same sentence from the
other side — *"Most hiring platforms show a score. Transpahire shows the reasoning
behind the score."*

### Supporting message — two to three sentences

> Every candidate is scored against the role, and every score comes apart: skill
> coverage, experience, location, salary and semantic fit — plus which skills are
> covered, which are partial, and which are missing. It knows Docker leads to
> Kubernetes, so it does not discard people over a word. You set which skills
> matter and the ranking follows. Candidates see the same score.

### Three proof points

Derived from § 7 of `02` — the three differentiators that survive the evidence.
These are the three lines that should appear, in some form, on every page.

| | Proof point | Mechanism |
|---|---|---|
| **1** | **Every ranking comes apart into its reasons.** | Score out of 100, five named dimensions, per-skill covered/partial/missing, a written narrative `[OVERVIEW]` § 3 |
| **2** | **It understands skills, not words.** | A relational skill graph — *requires*, *enables*, *similar to* — behind hidden-talent detection `[OVERVIEW]` § 6 |
| **3** | **You set what matters, and can test a change before making it.** | Per-skill importance tuning with instant re-rank; what-if simulation `[OVERVIEW]` § 3 |
| **4** | **The candidate sees the same score.** | Same number, same breakdown, real status, résumé feedback `[OVERVIEW]` § 2, § 8 |

Three is the usual discipline; four is right here because `[OVERVIEW]` confirmed a
mechanism behind each and because 2 and 3 are the two a competitor cannot claim.
If one has to go for space, **cut 4 on recruiter-facing pages** and make it the
whole of `/for-candidates`.

Note what these are *not*: not "find better candidates", "hire faster", "reduce
bias". Those are outcomes with no evidence `[00 § 6]`. These four describe
behaviour a demo can verify in ninety seconds — a stronger form of claim than an
outcome nobody can check.

### Brand-level reconciliation

`docs/content-integrity.md` § 2 records two AUTHORITATIVE lines. Both survive and
both are better than the current homepage copy:

- Tagline: *"Hiring intelligence for teams that care about quality."* **Keep.**
- Positioning paragraph: *"Transpahire is a single platform for transparent,
  AI-native recruitment. We help enterprise talent teams see candidates clearly,
  match precisely, and hire with the structured trust that an applicant-tracking
  system alone can never give them."* **Keep, with one edit:** drop
  *"enterprise"*. `[OVERVIEW]` § 1 positions the product as *lighter and faster
  than enterprise ATS tools* and § 9 targets teams hiring 50–500 a year — so
  "enterprise talent teams" contradicts the product's own positioning. Recommend
  *"talent teams"*.
- `[OVERVIEW]`'s own first line is also usable verbatim: *"an intelligent hiring
  platform built for modern talent teams"* — the category statement from
  `[02 § 2]`.

---

## 3. Homepage headlines

Recommended first, alternates below. `<em>` marks the accent.

### § 01 Hero
1. **Every shortlist `<em>`explains itself.`</em>`** ← recommended
2. Ranked candidates, `<em>`and the reasons why.`</em>`
3. The shortlist, `<em>`with its reasoning attached.`</em>`

*Lede:* Transpahire scores every candidate against the role out of 100 and shows
the arithmetic — five dimensions, which skills are covered, which are partial,
which are missing, and a plain-language reason. Not a number you have to trust.

### § 02 The gap
1. **Finding people is easy now. `<em>`Knowing who fits isn't.`</em>`** ← recommended
2. The hard part was never `<em>`finding more people.`</em>`

*Cards:* **The volume** — more candidates than any person can read, and a queue
that does not wait. **The guesswork** — a ranked list you cannot interrogate is a
guess with better manners. *(serif closer)* **The memory** — three weeks later,
nobody can reconstruct why anyone was passed over. *(serif closer)*

*Ink statement:* A score you cannot question is not evidence. It is an opinion
with a number on it.

### § 03 Interlude
1. **A score you cannot question is `<em>`an opinion with a number on it.`</em>`**
   ← recommended, if it is not already used as the § 02 statement — **use it
   once, in one place**
2. Every hiring decision is an argument. `<em>`Most of them are never written down.`</em>`
3. Transparency that runs one way `<em>`is just a dashboard.`</em>` *(reserved for § 10)*

### § 04 The role
1. **It reads the role `<em>`before it reads a résumé.`</em>`** ← recommended
2. Everything downstream is measured `<em>`against this.`</em>`

*Body, two beats:* every skill is marked critical, required, preferred or a bonus
— four tiers, not a list. Then search the pool by filters, or describe the person
in a sentence; same tool, either way. *Optional third clause, one line only:* or
let the sourcing agent work the brief for you. **Named, not depicted** `[06 § 5]`.

### § 05 The pool
1. **Nobody gets skipped, `<em>`and nobody gets a free pass.`</em>`** ← recommended
2. Every candidate is scored. `<em>`Then they're ordered.`</em>`
3. You're not waiting `<em>`for applications any more.`</em>` ← the strongest *claim*
   of the three, and now sourced `[OVERVIEW]` workflow 1

*Body:* every candidate in the database is scored against the role and classified
Strong, Good, Potential or Weak. *Required closing clause:* consented profiles
only — candidates control who sees them.

### § 06 The argument ★
1. **The score `<em>`shows its work.`</em>`** ← recommended
2. Eighty-seven out of a hundred. `<em>`Here's the hundred.`</em>`
3. It will tell you `<em>`what's wrong with its own top pick.`</em>` ← use as the
   lede or the closing line; too long for the H2 at `--fs-h2`

*Lede:* Five dimensions. Three skills covered, one partial, one missing. Two
sentences on why — including the part that counts against them.

*The copy note that matters most on this page:* the word **partial** does more
work than any adjective available. *"Not covered. Not missing. Understood."* is a
usable three-beat line for the partial row, and it is the sentence that sets up
section 07.

### § 07 Adjacency ★
1. **Your filter said no. `<em>`The skills said otherwise.`</em>`** ← recommended
2. It knows Docker `<em>`leads to Kubernetes.`</em>` ← the most concrete option, and
   `[OVERVIEW]`'s own example
3. Skills aren't words. `<em>`They're related to each other.`</em>`

*Body:* skills are structured — typed, hierarchical, and related by *requires*,
*enables* and *similar to*. Which is why a candidate with deep Docker experience
scores partial on Kubernetes instead of dropping out of the list. Hidden talent is
not a lowered bar; it is a larger pool.
*Caption, `.label` size:* aligned to ESCO and O*NET. The credibility footnote,
never the headline.

### § 08 Control ★
1. **You decide what counts. `<em>`It does the arithmetic.`</em>`** ← recommended
2. The ranking is `<em>`your priorities, calculated.`</em>`
3. Change the requirement. `<em>`See who appears.`</em>` ← for the what-if beat

*Two beats, and they are different claims:* **tune** — make Kubernetes matter more
and the list re-ranks as you move it; **simulate** — drop a preferred skill and see
how many more qualified people appear, before you change the job.
*Closing line:* it shows its work, and it lets you overrule it.

### § 09 The hire
1. **From shortlist `<em>`to signed.`</em>`** ← recommended
2. Then it gets `<em>`out of the way.`</em>`

*Body:* approvals before a job goes live, stages you name and order yourself,
interview records, structured feedback. Enough to run the hire without leaving the
platform. **Do not write** *scheduling*, *calendar* or *sync* — UPCOMING
`[OVERVIEW]` § 7.

### § 10 Both sides
1. **The person you passed on `<em>`can see why.`</em>`** ← recommended
2. It's `<em>`the same eighty-seven.`</em>` ← the most literal option, and the most
   surprising once the visitor has read section 06
3. Both sides read `<em>`the same score.`</em>`

*Body:* candidates see their match score, where they fit and where they don't,
what their résumé is missing, which skills would open more roles, and where their
application actually stands. `[OVERVIEW]`'s own line is worth borrowing: this is
*"uncommon in ATS products, which typically optimize entirely for the recruiter."*
*Closing serif line:* Transparency that only runs one way is just a dashboard.

**Cut, and do not reinstate without asking:** *"They rate your hiring process. You
get the score."* Employer reputation scoring is not in `[OVERVIEW]` `[00 § 4]`.

### § 11 Philosophy
Beats: **RECOMMENDS** it ranks the pool · **EXPLAINS** it shows the arithmetic ·
**YOU REVIEW** you read the case · **YOU DECIDE** and you can change the inputs.

*Statement:* **A recommendation you can argue with is `<em>`the only kind worth
having.`</em>`**

**Stop at four beats.** The fifth — traceability — is a **live feature and a
gated claim** `[02 § 9]`. If legal signs off, it reads *"and the weights are
logged"* — a mechanism — never *auditable*, *compliant* or *defensible*.

### § 12 CTA
1. **Bring a role `<em>`you're struggling to fill.`</em>`** ← recommended. Concrete,
   qualifying, and the opposite of a generic demo ask
2. See it against `<em>`your own requisitions.`</em>`

*Supporting:* Thirty minutes. We run one of your open roles through the engine
and you read the reasoning yourself.
*(`NEEDS BUSINESS VALIDATION` — confirm that is what a demo actually is.)*

---

## 4. Pillar messaging

One line each, for `/product` and the nav menu. Six pillars per `[03 § 1]`.

| Pillar | Headline | Supporting |
|---|---|---|
| **Sourcing & Discovery** | Two ways to find the same person | Filter by skills, experience, location, availability and salary — or describe who you need in a sentence. Same tool, either way. Similar-candidate discovery expands a shortlist from someone you already like. Consented profiles only. |
| **Explainable Matching** | Every ranking comes apart | A score out of 100 across skill coverage, experience, location, salary and semantic fit — plus which skills are covered, which are partial, which are missing, and two sentences on why. |
| **Skill Intelligence** | It understands skills, not words | Skills are typed, hierarchical and related to one another — Docker leads to Kubernetes, React transfers to Vue. That relationship is why adjacent experience counts instead of being discarded. |
| **Candidate Intelligence** | A profile, not a document | Résumés become structured profiles, with per-item confidence and the candidate's own review before anything is saved. Then the signals a CV won't give you: seniority alignment, career trajectory, potential, responsiveness, drop-off risk. |
| **Recruiter Control** | You set what matters | Mark each skill critical, required, preferred or a bonus. Move one and the ranking follows. Simulate a change before you make it. |
| **Hiring Operations** | Move the right people forward | Approvals, stages you name yourself, interview records, structured feedback — and funnel, bottleneck and pool reporting to see whether it worked. |

**Order matters in the nav.** Skill Intelligence directly after Explainable
Matching, because it is the answer to the question the first one provokes — the
same reason section 07 follows section 06 `[05 § 3]`.

## 5. Audience-facing lines

**Recruiters / talent teams (`/for-teams`)**
Headline: **You read forty CVs to find six. `<em>`Read six arguments instead.`</em>`**

**Hiring managers (on `/product/matching`, later `/for-teams/hiring-managers`)**
Headline: **Come to the meeting `<em>`with the reasoning.`</em>`**
Supporting: the breakdown, the narrative, career trajectory, seniority alignment,
potential — and a simulation to answer *"what if we relaxed that requirement?"*
before the meeting rather than during it.
The claim stays safe as long as it is *"you can see and explain the reasoning"* and
never becomes *"defensible"*, *"auditable"* or *"compliant"*
`docs/content-integrity.md § 4`.

**Candidates (`/for-candidates`)**
Headline: **Find out `<em>`why you match.`</em>`**
Supporting: Roles scored for you out of 100, with where you fit and where you
don't. What your résumé is missing, in specifics. Which skills would open more
roles, and how many. And where your application actually stands.
Second headline option, stronger and only sayable because it is true: **The
recruiter sees `<em>`the same score you do.`</em>`**
Voice note: warmer than the recruiter pages, same directness. Never
congratulatory, never *"your dream job"*. The product's honesty toward candidates
is the point — a résumé score of 62 with five suggestions is the tone.

---

## 6. CTA strategy

### Primary: **"Book a demo"** → `/demo`

Considered and rejected:

| Option | Why not |
|---|---|
| *Start free trial* / *Start hiring* | The product cannot demonstrate itself against an empty pool. A trial that opens on zero candidates teaches the visitor the opposite of the pitch `[02 § 11]` |
| *Try Transpahire* | Same problem, vaguer |
| *Get early access* (current) | Signals pre-launch. `[OVERVIEW]` § 7 puts subscription and billing in *inferred* — nothing to buy yet — which is circumstantial support for a pre-GA posture. `NEEDS BUSINESS VALIDATION`; if the product is genuinely pre-GA, **keep it**: honest, and a lower bar to a conversation |
| *Explore platform* | Not a conversion; it is a nav item |
| *Contact sales* | Colder, and implies a sales org that may not exist |

The button says **Book a demo**; the § 12 headline does the qualifying work
(*"Bring a role you're struggling to fill"*). That split lets the button stay
short and the ask stay specific.

### Secondary: **"See how matching works"** → `/product/matching`

The strongest exploratory destination on the site and the page the positioning
rests on `[04 § 3]`. `.btn--secondary` in the hero and § 12; `.link` mid-page.

### Candidate: **"Looking for a role?"** → `/for-candidates`

Nav utility slot and footer. Never a button, never in a hero, never competing
`[02 § 4]`.

### Placement — three moments, whole page

| Where | What | Why |
|---|---|---|
| Header | `Book a demo` primary, persistent | Always available; one `.btn--primary` per view `docs/components.md § 3` |
| Hero | Primary + secondary | The only place both appear together |
| § 06 | `.link` → `/product/matching` | Peak curiosity, mid-page. A link, not a button — the visitor is not finished reading |
| § 10 | `.link` → `/for-candidates` | Serves the claim, not the funnel |
| § 12 | Primary + secondary | **The conversion moment**, at peak belief `[02 § 10]` |

No CTA in sections 02, 03, 04, 05, 07, 08, 09, 11. Eight sections with no ask is
the point — it is what lets the page read as an explanation rather than a pitch.

---

## 7. Metadata

| | |
|---|---|
| **Title** (home) | `Transpahire — the intelligent hiring platform that shows its reasoning` |
| **Description** | `Transpahire scores every candidate against the role out of 100 and shows the reasoning — skill coverage, experience, location, salary and semantic fit, plus which skills are covered, partial and missing. Book a demo.` |
| **`/product/matching`** | `Explainable candidate matching — Transpahire` |
| **`/product/sourcing`** | `Semantic and structured candidate search — Transpahire` |
| **`/for-candidates`** | `See why you match — Transpahire for candidates` |
| **og:image** | **Does not exist.** `CONTENT REQUIRED`, and on the indexing gate `docs/content-integrity.md § 5`. Recommend the § 06 explanation panel over a logo card — it is the one asset that explains the product at thumbnail size |

Every page keeps `noindex` until the integrity gate clears. Structured data stays
`Organization`-only — no Product, Offer, Review, AggregateRating or FAQ schema
while any claim is unvalidated `docs/content-integrity.md § 3`.

---

## 8. Phrases to keep

### The five `[OVERVIEW]` key messages — sanctioned

`[OVERVIEW]` § 9 supplies these as *"key messages for landing pages"*. All five
are owner-approved. Assessment offered as recommendation, not veto.

| Line | Verdict | Where |
|---|---|---|
| **"Scores that explain themselves."** | **Use.** Closest to the recommended primary; a near-synonym for *"the shortlist explains itself"*. Pick one of the two per page and stay consistent | § 01 or `/product/matching` H1 |
| **"Matching that understands skills — not just keywords."** | **Use.** Was on hold pre-Overview; the relational skill graph is confirmed, so this is now fully supported | **§ 07** — it is that section's thesis |
| **"Find candidates who fit, not just candidates who applied."** | **Use.** Supported by the shared database and proactive search `[OVERVIEW]` workflow 1 | § 05 or `/for-teams` |
| **"Built for hiring decisions your team can stand behind."** | **Use with care.** *"Stand behind"* is defensibility phrased as confidence. It is a hair from *defensible*, which is legally gated `[02 § 9]`. Safe as a section closer; **do not** pair it with fairness, audit or compliance language, and do not use it on a page that mentions bias | `/for-teams` closer |
| **"The missing layer between your job post and your shortlist."** | **Use in campaigns, not in the hero.** *Layer* implies it slots into an incumbent ATS, and `[OVERVIEW]` § 7 puts every integration in upcoming — a reader may infer an integration that does not exist. It is also a good, specific line, so the reservation is narrow: keep it away from anywhere a buyer is forming a mental model of what they are installing | Ads, email subject lines |

### Sanctioned comparison lines

`[OVERVIEW]` § 9, all three authoritative:

- **"An ATS with a brain."** — the ATS comparison. Scope discussion: `[02 § 3]`
- **"What happens after the job board — intelligent evaluation, not just
  aggregation."** — job-board comparison
- **"Pre-interview intelligence — know who to call before you pick up the
  phone."** — screening-tool comparison. **The best of the three**, and the only
  one with no downside: it concedes no frame, claims no category, and states the
  product's actual position in the hiring process. Recommended for
  `/product/matching`

### Lines developed here, worth protecting

Specific, true, and difficult for a competitor to say:

- *The score shows its work.*
- *It knows Docker leads to Kubernetes.*
- *Not covered. Not missing. Understood.* — the partial row
- *A score you cannot question is an opinion with a number on it.*
- *The person you passed on can see why.* / *It's the same eighty-seven.*
- *Transparency that only runs one way is just a dashboard.*
- *A recommendation you can argue with is the only kind worth having.*
- *Nobody gets skipped, and nobody gets a free pass.*
- *You decide what counts. It does the arithmetic.*
- *Hidden talent is not a lowered bar. It's a larger pool.*
- *It shows its work, and it lets you overrule it.*

The two that are load-bearing rather than merely good: **"Not covered. Not
missing. Understood."** because it is the only line that makes the partial state
legible in three words, and **"It's the same eighty-seven."** because it converts
the two-sided claim from an assertion into a fact the visitor has already
verified two sections earlier.
