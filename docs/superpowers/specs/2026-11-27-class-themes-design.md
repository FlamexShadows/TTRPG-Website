# Class Themes Overhaul: Design

Date: November 27, 2026
Files: `Webpages/character-sheet.css`, `Webpages/character-sheet.js` (and one new stylesheet, see Build notes)

## Intent

The character sheet has a Classic theme and seven class themes. Today the class themes only swap about 15 colors, so every theme still reads as the parchment tome. The goal: each class theme feels like its own world the moment a player opens the sheet. A Mage sheet looks arcane. A Grove Keeper sheet looks grown from the forest.

## Goals

- Each class theme gets its own colors, fonts, background, frame decorations, level badge, tab shapes, panel style and bar styling.
- Every stat chip in the top two rows frames its number in the class shape.
- The look carries into the Rolls drawer, pop-up windows and toasts.

## Non-goals

- No layout changes. Every theme keeps the same sections, fields and order. (The player chose the full reskin over per-class components or per-class layouts.)
- No change to the site's top menu or any page other than the character sheet.
- No automatic theme. New characters start on Classic, and the player picks a theme from the dropdown. Existing characters keep their theme.
- The character builder (create character wizard) stays Classic.
- Classic itself does not change.

## Anti-goals (failure even if it works)

- A class theme still reads as the book in a new color.
- Text gets harder to read in any theme.
- A theme breaks the phone layout or makes touch targets smaller.
- The page gets slow: large images, or every theme's fonts loading at once.

## Approaches considered

For the overhaul as a whole:
1. Full reskin, same layout. Picked by the player. Cheapest to keep working when the sheet changes.
2. Reskin plus signature components (Health and Mana as orbs, vine meters). Rejected: more code, and every new feature needs checking in 8 themes.
3. Separate layouts per class. Rejected: every future sheet change gets built 8 times.

For the stat chip shapes:
1. The whole chip takes the shape. Rejected: shapes stretch on wide screens, squash on phones, and cramp the narrow stat row.
2. The shape frames the number only. Picked by the player. The shape keeps its true proportions at any width, and the chip layout stays as it is.
3. A rectangle with shaped edges. Rejected by the player.

## The themes

Fonts are my calls, all from Google Fonts. The builder may swap a font for a close match if one renders poorly.

| Theme | Feel | Ground | Fonts (display / body) |
|---|---|---|---|
| Classic | The parchment tome, unchanged | Light | Cinzel / EB Garamond |
| Mage | Arcane study: anime sigil circles, staffs, orbs | Dark indigo | Marcellus SC / Spectral |
| Grove Keeper | Living wood: plants, animals, bark, vines | Light leaf green | Alegreya SC / Alegreya |
| Warrior | Forged steel and war banners | Dark iron | Grenze / Crimson Pro |
| Hunter | A ranger's field journal | Light tan leather | IM Fell English SC / Crimson Pro |
| Phantom | Shadow and smoke | Dark violet black | Cormorant SC / Cormorant Garamond (500 weight) |
| Priest | Cathedral light | Light ivory and gold | Forum / Cardo |
| Pact Keeper | An infernal contract | Dark crimson black | UnifrakturMaguntia (name only) and Cinzel / Crimson Pro |

### Per-theme parts

| Theme | Header ornament | Level badge | Tabs | Panels | Number frame |
|---|---|---|---|---|---|
| Mage | Sigil circle (rings, two triangles, rune ticks) slowly turning behind the name. A staff with an orb runs down the left edge. | Orb with a second ring | Crystal facets (pointed ends) | Dark glass, thin glowing line, rune brackets on two corners | Crystal (elongated hexagon with facet lines) |
| Grove Keeper | Antler and branch crest behind the name. A leafy vine along the top edge. Bark-brown frame. | Ring of leaves around an acorn-brown center | Leaf shapes (opposite corners rounded) | Rounded, pale leaf paper, a small sprig in one corner | Heart-shaped leaf with a curled stem |
| Warrior | Crossed swords crest. Rivets in the frame corners. A red banner accent. | Shield | Notched blade edges | Hammered iron plates with corner rivets | Shield with two rivets |
| Hunter | Compass rose behind the name. Faint map contour lines in the background. Animal tracks as small accents. | Compass | Arrow fletching | Leather journal pages with stitched edges | Broadhead arrowhead |
| Phantom | Mist drifting at the edges. A dagger crest. | Moon phase | Tabs fading into the dark | Smoky, soft edges | Plain cloak silhouette facing the viewer: hood, shoulders, ragged hem. No face, eyes, clasp or fold lines. |
| Priest | Sunburst halo behind the name. Stained-glass color in panel headers. | Sunburst halo | Arched tops | Arched panel tops | Closed book with a gold spine |
| Pact Keeper | Chains along the edges. Scorched paper edges. A signature line under the name. | Demonic seal | Torn contract tabs | Scorched contract paper | Vial with cork, neck and round flask |

The approved drawings of the Mage and Grove Keeper headers and all seven number frames are the reference for shape and color. Palettes for Warrior, Hunter, Phantom, Priest and Pact Keeper are the builder's calls within the feel above.

## Number frames

- Chips that get a frame: Health, Physical Armor, Magical Armor, True Armor, Stamina, Mana (the vitals row), and Armor Class, Initiative, Speed, Critical Chance, Evasion, Resistance (Body) and Resistance (Mind) (the stat row).
- The frame sits behind the number only. The label, the − and + buttons, the bar and the small notes keep their current places.
- In the vitals row the number is an editable input (`cs-vital-num`). In the stat row it is a button that rolls or shows the math. Both stay fully usable with the frame behind them.
- The frame keeps a fixed size and proportion. A long number (three digits or a sign) shrinks its text to fit.
- Classic shows no frame.

## Constraints

- Readability: body text and numbers meet 4.5:1 contrast against their background in every theme. Labels at small sizes too.
- Phones: everything works at 390 px wide. Touch targets stay at least their current size.
- Motion: only the Mage sigil turns (slowly, about one turn a minute). All motion stops when the device asks for reduced motion.
- Print: every theme prints as plain black on white, as Classic does today.
- Weight: no image files. Ornaments, textures and frames are CSS and inline SVG. Only the active theme's fonts load.
- Keyboard focus stays clearly visible in every theme.

## Build notes

- Today about 180 colors are hard-coded in `character-sheet.css` (buttons, wax seal, tabs, inputs, rules). Classic needs these moved into theme variables first, with Classic's values unchanged, so the class themes can override them.
- The theme is already stored per character as `theme` and applied as `data-theme` on `.cs-wrap`. No data change is needed.
- Put the class themes in a new stylesheet (`character-sheet-themes.css`) loaded after `character-sheet.css`, so Classic stays readable on its own.
- The Rolls button and drawer, toasts, the pop-up (`cs-pop`) and the modal sit outside `.cs-wrap`, as siblings inside `#cs-app`. They do not inherit the theme today. `applyTheme()` needs to set the theme where they inherit it too (for example on `#cs-app`). The builder box (`.cs-wrap.cs-builder`) stays Classic, so theme rules must not reach it.
- Another session edited the sheet's CSS and JS early on November 27. Build on the current files.

## Left to the builder

- Exact palettes for the five themes without a drawing.
- Exact SVG paths for ornaments, badges and frames not drawn yet, following the drawings' style.
- Background textures (contour lines, bark grain, mist) as long as they stay faint behind text.

## Done when

- Each theme, opened on the example character, reads as its class at a glance on desktop and at 390 px.
- Classic looks the same as before.
- All text passes the contrast check, print is plain, and reduced motion stops the sigil.
