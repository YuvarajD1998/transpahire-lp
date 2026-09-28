/**
 * product-matching.mjs — /product/matching  ★
 *
 * The most important page on the site after the homepage, and the one most
 * worth over-investing in (`04 § 3`). The homepage section is a trailer for it.
 *
 * PHASE 4 REBUILT IT AROUND TWO NEW SECTIONS, both of which exist because the
 * old page argued for transparency without ever being transparent about
 * anything in particular:
 *
 *   "The working, published"  — the four weights, the three modifiers, the gate
 *                              and the published thresholds. This converts the
 *                              site's thesis from a claim into something a
 *                              reader can check, which is the single highest-
 *                              value piece of copy in the plan.
 *   "It cites its sources"    — every line of the explanation points at the
 *                              place in the profile it came from. The biggest
 *                              unclaimed beat in the product.
 *
 * What was cut, and why:
 *
 *   · THE FIVE-DIMENSION LIST. Two of the five were wrong. Salary is a ±10%
 *     adjustment applied after the weighted score, so listing it beside skill
 *     coverage overstated it by roughly a factor of six.
 *   · THE COMPARISON TABLE. It shipped with a visibly withheld column and a
 *     note underneath admitting so, on a page about transparency. The two
 *     claims that were solid are prose now.
 *   · "PRE-INTERVIEW INTELLIGENCE" from the lede. It says the same thing as the
 *     clause after it.
 *   · "WEAK" as a classification. The product renders that band to users as
 *     "Possible"; "weak" is a scorer's word.
 *
 * What is no longer held back: fairness has its own page at /trust, and the
 * mechanism/outcome distinction in `CLAUDE.md` § 7 is what unblocked it.
 */

import {
  argumentComposition, candidateViewComposition, compositionNote,
  controlComposition, criticalGate, evidenceSnippet, scoreModelComposition,
  signalsCluster, skillGraph, switcher, tuner,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import {
  BANDS, COVERAGE_BANDS, DIMENSIONS, EDGE_TYPES, MODIFIERS, ROLE_EDGE_TYPES,
  SWITCHER, explain,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/product/matching/',
  title: 'Explainable candidate matching — Transpahire',
  description:
    'A match score out of 100 from four weighted dimensions, with the weights published. Every requirement matched to a phrase in the candidate’s own profile, with the section it came from cited.',
};

const pct = (d) => Math.round(d.weight * 100);

export function render() {
  const sneha = explain('c1');
  const cited = [...sneha.strong, ...sneha.partial].slice(0, 3);

  return `${pageHead({
    crumb: 'Product',
    crumbHref: '/product/',
    eyebrow: 'Explainable matching',
    title: 'Scores that <em>explain themselves.</em>',
    lede: 'Know who to call before you pick up the phone. Most hiring platforms show a score. This one shows the reasoning behind the score, and where in the profile the reasoning came from.',
  })}

<!-- ── The panel, at full size and operable ─────────────────────────────── -->
<section class="section section--tight-top" id="the-panel" data-content="provisional">
  <div class="container argument">
    <div class="argument__copy">
      <div>
        <p class="eyebrow">The explanation</p>
        <h2 class="h-section mt-6">One score, <em>and every reason behind it.</em></h2>
      </div>

      <p class="body-copy body-copy--lg measure">
        Every candidate-job pair gets a score out of 100 and one of four classifications:
        ${BANDS.map((b) => b.label).join(', ').replace(/, ([^,]*)$/, ' or $1')}. The score is
        not the product — the breakdown is.
      </p>

      <p class="body-copy measure">
        Each requirement is matched to a phrase in the candidate&rsquo;s own profile, with the
        relationship between the two named: <strong>exact</strong>, a synonym, an equivalent,
        broader, narrower, or <strong>transferable</strong>. The transferable one is the
        interesting one, and the reason the next section exists.
      </p>

      <p class="body-copy measure">
        Per-skill coverage lands in one of four bands, and the panel says which:
        ${COVERAGE_BANDS.map((b) => `${b.label} (${b.range})`).join(', ')}.
      </p>

      <p class="body-copy measure">
        Switch candidate and the whole argument changes. One of these three is a stretch, and
        the panel says so.
      </p>

${switcher({ panelId: 'argument-panel', ids: SWITCHER })}
    </div>

    <div class="argument__panel" data-reveal="fade">
${argumentComposition()}
      ${compositionNote()}
    </div>
  </div>
</section>

<!-- ── The working, published ───────────────────────────────────────────── -->
<section class="section section--sunken" id="the-working" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'The model',
  title: 'The working, <em>published.</em>',
  lede: 'A score you can reproduce is a score you can argue with. So here is the whole of it: what is weighted, what only adjusts, and what stops a candidate being scored at all.',
})}

    <div class="pair pair--lead">
      <div data-reveal="left">
        <p class="body-copy body-copy--lg measure">
          Skill coverage is ${pct(DIMENSIONS[0])}% of the weight. Semantic similarity is
          ${pct(DIMENSIONS[1])}%. Experience and location share the last
          ${pct(DIMENSIONS[2]) + pct(DIMENSIONS[3])}%. Salary can move the total by a tenth,
          either way; a scarce skill lifts it; over-levelling pulls it down. Strong starts at
          ${BANDS[0].min}, good at ${BANDS[1].min}, potential at ${BANDS[2].min}.
        </p>
        <p class="body-copy measure mt-6">
          Before any of that runs, a candidate missing a critical skill is dropped — and which
          requirement dropped them is recorded, so an exclusion is as explicable as a ranking.
        </p>
        <p class="lede mt-8 measure">
          We publish the weights because <em>a score you can reproduce is a score you can
          argue with.</em>
        </p>
        <p class="body-copy measure mt-8">
          One thing the weights are not: universal. Search scoring is a deliberately different
          formula, because a search may have no job description to score against, and the
          product&rsquo;s own source says not to unify them. A number from a search and a
          number from a match are not the same number.
        </p>
      </div>
      <div data-reveal="right">
${scoreModelComposition()}
      </div>
    </div>

    <div class="mt-16" data-reveal="up">
${criticalGate()}
    </div>
  </div>
</section>

<!-- ── It cites its sources ─────────────────────────────────────────────── -->
<section class="section" id="sources" data-content="provisional">
  <div class="container pair">
    <div data-reveal="left">
      <p class="eyebrow">Evidence</p>
      <h2 class="h-section mt-6">It cites <em>its sources.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        Every line of the explanation points at the place it came from — a sentence in their
        experience, a project description, a skill they listed themselves. Click the reason and
        the profile scrolls to the words it was drawn from, with the matched terms marked.
      </p>
      <p class="body-copy measure mt-6">
        <em>Verified against the candidate&rsquo;s own words</em> is a status the panel prints,
        not a promise we make. When a match cannot be verified that way, the panel says that
        too, and the confidence figure beside it drops.
      </p>
      <p class="body-copy measure mt-6">
        Eight sections can be cited: headline, summary, bio, experience, projects, skills,
        education and certifications. The section is part of the answer — a skill listed in a
        skills array and a skill described in two years of work are not equivalent evidence,
        and the panel does not pretend they are.
      </p>
    </div>
    <div data-reveal="right">
      <div class="cites">
        <p class="panel__rule">Three lines from one explanation</p>
${cited.map((m) => evidenceSnippet({ skill: m.concept, quote: m.quote, section: m.section })).join('\n')}
        <p class="cites__foot">Each one is a link in the product. Clicking it scrolls the profile to the highlighted phrase.</p>
      </div>
      ${compositionNote()}
    </div>
  </div>
</section>

<!-- ── The skill graph ──────────────────────────────────────────────────── -->
<section class="section section--sunken" id="adjacency" data-content="provisional">
  <div class="container adjacency">
    <div class="adjacency__head" data-reveal="up">
      <p class="eyebrow eyebrow--bare">Skill intelligence</p>
      <h2 class="h-section mt-6">Matching that understands skills — <em>not just keywords.</em></h2>
    </div>

    <p class="body-copy body-copy--lg measure mx-auto text-center" data-reveal="up">
      The taxonomy is hierarchical, typed and versioned, and it holds
      ${EDGE_TYPES.length} kinds of relationship between skills — ${EDGE_TYPES.slice(0, 4).map((t) => `<em>${t}</em>`).join(', ')}
      and five more — each with a strength, some of them bidirectional. TypeScript relates to
      JavaScript. Docker is a prerequisite for Kubernetes. React transfers to Vue. Those
      relationships are why a profile without the exact word still scores, and why the
      effective pool is larger without the bar being lower.
    </p>

    <p class="body-copy measure mx-auto text-center" data-reveal="up">
      Job titles carry their own graph on top of the skills, with
      ${ROLE_EDGE_TYPES.length} further types: a senior role <em>progresses to</em> a staff
      one, a specialism resolves up to its parent, and an alternate title resolves to the same
      node — so “SDE III”, “Senior Software Engineer” and “Senior Backend Engineer” are not
      three separate searches.
    </p>

    <div data-reveal="scale">
${skillGraph()}
    </div>
  </div>
</section>

<!-- ── The signals ──────────────────────────────────────────────────────── -->
<section class="section" id="signals" data-content="provisional">
  <div class="container pair">
    <div data-reveal="left">
      <p class="eyebrow">Signals</p>
      <h2 class="h-section mt-6">Four things <em>the CV does not say.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        Seniority alignment tells you whether someone is over- or under-levelled for the
        role. Career trajectory classifies the shape of their history. The potential score
        estimates whether they would grow into it. Drop-off risk estimates whether they will
        still be in the process in three weeks.
      </p>
      <p class="body-copy measure mt-6">
        They arrive last in the explanation, after the reasoning, because they are the part a
        recruiter could not have derived by reading the document.
      </p>
      <p class="body-copy measure mt-6">
        Career gaps are detected and recorded as a fact about a timeline, not as a mark
        against a person: a gap you can see is a gap you can ask about.
      </p>
    </div>
    <div data-reveal="right">
${signalsCluster()}
    </div>
  </div>
</section>

<!-- ── Tuning and simulation ────────────────────────────────────────────── -->
<section class="section section--sunken" id="control" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Recruiter control',
  title: 'The ranking is <em>your priorities, calculated.</em>',
  lede: 'Two different capabilities, kept separate on purpose: tuning changes the order of the list, simulation changes the size of the pool. A critical requirement is the one exception — widening it needs an approval, because dropping a critical is not a tuning decision.',
})}

    <div class="control">
      <div data-reveal="left">
${tuner()}
      </div>
      <div data-reveal="right">
${controlComposition()}
      </div>
    </div>
  </div>
</section>

<!-- ── The candidate's side ─────────────────────────────────────────────── -->
<section class="section" data-content="provisional">
  <div class="container pair pair--lead">
    <div data-reveal="left">
      <p class="eyebrow">Both sides</p>
      <h2 class="h-section mt-6">It&rsquo;s <em>the same score.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        The candidate sees the number you see, and the same breakdown of where they fit and
        where they don&rsquo;t. Not a proxy, not a tier, not a softened version — the same
        record, read from the other side.
      </p>
      <p class="body-copy measure mt-6">
        They can see where their application stands, and they are told when it moves.
      </p>
      <p class="mt-8">${arrowLink('How it works for candidates', '/for-candidates/')}</p>
    </div>
    <div data-reveal="right">
${candidateViewComposition({ float: false })}
    </div>
  </div>
</section>

<!-- ── Where this sits ──────────────────────────────────────────────────── -->
<section class="section section--sunken" aria-label="Where this sits">
  <div class="container container--text">
${head({
  eyebrow: 'Where this sits',
  title: 'What happens <em>after the job board.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        Two claims, at category level, about categories rather than products. Applicant-tracking
        systems track applications: they are a system of record for people who already applied,
        and they do not rank a database against a role. Job boards aggregate supply: they put a
        listing in front of candidates, and what comes back is an inbox.
      </p>
      <p>
        Neither evaluates, and neither explains. That is the gap this is in, and it is the whole
        of what we will say about it — a third category exists, AI screening tools, and a
        sentence characterising its scope has not been through review, so there is no sentence.
      </p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Read the reasoning <em>on one of your own roles.</em>',
  lede: 'Bring a requisition you are struggling to fill. Thirty minutes, and you read the arguments yourself.',
  secondary: 'See the whole platform',
  secondaryHref: '/product/',
})}`;
}
