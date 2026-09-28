# Transpahire Landing Page — Design Intelligence & Creative Direction

Sep 26, 2026 · @balaji

## 1. Executive summary

**Diagnosis.** The Transpahire homepage does not feel impressive enough because it is under-executed, not because it is under-decorated. Its identity is real and rare in the category: a display grotesk with one serif-italic turn, a mono label rail, one accent colour, and real product surfaces with real data instead of illustrations. What undermines it is (1) a hero that is hidden until a script graph loads and then blurs in, on the one screen the site's own rules say must never animate; (2) twelve sections that state one idea in the same shape twelve times, so the page reads as a tasteful feature tour; (3) a product that is shown but never seen thinking, with the two interactions that could show it either hidden or reordering nothing; (4) a composition that is visibly broken at every width and four frames with empty floors; (5) a mobile page with no product on the first screen and 2.4 screens of inert workspace after it. The site's own check and audit tools pass on all of this; every defect was found by opening the page.

**Recommended direction.** Direction B, "the brief": a considered publication whose evidence is the real product at reading size, with one mechanism borrowed from the experimental direction (a single pinned, scroll-driven scene) and one convention from the human-plus-AI direction (colour by actor, as a chip style). It is the only direction under which every product differentiator is visible, every existing rule holds, and the market territory is empty: no recruitment competitor puts a legible scoring surface above the fold, pairs a display face with a serif accent and mono data, composes with rules instead of cards, or lets motion carry a communicative job.

**The signature experience.** *The score, taken apart.* On scroll, the first screen's ranked list opens into one candidate's 87; the 87 into its four published weights; a weight into its matched skills; a skill into the quoted line of the profile it came from; and the whole thing re-composes on the candidate's own screen as the same number. Five layers, one continuous object, no controls, built entirely from compositions and values that already exist. It is the brand's idea (transparency in layers) as an experience, and it is the one thing on the page a visitor would describe to a colleague.

**What changes.** Twelve sections become eight scenes with three tempos; four card grids become none; the serif accent drops from seventeen to six; the hero gains its full width and loses its blur, its count-ups and its three empty logo slots; the tuner is pinned and its fixture re-authored so the advertised move moves a name; the palette warms and gains a highlighter for evidence; ledes leave the serif; mono labels rise to a size and colour that pass; mobile gets its own first screen and its own rhythm. Page length falls by roughly a quarter on desktop and a third on a phone.

**What does not change.** The four typefaces and the serif-in-indigo signature; the state colour system; the no-dependency, no-build architecture; the hero-is-never-interactive rule; the refusal to invent a logo, a number, a testimonial or a screen; the accessibility floor; token-level reduced motion; the narrative spine.

**Honest scope of this report.** Seven of eight audit lenses completed and their top findings were re-verified by hand; the accessibility lens was completed manually. Competitive research covered six sites in depth with real screenshots; the remaining clusters, the inspiration categories and the sourced trend sweep were captured but not analysed before a session limit, and § 29 lists them as the first research task of the next phase. Nothing in the repository was modified.

**Read next:** § 10 for the ranked problems, § 24 and § 25 for the signature and the reasoning, § 27 for the page to build, § 29 for the order to build it in.

## 2. Transpahire product understanding

Transpahire is an intelligent hiring platform whose one defensible claim is that **the score shows its work**: every candidate is scored out of 100 against a job, the score comes apart into four published weights, every matched skill cites the line of the profile it came from, and the candidate sees the same number. That sentence, not "AI recruitment", is what the landing page has to make visible in four seconds. Sources: `docs/phase-4.md` § 1 (fact sheet, read from the product source 31 Aug 2026), `docs/phase-5.md` § 2, `docs/phase-2/02-MARKETING_STRATEGY.md`, `docs/glossary.md`.

**What it is.** A recruiter-facing platform that sits between a traditional applicant-tracking system and a talent marketplace: lighter than an enterprise ATS, far more intelligent than a job board. It parses a job into four importance tiers (critical, required, preferred, bonus), scores every profile in the database against it, ranks them into Strong / Good / Potential / Possible bands, explains each ranking with cited evidence, lets the recruiter re-weight and simulate, runs an always-on sourcing agent that reports its own refusals and stop reasons, and carries the hire through approvals, stages, interviews and feedback. The candidate side shows the same score, a resume critique and which skills would unlock more roles.

**Buyer vs daily user.** The buyer is the head of talent or a hiring manager at a team hiring 50 to 500 people a year (India-first market; salaries in the demo data are in lakh). They buy on trust: can I stand behind a shortlist in a meeting. The daily user is the recruiter or sourcer working a requisition; they live in the job detail page (five tabs: Overview, Candidates, Sourcing, Insights, Settings), the candidate drawer and the explain panel. The second audience is the candidate, who sees the identical score. The page has to speak to the buyer's trust and the recruiter's workday at once, and the product's own surfaces do both.

**The problem it solves.** Finding people stopped being the hard part. A ranked list you cannot interrogate is still a guess; three weeks later nobody can reconstruct why anyone was passed over. Hiring is a private opinion that should be a shared, inspectable, adjustable argument. Everything visual on the page should serve that turn from opinion to argument.

**What makes it different (and can be shown).**

| Differentiator | The mechanism a page may depict | Where it lives in the product |
| --- | --- | --- |
| The score decomposes | 4 weights: skill coverage 65 %, semantic similarity 25 %, experience 7 %, location 3 %; then a ±10 % salary band, a rarity boost, a seniority modifier | ranker.service, published on `/product/matching` |
| The score cites its sources | Each concept match names a relationship (exact, synonym, ≈ equivalent, broader, narrower, transferable), a confidence, and the profile section it came from; clicking scrolls to the highlighted snippet | ExplainMatchPanel |
| It refuses, on the record | A candidate missing a critical skill is dropped before scoring and the requirement that dropped them is recorded | the critical gate |
| It understands skills, not words | 9 weighted skill relationship types, 5 job-title types; Docker scores partial on Kubernetes | the skill graph |
| You decide what counts | Per-skill tier sliders re-rank instantly; a what-if simulator shows how many more qualify before the job changes | Insights, Tuning |
| The parser escalates rather than guesses | An amber "3 skills need review" flag and a three-action drawer (use mapping, keep as new, discard) | JD skill review |
| The agent is honest about itself | Always-On Sourcing has a run ledger, strategies that cannot repeat, refusals shown in history, a "Market covered" terminal state, and a panel titled "How often we interrupt you" | Sourcing mission console |
| Both sides read the same score | Candidate dashboard: same 87, breakdown, resume critique, skills that unlock roles, who viewed the profile, application status | Candidate app |
| Structural fairness as a mechanism | Reads the JD for narrowing language; holds no demographic data; refuses to rate below 50 audit entries | FairnessMonitorService |

**Genuinely unshipped and never to be drawn:** in-platform messaging, calendar sync, the Chrome extension (name it, never depict it), any integration.

**Emotional response the site should create.** Relief followed by respect. Relief that a machine is finally showing its reasoning instead of asking to be believed; respect because the reasoning is dense, specific and willing to argue against its own top pick. The right feeling is *I could defend this list in a meeting*, not *this is magic*. That rules out the awe-and-glow register of generic AI marketing and points at the register of a well-argued document.

**Trust level required.** High, and of a particular kind: not "secure and compliant" (those words are legally gated and banned on the site) but *inspectable*. The product earns trust by exposure of mechanism, so the page must earn trust the same way: by showing more of the real product, at real density, than any competitor dares. Every invented number, logo or testimonial would spend the very trust the product is built on. This is the strongest single constraint on the redesign and it is also its biggest creative opportunity.

**What it should visually resemble.** Not an HR suite and not an AI startup. The closest analogues are products whose interface is the argument: a financial terminal, an audit trail, a well-typeset legal brief, a Linear- or Attio-class product site that lets dense real UI carry the page, and an editorial publication that argues in type. The visual language that naturally represents "transparency in layers" (the Stratum brand idea: a T whose stem is stacked opacity-graded segments) is *layered evidence*: a verdict, and beneath it the working, and beneath that the source line. Depth here should mean provenance, not glass.

**Vocabulary the redesign inherits.** Must use the product's words verbatim: Strong / Good / Potential / Possible; covered / partial / missing; critical / required / preferred / bonus; Sourced / Reviewed / Shortlisted / Interviewing / Offer out / Hired / Not moving forward; Watching / Market covered / Target reached. Banned in visible copy and enforced by `tools/check.mjs`: embedding, vector, prompt, cosine, context window, LLM, and the outcome words bias-free, fair by design, enterprise-grade, fully compliant. Avoid without sign-off: compliant, defensible, auditable, unbiased, secure. Three permitted deviations: agent, semantic, model.

**Numbers that exist and may be shown:** the 65/25/7/3 weights, the ±10 % salary band, the 72/52/32 band thresholds, the 20/8/4 tier points, the demo job's 47 applicants / 12 in pipeline / 3 interviewing / 1 offer out, Sneha Iyer's 87, the six flagged JD terms, nine and five relationship types, 22 notification types, six org roles, the six-stage job lifecycle. **Numbers that must not be invented:** any customer count, time saved, accuracy, "148,000+ cities", pricing, analytics figures without an "example" label, testimonials, logos.

## 3. Current landing page forensic audit

The page is under-executed, not over-designed. Its identity (Space Grotesk plus one Instrument Serif italic phrase in indigo, a mono label rail, real product surfaces instead of illustrations) genuinely lands and does not read as an AI-SaaS template. What keeps it from feeling premium is voids and defects in the middle third, a hero that is quieter than its own footer, and twelve sections that all move the same way. Method: the page was served locally and captured one viewport at a time at 1440×900, 768×1024 and 390×844 after reveals settled (62 frames), then seven audit lenses read the source, the design documents and the frames, and drove the live page over the DevTools protocol to measure geometry and timing. The two most consequential claims below were re-verified by hand against the data module and the CSS.

| § | Section | Height at 1440 | What works | What is wrong |
| --- | --- | --- | --- | --- |
| 01 | Hero | 900 (one screen) | The real job-detail surface, one screen, no fakes; the amber "3 skills need review" pill | H1 capped at 60 px while the closing CTA is 84 px; the drawer crops the verdict mid-clause and covers three of five tracks on five of seven rows; three dashed "LOGO SLOT" boxes are the lowest-fidelity element on the first screen; the caption floats 230 px short of the frame it captions; the whole hero blurs in 1–2 s after paint (see § 5) |
| 02 | The gap | \~930 | The ink statement is a real turn | Three identical white cards in a row, the exact anti-pattern `DESIGN.md` § 10 names, with hover-lift on cards that go nowhere; both card closers restate the ink statement |
| 03 | Interlude | \~870 | The best screen on the page: ink, one line, a mono running head | It sits 128 px after another ink block saying the same thing; two loud moves back to back read as a stutter |
| 04 | The role | 804 | Compact; the Filters / Describe control is real | Stacked-left head breaks the rail grammar; opens in sans while its neighbours open in serif |
| 05 | The pool | 1,669 | The critical-gate row is the page's most honest object | **Broken at every width**: the band bar and its labels are drawn on top of the ranked list because the frame body stacks every child into one grid cell (`components.css:846`, `compositions.mjs:1923`); filter chips promise "strong 14" and show 2 rows; \~78 px of blank floor |
| 06 | The argument | 1,280 | The explain panel is dense, cited and credible; the switcher is the page's best interaction | Copy column goes dead 395 px before the panel ends; the switcher is stranded at the bottom of it; copy promises "click a reason" and nothing is clickable; the frame URL still says sneha-iyer after a switch |
| 07 | Adjacency | 1,743 | The path draw is the one place motion depicts a mechanism | The self-declared moat is the thinnest section: two boxes and an arrow over two screens, centred where centring is forbidden, with rows that pass through each other mid-flight |
| 08 | Control | 1,154 | The tuner's accessibility model is exemplary | The lede's own instruction ("make Kubernetes matter more") reorders nothing: Sneha is first in all 64 precomputed combinations and 28 of them produce the default order; the what-if changes a number but never the list; on phones the slider is a viewport away from the list |
| 09 | The hire | 1,102 | Short, as intended | "Step 01" pills with a hairline are the page's most generic component and duplicate the pipeline beneath; the pipeline's "card advances a stage" beat is dead code (`--advance` is never set); \~100 px blank floor |
| 10 | Both sides | 1,608 | The candidate view is the truest thing on the site, and better on a phone than on desktop | Two frames with mismatched empty bottoms (reserved 3/4 and 1/1 ratios taller than their content); a 68-word serif lede with seven list items |
| 11 | Philosophy | \~800 | Trust built from type alone, no shields | The fifth beat breaks the four-beat rhythm and files a mechanism under the outcome word "Fairness" |
| 12 | CTA | \~700 | The qualifying headline and the honest 30-minute promise | The radial glow at 0.40 alpha is the strongest visual on the page and the one place it resembles the generic purple-glow closer; four washes exist against a stated budget of two |
| — | Footer | \~1,300 (390: two screens) | Honest "not wired up yet" note | The email form submits to nowhere and reloads the page, losing the address; 21 links in one column on a phone |

Total height: 13,700 px at 1440, 16,900 at 768, 19,200 at 390. Between the hero and the closing band there is one primary CTA-free run of nineteen phone screens.

**What the tooling could not see.** `tools/check.mjs` and `tools/audit.mjs` pass on this page. The pool overlap, the empty frame floors, the dead pipeline beat, the zero-row reorder and the hero's blur-in are all invisible to them; every one was found by opening the page or by reading a value. That is `CLAUDE.md` § 1's own lesson, and a redesign should add three assertions (frame content height versus reserved ratio, every custom property a transition consumes is set somewhere, the H1 has computed opacity 1 within 100 ms of DOMContentLoaded) before it adds a single new effect.

## 4. UX / interaction audit

The page is **static with two interactive islands**, and that is the right model for a site whose argument is "read this"; the problem is that the flagship island under-delivers and the page spends affordance where nothing happens. Inventory, from `assets/js/main.js` and the thirteen modules, confirmed against the rendered tree:

| Element | What it does | What it communicates | Would a visitor find it? | Verdict |
| --- | --- | --- | --- | --- |
| Header, scrolled state | Translucent substrate appears after scroll | "you have left the top" | Yes | Keep |
| Disclosure menus (3) | Full keyboard contract, outside-close, arrow keys | Real navigation | Yes | Keep; exemplary |
| Mobile drawer | Focus trap, scrim, scroll lock, focus restore | Real navigation | Yes | Keep |
| Hero workspace | Nothing (search, segmented control, 5 tabs, 6 "Move to…" selects, close ×, "Full profile", 5 drawer tabs, "Regenerate": \~20 elements drawn as controls, all spans) | Unintentionally: "things on this page do not respond" | They will click and learn the wrong lesson | Thin it; keep the rule |
| Gap cards hover-lift (3) | Rise 3 px, shadow | "this is clickable" (false) | Yes | Remove |
| § 04 Filters / Describe | Real segmented control, crossfade of two panels | Two inputs, same tool | Yes | Keep; make the result set re-form |
| § 05 pool filter chips | Hide rows instantly | "the list is markup" | Yes | Fix labels (14 → 2 rows) and animate |
| § 06 candidate switcher | Rebuilds the explain panel per candidate, live region, aria-pressed | The reasoning is per-person | Hard: 10 px label at the bottom of the copy column, styled like the inert chips | Promote onto the panel |
| § 07 graph node hover | Reveals a relationship reading inside an aria-hidden SVG | Nothing discoverable | No | Make it always-visible text or delete |
| § 08 tuner (3 sliders) | FLIP reorder, recount, ring rewrite, aria-valuetext in tier words | "your priorities changed the answer" | Yes | Fix the fixture: the advertised move must reorder |
| § 08 what-if toggle | Changes 248 → 417 in a sidecar box | "the pool grew" (asserted by a counter, not shown by the list) | Yes | Make it act on the list |
| CTA feedback | hover-icon nudge, press scale | Real buttons | Yes | Keep |
| Footer email form | Submits a GET to `/?email=` and reloads | A control that punishes the click | Yes | Disable or intercept |
| Scroll effects | 28 reveals, 3 stagger groups, 1 layer stack, 3 parallax at 0.02, 23 count-ups | Arrival, only arrival | — | See § 5 |

**Static, interactive or immersive?** Static, with islands. It should not become immersive: scroll-hijacking and cursor puppetry are on the system's recorded rejected list with reasons that still hold (the reader loses pacing, the fixed header fights pinning, no honest reduced-motion state). What is missing is not more interaction but *payoff*: the two interactions the page has must visibly change the thing they claim to change, and the page must stop drawing controls it does not honour.

**The hero rule is right; its application is wrong.** `CLAUDE.md` § 5 rule 5 forbids real controls in the hero for two good reasons (fake agency, and a dozen focus stops before the first CTA). The current build honours it by swapping tags, so a mouse user meets twenty look-alike controls that do nothing. The fix is fewer drawn controls, not wired spans: drop the six "Move to…" selects and the close button, render the tabs as a flat label strip, reduce the search field to a placeholder line, and give the whole frame one real affordance (a single link to the full-size surface) so any click in the hero does something and adds exactly one focus stop.

**Where real interaction could live**, in order of value: the tuner, promoted to a pinned, full-width moment (§ 17 scene 6); the pool rows as buttons that open the § 06 panel for that person, giving the page continuity across its three views of job 1042; the skill-review drawer's three actions as a real control (a person deciding what the parser could not); and the JD checker at the close, the moment its endpoint exists.

**Dead weight to remove:** hover-lift on prose cards, the node-hover reading, parallax at 0.02 (about 18 px of travel, below the perception threshold, still paying for a scroll listener), and the duplicated Kafka control (a slider and a toggle for one idea).

## 5. Animation audit

The motion system is a well-governed grammar of *entrances* presented as a motion language for an intelligence product. Everything that moves says "this is arriving"; almost nothing says "this is being worked out", "this changed because you changed it", or "these two screens are one system". Sources: `docs/motion-system.md`, `assets/css/motion.css`, the reveal, sequence, ring, parallax, counter, panel and tuner modules, and timed captures of each composition entering the viewport.

**Is there a coherent language?** Yes, and it is the best-governed part of the site: one house curve (`cubic-bezier(0.16, 1, 0.3, 1)`), nothing eases in, durations scale with object size (620 ms text, 820 ms compositions), travel scales with mass (16 / 28 / 48 / 64 px), reduced motion enforced at the token layer, five product primitives each with a cap, and a lab page where every primitive must first exist. None of this should change.

**Is it meaningful?** Two sequences are: the § 06 explain-panel build, whose 1,400 ms pause on the partial card is the information, and the § 07 path draw, the one place motion depicts a mechanism (the line draws, the verdict lands, the list re-ranks). The rest is 28 reveals, 3 stagger groups and 1 layer stack, every section opening with the identical "head rises 28 px over 620 ms" beat, no transition between sections, and no motion that shows the product computing outside § 06 and § 08.

**Is it predictable, too subtle, repetitive, disconnected?** Predictable to the point of flatness: because every section head rises the same way, the three signature sections are signature by content only. Too subtle in exactly one place (parallax at 0.02, about 18 px, which the documentation itself says you must not be able to notice). Disconnected in the way that matters: the product's claim is that it reads, scores, explains and re-ranks, and the page's motion cannot depict any of those verbs.

**Defects, in severity order.**

1. **The hero does not reveal immediately; it is hidden until the module graph loads, then blurs in anyway.** An inline head script arms the hidden states at parse time; nothing un-hides the eyebrow, H1 and the whole workspace until a 13-module ES graph has loaded and the reveal module has run; and the "immediate" path still transitions because layout was forced first. Probed on localhost: at 700, 1,000, 1,500 and 2,000 ms after navigation the H1 was at opacity 0 and 12 px blur. The documentation names this exact failure as the one the rule exists to prevent. On a real network the gap grows for the visitors the page most needs to impress. (Confirmed by the first frame of every capture set.)
2. **The "static" hero runs five load-time animations,** including three synchronised count-ups of the same 87 inside a ring whose arc is already drawn at 87 %, so for 1.4 s the arc says 87 and the numeral says 0, 30, 65. Phase 5 refused count-up on the pulse tiles for being decoration; the rings got it anyway.
3. **The pipeline's "one card advances a stage" beat is dead code.** The CSS consumes `--advance` and nothing ever sets it (verified by grep: one occurrence, in the transition rule). Section 09, the only section about movement between stages, has zero product motion.
4. **The tuner reorders nothing for the move its copy suggests.** Verified: Sneha Iyer is first in every one of the 64 precomputed combinations. The P3 reorder, described in the code as "the one animation that IS the information", fires on zero rows for "make Kubernetes matter more".
5. **The pool filter hides rows instantly** with no fade or FLIP, in the one section built around a list, two sections before the same rows are FLIP-reordered because "movement is what tells the reader the ranking responded".
6. **§ 07's payoff rows pass through each other at full opacity** for about 100 ms because the rising row has no z-order and the displaced rows do not yield first.
7. **Budgets drift from the build:** five gradient washes against a documented two; parallax stacked on sequenced compositions against a one-expressive-primitive rule; the switcher's per-field crossfade is a hand-rolled inline transition the system says it does not have; the documented float allocation names a hero float that was retired.

**What a richer language needs** is not new keyframes but two new communicative rows in the system's own Rule 1 table, "this is being computed" and "the answer changed because you changed the input", applied to compositions that already exist, plus one honest fix to the load path so the hero does what the documentation promises. § 19 sets that out; § 12 A–D differ mainly in how far beyond it they go.

## 6. Visual design audit

The editorial system is real and it works. Type carries the page, colour is disciplined (indigo is the only accent; green, amber and rose appear only as states, always with the word beside the colour), and every product visual is a genuine surface with real data. This is the rare marketing site that would look wrong with a stock illustration on it. Its visual weaknesses are voids and defects, not noise, and adding decoration would not fix them.

| Dimension | What is wrong | Why it feels wrong | Principle missing | How to approach it |
| --- | --- | --- | --- | --- |
| Typography | H1 60 px, section H2s 54 px, two dark quotes 60 px, closing CTA 84 px | The page's loudest voice is the last thing on it; a hero quieter than its own footer reads as a page that peaked late | One `.h-display` per page, and it is the H1 | Let the H1 reach 72–104 px by giving it the full width (§ 15 H1); cap the CTA at or below it |
| Typography | Ledes are 30–68-word Instrument Serif paragraphs; § 10's is one sentence with seven list items | A display serif with hairlines is the least legible face on the page at paragraph length, and on a phone the hero lede is six lines before the first button | "Never a full paragraph of UI text" (`DESIGN.md` § 3); one idea per sentence | Ledes in the sans, capped at 25 words; the serif keeps the accent only |
| Typography | 9–10 px tracked mono captions in `--c-slate-soft` (2.6:1) edge every frame | Individually reasonable, collectively fog; the eye cannot find the label that matters | Contrast floor; "nothing approximate" | 11–12 px floor inside frames, `--text-muted` for any label that names a state |
| Hierarchy | The serif accent appears 17 times at display or lede size, once per viewport; ten of eleven headlines use the same "\[statement\]. *\[reversal\]*" shape | The signature becomes a metronome; the eye learns to skim to the italic | A signature is defined by scarcity | Six accents per page; two or three headlines with no accent; vary sentence form |
| Composition | Three section-head grammars on one page (rail, stacked-left, centred), with the moat section centred where centring is reserved for terminal moments | The page's most editorial device is used by half the sections | Asymmetry over symmetry; one grammar per register | The rail for every non-terminal section; centring for § 11–12 only |
| Composition | § 06 copy column dead for 395 px beside its panel; § 07 spends 1,743 px on two boxes and an arrow | Poured, not composed; the moat looks like a placeholder diagram | "Composed, not assembled"; crop rather than shrink | Sticky copy column; graph in the rail grid with cause and effect on one screen and a mono legend of the nine edge names |
| Rhythm | Two ink blocks 128 px apart in Act I; 128 px rests stacked on 80–160 px empty frame floors; the 05→06 seam meant to be tight is 220 px with a ground change | Rest is only rest when measured; the middle coasts | "One loud move per act"; "rest is a component" | One inversion in Act I; fix the frame floors; pair tight-top with tight-bottom |
| Cards and borders | § 02 is three identical white cards; § 09 is "Step 01" pills on a hairline | The two anti-patterns the system names by name, and the two most generic components on the page | "Rules, not boxes"; "three identical feature columns" rejected | Hairline-ruled lists in the rail voice, or nothing |
| Frames | Eight frames wear the same three-dot browser chrome; four have empty white floors from reserved ratios taller than their content | Chrome as texture; blank space inside a bordered card reads as content that failed to load | "A frame is a stage, not a decoration" | Keep the route line, drop the dots; set `--ratio` to the real proportion or drop the reserved minimum for composed HTML |
| Gradients and depth | Four radial washes, the CTA's at 0.40 alpha with a hard seam against the ink section above | The closing band is the one screen that resembles the generic purple-glow closer | "Two washes, and that is the budget" | Two washes at the hero's strength; depth from raised surfaces and hairlines |
| Density | The hero drawer covers three of five tracks on five rows and crops the verdict at "…two things working" | The first screen is mostly avatars and names, the "strip of names" Phase 5 set out to replace; the phrase that carries the thesis is under the fade | Density that is covered is not density; crop on a block boundary | Offset the drawer one row; end the crop on the sentence that carries "against them" |
| Placeholders | Three dashed "LOGO SLOT" boxes on the first screen | A wireframe artefact at the top of the page; the label alone is the honest mark | Placeholder demonstrates layout; it should not be mistaken for content | Keep the mono label, drop the boxes |

**What is generic:** the card row, the step pills, the browser-chrome dots, the CTA glow. **What is dated:** nothing, really; the serif-accent pairing is current. **What is empty:** the frame floors, the § 06 column, the § 07 section. **What lacks personality:** the identical section beat. **What has personality and must be kept:** the interlude, the explain panel, the philosophy section, the critical-gate row, the honesty marks set in the same mono voice as everything else.

## 7. Brand perception analysis

**What the page signals today.** A serious, literate, slightly academic company that has thought hard about hiring and refuses to oversell. A four-second visitor at 1440 gets WHAT (shortlists come with reasons) and PRODUCT (real software), but not WHO or category: nowhere on the first screen do the words platform, ATS, hiring team or talent team appear; "Hiring intelligence" is a positioning phrase, not a category. At 390 the visitor gets only WHAT, plus three empty logo slots. The page reads as a publication about software rather than as a live surface of it, and by section 08 it reads as a very tasteful feature tour.

**Personality, in eight words, in priority order:**

1. **Inspectable** (the brand's own idea, "shows its work", before any other adjective)
2. **Precise** (mono for data, tabular numerals, real values, the same 87 everywhere)
3. **Editorial** (argues in type; a considered publication, not a funnel)
4. **Candid** (names what counts against its own top pick; labels every example; says what it will not claim)
5. **Dense** (the product is shown at the density it actually has)
6. **Composed** (asymmetric, ruled, unhurried; one loud move per act)
7. **Two-sided** (the candidate reads the same score; uncommon in the category and worth being known for)
8. **Alive** (the missing one: the product should be seen reasoning, not only described)

**Should feel like:** a well-argued document you could take into a meeting and defend; a financial terminal's density with a publication's typography; a product whose interface *is* the argument; Linear's or Attio's confidence that real UI can carry a page, with Anthropic's or Stripe Press's willingness to let type carry the rest.

**Must never feel like:** generic HR software (photo of a smiling recruiter, three cards, a logo wall); a generic AI startup (dark gradient, glowing blob, "AI-powered", a typing prompt); template SaaS (centred bold-grotesk H1 with one coloured word, pill CTAs, stats strip, video thumbnail); a crypto or gaming site (neon, particles, 3D tilt); an over-engineered developer tool (terminal cosplay, mono everywhere, dark for its own sake); or, the subtle one, a site so restrained that it reads as *empty*: quiet is only a virtue when the thing you are quiet around is visible.

**The perception gap to close.** The product is more transparent, more honest and more opinionated than the site currently looks. The site tells the visitor the score explains itself roughly eight times in type and shows it happening once, in section 06, in a still. Closing the gap is not a matter of adding effects; it is a matter of letting the product's own behaviour (the refusal, the escalation, the citation, the re-rank, the agent that says "market covered") be the visible personality of the page.

## 8. Competitive / adjacent design research

The recruitment category has converged on one template with two variants, and the visual territory Transpahire already half-occupies (evidence-led product in the hero, a display-plus-serif-plus-mono type system, thin rules instead of cards, trust by governance) is unclaimed by anyone else. Coverage note: five sites were captured and analysed in depth with real screenshots (Ashby, Greenhouse, Lever, Workable, Teamtailor); Eightfold was captured and viewed directly. The second and third competitor clusters (Paradox, HireVue, Phenom, Beamery, Metaview, Juicebox, Dover, Gem, hireEZ, SeekOut, Mercor, Wellfound, Rippling, Deel) were captured but their analysis was cut short by a session limit; the captures exist in the scratch folder for the next phase. Findings below are from what was actually seen.

| Site | Positioning | Hero pattern | Product visualisation | Type | Colour | Trust device | Generic or distinct | Strength as reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [Ashby](https://www.ashbyhq.com) | "What an ATS should be"; all-in-one, AI in every layer; no mechanism claim | Centred H1 + email capture + 18-logo wall; zero product pixels in the fold | Weak: blurred, tilted UI fragments under a cursor; isometric slabs for tiers; never shows a candidate or a score | TT Norms Pro everywhere; serif only in the logomark | Near-white, one violet | Logo wall is the whole argument | Generic 2023 B2B template | 2/5 |
| [Greenhouse](https://www.greenhouse.com) | "Better signal. Human judgement. One platform."; signal over noise with governance (outcome words) | Centred serif H1 inside a photo-and-chip collage wired with connector lines, full viewport width | Miniature UI postcards; overlay chips on photos ("Listening", "High risk fraud") | Untitled Serif for every headline, Untitled Sans body | Cream, forest green, mint, mustard; deliberately non-blue | Six mainstream logos; governance links (AI principles, bias audit) in the footer | Distinct hero, standard three-card body | 4/5 |
| [Lever](https://www.lever.co) | "Hiring That Doesn't Hijack Your Week"; time saved | Centred H1 with one coloured word + two pills + stats strip (50 % / 75 % / 4×, unsourced) | The nearest thing to Transpahire's claim: an "AI Insight" card with claim, one-line justification and a "Matches:" provenance line beside a 92 fit-score gauge and skill bars, two screens down at card size | Onest, one family | Teal on Tailwind slate greys | Unattributed percentages; invented figures inside mocks ("12h saved this week") | Tailwind template line for line | 3/5, for the one card |
| [Workable](https://www.workable.com) | "The agent recruits. You manage talent."; mechanism-flavoured sub ("sources, screens and engages… your data stays yours") | Split hero, product screenshot in a rounded frame on an aurora gradient with a glowing app icon; product above the fold | Strongest and most literal: a "How well this candidate fits" checklist with Must have / Nice to have columns, per-criterion tick, cross, unknown; a 98 % badge that does not reconcile with the list | Proxima Nova, one family, 70 ch sub | Cream + forest green fighting a lilac "AI" sub-brand | "35,000+ teams" with a logo strip at 20 % opacity; stat band | Half and half | 4/5 for the product surface, 1/5 for identity |
| [Teamtailor](https://www.teamtailor.com) | "Hire for growth."; lovability | Two-word 96 px H1 over a photographed tablet in two hands; no CTA in the hero body | Photographed devices; kanban with star ratings; AI suggestion explained as three bullets at 11 px | Inter everywhere | White, one magenta, saturated photo tiles | Consumer-logo marquee, "13,000 companies" | Distinct feel, generic structure | 2/5 |
| [Eightfold](https://eightfold.ai) | "Talent intelligence, human-led"; "One billion profiles" | Split hero with a stock photo on a purple-to-magenta gradient card | Stock photography, floating avatar bubbles, gradient badge cards, an ISO/FedRAMP/bias-audit badge row | Generic humanist sans | Purple-magenta gradients throughout | Fortune 500 logos, certification badges, "1.6 billion career trajectories" | The definitive generic enterprise-AI look | 1/5 (as a warning) |

**The cluster pattern.** Rhetorically all of them sell breadth and relief, not mechanism: "all-in-one" appears in three of five heroes, AI is an adjective or a sparkle icon, and nobody explains how a candidate is ranked or shows evidence for a score in the hero. Trust is front-loaded and unexplained (a logo wall or unattributed percentages within two screens). Visually: a 64–96 px bold grotesk H1, centred, one coloured word, on white or a faint radial wash; two pill CTAs; then logos or stats; the product's first appearance as a carousel panel, a video thumbnail, a tilted fragment or a photographed device; a body built from "H2 plus three or four rounded cards" repeated; one dark band; one customer quote; one video. One typeface carries every level. Motion, where inferable, is marquees, carousels, floating badges, typewriter prompt bars and glowing icons.

**Visual whitespace in the market** (territory nobody in the cluster occupies):

1. **Evidence-led product in the hero.** No site puts a legible, full-width candidate-against-job surface above the fold with the score, its breakdown and the cited source line visible together. Lever and Workable have the pieces two screens down at card size. This is Transpahire's to own and it is already halfway there.
2. **More than one type family with a deliberate accent.** Every competitor runs a single grotesk. A page whose data is set in mono against editorial display type with a serif turn looks like no ATS.
3. **Thin-rule, asymmetric, non-card composition.** The cluster is 12–24 px rounded cards on soft shadows without exception.
4. **Motion with a communicative job.** Nothing in the cluster draws a line from a score to the line that produced it, fills a meter to a real value, or reorders a list to show a ranking change. P1, P3 and P4 used honestly are differentiating on their own.
5. **Trust by governance instead of logos.** Greenhouse hints at it in the footer. Nobody makes "what we refuse to claim, and the data we do not hold" a visible trust device near the top of the page.
6. **Real, consistent, labelled data.** Every mock in the cluster carries invented figures presented as product; Lever's "12h saved this week" and Workable's unreconciled 98 % are the tell. A composition whose every value is the same on every page, labelled as an example where it is one, is a register none of them can produce.
7. **Dark ink as a base rather than a mid-page band,** and **an India-literate visual** (Bengaluru, lakh, alias-aware locations) are both unclaimed; the second is a subject no competitor touches.

**The two lessons that transfer directly.** From Lever and Workable: a score is only credible when total, breakdown and provenance are readable in the same visual unit, and a per-criterion verdict list persuades more than any percentage. Transpahire's explain panel already has all three layers with real data; the page should make that visible at hero size instead of assuming it. From Ashby and Teamtailor, the negative lesson: restraint is only a virtue when the thing you are restrained around is visible, and a framing device (a hand, a tilt, a blur) that pushes the evidence below reading size is costing you the claim.

## 9. MCP / inspiration findings

**What was actually available.** No design-inspiration MCP server (Awwwards, Mobbin, Godly, Land-book, Lapa Ninja, Refero, SaaSFrame, Dribbble, Behance) is connected to this session; the only connected servers are the document connector this report lives in, plus general web search and fetch. Research was therefore done by driving headless Chrome at real sites and looking at the captures, which is stronger evidence than a gallery thumbnail for the things that matter here (type at size, density, what is above the fold) and weaker for motion, which a still cannot show. A session limit stopped the six inspiration agents and the two sourced trend sweeps before they returned, so the references below are the ones viewed directly, plus captures that exist in the scratch folder for the next phase (Anthropic, Cursor, ElevenLabs, Mistral, Perplexity, Linear, Vercel, Stripe, Clerk, Figma, Notion, Granola, Observable, Grafana, Superhuman, Amie, Are.na, Increment, Lusion, Rive, Cerebrium). Four captures failed in ways worth recording: OpenAI (Cloudflare challenge), The Browser Company (a loading logo only), Ramp (served a machine-readable text page to the headless agent), Read.cv (deployment paused). The 2026 Awwwards and Godly picks and the browser-support figures for CSS scroll-driven animations were not fetched and are not cited; the next phase should run that sweep first.

| Reference | What to learn | What not to copy | Transpahire element it influences |
| --- | --- | --- | --- |
| [Linear](https://linear.app) | The product is the hero and the product is real: a full-width, dense, legible interface directly under a two-line headline, with the copy short enough to let the interface argue. Section headings on the left, one-line ledes on the right, product beneath; every section a different product surface. A logo row, but under the product, not above it | The all-dark ground and the isometric line drawings for "purpose-built / powered by agents / designed for speed", which are exactly the abstract-slab illustrations the ATS cluster uses; dark plus indigo is the AI uniform | Hero (H1 concept), section rhythm (headline left, lede right, product full width), product presentation (no window chrome, panels of the page) |
| [Anthropic](https://anthropic.com) | Warm paper, a serif headline with underlined key phrases, a lede set beside it in a second column, one enormous image, then cards that are typographic (date, category, details as a mono-ish list) rather than illustrated. A company page that argues in type and reads as a publication | The absence of any product surface; for a lab that is a choice, for a SaaS it would be Ashby's mistake | Colour (warm paper, Palette 01), typography direction C, the interlude and philosophy sections, the closing "what we believe" register |
| [Eightfold](https://eightfold.ai) | Nothing to copy; everything to avoid. It is the complete catalogue: purple-magenta gradients, stock photography, floating avatars, sparkle badges, a billion-profiles headline in gradient text, a certification badge row | All of it | The "must never feel like" list in § 7; a useful side-by-side for stakeholders who ask for "more AI feel" |
| [Ashby](https://www.ashbyhq.com) | Proof that one violet on near-white can look premium with no gradient support, and that an email field can be the first CTA | The hidden product, the blurred tilted fragments, the mixed-weight sub, the sparkle emoji | Colour restraint; the low-threshold email capture; a warning for product visualisation |
| [Amie](https://amie.so) | A real app screenshot as the hero, at reading size, with the headline short; "Within 47 seconds" as a highlighted phrase in a headline is a cheap, legible emphasis device | The star-rating testimonials, the multi-language flourish, the consumer voice | Hero density; the highlighter idea in Palette 01 (a highlighted phrase as the accent for *evidence*, not for hype) |
| [Sana](https://sana.ai) | A three-word display headline at very large size over two product tiles, each tile a real device photo with a small caption and one button; the page commits to two things and shows both | "Superintelligence for work" is the outcome-claim register the site bans | Hero type scale; the two-tile "here are the two surfaces" idea for a recruiter/candidate split (§ 15 H4) |
| [Workable](https://www.workable.com) | A per-criterion checklist (must have / nice to have, tick / cross / unknown) is a legible marketing object at 1440; a bento with one large product mock and three short text cards lets the product carry the section | The aurora gradients, the glowing icon, the 98 % that does not reconcile with its own list | Product visualisation V1 (the skill rows layer); the bento shape for scene 5 |
| [Lever](https://www.lever.co) | Claim / justification / "Matches:" provenance in one 330 px card, beside a gauge and a bar list: compression of an explained score | The stats strip, the floating "12h saved" badge, the one-coloured-word headline, the pun voice | Product visualisation V1 at mobile size; P1 meter fills paired with a total |
| [Greenhouse](https://www.greenhouse.com) | A hero can fill 1440 with the type in the middle and product fragments pushed to the edges; a mechanism can be stated as a caption on a human moment; governance links as trust | Serif for every headline (wallpaper), connector lines that connect nothing meaningful | Hero composition width; the trust register near the top of the page; a P4 line should connect a score to its evidence, never a photo to a chip |

**Principles extracted, stated abstractly.**

1. *The product at reading size is the most persuasive image available, and the only one that cannot be faked.* (Linear, Amie, Workable; the ATS cluster by omission.)
2. *A page argues with tempo: short statement, long demonstration, short statement.* The sites that feel premium vary the size of their units; the ones that feel like templates repeat one unit. (Linear versus Ashby, Greenhouse, Teamtailor.)
3. *Type can carry a whole screen if it is allowed to be large and is given a second voice.* (Anthropic, Sana.)
4. *Provenance is a visual pattern: total, parts and source in one unit.* (Lever, Workable, and the product's own explain panel.)
5. *Restraint without a visible product reads as emptiness; density without hierarchy reads as noise.* The target is dense and hierarchical. (Ashby versus Linear.)
6. *Trust is a register, not a badge row.* Governance links, honest labels and refusals to claim are a visual language. (Greenhouse's footer; Transpahire's own `/trust`.)
7. *The generic AI aesthetic is now a recognisable failure mode,* not a neutral default: gradient, glow, stock photo, sparkle, adjective. Avoiding it is itself differentiation in this category. (Eightfold, Workable's lilac half.)

## 10. Design problems identified

Ranked by the sum of visual, UX and brand impact (each 1–5), then by severity. Merged from the seven lenses; the top five were re-verified by hand. No overall score is given; the ranking is the point.

| # | Problem | V | U | B | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | **The hero blurs in one to two seconds after paint,** hidden until a 13-module script graph loads, on the one screen the documentation says must never animate. On a phone the display headline resolves out of a blur | 5 | 5 | 5 | First frame of every capture set; `index.html:10`, `reveal.js:41–75`, `motion.css:48–82` |
| 2 | **The page has one idea and says it in the same shape twelve times.** Seven consecutive sections use eyebrow → two-beat H2 with serif turn → serif lede → framed product; the thesis is restated at display weight \~eight times; the serif accent lands 17 times | 4 | 3 | 5 | `home.mjs` §§ 04–10; 20 `<em>` in `index.html` |
| 3 | **The product is shown, never seen thinking.** All motion is arrival; no scene depicts reading, scoring, citing, refusing or re-ranking; the two interactions that could are hard to find (§ 06) or reorder nothing (§ 08) | 4 | 4 | 5 | Reveal inventory; `RANKINGS` (7 orders, Sneha first in 64/64) |
| 4 | **The pool composition is broken at every width:** band bar and labels drawn over the ranked list; filter chips say 14 and show 2 | 5 | 4 | 5 | `components.css:846`, `compositions.mjs:1923`; frames 1440-04, 768-05, 390-07 |
| 5 | **Mobile has no first-screen product** and then 2.4 screens of inert workspace, with the same drawer repeated in full 5,000 px later; the first non-text object on a phone is three empty logo slots | 4 | 5 | 4 | 390 frames 00–04, 10–12; hero 2,884 px at 390 |
| 6 | **The hero is quieter than its footer:** H1 60 px, closing CTA 84 px, quotes 60 px; the first screen never names the category or the audience | 4 | 3 | 4 | `sections.css:303`; computed sizes |
| 7 | **False affordances everywhere:** \~20 look-alike controls in the hero, hover-lift on prose cards, a "click a reason" promise nothing honours, an email form that reloads the page and loses the address | 2 | 5 | 4 | `index.html:355–585, 733–743, 1129, 2063`; `layout.mjs:235` |
| 8 | **Frames with empty floors and dead columns:** four frames end 80–160 px before their borders; § 06's copy stops 395 px before its panel; § 07 spends two screens on two boxes | 4 | 2 | 3 | Frames 1440-05, -06, -12, -13; reserved `--ratio` on composed HTML |
| 9 | **Rhythm collapses in Act I and on mobile:** two ink aphorisms 128 px apart; 128 px rests stacked on empty frame floors; at 390 every section is the same stack and the page is 22 screens with one CTA in the middle 19 | 3 | 3 | 3 | Frames 1440-01/02; 390 measurements |
| 10 | **The two named anti-patterns are on the page:** three identical cards (§ 02) and "Step 01" pills (§ 09), plus browser-chrome dots on eight frames and a 0.40-alpha glow on the CTA against a budget of two washes | 3 | 1 | 4 | `DESIGN.md` § 10; `sections.css:575` |
| 11 | **Tiny faint labels:** 9–10 px mono in a 2.64:1 grey edges every composition; the failing pair is documented as passing | 3 | 3 | 2 | `tokens.css:37`; contrast computed |
| 12 | **Ledes are serif paragraphs,** 30–68 words, seven list items in one; on a phone six serif lines precede the first button | 3 | 3 | 2 | `home.mjs:93, 447`; `DESIGN.md` § 3 |
| 13 | **Dead and drifting motion:** the pipeline advance never runs (`--advance` unset), parallax at 0.02 is imperceptible, the switcher's crossfade is a hand-rolled inline transition, budgets in the docs no longer match the build | 2 | 2 | 3 | `components.css:1707`; grep |
| 14 | **Tablet is a phone with desktop measures:** a 40 % empty column in every section head, a seven-column pipeline breaking words at 9 px, 300 px of reserved blank inside two frames | 4 | 2 | 2 | 768 frames 00, 04, 12, 14 |
| 15 | **Eyebrows change register mid-page** from chapter names to product pillar names exactly where the signature sections begin | 1 | 2 | 3 | `home.mjs:335, 368, 406` |

**Diagnosis in three paragraphs.**

*Visual impact.* The page does not look generic; it looks unfinished in the middle. The identity is strong enough that its defects read as defects rather than as style: a composition overlapping itself, frames with air at the bottom, a moat section that is mostly margin, a hero smaller than its CTA. Fix density and hierarchy in the middle third and the existing identity reads as premium; add decoration and it will not.

*UX impact.* The first screen is late, the product is absent from the first phone screen, and the two things a visitor can do are hard to find or do not pay off. Meanwhile the page teaches visitors, from the hero's twenty inert controls onward, that things here do not respond. A site whose argument is "you can interrogate this" cannot afford to feel unresponsive.

*Brand impact.* The product is more transparent, opinionated and alive than the site. The page asserts "the score explains itself" eight times and shows it once, as a still. The brand's own idea, transparency in layers, is never expressed as an experience. That is the gap a redesign closes, and it is a gap of behaviour, not of effects.

## 11. Design opportunities

Ranked by the size of the transformation per unit of engineering, within the site's own constraints (no dependency, no build step, nothing invented, hero never interactive).

1. **Make the first screen the product, at full width, instantly.** Headline above, workspace beneath at \~1,280 px, no blur, no count-up, one drawer slide. This is the single largest visual change available and it costs a layout, not a library. It also fixes problems 1, 5 (with a phone-specific crop) and 6 at once.
2. **Turn the argument into one continuous object.** The signature sequence (§ 24 S1): list → weights → skill rows → cited line → the candidate's view of the same number, scroll-driven, with a static fallback. It uses only existing composition parts and the site's own data, and it is the thing no competitor can build because none of them have the layers.
3. **Cut twelve sections to eight scenes with three tempos.** Fold the gap cards into the ink statement; fold the role into the pool; make adjacency a sub-beat of the argument; demote the hire to a strip; merge both-sides with philosophy. Four card grids become none, the serif accent drops from 17 to about 6, and the page gets a climax.
4. **Make the two interactions pay off.** Re-author the tuner fixture so the advertised move visibly reorders; let the what-if add rows to the list; put the switcher on the panel it switches; wire or delete the pipeline advance. Cheap, and it converts the page's promise of interrogation into a demonstration.
5. **Add the one colour the argument is missing.** A highlighter wash for cited evidence (Palette 01). It gives the page a way to *point*, it is the universal grammar for "this is the source", and no competitor uses it.
6. **Let the product's honest behaviours be the personality.** The refusal (critical gate), the escalation ("3 skills need review"), the agent that says "market covered" and shows what it declined, the pulse strip that features the number that can go down. Each is already a data object; each becomes a scene of twenty seconds. These are the beats that make the site feel AI-native without a single gradient.
7. **Fix the load path and the type floor,** which cost nothing and remove the two things that currently make the site feel slow and hazy: self-host and preload the fonts, mark in-view elements revealed before first paint, raise mono labels to 11–12 px in a colour that passes.
8. **Design mobile as a sequence, not a collapse.** A 390-specific hero crop (job header, three rows, the verdict), the drawer as a cropped sheet, a mid-page CTA to the tool pages, a two-column footer. Mobile is where the links this site depends on are opened.
9. **Build the empty slots so that real proof drops in without a layout change.** Logos, three real job descriptions for `/proof`, two screenshots, a wired JD checker: none are engineering decisions, but every one has a designed home in the blueprint (§ 27) so the day the input lands the page improves without a redesign.
10. **Add three assertions to the audit** before adding any effect: frame content height versus reserved ratio, every animated custom property is set somewhere, the H1 is at opacity 1 within 100 ms of DOMContentLoaded. This is how the lesson in `CLAUDE.md` § 1 stops repeating.

## 12. Four creative directions

Four genuinely different philosophies, not four variations. Each is described the same way (colour, type, layout, hero, interaction, motion, transitions, product presentation) and each is judged against the same constraints: no invented content, no fake controls in the hero, no build step or dependency, reduced motion honoured, and the outcome-word ban. Where a direction needs a rule amended, it says which rule and why.

### Direction A — AI Intelligence ("the engine room")

*Thesis:* the page is the inside of the system; the visitor watches reasoning happen on a dark ground.

- **Colour:** Palette 02 (§ 13). Ink ground, raised ink frames, indigo #818CF8 for the engine, mint for verified, amber for review, rose for critical. Light sections only as rests.
- **Typography:** Direction B type (§ 14): one grotesk at three weights, serif accent retained but smaller, mono promoted to a first-class voice for everything the engine says (verdicts, evidence, stop reasons).
- **Layout:** full-bleed stages, no container; compositions run edge to edge and the copy sits in a 40 ch column over them, like annotations on a screen.
- **Hero:** H1's workspace on ink, with the drawer's verdict typed in as whole lines. The `3 skills need review` pill is the only warm colour on the first screen.
- **Interaction:** the tuner (scene 6) and a real Filters / Describe toggle (V3); nothing else.
- **Motion:** the most expressive of the four: scroll-linked layer transitions, status ledgers stepping in, the meter fills, path draws on the graph. Still transform, opacity and filter only.
- **Section transitions:** continuous; the ground never changes, scenes are separated by hairlines and by the stage sliding.
- **Product presentation:** the frames lose their window chrome and become panels of the page; the product and the page share one surface.
- **Fit:** strongest on "AI-native" and "technologically advanced"; weakest on differentiation, because dark-plus-indigo-plus-mono is the uniform of every AI product in 2026 and of the two most-cited competitors (Eightfold's dark sections, Metaview). It also spends the site's best asset, the publication feel. *Rules touched:* none, but `DESIGN.md` § 1's "one loud move per act" is inverted (the light sections become the loud moves).

### Direction B — Premium Enterprise ("the brief")

*Thesis:* a considered publication that argues in type, with the real product as its evidence. This is the current site's philosophy, taken to its conclusion instead of stopping halfway.

- **Colour:** Palette 01. Warm paper, ink, indigo, the highlighter for evidence. Three ink inversions per page as today.
- **Typography:** Direction A type. Display scale raised to its ceiling, serif ledes retired to the sans, mono raised to 12–13 px, a distinct mono-data role.
- **Layout:** the 200 px mono rail returns as a real device (section numbers and running heads, like a document's margin), asymmetric splits, the workspace allowed to bleed while the copy keeps a strict measure.
- **Hero:** H1: headline full width, workspace full width beneath, first screen ends mid-list.
- **Interaction:** exactly two: the tuner, and the JD checker at the close when its endpoint exists. Everything else is scroll.
- **Motion:** quieter than A, but with the one signature (S1, scroll-driven layers) and the existing five primitives. The page moves only when the product is explaining something.
- **Section transitions:** ground alternation (paper, bone, ink) as today but with eight scenes instead of twelve, and section numbers in the rail so the visitor always knows where they are in the argument.
- **Product presentation:** frames keep a minimal chrome (the URL line) because chrome is what tells a buyer this is real software; compositions are staged as layers rather than stills.
- **Fit:** strongest on trust, enterprise credibility, editorial distinctiveness, and on honouring every existing rule; the risk is that restraint reads as safe if the signature sequence is not built. *Rules touched:* none.

### Direction C — Human + AI ("two hands")

*Thesis:* the story is a relationship between a person and an engine; every composition shows both hands.

- **Colour:** Palette 03. Cool paper; indigo for what the engine did, verdigris for what a person did; the split is the whole visual system.
- **Typography:** Direction A type, but the serif accent carries the human voice (recruiter and candidate quotes from the product's own empty states and copy: "Ask a hiring manager to add you to this role", "No feedback recorded yet") and mono carries the engine's.
- **Layout:** two-column rhythm throughout: engine left, person right, the seam as a recurring hairline. The candidate's side of the product gets equal billing for the first time.
- **Hero:** H4: two screens, one number, the 87 on the seam.
- **Interaction:** the tuner, the skill-review drawer's three actions as a real control (a person deciding what the parser could not), and the origin toggle. More interaction than B, all of it "the person overrules".
- **Motion:** conversational: the engine proposes (indigo element enters), the person responds (verdigris element replies), the outcome settles. P2 sequencing does most of the work.
- **Section transitions:** the seam persists across sections; the page reads as one long dialogue.
- **Product presentation:** always paired: drawer beside dashboard, mission console beside the recruiter's decline, review pill beside the review drawer.
- **Fit:** the most original narrative in the category and the truest to the product's principle (recommends, explains, you decide). Risks: two hues drift into decoration; the candidate side can read as consumer rather than enterprise; the seam layout is hard at 390 px. *Rules touched:* adds a second accent hue, which `DESIGN.md` § 1 ("one accent colour") forbids; it would need a deliberate amendment and a lint rule for where verdigris may appear.

### Direction D — Experimental Product Experience ("the stage")

*Thesis:* the page is one continuous object. There are no sections, only states of the workspace as the visitor scrolls.

- **Colour:** Palette 01 or 02; the direction is about structure, not hue.
- **Typography:** large display captions only; very little body copy. The argument is carried by the product and by six lines of type.
- **Layout:** a single pinned stage occupying the viewport for most of the page; copy captions enter and leave beside it. Total scroll length is set by the number of states (about ten), not by content.
- **Hero:** H1's workspace, which never leaves the screen.
- **Interaction:** scrubbing (the scroll is the interaction), plus the tuner state where the sliders become live for the duration of that state.
- **Motion:** everything is scroll-linked; there is no time-based animation except the hover states. CSS scroll-driven animations for the layers, sticky positioning for the stage.
- **Section transitions:** there are none; there are states.
- **Product presentation:** total. The product is the page.
- **Fit:** the most "never seen before" of the four and the most memorable if it works; also the most fragile. A pinned ten-state stage costs the visitor their scroll for \~8 viewports, is hard to make work at 390 px, is invisible to a screen reader unless every state is also plain DOM, and is the direction most likely to fail the site's own "motion communicates" rule by accident. *Rules touched:* `CLAUDE.md` § 5's one-P5-per-page cap and the reveal budgets would need rewriting as state budgets.

### Side by side

|  | A Engine room | B The brief | C Two hands | D The stage |
| --- | --- | --- | --- | --- |
| Differentiation in category | Low | High | Highest (narrative) | High (form) |
| Enterprise trust | Medium | High | Medium-high | Medium |
| AI-native feel | High | Medium | High | High |
| Honours existing rules | Mostly | Fully | Needs one amendment | Needs several |
| Mobile risk | Low | Low | High | Highest |
| Accessibility risk | Low | Low | Medium | High |
| Engineering within no-build constraint | Yes | Yes | Yes | Yes, with care |
| Memorable moment | Ledger sequences | S1 signature | The seam | The whole page |

The recommendation (§ 25) is B with D's central mechanism borrowed for exactly one scene and C's actor convention borrowed as a chip style rather than a hue.

## 13. Three colour system directions

All three keep indigo as the intelligence colour, because `assets/brand/brand.json` and the Stratum brand system fix it and the serif-italic-in-indigo accent is the one signature the site already owns. What differs is the ground, the role of dark, and whether a second hue is allowed to carry meaning. Contrast ratios below were computed from the hex values with the WCAG 2.x formula (script in the scratch folder); AA is 4.5:1 for text, 3:1 for large text and UI.

**Two facts about the current tokens first.** `--c-slate-soft` (#9A9AB0) on paper is **2.64:1**, which fails AA even for large text, and it is the colour of every tertiary label and the composition captions. `DESIGN.md` § 2 says every combination passes; that one does not. And `--c-indigo-glow` (#6366F1) on ink is **4.35:1**, below AA for body-size text, which is fine for the 60px serif accent and not fine for the small indigo links on dark sections. Any palette direction below fixes both.

### Palette 01 — Ink, indigo and the highlighter (recommended)

The current system, warmed and given the one colour it is missing: a highlighter. The product's signature act is citing a line of the profile; a highlighter wash is the universal visual grammar for "this is the evidence", and no competitor in the category uses it.

| Role | Value | Contrast | Use |
| --- | --- | --- | --- |
| Ground (paper) | #F7F6F2 |  | Page ground; a degree warmer than today's #FAFAFB so the page reads as paper, not as a dashboard |
| Ground (bone) | #EFEDE7 |  | Alternating sections |
| Surface raised | #FFFFFF |  | Frames, cards |
| Ink | #1A1A2E | 15.8:1 on paper | Display type, primary text, dark sections |
| Ink raised | #23233A |  | Panels on ink |
| Body | #3A3A4C | 10.3:1 | Running copy |
| Muted | #6B6B7D | 4.8:1 | Secondary copy, passes AA, replaces the failing faint for anything readable |
| Indigo (engine) | #4F46E5 | 5.8:1 | The serif accent, ticks, focus, the engine's own chips |
| Indigo on ink | #818CF8 | 6.4:1 on ink | Accent on dark; replaces #6366F1 for text-size use |
| **Highlighter** | #FFF1A8 wash, #1A1A2E text | 15:1 | Cited evidence in the explain panel; the hero's "the score cites its sources" moment; nowhere else |
| Signals | ok #146B45 · warn #8A5F1E · crit #A32C3C · none #64647A | 6.3 / 5.4 / 6.8 | Unchanged; state only |

*Psychology and brand.* Warm paper plus cold indigo is the palette of a well-typeset document with one line of marginal ink: considered, editorial, adult. The highlighter adds the one thing the page cannot currently do, which is point. *Enterprise credibility:* high, because it looks like something you could file. *AI association:* indigo carries it; nothing glows. *Uniqueness:* no recruitment competitor is warm-paper-plus-highlighter; the category is white, purple and gradient. *Dark and light:* light-first with ink sections as the loud moves; the same roles invert under `.on-ink` as they do today. *Gradient policy:* one, the existing hero wash, kept faint and static; no animated gradients.

### Palette 02 — Terminal ink (dark-first)

The page lives on ink and the product frames are cut from the same cloth, so the workspace reads as the page rather than as a picture on it. Light sections become the loud moves instead of dark ones.

| Role | Value | Contrast | Use |
| --- | --- | --- | --- |
| Ground | #0B0B1F |  | Page |
| Raised | #181830 |  | Frames, drawer, cards |
| Hairline | rgba(255,255,255,.10) |  | Rules; never boxes |
| Primary text | #ECECF4 | 16.5:1 | Display and body |
| Secondary | #B4B4C6 | 9.5:1 | Copy |
| Tertiary | #8A8AA3 | 5.8:1 | Labels, mono |
| Indigo accent | #818CF8 | 6.5:1 | Serif accent, links, the engine |
| Indigo glow | #6366F1 | 4.4:1 | Large type and fills only |
| Verified mint | #43C88A | 9.1:1 | "verified against the candidate's own words" |
| Review amber | #E0AC5B | 9.5:1 | "3 skills need review" |
| Critical rose | #F2748A | 7.1:1 | Critical tier, the gate |
| Light interlude | #ECECF4 ground, #0B0B1F text | 16.5:1 | The two editorial rests |

*Psychology and brand.* Dark-first says infrastructure, seriousness, night-shift focus; it is the register of Linear, Vercel and most AI labs. *Enterprise credibility:* good with restraint, but dark plus indigo is now the single most common AI-SaaS look, which is the risk. *AI association:* strong to the point of cliché. *Uniqueness:* low unless the typography carries it; the serif italic on ink is the only thing that would keep it from reading as a template. *Dark and light:* dark-first with light interludes; needs a full second token set and OS-level `prefers-color-scheme` handling the site does not have today. *Gradient policy:* none; depth comes from raised surfaces and hairlines. Verdict: viable, but it trades the site's most differentiating quality (it looks like a publication) for the category's most generic one.

### Palette 03 — Two hands (engine indigo, human verdigris)

A semantic palette: indigo for everything the engine did, a second hue for everything a person did. The product's whole argument is that the machine recommends and the person decides; colour-coding the actor makes that argument visible in every composition (the tuner slider a recruiter moved, the skill review a person resolved, the strategy a recruiter declined).

| Role | Value | Contrast | Use |
| --- | --- | --- | --- |
| Ground | #F4F4F6 |  | Cool paper |
| Ink | #1C1C24 | 15.4:1 | Type |
| Body | #44444F | 8.8:1 | Copy |
| Engine indigo | #4F46E5 | 5.7:1 | Scores, matches, the agent's actions, the serif accent |
| Engine wash | #E0E7FF with #4F46E5 text | 5.1:1 | Chips the engine produced |
| Human verdigris | #0F766E | 5.0:1 | Overrides, decisions, tier changes, declined strategies, the recruiter's cursor in a demo |
| Human wash | #CCFBF1 with #0F766E text | 4.9:1 | Chips a person set |
| On ink | indigo #818CF8 (6.5:1), verdigris #5EEAD4 (13.1:1) |  | Dark sections |
| Signals | unchanged |  | State only |

*Psychology and brand.* Two cool hues on grey paper reads clinical and precise; the second hue must be rationed to exactly one meaning or it becomes decoration. *Enterprise credibility:* high; it is the palette of a well-designed audit trail. *AI association:* the indigo/verdigris split is itself the AI story (machine vs person) and it is one nobody else tells. *Uniqueness:* highest of the three in meaning, lowest in immediate visual difference. *Risk:* a second hue leaks into buttons and links over time and the meaning dies; it would need a lint rule the way outcome words have one. *Gradient policy:* none.

### Where gradients are allowed, in all three

One static wash in the hero corner and one under the closing CTA, both at the strength the site uses today (barely visible), never animated, never a blob. Anything more is on the `DESIGN.md` § 10 rejected list for a reason: it is the category's uniform.

### Recommendation

Palette 01. It keeps everything that is already working (the indigo signature, the ink inversions, the state system with its rose-not-red critical tier), fixes the two contrast failures, and adds the single colour the product's argument has been missing. Palette 03's idea, colouring by actor, is worth borrowing inside Palette 01 as a *convention*, not a hue: human actions get the ink-outlined chip, engine actions get the filled indigo chip, and the word rides with the colour as the design system already requires.

## 14. Typography directions

The current four-family system is not the cause of the generic feeling; it is the strongest thing on the page. Space Grotesk for display, Manrope for UI, Instrument Serif italic for the accent and JetBrains Mono for data is a considered, unusual pairing, and the serif-in-indigo accent is a real signature. The typographic problems are in *deployment*, not selection: the display scale is capped where it should be allowed to dominate, the mono is asked to do too much at 11 px, the lede is set in the serif at paragraph length (which `DESIGN.md` § 3 itself forbids for UI text), and the same headline-plus-accent shape repeats twelve times so the signature becomes a tic. Sources: `assets/css/tokens.css` § 3, `DESIGN.md` § 3, the 1440 and 390 captures.

**Should Transpahire feel editorial, technical, futuristic, human, enterprise or premium?** Editorial and technical, in that order, with human carried by the serif and premium carried by restraint. Not futuristic: a product whose argument is that it can be audited should not look like it is from next year. The two words that should govern every type decision are *argued* and *cited*: display type argues, mono cites.

### Direction A — Keep the four families, change the scale and the roles (recommended)

| Role | Family and weight | Size (fluid) | Tracking / leading | Change from today |
| --- | --- | --- | --- | --- |
| Display H1 | Space Grotesk 500 | 48 → 104 px | −0.03 em / 0.98 | Today it is capped at 60 px in the bleed hero; the cap exists because the copy column is 38 %. A hero layout that gives the headline the full width above the product (see § 15, hero concept 1) lets the display scale reach its ceiling again. One per page |
| Section H2 | Space Grotesk 500 | 32 → 64 px | −0.025 em / 1.05 | Up from 54 px max; the section heads should be the loudest thing in each scene |
| Accent | Instrument Serif italic 400, indigo | inherits | +0.005 em | Unchanged in form; **used on at most six headlines per page**, not twelve. The accent must land on the turn of a phrase, and half the current headlines have no turn |
| Lede | Manrope 400 | 18 → 22 px | 0 / 1.45 | Moves the lede out of the serif and into the sans. A serif paragraph is the one place today's page reads "template" (the hero lede at 390 is five lines of italic-adjacent serif) |
| Body | Manrope 400/500 | 16 / 15 px | 0 / 1.55 | Unchanged |
| Mono, labels | JetBrains Mono 400 | 12 px minimum, 13 px preferred | +0.14 em, uppercase | Up from 11 px and +0.18 em; 11 px tracked mono in `--c-slate-soft` is the least legible element on the page and it carries the eyebrows |
| Mono, data | JetBrains Mono 400/500 | 13 → 15 px, tabular | 0 | Adds a data role distinct from the label role: scores, weights, percentages and evidence citations inside compositions should be set larger and untracked so numbers read as numbers, not as chrome |
| Quote | Space Grotesk 400 + serif accent | 36 → 72 px | −0.02 em / 1.05 | Up; the interlude is the page's best composition and can be louder |
| Measure |  | 56 ch body, 40 ch narrow, 68 ch wide |  | Unchanged |

Why this fits: it keeps every recognisable asset, removes the two places the system undermines itself (serif ledes, 11 px mono), and gives the display scale room to carry the page, which the brief's own table asks for ("large type carrying the page").

### Direction B — A single grotesk with a serif accent (tighter, more product)

Drop Space Grotesk; set display, UI and body all in one variable grotesk with real optical sizes (candidates: Geist, Inter Display + Inter, or Manrope alone at 700/500/400) and keep Instrument Serif for the accent and JetBrains Mono for data. Fewer families, faster load (two font files fewer), and a closer resemblance to the product's own UI, which uses a grotesk. Cost: Space Grotesk's slightly eccentric letterforms are part of what keeps the page from looking like every other Inter site; losing them moves the page toward Linear's register. Use this direction if the product screenshots that will eventually replace the compositions use Inter or Geist and the two typefaces fight.

### Direction C — Serif-led editorial (the publication move)

Invert the pairing: a text serif with real weight (candidates: Newsreader, Source Serif 4, Fraunces at low optical size, or Instrument Serif roman at display sizes only) carries headlines and ledes; the grotesk becomes the accent and the UI voice; mono stays for data. This is the Anthropic / Stripe Press register and it is the most differentiated option in the category, where nobody leads with a serif. Risks: a serif-led hero above a dense product workspace can read as two different companies, the serif must be a family with a roman (Instrument Serif has one but it is fragile at text sizes), and the change is large enough that it is a brand decision, not a site decision. Prototype it before choosing it; do not choose it on paper.

### Rules that hold in all three

- Sentence case, never title case; British spelling in prose; one accent per headline and only where the phrase turns.
- Tabular numerals everywhere two numbers sit near each other; every score, weight and percentage in mono.
- No character-by-character reveals (`DESIGN.md` § 10). A line of type may move as a line; letters never move alone.
- Fluid type with the clamp declared once in tokens; the hero H1 is allowed its own clamp because its column is different, but that clamp lives in tokens too.
- Font loading: self-host the four families as subsetted woff2 with `font-display: swap` and a preload for the display face. Today the Google Fonts stylesheet is a render-blocking cross-origin request in the head, and it is the single largest thing standing between the page and a fast first paint.

## 15. Hero concepts

Six concepts. Each is judged against the same four questions the hero must answer in four seconds (WHAT it is, WHO it is for, WHY it matters, and the PRODUCT itself) and against the two hard rules that survive any redesign: nothing in the hero composition may be an operable control (`CLAUDE.md` § 5 rule 5, enforced by `tools/check.mjs`), and nothing may be invented (no logos, no numbers, no testimonials). Copy candidates come from `docs/phase-2/09-MESSAGING.md` § 3 and § 8; every headline keeps one serif accent on the phrase that turns.

### H1 — The workspace is the page (recommended)

- **Headline:** Every shortlist *explains itself.* (or the sanctioned "Scores that explain themselves.")
- **Support:** One line, sans, not serif: *Every candidate scored against the role out of 100, and every point traced to the line of the profile it came from.*
- **CTA:** Book a demo (primary) · See the working (secondary, to `/product/matching`). Below them, nothing: the logo slots go, because a labelled empty slot is still an empty slot at the top of the page. Return them when logos exist.
- **Visual concept:** The headline runs the full container width above the product, at the top of the display scale (up to 104 px), and the real job workspace runs full-bleed beneath it, cut by the viewport's bottom edge so the first screen ends mid-list. The product is not a picture beside the copy; it is the ground the copy sits on.
- **Product visualisation:** the existing `jobWorkspace()` (job header with the amber review pill, pulse strip, five tabs, toolbar, ranked list with the gate row, drawer on Match) unchanged in content, roughly 1,280 px wide at 1440 instead of 800.
- **Animation:** one entrance, the existing P5 drawer reveal at 240 ms. Then, on scroll, the workspace becomes the stage for scene 2 (§ 17): it does not leave; it opens.
- **Scroll interaction:** the hero is the first frame of the signature sequence. No parallax, no float.
- **Background:** paper, the existing faint indigo wash in the top-left corner at its current strength. No gradient beyond it.
- **Mobile:** headline at 44–48 px, support line, one primary CTA, then the workspace at 100 vw with the drawer stacked beneath the list (as built today, which works). The first screen at 390 shows the headline and the job header; the ranked list arrives on the first swipe.

Answers WHAT (a scored shortlist), WHO (a recruiter's requisition), WHY (it explains itself) and PRODUCT in one screen, and it needs no new composition.

### H2 — Eighty-seven, and the hundred

- **Headline:** Eighty-seven out of a hundred. *Here's the hundred.*
- **Support:** *Skill coverage 65 %, similarity 25 %, experience 7 %, location 3 %. Then every skill, and the line it came from.*
- **CTA:** as H1.
- **Visual concept:** a single score ring at display size on the left (the 87, Sneha Iyer, Strong), and on the right the four weighted bars and the first three skill rows, drawn as an exploded diagram with hairline leaders from the ring to each part. The product appears as its argument, not as its chrome.
- **Product visualisation:** `scoreRing()`, `scoreModel()`, and the strong/partial rows from `explainPanel()`, rearranged as one diagram.
- **Animation:** the ring fills (P1), then the four bars fill in weight order (P1 with stagger), then the rows step in (P2). About 1.6 s total, once, on load.
- **Scroll:** on scroll the diagram collapses back into the drawer of the real workspace, which is scene 2's first state, so the page moves from argument to product.
- **Background:** paper with a single hairline grid behind the diagram, the graph-paper texture the site already uses for placeholders, at 3 % opacity.
- **Mobile:** ring above, bars beneath, rows as a list; the leaders are dropped.

Strongest on WHY and on memorability; weaker on PRODUCT, because chrome is what tells a buyer it is real software. Pair it with H1's workspace one screen later.

### H3 — The refusal

- **Headline:** It will tell you *what's wrong with its own top pick.*
- **Support:** *Strong on payments depth. No direct Kubernetes, and a salary expectation above the band. The score shows both.*
- **Visual concept:** the drawer's two-sentence verdict, set large, with the two counter-arguments in the highlighter wash. Beneath it, the gate row: Aditya Nair, not scored, missing critical: Distributed Systems.
- **Animation:** the verdict types in as whole lines, not characters; the rose rule draws under the gate row (P4).
- **Mobile:** works nearly unchanged; it is mostly type.

The most distinctive voice in the category (no competitor leads with what their AI got wrong), and the riskiest: a buyer skimming the fold could read "wrong" as a product admitting failure. Better as scene 4 than as the first screen.

### H4 — Two screens, one number

- **Headline:** The person you passed on *can see why.*
- **Support:** *The recruiter's 87 and the candidate's 87 are the same number, with the same breakdown.*
- **Visual concept:** a split hero. Left, the recruiter's drawer; right, the candidate's dashboard card; the score ring sits on the seam and belongs to both. One product, two audiences, one screen.
- **Animation:** the ring draws once; a hairline connects the two "87" numerals (P4).
- **Mobile:** stacked, recruiter first, with the ring repeating.

The truest thing the site can say and the one structurally impossible for a single-sided tool to copy. As a first screen it answers WHO ambiguously (recruiter or candidate?), so it is the right closing turn (scene 7) rather than the opening.

### H5 — The agent that says when it is done

- **Headline:** It keeps watching. *And it tells you when the market is covered.*
- **Support:** *Always-On Sourcing works the brief, never repeats a search, shows you what it declined, and stops when there is nobody left to find.*
- **Visual concept:** the mission console as a status ledger: Watching → Strategy proposed → Declined by recruiter → Market covered, with the estimated-impact line labelled an estimate.
- **Animation:** rows step in (P2); the status chip changes word, not colour.
- **Mobile:** a vertical ledger; it is already a list.

The most "AI-native" concept and the one that best answers a 2026 buyer's question (what does the agent actually do?). But sourcing is not the product's centre of gravity, and the site's own strategy documents put explainable matching first. Right for `/product/sourcing`'s hero and for scene 7's second half.

### H6 — Bring a role

- **Headline:** Bring a role *you're struggling to fill.*
- **Support:** *Paste the job description. See its skill tiers, and the language that narrows the pool, before you talk to anyone.*
- **Visual concept:** the JD checker as the hero: a real textarea and a real button, with the result panel (four tiers, the six flagged terms) shown beneath.
- **Interaction:** genuinely interactive, the one hero concept that is. It does not violate the hero rule's intent (fake controls, dead focus stops) because the control is real, but it does violate the rule's letter and its spirit ("the hero must not ask for work before it has earned any").
- **Blocked:** on the public-endpoint decision (`docs/phase-5.md` § 9). Until then it cannot be a hero.

Keep it as the page's last scene and as the hero of `/check/job-description/`, where asking for work is the point.

### Recommendation

H1 as the first screen, feeding directly into scene 2, with H2's exploded diagram as scene 2's second state, H3 as scene 4, H4 as scene 7 and H6 as the close. The six concepts are not alternatives so much as beats of one sequence; the choice that matters is which one a visitor sees first, and the answer is the real workspace at real width, because it is the only concept that proves the product exists.

## 16. Product visualisation concepts

The product becomes tangible when the page stops showing *pictures of screens* and starts showing *the product's reasoning happening*. Today every composition is a still: correct, dense, well-drawn, and inert. The five concepts below are ordered by how directly they express the one-sentence product ("the score shows its work"), and every element in them exists in the shipped product (`docs/phase-4.md` § 1, `docs/phase-5.md` § 2). Nothing here needs a value that is not already in `assets/data/product-demo.js`.

### V1 — The score, taken apart (the signature; see § 24)

One object, five states, driven by scroll position rather than clicks. State 1: the job workspace as it is today, ranked list, Sneha Iyer at 87. State 2: the list recedes; the 87 ring grows to display size and splits into its four weighted bars (65 / 25 / 7 / 3) with the ±10 % salary band drawn as a bracket, not a fifth bar. State 3: the skill-coverage bar opens into its rows: Python exact, PostgreSQL exact, Distributed Systems verified, Kubernetes → container orchestration *transferable* at 78 % confidence, Kafka not found. State 4: one row (Kubernetes) opens into its evidence: the quoted line from the profile, in the highlighter wash, with the section label "Experience" and the ✓ verified mark. State 5: the same 87 re-composes on a different surface, the candidate's own dashboard, with the caption "the same score the recruiter sees". Five states, one continuous object, and the visitor has read the whole argument without a paragraph. This is the Stratum brand idea (transparency in layers) as an interaction.

### V2 — The critical gate as a moment, not a card

The most surprising thing the engine does is refuse to score somebody and say why. Today it is a dashed card under the pool list. As a scene: the ranked list is scrolling in; one row (Aditya Nair) does not get a ring. Instead a rose rule draws across the row (P4 path draw, already in the system) and the words "Missing critical: Distributed Systems" set in mono. Then the sentence: *Which requirement dropped them is recorded.* The absence of a number is the visual.

### V3 — Two ways to ask, one answer

The requisition composition currently has a Filters / Describe toggle that is inert. Made real (a real segmented control, outside the hero, so it is allowed): the visitor flips between structured filters (Python, 5–8 yrs, Bengaluru, Hybrid, Open to work) and a sentence ("a senior backend engineer with payments depth who can start within a month"), and the same five chips light up underneath either input, then the same ranked six names appear. The point is not the search; it is that both inputs resolve to the same structured requirement. No typing simulation; a crossfade between two authored states.

### V4 — The honest agent

The Always-On Sourcing console is the most defensible capability in the product and it is on `/product/sourcing`, not the homepage. Its most quotable behaviours are all states, so they animate as a status strip rather than as a cartoon of an agent: Watching → a strategy proposed → *declined by recruiter* stays visible in the history → Market covered → "relaxing experience by 1 year would add an estimated 6 candidates" (labelled an estimate) → a panel headed "How often we interrupt you" showing dismissal rate. An agent that shows its refusals and measures its own interruptions is a scene no competitor can draw, because none of them built it.

### V5 — The parser escalates

The amber "3 skills need review" pill in the hero is the product's most on-brand two seconds and today it is a static chip. As a micro-scene inside the workspace: the pill is present; on the scene's beat the review drawer slides in (P5, the one drawer reveal the page is allowed) showing one unmapped skill with its three actions: use the suggested mapping, keep as new, discard. Then it slides away and the pill reads "2 skills need review". One decrement is the whole story: a person decided, and the machine waited.

### V6 — The pulse strip's argument

Four tiles: 47 applicants, 12 in pipeline (featured), 3 interviewing, 1 offer out. The product's own comment explains why the second tile is featured: applicants only ever goes up. A tiny, honest data animation: the applicants tile counts 47 → 200 while in-pipeline stays at 12, and the featured outline stays on the 12. The caption: *the one we make big is the one that can go down.* This is the only place a count-up earns its place, because the count-up *is* the argument.

### What not to build

- A typed natural-language query animating character by character into results. It is the category's stock demo (Juicebox, hireEZ, SeekOut all do a version) and it depicts a chat surface the product does not lead with.
- A network graph of glowing nodes for "skill intelligence". The skill graph has nine edge types and a second graph over titles; drawing it as a constellation invents edges. Keep the two-node worked example (Kubernetes ← Docker) and let it draw itself.
- Any funnel or analytics chart with a number that is not labelled an example.
- Any depiction of the Chrome extension, a calendar, a message thread, or an integration.

## 17. Scroll storytelling concepts

The current page is twelve sections with the same energy: eyebrow, headline with accent, a frame. It is an argument laid out as a magazine spread, and it reads well, but at 13,700 px on desktop and 19,200 px on a phone it is a long walk through rooms of equal size. The redesign should be **eight scenes, three of them pinned**, so the page has tempo: fast where it states, slow where it demonstrates.

| Scene | Beat | What the visitor sees | Tempo |
| --- | --- | --- | --- |
| 1 | The claim | Headline over the real workspace at full width; the ranked list is present on load with the 87 visible | Static, immediate |
| 2 | The score, taken apart | **Pinned.** V1 runs across roughly 2.5 viewports of scroll: list → four weights → skill rows → one cited line → the same 87 on the candidate's screen | Slow, scroll-linked |
| 3 | The problem, stated after the proof | The ink statement ("A score you cannot question is an opinion with a number on it") lands harder once the visitor has just watched a score be questioned. One line of type, no card grid | Fast, one screen |
| 4 | It reads the role first, and it refuses on the record | Requisition tiers, then V2's gate moment | Medium |
| 5 | Skills, not words | The two-node graph draws itself (P4); the row below re-scores from missing to partial (P3) | Medium |
| 6 | You decide what counts | **Pinned, and interactive.** The tuner is the one control a visitor may operate; the list re-ranks beside it. This is where interaction belongs, because here it teaches | Slow, interactive |
| 7 | The other side of the same number | Half the width is the recruiter's drawer, half is the candidate's dashboard; the two 87s are drawn as one element crossing the seam. Below it, the honest agent (V4) as a compact strip | Medium |
| 8 | Bring a role | The closing CTA, and directly under it the JD checker as a real form (when the endpoint exists) so "bring a role" is an action, not a request | Static |

**Why three pinned scenes and not more.** A pinned sequence costs the visitor control of their scroll; every pin has to pay for itself with something the visitor could not have understood from a still. Scenes 2 and 6 pass that test. Scene 7 is borderline and could be a plain reveal if the prototype shows fatigue.

**Mechanism.** CSS scroll-driven animations (`animation-timeline: view()` and `scroll()`) can run scenes 2 and 7 with no JavaScript and no library, falling back to the finished state where unsupported; the pin itself is `position: sticky` on the scene's stage. This keeps the no-dependency, no-build architecture in `CLAUDE.md` § 3 intact. Reduced motion collapses each scene to its final state, which is exactly the still the page shows today.

**What the scene structure removes.** The three-card "gap" grid, the four-step "hire" grid, the separate "both sides" and "philosophy" sections (folded into scene 7 and the closing), and one of the two ink interludes. Twelve sections become eight scenes; four card grids become none; the serif accent appears six times instead of twelve.

## 18. Interaction system

The proposed inventory for the redesigned page. Two rules govern it: every interaction must change the thing it claims to change, and nothing is drawn as a control unless it is one. The interaction budget rises from two to four real controls (the tuner, the pool rows, the skill-review actions, the JD checker), which is a deliberate reallocation of the documented budget in `docs/motion-system.md` and must be recorded there. The brief's inventory rows for testimonials, statistics and pricing are included so the decision is explicit: they have no interaction because they have no content the site may publish.

| Element | Interaction | Trigger | Animation | Purpose |
| --- | --- | --- | --- | --- |
| Header | Translucent substrate on scroll; menus are disclosures with the existing keyboard contract | Scroll past 8 px; click or Enter | 180 ms opacity; menu panel 320 ms rise | Orientation; unchanged |
| Header CTA | "Book a demo" persistent; on the phone, after scene 2 the label may read "Bring a role" | Scroll position | Crossfade of the label only, 320 ms | One ask, always available |
| Hero headline | None | — | None; present at first paint | Instant legibility |
| Hero workspace | None inside; the whole frame is one link to the full-size surface | Click anywhere on the frame | Press scale 0.99 | One honest affordance, one focus stop |
| Hero drawer | One-shot slide (P5) | Load | 320 ms translate + fade after 240 ms | "A row is selected and the view opens into it" |
| Scene 2, the score taken apart | Scroll-driven layers (P6 scroll mode) | Scroll through a 2.5-viewport pinned stage | Opacity and transform bound to scroll progress; morphs ring → bars → rows → evidence → candidate view | The signature: transparency in layers |
| Rail section numbers | Fill as the scene progresses | Scroll | P1-style fill bound to scroll | Progress cue so a pin never feels like a trap |
| Ink statement | None | — | Hard cut, no reveal | Rest; a hard edit reads as intent |
| Requisition Filters / Describe | Real segmented control | Click, arrow keys | Crossfade of inputs, then the five chips re-light and the same six rows re-form (P3) | Two ways to ask, one answer |
| Critical gate row | None | Enters viewport | Rose rule draws (P4), then the mono reason | The refusal, on the record |
| Pool rows | Real buttons; selecting a row opens that person's explain panel in scene 5's stage | Click, Enter | Drawer slide (P5 rules allow one; this replaces the hero's if the hero frame becomes a link) or a 320 ms panel crossfade | Continuity across the page's views of job 1042 |
| Pool filter chips | Real; labels state what they do to this list | Click | Removed rows fade over 320 ms, survivors FLIP (P3) | "Your criteria changed the answer" |
| Skill graph | None; the edge draws itself | Enters viewport | P4 draw, verdict, list re-rank (a true P3 with z-order) | The mechanism, once |
| Tuner sliders | Real range inputs, 44 px hit area, tier words in `aria-valuetext` | Drag, arrow keys | FLIP reorder 320 ms; scores recount 520 ms; the advertised move visibly reorders | "You decide what counts" |
| What-if toggle | Real; acts on the list | Click | One or two rows appear marked "now qualifies", count recounts | "See who appears before you change the job" |
| Skill review pill | Real button opening the three-action sheet | Click | P5-style sheet, 320 ms | "The parser escalates, a person decides" |
| Skill review actions | Three real buttons; choosing one decrements the pill | Click | Sheet closes; pill text swaps 320 ms | The decision made visible |
| Candidate view seam | None | Scroll | The shared 87 draws once across the seam (P4) | "The same number, both sides" |
| Agent ledger | None | Enters viewport | Rows step in (P2); status chip changes word | "It says when it is done" |
| Pulse strip | None | Enters viewport once | Applicants counts 47 → 200 while In pipeline stays 12 (the one count-up on the page) | "The one we make big is the one that can go down" |
| Closing CTA | Real buttons | Click | Press | The ask |
| JD checker | Real textarea and button, wired the day the endpoint exists; until then disabled with the honest note | Submit | Result panel rises (P2) | "Bring a role": the low-threshold conversion |
| Email capture | Real; intercepts submit until wired | Submit | Focus moves to the note | Never punish the click |
| Footer | Two-column links at ≥ 360 px | — | None | Reachability |
| Testimonials | None exist; no slot is drawn | — | — | Nothing may be invented |
| Statistics | None exist outside compositions; every composition figure carries its example label | — | — | Nothing may be invented |
| Pricing | Not on the homepage; `/pricing/` states the shape and no number | — | — | Nothing may be invented |
| Cursor | Native, always | — | — | No cursor effects, no magnetic buttons; both fail Rule 1 |

**Removed from the current page:** hover-lift on prose, the node-hover reading, parallax, the six "Move to…" selects and close button in the hero, the hero's three count-ups, the duplicated Kafka control, the "Step 01" pills, the dead pipeline advance (wired or deleted).

## 19. Motion system

The existing system (`docs/motion-system.md`, `assets/css/motion.css`) is better than most: one house curve, durations that scale with object size, reduced motion enforced at the token layer, five product primitives each with a cap, and a lab page. What it lacks is a layer above the primitives: a *narrative* layer that lets the product explain itself over time, and a scroll-linked mode. The proposal below keeps every existing token and adds two things: a sixth primitive and a scroll-driven mode for two of the existing ones.

### Timing tiers

| Tier | Duration | Existing token | Used for |
| --- | --- | --- | --- |
| Instant | 120 ms | `--dur-instant` | Colour and opacity on small controls |
| Fast | 180 ms | `--dur-fast` | Hover lift, icon nudge, chip state |
| Standard | 320 ms | `--dur-medium` | Tab crossfade, drawer, menu, list reorder step |
| Slow | 620 ms | `--dur-slow` | Reveal of text and cards |
| Cinematic | 820–1,400 ms | `--dur-slower`, new `--dur-scene` (1,400 ms) | A composition entering; one beat of a staged sequence |
| Scroll-linked | n/a | new `--scene-length` (in viewport heights, 1.5–2.5) | Pinned scenes; time is the scroll |

### Easing

Keep `--ease-entrance: cubic-bezier(0.16, 1, 0.3, 1)` as the house curve for anything entering. Keep `--ease-standard` for state changes and `--ease-exit` for anything leaving (things leave faster than they arrive). Add nothing. Scroll-linked motion uses a *linear* timing function by definition, because the scroll is the clock; the perceived easing comes from the keyframe spacing, not the curve.

### Movement vocabulary

| Move | Allowed on | Never on |
| --- | --- | --- |
| Fade | Everything | — |
| Rise (translate + fade, 16–64 px) | Text, cards, compositions | Body copy inside a composition |
| Scale (0.96 → 1) | Compositions, the ink statement | Text |
| Blur (4 px → 0, with fade) | Three per page: H1, interlude, closing line | Anything else |
| Morph (one element becoming another: ring → bar, drawer → dashboard) | The signature sequence only | Anything decorative |
| Path draw (`stroke-dashoffset`) | Six paths per page, the graph and the gate rule | Icons, decoration |
| Parallax | Product frames, coarse-pointer off | Text, backgrounds |
| Stagger (50 / 80 / 120 ms) | Grouped siblings | More than eight siblings |

No bounce, no rotation, no idle drift on text, no letter-by-letter, no cursor-following, no magnetic buttons. Each of those is a thing the page would be doing for its own sake.

### The sixth primitive: P6, staged layers

A composition declares its layers (`data-layer="1..5"`). Each layer is a real DOM state; the primitive reveals them in order. In *time mode* the layers step on `--dur-scene` beats (a composition of P2 with longer beats and a morph between layers). In *scroll mode* the stage is `position: sticky`, the scene has a scroll length, and each layer's opacity and transform are bound to `animation-timeline: view()` ranges. Cap: **one scroll-mode P6 per page** (the signature), **two time-mode P6 per page**. Reduced motion: all layers rendered in their final state, stacked in reading order. Documented on `motion-lab.html` first, as the rules require.

### Scroll behaviour

- **Entering the viewport:** as today, reveal once at 15 % visibility; nothing re-hides on exit.
- **Leaving the viewport:** nothing. Exit animations on scroll are the fastest way to make a page feel nervous.
- **Scrolling:** only the pinned scenes respond continuously; everything else is fire-once.
- **Pinned sections:** at most three per page, each 1.5–2.5 viewports long, each with a visible progress cue (the rail's section number filling) so the visitor knows the pin will release.
- **Header:** the existing scrolled state (translucent substrate) stays; add nothing.

### Reduced motion

Unchanged in principle, extended in scope: `--motion: 0` collapses durations, travel, stagger, lift and nudge to zero as today, and additionally sets every P6 layer to its final state and unpins every scene (the sticky stage becomes static flow). Opacity crossfades survive at 1 ms, because a hard cut is more disorienting than a one-frame fade. Verified on the lab page with the OS toggle, per rule 4.

### Hierarchy

Micro (hover, press, icon nudge) → Component (tab crossfade, drawer, list reorder, meter fill) → Section (reveals, stagger, P6 time mode) → Page (the one scroll-mode P6, the three pins). Each level may be louder than the one below only when it is a product visualisation. Text never moves more than a line's worth.

## 20. Section-by-section proposed architecture

Eight scenes replace twelve sections. The spine the current page gets right is kept (hero → the argument → adjacency → control → both sides → the qualifying CTA); what changes is that the argument becomes one object, the problem is stated after the proof rather than before it, and the restatements are cut. Ground: paper · paper · ink · bone · paper · bone · paper · ink+indigo. Three loud moves: the ink statement (3), the ink seam of scene 7's second half, and the closing band. Every scene names its user question, because a scene without one is a section.

### Scene 1 — The claim

- **Purpose / question:** What is it, and is it real?
- **Visual:** headline full width at the top of the display scale; the job workspace full width beneath, ending mid-list at the fold. Eyebrow does the category work: "Hiring platform · for talent teams".
- **Content:** "Every shortlist *explains itself.*"; one sans sentence; two CTAs. No logo slots.
- **Interaction:** the frame is one link. **Animation:** none but the drawer slide. **Transition:** the workspace stays; scene 2 opens it. **CTA:** Book a demo · See the working.
- **Mobile:** headline, sentence, one CTA, then a phone-specific crop: job header, the pulse strip 2×2, three rows, the drawer as a cropped sheet ending on the verdict.

### Scene 2 — The score, taken apart (signature, pinned)

- **Question:** What does "explains itself" mean?
- **Visual:** the five layers of § 16 V1 on a sticky stage, \~2.5 viewports; a rail number fills as it progresses. Captions beside the stage, one line each: "Four weights, published." · "Every skill, matched." · "Every match, cited." · "The same number, on her screen."
- **Interaction:** none. **Animation:** P6 scroll mode; static fallback is today's argument panel. **Transition:** the last layer (the candidate view) fades to the ink statement. **CTA:** none.
- **Mobile:** not pinned; the five layers stack as five short frames with the captions above each, each a real DOM state.

### Scene 3 — The problem, after the proof

- **Question:** Why does this matter?
- **Visual:** ink, one line of type: "A score you cannot question is *an opinion with a number on it.*" Nothing else.
- **Animation:** hard cut in, no reveal. **Transition:** to bone. **CTA:** none.
- **Mobile:** unchanged; it is type.

### Scene 4 — It reads the role first, and it refuses on the record

- **Question:** Where does it start, and what does it leave out?
- **Visual:** rail head; left, the requisition's four tiers with the real Filters / Describe control; right, the ranked pool with the band bar *below* the list as its footer, then the gate row with the rose rule.
- **Content:** "Nobody is dropped for a word they didn't type. *Some are dropped for a requirement they don't meet.*" One lede of ≤ 25 words.
- **Interaction:** Filters / Describe; pool rows as buttons; filter chips that tell the truth. **Animation:** P3 on filter and mode switch; P4 on the gate. **Transition:** to paper. **CTA:** none.
- **Mobile:** tiers as a compact list, pool rows in a three-track phone layout (avatar and name, stage, ring), no sideways scroll.

### Scene 5 — Skills, not words

- **Question:** How does it know?
- **Visual:** in the rail grid, not centred: the two-node edge draws on the left; on the right the row that goes from missing to partial, and beneath it a one-line mono legend of the nine relationship names and the five over job titles. One viewport.
- **Content:** "Your filter said no. *The skills said otherwise.*"
- **Animation:** P4 draw, verdict, a true P3 re-rank with z-order. **Transition:** to bone. **CTA:** none.
- **Mobile:** vertical edge (already the better layout), legend as two wrapped lines.

### Scene 6 — You decide what counts (pinned, interactive)

- **Question:** Am I still in charge?
- **Visual:** the tuner full width and pinned for 1.5 viewports; three sliders left, the list right, the what-if beneath the sliders acting on the list. The fixture re-authored so "make Kubernetes matter more" moves a name.
- **Interaction:** the page's primary control. **Animation:** P3 reorder, recount; the pin releases when the visitor scrolls past. **Transition:** to paper. **CTA:** an inline link: "Run your own job description through it" → the JD checker (mobile's mid-page action).
- **Mobile:** list first, a single sticky slider bar under the header while the list is in view; all three sliders available behind "show all three".

### Scene 7 — The other side of the same number, and the agent that says when it is done

- **Question:** Can I trust it, and what do the people I reject see?
- **Visual, first half:** a split with a hairline seam; recruiter drawer left, candidate dashboard right, the 87 drawn once across the seam. **Second half, on ink:** the mission ledger (Watching → proposed → declined by recruiter → Market covered → the labelled estimate) and, beside it, the four philosophy beats in type with "Structural fairness" named as a mechanism, not "Fairness" as a value.
- **Content:** "The person you passed on *can see why.*"; "Transparency that only runs one way *is just a dashboard.*"
- **Animation:** P4 across the seam; P2 on the ledger. **Transition:** ink continues into the closing band. **CTA:** link to `/for-candidates/`.
- **Mobile:** recruiter first, then the candidate view (already the best phone composition on the site), then the ledger as a vertical list.

### Scene 8 — Bring a role

- **Question:** What do I do next?
- **Visual:** the closing band on indigo, one wash at the hero's strength; beneath it the JD checker as a real form when its endpoint exists (until then, the honest note and a link to `/check/job-description/`).
- **Content:** "Bring a role *you're struggling to fill.*"; "Thirty minutes. We run one of your open roles through the engine and you read the reasoning yourself."
- **Interaction:** the CTAs; the form. **Animation:** press only. **CTA:** Book a demo · See the working.
- **Mobile:** block-width buttons, primary first; the footer in two columns with the email capture above the link groups.

**What is deliberately not on the page:** logos until they exist (the mono label alone marks the slot), any statistic, any testimonial, pricing, a comparison table, the Chrome extension, a calendar, a message thread, an integration, a second ink interlude, a card grid.

## 21. Mobile experience

Today's mobile page is a stacked desktop that mostly behaves; the redesign treats 390 as a width input the way Phase 5 treated 1440. The one-screen acceptance test that exists for 1440×900 and 1280×800 gets a 390×844 sibling: headline, one sentence, one CTA and the top of the product (job header and at least two ranked rows) visible without scrolling. Where a composition was phone-shaped to begin with (candidate view, skill graph, critical gate, philosophy beats, closing CTA) mobile is already better than desktop, and those stay as they are.

### Mobile (≤ 700 px)

- **Hero:** H1 at 44–48 px, one sans sentence, primary CTA block-width, then a phone-specific composition: job header, pulse strip 2×2, three ranked rows in a three-track layout (avatar and name · stage · ring) that fits 366 px with no sideways scroll, then the drawer as a cropped sheet (≈ 420 px) ending on the two-sentence verdict with the existing fade. No logo label on the phone until logos exist. Hero height target: under two viewports, down from 3.4.
- **Scene 2:** not pinned. Five short stacked frames, each a real DOM state with its caption above it; the visitor swipes through the layers instead of scrubbing them.
- **Touch:** every control 44 px high; the range input gets a 44 px hit area and a 24 px thumb; the two inline text links become block-width secondary pills.
- **Vertical storytelling:** each scene changes shape on the phone so the reader can tell where they are: the ink statement is a full-bleed band; the pool sits on a sunken full-bleed ground without frame chrome; scene 5 is the vertical edge; scene 6 is list-first with a sticky single slider under the header; scene 7 stacks recruiter, candidate, ledger. Section numbers in the rail voice as large mono figures so the reader sees "04 of 08".
- **Animation reduction:** no scroll-linked motion below 700 px; P2 beats halved in count; count-ups off except the pulse strip's one; reveals fire on pixel visibility (rootMargin) rather than a 10 % threshold so a tall frame's top edge is never invisible while in view.
- **CTA placement:** header pill always; one mid-page action after scene 6 ("Run your own job description through it"); the closing band; the tools listed in the first group of the nav drawer, not only in the footer.
- **Typography:** ledes in the sans at 17–18 px; mono labels floored at 11 px; the serif only on the accent phrase.
- **Length target:** under 14,000 px at 390 (from 19,200), with six framed compositions instead of eight.

### Tablet (700–900 px)

Tablet gets its own layout instead of the phone stack at desktop measures: the rail-headed section head returns with a 160 px rail; ledes run to 60 ch; the pipeline board stacks at ≤ 900 px (not 700) so no 9 px label breaks mid-word; frames drop the reserved aspect ratio when single-column so no frame ships 300 px of blank; scene 2 pins if the viewport is at least 1,000 px tall, otherwise stacks; scene 7's split stays side by side at 768 because the two compositions are narrow.

### Desktop (900–1,440 px)

The layouts in § 20. The hero workspace runs the full container (1,280 px) rather than bleeding, because at full container width nothing needs to be cut off to say "there is more"; the drawer offset moves one row down so two scored rows sit clear of it and the verdict ends on the sentence that carries "against them".

### Large desktop (≥ 1,600 px)

The container stays at 1,280 px and the type stays at the top of its clamps; the pinned stage in scene 2 caps its height at 900 px so the layers do not become billboards; the extra width becomes margin, never a wider composition, because the workspace is designed for a width and that width is 1,280.

## 22. Accessibility

The site's accessibility floor is real and must survive the redesign untouched: exactly one `<h1>`, fourteen `<h2>`, eleven `<h3>` with no skipped level; a skip link; `:focus-visible` rings on everything, verified by the project's own audit pressing Tab through the first forty stops with zero missing rings; disclosure menus and a focus-trapped drawer with a complete keyboard contract; `aria-valuetext` on sliders in the product's tier words; count-ups that keep the true value in the accessibility tree; a live region that announces a candidate switch once; reduced motion enforced at the token layer and verified with the OS toggle; every composition readable with JavaScript disabled. `node tools/check.mjs` and `node tools/audit.mjs` both pass on the current build; every finding in this report is one those tools cannot see, which is why the redesign adds assertions rather than removing any.

| Area | Today | Redesign |
| --- | --- | --- |
| Contrast | Body 13.5:1, muted 5.5:1, indigo accent 6.0:1: fine. **`--c-slate-soft` on paper is 2.64:1** and carries every tertiary label and caption; `--c-indigo-glow` on ink is 4.35:1 and carries small links on dark sections | Retire `--c-slate-soft` for any text that names a state; use `--text-muted` (4.8–5.5:1). Use #818CF8 (6.4:1) for text-size indigo on ink; keep #6366F1 for large type and fills only. Palette 01 fixes both |
| Type size | 9–10 px mono inside compositions; 18 px hairline serif for ledes on phones | Mono floor 11 px (12 px preferred); ledes in the sans; the serif only on the accent |
| Focus | Rings everywhere; ten tab stops before the hero CTA, none inside the workspace | Unchanged; the hero frame becomes exactly one link (one stop); the four new real controls (pool rows, skill-review actions, JD checker, the sticky mobile slider) all native elements with visible rings |
| Keyboard | Complete for nav, switcher, tuner, filters | Scene 2's pinned stage must be fully traversable: every layer is real DOM in reading order; the pin is `position: sticky`, so keyboard scrolling and find-in-page still work |
| Motion sensitivity | Token-level reduced motion; the hero blur-in is the one thing that currently animates content the reader is already looking at | Reduced motion additionally unpins every scene and renders every P6 layer in its final state; the hero never transitions on load regardless of preference |
| Semantics | Compositions carry `sr-only` summaries; hero chrome layers are `aria-hidden` | Each scene-2 layer gets its own `sr-only` sentence ("Skill coverage, 65 % of the score") so a screen reader hears the argument in the same order a sighted reader watches it |
| Touch targets | Buttons 42 px, drawer links 41–68 px; the range thumb is 14 px and two inline links are 24 px | 44 px minimum everywhere; the range input 44 px tall with a 24 px thumb |
| Colour alone | The word always rides with the colour | Unchanged; the highlighter wash for evidence always carries a "✓ verified" or section label beside it |
| Live data | Count-ups announce once | The pulse strip's one count-up announces its final value only |

**Where visual experimentation could destroy usability, and the guard:** a pinned scene that hides earlier layers from the accessibility tree (guard: layers are additive DOM, never `display: none`); a scroll-driven animation with no static fallback (guard: the final state is the markup; the animation only reveals it); a hero frame as a link with a dozen focusable children (guard: the check already asserts none); a highlighter wash with text below 4.5:1 (guard: 15:1 measured); a second hue that becomes decoration (guard: Palette 03's hue is not adopted; the actor convention is a chip style).

## 23. Performance considerations

The page ships zero dependencies, zero images, no build step and no render-blocking script; its product compositions add no network requests. Its only third-party request is the Google Fonts stylesheet, which is render-blocking. Measured weights: roughly 110 KB of HTML for the homepage, \~141 KB of CSS across five files, \~61 KB of JavaScript across fourteen modules plus a \~30 KB data module. That is a fast site whose first paint is delayed by a font stylesheet and whose first *legible* paint is delayed by a script-gated reveal. Every proposal below is judged on GPU cost, mobile, accessibility, reduced motion, load, SEO, browser support, touch and battery.

### Tier 1 — Must have (high impact, low complexity)

| Idea | Cost | Notes |
| --- | --- | --- |
| Hero at first paint: no blur, no count-up, one drawer slide | Negative (removes work) | Fixes the largest defect; the LCP element becomes readable at paint |
| Self-host and preload the four fonts as subsetted woff2, `font-display: swap` | Load: one fewer origin; \~4 files | Removes the only third-party request; `/legal/cookies` already commits to it |
| `modulepreload` for the module graph | Load | The reveal runs sooner where it still runs |
| Fix the pool frame body, the reserved ratios, the dead pipeline variable | None | Layout only |
| Tuner fixture re-authored so the advertised move reorders | None (data) | Precomputed; no browser arithmetic |
| Mono label floor 11 px, muted colour, serif ledes to sans | None | Tokens |
| Phone-specific hero crop and drawer sheet | CSS | Removes \~700 px from the phone hero |
| Three new audit assertions (frame height vs ratio, animated custom property set, H1 opacity at DOMContentLoaded) | Tooling | Prevents recurrence |

### Tier 2 — High impact, medium complexity

| Idea | Cost | Notes |
| --- | --- | --- |
| Scene 2, the signature sequence (P6 scroll mode) | GPU: transform and opacity on five layers, compositor only; one sticky stage | CSS scroll-driven animations (`animation-timeline: view()`) run off the main thread in supporting browsers; unsupported browsers get the final state via `@supports`. Browser-support figures were not fetched this session and must be confirmed before committing; the fallback design makes the risk a degradation, not a failure. Reduced motion unpins |
| Scene 6 pinned tuner | Sticky positioning plus the existing FLIP | Pinning must release cleanly with the fixed header; test at 768 and short viewports |
| Pool rows opening the explain panel; skill-review sheet | One small module each, zero-dependency | Reuses P5 and the tab-panel crossfade |
| The highlighter wash on cited evidence | None | Tokens; a wash, not a glow |
| Section-scoped tempo (text scenes with no stagger; hard cut on the ink statement) | Negative | Fewer transitions |
| Two real controls in scene 4 (mode switch that re-forms the list; truthful filters that FLIP) | Small JS | Existing P3 |

### Tier 3 — Experimental (high impact, high complexity)

| Idea | Cost | Notes |
| --- | --- | --- |
| Direction D, the whole page as one pinned stage | High: the visitor's scroll for \~8 viewports; hard at 390; screen-reader order must be re-authored | Prototype only if scene 2 proves the mechanism; do not commit on paper |
| The JD checker live in the page | Backend: a public endpoint, rate limit, size cap, a privacy paragraph | Blocked on a non-engineering decision; design the slot now |
| Direction C's two-hue actor system | Lint cost: a rule for where the second hue may appear | Adopted as a chip convention instead |
| Morphing ring → bar in scene 2 | Medium: a true morph needs matched geometry; a crossfade of two shapes is the honest fallback | Try the morph; ship the crossfade if it reads as a glitch |

### Never (fails the constraints, not merely the budget)

Three.js or any 3D, particles, a custom cursor, magnetic buttons, Lenis-style smooth scroll or scroll hijacking, animated gradients, glassmorphic cards, a typing simulation, an autoplaying video hero, any looping demo. Each adds a dependency or a permanent compositor layer, has no honest reduced-motion state, or fails Rule 1; several are on the system's recorded rejected list with reasons that still hold.

## 24. Signature experience concepts

The one thing a visitor should describe to a colleague afterwards. Four candidates; the first is recommended and the reasoning is in § 25.

### S1 — The score, taken apart (recommended)

A scroll-driven sequence in which the first screen's ranked list opens into one candidate's score, the score opens into four weights, a weight opens into skill rows, a row opens into the quoted line of the profile it came from, and the whole thing re-composes as the candidate's own view of the same number. Five layers, one continuous object, driven by scroll, no controls. It expresses the product's one sentence, the brand's one idea (Stratum: transparency in layers), and the site's one refusal (never invent) at the same time, because every layer is a real surface and every value is already in the data module. It converts the page's twelve still frames into a single thing that *happens*. Cost: one pinned stage of about 2.5 viewports, CSS scroll-driven animations with a static fallback, and re-authoring the existing `explainPanel()` pieces as staged layers rather than one panel. No dependency, no build step. Reduced motion: the final layer, which is today's argument panel.

### S2 — The tuner as the page's only control

Make the recruiter-control section the single interactive moment and make it unmissable: pinned, full width, three sliders on the left and the ranked list re-ordering on the right, with the what-if toggle showing how many more people qualify. Already built as `tuner()` and P3; the change is promotion and staging, not engineering. Memorable because the visitor changes the outcome. Weaker as a signature because sliders-that-reorder-a-list is a known pattern and because it depicts the least distinctive of the four proof points.

### S3 — The honest agent's ledger

An agent console that shows its own refusals, cannot repeat a search, and ends with "Market covered" and a measured recommendation. As a slow, ledger-like sequence it is the most 2026 thing the site could show and the one competitors cannot fake. Weaker as *the* signature because it is one module of fourteen and the site's strategy (`docs/phase-2/02` § 7) puts explainable matching first; strong as scene 7's second half and as the `/product/sourcing` hero.

### S4 — Bring a role (the real tool in the page)

A visitor pastes a job description and sees its skill tiers and the six flagged phrases, live, on the homepage. The strongest possible proof and the lowest-threshold conversion the site has. Blocked on a decision that is not an engineering one (a public endpoint, and a privacy paragraph covering it). It should be designed now and wired the day the decision lands; it cannot be the signature until then.

### What a signature is not

A cursor-reactive field, a magnetic button, a particle graph, a typing simulation, or a 3D turntable of a dashboard. Each is memorable for a week and generic for a year, and none of them says anything the product cannot say better by showing its own reasoning.

## 25. Recommended creative direction

**Direction B, "the brief", with one mechanism borrowed from D and one convention borrowed from C.** Not because it is safest, but because it is the only direction under which every one of the product's differentiators is visible and every one of the site's rules holds, and because the research shows its territory is empty.

**Fit to the product.** The product's argument is that a machine's reasoning can be laid out like a document and inspected. A page that argues in type and shows the real interface at reading size is that argument in visual form. Direction A (dark engine room) says "powerful"; the product says "inspectable". Direction D says "immersive"; the product's whole point is that you are never immersed, you are shown the working and asked to rule. B is the direction whose form is the product's content.

**Fit to the users.** The buyer wants to defend a shortlist in a meeting; the recruiter lives in a dense job page; the candidate wants to know why. B gives each of them the real surface they will use, at the density they will use it at, and closes on the candidate's view of the same number. A and D optimise for the four-second impression; B optimises for the fourth minute, which is when a head of talent decides to book.

**Fit to the brand.** Stratum is transparency in layers. The signature sequence (S1) is that idea as an experience, and it belongs in B because B has the paper ground and the editorial pacing to make a single scroll-driven scene feel like an event rather than a house style. In D it would be one of ten; in A it would be one more thing glowing.

**Fit to the market.** § 8's whitespace is a description of Direction B: evidence-led product in the hero, more than one type family with a deliberate accent, thin rules instead of cards, motion with a communicative job, trust by governance, real labelled data. Nobody in recruitment occupies it. Direction A walks into the most crowded room in software (dark, indigo, mono) and would need the typography alone to keep it from reading as Linear-for-HR.

**Fit to positioning.** "An intelligent hiring platform for talent teams" that is lighter than an enterprise ATS and more intelligent than a job board. B's register, a considered publication that happens to sell software, sits exactly between the ATS incumbents' template and the AI startups' gradient; that middle is the positioning.

**Fit to storytelling.** B keeps the spine the current page gets right (claim → the argument → skills → control → both sides → bring a role) and fixes what it gets wrong (twelve identical beats, the problem stated before the proof). Eight scenes with three tempos is a narrative; twelve sections with one tempo is a tour.

**Fit to interaction.** B honours the hero rule (dense, never interactive) and spends a slightly larger interaction budget where interaction teaches: the pinned tuner, truthful filters, pool rows that open the panel, the skill-review decision, and the JD checker the day it can be wired. Every control changes the thing it claims to change; nothing is drawn as a control that is not one.

**What is borrowed.** From D: the pinned, scroll-driven stage, for exactly one scene (S1), capped at one per page, with a static fallback and a mobile stack. From C: colouring by actor, adopted as a chip convention (engine actions filled indigo, human actions ink-outlined) rather than as a second hue, so the machine-recommends-person-decides principle is visible in every composition without adding a colour the system would have to police.

**What is explicitly rejected, with the reason.** Dark-first (A): trades the site's most differentiating quality for the category's most generic one. A whole-page stage (D): costs the visitor their scroll for eight viewports, fails at 390, and has no honest screen-reader order without re-authoring every state. A second hue (C): drifts into decoration within a phase without a lint rule. Everything on the brief's effects list (magnetic, cursor, particles, glow, 3D, typing, glass): each fails the system's Rule 1 and most need a dependency the architecture forbids.

**What it costs.** No dependency, no build step, no new page. Roughly: one hero layout, one new primitive (P6) demonstrated on the lab page, one re-authored fixture, four small modules, a token pass, a mobile pass, and the deletion of about a third of the current page. The largest item, scene 2, is the one that should be prototyped first, because it is the one that decides whether the direction is a redesign or a refinement.

## 26. Recommended design system

The system changes by amendment, not replacement: every token that exists stays, a few values move, a handful of roles are added, and `DESIGN.md` is corrected where it no longer describes the build. This section is written so it can become the next phase's token diff.

### Colour (Palette 01)

| Token | Today | Proposed | Why |
| --- | --- | --- | --- |
| `--c-paper` | #FAFAFB | #F7F6F2 | Reads as paper, not as a dashboard ground |
| `--c-bone` | #F4F4F8 | #EFEDE7 | Warm alternation to match |
| `--c-ink` | #0B0B1F | #1A1A2E for type, #0B0B1F kept for dark grounds | Slightly softer display ink on warm paper; the ground stays as deep as it is |
| `--c-slate-soft` | #9A9AB0 | Retired for text; kept for dots and route chrome only | 2.64:1 on paper |
| `--text-muted` | #64647A (5.5:1) | #6B6B7D on the new paper (4.8:1) | Any label that names a state |
| `--c-indigo-bright` | #4F46E5 | Unchanged | The accent, 5.8:1 on the new paper |
| `--c-indigo-glow` | #6366F1 | Kept for large type and fills; new `--c-indigo-text-on-ink` #818CF8 (6.4:1) for text-size use on dark | Fixes the 4.35:1 pair |
| new `--wash-evidence` | — | #FFF1A8 (text #1A1A2E, 15:1) | Cited evidence only; the highlighter |
| State roles | ok / info / warn / crit / none, each with ink, wash, dot | Unchanged | Already correct, rose-not-red critical included |
| Gradients | five washes in the build against a documented two | Two: hero corner and closing band, both at the hero's current strength, static | Make the number honest |
| Chip convention | — | Engine actions: filled `--wash-info` with indigo text. Human actions: ink outline, paper fill | Direction C's idea without its hue |

### Typography (Direction A of § 14)

Families unchanged. `--fs-display` 48 → 104 px; `--fs-h2` 32 → 64 px; `--fs-quote` 36 → 72 px; `--fs-label` 12 px (11 px absolute floor inside frames); new `--fs-data` 13 → 15 px, tabular, untracked, for scores, weights, percentages and citations; `.lede` set in `--font-sans`; `--tr-label` +0.14 em; the serif accent capped at six per page by a `tools/check.mjs` count. Self-hosted subsetted woff2 with `font-display: swap` and a preload for the display face.

### Space and layout

Unchanged ramp and container. Add `--section-y-scene` (the pinned scene's scroll length, 1.5–2.5 viewport heights) and `.section--joined` (tight top and bottom) so seams inside an act are measured. Rail head for every non-terminal scene; centring only for the closing band. Frames keep the route line and lose the three dots; `--ratio` is set to the real proportion of composed HTML or the reserved minimum is dropped for `.frame__body--content`.

### Surface and depth

Depth means provenance, never glass: a verdict on a raised white surface, its working on the paper beneath, the source line in the highlighter wash. Four shadow steps unchanged; `--shadow-float` retired with the last `.float`. One translucent surface (the scrolled header) stays. No blur on content, ever; the three-per-page blur reveal budget drops to zero on the hero and may be spent on the two type-only scenes.

### Motion tokens

Add `--dur-scene` 1,400 ms and `--scene-length` (viewport heights). Add P6 (staged layers) with two modes and two caps: one scroll-mode per page, two time-mode per page. Add two rows to the Rule 1 table: "this is being computed" (bounded, once per composition, opacity only) and "the answer changed because you changed the input" (P3, applied to filters and the mode switch). Promote the switcher's inline crossfade to a tokenised value-swap utility. Retire parallax. Wire or delete the pipeline advance. Correct the budgets table (no hero float; two washes; interactive elements four). Keep verbatim: the house curve, no ease-in, size-scaled durations, the transform/opacity/filter allowlist with P4 as the one exception, token-level reduced motion, and the rejected list, to which "the whole page as one stage" is added with D's reasons.

### Governance additions

Three audit assertions (§ 23 Tier 1); a 390×844 one-screen assertion beside the 1440 and 1280 ones; a serif-accent count; a rule that a `data-content="placeholder"` slot must be designed so real content drops in without a layout change.

## 27. Recommended landing page blueprint

The page to prototype, in one table. Heights are targets at 1440 and 390; "pinned" scenes are sticky stages with the stated scroll length. Every composition named exists in `src/lib/compositions.mjs` or is a re-staging of one; every value comes from `assets/data/product-demo.js`.

| # | Scene | Ground | Headline | Composition | Motion | Interaction | Height 1440 / 390 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | The claim | paper | Every shortlist *explains itself.* | `jobWorkspace()` full container width; phone crop variant | Drawer slide only; present at first paint | Frame is one link | 900 (one screen) / ≤ 1,600 |
| 2 | The score, taken apart | paper | Captions only: four weights · every skill matched · every match cited · the same number on her screen | Five layers staged from `scoreRing()`, `scoreModel()`, `explainPanel()` rows, `evidenceSnippet()`, `candidateView()` | P6 scroll mode, pinned 2.5 vh; static fallback | None | 2,250 pinned / 5 stacked frames ≈ 2,400 |
| 3 | The problem | ink | A score you cannot question is *an opinion with a number on it.* | Type | Hard cut | None | 600 / 500 |
| 4 | The role, and the refusal | bone | Nobody is dropped for a word they didn't type. *Some are dropped for a requirement they don't meet.* | `requisition()` left; `rankedList()` + `poolBands()` in one body, `criticalGate()` row, right | P3 on switch and filter; P4 on the gate | Filters / Describe; pool rows; truthful chips | 1,100 / 1,900 |
| 5 | Skills, not words | paper | Your filter said no. *The skills said otherwise.* | `skillGraph()` in the rail grid, payoff list beside, legend of nine + five names | P4 draw, true P3 re-rank | None | 900 / 1,300 |
| 6 | You decide what counts | bone | You decide what counts. *It does the arithmetic.* | `tuner()` + `controlComposition()`, fixture re-authored; what-if acts on the list | P3, recount; pinned 1.5 vh | Sliders, what-if | 1,350 pinned / 1,500 (list first, sticky slider) |
| 7a | The other side | paper | The person you passed on *can see why.* | `drawerHead()` + `explainPanel()` left, `candidateView()` right, one ring across the seam | P4 across the seam | Link to `/for-candidates/` | 900 / 1,500 |
| 7b | The honest agent, and what we believe | ink | Transparency that only runs one way *is just a dashboard.* | `missionConsole()` + `marketCovered()` as a ledger; four philosophy beats | P2 ledger | None | 900 / 1,300 |
| 8 | Bring a role | indigo | Bring a role *you're struggling to fill.* | CTA pair; JD checker slot (`toolGate()` until wired) | Press | Buttons; form when live | 700 / 900 |
| — | Footer | ink | — | Email capture above two-column links | None | Intercepted submit | 500 / 900 |

**Totals:** about 10,100 px at 1440 (from 13,700) and about 13,800 px at 390 (from 19,200). Six framed compositions instead of eight; zero card grids; six serif accents; three loud moves; one pinned signature and one pinned control.

**Designed slots for inputs that are not engineering decisions:** a logo row under scene 1's CTAs (mono label only until real marks exist); a `/proof` link in scene 7b's ledger caption the day the three job descriptions exist; two screenshot slots (scene 1's frame and scene 7a's candidate view) that swap composed HTML for real media without a layout change because `--ratio` is set to the real proportion; the JD checker in scene 8.

**What to prototype at 390 first:** scene 1's phone crop, scene 2's stacked layers, and scene 6's list-first layout with the sticky slider. If those three work on a phone, the rest is desktop composition.

## 28. Design north star

> **Transpahire should feel like** a well-argued brief you could take into a hiring meeting and defend: the density of a financial terminal, the typography of a publication, and a machine that shows its working on every page.
>
> **It should visually communicate** that a score is evidence, not an opinion: every number comes apart, every match cites its source, every refusal is on the record, and the person on the other side reads the same figure.
>
> **The visitor should experience** the product reasoning in front of them, at real width and real density, without ever being asked to do work before the page has earned it; then, once, they should change what counts and watch the answer move.
>
> **The signature interaction should be** the score taken apart: a ranked list that opens into one candidate's 87, the 87 into four published weights, a weight into its matched skills, a skill into the quoted line of the profile it came from, and the whole thing re-composed on the candidate's own screen. Transparency in layers, as a scroll.
>
> **The visual language should combine** editorial type with one serif turn + the real product at reading size + a highlighter for evidence.
>
> **It should deliberately avoid** the generic AI uniform (dark gradient, glow, sparkle, stock photo, "AI-powered"), the ATS template (centred bold H1, logo wall, stats strip, three cards, browser-chrome dots), any effect that cannot say what it communicates, and any number, name or logo the company cannot stand behind.

## 29. Prototype recommendations for the next phase

Build in this order, and treat each prototype as an experiment with a stated pass condition rather than as a slice of the final page. All of it stays inside the current architecture (no dependency, no build step, `src/` → `tools/build.mjs`) and follows the site's own primitive-adoption route (lab page first, then doc, then cap, then check).

| # | Prototype | What it must prove | Pass condition | Fail action |
| --- | --- | --- | --- | --- |
| 0 | **The Tier 1 fixes** on the live page: hero at first paint, fonts self-hosted and preloaded, pool frame body, reserved ratios, tuner fixture, label floor, three new audit assertions | That the existing page can feel finished before anything new is added | Both project tools pass; H1 at opacity 1 within 100 ms; the pool composition legible at all three widths; "Kubernetes to critical" moves a name | None; this is groundwork and it ships regardless |
| 1 | **Scene 2, the score taken apart,** on `motion-lab.html` as P6 scroll mode, then on a copy of the homepage | That a pinned, scroll-driven, five-layer sequence built from existing composition parts reads as an event and not a gimmick; that the static fallback is today's panel; that reduced motion unpins cleanly | Five people who have not seen the product can say what the 87 is made of after one scroll-through; no layout shift; no main-thread animation; works with `animation-timeline` unsupported | If the pin fatigues, run the same five layers as a time-mode P6 released on reveal (no pin) and keep the direction |
| 2 | **The hero at full width** (H1 concept) at 1440, 1280, 768 and a 390 phone crop with the drawer as a sheet | That headline-above, product-beneath gives the H1 back its scale, keeps the one-screen test at 1440 and 1280, and passes a new one at 390 | Frame chrome, job header, pulse strip, tabs and ≥ 3 rows above the fold at 1440; ≥ 2 rows at 1280; header + ≥ 2 rows at 390; hero under two phone viewports | Fall back to the bleed layout with the phone crop only |
| 3 | **Scene 6, the pinned tuner** with the re-authored fixture and the what-if acting on the list; list-first with a sticky slider at 390 | That the page's one control pays off on every device | The advertised move visibly reorders; the what-if adds a marked row; on a phone the reorder happens in view | Unpin and keep the fixture and layout fixes |
| 4 | **Scene 4 and 5 re-composed:** the pool with truthful chips and the gate rule, the graph in the rail grid with the legend and a true P3 re-rank | That the moat section fits one viewport and the pool reads as rigorous | Scene 5 ≤ 1 viewport at 1440; no rows overlap mid-flight; chips label what they do | — |
| 5 | **Palette 01 and the type pass** as a token diff on the prototype pages | That warm paper, the highlighter and the raised scale read as the same brand, sharper | Contrast table all ≥ 4.5:1 for text; six serif accents; ledes in the sans; a side-by-side with the current page that stakeholders prefer | Keep the type pass, revert the ground |
| 6 | **The eight-scene page** assembled from 1–5 with scene 3, 7 and 8, at three widths, through `check.mjs`, `audit.mjs` and the new assertions, then opened and read top to bottom on a phone | That the whole is a narrative with tempo | Under 10,500 px at 1440 and 14,000 px at 390; three loud moves; one primary action reachable within every ten phone screens | — |
| 7 | **Designed slots** for the inputs that are not engineering decisions: logo row, `/proof` link, two screenshot swaps, the JD checker in scene 8 | That real proof drops in without a layout change | Swapping composed HTML for a real screenshot in scene 1 causes zero layout shift | — |

**Research to finish before prototype 1 is judged:** the sourced trend sweep and the inspiration categories that the session limit cut short (the captures are in the scratch folder), the browser-support figures for CSS scroll-driven animations and cross-document view transitions, and the second and third competitor clusters. None of it changes the direction; all of it sharpens scene 2's fallback decision and the reference list in § 9.

**Decisions to ask for, none of them engineering:** whether the interaction budget may rise from two to four; whether the hero frame may be a single link; whether "Hiring platform · for talent teams" may be the eyebrow (category wording); the public-endpoint decision for the JD checker; and the pricing model, so `/pricing/` can stop being a shape.

**Documents to update in the same commit as the first prototype:** `docs/motion-system.md` (P6, the two new Rule 1 rows, the corrected budgets, the retired parallax, the new rejected row), `DESIGN.md` (§ 2 contrast table, § 3 lede rule, § 10 wash count), `docs/product-visualization.md` (frame ratio rule for composed HTML, the mobile crop corollary), and `CLAUDE.md` § 5 (the interaction budget and the one-scroll-mode-P6 cap).
