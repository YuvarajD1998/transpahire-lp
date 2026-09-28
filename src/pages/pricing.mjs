/**
 * pricing.mjs — /pricing
 *
 * NEW IN PHASE 4, and it is not a design problem. `docs/phase-4.md` § 4.8:
 *
 *     A buyer who cannot tell whether this is a $500 or a $50,000 decision
 *     disqualifies you before the first call.
 *
 * So the page publishes the SHAPE with no numbers, which is what can be
 * published honestly today. `Subscription`, `OrgSubscription` and a Stripe
 * reference exist in the schema, so the shape is at least half-decided: an
 * organisation-level subscription is the per-seat shape, and nothing in the
 * schema bills a job.
 *
 * `[CONFIRM]` — the model itself is the maintainer's decision and is the one
 * thing this page cannot invent. What it does instead is name the decision, say
 * what is already true, and answer the question a buyer is actually asking,
 * which is not "how much" but "is this a conversation I can have".
 *
 * WHAT THIS PAGE MUST NEVER DO: publish a number, a range, an "from", a
 * per-seat figure, or a currency symbol. `CLAUDE.md` § 7 gates pricing on there
 * being something to bill with. There is not. A range invented to look
 * qualified is a commitment made by a marketing page.
 */

import { head, pageCta, pageHead } from '../lib/page.mjs';
import { PRICING } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/pricing/',
  title: 'Pricing — Transpahire',
  description:
    'There is no price published because billing is not switched on. What is decided, what is not, and what a design-partner arrangement involves — instead of a range invented to look qualified.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'Pricing',
    title: 'There is no price yet. <em>Here is why, and what is decided.</em>',
    lede: 'You are trying to work out whether this is a five-hundred-dollar decision or a fifty-thousand-dollar one. That is a fair question to want answered before a call, so this page answers as much of it as is actually true.',
  })}

<section class="section section--tight-top" data-content="provisional">
  <div class="container container--text">
    <div class="pending" data-reveal="up">
      <p class="pending__label">Billing is not switched on</p>
      <p class="body-copy body-copy--lg">
        Not "pricing to be announced". The subscription and billing infrastructure exists in the
        product and has never been activated, so there is no plan to buy, no invoice to receive
        and no contract to sign.
      </p>
      <p class="body-copy">
        ${PRICING.note}
      </p>
    </div>
  </div>
</section>

<section class="section section--sunken">
  <div class="container container--text">
${head({
  eyebrow: 'The shape',
  title: 'What is decided, <em>and what is not.</em>',
})}
    <div class="qa" data-reveal-group data-stagger="normal">
${PRICING.shape.map((row) => `      <div class="qa__row">
        <h3 class="qa__q">${row.q}</h3>
        <p class="qa__a">${row.a}</p>
      </div>`).join('\n')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container container--text">
${head({
  eyebrow: 'Design partners',
  title: 'What we are actually <em>asking for.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        A real requisition, a real pool, and the time to tell us what is wrong with the answer.
        In exchange: the product, the person who wrote it, and no fee while it is this early.
      </p>
      <p>
        The commitment we will make in writing, because it is the one that matters: nobody gets
        billed by surprise. If billing turns on while you are using it, you are told before it
        applies to you, in writing, with a way out and your data exportable on the way.
      </p>
      <p>
        We are also being honest about who this does not suit. If procurement needs a signed
        master agreement, an SLA, a named integration or a security certification today, none of
        those exist and this is not ready for you. That is cheaper for both of us to establish on
        this page than in week six.
      </p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Bring a role, <em>not a purchase order.</em>',
  lede: 'Thirty minutes on a requisition you are struggling to fill. There is nothing to buy at the end of it, which makes it a genuinely low-stakes half-hour.',
  secondary: 'What we will not claim',
  secondaryHref: '/trust/#will-not-claim',
})}`;
}
