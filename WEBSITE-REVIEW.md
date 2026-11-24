# Sparks of Dynasty — Website Review

Reviewed: June 12, 2026
Scope: 494 pages in `Webpages/`, 188 pages in `spells/`, `styles.css`, `character-sheet.css`, shared header (`A-Header.html`).

> ✅ **Status: all changes below were applied on June 12, 2026.** Orphaned/legacy files were moved to `_archive/` (not deleted). All filenames are now `lowercase-with-hyphens.html` (e.g. `A-Header.html` → `a-header.html`, `Spells_Complete.html` → `spells-complete.html`) and every internal link was rewritten to match. Items not fully applied: the "Demonic Mirage" spell page still needs to be written (its list entry is unlinked, marked "page coming soon"), the Veils page and Focused Palm description need content, and the stat-block restyle was done via CSS (accent-colored labels) rather than restructuring 400+ pages.

---

## What's working well

- **Consistent page titles** — nearly every page uses the `Sparks | Page Name` pattern.
- **Shared stylesheet + shared header** — `styles.css` and `A-Header.html` give the site one place to change the theme and nav.
- **Viewport meta on every page** — mobile rendering is at least attempted everywhere.
- **The dark red/black theme on the homepage** looks cohesive and atmospheric, and the header CSS already has responsive breakpoints.
- **CharacterSheet.html** is the strongest page on the site: save/export/import, tabs, meta description, proper labels on inputs.

---

## 🔴 Critical — broken for visitors right now

### 1. Veils.html is empty but linked in the main nav
`Webpages/Veils.html` contains only `<html>` tags — no content, no header, nothing. It's linked from the **Miscellaneous → Veils** dropdown on every page, so visitors get a blank screen.
**Fix:** add the content, or remove the link from `A-Header.html` until it's ready.

### 2. Broken internal links
| Page | Broken link | Cause |
|---|---|---|
| `Feats.html` | `Defensive Opportunist.html` | The actual file is misspelled: `Defensive Opprotunist.html` |
| `Spells_Complete.html` | `demonic-mirage.html` | File doesn't exist |
| `Spells.html` (legacy) | `dancing-grains.html`, `dueling-waves.html` | Files don't exist |
| `sheet.html` (legacy) | `CombatManuver.html` | File doesn't exist |

**Fix:** rename `Defensive Opprotunist.html` → `Defensive Opportunist.html` (and fix the typo in its visible text). Create or remove the three missing spell/maneuver pages.

### 3. Dropdown nav doesn't work on phones or keyboards
The nav menus open only on `:hover` (`styles.css:107`), and the triggers are `<span>` elements. On a touch device there is no hover, so **the entire nav is unusable on mobile** — and keyboard users can't open the menus either.
**Fix (minimal):** add `.dropdown:focus-within .dropdown-content { ... }` alongside the hover rule and make the triggers `<button>` elements. A small click-to-toggle script is the more robust fix.

### 4. Spells_Complete.html breaks on mobile
The page hard-codes a 250px fixed sidebar (`margin-left: 250px`, `top: 100px`) with no media query. On a phone the sidebar covers the content, and the sticky header is taller than 100px when it stacks, so things overlap.
**Fix:** add a `@media (max-width: 768px)` block that turns the sidebar into a horizontal scrollable strip (or collapses it) and sets `margin-left: 0`.

---

## 🟠 Structural — cleanup that prevents future pain

### 5. The `spells/` folder is dead weight (and a trap)
Nothing on the site links into `spells/`. 180 of its 188 files are duplicated in `Webpages/` (the live copies). Keeping both means you will eventually edit the wrong copy and wonder why the site didn't change.
**Fix:** verify the 8 non-duplicated files aren't needed, then delete the folder (or archive it outside the site root).

### 6. Other orphaned/legacy pages in `Webpages/`
Never linked from anywhere: `Spells.html`, `Spells_0.html`, `sheet.html` (superseded by `CharacterSheet.html`), `Updates.html`, `Disruptive.html`, `Feint.html`, `Focused-Palm.html`, `Wounding-Strike.html`, `tether.html`, `spectral-weapon.html`, `blind.html`, `incinerate.html`, `inprison-essence.html`, `rejuvinating-light.html`.
**Fix:** delete the superseded ones; link the maneuver/spell pages (Feint, Disruptive, etc.) from their list pages if they're meant to be live.

### 7. Two competing visual themes
26 pages (the Lore section: `Lore.html`, `Arendell.html`, `Belfast.html`, etc.) carry an inline `<style>` block that overrides the body to light gray (`#f8f8f8`) with a flat `#333` box style — completely different from the animated dark-red theme everywhere else. In total, 43 pages have their own `<style>` blocks, most of them near-identical copies.
**Fix:** pick one theme (the dark theme is the stronger identity), move the lore layout into `styles.css` as classes (`.lore-section`, `.image-box` are already half-shared), and delete the inline blocks. This is one of the highest-impact changes for making the site feel like one site.

### 8. Inconsistent header injection
Three patterns coexist:
- `$("#header-placeholder").load(...)` (index, CharacterSheet)
- `$("header").load("A-Header.html")` (~481 pages) — which nests `<header id="main-header">` inside another `<header>` (invalid-ish HTML, works by accident)
- No header at all (`Updates.html`, `Veils.html`, `Wounding-Strike.html`, `incinerate.html`, `sheet.html`)

**Fix:** standardize on the `#header-placeholder` div pattern. Note: jQuery `.load()` is blocked when opening files directly via `file://` in Chrome — fine with Live Server, but worth knowing before sharing the folder with players.

### 9. File naming will break on real hosting
202 filenames contain spaces (`Age of Reclamation.html` → `Age%20of%20Reclamation.html` in URLs) and conventions are mixed (PascalCase, hyphens, lowercase-with-spaces). Linux web hosts are case-sensitive, so `Race.html` vs `race.html` mismatches become broken links the day you deploy.
**Fix:** adopt one convention (recommend `lowercase-with-hyphens.html`) and do the rename with a script that also rewrites every `href` — not by hand.

---

## 🟡 Polish — content and small fixes

### 10. Recurring typos (in filenames *and* visible text)
- **"Manuver" → "Maneuver"** — appears in 5 files' text plus filenames (`MartialManuver.html`, `AnnulManuver.html`).
- **"Opprotunist" → "Opportunist"** (`Defensive Opprotunist.html`).
- **"inprison-essence" → "imprison-essence"**, **"rejuvinating" → "rejuvenating"**.
- `1000Cuts.html`: "the creature takes **and** additional 5d6" → "**an** additional".
- `Arendell.html`: the heading says **"Jlvina"** but the body text calls the city **"Jivia"** five times — pick one spelling.

### 11. Homepage intro reads rough
"…centered around magic, swordsmanship, archery and a few other things but they will be minor." Consider something like: "…centered on magic, swordsmanship, and archery, with room for much more." The homepage is also sparse — a single Lore button. Consider adding tiles for Classes, Races, Spells, and the Character Sheet so new players see the whole game at a glance.

### 12. Stat blocks are unstructured text
Feat/maneuver pages list `AP / Requirements / Type / Range / Duration / Concentration` as plain text with `<br>` tags. A small reusable stat-block style (a two-column grid or definition list with the labels in the accent red) would make every rules page scannable and consistent — one CSS class, used 400+ times.

### 13. Minor/quick wins
- **No favicon** — add one (a spark/flame mark would suit the theme); browsers currently 404 on it.
- **Unclosed divs** — e.g. `1000Cuts.html` never closes `.main-content`. Run the pages through an HTML validator; browsers forgive it, but it bites when you restyle.
- **No meta descriptions** except CharacterSheet — add them at least to index, Classes, Races, Spells, Lore.
- **Lore pages' empty image boxes** show "No Maps Yet" taking 50% width — collapse the column until maps exist so text can use the space.

---

## Suggested order of attack

1. Nav fixes: fill or unlink Veils, fix the broken links, make dropdowns work on touch (items 1–3).
2. Delete/archive the orphaned `spells/` folder and legacy pages (items 5–6).
3. Unify the theme by moving the lore styles into `styles.css` (item 7).
4. Typo sweep (item 10) — fast and very visible.
5. Mobile fix for Spells_Complete (item 4) and the stat-block component (item 12).
6. The filename normalization (item 9) last, scripted, when you're ready to deploy.
