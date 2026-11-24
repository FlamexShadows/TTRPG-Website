import os

# Spells data (Replace this entire section with your list of spells)
spells = [
    {
        "Name":"Divine Spectral Sword",
        "AP Cost": "2",
        "Spell Rank": "Minor",
        "Class":"Heavenly",
        "Subtype":"Retribution",
        "Range":"5 Meters",
        "Requirements":"Words of Power, Sigils",
        "Duration" :"1 Minute",
        "Concentration": "No",
        "Description": "Functions as Spectral Sword but deals holy damage instead of force."
    },

{
    "Name": "Essence Vampirism",
    "AP Cost":"3",
    "Spell Rank": "Minor",
    "Class": "Pneumamancy",
    "Subtype": "Severance",
    "Range": "15 Meters",
    "Requirements": "Gemstone worth 1000 GP",
    "Duration": "1 Minute",
    "Concentration": "Yes",
    "Description": "The caster targets a creature within range with no magical armor. The creature must succeed on a Resistance (Mind) check or lose the ability to cast a spell or perform a combat maneuver of the caster's choice that they are aware the targeted creature has for the duration of the spell."
},

{
  "Name": "Imprison Essence",
  "Casting Time": "Reaction",
  "Spell Rank": "Major",
  "Class": "Pneumamancy",
  "Subtype": "Severance",
  "Range": "Touch",
  "Requirements": "Words of Power, A soul gem worth 1000 GP",
  "Duration": "Permanent",
  "Concentration": "No",
  "Description": "The caster attempts to imprison a creature's soul into a soul gem. The target must succeed on a Resistance (Mind) check or have its soul imprisoned in the gem. While imprisoned the creature's soul cannot be freed unless the gem is dispelled, broken, or the soul is replaced by a Genesis spell or freed by a wishing upon a star.  \nWhile holding a soul gem with an imprisoned essence the wielder gains a bonus 10 true armor (to a maximum of 100). In addition to this the caster who made the Soul Gem may speak to the imprisoned essence. The soul is under no obligation to tell the truth or even speak. But if the soul does lie while in the gem the caster knows."
},

     

{"Name":"Sunder",
 "AP Cost":" 3",
 "Spell Rank":"Minor",
 "Class":"Pneumamancy",
 "Subtype":"Severance",
 "Range":"10 Meters",
 "Requirements":"Sigils, Words of Power",
 "Duration":"Instant",
 "Concentration":"No",

"Description": "The caster targets one creature within range of themselves sending a translucent wave of magical force to the target creature. The creature must succeed on a Resistance (Mind) check or take 3d6 magic damage."
},


{ "Name":"Disparate",
 "AP Cost":"4",
 "Spell Rank":" Adept",
 "Class":"Pneumamancy",
 "Subtype":"Severance",
 "Range":"Touch",
 "Requirements":" Words of Power",
 "Duration" :"1 Minute",
 "Concentration" : "No",

"Description":" The caster attempts to force a creature's soul from its vessel. If the target has no magical armor, it must succeed on an Evasion check or take 2d6 magic damage and roll a Resistance (Mind) check. On a failure the creature becomes severed for the duration of the spell."
 },


 { "Name":"Projection",
 "AP Cost":" 1 Hour",
 "Spell Rank":" Adept",
 "Class":" Pneumamancy",
 "Subtype":" Manipulation",
 "Range":" Self",
 "Requirements":" Words of Power, Incense",
 "Duration" :" 10 Hours",
 "Concentration" : " Yes",

"Description":" The caster performs a 1-hour long ritual that when completed ejects their soul from their vessel. For the next 10 hours, the caster’s soul walks the border world. While in the border world, it cannot see further than 30 feet, interact with the material world or its body, and cannot be perceived by any creature without Supernatural vision."
},

 { "Name":"Ruination",
 "AP Cost":" 5",
 "Spell Rank":" Grand",
 "Class":" Pneumamancy",
 "Subtype":" Severance",
 "Range":" 20 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster targets a creature attempting to unmake its essence. If the creature has no magic armor, it must succeed on a Resistance (Mind) check or become severed. If it fails, the check by 5 or more the creature dies, and its essence erased. A creature killed by ruination cannot be resurrected by any means short of a Genesis followed by a resurrection spell or by wishing upon a star."
},

 

 { "Name":"Essence Vampirism",
 "AP Cost":" 3",
 "Spell Rank":" Minor",
 "Class":" Pneumamancy",
 "Subtype":" Severance",
 "Range":" 15 Meters",
 "Requirements":" Gemstone worth 1000 GP",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster targets a creature within range with no magical armor. The creature must succeed on a Resistance (Mind) check or lose the ability to cast a spell or perform a combat maneuver of the casters choice that they are aware the targeted creature has for the duration of the spell."
 },



 { "Name":"Spectral Graveyard",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Pneumamancy",
 "Subtype":" Projection",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 minute",
 "Concentration" : " No",

"Description":" This spell functions as shroud of ghosts but acts as if the caster has physical armor."
 },



 { "Name":"Rejuvenation",
 "AP Cost":" 2",
 "Spell Rank":" Major",
 "Class":" Pneumamancy",
 "Subtype":" Manipulation",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster touches a creature that is affected by the severed condition ending it."
},



 { "Name":"Genesis",
 "Casting Time":" 24 Hours",
 "Spell Rank":" Grand",
 "Class":" Pneumamancy",
 "Subtype":" Manipulation",
 "Range":" Self",
 "Requirements":" Words of Power, Soul gem",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster restores creatures they have met personally or create a soul held within a soul gem they used while casting this spell. The gem can be broken by the caster with no check required freeing the soul into the cosmos allowing it to inhabit a body."
},
   


 { "Name":"Mutate",
 "Casting Time":" 10 Minutes",
 "Spell Rank":" Minor",
 "Class":" Biomancy",
 "Subtype":" Fleshcraft",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils, 2 Mutagen",
 "Duration" :" Permanent",
 "Concentration" : " No",

"Description":" The caster touches a creature as it grows one of the following choices of the casters choosing. A creature cannot have more than one mutation at a time. These mutations can appear in any way the caster desires. <br><br>Thicken Skin<br> The target gains resistance 5 to physical damage. <br><br> Noxious Blood <br>Whenever a creature strikes the target with a melee attack the creature takes 1d6 poison damage. <br><br>Dense Body <br>The target counts as one size larger for the purpose of overpower checks. <br><br>Gill Growth <br>The target gains the ability to breathe underwater. <br><br>Additional mutations can be used but should not be more powerful than any of the listed options or replicate the effects of a higher level spell."
 },
 
 

 { "Name":"Gift of the Hydra",
 "AP Cost":" 6",
 "Spell Rank":" Adept",
 "Class":" Biomancy",
 "Subtype":" Evolution",
 "Range":" Self",
 "Requirements":" Words of Power, 5 Mutagen",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster grants themselves the resilience of a hydra. The caster becomes immune to death effects from losing limbs or organs. In addition, the caster regains 10 health at the start of each of their turns. The effects of this spell are halted if the caster takes fire damage or begins corroding until the end of its next turn."
   },



 { "Name":"Echolocation",
 "Casting Time":" 1 Minute",
 "Spell Rank":" Minor",
 "Class":" Biomancy",
 "Subtype":" Evolution",
 "Range":" Touch",
 "Requirements":" Sigils, 1 Mutagen",
 "Duration" :" 1 Hour",
 "Concentration" : " No",

"Description":" The caster touches a creature granting it Blind Sight for the duration"
  },



 { "Name":"Blind",
 "AP Cost":" 4",
 "Spell Rank":" Minor",
 "Class":" Biomancy",
 "Subtype":" Regression",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",

"Description":" The caster attempts to blind one creature it can see in range. The creature must succeed on a Resistance (Body) check or become blind."
},



 { "Name":"Dimming",
 "AP Cost":" 1",
 "Spell Rank":" Minor",
 "Class":" Tenemancy",
 "Subtype":" Penumbra",
 "Range":" 15 meters",
 "Requirements":" Words of Power",
 "Duration" :" 10 Minutes",
 "Concentration" : " No",

"Description":" The caster dims the light of the targeted area of the spell. This blot of darkness appears as a 10 meter radius sphere centered at the point the caster chooses and any creature that looks into or tries to see past the area is affected by darkness."

},



 { "Name":"Umbral Tether",
 "AP Cost":" 1",
 "Spell Rank":" Adept",
 "Class":" Tenemancy",
 "Subtype":" Umbra",
 "Range":" 15 meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Hour",
 "Concentration" : "No",

"Description":" The caster creates a tether that links themselves and a willing target's source together. The caster and the target combine magical and physical armor and share this linked pool for the duration of the spell."
},



 { "Name":"Banishment",
 "AP Cost":" 2 AP",
 "Spell Rank":" Major",
 "Class":" Tenemancy",
 "Subtype":" Penumbra",
 "Range":" 15 Meters",
 "Requirements":" Words of Power, A symbol that opposed the force banished",
 "Duration" :" 1 hour",
 "Concentration" : " Yes",

"Description":" The caster attempts to banish a creature to a twilight demiplane. The creature must succeed on a Resistance (Mind) check or be sent to the demiplane for the duration of the spell. If the creature leaves the demiplane during its duration the spell automatically ends."
},



 { "Name":"Kumulipo",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Tenemancy",
 "Subtype":" Umbra",
 "Range":" 100 meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster creates a 5 meter radius origin at a point they can see in range. Each creature within 20 meters of the point must succeed on an Overpower check or be pulled to the origin of the spell. Any creature that touches, enters or starts its turn in origin point takes 20d12 magic damage. A creature reduced to 0 health dies as it merges with the Kumulipo increasing its radius by 20 and resetting its duration to 1 minute."
},



{ "Name":"Paralysis",
 "AP Cost":" 4",
 "Spell Rank":" Minor",
 "Class":" Tenemancy",
 "Subtype":" Umbra",
 "Range":" 10 meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 minute",
 "Concentration" : " Yes",

"Description":" The caster attempts to bind the target's shadows in place. The creature must succeed on a Resistance (Mind) check or become paralyzed for the duration of the spell. A creature may repeat this save at the start of each of its turns. This effect ends when the creature takes damage or succeeds on its check. This spell cannot be upcast."
},



{ "Name":"Absolute Darkness",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Tenemancy",
 "Subtype":" Umbra",
 "Range":" 15 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 10 minutes",
 "Concentration" : " No",
  
"Description":" This spell functions as Dimming but creates true darkness."
},



{ "Name":"Shadow Champion",
 "AP Cost":" 3",
 "Spell Rank":" Major",
 "Class":" Tenemancy",
 "Subtype":" Umbral",
 "Range":" 20 meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster animates the shadow of a creature they can see within range. The shadow attacks its creator using the caster's spell attack modifier. On a hit the creature takes 5d8 psychic damage and must succeed on a Resistance (Mind) check or begin draining until the end of their next turn."
},



{ "Name":"Umbral Servant",
 "AP Cost":" 10 minutes",
 "Spell Rank":" Minor",
 "Class":" Tenemancy",
 "Subtype":" Umbra",
 "Range":" Self",
 "Requirements":" Sigils",
 "Duration" :" 1 hour",
 "Concentration" : " No",

"Description":" The caster separates their shadow creating a simulacrum of themselves. The servant is able to perform simple tasks such as cooking food, washing dishes or doing laundry until the duration of the spell ends. At the end of the spell's duration the Servant is returned to the casters side potentially leaving any task it was performing unfinished."
},



{ "Name":"Shadow Leap",
 "AP Cost":" 1 AP",
 "Spell Rank":" Adept",
 "Class":" Tenemancy",
 "Subtype":" Penumbra",
 "Range":" 30 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",
  
"Description":" The caster is absorbed into their shadow and reappears on another shadow that they can see within range."
},



 { "Name":"Umbral Grasp",
 "AP Cost":" 3",
 "Spell Rank":" Minor",
 "Class":" Tenemancy",
 "Subtype":" Penumbra",
 "Range":" 5 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster targets a creature in range as 1d4+1 bolts of darkness form shooting at the target. The caster makes a single attack roll. On a hit the creature takes 1d6 cold damage for each bolt rolled."
},

 

 { "Name":"Silencing Darkness",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Tenemancy",
 "Subtype":" Umbra",
 "Range":" 15 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 10 minutes",
 "Concentration" : " No",

"Description":" This spell functions as Dimming but no sound can be created or pass through the darkness. Any creature inside the darkness is silenced.",
   },
 


 {"Name":"Magic Sense",
  "AP Cost":" 1",
  "Spell Rank":" Minor",
  "Class":" Arcanomancy",
  "Subtype":" Divination",
  "Range":" 10 Meters",
  "Requirements":" Sigils",
  "Duration" :" 1 Minute",
  "Concentration" : " No",
    
  "Description":" The caster reveals magic present within 10 meters of themselves. The caster does not know the nature or effects of the magic present but can identify what is magical and feels how much mana is used to create it.",
   },
   


   { "Name":"Identify",
   "Casting Time":" 1 Hour",
   "Spell Rank":" Adept",
   "Class":" Arcanomancy",
   "Subtype":" Apotropaic",
   "Range":" Touch",
   "Requirements":" Words of Power",
   "Duration" :" Instant",
   "Concentration" : " No",

  "Description":" The caster reveals the properties of a magic item they wield. This spell reveals the following about the Item. <br><br> Name <br>Rarity <br> Curse (Yes or No. Does not reveal details) <br> Trait <br> Magical Property (If Applicable)",
  },

   

   { "Name":"Finger of Doom",
   "AP Cost":" 4",
   "Spell Rank":" Major",
   "Class":" Arcanomancy",
   "Subtype":" Destruction",
   "Range":" 20 Meters",
   "Requirements":" Words of Power",
   "Duration" :" Instant",
   "Concentration" : " No",

  "Description":" The caster points its finger at a creature within range springing a red beam that attempts to pierce the target's heart. The creature targeted must succeed on an Evasion check. On a failure the creature takes 8d10+Casting Modifier True damage. If the creature is reduced to 0 health, it is instantly slain. If the creature has a heart a hole is left where the target's chest is.",


   },

   { "Name":"Gwenivene's Gambit",
   "AP Cost":" 6",
   "Spell Rank":" Grand",
   "Class":" Arcanomancy",
   "Subtype":" Destruction",
   "Range":" Touch",
   "Requirements":" Words of Power",
   "Duration" :" Instant",
   "Concentration" : " No",

  "Description":" The caster gambits their magical armor in a duel of souls against the target. The caster's magic armor is compared to the creature they are currently gambling against. The creature with the lower magical armor has its armor reduced to 0 and is Cursed for 1 minute.",


    },

   { "Name":"Sleep",
    "AP Cost":" 4",
    "Spell Rank":" Minor",
   "Class":" Arcanomancy",
    "Subtype":" Apotropaic",
    "Range":" 15 Meters",
    "Requirements":" Words of Power",
    "Duration" :" 1 Minute",
   "Concentration" : " No",
    
  "Description":" The caster attempts to send a creature it can see within range into a magical sleep. If the creature has no magical armor, it must succeed on a Resistance (Mind) check. On a failure, the creature is rendered unconscious until the end of the spell's duration. If the creature takes any damage or a creature spends 2 AP to shake the creature awake, the spell ends and the creature wakes up.",
   
   
   },

   { "Name":"Telepathy",
   "Casting Time":" 10 Minutes",
   "Spell Rank":" Adept",
   "Class":" Arcanomancy",
   "Subtype":" Divination",
   "Range":" 10 Meters",
   "Requirements":" Sigils",
   "Duration" :" 1 Hour",
   "Concentration" : " No",

  "Description":" The caster picks up to 5 creatures within range and grants them telepathy. Each creature that has this telepathy can only communicate with creatures they share a language with.",
      
      
  },

    { "Name":"Symbol of Power",
    "AP Cost":" 4",
    "Spell Rank":" Major",
    "Class":" Arcanomancy",
    "Subtype":" Destruction",
    "Range":" Touch",
    "Requirements":" Words of Power, Sigils",
    "Duration" :" 1 Minute",
    "Concentration" : " Yes",

    "Description":" The creature targeted by this spell becomes empowered. Until the spell ends its strength score increases by 15 and gains 50 true armor.",
    },

    { "Name":"Upon A Star",
    "AP Cost":" 6",
    "Spell Rank":" Grand",
    "Class":" Arcanomancy",
    "Subtype":" Divination",
    "Range":" Self",
    "Requirements":" Words of Power, 100,000 GP",
    "Duration" :" Instant",
    "Concentration" : " No",

    "Description":" The most mighty spell a caster may evoke upon the world. The caster calls upon the weave creating a visible streak in the sky identical to a comet passing by to create an effect they desire. The base use of this spell is to remove any condition, effect, raise a statistic of the caster's choice by 5 to a maximum of 20 or cast any Major or lesser Aeromancy, Pyrokinesis, Geokinesis, Arcanomancy, Necromancy, or Transmutation schools. Alternatively the caster may wish for something greater. The spell can create an effect such as producing 500,000 gold or undoing certain events or something else the caster may wish for. If the spell is successful doing so comes at a risk of cracking the caster source vat. The caster must roll a 1d100. On a 50 or higher the caster has put too much strain on their source causing it to crack and the caster loses an amount of mana the GM determines depending on how much was granted.",
    },

    { "Name":"Spectral Sword",
     "AP Cost":" 2",
     "Spell Rank":" Minor",
     "Class":" Arcanomancy",
     "Subtype":" Destruction",
     "Range":" 5 Meters",
     "Requirements":" Words of Power, Sigils",
     "Duration" :" 1 Minute",
    "Concentration" : " No",
     
    "Description":"  The caster summons a spectral weapon that attacks targets of the caster's choice. For 3 AP the caster orders the sword to attack creatures within range. The caster makes two magic attacks against a target. On a hit, the creature takes 1d6+Casting Modifier. The caster may spend 1 AP to move the sword up to 5 Meters to an unoccupied space.",
    },

    { "Name":"Banish",
    "AP Cost":" 2 AP",
    "Spell Rank":" Adept",
    "Class":" Arcanomancy",
    "Subtype":" Apotropaic",
    "Range":" 15 Meters",
    "Requirements":" Words of Power, A symbol that opposed the force banished",
    "Duration" :" Instant",
    "Concentration" : " No",

    "Description":" The caster targets one creature it can see not native to the domain it currently inhabits. If the creature has no magical armor the two creatures make contested charisma checks. If the caster wins the creature is instantly banished back to its home domain. If the creature wins the spell fails and is immune to the effects of a banish spell for the next 24 hours. When upcast the caster selects an additional target for each tier higher.",
    },

    { "Name":"Stillness of The Mind",
    "AP Cost":" 2",
    "Spell Rank":" Major",
    "Class":" Arcanomancy",
    "Subtype":" Apotropaic",
    "Range":" 10 Meters",
    "Requirements":" Words of Power",
    "Duration" :" Instant",
    "Concentration" : " No",

    "Description":" The caster chooses one target within range of themselves. The spell automatically ends ongoing Silenced, Blind, Deaf, Fearful, Hopeless, Cursed effects on the target caused by a Resistance (Mind) check.",
    },

    { "Name":"Armor of Magic",
     "AP Cost":" 2",
     "Spell Rank":" Minor",
     "Class":" Arcanomancy",
     "Subtype":" Apotropaic",
     "Range":" 15 Meters",
     "Requirements":" Sigils, Words of Power",
     "Duration" :" 8 Hours",
    "Concentration" : " No",
     
    "Description":"  The caster is enveloped in a semi-transparent purple barrier that grants the target 5d6 magic armor and ends the burning, frozen, paralyzed, and stunned condition.",
    },

    { "Name":"Summoner's Circle",
    "Casting Time":" 1 Hour",
    "Spell Rank":" Adept",
    "Class":" Arcanomancy",
    "Subtype":" Apotropaic",
    "Range":" Touch",
    "Requirements":" Holy or Unholy Relic worth 500 Gold, Salt, Sigils",
    "Duration" :" 24 Hours",
    "Concentration" : " No",

    "Description":" The caster creates a circle that traps creatures inside the circle. Any creature summoned by the caster that answers the call is trapped within the circle. The trapped creature is incapable of leaving or damaging the salt circle while it is whole, and the spell's duration is active. Creatures trapped by this spell are aware if it is currently active. Most creatures that answer summons are wary of summoner circles. Creatures trapped within a summoner circle are less willing to negotiate while it is active, resulting in all charisma checks taking a penalty equal to the threat rating of the summon. When upcast Summoner's Circle turns the duration to 1 month at Major and 1 year at grand.",
    },

    { "Name":"Magic Dome",
    "AP Cost":" 5",
    "Spell Rank":" Major",
    "Class":" Arcanomancy",
    "Subtype":" Apotropaic",
    "Range":" 10 Meters",
    "Requirements":" Words of Power",
    "Duration" :" 1 Minute",
    "Concentration" : " Yes",

    "Description":" The caster creates a protective dome that wards off area of effect and attacks from outside the dome. The caster creates a dome of magical force within range creating up to a 5 meter diameter circle. Any attack or spell made from outside the dome has no effect on creatures inside the dome. Any creature that is inside the dome cannot affect creatures outside the dome with spells or attacks. The dome is only a one way dome only allowing for creatures and objects inside the dome to magically stop the momentum of any nonliving material or magic not worn or carried by a creature that leaves the dome. Objects and creatures are either inside the dome or not. A creature or object that partially leaves the dome is shunted out fully.",

      
  },

     { "Name":"Bind Creature",
     "Casting Time":" 1 Hour",
     "Spell Rank":" Adept",
     "Class":" Arcanomancy",
     "Subtype":" Apotropaic",
     "Range":" 10 Meters",
     "Requirements":" Words of Power",
     "Duration" :" 1 Week",
     "Concentration" : " No",

    "Description":" The caster spends one hour binding an angel, fiend, or spirit to its service. At the end of the hour, the creature must succeed on a Resistance (Mind) check or become dominated by the caster for the duration. On a successful check the creature becomes immune to the spell from the caster permanently. A creature is only able to hold 1 creature bound to its service at a time. If the creature was bound during the casting of this spell and succeeds on its check unless from a mythic, or relic item the creature is freed. If the creature was bound by magic that is a lower tier than the most powerful spell of the bound creature it is also broken.",
       
    },


{  "Name":"Angel's Grace",
   "Casting Time":"Reaction",
   "Spell Rank":" Major",
   "Class":" Heavenly",
   "Subtype":" Protection",
   "Range":" 5 meters",
   "Requirements":"  Words of Power, Sigils",
   "Duration" :" Instant",
   "Concentration" : " No",

  "Description":" The caster summons a guardian angel to protect a target it can see from a harmful Resistance (Mind) or Demonology effect. The angel interferes with the effect by altering the spell to benefit the target. The target may add +10 to the resistance check made to avoid or end the effect.",
      
  },

   { "Name":"Halo's Eminence",
   "AP Cost":"4",
   "Spell Rank":"Grand",
   "Class":"Heavenly",
   "Subtype":"Retribution",
   "Range":"Self",
   "Requirements":"Sigil, Words of Power",
   "Duration" :"1 minute",
   "Concentration" : "No",

  "Description":" Speaking the words of heavens, the caster gains aspects of the heavens based on their alignment. <br><br>Good<br> The caster grows a pair of heavenly white wings and adorns a celestial halo that strikes onlookers with awe. Charisma-based checks with good-aligned creatures gain a +20 bonus. Any evil creature within 20 meters of the caster that has no magical armor must succeed on a Resistance (Mind) check or become Hopeless against its Divine Light. A creature repeats this save at the start of each turn it takes until the spell ends. Additionally, the casted is granted a flight speed equal to double its base speed. <br><br> Evil<br> The caster grows a pair of decrepit raven black wings and adorn a cracked red halo that strikes onlookers with terror. Charisma based checks with evil aligned creatures gain a +20 bonus. Any non-evil creature within 20 meters of the caster that has no magical armor must succeed on a Resistance (Mind) check or become Hopeless against its Unholy Light. A creature repeats this save at the start of each turn it takes until the spell ends. Additionally, the casted is granted a flight speed equal to double its base speed",


  },

   { "Name":"Celestial Shroud",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Heavenly",
  "Subtype":" Protection",
  "Range":" 20 meters",
  "Requirements":"  Words of Power, Sigils",
  "Duration" :" 10 Minute",
  "Concentration" : " Yes",
    
  "Description":" The caster targets one creature encasing them in divine light. The creature gains a +1 bonus on physical and mind resistance checks.",
   
   
   },

   { "Name":"Celestial Tongue",
   "AP Cost":" 2",
   "Spell Rank":" Major",
   "Class":" Heavenly",
   "Subtype":" Guidance",
   "Range":" Self",
   "Requirements":" Sigils",
   "Duration" :" 1 Hour",
   "Concentration" : " No",

  "Description":" The caster's voice booms in all languages at once guided by the heavens. All creatures that hear the caster speak hear the language they are most fluent in allowing all creatures to understand its speech even if it doesn't understand any language.",


  },

   { "Name":"Resurrection",
  "AP Cost":" 1",
  "Spell Rank":" Major",
  "Class":" Heavenly",
  "Subtype":" Mercy",
  "Range":" Touch",
  "Requirements":" Sigils, Words of Power, Herbs worth 10,000 Gold",
  "Duration" :" Instant",
  "Concentration" : " No",

  "Description":" The caster touches a creature that has been dead for no longer than a year. Contacting the soul of the dead creature in its afterlife it is offered a path back to its body. If accepted the creature returns to life rolling 5 of its health die adding is fortitude score Health. This spell fails on a creature with a body that cannot survive or who's soul is trapped or destroyed. This spell cannot be upcast",


  },

   { "Name":"Pillars of Ruin",
  "AP Cost":" 4",
  "Spell Rank":" Grand",
  "Class":" Heavenly",
  "Subtype":" Retribution",
  "Range":" 1 Kilometer",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",

  "Description":" The caster speaks a holy word chanting for the destruction of 4 areas of its choice it can see within range of itself. A beam of light parts the sky causing all within a 4 meter square to be smitten by the heavens. Any creature within the area must succeed a Resistance (Body) or take 15d12 holy damage. Evil aligned creatures instead take 20d12. On a failure a creature with no magical armor is blinded. A creature struck by multiple pillars is only affected by one. A creature reduced to 0 hit points is slain and is reduced to a shadow in place of where they previously stood.",


  },

 { "Name":"Rejuvenating Light",
"AP Cost":" 3",
"Spell Rank":" Minor",
"Class":" Heavenly",
"Subtype":" Healing",
"Range":" 15 meters",
"Requirements":"  Words of Power",
"Duration" :" Instant",
"Concentration" : " No",
  
"Description":" Speaking the words of heaven the caster restores 1d4+casting modifier health to the target creature of their choice within range.",
 
},

 { "Name":"Celestial Understanding",
"AP Cost":" 2",
"Spell Rank":" Major",
"Class":" Heavenly",
"Subtype":" Guidance",
"Range":" Self",
"Requirements":" Sigils",
"Duration" :" 1 Hour",
"Concentration" : " No",

"Description":" The caster is guided by the heavens allowing the caster to understand all speech.",


},

 { "Name":"Celestial Linguistics",
"AP Cost":" 2",
"Spell Rank":" Major",
"Class":" Heavenly",
"Subtype":" Guidance",
"Range":" 10 meters",
"Requirements":" Sigils",
"Duration" :" 1 Hour",
"Concentration" : " No",

"Description":" This spell functions as Celestial Understanding and Celestial Tongue",
    
},

 { "Name":" Blood to Ichor",
"AP Cost":" 3",
"Spell Rank":" Adept",
"Class":" Heavenly",
"Subtype":" Protection",
"Range":" Touch",
"Requirements":" Words of Power, Sigils",
"Duration" :" 10 minutes",
"Concentration" : " Yes",

"Description":" The caster turns a creature's blood into Ichor, blessing it with the magic that protects its angels from harmful effects. The creature gains +10 Unholy resistance and immunity to holy damage.",
   
},

 { "Name":"Purge",
"AP Cost":" 4",
"Spell Rank":" Adept",
"Class":" Heavenly",
"Subtype":" Retribution",
"Range":" Touch",
"Requirements":" Sigils, Words of Power",
"Duration" :" Instant",
"Concentration" : " No",

"Description":" The caster targets a creature, object, or spell effect it can see. The purge spell can create one of the following effects.<br><br> Burden of Sins<br> If the target is a creature and is evil-aligned it must succeed on a Resistance (Mind) check or become paralyzed for 1 minute. <br><br> Exorcise<br> The caster forces a creature causing the Possessed condition to succeed a Resistance (Mind) check or be forcefully removed from the creature they inhabit. <br><br> Destroy Magic <br> The caster targets an ongoing magical effect. If the target is an item that is not an artifact or relic any effect it produces ends. If it is a spell that is the same level or lower than the purge the spell ends.",
   

},

 { "Name":"Shield of Light",
"AP Cost":" 3",
"Spell Rank":" Adept",
"Class":" Heavenly",
"Subtype":" Protection",
"Range":" 5 Meters",
"Requirements":" Words of Power",
"Duration" :" 10 Minutes",
"Concentration" : " Yes",

"Description":" The caster chooses up to 5 creatures bathing them in the light of heaven. Each creature may add 1d4 to any Resistance (Body), Resistance (Mind) or Evasion check. In addition to this the creature becomes immune to the Fearful or Hopeless conditions",

},

 { "Name":"Void Calling",
"AP Cost":" 3",
"Spell Rank":" Minor",
"Class":" Otherworldly",
"Subtype":" Chaos",
"Range":" 20 Meters",
"Requirements":" Words of Power",
"Duration" :" 10 Minutes",
"Concentration" : " No",
  
"Description":" The caster calls upon the void to emulsify a target morphing its structure randomly for the duration of the spell. If the target is a creature it must succeed on a Resistance (Body) check or roll on the percentile die. <br><br> Creature <br>1-45 The creature becomes partially liquidated making them take on the form of a gelatinous body. The creature can fit through any gap that is 1 centimeter or larger and gains resistance 10 to physical damage. <br>46-60 The creatures bones, organs, and muscles merge making the creature immune to critical and decisive strikes. <br>61-100 The creatures body rejects the emulsification process causing them a great deal of pain. The creature loses 2 maximum AP, and its speed is halved. <br><br> Object 1-50 The object turns into a liquid for the duration. Its temperature, durability, and weight do not change but act as if they were liquid water. <br> 75-90 The object remains unaffected by the spell. <br> 91-100 The object rejects the emulsification process and instead of liquefying the object is permanently immune to the spell.",
},

 { "Name":"Key of the Mind",
"AP Cost":" 3",
"Spell Rank":" Minor",
"Class":" Otherworldly",
"Subtype":" Entropy",
"Range":" 30 Meters",
"Requirements":" Words of Power",
"Duration" :" 8 Hours",
"Concentration" : " No",

"Description":" The caster chants a ritual calling upon the void to bestow them with eldritch sight. An extra eye appears along the casters forehead as they gain supernatural vision until the end of the spell. <br><br>Supernatural Vision <br> The caster can see through true darkness and can identify shape changers although they cannot see their true form the creature appears twisted and unnatural when seen.",
},

 { "Name":"Mirage",
"AP Cost":" 3",
"Spell Rank":" Major",
"Class":" Otherworldly",
"Subtype":" Illusion",
"Range":" 1 Kilometer",
"Requirements":" Words of Power, Sigils",
"Duration" :" 1 Week",
"Concentration" : " No",

"Description":" The caster creates illusionary terrain that alters the appearance, sound and smell and all other senses of all in the environment in the area of 1 kilometer. The caster can make a desert appear as a lush forest or grasslands appear as rocky terrain or make a river cut into a lake in the desert. Alternatively, the caster can make the area appear alien and devoid of logic. Any creature that enters the area must succeed on a survival check or become lost in the area as they are magically looped in circles making escape impossible. The creature may repeat this check once per day on a successful check the creature and any creature that follows it are able to successfully leave the area.",
},

 { "Name":"Rend Reality",
"AP Cost":" 4",
"Spell Rank":" Grand",
"Class":" Otherworldly",
"Subtype":" Chaos",
"Range":" 10 Kilometers",
"Requirements":" Words of Power",
"Duration" :" 1 Hour",
"Concentration" : " No",

"Description":" The caster harnesses the power of the void partially manifesting it into reality. All creatures that are not outsiders besides the caster within range must make a Resistance (Mind) check. On a failure the creature takes 30d10 magic damage becomes cursed and silenced as the area becomes part of the empty. On a successful save the creature takes half as much damage and suffers no additional effects.",
},

 { "Name":"Gates of The Abyss",
"AP Cost":" 4",
"Spell Rank":" Major",
"Class":" Otherworldly",
"Subtype":" Entropy",
"Range":" 30 Meters",
"Requirements":" Words of Power",
"Duration" :" Instant",
"Concentration" : " No",

"Description":" The caster summons 3 portals that are 2 meters wide and 10 meters long rifts at points of their choosing. From the portal a bright light appears before sucking in a creature's life force. Each creature within the area of this effect must make a Resistance (Body) check or take 10d10 magic damage.",
},

{ "Name":"Anagisa",
"AP Cost":" 6",
"Spell Rank":" Grand",
"Class":" Otherworldly",
"Subtype":" Entropy",
"Range":" 10 Kilometers",
"Requirements":" Words of Power",
"Duration" :" Instant",
"Concentration" : " No",

"Description":" A direct translation for 'The End' from empatic the caster attempts to tear a hole in creation allowing The Arbiters of the empty to gaze into creation in a 5 meter radius cylinder. Any creature within the radius without magical armor must succeed on a Resistance (Mind) check or be erased. Any objects inside the radius such as doors, dirt, stone are removed creating a 100 meter deep hole in the ground any creature that remained in the circle falls into. A creature that is erased cannot be restored.",
},

 { "Name":"False Eyes",
"AP Cost":" 4",
"Spell Rank":" Minor",
"Class":" Otherworldly",
"Subtype":" Illusion",
"Range":" 25 Meters",
"Requirements":" Words of Power",
"Duration" :" 1 Hour",
"Concentration" : " No",

"Description":" The caster targets a creature it can see within range tempting a creature towards insanity. If the creature has no magical armor, it must roll a Resistance (Mind) check. On a failure, the creature becomes fearful as it begins to hallucinate eyes from walls, creatures, and other things in its general surroundings are watching it.",

},

 { "Name":"Leeching Grasp",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Otherworldly",
 "Subtype":" Entropy",
 "Range":" 10 Meters",
 "Requirements":" Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

 "Description":" One of the casters' appendages briefly turns into a spectral festering mass of flesh that strikes an opponent in range. The caster must make a spell attack roll. If the attack hits the target, the creature takes 2d6 poison plus 1d6 magic damage. The caster is healed for the amount of magic damage dealt to the creature. If the creature has no magical armor, it must make a Resistance (Body) check. On a failure the creature becomes cursed.",
 

},



 { "Name":"False Mana",
 "AP Cost":" 1",
 "Spell Rank":" Minor",
 "Class":" Otherworldly",
 "Subtype":" Illusion",
 "Range":" Self",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 8 Hours",
 "Concentration" : " No",
  
 "Description":" The caster creates an aura of false mana presenting themselves as a caster of a tier higher than what they are capable of casting. Casters who can cast minor spells appear as Adept, appear as major, major appear as grand, and grand appear as divine for the purpose of identification. While the spell is active if the caster runs out of mana, the caster may substitute their health for mana when casting spells. If a spell would reduce the caster to 0 health, it fails to cast."   ,
 

},

 { "Name":" Whispering Madness",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Otherworldly",
 "Subtype":" Illusion",
 "Range":" 15 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

 "Description":" The caster chants a phrase inaudible to the target of the spell. The target must succeed on a Resistance (Mind) check or take 4d6 psychic damage and become blind. On a successful save the target takes half as much damage and suffers no additional effects.",
   

},

 { "Name":"Duplicate",
"AP Cost":" 2",
"Spell Rank":" Minor",
"Class":" Otherworldly",
"Subtype":" Illusion",
"Range":" Touch",
"Requirements":" Sigils",
"Duration" :" 1 Hour",
"Concentration" : " Yes",

"Description":" The caster touches a creature or object creating a duplicate of it. The duplicate has no mass and physical interaction such as touching the duplicate is impossible. From a glance, the object is indistinguishable from the original. To see the duplicate is an illusion a creature may roll an Inspect Object. On a successful check, the creature determines the object is illusionary. The caster can move the illusion in any way even in ways that such ways that original cannot. Physical interaction with the object automatically reveals its illusionary state such as if a creature were to pick it up or common deduction can be used to identify it is fake such as a weight on a scale having no effect on its balance. Although the object can be determined fake by physical interaction objects like flames and ice still give off a slight heat or a chill.",

},

 { "Name":"False Fortitude",
 "AP Cost":" 1",
 "Spell Rank":" Minor",
 "Class":" Otherworldly",
 "Subtype":" Illusion",
 "Range":" Self",
 "Requirements":" Sigils",
 "Duration" :" 8 Hours",
 "Concentration" : " No",
  
 "Description":" The caster invigorates themselves with an aura of false fortitude appearing as an extremely durable and healthy creature. When the caster is reduced to 0 health, they instead remain at 1 health. Any damage that would have reduced them below that 1 health is instead drained from their mana." ,
 

},

 { "Name":"Plant Growth",
 "Casting Time":" 1 Minute",
 "Spell Rank":" Minor",
 "Class":" Nature",
 "Subtype":" Nurture",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

 "Description":" The caster touches soil enriching it with nutrients allowing for plants to flourish. In a 100 Meter radius the soil is now enriched. Plants in the area are enriched allowing them to grow. All poisonous plants in the area become safe for consumption for all creatures.",


 },

 { "Name":"Binding Vine",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Nature",
 "Subtype":" Primal",
 "Range":" 20 Meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster targets an area within range causing vines to burst from the ground in a 10-meter radius sphere. Each creature within the range of the spell must succeed on an Evasion check or become Pinned.",


},

 { "Name":"The Hunt",
 "AP Cost":" 4",
 "Spell Rank":" Major",
 "Class":" Nature",
 "Subtype":" Primal",
 "Range":" Self",
 "Requirements":" Sigils",
 "Duration" :" 10 Minutes",
 "Concentration" : " Yes",

 "Description":" The caster becomes the embodiment of a predator. Until the spell ends, they gain an additional 2 movement, and their teeth and nails elongate into weapons that deal 5d6 physical damage. A thick hide forms over them granting 10d10 physical armor and 10d10 magical armor.",


 },

 

 { "Name":"Poison Splash",
 "AP Cost":" 2",
 "Spell Rank":" Minor",
 "Class":" Nature",
 "Subtype":" Primal",
 "Range":" 5 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

 "Description":" The caster spits coagulated venom at a target within range. The caster makes a spell attack. On a hit, the creature takes 2d6+Casting modifier Poison damage.",


   },

 { "Name":"Healing Touch",
 "Casting Time":" 10 Minutes",
 "Spell Rank":" Adept",
 "Class":" Nature",
 "Subtype":" Protection",
 "Range":" Touch",
 "Requirements":" Sigils, Herbs worth 50 GP",
 "Duration" :" 10 Minutes",
 "Concentration" : " No",

"Description":" The caster mixes together a healing paste of herbs. The paste lasts for 24 hours, and each casting of the spell creates enough of a dosage to treat 10 Tiny creatures, 5 Small creatures, 2 Medium Creatures or 1 Giant or larger creature. Applying the Paste takes 1 minute. After the application, the creature regenerates 1d4 health at the start of each of its turns.",


},

 { "Name":"Cloud Scribe",
 "AP Cost":" 2",
 "Spell Rank":" Major",
 "Class":" Nature",
 "Subtype":" Nurture",
 "Range":" Sight",
 "Requirements":" Sigils",
 "Duration" :" 1 Hour",
 "Concentration" : " No",

"Description":" The caster morphs the clouds allowing for them to become words or art. The caster may write a message in the clouds or create a sign or sigil in them that can be seen by any creature able to view them.",
   

},



 { "Name":"Poison Cloud",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Nature",
 "Subtype":" Primal",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster creates a cloud of poison that damages creatures within its radius. Each creature that starts, enters, and ends its turn in the cloud must make a Resistance (Body) check. On a failure the creature takes 8d6 poison damage and if the creature has no magic armor becomes poisoned. On a success, the creature takes half as much damage and suffers no additional effects.",


},

 { "Name":"Rebirth",
 "Casting Time":" 1 Hour",
 "Spell Rank":" Major",
 "Class":" Nature",
 "Subtype":" Protection",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster touches a creature giving its body to nature and allowing its soul to be reborn anew. If the soul is willing it is placed into a pregnant creature of the same species with a developing baby within 100 kilometers. The creature is reborn as the baby forgetting its past life but is given a second chance at a new one.",
   
},


 { "Name":"Envelop",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Nature",
 "Subtype":" Primal",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

 "Description":" The caster envelops one creature within range in a swarm of insects. At the start of each of the creature's turns it must succeed on a Resistance (Body) check or take 5d6 physical damage and 2d6 poison damage or half as much on a success. If the creature takes fire, is teleported, or spends 2 AP the creature removes the swarm of insects from itself. After its removal, the swarm disperses.",
   

},



 { "Name":" Slow",
  "AP Cost":" 3",
  "Spell Rank":" Minor",
  "Class":" Chronomancy",
  "Subtype":" Time",
  "Range":" 10 Meters",
  "Requirements":" Words of Power, An Hourglass worth 100 GP",
  "Duration" :" 1 Minute",
  "Concentration" : " Yes",

 "Description":" The caster distorts time on a target within range. If the creature has no magical armor must succeed on a Resistance (Body) check or become slowed.",
 
 },

 { "Name":" Void Swap",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Chronomancy",
 "Subtype":" Space",
 "Range":" 20 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

 "Description":" The caster chooses two creatures within range and swaps their places.",


},

 { "Name":" Deja Vu",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Chronomancy",
 "Subtype":" Time",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Round",
 "Concentration" : " No",

"Description":" The caster momentarily sees into the future. Until the start of their next turn the caster gains advantage on all attack rolls and ability checks.",


},

 { "Name":"Foresight",
 "Casting Time":" 1 Minute",
 "Spell Rank":" Grand",
 "Class":" Chronomancy",
 "Subtype":" Time",
 "Range":" Touch",
 "Requirements":" Words of Power, Hourglass worth 3000 GP consumed on casting",
 "Duration" :" 24 Hours",
 "Concentration" : " No",

"Description":" This spell functions as déjà vu but instead lasts for 24 hours and the caster gains 10 bonus on Resistance (Body) checks.",


  },

{ "Name":"Speed",
  "AP Cost":" 4",
  "Spell Rank":" Minor",
  "Class":" Chronomancy",
  "Subtype":" Time",
  "Range":" 10",
  "Requirements":" Words of Power, Hourglass worth at least 100 GP",
  "Duration" :" 1 Minute",
  "Concentration" : " Yes",
  
"Description":" The caster accelerates time on a creature within range causing the creature to become hasted.",
},

 { "Name":"Reciprocating Dimensions",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Chronomancy",
 "Subtype":" Dimension",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
"Concentration" : " No",
"Description":" The caster swaps between the border world and back the mortal plane. At the start of the caster's turns they roll a percentile die and on rolling their casting modifier or lower they phase to the border world or back to the mortal plane. At the end of the spell's duration the caster remains on whichever plane they are currently on.",

 },



 { "Name":"Rewind Creature",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Chronomancy",
 "Subtype":" Time",
 "Range":" 20 Meters",
 "Requirements":" Words of Power",
 "Duration":" Instant",
 "Concentration" : " No",
"Description":" The caster rewinds time on a creature. Any creature that has spent mana, stamina or taken damage in its last turn has it reset to before they took their turn. A creature with any effects or spells on it also has them reset and continues to have them on their turn. If the creature is unwilling to receive this spell it must succeed on a Resistance (Mind) check. Casting Rewind Time costs an additional 25 Mana.",


 },

 { "Name":"Continuity Error",
  "AP Cost":" 3",
  "Spell Rank":" Minor",
  "Class":" Chronomancy",
  "Subtype":" Time",
  "Range":" 15 Meters",
  "Requirements":" Words of Power, A Silver Mirror worth 50 GP",
  "Duration" :"1 Round",
  "Concentration" : " No",
  
"Description":" The caster shows the targeted creature a vision of the future that is slightly incorrect. At any point in the target’s turn, the caster can reposition them 1 meter to reflect their reaction to the false insight. The target may react after the repositioning has occurred. This might make an action the creature was about to take invalid, such as repositioning them when they are about to make an attack, in which case the action points are wasted. You cannot reposition the creature into a square that they could not occupy or where there is no ground (such as over a cliff, into a river, or a flow of lava). Repositions using this spell do not provoke opportunity attacks.",
 

},

 { "Name":"Omnipresence",
 "Casting Time":" 24 Hours",
 "Spell Rank":" Grand",
 "Class":" Chronomancy",
 "Subtype":" Dimensions",
 "Range":" Unlimited",
 "Requirements":" Sigils, Words of Power, Incense worth 1000 GP, Soul Gems worth 100,000 GP per duplicate",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster creates a translucent 100 meter cube centered at a point they choose. Any creature that attempts to teleport or cross planar boundaries from an Adept spell or advanced maneuvers or lower fails. Features from a Class or monster ability that is not either of those must roll a contested check the caster using their primary stat of their spell casting and the target's primary stat for the granted feature. For example, a slayer Hunter using Rapid Movement to escape would roll Wits against the casting modifier. When upcast to major blocks major spells and expert maneuvers and when upcast to grand blocks grand spells and master maneuvers.",


 },



 { "Name":"Dimensional Lock",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Chronomancy",
 "Subtype":" Dimensions",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster creates a translucent 100 meter cube centered at a point they choose. Any creature that attempts to teleport or cross planar boundaries from an Adept spell or advanced maneuvers or lower fails. Features from a Class or monster ability that is not either of those must roll a contested check the caster using their primary stat of their spell casting and the target's primary stat for the granted feature. For example, a slayer Hunter using Rapid Movement to escape would roll Wits against the casting modifier. When upcast to major blocks major spells and expert maneuvers and when upcast to grand blocks grand spells and master maneuvers.",


 },

 { "Name":"Omnipresence",
 "Casting Time":" 24 Hours",
 "Spell Rank":" Grand",
 "Class":" Chronomancy",
 "Subtype":" Dimensions",
 "Range":" Unlimited",
 "Requirements":" Sigils, Words of Power, Incense worth 1000 GP, Soul Gems worth 100,000 GP per duplicate",
 "Duration" :" 1 Year",
 "Concentration" : " No",


"Description":" Often used by archmagi to maintain a tower while in a council with the royal court. The caster creates 1d4+1 duplicates of themselves anywhere in the world they are aware of acting as if they were in the area of all the places at once. The caster acts as themselves through these duplicates. The caster can choose to cast spells through the duplicates and all duplicates share the caster's health and armor pools, mana, and Stamina.",


},

 { "Name":"Greater Planar Rift",
 "AP Cost":" 3",
 "Spell Rank":" Major",
 "Class":" Chronomancy",
 "Subtype":" Dimension",
 "Range":" 10 Meters",
 "Requirements":" Words of Power, Material listed below worth 10,000 GP",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" This spell functions as Planar rift and Teleport"
 },


 { "Name":"Tether",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Demonology",
 "Subtype":" Torment",
 "Range":" 10",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 minute",
 "Concentration" : " Yes",

"Description":" The caster links one target to itself. If the creature has no physical armor, it must succeed on a Resistance (Body) check or have its body tethered to the caster. While tethered if the target receives healing or receives armor it instead applies to the caster. The creature can repeat its check at the end of each turn.  This spell cannot be upcast.",
 },

 { "Name":"Enthralling Invitation",
 "AP Cost":" 2",
 "Spell Rank":" Major",
 "Class":" Demonology",
 "Subtype":" Possession",
 "Range":" 5 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

"Description":" Sacrificing 40 health the caster performs a forbidden chant allowing a fiend to possess a creature within range granting it the strength of a fiend. While possessed the fiend grants a +10 to a statistic of the caster's choice and the creature counts as evil against spells and unholy damage.",


 },

 { "Name":"Cackling End",
 "AP Cost":" 0",
 "Spell Rank":" Grand",
 "Class":" Demonology",
 "Subtype":" Curse",
 "Range":" 10 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",
  
"Description":" The caster summons the echo of Misery in front of its intended target. If the target has no magical armor, horrors of the underworld flood the mind of the target. The target of the spell becomes cursed and must succeed on a Resistance (Mind) check. If the victim fails, the target is then haunted by the demon. While haunted the target suffers a -30 penalty to its Charisma, Wits, and Intelligence. The target madly cackles speaking incoherent babbling as instead of speaking leaving it incapable of performing words of power or forming a coherent sentence. The target may repeat its saving throw if it is affected by a Grand Purge or any other effect that performs an exorcism.",


 },

{ "Name":"Curse",
  "AP Cost":" 1",
  "Spell Rank":" Minor",
  "Class":" Demonology",
  "Subtype":" Curse",
  "Range":" 10 meters",
  "Requirements":" Words of Power, Sigils",
  "Duration" :" 1 Minute",
  "Concentration" : " No",
  
"Description":"  The caster targets a creature within 10 meters of itself. A creature with no magical armor must succeed on a Resistance (Mental) check or become Cursed for the duration of the spell. This spell cannot be upcast.",

},

{ "Name":"Visions of the Mire",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Demonology",
 "Subtype":" Torment",
 "Range":" 10 Meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

"Description":" The caster targets one creature it can see within range of itself. If the target has no magical armor, it must succeed a Resistance (Mind) check. On a failure the target becomes Blind. While blind it becomes entrapped in a vision where its sight is blocked by a black inky substance only it can see. All noises are drowned out by the screaming of tormented souls of the underworld causing the creature to be Deaf. A creature may repeat the check at the end of each of its turns.",
},

 { "Name":"Beautiful World",
 "AP Cost":" 2",
 "Spell Rank":" Major",
 "Class":" Demonology",
 "Subtype":" Damnation",
 "Range":" 20 meters",
 "Requirements":" Words of Power, Sigils, Painting worth 1000 GP which the spell consumes",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",


"Description":" The caster molds a painting in which a beautiful creature, object or world of desire appears to the target in the painting who invites them to the world in their image. If the target has no magical armor, it must succeed on a Resistance (Mind) check or approach the painting of interest. If the creature gets within 1 meter of the painting before the end of the spell's duration, burning hands pull the creature inside the painting ending the spell. The target is sent into a magical world they perceive as a perfect world. The creature is trapped inside the painting until freed by a purge spell or similar magic. Until freed the target is stuck in the image as they appear in the image alongside a dark entity. This spell has no effect on creatures immune to charm effects or fiends. If the painting is destroyed it reforms 24 hours later in the closest open space that would not destroy the painting.",
  

 },

{ "Name":"Enhance Body",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Enchantment",
  "Subtype":" Enhancement",
  "Range":" 30 meters",
  "Requirements":" Words of Power, Sigils, Elephant Fat",
  "Duration": "10 Minutes",
  "Concentration" : " No",
  
"Description":" The caster bestows a target with enchanting magic that allows a creature to surpass its limits. The caster targets a creature within range granting it a +1 to strength, finesse, or fortitude. When upcast to Adept the creature gains a +2 to the chosen statistic. When upcast to Major the creature gains a +4 to the chosen statistic. When upcast to Grand the creature gains a +8 to the chosen statistic.",
},

{ "Name":"Cloud Mind",
 "AP Cost":" 3",
 "Spell Rank":" Adept",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 10 Meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster targets an area they can see within range, The caster creates a transparent pink fog 5 meter radius cloud that alters the minds of creatures inside the sphere. Any creature inside the sphere must succeed on a Resistance (Mind) check or take 4d6 psychic damage or half as much on a success. A creature that failed its save that has no magic armor while inside the fog, it is incapable of concentrating while inside the cloud.",
},

{ "Name":"Alter Memories",
 "AP Cost":" 6",
 "Spell Rank":" Major",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 1 Meter",
 "Requirements":" Verbal, Words of Power, an object connected to the creature.",
 "Duration" :" 30 days",
 "Concentration" : " No",

"Description":" The caster targets an unconscious creature within range. The creature must succeed on a Resistance (Mind) check or become charmed. While charmed the caster whispers the memory they wish to change and what they wish to change it to. On a failure the creature's memory is altered to believe the implanted memories. <br><br> The spell automatically fails if the implanted memories would directly cause future self-harm. Memories of actions being performed in the past of such nature can still be implanted.",
},

{ "Name":"Devourer of Hope",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 60 Meters",
 "Requirements":" Words of Power, Sigils, An Obsidian Skull worth at least 3000 Gold consumed upon casting",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster targets a number of creatures equal to their casting modifier. All targets within range take 15d12 psychic damage and must succeed on a Resistance (Mind) Check. On a success the creature suffers no further effects. On a failure the creature becomes Hopeless. If the creature is already Fearful or Hopeless and has no magical armor, it is instead instantly slain.",
},

{ "Name":"Reframe Perspective",
  "AP Cost":" 3",
  "Spell Rank":" Minor",
  "Class":" Enchantment",
  "Subtype":" Charm",
  "Range":" 5 meters",
  "Requirements":" Sigils",
  "Duration" :" 10 Minutes",
  "Concentration" : " No",
  
"Description":" The caster targets a creature within range. The creature must succeed on a Resistance (Mind) check or have its attitude towards the caster shifted to the attitude of the caster more negative or positive. If the target is already hostile toward the creature the spell fails to take effect.",
},

{ "Name":"Bravery",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Enchantment",
 "Subtype":" Enhancement",
 "Range":" 10 meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Hour",
 "Concentration" : "Yes",

"Description":" The caster bestows up to 3 creatures in range with bravery causing them to become Motivated.",
},

 { "Name":"Confession",
 "AP Cost":" 4",
 "Spell Rank":" Major",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 5 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",

"Description":" The caster targets a creature compelling it to tell what it believes to be the truth. The creature must succeed on a Resistance (Mind) check or be forced to answer 3 questions truthfully. Until the creature answers the question it is Silenced. This spell has no effect or is dispelled on a creature under the effects of a Free Speech and can be removed by a Purge spell.",
},

 { "Name":" Enslave",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 10 meters",
 "Requirements":" Words of Power, Golden Chain worth 1000 Gold per hit die of the target consumed upon casting",
 "Duration" :" Until Dispelled",
 "Concentration" : " No",

"Description":" The caster targets one creature within range presenting the golden chain. The target must succeed on a Resistance (Mind) check or become Charmed by the caster. While charmed they are dominated until cured by a Purge or magic of similar effect.",


 },

{ "Name":"Calm",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Enchantment",
  "Subtype":" Charm",
  "Range":" 10 Meters",
  "Requirements":" Words of Power, Sigils",
  "Duration" :" 10 Minutes",
  "Concentration" : " Yes",
  
"Description":"  The caster targets one creature it can see within range. The creature must succeed on a resistance (Mind) check or become calm. A creature while calm cannot be affected by the Fearful, Hopeless, Inspired, or Motivated conditions.",
 
},

{ "Name":"Cowardice",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Enchantment",
 "Subtype":" Enhancement",
 "Range":" 10 meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Hour",
 "Concentration" : " Yes",

"Description":" The caster imbeds doubt up to 3 creatures of its choice in range. A targeted creature must succeed on a Resistance (Mind) check or become Fearful.",


},

{ "Name":"Heighten Mind",
 "AP Cost":" 2",
 "Spell Rank":" Minor",
 "Class":" Enchantment",
 "Subtype":" Enhancement",
 "Range":" 30 meters",
 "Requirements":" Words of Power, Sigils, Owl Feather",
 "Duration":" 10 Minutes",
 "Concentration" : " No",

"Description":" The caster bestows a target with enchanting magic that allows a creature to surpass its limits. The caster targets a creature within range granting it a +1 to intelligence, wits, or charisma.",
  
},

{ "Name":"Ignore",
 "AP Cost":" 3",
 "Spell Rank":" Adept",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 5 Meters",
 "Requirements":" Sigils",
 "Duration" :" 1 Hour",
 "Concentration" : " No",


"Description":" The caster targets a large group of creatures such as commoners, a herd of farm animals or any other target the GM deems susceptible as a target for the spell. More powerful individuals or those immune to charm remain unaffected by the spell. While the spell is active the crowd becomes unaware of the caster and up to 6 other creatures they designate within range for the duration. While walking through the crowd creatures will rationalize any interaction with creatures protected by the spell. For example, if a creature is bumped into by a protected creature, the person they came into contact with will conclude others in the area interacting with them bumped into them.",
},

{ "Name":"Euphoria",
 "AP Cost":" 3",
 "Spell Rank":" Minor",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" 25 Meters",
 "Requirements":" Sigils",
 "Duration" :" 10 Minutes",
 "Concentration" : " No",

"Description":" The caster targets a creature within range attempting to overwhelm it with pleasure. The target creature must succeed on a Resistance (Mind) check or become stunned for the duration of the spell. The target may repeat its check at the end of each of its turns.",
},

{ "Name":"Mental Acrobatics",
 "Casting Time":" 1 Minute",
 "Spell Rank":" Minor",
 "Class":" Enchantment",
 "Subtype":" Charm",
 "Range":" Touch",
 "Requirements":" Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster attempts to charm a creature into believing something they otherwise wouldn’t. After 1 minute of conversation the target must succeed on a Resistance (Mind) check or rationalize a simple idea such as convicting a target 1+1=3.",
},

{ "Name":"False Life",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Necromancy",
  "Subtype":" Puppetry",
  "Range":" Self",
  "Requirements":" Words of Power",
  "Duration" :" 1 Hour",
  "Concentration" : " No",
  
"Description":"  The caster coats themselves in vitality allowing them to take more damage. This spell increases and adds to the caster's Physical and Magical armor by 5. Additionally, If the caster is undead, they gain temporary flesh allowing them to appear alive. This skin is purely cosmetic and does not affect any spells, magic items, or other effects used on the caster.",
},

 

{ "Name":"Leech Positive Energy",
 "AP Cost":" 1",
 "Spell Rank":" Major",
 "Class":" Necromancy",
 "Subtype":" Tether",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster attempts to siphon the positive energy fueling the spells of life given to a target within range. If the target has no magical armor, it must succeed on a Resistance (Body) check. On a failure the target has its soul tethered to the caster's body. The target receives half of any healing it receives while the other half instead is sent to the caster.",


},

{ "Name":"Touch of Death",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Necromancy",
 "Subtype":" Death",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster targets a creature that is not undead or an outsider attempting to kill it. If the creature touched has no physical armor, it must make a Resistance (Body) check. If the creature fails it is instantly slain. On a successful save the creature takes 15d6 Physical damage.",


},

{ "Name":"Grasp of The Grave",
  "AP Cost":" 3",
  "Spell Rank":" Minor",
  "Class":" Necromancy",
  "Subtype":" Decay",
  "Range":" Touch",
  "Requirements":" Sigils, Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
  
"Description":" The caster touches a creature filling them with negative energy. The creature must succeed on a Resistance (Body) check or take 2d6+Casting Modifier Physical damage.",
  

},

{ "Name":"Armor of Bones",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Necromancy",
 "Subtype":" Tether",
 "Range":" 20 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

"Description":" The caster creates armor from corpses from around them coating them in the bones of the dead.. The caster gains physical armor equal to their casting modifier for each creature killed within the hour within range. Any armor gained from this spell disappears after the duration ends. Armor gained from armor of bones can go over the targets maximum. This spell cannot be upcast.",


},

{ "Name":"Shroud of Ghosts",
 "AP Cost":" 3",
 "Spell Rank":" Major",
 "Class":" Necromancy",
 "Subtype":" Puppetry",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster creates a shroud of ghosts that surround them protecting the caster from harmful effects. While shrouded in the dead the caster is treated as always having magical armor for effects. The ghosts are otherwise harmless.",


},

{ "Name":"Funeral Rites",
  "AP Cost":" 6",
  "Spell Rank":" Minor",
  "Class":" Necromancy",
  "Subtype":" Death",
  "Range":" Touch",
  "Requirements":" Words of Power, Incense, Sigils",
  "Duration" :" Permanent",
  "Concentration" : " No",
  
"Description":"  The caster provides funeral rites for a dead creature marking the creature's body with various sigils and lightning incense. While warded by funeral rites any effect that raises a creature to undead that is cast at a lower tier spell than the funeral rites fail.",


},

{ "Name":"Transfer Vitality",
 "AP Cost":" 1",
 "Spell Rank":" Adept",
 "Class":" Necromancy",
 "Subtype":" Tether",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster transfers vitality from an undead under their control within range to heal a creature. The caster chooses a creature within range sacrificing health from the undead and healing the target of the spell. Any undead targeted by this spell is instantly killed sending half of its current health to the target.",


},

 { "Name":"Gaze of Flesh",
 "Casting Time":" 10 Minutes",
 "Spell Rank":" Minor",
 "Class":" Necromancy",
 "Subtype":" Tether",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Week",
 "Concentration" : " No",


"Description":" The caster casts this spell and within 1 hour after casting has 1 hour to touch a creature marking it for later viewing. Once the caster touches a creature it becomes marked and any creature that inspects the target (Including Itself) may make a DC 20 Medicine check to spot the mark while viewing itself in a matter like a mirror or medical inspection. The creature may attempt to remove the mark by making a DC 15 Knowledge (Arcana). While marked the caster may attempt to scry on the marked target. The target must succeed on a Resistance (Mind) check or the caster is able to perceive the targets environment through its senses. The target is not aware the caster is crying on them. If the target succeeds on its check the mark dissipates and the spell ends.",

 
},

 { "Name":"Transport through Decay",
 "AP Cost":" 1 Minute",
 "Spell Rank":" Adept",
 "Class":" Necromancy",
 "Subtype":" Decay",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster touches remains of any dead creature, mushrooms or other decomposers attached to it. The caster can then transport themselves to any corpse within 1 mile of the casting point.",
   

},

{ "Name":"Dance with Death",
 "Casting Time":" 1 Minute",
 "Spell Rank":" Adept",
 "Class":" Necromancy",
 "Subtype":" Death",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 12 Hours",
 "Concentration" : " No",
"Description":" While active a creature gains a +5 bonus to checks to avoid an effect that would kill them. While active if the target is to receive the dying condition, they can immediately end the spell and remain at 1 health.",
},

{ "Name":"Transmute Material",
 "AP Cost":" 5 AP",
 "Spell Rank":" Minor",
 "Class":" Transmutation",
 "Subtype":" Transformation",
 "Range":" Touch",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Permanent",
 "Concentration" : " No",
"Description":" The caster chooses an object they hold and transmute it to Coal, Wood, Stone, Copper, or Tin."
},

 { "Name":"Harness Water",
 "AP Cost":" 1",
 "Spell Rank":" Adept",
 "Class":" Transmutation",
 "Subtype":" Creation",
 "Range":" 5 Meters",
 "Requirements":" Words of Power, A Pinch of Salt",
 "Duration" :" Permanent",
 "Concentration" : " No",
 "Description":" The caster pulls water from the surrounding area creating liquid water. Water can be pulled from plants and the air creating drinkable water. The spell creates 1 liter of drinking water unless the area is significantly dry or moist it may yield an amount greater or less than that. If used on a creature, this spell deals 4d6 physical damage.",
 },

 { "Name":" Create Material",
 "AP Cost":" 4",
 "Spell Rank":" Major",
 "Class":" Transmutation",
 "Subtype":" Creation",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",
 "Description":" The caster creates non exotic material worth no more than 100 Gold not exceeding a 1x1 meter cube. The material forms in the casters hand. If dangerous material such as Molten rock or a corrosive acid the caster would need adequate protection or suffer damage from the creation of such materials. Anything considered exotic is clarified by the Game Master but usually entails precious metals, gemstones, or rare ingredients.",
 },

 { "Name":"Greater Create Material",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":" Transmutation",
 "Subtype":" Creation",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",

"Description":" This spell functions as Create Material but allows for 500 GP.",
 },

 { "Name":" Conduction",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Transmutation",
  "Subtype":" Creation",
  "Range":" Touch",
  "Requirements":" Words of Power, A piece of wood, coal, or charcoal",
  "Duration" :" 10 Minutes",
  "Concentration" : " No",
  
"Description":" The caster chooses an object within their hand. Uttering words of power they conduct the energy from the material used as a component heating the object. Alternatively, they can use the heat from the object in their hand and transfer it to the component, igniting and burning the component and cooling the object.",
 },

 { "Name":"Condense",
 "AP Cost":" 2 AP",
 "Spell Rank":" Adept",
 "Class":" Transmutation",
 "Subtype":" Transformation",
 "Range":" 10",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster attempts to condense an object or creature. If targeting an object, the object must be no larger than 10 meters or weigh more than 200 kilograms. The target object halves or double in size. This effect does not change the weight or amount of substance present but simply makes it take up more or less space. If the target is a creature, it increases or decreases its size category by one. If the creature condenses it takes 2d6 damage and becomes half its original size. If cast on a creature the spell lasts for 10 minutes. When upcast the caster the fourths at Major or eights the size of an object at Grand. If used on a creature, it decreases the size category of a creature by an additional size for each tier upcast.",
 },

 { "Name":"Polymorph",
 "AP Cost":" 5 AP",
 "Spell Rank":" Major",
 "Class":" Transmutation",
 "Subtype":" Transformation",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster transforms a creature into another harmless creature of its choice. The caster picks a creature within range and attempts to alter its physical form into another creature. If the creature has no Magical Armor, it must succeed on a Resistance (Mind) check or be transformed for 1 minute. While transformed, the creature must spend its AP running away from all hostile creatures. A transformed creature always retains the required anatomy to survive its current environment if it previously had it in its new form. Examples of harmless creatures include but are not limited to rabbits, pigs, chickens, and parrots.",
   
 
},


{ "Name":"Contamination",
  "AP Cost":" 2 AP",
  "Spell Rank":" Minor",
  "Class":" Transmutation",
  "Subtype":" Transformation",
  "Range":" Touch",
  "Requirements":" Words of Power, A vial of poison",
  "Duration" :" Permanent",
  "Concentration" : " No",
  
 "Description":" The caster touches a piece of food or a drink contaminating it with pollutants. The food or drink becomes inedible, spoiling the drink. Any food or drink affected by this spell is clearly unfit for consumption to an observer able to smell or see the food appearing rotten and smelling of vinegar. Any creature that consumes the contaminated food becomes Poisoned for 1 hour.",
 

},

 { "Name":"Crown of Honey",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Transmutation",
 "Subtype":" Creation",
 "Range":" 25 Meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster attempts to blind a creature by conjuring a pool of honey and hurling it in the creature's eyes. The creature must succeed on an Evasion check or become blind while it has the honey on its face. Removing the honey costs 4 AP.",
   

},

 { "Name":" Swarm of Insects",
 "AP Cost":" 6",
 "Spell Rank":" Major",
 "Class":" Transmutation",
 "Subtype":" Creation",
 "Range":" 10 Meters",
 "Requirements":" Sigils",
 "Duration" :" 1 Hour",
 "Concentration" : " Yes",


"Description":" The caster designates a creature or object to become infested with insects. The insects deal 4d10 True damage to the target and the creature must succeed on a Resistance mind check or become fearful. A creature may spend 4 AP and roll a sleight of hand check to remove the swarm infesting them.",
  
  
},

 { "Name":"Warding Wine",
 "AP Cost":" 4",
 "Spell Rank":" Minor",
 "Class":" Transmutation",
 "Subtype":" Transformation",
 "Range":" Touch",
 "Requirements":" Sigils",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster turns a cup of liquid into finely aged wine. If the drink was poisoned or diseased it is removed from the wine.",
  

},

{ "Name":"Greater Transmute Material",
 "AP Cost":" 5",
 "Spell Rank":" Major",
 "Class":" Transmutation",
 "Subtype":" Transformation",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",
 "Description":" This spell functions as Transmute Material but allows for the creation of precious metals and gems such as gold, jade, platinum, diamonds.",
},

{ "Name":"Shape Ice",
  "AP Cost":" 1",
  "Spell Rank":" Minor",
  "Class":" Hydromancy",
  "Subtype":" Ice",
  "Range":" Touch",
  "Requirements":" Words of Power",
  "Duration" :" Permanent",
  "Concentration" : " No",
  "Description":"  The caster chooses ice that weighs no more than 10 kilograms within range, reshaping it to a form they desire. This can change the shape of ice to become a sculpture, geometric shape, become cloudy or clear. This can alter ice in more diverse ways including animating decorations or small sculptures. Ice shows animated in this way last no longer than 1 minute. When upcast to Adept or higher the weight of the allowed ice shape doubles for each tier higher.",
},

{ "Name":"Ice Wall",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Hydromancy",
 "Subtype":" Ice",
 "Range":" 15",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " No",
 "Description":" A solid wall of ice erupts at a point of choosing from the caster within range. The wall can reach up to 10 meters long and 5 meters high. If a creature is caught in the formation of the ice it must succeed on a Resistance (Body) check or take 5d6 cold damage and become frozen inside of the wall. On a successful save the creature takes half as much damage and is not freezing. The wall has 30 health, is immune to cold, poison, and psychic damage and vulnerable to fire damage. Any resistance checks the wall makes uses the spell casting modifier of the caster.",
},

{ "Name":"Armor of Ice",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Hydromancy",
 "Subtype":" Ice",
 "Range":" 10",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",
 "Description":" The caster targets one creature within range restoring magic armor equal to 5d10+ casting modifier to the creature.",
},

 { "Name":"Blizzard",
 "Casting Time":" 1 Minute",
 "Spell Rank":" Grand",
 "Class":" Hydromancy",
 "Subtype":" Ice",
 "Range":" self",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Week",
 "Concentration" : " No",


"Description":" The caster creates a whirling storm for harsh winds and snow that impairs vision and causes creatures and objects in the area to be affected by extreme cold within 10 kilometers. At the start of its turn, any creature exposed to the blizzard takes 3d6 cold damage and if the creature has no magical armor must succeed on a Resistance (Body) check. On a failure the creature becomes freezing.",


 },

 { "Name":"Chilling Touch",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Hydromancy",
  "Subtype":" Ice",
  "Range":" Touch",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
  "Description":" The caster touches one creature within their melee range sending a burst of cold through the target's body. The target takes 2d6+Spell modifier cold damage, If the target has no magical armor it must succeed on a Resistance (Body) check or have its movement lowered by 1.",


},

 { "Name":"Ice Spikes",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":" Hydromancy",
 "Subtype":" Ice",
 "Range":" 15",
 "Requirements":" Words of Power",
 "Duration" :" 1 Hour",
 "Concentration" : " No",
 "Description":" The caster designates a 20 meter radius cube creating sharp icicles that damage creatures that walk its radius, Any creature that walks in the spikes takes 1d4 piercing and 1d4 cold damage for each tile moved.",

   
},

 { "Name":"Mending Waters",
 "AP Cost":" 3",
 "Spell Rank":" Major",
 "Class":" Hydromancy",
 "Subtype":" Water",
 "Range":" 10",
 "Requirements":" Water, Sigils",
 "Duration" :" Instant",
"Concentration" : " No",
"Description":" The caster targets one creature within range that is in water restoring an amount of health equal to its spell casting modifier.",

   
},

 { "Name":"Tomb of Ice",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":" Hydromancy",
 "Subtype":" Ice",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
"Concentration" : " No",
"Description":" The caster targets a creature they can touch, encapsulating it in ice. The creature if it has no magical armor must succeed on a Resistance (Body) check or becomes frozen solid. While frozen the creature has 0 AP. The tomb has 500 health, must remain in an area below the freezing point of water or begin melting, taking 10 damage at the start of each of its turns. This damage can be raised or lowered depending on the temperature difference from the freezing point by the Game Master.",
 },


 { "Name":"Shards of Ice",
  "AP Cost":" 3",
  "Spell Rank":" Minor",
  "Class":" Hydromancy",
  "Subtype":" Ice",
  "Range":" 10",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
"Description":"  Creating 3 shards of ice the caster launches them at any creatures within range. The caster can target multiple or one creature with these shards. Each shard deals 1d6 cold damage.",
 },


 { "Name":"Rain",
 "AP Cost":" 1",
 "Spell Rank":" Adept",
 "Class":" Hydromancy",
 "Subtype":" Water",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Hour",
"Concentration" : " No",
"Description":" The caster creates precipitation around themselves in a 100 meter radius. While raining the area becomes lightly obscured and the ground becomes covered in water on the start of the casters next turn. When upcast to Major the radius increases to 500 Meters and at Grand the radius increases to 1 Kilometer.",
 },


 { "Name":"Tsunami",
 "AP Cost":" 3",
 "Spell Rank":" Grand",
 "Class":" Hydromancy",
 "Subtype":" Water",
 "Range":" Sight",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" Instant",
"Concentration" : " No",
"Description":" The caster creates a Tsunami that is 1 Kilometer wide and 100 Meters tall. Any creature that is struck by this Tsunami takes 20d12 physical damage and if the creature has no physical armor must succeed on a Resistance (Body) check. On a failure any creature hit by the Tsunami is knocked unconscious for 1 hour.",
 },


 { "Name":"Freeze Liquid",
  "AP Cost":" 1",
  "Spell Rank":" Minor",
  "Class":" Hydromancy",
  "Subtype":" Ice",
  "Range":" 10",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
"Description":"  The caster freezes a body of water or another liquid no hotter than boiling water within range that is no larger than a 10 meter diameter sphere. If a creature is fully submerged in water subjected to freeze liquid it is freezing for 1 minute. When upcast to Adept or greater the diameter doubles for each tier higher.",
 },

 { "Name":"Soothing Fog",
 "AP Cost":" 5",
 "Spell Rank":" Adept",
 "Class":" Hydromancy",
 "Subtype":" Restoration",
 "Range":" 15 meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster creates an area of blue fog that takes up a 5 meter sphere. Any creature that starts its turn in the area heals 3d10 health.",
 },


 { "Name":"Shatter",
 "AP Cost":" 2",
 "Spell Rank":" Major",
 "Class":" Hydromancy",
 "Subtype":" Ice",
 "Range":" 20",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
"Concentration" : " No",
"Description":" The caster chooses a number of tiles of ice equal to their casting modifier. The ice shatters, sending sharp shards cutting and freezing each creature or object on a tile that has shattered. Anything standing on a shattered tile takes 1d4 Ice and 1d4 cold for each tile it takes up that is shattered.",
 },


 { "Name":"Water Tentacle",
 "AP Cost":" 3",
 "Spell Rank":" Minor",
 "Class":" Hydromancy",
 "Subtype":" Water",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster forms an animated pool of water that extends their arm. The tentacle can perform any task a hand is capable of. While active the caster can have the tentacle lash at any creature within 1 meter of themselves dealing 2d6 cold damage.",
  
},

{ "Name":" Heat Object",
  "AP Cost":" 3",
  "Spell Rank":" Minor",
  "Class":" Pyromancy",
  "Subtype":" Flame",
  "Range":" Touch",
  "Requirements":" Words of Power",
  "Duration" :" 1 Minute",
  "Concentration" : " Yes",
"Description":"  The caster heats an object to a warm or scorching temperature. If the object is warm, it is heated but is still comfortable to the touch. If the object is scorching it becomes red hot dealing 2d6 fire damage at the start of each of the creature's turns. A creature may remove the item from physical contact if possible, causing the creature to no longer take damage.",
},

{ "Name":"Whip of Flame",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 5 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

 "Description":" The caster conjures a whip of embers. The caster makes a spell attack roll. On a hit the creature takes 4d6 fire damage and the creature must succeed on a Resistance (Body) check or begin to burning for 1 minute, The creature may repeat its check at the start of each of its turns.",
},

{ "Name":"Blinding Flash",
 "AP Cost":" 4",
 "Spell Rank":" Major",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 30",
 "Requirements":" Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

"Description":" The caster creates a flash of bright light that blinds creatures. The caster chooses a point in range creating a bright light in a 10 meter radius sphere. All creatures within range must succeed on a Resistance (Body) check or become blinded for 1 minute. The creature may repeat the check at the end of each of its turns.",
},

{ "Name":"Heatwave",
 "AP Cost":" 2",
 "Spell Rank":" Grand",
 "Class":" Pyromancy",
 "Subtype":" Ash",
 "Range":" 10 Kilometers",
 "Requirements":" Words of Power",
 "Duration" :" 1 Day",
 "Concentration" : " Yes",

"Description":" The caster creates a wave of scorching heat that exhausts creatures within range exposed to its effects. Any creature that spends 10 minutes unprotected from the heat must succeed on an Endurance check or become exhausted.",
},

{ "Name":"Smoke Screen",
 "AP Cost":" 2",
 "Spell Rank":" Minor",
 "Class":" Pyromancy",
 "Subtype":" Ash",
 "Range":" 5 Meters",
 "Requirements":" Words of Power, Charcoal",
 "Duration" :" 10 Minutes",
 "Concentration" : " No",
 "Description":"The caster creates a screen of smoke that blocks the vision of creatures. A strong wind that is natural or created by a gust, tornado, blizzard, or any other spell that creates strong winds disperses the smoke cloud. The smoke cloud can be as large as a 5 meter radius sphere.",
 },

 { "Name":"Firework",
 "AP Cost":" 1",
 "Spell Rank":" Minor",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 1 Kilometer",
 "Requirements":" Word of Power",
 "Duration" :" 10 Minutes",
 "Concentration" : " No",
 "Description":"The caster creates a flare that shoots into the air creating a bright flash of light that can be seen from up to 1 Kilometer away in bright sunlight and 10 Kilometers away during night time. The fireworks can appear in various colors and create intricate patterns. The flare lasts up to 10 minutes, but its duration must be chosen at the time of casting and cannot be altered once cast. Cannot be upcast.",
 },

 { "Name":"Flaming Weapon",
 "AP Cost":" 2",
 "Spell Rank":" Major",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" Touch",
 "Requirements":" Words of Power, Sulfur",
 "Duration" :" 10 Minutes",
 "Concentration" : " Yes",

"Description":" The caster targets one weapon within range, coating it in sulfur and lightning it ablaze. The weapon deals an additional 2d6 fire damage. Any creature without magical armor must succeed on a Resistance (Body) check or begin burning. Any creature that is burning stops burning at the beginning of its next turn.",
  

 },

 { "Name":"Catastrophe",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Pyromancy",
 "Subtype":" Magma",
 "Range":" Sight",
 "Requirements":" A lit candle",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

"Description":" Catastrophe is a powerful spell that unleashes a massive wave of lava in 10 points of the caster's choice they can see creating pools of bubbling lava in a 100 meter radius, engulfing everything in its path. The spell requires a lit candle as a catalyst, which is consumed in the process. The flames burn at an intense temperature incinerating most things within the area of effect. Any creature within the range of Catastrophe when cast must succeed on an Evasion check or take 30d6 fire damage or half as much on a successful save. Any creature that begins its turn in a pool of lava must succeed on a DC 40 Resistance (Body) check or take 10d6 fire damage. A creature reduced to 0 health by this spell is melted within the lava leaving behind no remains.",
},

 { "Name":" Ignite",
  "AP Cost":"1",
  "Spell Rank":" Minor",
  "Class":" Pyromancy",
  "Subtype":" Flame",
  "Range":" 10 Meters",
  "Requirements":" Words of Power",
  "Duration":" Instant",
  "Concentration" : " No",
  
"Description":"  The caster chooses a point within two meters of themselves creating a 5 meter sphere generating a harmless wave of heat to all creatures but igniting all flammable objects within the sphere. Any creature wearing or carrying a flammable object takes 4d6 fire damage for armor and 1d6 for equipment or weapons worn or carried. Damage from equipment or armor may only be applied only once even if the creature is carrying multiple flammable equipment or is wearing multiple pieces of flammable armor.",


 },

 { "Name":"Ignite",
 "AP Cost":"2 AP",
 "Spell Rank":" Adept",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 15 Meters",
 "Requirements":" Words of Power",
 "Duration":" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster attempts to light a creature within range ablaze. The creature must succeed on a Resistance (Body) check or lit ablate for the duration of the spell. On a success the creature takes 8d6 fire damage and suffers no additional effects. On a failure the creature is lit ablaze and takes the damage again at the start of each of its turns. The creature can repeat its check at the end of each of its turns, ending its effects on a success.",


 },



 { "Name":"Flames of the Phoenix",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 15 Meters",
 "Requirements":" A feather from a phoenix, consumed on casting",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

 "Description":" The spell requires a feather from a phoenix as a catalyst, which is consumed during casting. When the spell is activated, the target’s body is engulfed in brilliant flames that can incinerate anything they touch. The target gains immunity to fire and heals 2d6 health whenever subject to fire damage while the spell is active. During the spell's duration the target can unleash a ray of flame at one creature within 15 meters. The targeted creature must succeed on an Evasion check or take 15d10 fire damage. The flames then leap to up to 7 creatures extending the effect to them. A creature struck by a ray begins burning for 10 minutes. While burning the creature takes 2d6 fire damage at the beginning of each of its turns. These magic flames are so potent they cannot be extinguished by no means shorter than Grand Hydromancy magic.",


},

 { "Name":"Hurl Fire",
  "AP Cost":" 4",
  "Spell Rank":" Minor",
  "Class":" Pyromancy",
  "Subtype":" Flame",
  "Range":" 10 Meters",
  "Requirements":" Sulfur",
  "Duration" :" Instant",
  "Concentration" : " No",
  
"Description":"  The caster targets one creature within range. The creature must succeed on an evasion check or take 1d6+Casting Modifier fire damage. Objects worn or carried are not lit ablaze by this spell.",


 },

 { "Name":"Columns of Fire",
 "AP Cost":" 5",
 "Spell Rank":" Adept",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 20 Meters",
 "Requirements":" Words of Power, Sulfur",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster creates pillars of flame that erupt from the ground. The caster chooses five 1 meter points of their choice within range. Any creature that is standing in the area must succeed on an evasion check or take 3d6 fire damage.",

   
},

 { "Name":"Embers of Reflection",
 "AP Cost":" 3 AP",
 "Spell Rank":" Minor",
 "Class":" Pyromancy",
 "Subtype":" Ash",
 "Range":" Self",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 10 Minutes",
 "Concentration" : " Yes",

"Description":" The caster coats themselves in smoldering ash granting them resistance 10 to fire damage. Up to the damage mitigated the caster may redirect it to any creature or object it can see within 15 meters of themselves. If reflected at a creature they must succeed on a Evasion check or take the fire damage.",


 },

 { "Name":"Cauterize Wounds",
 "AP Cost":" 1",
 "Spell Rank":" Adept",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster targets one creature they can touch. The creature regains 1d6+Spellcasting modifier health.",
  
   
},

{ "Name":" Flame Shroud",
 "AP Cost":" 3",
 "Spell Rank":" Adept",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",
 "Description":" The caster creates a shroud of flame around them burning those who touch them. The caster gains cold resistance of 20 and any creature that hits the caster with a melee weapon within 1 meter takes 2d6 fire damage.",
},

 { "Name":"Flame Web",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Pyromancy",
 "Subtype":" Flame",
 "Range":" 15 meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster shoots a web of flame centering at a point in range covering a 10 meter radius sphere. Any creature caught within the sphere must succeed on an Evasion check or take 4d6 fire damage and become Pinned. Each time a creature enters or starts a turn in the web it takes 2d6 fire damage and may make an Overpower check to remove the pinned condition. A creature that enters the area of the spell that fails its Overpower check becomes pinned.",
   

},

 { "Name":"Sinkhole",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Geomancy",
  "Subtype":" Rock",
  "Range":" 10 Meters",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
  
"Description":"  The caster chooses a point within 10 meters of themselves opening the ground beneath the target. The creature must succeed on an Evasion check or fall into the pit created by the spell. The spell creates a sinkhole that is up to 5 meters deep and has up to a 2-meter radius. The walls inside the sinkhole are loose and hard to traverse. If a creature is not large enough to climb out of the sinkhole by reaching the top it must succeed on a DC 15 Traverse (Str) check.",
  

 },

 { "Name":"Magnetize",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":"  Geomancy",
 "Subtype":" Metal",
 "Range":" 20 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster targets a piece of metal creating a strong magnetic field around it. Even if smaller and or lighter than other objects attracted to it the Magnetized object does not move as a result of the pull.  All metal objects not fixed in place within 5 meters of the object become attached to it. Creatures carrying metal or otherwise magnetic objects must succeed on an Overpower check or lose the object as it attaches itself to the polarized object. Metal armor and creatures made of metal have difficulty to move in affected area and all creatures within 5 meters of the object wearing or made of metal must succeed on an Overpower check or have its speed reduced to 0 and be pulled 1 meter closer to the object. To remove an object attached to the Magnetized object a creature must succeed on an overpower check but needs not roll again until it’s next turn to move if successful. A creature may spend 2 AP to repeat or trigger an additional overpower check. Any creature subjected to the spell is forced to repeat the overpower check at the start of each of its turns unless it is already attached to the magnetized object.",


 },

 { "Name":"Crystal Spikes",
 "AP Cost":" 6",
 "Spell Rank":" Grand",
 "Class":" Geomancy",
 "Subtype":" Crystal",
 "Range":" 15 Meters",
 "Requirements":" A piece of quartz, consumed on casting",
 "Duration" :" 10 Minutes",
 "Concentration" : " No",

 "Description":" The spell requires a piece of quartz as a catalyst, which is consumed during casting. When the spell is activated, the caster creates a 15-meter cone of crystal spikes that erupt from the ground. Any creature within the area of the spell must succeed an Evasion check or take 15d8 earth damage. Any creature that fails its save becomes pinned for the spells duration as the crystals impale its feet binding them to the ground. After the spell's duration the spikes disappear if not stuck on a target. The creature may make an overpower check contested by the caster's casting modifier at the end of each of its turns on a successful check freeing itself from the crystals.",


},

 { "Name":"Earthquake",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":"  Geomancy",
 "Subtype":" Earth",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster rumbles the earth around themselves causing great damage to buildings and shaking the feet beneath creatures around themselves. The earthquake spans 10 kilometers destroying all small structures. Any creature that is underground in the radius of an earthquake spell takes 10d10 earth damage at the start of each of its turns. In addition, all creatures within range of an earthquake spell must succeed on a Balance check or be knocked down for the duration of the spell.",


 },

 { "Name":"Loosen Earth",
  "AP Cost":" 4",
  "Spell Rank":" Minor",
  "Class":"  Geomancy",
  "Subtype":" Rock",
  "Range":" 10",
  "Requirements":" Sigils",
  "Duration" :" 1 Minute",
  "Concentration" : " Yes",
  
"Description":"  The caster loosens the earth around them transforming it into a more malleable variation of its previous self. Rocks turn to sand, hard dirt turns to loose soil, etc. The malleable substance created by this spell reverts back to its original shape and hardness after the duration of the spell pulling all small objects able to be moved with it. If an object or creature is stuck in the earth during or after the duration of the spell it requires a DC 20 Overpower check to escape. This DC can be raised or lowered by the Game Master depending on the material that is transformed. The DC 20 represents a target in hard dry soil or quicksand. Despite altering the terrain, structures do not lose their stability from having their stone or other material affected.",
  

 },

 { "Name":"Armor of Stone",
 "AP Cost":" 3",
 "Spell Rank":" Adept",
 "Class":"  Geomancy",
 "Subtype":" Rock",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " No",

"Description":" The caster targets one creature and covers it in stone. The creature gains 5d10 physical armor and gains 10 physical resistance while it has this armor. The armor lasts until the armor gained from the spell is reduced to 0 or the duration ends.",


 },



 { "Name":"Reshape Earth",
 "Casting Time":"10 Minutes",
 "Spell Rank":" Grand",
 "Class":"  Geomancy",
 "Subtype":" Earth",
 "Range":" 1 Kilometer",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",

"Description":"  The caster reshapes the earth around them. Reshape earth's primary purpose is to move the earth weighing no more than 10,000 kilograms. The caster can push this magic further beyond this point if they wish, risking their body and mind in the process due to the intense strain. A caster may terraform the terrain creating a mountain, a volcano, a vast and grand cave system or destroying one. They may also transform the land filling it with rich nutrients and cause plant life to flourish. In addition, the terraformed land can be filled with exotic materials such as diamonds, jade, gold, platinum, and other valuable resources the caster desires that occur naturally in the soil. If the caster performs such a great feat, they must roll a percentile die. On a 60 or higher the strain on their body and mind is too much for them. The caster permanently loses 6 in their casting modifier and memory and loses the ability to cast Geokinesis spells permanently.",


 },

 { "Name":"Reshape Land",
  "AP Cost":" 4 AP",
  "Spell Rank":" Minor",
  "Class":"  Geomancy",
  "Subtype":" Rock",
  "Range":" 10 Meters",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
"Description":" The caster chooses a point within 10 meters of themselves. They can choose 5 meters of loose soil, and natural rock, and move it to another point within range of the spell.",


 },

{ "Name":"Crystal Spikes",
 "AP Cost":" 3",
 "Spell Rank":" Adept",
 "Class":"  Geomancy",
 "Subtype":" Crystal",
 "Range":" 15 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
"Concentration" : " No",
"Description":" The caster creates 5 spikes that target up to 5 creatures within range. On a successful hit the crystals are launched at the targets dealing 2d6+Casting Modifier earth damage.",


},

{ "Name":" Crystalize",
  "AP Cost":" 1",
  "Spell Rank":" Minor",
  "Class":"  Geomancy",
  "Subtype":" Crystal",
  "Range":" Touch",
  "Requirements":" Sigils",
  "Duration" :" Permanent",
  "Concentration" : " No",
"Description":"  The caster touches a liquid creating glass-like crystals on its surface. These crystals are made of the same material as the liquid. The crystals made by this spell can be thrown or used as ammunition for weapons. Any weapon that uses ammunition made from crystalize deals an additional 1d6 earth damage. Crystals created by this spell are worthless to any jeweler.",
  

},

 { "Name":"Oil Field",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":"  Geomancy",
 "Subtype":" Rock",
 "Range":" 20 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
"Concentration" : " Yes",
"Description":" The caster creates a field of oil at a point within range causing a 10 meter diameter circle of ground to become hard to traverse. Any creature that walks across the afflicted area must succeed on a Traverse (Finesse) check or be knocked down. The oil field may also be lit ablaze creating a field of fire. Any creature within the radius while burning loses 20 resistance to fire and takes 1 damage for each die rolled when taking fire damage.",
   

 },

 { "Name":"Mold Metal Ore",
  "AP Cost":" 4",
  "Spell Rank":" Minor",
  "Class":"  Geomancy",
  "Subtype":" Metal",
  "Range":" Touch",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
"Description":"  The caster takes metal ore and molds it into a more useful form of shape. The spell can alter up to 1 meter of ore per casting.",
 

},

 { "Name":"Crush",
 "AP Cost":" 2",
 "Spell Rank":" Adept",
 "Class":"  Geomancy",
 "Subtype":" Metal",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
"Concentration" : " No",
"Description":" The caster targets a piece of metal crushing it into a small ball. If used on a creature made of or wearing metal the creature takes 5d6 physical damage and must succeed on a Resistance (Body) check. On a failure the creature becomes crippled. The creature may reroll this save at the start of each of its turns on a success taking off its armor and no longer being crippled. Using Mend Metal to put the armor back to its original state or expand overpower removes crippled condition.",
   

 },

 { "Name":"Hurl Earth",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":"  Geomancy",
  "Subtype":" Rock",
  "Range":" 20 Meters",
  "Requirements":" Words of Power",
  "Duration" :" Instant",
  "Concentration" : " No",
"Description":" The caster tears a ball of earth from the soil hurling it at a target within the range of the spell. The caster must roll a Magic attack against the target. On a hit, the creature takes 3d6 earth damage. If the target has no magical armor it must succeed on a Resistance (Body) check or become slowed until the end of its next turn.",
  

 },

 { "Name":"Incarnate of Shards",
 "AP Cost":" 5",
 "Spell Rank":" Adept",
 "Class":" Geomancy",
 "Subtype":" Incarnate of Shards",
 "Range":" 20 meters",
 "Requirements":" Words of Power, Shards of a glass, or gemstones",
 "Duration" :" 10 Minutes",
 "Concentration" : " Yes",

"Description":" The caster summons an incarnate made of fragments of its material that occupies a large creature's space at the origin point of the fragments. The incarnate has 5 times as much health as its caster's casting modifier.  Whenever a creature within 5 meters of the caster choice is the target of an attack roll, the incarnate intercepts the attack granting them a bonus to their AC of 5. If the attack still hits the Incarnate reduces the damage by half (rounded up) and takes the damage to its own health as it absorbs part of the blast. For 3 AP or a reaction the caster can move the incarnate up to 6 meters in any direction but to a maximum of 20 meters. The Incarnate still defends targets up to 25 meters from its caster but if it moves to occupy a space 21 or further meters the spell ends. When Incarnate of Shards ends as it crumbles to dust. When upcast this spell increases the AC by 5 for every upcast level.",
   

 },

 { "Name":"Mend Metal",
  "AP Cost":" 1",
  "Spell Rank":" Minor",
  "Class":"  Geomancy",
  "Subtype":" Metal",
  "Range":" Touch",
  "Requirements":" Sigils",
  "Duration" :" Instant",
  "Concentration" : " No",
"Description":"  The caster takes two pieces of a broken metal object and mends them back into one. Alternatively, the spell may be used on a creature wearing metal armor restoring 2d10 physical armor.",
  

 },

 { "Name":"Siphon Venom",
 "AP Cost":" 4",
 "Spell Rank":" Minor",
 "Class":" Geomancy",
 "Subtype":" Poison",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster pulls the toxin's from a poisoned creature ending the condition forming a solid rock that can be used as one dosage of the poison.",
   

},

 { "Name":"Lance of Tar",
 "AP Cost":" 3 AP",
 "Spell Rank":" Minor",
 "Class":" Geomancy",
 "Subtype":" Rock",
 "Range":" 5 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster creates a 1 meter wide and 10 meter long. Each creature caught in this line must succeed on Evasion check or take 1d4 earth damage and become pinned until the end of its next turn.",
  

},

 { "Name":"Shocking Touch",
  "AP Cost":" 2",
  "Spell Rank":" Minor",
  "Class":" Aeromancy",
  "Subtype":" Lightning",
  "Range":" Touch",
  "Requirements":" Sigils",
  "Duration" :" 1 minute",
  "Concentration" : " No",
"Description":"  The caster touches a creature flooding it with electricity. The caster makes a Magic Attack, and, on a hit, the creature takes 2d6+Casting Modifier air damage. If the creature has no magical armor, it must succeed on a Resistance (Body) check or become shocked for 1 minute.",
  

 },

 { "Name":"ThunderStorm",
 "AP Cost":" 3 AP",
 "Spell Rank":" Adept",
 "Class":" Aeromancy",
 "Subtype":" Lightning",
 "Range":" 15 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
"Concentration" : " No",
"Description":" The caster creates a storm cloud above centered on an area within range. The 10 meter diameter thundercloud strikes targets with lightning. The caster chooses 4 targets at the start of end of their turns. If the target is a creature is and is inside the cloud's area  or below it, the creature must succeed on a Resistance (Body) check or take 4d10 air damage or half as much on a success. A creature can only be stuck by 1 bolt per turn.",


 },

 { "Name":"Vacuum",
 "AP Cost":" 4",
 "Spell Rank":" Major",
 "Class":" Aeromancy",
 "Subtype":" Air",
 "Range":" 25 Meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Minute",
"Concentration" : " Yes",
"Description":" The caster targets a creature within range creating a vacuum devoid of air or water around it. If the creature that is targeted must breathe it must succeed on an Endurance check. On a failure the air is ripped from the creature's lungs and pulled outside the vacuum. If the creature's physical armor is at or reduced to 0 while inside the Vacuum it is instantly rendered unconscious for the duration of the spell.",


 },

 { "Name":"Mass Vacuum",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" 100 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" This spell functions like Vacuum but affects a 30 meter cube instead of a single target.",


},

 { "Name":" Lightning Bolt",
 "AP Cost":" 2",
 "Spell Rank":" Minor",
 "Class":" Aeromancy",
 "Subtype":" Lightning",
 "Range":" 10 Meters",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",
  
"Description":" The caster creates a bolt of lightning that shocks creatures within a line. The caster shoots a 1-meter wide and 10 meters long bolt that passes through up to 4 creatures. Any creature within the area affected by this bolt must succeed on an Evasion check. On a failure, the creature takes 5d6 air damage. On a success, the creature takes half as much damage.",


 },

 { "Name":"Wall of Wind",
 "AP Cost":" 5",
 "Spell Rank":" Adept",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" 30 Meters",
 "Requirements":" Words of Power",
 "Duration" :" 10 Minutes",
 "Concentration" : " Yes",

"Description":" The caster creates a wall of wind blocking oncoming wind aeromancy and fire Pyrokinesis spells from passing through the wall. In addition, ranged attacks made from the other side of the wall have a 50 percent chance to pass through the wall or otherwise be redirected in a random direction not passing through it.",


 },

{ "Name":"Electric Pulse",
 "AP Cost":" 3",
 "Spell Rank":" Major",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",

"Description":" The caster creates a pulse of electricity from themselves that electrocutes all within range. Any creature within 20 meters of the caster must succeed on a Resistance (Mind) check or take 10d10 air damage or half as much on a success. Any creature that has no magical armor that takes damage becomes shocked.",


},

{ "Name":" Tornado",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" 10 Kilometers",
 "Requirements":" Words of Power",
 "Duration" :" 10 Minutes",
 "Concentration" : " Yes",

"Description":" The caster creates a whirlwind that spirals into the sky creating a tornado that devastates all it touches. This spell functions as Gust and in addition any loose objects are sucked into by the tornado and scattered. Lost items require at least 1 hour of searching for each DC 60 sense environment rolled to find the item. Creatures that are within meters of the tornado that weigh less than 1000 kilograms must make a contested overpower check with the tornado using the casting statistic of the caster in place of strength and is treated as size colossal. On a failure the creature is shoved. All medium size open structures are destroyed by the tornado.",


},

{ "Name":"Gust",
 "AP Cost":" 2",
 "Spell Rank":" Minor",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" 10",
 "Requirements":" Words of Power",
 "Duration" :" Instant",
 "Concentration" : " No",
  
"Description":" The caster creates a large gust of wind that causes creatures to struggle to stay on their feet. The caster creates a gust of wind on a 2-meter radius tile within range. Any open flames in the area are snuffed out and creatures with the burning condition are no longer burning. Any creature within the area must succeed on a Balance check or be knocked down.",


},

{ "Name":"Static Charge",
 "AP Cost":" 4",
 "Spell Rank":" Adept",
 "Class":" Aeromancy",
 "Subtype":" Lightning",
 "Range":" Touch",
 "Requirements":" Words of Power",
 "Duration" :" 1 Hour",
 "Concentration" : " No",

"Description":" The caster touches a target creating a static charge on it causing it to be filled with electricity. The creature becomes hasted and deals an additional 1d6 air damage on melee attacks.",


},

 { "Name":"Evasion",
 "AP Cost":" 3",
 "Spell Rank":" Major",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" Self",
 "Requirements":" Sigils",
 "Duration" :" 1 Minute",
 "Concentration" : " Yes",

"Description":" The caster embows themselves with warding wind that speeds themselves up. While the spell is active any attack roll has a 50 percent chance to miss.",


 },

 { "Name":"Endless Lightning",
 "AP Cost":" 4",
 "Spell Rank":" Grand",
 "Class":" Aeromancy",
 "Subtype":" Lightning",
 "Range":" Self",
 "Requirements":" Words of Power",
 "Duration" :" Permanent",
 "Concentration" : " No",

"Description":" The caster creates a 100 meter radius storm cloud that functions as the Thunderstorm spell but instead deals 30d6 air.",


},

 { "Name":"Air Bubble",
 "AP Cost":" 1",
 "Spell Rank":" Minor",
 "Class":" Aeromancy",
 "Subtype":" Wind",
 "Range":" Touch",
 "Requirements":" Sigils",
 "Duration" :" 1 Hour",
 "Concentration" : " Yes",
  
"Description":"  The caster touches a creature creating a bubble of air on the target's head. While this bubble lasts the creature can breathe normally underwater and is unaffected by hazards in the surrounding air. Casting Air bubble on a creature that has been effected by a vacuum spell removes the vacuum effect for its duration",
   

 },

 { "Name":"Lightning Talon",
 "AP Cost":" 4",
 "Spell Rank":" Minor",
 "Class":" Aeromancy",
 "Subtype":" Lightning",
 "Range":" 15 Meters",
 "Requirements":" Words of Power, Sigils",
 "Duration" :" 1 Round",
 "Concentration" : " No",

"Description":" The caster creates a claw of lightning that attempts to grab a creature within 1 meter of itself of the caster's choice. That creature must succeed on a Resistance (Body) check or take 1d4 air damage and be shocked. A creature wearing or made of metal receives a -5 penalty. The claw acts at the end of the caster's next turn.",
  
 
},
]

folder_name = "Webpages"

if not os.path.exists(folder_name):
    os.makedirs(folder_name)

for spell in spells:
    cost_label = "AP Cost" if "AP Cost" in spell else "Casting Time"
    cost_value = spell[cost_label]  

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparks| {spell['Name']}</title>
    <link rel="stylesheet" type="text/css" href="A-Nav-bar.css"/>
    <style>
        header {{ 
            width: 100%; 
        }}
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $(function(){{
            $("header").load("A-Header.html"); 
        }});
    </script>
</head>
<body>
    <header>
        <object data="A-Header.html" style="width: 100%;"></object>
    </header>
    <div class="main-content">
        <div style="margin-top: 100px; background-color: rgba(0,0,0,0.5); border-radius: 10px; padding: 20px; color: white;">

            <h2>{spell['Name']}</h2>
            <br>
            <b>Range:</b> {spell['Range']}<br>
            <b>{cost_label}:</b> {cost_value}<br>
            <b>Spell Rank:</b> {spell['Spell Rank']}<br>
            <b>Class:</b> {spell['Class']}<br>
            <b>Subtype:</b> {spell['Subtype']}<br>
            <b>Requirements:</b> {spell['Requirements']}<br>
            <b>Duration:</b> {spell['Duration']}<br>
            <b>Concentration:</b> {spell['Concentration']}<br>
            <p>{spell['Description']}</p>

        </div>
    </div>
</body>
</html>
"""


    file_name = f"{folder_name}/{spell['Name'].lower()}.html" 
    with open(file_name, "w") as f:
        f.write(html_content)

    print(f"Generated HTML file for {spell['Name']}")
