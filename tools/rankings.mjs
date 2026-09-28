/**
 * rankings.mjs — AUTHORING TOOL. Not part of the site, not served, not loaded
 * by any page.
 *
 * Section 08 lets a visitor move three importance controls through the
 * product's four tiers, which is 64 combinations. `08 § 5` requires a
 * PRECOMPUTED ordering per combination and forbids client-side arithmetic:
 * "a visitor who reverse-engineers the demo's arithmetic has learned something
 * false about the product".
 *
 * So the sixty-four orderings are authored ONCE, here, and frozen as literal
 * data into assets/data/product-demo.js. What the browser ships is a lookup
 * table. This file records how the fixture was authored so a future session can
 * regenerate it consistently — and so nobody mistakes it for a model of the
 * matching engine, which it is not.
 *
 * The authored basis, stated plainly:
 *   · a per-candidate `base`, which stands in for everything the three
 *     tunable skills do not touch (the other job skills and the four
 *     non-skill dimensions),
 *   · a state per tunable skill — covered, partial or missing — read from the
 *     candidates' own skill lists,
 *   · an authored weight per tier.
 *
 * The bases are chosen so the default combination reproduces the authored
 * scores in product-demo.js exactly: Sneha at 87, and 87 is what the whole page
 * repeats.
 *
 * TWO RULES ARE THE PRODUCT'S, not the demo's, and were settled against the
 * source on 28 Sep 2026 (STAGE-4-IMPLEMENTATION.md § 12):
 *
 *   1. THE GATE IS REAL. A candidate MISSING a skill set to CRITICAL is
 *      disqualified before scoring — `MatchingService.isCriticalDisqualified`
 *      drops any row whose CRITICAL skill has `matchType === 'none'`. Here that
 *      candidate carries no score and the row says which skill dropped them.
 *      A PARTIAL on a critical skill passes the gate and is penalised instead
 *      (`criticalFactor = 0.7 + criticalCoverageRatio × 0.3` in
 *      ranker.service.ts), which is why a partial counts for less the higher
 *      the tier. That is what makes "Kubernetes to critical" promote Rahul
 *      Verma, who has production Kubernetes, above Sneha, whose Kubernetes is
 *      Docker experience transferring.
 *   2. THE CLASSIFICATION IS `BANDS`. Strong ≥ 72, Good ≥ 52, Potential ≥ 32 —
 *      `RankerService.classifyScore` and the frontend's `MATCH_THRESHOLDS`. The
 *      fixture used to classify on private 80 / 70 / 55 bands, which called 78
 *      and 74 "Good" while the site published 72 as the floor for "Strong".
 *
 * Run:  node tools/rankings.mjs        (rewrites the RANKINGS block in place)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { BANDS, CANDIDATES, TUNABLE } from '../assets/data/product-demo.js';

const DATA_FILE = new URL('../assets/data/product-demo.js', import.meta.url);

/** Authored weight per tier index: bonus · preferred · required · critical. */
const TIER_WEIGHT = [2, 5, 9, 18];

/** What a PARTIAL is worth, per tier. Steps down as the tier steps up. */
const PARTIAL_FACTOR = [0.75, 0.5, 0.4, 0.2];

const CRITICAL = 3;

function state(candidate, skill) {
  if (candidate.skills.covered.includes(skill)) return 'covered';
  if (candidate.skills.partial.some((p) => p.name === skill)) return 'partial';
  return 'missing';
}

function contribution(candidate, combo) {
  return TUNABLE.reduce((sum, t, i) => {
    const s = state(candidate, t.skill);
    const w = TIER_WEIGHT[combo[i]];
    if (s === 'covered') return sum + w;
    if (s === 'partial') return sum + w * PARTIAL_FACTOR[combo[i]];
    return sum;
  }, 0);
}

/* The base is derived, not invented: it is whatever makes the default
   combination return the score already authored in product-demo.js. */
const DEFAULT_COMBO = TUNABLE.map((t) => t.default);
const BASES = new Map(CANDIDATES.map((c) => [c.id, c.score - contribution(c, DEFAULT_COMBO)]));

/** The product's own bands, read from the data module — never restated here. */
function classify(score) {
  return BANDS.find((b) => score >= b.min).key;
}

/** The skill (if any) whose CRITICAL tier gates this candidate. */
function gatedBy(candidate, combo) {
  const hit = TUNABLE.find((t, i) => combo[i] === CRITICAL && state(candidate, t.skill) === 'missing');
  return hit ? hit.skill : null;
}

/**
 * One ordering. Each entry is [id, score, classification] for a scored
 * candidate, or [id, null, 'gated', skill] for one the gate dropped. Gated rows
 * sort last, in default order. Ties break on the authored default order, which
 * is stable because CANDIDATES is already in default rank order.
 */
function rank(combo) {
  const scored = [];
  const gated = [];
  CANDIDATES.forEach((c) => {
    const g = gatedBy(c, combo);
    if (g) { gated.push([c.id, null, 'gated', g]); return; }
    const score = Math.min(100, Math.max(0, Math.round(BASES.get(c.id) + contribution(c, combo))));
    scored.push([c.id, score, classify(score)]);
  });
  scored.sort((a, b) => b[1] - a[1]);
  return [...scored, ...gated];
}

const cell = ([id, score, cls, skill]) =>
  score === null ? `['${id}',null,'gated','${skill}']` : `['${id}',${score},'${cls}']`;

const lines = [];
for (let p = 0; p <= 3; p += 1) {
  for (let k = 0; k <= 3; k += 1) {
    for (let f = 0; f <= 3; f += 1) {
      lines.push(`  '${p}-${k}-${f}': [${rank([p, k, f]).map(cell).join(', ')}],`);
    }
  }
}

const source = readFileSync(DATA_FILE, 'utf8');
const table = lines.join('\n');
const next = source.replace(
  /(export const RANKINGS = \{\n)[\s\S]*?(\n\};)/,
  (_, head, tail) => `${head}${table}${tail}`
);

if (next === source && !source.includes(table)) {
  console.error('RANKINGS block not found — nothing written.');
  process.exit(1);
}

writeFileSync(DATA_FILE, next);

const fmt = (r) => r.map(([id, s, c, g]) => (s === null ? `${id}=gated:${g}` : `${id}=${s}/${c}`)).join('  ');
console.log(`wrote ${lines.length} combinations`);
console.log('default combo:      ', fmt(rank(DEFAULT_COMBO)));
console.log('kubernetes→critical:', fmt(rank([3, 3, 1])));
console.log('kafka→critical:     ', fmt(rank([3, 2, 3])));
