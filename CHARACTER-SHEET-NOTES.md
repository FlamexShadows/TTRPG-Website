# Character Sheet Notes

Built November 3, 2026 from Sparks (New).xlsx, the Basic Rules (revised November 3, 2026), and the class pages on this site.

## Files

All files live in `Webpages/`.

| File | Job |
|---|---|
| character-sheet.html | The page. Loads the shared header, styles.css, and the three scripts. |
| character-sheet.css | Sheet styles. Uses the colors and fonts from styles.css. |
| character-sheet-data.js | Game data: classes, races, weapons, armor, shields, traits, tools, skills, conditions, spells, maneuvers, feats. |
| character-sheet.js | The rules engine and the page itself. |
| shops-data.js | The shop lists. The sheet reads item effects from here. |

The old sheet files are in `_archive/character-sheet-v1/`.

## Saving

Characters save in the player's browser (localStorage) as they type. Each player can keep several characters and switch between them. Export gives a .json file or copyable text. Import reads either one, and also reads exports from the old sheet. Nothing goes to a server.

## Editing game data

Open character-sheet-data.js in VS Code. It is plain JSON after `window.SPARKS_DATA =`.

- New weapon: add an entry to `"weapons"` with name, die, traits, price, range, and type.
- New armor or shield: add to `"armor"` or `"shields"`.
- New spell, maneuver, or feat: add `[name, school, rank, page]` to `"spells"`, `[name, tier, page]` to `"maneuvers"`, or `[name, page]` to `"feats"`.
- Class tables and features come from the class pages. Edit `"classes"` to change them.

## Automatic effects

Added November 23, 2026. The sheet applies bonuses from equipped magic items, class features, church blessings, and Other features. Each bonus is one line of text, such as `Mana +5` or `Resist {Fire|Cold} +10`. ITEM-EFFECTS.md, next to this file, explains the format.

- Item effects live in the `"effects"` list of each item in shops-data.js. 105 Marionette's Market items and 10 church blessings carry them.
- Class feature effects live in the `"effects"` list of each feature in character-sheet-data.js. 44 features carry them.
- Choices show a menu and situational bonuses show a switch. Both save with the character.
- The Bonuses & Rules tab lists every active effect and flags any line the sheet cannot read.
- Items with no `"effects"` list still use the old description guesswork.

## Chosen weapon and magic item forge

Added November 24, 2026.

- Each weapon has an In hand box and, once a feature needs it, a Chosen weapon box. Ticking one chosen weapon unticks the others.
- Chosen Blade, The Righteous, Weapon Expert, and Ninja's Precision now apply to weapons. The Combat tab shows each weapon's decisive range, Critical Chance, and Enchanted level. Tap a number to see where it comes from.
- Forge a magic weapon (Weapons box) buys a new weapon with magic. Enchant on a weapon, armor, or shield adds magic to one the character has. Upgrades charge the price difference. Save without paying records loot.
- The magical bonus adds to attack and damage, or to AC and every save on armor and shields. Enchanted ignores 5 resistance per level.
- Magic weapons, armor, and shields count as Miscellaneous items. Each takes an attunement slot and works only while attuned. The Attunement box on the Gear tab lists them in the slots they fill. The forge attunes new gear when a slot is free. Ticking Attuned with every slot full is refused. Traits add attack bonuses, Enchanted levels, extra dice, dice against creature types, ignore lines, and effects such as Spell DC +1 or Health +10.
- Attack rolls use the weapon's decisive range and Critical Chance, roll magic dice once without multiplying them, and list Enchanted and ignore lines.
- The magic works only on the item it was made for. Switching a weapon or armor keeps the magic stored until the player picks that item again.
- Magic Item +1 to +10 in the shops links to the forge.

## Rules the sheet follows where the Google Sheet differed

Each of these has a switch on the Bonuses & Rules tab, per character.

| Value | Basic Rules (default) | Google Sheet |
|---|---|---|
| Physical and Magical Armor | 5 × modifier | 10 × modifier |
| AC with no armor | 10 + Finesse modifier | Finesse modifier only |
| Initiative | d20 + Wits | d20 + Finesse |
| Survival | Wits | Finesse |
| Critical Chance | Wits score | Wits base score only |
| Weapon attack stat | Higher of Str or Fin | Finesse checkbox per weapon |
| Racial stat bonuses | Added automatically | Typed into Base |
| Maneuver attack | Stat modifier only | Stat modifier only |

## Google Sheet bugs fixed

- Carrying capacity read the Strength primary bonus cell (C13), not the Strength score.
- Weapons 2 to 4 used weapon 1's Finesse checkbox for damage.
- With no armor, AC dropped the shield and the AC bonus.
- Resistance (Mind) had "Pack Keeper" for class 1, so Pact Keepers got no Mind save bonus from class 1.
- The class 2 save formulas checked class 1 for Priest (Mind) and Phantom (Body).
- Tool rows 2 to 10 subtracted the wrong cell for the Lockpicking Kit penalty.

## Questions for you

- Priest Mana: the class page gives 4 per level. The Google Sheet gives 3. The sheet uses the class page.
- Warrior Stamina: the class chart shows 40 at level 20 and 42 at level 21. The sheet uses 20 and 21.
- Priest level 15: the chart says Trance of Mercy, the feature text says Trance of Guidance.
- Robes (AC 5), Lamellar (8), and Shadowcloak (8) give less AC than no armor under the Basic Rules formula.
- The Piercing weapon trait (spend 2 AP for true damage) shares its name with the Piercing damage type. A rename such as Armor Piercing would help.
- Weapon damage types: the Equipment tab lists every weapon as Physical. The sheet assigns Piercing, Slashing, or Bludgeoning to each, and players can change it per weapon.
- Shield weights: Buckler 10 kg, Kite Shield 5 kg, Round Shield 1 kg look reversed. Rondache, Tower Shield, and Spiked Shield have no price or weight.
- Maneuver attack: the Basic Rules do not say whether it adds level.
- Transmuting lists no magical bonus cost. The sheet counts it as +1.
- Greater Storing was listed at +1. Fixed to +3 on the magic traits page and the sheet, above Storing at +2.
