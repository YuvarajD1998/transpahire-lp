/**
 * about.mjs — /about
 *
 * SHOULD HAVE, and the reason is risk rather than traffic: for an unknown
 * company making claims about how hiring decisions get made, an anonymous site
 * is a liability. Conversion low, trust high.
 *
 * PHASE 4 MADE THREE CHANGES, all of them deletions or moves except the last.
 *
 *   1. THE THREE-CARD PENDING TEAM GRID IS GONE. It made the company look
 *      unfinished, which is the opposite of what the prose two inches above it
 *      achieves. A labelled empty state is the right grammar for a customer logo
 *      strip, where the missing thing is somebody else's decision. It is the
 *      wrong grammar for a team, where the missing thing is the answer to "who
 *      is this?".
 *
 *   2. THE "COMPANY DETAILS PENDING" PANEL IS GONE. A missing registered address
 *      is a procurement blocker; announcing it in a bordered box makes it a
 *      visible one. The details go in the footer when they exist, and until then
 *      the page says nothing about them.
 *
 *   3. "WHAT WE WILL NOT CLAIM" MOVED TO /trust. It is the best copy on the site
 *      and it belongs where a buyer is evaluating trust rather than on the page
 *      about the company. A one-line pointer stays here.
 *
 * AND ONE ADDITION: the page now says who is behind it. Being solo is not a
 * weakness to manage — it is the explanation for everything distinctive about
 * the product. The three failure modes, in the order they are tempting: padding
 * it out with "we" to imply a team (a visitor who checks will find out, and then
 * every other claim on the site is retroactively suspect); apologising for it;
 * making it the point. A buyer needs about ninety words on this. The product is
 * the argument.
 *
 * 28 SEP 2026 — THE PLACEHOLDERS ARE FILLED, by the maintainer's decision. The
 * name is Yuvaraj. The founder paragraph exists, drafted from their brief
 * ("an ambitious developer who explores new things"). The `Name · Founder ·
 * email` sign-off line is removed: no contact address is published, so /demo's
 * form note no longer points here. The section keeps `data-content="provisional"`
 * until the maintainer approves the paragraph's wording — then remove it.
 *
 * AND "WHERE THIS IS" IS HIDDEN, same date, same decision — commented out in
 * render() below, not deleted.
 */

import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import { DIMENSIONS } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/about/',
  title: 'About Transpahire',
  description:
    'Why a hiring platform should show its reasoning, what stage the company is at, and who is behind it.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'About',
    title: 'A hiring tool <em>should be able to explain itself.</em>',
    lede: 'Transpahire, Inc. builds hiring intelligence for teams that care about quality. The product ranks candidates and shows its reasoning; a person reads the reasoning and decides.',
  })}

<section class="section section--tight-top">
  <div class="container container--text">
    <div class="prose" data-reveal="up">
      <h2>Why this exists</h2>
      <p>
        Screening got automated before it got explained. The tools that rank candidates
        mostly return a number, and a number without its reasoning is not evidence — it is an
        opinion that has been rounded. That is uncomfortable when the subject is somebody&rsquo;s
        career, and it is unusable when a hiring manager asks why.
      </p>
      <p>
        So the product is built the other way round. The score comes apart into four weighted
        dimensions, and skill coverage carries ${Math.round(DIMENSIONS[0].weight * 100)}% of it —
        a figure we publish rather than describe. Each requirement is matched to a phrase in the
        candidate&rsquo;s own profile, with the relationship named and the section it came from
        cited. There is a written explanation of why somebody is, or is not, a fit. The
        recruiter can change what matters and watch the ranking follow.
      </p>
      <p>
        None of that makes the machine right. It makes the machine arguable, which is the
        only property that lets a person stay responsible for the decision.
      </p>

      <h2>Both sides of the table</h2>
      <p>
        Candidates are users of Transpahire, not records in it. They see the same match score
        the recruiter sees, the same breakdown, a critique of their own résumé, the skills
        that would open more roles, who has been looking at their profile, and where their
        application stands — and they are told when it moves. They control whether they are
        visible at all, and they can export or delete everything the platform holds about them.
        This is uncommon in this category, and it is the part of the product we would least like
        to be talked out of.
      </p>

      <h2>What we will not claim</h2>
      <p>
        There is a list, it is specific, and it is on the page where a buyer is actually
        weighing it up: ${arrowLink('what we will not claim', '/trust/#will-not-claim')}. The
        short version is that we will describe what the software computes and shows, and we will
        not tell you what outcome that produces.
      </p>
    </div>
  </div>
</section>

<!-- ── One person ───────────────────────────────────────────────────────── -->
<section class="section section--sunken" id="who" data-content="provisional">
  <div class="container container--text">
    <div class="prose" data-reveal="up">
      <h2>Who is behind this</h2>
      <p>
        One person. I&rsquo;m <strong>Yuvaraj</strong>, and I built Transpahire — the matching
        engine, the taxonomy, the application and this site.
      </p>
      <p>
        I&rsquo;m an ambitious developer, and I explore by building: a new language, a new
        framework, a new kind of model — I learn each one by shipping something real with it.
        Transpahire is where that habit met a question I could not leave alone: why can a
        screening tool rank a person and still not say why?
      </p>
      <p>
        That is the reason for a few things you may have noticed. The product refuses to show a
        number it cannot support, because there is nobody to overrule that instinct. The
        sourcing agent logs every search it tries and every one you turned down, because I have
        to be able to debug it from the outside. And this site has empty slots on it where the
        customer logos and the screenshots will go, because filling them in would have been
        faster than admitting they are not there yet.
      </p>
      <p>
        A one-person company is a real thing to weigh when you are buying software, and I would
        rather you weighed it now than found out later. What I can offer against it: you will
        always be talking to the person who wrote the code, and nothing on this site has been
        through a marketing department, because there isn&rsquo;t one.
      </p>
    </div>
  </div>
</section>
${'' /* ── Where this is ── HIDDEN 28 Sep 2026, the maintainer's decision.
   Commented out rather than deleted so it can come back verbatim: to restore,
   remove this `${'' /*` opener and the matching `*\/}` closer below. `head` stays
   imported for it.

<section class="section">
  <div class="container container--text">
${head({
  eyebrow: 'The stage',
  title: 'Where this <em>is.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        Pre-revenue. Billing infrastructure exists and is not switched on, so there is nothing
        to bill with and nothing to sign — what is being decided about pricing is written down
        on ${arrowLink('the pricing page', '/pricing/')} instead of saved for a call.
      </p>
      <p>
        What we are looking for is design partners: teams hiring fifty to five hundred people a
        year who will bring a real requisition and tell us what is wrong with the answer. Being
        early is not a secret, and a buyer who is comfortable with early is exactly the buyer
        worth talking to.
      </p>
      <p>
        The product is further along than this site was until recently. Everything on
        ${arrowLink('what has shipped', '/changelog/')} is live.
      </p>
      <p>
        The site is closed to search engines on purpose while the rest of the content inventory
        is outstanding, which is also why you probably arrived here from a link rather than a
        search.
      </p>
    </div>
  </div>
</section>
── end of the hidden section */}

${pageCta({
  title: 'See it <em>on one of your own roles.</em>',
  lede: 'The fastest way to judge whether any of the above is true is to watch it run against a requisition you already know the answer to.',
  secondary: 'How matching works',
  secondaryHref: '/product/matching/',
})}`;
}
