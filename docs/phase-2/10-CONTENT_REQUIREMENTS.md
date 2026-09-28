# 10 — Content requirements

Everything still missing, who owns it, and what it blocks.

**`[OVERVIEW]` cleared most of this list.** Three items blocked the whole build
before it arrived; one remains, and it is not a product question.

---

## 1. Resolved by the Product Overview

Recorded so nobody re-raises them.

| Was | Now |
|---|---|
| R1 — the Product Overview itself | **Delivered.** `[00 § 1]` |
| R2 — twelve product questions | **Seven closed.** Score model, five dimensions, classifications, candidate visibility, shared database, target segment, and the existence of hidden talent, skill relationships, weight tuning, what-if, potential, trajectory, seniority alignment and responsiveness. Five remain and none block the homepage `[01 § 6]` |
| R6 — `SKILL_EDGES` | **Supplied.** `[OVERVIEW]` § 6 gives three: TypeScript↔JavaScript, Docker→Kubernetes, React→Vue. See R5 below for the one confirmation still worth getting |
| R15 — target segment | **Sourced.** 50–500 hires/year, tech-forward, engineering/data/product/design, competitive talent markets `[OVERVIEW]` § 9 |
| The 0–100 vs 0–1 score conflict | **Resolved** in favour of 0–100. `docs/content-integrity.md § 5` can close that checkbox `[00 § 2]` |
| "Ranks every candidate in the database" | **Licensed** `[OVERVIEW]` workflow 1. Pair it with the consent clause `[03 § 2]` |

---

## 2. Blocking

### R3 — Legal sign-off on the trust claims · owner: **Legal + Product**
**The only remaining whole-build blocker, and it is not about whether the code
exists.**

`[OVERVIEW]` § 3 and § 6 confirm fairness monitoring (as a report), a full audit
trail logging the exact weights and skill-level scores at computation time, and
AI-generated hiring decision justification. **All three are live features.**
Publishing claims about them is separately gated: automated hiring tools are
regulated in Transpahire's markets (NYC LL144, EU AI Act, EEOC) and
`docs/content-integrity.md § 4` requires named sign-off.

What sign-off would unlock: the fifth beat of section 11, a fairness section on
`/product/matching`, and a `/responsible-ai` page.

What it does **not** change: the mechanism-not-outcome rule stays either way
`[02 § 9]`. *"Every scoring decision is logged with the weights used"* is a
description. *"Auditable"*, *"compliant"*, *"bias-free"*, *"defensible"* are
promises.

Until then: section 11 stops at four beats, no `/responsible-ai`, and the banned
list in `09 § 1` holds.

### R4 — Real narrative and signal text · owner: **Product** · blocks § 06
**Now the single highest-value item on this list.**

Twenty to thirty real, anonymised AI narratives from the live engine, with the
seniority / trajectory / potential / drop-off values that accompanied them. Its
credibility comes from being genuine output — marketing cannot write this, and
anything marketing writes will read like marketing `[02 § 11]`.

The standard to match, from `[OVERVIEW]`'s own description: two to three
sentences, plain language, saying why the candidate **is or isn't** a fit. The
sentence that makes section 06 work is the inconvenient one — *"salary expectation
sits above the band"*, *"no direct Kubernetes"*. Ask for examples that include a
reservation, not the flattering ones.

Also needed, same owner, same request: **three candidates whose outcomes
genuinely differ** — one Strong, one Good with two partials, one Potential who is
under-levelled but scores high on potential. The candidate switcher's whole lesson
is that one of the three is not a good hire and the panel says so `[07 § 3]`.

---

## 3. Product content

### R5 — Field and label confirmation · owner: **Product** · blocks all compositions
For each composition in `08`, confirm the field exists and is named as written.
Five specific asks:

1. **The three skill edges** — are TypeScript↔JavaScript, Docker→Kubernetes and
   React→Vue actual relationships in the shipped taxonomy, or illustrative
   examples in the Overview's prose? Section 07 draws the Docker edge as fact
   `[08 § 4]`.
2. **Classification thresholds** — the cut-offs between Strong / Good / Potential
   / Weak. Needed only to ensure the demo's numbers and labels agree; **never
   displayed** `[08 § 1]`.
3. **The `partial` state's UI label** — is it "Partial", "Partial match",
   "Adjacent"? It is the most important word in the composition `[08 § 3]`.
4. **Signal value vocabularies** — the exact strings for seniority alignment,
   career trajectory (four classifications are named; confirm the labels),
   potential and drop-off risk.
5. **The five dimension labels** — confirm they render as *Skill coverage /
   Experience alignment / Location preference / Salary alignment / Semantic
   similarity*, or supply the real UI labels.

### R7 — Sourcing agent and Chrome extension interfaces · owner: **Product** · blocks § 04b only
`[OWNER]` confirms both exist; nothing describes either interface `[01 § 6]` Q2.
Needed to depict: the agent's actual progress strings and its input model; for the
extension, which surfaces it works from and whether it creates or only enriches.

Until then both are **named in copy, not drawn** `[06 § 5]`. This blocks one
optional section and part of one page. Do not let it block `/product/sourcing`,
which has enough confirmed material without it.

### R8 — One real screenshot · owner: **Product + Design** · blocks `/product`
At least one genuine full-app screenshot in the evaluation path. Eight
compositions and zero screenshots reads as a product that does not exist
`[06 § 4]`. Best candidates: the matches screen, or the real dual-mode search at
full density. AVIF/WebP at 2× the rendered size.

### R9 — Analytics figures, or an explicit decision not to show any · owner: **Product**
`[OVERVIEW]` § 3 confirms pool size, score distribution, per-skill coverage,
scarcity index, funnel rates, time-to-hire and prediction accuracy are all
computed. **No real values exist to publish** `[01 § 6]` Q5.

Two places need a number: section 08's what-if readout (`248 → 417`) and C10's
unlock counts (`+8 roles`). Both are currently specified as **labelled examples**.
Either confirm that treatment or supply real anonymised figures. Do not leave them
unlabelled — an unlabelled pool count reads as a product metric.

---

## 4. Marketing content

### R10 — Final copy · owner: **Marketing**
`09` holds candidates and the voice rules. Twelve homepage headlines and ledes,
six pillar descriptions, ten pages of body copy. One serif accent per headline,
falling on the phrase that carries the turn.

**No longer blocked on product validation** — that is the main practical change
`[OVERVIEW]` makes to this document. Copy can start now.

### R11 — Social proof · owner: **Business** · `CONTENT REQUIRED`
Nothing in any source. Nothing may be invented
`docs/content-integrity.md § 1`.

| | Status | Where it would go |
|---|---|---|
| Customer logos | **CONTENT REQUIRED** | Hero strip — currently labelled empty slots, correctly |
| Testimonials | **CONTENT REQUIRED** | A `.pullquote` after § 09 or § 10. Component built |
| Case studies | **CONTENT REQUIRED** | `/customers`, not built `[04 § 3]` |
| Outcome metrics (time saved, quality of hire) | **CONTENT REQUIRED** | A stats section, currently cut entirely `[05 § 1]`. Do not restore it with anything unmeasured |
| Usage numbers | **CONTENT REQUIRED** | Nowhere yet |

**This is now the single biggest conversion gap on the site.** With product truth
settled, third-party proof is the only category of evidence still entirely
missing. The strategy substitutes product specificity `[09 § 2]` — deliberately,
and it is a substitution, not a solution.

### R12 — Demo video · owner: **Marketing** · blocks nothing
The demo section stays cut until a video exists. When it does: WebM + MP4, poster,
**and a caption track — not optional**. Never autoplay.

### R13 — `og:image` · owner: **Design** · blocks indexing
On the gate `docs/content-integrity.md § 5`. Render the § 06 explanation panel
rather than a logo card — it is the one asset that explains the product at
thumbnail size.

---

## 5. Business decisions

### R14 — Pricing · owner: **Business** · `NEEDS BUSINESS VALIDATION`
Recommendation: **deferred, no page** `[04 § 5]` — and `[OVERVIEW]` § 7 now makes
the argument for us: subscription and billing are *"infrastructure waiting to be
activated"*. There is nothing to bill with. Revisit when that ships, because
self-serve requires a price.

### R15 — What a demo actually is · owner: **Business** · blocks § 12 and `/demo`
Section 12's copy promises *"thirty minutes; we run one of your open roles through
the engine"*. That is a commitment. Confirm or replace it. Also: form fields,
routing, who takes the call.

### R16 — Product stage · owner: **Business** · blocks the CTA wording
Pre-GA, GA or beta? Decides between *Get early access* and *Book a demo*
`[09 § 6]`. `[OVERVIEW]` § 7's inactive billing is circumstantial evidence for
pre-GA but not an answer.

### R17 — Company details · owner: **Business** · blocks the footer
Registered name and number, address, contact email. `/about` also needs a real
team.

### R18 — Social accounts · owner: **Business** · blocks the footer
Confirmed handles, or **delete the icons**. Four `href="#"` social links currently
ship.

---

## 6. Legal

### R19 — Privacy policy, terms, cookie policy · owner: **Legal** · blocks launch
Three real documents, not templates. The product processes candidate PII, holds
résumés, computes inferences about people (potential, trajectory, drop-off risk)
and offers candidates privacy controls — all of which the policy has to describe
accurately. Currently three `href="#"` links.

### R20 — Comparison-table basis · owner: **Legal + Product** · blocks `/product/matching`
`[OVERVIEW]` § 9 supplies the category-level basis for each row
`docs/content-integrity.md § 5` requires, which is why the table moved to
`/product/matching` rather than being cut. Two conditions before publishing:
keep claims at **category** level (`[OVERVIEW]` names vendors; the site should
not), and have legal read the "AI screening tools" row, which characterises a
competitor category's scope.

### R21 — The candidate consent story · owner: **Legal + Product** · blocks § 05's clause
`[OVERVIEW]` confirms both a searchable candidate database and per-candidate
privacy controls (public / limited / private). Section 05 states both in one
breath. Confirm the wording — how a candidate ends up visible to an organisation
that did not source them is the question a journalist would ask first.

---

## 7. Brand, design, engineering

### R22 — Confirm Stratum is final · owner: **Brand** · confirm early
The brand system presents four directions. Everything in Phase 1 assumes Stratum.
Changing later is expensive.

### R23 — Nav disclosure menu · owner: **Design + Eng** · blocks the header
`Product ▾` now carries four items and `For teams ▾` two `[04 § 2]`. No such
component exists `docs/components.md`. Build one with a real a11y contract or
flatten to plain links. **Do not ship a hover-only menu.**

### R24 — Four motion primitives · owner: **Eng** · blocks §§ 05–08
P1 meter · P2 sequenced layers · P3 list reorder · P4 path draw. **All four are
now required** — P3 and P4 were conditional before `[OVERVIEW]` ungated sections
07 and 08. Each needs a `motion-lab.html` swatch and a `docs/motion-system.md`
entry **before** use `[07 § 5]`. P4 is a documented exception to the
transform/opacity/filter rule and must be recorded as one, with its six-path cap.

---

## 8. What blocks what

| Section / page | Blocked by | Ships now? |
|---|---|---|
| § 01 Hero | R5 | **Yes** |
| § 02 The gap | — | **Yes** |
| § 03 Interlude | — | **Yes** |
| § 04 The role | R5 | **Yes** |
| § 04b Discovery | **R7** | No — deferred, and optional |
| § 05 The pool | R5, R21 (one clause) | **Yes** |
| § 06 The argument ★ | R5, **R4** | Yes — but **R4 is what makes it good** |
| § 07 Adjacency ★ | R5 (edge confirmation), R24 (P4) | **Yes** |
| § 08 Control ★ | R5, R9 (label the figures), R24 (P3) | **Yes** |
| § 09 The hire | R5 | **Yes** |
| § 10 Both sides | R5 | **Yes** |
| § 11 Philosophy | four beats: none · fifth beat: **R3** | **Yes**, at four beats |
| § 12 CTA | R15, R16 | **Yes**, once the fine print is verifiable |
| `/product`, `/product/matching` | R4, R5, R8, R20 | Mostly |
| `/product/sourcing` | R5; **not** R7 | **Yes**, without the agent depicted |
| `/for-candidates` | R5 | **Yes** |
| `/pricing` | R14 | Not being built |
| Legal pages | **R19** | No |
| **Indexing** | The full gate `docs/content-integrity.md § 5` + R13 | No |

**Every homepage section except the optional § 04b can now be built**, and the
gating has moved from *does the product do this* to *is this the product's exact
wording* (R5) and *may we say it* (R3). That is a much better class of problem,
and it means Track A and Track B in `11 § 2` are no longer serialised.
