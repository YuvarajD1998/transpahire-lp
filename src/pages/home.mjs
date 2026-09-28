/**
 * home.mjs — the landing page.
 *
 * PHASE 6. The Stage 3 prototype (prototypes/index.html, prototypes/STAGE-3.md)
 * implemented in production. Variation 02, "Product editorial": eight scenes,
 * three tempos — statement → demonstration → reflection — and one signature.
 *
 *   01 The claim      paper   the real job-detail workspace, edge to edge
 *   02 The score      paper   six layers of one object on a pinned stage ★ P6
 *   03 The problem    ink     one sentence, hard cut
 *   04 The pool       bone    the ranked list, the gate, the relationships
 *   05 The argument   paper   the full explain panel, with the switcher
 *   06 The control    paper   the tuner: sticky controls, no pin; the note
 *   07 The system     ink     sourcing, refusals, the candidate's side, beats
 *   08 The close      ink→indigo   the candidate's 87, the ask
 *
 * The prototype is the source of truth for what this page looks like and does
 * (STAGE-3.md, the production handoff, "Do-not-change rules"). Nothing here is
 * reinterpreted; where production differs, STAGE-4-IMPLEMENTATION.md § 11 says
 * how and why. Every value is read from assets/data/product-demo.js, the
 * tuner's orderings included: RANKINGS carries the product's critical gate and
 * its bands, settled against the source (STAGE-4-IMPLEMENTATION.md § 12).
 *
 * Two budgets, spent exactly: one P5 drawer reveal (01) and one P6 stage (02).
 * Reveals never gate the hero. No count-up in the hero or on the stage.
 */

import {
  candidateView, candidateWorkspace, compositionNote, criticalGate, drawerHead,
  explainPanel, frame, gateTuner, jobHeader, listToolbar, marketCovered, missionConsole,
  pulseStrip, rankedList, sceneHead, signature, still, switcher, tabStrip,
} from '../lib/compositions.mjs';
import {
  DRAWER_TABS, EDGE_TYPES, JOB, JOB_TABS, MISSION, PHILOSOPHY, POOL_ROWS, REL_LABELS,
  SKILL_EDGES, SWITCHER, candidate,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/',
  title: 'Transpahire — the intelligent hiring platform that shows its reasoning',
  description:
    'Transpahire scores every candidate against the role out of 100 and shows the reasoning. Skill coverage carries 65% of the weight, every match cites the line of the profile it came from, and the weights are published. Book a demo.',
};

const SNEHA = candidate('c1');
const K8S_EDGE = SKILL_EDGES.find((e) => e.to === 'Kubernetes');

function arrow() {
  return `<svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>`;
}

function ctas({ secondary, secondaryHref, block = false, demo = true }) {
  return `<div class="cluster claim__ctas${block ? ' claim__ctas--block' : ''}">
${demo ? `        <a class="btn btn--primary hover-icon press" href="/demo/">Book a demo ${arrow()}</a>\n` : ''}        <a class="btn btn--secondary hover-icon press" href="${secondaryHref}">${secondary} ${arrow()}</a>
      </div>`;
}

/* ── 01 · THE CLAIM ────────────────────────────────────────────────────────
   The A3 hero: compact head, then the product edge to edge under one route
   line and no frame. The website opens into the product.

   Dense and inert: every control in the workspace is a <span>; zero focus
   stops before the CTA (CLAUDE.md § 5; tools/check.mjs and audit.mjs both
   assert it). No reveal gates it; P5's drawer opens once on first paint. No
   count-up: still() strips the counter hooks.

   ONE CTA, NOT TWO (deviation D13). "Book a demo" sat forty pixels under the
   header's own, which is fixed and keeps its button at every width, so the
   hero repeated an ask that never leaves the screen. What remains is the one
   thing only the hero can offer: "See the working" anchors to #score, not to
   the product page — the bridge to the signature is the button (STAGE-3.md
   § 3.8).

   The eyebrow wording is a candidate; Stage 3 left it as a wording decision. */
const claim = still(`<section class="scene scene--claim claim" id="top" data-content="provisional">
  <div class="container claim__head">
    <p class="eyebrow claim__eyebrow">Hiring platform · for talent teams</p>
    <h1 class="h-display claim__title">Every shortlist <em>explains itself.</em></h1>
    <div class="claim__row">
      <p class="lede claim__lede">Every candidate scored against the role out of 100, and every point traced to the line of the profile it came from.</p>
      ${ctas({ secondary: 'See the working', secondaryHref: '#score', demo: false })}
    </div>
  </div>
  <div class="bleed" aria-label="The job detail screen">
    <p class="bleed__route">${JOB.route}</p>
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
${rankedList({ ids: POOL_ROWS, listId: 'workspace-list', variant: 'tracked', head: false, foot: false, selected: 'c1', move: true, gateRow: true })}
        </div>
        <div class="workspace__drawer">
${drawerHead({ candidateId: 'c1' })}
${tabStrip({ tabs: DRAWER_TABS, modifier: 'tabstrip--drawer' })}
${explainPanel({ id: 'workspace-panel', candidateId: 'c1', sequenced: false, showFooter: false, showIdent: false, ringSize: 40 })}
        </div>
      </div>
    </div>
    ${compositionNote()}
  </div>
</section>`);

/* ── 02 · THE SCORE ★ ──────────────────────────────────────────────────────
   The signature. Six layers of one object — Sneha Iyer's row from the screen
   above — on a pinned stage the scroll takes apart: verdict → mechanism →
   evidence → source → shared result. The lede names the object so the hero
   and the stage read as one movement. P6, motion.css § 4b; one per page. */
const score = `<section class="scene scene--signature" id="score" data-content="provisional">
${sceneHead({ num: '02', name: 'The score', title: 'The score, <em>taken apart.</em>', lede: `${SNEHA.name}'s row, from the screen above. Six layers of one object.` })}
${signature({ id: 'c1' })}
  <div class="container"><p class="composition-note">Illustrative data · invented people and companies · every value from the product data module</p></div>
</section>`;

/* ── 03 · THE PROBLEM ──────────────────────────────────────────────────────
   Ink. One line at statement size. Hard cut in, hard cut out. */
const problem = `<section class="scene scene--problem on-ink" id="problem">
  <div class="container">
    <p class="eyebrow scene__num">03 / 08 · The problem</p>
    <p class="quote problem__line">A score you cannot question is an opinion with a number on it.</p>
  </div>
</section>`;

/* ── 04 · THE POOL ─────────────────────────────────────────────────────────
   Bone. The ranked list with truthful filters and cited evidence, the gate,
   and the relationship rail: how a phrase relates to a phrase, how a skill
   relates to a skill, and the one worked example the whole page depends on. */
const pool = `<section class="scene scene--pool" id="pool" data-content="provisional">
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
        <p class="pool__relchips">${REL_LABELS.map((r) => `<span class="relchip">${r}</span>`).join(' ')}</p>
        <p class="panel__rule">How skills relate to each other, in the taxonomy</p>
        <p class="pool__edges">${EDGE_TYPES.map((e) => `<span>${e}</span>`).join('<span aria-hidden="true"> · </span>')}</p>
        <p class="pool__example"><span class="chip chip--mono">${K8S_EDGE.from}</span> <em>${K8S_EDGE.type}</em> <span class="chip chip--mono">${K8S_EDGE.to}</span> <span class="pool__strength">${K8S_EDGE.strength}</span> — which is why Docker experience counts, partly, for a Kubernetes requirement.</p>
      </div>
    </aside>
  </div>
</section>`;

/* ── 05 · THE ARGUMENT ─────────────────────────────────────────────────────
   Paper. The full explain panel in a frame, sequenced on reveal, with the
   switcher sticky beside it. The panel id is `argument-panel` and the
   switcher's ids are SWITCHER, which is what tools/audit.mjs drives. */
const argument = `<section class="scene scene--argument" id="argument" data-content="provisional">
${sceneHead({ num: '05', name: 'The argument', title: 'It will tell you what\'s wrong with <em>its own top pick.</em>', lede: 'Strong on payments depth. No direct Kubernetes, and a salary expectation above the band. The score shows both, and every line says where it came from.' })}
  <div class="container argument argument--scene">
    <div class="argument__side">
${switcher({ panelId: 'argument-panel', ids: SWITCHER })}
      <p class="argument__note">Three people, three different arguments, and one of them is a stretch. Every cited line is highlighted in the panel.</p>
    </div>
    <div class="argument__panel" data-reveal="rise">
${frame({ ratio: '4 / 5', meta: `${JOB.matchesRoute} / ${SNEHA.slug}`, modifier: 'frame--elevated', body: explainPanel({ id: 'argument-panel', candidateId: 'c1', sequenced: true, showFooter: true }) })}
    </div>
  </div>
</section>`;

/* ── 06 · THE CONTROL ──────────────────────────────────────────────────────
   Paper. The tuner: a sticky control column beside the list, no scroll track.
   Input changes → ranking changes. Kubernetes to critical promotes Rahul Verma
   (90) above Sneha Iyer (87); Kafka to critical gates five candidates as
   "Not scored · missing critical". Both come from RANKINGS; the gate is the
   product's own (tools/rankings.mjs), so the scene needs no caveat under it. */
const control = `<section class="scene scene--control" id="control" data-content="provisional">
${sceneHead({ num: '06', name: 'The control', title: 'You decide what counts. <em>It does the arithmetic.</em>', lede: 'Move a skill through the four tiers and watch the order change. Set one to critical and watch who never reaches the scorer.' })}
  <div class="container">
${gateTuner({ listId: 'control-list', sticky: true })}
    <p class="composition-note">Illustrative data · precomputed orderings · the what-if figures are examples</p>
  </div>
</section>`;

/* ── 07 · THE SYSTEM ───────────────────────────────────────────────────────
   Ink. The sourcing agent with its refusals visible, the market covered, the
   candidate's own dashboard, and the five beats as one column beside it — so
   the two columns end together. The dashboard stays on the phone: it is the
   only place the candidate's side appears before the close, and hiding it
   would take "runs both ways" out of the scene (STAGE-3.md § 4). */
const system = `<section class="scene scene--system on-ink" id="system" data-content="provisional">
${sceneHead({ num: '07', name: 'The system', title: 'Transparency that only runs one way <em>is just a dashboard.</em>' })}
  <div class="container system">
    <div class="system__agent" data-reveal="rise">
      <p class="panel__rule">${MISSION.name} · <span class="system__status">${MISSION.status.toLowerCase()}</span></p>
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
${PHILOSOPHY.map((b) => `      <div class="beat${b.wide ? ' beat--wide' : ''}"><p class="beat__label">${b.label}</p><p class="beat__line">${b.line}</p></div>`).join('\n')}
    </div>
  </div>
</section>`;

/* ── 08 · THE CLOSE ────────────────────────────────────────────────────────
   Ink into indigo. The candidate's screen in a content-hugging ink frame, the
   87 at statement size, the three-part line, and the ask. The secondary CTA is
   the honest page: after the whole argument, "What we will not claim". */
const close = `<section class="scene scene--close on-ink" id="close">
  <div class="container close">
    <div class="close__cand" data-reveal="rise">
      <p class="eyebrow scene__num">08 / 08 · The close</p>
      <h2 class="h-section close__title">The person you passed on <em>can see why.</em></h2>
      <div class="frame frame--ink close__frame" style="--ratio: auto">
        <div class="frame__chrome"><span class="frame__meta">app.transpahire.com / jobs / recommended</span></div>
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
      ${ctas({ secondary: 'What we will not claim', secondaryHref: '/trust/', block: true })}
      <p class="close__fine">No pricing is published because there is not one to publish. No customer logos until there are customers to name.</p>
    </div>
  </div>
</section>`;

export function render() {
  return [claim, score, problem, pool, argument, control, system, close].join('\n\n');
}
