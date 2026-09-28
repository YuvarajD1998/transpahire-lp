/**
 * product-demo.js — the single source of every value in every product
 * composition on the site.
 *
 * Specified by docs/phase-2/08-PRODUCT_VISUALIZATION_SPEC.md § 1, built to the
 * worked example in docs/phase-2/06-PRODUCT_STORYBOARD.md § 1.
 *
 * Why this file exists
 * --------------------
 * `87` appears in sections 01, 05, 06, 08 and 10 of the homepage and again on
 * four other pages. That is one value read ten times. Hand-typing it guarantees
 * divergence, and a divergence here is the most visible possible defect
 * (`07 § 7`). Every composition — rendered into static HTML by tools/build.mjs,
 * and mutated at runtime by the two interactive modules — reads from here.
 *
 * Rules this file is bound by
 * ---------------------------
 *   1. Every FIELD must exist in the Transpahire Product Overview. A field the
 *      Overview does not name is a field the product may not have.
 *   2. Every PERSON and COMPANY is invented, and obviously so. Never a real
 *      name, never a real employer logo. (docs/product-visualization.md § 6)
 *   3. Only the three CONFIRMED skill edges may appear anywhere:
 *      TypeScript↔JavaScript, Docker→Kubernetes, React→Vue. An invented edge is
 *      an invented capability (`08 § 4`).
 *   4. No classification THRESHOLD is ever displayed. The Overview does not
 *      publish the cut-offs; the score and the classification the product
 *      returned are shown, never a rule.
 *   5. The two quantities that read as analytics — the what-if pool figures and
 *      C10's unlock counts — carry a visible "example" label (`10 § R9`).
 *
 * Status: PROVISIONAL. The narratives and signal strings below are written to
 * the standard `[OVERVIEW]` describes rather than taken from the live engine.
 * `10 § R4` asks Product for twenty to thirty real anonymised narratives; when
 * they arrive, only this file changes. Nothing else on the site holds a value.
 */

/* --------------------------------------------------------------------------
   THE JOB — one requisition, skills in the product's four importance tiers.
   -------------------------------------------------------------------------- */

export const JOB = {
  id: 1042,
  title: 'Senior Backend Engineer, Payments',
  department: 'Engineering',
  employment: 'Full Time',
  level: 'Senior',
  mode: 'Hybrid',
  location: 'Bengaluru, India',
  locationShort: 'Bengaluru',
  experience: '5–8 yrs',
  salary: '₹45–65L',
  status: 'PUBLISHED',
  route: 'app.transpahire.com / jobs / 1042',
  matchesRoute: 'app.transpahire.com / jobs / 1042 / matches',

  /* PHASE 5 — the three fields the job header needs and did not have
     (`docs/phase-5.md` § 2.3). `salaryVisible` is a real control on the
     requisition, not a presentation choice: the product shows an eye or a
     crossed eye beside the band to say whether a candidate can see it, and a
     composition that draws the band with no glyph silently drops a feature.
     `seniorityTone` is the app's own tone map — amber for SENIOR, violet for
     LEAD and PRINCIPAL — so the pill is coloured by the data rather than by
     the caller. */
  publishedAgo: '3w ago',
  salaryVisible: true,
  seniorityTone: 'amber',

  /* The four tiers are the load-bearing element: they are what section 08's
     controls manipulate and what the whole ranking is measured against. */
  tiers: [
    { key: 'critical',  label: 'Critical',  skills: ['Python', 'Distributed Systems'] },
    { key: 'required',  label: 'Required',  skills: ['PostgreSQL', 'Kubernetes'] },
    { key: 'preferred', label: 'Preferred', skills: ['Kafka'] },
    { key: 'bonus',     label: 'Bonus',     skills: ['AWS'] },
  ],

  /* Both search modes are LIVE and work side by side in one interface. */
  search: {
    modes: [
      { key: 'filters',  label: 'filters' },
      { key: 'describe', label: 'describe' },
    ],
    example: 'senior python engineer, payments, 5+ years, Bengaluru',
    filters: ['Python', '5–8 yrs', 'Bengaluru', 'Hybrid', 'Open to work'],
  },

  /* Counts inside the demo pool. Illustrative, like every figure in a
     composition — the frame footer says so.

     The four bands sum to `total`, because `poolBands()` renders them as one
     ordered stacked bar and a bar whose segments do not sum is a lie about a
     proportion. `gated` sits OUTSIDE the total on purpose: a candidate dropped
     by the critical gate was never scored, so counting them among the scored
     would contradict § 1.1. */
  pool: { total: 47, strong: 14, good: 11, potential: 15, possible: 7, gated: 6 },
};

/* --------------------------------------------------------------------------
   THE FOUR WEIGHTED DIMENSIONS — `docs/phase-4.md` § 1.1, read out of
   `ranker.service.ts:12` on 31 Aug 2026.

   The site claimed "five dimensions" [STALE-OK] for the whole of Phase 3, with
   salary among them. That was wrong in a way that mattered: salary is a ±10%
   adjustment
   applied AFTER the weighted score, so listing it as a peer of skill coverage
   overstated it by roughly a factor of six and understated the one number that
   carries the model.

   The weight IS the story. Skills dominate, and the site now says so.
   -------------------------------------------------------------------------- */

export const DIMENSIONS = [
  { key: 'skill',      label: 'Skill coverage',       weight: 0.65 },
  { key: 'semantic',   label: 'Semantic similarity',  weight: 0.25 },
  { key: 'experience', label: 'Experience curve',     weight: 0.07 },
  { key: 'location',   label: 'Location & work mode', weight: 0.03 },
];

/* Applied AFTER the weighted score, in this order. NOT dimensions, and the
   compositions must never render them as peers of the four above. */
export const MODIFIERS = [
  { key: 'salary',    label: 'Salary alignment', shape: '±10%',
    note: 'Moves the total by at most a tenth, either way.' },
  { key: 'rarity',    label: 'Skill rarity',     shape: '×',
    note: 'A scarce skill lifts the score.' },
  { key: 'seniority', label: 'Seniority',        shape: '×',
    note: 'Over- or under-levelling adjusts the total.' },
];

/* The gate runs BEFORE scoring, at the retrieval layer. A disqualified
   candidate is never scored at all — which is why `criticalGate()` renders a
   struck score rather than a low one. */
export const CRITICAL_GATE = {
  label: 'Critical gate',
  line: 'A candidate missing a critical skill never reaches the scorer.',
  recorded: 'Which requirement dropped them is recorded.',
};

/* The published thresholds. Phase 3 refused to show these on the grounds that
   the Overview did not publish them; the source does, and a score you can
   reproduce is a score you can argue with. */
export const BANDS = [
  { key: 'strong',    label: 'Strong',    min: 72 },
  { key: 'good',      label: 'Good',      min: 52 },
  { key: 'potential', label: 'Potential', min: 32 },
  { key: 'possible',  label: 'Possible',  min: 0  },
];

/* Per-skill coverage bands — `explainability.service.ts:226`. "Weak" survives
   here and nowhere else: here it describes a percentage band, not a person. */
export const COVERAGE_BANDS = [
  { label: 'Strong',   range: '≥ 75%' },
  { label: 'Moderate', range: '40–74%' },
  { label: 'Weak',     range: '< 40%' },
  { label: 'Missing',  range: '0' },
];

/* The candidate-side split. `fit` holds dimension keys, `gap` holds MODIFIER
   keys — the two are rendered differently on purpose, because a modifier that
   looks like a dimension is the defect this file was restructured to fix. */
export const FIT_SPLIT = {
  fit: ['skill', 'semantic', 'experience', 'location'],
  gap: ['salary'],
};

/* --------------------------------------------------------------------------
   SKILL STATES — four visual states, three of them scored.
   The `partial` glyph must be visually distinct from both others: it is the
   product's most distinctive single element and the hinge of the homepage.
   -------------------------------------------------------------------------- */

export const SKILL_STATES = {
  covered: { glyph: '✓', label: 'Covered', word: 'covered' },
  partial: { glyph: '≈', label: 'Partial', word: 'partial match' },
  missing: { glyph: '✗', label: 'Missing', word: 'missing' },
  bonus:   { glyph: '+', label: 'Bonus',   word: 'bonus' },
};

/* --------------------------------------------------------------------------
   THE FOUR SIGNALS — the things a recruiter could not have derived by reading
   the CV. They arrive last in the section 06 sequence, and that is the point.
   -------------------------------------------------------------------------- */

export const SIGNALS = [
  { key: 'seniority',  label: 'Seniority' },
  { key: 'trajectory', label: 'Trajectory' },
  { key: 'potential',  label: 'Potential' },
  { key: 'dropoff',    label: 'Drop-off' },
];

/* --------------------------------------------------------------------------
   THE SKILL GRAPH — `docs/phase-4.md` § 1.2.

   Nine relationship types, each carrying a strength float and a bidirectional
   flag. Phase 3 shipped three, because three was all the planning document
   confirmed; the schema has nine, and a site that shows three of nine
   understates the one asset a competitor could not rebuild.

   The three worked examples the narrative depends on are unchanged — the
   Docker → Kubernetes edge is what makes the partial state legible — and two
   more are added to demonstrate types the site has never mentioned.
   -------------------------------------------------------------------------- */

export const SKILL_EDGES = [
  { from: 'Docker',     to: 'Kubernetes', type: 'requires',        primary: true,
    strength: 0.9,  reading: 'Docker is a prerequisite for Kubernetes' },
  { from: 'TypeScript', to: 'JavaScript', type: 'similar to',      primary: false,
    strength: 0.85, reading: 'TypeScript relates to JavaScript' },
  { from: 'React',      to: 'Vue',        type: 'transferable to', primary: false,
    strength: 0.7,  reading: 'React transfers to Vue' },
  { from: 'Kafka',      to: 'RabbitMQ',   type: 'adjacent',        primary: false,
    strength: 0.6,  reading: 'Kafka sits adjacent to RabbitMQ' },
  { from: 'Senior BE',  to: 'Staff Eng',  type: 'progression',     primary: false,
    strength: 0.8,  reading: 'Senior progresses to Staff', role: true },
];

/** `SkillRelationType`, all nine. The type is the capability. */
export const EDGE_TYPES = [
  'requires', 'enables', 'similar to', 'specialization of', 'commonly with',
  'progression', 'adjacent', 'prerequisite of', 'transferable to',
];

/** `JobRelationType` — job titles carry their own graph on top of the skills. */
export const ROLE_EDGE_TYPES = [
  'specialization of', 'progresses to', 'alternate title', 'similar to',
  'cross-functional',
];

/** The taxonomy is versioned, and the supporting models are worth naming. */
export const TAXONOMY = {
  models: [
    'SkillTaxonomy', 'SkillSynonym', 'SkillCluster', 'SkillClusterMember',
    'SkillOntologyVersion', 'NonTaxonomySkill', 'SemanticDuplicateSuggestion',
    'JobDesignationTaxonomy', 'JobDesignationSynonym',
  ],
  versioned: true,
};

/* --------------------------------------------------------------------------
   THE CANDIDATES — six, invented, with full match objects.

   Deliberately chosen so the parts disagree: nobody here has five high
   dimensions. Sneha's 76 on salary beside four high numbers is the panel
   telling the recruiter something inconvenient, which is the whole point of a
   breakdown (`08 § 3`).

   `transfer.basis` records WHY a skill is partial, and only two bases are
   allowed: `edge` — one of the three confirmed taxonomy relationships, and
   `depth` — the candidate's own proficiency/years, which is a confirmed
   profile field. Nothing else may produce a partial.

   `classification` is what `BANDS` gives `score` — Strong ≥ 72, Good ≥ 52,
   Potential ≥ 32, the product's `RankerService.classifyScore`. Settled against
   the source on 28 Sep 2026: 78 and 74 used to ship as "Good" off a private
   80 / 70 / 55 split, contradicting the thresholds this same file publishes.
   tools/check.mjs asserts the two agree.
   -------------------------------------------------------------------------- */

export const CANDIDATES = [
  {
    id: 'c1',
    name: 'Sneha Iyer',
    slug: 'sneha-iyer',
    role: 'Staff Engineer',
    company: 'PhonePe',
    years: 6.2,
    location: 'Bengaluru',
    mode: 'Hybrid',
    score: 87,
    classification: 'strong',
    dimensions: { skill: 84, experience: 91, location: 100, salary: 76, semantic: 93 },
    skills: {
      covered: ['Python', 'PostgreSQL', 'Distributed Systems'],
      partial: [{ name: 'Kubernetes', transfer: 'Docker experience transfers', basis: 'edge' }],
      missing: [{ name: 'Kafka', tier: 'preferred' }],
      bonus:   ['AWS', 'Terraform'],
    },
    narrative:
      'Six years on payment infrastructure at PhonePe, covering both critical skills. ' +
      'No direct Kubernetes, but deep Docker work makes the ramp short. ' +
      'Salary expectation sits above the band.',
    signals: {
      seniority: 'slightly over-levelled',
      trajectory: 'consistent growth',
      potential: 'high',
      dropoff: 'moderate',
    },
  },
  {
    id: 'c2',
    name: 'Rahul Verma',
    slug: 'rahul-verma',
    role: 'SDE III',
    company: 'Razorpay',
    years: 5.4,
    location: 'Bengaluru',
    mode: 'Hybrid',
    score: 81,
    classification: 'strong',
    dimensions: { skill: 88, experience: 80, location: 100, salary: 64, semantic: 79 },
    skills: {
      covered: ['Python', 'PostgreSQL', 'Distributed Systems', 'Kubernetes'],
      partial: [],
      missing: [{ name: 'Kafka', tier: 'preferred' }],
      bonus:   ['AWS'],
    },
    narrative:
      'Five years on payments at Razorpay with every required skill covered, including production Kubernetes. ' +
      'Kafka is absent, though it is only preferred on this role. ' +
      'Salary expectation sits at the very top of the band.',
    signals: {
      seniority: 'well matched',
      trajectory: 'consistent growth',
      potential: 'high',
      dropoff: 'low',
    },
  },
  {
    id: 'c3',
    name: 'Priya Nair',
    slug: 'priya-nair',
    role: 'Backend Engineer',
    company: 'Zoho',
    years: 4.9,
    location: 'Chennai',
    mode: 'Remote',
    score: 78,
    classification: 'strong',
    dimensions: { skill: 76, experience: 74, location: 55, salary: 94, semantic: 86 },
    skills: {
      covered: ['Python', 'PostgreSQL'],
      partial: [
        { name: 'Kubernetes', transfer: 'Docker experience transfers', basis: 'edge' },
        { name: 'Distributed Systems', transfer: 'listed at 2 years against a 5-year band', basis: 'depth' },
      ],
      missing: [{ name: 'Kafka', tier: 'preferred' }],
      bonus:   ['AWS'],
    },
    narrative:
      'Four years of backend work at Zoho covering Python and PostgreSQL, and salary expectations sit comfortably inside the band. ' +
      'Kubernetes is not on the profile, though Docker experience transfers, and distributed-systems depth is listed at two years against a five-year band. ' +
      'Based in Chennai against a Bengaluru hybrid role.',
    signals: {
      seniority: 'slightly under-levelled',
      trajectory: 'consistent growth',
      potential: 'high',
      dropoff: 'low',
    },
  },
  {
    id: 'c4',
    name: 'Rishav Ranjan',
    slug: 'rishav-ranjan',
    role: 'SDE II',
    company: 'Flipkart',
    years: 4.1,
    location: 'Bengaluru',
    mode: 'Hybrid',
    score: 74,
    classification: 'strong',
    dimensions: { skill: 70, experience: 62, location: 100, salary: 78, semantic: 70 },
    skills: {
      covered: ['Python', 'Distributed Systems', 'Kafka'],
      partial: [{ name: 'Kubernetes', transfer: 'Docker experience transfers', basis: 'edge' }],
      missing: [{ name: 'PostgreSQL', tier: 'required' }],
      bonus:   ['AWS'],
    },
    narrative:
      'Four years at Flipkart on Python services with genuine distributed-systems exposure and production Kafka. ' +
      'PostgreSQL is missing — the profile lists MySQL only. ' +
      'Docker work covers part of the Kubernetes requirement.',
    signals: {
      seniority: 'well matched',
      trajectory: 'specialist',
      potential: 'medium',
      dropoff: 'moderate',
    },
  },
  {
    id: 'c5',
    name: 'Meera Krishnan',
    slug: 'meera-krishnan',
    role: 'Platform Engineer',
    company: 'Swiggy',
    years: 3.6,
    location: 'Bengaluru',
    mode: 'Hybrid',
    score: 68,
    classification: 'good',
    dimensions: { skill: 64, experience: 48, location: 100, salary: 88, semantic: 62 },
    skills: {
      covered: ['Kubernetes', 'PostgreSQL'],
      partial: [
        { name: 'Python', transfer: 'listed at 1 year; Go is the primary language', basis: 'depth' },
        { name: 'Distributed Systems', transfer: 'queue-backed services, listed at 1 year against a 5-year band', basis: 'depth' },
      ],
      missing: [{ name: 'Kafka', tier: 'preferred' }],
      bonus:   ['AWS', 'Terraform'],
    },
    narrative:
      'Three years of platform work at Swiggy with strong Kubernetes and PostgreSQL. ' +
      'Python is listed at one year against Go as the primary language, and distributed-systems depth is thin against the band. ' +
      'Availability is immediate and salary expectations are inside the band.',
    signals: {
      seniority: 'slightly under-levelled',
      trajectory: 'pivot',
      potential: 'medium',
      dropoff: 'low',
    },
  },
  {
    id: 'c6',
    name: 'Vikram Singh',
    slug: 'vikram-singh',
    role: 'SDE I',
    company: 'Myntra',
    years: 2.3,
    location: 'Bengaluru',
    mode: 'Hybrid',
    score: 61,
    classification: 'good',
    dimensions: { skill: 46, experience: 31, location: 100, salary: 100, semantic: 58 },
    skills: {
      covered: ['Python', 'PostgreSQL'],
      partial: [
        { name: 'Kubernetes', transfer: 'Docker experience transfers', basis: 'edge' },
        { name: 'Distributed Systems', transfer: 'one service behind a queue, listed at under a year', basis: 'depth' },
      ],
      missing: [{ name: 'Kafka', tier: 'preferred' }],
      bonus:   [],
    },
    narrative:
      'Two years on Python services at Myntra — the core language and the database are covered. ' +
      'Distributed-systems depth is barely there and the role sits two levels above their current title. ' +
      'Potential is high on a consistent-growth trajectory, so this is a stretch rather than a miss.',
    signals: {
      seniority: 'under-levelled',
      trajectory: 'consistent growth',
      potential: 'high',
      dropoff: 'low',
    },
  },
];

/**
 * The three candidates the section 06 switcher offers. Chosen so the outcomes
 * differ meaningfully and one of the three is *not* a good hire — the contrast
 * is the lesson (`07 § 3`).
 *
 *   Sneha  87 Strong · one partial · over-levelled · moderate drop-off risk
 *   Priya  78 Strong · two partials · salary alignment high · under-levelled
 *   Vikram 61 Good   · both criticals only partly covered · a stretch
 *
 * The words are the product's bands (72 / 52 / 32), so two of the three share
 * one. The contrast is carried by the score and the argument, not the chip —
 * which is the section's point: the word is where the reading starts.
 *
 * PHASE 4 CORRECTION. Vikram used to carry a MISSING CRITICAL skill, and so did
 * Meera. Under the real model that person does not appear in this list at all:
 * the critical gate drops them at the retrieval layer before anything is
 * scored (`docs/phase-4.md` § 1.1). Both now carry a thin PARTIAL on the
 * critical instead — still a stretch, still honestly not a hire, and no longer
 * a demonstration of something the engine cannot do. The genuinely gated
 * candidate is `GATED` below, and they have no score because they were never
 * given one.
 */
export const SWITCHER = ['c1', 'c3', 'c6'];

/** Rows shown in the full-width ranked list in section 05. */
export const POOL_ROWS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

/** Rows shown in the hero crop and in section 08's live list. */
export const HERO_ROWS = ['c1', 'c2'];
export const TUNER_ROWS = ['c1', 'c2', 'c3', 'c4', 'c5'];

/* --------------------------------------------------------------------------
   CLASSIFICATIONS — the product's own vocabulary, always paired with the word.
   Colour is never the sole carrier (DESIGN.md § 2).
   -------------------------------------------------------------------------- */

export const CLASSIFICATIONS = {
  strong:    { label: 'Strong Match',    short: 'Strong' },
  good:      { label: 'Good Match',      short: 'Good' },
  potential: { label: 'Potential Match', short: 'Potential' },
  /* Never "Weak". The scorer's enum is WEAK; the product renders it to users as
     "Possible" (`BAND_WORD` in eventCopy.ts), on the stated grounds that "weak"
     is a scorer's word. `docs/phase-4.md` § 1.12. */
  possible:  { label: 'Possible Match',  short: 'Possible' },
};

/* --------------------------------------------------------------------------
   SECTION 08 — the tunable skills, and the precomputed rankings.

   Three controls, each stepping through the product's own four tiers. Moving
   Kubernetes is the interesting one, because sections 06 and 07 just explained
   it; moving Kafka is the one that visibly promotes a different candidate.
   -------------------------------------------------------------------------- */

export const TIER_WORDS = ['bonus', 'preferred', 'required', 'critical'];

export const TUNABLE = [
  { skill: 'Python',     key: 'python',     default: 3 },
  { skill: 'Kubernetes', key: 'kubernetes', default: 2 },
  { skill: 'Kafka',      key: 'kafka',      default: 1 },
];

/** The combination the page loads with — and the one that yields Sneha at 87. */
export const DEFAULT_COMBO = '3-2-1';

/**
 * WHAT-IF — a separate control from tuning, and visually separate on the page:
 * tuning changes the ORDER, simulation changes the POOL. Conflating them in one
 * control loses both ideas (`08 § 5`).
 *
 * Both figures are ILLUSTRATIVE and rendered with a visible example label. No
 * real values exist to publish (`10 § R9`).
 */
export const WHAT_IF = {
  control: 'drop Kafka',
  skill: 'Kafka',
  before: 248,
  after: 417,
  delta: 169,
  note: 'example figures',
};

/* --------------------------------------------------------------------------
   THE CANDIDATE'S SIDE — the same record, rendered from the other direction.

   The rule that carries section 10: IT IS THE SAME 87. Rendering a different
   number, or hiding it, would waste the strongest structural claim on the site.

   Deliberately absent: the AI narrative and the logged weights. Whether
   candidates see those is `01 § 6` Q4, unanswered.
   -------------------------------------------------------------------------- */

export const CANDIDATE_VIEW = {
  candidate: 'c1',
  route: 'app.transpahire.com / jobs / recommended',
  application: ['Applied', 'Viewed', 'Shortlisted'],
  applicationCurrent: 'Shortlisted',
};

/**
 * RÉSUMÉ QUALITY AND SKILL GAPS — C10.
 *
 * The score is deliberately low. A mockup showing 95 has nothing to offer the
 * reader; a 62 with two named suggestions demonstrates the product being
 * useful. Both suggestion examples are [OVERVIEW]'s own.
 *
 * Kubernetes at the top of the gap list closes the loop with sections 06 and 07
 * from the candidate's side — the same skill, seen from three positions.
 *
 * Unlock counts are ILLUSTRATIVE and labelled as such.
 */
export const RESUME = {
  route: 'app.transpahire.com / profile / resume',
  quality: 62,
  suggestionCount: 5,
  suggestions: ['add measurable outcomes', 'reduce generic language'],
  gaps: [
    { skill: 'Kubernetes', unlocks: 8, demand: 'High' },
    { skill: 'Kafka',      unlocks: 5, demand: 'High' },
    { skill: 'Go',         unlocks: 3, demand: 'Medium' },
  ],
  note: 'example figures — unlock counts are illustrative',
};

/* --------------------------------------------------------------------------
   THE PIPELINE — C7. Stage names are the team's own, renameable and
   reorderable. Deliberately schematic: this composition's job is reassurance,
   not depth, and the product positions itself as lighter than an enterprise ATS.

   TWO PHASE 4 CHANGES.

   1. "Offer" became "Offer out" and a seventh stage appeared: "Not moving
      forward", NEUTRAL. Phase 3 hid rejection from the visible flow. The
      product does not, and its reason is better than the omission: "a
      candidate who was not right for one role is not a failure state"
      (§ 1.8). Hiding the stage implied the opposite.

   2. The counts are cumulative — how many reached each stage — and
      ANALYTICS.funnel reads them from here rather than holding a second copy.
      Two sets of stage numbers for one job on one site is exactly the
      divergence this file exists to prevent.
   -------------------------------------------------------------------------- */

export const PIPELINE = {
  route: 'app.transpahire.com / jobs / 1042 / pipeline',
  caption: 'your stages, your names, your order',
  stages: [
    { name: 'Sourced',            count: 47, cards: ['c6'] },
    { name: 'Reviewed',           count: 23, cards: ['c4'] },
    { name: 'Shortlisted',        count:  9, cards: ['c1'], advancing: true },
    { name: 'Interviewing',       count:  4, cards: ['c2'] },
    { name: 'Offer out',          count:  1, cards: [] },
    { name: 'Hired',              count:  0, cards: [] },
    { name: 'Not moving forward', count: 12, cards: [], quiet: true },
  ],
};

/** The four hiring-operations beats section 09 sets in type. */
export const HIRE_STEPS = [
  { key: 'open',   title: 'Open',   body: 'A job goes through approval before it is published. Salary visibility and the assigned team are set on the requisition.' },
  { key: 'move',   title: 'Move',   body: 'Stages are your own — named, ordered and coloured by your team. Both sides can see where an application stands.' },
  { key: 'meet',   title: 'Meet',   body: 'Interview records and structured feedback stay on the application, public to the team or private to the interviewer.' },
  { key: 'decide', title: 'Decide', body: 'Funnel conversion, stage bottlenecks and time-to-hire show whether the process worked, not just whether it finished.' },
];

/**
 * Section 11 — the beats, and the statement that closes them.
 *
 * FIVE beats as of Phase 4. Phase 3 stopped at four because the fifth would
 * have been a fairness claim and `CLAUDE.md` § 7 gated those. § 8.1 of
 * `docs/phase-4.md` draws the distinction that unblocks it: a claim about what
 * the software COMPUTES AND SHOWS is a mechanism claim and is permitted; a
 * claim about the OUTCOME — fair, unbiased, compliant, defensible — is not.
 *
 * The fifth beat below is the first kind, twice over: the language check is a
 * thing the software does, and holding no demographic data is a fact about the
 * schema. Neither is a promise about a result.
 */
export const PHILOSOPHY = [
  { label: 'Recommends', line: 'It ranks the pool.' },
  { label: 'Explains',   line: 'It shows the working.' },
  { label: 'You review', line: 'You read the case.' },
  { label: 'You decide', line: 'And you can change the inputs.' },
  /* `wide` because the line is three times the length of the other four, and a
     fifth equal column would set it at 11 characters a line. It closes the row
     rather than joining it, which is also the right rhetorical shape: it is the
     newest claim and the heaviest one. */
  { label: 'Fairness',   line: 'It reads the job description for language that narrows the pool, and holds no demographic data at all.', wide: true },
];

/* --------------------------------------------------------------------------
   Helpers. Counting what is already in the data is not fabrication; deriving a
   score would be, which is why nothing below computes one.
   -------------------------------------------------------------------------- */

/** @returns {object} the candidate with this id. */
export function candidate(id) {
  const found = CANDIDATES.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown candidate: ${id}`);
  return found;
}

/** The ✓ ≈ ✗ coverage triplet shown on each ranked row. */
export function coverage(c) {
  return {
    covered: c.skills.covered.length,
    partial: c.skills.partial.length,
    missing: c.skills.missing.length,
  };
}

/** "Staff Engineer · PhonePe" */
export function headline(c) {
  return `${c.role} · ${c.company}`;
}

/** Every skill the job asks for, flattened, with its tier. */
export function jobSkills() {
  return JOB.tiers.flatMap((t) => t.skills.map((s) => ({ skill: s, tier: t.key })));
}

/* --------------------------------------------------------------------------
   PRECOMPUTED RANKINGS — one ordering per importance combination.

   Keyed `python-kubernetes-kafka`, each digit a tier index (0 bonus, 1
   preferred, 2 required, 3 critical). Each entry is an ordered list of
   [candidateId, score, classification] — or [candidateId, null, 'gated',
   skill] for a candidate a CRITICAL tier dropped before scoring, sorted last.

   These are AUTHORED FIXTURES, frozen at authoring time by tools/rankings.mjs.
   The site ships no matching arithmetic: a visitor who reverse-engineers a
   demo's maths has learned something false about the product (`08 § 5`).

   Two rules in them are the product's own, settled against the source on
   28 Sep 2026: the critical gate (a missing critical is never scored) and the
   classification (`BANDS`). tools/check.mjs asserts both.
   -------------------------------------------------------------------------- */

export const RANKINGS = {
  '0-0-0': [['c1',69,'good'], ['c3',60,'good'], ['c5',59,'good'], ['c2',58,'good'], ['c4',53,'good'], ['c6',43,'potential']],
  '0-0-1': [['c1',69,'good'], ['c3',60,'good'], ['c5',59,'good'], ['c2',58,'good'], ['c4',56,'good'], ['c6',43,'potential']],
  '0-0-2': [['c1',69,'good'], ['c3',60,'good'], ['c4',60,'good'], ['c5',59,'good'], ['c2',58,'good'], ['c6',43,'potential']],
  '0-0-3': [['c4',69,'good'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '0-1-0': [['c1',70,'good'], ['c5',62,'good'], ['c2',61,'good'], ['c3',61,'good'], ['c4',54,'good'], ['c6',44,'potential']],
  '0-1-1': [['c1',70,'good'], ['c5',62,'good'], ['c2',61,'good'], ['c3',61,'good'], ['c4',57,'good'], ['c6',44,'potential']],
  '0-1-2': [['c1',70,'good'], ['c5',62,'good'], ['c2',61,'good'], ['c3',61,'good'], ['c4',61,'good'], ['c6',44,'potential']],
  '0-1-3': [['c4',70,'good'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '0-2-0': [['c1',71,'good'], ['c5',66,'good'], ['c2',65,'good'], ['c3',62,'good'], ['c4',55,'good'], ['c6',45,'potential']],
  '0-2-1': [['c1',71,'good'], ['c5',66,'good'], ['c2',65,'good'], ['c3',62,'good'], ['c4',58,'good'], ['c6',45,'potential']],
  '0-2-2': [['c1',71,'good'], ['c5',66,'good'], ['c2',65,'good'], ['c3',62,'good'], ['c4',62,'good'], ['c6',45,'potential']],
  '0-2-3': [['c4',71,'good'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '0-3-0': [['c5',75,'strong'], ['c2',74,'strong'], ['c1',71,'good'], ['c3',62,'good'], ['c4',55,'good'], ['c6',45,'potential']],
  '0-3-1': [['c5',75,'strong'], ['c2',74,'strong'], ['c1',71,'good'], ['c3',62,'good'], ['c4',58,'good'], ['c6',45,'potential']],
  '0-3-2': [['c5',75,'strong'], ['c2',74,'strong'], ['c1',71,'good'], ['c3',62,'good'], ['c4',62,'good'], ['c6',45,'potential']],
  '0-3-3': [['c4',71,'good'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '1-0-0': [['c1',72,'strong'], ['c3',63,'good'], ['c2',61,'good'], ['c5',60,'good'], ['c4',56,'good'], ['c6',46,'potential']],
  '1-0-1': [['c1',72,'strong'], ['c3',63,'good'], ['c2',61,'good'], ['c5',60,'good'], ['c4',59,'good'], ['c6',46,'potential']],
  '1-0-2': [['c1',72,'strong'], ['c3',63,'good'], ['c4',63,'good'], ['c2',61,'good'], ['c5',60,'good'], ['c6',46,'potential']],
  '1-0-3': [['c4',72,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '1-1-0': [['c1',73,'strong'], ['c2',64,'good'], ['c3',64,'good'], ['c5',63,'good'], ['c4',57,'good'], ['c6',47,'potential']],
  '1-1-1': [['c1',73,'strong'], ['c2',64,'good'], ['c3',64,'good'], ['c5',63,'good'], ['c4',60,'good'], ['c6',47,'potential']],
  '1-1-2': [['c1',73,'strong'], ['c2',64,'good'], ['c3',64,'good'], ['c4',64,'good'], ['c5',63,'good'], ['c6',47,'potential']],
  '1-1-3': [['c4',73,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '1-2-0': [['c1',74,'strong'], ['c2',68,'good'], ['c5',67,'good'], ['c3',65,'good'], ['c4',58,'good'], ['c6',48,'potential']],
  '1-2-1': [['c1',74,'strong'], ['c2',68,'good'], ['c5',67,'good'], ['c3',65,'good'], ['c4',61,'good'], ['c6',48,'potential']],
  '1-2-2': [['c1',74,'strong'], ['c2',68,'good'], ['c5',67,'good'], ['c3',65,'good'], ['c4',65,'good'], ['c6',48,'potential']],
  '1-2-3': [['c4',74,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '1-3-0': [['c2',77,'strong'], ['c5',76,'strong'], ['c1',74,'strong'], ['c3',65,'good'], ['c4',58,'good'], ['c6',48,'potential']],
  '1-3-1': [['c2',77,'strong'], ['c5',76,'strong'], ['c1',74,'strong'], ['c3',65,'good'], ['c4',61,'good'], ['c6',48,'potential']],
  '1-3-2': [['c2',77,'strong'], ['c5',76,'strong'], ['c1',74,'strong'], ['c3',65,'good'], ['c4',65,'good'], ['c6',48,'potential']],
  '1-3-3': [['c4',74,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '2-0-0': [['c1',76,'strong'], ['c3',67,'good'], ['c2',65,'good'], ['c5',61,'good'], ['c4',60,'good'], ['c6',50,'potential']],
  '2-0-1': [['c1',76,'strong'], ['c3',67,'good'], ['c2',65,'good'], ['c4',63,'good'], ['c5',61,'good'], ['c6',50,'potential']],
  '2-0-2': [['c1',76,'strong'], ['c3',67,'good'], ['c4',67,'good'], ['c2',65,'good'], ['c5',61,'good'], ['c6',50,'potential']],
  '2-0-3': [['c4',76,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '2-1-0': [['c1',77,'strong'], ['c2',68,'good'], ['c3',68,'good'], ['c5',64,'good'], ['c4',61,'good'], ['c6',51,'potential']],
  '2-1-1': [['c1',77,'strong'], ['c2',68,'good'], ['c3',68,'good'], ['c4',64,'good'], ['c5',64,'good'], ['c6',51,'potential']],
  '2-1-2': [['c1',77,'strong'], ['c2',68,'good'], ['c3',68,'good'], ['c4',68,'good'], ['c5',64,'good'], ['c6',51,'potential']],
  '2-1-3': [['c4',77,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '2-2-0': [['c1',78,'strong'], ['c2',72,'strong'], ['c3',69,'good'], ['c5',68,'good'], ['c4',62,'good'], ['c6',52,'good']],
  '2-2-1': [['c1',78,'strong'], ['c2',72,'strong'], ['c3',69,'good'], ['c5',68,'good'], ['c4',65,'good'], ['c6',52,'good']],
  '2-2-2': [['c1',78,'strong'], ['c2',72,'strong'], ['c3',69,'good'], ['c4',69,'good'], ['c5',68,'good'], ['c6',52,'good']],
  '2-2-3': [['c4',78,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '2-3-0': [['c2',81,'strong'], ['c1',78,'strong'], ['c5',77,'strong'], ['c3',69,'good'], ['c4',62,'good'], ['c6',52,'good']],
  '2-3-1': [['c2',81,'strong'], ['c1',78,'strong'], ['c5',77,'strong'], ['c3',69,'good'], ['c4',65,'good'], ['c6',52,'good']],
  '2-3-2': [['c2',81,'strong'], ['c1',78,'strong'], ['c5',77,'strong'], ['c3',69,'good'], ['c4',69,'good'], ['c6',52,'good']],
  '2-3-3': [['c4',78,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '3-0-0': [['c1',85,'strong'], ['c3',76,'strong'], ['c2',74,'strong'], ['c4',69,'good'], ['c5',61,'good'], ['c6',59,'good']],
  '3-0-1': [['c1',85,'strong'], ['c3',76,'strong'], ['c2',74,'strong'], ['c4',72,'strong'], ['c5',61,'good'], ['c6',59,'good']],
  '3-0-2': [['c1',85,'strong'], ['c3',76,'strong'], ['c4',76,'strong'], ['c2',74,'strong'], ['c5',61,'good'], ['c6',59,'good']],
  '3-0-3': [['c4',85,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '3-1-0': [['c1',86,'strong'], ['c2',77,'strong'], ['c3',77,'strong'], ['c4',70,'good'], ['c5',64,'good'], ['c6',60,'good']],
  '3-1-1': [['c1',86,'strong'], ['c2',77,'strong'], ['c3',77,'strong'], ['c4',73,'strong'], ['c5',64,'good'], ['c6',60,'good']],
  '3-1-2': [['c1',86,'strong'], ['c2',77,'strong'], ['c3',77,'strong'], ['c4',77,'strong'], ['c5',64,'good'], ['c6',60,'good']],
  '3-1-3': [['c4',86,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '3-2-0': [['c1',87,'strong'], ['c2',81,'strong'], ['c3',78,'strong'], ['c4',71,'good'], ['c5',68,'good'], ['c6',61,'good']],
  '3-2-1': [['c1',87,'strong'], ['c2',81,'strong'], ['c3',78,'strong'], ['c4',74,'strong'], ['c5',68,'good'], ['c6',61,'good']],
  '3-2-2': [['c1',87,'strong'], ['c2',81,'strong'], ['c3',78,'strong'], ['c4',78,'strong'], ['c5',68,'good'], ['c6',61,'good']],
  '3-2-3': [['c4',87,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
  '3-3-0': [['c2',90,'strong'], ['c1',87,'strong'], ['c3',78,'strong'], ['c5',77,'strong'], ['c4',71,'good'], ['c6',61,'good']],
  '3-3-1': [['c2',90,'strong'], ['c1',87,'strong'], ['c3',78,'strong'], ['c5',77,'strong'], ['c4',74,'strong'], ['c6',61,'good']],
  '3-3-2': [['c2',90,'strong'], ['c1',87,'strong'], ['c3',78,'strong'], ['c4',78,'strong'], ['c5',77,'strong'], ['c6',61,'good']],
  '3-3-3': [['c4',87,'strong'], ['c1',null,'gated','Kafka'], ['c2',null,'gated','Kafka'], ['c3',null,'gated','Kafka'], ['c5',null,'gated','Kafka'], ['c6',null,'gated','Kafka']],
};

/* ==========================================================================
   PHASE 4 — everything the site was missing because the planning document
   froze before the product did.

   Sourced from `docs/phase-4.md` § 1, which was read out of the shipped
   product source on 31 Aug 2026. Where § 1 and `docs/phase-2/` disagree, § 1
   wins; where § 1 and the product source disagree, the source wins and § 1 is
   updated in the same commit.

   The rule from the top of this file still holds and is now easier to keep:
   every FIELD below exists in the product. Every PERSON and COMPANY is
   invented, and obviously so.
   ========================================================================== */

/* --------------------------------------------------------------------------
   THE MATCH EXPLANATION — § 1.7.

   The real panel is richer than the five-bar breakdown the site shipped in
   Phase 3, and better: every concept match cites the section of the profile it
   was drawn from, and clicking it scrolls to the highlighted snippet. The score
   cites its sources. That is the strongest unclaimed beat in the product.

   Why this lives beside CANDIDATES rather than inside them: it is the same
   record read from the recruiter's side, and folding six of these into the
   candidate objects would treble their length while making neither easier to
   check. Single source is preserved — nothing below is duplicated anywhere.
   -------------------------------------------------------------------------- */

/** `CONFIDENCE_STYLE`. Three levels, and the word is never dropped. */
export const CONFIDENCE = {
  HIGH:   { label: 'High',   tone: 'ok' },
  MEDIUM: { label: 'Medium', tone: 'warn' },
  LOW:    { label: 'Low',    tone: 'none' },
};

/**
 * `REL_LABEL`. Deliberately DISTINCT from EDGE_TYPES: the taxonomy's edge types
 * describe how two skills relate in the graph, and these describe how a phrase
 * in a profile relates to a phrase in the job. Conflating them would claim the
 * panel prints taxonomy internals, which it does not.
 */
export const REL_LABELS = ['exact', 'synonym', '≈ equivalent', 'broader', 'narrower', 'transferable'];

/** `evidence.section` — the eight places a match can be drawn from. */
export const EVIDENCE_SECTIONS = [
  'Headline', 'Summary', 'Bio', 'Experience', 'Projects', 'Skills',
  'Education', 'Certifications',
];

/**
 * One panel per switcher candidate. Fields map 1:1 onto `ExplainMatchPanel`:
 *
 *   summary      the two-sentence summary under the ring
 *   confidence   HIGH | MEDIUM | LOW
 *   strong[]     concept matches, rendered as ConceptMatchCard
 *   partial[]    the same card on a muted ground
 *   missing[]    MissingConceptRow
 *   footer       'AI-generated · Cached', with Regenerate available
 *
 * Per concept: `concept` is what the job asked for, `matched` is the phrase in
 * the profile, `rel` is one of REL_LABELS, `section` is one of
 * EVIDENCE_SECTIONS, `verified` means "verified against the candidate's own
 * words", and `quote` is the snippet the card scrolls to.
 */
export const EXPLAIN = {
  c1: {
    confidence: 'HIGH',
    summary:
      'Six years on payment infrastructure covering both critical requirements, with distributed-systems depth evidenced in their own words. ' +
      'No direct Kubernetes and a salary expectation above the band are the two things working against them.',
    strong: [
      { concept: 'Python', matched: 'Python', rel: 'exact', section: 'Skills',
        verified: true, confidence: 96,
        reason: 'Listed as a primary language with six years against it.',
        quote: 'Python · 6 yrs · primary' },
      { concept: 'Distributed Systems', matched: 'ledger sharded across three regions', rel: '≈ equivalent',
        section: 'Experience', verified: true, confidence: 91,
        reason: 'Describes the work rather than naming the skill, and the work is the skill.',
        quote: 'Owned the payment ledger, sharded across three regions with idempotent replay.' },
      { concept: 'PostgreSQL', matched: 'PostgreSQL', rel: 'exact', section: 'Skills',
        verified: true, confidence: 94,
        reason: 'Listed, and used in two of the three roles described.',
        quote: 'PostgreSQL · 6 yrs' },
    ],
    partial: [
      { concept: 'Kubernetes', matched: 'container orchestration', rel: 'transferable',
        section: 'Experience', verified: true, confidence: 78,
        reason: 'Deep Docker work, and the taxonomy holds Docker as a prerequisite for Kubernetes.',
        quote: 'Containerised the settlement services and ran them under Docker Compose in staging.' },
    ],
    missing: [{ concept: 'Kafka', tier: 'preferred' }],
  },

  c3: {
    confidence: 'MEDIUM',
    summary:
      'Four years of backend work covering Python and PostgreSQL, with salary expectations comfortably inside the band. ' +
      'Distributed-systems depth is thin against a five-year band and the role is hybrid in Bengaluru against a Chennai base.',
    strong: [
      { concept: 'Python', matched: 'Python', rel: 'exact', section: 'Skills',
        verified: true, confidence: 93,
        reason: 'Listed as the primary language across the whole history.',
        quote: 'Python · 5 yrs · primary' },
      { concept: 'PostgreSQL', matched: 'multi-tenant billing schema', rel: '≈ equivalent',
        section: 'Experience', verified: true, confidence: 88,
        reason: 'Schema design work described in detail, on Postgres specifically.',
        quote: 'Designed the multi-tenant billing schema and its migration path on Postgres 14.' },
    ],
    partial: [
      { concept: 'Kubernetes', matched: 'container orchestration', rel: 'transferable',
        section: 'Projects', verified: true, confidence: 74,
        reason: 'Docker on a side project; the prerequisite relationship holds, the depth does not.',
        quote: 'Dockerised a side project and deployed it behind a single-node reverse proxy.' },
      { concept: 'Distributed Systems', matched: 'queue-backed service', rel: 'narrower',
        section: 'Experience', verified: true, confidence: 52,
        reason: 'One queue-backed service is narrower than the requirement, at two years against a five-year band.',
        quote: 'Built an invoicing worker behind RabbitMQ, running for two years.' },
    ],
    missing: [{ concept: 'Kafka', tier: 'preferred' }],
  },

  c6: {
    confidence: 'LOW',
    summary:
      'Two years on Python services with the core language and the database both covered and evidenced. ' +
      'Distributed-systems depth is barely present and the role sits two levels above their current title, so this is a stretch rather than a hire.',
    strong: [
      { concept: 'Python', matched: 'Python', rel: 'exact', section: 'Skills',
        verified: true, confidence: 90,
        reason: 'Listed, and the only language in the history.',
        quote: 'Python · 2 yrs' },
      { concept: 'PostgreSQL', matched: 'Postgres', rel: 'synonym', section: 'Skills',
        verified: true, confidence: 86,
        reason: 'Written as "Postgres"; the synonym resolves to the same taxonomy node.',
        quote: 'Postgres · 2 yrs' },
    ],
    partial: [
      { concept: 'Kubernetes', matched: 'container orchestration', rel: 'transferable',
        section: 'Projects', verified: true, confidence: 61,
        reason: 'Docker appears once, in a project rather than in production.',
        quote: 'Packaged the coursework API as a Docker image.' },
      { concept: 'Distributed Systems', matched: 'one service behind a queue', rel: 'narrower',
        section: 'Experience', verified: false, confidence: 38,
        reason: 'A single queue consumer, at under a year, and not described in enough detail to verify.',
        quote: 'Worked on a notifications consumer.' },
    ],
    missing: [{ concept: 'Kafka', tier: 'preferred' }],
  },
};

/** @returns {object} the explanation panel for this candidate. */
export function explain(id) {
  const found = EXPLAIN[id];
  if (!found) throw new Error(`No explanation authored for: ${id}`);
  return found;
}

/** The relationship chips one panel actually used, in REL_LABELS order. */
export function relationshipsUsed(id) {
  const e = explain(id);
  const used = new Set([...e.strong, ...e.partial].map((c) => c.rel));
  return REL_LABELS.filter((r) => used.has(r));
}

/** The footer line the real panel prints. Both halves are states, not claims. */
export const PANEL_FOOTER = { generated: 'AI-generated', cached: 'Cached', action: 'Regenerate' };

/* --------------------------------------------------------------------------
   THE CRITICAL GATE — § 1.1.

   A candidate missing a CRITICAL skill is disqualified at the retrieval layer
   and never reaches the scorer. So this record has no score, and rendering one
   would misrepresent the single most consequential thing the engine does.

   DEVIATION FROM THE PLAN. `docs/phase-4.md` § 3.3 names this person "Vikram
   Nair". There is already a Vikram in CANDIDATES, and two Vikrams one of whom
   was scored and one of whom was not is a composition that teaches the reader
   the opposite of the point. Renamed; nothing else changed.
   -------------------------------------------------------------------------- */

export const GATED = {
  name: 'Aditya Nair',
  role: 'Data Engineer',
  company: 'Freshworks',
  headline: 'Data engineer',
  reason: 'Distributed Systems',
  tier: 'critical',
  verdict: 'Not scored',
};

/* --------------------------------------------------------------------------
   THE JOB → CANDIDATES ROW — § 1.8.

   Five fluid tracks: avatar, name + headline, stage chip, score ring, origin
   and when. Note that REJECTED is NEUTRAL, not red, on the product's own stated
   principle: "a candidate who was not right for one role is not a failure
   state." The site inherits both the label and the tone.
   -------------------------------------------------------------------------- */

export const STAGES = {
  SOURCED:      { label: 'Sourced',            tone: 'none' },
  REVIEWED:     { label: 'Reviewed',           tone: 'none' },
  SHORTLISTED:  { label: 'Shortlisted',        tone: 'info' },
  INTERVIEWING: { label: 'Interviewing',       tone: 'info' },
  OFFER:        { label: 'Offer out',          tone: 'warn' },
  HIRED:        { label: 'Hired',              tone: 'ok' },
  REJECTED:     { label: 'Not moving forward', tone: 'none' },
};

/** Provenance. Muted tones only, never loud — where someone came from is not a
    verdict on them. */
export const ORIGINS = {
  SOURCED:              'Sourced',
  APPLIED:              'Applied',
  SOURCED_THEN_APPLIED: 'Sourced, then applied',
};

/** Application status, candidate-facing. The words a candidate actually reads. */
export const APPLICATION_STATUS = [
  { key: 'SUBMITTED',           label: 'Applied' },
  { key: 'VIEWED',              label: 'Reviewed' },
  { key: 'SHORTLISTED',         label: 'Shortlisted' },
  { key: 'INTERVIEW_SCHEDULED', label: 'Interview scheduled' },
  { key: 'OFFERED',             label: 'Offer out' },
  { key: 'ACCEPTED',            label: 'Offer accepted' },
  { key: 'REJECTED',            label: 'Not moving forward' },
  { key: 'WITHDRAWN',           label: 'Withdrew' },
];

/** Per-row tracking state for the job → candidates list. */
export const ROW_META = {
  c1: { stage: 'SHORTLISTED',  origin: 'APPLIED',              when: '2d' },
  c2: { stage: 'INTERVIEWING', origin: 'SOURCED_THEN_APPLIED', when: '3d' },
  c3: { stage: 'REVIEWED',     origin: 'SOURCED',              when: '4d' },
  c4: { stage: 'REVIEWED',     origin: 'APPLIED',              when: '6d' },
  c5: { stage: 'SOURCED',      origin: 'SOURCED',              when: '1w' },
  c6: { stage: 'SOURCED',      origin: 'SOURCED',              when: '2w' },
};

/* --------------------------------------------------------------------------
   PHASE 5 — the job detail surface, `docs/phase-5.md` § 2.

   Everything below was read out of the product source on 31 Aug 2026 and none
   of it was on the site. It is the difference between a hero that shows six
   names and one that shows the application.
   -------------------------------------------------------------------------- */

/* § 2.2 — `JobPulseStrip`, the page's own declared signature visual. Exactly
   one tile is featured, and it is IN PIPELINE, not APPLICANTS. The product's
   reasoning, worth keeping verbatim because it is an argument for the product:
   applicants is a lifetime total that only ever grows, so a job with 200
   applicants and nobody in play looks healthy right up until you read the
   second tile. Inverting which tile is featured inverts the argument, so
   `featured` lives here and `pulseStrip()` reads it rather than taking it from
   a caller.

   `applicants` is JOB.pool.total by design — the header's "47 applicants" and
   this tile are the same number in the real app, and two 47s that could drift
   apart is exactly what this file exists to prevent. */
export const JOB_PULSE = [
  { key: 'applicants',   label: 'Applicants',   value: JOB.pool.total, featured: false },
  { key: 'inPipeline',   label: 'In pipeline',  value: 12,             featured: true  },
  { key: 'interviewing', label: 'Interviewing', value: 3,              featured: false },
  { key: 'offerOut',     label: 'Offer out',    value: 1,              featured: false },
];

/* § 2.1 — the five job-detail tabs. Sourcing carries a radar glyph in the app.
   Insights has four sub-views (Tuning, Fairness, Funnel, Talent pool) and
   Tuning is deliberately first, "because they are where a recruiter changes the
   shape of the pool rather than just reading it." The sub-views are named in
   copy rather than drawn — a tab strip inside a tab strip at hero size is a
   picture of a navigation, not of a product. */
export const JOB_TABS = [
  { label: 'Overview',   active: false },
  { label: 'Candidates', active: true  },
  { label: 'Sourcing',   active: false, glyph: 'radar' },
  { label: 'Insights',   active: false },
  { label: 'Settings',   active: false },
];

export const INSIGHTS_VIEWS = ['Tuning', 'Fairness', 'Funnel', 'Talent pool'];

/* § 2.4 — the candidate drawer's tabs. The last three are ABSENT, not disabled,
   when there is no application to act on; all five are present here because
   Sneha applied. That distinction is a small honest touch and the composition
   preserves it: a disabled tab claims a feature the state does not have. */
export const DRAWER_TABS = [
  { label: 'Profile',    active: false },
  { label: 'Match',      active: true  },
  { label: 'Interviews', active: false },
  { label: 'Feedback',   active: false },
  { label: 'Activity',   active: false },
];

/* § 2.5 — the candidates toolbar. `count` reads from JOB.pool so the toolbar
   and the header cannot disagree. */
export const JOB_TOOLBAR = {
  search: 'Search by name or email',
  origins: ['All', 'Applied', 'Sourced'],
  activeOrigin: 'All',
  count: `${JOB.pool.total} tracked`,
  sort: 'match score',
  move: 'Move to…',
  views: ['List', 'Board'],
};

/* § 2.8 — the JD skill review. When the parser extracts a skill it cannot
   confidently map to the taxonomy it does not guess and it does not drop it:
   the job carries an amber flag until a person decides. Three actions per
   skill, each applied immediately.

   This is the most on-brand thing in the product and it was nowhere on the
   site. */
export const SKILL_REVIEW = {
  count: 3,
  label: (n) => `${n} skill${n === 1 ? '' : 's'} need review`,
  actions: ['Use the suggested mapping', 'Keep as new', 'Discard'],
};

/* § 2.6 — where an application or a profile came from. */
export const SOURCE_CHANNELS = [
  'LinkedIn', 'Referral', 'Job board', 'Résumé upload', 'Direct application', 'Other',
];

/* § 2.4 and § 2.7 — quotable, and each one is the product declining to pad an
   empty state with encouragement. `notAssigned` is the strongest of them: an
   unassigned recruiter gets a 403 rather than a filtered view, and the UI
   treats being locked out as a normal state rather than as a failure. */
export const EMPTY_STATES = {
  feedback:    'No feedback recorded yet.',
  interviews:  'No interviews scheduled yet.',
  activity:    'Nothing has happened on this application yet.',
  noProfileTitle: 'No profile on file',
  noProfile:   'This person was added to the job directly, so there is no profile to score against it yet.',
  notAssignedTitle: 'You’re not on this job yet',
  notAssigned: 'Ask a hiring manager to add you to this role and its candidates will show up here.',
};

/* § 2.3 — the requisition's lifecycle-aware primary action. The product knows
   what the next legitimate act on a requisition is and labels the button with
   it; the site names the set rather than drawing a menu. */
export const JOB_ACTIONS = {
  primaryByState: {
    DRAFT:        'Submit for approval',
    UNDER_REVIEW: 'Approve',
    APPROVED:     'Publish',
    PUBLISHED:    'Mark in progress',
    PAUSED:       'Resume',
    ACTIVE:       'Mark filled',
  },
  secondary: ['Preview', 'Edit'],
  overflow:  ['Pause', 'Put on hold', 'Send back', 'Close', 'Delete'],
};

export const CANDIDATES_LIST = {
  route: 'app.transpahire.com / jobs / 1042 / candidates',
  title: 'Candidates',
  subtitle: 'Everyone tracked against this job — whether they applied or you found them.',
  empty: 'Nobody here yet. People show up here as soon as they apply or you add them to this job.',
  action: 'Move to…',
};

/** The product's own tones for the four importance tiers, used app-wide. */
export const IMPORTANCE_TONES = {
  critical:  'crit',
  required:  'warn',
  preferred: 'info',
  bonus:     'none',
};

/* --------------------------------------------------------------------------
   ALWAYS-ON SOURCING — § 1.5.

   The most defensible capability in the product, and absent from the site
   until now. Three things this data has to preserve:

     1. Every count is a NEW count. A search that returned fifty people the
        mission had already seen found nobody.
     2. The refusals stay visible. "Seeing 'you turned this down' is what makes
        the rest of the list credible."
     3. Exactly one featured tile — found against target.
   -------------------------------------------------------------------------- */

export const MISSION_STATUS = {
  DRAFT:     'Not started',
  ACTIVE:    'Watching',
  PAUSED:    'Paused',
  EXHAUSTED: 'Market covered',
  COMPLETED: 'Target reached',
  CANCELLED: 'Turned off',
};

export const MISSION = {
  name: 'Always-On Sourcing',
  pitch: 'Keep watching for people who match this role, and hear about them when they turn up.',
  route: 'app.transpahire.com / jobs / 1042 / sourcing',
  status: 'ACTIVE',
  target: 20,
  found: 14,
  targetBand: 'STRONG',
  surfacingBand: 'GOOD',
  countingMode: 'TOTAL_IN_POOL',

  /* One featured tile, then the supporting counts. */
  featured: { label: 'Matching this role', of: 20, value: 14 },
  tiles: [
    { key: 'pool',     label: 'Pool',     value: 47 },
    { key: 'strong',   label: 'Strong',   value: 14 },
    { key: 'good',     label: 'Good',     value: 11 },
    { key: 'surfaced', label: 'Surfaced', value: 9 },
  ],

  /* Every approach tried, including the two it did not get to run. Status is
     one of done | declined | awaiting, and `newFound` is new-to-this-mission. */
  strategies: [
    { status: 'done',     kind: 'Structured', detail: 'Python + distributed systems, Bengaluru', newFound: 9 },
    { status: 'done',     kind: 'Described',  detail: '“payments backend, 5+ yrs, Kafka”',        newFound: 4 },
    { status: 'done',     kind: 'Widened',    detail: 'notice period to 90 days',                 newFound: 1 },
    { status: 'declined', kind: 'Proposed',   detail: 'drop the Kubernetes requirement',          note: 'you declined this' },
    { status: 'awaiting', kind: 'Proposed',   detail: 'widen to Hyderabad',                       note: 'awaiting approval' },
  ],

  /* The run ledger's own vocabulary. Named on the page, not drawn. */
  ledger: ['trigger', 'planner', 'rounds used', 'calls used', 'candidates evaluated',
           'new found', 'new strong found', 'gap at start', 'gap at end', 'stop reason'],

  /* It measures its own interruptions, and warns on its own numbers. */
  trust: {
    heading: 'How often we interrupt you',
    dismissalWarn: 40,
    viewWarn: 30,
  },
};

/**
 * The terminal honest state, and per the source "the most valuable output in
 * the feature."
 *
 * `impact: null` means unmeasurable — render nothing. `impact: 0` means measured
 * and it changes nothing, which must be said out loud. A positive number is the
 * measured figure, labelled an estimate. A marketing composition that showed
 * only the wins would misrepresent the feature, so the zero row is not optional.
 */
export const MARKET_COVERED = {
  status: 'EXHAUSTED',
  line: 'We have looked at everyone who matches this role and cannot find more at your target level. Three things would change that:',
  options: [
    { change: 'Drop Kubernetes from required to preferred', impact: 6 },
    { change: 'Widen to Hyderabad and Pune',                impact: 3 },
    { change: 'Accept 90-day notice periods',               impact: 0 },
  ],
  note: 'illustrative estimates',
};

/* --------------------------------------------------------------------------
   STRUCTURAL FAIRNESS — § 1.6.

   The framing below is the product's own, and it is the one to use. The last
   clause is the single most valuable trust sentence available to this site: it
   is a statement of fact about the software, and it is legally safe in a way
   that "bias-free" and "defensible" are not.

   The refusal to rate is the most persuasive part of the composition. Below
   MINIMUM_AUDIT_ENTRIES the service returns INSUFFICIENT_DATA and declines to
   give a rating at all.
   -------------------------------------------------------------------------- */

export const FAIRNESS = {
  heading: 'Structural fairness',
  line: 'How this job description narrows the candidate pool. It looks at the requirements themselves — no demographic data is used or held.',
  rating: 'Needs review',
  ratings: ['Good', 'Needs review', 'Problematic'],
  minimumEntries: 50,

  /* The flagged terms, verbatim from the service. */
  flags: [
    { term: 'rockstar',         note: 'exclusionary jargon' },
    { term: '10x',              note: 'culture-signal jargon that may discourage applications' },
    { term: 'ninja',            note: 'informal language that can be exclusionary' },
    { term: 'young',            note: 'potential age bias language' },
    { term: 'recent graduate',  note: 'overspecifying graduation recency may limit experienced returners' },
    { term: 'must have degree', note: 'strict degree requirement may exclude skilled non-traditional candidates' },
  ],

  /* The three the demo requisition actually trips. Two language flags and one
     structural one — an aggressive filter count is not a word, it is a shape. */
  shown: ['rockstar', 'recent graduate'],
  structural: { label: '7 critical skills', note: 'almost nobody clears all seven' },

  /* What the service returns and what the site prints. The count is read from
     JOB.pool so the page cannot contradict itself. */
  insufficient: {
    label: 'Not enough scored candidates to rate distribution yet.',
    needs: 50,
  },

  /* What it computes, named rather than drawn. */
  computes: ['score distribution by experience', 'over-qualification bias',
             'language flags', 'aggressive filter count'],
};

/* --------------------------------------------------------------------------
   GOVERNANCE — § 1.11. All shipped. All mechanism claims.
   -------------------------------------------------------------------------- */

/** Six org roles. Manager → recruiter hierarchy, per-job assignment gating. */
export const ORG_ROLES = ['Admin', 'Job Manager', 'Hiring Manager', 'Recruiter', 'Sourcer', 'Interviewer'];

/** The job lifecycle, with history and versioning behind it. */
export const JOB_LIFECYCLE = ['Draft', 'Under Review', 'Approved', 'Published', 'Active', 'Closed'];

/**
 * An audit-log excerpt: the least glamorous and most persuasive thing on
 * /trust. Every row type is a real logged event. The `weights v3 · gate: 6
 * dropped` row is the MatchAuditLog doing its job, and it is the strongest
 * single row — a stored verdict is what makes a score reproducible later.
 */
export const GOVERNANCE_LOG = [
  { at: '14:22', actor: 'priya.s@',  action: 'viewed candidate 8841',                    ref: 'job 1042' },
  { at: '14:19', actor: 'system',    action: 'scored 47 candidates',                     ref: 'weights v3 · gate: 6 dropped', strong: true },
  { at: '14:04', actor: 'arjun.k@',  action: 'changed Kubernetes REQUIRED → PREFERRED',  ref: 'job 1042' },
  { at: '13:51', actor: 'priya.s@',  action: 'exported search results (31 rows)',        ref: 'audit id 4c1e' },
  { at: '09:30', actor: 'system',    action: 'GDPR export completed',                    ref: 'user 3319' },
];

/** What a candidate can ask for, and the route it actually takes. */
export const DATA_RIGHTS = {
  types: ['EXPORT', 'DELETE'],
  route: 'a request, with a review queue',
  queue: 'platform-admin / gdpr',
};

/** The five audit and access surfaces, named. */
export const GOVERNANCE_SURFACES = [
  { label: 'Match audit',  detail: 'The weights, the per-skill scores and the verdict, stored as they were at the time of computation.' },
  { label: 'Action audit', detail: 'Every mutation carries an actor and a timestamp.' },
  { label: 'Search audit', detail: 'Every search is logged, and a saved search keeps its own history.' },
  { label: 'Access',       detail: 'Six roles, a manager → recruiter hierarchy, per-job assignment, and organisation-level data isolation.' },
  { label: 'Model change', detail: 'Scoring modifiers sit behind feature flags and the skill ontology is versioned.' },
];

/* --------------------------------------------------------------------------
   THE CANDIDATE DASHBOARD — § 1.10. Shipped panels /for-candidates never
   mentioned. The two strongest reasons to build a profile are here, and
   neither was on the page.

   Unlock counts are NOT duplicated: they are read from RESUME.gaps, which is
   the single source for them. `docs/phase-4.md` § 3.9 sketches different
   figures; the sketch loses to the rule at the top of this file.
   -------------------------------------------------------------------------- */

export const CANDIDATE_DASH = {
  route: 'app.transpahire.com / dashboard',

  interest: {
    label: 'Who’s viewing your profile',
    views: 12,
    delta: 4,
    days: 7,
    /* Seven daily figures. Illustrative, and the composition says so. */
    spark: [1, 2, 1, 3, 2, 2, 1],
  },

  unlock: {
    label: 'Skills that would unlock roles',
    basis: 'Based on roles you already score above 52 on.',
    /* Per-skill status, from SkillsUnlock. */
    statuses: ['verifying', 'confirmed', 'learning', 'watchlist'],
  },

  velocity: {
    label: 'Application velocity',
    applications: 9,
    days: 30,
    shortlistRate: 33,
    weeks: [1, 0, 2, 1, 3, 1, 1],
    frame: 'A mirror, not a scoreboard.',
    note: 'example figures',
  },

  alerts: { frequencies: ['Daily', 'Weekly', 'Instant'] },
};

/* --------------------------------------------------------------------------
   ANALYTICS — § 1.9. Four shipped views, none previously on the site.

   EVERY FIGURE ON THIS PAGE IS AN EXAMPLE, and `CLAUDE.md` § 7 is unchanged on
   that point. The funnel counts below are consistent with PIPELINE so the two
   compositions cannot contradict each other.
   -------------------------------------------------------------------------- */

export const ANALYTICS = {
  route: 'app.transpahire.com / jobs / 1042 / insights',
  views: [
    { key: 'tuning',   label: 'Tuning',      note: 'Skill weights, the JD optimizer and what-if simulation — where a recruiter changes the shape of the pool rather than just reading it.' },
    { key: 'fairness', label: 'Fairness',    note: 'How the requirements narrow the pool.' },
    { key: 'funnel',   label: 'Funnel',      note: 'Stage counts, conversion, and a skill table tiered by importance.' },
    { key: 'pool',     label: 'Talent pool', note: 'Pool size, the score bands as one ordered bar, and a scarcity index.' },
  ],

  /* Funnel — read from PIPELINE, not held twice. The last stage is excluded
     because "not moving forward" is not a step further down the funnel. */
  funnel: PIPELINE.stages.filter((s) => !s.quiet).map((s) => ({ stage: s.name, count: s.count })),

  /* Skill scarcity, toned rose → amber → emerald. HIGH scarcity is the problem. */
  scarcity: [
    { skill: 'Distributed Systems', level: 'HIGH',   coverage: 31 },
    { skill: 'Kafka',               level: 'HIGH',   coverage: 38 },
    { skill: 'Kubernetes',          level: 'MEDIUM', coverage: 57 },
    { skill: 'PostgreSQL',          level: 'LOW',    coverage: 84 },
    { skill: 'Python',              level: 'LOW',    coverage: 91 },
  ],

  note: 'example figures — no measured analytics values are published',
};

/* --------------------------------------------------------------------------
   THE CONSENT MODEL — § 1.4. Two populations, and the site described one.

   The recruiter search UI already surfaces this honestly: the candidate card
   renders an account-status dot. The product is more transparent about this
   than the marketing site was.
   -------------------------------------------------------------------------- */

export const ACCOUNT_STATUS = [
  { key: 'UNCLAIMED', label: 'Unclaimed', note: 'Brought in by a recruiter and not yet claimed by the person.' },
  { key: 'INVITED',   label: 'Invited',   note: 'Sent an invitation to claim the profile.' },
  { key: 'ACTIVATED', label: 'Activated', note: 'The person has taken the profile over.' },
  { key: 'VERIFIED',  label: 'Verified',  note: 'Identity and contact confirmed.' },
  { key: 'OPTED_OUT', label: 'Opted out', note: 'Asked not to be there. Not searchable.' },
];

export const CONSENT = {
  ownerTypes: ['CANDIDATE_MANAGED', 'RECRUITER_MANAGED'],
  sources: ['SELF_SIGNUP', 'RECRUITER_IMPORT', 'CSV_IMPORT', 'REFERRAL', 'MARKETPLACE'],
  privacyModes: ['public', 'limited', 'private'],
  /* Confirmed 31 Aug 2026: an imported profile is visible only inside the
     organisation that brought it in, until the person activates it. */
  importedVisibility: 'only the organisation that imported it',
};

/* --------------------------------------------------------------------------
   WHAT SHIPPED — the changelog seed.

   The cheapest credibility available, and it permanently solves the problem
   Phase 4 exists to fix: a roadmap card rots silently, a shipped-list entry
   cannot.

   UNDATED ON PURPOSE. `docs/phase-4.md` § 4.9 asks for the last six months
   seeded from the product's phase docs, and this session had no access to
   them. A guessed date is a fabricated fact, and this is the one page where
   that would be least forgivable. Everything below is confirmed by § 1.3;
   dated entries begin with the next release.

   THERE IS NO ROADMAP any more. It was down to two items — in-platform
   messaging and calendar sync — and the maintainer confirmed both live on
   28 Sep 2026, so both moved here and `ROADMAP` was deleted with them. No
   calendar provider is named: none was confirmed, and naming one would be an
   integration claim (`CLAUDE.md` § 4).
   -------------------------------------------------------------------------- */

export const SHIPPED = [
  { group: 'Sourcing',
    items: [
      'Always-On Sourcing: a mission per role, with a target band, a run ledger, and strategies that cannot repeat.',
      'Saved searches, with their own audit history.',
      'Talent pools, an import wizard and import history.',
      'Recruiter outreach, with interest tracking.',
      'In-platform messaging with candidates, without leaving Transpahire.',
    ] },
  { group: 'Matching and explanation',
    items: [
      'Concept-level match explanation, with the profile section each match was drawn from.',
      'A match audit log: the weights, the per-skill scores and the verdict, stored at the time of computation.',
      'Structural fairness reporting on a job description.',
      'A versioned skill ontology, and feature-flagged scoring modifiers.',
    ] },
  { group: 'Hiring operations',
    items: [
      'Interview records with scheduled times and meeting links.',
      'Calendar sync for scheduled interviews.',
      'Screener questions — free text, yes/no, or multiple choice.',
      'The job lifecycle end to end, with status history and job versions.',
      'Notifications across twenty-two event types, with per-type preferences.',
    ] },
  { group: 'For candidates',
    items: [
      'Job alerts — daily, weekly or instant.',
      'A dashboard: recruiter interest, skills that would unlock roles, application velocity and a résumé critique.',
      'Job comparison, side by side, with the score on each.',
      'Data export and deletion, as a request with a review queue.',
    ] },
  { group: 'Public surface',
    items: [
      'Public company pages, with public, unlisted and private visibility.',
      'Employer reviews behind a verified-application gate, with moderation and a right of reply.',
    ] },
];

/* /product's "also in the platform" — the shipped things none of its six
   pillars already names. LOOKED UP from SHIPPED rather than copied, so /product
   and the changelog cannot drift: an item renamed or removed there fails the
   build here instead of going stale. */
const shipped = (prefix) => {
  const item = SHIPPED.flatMap((g) => g.items).find((i) => i.startsWith(prefix));
  if (!item) throw new Error(`SHIPPED has no item starting "${prefix}"`);
  return item;
};

export const ALSO_SHIPPED = [
  'Recruiter outreach', 'In-platform messaging', 'Notifications', 'Calendar sync',
  'Talent pools', 'Saved searches', 'A match audit log', 'Structural fairness',
  'Public company pages', 'Employer reviews',
].map(shipped);

/* --------------------------------------------------------------------------
   THE JD OPTIMIZER — `docs/phase-5.md` § 4.1, and § 1.9's Tuning view
   (`JdOptimizerPanel`, shipped, alongside the weight editor and the what-if
   simulator).

   These are the three findings the panel returns. They are SHAPE findings, not
   language findings — the language flags are FAIRNESS.flags and they are a
   different service — and the distinction matters on the tools page: one says
   "this requisition asks for a combination almost nobody has", the other says
   "this requisition uses a word that costs you applications".
   -------------------------------------------------------------------------- */

export const OPTIMIZER = {
  findings: [
    { key: 'criticals', label: 'Too many criticals',
      note: 'Every critical skill is a hard gate applied before scoring, so each one you add is a pool you cannot see. A requisition with seven of them is not a high bar, it is an empty list.' },
    { key: 'combination', label: 'A near-impossible combination',
      note: 'The requirements are individually reasonable and jointly rare. Named, so it is a decision rather than a mystery.' },
    { key: 'softskills', label: 'No soft-skill tier',
      note: 'Nothing in the description maps to a soft skill, which means the whole evaluation runs on technical coverage alone.' },
  ],
  /* WHAT THE TOOL WILL NOT RETURN, and this list is load-bearing —
     `docs/phase-5.md` § 4.1. Any of these would imply a database of candidates
     matching the visitor's role, which would be the one invention this site has
     avoided from the beginning. */
  refuses: [
    'a pool size for your role',
    'a count of candidates who match it',
    'a score distribution',
    'a time-to-fill estimate',
  ],
};

/* --------------------------------------------------------------------------
   THE RÉSUMÉ CHECK — the candidate-side twin. Everything it returns already
   exists in RESUME above; nothing new is claimed here, and the tool page reads
   from that export rather than holding a second copy of the numbers.
   -------------------------------------------------------------------------- */

export const RESUME_CHECK = {
  returns: [
    'a profile quality score, and the specific suggestions behind it',
    'the skills the parser read out of the document, in the tiers a job would read them in',
    'the skills that would open the most additional roles',
    'the skills it could not place in the taxonomy, and what happens to them',
  ],
  refuses: [
    'a list of jobs you would get',
    'a salary you could command',
    'a percentile against other candidates',
  ],
};

/* --------------------------------------------------------------------------
   PRICING — § 4.8. The shape, with no numbers, because there are none.
   -------------------------------------------------------------------------- */

export const PRICING = {
  /* What the schema already half-decides. */
  known: ['Subscription', 'OrgSubscription', 'a Stripe reference'],
  shape: [
    { q: 'Per seat, or per requisition?',
      a: 'Undecided, and it is the decision that sets everything else. The schema supports an organisation-level subscription, which is the per-seat shape; nothing in it bills a job.' },
    { q: 'What does a design-partner arrangement involve?',
      a: 'A real requisition, a real pool, and access while the product is early — in exchange for telling us what is wrong with it. No fee, and no obligation once billing turns on.' },
    { q: 'What changes when billing turns on?',
      a: 'Nothing about the product. Billing infrastructure exists and is not switched on; when it is, a design partner is told before it applies to them, in writing, with a way out.' },
  ],
  note: 'No price is published because there is not one to publish. This page says what is being decided instead of implying a range.',
};

/* --------------------------------------------------------------------------
   THINGS THE SITE MUST NOT SAY — § 1.12, and the one figure to leave alone.
   -------------------------------------------------------------------------- */

export const UNVERIFIED = {
  /* Appears in product-overview.md and could not be found in the source. Do
     not publish the figure. The alias behaviour is real and can be described
     without a count. */
  cityCount: null,
  cityAliases: ['Bangalore / Bengaluru', 'Bombay / Mumbai'],
  locales: ['en'],
  integrations: 'none — there is an API contract and no integrations',
};
