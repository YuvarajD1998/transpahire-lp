/**
 * counter.js — count-up for numbers that accumulated.
 *
 * Three properties the previous implementation lacked:
 *
 *   · The final value stays in the DOM as the element's text until the
 *     animation starts, so a crawler, a reader with JS disabled, or a screen
 *     reader never sees "0". The rendered value is written to an aria-hidden
 *     span while the real value stays in an sr-only sibling.
 *   · The element reserves its final width before counting, so digits growing
 *     from 1 to 3 characters cannot shift the layout (cumulative layout shift).
 *   · Reduced motion skips straight to the final value.
 *
 * Markup contract:
 *   <span data-count="87">87</span>
 * Optional: data-prefix, data-suffix, data-decimals, data-duration.
 *
 * Phase 3 added one thing: `recount()`, so a value can be changed and counted
 * again after first paint. Section 08's ranked scores recompute when the
 * visitor moves an importance control, and they have to arrive the same way
 * they arrived the first time — every score on the site counts, or none does.
 * The site's scores are 0–100 integers, so `data-decimals` is still needed
 * nowhere.
 */

import { prefersReducedMotion } from './prefs.js';

const DEFAULT_DURATION = 1400;

/** A shorter run for a value that changes in response to a control: the
    visitor is waiting for an answer, not watching an entrance. */
const RECOUNT_DURATION = 520;

/** Ease-out cubic — fast start, long settle. Matches the reveal curve's feel. */
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Live instances, so a later caller can find an element's config again. */
const registry = new WeakMap();

function format(value, { prefix, suffix, decimals }) {
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}

function setup(el) {
  const config = {
    target: parseFloat(el.dataset.count),
    prefix: el.dataset.prefix || '',
    suffix: el.dataset.suffix || '',
    decimals: parseInt(el.dataset.decimals || '0', 10),
    duration: parseInt(el.dataset.duration || DEFAULT_DURATION, 10),
  };

  if (!Number.isFinite(config.target)) return;

  const finalText = format(config.target, config);

  // Reserve the width the final value will occupy. `ch` on a tabular-figures
  // font is exact for digits and close enough for the symbols around them.
  el.style.setProperty('--count-ch', `${finalText.length}ch`);

  // Split the element: an aria-hidden span carries the animating digits, an
  // sr-only span carries the real value for assistive technology, which
  // should never be read a stream of intermediate numbers.
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  visual.textContent = finalText;

  const accessible = document.createElement('span');
  accessible.className = 'sr-only';
  accessible.textContent = finalText;

  el.textContent = '';
  el.append(visual, accessible);

  const instance = { el, visual, accessible, config, shown: config.target };
  registry.set(el, instance);
  return instance;
}

function run(instance, from = 0) {
  const { visual, config } = instance;
  const start = performance.now();
  const distance = config.target - from;

  // Cancel any run already in flight on this element, or two rAF loops fight
  // over the same text node and the number visibly stutters.
  instance.token = (instance.token || 0) + 1;
  const token = instance.token;

  const tick = (now) => {
    if (instance.token !== token) return;
    const progress = Math.min(1, (now - start) / config.duration);
    const value = from + distance * easeOut(progress);
    visual.textContent = format(value, config);
    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      visual.textContent = format(config.target, config);
      instance.shown = config.target;
    }
  };

  window.requestAnimationFrame(tick);
}

/**
 * Change an already-initialised counter's value.
 *
 * The accessible copy is updated first and synchronously, so assistive
 * technology is told the answer rather than watching it arrive. Under reduced
 * motion — or if the element was never initialised — the value is simply set.
 *
 * @param {Element} el      an element that carried `data-count`
 * @param {number}  target  the new value
 */
export function recount(el, target) {
  if (!el || !Number.isFinite(target)) return;

  const instance = registry.get(el);
  if (!instance) {
    el.textContent = String(target);
    return;
  }

  const from = instance.shown;
  instance.config.target = target;
  instance.config.duration = RECOUNT_DURATION;
  el.dataset.count = String(target);

  const text = format(target, instance.config);
  instance.accessible.textContent = text;

  if (prefersReducedMotion() || from === target) {
    instance.visual.textContent = text;
    instance.shown = target;
    return;
  }

  run(instance, from);
}

export function initCounters(root = document) {
  const instances = Array.from(root.querySelectorAll('[data-count]'))
    .map(setup)
    .filter(Boolean);

  if (!instances.length) return;

  // Reduced motion, or no observer: the value is already correct in the DOM.
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  // Zero the visible digits only now that we know the animation will run.
  instances.forEach((instance) => {
    instance.visual.textContent = format(0, instance.config);
    instance.shown = 0;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const instance = instances.find((i) => i.el === entry.target);
        if (instance) run(instance, 0);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  instances.forEach(({ el }) => observer.observe(el));

  // Safety net: if the observer never fires the number must not read zero.
  window.setTimeout(() => {
    instances.forEach((instance) => {
      if (instance.shown === 0 && instance.config.target !== 0) {
        instance.visual.textContent = format(instance.config.target, instance.config);
        instance.shown = instance.config.target;
      }
      observer.unobserve(instance.el);
    });
  }, 4000);
}
