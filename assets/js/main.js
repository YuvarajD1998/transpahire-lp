/**
 * main.js — marketing site entry point.
 *
 * Loaded as a native ES module (`<script type="module" src="…">`), which is
 * deferred by default: it runs after the document is parsed and never blocks
 * the first paint. There is no bundler and no dependency; each module below is
 * independent, guards its own absence, and can be removed without touching
 * the others.
 *
 * Every behaviour on the site is registered here. If a section needs new
 * interaction, add a module rather than an inline script — that is what keeps
 * the motion and interaction system a system.
 *
 * The registration order matters in exactly one place: initCounters must run
 * before initPanel and initTuner, because both of those call `recount()` on
 * elements counter.js has to have set up first.
 */

import { initPrefs } from './modules/prefs.js';
import { initReveal } from './modules/reveal.js';
import { initNav } from './modules/nav.js';
import { initMenu } from './modules/menu.js';
import { initTabs } from './modules/tabs.js';
import { initAccordion } from './modules/accordion.js';
import { initCounters } from './modules/counter.js';
import { initParallax } from './modules/parallax.js';
import { initSequence } from './modules/sequence.js';
import { initPanel } from './modules/panel.js';
import { initTuner } from './modules/tuner.js';
import { initPoolFilter } from './modules/poolfilter.js';
import { initDualMode } from './modules/dualmode.js';
import { initScene } from './modules/scene.js';

// First and synchronous: sets `html.js`, which is what arms the pre-reveal
// hidden states in motion.css. Any delay here shows content and then hides it.
initPrefs();

function start() {
  /* Navigation and page furniture. */
  initNav();
  initMenu();

  /* Component behaviours. */
  initTabs();
  initAccordion();
  initDualMode();

  /* Numbers before the two interactions that rewrite them. */
  initCounters();

  /* The product interactions. */
  initPanel();
  initTuner();
  initPoolFilter();

  /* Motion last, so nothing reveals before the thing it reveals is wired. */
  initReveal();
  initSequence();
  initParallax();

  /* P6, the staged layers: the scroll clock for the landing page's signature. */
  initScene();

  /* P5 without a reveal ancestor. The landing page's hero carries no reveal —
     reveals never gate the hero — so its drawer is released on a class rather
     than by an ancestor: on screen at first paint, sliding in once inside
     --dur-medium. A drawer inside a [data-reveal] still waits for its reveal. */
  document.querySelectorAll('[data-drawer-reveal]').forEach((el) => {
    if (el.closest('[data-reveal]')) return;
    window.requestAnimationFrame(() => el.classList.add('is-open'));
    /* Release the compositor hint once the entrance has run: --dur-medium
       plus its 120ms delay, with a margin. */
    window.setTimeout(() => el.classList.add('is-settled'), 600);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
