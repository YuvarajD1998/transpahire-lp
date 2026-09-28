/**
 * product-analytics.mjs — /product/analytics
 *
 * NEW IN PHASE 4. Four shipped insight views the site never mentioned:
 * tuning, fairness, funnel and talent pool (`docs/phase-4.md` § 1.9).
 *
 * THE RULE THAT SHAPES THIS PAGE, AND IT IS UNCHANGED. `CLAUDE.md` § 7: do not
 * display an analytics figure without labelling it an example. There are no
 * measured values to publish — not one — so every composition here carries
 * `compositionNote()` with the example tag, and the page head says it before
 * the reader reaches a number.
 *
 * That is a weaker page than a page with real figures on it, and it is the only
 * honest version of this page that exists. The alternative is inventing a
 * time-to-hire improvement, which is the single most common lie in recruitment
 * marketing.
 *
 * TUNING IS FIRST, deliberately, and the product does the same: "they are where
 * a recruiter changes the shape of the pool rather than just reading it."
 */

import {
  compositionNote, funnelComposition, poolBands, scarcityComposition, tuner,
  controlComposition, fairnessComposition,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import { ANALYTICS, JOB } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/product/analytics/',
  title: 'Reporting and pool intelligence — Transpahire',
  description:
    'Funnel and conversion by job, stage bottlenecks, time to hire, pool score distribution and a skill scarcity index. Every figure on the page is an example: no measured analytics values are published.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'Reporting',
    title: 'Whether the process worked, <em>not just whether it finished.</em>',
    lede: 'Four views on one job: where a recruiter changes the shape of the pool, how the requirements narrow it, where people drop out of it, and what is scarce in it. Every figure on this page is an example — no measured values are published anywhere on this site.',
  })}

<!-- ── Tuning first, on purpose ─────────────────────────────────────────── -->
<section class="section section--tight-top" id="tuning" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Tuning',
  title: 'The view that <em>changes something.</em>',
  lede: 'It comes first because it is the only one that does. Skill weights, a job-description optimizer and a what-if simulator are where a recruiter changes the shape of the pool rather than reading a report about it.',
})}
    <div class="control">
      <div data-reveal="left">
${tuner()}
        <p class="body-copy mt-8 measure--narrow">
          Tuning changes the <em>order</em>. Simulation changes the <em>size</em>. They are two
          capabilities and they stay two controls.
        </p>
      </div>
      <div data-reveal="right">
${controlComposition()}
        ${compositionNote(ANALYTICS.note)}
      </div>
    </div>
  </div>
</section>

<!-- ── The pool ─────────────────────────────────────────────────────────── -->
<section class="section section--sunken" id="pool" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Talent pool',
  title: 'The shape of the pool, <em>as one bar.</em>',
  lede: 'How many people scored strong, good, potential and possible against this role — and how many never reached the scorer at all.',
})}
    <div class="pair pair--lead">
      <div data-reveal="left">
        <div class="pool-card">
${poolBands()}
        </div>
        ${compositionNote(ANALYTICS.note)}
      </div>
      <div data-reveal="right">
        <div class="prose">
          <p>
            One ordered bar, not a ring. A ring has no beginning, so “strong” and “possible”
            read as two peer slices rather than the two ends of a scale — and the whole point of
            the distribution is that it is a scale. Ordinal data gets an ordered bar; the rule is
            written down in <code>docs/product-visualization.md</code> so nobody re-litigates it
            in six months.
          </p>
          <p>
            The ${JOB.pool.gated} candidates the critical gate dropped sit outside the bar,
            because they were never scored. Folding them into the lowest band would be the one
            place on this page where a chart told a lie.
          </p>
          <p>${arrowLink('What the gate does', '/product/matching/#the-working')}</p>
        </div>
      </div>
    </div>

    <div class="mt-16" data-reveal="up">
${scarcityComposition()}
    </div>
  </div>
</section>

<!-- ── The funnel ───────────────────────────────────────────────────────── -->
<section class="section" id="funnel" data-content="provisional">
  <div class="container pair pair--lead">
    <div data-reveal="left">
      <p class="eyebrow">Funnel</p>
      <h2 class="h-section mt-6">Where people <em>stop.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        Stage counts, the conversion between each pair of stages, and time spent in each. A
        bottleneck is not a number you need explained: it is the row where the bar halves.
      </p>
      <p class="body-copy measure mt-6">
        Underneath it, the skills table — tiered by importance, so a shortfall on a critical
        requirement does not sit in a list next to a shortfall on a bonus one.
      </p>
      <p class="body-copy measure mt-6">
        At organisation level the same views roll up: match-to-hire across roles, and how well
        the model&rsquo;s predictions held. Those are the two figures we would most like to
        publish and the two we are least willing to guess at, so they are described here and
        shown nowhere.
      </p>
    </div>
    <div data-reveal="right">
${funnelComposition()}
      ${compositionNote(ANALYTICS.note)}
    </div>
  </div>
</section>

<!-- ── Fairness ─────────────────────────────────────────────────────────── -->
<section class="section section--sunken" id="fairness" data-content="provisional">
  <div class="container pair">
    <div data-reveal="left">
      <p class="eyebrow">Fairness</p>
      <h2 class="h-section mt-6">How the requirements <em>narrow it.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        The fourth view reads the job description rather than the pool: language that
        discourages applications, a requirement list nobody clears, a score distribution that
        skews hard by years of experience. No demographic data is used or held.
      </p>
      <p class="body-copy measure mt-6">
        And below its minimum number of scored candidates it declines to rate at all, which is
        the most useful thing on the panel.
      </p>
      <p class="mt-8">${arrowLink('Structural fairness, in full', '/trust/#fairness')}</p>
    </div>
    <div data-reveal="right">
${fairnessComposition()}
      <p class="composition-note">Illustrative report · an invented job description</p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Ask it about <em>a role you already know the answer to.</em>',
  lede: 'The fastest test of a reporting view is running it on a requisition whose problem you can already name.',
  secondary: 'The whole platform',
  secondaryHref: '/product/',
})}`;
}
