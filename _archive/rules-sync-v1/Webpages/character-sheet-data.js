/* Sparks of Dynasty character sheet: game data.
   Generated from the Basic Rules (Nov 3, 2026), the class pages, and Sparks (New).xlsx.
   Edit this file to add weapons, armor, races, or spells. The sheet reads it on load. */
window.SPARKS_DATA = {
 "version": "2026-11-03",
 "stats": [
  {
   "key": "str",
   "name": "Strength",
   "abbr": "STR"
  },
  {
   "key": "fin",
   "name": "Finesse",
   "abbr": "FIN"
  },
  {
   "key": "fort",
   "name": "Fortitude",
   "abbr": "FORT"
  },
  {
   "key": "cha",
   "name": "Charisma",
   "abbr": "CHA"
  },
  {
   "key": "wits",
   "name": "Wits",
   "abbr": "WITS"
  },
  {
   "key": "int",
   "name": "Intelligence",
   "abbr": "INT"
  },
  {
   "key": "mem",
   "name": "Memory",
   "abbr": "MEM"
  }
 ],
 "levels": [
  {
   "level": 1,
   "points": 2,
   "spell": "Minor",
   "maneuver": "Tier 1",
   "feats": "1",
   "xp": 0
  },
  {
   "level": 2,
   "points": 3,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 500
  },
  {
   "level": 3,
   "points": 4,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 1000
  },
  {
   "level": 4,
   "points": 5,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 1500
  },
  {
   "level": 5,
   "points": 6,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 2500
  },
  {
   "level": 6,
   "points": 8,
   "spell": "",
   "maneuver": "",
   "feats": "2",
   "xp": 5000
  },
  {
   "level": 7,
   "points": 10,
   "spell": "Adept",
   "maneuver": "Tier 2",
   "feats": "-",
   "xp": 8000
  },
  {
   "level": 8,
   "points": 12,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 11000
  },
  {
   "level": 9,
   "points": 14,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 15000
  },
  {
   "level": 10,
   "points": 16,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 20000
  },
  {
   "level": 11,
   "points": 18,
   "spell": "",
   "maneuver": "",
   "feats": "3",
   "xp": 30000
  },
  {
   "level": 12,
   "points": 20,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 45000
  },
  {
   "level": 13,
   "points": 22,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 60000
  },
  {
   "level": 14,
   "points": 24,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 100000
  },
  {
   "level": 15,
   "points": 27,
   "spell": "Major",
   "maneuver": "Tier 3",
   "feats": "-",
   "xp": 145000
  },
  {
   "level": 16,
   "points": 30,
   "spell": "",
   "maneuver": "",
   "feats": "4",
   "xp": 205000
  },
  {
   "level": 17,
   "points": 33,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 280000
  },
  {
   "level": 18,
   "points": 36,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 380000
  },
  {
   "level": 19,
   "points": 39,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 500000
  },
  {
   "level": 20,
   "points": 42,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 750000
  },
  {
   "level": 21,
   "points": 45,
   "spell": "Grand",
   "maneuver": "Tier 4",
   "feats": "5",
   "xp": 1050000
  },
  {
   "level": 22,
   "points": 48,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 1450000
  },
  {
   "level": 23,
   "points": 51,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 2050000
  },
  {
   "level": 24,
   "points": 54,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 2850000
  },
  {
   "level": 25,
   "points": 57,
   "spell": "",
   "maneuver": "",
   "feats": "-",
   "xp": 3850000
  }
 ],
 "featsByLevel": [
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  5
 ],
 "classes": {
  "Warrior": {
   "page": "warrior.html",
   "resource": "stamina",
   "slotType": "maneuver",
   "hitDie": 10,
   "primary": "str",
   "secondary": "fort",
   "saves": {
    "mind": "Poor",
    "body": "Good",
    "evasion": "Average"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25
   ],
   "slots": [
    4,
    4,
    4,
    6,
    6,
    6,
    8,
    8,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    12,
    12,
    14,
    16,
    16,
    16,
    16,
    16
   ],
   "skillRanks": [
    3,
    3,
    3,
    6,
    6,
    6,
    9,
    9,
    9,
    12,
    12,
    12,
    15,
    15,
    15,
    18,
    18,
    18,
    21,
    21,
    21,
    24,
    24,
    24,
    27
   ],
   "prof": [
    "3 Weapons (1 can be skilled)",
    "Shields"
   ],
   "features": [
    {
     "name": "Armored",
     "level": 1,
     "text": "Starting at 1st level a warrior gains proficiency in all armor and can wield a shield or heavy weapon while wearing heavy armor."
    },
    {
     "name": "Weapon Expert",
     "level": 5,
     "text": "Starting at 5th level the warrior adds or gains a level of deadly on all weapons they wield."
    },
    {
     "name": "Extra Feat",
     "level": 9,
     "text": "(See the class page.)"
    },
    {
     "name": "Till the End",
     "level": 10,
     "text": "Starting at 10th level when a warrior takes damage that results in them reaching 0 health they may choose to spend 5 stamina to regain a number of hit points equal to their level if not killed."
    },
    {
     "name": "Magic Protection",
     "level": 15,
     "text": "Starting at 15th level a warrior's maximum magic armor becomes half of their maximum physical armor if lower."
    },
    {
     "name": "Destined Champion",
     "level": 20,
     "text": "Starting at 20th level a warrior becomes immune to the Fearful and Hopeless conditions. In addition when a warrior uses a basic or advanced martial maneuver it no longer costs stamina."
    },
    {
     "name": "Fabled",
     "level": 25,
     "text": "Starting at 25th level a warrior is renown in the world. The warrior's maximum AP increases to 8. In addition the warrior becomes Immune to AP drain effects.\n\nor\n\nThe warrior's magical armor is equal to their physical armor if lower and gains an extra 2 reactions per round."
    }
   ],
   "subclasses": {
    "The Righteous": [
     {
      "name": "Divine Might",
      "level": 1,
      "text": "Starting at 1st level The Righteous may choose 3 Minor Heavenly Spells. The Righteous may cast these spells three times per full rest. The same spell may be cast more than once but the total castings of these spells may not exceed three."
     },
     {
      "name": "Retribution",
      "level": 3,
      "text": "Starting at 3rd level The Righteous gains a special combat maneuver called \"Retribution\".\n\nName: Retribution\nTier: Basic\nAP: 4\nRequirements: Weapon\nType: Attack\nDuration: Instant\nConcentration: No\n\nThe martialist imbues an attack with the will of their god allowing them to strike true. Upon a successful hit on a creature or object they struck takes an additional 2d6 True damage. If the target is a creature who is evil aligned this damage increases to 4d6 and the martialist gains a +5 bonus to their attack roll. Retribution may be used with other Martial Maneuvers in the same attack."
     },
     {
      "name": "Chosen Weapon",
      "level": 8,
      "text": "Starting at 8th level when The Righteous wields their deities chosen weapon they may carve holy symbols into it and preform a ritual. After the ritual the weapon becomes sentient Possessing Intelligence, Charisma, and Wits equal to the warriors level. When attacking or making a check while the weapon is in The Righteous who made it possession they may use any of its statistics in place of their own. The sword knows Enochian and Universal and may speak with The Righteous telepathically when worn or carried by them."
     },
     {
      "name": "Fear no Evil",
      "level": 13,
      "text": "Starting at 13th level The Righteous gains the ability to resist the presence of evil. When a spell or effect that causes possession, charm, or cursed The Righteous may add its level to the resistance check."
     },
     {
      "name": "Greater Divine Might",
      "level": 18,
      "text": "Starting at 18th level The Righteous may pick 3 Adept Heavenly Spells and add them to the Divine Might list and the limit of Divine Might spells becomes equal to their fortitude modifier."
     },
     {
      "name": "Divine Might",
      "level": 23,
      "text": "Starting at 23rd level The Righteous gains 5 levels in overpower. In addition The Righteous's chosen weapon is imbued with greater power. The weapon gains an additional +5 to Intelligence. Wits, and Charisma and gains an additional level of enchanted and deadly."
     }
    ],
    "Twin Blades": [
     {
      "name": "It's Nothing",
      "level": 1,
      "text": "Starting at 1st level the Twin Blades gains the ability to dual wield weapons with the two handed property."
     },
     {
      "name": "Adjusted",
      "level": 3,
      "text": "Starting at 3rd level the Twin Blades ignores the dual wielding movement penalty."
     },
     {
      "name": "Flurry",
      "level": 8,
      "text": "Starting at 8th level the Twin Blade creates a flurry of attacks that can overwhelm even the most defensive foes. Twice per day for 4 AP the Twin Blades can preform a flurry of attacks equal to half the Twin Blades strength modifier. Each attack deals 1d6+half strength modifier damage."
     },
     {
      "name": "Heavy Weapon Wielder",
      "level": 13,
      "text": "Starting at 13th level the Twin Blades gains the ability to dual wield weapons with the heavy property."
     },
     {
      "name": "Deceptive Tactics",
      "level": 18,
      "text": "Starting at 18th level the Twin Blades gains the ability to feint attacks with ease. The Twin Blades gains the feint Combat Maneuver if they don’t already posses it. In addition when using the feint Combat Maneuver while dual wielding it no longer costs any stamina and the +5 bonus is maintained if they miss their target."
     },
     {
      "name": "Onslaught",
      "level": 23,
      "text": "Starting at 23rd level when dual wielding heavy weapons they gain the ability to follow through on attacks with ease. Whenever the Twin Blades lands an attack action the damage of the next offhand attack is no longer halved."
     }
    ],
    "Warlord": [
     {
      "name": "Outflank",
      "level": 1,
      "text": "Starting at 1st level the warlord is adept out outflanking their enemies. For each ally in melee range while flanking a creature grants an additional +1 bonus to attack rolls."
     },
     {
      "name": "Warlord's Order",
      "level": 3,
      "text": "Starting at 3rd level the warlord gains the ability to command their allies in battle. The warlord gains a basic combat maneuver called Warlord’s order.\n\nName: Warlord’s Order\nTier: Basic\nAP: 1\nRequirements: Ability to speak\nType: Support\nConcentration: No\n\nThe warlord issues an assertive command to a creature within 15 meters of themselves. The creature may use it's reaction if available to follow the command. The command may be one of as follows.\n\nAttack\nThe creature makes one attack on another.\n\nReposition\nThe creature moves 1 AP worth of movement without provoking OA.\n\nDefend\nIf the creature is using a medium or larger shield, the creature defends another ally in range granting it a bonus to its AC equal to its level against the next attack made against it."
     },
     {
      "name": "Diplomat",
      "level": 8,
      "text": "Starting at 8th level a Warlord becomes an adept leader in battle. The warlord their charisma on the battlefield leads to greater diplomacy. The warlord gains levels in the persuasion skill equal to their level."
     },
     {
      "name": "Duel",
      "level": 13,
      "text": "Starting at 13th level the warlord gains the ability to challenge others to issue a duel. If accepted the warlord gains a +5 bonus to all attack, resistance, and evasion checks for the next minute as long as the duel remains honorable. If the enemy breaks this duel the bonuses are extended to 1 week against that creature and increase to +10. If an enemy leader refuses a duel any minions become fearful of the warlord for 1 minute."
     },
     {
      "name": "Enduring",
      "level": 18,
      "text": "Starting at 18th level the warlord learns to raise the morale of their allies. Twice per day for 2 AP, the warlord can remove the fearful or hopeless condition on all allies that can hear them within 10 meters of themselves."
     },
     {
      "name": "Onslaught",
      "level": 23,
      "text": "Starting at 23rd level the warlord fills their allies with blood lust. Once per day, a number of creatures equal to the warlords charisma modifier within 10 meters of themselves are granted advantage on all attack rolls for the next minute."
     }
    ],
    "Chosen Blade": [
     {
      "name": "Focused Training",
      "level": 1,
      "text": "Starting at 1st level the Blade Master gains the ability to wield a single weapon with deadly precision The Blade Master spends their whole life training with one weapon from childhood which becomes their chosen weapon. The Blade Master gains a +2 bonus to attack rolls with their weapon of choice."
     },
     {
      "name": "Blade Master's Strike",
      "level": 3,
      "text": "Starting at 3rd level the Blade Master gains an additional level of deadly, with their chosen weapon and a +5 bonus to the critical chance made with its chosen weapon."
     },
     {
      "name": "Blade Master's Defense",
      "level": 8,
      "text": "Starting at 8th level the Blade Master gains a +5 bonus to their AC when wielding their chosen weapon."
     },
     {
      "name": "Last Stand",
      "level": 13,
      "text": "Starting at 13th level the Blade Master masters the ability to strike with precision and power. The Blade Master gains the ability to combine their strength and finesse bonus to a number of their attack rolls with their chosen weapon a number of times a day equal to their level."
     },
     {
      "name": "Blade Master's Bond",
      "level": 18,
      "text": "Starting at 18th level the Blade Master gains the ability to bond their mana with chosen weapon. The Chosen Blade gains a level of enchanted and becomes magical."
     },
     {
      "name": "A Legend Was Born",
      "level": 23,
      "text": "Starting at 23rd level the Chosen Blade become that legends. The blade gains an additional 2 levels of Enchanted and Deadly. In addition the Chosen Blade's chosen weapon automatically confirms its critical chance. It's decisive strikes deals x4 dice."
     }
    ],
    "Eldritch Champion": [
     {
      "name": "Dark Heart",
      "level": 1,
      "text": "Starting at 1st level the Eldritch Champion gains a +2 bonus to avoid the frightened and hopeless condition."
     },
     {
      "name": "Eldritch Blade",
      "level": 3,
      "text": "Everlasting Wound Starting at 3rd level Eldritch Champion gains a special combat maneuver called \"Everlasting Wound\".\n\nName: Everlasting Wound\nTier: Basic\nAP: 1\nRequirements: Weapon\nType: Enhancement\nDuration: 1 Minute\nConcentration: No\n\nThe martialist fuels its blade with ancient cursed knowledge. If the martial hits a creature within its duration, the target must succeed a Resistance (Body) check or take 2d10 damage at the start of their next turn."
     },
     {
      "name": "Strange Anatomy",
      "level": 8,
      "text": "Starting at 8th level, Any creature that attacks the Eldritch Champion has its critical chance reduced by 10 and gains 5 Physical Resistance."
     },
     {
      "name": "Caustic Blood",
      "level": 13,
      "text": "Starting at 13th level, when the Eldritch Champion takes damage from a melee attack, the attacker takes 1d6 poison damage."
     },
     {
      "name": "Grasp of the Beyond",
      "level": 18,
      "text": "Starting at 18th level the Eldritch Champion once per day, causes a field of slimy black tentacles to appear, emerging from the ground and reaching for any creature in 5 meter radius sphere.\nEvery creature within the area of the spell is the target as the tentacles must succeed a Overpower check to avoid being grappled for 1 minute. The tentacles have 18 AC and 15 Health. Tentacles disappear if they do not grapple a creature. The tentacles can levitate if moved to fly across a chasm. A creature may repeat this check for 3 AP. The Eldrich Champion can spend 1 AP to move a tentacle 5 meters or release a grappled creature."
     },
     {
      "name": "Soul Eater",
      "level": 23,
      "text": "Starting at 23rd level the Eldritch Champion gains the ability to consume the souls of their enemies. When the Eldritch Champion kills a creature with a melee attack, they gain 10 true armor and 1d10 stamina."
     }
    ],
    "Phoenix Knight": [
     {
      "name": "Everbright Sight",
      "level": 1,
      "text": "Starting at 1st level the Phoenix Knight gains 30 meters of darksight."
     },
     {
      "name": "Flaming Fury",
      "level": 3,
      "text": "Starting at 3rd level the Phoenix Knight gains the ability to rage twice per full rest. While raging all creature within 5 meters of the Phoenix Knight take 2d6 fire damage at the start of each of their turns. This damage increases by 1d6 every 2 levels."
     },
     {
      "name": "Phoenix's Wings",
      "level": 8,
      "text": "Starting at 8th level the Phoenix Knight gains wings of fire granting them a fly speed of 7 and Resistance 10 to fire."
     },
     {
      "name": "Everburning Resolve",
      "level": 13,
      "text": "Starting at 13th level, when the Phoenix Knight uses till the end a burst of fire erupts from them. All creatures of the Phoenix Knight's choice within 5 meters of the Phoenix Knight must succeed on a Evasion check or take 5d6 fire damage."
     },
     {
      "name": "Healing Blood",
      "level": 18,
      "text": "Starting at 18th level the Phoenix Knight gains the ability to heal themselves with their own blood. When the Phoenix Knight takes damage, all allied creatures deal 1 health."
     },
     {
      "name": "Phoenix's Flame",
      "level": 23,
      "text": "Starting at 23rd level the Phoenix Knight gains the ability to become a being of pure flame. Once per day the Phoenix Knight may transform into a Phoenix for 1 minute. While in this form the Phoenix Knight gains immunity to fire damage and 10 resistance to all damage types and deals an additional 4d8 fire damage with all attacks. In addition the phoenix knight's fire damage ignores resistance to fire damage"
     }
    ]
   }
  },
  "Mage": {
   "page": "mage.html",
   "resource": "mana",
   "slotType": "spell",
   "hitDie": 4,
   "primary": "int",
   "secondary": "mem",
   "saves": {
    "mind": "Good",
    "body": "Poor",
    "evasion": "Average"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    68,
    72,
    76,
    80,
    84,
    88,
    92,
    96,
    100
   ],
   "slots": [
    10,
    10,
    10,
    12,
    12,
    12,
    14,
    14,
    14,
    14,
    14,
    16,
    16,
    16,
    18,
    18,
    18,
    18,
    18,
    20,
    22,
    22,
    22,
    22,
    22
   ],
   "skillRanks": [
    2,
    2,
    2,
    4,
    4,
    4,
    6,
    6,
    6,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    14,
    14,
    14,
    16,
    16,
    16,
    18
   ],
   "prof": [
    "Access to Arcanomancy Tree",
    "Light Armor",
    "Mathematics Toolkit",
    "1 Melee Weapon"
   ],
   "features": [
    {
     "name": "Arcane Focus",
     "level": 1,
     "text": "Starting at 1st level a Mage gains a source charged item allowing the refueling of mana. The mage gains a pool of focus that allows the mage to restore mana to a creature. The pool equals half the level of the mage (minimum 1) and for 2 AP the mage may expend focus to restore mana to a creature within 20 meters of itself it can see. For each point of the pool expended the creature regains 10 Mana or 5 Stamina. The arcane pool recharges on a full rest."
    },
    {
     "name": "Elements of Chaos",
     "level": 5,
     "text": "Starting at 5th level the Mage gains the ability to control the chaos of spells they create. Any creature of the mage's choice that is effected by a spell they cast may be treated as if they have magical armor."
    },
    {
     "name": "Arcane Protection",
     "level": 10,
     "text": "Starting at 10th level the Mage gains the ability to create an arcane ward protecting allies within 10 meters or themselves. As a reaction a number of times equal to its intelligence modifier the mage creates a translucent shield of magical armor equal to the mage levels a character holds."
    },
    {
     "name": "Converging Secrets",
     "level": 15,
     "text": "Starting at 15th level the Mage gains the ability to read any scroll and can identify magic items and a potions at a glance no longer requiring checks or AP."
    },
    {
     "name": "Arcane Deviance",
     "level": 20,
     "text": "Starting at 20th level any spell cast by a Mage has its duration increased by 1 step."
    },
    {
     "name": "Indulgence of Mana",
     "level": 25,
     "text": "Starting at 25th level when a Mage kills a creature with a spell it regains mana equal to the creatures threat rating or level whichever is higher."
    }
   ],
   "subclasses": {
    "Elementalist": [
     {
      "name": "Elemental Focus",
      "level": 1,
      "text": "Starting at 1st level the mage specializes in a school of magic. When rolling for damage using the selected school the mage may reroll any 1s on the die. The new roll must be used even if it rolls another 1."
     },
     {
      "name": "Schools",
      "level": 3,
      "text": "Pyromancy\nCryomancy\nGeomancy\nAeromancy\nElemental Channeling\nStarting at 3rd level the Elementalist learns to channel the energy of the selected school to gain additional effects. When casting a spell from their selected school they gain the following effects\n\nPyromancy\nFire damage inflicted by spells is increased by a die size. D4's turn into d6, d6 turn into d8 etc\n\nCryomancy\nAny effect that applies the Frozen or Freezing condition is extended by 1 round\n\nGeomancy\nAny effect that deals earth damage and applies the pinned or crippled condition is extended by 1 round\n\nAeromancy\nAny effect that applies the shocked or stunned condition is extended by one round"
     },
     {
      "name": "Prolonged Exposure",
      "level": 8,
      "text": "Starting at 8th level the mages extended exposure to the elements they wield gain resistance to its elements.\n\nPyromancy\n+5 to checks to avoid burning\n\nCryomancy\n+5 to checks to avoid frozen and freezing\n\nGeomancy\n+5 to checks to avoid crippled and pinned\n\nAeromancy\n+5 to avoid or shocked"
     },
     {
      "name": "New Horizons",
      "level": 13,
      "text": "Starting at 13th level an Elementalist gains the ability to pick a second element to master"
     },
     {
      "name": "No Escape",
      "level": 18,
      "text": "Starting at 18th level the Elementalist gains the ability to aim spells with deadly precision. Spells that deal no damage on a successful check now deal half damage instead."
     },
     {
      "name": "Elemental Mastery",
      "level": 23,
      "text": "Starting at 23rd level an Elementalist gains immunity to damage dealt by a school they mastered."
     }
    ],
    "Battle Mage": [
     {
      "name": "Arcane Swordsmanship",
      "level": 1,
      "text": "Starting at 1st level a mage becomes proficient in 2 melee weapons, medium and light armor."
     },
     {
      "name": "Martial Training",
      "level": 3,
      "text": "Starting at 3rd level a Battle Mage becomes adept in martial skills. They may choose 2 basic marital maneuvers and preform them twice each per full rest."
     },
     {
      "name": "Enhanced Endurance",
      "level": 8,
      "text": "Starting at 8th level Battle Mage may use its Memory score for physical armor instead of fortitude."
     },
     {
      "name": "Steadfast",
      "level": 13,
      "text": "Starting at 13th level when a battle mage uses Arcane Protection they can instead make it function as Physical Armor."
     },
     {
      "name": "Flicker Step",
      "level": 18,
      "text": "Starting at 18th Level a Battle Mage enhance a its speed. The mage chooses 2 creatures it can see within 10 meters of itself. The Battle Mage makes one melee attack at each target dealing an additional 8d12 physical damage. The Battle Mage appears 1 meter adjacent next to the second target."
     },
     {
      "name": "Advanced Martial Training",
      "level": 23,
      "text": "Starting at 23rd level a Battle Mage gains the ability to learn 2 additional advanced combat maneuvers and may perform them a number of times equal to their Memory modifier."
     }
    ],
    "Mystic": [
     {
      "name": "Awakening",
      "level": 1,
      "text": "Starting at 1st level a Mage gains the ability to awaken the mind of a creature to its inner source within 20 meters of itself for 2 AP a number of times equal to its memory modifier. The creature gains a 1d4 bonus to its next roll. This bonus increases by an additional 1d4 every 5 levels by"
     },
     {
      "name": "Psychic Surge",
      "level": 3,
      "text": "Starting at 3rd level a Mystic gains the ability to channel the energy of the mind to gain additional effects. When casting a spell the Mystic may choose to add their Memory score to the damage rolled."
     },
     {
      "name": "Telepathy",
      "level": 8,
      "text": "Starting at 8th level a Mystic gains the ability to communicate telepathically with any creature within 20 meters of itself. The creature need not understand the Mystic but must speak at least one language"
     },
     {
      "name": "Mind Over Matter",
      "level": 13,
      "text": "Starting at 13th level once per day as a reaction, a Mystic gains the ability to add their Memory modifier to any check or save a creature within 10 meters of them makes."
     },
     {
      "name": "Levitation",
      "level": 18,
      "text": "Starting at 18th level a Mystic gains the ability to levitate gaining a fly speed 8."
     },
     {
      "name": "Silence Thoughts",
      "level": 23,
      "text": "Starting at 23rd level a Mystic gains the ability to silence the thoughts of all creatures of their choice within 20 meters of itself. The creature must make a Resistance Mind save or become severed for 1 minute. A creature may repeat its save at the start of each of its turns."
     }
    ],
    "Arcane Soul": [
     {
      "name": "Mana Overflow",
      "level": 1,
      "text": "Starting at 1st level the Arcane Soul born with abundant source and gains an additional 3 mana each level."
     },
     {
      "name": "Magic Sensitivity",
      "level": 3,
      "text": "Starting at 3rd level the Arcane Soul gains the ability to sense the source of creatures. The Arcane Soul may use an action to sense the source of all creatures within 20 meters of itself. All creatures must make a Resistance Mind save or the Arcane Soul learns the creatures highest magic tier and current location becoming immune to the unaware condition from any creature that failed for the next hour. If the creature is 2 tiers higher than the Arcane Soul the Arcane Soul must succeed on a Resistance Mind check or become Nauseated until the end of its next turn."
     },
     {
      "name": "Mana Overload",
      "level": 8,
      "text": "Starting at 8th level the Arcane Soul gains the ability to overload the spell a creature is casting. As a reaction the Arcane Soul can spend an amount any amount of mana on the spell being cast to potentially causing it to explode. The target must succeed on a DC 10+Mana spent Resistance Mind check or take 10d6 magic damage and be Shoved 5 meters away from the Arcane Soul. On a successful check the creature casts the spell as normal. If the target fails its check all other creatures within 1 meter of it must succeed an Evasion check or 5d6 magic damage and be shoved away from the target 1 meter."
     },
     {
      "name": "Improved Mana Overflow",
      "level": 13,
      "text": "Starting at 13th level the Arcane Soul gains the ability to upcast spells a level above their current tier. Each time the Arcane Soul upcasts a spell above their current tier they gain the tired condition."
     },
     {
      "name": "Source Instability",
      "level": 18,
      "text": "Starting at 18th level the Arcane Soul gains the ability to manipulate the mana of creatures. A number of times per day equal to its memory, the Arcane Soul force a creature within 5 meters of itself to make a Resistance Mind save or become unstable. On a failure the creature takes 2d10 for every 10 stamina or 1d12 for every 10 mana the creature has currently."
     },
     {
      "name": "Arcane Resonance",
      "level": 23,
      "text": "Starting at 23rd level the Arcane Soul gains the ability to concentrate on two spells at once. If the Arcane Soul's concentration is broken they loose concentration on both spells."
     }
    ],
    "Rune Scholar": [
     {
      "name": "Rune Casting",
      "level": 1,
      "text": "Starting at 1st level the Rune Scholar gains the ability to store minor spells using runes. The Rune Scholar gains a number of runes equal to its memory modifier. The Rune Scholar may expend a rune to cast a spell without using mana. The Rune Scholar regain all runes on a full rest. In addition they gain the proficiency in the calligraphy toolkit"
     },
     {
      "name": "Magic Infusion",
      "level": 3,
      "text": "Starting at 3rd level the Rune Scholar gains the ability to create magic items for half the price and spending 1 week of downtime for every 500 gold of the item. Crafting magic items still requires proficiency in relevant tools."
     },
     {
      "name": "Improved Rune Casting",
      "level": 8,
      "text": "Starting at 8th level the Rune Scholar gains the ability to store adept spells using runes. The Rune Scholar gains a number of adept runes uses double the space of minor runes."
     },
     {
      "name": "Runic Bombs",
      "level": 13,
      "text": "Starting at 13th level the Rune Scholar gains the ability to create a bomb using a rune. The Rune Scholar may expend a rune to create a bomb and throw it within 10 meters of themselves. All creatures in within 3 meters of rune must success on an Evasion check or take 8d6 magic damage or half as much on a success."
     },
     {
      "name": "Runic Mastery",
      "level": 18,
      "text": "Starting at 18th level the Rune Scholar gains the ability to store major spells using runes. The Rune Scholar gains a number of major runes uses triple the space of minor runes."
     },
     {
      "name": "Lord of Inscription",
      "level": 23,
      "text": "Starting at 23rd level the Rune Scholar gains the ability to cast spells from scroll using 2 AP and can read all languages."
     }
    ],
    "Alchemist": [
     {
      "name": "Apothecary",
      "level": 1,
      "text": "Starting at 1st level the Alchemist creates a number of fleeting health potions equal to its memory modifier. The Alchemist may expend a potion to restore 1d8+int modifier health to a creature. All potions made this way lose potency after 24 hours."
     },
     {
      "name": "Formula Book",
      "level": 3,
      "text": "Starting at 3rd level the Alchemist keeps a formula book with various alternatives for various potions. An Alchemist may substitute any ingredient in potions with a cheaper alternative for one tenth the price."
     },
     {
      "name": "Shared Potions",
      "level": 8,
      "text": "Starting at 8th level the Alchemist gains the ability to share potions with a creature. Whenever the Alchemist drinks a potion they can grant its benefit to a creature of their choice within 5 meters."
     },
     {
      "name": "Improved Formula Book",
      "level": 13,
      "text": "Starting at 13th level when the Alchemist casts a spell that requires a costly material component the Alchemist only a component half the price of the original"
     },
     {
      "name": "Alchemical Savant",
      "level": 18,
      "text": "Starting at 18th level the Alchemist gains the ability to create a potion that can be used as a spell. The Alchemist may expend a potion to cast a spell without using mana. The Alchemist may only use this feature once per full rest."
     },
     {
      "name": "Master Apothecary",
      "level": 23,
      "text": "Starting at 23rd level the Alchemist gains the ability to create any one potion for free once per full rest."
     }
    ],
    "Corpse Caller": [
     {
      "name": "Corpse Mimicry",
      "level": 1,
      "text": "Starting at 1st level the Corpse Caller gains the ability to steal the appearance of a dead humanoid it touches for 24 hours."
     },
     {
      "name": "Necrotic Infusion",
      "level": 3,
      "text": "Starting at 3rd level a number of times equal to the Corpse Caller wit's modifier they infuse a creature with necrotic energy. The Corpse Caller may expend 2 AP to infuse a creature within 10 meters of itself. The creature gains 1d4 physical damage to all attacks for 1 minute. This damage increases by 1d4 for every 5 levels."
     },
     {
      "name": "Dead Man's Tale",
      "level": 8,
      "text": "Starting at 8th level the Corpse Caller gains the ability to speak with the dead. The Corpse Caller may conduct a 1 minute ritual to speak with a dead creature within 1 meter of itself. The Corpse Caller may ask the creature 1 question per level. The creature is not compelled to tell the truth and can refuse to answer."
     },
     {
      "name": "Bone Weaver",
      "level": 13,
      "text": "Starting at 13th level the Corpse Caller no longer needs dead bodies to make undead and can cast mimic life without expanding mana once per day."
     },
     {
      "name": "Spirit Shepherd",
      "level": 18,
      "text": "Starting at 18th level the Corpse Caller gains the ability assert control over undead that are close to it. The Corpse Caller chooses an undead within 10 meters of itself and it must succeed a Resistance Mind check or fall under its control. If the undead is commanded by another creature it instead rolls a contested intelligence check against the undead's puppeteer. If the creature succsseds on its check or the Corpse Caller loses its contested roll the the puppeteers the undead or puppeteers minions are immune to this Corpse Caller's ability. A Corpse Caller may have undead up to its memory modifier under its control at once."
     },
     {
      "name": "Hunger of the Dead",
      "level": 23,
      "text": "Starting at 23rd level the Corpse Caller gains the ability to inflict the hunger of a ghoul onto all other creatures. All creatures of the Corpse Caller's choice must succeed on a Resistance Mind check or become insane attacking the nearest creature for 1 minute. A creature may repeat its save at the end of each of its turns."
     }
    ]
   }
  },
  "Hunter": {
   "page": "hunter.html",
   "resource": "stamina",
   "slotType": "maneuver",
   "hitDie": 6,
   "primary": "fin",
   "secondary": "wits",
   "saves": {
    "mind": "Average",
    "body": "Good",
    "evasion": "Poor"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    50
   ],
   "slots": [
    2,
    2,
    2,
    4,
    4,
    4,
    6,
    6,
    6,
    6,
    6,
    8,
    8,
    8,
    10,
    10,
    10,
    10,
    10,
    12,
    14,
    14,
    14,
    14,
    14
   ],
   "skillRanks": [
    3,
    3,
    3,
    6,
    6,
    6,
    9,
    9,
    9,
    12,
    12,
    12,
    15,
    15,
    15,
    18,
    18,
    18,
    21,
    21,
    21,
    24,
    24,
    24,
    27
   ],
   "prof": [
    "1 Melee Weapon",
    "2 Ranged Weapon",
    "Light Armor",
    "Tinkering Toolkit"
   ],
   "features": [
    {
     "name": "Hunter's Track",
     "level": 1,
     "text": "Spending 2 AP the hunter imbues a ranged weapon with magic allowing them to pinpoint the location of where the next projectile fired lands. The hunter always knows the location and distance of where the projectile hit for the next 10 minutes. If this attack hits a creature the Hunter gains immunity to the Unaware condition from that target for the duration."
    },
    {
     "name": "Barrage",
     "level": 5,
     "text": "Starting at 5th level the Hunter gains the following basic maneuver\n\nName: Barrage\nTier: Basic\nAP: 4\nRequirements: Ranged Weapon\nType: Attack (Ranged)\nDuration: Instant\nConcentration: No\n\nUnleashing a barrage of projectiles that occupies a 4 meter cube of the hunter's choice. Any creature in a selected tile must succeed on an evasion check against the hunter or take 6d6+Dexterity Mod physical damage."
    },
    {
     "name": "Renown Accuracy",
     "level": 10,
     "text": "Starting at 10th level, Once per turn when the hunter make a ranged attack roll before the result of the roll is determined they may choose to reroll the attack taking the second roll."
    },
    {
     "name": "Bouncing Shot",
     "level": 15,
     "text": "Starting at 15th level, the Hunter gains the following maneuver\n\nName: Bouncing Shot\nTier: Expert\nAP: 3\nRequirements: Ranged Weapon\nType: Attack (Ranged)\nDuration: Instant\nConcentration: No\n\nMaking a maneuver attack with a ranged weapon, the projectile will bounce off the terrain or target to another target of the martialist’s choice within 10 meters of the original target using the same attack roll. The initial target takes an additional 4d12 true damage and the second target instead takes 2d12 true damage. Using this maneuver incurs a -5 penalty to its attack roll. Bouncing attacks can be directed to ignore cover. This attack keeps all damage and attack bonuses and penalties to both die."
    },
    {
     "name": "Pinning Shot",
     "level": 20,
     "text": "When a hunter uses Hunters' Track they may spend 15 stamina to deal an additional 6d12 physical damage. If the target has no physical armor when hit by this attack, it must succeed a Resistance physical check or become pinned until the end of its next turn. While pinned the creature takes an additional 2d6 true damage from all sources."
    },
    {
     "name": "God's Eye",
     "level": 25,
     "text": "Starting at 25th level a hunter gains a new perspective of the world. Any creature within 20 meters of the hunter becomes aware of unless protected by grand, master or more powerful magic. The hunter gains the ability to reroll all percentile die made with attacks and take the highest roll when rolling for critical and decisive hits. In addition, the hunter now gains a level of deadly on all weapons."
    }
   ],
   "subclasses": {
    "Slayer": [
     {
      "name": "Slayer's Mark",
      "level": 1,
      "text": "Starting at 1st level when the Slayer uses its Hunter's Track on a creature it gains an additional 1d6 damage on all attacks that hit the creature for its duration. This damage increases by 1d6 at 5th, 10th 15th, 20th, and 25th level."
     },
     {
      "name": "Dreaded Trapper",
      "level": 3,
      "text": "Starting at 3rd level a Slayer becomes adept in setting traps. The Slayer prepares a trap and covers it with leaves or other camouflage. Spotting the trap requires a Sense Environment check against the slayer's Physical Potency DC. A creature that triggers the trap takes 2d6+Finesse Modifier physical damage. A creature with no physical armor must succeed on a Resistance (Body) check against the slayer's Physical Potency DC. On a failure the creature is Crippled and on a success, the creature is Pinned until the trap is removed from it."
     },
     {
      "name": "Rapid Movement",
      "level": 8,
      "text": "Starting at 8th level the Slayer gains the ability to spend 10 stamina to teleport to a location within 5 meters of itself. After this teleportation, the slayer is Hastened until the end of its next turn"
     },
     {
      "name": "Isolationist",
      "level": 13,
      "text": "Starting at 13th level the slayer gains the ability to isolate enemies. A target hit by the slayer's Hunter's Track loses the ability to teleport or perform any movement abilities for the duration. The abilities of the such used by other creatures or objects automatically fail."
     },
     {
      "name": "Delayed Shot",
      "level": 18,
      "text": "Starting at 18th level the slayer gains the ability to stop a projectile they shoot mid-flight and wait for a more opportune time to let the projectile fly. A number of times per day equal to the slayer's Finesse modifier it may shoot a projectile and hold it in place for a later time. Using 1 AP the slayer may command all arrows delayed to fire. Any creature struck by a projectile with any effects present when the arrow was shot suffers those effects."
     },
     {
      "name": "Debilitating Shots",
      "level": 23,
      "text": "Starting at 23rd level the slayer gains the ability to hold a creature still with deadly precision. Whenever a slayer hits a creature with no physical armor it applies the Pinned condition. If the attack is a critical or decisive hit it instead applies the Crippled condition."
     }
    ],
    "Gunslinger": [
     {
      "name": "Marksman Adaptation",
      "level": 1,
      "text": "Starting at 1st level the gunslinger gains the ability to use firearms with deadly speed. Reloading firearms no longer costs AP."
     },
     {
      "name": "Curving Bullet",
      "level": 3,
      "text": "Starting at 3rd level the Gunslinger gains the ability to curve bullets around targets. When the gunslinger shoots a target they ignore cover"
     },
     {
      "name": "Stylized Shots",
      "level": 8,
      "text": "Beginning at 8th level the gunslinger learns to control a blade while holding a one handed firearm. While holding a melee weapon a gunslinger no longer suffers from penalties in melee on ranged attacks made with firearms."
     },
     {
      "name": "Deadeye",
      "level": 13,
      "text": "Starting at 13th level the gunslinger gains a +5 bonus to initiative checks and attack rolls. This bonus increases by 1 for every additional 3 levels in Hunter."
     },
     {
      "name": "Fancy Fanning",
      "level": 18,
      "text": "Beginning at 18th level the Gunslinger gains the ability to fan their gun allowing for rapid fire. Twice per day for 6 AP and 20 Stamina, the slayer makes a number of attacks equal to their Wits modifier. While Fancy Fanning the gunslinger may apply other abilities and spells on its shots."
     },
     {
      "name": "Dual Wielding",
      "level": 23,
      "text": "Starting at 23rd level, a gunslinger becomes so adept at shooting and attacking whenever they make they take the attack action while wielding a firearm and one-handed melee weapon or two firearms, they may attack with each of them."
     }
    ],
    "Soul Symbiote": [
     {
      "name": "Invasive Entity",
      "level": 1,
      "text": "Starting at 1st level the Soul Symbiote gains a ranged gelatinous weapon with the Ranged Finesse (15) and Deadly I properties that deals 1d10 physical damage."
     },
     {
      "name": "Hunger of the Entity",
      "level": 3,
      "text": "Starting at 3rd level the Soul Symbiote gains the ability to consume the life force of creatures killed by its gelatinous weapon. When the Soul Symbiote kills a creature it gains 1d10 true armor. This bonus increases by 1d10 for every 3 levels the Soul Symbiote possess"
     },
     {
      "name": "Protective Sludge",
      "level": 8,
      "text": "Starting at 8th level the Soul Symbiote gains the ability to create a protective barrier of sludge around its host. Three times per day, as a reaction when the host is hit the symbiote creates a protective shell around it granting it Resistance 20 to the damage dealt."
     },
     {
      "name": "Symbiotic Strike",
      "level": 13,
      "text": "Starting at 13th level the Soul Symbiote gains more sentience allowing it to attack on its own. Once per turn the Hunter makes an additional attack when they attack using their gelatinous weapon."
     },
     {
      "name": "Parasitic Growth",
      "level": 18,
      "text": "Starting at 18th level the Soul Symbiote gains the ability to grow and consume the life force of its host to empower its gelatinous weapon. A number of times equal to the Soul Symbiote's Wits modifier per day, the Soul Symbiote can sacrifice 10 Health to give its gelatinous weapon the Enchanted III trait until the end of their next turn."
     },
     {
      "name": "Perfect Symbiosis",
      "level": 23,
      "text": "Starting at 23rd level the Soul Symbiote fully adapts to its hosts body granting its gelatinous weapon an additional 2d10 physical damage and a gives its host's maximum health by 40."
     }
    ],
    "Hell Tracker": [
     {
      "name": "Infernal Marksman",
      "level": 1,
      "text": "Starting at 1st level a number of times per day equal to the Hell Tracker's wits score, they gain the ability to infuse their ranged weapons with hellfire. The Hell Tracker's ranged weapon deals an additional 1d6 unholy damage. This damage increases by 1d6 at 5th, 10th, 15th, 20th, and 25th level."
     },
     {
      "name": "Demonic Snare",
      "level": 3,
      "text": "Starting at 3rd level any creature stuck by a a Hell Tracker's Infernal Marksman must succeed on a Resistance Body check or become cursed until the end of the hellfire tracker's next turn."
     },
     {
      "name": "Illusionary Volley",
      "level": 8,
      "text": "Starting at 8th level the Hell Tracker gains the following Maneuver\nName: Illusionary Volley\nTier: Adept\nAP: 3\nRequirements: Ranged Weapon\nType: Attack (Ranged)\nDuration: Instant\nConcentration: No\n\nMaking an attack with a ranged weapon, the martialist creates an illusionary duplicate of their arrow granting them a +5 bonus to the attack roll."
     },
     {
      "name": "Leyline of the Dammed",
      "level": 13,
      "text": "Starting at 13th level the Hell Tracker gains the ability to teleport to an unoccupied location within 10 meters of itself. After this teleportation, all creatures of their choice within 1 meter of the Hell Tracker's original location must succeed on a Evasion check or take 8d6 unholy damage."
     },
     {
      "name": "Explosive Sins",
      "level": 18,
      "text": "Starting at 18th level when the Hell Tracker uses their Infernal Marksman all creatures within 5 meters of the arrows landing point must succeed on an Resistance Body check or be subjected to the unholy damage."
     },
     {
      "name": "Hellfire Rain",
      "level": 23,
      "text": "Starting at 23rd level the Hell Tracker gains the ability to summon a rain of hellfire. Once per day the Hell Tracker may summon a rain of hellfire in a 10 meter radius. All creatures in the area must succeed on a Resistance Body check or take 25d10 unholy damage or half as much on a success. A creature that fails its save becomes cursed for 1 Minute and may repeat its save at the start of each of its turns."
     }
    ],
    "Shadow": [
     {
      "name": "Darkness's Friend",
      "level": 1,
      "text": "Starting at 1st level the Shadow gains the ability to manipulate the dark. The Shadow learns three minor Tenemancy spells and gains the ability to cast these spells three times per day. The same spell may be cast more than once but the total castings of these spells may not exceed three."
     },
     {
      "name": "Stalker",
      "level": 3,
      "text": "Starting at 3rd level the Shadow gains the ability to move through the shadows unseen. While in dim light or darkness the Shadow gains a +5 bonus to all sneak checks. In addition they gain 10 meters of darksight. If the Shadow already possesses darksight they increase previous darksight by 5 meters."
     },
     {
      "name": "Darkness's Embrace",
      "level": 8,
      "text": "Starting at 8th level the Shadow gains the ability to become one with the shadows. Once per day the Shadow may spend 10 stamina to become invisible for 1 minute."
     },
     {
      "name": "Shadow's Grasp",
      "level": 13,
      "text": "Starting at 13th level the Shadow gains the ability to manipulate the shadows to hold creatures in place. A number of times equal to the Shadow's wits score when it hits a creature with an attack it must succeed on a Resistance Body check or become paralyzed for 1 minute. The creature that failed may repeat its save at the start of each of its turns."
     },
     {
      "name": "Shadow's Veil",
      "level": 18,
      "text": "Starting at 18th level the Shadow gains the ability to conceal its presence using the darkness. Once per day the Shadow may spend 2 AP to become invisible for 1 minute."
     },
     {
      "name": "Shadow's Wrath",
      "level": 23,
      "text": "Starting at 23rd level the Shadow gains the ability to uses the shadows to guide their attack. The Shadow makes an attack that lands a decisive strike on a 10 or higher and increases the decisive chance by 20. This attack deals 6x damage on a critical hit and 8x damage on a decisive strike."
     }
    ],
    "Celestial Bow": [
     {
      "name": "Celestial Marksman",
      "level": 1,
      "text": "Starting at 1st level a number of times per day equal to the Celestial Bow's wits score, they gain the ability to infuse their ranged weapons with celestial light. The Celestial Bow's ranged weapon deals an additional 1d6 holy damage. This damage increases by 1d6 at 5th, 10th, 15th, 20th, and 25th level."
     },
     {
      "name": "Resolution",
      "level": 3,
      "text": "Starting at 3rd level the Celestial Bow can shoot a creature with its bow healing it 1d4 health. This healing increases by 1d4 for every 4 levels."
     },
     {
      "name": "Slay the Wicked",
      "level": 8,
      "text": "Starting at 8th level the Celestial Bow gains the ability to smite the wicked. When the Celestial Bow attacks an evil creature it takes an additional 1 holy damage for every die rolled."
     },
     {
      "name": "Sentinel",
      "level": 13,
      "text": "Starting at 13th level the Celestial Bow gains the ability to protect its allies. A number of times equal to the Celestial Bow's wits score per day, as a reaction it may increase a creature's AC by 3."
     },
     {
      "name": "Banish",
      "level": 18,
      "text": "Starting at 18th level the Celestial Bow gains the ability to banish evil. Once per day the Celestial Bow may attempt to banish a creature to a demiplane. The creature must succeed on a Resistance Mind check or be banished for 1 minute."
     },
     {
      "name": "Champion of Heaven",
      "level": 23,
      "text": "Starting at 23rd level the Celestial Bow gains the ability to create an aura of victory. For a number of rounds equal to the Celestial Bow's wits score all allies within 10 meters of them gain an additional 1d6 bonus to all checks and attack rolls. These rounds do not be need to be spent consecutively."
     }
    ],
    "Rift Walker": [
     {
      "name": "Time Novice",
      "level": 1,
      "text": "Starting at 1st level the Rift Walker gains the ability to manipulate time. The Rift Walker learns three minor Chronomancy spells and gains the ability to cast these spells three times per day. The same spell may be cast more than once but the total castings of these spells may not exceed three."
     },
     {
      "name": "Echoing Shot",
      "level": 3,
      "text": "Starting at 3rd level, the Rift Walker fires an arrow that temporarily alters a creature' flow of time. A number of times equal the the Rift Walker's wits score, when it hits a creature with an attack it must succeed a Resistance Mind check or become slowed until the end of its next turn."
     },
     {
      "name": "Flashback",
      "level": 8,
      "text": "Starting at 8th level the Rift Walker once per day as a reaction the shunts itself to a different point in time causing an attack to miss."
     },
     {
      "name": "Temporal Momentum",
      "level": 13,
      "text": "Starting at 13th level the Rift Walker gains the ability to manipulate time. A number of times equal to its wits score the Rift Walker becomes hasted until the end of its turn. This ability uses no AP."
     },
     {
      "name": "Halting Shot",
      "level": 18,
      "text": "Starting at 18th level the Rift Walker gains the ability to stop the flow of time on a creature. Once per day when the Rift Walker uses its Echoing Shot a it may attempt to Paralyze a creature instead of slowing it."
     },
     {
      "name": "Eternity",
      "level": 23,
      "text": "Starting at 23rd level the Rift Walker gains mastery over time becoming immune to aging effects. In addition Once per day for 1 Minute, they once per round can force an attack roll that missed to hit, choose to succeed a check or save, or force a creature to reroll a successful attack or save."
     }
    ]
   }
  },
  "Phantom": {
   "page": "phantom.html",
   "resource": "stamina",
   "slotType": "maneuver",
   "hitDie": 6,
   "primary": "fin",
   "secondary": "cha",
   "saves": {
    "mind": "Average",
    "body": "Poor",
    "evasion": "Good"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    50
   ],
   "slots": [
    4,
    4,
    4,
    6,
    6,
    6,
    6,
    8,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    12,
    12,
    12,
    14,
    14,
    14,
    14,
    14
   ],
   "skillRanks": [
    3,
    3,
    3,
    6,
    6,
    6,
    9,
    9,
    9,
    12,
    12,
    12,
    15,
    15,
    15,
    18,
    18,
    18,
    21,
    21,
    21,
    24,
    24,
    24,
    27
   ],
   "prof": [
    "1 Light Melee or Ranged Weapon",
    "2 Tools of Choice",
    "Light Armor",
    "Lockpicking Tools"
   ],
   "features": [
    {
     "name": "Shadow Sigil",
     "level": 1,
     "text": "Stating at 1st level a Phantom gains a sigil as a sign of loyalty to an organization or faction that they have connections with. When presented to a faction agent the creature can gain one of the following benefits.\n\nCriminal Underworld\n% off all black market purchases equal to double the Phantoms Level\n\nSeal of Order\nThe Phantom is given a safe environment for sleep by its organization. In addition, the phantom is granted a % bonus of gold equal to equal to their level from their faction.\n\nFreelancer/Diplomat\nThe Phantom gains a bonus to all charisma skills equal to half their Phantom level rounded down (Minimum +1)\n\nIn addition to the shadow sigil, Phantoms learn a special language that makes it easier for them to learn information about a certain area. Language is called \"Code\" and only phantoms know it."
    },
    {
     "name": "Deathly Blades",
     "level": 5,
     "text": "Starting at 5th level all attacks made by a Phantom ignore 10 resistance."
    },
    {
     "name": "Extra Feat",
     "level": 9,
     "text": "(See the class page.)"
    },
    {
     "name": "Cloak of Shadow",
     "level": 10,
     "text": "Starting at 10th level a Phantom gains the ability to spend 6 AP and become invisible for 1 minute."
    },
    {
     "name": "Precise Puncture",
     "level": 15,
     "text": "Starting at 15th level a Phantom gains the ability to puncture a target with deadly accuracy. For 10 stamina the phantom strikes a target with weapon that deals physical damage. On a hit the target takes 5d6 true damage and the target takes 10 points of true damage for every meter it walks, burrows or flies until the end of its next turn."
    },
    {
     "name": "Trained Instincts",
     "level": 20,
     "text": "Starting at 20th level a Phantom gains the ability to spot traps and lies easier. The Phantom gains a +5 to all Intuition contests against Deception and a +5 to Sense Environment to find hidden objects or traps."
    },
    {
     "name": "Creeping Death",
     "level": 25,
     "text": "Starting at 25th level a Phantom gains an additional 5 damage die-on attacks made with light or ranged weapons."
    }
   ],
   "subclasses": {
    "Thief": [
     {
      "name": "Practiced Hand",
      "level": 1,
      "text": "Starting at 1st level a Thief phantom gains levels in the sleight of hand and sneak skills equal to their thief level."
     },
     {
      "name": "Magic Adept",
      "level": 3,
      "text": "Starting at 3rd level a Thief Phantom gains the ability to use all magic items in their possession that require the mana for stamina instead."
     },
     {
      "name": "Fast Footwork",
      "level": 8,
      "text": "Starting at 8th level the movement speed of a Thief Phantom increases by 1 meter. This bonus increases by +1 at levels 12, 16, 20, and 24."
     },
     {
      "name": "Adept Handiwork",
      "level": 13,
      "text": "Starting at 13th level the Thief Phantom gains the ability to use consumables, and activate equipment and magic items for 1 AP less (Minimum of 1)."
     },
     {
      "name": "Acute Senses",
      "level": 18,
      "text": "Starting at 18th level the Thief Phantom gains the ability to dodge effects with ease. When subjected to an evasion or overpower checks the phantom is only displaced or damaged half as much.\n\nElusive\nStaring at 23rd level a Thief Phantom is Elusive physically and vocally. The Phantom gains levels in Deception and Evasion checks equal to their level. These skills stack with the freelancer/diplomat levels."
     }
    ],
    "Architect": [
     {
      "name": "Inquisitive",
      "level": 1,
      "text": "Starting at 1st level the Architect gains a +5 bonus to intuition checks."
     },
     {
      "name": "Tactician",
      "level": 3,
      "text": "Starting at 3rd level an Architect Phantom gains the ability to plan ahead. When initiative is rolled the Architect may rearrange the placement of allies in the initiative with each others scores."
     },
     {
      "name": "Leadership",
      "level": 8,
      "text": "Starting at 8th level the architect grants a bonus to attack rolls and skill checks to themselves and allies they help or when helped equal to half their level. In addition, the architect may reroll any teamwork check they make twice and take the higher roll."
     },
     {
      "name": "Connections",
      "level": 13,
      "text": "Starting at 13th level an Architect Phantom may select another Shadow Sigil. In addition when the Phantom rolls initiative the help action now costs 1 AP."
     },
     {
      "name": "Multitasker",
      "level": 18,
      "text": "Starting at 18th level once per turn when the Architect Phantom uses the help Action they may attack once themselves. This feature is not subjected to effects or features that grant extra attacks."
     },
     {
      "name": "Formation Expert",
      "level": 23,
      "text": "Starting at 23rd level when the Architect Phantom spends 20 stamina coordinating a deadly assault on a creature. Until the start of the phantom's next turn the Phantom and its allies' attacks deal an additional 5d4 true damage to the selected target."
     }
    ],
    "Assassin": [
     {
      "name": "Ambush",
      "level": 1,
      "text": "Starting at 1st level an Assassin's critical range increases by 20 when unseen by a creature they attack."
     },
     {
      "name": "Silent Shadow",
      "level": 3,
      "text": "Starting at 3rd level an Assassin learns to hide their movement. When the Assassin moves their movement makes no sound."
     },
     {
      "name": "Disguise Master",
      "level": 8,
      "text": "Starting at 8th level an Assassin gains the ability to change their appearance. The Assassin may change their face to an alternate one they have made. Doing so can be done so swiftly it costs no AP. An Assassin only has one alternate face they can use."
     },
     {
      "name": "Killing Intent",
      "level": 13,
      "text": "Starting at 13th level an Assassin gains the ability to exude a killing intent. When the Assassin uses this ability it chooses a creature within 15 meters it can see. The target must succeed on a Resistance Mind check or become fearful of the Assassin."
     },
     {
      "name": "Silent Death",
      "level": 18,
      "text": "Starting at 18th level an Assassin learns to prevent a creature from making noise. When the Assassin makes a successful attack the target must succeed on a Resistance Body check or become silenced for 1 minute."
     },
     {
      "name": "Vital Sense",
      "level": 23,
      "text": "Starting at 23rd level an Assassin gains the ability to tell when a creature is to die. When the assassin hits a creature they learn the current health of the creature as it is not an outsider, undead, or golem."
     }
    ],
    "Pirate": [
     {
      "name": "Pirate's Proficiency",
      "level": 1,
      "text": "Starting at 1st level a Pirate gains proficiency in firearms and seaships."
     },
     {
      "name": "Swashbuckler",
      "level": 3,
      "text": "Starting at 3rd level a Pirate no longer suffers penalties with ranged attacks when a creature is within melee range."
     },
     {
      "name": "Sailor's Balance",
      "level": 8,
      "text": "Starting at 8th level a Pirate gains levels in Balance and Traverse Finesse equal to their level."
     },
     {
      "name": "Iron Liver",
      "level": 13,
      "text": "Starting at 13th level a Pirate gains the ability to drink any liquid without being poisoned. In addition, the Pirate gains a +5 bonus to all resistance checks against poison."
     },
     {
      "name": "Drunkard's Luck",
      "level": 18,
      "text": "Starting at 18th level a Pirate gains the ability to reroll any attack roll or check that they make. This feature can only be used once per combat.\n\nDirty Fighter\nThe Pirate gains the Dirty Tactics Maneuver and can use it without spending stamina."
     }
    ],
    "Charlatan": [
     {
      "name": "Confidence",
      "level": 1,
      "text": "Starting at 1st level a Charlatan gains a +5 bonus to all Deception checks."
     },
     {
      "name": "Distraction",
      "level": 3,
      "text": "Starting at 3rd level a Charlatan gains the ability to create a distraction to create a better opportunity to strike. When the Charlatan makes an attack on a creature that can understand them, they can roll deception against the targets intuition. On a successful check the Charlatan gains a bonus on the attack roll equal to the difference in the results. The Charlatan may use this ability once per turn."
     },
     {
      "name": "Snake Oil Salesman",
      "level": 8,
      "text": "Starting at 8th level a Charlatan gains the ability to sell items for 50% more than their value."
     },
     {
      "name": "Con Artist",
      "level": 13,
      "text": "Starting at 13th level a Charlatan gains the ability to create an illusion of a small object or creature. Any creature that interacts with the illusion must succeed on a Intuition check or fall under the effects of the Mental Acrobatics spell."
     },
     {
      "name": "Vanishing Act",
      "level": 18,
      "text": "Starting at 18th level a Charlatan gains the ability to disappear from sight. A number of times equal to their charisma modifier, the charlatan can teleport to a space within 10 meters."
     },
     {
      "name": "Rewrite Incident",
      "level": 23,
      "text": "Starting at 23rd level a Charlatan gains the ability to rewrite an event that has happened in another creature's mind. Once per day the Charlatan can force a creature to succeed a Resistance Mind check or fall under the effects of the Alter Memory spell."
     }
    ],
    "Honeypot": [
     {
      "name": "Alluring Words",
      "level": 1,
      "text": "Starting at 1st level a Honeypot gains a +5 bonus to all Allure checks."
     },
     {
      "name": "Siren's Tongue",
      "level": 3,
      "text": "Starting at 3rd level a Honeypot gains the ability to charm a creature thats not hostile and can understand them. The Honeypot can use this ability a number of times equal to their charisma modifier. The target must succeed on a Resistance Mind check or be charmed for 1 hour."
     },
     {
      "name": "Master Ambusher",
      "level": 8,
      "text": "Starting at 8th level a Honeypot gains the ability to set up an ambush on a creature. A creature that is charmed by the Honeypot is stunned when the honeypot or any creatures they consider an ally attacks the creature. This ability does not function on creatures hostile to the Honeypot."
     },
     {
      "name": "Master of Speech",
      "level": 13,
      "text": "Starting at 13th level a Honeypot gains the ability to speak any language. In addition the Honeypot can attempt to temporarily dominate a creature it has charmed. The target must succeed on Resistance Mind check or become dominated by the Honeypot for 1 minute. After this minute ends the creature knows it was charmed."
     },
     {
      "name": "Disarming Beauty",
      "level": 18,
      "text": "Starting at 18th level a Honeypot any creature that attempts the harm the only the Honeypot that can be attracted to them must succeed on a Resistance Mind check or be forced to select a new target or waste the attack, maneuver, spell or ability."
     },
     {
      "name": "Web of Lies",
      "level": 23,
      "text": "Starting at 23rd level a Honeypot can choose to succeed on a failed Charisma check, force a creature to reroll against its siren's tongue or disarming beauty. A Honeypot can only use this ability once per roll. The Honeypot can use this ability a number of times equal to their charisma modifier."
     }
    ],
    "Ninja": [
     {
      "name": "Shinobi",
      "level": 1,
      "text": "Starting at 1st level a Ninja deals an additional 1d6 true damage to creatures who are unaware of it. This damage increases by 1d6 for every 3 levels they possess."
     },
     {
      "name": "Shadow Stealth",
      "level": 3,
      "text": "Starting at 3rd level a Ninja gains the ability to hide in plain sight when in Dim Light or Darkness."
     },
     {
      "name": "Ninja's Agility",
      "level": 8,
      "text": "Starting at 8th level when a Ninja makes an attack they can attempt a sneak check once per turn."
     },
     {
      "name": "Ninja's Reflexes",
      "level": 13,
      "text": "Starting at 13th level a Ninja gains the ability to dodge attacks with ease. When a Ninja is hit by an attack roll they can use 5 stamina to take half damage instead."
     },
     {
      "name": "Ninja's Precision",
      "level": 18,
      "text": "Starting at 18th level all weapons a Ninja uses gain a level of deadly and the hidden property."
     },
     {
      "name": "Afterimages",
      "level": 23,
      "text": "Starting at 23rd level a Ninja gains the ability to create an afterimage of itself. When the ninja lands a critical or decisive strike they can roll an extra attack for no AP."
     }
    ]
   }
  },
  "Priest": {
   "page": "priest.html",
   "resource": "mana",
   "slotType": "spell",
   "hitDie": 4,
   "primary": "wits",
   "secondary": "int",
   "saves": {
    "mind": "Average",
    "body": "Average",
    "evasion": "Average"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    68,
    72,
    76,
    80,
    84,
    88,
    92,
    96,
    100
   ],
   "slots": [
    4,
    4,
    4,
    6,
    6,
    6,
    8,
    8,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    12,
    12,
    14,
    16,
    16,
    16,
    16,
    16
   ],
   "skillRanks": [
    6,
    6,
    6,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    14,
    14,
    14,
    16,
    16,
    16,
    18,
    18,
    18,
    20,
    20,
    20,
    22
   ],
   "prof": [
    "Medicine Kit",
    "Light Armor"
   ],
   "features": [
    {
     "name": "Divine Order",
     "level": 1,
     "text": "Starting at 1st level a Priest is dedicates themselves to faith. They are entrusted as an advocate granting them a position in the church as they gain access to powers bestowed upon them. The priest gains access to one magic school that follows the deities' alignment they follow\n\nIn addition they may use their wits for knowledge divine and demonic checks.\n\nGood\nHeavenly Spells\n\nNeutral\nChoice\n\nEvil\nDemonology Spells\n\nIn addition, the priest gains the ability to recite a prayer offering protection to those around them. Whenever the priest finishes a partial rest they may choose a number of allies equal to their Wits modifier and restore a bonus physical or magical armor equal to double their level."
    },
    {
     "name": "Healing Palms",
     "level": 5,
     "text": "Starting at 5th level the priest is granted a healing pool equal to 5 times their level + their Wits modifier. For 2 AP a priest may bestow any number of health from this pool upon a target within 1 meter of themselves. This pool resets upon a full rest."
    },
    {
     "name": "Radiant Idol",
     "level": 10,
     "text": "Starting at 10th level the Priest gains the ability to roll for critical and decisive strikes on spells and non weapon magical items. Spells and magic items with a save can only land critical hits.\n\nTrance of Guidance\nStarting at 15th level the Priest gains the ability to enter a trance of tranquility. Once per day, the Priest makes contact with an entity directly under the influence of their deity by performing a 1-hour ritual. The entity gives guidance based on a series of questions they present to the Priest. To determine the results the Priest must roll Knowledge (Divine). Any bonus granted by this feature lasts for no longer than 1 hour.\n\n1-10 Nothing of Use\n11-20 Minor Information\n21-30 Major Information\n31+ Major Information +10 Bonus to Intelligence."
    },
    {
     "name": "Trance of Mercy",
     "level": 15,
     "text": "(See the class page.)"
    },
    {
     "name": "Protection of the Gods",
     "level": 20,
     "text": "Starting at 20th level a Priest is always under the effects of the Celestial Shroud spell. In addition, whenever the Priest heals an ally the target regains extra hit points equal to the Priest's Intelligence modifier."
    },
    {
     "name": "Divine Idol",
     "level": 25,
     "text": "Starting at 25th level the Priest is granted the ability to impose the will of their deity on others. For 20 Mana the Priest creates 3 motes that float around their head. While the priest has at least one of these motes hover over their head they gain a +5 to all statistics. A mote can be launched at a target of the Priest's choice using the priest's spell attack bonus. Upon a hit, the target takes 10d6+Wits modifier holy damage. The motes expire after 1 hour."
    }
   ],
   "subclasses": {
    "Heavenly Seer": [
     {
      "name": "Sermon of Faith",
      "level": 3,
      "text": "Starting at 3rd level a Heavenly Seer Priest gains the ability to restore allies beyond their normal capacity though a sermon of their deity. Upon completing a partial rest the Priest and their allies that listened to the sermon gain True Armor equal to the Priests level."
     },
     {
      "name": "Expel Source",
      "level": 8,
      "text": "Starting at 8th level The Heavenly Seer gains the ability to bestow greater fortune on their allies. For 2 AP a Heavenly Seer may choose to end one effect or spell of their choice on a creature for 10 points of their Healing Palms. The Heavenly seer rolls a Knowledge (Arcana) check against the DC of the effect.\n\nTier 1 Magic\n10\n\nTier 2 Magic\n20\n\nTier 3 Magic\n35\n\nTier 4 Magic\n45\n\nMonster Effects\n10+Double Threat rating"
     },
     {
      "name": "Touch of Mercy",
      "level": 13,
      "text": "Starting at 13th level, once per day The Heavenly Seer touches the body of a creature contacting the soul of any good-aligned creature so long as it is not destroyed, trapped, or otherwise unable to receive the message. The Heavenly Seer may resurrect the creature as long as it upon revival the creature is able to survive. This resurrection nullifies all diseases and poisons in a target."
     },
     {
      "name": "Heavenly Resistance",
      "level": 18,
      "text": "Starting at 18th level The Heavenly Seer grants a + 2 bonus to themselves and all allies Resistance (Mind) and Resistance (Body) within 10 meters of themselves."
     },
     {
      "name": "Well of Life",
      "level": 23,
      "text": "Starting at 23rd level The Heavenly Seer's pool of life doubles. In addition, when the Heavenly Seer heals a creature it restores magical armor equal to the amount of health healed."
     }
    ],
    "The Blasphemous": [
     {
      "name": "Blasphemy",
      "level": 3,
      "text": "Starting at 3rd level the Blasphemous misspeaks of a deities teachings and tenants intentionally or unintentionally. The Blasphemous may spend 1 AP 5 Mana and deliver a speech to all onlookers. Any creature that can understand the speech of the Blasphemous within 20 meters must succeed on a Resistance (Mind) check or take Psychic damage equal to the Blasphemous' s level."
     },
     {
      "name": "Venomous Words",
      "level": 8,
      "text": "Starting at 8th level the Blasphemous adds half their level in psychic damage to all spells they cast that require words of power. This damage can only be applied once per spell."
     },
     {
      "name": "Contradicting Speech",
      "level": 13,
      "text": "Starting at 13th level The Blasphemous words begin to manifest into reality. They gain the curses or miracles of the opposite alignment. The Blasphemous priest gains access to the Divine Favor of the opposite alignment of their deity. Neutral deities grant the option not selected by the priest."
     },
     {
      "name": "False Hope",
      "level": 18,
      "text": "Starting at 18th level the Blasphemous's sermons inspire those who hear them. When the Blasphemous gives a speech it may choose to inspire creatures that believe its sermon. Creatures become inspired for 1 day. After the day the creatures become are filled with existential hopeless for 1 week. If a creature listens to the speech again and becomes motivated the hopelessness instead lasts 1 month. Inspiring or motivating a creature who became hopeless from this feature does not remove the hopelessness."
     },
     {
      "name": "Against all Odds",
      "level": 23,
      "text": "Starting at 23rd level the Blasphemous gains 5 levels in Knowledge (Spiritual). The deity also grants them Knowledge (Divine) for good aligned deities or Knowledge (Demonic) evil aligned deities as the blasphemous learns more about the religion they are supposed to know."
     }
    ],
    "Faith Channeler": [
     {
      "name": "Divine Flame",
      "level": 3,
      "text": "Starting at 3rd level the Faith Channeler can turn their healing palms into a bright flame of holy energy. The Faith Channeler can toss this flame at a creature using their magic attack roll. On a successful hit the creature takes 1d8 holy if the priest is good or neutral or unholy if they are evil damage. If the creature struck is the opposite alignment of their Divine Order they take 50% more damage."
     },
     {
      "name": "Faith's Protection",
      "level": 8,
      "text": "Starting at 8th level the Faith Channeler becomes a walking holy ground. The Faith Channeler and all allies in 5 meters of them have the cursed condition suppressed. When a creature exits the range of the aura it returns as normal."
     },
     {
      "name": "Divine Buffer",
      "level": 13,
      "text": "Starting at 13th level the Faith Channeler regains 5 health at the start of each of their turns so long as they have at least 1 health."
     },
     {
      "name": "Second Chance",
      "level": 18,
      "text": "Starting at 18th level as a reaction, The Faith Channeler can spend 10 points from their Healing Palms to have an ally they can see fail within 10 meters reroll a failed saving throw potentially turning it into a success."
     },
     {
      "name": "Avatar of Faith",
      "level": 23,
      "text": "Starting at 23rd level for 6 AP The Faith Channeler gains immunity to poison, holy and unholy damage."
     }
    ],
    "Paragon": [
     {
      "name": "Virtues (Minor)",
      "level": 3,
      "text": "Starting at 3rd level the Paragon chooses one of the following virtues to follow. Following this virtues grants them bonuses. Breaking a virtue loses any of its effects and requires 12 hours of prayer for repentance to gain its effects back.\nCelibacy\nThe Paragon decides to show their faith by refraining from love and sex. Choosing to be Celibate grants the Paragon a +1 bonus to resistance mind saves. This bonus increases by +1 every 3 levels.\nHonesty\nThe Paragon decides to display their faith by never telling a lie or deception. The Priest gains a 1 skill level in persuasion. This bonus increases by +1 every 3 levels.\nDiet\nThe Paragon displays faith through avoiding a certain foods and having a day long fast once every month. The Paragon following dietary restrictions gains a +1 bonus to Resistance Body.\nStudy\nThe Paragon spends hours reading and remembering the sacred text of their deity. They must spend at least 1 hour a day reading their scripture. The Paragon following study gains a +1 to Knowledge Divine and Demonic checks."
     },
     {
      "name": "Pursuit of Perfection",
      "level": 8,
      "text": "Starting at 8th level the Paragon's pursuit of perfection inspires those healed by them. Any creature healed by the Paragon's healing palms gains a +2 bonus to its AC until the end of the targets next turn."
     },
     {
      "name": "Virtues (Advanced)",
      "level": 13,
      "text": "Starting at 13th level the Paragon chooses one of the following virtues to follow. Following these virtues grants them bonuses. Breaking a virtue loses any of its effects and requires 12 hours of prayer for repentance to gain its effects back.\nForgiveness\nThe Paragon cannot hold hatred or punish those who are willing to change. Paragons that follow this path are immune to the Charmed condition.\nHumility\nThe Paragon must remain humble and cannot boast about deeds they have done. Paragons that follow this path are immune to the Hopeless condition.\nSilence\nThe Paragon is limited in speech only speaking when it is of upmost importance. Paragons that follow this path are immune to the Silenced condition.\nLoyalty\nThe Paragon questions no orders or rules from their deity or their sacred text. Paragons that follow this path are immune to the Possessed condition."
     },
     {
      "name": "Perfect Follower",
      "level": 18,
      "text": "Starting at 18th level the Paragon regains all uses of Healing Palms on a partial rest."
     },
     {
      "name": "Virtues (Pinnacle)",
      "level": 23,
      "text": "Starting at 23rd level the Paragon chooses one of the following virtues to follow. Following these virtues grants them bonuses. Breaking a virtue loses any of its effects and requires 12 hours of prayer for repentance to gain its effects back.\nBlind Faith\nThe Paragon gives their eyes to their deity trusting them to grant them sight. The Paragon is granted 15 meters of True Vision.\nLeap of Faith\nThe Paragon trust their deity to protect them from death. The Paragon sprouts a pair a wings granting them a fly speed of 10.\nUltimate Charity\nThe Paragon gives away all their possessions trusting their deity to give them what what is required in their time of need. All magical items the Paragon owns are now tied to their holy symbol surrendering them to their church. Once per day the Paragon can choose to succeed on a check."
     }
    ],
    "Crusader": [
     {
      "name": "Trained Armor",
      "level": 3,
      "text": "Starting at 3rd level the Crusader gains medium armor, shield, and 1 skilled weapon proficiency."
     },
     {
      "name": "Cleanse Evil",
      "level": 8,
      "text": "Starting at 8th level when the Crusader casts a spell that deals holy or unholy damage, they deal an additional 1 damage per die rolled."
     },
     {
      "name": "Bastion",
      "level": 13,
      "text": "Starting at 13th level the Crusader gains proficiency in Heavy Armor."
     },
     {
      "name": "Efficient Crusader",
      "level": 18,
      "text": "Starting at 18th level the Crusader selects a favored spell from their divine order. The spell can be cast once per day without using mana."
     },
     {
      "name": "Divine Calling",
      "level": 23,
      "text": "Starting at 23rd level, for 2 AP the Crusader can rally allies a number of rounds equal to their wits modifier. All creatures while the crusader rallies their allies gains 1d8 holy damage on all attacks, resistance 5 to all damage, and gain a +2 bonus to all saves."
     }
    ],
    "Martyr": [
     {
      "name": "Greater Good",
      "level": 3,
      "text": "Starting at 3rd level the Martyr can choose to take an attack target at a creature within 1 meter of themselves. The Martyr gains resistance 5 to the damage of the triggering attack."
     },
     {
      "name": "Good Health",
      "level": 8,
      "text": "Starting at 8th level the Martyr gives a +4 bonus to saving throws to resist disease and the nauseated condition."
     },
     {
      "name": "Yield to None",
      "level": 13,
      "text": "Starting at 13th level for 2 AP, the Martyr can motivate up to five creatures of their choice within 15 meters of themselves that can hear them."
     },
     {
      "name": "Harm Conduit",
      "level": 18,
      "text": "Starting at 18th level the Martyr's greater good can now protect creatures within 10 meters and the damage resistance increases to 20. If this reduces the damage to 0 the Martyr gains a +1 bonus to all saves for the next minute."
     },
     {
      "name": "Protect the Innocent",
      "level": 23,
      "text": "Starting at 23rd level, if the Martyr dies all allies within 10 meters of the Martyr gain 100 health, a +4 bonus to all checks and saves and resistance 5 to all damage. A Martyr can be resurrected at half the material components with a cost."
     }
    ]
   }
  },
  "Pact Keeper": {
   "page": "pact-keeper.html",
   "resource": "mana",
   "slotType": "spell",
   "hitDie": 4,
   "primary": "cha",
   "secondary": "int",
   "saves": {
    "mind": "Average",
    "body": "Poor",
    "evasion": "Good"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105,
    110,
    115,
    120,
    125
   ],
   "slots": [
    2,
    2,
    2,
    4,
    4,
    4,
    6,
    6,
    6,
    6,
    6,
    8,
    8,
    8,
    10,
    10,
    10,
    10,
    10,
    12,
    14,
    14,
    14,
    14,
    14
   ],
   "skillRanks": [
    6,
    6,
    6,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    14,
    14,
    14,
    16,
    16,
    16,
    18,
    18,
    18,
    20,
    20,
    20,
    22
   ],
   "prof": [
    "1 Toolkit of Choice",
    "Light Armor",
    "1 Melee Weapon"
   ],
   "features": [
    {
     "name": "Otherworldly Pact",
     "level": 1,
     "text": "The Pact Keeper has made a bargain with an entity of great power within the multiverse. As a result, they learn the language of their benefactor's lineage and a language of choice."
    },
    {
     "name": "Greater Bestowment",
     "level": 5,
     "text": "For its efforts in helping their benefactor further its goal, the Pack Keeper is granted greater knowledge of magic. Spells of their benefactor’s lineage now cost half Mana to cast."
    },
    {
     "name": "Pact Puppetry",
     "level": 10,
     "text": "Starting at 10th level the Pact Keeper gains the ability to invite its benefactor to inhabit their body to speak, or perform a task on the Pact Keeper's behalf. Once per day, they may roll a percentile die. On a 10 or lower the benefactor enters the Pact Keeper's body causing them to become Possessed of 10 rounds. While possessed the benefactor is not hostile to allies but may not regard its Pact Keeper's allies as allies for the purpose of spells and abilities. The percentile die always fails if the benefactor believes the pact keeper may attempt to harm, trap, or perform anything the benefactor may deem as a setback."
    },
    {
     "name": "Otherworldly Bargaining",
     "level": 15,
     "text": "Starting at 15th level the Pact Keeper may bargain with its benefactor for enhanced powers. The Pact Keeper gains a +10 to any stat of its choice. This enhancement is permanent and may be rebargained each time the pact keeper levels up. The pact keeper must succeed in a persuasion check DC equaling 20+10 for each time bargains to change its ability. This bonus increases to 15 at level 20 and 20 at level 25"
    },
    {
     "name": "Bound in Blood",
     "level": 20,
     "text": "Starting at 20th level the Pact Keeper becomes one of the benefactor's most trusted. The Pact Keeper receives hints at completing daily tasks. 3 times per day the Pact Keeper may choose to add its charisma modifier onto a single check."
    },
    {
     "name": "Embodiment of the Pact",
     "level": 25,
     "text": "Starting at 25th level the Pact Keeper no longer needs to roll for Pact Puppetry."
    }
   ],
   "subclasses": {
    "Demonic Pact": [
     {
      "name": "Hellfire Casting",
      "level": 1,
      "text": "Starting at 1st level the Pact Keeper makes a pact with an entity from the underworld. The Pact Keeper gains access to the Demonlogy spell list."
     },
     {
      "name": "Hellish Resistance",
      "level": 3,
      "text": "Starting at 3rd level a Demonic Pact Keeper gains +5 resistance to unholy, fire and cold damage."
     },
     {
      "name": "Demonic Manifestation",
      "level": 8,
      "text": "Starting at 8th level a Demonic Pact Keeper is treated as a fiend for the purpose of overcoming Demonlogy spells. The pact keeper also deals an additional 1 damage for each die rolled on unholy damage."
     },
     {
      "name": "Protective Hound",
      "level": 13,
      "text": "Starting at 13th level a Demonic Pact Keeper is granted a protective hellhound. If slain the Pact Keeper may sacrifice 20 health, 1000 gold, and 10 mana to resummon the hound in a 10 minute ritual. All checks made by the hellhound are use as half the Pact Keeper skill levels.\n\nHell Hound\nCreature Type: Fiend\nSize: Medium\nPhysical Armor: 5*Pact Keeper level\nMagic Armor 5*Pact Keeper level\nArmor Class: 30\nHit Points: 20+Pact Keeper Level\nAlignment: Neutral Evil\nThreat Rating: 8\nLanguages: Bellsybabble\nSpeed: 3\nResistance: Unholy 10\nImmunities: Fire\n\nAttribute Value Modifier   Strength 26 +9   Finesse 20 +6   Fortitude 24 +8   Intelligence 18 +5   Charisma 23 +8\n\nActions\nMax AP: 6\n\nBite\n9+8+Pack Keeper's Charisma\n2d6+9 Physical + 1d6+8 Unholy\n\nAbilities\n\n\nInfernal Scar\nThe hellhound creates a burning scar on a creature with no Physical Armor. The creature must make a Resistance (Body) check (DC 10 + PactKeeper's Charisma). On a failed check the target is cursed. While cursed the target takes an additional 1d10 unholy from all unholy sources."
     },
     {
      "name": "Infernal Knowledge",
      "level": 18,
      "text": "Starting at 18th level a Demonic Pact keeper's resistances increases to 10. In addition, the Pact Keeper learns ancient knowledge from their benefactor. The pact keeper gains the ability to speak, read and write in all languages."
     },
     {
      "name": "Demonic Immunity",
      "level": 23,
      "text": "Starting at 23rd level the Demonic Pact keeper is immune to Unholy, Fire and Cold damage. The Demonic Pact Keepers gains the ability to desecrate land leaving unholy flames by performing a 10-minute ritual and sacrificing a worthy offering to their benefactor usually a good aligned creature or objects worth no less than 10,000 GP.\n\nThis desecration lasts until exorcised and any creature that is not a fiend or an ally of the Pact Keeper or benefactor that enters the area is cursed."
     }
    ],
    "Otherworldly Pact": [
     {
      "name": "Empty Casting",
      "level": 1,
      "text": "Starting at 1st level the Pact Keeper creates a pact with an entity of the empty. The pact keeper gains access to the Otherworldly spell list."
     },
     {
      "name": "Void's Translation",
      "level": 3,
      "text": "Starting at 3rd level the Pact Keeper gains the ability to understand all written and spoken languages. If the pact keeper encounters a coded message they no longer need to roll Inspect Object to read the message but takes triple the time to read."
     },
     {
      "name": "Disruptive Hunger",
      "level": 8,
      "text": "Starting at 8th level the Void Pact Keeper gains the ability to disrupt the source of a creature. As a reaction when the Pact Keeper sees a martialist or caster perform a maneuver or cast a spell it can roll a contested Charisma check against the creature. If the Pack Keeper wins the magic consumes the mana or stamina but produces no effects. On a failure, the spell is cast and the Pact Keeper loses Mana equal to the amount spent in the casting of the spell or maneuver."
     },
     {
      "name": "Return to the Empty",
      "level": 13,
      "text": "Starting at 13th level the Pact keeper can temporarily banish a creature. The Pact keeper spends 10 Mana and makes a spell attack roll against the creature within 10 meters of itself. If the attack hits it takes 10d6 magic damage and if it has no magical armor must succeed on a Resistance (Body) check or be banished to the empty for 1d4+1 rounds. While in the empty the creature is stunned and takes 1d6 magic damage at the start of each of its turns. On a successful save the creature is immune to this effect permanently from that specific pact keeper."
     },
     {
      "name": "Incorporeal",
      "level": 18,
      "text": "Starting at 18th level the Pact keeper gains the ability to become incorporeal and able to travel through solid objects. This ability costs 5 mana to activate and requires concentration to maintain. To maintain this incorporeal state requires 5 mana at the start of each of the Pact Keeper's turns. If the pact keeper ends its turn inside a creature or object they take 10d10 magic damage and can't maintain Incorporeal, they are shunted to the nearest unoccupied space."
     },
     {
      "name": "Empty Manifestation",
      "level": 23,
      "text": "Starting at 23rd level the Pact Keeper partially merges with the empty. The pact keeper gains resistance 30 to physical damage and any creature that hits the pact keeper with a melee attack takes 5d12 magic damage."
     }
    ],
    "Fallen Pact": [
     {
      "name": "Angelic Casting",
      "level": 1,
      "text": "Starting at 1st level the Pact Keeper makes a pact with a fallen angel or deity. The Pact Keeper gains access to Heavenly spells."
     },
     {
      "name": "Corona of Ill Hope",
      "level": 3,
      "text": "Starting at 3rd level a Fallen Pact Keeper gains the ability to create a corona of despair manifesting their benefactor's aspects. Any creature within 10 meters of the Pact Keeper must make a Resistance (Mind) check. On a failure, the creature is filled with sorrow and empathy for the Pact Keeper granting them advantage on all charisma skills excluding teamwork."
     },
     {
      "name": "Fallen Wings",
      "level": 8,
      "text": "Starting at 8th level the Fallen Pact keeper can manifest raven black wings granting them a flight speed equal to their walk speed."
     },
     {
      "name": "Dreadful Aspect",
      "level": 13,
      "text": "Starting at 13th level the Fallen Pact keeper creates dread 10 meters around themselves. Any creature that the Fallen Pact Keeper designated must succeed on a Resistance (Mind) check or become Fearful of them for 1 hour. This ability cannot stack with itself into Hopeless."
     },
     {
      "name": "False Idol",
      "level": 18,
      "text": "Starting at 18th level a Fallen Pact Keeper gains the ability to mimic its benefactor's former glory. For 2 AP and 10 mana any creature within 5 meters of the Fallen Pact Keeper's choice becomes Motivated for 1 hour. This ability cannot stack with itself into Inspired."
     },
     {
      "name": "Divinity",
      "level": 23,
      "text": "Starting at 23rd level both Aura of Corona of Ill Hope and False Idol may stack into Inspired and Hopeless. In addition, the Pack Keeper gains Immunity to Holy damage."
     }
    ],
    "Spirit Pact": [
     {
      "name": "Charming Presence",
      "level": 1,
      "text": "Starting at 1st level the Pact Keeper creates a pact with an entity of the spirit world grant them access to secrets to secrets of their lineage. The pact keeper gains access to the Enchantment spell list."
     },
     {
      "name": "Dream Walker",
      "level": 3,
      "text": "Starting at 3rd level the Spirit pact keeper gains the ability to mold a creatures mind and psyche within their dreams. While within 1 meter of a sleeping creature the pact keeper may enter the creatures dream. While in its dream they make take 1 hour to alter them to cause one of the following effects.\n\nBlissful Rest\nThe creatures rest was peaceful. The creature gains an 2d10+Charisma Modifier true armor upon waking up.\n\nNight Terror\nThe pact keeper interrupts the dream of the creature filling it with horrible visions. The creature gains no benefits of a rest if it was taking one. In addition the creature takes 6d6 psychic damage.\n\nRestore Spirit\nThe pact keeper restores fragments of the creatures mind and body. The creature gains an additional 2d8 mana or stamina until its next rest."
     },
     {
      "name": "Subliminal Messaging",
      "level": 8,
      "text": "Beginning at 8th level the pact keeper gains the ability to supernaturally manipulate creatures. If the pact keeper spends 10 minutes speaking to a creature it can subtly encode the a command into its conversation. The creature must succeed on a Resistance (Mind) check or be forced to follow the command to the best of its ability. The command must not be directly harmful in nature and be reasonable for the creature to be able to complete. If a creature is a spirit it recognizes the command in the speech and gains a +20 to its roll."
     },
     {
      "name": "Otherworldly Awareness",
      "level": 13,
      "text": "Beginning at 13th level the pact keeper strengthens their connection to the Spirit World. They can now identify if a creature is a spirit after 1 minute of speech. In addition they may add their charisma modifier to all Resistance (Mind) effects them."
     },
     {
      "name": "Mind Rupture",
      "level": 18,
      "text": "Beginning at 18th level a Spirit pact keeper gains the ability to consume a creature in a festering growth of the Spirit Worlds corruption. The creature must succeed on a Resistance (Mind) check or take 10d8 psychic damage. If the creature has no magical armor it becomes charmed by the Pact Keeper. At 25th level the creature is dominated. This charm lasts until the end of the pact keepers' next turn."
     },
     {
      "name": "Spirit Blossom",
      "level": 23,
      "text": "Beginning at 23rd level The Pact keeper is imbued with the beauty or horror of the spirit world. The pact keeper gains ranks in Allure and Persuasion equal to their level. Alternatively they can choose to gain ranks in Intimidate (Cha) and Deception. In addition once per day they may send a creature into a demiplane of mirrors. If the creature is unwilling it must roll a Resistance (Mind) check or be shunted into the maze like realm. A creature must succeed on a Intuition check to escape this imprisonment. A creature may repeat this save once every hour. While in this realm the creature ages 1d10 years per hour it is trapped. A creature incapable of escaping before it dies of old age does not return to the world. The Pact Keeper steals its years appearing more youthful (to a minimum of its adulthood)."
     }
    ],
    "Eternal Pact": [
     {
      "name": "Eternal Casting",
      "level": 1,
      "text": "Starting at 1st level the Pact Keeper creates a pact with an entity of undeath. The Eternal pact keeper gains access to the Pneumamancy spell list."
     },
     {
      "name": "Undead Resilience",
      "level": 3,
      "text": "Starting at 3rd level the Eternal Pact Keeper gains the ability to resist death. Once per day, if the Eternal pact keeper is reduced to 0 hit points they don't begin dying but instead are reduced to 1 hit point."
     },
     {
      "name": "Channel Death",
      "level": 8,
      "text": "Starting at 8th level the Eternal Pact Keeper gains the ability to channel the power of death. When the Eternal pact keeper casts a Necromancy its duration is increased by 1 step."
     },
     {
      "name": "Essence Vampirism",
      "level": 13,
      "text": "Starting at 13th level the Eternal Pact Keeper gains the ability to drain the source of a creature. The Eternal Pact Keeper chooses a target within 15 meters of it that must succeed a Resistance Mind check or lose 2d8 stamina or 4d6 mana. The Eternal pact keeper gains mana equal to twice the amount of stamina stolen or mana equal to the mana stolen."
     },
     {
      "name": "Undead Form",
      "level": 18,
      "text": "Starting at 18th level once per day, the Eternal Pact Keeper gains the ability to transform into an undead form reminiscent of its benefactor. This form requires concentration to maintain. The Pact Keeper gains physical and magic armor equal to their charisma score. Any creature within 5 meters of the Eternal Pact Keeper must succeed a Resistance (Mind) check or become hopeless until the end of its next turn."
     },
     {
      "name": "Immortality",
      "level": 23,
      "text": "Starting at 23rd level the Eternal Pact Keeper gains a partial aspect of the immortality of it's benefactor possesses. The Pact Keeper no longer ages and is immune to all disease. In addition they gain the ability to use Undead Resilience a number of times equal to their intelligence modifier."
     }
    ],
    "Majesty Pact": [
     {
      "name": "Draconic Defense",
      "level": 1,
      "text": "Starting at 1st level the Pact Keeper creates a pact with an entity of the draconic lineage. The Pact Keeper gains resistance 10 to air, cold, earth, fire, or poison."
     },
     {
      "name": "Draconic Infusion",
      "level": 3,
      "text": "Starting at 3rd level the Majesty Pact Keeper gains the ability to infuse their attacks with draconic energy. The Majesty Pact Keeper gains a pool of d4s equal to their charisma modifier. When the Majesty Pact Keeper deals damage of the type those choose in their draconic defense they can add any number of die from this pool to the roll. These die increase to 1d6 at 5th level, 1d8 at 10th level, 1d10 at 15 level, and 1d12 at 20th level."
     },
     {
      "name": "Draconic Aspect",
      "level": 8,
      "text": "Starting at 8th level the Majesty Pact Keeper gains the ability to manifest draconic aspects. When the Pact Keeper deals air, cold, earth, fire, or poison damage they can choose to change the damage type to that of their draconic defense."
     },
     {
      "name": "Aspect of Dragon",
      "level": 13,
      "text": "Starting at 13th level the Majesty Pact Keeper gains the ability to manifest draconic wings. The Majesty Pact Keeper gains a flight speed equal to their walk speed. In addition the pact keeper is granted treasure from its benefactors hoard allowing the Majesty Pact Keeper to pick a singular magic item worth 30,000 gp or less."
     },
     {
      "name": "Dominance",
      "level": 18,
      "text": "Starting at 18th level the Majesty Pact Keeper gains the ability to instil fear in their enemies. Once per day, the Majesty Pact Keeper can force a creature within 10 meters to make a Resistance (Mind) check or become Fearful of the Pact Keeper for 1 hour."
     },
     {
      "name": "Elemental Immunity",
      "level": 23,
      "text": "Starting at 23rd level the Majesty Pact Keeper gains immunity to the damage they chose for their draconic defense."
     }
    ]
   }
  },
  "Grove Keeper": {
   "page": "grove-keeper.html",
   "resource": "mana",
   "slotType": "spell",
   "hitDie": 8,
   "primary": "int",
   "secondary": "wits",
   "saves": {
    "mind": "Good",
    "body": "Average",
    "evasion": "Poor"
   },
   "primaryBonus": [
    2,
    2,
    3,
    4,
    5,
    6,
    6,
    7,
    8,
    10,
    12,
    12,
    14,
    16,
    19,
    22,
    22,
    25,
    28,
    32,
    36,
    36,
    40,
    44,
    49
   ],
   "secondaryBonus": [
    1,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    7,
    7,
    7,
    10,
    10,
    13,
    13,
    13,
    17,
    17,
    21,
    21,
    21,
    26
   ],
   "resourceTable": [
    3,
    6,
    9,
    12,
    15,
    18,
    21,
    24,
    27,
    30,
    33,
    36,
    39,
    42,
    45,
    48,
    51,
    54,
    57,
    60,
    63,
    66,
    69,
    72,
    75
   ],
   "slots": [
    4,
    4,
    4,
    6,
    6,
    6,
    8,
    8,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    12,
    12,
    14,
    16,
    16,
    16,
    16,
    16
   ],
   "skillRanks": [
    2,
    2,
    2,
    4,
    4,
    4,
    6,
    6,
    6,
    8,
    8,
    8,
    10,
    10,
    10,
    12,
    12,
    12,
    14,
    14,
    14,
    16,
    16,
    16,
    18
   ],
   "prof": [
    "1 Melee Weapon",
    "Light and Medium Shields",
    "Light and Medium Armor"
   ],
   "features": [
    {
     "name": "Advocate of Nature",
     "level": 1,
     "text": "Starting at first level Grove Keepers gain the ability to enter the \"Dream of Nature\". While in this meditative state, the Grove Keepers enter a dream-like state allowing them able communicate with plants and beasts in nature. Magical beasts or beasts that know a language are not applicable to this feature. Grove Keepers also gain access to Nature Spells."
    },
    {
     "name": "Touch of Regression",
     "level": 5,
     "text": "As a Grove Keeper's connection to nature deepens they gain the ability to restore objects to the state nature intended. Using 4 AP and 5 Mana the Grove Keeper may touch a nonmagical refined object and return it to its natural resources. A sword or armor made of steel will return to iron and coal. This rapid reversion causes any object less than 5 feet wide or long to lose its form crumbling to a fine powder of its raw materials. If an object is larger than 1 meter the Grove Keeper always pulls the safer material into their hand if they choose to hold any. A creature carrying or wearing the targeted object may attempt to avoid this effect by rolling an evasion check contested against the Grove Keeper's unarmed attack roll."
    },
    {
     "name": "Overgrowth",
     "level": 10,
     "text": "A growth of wildlife begins to grow on the Grove Keeper as nature bestows its roots into its vessel. This growth makes the Grove Keeper gain +10 poison resistance and increases their AC by 5. The growth acts as natural camouflage and the Grove Keeper gains a +10 bonus to stealth checks."
    },
    {
     "name": "Grove Warden",
     "level": 15,
     "text": "The Grove Keeper harnesses borrowed power from the spirits of the grove. For 2 AP the Grove Keeper grants immunity to the charmed condition to any creature within 1 meter of themselves."
    },
    {
     "name": "Wrath of Nature",
     "level": 20,
     "text": "The Grove Keeper is now seen as the embodiment of nature. They gain 2 levels in nature and survival skills. Whenever they cast a spell or melee attack that deals earth damage they add 2 damage for each die rolled and treat earth resistance as if it were 10 lower."
    },
    {
     "name": "Sanctity of The Grove",
     "level": 25,
     "text": "Whenever they Grove Keeper gains +10 resistance to all damage, gain +50 maximum hit points, and may spend 2 action points to regain 20 hit points."
    }
   ],
   "subclasses": {
    "Shifter": [
     {
      "name": "Animal Forms",
      "level": 1,
      "text": "Starting at 1st level twice per rest the Grove Keeper may spend 2 AP you gain the ability to take the forms of lesser nonmagical animals found in nature for 1 hour. They may assume the form of any beast of Threat Rating 1. While shifted they lose the ability to cast spells that require sigils to cast unless the new form is capable of performing hand gestures. They retain their health, racial, and class features while shifting and gaining the abilities of the new form. All equipment worn and carried is dropped at the location they shift. While the new form may be able to carry the equipment it is incapable of using them. If reduced to 0 hit points or slain while shifted the Grove Keeper reverts to its original form."
     },
     {
      "name": "Arcane Forms",
      "level": 8,
      "text": "Starting at 8th level the Grove Keeper focuses its mind sharpening their shifting. Starting at 8th level the Threat Rating of shifting increases to 3. In addition, while shifted they may spend an additional 2 AP while casting a spell to perform arcane sigils if the new form is incapable of doing so."
     },
     {
      "name": "Hybrid Forms",
      "level": 13,
      "text": "Starting at 13th level the Grove Keeper gains the ability to modify the form between itself and the animal they shift into allowing them to become bipedal and have human hands. While shifted they are now capable of using equipment as if not shifted."
     },
     {
      "name": "Duality of the Body",
      "level": 18,
      "text": "Starting at 18th level the Grove Keeper begins to master the art of shifting. The threat rating of shifting increases to 8 and they can now choose 2 animals to shift into gaining the abilities of both animals simultaneously.\n\nSupernatural Forms\nAt level 23 the Grove Keeper masters the art of shifting into creatures. They may now choose magical beasts and the threat rating increases to 10. In addition, they no longer have a maximum duration on the time to maintain a shifted form."
     }
    ],
    "Decay": [
     {
      "name": "Decrepit Touch",
      "level": 1,
      "text": "Starting at 1st level the Grove Keeper gains the ability to cause decay to one creature they touch. The Grove Keeper makes a melee attack roll against one creature it can see within 1 meter of itself. On a successful hit, the creature takes 2d6+ Intelligence Modifier physical damage. A creature with no physical armor struck by this attack must roll a fortitude save against the Grove Keepers spell DC or lose 2 AP on its next turn."
     },
     {
      "name": "Plague Master",
      "level": 8,
      "text": "Starting at 8th level the Grove Keeper gains the ability to spread and cleanse disease in its surroundings. Spending 1 AP it may absorb the poisoned and diseased condition from creatures and covered tiles within 10 meters of itself. For each tile and creature cleansed, they may add a d6 poison damage to each attack or spell for the turn."
     },
     {
      "name": "Festering Growth",
      "level": 13,
      "text": "Starting at 13th level the Grove Keeper may spend 4 AP and 20 mana to create a noxious spore cloud in a 15-meter cube centered around it. Any creature that starts, enters, or ends its turn in this cloud takes 8d6+ Intelligence Modifier poison damage. A creature that takes this damage and has no magical armor is poisoned until it leaves the cloud. The cloud lasts for 1 round."
     },
     {
      "name": "Horrific Decay",
      "level": 18,
      "text": "Starting at 18th level whenever the Grove Keeper casts a spell or performs a melee attacks that deals poison damage it made add 2 damage for each die rolled and treat poison resistance as if it were 10 lower. In addition, the Grove Keepers poison resistance increases by 10."
     },
     {
      "name": "Master of Decay",
      "level": 23,
      "text": "Starting at 23rd level the Grove Keeper imposes decay with ease. All actions that deal poison damage or apply disease cost 1 AP less to a minimum of 1 AP."
     }
    ],
    "Shepherd": [
     {
      "name": "One with Nature",
      "level": 1,
      "text": "Starting at 1st level a shepherd Grove Keeper uses its Intelligence for all Animal Handle checks and gains levels in animal handling equal to its level."
     },
     {
      "name": "Animal Companion",
      "level": 1,
      "text": "Starting at 1st level the spirits that follow the shepherd gain the ability to convince the animals it speaks with. The Grove Keeper may choose an animal companion that aids them in day-to-day tasks. While in combat the companion acts in initiative at the end of each of the Grove Warden's turns. You may choose from one of the following options, Avian, Aquatic, Terrestrial, Subterrestrial\n\nAnimal Companion\nCreature type: Beast\nSize:\nAvion: Small\nAquatic: Medium\nTerrestrial: Medium\nSubterranean: Medium\n\nPhysical Armor:\nTerrestrial: 30\nAquatic: 20\nSubterrestrial: 40\nAvion: 10\n\nMagic Armor\nTerrestrial: 30\nAquatic: 40\nSubterrestrial: 20\nAvion: 10\n\nArmor Class:\nTerrestrial: 15\nAquatic: 15\nSubterrestrial: 17\nAvion: 20\n\nHit Points:\nTerrestrial: 15\nAquatic: 20\nSubterrestrial: 25\nAvion: 5\n\nAlignment: N/A\nThreat Rating: N/A\nLanguages: None\nSpeed: Terrestrial: 5\nAquatic: 2 Walk, 5 Swim\nSubterrestrial: 3 Walk, 3 Dig\nAvion: 2 Walk, 10 Fly\n\nResistance:\nImmunities: None\n\nStrength Terrestrial: 15\nAquatic: 12\nSubterrestrial: 18\nAvion: 4\n\nFinesse Terrestrial: 15\nAquatic: 12\nSubterrestrial: 4\nAvion: 18\n\nFortitude\nTerrestrial: 12\nAquatic: 10\nSubterrestrial: 14\nAvion: 6\n\nIntelligence: 3\nWits: 13\nCharisma: 8\n\nActions\nMax AP: 4\n\nBite\nAttack Bonus: Strength/Dex\nAttack Damage: 1d6+Strength/Dex"
     },
     {
      "name": "Borrowed Sight",
      "level": 8,
      "text": "Starting at 8th level the Grove Keeper gains the ability to see through the animals in its surroundings. When the Shepard enters its Dream of Nature it can choose an animal within range and see and hear through its eyes and ears. The Grove Keeper uses their own Sense environment or the Animals whichever is higher."
     },
     {
      "name": "Beast Speech",
      "level": 13,
      "text": "Starting at 13th level the shepherd Grove Keeper gains help from the spirits in translating language. The Grove Keeper gains the ability to speak with all beasts and magical beasts. When speaking to an animal they are treated as friends and if aggressive must roll a Resistance (Mind) check against the Grove Wardens Magic Potency DC at the start of each of its turns when it attacks them. On a failure, the creature must pick a new target to attack within range or lose the attack."
     },
     {
      "name": "Tree Stride",
      "level": 18,
      "text": "Starting at 18th level a Shepherd Grove Keeper gains the ability to travel between the trees. When the Grove Keeper is within 5 meters of any tree they may enter it. While inside the tree they may not be targeted by any attacks or spells and may choose to be transported to any tree within 1 Kilometer of the tree they are inside. The Grove Warden is supernaturally aware of all trees present within the radius unless magic or some other effect prevents telepathy or teleportation affects the tree they are inside or with to transport to. If the tree they are inside is destroyed they take 10d12 magic damage and are shunted to the nearest unoccupied space."
     },
     {
      "name": "Leader of the Pack",
      "level": 23,
      "text": "Starting at 23rd level any beast or magical beast or beast that attacks the shepherd that’s threat rating is less than or equal to its Grove Keeper levels automatically fails its Resistance (Mind) check to attack the shepherd."
     }
    ],
    "Nature's Sentinel": [
     {
      "name": "Guardian's Destiny",
      "level": 1,
      "text": "Starting at 1st level the Nature's Sentinel gains proficiency in medium armor and skilled weapons"
     },
     {
      "name": "Nature Ward",
      "level": 8,
      "text": "Starting at 8th level the Nature's Sentinel gains the ability to mark itself as a protector of nature. For a number of rounds equal to the Nature Sentinel's wits all creatures within 10 meters must succeed a Overpower check or become pinned as vines hold the creature in place. A pinned creature takes 2d6 true damage at the start of each of its turns. A pinned creature may repeat its save at the start of each of their turns."
     },
     {
      "name": "Lullaby",
      "level": 13,
      "text": "Starting at 13th level the Nature's Sentinel once per day can lace their words with enchantment magic to sing a lullaby that effects all living creatures. Any creature that isn't a Golem, Undead, Outsider, or Elemental that can hear the Nature Sentinel sing must succeed on a Resistance Mind check or fall unconscious for 10 minutes. A creature wakes up when it takes damage or is shaken awake."
     },
     {
      "name": "Monkey's Paw",
      "level": 18,
      "text": "Starting at 18th level the Nature's Sentinel can imbue a creature with bad luck a number of times per day equal to its wits modifier. Whenever a creature within 10 meters of the Nature's Sentinel makes a check or save they can choose to make them roll twice and take the lower result. This must be used before the outcome is determined."
     },
     {
      "name": "Mist of the Grove",
      "level": 23,
      "text": "Starting at 23rd level the Nature's Sentinel gains the ability to create a mist that covers the battlefield. Once per day, the Nature's Sentinel creates a 20-meter cube of mist that obscures all vision. Any creature that starts, enters, or ends its turn in the mist takes 8d6+ Intelligence Modifier earth damage and is blind. The mist lasts for 1 round."
     }
    ],
    "Spirit Channeler": [
     {
      "name": "Spirit Speaker",
      "level": 1,
      "text": "Starting at 1st level the Spirit Channeler learns Spiritual and gains levels in Knowledge Spirital equal to their level."
     },
     {
      "name": "Spirit Guide",
      "level": 8,
      "text": "Starting at 8th level once per day, the Spirit Channeler gains the ability to summon a lesser spirit to guide them. The spirit is one of the following options.\nBakeneko: A cat spirit that grants the Spirit Channeler +5 to stealth checks.\nKitsune: A fox spirit that grants the Spirit Channeler +5 to deception checks.\nTanuki: A raccoon dog spirit that grants the Spirit Channeler +5 to persuasion checks.\nTengu: A crow spirit that grants the Spirit Channeler +5 to perception checks.\nThe spirit can communicate with the Spirit Channeler telepathically and can be summoned for 1 hour."
     },
     {
      "name": "Spirit Walk",
      "level": 13,
      "text": "Starting at 13th level the Spirit Channeler gains the ability to weaken the border between the spirit world and themselves. A number of times per day equal to their wits modifier, the Spirit Channeler may order the spirits in the surrounding area to attack a creature within 15 meters of themselves. The target must succeed on a Resistance (Mind) check or take 8d4+ Intelligence Modifier psychic damage."
     },
     {
      "name": "Medium",
      "level": 18,
      "text": "Starting at 18th level the Spirit Channeler merges with a lesser spirit. The Spirit Channeler selects a lesser spirit and its bonus is doubled and permanent."
     },
     {
      "name": "Spirit Guide",
      "level": 23,
      "text": "Starting at 23rd level the Spirit Channeler gains the ability to summon a greater spirit to guide them when using spirit guide.\nYuki Onna: A spirit of an ice woman that grants the Spirit Channeler the ability ot cast one grand Hydromancy spell per day.\nShinigami: A spirit of a death that grants the Spirit Channeler the ability to cast one grand Necromancy spell per day.\nOni: A spirit symbolic of war that when summoned targets all creatures within 10 meters of the Spirit Channeler and deals 15d12+ Intelligence Modifier psychic damage."
     }
    ],
    "Old Guard": [
     {
      "name": "Totem Caller",
      "level": 1,
      "text": "Starting at 1st level the Old Guard creates a wooden totem representing various aspects of nature.\nBeast: The Old Guard gains +2 to attack rolls and gains a natural weapon with the Cleave property that uses intelligence for attack and damage rolls that they are proficient in.\nTree: The Old Guard gains +2 to Resistance Body and Resistance Mind checks and gains resistance 5 to all damage. Water: The Old Guard gains a +2 to Evasion checks and when subjected to an effect that allows half damage on a success they take no damage instead.\nWind: The Old Guard gains a +4 to Initiative and Evasion checks and has their movement speed increased by 4."
     },
     {
      "name": "Defender of the Wild",
      "level": 8,
      "text": "Starting at 8th level the Old Guard become more in tune with nature and can create a second totem."
     },
     {
      "name": "Totem Investment",
      "level": 13,
      "text": "Starting at 13th level the Totem Caller can create an improved totem. Magical Beast: The Old Guard gains physical armor equal to half of their magical armor.\nGreat Tree: The Old Guard gains resistance 10 to all damage and gains 10 hit points at the start of each of their turns as long as they are above 0 health and their AP maximum is above 0.\nRiver: The Old Guard no longer needs to roll Evasion checks to avoid opportunity attacks when leaving a hostile creatures melee range.\nGale: When the The Old Guard rolls Initiative and Evasion checks the die roll is treated as a 10 if its lower."
     },
     {
      "name": "Shaman of the Seasons",
      "level": 18,
      "text": "Starting at 18th level the Old Guard gains the ability to change their totem to match a season granting the following benefits. Winter: The Old Guard becomes immune to cold damage and gains levels in Endurance equal to their level.\nAutumn: The Old guard becomes immune to air damage and gains levels in Traverse Finesse equal to their level.\nSummer: The Old Guard becomes immune to fire damage and gains levels in Intimidate Charisma equal to their level.\nSpring: The Old Guard becomes immune to earth damage and gains levels in Knowledge Medical equal to their level."
     },
     {
      "name": "Solstice",
      "level": 23,
      "text": "Starting at 23rd level the Old Guard can change the totems they have at the end of each full rest."
     }
    ],
    "Cosmic Conduit": [
     {
      "name": "Stars Align",
      "level": 1,
      "text": "Starting at 1st level the Cosmic Conduit can alter fate by harnessing cosmic energy. A number of times equal to their wits modifier per day the Cosmic Conduit can add 1d6 that failed potentially turning it into a success."
     },
     {
      "name": "Celestial Body",
      "level": 8,
      "text": "Starting at 8th level the Cosmic Conduit gains the ability to channel cosmic energy into their spells. The Cosmic Conduit gains a pool of Cosmic Energy equal to their level. The Cosmic Conduit can spend a number of points equal to the tier of the spell being cast to increase any random numeric values by 50%."
     },
     {
      "name": "Starlight",
      "level": 13,
      "text": "Starting at 13th level the Cosmic Conduit gains the ability to create a 10-meter cube of starlight. Any creature that starts, enters, or ends its turn in the starlight takes 8d6+ Intelligence Modifier holy damage and must succeed a Resistance Body check or become blind until the end of its next turn. The starlight lasts for 1 round."
     },
     {
      "name": "Astral Form",
      "level": 18,
      "text": "Starting at 18th level the Cosmic Conduit gains the ability to merge themselves with the cosmos. Once per day, they can take the appearance of space their body appearing as a black void filled with nebulas, stars, planets and other celestial bodies. While in this form the Cosmic Conduit can move through creatures and objects at half speed. The Cosmic Conduit can maintain this form for a number of rounds equal to their wits modifier."
     },
     {
      "name": "Starburst",
      "level": 23,
      "text": "Starting at 23rd level the Cosmic Conduit gains the ability to create a ray of concentrated starlight. Once per day, the Cosmic Conduit targets a creature within 20 meters and deals 20d10 holy damage. This beam then leaps to 5 other creatures so long as the next creature is within 10 meters of the last target. A creature reduced to 0 health by this attack is slain and leaves no physical remains as they explode leaving behind a cloud of star dust."
     }
    ]
   }
  }
 },
 "saveFraction": {
  "Good": 1,
  "Average": 0.5,
  "Poor": 0.3333333333333333
 },
 "races": [
  {
   "name": "Dwarf",
   "statsText": "Fortitude +2",
   "fixed": [
    {
     "stat": "fort",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 4
   },
   "speedText": "Walk 4",
   "type": "Humanoid",
   "alignment": "Any Neutral",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Dwarvish",
   "lifespan": "Dwarves age at the same rate as humans, reaching maturity at 18, but live upward of 150 years.",
   "abilities": [
    {
     "name": "Natural Resilience",
     "text": "dwarves are sturdy. Add double your level to your maximum Physical and Magical Armor."
    }
   ],
   "auto": {
    "armorPerLevel": 2
   }
  },
  {
   "name": "Avatol",
   "statsText": "Intelligence +2, Memory +1",
   "fixed": [
    {
     "stat": "int",
     "value": 2
    },
    {
     "stat": "mem",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5,
    "fly": 5
   },
   "speedText": "Walk 5, Fly 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, 1 language of choice",
   "lifespan": "Avatols age at the same rate as humans.",
   "abilities": [
    {
     "name": "Skyborn",
     "text": "Fibris, goddess of the sky, blesses you. Choose 2 Minor Aeromancy spells. Cast each once per full rest without spending Mana."
    }
   ],
   "auto": {}
  },
  {
   "name": "Elf",
   "statsText": "Finesse +2",
   "fixed": [
    {
     "stat": "fin",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any Good",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Elvish",
   "lifespan": "Elves mature at 30 and live upward of 250 years.",
   "abilities": [
    {
     "name": "Nature's Embrace",
     "text": "add half your level to all Knowledge (Nature), Sense Environment, and Survival checks. When a natural environment causes difficult terrain, your movement penalty is halved."
    },
    {
     "name": "Shared Memories",
     "text": "a number of times per full rest equal to your level, taste a creature's fresh flesh to read its memories. Choose one: add 1d4 to your next check with a skill the creature had ranks in, or learn one fact from its memories, chosen by the GM."
    }
   ],
   "auto": {
    "skillHalfLevel": [
     "Knowledge (Nature)",
     "Sense Environment",
     "Survival"
    ]
   }
  },
  {
   "name": "Human",
   "statsText": "Intelligence +2, Memory +2",
   "fixed": [
    {
     "stat": "int",
     "value": 2
    },
    {
     "stat": "mem",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, 1 language of choice",
   "lifespan": "Humans reach maturity at 18 and live up to 100 years.",
   "abilities": [
    {
     "name": "Skilled",
     "text": "you gain extra skill ranks equal to your level."
    }
   ],
   "auto": {
    "skillRanksPerLevel": 1
   }
  },
  {
   "name": "Demi Angel",
   "statsText": "Charisma +2, Wits +1",
   "fixed": [
    {
     "stat": "cha",
     "value": 2
    },
    {
     "stat": "wits",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5,
    "fly": 5
   },
   "speedText": "Walk 5, Fly 5",
   "type": "Humanoid",
   "alignment": "Any Good",
   "resist": [
    {
     "type": "Holy",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal, Enochian",
   "lifespan": "Demi angels mature at the same rate as humans and live upward of 300 years.",
   "abilities": [
    {
     "name": "Healing Ichor (2 AP, touch)",
     "text": "your celestial blood saves others from grievous wounds. Lose any amount of Health. One creature you touch regains the same amount."
    },
    {
     "name": "Grace",
     "text": "when a Heavenly spell outside the Retribution subschool targets you, add your level ÷ 5 to its healing."
    }
   ],
   "auto": {}
  },
  {
   "name": "Demi Fiend",
   "statsText": "Charisma +2, Strength +1",
   "fixed": [
    {
     "stat": "cha",
     "value": 2
    },
    {
     "stat": "str",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5,
    "fly": 5
   },
   "speedText": "Walk 5, Fly 5",
   "type": "Humanoid",
   "alignment": "Any Evil",
   "resist": [
    {
     "type": "Unholy",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal, Bellsybabble",
   "lifespan": "Demi fiends mature at the same rate as humans but live upward of 300 years.",
   "abilities": [
    {
     "name": "Cursed Bloodline",
     "text": "your corrupted blood lets you inflict grievous wounds on others and protects you from the spells of your cursed bloodline. You count as a Fiend for all effects, magical or not."
    },
    {
     "name": "Destruction",
     "text": "whenever you deal damage to another creature, add half your level to the damage."
    }
   ],
   "auto": {
    "damageHalfLevel": true
   }
  },
  {
   "name": "Deadspawn",
   "statsText": "Same as your previous race",
   "fixed": [],
   "choices": [],
   "previousRace": true,
   "size": "Medium",
   "speed": {},
   "speedText": "Same as your previous race",
   "type": "Undead",
   "alignment": "Usually Neutral",
   "resist": [],
   "resistChoice": null,
   "languages": "2 languages of choice",
   "lifespan": "Deadspawn age as their previous race does but stop aging at their breaking point.",
   "abilities": [
    {
     "name": "Grave Affinity",
     "text": "when you gain Dying, you stay Dying for 5 + your level rounds and keep acting in initiative as normal."
    }
   ],
   "auto": {}
  },
  {
   "name": "Dragonkin",
   "statsText": "Strength +2",
   "fixed": [
    {
     "stat": "str",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any Evil",
   "resist": [],
   "resistChoice": {
    "value": 10,
    "options": [
     "Fire",
     "Cold",
     "Earth",
     "Poison",
     "Air"
    ]
   },
   "languages": "Universal, Draconic",
   "lifespan": "Dragonkin reach maturity at 50 and live upward of 500 years.",
   "abilities": [
    {
     "name": "Breath of the Ancients (3 AP)",
     "text": "exhale the breath of your ancestors in a 3 m cone. It deals 1d6 damage per 2 levels, minimum 1d6, of the type you chose for your Racial Resistance. Each target makes an Evasion save against your primary DC and takes half damage on a success. The breath recharges after 1d4 rounds."
    },
    {
     "name": "Draconic Heritage",
     "text": "you gain +2 to your AC."
    }
   ],
   "auto": {
    "ac": 2
   }
  },
  {
   "name": "Demi Spirit",
   "statsText": "Wits +2, Charisma +1",
   "fixed": [
    {
     "stat": "wits",
     "value": 2
    },
    {
     "stat": "cha",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any Chaotic",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Spirit",
   "lifespan": "Demi spirits are erratic, reaching maturity between 15 and 30, and live upward of 200 years.",
   "abilities": [
    {
     "name": "Spiritual Form (2 AP)",
     "text": "your body is not tied to one form. Take the form of any humanoid-like creature you have seen. The new form must share your size category. You keep your own speeds and features. A Demi Angel form gives you no flight and no Demi Angel traits."
    }
   ],
   "auto": {}
  },
  {
   "name": "Kull",
   "statsText": "Intelligence +2",
   "fixed": [
    {
     "stat": "int",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any Evil",
   "resist": [
    {
     "type": "Poison",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal, Kull",
   "lifespan": "Kull reach maturity at 10 and live upward of 50 years.",
   "abilities": [
    {
     "name": "Venomous Fangs",
     "text": "the blood of the Nagas flows in your body. You have a natural weapon with the light and hidden properties, dealing 1d4 piercing damage. When your bite hits, the target makes a Resistance (Body) save, DC 10 + your level. On a failure, it is Poisoned, and the venom Paralyzes it for a number of hours equal to your level. The paralysis is a poison effect. The target repeats the save at the end of each of its turns and ends the effect on a success."
    }
   ],
   "auto": {}
  },
  {
   "name": "Gnome",
   "statsText": "Finesse +1, Intelligence +1",
   "fixed": [
    {
     "stat": "fin",
     "value": 1
    },
    {
     "stat": "int",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Small",
   "speed": {
    "walk": 4
   },
   "speedText": "Walk 4",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Elvish",
   "lifespan": "Gnomes have the same lifespan as humans.",
   "abilities": [
    {
     "name": "Earthborn",
     "text": "the ancient magic of Cecylla's blessing runs in your bloodline. Choose 2 Minor Geomancy or Nature spells. Swap them every 5 levels. Cast each once per full rest without spending Mana."
    }
   ],
   "auto": {}
  },
  {
   "name": "Orc",
   "statsText": "Strength +2",
   "fixed": [
    {
     "stat": "str",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Large",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Orcish",
   "lifespan": "Orcs reach maturity at 15 and live upward of 80 years.",
   "abilities": [
    {
     "name": "Unyielding Might",
     "text": "the fury of the old warlords flows through your blood. A number of times per full rest equal to your level, reroll a check which applied a harmful condition or dealt damage to you. This works alongside other reroll abilities on the same check, but you use it only once per check."
    }
   ],
   "auto": {}
  },
  {
   "name": "Half Elf",
   "statsText": "Finesse +1, +1 to a stat of choice",
   "fixed": [
    {
     "stat": "fin",
     "value": 1
    }
   ],
   "choices": [
    {
     "options": [
      "str",
      "fin",
      "fort",
      "cha",
      "wits",
      "int",
      "mem"
     ],
     "value": 1
    }
   ],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Elvish",
   "lifespan": "Half elves mature at the same rate as humans and live upward of 200 years.",
   "abilities": [
    {
     "name": "Best of Both",
     "text": "you are a rare child of an elf and a human. You gain extra skill ranks equal to half your level, and you ignore movement penalties from difficult terrain in natural areas."
    }
   ],
   "auto": {
    "skillRanksHalfLevel": true
   }
  },
  {
   "name": "Kendarkai",
   "statsText": "Wits +1",
   "fixed": [
    {
     "stat": "wits",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Magical Beast",
   "alignment": "Any",
   "resist": [
    {
     "type": "Magic",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal, Kendar",
   "lifespan": "Kendarkai reach maturity at 1 year old and live upward of 10 years.",
   "abilities": [
    {
     "name": "Perfection",
     "text": "as a Kendarkai who has left the swarm, you keep your racial adaptations. Choose two different adaptations below. No adaptation twice.<br><b>Winged:</b> you gain a fly speed of 5.<br><b>Thick Carapace:</b> you gain +2 to your AC.<br><b>Antennae:</b> you gain +2 to Sense Environment checks.<br><b>Hardened Exoskeleton:</b> attackers have −10 Critical Chance against you."
    }
   ],
   "auto": {
    "adaptations": [
     {
      "name": "Winged",
      "text": "Fly speed 5.",
      "speed": {
       "fly": 5
      }
     },
     {
      "name": "Thick Carapace",
      "text": "+2 AC.",
      "ac": 2
     },
     {
      "name": "Antennae",
      "text": "+2 Sense Environment.",
      "skill": {
       "Sense Environment": 2
      }
     },
     {
      "name": "Hardened Exoskeleton",
      "text": "Attackers have −10 Critical Chance against you."
     }
    ]
   }
  },
  {
   "name": "Half Orc",
   "statsText": "Strength +1, +1 to a stat of choice",
   "fixed": [
    {
     "stat": "str",
     "value": 1
    }
   ],
   "choices": [
    {
     "options": [
      "str",
      "fin",
      "fort",
      "cha",
      "wits",
      "int",
      "mem"
     ],
     "value": 1
    }
   ],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, 1 language of choice",
   "lifespan": "Half orcs share the lifespan of orcs.",
   "abilities": [
    {
     "name": "Bloodlust",
     "text": "your ancestry fuels a primal lust for blood in brutal strikes of glory. When you roll for a Critical or Decisive Strike, your Critical Chance increases by 10."
    }
   ],
   "auto": {
    "crit": 10
   }
  },
  {
   "name": "Qeptol",
   "statsText": "Fortitude +2, Strength +1",
   "fixed": [
    {
     "stat": "fort",
     "value": 2
    },
    {
     "stat": "str",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Plant",
   "alignment": "Any",
   "resist": [
    {
     "type": "Earth",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal",
   "lifespan": "Qeptol are created mature and live upward of 300 years.",
   "abilities": [
    {
     "name": "Cecylla's Blessing",
     "text": "you gain +5 to Resistance (Body) saves. You need no food or sleep, but you must spend at least 6 hours in sunlight each day."
    }
   ],
   "auto": {
    "save": {
     "body": 5
    }
   }
  },
  {
   "name": "Beastman",
   "statsText": "Finesse or Strength +2",
   "fixed": [],
   "choices": [
    {
     "options": [
      "fin",
      "str"
     ],
     "value": 2
    }
   ],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 6
   },
   "speedText": "Walk 6",
   "type": "Beast",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Cryptic",
   "lifespan": "Beastmen mature at 20 and live upward of 60 years.",
   "abilities": [
    {
     "name": "The Hunt",
     "text": "once per full rest, channel The Hunt for 1 minute. You gain a bonus to attack rolls and Resistance (Body) saves equal to your level, +5 to tracking creatures, and +2 to your Speed. When it ends, you gain Exhausted until you complete a partial rest."
    }
   ],
   "auto": {
    "hunt": true
   }
  },
  {
   "name": "Goblin",
   "statsText": "Finesse +1",
   "fixed": [
    {
     "stat": "fin",
     "value": 1
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Small",
   "speed": {
    "walk": 4
   },
   "speedText": "Walk 4",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, Orcish",
   "lifespan": "Goblins reach maturity at 10 and live upward of 30 years.",
   "abilities": [
    {
     "name": "Nightstalker",
     "text": "you are nimble. You gain +2 to Evasion saves and 10 m Dark Sight."
    },
    {
     "name": "Ambush Expert",
     "text": "Sneak and Sleight of Hand cost you 1 AP less. You gain +5 to all checks involving traps."
    }
   ],
   "auto": {
    "save": {
     "evasion": 2
    }
   }
  },
  {
   "name": "Predator Slime",
   "statsText": "Fortitude +2",
   "fixed": [
    {
     "stat": "fort",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Slime",
   "alignment": "Any",
   "resist": [],
   "resistChoice": null,
   "languages": "Universal, 1 language of choice",
   "lifespan": "Predator slimes reach maturity in a few months and have no maximum lifespan.",
   "abilities": [
    {
     "name": "Predatory Instincts",
     "text": "your gelatinous, amorphous body fits through any gap 1 cm or larger. You take the shape of any humanoid you have consumed, or your original humanoid form."
    },
    {
     "name": "Specialized Pseudopod",
     "text": "you have a natural weapon dealing 1d6 + Strength or Finesse modifier Piercing, Slashing, or Bludgeoning damage, chosen when you form it. At 1st level and every 5 levels after, add one property: deadly, reach, ranged (30 m), defensive, cleave, or enchanted. Absorb one magic melee weapon at a time to give the pseudopod its special property."
    }
   ],
   "auto": {}
  },
  {
   "name": "Aquarii",
   "statsText": "Strength +2",
   "fixed": [
    {
     "stat": "str",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5,
    "swim": 5
   },
   "speedText": "Walk 5, Swim 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [
    {
     "type": "Cold",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal, Aquarian",
   "lifespan": "Aquarii mature at 25 and live up to 100 years.",
   "abilities": [
    {
     "name": "Depthlurker",
     "text": "you have lungs and gills, so you breathe underwater, and you are immune to the effects of water pressure at extreme depths."
    },
    {
     "name": "Echolocation (3 AP)",
     "text": "send low sound pulses, imperceptible to most creatures, through a 10 m radius. You learn which objects and creatures there are physical, which exposes illusions with no physical form. Gain +5 on Sense Environment checks until your next turn. Pulses stop at solid barriers."
    }
   ],
   "auto": {}
  },
  {
   "name": "Moon Elf",
   "statsText": "Finesse +2",
   "fixed": [
    {
     "stat": "fin",
     "value": 2
    }
   ],
   "choices": [],
   "previousRace": false,
   "size": "Medium",
   "speed": {
    "walk": 5
   },
   "speedText": "Walk 5",
   "type": "Humanoid",
   "alignment": "Any",
   "resist": [
    {
     "type": "Fire",
     "value": 10
    }
   ],
   "resistChoice": null,
   "languages": "Universal, 1 language of choice",
   "lifespan": "Moon elves share the lifespan of elves.",
   "abilities": [
    {
     "name": "Ashborn",
     "text": "choose 2 Minor Pyromancy spells. Cast each once per full rest without spending Mana."
    },
    {
     "name": "Shared Memories",
     "text": "Moon Elves have the Elf's Shared Memories ability."
    }
   ],
   "auto": {}
  }
 ],
 "sizes": [
  {
   "name": "Tiny",
   "str": 0,
   "space": "1 m",
   "reach": "1 m"
  },
  {
   "name": "Small",
   "str": 0,
   "space": "1 m",
   "reach": "1 m"
  },
  {
   "name": "Medium",
   "str": 0,
   "space": "1 m",
   "reach": "1 m"
  },
  {
   "name": "Large",
   "str": 4,
   "space": "2 m",
   "reach": "2 m"
  },
  {
   "name": "Giant",
   "str": 8,
   "space": "4 m",
   "reach": "3 m"
  },
  {
   "name": "Titanic",
   "str": 16,
   "space": "8 m",
   "reach": "5 m"
  },
  {
   "name": "Kaiju",
   "str": 32,
   "space": "16 m",
   "reach": "8 m"
  }
 ],
 "skills": [
  {
   "name": "Allure",
   "stat": "cha",
   "armorPenalty": false,
   "desc": "How interesting or attractive you are to others."
  },
  {
   "name": "Animal Handling",
   "stat": "cha",
   "armorPenalty": false,
   "desc": "Interact with unintelligent creatures."
  },
  {
   "name": "Balance",
   "stat": "fin",
   "armorPenalty": true,
   "desc": "Keep your footing when you struggle to stay standing without being physically moved."
  },
  {
   "name": "Deception",
   "stat": "cha",
   "armorPenalty": false,
   "desc": "Deceive others."
  },
  {
   "name": "Endurance",
   "stat": "fort",
   "armorPenalty": false,
   "desc": "When a task is tiring to complete or continue, roll Endurance to see if you have the stamina to keep going."
  },
  {
   "name": "Heavy Object Interaction",
   "stat": "str",
   "armorPenalty": true,
   "desc": "Lift, push, or pull an object within 5 kg of your carrying capacity. On a failure, you gain Tired."
  },
  {
   "name": "Inspect Object",
   "stat": "wits",
   "armorPenalty": false,
   "desc": "Identify the features or traits of an object. Use it to find traps connected to objects or to tell whether an object is magical."
  },
  {
   "name": "Intimidate (Cha)",
   "stat": "cha",
   "armorPenalty": false,
   "desc": "Intimidate a creature with words. Contested by Resistance (Mind). If you have no intention of following through on the threat, the target uses Intuition instead."
  },
  {
   "name": "Intimidate (Str)",
   "stat": "str",
   "armorPenalty": false,
   "desc": "Intimidate a creature with physical stature or force. Contested by Resistance (Mind). If you have no intention of following through on the threat, the target uses Intuition instead."
  },
  {
   "name": "Intuition",
   "stat": "wits",
   "armorPenalty": false,
   "desc": "How honed your instincts are. Use it to sense danger, or to judge the truth of a statement by feeling."
  },
  {
   "name": "Knowledge (Arcane)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "Knowledge of arcane magic."
  },
  {
   "name": "Knowledge (Demonic)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "Knowledge of the Underworld and fiends."
  },
  {
   "name": "Knowledge (Divine)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "Knowledge of divine magic and religion."
  },
  {
   "name": "Knowledge (History)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "Knowledge of past places, events, and people."
  },
  {
   "name": "Knowledge (Medical)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "Knowledge of medicinal treatments and the general anatomy of creatures. Also used to stabilize a dying creature."
  },
  {
   "name": "Knowledge (Nature)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "General knowledge of plants, animals, and environments."
  },
  {
   "name": "Knowledge (Spiritual)",
   "stat": "int",
   "armorPenalty": false,
   "desc": "Knowledge of the Spirit World and its inhabitants."
  },
  {
   "name": "Overpower",
   "stat": "str",
   "armorPenalty": true,
   "desc": "Overwhelm a creature by force. Use it to grapple, pin, knock down, shove, or move while grappled. The target resists a knock down or shove with Evasion or Overpower, its choice. It resists a grapple, pin, or escape with Overpower. Gain +10 for each size category you are larger than the target. Success applies Knocked Down or Shoved."
  },
  {
   "name": "Persuasion",
   "stat": "cha",
   "armorPenalty": false,
   "desc": "Convince others to agree or act on your words."
  },
  {
   "name": "Sense Environment",
   "stat": "wits",
   "armorPenalty": false,
   "desc": "Notice your surroundings through any sense. When you know a hidden creature is near but not where, roll against its Sneak result to find it."
  },
  {
   "name": "Sleight of Hand",
   "stat": "fin",
   "armorPenalty": true,
   "desc": "Perform a swift or precise action with your hands or appendages."
  },
  {
   "name": "Sneak",
   "stat": "fin",
   "armorPenalty": true,
   "desc": "Roll once. Each creature you hide from rolls Sense Environment against your result. A creature who fails gains Unaware of you. A creature with a clear line of sight to you sees you, no roll needed. Your result lasts until you reveal yourself, move 20 m, or 1 minute passes. Then roll again."
  },
  {
   "name": "Survival",
   "stat": "wits",
   "armorPenalty": false,
   "desc": "Survive beyond basic needs: avoid apex predators, endure extreme weather, and get by when survival resources run low."
  },
  {
   "name": "Teamwork",
   "stat": "cha",
   "armorPenalty": false,
   "desc": "When a group attempts one task together, each member rolls Teamwork against a DC set by the GM."
  },
  {
   "name": "Traverse (Fin)",
   "stat": "fin",
   "armorPenalty": true,
   "desc": "Travel across terrain requiring precise, light footwork."
  },
  {
   "name": "Traverse (Str)",
   "stat": "str",
   "armorPenalty": true,
   "desc": "Travel across terrain demanding physical strength, such as climbing, swimming against a current, or walking while encumbered."
  }
 ],
 "tools": [
  "Woodshop Toolkit",
  "Calligraphy Tools",
  "Cartographer Kit",
  "Alchemy Kit",
  "Mathematics Toolkit",
  "Lockpicking Kit",
  "Painter's Supplies",
  "Musical Instrument",
  "Tinkering Tools",
  "Gaming Sets",
  "Herbalist Kit",
  "Medicine Kit",
  "Airship",
  "Land Vehicle",
  "Blacksmith Set",
  "Seaship",
  "Astronomy Kit",
  "Enchanter Toolkit"
 ],
 "weapons": [
  {
   "name": "Arming Sword",
   "die": "1d8",
   "traits": [
    "Deadly I"
   ],
   "price": 10,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Bayonet",
   "die": "1d4",
   "traits": [
    "Attachment"
   ],
   "price": 15,
   "range": "Varies",
   "type": "Piercing"
  },
  {
   "name": "Chakram",
   "die": "1d4",
   "traits": [
    "Light",
    "Deadly",
    "Thrown (10)",
    "Skilled"
   ],
   "price": 5,
   "range": 10,
   "type": "Slashing"
  },
  {
   "name": "Claymore",
   "die": "2d10",
   "traits": [
    "Heavy",
    "Cleave",
    "Reach I",
    "Skilled"
   ],
   "price": 100,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Club",
   "die": "1d6",
   "traits": [
    "Simple"
   ],
   "price": 1,
   "range": 1,
   "type": "Bludgeoning"
  },
  {
   "name": "Firelance",
   "die": "1d6",
   "traits": [
    "Reload",
    "Ranged (Finesse) (5)",
    "Attachment",
    "Firearm",
    "Skilled"
   ],
   "price": 200,
   "range": 5,
   "type": "Fire"
  },
  {
   "name": "Flintlock",
   "die": "1d10",
   "traits": [
    "Reload",
    "Ranged (Finesse) (10)",
    "Firearm",
    "Exotic",
    "Skilled"
   ],
   "price": 375,
   "range": 10,
   "type": "Piercing"
  },
  {
   "name": "Flysaa",
   "die": "1d6",
   "traits": [
    "Deadly II"
   ],
   "price": 35,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Gelatinous Weapon",
   "die": "1d6",
   "traits": [],
   "price": null,
   "range": "Varies",
   "type": "Bludgeoning"
  },
  {
   "name": "Glaive",
   "die": "1d10",
   "traits": [
    "Heavy",
    "Reach II",
    "Cleave"
   ],
   "price": 25,
   "range": 3,
   "type": "Slashing"
  },
  {
   "name": "Halberd",
   "die": "1d10",
   "traits": [
    "Heavy",
    "Deadly I",
    "Reach II",
    "Skilled"
   ],
   "price": 75,
   "range": 2,
   "type": "Slashing"
  },
  {
   "name": "Hand Crossbow",
   "die": "1d4",
   "traits": [
    "Light",
    "Ranged (Finesse) (10)",
    "Exotic",
    "Deadly I"
   ],
   "price": 750,
   "range": 10,
   "type": "Piercing"
  },
  {
   "name": "Heavy Bow",
   "die": "1d10",
   "traits": [
    "Ranged (30)",
    "Two Handed",
    "Skilled"
   ],
   "price": 15,
   "range": 30,
   "type": "Piercing"
  },
  {
   "name": "Heavy Crossbow",
   "die": "1d10",
   "traits": [
    "Reload",
    "Ranged (Finesse) (30)",
    "Heavy",
    "Piercing"
   ],
   "price": 60,
   "range": 30,
   "type": "Piercing"
  },
  {
   "name": "Heilongjiang",
   "die": "1d8",
   "traits": [
    "Firearm",
    "Reload",
    "Exotic",
    "Ranged (Finesse) (10)",
    "Skilled"
   ],
   "price": 100,
   "range": 10,
   "type": "Piercing"
  },
  {
   "name": "Hook Sword",
   "die": "1d4",
   "traits": [
    "Defensive",
    "Secured",
    "Hooked",
    "Skilled"
   ],
   "price": 80,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Katar",
   "die": "1d6",
   "traits": [
    "Secured",
    "Deadly"
   ],
   "price": 120,
   "range": 1,
   "type": "Piercing"
  },
  {
   "name": "Kull Bite",
   "die": "1d4",
   "traits": [
    "Light",
    "Hidden"
   ],
   "price": null,
   "range": 1,
   "type": "Piercing",
   "natural": true
  },
  {
   "name": "Kusarigama",
   "die": "1d4",
   "traits": [
    "Reach II",
    "Light",
    "Exotic",
    "Skilled"
   ],
   "price": 25,
   "range": 3,
   "type": "Slashing"
  },
  {
   "name": "Light Bow",
   "die": "1d6",
   "traits": [
    "Ranged (20)",
    "Two Handed",
    "Skilled"
   ],
   "price": 10,
   "range": 20,
   "type": "Piercing"
  },
  {
   "name": "Light Crossbow",
   "die": "1d6",
   "traits": [
    "Two handed",
    "Reload",
    "Ranged (Finesse) (20)",
    "Piercing"
   ],
   "price": 30,
   "range": 20,
   "type": "Piercing"
  },
  {
   "name": "Longsword",
   "die": "1d10",
   "traits": [
    "Two Handed"
   ],
   "price": 20,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Mace",
   "die": "1d6",
   "traits": [
    "Deadly I"
   ],
   "price": 10,
   "range": 1,
   "type": "Bludgeoning"
  },
  {
   "name": "Musket",
   "die": "2d8",
   "traits": [
    "Reload",
    "Ranged (Finesse) (20)",
    "Two Handed",
    "Firearm",
    "Piercing",
    "Exotic",
    "Skilled"
   ],
   "price": 500,
   "range": 20,
   "type": "Piercing"
  },
  {
   "name": "Rapier",
   "die": "1d6",
   "traits": [
    "Light",
    "Deadly"
   ],
   "price": 50,
   "range": 1,
   "type": "Piercing"
  },
  {
   "name": "Spear",
   "die": "1d6",
   "traits": [
    "Reach II",
    "Thrown (10)",
    "Two Handed"
   ],
   "price": 10,
   "range": 3,
   "type": "Piercing"
  },
  {
   "name": "Tachi",
   "die": "1d10",
   "traits": [
    "Two Handed",
    "Light"
   ],
   "price": 50,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Talons",
   "die": "1d4",
   "traits": [
    "Light",
    "Secured",
    "Deadly III"
   ],
   "price": 30,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Throwing Axe",
   "die": "1d4",
   "traits": [
    "Thrown (10)"
   ],
   "price": 5,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "Unarmed Strike",
   "die": "1",
   "traits": [],
   "price": null,
   "range": 1,
   "type": "Bludgeoning"
  },
  {
   "name": "War Axe",
   "die": "2d4",
   "traits": [
    "Two Handed",
    "Deadly I"
   ],
   "price": 20,
   "range": 1,
   "type": "Slashing"
  },
  {
   "name": "War Hammer",
   "die": "1d8",
   "traits": [
    "Piercing"
   ],
   "price": 15,
   "range": 1,
   "type": "Bludgeoning"
  },
  {
   "name": "Whip",
   "die": "1d4",
   "traits": [
    "Reach III",
    "Light",
    "Cleave",
    "Skilled"
   ],
   "price": 10,
   "range": 4,
   "type": "Slashing"
  },
  {
   "name": "Wrist Blade",
   "die": "1d4",
   "traits": [
    "Light",
    "Hidden",
    "Deadly II",
    "Skilled"
   ],
   "price": 175,
   "range": 1,
   "type": "Piercing"
  }
 ],
 "armor": [
  {
   "name": "Plate",
   "ac": 30,
   "maxFin": 2,
   "penalty": 8,
   "price": 2500,
   "type": "Heavy"
  },
  {
   "name": "Half Plate",
   "ac": 20,
   "maxFin": 7,
   "penalty": 3,
   "price": 1500,
   "type": "Medium"
  },
  {
   "name": "Chainmail",
   "ac": 18,
   "maxFin": 3,
   "penalty": 1,
   "price": 200,
   "type": "Heavy"
  },
  {
   "name": "Leather",
   "ac": 10,
   "maxFin": 30,
   "penalty": 0,
   "price": 50,
   "type": "Light"
  },
  {
   "name": "Dō",
   "ac": 17,
   "maxFin": 11,
   "penalty": 4,
   "price": 1250,
   "type": "Medium"
  },
  {
   "name": "Yoroi",
   "ac": 25,
   "maxFin": 5,
   "penalty": 6,
   "price": 3000,
   "type": "Heavy"
  },
  {
   "name": "Lamellar",
   "ac": 8,
   "maxFin": null,
   "penalty": 0,
   "price": 10,
   "type": "Light"
  },
  {
   "name": "Cuirass",
   "ac": 19,
   "maxFin": 4,
   "penalty": 2,
   "price": 25,
   "type": "Medium"
  },
  {
   "name": "Robes",
   "ac": 5,
   "maxFin": null,
   "penalty": 0,
   "price": 50,
   "type": "Light"
  },
  {
   "name": "Padded Armor",
   "ac": 10,
   "maxFin": 25,
   "penalty": 1,
   "price": 25,
   "type": "Light"
  },
  {
   "name": "Chitin Vest",
   "ac": 15,
   "maxFin": 13,
   "penalty": 3,
   "price": 200,
   "type": "Medium"
  },
  {
   "name": "Shadowcloak",
   "ac": 8,
   "maxFin": 30,
   "penalty": 0,
   "price": 500,
   "type": "Light"
  },
  {
   "name": "Studded Leather",
   "ac": 12,
   "maxFin": 25,
   "penalty": 0,
   "price": 75,
   "type": "Light"
  },
  {
   "name": "Hide Armor",
   "ac": 14,
   "maxFin": 20,
   "penalty": 1,
   "price": 100,
   "type": "Medium"
  },
  {
   "name": "Scale Mail",
   "ac": 16,
   "maxFin": 15,
   "penalty": 2,
   "price": 200,
   "type": "Medium"
  },
  {
   "name": "Chain Shirt",
   "ac": 13,
   "maxFin": 18,
   "penalty": 1,
   "price": 150,
   "type": "Medium"
  },
  {
   "name": "Brigandine",
   "ac": 15,
   "maxFin": 12,
   "penalty": 2,
   "price": 250,
   "type": "Medium"
  },
  {
   "name": "Splint Mail",
   "ac": 24,
   "maxFin": null,
   "penalty": 3,
   "price": 500,
   "type": "Heavy"
  },
  {
   "name": "Banded Mail",
   "ac": 17,
   "maxFin": 8,
   "penalty": 3,
   "price": 400,
   "type": "Heavy"
  },
  {
   "name": "Elven Chain",
   "ac": 18,
   "maxFin": 20,
   "penalty": 1,
   "price": 2000,
   "type": "Medium"
  },
  {
   "name": "Mithril Plate",
   "ac": 30,
   "maxFin": 12,
   "penalty": 8,
   "price": 10000,
   "type": "Heavy"
  },
  {
   "name": "Dragon Scale",
   "ac": 20,
   "maxFin": 15,
   "penalty": 2,
   "price": 5000,
   "type": "Heavy"
  },
  {
   "name": "Padded Gambeson",
   "ac": 10,
   "maxFin": 30,
   "penalty": 0,
   "price": 25,
   "type": "Light"
  }
 ],
 "shields": [
  {
   "name": "Round Shield",
   "ac": 3,
   "price": 20,
   "weight": 1,
   "penalty": 2
  },
  {
   "name": "Kite Shield",
   "ac": 5,
   "price": 30,
   "weight": 5,
   "penalty": 3
  },
  {
   "name": "Buckler",
   "ac": 1,
   "price": 50,
   "weight": 10,
   "penalty": 0
  },
  {
   "name": "Rondache",
   "ac": 4,
   "price": null,
   "weight": null,
   "penalty": 4
  },
  {
   "name": "Tower Shield",
   "ac": 6,
   "price": null,
   "weight": null,
   "penalty": 4
  },
  {
   "name": "Spiked Shield",
   "ac": 3,
   "price": null,
   "weight": null,
   "penalty": 3
  }
 ],
 "traits": {
  "Hidden": "This weapon is easily concealable. When hidden in clothing or armor, any creature without the observant feature is incapable of spotting the weapon.",
  "Piercing": "Spending an extra 2 AP when you take the attack action you can choose to make the weapon's damage dice deal true damage.",
  "Light": "Any weapon with the light property uses finesse instead of strength for attack and damage rolls",
  "Ranged": "This weapon is used from range and can reach any creature within the amount of tiles designated to the weapon. While within the melee range of any hostile creature, the user takes a -5 to all attack rolls.",
  "Reload": "Any weapon with this feature must reload after a set amount of uses equal to its level.  Reloading a weapon takes 1 AP. A weapon with this property requires a free hand to reload.",
  "Thrown": "Usually a melee weapon this weapon has the option to be thrown to any tile within the designated range.",
  "Reach": "This weapon reaches an extra tile per level of reach.",
  "Firearm": "This weapon's ammunition is bullets instead of arrows or bolts Costs an extra 1 AP to reload",
  "Heavy": "While wearing or holding a object with the heavy property its movement is lowered by 2. Weapons with this property require 2 hands to wield.",
  "Defensive": "A weapon with the defensive trait adds +1 to a target's AC for each weapon thue actively wield with the defensive trait.",
  "Deadly": "Any weapon with the deadly property has its decisive range increased by 1 for each level.",
  "Cleave": "Weapons with this property don't attack a single target but instead hit all adjacent tiles in a single direction within the targets melee range of the wielder's choice.",
  "Two Handed": "A weapon with this property requires 2 hands to wield.",
  "Hooked": "Weapons with the hooked property allow for an overpower check to be made after landing a successful attack as part of the attack.",
  "Brittle": "Weapons with the brittle property break after a certain amount of uses. It is GM discretion if a weapon with this property is allowed to be repaired before or after it has broken.",
  "Enchanted": "A weapon with the enchanted property ignores 10 resistance per level of enchantment",
  "Magical": "A weapon with the magical property can have its damage type changed to magical for 1 AP. A weapon must have the enchanted property to have the magical property.",
  "Secured": "A weapon with the secured property is hard to disarm gaining a +5 to all checks to avoid being disarmed.",
  "Ranged (Finesse)": "This functions as ranged but uses finesse instead of strength",
  "Exotic": "Exotic weapons are rare and are rare or sold in very few places.",
  "Attachment": "A weapon with this property is attacked onto a two handed weapon with the reach property",
  "Skilled": "Requires proficiency in skilled weapons to use",
  "Simple": "Any creature can use this weapon without being proficient."
 },
 "damageTypes": {
  "physical": [
   "Piercing",
   "Slashing",
   "Bludgeoning",
   "Necrotic"
  ],
  "magical": [
   "Psychic",
   "Fire",
   "Cold",
   "Earth",
   "Poison",
   "Air"
  ],
  "alignment": [
   "Holy",
   "Unholy",
   "Magic"
  ],
  "true": [
   "True"
  ]
 },
 "conditions": [
  {
   "name": "Bleeding",
   "text": "While bleeding, a creature loses 1 health at the start of each of its turns."
  },
  {
   "name": "Blind",
   "text": "A blinded creature misses many attacks. Whenever a blind creature rolls an attack, it must roll a Percentile die. On a 50 or higher, the attack automatically misses. In addition, the blind creature is automatically Unaware of all things that rely on sight to perceive unless previously aware of it. Attacks made against a blind creature gain advantage on attack rolls. Blind creatures gain disadvantage on Evasion saves."
  },
  {
   "name": "Burning",
   "text": "Any creature that is burning has its resistance to fire lowered by 20 and its resistance to cold raised by 20. Any creature that is burning and is not immune or resistant to fire damage becomes vulnerable to fire damage and takes 2d6 fire damage at the start of each of its turns. Any creature that is burning that gains the freezing condition cancels both."
  },
  {
   "name": "Charmed",
   "text": "A creature becomes under the influence of another. While charmed, the charmer gains a +10 to all Charisma-based checks made with the charmed creature. While charmed, creatures may be convinced to perform actions that they would not perform under the influence of a charm. Charmed creatures will not perform actions that they perceive as directly harmful to themselves."
  },
  {
   "name": "Corroding",
   "text": "While corroding, a creature loses half of its current physical armor at the start of each of its turns."
  },
  {
   "name": "Crippled",
   "text": "A target has taken devastating damage, leaving it incapable of moving. A crippled creature is Pinned and is incapable of using features and spells that allow or require movement. A crippled creature may still be moved by allies or enemies."
  },
  {
   "name": "Cursed",
   "text": "A cursed creature is marked with vile magic that weakens them. A cursed creature takes a -1 penalty on all checks and attack rolls. While cursed, a creature is treated as having 0 armor for the purpose of applying effects even while the target still has physical or magical armor."
  },
  {
   "name": "Deaf",
   "text": "Deaf creatures are incapable of hearing their surroundings. A creature who is deaf is automatically Unaware of anything that relies on hearing to perceive it unless it was previously aware of its presence."
  },
  {
   "name": "Diseased",
   "text": "While diseased, a creature gains disadvantage on all checks and attack rolls. A creature that is diseased must succeed on a Resistance (Body) save, DC 10 + damage taken, or gain the Nauseated condition."
  },
  {
   "name": "Dominated (Charmed)",
   "text": "While dominated, a creature follows all commands given by its charmer."
  },
  {
   "name": "Draining",
   "text": "While draining, a creature loses half of its current magical armor at the start of each of its turns."
  },
  {
   "name": "Dying",
   "text": "A creature reduced to 0 Health or below gains Dying.<br><b>Unconscious:</b> the creature falls unconscious and has 0 AP.<br><b>Negative Health:</b> track how far below 0 its Health falls (−5, for example). If the number passes its Fortitude score, it dies.<br><b>Death saves:</b> at the end of each of its turns, the creature rolls d100 and succeeds at or under its Fortitude modifier + level. Success: no change. Failure: mark one failed death save. Damage taken while Dying marks one failed save automatically.<br><b>Stabilizing:</b> another creature rolls Knowledge (Medical) against a DC equal to the negative Health (DC 5 at −5). Success: the creature is stable at 0 Health and loses Dying.<br><b>Healing:</b> any healing bringing the creature above 0 Health ends Dying.<br><b>Death:</b> the creature dies at 3 failed death saves, after 1 minute (5 rounds) of Dying, or when its negative Health passes its Fortitude score."
  },
  {
   "name": "Exhausted",
   "text": "An exhausted creature is fighting every drop of energy it expends. While exhausted, a creature has the Tired condition. A creature that gains the exhausted condition gains a cumulative -2 penalty to its physical statistics for each time it gains the exhausted condition. A creature that gains a penalty higher than -10 must succeed on a DC 30 Resistance (Body) save each time it is gained after or die. The DC for this increases by 10 each time until the creature is no longer exhausted. Exhaustion can be removed from a full rest."
  },
  {
   "name": "Fearful",
   "text": "A fearful creature is afraid of a single creature in its line of sight. A creature that is fearful has disadvantage on Resistance (Mind) saves and attack rolls while it is aware its source of fear is in its presence. If the creature gains the fearful condition again, it gains the Hopeless condition. A creature that becomes Motivated or Inspired cancels both effects."
  },
  {
   "name": "Freezing",
   "text": "Any creature that is freezing has its resistance to cold lowered by 20 and its resistance to fire raised by 20. Any creature that is freezing and is not immune or resistant to cold damage becomes vulnerable to cold damage and has its AP maximum reduced to 2. Any creature that is freezing that gains the burning condition cancels both."
  },
  {
   "name": "Grappling",
   "text": "While grappling a target, you move with the target you are grappling unless they move instantaneously from effects such as teleportation."
  },
  {
   "name": "Hastened",
   "text": "While hastened, a creature has its maximum AP increased by 1, doubles its movement, and gains 2 AC. A slowed creature that becomes hastened removes both effects."
  },
  {
   "name": "Hopeless",
   "text": "A creature who is hopeless is Fearful and believes it has no chance of success against a source. While acting towards a source of hopelessness, a creature gains a -5 to all checks and attack rolls and has disadvantage against effects that apply the Fearful condition. While hopeless, each time a creature fails a check, gets hit, or misses an attack against a source of hopelessness, it subtracts an additional -5 to all checks and attack rolls towards overcoming its source. A creature that becomes Inspired cancels both effects."
  },
  {
   "name": "Inspired",
   "text": "An inspired creature is motivated to continue its task and believes its odds of success are guaranteed because of its source. While acting directly towards its goal, a creature gains a +5 to all checks and attack rolls towards its goal. While inspired, each time a creature succeeds a check or lands an attack directly towards its goal, it gains an additional +5 to all checks and attack rolls towards completing it. A creature that becomes Hopeless cancels both effects."
  },
  {
   "name": "Invisible",
   "text": "All creatures that rely on sight gain the Unaware condition against you unless previously aware of you. Invisible creatures gain advantage on attack rolls against creatures that cannot see them. Attack rolls made against the invisible creature by creatures that cannot see them must roll a Percentile die. On a 75 or higher, the attack automatically misses."
  },
  {
   "name": "Knocked Down",
   "text": "A creature who is knocked down moves at half speed. Knocked down creatures also gain disadvantage on Evasion saves. While knocked down, attack rolls and contesting overpower checks made on contestants who are not knocked down have disadvantage. A knocked down creature may spend 1 AP to stand up if they are not Pinned or Crippled."
  },
  {
   "name": "Motivated",
   "text": "A motivated creature gains advantage on all Resistance (Mind) saves and attack rolls towards directly overcoming its goal. If the creature gains the motivated condition again while motivated, it gains the Inspired condition. A creature that becomes Fearful or Hopeless cancels both effects."
  },
  {
   "name": "Nauseated",
   "text": "While nauseated, a creature wastes its AP taking no actions as it spends its turn vomiting or some other action caused by sickness. A nauseated creature cannot take reactions."
  },
  {
   "name": "Paralyzed",
   "text": "A creature who is paralyzed is Crippled. The creature is incapable of any bodily function that requires the movement of any body parts. All vital body operations still function while paralyzed, such as breathing and heartbeat. A paralyzed creature has its AP reduced to a maximum of 0 and regains no AP at the start of each of its turns."
  },
  {
   "name": "Petrified",
   "text": "A petrified creature has its AP reduced to 0 and gains 10 resistance to Piercing, Slashing, and Bludgeoning damage. While petrified, a creature gains the Unaware condition for all creatures and effects in its surroundings. While petrified, a creature does not require sustenance and shows no signs of aging until freed."
  },
  {
   "name": "Pinned",
   "text": "Pinned creatures are incapable of using AP for the movement action."
  },
  {
   "name": "Poisoned",
   "text": "A poisoned creature gains disadvantage on all checks that use Finesse, Fortitude, or Strength."
  },
  {
   "name": "Possessed",
   "text": "A force has invaded the body of a creature. As a result, the creature can no longer spend AP to perform actions. Instead, the creature may spend 2 AP to roll a contested Resistance (Mind) against its inhabitant to attempt to regain control of itself. On a successful check, the inhabitant loses control over the creature for a number of minutes equal to the amount of time it lost the contest by. If the inhabitant loses the check by 10 or more, it is forced out of the creature. A creature who allows an inhabitant to possess it has disadvantage on attempts to force it out. An inhabitant uses the host's physical stats but its own mental stats unless stated otherwise."
  },
  {
   "name": "Severed",
   "text": "While severed, a creature is incapable of using magic items and spending mana or stamina for the duration. Any effects on the creature gained from mana or stamina resources are dispelled, while magic items are no longer responsive to its severed wielder and cannot be reapplied until its severance ends."
  },
  {
   "name": "Shocked",
   "text": "Any creature that is shocked has its resistance to air lowered by 10. Any creature that is shocked and is not immune or resistant to air damage becomes vulnerable to air damage and must roll a d100 at the start of each of its turns. On a 50 or lower, it wastes its turn doing nothing."
  },
  {
   "name": "Shoved",
   "text": "A creature who is shoved is physically moved by an opposing force. A shoved creature is moved 1 meter for each point it failed the check by (minimum one meter). Shoved creatures only interact with the initial and final meter they land on for environmental effects. If shoved into an object, the GM determines if the creature passes through or stops on the obstacle. A creature shoved takes 5 damage for each meter it is prevented from moving if it stops on an obstacle. A creature shoved less than 2 meters must pass a balance check determined by the GM to prevent being Knocked Down after being shoved. Creatures shoved 3 or more meters are Knocked Down."
  },
  {
   "name": "Silenced",
   "text": "A silenced creature is incapable of speaking. While silenced, it is impossible to cast spells that require Words of Power or perform any other action that requires speech."
  },
  {
   "name": "Slowed",
   "text": "While slowed, a creature has its maximum AP reduced by 1, loses half its movement and 2 AC. A hastened creature that becomes slowed removes both effects."
  },
  {
   "name": "Stunned",
   "text": "A stunned creature cannot take reactions and has its AP reduced to 0."
  },
  {
   "name": "Tired",
   "text": "A tired creature teeters on the brink of exhaustion. The creature gains disadvantage on all Strength, Finesse, and Fortitude checks. If a creature were to gain this condition again, it would gain the Exhausted condition. The tired condition is removed on a partial rest."
  },
  {
   "name": "Unaware",
   "text": "A creature who has this condition does not know that the creature that applied this condition is around it. Any creature that applies the Unaware condition to a creature gains advantage on attack rolls, and its first attack is a Critical Strike against the target. A creature loses the Unaware condition whenever the current turn ends after it becomes aware of its applicant."
  },
  {
   "name": "Unconscious",
   "text": "An unconscious creature has its AP reduced to 0. An unconscious creature gains the Unaware condition for all creatures and effects in its surroundings. Hits on unconscious creatures are automatically critical hits and allow for decisive strikes. An unconscious creature must succeed on a (DC 10 + Damage Taken) Resistance (Body) check or die."
  }
 ],
 "spells": [
  [
   "Air Bubble",
   "Aeromancy",
   "Minor",
   "air-bubble.html"
  ],
  [
   "Gust",
   "Aeromancy",
   "Minor",
   "gust.html"
  ],
  [
   "Lightning Bolt",
   "Aeromancy",
   "Minor",
   "lightning-bolt.html"
  ],
  [
   "Zap",
   "Aeromancy",
   "Minor",
   "zap.html"
  ],
  [
   "Shocking Touch",
   "Aeromancy",
   "Minor",
   "shocking-touch.html"
  ],
  [
   "Neural Shock",
   "Aeromancy",
   "Minor",
   "neural-shock.html"
  ],
  [
   "Lightning Talon",
   "Aeromancy",
   "Minor",
   "lightning-talon.html"
  ],
  [
   "Static Cling",
   "Aeromancy",
   "Minor",
   "static-cling.html"
  ],
  [
   "Electric Pulse",
   "Aeromancy",
   "Adept",
   "electric-pulse.html"
  ],
  [
   "Lightning Spear",
   "Aeromancy",
   "Adept",
   "lightning-spear.html"
  ],
  [
   "Static Charge",
   "Aeromancy",
   "Adept",
   "static-charge.html"
  ],
  [
   "Wall of Wind",
   "Aeromancy",
   "Adept",
   "wall-of-wind.html"
  ],
  [
   "Thunderstorm",
   "Aeromancy",
   "Adept",
   "thunderstorm.html"
  ],
  [
   "Wind Tunnel",
   "Aeromancy",
   "Adept",
   "wind-tunnel.html"
  ],
  [
   "Vacuum",
   "Aeromancy",
   "Major",
   "vacuum.html"
  ],
  [
   "Evasion",
   "Aeromancy",
   "Major",
   "evasion.html"
  ],
  [
   "Thunderclap Step",
   "Aeromancy",
   "Major",
   "thunderclap-step.html"
  ],
  [
   "Eye of the Storm",
   "Aeromancy",
   "Major",
   "eye-of-the-storm.html"
  ],
  [
   "Mass Vacuum",
   "Aeromancy",
   "Grand",
   "mass-vacuum.html"
  ],
  [
   "Endless Lightning",
   "Aeromancy",
   "Grand",
   "endless-lightning.html"
  ],
  [
   "Tornado",
   "Aeromancy",
   "Grand",
   "tornado.html"
  ],
  [
   "Stormcall",
   "Aeromancy",
   "Grand",
   "stormcall.html"
  ],
  [
   "Armor of Magic",
   "Arcanomancy",
   "Minor",
   "armor-of-magic.html"
  ],
  [
   "Magic Sense",
   "Arcanomancy",
   "Minor",
   "magic-sense.html"
  ],
  [
   "Sleep",
   "Arcanomancy",
   "Minor",
   "sleep.html"
  ],
  [
   "Arcane Shield",
   "Arcanomancy",
   "Minor",
   "arcane-shield.html"
  ],
  [
   "Arcane Ward",
   "Arcanomancy",
   "Minor",
   "arcane-ward.html"
  ],
  [
   "Spectral Weapon",
   "Arcanomancy",
   "Minor",
   "spectral-sword.html"
  ],
  [
   "Arcane Bolts",
   "Arcanomancy",
   "Minor",
   "arcane-bolts.html"
  ],
  [
   "Ward of Intellect",
   "Arcanomancy",
   "Minor",
   "ward-of-intellect.html"
  ],
  [
   "Prismatic Ray",
   "Arcanomancy",
   "Minor",
   "prismatic-ray.html"
  ],
  [
   "Black Lance",
   "Arcanomancy",
   "Minor",
   "black-lance.html"
  ],
  [
   "Identify",
   "Arcanomancy",
   "Adept",
   "identify.html"
  ],
  [
   "Banish",
   "Arcanomancy",
   "Adept",
   "banish.html"
  ],
  [
   "Bind Creature",
   "Arcanomancy",
   "Adept",
   "bind-creature.html"
  ],
  [
   "Still Mind",
   "Arcanomancy",
   "Adept",
   "still-mind.html"
  ],
  [
   "Telepathy",
   "Arcanomancy",
   "Adept",
   "telepathy.html"
  ],
  [
   "Summoner's Circle",
   "Arcanomancy",
   "Adept",
   "summoners-circle.html"
  ],
  [
   "Arcane Lattice",
   "Arcanomancy",
   "Adept",
   "arcane-lattice.html"
  ],
  [
   "Finger of Doom",
   "Arcanomancy",
   "Major",
   "finger-of-doom.html"
  ],
  [
   "Magic Dome",
   "Arcanomancy",
   "Major",
   "magic-dome.html"
  ],
  [
   "Symbol of Power",
   "Arcanomancy",
   "Major",
   "symbol-of-power.html"
  ],
  [
   "Spellbreaker Lance",
   "Arcanomancy",
   "Major",
   "spellbreaker-lance.html"
  ],
  [
   "Mirror Cage",
   "Arcanomancy",
   "Major",
   "mirror-cage.html"
  ],
  [
   "Glyph of Recall",
   "Arcanomancy",
   "Major",
   "glyph-of-recall.html"
  ],
  [
   "Gwenivene's Gambit",
   "Arcanomancy",
   "Grand",
   "gwenivenes-gambit.html"
  ],
  [
   "Upon A Star",
   "Arcanomancy",
   "Grand",
   "upon-a-star.html"
  ],
  [
   "Unravel",
   "Arcanomancy",
   "Grand",
   "unravel.html"
  ],
  [
   "Echolocation",
   "Biomancy",
   "Minor",
   "echolocation.html"
  ],
  [
   "Adaptive Camouflage",
   "Biomancy",
   "Minor",
   "adaptive-camouflage.html"
  ],
  [
   "Blindness",
   "Biomancy",
   "Minor",
   "blindness.html"
  ],
  [
   "Carapace of the Insect",
   "Biomancy",
   "Minor",
   "carapace-of-the-insect.html"
  ],
  [
   "Eyes of the Beast",
   "Biomancy",
   "Minor",
   "eyes-of-the-beast.html"
  ],
  [
   "Mutate",
   "Biomancy",
   "Minor",
   "mutate.html"
  ],
  [
   "Perfect Regeneration",
   "Biomancy",
   "Minor",
   "perfect-regeneration.html"
  ],
  [
   "Serpent's Fangs",
   "Biomancy",
   "Minor",
   "serpants-fangs.html"
  ],
  [
   "Venomous Sludge",
   "Biomancy",
   "Minor",
   "venomous-sludge.html"
  ],
  [
   "Gift of the Hydra",
   "Biomancy",
   "Adept",
   "gift-of-the-hydra.html"
  ],
  [
   "Chitinous Plating",
   "Biomancy",
   "Adept",
   "chitinous-plating.html"
  ],
  [
   "Adrenal Surge",
   "Biomancy",
   "Adept",
   "adrenal-surge.html"
  ],
  [
   "Venom Glands",
   "Biomancy",
   "Adept",
   "venom-glands.html"
  ],
  [
   "Regrow Limb",
   "Biomancy",
   "Adept",
   "regrow-limb.html"
  ],
  [
   "Predator's Senses",
   "Biomancy",
   "Adept",
   "predators-senses.html"
  ],
  [
   "Steal Genetic Sequence",
   "Biomancy",
   "Major",
   "steal-genetic-sequence.html"
  ],
  [
   "Flesh Sculptor",
   "Biomancy",
   "Major",
   "flesh-sculptor.html"
  ],
  [
   "Hivemind Spawn",
   "Biomancy",
   "Major",
   "hivemind-spawn.html"
  ],
  [
   "Apex Evolution",
   "Biomancy",
   "Major",
   "apex-evolution.html"
  ],
  [
   "Final Evolution",
   "Biomancy",
   "Grand",
   "final-evolution.html"
  ],
  [
   "Genetic Memory",
   "Biomancy",
   "Grand",
   "genetic-memory.html"
  ],
  [
   "Continuity Error",
   "Chronomancy",
   "Minor",
   "continuity-error.html"
  ],
  [
   "Slow",
   "Chronomancy",
   "Minor",
   "slow.html"
  ],
  [
   "Speed",
   "Chronomancy",
   "Minor",
   "speed.html"
  ],
  [
   "Moment's Glance",
   "Chronomancy",
   "Minor",
   "moments-glance.html"
  ],
  [
   "Rust and Dust",
   "Chronomancy",
   "Minor",
   "rust-and-dust.html"
  ],
  [
   "Echo Step",
   "Chronomancy",
   "Minor",
   "echo-step.html"
  ],
  [
   "Deja Vu",
   "Chronomancy",
   "Adept",
   "deja-vu.html"
  ],
  [
   "Dimensional Lock",
   "Chronomancy",
   "Adept",
   "dimensional-lock.html"
  ],
  [
   "Reciprocating Dimensions",
   "Chronomancy",
   "Adept",
   "reciprocating-dimensions.html"
  ],
  [
   "Scrying",
   "Chronomancy",
   "Adept",
   "scrying.html"
  ],
  [
   "Void Swap",
   "Chronomancy",
   "Adept",
   "void-swap.html"
  ],
  [
   "Watch History",
   "Chronomancy",
   "Adept",
   "watch-history.html"
  ],
  [
   "Alter Gravity",
   "Chronomancy",
   "Major",
   "alter-gravity.html"
  ],
  [
   "Planar Rift",
   "Chronomancy",
   "Major",
   "planar-rift.html"
  ],
  [
   "Teleport",
   "Chronomancy",
   "Major",
   "teleport.html"
  ],
  [
   "Greater Planar Rift",
   "Chronomancy",
   "Major",
   "greater-planar-rift.html"
  ],
  [
   "Temporal Lock",
   "Chronomancy",
   "Major",
   "temporal-lock.html"
  ],
  [
   "Infinity",
   "Chronomancy",
   "Grand",
   "infinity.html"
  ],
  [
   "Omnipresence",
   "Chronomancy",
   "Grand",
   "omnipresence.html"
  ],
  [
   "Foresight",
   "Chronomancy",
   "Grand",
   "foresight.html"
  ],
  [
   "Rewind Creature",
   "Chronomancy",
   "Grand",
   "rewind-creature.html"
  ],
  [
   "Time Loop",
   "Chronomancy",
   "Grand",
   "time-loop.html"
  ],
  [
   "Demiplane",
   "Chronomancy",
   "Grand",
   "demiplane.html"
  ],
  [
   "Curse",
   "Demonology",
   "Minor",
   "curse.html"
  ],
  [
   "Spectral Sword Demonic",
   "Demonology",
   "Minor",
   "spectral-sword-demonic.html"
  ],
  [
   "Brand of Lethargy",
   "Demonology",
   "Minor",
   "lethargy-mark.html"
  ],
  [
   "Demonic Embodiment",
   "Demonology",
   "Minor",
   "demonic-embodiment.html"
  ],
  [
   "Fiendish Beguile",
   "Demonology",
   "Minor",
   "fiendish-beguile.html"
  ],
  [
   "Gut of Lead",
   "Demonology",
   "Minor",
   "gut-of-lead.html"
  ],
  [
   "Liar's Lash",
   "Demonology",
   "Minor",
   "liars-lash.html"
  ],
  [
   "Vile Ray",
   "Demonology",
   "Minor",
   "vile-ray.html"
  ],
  [
   "Repurpose Vitality",
   "Demonology",
   "Minor",
   "repurpose-vitality.html"
  ],
  [
   "Sphere of Agony",
   "Demonology",
   "Minor",
   "sphere-of-agony.html"
  ],
  [
   "Unholy Burst",
   "Demonology",
   "Minor",
   "unholy-burst.html"
  ],
  [
   "Conjure Fiend",
   "Demonology",
   "Adept",
   "conjure-fiend.html"
  ],
  [
   "Demonic Tether",
   "Demonology",
   "Adept",
   "demonic-tether.html"
  ],
  [
   "Visions of the Mire",
   "Demonology",
   "Adept",
   "visions-of-the-mire.html"
  ],
  [
   "Mark of the Pit",
   "Demonology",
   "Adept",
   "mark-of-the-pit.html"
  ],
  [
   "Whispering Doubt",
   "Demonology",
   "Adept",
   "whispering-doubt.html"
  ],
  [
   "Soul Bargain",
   "Demonology",
   "Adept",
   "soul-bargain.html"
  ],
  [
   "Chains of Sin",
   "Demonology",
   "Adept",
   "chains-of-sin.html"
  ],
  [
   "Beautiful World",
   "Demonology",
   "Major",
   "beautiful-world.html"
  ],
  [
   "Enthralling Invitation",
   "Demonology",
   "Major",
   "enthralling-invitation.html"
  ],
  [
   "Price of Pride",
   "Demonology",
   "Major",
   "price-of-pride.html"
  ],
  [
   "Hellgate",
   "Demonology",
   "Major",
   "hellgate.html"
  ],
  [
   "Cackling End",
   "Demonology",
   "Grand",
   "cackling-end.html"
  ],
  [
   "False Miracle",
   "Demonology",
   "Grand",
   "false-miracle.html"
  ],
  [
   "Charm",
   "Enchantment",
   "Minor",
   "charm.html"
  ],
  [
   "Enhance Body",
   "Enchantment",
   "Minor",
   "enhance-body.html"
  ],
  [
   "Euphoria",
   "Enchantment",
   "Minor",
   "euphoria.html"
  ],
  [
   "Heighten Mind",
   "Enchantment",
   "Minor",
   "heighten-mind.html"
  ],
  [
   "Calm",
   "Enchantment",
   "Minor",
   "calm.html"
  ],
  [
   "Hypnosis",
   "Enchantment",
   "Minor",
   "hypnosis.html"
  ],
  [
   "Mental Acrobatics",
   "Enchantment",
   "Minor",
   "mental-acrobatics.html"
  ],
  [
   "Reframe Perspective",
   "Enchantment",
   "Minor",
   "reframe-perspective.html"
  ],
  [
   "Hag's Eye",
   "Enchantment",
   "Minor",
   "hags-eye.html"
  ],
  [
   "Phantom Orchestra",
   "Enchantment",
   "Minor",
   "phantom-orchestra.html"
  ],
  [
   "Phantom Duplicates",
   "Enchantment",
   "Adept",
   "phantom-duplicates.html"
  ],
  [
   "Bravery",
   "Enchantment",
   "Adept",
   "bravery.html"
  ],
  [
   "Cowardice",
   "Enchantment",
   "Adept",
   "cowardice.html"
  ],
  [
   "Cloud Mind",
   "Enchantment",
   "Adept",
   "cloud-mind.html"
  ],
  [
   "Ignore",
   "Enchantment",
   "Adept",
   "ignore.html"
  ],
  [
   "Crowd's Favor",
   "Enchantment",
   "Adept",
   "crowds-favor.html"
  ],
  [
   "Marionette Strings",
   "Enchantment",
   "Adept",
   "marionette-strings.html"
  ],
  [
   "Waking Dream",
   "Enchantment",
   "Adept",
   "waking-dream.html"
  ],
  [
   "Confession",
   "Enchantment",
   "Major",
   "confession.html"
  ],
  [
   "Alter Memories",
   "Enchantment",
   "Major",
   "alter-memories.html"
  ],
  [
   "Mass Beguile",
   "Enchantment",
   "Major",
   "mass-beguile.html"
  ],
  [
   "Devourer of Hope",
   "Enchantment",
   "Grand",
   "devourer-of-hope.html"
  ],
  [
   "Enslave",
   "Enchantment",
   "Grand",
   "enslave.html"
  ],
  [
   "Memory Architect",
   "Enchantment",
   "Grand",
   "memory-architect.html"
  ],
  [
   "Crystalize",
   "Geomancy",
   "Minor",
   "crystalize.html"
  ],
  [
   "Dancing Grains",
   "Geomancy",
   "Minor",
   "pocket-sand.html"
  ],
  [
   "Hurl Earth",
   "Geomancy",
   "Minor",
   "hurl-earth.html"
  ],
  [
   "Lance of Tar",
   "Geomancy",
   "Minor",
   "lance-of-tar.html"
  ],
  [
   "Loosen Earth",
   "Geomancy",
   "Minor",
   "loosen-earth.html"
  ],
  [
   "Mend Metal",
   "Geomancy",
   "Minor",
   "mend-metal.html"
  ],
  [
   "Mold Metal Ore",
   "Geomancy",
   "Minor",
   "mold-metal-ore.html"
  ],
  [
   "Reshape Land",
   "Geomancy",
   "Minor",
   "reshape-land.html"
  ],
  [
   "Sinkhole",
   "Geomancy",
   "Minor",
   "sinkhole.html"
  ],
  [
   "Siphon Venom",
   "Geomancy",
   "Minor",
   "siphon-venom.html"
  ],
  [
   "Isolated Tectonics",
   "Geomancy",
   "Minor",
   "isolated-tectonics.html"
  ],
  [
   "Sentinel's Aegis",
   "Geomancy",
   "Minor",
   "sentinels-aegis.html"
  ],
  [
   "Acid Cloud",
   "Geomancy",
   "Minor",
   "acid-cloud.html"
  ],
  [
   "Seismic Sense",
   "Geomancy",
   "Minor",
   "seismic-sense.html"
  ],
  [
   "Armor of Stone",
   "Geomancy",
   "Adept",
   "armor-of-stone.html"
  ],
  [
   "Crush",
   "Geomancy",
   "Adept",
   "crush.html"
  ],
  [
   "Crystal Spikes",
   "Geomancy",
   "Adept",
   "crystal-spikes.html"
  ],
  [
   "Incarnate of Shards",
   "Geomancy",
   "Adept",
   "incarnate-of-shards.html"
  ],
  [
   "Magnetize",
   "Geomancy",
   "Adept",
   "magnetize.html"
  ],
  [
   "Oil Field",
   "Geomancy",
   "Adept",
   "oil-field.html"
  ],
  [
   "Iron Maiden",
   "Geomancy",
   "Adept",
   "iron-maiden.html"
  ],
  [
   "Create Crystal Golem",
   "Geomancy",
   "Major",
   "create-crystal-golem.html"
  ],
  [
   "Fault Line",
   "Geomancy",
   "Major",
   "fault-line.html"
  ],
  [
   "Crystal Resonance",
   "Geomancy",
   "Major",
   "crystal-resonance.html"
  ],
  [
   "Meteoric Spire",
   "Geomancy",
   "Major",
   "meteoric-spire.html"
  ],
  [
   "Earthquake",
   "Geomancy",
   "Grand",
   "earthquake.html"
  ],
  [
   "Reshape Earth",
   "Geomancy",
   "Grand",
   "reshape-earth.html"
  ],
  [
   "Magma Wake",
   "Geomancy",
   "Grand",
   "magma-wake.html"
  ],
  [
   "Continental Wrath",
   "Geomancy",
   "Grand",
   "continental-wrath.html"
  ],
  [
   "Celestial Shroud",
   "Heavenly",
   "Minor",
   "celestial-shroud.html"
  ],
  [
   "Spectral Sword Divine",
   "Heavenly",
   "Minor",
   "divine-spectral-weapon.html"
  ],
  [
   "Grace",
   "Heavenly",
   "Minor",
   "grace.html"
  ],
  [
   "Rejuvenating Light",
   "Heavenly",
   "Minor",
   "rejuvenating-light.html"
  ],
  [
   "Beckon Angel",
   "Heavenly",
   "Adept",
   "beckon-angel.html"
  ],
  [
   "Blood to Ichor",
   "Heavenly",
   "Adept",
   "blood-to-ichor.html"
  ],
  [
   "Celestial Tongue",
   "Heavenly",
   "Adept",
   "celestial-tongue.html"
  ],
  [
   "Celestial Understanding",
   "Heavenly",
   "Adept",
   "celestial-understanding.html"
  ],
  [
   "Purge",
   "Heavenly",
   "Adept",
   "purge.html"
  ],
  [
   "Shield of Light",
   "Heavenly",
   "Adept",
   "shield-of-light.html"
  ],
  [
   "Lantern of Vigil",
   "Heavenly",
   "Adept",
   "lantern-of-vigil.html"
  ],
  [
   "Aegis of Devotion",
   "Heavenly",
   "Adept",
   "aegis-of-devotion.html"
  ],
  [
   "Censure",
   "Heavenly",
   "Adept",
   "censure.html"
  ],
  [
   "Mercy's Touch",
   "Heavenly",
   "Adept",
   "mercys-touch.html"
  ],
  [
   "Oath of the Shepherd",
   "Heavenly",
   "Adept",
   "oath-of-the-shepherd.html"
  ],
  [
   "Halo of Returning",
   "Heavenly",
   "Adept",
   "halo-of-returning.html"
  ],
  [
   "Resurrection",
   "Heavenly",
   "Major",
   "resurrection.html"
  ],
  [
   "Angel's Grace",
   "Heavenly",
   "Major",
   "angels-grace.html"
  ],
  [
   "Celestial Linguistics",
   "Heavenly",
   "Major",
   "celestial-linguistics.html"
  ],
  [
   "Choir Eternal",
   "Heavenly",
   "Major",
   "choir-eternal.html"
  ],
  [
   "Halo's Eminence",
   "Heavenly",
   "Grand",
   "halos-eminence.html"
  ],
  [
   "Pillars of Ruin",
   "Heavenly",
   "Grand",
   "pillars-of-ruin.html"
  ],
  [
   "Judgement of the Host",
   "Heavenly",
   "Grand",
   "judgement-of-the-host.html"
  ],
  [
   "Freeze Liquid",
   "Hydromancy",
   "Minor",
   "freeze-liquid.html"
  ],
  [
   "Mending Waters",
   "Hydromancy",
   "Minor",
   "mending-waters.html"
  ],
  [
   "Chilling Touch",
   "Hydromancy",
   "Minor",
   "chilling-touch.html"
  ],
  [
   "Shape Ice",
   "Hydromancy",
   "Minor",
   "shape-ice.html"
  ],
  [
   "Shards of Ice",
   "Hydromancy",
   "Minor",
   "shards-of-ice.html"
  ],
  [
   "Water Tentacle",
   "Hydromancy",
   "Minor",
   "water-tentacle.html"
  ],
  [
   "Protective Ice",
   "Hydromancy",
   "Minor",
   "protective-ice.html"
  ],
  [
   "Rain",
   "Hydromancy",
   "Adept",
   "rain.html"
  ],
  [
   "Soothing Fog",
   "Hydromancy",
   "Adept",
   "soothing-fog.html"
  ],
  [
   "Ice Spikes",
   "Hydromancy",
   "Adept",
   "ice-spikes.html"
  ],
  [
   "Armor of Ice",
   "Hydromancy",
   "Adept",
   "armor-of-ice.html"
  ],
  [
   "Shatter",
   "Hydromancy",
   "Adept",
   "shatter.html"
  ],
  [
   "Dueling Waves",
   "Hydromancy",
   "Adept",
   "clashing-waves.html"
  ],
  [
   "Marissa's Blessing",
   "Hydromancy",
   "Adept",
   "marissas-blessing.html"
  ],
  [
   "Ice Wall",
   "Hydromancy",
   "Adept",
   "ice-wall.html"
  ],
  [
   "Undertow",
   "Hydromancy",
   "Adept",
   "undertow.html"
  ],
  [
   "Create Ice Golem",
   "Hydromancy",
   "Major",
   "create-ice-golem.html"
  ],
  [
   "Glacial Tomb",
   "Hydromancy",
   "Major",
   "glacial-tomb.html"
  ],
  [
   "Riptide Serpent",
   "Hydromancy",
   "Major",
   "riptide-serpent.html"
  ],
  [
   "Pressure of the Deep",
   "Hydromancy",
   "Major",
   "pressure-of-the-deep.html"
  ],
  [
   "Blizzard",
   "Hydromancy",
   "Grand",
   "blizzard.html"
  ],
  [
   "Tsunami",
   "Hydromancy",
   "Grand",
   "tsunami.html"
  ],
  [
   "Tomb of Ice",
   "Hydromancy",
   "Grand",
   "tomb-of-ice.html"
  ],
  [
   "Wrath of the Tides",
   "Hydromancy",
   "Grand",
   "wrath-of-the-tides.html"
  ],
  [
   "Gag Order",
   "Legimancy",
   "Minor",
   "gag-order.html"
  ],
  [
   "Oath",
   "Legimancy",
   "Adept",
   "oath.html"
  ],
  [
   "Confiscation",
   "Legimancy",
   "Adept",
   "confiscation.html"
  ],
  [
   "Death Sentence",
   "Legimancy",
   "Major",
   "death-sentence.html"
  ],
  [
   "Find Animals",
   "Nature",
   "Minor",
   "find-animals.html"
  ],
  [
   "Find Plants",
   "Nature",
   "Minor",
   "find-plants.html"
  ],
  [
   "Plant Growth",
   "Nature",
   "Minor",
   "plant-growth.html"
  ],
  [
   "Poison Splash",
   "Nature",
   "Minor",
   "poison-splash.html"
  ],
  [
   "Nature Lore",
   "Nature",
   "Minor",
   "nature-lore.html"
  ],
  [
   "Thorn Snare",
   "Nature",
   "Minor",
   "thorn-snare.html"
  ],
  [
   "Verdant Pulse",
   "Nature",
   "Minor",
   "verdant-pulse.html"
  ],
  [
   "Binding Vines",
   "Nature",
   "Adept",
   "binding-vine.html"
  ],
  [
   "Cloud Scribe",
   "Nature",
   "Adept",
   "cloud-scribe.html"
  ],
  [
   "Envelop",
   "Nature",
   "Adept",
   "envelop.html"
  ],
  [
   "Poison Cloud",
   "Nature",
   "Adept",
   "poison-cloud.html"
  ],
  [
   "Call of the Wild",
   "Nature",
   "Adept",
   "call-of-the-wild.html"
  ],
  [
   "Bark of the Ancient",
   "Nature",
   "Adept",
   "bark-of-the-ancient.html"
  ],
  [
   "Pollen Daze",
   "Nature",
   "Adept",
   "pollen-daze.html"
  ],
  [
   "Rebirth",
   "Nature",
   "Major",
   "rebirth.html"
  ],
  [
   "The Hunt",
   "Nature",
   "Major",
   "the-hunt.html"
  ],
  [
   "Heartwood Sanctum",
   "Nature",
   "Major",
   "heartwood-sanctum.html"
  ],
  [
   "World Tree",
   "Nature",
   "Grand",
   "world-tree.html"
  ],
  [
   "Worldroot March",
   "Nature",
   "Grand",
   "worldroot-march.html"
  ],
  [
   "Season's Turning",
   "Nature",
   "Grand",
   "seasons-turning.html"
  ],
  [
   "False Life",
   "Necromancy",
   "Minor",
   "false-life.html"
  ],
  [
   "Grasp of The Grave",
   "Necromancy",
   "Minor",
   "grasp-of-the-grave.html"
  ],
  [
   "Plague Cloud",
   "Necromancy",
   "Minor",
   "plague-cloud.html"
  ],
  [
   "Funeral Rites",
   "Necromancy",
   "Minor",
   "funeral-rites.html"
  ],
  [
   "Gaze of Flesh",
   "Necromancy",
   "Minor",
   "gaze-of-flesh.html"
  ],
  [
   "Necrotic Ray",
   "Necromancy",
   "Minor",
   "necrotic-ray.html"
  ],
  [
   "Sever Life",
   "Necromancy",
   "Minor",
   "sever-life.html"
  ],
  [
   "Deadman's Tale",
   "Necromancy",
   "Minor",
   "deadmans-tale.html"
  ],
  [
   "Armor of Bones",
   "Necromancy",
   "Adept",
   "armor-of-bones.html"
  ],
  [
   "Dance with Death",
   "Necromancy",
   "Adept",
   "dance-with-death.html"
  ],
  [
   "Mimic Life",
   "Necromancy",
   "Adept",
   "mimic-life.html"
  ],
  [
   "Transfer Vitality",
   "Necromancy",
   "Adept",
   "transfer-vitality.html"
  ],
  [
   "Transport through Decay",
   "Necromancy",
   "Adept",
   "transport-through-decay.html"
  ],
  [
   "Grave Chill",
   "Necromancy",
   "Adept",
   "grave-chill.html"
  ],
  [
   "Merged Monstrosity",
   "Necromancy",
   "Adept",
   "merged-monstrosity.html"
  ],
  [
   "Leech Positive Energy",
   "Necromancy",
   "Major",
   "leech-positive-energy.html"
  ],
  [
   "Shroud of Ghosts",
   "Necromancy",
   "Major",
   "shroud-of-ghosts.html"
  ],
  [
   "Banshee's Cry",
   "Necromancy",
   "Major",
   "banshee-cry.html"
  ],
  [
   "Soul Harvest",
   "Necromancy",
   "Major",
   "soul-harvest.html"
  ],
  [
   "Necrotic Bloom",
   "Necromancy",
   "Major",
   "necrotic-bloom.html"
  ],
  [
   "Narolith's Touch",
   "Necromancy",
   "Grand",
   "gravewalk.html"
  ],
  [
   "Pact of the Deathless",
   "Necromancy",
   "Grand",
   "pact-of-the-deathless.html"
  ],
  [
   "Silence of the Grave",
   "Necromancy",
   "Grand",
   "silence-of-the-grave.html"
  ],
  [
   "False Fortitude",
   "Otherworldly",
   "Minor",
   "false-fortitude.html"
  ],
  [
   "False Mana",
   "Otherworldly",
   "Minor",
   "false-mana.html"
  ],
  [
   "Duplicate",
   "Otherworldly",
   "Minor",
   "duplicate.html"
  ],
  [
   "Void Calling",
   "Otherworldly",
   "Minor",
   "void-calling.html"
  ],
  [
   "False Eyes",
   "Otherworldly",
   "Minor",
   "false-eyes.html"
  ],
  [
   "Disfigure",
   "Otherworldly",
   "Minor",
   "disfigure.html"
  ],
  [
   "Pocket Stash",
   "Otherworldly",
   "Minor",
   "pocket-stash.html"
  ],
  [
   "Chaos Bolt",
   "Otherworldly",
   "Adept",
   "chaos-bolt.html"
  ],
  [
   "Key of the Mind",
   "Otherworldly",
   "Adept",
   "key-of-the-mind.html"
  ],
  [
   "Leeching Grasp",
   "Otherworldly",
   "Adept",
   "leeching-grasp.html"
  ],
  [
   "Whispering Madness",
   "Otherworldly",
   "Adept",
   "whispering-madness.html"
  ],
  [
   "Spatial Slash",
   "Otherworldly",
   "Adept",
   "spatial-slash.html"
  ],
  [
   "Puncture",
   "Otherworldly",
   "Adept",
   "puncture.html"
  ],
  [
   "Fold Space",
   "Otherworldly",
   "Adept",
   "fold-space.html"
  ],
  [
   "Probability Flux",
   "Otherworldly",
   "Adept",
   "probability-flux.html"
  ],
  [
   "Maze of Elsewhere",
   "Otherworldly",
   "Adept",
   "maze-of-elsewhere.html"
  ],
  [
   "Mirage",
   "Otherworldly",
   "Major",
   "mirage.html"
  ],
  [
   "Gates of The Abyss",
   "Otherworldly",
   "Major",
   "gates-of-the-abyss.html"
  ],
  [
   "Devour Magic",
   "Otherworldly",
   "Major",
   "devour-magic.html"
  ],
  [
   "Rend Reality",
   "Otherworldly",
   "Grand",
   "rend-reality.html"
  ],
  [
   "Anagisa",
   "Otherworldly",
   "Grand",
   "anagisa.html"
  ],
  [
   "Rift Storm",
   "Otherworldly",
   "Grand",
   "rift-storm.html"
  ],
  [
   "Door to Anywhere",
   "Otherworldly",
   "Grand",
   "door-to-anywhere.html"
  ],
  [
   "Essence Vampirism",
   "Pneumamancy",
   "Minor",
   "essence-vampirism.html"
  ],
  [
   "Sunder",
   "Pneumamancy",
   "Minor",
   "sunder.html"
  ],
  [
   "Soul Sight",
   "Pneumamancy",
   "Minor",
   "soul-sight.html"
  ],
  [
   "Breath of Vigor",
   "Pneumamancy",
   "Minor",
   "breath-of-vigor.html"
  ],
  [
   "Spirit Nudge",
   "Pneumamancy",
   "Minor",
   "spirit-nudge.html"
  ],
  [
   "Twinned Souls",
   "Pneumamancy",
   "Minor",
   "twinned-souls.html"
  ],
  [
   "Spectral Graveyard",
   "Pneumamancy",
   "Adept",
   "spectral-graveyard.html"
  ],
  [
   "Disparate",
   "Pneumamancy",
   "Adept",
   "disparate.html"
  ],
  [
   "Projection",
   "Pneumamancy",
   "Adept",
   "projection.html"
  ],
  [
   "Essence Lash",
   "Pneumamancy",
   "Adept",
   "essence-lash.html"
  ],
  [
   "Spirit Walk",
   "Pneumamancy",
   "Adept",
   "spirit-walk.html"
  ],
  [
   "Mend the Veil",
   "Pneumamancy",
   "Adept",
   "mend-the-veil.html"
  ],
  [
   "Soul Brand",
   "Pneumamancy",
   "Adept",
   "soul-brand.html"
  ],
  [
   "Imprison Essence",
   "Pneumamancy",
   "Major",
   "imprison-essence.html"
  ],
  [
   "Rejuvenation",
   "Pneumamancy",
   "Major",
   "rejuvenation.html"
  ],
  [
   "Ruination",
   "Pneumamancy",
   "Grand",
   "ruination.html"
  ],
  [
   "Genesis",
   "Pneumamancy",
   "Grand",
   "genesis.html"
  ],
  [
   "Transmigration",
   "Pneumamancy",
   "Grand",
   "transmigration.html"
  ],
  [
   "Firework",
   "Pyromancy",
   "Minor",
   "firework.html"
  ],
  [
   "Ignite",
   "Pyromancy",
   "Minor",
   "ignite.html"
  ],
  [
   "Heat Object",
   "Pyromancy",
   "Minor",
   "heat-object.html"
  ],
  [
   "Hurl Fire",
   "Pyromancy",
   "Minor",
   "hurl-fire.html"
  ],
  [
   "Smoke Screen",
   "Pyromancy",
   "Minor",
   "smoke-screen.html"
  ],
  [
   "Finger Flame",
   "Pyromancy",
   "Minor",
   "finger-flame.html"
  ],
  [
   "Control Flame",
   "Pyromancy",
   "Minor",
   "control-flame.html"
  ],
  [
   "Embers of Reflection",
   "Pyromancy",
   "Minor",
   "embers-of-reflection.html"
  ],
  [
   "Cinder Snap",
   "Pyromancy",
   "Minor",
   "cinder-snap.html"
  ],
  [
   "Cauterize Wounds",
   "Pyromancy",
   "Adept",
   "cauterize-wounds.html"
  ],
  [
   "Columns of Fire",
   "Pyromancy",
   "Adept",
   "columns-of-fire.html"
  ],
  [
   "Fireball",
   "Pyromancy",
   "Adept",
   "fireball.html"
  ],
  [
   "Flame Shroud",
   "Pyromancy",
   "Adept",
   "flame-shroud.html"
  ],
  [
   "Whip of Flame",
   "Pyromancy",
   "Adept",
   "whip-of-flame.html"
  ],
  [
   "Flame Wave",
   "Pyromancy",
   "Adept",
   "flame-wave.html"
  ],
  [
   "Explosion",
   "Pyromancy",
   "Adept",
   "explosion.html"
  ],
  [
   "Ashen Shroud",
   "Pyromancy",
   "Adept",
   "ashen-shroud.html"
  ],
  [
   "Flame Web",
   "Pyromancy",
   "Adept",
   "flame-web.html"
  ],
  [
   "Blinding Flash",
   "Pyromancy",
   "Major",
   "blinding-flash.html"
  ],
  [
   "Flaming Weapon",
   "Pyromancy",
   "Major",
   "flaming-weapon.html"
  ],
  [
   "Create Magma Golem",
   "Pyromancy",
   "Major",
   "create-magma-golem.html"
  ],
  [
   "Flames of the Phoenix",
   "Pyromancy",
   "Grand",
   "flames-of-the-phoenix.html"
  ],
  [
   "Heatwave",
   "Pyromancy",
   "Grand",
   "heatwave.html"
  ],
  [
   "Catastrophe",
   "Pyromancy",
   "Grand",
   "catastrophe.html"
  ],
  [
   "Phoenix Heart",
   "Pyromancy",
   "Grand",
   "phoenix-heart.html"
  ],
  [
   "Caldera",
   "Pyromancy",
   "Grand",
   "caldera.html"
  ],
  [
   "Dimming",
   "Tenemancy",
   "Minor",
   "dimming.html"
  ],
  [
   "Pin Shadow",
   "Tenemancy",
   "Minor",
   "paralysis.html"
  ],
  [
   "Umbral Grasp",
   "Tenemancy",
   "Minor",
   "umbral-grasp.html"
  ],
  [
   "Umbral Servant",
   "Tenemancy",
   "Minor",
   "umbral-servant.html"
  ],
  [
   "Gloom Veil",
   "Tenemancy",
   "Minor",
   "gloom-veil.html"
  ],
  [
   "Dark Whisper",
   "Tenemancy",
   "Minor",
   "dark-whisper.html"
  ],
  [
   "Shadow Leap",
   "Tenemancy",
   "Adept",
   "shadow-leap.html"
  ],
  [
   "Silencing Darkness",
   "Tenemancy",
   "Adept",
   "silencing-darkness.html"
  ],
  [
   "Umbral Tether",
   "Tenemancy",
   "Adept",
   "umbral-tether.html"
  ],
  [
   "Umbral Hand",
   "Tenemancy",
   "Adept",
   "umbral-hand.html"
  ],
  [
   "Night's Mantle",
   "Tenemancy",
   "Adept",
   "nights-mantle.html"
  ],
  [
   "Absolute Darkness",
   "Tenemancy",
   "Adept",
   "absolute-darkness.html"
  ],
  [
   "Banishment",
   "Tenemancy",
   "Major",
   "banishment.html"
  ],
  [
   "Shadow Champion",
   "Tenemancy",
   "Major",
   "shadow-champion.html"
  ],
  [
   "Eclipse",
   "Tenemancy",
   "Major",
   "eclipse.html"
  ],
  [
   "Kumulipo",
   "Tenemancy",
   "Grand",
   "kumulipo.html"
  ],
  [
   "Kingdom of Shadow",
   "Tenemancy",
   "Grand",
   "kingdom-of-shadow.html"
  ],
  [
   "Conduction",
   "Transmutation",
   "Minor",
   "conduction.html"
  ],
  [
   "Contamination",
   "Transmutation",
   "Minor",
   "contamination.html"
  ],
  [
   "Transmute Material",
   "Transmutation",
   "Minor",
   "transmute-material.html"
  ],
  [
   "Tyrant's Hand",
   "Transmutation",
   "Minor",
   "tyrants-hand.html"
  ],
  [
   "Warding Wine",
   "Transmutation",
   "Minor",
   "warding-wine.html"
  ],
  [
   "Razor Talon",
   "Transmutation",
   "Minor",
   "razor-talon.html"
  ],
  [
   "Harness Water",
   "Transmutation",
   "Adept",
   "harness-water.html"
  ],
  [
   "Condense",
   "Transmutation",
   "Adept",
   "condense.html"
  ],
  [
   "Crown of Honey",
   "Transmutation",
   "Adept",
   "crown-of-honey.html"
  ],
  [
   "Quicksilver Body",
   "Transmutation",
   "Adept",
   "quicksilver-body.html"
  ],
  [
   "Leaden Bones",
   "Transmutation",
   "Adept",
   "leaden-bones.html"
  ],
  [
   "Perfect Edge",
   "Transmutation",
   "Adept",
   "perfect-edge.html"
  ],
  [
   "Polymorph",
   "Transmutation",
   "Major",
   "polymorph.html"
  ],
  [
   "Swarm of Insects",
   "Transmutation",
   "Major",
   "swarm-of-insects.html"
  ],
  [
   "Create Material",
   "Transmutation",
   "Major",
   "create-material.html"
  ],
  [
   "Greater Transmute Material",
   "Transmutation",
   "Major",
   "greater-transmute-material.html"
  ],
  [
   "Ascendant Element",
   "Transmutation",
   "Grand",
   "ascendant-element.html"
  ],
  [
   "Greater Create Material",
   "Transmutation",
   "Grand",
   "greater-create-material.html"
  ],
  [
   "Philosopher's Decree",
   "Transmutation",
   "Grand",
   "philosophers-decree.html"
  ]
 ],
 "maneuvers": [
  [
   "Amazing Leap",
   "Basic",
   "amazing-leap.html"
  ],
  [
   "Ambusher",
   "Basic",
   "ambusher.html"
  ],
  [
   "Barbed Arrow",
   "Basic",
   "barbed-arrow.html"
  ],
  [
   "Blinding Strike",
   "Basic",
   "blinding-strike.html"
  ],
  [
   "Coup De Grace",
   "Basic",
   "coup-de-grace.html"
  ],
  [
   "Coward's Executioner",
   "Basic",
   "cowards-executioner.html"
  ],
  [
   "Crippling Strike",
   "Basic",
   "crippling-strike.html"
  ],
  [
   "Deadly Fists",
   "Basic",
   "deadly-fists.html"
  ],
  [
   "Disciplined",
   "Basic",
   "disciplined.html"
  ],
  [
   "Fast Hands",
   "Basic",
   "fast-hands.html"
  ],
  [
   "Feint",
   "Basic",
   "feint.html"
  ],
  [
   "Firearm Specialist",
   "Basic",
   "firearm-specialist.html"
  ],
  [
   "Focused Palm",
   "Basic",
   "focused-palm.html"
  ],
  [
   "Impale",
   "Basic",
   "impale.html"
  ],
  [
   "Iron Body",
   "Basic",
   "iron-body.html"
  ],
  [
   "Light Footwork",
   "Basic",
   "light-footwork.html"
  ],
  [
   "Luminous Object",
   "Basic",
   "luminous-object.html"
  ],
  [
   "One Handed Expertise",
   "Basic",
   "one-handed-expertise.html"
  ],
  [
   "Overwhelm",
   "Basic",
   "overwhelm.html"
  ],
  [
   "Polearm Expertise",
   "Basic",
   "polearm-expertise.html"
  ],
  [
   "Reflexive Riposte",
   "Basic",
   "reflexive-riposte.html"
  ],
  [
   "Ruthless",
   "Basic",
   "ruthless.html"
  ],
  [
   "Serpents Form",
   "Basic",
   "serpents-form.html"
  ],
  [
   "Shield Bash",
   "Basic",
   "shield-bash.html"
  ],
  [
   "Shield Throw",
   "Basic",
   "shield-throw.html"
  ],
  [
   "Source Barrier",
   "Basic",
   "source-barrier.html"
  ],
  [
   "Steel to Rubber",
   "Basic",
   "steel-to-rubber.html"
  ],
  [
   "Tracker",
   "Basic",
   "tracker.html"
  ],
  [
   "Trickshot",
   "Basic",
   "trickshot.html"
  ],
  [
   "Tripping Strike",
   "Basic",
   "tripping-strike.html"
  ],
  [
   "Vital Strike",
   "Basic",
   "vital-strike.html"
  ],
  [
   "Whirlwind",
   "Basic",
   "whirlwind.html"
  ],
  [
   "Dash",
   "Basic",
   "dash.html"
  ],
  [
   "Sprint",
   "Basic",
   "sprint.html"
  ],
  [
   "Thousand Cuts",
   "Advanced",
   "1000-cuts.html"
  ],
  [
   "Adamantine Body",
   "Advanced",
   "adamantite-body.html"
  ],
  [
   "Alchemical Weapon",
   "Advanced",
   "alchemical-weapon.html"
  ],
  [
   "Lesser Alter Weapon",
   "Advanced",
   "alter-weapon-lesser.html"
  ],
  [
   "Annul Maneuver",
   "Advanced",
   "annul-maneuver.html"
  ],
  [
   "Assassin's Escape",
   "Advanced",
   "assassins-escape.html"
  ],
  [
   "Blitz",
   "Advanced",
   "blitz.html"
  ],
  [
   "Bouncing Shield",
   "Advanced",
   "bouncing-shield.html"
  ],
  [
   "Bull Rush",
   "Advanced",
   "bull-rush.html"
  ],
  [
   "Buoyant Blade",
   "Advanced",
   "buoyant-blade.html"
  ],
  [
   "Corrupt Weapon",
   "Advanced",
   "corrupt-weapon.html"
  ],
  [
   "Cunning Tactics",
   "Advanced",
   "cunning-tactics.html"
  ],
  [
   "Debilitation",
   "Advanced",
   "dehabilitation.html"
  ],
  [
   "Deflect",
   "Advanced",
   "deflect.html"
  ],
  [
   "Destroy Armor",
   "Advanced",
   "destroy-armor.html"
  ],
  [
   "Dirty Tactics",
   "Advanced",
   "dirty-tactics.html"
  ],
  [
   "Enfeebling Strikes",
   "Advanced",
   "enfeebling-strikes.html"
  ],
  [
   "Eye of the Eagle",
   "Advanced",
   "eye-of-the-eagle.html"
  ],
  [
   "Flicker Step",
   "Advanced",
   "flicker-step.html"
  ],
  [
   "Grappling Ammunition",
   "Advanced",
   "grappling-arrow.html"
  ],
  [
   "Hero Within",
   "Advanced",
   "hero-within.html"
  ],
  [
   "Lacerating Rush",
   "Advanced",
   "lacerating-rush.html"
  ],
  [
   "Luminous Armament",
   "Advanced",
   "luminous-armament.html"
  ],
  [
   "Mocking Strike",
   "Advanced",
   "mocking-strike.html"
  ],
  [
   "Overhead Cleave",
   "Advanced",
   "overhead-cleave.html"
  ],
  [
   "Paralysis Points",
   "Advanced",
   "paralysis-points.html"
  ],
  [
   "Power Shots",
   "Advanced",
   "power-shots.html"
  ],
  [
   "Rejuvenating Ki",
   "Advanced",
   "rejuvenating-ki.html"
  ],
  [
   "Repulse",
   "Advanced",
   "repulse.html"
  ],
  [
   "Sacrificial Lamb",
   "Advanced",
   "sacrificial-lamb.html"
  ],
  [
   "Source Sanctuary",
   "Advanced",
   "source-sanctuary.html"
  ],
  [
   "Spell Breaker",
   "Advanced",
   "spell-breaker.html"
  ],
  [
   "Alter Weapon",
   "Expert",
   "alter-weapon.html"
  ],
  [
   "Battle Stomp",
   "Expert",
   "battle-stomp.html"
  ],
  [
   "Conviction",
   "Expert",
   "conviction.html"
  ],
  [
   "Dancing Blades",
   "Expert",
   "dancing-blades.html"
  ],
  [
   "Electric Weapon",
   "Expert",
   "electric-blade.html"
  ],
  [
   "Fatal Strike",
   "Expert",
   "fatal-strike.html"
  ],
  [
   "Flame Weapon",
   "Expert",
   "flame-edge.html"
  ],
  [
   "Frostbite Fang",
   "Expert",
   "frostbite-fang.html"
  ],
  [
   "Legend Within",
   "Expert",
   "legend-within.html"
  ],
  [
   "Mind Edge",
   "Expert",
   "minds-edge.html"
  ],
  [
   "Corroding Weapon",
   "Expert",
   "corroding-blade.html"
  ],
  [
   "Phantom Steps",
   "Expert",
   "phantom-steps.html"
  ],
  [
   "Piercing Shots",
   "Expert",
   "piercing-shots.html"
  ],
  [
   "Polearm Mastery",
   "Expert",
   "polearm-mastery.html"
  ],
  [
   "Sapping Weapon",
   "Expert",
   "sapping-blade.html"
  ],
  [
   "Source Aegis",
   "Expert",
   "source-aegis.html"
  ],
  [
   "Sonic Boom",
   "Expert",
   "sonic-boom.html"
  ],
  [
   "Stunning Blow",
   "Expert",
   "stunning-blow.html"
  ],
  [
   "Trembling Rage",
   "Expert",
   "trembling-rage.html"
  ],
  [
   "Uncanny Speed",
   "Expert",
   "uncanny-speed.html"
  ],
  [
   "Vanish",
   "Expert",
   "vanish.html"
  ],
  [
   "Breakneck",
   "Expert",
   "breakneck.html"
  ],
  [
   "Vampiric Weapon",
   "Expert",
   "vampiric-blade.html"
  ],
  [
   "Acrobatic Assault",
   "Master",
   "acrobatic-assault.html"
  ],
  [
   "Alter Weapon, Greater",
   "Master",
   "alter-weapon-greater.html"
  ],
  [
   "Bhaalnuva's Gambit",
   "Master",
   "bhaalnuvas-gambit.html"
  ],
  [
   "Hero's Rally",
   "Master",
   "heros-rally.html"
  ],
  [
   "Mark of Retribution",
   "Master",
   "mark-of-retribution.html"
  ],
  [
   "Shadow Strike",
   "Master",
   "shadow-strike.html"
  ],
  [
   "Skyfall",
   "Master",
   "skyfall.html"
  ]
 ],
 "feats": [
  [
   "Ability Improvement",
   "ability-improvement.html"
  ],
  [
   "Dragon Gifted",
   "dragon-gifted.html"
  ],
  [
   "Spirit-Gifted",
   "spirit-gifted.html"
  ],
  [
   "Fiend-Gifted",
   "fiend-gifted.html"
  ],
  [
   "Angel-Gifted",
   "angel-gifted.html"
  ],
  [
   "Terrifying",
   "terrifying.html"
  ],
  [
   "Coordinated Assault",
   "coordinated-assault.html"
  ],
  [
   "Chef",
   "chef.html"
  ],
  [
   "Magic Durability",
   "magic-durability.html"
  ],
  [
   "Physical Durability",
   "physical-durability.html"
  ],
  [
   "True Durability",
   "true-durability.html"
  ],
  [
   "Endurance",
   "endurance.html"
  ],
  [
   "Greater Endurance",
   "greater-endurance.html"
  ],
  [
   "Mana Pooling",
   "mana-pooling.html"
  ],
  [
   "Greater Mana Pooling",
   "greater-mana-pooling.html"
  ],
  [
   "Resistant",
   "resistant.html"
  ],
  [
   "Combat Ready",
   "combat-ready.html"
  ],
  [
   "Greater Combat Ready",
   "greater-combat-ready.html"
  ],
  [
   "Elemental Affinity",
   "elemental-affinity.html"
  ],
  [
   "Decisive Striker",
   "decisive-striker.html"
  ],
  [
   "Deadly Magic",
   "deadly-magic.html"
  ],
  [
   "Skillful",
   "skillful.html"
  ],
  [
   "Telekinesis",
   "telekinesis.html"
  ],
  [
   "Telepathy",
   "telepathy-feat.html"
  ],
  [
   "Linguistic",
   "linguistic.html"
  ],
  [
   "Momentum",
   "improved-momentum.html"
  ],
  [
   "Magical Knowledge",
   "magical-knowledge.html"
  ],
  [
   "Muscle Memory",
   "muscle-memory.html"
  ],
  [
   "Light Armor Training",
   "light-armor-training.html"
  ],
  [
   "Medium Armor Training",
   "medium-armor-training.html"
  ],
  [
   "Heavy Armor Training",
   "heavy-armor-training.html"
  ],
  [
   "Light Armor Master",
   "light-armor-master.html"
  ],
  [
   "Medium Armor Master",
   "medium-armor-master.html"
  ],
  [
   "Heavy Armor Master",
   "heavy-armor-master.html"
  ],
  [
   "Quick Reflexes",
   "quick-reflexes.html"
  ],
  [
   "Evasive",
   "evasive.html"
  ],
  [
   "Reactive Shot",
   "reactive-shot.html"
  ],
  [
   "Manual Mastery",
   "manual-mastery.html"
  ],
  [
   "Potion Glutton",
   "potion-glutton.html"
  ],
  [
   "Scroll Mastery",
   "scroll-mastery.html"
  ],
  [
   "Exotic Movement",
   "exotic-movement.html"
  ],
  [
   "All In",
   "all-in.html"
  ],
  [
   "Potent Casting",
   "potent-casting.html"
  ],
  [
   "In Time",
   "in-time.html"
  ],
  [
   "Spell Specialization",
   "spell-specialization.html"
  ],
  [
   "Metamagic: Extend Spell",
   "extend-spell.html"
  ],
  [
   "Metamagic: Far Spell",
   "far-spell.html"
  ],
  [
   "Metamagic: Reliable Spell",
   "reliable-spell.html"
  ],
  [
   "Metamagic: Powerful Spell",
   "powerful-spell.html"
  ],
  [
   "Defensive Opportunist",
   "defensive-opportunist.html"
  ],
  [
   "Opportune Magic",
   "opportune-magic.html"
  ],
  [
   "Armor Master",
   "armor-master.html"
  ],
  [
   "Efficient Caster",
   "efficent-caster.html"
  ],
  [
   "Efficient Caster Adept",
   "efficient-caster-a.html"
  ],
  [
   "Efficient Caster Major",
   "efficient-caster-m.html"
  ],
  [
   "Efficient Maneuvers",
   "efficient-maneuvers.html"
  ],
  [
   "Efficient Maneuvers Advanced",
   "efficient-maneuver-as.html"
  ],
  [
   "Efficient Maneuvers Expert",
   "efficient-maneuver-e.html"
  ],
  [
   "Nimbily Armored",
   "nimbily-armored.html"
  ]
 ],
 "spellTiers": [
  {
   "name": "Minor",
   "cost": 5,
   "level": 1
  },
  {
   "name": "Adept",
   "cost": 10,
   "level": 7
  },
  {
   "name": "Major",
   "cost": 20,
   "level": 15
  },
  {
   "name": "Grand",
   "cost": 40,
   "level": 21
  }
 ],
 "maneuverTiers": [
  {
   "name": "Basic",
   "cost": 5,
   "level": 1
  },
  {
   "name": "Advanced",
   "cost": 10,
   "level": 7
  },
  {
   "name": "Expert",
   "cost": 15,
   "level": 15
  },
  {
   "name": "Master",
   "cost": 20,
   "level": 21
  }
 ],
 "itemSlots": [
  "Head",
  "Face",
  "Neck",
  "Body",
  "Wrists",
  "Waist",
  "Legs",
  "Feet",
  "Hands"
 ],
 "itemPowers": [
  "Faint",
  "Glimmering",
  "Exotic",
  "Legendary",
  "Mythic",
  "Relic"
 ],
 "alignments": [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil"
 ]
};
