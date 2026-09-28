# 00 — Sources and evidence base

Read this before trusting anything in the other ten documents.

---

## 1. The authoritative source now exists

**The Transpahire Product Overview was supplied on 2026-08-27**, after documents
01–11 were first drafted. It is now the primary source of truth, and it
**overrides** every other source in this repository, including the prototypes.

Documents 01–11 have been reconciled against it. § 3 below records what the
earlier evidence got wrong, because two of those errors had propagated into the
homepage specification and one of them contradicted the current site.

| Tag | Source | Authority |
|---|---|---|
| `[OVERVIEW]` | **Transpahire Product Overview** — product summary, target users, 14 core modules, flattened feature table, 4 core workflows, differentiators, inferred/upcoming features, strengths, positioning notes. 2026-08-27 | **AUTHORITATIVE.** Overrides everything below |
| `[OWNER]` | Direct statement from the product owner in the Phase 2 briefing: the AI Sourcing Agent and the Chrome Extension are shipped product direction | **AUTHORITATIVE** on existence; silent on implementation detail |
| `[PROTO]` | `Transpahire (Remix) (1–3)/` — five working React prototypes, authored in-house. Jul 2026 | **Design reference, not product truth.** See § 3 |
| `[BRAND]` | Transpahire Brand System (Stratum), `assets/brand/brand.json` | AUTHORITATIVE for identity |
| `[ARCH]` | `AI_Candidate_Recommendation_TranspaHire.pdf` — matching architecture, latency budget. Sep 2025 | Supporting. Consistent with `[OVERVIEW]` |
| `[SPEC]` | `TranspaHire.pdf` — full product specification. Sep 2025 | **Superseded. Do not cite.** See § 4 |
| `[ANALYSIS]` | The author's reasoning. Carries no product authority | — |

An untagged capability claim anywhere in these documents is a defect.

---

## 2. The score model — settled

`[OVERVIEW]` § 3, *Smart Matching Engine*:

> Every candidate-to-job pairing gets a match score **from 0–100**. Scores are
> broken down into readable dimensions: **skill coverage, experience alignment,
> location preference, salary alignment, and AI semantic similarity.** Match
> classifications: **Strong Match, Good Match, Potential, Weak.**

**This is the model. Five dimensions, 0–100, four named classifications.**

And on the candidate side, `[OVERVIEW]` § 2 and workflow 2:

> Browse open roles and see a **personalized match score** for each … Each
> listing shows their personalized match score and a breakdown of where they fit
> and where they don't.

**Candidates see the score too.** There is no asymmetry between the two sides —
which makes the two-sided transparency story *stronger*, not weaker: it is
literally the same number and the same breakdown.

Consequences:

- The **current homepage was right all along** — 0–100 across skill coverage,
  experience, location, salary and semantic similarity. `docs/content-integrity.md`
  § 2 can close that conflict in Transpahire's favour.
- The brand system's mockup (0–1 with *Direct fit / Inferred fit / Stretch fit*)
  is **wrong** and should not be used as a visual reference for scoring.
- `docs/content-integrity.md` § 5's blocking item *"the 0–100 vs 0–1 score
  conflict is resolved"* is **cleared.**

`Seniority alignment` is a **separate feature**, not a sixth breakdown dimension
`[OVERVIEW]` § 4.

---

## 3. Corrections to the pre-Overview analysis

The prototypes were treated as the strongest available evidence because two of
them carry comments claiming their shapes mirror live API payloads. That was a
reasonable read and it produced four wrong conclusions. Recorded here so no
future session re-derives them.

| Earlier conclusion | Source of the error | Correct position |
|---|---|---|
| Score is **0–10** to one decimal, bands at 7.5 / 6.5 | `[PROTO]` `src/data.js` (`score: 8.2`, `bandOf()`) | **0–100**, classifications Strong / Good / Potential / Weak `[OVERVIEW]` |
| The breakdown has **four** dimensions (skills, experience, location, seniority) and there is *no* salary or semantic dimension | `[PROTO]` `breakdown` object | **Five** dimensions: skill coverage, experience alignment, location preference, **salary alignment**, **AI semantic similarity** `[OVERVIEW]`. Seniority is a separate feature |
| Candidates **never see a raw score**, only qualitative tiers | `[PROTO]` `recs/data.js` header comment: *"raw score never shown"* | Candidates **do** see their match score and breakdown `[OVERVIEW]` |
| *Sourcer* and *Job Manager* are not distinct roles | Absent from `[PROTO]` and `[SPEC]` | Both are real org roles, alongside Admin, Hiring Manager, Recruiter, Interviewer `[OVERVIEW]` § 3 |

**The prototypes remain useful** — as density, layout and interaction reference,
and as a source of invented-but-plausible candidate data. They are not a source
for the data model, the score, or which features exist. Where `[PROTO]` and
`[OVERVIEW]` disagree, `[OVERVIEW]` wins without argument.

---

## 4. `TranspaHire.pdf` is superseded

The Sep 2025 specification describes a materially different product: a
*"transparent, candidate-centric job marketplace"* built around **anti-ghosting
SLAs with enforced timelines and penalties**, **recruiter/organisation
verification**, **ghost-job detection**, **candidate subscription tiers**, and
**employer reputation scoring from candidate reviews**.

**None of that appears in `[OVERVIEW]`.** The product has narrowed from a
two-sided marketplace with enforcement mechanics to an intelligent hiring
platform whose two-sidedness is about *transparency* rather than *accountability*.

Practical effect on this specification: the employer-reputation card (C9) and
every SLA claim were demoted from the homepage. See `01 § 6` Q1 — a prototype
does read a real `/reviews/orgs/{id}/score` endpoint, so the capability may exist
without being marketed. It is the one open question worth asking, and the answer
does not block anything.

**Do not cite `[SPEC]` as product truth.** Its remaining value is historical: it
explains why earlier drafts of this analysis leaned on accountability, and it
records a candidate-subscription monetisation model that `[OVERVIEW]` § 7 now
lists as inferred infrastructure awaiting activation.

---

## 5. Excluded sources

Four document sets on the same machine look relevant and are not. Using them
would produce a marketing site for a different product.

| Excluded | Why |
|---|---|
| `am-console-endpoints.md`, `am-manual-sourcing.md`, `API.md`, `frontend-delta-2026-08-*.md`, `notifications_api.md` | A different product: a staffing/consultancy platform with account managers, consultants, clients, requirements, terms sheets, contracts and BGV. Clerk auth, `/v1/am` mounts. No Transpahire vocabulary |
| `__ components_JobManagement_components_AIRecommend*.md` | A third-party ATS's React source. Superficially close to Transpahire's matching UI; not Transpahire's code |
| `client-management-overview.pdf` | Unrelated |
| Pricing figures in `[SPEC]` § 3–4 | A superseded monetisation plan. `[OVERVIEW]` § 7 puts subscription and billing in *inferred/upcoming* |

---

## 6. Still out of bounds

`[OVERVIEW]` resolves most of what was blocked. Four things remain.

| Subject | Position |
|---|---|
| **Pricing** | `[OVERVIEW]` § 7: subscription and billing are **inferred infrastructure, not live**. No price may be published. `NEEDS BUSINESS VALIDATION` — and the deferred-pricing recommendation in `04 § 5` is now well supported rather than merely cautious |
| **Fairness, bias, audit and compliance claims** | The **features exist** — fairness monitoring as a report, a full audit trail on matching with logged weights `[OVERVIEW]` § 3, § 6. **Existence is not permission to market.** Automated hiring tools are regulated (NYC LL144, EU AI Act, EEOC) and `docs/content-integrity.md` § 4 requires named legal sign-off. **Describe the mechanism, never claim the outcome:** "every scoring decision is logged with the weights used" is publishable after sign-off; "compliant", "auditable", "bias-free", "defensible" are not |
| **Customers, logos, testimonials, outcome metrics** | Nothing in any source. `CONTENT REQUIRED` |
| **Integrations** | `[OVERVIEW]` § 7 lists OAuth (Google/LinkedIn), Stripe and calendar sync as **not yet live**. No integration may be shown or implied, including a third-party logo in a mockup |

Two claims `[OVERVIEW]` **does** now license that were previously blocked:

- **The shared candidate database.** Workflow 1 step 5: *"The system ranks
  candidates in the database by fit score — no waiting for applications to
  trickle in."* Plus a standalone proactive Candidate Search. Candidate privacy
  controls (public / limited / private) are the counterweight and should be
  mentioned wherever the pool is.
- **The target segment.** *"Tech-forward companies that hire at volume (50–500
  hires per year)"*, in engineering, data, product and design, in competitive
  talent markets `[OVERVIEW]` § 9. The current homepage's "50–500 roles per year"
  is **sourced** and may stay — as *hires*, which is what `[OVERVIEW]` says.
