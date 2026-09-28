/**
 * check-resume.mjs — /check/resume
 *
 * NEW IN PHASE 5, work stream B, `docs/phase-5.md` § 4.2. The candidate-side
 * twin of /check/job-description, and it exists for a reason that is about the business
 * rather than about generosity:
 *
 *     A matching engine with no candidates is a demo, and /demo says so in its
 *     own copy.
 *
 * The site had exactly one candidate-facing page before this, and that page
 * asked for a signup while offering nothing first. This offers the thing first.
 * No signup to see the result; the signup is what keeps it.
 *
 * WHAT IT RETURNS is `RESUME` in the data module — the quality score, the named
 * suggestions, and the skills that would open more roles. Nothing new is claimed
 * here and no second copy of those numbers exists: `resumeAndGaps()` on
 * /for-candidates reads the same export, so the two pages cannot disagree.
 *
 * THE UNLOCK COUNTS ARE LABELLED EXAMPLES, and that is a rule rather than a
 * caution — `product-demo.js` rule 5 and `CLAUDE.md` § 7. "+8 roles" is an
 * analytics figure and it carries a visible example label everywhere it appears.
 *
 * `[CONFIRM]` — the endpoint, same decision as /check/job-description. See `toolGate()`
 * in src/lib/page.mjs, and `docs/phase-5.md` § 9.
 *
 * ONE ADDITION TO THE HONESTY REQUIREMENTS, from § 4.2 and it belongs on the
 * page rather than only in the policy: the file is processed and not retained
 * unless the visitor creates a profile. A résumé is a more personal document than
 * a job description and the sentence about it should not require opening a legal
 * page.
 */

import { arrowLink, head, pageCta, pageHead, toolGate, toolPrivacy } from '../lib/page.mjs';
import { compositionNote, resumeAndGaps } from '../lib/compositions.mjs';
import { RESUME, RESUME_CHECK, SKILL_REVIEW } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/check/resume/',
  title: 'Check a résumé — Transpahire',
  description:
    'Paste or upload a résumé and see the quality score, the specific suggestions behind it, and the skills that would open more roles. No account to see the result, and no list of jobs you would supposedly get.',
};

export function render() {
  return `${pageHead({
    crumb: 'Tools',
    crumbHref: '/check/job-description/',
    eyebrow: 'Check a résumé',
    title: 'See your profile <em>as a job reads it.</em>',
    lede: 'The same parser that reads a job description reads a résumé, and it scores the document rather than the person. You get the score, the suggestions behind it, and the skills that would open the most additional roles. No account to see it.',
  })}

<section class="section section--tight-top">
  <div class="container demo-layout">

    <div data-reveal="up">
      <h2 class="h-sub">Paste it in</h2>

      <!-- No action and no method: see toolGate() in src/lib/page.mjs. -->
      <form class="form mt-8" novalidate>
        <div class="field">
          <label class="field__label" for="cv-file">Upload the file</label>
          <input class="field__control field__control--file" type="file" id="cv-file" name="file"
                 accept=".pdf,.doc,.docx,.txt,.md">
          <p class="field__hint">PDF, Word or plain text. The parser reads structure, so the version you actually send to employers is the one worth checking.</p>
        </div>

        <div class="field">
          <label class="field__label" for="cv-text">Or paste the text</label>
          <textarea class="field__control field__control--tall" id="cv-text" name="resume"></textarea>
        </div>

        <div>
          <button class="btn btn--primary hover-icon press" type="submit">
            Check it
            <svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
          </button>
        </div>

${toolGate({
  what: 'This check',
  instead: '/for-candidates/',
  insteadLabel: 'read what the candidate side does',
})}
      </form>
    </div>

    <div data-reveal="up">
      <!-- The refusal, beside the input for the same reason it is on the JD page:
           these three are what a CV-scoring tool normally invents, and naming
           them is worth more than another paragraph about accuracy. -->
      <div class="card card--sunken">
        <h2 class="h-sub">What it will not tell you</h2>
        <p class="body-copy mt-4">Three things a tool like this usually claims, and will not here:</p>
        <ul class="checklist checklist--refused mt-6">
${RESUME_CHECK.refuses.map((r) => `          <li class="checklist__item">${r}</li>`).join('\n')}
        </ul>
        <p class="card__benefit mt-6">
          A percentile would need a population to compare you against, and telling you what you
          could earn would be a guess dressed as data. The score is about the document — how much
          of it a job can actually read — which is the part you can change this afternoon.
        </p>
      </div>

      <div class="card mt-6">
        <h3 class="h-card">It scores the document, not you</h3>
        <p class="body-copy card__body mt-4">
          A quality score of ${RESUME.quality} does not mean the person is a ${RESUME.quality}. It
          means the file is leaving evidence on the floor — ${RESUME.suggestions.join(' and ')} are
          the two that move it most. That distinction is the whole reason the number is publishable.
        </p>
      </div>
    </div>

  </div>
</section>

<section class="section section--sunken">
  <div class="container">
${head({
  eyebrow: 'What comes back',
  title: 'Four things, <em>and one of them is a list of gaps.</em>',
  lede: 'The gaps are the useful part. A score tells you where you are; the gaps tell you what to do on Saturday.',
})}
    <div class="grid grid--2 mx-auto" style="max-width:900px" data-reveal-group data-stagger="normal">
${RESUME_CHECK.returns.map((r, i) => `      <article class="card">
        <span class="step__num">0${i + 1}</span>
        <p class="body-copy card__body">${r.charAt(0).toUpperCase()}${r.slice(1)}.</p>
      </article>`).join('\n')}
    </div>

    <div class="prose mt-16" data-reveal="up">
      <p>
        The fourth one is the same escalation the hiring side gets. When the parser meets a skill
        it cannot place in the taxonomy it does not guess and it does not drop it: it says so, and
        a person decides — ${SKILL_REVIEW.actions.join(', ').toLowerCase()}. On your side that
        matters because a skill silently discarded is a role you never appear for.
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
${head({
  eyebrow: 'For example',
  title: 'This is the shape of <em>what you get back.</em>',
  lede: 'The résumé below is the demo one used across this site, not yours. The unlock counts are labelled examples, on this page and on every other page that shows one.',
})}
    <div data-reveal="up">
${resumeAndGaps()}
      ${compositionNote()}
    </div>

    <div class="prose mt-16" data-reveal="up">
${toolPrivacy({
  retained: 'The file is processed, the report comes back to you, and it is not retained unless you create a profile — which this page does not ask you to do.',
})}
      <p>
        If you do create one, the same score and the same reasoning are what a recruiter sees on
        their side of the platform. That symmetry is the point of the candidate product:
        ${arrowLink('the same score the recruiter sees', '/for-candidates/')}.
      </p>
    </div>
  </div>
</section>

${pageCta({
  title: 'The score the recruiter sees, <em>is the score you see.</em>',
  lede: 'Not a candidate-facing summary of a private number. The same figure, the same reasoning, the same evidence.',
  primary: 'What candidates get',
  primaryHref: '/for-candidates/',
  secondary: 'Check a job description',
  secondaryHref: '/check/job-description/',
})}`;
}
