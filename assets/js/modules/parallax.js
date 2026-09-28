/**
 * parallax.js — scroll-linked depth for product compositions.
 *
 * Writes a `--parallax` pixel offset that motion.css § 4 turns into a
 * translate3d. Nothing else about the element changes, so this can never
 * trigger layout.
 *
 * Deliberate constraints, because parallax is the effect most likely to tip a
 * marketing page from considered into gimmicky:
 *
 *   · Depth is capped at ±40px regardless of what an element asks for.
 *   · Only elements currently in the viewport are updated.
 *   · The compositor hint is held only while an element is on screen and the
 *     effect is enabled — never permanently, per docs/architecture.md § 4.
 *   · Disabled entirely under reduced motion and on coarse pointers — the
 *     effect costs a frame budget on phones and reads as jitter on a
 *     momentum-scrolling touch device.
 *
 * Markup contract:
 *   <div data-parallax="0.06">  — fraction of scroll distance, signed.
 */

import { prefersReducedMotion, onMotionPreferenceChange } from './prefs.js';

const MAX_OFFSET = 40;

export function initParallax(root = document) {
  const elements = Array.from(root.querySelectorAll('[data-parallax]'));
  if (!elements.length) return;

  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  let enabled = !prefersReducedMotion() && !isCoarse;
  let ticking = false;

  const clear = () => elements.forEach((el) => {
    el.style.setProperty('--parallax', '0px');
    el.style.removeProperty('will-change');
  });

  const update = () => {
    ticking = false;
    if (!enabled) return;

    const viewportHeight = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        // Offscreen: release the layer rather than holding it for the page's
        // whole life. Setting the same value repeatedly is free; it is only the
        // transitions between set and unset that cost anything.
        if (el.style.willChange) el.style.removeProperty('will-change');
        return;
      }
      if (!el.style.willChange) el.style.setProperty('will-change', 'transform');

      const depth = parseFloat(el.dataset.parallax) || 0;

      // -1 when the element's centre is at the bottom of the viewport,
      // +1 when it is at the top. Zero as it passes the middle, so the
      // element sits at its authored position at the moment it is read.
      const centre = rect.top + rect.height / 2;
      const progress = (viewportHeight / 2 - centre) / (viewportHeight / 2);

      const offset = Math.max(
        -MAX_OFFSET,
        Math.min(MAX_OFFSET, progress * depth * viewportHeight)
      );

      el.style.setProperty('--parallax', `${offset.toFixed(2)}px`);
    });
  };

  const onScroll = () => {
    if (ticking || !enabled) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  onMotionPreferenceChange((reduced) => {
    enabled = !reduced && !isCoarse;
    if (!enabled) clear();
    else onScroll();
  });

  if (enabled) update();
  else clear();
}
