# Phase 1 audit

What existed, what the Myniq reference offered, and what was taken from each.

---

## 1. The starting point

Three files, no build, no dependencies: `index.html` (818 lines),
`styles.css` (1,262), `app.js` (125). Sixteen sections. All copy inline. All
product imagery placeholder.

The foundation was genuinely good. The visual language was coherent and
distinctly Transpahire's: dark ink surfaces, a single indigo accent, four
typefaces with clear jobs, thin rules, generous whitespace, an asymmetric bento
grid, and the serif-italic accent inside headlines that is the brand's most
recognisable signature. CSS custom properties were already in place. The reveal
system already degraded gracefully without JS and already respected
`prefers-reduced-motion`.

What it lacked was systematisation and an accessibility floor.

### Defects found

Ordered by severity.

| | Defect | Consequence |
|---|---|---|
| 1 | **No mobile navigation.** `.nav-links { display: none }` below 800px with no replacement | The site had no navigation at all on a phone |
| 2 | **Tabs had ARIA roles but none of the behaviour** — no `aria-selected`, `aria-controls`, `role="tabpanel"`, no keyboard, no tabindex management | Worse for a screen-reader user than plain buttons: the roles promise behaviour that is not there |
| 3 | **The comparison table was grid divs** | Looks identical, conveys nothing — no row/column association, no header announcement |
| 4 | **No `<main>`, no skip link, no `:focus-visible` styling** | Keyboard users had no way past the header and no reliable focus indicator |
| 5 | **Count-up wrote `0` into the DOM on load** and animated the visible text | Screen readers read a stream of intermediate numbers; digits growing 1→3 characters shifted layout |
| 6 | **JS intercepted every anchor click** and called `window.scrollTo` | Focus never moved to the target — keyboard users were scrolled somewhere they could not interact with |
| 7 | **Stagger capped at 10 children** via an `:nth-child` ladder | The 9-card "Coming soon" grid was near the limit; an 11th card would never appear |
| 8 | **Permanent `will-change`** on `.btn` and all `[data-anim]` | ~40 elements permanently promoted to compositor layers |
| 9 | **Fabricated social proof** — four grey rectangles under "Trusted by hiring teams at" | A trust claim, not a placeholder. See `content-integrity.md` |
| 10 | Fonts requested 17 faces; the design used 8 | Unnecessary render-blocking weight |
| 11 | No favicon, canonical, OG, Twitter, structured data, manifest, robots, or sitemap | No share preview, no crawler control |
| 12 | Inline `style` attributes for centred section heads and captions (~14 instances) | The pattern could not be changed in one place |
| 13 | `.dot` used for both window chrome and state signals | Fragile specificity collision |
| 14 | Footer used `<h5>` with no h4 above | Skipped heading levels |
| 15 | `overflow-x: hidden` on `<body>` | Masks overflow bugs and breaks `position: sticky` descendants |
| 16 | Official brand assets existed in `../transpahire-stratum-logo/` but were unused | Duplicated inline mark, no favicons |

All sixteen are fixed. Items 1–8 were verified fixed by automated interaction
testing (see § 6).

---

## 2. Myniq analysis

Eight pages of Framer export, ~3.6MB of generated HTML.

### The headline finding

**Myniq's homepage uses essentially one entrance animation, 89 times.**

| | Count |
|---|---|
| Elements with `opacity: 0; transform: translateY(60px)` | 89 |
| Elements with `translateY(20px)` | 3 |
| Bespoke hero springs | 4 |
| Reveals across all eight pages | 337 |
| Distinct reveal primitives | **1** |

The hero springs are over-damped — `damping: 80` against `stiffness: 400`,
mass 1–2, delays 0.6–0.8s. Nothing in the entire reference bounces or
overshoots.

What reads as sophistication is not variety. It is **consistency, generous
travel distance (60px, more than twice what the Transpahire build used), and a
long decelerating settle.** That single observation shaped this system's
timings more than anything else in the reference.

### Patterns worth borrowing

| Pattern | Verdict |
|---|---|
| One entrance primitive, applied relentlessly | **Adopted** as the core discipline |
| Over-damped spring feel | **Adopted** as `cubic-bezier(0.16, 1, 0.3, 1)` — indistinguishable, no runtime |
| Generous travel distance | **Adopted**, as a scale (16/28/48/64px) rather than a constant |
| Staggered delays on grouped children | **Adopted**, rebuilt without the sibling cap |
| Hover: card lift, icon shift, image scale | **Adopted** as classes |
| Pricing monthly/yearly toggle with saving badge | **Deferred** — no pricing to toggle yet |
| FAQ accordion | **Adopted** as a pattern; implementation rebuilt |
| Counters inside testimonial cards | **Adopted** — the counter is generic; the placement is a Phase 2 decision |
| Numbered process steps with named phases (Sync / Optimize / Scale) | **Noted for Phase 2** — naming a step is better than numbering it |
| Integration marquee ("250+ tools") | **Rejected for now** — no confirmed integrations |
| Multi-page architecture with a consistent shell | **Adopted as a principle** — see `architecture.md` |
| Large closing CTA band | Already present in Transpahire |

### Patterns rejected

| Rejected | Why |
|---|---|
| The Framer runtime | ~20 preloaded ES modules, a React runtime, a motion library — for effects that are 40 lines of CSS |
| Spring physics engine | A tuned bezier is visually identical to an over-damped spring at zero cost |
| Character-by-character headline split | Every letter is its own DOM node. Expensive, hostile to text selection and some AT, and communicates nothing the whole-line reveal does not |
| Triple-rendered breakpoint variants | Desktop, tablet and phone markup all shipped and hidden with media queries. Three copies of every section |
| `div[tabindex="0"]` accordion | Announces nothing, cannot be operated with Space. The interaction idea was worth taking; the implementation was not |
| Generated class names (`framer-1v20yh7`) | Unmaintainable |
| The visual identity | Myniq is a soft, pastel, rounded fintech brand (`#d699fa`, `#f9b090`, `#53b8e3`, 16px radii, Inter). Transpahire is editorial, ink-and-indigo, four-typeface. **Not the brand.** |
| Duplicated section content for animation variants | Sections appear 2–3× in the DOM |

---

## 3. Comparison

| Area | Transpahire (before) | Myniq | Decision |
|---|---|---|---|
| **Typography** | 4 families with distinct jobs; serif italic accent; fluid clamps | Inter throughout | **Preserve.** Transpahire's is far more distinctive. Formalised the scale into tokens |
| **Colour** | Indigo system, ink surfaces, restrained neutrals | Pastel multi-hue on off-white | **Preserve.** Added semantic roles and the `.on-ink` inversion |
| **Layout** | 1280px, asymmetric bento, 200px label rail | 1084px, mostly symmetric cards | **Preserve** Transpahire's asymmetry. Adopted Myniq's tighter section rhythm discipline |
| **Navigation** | Desktop links; **nothing on mobile** | Full-page mobile overlay, dropdown mega-menu | **Adapt.** Built an accessible drawer — focus trap, Escape, scroll lock. Rejected the dropdown until IA exists |
| **Hero** | Two-column, copy + product frame | Centred, character-split headline, large dashboard | **Preserve** the two-column asymmetry. Rejected the character split |
| **Cards** | Icon, title, body, serif benefit line | Icon, title, body | **Preserve.** The benefit line is a real differentiator |
| **Product UI** | Placeholder frames with chrome | Rendered dashboard imagery | **Preserve** the frame. Myniq's imagery is better because it exists — that is a Phase 2 content problem, not a design one |
| **Motion** | 7 variants, 28px travel, 800ms, `:nth-child` stagger | 1 variant, 60px travel, over-damped spring | **Blend.** Kept variety where the editorial layout justifies it; adopted the spring feel, the distance scale, and the consistency discipline |
| **Scroll effects** | IntersectionObserver reveals | Reveals only; no scroll-linked motion | **Extend.** Added capped parallax and layer reveal, both heavily constrained |
| **Hover** | Card lift, button translate | Lift, icon shift, image scale | **Adapt.** Formalised as five composable classes, gated behind a fine pointer |
| **Feature storytelling** | Bento + tabs + alternating segments | Cards + feature grid + steps | **Preserve** Transpahire's — it has more narrative range |
| **Responsive** | 4 breakpoints; mobile nav broken | 3 explicit variants, triple-rendered | **Preserve** the CSS approach. Fixed mobile. Documented five breakpoints |
| **CTA** | Full-bleed indigo with glow | Large dark band | **Preserve** |
| **Pricing** | 3 tiers, prices unset | 2 tiers, monthly/yearly toggle | **Preserve** structure. Toggle deferred until prices exist |
| **FAQ** | *None* | Accordion | **Adopt the pattern**, rebuilt accessibly. Not added to the homepage — that is an IA decision |
| **Testimonials** | One fabricated quote | Card grid with counters | **Neither.** Both are placeholder content; flagged in the inventory |
| **Multi-page** | Single page | 8 pages, consistent shell | **Adopt the principle.** Structured for expansion; built no new pages |

---

## 4. Blend strategy

### Preserve — uniquely Transpahire

The four-family type system and the serif-italic headline accent. The indigo-
and-ink palette. The editorial composition: asymmetric bento, the 200px mono
label rail, dark interludes between acts, the sparing use of inversion. The
card benefit line. The comparison table as a differentiation device. Thin rules
over boxes. The Stratum mark. The provisional section architecture.

### Adapt — from Myniq

The discipline of one entrance gesture applied consistently. The over-damped
settle, as a bezier. Generous travel distance, scaled by object size. Grouped
stagger. Hover as a small set of composable primitives. The accordion pattern.
Scroll-linked depth, heavily capped. The multi-page shell as an architectural
target.

### Reject — and why

The Framer runtime and generated DOM: enormous cost for effects that are CSS.
The character-split headline: expensive and communicates nothing. Triple-
rendered breakpoints: three copies of every section. The `div[tabindex]`
accordion: an accessibility regression. The pastel visual identity: it is not
this brand. Marquees and integration counts: nothing confirmed to put in them.
Testimonial card grids: no real testimonials.

The one-line test the result has to pass:

> **Transpahire evolved with a more sophisticated interaction system** —
> not *Myniq with the word "Transpahire" substituted.*

---

## 5. Section audit

Order is **provisional**. Phase 2 decides the narrative.

| # | Section | Purpose | Motion | Strength | Weakness | Survives Phase 2? |
|---|---|---|---|---|---|---|
| 1 | Header | Nav, CTA | Scroll substrate; drawer | Restrained | IA not settled | **Yes**, contents change |
| 2 | Hero | Position + product glimpse | `blur` H1, `rise` frame | Strong asymmetry, distinctive type | Placeholder visual; logo row neutralised | **Yes**, copy + visual change |
| 3 | Problem | Establish stakes | Staggered cards + `scale` statement | Well-constructed; the ink statement is the page's best turn | Four generic pains | **Likely** |
| 4 | Interlude 01 | Editorial pause | `blur` quote | Distinctive; rare on SaaS sites | Load-bearing on copy quality | **Yes** — a signature device |
| 5 | Features (bento) | Capability overview | Group stagger | The asymmetry is the antidote to generic feature grids | Six unvalidated features | **Yes**, contents change |
| 6 | How it works | Process | Slow stagger + `rise` | Clear; the hairline connector is elegant | Three steps may be a simplification | **Likely** |
| 7 | Platform (tabs) | Product breadth | Tab crossfade | Now fully accessible | Tab names unconfirmed | **Yes**, if the areas are real |
| 8 | Segments | Audience-specific value | Paired slide + parallax | Best structural idea on the page — one section, three audiences | 12 unvalidated bullets | **Yes** — strong candidate for expansion into pages |
| 9 | Differentiation | Competitive framing | Fast stagger + table | The table is high-conviction | Comparative claims need a basis | **Likely**, needs legal review |
| 10 | Interlude 02 | Editorial pause | `blur` quote | Good rhythm | Two interludes may be one too many | **Maybe** |
| 11 | Coming soon | Roadmap honesty | Fast stagger | Dashed cards read correctly as "not yet" — unusually honest | Nine is a lot of "not yet" in one view | **Reduce** to three or four |
| 12 | Stats + testimonial | Proof | Stagger + `blur` | Well built | **All content fabricated** | **Only if real data exists** |
| 13 | Demo | Conversion | `rise` | Right place in the page | No video exists | **Yes**, once there is a video |
| 14 | Pricing | Commercial | Stagger | Honest — prices unset rather than invented | Tiers unconfirmed | **Yes**, likely its own page |
| 15 | Final CTA | Conversion | `scale` | Strong close | Fine print unverified | **Yes** |
| 16 | Footer | Navigation, legal | None | Clean | Every link is `href="#"` | **Yes** |

Cross-cutting: every product visual is a placeholder, so sections 2, 5, 6, 7, 8
and 13 all depend on Phase 2 imagery. Sections 3, 5, 9 and 11 are all
card grids — four is close to the limit before the page reads as repetitive.

---

## 6. Validation

Automated via Chrome DevTools Protocol at 1440px, 390px, and with
`prefers-reduced-motion: reduce` emulated.

| Check | Result |
|---|---|
| Console errors / exceptions | None, all three configurations |
| Network failures | None |
| Reveals fired | 38/38, every configuration |
| `will-change` left after settle | 0 |
| Horizontal overflow | None (1430px content at 1440px viewport = scrollbar) |
| `<h1>` count | 1 |
| Broken same-page anchors | 0 |
| Images without `alt` | 0 |
| Mobile drawer | Opens, `aria-expanded` flips, focus moves to first link, `inert` clears, scroll locks |
| Escape | Closes drawer, restores focus to the toggle, unlocks scroll |
| Tabs — ArrowRight | Moves focus and selection, panel swaps, tabindex `[-1, 0, -1]` |
| Tabs — End | Jumps to last tab and panel |
| Accordion | Single-open enforced; collapsed panels measure **0px**; `aria-expanded` and `inert` track state |
| Accordion — ArrowDown | Moves focus between triggers |
| Counters | Render final values; layout width reserved |
| Parallax | Applies offset, respects the ±40px cap |
| Focus ring | 2px solid on every interactive element |
| Reduced motion | All content revealed, no animation, page fully usable |

Three defects were found *by* this testing and fixed:

1. **Drawer focus failed silently.** The drawer was still `visibility: hidden`
   when focus was moved into it. Fixed by flipping `visibility` instantly on
   open and delaying it only on close.
2. **Escape restored focus to `<body>`.** `document.body` passes an
   `instanceof HTMLElement` check but focusing it drops the user to the top of
   the page. Fixed with an explicit guard.
3. **Collapsed accordion panels were 24px tall.** Padding on a grid child
   survives `min-height: 0`. Fixed by moving padding one level deeper into a
   bare clipping wrapper.

Not covered by automation, and worth a manual pass: real screen-reader
verification (VoiceOver / NVDA), Safari and Firefox rendering, and touch
gestures on a physical device.

---

## 7. Files

**Created (23)**

```
CLAUDE.md · DESIGN.md · motion-lab.html · site.webmanifest · robots.txt · sitemap.xml
docs/architecture.md · docs/motion-system.md · docs/components.md
docs/product-visualization.md · docs/content-integrity.md · docs/audit.md · docs/phase-2.md
assets/css/{tokens,base,motion,components,sections}.css
assets/js/main.js
assets/js/modules/{prefs,reveal,nav,tabs,accordion,counter,parallax}.js
```

**Modified (2)** — `index.html` (rebuilt: semantics, metadata, new class system;
copy and section order preserved), `README.md`.

**Removed (2)** — `styles.css` and `app.js`, fully superseded by
`assets/css/*` and `assets/js/*`.

**Added assets (12)** — Stratum symbols, lockups, wordmark, favicons, app icons
and `brand.json`, copied from `../transpahire-stratum-logo/` into
`assets/brand/`. The source package is unchanged.
