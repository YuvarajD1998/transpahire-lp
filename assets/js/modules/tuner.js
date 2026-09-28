/**
 * tuner.js — the section 08 importance controls and what-if simulation.
 *
 * The second of the two interactive product elements, and the only place on the
 * page where the visitor changes the outcome. It answers the objection the four
 * preceding sections create: *is the machine deciding?*
 *
 * Two controls, deliberately kept separate, because `08 § 5` treats them as two
 * capabilities and conflating them loses both ideas:
 *
 *   TUNING     changes the ORDER. Three sliders, each stepping through the
 *              product's own four tiers — bonus · preferred · required ·
 *              critical. Moving one reorders the list and recomputes the
 *              scores. `aria-valuetext` carries the tier WORD, never a number:
 *              the product does not expose a numeric weight and neither should
 *              the demo.
 *
 *   SIMULATION changes the POOL. One toggle — drop Kafka — with its own
 *              readout. The figures are illustrative and the markup labels them
 *              as an example, because an unlabelled pool count reads as a
 *              product metric (`10 § R9`).
 *
 * PRECOMPUTED OUTCOMES ONLY. Every ordering comes from RANKINGS, a frozen
 * fixture of all sixty-four tier combinations authored once by
 * tools/rankings.mjs. This module performs no matching arithmetic: it looks up
 * a key, moves rows, and recounts numbers. `08 § 5` — a visitor who works out
 * that the demo's maths is fake has learned the wrong thing about the product.
 *
 * The reorder is P3 (assets/css/motion.css § 4b): measure, translate, then
 * reorder the DOM and clear the transforms. Reordering is the one animation on
 * this site that IS the information.
 *
 * `reorder()` is exported so motion-lab.html can demonstrate P3 on its own,
 * which docs/motion-system.md § 6 requires of any primitive before it is used.
 */

import {
  CLASSIFICATIONS,
  IMPORTANCE_TONES,
  RANKINGS,
  TIER_WORDS,
  WHAT_IF,
  candidate,
} from '../../data/product-demo.js';
import { prefersReducedMotion } from './prefs.js';
import { recount } from './counter.js';
import { setRing } from './ring.js';

/** Matches --dur-medium, the duration P3's transition is authored at. */
const REORDER_MS = 320;

/**
 * P3. Reorders a list to `order` and animates the rows to their new positions.
 *
 * A FLIP: read every row's position, put the rows in their new order, read
 * again, then transform each row back to where it was and release. Nothing
 * animates a layout property and no row is taken out of flow, so the list keeps
 * its own height throughout and the section below it never moves.
 */
export function reorder(list, order, reduced = prefersReducedMotion()) {
  const rows = new Map(
    Array.from(list.querySelectorAll('[data-row]')).map((el) => [el.dataset.row, el])
  );

  const present = order.filter((id) => rows.has(id));
  if (!present.length) return;

  if (reduced) {
    present.forEach((id) => list.append(rows.get(id)));
    return;
  }

  const before = new Map(present.map((id) => [id, rows.get(id).getBoundingClientRect().top]));

  present.forEach((id) => list.append(rows.get(id)));

  // One read pass after the reflow, then one write pass. Interleaving them
  // would force a layout per row.
  const shifts = present.map((id) => {
    const el = rows.get(id);
    return [el, before.get(id) - el.getBoundingClientRect().top];
  });

  shifts.forEach(([el, shift]) => {
    el.style.setProperty('--shift', `${shift}px`);
  });

  list.classList.add('is-reordering');

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      shifts.forEach(([el]) => el.style.setProperty('--shift', '0px'));
    });
  });

  window.clearTimeout(list._reorderTimer);
  list._reorderTimer = window.setTimeout(() => {
    list.classList.remove('is-reordering');
    shifts.forEach(([el]) => el.style.removeProperty('--shift'));
  }, REORDER_MS + 60);
}

/**
 * Writes the scores and classifications a combination produced.
 *
 * An entry may be [id, null, 'gated', skill]: a candidate a CRITICAL tier
 * dropped before scoring. The row loses its score rather than showing a low
 * one — a candidate the gate dropped has no score, and rendering one would
 * misstate the single most consequential thing the engine does. Every list a
 * tuner reorders carries the [data-gate] line for it.
 *
 * Rows that carry a [data-moved] cell get a ▲ / ▼ for a beat after the
 * reorder, so the list explains the change as well as making it.
 */
function applyRanking(list, ranking, previousOrder = []) {
  let gated = 0;
  ranking.forEach(([id, score, classification, gateSkill], index) => {
    const row = list.querySelector(`[data-row="${id}"]`);
    if (!row) return;

    const gate = row.querySelector('[data-gate]');
    const moved = row.querySelector('[data-moved]');

    if (classification === 'gated') {
      gated += 1;
      row.classList.add('is-gated');
      if (gate) {
        gate.hidden = false;
        const skillCell = gate.querySelector('[data-gate-skill]');
        if (skillCell) skillCell.textContent = gateSkill;
      }
      const srGated = row.querySelector('[data-row-sr]');
      if (srGated) {
        srGated.textContent =
          `${candidate(id).name}: not scored. Disqualified before scoring for a missing critical requirement, ${gateSkill}.`;
      }
      markMoved(moved, previousOrder.indexOf(id), index);
      return;
    }

    row.classList.remove('is-gated');
    if (gate) gate.hidden = true;
    markMoved(moved, previousOrder.indexOf(id), index);

    const number = row.querySelector('[data-row-score]');
    if (number) {
      recount(number, score);
      /* The ring's arc and its band colour, in the same write. Phase 4 turned
         the row's bare numeral into the product's own ScoreRing, and a ring
         whose number moved while its arc did not would be worse than either. */
      setRing(number.closest('[data-row-ring]'), score, classification);
    }

    const chip = row.querySelector('[data-row-chip]');
    if (chip) {
      chip.className = `chip chip--mono chip--${classification}`;
      chip.textContent = CLASSIFICATIONS[classification].short;
    }

    const sr = row.querySelector('[data-row-sr]');
    if (sr) {
      sr.textContent =
        `${candidate(id).name}: match score ${score} out of 100, ` +
        `${CLASSIFICATIONS[classification].label}.`;
    }
  });

  const count = list.closest('.rank')?.querySelector('[data-gatecount]');
  if (count) count.textContent = gated ? `${gated} not scored · critical gate` : '';
  return gated;
}

/** ▲ n / ▼ n for 1.8s on a row that moved; nothing on one that did not. */
function markMoved(cell, was, now) {
  if (!cell || was < 0) return;
  const delta = was - now;
  cell.dataset.moved = delta > 0 ? 'up' : delta < 0 ? 'down' : '';
  cell.textContent = delta > 0 ? `▲ ${delta}` : delta < 0 ? `▼ ${-delta}` : '';
  window.clearTimeout(cell._t);
  cell._t = window.setTimeout(() => { cell.dataset.moved = ''; }, 1800);
}

function initTuning(section, list) {
  const inputs = Array.from(section.querySelectorAll('[data-weight]'));
  const announce = section.querySelector('[data-field="tuner-announce"]');
  if (!list || !inputs.length) return;

  function comboKey() {
    return inputs.map((input) => input.value).join('-');
  }

  function order() {
    return Array.from(list.querySelectorAll('[data-row]')).map((r) => r.dataset.row);
  }

  function readoutFor(input) {
    return section.querySelector(`[data-weight-readout="${input.dataset.weight}"]`);
  }

  function labelInput(input) {
    const word = TIER_WORDS[Number(input.value)] || TIER_WORDS[0];
    const skill = input.dataset.skill;
    // The tier word, never the slider's number: `07 § 3`.
    input.setAttribute('aria-valuetext', `${skill}: ${word}`);
    const readout = readoutFor(input);
    if (readout) {
      readout.textContent = word;
      /* The tier's own tone, where the readout carries one (the landing page's
         tuner): critical rose, required amber, preferred indigo, bonus neutral. */
      if (readout.dataset.tone !== undefined) readout.dataset.tone = IMPORTANCE_TONES[word];
    }
  }

  function update(changed) {
    const key = comboKey();
    const ranking = RANKINGS[key];
    if (!ranking) return;

    const reduced = prefersReducedMotion();
    const before = order();
    const gated = applyRanking(list, ranking, before);
    reorder(list, ranking.map(([id]) => id), reduced);

    /* Built from the ranking, never typed: the first name, its score, and how
       many the gate dropped. */
    if (announce && changed) {
      const word = TIER_WORDS[Number(changed.value)];
      const top = candidate(ranking[0][0]).name;
      announce.textContent =
        `${changed.dataset.skill} set to ${word}. ` +
        `${top} now ranks first with ${ranking[0][1]} out of 100.` +
        (gated ? ` ${gated} candidates are not scored because they miss a critical skill.` : '');
    }
  }

  inputs.forEach((input) => {
    labelInput(input);
    input.addEventListener('input', () => {
      labelInput(input);
      update(input);
    });
  });
}

function initWhatIf(section, list) {
  const toggle = section.querySelector('[data-whatif]');
  const figure = section.querySelector('[data-whatif-figure]');
  const delta = section.querySelector('[data-whatif-delta]');
  const announce = section.querySelector('[data-field="whatif-announce"]');
  if (!toggle || !figure) return;

  toggle.addEventListener('change', () => {
    const on = toggle.checked;
    // Counts once, on toggle, and stops. A number that keeps moving implies
    // live data, and this figure is an example (`07 § 6`).
    recount(figure, on ? WHAT_IF.after : WHAT_IF.before);
    if (delta) delta.hidden = !on;

    /* PHASE 6. Where the list's rows carry a [data-missing] count (the landing
       page's tuner), the rows this would touch change: everyone missing the
       dropped skill loses one ✗. Derived from the candidates' own skill lists,
       and marked, not re-scored — the displayed state actually changes. */
    let touched = 0;
    if (list) {
      list.querySelectorAll('[data-row]').forEach((row) => {
        const cell = row.querySelector('.is-missing[data-missing]');
        if (!cell) return;
        const c = candidate(row.dataset.row);
        if (!c || !c.skills.missing.some((m) => m.name === WHAT_IF.skill)) return;
        const base = Number(cell.dataset.missing);
        cell.textContent = `${cell.textContent.trim().replace(/\d+$/, '')}${on ? base - 1 : base}`;
        cell.classList.toggle('is-changed', on);
        touched += 1;
      });
    }

    if (announce) {
      announce.textContent = on
        ? `Dropping ${WHAT_IF.skill} from the requirement takes the example qualified pool from ${WHAT_IF.before} to ${WHAT_IF.after}.` +
          (touched ? ` ${touched} rows no longer show it as missing.` : '')
        : `Requirement restored. Example qualified pool ${WHAT_IF.before}.`;
    }
  });
}

/** The phone's "Show all three controls" disclosure (landing page only). */
function initShowAll(section) {
  const btn = section.querySelector('[data-show-all]');
  const side = section.querySelector('.control__side');
  if (!btn || !side) return;
  btn.addEventListener('click', () => {
    const open = side.dataset.expanded === 'true';
    side.dataset.expanded = open ? 'false' : 'true';
    btn.setAttribute('aria-expanded', String(!open));
    btn.textContent = open ? 'Show all three controls' : 'Show one control';
  });
}

export function initTuner(root = document) {
  root.querySelectorAll('[data-tuner]').forEach((section) => {
    /* The controls and the list they reorder sit in different columns of the
       section's grid, so the tuner names its list by id rather than looking
       inside itself for one. */
    const list = document.getElementById(section.dataset.tuner);
    if (list) {
      initTuning(section, list);
    } else if (section.querySelector('[data-weight]')) {
      // A tuner with nothing to reorder is a control that does nothing. Say so
      // in development rather than shipping a dead slider.
      console.warn(`tuner: no list found with id "${section.dataset.tuner}"`);
    }
    initWhatIf(section, list);
    initShowAll(section);
  });
}
