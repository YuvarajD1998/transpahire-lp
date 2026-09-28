/**
 * legal-index.mjs — /legal
 *
 * NEW IN PHASE 4, and it exists for a reason that is about the footer rather
 * than about this page.
 *
 * Three "in preparation" links in the footer of every page was thirty-six
 * reminders across the site that the company was not ready. The drafts fix that
 * — they are real documents now — but the legal set has also grown from three
 * pages to five, and five footer links to legal documents on a marketing site is
 * a legal department the company does not have.
 *
 * So the footer carries one **Legal** link, and it points here.
 */

import { arrowLink, pageHead } from '../lib/page.mjs';
import { FACTS_AS_OF } from '../lib/legal.mjs';

export const meta = {
  path: '/legal/',
  title: 'Legal — Transpahire',
  description:
    'The privacy policy, the terms for hiring organisations, the terms for candidates, and the cookie policy. All four are complete drafts pending legal review.',
};

const DOCS = [
  {
    href: '/legal/privacy/',
    title: 'Privacy policy',
    note: 'What is held about a candidate, what the platform computes, who can see it, what an automated ranking is and is not — including the actual weights of the model — and what you can ask for.',
    who: 'Candidates first, then organisations',
  },
  {
    href: '/legal/terms/organisations/',
    title: 'Terms for hiring organisations',
    note: 'What a match score is and is not, where responsibility for a hiring decision sits, what you may do with candidate data reached through search, and your obligations for profiles you import.',
    who: 'Hiring organisations',
  },
  {
    href: '/legal/terms/candidates/',
    title: 'Terms for candidates',
    note: 'Your account and your profile, what a score does and does not mean about you, the reviews you write, and how to leave.',
    who: 'Candidates',
  },
  {
    href: '/legal/cookies/',
    title: 'Cookie policy',
    note: 'This site sets no cookies and runs no analytics. It makes one third-party request, for fonts, and this says what that means and how it will be removed.',
    who: 'Everyone',
  },
];

export function render() {
  return `${pageHead({
    eyebrow: 'Legal',
    title: 'Four documents, <em>all of them drafts.</em>',
    lede: 'Complete drafts with the product facts filled in and every legal determination flagged for counsel. None of it is legal advice and none of it is signed off yet — which is stated on each document rather than implied by its absence.',
  })}

<section class="section section--tight-top" data-content="provisional">
  <div class="container container--text">

    <div class="pending" data-reveal="up">
      <p class="pending__label">Why these are published in draft</p>
      <p class="body-copy body-copy--lg">
        Because the factual half is checkable today. What the platform holds, what it computes,
        who can see it and what you can ask for are questions with answers, and a candidate
        asking them deserves an answer that exists rather than a page saying one is coming.
      </p>
      <p class="body-copy">
        What is not settled is every legal determination in them, and each of those is marked in
        place. Product facts were read from the source on ${FACTS_AS_OF}. The site stays closed to
        search engines until sign-off.
      </p>
    </div>

    <div class="doclist" data-reveal-group data-stagger="normal">
${DOCS.map((d) => `      <a class="doclist__item" href="${d.href}">
        <span class="doclist__who">${d.who}</span>
        <span class="doclist__title">${d.title}</span>
        <span class="doclist__note">${d.note}</span>
      </a>`).join('\n')}
    </div>

    <div class="prose mt-16" data-reveal="up">
      <h2>What is not a legal document</h2>
      <p>
        Most of what a buyer wants from this section is not actually in a policy. Who can see
        candidate data, what gets logged with a score, how a job description is checked for
        language that narrows the pool, and what happens when the model changes are all
        descriptions of the software, and they are on their own page:
        ${arrowLink('trust, access and what gets logged', '/trust/')}.
      </p>
      <p>
        ${arrowLink('And what we will not claim', '/trust/#will-not-claim')}
      </p>
    </div>

  </div>
</section>`;
}
