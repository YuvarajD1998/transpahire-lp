# Glossary — the words this site uses, and the words it does not

Added in Phase 4. Last reconciled against the product source: **31 August 2026**.

---

## 1. Why this file exists

The product's copy layer bans implementation vocabulary from anything a user
reads, and asserts it in a spec file: `eventCopy.spec.ts` fails if a
user-facing string contains *embedding, vector, prompt, token, model, LLM,
agent, semantic, cosine* or *context window*.

The marketing site should inherit that rule, for a reason that has nothing to do
with taste: **a visitor who converts meets the same words on day one.** A site
that sells "semantic vector matching" to somebody who then logs into a product
that never uses either word has taught them a vocabulary the product will not
answer to.

`tools/check.mjs` enforces the list below over the rendered pages.

---

## 2. Banned in visible copy

Enforced. The check strips comments and scripts first, so a module header may
explain why a word is banned.

| Banned | Say instead |
|---|---|
| embedding | *(nothing — describe what it does: "finds profiles similar to a described requirement")* |
| vector | as above |
| prompt | "what the model was asked" — or omit; a visitor does not need this |
| cosine | never needed on a marketing site |
| context window | never needed on a marketing site |
| LLM | "the model", or name the behaviour instead |

## 3. The three permitted deviations, and why

These three are on the product's list and are **allowed here**. The deviation is
deliberate, and this is the record of it.

| Word | Why it is allowed |
|---|---|
| **agent** | The product's own name for the feature is *Always-On Sourcing*, and the site uses that name for it in headlines. But `/product/sourcing` has to explain what the thing *is*, and "an agent that keeps watching" is the shortest true description available. The product bans it from in-app strings because a user operating the feature does not need to know its architecture; a buyer deciding whether to trust it does. |
| **semantic** | "Semantic similarity" is one of the four weighted dimensions and its weight is published. Renaming a dimension the privacy policy also names would put two vocabularies in play for one number. Used for the dimension and for "semantic search"; not used as a general adjective. |
| **model** | Unavoidable in "what happens when the model changes", which is a section on `/trust` that exists to say the model is versioned and flag-controlled. A site that will not name the thing cannot promise to tell you when it changes. |

**Do not extend this table without the same kind of reason.** Three deviations
with a stated purpose is a considered exception; six is the rule quietly
abandoned.

---

## 4. Product vocabulary the site must use verbatim

Where the product has a word for something, the site uses that word. A visitor
who reads "Weak" here and sees "Possible" there has found a seam.

### Match classification — `BAND_WORD`

| Band | Site and product both say | Never |
|---|---|---|
| ≥ 72 | Strong | |
| ≥ 52 | Good | |
| ≥ 32 | Potential | |
| < 32 | **Possible** | **"Weak"** — a scorer's word. The enum is `WEAK`; nothing a user reads ever says it. |

"Weak" survives in exactly one place: the per-skill **coverage** band table,
where it describes a percentage range (`< 40%`) rather than a person.

### Per-skill coverage

Strong (≥ 75%) · Moderate (40–74%) · Weak (< 40%) · Missing (0)

### Pipeline stages — `candidateCopy.ts`

Sourced · Reviewed · Shortlisted · Interviewing · **Offer out** · Hired ·
**Not moving forward**

Not "Offer". Not "Rejected". And the last one is **neutral in tone, never red**,
on the product's own stated principle: *a candidate who was not right for one
role is not a failure state.*

### Origin

Sourced · Applied · **Sourced, then applied**

Muted tones only. Where somebody came from is not a verdict on them.

### Application status, candidate-facing

Applied · Reviewed · Shortlisted · Interview scheduled · Offer out ·
Offer accepted · Not moving forward · Withdrew

### Mission status — `eventCopy.ts`

| Enum | Word |
|---|---|
| `DRAFT` | Not started |
| `ACTIVE` | **Watching** |
| `PAUSED` | Paused |
| `EXHAUSTED` | **Market covered** |
| `COMPLETED` | Target reached |
| `CANCELLED` | Turned off |

None of them is "complete". A sourcing run that has covered the market has not
finished; it has run out of market.

### Match-explanation relationships — `REL_LABEL`

exact · synonym · ≈ equivalent · broader · narrower · transferable

**Distinct from the taxonomy's edge types**, and the two must not be conflated.
An edge type describes how two skills relate in the graph; a relationship label
describes how a phrase in a profile relates to a phrase in a job.

### Skill relationship types — `SkillRelationType`, all nine

requires · enables · similar to · specialization of · commonly with ·
progression · adjacent · prerequisite of · transferable to

### Job relationship types — `JobRelationType`, all five

specialization of · progresses to · alternate title · similar to ·
cross-functional

### Importance tiers, and their tones

| Tier | Tone |
|---|---|
| Critical | rose (`--state-crit`) |
| Required | amber (`--state-warn`) |
| Preferred | indigo (`--state-info`) |
| Bonus | neutral |

Phase 3 rendered critical in amber, which is the colour the app uses for the
tier below it — so the two most consequential tiers were indistinguishable.

### Account status

Unclaimed · Invited · Activated · Verified · Opted out

---

## 5. Phrases the site retired in Phase 4

Each of these was true when it was written and is false now. `tools/check.mjs`
fails the build if any reappears in `src/`. When you correct a fact, add its old
form to `STALE` in the same commit.

| Retired | Because |
|---|---|
| "five dimensions" | Four are weighted. Salary is a ±10% modifier applied afterwards, so listing it as a peer of skill coverage overstated it roughly sixfold. |
| "consented profiles only" | There are two populations in the candidate database, and the default import path is the second one. |
| "three confirmed edges" / "three relationship types" | Nine, each weighted, plus five over job titles. |
| "Weak Match" | See § 4. |
| "the arithmetic" (as a description of the model) | Wrong word for a weighted model. Prefer **"the working"** or **"the weights"**. Kept in exactly one place — homepage § 08, "It does the arithmetic" — where a slider makes it literal. |
| "Coming soon: notifications / interview scheduling" | Both shipped. Under-claiming a live feature is a defect, not a safe default. |
| "the sourcing agent is named, not depicted" | Its interface is specified in `docs/phase-4.md` § 1.5 and is now drawn. **This still applies to the Chrome extension.** |

---

## 6. House style, unchanged from `DESIGN.md`

- One **Instrument Serif italic** accented phrase per headline, in indigo,
  wrapped in `<em>`. The single most recognisable Transpahire signature.
- Mono for anything that is data; sans for anything that is prose.
- Colour is never the sole carrier of a state — the word rides with it.
- British spelling in prose (*organisation*, *behaviour*). Schema identifiers
  keep their own spelling (`specialization of`, `SPECIALIZATION_OF`), because
  renaming an enum in copy invents a second name for it.
- Sentence case in headlines. Never Title Case.
