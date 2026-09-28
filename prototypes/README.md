# prototypes/ — Stage 2 exploration and the Stage 3 final page

**Not production.** Nothing in `src/`, `assets/` or `tools/` changed. These
pages are served beside the site so they can reuse its real shell, data and
compositions; they are not linked from it and `robots.txt` already disallows
everything.

```
node tools/serve.mjs          # then open http://localhost:4321/prototypes/   ← the Stage 3 final page
                              #           http://localhost:4321/prototypes/stage-2.html   ← the Stage 2 board
node prototypes/build.mjs     # rewrite prototypes/*.html after editing lib/, css/ or js/
node prototypes/build.mjs --bundle   # a relative-path copy for hosting elsewhere
```

| Path | What |
|---|---|
| `STAGE-3.md` | **The Stage 3 deliverable**: decisions carried forward, changes made and not made, the final visual, interaction and motion systems, responsive and accessibility decisions, the two product decisions required, and the production handoff |
| `index.html` | **The final page.** Variation 02 consolidated: A3 hero, the signature in its final mapping, the sticky-but-unpinned tuner, eight scenes |
| `STAGE-2.md` | The Stage 2 deliverable: overview, heroes, signature, tuner, page, responsive, interaction map, motion map, visual system, differences, recommendation, findings |
| `stage-2.html` | The Stage 2 board: links, a four-width live viewer, the comparison board, the checklist |
| `lib/final.mjs` | Stage 3: composes the final page from the Stage 2 parts with their Stage 3 options |
| `lib/shell.mjs` | Wraps the production document (`src/lib/layout.mjs`) and appends the prototype layer |
| `lib/parts.mjs` | Every prototype composition, reading `assets/data/product-demo.js` |
| `lib/rankings-proposed.mjs` | The proposed tuner fixture and the reasons for it |
| `lib/board.mjs` | The Stage 2 board page |
| `css/proto-tokens.css` | The token diff: Palette 01, the highlighter, the type pass |
| `css/proto.css` | Scene layouts, the three heroes, the tuner, the phone crops, the board |
| `css/signature.css` | The score-taken-apart stage: three Stage 2 mappings, the **final** mapping, the native scroll timeline, and the static composition |
| `css/final.css` | Stage 3: the consolidation layer, loaded on the final page only |
| `js/scene.js` | The scroll clock for the stage (per-stage thresholds; defers to the native timeline where supported) |
| `js/tuner-proto.js` | The control, with the gate |
| `js/proto.js` | Entry point |
| `data/rankings-proposed.js` | Generated lookup table (do not edit) |

The `.html` files are generated. Edit `lib/`, `css/` or `js/` and rebuild.
