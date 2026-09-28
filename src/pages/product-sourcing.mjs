/**
 * product-sourcing.mjs — /product/sourcing
 *
 * PHASE 4 REBUILT THIS PAGE, and it needed it more than any other.
 *
 * THE CONSTRAINT THAT SHAPED PHASE 3 IS GONE. The page carried a whole section
 * explaining that the AI sourcing agent exists and would not be drawn, because
 * no source described its interface. `docs/phase-4.md` § 1.5 describes it in
 * detail — missions, targets, a run ledger, fingerprinted strategies that cannot
 * repeat, visible refusals, and a terminal state that recommends what to relax
 * with a measured impact. It is the most defensible capability in the product,
 * and the site was apologising for not showing it.
 *
 * So the "named, not depicted" section is deleted and Always-On Sourcing is the
 * largest section on the page, built on `missionConsole()`.
 *
 * THE BROWSER EXTENSION IS NOW SHOWN, AS A SCREENSHOT — NOT DRAWN. It had no
 * interface specification, and docs/product-visualization.md § 1 still applies:
 * a rendered UI that does not correspond to the product is a lie with a design
 * budget. A capture of the running extension (28 Sep 2026) is the product, so
 * the slot took it. The copy beside it is read off `transpahire-source-extension/
 * src/popup/main.ts`: the page-kind pill (`providerLabel`), the preview, capture
 * only on the button, the in-your-pool and possible-duplicate states. The email
 * address is blurred and the browser's bookmarks cleared; nothing else is edited.
 *
 * THE CONSENT SECTION WAS REWRITTEN, and it was the highest-priority copy change
 * on the site — the only one with real legal exposure. The page used to say
 * search "does not import a person who did not ask to be there", which the
 * default import path contradicts: there are two populations in the candidate
 * database and the site described one. Confirmed 31 Aug 2026: an imported
 * profile is visible only inside the organisation that brought it in, until the
 * person activates it. That is a strong claim and the copy makes it.
 */

import {
  compositionNote, marketCovered, missionComposition, screenshotSlot,
  searchComposition,
} from '../lib/compositions.mjs';
import { arrowLink, head, pageCta, pageHead } from '../lib/page.mjs';
import {
  ACCOUNT_STATUS, CONSENT, MISSION, MISSION_STATUS,
} from '../../assets/data/product-demo.js';

export const meta = {
  path: '/product/sourcing/',
  title: 'Candidate sourcing and Always-On Sourcing — Transpahire',
  description:
    'Filter by skills, experience, location and availability — or describe who you need in a sentence. Then let the sourcing agent keep watching, with every approach it tried on the record, including the ones you turned down.',
};

export function render() {
  return `${pageHead({
    crumb: 'Product',
    crumbHref: '/product/',
    eyebrow: 'Sourcing',
    title: 'Find candidates who fit, <em>not just candidates who applied.</em>',
    lede: 'Every profile in the database is searchable and scoreable against a role, whether or not anyone applied to it. Two ways to search, and an agent that keeps searching after you stop.',
  })}

<!-- ── Two modes, one tool ──────────────────────────────────────────────── -->
<section class="section section--tight-top" data-content="provisional">
  <div class="container">
${head({
  eyebrow: 'Two modes, one tool',
  title: 'Filter it, <em>or describe it.</em>',
  lede: 'Structured search takes skills, experience, education, certifications, location, notice period, open-to-work status, expected salary and profile quality. Semantic search takes a sentence. They work side by side in the same interface, which is the part most tools do not do.',
})}
    <div data-reveal="rise">
${searchComposition()}
      ${compositionNote()}
    </div>

    <div class="pair mt-16">
      <div data-reveal="left">
        <p class="body-copy body-copy--lg measure">
          Every result carries the phrase from the candidate&rsquo;s own profile that matched,
          and the section it came from. A semantic result you cannot check is a guess with
          better manners; a semantic result that quotes its evidence is a result.
        </p>
      </div>
      <div data-reveal="right">
        <p class="body-copy measure">
          A search you want again is a saved search, with its own history. Location aliases
          resolve on their own — Bengaluru and Bangalore, Mumbai and Bombay, are one place, not
          two searches.
        </p>
        <p class="body-copy measure mt-6">
          And a search is logged. Who ran it, when, and what came back — see
          ${arrowLink('what gets logged', '/trust/#logged')}.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── Always-On Sourcing ★ ─────────────────────────────────────────────── -->
<section class="section section--sunken" id="always-on" data-content="provisional">
  <div class="container">
${head({
  eyebrow: MISSION.name,
  title: 'It keeps watching <em>after you stop.</em>',
  lede: `Give a role a target — ${MISSION.target} strong matches — and the agent checks every new and updated candidate against it. You hear about someone when they become a strong match, not when a report runs.`,
})}

    <div data-reveal="rise">
${missionComposition()}
      ${compositionNote()}
    </div>

    <div class="grid grid--3 mt-16" data-reveal-group data-stagger="normal">
      <article class="card">
        <h3 class="h-card card__title">It cannot repeat itself</h3>
        <p class="body-copy card__body">Every search it tries is fingerprinted, so an approach that has been run once is never run again. The count it shows you is people it had not seen before, not results it returned.</p>
        <p class="card__benefit">Fifty familiar names is not a finding.</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">It shows you what it refused</h3>
        <p class="body-copy card__body">An approach you declined stays in the history, struck through and visible. So does one waiting on your approval — widening a critical requirement is not something it does quietly.</p>
        <p class="card__benefit">A list that only ever agrees with itself is not evidence of anything.</p>
      </article>
      <article class="card">
        <h3 class="h-card card__title">Every run is on the record</h3>
        <p class="body-copy card__body">Each run records what triggered it, how many rounds and calls it used, how many candidates it evaluated, how many were new, and why it stopped. Each step records the tool it called and a summary of counts — never candidate rows.</p>
        <p class="card__benefit">You can audit an agent you can read.</p>
      </article>
    </div>

    <div class="pair mt-16">
      <div data-reveal="left">
        <p class="body-copy body-copy--lg measure">
          A mission knows the shape of the job it was started from, and notices when the job
          changes underneath it. It knows the difference between a target counted across the
          whole pool and a target counted from the day you started. And it distinguishes the
          band it is hunting for from the band it will interrupt you about — you can look for
          strong matches and still hear about a good one.
        </p>
      </div>
      <div data-reveal="right">
        <p class="body-copy measure">
          Six states, and they are the product&rsquo;s own words:
          ${Object.values(MISSION_STATUS).map((v) => `<strong>${v}</strong>`).join(' · ')}.
        </p>
        <p class="body-copy measure mt-6">
          Not one of them is “complete”. A sourcing run that has covered the market has not
          finished; it has run out of market, which is a different thing and the next section
          is about it.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── When the market is covered ───────────────────────────────────────── -->
<section class="section" id="market-covered" data-content="provisional">
  <div class="container pair pair--lead">
    <div data-reveal="left">
      <p class="eyebrow">The honest answer</p>
      <h2 class="h-section mt-6">The most useful thing it says is <em>“there is nobody left.”</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        When the agent has covered the market it stops and tells you what would change that,
        with a measured estimate against each option — including the options that would change
        nothing.
      </p>
      <p class="body-copy measure mt-6">
        That last part is deliberate. There are three answers it can give about an option: it
        cannot measure the effect, in which case it shows nothing; it measured the effect and
        the effect is zero, in which case it says so out loud; or it has a number, which it
        labels an estimate.
      </p>
      <p class="lede mt-8 measure">
        A plausible invented number is worse than a blank, <em>because you would act on
        it.</em>
      </p>
    </div>
    <div data-reveal="right">
${marketCovered()}
    </div>
  </div>
</section>

<!-- ── How often we interrupt you ───────────────────────────────────────── -->
<section class="section section--sunken">
  <div class="container container--text">
${head({
  eyebrow: 'Notifications',
  title: 'How often <em>we interrupt you.</em>',
})}
    <div class="prose" data-reveal="up">
      <p>
        An agent that watches a role for you is an agent that can interrupt you, so the product
        measures whether its own interruptions are worth having. It tracks how many of its
        notifications you dismiss and how many you actually open, shows you both numbers, and
        warns when the dismissal rate goes above ${MISSION.trust.dismissalWarn}% or the view
        rate falls below ${MISSION.trust.viewWarn}%.
      </p>
      <p>
        There are ${''}twenty-two kinds of notification and you choose which of them are worth an
        email. Job alerts on a saved search run daily, weekly, or the moment something matches.
      </p>
      <p>
        We are aware of how this reads as a marketing claim, so: it is a panel in the product
        with two percentages on it. That is all it is, and it is more than a tool that never
        asks the question.
      </p>
    </div>
  </div>
</section>

<!-- ── Once you have someone ────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
${head({
  eyebrow: 'Once you have someone',
  title: 'One good profile <em>is a search of its own.</em>',
})}
    <div class="grid grid--3" data-reveal-group data-stagger="normal">
      <article class="card hover-lift">
        <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-users"/></svg></span>
        <h3 class="h-card card__title">Similar candidates</h3>
        <p class="body-copy card__body">Point at a profile you already like and get the people the taxonomy considers adjacent to it.</p>
        <p class="card__benefit">A shortlist that grows from a decision you already made.</p>
      </article>
      <article class="card hover-lift">
        <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-network"/></svg></span>
        <h3 class="h-card card__title">Hidden talent</h3>
        <p class="body-copy card__body">Adjacent experience the taxonomy can name surfaces people an exact-term filter discards.</p>
        <p class="card__benefit">Hidden talent is not a lowered bar. It&rsquo;s a larger pool.</p>
      </article>
      <article class="card hover-lift">
        <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-gauge"/></svg></span>
        <h3 class="h-card card__title">Availability signals</h3>
        <p class="body-copy card__body">Notice period, open-to-work status and responsiveness narrow a list to people who might actually reply.</p>
        <p class="card__benefit">Reachable is a requirement, not a nice-to-have.</p>
      </article>
      <article class="card hover-lift">
        <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-search"/></svg></span>
        <h3 class="h-card card__title">Saved searches</h3>
        <p class="body-copy card__body">A search worth running twice is worth keeping. Saved, named, re-runnable, and logged — with an alert when something new matches it.</p>
        <p class="card__benefit">The second time you look for this, you don&rsquo;t rebuild it.</p>
      </article>
      <article class="card hover-lift">
        <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-clipboard"/></svg></span>
        <h3 class="h-card card__title">Talent pools</h3>
        <p class="body-copy card__body">Group people you want to come back to, import a list you already have, and keep the import history so you know where a pool came from.</p>
        <p class="card__benefit">A pipeline for the role after this one.</p>
      </article>
      <article class="card hover-lift">
        <span class="card__icon"><svg width="18" height="18" aria-hidden="true" focusable="false"><use href="#i-mail"/></svg></span>
        <h3 class="h-card card__title">Outreach, tracked</h3>
        <p class="body-copy card__body">Who you contacted, and what came back: interested, not interested, or no answer before it expired. The thread itself is not here yet.</p>
        <p class="card__benefit">“Did we ever reach out to her?” has an answer.</p>
      </article>
    </div>
  </div>
</section>

<!-- ── Two consent bases ────────────────────────────────────────────────── -->
<section class="section section--sunken" id="consent">
  <div class="container">
${head({
  eyebrow: 'The other side of a searchable pool',
  title: 'Two consent bases, <em>both stated.</em>',
  lede: 'There are two kinds of profile in the database and we will not blur them. A shared candidate database is only comfortable to read about if you know which kind you are looking at — and the product tells you, on the card.',
})}
    <div class="pair">
      <div data-reveal="left">
        <div class="prose">
          <h3>A candidate who signed up owns their profile</h3>
          <p>
            They set their own visibility — ${CONSENT.privacyModes.join(', ')} — nothing pulled
            out of their résumé is stored until they have reviewed it item by item, and they can
            export or delete everything the platform holds about them.
          </p>
          <h3>A profile a recruiter brings in is a different thing</h3>
          <p>
            And the product says so on the card. Every imported candidate carries an account
            status, so a recruiter always knows whether they are looking at a person who chose
            to be there. Until that person activates the profile, it is visible only to
            ${CONSENT.importedVisibility} — not to the marketplace, and not to another
            employer.
          </p>
          <p><strong>Nothing here is scraped.</strong></p>
        </div>
      </div>
      <div data-reveal="right">
        <ul class="statuses">
${ACCOUNT_STATUS.map((a) => `          <li class="status">
            <span class="status__dot" aria-hidden="true"></span>
            <span class="status__label">${a.label}</span>
            <span class="status__note">${a.note}</span>
          </li>`).join('\n')}
        </ul>
        <p class="body-copy measure mt-8">
          A recruiter reads this as data quality. A candidate reads it as consent. Both are
          true, and it costs one clause to say so.
        </p>
        <p class="mt-6">${arrowLink('What candidates see', '/for-candidates/')}</p>
        <p class="mt-3">${arrowLink('What a candidate can ask for', '/trust/#data-rights')}</p>
      </div>
    </div>
  </div>
</section>

<!-- ── The browser extension ────────────────────────────────────────────── -->
<section class="section">
  <div class="container pair">
    <div data-reveal="left">
      <p class="eyebrow">Elsewhere on the internet</p>
      <h2 class="h-section mt-6">A profile you found <em>somewhere else.</em></h2>
      <p class="body-copy body-copy--lg measure mt-8">
        A browser extension brings profiles you find elsewhere into Transpahire, where they get
        scored like everything else — and land as an imported profile, with the account status
        that implies.
      </p>
      <p class="body-copy measure mt-6">
        Open it on a page with a person on it and it says what kind of page it is — a LinkedIn,
        GitHub or Naukri profile, a personal site — shows you what it read, and puts one button
        under it. Nothing is added until you press it.
      </p>
      <p class="body-copy measure mt-6">
        If the person is already in your pool, it says so before you press anything. If they
        might be someone the platform already holds, it shows you who, with how confident it is
        of the match, and you decide whether that is them.
      </p>
    </div>
    <div data-reveal="right">
${screenshotSlot({
  meta: 'chrome extension',
  image: {
    src: '/assets/images/browser-extension.png',
    width: 1039,
    height: 664,
    alt: 'The Transpahire browser extension open over a résumé in a Google Doc. The popup labels the page a personal site, shows the text it read under “Candidate detected”, and offers one button: Add to Transpahire. The email address is blurred.',
  },
})}
      <p class="composition-note">Screenshot · the running extension</p>
    </div>
  </div>
</section>

${pageCta({
  title: 'Search your own pool <em>on a real requisition.</em>',
  lede: 'Bring a role. We will run both search modes against it, start a mission on it, and you can see what each one finds.',
  secondary: 'How matching works',
  secondaryHref: '/product/matching/',
})}`;
}
