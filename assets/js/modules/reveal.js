/**
 * reveal.js — scroll entrance animations.
 *
 * One IntersectionObserver drives every `[data-reveal]`, `[data-reveal-group]`
 * and `[data-layers]` element on the page. The module owns three concerns:
 *
 *   1. Assigning sibling indices so CSS can compute stagger delays without an
 *      :nth-child ladder (which caps out and silently drops the 11th card).
 *   2. Revealing elements that are already in view on load without a delay,
 *      so above-the-fold content is not animated in after the user has already
 *      read it.
 *   3. Releasing the compositor hint once each transition has finished.
 *
 * See assets/css/motion.css § 1–2 and § 4 for the matching styles.
 */

import { prefersReducedMotion } from './prefs.js';

const SELECTOR = '[data-reveal], [data-reveal-group], [data-layers]';

/** Longest reveal duration + longest stagger tail, in ms. */
const SETTLE_AFTER = 2000;

/**
 * Writes the 0-based sibling index onto each child of a staggered group.
 * Elements marked `data-reveal-skip` are excluded from the cascade — used for
 * decorative children that should not consume a beat of the rhythm.
 */
function indexChildren(group) {
  const children = Array.from(group.children).filter(
    (el) => !el.hasAttribute('data-reveal-skip')
  );
  children.forEach((child, i) => child.style.setProperty('--i', String(i)));
}

/**
 * Marks an element revealed and schedules the removal of `will-change`.
 * `immediate` skips the transition entirely — used for content already on
 * screen at first paint.
 */
function reveal(el, immediate = false) {
  if (immediate) {
    el.classList.add('is-revealed', 'is-settled');
    return;
  }
  el.classList.add('is-revealed');
  window.setTimeout(() => el.classList.add('is-settled'), SETTLE_AFTER);
}

export function initReveal(root = document) {
  const targets = Array.from(root.querySelectorAll(SELECTOR));
  if (!targets.length) return;

  targets
    .filter((el) => el.hasAttribute('data-reveal-group') || el.hasAttribute('data-layers'))
    .forEach(indexChildren);

  // With reduced motion the CSS already shows everything; adding the class
  // keeps the DOM state consistent for anything that inspects it.
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => reveal(el, true));
    return;
  }

  // Anything intersecting the viewport at first paint is shown without
  // animation. Animating content the user is already looking at reads as a
  // page that has not finished loading.
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const deferred = [];

  targets.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < viewportHeight * 0.85) reveal(el, true);
    else deferred.push(el);
  });

  if (!deferred.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      // Fires a little before the element is fully on screen, so the motion
      // has finished by the time it reaches comfortable reading position.
      threshold: 0.1,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  deferred.forEach((el) => observer.observe(el));

  // Safety net. If the observer never fires — print, an offscreen iframe, a
  // prerenderer, an aggressive content blocker — the page must still be
  // readable. Content is never left dependent on an animation completing.
  window.setTimeout(() => {
    deferred
      .filter((el) => !el.classList.contains('is-revealed'))
      .forEach((el) => reveal(el, true));
  }, 2500);
}
