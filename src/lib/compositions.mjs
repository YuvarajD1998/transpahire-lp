/**
 * compositions.mjs — the product compositions, as HTML.
 *
 * Phase 3 built eight against `docs/phase-2/08-PRODUCT_VISUALIZATION_SPEC.md`.
 * Phase 4 rebuilds the two that carry the site and adds nine more, against
 * `docs/phase-4.md` § 1 — which was read out of the shipped product source
 * rather than out of a planning document.
 *
 * Every value comes from assets/data/product-demo.js; nothing here holds a
 * number of its own.
 *
 * These render at BUILD time, into static HTML, which is what makes the
 * compositions work with JavaScript disabled — the requirement in `07 § 7`.
 * The interactive modules then mutate the fields these functions stamp with
 * `data-field`, `data-row` and `data-weight`. Nothing is re-rendered in the
 * browser, so there is no second copy of this markup to drift from.
 *
 * THE RULE THAT GOVERNS ALL OF IT is unchanged, and is the reason this file is
 * conservative in a way a marketing site normally is not
 * (docs/product-visualization.md § 1):
 *
 *     Fabricating product UI is a lie with a design budget.
 *
 * A composition may show a layout, a label, a state or a relationship that
 * EXISTS in the product. It may not invent one. When in doubt the fallback is
 * `screenshotSlot()`, not an invention.
 *
 * Two Phase 4 allowances, both recorded in docs/product-visualization.md:
 *
 *   · DENSITY. Phase 3's compositions were sparse because the product was
 *     under-documented. It is not any more, so a composition may now carry a
 *     realistic number of rows, chips and states.
 *   · TWO PANES. The product's primary surface is a list with a drawer open
 *     over it, so a composition may show both.
 *
 * Inventory:
 *   jobWorkspace       the whole job detail surface                    ★  P5
 *   jobHeader          title row, meta pills, stats row
 *   pulseStrip         the app's own signature visual, one tile featured
 *   tabStrip           five job tabs, or five drawer tabs. Inert.
 *   listToolbar        search, origin control, count, sort. Inert.
 *   drawerHead         avatar, name, meta row, Full profile ↗
 *   explainPanel       the score decomposes into a cited argument     ★
 *   rankedList         every candidate scored and ordered
 *   criticalGate       an exclusion that explains itself
 *   scoreModel         the weights, published
 *   poolBands          the score distribution, as one ordered bar
 *   skillGraph         how the partial was possible                   ★
 *   tuner              the ranking is a function of priorities        ★
 *   requisition        evaluation starts from a structured role
 *   searchComposition  two search modes, with quoted evidence
 *   missionConsole     Always-On Sourcing                             ★
 *   marketCovered      the agent's terminal honest state
 *   structuralFairness how a job description narrows the pool
 *   governanceLedger   what is logged
 *   pipeline           the shortlist becomes a hire
 *   funnelChart        stage counts and conversion
 *   scarcityTable      the pool intelligence view
 *   candidateView      the candidate sees the same score
 *   candidateWorkspace recruiter interest, and what would unlock more
 *   resumeAndGaps      the candidate is told what to do next
 *   signalsCluster     the four things a CV does not carry
 *   screenshotSlot     the one real screenshot the site still needs
 *
 * RETIRED IN PHASE 5:
 *   matchesWorkspace   replaced by jobWorkspace(). It was not a thin
 *                      composition by choice — it was a 560px column, and three
 *                      of its five row tracks were switched off in CSS to make
 *                      it fit. `docs/phase-5.md` § 3.1.
 *
 * RETIRED IN PHASE 4:
 *   heroComposition    replaced by matchesWorkspace()
 *   explanationPanel   replaced by explainPanel()
 *   comparisonTable    cut. Shipping a table with a visibly withheld column,
 *                      on a page about transparency, reads as concealment.
 *                      The two solid category claims moved into prose on
 *                      /product/matching.
 */

import {
  ACCOUNT_STATUS, ANALYTICS, BANDS, CANDIDATES_LIST, CANDIDATE_DASH,
  CANDIDATE_VIEW, CLASSIFICATIONS, CONFIDENCE, CRITICAL_GATE, DEFAULT_COMBO,
  DIMENSIONS, DRAWER_TABS, FAIRNESS, FIT_SPLIT, GATED, GOVERNANCE_LOG,
  IMPORTANCE_TONES, JOB, JOB_PULSE, JOB_TABS, JOB_TOOLBAR, MARKET_COVERED,
  MISSION, MISSION_STATUS, MODIFIERS, ORIGINS, PANEL_FOOTER,
  PIPELINE, RANKINGS, RESUME, ROW_META, SIGNALS, SKILL_EDGES, SKILL_REVIEW,
  SKILL_STATES,
  EDGE_TYPES, ROLE_EDGE_TYPES, STAGES, TIER_WORDS, TUNABLE, WHAT_IF,
  candidate, coverage, explain, headline, relationshipsUsed,
  /* PHASE 6 */ POOL_ROWS,
} from '../../assets/data/product-demo.js';

/* ==========================================================================
   Shared helpers
   ========================================================================== */

/** Everything that reaches the page goes through here. */
export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** A beat attribute, or nothing when the composition is not sequenced. */
function beat(ms, on = true) {
  return on ? ` data-beat="${ms}"` : '';
}

/**
 * The frame. `--ratio` is mandatory on every instance and must survive the swap
 * to real media (docs/product-visualization.md § 2) — for composed HTML it acts
 * as a reserved minimum rather than a fixed box, see
 * `.frame__body--content` in components.css.
 */
export function frame({ ratio, meta, body, modifier = '', attrs = '', bodyClass = '' }) {
  return `
<div class="frame ${modifier}" style="--ratio: ${ratio}"${attrs}>
  <div class="frame__chrome">
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__meta">${esc(meta)}</span>
  </div>
  <div class="frame__body frame__body--content ${bodyClass}">
${body}
  </div>
</div>`;
}

/** The honesty label. One per page, under the first composition. */
export function compositionNote(extra = '') {
  return `<p class="composition-note">Illustrative data · invented people and companies${extra ? ` · ${esc(extra)}` : ''}</p>`;
}

/** A meter. `--meter-v` is the 0–1 fraction; P1 animates the fill. */
function meter({ value, field = '', variant = '' }) {
  const attr = field ? ` data-field="${field}"` : '';
  return `<span class="meter ${variant}" aria-hidden="true"><span class="meter__fill" style="--meter-v: ${(value / 100).toFixed(2)}"${attr}></span></span>`;
}

/**
 * The flat score component — a numeral, a scale and a classification chip.
 *
 * Kept for the candidate-facing compositions, where the number is being READ
 * rather than compared: C8's own score and C10's résumé quality. Everywhere a
 * score sits beside other scores it is now a `scoreRing()`, because the ring is
 * what the product renders and it is the most recognisable single element in it
 * after the partial glyph.
 */
function score(c, { size = '', sequenced = false, fields = false } = {}) {
  const cls = CLASSIFICATIONS[c.classification];
  const f = (name) => (fields ? ` data-field="${name}"` : '');
  return `<p class="score ${size}"${beat(0, sequenced)}>
      <span class="score__value" data-count="${c.score}"${f('score')}>${c.score}</span>
      <span class="score__scale" aria-hidden="true">/100</span>
      <span class="chip chip--mono chip--${c.classification}"${beat(120, sequenced)}${f('classification')}>${esc(cls.label)}</span>
      <span class="sr-only">Match score ${c.score} out of 100. Classification: ${esc(cls.label.toLowerCase())}.</span>
    </p>`;
}

/* ==========================================================================
   PHASE 4 SHARED VOCABULARY

   Six small pieces the new compositions all draw on. Each models a named
   component in the product (`docs/phase-4.md` § 1.7), and each is listed with
   its model in docs/components.md.
   ========================================================================== */

/** The band a score falls in, from the published thresholds. Never computed
    from anything but BANDS, so the site and the product agree by construction. */
function bandOf(scoreValue) {
  return BANDS.find((b) => scoreValue >= b.min) || BANDS[BANDS.length - 1];
}

/** A monogram disc. Never a photograph, and never a stock face: a composition
    with an invented person in it should look invented. */
function avatar(name) {
  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2);
  return `<span class="mono-disc" aria-hidden="true">${esc(initials)}</span>`;
}

/**
 * `ScoreRing`. 52px in the drawer, 38px on a row — the product's own two sizes.
 *
 * The arc is STATIC. Animating it would mean animating `stroke-dashoffset`,
 * which is outside the transform/opacity/filter allowlist and already spends
 * the site's one documented exception on P4. The ring arrives with its beat, on
 * opacity, and the numeral counts — which is how every other score on the site
 * behaves, so nothing here is a new primitive.
 */
export function scoreRing({ score: value, size = 38, band, fields = false, sequenced = false }) {
  const b = band || bandOf(value).key;
  const r = (size - 5) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = ((value / 100) * circumference).toFixed(1);
  const rest = (circumference - Number(dash)).toFixed(1);
  const f = (name) => (fields ? ` data-field="${name}"` : '');

  return `<span class="ring ring--${b}" style="--ring-size: ${size}px"${beat(0, sequenced)} data-row-ring data-ring-c="${circumference.toFixed(1)}">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false">
          <circle class="ring__track" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="5"/>
          <circle class="ring__arc" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="5"
                  stroke-dasharray="${dash} ${rest}" stroke-linecap="round"
                  transform="rotate(-90 ${size / 2} ${size / 2})" data-ring-arc/>
        </svg>
        <span class="ring__value" data-count="${value}" data-row-score${f('score')}>${value}</span>
      </span>`;
}

/**
 * The AI pill. The product renders `✨ AI`; DESIGN.md bans floating sparkles,
 * so the site renders a mono `AI` in an indigo pill with no glyph. Same
 * disclosure, one fewer decoration — deviation recorded in docs/components.md.
 */
function aiPill() {
  return `<span class="pill pill--ai">AI</span>`;
}

/** `CONFIDENCE_STYLE`. The word always rides with the colour. */
function confidenceChip({ level, sequenced = false }) {
  const c = CONFIDENCE[level];
  return `<span class="pill pill--${c.tone}" data-field="confidence"${beat(380, sequenced)}>${esc(c.label)} confidence</span>`;
}

/** `REL_LABEL`. Distinct from the taxonomy's edge types — see the data module. */
function relationshipChip(type, i = 0, sequenced = false) {
  return `<span class="relchip"${sequenced ? ` data-beat="${1120 + i * 60}"` : ''}>${esc(type)}</span>`;
}

/**
 * `ConceptMatchCard`. The load-bearing part is the last line: the relationship,
 * the profile section the match came from, and a confidence figure. *The score
 * cites its sources* is the strongest unclaimed beat in the product, and this
 * row is where the site finally says it.
 */
function conceptCard(match, { muted = false, at = null } = {}) {
  const verified = match.verified
    ? `<span class="concept__verified">✓ verified</span>`
    : `<span class="concept__unverified">not verified</span>`;

  return `          <div class="concept${muted ? ' concept--muted' : ''}"${at === null ? '' : ` data-beat="${at}"`}>
            <p class="concept__head">
              <span class="concept__query">${esc(match.concept)}</span>
              <span class="concept__arrow" aria-hidden="true">→</span>
              <span class="concept__matched">${esc(match.matched)}</span>
              ${verified}
            </p>
            <p class="concept__reason">${esc(match.reason)}</p>
            <p class="concept__foot">
              <span class="concept__rel">${esc(match.rel)}</span>
              <span class="concept__sep" aria-hidden="true">·</span>
              <span class="concept__section">${esc(match.section)}</span>
              <span class="concept__conf">
                ${meter({ value: match.confidence, variant: 'meter--thin' })}
                <span class="concept__pct">${match.confidence}%</span>
              </span>
            </p>
            <p class="concept__quote">${esc(match.quote)}</p>
          </div>`;
}

/** `MissingConceptRow`. No colour beyond the neutral wash: a requirement the
    profile does not meet is a fact, not a verdict on the person. */
function missingRow(m) {
  return `          <p class="missing-row">
            <span class="missing-row__glyph" aria-hidden="true">${SKILL_STATES.missing.glyph}</span>
            <span class="missing-row__name">${esc(m.concept)}</span>
            <span class="missing-row__tier">${esc(m.tier)}</span>
          </p>`;
}

/**
 * `MatchHighlightChips`. A skill chip beside an italic quoted snippet from the
 * candidate's own profile — the point of semantic search, and missing from the
 * site until now. Capped at two per card in the product, because the card has
 * to stay compact; the cap is honoured here.
 */
export function evidenceSnippet({ skill, quote, section }) {
  return `      <p class="evidence">
        <span class="chip chip--mono">${esc(skill)}</span>
        <q class="evidence__quote">${esc(quote)}</q>
        <span class="evidence__section">${esc(section)}</span>
      </p>`;
}

/** The two evidence snippets a search result row carries, from EXPLAIN. */
function evidenceFor(id, limit = 2) {
  let e;
  try { e = explain(id); } catch { return ''; }
  return [...e.strong, ...e.partial]
    .slice(0, limit)
    .map((m) => evidenceSnippet({ skill: m.concept, quote: m.quote, section: m.section }))
    .join('\n');
}

/** A stage chip, in the product's own label and tone. REJECTED is neutral. */
function stageChip(key) {
  const st = STAGES[key];
  return `<span class="pill pill--${st.tone} pill--stage">${esc(st.label)}</span>`;
}

/* ==========================================================================
   Ranked candidate list

   A real <ul> of <li>. The list IS a list, and a screen reader should be told
   how many people are in it.

   TWO VARIANTS, because the product has two lists and they are not the same
   list:

     scored   a RANKING. Score ring, classification chip, identity, coverage
              triplet. Used where the question is "who fits this role" — the
              pool, the tuner's live list, a search result.

     tracked  the job → candidates list, `docs/phase-4.md` § 1.8, five fluid
              tracks: avatar · name + headline · stage chip · score ring ·
              origin and when. Used where the question is "where is everyone".
              A stage only exists once somebody is being tracked against a job,
              so a search result never gets one.

   The score is a RING in both, at the product's own two sizes. Phase 3 argued
   that a ring implies a proportion of a whole the product never claimed; the
   product publishes the thresholds and renders a ring, so the argument is
   spent.
   ========================================================================== */

/** The line a reorderable row shows when a skill set to CRITICAL drops the
    candidate before scoring. Hidden until tuner.js reads a gated entry from
    RANKINGS; the score is then hidden, not lowered. */
function gateLine() {
  return `<span class="rank__gate" data-gate hidden><span class="pill pill--none">${esc(GATED.verdict)}</span> <span class="rank__gate-why">missing critical · <b data-gate-skill></b></span></span>`;
}

export function rankedList({
  ids,
  listId = 'ranked-list',
  variant = 'scored',
  head = true,
  filters = false,
  foot = true,
  compact = false,
  reorderable = false,
  layers = false,
  meta = true,
  evidence = false,
  selected = null,
  move = false,
  gateRow = false,
} = {}) {
  const tracked = variant === 'tracked';

  /* PHASE 5. `move` renders the per-row `Move to…` affordance the real toolbar
     carries, as a SPAN — the hero may be dense and may not be interactive
     (`CLAUDE.md` § 5), and a <select> in the hero is a focus stop that goes
     nowhere. `gateRow` appends the critical gate's row to the same <ul>, which
     is where it sits in the product: the exclusion is a row in the list, not a
     panel beside it. */
  const moveCell = move
    ? `        <span class="rank__move" aria-hidden="true">${esc(JOB_TOOLBAR.move)} <svg width="12" height="12" focusable="false"><use href="#i-chevron-down"/></svg></span>`
    : '';

  const rows = ids.map((id) => {
    const c = candidate(id);
    const cov = coverage(c);
    const cls = CLASSIFICATIONS[c.classification];
    const rm = ROW_META[id];

    if (tracked) {
      return `      <li class="rank__row rank__row--tracked${move ? ' rank__row--move' : ''}" data-row="${c.id}" data-classification="${c.classification}"${selected === c.id ? ' aria-current="true"' : ''}>
        ${avatar(c.name)}
        <span class="rank__ident">
          <span class="rank__name">${esc(c.name)}</span>
          <span class="rank__headline">${esc(headline(c))}</span>
        </span>
        ${stageChip(rm.stage)}
        ${scoreRing({ score: c.score, size: 38, band: c.classification })}
        <span class="rank__origin">${esc(ORIGINS[rm.origin])} <span class="rank__when">· ${esc(rm.when)}</span></span>
${moveCell}
        <span class="sr-only" data-row-sr>${esc(c.name)}, ${esc(headline(c))}: ${esc(STAGES[rm.stage].label)}, match score ${c.score} out of 100, ${esc(cls.label)}. ${esc(ORIGINS[rm.origin])} ${esc(rm.when)} ago.</span>
      </li>`;
    }

    const triplet = meta
      ? `<span class="rank__cover" aria-hidden="true">
        <span class="is-covered">${SKILL_STATES.covered.glyph}${cov.covered}</span>
        <span class="is-partial">${SKILL_STATES.partial.glyph}${cov.partial}</span>
        <span class="is-missing">${SKILL_STATES.missing.glyph}${cov.missing}</span>
      </span>`
      : '';

    return `      <li class="rank__row${reorderable ? ' reorder__row' : ''}${evidence ? ' rank__row--evidence' : ''}" data-row="${c.id}" data-classification="${c.classification}">
        <span class="rank__score">
          ${scoreRing({ score: c.score, size: 38, band: c.classification })}
          <span class="chip chip--mono chip--${c.classification}" data-row-chip>${esc(cls.short)}</span>
        </span>
        <span class="rank__ident">
          <span class="rank__name">${esc(c.name)}</span>
          <span class="rank__headline">${esc(headline(c))}</span>
        </span>
        <span class="rank__meta">${c.years}y · ${esc(c.location)}${meta ? ` · ${esc(c.mode)}` : ''}</span>
        ${triplet}
        <span class="sr-only" data-row-sr>${esc(c.name)}: match score ${c.score} out of 100, ${esc(cls.label)}. ${cov.covered} skills covered, ${cov.partial} partial, ${cov.missing} missing.</span>
${reorderable ? `        ${gateLine()}\n` : ''}${evidence ? `        <span class="rank__evidence">
${evidenceFor(id)}
        </span>` : ''}
      </li>`;
  });

  /* The gate's row, in the list. `criticalGate()` still exists and still owns
     the full-width standalone treatment on /product/matching; this is the same
     record as one row of the same <ul>.

     DEVIATION. `docs/phase-5.md` § 3.4 names this person "Vikram Nair". The
     data module renamed them to Aditya Nair in Phase 4 for a reason that still
     holds — there is already a Vikram among the scored candidates, and two
     Vikrams one of whom was scored and one of whom was not teaches the reader
     the opposite of the point. The rule at the top of the data module beats the
     sketch. */
  const gate = gateRow
    ? `      <li class="rank__row rank__row--tracked rank__row--gate${move ? ' rank__row--move' : ''}" data-row="gated">
        ${avatar(GATED.name)}
        <span class="rank__ident">
          <span class="rank__name">${esc(GATED.name)}</span>
          <span class="rank__headline">${esc(GATED.headline)}</span>
        </span>
        <span class="pill pill--none pill--stage">${esc(GATED.verdict)}</span>
        <span class="gate__struck" aria-hidden="true">—</span>
        <span class="rank__origin">Missing ${esc(GATED.tier)} <span class="rank__when">· ${esc(GATED.reason)}</span></span>
        <span class="sr-only" data-row-sr>${esc(GATED.name)}, ${esc(GATED.headline)}: not scored. Disqualified before scoring for a missing ${esc(GATED.tier)} requirement, ${esc(GATED.reason)}.</span>
      </li>`
    : '';

  const filterChips = filters
    ? `<div class="rank__filters" data-pool-filter="${listId}" role="group" aria-label="Filter by classification">
          <button type="button" class="rank__filter" data-band="all" aria-pressed="true">all ${JOB.pool.total}</button>
          <button type="button" class="rank__filter" data-band="strong" aria-pressed="false">strong ${JOB.pool.strong}</button>
          <button type="button" class="rank__filter" data-band="good" aria-pressed="false">good ${JOB.pool.good}</button>
        </div>`
    : '';

  const header = head
    ? tracked
      ? `    <div class="rank__head">
      <p class="rank__title">${esc(CANDIDATES_LIST.title)}</p>
      <div class="rank__controls">
        <span></span>
        <span class="rank__sort">${JOB.pool.total} tracked</span>
      </div>
    </div>`
      : `    <div class="rank__head">
      <p class="rank__title">${esc(JOB.title)} · ${esc(JOB.locationShort)} · ${esc(JOB.mode)} · ${esc(JOB.experience)}</p>
      <div class="rank__controls">
        ${filterChips || (reorderable ? '<span><span class="rank__gatecount" data-gatecount></span></span>' : '<span></span>')}
        <span class="rank__sort">sort: match score</span>
      </div>
    </div>`
    : '';

  /* PHASE 4. The old footer claimed "consented profiles only" [STALE-OK], which
     the default import path contradicts — `docs/phase-4.md` § 1.4, and the
     highest-priority copy defect on the site. The honest line names both
     populations: people who created a profile, and people a recruiter brought
     in. It is not a weaker sentence. */
  const footer = foot
    ? `    <p class="rank__foot">every candidate in the database · profiles people created, and profiles recruiters brought in</p>`
    : '';

  const summary = tracked
    ? CANDIDATES_LIST.subtitle
    : `${ids.length} candidates, ordered by match score. Every candidate in the database is scored against the role${reorderable ? ', except anyone missing a skill set to critical, who is removed before scoring' : ''}.`;

  return `  <div class="rank${compact ? ' rank--compact' : ''}${tracked ? ' rank--tracked' : ''}">
${header}
    <p class="sr-only" id="${listId}-summary">${esc(summary)}</p>
    <ul class="rank__list${reorderable ? ' reorder' : ''}" id="${listId}" aria-describedby="${listId}-summary"${reorderable ? ' data-rank-list' : ''}${layers ? ' data-layers' : ''}>
${rows.join('\n')}${gate ? `\n${gate}` : ''}
    </ul>
${filters ? '    <p class="sr-only" role="status" data-pool-count></p>' : ''}
${footer}
  </div>`;
}

/* ==========================================================================
   explainPanel ★ — the score decomposes into a cited argument
   --------------------------------------------------------------------------
   The most important asset on the site, rebuilt in Phase 4 against the real
   panel (`docs/phase-4.md` § 1.7):

     ┌ ring · AI · confidence ─────────────────────────────────────┐
     │ two-sentence summary                                        │
     ├─────────────────────────────────────────────────────────────┤
     │ HOW THE CONCEPTS CONNECT   [exact][transferable][narrower]  │
     ├─────────────────────────────────────────────────────────────┤
     │ STRONG MATCHES     concept → matched · ✓ verified           │
     │                    reason · relationship · section · conf   │
     ├─────────────────────────────────────────────────────────────┤
     │ PARTIAL MATCHES    the same card, muted ground              │
     ├─────────────────────────────────────────────────────────────┤
     │ NOT FOUND IN PROFILE                                        │
     ├─────────────────────────────────────────────────────────────┤
     │ AI-generated · Cached                          Regenerate   │
     └─────────────────────────────────────────────────────────────┘

   WHAT CHANGED, AND WHY IT MATTERS. Phase 3's panel showed five dimension bars
   and four skill states. Two of those five were wrong (salary is a ±10%
   modifier, not a dimension) and the panel had no way at all to express the
   thing the product does that nothing else in the category does: every line of
   the explanation points at the place in the profile it came from. The
   dimensions have not disappeared — they are published properly, once, in
   `scoreModel()` on /product/matching, where the weights can be shown beside
   them. Repeating a weighted breakdown inside every panel would state the
   model six times and cite the evidence nowhere.

   THE BEAT SEQUENCE is `docs/phase-4.md` § 3.2's, re-cut from
   `07 § 4`'s table for the new structure. The two pauses are the point: a
   sequence that revealed everything on one 80ms stagger would contain the same
   information and communicate nothing.

        0ms  ring and band, from zero
      380ms  the AI pill and the confidence chip
      640ms  the summary sentence
     1120ms  relationship chips, 60ms stagger
     1400ms  the FIRST card — the partial — alone            ← pause
     1980ms  the remaining matches, 80ms stagger
     2420ms  not found in profile                            ← pause
     2760ms  the footer

   On aria-live: the panel is a labelled group and the live region is a single
   atomic summary element, so a candidate switch is announced ONCE rather than
   field by field.
   ========================================================================== */

const BEATS = {
  ring: 0,
  pills: 380,
  summary: 640,
  relRule: 1060,
  rel: 1120,
  firstCard: 1400,
  restRule: 1900,
  rest: 1980,
  missingRule: 2420,
  missing: 2480,
  footer: 2760,
};

/**
 * @param {object}   o
 * @param {string}   o.id           panel id, for the switcher and aria
 * @param {string}   o.candidateId  a CANDIDATES / EXPLAIN key
 * @param {boolean} [o.sequenced]   run the P2 beat sequence
 * @param {boolean} [o.crop]        head and summary only, for a pillar crop
 * @param {boolean} [o.showFooter]  the "AI-generated · Cached" line
 * @param {number}  [o.ringSize]    52 in the drawer, 38 on a row
 */
export function explainPanel({
  id = 'panel',
  candidateId = 'c1',
  sequenced = true,
  crop = false,
  showFooter = true,
  ringSize = 52,
  showIdent = true,
} = {}) {
  const c = candidate(candidateId);
  const e = explain(candidateId);
  const s = sequenced;

  /* PHASE 5. `showIdent: false` drops the identity block, because inside
     `jobWorkspace()`'s drawer the name, the headline and the close control are
     `drawerHead()`'s job and rendering them twice in one drawer is the kind of
     defect only opening the page finds. The verdict row — ring, AI pill,
     confidence — stays, because it is the panel's own subject. */
  const ident = showIdent
    ? `      <div class="panel__ident">
        <h3 class="panel__name" data-field="name">${esc(c.name)}</h3>
        <p class="panel__meta" data-field="meta">${esc(c.role)} · ${esc(c.company)} · ${esc(c.location)}</p>
      </div>`
    : '';

  /* No modifier class: `.panel__head` is a flex row with `space-between`, so a
     single remaining child sits at the start on its own. A new class is a last
     resort (CLAUDE.md § 3 rule 2) and this one would have carried no rules. */
  const head = `    <div class="panel__head">
${ident}
      <div class="panel__verdict">
        ${scoreRing({ score: c.score, size: ringSize, band: c.classification, fields: true, sequenced: s })}
        <span class="panel__pills">
          ${aiPill()}
          ${confidenceChip({ level: e.confidence, sequenced: s })}
        </span>
      </div>
    </div>
    <p class="panel__summary" data-field="summary"${beat(BEATS.summary, s)}>${esc(e.summary)}</p>
    <p class="sr-only" data-field="sr-verdict">Match score ${c.score} out of 100, ${esc(CLASSIFICATIONS[c.classification].label)}. Explanation confidence: ${esc(CONFIDENCE[e.confidence].label.toLowerCase())}. AI-generated.</p>`;

  if (crop) {
    /* The pillar crop: head and summary, nothing else. The full panel is
       unreadable at crop size, and product-visualization.md § 3 says crop
       rather than shrink. */
    return `  <div class="panel panel--crop" id="${id}">
${head}
  </div>`;
  }

  const rels = relationshipsUsed(candidateId);
  const connect = `    <div class="panel__block">
      <p class="panel__rule"${beat(BEATS.relRule, s)}>How the concepts connect</p>
      <div class="relchips" data-field="relchips">
${rels.map((r, i) => `        ${relationshipChip(r, i, s)}`).join('\n')}
      </div>
      <span class="sr-only" data-field="sr-rel">Relationship types used in this explanation: ${esc(rels.join(', '))}.</span>
    </div>`;

  /* The partial comes FIRST and alone. It is the hinge of the whole site: a
     skill the candidate never typed, counted anyway, with the reason named. */
  const firstPartial = e.partial[0];
  const restPartial = e.partial.slice(1);

  const strong = `    <div class="panel__block">
      <p class="panel__rule"${beat(BEATS.restRule, s)}>Strong matches</p>
      <div class="concepts" data-field="concepts-strong">
${e.strong.map((m, i) => conceptCard(m, { at: s ? BEATS.rest + i * 80 : null })).join('\n')}
      </div>
    </div>`;

  const partial = `    <div class="panel__block">
      <p class="panel__rule"${beat(BEATS.firstCard - 60, s)}>Partial matches</p>
      <div class="concepts" data-field="concepts-partial">
${[firstPartial, ...restPartial]
    .filter(Boolean)
    .map((m, i) => conceptCard(m, { muted: true, at: s ? (i === 0 ? BEATS.firstCard : BEATS.rest + 160 + i * 80) : null }))
    .join('\n')}
      </div>
    </div>`;

  const missing = `    <div class="panel__block">
      <p class="panel__rule"${beat(BEATS.missingRule, s)}>Not found in profile</p>
      <div class="missing" data-field="concepts-missing"${beat(BEATS.missing, s)}>
${e.missing.map(missingRow).join('\n')}
      </div>
    </div>`;

  const footer = showFooter
    ? `    <p class="panel__foot"${beat(BEATS.footer, s)}>
      <span class="panel__foot-state">${esc(PANEL_FOOTER.generated)} <span aria-hidden="true">·</span> ${esc(PANEL_FOOTER.cached)}</span>
      <span class="panel__foot-action">${esc(PANEL_FOOTER.action)}</span>
    </p>`
    : '';

  return `  <div class="panel" id="${id}"${s ? ' data-sequence' : ''} role="group" aria-labelledby="${id}-label">
    <p class="sr-only" id="${id}-label">Match explanation</p>
    <p class="sr-only" data-field="announce" aria-live="polite" aria-atomic="true"></p>
${head}
${connect}
${partial}
${strong}
${missing}
${footer}
  </div>`;
}

/** The switcher. Real buttons, aria-pressed, values from the data module. */
export function switcher({ panelId, ids, label = 'Choose a candidate' }) {
  return `<div class="argument__switcher">
  <p class="switcher__label" id="${panelId}-switcher-label">Switch candidate</p>
  <div class="switcher" role="group" aria-labelledby="${panelId}-switcher-label" data-switcher="${panelId}">
${ids.map((id, i) => {
  const c = candidate(id);
  return `    <button type="button" class="chip" data-candidate="${c.id}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(c.name)}</button>`;
}).join('\n')}
  </div>
</div>`;
}

/* ==========================================================================
   C3 — Skill relationship graph ★

   An abstract system diagram, not a screen: the relationship is a property of
   the taxonomy, no product surface displays a graph, and dressing this as a
   frame would invent product UI. Inline SVG, no `.frame` chrome.

   THE DATA DISCIPLINE, RESTATED FOR PHASE 4. The rule has not changed — an
   invented edge is an invented capability — but the set of real edges has. The
   schema holds NINE relationship types, each with a strength and a
   bidirectional flag, and job titles carry a further five of their own
   (`docs/phase-4.md` § 1.2). Phase 3 showed three, because three was all the
   planning document confirmed.

   The drawn edges are unchanged, because the narrative depends on them: the
   primary edge is Docker→Kubernetes, which continues the worked example, and
   the secondary is React→Vue, which now carries its real type — `transferable
   to`, not `similar to`. The other seven types are stated in copy and in the
   structured description rather than crowded onto the diagram; a nine-node
   graph would be a picture of a schema rather than an explanation of a score.

   The SVG is aria-hidden and a structured description carries the same
   information, which is what lets the hover labels be decoration rather than
   the only carrier of meaning.
   ========================================================================== */

const PRIMARY_EDGE = SKILL_EDGES.find((e) => e.primary);
const SECONDARY_EDGE = SKILL_EDGES.find((e) => e.from === 'React');

function graphSVG({ tall }) {
  if (tall) {
    return `  <svg class="graph__svg graph__svg--tall" viewBox="0 0 340 520" aria-hidden="true" focusable="false">
    <g class="node node--required">
      <rect class="node__box" x="40" y="20" width="260" height="58" rx="10"/>
      <text class="node__role" x="56" y="42">REQUIRED BY THE JOB</text>
      <text class="node__name" x="56" y="64">Kubernetes</text>
    </g>
    <g class="edge">
      <path class="edge__path" d="M170 220 L170 92" data-beat="400"/>
      <polygon class="edge__arrow" points="170,80 164,94 176,94" data-beat="900" data-beat-fade/>
      <text class="edge__label" x="184" y="160" data-beat="900" data-beat-fade>${esc(PRIMARY_EDGE.type)}</text>
    </g>
    <g class="node node--profile">
      <rect class="node__box" x="40" y="220" width="260" height="58" rx="10"/>
      <text class="node__role" x="56" y="242">ON THE PROFILE</text>
      <text class="node__name" x="56" y="264">Docker</text>
    </g>
    <text class="graph__note" x="56" y="306">SNEHA IYER · STAFF ENGINEER</text>
    <line class="graph__divider" x1="40" y1="344" x2="300" y2="344"/>
    <text class="graph__note" x="40" y="370">ANOTHER EDGE IN THE SAME GRAPH</text>
    <g class="node node--aside" data-beat="1100" data-beat-fade>
      <rect class="node__box" x="70" y="392" width="200" height="42" rx="8"/>
      <text class="node__name" x="86" y="418">${esc(SECONDARY_EDGE.from)}</text>
    </g>
    <g class="edge" data-beat="1100" data-beat-fade>
      <path class="edge__path edge__path--secondary" d="M170 434 L170 466"/>
      <polygon class="edge__arrow edge__arrow--secondary" points="170,474 165,464 175,464"/>
      <text class="edge__label edge__label--secondary" x="184" y="456">${esc(SECONDARY_EDGE.type)}</text>
    </g>
    <g class="node node--aside" data-beat="1100" data-beat-fade>
      <rect class="node__box" x="70" y="474" width="200" height="42" rx="8"/>
      <text class="node__name" x="86" y="500">${esc(SECONDARY_EDGE.to)}</text>
    </g>
  </svg>`;
  }

  return `  <svg class="graph__svg graph__svg--wide" viewBox="0 0 760 500" aria-hidden="true" focusable="false">
    <g class="node node--required">
      <rect class="node__box" x="230" y="30" width="240" height="62" rx="10"/>
      <text class="node__role" x="248" y="54">REQUIRED BY THE JOB</text>
      <text class="node__name" x="248" y="78">Kubernetes</text>
      <text class="node__reading" x="484" y="66">${esc(PRIMARY_EDGE.reading)}</text>
    </g>
    <g class="edge">
      <path class="edge__path" d="M350 232 L350 106" data-beat="400"/>
      <polygon class="edge__arrow" points="350,94 344,108 356,108" data-beat="900" data-beat-fade/>
      <text class="edge__label" x="364" y="174" data-beat="900" data-beat-fade>${esc(PRIMARY_EDGE.type)}</text>
    </g>
    <g class="node node--profile">
      <rect class="node__box" x="230" y="232" width="240" height="62" rx="10"/>
      <text class="node__role" x="248" y="256">ON THE PROFILE</text>
      <text class="node__name" x="248" y="280">Docker</text>
    </g>
    <text class="graph__note" x="230" y="324">SNEHA IYER · STAFF ENGINEER · 6.2 YEARS</text>
    <line class="graph__divider" x1="60" y1="364" x2="700" y2="364"/>
    <text class="graph__note" x="60" y="390">ANOTHER EDGE IN THE SAME GRAPH</text>
    <g class="node node--aside" data-beat="1100" data-beat-fade>
      <rect class="node__box" x="180" y="420" width="150" height="44" rx="8"/>
      <text class="node__name" x="196" y="447">${esc(SECONDARY_EDGE.from)}</text>
    </g>
    <g class="edge" data-beat="1100" data-beat-fade>
      <path class="edge__path edge__path--secondary" d="M330 442 L422 442"/>
      <polygon class="edge__arrow edge__arrow--secondary" points="430,442 420,437 420,447"/>
      <text class="edge__label edge__label--secondary" x="376" y="432" text-anchor="middle">${esc(SECONDARY_EDGE.type)}</text>
    </g>
    <g class="node node--aside" data-beat="1100" data-beat-fade>
      <rect class="node__box" x="430" y="420" width="150" height="44" rx="8"/>
      <text class="node__name" x="446" y="447">${esc(SECONDARY_EDGE.to)}</text>
    </g>
  </svg>`;
}

/**
 * The payoff. Without the relationship, a candidate who never typed the word
 * "Kubernetes" falls behind four people who did; with it, she holds the top of
 * the list. `07 § 4` calls this beat the thing that converts an abstract
 * diagram into a consequence — without it the section is a nice picture of a
 * graph.
 *
 * No invented rank number: the spec's "#9 to #1" is illustrative, and the
 * mechanism is the claim, not the arithmetic.
 */
function payoff() {
  const subject = candidate('c1');
  const others = ['c2', 'c4', 'c6'].map(candidate);

  return `  <div class="payoff">
    <p class="payoff__label">the same list, with the relationship applied</p>
    <div class="payoff__row payoff__row--subject" data-beat="1900">
      <span class="payoff__pos">01</span>
      <span>${esc(subject.name)}</span>
      <span class="chip chip--mono chip--${subject.classification}">${esc(CLASSIFICATIONS[subject.classification].short)}</span>
    </div>
${others.map((c, i) => `    <div class="payoff__row payoff__row--displaced" data-beat="1900">
      <span class="payoff__pos">0${i + 2}</span>
      <span>${esc(c.name)}</span>
      <span class="chip chip--mono chip--${c.classification}">${esc(CLASSIFICATIONS[c.classification].short)}</span>
    </div>`).join('\n')}
  </div>`;
}

export function skillGraph() {
  const partial = candidate('c1').skills.partial[0];

  return `<div class="graph" data-sequence data-parallax="0.02">
${graphSVG({ tall: false })}
${graphSVG({ tall: true })}

  <div class="sr-only">
    <h3>The relationship behind a partial skill</h3>
    <p>The job requires Kubernetes. Sneha Iyer's profile does not list Kubernetes; it lists Docker.</p>
    <p>The skill taxonomy holds a typed relationship between them: ${esc(PRIMARY_EDGE.reading)}. The relationship type is "${esc(PRIMARY_EDGE.type)}".</p>
    <p>Because of that relationship, Kubernetes is scored ${esc(SKILL_STATES.partial.word)} rather than missing, and the transfer is stated on the match explanation as "${esc(partial.transfer)}".</p>
    <p>A second relationship in the same graph: ${esc(SECONDARY_EDGE.reading)}, of type "${esc(SECONDARY_EDGE.type)}".</p>
    <p>The taxonomy models nine relationship types: ${esc(EDGE_TYPES.join(', '))}. Each one carries a strength, and some are bidirectional.</p>
    <p>Job titles carry their own graph on top of the skills, with five further types: ${esc(ROLE_EDGE_TYPES.join(', '))}.</p>
  </div>

  <div class="graph__verdict" data-beat="1500">
    <p class="graph__verdict-line">→ scored <strong>${esc(SKILL_STATES.partial.label.toUpperCase())}</strong>, not ${esc(SKILL_STATES.missing.label.toUpperCase())}</p>
  </div>

${payoff()}

  <p class="graph__caption">typed · hierarchical · nine weighted relationship types · a second graph over job titles · aligned to ESCO and O*NET</p>
</div>`;
}

/* ==========================================================================
   C4 — Importance controls and what-if ★

   Two controls, visually separate, because tuning changes the ORDER and
   simulation changes the POOL.

   Precomputed outcomes only: every ordering is a lookup into RANKINGS, a frozen
   fixture of all sixty-four tier combinations. The demo ships no arithmetic.
   ========================================================================== */

export function tuner({ listId = 'control-list' } = {}) {
  const combo = DEFAULT_COMBO.split('-').map(Number);

  const sliders = TUNABLE.map((t, i) => {
    const word = TIER_WORDS[combo[i]];
    /* At 390px only one control survives (`05 § 4`); Kubernetes is the one
       worth keeping, because sections 06 and 07 just explained it. */
    const optional = t.key !== 'kubernetes';
    return `      <div class="weight"${optional ? ' data-optional="true"' : ''}>
        <label class="weight__head" for="weight-${t.key}">
          <span class="weight__skill">${esc(t.skill)}</span>
          <span class="weight__tier" data-weight-readout="${t.key}" data-tone="${IMPORTANCE_TONES[word]}">${esc(word)}</span>
        </label>
        <input type="range" id="weight-${t.key}" min="0" max="3" step="1" value="${combo[i]}"
               data-weight="${t.key}" data-skill="${esc(t.skill)}"
               aria-valuetext="${esc(t.skill)}: ${esc(word)}">
        <div class="weight__scale" aria-hidden="true">
${TIER_WORDS.map((w) => `          <span>${esc(w)}</span>`).join('\n')}
        </div>
      </div>`;
  }).join('\n');

  return `<div class="tuner" data-tuner="${listId}">
  <div class="weights" role="group" aria-label="Skill importance">
${sliders}
    <p class="sr-only" role="status" data-field="tuner-announce"></p>
  </div>

  <div class="whatif">
    <div class="whatif__head">
      <p class="whatif__title">What if</p>
      <label class="toggle">
        <input type="checkbox" data-whatif>
        <span>${esc(WHAT_IF.control)}</span>
      </label>
    </div>
    <p class="whatif__readout">
      <span>qualified pool</span>
      <span class="whatif__figure" data-count="${WHAT_IF.before}" data-whatif-figure>${WHAT_IF.before}</span>
      <span class="whatif__delta" data-whatif-delta hidden>+${WHAT_IF.delta}</span>
      <span class="example-tag">${esc(WHAT_IF.note)}</span>
    </p>
    <p class="whatif__note">
      No analytics values are published yet. These two figures illustrate the
      control; they are not measured.
    </p>
    <p class="sr-only" role="status" data-field="whatif-announce"></p>
  </div>
</div>`;
}

/* ==========================================================================
   Requisition and dual-mode search

   The four importance tiers are the load-bearing element: they are what the
   controls manipulate and what the whole ranking is measured against.

   PHASE 4. Each tier now carries the product's own tone — critical rose,
   required amber, preferred indigo, bonus neutral (`docs/phase-4.md` § 1.9) —
   so a visitor who converts meets the same colours on day one. Phase 3 rendered
   critical in amber, which is the colour the app uses for the tier BELOW it.

   No JD quality score. The JD optimizer exists, but its output is a report of
   issues, not a number — and a fabricated 9.2 would be a fabricated metric.
   ========================================================================== */

export function requisition() {
  const tiers = JOB.tiers.map((t, i) => `      <div class="req__tier req__tier--${t.key}" data-tone="${IMPORTANCE_TONES[t.key]}" data-beat="${200 + i * 160}">
        <p class="req__tierlabel">${esc(t.label)}</p>
        <div class="req__chips">
${t.skills.map((s) => `          <span class="chip">${esc(s)}</span>`).join('\n')}
        </div>
      </div>`).join('\n');

  return `  <div class="req" data-sequence>
    <div class="req__head">
      <h3 class="req__title">${esc(JOB.title)}</h3>
      <span class="chip chip--mono chip--strong">${esc(JOB.status)}</span>
    </div>
    <div class="req__meta">
      <span>${esc(JOB.department)} · ${esc(JOB.employment)} · ${esc(JOB.level)} · ${esc(JOB.mode)}</span>
      <span>${esc(JOB.location)} · ${esc(JOB.experience)} · ${esc(JOB.salary)}</span>
    </div>
    <div class="req__tiers">
${tiers}
    </div>

    <div class="dualmode" data-dualmode>
      <div class="segmented" role="group" aria-label="Search mode">
${JOB.search.modes.map((m, i) => `        <button type="button" class="segmented__opt${i === 0 ? ' is-active' : ''}" data-mode="${m.key}" aria-selected="${i === 0 ? 'true' : 'false'}">${esc(m.label)}</button>`).join('\n')}
      </div>
      <div class="tab-panel" data-mode-panel="filters">
        <div class="dualmode__filters">
${JOB.search.filters.map((f) => `          <span class="chip">${esc(f)}</span>`).join('\n')}
        </div>
      </div>
      <div class="tab-panel" data-mode-panel="describe" hidden>
        <p class="dualmode__query">“${esc(JOB.search.example)}”</p>
      </div>
    </div>
  </div>`;
}

/* ==========================================================================
   Pipeline

   Seven stage columns with the product's own names, a count per stage, and
   two or three minimal cards. One card advances one stage, once, on reveal.

   PHASE 4. "Offer" became "Offer out", and the seventh column — "Not moving
   forward" — is now shown, in a NEUTRAL tone. Phase 3 hid rejection from the
   visible flow; the product does not, on the stated principle that "a candidate
   who was not right for one role is not a failure state", and hiding the stage
   implied the opposite of that.

   Interview times, meeting links and calendar sync all exist in the product
   and are named in copy rather than drawn. No composition shows a calendar:
   the sync is live (maintainer, 28 Sep 2026) but its interface is undescribed,
   and drawing one would invent it.
   ========================================================================== */

export function pipeline() {
  const stages = PIPELINE.stages.map((stage) => {
    const cards = stage.cards.map((id) => {
      const c = candidate(id);
      return `          <div class="pipeline__card${stage.advancing ? ' pipeline__card--advancing' : ''}">
            <span>${esc(c.name)}</span>
            <span class="chip chip--mono chip--${c.classification}">${esc(CLASSIFICATIONS[c.classification].short)}</span>
          </div>`;
    }).join('\n');

    return `        <li class="pipeline__stage${stage.quiet ? ' pipeline__stage--quiet' : ''}">
          <p class="pipeline__name">${esc(stage.name)}</p>
          <p class="pipeline__count">${stage.count}</p>
${cards}
        </li>`;
  }).join('\n');

  return `  <div class="pipeline">
    <p class="sr-only" id="pipeline-summary">Hiring pipeline stages, with the number of candidates in each: ${PIPELINE.stages.map((s) => `${s.name} ${s.count}`).join(', ')}.</p>
    <ul class="pipeline__stages" aria-describedby="pipeline-summary">
${stages}
    </ul>
    <p class="pipeline__caption">${esc(PIPELINE.caption)}</p>
  </div>`;
}

/* ==========================================================================
   C8 — Candidate match view

   Deliberately mobile-shaped, because that is where candidates are.

   The rule that carries section 10: IT IS THE SAME 87. Rendering a different
   number, or hiding it, would waste the strongest structural claim on the site.

   Deliberately absent: the AI narrative and the logged weights. Whether
   candidates see those is an open question, and the four things shown here are
   all confirmed.
   ========================================================================== */

/**
 * The candidate-side rows.
 *
 * PHASE 4. `FIT_SPLIT.fit` holds DIMENSION keys and `FIT_SPLIT.gap` holds
 * MODIFIER keys, and the two render differently on purpose: a dimension shows
 * its share of the weight, a modifier shows its shape. Rendering salary as a
 * peer of skill coverage is the defect the whole of Work stream A exists to
 * correct, and this is the one place a careless helper could reintroduce it.
 */
function fitRows(c, keys, { modifier = false } = {}) {
  return keys.map((key) => {
    const value = c.dimensions[key];
    if (modifier) {
      const m = MODIFIERS.find((x) => x.key === key);
      return `        <div class="cview__row">
          <dt class="cview__label">${esc(m.label)} <span class="cview__shape">${esc(m.shape)}</span></dt>
          <dd class="cview__value"><span aria-hidden="true">${value}</span><span class="sr-only">${esc(m.label)}: ${value} out of 100. ${esc(m.note)}</span></dd>
        </div>`;
    }
    const d = DIMENSIONS.find((x) => x.key === key);
    return `        <div class="cview__row">
          <dt class="cview__label">${esc(d.label)} <span class="cview__weight">${Math.round(d.weight * 100)}%</span></dt>
          <dd class="cview__value"><span aria-hidden="true">${value}</span><span class="sr-only">${esc(d.label)}, ${Math.round(d.weight * 100)} per cent of the weight: ${value} out of 100.</span></dd>
        </div>`;
  }).join('\n');
}

export function candidateView() {
  const c = candidate(CANDIDATE_VIEW.candidate);
  const partial = c.skills.partial[0];

  return `  <div class="cview">
    <div>
      <h3 class="cview__job">${esc(JOB.title)}</h3>
      <p class="cview__meta">Payments · ${esc(JOB.locationShort)} · ${esc(JOB.mode)}</p>
    </div>

    <div class="cview__score">
      ${score(c, { size: 'score--lg' })}
      <p class="cview__same">the same score the recruiter sees</p>
    </div>

    <div class="panel__block">
      <p class="panel__rule">Where you fit</p>
      <dl class="cview__rows">
${fitRows(c, FIT_SPLIT.fit)}
      </dl>
    </div>

    <div class="panel__block">
      <p class="panel__rule">Where you don't</p>
      <dl class="cview__rows">
${fitRows(c, FIT_SPLIT.gap, { modifier: true })}
      </dl>
      <div class="skillrow skillrow--partial">
        <span class="skillrow__glyph" aria-hidden="true">${SKILL_STATES.partial.glyph}</span>
        <span class="skillrow__state" aria-hidden="true">${esc(SKILL_STATES.partial.label)}</span>
        <ul class="skillrow__items">
          <li class="skill">${esc(partial.name)}</li>
          <li class="skill__transfer">your ${esc(partial.transfer)}</li>
        </ul>
        <span class="sr-only">${esc(partial.name)}: ${esc(SKILL_STATES.partial.word)} — your ${esc(partial.transfer)}.</span>
      </div>
    </div>

    <div class="panel__block">
      <p class="panel__rule">Your application</p>
      <ol class="trail">
${CANDIDATE_VIEW.application.map((step) => {
  const current = step === CANDIDATE_VIEW.applicationCurrent;
  return `        <li class="trail__step ${current ? 'trail__step--current' : 'trail__step--done'}">${esc(step)}${current ? '<span class="sr-only"> — current status</span>' : ''}</li>`;
}).join('\n')}
      </ol>
    </div>
  </div>`;
}

/* ==========================================================================
   C10 — Résumé quality and skill gaps

   The score is deliberately low. A mockup showing 95 has nothing to offer the
   reader; a 62 with two named suggestions demonstrates the product being
   useful. Kubernetes at the top of the gap list closes the loop with sections
   06 and 07 from the candidate's side — the same skill, seen from three
   positions on one page.

   The unlock counts are illustrative and carry the example label.
   ========================================================================== */

export function resumeAndGaps() {
  return `  <div>
    <div class="quality">
      <p class="panel__rule">Résumé quality</p>
      <div class="quality__head">
        <p class="score score--sm">
          <span class="score__value" data-count="${RESUME.quality}">${RESUME.quality}</span>
          <span class="score__scale" aria-hidden="true">/100</span>
          <span class="sr-only">Résumé quality score ${RESUME.quality} out of 100.</span>
        </p>
        <p class="quality__count">${RESUME.suggestionCount} suggestions</p>
      </div>
      <div class="meter meter--warn" aria-hidden="true"><span class="meter__fill" style="--meter-v: ${(RESUME.quality / 100).toFixed(2)}"></span></div>
      <ul class="quality__list">
${RESUME.suggestions.map((s) => `        <li class="quality__item">${esc(s)}</li>`).join('\n')}
      </ul>
    </div>

    <div class="gaps">
      <p class="panel__rule">Skills that would open more roles</p>
${RESUME.gaps.map((g) => `      <div class="gaps__row">
        <span class="gaps__skill">${esc(g.skill)}</span>
        <span class="gaps__unlock">+${g.unlocks} roles</span>
        <span class="gaps__demand">${esc(g.demand)} demand</span>
      </div>`).join('\n')}
      <p class="composition-note" style="text-align:left"><span class="example-tag">${esc(RESUME.note)}</span></p>
    </div>
  </div>`;
}

/* ==========================================================================
   criticalGate — an exclusion that explains itself
   --------------------------------------------------------------------------
   Small, one purpose, and it is the visual proof of the homepage's corrected
   § 05 headline. A candidate missing a CRITICAL skill is dropped at the
   retrieval layer and never reaches the scorer, so the row shows no score —
   not a low one. Which requirement dropped them is named, because an exclusion
   should be as explicable as a ranking.

   No motion beyond the group reveal. A dropped candidate is not a beat.
   ========================================================================== */

export function criticalGate() {
  return `  <div class="gate">
    <p class="gate__label">${esc(CRITICAL_GATE.label)}</p>
    <div class="gate__row">
      ${avatar(GATED.name)}
      <span class="rank__ident">
        <span class="rank__name">${esc(GATED.name)}</span>
        <span class="rank__headline">${esc(GATED.headline)}</span>
      </span>
      <span class="gate__struck" aria-hidden="true">—</span>
      <span class="gate__verdict">${esc(GATED.verdict)}</span>
      <span class="gate__reason">Missing ${esc(GATED.tier)}: ${esc(GATED.reason)}</span>
    </div>
    <p class="gate__note">${esc(CRITICAL_GATE.recorded)}</p>
    <span class="sr-only">${esc(GATED.name)}, ${esc(GATED.headline)}: not scored. Disqualified before scoring for a missing ${esc(GATED.tier)} requirement, ${esc(GATED.reason)}. ${esc(CRITICAL_GATE.recorded)}</span>
  </div>`;
}

/* ==========================================================================
   scoreModel — the arithmetic, published
   --------------------------------------------------------------------------
   The highest-value piece of new copy in Phase 4 needed a composition that
   converts the site's thesis from a claim into something a reader can check.

   ONE ORDERED BAR, not four meters. The PROPORTION is the claim: skill coverage
   is nearly two thirds of the weight, and four separate bars would show four
   magnitudes while hiding the only fact that matters. Then the modifiers, as a
   row rather than as bars, because they are multiplications and a bar would
   read as a fifth dimension — which is the exact defect this composition was
   built to correct.

   Motion: P1 meter fill, four segments on a 90ms stagger, left to right.
   ========================================================================== */

export function scoreModel() {
  const segments = DIMENSIONS.map((d, i) => {
    const pct = Math.round(d.weight * 100);
    return `        <span class="wbar__seg wbar__seg--${d.key}" style="--w: ${pct}; --meter-delay: ${i * 90}ms" data-beat="${i * 90}">
          <span class="sr-only">${esc(d.label)}: ${pct}% of the weight.</span>
        </span>`;
  }).join('\n');

  const keys = DIMENSIONS.map((d) => `        <span class="wbar__key wbar__key--${d.key}">
          <span class="wbar__keydot" aria-hidden="true"></span>
          <span class="wbar__keylabel">${esc(d.label)}</span>
          <span class="wbar__keyvalue">${Math.round(d.weight * 100)}%</span>
        </span>`).join('\n');

  const mods = MODIFIERS.map((m, i) => `        <div class="modrow" data-beat="${520 + i * 80}">
          <span class="modrow__shape" aria-hidden="true">${esc(m.shape)}</span>
          <span class="modrow__label">${esc(m.label)}</span>
          <span class="modrow__note">${esc(m.note)}</span>
        </div>`).join('\n');

  const bands = BANDS.map((b) => `        <span class="bandkey bandkey--${b.key}">
          <span class="bandkey__min">${b.min === 0 ? 'below' : b.min}</span>
          <span class="bandkey__label">${esc(b.label)}</span>
        </span>`).join('\n');

  return `  <div class="model" data-sequence>
    <div class="model__block">
      <p class="panel__rule" data-beat="0">The weighted score</p>
      <div class="wbar" role="img" aria-label="${esc(DIMENSIONS.map((d) => `${d.label} ${Math.round(d.weight * 100)} per cent`).join(', '))}">
${segments}
      </div>
      <div class="wbar__keys">
${keys}
      </div>
    </div>

    <div class="model__block">
      <p class="panel__rule" data-beat="480">Then, in this order</p>
      <div class="mods">
${mods}
      </div>
    </div>

    <div class="model__block">
      <p class="panel__rule" data-beat="800">Before any of it</p>
      <div class="gatebar" data-beat="860">
        <span class="gatebar__label">${esc(CRITICAL_GATE.label)}</span>
        <span class="gatebar__line">${esc(CRITICAL_GATE.line)} ${esc(CRITICAL_GATE.recorded)}</span>
      </div>
    </div>

    <div class="model__block">
      <p class="panel__rule" data-beat="1000">And the classification</p>
      <div class="bandkeys" data-beat="1060">
${bands}
      </div>
    </div>
  </div>`;
}

/* ==========================================================================
   poolBands — the score distribution, as one ordered bar
   --------------------------------------------------------------------------
   EXPLICITLY NOT A DONUT. The product rejected a ring for this exact data with
   a reason worth reproducing: *"a ring has no beginning, so 'strong' and 'weak'
   read as two peer slices rather than the two ends of a scale."* Ordinal data
   gets an ordered bar. Recorded as a general rule in
   docs/product-visualization.md.

   The four segments sum to JOB.pool.total by construction — a stacked bar whose
   parts do not sum is a lie about a proportion. The gated count sits outside
   the bar, because those candidates were never scored.
   ========================================================================== */

export function poolBands({ showGate = true } = {}) {
  const total = JOB.pool.total;
  const segs = BANDS.map((b, i) => {
    const n = JOB.pool[b.key];
    return `      <span class="pbar__seg pbar__seg--${b.key}" style="--w: ${((n / total) * 100).toFixed(1)}; --meter-delay: ${i * 90}ms">
        <span class="pbar__n">${n}</span>
        <span class="pbar__label">${esc(b.label)}</span>
      </span>`;
  }).join('\n');

  return `  <div class="pbar-wrap">
    <div class="pbar" role="img" aria-label="${total} candidates scored against this role: ${esc(BANDS.map((b) => `${JOB.pool[b.key]} ${b.label.toLowerCase()}`).join(', '))}.">
${segs}
    </div>
${showGate ? `    <p class="pbar__gate">${JOB.pool.gated} more were dropped by the critical gate and never scored.</p>` : ''}
  </div>`;
}

/* ==========================================================================
   missionConsole ★ — Always-On Sourcing
   --------------------------------------------------------------------------
   The centrepiece of /product/sourcing, and the capability the site did not
   describe at all. Models MissionHeader + MissionProgressStrip +
   StrategyHistoryPanel (`docs/phase-4.md` § 1.5).

   THREE THINGS IT HAS TO GET RIGHT, all of them quoted from the source:

     1. SHOW THE REFUSALS. The declined row is not decoration. "Seeing 'you
        turned this down' is what makes the rest of the list credible", and it
        is the visual argument that the agent has guardrails.
     2. NEW COUNTS, NEVER RESULT COUNTS. A search that returned fifty people the
        mission had already seen found nobody.
     3. EXACTLY ONE FEATURED TILE. The headline metric is found against target.

   Motion: P1 meter fill on the progress bar, P2 sequenced beats on the strategy
   rows. No new primitive.
   ========================================================================== */

export function missionConsole() {
  const pct = ((MISSION.found / MISSION.target) * 100).toFixed(0);

  const tiles = MISSION.tiles.map((t, i) => `        <div class="tile" data-beat="${240 + i * 70}">
          <p class="tile__value">${t.value}</p>
          <p class="tile__label">${esc(t.label)}</p>
        </div>`).join('\n');

  const strategies = MISSION.strategies.map((st, i) => {
    const glyph = st.status === 'done' ? '✓' : st.status === 'declined' ? '⊘' : '⧗';
    const right = st.status === 'done'
      ? `<span class="strat__new">${st.newFound} new</span>`
      : `<span class="strat__note">${esc(st.note)}</span>`;
    return `        <li class="strat strat--${st.status}" data-beat="${700 + i * 110}">
          <span class="strat__glyph" aria-hidden="true">${glyph}</span>
          <span class="strat__kind">${esc(st.kind)}:</span>
          <span class="strat__detail">${esc(st.detail)}</span>
          ${right}
        </li>`;
  }).join('\n');

  return `  <div class="mission" data-sequence>
    <div class="mission__head">
      <h3 class="mission__job">${esc(JOB.title)}</h3>
      <span class="pill pill--info pill--status" data-beat="0">
        <span class="pill__dot" aria-hidden="true"></span>${esc(MISSION_STATUS[MISSION.status])}
      </span>
    </div>

    <div class="mission__strip">
      <div class="tile tile--featured" data-beat="160">
        <p class="tile__value"><span data-count="${MISSION.found}">${MISSION.found}</span> <span class="tile__of">/ ${MISSION.target}</span></p>
        <p class="tile__label">${esc(MISSION.featured.label)}</p>
        ${meter({ value: Number(pct), variant: 'meter--ok' })}
      </div>
${tiles}
    </div>

    <div class="mission__history">
      <p class="panel__rule" data-beat="640">Every approach tried</p>
      <ul class="strats">
${strategies}
      </ul>
    </div>

    <span class="sr-only">Mission status: ${esc(MISSION_STATUS[MISSION.status])}. ${MISSION.found} of ${MISSION.target} matching this role at the target band. ${MISSION.strategies.filter((x) => x.status === 'done').length} approaches run, one declined by the recruiter, one awaiting approval. Every count is people this mission had not seen before.</span>
  </div>`;
}

/* ==========================================================================
   marketCovered — the agent's terminal honest state
   --------------------------------------------------------------------------
   Per the source, *"the most valuable output in the feature."* When the agent
   has covered the market it says so and recommends what to relax, with a
   measured impact against each option.

   THE ZERO ROW IS NOT OPTIONAL. The source distinguishes three answers —
   unmeasurable (render nothing), zero (say so out loud), positive (label it an
   estimate) — because *"a plausible invented number is worse than a blank, and
   a recruiter will act on it."* A composition that showed only the wins would
   misrepresent the feature, so the option that changes nothing is included and
   is the whole point of including any of them.
   ========================================================================== */

export function marketCovered() {
  const rows = MARKET_COVERED.options.map((o) => {
    if (o.impact === null) return '';
    const right = o.impact === 0
      ? `<span class="covered__zero">no change at your level</span>`
      : `<span class="covered__gain">≈ ${o.impact} more strong</span>`;
    return `      <li class="covered__row">
        <span class="covered__change">${esc(o.change)}</span>
        ${right}
      </li>`;
  }).filter(Boolean).join('\n');

  return `  <div class="covered">
    <p class="pill pill--none pill--status">
      <span class="pill__dot" aria-hidden="true"></span>${esc(MISSION_STATUS[MARKET_COVERED.status])}
    </p>
    <p class="covered__line">${esc(MARKET_COVERED.line)}</p>
    <ul class="covered__list">
${rows}
    </ul>
    <p class="composition-note composition-note--left"><span class="example-tag">${esc(MARKET_COVERED.note)}</span></p>
  </div>`;
}

/* ==========================================================================
   structuralFairness — how a job description narrows the pool
   --------------------------------------------------------------------------
   The framing is the product's own, and the last clause of it is the single
   most valuable trust sentence available to this site: it is a statement of
   fact about the software, and it is legally safe in a way that "bias-free" and
   "defensible" are not.

   THE REFUSAL TO RATE IS THE MOST PERSUASIVE PART. Below its minimum number of
   scored candidates the service declines to rate distribution at all. A product
   that will not give you a metric it cannot support is this site's philosophy,
   shipped. `docs/phase-4.md` § 3.6: do not cut it for space.

   The shortfall count reads from JOB.pool so this composition and the pool
   composition cannot disagree.
   ========================================================================== */

export function structuralFairness() {
  const flags = FAIRNESS.shown.map((term) => {
    const f = FAIRNESS.flags.find((x) => x.term === term);
    return `      <li class="flag">
        <span class="flag__glyph" aria-hidden="true">⚑</span>
        <span class="flag__term">“${esc(f.term)}”</span>
        <span class="flag__note">${esc(f.note)}</span>
      </li>`;
  }).join('\n');

  return `  <div class="fairness">
    <div class="fairness__head">
      <p class="panel__rule">${esc(FAIRNESS.heading)}</p>
      <span class="pill pill--warn">${esc(FAIRNESS.rating)}</span>
    </div>

    <p class="fairness__line">${esc(FAIRNESS.line)}</p>

    <ul class="flags">
${flags}
      <li class="flag">
        <span class="flag__glyph" aria-hidden="true">⚑</span>
        <span class="flag__term">${esc(FAIRNESS.structural.label)}</span>
        <span class="flag__note">${esc(FAIRNESS.structural.note)}</span>
      </li>
    </ul>

    <div class="insufficient">
      <span class="insufficient__glyph" aria-hidden="true">○</span>
      <p class="insufficient__body">
        ${esc(FAIRNESS.insufficient.label)}
        We need ${FAIRNESS.insufficient.needs}; this role has ${JOB.pool.total}.
      </p>
    </div>
  </div>`;
}

/* ==========================================================================
   governanceLedger — what is logged
   --------------------------------------------------------------------------
   The least glamorous and most persuasive thing on /trust. Every row type is a
   real logged event (`docs/phase-4.md` § 1.11), and the second row is the match
   audit log doing its job: the weights and the gate's own count, stored with
   the result. A stored verdict is what makes a score reproducible a month later.
   ========================================================================== */

export function governanceLedger() {
  const rows = GOVERNANCE_LOG.map((r) => `      <li class="ledger__row${r.strong ? ' ledger__row--strong' : ''}">
        <span class="ledger__at">${esc(r.at)}</span>
        <span class="ledger__actor">${esc(r.actor)}</span>
        <span class="ledger__action">${esc(r.action)}</span>
        <span class="ledger__ref">${esc(r.ref)}</span>
      </li>`).join('\n');

  return `  <div class="ledger">
    <p class="panel__rule">Audit log</p>
    <ul class="ledger__list">
${rows}
    </ul>
    <p class="ledger__foot">Every mutation carries an actor and a timestamp. Every score is stored with the weights that produced it.</p>
  </div>`;
}

/* ==========================================================================
   funnelChart — stage counts and conversion
   --------------------------------------------------------------------------
   Reads from PIPELINE, so the funnel and the board cannot disagree. Every
   figure is an example and the page-level note says so; `CLAUDE.md` § 7 is
   unchanged on that point.

   Motion: P1 meter fill. No new primitive.
   ========================================================================== */

export function funnelChart() {
  const top = ANALYTICS.funnel[0].count;
  const rows = ANALYTICS.funnel.map((f, i) => {
    const prev = i === 0 ? null : ANALYTICS.funnel[i - 1].count;
    const conv = prev && prev > 0 ? `${Math.round((f.count / prev) * 100)}%` : '';
    return `      <div class="funnel__row" data-beat="${i * 90}">
        <span class="funnel__stage">${esc(f.stage)}</span>
        <span class="funnel__bar">${meter({ value: (f.count / top) * 100, variant: i === 0 ? 'meter--ok' : '' })}</span>
        <span class="funnel__count">${f.count}</span>
        <span class="funnel__conv">${conv}</span>
      </div>`;
  }).join('\n');

  return `  <div class="funnel" data-sequence>
    <p class="panel__rule">Funnel, and conversion between stages</p>
${rows}
    <p class="composition-note composition-note--left"><span class="example-tag">${esc(ANALYTICS.note)}</span></p>
  </div>`;
}

/* ==========================================================================
   scarcityTable — the talent-pool intelligence view
   --------------------------------------------------------------------------
   Scarcity is HIGH / MEDIUM / LOW, and the tone runs rose → amber → emerald:
   a skill almost nobody in the pool has is a problem with the requirement, not
   a compliment to it.
   ========================================================================== */

const SCARCITY_TONE = { HIGH: 'crit', MEDIUM: 'warn', LOW: 'ok' };

export function scarcityTable() {
  const rows = ANALYTICS.scarcity.map((row, i) => `        <tr>
          <th scope="row">${esc(row.skill)}</th>
          <td><span class="pill pill--${SCARCITY_TONE[row.level]}">${esc(row.level)}</span></td>
          <td class="scarcity__cov">
            ${meter({ value: row.coverage, variant: row.coverage < 40 ? 'meter--warn' : '' })}
            <span class="scarcity__pct">${row.coverage}%</span>
          </td>
        </tr>`).join('\n');

  return `  <div class="scarcity" data-sequence>
    <table class="scarcity__table">
      <caption class="panel__rule">Pool coverage by skill, and how scarce each one is</caption>
      <thead>
        <tr>
          <th scope="col">Skill</th>
          <th scope="col">Scarcity</th>
          <th scope="col">Pool coverage</th>
        </tr>
      </thead>
      <tbody>
${rows}
      </tbody>
    </table>
    <p class="composition-note composition-note--left"><span class="example-tag">${esc(ANALYTICS.note)}</span></p>
  </div>`;
}

/* ==========================================================================
   candidateWorkspace — the two panels /for-candidates never mentioned
   --------------------------------------------------------------------------
   Recruiter interest and skills-unlock are the two strongest reasons to build
   a profile, and both are shipped panels (`docs/phase-4.md` § 1.10).

   The unlock counts come from RESUME.gaps rather than from a second list.
   § 3.9's sketch names different figures and a fourth skill; the sketch loses
   to the rule at the top of the data module — one value, read once.

   Motion: P1 meter fill on the unlock bars.
   ========================================================================== */

export function candidateWorkspace() {
  const d = CANDIDATE_DASH;
  const peak = Math.max(...d.interest.spark);
  const spark = d.interest.spark.map((v, i) => `          <span class="spark__bar" style="--h: ${((v / peak) * 100).toFixed(0)}%; --i: ${i}"><span class="sr-only">Day ${i + 1}: ${v} views.</span></span>`).join('\n');

  const topUnlock = Math.max(...RESUME.gaps.map((g) => g.unlocks));
  const unlocks = RESUME.gaps.map((g) => `        <div class="unlock__row">
          <span class="unlock__skill">${esc(g.skill)}</span>
          <span class="unlock__bar">${meter({ value: (g.unlocks / topUnlock) * 100 })}</span>
          <span class="unlock__n">+${g.unlocks} roles</span>
        </div>`).join('\n');

  return `  <div class="cwork">
    <div class="cwork__panel">
      <p class="panel__rule">${esc(d.interest.label)}</p>
      <p class="cwork__figure"><span data-count="${d.interest.views}">${d.interest.views}</span> profile views</p>
      <p class="cwork__delta">▲ +${d.interest.delta} vs last week</p>
      <div class="spark" role="img" aria-label="Profile views over the last ${d.interest.days} days: ${d.interest.spark.join(', ')}.">
${spark}
      </div>
      <p class="cwork__foot">last ${d.interest.days} days</p>
    </div>

    <div class="cwork__panel">
      <p class="panel__rule">${esc(d.unlock.label)}</p>
      <div class="unlock">
${unlocks}
      </div>
      <p class="cwork__foot">${esc(d.unlock.basis)}</p>
    </div>
  </div>`;
}

/* ==========================================================================
   PHASE 5 — the job detail surface
   --------------------------------------------------------------------------
   `docs/phase-5.md` § 3.9. Six sub-components, assembled by `jobWorkspace()`.

   WHY THEY ARE SEPARATE FUNCTIONS rather than one long template: the job
   header is reused on /product/hiring-operations, the tab strip serves both the
   job's five tabs and the drawer's five, and a 200-line template string is a
   thing nobody edits twice.

   THE ONE RULE THAT GOVERNS ALL SIX. Every layer here is INERT. The hero may be
   dense; it may not be interactive (`CLAUDE.md` § 5). So the origin control,
   the tabs, the search field, the `Move to…` affordances and the drawer tabs
   are `<span>` and `<div>` with the right classes — never `<button>`,
   `<select>` or `<a>`. A control that looks operable and is not is worse than a
   static image, and a real button in the hero is a focus stop that goes
   nowhere. `tools/check.mjs` asserts this over the built HTML.

   ACCESSIBILITY. The chrome-only layers carry `aria-hidden="true"`, so a screen
   reader gets the list, the drawer and one summary paragraph rather than forty
   label fragments. Every number hidden that way is restated in
   `jobWorkspace()`'s `sr-only` summary — hiding a layer is only acceptable
   because nothing is lost with it.
   ========================================================================== */

/** The app's own tone map for the seniority pill: amber for SENIOR, violet for
    LEAD and PRINCIPAL. The site has five pill tones and violet is not one of
    them, so LEAD/PRINCIPAL borrow `info`; the demo requisition is SENIOR, so
    the substitution is not visible anywhere yet. Deviation recorded in
    docs/components.md. */
const SENIORITY_TONE = { amber: 'warn', violet: 'info' };

/**
 * ① ② ③ — the job header. Three stacked rows, `docs/phase-5.md` § 2.3.
 *
 * The amber `3 skills need review` flag is the most valuable single element in
 * the composition: it is the parser escalating rather than guessing (§ 2.8), it
 * is visible in the first two seconds, and nothing else on the site says it.
 * Do not drop it for space.
 *
 * The eye glyph on the salary is a real control, not decoration — it says
 * whether the band is visible to candidates — so it renders from
 * `JOB.salaryVisible` and carries an sr-only reading of its own.
 */
export function jobHeader({ review = true } = {}) {
  const tone = SENIORITY_TONE[JOB.seniorityTone] || 'none';

  const flag = review
    ? `      <span class="jobhead__review">
        <svg width="12" height="12" aria-hidden="true" focusable="false"><use href="#i-alert"/></svg>
        ${esc(SKILL_REVIEW.label(SKILL_REVIEW.count))}
      </span>`
    : '';

  const salary = JOB.salaryVisible
    ? `<span class="jobhead__salary">${esc(JOB.salary)} <svg class="jobhead__eye" width="13" height="13" aria-hidden="true" focusable="false"><use href="#i-eye"/></svg></span>`
    : `<span class="jobhead__salary jobhead__salary--hidden">${esc(JOB.salary)}</span>`;

  return `    <div class="jobhead">
      <div class="jobhead__title">
        <p class="jobhead__name">${esc(JOB.title)}</p>
        <span class="chip chip--mono chip--strong">${esc(JOB.status)}</span>
${flag}
      </div>
      <div class="jobhead__pills" aria-hidden="true">
        <span class="pill pill--none">${esc(JOB.department)}</span>
        <span class="pill pill--none">${esc(JOB.employment)}</span>
        <span class="pill pill--${tone}">${esc(JOB.level)}</span>
        <span class="pill pill--none">${esc(JOB.mode)}</span>
      </div>
      <p class="jobhead__stats" aria-hidden="true">
        <span>${esc(JOB.locationShort)}</span>
        <span>${esc(JOB.experience)}</span>
        ${salary}
        <span>${JOB.pool.total} applicants</span>
        <span class="jobhead__age">Published ${esc(JOB.publishedAgo)}</span>
      </p>
    </div>`;
}

/**
 * ④ — `JobPulseStrip`. The page's own declared signature visual.
 *
 * EXACTLY ONE TILE IS FEATURED and the data decides which, not the caller. It
 * must be `In pipeline`, because applicants is a lifetime total that only ever
 * grows: a job with two hundred applicants and nobody in play looks healthy
 * right up until you read the second tile. Getting this backwards inverts the
 * product's own argument, which is why `featured` is a field in
 * product-demo.js and this function has no parameter for it.
 *
 * NO COUNT-UP. A number that ticks up here communicates nothing — the figure is
 * not arriving, it is a state — and `CLAUDE.md` § 5 deletes an animation that
 * cannot say what it communicates. No `data-count`, so counter.js never sees
 * these.
 */
export function pulseStrip() {
  const tiles = JOB_PULSE.map((t) => `        <div class="pulse__tile${t.featured ? ' pulse__tile--featured' : ''}">
          <span class="pulse__value">${t.value}</span>
          <span class="pulse__label">${esc(t.label)}</span>
        </div>`).join('\n');

  return `    <div class="pulse" aria-hidden="true">
${tiles}
    </div>`;
}

/**
 * ⑤ ⑧ — a tab strip. Serves the job's five tabs and the drawer's five.
 *
 * The cheapest possible statement that a product has depth, and it costs one
 * line of markup. Inert: spans, not buttons, and `aria-hidden` because the
 * strip is chrome — the tab names are restated in `jobWorkspace()`'s summary.
 */
export function tabStrip({ tabs, modifier = '' }) {
  const items = tabs.map((t) => `        <span class="tabstrip__tab${t.active ? ' is-active' : ''}">
          ${t.glyph ? `<svg class="tabstrip__glyph" width="12" height="12" focusable="false"><use href="#i-${t.glyph}"/></svg>` : ''}${esc(t.label)}
        </span>`).join('\n');

  return `    <div class="tabstrip ${modifier}" aria-hidden="true">
${items}
    </div>`;
}

/**
 * ⑥ — the candidates toolbar, § 2.5. Real placeholder text, the real origin
 * segmented control, the real count and sort.
 *
 * The origin control is the one interactive-LOOKING element in the hero and it
 * is the one that most needs not to be wired: a segmented control is the shape
 * a visitor reaches for first. Spans throughout.
 */
export function listToolbar() {
  const origins = JOB_TOOLBAR.origins.map((o) => `          <span class="segmented__opt${o === JOB_TOOLBAR.activeOrigin ? ' is-active' : ''}">${esc(o)}</span>`).join('\n');

  return `    <div class="toolbar" aria-hidden="true">
      <span class="toolbar__search">
        <svg width="13" height="13" focusable="false"><use href="#i-search"/></svg>
        ${esc(JOB_TOOLBAR.search)}
      </span>
      <span class="segmented segmented--static">
${origins}
      </span>
      <span class="toolbar__count">${esc(JOB_TOOLBAR.count)}</span>
      <span class="toolbar__sort">sort: ${esc(JOB_TOOLBAR.sort)}</span>
    </div>`;
}

/**
 * ⑧ — the drawer's header and meta row, § 2.4.
 *
 * `Full profile ↗` is rendered as a span, not a link, for the same reason
 * everything else here is: it is a real control in the product and an inert
 * label on the site. The identity lives here rather than in `explainPanel()`,
 * which is called with `showIdent: false` beneath it.
 *
 * ONE DEVIATION FROM § 2.4: NO `ScoreRing` IN THE META ROW. The product draws
 * one here at 34px, and the Match tab beneath it draws the same score again as
 * the panel's verdict — so with the drawer open over its own row the hero read
 * 87 three times in one screen. The row keeps its ring, because every row in
 * the ranking has one; the Match tab keeps its ring, because the score is what
 * that panel explains. The meta row's copy was the one saying nothing new.
 */
export function drawerHead({ candidateId = 'c1' }) {
  const c = candidate(candidateId);
  const rm = ROW_META[candidateId];

  return `      <div class="dhead">
        <div class="dhead__top">
          ${avatar(c.name)}
          <span class="dhead__ident">
            <span class="dhead__name">${esc(c.name)}</span>
            <span class="dhead__headline">${esc(headline(c))}</span>
          </span>
          <span class="dhead__close" aria-hidden="true">
            <svg width="12" height="12" focusable="false"><use href="#i-close"/></svg>
          </span>
        </div>
        <div class="dhead__meta" aria-hidden="true">
          ${stageChip(rm.stage)}
          <span class="pill pill--none">${esc(ORIGINS[rm.origin])}</span>
          <span class="dhead__profile">Full profile <span aria-hidden="true">↗</span></span>
        </div>
      </div>`;
}

/* ==========================================================================
   Assembled frames — the shapes each section actually uses.
   ========================================================================== */

/* --------------------------------------------------------------------------
   jobWorkspace ★ — the hero
   --------------------------------------------------------------------------
   REPLACES matchesWorkspace(). The headline deliverable of Phase 5.

   WHY THE OLD ONE WAS THIN, because the diagnosis is the lesson and it will
   recur otherwise (`docs/phase-5.md` § 3.1). `matchesWorkspace()` was not a
   restrained composition. It sat in `.split--lead`'s visual column — about 48%
   of a container that caps at 1280px, so roughly 560px — a job workspace does
   not fit in 560px, and the CSS ADMITTED IT by switching off three of the five
   tracks in every row:

       .workspace__list .rank__row--tracked .pill--stage,
       .workspace__list .rank__row--tracked .ring,
       .workspace__list .rank__origin { display: none; }

   So the first thing every visitor saw was a strip of six names and one panel,
   in front of an application that has five job tabs, a pulse strip it calls its
   own signature, a tabbed candidate drawer and a parser that escalates rather
   than guesses. Adding content without changing the layout would only have
   pushed more of it behind `display: none`.

   THE FIX IS A LAYOUT FIX. The hero grid is now hero-specific — 38% copy, the
   rest to the composition — and `.hero__visual` bleeds to the viewport edge, so
   the frame is about 860px at 1440. The three `display: none` rules are gone.
   The rule this earned, now in docs/product-visualization.md: A COMPOSITION'S
   WIDTH IS A DESIGN INPUT, NOT A CONSEQUENCE. If a layout forces `display: none`
   on a row track, the layout is wrong.

   SEVEN LAYERS, and every element in them exists in the product —
   `docs/phase-5.md` § 2 is the source for all of it:

     ① title row · ② meta pills · ③ stats row      jobHeader()
     ④ pulse strip, exactly one tile featured       pulseStrip()
     ⑤ five job tabs, Candidates active             tabStrip()
     ⑥ toolbar: search, origin control, count       listToolbar()
     ⑦ the list, ALL FIVE TRACKS, plus the gate row rankedList()
     ⑧ the tabbed drawer                            drawerHead() + explainPanel()

   ⑦ IS THE STRONGEST MOVE HERE. The list ends on `criticalGate()`'s row — an
   unscored candidate with the named missing critical — so the first screen shows
   both a ranking and a refusal, and both explain themselves. Rows 1 and 7 sit
   clear of the drawer; the rows between run under its left edge and are clipped
   by it, which is what the real app looks like.

   THE DRAWER IS INSET TO 42%, not 22%, which is what keeps five visible tracks
   in the list. That number is the whole reason the row rules could be deleted.

   NO INTERACTION, and this composition makes that easier to violate than the
   old one did. Every control is a span. See the header on the sub-components
   above, and `tools/check.mjs`, which now asserts no <button>, <select> or <a>
   inside `.workspace`.

   P5 · DRAWER REVEAL, unchanged and still the right primitive. No new
   animation: the frame, the job header, the pulse strip, the tabs and the list
   are all present at 0ms because this is above-the-fold content and it does not
   wait; at 240ms the drawer translates in from the right over --dur-medium with
   --ease-entrance. Capped at one per page by tools/check.mjs, documented in
   docs/motion-system.md § 3.

   TWO DEVIATIONS FROM § 3.1 ARE CARRIED FORWARD FROM PHASE 4, both still right.

   1. The list pane does NOT drop to 60% opacity behind the drawer. Sixty per
      cent on a real text element takes a row's secondary line to roughly 2.5:1
      against paper, which fails AA, and `CLAUDE.md` § 3 rule 5 outranks a number
      in a plan sketch. The relationship is stated better anyway: the selected
      row carries `aria-current="true"`, which is announced as well as drawn.

   2. The people and the scores are the site's own six candidates at the site's
      own scores, not the sketch's invented five. A hero showing 84 while five
      other pages show 87 is the most visible possible defect.

   ONE PHASE 5 DEVIATION. § 3.3 asks for `.float` to be retired from the hero
   frame. It was never on it — Phase 4 built `matchesWorkspace()` with
   `frame--elevated` alone, and the only `.float` on the homepage is the
   candidate frame in § 10. So the budget comment in home.mjs was wrong at 2 and
   is now right at 1, and there was nothing to remove.
   -------------------------------------------------------------------------- */

export function jobWorkspace() {
  /* The heading is sr-only because the composition is self-evident on screen
     and invisible in the document outline without it — the hero's <h1> would
     otherwise be followed by the drawer's headings, a skipped level. */
  const c = candidate('c1');

  /* Everything the chrome layers hide from a screen reader, said once. This
     paragraph is what makes `aria-hidden` on the pulse strip, the tab strip,
     the meta pills and the toolbar acceptable: nothing is lost with them. */
  /* EVERY FIGURE AND LABEL HERE IS DERIVED, including the counts and which tab
     is active. An sr-only summary that hardcodes "five tabs" or "Candidates is
     open" is a second copy of the data with none of the visibility — the sighted
     defect would be obvious and this one would not. */
  const activeTab = JOB_TABS.find((t) => t.active);
  const featured = JOB_PULSE.find((t) => t.featured);

  const summary = [
    `The job detail screen for ${JOB.title}, ${JOB.status.toLowerCase()}.`,
    `${SKILL_REVIEW.label(SKILL_REVIEW.count)} — the parser could not place them in the skill taxonomy, so the job is flagged until a person decides.`,
    `${JOB.locationShort}, ${JOB.experience}, ${JOB.salary}${JOB.salaryVisible ? ', visible to candidates' : ', hidden from candidates'}. Published ${JOB.publishedAgo}.`,
    `${JOB_PULSE.map((t) => `${t.label} ${t.value}`).join(', ')} — ${featured.label} is the figure the screen features.`,
    `${JOB_TABS.length} tabs: ${JOB_TABS.map((t) => t.label).join(', ')}. ${activeTab.label} is open.`,
    `The list below is followed by one candidate the critical gate dropped before scoring, and by the open drawer for ${c.name}.`,
  ].join(' ');

  return `<h2 class="sr-only">What the engine returns for this role</h2>
<p class="sr-only">${esc(summary)}</p>
${frame({
    ratio: '16 / 11',
    modifier: 'frame--elevated',
    meta: JOB.route,
    body: `  <div class="workspace" data-drawer-reveal>
    <div class="workspace__job">
${jobHeader()}
${pulseStrip()}
${tabStrip({ tabs: JOB_TABS, modifier: 'tabstrip--job' })}
    </div>

    <!-- The two panes share one positioning context, and that is load-bearing:
         the drawer is absolutely positioned inside it, so the pane's height is
         set by the LIST and the drawer's extent is derived from it. Placed as a
         grid sibling instead, the drawer's own content sized the row — the panel
         is far taller than seven rows — and the frame came out about 1250px
         tall with the copy column and the gate row pushed off the screen. -->
    <div class="workspace__panes">
      <!-- ⑦ Five tracks, no display:none, and the gate's row at the end. Rows 1
           and 7 sit clear of the drawer; the ones between are clipped by its
           left edge, which is what the application looks like. -->
      <div class="workspace__list">
${listToolbar()}
${rankedList({
      ids: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
      listId: 'workspace-list',
      variant: 'tracked',
      head: false,
      foot: false,
      selected: 'c1',
      move: true,
      gateRow: true,
    })}
    </div>

    <!-- ⑧ Tabbed. Interviews and Feedback are present but not active: they are
         real (§ 2.4) and their presence is the claim. -->
    <div class="workspace__drawer">
${drawerHead({ candidateId: 'c1' })}
${tabStrip({ tabs: DRAWER_TABS, modifier: 'tabstrip--drawer' })}
${explainPanel({ id: 'workspace-panel', candidateId: 'c1', sequenced: false, showFooter: false, showIdent: false, ringSize: 40 })}
    </div>
    </div>
  </div>`,
  })}`;
}

/**
 * The job header and the pulse strip, at full width — `docs/phase-5.md` § 3.9.
 *
 * `jobHeader()`'s promised second home. On /product/hiring-operations the strip
 * has the whole container to itself, which is where the pulse's argument is
 * actually legible: four tiles, one featured, and the featured one is the only
 * figure of the four that can go down.
 *
 * No drawer, so no P5 — this composition is a header, not an opening.
 */
export function jobPulseComposition() {
  return frame({
    ratio: '16 / 6',
    modifier: 'frame--elevated',
    meta: JOB.route,
    body: `  <div class="workspace">
    <div class="workspace__job">
${jobHeader()}
${pulseStrip()}
${tabStrip({ tabs: JOB_TABS, modifier: 'tabstrip--job' })}
    </div>
  </div>`,
  });
}

/**
 * § 05 — the full-width ranked list, with working filter chips, and the score
 * distribution underneath it as one ordered bar.
 *
 * The bar replaces the counts line the section used to carry: three numbers in
 * a row state three magnitudes, and one ordered bar states the shape of the
 * pool, which is the actual claim.
 */
export function poolComposition() {
  /* ONE ROOT. `.frame__body--content` stacks every direct child in the same
     grid cell, so a list and a bar handed to it side by side are drawn on top
     of each other. `.stack` puts the bar under the list. */
  return frame({
    ratio: '16 / 10',
    modifier: 'frame--elevated',
    meta: JOB.matchesRoute,
    body: `  <div class="stack">
${rankedList({ ids: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], listId: 'pool-list', filters: true, layers: true })}
${poolBands()}
  </div>`,
  });
}

/** § 06 — the panel at full size, interactive, and cited. */
export function argumentComposition() {
  return frame({
    ratio: '4 / 3',
    modifier: 'frame--elevated',
    meta: `${JOB.matchesRoute} / ${candidate('c1').slug}`,
    body: explainPanel({ id: 'argument-panel', candidateId: 'c1', sequenced: true }),
  });
}

/**
 * § 08 — the live ranked list the controls reorder.
 *
 * `listId` and `reorderable` are parameters because /product shows this list
 * beside the tuning pillar with no controls next to it. A list that advertises
 * a reorder it cannot perform is a dead affordance, so that instance is static
 * and carries its own id — two lists sharing one id would be a duplicate-id
 * failure in tools/check.mjs, which is the correct outcome.
 */
export function controlComposition({ listId = 'control-list', reorderable = true } = {}) {
  return frame({
    ratio: '16 / 10',
    modifier: 'frame--elevated',
    meta: JOB.matchesRoute,
    body: rankedList({
      ids: ['c1', 'c2', 'c3', 'c4', 'c5'],
      listId,
      reorderable,
      foot: false,
    }),
  });
}

/** § 04 — the requisition. */
export function requisitionComposition() {
  return frame({
    ratio: '4 / 3',
    meta: JOB.route,
    attrs: ' data-parallax="0.02"',
    body: requisition(),
  });
}

/**
 * /product/hiring-operations — the job → candidates list, at full width.
 *
 * The five-track row of `docs/phase-4.md` § 1.8 needs somewhere it can be read
 * whole: in the hero the drawer covers most of it, so three tracks show there.
 * This is that place, and it is also where the copy about origin and about the
 * neutral last stage lives — so the reader is looking at the thing the
 * paragraph beside it is describing.
 */
export function candidatesComposition() {
  return frame({
    ratio: '16 / 7',
    modifier: 'frame--elevated',
    meta: CANDIDATES_LIST.route,
    body: rankedList({ ids: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], listId: 'candidates-list', variant: 'tracked' }),
  });
}

/**
 * § 09 — the pipeline, schematic, seven stages including the neutral last.
 *
 * `4 / 1`, not `21 / 9`. Seven short columns are about 190px tall at full width;
 * a 21/9 frame reserved 549px and left 350px of white inside a window chrome,
 * which reads as a broken screenshot. See the note on missionComposition().
 */
export function pipelineComposition() {
  return frame({
    ratio: '4 / 1',
    meta: PIPELINE.route,
    body: pipeline(),
  });
}

/**
 * /product/sourcing — Always-On Sourcing, at full size.
 *
 * ON THE RATIO, AND IT IS A RULE FOR EVERY COMPOSITION BELOW. `--ratio` is a
 * reserved MINIMUM for composed HTML (`.frame__body--content`), so a composition
 * taller than its ratio simply grows the frame and a composition shorter than it
 * leaves a void. **Erring short is therefore strictly safer than erring tall**,
 * and a 16/10 frame around a 460px panel is 340px of empty white inside a window
 * chrome — which reads as a broken screenshot rather than as generous padding.
 */
export function missionComposition() {
  return frame({
    ratio: '5 / 2',
    modifier: 'frame--elevated',
    meta: MISSION.route,
    body: missionConsole(),
  });
}

/** /product/matching — the weights, published. Not a screen: the model is a
    property of the engine, and framing it as product UI would invent a screen
    that does not exist. No `.frame` chrome, for the same reason as the graph. */
export function scoreModelComposition() {
  return `<div class="model-wrap">
${scoreModel()}
</div>`;
}

/** /trust and /product/analytics — the fairness report. */
export function fairnessComposition() {
  return frame({
    ratio: '4 / 3',
    meta: ANALYTICS.route,
    body: structuralFairness(),
  });
}

/** /trust — the audit log. Short: it is five rows and two lines of prose. */
export function ledgerComposition() {
  return frame({
    ratio: '16 / 5',
    meta: 'app.transpahire.com / platform-admin / audit-logs',
    body: governanceLedger(),
  });
}

/** /product/analytics — the funnel. Six rows in a half-width column. */
export function funnelComposition() {
  return frame({
    ratio: '1 / 1',
    meta: ANALYTICS.route,
    body: funnelChart(),
  });
}

/** /product/analytics — pool intelligence. Full width, so a tall ratio would be
    a very large void; five rows and a caption need about a quarter of it. */
export function scarcityComposition() {
  return frame({
    ratio: '4 / 1',
    meta: ANALYTICS.route,
    body: scarcityTable(),
  });
}

/** /for-candidates — the two dashboard panels the page never mentioned. */
export function candidateWorkspaceComposition() {
  return frame({
    ratio: '16 / 5',
    modifier: 'frame--elevated',
    meta: CANDIDATE_DASH.route,
    body: candidateWorkspace(),
  });
}

/** § 10 left — the candidate's view of the same record. */
export function candidateViewComposition({ float = true } = {}) {
  return frame({
    ratio: '3 / 4',
    modifier: `frame--elevated${float ? ' float float--delayed' : ''}`,
    meta: CANDIDATE_VIEW.route,
    body: candidateView(),
  });
}

/** § 10 right — résumé quality and the gaps. */
export function resumeComposition({ parallax = true } = {}) {
  return frame({
    ratio: '1 / 1',
    meta: RESUME.route,
    attrs: parallax ? ' data-parallax="0.02"' : '',
    body: resumeAndGaps(),
  });
}

/* ==========================================================================
   Product-page assemblies
   --------------------------------------------------------------------------
   Reuse only. No page below the homepage introduces a composition the
   visualisation spec does not name — the nine in `08` are the whole inventory,
   and a tenth invented for a subpage would be product UI nobody confirmed.
   ========================================================================== */

/**
 * The dual-mode search at full density, for /product/sourcing.
 * Both modes are LIVE, and "they work side by side in the same tool" is the
 * product's own differentiator — which is why the two states are shown in one
 * control rather than as two screenshots.
 *
 * PHASE 4. Each result now carries the quoted snippet from the candidate's own
 * profile that the match was drawn from, with the section it came from named.
 * That chip is the entire point of semantic search — a result you can check —
 * and the composition was missing it. Capped at two per row, as in the product.
 */
export function searchComposition() {
  return frame({
    ratio: '16 / 10',
    modifier: 'frame--elevated',
    meta: 'app.transpahire.com / candidates / search',
    body: `  <div class="req" data-sequence>
    <div class="dualmode" data-dualmode style="border-top:0">
      <div class="segmented" role="group" aria-label="Search mode">
${JOB.search.modes.map((m, i) => `        <button type="button" class="segmented__opt${i === 0 ? ' is-active' : ''}" data-mode="${m.key}" aria-selected="${i === 0 ? 'true' : 'false'}">${esc(m.label)}</button>`).join('\n')}
      </div>
      <div class="tab-panel" data-mode-panel="filters">
        <div class="dualmode__filters">
${[...JOB.search.filters, 'Notice period ≤ 30 days', 'Expected salary in band', 'Profile quality high'].map((f) => `          <span class="chip">${esc(f)}</span>`).join('\n')}
        </div>
      </div>
      <div class="tab-panel" data-mode-panel="describe" hidden>
        <p class="dualmode__query">“${esc(JOB.search.example)}”</p>
      </div>
    </div>
${rankedList({ ids: ['c1', 'c3', 'c6'], listId: 'search-list', head: false, layers: true, evidence: true, foot: false })}
  </div>`,
  });
}

/**
 * The signals cluster — seniority, trajectory, potential, drop-off risk.
 * These are the things a recruiter could not have derived by reading the CV,
 * and `03 § 2` says to sell them together rather than one per card.
 */
export function signalsCluster() {
  const c = candidate('c1');
  return frame({
    ratio: '16 / 9',
    meta: `${JOB.matchesRoute} / ${c.slug}`,
    body: `  <div class="panel">
    <div class="panel__block">
      <p class="panel__rule">Signals</p>
      <dl class="signals">
${SIGNALS.map((sig) => `        <div class="signals__cell">
          <dt class="signals__label">${esc(sig.label)}</dt>
          <dd class="signals__value">${esc(c.signals[sig.key])}</dd>
        </div>`).join('\n')}
      </dl>
    </div>
    <div class="panel__block">
      <p class="panel__rule">Why</p>
      <p class="narrative">${esc(c.narrative)}</p>
    </div>
  </div>`,
  });
}

/**
 * A frame reserved for the one real screenshot the site needs.
 *
 * `06 § 4`: ten compositions and zero screenshots reads as a product that does
 * not exist, and `10 § R8` makes it the highest-value single asset request.
 * Until it arrives this is a labelled empty state — deliberately, visibly not a
 * screenshot, so a stand-in can never be mistaken for the product. The ratio is
 * declared now so dropping the image in cannot shift the layout.
 *
 * Pass `image` when the real one arrives. The ratio is then read off the
 * image's own pixels rather than the slot's, because `.frame__body > img` is
 * `object-fit: cover` and a mismatched ratio would crop the product silently.
 *
 * `priority` is for a screenshot on the first screen — the homepage hero's is
 * the largest paint on the page, so it is fetched first and decoded in step.
 */
export function screenshotSlot({ what, ratio = '16 / 9', meta = 'app.transpahire.com', image, priority = false }) {
  const body = image
    ? `<img src="${image.src}" alt="${esc(image.alt)}" width="${image.width}" height="${image.height}" ${priority ? 'fetchpriority="high"' : 'decoding="async"'}>`
    : `<div class="frame__placeholder">
      <span class="frame__tag"><span class="frame__tag-kind">screenshot</span>${esc(what)}</span>
    </div>`;
  return `
<div class="frame frame--elevated" style="--ratio: ${image ? `${image.width} / ${image.height}` : ratio}">
  <div class="frame__chrome">
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__dot" aria-hidden="true"></span>
    <span class="frame__meta">${esc(meta)}</span>
  </div>
  <div class="frame__body">
    ${body}
  </div>
</div>`;
}

/** The candidate-side feed, for /for-candidates. C8 as a list of roles. */
export function candidateFeed() {
  const rows = [
    { id: 'c1', title: JOB.title, meta: `Payments · ${JOB.locationShort} · ${JOB.mode}` },
    { id: 'c2', title: 'Backend Engineer, Platform', meta: `Infrastructure · ${JOB.locationShort} · Hybrid` },
    { id: 'c4', title: 'Senior Engineer, Data Platform', meta: 'Data · Bengaluru · Remote' },
  ];

  return `<div class="feed">
${rows.map(({ id, title, meta }) => {
  const c = candidate(id);
  return `  <div class="feed__row">
    <div>
      <p class="feed__job">${esc(title)}</p>
      <p class="feed__meta">${esc(meta)}</p>
    </div>
    <p class="score score--sm">
      <span class="score__value" data-count="${c.score}">${c.score}</span>
      <span class="score__scale" aria-hidden="true">/100</span>
      <span class="chip chip--mono chip--${c.classification}">${esc(CLASSIFICATIONS[c.classification].label)}</span>
      <span class="sr-only">Match score ${c.score} out of 100, ${esc(CLASSIFICATIONS[c.classification].label)}.</span>
    </p>
  </div>`;
}).join('\n')}
</div>`;
}

/* --------------------------------------------------------------------------
   comparisonTable() WAS HERE, AND IS CUT.

   `docs/phase-4.md` § 3.11: shipping a table with a visibly withheld column, on
   a page about transparency, reads as concealment. The old note under it said
   so out loud — "a third column covering AI screening tools is withheld pending
   review" — which is a sentence admitting the table is incomplete, printed
   underneath the table.

   The two claims that were solid moved into prose on /product/matching, where
   they cost two sentences and carry no implication about a category nobody has
   reviewed. The homepage never carried this table, on the grounds that the
   homepage argues by demonstration and a comparison table argues by assertion;
   Phase 4 extends that to the whole site.
   -------------------------------------------------------------------------- */


/* ==========================================================================
   PHASE 6 — the landing page's stagings
   --------------------------------------------------------------------------
   Ported from the Stage 3 prototype (prototypes/lib/parts.mjs) per the
   production handoff in prototypes/STAGE-3.md. Every piece here is a STAGING
   of data the site already renders — not a new product surface — and every
   value is read from the data module. Layout is in sections.css; the layer
   bodies, the weight rows, the skill rows and the tuner row are in
   components.css; the stage's motion is P6 in motion.css § 4b.
   ========================================================================== */

/**
 * No count-up in a hero or on the stage: a figure that ticks up is ARRIVING,
 * and these are states. Strips the renderers' counter hooks from a fragment.
 * The what-if figure keeps its own: it counts once, on toggle, on purpose.
 */
export function still(html) {
  return html.replace(/ data-count="\d+"/g, '');
}

/** The rail-numbered scene head: "NN / 08 · name", the H2, an optional lede. */
export function sceneHead({ num, name, title, lede = '' }) {
  return `  <div class="container scene__head">
    <p class="eyebrow scene__num">${num} / 08 · ${esc(name)}</p>
    <h2 class="h-section scene__title">${title}</h2>
    ${lede ? `<p class="lede scene__lede">${esc(lede)}</p>` : ''}
  </div>`;
}

const pct = (w) => Math.round(w * 100);

/**
 * The four published weights as rows. `--w` is the percentage, `--i` the row
 * index (P6 fans the rows down by it). `large` is the stage size; `lead`
 * strengthens the first row, which is the one the next layer opens.
 */
export function weightRows(dims = DIMENSIONS, { large = false, lead = false } = {}) {
  const rows = dims.map((d, i) => `      <div class="wrow wrow--${d.key}${lead && i === 0 ? ' wrow--lead' : ''}" style="--i: ${i}">
        <span class="wrow__label">${esc(d.label)}</span>
        <span class="wrow__bar" aria-hidden="true"><span class="wrow__fill" style="--w: ${pct(d.weight)}"></span></span>
        <span class="wrow__pct">${pct(d.weight)}%</span>
      </div>`).join('\n');
  return `<div class="wrows${large ? ' wrows--lg' : ''}">
${rows}
      </div>`;
}

/**
 * Every requirement, matched: covered · partial · missing, in that order, each
 * with its glyph, the phrase it matched, the relationship and the confidence.
 * `--i` is the row index; P6 arrives the rows in order.
 */
export function skillRows(id) {
  const e = explain(id);
  let i = 0;
  const row = (m, state) => `      <div class="srow srow--${state}" data-concept="${esc(m.concept)}" style="--i: ${i++}">
        <span class="srow__glyph" aria-hidden="true">${SKILL_STATES[state].glyph}</span>
        <span class="srow__concept">${esc(m.concept)}</span>
        <span class="srow__arrow" aria-hidden="true">→</span>
        <span class="srow__matched">${esc(m.matched)}</span>
        <span class="relchip">${esc(m.rel)}</span>
        <span class="srow__conf">${m.confidence}%</span>
        <span class="sr-only">${esc(m.concept)}: ${esc(SKILL_STATES[state].word)}, matched to “${esc(m.matched)}” (${esc(m.rel)}), ${m.confidence}% confidence.</span>
      </div>`;
  const missing = (m) => `      <div class="srow srow--missing" style="--i: ${i++}">
        <span class="srow__glyph" aria-hidden="true">${SKILL_STATES.missing.glyph}</span>
        <span class="srow__concept">${esc(m.concept)}</span>
        <span class="srow__arrow" aria-hidden="true">→</span>
        <span class="srow__matched srow__matched--none">not found in profile</span>
        <span class="relchip relchip--none">${esc(m.tier)}</span>
        <span class="srow__conf">—</span>
        <span class="sr-only">${esc(m.concept)}: missing; a ${esc(m.tier)} requirement.</span>
      </div>`;
  return `<div class="srows">
${e.strong.map((m) => row(m, 'covered')).join('\n')}
${e.partial.map((m) => row(m, 'partial')).join('\n')}
${e.missing.map(missing).join('\n')}
      </div>`;
}

/** One match, cited: the relationship, the reason, and the line it came from
    in the highlighter. `edge` is the taxonomy edge behind the relationship. */
export function evidenceCard(m, edge) {
  return `<div class="sig-evidence">
      <p class="sig-evidence__head">
        <span class="srow__glyph srow__glyph--partial" aria-hidden="true">${SKILL_STATES.partial.glyph}</span>
        <span class="srow__concept">${esc(m.concept)}</span> <span class="srow__arrow" aria-hidden="true">→</span> <span class="srow__matched">${esc(m.matched)}</span>
      </p>
      <p class="sig-evidence__rel"><span class="relchip">${esc(m.rel)}</span> <span class="sig-evidence__edge">${esc(edge.from)} → ${esc(edge.to)} · <em>${esc(edge.type)}</em> · ${edge.strength}</span></p>
      <p class="sig-evidence__reason">${esc(m.reason)}</p>
      <figure class="sig-evidence__source">
        <figcaption class="sig-evidence__from"><span class="label">from the profile · ${esc(m.section)}</span> <span class="concept__verified">✓ verified against the candidate's own words</span></figcaption>
        <blockquote class="sig-evidence__quote"><mark>${esc(m.quote)}</mark></blockquote>
      </figure>
      <p class="sig-evidence__conf"><span class="meter meter--thin" aria-hidden="true"><span class="meter__fill" style="--meter-v: ${(m.confidence / 100).toFixed(2)}"></span></span> <span>${m.confidence}% confidence</span></p>
    </div>`;
}

/** The candidate's own card: the same score, the four fit rows, the trail. */
export function candidateCard(id = CANDIDATE_VIEW.candidate) {
  const c = candidate(id);
  const rows = FIT_SPLIT.fit.map((key) => {
    const d = DIMENSIONS.find((x) => x.key === key);
    return `        <div class="cview__row"><dt class="cview__label">${esc(d.label)} <span class="cview__weight">${pct(d.weight)}%</span></dt><dd class="cview__value">${c.dimensions[key]}</dd></div>`;
  }).join('\n');
  const trail = CANDIDATE_VIEW.application.map((s) => `<li class="trail__step ${s === CANDIDATE_VIEW.applicationCurrent ? 'trail__step--current' : 'trail__step--done'}">${esc(s)}</li>`).join('');
  return `<div class="sig-cand">
      <p class="sig-cand__route">${esc(CANDIDATE_VIEW.route)}</p>
      <div class="sig-cand__body">
        <div>
          <p class="cview__job">${esc(JOB.title)}</p>
          <p class="cview__meta">Payments · ${esc(JOB.locationShort)} · ${esc(JOB.mode)}</p>
        </div>
        <div class="sig-cand__score">
          ${scoreRing({ score: c.score, size: 88, band: c.classification })}
          <p class="cview__same">the same score the recruiter sees</p>
        </div>
        <dl class="cview__rows sig-cand__rows">
${rows}
        </dl>
        <ol class="trail sig-cand__trail">${trail}</ol>
      </div>
    </div>`;
}

/** One layer of the stage: its caption (number, key line, one sentence — the
    sentence is what a screen reader hears, in reading order) and its body. */
export function stageLayer(n, { k, s }, body) {
  return `      <div class="layer layer--${n}" data-layer="${n}">
        <p class="layer__cap"><span class="layer__n">0${n}</span> <span class="layer__k">${esc(k)}</span> <span class="layer__s">${esc(s)}</span></p>
        <div class="layer__body">
${body}
        </div>
      </div>`;
}

/** The six captions, every figure read from the data module. */
export function signatureCaptions(id = 'c1') {
  const c = candidate(id);
  const e = explain(id);
  return [
    { k: 'Ranked.',                         s: `${JOB.pool.total} people scored against the role. ${c.name} first, at ${c.score}.` },
    { k: 'The score.',                      s: `${c.score} out of 100. ${CLASSIFICATIONS[c.classification].label}, ${CONFIDENCE[e.confidence].label.toLowerCase()} confidence.` },
    { k: 'Four weights, published.',        s: `Skill coverage carries ${pct(DIMENSIONS[0].weight)}% of it. Salary is a ±10% adjustment after, not a fifth weight.` },
    { k: 'Every skill, matched.',           s: `${e.strong.length} exact or equivalent, ${e.partial.length} transferable, ${e.missing.length} not found.` },
    { k: 'Every match, cited.',             s: `Kubernetes is ${c.skills.partial[0].transfer}, and here is the line it came from.` },
    { k: 'The same number, on her screen.', s: `The candidate sees ${c.score}, with the same breakdown.` },
  ];
}

/**
 * P6 ★ — the score, taken apart. Six layers of one object on a pinned stage;
 * one per page (tools/check.mjs). The stack is the markup's own reading order
 * and is what reduced motion, phones and no-JavaScript render. `thresholds`
 * must match the mapping in motion.css § 4b; tools/check.mjs asserts it.
 */
export function signature({ id = 'c1', thresholds = [0.14, 0.31, 0.48, 0.65, 0.82] } = {}) {
  const c = candidate(id);
  const e = explain(id);
  const k8s = e.partial.find((m) => m.concept === 'Kubernetes');
  const k8sEdge = SKILL_EDGES.find((x) => x.to === 'Kubernetes');
  const caps = signatureCaptions(id);

  const layerList = rankedList({ ids: POOL_ROWS, listId: 'sig-list', variant: 'tracked', head: false, foot: false, selected: id });
  const layerScore = `<div class="sig-score">
      ${scoreRing({ score: c.score, size: 220, band: c.classification })}
      <p class="sig-score__of" aria-hidden="true">/ 100</p>
      <p class="sig-score__who">${esc(c.name)} <span class="sig-score__sep">·</span> ${esc(headline(c))}</p>
      <p class="sig-score__chips">
        <span class="chip chip--mono chip--${c.classification}">${esc(CLASSIFICATIONS[c.classification].label)}</span>
        <span class="pill pill--ai">AI</span>
        <span class="pill pill--${CONFIDENCE[e.confidence].tone}">${esc(CONFIDENCE[e.confidence].label)} confidence</span>
      </p>
    </div>`;
  const mods = MODIFIERS.map((m) => `<span><b>${esc(m.shape)}</b> ${esc(m.label)}</span>`).join(' ');
  const layerWeights = `<div class="sig-weights">
      <p class="sig-weights__head"><span class="sig-weights__n">${c.score}</span> <span class="sig-weights__eq">=</span> <span class="sig-weights__sum">four weights, published</span></p>
      ${weightRows(DIMENSIONS, { large: true, lead: true })}
      <p class="sig-weights__mods">then, in this order: ${mods}</p>
      <p class="sig-weights__gate">before any of it: ${esc(CRITICAL_GATE.line)}</p>
    </div>`;
  const layerSkills = `<div class="sig-skills">
      <p class="sig-skills__head"><span class="wrow__label">${esc(DIMENSIONS[0].label)}</span> <span class="wrow__pct">${pct(DIMENSIONS[0].weight)}%</span> <span class="sig-skills__open">opens into</span></p>
      ${skillRows(id)}
    </div>`;
  const layers = [layerList, layerScore, layerWeights, layerSkills, evidenceCard(k8s, k8sEdge), candidateCard(id)];

  const rail = caps.map((cap, i) => `        <li class="srail__item" data-for="${i + 1}"><span class="srail__n">0${i + 1}</span><span class="srail__k">${esc(cap.k)}</span></li>`).join('\n');

  return still(`  <div class="sig sig--pinned" data-signature data-thresholds="${thresholds.join(',')}" data-state="1">
    <div class="sig__stage">
      <div class="sig__persist" aria-hidden="true">
        ${scoreRing({ score: c.score, size: 38, band: c.classification })}
      </div>
      <ol class="srail" aria-hidden="true">
${rail}
      </ol>
      <div class="sig__layers">
${layers.map((body, i) => stageLayer(i + 1, caps[i], body)).join('\n')}
      </div>
    </div>
  </div>`);
}

/* --------------------------------------------------------------------------
   The gate-capable tuner — scene 06
   -------------------------------------------------------------------------- */

/** One row of the tuner's list: the scored row plus a moved marker and a gate
    line, both empty until tuner.js has something to say. */
export function tunerRow(id) {
  const c = candidate(id);
  const cov = coverage(c);
  const cls = CLASSIFICATIONS[c.classification];
  return `      <li class="rank__row reorder__row trow" data-row="${c.id}" data-classification="${c.classification}">
        <span class="rank__score">
          ${scoreRing({ score: c.score, size: 38, band: c.classification })}
          <span class="chip chip--mono chip--${c.classification}" data-row-chip>${esc(cls.short)}</span>
        </span>
        <span class="rank__ident">
          <span class="rank__name">${esc(c.name)}</span>
          <span class="rank__headline">${esc(headline(c))}</span>
        </span>
        <span class="rank__meta">${c.years}y · ${esc(c.location)} · ${esc(c.mode)}</span>
        <span class="rank__cover" aria-hidden="true">
          <span class="is-covered">${SKILL_STATES.covered.glyph}${cov.covered}</span>
          <span class="is-partial">${SKILL_STATES.partial.glyph}${cov.partial}</span>
          <span class="is-missing" data-missing="${cov.missing}">${SKILL_STATES.missing.glyph}${cov.missing}</span>
        </span>
        <span class="trow__moved" data-moved aria-hidden="true"></span>
        ${gateLine()}
        <span class="sr-only" data-row-sr>${esc(c.name)}: match score ${c.score} out of 100, ${esc(cls.label)}.</span>
      </li>`;
}

/**
 * The control: three sliders in a sticky column, the actor hint, the what-if,
 * the phone's disclosure, and the list the sliders reorder. Reads RANKINGS, as
 * every tuner does; the gate and the bands in it are the product's own
 * (tools/rankings.mjs).
 */
export function gateTuner({ listId = 'control-list', sticky = true, ids = POOL_ROWS } = {}) {
  const combo = DEFAULT_COMBO.split('-').map(Number);
  const sliders = TUNABLE.map((t, i) => {
    const word = TIER_WORDS[combo[i]];
    return `      <div class="weight weight--tuner${t.key === 'kubernetes' ? ' weight--lead' : ''}" data-skill-control="${t.key}">
        <label class="weight__head" for="weight-${t.key}">
          <span class="weight__skill">${esc(t.skill)}</span>
          <span class="weight__tier" data-weight-readout="${t.key}" data-tone="${IMPORTANCE_TONES[word]}">${esc(word)}</span>
        </label>
        <input type="range" id="weight-${t.key}" min="0" max="3" step="1" value="${combo[i]}" data-weight="${t.key}" data-skill="${esc(t.skill)}" aria-valuetext="${esc(t.skill)}: ${esc(word)}">
        <div class="weight__scale" aria-hidden="true">${TIER_WORDS.map((w) => `<span>${esc(w)}</span>`).join('')}</div>
      </div>`;
  }).join('\n');

  return `<div class="control${sticky ? ' control--sticky' : ''}" data-tuner="${listId}">
  <div class="control__side">
    <div class="weights weights--tuner" role="group" aria-label="Skill importance">
${sliders}
      <p class="weights__hint"><span class="chip chip--human">you</span> set the tier · <span class="chip chip--engine">engine</span> re-ranks</p>
      <p class="sr-only" role="status" data-field="tuner-announce"></p>
    </div>
    <div class="whatif whatif--tuner">
      <div class="whatif__head">
        <p class="whatif__title">What if</p>
        <label class="toggle"><input type="checkbox" data-whatif><span>${esc(WHAT_IF.control)}</span></label>
      </div>
      <p class="whatif__readout">
        <span>qualified pool</span>
        <span class="whatif__figure" data-count="${WHAT_IF.before}" data-whatif-figure>${WHAT_IF.before}</span>
        <span class="whatif__delta" data-whatif-delta hidden>+${WHAT_IF.delta}</span>
        <span class="example-tag">${esc(WHAT_IF.note)}</span>
      </p>
      <p class="whatif__note">Example figures, not measured. On the list, the rows this would change are marked.</p>
      <p class="sr-only" role="status" data-field="whatif-announce"></p>
    </div>
    <p class="control__showall"><button type="button" class="btn btn--ghost" data-show-all aria-expanded="false">Show all three controls</button></p>
  </div>

  <div class="control__list">
    <div class="rank rank--tuner">
      <div class="rank__head">
        <p class="rank__title">${esc(JOB.title)} · ${esc(JOB.locationShort)}</p>
        <div class="rank__controls"><span class="rank__gatecount" data-gatecount></span><span class="rank__sort">sort: match score</span></div>
      </div>
      <p class="sr-only" id="${listId}-summary">${ids.length} candidates, ordered by match score. Setting a skill to critical removes anyone missing it before scoring.</p>
      <ul class="rank__list reorder" id="${listId}" aria-describedby="${listId}-summary" data-rank-list>
${ids.map(tunerRow).join('\n')}
      </ul>
      <p class="rank__foot">every candidate in the database · profiles people created, and profiles recruiters brought in</p>
    </div>
  </div>
</div>`;
}
