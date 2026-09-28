/**
 * product.mjs — /product
 *
 * The whole product in one page: six pillars in DEPENDENCY order, each with one
 * visual and a link to its own page. Pillar 3 makes pillar 2 possible; 1 and 4
 * feed it; 5 governs it; 6 acts on it — and that order is also the homepage's,
 * which is why the two pages do not contradict each other.
 *
 * Custom UI: none. Everything here is a crop of a homepage composition or an
 * existing component (`04 § 3`). The one exception is the screenshot, which is
 * the running app and not a composition — so it carries its own label, and the
 * illustrative-data note moved down to the pillars it actually describes.
 *
 * The overview closes on `ALSO_SHIPPED` — the shipped things no pillar names,
 * looked up from `SHIPPED`. Until 28 Sep 2026 it closed on two "Not yet" cards,
 * in-platform messaging and calendar sync; the maintainer confirmed both live
 * that day, so they moved into the shipped list and the site has no roadmap.
 */

import {
  compositionNote, controlComposition, explainPanel, frame, missionComposition,
  pipelineComposition, poolComposition, resumeComposition, screenshotSlot,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import { ALSO_SHIPPED, DIMENSIONS, EDGE_TYPES } from '../../assets/data/product-demo.js';

export const meta = {
  path: '/product/',
  title: 'The hiring intelligence platform — Transpahire',
  description:
    'Six capabilities, in the order they depend on each other: sourcing, explainable matching, skill intelligence, candidate intelligence, recruiter control and hiring operations.',
};

/* The six pillars, with `09 § 4`'s one-line messaging. Skill Intelligence sits
   directly after Explainable Matching because it answers the question the first
   one provokes — the same reason section 07 follows section 06 on the home
   page. */
const PILLARS = [
  {
    n: '01',
    name: 'Sourcing &amp; Discovery',
    title: 'Two ways to find <em>the same person.</em>',
    body: 'Filter by skills, experience, location, availability, notice period and expected salary — or describe who you need in a sentence. Same tool, either way. Then Always-On Sourcing keeps watching after you stop, and tells you when someone new becomes a strong match.',
    href: '/product/sourcing/',
    linkText: 'Sourcing',
    visual: () => missionComposition(),
  },
  {
    n: '02',
    name: 'Explainable Matching',
    title: 'Every ranking <em>comes apart.</em>',
    body: `A score out of 100 from four weighted dimensions — skill coverage carries ${Math.round(DIMENSIONS[0].weight * 100)}% of it — with every requirement matched to a phrase in the profile, the relationship named, and the section it was drawn from cited. The weights are published.`,
    href: '/product/matching/',
    linkText: 'Explainable matching',
    visual: () => frame({
      ratio: '4 / 3',
      modifier: 'frame--elevated',
      meta: 'app.transpahire.com / jobs / 1042 / matches / sneha-iyer',
      body: explainPanel({ id: 'product-panel', sequenced: false, crop: true }),
    }),
  },
  {
    n: '03',
    name: 'Skill Intelligence',
    title: 'It understands skills, <em>not words.</em>',
    body: `Skills are typed, hierarchical and related to one another by ${EDGE_TYPES.length} weighted relationship types — Docker leads to Kubernetes, React transfers to Vue — with a second graph over job titles on top of it. That relationship is why adjacent experience counts instead of being discarded, and it is what hidden-talent detection is made of. Aligned to ESCO and O*NET, and versioned.`,
    href: '/product/matching/#adjacency',
    linkText: 'How the skill graph works',
    visual: () => poolComposition(),
    /* The pool, not the graph: the graph is on /product/matching at full size,
       and this pillar's claim is what the relationship DOES to a ranking. */
  },
  {
    n: '04',
    name: 'Candidate Intelligence',
    title: 'A profile, <em>not a document.</em>',
    body: 'Résumés become structured profiles, with per-item confidence and the candidate&rsquo;s own review before anything is saved. Then the signals a CV will not give you: seniority alignment, career trajectory, potential, responsiveness and drop-off risk.',
    href: '/product/candidate-intelligence/',
    linkText: 'Candidate intelligence',
    visual: () => resumeComposition({ parallax: false }),
  },
  {
    n: '05',
    name: 'Recruiter Control',
    title: 'You set <em>what matters.</em>',
    body: 'Mark each skill critical, required, preferred or a bonus. Move one and the ranking follows. Simulate a change before you make it, and see how many more qualified people a relaxed requirement would reach.',
    href: '/product/matching/#control',
    linkText: 'Tuning and simulation',
    /* PHASE 4. This was a screenshot slot. The tuner is a working composition
       on two pages and the insights tab it models is shipped, so a labelled
       empty box here was reserving space for something the site already had.
       The screenshot count falls from six to two, as § 3.11 asks. */
    visual: () => controlComposition({ listId: 'pillar-tuning-list', reorderable: false }),
  },
  {
    n: '06',
    name: 'Hiring Operations',
    title: 'Move the right people <em>forward.</em>',
    body: 'Approvals before a job goes live, a job lifecycle with version history, stages you name and order yourself, screener questions, interviews with times and links, structured feedback — and funnel, bottleneck and pool reporting to see whether it worked.',
    href: '/product/hiring-operations/',
    linkText: 'Hiring operations',
    visual: () => pipelineComposition(),
  },
];

const pillars = PILLARS.map((p, i) => `<article class="segment${i % 2 ? ' segment--flip' : ''}">
      <div class="segment__text" data-reveal="${i % 2 ? 'right' : 'left'}" data-reveal-distance="lg">
        <p class="pillar__index">${p.n} · ${p.name}</p>
        <h2 class="h-section pillar__title">${p.title}</h2>
        <p class="body-copy body-copy--lg">${p.body}</p>
        <p class="pillar__link">${arrowLink(p.linkText, p.href)}</p>
      </div>
      <div class="segment__visual" data-reveal="${i % 2 ? 'left' : 'right'}" data-reveal-distance="lg">
${p.visual()}
      </div>
    </article>`).join('\n\n    ');

export function render() {
  return `${pageHead({
    eyebrow: 'Product',
    title: 'An intelligent hiring platform <em>built for modern talent teams.</em>',
    lede: 'Transpahire is a single platform for transparent, AI-native recruitment. It helps talent teams see candidates clearly, match precisely, and hire with the structured trust that an applicant-tracking system alone cannot give them.',
  })}

<section class="section section--tight-top" aria-label="One view of the product">
  <div class="container">
    <div data-reveal="rise">
${screenshotSlot({
  image: {
    src: '/assets/images/image.png',
    width: 1856,
    height: 934,
    alt: 'The Transpahire recruiter app. A DevOps Engineer role’s ranked candidate pool, with one candidate’s drawer open: a match score of 68 ranking first of twenty, the AI rationale naming the skills covered and missing, and a seven-dimension match breakdown.',
  },
})}
      <p class="composition-note">Screenshot · the running product</p>
    </div>
  </div>
</section>

<section class="section section--sunken" aria-label="The six capabilities" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'In dependency order',
  title: 'Six capabilities. <em>Each one needs the one before it.</em>',
  lede: 'The skill graph is what makes the explanation possible; sourcing and candidate intelligence feed it; recruiter control governs it; hiring operations acts on it.',
})}

    ${pillars}
    ${compositionNote()}
  </div>
</section>

<section class="section" aria-label="Also in the platform">
  <div class="container">
${head({
  eyebrow: 'Also in the platform',
  title: 'Beyond the six, <em>already running.</em>',
  lede: 'The parts a team uses every week that do not need a section of their own. Every one of them is live today.',
})}

    <div class="grid grid--2" data-reveal-group data-stagger="fast">
${[ALSO_SHIPPED.slice(0, Math.ceil(ALSO_SHIPPED.length / 2)), ALSO_SHIPPED.slice(Math.ceil(ALSO_SHIPPED.length / 2))].map((list) => `      <ul class="checklist checklist--ruled">
${list.map((item) => `        <li class="checklist__item">${item}</li>`).join('\n')}
      </ul>`).join('\n')}
    </div>

    <p class="mt-12 text-center">${arrowLink('Everything that has shipped', '/changelog/')}</p>
  </div>
</section>

${pageCta({
  title: 'Bring a role <em>you&rsquo;re struggling to fill.</em>',
  lede: 'Thirty minutes. We run one of your open roles through the engine and you read the reasoning yourself.',
  secondary: 'See how matching works',
  secondaryHref: '/product/matching/',
})}`;
}
