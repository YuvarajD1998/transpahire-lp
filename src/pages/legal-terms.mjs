/**
 * legal-terms.mjs — /legal/terms
 *
 * A CHOOSER, not a document. `docs/phase-4.md` § 5.3 keeps Phase 3's finding
 * that one set of terms covering both audiences would have to be vague exactly
 * where it matters most, and resolves it the other way: ship two documents and
 * make this page route to them.
 *
 * The two agreements are at /legal/terms/organisations/ and
 * /legal/terms/candidates/.
 */

import { audienceChooser } from '../lib/legal.mjs';
import { pageHead } from '../lib/page.mjs';

export const meta = {
  path: '/legal/terms/',
  title: 'Terms of service — Transpahire',
  description:
    'Two agreements, because Transpahire has two kinds of user with genuinely different interests: one for hiring organisations, one for candidates.',
};

export function render() {
  return `${pageHead({
    crumb: 'Legal',
    crumbHref: '/legal/',
    eyebrow: 'Terms of service',
    title: 'Two agreements, <em>because there are two kinds of user.</em>',
    lede: 'A hiring organisation and a candidate have genuinely different interests in the same platform. One document covering both would have to be vague in the places that matter most, so there are two.',
  })}

<section class="section section--tight-top" data-content="provisional">
  <div class="container container--text">

    <div class="pending" data-reveal="up">
      <p class="pending__label">Both documents are drafts, not yet reviewed by counsel</p>
      <p class="body-copy body-copy--lg">
        They are complete drafts with the product facts filled in and every legal determination
        flagged. Neither is legal advice, and neither should be relied on until it has been
        signed off.
      </p>
      <p class="body-copy">
        No commercial commitment on this site should be read as binding. There is no price
        published anywhere, no trial offered, and billing is not switched on.
      </p>
    </div>

${audienceChooser({
  candidateHref: '/legal/terms/candidates/',
  orgHref: '/legal/terms/organisations/',
  note: 'If you are both — a recruiter who also has a candidate profile — both apply, to the respective account.',
})}

    <div class="prose mt-16" data-reveal="up">
      <h2>The clause that matters most, in both</h2>
      <p>
        A match score is a computed recommendation over structured data. It is not an assessment,
        not a prediction of job performance, and not a decision. <strong>The hiring decision, and
        the responsibility for it, remains with the organisation.</strong>
      </p>
      <p>
        It appears in the organisation terms as an obligation and in the candidate terms as a
        reassurance, and it is the same sentence both times. If the two documents ever disagree
        about it, that is a defect in one of them.
      </p>
      <p>
        <a class="link" href="/trust/">What the platform logs, and who can see what</a>
      </p>
    </div>

  </div>
</section>`;
}
