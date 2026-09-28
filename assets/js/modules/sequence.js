/**
 * sequence.js — P2 sequenced reveal, and P4's path draw.
 *
 * A `[data-sequence]` composition assembles itself from beats at absolute
 * offsets, taken from the storyboard rather than from a cadence:
 *
 *   <div data-sequence>
 *     <span data-beat="0">…</span>
 *     <span data-beat="1400">…</span>          the partial chip, alone
 *     <path class="edge__path" data-beat="400">
 *   </div>
 *
 * Why absolute offsets rather than a stagger: the section 06 sequence is three
 * beats and two pauses (`07 § 4`), and the pauses are the information. The
 * partial chip arriving alone at 1400ms is where a visitor stops reading a
 * feature list and understands the mechanism. A sequence that revealed
 * everything on one 80ms stagger would carry the same information and
 * communicate nothing.
 *
 * The module owns four small jobs and no styling:
 *
 *   1. Writing `--beat-delay` from each beat's own number. `--beat-delay`
 *      inherits, which is how a meter or an SVG path inside a beat picks up
 *      that beat's timing without being told about it separately.
 *   2. Measuring every P4 path so its dash offset is its real length. Guessing
 *      it leaves a line that finishes early or never finishes.
 *   3. Firing once, when the composition reaches the viewport, and releasing
 *      the compositor hints when the last beat has settled.
 *   4. Replaying on request, which is what the section 06 candidate switcher
 *      asks for the first time the visitor changes candidate.
 *
 * Under reduced motion nothing here runs: motion.css § 6 renders every
 * sequenced composition complete and static, and no delay is written, so
 * there is no timeline to be caught halfway through.
 *
 * See assets/css/motion.css § 4b.
 */

import { prefersReducedMotion } from './prefs.js';

const SELECTOR = '[data-sequence]';

/** Extra time after the last beat before compositor hints are released. */
const SETTLE_TAIL = 1200;

/** Beats, in document order, with their offsets. */
function beatsOf(root) {
  return Array.from(root.querySelectorAll('[data-beat]')).map((el) => ({
    el,
    at: Number.parseInt(el.dataset.beat, 10) || 0,
  }));
}

/**
 * A dash offset has to be the path's own length or the line does not finish
 * where the geometry does. Measured rather than authored, because the geometry
 * is responsive and an authored length would be wrong at every width but one.
 */
function measurePaths(root) {
  root.querySelectorAll('.edge__path').forEach((path) => {
    if (typeof path.getTotalLength !== 'function') return;
    const length = path.getTotalLength();
    if (length > 0) path.style.setProperty('--len', `${Math.ceil(length)}`);
  });
}

function applyDelays(root, beats) {
  beats.forEach(({ el, at }) => el.style.setProperty('--beat-delay', `${at}ms`));
  root.dataset.sequenceLast = String(beats.reduce((max, b) => Math.max(max, b.at), 0));
}

function clearDelays(beats) {
  beats.forEach(({ el }) => el.style.removeProperty('--beat-delay'));
}

/**
 * Runs a composition's sequence once.
 * @param {Element} root a `[data-sequence]` element
 */
export function playSequence(root) {
  if (!root) return;

  if (prefersReducedMotion()) {
    root.classList.add('is-sequenced', 'is-settled');
    return;
  }

  const beats = beatsOf(root);
  measurePaths(root);
  applyDelays(root, beats);

  root.classList.remove('is-settled');

  // Two frames: one for the delays to land in the style system, one for the
  // browser to have painted the pre-beat state. Without the second, a beat at
  // offset 0 can be coalesced into the same style recalculation as its own
  // hidden state and never transition at all.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => root.classList.add('is-sequenced'));
  });

  const last = Number.parseInt(root.dataset.sequenceLast, 10) || 0;
  window.clearTimeout(root._settleTimer);
  root._settleTimer = window.setTimeout(
    () => root.classList.add('is-settled'),
    last + SETTLE_TAIL
  );
}

/**
 * Puts a composition back to its pre-sequence state so it can be played again.
 * Used by the candidate switcher on the first switch — watching the same
 * two-second build three times is tedious, so only the first replay is a full
 * sequence and later ones crossfade per field (`07 § 3`).
 */
export function resetSequence(root) {
  if (!root || prefersReducedMotion()) return;
  window.clearTimeout(root._settleTimer);
  root.classList.remove('is-sequenced', 'is-settled');
  clearDelays(beatsOf(root));
  // Force a reflow so removing and re-adding the class in the same task is
  // seen as two states rather than one.
  void root.offsetHeight;
}

export function initSequence(root = document) {
  const compositions = Array.from(root.querySelectorAll(SELECTOR));
  if (!compositions.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    compositions.forEach((el) => el.classList.add('is-sequenced', 'is-settled'));
    return;
  }

  // A composition already on screen at first paint still plays: unlike a
  // reveal, the sequence is the content's own explanation of itself, and
  // skipping it would leave the visitor looking at the answer with no argument.
  // It is also why no `[data-sequence]` sits above the fold — see the hero,
  // which is static by design (`05 § 2`).
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        playSequence(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25, rootMargin: '0px 0px -5% 0px' }
  );

  compositions.forEach((el) => observer.observe(el));

  // Safety net, matching reveal.js: print, an offscreen iframe, a prerenderer
  // or an aggressive content blocker must still leave every beat visible.
  window.setTimeout(() => {
    compositions
      .filter((el) => !el.classList.contains('is-sequenced'))
      .forEach((el) => el.classList.add('is-sequenced', 'is-settled'));
  }, 4000);
}
