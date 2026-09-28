# 06 — Product storyboard

The homepage as a sequence of frames, and the medium decision for each.

Reconciled against `[OVERVIEW]`: scores are 0–100 across five dimensions, skills
have three states, and one worked example now runs through the whole page.

---

## 1. The worked example

Earlier drafts used a different candidate in each frame. `[OVERVIEW]` makes
something better possible: **one job, one candidate, one skill, carried across
sections 05 → 06 → 07 → 08.** The example is chosen so that the *partial* skill
state in section 06 is explained by the skill graph in section 07 and re-ranked by
the recruiter in section 08. The page becomes one argument instead of five
demonstrations.

```
THE JOB      Senior Backend Engineer, Payments · Bengaluru · Hybrid · 5–8 yrs
             critical    Python · Distributed Systems
             required    PostgreSQL · Kubernetes
             preferred   Kafka
             bonus       AWS

THE PERSON   Sneha Iyer · Staff Engineer, PhonePe · 6.2 yrs · Bengaluru
             has         Python · PostgreSQL · Distributed Systems · Docker · AWS · Terraform
             lacks       Kubernetes (but has Docker) · Kafka

THE HINGE    Kubernetes is scored PARTIAL, not MISSING, because the taxonomy
             knows Docker is a prerequisite for Kubernetes — [OVERVIEW] § 6's own
             example. Section 06 shows the partial. Section 07 shows why.
```

Use `[OVERVIEW]`'s three confirmed skill edges and no others: TypeScript↔
JavaScript, **Docker→Kubernetes**, React→Vue `[03 § 2]`.

**Note on numbers.** `[OVERVIEW]` gives the 0–100 scale and the four
classifications but **not the thresholds** between them. Never display a
threshold, a cut-off, or a rule like "80+ is Strong" — show the score and the
classification the product returned, nothing else. Minor open question; see
`08 § 1`.

---

## 2. The storyboard

```
┌─ 01 ─────────────────────────────────┐   ┌─ 02 ─────────────────────────────────┐
│  Every shortlist                     │   │  Finding people is easy now.         │
│  explains itself.                    │   │  Knowing who fits isn't.             │
│                                      │   │                                      │
│  ┌────────────────┬───────────────┐  │   │  ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ ● S. Iyer   87 │  87 · Strong  │  │   │  │volume│ │guess │ │memory│          │
│  │   R. Verma  81 │  ▓▓▓▓▓▓▓▓░ 84 │  │   │  └──────┘ └──────┘ └──────┘          │
│  │                │  ▓▓▓▓▓▓▓▓▓ 91 │  │   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓     │
│  │                │  ✓ 3 covered  │  │   │  ┃ a ranked list you cannot    ┃     │
│  │                │  ≈ 1 partial  │  │   │  ┃ interrogate is a guess with ┃     │
│  │                │               │  │   │  ┃ better manners        (ink) ┃     │
│  └────────────────┴───────────────┘  │   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     │
│  [Book a demo]  See how matching →   │   │                                      │
└──────────────────────────────────────┘   └──────────────────────────────────────┘

┌─ 03 ── ink ──────────────────────────┐   ┌─ 04 ─────────────────────────────────┐
│                                      │   │  It reads the role     ┌───────────┐ │
│      A score you cannot question     │   │  before it reads       │ CRITICAL  │ │
│      is an opinion with a            │   │  a résumé.             │ Python    │ │
│      number on it.                   │   │                        │ Dist Sys  │ │
│                                      │   │  four tiers of         │ REQUIRED  │ │
│                    (type only)       │   │  importance, not       │ Postgres  │ │
│                                      │   │  a list of words       │ K8s       │ │
│                                      │   │                        │ PREFERRED │ │
│                                      │   │  ┌ filters ⇄ describe ┐│ Kafka     │ │
│                                      │   │  │ "senior python eng"││ BONUS     │ │
│                                      │   │  └────────────────────┘│ AWS       │ │
└──────────────────────────────────────┘   └───────────────────────└───────────┘─┘

┌─ 05 ── bone ─────────────────────────────────────────────────────────────────┐
│  Nobody gets skipped, and nobody gets a free pass.        14 strong · 11 good │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │  87  Sneha Iyer       Staff Engineer · PhonePe    6.2y  Bengaluru  Strong │ │
│  │  81  Rahul Verma      SDE III · Razorpay          5.4y  Bengaluru  Strong │ │
│  │  78  Priya Nair       Backend Eng · Zoho          4.9y  Chennai    Good   │ │
│  │  74  Rishav Ranjan    SDE II · Flipkart           4.1y  Bengaluru  Good   │ │
│  │  61  Vikram Singh     SDE I · Myntra              2.3y  Bengaluru  Potential│
│  └──────────────────────────────────────────────────────────────────────────┘ │
│           every candidate in the database · consented profiles only           │
└───────────────────────────────────────────────────────────────────────────────┘
                        rows arrive in rank order, 120ms apart
                                       │
                    a row is selected and the view opens into it
                                       ▼
┌─ 06 ── ★ SIGNATURE ──────────────────────────────────────────────────────────┐
│  The score shows its work.                                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │  Sneha Iyer · Staff Engineer · PhonePe · Bengaluru      87  Strong Match │  │
│  │  ── MATCH BREAKDOWN ───────────────────────────────────────────────────  │  │
│  │  Skill coverage        ▓▓▓▓▓▓▓▓░░  84                                   │  │
│  │  Experience alignment  ▓▓▓▓▓▓▓▓▓░  91                                   │  │
│  │  Location preference   ▓▓▓▓▓▓▓▓▓▓ 100                                   │  │
│  │  Salary alignment      ▓▓▓▓▓▓▓░░░  76                                   │  │
│  │  Semantic similarity   ▓▓▓▓▓▓▓▓▓░  93                                   │  │
│  │  ── SKILLS ────────────────────────────────────────────────────────────  │  │
│  │  ✓ Covered    Python · PostgreSQL · Distributed Systems                 │  │
│  │  ≈ Partial    Kubernetes                            ← arrives alone     │  │
│  │               Docker experience transfers                                │  │
│  │  ✗ Missing    Kafka  (preferred)                                        │  │
│  │  + Bonus      AWS · Terraform                                           │  │
│  │  ── WHY ───────────────────────────────────────────────────────────────  │  │
│  │  Six years on payment infrastructure at PhonePe, covering both critical  │  │
│  │  skills. No direct Kubernetes, but deep Docker work makes the ramp       │  │
│  │  short. Salary expectation sits above the band.                         │  │
│  │  ── SIGNALS ───────────────────────────── arrive last, after a pause ──  │  │
│  │  Seniority   slightly over-levelled     Potential  high                 │  │
│  │  Trajectory  consistent growth          Drop-off   moderate             │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
│  ( Sneha Iyer )  ( Priya Nair )  ( Vikram Singh )    ← the visitor switches   │
│  How the match is calculated →                                                │
└───────────────────────────────────────────────────────────────────────────────┘
                     "why was Kubernetes partial, not missing?"
                                       ▼
┌─ 07 ── bone ── ★ SIGNATURE ──────────────────────────────────────────────────┐
│  Your filter said no. The skills said otherwise.                              │
│                                                                               │
│                      REQUIRED                                                 │
│                     Kubernetes                                                │
│                          ▲                                                    │
│                    requires │                                                 │
│                          │                                                    │
│                       Docker  ──similar to──  containerd                      │
│                          ▲                                                    │
│                     ON PROFILE                                                │
│                     Sneha Iyer                                                │
│                                                                               │
│   typed · hierarchical · related by requires / enables / similar to           │
│   → scored PARTIAL, not MISSING.  Sneha stays at #1 instead of dropping to #9  │
└───────────────────────────────────────────────────────────────────────────────┘

┌─ 08 ── ★ SIGNATURE ──────────────────────────────────────────────────────────┐
│  You decide what counts. It does the arithmetic.                              │
│  ┌──────────────────────┐   ┌────────────────────────────────────────────┐    │
│  │ Python               │   │  87  Sneha Iyer            Strong           │    │
│  │ ●▔▔▔▔  critical      │   │  81  Rahul Verma           Strong      ↑↓   │    │
│  │ Kubernetes           │   │  78  Priya Nair            Good             │    │
│  │ ▔▔●▔▔  required      │   │  74  Rishav Ranjan         Good             │    │
│  │ Kafka                │   │                                             │    │
│  │ ▔▔▔▔●  preferred     │   │  list reorders · scores recompute           │    │
│  ├──────────────────────┤   └────────────────────────────────────────────┘    │
│  │ WHAT IF              │                                                     │
│  │ drop Kafka  [ on ]   │   qualified pool   248 ──► 417   (+169)             │
│  └──────────────────────┘   test it before you change the job                 │
└───────────────────────────────────────────────────────────────────────────────┘

┌─ 09 ── bone ─────────────────────────────────────────────────────────────────┐
│  From shortlist to signed.                                                    │
│   open ──────── move ──────── meet ──────── decide      (hairline connector)   │
│  SOURCED → REVIEWED → SHORTLISTED → INTERVIEWING → OFFER → HIRED              │
│      4         7            3             2          1                        │
│                    [card advances one column, once]                           │
│              your stages, your names, your order                              │
└───────────────────────────────────────────────────────────────────────────────┘

┌─ 10 ─────────────────────────────────────────────────────────────────────────┐
│  The person you passed on can see why.                                        │
│  ┌─── what Sneha sees ───────────────┐   ┌─── and what to do about it ─────┐  │
│  │  Senior Backend Engineer          │   │  RÉSUMÉ QUALITY      62 / 100   │  │
│  │  Payments · Bengaluru             │   │  5 suggestions                  │  │
│  │                                   │   │                                 │  │
│  │      87   STRONG MATCH            │   │  SKILLS THAT WOULD OPEN MORE    │  │
│  │      the same score               │   │  Kubernetes   +8 roles   High   │  │
│  │                                   │   │  Kafka        +5 roles   High   │  │
│  │  WHERE YOU FIT                    │   │  Go           +3 roles   Medium │  │
│  │  Skill coverage           84       │   │                                 │  │
│  │  Experience alignment     91       │   │  YOUR APPLICATION               │  │
│  │  WHERE YOU DON'T                  │   │  Applied → Viewed → Shortlisted │  │
│  │  Salary alignment         76       │   │                                 │  │
│  │  ≈ Kubernetes — Docker transfers  │   │  no silence, no guessing        │  │
│  └───────────────────────────────────┘   └─────────────────────────────────┘  │
│  How it works for candidates →                                                │
└───────────────────────────────────────────────────────────────────────────────┘

┌─ 11 ── ink ──────────────────────────┐   ┌─ 12 ── indigo ───────────────────────┐
│   RECOMMENDS    it ranks the pool    │   │                                      │
│   EXPLAINS      it shows the         │   │      Bring a role you're             │
│                 arithmetic           │   │      struggling to fill.             │
│   YOU REVIEW    you read the case    │   │                                      │
│   YOU DECIDE    and you can change   │   │      [Book a demo]  [See matching]   │
│                 the inputs           │   │                                      │
│                                      │   │                                      │
│   A recommendation you can argue     │   │                                      │
│   with is the only kind worth having.│   │                                      │
└──────────────────────────────────────┘   └──────────────────────────────────────┘
```

**All people and companies above are invented**, per
`docs/product-visualization.md` § 6. Sneha Iyer, Rahul Verma, Priya Nair and the
rest come from the prototype's invented data set. Keep them invented; never a
real name, never a real employer logo.

**The `248 → 417` figures in section 08 are illustrative and must be labelled as
an example**, or replaced with product-supplied numbers. They are the one place
on the page where a quantity appears, and the what-if readout only works with
one. See `10 § R5`.

---

## 3. Medium decision — per concept

Brief § 27. The rule: **product UI when showing functionality; abstraction only
when it communicates something product UI cannot**
`docs/product-visualization.md` § 3.

| Concept | Medium | Why |
|---|---|---|
| Ranked candidate list | **REAL PRODUCT UI** (composed HTML) | It is the product. Also animates internally, which rules out an image |
| Explanation panel | **REAL PRODUCT UI + INTERACTIVE** | The claim is "you can inspect it" — a static image makes that claim without honouring it |
| The requisition + dual-mode search | **REAL PRODUCT UI** | Four-tier importance and both search modes are LIVE `[OVERVIEW]` § 3 |
| **Skill relationships** | **ABSTRACT SYSTEM DIAGRAM** | The relationship is a property of the taxonomy. No screen displays a graph, and inventing one would fabricate product UI. The one legitimate abstraction on the page — and now the one with the strongest warrant, because the capability is confirmed |
| Weight tuning + what-if | **INTERACTIVE PRODUCT DEMO** | Reordering must be operable to land. Both LIVE |
| Pipeline | **SIMPLIFIED PRODUCT UI** | Stages and customisation are LIVE; keep it schematic because the section's job is reassurance `[05 § 2]` |
| Candidate's view | **REAL PRODUCT UI** | Same score, same dimensions — LIVE |
| Résumé quality + skill gaps | **REAL PRODUCT UI** | Critique, score, suggestions and unlock counts all LIVE |
| Trust philosophy | **TYPOGRAPHIC COMPOSITION** | A stance, not a feature `[02 § 9]` |
| Problem framing (§ 02) | **TYPOGRAPHIC COMPOSITION** | The ink statement already works as type `docs/audit.md § 5` |
| AI Sourcing Agent | **COPY ONLY — no medium** | Exists `[OWNER]`; interface undescribed. Name it, do not draw it. See § 4 |
| Chrome Extension | **COPY ONLY**, later an **ABSTRACT FLOW** | Same, and never depict a named external site |
| Employer reputation | **NOTHING** | Not in `[OVERVIEW]`. Removed from the homepage `[00 § 4]` |
| Any analytics figure | **NOTHING** | The modules compute real numbers; none exist to show `[01 § 6]` Q5 |
| Customers, logos, faces | **NOTHING** | `CONTENT REQUIRED` |
| Video | **LATER** | None exists |
| Static illustration | **NOWHERE** | `DESIGN.md § 10` rejects decorative illustration, and every concept above has a better medium |

**Composed HTML is the default**, not a fallback: no request, crisp at every
density, inherits the site's tokens so it cannot drift stylistically, animates per
element, themeable `docs/product-visualization.md § 2`. Six of the built
compositions animate internally, which decides it for them.

---

## 4. Screenshot vs composition

A real screenshot beats a composition for conviction and loses on everything
else.

| Use a **screenshot** for | Use a **composition** for |
|---|---|
| `/product` — one full-app view establishing that the software exists | Anything on the homepage |
| `/product/candidate-intelligence` — the profile at full complexity | Anything that animates |
| `/product/sourcing` — the real dual-mode search at full density | Anything cropped to one focal point |
| Analytics surfaces, which cannot be honestly rebuilt without real figures | Anything a visitor operates |

**Rule:** the site needs **at least one real screenshot** in the evaluation path.
Ten compositions and zero screenshots reads as a product that does not exist.
Highest-value single asset request in `10`.

---

## 5. The two copy-only capabilities

`[OWNER]` confirms the **AI Candidate Sourcing Agent** and the **Chrome
Extension** exist. No source describes either interface `[01 § 6]` Q2.

**What this licenses:** naming them, describing what they are for, and listing
them on `/product/sourcing`. A recruiter reading *"or let the sourcing agent work
the brief for you"* learns something true.

**What it does not license:** depicting them. The brief's sketched agent
sequence — *"Understanding requirements… Finding relevant talent… Expanding
related skills… Ranking candidates…"* — is four specific claims about stages
nobody has confirmed, and drawing it commits the product to that decomposition.
`docs/product-visualization.md` § 1 names this exact trap: a rendered UI that does
not correspond to what the product does is *"a lie with a design budget"*.

**When the interface is known:** insert section 04b, spec `08 § 7`, promote it to a
signature moment, and use the product's own stage strings. For the extension,
constrain to an abstract flow — `external profile → Transpahire → new or enriched`
— with the external end deliberately unbranded, because naming or drawing
LinkedIn or a job board implies a supported integration, and `[OVERVIEW]` § 7 puts
every integration in upcoming.

---

## 6. Asset inventory

Ten compositions cover twelve homepage sections and five other pages.

| Composition | Spec | Homepage | Elsewhere |
|---|---|---|---|
| C1 Ranked candidate list | `08 § 2` | 01 (crop), 05 (full), 08 (live) | `/product`, `/product/matching`, `/for-teams` |
| C2 Explanation panel | `08 § 3` | 01 (crop), 06 (full) | `/product/matching` (full+), `/for-teams` |
| C3 Skill relationship graph | `08 § 4` | **07** | `/product/matching` |
| C4 Weight + what-if controls | `08 § 5` | **08** | `/product/matching` |
| C5 Requisition + dual search | `08 § 6` | 04 | `/product`, `/product/sourcing`, `/for-teams` |
| C6 Sourcing agent | `08 § 7` | 04b `[deferred]` | `/product/sourcing` |
| C7 Pipeline | `08 § 8` | 09 | `/product`, `/for-teams` |
| C8 Candidate match view | `08 § 9` | 10 (left) | `/for-candidates` (full feed) |
| C9 *(withdrawn — employer reputation)* | — | — | See `[00 § 4]` |
| C10 Résumé quality + skill gaps | `08 § 11` | 10 (right) | `/for-candidates` (primary) |

**Built for the homepage: C1, C2, C3, C4, C5, C7, C8, C10** — eight compositions,
all on LIVE capability, none gated. C6 is deferred; C9 is withdrawn.

That is two more than the pre-Overview plan, and both additions (C3, C4) are
signature moments. `11 § 4` sequences them so the page is shippable before they
land.
