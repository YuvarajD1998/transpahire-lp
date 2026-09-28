/**
 * legal-cookies.mjs — /legal/cookies
 *
 * Phase 3's version of this page was honest and nearly right. It just needed to
 * become a document rather than a promise of one, and to separate the two
 * properties — this marketing site and the application are genuinely different
 * cases and answering for both at once is what makes cookie policies useless.
 *
 * THE RECOMMENDATION IN SECTION 1 IS THE POINT OF THE PAGE. Self-hosting the two
 * font families removes the last third-party request from the site entirely,
 * which makes this document trivially short and completely true. It is about
 * half a day of work. `docs/phase-4.md` § 5.4 recommends doing it, and so does
 * this page — out loud, on the page, because a recommendation the maintainer
 * makes to themselves in a comment is a recommendation nobody is accountable
 * for.
 */

import { counsel, legalDoc } from '../lib/legal.mjs';

export const meta = {
  path: '/legal/cookies/',
  title: 'Cookie policy (draft) — Transpahire',
  description:
    'This marketing site sets no cookies and runs no analytics. It makes one third-party request, for fonts, and here is what that means and how to remove it.',
};

const SECTIONS = [
  {
    n: '1', id: 'this-site', title: 'This marketing site',
    body: `        <p>
          <strong>It sets no cookies.</strong> Not necessary ones, not analytics, not
          preferences. There is no consent banner because there is nothing to consent to, which
          is the only good reason not to have one.
        </p>
        <p>
          <strong>It runs no analytics.</strong> No page views are counted, no visitor is
          identified, no session is recorded, and no tag manager is installed. We do not know how
          many people read this page.
        </p>
        <p>
          <strong>It loads one third-party resource: a font stylesheet from Google Fonts</strong>,
          and the font files that stylesheet points at. That request is made by your browser, and
          it leaves your IP address and your user agent with Google. No cookie is set by it, and
          it is not a tracking pixel, but it is a third-party request and pretending otherwise
          would make the rest of this page worthless.
        </p>
        <h3>And here is the fix, which we intend to make</h3>
        <p>
          Self-hosting the two font families removes that request, and with it the last
          third-party connection this site makes. It is about half a day of work, it makes this
          document two sentences long, and it means the site&rsquo;s privacy claims are true
          rather than nearly true. It is on the list.
        </p>
        <p>
          If analytics is ever added to this site, a consent mechanism becomes an obligation, and
          this page will say so before it is added rather than after. We would rather commit to
          that here than leave room to add it quietly.
        </p>`,
  },
  {
    n: '2', id: 'application', title: 'The application',
    body: `        <p>
          <a href="https://app.transpahire.com/">app.transpahire.com</a> is a different property
          and a different answer, because a logged-in product needs to remember that you are
          logged in.
        </p>
        <p>
          What it uses: a session credential, and a refresh mechanism that keeps you signed in
          without asking for your password on every page. Both are strictly necessary for
          authentication — there is no legitimate way to offer a login without them, which is why
          they do not require consent in most jurisdictions.
        </p>
        <p>
          ${counsel('Enumerate the actual cookie or token names, their purpose, their storage mechanism, their lifetime, and their domain, from the auth module — and confirm the "strictly necessary" characterisation for each rather than assuming it. A refresh token with a long lifetime may need its own line.')}
        </p>
        <p>
          The application does not set an advertising cookie and is not integrated with an ad
          network. ${counsel('Confirm whether any product analytics or error-reporting tool is installed in the application, and if so whether it sets storage of its own. This is the most likely place for an unlisted cookie to exist.')}
        </p>`,
  },
  {
    n: '3', id: 'control', title: 'Controlling what is stored',
    body: `        <p>
          Your browser can block or clear site storage for either property. Doing it for this
          marketing site changes nothing, because there is nothing to clear. Doing it for the
          application signs you out.
        </p>
        <p>
          If you want the platform to stop holding your data altogether rather than stop storing a
          session, that is a different and more useful request, and it is a real route in the
          product: see <a href="/trust/#data-rights">what you can ask for</a>.
        </p>`,
  },
];

export function render() {
  return legalDoc({
    eyebrow: 'Cookie policy',
    title: 'Cookie policy',
    lede: 'Two properties, two different answers. This site sets nothing; the application sets what a login needs. The one third-party request this site makes is named, and so is the plan to remove it.',
    sections: SECTIONS,
  });
}
