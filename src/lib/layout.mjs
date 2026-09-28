/**
 * layout.mjs — the page shell every page shares.
 *
 * `docs/architecture.md § 1` sets the migration trigger at two or more of: more
 * than three pages · a committed blog · data-driven product visualisations ·
 * non-maintainer editors. Two fire. This file is the answer to the first of
 * them: thirteen copies of a `<head>`, a header, a drawer and a footer is
 * exactly how a hand-written marketing site drifts out of sync, and the drift
 * is invisible until a link is wrong on one page and right on twelve.
 *
 * It is authoring-time only. The output is static HTML with no build artefact
 * and no runtime dependency — see tools/build.mjs.
 *
 * Every page gets the same `<head>` contract, per `docs/architecture.md § 3`:
 * title, description, canonical, robots, OG, Twitter, theme-color, icons,
 * manifest. Cascade order is load order and the five `<link>` tags are never
 * reordered.
 */

import { esc } from './compositions.mjs';

const SITE = 'https://transpahire.com';

/* --------------------------------------------------------------------------
   Navigation — `04 § 2`. Four items maximum, and four is now what the content
   supports.

   PHASE 4 ADDED TRUST AS A TOP-LEVEL ITEM, and it is deliberately not filed
   under Product. The buyer looking for it is not browsing: they have been handed
   the site by somebody else and they are looking for who can see candidate data
   and what gets logged. An item they have to open a menu to find is an item they
   assume is not there.

   `For teams` became a menu, because the audience split into two genuinely
   different fears — a recruiter's and a hiring manager's — and Phase 3's note
   said the link would become a menu the moment there was a second page.
   -------------------------------------------------------------------------- */

export const NAV = [
  {
    label: 'Product',
    href: '/product/',
    items: [
      { href: '/product/', title: 'Overview', note: 'The whole platform, six pillars, one page' },
      { href: '/product/matching/', title: 'Explainable matching', note: 'How a score comes apart, and the weights behind it' },
      { href: '/product/sourcing/', title: 'Sourcing', note: 'Two ways to search, and an agent that keeps going' },
      { href: '/product/candidate-intelligence/', title: 'Candidate intelligence', note: 'What the platform knows, and how it got there' },
      { href: '/product/hiring-operations/', title: 'Hiring operations', note: 'From an approved requisition to a signed offer' },
      { href: '/product/analytics/', title: 'Reporting', note: 'Funnel, bottlenecks and what is scarce in your pool' },
    ],
  },
  {
    /* "Who it's for", not "For teams". Phase 4 split the audience into three,
       and a candidate is not a team — filing them under one would be a worse
       information architecture than the single link it replaces. The label also
       matches the footer's column heading, so the two navigations agree. */
    label: "Who it's for",
    href: '/for-teams/',
    items: [
      { href: '/for-teams/', title: 'Recruiters & talent teams', note: 'Read six arguments instead of forty CVs' },
      { href: '/for-hiring-managers/', title: 'Hiring managers', note: 'Come to the meeting with the reasoning' },
      { href: '/for-candidates/', title: 'Candidates', note: 'The same score the recruiter sees' },
    ],
  },
  /* PHASE 5 ADDED TOOLS, AND IT IS THE FIFTH ITEM — a deliberate break with
     `04 § 2`'s four-item maximum, recorded here rather than quietly.

     The rule is a good one and the reason to break it is narrow. Before Phase 5
     every one of twenty-one pages funnelled into a thirty-minute call, and these
     two pages are the only thing on the site a visitor can DO. `docs/phase-5.md`
     § 4.4 puts the argument better than a nav rule does: somebody who arrives to
     try something is not browsing a product menu. Folding them under Product
     would file the site's only low-threshold action behind the high-threshold
     one, which is the exact failure the stream exists to fix.

     If a sixth item is ever proposed, this is the one to fold — not the one to
     cite as precedent. */
  {
    label: 'Tools',
    href: '/check/job-description/',
    items: [
      { href: '/check/job-description/', title: 'Check a job description', note: 'Tiered skills, shape findings and the language flags — no account' },
      { href: '/check/resume/', title: 'Check a résumé', note: 'The quality score, the suggestions, and the skills that open more roles' },
    ],
  },
  { label: 'Trust', href: '/trust/' },
  { label: 'About', href: '/about/' },
];

/** The app host. Also the route shown in every composition's frame chrome. */
const APP = 'https://app.transpahire.com/';

/* --------------------------------------------------------------------------
   Icon sprite. Inline, so icons cost no request and inherit currentColor.
   Only the symbols the site actually uses — the social marks are gone with the
   social links (`10 § R18`: confirmed handles, or delete the icons).
   -------------------------------------------------------------------------- */

const SPRITE = `<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
  <defs>
    <!-- Stratum brand mark: a T whose stem accumulates from translucent to
         solid — "transparency in layers". Vector source of truth lives in
         assets/brand/; this symbol mirrors it for inline use. -->
    <symbol id="stratum" viewBox="0 0 64 64">
      <rect x="6" y="10" width="52" height="8" fill="currentColor"/>
      <rect x="28" y="22" width="8" height="9" fill="currentColor" opacity="0.28"/>
      <rect x="28" y="33" width="8" height="9" fill="currentColor" opacity="0.58"/>
      <rect x="28" y="44" width="8" height="12" fill="currentColor"/>
    </symbol>
    <symbol id="i-arrow-right" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
    <symbol id="i-search" viewBox="0 0 20 20"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M14 14l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-eye" viewBox="0 0 20 20"><path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/></symbol>
    <symbol id="i-network" viewBox="0 0 20 20"><circle cx="10" cy="4" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="4" cy="16" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="16" cy="16" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 6v4M10 10l-5 5M10 10l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-users" viewBox="0 0 20 20"><circle cx="7" cy="7" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 17c0-3 2.2-5 5-5s5 2 5 5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="14" cy="8" r="2.4" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M12.5 17c.2-2 2-3.5 4.2-3.5" stroke="currentColor" stroke-width="1.4" fill="none"/></symbol>
    <symbol id="i-sliders" viewBox="0 0 20 20"><path d="M3 5h8M14 5h3M3 10h3M9 10h8M3 15h11M17 15h0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="7" cy="10" r="1.6" fill="currentColor"/><circle cx="15" cy="15" r="1.6" fill="currentColor"/></symbol>
    <symbol id="i-gauge" viewBox="0 0 20 20"><path d="M3 14a7 7 0 1 1 14 0" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 14L13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="14" r="1.4" fill="currentColor"/></symbol>
    <symbol id="i-mail" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 6l8 6 8-6" stroke="currentColor" stroke-width="1.5" fill="none"/></symbol>
    <symbol id="i-bell" viewBox="0 0 20 20"><path d="M5 14V9a5 5 0 1 1 10 0v5l1.5 1.5h-13z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M8.5 17a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.5" fill="none"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 20 20"><rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2.5 8h15M7 2v4M13 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-clipboard" viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="7" y="2" width="6" height="3" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 10h6M7 13h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>

    <!-- PHASE 5. Three symbols the job detail surface needs, and no more:
         i-alert is the amber skill-review flag, i-radar is the glyph the
         product puts on its Sourcing tab, and i-close is the drawer's dismiss.
         All three are drawn from the product's own affordances rather than
         added because an icon set had them. -->
    <symbol id="i-alert" viewBox="0 0 20 20"><path d="M10 2.5l8 14H2l8-14z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M10 8v3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="10" cy="14" r="1" fill="currentColor"/></symbol>
    <symbol id="i-radar" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.4" fill="none" opacity=".45"/><circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.4" fill="none" opacity=".7"/><path d="M10 10l5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="1.3" fill="currentColor"/></symbol>
    <symbol id="i-close" viewBox="0 0 20 20"><path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  </defs>
</svg>`;

/* --------------------------------------------------------------------------
   Header
   -------------------------------------------------------------------------- */

function navItem(item) {
  if (!item.items) {
    return `      <a class="site-nav__link" href="${item.href}">${esc(item.label)}</a>`;
  }

  /* An id, not a label: anything that is not a letter or a digit becomes a
     hyphen, so a label with an apostrophe in it cannot produce an id that
     aria-controls has to quote. */
  const id = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  return `      <div class="navmenu" data-navmenu>
        <button type="button" class="navmenu__button" aria-expanded="false" aria-controls="${id}">
          ${esc(item.label)}
          <svg class="navmenu__caret" width="12" height="12" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg>
        </button>
        <div class="navmenu__panel" id="${id}" data-open="false">
${item.items.map((sub) => `          <a class="navmenu__link" href="${sub.href}">
            <span class="navmenu__link-title">${esc(sub.title)}</span>
            <span class="navmenu__link-note">${esc(sub.note)}</span>
          </a>`).join('\n')}
        </div>
      </div>`;
}

function header() {
  return `<header class="site-header" data-site-header>
  <div class="container site-header__inner">
    <a class="wordmark" href="/" aria-label="Transpahire — home">
      <svg class="wordmark__mark" aria-hidden="true" focusable="false"><use href="#stratum"/></svg>
      <span>Transpahire</span>
    </a>

    <nav class="site-nav" aria-label="Primary">
${NAV.map(navItem).join('\n')}
    </nav>

    <div class="site-header__actions">
      <div class="site-header__utility">
        <!-- The candidate audience never competes: a quiet link, never a
             button, never in a hero: 02 section 4. -->
        <a class="site-header__candidate" href="/for-candidates/">Looking for a role?</a>
        <!-- Sign in is commented out of the header, on request (28 Sep 2026).
             The mobile drawer still carries it. Uncomment to restore; the
             ≤900px rule in sections.css that hides it is still in place.
        <a class="btn btn--ghost" href="${APP}">Sign in</a>
        -->
      </div>
      <a class="btn btn--primary hover-icon press" href="/demo/">
        Book a demo
        <svg class="btn__icon icon-shift" width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>
      </a>
      <button class="nav-toggle" data-nav-toggle type="button"
              aria-controls="nav-drawer" aria-expanded="false" aria-label="Open menu">
        <span class="nav-toggle__bars" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>

<div class="nav-scrim" data-nav-scrim aria-hidden="true"></div>

<div class="nav-drawer" id="nav-drawer">
  <nav aria-label="Mobile">
    <ul class="nav-drawer__list">
${NAV.filter((i) => !i.items).map((i) => `      <li><a class="nav-drawer__link" href="${i.href}">${esc(i.label)} <svg width="14" height="14" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a></li>`).join('\n')}
    </ul>
  </nav>

  <!-- The disclosure group flattens to a labelled list here. A nested
       accordion inside a drawer is two disclosures deep for no gain. -->
${NAV.filter((i) => i.items).map((i) => `  <div class="nav-drawer__group">
    <p class="nav-drawer__grouplabel">${esc(i.label)}</p>
${i.items.map((sub) => `    <a class="nav-drawer__sublink" href="${sub.href}">${esc(sub.title)}</a>`).join('\n')}
  </div>`).join('\n')}

  <div class="nav-drawer__actions mt-6">
    <a class="btn btn--primary btn--block" href="/demo/">Book a demo</a>
    <a class="btn btn--secondary btn--block" href="${APP}">Sign in</a>
  </div>
</div>`;
}

/* --------------------------------------------------------------------------
   PHASE 5 · THE SIGN-UP — `docs/phase-5.md` § 4.3
   --------------------------------------------------------------------------
   The smallest item in Phase 5 and the one with the largest ratio. Before this,
   twenty-one pages funnelled into exactly one action: a thirty-minute call with
   a stranger, bring your hardest open requisition. That is a good offer for
   somebody already convinced and no offer at all for anybody else, and there was
   no email field anywhere on the site — so a visitor who was interested but not
   ready had literally no way to stay in contact.

   ONE FIELD, ONE PROMISE, AND THE PROMISE IS THE POINT. "One email when there is
   something to say" is a commitment that a one-person company can actually keep,
   and a changelog that is already maintained plus a list emailed four times a
   year is the cheapest credibility instrument available here. A weekly
   newsletter would be a promise broken by the second month.

   `[CONFIRM]` — WHERE THE LIST LIVES. This form carries no action and no method,
   for the same reason /demo's does not: a form that appears to submit into
   nothing is worse than one that says so. `docs/phase-5.md` § 9 has it, and it
   also needs an answer on whether double opt-in is required in the markets being
   sold into. When the destination exists: add `method="POST" action="…"`, drop
   `novalidate`, replace the note with the confirmation behaviour, and delete
   this paragraph.

   It appears in two places and no more: here, and at the top of /changelog —
   which is the one page where a visitor has just read what shipped and is
   therefore the one place the promise is self-evidently keepable.
   -------------------------------------------------------------------------- */

export function signup({ id = 'footer-signup', ground = 'ink' } = {}) {
  return `<div class="signup signup--${ground}">
  <p class="signup__title">Told when something ships.</p>
  <p class="signup__promise">One email when there is something to say. Not a newsletter, no drip sequence, and you can leave from any of them.</p>

  <!-- No action and no method: see the module header, and docs/phase-5.md § 9. -->
  <form class="signup__form" novalidate>
    <label class="sr-only" for="${id}-email">Your email address</label>
    <input class="field__control signup__input" type="email" id="${id}-email" name="email"
           autocomplete="email" placeholder="you@company.com">
    <button class="btn btn--primary press" type="submit">Keep me posted</button>
  </form>

  <p class="signup__note" data-content="placeholder">
    <strong>Not wired up yet.</strong> The list has no home and no double-opt-in
    decision, so this would be a field that quietly discards what you typed.
    Until it does, <a class="link" href="/changelog/">the changelog</a> is the
    same information without the email — it is the page this list would be built
    from.
  </p>
</div>`;
}

/* --------------------------------------------------------------------------
   Footer

   No social icons: `10 § R18` says confirmed handles or delete them, and none
   are confirmed.

   The company-details line still says the registered details are pending, and it
   still should: unlike the /about panel Phase 4 deleted, a one-line note in a
   footer is where a procurement reader expects to look and finding nothing at
   all there is worse than finding an honest gap. The panel announced it; this
   answers it.
   -------------------------------------------------------------------------- */

function footer() {
  return `<footer class="site-footer on-ink">
  <div class="container">
    <div class="site-footer__grid">

      <div>
        <a class="wordmark" href="/" aria-label="Transpahire — home">
          <svg class="wordmark__mark" aria-hidden="true" focusable="false"><use href="#stratum"/></svg>
          <span>Transpahire</span>
        </a>
        <p class="site-footer__pitch">Hiring intelligence for teams that care about quality.</p>
        <p class="site-footer__legal">
          Transpahire, Inc.<br>
          Registered company details pending.
        </p>
      </div>

      <nav aria-labelledby="footer-product">
        <h2 class="site-footer__heading" id="footer-product">Product</h2>
        <a class="site-footer__link" href="/product/">Overview</a>
        <a class="site-footer__link" href="/product/matching/">Explainable matching</a>
        <a class="site-footer__link" href="/product/sourcing/">Sourcing</a>
        <a class="site-footer__link" href="/product/candidate-intelligence/">Candidate intelligence</a>
        <a class="site-footer__link" href="/product/hiring-operations/">Hiring operations</a>
        <a class="site-footer__link" href="/product/analytics/">Reporting</a>
        <a class="site-footer__link" href="/check/job-description/">Check a job description</a>
        <a class="site-footer__link" href="/check/resume/">Check a résumé</a>
      </nav>

      <nav aria-labelledby="footer-audience">
        <h2 class="site-footer__heading" id="footer-audience">Who it is for</h2>
        <a class="site-footer__link" href="/for-teams/">Recruiters &amp; talent teams</a>
        <a class="site-footer__link" href="/for-hiring-managers/">Hiring managers</a>
        <a class="site-footer__link" href="/for-candidates/">Looking for a role?</a>
      </nav>

      <nav aria-labelledby="footer-company">
        <h2 class="site-footer__heading" id="footer-company">Company</h2>
        <a class="site-footer__link" href="/about/">About</a>
        <a class="site-footer__link" href="/changelog/">What has shipped</a>
        <a class="site-footer__link" href="/pricing/">Pricing</a>
        <a class="site-footer__link" href="/demo/">Book a demo</a>
      </nav>

      <!-- ONE legal link, not three. Phase 3's footer carried three "in
           preparation" links, which was thirty-six reminders across the site
           that the company was not ready. The drafts fixed that, and then the
           set grew to four documents — four footer links to legal drafts is a
           legal department this company does not have. /legal/ is the index. -->
      <nav aria-labelledby="footer-trust">
        <h2 class="site-footer__heading" id="footer-trust">Trust</h2>
        <a class="site-footer__link" href="/trust/">Access and what is logged</a>
        <a class="site-footer__link" href="/trust/#will-not-claim">What we will not claim</a>
        <a class="site-footer__link" href="/legal/">Legal</a>
      </nav>

    </div>

    ${signup({ id: 'footer-signup' })}

    <div class="site-footer__bottom">
      <span>© 2026 Transpahire, Inc.</span>
    </div>
  </div>
</footer>`;
}

/* --------------------------------------------------------------------------
   The document
   -------------------------------------------------------------------------- */

/**
 * @param {object}  page
 * @param {string}  page.path         '/product/matching/'
 * @param {string}  page.title        the <title>, already including the brand
 * @param {string}  page.description  the meta description
 * @param {string}  page.body         everything inside <main>
 * @param {string} [page.bodyEnd]     markup after </main>, before the footer
 */
export function document_({ path, title, description, body, bodyEnd = '' }) {
  const canonical = `${SITE}${path}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Arms the pre-reveal hidden states before first paint. Without this the
     page would render revealed and then hide, because the module script that
     normally sets this class is deferred. The only inline script on the site. -->
<script>document.documentElement.classList.add('js');</script>

<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">

<!-- The site is deliberately closed to search engines until the content
     integrity gate clears: docs/content-integrity.md § 5. Both this tag and
     robots.txt have to change, on every page — both, or the site stays
     invisible. -->
<meta name="robots" content="noindex, nofollow">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Transpahire">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<!-- og:image does not exist yet — CONTENT REQUIRED, and on the indexing gate
     (see docs/phase-2/10-CONTENT_REQUIREMENTS.md, R13). It should render the section 06 explanation panel rather than
     a logo card: it is the one asset that explains the product at thumbnail
     size. No og:image is better than a broken one. -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">

<meta name="theme-color" content="#F7F6F2" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0B0B1F" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light">

<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon-180.png" sizes="180x180">
<link rel="manifest" href="/site.webmanifest">

<!-- Fonts. Only the weights the design system declares are requested.
     display=swap renders fallback text immediately rather than blocking. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400&display=swap">

<!-- Cascade order is load order. tokens → base → motion → components → sections. -->
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/motion.css">
<link rel="stylesheet" href="/assets/css/components.css">
<link rel="stylesheet" href="/assets/css/sections.css">

<script type="module" src="/assets/js/main.js"></script>

<!-- Organisation only. No Product, Offer, Review, AggregateRating or FAQ schema
     is emitted while any claim is unvalidated: emitting Review or Offer schema
     for unverified content would place invented claims into search results. -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Transpahire, Inc.",
  "url": "${SITE}/",
  "logo": "${SITE}/assets/brand/symbol-ink.svg",
  "description": "Hiring intelligence for teams that care about quality."
}
</script>
</head>

<body>

<a class="skip-link" href="#main">Skip to content</a>

${SPRITE}

${header()}

<main id="main">
${body}
</main>
${bodyEnd}
${footer()}

</body>
</html>
`;
}
