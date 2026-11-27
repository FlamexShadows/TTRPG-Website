# Class Themes Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each of the seven class themes on the character sheet its own full look (palette, fonts, ornaments, level badge, tabs, panels, and a class-shaped frame around every top-row number), with no layout change and Classic untouched.

**Architecture:** Classic's hard-coded colors become CSS tokens (Classic values unchanged). The theme moves from `.cs-wrap` to `#cs-app` so the Rolls drawer, toasts, pop-up and modal follow it, while `.cs-builder` re-declares Classic tokens. Each class theme lives in a new `character-sheet-themes.css` as one scoped block: tokens, ornaments as inline SVG data URIs, shapes via clip-path. A small JS helper loads only the active theme's fonts and shrinks long numbers inside frames.

**Tech Stack:** Plain CSS and vanilla JS (existing IIFE in `character-sheet.js`). Tests: Python 3 + pytest 9 + Playwright (Chrome at `/usr/bin/google-chrome`), Pillow for image diffs. Tests run in Claude's workspace against a copy of `Webpages/`.

**Spec:** `docs/superpowers/specs/2026-11-27-class-themes-design.md`

## Global Constraints

- No layout changes. Every theme keeps the same sections, fields and order.
- Classic itself does not change (screenshot diff against the baseline under 0.1% of pixels).
- New characters start on Classic. The dropdown stays manual. Existing characters keep their theme.
- The character builder (`.cs-wrap.cs-builder`) stays Classic.
- Readability: body text and numbers meet 4.5:1 contrast against their background in every theme. Labels at small sizes too.
- Phones: everything works at 390 px wide. Touch targets stay at least their current size.
- Motion: only the Mage sigil turns (about one turn a minute). All motion stops under `prefers-reduced-motion: reduce`.
- Print: every theme prints as plain black on white, as Classic does today.
- Weight: no image files. Ornaments, textures and frames are CSS and inline SVG. Only the active theme's fonts load.
- Keyboard focus stays clearly visible in every theme.
- Scoping rule for every class-theme rule: sheet parts use `#cs-app[data-theme="<id>"] .cs-wrap:not(.cs-builder) …`; overlays use `#cs-app[data-theme="<id>"] :is(.cs-dice-fab, .cs-rolls, .cs-toasts, .cs-pop, .cs-modal)`.
- Saving: Claude has no shell on the user's computer. "Save" steps mean `device_commit_files` to `C:\Users\kylep\OneDrive\Desktop\TTRPG Website\…` with `expectedMtimeMs` from a fresh `device_list_dir`. Re-stage and merge if a file changed (another session edits these files). Never force.

## Review Focus

1. A multiclass caster with both Stamina and Mana shows six vital chips. All six frames fit at 390 px with no sideways scroll. (Test in Task 2.)
2. Long values: Health −12 while Dying, Physical Armor 125, Initiative +12. The number shrinks to fit inside its frame and stays editable. (Test in Task 2.)
3. Switching themes back and forth: exactly one theme font link exists, Classic has none, and no ornament from the previous theme remains. (Test in Task 3.)
4. Opening the character builder while a dark theme is active: the builder looks Classic. (Test in Task 4.)
5. Opened overlays in dark themes (Rolls drawer, a math pop-up, a modal) stay readable. (Covered by `check_theme` in Task 1, used by every theme task.)

---

### Task 1: Theme tokens, theme on `#cs-app`, test harness

**Files:**
- Modify: `Webpages/character-sheet.css` (`:root` token block; rules at lines ~118–300, 455–527 that hard-code colors; delete the seven `[data-theme]` palette blocks at lines 38–94)
- Create: `Webpages/character-sheet-themes.css` (the seven palette blocks moved here, re-scoped to `#cs-app[data-theme="<id>"]`, plus the print reset)
- Modify: `Webpages/character-sheet.html` (add `<link rel="stylesheet" href="character-sheet-themes.css"/>` after `character-sheet.css`)
- Modify: `Webpages/character-sheet.js` `applyTheme()` (line ~2431)
- Create: `tools/tests/conftest.py`, `tools/tests/sheet_checks.py`, `tools/tests/test_sheet_themes.py`, `tools/tests/baseline/` (PNG files)

**Interfaces:**
- Produces (CSS tokens on `:root, #cs-app .cs-builder`, Classic values copied from today's literals): `--cs-wrap-bg` (the wrap's background-image), `--cs-wrap-shadow`, `--cs-line` (#d3bb92), `--cs-line-soft` (#e3d1ad), `--cs-input-border` (#c9b088), `--cs-btn-bg`, `--cs-btn-bg-hover`, `--cs-btn-border` (#b89a6a), `--cs-btn-strong-bg`, `--cs-btn-strong-bg-hover`, `--cs-btn-strong-ink`, `--cs-tab-bg`, `--cs-tab-border`, `--cs-tab-on-bg`, `--cs-tab-on-ink`, `--cs-box-bg`, `--cs-box-border` (#cfb58a), `--cs-box-shadow`, `--cs-seal-bg`, `--cs-seal-ink`, `--cs-seal-shape` (today's clip-path polygon), `--cs-name-font` ('Cinzel Decorative', var(--cs-display)), `--cs-name-ink` (var(--cs-red)), `--cs-overlay-bg`, `--cs-overlay-ink`, `--cs-frame` (none), `--cs-frame-fill` (transparent).
- Produces (JS): `applyTheme()` sets `document.getElementById('cs-app').dataset.theme` to `char().theme || 'classic'` and stops setting it on `.cs-wrap`.
- Produces (tests): fixture `page` (example character loaded, fonts not blocked, `ajax.googleapis.com` aborted); `set_theme(page, id)`; `check_theme(page, row) -> list[str]` returning problems (empty = pass) for: ground background-color luminance (dark < 0.06, light > 0.55), display font in `.cs-name` font-family, `--cs-frame` not `none` on `.cs-vital` and `.cs-q`, contrast ≥ 4.5 for `.cs-name, .cs-subline, .cs-lbl, .cs-note, .cs-vital-num, .cs-q .cs-val, .cs-tab, .cs-tab.on, .cs-btn, .cs-box .cs-h` (background = nearest ancestor with an opaque background-color; frame numbers measured against `--cs-frame-fill`), the same contrast check after opening the Rolls drawer and the Armor Class math pop-up, no sideways scroll at 390 px, print emulation giving a white wrap background with every text color luminance < 0.05, and a visible focus outline (outline-style not `none`, outline-width ≥ 2px) on a `.cs-btn` and a `.cs-tab` reached with Tab.

- [ ] **Step 1: Capture the Classic baseline from the current files**

Write `tools/tests/conftest.py` (static server on the `Webpages` copy via `SHEET_DIR`, Chrome at `/usr/bin/google-chrome`) and a one-off script in `test_sheet_themes.py::test_make_baseline` (skipped unless `MAKE_BASELINE=1`). It saves full-page PNGs of each of the 8 tabs at 1280 px and 390 px, plus the opened Rolls drawer and the opened builder, to `tools/tests/baseline/`.
Run: `MAKE_BASELINE=1 pytest tools/tests/test_sheet_themes.py::test_make_baseline -q`
Expected: 20 PNGs written.

- [ ] **Step 2: Write the failing tests**

```python
def test_classic_unchanged(page):        # each baseline PNG re-shot; differing pixels / total < 0.001
def test_theme_on_app(page):
    set_theme(page, "mage")
    assert page.eval_on_selector("#cs-app", "e => e.dataset.theme") == "mage"
def test_builder_stays_classic(page):
    set_theme(page, "mage"); page.click('[data-act="new"]')
    assert css(page, "#cs-builder", "background-color") == "rgb(251, 245, 229)"
def test_no_image_files():               # every url( in character-sheet-themes.css starts with data:image/svg+xml
```

- [ ] **Step 3: Run them to make sure they fail**

Run: `pytest tools/tests/test_sheet_themes.py -q -k "theme_on_app or builder"`
Expected: `test_theme_on_app` FAILS (theme is on `.cs-wrap`, not `#cs-app`).

- [ ] **Step 4: Implement the tokens, the move and the new stylesheet**

Replace each listed literal with its token. Delete the old `[data-theme]` blocks from `character-sheet.css` and paste them into `character-sheet-themes.css` re-scoped to `#cs-app[data-theme="<id>"]` (later tasks replace them one at a time). Add the print reset to `character-sheet-themes.css`: under `@media print`, every `#cs-app[data-theme]` gets Classic tokens re-declared, `--cs-frame: none`, and `display: none` on `.cs-wrap::before, .cs-wrap::after, .cs-hero::before, .cs-hero::after`.

- [ ] **Step 5: Run all tests**

Run: `pytest tools/tests/test_sheet_themes.py -q`
Expected: PASS (baseline test skipped). `test_classic_unchanged` diff under 0.001 on all 20 shots.

- [ ] **Step 6: Save** `character-sheet.css`, `character-sheet-themes.css`, `character-sheet.html`, `character-sheet.js` and `tools/tests/*` to the user's folder.

---

### Task 2: Number frames

**Files:**
- Modify: `Webpages/character-sheet.js` `vitalTile()` (line ~2311) and the end of `fullRender()` / value refresh
- Modify: `Webpages/character-sheet.css` (frame rules after the vitals and quick-strip sections)
- Test: `tools/tests/test_sheet_themes.py`

**Interfaces:**
- Consumes: `--cs-frame`, `--cs-frame-fill` (Task 1).
- Produces: markup `<span class="cs-frame"><input class="cs-vital-num" …></span>` inside `.cs-vital-row`; frame drawn on `.cs-frame::before` and `.cs-q > .cs-val.big::before` with `background: var(--cs-frame) center / contain no-repeat`; tokens `--cs-frame-size` (vitals 66px, stat row 60px), `--cs-frame-dy` and `--cs-frame-dx` (number offsets as percentages, default 0%); JS `fitFrames(root: Element): void` adds class `cs-long` to any framed number whose shown text is 3 or more characters (font-size 0.8 of normal) and removes it otherwise. It is called after every render and after every vital input.

- [ ] **Step 1: Write the failing tests**

```python
TEST_FRAME = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10'/%3E%3C/svg%3E\")"
def test_frame_slots(page):              # with --cs-frame set to TEST_FRAME on #cs-app: every .cs-frame::before and .cs-q>.cs-val.big::before background-image contains "svg"
def test_classic_has_no_frame(page):     # Classic: those ::before have background-image "none"
def test_long_numbers_fit(page):         # set Health to -12 and Physical Armor to 125: both inputs have class cs-long and scrollWidth <= clientWidth; type 30 into Health: value saved, cs-long removed
def test_six_vitals_fit_phone(page):     # make the example character Mage 3 / Warrior 2 (both Mana and Stamina), 390px: 6 .cs-frame, document.scrollingElement.scrollWidth <= 390
def test_stat_buttons_still_work(page):  # with TEST_FRAME: clicking Armor Class opens .cs-pop; clicking Initiative adds a roll to #cs-roll-list
```

- [ ] **Step 2: Run them to make sure they fail**

Run: `pytest tools/tests/test_sheet_themes.py -q -k "frame or long or six or stat_buttons"`
Expected: FAIL (`.cs-frame` not found).

- [ ] **Step 3: Implement the wrapper, the frame rules and `fitFrames`**

The frame box is `--cs-frame-size` square, centered. The number sits on top with transparent background, nudged by `--cs-frame-dy`. In Classic (`--cs-frame: none`) the box takes no extra space, so Classic stays pixel-identical.

- [ ] **Step 4: Run all tests**

Run: `pytest tools/tests/test_sheet_themes.py -q`
Expected: PASS, including `test_classic_unchanged`.

- [ ] **Step 5: Save** `character-sheet.js`, `character-sheet.css` and the tests.

---

### Task 3: Per-theme font loading

**Files:**
- Modify: `Webpages/character-sheet.js` (constant next to `applyTheme()`, and `applyTheme()` itself)
- Test: `tools/tests/test_sheet_themes.py`

**Interfaces:**
- Produces: `const THEME_FONTS = { mage: 'Marcellus+SC&family=Spectral:wght@400;500;700', 'grove-keeper': 'Alegreya+SC:wght@500;700&family=Alegreya:wght@400;500;700', warrior: 'Grenze:wght@500;700&family=Crimson+Pro:wght@400;600', hunter: 'IM+Fell+English+SC&family=Crimson+Pro:wght@400;600', phantom: 'Cormorant+SC:wght@500;700&family=Cormorant+Garamond:wght@500;700', priest: 'Forum&family=Cardo:wght@400;700', 'pact-keeper': 'UnifrakturMaguntia&family=Crimson+Pro:wght@400;600' }`. `applyTheme()` keeps one `<link id="cs-theme-fonts" rel="stylesheet">` in `<head>` with href `https://fonts.googleapis.com/css2?family=<THEME_FONTS[id]>&display=swap`, and removes it for Classic.

- [ ] **Step 1: Write the failing test**

```python
def test_theme_fonts_swap(page):
    for t in ["mage", "warrior", "mage", "classic", "grove-keeper"]:
        set_theme(page, t)
    links = page.query_selector_all("#cs-theme-fonts")
    assert len(links) == 1 and "Alegreya" in links[0].get_attribute("href")
    set_theme(page, "classic")
    assert page.query_selector("#cs-theme-fonts") is None
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pytest tools/tests/test_sheet_themes.py::test_theme_fonts_swap -q`
Expected: FAIL (no `#cs-theme-fonts`).

- [ ] **Step 3: Implement `THEME_FONTS` and the link handling in `applyTheme()`**

- [ ] **Step 4: Run all tests.** Expected: PASS.

- [ ] **Step 5: Save** `character-sheet.js` and the tests.

---

### Theme tasks (Tasks 4 to 10): shared shape

Each theme task replaces that theme's old palette block in `character-sheet-themes.css` with the full theme, then adds one row to the `THEMES` table in `test_sheet_themes.py`, so `test_theme[<id>]` (which runs `check_theme`) covers it. Each block sets every Task 1 token, `--cs-frame` (the frame SVG below as a data URI, with the listed fill and stroke), `--cs-frame-fill` (the frame's fill hex) and `--cs-frame-dy`, then adds the ornaments with `::before` / `::after` on `.cs-wrap` and `.cs-hero`, tab shapes on `.cs-tab` (clip-path or border-radius), and panel corners on `.cs-box`.

Each theme task follows these steps:
- [ ] Step 1: add the `THEMES` row (id, `dark` or `light`, display font).
- [ ] Step 2: run `pytest tools/tests/test_sheet_themes.py -q -k "<id>"`. Expected: FAIL (old palette: the frame is `none`, and the display font is missing).
- [ ] Step 3: write the theme block.
- [ ] Step 4: run all tests. Expected: PASS, with `test_classic_unchanged` still passing.
- [ ] Step 5: save shots of the Character tab at 1280 px and 390 px to `/tmp/theme-shots/<id>-{desk,phone}.png`, and compare them with the theme's row below.
- [ ] Step 6: save `character-sheet-themes.css` and the tests.

Frame paths are copied from the approved drawings. Each path's `viewBox` is given, and `dy` is where the drawing placed the number.

### Task 4: Mage

Feel: arcane study. Ground dark indigo `#0e1130`, panels `#161a40`, panel line `#2c3672`, glow `#7fd4ff`, second glow `#b48cff`, text `#e6e9ff`, muted `#9aa3d6`. Fonts: Marcellus SC and Spectral. Ornaments: a sigil circle (rings r92, r80 and r44, two opposed triangles, eight rune ticks in `#b48cff`) behind the name at 55% opacity, turning `60s linear infinite`. A staff down the left edge: a `#6b5a9e` 3 px shaft with an orb (`#1b2a63` fill, `#7fd4ff` ring and core). Level badge: a circle in `#1b2a63` with a `#7fd4ff` ring and a `#b48cff` outer ring. Tabs: crystal facets `clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)`, with the active tab in `#7fd4ff` and its ink in `#0e1130`. Panels: dark glass with 2 px `#7fd4ff` brackets on the top-left and bottom-right corners.
Frame (viewBox `46 22 58 86`): `M75 26 L100 46 L100 82 L75 104 L50 82 L50 46 Z`, fill `#1b2a63`, stroke `#7fd4ff` 2. Facet lines `M75 26 L75 104 M50 46 L100 82 M100 46 L50 82`, stroke `#3b4a8f` 0.8. dy 0%.
Extra tests in this task (Review Focus 4, plus motion):
```python
def test_builder_classic_under_mage(page):   # mage active, open builder: #cs-builder background-color == rgb(251, 245, 229)
def test_mage_sigil_motion(page):            # animation-name on the sigil pseudo-element != "none"; with reduced_motion="reduce" it is "none"
```
After Step 5, send the two Mage shots to the user for a direction check before Task 5.

### Task 5: Grove Keeper

Feel: living wood. Ground `#eef3e4`, frame border 6 px `#5a4630` (bark), panels `#f8faf2`, panel line `#b9cba3`, moss `#4f7a3a`, leaf `#8db86b`, text `#23301c`, muted `#4f5f40`, name ink `#2f5424`. Fonts: Alegreya SC and Alegreya. Ornaments: a vine along the top edge (`#4f7a3a` 2 px wave with four `#8db86b` leaves). An antler and branch crest behind the name at 35% opacity (`#5a4630` strokes, `#8db86b` leaf tips). Level badge: seven `#6f9a4e` leaves in a ring around a `#8a5a2b` center, with the number in `#f6efd8`. Tabs: `border-radius: 16px 2px 16px 2px`, with the active tab in `#4f7a3a` and its ink in `#f3f8ea`. Panels: 12 px radius with a small `#5d8f41` sprig in the top-right corner.
Frame, heart leaf (viewBox `40 20 70 90`): `M75 36 C70 24 44 24 44 50 C44 74 66 88 75 106 C84 88 106 74 106 50 C106 24 80 24 75 36 Z`, fill `#f8faf2`, stroke `#4f7a3a` 2. Stem `M75 36 C77 29 82 25 90 23`, stroke `#5a4630` 2.5, round caps. dy +5%.

### Task 6: Warrior

Feel: forged steel and war banners. Dark iron ground (luminance < 0.06), steel lines, a war-banner red accent (builder picks the hexes, starting from the drawing: `#1a1c21`, `#2b2f36`, `#8a939e`, `#a3262a`). Fonts: Grenze and Crimson Pro. Ornaments: a crossed-swords crest behind the name, rivets in the four frame corners, and a red banner accent. Level badge: a shield. Tabs: notched blade edges. Panels: hammered iron plates with corner rivets.
Frame, shield (viewBox `46 26 58 80`): `M50 30 H100 V60 C100 82 86 94 75 102 C64 94 50 82 50 60 Z`, fill `#3a3f48`, stroke `#8a939e` 2. Rivets: circles at (56,36) and (94,36), r 1.6, fill `#8a939e`. dy −2%.

### Task 7: Hunter

Feel: a ranger's field journal. Light tan leather ground (luminance > 0.55, starting from `#efe6d4`), brown ink. Fonts: IM Fell English SC and Crimson Pro. Ornaments: a compass rose behind the name, faint map contour lines in the wrap background (opacity ≤ 0.12), and small animal tracks as accents. Level badge: a compass. Tabs: arrow fletching. Panels: journal pages with stitched edges (dashed inner border).
Frame, broadhead (viewBox `41 20 68 86`): `M75 24 L105 80 L86 74 L75 102 L64 74 L45 80 Z`, fill `#faf5ea`, stroke `#6b5232` 2. dy −6%.

### Task 8: Phantom

Feel: shadow and smoke. Near-black violet ground (luminance < 0.06, starting from `#120f1c`), mist violet accents (`#8f74c4`, `#c9a9ef`). Fonts: Cormorant SC and Cormorant Garamond at 500 weight or heavier. Ornaments: mist drifting at the wrap edges (static, soft) and a dagger crest. Level badge: a moon phase. Tabs: fading into the dark (a gradient edge, with the active tab still at 4.5:1). Panels: smoky soft edges.
Frame, plain cloak (viewBox `34 18 82 88`): `M75 22 C92 22 100 34 100 46 C112 54 112 72 112 100 L104 95 L96 102 L88 95 L80 102 L72 95 L64 102 L56 95 L48 102 L38 100 C38 72 38 54 50 46 C50 34 58 22 75 22 Z`, fill `#231d36`, stroke `#8f74c4` 2, miter joins rounded. No face, eyes, clasp or fold lines. dy +12%.

### Task 9: Priest

Feel: cathedral light. Light ivory and gold ground (luminance > 0.55, starting from `#fdf9ec`), gold `#b88b2e` and `#e3b946`, with stained-glass color in the panel headers. Fonts: Forum and Cardo. Ornaments: a sunburst halo behind the name. Level badge: a sunburst halo. Tabs: arched tops. Panels: arched tops.
Frame, closed book (viewBox `48 26 60 78`): cover rect x52 y30 w48 h70 rx3, fill `#fffef9`, stroke `#b88b2e` 2. Spine rect x52 y30 w8 h70, fill `#e3b946`. Page edge `M100 36 H104 V96 H100`, stroke `#d9c38a` 1.5. dx +8% (the number sits on the cover, right of the spine). dy 0%.

### Task 10: Pact Keeper

Feel: an infernal contract. Dark crimson-black ground (luminance < 0.06, starting from `#160609`), crimson `#b8293f`. Fonts: UnifrakturMaguntia for the character name only (`--cs-name-font`), Cinzel for other headings, Crimson Pro for body. Ornaments: chains along the side edges, scorched paper edges on the wrap, and a signature line under the name. Level badge: a demonic seal. Tabs: torn contract tabs (jagged bottom clip-path). Panels: scorched contract paper.
Frame, vial (viewBox `41 20 68 86`): cork rect x67 y24 w16 h7 rx1.5, fill `#6b3a2a`. Body `M69 31 H81 V42 C98 47 105 60 105 72 C105 90 92 102 75 102 C58 102 45 90 45 72 C45 60 52 47 69 42 Z`, fill `#3a1019`, stroke `#b8293f` 2. dy +8%.

---

### Task 11: Final pass

**Files:**
- Modify: `docs/CHARACTER-SHEET-NOTES.md` (one short section: where themes live, the token list, the scoping rule)
- Test: `tools/tests/test_sheet_themes.py`

- [ ] **Step 1: Run the whole suite.** Run: `pytest tools/tests/test_sheet_themes.py -q`. Expected: all PASS, 7 `test_theme[...]` rows.
- [ ] **Step 2: Shoot all 8 themes** (Character tab, 1280 px and 390 px, plus Rolls drawer open) into one contact sheet `/tmp/theme-shots/all.png` and send it to the user.
- [ ] **Step 3: Write the notes section, then save** the notes file and any remaining files to the user's folder.
