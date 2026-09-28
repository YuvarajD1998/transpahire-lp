/**
 * nav.js — header scroll state and mobile navigation.
 *
 * The previous build hid the nav links below 800px with no replacement, which
 * left the site with no navigation at all on a phone. This module adds a real
 * disclosure menu: a labelled button, aria-expanded, focus trapping while
 * open, Escape to close, and scroll lock on the body.
 */

const OPEN = 'true';
const CLOSED = 'false';

/** Elements that can receive focus inside the drawer. */
const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function initScrollState(header) {
  let ticking = false;

  const update = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 12);
    ticking = false;
  };

  // Reads are batched into a rAF callback so a fast scroll cannot queue up
  // dozens of style recalculations on the main thread.
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

function initDrawer(header) {
  const toggle = header.querySelector('[data-nav-toggle]');
  const drawer = document.getElementById(toggle?.getAttribute('aria-controls') || '');
  if (!toggle || !drawer) return;

  const scrim = document.querySelector('[data-nav-scrim]');
  const links = Array.from(drawer.querySelectorAll('.nav-drawer__link'));

  // Stagger indices for the cascade in motion.css § 5.
  links.forEach((link, i) => link.style.setProperty('--i', String(i)));

  let isOpen = false;
  let lastFocused = null;

  function setOpen(next) {
    if (next === isOpen) return;
    isOpen = next;

    toggle.setAttribute('aria-expanded', next ? OPEN : CLOSED);
    drawer.setAttribute('data-open', next ? OPEN : CLOSED);
    drawer.toggleAttribute('inert', !next);
    if (scrim) scrim.setAttribute('data-open', next ? OPEN : CLOSED);

    // Locking scroll on <html> rather than <body> avoids the iOS Safari
    // scroll-position reset that body-level locking causes.
    document.documentElement.classList.toggle('is-nav-open', next);

    if (next) {
      lastFocused = document.activeElement;
      const first = drawer.querySelector(FOCUSABLE);
      // Deferred so the element is no longer inert when focus lands.
      window.requestAnimationFrame(() => first?.focus());
    } else {
      // `document.body` is an HTMLElement but focusing it is the same as
      // focusing nothing — the keyboard user is dropped back to the top of
      // the page. Only restore to a real, still-connected control.
      const restore =
        lastFocused instanceof HTMLElement &&
        lastFocused !== document.body &&
        lastFocused.isConnected
          ? lastFocused
          : toggle;
      restore.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(!isOpen));
  scrim?.addEventListener('click', () => setOpen(false));

  // Any navigation closes the menu — including same-page anchors, which do
  // not trigger a page load.
  drawer.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    // Keep focus inside the drawer while it covers the page.
    const focusable = Array.from(drawer.querySelectorAll(FOCUSABLE));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Returning to a desktop width must not leave a hidden drawer holding focus.
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });

  // Start closed and inert so its links are not in the tab order on desktop.
  drawer.setAttribute('data-open', CLOSED);
  drawer.toggleAttribute('inert', true);
  toggle.setAttribute('aria-expanded', CLOSED);
}

export function initNav() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;
  initScrollState(header);
  initDrawer(header);
}
