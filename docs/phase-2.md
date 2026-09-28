# Phase 2 requirements

What is still needed before the final Transpahire marketing website can be
designed. Phase 1 built the foundation deliberately without answering any of
these — answering them wrongly now would be more expensive than leaving them
open.

---

## 1. What is settled, and what is not

**Settled.** Brand identity and tokens. The design system. The motion system.
Component vocabulary and their accessibility contracts. Architecture and the
migration path. The content-integrity process. Performance and SEO groundwork.

**Not settled — and deliberately so.** What the product does. Who it is for.
The value proposition. Differentiation. The marketing narrative. Information
architecture. Homepage section order. Which pages exist. Copy. Pricing. What
the product visualisations depict.

The dependency runs one way:

```
Product → Users → Problems → Value → Differentiation → Features → Workflows
  → Narrative → IA → Homepage sections → Feature pages → Visualisations
  → Animations → Copy
```

Every Phase 1 decision sits above the first arrow. Nothing below it was guessed.

---

## 2. Blocking — needed before design starts

### 2.1 Product definition

- What does Transpahire do today, in shipped features? Distinguish **shipped /
  beta / roadmap / not planned** for each.
- What is the actual scoring model? Scale, dimensions, how a score is
  presented. **This conflicts across existing sources** — the homepage says
  0–100; the brand system's own mockup shows 0–1 with `Direct fit` /
  `Inferred fit` / `Stretch fit` bands. One is real.
- Is there a shared candidate database, or does each customer bring their own?
  The homepage claims the engine "ranks every candidate in the database", which
  implies a very different product from an ATS add-on.
- What are the real product areas? The tabs currently say Candidate Matching /
  Hiring Pipeline / Analytics.
- What does the product *not* do? Explicit non-capabilities prevent the copy
  drifting into them.

### 2.2 Users

- Primary buyer vs. primary user — are they the same person?
- Are candidates genuinely a served audience, or a feature of the recruiter
  product? The current page gives them equal billing, which is a strong
  positioning claim.
- Company size, hiring volume, industries, geographies. "50–500 roles per year"
  appears on the page unverified.
- Who is displaced — an incumbent ATS, a job board, a spreadsheet, or nothing?

### 2.3 Positioning

- The one-sentence value proposition. The brand system has a candidate:
  *"a single platform for transparent, AI-native recruitment… the structured
  trust that an applicant-tracking system alone can never give them."*
  Confirm or replace it.
- The two or three defensible differentiators. Currently six are claimed.
- Basis for the comparative claims in the comparison table — each row asserts
  something about "Traditional ATS" and "Job boards" as categories.

### 2.4 Content validation

Clear `docs/content-integrity.md` § 5. Every PROVISIONAL item confirmed,
corrected or cut; every PLACEHOLDER removed or replaced.

**Highest priority, because they are the highest risk:**

- The four fabricated statistics and the fabricated testimonial.
- The three fairness / bias / auditability claims — these are regulated
  territory (NYC LL144, EU AI Act, EEOC) and need named sign-off from whoever
  owns legal and product.
- Pricing, or a decision to keep it unpublished.

### 2.5 Product visuals

The single largest gap. Nothing on this site shows the product.

Needed: real screenshots or design files for the dashboard, candidate profile,
score breakdown, search, pipeline, and analytics; a demo video with captions;
and a decision on whether mockups are exported images or composed HTML (the
latter is required for anything that animates internally — see
`product-visualization.md`).

---

## 3. Needed before build

### 3.1 Information architecture

Which pages exist, and what each is for. Candidates:
`/features` `/product` `/solutions` `/pricing` `/about` `/resources` `/blog`
`/contact` `/legal`.

Then: primary nav (four to five items maximum), whether `/solutions` splits by
role or by industry, whether pricing is a page or a section, and whether a blog
is a commitment anyone will maintain.

The page count drives the architecture decision — see `architecture.md` § 1.
More than three pages is the trigger to migrate to Astro.

### 3.2 Homepage narrative

With the above answered, decide the section order. The current sixteen are
provisional; `docs/audit.md` § 5 assesses each for survival. Specific questions:

- Does the page still open on the problem, or lead with the product?
- Do both interludes survive, or does one dilute the other?
- Nine "Coming soon" cards is a lot of "not yet" in one view — reduce to three
  or four?
- Four card grids (problem, features, differentiation, coming soon) is close to
  the point where the page reads as repetitive.
- Is a FAQ warranted? The accordion is built and unused.

### 3.3 Copy

Written against the confirmed product, in the established voice: direct, short
declaratives, one serif-italic accent per headline falling on the phrase that
carries the turn.

### 3.4 Brand and legal

- Confirmed social accounts, or remove the footer icons.
- Privacy policy, terms, cookie policy.
- Company registration details for the footer.
- Whether the Stratum direction is final — the brand system presents four.
- Whether customer logos may be shown, and which.

---

## 4. What Phase 2 should reuse

Do not rebuild these:

| | Reuse |
|---|---|
| Tokens | `assets/css/tokens.css` unchanged. Add tokens; do not add raw values elsewhere |
| Motion | The whole system. Add a primitive only via `motion-lab.html` |
| Components | `docs/components.md` — markup contracts and a11y behaviour |
| Frame system | `.frame` with `--ratio`. The ratio must survive the swap to real media |
| Accessibility | Every semantic decision. Convert markup verbatim if migrating |
| Layer reveal | `data-layers` is built for the product-workflow animation |
| Accordion | Built, accessible, currently unused — ready for a FAQ |
| Content process | The `data-content` classification and the gate |

The two things most likely to be lost by accident during a Phase 2 rebuild are
**the accessibility work** and **`--ratio` on frames**. Both are invisible when
correct and expensive to reinstate.

---

## 5. Suggested sequence

1. **Product documentation** delivered and read.
2. **Content validation** — clear the integrity gate. Nothing ships before this.
3. **Positioning and narrative** — value proposition, differentiators, story.
4. **IA** — pages and navigation. *This is the architecture trigger.*
5. **Architecture decision** — migrate to Astro if the trigger conditions are
   met (`architecture.md` § 1).
6. **Homepage redesign** — section order and copy against the confirmed
   narrative, reusing the existing system.
7. **Product visualisations** — the long pole. Start commissioning at step 1,
   not step 7.
8. **Additional pages.**
9. **Open to indexing** — remove `Disallow: /`, flip every meta robots tag, add
   `og:image`, expand the sitemap, self-host fonts.

Steps 1 and 2 are strictly blocking. Step 7 has the longest lead time and
should run in parallel from the start.

---

## 6. The question to ask first

If only one thing can be answered before Phase 2 begins:

> **What does Transpahire do that a recruiter cannot do with an ATS and a
> LinkedIn seat — and can that be shown in a single screenshot?**

The answer determines the hero, the narrative, and the one product visual that
matters most. Everything else follows from it.
