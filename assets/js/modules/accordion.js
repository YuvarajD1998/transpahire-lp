/**
 * accordion.js — disclosure groups (FAQ, feature detail, spec lists).
 *
 * A real <button> per item with aria-expanded and aria-controls. The Myniq
 * reference implements the same visual pattern with a div and tabindex="0",
 * which announces nothing to a screen reader and cannot be operated with
 * Space — the interaction idea was worth borrowing, the implementation was not.
 *
 * Height animation is CSS-only (grid-template-rows 0fr → 1fr, see
 * motion.css § 5), so this module never measures or writes a pixel height.
 *
 * Markup contract:
 *   <div data-accordion [data-accordion-single]>
 *     <div class="accordion__item" data-open="false">
 *       <h3><button data-accordion-trigger> … </button></h3>
 *       <div class="accordion__panel"><div> … </div></div>
 *     </div>
 *   </div>
 */

export function initAccordion(root = document) {
  root.querySelectorAll('[data-accordion]').forEach(setupGroup);
}

function setupGroup(group, groupIndex) {
  const items = Array.from(group.querySelectorAll('.accordion__item'));
  if (!items.length) return;

  // Only one panel open at a time when the group opts in. Default is
  // multi-open, which is the friendlier default for a reference list.
  const single = group.hasAttribute('data-accordion-single');
  const uid = group.id || `acc-${groupIndex ?? Math.random().toString(36).slice(2, 8)}`;

  items.forEach((item, i) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const panel = item.querySelector('.accordion__panel');
    if (!trigger || !panel) return;

    trigger.id ||= `${uid}-trigger-${i}`;
    panel.id ||= `${uid}-panel-${i}`;

    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', trigger.id);

    const open = item.dataset.open === 'true';
    trigger.setAttribute('aria-expanded', String(open));
    // The collapsed panel is removed from the tab order and the accessibility
    // tree. `inert` rather than `hidden` because the panel must keep its box
    // for the height transition to animate from.
    panel.toggleAttribute('inert', !open);

    trigger.addEventListener('click', () => {
      const nowOpen = item.dataset.open !== 'true';

      if (single && nowOpen) {
        items.forEach((other) => other !== item && setItem(other, false));
      }
      setItem(item, nowOpen);
    });
  });

  // Up/Down move between triggers, matching the disclosure conventions
  // keyboard users already expect from a tab list.
  const triggers = items
    .map((item) => item.querySelector('[data-accordion-trigger]'))
    .filter(Boolean);

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('keydown', (event) => {
      let next = -1;
      if (event.key === 'ArrowDown') next = (index + 1) % triggers.length;
      else if (event.key === 'ArrowUp') next = (index - 1 + triggers.length) % triggers.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = triggers.length - 1;
      else return;

      event.preventDefault();
      triggers[next].focus();
    });
  });
}

function setItem(item, open) {
  const trigger = item.querySelector('[data-accordion-trigger]');
  const panel = item.querySelector('.accordion__panel');
  item.dataset.open = String(open);
  trigger?.setAttribute('aria-expanded', String(open));
  panel?.toggleAttribute('inert', !open);
}
