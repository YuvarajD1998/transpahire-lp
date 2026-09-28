/**
 * panel.js — the candidate switcher on the explanation panel.
 *
 * One of the two interactive product elements on the homepage, and the one
 * `02 § 11` names as the memorable one: two clicks and the reasoning is
 * understood as real and per-candidate. Selecting a different person re-runs
 * the whole argument with genuinely different outcomes — a Strong match with
 * one partial and a salary problem, a Good match with two partials one of which
 * is narrower than the requirement, and a Potential whose depth on both
 * criticals is thin. One of the three is not a hire and the panel says so; the
 * contrast is the lesson.
 *
 * PHASE 4. The panel it drives is `explainPanel()`, not the retired
 * `explanationPanel()`. The fields changed with it: out go five dimension bars
 * (two of which were wrong — salary is a ±10% modifier, not a dimension), in
 * come the confidence chip, the relationship chips, and concept cards that each
 * cite the section of the profile they were drawn from.
 *
 * What this module is NOT: a model. Every value it writes is read from
 * assets/data/product-demo.js, precomputed. Nothing is calculated here, because
 * a visitor who reverse-engineers a demo's arithmetic has learned something
 * false about the product (`08 § 5`).
 *
 * Behaviour contract, from `07 § 3`:
 *   · Real <button>s with aria-pressed, never divs.
 *   · One polite, atomic live region, so a switch is announced ONCE as a whole
 *     rather than field by field.
 *   · The first switch replays the full sequence; later switches crossfade per
 *     field, because watching the same two-second build three times is tedious.
 *   · Reduced motion swaps values instantly — no sequence, no crossfade.
 *   · The focus ring is never removed.
 *
 * ON THE ONE PIECE OF DUPLICATED MARKUP. Concept cards are built here as well
 * as in src/lib/compositions.mjs, because a switch replaces them wholesale.
 * That is the same trade Phase 3 made for skill chips and it is the only one:
 * the two renderers are kept adjacent in review, and every value in both comes
 * from the same data module, so a divergence can only ever be cosmetic.
 */

import {
  CLASSIFICATIONS,
  CONFIDENCE,
  SKILL_STATES,
  candidate,
  explain,
  relationshipsUsed,
} from '../../data/product-demo.js';
import { prefersReducedMotion } from './prefs.js';
import { recount } from './counter.js';
import { playSequence, resetSequence } from './sequence.js';
import { setRing } from './ring.js';

/** Per-field crossfade for the second and later switches. */
const CROSSFADE = 320;

function field(root, name) {
  return root.querySelector(`[data-field="${name}"]`);
}

/** Text into an attribute or a text node, escaped. The panel never inserts a
    value it did not get from the data module, but the escape is free. */
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Replaces an element's content, crossfading unless motion is reduced.
 * The fade is on opacity only, so it cannot trigger layout, and it is applied
 * to the element that changes rather than to the panel — a whole panel fading
 * out and back reads as a page load, not as an answer.
 */
function swap(el, write, animate) {
  if (!el) return;
  if (!animate) {
    write(el);
    return;
  }
  el.style.transition = `opacity ${CROSSFADE / 2}ms var(--ease-standard)`;
  el.style.opacity = '0';
  window.setTimeout(() => {
    write(el);
    el.style.opacity = '1';
    window.setTimeout(() => {
      el.style.removeProperty('transition');
      el.style.removeProperty('opacity');
    }, CROSSFADE / 2);
  }, CROSSFADE / 2);
}

/**
 * One concept match card. Mirrors `conceptCard()` in
 * src/lib/compositions.mjs — see the note in this module's header.
 *
 * `at` keeps each card's own beat, so a replayed sequence still lands the first
 * partial alone at 1400ms rather than with everything else.
 */
function conceptCardHTML(m, { muted, at }) {
  const verified = m.verified
    ? '<span class="concept__verified">✓ verified</span>'
    : '<span class="concept__unverified">not verified</span>';

  return `<div class="concept${muted ? ' concept--muted' : ''}" data-beat="${at}">
    <p class="concept__head">
      <span class="concept__query">${esc(m.concept)}</span>
      <span class="concept__arrow" aria-hidden="true">→</span>
      <span class="concept__matched">${esc(m.matched)}</span>
      ${verified}
    </p>
    <p class="concept__reason">${esc(m.reason)}</p>
    <p class="concept__foot">
      <span class="concept__rel">${esc(m.rel)}</span>
      <span class="concept__sep" aria-hidden="true">·</span>
      <span class="concept__section">${esc(m.section)}</span>
      <span class="concept__conf">
        <span class="meter meter--thin" aria-hidden="true"><span class="meter__fill" style="--meter-v: ${(m.confidence / 100).toFixed(2)}"></span></span>
        <span class="concept__pct">${m.confidence}%</span>
      </span>
    </p>
    <p class="concept__quote">${esc(m.quote)}</p>
  </div>`;
}

function missingRowHTML(m) {
  return `<p class="missing-row">
    <span class="missing-row__glyph" aria-hidden="true">${SKILL_STATES.missing.glyph}</span>
    <span class="missing-row__name">${esc(m.concept)}</span>
    <span class="missing-row__tier">${esc(m.tier)}</span>
  </p>`;
}

function render(panel, id, animate) {
  const c = candidate(id);
  const e = explain(id);

  /* Identity. */
  swap(field(panel, 'name'), (el) => { el.textContent = c.name; }, animate);
  swap(
    field(panel, 'meta'),
    (el) => { el.textContent = `${c.role} · ${c.company} · ${c.location}`; },
    animate
  );

  /* The ring. The numeral counts rather than cutting, because every score on
     the site counts — a value that appears instantly beside four that count
     reads as a different kind of number. */
  const value = field(panel, 'score');
  if (value) {
    recount(value, c.score);
    setRing(value.closest('[data-row-ring]'), c.score, c.classification);
  }

  /* Explanation confidence. HIGH / MEDIUM / LOW, and the word rides with the
     colour — colour is never the sole carrier of a state. */
  const conf = field(panel, 'confidence');
  if (conf) {
    swap(conf, (el) => {
      const cf = CONFIDENCE[e.confidence];
      el.className = `pill pill--${cf.tone}`;
      el.dataset.field = 'confidence';
      el.textContent = `${cf.label} confidence`;
    }, animate);
  }

  /* The two-sentence summary. A block, never a typewriter. */
  swap(field(panel, 'summary'), (el) => { el.textContent = e.summary; }, animate);

  /* Which relationship types this explanation actually used. */
  const rels = relationshipsUsed(id);
  swap(field(panel, 'relchips'), (el) => {
    el.innerHTML = rels
      .map((r, i) => `<span class="relchip" data-beat="${1120 + i * 60}">${esc(r)}</span>`)
      .join('');
  }, animate);
  const srRel = field(panel, 'sr-rel');
  if (srRel) srRel.textContent = `Relationship types used in this explanation: ${rels.join(', ')}.`;

  /* The partial comes first and alone. It is the hinge of the whole site: a
     skill the candidate never typed, counted anyway, with the reason named. */
  swap(field(panel, 'concepts-partial'), (el) => {
    el.innerHTML = e.partial
      .map((m, i) => conceptCardHTML(m, { muted: true, at: i === 0 ? 1400 : 2140 + i * 80 }))
      .join('');
  }, animate);

  swap(field(panel, 'concepts-strong'), (el) => {
    el.innerHTML = e.strong
      .map((m, i) => conceptCardHTML(m, { muted: false, at: 1980 + i * 80 }))
      .join('');
  }, animate);

  swap(field(panel, 'concepts-missing'), (el) => {
    el.innerHTML = e.missing.map(missingRowHTML).join('');
  }, animate);

  const srVerdict = field(panel, 'sr-verdict');
  if (srVerdict) {
    srVerdict.textContent =
      `Match score ${c.score} out of 100, ${CLASSIFICATIONS[c.classification].label}. ` +
      `Explanation confidence: ${CONFIDENCE[e.confidence].label.toLowerCase()}. AI-generated.`;
  }

  /* One announcement for the whole switch. Written after the fields so a
     screen reader is told what changed rather than being walked through it. */
  const announce = field(panel, 'announce');
  if (announce) {
    announce.textContent =
      `${c.name}, ${c.role} at ${c.company}. Match score ${c.score} out of 100, ` +
      `${CLASSIFICATIONS[c.classification].label}. ${e.summary}`;
  }
}

export function initPanel(root = document) {
  const groups = Array.from(root.querySelectorAll('[data-switcher]'));

  groups.forEach((group) => {
    const panel = document.getElementById(group.dataset.switcher);
    if (!panel) return;

    const buttons = Array.from(group.querySelectorAll('[data-candidate]'));
    if (!buttons.length) return;

    /* The first switch replays the sequence; after that, fields crossfade. */
    let hasReplayed = false;

    function select(button) {
      const id = button.dataset.candidate;
      if (button.getAttribute('aria-pressed') === 'true') return;

      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

      const reduced = prefersReducedMotion();

      if (!reduced && !hasReplayed) {
        hasReplayed = true;
        resetSequence(panel);
        render(panel, id, false);
        playSequence(panel);
        return;
      }

      render(panel, id, !reduced);
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => select(button));
    });
  });
}
