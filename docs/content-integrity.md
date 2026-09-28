# Content integrity

The template this site grew from contained product claims that were written to
demonstrate a layout. **They were not product truth.** This document is the
classification system, the current inventory, and the gate that must be cleared
before the site can be indexed.

> **Last reconciled against the product source: 31 August 2026** (Phase 5,
> against the job-detail surface — `docs/phase-5.md` § 2).
> An inventory with no date is an inventory nobody knows to distrust. When you
> touch this file, move that date and say what you checked against.

**PHASE 5 ADDED ONE DELTA AND CORRECTED NOTHING.** `docs/phase-5.md` § 2 was read
out of the product source on the same date, on a surface Phase 4 had not looked
at closely: the job detail page. Nine things came out of it and all nine are
AUTHORITATIVE — they are enums, labels, layouts and one API assertion, not
narratives. They are promoted in § 2 below with `docs/phase-5.md` § 2 as the
source, and the fact sheet stays where it is: `docs/phase-4.md` § 1, now pointing
at § 2 of the Phase 5 document as its delta. One fact, one home.

**Updated at the end of Phase 4**, and the update was a correction rather than an
addition. Phase 3 reconciled this inventory against a *planning document*; Phase 4
reconciled it against the *schema and the shipped front end*, and found the
inventory wrong in both directions:

- **Nine claims were factually wrong**, the worst being "five dimensions" (four
  are weighted; salary is a ±10% modifier) and "it does not import a person who
  did not ask to be there" (the default import path does exactly that).
- **Sixteen shipped capabilities were classified PLACEHOLDER, filed as "coming
  soon", or absent.** Notifications and interview scheduling were on a roadmap
  while both were live.

The second list is the one worth dwelling on. **Under-claiming a shipped feature
is a defect, not a safe default.** A prohibition list protects you from
over-claiming and does nothing at all about the opposite failure, and the
opposite failure told every buyer the product was less finished than it is.

The working rule that follows is in § 7, and it is the whole lesson of Phase 4:
point the classification at the schema, not at the plan.

---

## 1. Classification

| | Meaning | May publish? |
|---|---|---|
| **AUTHORITATIVE** | Confirmed by Transpahire documentation or by the brand system | Yes |
| **PROVISIONAL** | On the page now; describes a confirmed capability in unconfirmed wording | Not as fact |
| **PLACEHOLDER** | Exists only to demonstrate layout | **No** |

Sections carry their classification in the markup:

```html
<section class="section" id="the-pool" data-content="provisional">
```

```bash
grep -rn 'data-content=' index.html product for-teams for-candidates demo about legal
```

Absence of the attribute means AUTHORITATIVE.

**One thing changed about what PROVISIONAL means.** Before the Overview it meant
*we do not know whether the product does this*. It now almost always means *the
product does this, and we are not certain these are the product's own words for
it*. The distinction matters because the fix is different: the first needs a
capability confirmation, the second needs a screenshot of a real screen.

### Never invent

customers · metrics · testimonials · case studies · integrations ·
certifications · compliance claims · partnerships · AI capabilities · model
details · pricing · security guarantees · SLAs · headcount · funding ·
**skill-graph edges**

If a number, a name or a capability cannot be traced to a source, it does not
go on the page. "It sounds plausible" is how a marketing site becomes a legal
problem.

Skill-graph edges joined that list in Phase 3, and they are worth calling out
because they are the one case where a fabrication would look like craft rather
than like marketing. Three edges are confirmed — TypeScript↔JavaScript,
Docker→Kubernetes, React→Vue. A fourth plausible-looking edge in the section 07
diagram would be an invented product capability, presented as a mechanism, in the
one composition whose entire job is to be a mechanism. See § 6.

---

## 2. Current inventory

### AUTHORITATIVE

**Brand.** Sourced from the Transpahire Brand System and `assets/brand/brand.json`.

| Item | Source |
|---|---|
| Company name, Transpahire, Inc. | Brand System |
| Sector: AI recruitment platform, SaaS | Brand System |
| Stratum mark, lockups, favicons, app icons | `assets/brand/` |
| Palette, type stack, tracking specifications | `brand.json` |
| Tagline "Hiring intelligence for teams that care about quality" | Brand voice |
| Positioning paragraph, **with "enterprise" dropped** | Brand System, corrected against the Overview's own positioning — it presents the product as lighter than enterprise ATS tools and targets teams hiring 50–500 a year, so "enterprise talent teams" contradicted it. Now on `/product` and `/about` as "talent teams" |

**Product capability.** Confirmed against the product source on 31 August 2026,
and recorded in `docs/phase-4.md` § 1. Everything in this table is safe to
publish.

**Promoted in Phase 5** — source `docs/phase-5.md` § 2, read out of the product
source on 31 August 2026. All AUTHORITATIVE:

| Capability | Source | Where it is claimed |
|---|---|---|
| Five job-detail tabs — Overview · Candidates · ◉ Sourcing · Insights · Settings | § 2.1 | `jobWorkspace()` on `/`, `jobPulseComposition()` on `/product/hiring-operations` |
| Insights has four sub-views: Tuning, Fairness, Funnel, Talent pool — Tuning first | § 2.1 | named in copy, not drawn |
| `JobPulseStrip` — four stat cards, exactly one featured, and it is `In pipeline` | § 2.2 | `pulseStrip()`; the reasoning is quoted on `/product/hiring-operations` |
| The job header's three rows, including the amber `N skills need review` flag | § 2.3 | `jobHeader()` |
| Salary visibility is a control on the requisition, shown with an eye glyph | § 2.3 | `jobHeader()` |
| The lifecycle-aware primary action, six labels | § 2.3 | `JOB_ACTIONS`, named in data; not yet drawn |
| The candidate drawer is tabbed, five tabs, last three **absent not disabled** | § 2.4 | `drawerHead()` + `tabStrip()` |
| Interview scheduling is live **in the drawer** — datetime, meeting link, Schedule | § 2.4 | already claimed correctly on `/product/hiring-operations`; unchanged |
| The four empty-state strings | § 2.4 | `EMPTY_STATES`; `notAssigned` is quoted on `/trust` |
| The candidates toolbar — search, origin control, stage filter, `Move to…` | § 2.5 | `listToolbar()`, `rankedList({ move: true })` |
| A Kanban board view exists alongside the list | § 2.5 | **not yet on the site** — see § 5 |
| Six source channels | § 2.6 | `SOURCE_CHANNELS`; not yet drawn |
| **The assignment gate** — `GET /jobs/:id/candidates` asserts an active assignment, exempting `ORG_ADMIN` only; an unassigned recruiter gets a 403, not a filtered view | § 2.7 | `/trust` § 1, with the empty state quoted |
| The JD skill review — three actions per unmapped skill, applied immediately | § 2.8 | `SKILL_REVIEW`; the flag in `jobHeader()`, the paragraph on `/product/candidate-intelligence`, the actions on `/check/job-description` |
| The JD optimizer's three shape findings | `docs/phase-5.md` § 4.1 | `OPTIMIZER`, on `/check/job-description` |

**Both of the last two gaps shipped — 28 Sep 2026, on the maintainer's word:**
in-platform messaging and calendar sync. Both are in `SHIPPED`, and the site
has no roadmap. See `docs/phase-4.md` § 1.3 for what still needs a source read.

| Capability | Where it is claimed |
|---|---|
| Match score 0–100 on every candidate-job pair | § 01, 05, 06, 08, 10; six product pages |
| **Four weighted dimensions — skill coverage 65%, semantic similarity 25%, experience curve 7%, location & work mode 3%** | § 01, 06; `/product/matching`, `/legal/privacy` |
| **Three modifiers applied after the weighted score — salary ±10%, skill rarity ×, seniority ×** | `/product/matching`, `/legal/privacy` |
| **The critical gate — a candidate missing a critical skill is dropped before scoring, and the requirement is recorded** | § 05; `/product/matching`, `/product/analytics` |
| **Published classification thresholds — Strong ≥ 72, Good ≥ 52, Potential ≥ 32, Possible below** | § 05, 06; `/product/matching`, `/legal/privacy` |
| **Per-skill coverage bands — Strong ≥ 75%, Moderate 40–74%, Weak < 40%, Missing 0** | `/product/matching` |
| **Concept-level explanation: every requirement matched to a phrase in the profile, with the relationship named and the profile section cited** | § 06; `/product/matching` |
| **`✓ verified` — verified against the candidate's own words** | § 06; `/product/matching` |
| **Explanation confidence — high / medium / low** | § 06; `/product/matching` |
| **Nine skill relationship types, each weighted, some bidirectional** | § 07; `/product/matching`, `/product` |
| **Five job-title relationship types, on a second graph** | § 07; `/product/matching` |
| **A versioned skill ontology** | `/product/matching`, `/trust` |
| Hidden-talent detection | § 07; `/product/sourcing` |
| ESCO and O*NET alignment | § 07 caption, `/product/matching` |
| Four-tier skill importance — critical / required / preferred / bonus, **with the product's own tones** | § 04, 08; four pages |
| Per-skill importance tuning with instant re-rank | § 08; three pages |
| What-if simulation | § 08; three pages |
| Structured search **and** semantic search in one interface | § 04; `/product/sourcing` |
| **Quoted profile evidence on a search result** | `/product/sourcing`, `/product/matching` |
| **Saved searches, with their own audit history** | `/product/sourcing`, `/for-teams` |
| **Talent pools, an import wizard and import history** | `/product/sourcing`, `/for-teams` |
| **Recruiter outreach with interest tracking** | `/product/sourcing` |
| Similar-candidate discovery | `/product/sourcing` |
| **Always-On Sourcing: a mission per role with a target band, a run ledger, fingerprinted strategies that cannot repeat, visible refusals, and a terminal state that recommends what to relax with a measured impact** | `/product/sourcing`, `/product` |
| **The notification trust panel — dismissal rate and view rate, with its own warning thresholds** | `/product/sourcing` |
| Ranking against the whole database without waiting for applications | § 05 |
| **Two candidate populations, five account statuses, and imported profiles visible only inside the importing organisation** | § 05, `/product/sourcing`, `/for-candidates`, `/legal/privacy` |
| Candidate privacy controls — public / limited / private | four pages |
| Résumé extraction with per-item confidence and candidate review | three pages |
| Résumé critique with a quality score and specific suggestions | § 10; three pages |
| Seniority alignment · career trajectory · potential · drop-off risk | § 06; three pages |
| **Career gap detection** | `/product/matching`, `/for-candidates` |
| Candidates see the same score and the same breakdown | § 10; `/for-candidates` |
| **Twenty-two notification types with per-type preferences** | § 10; four pages |
| **Job alerts — daily, weekly or instant** | `/for-candidates`, `/product/sourcing` |
| **The candidate dashboard: recruiter interest, skills-unlock, application velocity, résumé critique** | `/for-candidates` |
| **Saved jobs, and job comparison side by side** | `/for-candidates` |
| **GDPR export and delete, as a request with a review queue** | `/trust`, `/for-candidates`, `/legal/privacy` |
| **Employer reviews behind a verified-application gate, with moderation and a right of reply** | `/for-candidates`, `/legal/terms/*` |
| **The job lifecycle — Draft → Under Review → Approved → Published → Active → Closed — with status history and job versions** | `/product/hiring-operations` |
| Custom pipelines, **with the product's own seven stage labels and its neutral tone on "Not moving forward"** | § 09; two pages |
| **Screener questions — text, yes/no, multiple choice** | `/product/hiring-operations` |
| **Interviews with a scheduled time, a duration and a meeting link** | § 09; `/product/hiring-operations` |
| Approvals before publish; structured feedback, public or private | § 09; two pages |
| **Six organisation roles, a manager → recruiter hierarchy, per-job assignment gating and organisation data isolation** | `/trust`, `/for-teams`, `/product/hiring-operations` |
| **The match audit log — weights, per-skill scores and verdict at compute time** | `/trust` |
| **Action and search audit logs on every mutation and every search** | `/trust`, `/for-teams` |
| **Feature-flagged scoring modifiers, and data-quality snapshots** | `/trust` |
| **Structural fairness: language flags with their reasons, over-qualification bias, aggressive filter count, and a refusal to rate below fifty scored candidates** | `/trust`, `/product/analytics`, § 11 |
| **No demographic data used, inferred or held** | `/trust`, `/legal/privacy`, § 11 |
| Funnel, bottleneck and pool reporting — *as mechanisms; every figure labelled an example* | `/product/analytics`, `/for-teams` |
| **Scarcity index — high / medium / low** | `/product/analytics` |
| JD upload with skill extraction; the JD optimizer | `/for-teams`, `/demo` |
| **Location aliases resolve — Bengaluru/Bangalore, Mumbai/Bombay** | `/product/sourcing`, `/for-teams` |
| Target segment: 50–500 hires a year, tech-forward, structured skills | `/for-teams`, `/demo` |
| **In-platform messaging with candidates** — *maintainer, 28 Sep 2026; no source read yet* | `/changelog`, `/product` |
| **Calendar sync for scheduled interviews** — *maintainer, 28 Sep 2026; no provider named* | `/changelog`, `/product`, `/product/hiring-operations`, `/for-teams` |

**Promoted from PLACEHOLDER or absent in Phase 4** — every bolded row above that
was previously "coming soon", withheld, or missing. Sixteen capabilities, all
live, all previously undersold.

**Nothing is on a roadmap.** Phase 4 left two genuine gaps, in-platform
messaging and calendar sync, and named them on `/product`, `/changelog` and
`/product/hiring-operations`. The maintainer confirmed both live on 28 Sep 2026,
so all three pages now claim them as shipped and `ROADMAP` was deleted.
`/product` closes on `ALSO_SHIPPED`, looked up from `SHIPPED`. The site names no
calendar provider — none was confirmed.

**Existence confirmed, depiction not licensed.** **Nothing, now.** The Chrome
extension came off on 28 Sep 2026: `/product/sourcing` shows a screenshot of the
running extension, and the copy beside it is read off
`transpahire-source-extension/src/popup/main.ts`. It is still drawn nowhere —
there is no interface specification to draw from, so more of it means another
capture. The sourcing agent moved off this list earlier — `docs/phase-4.md`
§ 1.5 specifies its interface and `missionConsole()` depicts it from that
specification.

### PROVISIONAL — requires product validation

Four rows. Three of Phase 3's five were answered by reading the source, and the
answers are in the AUTHORITATIVE table above.

| Item | What needs confirming | Owner |
|---|---|---|
| The AI narratives and concept-match reasons in every composition | Written to the standard the source describes rather than taken from the live engine. **Still the highest-value outstanding content item on the site** — real output beats anything a copywriter produces, and its credibility comes from being genuine | Product |
| The quoted profile snippets in `evidenceSnippet()` and the concept cards | Invented, and plausible. Twenty real anonymised examples would make `/product/matching` the most convincing page in the category | Product |
| The exact signal value strings | The vocabularies for seniority alignment, potential and drop-off. The four trajectory classifications are named; the rest are inferred | Product |
| "148,000+ cities" | Appears in `product-overview.md` and **could not be found in the source**. Not published anywhere. The alias behaviour is real and is described without a count | Product |

**Answered in Phase 4, and no longer provisional:** the dimension labels (they
are `skillCoverage / semanticSimilarity / experienceCurve / locationWorkMode`,
and there are four); the word "Partial" (the product's relationship label for the
transfer case is *transferable*, and the coverage band is *Moderate* — the site
uses "partial" for the skill state and the product's own words everywhere else);
the skill edges (nine types, real, weighted).

### PLACEHOLDER — must not be published

Down to five rows from eight, and two of the five are one-line business inputs.

| Location | Content | Status |
|---|---|---|
| Hero | Customer logo row | **Neutralised.** Three labelled empty slots under "Customer logos — pending". The layout is unchanged so real marks drop in |
| `/about` § who | The founder paragraph's wording | **28 Sep 2026: filled.** Name Yuvaraj; founder paragraph drafted from the maintainer's brief; the email sign-off line removed by the maintainer's decision, so no address is published. The section keeps `data-content="provisional"` until the maintainer approves the paragraph's wording. "Where this is" is hidden (commented out in the source). The three-card pending team grid and the "company details pending" panel are **deleted** — announcing a missing address in a bordered box makes a procurement blocker a visible one |
| footer | Registered company name, number, address | One honest line in the footer, which is where a procurement reader looks. Not a panel |
| `/demo` | The form's destination | Renders, fully labelled, **no `action` and no `method`**. The note no longer apologises: it says there is no destination yet and points at the address on `/about` as the route that works. Maintainer's decision, 31 Aug 2026 |
| Four legal documents | The `[COUNSEL]` determinations | **Complete drafts, not templates and not pending notices.** Every legal determination is flagged in place with a loud `.counsel` marker; the product facts are filled in and dated. See § 5 |
| Every composition | The people, companies and figures | Invented, obviously so, and **labelled** — `.composition-note` appears once per page |
| § 08 what-if figures · C10 unlock counts · every figure on `/product/analytics` | `248 → 417`, `+8 roles`, funnel counts, scarcity coverage | Illustrative, each carrying a visible `.example-tag`, and `/product/analytics` says so in its page head before a reader reaches a number |
| `/product/candidate-intelligence`, `/product/sourcing` | Screenshot slots | **None left, down from six.** Four were reserving space for surfaces the site can now build honestly; the other three — `/product`, `/product/sourcing` and the extraction review on `/product/candidate-intelligence` — were filled with the running app on 28 Sep 2026 (see § 5). What remains is clearing the people in them |

### Removed rather than fixed

| Was | Why it is gone |
|---|---|
| Stats strip — "10x faster", "73% of hires", "3 min", "< 5% reversed" | Every value fabricated. **Cut entirely**, and it does not come back with anything unmeasured |
| Testimonial — *Head of Talent, Series B SaaS company* | An invented quote. Anonymised attribution does not make it acceptable |
| Demo video block | No video exists |
| Nine "coming soon" cards | Reduced to four in Phase 3, then to **two** in Phase 4 — because two of the four had shipped by the time the page listing them went up. `ROADMAP` lived in the data module so no page could hold a private copy of it, and was **deleted on 28 Sep 2026** when its last two items shipped |
| Pricing section and tier structure | Nothing validated, and nothing to bill with — subscription and billing are described as infrastructure waiting to be activated. No pricing page either |
| "Setup in under 10 minutes" | An unsourced measurable claim |
| "Join hiring teams using Transpahire" | Implies existing customers |
| "No credit card required" | Implies a self-serve path that does not exist |
| Social links (`href="#"`) | **Icons deleted.** `10 § R18`: confirmed handles, or delete them. None are confirmed |
| Footer About / Blog / Careers links (`href="#"`) | About is a real page now. Blog and Careers are deliberately not built, so they are not linked |
| "Fairness and Auditability" card, "Defensible hiring by design" | Live features, gated claims. See § 4 |
| Employer reputation scoring from candidate reviews | Not in the current product documentation; it came from a superseded source |
| Comparison table | Moved off the homepage in Phase 3 and **cut entirely in Phase 4**. It shipped one column short with a note underneath admitting so, on a page about transparency, which reads as concealment. The two solid category claims are prose on `/product/matching` now |
| "Consented profiles only", and "it does not import a person who did not ask to be there" | **Contradicted by the default import path.** The highest-priority copy defect on the site and the only one with real legal exposure. Replaced by a two-population account on `/product/sourcing#consent`, and a section of its own in the privacy policy |
| "Five dimensions", on six pages | Four are weighted. Salary is a ±10% modifier applied afterwards, so listing it as a peer of skill coverage overstated it roughly sixfold and understated the one number that carries the model |
| "Weak" as a classification a user sees | The product renders that band as **"Possible"**; "weak" is described in-source as a scorer's word. It survives only in the coverage-band table, where it describes a percentage range |
| The five-bar explanation panel | Replaced by `explainPanel()`. Two of its five bars were wrong, and it had no way to express the strongest thing the product does — every match citing the line of the profile it came from |
| "Coming soon: activity notifications" · "Coming soon: interview scheduling" | **Both shipped.** Twenty-two notification types with per-type preferences; interviews with times and meeting links. Calendar sync was the remaining gap; it shipped too (28 Sep 2026), and the card on `/product/hiring-operations` now describes it as live |
| "The sourcing agent is named, not depicted" | Its interface is specified and is now drawn. The clause stood for the Chrome extension until 28 Sep 2026; that is now a screenshot of the running extension |
| "Fairness and Auditability" card, "Defensible hiring by design" | Still gone, and still for the same reason — but the *mechanism* claims are now published on `/trust`. `CLAUDE.md` § 7 carries the distinction: what the software computes and shows is publishable; what outcome it produces is not |

**Zero `href="#"` remain on the site.** `tools/check.mjs` fails the build if one
reappears.

---

## 3. Conflicts resolved in Phase 3

Three, all recorded here because a future session reading the older documents
will find the losing side stated as fact.

### The 0–100 vs 0–1 score model — **resolved: 0–100**

The homepage said 0–100. The brand system's product mockup showed a 0–1 scale
(`0.94`, `0.91`) with qualitative bands (`Direct fit`, `Inferred fit`, `Stretch
fit`). Those were two different products' vocabularies. **The Product Overview
settles it as 0–100 across five dimensions with four named classifications**, and
the whole site is built on that. The brand mockup's vocabulary is superseded and
must not be reintroduced.

### `87` vs `92` — **resolved: 87**

`05-HOMEPAGE_BLUEPRINT.md` § 2 describes the hero and section 06 compositions
with a score of `92`. Every other document uses `87`:
`08-PRODUCT_VISUALIZATION_SPEC.md` § 1 names it explicitly as the value that
"appears in sections 01, 05, 06, 08 and 10", the storyboard uses it throughout,
and `09-MESSAGING.md` builds a headline on it — *"It's the same eighty-seven."*

**The site uses 87, from one place.** The blueprint's two mentions of 92 are
stale. This is exactly the divergence `08 § 1` calls "the most visible possible
defect", and it is worth noting that it had already happened *inside the
specification* before a line of the page was written — which is the argument for
the data module in one sentence.

### `containerd` — **resolved: not built**

`08 § 4`'s ASCII sketch of the skill graph shows
`Docker ── similar to ── containerd`, and the same section's own rule forbids it:

> Use only the three confirmed edges. **An invented edge is an invented
> capability** — this is the one place where a plausible-looking addition would be
> a fabrication.

The Docker↔containerd relationship is not one of the three. The sketch loses. The
built diagram draws the confirmed Docker→Kubernetes edge and, as its secondary
edge, the confirmed React→Vue relationship — which also demonstrates the second
relationship *type*, and the type is the capability being claimed.

---

## 4. Regulatory sensitivity

**This section did not shrink, and it is the one place where the Overview
changed nothing.**

Fairness monitoring, the audit trail that logs the exact weights and skill-level
scores at computation time, and AI-generated hiring decision justification are
**all live features**. What is gated is *marketing* them. Automated hiring tools
are regulated in Transpahire's likely markets — NYC Local Law 144, the EU AI
Act's high-risk classification for employment systems, EEOC guidance in the US —
and publishing claims about them commits Transpahire to capabilities customers
will rely on for compliance and regulators may test.

> **Existence is not permission.**

That gate is about liability, not about whether the code is written. It needs
named sign-off from whoever owns legal and product — not from marketing, and not
from a Claude Code session.

The distinction to hold in every draft:

| Publishable after sign-off | Not publishable |
|---|---|
| "Every scoring decision is logged with the weights used" | "Fully auditable" |
| "Fairness patterns are surfaced as a report, not a hidden correction" | "Bias-free", "fair by design" |
| "You can see and explain the reasoning behind a decision" | "Defensible", "compliant" |

Describe the mechanism; never claim the outcome.

### What changed in Phase 4

The gate did not move. The *line* got drawn, and the line is what let the work
happen — `CLAUDE.md` § 7 now carries it verbatim:

> A claim about what the software **computes and shows** is a mechanism claim, and
> is permitted. A claim about the **outcome** is not, and needs named sign-off.
>
> "We read the job description for exclusionary language and hold no demographic
> data" is the first kind. "Fair by design" is the second.

Phase 3 read the gate as *fairness is off limits* and withheld the mechanism
claims along with the outcome claims. That was the safe reading and it was the
wrong one: the strongest sentence available to this site —
**"no demographic data is used or held"** — is a statement of fact about a
schema, and withholding it protected nobody.

**So what the site does today:** section 11 has a fifth beat, phrased as a
mechanism. `/trust` has a structural-fairness section that names the flagged
terms, the reasons they are flagged, and the service's refusal to rate below
fifty scored candidates. `/product/analytics` has a fairness view. None of them
uses an outcome word.

**And the enforcement is mechanical now.** `tools/check.mjs` fails the build if
*bias-free*, *fair by design*, *enterprise-grade* or *fully compliant* appears in
visible copy on any page. The one exempt element is the list on `/trust` that
*names* the claims we refuse to make, marked `data-claims="negated"` so the
exemption is visible in the markup — a disclaimer that cannot name what it
disclaims is not a disclaimer.

**There is still no `/responsible-ai` page.** It remains the most tempting page on
the not-built list and the most dangerous, because a page with that title is an
outcome claim before the first paragraph.

One line is used exactly once, on `/for-teams`, and is worth knowing about:
*"Built for hiring decisions your team can stand behind."* It is owner-sanctioned,
and *"stand behind"* is defensibility phrased as confidence — a hair from
*defensible*. It ships as a section closer and it never appears beside fairness,
audit or compliance language.

---

## 5. The gate

Before this site may be indexed, **all** of the following.

### Closed in Phase 3

- [x] **The 0–100 vs 0–1 score conflict is resolved** — 0–100, on the Overview's
      authority. § 3
- [x] **Comparison-table claims have a documented basis** — the Overview's § 9
      supplies it, and the table stays at **category** level: it names no vendor,
      and it ships without the "AI screening tools" column until legal has read
      the row that characterises that category's scope. § 6
- [x] **Footer links resolve to real pages** — all eleven. Blog and Careers are
      not linked because they are deliberately not built
- [x] **Social links resolve to real accounts, or are removed** — removed
- [x] **Every placeholder is labelled as one** — logo slots, the team, the
      company details, the form, the legal documents, the screenshot slots, and
      every figure inside a composition

### Also closed, in Phase 4

- [x] **Every claim reconciled against the schema rather than a plan** — nine
      factual defects corrected, sixteen shipped capabilities promoted out of
      PLACEHOLDER. § 2
- [x] **The mechanism / outcome line has a written definition and a build check**
      — `CLAUDE.md` § 7, enforced by `tools/check.mjs`. § 4
- [x] **The consent model is described honestly** — two populations, five account
      statuses, and imported profiles visible only inside the importing
      organisation. This was the only defect on the site with real legal exposure
- [x] **A stale-fact tripwire exists** — `tools/check.mjs` fails the build if a
      retired claim reappears in `src/`, and if `data-content="placeholder"`
      appears on a block describing a shipped capability. It would have caught six
      of the nine defects
- [x] **The legal documents are drafted** — four complete drafts with the product
      facts filled in and every determination flagged. Sign-off is still open
- [x] **Pricing is answered** — `/pricing` publishes the shape and no number

### Still open

- [ ] **Every PROVISIONAL row in § 2 is confirmed, corrected or cut** — four
      rows, all wording or examples, one conversation with Product
- [ ] **The four legal drafts have counsel's sign-off** and every `[COUNSEL]`
      marker is resolved. **This blocks launch.** Grep for `counsel(` in
      `src/pages/legal-*.mjs`
- [ ] **`/about` is attributed** — `[NAME]` and `[email]`. An unattributed
      founder section is worse than none, and it is one line of input.
      **28 Sep 2026: named (Yuvaraj); no email, by the maintainer's decision.**
      Open only until the founder paragraph's wording is approved and
      `data-content="provisional"` comes off
- [ ] **Real product visuals** — at least one genuine screenshot in the
      evaluation path. Forty-plus compositions and zero screenshots still reads
      as a product that does not exist. Six labelled slots are waiting, with
      their ratios declared; the two that matter are `/product`'s hero position
      and `/product/candidate-intelligence`'s extraction review.
      **`docs/phase-5.md` § 5.2 is right that this is not blocked on anyone
      outside the project** — it is fifteen minutes with the running app, and it
      is the highest-value single asset the site does not have. Now that
      `jobWorkspace()` exists, `/product`'s slot could arguably be dropped
      instead of filled; the extraction one could not.
      **28 Sep 2026: `/product`'s is filled** — `assets/images/image.png`, a
      job's ranked pool with the candidate drawer open. So is `/product/sourcing`'s
      — `assets/images/browser-extension.png`, the extension over a résumé. So
      is the extraction review — `assets/images/extraction-review.png`, the
      résumé review dialog, cropped from `image copy.png` to the dialog itself.
      **Every slot is filled; the three items below are what keeps this open**
- [ ] **The `/product` screenshot's people are cleared** — it shows two
      candidate names, their employers, expected salaries and notice periods,
      and a signed-in user's handle. Confirm they are seeded demo data, or
      recapture against seeded data. Real candidate records on a public page are
      a privacy problem whether or not the page is indexed
- [ ] **The `/product/sourcing` screenshot's person is cleared** — it shows a
      real résumé: a name, a headline, a city and a summary. The email address
      is blurred in both places it appears. Confirm the person is happy to be on
      the site, or recapture over a demo résumé
- [ ] **The `/product/candidate-intelligence` screenshot's person is cleared** —
      it shows a real résumé's parsed skills, with a quoted line under each, and
      one quote names an employer (BlueRise). The name and photograph on the
      profile behind the dialog are cropped out. Confirm the person is happy to
      be on the site, or recapture over a demo résumé
- [ ] **`og:image` exists** — render the explanation panel rather than a logo
      card; it is the one asset that explains the product at thumbnail size
- [ ] **Company registration details** — one honest line in the footer today
- [ ] **A destination for the demo form**, and a named person who reads it.
      Twenty-three calls to action terminate there. `/demo`'s note points at
      `/about` in the meantime, which is a working route and not a good one
- [ ] **What a demo actually is** — `/demo` and four CTAs promise "thirty
      minutes; we run one of your open roles through the engine". That is a
      commitment. Confirm it or replace it
- [ ] **The pricing model** — per seat or per requisition. `/pricing` names the
      decision rather than pre-empting it
- [ ] **The "148,000+ cities" figure** — unverified, unpublished
- [ ] **Product stage** — pre-GA, GA or beta. It decides whether the CTA should
      read *Book a demo* or *Get early access*
- [ ] **Self-host the fonts** — half a day, and it removes the site's only
      third-party request. `/legal/cookies` § 1 commits to it on the page, which
      is a commitment somebody is now accountable for
- [ ] **`robots.txt` `Disallow` removed AND the meta robots tag flipped on all
      twenty-three pages** — both, or the site stays invisible. `tools/check.mjs`
      asserts the tag is present on every page today; that assertion has to be
      inverted deliberately, on the day, and not before

**Added in Phase 5:**

- [ ] **A destination for the two tool endpoints** — `/check/job-description` and
      `/check/resume`. Public unauthenticated with a rate limit and a size
      cap, or the async fallback. `docs/phase-5.md` § 4.1. Both pages ship saying
      they are not switched on, which is honest and is not a substitute
- [ ] **A privacy paragraph covering the two tool pages** — and this one gates
      the tools rather than the indexing. A page that accepts a document is a
      processing activity, and the policy has to name it **before** the endpoint
      goes live, not after
- [ ] **Where the email list lives**, and whether double opt-in is required in
      the markets being sold into. `docs/phase-5.md` § 4.3. The footer sign-up
      ships unwired for the same reason /demo's form does
- [ ] **Three job descriptions for `/proof`**, and the naming decision.
      `docs/phase-5.md` § 5.1 — the recommendation is firm: anonymise. The page
      was **not built**, because its entire content is the missing input and a
      `/proof` page carrying invented parser output would be the one invention
      this site has avoided

Then, and only then, update this document to record what became AUTHORITATIVE
and on what evidence — **and move the reconciliation date at the top.**

**Nothing on this list is a blocker created by a build phase.** Every open item is
a business, legal or product input.

---

## 6. What this site withholds on purpose

Recorded together because each one is a place where the honest version is less
impressive than the available version, and each will look like an omission to
someone who does not know why.

*The Chrome extension used to be on this list.* For three phases
`/product/sourcing` said out loud that it would not show it, in the section where
the picture would otherwise be. On 28 Sep 2026 a capture of the running extension
filled that section — a screenshot, not a drawing, because there is still no
specification to draw from.

*The sourcing agent used to be on this list too.* `docs/phase-4.md` § 1.5 specifies
its interface, so it is drawn now — and it is the most defensible capability in
the product, which means the withholding was costing more than it protected. That
is the general lesson: **a withholding has an expiry date, and nothing on this
list should be assumed still current without checking the source.**

**The skill graph draws two edges out of nine types.** Not because the others are
unconfirmed — all nine are real — but because a nine-node diagram is a picture of
a schema rather than an explanation of a score. The count and the weighting are
stated in copy and in the structured description instead.

**No analytics figure is presented as measured.** `/product/analytics` exists and
every number on it carries an example label, with the page head saying so before a
reader reaches one. Match-to-hire and prediction accuracy are the two figures we
would most like to publish and the two we are least willing to guess at, so they
are described and shown nowhere.

**The comparison table is gone rather than short.** Two columns with a documented
basis beat three with an unread one — and a table shipped one column short, with a
note underneath admitting so, on a page about transparency, reads as concealment.
The two claims that were solid are prose now.

**Nothing on this site says how many cities the location model covers.** A figure
exists in an internal document and could not be found in the source. The alias
behaviour is real and is described without a count.

---

## 7. Working rule

> If you cannot name the source, it does not go on the page.

For a future session: when asked to "improve the copy", improving it means
making true things clearer — **not** making unverified things sound more
confident. If a section reads weakly because the underlying claim is unproven,
the fix is a confirmed claim, not a stronger adjective.

And one addition from Phase 3, because it is the rule the compositions live or
die by:

> **Every value on this site is typed once, in
> `assets/data/product-demo.js`.** If you are about to type a score, a candidate
> name, a dimension label, a weight, a threshold or a stage name anywhere else,
> you are about to create the divergence this document exists to prevent.

And one from Phase 4, which is the harder half of the working rule and the reason
this phase existed at all:

> **A prohibition does not notice when the thing it was protecting you from
> becomes true.**
>
> Under-claiming a shipped feature is a defect, not a safe default. This
> inventory was reconciled against a planning document and was wrong in both
> directions: nine claims were false, and sixteen live capabilities were filed as
> absent, placeholder, or coming soon. The second list did more damage, because
> it told every buyer the product was less finished than it is.
>
> So: **point the classification at the schema, not at the plan.** When the
> source and this document disagree, the source wins and this document gets
> updated in the same commit — and the date at the top moves.
