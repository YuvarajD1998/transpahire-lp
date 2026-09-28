/**
 * legal-terms-candidates.mjs — /legal/terms/candidates
 *
 * A COMPLETE DRAFT, not legal advice, not to go live without a named lawyer's
 * sign-off. See the standing caveat in src/lib/legal.mjs.
 *
 * SHORTER THAN THE ORGANISATION TERMS, and deliberately so. A candidate is not
 * buying anything, and a document that treats them as a counterparty in a
 * commercial negotiation is a document nobody reads. The one section that earns
 * its length is section 4 — what a score means for you — because it is the only
 * place on the whole site where the limits of the number are stated to the
 * person the number is about.
 */

import { counsel, legalDoc } from '../lib/legal.mjs';

export const meta = {
  path: '/legal/terms/candidates/',
  title: 'Terms for candidates (draft) — Transpahire',
  description:
    'Your account and your profile, what a match score means for you and what it does not, reviews you write, and how to leave.',
};

const SECTIONS = [
  {
    n: '1', id: 'account', title: 'Your account and your profile',
    body: `        <p>
          You create an account and build a profile. The profile is yours: you set its visibility
          — public, limited or private — you edit it, and you can export or delete it.
        </p>
        <p>
          If a recruiter added you to their own pool before you signed up, that profile is marked
          unclaimed and is visible only inside their organisation. Claiming it makes it yours on
          the same terms as any other. You can also opt out, which removes you from search.
        </p>`,
  },
  {
    n: '2', id: 'accuracy', title: 'Accuracy',
    body: `        <p>
          You are responsible for what you claim. The platform scores what you provide, and a
          skill you list at five years is scored as five years.
        </p>
        <p>
          Anything extracted from a résumé you upload is shown to you, with a confidence
          indicator, to accept, edit or reject before it is stored. If the extraction got
          something wrong and you accepted it, the profile is still yours to fix.
        </p>`,
  },
  {
    n: '3', id: 'data', title: 'What we do with your profile',
    body: `        <p>
          Your profile is used to match you to roles, to let organisations find you within the
          visibility you set, and to give you back a critique of your own résumé and the skills
          that would open more roles. What is held, what is computed and who can see it is set out
          in the <a href="/legal/privacy/">privacy policy</a> rather than restated here.
        </p>`,
  },
  {
    n: '4', id: 'score', title: 'What a match score means for you',
    body: `        <p>
          A match score is <strong>one organisation&rsquo;s ranking of fit against one
          role</strong>, computed from structured data you provided. That is all it is.
        </p>
        <ul>
          <li>It is <strong>not a judgement of you</strong>, and it is not a measure of your
            ability.</li>
          <li>A low score on one role says nothing about another. The weights are set per job by
            the organisation hiring for it.</li>
          <li>A high score is not an offer, and it is not a promise that anybody will read your
            application.</li>
          <li>A person at the organisation makes the hiring decision. The platform ranks and
            explains; it does not decide.</li>
        </ul>
        <p>
          You see the same score the recruiter sees, and the same breakdown — including the parts
          that count against you. You can ask for the reasoning behind a score, ask for the data
          behind it to be corrected, and ask for a human to review a decision taken about you.
          ${counsel('The rights language for this, per jurisdiction, and whether a ranking acted on by a person is an automated decision for the purposes of each.')}
        </p>`,
  },
  {
    n: '5', id: 'reviews', title: 'Reviews you write',
    body: `        <p>
          If you actually applied to a role, you can review the organisation. One review per role.
          Reviews are anonymous to the organisation and are moderated.
        </p>
        <p>
          <strong>You cannot delete a review after it is published</strong>, though you can
          request its removal and a moderator will consider it. The organisation gets one public
          reply and no delete button.
        </p>
        <p>
          Write what happened. Do not write something untrue about an identifiable person.
          ${counsel('The defamation position, the removal criteria, and the notice-and-takedown process — including what happens to a review whose author later deletes their account.')}
        </p>`,
  },
  {
    n: '6', id: 'conduct', title: 'Conduct, and how to leave',
    body: `        <p>
          Do not impersonate somebody else, do not upload a document that is not yours to upload,
          and do not use the platform to do anything to another user that you would not want done
          to you.
        </p>
        <p>
          Leaving is a real route rather than an email address: deletion is a request you raise in
          the product, it goes into a queue, and it gets done. Export first if you want a copy.
        </p>
        <p>
          ${counsel('What is retained after deletion and why — in particular an organisation’s own notes about you, and audit records of actions taken in respect of your account. This is the same open question as retention in the privacy policy and should be answered once, for both.')}
        </p>`,
  },
  {
    n: '7', id: 'liability', title: 'Liability and governing law',
    body: `        <p>
          ${counsel('The whole of this section, and it should be drafted for a consumer rather than a business counterparty. Limitation of liability, the mandatory consumer protections that cannot be excluded in each jurisdiction, governing law, and dispute resolution.')}
        </p>`,
  },
];

export function render() {
  return legalDoc({
    eyebrow: 'Terms for candidates',
    title: 'Terms for <em>candidates</em>',
    lede: 'Your account, your profile, what a match score does and does not mean about you, the reviews you write, and how to leave.',
    sections: SECTIONS,
  });
}
