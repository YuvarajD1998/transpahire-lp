/**
 * prefs.js — motion preference and environment capability.
 *
 * Every other module asks this one whether it is allowed to animate. Keeping
 * the query in a single place means a new module cannot forget to check, and
 * a user toggling "reduce motion" at the OS level is honoured live rather than
 * only on reload.
 */

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

/** @type {Set<(reduced: boolean) => void>} */
const listeners = new Set();

reducedMotionQuery.addEventListener('change', (event) => {
  applySmoothScroll(event.matches);
  listeners.forEach((fn) => fn(event.matches));
});

/** True when the user has asked the system to minimise animation. */
export function prefersReducedMotion() {
  return reducedMotionQuery.matches;
}

/** Subscribe to preference changes. Returns an unsubscribe function. */
export function onMotionPreferenceChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Smooth anchor scrolling is applied as a class rather than a stylesheet
 * default so it can be withdrawn for reduced-motion users. Native smooth
 * scroll is used instead of intercepting anchor clicks in JS — the browser
 * then still moves focus to the target, which a scrollTo() call does not.
 */
function applySmoothScroll(reduced) {
  document.documentElement.classList.toggle('smooth-scroll', !reduced);
}

export function initPrefs() {
  // Signals to CSS that JS is running, which is what un-hides the pre-reveal
  // states. Set as early as possible to avoid a flash of revealed content.
  document.documentElement.classList.add('js');
  applySmoothScroll(prefersReducedMotion());
}
