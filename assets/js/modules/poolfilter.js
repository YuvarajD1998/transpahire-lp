/**
 * poolfilter.js — the classification filter chips on the section 05 ranked list.
 *
 * The cheapest thing on the page that earns its place: it proves the ranked
 * list is markup rather than an image. `05 § 2` calls it optional for exactly
 * that reason — the value is not the filtering, it is that the filtering works.
 *
 * Real <button>s with aria-pressed, rows hidden with the `hidden` attribute so
 * assistive technology is told a row is gone rather than merely invisible, and
 * a live region that says how many people are left. Nothing here computes a
 * count that is not already in the DOM.
 */

const COUNT_SELECTOR = '[data-pool-count]';

export function initPoolFilter(root = document) {
  root.querySelectorAll('[data-pool-filter]').forEach((group) => {
    const list = document.getElementById(group.dataset.poolFilter);
    if (!list) return;

    const buttons = Array.from(group.querySelectorAll('[data-band]'));
    const rows = Array.from(list.querySelectorAll('[data-row]'));
    /* The status line is a sibling of the list, not of the buttons, so it is
       found from the composition they share. */
    const readout = group.closest('.rank')?.querySelector(COUNT_SELECTOR);

    if (!buttons.length || !rows.length) return;

    function apply(band) {
      let shown = 0;
      rows.forEach((row) => {
        const match = band === 'all' || row.dataset.classification === band;
        row.hidden = !match;
        if (match) shown += 1;
      });

      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.band === band)));

      if (readout) {
        readout.textContent =
          band === 'all'
            ? `Showing all ${shown} of the ${shown} candidates in this view.`
            : `Showing ${shown} ${band} ${shown === 1 ? 'match' : 'matches'}.`;
      }
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => apply(button.dataset.band));
    });
  });
}
