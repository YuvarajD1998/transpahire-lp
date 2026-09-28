# 04 — Information architecture

Which pages exist, what each is for, and what is deliberately not built.

---

## 1. The principle

The brief's hypothesis IA lists eighteen pages across five groups. Most of them
would ship empty. The audit already asks the right question about one of them —
*"whether a blog is a commitment anyone will maintain"* `docs/audit.md § 5` — and
that question generalises: **a page with no owner and no content is worse than a
missing page**, because it advertises abandonment.

Three constraints shape the recommendation:

1. **Visuals, not validation, are now the bottleneck.** `[OVERVIEW]` settles what
   the product does, so copy is writable. What no page has is a real product
   visual — there are still zero `docs/content-integrity.md`.
2. **The site cannot be indexed yet.** SEO value is deferred value. Building
   pages *for* SEO before the integrity gate clears is building for an audience
   that cannot see them.
3. **Page count triggers the architecture migration** `docs/architecture.md § 1`.
   Any honest IA exceeds three pages, so the migration decision is forced. See
   § 6.

---

## 2. Recommended architecture

```
/                             Home
/product                      Overview — the six pillars, one page
  /product/matching           ★ Explainable matching — the flagship page
  /product/sourcing           Sourcing                      [gated]
  /product/candidate-intelligence   Candidate intelligence
/for-teams                    Recruiters & talent teams
  /for-teams/hiring-managers  Hiring managers               [later]
/for-candidates               ★ The candidate product
/demo                         Book a demo — the conversion destination
/about                        Company
/legal/privacy · /legal/terms · /legal/cookies
```

Not in the launch set, deliberately: `/pricing` (§ 5), `/blog`, `/resources`,
`/guides`, `/careers`, `/solutions` by industry, `/integrations`, `/security`,
`/customers`.

### Navigation

Four items maximum `docs/phase-2.md § 3.1`. Three is better, and three is what
the launch content supports.

```
[Stratum mark] Transpahire     Product ▾   For teams ▾   About        Sign in   [Book a demo]
```

- **Product ▾** — Overview · Explainable matching · Sourcing · Candidate
  intelligence. Four items; a disclosure menu, keyboard-operable, built on the
  existing accordion contract's semantics rather than a new component if possible.
- **For teams ▾** — collapses to a single link until the hiring-manager page
  exists.
- **About** — a plain link.
- **Sign in** — `.btn--ghost`, the existing utility slot.
- **Book a demo** — `.btn--primary`. One per view.
- **"Looking for a role?"** → `/for-candidates`. Utility slot, low-emphasis, and
  in the footer. **Never a button, never in a hero** `[02 § 4]`.

**Pricing joins the nav the day there is a price.** An empty pricing page is a
signal that the product is not for sale yet — the opposite of the intended
message.

### Why not group by "Solutions"

`/solutions` splitting by role duplicates the product pages with a persona
wrapper, and splitting by industry requires customer evidence that does not
exist. `/for-teams` and `/for-candidates` carry the two audiences that are
genuinely different products, which is the only split the product justifies.

---

## 3. Page specifications

### `/` — Home
**MUST HAVE.** Audience: recruiter. Purpose: deliver the 30-second answer
`[02 § 11]` and route to depth. Custom UI: yes — three signature compositions.
Full specification in `05-HOMEPAGE_BLUEPRINT.md`.

### `/product` — Overview
**MUST HAVE.** Audience: recruiter and hiring manager mid-evaluation, plus
anyone arriving from a nav click. Purpose: the whole product in one page, six
pillars in dependency order, each with one visual and a link to its own page.
Conversion: medium — this is where an evaluator confirms scope before booking.
Custom UI: **no** — reuses the bento, `.step`, `.frame` and one cropped
composition per pillar. SEO: the "hiring intelligence platform" landing target.
Reuses components: entirely.

### `/product/matching` — Explainable matching ★
**MUST HAVE.** The most important page on the site after the homepage, and the
one most worth over-investing in. Audience: recruiter and hiring manager.
Purpose: the full argument — score model, the five dimensions, coverage, the
narrative, the signals cluster (seniority, trajectory, potential, drop-off risk),
the skill graph behind the *partial* state, and the candidate's view of the same
record. Custom UI: **yes** — the explanation panel at full size, interactive,
with a real candidate switcher rather than the homepage's cropped version.
SEO: `explainable AI recruiting`, `candidate match score`, `why a candidate
matches`. This is the page the whole positioning rests on; the homepage section
is a trailer for it.

### `/product/sourcing`
**MUST HAVE.** Promoted — `[OVERVIEW]` confirms the shared candidate database,
dual-mode search (structured *and* semantic in one interface), similar-candidate
discovery and the availability/responsiveness filters, and `[OWNER]` confirms the
sourcing agent and Chrome extension exist. Audience: recruiters and sourcers.
Purpose: how you find people before anyone applies — including the proactive path
`[OVERVIEW]` workflow 3. Custom UI: the dual-mode search composition; the
sourcing agent **described in copy, not depicted**, until its interface is known
`[01 § 6]` Q2. SEO: `semantic candidate search`, `AI candidate sourcing`. Also the
right home for candidate privacy controls, which are the counterweight to a
searchable pool `[03 § 2]`.

### `/product/candidate-intelligence`
**SHOULD HAVE.** Audience: recruiter. Purpose: what the platform knows about a
person and how it got there — extraction, structured profile, preferences,
completeness, activity and responsiveness signals. Custom UI: no — a cropped
profile composition and a checklist. Conversion: low. Trust: high; it is the
answer to *"where does your data come from?"*, which is the second question every
evaluator asks after *"how does the score work?"*.

### `/for-teams` — Recruiters & talent teams
**MUST HAVE.** Audience: primary buyer. Purpose: the workflow story end to end —
requirement → sourcing → ranked pool → explanation → tuning → shortlist →
pipeline → hire — as one narrative rather than six pillars. This is the page a
recruiter sends to their manager. Conversion: **high** — the second-strongest
demo CTA on the site. Custom UI: no; reuses `.steps` with the hairline connector
and one composition per phase.

### `/for-teams/hiring-managers`
**SHOULD HAVE.** Promoted — the whole hiring-manager story is now LIVE: score
breakdown, AI narrative, career trajectory, seniority alignment, potential score,
what-if simulation, funnel and pipeline health `[OVERVIEW]` § 2, § 3. Only the
last beat, AI decision justification, is legally gated `[02 § 9]`, and the page
works without it. Audience: hiring managers and job managers, grouped as
`[OVERVIEW]` groups them. Purpose: decision quality — *come to the meeting with
the reasoning*. Reuses components entirely. Build it after `/for-candidates`;
their needs are adequately met on `/product/matching` at launch.

### `/for-candidates` ★
**MUST HAVE.** Audience: candidates. Purpose: the candidate product as its own
narrative — build a profile, resume intelligence, matched roles with reasons,
your gaps and what closing them unlocks, apply, track with real status. Custom
UI: **yes** — the tiered feed and the suggested-skills panel, both fully
evidenced `[PROTO]`. Conversion: candidate signup, a completely separate funnel.
SEO: real long-tail opportunity (`why was I rejected`, `job match explanation`,
`resume feedback`) and the only place on the site where organic candidate traffic
is welcome.

**Why MUST HAVE rather than LATER**, given candidates are the second audience:
the two-sided claim on the homepage is unsupported without somewhere to land.
Section 10 asserts the candidate sees the same reasoning; a visitor who wants to
check that must be able to. It is also cheap — the prototype is designed.

### `/demo` — Book a demo
**MUST HAVE.** The single conversion destination. Purpose: qualify and book.
Custom UI: no — a form and a short "what you will see" list. Do **not** build a
self-serve trial signup: the product cannot demonstrate itself against an empty
pool `[02 § 11]`.
`NEEDS BUSINESS VALIDATION`: form fields, routing, and whether individual
recruiters ever get a self-serve path — `[OVERVIEW]` § 7 puts subscription and
billing in *inferred*, so there is nothing to self-serve into today.

### `/about`
**SHOULD HAVE.** Audience: everyone evaluating a young vendor. Purpose: who is
behind this. Conversion: low, trust: high — for an unknown company making claims
about hiring fairness, an anonymous site is a liability. Content required:
founder/team, company registration details for the footer, and a real position
on why the product exists. Custom UI: no.

### `/legal/privacy` · `/legal/terms` · `/legal/cookies`
**MUST HAVE.** Non-negotiable for a product that holds résumés, processes
candidate PII, and computes inferences about people — potential, career
trajectory, drop-off risk `[OVERVIEW]` § 3 — while offering candidates their own
privacy controls. The footer currently links all three to `href="#"`
`docs/content-integrity.md § 2`. Requires legal counsel, not a writer.

### Not built, with reasons

| Page | Verdict | Why |
|---|---|---|
| `/pricing` | **NOT NEEDED at launch** | § 5 |
| `/blog` | **LATER** | A blog is a standing commitment. No owner identified, and `docs/audit.md` already flags the question. Ship zero posts rather than three and a gap |
| `/resources`, `/guides` | **LATER** | Genuine SEO value (§ 4), zero value before indexing is open |
| `/careers` | **NOT NEEDED** | A recruitment company with an empty careers page is a bad look. Add when hiring, link to the product's own job page — which is the best possible dogfooding proof |
| `/customers`, `/case-studies` | **NOT NEEDED** | No customers confirmed. `CONTENT REQUIRED` |
| `/integrations` | **NOT NEEDED** | No integration may be shown or implied `[00 § 6]` |
| `/security`, `/compliance`, `/responsible-ai` | **NOT NEEDED — blocked** | The claims a responsible-AI page must make are exactly the ones requiring legal sign-off `docs/content-integrity.md § 4`. This is the most tempting page on this list and the most dangerous |
| `/solutions/<industry>` | **NOT NEEDED** | Requires customer evidence per industry |
| Documentation | **NOT NEEDED** | Product docs belong behind the login |

**Launch page count: 10 marketing pages** — home, product, product/matching,
product/sourcing, product/candidate-intelligence, for-teams, for-candidates,
demo, about, plus `for-teams/hiring-managers` as the first post-launch addition —
and three legal pages.

`/product/sourcing` is the page `[OVERVIEW]` added to this list. Nothing was
removed.

---

## 4. SEO content architecture

Brief § 31. **Nothing here is actionable until the integrity gate clears** —
the site ships `noindex` and `Disallow: /` on purpose `CLAUDE.md § 4`.

| Concept | Deserves | Where |
|---|---|---|
| `explainable AI recruiting`, `explainable candidate matching` | **A page** | `/product/matching`. The strongest term-to-truth alignment the product has |
| `hiring intelligence platform` | **A page** | `/product`. The category term from `[02 § 2]` |
| `candidate match score`, `why a candidate matches a job` | **A page section, then a guide** | `/product/matching`, later a guide on reading a match |
| `AI candidate sourcing`, `semantic candidate search` | **A page** | `/product/sourcing`. Both capabilities confirmed `[OVERVIEW]` § 3 |
| `skills-based hiring`, `adjacent skills`, `transferable skills`, `skill adjacency` | **A page section now, a guide later** | **Promoted.** `[OVERVIEW]` confirms the relational skill graph, hidden-talent detection and ESCO/O*NET mapping, so this is writable honestly — and it is the term set closest to the moat `[02 § 7]`. Section on `/product/matching` at launch; the guide is the highest-value future content on this list |
| `job match explanation`, `why was I rejected`, `resume feedback` | **A page** | `/for-candidates`. Candidate-side long tail — high volume, low competition, and the product genuinely answers it |
| `talent intelligence`, `recruiting AI`, `AI recruiting platform` | **Nothing** | Head terms, wrong category or hopeless competition. Earn these with the specific pages, do not target them directly |
| `ATS alternative`, `ATS vs …` | **Nothing yet** | Comparative pages need the documented basis `docs/content-integrity.md` requires for each claim |

**Do not create a page because a keyword exists.** Every page above also has a
non-SEO reason to exist; that is the test.

---

## 5. Pricing

**Recommendation: deferred. "Talk to us" for teams, and no pricing page at
launch.** `NEEDS BUSINESS VALIDATION`

Reasoning:

- **There is nothing to bill with.** `[OVERVIEW]` § 7 lists subscription and
  billing as *inferred* — *"infrastructure waiting to be activated"*. A price on a
  page with no billing behind it is a promise, not a price. This is now the
  strongest argument in this section, and it is the product owner's own document
  making it.
- **No confirmed number exists.** The superseded `[SPEC]` tier structure must not
  be published `[00 § 4]`.
- **The value cannot be self-served.** The product proves itself against a real
  requisition and a real pool. A price on a page invites a trial the product
  cannot win cold.
- **A two-sided model complicates the page.** Candidate subscriptions and
  recruiter seats on one page reads as confusing at best and as "you are the
  product" at worst.
- **Public pricing is a commitment.** Changing a published price is expensive in
  trust; not publishing one costs a page.

Rejected alternatives: *public tiers* (nothing validated, nothing to bill with);
*hybrid — public candidate tiers, contact-sales for teams* (a reasonable eventual
answer; needs the candidate tiers to be final); *"starting at"* (a number is a
number, and it will anchor every negotiation).

**Watch this trigger:** the moment subscription and billing move from
`[OVERVIEW]` § 7 to live, a price becomes mandatory — you cannot self-serve
without one. Revisit then, not before. The `.tier` component with `--featured` and
`.tier__badge` is built and unused `docs/components.md`; it costs nothing to leave
ready.

---

## 6. The architecture decision

`docs/architecture.md § 1` sets the migration trigger at **two or more** of:
more than three pages · a committed blog · data-driven product visualisations ·
non-maintainer editors.

Against this IA:

| Trigger | Fires? |
|---|---|
| More than three pages | **Yes** — nine marketing pages plus legal |
| A committed blog | No — deliberately deferred (§ 3) |
| Data-driven product visualisations | **Yes** — the explanation panel appears on the homepage, `/product`, `/product/matching` and `/for-teams` at three crops; the ranked list on five pages; the candidate view on two. Hand-maintaining that markup is exactly the rot the trigger exists to prevent |
| Non-maintainer editors | Unknown |

**Two triggers fire. Migrate to Astro at the start of Phase 3**, before writing
page content — porting nine hand-written pages later costs more than starting
Astro on day one. `docs/architecture.md § 2` describes the migration as
mechanical; `11-PHASE_3_PLAN.md` § 2 sequences it first.

The two things most likely to be lost in that migration, per `docs/phase-2.md`
§ 4: **the accessibility work** and **`--ratio` on every frame**. Both are
invisible when correct.
