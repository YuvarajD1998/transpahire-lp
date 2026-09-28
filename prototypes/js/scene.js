/**
 * scene.js — the scroll clock for the signature stage.
 *
 * Writes two things onto `[data-signature]`: `--p`, the 0 → 1 progress through
 * the stage's scroll length, and `data-state`, the 1 → 6 layer index. CSS does
 * everything else. rAF-throttled; passive listeners; no library.
 *
 * Where the stage must not pin — reduced motion, a viewport under 700px, or a
 * viewport too short to hold a layer — it sets `.sig--static` and stops, and
 * the markup's own reading order is the composition.
 */

const THRESHOLDS = [0.12, 0.30, 0.48, 0.66, 0.82];

/* STAGE 3: a stage may carry its own boundaries (`data-thresholds="a,b,c,d,e"`),
   so the final mapping's non-overlapping windows and the rail agree. */
function thresholdsFor(sig) {
  const own = (sig.dataset.thresholds || '').split(',').map(Number).filter((n) => n > 0 && n < 1);
  return own.length === 5 ? own : THRESHOLDS;
}
function stateFor(p, thresholds) {
  let s = 1;
  thresholds.forEach((t) => { if (p >= t) s += 1; });
  return s;
}

/* STAGE 3: where the browser can drive `--p` from a scroll timeline
   (signature.css § TIMELINE), the clock stops writing it and only keeps the
   rail and `data-state` in step. Everywhere else the listener is the clock. */
const NATIVE = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()');

function shouldPin() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.innerWidth < 700) return false;
  if (window.innerHeight < 620) return false;
  return true;
}

export function initScene(root = document) {
  const stages = Array.from(root.querySelectorAll('[data-signature].sig--pinned'));
  if (!stages.length) return;

  let ticking = false;

  function measure(sig) {
    const rect = sig.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    /* The sticky box is (viewport − header) tall in the final mapping, and
       min(that, 800) in the Stage 2 ones; the track is the rest. */
    const header = 64;
    if (sig.dataset.execution === 'final') {
      /* The pin starts when the stage's top reaches the header line and ends
         when its bottom reaches the viewport's — the same range the native
         timeline uses, so the two clocks agree to the pixel. */
      return { top: top - header, track: Math.max(sig.offsetHeight - window.innerHeight, 1) };
    }
    const box = Math.min(window.innerHeight - header, 800);
    const track = sig.offsetHeight - box;
    return { top, track: Math.max(track, 1) };
  }

  const items = stages.map((sig) => ({ sig, rail: Array.from(sig.querySelectorAll('.srail__item')), m: measure(sig), thresholds: thresholdsFor(sig), native: NATIVE && sig.dataset.execution === 'final' }));

  function apply() {
    ticking = false;
    const y = window.scrollY;
    items.forEach(({ sig, rail, m, thresholds, native }) => {
      const p = Math.min(1, Math.max(0, (y - m.top) / m.track));
      if (!native) sig.style.setProperty('--p', p.toFixed(4));
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
      if (it.native) it.sig.style.removeProperty('--p');
      if (pin) it.m = measure(it.sig);
    });
    if (pin) apply();
  }

  mode();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', mode, { passive: true });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', mode);
  /* STAGE 3: the stage's top moves when fonts land and when anything above it
     changes height (the hero's drawer opening, an image arriving). Re-measure
     on every one of those, so the rail never runs ahead of the clock. */
  window.addEventListener('load', mode, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mode);
  if ('ResizeObserver' in window) {
    let raf = 0;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(mode); });
    ro.observe(document.documentElement);
  }
}
