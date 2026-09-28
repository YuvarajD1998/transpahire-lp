/**
 * trust.mjs — /trust  ★
 *
 * NEW IN PHASE 4, and the highest-ROI page the site was missing. Every word of
 * it is a mechanism claim: who can see candidate data, what gets logged, what a
 * candidate can ask for, and what happens when the model changes.
 *
 * WHY IT EXISTS NOW AND NOT BEFORE. `CLAUDE.md` § 7 gated fairness, the audit
 * trail and decision justification behind named legal sign-off. All three were
 * live features; what was gated was marketing them. `docs/phase-4.md` § 8.1
 * draws the distinction that unblocks the work, and CLAUDE.md now carries it:
 *
 *     A claim about what the software COMPUTES AND SHOWS is a mechanism claim,
 *     and is permitted. A claim about the OUTCOME — fair, unbiased, compliant,
 *     defensible, auditable — is not, and needs named sign-off.
 *
 *     "We read the job description for exclusionary language and hold no
 *     demographic data" is the first kind. "Fair by design" is the second.
 *
 * SO THIS PAGE MAY NOT USE, ANYWHERE: compliant · defensible · bias-free · fair
 * by design · secure · enterprise-grade · auditable · unbiased. Grep for them
 * before shipping a change. Describing what the software does is the argument;
 * the restraint is the argument.
 *
 * "What we will not claim" MOVED HERE from /about, per § 4.3 section 6. It is
 * the best copy on the site and it belongs where a buyer is evaluating trust
 * rather than on the page about the company. /about keeps a one-line pointer.
 */

import { esc, fairnessComposition, ledgerComposition } from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import {
  DATA_RIGHTS, EMPTY_STATES, FAIRNESS, GOVERNANCE_SURFACES, JOB, ORG_ROLES,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/trust/',
  title: 'Trust, access and what gets logged — Transpahire',
  description:
    'Who can see candidate data, what every score is stored with, what a candidate can ask for, how a job description is checked for language that narrows the pool, and what happens when the model changes.',
};

export function render() {
  return `${pageHead({
    eyebrow: 'Trust',
    title: 'A hiring tool should be able to <em>account for itself.</em>',
    lede: 'Who can see candidate data, what gets logged, what a candidate can ask for, and what happens when the model changes. Mechanisms, not assurances.',
  })}

<!-- ── 1 · Who can see what ─────────────────────────────────────────────── -->
<section class="section section--tight-top" id="access">
  <div class="container">
${head({
  eyebrow: 'Access',
  title: 'Who can see <em>what.</em>',
  lede: 'Six roles, a hierarchy, and per-job assignment. An unassigned recruiter does not get a filtered view of a job — they get refused.',
})}
    <div class="pair">
      <div data-reveal="left">
        <ul class="checklist checklist--ruled">
          <li class="checklist__item"><strong>${ORG_ROLES.length} organisation roles</strong> — ${ORG_ROLES.join(', ')} — each with its own permissions, set by an administrator.</li>
          <li class="checklist__item"><strong>A manager-to-recruiter hierarchy.</strong> A manager sees their recruiters&rsquo; work. A recruiter does not see a peer&rsquo;s.</li>
          <li class="checklist__item"><strong>Per-job assignment.</strong> Access to a job is granted job by job. A recruiter who is not on a job is refused it outright rather than shown a partial version of it.</li>
          <li class="checklist__item"><strong>Organisation isolation.</strong> One organisation&rsquo;s notes, stages, tags, ratings and pools about a candidate are theirs. Another organisation looking at the same person sees none of it.</li>
          <li class="checklist__item"><strong>Joining is a decision, not a link.</strong> Members arrive by invitation token or by a join request somebody approves.</li>
        </ul>
      </div>
      <div data-reveal="right">
        <p class="body-copy body-copy--lg measure">
          The distinction that matters here is between a permission model and a filter. A
          filtered view leaks the shape of what it is hiding: a count, a gap in a sequence, a
          number that does not add up. A refusal does not.
        </p>
        <p class="body-copy measure mt-6">
          It also means the audit log is worth reading, because every access it records is an
          access that was authorised.
        </p>
      </div>
    </div>

    <!-- PHASE 5 · § 2.7. The two things the section was missing, and they are the
         two that make the claim checkable rather than assertable: WHERE the
         refusal happens, and WHAT the refused person sees.

         This is a stronger access-control claim than "role-based permissions",
         and it is a mechanism claim throughout — the gate is a line of code and
         the empty state is a string. Neither is a promise about an outcome, which
         is what CLAUDE.md § 7 requires of anything on this page. -->
    <div class="pair mt-16" data-reveal="up">
      <div>
        <p class="body-copy body-copy--lg measure">
          The gate is on the request, not on the screen. Asking the API for a job&rsquo;s
          candidates asserts an active assignment before it returns anything, and the only role
          exempt from that assertion is the organisation administrator. Everybody else —
          recruiter, sourcer, interviewer, hiring manager — is refused with a 403 rather than
          handed a filtered list.
        </p>
      </div>
      <div>
        <p class="body-copy measure">
          And the product treats being locked out as a <strong>normal state rather than a
          failure</strong>, which is a design decision worth quoting because it is the part
          nobody claims:
        </p>
        <blockquote class="pullquote pullquote--sm mt-6">
          <p>${esc(EMPTY_STATES.notAssignedTitle)}</p>
          <p class="pullquote__sub">${esc(EMPTY_STATES.notAssigned)}</p>
        </blockquote>
        <p class="body-copy measure mt-6">
          Not an error, not a permissions dialog, and not an invitation to ask an administrator
          for more access than the job needs. A request to the one person who can grant it.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── 2 · What is logged ───────────────────────────────────────────────── -->
<section class="section section--sunken" id="logged" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'The record',
  title: 'What is <em>logged.</em>',
  lede: 'Every mutation carries an actor and a timestamp. Every score is stored with the weights, the per-skill scores and the verdict as they were at the time it was computed. Every search is audited.',
})}
    <div class="pair pair--lead">
      <div data-reveal="left">
        <div class="prose">
          <p>
            The one worth dwelling on is the middle one. A score is not stored as a number; it
            is stored with the model that produced it — which weights were in force, what each
            skill scored, which requirements the gate dropped and what verdict came out. So a
            result from last month can be reconstructed even if the weights have moved since,
            and “why was she ranked ninth in March” has an answer that is not a reconstruction
            from memory.
          </p>
          <p>
            That is also what makes a disagreement possible. A ranking you can only re-run
            under today&rsquo;s model is not a ranking you can question about a decision made
            under a different one.
          </p>
        </div>
      </div>
      <div data-reveal="right">
        <ul class="checklist checklist--ruled">
${GOVERNANCE_SURFACES.map((g) => `          <li class="checklist__item"><strong>${g.label}.</strong> ${g.detail}</li>`).join('\n')}
        </ul>
      </div>
    </div>

    <!-- Full width, deliberately. A four-column mono log in a half-column wraps
         every row onto three lines, which is the opposite of what a log is
         for. -->
    <div class="mt-16" data-reveal="rise">
${ledgerComposition()}
      <p class="composition-note">Illustrative log · invented actors and identifiers</p>
    </div>
  </div>
</section>

<!-- ── 3 · What a candidate can ask for ─────────────────────────────────── -->
<section class="section" id="data-rights">
  <div class="container">
${head({
  eyebrow: 'Data rights',
  title: 'What a candidate <em>can ask for.</em>',
  lede: 'Export and delete are routes in the product, not a form that generates an email. Both arrive as a request with a review queue behind it.',
})}
    <div class="grid grid--3" data-reveal-group data-stagger="normal">
      <article class="card">
        <h3 class="h-card card__title">Export</h3>
        <p class="body-copy card__body">A candidate can request everything the platform holds about them. The request is recorded, reviewed and completed, and the completion is itself a logged event.</p>
        <p class="card__benefit">${DATA_RIGHTS.types[0]} — ${DATA_RIGHTS.route}.</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">Delete</h3>
        <p class="body-copy card__body">The same route, in the other direction. What happens to an organisation&rsquo;s own notes about a candidate after deletion is a retention decision, and it belongs in the privacy policy rather than in a marketing sentence.</p>
        <p class="card__benefit">${DATA_RIGHTS.types[1]} — ${DATA_RIGHTS.route}.</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">Review before save</h3>
        <p class="body-copy card__body">Everything extracted from an uploaded résumé is shown to the candidate with a confidence indicator, to accept, edit or reject, before any of it is stored.</p>
        <p class="card__benefit">A profile they agreed to, not one assembled about them.</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">Visibility</h3>
        <p class="body-copy card__body">Public, limited or private, set by the candidate. It controls whether an organisation that did not source them can find them at all.</p>
        <p class="card__benefit">Searchable is a choice, and it is theirs.</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">Account status</h3>
        <p class="body-copy card__body">A profile a recruiter imported is marked unclaimed until the person takes it over, and is visible only inside the organisation that imported it until they do. They can claim it, or opt out of it.</p>
        <p class="card__benefit">${arrowLink('The two consent bases', '/product/sourcing/#consent')}</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">The reasoning</h3>
        <p class="body-copy card__body">A candidate sees the same score a recruiter sees, and the same breakdown of where they fit and where they do not — including the parts that count against them.</p>
        <p class="card__benefit">${arrowLink('What candidates see', '/for-candidates/')}</p>
      </article>
    </div>
  </div>
</section>

<!-- ── 4 · Structural fairness ──────────────────────────────────────────── -->
<section class="section section--sunken" id="fairness" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Structural fairness',
  title: 'How a job description <em>narrows the pool.</em>',
  lede: FAIRNESS.line,
})}
    <div class="pair pair--lead">
      <div data-reveal="left">
        <div class="prose">
          <p>
            It reads the requirements. Some of what it finds is language: “rockstar”, “ninja”,
            “10x” are jargon that discourages applications; “young” is age bias; “recent
            graduate” narrows a pool against people returning to work; a hard degree
            requirement excludes people who are good at the job and did not take that route.
            Each flagged term comes with the reason it was flagged.
          </p>
          <p>
            The rest of what it finds is shape rather than wording — a score distribution that
            skews hard by years of experience, a bias against people who are over-qualified, a
            requirement list so long that almost nobody clears all of it. Seven critical skills
            is not a high bar; it is an empty pool, and it is better to know that before the
            role has been open for nine weeks.
          </p>
          <h3>And it refuses to rate what it cannot measure</h3>
          <p>
            Below ${FAIRNESS.insufficient.needs} scored candidates on a role, it will not rate
            distribution at all. It says it does not have enough data and tells you how far off
            it is. On the example role beside this paragraph that means it declines at
            ${JOB.pool.total} — three short.
          </p>
          <p>
            That is the part of this page we would least like to be talked out of. A tool that
            produces a confident fairness rating from ${JOB.pool.total} data points is not a
            more useful tool; it is the same tool with the uncertainty removed.
          </p>
          <p>
            <strong>No demographic data is used, inferred, or held.</strong> Not gender, not
            age, not ethnicity, not a proxy for any of them. There is no field for it, which is
            a stronger statement than a policy about it.
          </p>
        </div>
      </div>
      <div data-reveal="right">
${fairnessComposition()}
        <p class="composition-note">Illustrative report · an invented job description</p>
      </div>
    </div>
  </div>
</section>

<!-- ── 5 · When the model changes ───────────────────────────────────────── -->
<section class="section" id="model-changes">
  <div class="container container--text">
${head({
  eyebrow: 'Change',
  title: 'When the model <em>changes.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        Scoring modifiers are behind feature flags held in the database, so a change to how
        seniority affects a score is a switch with a state and a history rather than a deploy
        nobody recorded. The skill taxonomy is versioned: an ontology version is a thing you can
        name, and two scores computed under different versions are distinguishable.
      </p>
      <p>
        A score computed last month is reproducible because the weights that produced it are
        stored with it. That sentence is the whole of the argument for versioning anything, and
        it is why the audit log above is worth more than the ranking it describes.
      </p>
      <p>
        Data quality is snapshotted rather than assumed, and health checks are logged. Neither
        is interesting until the day something is wrong, which is the only day either matters.
      </p>
    </div>
  </div>
</section>

<!-- ── 6 · What we will not claim ───────────────────────────────────────── -->
<section class="section section--sunken" id="will-not-claim">
  <div class="container container--text">
${head({
  eyebrow: 'The limits',
  title: 'What we <em>will not claim.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        Automated hiring tools are regulated in most of the markets we work in, and the
        distance between “this is logged” and “this is compliant” is where a lot of
        recruitment marketing lives. We would rather describe mechanisms than promise
        outcomes:
      </p>
      <!-- data-claims="negated": this list NAMES the claims we refuse to make,
           so it is exempt from the outcome-claim check in tools/check.mjs. A
           disclaimer that cannot name what it disclaims is not a disclaimer. -->
      <ul data-claims="negated">
        <li>We will tell you what the platform computes and shows. We will not tell you it is
          bias-free, fair by design, or defensible. Those are conclusions about an outcome, and
          they are not ours to draw about your hiring process.</li>
        <li>We will not publish an outcome metric we have not measured — no time saved, no
          quality-of-hire number, no accuracy figure.</li>
        <li>We will not name a customer who has not agreed to be named, and we do not have a
          testimonial on this site because we do not have one we are allowed to print.</li>
        <li>Every person and company in every composition on this site is invented, and
          labelled as invented.</li>
        <li>The platform computes a recommendation and a ranking. It does not make hiring
          decisions. A person at the hiring organisation does, and the responsibility stays
          with them.</li>
      </ul>
      <p>
        The site is currently closed to search engines on purpose, for the same reason: not
        every claim on it has been through review yet.
      </p>
      <p>
        ${arrowLink('The privacy policy, in draft', '/legal/privacy/')}
      </p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Bring the question <em>your security team would ask.</em>',
  lede: 'Thirty minutes on a real requisition, and you can ask about any of the above while looking at it.',
  secondary: 'How matching works',
  secondaryHref: '/product/matching/',
})}`;
}
