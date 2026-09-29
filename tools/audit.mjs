/**
 * audit.mjs — drives headless Chrome over the built site and checks the things
 * a static reader of the HTML cannot see.
 *
 * Node standard library only: Node's global WebSocket speaks the Chrome DevTools
 * Protocol directly, so this needs no browser-automation dependency. Chrome
 * itself is a development tool on the machine, not a project dependency.
 *
 * What it checks, and why each one is here rather than in tools/check.mjs:
 *
 *   · CONSOLE ERRORS — the audit's validation table requires zero, and a broken
 *     module import is silent in the HTML.
 *   · `will-change` AFTER SETTLE — must be 0. A permanent will-change on thirty
 *     elements is a memory cost with no benefit once the animation has run, and
 *     the only way to know it was released is to look after it settles.
 *   · REVEALS — every [data-reveal] must end up revealed. A reveal that never
 *     fires is content the visitor never sees.
 *   · THE SEQUENCE — section 06's beats must all land, and the panel must end
 *     complete. A sequence stuck halfway is worse than no sequence.
 *   · METERS AT WIDTH — a meter left at scaleX(0) is a number rendered as
 *     nothing.
 *   · THE TWO INTERACTIONS — the switcher must change the panel, and a weight
 *     change must reorder the list. These are the page's whole argument.
 *   · HORIZONTAL OVERFLOW at 390 / 768 / 1440. Nothing scrolls sideways except
 *     the two named containers.
 *   · REDUCED MOTION — every composition renders complete and static, and both
 *     interactions still work.
 *   · JS DISABLED — every composition renders complete and readable.
 *   · P6, THE SIGNATURE (Phase 6) — the stage pins; no two layers are ever
 *     visible at once; the native scroll timeline and the listener agree; the
 *     rail tracks the state; reduced motion and 390px get the complete stack.
 *   · THE CRITICAL GATE — Kubernetes → critical promotes Rahul Verma (90) over
 *     Sneha Iyer (87); Kafka → critical gates five rows and says so — and a
 *     sub-page's tuner, reading the same RANKINGS, gates its four.
 *   · PAGE HEIGHTS at the five approved widths, reported as notes so the
 *     phone's 14,000px question (STAGE-3.md § 9) stays measured, not remembered.
 *
 * Run:  node tools/serve.mjs &   then   node tools/audit.mjs
 *       FAST=1 node tools/audit.mjs   skips the 24-page sweep; runs the rest.
 */

import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ORIGIN = process.env.ORIGIN || 'http://localhost:4321';
const CHROME = process.env.CHROME || 'google-chrome';

const PAGES = (process.env.FAST ? [] : [
  '/', '/product/', '/product/matching/', '/product/sourcing/',
  '/product/candidate-intelligence/', '/product/hiring-operations/',
  '/product/analytics/', '/for-teams/', '/for-hiring-managers/',
  '/for-candidates/', '/trust/', '/pricing/', '/changelog/',
  '/check/job-description/', '/check/resume/',
  '/demo/', '/about/', '/legal/', '/legal/privacy/', '/legal/terms/',
  '/legal/terms/organisations/', '/legal/terms/candidates/',
  '/legal/cookies/', '/motion-lab.html',
]);

const WIDTHS = [390, 768, 1440];

const failures = [];
const notes = [];
const fail = (m) => failures.push(m);

/* -------------------------------------------------------------------------- */

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'tp-chrome-'));
  const child = spawn(CHROME, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  return child;
}

async function endpoint() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch('http://localhost:9222/json/version');
      const json = await res.json();
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Chrome did not expose a debugging endpoint');
}

/** A minimal CDP client: send a method, await its reply, subscribe to events. */
function connect(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  const listeners = new Map();
  let nextId = 1;

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    (listeners.get(message.method) || []).forEach((fn) => fn(message.params));
  });

  return {
    ready,
    send(method, params = {}, sessionId) {
      const id = nextId += 1;
      const payload = { id, method, params };
      if (sessionId) payload.sessionId = sessionId;
      socket.send(JSON.stringify(payload));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    on(method, fn) {
      if (!listeners.has(method)) listeners.set(method, []);
      listeners.get(method).push(fn);
    },
    close: () => socket.close(),
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* -------------------------------------------------------------------------- */

const chrome = launch();
let cdp;

try {
  cdp = connect(await endpoint());
  await cdp.ready;

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

  const call = (method, params = {}) => cdp.send(method, params, sessionId);

  let consoleErrors = [];
  cdp.on('Runtime.exceptionThrown', (p) => {
    consoleErrors.push(p.exceptionDetails?.exception?.description || p.exceptionDetails?.text);
  });
  cdp.on('Log.entryAdded', (p) => {
    if (p.entry.level === 'error') consoleErrors.push(`${p.entry.source}: ${p.entry.text}`);
  });

  await call('Runtime.enable');
  await call('Log.enable');
  await call('Page.enable');

  async function goto(path, { width = 1440, height = 900, reduced = false, javascript = true } = {}) {
    consoleErrors = [];
    await call('Emulation.setScriptExecutionDisabled', { value: !javascript });
    await call('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: width < 700,
    });
    await call('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }],
    });
    await call('Page.navigate', { url: `${ORIGIN}${path}` });
    await sleep(javascript ? 900 : 400);
  }

  async function evaluate(expression) {
    const { result, exceptionDetails } = await call('Runtime.evaluate', {
      // async, because most of these checks have to wait for a beat to land.
      expression: `(async () => { ${expression} })()`,
      returnByValue: true,
      awaitPromise: true,
    });
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || 'eval failed');
    return result.value;
  }

  /* ---- 1 · every page: console, reveals, overflow, will-change ---------- */

  console.log('— pages —');
  for (const path of PAGES) {
    for (const width of WIDTHS) {
      await goto(path, { width, height: width < 700 ? 780 : 900 });

      /* Scroll the whole page so every observer fires, then wait for the
         longest settle (2s reveal tail, 2.4s sequence, 1.2s sequence tail). */
      await evaluate(`
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) window.scrollTo(0, y);
        window.scrollTo(0, document.body.scrollHeight);
      `);
      await sleep(1200);
      await evaluate('window.scrollTo(0, 0);');
      await sleep(3200);

      const report = await evaluate(`
        const unrevealed = [...document.querySelectorAll('[data-reveal]')]
          .filter((el) => !el.classList.contains('is-revealed')).length;
        const unrevealedGroups = [...document.querySelectorAll('[data-reveal-group], [data-layers]')]
          .filter((el) => !el.classList.contains('is-revealed')).length;
        const unsequenced = [...document.querySelectorAll('[data-sequence]')]
          .filter((el) => !el.classList.contains('is-sequenced')).length;
        const willChange = [...document.querySelectorAll('*')]
          .filter((el) => {
            const v = getComputedStyle(el).willChange;
            if (!v || v === 'auto') return false;
            // Allowed: an on-screen element parallax.js is actively driving. It
            // releases the hint the moment the element leaves the viewport.
            if (el.hasAttribute('data-parallax')) {
              const r = el.getBoundingClientRect();
              if (r.bottom > 0 && r.top < window.innerHeight) return false;
            }
            return true;
          })
          .map((el) => (el.className ? String(el.className).slice(0, 40) : el.tagName))
          .filter(Boolean);
        const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        // Ignore anything clipped by an ancestor scroll container: the
        // comparison table and the tab list are deliberately wider than the
        // viewport inside their own overflow-x containers.
        const clipped = (el) => {
          for (let p = el.parentElement; p; p = p.parentElement) {
            if (/auto|scroll|hidden/.test(getComputedStyle(p).overflowX)) return true;
          }
          return false;
        };
        const wideKids = [...document.querySelectorAll('body *')]
          .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 2 && !clipped(el))
          .slice(0, 4)
          .map((el) => el.tagName + '.' + String(el.className).split(' ')[0]);
        const scaleXOf = (el) => {
          const t = getComputedStyle(el).transform;
          if (t === 'none') return 1;
          const first = parseFloat(t.slice(t.indexOf('(') + 1));
          return Number.isFinite(first) ? first : 1;
        };
        /* A meter at zero width is a defect only if the value it is showing is
           NOT zero. /product/analytics' funnel has a stage with nobody in it,
           and a zero-count stage genuinely has a zero-width bar — flagging that
           would be the audit asking the page to lie about a count. */
        const empty = [...document.querySelectorAll('.meter__fill')]
          .filter((el) => scaleXOf(el) < 0.02)
          .filter((el) => parseFloat(getComputedStyle(el).getPropertyValue('--meter-v')) > 0);
        const emptyMeters = empty.length;
        /* Name them. A count tells you there is a defect; the ancestor chain
           tells you which composition forgot to release its meters. */
        const emptyWhere = empty.slice(0, 3).map((el) => {
          const owner = el.closest('[data-field], .funnel__row, .unlock__row, .scarcity__cov, .concept, .tile, .breakdown__row, .quality') || el.parentElement;
          return (owner.dataset && owner.dataset.field) || owner.className || 'unknown';
        });
        return { unrevealed, unrevealedGroups, unsequenced, willChange, overflow, wideKids, emptyMeters, emptyWhere };
      `);

      const label = `${path} @${width}`;
      if (consoleErrors.length) fail(`${label}: console errors → ${consoleErrors.slice(0, 3).join(' | ')}`);
      if (report.unrevealed) fail(`${label}: ${report.unrevealed} [data-reveal] never revealed`);
      if (report.unrevealedGroups) fail(`${label}: ${report.unrevealedGroups} groups never revealed`);
      if (report.unsequenced) fail(`${label}: ${report.unsequenced} sequences never played`);
      if (report.willChange.length) fail(`${label}: will-change still set on ${report.willChange.length} elements → ${report.willChange.slice(0, 3).join(', ')}`);
      if (report.overflow > 1) fail(`${label}: horizontal overflow ${report.overflow}px → ${report.wideKids.join(', ')}`);
      if (report.emptyMeters) fail(`${label}: ${report.emptyMeters} meters left at zero width → ${report.emptyWhere.join(', ')}`);

      if (width === 1440) console.log(`  ok  ${path}`);
    }
  }

  /* ---- 1b · THE ONE-SCREEN HERO ----------------------------------------

     `docs/phase-5.md` § 3.6 makes this an acceptance test rather than a
     preference, and it is the one check in this file that is about how the site
     LOOKS rather than how it behaves — which is exactly why it has to be
     automated: it is a measurement, and a measurement by eye at two viewport
     sizes is a measurement nobody repeats.

     A visitor decides whether this is a serious product in about four seconds
     and they decide it from the picture. If the picture is below the fold there
     is no picture.
     ---------------------------------------------------------------------- */

  console.log('— hero, one screen —');
  /* D15. The hero is a screenshot of the candidate's dashboard in a frame.
     The first screen must hold the headline, the CTA, the frame's route line
     and the capture's FIRST ROW — the profile ring and the career insights,
     which end 460px down the 1844×931 capture — and the image must have
     loaded, because a broken image in the hero is the whole picture. */
  const SHOT_FIRST_ROW = 460 / 931;
  for (const [w, h] of [[1440, 900], [1280, 800]]) {
    await goto('/', { width: w, height: h });
    const fold = await evaluate(`
      const box = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width) };
      };
      const img = document.querySelector('.claim__shot img');
      return {
        title: box('.claim__title'), ctas: box('.claim__ctas'),
        route: box('.claim__shot .frame__chrome'), shot: box('.claim__shot img'),
        loaded: !!img && img.complete && img.naturalWidth > 0,
      };
    `);
    const label = `/ @${w}×${h}`;
    for (const layer of ['title', 'ctas', 'route']) {
      if (!fold[layer]) fail(`${label}: hero is missing its ${layer}`);
      else if (fold[layer].top < 0 || fold[layer].bottom > h) {
        fail(`${label}: the hero's ${layer} is not on the first screen (${fold[layer].top}–${fold[layer].bottom}px of ${h}px)`);
      }
    }
    if (!fold.shot) fail(`${label}: hero has no screenshot`);
    else {
      if (!fold.loaded) fail(`${label}: the hero screenshot did not load`);
      const firstRow = fold.shot.top + Math.round((fold.shot.bottom - fold.shot.top) * SHOT_FIRST_ROW);
      if (firstRow > h) fail(`${label}: the screenshot's first row ends below the fold (${firstRow}px of ${h}px)`);
      if (!failures.some((m) => m.startsWith(label))) {
        console.log(`  ok  ${label} — head, CTA, route; screenshot ${fold.shot.width}px wide from ${fold.shot.top}px, first row ends at ${firstRow}px`);
        notes.push(`hero ${label}: screenshot ${fold.shot.width}px wide, top ${fold.shot.top}px, first row ends ${firstRow}px`);
      }
    }
  }

  /* The hero must contain no operable control. `CLAUDE.md` § 5: the hero may
     be dense; it may not be interactive. It is an image and a caption now, so
     this guards the next change to it, and catches a focus stop arriving from
     a shared component. */
  {
    await goto('/', { width: 1440, height: 900 });
    const operable = await evaluate(`
      const ws = document.querySelector('.claim__shot');
      if (!ws) return ['no .claim__shot in the hero'];
      return [...ws.querySelectorAll('button, select, textarea, input, a[href], [tabindex]:not([tabindex="-1"])')]
        .map((el) => el.tagName + '.' + String(el.className).split(' ')[0]);
    `);
    if (operable.length) fail(`/: ${operable.length} operable control(s) inside the hero composition → ${operable.slice(0, 4).join(', ')}`);
    else console.log('  ok  / — no operable control inside the hero composition');
  }

  /* ---- 1c · P6, THE SCORE TAKEN APART ------------------------------------
     Three things only a browser can see: that the stage pins and releases at
     the right places; that NO TWO LAYERS ARE EVER VISIBLE AT ONCE (the
     non-overlapping windows are the whole point of the final mapping); and
     that the native scroll timeline and the listener's formula agree, so a
     Chromium visitor and a Firefox visitor see the same state at the same
     scroll position. Then the two fallbacks: reduced motion and the phone
     both get the complete stack. */
  console.log('— P6 · the score, taken apart —');
  await goto('/', { width: 1440, height: 900 });
  const p6 = await evaluate(`
    const sig = document.querySelector('[data-signature]');
    if (!sig) return { missing: true };
    const stage = sig.querySelector('.sig__stage');
    const layers = [...sig.querySelectorAll('.layer')];
    const persist = sig.querySelector('.sig__persist');
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
    const top = sig.getBoundingClientRect().top + window.scrollY - header;
    const track = sig.offsetHeight - window.innerHeight + header;
    const native = CSS.supports('animation-timeline: view()');
    const thresholds = sig.dataset.thresholds.split(',').map(Number);
    const points = [...Array.from({ length: 13 }, (_, i) => i / 12), ...thresholds].sort((a, b) => a - b);
    const samples = [];
    /* The site scrolls smoothly; an animated scrollTo would sample the stage
       mid-flight. Jump. */
    for (const p of points) {
      window.scrollTo({ top: Math.round(top + p * track), behavior: 'instant' });
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 80));
      const cssP = parseFloat(getComputedStyle(sig).getPropertyValue('--p'));
      const visible = layers.filter((l) => parseFloat(getComputedStyle(l).opacity) > 0.02).map((l) => l.dataset.layer);
      samples.push({
        p: +p.toFixed(4), cssP: +cssP.toFixed(4), state: Number(sig.dataset.state), visible,
        stageTop: Math.round(stage.getBoundingClientRect().top),
        current: sig.querySelectorAll('.srail__item.is-current').length,
        passed: sig.querySelectorAll('.srail__item.is-passed').length,
        persist: parseFloat(getComputedStyle(persist).opacity),
        boundary: thresholds.includes(p),
      });
    }
    const promoted = layers.filter((l) => getComputedStyle(l).willChange !== 'auto').length;
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 200));
    const promotedAway = layers.filter((l) => getComputedStyle(l).willChange !== 'auto').length;
    return { native, pinned: !sig.classList.contains('sig--static'), count: layers.length, header, track: Math.round(track), samples, promoted, promotedAway };
  `);
  if (p6.missing) fail('P6: no [data-signature] stage on /');
  else {
    console.log(`  ${p6.count} layers · pinned ${p6.pinned} · native timeline ${p6.native} · header ${p6.header}px · track ${p6.track}px`);
    console.log('  ' + p6.samples.map((x) => `${x.p}→${x.state}[${x.visible.join('+') || '·'}]`).join(' '));
    if (p6.count !== 6) fail(`P6: ${p6.count} layers, expected six`);
    if (!p6.pinned) fail('P6: the stage did not pin at 1440×900');
    p6.samples.forEach((x) => {
      if (x.visible.length > 1) fail(`P6: at p=${x.p} layers ${x.visible.join(' and ')} are visible together — the windows overlap`);
      if (x.boundary && x.visible.length !== 0) fail(`P6: at boundary p=${x.p} layer ${x.visible.join('+')} is still visible; a boundary holds only the caption`);
      if (Math.abs(x.cssP - x.p) > 0.012) fail(`P6: at scroll p=${x.p} the stage's --p reads ${x.cssP} — the ${p6.native ? 'native timeline' : 'listener'} and the pin range disagree`);
      if (x.p > 0.02 && x.p < 0.98 && Math.abs(x.stageTop - p6.header) > 1) fail(`P6: at p=${x.p} the stage sits at ${x.stageTop}px, not at the header line (${p6.header}px) — the pin and the clock disagree`);
      if (x.current !== 1) fail(`P6: at p=${x.p} the rail marks ${x.current} current steps`);
      if (x.passed !== x.state - 1) fail(`P6: at p=${x.p} the rail shows ${x.passed} passed steps in state ${x.state}`);
      const wantPersist = x.state === 4 || x.state === 5;
      if (!x.boundary && Math.abs(x.p - 0.48) > 0.06 && Math.abs(x.p - 0.82) > 0.06 && (x.persist > 0.5) !== wantPersist) fail(`P6: at p=${x.p} (state ${x.state}) the persistent 87 is ${x.persist > 0.5 ? 'shown' : 'hidden'}`);
    });
    const states = p6.samples.map((x) => x.state);
    if (states[0] !== 1 || states[states.length - 1] !== 6) fail(`P6: states run ${states[0]} → ${states[states.length - 1]}, expected 1 → 6`);
    if (states.some((st, i) => i && st < states[i - 1])) fail('P6: the state went backwards while scrolling forwards');
    if (p6.promoted !== 6) fail(`P6: ${p6.promoted} layers promoted while pinned, expected six`);
    if (p6.promotedAway !== 0) fail(`P6: ${p6.promotedAway} layers still promoted with the stage off screen`);
  }

  /* The fallbacks: reduced motion, and the phone. Six complete layers, static. */
  for (const [label, opts] of [['reduced motion', { width: 1440, height: 900, reduced: true }], ['390px', { width: 390, height: 844 }]]) {
    await goto('/', opts);
    const stack = await evaluate(`
      const sig = document.querySelector('[data-signature]');
      sig.scrollIntoView();
      await new Promise((r) => setTimeout(r, 300));
      const layers = [...sig.querySelectorAll('.layer')];
      return {
        isStatic: sig.classList.contains('sig--static'),
        stagePos: getComputedStyle(sig.querySelector('.sig__stage')).position,
        dim: layers.filter((l) => parseFloat(getComputedStyle(l).opacity) < 1).length,
        moved: layers.filter((l) => getComputedStyle(l).transform !== 'none').length,
        abs: layers.filter((l) => getComputedStyle(l).position === 'absolute').length,
        height: Math.round(sig.getBoundingClientRect().height),
        bars: [...sig.querySelectorAll('.wrow__fill')].filter((b) => getComputedStyle(b).transform !== 'none').length,
      };
    `);
    console.log(`  ${label}: static ${stack.isStatic} · stage ${stack.stagePos} · ${stack.height}px tall · dim ${stack.dim} · transformed ${stack.moved}`);
    if (!stack.isStatic) fail(`P6 ${label}: the stage still thinks it pins`);
    if (stack.stagePos !== 'static') fail(`P6 ${label}: the stage is ${stack.stagePos}, not static`);
    if (stack.dim) fail(`P6 ${label}: ${stack.dim} layers are not at full opacity`);
    if (stack.moved || stack.abs) fail(`P6 ${label}: layers still transformed (${stack.moved}) or absolute (${stack.abs})`);
    if (stack.bars) fail(`P6 ${label}: ${stack.bars} weight bars are still scaled`);
  }

  /* ---- 1d · page heights at the five approved widths --------------------
     Reported, not asserted: the phone target of 14,000px is NOT met by design
     (STAGE-3.md § 9), and the number has to stay visible until the product
     owner decides whether scene 07 loses the dashboard on phones. */
  console.log('— page heights —');
  for (const [w, h] of [[1920, 1080], [1440, 900], [1280, 800], [768, 1024], [390, 844]]) {
    await goto('/', { width: w, height: h });
    const height = await evaluate(`
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
      await new Promise((r) => setTimeout(r, 400));
      return document.documentElement.scrollHeight;
    `);
    console.log(`  ${w}×${h}: ${height}px`);
    notes.push(`/ height at ${w}×${h}: ${height}px`);
  }

  /* ---- 2 · the section 06 sequence, beat by beat ------------------------

     Rebuilt in Phase 4 for `explainPanel()`. The three things worth asserting
     changed with the panel: the FIRST CONCEPT CARD has to arrive (it is the
     partial, alone, at 1400ms, and it is the hinge of the whole site), every
     card has to CITE A SECTION of the profile, and the score has to still be 87.
     ---------------------------------------------------------------------- */

  console.log('— section 06 sequence —');
  await goto('/');
  const seq = await evaluate(`
    const panel = document.getElementById('argument-panel');
    panel.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 100));
    const beats = [...panel.querySelectorAll('[data-beat]')];
    const before = beats.filter((b) => getComputedStyle(b).opacity === '1').length;
    /* 5200ms, not 4200. The Phase 4 panel's last beat is at 2760ms and
       sequence.js releases the compositor hints 1200ms after it — and
       scrollIntoView is a SMOOTH scroll on this site, so the sequence does not
       start at t=0. Phase 3's last beat was 2420 and 4200ms was comfortable;
       the same wait against the longer sequence read as "never settled", which
       was the audit being too impatient rather than the page being broken.
       (No backticks in this comment: it lives inside a template literal.) */
    await new Promise((r) => setTimeout(r, 5200));
    const after = beats.filter((b) => getComputedStyle(b).opacity === '1').length;
    const partial = panel.querySelector('[data-field="concepts-partial"] .concept');
    const sections = [...panel.querySelectorAll('.concept__section')].map((s) => s.textContent.trim());
    const quotes = panel.querySelectorAll('.concept__quote').length;
    const ring = panel.querySelector('[data-row-ring]');
    return {
      total: beats.length,
      before,
      after,
      sequenced: panel.classList.contains('is-sequenced'),
      settled: panel.classList.contains('is-settled'),
      lastBeat: Number(panel.dataset.sequenceLast || 0),
      partialVisible: partial ? getComputedStyle(partial).opacity === '1' : false,
      partialText: partial ? partial.textContent.replace(/\\s+/g, ' ').trim() : null,
      sections,
      quotes,
      cards: panel.querySelectorAll('.concept').length,
      missing: panel.querySelectorAll('.missing-row').length,
      rels: panel.querySelectorAll('.relchip').length,
      band: ring ? ring.className : null,
      confidence: panel.querySelector('[data-field="confidence"]').textContent.trim(),
      /* counter.js keeps the true value in an sr-only sibling, so textContent
         reads "8787" — slice it, or the log looks like a defect. */
      score: panel.querySelector('[data-field="score"]').textContent.trim().slice(0, 2),
    };
  `);
  console.log(`  ${seq.total} beats · last at ${seq.lastBeat}ms · ${seq.before} lit before · ${seq.after} after · score ${seq.score}`);
  console.log(`  ${seq.cards} concept cards · ${seq.quotes} quoted · ${seq.rels} relationship chips · ${seq.missing} missing · ${seq.confidence}`);
  console.log(`  evidence sections cited: ${seq.sections.join(', ')}`);
  if (seq.after !== seq.total) fail(`section 06: only ${seq.after}/${seq.total} beats landed`);
  if (!seq.settled) fail('section 06: sequence never settled (will-change not released)');
  if (!seq.partialVisible) fail('section 06: the partial card did not arrive');
  if (!/transferable/.test(seq.partialText || '')) fail(`section 06: the partial card does not name its relationship → "${seq.partialText}"`);
  if (!/Kubernetes/.test(seq.partialText || '')) fail('section 06: the partial card is not the Kubernetes one');
  if (seq.quotes !== seq.cards) fail(`section 06: ${seq.cards} cards but ${seq.quotes} quotes — every card must cite its evidence`);
  if (seq.sections.length !== seq.cards) fail(`section 06: ${seq.cards} cards but ${seq.sections.length} named profile sections`);
  if (!seq.rels) fail('section 06: no relationship chips rendered');
  if (!/ring--strong/.test(seq.band || '')) fail(`section 06: ring band reads "${seq.band}", expected strong`);
  if (!/High/i.test(seq.confidence)) fail(`section 06: confidence reads "${seq.confidence}", expected high`);
  if (!seq.score.startsWith('87')) fail(`section 06: score reads "${seq.score}", expected 87`);

  /* ---- 3 · the candidate switcher --------------------------------------- */

  console.log('— candidate switcher —');
  const swap = await evaluate(`
    const panel = document.getElementById('argument-panel');
    const buttons = [...document.querySelectorAll('[data-candidate]')];
    const read = () => ({
      name: panel.querySelector('[data-field="name"]').textContent.trim(),
      score: panel.querySelector('[data-field="score"]').textContent.trim().slice(0, 2),
      partials: panel.querySelectorAll('[data-field="concepts-partial"] .concept').length,
      band: panel.querySelector('[data-row-ring]').className,
      confidence: panel.querySelector('[data-field="confidence"]').textContent.trim(),
      quoted: panel.querySelectorAll('.concept__quote').length,
      pressed: buttons.filter((b) => b.getAttribute('aria-pressed') === 'true').length,
      announce: panel.querySelector('[data-field="announce"]').textContent.trim(),
    });
    const first = read();
    buttons[1].click();
    await new Promise((r) => setTimeout(r, 3600));
    const second = read();
    buttons[2].click();
    await new Promise((r) => setTimeout(r, 900));
    const third = read();
    return { first, second, third, count: buttons.length };
  `);
  console.log(`  ${swap.first.name} ${swap.first.score}/${swap.first.partials}p ${swap.first.confidence} → ${swap.second.name} ${swap.second.score}/${swap.second.partials}p ${swap.second.confidence} → ${swap.third.name} ${swap.third.score}/${swap.third.partials}p ${swap.third.confidence}`);
  if (swap.count !== 3) fail(`switcher has ${swap.count} buttons, expected 3`);
  if (swap.second.name === swap.first.name) fail('switcher: the panel did not change');
  if (swap.second.pressed !== 1) fail(`switcher: ${swap.second.pressed} buttons pressed at once`);
  if (swap.second.partials !== 2) fail(`switcher: Priya should show 2 partial cards, showed ${swap.second.partials}`);
  if (swap.second.quoted !== swap.second.partials + 2) fail(`switcher: Priya's cards do not all carry a quote (${swap.second.quoted} quotes)`);
  /* 61 is Good under BANDS (≥ 52) — the product's word since the classification
     was settled against the source (STAGE-4-IMPLEMENTATION.md § 12). */
  if (!/ring--good/.test(swap.third.band)) fail(`switcher: Vikram's ring reads "${swap.third.band}", expected good`);
  /* The three switcher candidates are chosen so the CONFIDENCE differs too —
     high, medium, low — because the panel telling you how sure it is, is half of
     what makes it readable as evidence rather than as a verdict. */
  if (!/Low/i.test(swap.third.confidence)) fail(`switcher: Vikram's confidence reads "${swap.third.confidence}", expected low`);
  if (!swap.second.announce.includes('Priya')) fail('switcher: the live region did not announce the switch');

  /* ---- 4 · the importance controls and the reorder ---------------------- */

  console.log('— importance controls —');
  const reorder = await evaluate(`
    const list = document.getElementById('control-list');
    list.scrollIntoView({ block: 'center' });
    const order = () => [...list.querySelectorAll('[data-row]')].map((r) => r.dataset.row);
    const scores = () => [...list.querySelectorAll('[data-row-score]')].map((s) => s.textContent.trim().slice(0, 2));
    const before = { order: order(), scores: scores() };
    const kafka = document.querySelector('[data-weight="kafka"]');
    kafka.value = '3';
    kafka.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1400));
    const after = { order: order(), scores: scores() };
    const readout = document.querySelector('[data-weight-readout="kafka"]').textContent.trim();
    const valuetext = kafka.getAttribute('aria-valuetext');
    const status = document.querySelector('[data-field="tuner-announce"]').textContent.trim();
    return { before, after, readout, valuetext, status };
  `);
  console.log(`  ${reorder.before.order.join(' ')} → ${reorder.after.order.join(' ')}`);
  console.log(`  readout "${reorder.readout}" · aria-valuetext "${reorder.valuetext}"`);
  if (reorder.before.order.join() === reorder.after.order.join()) fail('controls: the list did not reorder');
  if (reorder.readout !== 'critical') fail(`controls: tier readout reads "${reorder.readout}"`);
  if (!/Kafka: critical/.test(reorder.valuetext)) fail(`controls: aria-valuetext reads "${reorder.valuetext}"`);
  if (/\d/.test(reorder.valuetext)) fail('controls: aria-valuetext exposes a number, it must carry the tier word');
  if (!reorder.status) fail('controls: no status announcement after a change');

  /* PHASE 6. The gate, and the advertised move. Kafka → critical must gate
     five rows and say so; then Kubernetes → critical must put Rahul Verma
     (90) above Sneha Iyer (87) — the one reorder the whole section promises.
     Both come from RANKINGS, whose gate is the product's (tools/rankings.mjs). */
  const gate = await evaluate(`
    const list = document.getElementById('control-list');
    const gated = list.querySelectorAll('.is-gated').length;
    const gateText = list.querySelector('.is-gated [data-gate]')?.textContent.replace(/\\s+/g, ' ').trim() || '';
    const count = list.closest('.rank').querySelector('[data-gatecount]').textContent.trim();
    const status = document.querySelector('[data-field="tuner-announce"]').textContent.trim();
    const kafka = document.querySelector('[data-weight="kafka"]');
    kafka.value = '1';
    kafka.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1400));
    const restored = list.querySelectorAll('.is-gated').length;
    const k8s = document.querySelector('[data-weight="kubernetes"]');
    k8s.value = '3';
    k8s.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1400));
    const rows = [...list.querySelectorAll('[data-row]')].map((r) => r.dataset.row + ':' + r.querySelector('[data-row-score]').textContent.trim().slice(0, 2));
    const moved = list.querySelectorAll('[data-moved="up"], [data-moved="down"]').length;
    k8s.value = '2';
    k8s.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1400));
    return { gated, gateText, count, status, restored, rows, moved };
  `);
  console.log(`  kafka→critical: ${gate.gated} gated · "${gate.count}" · row reads "${gate.gateText}"`);
  console.log(`  kubernetes→critical: ${gate.rows.join(' ')}`);
  if (gate.gated !== 5) fail(`gate: Kafka → critical gated ${gate.gated} rows, expected five`);
  if (!/5 not scored/.test(gate.count)) fail(`gate: the list head reads "${gate.count}"`);
  if (!/Not scored/.test(gate.gateText) || !/Kafka/.test(gate.gateText)) fail(`gate: the gated row reads "${gate.gateText}"`);
  if (!/5 candidates are not scored/.test(gate.status)) fail(`gate: the announcement reads "${gate.status}"`);
  if (gate.restored !== 0) fail(`gate: ${gate.restored} rows still gated after Kafka went back to preferred`);
  if (gate.rows[0] !== 'c2:90' || gate.rows[1] !== 'c1:87') fail(`gate: Kubernetes → critical gave ${gate.rows.slice(0, 2).join(', ')}, expected c2:90 then c1:87`);
  if (!gate.moved) fail('gate: no row carries a ▲ / ▼ after the reorder');

  /* ---- 5 · the what-if simulation --------------------------------------- */

  console.log('— what-if —');
  const whatif = await evaluate(`
    const toggle = document.querySelector('[data-whatif]');
    const figure = document.querySelector('[data-whatif-figure]');
    const before = figure.textContent.trim().slice(0, 3);
    toggle.click();
    await new Promise((r) => setTimeout(r, 900));
    const after = figure.textContent.trim().slice(0, 3);
    const delta = document.querySelector('[data-whatif-delta]');
    return {
      before,
      after,
      deltaShown: !delta.hidden,
      labelled: !!document.querySelector('.whatif .example-tag'),
      status: document.querySelector('[data-field="whatif-announce"]').textContent.trim(),
      changed: document.querySelectorAll('#control-list .is-missing.is-changed').length,
    };
  `);
  if (whatif.changed !== 5) fail(`what-if: ${whatif.changed} result cells changed, expected five (everyone missing Kafka)`);
  console.log(`  pool ${whatif.before} → ${whatif.after} · delta shown ${whatif.deltaShown} · labelled ${whatif.labelled}`);
  if (whatif.before !== '248' || whatif.after !== '417') fail(`what-if: ${whatif.before} → ${whatif.after}, expected 248 → 417`);
  if (!whatif.deltaShown) fail('what-if: the delta stayed hidden');
  if (!whatif.labelled) fail('what-if: the figures are not labelled as an example');
  if (!whatif.status) fail('what-if: no status announcement');

  /* ---- 6 · the pool filter --------------------------------------------- */

  console.log('— pool filter —');
  const filter = await evaluate(`
    const list = document.getElementById('pool-list');
    list.scrollIntoView({ block: 'center' });
    const visible = () => [...list.querySelectorAll('[data-row]')].filter((r) => !r.hidden).length;
    const before = visible();
    document.querySelector('.rank__filter[data-band="strong"]').click();
    await new Promise((r) => setTimeout(r, 200));
    const after = visible();
    return { before, after, status: list.closest('.rank').querySelector('[data-pool-count]').textContent.trim() };
  `);
  console.log(`  ${filter.before} rows → ${filter.after} strong · "${filter.status}"`);
  if (filter.after >= filter.before) fail('pool filter: filtering changed nothing');
  if (!filter.status) fail('pool filter: the status line was not updated');

  /* ---- 7 · keyboard: the nav disclosure menu ---------------------------- */

  console.log('— keyboard —');
  const keyboard = await evaluate(`
    const button = document.querySelector('.navmenu__button');
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const closedInert = panel.hasAttribute('inert');
    button.focus();
    button.click();
    await new Promise((r) => setTimeout(r, 60));
    const opened = button.getAttribute('aria-expanded');
    const openInert = panel.hasAttribute('inert');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await new Promise((r) => setTimeout(r, 60));
    return {
      closedInert,
      opened,
      openInert,
      afterEscape: button.getAttribute('aria-expanded'),
      focusReturned: document.activeElement === button,
      links: panel.querySelectorAll('.navmenu__link').length,
      role: panel.getAttribute('role'),
    };
  `);
  console.log(`  menu: inert when closed ${keyboard.closedInert} · opens ${keyboard.opened} · escape closes ${keyboard.afterEscape === 'false'} · focus returns ${keyboard.focusReturned}`);
  if (!keyboard.closedInert) fail('menu: panel is not inert when closed — its links sit in the tab order');
  if (keyboard.opened !== 'true') fail('menu: aria-expanded did not become true');
  if (keyboard.openInert) fail('menu: panel stayed inert while open — focus cannot enter it');
  if (keyboard.afterEscape !== 'false') fail('menu: Escape did not close it');
  if (!keyboard.focusReturned) fail('menu: focus was not returned to the button');

  /* ---- 7b · a sub-page's tuner gates too ------------------------------- */
  /* RANKINGS carries the product's gate, so /product/matching's older tuner
     must drop the four of its five rows missing Kafka, hide their scores, and
     say so — not leave a stale number on a candidate the gate removed. */

  console.log('— sub-page gate —');
  await goto('/product/matching/');
  const subGate = await evaluate(`
    const list = document.getElementById('control-list');
    list.scrollIntoView({ block: 'center' });
    const kafka = document.querySelector('[data-weight="kafka"]');
    kafka.value = '3';
    kafka.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1400));
    const gatedRows = [...list.querySelectorAll('.is-gated')];
    return {
      gated: gatedRows.length,
      scoresShown: gatedRows.filter((r) => r.querySelector('.rank__score').getBoundingClientRect().height > 0).length,
      lineShown: gatedRows.filter((r) => !r.querySelector('[data-gate]').hidden).length,
      count: list.closest('.rank').querySelector('[data-gatecount]').textContent.trim(),
      first: list.querySelector('[data-row]').dataset.row,
    };
  `);
  console.log(`  kafka→critical: ${subGate.gated} gated · "${subGate.count}" · first ${subGate.first}`);
  if (subGate.gated !== 4) fail(`sub-page gate: Kafka → critical gated ${subGate.gated} rows, expected four`);
  if (subGate.scoresShown) fail(`sub-page gate: ${subGate.scoresShown} gated rows still show a score`);
  if (subGate.lineShown !== subGate.gated) fail('sub-page gate: a gated row does not say why');
  if (!/4 not scored/.test(subGate.count)) fail(`sub-page gate: the list head reads "${subGate.count}"`);
  if (subGate.first !== 'c4') fail(`sub-page gate: ${subGate.first} ranks first, expected c4, the one candidate with Kafka`);

  /* Real Tab presses, because :focus-visible deliberately does not match a
     programmatic .focus(). This walks the first 40 tab stops on the homepage and
     asks each focused element whether it is showing a ring. */
  await goto('/');
  const ringless = [];
  const visited = [];
  for (let i = 0; i < 40; i += 1) {
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    const stop = await evaluate(`
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
      return {
        tag: el.tagName,
        cls: String(el.className || '').split(' ')[0],
        text: (el.textContent || '').trim().slice(0, 24),
        focusVisible: el.matches(':focus-visible'),
        ring,
      };
    `);
    if (!stop) continue;
    visited.push(`${stop.tag}.${stop.cls}`);
    if (!stop.ring) ringless.push(`${stop.tag}.${stop.cls} "${stop.text}"`);
  }
  console.log(`  tabbed ${visited.length} stops, ${ringless.length} without a visible ring`);
  if (ringless.length) fail(`focus ring missing on: ${ringless.slice(0, 6).join(', ')}`);

  /* ---- 8 · reduced motion ---------------------------------------------- */

  console.log('— reduced motion —');
  await goto('/', { reduced: true });
  const reducedReport = await evaluate(`
    document.getElementById('argument-panel').scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 600));
    const panel = document.getElementById('argument-panel');
    const beats = [...panel.querySelectorAll('[data-beat]')];
    const dark = beats.filter((b) => getComputedStyle(b).opacity !== '1').length;
    const moved = beats.filter((b) => getComputedStyle(b).transform !== 'none').length;
    const scaleXOf = (el) => {
      const t = getComputedStyle(el).transform;
      if (t === 'none') return 1;
      const first = parseFloat(t.slice(t.indexOf('(') + 1));
      return Number.isFinite(first) ? first : 1;
    };
    const meters = [...document.querySelectorAll('.meter__fill')]
      .filter((el) => scaleXOf(el) < 0.02).length;
    const edges = [...document.querySelectorAll('.edge__path')]
      .filter((el) => parseFloat(getComputedStyle(el).strokeDashoffset) > 0.5).length;
    const floats = [...document.querySelectorAll('.float')]
      .filter((el) => getComputedStyle(el).animationName !== 'none').length;

    // Both interactions must still work.
    document.querySelectorAll('[data-candidate]')[2].click();
    await new Promise((r) => setTimeout(r, 200));
    const switched = panel.querySelector('[data-field="name"]').textContent.trim();

    const list = document.getElementById('control-list');
    const before = [...list.querySelectorAll('[data-row]')].map((r) => r.dataset.row).join();
    const kafka = document.querySelector('[data-weight="kafka"]');
    kafka.value = '3';
    kafka.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 300));
    const after = [...list.querySelectorAll('[data-row]')].map((r) => r.dataset.row).join();

    return { dark, moved, meters, edges, floats, switched, reordered: before !== after };
  `);
  console.log(`  beats hidden ${reducedReport.dark} · transformed ${reducedReport.moved} · empty meters ${reducedReport.meters} · undrawn edges ${reducedReport.edges} · floats running ${reducedReport.floats}`);
  console.log(`  switch → ${reducedReport.switched} · reorder ${reducedReport.reordered}`);
  if (reducedReport.dark) fail(`reduced motion: ${reducedReport.dark} beats are still hidden`);
  if (reducedReport.moved) fail(`reduced motion: ${reducedReport.moved} beats are still transformed`);
  if (reducedReport.meters) fail(`reduced motion: ${reducedReport.meters} meters at zero width`);
  if (reducedReport.edges) fail(`reduced motion: ${reducedReport.edges} edges undrawn`);
  if (reducedReport.floats) fail(`reduced motion: ${reducedReport.floats} floats still animating`);
  if (reducedReport.switched !== 'Vikram Singh') fail(`reduced motion: switcher produced "${reducedReport.switched}"`);
  if (!reducedReport.reordered) fail('reduced motion: the list did not reorder');

  /* ---- 9 · JavaScript disabled ---------------------------------------- */

  console.log('— JavaScript disabled —');
  const NO_JS = [
    // Each needle is a value that only exists because a composition rendered.
    ['/', ['Sneha Iyer', 'Docker experience transfers', 'Strong Match', '248', 'Four weights, published.', 'Every match, cited.', 'The same number, on her screen.', 'Not scored', 'What we will not claim']],
    ['/product/matching/', ['Sneha Iyer', 'similar to', 'Salary alignment']],
    ['/for-candidates/', ['Senior Backend Engineer', 'Shortlisted', 'add measurable outcomes']],
    ['/for-teams/', ['Sneha Iyer', 'Shortlisted']],
  ];
  for (const [path, needles] of NO_JS) {
    await goto(path, { javascript: false });
    const snapshot = (await call('Page.captureSnapshot', { format: 'mhtml' }).catch(() => null))?.data || '';
    // MHTML is quoted-printable, so soft line breaks can split a needle. Undo
    // them before searching.
    const text = snapshot.replace(/=\r?\n/g, '');
    const missing = needles.filter((n) => !text.includes(n));
    if (!snapshot) fail(`${path}: could not snapshot with JS disabled`);
    else if (missing.length) fail(`${path}: with JS disabled, missing ${missing.join(' | ')}`);
    else console.log(`  ok  ${path}`);
  }
  await call('Emulation.setScriptExecutionDisabled', { value: false });

} finally {
  cdp?.close();
  chrome.kill();
}

console.log('');
if (notes.length) {
  console.log('notes:');
  notes.forEach((n) => console.log(`  · ${n}`));
  console.log('');
}
if (failures.length) {
  console.log(`${failures.length} FAILURE(S):\n`);
  failures.forEach((f) => console.log(`  ✗ ${f}`));
  process.exitCode = 1;
} else {
  console.log('all browser checks passed');
}
