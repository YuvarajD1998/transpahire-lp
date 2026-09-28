/**
 * changelog.mjs — /changelog
 *
 * NEW IN PHASE 4, and it is the cheapest credibility available. It also
 * permanently solves the problem the whole of Phase 4 exists to fix:
 *
 *     A roadmap card rots silently. A shipped-list entry cannot.
 *
 * The nine defects Phase 4 corrected were not authoring mistakes; they were the
 * correct output of a process pointed at a stale planning document. A page whose
 * only job is to say what shipped is a process that notices.
 *
 * UNDATED, ON PURPOSE. `docs/phase-4.md` § 4.9 asks for the last six months
 * seeded from the product's own phase docs, and the session that built this page
 * had no access to them. A guessed date is a fabricated fact, and a changelog is
 * the last page on a site like this where that would be forgivable. So entries
 * are grouped by area, newest work first within each, and the page says plainly
 * that dating starts with the next release.
 *
 * Everything listed is confirmed shipped by `docs/phase-4.md` § 1.3. Nothing
 * planned appears here, and since 28 Sep 2026 there is no "Not yet" section
 * under the log either: its last two items, in-platform messaging and calendar
 * sync, were confirmed live by the maintainer and moved into `SHIPPED`.
 */

import { arrowLink, pageCta, pageHead } from '../lib/page.mjs';
import { signup } from '../lib/layout.mjs';
import { SHIPPED } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/changelog/',
  title: 'What has shipped — Transpahire',
  description:
    'Everything live in the product today, grouped by area. Undated, because a guessed date is a fabricated fact; dated entries begin with the next release.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'Changelog',
    title: 'What has <em>shipped.</em>',
    lede: 'This page exists because a roadmap rots quietly and a shipped list cannot. Everything below is live in the product today.',
  })}

<section class="section section--tight-top">
  <div class="container container--text">
    <!-- PHASE 5 · § 4.3. The sign-up's second and last home, and this is the page
         where the promise is self-evidently keepable: a visitor here has just read
         what shipped, and the list is built from this page. Above the log rather
         than below it, because somebody who scrolls the whole inventory has
         already decided. -->
    <div data-reveal="up">
${signup({ id: 'changelog-signup', ground: 'paper' })}
    </div>

    <div class="prose mt-16" data-reveal="up">
      <p>
        <strong>No dates yet, deliberately.</strong> This log starts from the state of the
        product rather than from its release history, and the release history was not available
        to the session that wrote the page. A guessed date on a changelog is a fabricated fact
        and it is the wrong page to put one on. Dated entries begin with the next release; until
        then this is an inventory, not a timeline.
      </p>
    </div>
  </div>
</section>

<section class="section section--sunken" data-content="provisional">
  <div class="container container--text">
${SHIPPED.map((group) => `    <div class="log" data-reveal="up">
      <h2 class="log__group">${group.group}</h2>
      <ul class="log__items">
${group.items.map((item) => `        <li class="log__item">${item}</li>`).join('\n')}
      </ul>
    </div>`).join('\n\n')}

    <p data-reveal="up">${arrowLink('The whole platform', '/product/')}</p>
  </div>
</section>

${pageCta({
  title: 'See any of it <em>running.</em>',
  lede: 'Bring a role you are struggling to fill. Thirty minutes, on your requisition.',
  secondary: 'How matching works',
  secondaryHref: '/product/matching/',
})}`;
}
