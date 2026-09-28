# Phase 2 — strategy, architecture and specification

Phase 1 built the foundation. Phase 2 answers what the site should say and how
it should be structured. **Nothing here is implemented.** These eleven documents
are the specification an implementation session reads instead of rediscovering
the strategy.

Read in this order:

| # | Document | Answers |
|---|---|---|
| — | `00-SOURCES.md` | What evidence exists, how strong each piece is, what is missing |
| 01 | `01-PRODUCT_ANALYSIS.md` | What Transpahire actually is |
| 02 | `02-MARKETING_STRATEGY.md` | Category, buyer, problems, differentiation, the "aha" |
| 03 | `03-PRODUCT_PILLARS.md` | The six pillars and feature tiering |
| 04 | `04-INFORMATION_ARCHITECTURE.md` | Pages, navigation, what does not get built |
| 05 | `05-HOMEPAGE_BLUEPRINT.md` | Section-by-section homepage specification |
| 06 | `06-PRODUCT_STORYBOARD.md` | Visual storyboard; product UI vs abstraction per beat |
| 07 | `07-MOTION_STORYBOARD.md` | Motion and interaction per section |
| 08 | `08-PRODUCT_VISUALIZATION_SPEC.md` | Every product composition, in build detail |
| 09 | `09-MESSAGING.md` | Headlines, supporting copy, pillar messaging, CTAs |
| 10 | `10-CONTENT_REQUIREMENTS.md` | Everything still missing, by owner |
| 11 | `11-PHASE_3_PLAN.md` | Implementation roadmap and sequencing |

## Reconciled against the Product Overview — 2026-08-27

These documents were first drafted **before** the Transpahire Product Overview was
supplied, from prototypes and a superseded 2025 specification. All twelve have
since been reconciled against it. What changed:

| | Was | Now |
|---|---|---|
| Score model | 0–10, four dimensions, bands | **0–100, five dimensions, Strong / Good / Potential / Weak** `00 § 2` |
| Candidate view | No number shown, tiers only | **Candidates see the same score and breakdown** |
| Skill states | Covered / missing | **Covered / partial / missing** — the *partial* state is the page's hinge |
| §§ 07 and 08 | Gated; § 07 marked cuttable | **Confirmed. Both are signature moments** |
| § 10 | Built on employer reputation scoring | **Rebuilt** — reputation is not in the Overview `00 § 4` |
| Pillars | 6, with the taxonomy folded into matching | **6, with Skill Intelligence promoted to its own pillar** — it is the moat |
| Blocking items | 3 blocked the whole build | **1**, and it is a legal decision, not a product question |
| Motion primitives | 2 required, 2 conditional | **All 4 required** |

`00-SOURCES.md` § 3 records the four wrong conclusions the earlier evidence
produced, so no future session re-derives them.

## The three rules that govern all of it

1. **Provenance or nothing.** Every claim in these documents carries a source
   tag. Untagged claims are the author's reasoning, not product truth. See
   `00-SOURCES.md` for the tag key.
2. **Capability is settled; permission is not.** `[OVERVIEW]` establishes what the
   product does, which closes most of `docs/content-integrity.md` § 2. It does not
   grant permission to publish regulated claims — fairness, audit, compliance and
   defensibility still need named legal sign-off, and the features existing does
   not change that `02 § 9`.
3. **The design system is settled.** Phase 2 specifies content and composition
   using the existing tokens, components and motion primitives. A specification
   that needs a new primitive says so explicitly and justifies it.
