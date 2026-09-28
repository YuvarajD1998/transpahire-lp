/**
 * for-teams.mjs — /for-teams
 *
 * The primary buyer's page: the workflow end to end as ONE narrative rather
 * than six pillars. Requirement → sourcing → ranked pool → explanation →
 * tuning → shortlist → pipeline → hire.
 *
 * PHASE 4 SPLIT IT. The old page carried two different arguments to two
 * different people: a recruiter's fear (volume, and being unable to defend a
 * shortlist) and a hiring manager's (being handed six names and no reasoning).
 * The second half was buried at the bottom, under the first. It has its own
 * page now — /for-hiring-managers — and this one keeps the recruiter frame and
 * gains the operational block a recruiter's manager asks about: roles,
 * reporting, export, and an honest answer about integrations.
 *
 * Reuses components entirely: `.steps` with the hairline connector, and one
 * composition per phase. No custom UI (`04 § 3`).
 *
 * One line is used here and nowhere else: "Built for hiring decisions your team
 * can stand behind." `09 § 8` sanctions it as a section closer and warns that
 * it sits a hair from *defensible*, which is still legally gated even after
 * Phase 4's mechanism/outcome distinction — so it appears once, as a closer, and
 * never beside fairness, audit or compliance language. The links to /trust in
 * the cards above it are links, not adjacent copy.
 */

import {
  argumentComposition, compositionNote, controlComposition, pipelineComposition,
  poolComposition, requisitionComposition,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import { ORG_ROLES } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/for-teams/',
  title: 'For recruiters and talent teams — Transpahire',
  description:
    'You read forty CVs to find six. Read six arguments instead. The whole workflow, from requisition to hire, as one narrative.',
};

const PHASES = [
  {
    n: '01',
    title: 'Write the role once',
    body: 'Upload the job description and the skills come out tiered — critical, required, preferred, bonus. The optimizer flags the problems: too many criticals, a near-impossible combination, no soft skills at all.',
    visual: () => requisitionComposition(),
    reveal: 'right',
  },
  {
    n: '02',
    title: 'Get a pool, not an inbox',
    body: 'Every candidate in the database is scored against the role and ordered. Nothing waits for an application, and nobody is filtered out by a keyword they happened not to type — though a candidate missing a critical requirement is dropped before scoring, on the record.',
    visual: () => poolComposition(),
    reveal: 'left',
  },
  {
    n: '03',
    title: 'Read six arguments',
    body: 'Each position on the list opens into its reasoning: every requirement matched to a phrase in the candidate&rsquo;s own profile, the relationship named, the section it came from cited, and four signals the CV does not carry.',
    visual: () => argumentComposition(),
    reveal: 'right',
  },
  {
    n: '04',
    title: 'Disagree with it',
    body: 'Move a skill&rsquo;s importance and the ranking follows. Test a relaxed requirement before you change the job. The engine does the working; the decision stays where it was.',
    visual: () => controlComposition(),
    reveal: 'left',
  },
  {
    n: '05',
    title: 'Run the hire',
    body: 'Approvals before publish, stages your team names and orders, screener questions, interviews with times and links, structured feedback — and funnel and bottleneck reporting when you want to know whether any of it worked.',
    visual: () => pipelineComposition(),
    reveal: 'right',
  },
];

export function render() {
  return `${pageHead({
    eyebrow: 'For recruiters and talent teams',
    title: 'You read forty CVs to find six. <em>Read six arguments instead.</em>',
    lede: 'Built for teams hiring fifty to five hundred people a year, with structured skills requirements, in markets where the person you need has already been contacted by four other companies this week.',
  })}

<section class="section section--tight-top" aria-label="The workflow" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'End to end',
  title: 'One requisition, <em>from written to signed.</em>',
  lede: 'Five phases. Nothing here is a separate tool, and nothing here needs a second system to finish.',
})}

${PHASES.map((p, i) => `    <article class="segment${i % 2 ? ' segment--flip' : ''}">
      <div class="segment__text" data-reveal="${p.reveal === 'right' ? 'left' : 'right'}" data-reveal-distance="lg">
        <p class="pillar__index">Phase ${p.n}</p>
        <h3 class="h-section pillar__title">${p.title}</h3>
        <p class="body-copy body-copy--lg">${p.body}</p>
      </div>
      <div class="segment__visual" data-reveal="${p.reveal}" data-reveal-distance="lg">
${p.visual()}
      </div>
    </article>`).join('\n\n')}

    ${compositionNote()}
  </div>
</section>

<section class="section section--sunken">
  <div class="container">
${head({
  eyebrow: 'Running it as a team',
  title: 'Six roles, <em>and one audit trail.</em>',
  lede: 'The operational half of the question, answered plainly rather than in a security questionnaire.',
})}

    <div class="grid grid--3" data-reveal-group data-stagger="normal">
      <article class="card hover-lift">
        <h3 class="h-card card__title">Roles and permissions</h3>
        <p class="body-copy card__body">${ORG_ROLES.join(', ')}. Access to a job is granted job by job, and a recruiter who is not on a job is refused it rather than shown a filtered version of it.</p>
        <p class="card__benefit">${arrowLink('Who can see what', '/trust/#access')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Reporting</h3>
        <p class="body-copy card__body">Funnel and conversion by job, stage bottlenecks, time in stage, pool distribution and a skill scarcity index. No published benchmark numbers, because we have not measured any.</p>
        <p class="card__benefit">${arrowLink('Reporting and pool intelligence', '/product/analytics/')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Getting data out</h3>
        <p class="body-copy card__body">Search results and pools export, and every export is logged with who ran it and how many rows came back. That log is a feature for you, not just for us.</p>
        <p class="card__benefit">${arrowLink('What gets logged', '/trust/#logged')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Getting data in</h3>
        <p class="body-copy card__body">An import wizard takes a list you already have into a talent pool, and keeps the import history so you know where a pool came from. Imported people arrive marked unclaimed.</p>
        <p class="card__benefit">${arrowLink('The two consent bases', '/product/sourcing/#consent')}</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Integrations</h3>
        <p class="body-copy card__body">One: interviews sync to your calendar. Beyond that there is a documented API contract and no shipped integration with an HRIS, a job board or a Slack workspace. If one of those is a requirement, this is not ready for you yet.</p>
        <p class="card__benefit">A missing integration is cheaper to hear about now.</p>
      </article>
      <article class="card hover-lift">
        <h3 class="h-card card__title">Languages</h3>
        <p class="body-copy card__body">English only, in the interface. Location aliases resolve across the names people actually type — Bengaluru and Bangalore are one place — but there is no second interface language and no plan published for one.</p>
        <p class="card__benefit">Also cheaper to hear about now.</p>
      </article>
    </div>

    <div class="pair mt-16">
      <div data-reveal="left">
        <p class="lede measure">
          Built for hiring decisions <em>your team can stand behind.</em>
        </p>
      </div>
      <div data-reveal="right">
        <p class="body-copy measure">
          A hiring manager does not need a seat in the sourcing tool. They need the argument
          for each of six people, in a form they can read in four minutes and question in two —
          which is a different page, and it is ${arrowLink('over here', '/for-hiring-managers/')}.
        </p>
      </div>
    </div>
  </div>
</section>

${pageCta({
  title: 'Bring a role <em>you&rsquo;re struggling to fill.</em>',
  lede: 'Thirty minutes on one of your open requisitions. You read the reasoning; we answer for it.',
  secondary: 'See the whole platform',
  secondaryHref: '/product/',
})}`;
}
