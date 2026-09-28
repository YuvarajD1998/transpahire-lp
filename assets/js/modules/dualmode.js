/**
 * dualmode.js — the filters ⇄ describe control on the requisition composition.
 *
 * Section 04's second beat: search the pool by structured filters, or describe
 * the person in a sentence — both modes LIVE, and "they work side by side in
 * the same tool" is the product's own differentiator. The control exists so the
 * claim is demonstrated rather than asserted.
 *
 * Deliberately not built on tabs.js. That module implements the WAI-ARIA Tabs
 * pattern with a roving tabindex and a real tablist, which is right for a
 * page-level content switch and heavy for two segmented options inside a
 * mockup. This is two buttons and two panels, and it crossfades with the
 * existing `.tab-panel` primitive.
 */

export function initDualMode(root = document) {
  root.querySelectorAll('[data-dualmode]').forEach((group) => {
    const options = Array.from(group.querySelectorAll('[data-mode]'));
    const panels = Array.from(group.querySelectorAll('[data-mode-panel]'));
    if (!options.length || !panels.length) return;

    function select(key) {
      options.forEach((o) => {
        const on = o.dataset.mode === key;
        o.setAttribute('aria-selected', String(on));
        o.classList.toggle('is-active', on);
      });
      panels.forEach((p) => { p.hidden = p.dataset.modePanel !== key; });
    }

    options.forEach((option) => {
      option.addEventListener('click', () => select(option.dataset.mode));
    });
  });
}
