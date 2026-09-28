/**
 * page.mjs — the small pieces every sub-page shares.
 *
 * Not components: these are compositions of components that only make sense on
 * a page below the homepage, which is what `docs/components.md § 6` step 3 says
 * to do rather than promoting a one-use pattern.
 */

import { esc } from './compositions.mjs';

/**
 * The page head. A hero-lite: one H1, one lede, a breadcrumb, and no
 * composition and no CTA pair — the page's own first section does that work
 * instead of a second hero competing with it.
 */
export function pageHead({ crumb, crumbHref, eyebrow, title, lede }) {
  const trail = crumb
    ? `      <p class="page-head__crumb"><a href="${crumbHref}">${esc(crumb)}</a> <span aria-hidden="true">/</span> ${esc(eyebrow)}</p>`
    : `      <p class="eyebrow">${esc(eyebrow)}</p>`;

  return `<section class="page-head">
  <div class="container">
    <div class="page-head__inner">
${trail}
      <h1 class="h-display" data-reveal="up">${title}</h1>
      <p class="lede" data-reveal="up">${lede}</p>
    </div>
  </div>
</section>`;
}

/** The closing CTA every sub-page ends on. One ask, at the bottom, once. */
export function pageCta({ title, lede, primary = 'Book a demo', primaryHref = '/demo/', secondary, secondaryHref }) {
  const second = secondary
    ? `      <a class="btn btn--secondary press" href="${secondaryHref}">${esc(secondary)}</a>`
    : '';

  return `<section class="cta cta--tight on-ink">
  <div class="container cta__inner" data-reveal="scale">
    <h2 class="h-section cta__title">${title}</h2>
    <p class="lede cta__lede">${lede}</p>
    <div class="cluster cluster--center">
      <a class="btn btn--primary hover-icon press" href="${primaryHref}">
        ${esc(primary)}
        <svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
      </a>
${second}
    </div>
  </div>
</section>`;
}

/** A section head, with the 200px label rail. */
export function head({ eyebrow, title, lede = '', center = false }) {
  return `    <div class="section-head${center ? ' section-head--center' : ''}" data-reveal="up">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h2 class="h-section">${title}</h2>
${lede ? `      <p class="lede">${lede}</p>` : ''}
    </div>`;
}

/** An arrow link. */
export function arrowLink(text, href) {
  return `<a class="link hover-icon" href="${href}">${esc(text)} <svg class="icon-shift" width="13" height="13" aria-hidden="true" focusable="false" style="display:inline-block;vertical-align:-1px"><use href="#i-arrow-right"/></svg></a>`;
}

/* --------------------------------------------------------------------------
   PHASE 5 · the tool pages' shared honest gap — `docs/phase-5.md` § 4.1, § 4.2
   --------------------------------------------------------------------------
   Both tools run real shipped services on a document the visitor supplies, and
   both are blocked on the same decision: whether a public unauthenticated
   endpoint is acceptable. `docs/phase-5.md` § 9 lists it as the largest item in
   the whole stream.

   THE PAGES SHIP ANYWAY, and the reason is the same one /demo's form was left
   unwired for: the alternative to an honest gap is either a fake result or no
   page, and both are worse. A fake report would be the one invention this site
   has avoided — it would be product output that no service produced. A missing
   page means the decision has no visible cost, and a decision with no visible
   cost does not get made.

   So the page says exactly what the tool does, what it refuses to do, and that
   it is not switched on yet — and it names the route that works today.

   WHEN THE ENDPOINT EXISTS, in order:
     1. `method="POST" action="…"` on the form, drop `novalidate`, add the size
        cap and the rate limit the endpoint enforces.
     2. Replace this note with the real behaviour: synchronous if the endpoint is
        public, "back within the hour" if it is the async fallback.
     3. Add the paragraph to /legal/privacy — a page that accepts a document is a
        processing activity and the policy has to say so BEFORE this goes live.
     4. Delete this comment.
   -------------------------------------------------------------------------- */

export function toolGate({ what, instead = '/demo/', insteadLabel = 'book the half-hour' }) {
  return `        <p class="form__note" data-content="placeholder">
          <strong>Not switched on yet.</strong> ${esc(what)} runs on the same services the
          product runs, and putting them behind a public address needs a decision about rate
          limits and a size cap that has not been made. A form that appeared to submit into
          nothing would be worse than one that says so. Until it is live,
          <a class="link" href="${instead}">${esc(insteadLabel)}</a> — the first ten minutes of
          it are this, on your own requisition, with a person to argue with.
        </p>`;
}

/** What the tool does with the document. On the page, not only in the policy. */
export function toolPrivacy({ retained }) {
  return `      <p class="body-copy">
        <strong>What happens to what you paste.</strong> ${esc(retained)} Nothing is added to a
        candidate database, nothing is shared, and there is no account to create before you see
        the result. The privacy policy needs a paragraph about this page before it goes live —
        <a class="link" href="/legal/privacy/">it is a draft</a>, and a page that accepts a
        document is a processing activity.
      </p>`;
}
