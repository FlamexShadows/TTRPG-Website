# Add Items Format

`tools/add_items.py` reads a Markdown file of items. For each item it:

1. Adds the item to the shop's list in `Webpages/shops-data.js`.
2. Writes an item page in `Webpages/`, named after the item (Potion of Flight becomes `potion-of-flight.html`).
3. Updates the item count in the shop page description.
4. Saves a copy of `shops-data.js` to `_archive/` first.

The shop page links the item name to its page.

## Run it

1. Write your items in `docs/items-to-add.md`.
2. Double-click `tools/Add Items.bat`. Or run `python tools/add_items.py`.
3. Add `--check` to test the file. Nothing changes.
4. Clear the finished items from `docs/items-to-add.md`. A second run reports every item as already in the shop and stops.

The script checks everything before it writes. One problem stops the whole run and lists every problem with its line number.

## The file

```
# Shop: Grand Elixirs

## Potion of Example
Price: 250 GP
Weight: 0.5 kg
Section: Potions
Rarity: Basic
Description: One paragraph of text. A line that follows continues the paragraph.

A blank line starts a new paragraph.
Effects:
- Note: Optional line for the character sheet.
```

- `# Shop:` sets the shop for every item below it. Use the shop name or its id. Write another `# Shop:` line to change shops.
- `## Name` starts an item. The name is the item name.
- Every other line is `Field: value`. Field names ignore capital letters.
- A `Shop:` line inside an item overrides the heading for that item.
- Lines that start with `>` or `<!--` are notes. The script skips them.

## Fields

| Field | Needed | Value |
|---|---|---|
| Price | Yes | A number with or without `GP`, such as `1,200 GP` or `0.5 GP`. Any other text, such as `Varies` or `See Desc`, shows as written and the item has no gold value. |
| Weight | No | Kilograms, such as `0.5 kg`. The shop card shows it, and the sheet counts it toward carrying weight. Leave it out or write `—` for no weight. |
| Description | Yes | The text on the shop card and the item page. |
| Section | When the shop has sections | Must match a section of the shop. |
| Rarity | No | Free text. Potions use Basic, Advanced and Exotic. |
| Power | When the shop uses power | `Faint`, `Glimmering`, `Exotic`, `Legendary`, `Mythic` or `Relic`. Only shops that use power accept it. |
| Slot | When the shop uses slots | The body slot, such as `Ring` or `Waist`. |
| Effects | No | One `- ` line per sheet effect. See `ITEM-EFFECTS.md`. |
| Page | No | `no` skips the item page. The default is a page. |
| Shop | No | Overrides the `# Shop:` heading. |

## Shops

| Name | Id | Sections | Power | Slot |
|---|---|---|---|---|
| General Store | general-store | none | no | no |
| General Smithing | general-smithing | Weapons, Armor, Shields, Smithing Gear | no | no |
| Grand Elixirs | grand-elixirs | Potion Ingredients, Potions | no | no |
| Marionette's Market | marionettes-market | none | yes | yes |
| Church | church | none | no | no |
| Cloud's Pet Shop | clouds-pet-shop | none | no | no |
| Black Market | black-market | none | no | no |
| Services | services | none | no | no |

The script lists the exact sections and powers when a value does not match.

## Examples

A potion. Potions leave Effects out. The sheet applies effects only to worn items and class features.

```
# Shop: Grand Elixirs

## Potion of Heroism
Price: 100 GP
Section: Potions
Rarity: Basic
Description: Upon consuming this potion you become Motivated for 1 hour.
```

A magic item with sheet effects.

```
# Shop: Marionette's Market

## Ring of the Ember Heart
Price: 4,000 GP
Slot: Ring
Power: Glimmering
Description: Your Mana maximum increases by 10 and you gain 5 fire resistance.
Effects:
- Mana +10
- Resist Fire +5
```

## Rules for the script

- Weapons, armor and shields also need an entry in `Webpages/character-sheet-data.js` (the `weapons`, `armor` or `shields` list) with the same name. Without it, the item reaches the inventory but the sheet has no stats to equip. The script does not write these entries.

- An item name already in the shop stops the run. Rename the item or remove the old one from `shops-data.js`.
- An existing page file not made by this script stops the run. This protects spell and rules pages. Rename the item or add `Page: no`.
- Items go to the end of the shop list.
- Descriptions use plain text. The script escapes angle brackets and ampersands.
