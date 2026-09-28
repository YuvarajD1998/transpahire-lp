/**
 * menu.js — the header disclosure menus.
 *
 * `10 § R23`: the nav needs `Product ▾` carrying four items and `For teams ▾`
 * carrying one, no such component existed, and the requirement is explicit —
 * *build one with a real a11y contract or flatten to plain links. Do not ship a
 * hover-only menu.* A hover menu is unreachable by keyboard and unusable on
 * touch, where the first tap opens it and also follows whatever is underneath.
 *
 * So this is a real disclosure, not a menubar. The distinction matters: WAI-ARIA
 * `role="menu"` describes an application menu with its own focus model, and
 * applying it to a list of page links makes a screen reader announce navigation
 * as though it were a desktop application. A button with `aria-expanded`
 * controlling a plain list of links is the correct pattern for site navigation,
 * and it is what this builds.
 *
 * Provides:
 *   · a real <button> with aria-expanded and aria-controls
 *   · click, Enter and Space to open; Escape to close and return focus
 *   · Down from the button moves into the panel; Up/Down move between links
 *   · Tab out of the last link closes the panel behind you
 *   · an outside click or pointer-down anywhere else closes it
 *   · only one panel open at a time
 *   · panels are `inert` while closed, so their links never sit in the tab
 *     order of a page whose menu is shut
 *
 * Markup contract:
 *   <div class="navmenu" data-navmenu>
 *     <button class="navmenu__button" aria-expanded="false" aria-controls="menu-product">…</button>
 *     <div class="navmenu__panel" id="menu-product" data-open="false">
 *       <a class="navmenu__link" href="…">…</a>
 *     </div>
 *   </div>
 */

const LINKS = '.navmenu__link';

export function initMenu(root = document) {
  const menus = Array.from(root.querySelectorAll('[data-navmenu]'));
  if (!menus.length) return;

  const instances = menus.map(setup).filter(Boolean);
  if (!instances.length) return;

  function closeAll(except) {
    instances.forEach((instance) => {
      if (instance !== except) instance.close(false);
    });
  }

  instances.forEach((instance) => {
    instance.onOpen = () => closeAll(instance);
  });

  // Pointerdown rather than click: a click listener fires after the browser has
  // already moved focus, which leaves the panel closing on the same gesture
  // that was meant to focus something inside it.
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('[data-navmenu]')) closeAll(null);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const open = instances.find((i) => i.isOpen());
      if (open) {
        event.preventDefault();
        open.close(true);
      }
    }
  });
}

function setup(menu) {
  const button = menu.querySelector('.navmenu__button');
  const panel = menu.querySelector('.navmenu__panel');
  if (!button || !panel) return null;

  const links = Array.from(panel.querySelectorAll(LINKS));
  let open = false;

  const instance = {
    isOpen: () => open,
    close: (restoreFocus) => set(false, restoreFocus),
    onOpen: () => {},
  };

  function set(next, restoreFocus = false) {
    if (next === open) return;
    open = next;

    button.setAttribute('aria-expanded', String(next));
    panel.setAttribute('data-open', String(next));
    panel.toggleAttribute('inert', !next);

    if (next) instance.onOpen();
    if (!next && restoreFocus) button.focus();
  }

  button.addEventListener('click', () => set(!open));

  button.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      set(true);
      // Deferred so the panel is no longer inert when focus lands — the same
      // ordering problem nav.js documents for the drawer.
      window.requestAnimationFrame(() => links[0]?.focus());
    }
  });

  panel.addEventListener('keydown', (event) => {
    const index = links.indexOf(document.activeElement);

    if (event.key === 'ArrowDown' && index > -1) {
      event.preventDefault();
      links[Math.min(index + 1, links.length - 1)].focus();
      return;
    }
    if (event.key === 'ArrowUp' && index > -1) {
      event.preventDefault();
      if (index === 0) button.focus();
      else links[index - 1].focus();
      return;
    }
    if (event.key === 'Home' && index > -1) {
      event.preventDefault();
      links[0].focus();
      return;
    }
    if (event.key === 'End' && index > -1) {
      event.preventDefault();
      links[links.length - 1].focus();
      return;
    }
    // Tabbing off the end closes the panel behind you rather than leaving an
    // open menu floating over a page you have moved on from.
    if (event.key === 'Tab' && !event.shiftKey && index === links.length - 1) {
      set(false);
    }
    if (event.key === 'Tab' && event.shiftKey && index === 0) {
      set(false);
    }
  });

  // Any navigation closes the menu, including a same-page anchor, which does
  // not trigger a page load.
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) set(false);
  });

  // Start closed and inert.
  panel.setAttribute('data-open', 'false');
  panel.toggleAttribute('inert', true);
  button.setAttribute('aria-expanded', 'false');

  return instance;
}
