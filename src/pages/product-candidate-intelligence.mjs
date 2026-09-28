/**
 * product-candidate-intelligence.mjs — /product/candidate-intelligence
 *
 * SHOULD HAVE. Purpose: what the platform knows about a person and how it got
 * there. This is the answer to *"where does your data come from?"*, which is the
 * second question every evaluator asks after *"how does the score work?"*.
 *
 * Custom UI: none. The profile at full complexity is a screenshot request
 * (`10 § R8`), not a composition — rebuilding a dense profile screen in HTML is
 * exactly the case where a mockup starts inventing UI. Filled 28 Sep 2026 with
 * the running app's review dialog, cropped to the dialog: the full capture was
 * 1858px wide, which in this half-width column is text nobody can read, and the
 * dimmed profile behind the dialog carried a name and a photograph.
 *
 * The most marketable thing on this page is the per-item confidence and the
 * candidate's own accept/reject/edit review, because it is unusually honest for
 * a résumé parser and nobody markets it.
 */

import { compositionNote, resumeComposition, screenshotSlot, signalsCluster } from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import { SIGNALS } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/product/candidate-intelligence/',
  title: 'Candidate intelligence — Transpahire',
  description:
    'How a résumé becomes a structured profile: AI extraction with per-item confidence, the candidate&rsquo;s own review before anything is saved, and the signals a document will not give you.',
};

export function render() {
  return `${pageHead({
    crumb: 'Product',
    crumbHref: '/product/',
    eyebrow: 'Candidate intelligence',
    title: 'A profile, <em>not a document.</em>',
    lede: 'Where the data comes from, what happens to it, and which of it the candidate agreed to. This is the page for the question that follows “how does the score work?”.',
  })}

<section class="section section--tight-top">
  <div class="container">
${head({
  eyebrow: 'Extraction',
  title: 'The parser <em>shows its confidence.</em>',
  lede: 'A résumé goes in and skills, work history, education, certifications and projects come out as structured fields — each with a confidence indicator, and each shown to the candidate to accept, reject or edit before it is saved.',
})}
    <div class="pair">
      <div data-reveal="left">
        <ul class="checklist checklist--ruled">
          <li class="checklist__item">Skills, with proficiency and years for each — not a list of nouns.</li>
          <li class="checklist__item">Work history, education, certifications, projects and links.</li>
          <li class="checklist__item">Per-item confidence, so a low-confidence guess is visible as one.</li>
          <li class="checklist__item">The candidate reviews every extracted field before it is stored.</li>
          <li class="checklist__item">Preferences the recruiter cannot infer: salary, location, notice period, work style.</li>
        </ul>

        <!-- PHASE 5 · § 3.10. The paragraph the hero earned. The escalation is
             the most on-brand thing in the product and it was nowhere on the
             site — and this page is where it belongs, because this page's whole
             subject is what the parser does with a document it is not sure
             about. § 2.8. -->
        <p class="body-copy body-copy--lg measure mt-8">
          And when the parser meets a skill it cannot place in the taxonomy, it does not guess
          and it does not drop it.
        </p>
        <p class="body-copy measure mt-6">
          The job carries an amber flag until a person decides: map it to the skill we think it
          is, keep it as a new one, or discard it. Each decision applies immediately. Three of
          the skills on the requisition in this site&rsquo;s own examples are waiting on that
          call — which is why the flag is on the first screen of the homepage rather than
          hidden in a settings tab. A parser that quietly discards what it does not recognise
          is a parser you cannot audit.
        </p>
      </div>
      <div data-reveal="right">
${screenshotSlot({
  meta: 'app.transpahire.com / profile / review',
  image: {
    src: '/assets/images/extraction-review.png',
    width: 866,
    height: 874,
    alt: 'The Transpahire résumé review dialog, titled Review Parsed Resume Data, with a tab each for skills, experience, education, certifications and projects. Every extracted skill shows its type, the line of the résumé it was read from, its group and a confidence of 90%, with a checkbox to add it and a control to delete it. A notice says seven of the skills already exist in the profile; each of those is marked Conflict and offers Replace Existing or Keep Existing.',
  },
})}
        <p class="composition-note">Screenshot · the running product</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--sunken" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Derived signals',
  title: 'Four things <em>a document will not tell you.</em>',
  lede: 'Computed from the structured profile and the taxonomy&rsquo;s own progression maps, and shown as the classification the model returned rather than as a number without a name.',
})}
    <div class="pair">
      <div data-reveal="left">
        <ul class="checklist checklist--ruled">
${SIGNALS.map((s) => `          <li class="checklist__item"><strong>${s.label}</strong> — ${
  s.key === 'seniority' ? 'whether the person is over- or under-levelled for this role'
  : s.key === 'trajectory' ? 'the shape of a career: consistent growth, a pivot, a specialist or a generalist'
  : s.key === 'potential' ? 'the likelihood of growing into a role they do not yet fill'
  : 'the likelihood of withdrawing before the process finishes'
}</li>`).join('\n')}
        </ul>
        <p class="body-copy mt-8 measure">
          Also computed and not shown anywhere on this site: pool size, score distribution,
          per-skill coverage, scarcity index, funnel rates and time-to-hire. They are real
          numbers with no published values, so they get a mechanism and no figure.
        </p>
      </div>
      <div data-reveal="right">
${signalsCluster()}
        ${compositionNote()}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
${head({
  eyebrow: 'What the candidate gets back',
  title: 'The same intelligence, <em>pointed the other way.</em>',
  lede: 'The résumé critique that produces a quality score for the recruiter is the same one that gives the candidate five specific things to fix.',
})}
    <div class="pair">
      <div data-reveal="left">
${resumeComposition({ parallax: false })}
      </div>
      <div data-reveal="right">
        <p class="body-copy body-copy--lg measure">
          A résumé quality score is a trust signal on one side of the table and a to-do list on
          the other. It is the same computation; only the framing changes.
        </p>
        <p class="body-copy measure mt-6">
          Profile completeness works the same way: the tracker that tells a candidate what to
          add is what tells a recruiter how much of the profile is actually there.
        </p>
        <p class="mt-8">${arrowLink('The candidate product', '/for-candidates/')}</p>
      </div>
    </div>
  </div>
</section>

${pageCta({
  title: 'See a real profile <em>come out of a real résumé.</em>',
  lede: 'Bring a job description and a handful of CVs. Thirty minutes.',
  secondary: 'How matching works',
  secondaryHref: '/product/matching/',
})}`;
}
