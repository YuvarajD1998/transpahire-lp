/**
 * parts.mjs — every prototype composition.
 *
 * Reuses the production renderers wherever one exists (jobWorkspace, rankedList,
 * explainPanel, scoreRing, candidateView, missionConsole, marketCovered,
 * criticalGate, switcher) and reads EVERY value from assets/data/product-demo.js.
 * The pieces authored here are STAGINGS of that data — the signature's six
 * layers, the evidence chain, the proposed tuner — not new product surfaces.
 *
 * Nothing here is production. See prototypes/README.md.
 */

import {
  candidateView, compositionNote, criticalGate, esc, evidenceSnippet, explainPanel,
  frame, jobHeader, jobWorkspace, listToolbar, marketCovered, missionConsole,
  pulseStrip, rankedList, scoreRing, switcher, tabStrip, drawerHead, candidateWorkspace,
} from '../../src/lib/compositions.mjs';
import {
  CANDIDATES, CANDIDATE_VIEW, CLASSIFICATIONS, CONFIDENCE, CRITICAL_GATE, DIMENSIONS,
  EDGE_TYPES, EXPLAIN, FIT_SPLIT, GATED, JOB, JOB_TABS, MARKET_COVERED, MISSION,
  MODIFIERS, PHILOSOPHY, POOL_ROWS, REL_LABELS, ROLE_EDGE_TYPES, ROW_META, SKILL_EDGES,
  SKILL_STATES, STAGES, ORIGINS, TIER_WORDS, TUNABLE, DEFAULT_COMBO, WHAT_IF,
  IMPORTANCE_TONES, candidate, coverage, headline, explain,
} from '../../assets/data/product-demo.js';

/* --------------------------------------------------------------------------
   Small shared pieces (the production ones are module-private)
   -------------------------------------------------------------------------- */

function avatar(name) {
  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2);
  return `<span class="mono-disc" aria-hidden="true">${esc(initials)}</span>`;
}
function stageChip(key) {
  const st = STAGES[key];
  return `<span class="pill pill--${st.tone} pill--stage">${esc(st.label)}</span>`;
}
function arrow() {
  return `<svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>`;
}
export function ctas({ primary = 'Book a demo', secondary = 'See the working', secondaryHref = '/product/matching/', block = false } = {}) {
  return `<div class="cluster claim__ctas${block ? ' claim__ctas--block' : ''}">
        <a class="btn btn--primary hover-icon press" href="/demo/">${esc(primary)} ${arrow()}</a>
        <a class="btn btn--secondary hover-icon press" href="${esc(secondaryHref)}">${esc(secondary)} ${arrow()}</a>
      </div>`;
}

/** No count-up in a hero or a scroll composition: a figure that ticks up is
    arriving, and these are states. Strips the production renderers' hooks. */
export function still(html) {
  return html.replace(/ data-count="\d+"/g, '');
}

const SNEHA = candidate('c1');
const SNEHA_X = explain('c1');
const K8S = SNEHA_X.partial.find((m) => m.concept === 'Kubernetes');
const K8S_EDGE = SKILL_EDGES.find((e) => e.to === 'Kubernetes');
const pct = (w) => Math.round(w * 100);

/* ==========================================================================
   PROTOTYPE A — three heroes
   ========================================================================== */

const EYEBROW = 'Hiring platform · for talent teams';
const H1 = 'Every shortlist <em>explains itself.</em>';
const SUPPORT = 'Every candidate scored against the role out of 100, and every point traced to the line of the profile it came from.';

/** A1 — EDITORIAL PRODUCT. Headline full width at the top of the scale; the
    real workspace full width beneath; the first screen ends mid-list. */
export function heroA1({ eyebrow = EYEBROW } = {}) {
  return still(`<section class="scene scene--claim claim claim--a1" id="top" data-content="provisional">
  <div class="container claim__head">
    <p class="eyebrow claim__eyebrow">${esc(eyebrow)}</p>
    <h1 class="h-display claim__title">${H1}</h1>
    <div class="claim__row">
      <p class="lede claim__lede">${esc(SUPPORT)}</p>
      ${ctas()}
    </div>
  </div>
  <div class="container claim__visual">
${jobWorkspace()}
    ${compositionNote()}
  </div>
</section>`);
}

/** A2 — EVIDENCE FIRST. The claim, then the chain: row → 87 → weights → skill →
    the cited line. The product appears as its argument, not as its chrome. */
export function heroA2() { return still(heroA2Body()); }
function heroA2Body() {
  const c = SNEHA;
  const rm = ROW_META.c1;
  const weights = DIMENSIONS.map((d) => `        <div class="wrow wrow--${d.key}">
          <span class="wrow__label">${esc(d.label)}</span>
          <span class="wrow__bar" aria-hidden="true"><span class="wrow__fill" style="--w: ${pct(d.weight)}"></span></span>
          <span class="wrow__pct">${pct(d.weight)}%</span>
        </div>`).join('\n');

  return `<section class="scene scene--claim claim claim--a2" id="top" data-content="provisional">
  <div class="container claim__head">
    <p class="eyebrow claim__eyebrow">${esc(EYEBROW)}</p>
    <h1 class="h-display claim__title">${H1}</h1>
  </div>
  <div class="container">
    <div class="chain" role="group" aria-label="How one score is built">
      <p class="sr-only">Sneha Iyer is ranked first at 87 out of 100. The 87 is built from four published weights. Skill coverage, 65 per cent of it, is a list of matched skills. Kubernetes is matched as transferable from container orchestration, at 78 per cent confidence, and the line of the profile it came from is quoted.</p>

      <div class="chain__step chain__step--row" aria-hidden="true">
        <p class="chain__cap">01 · Ranked</p>
        <div class="chain__row">
          ${avatar(c.name)}
          <span class="rank__ident"><span class="rank__name">${esc(c.name)}</span><span class="rank__headline">${esc(headline(c))}</span><span class="chain__stage">${stageChip(rm.stage)}</span></span>
          ${scoreRing({ score: c.score, size: 44, band: c.classification })}
        </div>
      </div>

      <div class="chain__lead" aria-hidden="true"></div>

      <div class="chain__step chain__step--score" aria-hidden="true">
        <p class="chain__cap">02 · The score</p>
        <div class="bigscore">
          ${scoreRing({ score: c.score, size: 120, band: c.classification })}
          <span class="bigscore__meta">
            <span class="chip chip--mono chip--${c.classification}">${esc(CLASSIFICATIONS[c.classification].label)}</span>
            <span class="pill pill--${CONFIDENCE[SNEHA_X.confidence].tone}">${esc(CONFIDENCE[SNEHA_X.confidence].label)} confidence</span>
          </span>
        </div>
      </div>

      <div class="chain__lead" aria-hidden="true"></div>

      <div class="chain__step chain__step--weights" aria-hidden="true">
        <p class="chain__cap">03 · Four weights, published</p>
        <div class="wrows">
${weights}
        </div>
        <p class="chain__note">then salary, ±10%, after</p>
      </div>

      <div class="chain__lead" aria-hidden="true"></div>

      <div class="chain__step chain__step--evidence" aria-hidden="true">
        <p class="chain__cap">04 · Every match, cited</p>
        <div class="xcite">
          <p class="xcite__head"><span class="xcite__concept">${esc(K8S.concept)}</span> <span class="xcite__arrow">→</span> <span class="xcite__matched">${esc(K8S.matched)}</span></p>
          <p class="xcite__meta"><span class="relchip">${esc(K8S.rel)}</span> <span>${esc(K8S.section)}</span> <span>${K8S.confidence}%</span> <span class="concept__verified">✓ verified</span></p>
          <p class="xcite__quote"><q>${esc(K8S.quote)}</q></p>
        </div>
      </div>
    </div>

    <div class="claim__row claim__row--after">
      <p class="lede claim__lede">${esc(SUPPORT)}</p>
      ${ctas()}
    </div>
    ${compositionNote()}
  </div>
</section>`;
}

/** A3 — PRODUCT AS THE HERO. Edge to edge, no frame chrome, one route line; the
    website opens into the product. */
export function heroA3(o = {}) { return still(heroA3Body(o)); }
function heroA3Body({ cta = {} } = {}) {
  return `<section class="scene scene--claim claim claim--a3" id="top" data-content="provisional">
  <div class="container claim__head claim__head--compact">
    <p class="eyebrow claim__eyebrow">${esc(EYEBROW)}</p>
    <h1 class="h-display claim__title">${H1}</h1>
    <div class="claim__row">
      <p class="lede claim__lede">${esc(SUPPORT)}</p>
      ${ctas(cta)}
    </div>
  </div>
  <div class="bleed" aria-label="The job detail screen">
    <p class="bleed__route">${esc(JOB.route)}</p>
    <h2 class="sr-only">What the engine returns for this role</h2>
    <div class="workspace workspace--bleed" data-drawer-reveal>
      <div class="workspace__job">
${jobHeader()}
${pulseStrip()}
${tabStrip({ tabs: JOB_TABS, modifier: 'tabstrip--job' })}
      </div>
      <div class="workspace__panes">
        <div class="workspace__list">
${listToolbar()}
${rankedList({ ids: POOL_ROWS, listId: 'a3-list', variant: 'tracked', head: false, foot: false, selected: 'c1', move: true, gateRow: true })}
        </div>
        <div class="workspace__drawer">
${drawerHead({ candidateId: 'c1' })}
${tabStrip({ tabs: [{ label: 'Profile' }, { label: 'Match', active: true }, { label: 'Interviews' }, { label: 'Feedback' }, { label: 'Activity' }], modifier: 'tabstrip--drawer' })}
${explainPanel({ id: 'a3-panel', candidateId: 'c1', sequenced: false, showFooter: false, showIdent: false, ringSize: 40 })}
        </div>
      </div>
    </div>
    ${compositionNote()}
  </div>
</section>`;
}

/* ==========================================================================
   PROTOTYPE B — THE SCORE, TAKEN APART
   --------------------------------------------------------------------------
   Six layers, one object. Every layer is real DOM in reading order with its
   own sr-only sentence, so the argument is heard in the order it is watched.
   `execution` selects the motion mapping in signature.css; `mode` 'pinned'
   (sticky stage, scroll is the clock) or 'stacked' (six frames in flow).
   ========================================================================== */

export const SIGNATURE_CAPTIONS = [
  { k: 'Ranked.',                        s: `${JOB.pool.total} people scored against the role. ${SNEHA.name} first, at ${SNEHA.score}.` },
  { k: 'The score.',                     s: `${SNEHA.score} out of 100. ${CLASSIFICATIONS[SNEHA.classification].label}, ${CONFIDENCE[SNEHA_X.confidence].label.toLowerCase()} confidence.` },
  { k: 'Four weights, published.',       s: `Skill coverage carries ${pct(DIMENSIONS[0].weight)}% of it. Salary is a ±10% adjustment after, not a fifth weight.` },
  { k: 'Every skill, matched.',          s: `${SNEHA_X.strong.length} exact or equivalent, ${SNEHA_X.partial.length} transferable, ${SNEHA_X.missing.length} not found.` },
  { k: 'Every match, cited.',            s: `Kubernetes is ${SNEHA.skills.partial[0].transfer}, and here is the line it came from.` },
  { k: 'The same number, on her screen.', s: `The candidate sees ${SNEHA.score}, with the same breakdown.` },
];

function layerList() {
  return rankedList({ ids: POOL_ROWS, listId: 'sig-list', variant: 'tracked', head: false, foot: false, selected: 'c1' });
}
function layerScore() {
  const c = SNEHA;
  return `<div class="sig-score">
      ${scoreRing({ score: c.score, size: 220, band: c.classification })}
      <p class="sig-score__of" aria-hidden="true">/ 100</p>
      <p class="sig-score__who">${esc(c.name)} <span class="sig-score__sep">·</span> ${esc(headline(c))}</p>
      <p class="sig-score__chips">
        <span class="chip chip--mono chip--${c.classification}">${esc(CLASSIFICATIONS[c.classification].label)}</span>
        <span class="pill pill--ai">AI</span>
        <span class="pill pill--${CONFIDENCE[SNEHA_X.confidence].tone}">${esc(CONFIDENCE[SNEHA_X.confidence].label)} confidence</span>
      </p>
    </div>`;
}
function layerWeights() {
  const rows = DIMENSIONS.map((d, i) => `      <div class="wrow wrow--${d.key}${i === 0 ? ' wrow--lead' : ''}" style="--i: ${i}">
        <span class="wrow__label">${esc(d.label)}</span>
        <span class="wrow__bar" aria-hidden="true"><span class="wrow__fill" style="--w: ${pct(d.weight)}"></span></span>
        <span class="wrow__pct">${pct(d.weight)}%</span>
      </div>`).join('\n');
  const mods = MODIFIERS.map((m) => `<span><b>${esc(m.shape)}</b> ${esc(m.label)}</span>`).join(' ');
  return `<div class="sig-weights">
      <p class="sig-weights__head"><span class="sig-weights__n">${SNEHA.score}</span> <span class="sig-weights__eq">=</span> <span class="sig-weights__sum">four weights, published</span></p>
      <div class="wrows wrows--lg">
${rows}
      </div>
      <p class="sig-weights__mods">then, in this order: ${mods}</p>
      <p class="sig-weights__gate">before any of it: ${esc(CRITICAL_GATE.line)}</p>
    </div>`;
}
function layerSkills() {
  const e = SNEHA_X;
  const row = (m, state) => `      <div class="srow srow--${state}" data-concept="${esc(m.concept)}">
        <span class="srow__glyph" aria-hidden="true">${SKILL_STATES[state].glyph}</span>
        <span class="srow__concept">${esc(m.concept)}</span>
        <span class="srow__arrow" aria-hidden="true">→</span>
        <span class="srow__matched">${esc(m.matched)}</span>
        <span class="relchip">${esc(m.rel)}</span>
        <span class="srow__conf">${m.confidence}%</span>
        <span class="sr-only">${esc(m.concept)}: ${esc(SKILL_STATES[state].word)}, matched to “${esc(m.matched)}” (${esc(m.rel)}), ${m.confidence}% confidence.</span>
      </div>`;
  const missing = e.missing.map((m) => `      <div class="srow srow--missing">
        <span class="srow__glyph" aria-hidden="true">${SKILL_STATES.missing.glyph}</span>
        <span class="srow__concept">${esc(m.concept)}</span>
        <span class="srow__arrow" aria-hidden="true">→</span>
        <span class="srow__matched srow__matched--none">not found in profile</span>
        <span class="relchip relchip--none">${esc(m.tier)}</span>
        <span class="srow__conf">—</span>
        <span class="sr-only">${esc(m.concept)}: missing; a ${esc(m.tier)} requirement.</span>
      </div>`).join('\n');
  return `<div class="sig-skills">
      <p class="sig-skills__head"><span class="wrow__label">${esc(DIMENSIONS[0].label)}</span> <span class="wrow__pct">${pct(DIMENSIONS[0].weight)}%</span> <span class="sig-skills__open">opens into</span></p>
      <div class="srows">
${e.strong.map((m) => row(m, 'covered')).join('\n')}
${e.partial.map((m) => row(m, 'partial')).join('\n')}
${missing}
      </div>
    </div>`;
}
function layerEvidence() {
  const m = K8S;
  return `<div class="sig-evidence">
      <p class="sig-evidence__head">
        <span class="srow__glyph srow__glyph--partial" aria-hidden="true">${SKILL_STATES.partial.glyph}</span>
        <span class="srow__concept">${esc(m.concept)}</span> <span class="srow__arrow" aria-hidden="true">→</span> <span class="srow__matched">${esc(m.matched)}</span>
      </p>
      <p class="sig-evidence__rel"><span class="relchip">${esc(m.rel)}</span> <span class="sig-evidence__edge">${esc(K8S_EDGE.from)} → ${esc(K8S_EDGE.to)} · <em>${esc(K8S_EDGE.type)}</em> · ${K8S_EDGE.strength}</span></p>
      <p class="sig-evidence__reason">${esc(m.reason)}</p>
      <figure class="sig-evidence__source">
        <figcaption class="sig-evidence__from"><span class="label">from the profile · ${esc(m.section)}</span> <span class="concept__verified">✓ verified against the candidate's own words</span></figcaption>
        <blockquote class="sig-evidence__quote"><mark>${esc(m.quote)}</mark></blockquote>
      </figure>
      <p class="sig-evidence__conf"><span class="meter meter--thin" aria-hidden="true"><span class="meter__fill" style="--meter-v: ${(m.confidence / 100).toFixed(2)}"></span></span> <span>${m.confidence}% confidence</span></p>
    </div>`;
}
function layerCandidate() {
  const c = SNEHA;
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

/**
 * @param {object} o
 * @param {'v1'|'v2'|'v3'} o.execution
 * @param {'pinned'|'stacked'} o.mode
 * @param {boolean} [o.heading]  render the scene head above the stage
 */
export function signature(o = {}) { return still(signatureBody(o)); }
function signatureBody({ execution = 'v2', mode = 'pinned', number = '02', heading = true, lede = '', thresholds = '' } = {}) {
  const layers = [layerList(), layerScore(), layerWeights(), layerSkills(), layerEvidence(), layerCandidate()];
  const caps = SIGNATURE_CAPTIONS;

  const layerHtml = layers.map((html, i) => `      <div class="layer layer--${i + 1}" data-layer="${i + 1}">
        <p class="layer__cap"><span class="layer__n">0${i + 1}</span> <span class="layer__k">${esc(caps[i].k)}</span> <span class="layer__s">${esc(caps[i].s)}</span></p>
        <div class="layer__body">
${html}
        </div>
      </div>`).join('\n');

  const rail = caps.map((c, i) => `        <li class="srail__item" data-for="${i + 1}"><span class="srail__n">0${i + 1}</span><span class="srail__k">${esc(c.k)}</span></li>`).join('\n');

  const head = heading ? `  <div class="container scene__head">
    <p class="eyebrow scene__num">${number} / 08 · The score</p>
    <h2 class="h-section scene__title">The score, <em>taken apart.</em></h2>
    ${lede ? `<p class="lede scene__lede">${esc(lede)}</p>` : ''}
  </div>` : '';

  return `<section class="scene scene--signature" id="score" data-content="provisional">
${head}
  <div class="sig sig--${mode}" data-signature data-execution="${execution}"${thresholds ? ` data-thresholds="${esc(thresholds)}"` : ''} style="--p: 0" data-state="1">
    <div class="sig__stage">
      <div class="sig__persist" aria-hidden="true">
        ${scoreRing({ score: SNEHA.score, size: 38, band: SNEHA.classification })}
      </div>
      <ol class="srail" aria-hidden="true">
${rail}
      </ol>
      <div class="sig__layers">
${layerHtml}
      </div>
    </div>
  </div>
  <div class="container"><p class="composition-note">Illustrative data · invented people and companies · every value from the product data module</p></div>
</section>`;
}

/* ==========================================================================
   PROTOTYPE C — THE TUNER, with the proposed fixture
   ========================================================================== */

function protoRow(id) {
  const c = candidate(id);
  const cov = coverage(c);
  const cls = CLASSIFICATIONS[c.classification];
  const k8s = c.skills.covered.includes('Kubernetes') ? 'covered' : c.skills.partial.some((p) => p.name === 'Kubernetes') ? 'partial' : 'missing';
  return `      <li class="rank__row reorder__row trow" data-row="${c.id}" data-classification="${c.classification}" data-k8s="${k8s}">
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
        <span class="trow__gate" data-gate hidden><span class="pill pill--none">${esc(GATED.verdict)}</span> <span class="trow__gate-why">missing critical · <b data-gate-skill></b></span></span>
        <span class="sr-only" data-row-sr>${esc(c.name)}: match score ${c.score} out of 100, ${esc(cls.label)}.</span>
      </li>`;
}

export function protoTuner({ listId = 'proto-list', pinned = true } = {}) {
  const combo = DEFAULT_COMBO.split('-').map(Number);
  const sliders = TUNABLE.map((t, i) => {
    const word = TIER_WORDS[combo[i]];
    return `      <div class="weight weight--proto${t.key === 'kubernetes' ? ' weight--lead' : ''}" data-skill-control="${t.key}">
        <label class="weight__head" for="pw-${t.key}">
          <span class="weight__skill">${esc(t.skill)}</span>
          <span class="weight__tier" data-weight-readout="${t.key}" data-tone="${IMPORTANCE_TONES[word]}">${esc(word)}</span>
        </label>
        <input type="range" id="pw-${t.key}" min="0" max="3" step="1" value="${combo[i]}" data-weight="${t.key}" data-skill="${esc(t.skill)}" aria-valuetext="${esc(t.skill)}: ${esc(word)}">
        <div class="weight__scale" aria-hidden="true">${TIER_WORDS.map((w) => `<span>${esc(w)}</span>`).join('')}</div>
      </div>`;
  }).join('\n');

  return `<div class="control control--proto${pinned ? ' control--pinned' : ''}" data-proto-tuner="${listId}">
  <div class="control__side">
    <div class="weights weights--proto" role="group" aria-label="Skill importance">
${sliders}
      <p class="weights__hint"><span class="chip chip--human">you</span> set the tier · <span class="chip chip--engine">engine</span> re-ranks</p>
      <p class="sr-only" role="status" data-field="tuner-announce"></p>
    </div>
    <div class="whatif whatif--proto">
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
    <div class="rank rank--proto">
      <div class="rank__head">
        <p class="rank__title">${esc(JOB.title)} · ${esc(JOB.locationShort)}</p>
        <div class="rank__controls"><span class="rank__gatecount" data-gatecount></span><span class="rank__sort">sort: match score</span></div>
      </div>
      <p class="sr-only" id="${listId}-summary">${POOL_ROWS.length} candidates, ordered by match score. Setting a skill to critical removes anyone missing it before scoring.</p>
      <ul class="rank__list reorder" id="${listId}" aria-describedby="${listId}-summary" data-rank-list>
${POOL_ROWS.map(protoRow).join('\n')}
      </ul>
      <p class="rank__foot">every candidate in the database · profiles people created, and profiles recruiters brought in</p>
    </div>
  </div>
</div>`;
}

/* ==========================================================================
   PROTOTYPE D — the eight scenes
   ========================================================================== */

function sceneHead({ num, name, title, lede = '', ground = '' }) {
  return `  <div class="container scene__head${ground ? ` scene__head--${ground}` : ''}">
    <p class="eyebrow scene__num">${num} / 08 · ${esc(name)}</p>
    <h2 class="h-section scene__title">${title}</h2>
    ${lede ? `<p class="lede scene__lede">${esc(lede)}</p>` : ''}
  </div>`;
}

/** 03 — THE PROBLEM. Ink. One line. Hard cut. */
export function sceneProblem() {
  return `<section class="scene scene--problem on-ink" id="problem">
  <div class="container">
    <p class="eyebrow scene__num">03 / 08 · The problem</p>
    <p class="quote problem__line">A score you cannot question is an opinion with a number on it.</p>
  </div>
</section>`;
}

/** 04 — THE POOL. Ranked, the critical gate, truthful filters, the relationships. */
export function scenePool() {
  const rels = REL_LABELS.map((r) => `<span class="relchip">${esc(r)}</span>`).join(' ');
  const edges = EDGE_TYPES.map((e) => `<span>${esc(e)}</span>`).join('<span aria-hidden="true"> · </span>');
  return `<section class="scene scene--pool" id="pool" data-content="provisional">
${sceneHead({ num: '04', name: 'The pool', title: 'Nobody is dropped for a word they didn\'t type. <em>Some are dropped for a requirement they don\'t meet.</em>' })}
  <div class="container pool">
    <div class="pool__list" data-reveal="rise">
${rankedList({ ids: POOL_ROWS, listId: 'pool-list', filters: true, evidence: true })}
      <div class="pool__gate">
${criticalGate()}
      </div>
    </div>
    <aside class="pool__side">
      <div class="pool__rels" data-reveal="up">
        <p class="panel__rule">How a phrase in a profile relates to a phrase in the job</p>
        <p class="pool__relchips">${rels}</p>
        <p class="panel__rule">How skills relate to each other, in the taxonomy</p>
        <p class="pool__edges">${edges}</p>
        <p class="pool__example"><span class="chip chip--mono">${esc(K8S_EDGE.from)}</span> <em>${esc(K8S_EDGE.type)}</em> <span class="chip chip--mono">${esc(K8S_EDGE.to)}</span> <span class="pool__strength">${K8S_EDGE.strength}</span> — which is why Docker experience counts, partly, for a Kubernetes requirement.</p>
      </div>
    </aside>
  </div>
</section>`;
}

/** 05 — THE ARGUMENT. The explain panel, in full, with the switcher. */
export function sceneArgument() {
  return `<section class="scene scene--argument" id="argument" data-content="provisional">
${sceneHead({ num: '05', name: 'The argument', title: 'It will tell you what\'s wrong with <em>its own top pick.</em>', lede: 'Strong on payments depth. No direct Kubernetes, and a salary expectation above the band. The score shows both, and every line says where it came from.' })}
  <div class="container argument">
    <div class="argument__side">
${switcher({ panelId: 'arg-panel', ids: ['c1', 'c3', 'c6'] })}
      <p class="argument__note">Three people, three outcomes, and one of them is honestly not a hire. Every cited line is highlighted in the panel.</p>
    </div>
    <div class="argument__panel" data-reveal="rise">
${frame({ ratio: '4 / 5', meta: `${JOB.matchesRoute} / sneha-iyer`, modifier: 'frame--elevated', body: explainPanel({ id: 'arg-panel', candidateId: 'c1', sequenced: true, showFooter: true }) })}
    </div>
  </div>
</section>`;
}

/** 06 — THE CONTROL. The tuner, pinned or not. */
export function sceneControl({ pinned = true, note = '' } = {}) {
  return `<section class="scene scene--control" id="control" data-content="provisional">
${sceneHead({ num: '06', name: 'The control', title: 'You decide what counts. <em>It does the arithmetic.</em>', lede: 'Move a skill through the four tiers and watch the order change. Set one to critical and watch who never reaches the scorer.' })}
  <div class="container">
${protoTuner({ listId: 'page-tuner-list', pinned })}
    <p class="composition-note">Illustrative data · precomputed orderings · the what-if figures are examples</p>
    ${note}
  </div>
</section>`;
}

/** 07 — THE SYSTEM. The honest agent and the candidate's side, on ink. */
export function sceneSystem() {
  const beats = PHILOSOPHY.map((b) => `<div class="beat${b.wide ? ' beat--wide' : ''}"><p class="beat__label">${esc(b.label)}</p><p class="beat__line">${esc(b.line)}</p></div>`).join('\n');
  return `<section class="scene scene--system on-ink" id="system" data-content="provisional">
${sceneHead({ num: '07', name: 'The system', title: 'Transparency that only runs one way <em>is just a dashboard.</em>' })}
  <div class="container system">
    <div class="system__agent" data-reveal="rise">
      <p class="panel__rule">${esc(MISSION.name)} · <span class="system__status">${esc(MISSION.status.toLowerCase())}</span></p>
${missionConsole()}
    </div>
    <div class="system__covered" data-reveal="rise">
      <p class="panel__rule">and when there is nobody left to find</p>
${marketCovered()}
    </div>
    <div class="system__cand" data-reveal="rise">
      <p class="panel__rule">the candidate's side of the same platform</p>
${candidateWorkspace()}
    </div>
    <div class="system__beats">
${beats}
    </div>
  </div>
</section>`;
}

/** 08 — THE CLOSE. The candidate's 87, then the ask. The conclusion of a brief. */
export function sceneClose({ cta = { block: true } } = {}) {
  return `<section class="scene scene--close on-ink" id="close">
  <div class="container close">
    <div class="close__cand" data-reveal="rise">
      <p class="eyebrow scene__num">08 / 08 · The close</p>
      <h2 class="h-section close__title">The person you passed on <em>can see why.</em></h2>
      <div class="frame frame--ink close__frame" style="--ratio: 4 / 5">
        <div class="frame__chrome"><span class="frame__meta">${esc(CANDIDATE_VIEW.route)}</span></div>
        <div class="frame__body frame__body--content">
${candidateView()}
        </div>
      </div>
    </div>
    <div class="close__ask">
      <p class="close__num" aria-hidden="true">${SNEHA.score}</p>
      <p class="close__same">Recruiter sees ${SNEHA.score}. System explains ${SNEHA.score}. Candidate sees ${SNEHA.score}.</p>
      <h3 class="h-sub close__bring">Bring a role you're struggling to fill.</h3>
      <p class="body-copy close__copy">Thirty minutes. We run one of your open roles through the engine and you read the reasoning yourself.</p>
      ${ctas(cta)}
      <p class="close__fine">No pricing is published because there is not one to publish. No customer logos until there are customers to name.</p>
    </div>
  </div>
</section>`;
}
