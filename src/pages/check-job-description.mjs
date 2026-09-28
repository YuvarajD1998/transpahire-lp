/**
 * check-job-description.mjs — /check/job-description
 *
 * NEW IN PHASE 5, work stream B, `docs/phase-5.md` § 4.1, and it is the single
 * best qualified-lead generator available to this site — because it is the
 * product doing its actual job on the visitor's own data in about twenty
 * seconds, with no account and no call.
 *
 * WHY IT MATTERS MORE THAN ANOTHER PRODUCT PAGE. Before Phase 5 the site had
 * twenty-one pages and exactly one action: a thirty-minute call with a stranger,
 * bring your hardest open requisition. That is a good offer for somebody already
 * convinced and no offer at all for anybody else. This is the low step, and the
 * step is not a lead-magnet PDF — it is the software.
 *
 * FOUR SHIPPED SERVICES, no more:
 *   1. tier extraction — the four importance tiers, `docs/phase-4.md` § 1.9
 *   2. the JD optimizer's shape findings — § 1.9's Tuning view
 *   3. structural fairness — the language flags, § 1.6
 *   4. the unmapped-skill escalation — `docs/phase-5.md` § 2.8
 *
 * THE REFUSAL IS THE MOST IMPORTANT SECTION ON THE PAGE. `docs/phase-5.md`
 * § 4.1 is explicit: no pool size, no candidate count, no score distribution, no
 * figure implying a database of candidates matching the visitor's role. Any of
 * those would be the one invention this site has avoided from the beginning, and
 * they are the four numbers a visitor most wants — which is exactly why the page
 * names them as things it will not say rather than quietly omitting them.
 *
 * `[CONFIRM]` — the endpoint. See `toolGate()` in src/lib/page.mjs for the four
 * steps to switch this on, and `docs/phase-5.md` § 9 for the decision itself.
 * The page ships with the gap visible because the alternative is a fabricated
 * report or no page, and both are worse.
 */

import { arrowLink, head, pageCta, pageHead, toolGate, toolPrivacy } from '../lib/page.mjs';
import { compositionNote, frame, structuralFairness } from '../lib/compositions.mjs';
import {
  FAIRNESS, IMPORTANCE_TONES, JOB, OPTIMIZER, SKILL_REVIEW,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/check/job-description/',
  title: 'Check a job description — Transpahire',
  description:
    'Paste a job description and get the tiered skills, the shape findings, the language flags and the skills the parser could not place — from the same services the product runs. No account, and no pool size, because we will not invent one.',
};

/* The four things it returns. Each one names the service, and each one is a
   capability `docs/phase-4.md` § 1.3 lists as shipped. */
const RETURNS = [
  {
    n: '01',
    title: 'Your skills, in the four tiers',
    body: `Every skill the parser reads out of the description, sorted into critical, required, preferred and bonus — the tiers the engine actually scores against, in the product's own tones. This is the part most people have never seen: a job description is a weighting, and yours already is one whether it was written that way or not.`,
  },
  {
    n: '02',
    title: 'What the shape of the requisition costs you',
    body: `The optimizer's findings. A critical skill is a hard gate applied before scoring, so each one is a pool you never see — and the panel names it rather than leaving you to wonder why the list is short.`,
  },
  {
    n: '03',
    title: 'The language that is narrowing the pool',
    body: `The structural fairness check reads the requirements themselves. It uses and holds no demographic data. It will tell you that the word <em>rockstar</em> is in your description, and what that word does to who applies.`,
  },
  {
    n: '04',
    title: 'The skills it could not place',
    body: `When the parser meets a skill it cannot map to the taxonomy it does not guess and it does not drop it. You get the list, the mapping it suspects, and the three choices a person makes in the product: use the suggested mapping, keep it as new, or discard it.`,
  },
];

/**
 * An illustrative extraction, from the demo requisition — the site's own JOB, at
 * the site's own tiers, so this page cannot disagree with the other six that
 * show them. Labelled illustrative, like every composition on the site.
 */
function tierExample() {
  const tiers = JOB.tiers.map((t) => `      <div class="tiers__row">
        <span class="pill pill--${IMPORTANCE_TONES[t.key]}">${t.label}</span>
        <span class="tiers__chips">
${t.skills.map((skill) => `          <span class="chip">${skill}</span>`).join('\n')}
        </span>
      </div>`).join('\n');

  return frame({
    ratio: '16 / 9',
    modifier: 'frame--elevated',
    meta: `${JOB.route} / description`,
    body: `  <div class="tiers">
    <p class="panel__rule">Extracted skills, by importance</p>
${tiers}

    <p class="panel__rule mt-6">Needs a person</p>
    <div class="tiers__review">
      <span class="jobhead__review">
        <svg width="12" height="12" aria-hidden="true" focusable="false"><use href="#i-alert"/></svg>
        ${SKILL_REVIEW.label(SKILL_REVIEW.count)}
      </span>
      <span class="tiers__actions">${SKILL_REVIEW.actions.join(' · ')}</span>
    </div>
  </div>`,
  });
}

export function render() {
  return `${pageHead({
    crumb: 'Tools',
    crumbHref: '/check/job-description/',
    eyebrow: 'Check a job description',
    title: 'Run a job description <em>through the real thing.</em>',
    lede: 'Paste the requisition that has been open for nine weeks. You get the tiered skills, the shape findings, the language flags and the skills the parser could not place — from the services the product runs, not a lighter version of them.',
  })}

<section class="section section--tight-top">
  <div class="container demo-layout">

    <div data-reveal="up">
      <h2 class="h-sub">Paste it in</h2>

      <!-- No action and no method: see toolGate() in src/lib/page.mjs. -->
      <form class="form mt-8" novalidate>
        <div class="field">
          <label class="field__label" for="jd-text">The job description</label>
          <textarea class="field__control field__control--tall" id="jd-text" name="jd"></textarea>
          <p class="field__hint">The whole posting, formatting and all. The parser reads structure, so pasting only the bullet list gives it less to work with than the real thing.</p>
        </div>

        <div class="field">
          <label class="field__label" for="jd-file">Or upload it</label>
          <input class="field__control field__control--file" type="file" id="jd-file" name="file"
                 accept=".pdf,.doc,.docx,.txt,.md">
        </div>

        <div>
          <button class="btn btn--primary hover-icon press" type="submit">
            Check it
            <svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
          </button>
        </div>

${toolGate({ what: 'This check' })}
      </form>
    </div>

    <div data-reveal="up">
      <!-- THE REFUSAL, and it is deliberately beside the form rather than at the
           bottom of the page. The four figures below are the four a visitor most
           wants from a tool like this, and every competitor invents them. Saying
           so next to the input is the strongest thing on the page. -->
      <div class="card card--sunken">
        <h2 class="h-sub">What it will not tell you</h2>
        <p class="body-copy mt-4">Four numbers you would get from something else, and will not get here:</p>
        <ul class="checklist checklist--refused mt-6">
${OPTIMIZER.refuses.map((r) => `          <li class="checklist__item">${r}</li>`).join('\n')}
        </ul>
        <p class="card__benefit mt-6">
          All four would imply we hold a pool of candidates matched to your role. We do not, for
          your role, today — and a number invented to look qualified is a commitment made by a
          marketing page. What you get back is what the services actually computed about the
          document you pasted.
        </p>
      </div>

      <div class="card mt-6">
        <h3 class="h-card">Twenty seconds, and it is your own text</h3>
        <p class="body-copy card__body mt-4">
          Nothing on this page is a demo dataset. The tiers are read out of your description, the
          flagged words are your words, and the skills it could not place are yours — which is
          also why it is more useful than any screenshot we could show you.
        </p>
      </div>
    </div>

  </div>
</section>

<section class="section section--sunken">
  <div class="container">
${head({
  eyebrow: 'What comes back',
  title: 'Four things, <em>all of them shipped.</em>',
  lede: 'Not a preview of a roadmap. Every one of these runs inside the product today, against every requisition that goes through it.',
})}
    <div class="grid grid--2" data-reveal-group data-stagger="normal">
${RETURNS.map((r) => `      <article class="card">
        <span class="step__num">${r.n}</span>
        <h3 class="h-card card__title">${r.title}</h3>
        <p class="body-copy card__body mt-4">${r.body}</p>
      </article>`).join('\n')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
${head({
  eyebrow: 'For example',
  title: 'This is the shape of <em>what you get back.</em>',
  lede: 'The requisition below is the demo one used across this site, not yours — so the numbers agree with every other page. Yours would carry your skills and your flags.',
})}
    <div class="split split--lead" data-reveal="up">
      <div>
${tierExample()}
        ${compositionNote()}
      </div>
      <div>
${frame({
  ratio: '4 / 3',
  modifier: 'frame--elevated',
  meta: `${JOB.route} / insights / fairness`,
  body: structuralFairness(),
})}
      </div>
    </div>

    <div class="grid grid--3 mt-16" data-reveal-group data-stagger="normal">
${OPTIMIZER.findings.map((f) => `      <article class="card card--dashed">
        <span class="badge badge--warn">Finding</span>
        <h3 class="h-card card__title mt-4">${f.label}</h3>
        <p class="body-copy card__body mt-4">${f.note}</p>
      </article>`).join('\n')}
    </div>

    <div class="prose mt-16" data-reveal="up">
${toolPrivacy({
  retained: 'The document is processed and the report is returned to you. It is not retained beyond that unless you ask us to keep it, and there is no box pre-ticked to make you.',
})}
      <p>
        The language check has ${FAIRNESS.flags.length} terms it looks for and it looks at the
        requirements themselves — ${FAIRNESS.line.split('.')[1].trim()}. It gives a rating of
        ${FAIRNESS.ratings.join(', ').toLowerCase()}, which is a statement about the text, not
        about the outcome of your hiring.
      </p>
      <p>${arrowLink('How matching works, in full', '/product/matching/')}</p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Or bring it <em>to the half-hour.</em>',
  lede: 'The same four checks, on the same requisition, with your pool scored against it and somebody to argue with about the result.',
  secondary: 'Check a résumé instead',
  secondaryHref: '/check/resume/',
})}`;
}
