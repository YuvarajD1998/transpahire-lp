/**
 * final.mjs — STAGE 3: the one landing page.
 *
 * Variation 02 (Product editorial), consolidated: the A3 hero, the signature
 * in its FINAL mapping (V2's separation with V3's "87 becomes four bars" at the
 * one transition that earns it), the sticky-but-unpinned tuner, and the eight
 * scenes in the order Stage 2 settled. Nothing here is a new composition; every
 * piece is a Stage 2 part with a Stage 3 option set on it. The refinements are
 * listed in prototypes/STAGE-3.md § 3 and the stylesheet is css/final.css.
 *
 * Not production. Production is untouched.
 */

import {
  heroA3, signature, sceneProblem, scenePool, sceneArgument, sceneControl, sceneSystem, sceneClose,
} from './parts.mjs';
import { candidate } from '../../assets/data/product-demo.js';

const SNEHA = candidate('c1');

/** State boundaries on the stage's 0 → 1 track. Must match css/signature.css
    § FINAL: each boundary t has the outgoing layer leaving over [t − w, t] and
    the incoming layer arriving over [t, t + w], so no two layers are ever
    visible at once. */
export const FINAL_THRESHOLDS = [0.14, 0.31, 0.48, 0.65, 0.82];

/** The visible PRODUCT DECISION REQUIRED note under the tuner (§ 26 of the
    Stage 3 brief). It ships on the prototype on purpose: a note that only lives
    in a document is a note that gets lost. */
const PRODUCT_DECISION = `<aside class="decision" aria-label="Product decision required">
      <p class="decision__label">Product decision required · not a design decision</p>
      <ol class="decision__list">
        <li><b>The critical gate.</b> The production ranking fixture scores candidates who miss a Critical skill; the product's own model (and the gate composition above) says they never reach the scorer. This prototype uses a proposed fixture that gates them. One of the two is wrong, and the product source decides which.</li>
        <li><b>The classification thresholds.</b> The published bands (Strong ≥ 72, Good ≥ 52, Potential ≥ 32) would call 78 and 74 "Strong"; the six candidates ship as "Good". The proposed fixture reproduces the shipped words. No threshold is shown on this page until the source settles it.</li>
      </ol>
    </aside>`;

export function finalPage() {
  return [
    heroA3({ cta: { secondary: 'See the working', secondaryHref: '#score' } }),
    signature({
      execution: 'final',
      mode: 'pinned',
      lede: `${SNEHA.name}'s row, from the screen above. Six layers of one object.`,
      thresholds: FINAL_THRESHOLDS.join(','),
    }),
    sceneProblem(),
    scenePool(),
    sceneArgument(),
    sceneControl({ pinned: true, note: PRODUCT_DECISION }),
    sceneSystem(),
    sceneClose({ cta: { block: true, secondary: 'What we will not claim', secondaryHref: '/trust/' } }),
  ].join('\n');
}
