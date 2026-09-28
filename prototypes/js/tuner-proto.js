/**
 * tuner-proto.js — the control, with the proposed fixture.
 *
 * Same shape as assets/js/modules/tuner.js (which it borrows `reorder`, P3,
 * from) with three differences the Stage 1 report asked for:
 *
 *   1. It reads RANKINGS_PROPOSED, in which the advertised move reorders.
 *   2. A CRITICAL tier gates: a candidate missing that skill is not scored.
 *      The row says "Not scored · missing critical: Kafka" and drops last.
 *   3. The list explains the change: rows that moved carry a ▲ / ▼ for a beat,
 *      and the what-if marks the rows it would touch.
 *
 * No arithmetic: a lookup, a reorder, a recount.
 */

import { CLASSIFICATIONS, TIER_WORDS, WHAT_IF, IMPORTANCE_TONES, candidate } from '../../assets/data/product-demo.js';
import { RANKINGS_PROPOSED } from '../data/rankings-proposed.js';
import { reorder } from '../../assets/js/modules/tuner.js';
import { recount } from '../../assets/js/modules/counter.js';
import { setRing } from '../../assets/js/modules/ring.js';
import { prefersReducedMotion } from '../../assets/js/modules/prefs.js';

function applyRanking(list, ranking, previousOrder) {
  let gated = 0;
  ranking.forEach(([id, score, classification, gateSkill], index) => {
    const row = list.querySelector(`[data-row="${id}"]`);
    if (!row) return;
    const gate = row.querySelector('[data-gate]');
    const number = row.querySelector('[data-row-score]');
    const chip = row.querySelector('[data-row-chip]');
    const sr = row.querySelector('[data-row-sr]');
    const moved = row.querySelector('[data-moved]');

    if (classification === 'gated') {
      gated += 1;
      row.classList.add('is-gated');
      if (gate) { gate.hidden = false; gate.querySelector('[data-gate-skill]').textContent = gateSkill; }
      if (sr) sr.textContent = `${candidate(id).name}: not scored. Disqualified before scoring for a missing critical requirement, ${gateSkill}.`;
    } else {
      row.classList.remove('is-gated');
      if (gate) gate.hidden = true;
      if (number) { recount(number, score); setRing(number.closest('[data-row-ring]'), score, classification); }
      if (chip) { chip.className = `chip chip--mono chip--${classification}`; chip.textContent = CLASSIFICATIONS[classification].short; }
      if (sr) sr.textContent = `${candidate(id).name}: match score ${score} out of 100, ${CLASSIFICATIONS[classification].label}.`;
    }

    if (moved) {
      const was = previousOrder.indexOf(id);
      const delta = was - index;
      moved.dataset.moved = delta > 0 ? 'up' : delta < 0 ? 'down' : '';
      moved.textContent = delta > 0 ? `▲ ${delta}` : delta < 0 ? `▼ ${-delta}` : '';
      window.clearTimeout(moved._t);
      moved._t = window.setTimeout(() => { moved.dataset.moved = ''; }, 1800);
    }
  });
  const count = list.closest('.rank')?.querySelector('[data-gatecount]');
  if (count) count.textContent = gated ? `${gated} not scored · critical gate` : '';
}

function initTuning(section, list) {
  const inputs = Array.from(section.querySelectorAll('[data-weight]'));
  const announce = section.querySelector('[data-field="tuner-announce"]');
  if (!list || !inputs.length) return;

  const key = () => inputs.map((i) => i.value).join('-');
  const order = () => Array.from(list.querySelectorAll('[data-row]')).map((r) => r.dataset.row);

  function label(input) {
    const tier = Number(input.value);
    const word = TIER_WORDS[tier] || TIER_WORDS[0];
    input.setAttribute('aria-valuetext', `${input.dataset.skill}: ${word}`);
    const readout = section.querySelector(`[data-weight-readout="${input.dataset.weight}"]`);
    if (readout) { readout.textContent = word; readout.dataset.tone = IMPORTANCE_TONES[word]; }
  }

  function update(changed) {
    const ranking = RANKINGS_PROPOSED[key()];
    if (!ranking) return;
    const before = order();
    applyRanking(list, ranking, before);
    reorder(list, ranking.map(([id]) => id), prefersReducedMotion());
    if (announce && changed) {
      const word = TIER_WORDS[Number(changed.value)];
      const gated = ranking.filter((r) => r[2] === 'gated').length;
      const top = candidate(ranking[0][0]).name;
      announce.textContent = `${changed.dataset.skill} set to ${word}. ${top} now ranks first with ${ranking[0][1]} out of 100.` + (gated ? ` ${gated} candidates are not scored because they miss a critical skill.` : '');
    }
  }

  inputs.forEach((input) => {
    label(input);
    input.addEventListener('input', () => { label(input); update(input); });
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
    recount(figure, on ? WHAT_IF.after : WHAT_IF.before);
    if (delta) delta.hidden = !on;
    /* The rows this would touch: everyone missing the dropped skill. Derived
       from the candidates' own skill lists, and marked, not re-scored. */
    list.querySelectorAll('[data-row]').forEach((row) => {
      const c = candidate(row.dataset.row);
      const misses = c.skills.missing.some((m) => m.name === WHAT_IF.skill);
      const cell = row.querySelector('.is-missing');
      if (!cell || !misses) return;
      const base = Number(cell.dataset.missing);
      cell.textContent = `✗${on ? base - 1 : base}`;
      cell.classList.toggle('is-changed', on);
    });
    if (announce) announce.textContent = on
      ? `Dropping ${WHAT_IF.skill} takes the example qualified pool from ${WHAT_IF.before} to ${WHAT_IF.after}. Five rows no longer show it as missing.`
      : `Requirement restored. Example qualified pool ${WHAT_IF.before}.`;
  });
}

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

export function initProtoTuner(root = document) {
  root.querySelectorAll('[data-proto-tuner]').forEach((section) => {
    const list = document.getElementById(section.dataset.protoTuner);
    if (!list) { console.warn('proto tuner: no list', section.dataset.protoTuner); return; }
    initTuning(section, list);
    initWhatIf(section, list);
    initShowAll(section);
  });
}
