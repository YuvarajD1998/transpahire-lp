/**
 * scene.js — the scroll clock for P6, the staged layers (motion.css § 4b).
 *
 * Writes two things onto `[data-signature]`: `--p`, the 0 → 1 progress through
 * the stage's scroll length, and `data-state`, the 1 → 6 layer index; and
 * toggles `is-current` / `is-passed` on the rail. CSS does everything else.
 * One passive, rAF-throttled scroll listener; no library.
 *
 * WHERE THE BROWSER CAN DRIVE `--p` FROM A SCROLL TIMELINE it does, and this
 * module stops writing it — keeping only the rail and `data-state` in step.
 * The two clocks use the same range: the pin starts when the stage's top
 * reaches the header line and ends when its bottom reaches the viewport's.
 * tools/audit.mjs asserts they agree.
 *
 * THE HEADER HEIGHT IS READ FROM THE TOKEN, never typed here. motion.css has
 * to hard-code it in `view(block 64px 0px)` because animation-timeline cannot
 * read a custom property; tools/check.mjs asserts that number equals
 * `--header-h`. This file cannot drift from the token because it reads it.
 *
 * Where the stage must not pin — reduced motion, a viewport under 700px wide
 * or 620px tall — it sets `.sig--static` and the markup's own reading order is
 * the composition. Without JavaScript nothing here runs and the stack is the
 * base state in CSS.
 */

import { prefersReducedMotion } from './prefs.js';

/** The final mapping's boundaries. A stage may carry its own in
    `data-thresholds="a,b,c,d,e"`; they must match motion.css. */
const THRESHOLDS = [0.14, 0.31, 0.48, 0.65, 0.82];
const MIN_WIDTH = 700;
const MIN_HEIGHT = 620;

const NATIVE = typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports('animation-timeline: view()');

function thresholdsFor(sig) {
  const own = (sig.dataset.thresholds || '').split(',').map(Number).filter((n) => n > 0 && n < 1);
  return own.length === 5 ? own : THRESHOLDS;
}

function stateFor(p, thresholds) {
  let s = 1;
  thresholds.forEach((t) => { if (p >= t) s += 1; });
  return s;
}

function headerHeight() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 64;
}

function shouldPin() {
  if (prefersReducedMotion()) return false;
  if (window.innerWidth < MIN_WIDTH) return false;
  if (window.innerHeight < MIN_HEIGHT) return false;
  return true;
}

export function initScene(root = document) {
  const stages = Array.from(root.querySelectorAll('[data-signature].sig--pinned'));
  if (!stages.length) return;

  let ticking = false;

  /* The pin range: from the stage's top at the header line to its bottom at
     the viewport's bottom — the native timeline's contain range with the
     header inset, so the two clocks agree to the pixel. */
  function measure(sig) {
    const header = headerHeight();
    const top = sig.getBoundingClientRect().top + window.scrollY;
    return {
      top: top - header,
      track: Math.max(sig.offsetHeight - window.innerHeight + header, 1),
    };
  }

  const items = stages.map((sig) => ({
    sig,
    rail: Array.from(sig.querySelectorAll('.srail__item')),
    m: measure(sig),
    thresholds: thresholdsFor(sig),
  }));

  function apply() {
    ticking = false;
    const y = window.scrollY;
    items.forEach(({ sig, rail, m, thresholds }) => {
      if (sig.classList.contains('sig--static')) return;
      /* Promote the layers only within a viewport of the pin; release after. */
      const near = y > m.top - window.innerHeight && y < m.top + m.track + window.innerHeight;
      if (sig.classList.contains('is-near') !== near) sig.classList.toggle('is-near', near);
      const p = Math.min(1, Math.max(0, (y - m.top) / m.track));
      if (!NATIVE) sig.style.setProperty('--p', p.toFixed(4));
      const s = stateFor(p, thresholds);
      if (sig.dataset.state !== String(s)) {
        sig.dataset.state = String(s);
        rail.forEach((li, i) => {
          li.classList.toggle('is-current', i + 1 === s);
          li.classList.toggle('is-passed', i + 1 < s);
        });
      }
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(apply);
  }

  function mode() {
    const pin = shouldPin();
    items.forEach((it) => {
      it.sig.classList.toggle('sig--static', !pin);
      if (!pin) it.sig.classList.remove('is-near');
      if (NATIVE || !pin) it.sig.style.removeProperty('--p');
      if (pin) it.m = measure(it.sig);
      /* Force the first apply() to write the state and the rail: the markup
         ships data-state="1", and a rail that is only synced on CHANGE would
         never mark step 1 as current. */
      it.sig.dataset.state = '';
    });
    if (pin) apply();
  }

  mode();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', mode, { passive: true });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', mode);
  /* The stage's top moves when fonts land and when anything above it changes
     height (the hero's drawer opening). Re-measure on every one of those, so
     the rail never runs ahead of the clock. */
  window.addEventListener('load', mode, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mode);
  if ('ResizeObserver' in window) {
    let raf = 0;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(mode); });
    ro.observe(document.documentElement);
  }
}
