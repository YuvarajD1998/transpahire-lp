/**
 * for-candidates.mjs — /for-candidates  ★
 *
 * MUST HAVE, for a structural reason rather than a traffic one: the homepage
 * asserts that the candidate sees the same score, and a visitor who wants to
 * check that has to be able to. This page is what makes that claim checkable.
 *
 * Voice: warmer than the recruiter pages, same directness. Never
 * congratulatory, never "your dream job". A résumé score of 62 with five
 * suggestions is the tone — the product's honesty toward candidates is the
 * point, so the page does not flatter. That has not changed and should not.
 *
 * WHAT PHASE 4 CHANGED. Both of Phase 3's withheld claims were wrong.
 *
 *   · "Not a notification, not a promise of a reply. Just the status, visible."
 *     Notifications shipped — twenty-two event types with per-type preferences,
 *     plus job alerts at daily, weekly or instant. The page was underselling a
 *     live feature in order to avoid overselling a missing one, which is the
 *     right instinct pointed at a stale fact.
 *   · No employer reputation. Employer reviews shipped, behind a
 *     verified-application gate, with moderation and a right of reply.
 *
 * And two shipped dashboard panels were missing entirely: who has been looking
 * at your profile, and which skills would unlock more roles. They are the two
 * strongest reasons to build a profile here, so they are now the second section.
 */

import {
  candidateFeed, candidateViewComposition, candidateWorkspaceComposition,
  compositionNote, resumeComposition,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import {
  APPLICATION_STATUS, CANDIDATE_DASH, DIMENSIONS, RESUME,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/for-candidates/',
  title: 'See why you match — Transpahire for candidates',
  description:
    'Roles scored for you out of 100, with where you fit and where you don’t. What your résumé is missing, in specifics. Which skills would open more roles. Who has been looking at your profile. And where your application stands.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'For candidates',
    title: 'The recruiter sees <em>the same score you do.</em>',
    lede: 'Not a tier, not a badge, not a softened version. The same number and the same breakdown, on the same record — including the parts that count against you.',
  })}

<!-- ── Why you match ────────────────────────────────────────────────────── -->
<section class="section section--tight-top" data-content="provisional">
  <div class="container pair">
    <div data-reveal="left">
      <p class="eyebrow">Why you match</p>
      <h2 class="h-section mt-6">Where you fit, <em>and where you don&rsquo;t.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        Every role you are matched to is scored out of 100. Four things are weighted, and skill
        coverage is ${Math.round(DIMENSIONS[0].weight * 100)}% of it — so a role you have the
        skills for does not lose to a role you happen to live closer to. Salary alignment is not
        one of the four; it adjusts the total by up to a tenth, either way.
      </p>
      <p class="body-copy measure mt-6">
        A skill you do not list is not automatically a miss. If the platform knows a skill you
        do have leads to it, it says so — and it names which one, and quotes the line in your
        own profile it read it from.
      </p>
      <p class="body-copy measure mt-6">
        You see where your application stands — ${APPLICATION_STATUS.slice(0, 5).map((a) => a.label.toLowerCase()).join(', ')} —
        and you are told when it moves. You choose which of those are worth an email.
      </p>
    </div>
    <div data-reveal="right">
${candidateViewComposition()}
      ${compositionNote()}
    </div>
  </div>
</section>

<!-- ── Your dashboard ───────────────────────────────────────────────────── -->
<section class="section section--sunken" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Your dashboard',
  title: 'Who&rsquo;s looking, <em>and what would open more doors.</em>',
  lede: 'Two things a job board will not tell you: how many recruiters opened your profile this week, and which single skill would put you above the line on the most roles.',
})}
    <div data-reveal="rise">
${candidateWorkspaceComposition()}
      ${compositionNote('example figures')}
    </div>

    <div class="pair mt-16">
      <div data-reveal="left">
        <p class="body-copy body-copy--lg measure">
          The unlock counts are computed against roles you already score above 52 on, which is
          the difference between “learn Kubernetes” and “Kubernetes would put you over the line
          on ${RESUME.gaps[0].unlocks} roles you are otherwise close on”. One of those is advice.
        </p>
      </div>
      <div data-reveal="right">
        <p class="body-copy measure">
          There is also an application-velocity panel — how many you sent in
          ${CANDIDATE_DASH.velocity.days} days, and what fraction were shortlisted. It is a
          mirror, not a scoreboard, and if the number is bad the useful response is to change
          what you apply to rather than to apply to more.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── Your matches ─────────────────────────────────────────────────────── -->
<section class="section" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Your matches',
  title: 'Scored <em>before you apply.</em>',
  lede: 'Roles are matched to your profile and ranked the same way candidates are ranked for a recruiter — which means you find out whether it is worth the application before you write one.',
})}
    <div data-reveal="up">
${candidateFeed()}
    </div>

    <div class="grid grid--3 mt-16" data-reveal-group data-stagger="normal">
      <article class="card hover-lift">
        <h3 class="h-card card__title">Job alerts</h3>
        <p class="body-copy card__body">Save a search and get told when something matches it — ${CANDIDATE_DASH.alerts.frequencies.join(', ').toLowerCase()}. Your choice, per alert, and you can turn any of them off.</p>
        <p class="card__benefit">The search runs even when you are not looking.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Saved jobs</h3>
        <p class="body-copy card__body">Keep the ones you are thinking about, with your score on each still attached.</p>
        <p class="card__benefit">A shortlist of your own, for once.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Compare them</h3>
        <p class="body-copy card__body">Two or three roles side by side, with the score, the requirements and where you fall short on each. The comparison is the decision.</p>
        <p class="card__benefit">Not “which sounds better”. Which fits better.</p>
      </article>
    </div>
  </div>
</section>

<!-- ── Your résumé ──────────────────────────────────────────────────────── -->
<section class="section section--sunken" data-content="provisional">
  <div class="container pair pair--lead">
    <div data-reveal="left">
      <p class="eyebrow">Your résumé</p>
      <h2 class="h-section mt-6">You are told what is wrong with it. <em>In specifics.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        A quality score, and ${RESUME.suggestionCount} named things to change — “add measurable
        outcomes”, “reduce generic language” — rather than a grade with no instructions.
      </p>
      <p class="body-copy measure mt-6">
        Then the gaps: which skills would open more roles, roughly how many, and how much
        demand there is for each. It is the most useful thing a rejection can turn into.
      </p>
      <p class="body-copy measure mt-6">
        A gap in your history is recorded as a fact about a timeline, not as a mark against
        you. It is a thing a recruiter can ask about, which is better than a thing they quietly
        assume.
      </p>
    </div>
    <div data-reveal="right">
${resumeComposition({ parallax: false })}
    </div>
  </div>
</section>

<!-- ── Your data ────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
${head({
  eyebrow: 'Your profile, your terms',
  title: 'You decide <em>who can see you.</em>',
  lede: 'A profile is built from your own résumé, and nothing extracted from it is saved until you have reviewed it.',
})}
    <div class="grid grid--3" data-reveal-group data-stagger="normal">
      <article class="card hover-lift">
        <h3 class="h-card card__title">Review before save</h3>
        <p class="body-copy card__body">Everything the parser pulls out of your résumé is shown to you with a confidence indicator. You accept, edit or reject each item.</p>
        <p class="card__benefit">A profile you agreed to, not one assembled about you.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Three visibility levels</h3>
        <p class="body-copy card__body">Public, limited or private. It controls whether an organisation that did not source you can find you at all.</p>
        <p class="card__benefit">Searchable is a choice, and it is yours.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Export or delete</h3>
        <p class="body-copy card__body">Both are real routes in the product, not an address to write to. A request goes into a queue, gets reviewed, and gets done — and the completion is logged.</p>
        <p class="card__benefit">${arrowLink('What we hold, and what you can ask for', '/trust/#data-rights')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Preferences that count</h3>
        <p class="body-copy card__body">Salary, location, notice period and work style are fields on your profile, and they are scored into the match rather than guessed at.</p>
        <p class="card__benefit">What you want is part of the answer.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">A profile you did not make</h3>
        <p class="body-copy card__body">A recruiter can add you to their own pool from a list they already had. Until you claim it, that profile is marked unclaimed and is visible only inside their organisation. You can take it over, or opt out of it.</p>
        <p class="card__benefit">${arrowLink('The two consent bases', '/product/sourcing/#consent')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Review the employer</h3>
        <p class="body-copy card__body">If you actually applied, you can review the company. One review per role, anonymous, moderated — and they get one public reply and no delete button.</p>
        <p class="card__benefit">The transparency runs both ways or it is just a dashboard.</p>
      </article>
    </div>
  </div>
</section>

${pageCta({
  title: 'Find out <em>why you match.</em>',
  lede: 'Build a profile from your résumé, see the roles you score against, and read the reasoning behind each one.',
  primary: 'Create a profile',
  primaryHref: 'https://app.transpahire.com/',
})}`;
}
