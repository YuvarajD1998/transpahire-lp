# Phase 5 — Execution plan

**Make the first screen carry the product. Then give a visitor something to do
that isn't a sales call. Then open the doors.**

Written 31 Aug 2026, against the site at Phase 4 complete (21 pages, 40+
compositions, `docs/phase-4.md` § 1 reconciled) and the product at the same date.

> **Status: streams A, B, C-partial, and the § 8 governance work are DONE.**
> Streams D and E are blocked on named inputs and were deliberately not started.
> § 11 at the end of this file records what was built, every deviation from this
> plan with its reason, and what is left.

---

## 0. State of play

Phase 4 did what it set out to do. Every factual defect in the audit is fixed,
the preview library models real components, `/trust` and `/pricing` and the
legal drafts exist, and `robots.txt` now documents its own gate instead of just
asserting it. The site is accurate.

**It is also invisible, and it has one conversion path.**

Those are the two facts that shape this phase:

1. **`Disallow: /` is still in place.** Twenty-one accurate pages that nobody
   can find. Every SEO argument in Phase 4 is still worth zero, and the site's
   only job remains converting people who arrive from a link you sent. Phase 5
   closes the gate out — see § 6.
2. **There is no email capture anywhere on the site**, and all twenty-one
   pages funnel into a thirty-minute call with a stranger. A visitor who is
   interested but not ready has literally no way to stay in contact. See § 4.

And one thing Phase 4 got structurally wrong, which is the headline item here:

3. **The hero composition is thin — and not by choice.** It is thin because it
   was built to fit a column that is too narrow for it, and the CSS then hides
   three of its five row tracks to make it fit. § 3 diagnoses and rebuilds it.

### 0.1 Read first

`docs/phase-4.md` § 1 is still the fact sheet and is still current. **§ 2 of
this document is a delta against it**, not a replacement — it adds what a
deeper read of the job-detail surface turned up, and corrects nothing.

Build loop unchanged:

```bash
node tools/build.mjs && node tools/check.mjs
node tools/serve.mjs      # one terminal
node tools/audit.mjs      # another
```

Verify at 390px, 768px and 1440px. Phase 5 adds a fourth check that matters
more than usual: **1440 × 900, the whole hero in one screen, no scrolling.**
See § 3.6.

---

## 1. What this phase is for

| Stream | Why | Effort |
|---|---|---|
| **A — the hero** § 3 | It is the first screen. It currently shows a strip of names and one panel, which under-represents an application with five job tabs, a tabbed candidate drawer and an agent console. | 4–5 days |
| **B — conversion** § 4 | One path, highest possible threshold, no email capture. This is the stream most likely to change your pipeline. | 4–6 days |
| **C — proof** § 5 | You cannot get a testimonial. You can generate evidence with the product itself. | 2 days |
| **D — pages** § 6.4 | Three remaining, and they only earn their keep once indexing opens. | 3 days |
| **E — open indexing** § 6 | Highest leverage on the list. The site does not exist until this lands. | mostly not code |

**Do stream E's blocker-chasing in parallel with everything else** — it is
phone calls and decisions, not builds, and it gates the value of all the rest.

---

## 2. Ground truth — delta since Phase 4

Read out of the product source on 31 Aug 2026. Everything here is shipped and
none of it is on the site.

### 2.1 The job detail page has five tabs

`frontend/src/views/jobs/JobDetail/index.tsx`

```
Overview · Candidates · ◉ Sourcing · Insights · Settings
```

The Sourcing tab carries a radar glyph. Insights has four sub-views —
**Tuning, Fairness, Funnel, Talent pool** — and Tuning is deliberately first
because *"they are where a recruiter changes the shape of the pool rather than
just reading it."*

A tab strip is the cheapest possible statement that a product has depth, and
the site has never shown one.

### 2.2 `JobPulseStrip` — the page's declared signature visual

`components/JobPulseStrip.tsx`. Four stat cards, exactly one featured:

```
Applicants 47   ·   ▸ In pipeline 12 ◂   ·   Interviewing 3   ·   Offer out 1
```

The source comment is worth quoting on the site nearly verbatim, because it is
a genuine insight and it is an argument for the product:

> "In pipeline" is featured, exactly one per strip. It is the honest headline:
> applicants is a lifetime total that only ever grows, so a job with 200
> applicants and nobody in play looks healthy right up until you read the
> second tile.

`byStage` is zero-filled across all seven canonical stages by the backend.

### 2.3 The job header

Three stacked rows:

- **Title row** — job title, a status badge, and conditionally a `View only`
  pill or an amber **`3 skills need review`** button.
- **Meta pills** — department, employment type, seniority (amber for SENIOR,
  violet for LEAD/PRINCIPAL), work mode.
- **Stats row** — location · experience · salary with an eye/cross glyph
  showing whether it is visible to candidates · **`47 applicants`** ·
  `Published 3w ago`.
- **Action zone** — a lifecycle primary button whose label changes with state
  (`Submit for approval` / `Approve` / `Publish` / `Mark in progress` /
  `Resume` / `Mark filled`), plus `Preview`, `Edit`, and an overflow menu
  carrying `Pause`, `Put on hold`, `Send back`, `Close`, `Delete`.

The lifecycle-aware primary button is a nice detail: the product knows what the
next legitimate action on a requisition is.

### 2.4 The candidate drawer is tabbed

`candidates/CandidateDetailDrawer.tsx`

```
Profile · ◉ Match · Interviews · Feedback · Activity
```

The last three are **absent, not disabled**, when there is no application to
act on — a small honest touch worth preserving in the composition.

- **Header** — avatar 40px radius 11, name, headline, close.
- **Meta row** — stage chip, origin chip, `ScoreRing` 34px, **`Full profile ↗`**.
- **Profile tab** — a definition list: Email, Source, Added, Applied. Then
  `Application status` with a stage advance control.
- **Interviews tab** — existing interviews with a status chip, then
  **`Schedule an interview`**: a `datetime-local` field, an optional meeting
  link, and a Schedule button. **Interview scheduling is live in the drawer.**
- **Feedback tab** — notes with a star rating and a date, then
  `Add feedback` with a `What stood out?` textarea.
- **Activity tab** — the application's event history.

Empty states, all quotable:

```
feedbackEmpty    "No feedback recorded yet."
interviewsEmpty  "No interviews scheduled yet."
activityEmpty    "Nothing has happened on this application yet."
noProfileTitle   "No profile on file"
noProfileBody    "This person was added to the job directly, so there is no
                  profile to score against it yet."
```

### 2.5 The candidates toolbar

Search by name or email · an origin segmented control (`All` / `Applied` /
`Sourced`) · a stage filter across the seven canonical stages · a `Move to…`
select per row · page size 25, or 100 in the Kanban view.

**There is a Kanban board view** (`JobKanbanTab.tsx`) alongside the list. Not
on the site anywhere.

### 2.6 Source channels

```
LINKEDIN · REFERRAL · JOB_BOARD · RESUME_UPLOAD · DIRECT_APPLICATION · OTHER
```

### 2.7 The assignment gate — a `/trust` addition

`GET /jobs/:id/candidates` calls `assertActiveAssignment()`, which exempts
`ORG_ADMIN` only. An unassigned recruiter, sourcer or interviewer gets a
**403, not a filtered view**. The UI handles it as a request, not an error:

```
"You're not on this job yet"
"Ask a hiring manager to add you to this role and its candidates will show up here."
```

This is a stronger access-control claim than "role-based permissions" and
`/trust` § 1 should carry it: *access to candidate data is per-requisition, not
per-role, and the product treats being locked out as a normal state rather than
a failure.*

### 2.8 The JD skill review — human in the loop

`components/JDSkillReviewDrawer.tsx`. When the parser extracts a skill it
cannot confidently map to the taxonomy, the job shows an amber
`N skills need review` button, and the drawer offers three actions per skill:
**use the suggested mapping**, **keep as new**, or **discard**. Each decision
applies immediately.

This is extremely on-brand and appears nowhere on the site. The parser does not
guess silently — it escalates.

### 2.9 Still genuinely unshipped

Unchanged from Phase 4: **in-platform messaging** (model, no controller) and
**calendar sync**. Interview *scheduling* is live (§ 2.4) — the current
`/product` roadmap card already says this correctly. Leave it alone.

---

## 3. Work stream A — the hero `★`

### 3.1 Diagnosis: it is a layout problem, not a content problem

The brief is that the hero preview has too little in it. That is correct, and
the reason is mechanical.

```
.split--lead  →  grid-template-columns: 1.05fr 1fr;      (base.css:206)
```

The visual column is ~48% of a container that caps near 1200px, so the frame is
about **560px wide**. A job workspace does not fit in 560px, and the CSS
already admits it:

```css
/* components.css:3386 */
.workspace__list .rank__row--tracked .pill--stage,
.workspace__list .rank__row--tracked .ring,
.workspace__list .rank__origin { display: none; }
```

Three of the five row tracks are switched off. The drawer is inset to 22%,
covering 78% of the frame. So the first thing every visitor sees is: **a strip
of six names, and one panel.**

Adding content to the composition without changing the layout will just push
more of it behind `display: none`. **The layout has to change first.**

### 3.2 The layout: asymmetric bleed

Three options were considered. Recommendation is B.

| | Approach | Composition width at 1440 | Above fold | Verdict |
|---|---|---|---|---|
| A | Stack — copy full width, workspace full width beneath | ~1200px | No | Best density, loses the one-screen answer |
| **B** | **Asymmetric bleed — copy 38%, workspace 62% + right gutter, bleeding to the viewport edge** | **~860px** | **Yes** | **Recommended** |
| C | Shrink type, stack inside 100vh | ~1200px | Tight | Costs the H1 its authority |

**B, in detail:**

```
┌─────────────────────────────────────────────────────────────── viewport ──┐
│   ┌──────────────────┐   ┌───────────────────────────────────────────────┐│
│   │ HIRING INTELLIG. │   │  ░░ app.transpahire.com / jobs / 1042  ░░░░░  ││
│   │                  │   │                                               ││
│   │ Every shortlist  │   │   the workspace, ~860px, bleeding right       ││
│   │ explains itself. │   │   past the container into the gutter          ││
│   │                  │   │                                               ││
│   │ lede, 3 lines    │   │                                               ││
│   │                  │   │                                               ││
│   │ [Book a demo]    │   │                                               ││
│   │ [See matching]   │   │                                               ││
│   │                  │   │                                               ││
│   │ logo slots       │   │                                               ││
│   └──────────────────┘   └───────────────────────────────────────────────┘│
│   └─ container ─────────────────────────────────────┘  └─ bleed ──────────┘│
└──────────────────────────────────────────────────────────────────────────┘
```

Implementation:

- The hero's inner grid stops being `.split--lead` and becomes a hero-specific
  `grid-template-columns: minmax(0, 38%) minmax(0, 1fr)`.
- `.hero__visual` gets `margin-right: calc((100vw - min(100vw, var(--container-max))) / -2 - var(--container-pad))` so it runs to the viewport edge. Confirm the
  container's own custom properties before writing this — reuse them, do not
  hardcode 1200.
- The frame's right corners lose their radius where it bleeds. That is the
  point: a panel cut off by the edge of the screen says *there is more of this
  than fits*, which is true and is the most useful thing a hero image can say.
- **The copy column narrows to about 42ch.** Check the H1 at 390 / 768 / 1024 /
  1440 — "Every shortlist explains itself." is short enough, but the lede will
  need re-breaking and may need a word trimmed. Do not let the copy column go
  below 38% to buy composition width; the headline is still the page's job.
- `@media (max-width: 1100px)`: stack. Copy full width, workspace full-bleed
  beneath at `100vw`, with `overflow-x: auto` **inside the frame body** so the
  page itself never scrolls sideways.

### 3.3 Retire `.float` on the hero

`CLAUDE.md` § 5 budgets two `.float` instances and the hero frame is one of
them. An 860px panel drifting vertically will read as a gimmick at that size
and costs paint on the largest element on the page. **Drop it**, and spend the
reclaimed budget nowhere — the density is doing the work now.

The other `.float` (the candidate frame in § 10) stays.

### 3.4 `jobWorkspace()` — the composition

Replaces `matchesWorkspace()`. Keep the old function until the new one is
verified, then delete it and its CSS in the same commit.

**Frame:** `--ratio: 16 / 11`, `frame--elevated`,
meta `app.transpahire.com / jobs / 1042`.

Seven layers. Every element below exists in the product — § 2 is the source
for all of it, and `docs/product-visualization.md` § 1 still forbids inventing
anything that is not there.

```
┌─ ░ app.transpahire.com / jobs / 1042 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┐
│                                                                            │
│  Senior Backend Engineer, Payments   [PUBLISHED]   [⚡ 3 skills need review]│  ①
│  (Engineering) (Full time) (SENIOR) (Hybrid)                               │  ②
│  ⌖ Bengaluru · ⌗ 5–8 yrs · ₹45–65L 👁 · ⌂ 47 applicants · Published 3w ago │  ③
│                                                                            │
│  ┌──────────┐ ┏━━━━━━━━━━━━┓ ┌──────────────┐ ┌───────────┐                │
│  │    47    │ ┃     12     ┃ │      3       │ │     1     │                │  ④
│  │APPLICANTS│ ┃ IN PIPELINE┃ │ INTERVIEWING │ │ OFFER OUT │                │
│  └──────────┘ ┗━━━━━━━━━━━━┛ └──────────────┘ └───────────┘                │
│                                                                            │
│  Overview │ ◉ Candidates │ ◈ Sourcing │ Insights │ Settings                 │  ⑤
│  ─────────────────────────────────────────────────────────────             │
│                                                                            │
│  ⌕ Search by name or email    [All│Applied│Sourced]   47 tracked   sort ▾   │  ⑥
│                                                                            │
│  ◐ Sneha Iyer            [Shortlisted•]  ⟨84⟩  Applied · 2d   Move to… ▾    │  ⑦
│    Backend engineer, payments                                              │
│  ─────────────────────────────────────┬────────────────────────────────────┐│
│  ◐ Arjun Rao             [Reviewed•]  │ ◐ Sneha Iyer                    ✕  ││
│    Platform engineer                  │   Backend engineer, payments       ││
│  ─────────────────────────────────────│ [Shortlisted] [Applied] ⟨84⟩       ││
│  ◐ Priya Menon           [Sourced•]   │                    Full profile ↗  ││
│    Distributed systems                │ ──────────────────────────────────  ││
│  ─────────────────────────────────────│ Profile │ ◉ Match │ Interviews │   ││  ⑧
│  ◐ Rahul Kumar           [Sourced•]   │ ──────────────────────────────────  ││
│    Senior backend                     │  ⟨84⟩  AI  HIGH                    ││
│  ─────────────────────────────────────│  Strong on distributed systems and ││
│  ◐ Neha Shah             [Reviewed•]  │  payments depth. Salary expectation││
│    Backend, fintech                   │  sits above the band.              ││
│  ─────────────────────────────────────│ ──────────────────────────────────  ││
│  ◐ Vikram Nair              —         │ HOW THE CONCEPTS CONNECT           ││
│    Not scored · missing critical      │ [exact][transferable][narrower]    ││
│                                       │ ──────────────────────────────────  ││
│                                       │ STRONG MATCHES                     ││
│                                       │ Kubernetes → Docker  ≈ partial     ││
│                                       │ …                                  ││
│                                       └────────────────────────────────────┘│
├────────────────────────────────────────────────────────────────────────────┤
│ Illustrative. Every person and company on this site is invented.           │
└────────────────────────────────────────────────────────────────────────────┘
```

**Layer notes.**

**① Title row.** The amber `3 skills need review` pill is the most valuable
single element you can add, because it is the parser escalating rather than
guessing (§ 2.8) and it is visible in the first two seconds. Do not drop it for
space.

**② Meta pills.** Four. SENIOR reads amber per the app's own tone map.

**③ Stats row.** Include the eye glyph on the salary — it means "visible to
candidates" and it is a real control. The `47 applicants` here and the
`47` in the pulse strip are the same number by design; that is how the app
reads.

**④ Pulse strip.** Exactly one featured tile, and it must be `In pipeline`,
not `Applicants`. Getting this backwards inverts the product's own argument.
Four tiles at 860px is comfortable; at the 1100px stack breakpoint they go
two-up.

**⑤ Tab strip.** Five tabs, Candidates active, Sourcing carrying its glyph.
This row is the cheapest depth signal available and it costs one line of
markup.

**⑥ Toolbar.** Real placeholder text. The origin segmented control is the one
interactive-looking element in the hero and it must **not** be wired — see
§ 3.5.

**⑦ The list.** All five tracks visible, no `display: none`. Rows 1 and 7 sit
clear of the drawer; rows 2–6 run under its left edge and are clipped by it,
which is what the real app looks like. **Row 7 is `criticalGate()`'s row** —
Vikram Nair, unscored, with the named missing critical. Putting the exclusion
in the hero is a strong move: the first screen shows both a ranking and a
refusal, and both explain themselves.

**⑧ The drawer.** Now **tabbed**, and inset to **42% rather than 22%** so the
list keeps five visible tracks. Header, meta row with `Full profile ↗`, five
tabs with Match active, then `explainPanel()` unchanged beneath. Interviews and
Feedback tabs present but inactive — they are real (§ 2.4) and their presence
is the claim.

### 3.5 What must not happen in the hero

`CLAUDE.md`'s hero rule — *above-the-fold content reveals immediately, and the
hero must not ask for work before it has earned any* — is unchanged and this
composition makes it easier to violate.

- **No interaction.** The origin control, the tabs, the search field, the
  `Move to…` selects and the drawer tabs are all inert. Render them as
  `<span>`/`<div>` with the right classes, not as `<button>` or `<select>`.
  A control that looks operable and is not is worse than a static image, and a
  real `<button>` in the hero is a focus stop that goes nowhere.
- **The switcher stays in § 06.** Do not add candidate switching here.
- **No count-up animation on the pulse tiles.** It is decoration, it
  communicates nothing, and § 5 of `CLAUDE.md` deletes animations that cannot
  say what they communicate.
- **One entrance, still P5.** No new primitive. See § 3.7.
- **Accessibility.** The whole composition is decorative-with-content: it needs
  one `sr-only` `<h2>` (already there) and one `sr-only` paragraph summarising
  what the workspace shows, then `aria-hidden="true"` on the chrome-only
  layers (pulse tiles, tab strip, toolbar) so a screen reader gets the list and
  the panel rather than forty label fragments. The rows already carry
  `data-row-sr` summaries — keep them.

### 3.6 The one-screen constraint

At 1440 × 900 the current hero has ~200px of top padding
(`clamp(7.5rem, 16vw, 12.5rem)`), which will push an `16/11` frame below the
fold.

**Required changes:**

- Hero top padding → `clamp(5.5rem, 9vw, 7rem)`.
- Hero bottom padding → `clamp(4rem, 8vw, 6rem)`.
- Verify: at 1440 × 900, the frame chrome, the job header, the pulse strip, the
  tab strip and at least three candidate rows are visible without scrolling.
  That is the acceptance test. If it fails, drop the ratio to `16/10` before
  you drop a layer.
- At 1280 × 800 — the most common laptop — the same test with two rows.

Add both to `tools/audit.mjs` as viewport checks if the tooling supports it;
otherwise record them in the acceptance list and check by eye.

### 3.7 Motion

**No new primitive.** P5 (drawer reveal) already exists, is capped at one per
page, and is exactly right for this. The sequence:

```
   0ms   the frame, the job header, the pulse strip, the tabs and the list
         are all present — this is above-the-fold content and it does not wait
 240ms   the drawer translates in from the right, --dur-medium, --ease-entrance
 240ms   the list pane drops to 60% opacity behind it
```

Reduced motion: everything present and static, list at full opacity, drawer at
full opacity in place. Verify on `motion-lab.html` — the P5 lab entry needs
updating for the new inset and the tabbed drawer, not replacing.

### 3.8 Data to add

`assets/data/product-demo.js`. Additive only.

```js
/* § 2.2 — the app's own signature visual. Exactly one tile is featured, and it
   is IN PIPELINE, not APPLICANTS: applicants is a lifetime total that only ever
   grows, so a job with 200 of them and nobody in play looks healthy right up
   until you read the second tile. Inverting this inverts the argument. */
export const JOB_PULSE = [
  { key: 'applicants',   label: 'Applicants',   value: 47, featured: false },
  { key: 'inPipeline',   label: 'In pipeline',  value: 12, featured: true  },
  { key: 'interviewing', label: 'Interviewing', value: 3,  featured: false },
  { key: 'offerOut',     label: 'Offer out',    value: 1,  featured: false },
];

export const JOB_TABS = [
  { label: 'Overview',   active: false },
  { label: 'Candidates', active: true  },
  { label: 'Sourcing',   active: false, glyph: 'radar' },
  { label: 'Insights',   active: false },
  { label: 'Settings',   active: false },
];

/* Absent, not disabled, when there is no application — § 2.4. All five are
   present here because Sneha applied. */
export const DRAWER_TABS = [
  { label: 'Profile',    active: false },
  { label: 'Match',      active: true  },
  { label: 'Interviews', active: false },
  { label: 'Feedback',   active: false },
  { label: 'Activity',   active: false },
];

export const JOB_TOOLBAR = {
  search: 'Search by name or email',
  origins: ['All', 'Applied', 'Sourced'],
  activeOrigin: 'All',
  count: '47 tracked',
  sort: 'match score',
  move: 'Move to…',
};

export const SKILL_REVIEW = {
  count: 3,
  label: (n) => `${n} skill${n === 1 ? '' : 's'} need review`,
  /* § 2.8 — the three actions the drawer offers per unmapped skill. */
  actions: ['Use the suggested mapping', 'Keep as new', 'Discard'],
};

export const SOURCE_CHANNELS = [
  'LinkedIn', 'Referral', 'Job board', 'Résumé upload', 'Direct application', 'Other',
];

/* § 2.4 — quotable, and each one is the product declining to pad an empty
   state with encouragement. */
export const EMPTY_STATES = {
  feedback:   'No feedback recorded yet.',
  interviews: 'No interviews scheduled yet.',
  activity:   'Nothing has happened on this application yet.',
  noProfile:  'This person was added to the job directly, so there is no profile to score against it yet.',
  notAssigned: 'Ask a hiring manager to add you to this role and its candidates will show up here.',
};
```

Extend `JOB` with `publishedAgo: '3w ago'`, `salaryVisible: true`, and
`seniorityTone: 'amber'`.

### 3.9 Sub-components to build

| Function | Layer | Notes |
|---|---|---|
| `jobHeader()` | ① ② ③ | Title row, meta pills, stats row. Reused on `/product/hiring-operations`. |
| `pulseStrip()` | ④ | One featured tile enforced by the data, not the caller. |
| `tabStrip({ tabs })` | ⑤ ⑧ | Inert. Serves both the job tabs and the drawer tabs. |
| `listToolbar()` | ⑥ | Inert. |
| `drawerHead({ candidateId })` | ⑧ | Avatar, name, headline, meta row, `Full profile ↗`. |
| `jobWorkspace()` | all | Assembles the above plus `rankedList()` and `explainPanel()`. |

**`rankedList()` changes:** the `tracked` variant gains a `move` option
rendering the inert `Move to…` affordance, and a `gateRow` option appending
`criticalGate()`'s row inside the same list. Delete the three `display: none`
rules at `components.css:3386` — they are the bug.

### 3.10 Copy the hero can now earn

Two lines the composition makes available. Both are true, both are the
product's own reasoning, and neither is currently anywhere on the site.

**For § 09 (hiring operations) or `/product/hiring-operations`:**

> Applicants is a number that only goes up. A job with two hundred applicants
> and nobody in play looks healthy right until you read the second tile, so the
> one we make big is the one that can go down.

**For `/product/candidate-intelligence`, in the extraction section:**

> When the parser meets a skill it cannot place in the taxonomy, it does not
> guess and it does not drop it. The job carries an amber flag until a person
> decides: map it to the skill we think it is, keep it as a new one, or discard
> it. Three of the skills on this requisition are waiting on that call.

### 3.11 Acceptance for stream A

- 1440 × 900: frame, job header, pulse strip, tab strip, ≥3 rows above the fold.
- 1280 × 800: same, ≥2 rows.
- 390px: stacked, workspace full-bleed, horizontal scroll inside the frame body
  only — `document.body` must not scroll sideways. The audit already checks
  this; make sure it still passes.
- No `<button>`, `<select>` or `<a>` inside the hero composition except the
  existing hero CTAs.
- Zero `display: none` on a row track.
- `node tools/check.mjs` passes, including the P5 cap of one.
- Reduced motion verified on `/` and on `motion-lab.html`.
- `docs/components.md` updated with a `models:` line per new sub-component.

---

## 4. Work stream B — give a visitor something to do `★`

This is the stream most likely to change your pipeline, and it is the one
Phase 4 under-ranked.

Today: twenty-one pages, one conversion action, threshold = *book a call with a
stranger and bring your hardest open requisition.* That is a good offer for
someone already convinced and no offer at all for anyone else. There is no
email field on the site.

### 4.1 `/tools/jd-check` — paste a job description `[P1]`

The single best qualified-lead generator available to you, because it is the
product doing its actual job on the visitor's own data in about twenty seconds.

**What it returns** — all four of these are shipped services:

1. **Tier extraction** — the skills, sorted into critical / required /
   preferred / bonus, with the four importance tones.
2. **Optimizer flags** — too many criticals, a near-impossible combination, no
   soft-skill tier.
3. **Structural fairness** — the language flags. Telling a stranger that the
   word *rockstar* in their JD is costing them applications is a memorable
   twenty seconds.
4. **Unmapped skills** — the § 2.8 escalation. "Two of these we could not place
   in the taxonomy; in the product a person decides what happens to them."

**What it must not return:** a pool size, a candidate count, a score
distribution, or any figure implying you have a database of candidates matching
their role. That would be the one invention this whole site has avoided.

**Delivery decision** `[CONFIRM]`:

- **Synchronous** is much better: paste, submit, see the report. Needs a public
  unauthenticated endpoint with rate limiting and a size cap. Ask for the email
  *after* the report renders, to save or share it — never before.
- **Asynchronous** is the fallback if a public endpoint is not acceptable:
  paste the JD and an email, get the report back within the hour. Still
  captures the email, still delivers real product output, converts worse.

Ship whichever is available. Do not ship neither.

**Honesty requirements:** label the report as generated by the same services
the product runs, name the JD as the visitor's own, and store nothing beyond
what the email opt-in covers. The privacy policy (§ 5.2 of Phase 4) needs one
paragraph about this tool before it goes live — a page that accepts a document
is a processing activity.

### 4.2 `/tools/resume-check` — the candidate twin `[P1]`

The marketplace argument. You have a matching engine; a matching engine with no
candidates is a demo, and `/demo` says so in its own copy. The site currently
has one candidate-facing page and asks for a signup while offering nothing
first.

Upload or paste a résumé → the quality score, the named suggestions, and the
skills that would open more roles. No signup to see the result. Signup offered
after, to keep it.

Same honesty requirements. Same privacy paragraph. Add: the file is processed
and not retained unless the visitor creates a profile, and say so on the page
rather than only in the policy.

### 4.3 Email capture that is not a demo request `[P1]`

One field, one honest promise, in two places: the footer, and the top of
`/changelog`.

> **Told when something ships.**
> One email when there is something to say. Not a newsletter, no drip
> sequence, and you can leave from any of them.

Then keep that promise. A changelog you already maintain plus a list you email
four times a year is the lowest-effort credibility instrument available to a
one-person company, and it is the only mechanism on the site for a visitor who
is interested but not ready.

`[CONFIRM]` where the list lives, and whether a double opt-in is required in
the markets you sell into.

### 4.4 Rework `/demo` around a lower step

`/demo` stays the high-intent destination, but it should no longer be the only
one. Add, above the form:

> **Not ready for a call?** Run a job description through the same checks the
> product runs — no account, nothing stored. → `/tools/jd-check`

And in the nav: a `Tools` entry, or fold both tools under Product. Recommend a
top-level `Tools` item, because someone arriving to try something is not
browsing a product menu.

---

## 5. Work stream C — proof without a customer

You cannot publish a testimonial, a customer name or an outcome metric. You
*can* publish evidence the product generated.

### 5.1 `/proof` — three real job descriptions, run

Take three genuinely-posted job descriptions for senior engineering roles.
Run each through the live services. Publish what came out, unedited:

- the tier extraction, with the skills the parser could not place
- the optimizer's findings
- the structural-fairness language flags
- the unmapped-skill escalations

Then one paragraph per JD on what the output says about the requisition.

**This is the highest-conviction content the site can carry that does not
require a customer**, and it is a day's work plus a page.

**Anonymise the companies.** `[CONFIRM]`, but the recommendation is firm:
quoting a public posting for commentary is normally fine, and publicly telling a
named company that their JD contains age-coded language is a different act
with a predictable consequence. *"A real posting from a company you have heard
of"* carries the same weight and starts no fights. Keep the JD text; drop the
name and any identifying product detail.

### 5.2 The screenshot

Still outstanding, still the highest-value single asset on the site, and Phase 4
listed it as blocked on you — which was wrong. You own the app. Fifteen minutes.

Six `screenshotSlot()` instances remain. The two that matter:

1. `/product` — the matches screen at full density, in the hero position.
2. `/product/candidate-intelligence` — the extraction review screen, which is
   the page's central claim and currently an empty rectangle.

Once § 3 lands, `jobWorkspace()` is good enough that the `/product` slot could
arguably be dropped rather than filled. A real screenshot is still better.

---

## 6. Work stream E — open indexing `★`

The site has been invisible for the whole of Phase 4. This is the highest-value
stream in Phase 5 and most of it is not code.

`robots.txt` and `docs/content-integrity.md` § 5 name five blockers. Drive them
to done:

| Blocker | Owner | What "done" means |
|---|---|---|
| Four unsigned legal drafts | counsel | Signed, dated, `[COUNSEL]` markers gone, `data-content="provisional"` removed |
| `/about` unattributed | you | Name, contact, and the optional founder paragraph — the copy is already written and waiting on § 6.3 of Phase 4 |
| Demo form has no destination | you | An endpoint and a person who reads it |
| One screenshot | you | § 5.2 |
| Registered company details | you | Footer, and Privacy § 1 |

### 6.1 The switch

Both on the same day, per `robots.txt`'s own instructions:

1. Delete `Disallow: /` from `robots.txt`.
2. `noindex, nofollow` → `index, follow` in `src/lib/layout.mjs`, and rebuild so
   all pages change together.
3. **Invert the `tools/check.mjs` assertion deliberately.** It currently asserts
   the noindex tag is present on every page. Change it to assert the opposite,
   with a comment recording the date and the reason. Do not delete the check —
   a dropped assertion is how a site silently half-opens.
4. Keep `Disallow: /motion-lab.html`.

### 6.2 Then, and only then

Add the sitemap to Search Console, and check that all twenty-one pages have a
unique `<title>` and `description`. Phase 4 wrote them; verify none collide.

### 6.3 Pages that become worth building

These were correctly deferred while the site was invisible. Once § 6.1 lands:

| Page | Why now |
|---|---|
| `/integrations` | Question three in every evaluation, currently unanswered anywhere. "None yet — here is the API, here is what an export contains, here is the roadmap position." Refusing to have the page is not an answer. |
| `/vs/applicant-tracking-systems` · `/vs/job-boards` | The category claims are already written and were cut from `/product/matching` as a holed table. Two pages, highest-intent search terms in the category. Category-level only — no named competitor. |
| `/companies` | Explains the public org profiles and verified reviews you already ship, and each org page is indexable surface of its own. |

`/careers` stays cut. One person, no roles, and a careers page for a
one-person company is a joke a prospect will make on the call.

---

## 7. Sequencing

| Order | Work | Effort | Note |
|---|---|---|---|
| 0 | § 6 blockers — start chasing on day one | calls | Gates everything's value; runs in parallel |
| 1 | § 3.2–3.3 hero layout: bleed, padding, drop `.float` | 1 day | Must land before any composition work |
| 2 | § 3.8 data, § 3.9 sub-components | 1 day | |
| 3 | § 3.4 `jobWorkspace()`, § 3.6 one-screen pass | 2 days | The headline deliverable |
| 4 | § 3.7 P5 lab update, § 3.11 acceptance | ½ day | |
| 5 | § 4.3 email capture | ½ day | Smallest thing here with the largest ratio |
| 6 | § 4.1 `/tools/jd-check` | 3 days | Blocked on the endpoint decision |
| 7 | § 5.1 `/proof` | 1 day | |
| 8 | § 5.2 screenshots | 1 hour | Do it while waiting on anything else |
| 9 | § 4.2 `/tools/resume-check` | 2 days | |
| 10 | § 6.1 the switch | 1 hour | The day the last blocker clears |
| 11 | § 6.3 three pages | 3 days | After the switch, not before |
| 12 | § 3.10 copy additions | ½ day | |

**Do not** start stream D (§ 6.3) before the switch. Three more pages nobody
can find is three more pages to maintain.

---

## 8. Governance

Same discipline as Phase 4 § 8 — the docs land in the same commit as the code.

- **`docs/phase-4.md` § 1** gains a pointer to `docs/phase-5.md` § 2 as its
  delta. Do not copy the delta in; one fact, one home.
- **`docs/product-visualization.md`** — record the § 3.1 finding as a rule:
  **a composition's width is a design input, not a consequence. If a layout
  forces `display: none` on a row track, the layout is wrong.** That is the
  bug this whole stream exists to fix and it will recur otherwise.
- **`docs/motion-system.md`** — update P5's entry for the new inset and the
  tabbed drawer.
- **`docs/components.md`** — an entry per § 3.9 sub-component, each with its
  `models:` line.
- **`docs/content-integrity.md`** — § 2's items promoted with `docs/phase-5.md`
  § 2 as the source, and the "last reconciled" date bumped.
- **`tools/check.mjs`** — add: no `<button>`, `<select>` or `<a>` inside
  `.workspace`; and the inverted robots assertion when § 6.1 lands.
- **`CLAUDE.md`** — Phase status → Phase 5. Add to § 5, under the hero rule:
  *"the hero may be dense; it may not be interactive."*

---

## 9. Blocked on you

| Item | Blocks |
|---|---|
| Public JD-check endpoint: allowed, or async fallback | § 4.1, the largest item in stream B |
| Where the email list lives | § 4.3 |
| ~~Your name, contact~~, founder paragraph's wording — 28 Sep 2026: named, no contact by decision, paragraph drafted | `/about`, and therefore § 6.1 |
| Registered company name, number, address | Privacy § 1, footer, § 6.1 |
| A demo form endpoint and a reader | § 6.1 |
| Counsel sign-off on four drafts | § 6.1 |
| Three JDs for `/proof`, and the naming decision | § 5.1 |
| Two screenshots | § 5.2 |

Six of the eight gate § 6.1. Until that lands, Phase 5's other streams are
improvements to a site with no audience — which is worth doing, and is worth
less than opening it.

---

## 10. The shape of this phase

Phase 4 made the site true. Phase 5 makes it *arrive*: a first screen that
looks like the application it is selling, something a visitor can do before
they are ready to talk, evidence that does not need a customer, and an open
front door.

The hero is the item to get right, and the reason is narrow. A visitor decides
whether this is a serious product in about four seconds, and they decide it
from the picture. The product has five job tabs, a tabbed candidate drawer, a
pulse strip it calls its own signature, an agent console and a parser that
escalates rather than guesses. Showing six names and one panel was never a
judgement about restraint — it was a column that was 560 pixels wide.

---

## 11. What was built — execution record

Added at the end of the phase. This section records the outcome and every
deviation, because a plan that is only ever read forwards teaches nothing about
where plans go wrong.

### 11.1 Done

| § | Work | Notes |
|---|---|---|
| 3.2 · 3.3 · 3.6 | The bleed hero, the padding, the one-screen constraint | `.hero__inner--bleed`, 38% copy / bleeding composition. Frame ≈ 800px at 1440, up from ≈ 560. |
| 3.4 | `jobWorkspace()` | All seven layers. `matchesWorkspace()` deleted, and the three `display: none` rules with it. |
| 3.8 | The data | `JOB_PULSE`, `JOB_TABS`, `INSIGHTS_VIEWS`, `DRAWER_TABS`, `JOB_TOOLBAR`, `SKILL_REVIEW`, `SOURCE_CHANNELS`, `EMPTY_STATES`, `JOB_ACTIONS`; `JOB` extended. Additive only. |
| 3.9 | Six sub-components | `jobHeader()`, `pulseStrip()`, `tabStrip()`, `listToolbar()`, `drawerHead()`, `jobWorkspace()`, plus `rankedList()`'s `move` and `gateRow` options and `explainPanel()`'s `showIdent`. |
| 3.7 | P5 | Updated on the lab page for the 42% inset and the tabbed drawer. **Not one declaration in `motion.css` changed.** |
| 3.10 | Both copy additions | The pulse-strip paragraph on `/product/hiring-operations`, the escalation paragraph on `/product/candidate-intelligence`. |
| 2.7 | The assignment gate | `/trust` § 1, with the empty state quoted. |
| 4.3 | Email capture | Footer on every page, and the top of `/changelog`. Unwired, and says so. |
| 4.4 | `/demo`'s lower step, and the nav | `.lowstep` above the form; `Tools` as a fifth top-level nav item. |
| 4.1 · 4.2 | Both tool pages | Built and shipped saying the endpoint is not switched on. **Routed at `/check/job-description/` and `/check/resume/`** — see deviation 10. |
| 3.9 | `jobPulseComposition()` | `jobHeader()`'s promised second home, full container width on `/product/hiring-operations`. |
| — | `tools/audit.mjs` | Two new sections: the one-screen hero measurement at 1440×900 and 1280×800, and an assertion that nothing inside `.workspace` is operable. |
| 8 | Governance | `CLAUDE.md`, `README.md`, `robots.txt`, and five docs, in the same commit as the code. |

### 11.2 Deviations, with reasons

1. **§ 3.3 asked for `.float` to be retired from the hero. It was never on it.**
   Phase 4 built `matchesWorkspace()` with `frame--elevated` alone; the only
   `.float` on the homepage is the candidate frame in § 10. The budget comment in
   `home.mjs` said 2 and was wrong. It now says 1. Nothing was removed.

2. **The composition is ≈ 800px, not 860.** Reusing the real container tokens
   (`--container: 1280px`, `--page-pad`) with a 38% copy floor and the site's
   `--gap-wide` yields ≈ 800 at 1440. § 3.2 said not to go below 38% to buy
   composition width, so 800 it is. It is 43% wider than what it replaced and
   every acceptance test passes at it.

3. **The hero H1 is capped at 60px in the bleed column**, below the global
   `--fs-display` of 84px. At 38% of 1280 the copy measure is ≈ 440px, and 84px
   type there puts five characters on a line — which is not authority, it is a
   broken measure. § 3.2 anticipated the lede needing a trim; the H1 needed the
   same treatment and got it. The lede went from five sentences to three.

4. **The columns are top-aligned, not centred**, and this was a defect found by
   opening the page rather than a preference. `.split--lead` centres, which was
   right when the visual was shorter than the copy; with the composition taller,
   centring pushed the H1 and the lede below the fold. The first screen was a
   screenshot with no sentence attached to it.

5. **The drawer is a crop, and the crop lands after the summary.** § 3.4's sketch
   shows the relationship chips and a strong-match card in the drawer as well.
   They do not fit: with the selected row clear above and the gate's row clear
   below, the drawer is ≈ 300px. What survives is the verdict and the two
   sentences — the score with its confidence, and why, including the part working
   against the candidate. The rest is read at full size in § 06 and on
   `/product/matching`, and the fade says the panel continues, which it does.

6. **The pulse tiles go two-up at 560px, not at the 1100px stack breakpoint.**
   § 3.4 assumed the frame narrows when the hero stacks. It widens — from ≈ 800px
   in the bleed column to the full viewport — so four tiles are *more* comfortable
   there, not less.

7. **At ≤ 700px the list scrolls horizontally rather than dropping tracks**, and
   the generic tracked-row rule that hides the stage chip and origin below
   `--bp-md` is explicitly overridden inside `.workspace`. That rule is right on
   `/product/hiring-operations`, where the row is in normal page flow with nothing
   to scroll inside. It is wrong here, for the reason the whole stream exists.

8. **Below `--bp-xl` the drawer stacks beneath the list instead of the list being
   hidden.** Phase 4 hid the list at 700px. The list is now the denser of the two
   panes, and an overlay at 768px leaves it ≈ 320px — which is where
   `display: none` starts looking tempting again.

9. **The gate row's person is Aditya Nair, not § 3.4's "Vikram Nair".** Carried
   forward from Phase 4 and still right: there is already a Vikram among the
   scored candidates, and two Vikrams one of whom was scored and one of whom was
   not teaches the reader the opposite of the point.

10. **The tool pages live at `/check/job-description/` and `/check/resume/`, not
    under `/tools/`** — and this one is a defect the plan could not have seen.
    `/tools/` collides with the repo's own `tools/` authoring directory: the build
    writes `<route>/index.html` relative to the root, so the first build put two
    generated pages *inside* `tools/`, next to `build.mjs`.

    That is not merely untidy. `tools/` is the one directory a real deployment
    would exclude — it serves `build.mjs`, `check.mjs` and `audit.mjs` — and
    excluding it would have dropped both pages from the deployed site **with no
    error anywhere**. A silent half-deploy, which is the same failure mode
    `robots.txt` warns about for indexing.

    Renaming the authoring directory was the alternative and it was rejected: it
    is referenced in `CLAUDE.md` § 6's canonical build loop, in `README.md`, in
    `docs/architecture.md` and in muscle memory, whereas § 4.4's actual argument
    is about the NAV LABEL — "somebody who arrives to try something is not
    browsing a product menu" — and the label is still `Tools`. The URL string was
    the cheaper half to move.

11. **`Tools` is a fifth top-level nav item**, against `04 § 2`'s four-item
    maximum. § 4.4 recommended it and the argument holds: these two pages are the
    only thing on the site a visitor can *do*, and folding them under Product
    files the low-threshold action behind the high-threshold one. Recorded in
    `layout.mjs` at the site of the break, with a note that if a sixth item is
    ever proposed, this is the one to fold.

### 11.3 Two bugs worth recording, because neither check could see them

Both were found by opening the page, which is what `CLAUDE.md` § 6 step 6 is for.

- **The frame grew to ≈ 1250px.** The drawer was a grid sibling of the list, so
  its own content — a panel far taller than seven rows — sized the row. `--ratio`
  is only a reserved minimum for composed HTML, so the frame simply grew, and the
  copy column and the gate row went off the screen. Fixed by giving the two panes
  a shared positioning context (`.workspace__panes`) so the drawer's extent is
  derived from the list.

- **The five drawer tabs rendered as an empty 1px rule.** `.tabstrip` has
  `overflow-x: auto`, and CSS computes `overflow-y: visible` to `auto` when the
  other axis is not visible — so the strip is a scroll container, its min-content
  height is **zero**, and the drawer's grid (definite height, auto rows) squeezed
  it to its border. Fixed by making the drawer a flex column with `flex: none`
  children.

`tools/audit.mjs` now measures the one-screen constraint at 1440×900 and
1280×800, and asserts nothing in `.workspace` is operable, so neither class of
defect depends on somebody remembering to look.

### 11.4 Not built, and why

| § | Item | Why not |
|---|---|---|
| 5.1 | `/proof` | Its entire content is three real job descriptions run through the live services. A `/proof` page carrying invented parser output would be the one invention this site has avoided. Not scaffolded, not stubbed. **Needs the three JDs and the naming decision** — the recommendation in § 5.1 is firm: anonymise. |
| 5.2 | The two screenshots | Needs the running app. Six `screenshotSlot()` instances remain. § 5.2 is right that this is not blocked on anyone outside the project. |
| 6.1 | The indexing switch | Six named blockers, listed in `robots.txt` with owners. Phase 5 added one: the two tool pages accept a document, which is a processing activity the privacy policy does not yet name. |
| 6.3 | `/integrations`, `/vs/*`, `/companies` | § 7 is explicit — **not before the switch.** Three more pages nobody can find is three more pages to maintain. |
| 4.1 · 4.2 | The tools' actual endpoints | Blocked on the public-endpoint decision. The pages ship with the gap visible, which is the site's established pattern for exactly this: `/demo`'s form has been unwired and honest about it since Phase 4. |
