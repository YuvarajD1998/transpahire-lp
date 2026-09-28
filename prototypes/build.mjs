/**
 * build.mjs — writes the Stage 2 prototype pages and the Stage 3 final page.
 *
 *   node prototypes/build.mjs            → prototypes/*.html, served at /prototypes/
 *   node prototypes/build.mjs --bundle   → a relative-path copy for hosting elsewhere
 *
 * Node standard library only. Reads src/ and assets/data/ and writes only into
 * prototypes/ (or the bundle directory). Nothing in production is modified.
 */

import { mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { shell } from './lib/shell.mjs';
import {
  heroA1, heroA2, heroA3, signature, protoTuner,
  sceneProblem, scenePool, sceneArgument, sceneControl, sceneSystem, sceneClose,
} from './lib/parts.mjs';
import { browserModule } from './lib/rankings-proposed.mjs';
import { board } from './lib/board.mjs';
import { finalPage } from './lib/final.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const bundle = process.argv.includes('--bundle');
const OUT = bundle ? join(process.env.BUNDLE_DIR || join(HERE, '..', '..', 'stage2-bundle')) : HERE;
const base = bundle ? '' : '/';

mkdirSync(join(OUT, 'prototypes', 'data'), { recursive: true });
writeFileSync(join(HERE, 'data', 'rankings-proposed.js'), browserModule());

const pages = [];
function page(file, title, body, bodyClass) {
  pages.push({ file, html: shell({ file, title, body, bodyClass, base }) });
}

/* ---- A · heroes ---------------------------------------------------------- */
page('hero-a1.html', 'Hero A1 — Editorial product', heroA1(), 'proto proto--hero');
page('hero-a2.html', 'Hero A2 — Evidence first', heroA2(), 'proto proto--hero');
page('hero-a3.html', 'Hero A3 — Product as the hero', heroA3(), 'proto proto--hero');

/* ---- B · the signature, three executions and the static fallback ---------- */
const scoreIntro = (v, what) => `<section class="scene proto-intro"><div class="container">
  <p class="eyebrow">Prototype B · ${v}</p>
  <h1 class="h-section">The score, <em>taken apart.</em> <span class="proto-intro__v">${what}</span></h1>
  <p class="lede">Scroll. Six layers of one object: the list, the 87, four weights, the matched skills, one cited line, and the candidate's own view of the same number. Below 700px, with reduced motion, or without JavaScript, the same six layers stack.</p>
</div></section>`;
page('score-v1.html', 'Score V1 — subtle', scoreIntro('V1', 'Subtle: an editorial page turning.') + signature({ execution: 'v1', mode: 'pinned', heading: false }), 'proto proto--score');
page('score-v2.html', 'Score V2 — cinematic', scoreIntro('V2', 'Cinematic: layers separate and recompose.') + signature({ execution: 'v2', mode: 'pinned', heading: false }), 'proto proto--score');
page('score-v3.html', 'Score V3 — experimental', scoreIntro('V3', 'Experimental: the score becomes structure.') + signature({ execution: 'v3', mode: 'pinned', heading: false }), 'proto proto--score');
page('score-static.html', 'Score — static fallback', scoreIntro('Static', 'The fallback is a composition, not a broken animation.') + signature({ execution: 'v1', mode: 'stacked', heading: false }), 'proto proto--score');

/* ---- C · the tuner -------------------------------------------------------- */
page('tuner.html', 'Tuner — you decide what counts', `<section class="scene proto-intro"><div class="container">
  <p class="eyebrow">Prototype C · the control</p>
  <h1 class="h-section">You decide what counts. <em>It does the arithmetic.</em></h1>
  <p class="lede">Proposed fixture. Kubernetes to critical moves Rahul Verma above Sneha Iyer, because his Kubernetes is production and hers is Docker experience transferring. Kafka to critical shows what a critical requirement really is: a gate, applied before scoring. Desktop pins the controls; a phone gets the list first with one sticky control.</p>
</div></section>
<section class="scene scene--control" id="control"><div class="container">
${protoTuner({ listId: 'tuner-list', pinned: true })}
<p class="composition-note">Illustrative data · precomputed orderings from the proposed fixture · the what-if figures are examples</p>
</div></section>`, 'proto proto--tuner');

/* ---- D · the complete page, three executions ------------------------------ */
function fullPage(variation) {
  const hero = { v1: heroA1(), v2: heroA3(), v3: heroA2() }[variation];
  const sig = {
    v1: signature({ execution: 'v1', mode: 'stacked' }),
    v2: signature({ execution: 'v2', mode: 'pinned' }),
    v3: signature({ execution: 'v3', mode: 'pinned' }),
  }[variation];
  return [
    hero,
    sig,
    sceneProblem(),
    scenePool(),
    sceneArgument(),
    sceneControl({ pinned: variation !== 'v1' }),
    sceneSystem(),
    sceneClose(),
  ].join('\n');
}
page('page-v1.html', 'Variation 01 — Editorial', fullPage('v1'), 'proto proto--page proto--v1');
page('page-v2.html', 'Variation 02 — Product editorial', fullPage('v2'), 'proto proto--page proto--v2');
page('page-v3.html', 'Variation 03 — Experimental editorial', fullPage('v3'), 'proto proto--page proto--v3');

/* ---- the board (Stage 2) ---------------------------------------------------- */
page('stage-2.html', 'Stage 2 — creative exploration board', board({ base }), 'proto proto--board');

/* ---- STAGE 3 · the final page is the primary route ------------------------ */
page('index.html', 'Every shortlist explains itself', finalPage(), 'proto proto--page proto--v2 proto--final');

for (const p of pages) writeFileSync(join(OUT, bundle ? '' : '', p.file), p.html);

if (bundle) {
  cpSync(join(ROOT, 'assets'), join(OUT, 'assets'), { recursive: true });
  cpSync(join(HERE, 'css'), join(OUT, 'prototypes', 'css'), { recursive: true });
  cpSync(join(HERE, 'js'), join(OUT, 'prototypes', 'js'), { recursive: true });
  cpSync(join(HERE, 'data'), join(OUT, 'prototypes', 'data'), { recursive: true });
  cpSync(join(ROOT, 'site.webmanifest'), join(OUT, 'site.webmanifest'));
}
console.log(`wrote ${pages.length} pages to ${OUT}`);
