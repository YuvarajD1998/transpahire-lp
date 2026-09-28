/**
 * demo.mjs — /demo
 *
 * The single conversion destination on the site. Every CTA on every page arrives
 * here, and nothing else does.
 *
 * NOT a self-serve trial signup, deliberately. The product proves itself against
 * a real requisition and a real pool; a trial that opens on zero candidates
 * teaches the visitor the opposite of the pitch. There is also nothing to
 * self-serve into — subscription and billing are described as infrastructure
 * waiting to be activated.
 *
 * `[CONFIRM]` — THE ONE OUTSTANDING ITEM IN WORK STREAM A, and it is the item
 * `docs/phase-4.md` § 9 marks as blocking everything: a destination for this
 * form, and a named person who reads it. Twenty-three calls to action across
 * fourteen pages terminate here.
 *
 * The form still carries no action and no method, by the maintainer's decision
 * of 31 Aug 2026, and that decision is defensible: a form that opens a mail
 * client addressed to an inbox nobody watches is not better than one that says
 * it is not wired. What HAS changed is the note underneath it, which used to
 * apologise and now states plainly what is missing and what to do instead. An
 * apology tells a visitor the company is not ready; an alternative route tells
 * them how to reach it.
 *
 * What to do when the destination exists, in order:
 *   1. `method="POST" action="…"` on the <form>, and drop `novalidate`.
 *   2. Replace the note with the commitment — "goes to one inbox, read by one
 *      person, you will hear back inside two working days" — but only if it is
 *      true. If it is not, say what is.
 *   3. Delete this paragraph.
 *
 * PHASE 5 STOPPED THIS BEING THE ONLY DOOR — `docs/phase-5.md` § 4.4. The page
 * is unchanged as the high-intent destination and it should stay the loud one.
 * What changed is that it no longer pretends to be the only step: the block above
 * the form offers the same four checks on the same job description with no
 * account and no call, which is the offer for the roughly-everybody who is
 * interested and not ready. Putting it ABOVE the form rather than below is the
 * whole point — below it, only the people who already scrolled past a
 * thirty-minute commitment would ever read it.
 *
 * PHASE 4 ADDED THE JD FIELD. The product has job-description upload and tier
 * extraction; a demo request that arrives with a JD attached is a demo that has
 * already started. It is the highest-value field on the form and it was not on
 * it.
 */

import { arrowLink, head, pageHead } from '../lib/page.mjs';

export const meta = {
  path: '/demo/',
  title: 'Book a demo — Transpahire',
  description:
    'Bring a role you are struggling to fill. Thirty minutes: we run one of your open requisitions through the engine and you read the reasoning yourself.',
};

const WHAT_YOU_SEE = [
  'Your requisition, with its skills tiered by importance the way the engine reads them — and the optimizer&rsquo;s view of which requirements are narrowing your pool.',
  'Your pool scored against it out of 100, ordered, with the classification for each — and the candidates the critical gate dropped, with the requirement that dropped them.',
  'One candidate opened: every requirement matched to a phrase in their own profile, the section it came from, and the four signals.',
  'A requirement moved, and the list re-ranking against it.',
  'A relaxed requirement simulated, before anything is changed on the job.',
  'A sourcing mission started on the role, so it keeps looking after the call ends.',
  'The same record as the candidate sees it.',
];

export function render() {
  return `${pageHead({
    eyebrow: 'Book a demo',
    title: 'Bring a role <em>you&rsquo;re struggling to fill.</em>',
    lede: 'The engine is not interesting on a clean example. It is interesting on the requisition that has been open for nine weeks, so bring that one.',
  })}

<section class="section section--tight-top">
  <div class="container demo-layout">

    <div data-reveal="up">
      <!-- PHASE 5 · § 4.4. The lower step, above the form. -->
      <div class="lowstep" data-reveal="up">
        <p class="lowstep__title">Not ready for a call?</p>
        <p class="lowstep__body">
          Run a job description through the same four checks the product runs — the tiered
          skills, the shape findings, the language flags, and the skills the parser could not
          place. No account, and nothing kept.
        </p>
        <p class="lowstep__link">${arrowLink('Check a job description', '/check/job-description/')}</p>
      </div>

      <h2 class="h-sub mt-12">Tell us about the role</h2>

      <!-- No action and no method: see the module header, and content requirement R15. -->
      <form class="form mt-8" novalidate>
        <div class="field">
          <label class="field__label" for="demo-name">Your name</label>
          <input class="field__control" type="text" id="demo-name" name="name" autocomplete="name">
        </div>

        <div class="field">
          <label class="field__label" for="demo-email">Work email</label>
          <input class="field__control" type="email" id="demo-email" name="email" autocomplete="email">
        </div>

        <div class="field">
          <label class="field__label" for="demo-company">Company</label>
          <input class="field__control" type="text" id="demo-company" name="company" autocomplete="organization">
        </div>

        <div class="field">
          <label class="field__label" for="demo-volume">Roles you hire for in a year</label>
          <select class="field__control" id="demo-volume" name="volume">
            <option value="">Select</option>
            <option value="under-50">Fewer than 50</option>
            <option value="50-150">50 to 150</option>
            <option value="150-500">150 to 500</option>
            <option value="over-500">More than 500</option>
          </select>
          <p class="field__hint">Transpahire is built for teams hiring 50 to 500 a year. If you are outside that, say so and we will tell you honestly whether it fits.</p>
        </div>

        <div class="field">
          <label class="field__label" for="demo-role">The role you want to bring</label>
          <textarea class="field__control" id="demo-role" name="role"></textarea>
          <p class="field__hint">A title and the skills that matter is enough. The harder the requisition, the more useful the half-hour.</p>
        </div>

        <!-- The highest-value field on the form. The product parses a job
             description into tiered skills, so a request that arrives with one
             attached is a demo that has already started. -->
        <div class="field">
          <label class="field__label" for="demo-jd">Or attach the job description</label>
          <input class="field__control field__control--file" type="file" id="demo-jd" name="jd"
                 accept=".pdf,.doc,.docx,.txt,.md">
          <p class="field__hint">Optional, and it saves the most time of anything on this form: we run it through the extractor before the call and start from your tiers rather than from a blank job.</p>
        </div>

        <div>
          <button class="btn btn--primary hover-icon press" type="submit">
            Request a demo
            <svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
          </button>
        </div>

        <!-- Rewritten in Phase 4: what is missing, and the route that works
             instead. 28 Sep 2026: /about no longer publishes an address, so
             there is no second route to name — the note says only what is
             missing. See the module header for the three steps to wire it. -->
        <p class="form__note" data-content="placeholder">
          <strong>This form has no destination yet.</strong>
          Until a single inbox and a named person behind it are settled, a form that appeared
          to submit would be worse than one that says so.
        </p>
      </form>
    </div>

    <div data-reveal="up">
      <div class="card">
        <h2 class="h-sub">What you will actually see</h2>
        <ul class="checklist mt-6">
${WHAT_YOU_SEE.map((line) => `          <li class="checklist__item">${line}</li>`).join('\n')}
        </ul>
        <p class="card__benefit mt-8">Thirty minutes, on your requisition, with the reasoning visible.</p>
      </div>

      <div class="card card--sunken mt-6">
        <h3 class="h-card">Why there is no free trial</h3>
        <p class="body-copy card__body mt-4">
          The product shows what it can do against a real role and a real pool. Opened cold on
          an empty database it demonstrates the opposite of the argument, so we would rather
          spend half an hour than waste a week of yours.
        </p>
      </div>
    </div>

  </div>
</section>

<section class="section section--sunken">
  <div class="container">
${head({
  eyebrow: 'Before you book',
  title: 'Two things <em>worth knowing.</em>',
  center: true,
})}
    <div class="grid grid--2 mx-auto" style="max-width:820px" data-reveal-group data-stagger="normal">
      <article class="card">
        <h3 class="h-card card__title">You are probably wondering about price</h3>
        <p class="body-copy">
          The honest answer is that billing is not switched on, so there is nothing to quote
          and nothing to sign. What is being decided — per seat or per requisition, and what a
          design-partner arrangement involves — is written down on
          <a class="link" href="/pricing/">the pricing page</a> rather than saved for the
          call.
        </p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">Looking for a role?</h3>
        <p class="body-copy">This page is for hiring teams. If you are job hunting, the candidate side of Transpahire is a different product and it is <a class="link" href="/for-candidates/">over here</a>.</p>
      </article>
    </div>
  </div>
</section>`;
}
