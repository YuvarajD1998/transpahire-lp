/**
 * proto.js — the prototype layer's entry point.
 *
 * Production main.js is already on the page (reveal, counters, rings, the
 * P2 sequencer, the argument switcher, the pool filters, the nav). This adds
 * the two things this stage introduces: the scroll clock for the signature
 * stage, and the proposed tuner.
 */
import { initScene } from './scene.js';
import { initProtoTuner } from './tuner-proto.js';

function start() {
  /* P5 releases on a class rather than on an ancestor reveal, so the frame is
     never gated on a script: it is on screen at first paint and the drawer
     slides in once, inside --dur-medium. */
  document.querySelectorAll('[data-drawer-reveal]').forEach((el) => {
    window.requestAnimationFrame(() => el.classList.add('is-open'));
  });
  initProtoTuner();
  initScene();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
else start();

/* The board's responsive viewer: one select, four iframes. */
(function boardViewer() {
  const pick = document.querySelector('[data-board-pick]');
  const frames = Array.from(document.querySelectorAll('[data-board-frame]'));
  if (!pick || !frames.length) return;
  const load = () => frames.forEach((f) => { f.src = pick.value; });
  pick.addEventListener('change', load);
  load();
})();
