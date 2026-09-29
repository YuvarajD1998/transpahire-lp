/**
 * check.mjs — the structural checks CLAUDE.md § 6 step 6 asks for, run over
 * every generated page rather than by eye over one of them.
 *
 * Not a substitute for opening the site: keyboard behaviour, reduced motion and
 * the three viewport widths still have to be exercised in a browser. This closes
 * the class of defect that is invisible in a browser and fatal in a screen
 * reader — a skipped heading level, a duplicate id, a dead link, an aria
 * reference pointing at nothing.
 *
 * Run:  node tools/check.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BANDS, CANDIDATES, RANKINGS, TUNABLE } from '../assets/data/product-demo.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const PAGES = [
  'index.html',
  'product/index.html',
  'product/matching/index.html',
  'product/sourcing/index.html',
  'product/candidate-intelligence/index.html',
  'product/hiring-operations/index.html',
  'product/analytics/index.html',
  'for-teams/index.html',
  'for-hiring-managers/index.html',
  'for-candidates/index.html',
  'trust/index.html',
  'pricing/index.html',
  'changelog/index.html',
  'check/job-description/index.html',
  'check/resume/index.html',
  'demo/index.html',
  'about/index.html',
  'legal/index.html',
  'legal/privacy/index.html',
  'legal/terms/index.html',
  'legal/terms/organisations/index.html',
  'legal/terms/candidates/index.html',
  'legal/cookies/index.html',
  'motion-lab.html',
];

/** Files the source-level checks read. The stale-fact tripwire and the banned
    vocabulary check run over `src/` and the data module, because a defect in a
    module header is a defect the next session will read as instruction. */
const SOURCE_GLOBS = ['src/lib', 'src/pages', 'assets/data', 'assets/js/modules'];

const problems = [];
const note = (file, message) => problems.push(`${file}: ${message}`);

/** Void elements never need closing. */
const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'rect', 'circle', 'line',
  'polygon', 'polyline', 'ellipse', 'use', 'stop',
]);

function tagBalance(html, file) {
  const stack = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const [, closing, rawName, attrs, selfClose] = m;
    const name = rawName.toLowerCase();
    if (VOID.has(name) || selfClose === '/') continue;
    if (name === 'br' || attrs.includes('/>')) continue;
    if (closing) {
      const last = stack.pop();
      if (last !== name) {
        note(file, `tag mismatch: closed </${name}> while inside <${last ?? 'nothing'}>`);
        return;
      }
    } else {
      stack.push(name);
    }
  }
  if (stack.length) note(file, `unclosed: ${stack.join(' > ')}`);
}

function headings(html, file) {
  const found = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  const h1s = found.filter((l) => l === 1).length;
  if (h1s !== 1) note(file, `expected exactly one <h1>, found ${h1s}`);

  let previous = 0;
  found.forEach((level) => {
    if (previous && level > previous + 1) {
      note(file, `heading level skipped: h${previous} → h${level}`);
    }
    previous = level;
  });
}

function ids(html, file) {
  const seen = new Map();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  }
  [...seen].filter(([, n]) => n > 1).forEach(([id, n]) => note(file, `duplicate id "${id}" (${n}×)`));
  return new Set(seen.keys());
}

function ariaRefs(html, file, idSet) {
  for (const attr of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
    for (const m of html.matchAll(new RegExp(`${attr}="([^"]+)"`, 'g'))) {
      m[1].split(/\s+/).forEach((id) => {
        if (!idSet.has(id)) note(file, `${attr}="${id}" points at no element`);
      });
    }
  }
}

function links(html, file) {
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const href = m[1];
    if (href === '#' || href === '') {
      note(file, 'dead link: href="#"');
      continue;
    }
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const [path] = href.split('#');
    if (path.startsWith('/assets/') || path === '/site.webmanifest') {
      if (!existsSync(join(ROOT, path.slice(1)))) note(file, `missing asset: ${path}`);
      continue;
    }
    const target = path.endsWith('/') ? join(path.slice(1), 'index.html') : path.slice(1);
    if (!existsSync(join(ROOT, target))) note(file, `broken internal link: ${href}`);
  }
}

function images(html, file) {
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt=/.test(m[1])) note(file, 'img without alt');
  }
}

function frames(html, file) {
  const frameCount = (html.match(/class="frame[ "]/g) || []).length;
  const ratioCount = (html.match(/--ratio:/g) || []).length;
  if (frameCount !== ratioCount) {
    note(file, `${frameCount} frames but ${ratioCount} --ratio declarations`);
  }
}

/** The motion budgets that are a rule rather than a preference. */
function motionBudgets(html, file) {
  const blur = (html.match(/data-reveal="blur"/g) || []).length;
  if (blur > 3) note(file, `data-reveal="blur" used ${blur}× (budget is 3 per page)`);

  const paths = (html.match(/class="edge__path/g) || []).length;
  if (paths > 6) note(file, `${paths} P4 paths (cap is 6 per page)`);

  /* P5 · drawer reveal. One per page. A page with two drawers sliding in has an
     animation, not a statement — docs/motion-system.md § 3. */
  const drawers = (html.match(/data-drawer-reveal/g) || []).length;
  if (drawers > 1) note(file, `${drawers} P5 drawer reveals (cap is 1 per page)`);

  /* P6 · staged layers. One per page. Two pinned stages on one page is a
     scrolljacked site; one is a signature — docs/motion-system.md § 3. */
  const stages = (html.match(/data-signature\b/g) || []).length;
  if (stages > 1) note(file, `${stages} P6 stages (cap is 1 per page)`);
}

/**
 * PHASE 6 · THE STAGE'S TWO CLOCKS, AND THE ONE NUMBER THEY SHARE.
 *
 * The native scroll timeline in motion.css has to hard-code the header height
 * — `view(block 64px 0px)` — because animation-timeline cannot read a custom
 * property. The listener in scene.js reads `--header-h` at run time, so it
 * cannot drift; the stylesheet can. This asserts the two agree, so a header
 * that grows to 72px fails the check until the timeline follows.
 *
 * The same page-level check asserts the mapping's boundaries in motion.css are
 * the `data-thresholds` every stage carries: the rail and the layers must
 * change state at the same scroll positions.
 */
function stageClocks(pages) {
  const tokens = readFileSync(join(ROOT, 'assets/css/tokens.css'), 'utf8');
  const motion = readFileSync(join(ROOT, 'assets/css/motion.css'), 'utf8');
  const headerH = /--header-h:\s*(\d+)px/.exec(tokens)?.[1];
  const inset = /animation-timeline:\s*view\(block (\d+)px 0px\)/.exec(motion)?.[1];
  if (!headerH) note('assets/css/tokens.css', 'could not read --header-h');
  if (!inset) note('assets/css/motion.css', 'could not read the view() timeline inset for P6');
  if (headerH && inset && headerH !== inset) {
    note('assets/css/motion.css', `P6 timeline inset is ${inset}px but --header-h is ${headerH}px — the two clocks disagree (see motion.css § 4b P6)`);
  }
  const bounds = [...new Set([...motion.matchAll(/\(var\(--p\) - (0\.\d+)\)/g)].map((m) => m[1]))].sort();
  pages.forEach(({ file, html }) => {
    for (const m of html.matchAll(/data-thresholds="([^"]+)"/g)) {
      const own = m[1].split(',').map((x) => x.trim()).sort();
      if (own.join() !== bounds.join()) {
        note(file, `data-thresholds="${m[1]}" does not match the P6 mapping in motion.css (${bounds.join(',')})`);
      }
    }
  });
}

/** Buttons and inputs must be real elements, and every input must have a label. */
function controls(html, file) {
  for (const m of html.matchAll(/<input\b([^>]*)>/g)) {
    const attrs = m[1];
    const type = /type="([^"]+)"/.exec(attrs)?.[1];
    if (type === 'hidden') continue;
    const id = /\sid="([^"]+)"/.exec(attrs)?.[1];
    const labelled =
      (id && new RegExp(`for="${id}"`).test(html)) ||
      /aria-label(?:ledby)?=/.test(attrs) ||
      // A wrapped input inside <label> is labelled by its own text.
      new RegExp(`<label[^>]*>(?:(?!</label>)[\\s\\S])*?${escapeRe(m[0])}`, 'm').test(html);
    if (!labelled) note(file, `input has no label: ${m[0].slice(0, 70)}`);
  }
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Every `<div class="workspace"…>` … matching `</div>`, by div depth. */
function workspaceBlocks(html) {
  const out = [];
  /* PHASE 6: `class="workspace workspace--bleed"` was the hero's until D15
     made the hero a screenshot; a matcher that only knew the bare class
     stopped checking the one page it was written for the moment the hero
     gained a modifier. Keep the modifier clause for the next one. */
  const open = /<div\b[^>]*class="workspace(?: [^"]*)?"[^>]*>/g;
  let m;
  while ((m = open.exec(html))) {
    let depth = 1;
    const tags = /<(\/?)div\b[^>]*>/g;
    tags.lastIndex = m.index + m[0].length;
    let t;
    while (depth > 0 && (t = tags.exec(html))) {
      depth += t[1] ? -1 : 1;
    }
    out.push(html.slice(m.index, tags.lastIndex));
  }
  return out;
}

/**
 * PHASE 5 · THE HERO MAY BE DENSE; IT MAY NOT BE INTERACTIVE.
 *
 * `docs/phase-5.md` § 3.5 and § 8, and `CLAUDE.md` § 5. `jobWorkspace()` renders
 * a job header, a pulse strip, five tabs, a search field, an origin segmented
 * control, six `Move to…` affordances and a tabbed drawer. Every one of those is
 * a real control in the product and every one of them is a SPAN here.
 *
 * Two reasons, and the second is the one a checker is needed for. A control that
 * looks operable and is not is worse than a static image. And a real <button> in
 * the hero is a focus stop that goes nowhere — the composition would add a dozen
 * of them before the first CTA, which is a keyboard user's whole impression of
 * the page.
 *
 * The composition is assembled from shared sub-components, so this can be
 * violated by a change somewhere else entirely — which is exactly the class of
 * defect a check is for. tools/audit.mjs asserts the same thing over the
 * rendered tree, where it also catches a stray tabindex.
 */
function inertWorkspace(html, file) {
  /* Scoped to `.workspace` rather than to the hero, because the rule is about
     the composition and the composition is reusable — the lab page runs it too.
     The block is found by walking <div> nesting rather than by matching an
     indented closing tag: the first version did the latter, and on the lab page,
     where the composition sits four levels deeper, it ran past the end of the
     composition and flagged the Replay button. */
  for (const block of workspaceBlocks(html)) {
    for (const tag of ['button', 'select', 'textarea', 'input', 'a ']) {
      if (new RegExp(`<${tag}`, 'i').test(block)) {
        note(file, `<${tag.trim()}> inside .workspace — the hero may be dense, it may not be interactive (CLAUDE.md § 5)`);
      }
    }
    if (/tabindex="(?!-1)/.test(block)) {
      note(file, 'a focusable tabindex inside .workspace — that is a focus stop that goes nowhere');
    }
    /* No count-up on the pulse tiles: the figure is a state, not an arrival, and
       an animation that cannot say what it communicates gets deleted. */
    const pulse = /<div class="pulse"[\s\S]*?<\/div>\s*<\/div>/.exec(block);
    if (pulse && /data-count=/.test(pulse[0])) {
      note(file, 'data-count inside the pulse strip — a pulse figure is a state, not an arrival (§ 3.5)');
    }
  }
}

/** Every page carries the same head contract, and stays out of the index. */
function headContract(html, file) {
  const required = [
    ['<title>', 'title'],
    ['name="description"', 'meta description'],
    ['rel="canonical"', 'canonical'],
    ['name="robots" content="noindex', 'noindex robots tag'],
    ['property="og:title"', 'og:title'],
    ['name="viewport"', 'viewport'],
    ['/assets/css/tokens.css', 'tokens.css'],
    ['/assets/css/sections.css', 'sections.css'],
  ];
  required.forEach(([needle, label]) => {
    if (!html.includes(needle)) note(file, `head is missing ${label}`);
  });

  const order = ['tokens.css', 'base.css', 'motion.css', 'components.css', 'sections.css'];
  const positions = order.map((f) => html.indexOf(f));
  for (let i = 1; i < positions.length; i += 1) {
    if (positions[i] < positions[i - 1]) {
      note(file, `stylesheet order broken at ${order[i]} — cascade order is load order`);
      break;
    }
  }
}

/* ==========================================================================
   PHASE 4 — the three source-level checks
   --------------------------------------------------------------------------
   The nine defects Phase 4 corrected were not authoring mistakes. They were the
   correct output of a process pointed at a stale planning document, and a
   process that cannot notice a stale fact will produce them again.

   These three are crude, and between them they would have caught six of the
   nine. `docs/phase-4.md` § 8.6.
   ========================================================================== */

/** Every source file the three checks below read. */
function sourceFiles() {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(rel);
      else if (/\.(mjs|js)$/.test(entry.name)) out.push(rel);
    }
  };
  SOURCE_GLOBS.forEach((g) => { if (existsSync(join(ROOT, g))) walk(g); });
  return out;
}

/**
 * 1 · THE STALE-FACT TRIPWIRE.
 *
 * A list of strings that were true when Phase 2 was written and are false now.
 * Each entry names the fact that replaced it, so the failure message teaches
 * rather than just blocking. Add to this list every time a fact changes: the
 * cost of an entry is one line and the cost of a stale claim is a page.
 *
 * The check runs over SOURCE, not over the built HTML, because a stale fact in a
 * module header is a stale fact the next session reads as instruction.
 *
 * THE ESCAPE HATCH IS DELIBERATE AND NARROW. A comment that says "the old copy
 * claimed X, and X was wrong" necessarily contains X, and losing those comments
 * would lose the reasoning that is the whole point of recording a correction.
 * So a line carrying the literal marker `[STALE-OK]` is skipped — one marker,
 * one line, greppable, and every use of it has to be a sentence explaining why
 * the stale string is there. It is not a way to turn the check off.
 */
const STALE = [
  ['five dimensions',      'four weighted dimensions — docs/phase-4.md § 1.1'],
  ['Five dimensions',      'four weighted dimensions — docs/phase-4.md § 1.1'],
  ['five named dimensions', 'four weighted dimensions — docs/phase-4.md § 1.1'],
  ['consented profiles only', 'two consent bases, both stated — docs/phase-4.md § 1.4'],
  ['Consented profiles',   'two consent bases, both stated — docs/phase-4.md § 1.4'],
  ['three confirmed edges', 'nine SkillRelationType values — docs/phase-4.md § 1.2'],
  ['three relationship types', 'nine SkillRelationType values — docs/phase-4.md § 1.2'],
  ['Weak Match',           'Possible — the product never shows a user "Weak" (§ 1.12)'],
  ['sync is not connected', 'calendar sync is live — docs/phase-4.md § 1.3, 28 Sep 2026'],
  ['the thread is not',    'in-platform messaging is live — docs/phase-4.md § 1.3, 28 Sep 2026'],
  ['roadmap is two items', 'there is no roadmap; both items shipped — docs/phase-4.md § 1.3'],
  ['pending an interface specification', 'the browser extension is a screenshot on /product/sourcing — 28 Sep 2026'],
];

/**
 * Sections listed as SHIPPED in `docs/phase-4.md` § 1.3 may not be marked
 * placeholder. A placeholder classification on a live capability is the specific
 * defect that made the site undersell the product for a whole phase.
 */
const SHIPPED_WORDS = [
  'notification', 'notifications', 'interview scheduling', 'job alerts',
  'sourcing agent', 'employer review', 'employer reviews', 'talent pool',
  'saved search', 'screener question', 'GDPR', 'fairness',
  'calendar sync', 'in-platform messaging',
];

function staleFacts(files) {
  files.forEach((file) => {
    const text = readFileSync(join(ROOT, file), 'utf8');
    text.split('\n').forEach((line, i) => {
      if (line.includes('[STALE-OK]')) return;
      STALE.forEach(([needle, replacement]) => {
        if (line.includes(needle)) {
          note(file, `line ${i + 1}: stale fact "${needle}" — the current fact is: ${replacement}`);
        }
      });
    });
  });
}

/**
 * 2 · PLACEHOLDER ON A SHIPPED CAPABILITY.
 *
 * `data-content="placeholder"` means "exists only to demonstrate layout". Two
 * legitimate uses survive: the customer logo strip, and the demo form's note.
 * Anything else that carries it alongside a word from SHIPPED_WORDS is a live
 * feature the site is apologising for.
 */
function placeholderOnShipped(files) {
  files.forEach((file) => {
    const text = readFileSync(join(ROOT, file), 'utf8');
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (!line.includes('data-content="placeholder"')) return;
      /* Look at the placeholder-marked element and the twelve lines after it —
         far enough to reach the copy inside it, short enough not to catch the
         next section. */
      const block = lines.slice(i, i + 12).join(' ').toLowerCase();
      const hit = SHIPPED_WORDS.find((w) => block.includes(w.toLowerCase()));
      if (hit) {
        note(file, `line ${i + 1}: data-content="placeholder" on a block mentioning "${hit}", which docs/phase-4.md § 1.3 lists as shipped`);
      }
    });
  });
}

/**
 * 3 · THE BANNED VOCABULARY.
 *
 * The product's copy layer bans implementation vocabulary from anything a user
 * reads, and asserts it in a spec file. The site inherits the rule so a visitor
 * who converts meets the same words on day one.
 *
 * Three of the product's banned words are permitted here and the deviation is
 * recorded with its reason in docs/glossary.md: `agent`, `semantic` and `model`
 * are load-bearing on a marketing site that is explaining how the thing works.
 * The rest are not.
 *
 * Runs over the RENDERED page rather than the source, because a comment in a
 * module header explaining why a word is banned necessarily contains the word.
 */
const BANNED = ['embedding', 'vector', 'prompt', 'cosine', 'context window', 'LLM'];

function bannedVocabulary(html, file) {
  /* Strip comments, then look only at text a visitor can read. */
  const visible = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ');

  BANNED.forEach((word) => {
    const re = new RegExp(`\\b${word.replace(' ', '\\s+')}\\b`, 'i');
    if (re.test(visible)) {
      note(file, `banned implementation vocabulary in visible copy: "${word}" — see docs/glossary.md`);
    }
  });

  /* The outcome claims the site may never make. A mechanism claim is permitted;
     a claim about the result is not (CLAUDE.md § 7).

     ONE EXEMPTION, and it is the reason the rule is worth having: an element
     marked `data-claims="negated"` may contain these phrases, because /trust's
     best paragraph is the one that LISTS them as things we will not say. A
     disclaimer that cannot name what it disclaims is not a disclaimer. The
     attribute has to be on the element, so the exemption is visible in the
     markup rather than inferred from a nearby "not". */
  const negated = visible.replace(
    /<[^>]*data-claims="negated"[^>]*>[\s\S]*?<\/(ul|ol|p|div|section)>/g,
    ' '
  );
  const OUTCOME = ['bias-free', 'fair by design', 'enterprise-grade', 'fully compliant'];
  OUTCOME.forEach((phrase) => {
    if (new RegExp(phrase.replace('-', '[- ]'), 'i').test(negated)) {
      note(file, `outcome claim in visible copy: "${phrase}" — CLAUDE.md § 7 permits mechanism claims only`);
    }
  });
}

/**
 * 4 · THE PRODUCT'S TWO RANKING RULES.
 *
 * Settled against the product source on 28 Sep 2026, after a phase in which
 * the fixture broke both while the site published them:
 *
 *   · the classification is `BANDS` (`RankerService.classifyScore`) — every
 *     candidate's word, and every word in RANKINGS, is what BANDS gives its
 *     score;
 *   · the critical gate (`MatchingService.isCriticalDisqualified`) — no
 *     ordering scores a candidate MISSING a skill that ordering sets to
 *     critical, and every gated entry names a skill that really gated them.
 */
function rankingRules() {
  const file = 'assets/data/product-demo.js';
  const band = (score) => BANDS.find((b) => score >= b.min).key;
  const missing = (c, skill) =>
    !c.skills.covered.includes(skill) && !c.skills.partial.some((p) => p.name === skill);

  CANDIDATES.forEach((c) => {
    if (c.classification !== band(c.score)) {
      note(file, `${c.id} scores ${c.score} and is classified "${c.classification}"; BANDS says "${band(c.score)}"`);
    }
  });

  Object.entries(RANKINGS).forEach(([key, ranking]) => {
    const tiers = key.split('-').map(Number);
    const criticals = TUNABLE.filter((t, i) => tiers[i] === 3).map((t) => t.skill);
    ranking.forEach(([id, score, cls, skill]) => {
      const c = CANDIDATES.find((x) => x.id === id);
      const gate = criticals.find((s) => missing(c, s));
      if (cls === 'gated') {
        if (score !== null) note(file, `RANKINGS['${key}']: ${id} is gated and still carries a score`);
        if (!criticals.includes(skill) || !missing(c, skill)) note(file, `RANKINGS['${key}']: ${id} is gated by ${skill}, which does not gate them`);
        return;
      }
      if (gate) note(file, `RANKINGS['${key}']: ${id} is scored while missing ${gate}, a critical skill — the gate drops them first`);
      if (cls !== band(score)) note(file, `RANKINGS['${key}']: ${id} at ${score} is "${cls}"; BANDS says "${band(score)}"`);
    });
  });
}

const built = [];
for (const page of PAGES) {
  const file = join(ROOT, page);
  if (!existsSync(file)) {
    note(page, 'file does not exist');
    continue;
  }
  const html = readFileSync(file, 'utf8');
  built.push({ file: page, html });

  tagBalance(html, page);
  headings(html, page);
  const idSet = ids(html, page);
  ariaRefs(html, page, idSet);
  links(html, page);
  images(html, page);
  frames(html, page);
  motionBudgets(html, page);
  controls(html, page);
  inertWorkspace(html, page);
  bannedVocabulary(html, page);
  if (page !== 'motion-lab.html') headContract(html, page);
}

const sources = sourceFiles();
staleFacts(sources);
placeholderOnShipped(sources);
stageClocks(built);
rankingRules();

if (problems.length) {
  console.log(`${problems.length} problem(s):\n`);
  problems.forEach((p) => console.log(`  ${p}`));
  process.exitCode = 1;
} else {
  console.log(`${PAGES.length} pages and ${sources.length} source files checked, no problems found.`);
}
