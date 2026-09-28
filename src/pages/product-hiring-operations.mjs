/**
 * product-hiring-operations.mjs — /product/hiring-operations
 *
 * NEW IN PHASE 4, and it fixes a real defect rather than filling a gap: pillar
 * 06 on /product pointed at /for-teams, which is an AUDIENCE page. A visitor
 * clicking "the full workflow" from a capability list expected the capability
 * and got a pitch.
 *
 * Everything here is shipped and named in `docs/phase-4.md` §§ 1.3, 1.8 and
 * 1.11. Two things it deliberately does not do:
 *
 *   · It does not draw a calendar. Interviews carry a scheduled time and a
 *     meeting link and the product notifies on both, and calendar sync is live
 *     (maintainer, 28 Sep 2026) — but its interface is undescribed, so it is
 *     named in a card and not drawn. Name it, do not draw it (`CLAUDE.md` § 7).
 *   · It does not compete on workflow depth. The product positions itself as
 *     lighter than an enterprise ATS, so arguing depth would argue against its
 *     own positioning. Sufficiency, never superiority.
 */

import {
  candidatesComposition, compositionNote, jobPulseComposition, pipelineComposition,
  requisitionComposition,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import {
  APPLICATION_STATUS, CANDIDATES_LIST, JOB_LIFECYCLE, ORG_ROLES, ORIGINS, STAGES,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/product/hiring-operations/',
  title: 'Hiring operations — Transpahire',
  description:
    'The job lifecycle with version history, stages you name and order, screener questions, interviews with times and links, structured feedback, and an audit trail on all of it.',
};

export function render() {
  return `${pageHead({
    crumb: 'Product',
    crumbHref: '/product/',
    eyebrow: 'Hiring operations',
    title: 'Move the right people <em>forward.</em>',
    lede: 'Enough to run the hire without leaving the platform, and no more than that. Transpahire is lighter than an enterprise applicant-tracking system on purpose; this page is about sufficiency, not depth.',
  })}

<!-- ── The job ──────────────────────────────────────────────────────────── -->
<section class="section section--tight-top" data-content="provisional">
  <div class="container pair">
    <div data-reveal="left">
      <p class="eyebrow">The job</p>
      <h2 class="h-section mt-6">A requisition <em>with a history.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        A job moves through ${JOB_LIFECYCLE.length} states —
        ${JOB_LIFECYCLE.join(' → ')} — and every move is recorded with who made it
        and when. The job itself is versioned, so “what did this ask for when she applied?” is
        a question with an answer.
      </p>
      <p class="body-copy measure mt-6">
        Upload a job description and the skills come out tiered: critical, required, preferred,
        bonus. The tiers are not decoration — they are what the whole ranking is measured
        against, and the critical tier is what the gate enforces.
      </p>
      <p class="body-copy measure mt-6">
        Salary visibility, the assigned team and the approval route are set on the requisition
        rather than agreed in a thread.
      </p>

      <!-- PHASE 5 · § 3.10. The second paragraph the hero earned, and it is the
           product's own reasoning about its own signature visual (§ 2.2) rather
           than a marketing sentence about it. This page is the right home: the
           pulse strip is a hiring-operations instrument, not a matching one. -->
      <p class="body-copy body-copy--lg measure mt-8">
        Applicants is a number that only goes up.
      </p>
      <p class="body-copy measure mt-6">
        A job with two hundred applicants and nobody in play looks healthy right until you read
        the second tile, so the one we make big is the one that can go down. The four figures at
        the top of a job are applicants, in pipeline, interviewing and offer out — and
        <strong>in pipeline</strong> is the featured one, every time, on every job. It is the
        only one of the four that answers &ldquo;is this requisition actually moving?&rdquo;
      </p>
      <p class="mt-8">${arrowLink('How the tiers become a score', '/product/matching/#the-working')}</p>
    </div>
    <div data-reveal="right">
${requisitionComposition()}
      ${compositionNote()}
    </div>
  </div>
</section>

<!-- ── The job's four figures ───────────────────────────────────────────── -->
<!-- PHASE 5 · § 3.9. jobHeader()'s second home, and the pulse strip's proper
     one: at full container width the strip's argument is legible in a way it
     cannot be inside the homepage hero's 800px frame. -->
<section class="section section--tight" data-content="provisional">
  <div class="container" data-reveal="up">
${jobPulseComposition()}
    ${compositionNote()}
  </div>
</section>

<!-- ── The pipeline ─────────────────────────────────────────────────────── -->
<section class="section section--sunken" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'The pipeline',
  title: 'Your stages, <em>your names, your order.</em>',
  lede: CANDIDATES_LIST.subtitle,
})}
    <div data-reveal="rise">
${candidatesComposition()}
      ${compositionNote()}
    </div>

    <div class="mt-16" data-reveal="up">
${pipelineComposition()}
    </div>

    <div class="pair mt-16">
      <div data-reveal="left">
        <div class="prose">
          <h3>Where somebody came from is not a verdict on them</h3>
          <p>
            A candidate arrives one of three ways — ${Object.values(ORIGINS).map((o) => `<em>${o.toLowerCase()}</em>`).join(', ')} —
            and the origin is shown in a muted tone, never a loud one. Somebody you sourced who
            then applied is a stronger signal than either half, which is why it is its own
            state and not an overwrite.
          </p>
          <h3>And nor is the last stage</h3>
          <p>
            The final stage is called <strong>${STAGES.REJECTED.label}</strong>, and it is
            rendered in the same neutral tone as “sourced” and “reviewed” — not in red. A
            candidate who was not right for one role is not a failure state, and colouring the
            stage like an error teaches a recruiter the opposite. It is the smallest decision on
            this page and the one we would defend hardest.
          </p>
        </div>
      </div>
      <div data-reveal="right">
        <p class="label" style="margin-bottom:var(--sp-4)">The stages, and their tones</p>
        <ul class="statuses statuses--pills">
${Object.entries(STAGES).map(([, st]) => `          <li class="status">
            <span class="pill pill--${st.tone} pill--stage">${st.label}</span>
          </li>`).join('\n')}
        </ul>
        <p class="body-copy measure mt-8">
          Rename them, reorder them, add your own. These are the defaults, not the vocabulary.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── Screening and interviews ─────────────────────────────────────────── -->
<section class="section">
  <div class="container">
${head({
  eyebrow: 'Screening and interviews',
  title: 'Ask the question <em>once, on the application.</em>',
})}
    <div class="grid grid--3" data-reveal-group data-stagger="normal">
      <article class="card hover-lift">
        <h3 class="h-card card__title">Screener questions</h3>
        <p class="body-copy card__body">Free text, yes/no, or multiple choice, attached to the job. The answers arrive with the application instead of in a first call.</p>
        <p class="card__benefit">Three questions save the twenty-minute version of them.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Interviews</h3>
        <p class="body-copy card__body">A time, a duration, a meeting link and a status, recorded on the application. Both sides are notified when one is scheduled, and when one is cancelled.</p>
        <p class="card__benefit">The record of the conversation outlives the conversation.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Structured feedback</h3>
        <p class="body-copy card__body">Written against the interview, public to the team or private to the interviewer. Private means private; it is not a delayed reveal.</p>
        <p class="card__benefit">An honest note is worth more than a consensus one.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">The team</h3>
        <p class="body-copy card__body">${ORG_ROLES.length} roles — ${ORG_ROLES.join(', ')} — assigned per job. A hiring manager does not need a seat in the sourcing tool.</p>
        <p class="card__benefit">${arrowLink('Who can see what', '/trust/#access')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">What the candidate sees</h3>
        <p class="body-copy card__body">${APPLICATION_STATUS.map((a) => a.label).join(' · ')} — and they are told when it moves. They choose which of those are worth an email.</p>
        <p class="card__benefit">Status, visible, instead of silence.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Calendar sync</h3>
        <p class="body-copy card__body">An interview scheduled here syncs to your calendar, so a time set on the application does not have to be copied across by hand.</p>
        <p class="card__benefit">Set it once, where the application is.</p>
      </article>
    </div>
  </div>
</section>

<!-- ── The trail ────────────────────────────────────────────────────────── -->
<section class="section section--sunken">
  <div class="container container--text">
${head({
  eyebrow: 'The trail',
  title: 'And all of it <em>is on the record.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        Every mutation carries an actor and a timestamp: a stage moved, a requirement retiered,
        a search exported, a score recomputed. Three weeks later, the reasoning has outlived
        the decision — which is the one thing the process this replaces could never manage.
      </p>
      <p>
        ${arrowLink('What gets logged, in detail', '/trust/#logged')}
      </p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Run one requisition <em>end to end.</em>',
  lede: 'Bring a role and we will take it from a job description to a scored, staged pipeline in half an hour.',
  secondary: 'The whole platform',
  secondaryHref: '/product/',
})}`;
}
