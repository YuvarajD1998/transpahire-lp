/**
 * shell.mjs — the prototype page shell.
 *
 * Wraps the PRODUCTION document (src/lib/layout.mjs → document_) so every
 * prototype carries the real header, footer, fonts, icon sprite and the five
 * production stylesheets, then appends the prototype layer after them:
 *
 *   tokens → base → motion → components → sections   (production, untouched)
 *   → proto-tokens (Palette 01 + type pass) → proto → signature   (this stage)
 *
 * Post-processing the string is deliberate: it means the prototype adds to the
 * production shell and cannot silently drift from it. Nothing in src/ changes.
 */

import { document_ } from '../../src/lib/layout.mjs';
import { esc } from '../../src/lib/compositions.mjs';

/** The Stage 2 index, for the floating prototype tag. */
export const PAGES = [
  { file: 'index.html',        name: 'Stage 3 · the page',        group: 'final' },
  { file: 'stage-2.html',      name: 'Board',                     group: 'board' },
  { file: 'hero-a1.html',      name: 'Hero A1 · Editorial product', group: 'hero' },
  { file: 'hero-a2.html',      name: 'Hero A2 · Evidence first',    group: 'hero' },
  { file: 'hero-a3.html',      name: 'Hero A3 · Product as hero',   group: 'hero' },
  { file: 'score-v1.html',     name: 'Score · V1 subtle',           group: 'score' },
  { file: 'score-v2.html',     name: 'Score · V2 cinematic',        group: 'score' },
  { file: 'score-v3.html',     name: 'Score · V3 experimental',     group: 'score' },
  { file: 'score-static.html', name: 'Score · static fallback',     group: 'score' },
  { file: 'tuner.html',        name: 'Tuner',                       group: 'tuner' },
  { file: 'page-v1.html',      name: 'Page · 01 Editorial',         group: 'page' },
  { file: 'page-v2.html',      name: 'Page · 02 Product editorial', group: 'page' },
  { file: 'page-v3.html',      name: 'Page · 03 Experimental',      group: 'page' },
];

/**
 * @param {object} o
 * @param {string} o.file        output file name (for the tag's "you are here")
 * @param {string} o.title
 * @param {string} o.body
 * @param {string} [o.bodyClass] variation hooks, e.g. "proto proto--v2"
 * @param {string} [o.base]      URL prefix for assets: '/' locally, '' for a bundle
 */
export function shell({ file, title, body, bodyClass = 'proto', base = '/', description = '' }) {
  const here = PAGES.find((p) => p.file === file);
  const final = here?.group === 'final';
  const html = document_({
    path: `/prototypes/${file === 'index.html' ? '' : file}`,
    title: `${title} — Transpahire · ${final ? 'Stage 3' : 'Stage 2'} prototype`,
    description: description || (final ? 'Stage 3 final design prototype. Not the live site.' : 'Stage 2 creative exploration. Not the live site.'),
    body,
  });

  const protoHead = `
<!-- ===== STAGE 2 PROTOTYPE LAYER — loads after production, overrides tokens ===== -->
<link rel="stylesheet" href="${base}prototypes/css/proto-tokens.css">
<link rel="stylesheet" href="${base}prototypes/css/proto.css">
<link rel="stylesheet" href="${base}prototypes/css/signature.css">${final ? `
<!-- ===== STAGE 3 CONSOLIDATION LAYER — the final page only ===== -->
<link rel="stylesheet" href="${base}prototypes/css/final.css">` : ''}
<script type="module" src="${base}prototypes/js/proto.js"></script>
</head>`;

  /* The tag: the final page links to the Stage 2 board; every Stage 2 page
     links to the final page and to the board. */
  const tag = `
<aside class="proto-tag" aria-label="Prototype navigation">
  <span class="proto-tag__label">${final ? 'Stage 3 prototype' : 'Stage 2 prototype'}</span>
  <span class="proto-tag__here">${esc(here ? here.name : file)}</span>
  ${final ? `<a class="proto-tag__link" href="${base}prototypes/stage-2.html">Stage 2 board</a>` : `<a class="proto-tag__link" href="${base}prototypes/">Final</a>${file === 'stage-2.html' ? '' : ` <a class="proto-tag__link" href="${base}prototypes/stage-2.html">Board</a>`}`}
</aside>`;

  return html
    .replace('</head>', protoHead)
    /* Root-relative asset paths become base-relative, so the same build can
       be served locally (base '/') or bundled ('' → relative). */
    .replace(/(href|src)="\/(assets|prototypes|site\.webmanifest)/g, `$1="${base}$2`)
    .replace('<body>', `<body class="${esc(bodyClass)}">`)
    .replace('</main>', `${tag}\n</main>`);
}
