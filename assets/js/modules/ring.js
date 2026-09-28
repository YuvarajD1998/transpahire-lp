/**
 * ring.js — the score ring, updated after first paint.
 *
 * The ring is rendered at BUILD time by src/lib/compositions.mjs, which knows
 * the score and can compute the arc exactly. Two things then change it in the
 * browser: the candidate switcher, and the importance controls. Both need the
 * same three writes — the arc, the band colour, and the numeral — so they live
 * here rather than twice.
 *
 * The arc is set, not animated. Animating `stroke-dashoffset` is the site's one
 * documented exception to the transform/opacity/filter allowlist and P4 already
 * holds it (assets/css/motion.css § 4b). The numeral counts, which is how every
 * other score on the site behaves.
 *
 * The circumference is stamped onto the element at build time, because it
 * depends on the ring's size and reading it back out of the DOM would mean
 * measuring an SVG for a number the renderer already knew.
 */

/** Every classification the ring can show. Kept as a list so a stale class is
    removed rather than accumulating. */
const BAND_CLASSES = ['ring--strong', 'ring--good', 'ring--potential', 'ring--possible'];

/**
 * @param {Element} ring   a `[data-row-ring]` element
 * @param {number}  value  0–100
 * @param {string}  band   a BANDS key: strong | good | potential | possible
 */
export function setRing(ring, value, band) {
  if (!ring) return;

  const circumference = Number.parseFloat(ring.dataset.ringC);
  const arc = ring.querySelector('[data-ring-arc]');
  if (arc && Number.isFinite(circumference)) {
    const dash = (value / 100) * circumference;
    arc.setAttribute('stroke-dasharray', `${dash.toFixed(1)} ${(circumference - dash).toFixed(1)}`);
  }

  if (band) {
    ring.classList.remove(...BAND_CLASSES);
    ring.classList.add(`ring--${band}`);
  }
}

/** The ring inside a container, if there is one. */
export function ringIn(root) {
  return root ? root.querySelector('[data-row-ring]') : null;
}
