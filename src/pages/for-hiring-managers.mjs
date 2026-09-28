/**
 * for-hiring-managers.mjs — /for-hiring-managers
 *
 * NEW IN PHASE 4. The second half of the old /for-teams page, which carried two
 * arguments to two people with different fears and buried the weaker-selling
 * one at the bottom.
 *
 * THE TWO FEARS ARE NOT THE SAME FEAR:
 *
 *   A recruiter is afraid of volume, and of being unable to defend a shortlist
 *   when asked.
 *
 *   A hiring manager is afraid of being handed six names and no reasoning, of
 *   interviewing people who were never plausible, and of finding out in week
 *   nine that the requirement nobody questioned was the reason the role is
 *   still open.
 *
 * So this page is short, and it is about reading rather than doing. A hiring
 * manager does not want a seat in the sourcing tool. They want the argument for
 * each of six people, in a form they can read in four minutes and question in
 * two.
 *
 * No new compositions: the signals cluster and the what-if simulator are
 * exactly the two the argument needs, and both already exist.
 */

import {
  compositionNote, signalsCluster, tuner, controlComposition,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import { SIGNALS } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/for-hiring-managers/',
  title: 'For hiring managers — Transpahire',
  description:
    'Come to the meeting with the reasoning. The argument for each shortlisted candidate, the four signals a CV does not carry, and a way to test a requirement before the debrief rather than during it.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'For hiring managers',
    title: 'Come to the meeting <em>with the reasoning.</em>',
    lede: 'You are handed a shortlist and asked to trust it. This is the version where you can read the case for each name, disagree with it in the meeting, and test the requirement that is quietly costing you the role.',
  })}

<!-- ── Six arguments ────────────────────────────────────────────────────── -->
<section class="section section--tight-top" data-content="provisional">
  <div class="container pair pair--lead">
    <div data-reveal="left">
      <p class="eyebrow">What arrives</p>
      <h2 class="h-section mt-6">Six arguments, <em>not six names.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        Each shortlisted candidate comes with a score out of 100 and the reasoning behind it:
        every requirement matched to a phrase in their own profile, the relationship named, and
        the section of the profile it was drawn from. You can read one in a minute and
        interrogate it in two.
      </p>
      <p class="body-copy measure mt-6">
        Including the parts that count against them. A shortlist where every entry looks perfect
        is a shortlist somebody edited.
      </p>
      <p class="mt-8">${arrowLink('How a score comes apart', '/product/matching/')}</p>
    </div>
    <div data-reveal="right">
${signalsCluster()}
      ${compositionNote()}
    </div>
  </div>
</section>

<!-- ── The four signals ─────────────────────────────────────────────────── -->
<section class="section section--sunken" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Signals',
  title: 'Four things <em>the CV does not carry.</em>',
  lede: 'Computed from the structured profile and shown as the classification the model returned, rather than as a number with no name attached.',
})}
    <div class="pair">
      <div data-reveal="left">
        <ul class="checklist checklist--ruled">
${SIGNALS.map((sig) => `          <li class="checklist__item"><strong>${sig.label}</strong> — ${
  sig.key === 'seniority' ? 'over- or under-levelled for this role, which is the question that decides whether an interview is worth an hour'
  : sig.key === 'trajectory' ? 'the shape of a career: consistent growth, a pivot, a specialist, a generalist'
  : sig.key === 'potential' ? 'whether they would grow into a role they do not yet fill — the signal that makes a stretch candidate discussable rather than dismissable'
  : 'whether they are likely to still be in the process in three weeks, which is worth knowing before you build a panel around them'
}</li>`).join('\n')}
        </ul>
      </div>
      <div data-reveal="right">
        <p class="body-copy body-copy--lg measure">
          They arrive last in the explanation, after the reasoning, because they are the part
          nobody could have derived by reading the document — and because a signal read before
          the evidence becomes the conclusion instead of an input to it.
        </p>
        <p class="body-copy measure mt-6">
          Every one is a classification the model returned, not a score we invented a label for.
          Where the model has no basis for one, the panel shows nothing rather than a guess.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── Disagree with it in the room ─────────────────────────────────────── -->
<section class="section" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'In the debrief',
  title: 'Test the requirement <em>before the meeting, not during it.</em>',
  lede: '“What if we relaxed that?” is the most useful question in a hiring debrief and the one nobody can answer in the room. Simulation answers it in advance, with a number.',
})}
    <div class="control">
      <div data-reveal="left">
${tuner()}
        <p class="body-copy mt-8 measure--narrow">
          Move what matters and the order follows. Drop a preferred requirement and see how many
          more qualified people appear — <em>before</em> anyone changes the job.
        </p>
      </div>
      <div data-reveal="right">
${controlComposition()}
      </div>
    </div>

    <div class="pair mt-16">
      <div data-reveal="left">
        <p class="body-copy body-copy--lg measure">
          And when the answer is “nothing would change”, it says that. The sourcing agent
          distinguishes an option it cannot measure, an option it measured at zero, and an option
          with a number — and it prints the zero out loud, because a plausible invented figure is
          worse than a blank when somebody is about to act on it.
        </p>
      </div>
      <div data-reveal="right">
        <p class="body-copy measure">
          A requisition that has been open for nine weeks usually has one requirement doing the
          damage. The point of this control is that the conversation about which one stops being
          a matter of opinion.
        </p>
        <p class="mt-6">${arrowLink('When the market is covered', '/product/sourcing/#market-covered')}</p>
      </div>
    </div>
  </div>
</section>

<!-- ── And the decision stays yours ─────────────────────────────────────── -->
<section class="section section--sunken">
  <div class="container container--text">
${head({
  eyebrow: 'The line',
  title: 'The recommendation is the machine&rsquo;s. <em>The decision is yours.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        The platform ranks and it explains. It does not decide, and nothing in it will tell you
        whether to make an offer. Every score is stored with the weights that produced it, so a
        decision taken in March can be discussed in June against the model that was actually in
        force — which is the only version of accountability that survives a model change.
      </p>
      <p>
        None of that makes the machine right. It makes the machine arguable, which is the
        property that lets a person stay responsible for the outcome.
      </p>
      <p>${arrowLink('What gets logged, and who can see what', '/trust/')}</p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Bring the role <em>you keep re-scoping.</em>',
  lede: 'Thirty minutes. We run it through the engine and you read the arguments — and find out which requirement is costing you the pool.',
  secondary: 'How matching works',
  secondaryHref: '/product/matching/',
})}`;
}
