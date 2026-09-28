/**
 * tabs.js — accessible tabbed panels.
 *
 * Implements the WAI-ARIA Tabs pattern with manual activation:
 *   · roving tabindex — one tab in the page tab order, arrows move between them
 *   · Home / End jump to the first and last tab
 *   · aria-selected, aria-controls and aria-labelledby wired both directions
 *   · panels toggled with the `hidden` attribute so assistive technology is
 *     told the content is gone, not merely invisible
 *
 * The previous build had tablist/tab roles with none of the state or keyboard
 * behaviour those roles promise, which is worse for a screen-reader user than
 * plain buttons would have been.
 *
 * Markup contract:
 *   <div data-tabs>
 *     <div role="tablist"> <button data-tab="key"> … </div>
 *     <div class="tab-panel" data-panel="key"> … </div>
 *   </div>
 */

export function initTabs(root = document) {
  root.querySelectorAll('[data-tabs]').forEach(setupGroup);
}

function setupGroup(group, groupIndex) {
  const tabs = Array.from(group.querySelectorAll('[data-tab]'));
  const panels = Array.from(group.querySelectorAll('[data-panel]'));
  if (!tabs.length || !panels.length) return;

  const uid = group.id || `tabs-${groupIndex ?? Math.random().toString(36).slice(2, 8)}`;

  // Wire the relationships. Doing this in JS rather than by hand in the markup
  // keeps the two lists from drifting apart as sections are edited.
  tabs.forEach((tab) => {
    const key = tab.dataset.tab;
    const panel = panels.find((p) => p.dataset.panel === key);
    if (!panel) return;

    tab.id ||= `${uid}-tab-${key}`;
    panel.id ||= `${uid}-panel-${key}`;

    tab.setAttribute('role', 'tab');
    tab.setAttribute('type', 'button');
    tab.setAttribute('aria-controls', panel.id);

    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    // Panels hold focusable content and long text; making the panel itself
    // focusable gives keyboard users a way into it from the tab.
    panel.setAttribute('tabindex', '0');
  });

  function activate(key, { moveFocus = false } = {}) {
    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === key;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    });

    panels.forEach((panel) => {
      panel.toggleAttribute('hidden', panel.dataset.panel !== key);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab.dataset.tab));

    tab.addEventListener('keydown', (event) => {
      const current = tabs.indexOf(tab);
      let next = -1;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next = (current + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          next = (current - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      activate(tabs[next].dataset.tab, { moveFocus: true });
    });
  });

  // Honour whichever tab the markup marked active; fall back to the first.
  const initial = tabs.find((t) => t.classList.contains('is-active')) || tabs[0];
  activate(initial.dataset.tab);
}
