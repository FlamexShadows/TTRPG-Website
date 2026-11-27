# Item Effects Guide

The character sheet applies bonuses from magic items, class features, church blessings, and Other features on its own. Each bonus is one line of text called an effect.

## Add a new magic item

1. Open `shops-data.js` in VS Code.
2. Find the shop and add the item to its `"items"` list.
3. Give it an `"effects"` list with one line per bonus.

```json
{
 "name": "Ring of the Ember Heart",
 "price": "4,000 GP",
 "gp": 4000,
 "section": "",
 "slot": "Ring",
 "power": "Glimmering",
 "desc": "Your Mana maximum increases by 10 and you gain 5 fire resistance.",
 "effects": [
  "Mana +10",
  "Resist Fire +5"
 ]
}
```

Save the file. The shop shows the item, and the sheet applies its effects when a player equips it. Characters who already own an item with the same name pick up the new effects the next time they open the sheet.

- The sheet matches items by name. Capital letters do not matter. Spelling does.
- Put each effect in straight double quotes. Separate lines with commas. Leave no comma after the last line.
- An item with an `"effects"` list ignores the old guesswork from its description.
- An item with no `"effects"` list still gets the old guesswork from its description.

## The format

```
<target> <+ or - or => <amount> [when <situation>]
```

| Sign | Meaning |
|---|---|
| `+` | Adds the amount. |
| `-` | Subtracts the amount. |
| `=` | Sets a floor. The value rises to the amount when it is lower and stays put when it is higher. |

| Effect | Result |
|---|---|
| `Mana +5` | Maximum Mana goes up 5. |
| `Fortitude = 30` | Fortitude score becomes 30 unless it is already higher. |
| `AC -2` | AC goes down 2. |
| `Persuasion + level` | Persuasion goes up by character level. |
| `Magical Armor = Physical Armor / 2` | Magical Armor rises to half of Physical Armor. |
| `Fly = walk speed` | The character gains a fly speed equal to walk speed. |
| `Resist Fire +10` | Fire resistance goes up 10. |
| `Resist All +5` | Every damage resistance goes up 5. |
| `Immune Charmed` | Adds Charmed to the immunity list. |
| `Vulnerable Fire` | Adds Fire to the vulnerability list. |
| `Note: Dark Sight out to 30 meters.` | Shows the text. No math. |

## Targets

| Group | Targets |
|---|---|
| Stats | Strength, Finesse, Fortitude, Intelligence, Wits, Charisma, Memory, All Stats, Any Stat |
| Pools | Health, Mana, Stamina, Physical Armor, Magical Armor, True Armor |
| Defense | AC, Evasion, Resistance (Body), Resistance (Mind), All Saves |
| Combat | Initiative, Critical Chance, Attack, Damage, Melee Attack, Melee Damage, Ranged Attack, Ranged Damage |
| Chosen weapon | Chosen Weapon Attack, Chosen Weapon Damage, Chosen Weapon Critical Chance, Chosen Weapon Deadly, Chosen Weapon Enchanted, Chosen Weapon Decisive Dice |
| Every weapon | All Weapons Deadly, All Weapons Enchanted |
| Magic | Spell DC, Spell Attack, Maneuver DC, Maneuver Attack |
| Movement | Speed, Fly, Swim, Climb, Burrow (also written as Fly Speed and so on) |
| Skills | Any skill by its sheet name, such as Sneak or Knowledge (Arcane). All Skills, All Knowledge, Intimidate (both), Traverse (both). Stealth works as Sneak. |
| Other | Skill Ranks, Feats, Carrying Capacity, Armor Finesse Max, Armor Penalty Reduction, Ring Slots, Attunement Slots |
| Resistance | Resist plus any damage type, Resist Physical, Resist Magical, Resist All |

Attack and Damage apply to every weapon on the Combat tab. Melee and Ranged apply to weapons of that kind.

Chosen Weapon targets apply only to the weapon the player ticks as Chosen weapon on the Combat tab. One weapon at a time can be chosen. The Chosen weapon box shows once a feature uses one of these targets.

| Effect | Result |
|---|---|
| `Chosen Weapon Attack +2` | +2 to attack rolls with the chosen weapon. |
| `Chosen Weapon Deadly +1` | One more level of Deadly on the chosen weapon. Each level widens the decisive range by 1, so Deadly I means 19 to 20. |
| `Chosen Weapon Enchanted +1` | One more level of Enchanted. Each level ignores 5 resistance. |
| `Chosen Weapon Critical Chance = 100` | Every hit with the chosen weapon is a Critical Strike, and every roll in the decisive range is a Decisive Strike. |
| `Chosen Weapon Decisive Dice = 4` | Decisive Strikes with the chosen weapon multiply dice by 4 instead of 3. |
| `All Weapons Deadly +1` | One more level of Deadly on every weapon. |

## Amounts

An amount is a number or a short formula. Formulas use these words:

- `level`, `class level`, `half level`, `half class level`
- `Strength modifier` or plain `Strength`, and the same for every stat
- `Strength score` for the score itself
- `Physical Armor`, `Magical Armor`, `walk speed`
- `+ - * / ( )` and `floor( )`, `ceil( )`, `min( )`, `max( )`

The result always rounds down. `class level` means the level in the class the feature comes from. On items and Other features it means character level.

```
Initiative + 5 + floor((class level - 13) / 3)
Health + Fortitude modifier * 2
Speed + max(1, half level / 5)
```

## Choices

Put options in curly braces with a bar between them. The sheet shows a menu next to the item.

```
Resist {Fire|Cold|Air} +10
Knowledge ({Divine|Demonic}) +5
Any Stat +10
```

For two picks, write the line twice. Each line gets its own menu.

## Switches

End a line with `when` or `while` and a situation. The sheet shows a checkbox, off by default. The bonus applies only while the player ticks it.

```
Damage +2 while raging
Fly = walk speed when the boots are active
```

Use switches for anything with a trigger, a duration, or a daily use.

### Situations the sheet checks

These situations need no checkbox. The sheet reads them from the Combat tab and shows Active or Inactive.

| Situation | Active when |
|---|---|
| `wielding your chosen weapon` | A weapon is ticked as Chosen weapon and In hand. |
| `wearing light armor or no armor` | The armor is Light, or there is none. |
| `wearing no armor` | No armor is picked. |
| `wearing light armor`, `wearing medium armor`, `wearing heavy armor` | The armor is that type. |
| `wearing armor` | Any armor is picked. |
| `wielding a shield`, `not wielding a shield` | A shield is picked, or none is. |

### Situations that pick weapons

Attack, Damage, and Critical Chance lines with these situations apply to the matching weapons only.

| Situation | Weapons |
|---|---|
| `attacking unarmed` | Unarmed Strike and natural weapons. |
| `attacking with your chosen weapon` | The chosen weapon. |
| `attacking with a melee weapon`, `attacking with a ranged weapon` | Weapons of that kind. |
| `attacking with the <name>` | Weapons whose name or notes contain the name, such as `Damage +2 when attacking with the Thirsting Edge`. |

## Notes

Start a line with `Note:` for anything the sheet does not track, such as extra damage dice, senses, or once per day powers. Notes show under the item and on the Active effects list.

## Class features

Class and subclass features live in `character-sheet-data.js` under `"classes"`. Each feature takes the same `"effects"` list.

```json
{
 "level": 10,
 "name": "Overgrowth",
 "text": "...",
 "effects": [
  "Resist Poison +10",
  "AC +5",
  "Sneak +10"
 ]
}
```

The sheet applies a feature once the character reaches its level in that class. Effects from every reached feature add together. When a later feature raises the same bonus, give it only the increase.

## Magic weapon and armor traits

The sheet's forge builds magic weapons, armor, and shields. A player picks the item, a magical bonus from +1 to +10, and traits. The bonus adds to attack and damage on a weapon, or to AC and every save on armor and shields. The bonus is also the trait budget. Magic weapons, armor, and shields count as Miscellaneous items: each takes an attunement slot, and its magic works only while attuned. Prices come from the Magic Item +1 to +10 entries in shops-data.js.

The traits live in `character-sheet-data.js` under `"magicTraits"`. Each trait is one entry.

```json
{
 "name": "Flaming",
 "for": "weapon",
 "cost": 1,
 "perLevel": false,
 "extra": [{ "dice": "1d8", "type": "Fire" }],
 "note": "Sheds bright light 5 meters and dim light 5 more.",
 "text": "The full rules text."
}
```

| Field | Meaning |
|---|---|
| `for` | `weapon` or `armor`. Armor traits also go on shields. |
| `cost` | The magical bonus the trait spends. |
| `perLevel`, `maxLevel` | The trait takes levels. Cost and effect multiply by the level. |
| `only` | `melee` or `ranged`. The forge hides the trait on other weapons. |
| `requires` | Another trait the item needs first, such as `Enchanted`. |
| `atk` | Attack bonus per level. |
| `ench` | Enchanted levels per level. |
| `extra` | Damage dice on every hit. Never multiplied on critical or decisive strikes. |
| `vs` | Damage dice against a kind of creature. `{pick}` uses the player's choice. |
| `ignore` | A line shown on the weapon and under every roll. |
| `fx` | Effect lines in the format above. They work while the weapon is in hand or the armor is worn. |
| `choice` | The player types or picks an option. A `{Fire|Cold}` choice in `fx` becomes a menu. |
| `note` | Text for the weapon card. `{bonus}` is the magical bonus, `{half}` is half of it, `{pick}` is the choice. |
| `costNote` | A note shown with the cost. |

Weapon names follow the traits: `+1 Arming Sword of Accuracy`, `+7 Vorpal Unholy Arming Sword`. Players can type their own name in the forge.

## Church blessings and Other features

Buying a blessing in the shop copies its effects into Other features. Blessings bought before this update pick them up the first time the sheet opens.

Every equipped item and every Other feature has an Effects box on the sheet. Players type their own lines there for homebrew items, GM rewards, or temporary buffs. Item lines from the shop list stay in `shops-data.js` and do not show in the box.

## Check your work

1. Open the sheet and equip the item.
2. Open the Bonuses & Rules tab and look at Active effects.
3. A red chip means the sheet could not read the line. The text names the problem.
4. Tap any number on the sheet to see each part of its total.

| Message | Fix |
|---|---|
| does not know the target "Manna" | Fix the spelling. Use a name from the Targets table. |
| needs a target, then +, - or =, then an amount | Add a sign with a space before it: `Mana +5`, not `Mana 5`. |
| does not know the choice "Frost" | One option in the braces is not a target. Use `Cold`. |
| amount "2 * rank" does not know "rank" | The formula uses a word outside the Amounts list. |
| amount "floor(level / 2" is missing a ) | Close every bracket. |

`update_rules.py` only swaps old rule terms, so it leaves effects and magic traits alone.
