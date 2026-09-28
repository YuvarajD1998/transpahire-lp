/**
 * board.mjs — the Stage 2 index: what was built, a responsive viewer, the
 * comparison board (§ 30 of the brief), the design review checklist (§ 31),
 * and the recommendation. The long-form deliverable is prototypes/STAGE-2.md.
 */
import { PAGES } from './shell.mjs';

const VARIATIONS = [
  {
    name: '01 · Editorial', file: 'page-v1.html',
    thesis: 'A publication that argues in type and shows the product at reading size. Nothing pins; the page turns.',
    personality: 'Calm, paper, generous rests, hairlines. The quietest of the three.',
    hero: 'A1: headline at 104px with the support sentence in the right column; the workspace full width beneath, three rows above the fold.',
    product: 'High, but always framed. Six framed compositions, each in flow.',
    interaction: 'Two controls: the tuner (not pinned) and the pool filters, plus the candidate switcher.',
    motion: 'Reveals only. The signature is the stacked composition with sticky captions; nothing is scroll-linked.',
    mobile: 'The stack is the design, so the phone is the desktop minus the columns. Shortest page of the three at 390.',
    strongest: 'Cannot fail. Every state is a still; reduced motion changes nothing; a screen reader hears the same order.',
    risk: 'Restraint reads as safe. Without the pin, "the score, taken apart" is a well-typeset explanation rather than an event.',
    improve: 'Give the signature the time-mode P6 (layers step in on beats when the composition reveals) so it happens once without pinning.',
  },
  {
    name: '02 · Product editorial', file: 'page-v2.html',
    thesis: 'The same publication, but the product is the spectacle: the site opens into the workspace, the score comes apart on a pinned stage, and the tuner is pinned while it re-ranks.',
    personality: 'Editorial type, product density, one cinematic moment. Confident rather than loud.',
    hero: 'A3: compact headline, then the workspace edge to edge with only a route line for chrome. The fold cuts the list mid-row.',
    product: 'Highest. The workspace bleeds; the explain panel runs at full size; the pool carries cited evidence on every row.',
    interaction: 'Four real controls: the tuner with the gate, the what-if marking rows, pool filters, the candidate switcher.',
    motion: 'V2 cinematic on the signature (layers separate and recede; the 87 persists top-right while its parts show); P3 reorder; P2 beats in the panel.',
    mobile: 'Phone-specific hero crop (compact pulse, three rows, drawer sheet ending on the verdict); the signature unpins into the stack; list-first tuner with one sticky control.',
    strongest: 'The first screen proves the product exists and the second screen proves it can be questioned. It is the only variation where the thesis is an experience rather than a claim.',
    risk: 'Two pins cost the visitor their scroll for about four viewports. The stage leaves a void below a short final layer at 1440.',
    improve: 'Trim the pinned tuner to a plain sticky control column (already the case at 768); give the signature a tighter final dwell.',
  },
  {
    name: '03 · Experimental editorial', file: 'page-v3.html',
    thesis: 'Push scale and layering: the evidence chain is the hero, the score becomes structure on scroll, and the interface rearranges itself around what is being examined.',
    personality: 'Diagrammatic, larger, more spatial. The most "designed" of the three.',
    hero: 'A2: the claim, then the chain (row → 87 → four weights → cited line) as one static diagram. The product appears as its argument, not its chrome.',
    product: 'Medium in the hero (no chrome), highest in the signature, where the list stays as a ghost while the score is taken apart.',
    interaction: 'Same four controls as 02.',
    motion: 'V3 experimental: the 87 scales past itself before the weights grow out of it; skill rows arrive in sequence; the evidence slides in from the right; the candidate view rises like a phone.',
    mobile: 'The chain stacks vertically; the signature unpins into the stack; the rest matches 02.',
    strongest: 'The strongest single moment: the 87 becoming four bars is the "score is constructed" idea made literal.',
    risk: 'Mid-transition overlap between two layers is legible at the state points and busy between them. The hero shows no chrome, so the four-second question "is it real software?" is answered one screen later.',
    improve: 'Hold each layer alone for longer (narrower crossfade windows), and put A3\'s workspace behind the chain at reduced opacity so the chrome is present.',
  },
];

const CRITERIA = [
  ['Design thesis', 'thesis'], ['Visual personality', 'personality'], ['Hero behaviour', 'hero'],
  ['Product visibility', 'product'], ['Interaction model', 'interaction'], ['Motion language', 'motion'],
  ['Mobile behaviour', 'mobile'], ['Strongest characteristic', 'strongest'], ['Main risk', 'risk'],
  ['Where it could be improved', 'improve'],
];

/* The § 31 checklist, assessed on the built pages at 1440 and 390. */
const CHECK = [
  ['First impression', [
    ['Immediately recognisable as Transpahire', '✓', '✓', '✓', 'Wordmark, serif accent, indigo, warm paper.'],
    ['Product visible immediately', '✓', '✓', '△', 'A2 shows the argument first; chrome arrives one screen later.'],
    ['Central differentiator obvious', '△', '✓', '✓', '01 says it; 02 and 03 show it on the second screen.'],
    ['Avoids generic AI aesthetics', '✓', '✓', '✓', 'No gradient, glow, glass, particles, sparkle, typing.'],
  ]],
  ['Visual', [
    ['Hierarchy obvious', '✓', '✓', '✓', ''],
    ['Typography carries enough weight', '✓', '✓', '✓', 'Display at 104px, H2 at 64px, mono at 12px.'],
    ['Composition intentional', '✓', '✓', '△', '03\'s layer overlap between states reads as accident to some eyes.'],
    ['Not too much empty space', '△', '△', '△', 'Pinned stage leaves a void below a short final layer; 01 has long rests by design.'],
    ['Not too much decoration', '✓', '✓', '✓', 'One wash in the hero, one on the closing band.'],
  ]],
  ['Product', [
    ['Real product UI visible', '✓', '✓', '✓', 'Every composition is a production renderer or a restaging of one.'],
    ['Product understandable', '✓', '✓', '✓', ''],
    ['Evidence visible', '✓', '✓', '✓', 'The highlighter appears on every cited line and nowhere else.'],
    ['Score believable', '✓', '✓', '✓', '87 everywhere; six candidates at their published scores.'],
  ]],
  ['Interaction', [
    ['Every interaction communicates something', '✓', '✓', '✓', 'Tuner, what-if, filters, switcher. Nothing decorative.'],
    ['Tuner actually changes the result', '✓', '✓', '✓', 'Kubernetes → critical promotes Rahul Verma; Kafka → critical gates five.'],
    ['Signature sequence explains the score', '✓', '✓', '✓', 'List → 87 → weights → skills → cited line → candidate view.'],
  ]],
  ['Motion', [
    ['Motion communicates', '✓', '✓', '△', '03 pushes furthest; two of its moves are closer to spectacle than explanation.'],
    ['Restrained', '✓', '✓', '△', ''],
    ['Predictable', '✓', '✓', '△', ''],
    ['Reduced motion works', '✓', '✓', '✓', 'Every stage unpins; layers render complete; verified with the OS query emulated.'],
  ]],
  ['Mobile', [
    ['First screen compelling', '✓', '✓', '✓', 'Headline, one sentence, one CTA, job header and two rows at 390×844.'],
    ['Product visible', '✓', '✓', '△', 'A2\'s chain stacks; the workspace is below it.'],
    ['Signature still works', '✓', '✓', '✓', 'Six stacked frames with captions; no scroll-linking below 700px.'],
    ['Page substantially shorter and clearer', '△', '△', '△', 'About 17,400px at 390 against 19,200 today: shorter, not yet the 14,000 target.'],
  ]],
];

export function board({ base = '/' } = {}) {
  const link = (f) => `${base}prototypes/${f}`;
  const groups = [
    ['A · Hero', 'hero', 'Three compositions inside the recommended direction, not three cosmetic variations.'],
    ['B · The score, taken apart', 'score', 'Three motion executions of the signature, and the static composition every one of them falls back to.'],
    ['C · The tuner', 'tuner', 'The proposed fixture: the advertised move reorders, and a critical tier gates.'],
    ['D · The complete page', 'page', 'Eight scenes, three tempos, three visual executions.'],
  ];

  const cards = groups.map(([title, group, note]) => `
    <div class="board__group">
      <p class="eyebrow">${title}</p>
      <p class="board__note">${note}</p>
      <ul class="board__links">
${PAGES.filter((p) => p.group === group).map((p) => `        <li><a class="board__link" href="${link(p.file)}">${p.name.replace(/^[^·]+· /, '')}</a></li>`).join('\n')}
      </ul>
    </div>`).join('\n');

  const compare = `<table class="cmp">
  <thead><tr><th scope="col"></th>${VARIATIONS.map((v) => `<th scope="col"><a href="${link(v.file)}">${v.name}</a></th>`).join('')}</tr></thead>
  <tbody>
${CRITERIA.map(([label, key]) => `    <tr><th scope="row">${label}</th>${VARIATIONS.map((v) => `<td>${v[key]}</td>`).join('')}</tr>`).join('\n')}
  </tbody>
</table>`;

  const checklist = CHECK.map(([group, rows]) => `    <tbody>
      <tr class="chk__group"><th scope="rowgroup" colspan="5">${group}</th></tr>
${rows.map(([q, a, b, c, note]) => `      <tr><th scope="row">${q}</th><td>${a}</td><td>${b}</td><td>${c}</td><td class="chk__note">${note}</td></tr>`).join('\n')}
    </tbody>`).join('\n');

  const options = PAGES.filter((p) => p.file !== 'index.html' && p.file !== 'stage-2.html').map((p) => `<option value="${link(p.file)}"${p.file === 'page-v2.html' ? ' selected' : ''}>${p.name}</option>`).join('');

  return `<section class="scene proto-intro board__intro"><div class="container">
  <p class="eyebrow">Stage 2 · creative exploration, visual directions and interactive prototyping</p>
  <h1 class="h-display board__title">The score is <em>the protagonist.</em></h1>
  <p class="lede board__lede">Eleven prototypes of one direction, "the brief", built from the real product data and the production compositions. Open each one; the floating tag brings you back here. The written deliverable is <code>prototypes/STAGE-2.md</code>.</p>
  <div class="board__groups">
${cards}
  </div>
  <p class="board__how"><span class="label">How to run</span> <code>node tools/serve.mjs</code> then <code>http://localhost:4321/prototypes/</code>. Edit <code>prototypes/lib/</code> and rebuild with <code>node prototypes/build.mjs</code>. Nothing in production is touched.</p>
</div></section>

<section class="scene board__viewer" id="responsive"><div class="container">
  <p class="eyebrow">Responsive views</p>
  <h2 class="h-section">Four widths, <em>one page.</em></h2>
  <p class="lede">Each frame is a live copy of the chosen prototype at a real device width, scaled to fit. Scroll inside a frame. Reduced motion follows your system setting.</p>
  <p class="board__pick"><label for="board-page">Prototype</label> <select id="board-page" data-board-pick>${options}</select></p>
  <div class="frames">
    <figure class="devframe devframe--390"><figcaption><span class="label">390 × 844</span></figcaption><div class="devframe__crop"><iframe title="390 wide" loading="lazy" data-board-frame></iframe></div></figure>
    <figure class="devframe devframe--768"><figcaption><span class="label">768 × 1024</span></figcaption><div class="devframe__crop"><iframe title="768 wide" loading="lazy" data-board-frame></iframe></div></figure>
    <figure class="devframe devframe--1280"><figcaption><span class="label">1280 × 800</span></figcaption><div class="devframe__crop"><iframe title="1280 wide" loading="lazy" data-board-frame></iframe></div></figure>
    <figure class="devframe devframe--1440"><figcaption><span class="label">1440 × 900</span></figcaption><div class="devframe__crop"><iframe title="1440 wide" loading="lazy" data-board-frame></iframe></div></figure>
  </div>
</div></section>

<section class="scene board__compare" id="compare"><div class="container">
  <p class="eyebrow">Comparison board</p>
  <h2 class="h-section">Three executions, <em>no score.</em></h2>
  <p class="lede">The differences, so the decision can be made on them. The recommendation follows the checklist.</p>
  <div class="cmp__wrap">${compare}</div>
</div></section>

<section class="scene board__check" id="checklist"><div class="container">
  <p class="eyebrow">Design review checklist</p>
  <h2 class="h-section">Assessed on the built pages, <em>not on paper.</em></h2>
  <p class="lede">✓ passes · △ passes with a note. Columns are the three complete pages.</p>
  <div class="cmp__wrap"><table class="chk">
    <thead><tr><th scope="col"></th><th scope="col">01</th><th scope="col">02</th><th scope="col">03</th><th scope="col">Note</th></tr></thead>
${checklist}
  </table></div>
</div></section>

<section class="scene board__rec on-ink" id="recommendation"><div class="container">
  <p class="eyebrow">Recommended prototype</p>
  <h2 class="h-section">02, Product editorial, <em>is the strongest candidate for Stage 3.</em></h2>
  <div class="board__reasons">
    <p class="lede">Because it is the only one where the site's thesis is something that happens rather than something that is said. The first screen is the real workspace at real width, so the buyer's four-second question is answered before a word is read. The second screen takes the 87 apart on a pinned stage, so "explains itself" is an experience. The sixth scene lets the visitor change what counts and watch a name move, and watch a critical requirement empty the list.</p>
    <p class="body-copy">It takes 01's discipline (every state is a still, every value is the data module's, reduced motion is the stack) and 03's single best move is worth stealing: the V3 mapping in which the 87 grows before the weights emerge from it should replace V2's plain crossfade between layers 2 and 3. The rest of 03 is the answer to "how far can we push it", and the answer is: to there, not past it.</p>
    <p class="body-copy">What it needs before Stage 3 treats it as the page: the pinned tuner reduced to a sticky control column (the pin adds nothing the sticky column does not), the stage's final dwell tightened, the three findings in <code>STAGE-2.md</code> § 12 settled, and the proposed tuner fixture adopted through <code>tools/rankings.mjs</code> so the production page and the prototype agree.</p>
  </div>
</div></section>`;
}
