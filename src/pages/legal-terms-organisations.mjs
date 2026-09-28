/**
 * legal-terms-organisations.mjs — /legal/terms/organisations
 *
 * A COMPLETE DRAFT, not legal advice, not to go live without a named lawyer's
 * sign-off. See the standing caveat in src/lib/legal.mjs.
 *
 * SECTION 2 SHOULD BE DRAFTED FIRST by whoever picks this up. It is the clause
 * that allocates responsibility for a hiring decision, and every other clause in
 * the document is downstream of it. `docs/phase-4.md` § 5.3 says so.
 *
 * SECTION 5 MATCHES SHIPPED BEHAVIOUR and is worth not softening: an
 * organisation may reply once, publicly, and may flag a review for moderation.
 * It cannot delete one. That is what the product does, and terms that implied
 * otherwise would be terms the product breaches.
 */

import { counsel, legalDoc } from '../lib/legal.mjs';
import { ORG_ROLES } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/legal/terms/organisations/',
  title: 'Terms for hiring organisations (draft) — Transpahire',
  description:
    'What a match score is and is not, where responsibility for a hiring decision sits, what you may do with candidate data reached through search, and your obligations for profiles you import.',
};

const SECTIONS = [
  {
    n: '1', id: 'service', title: 'The service, and the account model',
    body: `        <p>
          Transpahire provides a recruitment platform: candidate search and sourcing, a matching
          and explanation engine, a hiring pipeline, and reporting on all of it.
        </p>
        <p>
          An account belongs to an organisation, not to a person. Members are invited into it and
          hold one of ${ORG_ROLES.length} roles — ${ORG_ROLES.join(', ')} — with access to
          individual jobs granted job by job. An administrator of the organisation controls both.
        </p>
        <p>
          Your organisation is responsible for the acts of its members, and for removing members
          who leave. ${counsel('Whether the platform bears any obligation to deprovision on notice, and the standard of care on account security.')}
        </p>`,
  },
  {
    n: '2', id: 'score', title: 'What a match score is, and is not',
    body: `        <p>
          A match score is a <strong>computed recommendation over structured data</strong>. It
          expresses how closely a candidate&rsquo;s recorded skills, experience, location and
          preferences correspond to the requirements you recorded on a job.
        </p>
        <p>
          It is <strong>not</strong> an assessment of a person, <strong>not</strong> a prediction
          of job performance, and <strong>not</strong> a decision. The four derived signals —
          seniority alignment, career trajectory, potential and drop-off risk — are estimates
          computed from structured profile data and carry the same limits.
        </p>
        <p>
          <strong>The hiring decision, and the responsibility for it, remains with your
          organisation.</strong> You are responsible for what you do with a ranking, for the
          requirements you set that produced it, and for compliance with the employment and
          anti-discrimination law that applies to you.
        </p>
        <p>
          ${counsel('This clause is load-bearing and should be drafted first. It needs to survive a jurisdiction where an automated ranking acted upon without meaningful human review may itself constitute an automated decision — which is a question about your customer’s process, not about the software, and the clause has to allocate that risk explicitly rather than by implication.')}
        </p>`,
  },
  {
    n: '3', id: 'candidate-data', title: 'What you may do with candidate data',
    body: `        <p>
          Candidate data you reach through the platform is provided for recruitment, for the roles
          you are hiring for. Specifically, you may not:
        </p>
        <ul>
          <li>use it for any purpose other than recruiting for a role you are actually hiring
            for;</li>
          <li>sell it, licence it, or otherwise make it available to a third party;</li>
          <li>export it into an unrelated system, or build a separate database from it;</li>
          <li>use it to train a model;</li>
          <li>contact a candidate who has opted out.</li>
        </ul>
        <p>
          Search and export are logged, with the member who ran them and the number of rows
          returned. ${counsel('Whether the platform may audit an organisation’s use, on what notice, and what the consequence of a breach of this section is — suspension, termination, or notification to affected candidates.')}
        </p>`,
  },
  {
    n: '4', id: 'imports', title: 'Profiles you import',
    body: `        <p>
          You can bring candidates into your own pool from a list you already hold. When you do,
          you are the party that introduced that person&rsquo;s data to the platform, and you
          warrant that you have a lawful basis for holding and sharing it.
        </p>
        <p>
          An imported profile is marked <em>unclaimed</em> and is visible only inside your
          organisation until the person takes it over. Their claim, or their opt-out, is theirs to
          make and you may not obstruct either.
        </p>
        <p>
          ${counsel('The controller / processor determination for imported profiles, and the indemnity that follows from it. This almost certainly needs a data processing agreement alongside these terms rather than a clause inside them.')}
        </p>`,
  },
  {
    n: '5', id: 'reviews', title: 'Reviews of your organisation',
    body: `        <p>
          A candidate who actually applied to one of your roles can review your organisation. The
          platform gates reviews on a verified application, allows one per role, and moderates
          them.
        </p>
        <p>
          You may <strong>reply once, publicly</strong>, and you may <strong>flag a review for
          moderation</strong>. <strong>You cannot delete one</strong>, and neither can we on
          request. A right of reply is a real right; a delete button would make the whole thing
          worthless.
        </p>
        <p>
          ${counsel('The moderation standard, the takedown process for content that is unlawful rather than merely unwelcome, and the platform’s liability position on user-generated content in each jurisdiction.')}
        </p>`,
  },
  {
    n: '6', id: 'availability', title: 'Availability and support',
    body: `        <p>
          The platform is provided as it is, and it is early. <strong>There is no service level
          agreement</strong>, because none has been made — not a low one, none. There is no
          published uptime commitment, no support response time, and no scheduled maintenance
          window.
        </p>
        <p>
          What there is: the person who wrote the code. That is a real answer at this stage and it
          is not a substitute for an SLA. If you need one, say so and we will tell you honestly
          that it does not exist yet.
        </p>`,
  },
  {
    n: '7', id: 'fees', title: 'Fees',
    body: `        <p>
          <strong>Billing is not switched on.</strong> There is no fee, no plan, and nothing to
          invoice. Subscription infrastructure exists in the product and has never been
          activated.
        </p>
        <p>
          If billing is activated while you are using the platform, you will be told before it
          applies to you, in writing, with the option to stop and with your data exportable.
        </p>
        <p>
          ${counsel('The fee, notice and termination-for-non-payment clauses, once the pricing model is decided. Also whether design-partner access needs its own short agreement rather than a clause in these terms.')}
        </p>`,
  },
  {
    n: '8', id: 'termination', title: 'Termination, and what happens to data',
    body: `        <p>
          Either side can end the arrangement. On termination your organisation&rsquo;s data is
          exportable for a period, and then deleted.
        </p>
        <p>
          Two things survive and are worth stating plainly. A candidate who created their own
          profile keeps it — it was never yours. Audit records of actions taken in your account
          are retained, because an audit trail that can be deleted by the party it audits is not
          an audit trail.
        </p>
        <p>
          ${counsel('The export window, the deletion timetable, and the retention period for audit records after termination.')}
        </p>`,
  },
  {
    n: '9', id: 'liability', title: 'Liability, indemnity and governing law',
    body: `        <p>
          ${counsel('The whole of this section. Limitation of liability and its cap, the exclusions, the indemnity for imported-profile claims and for use of candidate data outside section 3, warranty disclaimers, governing law and jurisdiction. Nothing in this draft should be read as a position on any of it.')}
        </p>`,
  },
];

export function render() {
  return legalDoc({
    eyebrow: 'Terms for organisations',
    title: 'Terms for <em>hiring organisations</em>',
    lede: 'What the platform provides, what a match score is and is not, where responsibility for a hiring decision sits, and what you may do with candidate data you reach through it.',
    sections: SECTIONS,
  });
}
